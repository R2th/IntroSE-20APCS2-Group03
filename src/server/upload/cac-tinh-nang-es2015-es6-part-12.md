# 1. let và const

Mình đã có bài viết riêng cho phần này, các bạn có thể xem tại [đây](https://viblo.asia/p/var-let-va-const-hoisting-va-scope-vyDZOpPRlwj).

# 2. Arrow Function

Mình cũng đã có bài viết riêng cho phần này, các bạn có thể xem tại [đây](https://viblo.asia/p/gioi-thieu-so-luoc-ve-arrow-functions-trong-es6-cho-nguoi-chua-biet-gi-WAyK84BnKxX).

# 3. Class

JavaScript có một cách triển khai tính kế thừa khá đặc biệt so với các ngôn ngữ khác: Prototypal Inheritance (các bạn tạm hiểu là thay vì kế thừa từ Class, các object lại kế thừa trực tiếp từ các object khác).

Vì lập trình viên Java hoặc Python hoặc các ngôn ngữ khác gặp khó khăn trong việc hiểu được sự phức tạp của Prototypal Inheritance nên hội đồng ECMAScript đã quyết định tạo ra một cú pháp thân thiện cho Prototypal Inheritance để cho nó trông giống với cách thức kế thừa từ Class phổ biến ở các ngôn ngữ khác.

Tất nhiên, bản chất bên trong JavaScript vẫn giữ nguyên như cũ, bạn vẫn có thể truy cập một object prototype theo cách thông thường.

### Định nghĩa Class

Một Class sẽ trông giống như sau:

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  hello() {
    return "Hello, I am " + this.name + ".";
  }
}
```

Một class sẽ có tên của nó, và chúng ta có thể dùng tên đó để tạo ra các object mới bằng `new ClassName()`.

Khi object được khởi tạo, method `constructor` sẽ được gọi với các tham số truyền vào.

Một class cũng có thể có nhiều method. Trong ví dụ trên, `hello` là một method và có thể được gọi từ các object của class đó:

```javascript
const tung = new Person("Tung");
tung.hello(); // Hello, I am Tung.
```

### Kế thừa class

Một class có thể mở rộng sang một class khác, và các object được khởi tạo sử dụng class đó sẽ thừa kế tất cả các method của cả hai class.

Nếu class con có method trùng tên với một method nào đó của class mà nó kế thừa thì method nào gần nhất sẽ được ưu tiên:

```javascript
class Programmer extends Person {
  hello() {
    return super.hello() + " I am a programmer.";
  }
}

const tung = new Programmer("Tung");
tung.hello(); // Hello, I am Tung. I am a programmer.
```

Trong một class, bạn có thể tham chiểu tới class cha của nó bằng cách dùng `super()`.

### Static methods

Thông thường, method được định nghĩa dành cho các instance của class.

Còn các static method sẽ được thực thi trực tiếp từ class:

```javascript
class Person {
  static genericHello() {
    return "Hello";
  }
}

Person.genericHello(); // Hello
```

### Private methods

JavaScript không được tích hợp sẵn cách định nghĩa các private hoặc protected method.

### Getter và setter

Bạn có thể thêm `get` hoặc `set` vào trước tên các method để tạo ra getter và setter. Hai thứ này sẽ chạy tùy theo bạn đang làm gì: truy cập biến hay thay đổi giá trị của nó.

```javascript
class Person {
  constructor(name) {
    this._name = name;
  }
  set name(value) {
    this._name = value;
  }
  get name() {
    return this._name;
  }
}

const person = new Person("Tung");
person.name; // Tung
person.name = "Tung MTP";
person.name; // Tung MTP
```

Nếu bạn chỉ có getter thì không thể thay đổi giá trị của thuộc tính, mọi thay đổi khi đó sẽ bị bỏ qua:

```javascript
class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
}

