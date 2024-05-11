import { forwardRef } from "react";
import { Text, TextInput, View } from "react-native";

import { cn } from "../lib/utils";
import { colors } from "@/styles/colors";

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
  errorMessage?: string;
}

const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  (
    {
      className,
      label,
      labelClasses,
      inputClasses,
      errorMessage = null,
      ...props
    },
    ref
  ) => (
    <View className={cn("flex flex-col gap-2 mb-2", className)}>
      <View className="flex-row justify-between">
        {label && (
          <Text className={cn("text-gray-100", labelClasses)}>{label}</Text>
        )}
        {errorMessage && <Text className="text-red-600">{errorMessage}</Text>}
      </View>
      <TextInput
        placeholderTextColor={colors.gray[300]}
        className={cn(
          inputClasses,
          "text-white py-2.5 px-4 h-14 rounded-md focus:border focus:border-green-500",
          errorMessage ? "border border-red-500" : ""
        )}
        {...props}
      />
    </View>
  )
);

export { Input };
