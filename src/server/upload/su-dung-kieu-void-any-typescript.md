### TypeScript void type
Kiểu **void** trong TypeScript được sử dụng để trả về loại của hàm, mà trong đó hàm không trả về bất kỳ giá trị nào, Ví dụ: <br>
```TypeScript
function log(message): void {
    console.log(messsage);
}
```
Những lợi ích khi sử dụng kiểu **void**:
- Code trở nên rõ ràng, dễ hiểu: Bạn không cần đọc toàn bộ nội dung code của hàm xem nó có trả về bất kỳ thứ gì hay không
- Đảm bảo kiểu an toàn: bạn sẽ không bao giờ gán hàm có kiểu trả về **void** cho một biến.

Lưu ý rằng nếu bạn sử dụng kiểu void cho một biến, bạn chỉ có thể gán **undefined**  cho biến đó. <br>
Trong trường hợp này, kiểu **void** không hữu ích. Ví dụ:<br>
```TypeScript
let useless: void = undefined;
useless = 1; // error
```
Tóm tắt:
- Sử dụng kiểu void **void** làm kiểu trả về của các hàm không trả về bất kỳ giá trị nào.

### TypeScript any type
TypeScript kiểu **any** cho phép bạn lưu trữ một giá trị thuộc bất kỳ kiểu nào. Nó hướng dẫn trình biên dịch bỏ qua việc kiểm tra kiểu.<br>
Thỉnh thoảng bạn cần lưu một giá trị vào một biến, nhưng bạn không biết loại của biến ở thời điển hiện tại là gì.Và giá trị không xác định có thể đến từ API của bên thứ ba hoặc input của người dùng.<br>
Trong trường hợp này bạn sẽ sử dụng kiểu **any**. Kiểu **any** cho phép bạn gán một giá trị với loại bất kỳ đến biến.<br>
```TypeScript
// json may come from a third-party API
const json = `{"latitude": 10.11, "longitude":12.12}`;

// parse JSON to find location
const currentLocation = JSON.parse(json);
console.log(currentLocation);
```
Output:<br>
```TypeScript
{ latitude: 10.11, longitude: 12.12 }
```
Trong ví dụ trên, biến **currentLocation** được gán bằng một object được trả về bởi hàm **JSON.parse()**.<br>
Tuy nhiên, khi bạn sử dụng currentLocation để truy cập các thuộc tính không tồn tại trong object, TypeScript cũng không kiểm tra hay có bất cứ cảnh báo lỗi gì:<br>
```
console.log(currentLocation.x);
```
Output:<br>
```
undefined
```
Trình biên dịch TypeScript sẽ không nhắc nhở hoặc đưa ra bất kỳ lỗi nào.<br>

**TypeScript any vs. object**<br>
Nếu bạn khai báo một biến với kiểu **object**, bạn cũng có thể gán cho nó bất kỳ giá trị nào.
Tuy nhiên, bạn không thể gọi một phương thức trên **object** ngay cả khi phương thức đó thực sự không tồn tại. Ví dụ:<br>
```
let result: any;
result = 10.123;
console.log(result.toFixed());
result.willExist(); //
```
Trong ví dụ này, TypeScript compiler không có bất kỳ cảnh báo lỗi nào, mặc dù phương thức willExist() không tồn tại ở thời điểm biên dịch.Nhưng phương thức willExist () có thể khả dụng trong thời gian chạy.<br>
Tuy nhiên, nếu bạn thay đổi kiểu của biến **result**  thành **object**, trình biên dịch TypeScript sẽ phát ra lỗi:<br>
```
let result: object;
result = 10.123;
result.toFixed();
```
Output:<br>
```
error TS2339: Property 'toFixed' does not exist on type 'object'.
```