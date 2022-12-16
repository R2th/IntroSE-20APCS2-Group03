# Lời nói đầu 
Xin chào mọi người, nếu các bạn đã hoặc đang làm việc với javascript thì chắc hẳn đã biết đến **Lodash**. Đây là thư viện mạnh mẽ cung cấp performance rất cao với rất nhiều hàm để xử lý data, object, strings, number, array.... Ngoài ra, khi sử dụng **Lodash** chúng ta thấy code ngắn gọn, tiết kiệm thời gian và dễ maintain hơn. Thú thật là từ khi được join dự án ở công ty và làm quen với **Lodash** thì mình bị nghiện luôn, setup project nào cũng require **Lodash** vì nó rất là tiện :v 

**Lodash** cung cấp cho chúng ta khá nhiều chức năng đa dạng, và được chia thành các nhóm như sau:

* Array
* Collection
* Date
* Function
* Lang
* Math
* Number
* Seq
* String
* Util
* Properties
* Methods

Giờ thì bạn hãy cài đặt **Lodash** và mình sẽ liệt kê ra một số lodash functions được sử dụng rất nhiều trong bất kỳ dự án nào có javascript nhé :D

# Cài đặt 
Với browser:

```
<script src="lodash.js"></script>
```

Sử dụng npm: 
```
$ npm i -g npm
$ npm i --save lodash
```

Trong Node.js:
```
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
```

# Những function phổ biến

## Object
### 1 _.get
```
_.get(object, path, [defaultValue])
```

`_.get` sẽ lấy value theo `path` của `object`, nếu value là `undefined` thì trả về `defaultValue`.

```
var object = { 'a': [{ 'b': { 'c': 100 } }] };
 
_.get(object, 'a[0].b.c');
// => 100
 
_.get(object, ['a', '0', 'b', 'c']);
// => 100
 
_.get(object, 'a.b.c', 'default');
// => 'default'
```

### 2  _.set
```
_.set(object, path, value)
```
`_.set` sẽ đặt một `object` với `value` mà bạn mong muốn. Bạn có thể truy cập vào một thuộc tính với đường dẫn `path` của nó. Nếu đường dẫn `path` không tồn tại, một `object` sẽ được tạo mới.

```
var object = { 'a': [{ 'b': { 'c': 100 } }] };
 
_.set(object, 'a[0].b.c', 200);
console.log(object.a[0].b.c); // path exist
// => 200
 
_.set(object, ['x', '0', 'y', 'z'], 500);
console.log(object.x[0].y.z); // path doesn't exist
// => 500
```

### 3 _.findKey
```
_.findKey(object, [predicate=_.identity])
```

`._findKey` sẽ trả về key của element đầu tiên thoả mãn được điều kiện của hàm callback ở tham số thứ 2.

```
var users = {
  'barney':  { 'age': 36, 'active': true },
  'fred':    { 'age': 40, 'active': false },
  'pebbles': { 'age': 1,  'active': true }
};
 
_.findKey(users, function(o) { return o.age < 40; });
// => 'barney'
 
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

### 4 _.mapValues

```
_.mapValues(object, [iteratee=.identity])
```

`_.mapValues` sẽ trả về 1 `object` mới bằng cách lặp qua các element của `object` và `value` mới là kết quả xử lý trong hàm callback ở tham số thứ 2.

```
var users = {
  'fred':    { 'user': 'fred',    'age': 40 },
  'pebbles': { 'user': 'pebbles', 'age': 1 }
};
 
_.mapValues(users, function(o) { return o.age; });
// => { 'fred': 40, 'pebbles': 1 }
 
// The `_.property` iteratee shorthand.
_.mapValues(users, 'age');
// => { 'fred': 40, 'pebbles': 1 }
```

### 5 _.extend, _.assign and _.merge
Cả 3 hàm này đều thực hiện một chức năng là hợp nhất các object. Tuy nhiên, có một chút khác biệt.
```
_.extend/_.assign/_.merge(object, [sources])
```
`_.extend` là alias của `_.assign`, 2 hàm này giống nhau. Điểm khác nhau là `_.assign` và `_.extend` sẽ overwrite giá trị `undefined`, còn `_.merge` thì không.

```
_.assign ({}, { a: 'a'  }, { a: undefined }) // => { a: undefined }
_.merge  ({}, { a: 'a'  }, { a: undefined }) // => { a: "a" }
```

## Array

### 6  _.chunk

```
_.chunk(array, [size=option])
```

`_.chunk` tạo một mảng mới từ mảng đã có, gồm các mảng con có số phần tử tùy chọn truyền vào.

```
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
 
_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
```

### 7 _.difference

```
_.difference(array, [values])
```
`_.difference` sẽ tạo một mảng chứa những phần tử khác nhau của hai array.

```
_.difference([2, 1], [2, 3]);
// => [1]
```

### 8 _.intersection
```
_.intersection([arrays])
```
`_.intersection` sẽ lấy ra những phần tử giống nhau giữa 2 hay nhiều mảng.
```
_.intersection([2, 1], [2, 3]);
// => [2]
```

### 9 _.drop
```
_.drop(array, [n=1])
```
`_.drop` sẽ tạo một mảng mới với việc xóa bỏ các phần từ vị trí đầu tiên đến vị trí thứ n, mặc định là n=1.

```
_.drop([1, 2, 3]);
// => [2, 3]
 
