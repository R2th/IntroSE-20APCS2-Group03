Ở bài trước mình đã giới thiệu các bạn những khái niệm cơ bản cuả CoffeeScript. Trong bài viết này mình sẽ đi sâu vào nhiều khía cạnh của việc sử dụng CoffeeScript.

Đầu tiên các bạn nên chú ý: CoffeeScript sử dụng khoảng trắng để phân biệt giưã các blocks. Vì thế bạn không cần sử dụng `;` để kết thúc dòng, các biểu thức. Thay vì sử dụng dấu `{}` để ngăn cách các block trong các hàm if-else, switch, try/catch chỉ cần dùng indent.

Cũng tương tự bạn không cần sử dụng dấu `()` để gọi hàm cần truyền đối số:
```
console.log sys.inspect object → console.log(sys.inspect(object));
```
## Data Types
Khi CoffeeScript biên dịch từng dòng sang JavaScript nên các kiểu dữ liệu được cung cấp bởi CoffeeScript đều giống với JavaScript.

|types|||
|--|--|--|
| string | Kiểu dữ liệu chuỗi đại diện cho một nhóm kí tự và dược đặt trong `" "` | vd: "text" |
| Number || 12, 123  |
| boolean || true, false |
| arrays | | a = [1, 2, 3, 4] |
| objects | | a = {name: "Demo", age: "23"}|
| null | |null |
| undefined | | undefined |
## Variables
Trong JavaScript trước khi sử dụng variable chúng ta cần khai báo và khởi tạo nó (gán giá trị). Không giống với JavaScript, khi tạo 1 variable trong CoffeeScript không cần khao báo nó bằng từ khoá `var`. Chúng ta chỉ cần tạo một biến chỉ bằng cách gán một giá trị cho 1 chữ:

```
name = "Variable"
number  = 123

// javascript

(function() {
  var age, name;
  name = "Javed";
  age = 25;
  
}).call(this);
```
**Scope:**

Phạm vi cuả một biến là miền cuả chương trình mà nó được định nghĩa. Biến JavaScript và CoffeeScript chỉ có 2 phạm vi:
* Global variables:  Biến toàn cầu có phạm vi toàn cầu, có nghĩa là nó có thể sử dụng ở bất kỳ nơi nào trong mã JavaScripts của bạn.
* Local variables: Biến cục bộ sẽ chỉ hiển thị trong một hàm mà nó được định nghĩa. Các tham số hàm luôn luôn cục bộ cho hàm đó.

Trong JavaScript bất kể khi nào chúng ta định nghĩa một biến mà không sử dụng từ khoá var, nó sẽ được tạo ra với phạm vi toàn cục. Điều này sẽ gây ra nhiều vấn đề:
```
<script type = "text/javascript">
   var i = 10;
   document.write("The value of global variable i is "+ i);   
   document.write("<br>");
   test();
   function test() {
      i = 20;
      document.write("The value of local variable i is "+i);
      document.write("<br>");
   }
   document.write("The value of global variable i is "+i);
</script>
```
Kết quả:

```
The value of global variable i is 10

The value of local variable i is 20

The value of global variable i is 20
```
Ở ví dụ trên, chúng ta đã tạo 1 biến i trong phạm vi toàn cầu, và được gán = 10 và trong function tạo một biến trùng tên i, chúng ta cũng khởi tạo i = 20 không sử dụng var. Từ đây giá trị của biến toàn cầu i đã bị thay đổi thành 20 => Điều này khiến logic của chương trình bị sai. Vì lý do này bạn nên khai báo các biến bằng cách sử dụng từ khóa var.

**Scope Variable**

Bất cứ khi nào chúng ta biên dịch một file CoffeeScript, trình biên dịch CoffeeScript tạo 1 hàm ẩn danh và trong hàm đó nó biên dịch mã CoffeeScript thành JavaScript theo từng dòng. Do đó mỗi biến chúng ta tạo ra trong CoffeeScript sẽ được sử dụng từ khoá var trong hàm ẩn danh đó khai báo, do đó mọi biến trong CoffeeScript đều là cục bộ.

Các quy tắc đặt tên biến trong CoffeeScript:
* Không nên sử dụng các từ khóa dành riêng cho CoffeeScript làm tên biến. vd: Boolean, ..
* Tên biến không được bắt đầu bằng số. Nó phải bắt đầu bằng ký tự chữ hoặc dấu `_`, vd: _123, name, ...
* Tên biến phân biệt chữ hoa và chứ thường. vd: Name và name là hai biến khác nhau.

## Operators

1. Toán tử so sánh

| | |
|--|---|
|equal| == |
|not equal| != |
|greater than| > |
| less than | < |
| greater than or equal to | >= |
| less then or equal to |  <= |
| equal (aliases) | == |
| not equal (aliases) | !== |

2. Logical operarors

| | |
|--|--|
| and |  && |
| or |` ||` |
| not x | not X |

3. CofeeScript Aliases

| name | operator | aliases |
|--|--|--|
| equals to |	==	| is |
| not equals to | !==	| isnt |
| not |	!	| not |
| and | && |	and |
| "or" operator |	`||` |	or |
| boolean value true |	true |	true, yes, on
| boolean value false |	false |	off, no |
| current object |	this |	@ |
| new line (or) semi colon	 | \n or ;	| then |
| Inverse of if |	! if |	unless |
| To test for array presence |		| in |
| To test for object presence |		| of |
| Exponentiation |		| a**b |
| Integer division |		| a//b |
| dividend dependent modulo	|	| a%%b |

