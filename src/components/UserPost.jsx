import { Box, Flex, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";
import { Button, Image, useDisclosure } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Actions } from "../components/Actions";
import { useEffect, useState } from "react";
import UpdatePost from "./UpdatePost";

const UserPost = ({
  postImg,
  postTitle,
  likes,
  replies,
  username,
  imageSrc,
  postID,
  posts,
  postedBy,
  setPosts,
  userId,
}) => {
  const [liked, setLiked] = useState(false);
  const [title, setTitle] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setTitle(postTitle);
    console.log(postID);
  }, []);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };
  const handleTogglePopup = () => {
    onOpen;
  };

  const handleUpdate = async () => {
    const res = await fetch("http://localhost:3001/api/posts/" + postID, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: title }),
    });

    console.log(res);
    handleTogglePopup();
    console.log(title);
  };

  const handleDelete = async () => {
    const res = await fetch("http://localhost:3001/api/posts/" + postID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        jwt: localStorage.getItem("token"),
      },
    });

    console.log(res);
    let newPosts = posts.filter((post) => post._id !== postID);

    setPosts(newPosts);
    onClose();
  };

  return (
    <>
      <UpdatePost
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        handleUpdatePost={handleUpdate}
        handleDeletePost={handleDelete}
        postTitle={postTitle}
        postID={postID}
        title={title}
        setTitle={setTitle}
      />

      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size={"md"} name="Raafat Heiba" src={imageSrc} />
          <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="Raafat heiba"
              src="/1708638677079.jpg"
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              p={"2px"}
            />
            <Avatar
              size={"xs"}
              name="Raafat heiba"
              src="/WhatsApp Image 2023-11-11 at 20.32.43_68d9614a.jpg"
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              p={"2px"}
            />
            <Avatar
              size={"xs"}
              name="Raafat heiba"
              src="/photo_2024-02-22_11-14-21.jpg"
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              p={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                {username}
              </Text>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.lighgt"}>
                1d
              </Text>
              {postedBy === userId && <BsThreeDots onClick={onOpen} />}
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{title}</Text>
          {postImg && (
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid gray.light"}
            >
              <Image src={postImg} w={"full"} />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {likes} likes
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {replies} replies
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default UserPost;
