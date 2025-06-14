import API from "./api"; // Aquest és l'axios creat a `services/api.ts`

export async function getRanking() {
  try {
    const response = await API.get("/amistats/ranking/");
    return response.data;
  } catch (error) {
    console.error("Error fetching ranking:", error);
    throw error;
  }
}
