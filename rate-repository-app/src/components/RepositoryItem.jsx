import { StyleSheet, Pressable, View } from "react-native";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";

import ItemInfo from "./ItemInfo";
import ItemStats from "./ItemStats";
import Text from "./Text";
import theme from "../theme";

import { useSingleView } from "../contexts/SingleViewContext";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    padding: 14,
    display: "flex",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 10,
    marginHorizontal: 14,
  },
  text: {
    textAlign: "center",
    padding: 17,
  },
});

const RepositoryItem = ({ id }) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });
  const [singleView, setSingleView] = useSingleView();
  const navigate = useNavigate();

  if (loading) {
    return <Text>Loading item...</Text>;
  }

  const item = data.repository;

  return (
    <View>
      <Pressable
        style={styles.container}
        onPress={() => {
          console.log("napindot mo yung item", item.id);
          setSingleView(true);
          navigate(`/${item.id}`);
        }}
      >
        <ItemInfo item={item} />
        <ItemStats item={item} />
      </Pressable>
      {singleView && (
        <Pressable
          style={styles.button}
          onPress={() => {
            Linking.openURL(item.url);
          }}
        >
          <Text color={"textWhite"} fontSize={"subheading"} style={styles.text}>
            Open in Github
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
