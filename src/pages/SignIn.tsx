import React, { useRef, useState } from "react";
import { Image, View, Text } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Controller, useForm } from "react-hook-form";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";

import { useAuth } from "@/hooks/useAuth";

import { AppError } from "@/utils/AppError";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useToast } from "@/components/Toast";

import Logo from "@/assets/logo.svg";

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const { toast } = useToast();

  const { signIn } = useAuth();

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const scrollRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);

      await signIn(email, password);
    } catch (error) {
      console.log(error);
      const isAppError = error instanceof AppError;

      const description = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde.";

      toast(description, "destructive", 5000);

      setIsLoading(false);
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      ref={scrollRef}
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex-1 px-8">
        <Image
          className="absolute"
          source={require("@/assets/background.png")}
          defaultSource={require("@/assets/background.png")}
          alt="Pessoas treinando"
        />

        <View className="flex items-center justify-center mb-20">
          <Logo width={200} height={200} />
          <Text className="-mt-20 text-white">
            Treine sua mente e seu corpo
          </Text>
        </View>

        <View className="flex items-center justify-center">
          <Text className="text-gray-100 font-semibold text-xl mb-6">
            Acesse sua conta
          </Text>
        </View>

        <Controller
          control={control}
          name="email"
          rules={{ required: "Informe o e-mail" }}
          render={({ field: { onChange } }) => (
            <Input
              label="E-mail"
              placeholder="Seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              inputClasses="bg-gray-700"
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: "Informe a senha" }}
          render={({ field: { onChange } }) => (
            <Input
              label="Senha"
              placeholder="Sua senha"
              secureTextEntry
              inputClasses="bg-gray-700"
              className="mb-4"
              onChangeText={onChange}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Button
          label="Acessar"
          variant="default"
          isLoading={isLoading}
          onPress={handleSubmit(handleSignIn)}
        />

        <View className="flex-1" />
        <View className="mt-8 items-center justify-center">
          <Text className="text-gray-100 mb-4">Ainda não tem acesso?</Text>
        </View>
        <Button
          className="mb-8"
          label="Criar conta"
          variant="ghost"
          onPress={handleNewAccount}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
