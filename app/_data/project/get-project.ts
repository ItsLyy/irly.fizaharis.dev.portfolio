export default async function getProject(slug: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/projects/${slug}`);
  const resJson = await res.json();

  return resJson;
}
