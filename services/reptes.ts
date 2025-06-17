import API from "./api"; // Aquest és l'axios creat a `services/api.ts`
import * as SecureStore from "expo-secure-store";
import * as FileSystem from "expo-file-system";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
export async function getRepte(id: number) {
  try {
    const response = await API.get(`/repte/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching repte:", error);
    throw error;
  }
}

export async function getReptes() {
  try {
    const response = await API.get("/repte/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching reptes:", error);
    throw error;
  }
}

export async function createAssolit({
  repteId,
  image,
  comarca,
  descripcio,
  reload = () => {},
}: {
  repteId: string;
  image: { uri: string; name: string; type: string };
  comarca: string;
  descripcio?: string;
  reload?: () => void;
}): Promise<void> {
  try {
    const token = await SecureStore.getItemAsync("session");
    if (!token) throw new Error("No token");

    const fileInfo = await FileSystem.getInfoAsync(image.uri);
    if (!fileInfo.exists) throw new Error("Image file does not exist");

    const formData = new FormData();
    formData.append("comarca", comarca);
    if (descripcio) formData.append("descripcio", descripcio);
    if (image) {
      const fileUri = image.uri;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) throw new Error("Image file does not exist");

      const blob: any = {
        uri: fileUri,
        name: image.name,
        type: image.type === "image" ? "image/jpeg" : image.type,
      };

      formData.append("foto", blob);
    } // El cast a `any` és necessari per a `React Native`
    console.log("jujuju", `${API_URL}/repte/${repteId}/assolit`);
    const response = await fetch(`${API_URL}/repte/1/assolit`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Error: ${err}`);
    }

    console.log("Assolit creat correctament");
    reload();
  } catch (error) {
    console.error("Error creant l'assolit:", error);
    throw error;
  }
}
