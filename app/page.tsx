import { Flex } from "@chakra-ui/react";
import AuthButton from "./AuthButton";

export default function SignIn() {
  return (
    <Flex width="100vw" height="100vh" alignItems="center" justifyContent="center">
      <AuthButton />
    </Flex>
  );
}