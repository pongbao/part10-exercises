import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
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

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
  });

  return {
    data,
    error,
    loading,
    // refetch: fetchRepositories
  };
};

export default useRepositories;
