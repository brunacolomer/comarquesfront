import API from "./api"; // Aquest és l'axios creat a `services/api.ts`

export async function getTikTok(id: number) {
  try {
    const response = await API.get(`/repte/${id}/copiats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching repte:", error);
    throw error;
  }
}