const person = new Person("Tung");
person.name; // Tung
person.name = "Tung MTP";
person.name; // Tung
```

Nếu bạn chỉ có setter, bạn có thể thay đổi giá trị nhưng không thể truy cập:

```javascript
class Person {
  constructor(name) {
    this._name = name;
  }
  set name(value) {
    this._name = value;
  }
}

const person = new Person("Tung");
person.name; // undefined
person.name = "Tung MTP";
person.name; // undefined
```

# 4. Tham số mặc định

Dưới đây là hàm `doSomething` và có thể nhận `param1`.

```javascript
const doSomething = param1 => {};
```

Chúng ta có thể thêm giá trị mặc định cho `param1` nếu như hàm được gọi mà không có tham số:

```javascript
const doSomething = (param1 = "test") => {
  console.log(param1);
};

doSomething(); // test
doSomething("another test"); // another test
```

Dùng với nhiều tham số cũng không thành vấn đề:

```javascript
const doSomething = (param1 = "test", param2 = "test2") => {
  console.log(param1, param2);
};

doSomething(); // test test2
doSomething("test3", "test4"); // test3 test4
```

# 5. Template Literals

Template Literals cho phép bạn thao tác với string theo một cách mới lạ hơn so với ES5 và các phiên bản trước.

Cú pháp của nó trông rất đơn giản, chỉ cần dùng dấu backtick thay vì nháy đơn hay nháy kép:

```javascript
const a_string = `something`;
```

Điềm độc đáo của nó là ở chỗ nó cho chúng ta rất nhiều tính năng mà các string dùng dấu nháy không có, cụ thể là:

- cho chúng ta một cú pháp tốt để tạo ra các string nhiều dòng
- dễ dàng nội suy các biến và biểu thức trong string
- cho phép bạn tạo DSL với các template tag (DSL là domain specific language, một ví dụ cho ứng dụng này là nó đã được sử dụng trong các Styled Component của React)

Hãy đi sâu vào từng điều trên:

### String nhiều dòng

Trước ES6, để tạo ra một string trải dài xuống dòng thứ hai, bạn phải dùng kí tự `\` ở cuối dòng:

```javascript
const string =
  "first part \
second part";
```

Nó sẽ tạo ra một string ở 2 dòng nhưng chỉ render ra 1 dòng:

`first part second part`

Để render string cũng thành 2 dòng, bạn cần phải thêm `\n` vào cuối mỗi dòng như sau:

```javascript
const string =
  "first line\n \
second line";
```

hoặc

```javascript
const string = "first line\n" + "second line";
```

Template literals khiến việc tạo string nhiều dòng trở nên đơn giản hơn nhiều.

Sau khi mở đầu template literal bằng dấu backtick, bạn chỉ việc ấn enter để xuống dòng mà không cần kí tự đặc biệt nào, và nó sẽ được render giống hệt như khi bạn khai báo:

```javascript
const string = `Hey
this
string
is awesome!`;
```

Bạn cần lưu ý là các khoảng trắng sẽ được hiển thị, nên khi bạn khai báo như thế này:

```javascript
const string = `First
                Second`;
```

thì nó sẽ tạo ra một string như thế này:

```javascript
First;
Second;
```

một cách đơn giản để tránh trường hợp trên là hãy để trống dòng đầu và thêm method trim() ngay sau dấu backtick cuối, như vậy bất kì khoản trắng nào trước kí tự đầu tiên đều sẽ bị loại bỏ:

```javascript
const string = `
First
Second`.trim();
```

### Nội suy

Template literals cho chúng ta một cách dễ dàng để nội suy bến và các biểu thức thành string.

Chúng ta làm điều đó bằng cú pháp `${...}`

```javascript
const x = "test";
const string = `something ${x}`;

