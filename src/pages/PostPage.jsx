import { Box, Flex, Text, Image, Divider } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import { Actions } from "../components/Actions";
import { useEffect, useState } from "react";
import { Button } from "@chakra-ui/button";
import Comment from "../components/Comment";
import userAtom from "../atoms/userAtom";
// import { useSetRecoilState } from "recoil";

const PostPage = () => {
  const [user, setUser] = useRecoilState(userAtom);

  const [liked, setLiked] = useState(false);
  const fetchUserPosts = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/posts`);
      // console.log(res);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUserPosts();
  }, []);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar
            src="/WhatsApp Image 2023-11-11 at 20.32.43_68d9614a.jpg"
            size={"md"}
            name="Raafat Heiba"
          />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              raafat heiba
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>I love them so much.</Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid gray.light"}>
        <Image
          src={"/WhatsApp Image 2024-04-13 at 07.50.40_584bd0c5.jpg"}
          w={"full"}
        />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <Text color={"gray.light"} fontSize={"sm"}>
          {200 + (liked ? 1 : 0)} likes
        </Text>
        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>
          266 replies
        </Text>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      <Comment
        comment="Looks really good"
        createdAt="1d"
        likes={100}
        username="Banna"
        userAvatar="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
      />
      <Comment
        comment="7bib a5ooooooooooook"
        createdAt="2d"
        likes={190}
        username="Hatem"
        userAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGPDfmtAPKxQ2W04DKIHmgNv6IViKbGQ8a7tL594ooMw&s"
      />
      <Comment
        comment="Aywa ya Heiba"
        createdAt="2d"
        likes={278}
        username="Alaa"
        userAvatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReTzAnN4CAJcD2VRaFxTVqHfK-UpYZfEbQDEgGXKeW3A&s"
      />
    </>
  );
};

export default PostPage;
