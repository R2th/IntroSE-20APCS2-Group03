Khi làm việc với javascript, chúng ta thường hay gặp những vấn đề như get 1 property, element từ object, array bị lỗi `undefined`; check empty 1 object, array; filter một số property trong object, và nhiều vấn đề nữa... những vấn đề tưởng như đơn giản nhưng sẽ làm code của chúng ta dài dòng, lặp đi lặp lại và đôi khi perfomance cũng chưa tối ưu, vì vậy hôm nay mình xin giới thiệu 1 thư viện để giải qiuyết những vấn đề trên và còn nhiều hơn thế nữa, đó là **Lodash**

**Lodash** là 1 thư viện javascript cung cấp các function tiện ích cho những task common trong code javascript, lodash sử dụng mô hình lập trình functional truyền thống. **Lodash** giúp cho developers viết code ngắn gọn và dễ maintain hơn, lodash gồm nhiều util functions dùng để đơn giản hoá việc xử lý string, number, array, object và function,...

Hôm nay mình xin giới thiệu một số hàm Loadash phổ biến mà bạn nên apply vào bất kỳ dự án javascript nào :raised_hands:

### Đầu tiên là cài đặt:

Với browser:
```js
<script src="lodash.js"></script>
```

Với npm:
```js
npm i lodash 
```

### Một số hàm phổ biến:
### Object
**_.get(object, path, [defaultValue])**

Lấy value theo `path` của `object`, nếu value là `undefined` thì trả về `defaultValue`

```js
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
_.get(object, 'a[0].b.c');
// => 3
 
_.get(object, ['a', '0', 'b', 'c']);
// => 3
 
_.get(object, 'a.b.c', 'default');
// => 'default'
```

**_.has(object, path)**

Kiểm tra 1 `path` có tồn tại trực tiếp trong `object` hay không

```js
var object = { 'a': { 'b': 2 } };
 
_.has(object, 'a');
// => true
 
_.has(object, 'a.b');
// => true
 
_.has(object, ['a', 'b']);
// => true
 
_.has(object, 'b');
// => false
```

**_.mapValues(object, [iteratee=_.identity])**

Trả về 1 object mới bằng cách lặp qua các `element` của `object` và value mới là kết quả xử lý trong hàm callback ở tham số thứ 2

```js
_.mapValues({ 'a': 1, 'b': 2 }, function(value, key) {
  return key + value;
});
// => { 'a': 'a1', 'b': 'b2' }
```

**_.omit(object, [paths])**

Trả về 1 object mới không chứa các `properties` được chỉ định trong `path` params

```js
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.omit(object, ['a', 'c']);
// => { 'b': '2' }
```

**_.omitBy(object, [predicate=_.identity])**

Trả về 1 object mới bằng cách loại bỏ các `element` thoả mãn điều kiện của callback funtion ở tham số thứ 2

```js
var object = { 'a': 1, 'b': 2, 'c': 3 };
 
_.omitBy(object, value => value > 2)
// => {a: 1, b: 2}
```

**_.pick(object, [paths])**

Tạo mới một object chỉ chứa các `properties` được chỉ định trong `paths`, hàm này ngược với `_.omit`

```js
var object = { 'a': 1, 'b': '2', 'c': 3 };
 
_.pick(object, ['a', 'c']);
// => { 'a': 1, 'c': 3 }
```

**_.pickBy(object, [predicate=_.identity])**

Trả về 1 object mới chỉ chứa các `element` thoả mãn điều kiện của callback funtion ở tham số thứ 2, hàm này ngược với `_.omitBy`

```js
var object = { 'a': 1, 'b': 2, 'c': 3 };
 
_.pickBy(object, value => value > 2)
// => {c: 3}
```

**_.findKey(object, [predicate=_.identity])**

Trả về `key` của `element` đầu tiên thoả mãn được điều kiện của tham số thứ 2

```js
var users = {
  'barney':  { 'age': 36, 'active': true },
  'fred':    { 'age': 40, 'active': false },
  'pebbles': { 'age': 1,  'active': true }
};
 
_.findKey(users, function(o) { return o.age < 40; });
// => 'barney' (iteration order is not guaranteed)
 
// The `_.matches` iteratee shorthand.
_.findKey(users, { 'age': 1, 'active': true });
// => 'pebbles'
 
// The `_.matchesProperty` iteratee shorthand.
_.findKey(users, ['active', false]);
// => 'fred'
 
// The `_.property` iteratee shorthand.
_.findKey(users, 'active');
// => 'barney'
```

### Array

**_.findIndex(array, [predicate=_.identity], [fromIndex=0])**

Trả về `index` của `element` đầu tiên thoả mãn được điều kiện của tham số thứ 2

```js
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
_.findIndex(users, function(o) { return o.user == 'barney'; });
// => 0
 
// The `_.matches` iteratee shorthand.
_.findIndex(users, { 'user': 'fred', 'active': false });
// => 1
 
// The `_.matchesProperty` iteratee shorthand.
_.findIndex(users, ['active', false]);
// => 0
 
// The `_.property` iteratee shorthand.
_.findIndex(users, 'active');
// => 2
```

