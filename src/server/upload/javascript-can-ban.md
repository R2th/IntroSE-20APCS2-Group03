## JavaScript series

Chương đầu tiên này sẽ trình bày về những khái niệm căn bản nhất trong JavaScript.

Bài viết này là một phần của series [JavaScript dành cho người không mới](https://viblo.asia/s/javascript-danh-cho-nguoi-khong-moi-yEZkg8LgZQ0), giúp các bạn đã có kinh nghiệm code trong các ngôn ngữ khác nhanh chóng làm quen với JS.

Nếu được rất mong nhận được sự ủng hộ và đóng góp ý kiến của mọi người để hoàn thiện series.

## A. JS introduction

### 1. Introduction

JavaScript (JS) là một ngôn ngữ lập trình client side, được dùng trong trang web bên cạnh HTML và CSS. HTML dùng tạo bộ xương cho trang web, CSS trang trí và tạo layout cho trang web lung linh hơn, thì JS lập trình để có những hành vi, tương tác với người dùng.

Hiện nay, JS không chỉ có thể viết client side mà còn mở rộng ra nhiều lĩnh vực khác, có thể kể tới như viết app với Electron hoặc web service với Node.js. Các thư viện, framework cho JS phát triển rất mạnh, như jquery, React, Angular, Vue,...

Lưu ý, JS không phải Java.

Trong series này chỉ nói tới JS ở khía cạnh cơ bản nhất, là tạo tương tác cho trang web. JS được chạy trong trình duyệt và hầu hết trình duyệt hiện nay đều support tốt JS.

**JS là ngôn ngữ có phân biệt hoa thường.**

### 2. Đặt code ở đâu?

**Script tag trong HTML**

Code JS có thể được đặt trong một tag script, và HTML document có thể chứa nhiều script như vậy.

```index.html
<script>
    ...
</script>
```

Các đoạn code JS trong cùng document có thể được gọi, sử dụng lẫn nhau.

**External JS**

Code JS cũng có thể chứa trong một file riêng, và được liên kết vào HTML cũng bằng thẻ script.

```index.html
<script src="script.js"></script>
```

Tag script lúc này không có nội dung, và chỉ có thuộc tính src trỏ tới URL chứa tệp script.js.

```script.js
// JS code
```

Nên sử dụng external JS, vì phân chia code tốt hơn và tăng tốc độ load trang web vì tệp external có thể được cache.

**HTML event**

Các thuộc tính event của các HTML tag cũng có thể chứa script. Và code được gọi khi event xảy ra (fire - được bắn ra).

```index.html
<button type="button" onclick="...">Click me</button>
```
 Code JS trong event dạng này thường chỉ dùng để gọi các function đã định nghĩa trong các script khác (script tag hoặc external js), chứ không phù hợp cho các đoạn code quá dài.

 **Head or body?**

 Script có thể đặt trong cả head lẫn body. Trước đây người ta khuyến khích đặt ở cuối cùng của body, như sau để cải thiện tốc độ tải trang (vì hạn chế script làm delay việc hiển thị).

 ```index.html
 <html>
 <head></head>
 <body>
     ...
     // Script here
 </body>
 </html>
 ```

Tuy nhiên, nhờ có thêm thuộc tính defer của tag script nên ta không còn bận tâm vấn đề này nữa. Nhờ có defer, code JS sẽ chỉ thực thi khi trang web đã phân tích xong. Chú ý defer chỉ dành cho tệp JS external.

### 3. Output

Có nhiều cách để đưa kết quả ra màn hình để xem. Ví dụ như xem value của biến chẳng hạn. Giống như C++ dùng `cout`, Java dùng `System.out.print()` thì JS cũng có những cách riêng để hiển thị output ra bên ngoài.

**Console.log**

Đưa output ra console của chrome devtools. Cách này khá nhanh và cũng tiện, nó tương tự `cout` trong C++. Nhược điểm duy nhất là bạn phải nhấn F12 để mở console ra xem.

Mỗi lần gọi, console sẽ in ra theo từng dòng nên bạn không cần quan tâm vấn đề xuống dòng. Và nếu in liên tiếp nhiều giá trị, thì console tự động thêm space tách chúng ra. Bạn không cần làm thủ công.

```script.js
console.log(10 + 5);
```

Tùy vào loại dữ liệu, khi đưa ra console sẽ được hiển thị khác nhau. Và một điểm rất hay là những loại phức tạp như array, object sẽ được hiển thị trực quan, đầy đủ thông tin cần thiết. Ví dụ, thay vì dùng vòng lặp để in ra mảng như sau.

```script.js
let a = [1, 2, 3, 4];
for (let i = 0; i < a.length; i++)
    console.log(a[i]);
```

Thì chỉ cần

```script.js
console.log(a);
```

Console sẽ hiển thị đầy đủ dữ liệu, không chỉ có các phần tử mà còn gồm độ dài mảng. Đối với object thì là các key và value thuộc tính.

**Document.write**

Dùng để ghi một đoạn text, hoặc một đoạn HTML ra trang web.

```script.js
document.write("Hello<br>");
```

Nhược điểm là phải ghi đúng HTML format, nếu muốn xuống dòng phải thêm chuỗi `<br>`. Và chú ý quan trọng, không dùng method này khi trang web tải xong, vì nó sẽ xóa toàn bộ những gì đang có và write lại từ đầu.

**Write to HTML element**

Ngoài ra còn có thể đưa output ra một element nào đó. Ví dụ bạn có một thẻ p, và bạn đưa output ra thẻ này (làm nó hiển thị nội dung output), và bạn có thể đọc được nhờ sự thay đổi trên trang web.

```script.js
document.getElementById("test").innerHTML = 10 + 5;
```

Nhược điểm cách này là khá rườm rà, phải "select" các element, rồi thay đổi thuộc tính `innerHTML` của nó. Nó yêu cầu phải tạo thêm một element, với id hay cái gì đó để xác định, nên gây phức tạp cho chương trình.

**Window.alert()**

Ngoài ra có thể dùng method `alert()` để đưa ra một popup thông báo. Nhưng không được dùng nhiều khi mới học code.

```script.js
alert("Hello world");
```

Nhược điểm là không hiển thị nhiều dữ liệu được, và không hiển thị cùng lúc (vì bị chặn).

## B. JS basic

### 1. Statement

Statement  hiểu là một câu lệnh. Trong chương trình có nhiều lệnh, và cuối mỗi lệnh nên đặt dấu chấm phẩy để tách ra. Nếu không đặt cũng không sao, thường thì JS không bắt buộc, nhưng khi bạn viết nhiều lệnh trên cùng một dòng thì nên dùng chấm phẩy tách chúng ra. Ví dụ.

```script.js
console.log(a)
console.log(b)
```

Mặc dù không cần chấm phẩy, các lệnh trên vẫn hoạt động bình thường, vì nằm trên các dòng khác nhau. Nhưng code sau là sai.

```script.js
console.log(a) console.log(b)  // Sai
console.log(a); console.log(b);  // Ok
```

Quy tắc chúng là nên thêm chấm phấy cuối mỗi lệnh, để tránh rắc rối như sau.

```script.js
function ABC() {
    return
        10;  // Trả về là undefined, chứ không phải 10
}
```

JS sẽ hiểu code trên là như sau, dẫn tới việc sai kết quả.

```script.js
function ABC() {
    return;
    10;
}
```

### 2. Comment

Comment bị bỏ qua khi thực thi JS, và có thể dùng comment để giải thích code cho dễ hiểu hơn.

JS có 2 loại comment là single line comment và multi-line comment (block).

```script.js
// This is single line comment
/* This is
    block comment */
```

Comment dạng 1 comment từ vị trí dấu `//` cho tới hết dòng. Comment dạng 2 có thể trải rộng trên nhiều dòng, chỉ cần nằm trong cặp `/* */` sẽ được coi là comment.

Single line comment phổ biến hơn, trong khi block comment thường dùng trong documentation.

### 3. Variable, constant

Có hai từ khóa khai báo biến là let và var. Vì JS là ngôn ngữ weak type nên không cần chỉ định rõ kiểu của biến, mà được tự động xác định và thay đổi dựa theo value (giá trị) chứa bên trong.

```script.js
let x = 10;
var y = 1.2;
let z;  // z = undefined
```

Biến không khởi tạo giá trị sẽ có value là undefined.

Mặc dù cả let và var đều dùng khai báo biến được, nhưng nên dùng let hơn. Chi tiết sẽ được đề cập trong phần cuối chương này.

```script.js
let a = 10, b = 1.5, c = "John";
var name =
    "Mickey";
```

Biến có thể khai báo trên nhiều dòng, hoặc nhiều biến trên một dòng đều được.

```script.js
const pi = 3.14;
```

Đối với hằng số (constant) thì dùng từ khóa const như trên để khai báo.

### 4. Operators

Toán tử (operator) là những phép tính thực hiện trên các số (biến, hằng, giá trị,...) gọi là các toán hạng (operand). Kết hợp của toán tử và toán hạng tạo ra những biểu thức (expression) và trả về giá trị nào đó.

Tùy số lượng toán hạng tham gia, được chia thành 3 loại toán tử chính:

* Toán tử một ngôi (unary operator): chỉ có một toán hạng, gồm phép thuận `+x`, phép đối `-x` và phủ định `!x`.
* Toán tử hai ngôi (binary operator): có hai toán hạng, và hầu hết các phép tính số học đều là hai ngôi, như phép cộng `a + b`,...
* Toán tử ba ngôi (ternary operator): nhận 3 toán hạng, dựa vào toán hạng 1 mà lựa chọn trả về toán hạng 2 hoặc 3.

Ngoài ra còn có các toán tử khác, như gán (assignment), logic (logical), so sánh (comparison), thao tác bit (bitwise),...

**Arithmetic operators**

Các phép toán số học trong JS tương tự các ngôn ngữ khác, gồm:

* Toán tử một ngôi: `+x`, lấy số đối `-x`, tăng `++x, x++`, giảm `--x, x--`.
* Toán tử hai ngôi: cộng `a + b`, trừ `a - b`, nhân `a * b`, chia nguyên `a / b`, chia dư `a & b`.

Ngoài ra từ phiên bản ES6 trở đi có phép lũy thừa `a ** b` để tính số mũ.

**Assignment operators**

Toán tử gán `x = 5` tương tự các ngôn ngữ khác. Ngoài ra JS cũng hỗ trợ các phép gán rút gọn như `x += 5`, `x /= 5`,...

Đặc biệt, JS cho phép gán nhiều giá trị cùng lúc, ví dụ như `a = b = c = 5` thì cả 3 biến a, b, c đều mang giá trị 5.

**Comparison operators**

Gồm các phép so sánh bằng `x == 5`, khác `x != 10` lớn bé, lớn hơn hoặc bằng, bé hơn hoặc bằng như trong các ngôn ngữ khác.

Các toán tử comparison luôn trả về kết quả boolean.

Ngoài ra JS còn có hai phép so sánh mới là strict comparison `x === 10` và `x !== 10`. Điểm khác biệt ở chỗ strict comparison yêu cầu hai vế phải cùng kiểu dữ liệu thì mới so sánh, nếu khác kiểu thì kết quả là false. Trong khi đó loose comparison `x == 10` sẽ tự động convert kiểu phù hợp rồi mới so sánh.

**Logical operators**

Dùng cho các toán hạng boolean. Gồm and `a && b`, or `a || b` và not `!a`.

**Bitwise operators**

Dùng cho các phép thao tác bit, gồm hai dạng.

Dạng 1 dùng biến đổi bit, gồm 3 toán tử hai ngôi (and `x & y`, or `x | y`, xor `x ^ y`) và một toán tử một ngôi (not `!x`).

Chú ý các phép trên chỉ sử dụng một dấu, thay vì hai dấu như comparison.

Loại thứ 2 dùng dịch chuyển bit (bit shifting), gồm left shift (zero fill) `x << n`, signed right shift `x >> n` và zero fill right shift `x >>> n`.

Trong JS thì thao tác bit ít dùng.

**Type operators**

Gồm hai toán tử là typeof (lấy kiểu của dữ liệu) và instanceof (kiểm tra instance).

```script.js
typeof 5;  // return string
typeof(5);
a instanceof Array;  // return boolean
```

`typeof` có thể viết có hoặc không ngoặc () đều được. `typeof` trả về chuỗi, và `instanceof` trả về boolean.

**Operator precedence**

Thường thì độ ưu tiên các toán tử giống bên toán học, lập trình có những quy tắc khác phức tạp hơn nhưng vẫn giữ cơ bản như vậy.

Chúng ta không cần nhớ tất cả những thứ tự rườm rà đó, khi nào thấy rắc rối cứ dùng ngoặc () bao lại, vừa an toàn vừa dễ hiểu.

**Special operators**

JS có một toán tử khá lạ, gọi là comma operator (toán tử dấu phẩy). Cú pháp của nó như sau.

```script.js
let x = (10, 20, 30, 15);  // x = 15
```

Toán tử này gồm nhiều phần tử trong cặp (), cách nhau bởi dấu phẩy. Kết quả trả về là phần tử cuối cùng, như ví dụ trên là 15 :)

