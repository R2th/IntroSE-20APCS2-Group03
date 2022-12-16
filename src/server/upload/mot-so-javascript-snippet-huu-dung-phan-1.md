Hôm nay mình sẽ viết một sersie nho nhỏ về một số đoạn snippets trong JS và mong nó sẽ giúp ích cho mọi người. Cùng tìm hiểu nhé!:grin:

### 1. all
Kiểm tra các phần tử trong mảng có thỏa mãn điểu kiện đã cho không (fn). Khi không truyền tham số thứ 2, mặc định fn = true
```php
const all = (arr, fn = Boolean) => arr.every(fn);

all([4, 2, 3], x => x > 1); // true
all([1, 2, 3], x => x > 1); // false
all([1, 2, 3]); // true
```
### 2. allEqual
Kiểm tra các phần tử trong mảng có bằng nhau không
```php
const allEqual = arr => arr.every(val => val === arr[0]);

allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
```
### 3. approximatelyEqual
Kiểm tra hai số đã cho có xấp xỉ bằng nhau không với 1 sai số nhất định
```php
const approximatelyEqual = (n1, n2, epsilon = 0.001) => Math.abs(n1 - n2) < epsilon;

approximatelyEqual(Math.PI / 2.0, 1.5708); // true
approximatelyEqual(2, 1.5708); // false
approximatelyEqual(2, 1.5708, 1); // true
```
### 4. arrayToCSV
Convert các phần tử thành chuỗi với các giá trị được phân tách bằng dấu phẩy.
```php
const arrayToCSV = (arr, delimiter = ',') =>
  arr.map(val => val.map(item => `"${item}"`).join(delimiter)).join('\n');

arrayToCSV([['a', 'b'], ['c', 'd']]); // '"a","b"\n"c","d"'
arrayToCSV([['a', 'b'], ['c', 'd']], ':'); // '"a":"b"\n"c":"d"'
```
### 5. attempt
Thực thi một hàm, trả về kết quả hoặc error object đã bắt được.
```php
const attempt = (fn, ...args) => {
  try {
    return fn(...args);
  } catch (e) {
    return e instanceof Error ? e : new Error(e);
  }
};

const elements = attempt(function(selector) {
  return document.querySelectorAll(selector);
}, '>_>');

if (elements instanceof Error) elements = []; // elements = []
```
### 6. average
Trả về giá trị trung bình của hai hay nhiều phân tử
```php
const average = (...nums) => nums.reduce((acc, val) => acc + val, 0) / nums.length;

average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2
```
```
```
### 7. averageBy
Trả về giá trị trung bình của một mảng.
```php
const averageBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => acc + val, 0) /
  arr.length;

averageBy([{ x: 1 }, { x: 2 }, { n: 3 }, { n: 4 }], item => item.x); // 2.5
averageBy([{ x: 1 }, { x: 2 }, { n: 3 }, { n: 4 }], 'x'); // 2.5
```
### 8. bottomVisible
Kiểm tra xem cuối trang có hiển thị hay không.
```php
const bottomVisible = () => document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight);

bottomVisible(); // true
```
### 9. byteSize
Trả về độ dài của một chuỗi được tính bằng byte.
```php
const byteSize = str => new Blob([str]).size;

byteSize('😍'); // 4
byteSize('Viblo May fest'); // 14
```
### 10. capitalize
Viết hoa chữ cái đầu tiên của một chuỗi.
```php
const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('');

capitalize('vibloMayFest'); // 'VibloMayFest'
```
### 11. capitalizeEveryWord
Viết hoa chữ cái đầu tiên của mỗi từ trong một chuỗi.
```php
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());

capitalizeEveryWord('viblo may Fest'); // 'Viblo May Fest'
```
### 12. castArray
Convert một giá trị không phải mảng thành mảng.
```php
const castArray = val => (Array.isArray(val) ? val : [val]);

castArray('viblo'); // ['viblo']
castArray([1]); // [1]
```
### 13. compact
remove những giá trị false ra khỏi một mảng.
```php
const compact = arr => arr.filter(Boolean);

compact([0, 1, false, 2, '', 'a', 'e' * 23, NaN, 100]);  // [1, 2, "a", 100]
```

### 14. countOccurrences
Đếm số lần xuất hiện của một giá trị trong một mảng.
```php
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

countOccurrences([1, 2, 2, 1, 3, 3, 2, 4], 1); // 2
```
### 15. Create Directory
Kiểm tra thư mục đã tồn tại hay chưa. Nếu chưa sẽ tạo thư mục
```php
const fs = require('fs');
const createDirIfNotExists = dir => (!fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined);

createDirIfNotExists('test'); // tạo thư mục 'test' nếu nó chưa tồn tại
```

### 16. currentURL
Trả về đường dẫn hiện tại (cái này chắc ai cũng biết r:sweat_smile:)
```php
const currentURL = () => window.location.href;

currentURL(); // 'https://viblo.asia/followings'
```
### 17. decapitalize
Covert chữ cái đầu tiên thành chữ thường trong 1 chuỗi.
```php
const decapitalize = ([first, ...rest]) => first.toLowerCase() + rest.join('')

decapitalize('Viblo May Fest'); // 'viblo May Fest'
```
### 18. deepFlatten
Làm phẳng một mảng bằng cách sử dụng đệ quy.
```php
const deepFlatten = arr => [].concat(...arr.map(val => (Array.isArray(val) ? deepFlatten(val) : val)));

deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
```
### 19. defer
Thực thi sau cùng, các fuction khác sẽ được gọi trước hàm này.
```php
const defer = (fn, ...args) => setTimeout(fn, 1, ...args);

defer(console.log, 'a'), console.log('b'), console.log('c'); 
// log của 'b', 'c' thực thi trước sau đó mới đến 'a'
```
### 20. degreesToRads
Chuyển đổi từ độ sang radian (cái này chắc ít dùng :smile:)
```php
const degreesToRads = deg => (deg * Math.PI) / 180.0;

degreesToRads(45); // ~0.7854
```

Bài vẫn còn tiếp. Hẹn mọi người ở [phần 2](https://viblo.asia/p/mot-so-javascript-snippet-huu-dung-phan-2-Qbq5QEWG5D8) nhé!

Thanks for reading:sparkling_heart: