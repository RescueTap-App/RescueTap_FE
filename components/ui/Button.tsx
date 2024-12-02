import React from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  View,
} from "react-native";
import { Text } from "./Text";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-[10px]",
  {
    variants: {
      variant: {
        default: "bg-primary-base",
        destructive: "bg-destructive",
        outline: "border border-primary-base bg-wite",
        secondary: "bg-secondary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends PressableProps,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  /** Whether the button is in a loading state */
  isLoading?: boolean;
  /** Text to display when in loading state */
  loadingText?: string;
}

/**
 * A customizable Button component
 *
 * @component
 * @example
 * <Button
 *   variant="primary"
 *   size="lg"
 *   onPress={() => console.log('Button pressed')}
 *   iconLeft={<Icon name="star" />}
 *   isLoading={isLoading}
 *   loadingText="Processing..."
 * >
 *   Press Me
 * </Button>
 */
const Button = React.forwardRef<View, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      iconLeft,
      iconRight,
      isLoading,
      loadingText,
      disabled,
      ...props
    },
    ref
  ) => {
    const content = (
      <View
        className={cn(
          "flex-row items-center justify-center",
          isLoading && "opacity-80"
        )}
      >
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={variant === "outline" ? "black" : "white"}
            className="mr-2"
          />
        )}
        {!isLoading && iconLeft}
        {typeof children === "string" ? (
          <Text
            className={cn(
              "text-lg font-medium text-white leading-none",
              variant === "destructive" && "text-destructive-foreground",
              variant === "outline" && "text-primary-base",
              variant === "secondary" && "text-secondary-foreground",
              variant === "ghost" && "text-foreground",
              variant === "link" && "text-primary underline",
              (iconLeft || iconRight) && "mx-2"
            )}
          >
            {isLoading ? loadingText || children : children}
          </Text>
        ) : (
          children
        )}
        {!isLoading && iconRight}
      </View>
    );

    return (
      <Pressable
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          buttonVariants({ variant, size, className }),
          isLoading && "opacity-50",
          disabled && "bg-dis_button"
        )}
        {...props}
      >
        {({ pressed }) => (
          <View
            className={cn(
              "flex-row items-center justify-center",
              pressed && "opacity-70"
            )}
          >
            {content}
          </View>
        )}
      </Pressable>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps };
