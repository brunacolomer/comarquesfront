import {
  use,
  useContext,
  useEffect,
  createContext,
  type PropsWithChildren,
} from "react";
import { useStorageState } from "./useStorageState";
import { setAuthToken } from "services/api";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
console.log("API_URL:", API_URL);
const AuthContext = createContext<{
  signIn: (
    email: string | undefined,
    password: string | undefined
  ) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  register: (
    username: string | undefined,
    password: string | undefined,
    email: string | undefined,
    name: string | undefined,
    surnames: string | undefined,
    poblacio: string | undefined
  ) => Promise<void>;
}>({
  signIn: async () => {},
  signOut: () => null,
  session: null,
  isLoading: false,
  register: async () => {},
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  useEffect(() => {
    const validateToken = async () => {
      if (!session) return;

      try {
        const response = await fetch(`${API_URL}/token/verify/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: session, // el token guardat
          }),
        });

        if (!response.ok) {
          console.warn("Token invàlid o expirat");
          setSession(null);
        } else {
          console.log("Token vàlid");
        }
      } catch (error) {
        console.error("Error validant el token:", error);
        setSession(null);
      }
    };
    setAuthToken(session);

    validateToken();
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (
          username: string | undefined,
          password: string | undefined
        ) => {
          console.log("Signing in with", username, password);
          console.log("API_URL:", API_URL);
          try {
            const response = await fetch(`${API_URL}/token/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: username,
                password: password,
              }),
            });
            if (!response.ok) {
              console.error("Failed to sign in:", response.statusText);
              return;
            }
            console.log("Response:", response);

            const data = await response.json();
            console.log("Data:", data);
            setSession(data.access); // Assuming the token is in the 'access' field
          } catch (error) {
            console.log("Error during sign-in:", error);
          }

          // Perform sign-in logic here
        },
        signOut: () => {
          setSession(null);
        },
        register: async (
          username: string | undefined,
          password: string | undefined,
          email: string | undefined,
          name: string | undefined,
          surnames: string | undefined,
          poblacio: string | undefined
        ) => {
          console.log(
            "Registering with",
            username,
            password,
            email,
            name,
            surnames,
            poblacio
          );
          try {
            const response = await fetch(`${API_URL}/registre/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username,
                password,
                first_name: name,
                last_name: surnames,
                email,
                poblacio,
              }),
            });
            if (!response.ok) {
              console.error("Failed to register:", response.statusText);
              return;
            }
            console.log("Response:", response);

            const data = await response.json();
            console.log("Data:", data);
            console.log("el que guardarem", data.access);
            setSession(data.access); // Assuming the token is in the 'access' field
          } catch (error) {
            console.log("Error during registration:", error);
          }

          // Perform registration logic here
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
