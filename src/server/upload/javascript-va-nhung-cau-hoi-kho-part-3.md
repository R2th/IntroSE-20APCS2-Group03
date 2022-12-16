**Part 1**: https://viblo.asia/p/javascript-va-nhung-cau-hoi-kho-E375zgyjKGW

**Part 2**: https://viblo.asia/p/javascript-va-nhung-cau-hoi-kho-part-2-63vKjwjxZ2R

Hi vọng các bạn sẽ có thêm những trải nghiệm mới mẻ với JavaScript  😎

*Trên đời vốn chỉ có 2 loại ngôn ngữ lập trình: loại bị nhiều người chê và loại không ai thèm dùng.*

---

#### 64. Output là gì?

```javascript
const value = { number: 10 };

const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply();
multiply();
multiply(value);
multiply(value);
```

- A: `20`, `40`, `80`, `160`
- B: `20`, `40`, `20`, `40`
- C: `20`, `20`, `20`, `40`
- D: `NaN`, `NaN`, `20`, `40`


##### Đáp án: C

Trong ES6 thì chúng ta có thể khởi tạo tham số với giá trị mặc định. Giá trị của tham số sẽ là giá trị mặc định nếu ta không truyền gì vào hàm, hoặc khi giá trị truyền vào là `"undefined"`. Trong trường hợp này, ta dùng `spread operator` (toán tử mở rộng) để biến `value` thành một object mới, do đó `x` sẽ có giá trị mặc định là `{ number: 10 }`.

Chú ý một điều là đối số sẽ được xét giá trị tại _call time_! Có nghĩa là mỗi khi chúng ta gọi hàm, một _object mới_ sẽ được tạo ra. Chúng ta gọi hàm `multiply` hai lần mà không truyền vào đối số nào cả: `x` sẽ nhận giá trị mặc định `{ number: 10 }`. Sau đó chúng ta sẽ ghi ra giá trị là `20`.

Lần gọi thứ ba chúng ta truyền vào một đối số: chính là `value`. Toán tử `*=` chính là cách viết gọn của `x.number = x.number * 2`: chúng ta thay đổi giá trị của `x.number`, và ghi ra giá trị `20`. 

Tại lần gọi thứ tư, chúng ta truyền vào `value` một lần nữa. `x.number` trước đó đã bị thay đổi thành `20`, nên `x.number *= 2` sẽ ghi ra `40`. 

---

#### 65. Output là gì?

```javascript
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
```

- A: `1` `2` và `3` `3` và `6` `4`
- B: `1` `2` và `2` `3` và `3` `4`
- C: `1` `undefined` và `2` `undefined` và `3` `undefined` và `4` `undefined`
- D: `1` `2` và `undefined` `3` và `undefined` `4`


##### Đáp án: D

Đối số đầu tiên của hàm `reduce` chính là _accumulator_ (tổng tích lũy), trong trường hợp này là `x`. Đối số thứ 2 chính là _giá trị hiện tại_, tức `y`. Với hàm reduce, ta sẽ gọi callback trên mỗi phần tử của mảng, cứ vậy cho tới khi ra đến một giá trị cuối cùng. 

Trong trường hợp này, chúng ta không trả về bất cứ giá trị nào cả, mà đơn thuần chỉ là ghi ra giá trị của _tổng tích lũy_ và _giá trị hiện tại_ mà thôi.

Giá trị của tổng tích lũy chính là giá trị được hàm callback trả về tại vòng lặp trước đó. Nếu ta không đặt giá trị khởi tạo cho đối số trong hàm `reduce`, thì tổng tích lũy sẽ chính bằng giá trị đầu tiên tại lời gọi đầu tiên.

Trong lời gọi đầu tiên, tổng tích lũy (`x`) là `1`, và giá trị hiện tại (`y`) là `2`. Chúng ta không trả về giá trị cho hàm callback, mà đơn thuần chỉ ghi chúng ta, vậy nên `1` và `2` được ghi ra.  

