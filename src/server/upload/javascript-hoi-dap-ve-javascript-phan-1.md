Javascript, ngôn ngữ luôn nằm trong những hot languages trong các năm gần đây. Xuất hiện ở hầu hết các khía cạnh của lập trình như lập trình web, lập trình mobile application, VR, AR, 3D game, lập trình lệnh cho Drone, ... Cho tới bây giờ tôi vẫn không hiểu tại sao javascript lại có thể phổ biến đến vậy, và rốt cuộc điều gì hay ho ở javascript khiến nhà nhà đều học javascipt, người người đều là full stack, hay liệu có đứa nào giống mình không hiểu gì về javascript mà vẫn trở thành full stack developer hay không. Trong lúc học, tìm hiểu về javascript cùng mọi thứ liên quan đến nó, tôi đã vấp phải vô vàn những câu hỏi về javascript, nên tôi đã nảy ra ý định tập trung các câu hỏi đó vào một nơi, để sau này có quên thì còn có chỗ mà tham khảo. Trong bài post lần này tôi sẽ tập trung vào những những câu hỏi về javascript căn bản, đó là **variable**, **lexical scope**, **function**, **object**,  **DOM**, **prototype**, **closure**. Hi vọng sẽ giải đáp phần nào cho các bạn về javascript. (Kiến thức trong bài post được tôi tham khảo chú yếu từ cuốn sách **Head First Javascript** cùng series 6 cuốn **You don't know JS**. Hãy tìm đọc những cuốn sách này nếu có thể)

## Introduction
JavaScript được tạo ra bởi Brendan Eich vào năm 1995, là ngôn ngữ lập trình dành cho web. JS cùng với HTML, CSS đã trở thành bộ 3 không thể tách rời khi nhắc tới lập trình web. Javascript đã thổi hồn vào những trang static web, khiến chúng trở nên sống động hơn rất nhiều. Ngày càng có nhiều lập trình viên sử dụng js hơn, điều này làm gia tăng số người code javascript nhưng chẳng hiểu gì bản chất của nó, như tôi chẳng hạn. Ah lưu ý chút là trong phần 1 của series, tôi sẽ tập trung nhiều vào variable, types, coercion, DOM.

## Variable and types
**C1. Javascript có những variable types nào?**
=> Có 5 loại (nếu bạn nói là 4, hay 7, 8 thì tôi cũng không phản đối) : numeric, string, boolean (Primitive types), array, object.

```javascript
var num = 8; // numeric
var str = 'string ahihi; //string
var boo = true; // boolean
var obj = {
    name: 'James',
    age: 18
}; //object
var arr = [1, 3, 5, 6, 10]; //array
```

**C2. Hình như có gì đó sai sai. Thế còn undefined, NaN, null thì sao?**
=> Chúng là ... data value, thực sự mình đã không muốn nhắc tới chúng tí nào, đây chính là 1 trong những phần kinh hoàng trong javascript.

**undefined**: một variable sẽ có giá trị là `undefined` khi chúng chẳng có giá trị nào hoặc chưa được assign một giá trị nào. Ví dụ ta khai bao một biến `var a;` chẳng hạn, tại thời điểm này, `a` sẽ có giá trị là `undefined`, bởi nó chưa được assign 1 giá trị nào thuộc các variable types mà mình kể trên. Hoặc khi bạn truy cập một phần tử không tồn tại trong array, object. Vai trò cua `undefined` ở đây là một cách để kiểm tra xem variable đã có giá trị hay chưa.
```javascript
var a;
if (a === undefined) {
    console.log('a is undefined. Define it now!'); //a is undefined. Define it now!
}
var obj = {name: 'james', age: 18};
console.log(obj.sex); //undefined

var arr = [1, 3, 5];
console.log(arr[4]); //undefined
```
Và bạn biết gì không, type của `undefined` là ... `undefined`. Đã `undefined` rồi mà còn có type.

![](https://images.viblo.asia/1849c678-b838-4faa-b07e-854a65933bb0.jpeg)

**null**: có 3 trường hợp gây ra `undefined`, nhưng chỉ có 1 trường hợp gây ra `null` mà thôi. Đó là khi ta muốn trả về một object, nhưng hóa ra lại là không có gì.
ví dụ, tôi muốn get 1 element có id là `#what-ever` bằng `document.getElementById` , nhưng không có một element nào có id như vậy cả. Lúc ấy, kết quả trả về sẽ là `null`
```javascript
var whatEver = document.getElementById('what-ever');
console.log(whatEver); //null
```
Và bạn có tin được không, `typeof null` sẽ trả về kết quả `object`. oác, `null` là một object. Đúng vậy, bởi nó **mong muốn** là 1 object, nên type của nó là object, mặc dù vậy, `null` sẽ không có các property như một object thông thường, ví dụ như `hasOwnProperty`, hoặc `toString` function.

**NaN**: NaN là Not a Number. Đơn giản, và méo thể hiểu được.
```javascript
var a = 0/0;
console.log(a); // NaN
console.log(typeof a); // number
console.log(a == NaN); //false
console.log(isNaN(a)); // true
```
NaN được gán cho những variable là **SỐ** mà không phải **SỐ**. Nói cách khác, nó là số, nhưng không phải là số. `typeof NaN` sẽ trả về `number` -> nó là số. Nhưng `NaN == NaN` sẽ trả về false -> nó không phải số, nên không thể có chuyện nó bằng chính nó được. Có lẽ đây là giá trị duy nhất trong thế giới các ngôn ngữ lập trình mà nó không bằng chính nó.

**C3. Thế nào là global variable và local variable?**
Global variable là các variable được sử dụng bất cứ đâu trong code của bạn, miến là bạn đừng khai báo nó trong một function nào đó hoặc khai báo với từ khóa `global` hoặc khai báo biến mà không có từ khóa `var` thì nó sẽ là 1 global variable. Ngược lại, local variable là các variable được khai báo trọng một function và sẽ chỉ được sử dụng bên trong function đâý mà thôi.
```javascript
var globalVar = "This is global variable. You can use this one in any function.";

function foo() {
    var localVar = "This is local variable. You only can use this variable in funtion foo."
    console.log(globalVar); //This is global variable. You can use this one in any function.
    console.log(localVar); //This is local variable. You only can use this variable in funtion foo.
}
console.log(globalVar);  //This is global variable. You can use this one in any function.
console.log(localVar); // ReferenceError: localVar is not defined
```

## Coercion
**C4. Coercion là gì?**
=> Đây là cách thức chuyển đổi type của các giá trị trong javascript, một cách ngầm định, còn rõ ràng thì gọi là "type casting". Coercion chính là bí ẩn đằng sau những phép so sánh, phép toán không thể dị hơn của javascript. Ok, hãy bắt đầu với những phép so sánh dùng **equality operator**.

### Equality operator (`==`)
```javascript
console.log(69 == '69'); // true , vãi true, số bằng string
```
Sỡ dĩ điều này xảy ra là gì trước khi phép so sánh thực sự xảy ra, javascript sẽ thực hiện **coercion**. Nói cách khác, nếu 2 value có cùng type, thì chỉ việc so sánh, nhưng nếu chúng khác type, javascript sẽ **cố gắng** để convert chúng về cùng 1 type rồi mới so sánh.
Ở đây 69 và '69' đã được convert về cùng 1 type là number. 69 vẫn giữ nguyên, nhưng '69' sẽ được convert thành 69.
`69 == '69' => 69 == 69 => true`
coercion không tuần theo 1 logic nào cả, mà nó tuân theo các rules mà ta phải nhớ, áp dụng cho vô số các trường hợp (khi so sánh các value, type với nhau). Tôi sẽ liệt kê ra đây 1 số trường hợp mà các bạn hay gặp

#### Case 1: so sánh number và string
string sẽ được convert thành number, sau đó so sánh. Trường hợp này dẫn tới 2 trường hợp, 1 là string convert được thành number (ví dụ các string như `'10', '1252'`, ...), việc so sánh là bình thường. Trường hợp 2 là string không thể convert được thành số (ví dụ các string như `'abc'`, `'s1fe13324'`, ...) các gía trị này sẽ convert thành `NaN`, và như tôi đã nói ở trên, `NaN` không bằng giá trị nào cả, nên kết quả trả về luôn là `false`
#### Case 2: so sánh boolean với các type values khác
Đầu tiền boolean value (true => 1, false => 0)  thành number, rồi mới so sánh, ví dụ `"1" == true` sẽ được đổi thành `1 == 1` do true được convert thành number `1` và string "1" convert thành number `1`, dẫn tới result là `true`.
#### Case 3: so sánh null và undefined
`null == undefined // true` luôn luôn đúng. Còn tại sao đúng thì tôi chịu

### Strict equality operator (`===`)
Operator này sẽ chỉ compare 2 value, just it, không coercion, không convert type.

### Tough equality operator (`====`)
Đùa thôi, không có cái này =))

