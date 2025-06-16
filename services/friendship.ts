import * as SecureStore from "expo-secure-store";
import { useSession } from "auth/ctx";
import * as FileSystem from "expo-file-system";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
export async function createFriendship(
  image: { uri: string; name: string; type: string } | null,
  friend: string,
  descripcio: string
): Promise<void> {
  try {
    const token = await SecureStore.getItemAsync("session");
    if (!token) throw new Error("No token");

    const formData = new FormData();
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
    }

    formData.append("usuari2_username", friend);
    formData.append("descripcio", descripcio);
    console.log("Creating friendship with data:", {
      image,
      friend,
      descripcio,
    });
    const response = await fetch(`${API_URL}/amistats/crear/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error("Failed: " + err);
    }
    console.log(response);
  } catch (error) {
    console.error("Error creating friendship:", error);
  }
}
