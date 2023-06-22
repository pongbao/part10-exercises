import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate, useMatch } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../graphql/queries";

import RepositoryList from "./RepositoryList";
import RepositoryItem from "./RepositoryItem";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import Text from "./Text";
import Review from "./Review";
import SignUp from "./SignUp";
import Reviews from "./Reviews";

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

  const match = useMatch("/:id");
  const id = match ? match.params.id : null;

  if (loading) {
    return (
      <View>
        <Text style={styles.container}>Opening app...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppBar user={error ? null : data.me} />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/:id" element={<RepositoryItem id={id} />} exact />
        <Route path="/create-review" element={<Review />} exact />
        <Route path="/reviews" element={<Reviews />} exact />
        <Route path="/sign-in" element={<SignIn />} exact />
        <Route path="/sign-up" element={<SignUp />} exact />
        <Route path="*" element={<Navigate to="/" />} replace />
      </Routes>
    </View>
  );
};

export default Main;