### Other operator (`+`, `-`, `*`, `/`)
Trường hợp mà ta hay gặp nhất với các operator này thao tác với `number`, `number` và `string`. Với toàn number thì không nói làm gì. Nhưng giữa `number` với `string`, thì ngoài trừ toán tử `+` sẽ tiến hành chuyển đổi `number` thành `string` rồi tiến hành phép nối string, các toán tử khác (`-`, `*`, `/`) đều sẽ convert string thành number và tiến hành phép toán như thông thường, trong trường hợp không convert được thì các bạn biết điều gì xảy ra rồi đấy (`NaN`)
```javascript
4 + "3"; // "43"
4 - "3"; // 1
"4" * "3"; //12
"4" / 3; //1.33333

4 + "a" ; "4a"
4 - "a"; // NaN
4 * "a"; // NaN
4 / "a"; //NaN
```

### Falsey value
Thực ra phần này không liên quan gì đến coercion, mà nó liên quan nhiều đến việc javascript là một loosely typed language. Thế nào là một loosely typed language thì bạn có thể google, nhưng đơn giản là chúng ta không nhất thiết phải gán type cho một variable khi nó khởi tạo, mà language sẽ tự động gán type cho nó khi bạn gán cho nó một giá trị (value). Và đôi khi chúng ta có thể dúng nó với vai trò một type khác. Ví dụ
```javascript
if ("james") {
    console.log('Ahihi'); // Ahihi
}
```
Đoạn code trên sẽ log ra `Ahihi`, nhưng vấn đề ở đây, `"james"` chẳng liên quan gì đến `condition` để lệnh `if` có thể xảy ra, nhưng nó vẫn xảy ra. Đó là bởi, trong javascript có những giá trị thuộc **falsey** và **truthy** value.
Các giá trị là **falsey** value là:
* `undefined`
* `null`
* `0`
* empty string `""`
* `NaN`
* 
Những value còn lại sẽ là **truthy** value, và được sử dụng trong một *conditional expression* như là `true`

