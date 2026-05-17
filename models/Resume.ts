import mongoose, { Schema, Document } from "mongoose";

export interface IResume extends Document {
  userId: string;
  fileName: string;
  extractedText: string;
  analysis: {
    atsScore: number;
    summary: string;
    missingSkills: string[];
    improvements: string[];
    keyStrengths: string[];
  };
  createdAt: Date;
}

const ResumeSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  fileName: { type: String, required: true },
  extractedText: { type: String, required: true },
  analysis: {
    atsScore: { type: Number, required: true },
    summary: { type: String, required: true },
    missingSkills: { type: [String], default: [] },
    improvements: { type: [String], default: [] },
    keyStrengths: { type: [String], default: [] },
  },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model recompilation during hot reloads
export default mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);
