## Next14でFirebaseを使う
UIをかっこよくしたいので、ChakraUIを導入する

[公式のリンク](https://chakra-ui.com/getting-started/nextjs-app-guide)

```bash
npm i @chakra-ui/react @chakra-ui/next-js @emotion/react @emotion/styled framer-motion
```

## 環境構築
Next.js 13では、新しいapp/ディレクトリ/フォルダ構造が導入されました。デフォルトでは、サーバーコンポーネントが使用されます。ただし、Chakra UIはクライアントサイドコンポーネントでのみ動作します。

サーバーコンポーネントでChakra UIを使用するには、ファイルの先頭に'use client';を追加して、クライアントサイドコンポーネントに変換する必要があります。

また、@chakra-ui/next-jsパッケージも提供しており、アプリディレクトリでChakra UIを使用する際に、よりスムーズなエクスペリエンスを提供します。

appディレクトリに、providers.tsxを作成する。
```tsx
// app/providers.tsx
'use client'

import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider>{children}</ChakraProvider>
}
```

次に、レイアウトでProvidersコンポーネントを使用します。
appディレクトリのlayout.tsxを修正します。

```tsx
// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='ja'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

## 環境変数の設定
プロジェクト直下に`.env`を作成する。
```
HOGE = "環境変数HOGE"
```

読み込むときは、`process.env.HOGE`といった感じで書く
```tsx
import { Box } from "@chakra-ui/react"


export default function Blog() {
  return (
    <div>
      <Box m={2}>{process.env.HOGE}</Box>
      <Box w='100%' h='200px' bgGradient='linear(to-r, green.200, pink.500)' />
    </div>
  );
}
```

### Next.jsの場合は、NEXT_PUBLIC_をつけなければ、読み込めない!
以下のように`.env`に記述
```
NEXT_PUBLIC_API_KEY = "****************"
NEXT_PUBLIC_AUTH_DOMAIN = ""****************""
NEXT_PUBLIC_PROJECT_ID = ""****************""
NEXT_PUBLIC_NEXT_PUBLIC_STORAGE_BUCKET = ""****************""
MESSAGEING_SENDER_ID = ""****************"",
NEXT_PUBLIC_APP_ID = ""****************""
NEXT_PUBLIC_MEASUREMENT_ID = ""****************""
```

読み込むファイル
```ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();
```

## Firebaseを導入する

firebase の package を追加する

```bash
npm install firebase
```

## React Iconを追加する
npmのpackageを追加する。
```bash
npm install react-icons --save
```

[ReactIconなるものを導入しみた](https://react-icons.github.io/react-icons/search/#q=Google)

以下のようなコードを書く:
```tsx
import { Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  return (
    <div>
      <Button rightIcon={<FcGoogle />} colorScheme="blue" variant="outline">
        Google
      </Button>
    </div>
  );
}
```

appディレクトリでは、next/routerではなく、next/navigationを使う
```tsx
"use client";

import { Button } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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
```