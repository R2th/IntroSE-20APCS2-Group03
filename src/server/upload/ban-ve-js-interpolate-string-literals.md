Chúng ta đều biết về cách khai báo string với dấu " hoặc ', và nếu các bạn chưa biết thì tôi cũng nói luôn rằng đó không phải khai báo cho *smart string* (một số ngôn ngữ gọi là vậy), nơi mà content của nó có thể được parse bởi các biểu thức nội suy.

Từ ES6 ta có một kiểu string literal mới, sử dụng dấu \` (back-tick) để làm delimiter. String dạng này cho phép nhúng các biểu thức nội suy string cơ bản vào, mà sẽ được tự động parse và tính toán.

Đây là trước khi có ES6:
```
var name = "Kyle";
var greeting = "Hello " + name + "!";

console.log(greeting);            // "Hello Kyle!"
console.log(typeof greeting);     // "string"
```
Và đây là phong cách của ES6:
```
var name = "Kyle";
var greeting = `Hello ${name}!`;

console.log(greeting);         // "Hello Kyle!"
console.log(typeof greeting);  // "string"
```
Như bạn có thể thấy, ta sử dụng dấu \` hai đầu chuỗi ký tự được thông dịch thành string literal, còn các biểu thức bên trong `${..}` được parse và tính toán inline ngay tại chỗ. Cái thứ hay ho ở đây chính là interpolation (nội suy).

Kết quả của việc interpolate là một string thuần, và được gán vào biến `greeting`.

Một trong những lợi ích khác của interpolate string literal là cho phép chúng ta tách câu thành nhiều dòng:
```
var text = 
`Now is the time for all good men
to come to the aid of their
country!`;

console.log(text);
// Now is the time for all 
// to come to the aid of their
// country!
```
Những ký tự xuống dòng thêm vào sẽ được giữ nguyên trong giá trị của string như ta mong muốn.

# Interpolated Expression
Bên trong `${..}` cho phép chứa tất cả các biểu thức hợp lệ như function call, inline function expression call , và thậm chí là interpolated string literal khác.
> Như một lời cảnh bảo, bạn phải cẩn thận về khả năng đọc hiểu trong code của chính mình với các tính năng mới. Cũng giống như việc sử dụng default value và destructuring như đã nói ở bài trước, bạn có thể sử dụng không có nghĩa là bạn nên sử dụng. Đừng bao giờ đi quá đà với các trick mới từ ES6.

Xem xét:
```
function upper(s) {
    return s.toUpperCase();
}

var who = "reader";

var text =
`A very ${upper("warm")} welcome
to all of you ${upper(`${who}s`)}!`;

console.log(text);
// A very WARM welcome
// to all of you READERS!
```
Sẽ có những trường hợp mà nesting interpolated string literal trở nên có ích, nhưng nói chung thì hãy cẩn thận khi sử dụng.

# Tagged String Literals
Đây là một trong những trick khá hay ho trong ES6. Nó có vẻ hơi lạ nhưng nếu ta dành cho nó một chút thời gian thì sẽ có thể có điều bất ngờ đó.
```
function foo(strings, ...values) {
    console.log(strings);
    console.log(values);
}
var desc = "awesome";

foo`Everything is ${desc}!`;
// [ "Everything is ", "!" ]
// [ "awesome" ]
```
Hãy xem xem chuyện gì xảy ra với cái đoạn code trên. Đầu tiên, cái đoạn bối rối nhất thể hiện ngay đấy là 
```
foo`Everything is ${desc}!`;
```
Có lẽ bạn chưa bao giờ thấy một cú pháp như vậy từ trước đến giờ. Vậy nó là cái gì?

Về cơ bản thì đây là một kiểu gọi hàm mà không cần tới dấu ngoặc. Trong đó thì phần tag - hay phần `foo` nằm trước dấu \` - là function cần gọi. Cách làm này còn có thể thực hiện trên bất cứ biểu thức nào mà kết quả của nó là một function:
```
function bar() {
    return function foo(strings, ...values) {
        console.log(strings);
        console.log(values);
    }
}

var desc = "awesome";

