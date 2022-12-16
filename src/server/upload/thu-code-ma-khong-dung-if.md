Đọc tiêu đề bài viết, có thể bạn sẽ thắc mắc tại sao điều này lại hữu ích?

Mình nghĩ thử thách này buộc bộ não của bạn phải suy nghĩ khác đi và trong một số trường hợp, một giải pháp khác biệt có thể tốt hơn giải pháp thông thường.

Không có gì sai khi sử dụng câu lệnh `if`, nhưng việc tránh sử dụng chúng đôi khi có thể làm cho code trở dễ đọc hơn. Đây chắc chắn không phải là một quy tắc chung. Ở đây, bạn là thẩm phán và bạn có quyền quyết định coding style của chính mình.

Trong mọi trường hợp, việc thử đưa ra solution cho một coding challenge mà không cần sử dụng `if` luôn là điều thú vị.

Dưới đây là một số challenge với các solution dựa trên `if` và  `if-less`. Tất cả các solution đều được viết bằng JavaScript.

Hãy cho mình biết bạn nghĩ giải pháp nào dễ đọc hơn nhé.

## 1. Challenge #1:  Đếm số lượng số lẻ trong array

Giả sử chúng ta có một dãy các số nguyên và chúng ta muốn đếm xem có bao nhiêu số là số lẻ trong đó. Dưới đây là ví dụ về dãy số:

```js
const arrayOfIntegers = [1, 4, 5, 9, 0, -1, 5];
```
### Solution 1.1. Sử dụng `if`
```js
let counter = 0;
arrayOfIntegers.forEach((integer) => {
  const remainder = Math.abs(integer % 2);
  if (remainder === 1) {
    counter++;
  }
});
console.log(counter);
```

### Solution 1.2.  KHÔNG sử dụng `if`

```
let counter = 0;
arrayOfIntegers.forEach((integer) => {
  const remainder = Math.abs(integer % 2);
  counter += remainder;
});
console.log(counter);
```
Trong solution 1.2, chúng ta đang tận dụng lợi thế của việc chia lấy dư cho 2 luôn luôn trả về 1 (với số lẻ) và 0 (với số chẵn). Kết quả này chính là data mà chúng ta cần, và từ đó, chúng ta có thể sử dụng nó trực tiếp làm kết quả.

Vậy còn đếm số nguyên chẵn thì sao nhỉ? Bạn có thể nghĩ ra cách nào mà không sử dụng câu lệnh `if` không?

## 2. Challenge #2:  weekendOrWeekday function
Viết một function truyền vào tham số date (ví dụ như new date()) và trả về string "weekend" hoặc "weekday" tương ứng.

### Solution 2.1. Sử dụng `if`
```js
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

### Soltion 2.2. KHÔNG sử dụng `if`
```js
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

Bạn có thấy điều kiện của lệnh `if` có một số data trong đó không? Nó nói cho chúng ta biết ngày nào là cuối tuần. Để tránh sử dụng `if` thì chúng ta đã trích xuất data đó ra một object và sử dụng object đó trực tiếp. Việc này cũng giúp chúng ta lưu trữ data ở một cấp độ tổng quát và cao hơn.

*Update*: 

Ở phần solution 2.2, bạn thấy `||` là 1 trick để thể hiện condition. Chúng ta sử dụng nó ở đây để không lặp lại "weekday" 5 lần cho 5 ngày còn lại. Nếu bạn không muốn nó, bạn có thể đặt cả 7 ngày vào label của object như sau:
```js
const weekendOrWeekday = (inputDate) => {
  const day = inputDate.getDay();
  return weekendOrWeekday.labels[day];
};
weekendOrWeekday.labels = { 
  0: 'weekend', 
  1: 'weekday',
  2: 'weekday',
  3: 'weekday',
  4: 'weekday',
  5: 'weekday',
  6: 'weekend', 
};
console.log(weekendOrWeekday(new Date()));
```
 
## 3. Challenge #3: The doubler function
Viết một doubler function, dựa trên type của input, như sau:

Nếu input là number, nhân đôi nó (i.e. 5 => 10, -10 => -20).

Nếu input là string, hãy lặp từng ký tự của nó (i.e. 'hello' => 'hheelloo').

Nếu input là function, hãy gọi nó 2 lần.

Nếu input là array, hãy làm cho từng phần tử trong nó được doubler.

Nếu input là object, hãy làm cho tất cả các values của nó được doubler.

### Solution 3.1. Sử dụng `switch`
```js
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
### Solution 3.2. KHÔNG sử dụng `switch`:
```js
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

Một lần nữa, ở 3.2, bạn lại thấy data (các dữ liệu được thực hiện cho từng loại input) được trích xuất từ lệnh switch sang kiểu object.
Sau đó, object sẽ được sử dụng để chọn thao tác phù hợp với từng loại input.

Chúng ta đã đi qua một vài ví dụ với những cách khác nhau. Tuỳ theo coding style của mỗi người mà chắc hẳn bạn sẽ ủng hộ hoặc không đồng tình với solution nào đó. Hãy chia sẻ suy nghĩ đó với mình nhé.

Cảm ơn các bạn đã theo dõi bài viết.

Nguồn: https://medium.com/edge-coders/coding-tip-try-to-code-without-if-statements-d06799eed231