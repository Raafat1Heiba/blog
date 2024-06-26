import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import useShowToast from "../hooks/useShowToast";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    setLoading(true);
    const getFeedPosts = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/posts`);
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
        } else {
          setPosts(data); // Update the posts state with the fetched data
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast]);

  return (
    <>
      {!loading && posts.length === 0 && <h1>Follow some users</h1>}
      {loading && (
        <Flex justifyContent="center">
          <Spinner size="xl" />
        </Flex>
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default HomePage;
