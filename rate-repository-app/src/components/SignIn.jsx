import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { Pressable, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import theme from "../theme";

const styles = StyleSheet.create({
  formButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  form: {
    padding: 14,
  },
  text: {
    textAlign: "center",
    padding: 17,
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <Pressable style={styles.formButton} onPress={onSubmit}>
        <Text color={"textWhite"} fontSize={"subheading"} style={styles.text}>
          Sign In
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values) => {
    const username = values.username;
    const password = values.password;
    console.log(username, password);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
