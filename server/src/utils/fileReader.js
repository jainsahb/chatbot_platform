import fs from "fs";
import path from "path";

/**
 * Read text from uploaded file
 */
export const readFileContent = (filePath, maxChars = 5000) => {
  const absolutePath = path.resolve(filePath);
  const content = fs.readFileSync(absolutePath, "utf-8");

  // Limit size to avoid token explosion
  return content.slice(0, maxChars);
};
