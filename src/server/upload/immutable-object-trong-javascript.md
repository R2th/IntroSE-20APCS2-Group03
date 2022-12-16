![](https://images.viblo.asia/e9ac4be5-57cc-424b-91ca-116e3f473547.jpg)
## Giới thiệu
Thông thường, `object` trong `JavaScript` là `mutable` – nghĩa là trạng thái của `object` có thể thay đổi được. Tuy nhiên, có nhiều trường hợp bạn mong muốn `object` đó là `immutable` – trạng thái không thể thay đổi được. Bài viết này sẽ giới thiệu với bạn một vài cách tạo `immutable` object trong `JavaScript`.

## Sử dụng Object.defineProperty
Phương thức [Object.defineProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) định nghĩa một thuộc tính mới trên object hoặc sửa đổi thuộc tính có sẵn trên object.

Cú pháp:
```js
/**
 * @param obj: Đối tượng để xác định thuộc tính
 * @param prop: Tên của thuộc tính được xác định hoặc sửa đổi.
 * @param descriptor: Bộ mô tả cho thuộc tính đang được xác định hoặc sửa đổi.
 *
 * @return Đối tượng được truyền cho hàm.
 */
Object.defineProperty(obj, prop, descriptor)
```

**Note**: Bạn gọi phương thức này trực tiếp trên `constructor` của `Object` (viết hoa nhé) chứ không phải trên một `instance` của Object.

Để tạo một `immutable` object sử dụng `Object.defineProperty`, bạn chỉ cần định nghĩa property với `writable` là `false`.

```javascript
const object1 = {};

Object.defineProperty(object1, 'property1', {
    value: 42,
    writable: false
});

object1.property1 = 77;
// throws an error in strict mode

console.log(object1.property1);
// expected output: 42
```

Bạn có thể thấy gía trị của `object1.property1` không thay đổi so với giá trị ban đầu mặc dù bạn đã gán lại giá trị cho nó. Ngoài ra, gía trị mặc định của `writable` là false nên bạn có thể bỏ qua thuộc tính này.

```javascript
const object1 = {};

Object.defineProperty(object1, 'property1', { value: 42 });

object1.property1 = 77;

console.log(object1.property1); // output: 42
```

#### Vậy mình muốn biến `immutable` object thành `mutable` object thì sao?

Do giá trị mặc định của `configurable` ([description](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Description)) nên bạn không thể gán lại giá trị cho `writable` sau lần `define` đầu tiên (*nếu chưa set giá trị cho `configurable` thành true*)

```js
let obj = {};
Object.defineProperty(obj, 'a', { value: 1, writable: false });
Object.defineProperty(obj, 'a', { writable: true });
// => TypeError: Cannot redefine property: a

// Update configurable
let obj = {};
Object.defineProperty(obj, 'a', { value: 1, writable: false, configurable: true});
Object.defineProperty(obj, 'a', {writable: true });
obj.a = 2;
console.log(obj.a); // => 2
```

## Sử dụng Object.freeze

Phương thức [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) làm cho object không thể thay đổi, bao gồm: không thể thêm thuộc tính mới vào object, thuộc tính đã có thì không thể bị xoá bỏ,…

**Cú pháp**:
```js
/**
 * @param obj: đối tượng mà bạn muốn freeze
 *
 * @return đối tượng được truyền cho hàm.
 */
Object.freeze(obj)
```

Ví dụ:
```js
const object1 = {
    property1: 42
};

const object2 = Object.freeze(object1);

object2.property1 = 33;
// Throws an error in strict mode

console.log(object2.property1);
// expected output: 42
```

Không như `Object.defineProperty`, bạn không thể `unfreeze` object trên sau khi nó *được* `freeze`

## Sử dụng Immutable.js

[Immutable.js](https://facebook.github.io/immutable-js/) được xây dựng và phát triển bởi `facebook`, nó cung cấp cho người dùng rất nhiều cấu trúc dữ liệu ổn định, trong đó có thể kể đến: `List`, `Stack`, `Map`, `OrderedMap`, `Set`, `OrderedSet`, `Record`.


**Cài đặt**:
`Immutable.js` không phụ thuộc vào bất kì một `package` nào nên nó có thể include trực tiếp trong `html` hoặc cài đặt thông qua `npm/yarn`.

**Sử dụng**:
```js
const { Map } = require('immutable')
const map1 = Map({ a: 1, b: 2, c: 3 })
const map2 = map1.set('b', 50)
map1.get('b') + " vs. " + map2.get('b') // 2 vs. 50
```

Hoặc nếu bạn sử dụng tag `<script>`:
```html
<script src="immutable.min.js"></script>
<script>
    var map1 = Immutable.Map({ a: 1, b: 2, c: 3 });
    var map2 = map1.set('b', 50);
    map1.get('b'); // 2
    map2.get('b'); // 50
</script>

<!-- Hoặc -->
<script>
require(['./immutable.min.js'], function (Immutable) {
    var map1 = Immutable.Map({ a: 1, b: 2, c: 3 });
    var map2 = map1.set('b', 50);
    map1.get('b'); // 2
    map2.get('b'); // 50
});
</script>
```

Để hiểu rõ hơn về `Immutable.js`, bạn có thể đọc thêm ở [đây](https://viblo.asia/search?q=Immutable.js)


## Tổng kết
Ở trên là 3 cách để tạo `immutable` object trong `javascript`. Mỗi cách đều có ưu điểm / nhược điểm riêng. Tuỳ theo từng yêu cầu cụ thể mà bạn có thể lựa chọn cách làm hợp lý.