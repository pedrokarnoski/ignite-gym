import { useState, useEffect, useCallback } from "react";
import { FlatList, View, Text, ActivityIndicator } from "react-native";

import { api } from "@/lib/axios";
import { AppError } from "@/utils/AppError";
import { ExerciseDTO } from "@/dtos/ExerciseDTO";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";

import { HomeHeader } from "@/components/HomeHeader";
import { Group } from "@/components/Group";
import { ExerciseCard } from "@/components/ExerciseCard";
import { useToast } from "@/components/Toast";

import { colors } from "@/styles/colors";

export function Home() {
  const { toast } = useToast();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState("antebraço");

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate("exercise", { exerciseId });
  }

  async function fetchGroups() {
    try {
      const response = await api.get("/groups");

      setGroups(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const description = isAppError
        ? error.message
        : "Não foi possível carregar os grupos. Tente novamente mais tarde.";

      toast(description, "destructive", 5000);
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/bygroup/${groupSelected}`);

      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const description = isAppError
        ? error.message
        : "Não foi possível carregar os exercícios. Tente novamente mais tarde.";

      toast(description, "destructive", 5000);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [groupSelected])
  );

  return (
    <View className="flex-1">
      <HomeHeader />

      <View>
        <FlatList
          data={groups}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-8 my-6 min-h-10 max-h-10"
          renderItem={({ item }) => (
            <Group
              name={item}
              isActive={groupSelected.toLowerCase() === item.toLowerCase()}
              onPress={() => setGroupSelected(item)}
            />
          )}
        />
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator color={colors.green[500]} size="large" />
        </View>
      ) : (
        <View className="flex-1 px-8">
          <View className="flex-row justify-between mb-4">
            <Text className="text-gray-200 font-bold">Exercícios</Text>
            <Text className="text-gray-200">{exercises.length}</Text>
          </View>

          <FlatList
            data={exercises}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-8"
            renderItem={({ item }) => (
              <ExerciseCard
                onPress={() => handleOpenExerciseDetails(item.id)}
                data={item}
              />
            )}
          />
        </View>
      )}
    </View>
  );
}
