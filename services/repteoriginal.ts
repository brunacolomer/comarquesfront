import * as SecureStore from "expo-secure-store";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function createOriginalRepte(
  titol: string,
  visiblitat: "PUBLIC" | "AMICS" | "ME",
  permissos: "PUBLIC" | "AMICS" | "ME"
) {
  const token = await SecureStore.getItemAsync("session");
  if (!token) throw new Error("Falta el token");

  const response = await fetch(`${API_URL}/repte/original/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ titol, visiblitat, permissos }),
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error("Error creant repte: " + msg);
  }

  return await response.json();
}
