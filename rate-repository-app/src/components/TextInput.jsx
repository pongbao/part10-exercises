import { TextInput as NativeTextInput, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    marginHorizontal: 12,
  },
});

const TextInput = ({ style, ...props }) => {
  // const textInputStyle = [style];
  const textInputStyle = styles.textInput;

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
