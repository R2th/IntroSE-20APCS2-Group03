Chào các bạn, tiếp tục chuỗi chủ đề về JS hôm nay mình xin chia sẻ tới các bạn một số đoạn snippets hay ho giúp chúng ta tăng hiệu suất công việc, cải thiện chất lượng code. Cùng bắt đầu nhé (go)

![](https://images.viblo.asia/6611729b-963a-4846-9fd5-0f74804be878.png)

### 1. Random phần tử trong array

```js
const random = arr => arr[Math.floor(Math.random() * arr.length)];

console.log(random([3, 7, 9, 11])); // > 3 or 7 or 9 or 11
```

### 2. Làm tròn số thập phân

```js
const round = (n, decimals = 0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

console.log(round(1.005, 2)); // > 1.01
```

### 3. Đảo ngược chuỗi

```js
const reverseString = str => [...str].reverse().join('');

console.log(reverseString('foobar')); // > "raboof"
```

### 4. Random number trong một khoảng giá trị

```js
const randomNumberInRange = (min, max) => Math.random() * (max - min) + min;

console.log(randomNumberInRange(2, 10)); // > 4.461277106397043
```

### 5. Random number *kiểu số nguyên* trong một khoảng giá trị

```js
const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

console.log(randomIntegerInRange(0, 10)); // > 4
```

### 6. Random mã màu hex

```js
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};

console.log(randomHexColorCode()); // > "#346ff8"
```


### 7. Chuyển đổi radian sang deg

```js
const radsToDegrees = rad => (rad * 180.0) / Math.PI;

console.log(radsToDegrees(Math.PI / 2)); // > 90
```

### 8. Tìm phần tử nhỏ nhất trong mảng

```js
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);

console.log(minN([1, 2, 3]));    // > Array [1]
console.log(minN([1, 2, 3], 2)); // > Array [1, 2]
```

### 9. Tìm phần tử lớn nhất trong mảng

```js
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

console.log(maxN([1, 2, 3]));    // > Array [3]
console.log(maxN([1, 2, 3], 2)); // > Array [3, 2]
```

### 10. Tìm min date

```js
const minDate = (...dates) => new Date(Math.min.apply(null, ...dates));

const array = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9),
];

console.log(minDate(array)); // > Sat Jan 09 2016 00:00:00 GMT+0700 (Indochina Time)
```

### 11. Tìm max date

```js
const maxDate = (...dates) => new Date(Math.max.apply(null, ...dates));

const array = [
  new Date(2017, 4, 13),
  new Date(2018, 2, 12),
  new Date(2016, 0, 10),
  new Date(2016, 0, 9),
];

console.log(maxDate(array)); // > Mon Mar 12 2018 00:00:00 GMT+0700 (Indochina Time)
```

### 12. So sánh 2 obj

```js
const matches = (obj, source) =>
  Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key]);

console.log(matches({ age: 25, hair: 'long', beard: true }, { hair: 'long', beard: true })); // > true
console.log(matches({ hair: 'long', beard: true }, { age: 25, hair: 'long', beard: true })); // > false
```

### 13. Validate JSON 

```js
const isValidJSON = str => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

console.log(isValidJSON('{"name":"Adam","age":20}')); // > true
console.log(isValidJSON('{"name":"Adam",age:"20"}')); // > false
console.log(isValidJSON(null));                       // > true
```

### 14. isBrowser

Đoạn mã sau dùng để xác định xem môi trường đang chạy hiện tại có phải là trình duyệt hay không

```js
const isBrowser = () => ![typeof window, typeof document].includes('undefined');

console.log(isBrowser()); // > true (browser)
console.log(isBrowser()); // > false (Node)
```

### 15. So sánh ký tự giữa 2 chuỗi

```js
const isAnagram = (str1, str2) => {
  const normalize = str =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9]/gi, '')
      .split('')
      .sort()
      .join('');
  return normalize(str1) === normalize(str2);
};

console.log(isAnagram('iceman', 'cinema'));  // > true
console.log(isAnagram('iceman', 'cinemal')); // > false
```

### 16. Kiểm tra kiểu dữ liệu

```js
const is = (type, val) => ![, null].includes(val) && val.constructor === type;

is(Array, [1]);                     // true
is(ArrayBuffer, new ArrayBuffer()); // true
is(Map, new Map());                 // true
is(RegExp, /./g);                   // true
is(Set, new Set());                 // true
is(WeakMap, new WeakMap());         // true
is(WeakSet, new WeakSet());         // true
is(String, '');                     // true
is(String, new String(''));         // true
is(Number, 1);                      // true
is(Number, new Number(1));          // true
is(Boolean, true);                  // true
is(Boolean, new Boolean(true));     // true
```

### 17. Tìm phần tử giống nhau giữa 2 mảng

```js
const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};

console.log(intersection([1, 2, 3], [4, 3, 2])); // > Array [2, 3]
```

### 18. Get kiểu dữ liệu

```js
const getType = v =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();

console.log(getType(new Set([1, 2, 3]))); // > "set"
console.log(getType('foo'));              // > "string"
```

### 19. Tính khoảng cách giữa 2 ngày

```js
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

console.log(
  getDaysDiffBetweenDates(
    new Date('2019-01-13'),
    new Date('2019-01-15')
  )
); // > 2
```

### 20. forEachRight

```js
const forEachRight = (arr, callback) =>
  arr
    .slice(0)
    .reverse()
    .forEach(callback);

forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'
```
### Kết luận

Trên đây là 1 vài đoạn snippet nho nhỏ nhưng có võ mình tin rằng sẽ giúp ích cho bạn rất nhiều trong quá trình làm việc với js.

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !