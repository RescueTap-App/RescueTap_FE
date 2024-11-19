import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { cn } from "@/lib/cn";

const textVariants = cva("text", {
  variants: {
    variant: {
      largeTitle: "text-4xl",
      title1: "text-2xl",
      title2: "text-[22px] leading-7",
      title3: "text-xl",
      heading: "text-[17px] leading-6 font-semibold",
      body: "text-[17px] leading-6",
      callout: "text-base",
      subhead: "text-[15px] leading-6",
      footnote: "text-[13px] leading-5",
      caption1: "text-xs",
      caption2: "text-[11px] leading-4",
    },
    color: {
      primary: "",
      secondary: "text-secondary-foreground/90",
      tertiary: "text-muted-foreground/90",
      quarternary: "text-muted-foreground/50",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "primary",
  },
});

type TextVariantsProps = VariantProps<typeof textVariants>;

/**
 * Props for the Text component
 * @extends RNTextProps
 * @extends TextVariantsProps
 */
interface TextProps extends RNTextProps, TextVariantsProps {
  /** Additional Tailwind classes to apply to the text */
  className?: string;
}

/**
 * A customizable Text component for React Native applications
 *
 * @component
 * @param {TextProps} props - The props for the Text component
 * @param {TextProps['variant']} [props.variant='body'] - The style variant of the text
 * @param {TextProps['color']} [props.color='primary'] - The color variant of the text
 * @param {string} [props.className] - Additional Tailwind classes to apply
 *
 * @example
 * // Basic usage
 * <Text>Default body text</Text>
 *
 * @example
 * // Using variants and colors
 * <Text variant="title1" color="secondary">Large secondary title</Text>
 *
 * @example
 * // With custom className and style
 * <Text variant="subhead" color="tertiary" className="mt-2" style={{ letterSpacing: 0.5 }}>
 *   Custom subhead text
 * </Text>
 */
const Text: React.FC<TextProps> = ({
  variant,
  color,
  className,
  style,
  ...props
}) => {
  return (
    <RNText
      className={cn(textVariants({ variant, color }), className)}
      style={style}
      {...props}
    />
  );
};

export { Text, textVariants };
