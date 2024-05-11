import { ActivityIndicator, View } from "react-native";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { useAuth } from "@/hooks/useAuth";

import { colors } from "@/styles/colors";

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if (isLoadingUserStorageData) {
    return (
      <View className="flex-1 bg-gray-700 items-center justify-center">
        <ActivityIndicator color={colors.green[500]} size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-700">
      <NavigationContainer>
        {user.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  );
}
