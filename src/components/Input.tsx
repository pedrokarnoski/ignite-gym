import { colors } from "@/styles/colors";
import { TextInput, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="w-full bg-gray-700 h-14 px-4 mb-4 text-white rounded focus:border focus:border-green-500"
      placeholderTextColor={colors.gray[300]}
      {...rest}
    ></TextInput>
  );
}
