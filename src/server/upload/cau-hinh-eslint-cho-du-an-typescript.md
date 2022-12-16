##### Chào các bạn lại là mình đây :D. Lại một bài viết liên quan đến việc cấu hình nho nhỏ cho dự án để các bạn tham khảo. Cụ thể thì hôm nay chúng ta sẽ lần lượt tìm cách cấu hình eslint cho các dự án typescipt từ đơn giản đến nâng cao nhé. Nào chiến thôi :+1:

# 1. Chuẩn bị
#### Yêu cầu:
- Môi trường mình sẽ sử dụng
  - MacOs Catalina v10.15.3
  - Node v12.17.0
  - Yarn v1.22.4
  - VSCode v1.45.1

#### Mục đích:
- Biết cách cấu hình eslint và typescript cho project đơn giản.
- Biết cách cấu hình eslint và typescript cho project dạng monorepo.
- Làm quen với cách cấu hình eslint kết hợp với các loại config và plugin khác.

#### Những phần bỏ qua:
-  Trong quá trình chúng ta thực hiện thì mình sẽ lượt bớt (không giải thích những thuật ngữ và các lệnh cơ bản).

# 2. Tiến hành
## 1. Đầu tiên chúng ta sẽ tiến hành cấu hình cho một project đơn giản
#### Tạo dự án
```bash
mkdir simple && cd simple
yarn init -y
```

#### Cài đặt và tạo cấu hình typescript
```bash
yarn add typescript --dev
# tự động tạo file tsconfig.json
yarn tsc --init
```

#### Cài đặt eslint
```bash
yarn add eslint --dev
```

#### Cài đặt parser và plugin giúp eslint có thể xử lý được cái tệp .ts và .tsx
```bash
yarn add @typescript-eslint/eslint-plugin @typescript-eslint/parser --dev
```

