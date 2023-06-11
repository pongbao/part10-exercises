import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import AuthStorage from "../utils/authStorage";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    paddingTop: 30,
  },
});

const Main = () => {
  const { data, error, loading } = useQuery(GET_USER, {
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return (
      <View>
        <Text style={styles.container}>Opening app...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppBar user={data.me} />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/sign-in" element={<SignIn />} exact />
        <Route path="*" element={<Navigate to="/" />} replace />
      </Routes>
    </View>
  );
};

export default Main;
