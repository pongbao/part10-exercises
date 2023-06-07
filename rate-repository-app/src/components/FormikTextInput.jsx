import { StyleSheet, View } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
  },
  textInputContainer: {
    border: theme.colors.textPrimary,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    height: 50,
    justifyContent: "center",
  },
});

const FormikTextInput = ({ name, ...props }) => {
  console.log(name);
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <View style={styles.textInputContainer}>
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