## C. Data types

### 1. Overview

Kiểu dữ liệu (data type) dùng định nghĩa loại dữ liệu mà biến (hoặc hằng) lưu trữ. JS là một ngôn ngữ weak type, nên kiểu dữ liệu không được chỉ định rõ ràng, kiểu được tự động xác định dựa trên giá trị (value) mà nó chứa.

Kiểu dữ liệu của một biến trong JS có thể thay đổi, điều này là không được phép trong các ngôn ngữ strong type.

```script.js
let x = 5;  // number
x = x * 1.5;  // number
x = x + " VND";  // string
```

Trong JS có một số kiểu như sau:

* Number: chứa số nguyên và thực
* Boolean: đúng sai
* String: chuỗi
* Object: đối tượng
* Null
* Undefined

ES6 bổ sung thêm kiểu Symbol nữa. Ngoài ra các kiểu như array, date thực chất cũng là object.

**Typeof operator**

Dùng toán tử typeof để xem kiểu của đối tượng. Kết quả trả về là một string.

**Undefined value**

Biến khi chưa được gán giá trị thì mang value là undefined, và typeof cũng là undefined.

**Empty value**

Các value rỗng như 0, chuỗi rỗng "", null vẫn giữ được kiểu dữ liệu của nó. Ví dụ như sau.

