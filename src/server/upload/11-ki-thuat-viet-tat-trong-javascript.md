# 1. Null, Undefined, Empty Checks Shorthand
Khi tạo các biến mới đôi khi bạn muốn kiểm tra xem biến bạn đang tham chiếu cho giá trị của nó không phải là null hoặc không xác định. Mình muốn nói rằng đây là một kiểm tra rất phổ biến đối với các lập trình viên JavaScript.
<br>
Cú pháp dài:
```
if (variable1 !== null || variable1 !== undefined || variable1 !== '') { let variable2 = variable1; }
```

Cú pháp ngắn:
```
let variable2 = variable1  || '';
```

Đừng tin tôi ? Hãy tự kiểm tra (dán vào Chrome Dev Tools và nhấp vào chạy):
```
//null value example
let variable1 = null;
let variable2 = variable1  || '';
console.log(variable2);
//output: '' (an empty string)

//undefined value example
let variable1 = undefined;
let variable2 = variable1  || '';
console.log(variable2);
//output: '' (an empty string)

//normal value example
let variable1 = 'hi there';
let variable2 = variable1  || '';
console.log(variable2);
//output: 'hi there'
```
# 2. Object Array Notation Shorthand
Cú pháp dài:
```
let a = new Array(); a[0] = "myString1"; a[1] = "myString2"; a[2] = "myString3";
```
Cú pháp ngắn:
```
let a = ["myString1", "myString2", "myString3"];
```
# 3. If true … else Shorthand
Đây là một mã tuyệt vời nếu bạn muốn làm một cái gì đó nếu kiểm tra là đúng, khác làm một cái gì đó khác bằng cách sử dụng toán tử ternary.

Cú pháp dài:
```
let big;
if (x > 10) {
    big = true;
}
else {
    big = false;
}
```
Cú pháp ngắn:
```
let big = x > 10 ? true : false;
```
Nếu bạn dựa vào một số đặc điểm của JavaScript, điều này cũng có thể đạt được mã ngắn gọn hơn. Ví dụ: bạn có thể giảm đoạn mã trước đó:
```
let big = (x > 10);
//further nested examples
let x = 3,
big = (x > 10) ? "greater 10" : (x < 5) ? "less 5" : "between 5 and 10";
console.log(big); //"less 5"
let x = 20,
big = {true: x>10, false : x< =10};
console.log(big); //"Object {true=true, false=false}"
```
# 4. Declaring variables Shorthand
Mình nghĩ rằng cái này được cộng đồng sử dụng nhiều nhất ở nước ngoài.
Cú pháp dài:

```
let x;
let y;
let z = 3;
```

Cú pháp ngắn:

```
let x, y, z=3;
```
# 5. Assignment Operators Shorthand
Toán tử gán được sử dụng để gán giá trị cho các biến JavaScript và không nghi ngờ gì bạn sử dụng số học hàng ngày mà không cần suy nghĩ (bất kể ngôn ngữ lập trình nào bạn sử dụng Java, PHP, C ++ về cơ bản là cùng một nguyên tắc).
<br>
Cú pháp dài:
```
x=x+1;
minusCount = minusCount - 1;
y=y*10;
```
Cú pháp ngắn:
```
x++;
minusCount --;
y*=10;
```
Các toán tử tốc ký khác, cho rằng x = 10 và y = 5, bảng dưới đây giải thích các toán tử gán:
```
x += y //result x=15
x -= y //result x=5
x *= y //result x=50
x /= y //result x=2
x %= y //result x=0
```
# 6. RegExp Object Shorthand
Ví dụ để tránh sử dụng đối tượng RegExp.

Cú pháp dài:
```
var re = new RegExp("\d+(.)+\d+","igm"),
result = re.exec("padding 01234 text text 56789 padding");
console.log(result); //"01234 text text 56789
```
Cú pháp ngắn:
```
var result = /d+(.)+d+/igm.exec("padding 01234 text text 56789 padding");
console.log(result); //"01234 text text 56789"
```
# 7. If Presence Shorthand
Điều này có thể là tầm thường, nhưng đáng được đề cập. Khi thực hiện, nếu kiểm tra các toán tử  gán đôi khi có thể bị lỗi.

Cú pháp dài:
```
if (likeJavaScript === true)
```
Cú pháp ngắn:
```
if (likeJavaScript)
```
Đây là một ví dụ khác:

Cú pháp dài:
```
let c;
if ( c!= true ) {
// do something...
}
```
Cú pháp ngắn:
```
let c;
if ( !c ) {
// do something...
}
```
# 8. Function Variable Arguments Shorthand
Tốc ký đối tượng theo nghĩa đen có thể mất một chút để làm quen, nhưng các nhà phát triển dày dặn thường thích nó hơn một loạt các hàm và biến được lồng nhau. Bạn có thể tranh luận kỹ thuật nào ngắn hơn, nhưng mình thích sử dụng ký hiệu nghĩa đen của đối tượng như là một thay thế sạch cho các hàm như các hàm tạo.
Cú pháp dài:
```
function myFunction( myString, myNumber, myObject, myArray, myBoolean ) {
    // do something...
}
myFunction( "String", 1, [], {}, true );
```
Cú pháp ngắn:
```
function myFunction() {
    console.log( arguments.length ); // Returns 5
    for ( i = 0; i < arguments.length; i++ ) {
        console.log( typeof arguments[i] ); // Returns string, number, object, object, boolean
    }
}
myFunction( "String", 1, [], {}, true );
```
# 9. charAt() Shorthand

Bạn có thể sử dụng hàm eval () để thực hiện việc này nhưng kỹ thuật viết tắt ký hiệu khung này sạch hơn nhiều so với đánh giá và bạn sẽ giành được lời khen ngợi của các đồng nghiệp đã từng chế giễu khả năng mã hóa nghiệp dư của bạn!

Cú pháp dài:
```
"myString".charAt(0);
```
Cú pháp ngắn:
```
"myString"[0]; // Returns 'm'
```
# 10. Short function calling
Giống như # 1, bạn có thể sử dụng các toán tử ternary để thực hiện chức năng gọi tốc ký dựa trên một điều kiện.
<br>
Cú pháp dài:
```
function x() {console.log('x')};function y() {console.log('y')};
let z = 3;
if (z == 3) 
{
    x();
} else 
{
    y();
}
```
Cú pháp ngắn:
```
function x() {console.log('x')};function y() {console.log('y')};let z = 3;
(z==3?x:y)(); // Short version!
```
# 11. Decimal base exponents
Bạn có thể đã thấy cái này xung quanh nó về cơ bản là một cách viết lạ mắt mà không có số không. 1e7 về cơ bản có nghĩa là 1 theo sau là 7 số không - nó đại diện cho một cơ sở thập phân (phiên dịch JS là một kiểu float) bằng 10.000.000.
<br>
Cú pháp dài:
```
for (let i = 0; i < 10000; i++) {
```
Cú pháp ngắn:
```
for (let i = 0; i < 1e4; i++) {
```

# Kết luận
Trên là những cách viết gọn mà mình đã tìm hiểu được và hay dùng. Cảm ơn bạn đã đọc bài viết, chúc bạn tận dụng tốt những cách trên trong dự án của bản thân.
<br>
## Bài viết được lược và dịch từ: 
https://hackernoon.com/12-amazing-javascript-shorthand-techniques-fef16cdbc7fe