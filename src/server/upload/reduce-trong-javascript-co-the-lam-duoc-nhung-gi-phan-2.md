Hi xin chào các bạn, tiếp tục [Phần 1](https://viblo.asia/p/reduce-trong-javascript-co-the-lam-duoc-nhung-gi-RnB5pW76lPG) bàn về `reduce()` trong JavaScript, trong bài viết hôm nay chúng ta sẽ cùng tìm hiểu xem ẻm này còn có thể làm được những gì nhé. Bắt đầu thôi (go)

![](https://images.viblo.asia/6611729b-963a-4846-9fd5-0f74804be878.png)

### 11. Thay thế `Math.max()`

```js
const Max = (arr = []) => arr.reduce((t, v) => t > v ? t : v)

const arr = [59, 77, 88, 52, 114, 85, 20, 45];
console.log(Max(arr)); // > 114
```

### 12. Thay thế `Math.min()`

```js
const Min = (arr = []) => arr.reduce((t, v) => t < v ? t : v)

const arr = [59, 77, 88, 52, 114, 85, 20, 45];
console.log(Min(arr)); // > 20
```

### 13. Đếm số lượng phần tử giống nhau trong Array

```js
const Count = (arr = []) => arr.reduce((t, v) => (t[v] = (t[v] || 0) + 1, t), {});

const arr = [0, 1, 1, 2, 2, 2, 7, 4, 4, 3, 1];
console.log(Count(arr)); // > Object { 0: 1, 1: 3, 2: 3, 3: 1, 4: 2, 7: 1 }
```

### 14. Chuyển đổi một array object sang object

```js
const people = [
  {
    area: "GTZ",
    name: "ABC",
    age: 30,
  },
  {
    area: "SZR",
    name: "DEF",
    age: 29,
  }
];

const map = people.reduce((t, v) => {
  const { name, ...rest } = v;
  t[name] = rest;
  return t;
}, {});

console.log(map);
// > Object { ABC: Object { area: "GTZ", age: 30 }, DEF: Object { area: "SZR", age: 29 } }
```

### 15. Get value của key một Object cho trước

```js
const GetKeys = (obj = {}, keys = []) =>
  Object.keys(obj).reduce((t, v) => (keys.includes(v) && (t[v] = obj[v]), t), {});

const target = { a: 1, b: 2, c: 3, d: 4 };
const keyword = ["a", "c"];

console.log(GetKeys(target, keyword)); // > Object { a: 1, c: 3 }
```

### 16. Convert object sang params url

```js
const StringifyUrlSearch = (search = {}) =>
  Object.entries(search).reduce(
    (t, v) => `${t}${v[0]}=${encodeURIComponent(v[1])}&`,
    Object.keys(search).length ? "?" : ""
  ).replace(/&$/, "");

const obj = { age: 30, name: "John" };
console.log(StringifyUrlSearch(obj)) // > "?age=30&name=John"
```

### 17. Ngược lại với 16

```js
const ParseUrlSearch = (url = location.search) =>
  url.replace(/(^\?)|(&$)/g, "").split("&").reduce((t, v) => {
    const [key, val] = v.split("=");
    t[key] = decodeURIComponent(val);
    return t;
  }, {});

console.log(ParseUrlSearch('?rlz=1C1GCEA&sclient=psy-ab'));
// > Object { rlz: "1C1GCEA", sclient: "psy-ab" }
```


### 18. Định dạng số thập phân

```js
const ThousandNum = (num = 0) => {
  const str = (+num).toString().split(".");
  const int = nums => nums.split("").reverse().reduceRight((t, v, i) => t + (i % 3 ? v : `${v},`), "").replace(/^,|,$/g, "");
  const dec = nums => nums.split("").reduce((t, v, i) => t + ((i + 1) % 3 ? v : `${v},`), "").replace(/^,|,$/g, "");
  return str.length > 1 ? `${int(str[0])}.${dec(str[1])}` : int(str[0]);
}

console.log(ThousandNum(1234));        // > "1,234"
console.log(ThousandNum(12345967.00)); // > "12,345,967"
console.log(ThousandNum(0.123456));    // > "0.123,456
console.log(ThousandNum(1234.56789));  // > "1,234.567,89"
```

### 19. Tìm kiếm từ khóa trong array

```js
const Keyword = (arr = [], keys = []) =>
  keys.reduce((t, v) => (arr.some(w => w.includes(v)) && t.push(v), t), []);

const arr = [
  "google facebook is big company",
  "google.com",
  "Search the world's information, including webpages, images, videos and more",
];
const keyword = ["javascript", "google", 'words', "lazada", "facebook"];

console.log(Keyword(arr, keyword)); // > Array ["google", "facebook"]
```

### 20. Tách phần tử trong Array theo đúng type of

```js
const Unzip = (arr = []) =>
  arr.reduce(
    (t, v) => (v.forEach((w, i) => t[i].push(w)), t),
    Array.from({
      length: Math.max(...arr.map(v => v.length))
    }).map(v => [])
  );

const arr = [["a", 1, true], ["b", 2, false]];
console.log(Unzip(arr)); // > Array [Array ["a", "b"], Array [1, 2], Array [true, false]]
```

### Kết luận

Qua các ví dụ trên bạn có thể `reduce()` rất tay to phải không nào ;)) cho nên đừng sợ nó nhé, hãy chính phục nó để làm được những điều hay ho hơn

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công !