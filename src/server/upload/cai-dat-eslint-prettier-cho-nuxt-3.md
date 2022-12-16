Cho tới thời điểm publish bài viết, phần document setup ESLint trên trang https://v3.nuxtjs.org chưa đầy đủ. Bài viết này note lại cách setup ESLint + Prettier cho Nuxt.js v3, các command line chạy ngay sau khi init project:

```bash
npx nuxi init nuxt-app
```

## 1. Cài đặt dependencies

```bash
yarn add -D @nuxtjs/eslint-config-typescript eslint eslint-config-prettier eslint-plugin-nuxt eslint-plugin-prettier prettier typescript
```

## 2. Thêm NPM script

Thêm script để thuận tiện khi check eslint.

```json:package.json
"scripts": {
  // ...
  "lint": "eslint . --ext .ts,.vue"
}
```

Sử dụng khi check eslint:

```bash
yarn lint
```

## 3. Config ESlint + Prettier

Tạo các file config cho ESLint + Prettier.

```json:.eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "@nuxtjs/eslint-config-typescript",
    "plugin:nuxt/recommended",
    "plugin:prettier/recommended"
  ],

  "rules": {
    "vue/multi-word-component-names": 0,
    // "vue/no-multiple-template-root": 0,
    "prettier/prettier": ["error", { "singleQuote": true, "semi": false }]
  }
}
```

```json:.prettierignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

.output
.nuxt
node_modules
dist
*.local
public

# Editor directories and files
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

```json:.prettierrc
{
  "tabWidth": 2,
  "singleQuote": true,
  "semi": false
}

```

Done.