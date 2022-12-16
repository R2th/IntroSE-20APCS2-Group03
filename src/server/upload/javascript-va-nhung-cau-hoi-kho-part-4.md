**Part 1**: https://viblo.asia/p/javascript-va-nhung-cau-hoi-kho-E375zgyjKGW

**Part 2**: https://viblo.asia/p/javascript-va-nhung-cau-hoi-kho-part-2-63vKjwjxZ2R

**Part 3**: https://viblo.asia/p/javascript-va-nhung-cau-hoi-kho-part-3-gAm5yGWLZdb

Hi vọng các bạn sẽ có thêm những trải nghiệm mới mẻ với JavaScript  😎

*Trên đời vốn chỉ có 2 loại ngôn ngữ lập trình: loại bị nhiều người chê và loại không ai thèm dùng.*

---

#### 84. Output là gì?

```javascript
function checkAge(age) {
  if (age < 18) {
    const message = "Sorry, you're too young."
  } else {
    const message = "Yay! You're old enough!"
  }

  return message
}

console.log(checkAge(21))
```

- A: `"Sorry, you're too young."`
- B: `"Yay! You're old enough!"`
- C: `ReferenceError`
- D: `undefined`


##### Đáp án: C

Biến số được khai báo với các từ khóa như `const` hay `let` đều là _block-scoped_. Block chính là những khối được bao bọc bởi cặp ngoặc nhọn (`{ }`). Trong trường hợp này nó chính là cặp ngoặc bao quanh những câu lệnh `if/else`. Chúng ta không thể truy cập đến biến đó bên ngoài block, và kết quả là throw một ReferenceError.

---

#### 85. Những thông tin nào sẽ được ghi ra?

```javascript
fetch('https://www.website.com/api/user/1')
  .then(res => res.json())
  .then(res => console.log(res))
```

- A: The result of the `fetch` method.
- B: The result of the second invocation of the `fetch` method.
- C: The result of the callback in the previous `.then()`.
- D: It would always be undefined. 


##### Đáp án: C

Giá trị của `res` trong `.then` thứ hai chính là giá trị trả về từ `.then` trước đó. Chúng ta có thể thực hiện `.then` liên tiếp như vậy, các giá trị sẽ liên tiếp được truyền tới hàm xử lý tiếp theo.

---

#### 86. Bằng cách nào chúng ta có thể set `hasName` bằng `true`, nếu chúng ta không đưa `true` vào đối số?

```javascript
function getName(name) {
  const hasName = //
}
```

- A: `!!name`
- B: `name`
- C: `new Boolean(name)`
- D: `name.length`


##### Đáp án: A

Với `!!name`, chúng ta sẽ đánh giá giá trị của `name` là _truthy_ hay _falsy_. Nếu name là truthy, thì `!name` sẽ trả về `false`. `!false` (hay chính là `!!name` khi này) sẽ trả về `true`.

Bằng cách set `hasName` bằng với `name`, chúng ta set `hasName` bằng với giá trị đối số đưa vào trong hàm `getName`, không thỏa mãn vì ta đã giới hạn là không đưa `true` vào.

`new Boolean(true)` trả về một object wrapper, chứ không phải là một giá trị boolean.

`name.length` trả về độ dài của đối số, chứ không phải `true`.

---

#### 87. Output là gì?

```javascript
console.log("I want pizza"[0])
```

- A: `"""`
- B: `"I"`
- C: `SyntaxError`
- D: `undefined`


##### Đáp án: B

Trong trường hợp ta muốn lấy ra một ký tự trong một chuỗi, ta có thể sử dụng toán tử ngoặc vuông. Ký tự đầu tiên sẽ có thứ tự là 0, và cứ tiếp tục như vậy. Trong trường hợp này chúng ta lấy ra ký tự có thứ tự là 0, đó chính là ký tự `"I'`.

Chú ý là phương thức này không hoạt động với IE7 trở xuống. Thay vì thế ta sử dụng `.charAt()`

---

#### 88. Output là gì?

```javascript
function sum(num1, num2 = num1) {
  console.log(num1 + num2)
}

sum(10)
```

- A: `NaN`
- B: `20`
- C: `ReferenceError`
- D: `undefined`


##### Đáp án: B

Ta có thể set giá trị mặc định của một tham số là tham số khác trong hàm, miễn là tham số đó được khai báo _trước_ tham số mặc định. Chúng ta đưa `10` vào hàm `sum`. Nếu hàm `sum` chỉ nhận 1 đối số, nó có nghĩa là giá trị của `num2` không được đưa vào, nên nó sẽ lấy giá trị mặc định là giá trị của `num1` đã được đưa vào, hay chính là `10` trong trường hợp này. Khi này `num1 + num2` trả về `20`.

