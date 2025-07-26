import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadAuth } from "~/features/auth/authAction";
import { RootState } from "~/store";
import { useRouter, useSegments } from "expo-router";

function AuthGate({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const segments = useSegments();
  const { token, isAuthLoaded } = useSelector((state: RootState) => state.auth);
  const [initialChecked, setInitialChecked] = useState(false);

  useEffect(() => {
    dispatch(loadAuth() as any).finally(() => setInitialChecked(true));
  }, []);

  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!isAuthLoaded || !initialChecked || hasRedirected.current) return;

    const currentRoute = segments.join("/");

    console.log("🔍 Route:", currentRoute, "| Token:", token);

    if (token) {
      if (!currentRoute.includes("dashboard")) {
        hasRedirected.current = true;
        router.replace("/dashboard");
      }
    } else {
      if (
        !["", "index", "login", "verify", "createprofilescreen"].includes(
          currentRoute
        )
      ) {
        hasRedirected.current = true;
        router.replace("/");
      }
    }
  }, [token, isAuthLoaded, initialChecked, segments]);

  if (!isAuthLoaded || !initialChecked) {
    return null;
  }

  return <>{children}</>;
}

export default AuthGate;
