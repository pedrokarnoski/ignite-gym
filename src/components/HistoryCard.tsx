import { View, Text } from "react-native";
import { HistoryDTO } from "@/dtos/HistoryDTO";

type HistoryCardProps = {
  data: HistoryDTO;
};

export function HistoryCard({ data }: HistoryCardProps) {
  return (
    <View className="flex-row w-full px-4 py-4 mb-4 bg-gray-600 rounded-md items-center justify-between">
      <View className="flex-1">
        <Text className="text-white capitalize text-xl font-bold">
          {data.name}
        </Text>

        <Text numberOfLines={1} className="text-gray-100 text-lg">
          {data.group.charAt(0).toUpperCase() + data.group.slice(1)}
        </Text>
      </View>
      <Text className="text-gray-300">{data.hour}</Text>
    </View>
  );
}