#### Tạo file cấu hình cho eslint
Tạo file .eslintrc.js
```js
module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    sourceType: 'module',
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],

  env: {
    node: true,
    es2020: true,
  }
}
```
1. Đầu tiên chúng ta sẽ sử dụng parser để quy định trình phân tích cú pháp cho eslint
2. Tiếp theo là kế thừa config được `eslint recommend`, sau đó tiếp tục kế thừa `typescript eslint recommend` vì quá trình `extends` sẽ được diễn ra từ trái sang phải nên thằng sau nếu có sử dụng các rule của thằng trước thì hoàn toàn có thể điều chỉnh nó, ví dụ `eslint:recommended` có 1 rule là `no-unused-vars: 'error'` thì  `plugin:@typescript-eslint/recommended` sẽ có thể điều ghi đè thành `no-unused-vars: 'warn'`.
3. Và cuối ùng là chỉ định môi trường để eslint có thể hỗ trợ [eslint env](https://eslint.org/docs/user-guide/configuring#specifying-environments)
4. Ngoài ra mọi người có thể sử dụng các phần khác như `plugins, rules, overrides`, phần này các bạn có thể đọc thêm tại [eslint](https://eslint.org/docs/user-guide/configuring)

#### Tạo file để tiến hành test
```bash
mkdir src && cd src
touch index.ts
```

Thêm 1 đoạn code nhỏ
```js
var say = (text) => {
  return text
}
```

#### Test eslint đã hoạt động chưa
```bash
yarn eslint --ext .ts .
```

Sau khi chạy các bạn sẽ thấy báo lỗi ở màn hình CMD như sau
```bash
  1:1  error    Unexpected var, use let or const instead  no-var
  1:5  warning  'say' is assigned a value but never used  @typescript-eslint/no-unused-vars

✖ 2 problems (1 error, 1 warning)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```
Như vậy là nó đã hoạt động đúng rồi đấy.

#### Thêm cấu hình để có thể sử dụng type-checking, phần mình xem là mạnh mẽ nhất của TypeScript
`@typescript-eslint/eslint-plugin` cũng có hỗ trợ tính năng này, để sử dụng được thì chúng ta cần thêm 1 chút cấu hình như sau 
```diff
module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    sourceType: 'module',
+   project: './tsconfig.json',
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
+   'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],

  env: {
    node: true,
    es2020: true,
  }
}
```

chạy lại đoạn kiểm tra
```bash
yarn eslint --ext .ts .
```

lúc này lỗi sẽ hiển thị nhiều hơn
```diff
  1:1  error    Unexpected var, use let or const instead  no-var
  1:5  warning  'say' is assigned a value but never used  @typescript-eslint/no-unused-vars
+ 2:3  error    Unsafe return of an any typed value       @typescript-eslint/no-unsafe-return

- ✖ 2 problems (1 error, 1 warning)
+ ✖ 3 problems (2 errors, 1 warning)
  1 error and 0 warnings potentially fixable with the `--fix` option.
```

Wow mọi thứ dường như đã ngon nghẽ và cứ thế mà fix lỗi thôi nhé :D

## 1. Tiếp theo chúng ta sẽ tiến hành cấu hình cho một project dạng monorepo
#### Tạo dự án
```bash
mkdir monorepo && cd monorepo
yarn init -y
```

#### Cài đặt và tạo cấu hình typescript
Cũng sẽ như cách cài đặt và tạo như khi tạo project đơn giản phía trên

#### Cài đặt eslint
Cũng sẽ như cách cài đặt và tạo như khi tạo project đơn giản phía trên

#### Phần quan trọng là phải xử lý cho các dự án con bên trong
1. Tiến hành tạo các project con

```bash
mkdir packages && cd packages
mkdir project-1 && mkdir project-1
yarn init -y
```

2. Cài đặt và tạo cấu hình typescript cho project con

```bash
yarn add typescript --dev
# tự động tạo file tsconfig.json
yarn tsc --init
```

3. eslint thì không cần tạo nữa nhé vì chúng ta sẽ xử dụng từ root

4. tạo 1 file để test cũng như cách của xử lý cho một project đơn giản
 ```bash
mkdir src && cd src
touch index.ts
```

Thêm 1 đoạn code nhỏ
```js
var say = (text) => {
  return text
}
```

5. tiếp theo các bạn tạo 1 project con cho `packages/project-2` tương tự `packages/project-1` nhé

#### Điều chỉnh cấu hình ở eslint để có thể nhập các project con
`.eslintrc.js`
```diff
module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    sourceType: 'module',
-   project: './tsconfig.json',  
+   project: ['./packages/*/tsconfig.json'],
  },

  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],

  env: {
    node: true,
    es2020: true,
  }
}
```
Điều chỉnh để đầu vào sẽ là các project dưới thư mục `packages` phần tên file `tsconfig.json` mình để mặc định, thực chất anh em có thể dùng tên khác cũng được nhé

#### Run eslint xem
```bash
yarn eslint --ext .ts .
```

Sau khi chạy các bạn sẽ thấy nó báo lỗi ở cả 2 project con như sau
```
/viblo.asia/eslint-with-typescript/monorepo/packages/project-1/src/index.ts
  1:1  error    Unexpected var, use let or const instead  no-var
  1:5  warning  'say' is assigned a value but never used  @typescript-eslint/no-unused-vars
  2:3  error    Unsafe return of an any typed value       @typescript-eslint/no-unsafe-return

/viblo.asia/eslint-with-typescript/monorepo/packages/project-2/src/index.ts
  1:1  error    Unexpected var, use let or const instead  no-var
  1:5  warning  'say' is assigned a value but never used  @typescript-eslint/no-unused-vars
  2:3  error    Unsafe return of an any typed value       @typescript-eslint/no-unsafe-return
```

Như vậy là đã ngon lành hết rồi đấy :D

# 3. Kết luận
Cách để cấu hình thật đơn giản các bạn nhỉ :laughing:
Ngoài ra các bạn có thể tích hợp thêm nhiều config lẫn plugin khác nữa. Ví dụ như prettier, airbnb, react, vue, etc.
Hi vọng bài viết này có ích và giúp anh em giải quyết được bài toán cấu hình cho các dự án cá nhân cũng như thực tế.

Cảm ơn đã đọc bài viết này :clap:
[Repo tại đây](https://github.com/daint2git/viblo.asia/tree/master/eslint-with-typescript)