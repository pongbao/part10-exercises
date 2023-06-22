import { FlatList, View, StyleSheet } from "react-native";
import { Button, Menu, PaperProvider, TextInput } from "react-native-paper";
import { useDebounce } from "use-debounce";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import React, { useEffect, useState } from "react";

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "#d3d3d3",
  },
});

// const repositories = [
//   {
//     id: "jaredpalmer.formik",
//     fullName: "jaredpalmer/formik",
//     description: "Build forms in React, without the tears",
//     language: "TypeScript",
//     forksCount: 1589,
//     stargazersCount: 21553,
//     ratingAverage: 88,
//     reviewCount: 4,
//     ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
//   },
//   {
//     id: "rails.rails",
//     fullName: "rails/rails",
//     description: "Ruby on Rails",
//     language: "Ruby",
//     forksCount: 18349,
//     stargazersCount: 45377,
//     ratingAverage: 100,
//     reviewCount: 2,
//     ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
//   },
//   {
//     id: "django.django",
//     fullName: "django/django",
//     description: "The Web framework for perfectionists with deadlines.",
//     language: "Python",
//     forksCount: 21015,
//     stargazersCount: 48496,
//     ratingAverage: 73,
//     reviewCount: 5,
//     ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4",
//   },
//   {
//     id: "reduxjs.redux",
//     fullName: "reduxjs/redux",
//     description: "Predictable state container for JavaScript apps",
//     language: "TypeScript",
//     forksCount: 13902,
//     stargazersCount: 52869,
//     ratingAverage: 0,
//     reviewCount: 0,
//     ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
//   },
// ];

const ItemSeparator = () => <View style={styles.separator} />;

const SearchContainer = ({ filter, setFilter }) => {
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 500);

  useEffect(() => {
    setFilter(value);
  }, [value]);

  return (
    <TextInput
      label="Filter repositories..."
      value={text}
      onChangeText={(input) => {
        setText(input);
      }}
      style={{ marginHorizontal: 14, marginTop: 14 }}
      right={<TextInput.Icon icon="magnify" />}
    />
  );
};

const SortContainer = ({ setOrder, setDirection }) => {
  const [visible, setVisible] = useState(false);

  const handleSortSelection = (order, direction) => {
    setOrder(order);
    setDirection(direction);
    setVisible(false);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={() => {
        setVisible(!visible);
      }}
      anchor={
        <Button
          onPress={() => {
            setVisible(!visible);
          }}
          mode="contained"
          style={{
            margin: 15,
            width: 100,
          }}
        >
          Sort by
        </Button>
      }
    >
      <Menu.Item
        title="Oldest respositories"
        onPress={() => {
          handleSortSelection("CREATED_AT", "ASC");
        }}
      />
      <Menu.Item
        title="Latest respositories"
        onPress={() => {
          handleSortSelection("CREATED_AT", "DESC");
        }}
      />
      <Menu.Item
        title="Highest rated repositories"
        onPress={() => {
          handleSortSelection("RATING_AVERAGE", "DESC");
        }}
      />
      <Menu.Item
        title="Lowest rated repositories"
        onPress={() => {
          handleSortSelection("RATING_AVERAGE", "ASC");
        }}
      />
    </Menu>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { visible, setVisible, setDirection, setOrder, filter, setFilter } =
      this.props;

    return (
      <View>
        <SearchContainer filter={filter} setFilter={setFilter} />
        <SortContainer
          visible={visible}
          setVisible={setVisible}
          setDirection={setDirection}
          setOrder={setOrder}
        />
      </View>
    );
  };

  render() {
    const { repositories, onEndReached } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem id={item.id} />}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState();
  const [direction, setDirection] = useState();
  const [filter, setFilter] = useState("");

  const { repositories, error, loading, refetch, fetchMore } = useRepositories({
    first: 5,
  });

  useEffect(() => {
    refetch({
      orderBy: order,
      orderDirection: direction,
      searchKeyword: filter,
    });
  }, [order, direction, filter]);

  if (loading) {
    return (
      <View>
        <Text>Loading repositories...</Text>
      </View>
    );
  }

  const onEndReached = () => {
    fetchMore();
  };

  return (
    <PaperProvider>
      <RepositoryListContainer
        repositories={repositories}
        setDirection={setDirection}
        setOrder={setOrder}
        filter={filter}
        setFilter={setFilter}
        onEndReached={onEndReached}
      />
    </PaperProvider>
  );
};

export default RepositoryList;
