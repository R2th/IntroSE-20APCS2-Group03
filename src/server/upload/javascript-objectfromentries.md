Như các bạn đã biết, chúng ta có thể convert một `object` thành 1 `array` bằng cách xử dụng `Object.entries()` hoặc `Object.values()`. Tuy nhiên rất ít bạn để ý rằng js cung cấp sẵn cho chúng ta phương thức để convert array → object, `Object.fromEntries()`

Cú pháp của `Object.fromEntries()` khá là đơn giản.
```js
const keyValuePair = [
  ['cow', '🐮'],
  ['pig', '🐷'],
];
Object.fromEntries(keyValuePair);
// { cow: '🐮', pig: '🐷' }
```

## Object.fromEntries
Như các bạn đã biết, 1 object sẽ chứa các cặp `key` - `value`
```js
const object = {
  key: 'value',
};
```

Vậy nên, để convert một kiểu giá trị thành một object, bạn cần truyền vào một giá trị có `format` tương đương với `key` - `value`
Đáp ứng với kiểu format `key` - `value`, chúng ta có 2 kiểu dữ liệu đáp ứng được:
- `Nested Array` với các cặp `key` - `value`
- Map objects

## Array → Object
Dưới đây là ví dụ về  convert `Nested Array` với các cặp `key` - `value` thành `Object`
```js
let nestedArray = [
  ['key 1', 'value 1'],
  ['key 2', 'value 2'],
];
Object.fromEntries(nestedArray);
// { key 1: "value 1", key 2: "value 2"}


// Thừa dữ liệu
let nestedArray = [
  ['key 1', 'value 1', 'ext'],
  ['key 2', 'value 2'],
];
Object.fromEntries(nestedArray);
// { key 1: "value 1", key 2: "value 2"}


// Thiếu dữ liệu
let nestedArray = [
  ['key 1', 'value 1', 'ext'],
  ['key 2', 'value 2'], 
  ['key'],
];
Object.fromEntries(nestedArray);
// {key 1: "value 1", key 2: "value 2", key: undefined}
```

## Map → Object
Từ version ES6, chúng ta có thêm 1 kiểu dữ liệu gọi là `map`, nó `rất tương tự` với object

> TC39: Map objects are collections of key/value pairs where both the keys and values may be arbitrary ECMAScript language values.


```js
// Using the constructor
const map = new Map([
  ['key 1', 'value 1'],
  ['key 2', 'value 2'],
]);

// OR we can use the instance method, "set"
const map = new Map();
map.set('key 1', 'value 1');
map.set('key 2', 'value 2');
// RESULT
// Map(2) {"key 1" => "value 1", "key 2" => "value 2"}

Object.fromEntries(map);
// { key 1: "value 1", key 2: "value 2"}
```

## TypeError for Object.fromEntries

Khi bạn truyền một kiểu giá trị không có `format` key-value thì nó sẽ trả về 1 error `❌ Uncaught TypeError`
| Type  |    |
|---|---|
| Null | Object.fromEntries(null) |
| Boolean | Object.fromEntries(true) |
| Number | Object.fromEntries(100) |
| String | Object.fromEntries("hi") |
| Object | Object.fromEntries({key: "value"}) |
| Single Value Array | Object.fromEntries([1,2,3]) |


## Object.fromEntries vs Object.entries
Dự vào tên của 2 phương thức này, chúng ta cũng có thể thấy cách hoạt động của 2 thằng `Object.fromEntries` và `Object.entries` hoàn toàn trái ngược. `Object.entries` sẽ chuyển đổi object và trả lại cho chúng ta một `nested array` mới với các cặp `key-value`. Và `Object.fromEntries` sẽ chuyển nó trở lại một `object`.

```js
const object = { key1: 'value1', key2: 'value2' };

const array = Object.entries(object);
// [ ["key1", "value1"], ["key2", "value2"] ]

Object.fromEntries(array);
// { key1: 'value1', key2: 'value2' }
```

## Motivating examples
### Object-to-object transformations
Nếu bạn đã quen với và muốn sử dụng các phương thức của array như `filter`, `map` mà đầu vào của bạn đang là `object` thì sao? 
```js
const obj = { abc: 1, def: 2, ghij: 3 };
const res = Object.fromEntries(
    Object.entries(obj)
        .filter(([ key, val ]) => key.length === 3)
        .map(([ key, val ]) => [ key, val * 2 ])
);

// res is { 'abc': 2, 'def': 4 }
```

### Object from existing collection

```js
const map = new Map([ [ 'a', 1 ], [ 'b', 2 ], [ 'c', 3 ] ]);
// Map(3) {"a" => 1, "b" => 2, "c" => 3}

const obj = Object.fromEntries(map);
// {a: 1, b: 2, c: 3}

// compare existing functionality: new Map(Object.entries(obj))
new Map(Object.entries(obj))
// Map(3) {"a" => 1, "b" => 2, "c" => 3}
```

Một ứng dụng khá hay của `Object.fromEntries` vào việc parse các param trên url

```js
const query = Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'));
// {foo: "bar", baz: "qux"}

## Alternative Solutions to Convert Array → Object
`Object.fromEntries` khá là mới, nó được được giới thiệu năm 2019.
```

Vậy trước khi có `Object.fromEntries`, các bạn convert Array → Object như thế nào?

Dưới đây là 1 cách đơn giản và thường được dùng để convert `map`, `array` thành một `object`
```js
const array = [
  ['key1', 'value1'],
  ['key2', 'value2'],
];
const map = new Map([
  ['key1', 'value1'],
  ['key2', 'value2'],
]);
function toObject(pairs) {
  return Array.from(pairs).reduce(
    (acc, [key, value]) => Object.assign(acc, { [key]: value }),
    {},
  );
}
toObject(array);
// { key1: 'value1', key2: 'value2' }

toObject(map);
// { key1: 'value1', key2: 'value2' }
```