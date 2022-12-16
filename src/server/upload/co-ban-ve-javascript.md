# 1. Tổng quan

Xin chào các bạn!
Javascript (Js) là một trong những ngôn ngữ "hot" ở thời điểm hiện tại. Trong bài viết này, mình sẽ tổng hợp các vấn đề do cá nhân đã tìm hiểu được về ngôn ngữ này, mình thấy hay và khác biết so với các ngôn ngữ khác. Bài viết không hướng tới cú pháp của Js (khai báo biến ra làm sao, khai báo hàm như thế nào ...) mà thay vào đó mình sẽ đề cập đến bản chất, ý tưởng của ngôn ngữ nhằm giảm thiểu cách nhớ máy móc của bản thân về ngôn ngữ này. Bài viết cũng hương tới các đối tượng mới tìm hiểu Js (như mình) hoặc sắp có ý định tìm hiểu Js :). Let's start

# 2. Serious Types

Vấn đề đầu tiên mà mình muốn trình bày đó là kiểu dữ liệu trong Js. Có người nói là Js có 5 kiểu hay thậm chí 7 kiểu. OK, nhưng với mình Js chỉ có 2 kiểu dữ liệu đó là kiểu dữ liệu nguyên thủy (**Primitive Types**) và kiểu đối tượng (**Object**)

## 2.1. Kiểu dữ liệu nguyên thủy

Trong kiểu dữ liệu nguyên thủy gồm 3 kiểu chính đó là Numbers, String, Boolean (3 kiểu kinh điển :)). Ngoài ra một số kiểu undefined, null, NaN dễ gây khó hiểu

**1.  undefined**:  Đây là kiểu dữ liệu đại diện cho **một biến**. 3 loại biến sẽ trả về undefined
* Một biến không được khởi tạo giá trị
```javascript
var x;
if (x == undefined) {} //true
```
* Một thuộc tính không tồn tại (hoặc đã bị xóa) trong các đối tượng
```javascript
var customer = {
    name: 'Jerry'
};
if (customer.phoneNumber == undefined) {} // true
```
* Các phần tử của mảng chưa được khởi tạo giá trị

**2. null** : null sẽ đại diện cho **một đối tượng** không có @@. Null thường được sử dụng để check đối tượng trả về của một hàm, check như vậy để sử dụng các thuộc tính, các phương thức của đối tượng đó không gây lỗi. Một ví dụ phổ biến là check giá trị trả về khi lấy các elements từ DOM

```javascript
var header = document.getElementById("header");
if (header == null) {
    // okay, something is seriously wrong if we have no header
}
```

**3.  NaN**: đúng tư tên gọi của kiểu này, cái gì không phải là số thì là kiểu này. Vậy làm sao biết kiểu nào là số (phần này sẽ đề cập trong phần chuyển kiểu phía sau). Một lưu ý nhỏ là khi kiểm tra một biến có phải NaN hay không, sẽ không kiểm tra bằng phép so sánh == mà sẽ sử dụng phương thức isNaN

```javascript
isNaN(123)             //true
isNaN("123)            //true
isNaN("hehe")          //false
isNaN("123hehe")       //true @@
```

## 2.2. Kiểu đối tượng

Tất cả các kiểu dữ liệu không thuộc kiểu dữ liệu nguyên thủy sẽ là kiểu dữ liệu đối tượng. Có thể kể tới một số đối tượng mặc định trong Js như Document, Function, ... hoặc các đối tượng người dùng định nghĩa thêm như Dog, Cat ...

## 2.3. So sánh kiểu dữ liệu nguyên thủy và kiểu Object

OK, vậy bạn có hỏi là tự nhiên sao lại phân kiểu dữ liệu ra có 2 loại này. Câu trả lời chính là sự khác biệt khi thực hiện phép gán giá trị cho chúng. Hãy coi tên biến là các cốc, khi truyền dữ liệu cho kiểu nguyên thủy, ta truyền trực tiếp giá trị vào cốc này, còn khi gán giá trị cho Object, ta chỉ thực hiện gán tham chiếu vào cốc này (tham chiếu hiểu là địa chỉ hay con trỏ trong C,C++ cho dễ :v)

