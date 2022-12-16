Trong loạt bài về JavaScript này, chúng ta sẽ cùng nhau tìm hiểu các cú pháp, tính năng và các kỹ thuật mới trong JavaScript thông qua chuẩn ECMAScript2015 (hay còn gọi là ES6). Ở bài viết hôm nay, chúng ta sẽ tìm hiểu 3 vấn đề

**1. Declaring Variables:** Cách khai báo và sử dụng các loại biến trong ES6.

**2. Arrow Function:** Arrow Function là gì? Cách sử dụng chúng trong JavaScript.

**3. Transpiling ES6:** Vấn đề khi sử dụng ES6 với các trình duyệt.

Trước khi vào chi tiết, mình sẽ liệt kê các tool mà mình sử dụng trong loạt bài này
* Netbeans IDE version 8.2: https://netbeans.org/downloads/index.html
* Firefox Quantum version 59.0.1: https://www.mozilla.org/en-US/firefox/new/
## Declaring Variables
Trước phiên bản ES6, chỉ có một cách duy nhất để khai báo biến là từ khóa `var`. Hiện nay chúng ta có nhiều lựa chọn hơn để khai báo các biến.
### const
Một `const` là một loại biến mà không thể thay đổi giá trị sau khi khai báo. Giống như các ngôn ngữ khác, JavaScript đã cung cấp `const` trong ES6.
Trước khi chưa có `const`, chúng ta chỉ có `var`, và các biến đều có thể thay đổi được giá trị
```javascript
var isRunning = true;
isRunning = false;
console.log(isRunning); // false
```
Với `const`, chúng ta sẽ không thể thay đổi giá trị của chúng
```javascript
const isRunning = true;
isRunning = false;
```
Với đoạn lệnh trên , sau khi chạy chúng ta sẽ thấy lỗi trên browser

