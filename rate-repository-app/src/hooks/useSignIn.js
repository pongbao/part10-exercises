import { useApolloClient, useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/queries";
import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";
import { useNavigate } from "react-router-native";

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const navigate = useNavigate();

  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        username,
        password,
      },
    });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    navigate("/");
    apolloClient.resetStore();
  };

  return [signIn, result];
};

export default useSignIn;
