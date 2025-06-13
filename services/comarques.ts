import API from "./api"; // Aquest és l'axios creat a `services/api.ts`

export async function getComarques() {
  try {
    const response = await API.get("/amistats/comarques/");
    return response.data;
  } catch (error) {
    console.error("Error fetching comarques:", error);
    throw error;
  }
}
