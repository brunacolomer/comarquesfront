import API from "./api"; // Aquest és l'axios creat a `services/api.ts`

export async function getRepte(id: number) {
  try {
    const response = await API.get(`/repte/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching repte:", error);
    throw error;
  }
}
