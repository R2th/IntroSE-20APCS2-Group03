#### Array là một phần không thể thiếu trong các dự án javascript, vì vậy hôm nay mình xin giới thiệu một số array methods phổ biến thường dùng.

### 1. forEach
`forEach` method thực thi một callback function mỗi khi lặp qua các array elements.

Ví dụ sau đây log ra tất cả array elements:
```js
const characters = ['a', 'b', 'c', 'd'];
characters.forEach((element, index) => console.log(`${index}: ${element}`));

/* 
    0: a
    1: b
    2: c
    3: d
*/
```

### 2. map
`map` method tạo một array mới bằng cách thực thi một callback function mỗi khi lặp qua các array elements.
> `map` method không làm thay đổi array gốc

Ví dụ sau đây tạo một array mới với mỗi element được công thêm 10 từ array `numbers`:
```js
const numbers = [3, 6, 4, 5];
const mappedNumbers = numbers.map((element, index) => element + 10);
console.log(mappedNumbers);

/* [13, 16, 14, 15] */
```

### 3. filter
`filter` method tạo một array mới với các elements passed điều kiện của callback function mỗi khi lặp qua các array elements.

> `filter` method không làm thay đổi array gốc

Ví dụ sau đây tạo một array mới gồm những users tên 'Harry':
```js
const users = [
  { id: 1, name: "Harry" },
  { id: 2, name: "Jim" },
  { id: 3, name: "Harry" },
  { id: 4, name: "Kean" },
]

const filteredUsers = users.filter((element, index) => element.name === 'Harry');
console.log(filteredUsers);

/*
    0: { id: 1, name: "Harry" }
    1: { id: 3, name: "Harry" }
*/
```

### 4. find
`find` method lặp qua array elements và trả về element đầu tiên passed điều kiện của callback function, nếu không tìm thấy element nào thoả mản trả về `undefined`.

> `find` method không làm thay đổi array gốc

Ví dụ sau đây tìm user đầu tiên có tên 'Harry' trong  mảng users:
```js
const users = [
  { id: 1, name: "Harry" },
  { id: 2, name: "Jim" },
  { id: 3, name: "Harry" },
  { id: 4, name: "Kean" },
]

const harry = users.find((element, index) => element.name === 'Harry');
console.log(harry);

/*
    { id: 1, name: "Harry" }
*/
```

### 5. findIndex
`findIndex` method lặp qua array elements và trả về index của element đầu tiên passed điều kiện của callback function, nếu không tìm thấy element nào thoả mản trả về `-1`.

> `findIndex` method không làm thay đổi array gốc

Ví dụ sau đây tìm index của user đầu tiên có tên 'Harry' trong  mảng users:
```js
const users = [
  { id: 1, name: "Harry" },
  { id: 2, name: "Jim" },
  { id: 3, name: "Harry" },
  { id: 4, name: "Kean" },
]

const harryIndex = users.findIndex((element, index) => element.name === 'Harry');
console.log(harryIndex);

/*
   0
*/
```

### 6. some
`some` method dùng để kiểm tra trả về `true` nếu ít nhất một element thoả mản điều kiện của callback function, ngược lại trả về `false` nếu không có element nào thoả màn điều kiện.

> `some` method không làm thay đổi array gốc

Ví dụ sau đây kiểm tra xem trong mảng characters có chứa kí tự 'c' hay không:
```js
const characters = ['a', 'b', 'c', 'd'];
const checked = characters.some((element, index) => element === 'c');
console.log(checked);

/*
   true
*/
```

### 7. every
`every` method dùng để kiểm tra trả về `true` nếu  tất cả element đều thoả mản điều kiện của callback function, ngược lại trả về `false` nếu có ít nhất một element không thoả màn điều kiện.

> `every` method không làm thay đổi array gốc

Ví dụ sau đây kiểm tra xem trong mảng characters không chứa kí tự 'e':
```js
const characters = ['a', 'b', 'c', 'd'];
const checked = characters.every((element, index) => element !== 'e');
console.log(checked);

/*
   true
*/
```

### 8. sort
`sort` method thực hiện sắp xếp các elements theo thứ tự tăng dần, ta có thể truyền vào một compare callback function để custom thứ tự sort.

> `sort` method sẽ làm thay đổi array gốc

Ví dụ sort:
```js
const numbers = [3, 6, 4, 5];

numbers.sort()
console.log(numbers);
/*
   [3, 4, 5, 6]
*/
numbers.sort((a, b) => a - b)
console.log(numbers);
/*
   [3, 4, 5, 6]
*/
numbers.sort((a, b) => b - a)
console.log(numbers);
/*
   [6, 5, 4, 3]
*/
```

### 9. reverse
`reverse` method đảo ngược thứ tự của array elements.

> `reverse` method sẽ làm thay đổi array gốc

Ví dụ reverse:
```js
const characters = ['a', 'b', 'c', 'd'];
characters.reverse();
console.log(characters);
/*
   ["d", "c", "b", "a"]
*/
```

### 10. concat
`concat` method trả về một array mới bằng cách merged tất cả elements của các arrays lại với nhau.

> `concat` method không làm thay đổi array gốc

Ví dụ reverse:
```js
const numbers1 = [1, 2, 3];
const numbers2 = [4, 5, 6];
const numbers3 = [7, 8, 9];
const numbers = numbers1.concat(numbers2, numbers3);
console.log(numbers);
/*
   [1, 2, 3, 4, 5, 6, 7, 8, 9]
*/
```

### Kết luận
Trên đây là những array methods hay dùng, mình hy vọng sẽ giúp cho những bạn mới làm quen sẽ hiểu rõ hơn và sử dụng hiệu quả array trong javascript. Cám ơn mọi người đã đọc bài viết.