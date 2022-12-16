Các bạn có thể xem part 1 tại đây: https://viblo.asia/p/javascript-va-nhung-cau-hoi-kho-E375zgyjKGW

Hi vọng các bạn sẽ có thêm những trải nghiệm mới mẻ với JavaScript  :sunglasses:

*Trên đời vốn chỉ có 2 loại ngôn ngữ lập trình: loại bị nhiều người chê và loại không ai thèm dùng.*

---

#### 44. Output là gì?

```javascript
function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);
```

- A: `[0, 10], [10, 20]`
- B: `20, 20`
- C: `10, 20`
- D: `0, 10 and 10, 20`


#### Đáp án: C

Một hàm bình thường không thể bị dừng giữa chừng khi được gọi. Tuy nhiên một _generator_ thì khác, nó có thể "dừng lại" được, và sau đó nó sẽ tiếp tục từ vị trí nó dừng lại. Mỗi khi một _generator_ gặp một từ khóa `yield`, nó sẽ sinh ra giá trị ngay phía sau nó. Chú ý là _generator_ không _trả về_ giá trị, nó _sinh ra_ giá trị.

Đầu tiên, chúng ta khởi tạo generator với giá trị `i` là `10`. Generator được gọi bằng cách sử dụng phương thức `next()`. Khi lần đầu gọi thì `i` vẫn là `10`. Khi nó bắt gặp từ khóa `yield`: nó sẽ sinh ra giá trị `i`. Generator sẽ được "tạm dừng" tại đây, và ghi ra giá trị `10`.

Sau đó chung ta tiếp tục gọi generator bằng cách sử dụng tiếp phương thức `next()`. Nó sẽ bắt đầu từ vị trí nó tạm dừng lúc trước, khi `i` vẫn đang là `10`. Và khi nó bắt gặp từ khóa `yield`, nó sẽ sinh ra giá trị `i * 2`. `i` là `10`, nên nó sẽ sinh ra `10 * 2`, tức `20`. Vậy kết quả cuối cùng là `10, 20`.


---

#### 45. Giá trị trả về là gì?

```javascript
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, "one");
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, "two");
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));
```

- A: `"one"`
- B: `"two"`
- C: `"two" "one"`
- D: `"one" "two"`


#### Đáp án: B

Khi chúng ta đưa các promise vào trong một hàm `Promise.race`, nó sẽ chỉ resolves hay rejects promise _đầu tiên_ được resolves/rejects. Với hàm `setTimeout`, chúng ta đưa vào một khoảng thời gian: 500 mili giây cho promise đầu tiên (`firstPromise`), và 100 mili giây cho promise thứ hai (`secondPromise`). Nó có nghĩa là `secondPromise` sẽ hoàn thành trước và trả về giá trị `'two'`. `res` khi này sẽ nhận giá trị `'two'` và được in ra console.


---

#### 46. Output là gì?

```javascript
let person = { name: "Lydia" };
const members = [person];
person = null;

console.log(members);
```

- A: `null`
- B: `[null]`
- C: `[{}]`
- D: `[{ name: "Lydia" }]`


#### Đáp án: D

Đầu tiên, chúng ta khai báo một biến `person` là một object có thuộc tính `name`.

