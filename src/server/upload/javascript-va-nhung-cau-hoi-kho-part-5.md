**Part 1**: https://viblo.asia/p/javascript-va-nhung-cau-hoi-kho-E375zgyjKGW

**Part 2**: https://viblo.asia/p/javascript-va-nhung-cau-hoi-kho-part-2-63vKjwjxZ2R

**Part 3**: https://viblo.asia/p/javascript-va-nhung-cau-hoi-kho-part-3-gAm5yGWLZdb

**Part 4**: https://viblo.asia/p/javascript-va-nhung-cau-hoi-kho-part-4-Do75464VZM6

Hi vọng các bạn sẽ có thêm những trải nghiệm mới mẻ với JavaScript  😎

*Trên đời vốn chỉ có 2 loại ngôn ngữ lập trình: loại bị nhiều người chê và loại không ai thèm dùng.*

---

#### 102. Output là gì?

```javascript
const myPromise = () => Promise.resolve('I have resolved!')

function firstFunction() {
  myPromise().then(res => console.log(res))
  console.log('second')
}

async function secondFunction() {
  console.log(await myPromise())
  console.log('second')
}

firstFunction()
secondFunction()
```

- A: `I have resolved!`, `second` và `I have resolved!`, `second`
- B: `second`, `I have resolved!` và `second`, `I have resolved!`
- C: `I have resolved!`, `second` và `second`, `I have resolved!`
- D: `second`, `I have resolved!` và `I have resolved!`, `second`

##### Đáp án: D

Có thể tưởng tượng đơn giản cách promise thực thi như sau: _bây giờ tôi sẽ để tạm nó sang một bên vì nó tính toán mất thời gian. Chỉ khi nào nó được hoàn thành (resolved) hay bị hủy bỏ (rejected) hay khi call stack trở nên rỗng thì tôi sẽ lấy giá trị trả về ra._

Dù chúng ta có thể sử dụng giá trị thu được bằng cú pháp `.then`, hoặc sử dụng cặp cú pháp `await/async`, nhưng, cách chúng hoạt động là khác nhau.

Trong `firstFunction`, chúng ta đưa promise qua một bên chờ cho nó tính toán xong, và vẫn tiếp tục chạy những code tiếp sau đó, theo đó `console.log('second')` sẽ được chạy. Sau đó promise được hoàn thành trả về giá trị `I have resolved`, giá trị này sẽ được log ra khi call stack trở nên rỗng. 

Với từ khóa `await` trong `secondFunction`, ta đã tạm dừng một hàm bất đồng bộ cho tới khi chúng trả về giá trị, sau đó ta mới đi tiếp đến các câu lệnh tiếp theo.

Do đó nó sẽ chờ cho tới khi `myPromise` được hoàn thành và trả về giá trị `I have resolved`, sau đó chúng ta sẽ chạy tiếp câu lệnh tiếp theo in ra `second`. 


---

#### 103. Output là gì?

```javascript
const set = new Set()

set.add(1)
set.add("Lydia")
set.add({ name: "Lydia" })

for (let item of set) {
  console.log(item + 2)
}
```

- A: `3`, `NaN`, `NaN`
- B: `3`, `7`, `NaN`
- C: `3`, `Lydia2`, `[object Object]2`
- D: `"12"`, `Lydia2`, `[object Object]2`

##### Đáp án: C

Phép toán `+` không chỉ dùng để cộng các số, mà nó còn dùng để nối chuỗi nữa. Mỗi khi Javascript engine gặp một giá trị trong phép toán không phải dạng số, nó sẽ chuyển các số trong phép toán đó sang dạng chuỗi. 

Phép toán đầu tiên item là một số `1`, nên `1 + 2` trả về 3.

Ở phép toán thứ hai, item là một chuỗi `"Lydia"`. trong khi đó `2` là một số, nên `2` sẽ bị chuyển sang dạng chuỗi, sau khi nối vào ta có chuỗi `"Lydia2"`. 

Ở phép toán thứ ba, `{ name: "Lydia" }` là một object. Tuy nhiên dù có là object hay gì đi nữa thì nó cũng sẽ bị chuyển sang dạng chuỗi. Đối với object thì khi chuyển sang dạng chuỗi nó sẽ trở thành `"[object Object]"`. `"[object Object]"` nối với `"2"` trở thành `"[object Object]2"`.


---

#### 104. Output là gì?

```javascript
Promise.resolve(5)
```

- A: `5`
- B: `Promise {<pending>: 5}`
- C: `Promise {<resolved>: 5}`
- D: `Error`

##### Đáp án: C

Ta có thể truyền vào giá trị bất kì cho `Promise.resolve`, dù có là promise hay không promise. Bản thân nó sẽ là một hàm trả về một promise với giá trị đã được resolved.

Trong trường hợp này ta đưa vào giá trị `5`. Nó sẽ trả về một resolved promise với giá trị `5`. 


---

#### 105. Output là gì?

```javascript
function compareMembers(person1, person2 = person) {
  if (person1 !== person2) {
    console.log("Not the same!")
  } else {
    console.log("They are the same!")
  }
}

const person = { name: "Lydia" }

compareMembers(person)
```

- A: `Not the same!`
- B: `They are the same!`
- C: `ReferenceError`
- D: `SyntaxError`

##### Đáp án: B

Object sẽ được truyền vào hàm theo reference. Khi chúng ta nói so sánh strict equal (`===`), nghĩa là ta đang so sánh các reference của chúng. 

Ta set giá trị mặc định của `person2` là object `person`, và đưa object `person` vào làm giá trị cho đối số `person1`.

Điều đó có nghĩa là chúng cùng trỏ đến một object trong bộ nhớ, do đó chúng bằng nhau, và `They are the same!` được in ra.


---

#### 106. Output là gì?

```javascript
const colorConfig = {
  red: true,
  blue: false,
  green: true,
  black: true,
  yellow: false,
}

const colors = ["pink", "red", "blue"]

console.log(colorConfig.colors[1])
```

- A: `true`
- B: `false`
- C: `undefined`
- D: `TypeError`

##### Đáp án: D

Trong Javascript ta có hai cách để truy cập thuộc tính của một object: sử dụng ngoặc vuông `[]`, hoặc sử dụng chấm `.`. Trong trương hợp này chúng ta sử dụng chấm (`colorConfig.colors`) thay cho ngoặc vuông (`colorConfig["colors"]`). 

