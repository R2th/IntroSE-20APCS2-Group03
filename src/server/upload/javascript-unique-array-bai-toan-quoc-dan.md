Hi các bạn, tiếp tục chuỗi chủ đề xoay quanh JavaScript, hôm nay chúng ta sẽ bàn luận về chủ đề "Unique Array trong Javascript", vấn đề mà mình chắc chắn là trong quá trình làm việc bạn đã gặp phải rất nhiều. Cụ thể như nào chúng ta cùng kéo xuống dưới xem nhé

![](https://images.viblo.asia/6611729b-963a-4846-9fd5-0f74804be878.png)

### 1. Kết hợp filter() và indexOf()

Ở bài viết trước mình đã giới thiệu phần này tới các bạn đoạn snippet này

```js
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const myArray = ['a', 1, 'a', 2, '1'];
const unique = myArray.filter(onlyUnique);

console.log(unique); // > ['a', 1, 2, '1']
```

Theo đó `filter()` sẽ return về 1 array mới, trong `filter()` sử dụng điều kiện check trùng lặp để loại ra các phần tử đã tồn tại trong mảng trước đó nên kết quả cuối cùng ta thu được một mảng mới gồm những phần tử là duy nhất

### 2. Sử dụng Set() kết hợp Spread operator

Trong ES6 có giới thiệu thêm `Set()` chức năng của nó là nhận đầu vào là các phần tử duy nhất không cho trùng lặp, ta có thể sử dụng như sau

```js
const myArray = ['a', 1, 'a', 2, '1'];
const unique = [...new Set(myArray)];

console.log(unique); // > ['a', 1, 2, '1']
```

Tuy nhiên bạn hãy cẩn trọng khi sử dụng nó, vì theo như mình biết `Set()` chỉ đáp ứng tốt với các dữ liệu `undefined`, `null`, `boolean`, `string`, `number`. Các array có cấu trúc phức tạp có thể nó sẽ không hoạt động perfect.

### 3. Sử dụng Set() kết hợp Array.from()

Tương tự như trên ta có thể kết hợp `Set()` với `Array.from()` như sau

```js
const myArray = ['a', 1, 'a', 2, '1'];
const unique = Array.from(new Set(myArray));

console.log(unique); // > ['a', 1, 2, '1']
```

### 4. Kết hợp Set() với các method của array

Như mình nói ở trên, `Set()` có thể không hoạt động tốt với các array có cấu trúc phức tạp, vì thế ta có thể kết hợp nó với các method khác của array để cho ra kết quả mong muốn. Ví dụ với `map()`

```js
const students = [
  {
    name: 'Krunal',
    age: 26
  },
  {
    name: 'Ankit',
    age: 25
  },
  {
    name: 'Krunal',
    age: 23
  }
];
const uniqueArr = [... new Set(students.map(data => data.name))];

console.log(uniqueArr); // > ["Krunal", "Ankit"]
```


### 5. Sử dụng Map()

Vẫn ở ví dụ ở mục 4, trong trường hợp bạn muốn return ra 1 array mới chứa các object là **uniq theo trường `name`** thì ta làm như sau

```js
const students = [
  {
    name: 'Krunal',
    age: 26,
  },
  {
    name: 'Ankit',
    age: 25,
  },
  {
    name: 'Krunal',
    age: 23,
  },
];
const key = 'name';
const arrayUniqueByKey = [...new Map(students.map((item) => [item[key], item])).values()];

console.log(arrayUniqueByKey); // > Array [Object { name: "Krunal", age: 26 }, Object { name: "Ankit", age: 23 }]
```

***Lưu ý***: sử dụng cách này sẽ pick phần tử trùng lặp ở cuối list, như ví dụ trên array mới sẽ chứa `name='Krunal' và age=23` chứ không phải `name='Krunal' và age=26`

1 ví dụ khác

```js
const myArray = [
  { id: '93', name: '1' },
  { id: '94', name: '2' },
  { id: '93', name: '3' },
  { id: '94', name: '4' },
];

const data = new Map();
for (const obj of myArray) {
  data.set(obj.id, obj);
}

const unique = [...data.values()];
console.log(unique); // > Array [Object { id: "93", name: "3" }, Object { id: "94", name: "4" }]
```

### 6. Định nghĩa mới Array Unique Prototype

Vẫn giữ tư duy cũ đó là lặp qua các phần tử trong mảng và chỉ push vào mảng các phần tử uniq, với vòng lặp `for` truyền thống ta sẽ tạo mới 1 prototype để sử dụng như sau

```js
Array.prototype.unique = function () {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    if (!arr.includes(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};

const ages = [26, 27, 26, 26, 28, 28, 29, 29, 30];
const uniqueAges = ages.unique();
console.log(uniqueAges); // > Array [26, 27, 28, 29, 30]
```


### 7. Sử dụng `reduce()` kết hợp `some()`

```js
const myArray = [
  { id: '93', name: '1' },
  { id: '94', name: '2' },
  { id: '93', name: '3' },
  { id: '94', name: '4' },
];

const unique = myArray.reduce((accumulator, current) => {
  if (!accumulator.some((x) => x.id === current.id)) {
    accumulator.push(current);
  }
  return accumulator;
}, []);

console.log(unique); // > Array [Object { id: "93", name: "1" }, Object { id: "94", name: "2" }]
```

### 8. Sử dụng `filter()` kết hợp `findIndex()`

```js
const myArray = [
  { id: '93', name: '1' },
  { id: '94', name: '2' },
  { id: '93', name: '3' },
  { id: '94', name: '4' },
];
const unique = myArray.filter(
  (value, index, self) => self.findIndex((m) => m.id === value.id) === index,
);

console.log(unique); // > Array [Object { id: "93", name: "1" }, Object { id: "94", name: "2" }]
```

### Kết luận

Trên đây mình đã giới thiệu cho các bạn 1 số cách để lọc ra các giá trị unique trong array, bài viết cũng khá dài rồi có gì chúng ta sẽ gặp lại nhau ở các bài viết khác nhé

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công và hẹn gặp lại ở bài viết sau nhé !