import { Text, Pressable, PressableProps } from "react-native";

type GroupProps = PressableProps & {
  name: string;
  isActive?: boolean;
};

export function Group({ name, isActive = false, ...rest }: GroupProps) {
  return (
    <Pressable
      className={`mr-3 w-24 h-10 bg-gray-600 justify-center items-center rounded-md overflow-hidden ${
        isActive ? "border border-green-500" : ""
      }`}
      {...rest}
    >
      <Text
        className={`uppercase font-bold text-xs ${
          isActive ? "text-green-500" : "text-gray-200"
        }`}
      >
        {name}
      </Text>
    </Pressable>
  );
}