```c
typeof 0;  // number
typeof "";  // string
typeof null;  // object
```

**Function type**

Các hàm (function), phương thức (method) cũng là kiểu function, và được xem như các biến. Cả kiểu function và object thuộc loại kiểu phức (complex type).

```script.js
function ABC() {}
typeof ABC;  // function
```

### 2. Type casting

Chuyển đổi kiểu, hay còn gọi là ép kiểu (type casting) là chuyển từ một kiểu này sang kiểu khác. Trong JS, phần nhiều trường hợp sẽ được tự động chuyển (ngầm định - implicit casting), nhưng bạn cũng có thể tự tay ép kiểu theo cách thủ công, rõ ràng (explicit casting).

Cú pháp mặc định cho type casting như sau.

```script.js
Type(old_var);
```

Ví dụ.

```script.js
let x = Number("100");  // string > number
let s1 = String(10);  // number > string
let s2 = 10.toString();  // number > string
```

Về cơ bản là vậy, bên cạnh đó các kiểu cụ thể sẽ có những method chi tiết hơn để thực hiện chuyển đổi. Ví dụ như từ number sang string thì có những method như `toString()`, `toFixed()`, `toPrecision()` chuyển kiểu nhưng với chức năng khác nhau.

Một vài lưu ý:

* Khi xuất biến ra console, hoặc element,... thì JS tự động chuyển thành một string.
* Trong các biểu thức (expression) tính toán thì JS chuyển kiểu theo một số quy tắc nhất định.

Nói chung nên hạn chế type casting, và khi cần thiết nên tránh để JS tự động thực hiện. Hạn chế việc thao tác khác kiểu dữ liệu, vì JS có thể tự động ép kiểu và cho ra kết quả không như mong đợi.

## D. Basic commands

### 1. Conditional statements

**If else statement**

Lệnh if else trong JS khá giống với các ngôn ngữ khác nên mình không bàn nhiều ở đây.

```script.js
if (<condition>)
    ...;
if (<condition>)
    ...
else
    ...
```

`condition` là một biểu thức boolean, có được từ phép so sánh hoặc lấy trực tiếp từ biến, hàm. Nếu biểu thức đúng (true), lệnh đầu tiên sẽ được thực hiện, ngược lại thực hiện lệnh thứ 2 (nếu có).

Đặc biệt, câu lệnh trước `else` trong JS không cần chấm phẩy cũng được.

Các cặp if else có thể lồng nhau (nested) như sau, chú ý `else if` là hai từ riêng biệt.

```python
if (<condition1>) ...
else if (<condition2>) ...
else if (<condition3>) ...
...
else ...
```

Các statement nếu là lệnh đơn thì không cần ngoặc, nếu từ 2 lệnh trở lên cần có ngoặc {} bao lại.

**Ternary operator**