## Conditionals
JavaScript hỗ trợ câu lệnh if và switch. Ngoài các điều kiện có sẵn trong JavaScript, CoffeeScript còn có thêm câu lệnh unless (phủ định của if)

| STT | câu lệnh hỗ trợ trong CoffeeScript |  từ khóa trong Coffee CoffeScript | 
|--|--|--|
| 1 | if statemant | if-then statement |
| 2 | if..else statemant | if-then...else statement |
| 3 | unless statement | unless-then statement | 
| 4 | unless...else statement |  unless...then else statement |
| 5 |  switch statement |  switch statement | 

ví dụ: 

```
mood = greatlyImproved if singing

if happy and knowsIt
  clapsHands()
  chaChaCha()
else
  showIt()

date = if friday then sue else jill


// JavaScript

var date, mood;

if (singing) {
  mood = greatlyImproved;
}

if (happy && knowsIt) {
  clapsHands();
  chaChaCha();
} else {
  showIt();
}

date = friday ? sue : jill;
```

##   Functions
Functions là một khối mã có thể tái sử dụng, và gọi được bất cứ nơi nào trong chương trình của bạn. Điều này giúp loại bỏ được sự dư thừa mã code, hay code bị trùng lặp.

Functions cũng cho phép lập trình viên chia một chương trình lớn thành 1 số hàm nhỏ dễ quản lý.

Nói chung, bằng cách sử dung Javascript chúng ta có thể định nghĩa 2 loại hàm `named functions`, `function expressions`

```
//named function
function sayHello(){
   return("Hello there");
}
 
//function expressions
var message = function sayHello(){
   return("Hello there");
}
```

1. Funtion trong CoffeeScript
Cú pháp function trong CoffeeScript đơn giản hơn nhiều so với JavaScript. Trong CoffeeScript chỉ định nghĩa function expressions.

Từ khóa `function` được loại bỏ. Để xác định có phải là hàm không, chúng ta phải sử dụng `->`. Khi chạy chương trình, trình biên dịch CoffeeScript sẽ chuyển `->` thành function được định trong JavaScript 
```
(function() {});
```
2. Định nghĩa một Funtion
Dưới đây là cú pháp định nghiã 1 funtion trong CoffeeScript:

```
funtion_name = -> function_body
```

ví dụ: 
```
// function_test.coffee
greet = -> "This is an example of a function"
```
run:
```
>coffee -c function_example.coffee
```
Khi biên dịch nó sẽ tạo ra mã JavaScript:
```
(function() {
  var greet;
  
  greet = function() {
    return "This is an example of a function";
  };

}).call(this);
```
3. Multi-line Funtions
Chú ý cách sử dụng indent trong trường hợp này:
```
greet =  ->
  console.log "Hello how are you"
```
Mã biên dich:
```
(function() {
  var greet;

  greet = function() {
    return console.log("Hello how are you");
  };

}).call(this);
```
4. Funtions với đối số

```
fill = (container, liquid = "coffee") ->
  "Filling the #{container} with #{liquid}..."
  
add = (a,b) ->
  c=a+b
  console.log "Sum of the two numbers is: "+c
```
Mã biên dịch (javascript):

```
(function() {
    var fill, add;

    fill = function(container, liquid = "coffee") {
      return `Filling the ${container} with ${liquid}...`;
    };

    add = function(a, b) {
      var c;
      c = a + b;
      return console.log("Sum of the two numbers is: " + c);
    };
}).call(this);
```
5. Gọi funtion
Sau khi định nghĩa 1 funtion chúng ta cần gọi funtion đó. Bạn có thể gọi đơn giản funtion đó bằng tên và thêm `()` nếu có thêm đối số, nó sẽ được đặt trong dấu như ví dụ sau:
```
add = ->
  a=20;b=30
  c=a+b
  console.log "Sum of the two numbers is: "+c  
add()

// with arguments
my_function argument_1,argument_2
or
my_function (argument_1,argument_2)

// default argument
add = (a = 1, b = 2) ->
  c = a + b
  console.log "Sum of the two numbers is: "+c
add 10,20

#Calling the function with default arguments
add()
```
javascript:
```
(function() {
  var add;

  add = function() {
    var a, b, c;
    a = 20;
    b = 30;
    c = a + b;
    return console.log("Sum of the two numbers is: " + c);
  };
  add();
}).call(this);

// default funtion
(function() {
  var add;

  add = function(a, b) {
    var c;
    if (a == null) {
      a = 1;
    }
    if (b == null) {
      b = 2;
    }
    c = a + b;
    return console.log("Sum of the two numbers is: " + c);
  };

  add(10, 20);
  add()

}).call(this);

// return
Sum of the two numbers is: 30
Sum of the two numbers is: 3
```

**Note:** Để tìm hiểu sâu thêm về CoffeeScript hãy theo dõi tiếp các bài viết của mình nhé:
Tài liệu tham khảo:
* https://coffeescript.org
* https://www.tutorialspoint.com
* https://github.com/jashkenas/coffeescript