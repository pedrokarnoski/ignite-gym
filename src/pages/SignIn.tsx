import { Input } from "@/components/Input";
import { Image, View, Text } from "react-native";

import SvgUri from "react-native-svg-uri";

export function SignIn() {
  return (
    <View className="flex-1 bg-gray-700">
      <Image
        className="absolute"
        source={require("@/assets/background.png")}
        alt="Pessoas treinando"
      />

      <View className="flex items-center justify-center mb-20">
        <SvgUri
          width="200"
          height="200"
          source={require("@/assets/logo.svg")}
        />
        <Text className="-mt-20 text-white">Treine sua mente e seu corpo</Text>
      </View>

      <View className="flex items-center justify-center px-8">
        <Text className="text-gray-100 font-semibold text-xl mb-6">
          Acesse sua conta
        </Text>

        <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
        <Input placeholder="Senha" secureTextEntry />
      </View>
    </View>
  );
}
