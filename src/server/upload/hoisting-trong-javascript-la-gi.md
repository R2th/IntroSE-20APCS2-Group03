**Hoisting** là trong những khái niệm thú vị trong Javascript mà không phải ai cũng biết tới cũng như hiểu rõ nó một các hoàn toàn, cho nên bài viết sau mình xin mạn phép giới thiệu về khái niệm **hoisting** này (bow).

![](https://images.viblo.asia/a0fc9fb1-c16e-4a14-b344-d7546332cd7e.gif)

## Ơ thế Hoisting là gì?
Về cơ bản thì khi JavaScript compile code của bạn, mọi khai báo biến sử dụng `var` đều được hay đưa lên trên cùng của local scope hoặc function scope hiện tại khi được khai báo trong functions, hoặc của global scope nếu được khai báo ở bên ngoài function bất kể là được khai báo thật sự ở đâu. Đây chính là khái niệm cơ bản nhất của **hoisting**.

Khai báo hàm cũng được "hoist", tuy nhiên nó sẽ được đẩy lên trên cùng, trên cả những câu khai báo biến. 

Để dễ hiểu hơn về  **hoisting** và ảnh hưởng của nó thì chúng ta hãy xem ví dụ sau nhé, ở đây mình sẽ viết đoạn sau vào global scope:

```javascript
console.log(myName);
var myName = "Dave Grolh";
```

**Đố các bạn `console.log` sẽ output cái gì ?**

1. `Uncaught ReferenceError: myName is not defined`
2. `Dave Grolh`
3. `undefined`

Đáp án là 3. `undefined`. Kì lạ hông ? 

Như mình đã nêu ở bên trên, các biến được đưa lên đầu của scope  khi JavaScript chạy compile. Tuy nhiên, 1 điều quan trọng cần nhớ đó là ***chỉ có việc khai báo được đẩy lên đầu, việc gán giá trị thì không.***

Để minh chứng cho điều mình nói, ví dụ chúng ta có một đoạn code và ở dòng thứ 10 có 1 đoạn khai báo `var myName = "Dave Grolh"`, khi JavaScript compile, `var myName` sẽ được đưa lên đầu scope, trong khi `myName = "Dave Grolh"`  vẫn được giữ nguyên ở dòng 10 (có thể là dòng 11 vì `var myName`  đã được đẩy lên dòng 1 rồi mà).

Nào cùng xem lại đoạn code trước xem trong Runtime thì JavaScript đã compile đoạn code như thế nào nhé:

```javascript
var myName;
console.log(myName);
myName = "Dave Grolh";
```

Đây chính là lý do vì sao mà `console.log` output `undefined`, bởi vì biến `myName` có tồn tại, tuy nhiên nó lại chưa được gán giá trị cho đến dòng thứ 3. 

## Đối với function thì sao ?
Chúng ta có nhắc đến ở trên là khai báo hàm cũng được đẩy lên đầu scope, trên cả các khai báo biến. Nhìn vào ví dụ sau nhé: 

```javascript
function hey() {
console.log('hey ' + myName);
};
hey();
var myName = 'Dave Grolh';
```

Call đến hàm `hey()` vẫn sẽ trả về `undefined`, bởi vì khi compile thì code của chúng ta sẽ trở thành 

```javascript
function hey() {
console.log('hey ' + myName);
};
var myName;
hey();
myName = 'Dave Grolh';
```

Vì vậy cho đến khi function được gọi, biến `myName` đã được tồn tại tuy nhiên chưa được gán giá trị nào hết. Để hiểu rõ về vấn đề này hơn thì mình recommend đọc qua khái niệm **IIFE** của JavaScript ở acticle [này](https://medium.com/javascript-in-plain-english/https-medium-com-javascript-in-plain-english-stop-feeling-iffy-about-using-an-iife-7b0292aba174). 
> *TL;DR*:  **IIFE** (Immediately Invoked Function Expression) là một cách để bảo vệ và giữ cho các function và biến trong 1 scope được toàn vẹn, hoặc dùng để chỉ gọi hàm 1 lần và tránh việc "lỡ tay" gọi lại hàm đó.

Do sự tồn tại của khái niệm **hoisting**, nên đôi khi các bạn đọc code của người khác, họ thường khai báo biến ở ngay đầu scope, rồi sau đó mới gán lại giá trị cho nó sau. Họ đơn giản chỉ đang làm cho code của họ giống với code mà JavaScript output sau khi compile xong, nhằm giảm thiểu tối đa những lỗi liên quan đến **hoisting** hay bất kể những lỗi kì là khác. 

## Vậy `let` và `const` thì sao?
Chúng cũng bị "hoisted" - sự thật là việc khai báo `var`, `let`, `const`, `function` và `class` đều bị "hoisted"

Điểm khác biệt giữa việc khai báo `var`, `let`, và `const` là giá trị khởi tạo - giá trị mà chúng được gán cho khi được khai báo.

Instance của `var` và  `let` có thể được khởi tạo mà không có giá trị (`undefined`) trong khi đó `const` sẽ bắn exceptions  nếu như bạn cố tình khơi tạo nó mà không gán giá trị cho nó, chính vì vậy mà:

```javascript
const MY_NAME = 'Dave Grolh';
// Dùng được

const MY_NAME;
MY_NAME = 'Dave Grolh';
// Uncaught SyntaxError: Missing initializer in const declaration
```

## Vậy giữa `var`, `let` và `const` có khác biệt gì về hoisting không?

Yeah, nếu bạn khai báo `var` ở global scope, nó sẽ tạo ra một property của global object - ở trường hợp của browser thì nó chính là window object. Do đó việc tạo `var myName = 'Dave Grolh'` cũng có thể được refer bằng việc gọi `window.myName`

```javascript
var myName = 'Dave Grolh';
myName
// "Dave Grolh"
window.myName
// "Dave Grolh"
```

Tuy nhiên nếu bạn viết `let newName = 'Awesome Dave';` thì sẽ không thể access được bằng global window object - do đó bạn không thể dùng `window.newName` để refer đến `'Awesome Dave'`.

## Một vấn đề nho nhỏ

Khai báo bằng `var` có thể được access từ ngoài scope mà được khởi tạo, trong khi `let` và `const` thì không.

Chúng ta có thể thấy được ở ví dụ bên dưới, khai báo bằng `var` trả về `undefined` còn `let` và `const` sẽ trả về lỗi

```javascript
console.log('1a', myName1); // undefined
if (1) {
    console.log('1b', myName1); // undefined
    var myName1 = 'Dave Grolh';
}

console.log('2a', myName2); // error: myName2 is not defined
if (1) {
    console.log('2b', myName2); // undefined
    let myName2 = 'Dave Grolh';
}

console.log('3a', myName3); // error: myName3 is not defined
if (1) {
    console.log('3b', myName3); // undefined
    const myName3 = 'Dave Grolh';
}
```

## Tổng kết
Vậy là tất cả những gì mình muốn chia sẻ về khái niệm hoisting trong JavaScript, cảm ơn các bạn đã đọc (F)

Nguồn: [What is Hoisting in JavaScript?](https://medium.com/javascript-in-plain-english/https-medium-com-javascript-in-plain-english-what-is-hoisting-in-javascript-a63c1b2267a1)