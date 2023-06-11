import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/queries";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const signIn = async ({ username, password }) =>
    mutate({
      variables: {
        username,
        password,
      },
    });

  return [signIn, result];
};

export default useSignIn;
