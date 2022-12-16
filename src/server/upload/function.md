**Function** là một khái niệm quan trọng trong nhiều ngôn ngữ lập trình bậc cao. Theo định nghĩa từ toán học thì **function** là những **expression, rules,laws** được sử dụng để định nghĩa những **relation** giữa nhiều **dependant variables** (biến độc lập). Nói một cách khó hiểu hơn, là một **mapping** (ánh xạ) từ một giá trị ở _miền giá trị_ này sang một giá trị khác ở _miền giá trị_ khác.   

![Định nghĩa về function theo toán học](https://sonlhcsuit.github.io/p/function/function-algebra_hu311918eba7412b1275f9d8949c4bb2a8_8626_1024x0_resize_box_2.png)

Khi làm việc với các ngôn ngữ lập trình thì chúng ta lại sử dụng hàm khác đi một chút. **Function** là một "cỗ máy" nhận vào những **input** và đưa ra cho chúng ta **output**. Khi viết một hàm, chúng ta đang thiết kế cách mà "cỗ máy" hoạt động, cách chuyển đổi từ **input** sang **output**, chúng ta có thể sử dụng bản thiết kế này chúng ở mọi nơi bằng cách **invoke,call** (gọi hàm - sẽ có sự khác biệt phía bên dưới).

![Định nghĩa về function nhưng bớt khó hiểu hơn](https://sonlhcsuit.github.io/p/function/function-machine_huc25f250195a519fdfdea4f9a43f2fd11_14605_1024x0_resize_box_2.png)

# Create function


Có một vài điều cần lưu ý khi sử dụng **function** như sau:
    - Phải khai báo **function** trước khi sử dụng
    - **function** không chạy tại thời điểm được khai báo mà chỉ chạy khi được invoke/call
Ngoại trừ những điều trên thì còn một vài thứ linh tinh nữa. Trong Javascript thì chúng ta có thể khai báo **function** bằng 2 cách - sử dụng **function definition** hoặc **function expression**. Javascript xem **function** như là một đối tượng, nên **function** có thể là **output** của một function khác.

```javascript
// Sử dụng function definition với từ khoá function
function functionName(parameters_comes_here){
    // function_body here
    // remember to return something
}
// Sử dụng function expression
// const / let/ var đều có thể
const myFunctionName = (parameters_comes_here)=>{
    // function_body here
    // remember to return something
}
```

# Parameter / Argument

Khi khai báo hàm thì ta cần phải chú ý **function name** (quy tắc đặt tên giống tên biến) và **function parameter**. **Parameter** nghĩa là tham số đầu vào - một cách gọi khác của **input**. **Parameter** là biến dùng để lưu giá trị nhận được khi **function** được invoke/call. **Function** sẽ yêu cầu một số lượng nhất định các **parameter** khi khai báo, đồng thời cũng phải đúng số lượng các **argument** truyền vào khi hàm được **invoke/call** và đúng thứ tự được khai báo . Tuy nhiên Javascript không bắt buộc điều này, số lượng các **parameter** và **argument** có thể khác nhau. Điều này dẫn tới một số vấn nhỏ.   
Đối với việc số lượng các **parameter** và **argument** bằng nhau.
```javascript
// Khai báo hàm cube với 3 parameter là a, b, c
function cube(a,b,c){
    return a**3 + b**3 + c**3
}

// Invoke/call hàm cube với 3 argument tương ứng là 2, 3, 4
let result = cube(2,3,4) 
console.log(result)
// 99
```
Đối với việc số lượng các **parameter** và **argument** không bằng nhau.
```javascript
// Khai báo hàm cube với 3 parameter là a, b, c
function cube(a,b,c){
    return a**3 + b**3 + c**3
}

// Invoke/call hàm cube với 2 argument tương ứng là 2, 3
let result = cube(2,3) 
console.log(result)
// NaN
// Lý do bởi vì giá trị của c không được truyền vào => các biến 
// có giá trị mặc định là undefined nếu không có quá trình initialization

// Invoke/call hàm cube với 5 argument tương ứng là 2, 3, 4, 5, 6
let result = cube(2,3,4,5,6) 
console.log(result)
// 99
// Thiếu mất giá trị 5, 6. Như vậy liệu rằng hàm
// của chúng có đang ở dạng tổng quát (general)?
```
Thông qua 2 ví dụ trên về sự khác biệt số lượng **parameter/argument**, ta có thể có vài rắc rối cần phải giải quyết. Một trong cách giải quyết đơn giản nhất là sử dụng duy nhất 1 **parameter** với kiểu dữ liệu là **array**. Ngoại trừ cách đó thì chúng ta còn có thể sử dụng **reserved word** là **arguments** - giúp chúng ta biến tất cả các **arguments** thành đối tượng array-like (gần như mảng nhưng không phải mảng).

```javascript
// Sử dụng mảng
function cube(arrayOfNumbers){
    let n = arrayOfNumbers.length;
    let sum = 0;
    for(let i = 0;i < n ; i++ ){
        sum+= arrayOfNumbers[i]
    }
    return n
}
// sử dụng hàm
let result = cube([2,3,4])
console.log(result)
```

```javascript
// Sử dụng từ khoá arguments. Khi sử dụng từ khoá thì chúng 
// ta có thể không khai báo parameter. Nếu khai báo thì cũng 
// vẫn có thể sử dụng như một biến
function cube(a,b,c){
    let n = arguments.length;
    // tuy nhiên chúng ta vẫn có thể truy cập tới arguments[0]
    // arguments[1], arguments[2] bằng a, b, c theo thứ tự

    let sum = 0;
    for(let i = 0;i < n ; i++ ){
        sum+= arguments[i]
    }
    return n
}
let result = cube(2,3,4,5,6,7,8,9,10)
console.log(result)
```

# Lexical Environment / Execution Context / Execution Stack

Khi khai báo **function** ta sử dụng cú pháp **{}** để tạo **scope** dánh cho **function body**. **Scope** này còn có tên là **Lexical Environment** (**Lexical**).Khi khai báo identifiers thi identifier sẽ bind với lexical/scope đó (mặc định). Khi một hàm  call/invoke (scope thường sẽ được gọi) **Lexical** thường chứa thông tin về về các **identifier** , đồng thời cũng chứa thông tin về **parent lexical** khi tìm kiếm **identifier** không tồn tại trong **lexical** hiện tại. Khi một hàm được **invoke/call** thì ngay lập tức Javascrit engine tạo ra một **execution context** và một **lexical** cho việc lưu trữ các biến (giả sử nếu cùng tên trong hàm). **Execution context** đặt chúng lên đầu của **execution stack**, đồng thời lưu vào **lexical** vị trí của **statement pointer** hiện tại, đồng thời cập nhật giá trị **statement pointer** thành nơi bắt đầu hàm vừa được **invoke/call**. **Execution context** lớn nhất là **global**.

Javascript engine sẽ thực hiện lần lượt từ trên xuống dưới (top to bottom of stack). Khi **function** hoàn thành, **execution context** của **function** đó sẽ được **pop** ra khỏi **execution context**,và **statement pointer** sẽ quay về vị trí đã gọi **function** vừa hoàn thành, tiếp tục công việc thực thi từng dùng. **Execution stack** đảm bảo được rằng các được gọi sau (trong các hàm bất kỳ) hoàn thành trước để đảm bảo tính đúng đắn của chương trình. 

Quy tắc tìm kiếm các **identifier** dọc theo mối quan hệ cha - con của **lexical** được gọi là **scope chain**. Một điều cần chú ý đối với function là, execution context mặc định nó sẽ được bind với scope được khai báo. Tức là outer scope (outer execution context) của function khi call/invoke là nơi khai báo (chứ không phải là nơi call/invoke).

```js
function A(){
    let v = 'from A'
    console.log(v)
}
function B(){
    let v = 'from B'
    A()
}
let v = 'from Global'
B()
// from A
// Xoá đi dòng thứ 2 thì kết quả là 
// from Global
```
Xem xét ví dụ sau thì kết quả đơn giản là `from A`. Tuy nhiên nếu xoá đi dòng `let v = 'from A'` thì kết quả lại là `from Global`. Lý do bởi vì A được khai báo ở `global` chứ không phải là `B`. Mặc dù được gọi ở lexical `B` nhưng `A` lại không thể tìm kiếm các identifiers ở lexical `B`. Vậy có cách nào để `bind` lexical ở nơi nó được gọi hay không? Theo mình biết thì hiện tại là `chưa` ngoại trừ việc bạn viết lại một runtime engine theo ý muốn.

# Hoisting

**Hoisting** (Xem thêm ở [Variable](/p/variable)), tuy nhiên có một điều bổ sung nữa là. Giai đoạn **hoisting** chỉ xảy ra khi một **execution context** được tạo ra, và việc khai báo đè cũng chỉ ảnh hưởng trong **execution context** đó. 
```javascript
function f(){
    let h = 12;
    let a = 22
    function g(){
        // Hoisting function => bị ghi đè
        console.log(h)
        // let h = 10

        function h(a){
            console.log(a)
            // debugger;
            console.log('From h w/love')
        }
       
        h()
        console.log('From g w/love')
    }
    console.log(h)
    g()
    console.log(h)
    console.log('From f w/love')

}
f()
```
Một vài sự chú ý nhỏ đây là trong **lexical** của hàm **f** thì **identifier** **h** đã được khai báo bằng từ khoá `let`, vậy tại sao khi in **h** ra console lại bị thay đổi? Khi sử dụng từ khoá **function** thì **hoisting** xảy ra, thay thế **identifier** **h** của hàm **f**, thay thế bằng **h** của hàm **g**. Vì **lexical** hiện tại là hàm **g** Javascript engine sẽ chọn **identifier** ở gần **lexical** hiện tại nhất (là **idetitier** **h** của hàm **g** chứ không phải **f**).

Ngoài ra thì ở dòng đầu tiên của hàm **h**, kết quả chúng ta nhận được **undefined** chứ không phải **12**. Lí do là các **parameter** cũng được khai báo bằng từ khoá **var** giống như biến (tức là cũng xảy ra **hoisting**). Sau đó mới được gán giá trị được truyền vào lúc được **invoke/call**. Vậy nên giá trị của **a** là **undefined** (vì mới được khởi tạo) và đồng thơi cũng được copy từ **argument** sang - tuy nhiên hàm h lại gọi với không có **argument** nào nên các **parameter** vẫn giữ giá trị là undefined.

# Callback / Higher Order Function / Closure

Trong Javascrip, function được xem là một Object (một kiểu dữ liệu).Điều này đồng nghĩa với ta có thể truyền một function như là argument khi invoke/call một function khác, hay nó cũng có thể là một gì đó được trả về như là kết quả của việc invoke/call một function.

Những function được truyền như argument khi invoke/call một function khác thì có tên là callback. Những function không thể được truyền như callback thì được gọi là first-class function hay là higher order function. 

Closure là khả năng ghi nhớ, kết hợp **lexical** giữa các hàm được trả về/ callback / listener. Thay vì tìm kiếm identifier ở global lexical thì function y sẽ tìm kiếm ở lexical mà được khai báo trước (tức là lexical của function x) rồi mới tới **lexical** hiện tại (nơi mà function được invoke/call)
```javascript
function x(){
    let y = 'hihihi'
    let u = 'huhuhu'
    function z(){
        console.log(y)
        console.log(u)
    }
    return z
}
let u = '?'
let y = x()
y()
console.log(u)
// hihih
```
Ngoài ra, có một ví dụ cổ điển việc closure/lexical ở MDN, mình trích dẫn nó ở đây. Hãy tự suy nghĩ xem cách giải quyết và lý giải rằng lại sao nó lại như thế nhé (cần biết về lexical/scope chain/ closure)

```html
<p id="help">Helpful notes will appear here</p>
<p>E-mail: <input type="text" id="email" name="email"></p>
<p>Name: <input type="text" id="name" name="name"></p>
<p>Age: <input type="text" id="age" name="age"></p>
```
```js
function showHelp(help) {
  document.getElementById('help').textContent = help;
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function() {
      showHelp(item.help);
    }
  }
}

setupHelp();
```
# Call / Invoke

Invoke là việc gọi trực tiếp một hàm bằng việc dùng tên `f()`. Call là sử dụng HOF để invoke hàm đó bằng cách gián tiếp 
```js
function g(callback){
    console.log('From g w/love')
    cb()
}
function h(){
    console.log('From h w/love')

}
g(h)
// invoke g, but g call h instead us
```

---
# References & more resources
* https://www.britannica.com/science/function-mathematics
* https://stackoverflow.com/questions/50884893/calling-vs-invoking-a-function
* https://www.w3schools.com/js/js_function_definition.asp
* https://stackoverflow.com/questions/12599965/lexical-environment-and-function-scope
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

### P/S:
Có thể tuỳ thuộc vào các engine có một cách thực thi Javascript khác nhau nên có gì sai sót xin email cho mình để mình cập nhật. Xin cảm ơn!