**_.drop(array, [n=1])**

Tạo ra một `array` mới bằng cách loại bỏ bớt số `element` được chỉ định trong tham số thứ 2

```js
_.drop([1, 2, 3]);
// => [2, 3]
 
_.drop([1, 2, 3], 2);
// => [3]
 
_.drop([1, 2, 3], 5);
// => []
 
_.drop([1, 2, 3], 0);
// => [1, 2, 3]
```

### Collection

**_.forEach(collection, [iteratee=_.identity])**

Lặp qua các `element` của collection, gọi `callback` function tương ứng với mỗi lần lặp

```js
_.forEach([1, 2], function(value) {
  console.log(value);
});
// => Logs `1` then `2`.
 
_.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
  console.log(key);
});
// => Logs 'a' then 'b' (iteration order is not guaranteed).
```

**_.every(collection, [predicate=_.identity])**

Trả về `true` nếu tất cả element đều thoả mãn điều kiện của tham số thứ 2, ngươc lại nếu ít nhất 1 element không thoả mãn , trả về `false`

```js
_.every([true, 1, null, 'yes'], Boolean);
// => false
 
var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': false }
];
 
// The `_.matches` iteratee shorthand.
_.every(users, { 'user': 'barney', 'active': false });
// => false
 
// The `_.matchesProperty` iteratee shorthand.
_.every(users, ['active', false]);
// => true
 
// The `_.property` iteratee shorthand.
_.every(users, 'active');
// => false
```

**_.some(collection, [predicate=_.identity])**

Hàm này ngược với ` _.every`. Trả về `true` nếu ít nhất 1 element thoả mãn điều kiện của tham số thứ 2, nếu không có bất kì `element` thoả mãn , trả về `false`

```js
_.some([null, 0, 'yes', false], Boolean);
// => true
 
var users = [
  { 'user': 'barney', 'active': true },
  { 'user': 'fred',   'active': false }
];
 
// The `_.matches` iteratee shorthand.
_.some(users, { 'user': 'barney', 'active': false });
// => false
 
// The `_.matchesProperty` iteratee shorthand.
_.some(users, ['active', false]);
// => true
 
// The `_.property` iteratee shorthand.
_.some(users, 'active');
// => true
```

**_.filter(collection, [predicate=_.identity])**

Lặp qua tất cả `element`, trả về 1 `array` gồm tất cả element thoả mãn điều kiện của tham số thứ 2

```js
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];
 
_.filter(users, function(o) { return !o.active; });
// => objects for ['fred']
 
// The `_.matches` iteratee shorthand.
_.filter(users, { 'age': 36, 'active': true });
// => objects for ['barney']
 
// The `_.matchesProperty` iteratee shorthand.
_.filter(users, ['active', false]);
// => objects for ['fred']
 
// The `_.property` iteratee shorthand.
_.filter(users, 'active');
// => objects for ['barney']
```

**_.find(collection, [predicate=_.identity], [fromIndex=0])**

Lặp qua mỗi `elelent`, trả về element đầu tiên thoả mãn điều kiện của tham số thứ 2

```js
var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];
 
_.find(users, function(o) { return o.age < 40; });
// => object for 'barney'
 
// The `_.matches` iteratee shorthand.
_.find(users, { 'age': 1, 'active': true });
// => object for 'pebbles'
 
// The `_.matchesProperty` iteratee shorthand.
_.find(users, ['active', false]);
// => object for 'fred'
 
// The `_.property` iteratee shorthand.
_.find(users, 'active');
// => object for 'barney'
```

**_.reject(collection, [predicate=_.identity])**

Ngược lại với `_.filter`, hàm này trả về 1 `array` chứa các `element` không thoả mãn điều kiện của tham số thứ 2

```js
var users = [
  { 'user': 'barney', 'age': 36, 'active': false },
  { 'user': 'fred',   'age': 40, 'active': true }
];
 
_.reject(users, function(o) { return !o.active; });
// => objects for ['fred']
 
// The `_.matches` iteratee shorthand.
_.reject(users, { 'age': 40, 'active': true });
// => objects for ['barney']
 
// The `_.matchesProperty` iteratee shorthand.
_.reject(users, ['active', false]);
// => objects for ['fred']
 
// The `_.property` iteratee shorthand.
_.reject(users, 'active');
// => objects for ['barney']
```

### Lang

**_.isEmpty(value)**

Check xem `value` là 1 empty object, array, string

```js
_.isEmpty(null);
// => true
 
_.isEmpty(undefined);
// => true

_.isEmpty('');
// => true

_.isEmpty({});
// => true

_.isEmpty([]);
// => true

_.isEmpty(true);
// => true
 
_.isEmpty(1);
// => true
 
_.isEmpty([1, 2, 3]);
// => false
 
_.isEmpty({ 'a': 1 });
// => false
```


### Kết luận
Như vậy lodash là một thư viện rất mạnh mẽ, giúp chúng  ta xử  lý code javascript gọn gàng và dễ đọc, dễ maintain hơn, nó có thể xử dụng ở cả browser và cả server side.

> Ref: https://lodash.com