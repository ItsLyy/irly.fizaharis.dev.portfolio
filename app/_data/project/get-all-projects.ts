"server only";

export default async function getAllProjects({ query = "" }) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resJson = await res.json();
    return resJson;
  } catch (error) {
    return {
      message: "Something went wrong",
      success: false,
    };
  }
}
