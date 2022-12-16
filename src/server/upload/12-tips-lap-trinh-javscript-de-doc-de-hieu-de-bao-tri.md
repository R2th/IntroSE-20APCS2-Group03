## 1. Lập trình javascript nguyên tắc tiêu chuẩn
Không cần cao siêu, ngay từ đầu bạn hãy làm tốt nhất có thể mà bạn đang làm. Chính vì vậy ở bài viết này không cần nhấn mạnh rằng, bạn phải thế này thế nọ, nhưng không nên bỏ qua những tiêu chuẩn trong code của bạn bao gồm 3 yếu tố sau đây: 
- Tính nhất quán về dữ liệu và code. 
- Dễ đọc và dễ hiểu cho người khác. 
- Dễ bảo trì khi gặp sự cố.

## 2. Sử dụng `===` thay vì `==` khi so sánh
Điều này rất quan trọng vì JavaScript là ngôn ngữ nhiều kiểu nhất, vì vậy sử dụng == có thể mang lại cho bạn kết quả không mong muốn vì nó cho phép các type khác nhau. 

***Không nên***
```js
// BAD 
if (x == y) {
  // do something here
}
```
***Nên thế này***
```js
// GOOD 
if (x === y) {
  // do something here
}
```
----
Trong một so sánh sử dụng toán tử `==`, kết quả sẽ trả về `true` nếu hai điều được so sánh bằng nhau. 

*Nhưng có một nhược điểm quan trọng*: Nếu việc so sánh được thực hiện là giữa hai loại giá trị khác nhau, các loại giá trị, thì sự ép buộc kiểu sẽ xảy ra. Mỗi giá trị JavaScript thuộc về một type cụ thể. Các loại này là: **Numbers, strings, Booleans, functions**, và **objects**. Vì vậy, nếu thử so sánh một chuỗi với một số, trình duyệt sẽ cố gắng chuyển đổi chuỗi thành một số trước khi thực hiện so sánh. Tương tự, nếu bạn so sánh `true` hoặc `false` với một số, giá trị `true` hoặc `false` sẽ được chuyển đổi thành 1 hoặc 0, tương ứng.

Với sự trợ giúp của browser thì những ví dụ trên đã đi lệch hướng của chúng ta

Ví dụ để thấy dùng `==` thì khó có thể đoán trước điều gì đang chờ đợi chúng ta
```js
console.log(10 == "10"); // true
console.log(0 == false); // true

console.log(' \n\n\n' == 0); // true
console.log(' ' == 0); // true
```
Với sự trợ giúp của browser thì những ví dụ trên đã đi lệch hướng của chúng ta. Vì lẽ này nên javascript luôn khuyên chúng ta sử dụng toán tử `===` thay cho `==`.
Ta thử áp dụng lại sẽ thấy kết quả chính xác
```js
console.log(`0 === "`0"); // false
console.log(0 === false); // false
console.log(' \n\n\n' === 0); // false
console.log(' ' === 0); // false
```
Tương tự thì có kiểu so sánh `!=`, kiểu này thì cũng k khác gì là sử dụng `==`. Hãy thay bằng `!==` nha.

## 3. Không bao giờ sử dụng `var`, sử dụng `let` thay thế
Sử dụng `let` sẽ giúp tránh về vấn đề `scope` giống như `var` trong javascript. 

***Không nên***
```js
// BAD 
var myVar = 1;
```
***Nên***
```js
// GOOD 
let myVar = 1;
```
Vấn đề của `var` bị phát hiện rõ nhất trong Block Scope, ví dụ như
```js
for(var i = 0; i < 10; i++){
    console.log('inside block scope with Var >>', i)
}
console.log('outside block scope with Var >>', i);  // Điều gì xảy ra ở console này???
```
Kết qủa:

Ơ sao nó lại chạy tiếp khi ra khỏi scope (i = 10)?

 Để trả lời cho câu hỏi này bạn nên tìm hiểu về [Scope closures](https://anonystick.com/blog-developer/discuss-about-closures-in-javascript-2019051695927961.jsx) trước nhé.
 
 Đó là một bất lợi đầu tiên khi sử dụng var, nó sẽ làm thay đổi biến i dẫn đến kết quả sai lệch dù chúng ta rất cẩn thận trong việc lập trình, không ngoại trừ một ai

Bất lợi thứ 2 của việc khi sử dụng var đó chính là có thể redeclaring(khai báo lại)

VD:
```js
var number = 2;   // Khai báo đầu tiên
var number = 3;   // Khai báo lại lần nữa