Với cách sử dụng chấm, Javascript sẽ tìm kiếm một thuộc tính có tên chính xác như tên ta đưa vào. Trong trường hợp này nó là thuộc tính `colors` trong object `colorConfig` Tuy nhiên trong object này không có thuộc tính nào tên là  `colors`, nên nó sẽ trả về `undefined`. Sau đó chúng ta cố truy cậ vào thuộc tính 1 của nó bằng cách gọi `[1]`. Chúng ta không thể làm như vậy trên giá trị `undefined`, nên nó sẽ trả về `TypeError`: `Cannot read property '1' of undefined`.

Javascript thông dịch theo câu lệnh. Khi ta sử dụng ngoặc vuông, Nnó sẽ tìm mở ngoặc đầu tiên `[` và tiếp tục cho tới khi gặp đóng ngoặc tương ứng `]`. Chỉ khi đó nó mới đánh giá câu lệnh. Nếu chúng ta sử dụng cú pháp `colorConfig[colors[1]]`, nó sẽ trả về giá trị của thuộc tính `red` trong object `colorConfig`. 


---

#### 107. Ouput là gì?

```javascript
console.log('❤️' === '❤️')
```

- A: `true`
- B: `false`

##### Đáp án: A

Về cơ bản, emoji vẫn là các ký tự unicode mà thôi. Mã unicode cho hình trái tim là `"U+2764 U+FE0F"`. Chúng luôn luôn là một, nên phép toán đơn giản trả về `true`. 


---

#### 108. Phép toán nào sau đây làm thay đổi mảng gốc?

```javascript
const emojis = ['✨', '🥑', '😍']

emojis.map(x => x + '✨')
emojis.filter(x => x !== '🥑')
emojis.find(x => x !== '🥑')
emojis.reduce((acc, cur) => acc + '✨')
emojis.slice(1, 2, '✨') 
emojis.splice(1, 2, '✨')
```

- A: `All of them`
- B: `map` `reduce` `slice` `splice`
- C: `map` `slice` `splice` 
- D: `splice`

##### Đáp án: D

Với `splice`, ta thay đổi mảng gốc bằng cách thêm sửa xóa các phần tử. Trong trường hợp này ta xóa 2 phần tử kể từ index 1 (ta xóa `'🥑'` và `'😍'`) và thêm vào ✨ emoji. 

`map`, `filter` và `slice` trả về một mảng mới, `find` trả về một phần tử, và `reduce` trả về giá trị tích lũy.


---

#### 109. Output là gì?

```javascript
const food = ['🍕', '🍫', '🥑', '🍔']
const info = { favoriteFood: food[0] }

info.favoriteFood = '🍝'

console.log(food)
```

- A: `['🍕', '🍫', '🥑', '🍔']`
- B: `['🍝', '🍫', '🥑', '🍔']`
- C: `['🍝', '🍕', '🍫', '🥑', '🍔']` 
- D: `ReferenceError`

##### Đáp án: A

Trong Javascript tất cả các kiểu cơ bản (mọi thứ không phải object) đều tương tác bằng _giá trị_. Chúng ta set giá trị của thuộc tính `favoriteFood` trong object `info` bằng ký tự bánh pizza, `'🍕'`. Chuỗi trong javascript là một kiểu cơ bản, nên nó cũng sẽ tương tác bằng giá trị.

Bản thân mảng `food` không hề thay đổi, do giá trị của `favoriteFood` chỉ là một bản _copy_ của giá trị đầu tiên trong mảng mà thôi, và không hề trỏ tới reference của `food[0]`. Do đó khi ghi ra, giá trị của mảng vẫn là giá trị ban đầu, `['🍕', '🍫', '🥑', '🍔']`.


---

#### 110. Phép toán này dùng để làm gì?

```javascript
JSON.parse()
```

- A: Parse JSON thành một giá trị JavaScript
- B: Parse một JavaScript object thành JSON
- C: Parse giá trị JavaScript bất kì thành JSON
- D: Parse JSON thành một JavaScript object

##### Đáp án: A

Với phương thức `JSON.parse()`, ta sẽ parse một chuỗi JSON thành một giá trị JavaScript. 

Ví dụ:

```javascript
// Chuyển một số thành một chuỗi JSON, sau đó parse chuỗi JSON đó để trả về một giá trị JavaScript:
const jsonNumber = JSON.stringify(4) // '4'
JSON.parse(jsonNumber) // 4

// Chuyển một mảng thành một chuỗi JSON, sau đó parse chuỗi JSON để trả về một giá trị JavaScript:
const jsonArray = JSON.stringify([1, 2, 3]) // '[1, 2, 3]'
JSON.parse(jsonArray) // [1, 2, 3]

// Chuyển một object thành một chuỗi JSON, sau đó parse chuỗi JSON để trả về một giá trị JavaScript:
const jsonArray = JSON.stringify({ name: "Lydia" }) // '{"name":"Lydia"}'
JSON.parse(jsonArray) // { name: 'Lydia' }
```


---

#### 111. Ouput là gì? 

```javascript
let name = 'Lydia'

function getName() {
  console.log(name)
  let name = 'Sarah'
}

getName()
```

- A: Lydia
- B: Sarah
- C: `undefined`
- D: `ReferenceError`

##### Đáp án: D

Mỗi hàm sẽ có một _context thực thi_ (hay _scope_) của riêng nó. Hàm `getName` đầu tiên sẽ tìm trong context của nó (scope) để tìm xem có biến nào tên là `name` hay không. Trong trường hợp này, hàm `getName` có biến `name` được khai báo với từ khóa `let`, giá trị là `'Sarah'`. 

Một biến được khai báo với từ khóa `let` (hoặc `const`) sẽ được `hoisted`, nhưng không giống như `var`, nó sẽ không được _khởi tạo_. Nó sẽ không thể truy cập được trước dòng ta khai báo (initialize). Nó được gọi là "temporal dead zone". Khi ta cố truy cập một biến trước khi nó được khai báo, JavaScript sẽ throw ra `ReferenceError`. 

Nếu ta không khai báo biến `name` bên trong hàm `getName`, thì Javascript engine sẽ tiếp tục tìm kiếm trong _scope chain_. Nó sẽ tìm thấy ở scope phía ngoài một biến `name` với giá trị là `Lydia`. Trong trường hợp này nó sẽ log ra `Lydia`. 

```javascript
let name = 'Lydia'

function getName() {
  console.log(name)
}

getName() // Lydia
```


