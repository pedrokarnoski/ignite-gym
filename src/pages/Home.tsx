import { useState } from "react";
import { FlatList, View, Text } from "react-native";

import { HomeHeader } from "@/components/HomeHeader";
import { Group } from "@/components/Group";
import { ExerciseCard } from "@/components/ExerciseCard";

export function Home() {
  const [groups, setGroups] = useState([
    "Costas",
    "Ombro",
    "Bíceps",
    "Tríceps",
  ]);
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada unilateral",
    "Remada curvada",
    "Levantamento terra",
  ]);
  const [groupSelected, setGroupSelected] = useState("Costas");

  return (
    <View className="flex-1">
      <HomeHeader />

      <View>
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-8 my-4 max-h-10"
          renderItem={({ item }) => (
            <Group
              name={item}
              isActive={groupSelected.toLowerCase() === item.toLowerCase()}
              onPress={() => setGroupSelected(item)}
            />
          )}
        />
      </View>

      <View className="flex-1 px-8">
        <View className="flex-row justify-between mb-4">
          <Text className="text-gray-200 font-bold">Exercícios</Text>
          <Text className="text-gray-200">{exercises.length}</Text>
        </View>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-8"
          renderItem={({ item }) => <ExerciseCard />}
        />
      </View>
    </View>
  );
}
