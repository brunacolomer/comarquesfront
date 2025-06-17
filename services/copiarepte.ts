import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function copiarRepte(
  visiblitat: "PUBLIC" | "AMICS" | "PRIVAT" | "ME",
  basatId: number
): Promise<any> {
  try {
    const token = await SecureStore.getItemAsync("session");
    if (!token) throw new Error("No token");

    const payload = {
      visiblitat: visiblitat,
      basat: basatId.toString(),
    };

    console.log("Copiant repte amb:", payload);

    const response = await fetch(`${API_URL}/repte/copiat/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error("Error des del servidor: " + err);
    }

    const data = await response.json();
    console.log("Resposta del backend:", data);
    return data;
  } catch (error) {
    console.error("Error copiant repte:", error);
    throw error;
  }
}
