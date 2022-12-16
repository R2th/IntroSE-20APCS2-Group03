**Javascript nhiều khi làm tôi thật sự bối rối và khó hiểu, giống như cách làm sao để có thể hiểu được một cô gái vậy, nhất là những anh em đã có vợ (hy vọng là không có bạn dev nữ nào đọc được bài viết này :neutral_face:). Mặc dù biết là như vậy nhưng anh em vẫn cứ đâm đầu vào để chịu khổ, cũng chỉ vì phụ nữ là phái đẹp...và Javascript cũng vậy!**

Ăn dầm nằm dề, dùi mài kinh sử hết tháng này qua tháng khác, năm này qua năm khác, nhiều khi cứ nghĩ rằng chúng ta đã chinh phục được "cô gái" khó tính ấy. Nhưng không, có những lúc cô ấy lại đem lại cho ta không ít sự bất ngờ không thể lường trước, những trải nghiệm thú vị trên con đường chinh phục đầy chông gai.



### 1. 9999999999999999 = 10000000000000000
Thật vậy, 2 giá trị trên thực sự là bằng nhau trong Javascript. Tưởng chừng như rất vô lý nhưng lại vô cùng có lý.

```javascript
const x = 999999999999999;   // x = 999999999999999
const y = 9999999999999999;  // y = 10000000000000000
```

Theo như giải thích trên [W3School](https://www.w3schools.com/js/js_numbers.asp#:~:text=JavaScript%20numbers%20are%20always%20stored,Value%20(aka%20Fraction%2FMantissa)):

> Unlike many other programming languages, JavaScript does not define different types of numbers, like integers, short, long, floating-point etc.
> This format stores numbers in 64 bits, where the number (the fraction) is stored in bits 0 to 51, the exponent in bits 52 to 62, and the sign in bit 63

Dịch nôm na là: "*Không giống với các ngôn ngữ khác, Javascript không yêu cầu định nghĩa loại chữ số là: integer, short, long, hay float. Number trong Javascript được lưu trữ với 64 bit, trong đó số (phân số) được lưu trữ từ bit 0 đến 51, số mũ ở bit 52 đến 62 và dấu ở bit 63*". 

Nghĩa là số nguyên trong Javascript chỉ có thể biểu diễn chính xác tối đa giá trị với `2^53` ([refercence](https://stackoverflow.com/questions/307179/what-is-javascripts-highest-integer-value-that-a-number-can-go-to-without-losin))

```javascript
const x = Math.pow(2,53); // x = 9007199254740992
```

### 2. 0.1 + 0.2 không bằng 0.3
Lại thêm 1 trường hợp nữa mà Javascript hack não chúng ta, cứ tưởng đó là điều hiển nhiên nhưng thực ra thì không phải như vậy.
```javascript
const x = 0.1 + 0.2 // x = 0.30000000000000004
// or
const y = 0.362 * 100 // y = 36.199999999999996
```

Và để kết quả chính xác cho 2 trường hợp trên thì cần phải làm như thế này:

```javascript
const x = Math.round(0.2 * 10 + 0.1 * 10)/10 // x = 0.3

const y = Math.round(1000 * 0.362 * 100)/1000 // y = 36.2
```

### 3. Immediately-Invoked Function Expression (IIFE)
IIFE thì với Frontend dev hẳn là ai cũng biết rồi, là loại function được thực thi ngay lập tức. Với cú pháp

```javascript
var foo = function() { 
  // do something
}();
```

Tuy nhiên, khi bạn viết function như thế này thì ngay lập tức bạn sẽ nhận được lỗi `Uncaught SyntaxError: Unexpected token`

```javascript
function foo() {
  // do something
}();
// Syntax error
```

### 4. Vấn đề với chỉ 1 dòng trống khi so sánh 2 function
Dưới đây chỉ là 2 cách viết function của mỗi developer, có người thì thích xuống hàng sau từ khoá `return`, có người thì lại thích để cùng trên 1 hàng, trong mọi trường hợp thì 2 cách viết này đều hoạt động bình thường và cho kết quả giống nhau. Tuy nhiên, khi so sánh với nhau thì lại không giống nhau, kỳ lạ thật!

```javascript
function foo() {
   return
   {
      foo: 'bar'
   }
}

function bar() {
   return {
      foo: 'bar'
   }
}

typeof foo() === typeof bar(); //false
```

### 5. Chấm phẩy trước rồi khai báo sau cũng được
Tưởng chừng như rất vô lý mà lại cũng rất hợp lý. Trong nhiều ngôn ngữ lập trình khác, bạn phải đặt dấu `;` vào cuối câu lệnh. Tuy nhiên trong Javascript, bạn có thể bắt đầu bằng dấu `;` đấy.

```javascript
;let x = 2
```

Sai rõ ràng như này mà chẳng báo lỗi gì cả... :confused:

### 6. NaN lại là number, nhưng cũng không phải là number

`NaN` là số nhưng lại không phải số lại là một số, `NaN` không bằng chính nó và `NaN` cũng không bằng bất cứ thứ gì (thật khó chiều).

```javascript
typeof(NaN) // "number"

NaN === NaN // false
```

Cách duy nhất để xác minh một giá trị có phải là NaN hay không là dùng hàm Number.isNaN(value)

```javascript
Number.isNaN(NaN) //true
```

Những tình huống thú vị trên đây của Javascript có thể các bạn đã gặp qua rồi hoặc chưa, bài viết chủ yếu mang tính tổng hợp, vì có những đặc trưng mang tính chuyên sâu của ngôn ngữ lập trình và thuật toán, nếu bạn đã gặp rồi thì có thể comment giải thích rõ hơn để cùng hiểu rõ bản chất nhé :heart_eyes:

Xin cảm ơn và hẹn gặp lại!