---

#### 112. Output là gì?

```javascript
function* generatorOne() {
  yield ['a', 'b', 'c'];
}

function* generatorTwo() {
  yield* ['a', 'b', 'c'];
}

const one = generatorOne()
const two = generatorTwo()

console.log(one.next().value)
console.log(two.next().value)
```

- A: `a` and `a`
- B: `a` and `undefined`
- C: `['a', 'b', 'c']` and `a`
- D: `a` and `['a', 'b', 'c']`

##### Đáp án: C

Với từ khóa `yield`, ta sẽ trả về các giá trị trong một `generator`. Với từ khóa `yield*`, ta có thể trả về giá trị từ một `engerator` khác, hoặc một `iterable object` (ví dụ mảng).

Trong `generatorOne`, ta trả về toàn bộ mảng `['a', 'b', 'c']` sử dụng từ khóa `yield`. Giá trị của thuộc tính `value` trong object thu được bởi phương thức `next` trong `one` (`one.next().value`) là toàn bộ mảng `['a', 'b', 'c']`.

```javascript
console.log(one.next().value) // ['a', 'b', 'c']
console.log(one.next().value) // undefined
```

Trong `generatorTwo`, ta sử dụng từ khóa `yield*`. Có nghĩa là giá trị đầu tiên mà `two` trả về là giá trị đầu tiên trong `iterator`. Trong trường hợp này `iterator` của chúng ta là mảng `['a', 'b', 'c']`. Giá trị đầu tiên của mảng là `a`, nên lần đầu tiên khi ta gọi `two.next().value`, `a` sẽ được trả về. 

```javascript
console.log(two.next().value) // 'a'
console.log(two.next().value) // 'b'
console.log(two.next().value) // 'c'
console.log(two.next().value) // undefined
```


---

#### 113. Output là gì?

```javascript
console.log(`${(x => x)('I love')} to program`)
```

- A: `I love to program`
- B: `undefined to program`
- C: `${(x => x)('I love') to program`
- D: `TypeError`

##### Đáp án: A

Biểu thức bên trong chuỗi template (tức chuỗi nằm trong hai dấu ``, gọi là `template literals`) sẽ được đánh giá trước. Sau đó kết quả của biểu thức sẽ được đưa vào chuỗi, trong trường hợp này biểu thức là `(x => x)('I love')`. Chúng ta truyền giá trị đối số `'I love'` cho một arrow function `x => x`. `x` lúc này là `'I love'`, và trả về chính nó. Cuối cùng kết quả của chuỗi là `I love to program`. 


---

#### 114. Điều gì sẽ xảy ra?

```javascript
let config = {
  alert: setInterval(() => {
    console.log('Alert!')
  }, 1000)
}

config = null
```

- A: Callback `setInterval` sẽ không được gọi
- B: Callback `setInterval` sẽ được gọi một lần duy nhất
- C: Callback `setInterval` vẫn sẽ được gọi mỗi giây một lần
- D: `config.alert()` không bao giờ được gọi bởi config là `null`

##### Đáp án: C

Thông thường khi ta set một object bằng `null`, thì object này sẽ được bộ dọn rác dọn đi do không còn gì reference đến nó nữa (_garbage collected_). Tuy nhiên, do callback trong `setInterval` là một arrow function (do đó nó sẽ gắn với object `config`), nên callback này vẫn sẽ giữ reference đến object `config`. Vì vẫn còn giữ reference, nên object sẽ không bị dọn đi. Do đó nó vẫn sẽ được gọi sau mỗi 1000ms (tức 1 giây).


---

#### 115. Những hàm nào sẽ trả về `'Hello world!'`?

```javascript
const myMap = new Map()
const myFunc = () => 'greeting'

myMap.set(myFunc, 'Hello world!')

//1
myMap.get('greeting')
//2
myMap.get(myFunc)
//3
myMap.get(() => 'greeting')
```

- A: 1
- B: 2
- C: 2 và 3
- D: Tất cả

##### Đáp án: B

Khi ta thêm vào một cặp key/value với từ khóa `set`, key sẽ là đối số đầu tiên đưa vào trong hàm `set` function, và value sẽ là đối số thứ hai.Trong trường hơp này key chính là _hàm_ `() => 'greeting'`, value là `'Hello world'`. `myMap` trở thành `{ () => 'greeting' => 'Hello world!' }`. 

1 sai, vì key là `() => 'greeting'` chứ không phải là `'greeting'`.
3 sai, vì khi chúng ta đưa một hàm vào làm đối số trong phương thức `get`, nó sẽ được đưa vào dưới dạng _reference_. Function vốn là object, do đó 2 hàm sẽ không bao giờ là `strictly equal`, mặc dù chúng có trông giống nhau đi chăng nữa thì chúng vẫn trỏ đến các vùng nhớ khác nhau.


---

#### 116. Output là gì?

```javascript
const person = {
  name: "Lydia",
  age: 21
}

const changeAge = (x = { ...person }) => x.age += 1
const changeAgeAndName = (x = { ...person }) => {
  x.age += 1
  x.name = "Sarah"
}

changeAge(person)
changeAgeAndName()

console.log(person)
```

- A: `{name: "Sarah", age: 22}`
- B: `{name: "Sarah", age: 23}`
- C: `{name: "Lydia", age: 22}`
- D: `{name: "Lydia", age: 23}`

##### Đáp án: C

Cả hai hàm `changeAge` và `changeAgeAndName` đều có tham số mặc định - nó là một _bản copy_ mới của object `{ ...person }`. Object này sẽ copy tất cả những cặp key/values bên trong object `person`. 

Đầu tiên, chúng ta gọi hàm `changeAge` và đưa chính object `person` vào làm đối số. Hàm này sẽ tăng giá trị của thuộc tính `age` lên 1. `person` lúc này là `{ name: "Lydia", age: 22 }`.

Sau đó, chúng ta gọi hàm `changeAgeAndName` tuy nhiên không đưa vào đối số nào cả. Do đó giá trị của `x` lúc này sẽ là giá trị mặc định, tức một bản _copy_ của object `{ ...person }`. Do nó chỉ là một bản copy (tức object mới), nên nó không ảnh hưởng gì tới giá trị của object `person` gốc, giá trị của `person` gốc sẽ vẫn là `{ name: "Lydia", age: 22 }`.


---

#### 117. Phép tính nào dưới đây trả về `6`?

