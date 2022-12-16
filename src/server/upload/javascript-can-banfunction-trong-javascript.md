**Bài viết note kiến thức lập trình Javascript căn bản**

### 1. Global scope vs function scope

```js
let myName = "longnguyen.dh"; //global scope

function hello()
{
    let myName2 = 'longdhn.lk'; //function scope
    console.log(myName);
}

console.log(myName2); //error
```

- Function scope chỉ truy xuất bên trong function, ra ngoài sẽ báo lỗi.
- Global scope truy xuất cả trong và ngoài function.

### 2. Closure

- Lexical scope sẽ định nghĩ scope của biến đó bởi vị trí của biến trong vị trí của chúng ta.

```js
let newName = 'Long Nguyen'; //global scope

function sayHello(){
    let message = 'Hi'; //block scope
    console.log(`${message} ${newName}`);
}

sayHello();
```

- Closure là nhiều function được lồng vào nhau. Cho phép chúng ta truy xuất funciton bên trong ra function bên ngoài. Closure được tạo khi mỗi khi function được tạo.

```js
function sayHello2(){ //parent function
    let message = 'Hi';
    function sayHi(){ //child function
        console.log(message);
    }
    
    return sayHi;
}

let hello = sayHello2();
hello();
```

Giải thích: function sayHi bên trong có quyền truy xuất biến message của function sayHello2 bên ngoài.

- Function con có thể truy xuất scope của function cha.

```js
function sayHello3(message){
    return funciton hiYourName(name){
        console.log(`${message} ${name}`);
    };
}

let hello = sayHello3('Welcome to javascript');
hello('function');
//Welcome to javascript function
```

```js
function anotherFunction(){
    let anotherMessage = 'hello';
    
        function sayHi(){ //child function
        console.log(anotherMessage);
    }
    
    return sayHi;
}

let callFunc = anotherFunction();
```

### 3. Arrow function
- Arrow function cũng là function là kiểu function ẩn danh - anonymous function - function không có tên. Ra đời từ 2015 ECMAScript.

```js
const square = function(x){
    return x * x;
}

square(5); //25
```

- Arrow function ngắn gọn hơn
```js
const square = (x) => {
    return x * x;
}
square(5); //25
```

- Rút gọn khi return đơn giản
```js
const square = (x) => x * x;
square(5); //25
```


**Nguồn:**

https://www.youtube.com/channel/UC8vjHOEYlnVTqAgE6CFDm_Q
https://kt.city/course/tu-hoc-javascript-hieu-qua-va-de-dang-danh-cho-nguoi-moi