import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import { useContext } from "react";
import { useApolloClient } from "@apollo/client";
import AuthStorageContext from "../contexts/AuthStorageContext";

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

const AppBarTab = ({ text, url, userDependent, user, onClick }) => {
  const navigate = useNavigate();
  console.log(text, user);

  return userDependent ? (
    user && (
      <Pressable
        style={styles.child}
        onPress={() => {
          onClick();
          navigate(url);
        }}
      >
        <Text color={"textWhite"} fontSize={"subheading"}>
          {text}
        </Text>
      </Pressable>
    )
  ) : (
    <Pressable
      style={styles.child}
      onPress={() => {
        console.log(text, onClick);
        onClick();
        navigate(url);
      }}
    >
      <Text color={"textWhite"} fontSize={"subheading"}>
        {text}
      </Text>
    </Pressable>
  );
};

const AppBar = ({ user }) => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  // const [parentHeight, setParentHeight] = useState(undefined);

  // const handleLayout = (event) => {
  //   const { height } = event.nativeEvent.layout;
  //   setParentHeight(height);
  //   console.log("Parent height:", height);
  // };

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  const links = [
    {
      text: "Repositories",
      url: "/",
      userDependent: false,
      user: true,
      onClick: () => {
        return;
      },
    },
    {
      text: "Sign in",
      url: "/sign-in",
      userDependent: true,
      user: !user,
      onClick: () => {
        return;
      },
    },
    {
      text: "Sign Out",
      url: "/",
      userDependent: true,
      user: user,
      onClick: logout,
    },
  ];

  return (
    <View
      style={styles.container}
      // onLayout={(event) => handleLayout(event)}
    >
      <ScrollView horizontal>
        {links.map((link) => (
          <AppBarTab
            key={link.text}
            text={link.text}
            url={link.url}
            userDependent={link.userDependent}
            user={link.user}
            onClick={link.onClick}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AppBar;
