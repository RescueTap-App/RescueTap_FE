import React, { forwardRef, useState } from "react";
import { TextInput, View, TextInputProps, Pressable } from "react-native";
import { Text } from "./Text";
import { Feather } from "@expo/vector-icons";
import { cn } from "@/lib/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { colors } from "@/constants/Colors";

const inputFieldVariants = cva(
  "w-full min-h-[48px] px-4 py-2 rounded-lg border-[1px] bg-white",
  {
    variants: {
      variant: {
        default: "border-neutral-200",
        error: "border-error",
        success: "border-success",
      },
      focused: {
        true: "border-primary-base",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      focused: false,
    },
  }
);

interface InputFieldProps
  extends Omit<TextInputProps, "placeholderTextColor">,
    VariantProps<typeof inputFieldVariants> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input */
  error?: string;
  /** Left icon component */
  leftIcon?: React.ReactNode;
  /** Right icon component */
  rightIcon?: React.ReactNode;
  /** Whether the input is a password field */
  isPassword?: boolean;
  /** Whether the input is a search field */
  isSearch?: boolean;
  /** Whether the input is a location field */
  isLocation?: boolean;
}

/**
 * A customizable Input component for React Native applications
 *
 * @component
 * @example
 * <InputField
 *   label="Username"
 *   placeholder="Enter username"
 *   error={errors.username?.message}
 *   onChangeText={(text) => setValue('username', text)}
 * />
 */
