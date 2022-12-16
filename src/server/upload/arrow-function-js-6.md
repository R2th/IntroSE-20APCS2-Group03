1. Function trong JS
Từ ES6 trở về trước, function có thể định nghĩa theo các cách sau:
```
function HelloWorld(){ console.log('Hello World');}
HelloWorld(); //'Hello World'
```
Hoặc có thể định nghĩa bằng `non-method functions` sử dụng keywork `function`:

`let sayHello = function() { console.log('Hello World'); }`

Hoặc có thể định nghĩa bằng Function constructor:
```
let sayHello = new Function(`console.log('Hello World');`);
sayHello();
```
Function là global-scoped object, việc sử dụng cách này để đỉnh nghĩa function không được recommend do vấn đề `performance`. Mỗi lần eval hoặc Function constructor, script engine mã nguồn thành mã thực thi.

2. Arrow function
Arrow function là 1 feature của CoffeeScript, giúp việc định nghĩa function trở nên ngắn gọn hơn.

```
//Several parameters
(param1, param2, ..., paramN) => { //statements }
//No parameter
() => { //statements }
```
Ví du:
`let helloWorld = () => { console.log(‘Hello World’) }`

() và => phải viết cungf trên 1 hàng


```
let sumUp = (a, b) => a + b //OK
let sumUp = (a, b)
=> a + b                    //NOT OK
let sumUp = (a, b) =>
a + b                       //OK
```

Nều funtion không chỉ có 1 dòng code, chúng ta có thể bỏ `{}`

`let HelloWorld = () => console.log('Hello World')`

Nếu function chỉ có return statement:

let helloWorld = () => "Hello World";


Trả về các object literals cần phải được bọc trong ngoặc đơn để biểu thị object trả về như là funcition body expression, không phải là block code.

```
let getObject = () => { greet: function(){ console.log('hi') }}
getObject() //SyntaxError: Unexpected token '('
let getObject2 = () =>({ greet: function(){ console.log('hi') }})
getObject2().greet() //hi
```

Với function chỉ có 1 parameter, chúng ta có thẻ bỏ `()`

let hello = name => console.log(`Hello ${name}`)

Gọi thông qua call hoặc apply:
Vì `this` không bị ràng buộc bên trong hàm rút gọn, các phương thức call() hoặc apply() chỉ có thể truyền tham số. this bị bỏ qua.

```
var adder = {
  base: 1,
    
  add: function(a) {
    var f = v => v + this.base;
    return f(a);
  },

  addCall: function(a) {
    var f = v => v + this.base;
    var b = {
      base: 2
    };
            
    return f.call(b, a);
  }
};

console.log(adder.add(1));         // Sẽ trả ra 2
console.log(adder.addCall(1)); // Vẫn sẽ trả ra 2
```

Promises and Callbacks:
Code sử dụng asynchronous callbacks or promises thường chưa nhiều function và return keyword. Khi sử dụng promises, các biêủ thức hàm này sẽ được sử dụng chaining:
```
// ES5
aAsync().then(function() {
  returnbAsync();
}).then(function() {
  returncAsync();
}).done(function() {
  finish();
});
```

`aAsync().then(() => bAsync()).then(() => cAsync()).done(() => finish);`