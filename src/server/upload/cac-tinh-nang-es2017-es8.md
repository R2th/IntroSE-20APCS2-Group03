# 1. String padding
Mục đích của string padding là **thêm kí tự cho string** để nó có thể **đạt được độ dài nhất định**.
<br>

ES2017 mang tới hai method mới cho `String`: `padStart()` và `padEnd()`.
```javascript
padStart(targetLength [, padString])
padEnd(targetLength [, padString])
```

Ví dụ về cách dùng:

```javascript:padStart()
'test'.padStart(3)         // "test"
'test'.padStart(4)         // "test"
'test'.padStart(5)         // " test"
'test'.padStart(6)         // "  test"
'test'.padStart(7, 'abcd') // "abctest"
'test'.padStart(8, 'abcd') // "abcdtest"
'test'.padStart(9, 'abcd') // "abcdatest"
'test'.padStart(3, 'abcd') // "test"
'test'.padStart(4, 'abcd') // "test"
```
<br>

```javascript:padEnd()
'test'.padEnd(3)         // "test"
'test'.padEnd(4)         // "test"
'test'.padEnd(5)         // "test "
'test'.padEnd(6)         // "test  "
'test'.padEnd(7, 'abcd') // "testabc"
'test'.padEnd(8, 'abcd') // "testabcd"
'test'.padEnd(9, 'abcd') // "testabcda"
'test'.padEnd(3, 'abcd') // "test"
'test'.padEnd(4, 'abcd') // "test"
```

# 2. Object.values()
Phương thức này trả về một mảng chứa tất cả các giá trị thuộc tính của chính đối tượng.
<br>

Sử dụng:
```javascript
const person = { name: 'Tung', age: 16 }
Object.values(person) // ['Tung', 16]
```

`Object.values()` cũng có thể dùng với mảng:
```javascript
const person = ['Tung', 16]
Object.values(person) // ['Tung', 16]
```

# 3. Object.entries()
Phương thức này trả về một mảng chứa các thuộc tính của đối tượng dưới dạng một mảng các cặp `[key, value]`.
<br>

Sử dụng:
```javascript
const person = { name: 'Tung', age: 16 }
Object.entries(person) // [["name", "Tung"], ["age", 16]]
```

`Object.entries()` cũng có thể dùng với mảng:
```javascript
const person = ['Tung', 16]
Object.entries(person) // [["0", "Tung"], ["1", 16]]
```

# 4. Object.getOwnPropertyDescriptors()
Phương thức này nhận vào một object và trả về một object chứa tất cả các mô tả của các thuộc tính (không phải kế thừa) của object truyền vào.
<br>

Bất kỳ đối tượng nào trong JavaScript đều có các thuộc tính và mỗi thuộc tính này có một bộ mô tả (descriptor).
<br>

Một bộ mô tả là một tập hợp *"các thuộc tính của một thuộc tính"* bao gồm:
- **value:** giá trị của thuộc tính
- **writable:** thể hiện giá trị của thuộc tính có thế thay đổi được hay không
- **get:** một hàm getter cho thuộc tính (`undefined` nếu không có)
- **set:** một hàm setter cho thuộc tính (`undefined` nếu không có)
- **configurable:** thể hiện việc descriptor của thuộc tính có thể thay đổi được hay không, thuộc tính có thể bị xóa khỏi object hay không
- **enumerable:** thể hiện việc thuộc tính có xuất hiện khi liệt kê các thuộc tính của object hay không

<br>

#### Ứng dụng của method này là gì?
Ở ES6 chúng ta có `Object.assign()` có thể copy tất cả các thuộc tính enumerable từ một hoặc nhiều object và trả về một object mới.
<br>

Tuy nhiên có một vấn đề là vì `Object.assign()` chỉ đọc giá trị của thuộc tính rồi lưu nó vào object được assign thành một thuộc tính dữ liệu đơn thuần nên ví dụ khi một object chỉ có mỗi setter, nó sẽ không được copy sang object mới nếu dùng `Object.assign()`.
<br>

