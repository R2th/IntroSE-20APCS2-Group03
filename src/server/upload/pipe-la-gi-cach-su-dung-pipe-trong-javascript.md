Trong **Javascript universe** có vô vàn kiến thức cần phải học, để học hết tất cả thì không thể ngày 1 ngày 2 được mà nếu có học hết thì cũng chưa chắc các bạn có thể nhớ hết tất cả chúng. Vậy nên bạn cần có thói quen học hỏi mọi lúc, để làm được điều đó bạn cần hiểu được mục đích và rèn luyện nó thường xuyên để điều đó trở nên bình thường (như ngày nào mình cũng ăn cơm vậy, không ăn thì không thế sống được). Vậy nên, hy vọng bài này sẽ phần nào đó giúp bạn có cho mình kiến thức cũng như thói quen học hỏi mỗi ngày, mình cũng tìm hiểu nhé.

À mình có một blog bạn nào quan tâm thì có thể ghé thăm tại https://nxv109.com.

**Pipe là gì?**
**Pipe** bạn có thể hiểu đơn giản nó như một *đường ống*, mà *đường ống* thì phải chạy *trơn tru, không bị gấp khúc*. **Pipe** cũng vậy mục đích để giúp bạn viết code không những chạy trơn tru mà còn dể hiểu giúp mọi người đọc không bị tốn thời gian để đọc hiểu nó.

**Lưu ý trước khi đọc tiếp**: Trong bài này có liên quan đến những kiến thức này, nếu bạn chưa tìm hiểu về chúng thì nên tìm hiểu trước để khi đọc tiếp bạn sẽ hiểu hơn:
+ Reduce in MDN
+ Arrow function in MDN

Mình xin chia sẻ một tí về **Pure Function là gì?** Vì mình cũng sẽ sử dụng nó trong bài viết này
1. Trả về cùng một giá trị output nếu input không đổi
2. Không thay đổi bất kì giá trị nào ở ngoài phạm vi function

**Không Pipe**
```javascript
const addFour = a => a + 4;
const minusFive = a => a - 5;

const nine = addFour(5);
const four = minusFive(nine);
```

```javascript
addFour(minusFive(0)); // -1
```

Bạn có thể thấy, khi nhìn vào đoạn code trên rất dể hiểu phải không ạ.

Tiếp theo, mình thực hiện nhân thêm 10
```javascript
multiplyByTen(addFour(minusFive(0))); // -10
```

Rồi giờ mình không muốn trả về -10, mình sử dụng **Math.abs()** để phủ định nó:

```javascript
Math.abs(multiplyByTen(addFour(minusFive(0)))); 10
```

*Giờ bạn có thấy rằng code bây giờ trở nên lộn xộn, khó đọc?* Vì khi bạn đọc code bạn sẽ đọc từ *trên -> xuống, trái -> phải*. Nhưng khi bạn đọc đoạn code trên bạn phải suy luận ngược từ *phải -> trái*.

Mình đã làm ví dụ để **indicate** rằng khi không **Pipe** thì code khó đọc. Giờ mình sẽ tìm hiểu tiếp nhé!

**Làm sao để viết Pipe?**
Bạn để ý đoạn code trên sẽ thấy rằng các hàm lồng vào nhau liên tiếp, mà liên tiếp thì dùng **Array** lặp qua được không hè? Thử nhé!

**Ex:**
Tính tổng của các phần tử trong mảng, ở đây mình sẽ dùng **forEach** nhé!
```javascript
const scores = [90, 100, 40, 50, 10];
let total = 0;

scores.forEach(score => total += score); 
console.log(total); // 290
```

Tại sao mình lại không sử dụng **map or filter**, vì 2 methods này sẽ trả về một **new array**, mình thì chỉ muốn trả về là một số thôi. Với **forEach** sẽ không có giá trị trả về, vậy nếu muốn thực hiện như **map or filter** nhưng vẫn cho kết qua như mong muốn thì sao? Mình sẽ dùng **reduce** thử nha!
```javascript
const scores = [90, 100, 40, 50, 10];
const total = scores.reduce((acc, cur) => acc + cur, 0);
console.log(total); // 290
```

Vậy đúng rồi phải không ạ! Giờ mình sẽ viết code áp dụng **Pipe** nhé.
```javascript
const pipe = (v, ...funcs) => {
  funcs.reduce((res, func) => {
    return func(res);
  }, v);
};
```

```javascript
const subtract = v => console.log(v - 5);

pipe(10, subtract); // 5
```

Nó hoạt động tốt, nhưng bạn có thể thấy trong **const pipe = (v, ...funcs)...** tham số **v** nên đặt sau **...funcs** vì tham số đầu tiên thì nên được gọi đầu tiên. Nhưng do *rule* của **rest parameter** là phải đặt sau dấu *comma*(dấu phẩy).

Nên mình sẽ sử dụng **Closure**, bạn nào chưa nắm được **Closure** là gì thì có thể đọc lại bài viết của mình tại [ĐÂY](https://viblo.asia/p/closure-javascript-la-gi-naQZRLDX5vx).
**Closure** là một function nó có thể sử dụng tham số của **outer function** ngay khi function đó đã *finished executing*.
Vậy viết lại là:
```javascript
const pipe = (...funcs) => v => {
  funcs.reduce((res, func) => {
    return func(res);
  }, v);
};

pipe(add)(5) // 10
```

Cuối cùng khi áp dụng với nhiều function lại với nhau!
```javascript
const minusFive = v => v - 5;
const addFour = v => v + 4;
const multiplyByTen = v => v * 10;

pipe(
  minusFive,
  addFour,
  multiplyByTen,
  Math.abs,
  console.log
)(0); // 10
```

Giờ thì đẹp rồi phải không ạ, trong dự án các bạn có thể biến tấu sao cho phù hợp với dự án của mình là được.

**Kết luận**
Vậy thì mình và các bạn cũng đã học được thêm một kiến thức hay, có cơ hội các bạn áp dụng vào để nhớ hơn nha.
Cảm ơn!