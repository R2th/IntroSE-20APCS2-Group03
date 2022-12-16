# Giới thiệu
Ở bài viết này chúng ta sẽ cũng tìm hiểu cách giải một số bài toán mà không sử dụng đến loop.
Loop ở đây, tức là nhưng vòng lặp như `for, for...in, for...of, while, and do...while` .

Vậy đầu tiên tại sao bạn nên hạn chế sử dụng chúng?
Hãy cùng xem ví dụ dưới đây: 

*Bài toán có input là một mảng các con mèo và yêu cầu liệt kê tên con mèo có số tháng tuổi < 7.*
```
const cats = [
  { name: 'Mojo',    months: 84 },
  { name: 'Mao-Mao', months: 34 },
  { name: 'Waffles', months: 4 },
  { name: 'Pickles', months: 6 }
]
var kittens = []
for (var i = 0; i < cats.length; i++) {
  if (cats[i].months < 7) {
    kittens.push(cats[i].name)
  }
}
console.log(kittens)
```
 Đọc vòng `for` này, chắc hẳn bạn sẽ thấy khá dễ hiểu, tuy nhiên để ý kỹ hơn một chút, chúng ta đã tạo ra 2 biến mới là `kittens`,` i`, và thêm cả condition` if`. Code này có thể dễ đọc nhưng sẽ không hề dễ bảo trì và mở rộng khi yêu cầu bài thay đổi. Đồng thời khi có nhiều biến, nhiều lần gán lại giá trị biến, và cả những điều kiện sẽ gây khó khăn cho việc debug.
 
 Vì vậy, hãy hạn chế dùng những loop kiểu như  `for, for...in, for...of, while, and do...while` nhé. Những loop này còn được hiểu là `imperative` loop.  Và giải pháp thay thế ở đây đó là sử dụng `declarative` để thực hiện vòng lặp. 
 
 Chắc đọc đến đây nhiều bạn sẽ thấy khá mơ hồ về `imperative` và `declarative`.
 > - Imperative: quan tâm đến cách giải quyết bài toán (các bước thực hiện) để có được kết quả mong muốn, trả lời cho câu hỏi **HOW**
> - Declareative: quan tâm đến input và output của bài toán, trả lời cho câu hỏi **WHAT**

Cụ thể hơn ở bài toán mở đầu ở trên, việc thực hiện vòng `for` chính là theo hướng imperative, vì nó mô tả từng bước thực hiện, duyệt qua từng phần tử và kiểm tra điều kiện ra sao.
Còn theo hướng declarative sẽ là sao nhỉ?
Câu trả lời là:
```
const isKitten = cat => cat.months < 7
const getName = cat => cat.name
const getKittenNames = cats => cats
      .filter(isKitten)
      .map(getName)
const kittens = getKittenNames(cats)
console.log(kittens)
```
Cách viết này dễ hiểu hơn nhiều khi các function với chức năng khác nhau được tách ra riêng biệt.  Rất dễ dàng để bảo trì và mở rộng khi có yêu cầu bài toán thay đổi.

