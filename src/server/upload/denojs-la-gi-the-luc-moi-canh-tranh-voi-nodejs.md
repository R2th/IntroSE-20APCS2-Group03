![](https://images.viblo.asia/1d4ce923-d919-4ccf-af8a-9e444ab8d793.jpg)

Vào ngày 13 tháng 5 năm 2018, Ryan Dahl - cha đẻ của Node.js đã cho ra mắt một Runtime Enviroment cho Javascript có tên là [Deno](https://deno.land/), được cho là để khắc phục tất cả các vấn đề của Node.js. Đừng hiểu nhầm, Node.js hiện tại vẫn là Runtime Enviroment tuyệt vời theo cách riêng của nó. Tuy nhiên, Ryan đã thừa nhận một vài điều cần phải cải thiện đối với Node.js như là bảo mật, mô-đun, và các gói cài đặt phụ thuộc.
> Runtime Enviroment : là môi trường cung cấp các đối tượng, môi trường để JavaScript giao tiếp với máy tính.

## Deno là gì ? Các tính năng chính của Deno ? 
Deno là Runtime Enviroment cho Javascript và TypeScript, sử dụng V8 Engine và ngôn ngữ lập trình Rust. Deno có một số điểm nổi bật như:
* Bảo mật theo mặc đinh. Không thể truy cập các mô-đun khi chưa được enabled.
* Hỗ trợ TypeScript.
* Hệ thống mô-đun chuẩn hoá được đảm bảo hoạt động với Deno.
* Chỉ gửi duy nhất một tập tin.

###  Bảo mật
Theo tác giả, bảo mật là một trong những tính năng quan trọng nhất của Deno.
<br>
Trái ngược với Node, Deno mặc định thực thi trong môi trường ảo hoá (sandbox), điều đó có nghĩa là Runtime không có quyền truy cập vào:
* Các file hệ thống
* Hệ thống mạng
* Các kịch bản khác nhau.
* Các biến môi trường
<br>
Hãy cùng xem hệ thống bảo mật Deno hoạt động

```
(async () => {
 const textEncode = new TextEncoder();
 const data = encoder.encode('Hello world\n');

 await Deno.writeFile('helloWorld.txt', data);
 await Deno.writeFile('helloWorld2.txt', data);
})();
```

Function trên tạo hai tệp txt có tên `helloWorld.txt` và `helloWorld2.txt` để in ra dòng chữ `Hello world`. Function này được thực hiện trong SandBox nên nó không có quyền truy cập vào hệ thống tệp.
<br>
Để chạy lệnh trên, hãy gõ
```
deno run write-helloWorld.ts
```

Sẽ có một thông báo hiện ra
```
⚠️Deno requests write access to "/Users/user/folder/helloWorld.txt". Grant? [a/y/n/d (a = allow always, y = allow once, n = deny once, d = deny always)]
```
Thông báo này cho thấy, việc  tạo một file text phải có sự đồng ý. Vì vậy để khắc phục hãy thêm option : `allow alway`  : 
```
deno run --allow-write write-helloWorld.ts
```
Sẽ không có lỗi nào xảy ra, và 2 file text đã được tạo thành công.

Bên cạnh option `--allow-write`, còn nhiều option khác như `--allow-net`, cho phép sử dụng network request, `allow-env`, cho phép truy cập vào môi trường, `--allow-run`, cho phép thực thi các chương trình con.
### Modules
Deno giống như các trình duyệt, tải các mô-đun bằng URL. Nhiều người ban đầu đã bối rồi khi thấy các import module bằng Url

`import { assertEquals } from "https://deno.land/std/testing/asserts.ts";`
<br>
Bằng việc Import mô-đun bằng URL, Deno không phụ thuộc vào Npm. Điều đó cho thấy sẽ không cần file **`package.json`** và thư mục **`node_modules`** cồng kềnh.

Khi ứng dụng bắt đầu, Deno sẽ tải ,tự động Import các mô-đun và lưu vào caches. Bạn có thể làm mới các mô-đun bằng lệnh `--reload`.
### Tương thích với trình duyệt web
Deno được tạo ra nhằm tương thích với trình duyệt. Về mặt kĩ thuật, khi sử dụng các mô-đun ES, Deno sẽ không cần phải sử dụng **`webpack`** nên sẽ luôn luôn tương thích với các trình duyệt, kể cả với các trình duyệt lâu đời như Explorer Internet

### Hỗ trợ TypeScript

Sử dụng TypeScript rất dễ dàng trong Deno mà không cần bất kì tệp cấu hình nào. Tuy nhiên, bạn cũng có thể viết bằng Javascript mà không vấp phải rắc rồi nào.


## Tóm lại
Deno, là một Runtime Enviroment mới cho TypeScript và Javascript, được ấp ủ phát triển được một thời gian khá dài. Tuy nhiên Deno vẫn còn một chặng đường phía trước để sánh ngang với NodeJs.

Với cách tiếp cận phi tập trung, Deno sẽ không phụ thuộc vào trình quản lý gói như `Npm`.

Version mới nhất của Deno đã được phát hành tại [đây](https://github.com/denoland/deno) với số lượng Stars đáng chú ý.

Bài viết này cũng xuất hiện ở trên [BLog](https://bit.ly/2UORmaQ) của mình