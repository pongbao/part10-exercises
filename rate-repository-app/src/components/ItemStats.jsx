import { View, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    padding: 14,
    display: "flex",
    flexDirection: "row",
  },
  itemStat: {
    display: "flex",
    flexGrow: 1,
  },
  text: {
    textAlign: "center",
  },
});

const ItemStat = ({ title, stat }) => {
  const formattedStat =
    stat > 1000 ? (Math.floor(stat / 100) / 10).toString() + "k" : stat;
  return (
    <View style={styles.itemStat}>
      <Text style={styles.text} fontWeight={"bold"}>
        {formattedStat}
      </Text>
      <Text style={styles.text} color={"textSecondary"}>
        {title}
      </Text>
    </View>
  );
};

const ItemStats = ({ item }) => {
  return (
    <View style={styles.container}>
      <ItemStat title={"Stars"} stat={item.stargazersCount} />
      <ItemStat title={"Forks"} stat={item.forksCount} />
      <ItemStat title={"Reviews"} stat={item.reviewCount} />
      <ItemStat title={"Rating"} stat={item.ratingAverage} />
    </View>
  );
};

export default ItemStats;
