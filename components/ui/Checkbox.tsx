import React, { forwardRef } from "react";
import {
  TouchableOpacity,
  View,
  TouchableOpacityProps,
  Text,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { cn } from "@/lib/cn";
// import { Text } from "./Text";
import { colors } from "@/constants/colors";

interface CheckboxProps extends Omit<TouchableOpacityProps, "onPress"> {
  checked: boolean;
  onPress: () => void;
  label?: React.ReactElement | string;
  error?: boolean;
  rounded?: boolean;
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
      rounded = false,
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
            "w-7 h-7 border-2 border-primary-500 rounded justify-center items-center mr-2",
            checked ? "bg-transparent border-primary-500" : "border-gray-400",
            rounded && "rounded-full",
            error && "border-destructive",
            disabled && "opacity-50"
          )}
        >
          {checked && !rounded && (
            <AntDesign
              name="check"
              size={16}
              color={error ? "rgb(239 68 68)" : colors.primary[500]}
            />
          )}
          {checked && rounded && (
            <View
              className={cn(
                "w-3 h-3 rounded-full bg-primary-500",
                error && "bg-destructive"
              )}
            />
          )}
        </View>
        {typeof label === "string" ? (
          <Text
            className={cn(
              "text-lg font-normal break-words",
              error && "text-destructive",
              disabled && "text-muted-foreground"
            )}
          >
            {label}
          </Text>
        ) : (
          label
        )}
      </TouchableOpacity>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox, type CheckboxProps };