![](https://images.viblo.asia/7ca8d84e-dfbc-4cae-aaa3-1bd96b3d0a3a.png)

Phép gán này có ảnh hưởng gì? Nó ảnh hưởng lớn khi bạn truyền các dữ liệu này vào hàm. Cách truyền dữ liệu vào hàm trong Js sẽ là "pass by value" tức là nó sẽ copy giá trị của các đối số để truyền vào hàm. Như vậy nếu tham số của hàm nhận đối số biến kiểu dữ liệu nguyên thủy, nó copy giá trị này truyền vào đối số, chẳng ảnh hưởng gì đến giá trị của biến, nhưng khi tham số là một mảng hay Object (mảng bản chất cũng là Object do nó không là kiểu nguyên thủy), nó copy giá trị địa chỉ truyền cho hàm, rõ ràng không có ý nghĩa vì khi thay đổi giá trị lưu tại địa chỉ cũng chính là thay đổi giá trị của tất cả các biến trỏ tới nó rồi còn gì @@. 

Đó chính là bản chất của việc sau truyền Object vào hàm, khi thay đổi các đối tượng thì thay đổi trực tiếp giá trị của biến luôn (đọc thêm chương 5 trong cuốn Head First sẽ viết rất chi tiết và ví dụ đầy đủ)
Ngoài ra, các chuyển kiểu trong các toán tử (+, -, *, /, >, <) cũng là một vấn đề đang quan tâm khi tìm hiểu về Js

# 3. Function

## 3.1. Pass by value

Như đã nói trong phần so sánh 2 kiểu dữ liệu nguyên thủy và kiểu đối tượng, khi truyền tham số vào trong hàm, nó sẽ copy giá trị biến để truyền vào hàm. 

## 3.2. First class function

Trong cuốn Head First có đề cập đến khái niệm này với hàm. Tính chất "first class" của hàm được thể hiện ở 3 tính chất

1. Hàm có thể gán cho biến

```javascript
var add = function (a, b) {return a + b; }
console.log(add(3,4)) // 7
```

2. Hàm có thể truyền vào hàm khác như là một đối số

```javascript
function calculate(func_name, a, b) { return func_name(a,b); }
console.log(calculate(add, 5, 4) //9
```

3. Hàm có thể được trả về từ một hàm khác

```javascript
// Hàm addN nhận vào một đối số x. Sau đó nó tạo một hàm trong thân hàm và trả về hàm đó
function addN(n) {
    var adder = function(x) {
        return n + x;
    };
    return adder;
}
var add2 = addN(2);      // add2 ở đây là hàm do hàm addN trả về
console.log(add2(10));  
```

## 3.3. Scope

Phạm vi biến trong Js cũng là một điểm đặc biệt cần được đề cập đến. Trong Js không có khái niệm phạm vi khối mà thay vào đó là phạm vi theo hàm. Điều đó có nghĩa, một biến được khai báo bên trong hàm, nó sẽ là biến LOCAL, và một biến không được khai báo bên trong hàm nó sẽ là GLOBAL. Vì thế khi sử dụng các biến mới trong hàm, nếu bạn quên khai báo nó, đồng nghĩa với việc nó sẽ trở thành biến GLOBAL
```javascript
var helloWorld = function() {
    name = "MinhNV";  // quên khai báo biến, nó sẽ trở thành GLOABL
    return 1;
}();
console.log(name)     // MinhNV

// Ví dụ sau cho thấy không còn phạm vi theo khối trong js
for (i = 0; i < 10; i++) { 
    var x = 5; 
    console.log(1)
}
console.log(x) //5
```

## 3.4. Closure

Đây là một khái niệm khá khó hiểu cho người mới tiếp xúc với Js. Cá nhân mình hiểu cũng chưa sâu và cũng chưa biết hết được sự hữu ích của nó mang lại. Trong phạm vi bài viết, mình chỉ đề cập tới trong phạm vi hiểu biết của mình :)
OK, trước khi tìm hiểu closure, ta hãy cùng tìm hiểu cách thức hàm hoạt động trong Js. Ta xem xét thử hàm sau:

```javascript
function whereAreYou() {
    var justAVar = "Just an every day LOCAL";
    function inner() {
        return justAVar;
    }
    return inner;
}
```

Như đã đề cập ở phần trước, hàm vốn là Object. Xét khai báo hàm inner, việc khai báo function innner() thực chất là gán biến inner tới một tham chiếu của một đối tượng hàm. 

