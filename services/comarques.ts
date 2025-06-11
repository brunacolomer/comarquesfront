import { useComposedEventHandler } from "react-native-reanimated";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
export async function getComarques(session: string | null) {
  try {
    const response = await fetch(`${API_URL}/amistats/comarques/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch comarques");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching comarques:", error);
    throw error;
  }
}
