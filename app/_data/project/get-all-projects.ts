"server only";

export default async function getAllProjects({ query = "", limit = 0 }) {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/projects?q=${query}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const resJson = await res.json();
    return resJson;
  } catch (error) {
    return {
      message: "Something went wrong",
      success: false,
    };
  }
}