string; // something test
```

bên trong `${}` bạn có thể thâm bất kì thứ gì, kể cả biểu thức:

```javascript
const string = `something ${1 + 2 + 3}`;
const string2 = `something ${foo() ? "x" : "y"}`;
```

### Template tags

Nhìn qua thì có thể bạn sẽ thấy tính năng này không được hữu dụng cho lắm, nhưng thực ra nó được sử dụng trong rất nhiều các thư viện, như là Styled Components hoặc Apollo, thư viện client/server GraphQL, vậy nên hiểu được cách hoạt động của nó là một điều cần thiết.

Trong Styled Component, template tag được sử dụng trong việc khai báo các chuỗi CSS:

```javascript
const Button = styled.button`
  font-size: 1.5em;
  background-color: black;
  color: white;
`;
```

Trong Apollo, template tag được sử dụng trong việc khai báo schema truy vấn GraphQL:

```javascript
const query = gql`
  query {
    ...
  }
`;
```

Các template tag `styled.button` và `gql` ở những ví dụ trên đơn giản chỉ là các **function**:

```javascript
function gql(literals, ...expressions) {}
```

function trên sẽ trả về một chuỗi, chuỗi đó có thể là kết quả của một loạt các tính toán nào đó.

`literals` là một mảng chứa nội dung của template literal được token hóa bởi việc nội suy các biểu thức.

`expressions` chứa tất cả các phép tính nội suy.

Xét ví dụ ở phần trước:

```javascript
const string = `something ${1 + 2 + 3}`;
```

`literals` ở đây chính là một mảng gồm hai phần tử. Phần tử đầu tiên là đoạn string `something`, phần tử thứ hai là đoạn string trống ở giữa đoạn string đầu và phép nội suy.

`expressions` trong trường hợp này là một mảng với một phần tử duy nhất: `6`.

Một ví dụ phức tạp hơn như sau:

```javascript
const string = `something
another ${"x"}
new line ${1 + 2 + 3}
test`;
```

trong ví dụ này thì `literals` là một mảng với phần tử đầu tiên là:

```javascript
`something
another `;
```

phần tử thứ hai là:

```javascript
`
new line `;
```

và phần tử thứ ba là:

```javascript
`
test`;
```

`expressions` trong ví dụ này là mảng gồm hai phần tử: `x` và `6`.

Nói tóm lại, có thể hiểu đơn giản template tag là một hàm mà nhận được các tham số `literals`, `expressions` được tự động tách ra từ template literal truyền vào. Và do dó ta có thể có tùy ý xử lý template literal đó, đây chính là thế mạnh của tính năng này.

# 6. Destructuring assignments

Với tính năng này, từ một object cho trước, ban có thế lấy ra các giá trị của nó và gán vào các biến khác nhau:

```javascript
const person = {
  firstName: "Tom",
  lastName: "Cruise",
  actor: true,
  age: 54
};

const { firstName: name, age } = person;
```

Ta sẽ được các biến `name` và `age` chứa đúng các giá trị ta muốn lấy.

Cú pháp này cũng có thể áp dụng được với mảng:

```javascript
const a = [1, 2, 3, 4, 5];
const [first, second] = a;

first; // 1
second; // 2
```

Câu lệnh sau sẽ tạo ra 3 biến mới với giá trị lấy từ các phần từ có index 0, 1, 4 từ mảng `a`:

```javascript
const [first, second, , , fifth] = a;

first; // 1
second; // 2
fifth; // 5
```

# 7. Object Literals nâng cấp

Trong ES2015 Object Literals được nâng cấp vô cùng mạnh mẽ.

### Cú pháp đơn giản hơn khi thêm biến vào

Thay vì viết:

```javascript
const something = "y";
const x = {
  something: something
};
```

bạn có thể viết:

```javascript
const something = "y";
const x = {
  something
};
```

### Prototype

Một prototype có thế được chỉ định như sau:

```javascript
const anObject = { y: "y" };
const x = {
  __proto__: anObject
};

x.y; // y
```

### super()

```javascript
const anObject = { y: "y", test: () => "zoo" };
const x = {
  __proto__: anObject,
  test() {
    return super.test() + "x";
  }
};

