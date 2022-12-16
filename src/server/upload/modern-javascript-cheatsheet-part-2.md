# Promise

Một `promise` là 1 object mà có thể được trả về 1 cách đồng bộ từ 1 hàm bất đồng bộ ([ref](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261#3cd0)). Promise có thể được sử dụng để tránh [callback hell](http://callbackhell.com/) và nó càng ngày càng được thấy nhiều hơn trong các dự án JavaScript hiện đại.

## Ví dụ

```javascript
const fetchingPosts = new Promise((res, rej) => {
  $.get("/posts")
    .done(posts => res(posts))
    .fail(err => rej(err));
});

fetchingPosts
  .then(posts => console.log(posts))
  .catch(err => console.log(err));
```

## Giải thích

Khi chúng ta thực hiện 1 Ajax request, response là bất đồng bộ vì resource sẽ cần 1 khoảng thời gian để được trả về. Nó thậm chí có thể không được trả về nếu như resource chúng ta yêu cầu không tồn tại vì 1 lí do nào đó ví dụ như 404.

Để giải quyết tình trạng đó, ES2015 cho chúng ta `promise`. Promise có thể có 3 trạng thái:

- Pending
- Fulfilled
- Rejected

Giả sử chúng ta muốn dùng promise để xử lý 1 Ajax request để lấy về resource X.

### Khởi tạo promise

Đầu tiên chúng ta khởi tạo 1 promise. Chúng ta sẽ sử dụng method `get` của jQuery để thực hiện Ajax request đến X.

```javascript
const xFetcherPromise = new Promise( // Khởi tạo promise với từ khoá "new" và lưu nó vào 1 biến
  function(resolve, reject) { // Promise constructor nhận vào 1 function với 2 tham số resolve và reject
    $.get("X") // Thực hiện Ajax request
      .done(function(X) { // Khi request kết thúc...
        resolve(X); // ... resolve promise với tham số X
      })
      .fail(function(error) { // Khi request thất bại...
        reject(error); // ... reject promise với tham số error
      });
  }
)
```

Như được thấy ở ví dụ trên, object promise nhận vào 1 executor function với 2 tham số `resolve` và `reject`. Những tham số này cũng là các function mà khi chúng được gọi sẽ thay đổi trạng thái của promise từ `pending` thành `fulfilled` hoặc `rejected`.

Promise ở trạng thái `pending` sau khi instance được khởi tạo và executor function của nó được thực thi ngay lập tức. Khi 1 trong 2 function `resolve` hoặc `reject` được gọi trong executor function, promise sẽ gọi handler tương ứng.

### Sử dụng promise handler

Để lấy được kết quả (hoặc lỗi) của promise, chúng ta phải gắn handler vào cho nó như sau

```javascript
xFetcherPromise
  .then(function(X) {
    console.log(X);
  })
  .catch(function(err) {
    console.log(err)
  })
```

Nếu promise thành công, `resolve` được gọi và function là tham số của `.then` sẽ được thực thi. Nếu promise thất bại, `reject` được gọi và function là tham số của `.catch` sẽ được thực thi. 
  
## Tham khảo

- [JavaScript Promises for dummies - Jecelyn Yeen](https://scotch.io/tutorials/javascript-promises-for-dummies)
- [JavaScript Promise API - David Walsh](https://davidwalsh.name/promises)
- [Using promises - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [What is a promise - Eric Elliott](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
- [JavaScript Promises: an Introduction - Jake Archibald](https://developers.google.com/web/fundamentals/getting-started/primers/promises)
- [Promise documentation - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

# Async / Await

Ngoài `promise` ra thì cũng có 1 cú pháp mới có tên là `async` / `await` cho phép chúng ta xử lí các đoạn code bất đồng bộ. 

Mục đích của async/await là để giúp đơn giản hóa việc sử dụng promise. Các hàm async luôn trả về 1 promise còn await thì phải  được sử dụng trong 1 hàm async. Chúng ta không thể sử dụng await ở top level trong code.

## Ví dụ

```javascript
async function getGithubUser(username) { // từ khóa async cho phép sử dụng await trong hàm và báo trước hàm này trả về 1 promise
  const response = await fetch(`https://api.github.com/users/${username}`); // Việc thực thi được hoãn lại tới khi promise trả về bởi fetch được resolve
  return response.json();
}

getGithubUser('mbeaudru')
  .then(user => console.log(user)) // log user response
  .catch(err => console.log(err)); // nếu có lỗi xảy ra trong hàm async, chúng ta sẽ catch nó ở đây
```
  
## Giải thích

Từ khóa `async` đánh dấu 1 hàm là bất đồng bộ và luôn trả về 1 promise. Chúng ta có thể sử dụng từ khóa `await` trong 1 hàm async để hoãn việc thực thi ở dòng đó cho đến khi promise resolve hoặc reject.

```javascript
async function myFunc() {
  // có thể sử dụng await ở đây thì hàm này là async
  return "hello world";
}

myFunc().then(msg => console.log(msg)) // "hello world" -- hàm myFunc trả về 1 promise do đã sử dụng từ khóa async
```

Khi chạy đến câu lệnh `return` của 1 hàm async, 1 promise được fullfill với giá trị trả về của hàm. Nếu có lỗi xảy ra bên trong hàm async, trạng thái của promise được chuyển thành `rejected`. Nếu không có giá trị được trả về từ hàm, 1 promise vẫn được trả về khi hàm kết thúc và resolve với value trống. 

`await` được sử dụng để chờ promise được fullfill và chỉ có thể được dùng trong 1 hàm async.

Hãy cùng xem chúng ta có thể lấy thông tin của 1 GitHub user với promise như thế nào

```javascript
function getGithubUser(username) {
  return fetch(`https://api.github.com/users/${username}`).then(response => response.json());
}

getGithubUser('mbeaudru')
  .then(user => console.log(user))
  .catch(err => console.log(err));
```

Ở đây `fetch` là 1 hàm trả về 1 promise cho phép thực hiện Ajax request.

Còn đây là cách viết với async/await

```
async function getGithubUser(username) { // promise + await keyword usage allowed
  const response = await fetch(`https://api.github.com/users/${username}`); // Execution stops here until fetch promise is fulfilled
  return response.json();
}

getGithubUser('mbeaudru')
  .then(user => console.log(user))
  .catch(err => console.log(err));
 ```
 
 async/await đặc biệt hữu ích khi chúng ta muốn chain nhiều promise phụ thuộc lẫn nhau. Ví dụ chúng ta cần phải lấy token để có thể lấy được 1 blog post và rồi thông tin của author
 
 ```javascript
 async function fetchPostById(postId) {
  const token = (await fetch('token_url')).json().token;
  const post = (await fetch(`/posts/${postId}?token=${token}`)).json();
  const author = (await fetch(`/users/${post.authorId}`)).json();

  post.author = author;
  return post;
}

fetchPostById('gzIrzeo64')
  .then(post => console.log(post))
  .catch(err => console.log(err));
```  
 
 ### Error handling
 
 Nếu không thêm block `try`/`catch` vào quanh await thì những exception không được bắt sẽ reject promise trả về bởi hàm async. Ngoài ra, sử dụng `throw` trong hàm async cũng giống với trả về 1 promise mà bị reject.
 
 Đây là cách chúng ta xử lí error chain với promise
 
 ```javascript
 function getUser() { // promise này bị reject
  return new Promise((res, rej) => rej("User not found !"));
}

function getAvatarByUsername(userId) {
  return getUser(userId).then(user => user.avatar);
}

function getUserAvatar(username) {
  return getAvatarByUsername(username).then(avatar => ({ username, avatar }));
}

getUserAvatar('mbeaudru')
  .then(res => console.log(res))
  .catch(err => console.log(err)); // "User not found !"
```

Còn đây là cách viết tương ứng với async / await

```javascript
async function getUser() { // promise được trả về sẽ bị reject
  throw "User not found !";
}

async function getAvatarByUsername(userId) => {
  const user = await getUser(userId);
  return user.avatar;
}

async function getUserAvatar(username) {
  var avatar = await getAvatarByUsername(username);
  return { username, avatar };
}

getUserAvatar('mbeaudru')
  .then(res => console.log(res))
  .catch(err => console.log(err)); // "User not found !"
```

## Tham khảo

- [Async/Await - JavaScript.Info](https://javascript.info/async-await)
- [ES7 Async/Await](http://rossboucher.com/await/#/)
- [6 Reasons Why JavaScript’s Async/Await Blows Promises Away](https://hackernoon.com/6-reasons-why-javascripts-async-await-blows-promises-away-tutorial-c7ec10518dd9)
- [JavaScript awaits](https://dev.to/kayis/javascript-awaits)
- [Using Async Await in Express with Node 8](https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016)
- [Async Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
- [Using async / await in express with node 8](https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016)

# Import / Export

## Ví dụ

### Named export

Named export có thể được sử dụng để export nhiều giá trị từ 1 module.

```javascript
// mathConstants.js
export const pi = 3.14;
export const exp = 2.7;
export const alpha = 0.35;

// -------------

// myFile.js
import { pi, exp } from './mathConstants.js'; // Named import
console.log(pi) // 3.14
console.log(exp) // 2.7

// -------------

// mySecondFile.js
import * as constants from './mathConstants.js'; // Inject tất cả các giá trị đã được export vào biến constants
console.log(constants.pi) // 3.14
console.log(constants.exp) // 2.7
```

Named import trông có vẻ giống với destructuring nhưng nó có 1 syntax khác và không hoàn toàn giống. Nó không support giá trị mặc định hay deep destructuring.

Chúng ta có thể sử dụng alias nhưng syntax cũng khác với destructuring:

```javascript
import { foo as bar } from 'myFile.js'; // foo được import và inject vào 1 biến mới có tên bar
```

### Default import / export

Đối với mỗi module, chỉ có duy nhất 1 default export. Default export có thể là 1 function, 1 class, 1 object hay bất kì cái gì khác. Giá trị này được xem là giá trị chính được export và nó cũng là cái đơn giản nhất để import.

```javascript
// coolNumber.js
const ultimateNumber = 42;
export default ultimateNumber;

// ------------

// myFile.js
import number from './coolNumber.js';
// Default export được tự động inject vào biến nummber
console.log(number) // 42
```

Function exporting:

```javascript
// sum.js
export default function sum(x, y) {
  return x + y;
}
// -------------

// myFile.js
import sum from './sum.js';
const result = sum(1, 2);
console.log(result) // 3
```

## Tham khảo

- [ES6 Modules in bulletpoints](https://ponyfoo.com/articles/es6#modules)
- [Export - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [Import - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [Understanding ES6 Modules](https://www.sitepoint.com/understanding-es6-modules/)
- [Destructuring special case - import statements](https://ponyfoo.com/articles/es6-destructuring-in-depth#special-case-import-statements)
- [Misunderstanding ES6 Modules - Kent C. Dodds](https://medium.com/@kentcdodds/misunderstanding-es6-modules-upgrading-babel-tears-and-a-solution-ad2d5ab93ce0)
- [Modules in JavaScript](http://exploringjs.com/es6/ch_modules.html#sec_modules-in-javascript)

# Class

JavaScript là 1 ngôn ngữ [prototype-based](https://en.wikipedia.org/wiki/Prototype-based_programming) như kể từ ES6 thì chúng ta cũng có thể sử dụng class trong JavaScript.

## Ví dụ

Trước ES6, cú pháp prototype:

```javascript
var Person = function(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.stringSentence = function() {
  return "Hello, my name is " + this.name + " and I'm " + this.age;
}
```

Với cú pháp class của ES6:

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  stringSentence() {
    return "Hello, my name is " + this.name + " and I'm " + this.age;
  }
}

const myPerson = new Person("Manu", 23);
console.log(myPerson.age) // 23
console.log(myPerson.stringSentence()) // "Hello, my name is Manu and I'm 23
```

## Tham khảo

Prototype

- [Understanding Prototypes in JS - Yehuda Katz](http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/)
- [A plain English guide to JS prototypes - Sebastian Porto](http://sporto.github.io/blog/2013/02/22/a-plain-english-guide-to-javascript-prototypes/)
- [Inheritance and the prototype chain - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

Class

- [ES6 Classes in Depth - Nicolas Bevacqua](https://ponyfoo.com/articles/es6-classes-in-depth)
- [ES6 Features - Classes](http://es6-features.org/#ClassDefinition)
- [JavaScript Classes - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

# Từ khoá `extends` và `super`

Từ khoá `extends` được sử dụng trong khai báo class để tạo ra 1 class là con của 1 class khác. Class con (subclass) sẽ kế thừa tất cả các thuộc tính của class cha (superclass), ngoài ra nó cũng có thể thêm các thuộc tính mới hoặc thay đổi những thuốc tính đã kế thừa.

Từ khoá `super` được sử dụng để gọi hàm đối với object cha của 1 object, bao gồm cả constructor của nó.

- Từ khoá `super` phải được dùng trước khi từ khoá `this` được dùng trong constructor
- Gọi `super()` sẽ gọi constructor của class cha. Nếu bạn muốn truyền biến vào constructor của class cha, bạn có thể gọi `super(arguments)`
- Nếu class cha có 1 hàm tên X, bạn có thể dùng `super.X()` để gọi hàm đó trong class con. 

## Ví dụ

```javascript
class Polygon {
  constructor(height, width) {
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  }

  getHelloPhrase() {
    return `Hi, I am a ${this.name}`;
  }
}

class Square extends Polygon {
  constructor(length) {
    // Gọi constructor của class cha với lengh được gán cho width và height của Polygon
    super(length, length);
    // Chú ý: ở class con, 'super()' phải được gọi trước khi dùng 'this' nếu không sẽ xảy ra lỗi reference error
    this.name = 'Square';
    this.length = length;
  }

  getCustomHelloPhrase() {
    const polygonPhrase = super.getHelloPhrase(); // gọi hàm X của class cha với cú pháp 'super.X()'
    return `${polygonPhrase} with a length of ${this.length}`;
  }

  get area() {
    return this.height * this.width;
  }
}

const mySquare = new Square(10);
console.log(mySquare.area) // 100
console.log(mySquare.getHelloPhrase()) // 'Hi, I am a Square' -- Square kế thừa từ Polygon và có thể truy cập tới các hàm của Polygon
console.log(mySquare.getCustomHelloPhrase()) // 'Hi, I am a Square with a length of 10'
```

Nếu chúng ta dùng `this` trước khi gọi `super()` trong class `Square` thì sẽ xảy ra lỗi `ReferenceError`

```javascript
class Square extends Polygon {
  constructor(length) {
    this.height; // ReferenceError, super cần được gọi đầu tiên!

    super(length, length);

    this.name = 'Square';
  }
}
```

## Tham khảo

- [Extends - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)
- [Super operator - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super)
- [Inheritance - MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance)

# Anamorphism và Catamorphism

## Anamorphism

Anamorphism là 1 hàm map từ 1 object thành 1 structure phức tạp hơn có chứa type của object đó. Nói cách khác, nó là quá trình `unfold` 1 cấu trúc đơn giản thành 1 cái phức tạp hơn. Hãy xem xét 1 ví dụ unfold 1 số nguyên thành 1 list các số nguyên. Số nguyên là object ban đầu và list các số nguyên là 1 cấu trúc phức tạp hơn.

```javascript
function downToOne(n) {
  const list = [];

  for (let i = n; i > 0; --i) {
    list.push(i);
  }

  return list;
}

downToOne(5)
  //=> [ 5, 4, 3, 2, 1 ]
```

## Catamorphism

Ngược với anamorphism, catamorphism nhận vào các object thuộc về 1 cấu trúc phức tạp và `fold` chúng thành 1 cái đơn giản hơn. Hãy cùng xem xét ví dụ dưới đây: hàm `product` nhận vào 1 list các số nguyên và trả về 1 số nguyên duy nhất

```javascript
function product(list) {
  let product = 1;

  for (const n of list) {
    product = product * n;
  }

  return product;
}

product(downToOne(5)) // 120
```

## Tham khảo

- [Anamorphisms in JavaScript](http://raganwald.com/2016/11/30/anamorphisms-in-javascript.html)
- [Anamorphism](https://en.wikipedia.org/wiki/Anamorphism)
- [Catamorphism](https://en.wikipedia.org/wiki/Catamorphism)

# Generator
Có 1 cách khác để viết hàm `downToOne` ở ví dụ trong phần trên, đó là dùng `Generator`. Để khởi tạo 1 generator, chúng a dùng cú pháp `function *`. Generator là 1 hàm mà có thể kết thúc và sau đó lại được chạy với context (variable binding) không đổi.

## Ví dụ

Hàm `downToOne` ở trên có thể được viết lại thành

```javascript
function * downToOne(n) {
  for (let i = n; i > 0; --i) {
    yield i;
  }
}

[...downToOne(5)] // [ 5, 4, 3, 2, 1 ]
```

Generator trả về 1 iterable object. Khi hàm `next()` của iterator được gọi, nó sẽ chạy cho đến khi gặp từ khóa `yield` đầu tiên, `yield` được dùng để chỉ rõ giá trị được trả ra từ iterator. Khi `return` đã được gọi trong generator thì nó sẽ được coi là hoàn thành và trả về giá trị. Kể cả nếu tiếp tục gọi `next()` thì cũng không có giá trị nào được trả về.

```javascript
// Yield Example
function * idMaker() {
  var index = 0;
  while (index < 2) {
    yield index;
    index = index + 1;
  }
}

var gen = idMaker();

gen.next().value; // 0
gen.next().value; // 1
gen.next().value; // undefined
```

`yield*` có thể được dùng để cho phép 1 generator gọi 1 generator khác trong iteration.

```javascript
// Yield * Example
function * genB(i) {
  yield i + 1;
  yield i + 2;
  yield i + 3;
}

function * genA(i) {
  yield i;
  yield* genB(i);
  yield i + 10;
}

var gen = genA(10);

gen.next().value; // 10
gen.next().value; // 11
gen.next().value; // 12
gen.next().value; // 13
gen.next().value; // 20
```

```
// Generator Return Example
function* yieldAndReturn() {
  yield "Y";
  return "R";
  yield "unreachable";
}

var gen = yieldAndReturn()
gen.next(); // { value: "Y", done: false }
gen.next(); // { value: "R", done: true }
gen.next(); // { value: undefined, done: true }
```

## Tham khảo

- [Mozilla MDN Web Docs, Iterators and Generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators#Generators)

# Static method

Từ khóa `static` được dùng trong các class để khai báo static method. Static method là các hàm chỉ thuộc về object class mà không thuộc về bất kì instance nào của class đó.

## Ví dụ

```javascript
class Repo {
  static getName() {
    return "Repo name is modern-js-cheatsheet"
  }
}

// Chúng ta không cần phải tạo instance của class Repo
console.log(Repo.getName()) // Repo name is modern-js-cheatsheet

let r = new Repo();
console.log(r.getName()) // Uncaught TypeError: repo.getName is not a function
```

## Gọi static method từ static method

Để gọi 1 static method từ 1 static method khác chúng ta có thể sử dụng từ khóa `this`

```javascript
class Repo {
  static getName() {
    return "Repo name is modern-js-cheatsheet"
  }

  static modifyName() {
    return this.getName() + '-added-this'
  }
}

console.log(Repo.modifyName()) // Repo name is modern-js-cheatsheet-added-this
```

## Gọi static method từ non-static method

Non-static method có thể gọi static method bằng 2 cách:

- Dùng class name

    ```javascript
    class Repo {
      static getName() {
        return "Repo name is modern-js-cheatsheet"
      }

      useName() {
        return Repo.getName() + ' and it contains some really important stuff'
      }
    }

    let r = new Repo()
    console.log(r.useName()) // Repo name is modern-js-cheatsheet and it contains some really important stuff
    ```

- Dùng constructor

    ```javascript
    class Repo {
      static getName() {
        return "Repo name is modern-js-cheatsheet"
      }

      useName() {
        // Calls the static method as a property of the constructor
        return this.constructor.getName() + ' and it contains some really important stuff'
      }
    }

    let r = new Repo()
    console.log(r.useName()) // Repo name is modern-js-cheatsheet and it contains some really important stuff
    ```
    
## Tham khảo

- [static keyword- MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)
- [Static Methods- Javascript.info](https://javascript.info/class#static-methods)
- [Static Members in ES6- OdeToCode](http://odetocode.com/blogs/scott/archive/2015/02/02/static-members-in-es6.aspx)

# Truthy / Falsy

Trong JavaScript, 1 giá trị `truthy` or `falsy` là 1 giá trị mà sẽ được chuyển kiểu (cast) thành boolean khi được đánh giá trong 1 boolean context. Một ví dụ của boolean context là câu điều kiện `if`.

Mọi giá trị sẽ được chuyển kiểu thành `true` trừ khi nó bằng với

- `false`
- `0`
- `""` (string rỗng)
- `null`
- `undefined`
- `NaN`

Dưới đây là những ví dụ của boolean context:

- Câu điều kiện `if`

    ```javascript
    if (myVar) {}
    ```
    
- Sau operator NOT `!`

    Operator này trả về `false` nếu như operand của nó có thể được chuyển kiểu thành `true`, ngược lại trả về `true`
    
    ```javascript
    !0 // true -- 0 là falsy nên nó trả về true
    !!0 // false -- 0 là falsy nên !0 trả về true nên !(!0) trả về false
    !!"" // false -- empty string là falsy nên NOT (NOT false) bằng false
    ```
    
- Với constructor của Boolean object

    ```javascript
    new Boolean(0) // false
    new Boolean(1) // true
    ```
    
- Trong ternary evaluation

    ```javascript
    myVar ? "truthy" : "falsy"
    ```
    
    Ở đây `myVar` được đánh giá trong 1 boolean context.
    
Hãy cẩn thận khi so sánh 2 value. Object value sẽ không được chuyển kiểu thành boolean mà nó sẽ được chuyển thành 1 primitive value sử dụng [ToPrimitives specification](http://javascript.info/object-toprimitive). Khi 1 object được so sánh với giá trị boolean như `[] == true`, nó sẽ được thực thi thành `[].toString() == true`

```javascript
let a = [] == true // a là false vì [].toString() trả về ""
let b = [1] == true // b là true vì [1].toString() trả về "1"
let c = [2] == true // c là false vì [2].toString() trả về "2"
```

## Tham khảo

- [Truthy (MDN)](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)
- [Falsy (MDN)](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
- [Truthy and Falsy values in JS - Josh Clanton](http://adripofjavascript.com/blog/drips/truthy-and-falsy-values-in-javascript.html)

# Nguồn bài viết

- [Modern JavaScript Cheatsheet](https://github.com/mbeaudru/modern-js-cheatsheet)