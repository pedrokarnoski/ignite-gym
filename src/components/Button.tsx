import { type VariantProps, cva } from "class-variance-authority";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "flex flex-row items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-green-700",
        ghost: "border border-green-500",
        link: "underline-offset-4",
      },
      size: {
        default: "h-14 px-4",
        sm: "h-8 px-2",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva("text-center font-medium", {
  variants: {
    variant: {
      default: "text-white",
      ghost: "text-green-500",
      link: "text-gray-100",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  label: string;
  labelClasses?: string;
  isLoading?: boolean;
}
function Button({
  label,
  labelClasses,
  className,
  variant,
  size,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} disabled={isLoading} {...props}>
      <View
        className={cn(
          buttonVariants({ variant, size, className }),
          isLoading ? "opacity-50" : "opacity-100"
        )}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text
            className={cn(
              buttonTextVariants({
                variant,
                size,
                className: labelClasses,
              })
            )}
          >
            {label}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export { Button, buttonVariants, buttonTextVariants };
