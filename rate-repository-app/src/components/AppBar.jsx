import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import { useApolloClient } from "@apollo/client";
import { useAuthStorage } from "../contexts/AuthStorageContext";
import { useSingleView } from "../contexts/SingleViewContext";

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

  return userDependent ? (
    user && (
      <Pressable
        style={styles.child}
        onPress={() => {
          onClick();
          navigate(url);
        }}
      >
        <Text color={"textWhite"} fontSize={"subheading"} fontWeight={"bold"}>
          {text}
        </Text>
      </Pressable>
    )
  ) : (
    <Pressable
      style={styles.child}
      onPress={() => {
        onClick();
        navigate(url);
      }}
    >
      <Text color={"textWhite"} fontSize={"subheading"} fontWeight={"bold"}>
        {text}
      </Text>
    </Pressable>
  );
};

const AppBar = ({ user }) => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [singleView, setSingleView] = useSingleView();

  // const [parentHeight, setParentHeight] = useState(undefined);

  // const handleLayout = (event) => {
  //   const { height } = event.nativeEvent.layout;
  //   setParentHeight(height);
  //   console.log("Parent height:", height);
  // };

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    setSingleView(false);
  };

  const changeView = () => {
    setSingleView(false);
  };

  const links = [
    {
      text: "Repositories",
      url: "/",
      userDependent: false,
      user: true,
      onClick: changeView,
    },
    {
      text: "Create a Review",
      url: "/create-review",
      userDependent: true,
      user: user,
      onClick: changeView,
    },
    {
      text: "My Reviews",
      url: "/reviews",
      userDependent: true,
      user: user,
      onClick: changeView,
    },
    {
      text: "Sign in",
      url: "/sign-in",
      userDependent: true,
      user: !user,
      onClick: changeView,
    },
    {
      text: "Sign Out",
      url: "/",
      userDependent: true,
      user: user,
      onClick: logout,
    },
    {
      text: "Sign Up",
      url: "/sign-up",
      userDependent: true,
      user: !user,
      onClick: changeView,
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