```javascript
function sumValues(x, y, z) {
	return x + y + z;
}
```

- A: `sumValues([...1, 2, 3])`
- B: `sumValues([...[1, 2, 3]])`
- C: `sumValues(...[1, 2, 3])`
- D: `sumValues([1, 2, 3])`

##### Đáp án: C

Với toán tử ba chấm (`spread operator`) `...`, chúng ta có thể unpack một iterable thành từng các phần tử riêng biệt. Hàm `sumValues` nhận vào 3 giá trị: `x`, `y` và `z`. `...[1, 2, 3]` sẽ trả về `1, 2, 3`, đưa vào `sumValues` sẽ cho ta kết quả là 6.


---

#### 118. Output là gì?

```javascript
let num = 1;
const list = ["🥳", "🤠", "🥰", "🤪"];

console.log(list[(num += 1)]);
```

- A: `🤠`
- B: `🥰`
- C: `SyntaxError`
- D: `ReferenceError`

##### Đáp án: B

Với phép toán `+=`, Ta tăng giá trị của `num` lên `1`. `num` có giá trị khởi tạo là `1`, do đó `1 + 1` là `2`. Phần tử thứ hai của `list` là 🥰, do đó `console.log(list[2])` sẽ in ra 🥰.


---

#### 119. Output là gì?

```javascript
const person = {
	firstName: "Lydia",
	lastName: "Hallie",
	pet: {
		name: "Mara",
		breed: "Dutch Tulip Hound"
	},
	getFullName() {
		return `${this.firstName} ${this.lastName}`;
	}
};

console.log(person.pet?.name);
console.log(person.pet?.family?.name);
console.log(person.getFullName?.());
console.log(member.getLastName?.());
```

- A: `undefined` `undefined` `undefined` `undefined`
- B: `Mara` `undefined` `Lydia Hallie` `undefined`
- C: `Mara` `null` `Lydia Hallie` `null`
- D: `null` `ReferenceError` `null` `ReferenceError`

##### Đáp án: B

Với phép toán optional chaining `?.`, chúng ta sẽ không cần phải check xem giá trị phía sau nó có được phép truy cập hay có tồn tại hay không. Nếu ta cố lấy một thuộc tính của `undefined` hay `null` (_nullish_), biểu thức sẽ dừng lại và trả về `undefined`.

`person.pet?.name`: `person` có thuộc tính `pet`: do đó `person.pet` không phải là một nullish. Nó có một thuộc tính `name`, với giá trị `Mara`.

`person.pet?.family?.name`: `person` có thuộc tính `pet`: do đó `person.pet` không phải là nullish. Tuy nhiên `pet` không có thuộc tính `family`, nên `person.pet.family` là nullish. Biểu thức sẽ trả về `undefined`.

`person.getFullName?.()`: `person` có thuộc tính `getFullName`: do đó `person.getFullName()` không phải nullish và có thể gọi ra, trả về `Lydia Hallie`.

`member.getLastName?.()`: `member` không được định nghĩa: do đó `member.getLastName()` là nullish. Biểu thức trả về `undefined`.


---

#### 120. Ouput là gì?

```javascript
const groceries = ["banana", "apple", "peanuts"];

if (groceries.indexOf("banana")) {
	console.log("We have to buy bananas!");
} else {
	console.log(`We don't have to buy bananas!`);
}
```

- A: We have to buy bananas!
- B: We don't have to buy bananas
- C: `undefined`
- D: `1`

##### Đáp án: B

Ta đưa một điều kiện `groceries.indexOf("banana")` vào câu lệnh `if`. `groceries.indexOf("banana")` trả về `0`, là một giá trị `falsy`. Do đó điệu kiện `if` sẽ chạy vào khối `else` và in ra `We don't have to buy bananas!`.


---

#### 121. Ouput là gì?

```javascript
const config = {
	languages: [],
	set language(lang) {
		return this.languages.push(lang);
	}
};

console.log(config.language);
```

- A: `function language(lang) { this.languages.push(lang }`
- B: `0`
- C: `[]`
- D: `undefined`

##### Đáp án: D

Phương thức `language` là một `setter`. Setter không mang giá trị, nhiệm vụ của nó chỉ đơn giản là _thay đổi_ thuộc tính. Khi ta gọi một phương thức `setter` nó sẽ trả về `undefined`.


---

#### 122. Output là gì?

```javascript
const name = "Lydia Hallie";

console.log(!typeof name === "object");
console.log(!typeof name === "string");
```

- A: `false` `true`
- B: `true` `false`
- C: `false` `false`
- D: `true` `true`

##### Đáp án: C

`typeof name` trả về `"string"`. Chuỗi `"string"` là một giá trị `truthy`, do đó `!typeof name` sẽ trả về một giá trị bool là `false`. Do đó `false === "object"` và `false === "string"` đều trả về`false`.

(Nếu chúng ta muốn check xem một kiểu dữ liệu không phải là một kiểu nào đó, chúng ta nên viết `!==` thay vì `!typeof`)


---

#### 123. Output là gì?

```javascript
const add = x => y => z => {
	console.log(x, y, z);
	return x + y + z;
};

add(4)(5)(6);
```

- A: `4` `5` `6`
- B: `6` `5` `4`
- C: `4` `function` `function`
- D: `undefined` `undefined` `6`

##### Đáp án: A

Hàm `add` trả về một arrow function, arrow function này lại trả về một arrow function khác, arrow function này lại trả về một arrow function khác nữa. Hàm đầu tiên nhận vào một tham số `x` với giá trị là 4 `4`. Chúng ta gọi hàm thứ hai, nhận vào giá trị của `y` là `5`. Sau đó chúng ta gọi hàm thứ 3, nhận vào giá trị của `z` là `6`. Sau đó ta truy cập các giá trị của `x`, `y` và `z` bên trong arrow function cuối cùng, khi này JS engine sẽ lần ngược lại scope chain để tìm các giá trị `x` và `y` tương ứng. Do đó cuối cùng nó sẽ trả về `4` `5` `6`.


---

#### 124. Output là gì?

```javascript
async function* range(start, end) {
	for (let i = start; i <= end; i++) {
		yield Promise.resolve(i);
	}
}

(async () => {
	const gen = range(1, 3);
	for await (const item of gen) {
		console.log(item);
	}
})();
```

- A: `Promise {1}` `Promise {2}` `Promise {3}`
- B: `Promise {<pending>}` `Promise {<pending>}` `Promise {<pending>}`
- C: `1` `2` `3`
- D: `undefined` `undefined` `undefined`

