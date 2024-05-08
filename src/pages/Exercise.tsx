import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";

import { api } from "@/lib/axios";
import { AppError } from "@/utils/AppError";

import { MaterialIcons } from "@expo/vector-icons";

import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";

import { colors } from "@/styles/colors";

import BodySvg from "@/assets/body.svg";
import SeriesSvg from "@/assets/series.svg";
import RepetitionsSvg from "@/assets/repetitions.svg";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@/dtos/ExerciseDTO";

type ExerciseRouteParamsParams = {
  exerciseId: string;
};

export function Exercise() {
  const { toast } = useToast();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();

  const { exerciseId } = route.params as ExerciseRouteParamsParams;

  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails() {
    try {
      const response = await api.get(`/exercises/${exerciseId}`);

      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const description = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício. Tente novamente mais tarde.";

      toast(description, "destructive", 5000);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <View className="flex-1">
      <View className="px-8 bg-gray-600 pt-8">
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons
            name="chevron-left"
            color={colors.green[500]}
            size={28}
          />
        </TouchableOpacity>

        <View className="flex-row justify-between mb-8 items-center">
          <Text className="text-gray-100 text-xl font-bold shrink">
            {exercise.name}
          </Text>

          <View className="flex-row items-center">
            <BodySvg />
            <Text className="text-gray-200 ml-1 capitalize">
              {exercise.group}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View className="p-8">
          <View className="mb-4 rounded-md overflow-hidden">
            <Image
              className="w-full h-80"
              resizeMode="cover"
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
            />
          </View>

          <View className="bg-gray-600 rounded-md pb-4 px-4">
            <View className="flex-row justify-around mb-6 mt-4">
              <View className="flex-row items-center">
                <SeriesSvg />
                <Text className="text-gray-200 ml-2">
                  {exercise.series} séries
                </Text>
              </View>

              <View className="flex-row items-center">
                <RepetitionsSvg />
                <Text className="text-gray-200 ml-2">
                  {exercise.repetitions} repetições
                </Text>
              </View>
            </View>

            <Button label="Marcar como realizado" />
          </View>

          <Button
            variant="link"
            label="Voltar"
            className="mt-1"
            onPress={handleGoBack}
          />
        </View>
      </ScrollView>
    </View>
  );
}
