"server only";

export default async function getContentProject(
  contentPath: string,
): Promise<string> {
  try {
    const response = await fetch(contentPath);

    if (!response.ok) {
      console.error(
        `Failed to fetch project content: ${response.status} ${contentPath}`,
      );
      return "";
    }

    return await response.text();
  } catch (error) {
    console.error(error);
    return "";
  }
}
