Xử lý dữ liệu là tất yếu trong việc lập trình. Bài viết sẽ giới thiệu về Set và WeakSet kèm ví dụ của chúng để có thể giúp bạn hiểu và có thể đâu đó áp dụng vào code của bạn để giải quyết vấn đề, biến vấn để trở nên đơn giản hơn.
## Set
Set là tập hợp các giá trị không bị trùng lặp, có thể hiểu trong 1 set không chứa các 2 giá trị bằng nhau.
```
const set = new Set();
set
  .add('we')
  .add('make')
  .add('it')
  .add('awesome')
 
set.size // kết quả: 4
```
Bạn cũng có thể truyền 1 mảng vào constructor của Set.
```
const set = new Set(['we', 'make', 'it', 'we', 'awesome'])
console.log(set) 
// kết quả: Set (4) {'we', 'make', 'it', 'awesome'}
```
Tại ví dụ có thể thấy giá trị 'we' bị trùng lặp đã được loại bỏ. Chúng ta có thể áp dụng Set để tạo ra một mảng chứa những phần tử không trùng lặp.
```
const a1 = ['we', 'make', 'we', 'it', 'awesome']
const a2 = [...new Set(a)]
console.log(a2) 
// Kết quả: [ 'we', 'make', 'it', 'awesome' ]
```
Cũng tương tự như [Map](https://viblo.asia/p/doi-dieu-ve-map-weakmap-trong-js-OeVKBxM2lkW), Set sử dụng SameZeroValue để so sánh các phần tử với nhau.
```
const obj = {}
const set = new Set([NaN, {}, obj])
set.has(NaN) // true
set.has(obj) // true
set.has({})  // false
```
Như [Map](https://viblo.asia/p/doi-dieu-ve-map-weakmap-trong-js-OeVKBxM2lkW), ở Set cũng dùng các phương thức để duyệt qua các phần tử.
```
const set = new Set([1, 2, 3, 4, 5])

//Set không có khái niệm keys nên kết quả của `set.keys()` và `set.values()` đều trả về kết quả như nhau.
set.keys()
set.values()

set.entries()
set.forEach(function(value, key, setReference) {
}, thisArg)

for (let el of set) {
  console.log(el)
}
```
Một số thao tác khác trên Set.
```
const set = new Set([6, 7, 7, 8, 9])

// Xóa một phần tử trong set
set.delete(3) // Kết quả: Set (4) {6, 7, 8, 9}

// Xóa all
s.clear()
```
## WeakSet
Ở ES6 giới thiệu lớp WeakSet. So với Set, các khóa của WeakSet bắt buộc phải là object, và chúng sẽ bị giải phóng khỏi bộ nhớ nếu không có tham chiếu nào.

Có phương thức tương tự như Set, chỉ khác ở chổ không thể duyệt WeakSet bằng phương thức .entries() và for..of với một lý do rất được quan tâm đó là "bảo toàn dữ liệu". 
Với WeakSet thì dữ liệu sẽ là private tức là bảo mật nhưng lại không gây rò rỉ bộ nhớ.

## Kết luận
Với những cải tiến so với object thông thường, Set giúp bạn lưu trữ chuỗi dữ liệu mà không lo lắng về việc giá trị bị trùng lặp.

## Tham khảo
1. [WeakMap for JavaScript Private Data - Steve Brownlee](https://www.stevebrownlee.com/weakmap-javascript-private-data/)

2. [ ECMAScript 6 - Axel Rauschmayer: Map and Set](http://2ality.com/2015/01/es6-maps-sets.html)