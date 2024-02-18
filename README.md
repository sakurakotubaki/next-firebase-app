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

