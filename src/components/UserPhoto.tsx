import { Image, ImageProps } from "react-native";

type UserPhotoProps = ImageProps & {
  size: number;
};

export function UserPhoto({ size, ...rest }: UserPhotoProps) {
  return (
    <Image
      width={size}
      height={size}
      className="mr-4 rounded-full border border-gray-400"
      {...rest}
    />
  );
}
