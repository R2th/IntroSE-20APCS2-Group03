`console.log(24 == '24'); // true`
<br/>
Số bằng string :joy::joy:
<br/>Bạn đã lần nào bị confused khi thấy kết quả log ra true. 
Sỡ dĩ điều này xảy ra là gì trước khi phép so sánh thực sự xảy ra, Javascript sẽ thực hiện *coercion*. 
<br/>
Như vậy, coercion "đáng sợ" như thế nào? Chúng ta sẽ cùng tìm hiểu nhé ...
# Phân loại
Coercion có 2 kiểu:  *explicit* và *implicit*
<br/>
Hiểu đơn giản là một cái chuyển kiểu dữ liệu một cách tường minh, mình có thế nhìn thấy được qua mã, trong khi đó kiểu kia thì *coercion* ngầm định, như ví dụ kết quả log ra true phía trên kia.
<br/>2 ví dụ cụ thể để ta phân biệt:
```
var a = "42";
var b = Number( a ); // explicit
a;				                   // "42"
b;				                   // 42 -- number
```
```
var a = "42";
var b = a * 1;	// "42" implicit
a;				// "42"
b;				// 42 -- number
```
# Các trường hợp coercion phổ biến
Khác với các *explicit coercion* được thể hiện qua các hàm (ParseInt(), Number(), Stringify()...) tường minh thì các *implicit coercion* thường gặp trong biểu thức điều kiện của `if`, `while`, trong `loop` và trường hợp so sánh tương đối (`==`)
## Biểu thức điều kiện
Trong các biểu thức điều kiện, với các giá trị không thuần túy là `boolean`, các giá trị đó sẽ được *coercion* sang `boolean`, để xác định `true` hay `false`, từ đó để thực hiện biểu thức điều kiện hay không?
### Truthy hay Falsy?
Các giá trị Falsy như sau: "" (chuỗi rỗng), 0, -0, NaN, null, undefined và false (dĩ nhiên)
Các giá trị còn lại sau khi coercion sẽ thành truthy hết :v: 
```
var arrayA = [];
if (arrayA) {
    console.log('Hello, coercion!'); // Hello, coercion!, bz arrayA là truthy value.
}
```
## Biểu thức so sánh
```
var a = "24";
var b = 24;
a == b;			// true
a === b;		// false
```
Bạn nhận ra sự khác biệt khi so sánh tương đối và so sánh tuyệt đối chứ?
### So sánh tương đối
Nếu 2 value có cùng type, thì chỉ việc so sánh, nhưng nếu chúng khác type, Javascript sẽ cố gắng để convert chúng về cùng 1 type rồi mới so sánh.
`a == b <=> "24" == 24 <=>   24 == 24 // true`
Coercion không tuần theo 1 logic nào cả, mà nó tuân theo các rules mà ta phải nhớ, áp dụng cho vào một số các trường hợp (khi so sánh các value, type với nhau).
*Một số trường hợp hay gặp*
#### Number và String
String sẽ được convert thành number, sau đó so sánh.
```
var a = '1' + 9 // = 19, luôn ưu tiên chuỗi hơn 
// nếu muốn tránh 
var b = '1'*1 + 9 // =10
```
EXCEPTION: string: ‘abc’, ‘s1fe13324’ sẽ convert thành `NaN`, mà `NaN` không bằng giá trị nào cả, nên kết quả trả về luôn là *false*.
#### boolean với các type values khác
Đầu tiên boolean value (true => 1, false => 0) thành number, rồi mới so sánh
`"1" == true <=>1 == 1     => true`
do `true` được convert thành number `1` và string `“1”` convert thành number `1`, dẫn tới result là `true`.
#### `null` và `undefined`
`null == undefined // true`
luôn luôn đúng. Còn tại sao đúng thì tôi chịu :)))
### So sánh tuyệt đối (`===`)
Operator này sẽ chỉ compare 2 value, just it, không coercion, không convert type.<br/>
Best Practice: 
> Hạn chế ít nhất có thể các phép so sánh tương đối, nên dùng so sánh tuyệt đối để tránh các side-effects.