Nếu chúng ta thử set một giá trị mặc định của tham số bằng với giá trị của tham số khai báo _sau_ (về bên phải), giá trị của tham số đó sẽ không được khởi tạo và dẫn đến throw ra lỗi. 

---

#### 89. Output là gì?

```javascript
// module.js 
export default () => "Hello world"
export const name = "Lydia"

// index.js 
import * as data from "./module"

console.log(data)
```

- A: `{ default: function default(), name: "Lydia" }`
- B: `{ default: function default() }`
- C: `{ default: "Hello world", name: "Lydia" }`
- D: Global object of `module.js`


##### Đáp án: A

Cú pháp `import * as data` sẽ import _tất cả những gì được export_ từ `module.js` vào trong `index.js` và lưu trữ dưới một object có tên là `data`. Trong file `module.js`, có hai thứ được export ra: default export và một named export. Default export là một hàm trả về chuỗi `"Hello World"`, và named export là một biến `name` nhận giá trị là chuỗi `"Lydia"`. 

Do đó `data` object có thuộc tính `default` cho default export, các thuộc tính khác sẽ có tên chính là tên của named exports và giá trị đi kèm. 

---

#### 90. Output là gì?

```javascript
class Person {
  constructor(name) {
    this.name = name
  }
}

const member = new Person("John")
console.log(typeof member)
```

- A: `"class"`
- B: `"function"`
- C: `"object"`
- D: `"string"`


##### Đáp án: C

Classes chỉ đơn thuần là `syntactical sugar` (cú pháp đặc biệt) của function constructors mà thôi. Nó tương đương với việc ta viết một function thế này:

```javascript
function Person() {
  this.name = name
}
```

Gọi một constructor với từ khóa `new` sẽ tạo ra một instance của class `Person`, `typeof` sẽ trả về là `"object"` cho các instance. Do đó `typeof member` trả về `"object"`. 

---

#### 91. Output là gì?

```javascript
let newList = [1, 2, 3].push(4)

console.log(newList.push(5))
```

- A: `[1, 2, 3, 4, 5]`
- B: `[1, 2, 3, 5]`
- C: `[1, 2, 3, 4]`
- D: `Error`


##### Đáp án: D

Hàm `.push` trả về _độ dài mới_ của mảng, chứ không phải bản thân mảng đó! Bằng cách set `newList` bằng với `[1, 2, 3].push(4)`, ta đã set cho `newList` giá trị là `4` - tức độ dài của mảng lúc này. 

Sau đó chúng ta tiến hành `.push` trên `newList`. Vì `newList` là một số thông thường, ta không thể dùng `.push` được, nên sẽ throw ra một TypeError.

---

#### 92. Output là gì?

```javascript
function giveLydiaPizza() {
  return "Here is pizza!"
}

const giveLydiaChocolate = () => "Here's chocolate... now go hit the gym already."

console.log(giveLydiaPizza.prototype)
console.log(giveLydiaChocolate.prototype)
```

- A: `{ constructor: ...}` `{ constructor: ...}` 
- B: `{}` `{ constructor: ...}` 
- C: `{ constructor: ...}` `{}`
- D: `{ constructor: ...}` `undefined`


##### Đáp án: D

Hàm thông thường giống như `giveLydiaPizza`, sẽ có thuộc tính `prototype` là một object (prototype object) với một thuộc tính là `constructor`. Còn `arrow functions` giống như `giveLydiaChocolate`thì không có thuộc tính `prototype` này. `undefined` trả về khi ta truy cập thuộc tính `prototype` bằng cách gọi `giveLydiaChocolate.prototype`. 

---

#### 93. Output là gì?

```javascript
const person = {
  name: "Lydia",
  age: 21
}

for (const [x, y] of Object.entries(person)) {
  console.log(x, y)
}
```

- A: `name` `Lydia` và `age` `21`
- B: `["name", "Lydia"]` và `["age", 21]` 
- C: `["name", "age"]` và `undefined`
- D: `Error`


##### Đáp án: A

`Object.entries(person)` sẽ trả về một mảng của mảng, bao gồm các key và các object:

`[ [ 'name', 'Lydia' ], [ 'age', 21 ] ]` 

Khí sử dụng `for-of`, chúng ta sẽ duyệt qua từng thành phần của mảng, trong trường hợp này chính là những mảng con. Đồng thời tiến hành gán giá trị luôn trong vòng lặp for-of, bằng cách sử dụng `const [x, y]`. Khi này `x` sẽ là phần tử đầu tiên trong mảng con, `y` chính là phần tử thứ hai trong mảng con. 

Mảng con đầu tiên là `[ "name", "Lydia" ]`, nên `x` sẽ là `"name"`, và `y` sẽ là `"Lydia"`, và được ghi ra.
Mảng con thứ hai là `[ "age", 21 ]`, nên `x` sẽ là `"age"`, và `y` sẽ là `21`, và được ghi ra.

