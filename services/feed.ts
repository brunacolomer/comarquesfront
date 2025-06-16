import API from "./api"; // Aquest és l'axios creat a `services/api.ts`

export async function getFeed() {
  try {
    const response = await API.get("/feed/");
    return response.data;
  } catch (error) {
    console.error("Error fetching feed:", error);
    throw error;
  }
}