JS hỗ trợ toán tử ba ngôi (ternary operator) như sau.

```script.js
<condition> ? <true_value> : <false_value>;
```

Toán tử trả về kết quả là một trong hai value đã cho, dựa theo điều kiện `condition`. Nếu điều kiện đúng trả về `true_value`, ngược lại trả về `false_value`.

Toán tử ternary có thể viết liên tiếp nhau như sau.

```index.js
let x = 10;
console.log(x > 0 ? 'So duong' : x < 0 ? 'So am' : 'So khong');
```

Như code trên so sánh x với 0 và báo x là số dương, số âm hay là 0. Câu lệnh trên dùng hai ternary operator liên tiếp nhau vẫn được.

**Switch case**

Dùng so sánh một biểu thức với nhiều nhóm giá trị khác nhau, mỗi giá trị là một case. Nếu khớp với case nào, thì lệnh trong case sẽ được thực hiện. Còn không có case nào khớp thì default sẽ được gọi (nếu có, vì default có thể bỏ qua)

```script.js
switch (1 + 2) {
    case 1: case 2:
        ...
        break;
    case 3:
        ...
        break;
    default:
        ...
}
```

Sau mỗi case nên có break để ngắt, nếu không sẽ bị trôi case, tương tự các ngôn ngữ khác.

Chú ý, switch case sử dụng strict comparison (dấu ===) để so sánh, vì thế nên kiểu dữ liệu của case và expresssion phải giống nhau.

### 2. Loop statements

**While loop**

```script.js
while (<condition>) {
    ...
}
```

Lặp lại một công việc với số lần xác định. Nếu điều kiện `condition` đúng thì lặp lại lần nữa, nếu không thì thoát.

Điều kiện dừng cần phải khả thi, để tránh vòng lặp chạy vô hạn sẽ gây crash trình duyệt.

**Do while loop**

```css
do {
    ...
} while (<condition>);
```

Tương tự `while` loop, nhưng thực hiện ít nhất 1 lần, thực hiện xong lệnh mới kiểm tra điều kiện.

**For loop**

```script.js
for (<init>; <condition>; <increment>)
    ...
```

Tương tự trong ngôn ngữ khác, nên mình không bàn nhiều ở đây. Ngoài ra JS cho phép các statement bên trong có thể được bỏ qua (omitting).

**Other loop**

Hai vòng lặp for nữa trong JS là `for of` và `for in`. Ở đây mình ghi ra để làm quen với cú pháp, các bạn có thể bỏ qua, các chương sau sẽ có nhắc tới.

`For of` dùng để duyệt qua lần lượt các element (e) trong một iterable (mảng, chuỗi, map,...)

```script.js
let list = [1, 2, 3, 4];
for (e of list)
    console.log(e);
```

`For in` dùng lặp qua các thuộc tính của object.

```script.js
let obj = {
    name: "John",
    age: 20
}
for (p in obj)
    console.log(p + ": " + obj[p]);
```

**Break & continue**

Lệnh `break` dùng để ngắt một vòng lặp, còn `continue` để dừng lần lặp hiện tại và đi tiếp vòng lặp tiếp theo, tương tự các ngôn ngữ khác.