```javascript
if ([]) {
    console.log("Yêu đi đừng sợ"); // Yêu đi đừng sợ
}

if ("") {
    console.log("Hội đức chúa trời");
}
```

## DOM
**C5. Vẫn câu hỏi quen thuộc, DOM là gì?**
=>  Document Object Model (DOM) là một application programming interface (API) cho HTML và XML document. Hiểu đơn giản thì nó giống như một cây cầu giao tiếp giữa HTML và javascript.
DOM được xây dựng dưới dạng một object tree như sau:

![](https://images.viblo.asia/79b17249-90ab-4329-b2a9-9da10c71dcec.gif)

Object tree này có root là `document`

**C6. Nhưng tại sao lại cần phải có DOM, sao javascript không làm việc trực tiếp với HTML?**
=> Cho 2 thằng không hiểu ngôn ngữ của nhau, làm việc trực tiếp với nhau là điều không thể. Ngoài ra, thì HTML chỉ là Markup, trong khi javascript là code, nó lại còn chẳng giống nhau tí nào nữa, nên cần phải có 1 thanh niên đại diện đứng ra hỗ trợ 2 thằng, đó là DOM. Ví dụ bạn có một thẻ `<div>Ahihi</div>` chẳng hạn, browser sẽ tạo một object cho element này, giúp javascript làm việc với nó.

**C7. Quá trình tương tác, làm việc giữa Javascript và DOM, HTML diễn ra như nào?**
=> Như sau:
1. Khi trình duyệt load trang (page) của bạn, nó làm 2 việc.
* Parse code html và render nó ra màn hình
* Tạo một tập các objjects đại diện cho những markup html, những object này được lưu vào DOM
2. Javascript tương tác với DOM để có quyền truy cập vào các elements và content của chúng 
3. Sau khi javascript modify DOM, trình duyệt cập nhật lại page, và hiển thị nó ra màn hình

**C8. Chuyện gì xảy ra nếu tôi dùng `document.getElementById` và truyền sai id (không tìm thấy)?**
`document.getElementById` sẽ trả về ... `null`. Nhớ nhé, là `null` chứ không phải `undefined`.

## Continue...
**C9. Đoạn code sau in ra gì:**
```
console.log(a);
var a = 100;
```
In ra gì và tại sao thì xin phép sẽ giải thích cho các bạn sau.
Cám ơn các bạn đã theo dõi tới phần này của bài post. Mọi thắc mắc hay tranh luận, xin hãy comment và vote để tôi được biết. Hẹn gặp lại các bạn ở phần tiếp theo.