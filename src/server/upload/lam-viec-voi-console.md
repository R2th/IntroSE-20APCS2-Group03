Các lập trình viên trong quá trình phát triển phần mềm không thể thiếu được công cụ debug, và trong javascript cũng không phải là ngoại lệ. Và console cũng chính là công cụ mà chúng ta nghĩ đến đầu tiên khi muốn debug 1 đoạn code trong javascript, nó đáp ứng được sự nhanh gọn đơn giản và mang lại hiệu quả cao trong quá trình làm việc. 
# console là gì?
Javascript `Console` là tính năng được tích hợp trong các trình duyệt hiện nay, nó mang lại các công cụ giúp cho người lập trình có thể dễ dàng kiểm tra ở ngay bên ngoài giao diện trên trình duyệt. Một số tính năng mà nó đem lại:
*     Hiển thị error và warning của trang web ngay tại console của trình duyệt.
*     Trực tiếp tương tác với web thông qua Javascript.
*     Kiểm tra và phân tích các hoạt động của network.
## 1. Wrapping Arguments
Nếu bạn truyền vào bên `console.log()` một {} thì nó sẽ hiểu và trả dữ liệu về dạng objects. Thay vì thấy một loạt các cặp key-val như là id, name,.. như hình dưới:
![](https://images.viblo.asia/59965e52-36dd-44b8-bbc8-0e3c2a96c210.png)

Thì nó sẽ trả về tên biến trước dữ liệu cho bạn: 
![](https://images.viblo.asia/d3a1cd4f-7060-4a59-beef-8546b3573277.gif)
## 2. Log, Error, Warn, info
Ngoài `console.log()`, console còn có các phương thức khác là để in dữ liệu vào console trên trình duyệt như là `console.error`, `console.warn`.
* `console.log()`
![](https://images.viblo.asia/ef84cefd-8321-402a-ac99-0479292b7469.png)
* `console.warn()`
![](https://images.viblo.asia/43354ecf-27d5-416c-b8f6-f1c923cab3f7.png)
* `console.error()`
![](https://images.viblo.asia/64831c78-f409-4709-8d66-07193514c381.png)
## 3.Thay thế ký tự và cài đặt format
| Cú pháp | Ý nghĩa |
| -------- | -------- |
| %s     | Thay thế chuỗi |
| %i| Thay thế số nguyên|
| %f|Thay thế số thực|
| %o|Thay thế object|
| %c| Thay đổi style|
Một số ví dụ: 
%s:
![](https://images.viblo.asia/dd229c36-b2cd-44f2-b452-5996238f7cff.png)
Tương tự với %i, %f thôi các bạn nhé. Tiếp tới mình giới thiệu tới %c cái này thì khá hay, nó sẽ thay đổi style css cho console output.  Ở đây mình dùng 1 biến là css để lưu các giá trị css mà mình muốn truyền vào.
```
let css = "text-shadow: -1px -1px hsl(0,100%,50%),1px 1px hsl(27, 100%, 50%),3px 2px hsl(54, 100%, 50%),5px 3px hsl(81, 100%, 50%),7px 4px hsl(135, 100%, 50%),9px 5px hsl(162, 100%, 50%),11px 6px hsl(189, 100%, 50%),13px 7px hsl(243, 100%, 50%),14px 8px hsl(270, 100%, 50%),16px 9px hsl(297, 100%, 50%); font-size: 40px;";
console.log("%c Wow this is atrocious", css)
```
Các bạn có thể copy đoạn code trên kia và paste vào console trên trình duyệt để xem kết quả nhé
![](https://images.viblo.asia/e6c93b42-12bf-4dda-8ab7-dab72ae004fc.png)
## 4. Hiển thị JSON vào table:
Chúng ta có thể nhanh chóng xem được các thành phần của đối tượng khi sử dụng `console.table()`
![](https://images.viblo.asia/8d142770-1909-4857-a975-45b31bb13575.gif)
## 5. Chọn nhanh 1 phần tử DOM Elements:
Bạn có thể chọn một phần tử DOM ở tab Element trong trình duyệt và sau đó truy cập tới nó ở trong `console` bằng `$0` . Quá trình bạn click sẽ được trình duyệt lưu element, và lưu tối đa được 5 phần tử thôi nhé($0, $1, $2, $3, $4).
![](https://images.viblo.asia/9e12785e-bc99-4c8d-ae41-11851a01a130.gif)
## 6. Console.group
Phương thức này cho phép bạn có thể nhóm các console.log lại. Cú pháp sử dụng khá đơn giản bạn chỉ cần nhập các `console.log()` vào bên dưới `console.group()`   và thêm `console.groupEnd()` để kết thúc `group`.
![](https://images.viblo.asia/db331515-b907-4d8e-b29d-508520d9793f.png)
Kết quả là nó sẽ nhóm tất cả các console.log lại:
![](https://images.viblo.asia/89615957-ec63-4862-b640-8f5b277e5d2f.png)
Đây là những gì mình tìm hiểu được trong console. Mình xin kết thúc bài viết ở đây, quá trình viết nếu có gì sai sót thì các bạn hãy góp ý ở cmt bên dưới và thông cảm giúp mình nhé. Mình xin cảm ơn !!!
# Tài liệu tham khảo:
https://medium.freecodecamp.org/how-you-can-improve-your-workflow-using-the-javascript-console-bdd7823a9472

https://medium.freecodecamp.org/commanding-the-javascript-console-4e1caaeab345