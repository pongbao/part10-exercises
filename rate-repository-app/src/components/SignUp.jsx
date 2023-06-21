import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import { Pressable, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

import { CREATE_USER } from "../graphql/queries";
import { useSingleView } from "../contexts/SingleViewContext";
import useSignIn from "../hooks/useSignIn";

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

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry={true}
      />
      <Pressable style={styles.formButton} onPress={onSubmit}>
        <Text color={"textWhite"} fontSize={"subheading"} style={styles.text}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

yup.setLocale({
  number: {
    min: "Rating should be greater than or equal to 0",
    max: "Rating should be less than or equal 100",
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username should be at least 5 characthers")
    .max(30, "Username cannot exceed 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password should be at least 5 characthers")
    .max(50, "Password cannot exceed 50 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Password confirmation is required"),
});

const SignUp = () => {
  const initialValues = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };

  const navigate = useNavigate();
  const [singleView, setSingleView] = useSingleView();
  const [signIn] = useSignIn();

  const [mutate, result] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await mutate({ variables: { username, password } });
      await signIn({ username, password });
      setSingleView(false);
      navigate("/");
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
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
