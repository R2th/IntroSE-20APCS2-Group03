Tiết trời Đà Nẵng cũng đã vào thu, những cơn mưa đầu mùa của tháng 7 đã xua tan đi cơn nóng oi ả, những con phố bụi bặm nay cũng đã quang đãng khiến con người ta cảm thấy dễ chịu hơn. Rời xa sự mộng mơ, dễ thương của cô nàng CSS xinh đẹp, hôm nay mình sẽ đưa các bạn đi gặp anh chàng Javascript - chàng trai vui tính và cũng lắm sự khó hiểu...

Hôm nay mình sẽ cùng các bạn khám phá một vài khái niệm mà ở công ty mình thường nghe, đặc biệt là mấy anh chàng làm Frontend.

![](https://images.viblo.asia/e035de9b-7590-44b0-8580-5a83bf4b0fbe.png)

## Higher-order function là gì?
Higher-order hay còn gọi tắt là **HOC**. Thông thường khi định nghĩa 1 `function()`, ta thường truyền vào các tham số là value hoặc object. Nói chung là nhận vào value / object rồi return về value / object.
Nhưng với HOC thì lại khác, tham số có thể là `function()` và return về 1 `function()`.
Ồ thật thú vị, ***nhận vào 1 function() và trả về 1 function()***

```js
const sum = a => b => a + b

// var sum = function sum(a) {
//   return function (b) {
//     return a + b;
//   };
// };
```

Như bạn thấy đó, `function sum()` sẽ return về 1 function.

Trong Higher-order function có 3 khái niệm, đó là `callback function`, `closure` và `currying`. Mình sẽ giải thích từng thằng.

### 1. Callback funtion
Trước đây, mình cũng rất mơ hồ về khái niệm này, gần đây khi tập trung tìm hiểu về framework JS nhiều hơn nên mình cũng đã hiểu hơn về nó. *Callback function* là một function mà được truyền vào một function khác như một tham số *cái này jQuery cũng hay dùng nhưng không biết gọi là gì*. Khá là đơn giản nhưng callback được áp dụng rất nhiều trong javascript. Vì Javascript là ngôn ngữ hướng sự kiện nên thay vì chờ đợi phản hồi, nó sẽ thực thi các tác vụ khác.

Một ví dụ hay gặp là thao tác lắng nghe sự kiện trong javascript. Tham số thứ 2 sau `click` là một callback.
```js
document.getElementById('button').addEventListener('click', () => {
  alert('YOU CLICKED ME!');
});

// jquery
$('button').click(function () {
  alert('ahihi');
})
```

### 2. Closure
Khái niệm này thằng em trong team mình vẫn hay nhắc do cay cú đợt nó phỏng vấn bị hỏi nhưng... vẫn trả lời thuyết phục.
Khái niệm nói là 
>>> CLOSURE LÀ SỰ KẾT HỢP ĐƠN GIẢN GIỮA MỘT HÀM VÀ MÔI TRƯỜNG NƠI HÀM ĐƯỢC KHAI BÁO VÀ VÀO LÚC HÀM ĐƯỢC CHẠY (LEXICAL ENVIRONMENT).

Thật là một khái niệm cồng kềnh và khó hiểu, mình đọc x3,14 lần mà vẫn chưa hiểu được.

Theo mình hiểu, `closure` (dịch ra là: *bao đóng*), closure là cách một function cha return về function con ở bên trong nó. Mà function con có thể truy cập và thực thi các biến của function cha. Phải thoả mãn 2 điều kiện trên mới được gọi là **closure**.

```js
const numberGenerator = () => {
  let num = 0;
  const checkNumber = () => ++num;
  return checkNumber;
}

var numberFunc = numberGenerator();

console.log(numberGenerator()()); // 1
console.log(numberGenerator()()); // 1
console.log(numberFunc()); // 1
console.log(numberFunc()); // 2
console.log(numberFunc()); // 3
```

Khi ta chạy hàm `numberGenerator()` thì sẽ return về hàm `checkNumber()` và đoạn code trong hàm `checkNumber()` cũng chưa được thực thi. Trong trường hợp này, `numberFunc` tham chiếu đến một instance `checkNumber()`. Ta gọi `checkNumber()` là một **closure function** hay `numberGenerator` áp dụng kỹ thuật closure đều được.

Trong một số ngôn ngữ khác, thì biến cục bộ bên trong hàm chỉ tồn tại khi hàm thực thi (tức là sau khi gọi hàm `numberGenerator()` xong thì biến `num` sẽ được giải phóng và không thể truy cập được nữa). Tuy nhiên với js thì lại khác, nhờ vào `numberFunc` tham chiếu đến `checkNumber()` nên duy trì được biến `num` tồn tại. Vì vậy, khi gọi `numberFunc()`, giá trị biến `num` được tính toán và được đưa vào hàm. Từ đó cho ra kết quả tăng dần như trên.

### 3. Currying
Đây là 1 kỹ thuật cho phép chuyển đổi một **function nhiều tham số** thành những **function liên tiếp có một tham số**.

Ví dụ cách gọi hàm `sum(1)(2)` ở trên chính là 1 currying. Trong kỹ thuật currying này cũng áp dụng closure vì chính currying cũng dùng biến trong function cha.

Ví dụ:
```js
// Tìm các số tự nhiên số lẻ bé hơn 10
const numberOdd = () => {
  const number = [];
  for(let i = 0; i < 10; i++) {
    if(i % 2 === 1) {
      number.push(i);
    }
  }
  return number;
}

// Tìm các số tự nhiên số chẵn bé hơn 20
const numberEven = () => {
  const number = [];
  for(let i = 0; i < 20; i++) {
    if(i % 2 === 0) {
      number.push(i);
    }
  }
  return number;
}

console.log(numberOdd());  // [1, 3, 5, 7, 9]
console.log(numberEven()); // [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```

Cách trên thì khá đơn giản rồi, nhưng nếu viết dưới dạng callback thì sẽ như sau sẽ tái sử dụng được:
```js
const findNumber = (limit, func) => {
  const number = [];
  for(let i = 0; i < limit; i++) {
    if(func(i)) {
      number.push(i);
    }
  }
  return number;
}

findNumber(10, limit => limit % 2 === 1); // [1, 3, 5, 7, 9]
findNumber(20, limit => limit % 2 === 0); // [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```
Khá gọn nhỉ, tuy nhiên với currying thì sẽ như thế này:
```js
const findNumber = (limit) => func => {
  const number = [];
  for(let i = 0; i < limit; i++) {
    if(func(i)) {
      number.push(i);
    }
  }
  return number;
}

console.log(findNumber(10)(limit => limit % 2 === 1)); // [1, 3, 5, 7, 9]
console.log(findNumber(20)(limit => limit % 2 === 0)); // [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```
Nhìn có vẻ cồng kềnh hơn cách dùng callback nhỉ, nhưng dù sao đi nữa nó cũng là 1 kỹ thuật trong javascript. Đây cũng là cách thường được sử dụng khi code với React.

## Tổng kết
Nhìn chung thì javascript cũng khá đau đầu, ngóc ngách và khá cồng kềnh. Dù có kỹ thuật xịn xò tới đâu thì cũng chọn cho mình một phương pháp dễ hiểu nhất để tránh gây "áp lực cho người khác" mà vẫn đảm bảo được performance.
Hãy tiếp tục đón chờ những bài mới của mình, cảm ơn các bạn đã theo dõi.