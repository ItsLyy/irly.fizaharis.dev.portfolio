"server only";

/**
 * Node Modules
 */
import { readFile } from "node:fs/promises";
import path from "node:path";

export default async function getContentProject(
  contentPath: string,
): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), "public", contentPath);
    const text = await readFile(fullPath, "utf-8");
    return text;
  } catch (error) {
    console.error(error);
    return "";
  }
}
