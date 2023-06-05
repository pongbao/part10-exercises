import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    flexWrap: "wrap",
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorTextWhite: {
    color: theme.colors.textWhite,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  paddingSmall: {
    padding: theme.paddings.paddingSmall,
  },
  paddingMedium: {
    padding: theme.paddings.paddingMedium,
  },
  backgroundPrimary: {
    backgroundColor: theme.colors.primary,
  },
  roundedSmall: {
    borderRadius: 3,
  },
  flexWrap: {
    flexWrap: "wrap",
  },
});

const Text = ({
  color,
  fontSize,
  fontWeight,
  padding,
  background,
  style,
  border,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "primary" && styles.colorPrimary,
    color === "textWhite" && styles.colorTextWhite,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    padding === "paddingSmall" && styles.paddingSmall,
    padding === "paddingMedium" && styles.paddingMedium,
    background === "backgroundPrimary" && styles.backgroundPrimary,
    border === "roundedSmall" && styles.roundedSmall,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
