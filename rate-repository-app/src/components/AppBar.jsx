import { View, StyleSheet, Pressable } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    paddingVertical: (Constants.statusBarHeight * 2) / 3,
    paddingLeft: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    display: "flex",
    flexDirection: "row",
  },
  child: {
    paddingRight: Constants.statusBarHeight,
  },
});

const AppBarTab = ({ text }) => {
  return (
    <Pressable style={styles.child}>
      <Text color={"textWhite"} fontSize={"subheading"}>
        {text}
      </Text>
    </Pressable>
  );
};

const AppBar = ({ texts }) => {
  return (
    <View style={styles.container}>
      {texts.map((text) => (
        <AppBarTab key={text} text={text} />
      ))}
    </View>
  );
};

export default AppBar;
