import React from "react";
import { Image, View, ViewStyle } from "react-native";
import { Text } from "./Text";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const avatarVariants = cva(
  "items-center justify-center bg-neutral-200 overflow-hidden",
  {
    variants: {
      size: {
        xs: "w-6 h-6",
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
        "2xl": "w-24 h-24",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-lg",
      },
      border: {
        none: "",
        thin: "border border-neutral-200",
        thick: "border-2 border-neutral-200",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      border: "none",
    },
  }
);

interface AvatarProps extends VariantProps<typeof avatarVariants> {
  /** Source URL for the avatar image */
  source?: string;
  /** Fallback text to show when image fails or isn't provided */
  fallback?: string;
  /** Additional className to apply to the avatar */
  className?: string;
  /** Additional style to apply to the avatar */
  style?: ViewStyle;
}

/**
 * A customizable Avatar component for React Native applications
 *
 * @component
 * @example
 * <Avatar
 *   source="https://example.com/avatar.jpg"
 *   fallback="JD"
 *   size="lg"
 *   shape="circle"
 * />
 */
export function Avatar({
  source,
  fallback,
  size,
  shape,
  border,
  className,
  style,
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);

  // Get initials from fallback text
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get text size based on avatar size
  const getTextSize = () => {
    switch (size) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "md":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      case "2xl":
        return "text-2xl";
      default:
        return "text-base";
    }
  };

  return (
    <View
      className={cn(avatarVariants({ size, shape, border }), className)}
      style={style}
    >
      {source && !imageError ? (
        <Image
          source={{ uri: source }}
          className="w-full h-full bg-gray-100"
          onError={() => setImageError(true)}
        />
      ) : fallback ? (
        <Text className={cn("font-medium text-neutral-600", getTextSize())}>
          {getInitials(fallback)}
        </Text>
      ) : (
        <Text className={cn("font-medium text-neutral-600", getTextSize())}>
          {"??"}
        </Text>
      )}
    </View>
  );
}
