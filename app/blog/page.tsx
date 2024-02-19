"use client";

import { Button } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../infra/firebase";
import { useRouter } from "next/navigation";
import { IoIosLogOut } from "react-icons/io";
import CreateBlog from "./CreateBlog";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        router.push("/");
      })
      .catch((error) => {
        console.log(error.message);
        window.alert("ログアウトに失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Button
        rightIcon={<IoIosLogOut />}
        colorScheme="blue"
        variant="outline"
        onClick={handleLogout}
        isLoading={loading}
        ml={4}
        mt={4}
      >
        ログアウト
      </Button>
      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => router.push("/blog/about")}
        ml={4}
        mt={4}
      >
        ブログ一覧
      </Button>
      <CreateBlog />
    </div>
  );
}
