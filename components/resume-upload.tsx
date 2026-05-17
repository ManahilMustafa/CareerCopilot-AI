"use client";

import { useState } from "react";
import { X } from "lucide-react";

// Resume upload and analysis component
export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setMessage("");
      setExtractedText("");
      setAnalysis(null);
    }
  };

  // Call backend API
  const handleAnalyze = async () => {
    if (!file) {
      setMessage("Please upload a PDF first");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setExtractedText("");
      setAnalysis(null);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Resume analyzed successfully! 🚀");
        setExtractedText(data.extractedText);
        setAnalysis(data.analysis);
      } else {
        setMessage(data.message || "Something went wrong during analysis");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="upload-section" className="bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur">

          {/* Heading */}
          {!analysis && (
            <div className="text-center">
              <h2 className="text-4xl font-bold">
                AI Resume Analyzer
              </h2>
              <p className="mt-4 text-gray-400">
                Upload your PDF and get an AI-powered ATS analysis
              </p>
            </div>
          )}

          {/* Upload Box (Hidden if analysis exists) */}
          {!analysis && (
            <div className="mt-10">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-white/20 p-12 transition hover:border-purple-500/50 hover:bg-white/5">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold">Click to upload PDF</h3>
                <p className="mt-2 text-sm text-gray-400">Only PDF supported</p>

                {file && (
                  <div className="mt-6 flex items-center gap-2 rounded-xl bg-purple-500/20 px-4 py-2 text-sm text-purple-300">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="rounded-full p-0.5 hover:bg-purple-500/30 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </label>

              <button
                onClick={handleAnalyze}
                disabled={loading || !file}
                className="mt-8 w-full rounded-2xl bg-white px-6 py-4 font-semibold text-black transition hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? "Analyzing with AI..." : "Analyze Resume"}
              </button>
            </div>
          )}

          {/* Analysis Results */}
          {analysis && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex flex-col items-center justify-between gap-6 border-b border-white/10 pb-8 md:flex-row">
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-bold text-white">Analysis Report</h3>
                  <p className="mt-2 text-gray-400">{file?.name}</p>
                </div>
                <div className="flex items-center gap-4 rounded-3xl bg-purple-500/10 p-6 border border-purple-500/20">
                  <div className="text-center">
                    <p className="text-sm uppercase tracking-wider text-purple-300">ATS Score</p>
                    <p className="text-5xl font-black text-purple-400">{analysis.atsScore}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {/* Summary & Strengths */}
                <div className="space-y-8">
                  <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-white">
                      <span className="text-purple-400">✦</span> Professional Summary
                    </h4>
                    <p className="mt-3 text-gray-400 leading-relaxed">
                      {analysis.summary}
                    </p>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-white">
                      <span className="text-green-400">✓</span> Key Strengths
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {analysis.keyStrengths.map((s: string, i: number) => (
                        <span key={i} className="rounded-full bg-green-500/10 border border-green-500/20 px-3 py-1 text-xs text-green-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills & Improvements */}
                <div className="space-y-8">
                  <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-white">
                      <span className="text-orange-400">!</span> Missing Skills
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {analysis.missingSkills.map((s: string, i: number) => (
                        <span key={i} className="rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-xs text-orange-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-white">
                      <span className="text-blue-400">i</span> Suggested Improvements
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {analysis.improvements.map((imp: string, i: number) => (
                        <li key={i} className="text-sm text-gray-400 flex gap-2">
                          <span className="text-blue-400">•</span> {imp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setAnalysis(null);
                  setFile(null);
                  setMessage("");
                }}
                className="mt-12 w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Analyze Another Resume
              </button>
            </div>
          )}

          {/* Message (Show only errors or if no analysis) */}
          {message && !analysis && (
            <p className={`mt-4 text-center text-sm ${message.includes("configured") || message.includes("error") ? "text-red-400" : "text-gray-300"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}