##### Đáp án: C

Generator `range` trả về một async object với các promise tương ứng với mỗi phần tử ta đưa vào: `Promise{1}`, `Promise{2}`, `Promise{3}`. Ta set giá trị `gen` bằng với một async object để thực hiện vòng lặp `for await ... of` sau đó. Tiếp đó ta lại set giá trị của `item` bằng với giá trị trả về của mỗi promise: đầu tiên là `Promise{1}`, sau đó `Promise{2}`, sau đó `Promise{3}`. Do chúng ta sử dụng cú pháp `async/await` nên sẽ trả về giá trị đã được resolve của promise `item`, do đó lần lượt `1`, `2`, và `3` được in ra.


---

#### 125. Output là gì?

```javascript
const myFunc = ({ x, y, z }) => {
	console.log(x, y, z);
};

myFunc(1, 2, 3);
```

- A: `1` `2` `3`
- B: `{1: 1}` `{2: 2}` `{3: 3}`
- C: `{ 1: undefined }` `undefined` `undefined`
- D: `undefined` `undefined` `undefined`

##### Đáp án: D

`myFunc` nhận vào một object có các thuộc tính `x`, `y` và `z` làm đối số của nó. Do chúng ta đưa vào 3 số riêng biệt (1, 2, 3) chứ không phải một object với các thuộc tính `x`, `y`, `z` như ({x: 1, y: 2, z: 3}), nên `x`, `y`, `z` đều có giá trị là `undefined`.


---

#### 126. Output là gì?

```javascript
function getFine(speed, amount) {
  const formattedSpeed = new Intl.NumberFormat({
    'en-US',
    { style: 'unit', unit: 'mile-per-hour' }
  }).format(speed)

  const formattedAmount = new Intl.NumberFormat({
    'en-US',
    { style: 'currency', currency: 'USD' }
  }).format(amount)

  return `The driver drove ${formattedSpeed} and has to pay ${formattedAmount}`
}

console.log(getFine(130, 300))
```

- A: The driver drove 130 and has to pay 300
- B: The driver drove 130 mph and has to pay \$300.00
- C: The driver drove undefined and has to pay undefined
- D: The driver drove 130.00 and has to pay 300.00

##### Đáp án: B

Với phương thức `Intl.NumberFormat`, chúng ta có thể format bất cứ số nào theo định dạng ta mong muốn. Ở đây ta format giá trị `130` theo định dạng `en-US`, kiểu `unit`, đơn vị là `mile-per-hour`, và nó sẽ trả về `130 mph`. Tiếp theo số `300` sẽ được format theo định dạng `en-US`, kiểu `currentcy`, đơn vị `USD`, và kết quả là `$300.00`.


---

#### 127. Output là gì?

```javascript
const spookyItems = ["👻", "🎃", "🕸"];
({ item: spookyItems[3] } = { item: "💀" });

console.log(spookyItems);
```

- A: `["👻", "🎃", "🕸"]`
- B: `["👻", "🎃", "🕸", "💀"]`
- C: `["👻", "🎃", "🕸", { item: "💀" }]`
- D: `["👻", "🎃", "🕸", "[object Object]"]`

##### Đáp án: B

Khi tiến hành cú pháp destructuring object, chúng ta có thể unpack các giá trị ở phía phải của một object, và đưa giá trị đã được unpack đó làm giá trị của thuộc tính tương ứng của object phía trái. Trong trường hợp này, ta đã gán giá trị "💀" cho `spookyItems[3]`. Có nghĩa là mảng `spookyItems` đã bị thay đổi, chúng ta đã thêm vào nó một phần tử "💀". Do đó khi in ra thì kết quả sẽ là `["👻", "🎃", "🕸", "💀"]` .


---

#### 128. Output là gì?

```javascript
const name = "Lydia Hallie";
const age = 21;

console.log(Number.isNaN(name));
console.log(Number.isNaN(age));

console.log(isNaN(name));
console.log(isNaN(age));
```

- A: `true` `false` `true` `false`
- B: `true` `false` `false` `false`
- C: `false` `false` `true` `false`
- D: `false` `true` `false` `true`

##### Đáp án: C

Với phương thức `Number.isNaN`, ta có thể check một giá trị có phải là _dạng số_ và bằng `NaN` hay không. `name` không phải là một số, do đó `Number.isNaN(name)` sẽ trả về `false`. `age` là một số, nhưng không bằng `NaN`, do đó `Number.isNaN(age)` cũng trả về `false`.
Với phương thức `isNaN`, ta đơn thuần chỉ check xem giá trị đưa vào không phải là _dạng số_ hay không. `name` không phải là dạng số, nên `isNaN(name)` trả về `true`. `age` là số, nên `isNaN(age)` trả về `false`.


---

#### 129. Output là gì?

```javascript
const randomValue = 21;

function getInfo() {
	console.log(typeof randomValue);
	const randomValue = "Lydia Hallie";
}

getInfo();
```

- A: `"number"`
- B: `"string"`
- C: `undefined`
- D: `ReferenceError`

##### Đáp án: D

Một biến được khai báo với từ khóa `const` sẽ không thể truy cập trước khi nó được khởi tạo: nó gọi là _temporal dead zone_. Trong hàm `getInfo`, giá trị `randomValue` sẽ được tìm kiếm đầu tiên trong scope của hàm `getInfo`. Tại dòng ta muốn lấy ra `typeof randomValue`, giá trị `randomValue` chưa được khởi tạo, do đó một `ReferenceError` sẽ được throw ra! Lưu ý nhỏ là Javascript engine sẽ không tìm kiếm ở scope khác nữa do `randomValue` đã được khai báo bên trong hàm `getInfo`.


---

#### 130. Ouput là gì?

```javascript
const myPromise = Promise.resolve("Woah some cool data");

(async () => {
	try {
		console.log(await myPromise);
	} catch {
		throw new Error(`Oops didn't work`);
	} finally {
		console.log("Oh finally!");
	}
})();
```

- A: `Woah some cool data`
- B: `Oh finally!`
- C: `Woah some cool data` `Oh finally!`
- D: `Oops didn't work` `Oh finally!`

##### Đáp án: C

