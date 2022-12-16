Bài viết đc dịch từ: https://medium.freecodecamp.org/9-neat-javascript-tricks-e2742f2735c3

### 1. Clear hoặc truncate một array

Chỉ bằng cách thay đổi length, bạn có thể clear hoặc truncate một array mà ko cần reassign nó.

```js
const arr = [11, 22, 33, 44, 55, 66];
// truncanting
arr.length = 3;
console.log(arr); //=> [11, 22, 33]
// clearing
arr.length = 0;
console.log(arr); //=> []
console.log(arr[2]); //=> undefined
```

### 2. Set giá trị mặc định của parameter với object destructuring

Nhiều khi, bạn cần phải truyển một object với các giá trị mặc định cho một hàm kiểu như:

```js
doSomething({ foo: 'Hello', bar: 'Hey!', baz: 42 });
function doSomething(config) {
  const foo = config.foo !== undefined ? config.foo : 'Hi';
  const bar = config.bar !== undefined ? config.bar : 'Yo!';
  const baz = config.baz !== undefined ? config.baz : 13;
  // ...
}
```

Đây là một cách cũ nhưng hiệu quả. Cách trên vẫn chạy bình thường, tuy nhiên lại dài dòng một cách ko cần thiết. Với object destructuring của es6, bạn có thể viết ngắn gọn lại như sau:

```js
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 }) {
  // ...
}
```

Và kể cả bạn muốn cho object config là optional, điều đó có thể thực hiện dễ dàng bằng cách:

```js
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 } = {}) {
  // ...
}
```

### 3. Object destructuring với phần tử của mảng

Bạn có thể assign các phần tử của mảng tới từng biến riêng biệt bằng cách dùng object destructuring:

```js
const csvFileLine = '1997,John Doe,US,john@doe.com,New York';
const { 2: country, 4: state } = csvFileLine.split(',');
```

### 4. Switch với các khoảng giá trị

Một trick đơn giản để so sánh các khoảng giá trị trong câu lệnh switch:

```js
function getWaterState(tempInCelsius) {
  let state;
  
  switch (true) {
    case (tempInCelsius <= 0): 
      state = 'Solid';
      break;
    case (tempInCelsius > 0 && tempInCelsius < 100): 
      state = 'Liquid';
      break;
    default: 
      state = 'Gas';
  }
  return state;
}
```

### 5. Await nhiều hàm async với async/await

Bạn có thể đợi nhiều hàm async xử lý xong bằng cách sử dụng Promise.all:

```js
await Promise.all([anAsyncCall(), thisIsAlsoAsync(), oneMore()])
```

### 6. Tạo pure object

Bạn có thể tạo một 100% pure object, ko kế thừa bất kì property hay method nào từ Object ( ví dụ constructor, toString() ...)

```js
const pureObject = Object.create(null);
console.log(pureObject); //=> {}
console.log(pureObject.constructor); //=> undefined
console.log(pureObject.toString); //=> undefined
console.log(pureObject.hasOwnProperty); //=> undefined
```

### 7.Format JSON code

JSON.stringify ko chỉ đơn giản là biết một object thành string. Bạn có thể làm đẹp output JSON với nó:

```js
const obj = { 
  foo: { bar: [11, 22, 33, 44], baz: { bing: true, boom: 'Hello' } } 
};

// Tham số thứ 3 là số space để indent output JSON
JSON.stringify(obj, null, 4); 
// =>"{
// =>    "foo": {
// =>        "bar": [
// =>            11,
// =>            22,
// =>            33,
// =>            44
// =>        ],
// =>        "baz": {
// =>            "bing": true,
// =>            "boom": "Hello"
// =>        }
// =>    }
// =>}"
```

### 8. Remove các phần tử bị trùng khỏi mảng

Bằng cách sử dụng Set của ES2015 và spread operator, bạn có thể dễ dàng remove các phần tử trùng nhau trong mảng:

```js
const removeDuplicateItems = arr => [...new Set(arr)];
removeDuplicateItems([42, 'foo', 42, 'foo', true, true]);
//=> [42, "foo", true]
```

### 9. Flatten mảng đa chiều

Bạn có thể dễ dàng flatten một array bằng spread operator:
```js
const arr = [11, [22, 33], [44, 55], 66];
const flatArr = [].concat(...arr); //=> [11, 22, 33, 44, 55, 66]
```

Tuy nhiên, cách trên chỉ hoạt động với mảng 2 chiều. Nhưng bằng cách sử dụng đệ quy, bạn có thể khiến nó hoạt động trên mảng nhiều hơn 2 chiều:

```js
function flattenArray(arr) {
  const flattened = [].concat(...arr);
  return flattened.some(item => Array.isArray(item)) ? 
    flattenArray(flattened) : flattened;
}

const arr = [11, [22, 33], [44, [55, 66, [77, [88]], 99]]];
const flatArr = flattenArray(arr); 
//=> [11, 22, 33, 44, 55, 66, 77, 88, 99]
```