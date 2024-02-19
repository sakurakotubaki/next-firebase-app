import React, { useEffect, useState } from 'react';
import { Avatar, Box, Text } from "@chakra-ui/react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../infra/firebase";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null); // 型を明示的に指定

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={6}
        boxShadow="lg"
        textAlign="center"
         >
            {user ? (
                <>
                    <Avatar src={user.photoURL || undefined} size="2xl" mb={4} />
                    <Text fontWeight="bold" fontSize="xl">{user.displayName}</Text>
                    <Text>{user.email}</Text>
                </>
            ) : (
                <Text>You are not signed in.</Text>
            )}
        </Box>
    );
}