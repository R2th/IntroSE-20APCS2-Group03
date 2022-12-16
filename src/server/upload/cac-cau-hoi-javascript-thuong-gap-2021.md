Javascript là ngôn ngữ cực kỳ phổ biến. Javascript kết hợp với HTML, CSS là bộ 3 huyền thoại trong lập trình web.
Ngôn ngữ lập trình Javascript cực kỳ linh động và cũng chính vì tính linh động của Javascript mà khiến chúng ta rất dễ gặp khó khăn khi phỏng vấn.

Dưới đây là các câu hỏi phỏng vấn về Javascript thường gặp nhất :
## Khác nhau giữa Null và Undefined

* Undefined có nghĩa là không xác định. Trong javascript, khi bạn khai báo một biến nhưng chưa gán giá trị cho nó, giá trị của biến đó sẽ là undefined.
* Null là một loại object, tương tự như các loại object khác như 'string', 'number',...
```js
typeof undefined           // undefined
typeof null                // object
```
Có thể thấy undefind có kiểu giá trị là undefined nhưng null lại là 1 object (bạn có thể coi đó là một lỗi nhỏ trong JavaScript khi để kiểu của null là đối tượng, đáng ra kiểu của nó nên là null).
```js
null === undefined         // false
null == undefined          // true
```

##  "This" trong javascript được dùng để làm gì?
Từ khóa "this" trong javascript tham chiếu đến đối tượng mà nó thuộc về. "This" có các giá trị khác nhau phụ thuộc vào nơi nó được sử dụng.
* Trong 1 method, "this" tham chiếu đến đối tượng chủ, ví dụ:
```js
var company = {
    name: "PhongvanIT",
    showName: function() {
        alert(this.name);
    }
}

company.showName();
// Kết quả: "PhongvanIT"​
```
* Trong 1 function, "this" tham chiếu đến đối tượng toàn cục (global object, trong web là biến window)

```js
var name = "GlobalObject_PhongvanIT";

var showName = function(){
    alert(this.name);
}

var company = {
    name: "PhongvanIT",
    showName: function() {
        alert(this.name);
    }
}

company.showName();
// Kết quả: "PhongvanIT"​

showName(); // hoặc window.showName();
// Kết quả: "GlobalObject_PhongvanIT"​
```

## Sự khác biệt giữa var và let là gì ?
Sự khác biệt là ở mức độ phạm vi. Var là phạm vi function(function-scoped) , nhưng let (và const) là phạm vi blocked (block-scoped). Để hiểu sự khác biệt, hãy xem ví dụ này:
```js
function doStuff() {
  // cả a và b sẽ có sẵn cho hàm này doStuff(), nhưng không có bên ngoài
  let a = 5;
  var b = 5;
  
  console.log(a + b); // 10
}

doStuff(); // 10;
console.log(a); // ReferenceError
console.log(b); // ReferenceError

function doMoreStuff() {
  if (2 + 2 === 4) {
    //  Ở đây, a sẽ có sẵn cho toàn bộ hàm
    var a = 5;
    // Nhưng b sẽ chỉ khả dụng trong khối này
    let b = 5;
  }
  console.log(a); // 5
  console.log(b); // ReferenceError
}

doMoreStuff();
// 5
// ReferenceError

for (let i = 0; i < 5; i++) {
  // i sẽ tăng lên sau mỗi lẫn lặp
  // và setTimeout sẽ nhận dc i mới mỗi lần lặp
  setTimeout(() => console.log(i), 100);
}
/*
0
1
2
3
4
*/

for (var j = 0; j < 5; j++) {
  // j nằm ở phạm vi function 
  // do đó nó ko thay đổi sau mỗi lần lặp  và  setTimeout trả ra kết quả giống nhau sau mỗi lần lặp
  setTimeout(() => console.log(j), 100);
}
/*
5
5
5
5
5
*/
```

## Sự khác biệt giữa == và === là gì ?
"==" so sánh giá trị.

"===" so sánh giá trị và kiểu dữ liệu.

Ví dụ :
```js
1 == '1'; // true
1 == [1]; // true
1 == true; // true
0 == ''; // true
0 == '0'; // true
0 == false; // true
```
Lời khuyên của tôi là không bao giờ sử dụng toán tử ==, ngoại trừ để thuận tiện khi so sánh với null hoặc undefined, trong đó a == null sẽ trả về true nếu a là null hoặc undefined.
```js
var a = null;
console.log(a == null); // true
console.log(a == undefined); // true
```

## Closure trong javascript là gì ? Cho ví dụ.
Trong javascript, closure là một hàm tham chiếu các biến có phạm vi ngoài phạm vi của hàm đó.

Nó cho phép bạn truy cập các biến hoặc tham số có phạm vị ngoài phạm vị hàm đó.

Để sử dụng closure, đơn giản là bạn khai báo một function bên trong một function khác và return nó ra.

Ví dụ  1:
```js
function phongVanIT() {
    let name = 'PhongvanIT';

    function callName() {
        console.log(name);
    }

    return callName;
}
var callFunc = phongVanIT();
callFunc();
// Kết quả: "PhongvanIT"
```
Ví dụ 2:
```js
function phongVanIT(name) {
   return function(action){
        return action + ' ' + name;
   }
}
var hello = phongVanIT('PhongvanIT.com');
var love = phongVanIT('PhongvanIT.com');

console.log(hello('Hello')); // Kết quả: "Hello PhongvanIT.com"
console.log(love('Love')); // Kết quả: "Love PhongvanIT.com"
```

## Các kiểu dữ liệu nguyên thuỷ trong JS là gì?
Kiểu dữ liệu nguyên thuỷ trong JS là dữ liệu không phải là một đối tượng và không có phương thức. Dưới đây là danh sách các kiểu dữ liệu nguyên thuỷ trong JS:

Kiểu nguyên thủy:

- Có 7 kiểu nguyên thủy
  - Boolean
  - Null
  - Undefined
  - Number
  - BigInt
  - String
  - Symbol
  
##  Kết luận
Cảm ơn bạn đã đọc, tôi chúc bạn may mắn nhất trong cuộc phỏng vấn của mình!

link tham khảo:  https://javascript.info/