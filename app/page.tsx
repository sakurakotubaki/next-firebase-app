import { Box } from "@chakra-ui/react"

export default function Home() {
  return (
    <div>
      <Box m={2}>Tomato</Box>
      <Box w='100%' h='200px' bgGradient='linear(to-r, green.200, pink.500)' />
    </div>
  );
}
