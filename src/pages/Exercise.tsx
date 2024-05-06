import { View, TouchableOpacity, Text, Image, ScrollView } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";

import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "@/styles/colors";

import { Button } from "@/components/Button";

import BodySvg from "@/assets/body.svg";
import SeriesSvg from "@/assets/series.svg";
import RepetitionsSvg from "@/assets/repetitions.svg";

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

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
            Puxada frontal
          </Text>

          <View className="flex-row items-center">
            <BodySvg />
            <Text className="text-gray-200 ml-1 capitalize">
              Puxada frontal
            </Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View className="p-8">
          <Image
            className="w-full h-80 mb-4 rounded-md"
            resizeMode="cover"
            source={{
              uri: "https://www.feitodeiridium.com.br/wp-content/uploads/2016/07/remada-unilateral-3.jpg",
            }}
          />

          <View className="bg-gray-600 rounded-md pb-4 px-4">
            <View className="flex-row justify-around mb-6 mt-4">
              <View className="flex-row items-center">
                <SeriesSvg />
                <Text className="text-gray-200 ml-2">3 séries</Text>
              </View>

              <View className="flex-row items-center">
                <RepetitionsSvg />
                <Text className="text-gray-200 ml-2">10 repetições</Text>
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