Trong khối `try`, ta in ra giá trị của biến `myPromise`: `"Woah some cool data"`. Do không có lỗi gì xảy ra ở đây cả, nên các lệnh trong khối `catch` sẽ không được chạy. Tuy nhiên các lệnh trong khối `finally` thì sẽ _luôn luôn_ chạy, nên `"Oh finally!"` sẽ được in ra.


---

#### 131. Output là gì?

```javascript
const emojis = ["🥑", ["✨", "✨", ["🍕", "🍕"]]];

console.log(emojis.flat(1));
```

- A: `['🥑', ['✨', '✨', ['🍕', '🍕']]]`
- B: `['🥑', '✨', '✨', ['🍕', '🍕']]`
- C: `['🥑', ['✨', '✨', '🍕', '🍕']]`
- D: `['🥑', '✨', '✨', '🍕', '🍕']`

##### Đáp án: B

Với phương thức `flat`, ta có thể tạo một mảng mới với các phần tử đã được `flattened` (làm phẳng). Độ sâu của mảng đã làm phẳng sẽ phụ thuộc vào giá trị ta đưa vào. Trong trường hợp này ta đưa vào là `1` (thực ra đây là giá trị default, ta không đưa vào cũng không sao), có nghĩa là chỉ những phần tử ở độ sâu 1 sẽ được làm phẳng. Chúng là`['🥑']` và `['✨', '✨', ['🍕', '🍕']]` trong trường hợp này. Nối lại ta sẽ có mảng mới `['🥑', '✨', '✨', ['🍕', '🍕']]`.


---

#### 132. Output là gì?

```javascript
class Counter {
	constructor() {
		this.count = 0;
	}

	increment() {
		this.count++;
	}
}

const counterOne = new Counter();
counterOne.increment();
counterOne.increment();

const counterTwo = counterOne;
counterTwo.increment();

console.log(counterOne.count);
```

- A: `0`
- B: `1`
- C: `2`
- D: `3`

##### Đáp án: D

`counterOne` là một instance của class `Counter`. Trong counter class có thuộc tính `count` bên trong constructor, và một phương thức `increment`. Đầu tiên chúng ta gọi phương thức `increment` hai lần bằng `counterOne.increment()`. Nên hiện tại giá trị của `counterOne.count` là `2`.

<img src="https://i.imgur.com/KxLlTm9.png" width="400">

Sau đó chúng ta có thêm một biến mới là `counterTwo`, và set cho nó giá trị bằng với `counterOne`. Do object được tương tác bằng reference, nên việc này tương ứng với ta đã tạo thêm một reference đến bộ nhớ mà biến `counterOne` đã trỏ vào. Do chúng có chung bộ nhớ, bất cứ thay đổi nào trên `counterTwo` cũng sẽ thay đổi trên `counterOne`. Lúc này `counterTwo.count` cũng sẽ là `2`.

Ta gọi hàm `counterTwo.increment()` để tăng `count` lên `3`. Sau đó chúng ta in ra `count` ở `counterOne`, kết quả là `3`.

<img src="https://i.imgur.com/BNBHXmc.png" width="400">


---

#### 133. Output là gì?

```javascript
const myPromise = Promise.resolve(Promise.resolve("Promise!"));

function funcOne() {
	myPromise.then(res => res).then(res => console.log(res));
	setTimeout(() => console.log("Timeout!", 0));
	console.log("Last line!");
}

async function funcTwo() {
	const res = await myPromise;
	console.log(await res);
	setTimeout(() => console.log("Timeout!", 0));
	console.log("Last line!");
}

funcOne();
funcTwo();
```

- A: `Promise! Last line! Promise! Last line! Last line! Promise!`
- B: `Last line! Timeout! Promise! Last line! Timeout! Promise!`
- C: `Promise! Last line! Last line! Promise! Timeout! Timeout!`
- D: `Last line! Promise! Promise! Last line! Timeout! Timeout!`

##### Đáp án: D

Đầu tiên chúng ta gọi `funcOne`. Trong dòng đầu tiên của `funcOne`, chúng ta gọi `myPromise`, đây là một hàm _bất đồng bộ_. Trong khi chờ promise này hoàn thành, nó sẽ tiếp tục thực thi các dòng khác trong `funcOne`. Dòng tiếp theo là cũng là một hàm _bất đồng bộ_ `setTimeout`, phần callback của nó sẽ được gửi tới Web API (các bạn có thể tham khảo câu hỏi trước đó để hiểu về callstack và Web API).

Do cả promise và timeout đều là những hàm xử lý bất đồng bộ, nên trong khi chờ chúng hoàn thành thì các dòng tiếp theo vẫn tiếp tục được thực thi. Có nghĩa là `Last line!` sẽ được in ra đầu tiên, do nó là một hàm chạy _đồng bộ_. Và đây cũng là dòng cuối cùng của hàm `funcOne`, khi này promise sẽ được resolve, trả về `Promise!`. Tuy nhiên do ta tiếp tục gọi hàm `funcTwo()`, call stack của ta vẫn chưa rỗng, nên callback của `setTimeout` vẫn chưa thể được đưa vào callstack (vẫn đang năm ở Web API).

Trong hàm `funcTwo` đầu tiên ta sẽ _awaiting_ myPromise. Với từ khóa `await`, Ta sẽ tạm dừng thực thi cho tới khi n ào promise được resolved (hay rejected). Khi này ta sẽ in ra giá trị của `res` (do bản thân hàm promise lại trả về một promise). Nó sẽ in ra `Promise!`.

Dòng tiếp theo lại là một hàm _bất đồng bộ_ `setTimeout`, callback khi này tiếp tục được gửi tới Web API.

Ta tiếp tục thực thi dòng cuối cùng của `funcTwo`, trả về `Last line!`. Khi này `funcTwo` đã làm rỗng call stack. Các callback khi nãy (`() => console.log("Timeout!")` từ `funcOne`, và `() => console.log("Timeout!")` từ `funcTwo`) lần lượt được đưa vào trong call stack. Callback đầu tiên in ra `Timeout!`. Callback thứ hai in ra `Timeout!`. Kết quả cuối cùng sẽ là `Last line! Promise! Promise! Last line! Timeout! Timeout!`


---

#### 134. Làm thế nào có thể gọi hàm `sum` trong `index.js` từ `sum.js?`

```javascript
// sum.js
export default function sum(x) {
	return x + x;
}

// index.js
import * as sum from "./sum";
```

- A: `sum(4)`
- B: `sum.sum(4)`
- C: `sum.default(4)`
- D: Default aren't imported with `*`, only named exports

