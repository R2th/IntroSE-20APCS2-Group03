##  Lodash là gì
> A modern JavaScript utility library delivering modularity, performance & extras.
   
   Nếu các bạn đã hoặc đang làm việc với javascript thì chắc đã nghe qua lodash. Một thư việc rất mạnh mẽ cung cấp rất nhiều hàm để xử lý data, object, strings, number hay các array.... Lodash cung cấp performance rất cao và đảm bảo an toàn trong các trường hợp underfine, null,.... Ngoài ra, khi sử dụng hàm lodash chúng ta thấy code đẹp và ngắn gọn hơn.
   
   Nói túm cái váy lại là ngoài cách dùng các function thông thường khác như xử lý mảng, danh sách, string các kiểu thì các bạn có thể học thêm một thử viện xịn xò và này nọ là lodash. Tớ chỉ viết ra đây mấy cái hay dùng thôi chứ nhiều thứ các bạn có thể đọc thêm tài liệu của lodash ở [đây](https://lodash.com/docs/4.17.15)
   
   Để install và sử dụng lodash tại [npm](https://www.npmjs.com/package/lodash) hoặc [yarn](https://yarnpkg.com/package/lodash)
```
// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
```
## Một số hàm thông dụng mà tớ hay dùng
### Xử lý danh sách
> _.forEach(collection, [iteratee=_.identity])

Giống với hàm foreach(), dùng để lặp qua mỗi phần tử của danh sách và xử lý với hàm.

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

> _.filter(collection, [predicate=_.identity])

Lặp lại các phần tử của bộ sưu tập, trả về một mảng gồm tất cả các vị từ phần tử trả về giá trị true cho.  Vị từ được gọi với ba đối số: (value, index | key, collection).
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

> _.find(collection, [predicate=_.identity], [fromIndex=0])

Lặp lại các phần tử của bộ sưu tập, trả về vị từ phần tử đầu tiên trả về giá trị true cho.  Vị từ được gọi với ba đối số: (value, index | key, collection).
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

> _.findLast(collection, [predicate=_.identity], [fromIndex=collection.length-1])

Hàm này giống như _.find ngoại trừ việc nó lặp lại các phần tử của bộ sưu tập từ phải sang trái.
```
_.findLast([1, 2, 3, 4], function(n) {
  return n % 2 == 1;
});
// => 3
```

> _.includes(collection, value, [fromIndex=0])

Kiểm tra xem giá trị có thuộc danh sách hay không.  Nếu tập hợp là một chuỗi, nó sẽ được kiểm tra để tìm một chuỗi con có giá trị, nếu không thì SameValueZero được sử dụng để so sánh bình đẳng.  Nếu fromIndex là số âm, nó được sử dụng làm phần bù cho phần cuối của bộ sưu tập.
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

> _.map(collection, [iteratee=_.identity])

Cũng giống với foreach lặp qua các phần tử trong danh sách nhưng có trả về một danh sách mới.
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

Thôi liệt kê mệt quá cơ mà lodash support rất nhiều function cho tất cả các thể loại array, collection, function, date, lang, math, number, object, seq, string, util, properties, methods.

Nguồn tham khảo: [https://lodash.com/docs/4.17.15](https://lodash.com/docs/4.17.15)