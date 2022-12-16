Trong lập trình, chúng ta lưu trữ data dưới dạng các biến. Tạo một copy tức là khởi tạo một biến mới có cùng giá trị. Tuy nhiên luôn có cạm bẫy luôn rình rập, đó là deep copy và shallow copy.
**Deep copy** (sao chép sâu :joy:) tức là tạo mới một biến có cùng giá trị và được cắt đứt quan hệ hoàn toàn với biến được copy. **Shallow copy** có ý nghĩa  rằng sau khi copy, biến mới hoặc các thành phần của biến mới vẫn còn quan hệ dây mơ rễ má với biến ban đầu, nguy hiểm quá nhỉ.
Để hiểu thêm về copy, chúng ta cùng tìm hiểu về cách Javascript lưu dữ liệu.

## Các kiểu dữ liệu nguyên thủy
Đây là các kiểu dữ liệu nguyên thủy:

* Number , ví dụ 1
* String, ví dụ 'Hello'
* Boolean , ví dụ true
* undefined
* null

Với các kiểu dữ liệu nguyên thủy, khi được gán giá trị sẽ được gắn chặt với biến, bạn sẽ không phải lo lắng về việc copy các biến này vì bạn sẽ luôn có được một ban sao thực thụ (biến mới tách biệt hoàn toàn so với biến cũ :joy:)

```javascript:js
const a = 5
let b = a // tạo copy

b = 6

// thay đổi giá trị bản sao b không làm thay đổi giá trị "bản gốc" a (duocday)
console.log(b) // 6
console.log(a) // 5
```

## Kiểu dữ liệu hỗn hợp (Object và Array)
Về mặt bản chất, array cũng là object, thế nên chúng cũng xảy ra vấn đề tương tự nhau trong trường hợp này
```go:js
let a = []
typeof a // "object"
```

Có một điều thú vị, khi thực hiện copy object hoặc array vào một biến mới, biến đó sẽ chỉ tham chiểu của giá trị bạn đầu.

```javascript:js
const a = {
  en: 'Hello',
  vi: 'Xin chào'
}

let b = a
b.vi = 'Chao xìn'
console.log(b.vi) // Chao xìn
console.log(a.vi) // Chao xìn
```

Một điều thú vị nữa, trong ví dụ trên dù a được định nghĩa là const nhưng ta vẫn thay đổi được giá trị, bạn có biết tại sao không? (dx)
Quay lại, chúng ta thực sự đã tạo ra 1 shallow copy trong ví dụ trên. Điều này thường sẽ gây ra sai sót nếu chúng ta sử dụng không hợp lý, thay vì thay đổi giá trị của biến mới, chúng ta cũng làm giá trị của biến ban đầu thay đổi.
Vậy làm thế nào để copy một cachs an toàn các Array và Object?

## Object
### Spread operator
Spread operator (Toán tử 3 chấm) là một điều tuyệt vời của ES6, bạn có thể sử dụng nó để deep copy một object như sau:

```javascript:js
const a = {
  en: 'Hello',
  vi: 'Xin chào'
}

let b = {...a}
b.vi = 'Chao xìn'
console.log(b.vi) // Chao xìn
console.log(a.vi) // Xin chào
```
Bạn cũng có thể lưỡng long nhất thể 2 (hoặc nhiều hơn) object bằng spread operator:
```css:js
const d = {...a, ...b, ...c}
```

### Object.assign
Đây là một cách dùng phổ biến trước khi Spread operator được phát minh ra, cũng cho ra kết quả tương tự. Nhưng lưu ý, các thành phần của đối số đầu tiên vẫn có thể thay đổi được, thế nên object cần copy nên ở đối số thứ 2 trở đi, bạn có thể assign object cần copy với một object rỗng `{}`, đây là các thường dùng.

```javascript:js
const a = {
  en: 'Hello',
  vi: 'Xin chào'
}

let b = Object.assign({}, a)
b.vi = 'Chao xìn'
console.log(b.vi) // Chao xìn
console.log(a.vi) // Xin chào
```

### Cạm bẫy: Object lồng nhau
```javascript:js
const a = {
  languages: {
    vi: 'Xin chào'
  }
}
let b = {...a}
b.languages.vi = 'Chao xìn'
console.log(b.languages.vi) // Chao xìn
console.log(a.languages.vi) // Chao xìn
```
OMG, nó thay đổi cả hai, để giải quyết vấn đề này, `stringify` object sau đó `parse` nó :joy_cat: 
```markdown:js
const a = {
  languages: {
    vi: 'Xin chào'
  }
}
let b = JSON.parse(JSON.stringify(a))
b.languages.vi = 'Chao xìn'
console.log(b.languages.vi) // Chao xìn
console.log(a.languages.vi) // Xin chào
```
## Arrays
Như đã nói array thực chất cũng là object nên việc copy array cũng tương tự như bên trên:
### Spread operator
```shell:js
const a = [1,2,3]
let b = [...a]
b[1] = 4
console.log(b[1]) // 4
console.log(a[1]) // 2
```
### Các Array function :  map, filter, reduce
Những phương thức này sẽ tạo một array mới chứa các giá trị của array cũ, bạn cũng có thể tùy chỉnh để tạo ra array mới có giá trị khác array cũ

```shell:js
const a = [1,2,3]
let b = a.map(el => el)
b[1] = 4
console.log(b[1]) // 4
console.log(a[1]) // 2
```

Thay đổi giá trị lúc copy:
```rust:js
const a = [1,2,3]
const b = a.map((el, index) => index === 1 ? 4 : el)
console.log(b[1]) // 4
console.log(a[1]) // 2
```
### Array.slice
Phuowng thức này thường đực dùng để "cắt" array ra thành một array nhỏ hơn, nhưng bạn cũng có thể sử dụng `array.slice()` hoặc `array.slice(0)` để tạo ra một bản copy:

```shell:js
const a = [1,2,3]
let b = a.slice(0)
b[1] = 4
console.log(b[1]) // 4
console.log(a[1]) // 2
```
### Array lồng nhau
Tương tự object, sử dụng `JSON.parse(JSON.stringify(array))`

## Copy instance của Class
Class cũng là object, nhưng bạn không thể sử dụng `stringify` và `parse` để copy như một object bình thường được vì việc này sẽ làm mất đi các phương thức bên trong object của bạn. Để làm việc này, bạn có thể thêm một phương thức `copy` để trả về một instance mới với các giá trị ban đầu, hơi chuối nhỉ :joy:

```javascript:js
class Counter {
  constructor() {
     this.count = 5
  }
  copy() {
    const copy = new Counter()
    copy.count = this.count
    return copy
  }
}
const originalCounter = new Counter()
const copiedCounter = originalCounter.copy()
console.log(originalCounter.count) // 5
console.log(copiedCounter.count) // 5
copiedCounter.count = 7
console.log(originalCounter.count) // 5
console.log(copiedCounter.count) // 7
```
Trên [đây](https://nobi.dev) là một số cách deep copy dữ liệu, cảm ơn bạn đã theo dõi. :joy: