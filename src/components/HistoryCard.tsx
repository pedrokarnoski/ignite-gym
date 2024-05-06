import { View, Text } from "react-native";

export function HistoryCard() {
  return (
    <View className="flex-row w-full px-4 py-4 mb-4 bg-gray-600 rounded-md items-center justify-between">
      <View className="flex-1">
        <Text className="text-white capitalize text-xl font-bold">Costas</Text>

        <Text numberOfLines={1} className="text-gray-100 text-lg">
          Puxada frontal
        </Text>
      </View>
      <Text className="text-gray-300">17:21</Text>
    </View>
  );
}
