import React, { useRef, useState } from "react";
import { Image, View, Text } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { api } from "@/lib/axios";
import { AppError } from "@/utils/AppError";
import { useAuth } from "@/hooks/useAuth";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useToast } from "@/components/Toast";

import Logo from "@/assets/logo.svg";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .email("Insira um email válido")
    .required("O email é obrigatório"),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguais")
    .required("Confirme a senha"),
});

export function SignUp() {
  const { toast } = useToast();

  const { signIn } = useAuth();

  const navigation = useNavigation();

  const scrollRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({ name, email, password }: any) {
    try {
      setIsLoading(true);

      await api.post("/users", {
        name,
        email,
        password,
      });

      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const description = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      toast(description, "destructive", 5000);
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

        <View className="flex items-center justify-center mb-8">
          <Logo width={200} height={200} />
          <Text className="-mt-20 text-white">
            Treine sua mente e seu corpo
          </Text>
        </View>

        <View className="flex items-center justify-center">
          <Text className="text-gray-100 font-semibold text-xl mb-6">
            Crie sua conta
          </Text>
        </View>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Nome"
              placeholder="Seu nome completo"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.name?.message}
              inputClasses="bg-gray-700"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              label="E-mail"
              placeholder="Seu e-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              value={value}
              errorMessage={errors.email?.message}
              inputClasses="bg-gray-700"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Senha"
              placeholder="Sua senha"
              secureTextEntry
              onChangeText={onChange}
              value={value}
              errorMessage={errors.password?.message}
              inputClasses="bg-gray-700"
            />
          )}
        />

        <Controller
          control={control}
          name="confirm_password"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Confirmar senha"
              placeholder="Confirme sua senha"
              secureTextEntry
              inputClasses="bg-gray-700"
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(handleSignUp)}
              returnKeyType="send"
              value={value}
              errorMessage={errors.confirm_password?.message}
              className="mb-8"
            />
          )}
        />

        <Button
          label="Criar e acessar"
          variant="default"
          onPress={handleSubmit(handleSignUp)}
        />

        <View className="flex-1" />
        <View>
          <Button
            className="mt-4 mb-8"
            label="Voltar para o login"
            variant="ghost"
            isLoading={isLoading}
            onPress={handleGoBack}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