Ngoải ra `break` còn dùng cho label để break một label block.

## E. Advanced concepts

### 1. Scope

Scope được hiểu là phạm vi hoạt động của một đối tượng trong JS, đối tượng chỉ hoạt động trong scope của nó, nếu đi ra ngoài scope thì đối tượng sẽ bị xóa. Ví dụ như một biến được khai báo bên trong một function, thì scope của nó là function đó. Khi function thực hiện xong, thì các biến bên trong function sẽ bị xóa.

Scope phụ thuộc vào vị trí khai báo và từ khóa dùng khai báo, nhưng chung quy lại đến nay có 3 loại scope:

* Global scope: Có giá trị sử dụng trong toàn bộ chương trình
* Function scope: Có phạm vi trong một function
* Block scope (ES6): Phạm vi trong một khối (block), là phần code nằm trong cặp {}

Khai báo với var chỉ có hai loại scope là global scope và function scope. ES6 sử dụng let hoặc const, cho phép đối tượng có thể có block scope (tất nhiên let hoặc const vẫn có thể sở hữu global hoặc function scope).

Lưu ý object và function cũng là các biến, do đó chúng cũng có scope của riêng mình.

**Global scope**

Các đối tượng, biến, hằng, hàm, object,... được khai báo bên ngoài tất cả function, block thì có global scope. Lúc này chỉ khi đóng tab trình duyệt thì đối tượng global mới bị hủy.

```script.js
// Here is global
function ABC() {
    // Not here
}
{
    var x = 10;  // Global scope, vì var không bị chặn bởi {}
    let x = 10;  // Block scope, vì let bị {} chặn -> block scope
}
```

Chú ý, nếu gán một biến mà không có từ khóa khai báo (const, let, var) thì nó sẽ trở thành global variable (biến toàn cục) và mặc định có global scope, dù cho nó được khai báo ở đâu.

```script.js
function ABC() {
    x = 10;  // x is global
}
// Here x = 10
```

Trong strict mode, hành vi này bị cấm.

**Function scope**

Các đối tượng được khai báo bên trong hàm, và không thuộc block scope thì có function scope.

```script.js
function ABC() {
    var x = 10;  // Function scope
    let y = 5;  // Function scope
    for (let i = 0; i < 5; i++) {
        // i has block scope
        var a = 2;  // Function scope, vì var không bị {} chặn
        let b = 1;  
            // Block scope, vì let bị {} của for chặn
            // nên trở thành block scope
    }
}
```

Các tham số của hàm cũng được tính là function scope.

**Block scope**

Hai từ khóa được bổ sung trong ES6 là let và const cho phép một đối tượng khai báo có thể có block scope.

Block scope là phạm vi chỉ trong một block, là nằm trong khối {}. Trong một số trường hợp, như vòng lặp for ở ví dụ trên, thì biến `let i` cũng được tính vào trong block.

```rust
{
    let x = 10;  // Block scope
    var y = 10;  // Not block scope
}
```

Ta nói let và const trong một khối {}, sẽ bị chặn bởi khối đó và có block scope. Còn var không bị {} chặn, nên nó vẫn sẽ giữ được scope trước đó.

Hành vi của block scope là giống với những ngôn ngữ khác, do đó nó được khuyến khích sử dụng. Đó là lí do nên dùng const hay let thay cho var khi khai báo.

### 2. Hoisting

Trong code đôi khi bạn sẽ gặp trình trạng "sử dụng trước, khai báo sau" như sau.

```script.js
doSomeThing();
function doSomeThing() {
    x = 10;
    var x;
}
```

Được như vậy là nhờ có tính năng gọi là hoisting. Khi một đối tượng được hoisting, thì khai báo của nó được tự động mang lên đầu khối, trước các lệnh khác. Do đó mới có thể "sử dụng trước, khai báo sau".

**Những đối tượng được hoisting**

Một số đối tượng chính bản thân nó đã được hoisting, một số thì cần được khai báo với var mới được hoisting.

Function được tự động hoisting (như arrow function thì không).

Các đối tượng khai báo bằng var luôn được hoisting, trong khi khai báo với let hoặc const thì không.

