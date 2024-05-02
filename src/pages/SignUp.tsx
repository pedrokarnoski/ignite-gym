import React, { useRef } from "react";
import { Image, View, Text } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useNavigation } from "@react-navigation/native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import Logo from "@/assets/logo.svg";

export function SignUp() {
  const navigation = useNavigation();

  const scrollRef = useRef();

  function handleGoBack() {
    navigation.goBack();
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
            Crie sua conta
          </Text>

          <Input placeholder="Nome" />
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />
        </View>

        <Button label="Criar e acessar" variant="default" />

        <View className="flex-1" />
        <View>
          <Button
            className="mt-4 mb-8"
            label="Voltar para o login"
            variant="ghost"
            onPress={handleGoBack}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