x.test(); // zoox
```

### Key động

```javascript
a = "c";
b = "d";

const x = {
  [a + "_" + b]: "z"
};

x.c_d; // z
```

# 8. Vòng lặp for-of

Năm 2009, ES5 đã đưa đến chúng ta vòng lặp `forEach()`. Mặc dù tốt nhưng nó lại không có cách break vòng lặp giống như vòng lặp `for`.

ES2015 đem đến cho chúng ta **vòng lặp** **`for-of`**, nó bao gồm cả sự súc tích của `forEach` cũng như khả năng break:

```javascript
// lặp qua các giá trị
for (const v of ["a", "b", "c"]) {
  console.log(v);
}

// lấy index bằng cách sử dụng `entries()`
for (const [i, v] of ["a", "b", "c"].entries()) {
  console.log(i); // index
  console.log(v); // value
}
```

Bạn hãy chú ý ở ví dụ chúng ta sử dụng `const`. Vì vòng lặp này tạo ra scope mới ở mỗi lần lặp nên chúng ta có thể yên tâm sử dụng nó thay vì `let`.

Điểm khác biệt giữa vòng lặp này với `for...in` là:

- `for...of` **lặp qua giá trị của các thuộc tính**
- `for...in` **lặp qua tên của các thuộc tính**

# 9. Promises

Một promise thường được định nghĩa là **một sự đại diện cho một xử lý bất đồng bộ và chứa kết quả cũng như các lỗi xảy ra từ xử lý bất đồng bộ đó**

Promise là một cách để xử lý bất đồng bộ mà không phải viết quá nhiều callback.

**Async functions** sử dụng API promises làm nền tảng để xây dựng, cho nên hiểu được chúng là một điều cần thiết dù cho hiện nay có thể bạn sử dụng async functions thay vì promise.

### Ngắn gọn cách hoạt động của promise

Một khi promise được gọi, nó sẽ bắt đầu trong trạng thái **pending**. Điều này có nghĩa là hàm gọi promise sẽ tiếp tục thực thi trong khi chờ promise thực hiện những xử lý của riêng nó và trả lại cho hàm gọi promise với trạng thái **resolved** hoặc **rejected**.

### API Js nào sử dụng promise?

Ngoài code của bạn và code của thư viện, promise được dùng trong các standard modern Web APIs như:

- Battery API
- [Fetch API](https://flaviocopes.com/fetch-api/)
- [Service Workers](https://flaviocopes.com/service-workers/)

### Tạo một promise

API Promise sẽ cho phép ta khởi tạo promise với `new Promise()`:

```javascript
let done = true;

const isItDoneYet = new Promise((resolve, reject) => {
  if (done) {
    const workDone = "Here is the thing I built";
    resolve(workDone);
  } else {
    const why = "Still working on something else";
    reject(why);
  }
});
```

Như bạn có thể thấy, promise check biến `done`, nếu true thì trả về một resolved promise, còn không thì trả về một rejected promise.

Sử dụng `resolve` và `reject` chúng ta có thể trả lại một giá trị, trong ví dụ trên chúng ta chỉ trả về một string, nhưng thực tế chúng ta cũng có thể trả về một object.

### Sử dụng promise

```javascript
const isItDoneYet = new Promise();
// ...

const checkIfItsDone = () => {
  isItDoneYet
    .then(ok => {
      console.log(ok);
    })
    .catch(err => {
      console.error(err);
    });
};
```

Chạy hàm `checkIfItsDone()` sẽ thực thi promise `isItDoneYet()` và đợi nó, nếu thành cồng thì xử lý bằng callback `then`, còn nếu có lỗi thì nó sẽ handle bằng callback `catch`.

### Chuỗi các promise

Một promise có thể trả lại kết quả cho một promise khác, tạo thành một chuỗi các promise.

Một ví dụ điển hình về chuỗi promise có thể thấy ở [Fetch API](https://flaviocopes.com/fetch-api/), một layer phía trên của XMLHttpRequest API. Chúng ta có thể dùng nó để lấy resource và xếp chuỗi các promise và chạy chúng khi resource được lấy về.

Fetch API là một cơ chế dựa trên promise, và gọi `fetch()` sẽ tương đương với việc chúng ta khai báo promise với `new Promise()`.

### Ví dụ về chuỗi promise

```javascript
const status = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText));
};

