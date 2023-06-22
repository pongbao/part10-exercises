import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  // const [repositories, setRepositories] = useState(null);
  // const [loading, setLoading] = useState(false);

  // const fetchRepositories = async () => {
  //   setLoading(true);

  //   const response = await fetch("http://192.168.1.12:5000/api/repositories");

  //   const json = await response.json();

  //   console.log(json);

  //   setLoading(false);
  //   setRepositories(json);
  // };

  // useEffect(() => {
  //   fetchRepositories();
  // }, []);

  const { data, error, loading, refetch, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      variables,
      fetchPolicy: "cache-and-network",
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories,
    error,
    loading,
    refetch,
    // : fetchRepositories
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
