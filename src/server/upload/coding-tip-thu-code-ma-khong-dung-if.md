![](https://images.viblo.asia/4cf3d61b-84ba-4d67-8806-ddcb20bfb8d9.png)

Khi tôi bắt đầu lập trình và tham gia *code challenge*, một trong những thử thách yêu thích là giải quyết vấn đề mà không dùng câu lệnh if (hoặc ternary hoặc *switch*)

Có thể bạn sẽ thắc mắc điều đó thì có lợi ích gì?

Hừm, tôi nghĩ thử thách này buộc bạn phải nghĩ khác đi, mà trong một số trường hợp thì những giải pháp khác thì lại tốt hơn cái cũ.

Đương nhiên là chẳng có vấn đề gì với việc dùng *if* cả, có điều không dùng *if* thì đôi lúc ta sẽ tránh được việc làm phức tạp đoạn code. Tất nhiên là chỉ thỉnh thoảng thôi, nên bạn cứ tùy tình huống mà sử dụng nhé, chứ đừng máy móc.

Một lưu ý nhỏ nữa là không dùng *if* không chỉ code dễ đọc hơn, mà còn có một số khái niệm liên quan đến khoa học sau vấn đề này. Ở những ví dụ dưới đây, bạn sẽ thấy không dùng *if* sẽ đưa đến một khái niệm gọi là *code-as-data*, mở ra một cánh cổng với những khả năng riêng biệt, chẳng hạn cho phép bạn chỉnh sửa code khi thực thi.

Nhìn chung, hãy luôn thử giải quyết *code challenge* bằng cách không sử dụng câu lệnh điều kiện.

Dưới đây là một vài ví dụ để so sánh giữa khi dùng và không dùng *if* được viết bằng JavaScript.


### Thử thách #1: Đếm số lẻ trong *array*
Giả sử ta có một mảng số nguyên (integer), và muốn đếm xem trong mảng này có bao nhiêu số lẻ.

```
const arrayOfIntegers = [1, 4, 5, 9, 0, -1, 5];
```

Đây là cách dùng *if*:

```
let counter = 0;
arrayOfIntegers.forEach((integer) => {
  const remainder = Math.abs(integer % 2);
  if (remainder === 1) {
    counter++;
  }
});
console.log(counter);
```

Còn đây là cách không dùng *if*:

```
let counter = 0;
arrayOfIntegers.forEach((integer) => {
  const remainder = Math.abs(integer % 2);
  counter += remainder;
});
console.log(counter);
```

*Lưu ý: ví dụ trên sử dụng forEach và chỉnh sửa biến counter, mặc dù sử dụng immutable thì sẽ tốt hơn. *

*Note: the examples above use forEach and mutate the counter variable. It is cleaner and safer to use immutable methods instead. However, this article is not about that topic. Stay tuned for more coding tips articles that will cover immutability and functional programming. Also note, as pointed out by David Nagli, that the if-less solution would only work for integers while the if-based solution has the advantage of handling any number including decimal ones.*

Ở giải pháp không dùng *if*, chúng ta tận dụng một thực tế là số dư khi chia cho 2 luôn là 0 hoặc 1. Kết quả của phép toán cũng chính là dữ liệu sử dụng trực tiếp trong giải pháp.

Vậy nếu trường hợp ta cộng cả số nguyên vào thì sao?

### Thử thách #2: Function weekendOrWeekday

Viết một function nhận một date object làm tham số (chẳng hạn new Date()) và trả về chuỗi ký tự là "weekend" hoặc "weekday".

Đây là cách dùng *if*:

```
const weekendOrWeekday = (inputDate) => {
  const day = inputDate.getDay();
  if (day === 0 || day === 6) {
    return 'weekend';
  } 
  
  return 'weekday';
  // Or, for ternary fans:
  // return (day === 0 || day === 6) ? 'weekend' : 'weekday';
};
console.log(weekendOrWeekday(new Date()));
```

Đây là cách không dùng *if*:

```
const weekendOrWeekday = (inputDate) => {
  const day = inputDate.getDay();
  return weekendOrWeekday.labels[day] || 
         weekendOrWeekday.labels['default'];
};
weekendOrWeekday.labels = { 
  0: 'weekend', 
  6: 'weekend', 
  default: 'weekday' 
};
console.log(weekendOrWeekday(new Date()));
```

Bạn có để ý rằng câu lệnh *if* có chứa một ít dữ liệu. Nó gửi cho ta thông tin ngày nào là cuối tuần. Cách ta tránh sử dụng *if* chỉ đơn giản là trích xuất dữ liệu vào một object và sử dụng. 

### Thử thách #3: Function doubler

Viết một function *doubler*, dựa trên kiểu input thì nó sẽ thực hiện như sau:

* Input là số thì nhân đôi  (5 => 10, -10 => -20).
* Input là chuỗi ký tự thì lặp lại tất cả các ký tự  ('hello' => 'hheelloo').
* Input là function thì gọi 2 lần.
* Input là array thì gọi hàm với đầu vào là lần lượt tất cả phần tử của nó
* Input là object thì gọi hàm với đầu vào là mọi giá trị của object

Đây là cách dùng *switch*:

```
const doubler = (input) => {
  switch (typeof input) {
    case 'number':
      return input + input;
    case 'string':
      return input
        .split('')
        .map((letter) => letter + letter)
        .join('');
    case 'object':
      Object.keys(input)
            .map((key) => (input[key] = doubler(input[key])));
      return input;
    case 'function':
      input();
      input();
  }
};
console.log(doubler(-10));
console.log(doubler('hey'));
console.log(doubler([5, 'hello']));
console.log(doubler({ a: 5, b: 'hello' }));
console.log(
  doubler(function() {
    console.log('call-me');
  }),
);
```

Còn đây là cách không dùng *switch*:

```
const doubler = (input) => {
  return doubler.operationsByType[typeof input](input);
};
doubler.operationsByType = {
  number: (input) => input + input,
  string: (input) =>
    input
      .split('')
      .map((letter) => letter + letter)
      .join(''),
  function: (input) => {
    input();
    input();
  },
  object: (input) => {
    Object.keys(input)
          .map((key) => (input[key] = doubler(input[key])));
    return input;
  },
};
console.log(doubler(-10));
console.log(doubler('hey'));
console.log(doubler([5, 'hello']));
console.log(doubler({ a: 5, b: 'hello' }));
console.log(
  doubler(function() {
    console.log('call-me');
  }),
);
```

Vẫn là cách cũ, để ý cách dữ liệu đã được trích xuất khỏi câu lệnh *switch* và cho vào object. Sau đó object được dùng để chọn đúng thao tác và gọi hàm.

Nguồn: https://medium.com/edge-coders/coding-tip-try-to-code-without-if-statements-d06799eed231