# Array.prototype.{flat,flatMap}
`flat()` là một instance method mới của array, nó có thể tạo ra mảng một chiều từ một mảng đa chiều.
<br>

Ví dụ:
```javascript
['Dog', ['Sheep', 'Wolf']].flat()
//[ 'Dog', 'Sheep', 'Wolf' ]
```

Mặc định hàm sẽ chỉ "flat" một chiều, bạn có thể thêm param để set số chiều bạn muốn. Bạn có thể set `infinity` để flat toàn bộ các chiều:
```javascript
['Dog', ['Sheep', ['Wolf']]].flat()
//[ 'Dog', 'Sheep', [ 'Wolf' ] ]
['Dog', ['Sheep', ['Wolf']]].flat(2)
//[ 'Dog', 'Sheep', 'Wolf' ]
['Dog', ['Sheep', ['Wolf']]].flat(Infinity)
//[ 'Dog', 'Sheep', 'Wolf' ]
```

Chắc hẳn các bạn đã quá quen thuộc với method `map()` của mảng. Như các bạn đã biết, nó được dùng để thực thi một function nào đó trên mỗi phần tử của mảng.
<br>

`flatMap()` là một instance method mới của mảng kết hợp giữa `flat()` và `map()`. Nó sẽ khá hữu dụng khi bạn chạy một hàm trả về một mảng nhưng lại muốn mảng đó được flat:
```javascript
['My dog', 'is awesome'].map(words => words.split(' '))
//[ [ 'My', 'dog' ], [ 'is', 'awesome' ] ]
['My dog', 'is awesome'].flatMap(words => words.split(' '))
//[ 'My', 'dog', 'is', 'awesome' ]
```

# Optional catch
Trước đây, khi sử dụng `try/catch` bạn luôn phải viết:
```javascript
try {
  //..
} catch(e) {
  //handle error
}
```

kể cả khi bạn không cần dùng đến `e` để handle lỗi. Giờ thì bạn có thể loại bỏ nó đi nếu không cần dùng:
```javascript
try {
  //..
} catch {
  //handle error
}
```

# Object.fromEntries()
Từ ES2017, Object có thêm method `entries()`. Nó trả về một mảng chứa toàn bộ các thuộc tính của object, mảng trả về sẽ có dạng các cặp key, value:
```javascript
const person = { name: 'Fred', age: 87 }
Object.entries(person) // [['name', 'Fred'], ['age', 87]]
```

ES2019 mang tới method mới `fromEntries()`, dùng để tạo một object mới từ một mảng các thuộc tính:
```javascript
const person = { name: 'Fred', age: 87 }
const entries = Object.entries(person)
const anotherPerson = Object.fromEntries(entries)

person !== anotherPerson //true 
```

# String.prototype.{trimStart,trimEnd}
Tính năng này đã xuất hiện trong v8/Chrome và sau đó nó cũng đã được chuẩn hóa trong ES2019.

### `trimStart()`
Trả về một string đã được xóa các khoảng trắng ở đầu của string gốc:
```javascript
'Testing'.trimStart() //'Testing'
' Testing'.trimStart() //'Testing'
'Testing '.trimStart() //'Testing '
' Testing '.trimStart() //'Testing '
```

### `trimEnd()`
Trả về một string đã được xóa các khoảng trắng ở cuối của string gốc:
```javascript
'Testing'.trimEnd() //'Testing'
'Testing '.trimEnd() //' Testing'
' Testing'.trimEnd() //' Testing'
' Testing '.trimEnd() //' Testing'
```

# Symbol.prototype.description
Giờ bạn có thể lấy description của một symbol bằng cách truy cập thuộc tính `description` thay vì phải dùng method `toString()`:
```javascript
const testSymbol = Symbol('Test')
testSymbol.description // 'Test'
```

# Cải tiến JSON
Trước khi được cải tiến, nếu trong một string có các kí tự phân dòng (\u2028) và phân đoạn văn bản (\u2029) thì khi dùng `JSON.parse()`, những kí tự đó sẽ bị báo `SyntaxError`. Giờ thì chúng đã có thể được parse bình thường.

# Sửa lỗi của JSON.stringify()
Sửa lỗi output của `JSON.stringify()` khi xử lý các code point UTF-8 thay thế (từ U+D800 đến U+DFFF).
<br>

Trước đây, khi gọi `JSON.stringify()` với các code point thay thế thì nó sẽ trả về một ký tự Unicode lỗi (ký tự "�").
<br>

Giờ đây, những code point thay thế đó đã có thể được thể hiện dưới dạng string một cách bình thường bằng `JSON.stringify()`, và có thể biến đổi lại dạng ban đầu của chúng bằng `JSON.parse()`.

# Function.prototype.toString()
Function có một instance method là `toString()` trả về một đoạn string chứa code của function.
<br>

ES2019 đã thay đổi giá trị trả về của method này nhằm tránh việc loại bỏ comment và các kí tự khác (ví dụ như khoảng trắng), thể hiện chính xác code của hàm đã được khai báo ra.
<br>

Trước đây, với hàm được khai báo như sau:
```javascript
function /* this is bar */ bar() {}
```

kết quả sẽ như sau:
```javascript
bar.toString() //'function bar() {}'
```

còn giờ thì kết quả sẽ như sau:
```javascript
bar.toString(); //'function /* this is bar */ bar() {}'
```

---

*(Hết)*

*Đến thời điểm bài viết này hoàn thành thì ES2019 là phiên bản mới nhất của ECMAScript, vì vậy mình xin tạm dừng series tại đây. Mình sẽ cố gắng cập nhật khi các tính năng mới được phát hành, cảm ơn các bạn đã theo dõi trong thời gian qua. :pray:*