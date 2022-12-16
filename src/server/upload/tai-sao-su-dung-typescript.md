### Tại sao sử dụng TypeScript ?
Có 1 lý do chính để sử dụng TypeScript:<br>
- TypeScript thêm một **type system**(hệ thống kiểu) để giúp bạn tránh được nhiều vấn đề với dynamic types trong JavaScript.

### Giới thiệu về dynamic type trong JavaScript
JavaScript là dynamically typed. ví dụ:<br>
```TypeScript
"Hello"
```
Từ giá trị, bạn có thể biết rằng kiểu của nó là chuỗi. Ngoài ra, giá trị sau là một số:<br>
```TypeScript
2020
```
Xem ví dụ sau:<br>
```TypeScript
let box;
box = "hello";
box = 100;
```
Loại của biến **box** thay đổi dựa trên giá trị được gán cho nó.<br>
Để kiểm tra kiểu của biến **box** trong thời gian chạy, bạn sử dụng toán tử **typeof**:<br>
```TypeScript
let box;
console.log(typeof(box)); // undefined

box = "Hello";
console.log(typeof(box)); // string

box = 100;
console.log(typeof(box)); // number
```
Trong ví dụ trên, câu lệnh đầu tiền định nghĩa biến mà không gán giá trị. Loại của biến là **undefined**.<br>
Sau đó, chúng ta gán chuỗi **"Hello"** đến biến **box** và hiển thị loại của nó. Loại của biến **box** bây giờ thay đổi thành **string**.<br>
Cuối cùng, chúng tôi gán 100 cho biến **box**, lần này, kiểu của biến **box** chuyển thành **number**.<br>
Như bạn có thể thấy, ngay sau khi giá trị được gán, loại biến sẽ thay đổi.<br>
Và bạn không cần phải chỉ ra cho JavaScript biết biến nào phải tương ứng với kiểu dữ liệu nào. JavaScript sẽ tự động suy ra loại dữ liệu của biến từ giá trị.<br>
Dynamic types mang lại sự linh hoạt, tuy nhiên, chúng cũng dẫn đến nhiều vấn đề.<br>
### Vấn đề với dynamic types
Giả sử bạn có một hàm trả về một đối tượng **product**  dựa trên một id:<br>
```TypeScript
function getProduct(id){
  return {
    id: id,
    name: `Awesome Gadget ${id}`,
    price: 99.5
  }
}
```
Tiếp theo sử dụng hàm getProduct () để truy xuất sản phẩm có id 1 và hiển thị dữ liệu của nó:<br>
```TypeScript
const product = getProduct(1);
console.log(`The product ${product.Name} costs $${product.price}`);
```
Output:<br>
```
The product undefined costs $99.5 
```
Kết quả trả về không phải là những gì chúng ta mong đợi.<br>
Vấn đề với đoạn code trên là object **product** không có thuộc tính **Name**. Nó có thuộc tính **name** với ký tự đầu tiên **n** viết thường.<br>
Tuy nhiên, bạn chỉ có thể biết được vấn đề lỗi xẩy ra cho đến khi bạn chạy đoạn code này.<br>
Tham chiếu đến một thuộc tính không tồn tại trong một đối tượng là một vấn đề phổ biến khi làm việc trong JavaScript.<br>
Đây là lý do tại sao TypeScript ra đời.<br>
### Typescript giải quyết vấn đề với dynamic types
Để khắc phục sự cố tham chiếu một thuộc tính không tồn tại trong một đối tượng, bạn thực hiện các bước sau:<br>
Đầu tiên, định nghĩa  “shape” của đối tượng **product** bằng một **interface**. Chúng ta sẽ tìm hiểu về **interface** trong hướng dẫn sau.<br>
```TypeScript
interface Product{
    id: number,
    name: string,
    price: number
};
```
Thứ hai, sử dụng rõ ràng kiểu **Product**  làm kiểu trả về của hàm getProduct ():<br>
```TypeScript
function getProduct(id) : Product{
  return {
    id: id,
    name: `Awesome Gadget ${id}`,
    price: 99.5
  }
}
```
Khi bạn tham chiếu một thuộc tính không tồn tại, trình chỉnh sửa mã(VS Code) sẽ thông báo lỗi cho bạn ngay lập tức:
```TypeScript
const product = getProduct(1);
console.log(`The product ${product.Name} costs $${product.price}`);
```
Mình sẽ mở VS Code nên và copy đoạn code trên vào để biên dịch.<br>
VS Code sẽ highlighted  lỗi trên thuộc tính **Name** như sau:<br>
![](https://images.viblo.asia/222cebfe-d364-4483-ada3-8b7ee9f347f6.png)

Và khi di con trỏ chuột vào thuộc tính **Name**, bạn sẽ thấy một gợi ý giúp bạn giải quyết vấn đề:<br>
![](https://images.viblo.asia/8f1df2fa-d02d-4ab5-83e1-46b119846637.png)

Tóm tắt:<br>
- JavaScript là dynamically typed. Nó mang lại sự linh hoạt nhưng cũng tạo ra nhiều vấn đề.
- TypeScript  thêm một hệ thống loại tùy chọn để JavaScript giải quyết các vấn đề này.