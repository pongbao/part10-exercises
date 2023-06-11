import { Pressable, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";
import AuthStorage from "../utils/authStorage";

const styles = StyleSheet.create({
  formButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 10,
  },
  form: {
    paddingHorizontal: 14,
    paddingTop: 4,
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

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const auth = new AuthStorage();

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });

      await auth.setAccessToken(data.authenticate.accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
