JavaScript thường được biết đến là một ngôn ngữ lập trình để bắt đầu và rất khó để master nó. Bởi vì nó là một ngôn ngữ lập trình có từ khá lâu và linh động. Nó có khá nhiều những syntax "ảo diệu" và đôi khi là những tính năng không mấy ai biết đến. Tôi (tác giả) đã làm việc với JavaScript trong nhiều năm và hiện tại thì tôi vẫn thi thoảng gặp phải những syntax hoặc trick mà tôi không nghĩ là chúng tồn tại :sweat_smile: 

![](https://cdn-images-1.medium.com/max/1600/0*wFHr5dO3zz74HyUU.jpg)

Tôi đã cố gắng liệt kê những tính năng ít biết đến của JavaScript. Tuy nhiên một số tính năng này có thể là không phù hợp với strict mode. Chú ý rằng là tôi không khuyến khích các bạn dùng tất cả những tính năng này :smile: Dù chúng có thực sự là tốt thật nhưng bạn cũng có thể bắt gặp ánh nhìn khó hiểu từ teammate của bạn đấy.

### Void Operator
Bạn chắc hẳn đã từng thấy hoặc dùng cú pháp: `javascript:void(0);` để vô hiệu hóa link sử dụng trong việc xử lý với ajax. `void` operator sẽ thực hiện một câu lệnh hay một biểu thức và trả về `undefined`.
``` Javascript
// void operator
void 0                  // returns undefined
void (0)                // returns undefined
void 'abc'              // returns undefined
void {}                 // returns undefined
void (1 === 1)          // returns undefined
void (1 !== 1)          // returns undefined
void anyfunction()      // returns undefined
```
Vậy tại sao không return undefined luôn ?

Sự thật là trước khi ES5 xuất hiện thì bạn có thể gán một giá trị khác cho original undefined (eg: undefined = "abc"). Vì vậy lúc đó sử dụng `void` là một cách để chắc chắn rằng bạn luôn trả về giá trị original `undefined`.
### Constructor Brackets are optional
Đúng vậy, dấu ngoặc đơn `()` phía sau tên class khi chúng ta gọi constructor hoàn toàn là optional (Với điều kiện là contructor của bạn không nhận vào bất kỳ argument nào)

2 cách viết dưới đây đều là đúng và đều trả về cùng một kết quả:

``` Javascript
// Constructor with brackets
const date = new Date()
const month = new Date().getMonth()
const instance = new SomeClass()

// Constructor without brackets
const date = new Date
const month = (new Date).getMonth()
const instance = new SomeClass
```
### IIFE Brackets can be skipped
Cú pháp IIFE (Immediately Invoked Functional Expression) chúng ta có thể bỏ được dấu ngoặc đơn
Điều gì sảy ra nếu tất cả chúng đều còn ngoặc đơn ?

JavaScript parser cần những dấu ngoặc đơn đó để biết được những đoạn code trong đó là một Functional Expression chứ không phải là một Function. Hiểu được điều đó nên chúng ta có thể dùng nhiều cách để bỏ những dấu ngoặc đơn đó mà vẫn là cú pháp IIFE đúng.
``` Javascript
// IIFE
(function () {
  console.log('Normal IIFE called')
})()
// Normal IIFE called

void function () {
  console.log('Cool IIFE called')
}()
// Cool IIFE called
```

`void` operator thông báo với parser rằng những đoạn code đó là functional expression. Do vậy chúng ta có thể bỏ ngoặc đơn  khi khai báo function. Chúng ta cũng có thể dùng bất kỳ unary operators khác như `void, +, !, -, etc.`

Tuy nhiên bạn có thể sẽ tự hỏi rằng liệu những unary operator này có ảnh hưởng tới kết quả trả về từ IIFE không ?

Câu trả lời là có. Nhưng có một tin tốt đó là nếu bạn quan tâm tới kết quả trả về thì hãy lưu nó vào một biến nào đó
``` Javascript
// IIFE with a return

result = (function () {
  // ... some code
  return 'Victor Sully'
})()
// result: 'Victor Sully'

result = function () {
  // ... some code
  return 'Nathan Drake'
}()
// result: 'Nathan Drake'
```
Để hiểu hơn về IIFE bạn có thể tham khảo [bài viết](https://medium.com/@vvkchandra/essential-javascript-mastering-immediately-invoked-function-expressions-67791338ddc6)
### With Statement
Bạn đã bao giờ nghe đến `with` block statement chưa ? nó là một từ khóa trong Javascript. Nó thêm tất cả các thuộc tính của obect thành một scope chain như sau:
``` Javascript
// with block example
const person = {
  firstname: 'Nathan',
  lastname: 'Drake',
  age: 29
}

with (person) {
  console.log(`${firstname} ${lastname} is ${age} years old`)
}
// Nathan Drake is 29 years old
```
Bạn có thấy nó giống với Object destructuring không ? Thực sự thì không hẳn vậy và người ta không khuyến khích dùng `with` block vì một số vấn đề về performance và security nên nó bị cấm trong strict mode.
### The Function constructor
Bạn có thể khai báo một function thông qua sử dụng `Function()` constructor với từ khóa `new`
``` Javascript
const multiply = new Function('x', 'y', 'return x * y;');
multiply(2, 3) // 6
```
Stringified argument cuối cùng chính là đoạn code logic.
### Tagged Template Literals
[Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) chính là một trong những bổ sung thú vị mà ES6 đem đến. Tuy nhiên chắc hẳn bạn sẽ thấy hơi lạ khi nghe `Tagged` template literals đúng không ?
``` Javascript
//Normal template literal
`Hello ${username}!`

//Tagged template literal
myTag`Hello ${username}!`
```
**Tagged Template literals** cho phép bạn kiểm soát được việc parsing template thành string thông qua việc thêm một custom tag. **Tag** đơn giản là một parser function nhận vào một string array và cá giá trị đó sẽ được chuyển bởi string template. Tag function sẽ trả về kết quả cuối cùng.

Ví dụ sau đây chúng ta sẽ custom tag có tên là highlight, và chúng ta sẽ bọc giá trị cần highlight với tag <mark> vào để highlight
``` Javascript
// Defining a Tag for template literals
function highlight(strings, ...values) {
  // here i is the iterator for the strings array
  let result = ''
  strings.forEach((str, i) => {
    result += str
    if (values[i]) {
      result += `<mark>${values[i]}</mark>`
    }
  })
  return result
}
    
const author = 'Henry Avery'
const statement = `I am a man of fortune & I must seek my fortune`
const quote = highlight`${author} once said, ${statement}`

// <mark>Henry Avery</mark> once said, <mark>I am a man of fortune
// & I must seek my fortune</mark>
```
Có khá nhiều thư viện đã dùng tính năng này như:
* [styled-components](https://github.com/styled-components/styled-components) for React
* [es2015-i18n-tag](https://github.com/skolmer/es2015-i18n-tag)
* [chalk]
### Comma operator (,)
Đơn thuần là một toán tử cho phép chúng ta viết nhiều expression được chia cách nhau bởi dấu phẩy `,` và trả về kết quả của expression cuối cùng.
``` Javascript
// syntax
let result = expression1, expression2,... expressionN
```
tất cả các expression sẽ được tính toán và biến `result` sẽ được gán cho giá trị trả về của `expressionN`

Bạn chắc hẳn đã sử dụng nó trong vòng lặp `for` như vậy:
``` Javascript
for (var a = 0, b = 10; a <= 10; a++, b--)
```
Đôi khi nó cũng có ích gộp các statement thành 1 dòng:
``` Javascript
function getNextValue() {
    return counter++, console.log(counter), counter
}
```
hoặc viết short lambda function:
``` Javascript
const getSquare = x => (console.log (x), x * x)

getSquare(2)
// 4
```
### Plus Operator (+)
Đã bao giờ bạn tìm cách đơn giản để convert từ string thành số chưa?

Đơn giản chỉ cần dùng `+` phía trước string đó.

Nó có thể convert từ  các giá trị như `negative, octal, hexadecimal, exponential`. Hơn nữa nó còn có thể convert Date hoặc Moment.js object sang timestamp:
``` Javascript
// Plus operator
+'9.11'          // returns 9.11
+'-4'            // returns -4
+'0xFF'          // returns 255
+true            // returns 1
+'123e-5'        // returns 0.00123
+false           // returns 0
+null            // returns 0
+'Infinity'      // returns Infinity
+'1,234'         // returns NaN
+dateObject      // returns 1542975502981 (timestamp)
+momentObject    // returns 1542975502981 (timestamp)
```
### Bang Bang Operator (!!)
Là một trick dùng để convert bất kể expression nào đó thành giá trị boolean.
``` Javascript
// Bang Bang operator

!!null            // returns false
!!undefined       // returns false
!!false           // returns false
!!true            // returns true
!!""              // returns false
!!"string"        // returns true
!!0               // returns false
!!1               // returns true
!!{}              // returns true
!![]              // returns true
```
### Tilde Operator (~)
Mọi người thường không để ý đến toán tử này lắm nhưng nó thường được dùng để check xem item có tồn tại trong string hoặc 1 array không như sau:
``` Javascript
let username = "Nathan Drake"

if (~username.indexOf("Drake")) {
    console.log("Access denied");
} else {
    console.log("Access granted");
}
// Access denied
```
**Note:** ES6 và ES7 đã thêm method `.includes()` đối với String và Array. Nó clear hơn rất nhiều so với việc sử dụng trên.
### Labelled statements
Javascript cho phép chúng ta dùng `label` để đặt tên một vòng lặp và block. Chúng ta có thể dùng những label này để quay lại (giống như `goto`) trong khi sử dụng `break` hoặc `continue`.


Labelled statements thực sự hữu dụng khi dùng với nested loops. Nhưng chúng ta cũng có thể dùng chúng để chia thành từng block code cho dễ hiểu và dễ maintain.
``` Javascript
declarationBlock: {
  // can be used to group logical code blocks together
  var i, j
}


forLoop1: //The first for statement is labeled "forLoop1"
for (i = 0; i < 3; i++) {      
   forLoop2: //The second for statement is labeled "forLoop2"
   for (j = 0; j < 3; j++) {   
      if (i === 1 && j === 1) {
         continue forLoop1
      }
      console.log('i = ' + i + ', j = ' + j)
   }
}

loopBlock4: {
  console.log('I will print')
  break loopBlock4
  console.log('I will not print')
}
```
Happy coding !
### Reference
https://blog.usejournal.com/little-known-features-of-javascript-901665291387