![](https://images.viblo.asia/072d05fa-9aaf-4c13-8156-1cdf2fc78f3e.png)

### let
`let` là từ khóa để khai báo một biến loại `lexical variable scoped`. Đây là loại biến chỉ tồn tại trong phạm vi block, được giới hạn bởi hai dấu ngoặc nhọn ({}). Để hiểu rõ hơn chúng ta sẽ xem xét ví dụ sau
```javascript
var topic = "JavaScript";
if (topic) {
      var topic = "ES6";
      console.log(topic); // ES6
}
console.log(topic); // ES6
```
Với từ khóa `var`, biến topic đã bị gán lại giá trị thành "ES6".

Với từ khóa `let` , chúng ta sẽ giới hạn phạm vi của biến trong block, điểu này sẽ giúp cho việc tránh sự thay đổi của các biến global.
```javascript
var topic = "JavaScript";
if (topic) {
       let topic = "ES6";
       console.log(topic); // ES6
 }
 console.log(topic); // JavaScript
```
Ở một ví dụ khác, chúng ta sẽ thử với vòng lặp `for`, đối với `var`
```javascript
for (var i = 0; i < 5; i++) {
            // do something
 }
 console.log(i); // 5
```
và đối với `let`
```javascript
for (let i = 0; i < 5; i++) {
            // do something
 }
 console.log(i); // lỗi : ReferenceError: i is not defined
```
### Template Strings
`Template strings` cung cấp cho chúng ta một cách khác để nối các chuỗi trong JavaScript. Nó cho phép chúng ta có thể chèn một biến vào chuỗi.

Thông thường chúng ta sẽ sử dụng toán tử `+` để nối chuỗi, ví dụ
```javascript
console.log(lastName + ", " + firstName + " " + middleName)
```
Với `Template strings`, chúng ta có thể tạo ra một chuỗi và chèn biến vào trong nó bởi syntax `${ }`, ví dụ
```javascript
console.log(`${lastName}, ${firstName} ${middleName}`)
```
`Template strings` hỗ trợ cả `khoảng trắng (whitespace)` tức là giữ nguyên các khoảng trắng khi chúng ta viết code, điều này giúp chúng ta dễ dàng soạn thảo một mẫu email, ví dụ về code hoặc bất cứ thứ gì liên quan đến `whitespace`. Ví dụ
```javascript
`Hello ${firstName},
Thanks for ordering ${qty} tickets to ${event}.
Order Details
${firstName} ${middleName} ${lastName}
${qty} x $${price} = $${qty*price} to ${event}
You can pick your tickets up at will call 30 minutes before
the show.
Thanks,
${ticketAgent}`
```
Trước đây khi chúng ta muốn viết các thẻ html trong JavaScript thì không dễ, vì chúng ta cần viết chúng trên một dòng. Với `Template strings`, điều này đã trở nên dễ dàng hơn và giúp người đọc cũng dễ hiểu code hơn.
```javascript
document.body.innerHTML = `
<section>
    <header>
        <h1>The HTML5 Blog</h1>
    </header>
    <article>
        <h2>${article.title}</h2>
        ${article.body}
    </article>
    <footer>
        <p>copyright ${new Date().getYear()} | The HTML5 Blog</p>
    </footer>
</section>
`
```
### Default Parameters
Một số ngôn ngữ như C++ hay Python cho phép chúng ta tạo function với giá trị mặc định của tham số (Default Parameters). `Default Parameters` đã được giới thiệu trong `ES6`, do đó khi giá trị tham số không được truyền vào function thì giá trị mặc định sẽ được sử dụng. Ví dụ chúng ta sẽ khởi tạo một gía trị mặc định dạng chuỗi như sau
```javascript
function logActivity(name="Shane McConkey", activity="skiing") {
    console.log( `${name} loves ${activity}` )
}
```
Nếu tham số không được cung cấp cho `logActivity` function, các giá trị mặc định sẽ được gọi
```javascript
logActivity() // Shane McConkey skiing
```
Chú ý giá trị mặc định được sử dụng với bất kỳ loại tham số nào
```javascript
let defaultPerson = {
    name: {
        first: "Shane",
        last: "McConkey"
    },
    favActivity: "skiing"
}
function logActivity(p=defaultPerson) {
    console.log(`${p.name.first} loves ${p.favActivity}`)
}
```
## Arrow Functions
`Arrow Functions` là một tính năng hữu dụng mới trong `ES6`. Với `arrow functions`, chúng ta có thể tạo `functions` mà không cần từ khóa `function`. Ngoài ra chúng ta cũng thường xuyên không cần đến từ khóa `return`. Chúng ta sẽ xem xét một ví dụ sau
```javascript
// sử dụng từ khóa function
let action = function (name) {
    return `${name} is interesting `
}
console.log(action("Game")) // Game is interesting
```
Với `Arrow functions`, cú pháp của chúng ta sẽ nhìn gọn gàng hơn
```javascript
// sử dụng arrow functions
let action = name => `${name} is interesting` 
```
Như ví dụ trên, chúng ta sẽ có một function được thể hiện trên một dòng và từ khóa `function` đã được loại bỏ. Chúng ta đã loại bỏ từ khóa `return` vì trong `action` function chỉ có duy nhất một dòng lệnh `return`. Nếu function của chúng ta chỉ có một tham số (không phải tham số có giá trị mặc định) thì không cần sử dụng dấu `()`, nếu có nhiều hơn một tham số thì chúng ta cần khai báo các tham số trong `()`. Ví dụ
```javascript
// Old
let lordify = function(firstName, land) {
    return `${firstName} of ${land}`
}
// New
let lordify = (firstName, land) => `${firstName} of ${land}`
console.log( lordify("Dale", "Maryland") ) // Dale of Maryland
console.log( lordify("Daryle", "Culpeper") ) // Daryle of Culpeper
```
Chú ý rằng chúng ta sẽ chỉ sử dụng oneline-function nếu function của chúng ta có một dòng lệnh. Nếu function của chúng ta có nhiều dòng lệnh thì chúng ta cần đưa các dòng lệnh vào trong `{}`, Ví dụ
```javascript
// Old
let lordify = function(firstName, land) {
    if (!firstName) {
        throw new Error('A firstName is required to lordify')
    }
    if (!land) {
        throw new Error('A lord must have a land')
    }
    return `${firstName} of ${land}`
}
// New
let _lordify = (firstName, land) => {
    if (!firstName) {
        throw new Error('A firstName is required to lordify')
    }
    if (!land) {
        throw new Error('A lord must have a land')
    }
    return `${firstName} of ${land}`
}
console.log( lordify("Kelly", "Sonoma") ) // Kelly of Sonoma
console.log( lordify("Dave") ) // Error: A lord must have a land
```
Một điểm cần lưu ý khi sử dụng `Arrow Functions` là `Arrow Functions` không giới hạn phạm vi của `this`. Để làm rõ điều này, chúng ta sẽ xem xét một ví dụ sau
```javascript
let person = {
    name: ["Tuan", "Nguyen"],
    show: function(delay = 1000) {
        setTimeout(function(){
            console.log(this.name.join(" "))
        }, delay)
    }
}
person.show() // TypeError: this.name.join is not a function
```
Xảy ra lỗi ở đây là vì `this` ở đây sẽ trỏ đến đối tượng gọi function `setTimeout` , ở đây là đối tượng `window` mà trong `window` ko bao gồm một biến tên là `name` nên sẽ có lỗi. Chúng ta sẽ thử đưa dòng lệnh ` console.log(this.name.join(" "))` ra ngoài và bỏ hàm `setTimeout`
```javascript
let person = {
    name: ["Tuan", "Nguyen"],
    show: function(delay = 1000) {
        console.log(this.name.join(" "))
    }
}
person.show() // Tuan Nguyen
```
Lúc này `this` sẽ là đối tượng person, do đó đoạn code trên sẽ trả về kết quả `"Tuan Nguyen"`.
Nếu chúng ta vẫn muốn sử dụng `setTimeout` ở đây thì cần sử dụng `Arrow Functions`
```javascript
let person = {
    name: ["Tuan", "Nguyen"],
    show: function(delay = 1000) {
        setTimeout(() => {
            console.log(this.name.join(" "))
        }, delay)
    }
}
person.show() // Tuan Nguyen
```
`this` sẽ được trỏ đến `person` chứ ko phải `window` như lúc đầu bởi vì `arrow fuctions` không giới hạn lại phạm vi của `this`.
Một câu hỏi đặt ra là nếu chúng ta sử dụng `arrow functions` cho `show` thì điều gì sẽ xảy ra. Rất đơn giản, `this` lúc này sẽ lại trỏ đến đối tượng `window`, chúng ta sẽ cùng thử xem
```javascript
let person = {
    name: ["Tuan", "Nguyen"],
    show: (delay = 1000) =>  {
        setTimeout(() => {
            console.log(this === window)
        }, delay)
    }
}
person.show() // true
```
## Transpiling ES6
Không phải mọi trình duyệt đều hỗ trợ ES6, do đó chúng ta cần convert ES6 về ES5 (phiên bản được hỗ trợ trên rất nhiều trình duyệt phổ biến hiện nay). Quá trình này được gọi là `transpiling`. Một công cụ để `transpiling` được sử dụng nhiều là `Babel`. `Transpiling` không phải là `Compiling`, code của chúng ta sẽ không được compile thành binary, `transpiling` sẽ chuyển đổi mã nguồn của chúng ta thành mã nguồn mà được nhiều trình duyệt hỗ trợ. Chúng ta sẽ xem ví dụ sau
```javascript
// ES6
const add = (x = 5, y = 10) => console.log(x + y) 
```
`transpiling` thành
```javascript
"use strict";

var add = function add() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  return console.log(x + y);
};
```
Các bạn có thể check trên http://babeljs.io/repl/.
Như vậy với cú pháp trên, các trình duyệt sẽ dễ dàng hoạt động đúng theo mã nguồn của chúng ta.
Chúng ta có thể sử dụng `Babel` theo hai cách
1. Inline
```javascript
<div id="output"></div>
<!-- Load Babel -->
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
<!-- Your custom script here -->
<script type="text/babel">
const getMessage = () => "Hello World";
document.getElementById('output').innerHTML = getMessage();
</script>
```
2. File
Chúng ta có thể download file `babel.min.js` từ `https://unpkg.com/babel-standalone@6.26.0/babel.min.js` sau đó nhúng vào project của chúng ta. 

Mọi `script` với type là `text/babel` đều sẽ được convert. 
Chi tiết sử dụng Babel các bạn có thể tham khảo tại http://babeljs.io/

Như vậy trong bài viết này, chúng ta đã cùng tìm hiểu về ba vấn đề chính `Declaring Variables` , `Arrow Functions` và `Transpiling ES6`. Nếu có gì sai sót, các bạn hãy để lại bình luận phía dưới để bài viết được hoàn thiện hơn. Hẹn gặp lại các bạn ở bài viết lần sau.
#### Tài liệu tham khảo: http://shop.oreilly.com/product/0636920049579.do
#### Cảm ơn các bạn đã đọc bài viết. Happy coding!!!