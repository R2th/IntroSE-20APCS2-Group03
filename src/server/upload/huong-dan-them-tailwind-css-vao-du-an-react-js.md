# Tailwind CSS và React JS
Tôi thấy Tailwind CSS là 1 thư viện CSS rất được ưa chuộng hiện nay. Với Bootstrap thì khả năng tùy biến thấp hơn nhiều so với Tailwind CSS. Tuy phải nhớ nhiều hơn vì mỗi class của Tailwind sẽ tương ứng với 1 thuộc tính trong CSS.
## 1. Tạo 1 project React
```
npx create-react-app my-project
```
- Đi đến thư mục của dự án
```
cd my-project
```
* Lưu ý: bạn phải cài đặt Node JS và npm, npx. Bạn có thể tham khảo link này:https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
## 2. Cài đặt Tailwind CSS
```
npm install -D tailwindcss postcss autoprefixer
```
```
npx tailwindcss init -p
```
## 3. Thêm thông tin vào file tailwind.config.js
>file tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
## 4. Thêm các file của thư viện Tailwin vào file css của dự án
Ví dụ tôi sẽ thêm vào file index.css của React js. Bạn có thể thêm vào các file khác của dự án sau đó add file này vào file gốc index.html
> index.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
## 5. Chạy thử dự án
> App.js
```
export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```
Thêm code bên trên vào file App.js và chạy thử. Bạn có thể thấy các kết quả của các class tử tailwind như text-3xl, font-bold