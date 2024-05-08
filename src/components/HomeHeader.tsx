import { View, Text, TouchableOpacity } from "react-native";

import { UserPhoto } from "./UserPhoto";

import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

import { useAuth } from "@/hooks/useAuth";

export function HomeHeader() {
  const { user, signOut } = useAuth();

  return (
    <View className="flex-row bg-gray-600 pt-14 pb-4 px-8 items-center">
      <UserPhoto
        size={56}
        source={
          user.avatar
            ? { uri: user.avatar }
            : require("@/assets/userPhotoDefault.png")
        }
      />
      <View className="flex-1 flex-col ml-4">
        <Text className="text-gray-100 text-lg">Olá, </Text>
        <Text className="text-gray-100 font-medium">{user.name}</Text>
      </View>

      <TouchableOpacity onPress={signOut}>
        <MaterialIcons name="logout" color={colors.gray[200]} size={28} />
      </TouchableOpacity>
    </View>
  );
}
