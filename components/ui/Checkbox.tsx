import React, { forwardRef } from "react";
import { TouchableOpacity, View, TouchableOpacityProps } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { cn } from "@/lib/cn";
import { Text } from "./Text";

interface CheckboxProps extends Omit<TouchableOpacityProps, "onPress"> {
  checked: boolean;
  onPress: () => void;
  label?: string;
  error?: boolean;
}

/**
 * A customizable Checkbox component. This should work fine with validators like zod.
 *
 * @component
 * @example
 * <Checkbox
 *   checked={isChecked}
 *   onPress={() => setIsChecked(!isChecked)}
 *   label="I agree to the terms and conditions"
 * />
 */
const Checkbox = forwardRef<View, CheckboxProps>(
  (
    {
      checked,
      onPress,
      label,
      error = false,
      disabled = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={disabled}
        className={cn(
          "flex-row items-center my-2",
          disabled && "opacity-50",
          className
        )}
        style={style}
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        {...props}
      >
        <View
          className={cn(
            "w-5 h-5 border-2 rounded justify-center items-center mr-2",
            checked ? "bg-primary border-primary" : "border-gray-400",
            error && "border-destructive",
            disabled && "opacity-50"
          )}
        >
          {checked && (
            <AntDesign
              name="check"
              size={16}
              color={error ? "rgb(239 68 68)" : "white"}
            />
          )}
        </View>
        {label && (
          <Text
            variant="body"
            className={cn(
              error && "text-destructive",
              disabled && "text-muted-foreground"
            )}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox, type CheckboxProps };