const json = response => response.json();

fetch("/todos.json")
  .then(status)
  .then(json)
  .then(data => {
    console.log("Request succeeded with JSON response", data);
  })
  .catch(error => {
    console.log("Request failed", error);
  });
```

Trong ví dụ trên, chúng ta gọi `fetch()` để lấy về danh sách các TODO items từ file `todo.json` ở root của domain

`fetch()` trả về một response với nhiều thuộc tính, và chúng ta tham chiếu tới các thuộc tính sau:

- `status`, một giá trị số đại diện cho HTTP status code
- `statusText`, một status message (là `OK` nếu request thành công)

`response` cũng có method `json()` trả về một promise resolve với nội dung của phần body được xử lý và chuyển thành JSON.

Mọi việc sẽ diễn ra như sau: promise đầu tiên trong chuỗi là một function chúng ta khai báo, tên là `status()`, nó check response status và nếu không phải là response thành công (từ 200 đến 299) thì nó sẽ reject promise.

Nếu reject, chuỗi promise sẽ bỏ qua toàn bộ promise và chạy luôn đến dòng lệnh `catch()` ở dưới, log ra đoạn text `Request failed` cùng với error message.

Nếu thành công, nó sẽ gọi hàm `json()` do chúng ta khai báo. Vì promise trước thành công nên một `response` object được trả về và nó trở thành input cho promise thứ hai.

Promise thứ hai của chúng ta trả về data JSON đã được xử lý, promise thứ ba nhận lấy JSON này:

```javascript
.then((data) => {
  console.log('Request succeeded with JSON response', data)
})
```

và log ra trên console.

### Xử lý lỗi

Trong ví dụ trên, chúng ta có thêm `catch` vào sau chuỗi promise.

Khi có bất cứ thứ gì trong chuỗi promise chạy không thành công và raise lỗi hoặc reject promise, dòng lệnh `catch()` gần nhất sẽ được thực thi.

```javascript
new Promise((resolve, reject) => {
  throw new Error("Error");
}).catch(err => {
  console.error(err);
});

// or

new Promise((resolve, reject) => {
  reject("Error");
}).catch(err => {
  console.error(err);
});
```

### Lỗi xếp chồng

Nếu bên trong `catch()` bạn raise một lỗi, bạn có thế thêm vào một `catch()` nữa để xử lý nó, và lại có thể tiếp tục thêm `catch()` sau đó nữa:

```javascript
new Promise((resolve, reject) => {
  throw new Error("Error");
})
  .catch(err => {
    throw new Error("Error");
  })
  .catch(err => {
    console.error(err);
  });
```

### Tổ chức, sắp xếp các promise

#### `Promise.all()`

Nếu bạn cần đồng bộ các pomise, `Promise.all()` sẽ giúp bạn khai báo một danh sách các promise và thực thi một thứ gì đó khi tất cả các promise resolve.

Ví dụ:

```javascript
const f1 = fetch("/something.json");
const f2 = fetch("/something2.json");
Promise.all([f1, f2])
  .then(response => {
    console.log("Array of results", response);
  })
  .catch(err => {
    console.error(err);
  });
```

Kết hợp với cú pháp destructuring assignment chúng ta có thể viết như sau:

```javascript
Promise.all([f1, f2]).then(([res1, res2]) => {
  console.log("Results", res1, res2);
});
```

Tất nhiên bạn không bị giới hạn phải dùng `fetch`, **bất kì promise nào đều có thể áp dụng**.

#### `Promise.race()`

`Promise.race()` chay ngay khi một trong các promise bạn truyền vào nó được resolve và nó sẽ chạy callback chỉ một lần với kết quả của promise đầu tiên được resolve.

Ví dụ:

```javascript
const promiseOne = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

