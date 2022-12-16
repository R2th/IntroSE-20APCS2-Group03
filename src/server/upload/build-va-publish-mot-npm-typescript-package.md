##### Hello anh em. lâu ngày quá phải không :v ? Sau một thời gian vắng bóng thì hôm nay mình đã trở lại và hứa sẽ lợi hại hơn xưa nhiều =)). Cụ thể thì hôm nay mình và các anh em thử Build và Publish một `NPM package` được viết bằng `Typescript` nhé.

# 1. Chuẩn bị
#### Yêu cầu:
- Đã có một chút kiếm thức cơ bản về [Typescript](https://www.typescriptlang.org/).
- Môi trường mình sẽ sử dụng
  - Window 10
  - Node v12.14.0
  - Npm v6.13.4
  - VSCode v1.47.2

#### Mục đích:
- Biết cách đưa một dự án cá nhân lên NPM.
- Xấy dựng một module đơn giản có thể tái sử dụng bằng Typescript.
- Xây dựng tư tưởng chia sẽ cho cộng đồng.

#### Những phần bỏ qua:
-  Trong quá trình chúng ta thực hiện thì mình sẽ lượt bớt (không giải thích những thuật ngữ và các lệnh cơ bản).

# 2. Tiến hành
## Một vài khái niệm 
#### NPM là gì ?
> Hiểu đơn giản nó là một trình quản lý các Javascript package và thường được cài đặt kèm theo khi bạn cài đặt Nodejs. Và nó cũng là nơi chứa hàng triệu thư viện mã nguồn mở được các lập trình viên trên toàn thế giới tạo ra với mục đích chính là phục vụ cho cộng đồng.

#### Typescript là gì ?
> Hiểu đơn giản nó là một ngôn ngữ mã nguồn mở được xây dựng dựa trên Javascript, một trong những công cụ được sử dụng nhiều nhất trên thế giới.
Ngoài ra thì còn rất rất nhiều lý do bạn chọn Typescript nhưng phần này chúng ta có thể sẽ nói nhiều hơn trong những bài viết khác.

## Xây dựng package
#### Tạo dự án
```js
mkdir npm-typescript-package && cd npm-typescript-package
npm init -y
```

#### Cấu hình Typescript
- Cài đặt
```bash
npm i --save-dev typescript
```
- Khởi tạo
```bash
npx tsc --init
```
- Cấu hình `tsconfig.json` (đã lượt bỏ đi một số tùy chọn khác trong cấu hình)
```json
{
  "compilerOptions": {
    "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */,
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
    "declaration": true /* Generates corresponding '.d.ts' file. */,
    "outDir": "./lib" /* Redirect output structure to the directory. */,
    "strict": true /* Enable all strict type-checking options. */
  },
  "include": ["src"],
  "exclude": ["node_modules", "test"]
}
```

#### Tạo entry point
- Tạo file `./src/index.ts`
- Tạo một hàm đơn giản bên trong file `index.ts`
```js
export function greet(name: string): string {
  return `Hello ${name}`
}
```

#### Build
- Thêm script build vào phần `scripts` của `package.json`
```bash
"build": "tsc"
```
- Tiến hành build bằng script
```bash
npm run build
```
- Kết quả sau khi build sẽ tạo ra folder `lib`
![](https://images.viblo.asia/6145eee7-58d4-4225-8e22-122c6bef7d0d.PNG)

#### Cấu hình các đường dẫn cho package
- Thêm trong file `package.json`
```bash
  "name": "daint2-npm-typescript-package",
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "files": [
    "lib"
  ],
```
1. `name` package name sẽ được publish lên npm.
2. `main`  rất quan trọng ở đây vì nó sẽ cho npm biết có thể import các module từ đâu.
3. `types` sẽ thông báo cho Typescript  và Code-editors nơi chúng có thể tìm thấy các `type definition`.
4. `files` chỉ thư mục nào được bao gồm trong package khi được publish

#### script NPM hook
- Sẽ có một số script hữu dụng dành cho NPM như: `prepare, prepublishOnly, preversion, version và postversion`
- `prepare` sẽ chạy cả trước khi package được đóng gói và publish. Thêm script này vào `package.json`
```bash
"prepare" : "npm run build"
```

#### Tiến hành publish package
- login npm
![](https://images.viblo.asia/fb67f173-9acd-40e7-87e4-5dfb98fc7786.PNG)

- npm publish
![](https://images.viblo.asia/68ce1511-9ae7-40e7-9a1d-9cb97c84e938.PNG)

#### Kiểm tra package
https://www.npmjs.com/package/daint2-npm-typescript-package
![](https://images.viblo.asia/b0bf173e-1efd-452c-af9d-ec6185db140b.PNG)

Như vậy là việc publish đã thành công tốt đẹp :sunglasses:

#### Thử cài đặt và sử dụng trong 1 project khác
- cài đặt đến 1 project bất kì
```bash
npm i daint2-npm-typescript-package
# or
yarn add daint2-npm-typescript-package
```

- sử dụng
![](https://images.viblo.asia/62f49829-40c8-4434-9940-5fdb34560513.PNG)

Wow, vậy là mọi thứ đã ngon lành cành đào, thật tuyệt vời :laughing:

# 3. Kết luận
Tuy đơn giản nhưng vô cùng thú vị anh em nhỉ :grinning:

Hi vọng bài viết này có ích và giúp anh em phần nào đó có thêm động lực để học hỏi thêm nhiều điều thú vị khác.

Cảm ơn đã đọc bài viết này :clap:
[Repo tại đây](https://github.com/daint2git/viblo.asia/tree/master/npm-typescript-package)