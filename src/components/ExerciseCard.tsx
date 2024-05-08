import {
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Text,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import { api } from "@/lib/axios";
import { ExerciseDTO } from "@/dtos/ExerciseDTO";

import { colors } from "@/styles/colors";

type ExerciseCardProps = TouchableOpacityProps & {
  data: ExerciseDTO;
};

export function ExerciseCard({ data, ...rest }: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest}>
      <View className="flex-row bg-gray-600 items-center p-2 pr-4 rounded-md mb-4">
        <Image
          className="w-16 h-16 rounded-md mr-4"
          resizeMode="cover"
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
        />

        <View className="flex-1">
          <Text className="text-white text-lg">{data.name}</Text>
          <Text numberOfLines={2} className="text-gray-100 text-sm">
            {data.series} séries x {data.repetitions} repetições
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
