import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/react";
import { Actions } from "../components/Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";

const Post = ({ post, postedBy }) => {
  // const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      console.log(post);
      try {
        const res = await fetch(
          "http://localhost:3001/api/users/profile/" + postedBy
        );
        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast]);
  if (!user) return null;
  return (
    <>
      <Link to={`/${user._id}/post/${post._id}`}>
        {" "}
        <Flex gap={3} mb={4} py={5}>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Avatar
              size={"md"}
              name={user?.name}
              src={user?.profilePic}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${user._id}`);
              }}
            />
            <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
            <Box position={"relative"} w={"full"}>
              {post.replies.length === 0 && (
                <Text textAlign={"center"}>🥱</Text>
              )}
              {post.replies[0] && (
                <Avatar
                  size={"xs"}
                  name="Raafat heiba"
                  src={post.replies[0].userProfilePic}
                  position={"absolute"}
                  top={"0px"}
                  left={"15px"}
                  p={"2px"}
                />
              )}
              {post.replies[1] && (
                <Avatar
                  size={"xs"}
                  name="Raafat heiba"
                  src={post.replies[1].userProfilePic}
                  position={"absolute"}
                  bottom={"0px"}
                  right={"-5px"}
                  p={"2px"}
                />
              )}
              {post.replies[2] && (
                <Avatar
                  size={"xs"}
                  name="Raafat heiba"
                  src={post.replies[1].userProfilePic}
                  position={"absolute"}
                  bottom={"0px"}
                  left={"4px"}
                  p={"2px"}
                />
              )}
            </Box>
          </Flex>
          <Flex flex={1} flexDirection={"column"} gap={2}>
            <Flex justifyContent={"space-between"} w={"full"}>
              <Flex w={"full"} alignItems={"center"}>
                <Text
                  fontSize={"sm"}
                  fontWeight={"bold"}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/${user._id}`);
                  }}
                >
                  {user?.username}
                </Text>
                <Image src="/verified.png" width={4} h={4} ml={1} />
              </Flex>
              <Flex gap={4} alignItems={"center"}>
                <Text fontSize={"sm"} color={"gray.lighgt"}>
                  {formatDistanceToNow(new Date(post.createdAt))} ago
                </Text>
              </Flex>
            </Flex>
            <Text fontSize={"sm"}>{post.text}</Text>
            {post.image && (
              <Box
                borderRadius={6}
                overflow={"hidden"}
                border={"1px solid gray.light"}
              >
                <Image src={post.image} w={"full"} />
              </Box>
            )}
            <Flex gap={3} my={1}>
              <Actions post={post} />
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </>
  );
};

export default Post;
