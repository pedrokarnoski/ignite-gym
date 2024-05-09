import { useCallback, useState } from "react";
import { SectionList, View, Text, ActivityIndicator } from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { api } from "@/lib/axios";
import { AppError } from "@/utils/AppError";
import { HistoryByDayDTO } from "@/dtos/HistoryByDayDTO";

import { HistoryCard } from "@/components/HistoryCard";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useToast } from "@/components/Toast";

import { colors } from "@/styles/colors";

export function History() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);

      const response = await api.get("/history");

      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const description = isAppError
        ? error.message
        : "Não foi possível carregar o histórico. Tente novamente mais tarde.";

      toast(description, "destructive", 5000);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <View className="flex-1">
      <ScreenHeader title="Histórico de exercícios" />

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color={colors.green[500]} size="large" />
        </View>
      ) : (
        <SectionList
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          contentContainerClassName={
            exercises.length === 0 ? "flex-1 justify-center" : "pb-8"
          }
          ListEmptyComponent={() => (
            <Text className="text-gray-100 text-center">
              Você ainda não realizou nenhum exercício.
            </Text>
          )}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section }) => (
            <Text className="text-gray-100 mt-6 mb-2">{section.title}</Text>
          )}
          className="px-8"
        />
      )}
    </View>
  );
}
