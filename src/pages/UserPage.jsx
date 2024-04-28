import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Spinner } from "@chakra-ui/react";
import { Box, Flex, Link, Text, VStack } from "@chakra-ui/layout";
import userAtom from "../atoms/userAtom";
import { useRecoilState } from "recoil";

const UserPage = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useRecoilState(userAtom);
  // const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  const fetchUserPosts = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/posts/${username}/user`
      );
      const data = await res.json();
      setPosts(data);
      console.log(posts);
      console.log(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/users/profile/${username}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        console.log(data.username);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if (!user && !loading) return <h1>User not found</h1>;
  return (
    <>
      <UserHeader user={user} />
      {Array.isArray(posts) &&
        posts.map((p) => {
          return (
            <UserPost
              key={p._id}
              likes={p.likes.length}
              replies={p.replies.length}
              postImg={p.image}
              postTitle={p.text}
              postID={p._id}
              postBy={p.postedBy}
              username={user.username}
              imageSrc={user.profilePic}
              posts={posts}
              setPosts={setPosts}
              userId={user._id}
            />
          );
        })}
    </>
  );
};

export default UserPage;
