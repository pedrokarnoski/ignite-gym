import React, { useRef } from "react";
import { Image, View, Text } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import Logo from "@/assets/logo.svg";

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const scrollRef = useRef();

  function handleNewAccount() {
    navigation.navigate("signUp");
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

        <Input
          label="E-mail"
          placeholder="Seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          inputClasses="bg-gray-700"
        />
        <Input
          label="Senha"
          placeholder="Sua senha"
          secureTextEntry
          inputClasses="bg-gray-700"
          className="mb-4"
        />

        <Button label="Acessar" variant="default" />

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