_.drop([1, 2, 3], 2);
// => [3]
 
_.drop([1, 2, 3], 5);
// => []
 
_.drop([1, 2, 3], 0);
// => [1, 2, 3]
```

### 10 _.findIndex

```
_.findIndex(array, [predicate=.identity], [fromIndex=0])
```

`_.findIndex` sẽ trả về index của element đầu tiên thoả mãn được điều kiện của tham số thứ 2.

```
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

## Collection 

### 11 _.filter

```
_.filter(collection, [predicate=.identity])
```

` _.filter` sẽ lặp qua tất cả các element và trả về 1 array gồm tất cả element thoả mãn điều kiện của hàm callback ở tham số thứ 2.

```
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

### 12 _.find

```
_.find(collection, [predicate=.identity], [fromIndex=0])
```

`_.find` sẽ lặp qua tất cả các element và trả về element đầu tiên thoả mãn điều kiện của hàm callback ở tham số thứ 2 chứ không như `_.filter` sẽ lấy tất cả element thỏa mãn.

```
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

### 13 _.includes

```
_.includes(collection, value, [fromIndex=0])
```

`_.includes` sẽ tìm kiếm value có thuộc collection hay không, nếu có thì trả về `true`, ngược lại trả về `false`.

```
_.includes([1, 2, 3], 1);
// => true
 
_.includes([1, 2, 3], 1, 2);
// => false
 
_.includes({ 'a': 1, 'b': 2 }, 1);
// => true
 
_.includes('abcd', 'bc');
// => true
```

### 14 _.forEach

```
_.forEach(collection, [iteratee=.identity])
```

`_.forEach` sẽ tương tự với hàm foreach() mà chúng ta hay sử dụng, nó dùng để lặp qua mỗi phần tử của collection và xử lý với hàm callback.

```
_.forEach([1, 2], function(value) {
  console.log(value);
});
// => Logs `1` then `2`.
 
_.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
  console.log(key);
});
// => Logs 'a' then 'b' (iteration order is not guaranteed).
```

### 15 _.map
```
_.map(collection, [iteratee=.identity])
```

`_.map` cũng giống với foreach lặp qua các phần tử trong danh sách nhưng khác là nó sẽ trả về một danh sách mới.

```
function square(n) {
  return n * n;
}
 
_.map([4, 8], square);
// => [16, 64]
 
_.map({ 'a': 4, 'b': 8 }, square);
// => [16, 64] (iteration order is not guaranteed)
 
var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];
 
// The `_.property` iteratee shorthand.
_.map(users, 'user');
// => ['barney', 'fred']
```

## Function

### 16 _.delay
```
_.delay(func, wait, [args])
```

`_.delay` sẽ gọi function sau khi đợi một khoảng thời gian tùy chỉnh. Có thể truyền các đối số `args` vào `func`.

```
_.delay(function(text) {
  console.log(text);
}, 1000, 'later');
// => Logs 'later' after one second.
```


### 17 _.debounce

```
_.debounce(func, [wait=0], [options={}])
```

`_.debounce` sẽ gọi lại một function sau một khoảng thời gian nhất định kể từ lần cuối cùng function đó được gọi.

```
function validate() {
    // Validate and show error message if not valid
}

var input = document.getElementById("input-field");
input.addEventListener("keyup", _.debounce(validate, 200));
```

Ở đây, thông báo lỗi sẽ không được hiển thị ngay lập tức vì `validate()` sẽ được gọi sau 200ms. Khoảng thời gian đếm ngược 200ms sẽ reset mỗi khi người dùng nhập input. Vì thế người dùng sẽ không nhìn thấy thông báo lỗi cho đến khi thôi nhập.

## Lang

Dưới đây là một số function được dùng để kiểm tra kiểu, giá trị của biến, và một số hàm dùng để convert dữ liệu:

```
_.isNull(null);
// ➜ true

_.isNull(void 0);
// ➜ false

_.isNumber(3);
// ➜ true

_.isNumber(Number.MIN_VALUE);
// ➜ true

_.isNumber(Infinity);
// ➜ true

_.isNumber('3');
// ➜ false

_.isObject({});
// ➜ true

_.isObject([1, 2, 3]);
// ➜ true

_.isObject(_.noop);
// ➜ true

_.isObject(null);
// ➜ false

_.isUndefined(void 0);
// ➜ true

_.isUndefined(null);
// ➜ false

_.isDate(new Date);
// ➜ true

_.isDate('Mon April 23 2012');
// ➜ false

_.toArray('abc');
// => ['a', 'b', 'c']

_.toString([1, 2, 3]);
// => '1,2,3'

_.toFinite(Number.MIN_VALUE);
// => 5e-324

_.toInteger(3.2);
// => 3

_.toLength(Infinity);
// => 4294967295
```

# Tổng kết
Trên đây chỉ là một số ít các function mà **Lodash** xây dựng sẵn để hỗ trợ cho chúng ta. Còn rất nhiều các function hay ho khác mà mình không thể nào liệt kê hết ra đây được, tuy nhiên trong quá trình làm việc với nó thì đây là những function mà mình sử dụng nhiều nhất. Các bạn hãy vào document của **Lodash** để tham khảo và thực hành thêm nhé :D