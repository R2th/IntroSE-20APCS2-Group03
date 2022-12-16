Arrow Functions - một tính năng mới được giới thiệu trong ES6 - cho phép viết các hàm súc tích trong JavaScript. Mặc dù cả Regular Functions và Arrow Functions hoạt động theo cách giống nhau, nhưng có một số khác biệt thú vị nhất định giữa chúng.
Cùng khám phá nó ở dưới đây.
### Syntax

Syntax của  một fuction bình thuờng:

```javascript
let x = function function_name(parameters){ 
   // body of the function 
}; 
```
Ví dụ:

```javascript
let square = function(x){ 
  return (x*x); 
}; 
console.log(square(9)); 
```
Kết quả:
![](https://images.viblo.asia/40c9ef7e-70e8-4a6b-94c7-db55b02fc62b.png)

Syntax của arrow functions:-
```javascript
let x = (parameters) => { 
    // body of the function 
}; 
```
Ví dụ:

```javascript
var square = (x) => { 
    return (x*x); 
}; 
console.log(square(9)); 
```
Kết quả:
![](https://images.viblo.asia/40c9ef7e-70e8-4a6b-94c7-db55b02fc62b.png)


### Từ khóa this
Không giống như function bình thuờng, arrow functions sẽ không có this của nó. Hãy xem qua các ví dụ bên dưới để hiểu hơn.

Ví dụ:
```javascript
let user = { 
    name: "GFG", 
    gfg1:() => { 
        console.log(this.name)
        console.log("hello " + this.name); // no 'this' binding here 
    }, 
    gfg2(){        
        console.log("Welcome to " + this.name); // 'this' binding works here 
    }   
 }; 
user.gfg1(); 
user.gfg2(); 
```
Kết quả:
![](https://images.viblo.asia/2fc370b4-f82f-4887-9500-883f744eea4a.png)

Chúng ta hãy cùng nhìn lại một chút.
Ở đây gfg1được khai báo là một array fucntion nên cái this của nó không nằm ở user nữa mà nó là một cái gì đó ở ngoài user, có thể là window, document...
Ngược lại thì gfg2 là một regular function nên this.name, nó sẽ hiểu là user.name, nên nó sẽ lấy giá trị của user.name

Để làm rõ hơn một chút, chúng ta sẽ sửa code thành thế này:
```javascript
name = "Foo Bar"
let user = { 
    name: "GFG", 
    gfg1:() => { 
        console.log("hello " + this.name); // no 'this' binding here 
    }, 
    gfg2(){        
        console.log("Welcome to " + this.name); // 'this' binding works here 
    }   
 }; 
user.gfg1(); 
user.gfg2(); 
```
Chúng ta sẽ được kết quả như thế này:

![](https://images.viblo.asia/dee01e7a-db5c-401d-b09c-e6bb00e8041b.png)

### Availability of arguments objects

Chúng ta không thể sử dụng arguments trong arrow function, nhưng ở regular functions thì chúng ta có thể sử dụng được.
Arguments objects là gì thì các bạn hãy xem lại [ở đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments).

Ví dụ sử dụng regular functions:

```javascript
let user = {       
    show(){ 
        console.log(arguments); 
    } 
}; 
user.show(1, 2, 3); 
```
Kết quả:
![](https://images.viblo.asia/0d12db8a-e8d9-4348-9081-ef5ee31286e3.png)

Sử dụng arrow function:

```javascript
let user = {      
        show_ar : () => { 
        console.log(...arguments); 
    } 
}; 
user.show_ar(1, 2, 3); 
```
Kết quả:

![](https://images.viblo.asia/36a77d35-75de-49c5-8b76-a3aa975553f4.png)

### Sử dụng từ khóa new

Regular functions created using function declarations or expressions are ‘constructible’ and ‘callable’. Since regular functions are constructible, they can be called using the ‘new’ keyword. However, the arrow functions are only ‘callable’ and not constructible. Thus, we will get a run-time error on trying to construct a non-constructible arrow functions using the new keyword.

Regular functions được tạo bằng cách sử dụng khai báo hàm hoặc biểu thức là *constructible* và *callable*. Vì regular function có thể constructible, chúng có thể được gọi bằng cách sử dụng từ khóa **new**. Tuy nhiên, arrow function thì  chỉ là *callable* và không *constructible*. Do đó, chúng ta sẽ gặp lỗi khi cố gắng gọi arrow function bằng từ khóa **new**.

Ví dụ sử dụng Regular Function:

```javascript
let x = function(){ 
    console.log(arguments); 
}; 
new x(1,2,3); 
```
Kết quả:
![](https://images.viblo.asia/0f56dcb6-1622-452c-a8ee-f2cf3397e7e5.png)

Sử dụng Arrow Function:

```javascript
let x = ()=> { 
    console.log(arguments); 
}; 
new x(1,2,3); 
```
Kết quả:
![](https://images.viblo.asia/0d745bea-17ad-4352-b42d-1e614fd0484d.png)

Trên đây là một số khác biệt giữa Regular Function và Arrow Function trong ES6. Cám ơn các bạn đã đọc bài viết.
Hẹn gặp mọi người ở bài viết sau.
Happy hacking!!!