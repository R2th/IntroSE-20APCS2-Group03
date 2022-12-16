<div align="center">
    
### Hiểu về function context ###   
</div>
<br>

Trước khi tìm hiểu về `Call` , `Bind`, `Apply`, chúng ta hãy xem lại một số cách khác nhau để tạo ra một **function**, và nó ảnh hưởng như thế nào đến giá trị của **this**.<br>
```javascript
function sayHello() {
    console.log('Hello');
    console.log(this);
}

sayHello() // Hello
           // Window {...}
```
Bạn có thể chạy đoạn code trên trong console của trình duyệt. Như chúng ta đã biết, các function trong JavaScript, trong khi thực thi, sẽ có tham chiếu đến **context** hiện tại của nó, chính là **this**. Vậy, giá trị của **this** ở đây là gì? Đúng như dự đoán, **this** sẽ có giá trị là `window object`.
<br>


-----


Hãy xem một ví dụ khác:
```javascript
let greeting = {};
greeting.sayHello = function() {
    console.log('Hello');
    console.log(this);
}

greeting.sayHello() // Hello
                    // {sayHello: f}
```
Ở đây, đầu tiên chúng ta tạo biến `greeting` gán nó bằng 1 object rỗng. Sau đó, khai báo một property `sayHello` là một function, function này cũng tương tự như ở ví dụ trước.<br>
Bây giờ giá trị của this sẽ không phải là `window object` như ví dụ trước, bởi vì **context** khi thực thi của function này đã thay đổi. Giá trị của this sẽ là giá trị của object tham chiếu bởi biến greeting: `{sayHello: f}`


-----
Tiếp tục một ví dụ khác:
```javascript
function sayHello() {
    console.log('Hello');
    console.log(this);
}

let greeting = new sayHello() // Hello
                              // sayHello {}
```
Ở ví dụ này, chúng ta dùng từ khóa `new` với function sayHello(), cái này còn được gọi là constructor function. Giá trị của **this** bây giờ, sẽ là 1 object rỗng.

----



<div align="center">
    
### Call() ###   
</div>
<br>

Sau khi đã review qua về **this**, hãy cùng bước vào tìm hiểu method **Call**.<br>
```javascript
let person1 = {name: "Nguyen Van A", age: 20};
let person2 = {name: "Nguyen Van B", age: 21};

let sayHello = function() {
    console.log("Hello, " + this.name);
}

sayHello.call(person1); // Hello, Nguyen Van A
sayHello.call(person2); // Hello, Nguyen Van B
```
Ở ví dụ này, chúng ta tạo 2 object `person1` và `person2` với property `name`, `age`. Tiếp theo khai báo function sayHello, function này sẽ log ra console "Hello", theo sau là giá trị của `this.name`. <br><br>
Bây giờ nếu gọi luôn function `sayHello`, thì chúng ta sẽ được cái này: "Hello, ", bởi vì lúc này this sẽ refers tới `window object`, và `window object` này không có property là `name`. <br><br>
Điều chúng ta muốn ở đây, là set lại giá trị của **this** thành một cái khác với context thực thi hiện tại. Mọi object trong JavaScript đều có một số property để làm việc này, ví dụ như **Call**. Hàm **Call** này nhận vào 1 tham số là một object, bạn có thể thấy ở trong đoạn code bên trên.<br><br>
Truyền `person1` vào tham số khi gọi method **Call** cho `sayHello` sẽ bind giá trị của this trong sayHello thành vào `person1`, bây giờ kết quả nhận được sẽ là "Hello, Nguyen Van A"<br><br>

**Note**: Nếu bạn gọi Call, mà không truyền vào object: `sayHello.call()`, thì kết quả sẽ giống như gọi `sayHello()`

-----
Ngoài ra, bạn cũng có thể truyền thêm các tham số khác vào **Call**, ví dụ:
```javascript
let person1 = {name: "Nguyen Van A", age: 20};

let sayHello = function(message) {
    console.log(message + ", " + this.name);
}

sayHello.call(person1, "Hello"); // Hello, Nguyen Van A
```
Chúng ta khai báo hàm `sayHello` nhận vào 1 tham số là `message`, sau đó gọi method **Call** cho `sayHello` với tham số đầu tiên là `person1`, tham số thứ 2 là message.

---

<div align="center">
    
### Apply() ###   
</div>
<br>

Giống như `Call`, mọi function object trong JavaScript đều có method **Apply**.
Tương tự như ví dụ ở `Call`, bạn có thể thay thế `call` thành `apply`, kết quả nhận được cũng giống hệt. Vậy **Apply** có gì khác với `Call` ? Đó là:<br>
*  `Call` có thể nhận 1 list các tham số phía sau.
*  `Apply` chỉ nhận 1 tham số là 1 mảng.


Ví dụ:
```javascript
let introduction = function(name, profession) {
    console.log("My name is " + name + " and I am a " + profession);
    console.log(this);
}

introduction("Nguyen Van C", "student"); // My name is Nguyen Van C and I am a student
                                         // Window {...}
introduction.call(undefined, "Nguyen Van C", "student"); // My name is Nguyen Van C and I am a student
                                                         // Window {...}

introduction.apply(undefined, ["Nguyen Van C", "student"]); // My name is Nguyen Van C and I am a student
                                                            // Window {...}
```
Ví dụ này đầu tiên gọi hàm `introduction` với 2 tham số như trên, sau đó tiếp tục thử dùng apply và call cho `introduction`.


-----

Làm thế nào để quyết định khi nào dùng `Call`, khi nào dùng `Apply`?


| Call | Apply |
| -------- | -------- |
| Dùng khi input có nhiều, và không liên quan đến nhau / bao gồm nhiều kiểu biến    | Dùng khi input đã có dạng array với các giá trị, kiểu biến giống nhau|



-----
<div align="center">
    
### Bind() ###   
</div>
<br>

Với `Call` và `Apply`, chúng ta gọi một function đã có, và thay đổi context của nó. Nếu chúng ta muốn tạo ra copy của một function, rồi mới thay đổi context của nó, **Bind** cho phép chúng ta làm điều đó.<br><br>?
Ví dụ: 
```javascript
let person1 = {
    name: "Nguyen Van A",
    getName: function() {
        return this.name;
    }
}

let person2 = {name: "Nguyen Van B"}
let getNameCopy = person1.getName.bind(person2);
console.log(getNameCopy()) // "Nguyen Van B"
```

Đầu tiên chúng ta tạo object `person1` có property `name`, `getName` và `person2` có property `name` như trên.<br><br>
Khi gọi **bind** cho `person1.getName` và truyền `person2` vào với vai trò là tham số, thì một function **mới** sẽ được tạo ra và được gán cho biến `getNameCopy`, giá trị của this trong function này là `person2`.<br><br>
Ở đây, chúng ta không thay đổi **context** của function đã có từ trước như `call`, `apply`, thay vào đó sẽ tạo ra **copy** của function đó, rồi mới thay đổi **context**.



-----
<br><br>

**Tham khảo:**  https://developer.mozilla.org/