Trong bài viết này, chúng ta sẽ gặp một bộ công cụ được thiết kế để hỗ trợ các thao tác tạo ra sự thay đổi về kiến trúc và phương thức hoạt động của các `object`. Hãy cùng khởi đầu với `object Reflect`.

## Reflect

`Reflect` là một `object`, không phải là một `class` hay một hàm khởi tạo - giống với `Math` mà chúng ta đã từng gặp khi làm việc với các giá trị số học. Các phương thức của `Reflect` đều là `static` và được thiết kế với các tính năng tập trung hỗ trợ cho các tác vụ thay đổi kiến trúc của các `object`.

[`Reflect.apply(target, thisArg, argumentList)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply) - gọi hàm `target` như phương thức của một `object` được truyền vào vị trí `thisArg` và sử dụng mảng chứa các tham số `argumentList`.

```apply.js
var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const addNonduplicate = function(value) {
   var valueExisted = this.includes(value);
   if (valueExisted)
      return this;
   else
      return [...this, value];
}; // addNonduplicate

var newArray = Reflect.apply(addNonduplicate, numberArray, [9]);
console.log(newArray);   // [1, 2, 3, 4, 5, 6, 7, 8, 9]

var newArray = Reflect.apply(addNonduplicate, numberArray, [10]);
console.log(newArray);   // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

[`Reflect.construct(target, argumentList)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct) - ở đây `target` là một `class` không tên nhận được từ nguồn nào đó, và `Reflect.construct` sẽ thay thế cho cách viết `new target(...argumentList)`.

```construct.js
var date = Reflect.construct(Date, ['1990/02/13']);
console.log(date);   // Tue Feb 13 1990 00:00:00 GMT+0700 (Indochina Time)
```

[`Reflect.getOwnPropertyDescriptor(target, propertyKey)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor) - truy vấn `object` mô tả thông tin về thuộc tính `propertyKey` của `target`.

```descriptor.js
var sky = {
   color: 'royalblue',
   age: 1001
};

var ageDescriptor = Reflect.getOwnPropertyDescriptor(sky, 'age');
console.log(ageDescriptor);
// {  
//    value: 1001,         -> giá trị hiện tại của `sky.age`
//    writable: true,      -> có thể gán giá trị
//    enumerable: true,    -> có thể lặp
//    configurable: true   -> có thể xóa
// }
```

[`Reflect.defineProperty(target, proppertyKey, attributes)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty) - định nghĩa hoặc ghi đè một thuộc tính của `target`. Trả về kết quả `true` nếu thao tác được thực hiện thành công, ngược lại trả về `false`.

```define.js
var sky = { color: 'royalblue' };
var ageDescriptor = {
   value: 1001,
   writable: true,
   enumerable: true,
   configurable: true
};
var ageDefined = Reflect.defineProperty(sky, 'age', ageDescriptor);
console.log(ageDefined);   // true
console.log(sky.age);   // 1001
```

[`Reflect.deleteProperty(target, propertyKey)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/deleteProperty) - xóa một thuộc tính của `target`.  Trả về kết quả `true` nếu thao tác được thực hiện thành công, ngược lại trả về `false`.

```delete.js
var sky = {
   color: 'royalBlue',
   age: 1001
};

var ageDeleted = Reflect.deleteProperty(sky, age);
console.log(ageDeleted);   // true
console.log(sky.age);   // ReferenceError: age is not defined
```

[`Reflect.ownKeys(target)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys) - truy vấn tên của tất cả các thuộc tính, bao gồm cả những thuộc tính sử dụng `Symbol` làm khóa truy vấn.

```ownkeys.js
var sky = {
   color: 'royalBlue',
   age: 1001
};

var allKeys = Reflect.ownKeys(sky);
console.log(allKeys);   // ['color', 'age']
```

[`Reflect.has(target, propertyKey)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/has) - kiểm tra sự có mặt của một thuộc tính trong `target`.

```has.js
var sky = {
   color: 'royalBlue',
   age: 1001
};

var skyHasAge = Reflect.has(sky, 'age');
console.log(skyHasAge);   // true
```

[`Reflect.get(target, propertyKey)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/get) - truy xuất giá trị một thuộc tính của `target`.

```get.js
var sky = {
   color: 'royalblue',
   age: 1001
};

var skyAge = Reflect.get(sky, 'age');
console.log(skyAge);   // 1001
```

[`Reflect.set(target, propertyKey, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/set) - gán giá trị `value` cho một thuộc tính của `target`. Trả về kết quả `true` nếu thao tác được thực hiện thành công, ngược lại trả về `false`.

```set.js
var sky = {
   color: 'royalblue',
   age: 1001
};

var succeed = Reflect.set(sky, 'universe', 'tabha');
console.log(succeed);   // true
console.log(sky.universe);   // 'tabha'
```

[`Reflect.preventExtensions(target)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/preventExtensions) - không để `target` có thể mở rộng thêm với thuộc tính mới. Trả về kết quả `true` nếu thao tác được thực hiện thành công, ngược lại trả về `false`.

```prevent.js
var sky = {
   color: 'royalblue',
   age: 1001
};

var prevented = Reflect.preventExtensions(sky);
console.log(prevented);   // true

sky.universe = 'tabha';
console.log(sky);
// { color: 'royalblue', age: 1001 }
```

[`Reflect.isExtensible(target)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/isExtensible) - kiểm tra để biết `target` có thể được bổ sung thuộc tính mới hay không.

```extensible.js
var sky = {
   color: 'royalblue',
   age: 1001
};

var prevented = Reflect.preventExtensions(sky);
console.log(prevented);   // true

var extensible = Reflect.isExtensible(sky);
console.log(extensible);   // false
```

## Proxy

Bên cạnh khả năng chỉnh sửa cấu trúc của một `object` bất kỳ do `Reflect` cung cấp, JavaScript còn có `Proxy` - một `class` được thiết kế để giúp chúng ta tạo ra một lớp vỏ bọc xung quanh `object` ban đầu và thay đổi cách thức tương tác giữa `object` đó và code sử dụng bên ngoài:

- [`new Proxy(target, handler)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy) - Tạo ra một `proxy` bao quanh `target` với các phương thức tương tác được cung cấp bởi `handler`. Ở đây chúng ta có thể viết các phương thức cho `handler` để thay đổi cách thức tương tác giữa `sky` và code sử dụng phía bên ngoài. Một `handler` được JavaScript hỗ trợ định nghĩa với các phương thức cùng tên với các phương thức của `Reflect` và có thể được bổ trợ bởi `Reflect` để có thể tương tác với `sky` linh hoạt hơn.
- - [`handler.get(target, propertyKey)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get) - Tạo ra một phương thức `getter` để cung cấp logic đáp ứng khi code bên ngoài truy xuất tới các thuộc tính của `target`.

```proxy.js
var sky = {
   color: 'royalblue',
   age: 1001
};

var handler = { };

handler.get = function(target, propertyKey) {
   if (propertyKey == 'age')
      return 'Outside of Time and Space';
   else
      return Reflect.get(target, propertyKey);
}; // handler.get

var proxiedSky = new Proxy(sky, handler);
console.log(proxiedSky.age);
// 'Outside of Time and Space';
```

Và dưới đây là danh sách các phương thức của `handler` để chúng ta có thể tạo ra lớp tương tác xung quanh `target` theo ý muốn.

- [`handler.apply(target, thisArg, argumentList)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/apply)
- [`handler.construct(target, argumentList)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/construct)
- [`handler.getOwnPropertyDescriptor(target, propertyKey)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/getOwnPropertyDescriptor)
- [`handler.defineProperty(target, proppertyKey, attributes)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/defineProperty)
- [`handler.deleteProperty(target, propertyKey)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/deleteProperty)
- [`handler.ownKeys(target)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/ownKeys)
- [`handler.has(target, propertyKey)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/has)
- [`handler.get(target, propertyKey)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/get)
- [`handler.set(target, propertyKey, value)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set)
- [`handler.preventExtensions(target)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/preventExtensions)
- [`handler.isExtensible(target)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/isExtensible)

Bài viết giới thiệu về `Reflect & Proxy` của chúng ta đến đây là kết thúc. Trong bài tiếp theo, chúng ta sẽ bắt đầu tìm hiểu sơ lược về các mô hình lập trình `paradigm` phổ biến - được hiểu nôm na là các phong cách định hướng tư duy khi xây dựng phần mềm.

[[JavaScript] Bài 23 - Imperative & Declarative](https://viblo.asia/p/gDVK2r2XKLj)