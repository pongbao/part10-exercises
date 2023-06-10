import { useEffect, useState } from "react";

const useRepositories = () => {
  const [repositories, setRepositories] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    const response = await fetch("http://192.168.1.12:5000/api/repositories");

    const json = await response.json();

    console.log(json);

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
