Hi, xin chào bác bạn, chắc hẳn trong quá trình làm việc với JavaScript bạn sẽ gặp phải nhiều tình huống bắt buộc phải clone 1 array sang array mới để không làm  ảnh hưởng đến dữ liệu của array gốc. Vậy trong trường hợp đó bạn thường dùng cách nào ? hãy cùng mình tìm hiểu qua bài viết dưới đây để xem liệu có bao nhiêu cách có thể clone 1 array nhé (go)

![](https://images.viblo.asia/6611729b-963a-4846-9fd5-0f74804be878.png)

Trong JavaScript ta hay nghe nói đến 2 thuật ngữ `Shallow copy` và `Deep copy`, tạm vietsub thì nó là "Sao chép nông" và "Sao chép sâu" :v

Như vậy sẽ có 1 số cách chỉ sử dụng `Shallow copy` => tức là chỉ có thể clone được các array có cấu trúc đơn giản (array thuần tuý, array chứa 1 hoặc nhiều object có cấu trúc đơn giản, các array không lồng nhau quá nhiều cấp...). Và ngược lại `Deep copy` được sử dụng để clone các array có cấu trúc cực kì phức tạp, sâu, lồng nhiều cấp hoặc chứa object nhiều tầng, ...

### 1. Sử dụng Spread Operator (Shallow copy)

`Spread Operator` có lẽ đã quá quen thuộc mỗi khi nhắc tới ES6, để clone array ta làm như sau

```js
const numbers = [1, 2, 3];
const numbersCopy = [...numbers];

console.log(numbers); // Array [1, 2, 3]
console.log(numbersCopy); // Array [1, 2, 3]
```

Bây giờ mình thử `push()` thêm phần tử vào array mới xem sao

```js
const numbers = [1, 2, 3];
const numbersCopy = [...numbers];
numbersCopy.push(4);

console.log(numbers); // > Array [1, 2, 3]
console.log(numbersCopy); // > Array [1, 2, 3, 4]
```

Với các mảng đơn chiều, không phức tạp nó work rất ổn áp, tuy nhiên bạn cùng theo dõi ví dụ sau

```js
const nestedNumbers = [[1], [2]];
const numbersCopy = [...nestedNumbers];
numbersCopy[0].push(300);

console.log(nestedNumbers); // > Array [[1, 300], [2]]
console.log(numbersCopy); // > Array [[1, 300], [2]]
```

Lý do là array/object là dữ liệu được lưu trữ dưới dạng tham chiếu, giá trị của array/object được sao chép theo tham chiếu (cùng trỏ đến 1 vùng nhớ ) thay vì theo giá trị.

### 2. Sử dụng vòng lặp for (Shallow copy)

1 phương thức cũ khá thủ công nhưng vẫn thường được dùng đó là tạo ra 1 mảng mới, lặp qua từng phần tử của mảng gốc sau đó push từng phần tử vào mảng mới

```js
const numbers = [1, 2, 3];
const numbersCopy = [];

for (i = 0; i < numbers.length; ++i) {
  numbersCopy[i] = numbers[i];
}
numbersCopy.push(4);

console.log(numbers); // > Array [1, 2, 3]
console.log(numbersCopy); // > Array [1, 2, 3, 4]
```

Và đương niên nó cũng gặp phải vấn đề tham chiếu giống thằng bên trên

### 3. Sử dụng vòng lặp while (Shallow copy)

Có thằng anh `for` thì không thể thiếu thằng em `while` được

```js
const numbers = [1, 2, 3];
const numbersCopy = [];
let i = -1;

while (++i < numbers.length) {
  numbersCopy[i] = numbers[i];
}
numbersCopy.push(4);

console.log(numbers); // > Array [1, 2, 3]
console.log(numbersCopy); // > Array [1, 2, 3, 4]
```

hoặc cách viết khác phổ biến hơn

```js
const numbersCopy = [];
let i = -1;

while (i < numbers.length) {
  numbersCopy[i] = numbers[i];
  i++;
}
numbersCopy.push(4);

console.log(numbers); // > Array [1, 2, 3]
console.log(numbersCopy); // > Array [1, 2, 3, 4]
```

Nhắc lại 1 chút toán tử ++ cho bạn nào quên nhé

> Biểu thức i++ sẽ tăng giá trị của i lên một đơn vị sau khi kết thúc dòng lệnh, còn biểu thức ++i sẽ tăng ngay và luôn

<br >

```js
var a = 12;
alert(a++); // Lúc này a = 12
 
var b = 12;
alert(++b); // Lúc này b = 13
```

### 4. Sử dụng Array.map (Shallow copy)

Như đã biết `map()` sẽ lặp qua các phần tử trong mảng, biến đổi chúng và trả về mảng mới, trong trường hợp ta không "biến đổi" các phần tử gốc đồng nghĩa với việc ta đang clone ra 1 array mới

```js
const numbers = [1, 2, 3];
const numbersCopy = numbers.map(x => x);

console.log(numbers); // > Array [1, 2, 3]
console.log(numbersCopy); // > Array [1, 2, 3]
```

### 5. Sử dụng Array.filter (Shallow copy)

Cũng tương tự như `map()`, nếu trong callback của `filter()` ta return `true` thì đồng nghĩa với việc sẽ trả về nguyên array gốc

```js
const numbers = [1, 2, 3];
const numbersCopy = numbers.filter(() => true);

console.log(numbers); // > Array [1, 2, 3]
console.log(numbersCopy); // > Array [1, 2, 3]
```

### 6. Sử dụng Array.reduce (Shallow copy)

Bản chất của `reduce()` là từ array gốc, tính toán và cho ra 1 output cuối cùng, từ đó ta có thể kết hợp với `push()` để push lần lượt các item của array gốc vào biến tích luỹ như sau

```js
const numbers = [1, 2, 3];
const numbersCopy = numbers.reduce((newArray, element) => {
  newArray.push(element);
  
  return newArray;
}, []);

console.log(numbers); // > Array [1, 2, 3]
console.log(numbersCopy); // > Array [1, 2, 3]
```

### 7. Sử dụng Array.slice (Shallow copy)

Nếu không truyền tham số vào `slice()` ta sẽ nhận được 1 bản sao của array

```js
const numbers = [1, 2, 3];
const numbersCopy = numbers.slice();

console.log(numbers); // > Array [1, 2, 3]
console.log(numbersCopy); // > Array [1, 2, 3]
```

### 8. Sử dụng Array.concat (Shallow copy)

`concat()` sẽ trả về array gốc nếu không truyền tham số gì hoặc truyền vào 1 mảng rỗng

```js
const numbers = [1, 2, 3];
const numbersCopy = numbers.concat();
const numbersCopy1 = numbers.concat([]);

console.log(numbers); // > Array [1, 2, 3]
console.log(numbersCopy); // > Array [1, 2, 3]
console.log(numbersCopy1); // > Array [1, 2, 3]
```

### 9. Sử dụng Array.from (Shallow copy)

```js
const numbers = [1, 2, 3];
const numbersCopy = Array.from(numbers);

console.log(numbers); // > Array [1, 2, 3]
console.log(numbersCopy); // > Array [1, 2, 3]
```

### 10. Sử dụng clone của lodash (Shallow copy)

Lodash cung cấp cho ta hàm `_.clone()` để shallow copy array/object

```js
var objects = [{ 'a': 1 }, { 'b': 2 }];
 
var shallow = _.clone(objects);
console.log(shallow[0] === objects[0]);
// => true
```

### 11. JSON.parse and JSON.stringify (Deep copy)

Đây là phương thức an toàn nhất để deep copy 1 array/object

Theo đó ta sẽ kết hợp
- `JSON.stringify` - biến một đối tượng thành một chuỗi
- `JSON.parse` - biến một chuỗi thành một đối tượng

```js
const nestedNumbers = [[1], [2]];

const numbersCopy = JSON.parse(JSON.stringify(nestedNumbers));
numbersCopy[0].push(300);

console.log(nestedNumbers); // > Array [Array [1], Array [2]]
console.log(numbersCopy); // > Array [Array [1, 300], Array [2]]
```

### 12. Sử dụng cloneDeep của lodash (Deep copy)

Lodash cung cấp cho ta hàm `_.cloneDeep()` để deep copy array/object

```js
var objects = [{ 'a': 1 }, { 'b': 2 }];
 
var deep = _.cloneDeep(objects);
console.log(deep[0] === objects[0]);
// => false
```

### Kết luận

Trên đây mình đã giới thiệu cho các bạn một số cách để clone 1 array, trong thực tế tuỳ vào yêu cầu bài toán ta sẽ lựa chọn ra cách nào tối ưu nhất

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công và hẹn gặp lại ở bài viết sau nhé !