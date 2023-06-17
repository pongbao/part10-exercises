import { View, StyleSheet } from "react-native";
import ItemInfo from "./ItemInfo";
import ItemStats from "./ItemRatings";

const styles = StyleSheet.create({
  container: {
    padding: 14,
    display: "flex",
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <ItemInfo item={item} />
      <ItemStats item={item} />
    </View>
  );
};

export default RepositoryItem;