---

#### 94. Output là gì?

```javascript
function getItems(fruitList, ...args, favoriteFruit) {
  return [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")
```

- A: `["banana", "apple", "pear", "orange"]`
- B: `[["banana", "apple"], "pear", "orange"]` 
- C: `["banana", "apple", ["pear"], "orange"]`
- D: `SyntaxError`


##### Đáp án: D

`...args` là cú pháp tham số cuối cùng. Giá trị của tham số cuối cùng chính là toàn bộ các đối số còn lại, **và nó là tham số cuối cùng duy nhất**! Trong trường hợp này, tham số cuối cùng lại là tham số thứ hai. Điều đó là không thể được, và sẽ throw ra một lỗi cú pháp. 

```javascript
function getItems(fruitList, favoriteFruit, ...args) {
  return [...fruitList, ...args, favoriteFruit]
}

getItems(["banana", "apple"], "pear", "orange")
```

Nếu ta code như thế này thì lại đúng. Giá trị trả về sẽ là `[ 'banana', 'apple', 'orange', 'pear' ]

---

#### 95. Output là gì?

```javascript
function nums(a, b) {
  if
  (a > b)
  console.log('a is bigger')
  else 
  console.log('b is bigger')
  return 
  a + b
}

console.log(nums(4, 2))
console.log(nums(1, 2))
```

- A: `a is bigger`, `6` và `b is bigger`, `3`
- B: `a is bigger`, `undefined` và `b is bigger`, `undefined`
- C: `undefined` và `undefined`
- D: `SyntaxError`


##### Đáp án: B

Với JavaScript, ta _không bắt buộc_ phải viết dấu chấm phẩy (`;`), JavaScript engine sẽ tự động thêm vào sau mỗi câu lệnh. Nó gọi là **Automatic Semicolon Insertion**. Một câu lệnh có thể là khai báo biến, hoặc từ khóa như `throw`, `return`, `break`, vv. 

Ở đây ta sử dụng câu lệnh `return` ở một dòng và giá trị `a + b` ở một _dòng khác_. Tuy nhiên do khác dòng nên JS engine không thể biết đâu là giá trị ta thực sự muốn trả về. Thay vì thế, nó sẽ tự động thêm vào dấu chấm phẩy ngay sau `return` giống như này:

```javascript
  return;
  a + b
```

Có nghĩa là `a + b` sẽ không bao giờ được thực hiện, vì hàm đã được `return` rồi. Do không giá trị nào được trả về, nên giá trị trả về của hàm sẽ là `undefined`. Lưu ý là sẽ không tự động thêm dấu chấm phẩy ngay sau `if/else` đâu nhé!

---

#### 96. Output là gì?

```javascript
class Person {
  constructor() {
    this.name = "Lydia"
  }
}

Person = class AnotherPerson {
  constructor() {
    this.name = "Sarah"
  }
}

const member = new Person()
console.log(member.name)
```

- A: `"Lydia"`
- B: `"Sarah"`
- C: `Error: cannot redeclare Person`
- D: `SyntaxError`


##### Đáp án: B

Chúng ta có thể set một class với giá trị là một classes/function constructor khác. Trong trường hợp này, ta set `Person` bằng với `AnotherPerson`. Trong constructor, `this.name` là `Sarah`, do đó giá trị của thuộc tính này trong instance `member` chính là `"Sarah"`.

---

#### 97. Output là gì?

```javascript
const info = {
  [Symbol('a')]: 'b'
}

console.log(info)
console.log(Object.keys(info))
```

- A: `{Symbol('a'): 'b'}` và `["{Symbol('a')"]`
- B: `{}` và `[]`
- C: `{ a: "b" }` và `["a"]`
- D: `{Symbol('a'): 'b'}` và `[]`


##### Đáp án: D

Phương thức `Object.keys` sẽ trả về toàn bộ những key của các thuộc tính _enumerable_ trên một object. Nhưng Symbol không phải dạng _enumerable_. do đó nó sẽ trả về một mảng rỗng. Tuy nhiên khi ta log ra toàn bộ object, thì ta sẽ ghi ra toàn bộ các thuộc tính, cho dù đó có là thuộc tính _enumerable_ hay không.

Đó chính là một đặc trưng của Symbol: Bên cạnh việc nó biểu diễn một giá trị duy nhất (tránh việc xảy ra xung đột tên gọi, ví dụ khi ta sử dụng 2 thư viện mà muốn thêm thuộc tính vào cho cùng một object chẳng hạn), nó còn giúp "ẩn" thuộc tính đó đi (dù không hoàn toàn, ta vẫn có thể truy cập được bằng cách sử dụng phương thức `Object.getOwnPropertySymbols()`).

---

#### 98. Output là gì?

```javascript
const getList = ([x, ...y]) => [x, y]
const getUser = user => { name: user.name, age: user.age }

