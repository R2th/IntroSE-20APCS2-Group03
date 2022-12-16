![image.png](https://images.viblo.asia/959c94e5-94e4-4d6d-a957-601403f222f4.png)

Ở bài trước, chúng ta đã cùng nhau tìm hiểu về các kiểu dữ liệu trong JavaScript cũng như biết được tham trị, tham chiếu là gì? Phân biệt được hai ông thần này. Trong bài viết này, chúng ta sẽ tiếp tục tìm hiểu về cách khai báo biến trong JavaScript, khái niệm scope là gì? hoisting là gì? chúng ta bắt đầu thôi 😉

Bạn có thể xem thêm bài viết tại: https://200lab.io/blog/khai-bao-bien-scope-hosting-trong-javascript/

## I. Khai báo biến trong JavaScript

![image.png](https://images.viblo.asia/43bd34f0-68fd-420a-a249-03b5c1e116dc.png)

Trong JavaScript, việc khai báo biến khá đơn giản, bạn chỉ việc dùng các từ khóa như `var - let - const` để khai báo biến mà thôi, ta không cần quan tâm đến kiểu dữ liệu của biến đó. Bản thân JavaScript là một dynamic laguage mà, do đó kiểu dữ liệu của biến có thể tùy ý thay đổi theo kiểu dữ liệu của giá trị mà nó được gán, tiện quá phải không nào 😁.

```
var a = 5                    //--> number
let b = '200lab'             //--> String
const obj = {name: '200lab'} //--> Object
```

Trước ECMAScript 2015 (ES 2015 hay ES6) thì `var` là từ khóa duy nhất được sử dụng để khai báo biến trong JavaScript. Kể từ sau ES6 được ra mắt thì JavaScript được bổ sung thêm từ khóa `let` và `const` cho việc khai báo biến.

Vậy tại sao trong khi ta có thể khai báo biến bằng từ khóa `var` rồi mà còn thêm `let` với `const` để làm gì nữa 🤔. Thì vấn đề ở đây là trước ES6 thì có một số bug dễ phát sinh liên quan đến scope (phạm vi) của các biến, vì thế mà khi ES6 ra mắt, `let` và `const` được thêm vào để khắc phục vấn đề này.

Một điều cần lưu ý khi khai báo biến là việc khai báo biến có tên giống với biến đã được khai báo trước đó.

Đầu tiên là với biến được khai báo bằng từ khóa `var`. Khi ta khai báo lại biến bên trong một  block code khác với từ khóa `var` thì nó sẽ ảnh hướng đến biến cùng tên ở bên ngoài block đó.

```
var a = 10;
//--> ở đây a = 10
{
	var a = 5;
    //--> a = 5;
}
//--> a = 5
```

Việc biến `a` nhận giá trị mới trong block code là do biến được khai báo bằng `var` sẽ có **Global scope** .

Biến được khai báo lại bằng từ khóa `let` và `const` bên trong một block code thì sẽ không ảnh hưởng gì đến biến có cùng tên đã được khai báo bên ngoài block trước đó.

```
var a = 1, b = 2;
//--> Tại đây a = 1 và b = 2
{
	let a = 5;
    const b = 10;
    //--> a ở đây bằng 5, b bằng 10
}
//--> a ở đây vẫn bằng 1 và b vẫn bằng 2
```

**Lưu ý**: Các biến không được khai báo thì sẽ không tồn tại, tuy nhên nếu biến không được khai báo mà ta gián giá trị cho nó thì nó trở thành một biến có **Global Scope** và có kiểu dữ liệu trùng với kiểu giá trị mà nó được gán đó nhé 😉

## II. Scope trong JavaScript

![image.png](https://images.viblo.asia/a7dd58b6-2c4f-4467-b809-ba8e648681bf.png)

Đầu tiên chúng ta cần biết khái niệm scope là gì? Scope là phạm vi của một biến được khai báo mà ta có thể truy cập được. Trước khi ES6 được ra mắt, JavaScript chỉ có 2 loại scope là: **Global scope** và **Function scope**. Sau khi ES6 ra mắt thì JavaScript có thêm **Block scope** nữa.

Chúng ta cùng tìm hiểu từng loại một nhé 😊.

### 1. Global scope

Các biến mà được khai báo bên ngoài bất kỳ function nào thì đều thuộc **Global scope**. Với các biến thuộc **Global scope** đều có thể truy cập được từ bất cứ đâu trong chương trình JavaScript.

```
var speech = 'Welcome to JavaScript';

//--> Biến speech có thể sử dụng được ở đây

function say() {
//--> Biến speech cũng có thể sử dụng được ở đây
}
```

### 2. Block scope

**Lưu ý:** Bất kỳ biến nào được khai báo bằng từ khóa `var` đều không thể có **Block scope.**

Do đó biến được khai báo bằng từ khóa `var` bên trong block `{}` thì có thể được truy cập ở bên ngoài block đó.

```
{
	var a = 10;
}

//--> Có thể sử dụng biến a tại đây
```

Trước ES6, JavaScript không có khái niệm **Block scope**. Sau khi ES6 ra mắt, thì các biến được khai báo bằng `let` và `const` đều thuộc **Block scope**. Do đó các biến không thể được truy cập ở bên ngoài block được.

```
{
	let a = 10;
}

//--> Không thể sử dụng được biến a tại đây
```

### 3. Function scope

Như tên gọi, các biến được khai báo cục bộ bên trong một function thì có **Function scope.**

```
function showCar() {
	var name = 'lamborghini';
    //--> Ta có thể sử dụng biến name ở đây
}

//--> Ta không thể sử dụng biến name ở đây
```

### 4. Loop scope

Như tên gọi, Loop scope đề cập đến phạm vi của biến trong các vòng lặp, ta cùng đến ví dụ để dễ hiểu hơn nhé 😁

Đầu tiên là sử dụng từ khóa `var` trong vòng lặp

```
var i = 2;

for(var i = 0; i < 10; i++) {
	//code ở đây
}
console.log(i); //--> i = 10
```

Trong ví dụ trên, biến `i` được khai báo bằng từ khóa `var` trong vòng lặp `for` sẽ thay đổi giá trị của biến `i` bên ngoài vòng lặp `for` do đó sau khi chạy hết vòng lặp thì `i = 10`

Còn sử dụng từ khóa `let` thì sao? cùng xem ví dụ và giải thích bên dưới nè 😉

```
let i = 2;

for(let i = 0; i < 10; i++) {
	//code ở đây
}
console.log(i); //--> i = 2
```

Bản thân các biến được khai báo bằng từ khóa `let` bên trong một block code sẽ có **Block scope** còn với biến được khai báo bên ngoài block code thì sẽ có **Global scope** do đó biến `i` bên ngoài và bên trong `for` sẽ không liên quan gì đến nhau. Vì thế kết quả cuối cùng `i = 2`

## III. Hoisting

**Hoisting** là một cơ chế của JavaScript, các biến hay function khi được khai báo sẽ được đưa lên trên cùng của **scope** trước khi đống code còn lại thực thi.

**Lưu ý:** Vì nó chỉ đưa những khai báo lên trên cùng **scope** thôi, còn việc gán giá trị thì vẫn giữ nguyên không thay đổi ? (các bạn hết sức lưu ý điều này nhé).

Vòng đời của một biến trong JavaScript sẽ như thế này:
Khai báo --> Gán giá trị --> Sử dụng --> Giải phóng

Tuy nhiên ta có thể khai báo và gán giá trị luôn cũng được. Để giải thích vấn đề **hoisting** ta cùng đi vào ví dụ nè.

```
console.log(text); //--> undefined

var text = "Welcome to JavaScript";
```

Như khai niệm về **hoisting** ở lúc đầu, biến `text` ở ví dụ trên mặc dù được khai báo và gán giá trị sau khi ta `log` nó ra nhưng vì được **hoisting** nên biến `text` được khai báo đầu tiên. Vì khai báo thôi nên khi ta `log` biến `text` ra sẽ là `undefined`, sau đó biến `text` mới được gán giá trị. (Tại sao lại `undefined` thì mình đã giải thích ở bài trước rồi nhé, nếu bạn không biết thì có thể đọc lại nè 😁).

Khi thực thi đoạn code trên JavaScript sẽ làm như thế này:

```
var text;

console.log(text); //--> undefined

text = "Welcome to JavaScript";
```

Tương tự với một function:

```
function saySth() {
    console.log(text);
    var text = "Welcome to JavaScript";
}
//Khi JavaScript chạy
function saySth() {
    var text;
    console.log(text);
    text = "Welcome to JavaScript";
}
saySth(); //--> undefined
```

Với các biến được khai báo bằng từ khóa `var` mới được như vậy, còn với `let` thì khác nhé. Biến được khai báo bằng từ khóa `let` thì vẫn được **hoisting** thôi nhưng nó không được khởi tạo nhé do đó việc ta sử dụng biến của nó sẽ báo lỗi như ví dụ bên dưới.

```
console.log(carName); //--> ReferenceError: carName is not defined
let carName = "lamborghini";
```

## IV. Tổng kết

Qua bài viết này, hy vọng sẽ giúp bạn nắm được cách khai báo biến và các vấn đề liên quan đến việc khai báo biến, biết được khái niệm về scope và hoisting trong JavaScript. Nếu bạn chưa rõ thì có thể đọc lại lần nữa nhé 😂. Cảm ơn các bạn đã đọc, hẹn gặp lại trong bài tiếp theo 😊.