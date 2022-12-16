## CoffeeScript là gì?
CoffeeScript được xây dựng dựa trên JavaScript và nó biên dịch thành Javascript để bạn có thể chạy trên một trình duyệt Web hoặc sử dụng với các công nghệ như: Node.js cho các ứng dụng chủ.

Quy tắc vàng của CoffeeScript: "It's just JavaScript". Các đoạn mã biên dịch sẽ thành đoạn JS rõ ràng, hiệu quả, dễ hiểu với những cú pháp rõ ràng. Bạn luôn có thể nhìn thấy chính xác nó đang biên dịch những gì, vì vậy bạn có thể yên tâm sẽ không có gì được đưa vào một cách thừa thãi, khó hiểu và có xu hướng chạy nhanh hơn so với JavaScript được code chay.

=> CoffeeScript là đối tượng hấp dẫn đối với những ai thích Python hay Ruby.

## Ưu điểm của CoffeeScript
* Dễ hiểu - CoffeeScript là một dạng viết tắt của JavaScript, cú pháp của nó khá đơn giản so với JS. Sử dung coffee bạn có thể viết rõ ràng và dễ hiểu.
* Code ít và làm được nhiều hơn - Đối với một đoạn mã lớn trong JS sẽ được làm gọn và chỉ cần số lượng tương đối ít các dòng mã CoffeeScript.
* Đáng tin cậy - CoffeeScript là một ngôn ngữ lập trình an toàn và đáng tin cậy để viết các chương trình động.
* Có thể đọc và duy trì - CoffeeScript cung cấp bí danh cho hầu hết các toán tử làm cho mã có thể đọc được. Nó cũng dễ duy trì các chương trình được viết bằng CoffeeScript.
* Thừa kế dựa trên lớp - Không giống như JS, bạn có thể tạo các lớp và thừa kế chúng trong CoffeeScript. Thêm vào đó nó cung cấp các instance và static properties giống như mixin. Nó sử dụng nguyên mẫu của JS để tạo ra các lớp.
* Không có từ khóa var - Không cần sử dụng từ khóa var để tạo biến trong CoffeeScript do đó ta có để tránh được sự giamr kích thước ngẫu nhiên hoặc không mong muốn.
* Tránh các kí hiệu không mong muốn - Không cần sử dụng dấu chấm phẩy và dấu ngoặc đơn trong CoffeeScript, thay vì dấu ngoặc nhọn ta có thể sử dụng khoảng trắng.

Ví dụ: Đoạn mã sau bạn có thể thấy rõ được các ưu điểm của CoffeeScript
* Với JavaScript
```
# Assignment:
number   = 42
opposite = true

# Conditions:
number = -42 if opposite

# Functions:
square = (x) -> x * x

# Arrays:
list = [1, 2, 3, 4, 5]

# Objects:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square x

# Splats:
race = (winner, runners...) ->
  print winner, runners

# Existence:
alert "I knew it!" if elvis?

# Array comprehensions:
cubes = (math.cube num for num in list)

```

*  Với CoffeeScript:
```
// Assignment:
var cubes, list, math, num, number, opposite, race, square;

number = 42;

opposite = true;

if (opposite) {
  // Conditions:
  number = -42;
}

// Functions:
square = function(x) {
  return x * x;
};

// Arrays:
list = [1, 2, 3, 4, 5];

// Objects:
math = {
  root: Math.sqrt,
  square: square,
  cube: function(x) {
    return x * square(x);
  }
};

// Splats:
race = function(winner, ...runners) {
  return print(winner, runners);
};

if (typeof elvis !== "undefined" && elvis !== null) {
  // Existence:
  alert("I knew it!");
}

// Array comprehensions:
cubes = (function() {
  var i, len, results;
  results = [];
  for (i = 0, len = list.length; i < len; i++) {
    num = list[i];
    results.push(math.cube(num));
  }
  return results;
})();

```

###  CoffeeScript 2
* Hiện tại version mới nhất của CoffeeScript 2 là 2.3.0
* So với các phiên bản trước, sự thay đổi lớn nhâts trong CoffeeScript 2 là bây giờ trình biên dịch CoffeeScript tạo cú pháp JavaScript hiện đại (ES6, hoặc ES2015)
## Cài đặt CoffeeScript
CoffeeScript được phân phối dưới dạng một gói Node.js khi sử dụng trình quản lý gói của Node, NPM

