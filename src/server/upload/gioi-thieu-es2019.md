ESNext là tên để chỉ phiên bản tiếp theo của JavaScript. Phiên bản ECMAScript hiện tại ES2018, được release vào 6/2018. Thông thường, các phiên bản JavaScript sẽ được chuẩn hóa vào mùa hè, vì vậy chúng ta có thể hy vọng sẽ thấy ECMAScript 2019 hoàn thiện vào mùa hè năm nay.

Tại thời điểm viết bài, ES2018 đã được release, và ESNext là ES2019.

Các đề xuất cho tiêu chuẩn ECMAScript được tổ chức theo các giai đoạn. Giai đoạn 1-3 là giai đoạn sáng tạo và phát triển các tính năng mới và khi đến giai đoạn 4, các tính năng được hoàn thiện trở thành một phần của tiêu chuẩn mới.

<br>
Ở thời điểm này, đã có một số tính năng ở giai đoạn 4, chúng sẽ được giới thiệu ngay dưới đây . 

## Array.prototype.{flat,flatMap}
`flat()` là method giúp "flat" mảng, tạo mảng 1 chiều từ mảng nhiều chiều

Ví dụ:

```
['Dog', ['Sheep', 'Wolf']].flat()
//[ 'Dog', 'Sheep', 'Wolf' ]
```
Mặc định "flats" có level = 1, nhưng bạn có thể thêm tham số để set số level mà bạn muốn flat, và set level là `Infinity` để không giới hạn level
```

['Dog', ['Sheep', ['Wolf']]].flat()
//[ 'Dog', 'Sheep', [ 'Wolf' ] ]

['Dog', ['Sheep', ['Wolf']]].flat(2)
//[ 'Dog', 'Sheep', 'Wolf' ]

['Dog', ['Sheep', ['Wolf']]].flat(Infinity)
//[ 'Dog', 'Sheep', 'Wolf' ]
```

`flatMap()` là phương thức mới của Array, nó là sự kết hợp giữa `flat()` và `map()`.
Nó trở nên hữu ích khi bạn muốn trả về array theo hàm `map()`, sau đó muốn kết quả được `flat()` (hơi ngược với thứ tự cái tên "flatMap")

```
['My dog', 'is awesome'].map(words => words.split(' '))
//[ [ 'My', 'dog' ], [ 'is', 'awesome' ] ]

['My dog', 'is awesome'].flatMap(words => words.split(' '))
//[ 'My', 'dog', 'is', 'awesome' ]
```
## Optional catch binding
Thỉnh thoảng, chúng ta sẽ không cần tham số trong `catch` block của một `try/catch`

Trước đây, chúng ta bắt buộc phải viết theo cách này, ngay cả khi chúng ta không sử dụng đến `e`

```
try {
  //...
} catch (e) {
  //handle error
}
```
Giờ đây, bạn có thể bỏ qua nó như dưới này

```
try {
  //...
} catch {
  //handle error
}
```
## Object.fromEntries()
Objects có hàm `entries()` từ ES2017.

Nó trả về một mảng chứa tất cả các thuộc tính của đối tượng, như là một mảng của các cặp` [key, value]`:

```
const person = { name: 'Fred', age: 87 }
Object.entries(person) // [['name', 'Fred'], ['age', 87]]
```
ES2019 giới thiệu phương thức  `Object.fromEntries()` giúp tạo một object mới từ mảng các thuộc tính, hiểu đơn giản là chuyển đổi ngược của  `entries()`

```
const person = { name: 'Fred', age: 87 }
const entries = Object.entries(person)
const newPerson = Object.fromEntries(entries)

person !== newPerson //true
```
## String.prototype.{trimStart,trimEnd}
Tính năng này đã có trong v8/Chrome, và nó được chuẩn hóa trong ES2019

### trimStart()
Trả về string mới xóa các khoảng trắng ở đầu string gốc

```
'Testing'.trimStart() //'Testing'
' Testing'.trimStart() //'Testing'
' Testing '.trimStart() //'Testing '
'Testing'.trimStart() //'Testing'
```
### trimEnd()
Trả về string mới xóa các khoảng trắng ở cuối string gốc

```
'Testing'.trimEnd() //'Testing'
' Testing'.trimEnd() //' Testing'
' Testing '.trimEnd() //' Testing'
'Testing '.trimEnd() //'Testing'
```
## Symbol.prototype.description
Giờ đây, bạn có thể nhận được `description` của một `Symbol` bằng cách truy cập thuộc tính `description` thay vì sử dụng phương thức `toString()` như trước đây
```
const testSymbol = Symbol('Test')
testSymbol.description // 'Test'
```
## JSON improvements
Trước đây, ký hiệu tách dòng (\u2028) và tách đoạn (\u2029) không được cho phép ở các string muốn chuyển về JSON.

Khi sử dụng` JSON.parse()`, những ký tự này sẽ dẫn đến` SyntaxError`  nhưng bây giờ, chúng hoàn toàn hợp lệ, được định nghĩa bởi tiêu chuẩn JSON.

## Well-formed JSON.stringify()
Sửa output của ` JSON.stringify()` khi nó xử lý với các mã code utf8 thay thế (từ U+D800 thành U+DFFF).

Trước đây việc gọi ` JSON.stringify()` luôn trả về một ký tự Unicode không đúng định dạng ( “�”). Hiện tại, các mã code thay thế này đã được biểu diễn chính xác bằng `JSON.stringify() ` và khi chuyển đổi ngược lại với` JSON.parse()`

## Function.prototype.toString()
 Các function có phương thức `toString()` để trả về string chứa code của function đó. 

ES2019 đã thay đổi để tránh việc bỏ đi các comment và các ký tự khoảng trắng, lấy chính xác những gì function định nghĩa
Trước đây: 

```
function /* this is bar */ bar () {}
```
Kết quả trước đây: 
```
bar.toString() //'function bar() {}
```
Và hiện tại:
```
bar.toString(); // 'function /* this is bar */ bar () {}'
```

<br>
Trên đây là một số các thay đổi của ES2019, các phiên bản mới nhất của các trình duyệt hầu hết đã triển khai chúng. Ngoài ra có một số tính năng khác đang ở giai đoạn 3, nó sẽ được nâng cấp lên giai đoạn 4 vào một vài tháng tới, bạn có thể check tại đây https://github.com/tc39/proposals.

Nguồn: https://flaviocopes.com/es2019/