const InputField = forwardRef<TextInput, InputFieldProps>(
  (
    {
      label,
      error,
      variant,
      className,
      style,
      leftIcon,
      rightIcon,
      isPassword,
      isSearch,
      isLocation,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Determine the correct variant based on error state
    const inputVariant = error ? "error" : variant || "default";

    // Handle password visibility toggle
    const togglePasswordVisibility = () =>
      setIsPasswordVisible(!isPasswordVisible);

    // Determine the right icon based on props
    const renderRightIcon = () => {
      if (isPassword) {
        return (
          <Pressable onPress={togglePasswordVisibility} className="p-2">
            {isPasswordVisible ? (
              <Feather name="eye" size={20} color="#5E5E5E" />
            ) : (
              <Feather name="eye-off" size={20} color="#5E5E5E" />
            )}
          </Pressable>
        );
      }
      if (isSearch) {
        return <Feather name="search" size={20} color="#5E5E5E" />;
      }
      if (isLocation) {
        return <Feather name="map-pin" size={20} color="#5E5E5E" />;
      }
      return rightIcon;
    };

    return (
      <View className="w-full relative z-0">
        {label && (
          <Text
            variant="subhead"
            className={cn(
              "mb-2 absolute -top-3 left-4 z-20 bg-white px-[2px]",
              error ? "text-error" : "text-neutral-900"
            )}
          >
            {label}
          </Text>
        )}
        <View className="relative">
          <View
            className={cn(
              inputFieldVariants({ variant: inputVariant, focused: isFocused }),
              "flex-row items-center",
              className
            )}
            style={[
              style,
              error && { borderColor: colors.error },
              isFocused && { borderColor: colors.primary.base },
            ]}
          >
            {leftIcon && <View className="mr-2">{leftIcon}</View>}
            <TextInput
              ref={ref}
              className="flex-1 text-base text-neutral-900 p-0"
              placeholderTextColor="#9B9B9B"
              secureTextEntry={isPassword && !isPasswordVisible}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />
            {renderRightIcon() && (
              <View className="ml-2">{renderRightIcon()}</View>
            )}
          </View>
        </View>
        {error && (
          <Text variant="caption1" className="text-error mt-1">
            {error}
          </Text>
        )}
      </View>
    );
  }
);

InputField.displayName = "InputField";

export { InputField, type InputFieldProps };

// import React, { forwardRef, useState } from "react";
// import { TextInput, View, TextInputProps, Pressable } from "react-native";
// import { Text } from "./Text";
// import { AntDesign, Feather } from "@expo/vector-icons";
// import { cn } from "@/lib/cn";
// import { cva, type VariantProps } from "class-variance-authority";
// import { colors } from "@/constants/colors";

// const inputFieldVariants = cva(
//   "w-full min-h-[48px] px-4 py-2 rounded-lg border-[1px] bg-white",
//   {
//     variants: {
//       variant: {
//         default: "border-neutral-200",
//         error: "border-error",
//         success: "border-success",
//       },
//       focused: {
//         true: "border-primary-base",
//         false: "",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       focused: false,
//     },
//   }
// );

// interface InputFieldProps
//   extends Omit<TextInputProps, "placeholderTextColor">,
//     VariantProps<typeof inputFieldVariants> {
//   /** Label text displayed above the input */
//   label?: string;
//   /** Error message displayed below the input */
//   error?: string;
//   /** Left icon component */
//   leftIcon?: React.ReactNode;
//   /** Right icon component */
//   rightIcon?: React.ReactNode;
//   /** Whether the input is a password field */
//   isPassword?: boolean;
//   /** Whether the input is a search field */
//   isSearch?: boolean;
//   /** Whether the input is a location field */
//   isLocation?: boolean;
// }

// /**
//  * A customizable Input component for React Native applications
//  *
//  * @component
//  * @example
//  * <Input
//  *   label="Username"
//  *   placeholder="Enter username"
//  *   error={errors.username?.message}
//  *   onChangeText={(text) => setValue('username', text)}
//  * />
//  */
// const InputField = forwardRef<TextInput, InputFieldProps>(
//   (
//     {
//       label,
//       error,
//       variant,
//       className,
//       style,
//       leftIcon,
//       rightIcon,
//       isPassword,
//       isSearch,
//       isLocation,
//       ...props
//     },
//     ref
//   ) => {
//     const [isFocused, setIsFocused] = useState(false);
//     const [isPasswordVisible, setIsPasswordVisible] = useState(false);

//     // Determine the correct variant based on error state
//     const inputVariant = error ? "error" : variant;

//     // Handle password visibility toggle
//     const togglePasswordVisibility = () =>
//       setIsPasswordVisible(!isPasswordVisible);

//     // Determine the right icon based on props
//     const renderRightIcon = () => {
//       if (isPassword) {
//         return (
//           <Pressable onPress={togglePasswordVisibility} className="p-2">
//             {isPasswordVisible ? (
//               <Feather name="eye" size={20} color="#5E5E5E" />
//             ) : (
//               <Feather name="eye-off" size={20} color="#5E5E5E" />
//             )}
//           </Pressable>
//         );
//       }
//       if (isSearch) {
//         return <Feather name="search" size={20} color="#5E5E5E" />;
//       }
//       if (isLocation) {
//         return <Feather name="map-pin" size={20} color="#5E5E5E" />;
//       }
//       return rightIcon;
//     };

//     return (
//       <View className="w-full">
//         {label && (
//           <Text
//             variant="subhead"
//             className={cn("mb-1", error ? "text-error" : "text-neutral-900")}
//           >
//             {label}
//           </Text>
//         )}
//         <View className="relative">
//           <View
//             className={cn(
//               inputVariant({ variant: inputVariant, focused: isFocused }),
//               "flex-row items-center",
//               className
//             )}
//             style={[
//               style,
//               error && { borderColor: colors.error },
//               isFocused && { borderColor: colors.primary.base },
//             ]}
//           >
//             {leftIcon && <View className="mr-2">{leftIcon}</View>}
//             <TextInput
//               ref={ref}
//               className="flex-1 text-base text-neutral-900 p-0"
//               placeholderTextColor="#9B9B9B"
//               secureTextEntry={isPassword && !isPasswordVisible}
//               onFocus={() => setIsFocused(true)}
//               onBlur={() => setIsFocused(false)}
//               {...props}
//             />
//             {renderRightIcon() && (
//               <View className="ml-2">{renderRightIcon()}</View>
//             )}
//           </View>
//         </View>
//         {error && (
//           <Text variant="caption1" className="text-error mt-1">
//             {error}
//           </Text>
//         )}
//       </View>
//     );
//   }
// );

// InputField.displayName = "InputField";

// export { InputField, type InputFieldProps };
