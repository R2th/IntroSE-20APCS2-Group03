### Code TypeScript hiển thị 'Hello World' trong node.js
1. Đầu tiên hãy tạo một folder để lưu code, ví dụ folder là : **helloworld** . <br>
2. Chạy VS Code và mở folder đó .<br>
3. Tạo một file TypeScript gọi là **app.ts** với extension của file là **.ts**
4. Thêm code bên dưới vào file app.ts<br>
```TypeScript 
let message: string = 'Hello, World!';
console.log(message);
```
5. Mở Terminal trong VS Code bằng keyboard shortcut **Ctrl+\`**  hoặc theo menu **Terminal > New Terminal**

![](https://images.viblo.asia/9086f77a-34f1-458a-af90-58a7ffa78af5.png)

6. Gõ command bên dưới để compile(biên dịch) file app.ts:
```TypeScript
tsc app.ts
```
![](https://images.viblo.asia/d4553f0f-1710-4be2-8f22-01a3cdf89eed.png)

Nếu mọi thứ ok, bạn sẽ thấy một file gọi là app.js được sinh ra bởi TypeScript compiler:<br>
![](https://images.viblo.asia/31c89224-3947-4915-a1a5-98dddea6b493.png)

Để chạy tệp app.js trong node.js, bạn sử dụng lệnh sau:<br>
```
node app.js
```
Output:<br>
```
Hello, World!
```
### Code TypeScript hiển thị 'Hello World' trong Web Browsers
1. Đầu tiên, bạn tạo một file gọi là index.html và include file app.js như bên dưới:<br>
```TypeScript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TypeScript: Hello, World!</title>
</head>
<body>
    <script src="app.js"></script>
</body>
</html>
```
2. Cập nhật code file app.ts như bên dưới:<br>
```TypeScript
let message: string = 'Hello, World!';
// create a new heading 1 element
let heading = document.createElement('h1');
heading.textContent = message;
// add the heading the document
document.body.appendChild(heading);
```
3. Biện dịch file app.ts với command sau:
```
tsc app.ts
```
4. Mở Live Server từ VS code bằng cách click chuột phải vào file index.html và select với **Open with Live Server**
![](https://images.viblo.asia/cbc6cf7c-88d7-4103-be2c-6671e06d979d.png)

Live Server sẽ mở index.html với thông báo sau:<br>
![](https://images.viblo.asia/3345e5c2-b1fe-43b5-af94-79cdeccf1b4c.png)

Để thực hiện các thay đổi, bạn cần chỉnh sửa tệp app.ts. Ví dụ:<br>
```TypeScript
let message: string = 'Hello, TypeScript!';

let heading = document.createElement('h1');
heading.textContent = message;

document.body.appendChild(heading);
```
Và biên dịch tệp app.ts:<br>
```
tsc app.ts
```
Output với Live Server :<br>
```
Hello, TypeScript!
```
TypeScript compiler sẽ sinh ra một file mới là app.js và Live Server sẽ tự động reload nó trên web browser.<br>
Chú ý: file app.js là output file của file app.ts, do đó, bạn không bao giờ được trực tiếp thay đổi code trong tệp này, nếu không bạn sẽ mất các thay đổi sau khi biên dịch lại tệp app.ts.