**Initial value is not hoisted**

Khi sử dụng var để làm một biến được hoisting, thì chỉ có phần khai báo (declaration) được kéo lên trên, phần khởi tạo giá trị cho biến không được nâng lên theo. Do đó, khi sử dụng biến sẽ như chưa khởi tạo, tức là có giá trị undefined cho tới câu lệnh khai báo thực sự.

Ví dụ như sau.

```script.js
console.log(x);  // undefined
var x = 5;
console.log(x);  // 5
```

Trong lệnh 1, thì có thể dùng x mà không bị báo lỗi. Nhưng giá trị của x lúc này không phải 5 mà là undefined, do số 5 không được kéo lên theo. Chỉ khi chạy tiếp tới lệnh `var x = 5` thì x lúc này mới được gán số 5.

Đoạn code trên nên được viết lại như sau, sẽ giúp bạn dễ hiểu hơn.

```script.js
var x;  // Dòng này được thêm vào vì x được hoisting
console.log(x);  // undefined
x = 5;  // Đã khai báo rồi nên bây giờ chỉ gán thôi
console.log(x);  // 5
```

**Có nên dùng hoisting**

Nên hạn chế dùng hoisting, và luôn khai báo trước mọi đối tượng khi sử dụng. Lại thêm một lý do nữa không nên dùng var để khai báo. Nếu bạn không hiểu rõ về hoisting, nó có thể gây lỗi chương trình và có những hành vi không mong muốn (như không hoist được giá trị khởi tạo).

### 3. Strict mode

Strict mode là một chế độ cho phép bạn viết code nghiêm ngặt (strict) và an toàn hơn, nhờ vào việc thêm một số quy tắc mà bạn không được phép làm (vì sẽ làm giảm tính an toàn, bảo mật của code). Strict mode giúp code được thực hiện chặt chẽ hơn, hạn chế lỗi và khai báo không an toàn.

Mặc định thì strict mode bị tắt, nhưng chúng ta có thể dùng dòng sau để bật lên.

```script.js
"use strict";
```

Dòng lệnh trên khi đặt ở ngoài và trên cùng file js thì sẽ áp dụng strict mode cho toàn bộ script. Ngoài ra `"use strict";` còn có thể đặt trong một function, khi đó chỉ có function đó mới áp dụng strict mode.

Nhiều trình duyệt không hỗ trợ strict mode sẽ không hiểu được, nên không bật strict mode. Nhưng cũng không gây ra lỗi gì vì bản chất dòng lệnh trên chỉ là một chuỗi thông thường.

**Tại sao nên dùng strict mode**

Strict mode giúp bạn viết mã an toàn hơn. Trong chế độ bình thuòng, nếu bạn viết cú pháp không chuẩn thì đôi khi sẽ được bỏ qua, hoặc tự động xử lý. Việc xử lý tự động của JS đôi khi tạo ra một số hành vi không đúng với mong muốn, do đó gây ra lỗi và làm code kém an toàn.

Do đó, nên sử dụng strict mode để viết code được tốt hơn. Bên dưới là các quy tắc được strict mode quy định.

**Không cho phép with và delete**

Từ khóa with bị cấm vì lý do hiệu suất.

Delete bị cấm do việc xóa bỏ một đối tượng là không được phép, và có thể gây lỗi.

**Không cho phép sử dụng biến chưa khai báo**

Nếu sử dụng biến chưa được khai báo như sau.

```script.js
function ABC() {
    x = 5;
}
```

Thì biến đó bình thường sẽ trở thành global variable, nhưng trong strict mode bị cấm. Biến phải được khai báo rõ ràng, với var, let hoặc const.

**Không cho phép trùng tham số, tên thuộc tính**

Khi khai báo function, strict mode không cho phép có hai tham số trùng nhau.

```script.js
function ABC(a, a) {}  // Sai
```

Đối với các thuộc tính của object cũng vậy, không thể có hai thuộc tính trùng tên.

```script.js
let obj = {
    name: "John",
    name: "Doe"
}
```

**Không cho phép hệ octal với chữ số 0 ở đầu**

Việc khai báo sau là sai.

```script.js
let x = 017;  // Sai
```