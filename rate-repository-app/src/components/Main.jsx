import { StyleSheet, View, Dimensions } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    paddingTop: 30,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar texts={["Repositories"]} />
      <RepositoryList />
    </View>
  );
};

export default Main;
