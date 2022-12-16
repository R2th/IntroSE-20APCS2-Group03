Là một tác phẩm của **Evan You** ra mắt cùng với **Vue 3**, **Vite** được sinh ra như là một sự thay thế cho **Webpack**. Bài viết này sẽ giới thiệu tới mọi người một combo mới với tốc độ build cực lý nhanh chóng và có thể sử dụng trong lâu dài.

### Khởi tạo project với Vite

```npm init @vitejs/app my-project```

hoặc

```yarn create @vitejs/app my-project```


**Vite** sẽ cung cấp các lựa chọn khi cài đặt như sau:
```
? Select a template: …
▸ vanilla
  vue
  vue-ts
  react
  react-ts
  preact
  preact-ts
  lit-element
  lit-element-ts
```

Ở đây mình sẽ chọn `vue-ts` để sử dụng **Typescript** cho dự án. Tiếp theo chỉ là trỏ vào thư mục project và run thôi

```
cd my-project
```

```
  npm install 
  npm run dev 
```

hoặc 

```
  yarn
  yarn dev
```

Project vẫn sẽ mặc định chạy trên cổng 3000 và cấu trúc thư mục sẽ như sau:

```
├── node_modules
├── package-lock.json
├── package.json
├── public
│   └── favicon.ico
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   └── main.ts
├── tsconfig.json
└── vite.config.ts
```

Nếu sử dụng VSCode bạn có thể làm như sau:

1. Mở `src/main.ts`
2. Ctrl + Shift + P
3. Tìm kiếm và chạy "Select TypeScript version" -> "Use workspace version"


### Cài đặt Typescript

**Vue 3** mặc định đã nhận **Typescript** và **Vite** đã tạo sẵn cho chúng ta file `main.ts`. Việc của chúng ta là thêm vào thẻ `<script>` trong các single component .vue`lang="ts"` là được.

Trong file `tsconfig.json` có thể sửa như sau:

```
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "importHelpers": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "moduleResolution": "node",
    "isolatedModules": true,
    "strict": true,
    "jsx": "preserve",
    "sourceMap": true,
    "baseUrl": ".",
    "lib": ["esnext", "dom",
      "dom.iterable",
      "scripthost"],
    "types": ["vite/client"],
    "plugins": [{ "name": "@vuedx/typescript-plugin-vue" }]
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"],
  "exclude": [
    "node_modules"
  ]
}
```

### ESLint

```
npm i -D eslint eslint-plugin-vue @vue/eslint-config-typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin typescript
```

hoặc

```
yarn add -D eslint eslint-plugin-vue @vue/eslint-config-typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin typescript
```

Sau khi cài đặt, chúng ta tạo 1 file `.eslintrc.json` ở thư mục gốc như sau

```
{
  "root": true,
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2021
  },
  "plugins": [],
  "rules": {}
}
```

Trong file này có thể thêm các plugin hoặc các quy tắc ưa thích của mình. Ví dụ như sau trong file `package.json`

```
"scripts": {
  "lint:script": "eslint --ext .ts,vue --ignore-path .gitignore ."
}
```

### Prettier

```
npm i -D prettier eslint-plugin-prettier @vue/eslint-config-prettier
```

hoặc

```
yarn add -D prettier eslint-plugin-prettier @vue/eslint-config-prettier
```

Khi cài đặt các dependencies có thể tạo file `.prettierrc` và thêm các cài đặt sau

```
{
  "singleQuote": true,
  "semi": false,
  "vueIndentScriptAndStyle": true
}
```

Trong `.eslintrc.json` thêm các mở rộng để tránh trùng lặp

```
{
  "extends": [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "prettier",
    "prettier/vue",
  ]
}
```

### Husky

```
npm i -D husky lint-staged
```

hoặc

```
yarn add -D husky lint-staged
```

Thêm trong `package.json`

```
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,vue}": "eslint --fix"
  }
}
```

### Tailwind

Chúng ta sẽ sử dụng **Tailwind CSS** cho dự án

```
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
```

hoặc

```
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
```

Trong file `tailwind.config.js` có thể cài đặt lại như sau

```
  module.exports = {
   purge: [],
   purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
```

Thêm Tailwind vào CSS tạo 1 `index.css` trong thư mục `src`

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Trong `main.ts` thêm cài đặt này để sử dụng

```
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')

```


Hi vọng với cách setup trên sẽ giúp ích cho bạn trong quá trình xây dựng dự án về Vue. Cảm ơn vì đã đọc bài viết!