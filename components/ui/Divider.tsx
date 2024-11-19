import React from "react";
import { View, ViewProps } from "react-native";
import { Text } from "./Text";
import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";

const dividerVariants = cva("bg-border", {
  variants: {
    orientation: {
      horizontal: "w-full h-px",
      vertical: "h-full w-px",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

interface DividerProps extends ViewProps, VariantProps<typeof dividerVariants> {
  /**
   * The text to display in the divider
   */
  text?: string;
  /**
   * Custom styles for the divider line
   */
  lineClassName?: string;
  /**
   * Custom styles for the text container
   */
  textContainerClassName?: string;
  /**
   * Custom styles for the text
   */
  textClassName?: string;
}

/**
 * A customizable Divider component for React Native applications
 *
 * @component
 * @example
 * <Divider />
 * <Divider orientation="vertical" className="h-6" />
 * <Divider text="OR" textClassName="px-2 text-gray-500" />
 */
export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  text,
  className,
  lineClassName,
  textContainerClassName,
  textClassName,
  ...props
}) => {
  const isHorizontal = orientation === "horizontal";

  if (!text) {
    return (
      <View
        className={cn(
          dividerVariants({ orientation }),
          lineClassName,
          className
        )}
        {...props}
      />
    );
  }

  return (
    <View
      className={cn(
        "flex-row items-center",
        isHorizontal ? "w-full" : "flex-col h-full",
        className
      )}
      {...props}
    >
      <View
        className={cn(
          dividerVariants({ orientation }),
          isHorizontal ? "flex-1" : "flex-1 w-px",
          lineClassName
        )}
      />
      <View
        className={cn(isHorizontal ? "px-2" : "py-2", textContainerClassName)}
      >
        <Text className={cn("text-sm text-muted-foreground", textClassName)}>
          {text}
        </Text>
      </View>
      <View
        className={cn(
          dividerVariants({ orientation }),
          isHorizontal ? "flex-1" : "flex-1 w-px",
          lineClassName
        )}
      />
    </View>
  );
};
