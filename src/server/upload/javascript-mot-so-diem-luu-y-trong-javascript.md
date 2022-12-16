Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu `một số điểm đặc biệt, khác lạ` và khá là "dị" trong `JavaScript` và `ES6`. Vì trong lập trình `JavaScript` chúng ta nên sử dụng `"use strict"` để code trở nên dễ hiểu và cú pháp rành mạch rõ ràng hơn, do đó chúng ta sẽ chỉ đề cập đến các vấn đề trong `strict` mode thôi nhé :D
## Khai báo let, const và var ở môi trường Global
Như chúng ta đã biết khi sử dụng JavaScript, chúng ta sẽ có một object đặc biệt là `window`. Đây là một `Global Object`, tức là chúng ta có thể dùng ở bất kỳ chỗ nào trong môi trường JS của trang hiện tại. Khi khai báo biến với từ khóa `var`, biến sẽ được gán thành thuộc tính của `window`. Ví dụ
```javascript
    "use strict"
    var a = 5
    console.log(a) // 5
    console.log(window.a) // 5
```
Tuy nhiên khi khai báo với từ khóa `let` hay `const` thì các biến này sẽ không trở thành thuộc tính của `window`. 
```javascript
    "use strict"
    var a = 5
    let b = 2
    const c = 1
    console.log(window.a) // 5
    console.log(window.b) // undefined
    console.log(window.c) // undefined
    console.log(b) // 2
    console.log(c) // 1
```
Các bạn lưu ý điều này nhé :D
## Kiểu dữ liệu null và undefined
Trong phần này chúng ta sẽ tìm hiểu sự khác biệt giữa hai kiểu dữ liệu `null` và `undefined`. Cái này chúng ta cần nắm rõ để viết điều kiện cho đúng. Trước tiên chúng ta sẽ hiểu hai kiểu dữ liệu này
1. null
+ `null` là một giá trị rỗng
+ `null` phải được assign
```javascript
    let test = null
    console.log(test) // null
```
Mặt khác, `null` là một object. 
```javascript
    console.log(typeof test) // object
```
2. undefined

`undefined` là một kiểu mà biến được thể hiện nhưng chưa được định nghĩa. Ví dụ
```javascript
    let a
    console.log(a) // undefined
```
Không giống như `null`, `undefined` có type là `undefined`
```javascript
    console.log(typeof a) // undefined
```
Ngoài ra, có 2 cách khác để thể hiện được một biến là `undefine`
+ Gán cho biến giá trị `undefined`
```javascript
    let b = undefined
    console.log(b) // undefined
```
+ Thể hiện một biến ko phải là thuộc tính của object
```javascript
    let obj = {}
    console.log(obj.a) // undefined
```
3. Điểm tương đồng giữa null và undefined

Trong JavaScript có 6 giá trị `falsy`. Cả null và undefined là 2 trong số 6 giá trị này. 
+ false
+ 0 (zero)
+ null
+ undefined
+ "" (empty string)
+ NaN (not a number)
Ngoài 6 giá trị trên, các giá trị còn lại đều là `truthy`.

Tiếp theo, trong JavaScript có 6 kiểu dữ liệu nguyên thủy 
+ boolean
+ null
+ undefined
+ number
+ string
+ symbol

Còn lại tất cả là object (ví dụ: functions, objects, arrays, ...)

Tuy nhiên chú ý là khi xét kiểu của null thì lại object.
```javascript
    let a = null
    console.log(typeof a) // null
```
4. Điểm khác nhau nữa của null và undefined

Khí sử dụng gía trị mặc định cho function. Chúng ta sẽ xem xét ví dụ sau
```javascript
    const test = (str = 'hello world') => console.log(str)
    
    test("nguyen thanh tuan") // nguyen thanh tuan
    
    test() // hello world
    
    test(undefined) // hello world
    
    test(null) // null
```

Như vậy, với tham số mặc định thì undefined sẽ sử dụng giá trị mặc định còn null thì không.


5. Tóm lại

+ null là giá trị rỗng và phải được assign
+ undefined là một biến được thể hiện nhưng chưa được định nghĩa
+ null và undefined đều là giá trị falsy
+ null và undefined đều là kiểu dữ liệu nguyên thủy. Tuy nhiên typeof null là object.
+ null !== undefined nhưng null == undefined.

## Phép so sánh Double Equals (==) và Triple Equals (===)
Như ở phần trên, mình có ghi `null !== undefined nhưng null == undefined`, chúng ta sẽ tìm hiểu rõ hơn ở đây nhé :D (Một biến bao gồm `kiểu dữ liệu` và `giá trị`)
1. So sánh double equals là so sánh kiểu tự ép kiểu 
2. So sánh triple equals là so sánh ko tự ép kiểu (kiểu này chặt chẽ hơn)

So sánh == là một kiểu so sánh yếu, khi so sánh ==, chúng ta sẽ đưa hai biến về cùng một kiểu rồi so sánh giá trị của chúng (dựa theo falsy hoặc truthy).
```javascript
    console.log(77 == '77') // true
```
Khi so sánh như trên, '77' (kiểu string) sẽ được đưa về thành 77 (kiểu number), do đó hai giá trị bằng nhau và bằng 77.

Nếu chúng ta sử dụng === thì kết quả sẽ là `false` vì hai kiểu dữ liệu khác nhau (number và string)
```javascript
    console.log(77 === '77') // false
```
Chúng ta sẽ tìm hiểu phần gây nhầm lẫn nhiều là so sánh các giá trị `falsy` với nhau.
+ false, 0 và ""
Khi so sánh 3 giá trị trên với nhau theo kiểu so sánh == thì đều trả về true.
```javascript
    false == 0
    // true

    0 == ""
    // true

    "" == false
    // true
```
+ null và undefined
Khi so sánh hai giá trị này theo kiểu == thì đều trả về giá trị true,
```javascript
    null == null
    // true

    undefined == undefined
    // true

    null == undefined
    // true
```
Tuy nhiên nếu so sánh hai gía trị này với các giá trị falsy còn lại thì đều trả về false
```javascript
    null == false
    // false

    undefined == ''
    // false

    null == 0
    // false
    ...
```
+ NaN
NaN khi so sánh == thì luôn trả về false, ngay cả khi so sánh với chính nó.
```javascript
    NaN == null
    // false

    NaN == undefined
    // false

    NaN == NaN
    // false
```

### Tài liệu tham khảo
+ https://codeburst.io/javascript-null-vs-undefined-20f955215a2
+ https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a
+ https://developer.mozilla.org/en-US/docs/Glossary/Falsy

### Cảm ơn các bạn đã đọc bài viết. Happy coding!