Nếu ta không trả về giá trị trong một function, thì nó sẽ mặc định trả về là `undefined`. Do đó trong lời gọi tiếp theo tổng tích lũy sẽ là `undefined`, và giá trị hiện tại là `3`. `undefined` và `3` sẽ được ghi ra. 

Tiếp tục như vậy, trong lời gọi thứ tư thì tổng tích lũy sẽ vẫn là `undefined`, giá trị hiện tại là `4`. `undefined` và `4` sẽ được ghi ra.
  
---

#### 66. Với cách nào chúng ta có thể kế thừa `Dog` class?

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
};

class Labrador extends Dog {
  // 1 
  constructor(name, size) {
    this.size = size;
  }
  // 2
  constructor(name, size) {
    super(name);
    this.size = size;
  }
  // 3
  constructor(size) {
    super(name);
    this.size = size;
  }
  // 4 
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }

};
```

- A: 1
- B: 2
- C: 3
- D: 4


##### Đáp án: B

Trong class dẫn xuất, ta không thể truy cập từ khóa `this` trước khi gọi `super`. Nếu bạn chạy thử, nó sẽ throw ra một `ReferenceError`, do đó 1 và 4 sẽ throw ra reference error.

Với việc gọi `super`, chúng ta đã gọi hàm constructor của class cha với tham số truyền vào. Trong trường hợp này, class cha nhận `name` làm đối số trong constructor, do đó chúng cần đưa `name` vào hàm `super`. 

`Labrador` class nhận vào hai đối số, `name` vì nó kế thừa `Dog`, và `size` - một thuộc tính của `Labrador` class. Cả hai đều cần thiết để đưa vào trong constructor của class `Labrador`, do đó cách khởi tạo đúng là 2

---

#### 67. Output là gì?

```javascript
// index.js
console.log('running index.js');
import { sum } from './sum.js';
console.log(sum(1, 2));

// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;
```

- A: `running index.js`, `running sum.js`, `3`
- B: `running sum.js`, `running index.js`, `3`
- C: `running sum.js`, `3`, `running index.js`
- D: `running index.js`, `undefined`, `running sum.js`


##### Đáp án: B

Với `import`, tất cả các module import vào đều sẽ được _pre-parsed_ (đánh giá trước). Có nghĩa là những module được import vào sẽ được _chạy trước_, còn code trong file sẽ _chạy sau_.

Đó chính là điều khác biệt giữa `require()` trong CommonJS và `import`! Với `require()`, ta có thể load các dependencies tại bất cứ khi nào ta cần. Nếu ta sử dụng `require` thay thế cho `import` thì `running index.js`, `running sum.js`, `3` sẽ được ghi ra. 

---

#### 68. Output là gì?

```javascript
console.log(Number(2) === Number(2))
console.log(Boolean(false) === Boolean(false))
console.log(Symbol('foo') === Symbol('foo'))****
```

- A: `true`, `true`, `false`
- B: `false`, `true`, `false`
- C: `true`, `false`, `true`
- D: `true`, `true`, `true`


##### Đáp án: A

Mỗi Symbol là một thứ hoàn toàn khác biệt. Giá trị truyền vào làm đối số trong Symbol chỉ đơn thuần là phần giải thích cho Symbol đó mà thôi, và nó không liên quan gì tới giá trị của Symbol đó cả. Chúng ta kiểm tra tính bằng nhau của hai Symbol hoàn toàn khác biệt: `Symbol('foo')` thứ nhất, và `Symbol('foo')` thứ hai. Mỗi giá trị đều là riêng biệt và duy nhất, nên `Symbol('foo') === Symbol('foo')` sẽ trả về `false`. 

---

#### 69. Output là gì?

```javascript
const name = "Lydia Hallie"
console.log(name.padStart(13))
console.log(name.padStart(2))
```

- A: `"Lydia Hallie"`, `"Lydia Hallie"`
- B: `"           Lydia Hallie"`, `"  Lydia Hallie"` (`"[13x whitespace]Lydia Hallie"`, `"[2x whitespace]Lydia Hallie"`)
- C: `" Lydia Hallie"`, `"Lydia Hallie"` (`"[1x whitespace]Lydia Hallie"`, `"Lydia Hallie"`)
- D: `"Lydia Hallie"`, `"Lyd"`, 


##### Đáp án: C

Với hàm `padStart` chúng ta có thể thêm vào khoảng trắng đằng trước mỗi chuỗi. Giá trị đưa vào trong hàm là _tổng độ dài_ của chuỗi sau khi thêm vào khoảng trắng. Chuỗi `"Lydia Hallie"` có độ dài là `12` nên `name.padStart(13)` sẽ thêm vào một khoảng trắng đằng trước chuỗi.

Nếu đối số truyền vào cho hàm `padStart` nhỏ hơn độ dài của chuỗi, không có khoảng trắng nào được thêm vào.

---

#### 70. Output là gì?

```javascript
console.log("🥑" + "💻");
```

- A: `"🥑💻"`
- B: `257548`
- C: A string containing their code points
- D: Error


##### Đáp án: A

Với phép toán `+`, ta có thể nối các xâu chuỗi. Trong trường hợp này, ta nối chuỗi `"🥑"` với chuỗi `"💻"`, kết quả tạo ra `"🥑💻"`.

---

#### 71. Làm thế nào có thể ghi ra giá trị giống như trong comment khi console.log?

```javascript
function* startGame() {
  const answer = yield "Do you love JavaScript?";
  if (answer !== "Yes") {
    return "Oh wow... Guess we're gone here";
  }
  return "JavaScript loves you back ❤️";
}

