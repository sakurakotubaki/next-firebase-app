"use client";

import { Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { auth } from "./infra/firebase";
import { useRouter } from "next/navigation";// appディレクトリでは、next/routerではなく、next/navigationを使う

const provider = new GoogleAuthProvider();

export default function AuthButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = () => {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        router.push("/blog");
      })
      .catch((error) => {
        console.log(error.message);
        window.alert("ログインに失敗しました");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Button
        rightIcon={<FcGoogle />}
        colorScheme="blue"
        variant="outline"
        onClick={signInWithGoogle}
      >
        Google
      </Button>
    </div>
  );
}
