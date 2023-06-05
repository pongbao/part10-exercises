import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
// import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    // paddingLeft: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    display: "flex",
    flexDirection: "row",
    height: 60,
  },
  child: {
    paddingHorizontal: Constants.statusBarHeight / 2,
    justifyContent: "center",
  },
});

const AppBarTab = ({ text, url }) => {
  const navigate = useNavigate();

  return (
    <Pressable style={styles.child} onPress={() => navigate(url)}>
      <Text color={"textWhite"} fontSize={"subheading"}>
        {text}
      </Text>
    </Pressable>
  );
};

const AppBar = ({ links }) => {
  // const [parentHeight, setParentHeight] = useState(undefined);

  // const handleLayout = (event) => {
  //   const { height } = event.nativeEvent.layout;
  //   setParentHeight(height);
  //   console.log("Parent height:", height);
  // };
  return (
    <View
      style={styles.container}
      // onLayout={(event) => handleLayout(event)}
    >
      <ScrollView horizontal>
        {links.map((link) => (
          <AppBarTab key={link.text} text={link.text} url={link.url} />
        ))}
      </ScrollView>
    </View>
  );
};

export default AppBar;
