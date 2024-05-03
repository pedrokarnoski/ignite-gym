import { useState } from "react";
import { FlatList, View, Text } from "react-native";

import { HomeHeader } from "@/components/HomeHeader";
import { Group } from "@/components/Group";

export function Home() {
  const [groups, setGroups] = useState([
    "costas",
    "ombro",
    "bíceps",
    "tríceps",
  ]);
  const [groupSelected, setGroupSelected] = useState("costa");

  return (
    <View>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-8 my-4 max-h-10"
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected === item}
            onPress={() => setGroupSelected(item)}
          />
        )}
      />

      <View className="px-8">
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-200 font-bold">Exercícios</Text>
          <Text className="text-gray-200">4</Text>
        </View>
      </View>
    </View>
  );
}
