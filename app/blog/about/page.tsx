"use client";
import React, { useEffect, useState } from "react";
import { Box, Text, Button, Flex, Spacer } from "@chakra-ui/react";
import { getBlog } from "../../application/blog_api";
import { useRouter } from "next/navigation";
import Profile from "./Profile";

export default function About() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogData = await getBlog();
      setBlogs(blogData);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => router.back()}
        ml={4}
        mt={4}
        mb={4}
      >
        前のページへ戻る
      </Button>
      <Flex>
        <Box>
          {blogs.map((blog, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={4}
              ml={4}
              mb={4}
              width={"300px"}
            >
              <Text fontWeight="bold" fontSize="xl">
                {blog.title}
              </Text>
              <Text mt={2}>{blog.content}</Text>
            </Box>
          ))}
        </Box>
        <Spacer />
        <Box mr={8}>
          <Profile />
        </Box>
      </Flex>
    </div>
  );
}