console.log(number); // 3 
```
Ở vd này thì number = 3 chẳng có lỗi gì cả nhưng điều này lại dẫn đến hệ lụy hai người trong team oánh nhao chỉ vì tại sao tôi khai báo rồi mà ông còn khai báo nữa...

GIờ chúng ta chuyển sang dùng `let` để thấy sự khác biệt nha

```js
for(let i = 0; i < 10; i++){
    console.log('inside block scope with Var >>', i)
}
console.log('outside block scope with Var >>', i); // Bạn nghĩ điều gì xảy ra ở console này??
````
Kết quả: 

Ok, nó khác với var bằng việc sinh ra một lỗi để cho coder biết rằng, biến i đã kết thúc và hy sinh trong khi làm nhiệm vụ(block scope). Tiếp nữa nè :
```js
let number = 2;   // Khai báo lần đầu
let number = 3;   // Khai báo lại lần nữa
console.log(number); // Identifier 'number' has already been declared
```
Ta nhận được một câu 
```js
"Uncaught SyntaxError: Identifier 'number' has already been declared".
```

Hay quá, đỡ mất công uýnh lộn
## 4. Luôn sử dụng const nếu được

Điều này ngăn các coder cố gắng thay đổi những điều không nên làm và nó thực sự giúp cải thiện khả năng đọc. Và luôn nên viết hoa khi đặt tên. 

***Không nên***
```js
// BAD 
let VAT_PERCENT = 20;
```
***Nên***

```js
// GOOD 
const VAT_PERCENT = 20;
```

Ví dụ:
```js
const number = 1;   // Khai báo đầu tiên
number = 2;   // gán giá trị

console.log(number); // Uncaught TypeError: Assignment to constant variable.
```
Bởi vì nó là một hằng số nên nó không thay đổi, nhưng sẽ có trường hợp đặc biệt const sẽ thay đổi (mình sẽ update vào bài sau)
## 5. Luôn sử dụng dấu chấm phẩy `;`


Mặc dù có những trường hợp chúng ta không để `;` ở cuối câu lệnh không sai giống như ở các ngôn ngữ khác như Python. Nhưng tốt hơn hết để code nhìn có thân thuộc hơn thì chúng ta cũng nên sử dụng `;` ở cuối câu lệnh như một thói quen hữu ích. 


***Không nên***
```js
// BAD 
const VAT_PERCENT = 20;
let amount = 10
return addVat(amount, VAT_PERCENT)
```
***nên***

```js
// GOOD 
const VAT_PERCENT = 20;
let amount = 10;
return addVat(amount, VAT_PERCENT);
```
## 6. Sử dụng Template strings khi nối String

Khi sử dụng Template literals (Template strings) trông code có vẻ lịch sử hơn và để lại ấn tượng nhiều hơn. 

***Không nên***

```js
// BAD 
let fullName = firstName + " " + lastName;
```
***nên***

```js
// GOOD 
let fullName = `${firstName} ${lastName}`;
```
## 7. Sử dụng `function arrow` trong ES6 bất cứ khi nào có thể

