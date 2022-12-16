ES6 (ECMAScript 2015) đã ra mắt được 3 năm, với nhiều tính năng rất hữu ích đã trở nên quen thuộc với hầu hết web developer. Tuy nhiên thế giới công nghệ không ngừng phát triển, từ đó đến nay ECMAScipt cũng update thêm nhiều tính năng hay ho. Dưới đây là những tính năng mới của ES2016 và ES2017. Chú ý rằng chúng có thể không chạy được trên tất cả trình duyệt, có thể phải sử dụng thêm preprocessor như `Babel`.

# ECMAScript 2016

 ![ES7](https://images.viblo.asia/232c3319-283c-42d4-b531-9ce23a13f43b.png)

## 1.Array.prototype.includes
`includes` là một phương thức mới rất hữu ích sử dụng với Array, giúp dễ dàng kiểm tra được 1 mảng có chứa 1 phần tử hay không.
Không giống như method `indexOf` đã có từ trước, method `includes` có thể kiểm tra được giá trị `NaN`.

![ECMAScript 2016 or ES7 — Array.prototype.includes()](https://images.viblo.asia/cb84dee1-7817-4cd7-a9ee-18a8621ca71d.png)

Fact: nhiều JavaScript developer muốn đặt tên cho method này là `contains`, nhưng nó đã được sử dụng bởi Mootools, vì thế họ sử dụng `includes`.

## 2.Toán tử lũy thừa
ES2016 bổ sung thêm toán tử 2 ngôi `**` có chức năng tương tự `Math.pow`.

![ECMAScript 2016 or ES7 — ** Exponent infix operator](https://images.viblo.asia/f9f9ebd9-5775-4a17-b9dd-ec45b17c1d3a.png)

# ECMAScript 2017

![ES8](https://images.viblo.asia/3482308e-7016-4cb4-b44c-b1cbc42e2db9.png)

## 1. Object.values()
`Object.values` là một phương thức mới tương tự `Object.keys` nhưng return tất cả giá trị tất cả các giá trị tương ứng với mỗi key của đối tượng.

![](https://images.viblo.asia/0504f595-e6f4-4548-8a05-eaefa6cfbe51.png)

## 2. Object.entries()
Khác với `Object.keys` và `Object.values`, phương thức `Object.entries` return cả keys và values theo cấu trúc mảng 2 chiều.

![](https://images.viblo.asia/e399f578-17b4-4ac4-9ed9-1be5c6e47a8a.png)

## 3. String padding
Hai instance method được thêm vào String - `String.prototype.padStart` và `String.prototype.padEnd` cho phép chèn thêm khoảng trắng hoặc bất kì chuỗi nào vào đầu hoặc cuối string gốc.

```javascript
'5'.padStart(10)         // '          5'
'5'.padStart(10, '=*')  //'=*=*=*=*=5'
'5'.padEnd(10)          // '5         '
'5'.padEnd(10, '=*')   //'5=*=*=*=*='
```

## 4. Có thể thêm dấu phẩy thừa vào cuối function parameters
Với ES2017, chúng ta có thể thêm 1 dấu phẩy thừa vào cuối danh sách tham số của function mà không lo gặp lỗi. Tính năng này nghe có vẻ kì cục nhưng nó có thể giúp ích trong 1 số trường hợp

![](https://images.viblo.asia/b1148188-0753-4a78-92ce-bd7196f1e31e.png)

Note: có thể đặt dấu phẩy thừa cả khi định nghĩa và khi call function!

## 5. Async/Await
Đây có lẽ là tính năng mới quan trọng và hữu ích nhất. Async function giúp giảm tính trạng callback hell và giúp code trở nên dễ nhìn hơn.

Promise đã giải quyết khá tốt những vấn đề của callback. Code trở nên dễ đọc, tách biệt và dễ bắt lỗi hơn. (Tìm hiểu kĩ hơn về promise tại [đây](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Promise))

![](https://images.viblo.asia/55363d2c-93f8-4bdd-8f76-6b07d3a324f3.jpg)

Tuy nhiên, dùng promise đôi khi ta vẫn thấy hơi khó chịu vì phải truyền callback vào hàm then và catch. Code cũng sẽ hơi dư thừa và khó debug, vì toàn bộ các hàm then chỉ được tính là 1 câu lệnh nên không debug riêng từng dòng được.

May thay, ES7 cho ra mắt tính năng `async/await`. Chúng giúp chúng ta viết code trông có vẻ đồng bộ (synchonous), nhưng thật ra lại chạy bất đồng bộ (asynchonous). 

![](https://images.viblo.asia/459b8223-b3ac-4be9-bf39-f98cedbbb184.jpg)

Cùng tìm hiểu kỹ hơn về `async/await` trong ví dụ dưới đây.

{@codepen: https://codepen.io/anhsang222/pen/KoGQYZ}

# Tham khảo
https://github.com/tc39/proposals/blob/master/finished-proposals.md

https://medium.freecodecamp.org/here-are-examples-of-everything-new-in-ecmascript-2016-2017-and-2018-d52fa3b5a70e

https://toidicodedao.com/2017/10/10/async-await-trong-javascript/