import { useQuery } from "@apollo/client";
import { StyleSheet, Pressable, View, FlatList } from "react-native";
import { useNavigate } from "react-router-native";
import * as Linking from "expo-linking";
import { format } from "date-fns";

import ItemInfo from "./ItemInfo";
import ItemStats from "./ItemStats";
import Text from "./Text";
import theme from "../theme";

import { useSingleView } from "../contexts/SingleViewContext";
import { GET_REPOSITORY } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    padding: 14,
    display: "flex",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginVertical: 10,
    marginHorizontal: 14,
  },
  text: {
    textAlign: "center",
    padding: 17,
  },
  separator: {
    height: 10,
    backgroundColor: "#d3d3d3",
  },
  review: {
    display: "flex",
    flexDirection: "row",
    padding: 14,
  },
  reviewInfo: {
    display: "flex",
    flex: 1,
  },
  reviewText: {
    paddingTop: 7,
  },
  reviewRating: {
    height: 34,
    width: 34,
    borderRadius: 17,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
});

const ItemSeparator = () => {
  const [singleView, setSingleView] = useSingleView();
  return singleView && <View style={styles.separator} />;
};

const RepositoryInfo = ({ item }) => {
  const [singleView, setSingleView] = useSingleView();
  const navigate = useNavigate();

  return (
    <View>
      <Pressable
        style={styles.container}
        onPress={() => {
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
      <ItemSeparator />
    </View>
  );
};

const ReviewItem = ({ review }) => {
  const [singleView, setSingleView] = useSingleView();
  return (
    singleView && (
      <View style={styles.review}>
        <View style={styles.reviewRating}>
          <Text padding={"paddingMedium"} color={"primary"} fontWeight={"bold"}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewInfo}>
          <Text fontWeight={"bold"}>{review.user.username}</Text>
          <Text>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
    )
  );
};

const RepositoryItem = ({ id }) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <Text>Loading item...</Text>;
  }

  const repositoryItem = data.repository;
  const reviews = repositoryItem
    ? repositoryItem.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo item={repositoryItem} />}
    />
  );
};

export default RepositoryItem;