const game = startGame();
console.log(/* 1 */); // Do you love JavaScript?
console.log(/* 2 */); // JavaScript loves you back ❤️
```

- A: `game.next("Yes").value` và `game.next().value`
- B: `game.next.value("Yes")` và `game.next.value()`
- C: `game.next().value` và `game.next("Yes").value`
- D: `game.next.value()` và `game.next.value("Yes")`


##### Đáp án: C

Một _generator_ sẽ "tạm dừng" khi nhìn thấy từ khóa `yield`. Đầu tiên ra sẽ đưa ra chuỗi "Do you love JavaScript?", bằng cách gọi `game.next().value`.

Chương trình sẽ chạy từng dòng, cho tới khi nó tìm thấy từ khóa `yield`. Có một từ khóa `yield` tại dòng đầu tiên của hàm: chương trình sẽ dừng tại đâ! _Điều đó có nghĩa là biến `answer` chưa hề được định nghĩa!_

Khi ta gọi `game.next("Yes").value`, `yield` trước đó sẽ được thay thế bởi giá trị được truyền vào hàm `next()`, trong trường hợp này là`"Yes"`. Theo đó giá trị của biến `answer` giờ sẽ là `"Yes"`. Điều kiện if sẽ trả về `false`, và `JavaScript loves you back ❤️` sẽ được ghi ra.

---
****
#### 72. Output là gì?

```javascript
console.log(String.raw`Hello\nworld`);
```

- A: `Hello world!`
- B: `Hello` <br />&nbsp; &nbsp; &nbsp;`world`
- C: `Hello\nworld`
- D: `Hello\n` <br /> &nbsp; &nbsp; &nbsp;`world`


##### Đáp án: C

`String.raw` trả về chuỗi nguyên bản, các ký tự (`\n`, `\v`, `\t` etc.) sẽ vẫn là nguyên bản và không biến thành xuống dòng hay khoảng trắng! Nếu ta không để là chuỗi nguyên bản, sẽ có trường hợp xảy ra lỗi không mong muốn, ví dụ với đường dẫn:

`` const path = `C:\Documents\Projects\table.html` ``

Sẽ cho ta chuỗi là:

`"C:DocumentsProjects able.html"`

Với `String.raw`, nó sẽ trả về là:

`C:\Documents\Projects\table.html`

Do đó, trong trường hợp này `Hello\nworld` sẽ được ghi ra.

---

#### 73. Output là gì?

```javascript
async function getData() {
  return await Promise.resolve("I made it!");
}