CoffeeScript phải được biên dịch, trình biên dịch của nó thực sự được viết bằng CoffeeScript và do đó, nó đòi hỏi phải có JavaScript runtime để làm công việc biên dịch. Máy ảo JavaScript V8 nằm trong nhân của Node.js hoàn toàn thích hợp cho nhiệm vụ này.

Để sử dụng được CoffeeScript bạn phải cài đặt các phiên bản Node 6 hoặc mới hơn. Tuy nhiên, trình biên dịch lõi không phụ thuộc vào Node và có thế chạy trong bất kỳ môi trường JavaScript nào hoặc trong trình duyệt.

Để cài đặt, trước tiên bạn phải đảm bảo rằng mình đã có phiên bản ổn định mới nhất của Node.js.  Sau đó bạn có thể cài đặt CoffeeScript trên toàn cầu với npm:

>  npm install --global coffeescript

Đoạn lệnh trên sẽ tạo `coffee` và  `cake` có sẵn trên toàn hệ thống chứ không phải dành riêng cho một dự án cụ thể.

Nếu bạn chỉ muốn sử dụng CoffeeScript trong một dự án, bạn có thể cài đặt cục bộ cho dự án đó:

>  npm install --save-dev coffeescript

Lệnh npm sẽ xuất ra kết quả: (NPM tạo ra một nói tắt trong /usr/bin)

> /usr/bin/coffee -> /usr/lib/node_modules/coffee-script/bin/coffee

 Để kiểm tra xem tệp coffee chạy đươc có ở trên đường dẫn đó không: 
 
 > coffee -v
 
##  Biên dịch CoffeeScript

 Trình biên dịch CoffeeScript bằng câu lệnh coffee -c, để trình biên dịch có thể dịch được 1 tệp tin, bạn phải chuyển nó về định dạng tệp tin .coffeescript.

ví dụ tạo file demo.coffee

```
for i in [0..10]
  console.log "Hello, Coffee #{i}"
```
Khi bạn chạy câu lệnh trên Terminal: $ coffee demo.coffee, kế quả trả về cho chúng ta là.

```
Hello, Coffee 0
Hello, Coffee 1
Hello, Coffee 2
Hello, Coffee 3
Hello, Coffee 4
Hello, Coffee 5
Hello, Coffee 6
Hello, Coffee 7
Hello, Coffee 8
Hello, Coffee 9
Hello, Coffee 10
```
Để có cái nhìn sâu hơn về biên dịch trong CoffeeScript như thế nào, bạn hãy chạy lệnh coffee -c coffee_test.coffee lúc này nó sẽ tạo ra file coffee_test.js để biên dịch và nội dung trong file coffee_test.js sẽ như sau:

```
(function() {
  var i;
  for (i = 0; i <= 10; i++) {
   console.log("Hi, Coffee " + i);
  }
}).call(this);
```
Lợi ích của CoffeeScript là ở chỗ, ngoài việc nó cung cấp một cú pháp đẹp hơn so với JavaScript, nó còn biên dịch thành JavaScript rất đơn giản, hợp lý.

Bạn có thể tự hỏi tại sao tất cả mã được gói trong một hàm, đó là vì JavaScript chỉ hỗ trợ phạm vi mức hàm, bằng cách gói mọi thứ trong một hàm, bạn chắc chắn rằng biến chỉ có phạm vi ở hàm đó.

## Ví dụ sử dụng CoffeeScript trong Web
```
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="http://jashkenas.github.com/coffee-script/extras/coffee-script.js"></script>
  <script type="text/coffeescript">
    $('p').on
      mouseenter: ->
        $(this).css 'background-color', 'lightgray'
        return
      mouseleave: ->
        $(this).css 'background-color', 'lightblue'
        return
      click: ->
        $(this).css 'background-color', 'yellow'
        return
    return
  </script>
</head>
<body>
  <p>Click or move the mouse pointer over this paragraph.</p>
</body>
</html
```
Kết quả: https://jsfiddle.net/rugsa835/

## Tài liệu tham khảo
* http://coffeescript.org/
* https://github.com/jashkenas/coffeescript
* https://en.wikipedia.org/wiki/CoffeeScript