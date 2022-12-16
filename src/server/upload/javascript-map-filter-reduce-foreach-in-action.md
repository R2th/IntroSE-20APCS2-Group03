`Array` là một phần rất quan trọng trong bất kỳ một ngôn ngữ nào, và `javascript` cũng không ngoại lệ, bài hôm nay mình xin giới thiệu lại một số methods cơ bản hay dùng nhưng cũng rất dễ nhầm lẫn trong mục đích sử dụng. Đó là `.map` `.filter` `.reduce` `.forEach`; Mình hy vọng đây là bài so sánh cụ thể và dễ hiểu cho các bạn mới làm quen với `array` . Bắt đầu nào!

(Bài này chỉ focus vào mục đích sử dụng và so sánh giữa các methods trên chứ không đi xâu giải thích về các tham số đầu vào)
# .map
##### Mục đích: 
Tạo một `array` mới với kết quả: là sau khi lặp qua và thực hiện thao tác tính toán trên mỗi phần tử của `array` ban đầu.

##### Điểm lưu ý:
- Trả về một array mới có **length bằng với length** của array ban đầu.
- Trả về một array mới với các phần tử bên trong **đã biến đổi** (đây là giá trị trả về của `callback function` trong `.map`).
- `.map` sẽ không làm thay đổi array ban đầu.
##### Example:
```js
const beforeColors = ["red", "blue", "green", "black"]

const afterColors = beforeColors.map((item, index) => `hello ${item}`)

console.log('beforeColors', beforeColors)
// beforeColors ["red", "blue", "green", "black"]

console.log('afterColors', afterColors)
// afterColors ["hello red", "hello blue", "hello green", "hello black"]
```

# .filter
##### Mục đích: 
Tạo một `array` mới với kết quả là: lặp qua và chỉ trả vể các phần tử pass điều kiện filter.
##### Điểm lưu ý:
- `Callback function` luôn trả về các giá trị `truthy, falsy`
- Trả về một array mới có **length nhỏ hơn hoặc bằng với length** của array ban đầu.
- Value của các phần tử sau khi filter sẽ **không biến đổi**.
- `.filter` sẽ không làm thay đổi array ban đầu.
##### Example:
```js
const beforeColors = ["red", "blue", "green", "black"];

const afterColors = beforeColors.filter((item, index) => item.startsWith("b"));

console.log('beforeColors', beforeColors);
// beforeColors ["red", "blue", "green", "black"]

console.log('afterColors', afterColors);
// afterColors ["blue", "black"]
```

# .reduce
##### Mục đích: 
Trả về một `data` mới với kết quả: là sau khi lặp qua và thực hiện thao tác tính toán trên mỗi lần lặp.
##### Điểm lưu ý:
- Trả về một data`(object, array, string, ...)` mới so với `array` ban đầu.
- `.reduce` sẽ không làm thay đổi array ban đầu.
##### Example 1: biến đổi thành một array mới
```js
const beforeColors = ["red", "blue", "green", "black"];

const afterColors = beforeColors.reduce((currentColors, item, index) => {
  if (item.startsWith("b")) {
    return [...currentColors, `hello ${item}`];
  }
  return currentColors;
}, []);

console.log('beforeColors', beforeColors);
// beforeColors ["red", "blue", "green", "black"]

console.log('afterColors', afterColors);
// afterColors ["hello blue", "hello black"]
```

##### Example 2: biến đổi thành một object mới
```js
const beforeColors = ["red", "blue", "green", "black"];

const afterColorObj = beforeColors.reduce((currentColors, item, index) => {
  if (item.startsWith("b")) {
    return {
      ...currentColors,
      [`color_${item}`]: `hello ${item}`,
    };
  }
  return currentColors;
}, {});

console.log('beforeColors', beforeColors);
// beforeColors ["red", "blue", "green", "black"]

console.log('afterColorObj', afterColorObj);
// afterColorObj {color_blue: "hello blue", color_black: "hello black"}
```

##### Example 3: biến đổi thành một string mới
```js
const beforeColors = ["red", "blue", "green", "black"];

const afterColorStr = beforeColors.reduce((currentColors, item, index) => {
  return `${currentColors} ${item}`;
}, '');

console.log('beforeColors', beforeColors);
// beforeColors ["red", "blue", "green", "black"]

console.log('afterColorStr', afterColorStr);
// afterColorStr "red blue green black "
```
# .forEach
##### Mục đích: 
Dùng để lặp qua các phần tử của một `array` và thực hiện thao tác xử lý qua mỗi lần lặp (tương tự vòng lặp `for`).
##### Điểm lưu ý:
- Method này không trả về một array mới.
- Không làm thay đổi array ban đầu, chỉ đơn giản là lặp qua và thực hiện xử lý bên trong mỗi lần lặp.

##### Example:
```js
const beforeColors = ["red", "blue", "green", "black"]

const afterColors = beforeColors.forEach((item, index) => {
  // logic here
  return item;
})

console.log('beforeColors', beforeColors)
// beforeColors ["red", "blue", "green", "black"]

console.log('afterColors', afterColors)
// afterColors undefined
```

### Noted thêm về .forEach
!!! `.forEach` là method lặp tổng quát của `array` và có thể dùng để thay thế bất kỳ các methods ở trên (`.map` `.filter` `.reduce`)

##### Ví dụ .forEach thay thế .map
```js
const beforeColors = ["red", "blue", "green", "black"];
const afterColors = [];
beforeColors.forEach((item, index) => {
  afterColors.push(`hello ${item}`);
})

console.log('beforeColors', beforeColors);
// beforeColors ["red", "blue", "green", "black"]

console.log('afterColors', afterColors);
// afterColors ["hello red", "hello blue", "hello green", "hello black"]
```

##### Ví dụ .forEach thay thế .filter
```js
const beforeColors = ["red", "blue", "green", "black"];
const afterColors = [];
beforeColors.forEach((item, index) => {
  if (item.startsWith("b")) {
    afterColors.push(item);
  }
})

console.log('beforeColors', beforeColors);
// beforeColors ["red", "blue", "green", "black"]

console.log('afterColors', afterColors);
// afterColors ["blue", "black"]
```

##### Ví dụ .forEach thay thế .reduce
```js
const beforeColors = ["red", "blue", "green", "black"];
const afterColors = [];
beforeColors.forEach((item, index) => {
  if (item.startsWith("b")) {
    afterColors.push(`hello ${item}`);
  }
})

console.log('beforeColors', beforeColors);
// beforeColors ["red", "blue", "green", "black"]

console.log('afterColors', afterColors);
// afterColors ["hello blue", "hello black"]
```

# Summary
Kết lại thì mình sẽ đưa ra các điều kiện để chọn method phù hợp từng bài toán như sau:

-  `.map`: không thay đổi length; thay đổi value mỗi phần tử; call back function trả về phần tử mới.
-  `.filter`: thay đổi length; không thay đổi value mỗi phần tử; call back function trả về giá trị `truthy, falsy`.
-  `.reduce`: biến đổi thành data mới với bất kỳ kiểu nào; `.reduce` là sự kết hợp giữa `.map` và `.filter`.
-  `.forEach`: có thể dùng cho tất cả các trường hợp, nhưng hãy luôn luôn nghĩ đến `.map` `.filter` `.reduce` trước khi nghĩ đến `.forEach`.

Cám ơn mọi người đã đọc bài viết, chúc mọi người một ngày tốt lành!