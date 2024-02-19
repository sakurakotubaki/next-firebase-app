import React, { useState } from 'react';
import { Button, Input, VStack } from "@chakra-ui/react";
import { createBlog } from '../application/blog_api';

export default function CreateBlog() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = () => {
        createBlog({ title, content });
        setTitle('');
        setContent('');
    };

    return (
        <VStack spacing={4}>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトルを入力" />
            <Input value={content} onChange={(e) => setContent(e.target.value)} placeholder="コンテンツを入力" />
            <Button onClick={handleSubmit}>ブログを作成</Button>
        </VStack>
    );
}