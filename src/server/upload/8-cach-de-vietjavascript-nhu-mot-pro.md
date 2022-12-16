## 1. *Arrow functions*

JS phiên bản ES6 ra mắt *Arrow functions* cho phép bạn viết function một cách rõ ràng và nhanh hơn! Thay vì phải khai báo *function* như thế này:

```js
const multiply = function(x, y) {
  return x * y;
};
```

Thì bạn có thể khai báo tương tự với ít code hơn:

```js
const multiply = (x, y) => {
  return x * y;
};
```
Thậm chí còn có thể rút gọn hơn nữa nếu hàm của bạn chỉ có một biểu thức:
```js
const multiply = (x, y) => x * y;
```

## 2. *Spread Operator*
*Spread syntax* cho phép những object có thể lặp như *Array* hoặc *String* được khai báo một cách mở rộng ở trong *function call* hoặc trong phần tử của cú pháp khai báo mảng (*array literals*) hoặc *Object*. (nếu đọc không hiểu thì xem ví dụ sẽ hiểu ngay :laughing:)

### 2.1. Tạo mảng mới mà nó có một phần tử là một mảng
```js
const parts = ['shoulders', 'knees']; 
const lyrics = ['head', ...parts, 'and', 'toes']; 
console.log(lyrics);
// Result: ["head", "shoulders", "knees", "and", "toes"]
```
### 2.2. Một cách tốt hơn để ghép mảng
```js
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];

arr1 = [...arr1, ...arr2];
console.log(arr1) // Result: [0, 1, 2, 3, 4, 5]
```
### 2.3. Sử dụng như là tham số truyền vào function
```js
const add = (a, b, c) => a + b + c;
let array = [1, 2, 3];
console.log(add(...array)); // Result: 6
```

## 3. *Rest Operator*
*Rest syntax* trông giống y hệt *spread syntax*, chỉ khác ở chỗ *rest syntax* được sử dụng để gộp mảng và object. Hiểu một cách khác, *rest syntax* là cú pháp đối nghịch với *spread syntax*. *Spread syntax* cho phép mở rộng mảng vào chính phần tử của nó, trong khi *rest syntax* lại gộp tất cả thành một phần tử duy nhất. 

P/s: Nếu bạn vẫn chưa hiểu thì có thể hiểu theo cách của người dịch như sau: :laughing:
- *Spread syntax* là để truyền vào trong function

    ***=> Sử dụng bằng function call, khai báo object, khai báo mảng, ...***
- *Rest syntax* là để lấy tất cả các phần tử truyền vào bằng một biến duy nhất
    
    ***=> Sử dụng bên trong function***
```js
const blend = (ice, liquid, ...theRest) => {
  console.log(theRest);
};

blend('ice', 'milk', 'banana', 'strawberry');  
// Result: ['banana', 'strawberry']
```
Tham số cuối cùng của hàm trên được thêm tiền tố `...` khiến cho tất cả các tham số còn lại được đặt vào trong cùng một mảng.

## 4. *Fill arrays*
Tạo một mảng đơn giản với một dòng code.

### 4.1. Mảng có 5 phần tử là chuỗi rỗng
```js
let array = Array(5).fill(''); // Result: ['', '', '', '', '']
```
### 4.2. Mảng có số từ `0` đến `4`
```js
let array = Array.from(Array(5).keys()); // Result: [0, 1, 2, 3, 4]

// Using the spread operator
let array = [...Array(5).keys()] // Result: [0, 1, 2, 3, 4]
```

## 5. *Computed property names*

ES6 hỗ trợ một cú pháp mới gọi là *computed property names* cho phép bạn đặt biểu thức trong dấu ngoặc vuông `[]`, biểu thức ở trong đó sẽ được sử dụng như là *key* ở trong *object* đó

```js
let key = 'A_DYNAMIC_KEY';

let obj = {
  [key]: 'A_VALUE',
};

console.log(obj) // Result: { A_DYNAMIC_KEY: 'A_VALUE' }
```

## 6. Những cách hay để `console.log()`
### 6.1. Sử dụng `console.table()` khi bạn có một mảng *object*.
```js
const foo = { name: 'Suibin', age: 30, coder: true  };
const bar = { name: 'Borja',  age: 40, coder: true  };
const baz = { name: 'Paul',   age: 50, coder: false };

console.table([foo, bar, baz]);
```
**=> Kết quả:**

![](https://miro.medium.com/max/700/1*sqlvEf007bOuAJCpPfqTwA.png)

### 6.2. Làm kết quả in ra màn hình nổi bật hơn bằng CSS và dấu `%`
```js
console.log('%cStyled log', 'color: orange; font-weight: bold;');
console.log('Normal log');
```
**=> Kết quả:**


![](https://miro.medium.com/max/196/1*PgMRs3hpA3oN6EyaVHqtfA.png)
### 6.3. Log nhiều object cùng lúc để tiết kiệm không gian và cũng để dễ đọc hơn.
```js
const foo = { name: 'Suibin', age: 30, coder: true  };
const bar = { name: 'Borja',  age: 40, coder: true  };
const baz = { name: 'Paul',   age: 50, coder: false };

console.log({ foo, bar, baz });
```
**=> Kết quả:**

![](https://miro.medium.com/max/700/1*xW1zYZjYmOdfH8wx32m5Jw.png)
## 7. *Object destructuring*

Loại bỏ code bị lặp bằng cách *destructuring* thuộc tính của *object* mà bạn cần.

```js
const dog = {
  name:   'Nala',
  gender: 'female',
  age:    10
};
```
*Destructure* bên trong cú pháp hàm bằng cách bọc tên thuộc tính trong dấu ngoặc nhọn `{}`

```js
const func = ({ name, age }) => {
  return `${name} is ${age} years old.`;
};

console.log(func(dog)); // Result: Nala is 10 years old.
```
Hoặc là truyền vào một *object* và khai báo tên biến trùng với tên thuộc tính của *object* đó. Cách này sẽ tốt hơn nếu có nhiều *destructure object*  trong hàm.

```js
const func = (animal) => {
  const { name, age } = animal;
  return `${name} is ${age} years old.`;
};

console.log(func(dog)); // Result: Nala is 10 years old.
```

## 8. Sử dụng `reduce()`, `map()` và `filter()` thay vì những vòng lặp thông thường.
### 8.1. Sử dụng `reduce()` để tính toán giá trị của mảng.
```js
let orders = [1, 2, 3, 4, 5];

const total = orders.reduce((acc, cur) => acc + cur);

console.log(total); // Result: 15
```

### 8.2. Sử dụng `map()` để tạo mảng mới, cùng với đó là gọi một *function* cho mỗi phần tử.
```js
let orders = [1, 2, 3, 4, 5];

const total = orders.map((item) => item * 2);

console.log(total); // Result: [2, 4, 6, 8, 10]
```

### 8.3. Sử dụng `filter()` để *filter* mảng với một *function*.
```js
let orders = [1, 2, 3, 4, 5];

const total = orders.filter((item) => item > 3);

console.log(total); // Result: [4, 5]
```

## Nguồn tham khảo
- [9 JavaScript Tricks To Code Like A Pro!](https://medium.com/swlh/9-javascript-tricks-to-code-like-a-pro-d09ea534235)