![](https://i.imgur.com/TML1MbS.png)

Sau đó chúng ta khai báo một biến `members`. Ta set giá trị đầu tiên của mảng là giá trị của biến `person`. Khi sử dụng gán bằng, object sẽ được _tham chiếu_ tới object mà nó được gán. Khi ta gán tham chiếu từ một biến sang biến khác, ta tạo ra một bản sao của tham chiếu đó. (nên nhớ rằng đó vẫn là 2 tham chiếu hoàn toàn khác nhau!)

![](https://i.imgur.com/FSG5K3F.png)

Sau đó ta set giá trị của `person` bằng `null`.

![](https://i.imgur.com/sYjcsMT.png)

Chúng ta chỉ đơn thuần là thay đổi giá trị của biến `person` mà thôi, chứ không phải giá trị của phần tử đầu tiên ở trong mảng, vì chúng ta có một tham chiếu khác đến object đó. Phần tử đầu tiên của mảng `members` vẫn giữ tham chiêu đến object gốc. Do vậy, khi chúng ta in ra mảng `members`, phần tử đầu tiên sẽ vẫn in ra giá trị của objet gốc.


---

#### 47. Output là gì?

```javascript
const person = {
  name: "Lydia",
  age: 21
};

for (const item in person) {
  console.log(item);
}
```

- A: `{ name: "Lydia" }, { age: 21 }`
- B: `"name", "age"`
- C: `"Lydia", 21`
- D: `["name", "Lydia"], ["age", 21]`


#### Đáp án: B

Với vòng lặp `for-in` chúng ta sẽ lặp qua tất cả các `keys` của object, trong trường hợp này là `name` và `age`. Về cơ bản, object keys là string (nếu nó không phải là Symbol). Tại mỗi vòng lặp, giá trị của `item` chính là giá trị của key hiện tại trong vòng lặp. Đầu tiên, `item` là `name`, và được in ra. Vòng lặp sau, `item` là `age`, và được in ra.


---

#### 48. Output là gì?

```javascript
console.log(3 + 4 + "5");
```

- A: `"345"`
- B: `"75"`
- C: `12`
- D: `"12"`


#### Đáp án: B

Compiler sẽ đánh giá biểu thức dựa trên độ ưu tiên giữa các phép toán trong biểu thức đó, từ đó nó sẽ tính toán hoặc trái-sang-phải hoặc phải-qua-trái. Ở đây chúng ta chỉ có một phép toán mà thôi, phép cộng: `+`. Với phép cộng, tính toán sẽ là từ trái-qua-phải.

Giá trị `3 + 4` được tính toán trước. Kết quả là `7`.

`7 + '5'` sẽ ra kết quả là `"75"` bởi xuất hiện ép kiểu tại đây. JavaScript sẽ convert `7` sang dạng string, bạn có thể xem thêm tại câu hỏi 15. Và sau đó 2 string sẽ được nối lại với nhau bởi phép toán cộng `+`. Kết quả `"7" + "5"` sẽ là `"75"`.


---

#### 49. What's the value of `num`?

```javascript
const num = parseInt("7*6", 10);
```

- A: `42`
- B: `"42"`
- C: `7`
- D: `NaN`


#### Đáp án: C

Chỉ có số đầu tiên trong chuỗi kí tự được trả về. Hệ cơ số là _hệ thập phân__ (đối số thứ 2 trong hàm chính là cơ số: hệ thập phân, hệ 16, hệ 8, hệ nhị phân, vv.), Hàm `parseInt` sẽ kiểm tra xem các ký tự trong chuỗi có đảm bảo hợp lệ hay không. Một khi chúng tìm ra ký tự không phải là ký tự hợp lệ trong hệ cơ số, nó dừng lại và bỏ qua các ký tự phía sau.

`*` không phải là một số. Vậy nên nó sẽ chỉ convert ký tự `"7"` sang hệ thập phân là `7`. `num` sẽ có giá trị là `7`.


---

#### 50. Output là gì?

```javascript
[1, 2, 3].map(num => {
  if (typeof num === "number") return;
  return num * 2;
});
```

- A: `[]`
- B: `[null, null, null]`
- C: `[undefined, undefined, undefined]`
- D: `[ 3 x empty ]`


#### Đáp án: C

Khi ta tiến hành `map` một mảng, giá trị của `num` sẽ chính là giá trị của phần tử hiện giờ trong vòng lặp. Trong trường hợp này, các phần tử đều là dạng số, tức là `typeof num === "number"` sẽ là `true`. Hàm `map` sẽ tạo ra một mảng mởi từ các giá trị của mảng ban đầu.

Tuy nhiên chúng ta không hề trả về giá trị nào cả. Khi đó, hàm số sẽ mặc định trả về `undefined`. Do đó qua mỗi vòng lặp, ta lại nhận được thêm một giá trị `undefined` nữa.


---

#### 51. Output là gì?

```javascript
function getInfo(member, year) {
  member.name = "Lydia";
  year = "1998";
}

const person = { name: "Sarah" };
const birthYear = "1997";

getInfo(person, birthYear);

console.log(person, birthYear);
```

- A: `{ name: "Lydia" }, "1997"`
- B: `{ name: "Sarah" }, "1998"`
- C: `{ name: "Lydia" }, "1998"`
- D: `{ name: "Sarah" }, "1997"`


#### Đáp án: A

`Đối số` sẽ được đưa vào hàm dạng _tham trị_, trừ phi nó là object, khi đó nó sẽ được đưa vào hàm dạng _tham chiếu_. `birthYear` là dạng giá trị, vì nó là string chứ không phải object. Khi chúng ta đưa vào dạng giá trị, một bản sao của giá trị đó sẽ được tạo ra (xem thêm câu 46).

`birthYear` trỏ đến giá trị là `"1997"`. Đối số `year` cũng sẽ rỏ đến giá trị `"1997"`, nhưng giá trị này chỉ là một bản sao của giá trị mà `birthYear` trỏ tới mà thôi, hai giá trị đó hoàn toàn khác nhau. Do đó khi ta thay đổi giá trị `year` bằng `"1998"`, chúng ta chỉ thay đổi giá trị của `year` mà thôi. `birthYear` sẽ vẫn giữ giá trị là `"1997"`.

`person` là một object. Biến `member` có một tham chiếu tới cùng object mà `person` trỏ tới. Khi chúng ta thay đổi một thuộc tính của object mà `member` trỏ tới, giá trị của `person` cũng sẽ tự động thay đổi theo, vì chúng có chung tham chiếu. `name` của `person` khi này sẽ có giá trị mới là `"Lydia"`.


---

#### 52. Output là gì?

```javascript
function greeting() {
  throw "Hello world!";
}

function sayHi() {
  try {
    const data = greeting();
    console.log("It worked!", data);
  } catch (e) {
    console.log("Oh no an error!", e);
  }
}

sayHi();
```

- A: `"It worked! Hello world!"`
- B: `"Oh no an error: undefined`
- C: `SyntaxError: can only throw Error objects`
- D: `"Oh no an error: Hello world!`


#### Đáp án: D

Với lệnh `throw`, chúng ta có thể tạo ra các errors tùy ý. Với câu lệnh đó, chúng ta có thể throw các exception. Một _exeption_ có thể là một <b>chuỗi</b>, một <b>số</b>, một <b>boolean</b> hoặc một <b>object</b>. Trong trường hợp này thì nó là chuỗi `'Hello world'`.

Với lệnh `catch` chúng ta có thể xử lý những exeption được throw ra khi thực hiện `try`. Một exeption đã được throw ra: chuỗi `'Hello world'`. `e` chính là chuỗi đó và chúng ta sẽ in ra. Kết quả là `'Oh an error: Hello world'`.


---

#### 53. Output là gì?

```javascript
function Car() {
  this.make = "Lamborghini";
  return { make: "Maserati" };
}

const myCar = new Car();
console.log(myCar.make);
```

- A: `"Lamborghini"`
- B: `"Maserati"`
- C: `ReferenceError`
- D: `TypeError`


#### Đáp án: B

Khi chúng ta trả về một thuộc tính, giá trị của thuộc tính bằng với giá trị đã được trả về bởi lệnh _return_, chứ không phải giá trị được set trong constructor. Chúng ta trả về giá trị là `"Maserati"`, do đó `myCar.make` sẽ là `"Maserati"`.


---

#### 54. Output là gì?

```javascript
(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);
```

- A: `"undefined", "number"`
- B: `"number", "number"`
- C: `"object", "number"`
- D: `"number", "undefined"`


#### Đáp án: A

`let x = y = 10;` chính là cách viết ngắn gọn của:

```javascript
y = 10;
let x = y;
```

Khi ta set `y` bằng `10`, thực tế chúng ta đã sử dụng biến global `y` (`window` nếu là trên browser, `global` nếu là môi trường Node).Trên browser, `window.y` sẽ là `10`.

Sau đó, chúng ta khai báo giá trị của `x` với giá trị của `y`, tức `10`. Tuy nhiên khi ta khai báo với từ khóa `let` biến x sẽ chỉ tồn tại trong _block scoped_; hay trong trường hợp này là `hàm thực hiện ngay lập tức` (immediately-invoked function - IIFE). Khi ta sử dụng phép toán `typeof`, `x` hoàn toàn chưa được định nghĩa: vì `x` lúc này nằm bên ngoài block nó được định nghĩa lúc trước. Nghĩa là `x` là `undefined`. Do đó `console.log(typeof x)` trả về `"undefined"`.

Tuy nhiên với `y` thì khác, ta đã có giá trị của `y` khi set `y` bằng `10`. Giá trị đó có thể truy cập được từ bất kì đâu bởi chúng là biến global. `y` được định nghĩa với kiểu là `"number"`. Do đó `console.log(typeof y)` trả về `"number"`.


---

#### <a name=20190629></a>55. Output là gì?

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
}

Dog.prototype.bark = function() {
  console.log(`Woof I am ${this.name}`);
};

const pet = new Dog("Mara");

pet.bark();

delete Dog.prototype.bark;

pet.bark();
```

- A: `"Woof I am Mara"`, `TypeError`
- B: `"Woof I am Mara"`,`"Woof I am Mara"`
- C: `"Woof I am Mara"`, `undefined`
- D: `TypeError`, `TypeError`


#### Đáp án: A

Chúng ta có thể xóa các thuộc tính khỏe object bằng từ khóa `delete`, kể cả với prototype. Khi chúng ta xóa một thuộc tính trên prototype, nó sẽ bị vô hiệu hóa hoàn toàn trong chuỗi prototype. Trong trường hợp này, hàm `bark` sẽ bị vô hiệu hóa ngay sau khi chúng ta thực hiện hàm xóa `delete Dog.prototype.bark`, tất nhiên ta vẫn có thể truy cập vào nó nhưng giá trị sẽ là `undefined`.

Khi chúng ta chạy một thứ không phải là `hàm`, nó sẽ bắn ra một `TypeError`. Trong trường hợp này là `TypeError: pet.bark is not a function`, vì bản thân thuộc tính `pet.bark` là `undefined`.


---

#### 56. Output là gì?

```javascript
const set = new Set([1, 1, 2, 3, 4]);

console.log(set);
```

- A: `[1, 1, 2, 3, 4]`
- B: `[1, 2, 3, 4]`
- C: `{1, 1, 2, 3, 4}`
- D: `{1, 2, 3, 4}`


#### Đáp án: D

`Set` là một tập hơp các giá trị _không trùng nhau_.

Chúng ta đưa đầu vào là một mảng `[1, 1, 2, 3, 4]` với giá trị `1` bị trùng. Giá trị trùng đó sẽ bị loại bỏ. Kết quả là `{1, 2, 3, 4}`.


---

#### 57. Output là gì?

```javascript
// counter.js
let counter = 10;
export default counter;
```

```javascript
// index.js
import myCounter from "./counter";

myCounter += 1;

console.log(myCounter);
```

- A: `10`
- B: `11`
- C: `Error`
- D: `NaN`


#### Đáp án: C

Một module khi được import sẽ là __read-only__: chúng ta sẽ không thể chỉnh sửa module đó, chỉ có bản thân module đó có thể chỉnh sửa giá trị của nó mà thôi.

Khi ta thay đổi giá trị cuả `myCounter`, nó sẽ throw ra một lỗi: `myCounter` là _read-only_ và không thể thay đổi.


---

#### 58. Output là gì?

```javascript
const name = "Lydia";
age = 21;

console.log(delete name);
console.log(delete age);
```

- A: `false`, `true`
- B: `"Lydia"`, `21`
- C: `true`, `true`
- D: `undefined`, `undefined`


#### Đáp án: A

Phép toán `delete` sẽ trả về một giá trị boolean: `true` nếu xóa thành công, `false` nếu thất bại. Tuy nhiên, nếu biến được khai báo với các từ khóa `var`, `const` hay `let` thì nó sẽ không thể bị xóa bởi phép toán `delete`.

Biến `name` được khai báo với từ khóa `const`, nên nó sẽ không thể bị xóa và trả về `false`. Khi ta set `age` bằng `21`, thực tế là ta đang sử dụng biến global `age`. Ta có thể xóa sử dụng phép toán `delete`, khi này `delete age` trả về `true`.


---

#### 59. Output là gì?

```javascript
const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;

console.log(y);
```

- A: `[[1, 2, 3, 4, 5]]`
- B: `[1, 2, 3, 4, 5]`
- C: `1`
- D: `[1]`


#### Đáp án: C

Chúng ta có thể unpack các giá trị từ mảng hoặc thuộc tính từ objects bằng phương pháp `destructuring`. Ví dụ:

```javascript
[a, b] = [1, 2];
```

![](https://i.imgur.com/ADFpVop.png)

Giá trị của `a` sẽ là `1`, `b` sẽ là `2`. Thực tế, câu hỏi của chúng ta đơn giản là:

```javascript
[y] = [1, 2, 3, 4, 5];
```

![](https://i.imgur.com/NzGkMNk.png)

Có nghĩa là `y` chính là giá trị đầu tiên trong mảng, tức số `1`. Do đó khi ta in ra `y` thì sẽ là`1`.


---

#### 60. Output là gì?

```javascript
const user = { name: "Lydia", age: 21 };
const admin = { admin: true, ...user };

console.log(admin);
```

- A: `{ admin: true, user: { name: "Lydia", age: 21 } }`
- B: `{ admin: true, name: "Lydia", age: 21 }`
- C: `{ admin: true, user: ["Lydia", 21] }`
- D: `{ admin: true }`


#### Đáp án: B

Ta có thể kết hợp 2 object sử dụng phép toán `spread operator` `...`. Nó cho phép ta tạo ra bản sao của từng cặp key/values trong từng object và nối chúng lại với nhau thành một object mới. Trong trường hợp này chúng ta tạo ra các bản sao của các cặp key/value của object `user` object, và nối chúng vào object `admin`. `admin` object khi này sẽ trở thành `{ admin: true, name: "Lydia", age: 21 }`.


---

#### 61. Output là gì?

```javascript
const person = { name: "Lydia" };

Object.defineProperty(person, "age", { value: 21 });

console.log(person);
console.log(Object.keys(person));
```

- A: `{ name: "Lydia", age: 21 }`, `["name", "age"]`
- B: `{ name: "Lydia", age: 21 }`, `["name"]`
- C: `{ name: "Lydia"}`, `["name", "age"]`
- D: `{ name: "Lydia"}`, `["age"]`


#### Đáp án: B

Với phương thức `defineProperty`, chúng ta có thể thêm các thuộc tính mới, cũng như sửa các thuộc tính sẵn có của object. Khi chúng ta thêm thuộc tính vào object bằng `defineProperty`, chúng sẽ mặc định là thuộc tính _not enumerable_. Phương thức `Object.keys` sẽ trả về tất cả các thuộc tính _enumerable_ của object, trong trường hợp này thì chỉ có `"name"` mà thôi.

Thêm nữa, các thuộc tính được thêm bởi `defineProperty` là mặc định không thể thay đổi được. Tất nhiên ta có thể override các điều đó bằng các thuộc tính như `writable`, `configurable` và `enumerable`. Tức là `defineProperty` là một cách rất mềm dẻo để tạo ra và điều chỉnh thuộc tính của object.


---

#### 62. Output là gì?

```javascript
const settings = {
  username: "lydiahallie",
  level: 19,
  health: 90
};

const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);
```

- A: `"{"level":19, "health":90}"`
- B: `"{"username": "lydiahallie"}"`
- C: `"["level", "health"]"`
- D: `"{"username": "lydiahallie", "level":19, "health":90}"`


#### Đáp án: A

Đối số thứ hai của `JSON.stringify` là _replacer_. Replacer Có thể là một hàm hoặc một mảng, nó sẽ quy định xem giá trị nào sẽ được chuỗi hóa ra sao.

Nếu replacer là một _mảng_, chỉ có các thuộc tính có tên trong mảng được convert thành chuỗi JSON. Trong trường hợp này, chỉ có các thuộc tính `"level"` và `"health"` được đưa vào, `"username"` bị loại bỏ. `data` giờ sẽ là `"{"level":19, "health":90}"`.

Nếu replacer là _function_, hàm này sẽ được gọi trên từng thuộc tính của object được chuỗi hóa. Giá trị trả về sẽ là giá trị được đưa vào chuỗi JSON. Nếu trả về `undefined`, thuộc tính này sẽ bị loại bỏ khỏi chuỗi.


---

#### 63. Output là gì?

```javascript
let num = 10;

const increaseNumber = () => num++;
const increasePassedNumber = number => number++;

const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);

console.log(num1);
console.log(num2);
```

- A: `10`, `10`
- B: `10`, `11`
- C: `11`, `11`
- D: `11`, `12`


#### Đáp án: A

Phép toán `++` sẽ _trả về trước_ giá trị của toán hạng, _sau đó tăng_ giá trị của toán hạng lên. Giá trị của `num1` là `10`, vì `increaseNumber` sẽ trả về giá trị của `num`, đang là `10`, và sau đó mới tăng giá trị của `num` lên.

`num2` cũng là `10`, vì chúng ta đưa `num1` vào `increasePassedNumber`. `number` bằng `10`(tức giá trị của `num1`). Cũng giống như trên, phép toán `++` sẽ _trả về trước_ giá trị của toán hạng, _sau đó tăng_ giá trị của toán hạng lên. Giá trị của `number` là `10`, do đó `num2` cũng sẽ là `10`.