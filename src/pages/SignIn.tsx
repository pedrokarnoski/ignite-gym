import { Image, View, Text, ScrollView } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import Logo from "@/assets/logo.svg";

export function SignIn() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 bg-gray-700 px-8">
        <Image
          className="absolute"
          source={require("@/assets/background.png")}
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

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input placeholder="Senha" secureTextEntry />
        </View>

        <Button label="Acessar" variant="default" />

        <View className="mt-24 items-center justify-center">
          <Text className="text-gray-100 mb-3">Ainda não tem acesso?</Text>
        </View>
        <Button label="Criar conta" variant="ghost" />
      </View>
    </ScrollView>
  );
}
