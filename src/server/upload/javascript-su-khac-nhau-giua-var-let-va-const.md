Trong bài viết này, chúng ta sẽ nói về sự khác biệt giữa var, let và const. Từ đó bạn có thể biết được khi nào nên dùng **var**, **let** hay **const**.
# Function-scope và Block-scope
Trong JavaScript  có 2 loại scope: `function-scope` và `block-scope`.
## Function-scope

```js
function myFn() {
  var foo = 'peekaboo!';
  
  console.log(foo); // 'peekaboo!'
}

console.log(foo); // ReferenceError: foo is not defined
```

Nếu sử dụng **var** thì phạm vi trong các biến sẽ có bị giới hạn trong function. Khi bạn gọi các biến này ở ngoài function sẽ nhận được thông báo lỗi như trên 

## Block-scope

```js
if (true) {
  var foo = 'peekaboo!';
  let bar = 'i see u';
  const baz = 'baby blue!';

  console.log(foo); // 'peekaboo!';
  console.log(bar); // 'i see u';
  console.log(baz); // 'baby blue!';
}

console.log(foo); // 'peekaboo!';
console.log(bar); // ReferenceError: bar is not defined
console.log(baz); // ReferenceError: baz is not defined
```

**foo** không bị giới hạn bởi `if-statement` block. Tuy nhiên **bar** và **baz** thì bị giới hạn bới `block`

Đó chính là sự khác biệt giữa `let`, `const` và `var`

Một `block` là đoạn code nằm trong dấu `{}` trong JavaScript.

# var
Có nhiều khác giữa `var` và `let` / `const`, vì vậy hãy cùng khám phá một vài đoạn code để hiểu rõ hơn về chúng.

### var outside of a for-loop

```js
// for-loop
for (var i = 0; i < 3; i++) {
  console.log(i);
}

console.log(i);

// 0
// 1
// 2
// 3
```

The variable i is accessible outside of the for-loop. This is expected since variables defined with var are only inaccessible outside of a function definition.

### Redefining var

`var` bạn có thể thay đổi giá trị của biến đó

```js
function myFn() {
  var foo = 1;
  foo = 30;
  var foo = 101;

  console.log(foo);  
}

myFn();

// 101
```

# let

### let outside of a for-loop

```js
// for-loop
for (let i = 0; i < 3; i++) {
  console.log(i);
}

console.log(i);

// 0
// 1
// 2
// ReferenceError: i is not defined
```

### Redefining let

`let` cũng có thể thay đổi giá trị của biến nhưng cú pháp nó nghiêm ngặt hơn `var`

```js
function myFn() {
  let foo = 1;
  foo = 30;
  // let foo = 101;    // 🙅‍♀️ can't use "let" keyword again
  foo = 101;

  console.log(foo);  
}

myFn();

console.log(foo);  

// 101
// ReferenceError: foo is not defined
```

# const

Từ khóa `const` là viết tắt của từ `constant`. Nó cũng giống như let, nhưng tuy nhiên là `const` không thể **reasign** giá trị

```js
const myBoolean = true;

if (myBoolean) {
  const turtles = [
    'leonardo',
    'donatello',
    'michaelangelo',
    'raphael'
  ];
  // turtles = turtles.concat('Shredder');  // 🙅‍♀️ this would throw an error

  console.log(turtles);
}

console.log(turtles); 

// ['leonardo', 'donatello', 'michaelangelo', 'raphael']
// ReferenceError: turtles is not defined
```

# Tóm tắt lại
| Keyword | Function vs Block-scope | Redefinable? |
| -------- | -------- | -------- |
| var     | function-scope     | ✅     |
| let     | block-scope     | ✅     |
| const     | block-scope     | 🚫     |


Nói chung, nếu bạn cần tạo một biến, sử dụng const. Tuy nhiên, nếu bạn biết hoặc nghĩ rằng bạn sẽ cần gán lại nó (vòng lặp for, câu lệnh chuyển đổi, hoán đổi thuật toán) hãy sử dụng let.