##### Đáp án: C

Với dấu hoa thị `*`, ta sẽ import tất cả những gì đã được export ra bởi file đó, cả default lẫn những hàm có tên. Nếu ta có một dòng như sau:

```javascript
// info.js
export const name = "Lydia";
export const age = 21;
export default "I love JavaScript";

// index.js
import * as info from "./info";
console.log(info);
```

Thì kết quả sẽ là:

```javascript
{
  default: "I love JavaScript",
  name: "Lydia",
  age: 21
}
```

Trong ví dụ hàm `sum`, nó giống với chúng ta đã import hàm `sum` như thế này:

```javascript
{ default: function sum(x) { return x + x } }
```

Ta có thể gọi hàm này bằng cách sử dụng `sum.default`


---

#### 135. Output là gì?

```javascript
const handler = {
	set: () => console.log("Added a new property!"),
	get: () => console.log("Accessed a property!")
};

const person = new Proxy({}, handler);

person.name = "Lydia";
person.name;
```

- A: `Added a new property!`
- B: `Accessed a property!`
- C: `Added a new property!` `Accessed a property!`
- D: Nothing gets logged

##### Đáp án: C

Với Proxy object, ta có thể add thêm được các hành vi (behavior) cho object bằng cách đưa nó vào làm đối số thứ hai. Trong trường hợp này, chúng ta đưa vào object `handler` có hai thuộc tính: `set` và `get`. `set` sẽ được gọi mỗi khi ta _thay đổi_ giá trị của thuộc tính, `get` sẽ được gọi mỗi khi ta _truy cập_ giá trị của thuộc tính.

Giá trị của `person` sẽ là đối số đầu tiên đưa vào, là một object rỗng `{}`. Hành vi của `person` là đối số thứ hai, tức `handler`. Do đó môi khi ta thêm thuộc tính của obejct `person`, `set` sẽ được gọi. Nếu ta truy cập thuộc tính của `person` thì `get` sẽ được gọi.

Đầu tiên ra thêm vào thuộc tính `name` cho proxy object (`person.name = "Lydia"`). `set` được gọi và in ra `"Added a new property!"`.

Sau đó chúng truy cập thuộc tính này, `get` được gọi và in ra `"Accessed a property!"`.


---

#### 136. Cách nào sau đây sẽ thay đổi object `person`?

```javascript
const person = { name: "Lydia Hallie" };

Object.seal(person);
```

- A: `person.name = "Evan Bacon"`
- B: `person.age = 21`
- C: `delete person.name`
- D: `Object.assign(person, { age: 21 })`

##### Đáp án: A

Với `Object.seal` ta có thể ngăn _thêm vào_ các thuộc tính mới, hay _xóa đi_ các thuộc tính cũ.

Tuy nhiên ta vẫn có thể _thay đổi_ các thuộc tính cũ.


---

#### 137. Cách nào sau đây có thể thay đổi object `person`?

```javascript
const person = {
	name: "Lydia Hallie",
	address: {
		street: "100 Main St"
	}
};

Object.freeze(person);
```

- A: `person.name = "Evan Bacon"`
- B: `delete person.address`
- C: `person.address.street = "101 Main St"`
- D: `person.pet = { name: "Mara" }`

##### Đáp án: C

Phương thức `Object.freeze` sẽ _đóng băng_ object. Ta không thể thêm/sửa/xóa bất kì thuộc tính nào.

Tuy nhiên trên thực tế đây chỉ là đóng băng _nông_ (_shallowly_) object, có nghĩa là nó chỉ đóng băng các thuộc tính _trực tiếp_ của object mà thôi. Nếu thuộc tính lại là một object khác, như `address` trong trường hợp này, thuộc tính bên trong của `address` sẽ không bị đóng băng, và ta vẫn có thể chỉnh sửa như bình thường.


---

#### 138. Cách nào sau đây có thể thay đổi object `person`?

```javascript
const person = {
	name: "Lydia Hallie",
	address: {
		street: "100 Main St"
	}
};

Object.freeze(person);
```

- A: `person.name = "Evan Bacon"`
- B: `delete person.address`
- C: `person.address.street = "101 Main St"`
- D: `person.pet = { name: "Mara" }`

##### Đáp án: C

Phương thức `Object.freeze` sẽ _đóng băng_ object. Ta không thể thêm/sửa/xóa bất kì thuộc tính nào.

Tuy nhiên trên thực tế đây chỉ là đóng băng _nông_ (_shallowly_) object, có nghĩa là nó chỉ đóng băng các thuộc tính _trực tiếp_ của object mà thôi. Nếu thuộc tính lại là một object khác, như `address` trong trường hợp này, thuộc tính bên trong của `address` sẽ không bị đóng băng, và ta vẫn có thể chỉnh sửa như bình thường.


---

#### 139. Output là gì?

```javascript
const add = x => x + x;

function myFunc(num = 2, value = add(num)) {
	console.log(num, value);
}

myFunc();
myFunc(3);
```

- A: `2` `4` and `3` `6`
- B: `2` `NaN` and `3` `NaN`
- C: `2` `Error` and `3` `6`
- D: `2` `4` and `3` `Error`

##### Đáp án: A

Đầu tiên, ta gọi hàm `myFunc()` nhưng không đưa vào đối số nào. Do đó `num` và `value` sẽ nhận các giá trị mặc định: `num` là `2`, và `value` sẽ là giá trị trả về của hàm `add`. Với hàm `add`, ta đưa `num` vào làm đối số, tức `2`. `add` trả về `4`, đây sẽ là giá trị của `value`.

Sau đó ta gọi hàm `myFunc(3)`, khi này `3` sẽ là giá trị của `num`. Ta không đưa vào giá trị cho `value`. Lúc này `value` tiếp tục nhận giá trị mặc định: giá trị trả về của hàm `add`. Trong `add`, ta đưa vào `num`, khi này là `3`. `add` sẽ trả về `6`, đây sẽ là giá trị của `value`.


---

#### 140. Output là gì?

```javascript
class Counter {
  #number = 10

  increment() {
    this.#number++
  }

  getNum() {
    return this.#number
  }
}

const counter = new Counter()
counter.increment()

console.log(counter.#number)
```

- A: `10`
- B: `11`
- C: `undefined`
- D: `SyntaxError`

##### Đáp án: D

