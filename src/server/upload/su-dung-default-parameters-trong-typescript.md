### Giới thiệu về default parameters
JavaScript hỗ trợ các **default parameters** kể từ ES2015 (hoặc ES6) với cú pháp sau:<br>
```TypeScript
function name(parameter1=defaultValue1,...) {
   // do something
}
```
Trong cú pháp này, nếu bạn không truyền các đối số hoặc truyền **undefined** vào bên trong hàm khi goi nó, hàm sẽ nhận các giá trị khởi tạo mặc định cho các tham số bị bỏ qua.Ví dụ<br>
```TypeScript
function applyDiscount(price, discount = 0.05) {
    return price * (1 - discount);
}

console.log(applyDiscount(100)); // 95
```
Trong ví dụ này, hàm **applyDiscount()** có tham số discount làm tham số mặc định.<br>
Khi bạn không truyền đối số discount vào hàm **applyDiscount()**, hàm sẽ sử dụng giá trị mặc định là 0,05.<br>
Tương tự như JavaScript, bạn có thể sử dụng các tham số mặc định trong TypeScript với cùng một cú pháp:<br>
```
function name(parameter1:type=defaultvalue1, parameter2:type=defaultvalue2,...) {
   //
}
```
Ví dụ sau sử dụng các tham số mặc định cho hàm **applyDiscount()**: <br>
```TypeScript
function applyDiscount(price: number, discount: number = 0.05): number {
    return price * (1 - discount);
}

console.log(applyDiscount(100)); // 95
```
Lưu ý rằng bạn không thể bao gồm các tham số mặc định trong định nghĩa loại hàm. Đoạn mã sau sẽ dẫn đến lỗi:<br>
```TypeScript
let promotion: (price: number, discount: number = 0.05) => number;
```
Error:<br>
```TypeScript
error TS2371: A parameter initializer is only allowed in a function or constructor implementation.
```
### Default parameters and Optional parameters
Giống như các **optional parameters**(tham số tùy chọn), các tham số mặc định cũng là tùy chọn, có nghĩa là bạn có thể bỏ qua các tham số mặc định khi gọi hàm.<br>
Ngoài ra, cả tham số mặc định và tham số mặc định theo sau đều có chung một loại. Ví dụ: hàm sau:<br>
```TypeScript
function applyDiscount(price: number, discount: number = 0.05): number {
  // ...
}
```
và<br>
```TypeScript
function applyDiscount(price: number, discount?: number): number {
  // ...
}
```
cùng loại:<br>
```
(price: number, discount?: number) => number
```
Các tham số tùy chọn phải đứng sau các tham số bắt buộc. Tuy nhiên, các tham số mặc định không cần xuất hiện sau các tham số bắt buộc.<br>
Hàm sau trả về số ngày trong một tháng và năm cụ thể:<br>
```TypeScript
function getDay(year: number = new Date().getFullYear(), month: number): number {
    let day = 0;
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            day = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            day = 30;
            break;
        case 2:
            // leap year
            if (((year % 4 == 0) &&
                !(year % 100 == 0))
                || (year % 400 == 0))
                day = 29;
            else
                day = 28;
            break;
        default:
            throw Error('Invalid month');
    }
    return day;
}
```
Trong ví dụ này, giá trị mặc định của năm là năm hiện tại nếu bạn không truyền đối số hoặc truyền giá trị undefined.<br>
Ví dụ sau sử dụng hàm **getDay()** để lấy số ngày trong tháng 2 năm 2019:<br>
```TypeScript
let day = getDay(2019, 2);
console.log(day); // 28
```
Để nhận được số ngày trong tháng 2 của năm hiện tại, bạn cần truyền vào **undefined**  cho tham số năm như sau:<br>
```TypeScript
let day = getDay(undefined, 2);
console.log(day);
```

Tóm tắt:<br>
- Sử dụng default parameter với  cú pháp **parameter:=defaultValue** nếu bạn muốn đặt giá trị khởi tạo cho tham số.
- Các default parameter là tùy chọn
- Để sử dụng giá trị khởi tạo mặc định của một tham số, bạn bỏ qua đối số khi gọi hàm hoặc truyền vào **undefined**.