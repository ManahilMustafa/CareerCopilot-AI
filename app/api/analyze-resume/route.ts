import { PDFParse } from "pdf-parse";
import path from "path";
import { pathToFileURL } from "url";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Resume from "@/models/Resume";

// Initialize PDF.js worker for Node.js (Only once)
if (typeof window === "undefined") {
  try {
    const workerPath = path.resolve(process.cwd(), "node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs");
    const workerUrl = pathToFileURL(workerPath).href;
    PDFParse.setWorker(workerUrl);
  } catch (e) {
    console.error("PDF Worker Setup Error:", e);
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const apiKey = (process.env.GEMINI_API_KEY || "").trim();

    if (!file) return Response.json({ success: false, message: "No file" }, { status: 400 });
    if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
      return Response.json({ success: false, message: "API Key missing in .env.local" }, { status: 500 });
    }

    console.log("Processing:", file.name, "for user:", userId);

    // 1. PDF Extraction (Using Uint8Array as required by this version)
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const parser = new PDFParse({ data: uint8Array });
    const data = await parser.getText();
    const resumeText = data.text;

    if (!resumeText) throw new Error("Could not extract text from PDF");

    // 2. Gemini AI Analysis (Direct Fetch Fallback System)
    const prompt = `
      Analyze this resume and provide a JSON report:
      "${resumeText}"
      JSON structure: { "atsScore": number, "summary": "string", "missingSkills": ["string"], "improvements": ["string"], "keyStrengths": ["string"] }
      Return ONLY JSON.
    `;

    const models = [
      { id: "gemini-2.5-flash", v: "v1beta" },
      { id: "gemini-1.5-flash", v: "v1beta" },
      { id: "gemini-1.5-flash", v: "v1" },
      { id: "gemini-pro", v: "v1" }
    ];

    let aiResponseText = "";
    let errorLog = "";

    for (const m of models) {
      try {
        console.log(`Trying ${m.id} (${m.v})...`);
        const res = await fetch(`https://generativelanguage.googleapis.com/${m.v}/models/${m.id}:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        if (res.ok) {
          const json = await res.json();
          aiResponseText = json.candidates[0].content.parts[0].text;
          console.log("✅ Success!");
          break;
        } else {
          const err = await res.json();
          errorLog = JSON.stringify(err);
        }
      } catch (e: any) {
        errorLog = e.message;
      }
    }

    if (!aiResponseText) throw new Error(`AI Analysis failed: ${errorLog}`);

    const analysis = JSON.parse(aiResponseText.replace(/```json|```/g, "").trim());

    // 3. Save to MongoDB (Optional - runs only if MONGODB_URI is defined)
    if (process.env.MONGODB_URI) {
      try {
        await connectDB();
        await Resume.create({
          userId,
          fileName: file.name,
          extractedText: resumeText,
          analysis
        });
        console.log("✅ Analysis saved to MongoDB");
      } catch (dbError) {
        console.error("Failed to save to MongoDB:", dbError);
        // We don't throw here so the user still gets their result even if DB fails
      }
    } else {
      console.log("ℹ️ MongoDB URI not configured in .env.local. Skipping database persistence.");
    }

    return Response.json({
      success: true,
      analysis,
      extractedText: resumeText.substring(0, 500) + "..."
    });

  } catch (error: any) {
    console.error("Route Error:", error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}