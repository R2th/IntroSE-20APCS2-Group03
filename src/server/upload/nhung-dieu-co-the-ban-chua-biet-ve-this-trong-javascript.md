Xin chào mọi người ạ! (bow)

Với những ai đã từng học tiếng anh, chẳng còn xa lạ gì với câu: "What is this?". Vâng, this ở này, this ở chỗ kia, this ở khắp mọi nơi. Vậy với trong vương quốc lập trình Javascript thì con trỏ this là 1 khái niệm quan trọng. Hiểu được nó là this 1 hay this 2 ta sẽ tránh được bug không mong muốn khi làm việc với Javascript. Chính vì vậy trong bài viết này chúng ta cùng đi làm rõ với từ khóa this này nhé.

# `this` là khỉ gì nhỉ?

Khi bạn gặp từ khóa `this` trong các ngôn ngữ lập trình như Java, C#,.. thì gần như bạn sẽ nghĩ tới this chính là tham chiếu tới thể hiện (instance) hiện tại hoặc hàm hiện tại. Đây cũng chính là lý do khiến nhiều bạn hiểu nhầm về từ khóa `this` trong `Javascript`, nhất là các bạn mới tiếp xúc và sử dụng Js.

Trong `Javascript` thì `this` là một từ khóa mà bản chất của nó giống như tên gọi của nó, đó là ám chỉ đối tượng hiện tại đang được sử dụng hoặc đang truy cập tới. Khá giống với định nghĩa this ở các ngôn ngữ khác đúng không các bạn, tuy nhiên trong Js `this` lại có giá trị khác nhau tùy thuộc vào **context** (*ngữ cảnh*) đang sử dụng.

Ví dụ: Qua là ngày Va lung tung, mình có dẫn bạn gái vào nhà hàng sang trọng nhất Hà Nội. (Tưởng tượng thôi các bạn ạ! huhi) Khi đồ ăn được mang ra, bạn gái tôi hỏi "What is this?". Tôi nói đó là Tôm hùm đại dương. Rồi cô ấy lại chỉ sang bát súp hỏi "What is this?". Tôi nói đó là Súp vi cá mập. Ở đây, `this` lúc thì là Tôm hùm, lúc lại là Súp vi cá mập. Nghĩa của `this` luôn đi kèm với **context** (*ngữ cảnh*) - bàn nơi 2 người ngồi, rồi món án và ngôn ngữ cơ thể của bạn gái. Điều này cũng tương tự trong Javascript.

Ví dụ 1:
```js
function greeting() {
  var name = 'Quan Tien';
  console.log('Hi', this.name);
  // console.log(this.name === global.name) // log ra true nếu chạy trên nodejs
  // console.log(this.name === window.name) // log ra true nếu chạy trên browser
}

var name = 'Vinh';

greeting(); // 'Hi Vinh' ???

// `this` ở đây không phải là `greeting()` mà là `global/window object`
```

Ví dụ 2:
```js
function greeting() {
  var name = 'Quan Tien';
  this.sayHi();
}

function sayHi() {
  console.log('Hi', this.name);
}

var name = 'Vinh';

greeting(); // 'Hi Vinh' ???

// Hiển nhiên, `this` ở đây không phải là `sayHi()`.
// Hàm sayHi() được gọi trong scope của `greeting()` nhưng
// `this` không phải là `greeting()` mà vẫn là `global/window object`.
```

Qua ví dụ trên, ta có thể thấy `this` chỉ thực sự là 1 ràng buộc được tạo ra cho đến khi hàm được gọi, và cái gì nó tham chiếu đều được được xác định bởi call-site tại nơi hàm được gọi. Vậy `Call site` là gì?

# Call site?

**Call site** là **nơi hàm được gọi**, không phải nơi nó được khai báo. Vậy hàm được gọi ở đâu?

**Call stack** là 1 khái niệm chỉ **vị trí của thread** khi chương trình đang thực thi. Khi hàm được gọi (*call*), nó được xếp chồng lên nhau thành 1 đống (*stack*). Call-stack sẽ đẩy function vào (*push*) khi nó được gọi (*call*) và ném function ra (*pop*) khỏi stack khi function đó *return*.

