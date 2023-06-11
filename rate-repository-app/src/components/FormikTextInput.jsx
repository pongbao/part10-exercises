import { StyleSheet, View } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: "#d73a4a",
  },
  textInputContainer: {
    borderColor: theme.colors.textPrimary,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 10,
    height: 50,
    justifyContent: "center",
  },
  textInputContainerError: {
    borderColor: "#d73a4a",
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 10,
    height: 50,
    justifyContent: "center",
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;
  const containerStyle = showError
    ? styles.textInputContainerError
    : styles.textInputContainer;

  return (
    <>
      <View style={containerStyle}>
        <TextInput
          onChangeText={(value) => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
          {...props}
        />
      </View>
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
