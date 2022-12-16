❗**QUAN TRỌNG:** Có một số tính năng được nhắc đến trong bài viết này đã không còn được dùng nữa, EcmaScript đã cấm sử dụng chúng. Nhưng vẫn có thể tìm thấy chúng trong nhiều thư viện khác, do vậy, vẫn rất đáng để chúng ta tìm hiểu.

### Tagged Template Literals

Nếu đã từng sử dụng `styled-components` trong React, thì chính xác bạn đã sử dụng các ký tự mẫu được gắn thẻ (`tagged template literals`).

Chúng cho phép ta kiểm soát việc `parse` các ký tự thông qua một `function` một cách hiệu quả hơn.

```js
taggingThis`Hey!!, I'm  ${name} !!`
```

Ở trên, `taggingThis` là một function có tham số đầu tiên là một mảng các strings, tham số còn lại liên quan đến các biểu thức (expressions). 

Bên trong hàm, chúng ta có thể thao tác với `strings` để trả về kết quả mong muốn.

![](https://images.viblo.asia/36177d66-8535-48a9-ab83-7d6442db8980.png)

Trong ví dụ trên, tham số `strings` tương ứng sẽ là `[ "Hey!!, I'm ", '"!!" ]`, và phần còn lại của các tham số sẽ được truyền vào mảng, `vals["Alex"]`.

### Toán tử , (dấu phẩy)

`,` là một toán tử phân tách các biểu thức và trả về biểu thức cuối cùng trong chuỗi.

![](https://images.viblo.asia/645dbca0-4665-4433-88f5-28d183401dc4.png)

Ví dụ, khi muốn viết hàm lambda ngắn hơn :v: 

![](https://images.viblo.asia/9aeb75e8-98c2-4dd3-acd1-db22c03ccf45.png)

Hàm `test()` thực hiện 2 việc, đầu tiên push kết quả `a*b` vào mảng array, và thực hiện tính toán `a*b`.
Khi gọi hàm, kết quả trả về là kết quả của `a*b`.

### with ⚠

`with` bị cấm hoàn toàn trong `strict mode` nên nó không còn được khuyến khích sử dụng nữa. Ngoài ra, khi sử dụng `block` với `with` có thể gặp phải một số vấn đề về hiệu năng và bảo mật.

`with` là một `keyword` trong JS, được dùng để mở rộng phạm vi chuỗi các lệnh:

```js
with(expression)
    statement
```

hoặc

```js
with(expression) {
    statement
    statement
    ...
}
```

Đánh giá `expression` và tạo ra một `scope` quanh `expression` đó. `expression` và `scope cha` của `with` là available bên trong {}.

![](https://images.viblo.asia/b76520be-3bf0-435e-9430-13ef0309eac2.png)

`with` gói `exp` bên trong chuỗi scope. `exp` và các biến khác được khai báo bên ngoài block vẫn có thể truy cập được từ bên trong block.

Nhưng với các biến `let` và `const` được khai báo bên trong `block with` thì chỉ truy cập được trong block đó, nó không thể sử dụng được ở bên ngoài. Khi cố gắng truy cập, sẽ tạo ra một `ReferenceError`.

![](https://images.viblo.asia/10215451-9ac3-483b-a5c4-322c86c2dffb.png)

### in

Chúng ta đã quá quen thuộc với vòng lặp `for..in`, nhưng chắc hẳn nhiều người không nhận ra `in` là một `keyword` trong JS :v.
Nó được sử dụng để kiểm tra sự tồn tại của một thuộc tính trong một đối tượng, trả về `true` nếu đối tượng có thuộc tính đó và ngược lại.

Ví dụ,

![](https://images.viblo.asia/096dc59d-a755-4d61-9f81-1e0430788663.png)

### Array constructor

![](https://images.viblo.asia/cbec301f-09a4-4c85-95ff-68c31a6bb12f.png)

Thứ tự của các tham số được truyền vào constructor sẽ tương ứng là index của chúng trong mảng. Tương tự như sử dụng array literal:

```js
const array = [1, 2, 3]
```

- Tạo mảng với new Array() thường áp dụng khi tham số lớn hơn hoặc bằng 2.

```
const array = new Array(1, 2, 3)
```

- JS sẽ engine phân bố không gian cho mảng với kích thước bằng với giá trị tham số truyền vào.

![](https://images.viblo.asia/2b94464e-48a4-4e9f-9aee-f6e79df95feb.png)

sẽ tạo ra một mảng với 4 phần tử và length là 4. Tương tự như

```js
const array1 = [, , , , ]
```

### Function constructor

```js
const mul = new Function("a", "b", "return a * b")
```

tương tự với

```js
const mul = (a, b) => a * b
```

hay

```js
function mul(a, b) {
    return a * b
}
```

hoặc

```js
const mul = function(a, b) {
    return a * b
}
```
Các biến truyền cho `Function()` tạo thành các tham số đầu vào và phần thân của hàm. 
Biến `mul` là tên hàm, biến cuối cùng là phần thân hàm, và các biến phía trước là tham số của hàm.

![](https://images.viblo.asia/0650e76a-e790-425a-8f73-64a281bb7c57.png)

***Theo MDN:***

Gọi trực tiếp constructor có thể tạo các hàm động, nhưng nó sẽ gặp phải các vấn đề liên quan tới bảo mật và hiệu năng tương tự như [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval). Tuy nhiên, không giống eval, Function constructor tạo ra các hàm chỉ thực thi trong phạm vi toàn cục.

### Destructuring Array

Chúng ta có thể hủy cấu trúc các phần tử trong một mảng bằng cách sử dụng `index` của chúng.

Về bản chất, Array cũng là đối tượng. Do vậy, chúng ta có thể hủy cấu trúc của Array tương tự như khi thực hiện trên object.

Trên object,

![](https://images.viblo.asia/fd8208cd-98bf-4ec9-8ea7-0dae7cfb99bb.png)

Tương tự, cho Array

![](https://images.viblo.asia/02d28f16-22ee-4741-ae90-c6ff4dc8bd8b.png)

Sử dụng `index` để trích xuất các phần tử. `Index` là thuộc tính xác định vị trí của các phần tử trong mảng. Vì vậy,

```js
const array1b = ['a', 'b', 'c']
```

tương đương với:

```js
const array1b = {
   0: 'a',
   1: 'b',
   2: 'c',
   length: 3
}
```

Ngoài ra, cũng có một cú pháp hủy cấu trúc mảng đặc biệt:

![](https://images.viblo.asia/06d969da-2d2f-4956-a8ec-5aa9b4db4eec.png)

tránh việc phải biết thông tin vị trí cụ thể các phần tử trong mảng.

### Thay đổi Array bằng cách sử dụng thuộc tính length

Thuộc tính `length` trong một mảng cho biết số phần tử trong mảng.

```js
const arr = [1, 2, 3]
arr.length 
// 3
```

Thay đổi `length` sẽ làm cho JS engine thay đổi các phần tử mảng (từ bên phải) sao cho số lượng các phần tử bằng với giá trị `length`.

```js
const arr = [1, 2, 3]
arr.length = 1
arr
// [1]
```

Ngược lại, nếu tăng `length`, JS engine sẽ thêm các phần tử (`undefined`) để làm cho số lượng các phần tử trong mảng tăng đến giá trị bằng length.

![](https://images.viblo.asia/daeae332-3020-4aa7-ba5e-0383e688f64b.png)

### Arguments

Chúng ta có thể sử dụng object `arguments` để lấy các tham số được truyền vào một hàm mà không cần xác định rõ ràng các biến tham số trong hàm:

![](https://images.viblo.asia/9f72e731-b5cf-4656-9eb4-375b3a3a2c37.png)

Object `arguments` tương tự một `array-indexed` với các key là index tương ứng.
`arguments object` được khởi tạo từ `Arguments class` nên có một số thuộc tính khá thú vị.

- `arguments.callee.name`: tham chiếu tới name của function đang được gọi.

```js
function myFunc () {
    console.log(arguments.callee.name) 
  // myFunc
}
myFunc(1, 2)
```

- `arguments.callee.caller.name`: tham chiếu tới name của function chứa function đang được thực thi.

```js
function myFunc() {
   console.log(arguments.callee.name) 
// myFunc
   console.log(arguments.callee.caller.name) 
// myFunc1
}

(function myFunc1() {
   myFunc(1, 2)
})()
```

### Bỏ qua dấu ngoặc ()

Bạn có biết rằng chúng ta có thể bỏ qua dấu ngoặc `()` khi khởi tạo một đối tượng không?

```js
class Test {
    hello() {
        console.log("Hi!")
    }
}
(new Test()).hello() 
// Hi!
(new Test).hello()
// Hi!
```

Các dấu ngoặc là tùy chọn, ngay cả trong các class có sẵn:

```js
(new Date).getDay()
(new Date).getMonth()
(new Date).getYear()
```
### Toán tử void

`void` là một keyword trong JS dùng để đánh giá một câu lệnh và trả về `undefined`.

```js
class Test {
    hello() {
        return "Hi!"
    }
}
const test = new Test
console.log(void test.hello()) 
// undefined
```
Hãy xem, hàm `hello()` sẽ trả về `"Hi!"`, nhưng thay vào đó `void` sẽ bỏ qua nó và trả về `undefined`.

`undefined` có thể được gán một giá trị khác trước đó, và điều này đã làm sai lệch ngữ nghĩa của nó. Vì vậy, `void` được sử dụng để đảm bảo chúng ta sẽ có một `undefined thực sự`.

### Thuộc tính hàm

Chúng ta có thể đặt thuộc tính trong các hàm như sau:

```js
function func() {
    func.prop1 = "a"
}
func.prop2 = "b"
```

- Các hàm cũng là các đối tượng. Thuộc tính hàm sẽ là một thuộc tính tĩnh cho tất cả các instance của hàm khi được sử dụng như một object.

```js
function func() {
    func.prop1 = "a"
}
func.prop2 = "b"

const ins1 = new func()
const ins2 = new func()
console.log(ins1.prop1)  // a
console.log(ins2.prop1)  // a
ins1.prop1 = "c"
console.log(ins2.prop1)  // c
```

- Là một thuộc tính toàn cục khi được sử dụng như một hàm.

```js
function func() {
    func.prop1 === undefined ? func.prop1 = "yes" : null
    if(func.prop1 === "yes")
        console.log("Prop with Yes")
    if (func.prop1 === "no")
        console.log("Prop with No")
}
func() // Prop with Yes
func.prop1 = "no"
func() // Prop with No
```
### Toán tử một ngôi +

Toán tử một ngôi `+` sẽ chuyển đổi toán hạng của nó thành kiểu Number.

![](https://images.viblo.asia/2f848591-f41f-4238-9d89-8892f7054ae8.png)

Hữu ích khi muốn chuyển đổi nhanh các biến thành Number.

### Toán tử một ngôi -

Toán tử một ngôi `-` chuyển đổi toán hạng của nó thành kiểu Number và phủ định nó.

Toán tử này đảo ngược kết quả của toán tử một ngôi `+`. Đầu tiên, nó chuyển đổi toán hạng thành giá trị Number, sau đó phủ định giá trị.
```js
-"12" 
// -12
```
Điều xảy ra ở đây là, string `“12”` sẽ được chuyển đổi thành Number của nó là `12`. Sau đó, số dương này sẽ được chuyển đổi thành dạng âm là `-12`.

![](https://images.viblo.asia/bce70108-1cec-4e68-a0ad-ecd1dafea3b1.png)

Nếu kết quả của chuyển đổi là `NaN`, thì phủ định sẽ không được áp dụng.

Phủ định `+0` tạo ra `-0` và phủ định `-0` tạo ra `+0`.
```js
- +0 // -0
- -0 // 0
```

### Toán tử lũy thừa **

Toán tử này được sử dụng để tìm số mũ của một số. Giống như việc tìm lũy thừa của một số được nâng lên một mức độ chính xác.

Trong Toán học, nếu chúng ta nâng 2 lên lũy thừa 3 (tức là tìm số mũ của 2), nghĩa là nhân 2 lên ba lần:
```js
2 * 2 * 2
```
Chúng ta có thể làm tương tự trong JS bằng cách sử dụng toán tử `**`:
```js
2 ** 3 // 8
9 ** 3 // 729
```

### Kế thừa qua `__proto__`

`__proto__` là một cách để kế thừa các thuộc tính từ một đối tượng trong JavaScript. Nó là một thuộc tính của `Object.prototype`.

`__proto__` sẽ set tất cả các thuộc tính của đối tượng được đặt trong [[Prototype]] của nó thành đối tượng đích.

Ví dụ:
```js
const obj = {
    method: function() {
        console.log("method in obj")
    }
}
const obj2 = {}
obj2.__proto__ = obj
obj2.method()
```

Chúng ta có hai đối tượng: obj và obj2. obj có thuộc tính method, method. obj2 là một đối tượng rỗng, nghĩa là nó không có thuộc tính.

Truy cập `__proto__` của obj2 và đặt nó thành obj. Điều này sẽ sao chép tất cả các thuộc tính của obj có thể truy cập thông qua `Object.prototype` sang obj2. Đó là lý do tại sao chúng ta có thể gọi `method()` trên obj2 mà không bị lỗi mặc dù nó không được định nghĩa.

obj2 đã kế thừa các thuộc tính của obj, do đó, thuộc tính hàm method sẽ có sẵn trong các thuộc tính của nó.

`__proto__` được sử dụng trên các đối tượng như object literal, Object, Array, Function, Date, RegEx, Number, Boolean, String.

[Tham khảo](https://blog.bitsrc.io/features-of-javascript-you-probably-never-used-4c117ba3f025)