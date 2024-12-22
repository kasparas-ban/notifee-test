import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import * as SystemUI from "expo-system-ui";
import "react-native-reanimated";
import { NotifierWrapper } from "react-native-notifier";

import appStateStore from "@/stores/appStore";
import { ClerkProvider } from "@/providers/ClerkProvider";
import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import SyncProvider from "@/providers/SyncProvider/SyncProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StorageProvider } from "@/providers/StorageProvider";
import Colors from "@/constants/Colors";
import GlobalLoadingScreen from "@/components/GlobalLoadingScreen/GlobalLoadingScreen";
import NotificationProvider from "@/notifications/NotificationProvider";
import { useColorScheme } from "react-native";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: appStateStore().isFirstOpen ? "(start)/start" : "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    Gabarito: require("../assets/fonts/Gabarito-VariableFont_wght.ttf"),
    GabaritoSemibold: require("../assets/fonts/Gabarito-SemiBold.ttf"),
    GabaritoBold: require("../assets/fonts/Gabarito-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(
      colorScheme === "dark" ? Colors.gray[900] : Colors.light.background
    );
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <>
      <ClerkProvider>
        <QueryProvider>
          <AuthProvider>
            <SyncProvider>
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                <GestureHandlerRootView style={{ flex: 1 }}>
                  {/* <DevInfoTagProvider> */}
                  {/* <ConnectionTagProvider> */}
                  <BottomSheetModalProvider>
                    <NotifierWrapper>
                      <NotificationProvider />
                      <StorageProvider />
                      <GlobalLoadingScreen>
                        <Stack>
                          <Stack.Screen
                            name="(start)/index"
                            options={{ headerShown: false }}
                            redirect
                          />
                          <Stack.Screen
                            name="(start)/start"
                            options={{ headerShown: false }}
                          />
                          <Stack.Screen
                            name="(tabs)"
                            options={{ headerShown: false }}
                          />
                          <Stack.Screen
                            name="(modals)/(publicAuth)"
                            options={{ headerShown: false }}
                          />
                          <Stack.Screen
                            name="(modals)/(privateAuth)"
                            options={{ headerShown: false }}
                          />
                          <Stack.Screen
                            name="(modals)/timer-settings"
                            options={{
                              presentation: "modal",
                              headerTransparent: true,
                              title: "",
                            }}
                          />
                          <Stack.Screen
                            name="(modals)/(items)/general-item"
                            options={{
                              presentation: "modal",
                              headerTransparent: true,
                              title: "",
                            }}
                          />
                          <Stack.Screen
                            name="(modals)/(items)/add-task"
                            options={{
                              presentation: "modal",
                              headerTransparent: true,
                              title: "",
                            }}
                          />
                          <Stack.Screen
                            name="(modals)/(items)/add-goal"
                            options={{
                              presentation: "modal",
                              headerTransparent: true,
                              title: "",
                            }}
                          />
                          <Stack.Screen
                            name="(modals)/(items)/add-dream"
                            options={{
                              presentation: "modal",
                              headerTransparent: true,
                              title: "",
                            }}
                          />
                          {/* <Stack.Screen
                            name="(modals)/(items)/edit-item"
                            options={{
                              presentation: "transparentModal",
                              animation: "fade",
                              headerTransparent: true,
                              title: "",
                              headerBackVisible: false,
                            }}
                          /> */}
                        </Stack>
                      </GlobalLoadingScreen>
                    </NotifierWrapper>
                  </BottomSheetModalProvider>
                  {/* </ConnectionTagProvider> */}
                  {/* </DevInfoTagProvider> */}
                </GestureHandlerRootView>
              </ThemeProvider>
            </SyncProvider>
          </AuthProvider>
        </QueryProvider>
      </ClerkProvider>
      <StatusBar />
    </>
  );
}