Để tìm hiểu kỹ hơn về   `imperative` và `declarative`, bạn có thể đọc thêm ở  [đây](https://viblo.asia/p/tim-hieu-ve-declarative-programming-va-so-sanh-voi-imperative-programming-yMnKMOgEl7P) nhé

# Giải pháp
## Recursion (Đệ quy)
Một cách  để tránh việc sử dụng vòng lặp là sử dụng đệ quy.
Đệ quy hiểu đơn giản là phương thức gọi lại chính nó. Việc sử dụng đệ quy có thể không mang lại tính dễ đọc, dễ hiểu tốt nhất, vì nhiều người không quen sử dụng nó. Tuy nhiên, trong mọi trường hợp, sẽ rất thú vị nếu bạn thử giải quyết vấn đề với đệ quy.



## Các hàm sẵn có
JavaScript cung cấp rất nhiều phương thức có sẵn cho array như `map/filter/reduce...`

Hãy luôn tận dụng chúng bất cứ khi nào có thể. 
![](https://images.viblo.asia/f22bb989-c354-479a-99dd-fb40298a5cf8.jpg)

# Challenge
Phần này mô tả một số challenge nhỏ với giải pháp dựa trên vòng lặp và không lặp. Hãy thử xem giải pháp nào bạn thích và giải pháp nào bạn nghĩ là dễ đọc hơn nhé.
## Challenge #1: Tính tổng của một mảng số
Bài toán cho chúng ta một mảng số và yêu cầu là cần tính tổng của chúng
```
const arrayOfNumbers = [17, -4, 3.2, 8.9, -1.3, 0, Math.PI];
```

**Solution:**

- Solution 1: Sử dụng loop
```
let sum = 0;
arrayOfNumbers.forEach((number) => {
  sum += number;
});

console.log(sum);
```
Chú ý rằng chúng ta có thể thay đổi biến `sum` để ra được kết quả. Nhưng điều gì sẽ xảy ra khi giả sử ngôn ngữ bạn đang sử dụng không phải là JavaScript mà là một ngôn ngữ không được phép gán lại biến (ví dụ như Erlang). Giải pháp chính là solution 2 và solution 3 nhé.
- Solution 2: Sử dụng phương thức `reduce`
```
const sum = arrayOfNumbers.reduce((acc, number) =>
  acc + number
);
console.log(sum);
```
- Solution 3: Đệ quy
```
const sum = ([number, ...rest]) => {
  if (rest.length === 0) { 
    return number;
  }
  return number + sum(rest);
};
console.log(sum(arrayOfNumbers))
```
Phương thức `sum` gọi lại chính nó và mỗi lần đó nó sẽ trả về những phần tử còn lại cần được tính tổng. Việc này sẽ dừng lại đến khi không còn phần tử nào cần phải tính. Có thể bạn sẽ nghĩ đây là một giải pháp thông minh, tuy nhiên nó sẽ không thể dễ đọc  bằng sử dụng `reduce`

## Challenge #2: Tạo string từ mảng chứa nhiều type khác nhau
Giả sử chúng ta có một mảng gồm các string và các loại khác và bài toán yêu cầu cần join tất cả các phần tử là string, trừ các loại khác.
Ví dụ: 
```
const dataArray = [0, 'H', {}, 'e', Math.PI, 'l', 'l', 2/9, 'o!'];
```
Kết quả mong đợi là “Hello!”.

**Solution:**

Đơn giản nhất bạn có thể sử dụng toán tử `typeof` để kiểm tra giá trị có thuộc kiểu string hay không
- Solution 1: Sử dụng vòng lặp
```
let string = '', i = 0;
while (dataArray[i] !== undefined) {
  if (typeof dataArray[i] === 'string') {
    string += dataArray[i];
  }
  i += 1;
}
console.log(string);
```

- Solution 2: Sử dụng phương thức `filter` và `join`
```
const string = dataArray.filter(e => typeof e === 'string')
                        .join('');
console.log(string);
```
Việc sử dụng filter cũng giúp chúng ta tránh được việc sử dụng if-statement. Phần kiểm tra điều kiện đã được chuyển vào trong hàm filter.
## Challenge #3: Chuyển đổi mảng values sang mảng records
Giả sử chúng ta có một mảng tên sách và cần phải chuyển mỗi tựa sách thành object có ID duy nhất
```
const booksArray = [
  'Clean Code',
  'Code Complete',
  'Introduction to Algorithms',
];
// Desired output
newArray = [
  { id: 1, title: 'Clean Code' },
  { id: 2, title: 'Code Complete' },
  { id: 3, title: 'Introduction to Algorithms' },
];
```
- Solution 1: Sử dụng loop
```
const newArray = [];
let counter = 1;
for (let title of booksArray) {
  newArray.push({
    id: counter,
    title,
  });
  counter += 1;
}
console.log(newArray);
```
- Solution 2: Sử dụng phương thức `map`
```
const newArray = booksArray.map((title, index) => ({ 
  id: index + 1, 
  title 
}));
console.log(newArray);
```

Bài viết đến đây là kết thúc. Hi vọng sẽ giúp các bạn có thêm tip để code tốt hơn. Cảm ơn các bạn đã theo dõi bài viết này!

Tham khảo:
- https://medium.com/edge-coders/coding-tip-try-to-code-without-loops-18694cf06428
- https://hackernoon.com/rethinking-javascript-death-of-the-for-loop-c431564c84a8