const data = getData();
console.log(data);
```

- A: `"I made it!"`
- B: `Promise {<resolved>: "I made it!"}`
- C: `Promise {<pending>}`
- D: `undefined`


##### Đáp án: C

Một hàm `async` luôn luôn trả về một `promise`. `await` sẽ chờ cho tới khi promise đó được hoàn thành: một pending promise sẽ được trả về khi ta gọi `getData()` bằng cách gán nó cho biến `data`.

Nếu ta muốn truy cập giá trị đã hoàn thành của promise, trong trường hợp này là `"I made it"`, ta có thể sử dụng hàm `.then()` ngay sau `data` như sau:

`data.then(res => console.log(res))`

Khi này nó sẽ ghi ra `"I made it!"`

---

#### 74. Output là gì?

```javascript
function addToList(item, list) {
  return list.push(item);
}

const result = addToList("apple", ["banana"]);
console.log(result);
```

- A: `['apple', 'banana']`
- B: `2`
- C: `true`
- D: `undefined`


##### Đáp án: B

Hàm `.push()` trả về _độ dài_ của mảng mới! Trước đó, mảng chỉ hồm một phần tử là `"banana"` và có độ dài là `1`. Sau khi thêm chuỗi `"apple"` vào mảng, mảng lúc này có hai chuỗi và có độ dài là `2`. Do đó hàm `addToList` sẽ trả về 2.

Hàm `push` sẽ thay đổi chính bản thân mảng truyền vào. Do đó nếu chúng ta muốn trả về _mảng_ thay vì chỉ trả về _độ dài_, chúng ta nên trả về trực tiếp mảng `list` sau khi đã thêm `item` vào đó.

---

#### 75. Output là gì?

```javascript
const box = { x: 10, y: 20 };

Object.freeze(box);

const shape = box;
shape.x = 100;

console.log(shape);
```

- A: `{ x: 100, y: 20 }`
- B: `{ x: 10, y: 20 }`
- C: `{ x: 100 }`
- D: `ReferenceError`


##### Đáp án: B

`Object.freeze` khiến cho chúng ta không thể thêm vào, xóa đi hay thay đổi bất kì thuộc tính nào của object (trừ phi giá trị của thuộc tính lại chính là một object khác).

Khi chúng ta tạo ra biến `shape` và set cho nó giá trị bằng với một object đã được đóng băng là `box`, thì `shape` cũng sẽ trỏ tới một object đã được đóng băng. Ta có thể check một object có đang bị đóng băng hay không bằng `Object.isFrozen`. Trong trường hợp này, `Object.isFrozen(shape)` trả về true, vì `shape` đang trỏ tới một object bị đóng băng.

Do đó, cộng với việc `x` không phải là object, ta sẽ không thể thay đổi giá trị của `x`. `x` sẽ vẫn là `10`, và `{ x: 10, y: 20 }` được ghi ra.

---

#### 76. Output là gì?

```javascript
const { name: myName } = { name: "Lydia" };

console.log(name);
```

- A: `"Lydia"`
- B: `"myName"`
- C: `undefined`
- D: `ReferenceError`


##### Đáp án: D

Khi ta tiến hành unpack giá trị `name` từ object ở phía bên phải, ta đã gán giá trị `"Lydia"` của nó cho biến có tên là `myName`.

Với cú pháp `{ name: myName }`, chúng ta muốn khai báo một biến `myName` với giá trị là giá trị của thuộc tính `name` trong object phía bên phải.

Do `name` chưa được định nghĩa, nên ghi log ra, nó sẽ throw ra một ReferenceError.

---

#### 77. Đây có phải là một pure function không?

```javascript
function sum(a, b) {
  return a + b;
}
```

- A: Yes
- B: No


##### Đáp án: A

Một hàm được gọi là _pure function_ khi nó luôn luôn trả về một giá trị giống nhau, nếu đối số đưa vào là giống nhau.

Hàm `sum` luôn trả về giá trị giống nhau. Nếu ta đưa vào `1` và `2`, nó sẽ _luôn_ trả về `3`. Nếu ta đưa vào `5` và `10`, nó _luôn_ trả về `15`. Cứ như vậy, đây là một _pure function_.

---

#### 78. Output là gì?

```javascript
const add = () => {
  const cache = {};
  return num => {
    if (num in cache) {
      return `From cache! ${cache[num]}`;
    } else {
      const result = num + 10;
      cache[num] = result;
      return `Calculated! ${result}`;
    }
  };
};

