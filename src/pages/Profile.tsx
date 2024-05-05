import { useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";

import { ScreenHeader } from "@/components/ScreenHeader";
import { UserPhoto } from "@/components/UserPhoto";
import { Skeleton } from "@/components/Skeleton";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  return (
    <View className="flex-1">
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <View className="flex-1 items-center mt-6 px-8">
          {photoIsLoading ? (
            <Skeleton className="w-36 h-36 bg-gray-300 rounded-full" />
          ) : (
            <UserPhoto
              size={124}
              source={{ uri: "https://github.com/pedrokarnoski.png" }}
            />
          )}

          <TouchableOpacity>
            <Text className="text-green-500 font-bold mt-2 mb-4">
              Alterar foto
            </Text>
          </TouchableOpacity>
        </View>

        <View className="px-8">
          <Input
            label="Nome"
            placeholder="Seu nome"
            inputClasses="bg-gray-600"
          />
          <Input
            label="E-mail"
            value="pedrokarnoski@gmail.com"
            editable={false}
            inputClasses="bg-gray-600"
          />
        </View>

        <View className="px-8 mt-4 mb-8">
          <Text className="text-center text-gray-200 font-bold mb-4">
            Alterar senha
          </Text>

          <Input
            label="Senha antiga"
            placeholder="Sua senha antiga"
            inputClasses="bg-gray-600"
            secureTextEntry
          />
          <Input
            label="Nova senha"
            placeholder="Sua nova senha"
            inputClasses="bg-gray-600"
            secureTextEntry
          />
          <Input
            label="Confirmar senha"
            placeholder="Confirme sua senha"
            inputClasses="bg-gray-600"
            secureTextEntry
          />

          <Button label="Atualizar" className="my-4" />
        </View>
      </ScrollView>
    </View>
  );
}
