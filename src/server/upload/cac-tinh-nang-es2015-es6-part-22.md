**Part 1:** [Click here](https://viblo.asia/p/cac-tinh-nang-es2015-es6-part-12-WAyK8ev6ZxX)

-----

# 11. Các method mới cho String
Các giá trị string có thêm một vài instance method mới:
- `repeat()`
- `codePointAt()`

### `repeat()`
Lặp lại chuỗi theo số lần chỉ định:

```javascript
'Ho'.repeat(3) // 'HoHoHo'
```

`repeat()` sẽ trả về một chuỗi rỗng nếu không có tham số truyền vào, hoặc tham số là `0`. Nếu tham số truyền vào là âm thì sẽ gặp lỗi RangeError.

### `codePointAt()`
Method này có thể được sử dụng để xử lý những ký tự mà không thể biểu thị bằng 1 đơn vị Unicode 16-bit.
<br>

Nếu sự dụng `charCodeAt()` bạn sẽ phải cần lấy từng phần của ký tự Unicode rồi gộp chúng lại với nhau. Sử dụng `codePointAt()` bạn sẽ có thể lấy được toàn bộ chỉ bằng một lần gọi.
<br>

Ví dụ như ký tự Trung Quốc “𠮷” được tạo bởi hai phần UTF-16:
```javascript
"𠮷".charCodeAt(0).toString(16) // d842
"𠮷".charCodeAt(1).toString(16) // dfb7
```

Hai ký tự unicode lấy được ghép vào sẽ được ký tự Trung Quốc ban đầu:
```javascript
"\u{d842}\u{dfb7}" // "𠮷"
```

Sự dụng `codePointAt()` bạn sẽ có được kết quả tương tự:
```javascript
"𠮷".codePointAt(0).toString(16) // 20bb7

"\u{20bb7}" // "𠮷"
```

# 12. Các method mới cho Object
ES2015 đem tới một vài static method cho Object:
- `Object.is()` xác định xem hai giá trị có bằng nhau không
- `Object.assign()` được dùng để shallow copy một object
- `Object.setPrototypeOf` dùng để đặt prototype cho một object

### `Object.is()`
Method này có mục đích giúp bạn so sánh các giá trị.
<br>

Cách sử dụng
```javascript
Object.is(a,b)
```

Kết quả luôn là `false` trừ khi:
- `a` và `b` cùng là một object
- `a` và `b` là các string bằng nhau (string bằng nhau khi chúng được tạo bởi các ký tự giống nhau)
- `a` và `b` là các số bằng nhau
- `a` và `b` cùng là `undefined`, cùng là `null`, cùng là `NaN`, cùng là `true`  hoặc cùng là `false`

Các bạn lưu ý rằng trong JavaScript `0` và `-0` là hai giá trị khác nhau.

### `Object.assign()`
Method này copy tất cả các `thuộc tính enumerable` của một hoặc nhiều object vào một object khác.
<br>

Nó chủ yếu được sử dụng để tạo ra một shallow copy của một object.

```javascript
const copied = Object.assign({}, original)
```

Vì shallow copy nên chỉ có object "chính" được copy còn các object "con" sẽ chỉ copy tham chiếu tới nó.

Nếu bạn sửa một thuộc tính trong các object được tham chiếu tới thì thay đổi đó cũng thấy được trong object được copy ra.

```javascript
const original = {
    name: 'Fiesta',
    car: {
        color: 'blue'
    }
}
const copied = Object.assign({}, original)

original.name = 'Focus'
original.car.color = 'yellow'

copied.name // Fiesta
copied.car.color // yellow
```

Copy từ nhiều object:

```javascript
const wisePerson = {
  isWise: true
}
const foolishPerson = {
  isFoolish: true
}
const wiseAndFoolishPerson = Object.assign({}, wisePerson, foolishPerson)
console.log(wiseAndFoolishPerson) // { isWise: true, isFoolish: true }
```

### `Object.setPrototypeOf()`
Method này đặt prototype cho một object. Nó nhận hai đối số: object và prototype.
<br>

Cách dùng:
```javascript
Object.setPrototypeOf(object, prototype)
```

Ví dụ:
```javascript
const animal = {
  isAnimal: true
}
const mammal = {
  isMammal: true
}

mammal.__proto__ = animal
mammal.isAnimal // true

const dog = Object.create(animal)

dog.isAnimal  //true
console.log(dog.isMammal) // undefined

Object.setPrototypeOf(dog, mammal)

dog.isAnimal // true
dog.isMammal // true
```

# 13. Toán tử spread
Bạn có thể mở rộng một mảng, một object hoặc một string bằng toán tử spread: `...` 
<br>

Ví dụ, cho một mảng như sau:
```javascript
const a = [1, 2, 3]
```

bạn có thể tạo một mảng mới mở rộng từ mảng cũ như sau:
```javascript
const b = [...a, 4, 5, 6]
b // [1, 2, 3, 4, 5, 6]
```

Bạn cũng có thể copy một mảng bằng cách:
```javascript
const c = [...a]
```

Cũng có thể sử dụng tương tự với object. Sao chép một object:
```javscript
const newObj = { ...oldObj }
```

Khi sử dụng với string, toán tử spread sẽ tạo ra một mảng với các phần tử là các ký tự của string:
```javascript
const hey = 'hey'
const arrayized = [...hey] // ['h', 'e', 'y']
```

Toán tử spread có những ứng dụng vô cùng hữu ích. Ứng dụng quan trọng nhất là khả năng dùng mảng làm đối số một cách rất đơn giản:
```javascript
const f = (foo, bar) => console.log(foo + bar)
const a = [1, 2]
// viết
f(...a)
// sẽ tương đương với viết
f(1, 2)
```

(Trước đây bạn có thể viết `f.apply(null, a)`, tuy nhiên cách viết này không được gọn và khá khó đọc.)
<br>

Toán tử spread cũng hữu dụng trong việc **array destruturing**:
```javascript
const numbers = [1, 2, 3, 4, 5]
[first, second, ...others] = numbers
first  // 1
second // 2
others // [3, 4, 5]
```
*(phần tử others trong ví dụ này được gọi là **rest element**)*
<br>

Từ ES2018 ta có thể sử dụng toán tử spread với object tương tự như ví dụ trên, và others ở đây được gọi là **rest properties**:
```javascript
const { first, second, ...others } = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
  fifth: 5
}

first  // 1
second // 2
others // { third: 3, fourth: 4, fifth: 5 }
```

# 14. Map
Một cấu trúc dữ liệu dạng Map cho phép chúng ta liên kết dữ liệu với một key.

Trước khi có Map, người ta thường sử dụng object thay vì nó:
```javascript
const car = {}
car['color'] = 'red'
car.owner = 'Flavio'
car['color'] //red
car.color    //red
car.owner    //Flavio
car['owner'] //Flavio
```

ES6 mang tới cho chúng ta cấu trúc dữ liệu Map, một công cụ thích hợp hơn để xử lý việc tổ chức dữ liệu như thế này.

### Khởi tạo Map
Một Map có thể khởi tạo bằng cách gọi:
```javascript
const m = new Map()
```

### Thêm item vào Map
Bạn có thể thêm item vào map bằng method `set`:
```javascript
m.set('color', 'red')
m.set('age', 2)
```

### Lấy item từ map
Và bạn có thể lấy item từ map bằng `get`:
```javascript
const color = m.get('color')
const age = m.get('age')
```

### Xóa item khỏi map
Dùng method `delete()`:
```javascript
m.delete('color')
```

### Xóa toàn bộ item khỏi map
Dùng method `clear()`:
```javascript
m.clear()
```

### Kiểm tra xem item có trong map không
Dùng method `has()`:
```javascript
const hasColor = m.has('color')
```

### Kiểm tra số item trong map
Dùng thuộc tính `size`:
```javascript
const size = m.size
```

### Khởi tạo map cùng với giá trị
Bạn có thể khởi tạo map với nhiều giá trị:
```javascript
const m = new Map([['color', 'red'], ['owner', 'Flavio'], ['age', 2]])
```

### Map key
Bất kì kiểu giá trị nào (object, array, string, number) đều có thể dùng làm giá trị của item trong map, và **bất kì kiểu giá trị nào cũng có thể dùng làm key của map** kể cả object.
<br>

Nếu bạn dùng `get()` để lấy một key không có trong map, thì get() sẽ trả về `undefined`.
```javascript
const m = new Map()

m.set(NaN, 'test')
m.get(NaN) // test

m.set(+0, 'test')
m.get(-0) // test
```

### Lặp các key trong Map
Map cung cấp cho chúng ta method `keys` và chúng ta có thể dùng nó để lặp tất cả các key trong map.
```javascript
for (const k of m.keys()) {
  console.log(k)
}
```

### Lặp các giá trị trong Map
Map cung cấp cho chúng ta method `values` và chúng ta có thể dùng nó để lặp tất cả các giá trị trong map.
```javascript
for (const k of m.values()) {
  console.log(k)
}
```

### Lặp các cặp key, value trong Map
Map cung cấp cho chúng ta method `entries` và chúng ta có thể dùng nó để lặp tất cả các key trong map.
```javascript
for (const k of m.entries()) {
  console.log(k)
}
```

có thể viết lược giản đi thành:
```javascript
for (const [k, v] of m) {
  console.log(k, v)
}
```

### Convert key/value của map thành mảng
Ta có thể dùng toán tử spread để làm điều này:
```javascript
const ka = [...m.keys()]

const va = [...m.values()]
```

### WeakMap
WeakMap là một loại Map đặc biệt. Nó là một tập hợp các cặp key/value mà các key phải là object còn value thì có thể là các giá trị tùy ý.
<br>

Trong một Map, các item không bao giờ bị tự động giải phóng khỏi bộ nhớ. Còn trong WeakMap thì tất cả các item của nó đều có thể bị giải phóng dễ dàng. Mỗi key trong WeakMap là một object. Khi tham chiếu tới những object này bị mất đi thì các giá trị của chúng có thể bị giải phóng khỏi bộ nhớ. Do đó nó thiếu nhiều tính năng so với Map:
1. bạn không thể lặp WeakMap
2. bạn không thể đồng thời xóa toàn bộ item khỏi WeakMap
3. bạn không thể kiếm tra size của nó
<br>

WeakMap sử dụng được các method sau:
- get(k)
- set(k, v)
- has(k)
- delete(k)
<br>

Các trường hợp có thể sử dụng WeakMap khá là khó xác định so với Map, và bạn có thể sẽ không bao giờ cần phải dùng đến nó, nhưng về bản chất thì nó có thể dùng đề build memory-sensitive cache mà không can thiệp tới việc giải phóng memory hoặc dùng trong việc encapsulation và ẩn thông tin.

# 15. Set
Cấu trúc dữ liệu Set cho phép chúng ta thêm dữ liệu vào một container.
<br>

Một Set là một tập hợp các object hoặc các dữ liệu kiểu nguyên thủy (string, number hoặc boolean), bạn có thể coi nó như một Map mà các giá trị thêm vào được sử dụng làm key, và giá trị của các key này luôn là giá trị boolean true.

### Khởi tạo một Set
Một Set được khởi tạo bằng cách gọi:
```javascript
const s = new Set()
```

### Thêm item vào Set
Bạn có thể thêm item vào Set bằng method `add`:
```javascript
s.add('one')
s.add('two')
```

Một set sẽ chỉ lưu trữ các phần tử unique, nên gọi `s.add('one')` nhiều lần sẽ không thêm dữ liệu mới vào set.
<br>

Bạn không thể cùng lúc thêm nhiều phần tử vào một set mà phải gọi `add()` nhiều lần.

### Kiểm tra xem item có trong set không
```javascript
s.has('one')   // true
s.has('three') // false
```

### Xóa item khỏi Set
Dùng method `delete()`:
```javascript
s.delete('one')
```

### Xác định số item trong một Set
Dùng thuộc tính `size`:
```javascript
s.size
```

### Xóa tất cả item khỏi Set
Dùng method `clear()`:
```javascript
s.clear()
```

### Lặp các item trong một Set
Dùng method `keys()` hoặc `values()` - hai method này tương đương nhau:
```javascript
for (const k of s.keys()) {
  console.log(k)
}

for (const k of s.values()) {
  console.log(k)
}
```

Method `entries()` sẽ trả về một bộ lặp mà bạn có thể sử dụng như sau:
```javascript
const i = s.entries()
console.log(i.next())
```

mỗi lần gọi `i.next()` sẽ trả về từng phần tử dưới dạng một object `{ value, done = false }` cho tới khi vòng lặp kết thúc, lúc đó `done` sẽ là `true`.
<br>

Bạn cũng có thể dùng method forEach() với set:
```javascript
s.forEach(v => console.log(v))
```

hoặc bạn có thể chỉ cần dùng duy nhất vòng lặp `for..of`:
```javascript
for (const k of s) {
  console.log(k)
}
```

### Khởi tạo Set cùng với giá trị
Bạn có thể khởi tạo một Set với nhiều giá trị:
```javascript
const s = new Set([1, 2, 3, 4])
```

### Chuyển các key của Set thành một mảng
Chúng ta có thể sử dụng toán tử spread để làm việc này:
```javascript
const a = [...s.keys()]
// or
const a = [...s.values()]
```

### WeakSet
WeakSet là một loại Set đặc biệt. Nó là một tập hợp chỉ các object. Các object trong nó cũng là unique.
<br>

Trong một Set, các item không bao giờ bị tự động giải phóng khỏi bộ nhớ. Còn trong WeakSet thì tất cả các item của nó đều có thể bị giải phóng dễ dàng. Mỗi key trong WeakSet là một object. Khi tham chiếu tới những object này bị mất đi thì các giá trị của chúng có thể bị giải phóng khỏi bộ nhớ. Do đó nó thiếu nhiều tính năng so với Set:
1. bạn không thể lặp WeakSet
2. bạn không thể đồng thời xóa toàn bộ item khỏi WeakSet
3. bạn không thể kiếm tra size của nó

WeakSet thường chỉ sử dụng trong code ở cấp độ framework và chỉ sử dụng được các method sau:
- add()
- has()
- delete()

# 16. Generators
Generators là một kiểu function đặc biệt với khả năng tạm ngừng chính mình và hoạt đông tiếp sau đó. Khi nó tạm ngừng để đợi, các dòng code khác trong dãy chờ sẽ chạy còn nó thì vẫn có quyền tiếp tục hoạt động khi "thứ nó đợi" hoàn thành.
<br>

Tất cả những việc trên có thể được thực hiện một cách đơn giản chỉ bằng một keyword duy nhất: `yield`. Khi một generator có chứa keyword này thì việc thực thi của nó sẽ có thể được tạm dừng lại.
<br>

Một generator có thể chứa nhiều keyword `yield`, do đó có thể tạm dừng chính nó nhiều lần. Generator được chỉ định bằng keyword `*function`.
<br>

Generator đã mở ra các mô hình lập trình hoàn toàn mới trong JavaScript, cho phép:
- Trao đổi 2 chiều khi một generator đang chạy
- Vòng lặp while có thể tồn tại rất lâu mà không làm cho chương trình của bạn bị treo
<br>

Dưới đây là một ví dụ về generator thể hiện cách nó vận hành như thế nào:
```javascript
function *calculator(input) {
    var doubleThat = 2 * (yield (input / 2))
    var another = yield (doubleThat)
    return (input * doubleThat * another)
}
```

Chúng ta khởi tạo nó với:
```javascript
const calc = calculator(10)
```

Sau đó chúng ta bắt đầu bộ lặp với generator của chúng ta:
```javascript
calc.next()
```

Vòng lặp đầu tiên sẽ khởi động bộ lặp. Code sẽ return cho chúng ta object:
```javascript
{
  done: false
  value: 5
}
```

Giải thích: function được chạy với tham số truyền vào `input = 10`. Nó chạy cho tới khi đến keyword `yield` đầu tiên và trả về content của `yield`: `input / 2` = `5`. Vậy là chúng ta có được giá trị là 5 và status của việc lặp là chưa xong (vì function chỉ đang tạm dừng).
<br>

Trong vòng lặp thứ 2, chúng ta truyền vào giá trị `7`:
```javascript
calc.next(7)
```

và chúng ta nhận lại được:
```javascript
{
  done: false
  value: 14
}
```

`7` đã được đưa vào phần giá trị của biến `doubleThat`. Lúc này `input / 2` sẽ thay bằng `7` và `doubleThat` = 2 * 7.
<br>

Tiếp theo chúng ta tới keyword `yield` thứ hai và nó trả về `doubleThat` dó đó giá trị trả về là `14`.
<br>

Trong vòng lặp tiếp theo và cũng là cuối cùng, chúng ta truyền vào `100`.
```javascript
calc.next(100)
```

Lúc này `doubleThat` được thay bằng `100` do đó `var another` = `100` và chúng ta nhận được:
```javascript
{
  done: true
  value: 14000
}
```

Bởi vì lúc này đã chạy hết các vòng lặp (không còn keyword yield nào nữa) và trong function chúng ta return `(input * doubleThat * another)` tương đương với `10 * 14 *100` = `14000`.

-----

Vậy là mình đã giới thiệu hết các feature trong ES2015. Các bạn có thể đọc tiếp về các feature trong ES2016 ở [bài viết tiếp theo](https://viblo.asia/p/cac-tinh-nang-es2016-es7-1VgZv4rp5Aw).