function arrow là một cú pháp ngắn gọn hơn để viết biểu thức hàm. Nhưng cũng phải nên nhớ có những trường hợp không nên sử dụng arrow function nha. ([Khi nào sử dụng ES5 regular và ES6 arrow functions ](https://anonystick.com/blog-developer/su-khac-nhau-giua-regular-va-arrow-functions-trong-javascript-2020051368991849#t-3))

***Không nên***

```js
// BAD 
var multiply = function(a, b) {
  return a* b;
};
```
***nên***

```js
// GOOD 
const multiply = (a, b) => { return a * b};
```
## 8. Luôn sử dụng chế độ kiểm soát chặt chẽ nếu sử dụng if else


**Tránh được else được thì càng tốt trong check điều kiện**

***Không nên***

```js
// BAD 
if (valid)
   doSomething();
if (amount > 100) 
    doSomething();
else if(amount > 200)
    doSomethingElse();
```
***nên***

```js
// GOOD 
if (valid) {
   doSomething();
}
if (amount > 100) {
   doSomething();
} 
else if(amount > 200) {
    doSomethingElse();
}
```
## 9. Hãy chắc chắn rằng các dấu ngoặc bắt đầu trên cùng một dòng với khoảng trắng ở giữa


***Không nên***

```js
// BAD 
if (myNumber === 0)
{
    doSomething();
}
```
***nên***

```js
// GOOD 
if (myNumber === 0) {
    doSomething();
}
```
## 10. Cố gắng tránh lồng các điều kiện

`if` Trong `if` đó sẽ trở nên khó hiểu và khó đọc. Đôi khi bạn có thể không giải quyết được vấn đề, nhưng bạn có thể xem xét kỹ cấu trúc mã để xem liệu nó có thể được cải thiện hay không.


***Không nên***

```js
// BAD 
if (myNumber > 0) {
    if (myNumber > 100) {
        if (!hasDiscountAlready) {
            return addDiscountPercent(0);
        } else {
            return addDiscountPercent(10);
        }
    } else if (myNumber > 50) {
        if (hasDiscountAlready) {
            return addDiscountPercent(5);
        }
    } else {
        if (!hasDiscountAlready) {
            return addDiscountPercent(0);
        } else {
            return addDiscountPercent(1);
        }
    }
} else {
    error();
}
```
***nên***

```js
// GOOD 
if (myNumber <= 0) {
    return error;
}
if (!hasDiscountAlready) {
    return addDiscountPercent(0);
}
if (myNumber > 100) {
    return addDiscountPercent(10);
}
if (myNumber > 50) {
    return addDiscountPercent(5);
}
return addDiscountPercent(1);
```
## 11. Sử dụng tham số default bất cứ khi nào có thể
Trong JavaScript, nếu bạn không truyền tham số khi gọi hàm, giá trị của nó là `undefined`

***Không nên***

```js
// BAD 
myFunction(a, b) {
  return a + b;
}
```
***nên***

```js
// GOOD 
myFunction(a = 0, b = 0) { 
   return a + b;
}
```
## 12. Câu lệnh Switch nên sử dụng break và nên có default
Mình thường cố gắng không sử dụng switch câu lệnh, nhưng nếu muốn sử dụng nó thì hãy nhớ  trong mỗi điều kiện có `break` và có sử dụng `defalut` nha.

***Không nên***

```js
// BAD 
switch (myNumber)
{
  case 10: 
   addDiscountPercent(0);
  case 20: 
   addDiscountPercent(2);
  case 30:
   addDiscountPercent(3);
}
```
***nên***

```js
// GOOD 
switch (myNumber) {
    case 10:
        addDiscountPercent(0);
        break;
    case 20:
        addDiscountPercent(2);
        break;
    case 30:
        addDiscountPercent(3);
        break;
    default:
        addDiscountPercent(0);
        break;
}
```
## Kết luận

Các tiêu chuẩn trong lập trình của bất kỳ ngôn ngữ nào thực sự có thể giúp cải thiện khả năng đọc và khả năng bảo trì của ứng dụng. Nếu bạn làm việc trong một nhóm, một trong những điều khó khăn là thực thi các tiêu chuẩn code sao cho toàn bộ trong nhóm đều có thể hiểu được chúng ta đang làm gì. Và các bạn có thể tham khảo bài viết này nhé. Nếu bạn cảm thấy chưa hài lòng về những gợi ý trên thì bạn có thể tìm thấy được nhiều hơn về [Những nguyên tắc trong lập trình javascript](https://anonystick.com/blog-developer/hoc-javascript-va-nhung-nguyen-tac-chung-cho-moi-level-2020070989545462).

----
Source:
https://medium.com/javascript-in-plain-english/19-simple-javascript-coding-stiterias-to-keep-your-code-clean-7422d6f9bc0?site=anonystick.com