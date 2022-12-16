### Giới thiệu về TypeScript
TypeScript là một ngôn ngữ lập trình mã nguồn mở, được xây dựng dựa trên JavaScript. Đầu tiên bạn bạn viết một đoạn code TypeScript, sau đó bạn phải biên dịch(compiler) đoạn code đó ra code JavaScript thuần túy.<br>
Khi chúng ta có code JavaScript thuần túy, bạn có thể chạy nó trên bất kỳ môi trường nào mà JavaScript chạy.<br>
Files chứa code TypeScript có phần đuôi mở rộng .ts thay vì sử dụng đuôi .js của files Javascript thuần túy.<br>
![](https://images.viblo.asia/9fd0229f-a0bf-459e-be54-aa999034593a.png)

### TypeScript giúp tăng năng suất làm việc bằng việc tránh được bugs
Khi sử dụng **Types** để định nghĩa kiểu dữ liệu trong TypeScript bạn có thể bắt được các bugs tại thời điểm biên dịch thay vì để chúng xuất hiện trong môi trường chạy thực tế.<br>
Ví dụ chúng ta có hàm cộng 2 số như bên dưới:<br>
```TypeScript
function add(x, y) {
   return x + y;
}
```
Nếu bạn lấy giá trị từ form input html và đưa chúng vào trong function thì bạn sẽ nhận được kết quả là string chứ không phải là number.<br>
```TypeScript
let result = add(input1.value, input2.value);
console.log(result); // result of concatenating strings
```
Ví dụ, nếu người dùng nhập giá trị 10 và 20 thì hàm add() sẽ trả về giá trị 1020 chứ không phải là 30.<br>
Lý do là giá trị input1.value và input2.value nhận từ from input là chuỗi, không phải là string. Khi bạn sử dụng toán tử + để cộng 2 string, nó sẽ trả về một string.<br>
Khi bạn sử dụng TypeScript để chỉ định rõ rằng kiểu dữ liệu cho các tham số như sau:<br>
```TypeScript
function add(x: number, y: number) {
   return x + y;
}
```
Trong hàm add(), chúng ta thêm types number cho các tham số. Hàm add() sẽ chỉ chấp nhận các tham số có types giá trị là numbers.<br>
Khi bạn gọi hàm bên dưới:<br>
```
let result = add(input1.value, input2.value);
```
Trình biên dịch TypeScript sẽ gặp lỗi nếu bạn biên dịch từ TypeScript code đến JavaScript. Do đó, bạn có thể ngăn lỗi xảy ra trong thời gian chạy chương trình.