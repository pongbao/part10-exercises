import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 3,
  },
  details: {
    paddingLeft: 14,
    display: "flex",
    flex: 1,
  },
});

const ItemImage = ({ item }) => {
  return (
    <Image
      testID="repositoryImage"
      source={{ uri: item.ownerAvatarUrl }}
      style={styles.logo}
    />
  );
};

const ItemLanguage = ({ item }) => {
  return (
    <View style={{ display: "flex", flexDirection: "row", padding: 4 }}>
      <Text
        fontSize={"subheading"}
        background={"backgroundPrimary"}
        padding={"paddingMedium"}
        color={"textWhite"}
        border={"roundedSmall"}
      >
        {item.language}
      </Text>
    </View>
  );
};

const ItemDetails = ({ item }) => {
  return (
    <View style={styles.details}>
      <Text
        fontWeight={"bold"}
        padding={"paddingSmall"}
        fontSize={"subheading"}
      >
        {item.fullName}
      </Text>
      <Text
        padding={"paddingSmall"}
        color={"textSecondary"}
        fontSize={"subheading"}
      >
        {item.description}
      </Text>
      <ItemLanguage item={item} />
    </View>
  );
};

const ItemInfo = ({ item }) => {
  return (
    <View style={styles.container}>
      <ItemImage item={item} />
      <ItemDetails item={item} />
    </View>
  );
};

export default ItemInfo;
