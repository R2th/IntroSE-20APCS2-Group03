`Map` là một trong những cấu trúc dữ liệu được sử dụng thường xuyên nhất trong lập trình. Nó giữ các cặp `khóa - giá trị` có thể dễ dàng truy cập bằng các khóa của chúng.
Trong JavaScript, chúng ta có thể tạo ra một `map` một cách đơn giản bằng cách sử dụng một object `{}`. Ví dụ:

```js
const map = {};

// insert key-value-pair
map['key1'] = 'value1';
map['key2'] = 'value2';
map['key3'] = 'value3';

// check if map contians key
if (map['key1']) {
    console.log('Map contains key1');
}

// get value with specific key
console.log(map['key1']);
```

Khá là đơn giản đúng không? Chính vì nó đơn giản nên chúng ta sử dụng nó thường xuyên mà quên đi kiểu dữ liệu mà JavaScript đã tạo sẵn cho chúng ta `Map`.

Ơ cơ mà, `object` đơn giản, dễ dùng hơn? tại sao lại phải dùng `Map` :question:

## 1. Key types
Đối với một object, `key` bị giới hạn trong chuỗi hoặc số.
Còn với `Map`, chúng ta có nhiều lựa chọn hơn như object, function hay các giá trị nguyên thủy

```js
const map = new Map();
const myFunction = () => console.log('I am a useful function.');
const myNumber = 666;
const myObject = {
    name: 'plainObjectValue',
    otherKey: 'otherValue'
};
map.set(myFunction, 'function as a key');
map.set(myNumber, 'number as a key');
map.set(myObject, 'object as a key');

console.log(map.get(myFunction)); // function as a key
console.log(map.get(myNumber)); // number as a key
console.log(map.get(myObject)); // object as a key
```

## 2. Better Size Determination
Với một map dạng `object`. Cách chúng ta thường dùng để xác định kích thước của nó là tính size của `keys` hoặc` values` của object đó. Còn đối với `Map`, chúng ta chỉ cần dùng hàm `size()` là xong.

Đối với `Map`, độ phức tạp để xác định size của nó `có thể` là `O(1)`, còn với object thì luôn là `O(n)`

```js
const map = new Map();
map.set('someKey1', 1);
map.set('someKey2', 1);
...
map.set('someKey100', 1);

console.log(map.size) // 100, Runtime: O(1)

const plainObjMap = {};
plainObjMap['someKey1'] = 1;
plainObjMap['someKey2'] = 1;
...
plainObjMap['someKey100'] = 1;

console.log(Object.keys(plainObjMap).length) // 100, Runtime: O(n)
```

## 3. Better Performance
`Map` được tối ưu hóa để thường xuyên thêm / xóa các phần tử. Vậy nên hiển nhiên nó sẽ có hiệu năng tốt hơn object.
Tuy nhiên, khi dữ liệu chưa đủ nhiều thì object sẽ cho hiệu năng tốt hơn

## 4. Direct Iteration
Cách mà chúng ta thường dùng để duyệt 1 map dạng object là duyệt theo `keys` của object đó.
Còn đối với `Map`, chúng ta có thể duyệt `trực tiếp`
```js
const map = new Map();
map.set('someKey1', 1);
map.set('someKey2', 2);
map.set('someKey3', 3);

for (let [key, value] of map) {
  console.log(`${key} = ${value}`);
}
// someKey1 = 1
// someKey2 = 2
// someKey3 = 3

const plainObjMap = {};
plainObjMap['someKey1'] = 1;
plainObjMap['someKey2'] = 2;
plainObjMap['someKey3'] = 3;

for (let key of Object.keys(plainObjMap)) {
  const value = plainObjMap[key];
  console.log(`${key} = ${value}`);
}
// someKey1 = 1
// someKey2 = 2
// someKey3 = 3
```

## 5. Key Order
Trước phiên bản `ECMAScript 2015`, `keys` của mỗi object không được đảm bảo theo bất kỳ thứ tự cụ thể nào. Bạn có thể thêm 1 phần tử ở vị trí 10 trong khi vị trí 9 chưa có phần tử nào. 
Còn đối với `Map`, thứ tự của các phần tử được xác định đúng theo thứ tự mà nó được thêm vào `Map`.

## 6. No Key Overriding
Một object mặc định sẽ có một vài `keys` theo `prototype` của nó. Vậy nên có thể xảy ra xung đột giữa `keys` đã có sẵn trong object với key của bạn (xem tại ví dụ phía dưới)
Đối với `Map`, nó không có một `keys` mặc định nào cả nên sẽ không xảy ra trường hợp này

```js
const map = new Map();
map.set('someKey1', 1);
map.set('someKey2', 2);
map.set('toString', 3); // No problem for Map

const plainObjMap = new Map();
plainObjMap['someKey1'] = 1;
plainObjMap['someKey2'] = 2;
plainObjMap['toString'] = 3; // Oops, native property
```


******
Nguồn: https://medium.com/better-programming/stop-using-objects-as-hash-maps-in-javascript-9a272e85f6a8