![](https://images.viblo.asia/f7664d25-e83b-403e-9e94-3a73c37b50dc.png)

Method Chaining là một pattern phổ biến trong JavaScript  khá quen thuộc với  Javascript Programer. Bài viết này mình xin giải thích ngắn gọn về Method Chaining, đưa ra một số ví dụ về cách jQuery sử dụng Method Chaining và  cách implementing Method Chaining trong  Javascript. OK! Lest'go!

### Method Chaining là gì?

Đơn giản thì Method Chainning là một kỹ thuật được sử dụng để viết code một cách ngắn gọn và đơn giản hơn trong việc gọi các hàm liên tiếp trên cùng một đối tượng, nó sẽ gọi một chuỗi các hàm trong một câu lệnh duy nhất. Đây là một ví dụ về cách bạn sử dụng method chaining trong jQuery.

```js
// Không sử dung METHOD CHAINING

var $div = $('#my-div');

$div.css('background', 'blue');
$div.height(100);
$div.fadeIn(200);

// Sử dụng METHOD CHAINING

$('#my-div').css('background', 'blue').height(100).fadeIn(200);
// hoặc đẹp hơn sẽ là:
$('#my-div')
  .css('background', 'blue')
  .height(100)
  .fadeIn(200);
  ```
  
Như bạn có thể thấy, sử dụng Method Chainning có thể làm cho code gọn gàng hơn khá nhiều, tuy nhiên một số lập rình viên có thể sẽ không thích phong cách “chuỗi” của Method Chainning này.

### Tổng quan về Method Chainning
Để dễ hình dung chúng ta sẽ định nghĩa một lớp Kitten với một vài phương thức để gọi như sau:
```js
// define the class
var Kitten = function() {
  this.name = 'Garfield';
  this.color = 'brown';
  this.gender = 'male';
};

Kitten.prototype.setName = function(name) {
  this.name = name;
};

Kitten.prototype.setColor = function(color) {
  this.color = color;
};

Kitten.prototype.setGender = function(gender) {
  this.gender = gender;
};

Kitten.prototype.save = function() {
  console.log(
    'saving ' + this.name + ', the ' +
    this.color + ' ' + this.gender + ' kitten...'
  );

  // save to database here...
};
```
Bây giờ, hãy khởi tạo một đối tượng Kitten và gọi các phương thức của nó.
```js
var bob = new Kitten();

bob.setName('Bob');
bob.setColor('black');
bob.setGender('male');

bob.save();

// OUTPUT:
// > saving Bob, the black male kitten...
```
bạn có thấy có một sự lặp tại ở đây không, bản thân mình thích cách code đơn giản hơn và Method Chainning chính là giải pháp.

Bạn có thấy có một sự lặp lại ở đây không?  Method Chainning  sẽ là hoàn hảo cho việc giải quết vấn đề lặp lại ở đây như sau:

```js
var bob = new Kitten();

bob.setName('Bob').setColor('black');
```
Nhưng điều này sẽ không hoạt động. Đây là lý do tại sao:
```js
// ERROR:
// > Uncaught TypeError: Cannot call method 'setColor' of undefined
```

Để hiểu rõ hơn tại sao điều này không hoạt động, chúng tôi sẽ sắp xếp lại mã ở trên một chút.
```js
var bob = new Kitten();

var tmp = bob.setName('Bob');
tmp.setColor('black');

// ERROR:
// > Uncaught TypeError: Cannot call method 'setColor' of undefined
```

Điều này trả về cùng một lỗi. Điều này là do hàm setName() không trả về một giá trị nào, do đó tmp sẽ được gán cho undefined. Cách điển hình để kích hoạt Method Chainning là trả về đối tượng hiện tại ở cuối mỗi hàm.

### Implementing Method Chaining
Hãy viết lại lớp Kitten như sau:
```js
// define the class
var Kitten = function() {
  this.name = 'Garfield';
  this.color = 'brown';
  this.gender = 'male';
};

Kitten.prototype.setName = function(name) {
  this.name = name;
  return this;
};

Kitten.prototype.setColor = function(color) {
  this.color = color;
  return this;
};

Kitten.prototype.setGender = function(gender) {
  this.gender = gender;
  return this;
};

Kitten.prototype.save = function() {
  console.log(
    'saving ' + this.name + ', the ' +
    this.color + ' ' + this.gender + ' kitten...'
  );

  // save to database here...

  return this;
};
```

Bây giờ, nếu chúng ta chạy lại đoạn mã trước, biến tmp sẽ tham chiếu cùng một đối tượng với biến bob:
```js
var bob = new Kitten();

var tmp = bob.setName('Bob');
tmp.setColor('black');

console.log(tmp === bob);

// OUTPUT:
// > true
```

Để rút ngắn code hơn nữa, chúng ta thậm chí không cần tạo biến bob.
```js
// WITHOUT CHAINING

var bob = new Kitten();

bob.setName('Bob');
bob.setColor('black');
bob.setGender('male');

bob.save();

// OUTPUT:
// > saving Bob, the black male kitten...


// WITH CHAINING

new Kitten()
  .setName('Bob')
  .setColor('black')
  .setGender('male')
  .save();

// OUTPUT:
// > saving Bob, the black male kitten...
```
Bằng cách sử dụng phương thức Method Chainning, chúng tôi kết thúc với code sạch hơn nhiều và dễ hiểu hơn.

### Kết luận
Đó chính là nó! Phương pháp Method Chainning có thể là một kỹ thuật rất hữu ích cần có trong các programming tools của bạn.

Dưới đây là một cách tuyệt vời để tự động hóa việc bổ sung return this;
```js
function chainify(obj) {
    Object.keys(obj).forEach(function(key){
        var member = obj[key];
        if(typeof member === "function" && !/\breturn\b/.test(member)){
            obj[key] = function() {
                member.apply(this, arguments);
                return this;
            }
        }
    });
}

// define the class
var Kitten = function() {
  this.name = 'Garfield';
  this.color = 'brown';
  this.gender = 'male';
};

Kitten.prototype.setName = function(name) {
  this.name = name;
};

Kitten.prototype.setColor = function(color) {
  this.color = color;
};

Kitten.prototype.setGender = function(gender) {
  this.gender = gender;
};

Kitten.prototype.save = function() {
  console.log(
    'saving ' + this.name + ', the ' + this.color + ' ' + this.gender + ' kitten...'
  );

  // save to database here...
};

Kitten.prototype.sayHi = function(name) {
     return "Hi " + name + "! My name is " + this.name + ".";   
};

chainify(Kitten.prototype);

var bob = new Kitten()
  .setName('Bob')
  .setColor('black')
  .setGender('male')
  .save();

console.log(bob.sayHi("Tom")); 
```