Trong lập trình thì bất kỳ ngôn ngữ nào bạn cũng phải trải qua xử lý các dữ liệu. Bài viết sẽ giới thiệu về Map và WeakMap kèm ứng dụng của chúng để có thể giúp bạn hiểu và có thể đâu đó áp dụng vào code của bạn để giải quyết vấn đề trơn tru hơn.
**Map**: 1 key đi với 1 value
Với Js thì bạn có thể thể hiện cấu trúc này qua object
```
const dict = {
  company: 'Framgia',
  Title: 'We made it awesome',
}

console.log(dict['company']) // Framgia
```
Với việc dùng object thì có thể *chuỗi* lấy dùng làm *khóa* 
```
const obj = { foobar: 2 }
const dict = new Map()
dict
 .set('foo', 123)
 .set(obj, 'hello framgia')

dict.get('foo') // 123
dict.get(obj)   // 'hello framgia'

// get value một khóa không tồn tại
dict.get('bar') // undefined
```
Ở đây chúng ta có thể truyền vào constructor của Map một array với cặp value dạng [key, value]:
```
const dict = new Map([
  ['foo', 123],
  [obj, 'hello framgia']
])
```
Chúng ta có thể dùng bất kỳ kiểu dữ liệu để làm khóa cho Map (array, object, funtion or NaN).
```
const arr = [1]
const f = () => {}
dict
 .set(arr, 'array')
 .set(f, 'function')
 .set(NaN, 'not a number')
```
Để tìm key và value tương ứng trong Map ta dùng SameValueZero. SameValueZero mang ý nghĩa giống với === nhưng xem value của NaN là bằng nhau.
SameValueZero sẽ nhận biết 2 object khác nhau sẽ là hai khóa riêng biệt
```
const bar = {}
const foo = {}

dict.set(bar, 'bar').set(foo, 'foo')
dict.get(foo) // foo
dict.get({}) // undefined
```
Khi map đã tồn tại key thì dữ liệu mới sẽ ghi đè lên.
```
const cst = new Map()
cst.set('bar', 1000001)
cst.set('bar', 1000002)

cst.get('bar') // 1000002
```
Vậy làm thế nào để duyệt qua Map? Chúng ta sẽ dùng:
```
const dict = new Map([
  ['key1', 96], ['key2', 69]
])

dict.keys()    // ['key1', 'key2']
dict.values()  // [96, 69]
dict.entries() // [ ['key1', 96], ['key2', 69] ]
dict.forEach(function(value, key, map) {
  console.log(`${key} has ${value}`)
}, /* thisArgs bạn có thể truyền vào tham chiếu cho `this`/)

// Sử dụng for..of
for (let [key, value] of dict) {
  console.log(`${key} has ${value}`)
}
```
Thao tác khác với Map:
```
const dict = new Map([
  ['key1', 121], ['key', 212]
])

// Đếm số cặp giá trị trong map
dict.size // 2

// Kiểm tra trong map có khóa "foo" hay không
dict.has('key1') // true
dict.has('foo') // false

// Xóa một khóa, trả về true nếu thành công, false nếu thất bại
dict.delete('foo') // false
dict.delete('key2') // true

// Xóa hết các cặp giá trị của map
dict.clear()
```
**WeakMap**: có phương thức tương tự như **Map**, chỉ khác ở chổ bạn không thể duyệt WeakMap bằng phương thức .key() và .values(), .entries() và for..of với một lý do rất được quan tâm đó là "bảo toàn dữ liệu".
với WeakMap thì dữ liệu sẽ là private tức là bảo mật nhưng lại không gây rò rỉ bộ nhớ.
```
const weakMap = new WeakMap()

class User {
  constructor() {
    const data = { cellPhone: 0905999999 }
    weakMap.set(this, data)
  }

  getCellPhone() {
    const data = privates.get(this)
    return data.cellPhone
  }
}
const user = new User()
console.log(user) // {}
console.log(user.getCellPhone()) // 0905999999
```
Map có những cải tiến hơn so với *object*, Map là công cụ hữu hiệu giúp lưu trữ dự liệu theo dạng (key, value).
**Tham khảo:**
[1 WeakMap for JavaScript Private Data - Steve Brownlee](https://www.stevebrownlee.com/weakmap-javascript-private-data/)

[2 ECMAScript 6 - Axel Rauschmayer: Map and Set](http://2ality.com/2015/01/es6-maps-sets.html)