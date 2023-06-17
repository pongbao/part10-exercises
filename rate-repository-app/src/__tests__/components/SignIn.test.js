import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { Formik } from "formik";
import { Pressable, View } from "react-native";
import * as yup from "yup";
import FormikTextInput from "../../components/FormikTextInput";
import Text from "../../components/Text";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      const SignInForm = ({ onSubmit }) => {
        return (
          <View>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry={true}
            />
            <Pressable onPress={onSubmit}>
              <Text>Sign In</Text>
            </Pressable>
          </View>
        );
      };

      const validationSchema = yup.object().shape({
        username: yup.string().required("Username is required"),
        password: yup.string().required("Password is required"),
      });

      const SignIn = () => {
        const initialValues = {
          username: "",
          password: "",
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

      render(<SignIn />);
      fireEvent.changeText(screen.getByPlaceholderText("Username"), "pongbao");
      fireEvent.changeText(screen.getByPlaceholderText("Password"), "password");
      fireEvent.press(screen.getByText("Sign In"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "pongbao",
          password: "password",
        });
      });
    });
  });
});
