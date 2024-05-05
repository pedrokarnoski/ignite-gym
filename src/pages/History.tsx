import { SectionList, View, Text } from "react-native";

import { HistoryCard } from "@/components/HistoryCard";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useState } from "react";

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: "03/05/2024",
      data: ["Puxada frontal", "Remada unilateral"],
    },
    {
      title: "05/05/2024",
      data: ["Puxada alta"],
    },
  ]);

  return (
    <View className="flex-1">
      <ScreenHeader title="Histórico de exercícios" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
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
          <Text className="text-gray-100 mt-4 mb-2">{section.title}</Text>
        )}
        className="px-8"
      />
    </View>
  );
}