![](https://images.viblo.asia/b2817de6-2022-489f-9029-5bb9f2ff9a77.png)

Nói thêm 1 chút về hàm, địa chỉ trong biến inner vậy trong địa chỉ đó có gì (nội dung của biến). Với các Object thông thường là các thuộc tính và phương thức, nhưng hàm ngoài vậy ra còn có một thứ nữa, người ta gọi là môi trường (environment). Vậy môi trường sẽ chứa gì? Câu trả lời là môi trường sẽ chưa toàn bộ các biến mà hàm này sử dụng. Và cuối cùng, khi giá trị trả về của hàm whereAreYou là hàm inner, nó không chỉ trả về hàm, thực chất nó sẽ trả về hàm đính kèm với môi trường của hàm inner

![](https://images.viblo.asia/c7b32566-f6d4-44a8-bc47-9b8ae9b56f62.png)

Gọi hàm

```javascript
var innerFunction = whereAreYou();    (1)
var result = innerFunction();         (2)
console.log(result);                  (3)
```

Giải thích các câu lệnh trên như sau. 

(1) Đầu tiên hàm whereAreYou được gọi, giá trị trả về sẽ gán cho biến innerFunction

![](https://images.viblo.asia/883863d3-b85c-40f6-8594-dce1a2bc1946.png)

(2) Thực thi hàm qua các câu lệnh và biến đã gán trong môi trường, kết quả được trả về cho biến result

(3) Thôi cái này khỏi giải thích

Vậy là bạn đã hiểu môi trường là gì chưa @@. Bây giờ sẽ là closure. Nếu môi trường của một hàm chứa biến không phải là global hay local, nó là biến trong một hàm khác thì hàm đó được gọi là closure (biến này được gọi là free variable). Biến justAVar ở trên là ví dụ, nó không phải là biến GLOBAL, nó cũng không nằm trong hàm inner mà nó ở trong hàm whereAreYou bao ngoài hàm inner. Đặc điểm của biến này là khi hàm kết thúc, các biến khác được giải phóng trong môi trường nhưng biến nay thì không, đó là lý do khi bạn tác động vào biến này, hãy suy xét vì nó thay đổi và lần tiếp theo gọi hàm, biến này sẽ cập nhật từ lần gọi trước.
Xem xét một ví dụ khác khi 2 hàm cùng xử lý sự kiến đếm số lần bấm một nút, một hàm sử dụng closure còn một hàm thì không?
Click me without closure

```javascript
var count = 0;
window.onload = function() {
    var button = document.getElementById("clickme");
    button.onclick = handleClick;
};
function handleClick() {
    var message = "You clicked me ";
    var div = document.getElementById("message");
    count++;
    div.innerHTML = message + count + " times!";
}
```

Click me with closure

```javascript
window.onload = function() {
    var count = 0;      // free variable
    var message = "You clicked me ";
    var div = document.getElementById("message");
    var button = document.getElementById("clickme");
    button.onclick = function() {
        count++;
        div.innerHTML = message + count + " times!";
    };
};
```


Theo hiểu biết của mình, closure rất hữu ích khi xử lý các sự kiên kiểu này. Ngoài ra một công dụng hữu ích khác của closure chính là việc tránh sử dụng lạm dụng các biến GLOBAL. Thay vì khai báo các biến GLOBAL để sử dụng trong các hàm, sử dụng Closure dễ kiểm soát các biến, không tác động tới các biến GLOBAL vì nhỡ một hàm khác cũng tác động tới biến GLOBAL này thì sẽ rất dễ gây lỗi
Ngoài các khái niệm trên, Js cũng còn rất nhiều vấn đề liên quan đến hàm như hàm chuẩn (function declarations) và hàm khai báo biểu thức (function expressions), khái niệm biến "shadow" trong hàm, hàm vô danh ... các bạn có thể tự tìm hiểu thêm 
# 4. Object - Prototype
Kế thừa trong Js cũng khác biệt hoàn toàn so với các ngôn ngữ khác. Với các ngôn ngữ khác, kế thừa được sử dụng qua các lớp (**class**) với nhau, lớp này "extends" lớp kia từ đó có thể sử dụng các thuộc tính, phương thức của lớp cha. Trong Js không như vậy, Js kế thừa nhau thông qua **đối tượng và prototype**. 

Mỗi đối tượng được tạo ra trong Js đều có **prototype** *liên kết tới* **prototype của một đối tượng nào đó** mà nó kế thừa. Mặc định khi khởi tạo đối tượng, nó sẽ trỏ tới đối tượng `Object.prototype`, một đối tượng có sẵn trong Js. Prototype giống như phần chung cho tất cả các đối tượng, và đây cũng là phần cho các đối tượng khác kế thừa bằng cách thêm prototype của đối tượng khác vào của mình. Prototype này có thể xem là tương tự class trong các ngôn ngữ khác. Xét ví dụ sau.

Ví dụ 1:

```javascript
function Dog(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
}
// sửa prototype đồng nghĩa tác động mọi đối tượng Dog được tạo ra
Dog.prototype.sit = function() {
    console.log(this.name + " is now sitting");
}        
function ShowDog(name, breed, weight, handler) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
    this.handler = handler;
}
// kế thừa Dog(), thêm đối tượng Dog vào prototype là được
ShowDog.prototype = new Dog();  
var scotty = new ShowDog("Scotty", "Scottish Terrier", 15, "Cookie");
scotty.sit();                 // kế thừa rồi sử dụng phương thức ok
```

Ví dụ 2: Sửa các đối tượng sẵn trong Js. 

```javascript
Object.prototype.name = "MinhNV";
Object.prototype.helloWorld = function() {
    console.log("Hello World, i am " + this.name);
}
var x = {};
console.log(x.name);    // MinhNV
x.helloWorld();         // Hello World, i am MinhNV
```

# 5. Kết luận

Các kiến thức chủ yếu là mình tổng hợp từ 2 cuốn sách Head First JavaScript Programming và một phần trong cuốn Javascript: The GoodPart. Phần bài viết chắc cũng chỉ đi qua các mục lục của 2 cuốn sách này, nếu bạn muốn hiểu kĩ, hãy đọc 2 cuốn này sẽ giúp ích hơn rất nhiều. Khả năng dịch thuật còn hạn chế nên có thể một số chỗ trong bài viết chưa chính xác, mình rất mong nhận được sự đóng góp từ phía mọi người.

Cảm ơn mọi người vì đã đọc được đến đây ^^