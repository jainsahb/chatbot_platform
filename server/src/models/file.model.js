import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true
    },
    openaiFileId: {
      type: String,
      required: true
    },
    filename: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("File", fileSchema);
