### 1. Clearing or truncating an array
Một cách dễ dàng để xóa hoặc cắt bớt một mảng mà không cần gán lại nó là bằng cách thay đổi giá trị thuộc tính `length` của nó:
```ruby
const arr = [11, 22, 33, 44, 55, 66];
// truncanting
arr.length = 3;
console.log(arr); //=> [11, 22, 33]
// clearing
arr.length = 0;
console.log(arr); //=> []
console.log(arr[2]); //=> undefined
```
### 2. Simulating named parameters with object destructuring
Rất có thể bạn đã sử dụng các obj config khi bạn cần chuyển một tập hợp các tùy chọn cho một số chức năng, như sau:
```ruby
doSomething({ foo: 'Hello', bar: 'Hey!', baz: 42 });
function doSomething(config) {
  const foo = config.foo !== undefined ? config.foo : 'Hi';
  const bar = config.bar !== undefined ? config.bar : 'Yo!';
  const baz = config.baz !== undefined ? config.baz : 13;
  // ...
}
```

Đây là một pattern cũ, trong đó cố gắng mô phỏng các tham số được đặt tên trong JavaScript. Các function gọi có vẻ tốt. Mặt khác, logic xử lý đối tượng cấu hình là dài dòng không cần thiết. Với việc phá hủy đối tượng ES2015, bạn có thể tránh được nhược điểm này:
```ruby
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 }) {
  // ...
}
```
Và nếu bạn config 1 số opption, bạn có thể:
```ruby
function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 } = {}) {
  // ...
}
```
### 3. Object destructuring for array items
Gán object với một mảng.
```ruby
const csvFileLine = '1997,John Doe,US,john@doe.com,New York';
const { 2: country, 4: state } = csvFileLine.split(',');

# { 2: country, 4: state } ----------->  { 2: country, 4: state }
```
### 4. Await multiple async functions with async/await
Nó có thể `await` nhiều chức năng không đồng bộ để kết thúc bằng cách sử dụng `Promise.all`
```ruby
await Promise.all([anAsyncCall(), thisIsAlsoAsync(), oneMore()])
```
### 5. Creating pure objects
Bản có thể tạo 100% object thuần túy. Cái mà không muốn kế thừa một số method từ `Object` (ví dụ `constructor`, `toString()`,...).
```ruby
console.log(pureObject); //=> {}
console.log(pureObject.constructor); //=> undefined
console.log(pureObject.toString); //=> undefined
console.log(pureObject.hasOwnProperty); //=> undefined
```
### 6.Formatting JSON code
Bạn có thể làm đẹp đầu ra của object bằng cách.
```ruby
const obj = { 
  foo: { bar: [11, 22, 33, 44], baz: { bing: true, boom: 'Hello' } } 
};
---------Output--------
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
### 7. Removing duplicate items from an array
Bằng cách sử dụng ES2015 bạn có thể dễ dàng xóa items bị trùng lặp trong mảng:
```ruby
const removeDuplicateItems = arr => [...new Set(arr)];
removeDuplicateItems([42, 'foo', 42, 'foo', true, true]);
//=> [42, "foo", true]
```
### 8. Flattening multidimensional arrays
Flattent mảng con trong 1 mảng.
```ruby
const arr = [11, [22, 33], [44, 55], 66];
const flatArr = [].concat(...arr); //=> [11, 22, 33, 44, 55, 66]
```
Nhưng với cách trên nó chỉ hoạt động với mảng 2 chiều. Nhưng nếu sử dụng đê quy chúng ta có thể mở rộng nó hơn:
```ruby
function flattenArray(arr) {
  const flattened = [].concat(...arr);
  return flattened.some(item => Array.isArray(item)) ? 
    flattenArray(flattened) : flattened;
}

const arr = [11, [22, 33], [44, [55, 66, [77, [88]], 99]]];
const flatArr = flattenArray(arr); 
//=> [11, 22, 33, 44, 55, 66, 77, 88, 99]
```
### Related
https://medium.freecodecamp.org/9-neat-javascript-tricks-e2742f2735c3