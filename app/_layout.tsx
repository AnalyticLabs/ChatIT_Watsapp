import "~/global.css";
import React from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { ThemeWrapper } from "~/components/ThemeWrapper";
import { HeaderTitle } from "~/components/HeaderTitle";
import { DashboardHeader } from "~/components/DashboardHeader";
import { Provider } from "react-redux";
import { store } from "~/store/index";
import Toast from "react-native-toast-message";
import { toastConfig } from "~/utils/toastConfig";
import AuthGate from "~/components/AuthGate";

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) return;
    if (Platform.OS === "web") {
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) return null;

  return (
    <Provider store={store}>
      <ThemeProvider value={isDarkColorScheme ? DarkTheme : DefaultTheme}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <SafeAreaView style={styles.safeArea}>
          <ThemeWrapper>
            <AuthGate>
              <Stack
                screenOptions={{
                  headerTitle: ({ children }) => (
                    <HeaderTitle title={children as string} />
                  ),
                }}
              >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen name="verify" options={{ headerShown: false }} />
                <Stack.Screen
                  name="dashboard"
                  options={{
                    header: () => <DashboardHeader />,
                  }}
                />
                <Stack.Screen
                  name="chatscreen"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="createprofilescreen"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="groupchat"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen name="call" options={{ headerShown: false }} />
                <Stack.Screen
                  name="groupcall"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="contactlog"
                  options={{ headerShown: false }}
                />
              </Stack>
            </AuthGate>
            <PortalHost />
          </ThemeWrapper>
          <Toast config={toastConfig} />
        </SafeAreaView>
      </ThemeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
