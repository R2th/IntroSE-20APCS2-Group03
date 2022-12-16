### 1. Giới thiệu về lodash

**Lodash** là một thư viện JavaScript cung cấp nhiều hàm utility, cực kỳ hữu ích và tiện lợi nếu bạn muốn xử lý các thao tác với data, object, strings, number hay các array,... Nó được xây dựng dựa trên ý tưởng của [underscoreJs](https://underscorejs.org/) và có thể coi như một phiên bản mở rộng hơn của *underscore*. **Lodash** cung cấp khá nhiều chức năng, và được chia thành các nhóm như sau:
- Array
- Collection
- Date
- Function
- Lang
- Math
- Number
- Object
- Seq
- String
- Util
- Properties
- Methods

Vì lodash có khá nhiều functions, nên mình sẽ chỉ ví dụ và đưa ra một số chức năng chính, các bạn có thể thao khảo danh sách API full của lodash [ở đây](https://lodash.com/docs/)

### 2. Một số hàm của Array



**_.chunk(array, [size=1]):** Tạo ra mảng từ các phần tử được chia thành các nhóm với độ dài xác định

```
_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]
 
_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]
```

**_.difference(array, [values]):** Lấy những phần tử khác nhau giữa 2 array

```
_.difference([2, 1], [2, 3]);
// => [1]
```

**_.concat(array, [values]):** Tạo một mảng mới bằng việc kết hợp với bất cứ mảng nào hoặc giá trị nào

```
var array = [1];
var other = _.concat(array, 2, [3], [[4]]);
 
console.log(other);
// => [1, 2, 3, [4]]
 
console.log(array);
// => [1]
```

**_.flatten(array):** Làm đẹp array (Nếu array có chứa array thì cho ra 1 array duy nhất)

```
_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]
```

**_.findIndex(array, [predicate=_.identity], [fromIndex=0]):** Tìm index của phần tử đầu tiên thỏa điều kiện

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

### 3. Một số hàm của Collection

**_.shuffle(collection):** Tương tự như tráo bài, tạo ra 1 array mới, chứa các phần tử của array cũ theo thứ tự ngẫu nhiên

```
_.shuffle([1, 2, 3, 4]);
// => [4, 1, 3, 2]
```

**_.forEach(collection, [iteratee=.identity]):** Lặp lại các phần tử của mảng và trả về các phần từ của mảng

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

**_.filter(collection, [predicate=.identity]):** Lặp lại các phần tử của mảng với các điều kiện lọc và trả về một mảng mới đã được lọc.

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

**_.find(collection, [predicate=.identity], [fromIndex=0]):** Lặp lại tất cả phần tử của mảng và trả về phần tử đầu tiên thỏa mãn điều kiện

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

**_.orderBy(collection, [iteratees=[.identity]], [orders]):** Sort mảng

```
var users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
];
 
// Sort by `user` in ascending order and by `age` in descending order.
_.orderBy(users, ['user', 'age'], ['asc', 'desc']);
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
```

### 4. Một số hàm của Lang

**_.isUndefined, _.isFunction, _.isNumber, _.isObject:** Đây là một số function để kiểm tra kiểu của biến.

**_.isNull, _.isEmpty, _.isNil, _.isUndefined:** Kiểm tra giá trị của biến

**_.isEqual:** Kiểm tra xem 2 object có giá trị bằng nhau hay không.

### 5. Một số hàm của Util

**_.flow([funcs]):** thực hiện các hàm lần lượt từ trái sang phải. Output của hàm thực hiện trước là input của hàm sau.

```
function square(n) {
  return n * n;
}
 
var addSquare = _.flow([_.add, square]);
addSquare(1, 2);
// => 9
```

**_.flowRight([funcs]):** Thực hiện các hàm từ phải qua trái

```
function square(n) {
  return n * n;
}
 
var addSquare = _.flowRight([square, _.add]);
addSquare(1, 2);
// => 9
```

**_.defaultTo(value, defaultValue ):** Trả về defaultValue nếu value là NaN, null, hoặc undefined.

```
_.defaultTo(1, 10);
// => 1
 
_.defaultTo(undefined, 10);
// => 10
```

### 6. Lodash/fp
Nói đến `lodash` mà không nhắc đến `lodash/fp` thì quả là một thiếu sót lớn.

FP là viết tắt của Functional Programming, chính vì thế `lodash/fp` là một cách viết khác của `lodash` theo hướng Functional Programming.

`lodash/fp` chứa đầy đủ các hàm của lodash và cách viết chỉ hơi khác một chút:

```
var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
// lodash
_.get(object, 'a[0].b.c');
// => 3

// lodash/fp
fp.get('a[0].b.c')(object)
// => 3
```

Nhìn ví dụ trên, chúng ta thấy `lodash/fp` thay vì sử dụng việc gọi 1 hàm và truyền vào tất cả các tham số cần thiết, nó gọi hàm đấy với mỗi lần chỉ 1 tham số. Kết quả trả về sẽ là 1 function với tham số là tham số thứ 2. Ví dụ thay vì gọi 1 hàm `map(array, function)`, chúng ta sẽ gọi `map(function)(array)`.

Nếu bạn là một fan cứng của Functional Programming, thì đừng ngại ngần thử `lodash/fp` nhé!

### 7. Kết luận

Qua bài viết trên mình muốn giới thiệu về `Lodash` - một thư viện cực kỳ nổi tiếng của Js. Mong các bạn nào chưa biết có thể có thêm một công cụ tiện ích để làm việc với Javascript một cách nhanh chóng và thoải mái. 

`Lodash` gồm rất nhiều hàm tiện ích có sẵn, qua một bài viết không thể nào liệt kê và giới thiệu hết được, những ví dụ trên chỉ mang tính giới thiệu cho các bạn dễ hình dung Lodash là gì và làm việc như thế nào thôi. Bạn nào muốn tìm và dùng thêm những tiện ích khác, có thể vào  [document](https://lodash.com/docs/) của Lodash để tham khảo thêm nhé!