bar()`Everything is ${desc}!`;
// [ "Everythings is ", "!" ]
// [ "awesome" ]
```
Ô kê vậy cuối cùng thì cái gì được truyền vào hàm `foo` khi ta gọi hàm theo cái kiểu này?

Argument đầu tiên, mà ta gọi là `strings`, là một mảng bao gồm tất cả các plain string (các phần string nằm bên ngoài interpolated expression). Ta có hai giá trị cho array `strings` bao gồm: "Everything is " và "!".

Để thuận tiện, ta gom hết tất cả các subsequent argument vào trong một array gọi là `values` sử dụng `...` operator, mặc dù tất nhiên là ta có thể để riêng chúng với các tên tham số riêng đằng sau `strings`.

Các argument được gom vào mảng `values` là kết quả đã tính toán từ biểu thức nội suy trong string literal, chứ ko phải là biểu thức. Vì thế dĩ nhiên là giá trị duy nhất trong `values` là "awesome".

Bạn có thể hình dung giá trị của `values` là các separator mà khi ta đặt vào giữa các giá trị của `strings`, ta sẽ có được một phiên bản đầy đủ của giá trị interpolated string ban đầu.

Một *tagged string literal* giống như một bước xử lý sau khi interpolation xảy ra và trước khi string cuối cùng được sinh ra, cho phép ta có nhiều khả năng xử lý hơn trong việc generate string.

 Thông thường, string literal tag function (giống cái hàm `foo` của chúng ta) sẽ tính toán giá trị string cuối cùng và trả về nó:
 ```
 function tag(strings, ...values) {
     return strings.reduce(function(s, v, idx) {
         return s + (idx > 0 ? values[idx - 1] : "") + v;
     }, "");
 }
 
 var desc = "awesome";
 var text = tag`Everything is ${desc}!`;
 console.log(text); // Everything is awesome!
 ```
 Trong đoạn trên, `tag(..)` chỉ là một passthru operation, nó không thêm thắt điều chỉnh gì mà chỉ đơn thuần ghép string.
 
 Vậy thực tế thì ta dùng như thế nào? Đó là một vấn đề nâng cao mà sẽ vượt quá phạm vi mà chúng ta thảo luận ở đây. Nhưng bạn có thể tham khảo một ví dụ đơn giản khi format một số theo đô la Mỹ:
 ```
 function dollabillsyall(strings, ...values) {
     return strings.reduce(function(s, v, idx) {
         if (idx > 0) {
             if (typeof values[idx - 1] == "number") {
                 // look, also using interpolated
                 // string literals!
                 s += `$${values[idx - 1].toFixed(2)}`;
             } else {
                 s += values[idx - 1];
             }
         }
         return s + v;
     }, "" );
 }
 
 var amt1 = 11.99,
          amt2 = amt1 * 1.08,
          name = "Kyle";
          
var text = dollabillsyall
`Thanks for your purchase, ${name}! Your
product cose was ${amt1}, which with tax
comes out to ${amt2}.`

console.log(text);
// Thanks for your purchase, Kyle! Your
// product cose was $11.99, which with tax
// comes out to $12.95
```
Nếu gặp một giá trị number trong mảng, ta thêm dấu "$" đằng trước nó và format đến hai chữ số thập phân với hàm `toFixed(2)`.

## Raw String
Trong đoạn code trước, hàm `tag` nhận argument đầu tiên là `strings`. Nhưng thêm vào đó còn có một chút dữ liệu bao gồm trong đó: bản raw chưa xử lý của tất cả string. Ta có thể truy cập các raw string này sử dụng .raw property, như sau:
```
function showraw(strings, ...values) {
    console.log(strings);
    console.log(strings.raw);
}

showraw`Hello\nWorld`;
// [ "Hello↵World" ]
// [ "Hello\nWorld" ]
```
ES6 cũng mang tới một built-in function mà có thể được sử dụng như một string literal tag: `String.raw(..)`. Ta truyền vào raw version của `strings`:
```
console.log(`Hello\nWorld`);
/* "Hello
World" */

console.log(String.raw`Hello\nWorld`);
// "Hello\nWorld"
```
Ngoài ra thì việc sử dụng string literal tag còn bao gồm một số xử lý đặc biệt cho internationalization, localization,...

# Kết
Trên đây là một số kiến thức hữu ích có thể bạn chưa biết với Interpolate String Literals của JavaScript. Hy vọng bài viết sẽ là nguồn tham khảo tốt cho các bạn.


-----
*Dịch và tham khảo từ cuốn You Don't Know JS - ES6 & Beyond của Kyle Simpson*