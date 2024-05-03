import { View, Text, TouchableOpacity } from "react-native";

import { UserPhoto } from "./UserPhoto";

import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

export function HomeHeader() {
  return (
    <View className="flex-row bg-gray-600 pt-14 pb-4 px-8 items-center">
      <UserPhoto
        size={56}
        source={{ uri: "https://github.com/pedrokarnoski.png" }}
      />
      <View className="flex-1 flex-col">
        <Text className="text-gray-100 text-lg">Olá, </Text>
        <Text className="text-gray-100 font-medium">Pedro</Text>
      </View>

      <TouchableOpacity>
        <MaterialIcons name="logout" color={colors.gray[200]} size={28} />
      </TouchableOpacity>
    </View>
  );
}