const addFunction = add();
console.log(addFunction(10));
console.log(addFunction(10));
console.log(addFunction(5 * 2));
```

- A: `Calculated! 20` `Calculated! 20` `Calculated! 20`
- B: `Calculated! 20` `From cache! 20` `Calculated! 20`
- C: `Calculated! 20` `From cache! 20` `From cache! 20`
- D: `Calculated! 20` `From cache! 20` `Error`


##### Đáp án: C

Hàm `add` chính là một hàm _memoized_ (hàm có nhớ). Với việc có nhớ, chúng ta có thể cache lại kết quả của function để tăng tốc độ tính toán lên. Trong trường hợp này, chúng ta tạo ra một `cache` object để lưu trữ những kết quả tính toán trước đó.

Mỗi lần chúng ta gọi hàm `addFunction` với đối số giống nhau, đầu tiên nó sẽ check xem đối số đó có tồn tại trong cache hay không. Nếu có, giá trị trong cache sẽ được trả về luôn, tiết kiệm thời gian tính toán. Còn nếu không thì nó sẽ tiến hành tính toán kết quả và tiếp tục lưu vào cache.

Chúng ta gọi hàm `addFunction` ba lần với cùng một đối số: trong lần gọi đầu tiên, giá trị của `num` là `10` và chưa có mặt trong cache. Do đó `num in cache` trả về `false`, và sẽ chạy vào else block: `Calculated! 20` sẽ được ghi ra, và 10 sẽ được đưa vào cạche. `cache` khi này sẽ là `{ 10: 20 }`.

Tại lần gọi thứ hai, `cache` object đã có giá trị `10`. `num in cache` trả về `true`, và `'From cache! 20'` được ghi ra.

Tại lần gọi thứ ba, ta đưa vào `5 * 2`, tức `10` vào hàm. Tiếp tục giống như trên, `'From cache! 20'` sẽ được ghi ra.

---

#### 79. Output là gì?

```javascript
const myLifeSummedUp = ["☕", "💻", "🍷", "🍫"]

for (let item in myLifeSummedUp) {
  console.log(item)
}

for (let item of myLifeSummedUp) {
  console.log(item)
}
```

- A: `0` `1` `2` `3` và `"☕"` ` "💻"` `"🍷"` `"🍫"`
- B: `"☕"` ` "💻"` `"🍷"` `"🍫"` và `"☕"` ` "💻"` `"🍷"` `"🍫"`
- C: `"☕"` ` "💻"` `"🍷"` `"🍫"` và `0` `1` `2` `3`
- D:  `0` `1` `2` `3` và `{0: "☕", 1: "💻", 2: "🍷", 3: "🍫"}`


##### Đáp án: A

Với vòng lặp _for-in_, chúng ta có thể duyệt qua các thuộc tính **enumerable** của object. Với mảng, thuộc tính enumerable chính là các "key" của mảng, hay chính là các index của mảng đó. Ta có thể coi mảng như là:

`{0: "☕", 1: "💻", 2: "🍷", 3: "🍫"}`

Do đó `0` `1` `2` `3` được ghi ra.

Với vòng lặp _for-of_, chúng ta sẽ duyệt qua các phần tử của một **iterable**. Một mảng chính là một iterable. Khi chúng ta duyệt qua mảng, biến "item" chính là phần tử mà nó đang duyệt qua, do đó `"☕"` ` "💻"` `"🍷"` `"🍫"` được ghi ra.

---

#### 80. Output là gì?

```javascript
const list = [1 + 2, 1 * 2, 1 / 2]
console.log(list)
```

- A: `["1 + 2", "1 * 2", "1 / 2"]`
- B: `["12", 2, 0.5]`
- C: `[3, 2, 0.5]`
- D:  `[1, 1, 1]`


##### Đáp án: C

Mảng có thể nhận bất cứ giá trị nào. Số, chuỗi, objects, mảng khác, null, boolean, undefined, và nhiều dạng biểu thức nữa như ngày tháng, hàm, và các tính toán.

Giá trị của phần tử chính là giá trị trả về.  `1 + 2` trả về `3`, `1 * 2` trả về `2`, và `1 / 2` trả về `0.5`.

---

#### 81. Output là gì?

```javascript
function sayHi(name) {
  return `Hi there, ${name}`
}