const list = [1, 2, 3, 4]
const user = { name: "Lydia", age: 21 }

console.log(getList(list))
console.log(getUser(user))
```

- A: `[1, [2, 3, 4]]` và `undefined`
- B: `[1, [2, 3, 4]]` và `{ name: "Lydia", age: 21 }`
- C: `[1, 2, 3, 4]` và `{ name: "Lydia", age: 21 }`
- D: `Error` và `{ name: "Lydia", age: 21 }`


##### Đáp án: A

Hàm `getList` nhận vào một mảng các đối số, và tiến hành xử lý mảng đó luôn khi đưa vào hàm:

 `[x, ...y] = [1, 2, 3, 4]`

 Với việc sử dụng cú pháp tham số cuối cùng `...y`, chúng ta đưa toàn bộ "những đối số còn lại" vào một mảng y. Trong trường hợp này đó là mảng gồm các phần tử `2`, `3` và `4`. Do đó giá trị của `y` lúc này chính là mảng `[2, 3, 4]`. Giá trị của `x` là `1`, nên khi ghi `[x, y]` ra, kết quả sẽ là `[1, [2, 3, 4]]`.

Hàm `getUser` nhận vào một object. Với cú pháp arrow function, chúng ta sẽ không phải viết trong ngoặc nhọn `{}` nữa nếu ta chỉ muốn đơn thuần trả về giá trị. Tuy nhiên, nếu ta muốn trả về một _object_ t arrow function, ta sẽ phải viết chúng trong dấu ngoặc tròn `()`, nếu không thì sẽ không có giá trị nào được trả về! Ví dụ như sau:

```const getUser = user => ({ name: user.name, age: user.age })```

Do không giá trị nào được trả về, kết quả sẽ là `undefined`.

---

#### 99. Output là gì?

```javascript
const name = "Lydia"

console.log(name())
```

- A: `SyntaxError`
- B: `ReferenceError`
- C: `TypeError`
- D: `undefined`


##### Đáp án: C

Biến `name` có giá trị là một chuỗi, không phải hàm, vì thế không thể gọi được. 

TypeErrors sẽ được throw ra nếu một giá trị không được sử dụng đúng kiểu. JavaScript muốn `name` là một hàm khi ta tiến hành gọi nó. Nhưng nó là chuỗi, nên sẽ throw ra một TypeError.

SyntaxErrors sẽ được throw khi ta viết code không đúng cú pháp của JavaScript, ví dụ thay vì `return` ta viết `retrun`. 

ReferenceErrors sẽ được throw ra khi Javascript không thể tìm được tham chiếu nào đến giá trị mà ta đang cố truy cập.

---

#### 100. Output là gì?

```javascript
// 🎉✨ Đây là câu hỏi thứ 100 của tôi! ✨🎉

const output = `${[] && 'Im'}possible!
You should${'' && `n't`} see a therapist after so much JavaScript lol`
```

- A: `possible! You should see a therapist after so much JavaScript lol`
- B: `Impossible! You should see a therapist after so much JavaScript lol`
- C: `possible! You shouldn't see a therapist after so much JavaScript lol`
- D: `Impossible! You shouldn't see a therapist after so much JavaScript lol`


##### Đáp án: B

`[]` là một giá trị truthy. Với phép toán `&&` , giá trị bên phải sẽ được trả về nếu giá trị bên trái là truthy. Trong trường hợp này giá trị bên trái `[]` là truthy, nên `"Im'` sẽ được trả về.

`""` là một giá trị falsy. Nếu giá trị bên trái là falsy, không có gì được trả về cả. Do đó `n't` sẽ không được trả về.

---

#### 101. Output là gì?

```javascript
const one = (false || {} || null)
const two = (null || false || "")
const three = ([] || 0 || true)

console.log(one, two, three)
```

- A: `false` `null` `[]`
- B: `null` `""` `true`
- C: `{}` `""` `[]`
- D: `null` `null` `true`


##### Đáp án: C

Với phép toán `||`, ta sẽ trả về giá trị truthy đầu tiên. Nếu tất cả đều là falsy, giá trị cuối cùng sẽ được trả về.

`(false || {} || null)`: object rỗng `{}` là một giá trị truthy. Nó là giá trị truthy đầu tiên và duy nhất nên sẽ được trả về. Do đó `one` sẽ là `{}`.

`(null || false || "")`: Tất cả toán hạng đều là falsy. Có nghĩa là toán hạng cuối cùng `""` sẽ được trả về. Do đó `two` sẽ là `""`.

`([] || 0 || "")`: mảng rỗng `[]` là một giá trị truthy. Nó là giá trị truthy đầu tiên nên sẽ được trả về. Do đó `three` sẽ là `[]`.

---