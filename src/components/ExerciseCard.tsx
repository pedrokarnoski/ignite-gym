import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/styles/colors";

type ExerciseCardProps = TouchableOpacityProps & {};

export function ExerciseCard({ ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <View className="flex-row bg-gray-500 items-center p-2 pr-4 rounded-md mb-3">
        <Image
          className="w-16 h-16 rounded-md mr-4"
          source={{
            uri: "https://www.feitodeiridium.com.br/wp-content/uploads/2016/07/remada-unilateral-3.jpg",
          }}
        />

        <View className="flex-1">
          <Text className="text-white text-lg">Remada Unilateral</Text>
          <Text numberOfLines={2} className="text-gray-100 text-sm">
            3 séries x 10 repetições
          </Text>
        </View>

        <MaterialIcons
          name="chevron-right"
          size={24}
          color={colors.gray[300]}
        />
      </View>
    </TouchableOpacity>
  );
}