console.log(sayHi())
```

- A: `Hi there, `
- B: `Hi there, undefined`
- C: `Hi there, null`
- D:  `ReferenceError`


##### Đáp án: B

Mặc định, đối số sẽ có giá trị là `undefined`, trừ phi ta gán giá trị cho nó khi đưa vào hàm. Trong trường hợp này, ta không đưa vào giá trị nào cho đối số `name` cả. Do đó `name` sẽ là `undefined` và được ghi ra.

Với cú pháp ES6, ta có thể thay đổi giá trị mặc định `undefined` bằng một giá trị mặc định khác. Ví dụ:

`function sayHi(name = "Lydia") { ... }`

Trong trường hợp này, nếu ta không đưa giá trị nào vào hoặc đưa vào `undefined`, `name` cũng sẽ nhận giá trị mặc định là `Lydia`.

---

#### 82. Output là gì?

```javascript
var status = "😎"

setTimeout(() => {
  const status = "😍"

  const data = {
    status: "🥑",
    getStatus() {
      return this.status
    }
  }

  console.log(data.getStatus())
  console.log(data.getStatus.call(this))
}, 0)
```

- A: `"🥑"` và `"😍"`
- B: `"🥑"` và `"😎"`
- C: `"😍"` và `"😎"`
- D: `"😎"` và `"😎"`


##### Đáp án: B

Giá trị của `this` phụ thuộc vào vị trí mà nó được gọi. Trong một **phương thức**, ví dụ `getStatus`, `this` trỏ tới _object chứa phương thức đó_. Phương thức này thuộc `data` object, do đó `this` trỏ tới `data` object. Khi chúng ta gọi `this.status` thì thuộc tính `status` của `data` sẽ được ghi ra, chính là `"🥑"`.

Với phương thức `call`, chúng ta thay đổi tham chiếu mà `this` trỏ tới. Trong **hàm**, từ khóa `this` trỏ tới _object chứa hàm đó_. Chúng ta khai báo hàm `setTimeout` trong _global object_, do đó bên trong hàm `setTimeout` thì `this` sẽ trỏ tới _global object_. Tại biến global object, có một biến _status_ với giá trị `"😎"`. Do đó khi gọi `this.status`, `"😎"` sẽ được ghi ra.

---

#### 83. Output là gì?

```javascript
const person = {
  name: "Lydia",
  age: 21
}

let city = person.city
city = "Amsterdam"

console.log(person)
```

- A: `{ name: "Lydia", age: 21 }`
- B: `{ name: "Lydia", age: 21, city: "Amsterdam" }`
- C: `{ name: "Lydia", age: 21, city: undefined }`
- D: `"Amsterdam"`


##### Đáp án: A

Chúng ta set biến `city` bằng với giá trị của thuộc tính `city` của object `person`. Nhưng object này không có thuộc tính nào là `city` cả, nên giá trị của biến `city` sẽ là `undefined`. 

Chú ý là chúng ta _không tham chiếu_ tới bản thân object `person`! Chúng ta chỉ đơn giản là set giá trị của biến `city` bằng với giá trị của thuộc tính `city` trong object `person` mà thôi.

Sau đó chúng ta set biến `city` bằng với chuỗi `"Amsterdam"`. Điều này không hề ảnh hưởng gì tới object person vì không có tham chiếu nào ở đây cả.

Do đó khi ghi object `person` ra, Tất cả các thuộc tính vẫn như cũ không hề thay đổi gì cả. 

---