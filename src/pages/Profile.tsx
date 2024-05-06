import { useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { ScreenHeader } from "@/components/ScreenHeader";
import { UserPhoto } from "@/components/UserPhoto";
import { Skeleton } from "@/components/Skeleton";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";

export function Profile() {
  const { toast } = useToast();

  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyQ2EXjnw4zvNBp0bTe_-94DSG9QGLmQVfglHYIeQzcA&s"
  );

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!photoSelected.canceled && photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          toast(
            "A imagem selecionada é muito grande. A imagem deve ter no máximo 5MB.",
            "destructive",
            8000
          );

          return;
        }

        setUserPhoto(photoSelected.assets[0].uri);

        toast("Imagem alterada", "success", 3000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPhotoIsLoading(false);
    }
  }

  return (
    <View className="flex-1">
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <View className="flex-1 items-center mt-6 px-8">
          {photoIsLoading ? (
            <Skeleton className="w-36 h-36 bg-gray-300 rounded-full" />
          ) : (
            <UserPhoto size={124} source={{ uri: userPhoto }} />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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