![](https://images.viblo.asia/61257264-81f7-427c-8b3b-0340fd5ae763.png)

Ví dụ:
```js
function baz() {
    // call-stack là: `baz`
    // call-site sẽ là trong global scope
    console.log( "baz" );
    bar(); // <-- call-site cho `bar`
}
function bar() {
    // call-stack là: `baz` -> `bar`
    // call-site là trong `baz`
    console.log( "bar" );
    foo(); // <-- call-site cho `foo`
}
function foo() {
    // call-stack là: `baz` -> `bar` -> `foo`
    // call-site trong `bar`
    console.log( "foo" );
}
baz(); // <-- call-site cho `baz`
```

# Các quy tắc áp dụng với this

## Quy tắc 1 - New binding (Xuất hiện từ khóa `new`):

`this` là object mới vừa được tạo với từ khóa `new`.
```js
function foo(a) {
    this.a = a;
}
var bar = new foo(2);
bar.a // 2
```
Khi ta gọi 1 function với từ khóa `new` thì các điều sau sẽ được thực hiện:

1. Tạo một object mới.

2. Link object mới này với một object khác.

3. `this` được ràng buộc với object mới tạo ở bước 1.

4. Trả về `this` nếu hàm không trả về object.
```js
function foo(a) {
    this.a = a;
    
    return {};
}
var bar = new foo(2);
bar.a // undefined

// Do hàm trả về một object nên this ở đây là foo,
// không phải là object bar vừa tạo nên kết quả là undefined
```

## Quy tắc 2 - Explicit binding (Ràng buộc rõ ràng):

`this` là một object được chỉ định rõ. Hàm có được gọi cùng với *call*, *apply* hoặc *bind* không?

```js
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2
};

// this được chỉ định rõ là obj bằng từ khóa `call`
var bar = foo.call(obj);
bar.a; //2
```

### Phân biệt *call*, *appy* và *bind*

* **call**: gọi hàm ngay lập tức và cho phép pass từng arguments một.
    ```js
    var member = {
      name: 'Quan Tien'
    };

    function greeting(text1, text2) {
      console.log(`${text1}, ${this.name}. ${text2}.`);
    }

    greeting.call(member, 'Hello', 'Nice to meet you');
    // Hello, Quan Tien. Nice to meet you.
    ```
* **apply**: gọi hàm ngay lập tức như call, chỉ khác là apply cho phép pass một array có một hoặc nhiều elements.
    ```js
    var member = {
      name: 'Quan Tien'
    };

    function greeting(text1, text2) {
      console.log(`${text1}, ${this.name}. ${text2}.`);
    }

    greeting.apply(member, ['Hello', 'Nice to meet you']);
    // Hello, Quan Tien. Nice to meet you.
    ```
* **bind**: không gọi hàm ngay mà trả về một hàm mới.
    ```
    var member = {
      name: 'Quan Tien'
    };

    function greeting(text1, text2) {
      console.log(`${text1}, ${this.name}. ${text2}.`);
    }

    // `bind` trả về một function. Gán function này với sayHi.
    var sayHi = greeting.bind(member, 'Hello', 'Nice to meet you');
    sayHi(); // Hello, Quan Tien. Nice to meet you.
    ```
    
## Quy tắc 3 - Implicit binding (Ràng buộc ẩn):
    
```js
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo();
bar; //2
```

Điều đầu tiên cần chú ý đó là function foo() được khởi tạo, sau đó được tham chiếu bởi một thuộc tính trong obj ta hiểu là hàm bị bao bởi một object (trong trường hợp này là obj)

Call site sử dụng obj để tham chiếu đến hàm, ta hiểu rule này là obj sẽ được tham chiếu đến this khi hàm foo được gọi, hay có thể hiểu this.a ở đây chính là obj.a

Cũng cần nhớ rằng chỉ có obj cuối cùng trong chuỗi gọi sẽ được tham chiếu đến như trong ví dụ sau:

```js
function foo() {
    console.log(this.a);
}
var obj2 = {
    a: 42,
    foo: foo
};
var obj1 = {
    a: 2,
    obj2: obj2
};
var bar = obj1.obj2.foo(); 
bar; //42 this sẽ tham chiếu đến obj2 thay vì là obj1
```

## Quy tắc 4 - Default Binding (Ràng buộc mặc định):

`this` là *window object (browser)* hoặc *global object (nodejs)* hoặc *undefined (use strict)*.

```js
// Xét TH 1: Dùng var
function foo() {
  console.log(this.a);
}

var a = 2;

foo(); //2

// `this` được trỏ tới global/window object.
global === this; // true
// Dùng var thì biến name sẽ được thêm vào properties của global/window object.
global.a === this.a; // true
```

```js
// Xét TH 1: Dùng let
function foo() {
  console.log(this.a);
}

let a = 2;

foo(); //2

// `this` được trỏ tới global/window object.
global === this; // true
// Dùng `let` thì biến `name` sẽ không được thêm vào properties của `global/window object`.
global.a === this.a; // false
```

```js
// Xét TH 3: strict mode
function foo() {
  "use strict";
  console.log(this.a);
}

var a = 2;

foo(); // TypeError: Cannot read property 'a' of undefined
// Nếu có `use strict` thì giá trị của `this` sẽ là undefined
```

# Tổng kết

* `this` binding phụ thuộc vào ngữ cảnh (*context*).
* `Call site` là nơi hàm được gọi.
* `Call stack` là một khái niệm chỉ vị trí của thread khi chương trình đang thực thi (execution).
* `Bốn quy tắc` theo thứ tự ưu tiên xác định this:

    1. Từ khóa `new`.
    2. `Explicit binding` (*ràng buộc rõ ràng*): this là object được gọi cụ thể cùng với call, apply và bind.
    3. `Implicit binding` (*ràng buộc ẩn*): this là object chứa context.
    4. `Default Binding`: mặc định this là global/window object hoặc là undefined nếu có use strict.

## Tài liệu tham khảo

* **Sách You don’t know JS của Kyle Simpson.**
* https://developer.mozilla.org/
* https://blog.bitsrc.io/what-is-this-in-javascript-3b03480514a7
* https://medium.com/better-programming/understanding-the-this-keyword-in-javascript-cb76d4c7c5e8