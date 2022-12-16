- Lodash là một thư viện của Javascript. Với thư viện này, Nó cung cấp cho bạn những hàm để xử lý những vấn đề về logic trong quá tình code đơn giản hơn nhiều.
- Lodash là một thư viện mở rộng của thằng underscore
- Chia ra nhỏ xử lý từng loại dữ liệu String, Array, Object, Date, Function, Lang, Math, Number,… 

Trong bài viết này mình sẽ giới thiệu 4 loại String, Array, Object
## 1. Xử lý String
`_.camelCase`: trả về string format theo kiểu camel

```javascript
_.camelCase('Vi blo');
// => 'viBlo'
 
_.camelCase('--vi-blo--');
// => 'viBlo'
```

`_.split`: tách string theo một pattern hay ký tự thành một hàng ký tự
```javascript
_.split('a-b-c', '-', 2);
// => ["a", "b"]
```
 Note `2` : số lượng phần tử trong mảng 

`_.trim`   ` _.trimEnd`    `_.trimStart`:Ở khoảng trắng hoặc pattern ở 2 đầu - ở cuối - ở đầu

```javascript

_.trim('  viblo  ');
// => 'viblo'
 
_.trimStart('  viblo  ');
// => 'viblo  '
 
_.trimEnd('-_-viblo-_*', '_*');
// => '-_-viblo-'
```
## 2. Xử lý Array
`_.difference(array, [values])`: lọc ra những phần tử có mặt trong array mà không có mặt trong các element còn lại (values).
```javascript
_.difference([2, 1], [2, 3]);
// => [1]
```
<br>

`_.findIndex`: tìm phần tử ở trong mảng, nếu có thì trả về index , không trả về -1
```javascript
var users = [
  { 'user': 'user1',  'active': false },
  { 'user': 'user2',    'active': false },
  { 'user': 'user3', 'active': true }
];
 
_.findIndex(users, function(o) { return o.user == 'user1'; });
// => 0
 
_.findIndex(users, { 'user': 'user4', 'active': false });
// => 1
```
## 3. Xử lý Object
`_.keys`: lấy toàn bộ tên thuộc tính vào đưa vào một mảng

`_.values`lấy toàn bộ giá trị của thuộc tính và đưa vào một mảng
```javascript
var object = { 'user': 'user1', 'age': 20 };
_.keys(object);
// => ["user", "age"]
 
_.values(object);
// => ["user1", 20]
```
<br>

`_.pick`: Chỉ lấy 1 thuộc tính của object.

`_.omit`: Bỏ 1 thuộc tính của object, lấy toàn bộ những thuộc tính còn lại.
```javascript
var object = { 'user': 'user1', 'age': 40 };
 
_.pick(object, 'user');
// => { 'user': 'user1' }
 
_.omit(object, 'age');
// => { 'user': 'user1' }
```
<br>

`_.invert`: Đảo ngược key-value của 1 object
```javascript
var object = { 'a': 1, 'b': 2 };
 
_.invert(object, 'user');
// => { 1: "a", 2: "b" }
```


Nguồn tham khảo: https://lodash.com/docs/4.17.15