const promiseTwo = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "two");
});

Promise.race([promiseOne, promiseTwo]).then(result => {
  console.log(result); // 'two'
});
```

# 10. Modules

ES Modules là tiêu chuẩn của ECMAScript khi làm việc với modules.

### Cú pháp ES Modules

Cú pháp để import một module như sau:

```javascript
import package from "module-name";
```

Một module là một file JavaScript **export** ra một hoặc nhiều giá trị (object, hàm hoặc biến) bằng keyword `export`. Ví dụ, module này export ra một hàm trả về string dưới dạng viết hoa:

```javascript:uppercase.js
export default str => str.toUpperCase();
```

Trong ví dụ này, module chỉ định nghĩa ra một **default export** duy nhất, nên hàm đó có thể là một hàm không có tên. Còn không thì nó sẽ cần phải có một cái tên để phân biệt với các export khác.

Giờ thì **bất kì một JavaScript module nào** đều có thể sử dụng chức năng cung cấp bởi uppercase.js bằng việc import nó.

Một trang HTML có thể thêm module bằng việc sử dụng thẻ `<script>` với thuộc tính đặc biệt `type="module"`:

```html
<script type="module" src="index.js"></script>
```

> Note: mọi script load với `type="module"` đều được load với strict mode.

Trong ví dụ này, module `uppercase.js` định nghĩa một **default export** nên khi import nó, bạn có thể đặt một cái tên tùy ý:

```javascript
import toUpperCase from "./uppercase.js";
```

và sử dụng nó như sau:

```javascript
toUpperCase("test"); //'TEST'
```

Bạn cũng có thể sử dụng absolute path để import module hoặc để tham chiếu tới module được định nghĩa trên một domain khác:

```javascript
import toUpperCase from "https://flavio-es-modules-example.glitch.me/uppercase.js";
```

Đây là một cú pháp import khác:

```javascript
import { toUpperCase } from "/uppercase.js";
import { toUpperCase } from "../uppercase.js";
```

Còn đây là một ví dụ import sai cú pháp:

```javascript
import { toUpperCase } from "uppercase.js";
import { toUpperCase } from "util/uppercase.js";
```

Chỉ dùng absolute path hoặc có `./` hoặc `/` ở trước.

### Các option import/export khác

Chúng ta có thể thấy đoạn code này trong ví dụ trước:

```javascript
export default str => str.toUpperCase();
```

Như thế này sẽ tạo ra một default export. Tuy nhiên, trong một file bạn có thể export nhiều hơn một bằng cú pháp sau:

```javascript
const a = 1;
const b = 2;
const c = 3;

export { a, b, c };
```

Một module có thể import tất cả các export của module khác bằng cách:

```javascript
import * from 'module'
```

Bạn có thể import chỉ một vài export bằng destructuring assignment:

```javascript
import { a } from "module";
import { a, b } from "module";
```

Bạn có thể đặt lại tên cho impport bằng `as`:

```javascript
import { a, b as two } from "module";
```

Bạn có thể import default export, và bất kì export không phải default nào bằng tên như sau:

```javascript
import React, { Component } from "react";
```

### CORS

Module được lấy về sử dụng CORS. Điều này có nghĩa là nếu script bạn tham chiếu tới ở một domain khác thì chúng phải có một CORS header hợp lệ cho phép cross-site loading.

### Đối với các trình duyệt không hỗ trợ module

Sử dụng kết hợp `type="module"` và `nomodule`:

```html
<script type="module" src="module.js"></script>
<script nomodule src="fallback.js"></script>
```

---

**Part 2**: [Click here](https://viblo.asia/p/cac-tinh-nang-es2015-es6-part-22-Az45bomVKxY)