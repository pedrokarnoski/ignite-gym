import { useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as yup from "yup";

import { api } from "@/lib/axios";
import { AppError } from "@/utils/AppError";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAuth } from "@/hooks/useAuth";

import { ScreenHeader } from "@/components/ScreenHeader";
import { UserPhoto } from "@/components/UserPhoto";
import { Skeleton } from "@/components/Skeleton";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useToast } from "@/components/Toast";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
};

const profileSchema = yup.object({
  name: yup.string().required("O nome é obrigatório"),
  // email: yup.string().email("Insira um email válido"),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  // old_password: yup
  //   .string()
  //   .min(6, "A senha antiga deve ter no mínimo 6 caracteres"),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguais.")
    .when("password", {
      is: (field: any) => field,
      then: (schema) =>
        schema
          .nullable()
          .required("Confirme a senha")
          .transform((value) => (!!value ? value : null)),
    }),
});

export function Profile() {
  const { toast } = useToast();

  const { user, updateUserProfile } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put("/users", data);

      await updateUserProfile(userUpdated);

      toast("Perfil atualizado!", "success", 3000);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const description = isAppError
        ? error.message
        : "Não foi possível atualizar o perfil. Tente novamente mais tarde.";

      toast(description, "destructive", 5000);
    } finally {
      setIsUpdating(false);
    }
  }

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

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoFile = {
          name: `${user.name}.${fileExtension}`
            .toLowerCase()
            .trim()
            .replaceAll(" ", "-"),
          uri: photoSelected.assets[0].uri,
          type: photoSelected.assets[0].mimeType,
        } as any;

        const userPhotoUploadForm = new FormData();
        userPhotoUploadForm.append("avatar", photoFile);

        const avatarUpdatedResponse = await api.patch(
          "/users/avatar",
          userPhotoUploadForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const userUpdated = user;
        userUpdated.avatar = avatarUpdatedResponse.data.avatar;

        updateUserProfile(userUpdated);

        toast("Foto atualizada!", "success", 3000);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;

      const description = isAppError
        ? error.message
        : "Não foi possível atualizar a foto. Tente novamente mais tarde.";

      toast(description, "destructive", 5000);
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
            <UserPhoto
              size={124}
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : require("@/assets/userPhotoDefault.png")
              }
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text className="text-green-500 font-bold mt-2 mb-4">
              Alterar foto
            </Text>
          </TouchableOpacity>
        </View>

        <View className="px-8">
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                label="Nome"
                placeholder="Seu nome"
                inputClasses="bg-gray-600"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                label="E-mail"
                editable={false}
                inputClasses="bg-gray-600"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>

        <View className="px-8 mt-4 mb-8">
          <Text className="text-center text-gray-200 font-bold mb-4">
            Alterar senha
          </Text>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                label="Senha antiga"
                placeholder="Sua senha antiga"
                secureTextEntry
                inputClasses="bg-gray-600"
                onChangeText={onChange}
                errorMessage={errors.old_password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                label="Nova senha"
                placeholder="Sua nova senha"
                secureTextEntry
                inputClasses="bg-gray-600"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange } }) => (
              <Input
                label="Confirmar senha"
                placeholder="Confirme sua senha"
                secureTextEntry
                inputClasses="bg-gray-600"
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            label="Atualizar"
            className="my-4"
            isLoading={isUpdating}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </View>
      </ScrollView>
    </View>
  );
}