Với cú pháp ES2020, ta có thể thêm các thuộc tính private vào class bằng cách sử dụng `#`. Ta không thể truy cập được biến này bên ngoài class. Khi ta in ra `counter.#number`, một SyntaxError sẽ được throw: ta không thể truy cập từ phía ngoài class `Counter`!


---

#### 141. Câu lệnh còn thiếu là gì?

```javascript
const teams = [
	{ name: "Team 1", members: ["Paul", "Lisa"] },
	{ name: "Team 2", members: ["Laura", "Tim"] }
];

function* getMembers(members) {
	for (let i = 0; i < members.length; i++) {
		yield members[i];
	}
}

function* getTeams(teams) {
	for (let i = 0; i < teams.length; i++) {
		// ✨ SOMETHING IS MISSING HERE ✨
	}
}

const obj = getTeams(teams);
obj.next(); // { value: "Paul", done: false }
obj.next(); // { value: "Lisa", done: false }
```

- A: `yield getMembers(teams[i].members)`
- B: `yield* getMembers(teams[i].members)`
- C: `return getMembers(teams[i].members)`
- D: `return yield getMembers(teams[i].members)`

##### Đáp án: B

Ta duyệt và in ra giá trị của từng member bên trong `members`, mà `members` lại nằm bên trong mảng `teams`, ta cần đưa vào đối số `teams[i].members` cho hàm generator `getMembers` trong phần code thiếu. Hàm generator sẽ trả về một generator object. Để duyệt qua từng phần tử của một generator object, ta dùng từ khóa `yield*`.

Nếu ta dùng `yield`, `return yield`, hay `return`, toàn bộ generator sẽ được trả về trong lần đầu tiên chúng ta gọi phương thức `next`.



---

#### 142. Output là gì?

```javascript
const person = {
	name: "Lydia Hallie",
	hobbies: ["coding"]
};

function addHobby(hobby, hobbies = person.hobbies) {
	hobbies.push(hobby);
	return hobbies;
}

addHobby("running", []);
addHobby("dancing");
addHobby("baking", person.hobbies);

console.log(person.hobbies);
```

- A: `["coding"]`
- B: `["coding", "dancing"]`
- C: `["coding", "dancing", "baking"]`
- D: `["coding", "running", "dancing", "baking"]`

##### Đáp án: C

Hàm `addHobby` nhận vào hai đối số, `hobby`, và `hobbies` với giá trị default là mảng `hobbies` của object `person`.

Đầu tiên chúng ta gọi hàm `addHobby` và đưa vào `"running"` làm giá trị cho `hobby`, và một mảng rỗng cho `hobbies`. Do chúng ta đưa vào một mảng rỗng cho `hobbies`, `"running"` sẽ được add vào một mảng rỗng.

Sau đó chúng ta tiếp tục gọi hàm `addHobby`, đưa `"dancing"` vào làm giá trị cho `hobby`. Chúng ta không hề đưa vào giá trị nào cho `hobbies`, do đó nó sẽ sử dụng giá trị mặc định, tức mảng `hobbies` trong thuộc tính của object `person`. Có nghĩa là ta đã thêm `dancing` vào trong mảng `person.hobbies`.

Cuối cùng chúng ta lại gọi `addHobby`, đưa `"baking"` vào làm giá trị cho `hobby`, và mảng `person.hobbies` làm giá trị cho `hobbies`. Có nghĩa là ta đã thêm `baking` vào trong mảng `person.hobbies`.

Sau khi thêm `dancing` và `baking`, giá trị của `person.hobbies` là `["coding", "dancing", "baking"]`


---

#### 143. Output là gì?

```javascript
class Bird {
	constructor() {
		console.log("I'm a bird. 🦢");
	}
}

class Flamingo extends Bird {
	constructor() {
		console.log("I'm pink. 🌸");
		super();
	}
}

const pet = new Flamingo();
```

- A: `I'm pink. 🌸`
- B: `I'm pink. 🌸` `I'm a bird. 🦢`
- C: `I'm a bird. 🦢` `I'm pink. 🌸`
- D: Nothing, we didn't call any method

##### Đáp án: B

Chúng ta tạo ra biến `pet` là một instance của clas `Flamingo`. Khi ta tạo ra instance, `constructor` bên trong `Flamingo` sẽ được gọi. Đầu tiên, `"I'm pink. 🌸"` được in ra, sau đó chúng ta gọi `super()`. `super()` sẽ gọi constructor ở class cha, tức `Bird`. Hàm constructor trong `Bird` được gọi và in ra `"I'm a bird. 🦢"`.


---

#### 144. Câu lệnh nào sẽ bị lỗi?

```javascript
const emojis = ["🎄", "🎅🏼", "🎁", "⭐"];

/* 1 */ emojis.push("🦌");
/* 2 */ emojis.splice(0, 2);
/* 3 */ emojis = [...emojis, "🥂"];
/* 4 */ emojis.length = 0;
```

- A: 1
- B: 1 and 2
- C: 3 and 4
- D: 3

##### Đáp án: D

Từ khóa `const` làm cho ta không thể _định nghĩa lại_ giá trị của biến, nó là _read-only_. Tuy nhiên giá trị của bên trong nó thì không phải là bất biến. Các thuộc tính bên trong mảng `emojis` vẫn có thể được sửa đổi, ví dụ thêm phần tử, cắt, hoặc là đưa độ dài mảng về 0.


---

#### 145. Ta cần thêm gì vào object `person` để khi gọi `[...person]` sẽ cho kết quả là `["Lydia Hallie", 21]`?

```javascript
const person = {
  name: "Lydia Hallie",
  age: 21
}

[...person] // ["Lydia Hallie", 21]
```

- A: Nothing, object are iterable by default
- B: `*[Symbol.iterator]() { for (let x in this) yield* this[x] }`
- C: `*[Symbol.iterator]() { for (let x in this) yield* Object.values(this) }`
- D: `*[Symbol.iterator]() { for (let x in this) yield this }`

##### Đáp án: C

Mặc định ta không thể duyệt qua được object. Trừ phi nó được cài đặt iterator protocol. Ta có thể cài đặt bằng cách thêm vào một iterator symbol `[Symbol.iterator]`, biến nó trở thành generator object (object có thể duyệt được), ví dụ `*[Symbol.iterator]() {}`.

Để generator này trả về được mảng các giá trị của các thuộc tính của object `person`, tức `Object.values` của object `person`, ta sẽ sử dụng cấu trúc `yield* Object.values(this)`.

---