import { useMutation, useQuery } from "@apollo/client";
import { StyleSheet, Pressable, View, FlatList, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import { format } from "date-fns";

import Text from "./Text";
import theme from "../theme";

import { DELETE_REVIEW, GET_USER } from "../graphql/queries";
import { useSingleView } from "../contexts/SingleViewContext";

const styles = StyleSheet.create({
  container: {
    padding: 14,
    display: "flex",
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginHorizontal: 8,
    flex: 1,
  },
  buttonRed: {
    backgroundColor: theme.colors.red,
    borderRadius: 4,
    marginHorizontal: 8,
    flex: 1,
  },
  text: {
    textAlign: "center",
    padding: 12,
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
    height: 46,
    width: 46,
    borderRadius: 23,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  actions: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
});

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

const deleteButtonHandler = (id, mutate, refetch) => {
  console.log("id", id);
  console.log("mutate", mutate);

  Alert.alert("Delete review", "Are you sure you want to delete this review?", [
    {
      text: "Cancel",
      style: "cancel",
    },
    {
      text: "Delete",
      onPress: async () => {
        try {
          await mutate({ variables: { deleteReviewId: id } });
          refetch();
        } catch (e) {
          console.log(e);
        }
      },
      style: "destructive",
    },
  ]);
};

const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [singleView, setSingleView] = useSingleView();

  const [mutate, result] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <View>
      <View style={styles.review}>
        <View style={styles.reviewRating}>
          <Text
            padding={"paddingMedium"}
            color={"primary"}
            fontWeight={"bold"}
            fontSize={"subheading"}
          >
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewInfo}>
          <Text fontWeight={"bold"} fontSize={"subheading"}>
            {review.repository.fullName}
          </Text>
          <Text fontSize={"subheading"} color={"textSecondary"}>
            {format(new Date(review.createdAt), "dd.MM.yyyy")}
          </Text>
          <Text fontSize={"subheading"} style={styles.reviewText}>
            {review.text}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable
          style={styles.button}
          onPress={() => {
            setSingleView(true);
            navigate(`/${review.repository.id}`);
          }}
        >
          <Text
            style={styles.text}
            color={"textWhite"}
            fontSize={"subheading"}
            fontWeight={"bold"}
          >
            View Repository
          </Text>
        </Pressable>
        <Pressable
          style={styles.buttonRed}
          onPress={() => deleteButtonHandler(review.id, mutate, refetch)}
        >
          <Text
            style={styles.text}
            color={"textWhite"}
            fontSize={"subheading"}
            fontWeight={"bold"}
          >
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const Reviews = () => {
  const variables = {
    includeReviews: true,
    // first: 1,
  };

  const { data, error, loading, refetch, fetchMore } = useQuery(GET_USER, {
    variables,
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <Text>Loading reviews...</Text>;
  }

  const currentUser = data.me;

  const reviews = currentUser
    ? currentUser.reviews.edges.map((edge) => edge.node)
    : [];

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const onEndReached = () => {
    handleFetchMore();
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Reviews;
