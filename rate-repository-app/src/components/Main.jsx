import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import AuthStorage from "../utils/authStorage";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    paddingTop: 30,
  },
});

const links = [
  { text: "Repositories", url: "/" },
  {
    text: "Sign in",
    url: "/sign-in",
  },
];

const Main = () => {
  const auth = new AuthStorage();

  const getToken = async () => {
    const token = await auth.getAccessToken();
    console.log(token);
  };

  getToken();

  return (
    <View style={styles.container}>
      <AppBar links={links} />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/sign-in" element={<SignIn />} exact />
        <Route path="*" element={<Navigate to="/" />} replace />
      </Routes>
    </View>
  );
};

export default Main;