Ví dụ với:
```javascript
const person1 = {
    set name(newName) {
        console.log(newName)
    }
}
```
ta được kết quả là:
![](https://images.viblo.asia/7456a598-cba1-4d41-90bd-acfcc4ee5e85.JPG)

Và khi assign `person1` cho object mới:
```javascript
const person2 = {}
Object.assign(person2, person1)
```
ta sẽ được:
![](https://images.viblo.asia/72d8e653-34d2-4ea4-96ba-becb4b31a74f.JPG)
Nhưng nếu làm như sau thì ta có thể copy được setter:
```javascript
const person3 = {}
Object.defineProperties(person3,
  Object.getOwnPropertyDescriptors(person1))
```
![](https://images.viblo.asia/e6c26cc9-9614-4fa6-a3e5-902dbfe6c312.JPG)

Có thể test đơn giản trên console như sau:
```javascript
person1.name = 'x'
x

person2.name = 'x'

person3.name = 'x'
x
```

Vì `person2` không copy được setter nên sẽ không có log của name.
<br>

Chúng ta cũng sẽ gặp vấn đề tương tự khi sao chép object bằng `Object.create()`.

# 5. Phẩy cuối
Tính năng này cho phép chúng ta thêm dấu phẩy cuối khi định nghĩa hàm hoặc khi gọi hàm (trước đây chỉ có thể thêm phẩy cuối vào mảng và object):
```javascript
const doSomething = (var1, var2,) => {
  //...
}
doSomething(
  'test1',
  'test2',
)
```

Tính năng này hữu dụng khi chúng ta muốn thêm mới phần tử, tham số hoặc thuộc tính... Bạn chỉ cần thêm dòng mới mà không cần phải sửa dòng cũ. Điều này giúp cho việc theo dõi thay đổi giữa các version của code được sạch đẹp dễ nhìn hơn cũng như giúp chúng ta có thể bỏ đi cách viết code thêm dấu phẩy ở đầu dòng.

# 6. Async function
Javascript đã phát triển rất nhanh chóng từ callback sang promise (ES2015), và kể từ ES2017, JavaScript không đồng bộ càng trở nên đơn giản hơn với cú pháp async/await.
<br>

Async function là sự kết hợp của promise và generator. Về cơ bản nó là một cấp độ trừu tượng cao hơn của promise và **async/await được built chính từ promise**.

### Vì sao asynce/await được tạo ra

Khi promise được giiới thiệu ở ES2015, ý nghĩa của nó là để giải quyết những vấn đề của code không đồng bộ và nó đã giải quyết được. Tuy nhiên trong 2 năm từ ES2015 đến ES2017, người ta đã thấy được rõ ràng rằng: promise không phải là giải pháp cuối cùng.
<br>

Promise được đưa ra để giải quyết vấn đề nổi cộm là có quá nhiều callback được lồng vào nhau, tuy vậy nó cũng dẫn tới thêm những điều phức tạp khác từ chính nó cũng như sự phức tạp trong cú pháp.
<br>

Promise chính là một thứ sơ khai mà từ đó giúp các lập trình viên có thể thấy được những cú pháp tốt hơn. Vậy nên cuối cùng chúng ta có được **async function** từ promise.
<br>

Async function giúp cho code trông thì giống như là đồng bộ nhưng thực ra phía sau nó lại là không đồng bộ.

### Cách vận hành

Ví dụ chúng ta có một hàm async trả về một promise như sau:
```javascript
const doSomethingAsync = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('I did something'), 3000)
  })
}
```

Khi bạn **gọi** hàm này hãy thêm `await` vào phía trước hàm và **code được gọi sẽ dừng lại cho đến khi promise được resolve hoặc bị reject**. Tuy nhiên cần lưu ý rằng: hàm gọi phải được định nghĩa với `async`. Ví dụ:
```javascript
const doSomething = async () => {
  console.log('Before')
  console.log(await doSomethingAsync())
  console.log('After')
}

doSomething()
```

Kết quả:
```javascript
Before
I did something // sau 3s
After
```

### Async function luôn promise

Thêm keyword `async` vào phía trước bất kì một hàm nào sẽ khiến cho hàm đó trả về một promise.
<br>

Dù cho không cần khai báo promise, thực ra bên trong hàm vẫn sẽ trả về một promise.
<br>

Vì vậy nên đoạn code này:
```javascript
const aFunction = async () => {
  return 'test'
}

aFunction().then(alert)
```

sẽ giống với:
```javascript
const aFunction = async () => {
  return Promise.resolve('test')
}

aFunction().then(alert)
```

### Async function nối tiếp nhau
Async function có thể được nối với nhau rất dễ dàng và cú pháp của nó dễ đọc hơn rất nhiều so với việc dùng promise đơn thuần:
```javascript
const promiseToDoSomething = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve("I did something"), 10000)
  })
}

const waitingForSomethingToBeDone = async () => {
  const something = await promiseToDoSomething()
  return something + " and I'm waiting"
}

const stillWaitingForSomethingToBeDone = async () => {
  const something = await waitingForSomethingToBeDone()
  return something + " and I'm still waiting"
}

console.log(await stillWaitingForSomethingToBeDone()) // I did something and I'm waiting and I'm still waiting
```

# 7. Shared Memory và Atomics

WebWorkers được sử dụng để tạo các chương trình đa luồng trong trình duyệt.
<br>

Nó cung cấp một giao thức nhắn tin thông qua các sự kiện. Kể từ ES2017, bạn có thể tạo một mảng bộ nhớ chung giữa web workers và creator của chúng bằng cách sử dụng `SharedArrayBuffer`.
<br>

Vì không rõ mất bao nhiêu thời gian để ghi vào phần bộ nhớ dùng chung nên **Atomics** đã xuất hiện để có thể đảm bảo rằng khi đọc một giá trị thì các thao tác viết đã được hoàn thành.
<br>

Chi tiết hơn về tính năng này bạn có thể đọc tại bài đề xuất spec [này](https://github.com/tc39/ecmascript_sharedmem/blob/master/TUTORIAL.md) .

---

Trên đây là các tính năng ES2017. Các bạn có thể đọc thêm về các tính năng ES2018 tại [bài viết tiếp theo](https://viblo.asia/p/cac-tinh-nang-es2018-es9-924lJpeWKPM).