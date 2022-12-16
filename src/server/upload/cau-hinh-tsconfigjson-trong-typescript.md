Bài viết này mình sẽ chia sẻ một số config cơ bản dùng trong file tsconfig.json, các bạn hãy xem các ví dụ bên dưới để hiểu hơn nhé.<br>
1. Đầu tiên mình mở VS Code nên và tạo file app.ts trong thư mục **helloworld** 
2. Thêm code bên dưới vào file app.ts
```TypeScript
let message: string = 'Hello, World!';
console.log(message);
```
3. Mở Terminal trong VS Code bằng keyboard shortcut Ctrl+\` hoặc theo menu **Terminal > New Terminal** <br>
![](https://images.viblo.asia/9086f77a-34f1-458a-af90-58a7ffa78af5.png)

4. Gõ command bên dưới để compile(biên dịch) file app.ts:
```
tsc app.ts
```
![](https://images.viblo.asia/d4553f0f-1710-4be2-8f22-01a3cdf89eed.png)

Nếu mọi thứ ok, bạn sẽ thấy một file gọi là app.js được sinh ra bởi TypeScript compiler:<br>
![](https://images.viblo.asia/31c89224-3947-4915-a1a5-98dddea6b493.png)

Khi biên dịch, file app.js được hiển thị trong thư mục **helloworld**, giả sử mình muốn hiển thị các files đã được biên dịch vào trong thư mục js thì mình sẽ làm như thế nào.<br>
Để giải quyết vấn đề này mình sẽ tạo một file là tsconfig.json và thêm code như sau:<br>
```
{
    "compilerOptions": {
        "outDir"    : "js",
    }
}
```
Sau đó chạy command:<br>
```
tsc
```
Output:<br>
Option outDir trong config sẽ lưu tất cả các files đã biên dịch vào thư mục js<br>
![](https://images.viblo.asia/95a81202-d1c9-4a52-b580-1f621a8708cf.png)

Tiếp theo mình tạo một thư mục là **css** trong thư mục **helloworld**, sau đó tạo một file là test.ts trong thư mục **css**:<br>
![](https://images.viblo.asia/efd6432e-5949-40da-b772-8d62b3b4e51e.png)

Sau đó chạy command:<br>
```
tsc
```
Lúc này trình biên dịch sẽ tìm tất cả các files có phần đuổi là .ts để biên dịch sang files js và lưu chúng vào thư mục js:<br>
![](https://images.viblo.asia/7f608a6e-28dc-4f4b-a791-b974bf430a97.png)

Trường hợp mình không muốn biên dịch files có đuôi mở rộng .ts trong thư mục css, thì mình sẽ cập nhật code trong file tsconfig.json:<br>
```TypeScript
{
    "compilerOptions": {
        "outDir"    : "js",
    },
    "exclude": [
        "css",
    ]
}
```
Tiếp tục xóa thư mục css trong thư mục js đi và chạy lại command:<br>
```
tsc
```
Output:<br>
Trình biên dịch sẽ bỏ qua các files có đuôi .ts trong thư mục css<br>
![](https://images.viblo.asia/f36e32c2-2478-4761-9b1e-9b95abeb972d.png)

Có một vấn đề là mỗi lần mình thay đổi nội dung trong file .ts mình đều phải chạy lại trình biên dịch bằng command tsc.<br>
Để giải quyết vấn đề này mình sẽ thêm options watch vào file tsconfig.json như dưới:<br>
```TypeScript
{
    "compilerOptions": {
        "outDir"    : "js",
        "watch"     : true
    },
    "exclude": [
        "css",
    ]
}
```
Sau đó chạy command:<br>
```
tsc
```
Trinh biên dịch ở chế độ watch mode(chế độ này sẽ tự động kiểm tra thay thổi trong file .ts nhé)<br>
![](https://images.viblo.asia/211e0f11-2ba6-4f91-9320-3058521fd4a4.png)

Khi bạn thay đổi code trong file .ts và nhấn lưu trình biên dịch sẽ tự động kiểm tra và biên dịch code bên dưới:<br>
![](https://images.viblo.asia/dac5889c-fe32-4ad1-8109-75fc64a63904.png)

Tiếp tục cập nhật code trong file tsconfig.json với một số options như target, module, removeComments :<br>
```TypeScript
{
    "compilerOptions": {
        "target"    : "ES6",
        "module"    : "commonjs",
        "outDir"    : "js",
        "watch"     : true,
        "removeComments" : true,
    },
    "exclude": [
        "css",
    ]
}
```
- Option target cho phép biên dịch code Typescript sang kiểu ES6 
- CommonJS là tiêu chuẩn được sử dụng trong Node.js để làm việc với các module
- Option removeComments để remove comments khi biên dịch sáng file js