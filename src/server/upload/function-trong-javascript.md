![image.png](https://images.viblo.asia/b9fe8518-c9c4-4d4b-bcde-f7ef309ca19d.png)

Chắc hẳn nhiều bạn từng học qua các ngôn ngữ lập trình khác cũng đã biết về khái niệm function là gì rồi, với các bạn mới tiếp cận với lập trình và chọn ngôn ngữ JavaScript này thì sao? Đừng quá lo lắng, trong bài viết này chúng ta cùng nhau tìm hiểu những khái niệm cơ bản về function nhé 😉.

Bạn có thể xem thêm bài viết tại: https://200lab.io/blog/function-trong-javascript/

## I. Function là gì?

### 1. Khái niệm

Function hay còn gọi là hàm, bản chất nó là một đoạn code được dùng để thực thi một nhiệm vụ nào đó. Các đoạn code bên trong một function được gọi là **function body**, các đoạn code này sẽ không được biên dịch cho đến khi nào function đó được gọi.

### 2. Ưu điểm của function

Cùng một chức năng nhưng được sử dụng ở nhiều nơi thì không lẽ bạn code đi code lại chức năng đó ở từng nơi một ư 🤔? Không, ở đây chúng ta không làm như thế khi đã có function 😉.

Cùng một chức năng, ta chỉ cần code vào trong một function, khi nào cần nó chỉ cần gọi function đó ra là xong rồi. Code một lần và sử dụng ở mọi nơi, đó là ưu điểm khi sử dụng function. Nhờ có function mà code trở nên gọn gàng, dễ đọc và dễ bảo trì hơn.

## II.Các loại function trong JavaScript

### 1. Function cơ bản

**Khai báo một function**

Trong JavaScript, ta sử dụng từ khóa function để khai báo một function, việc khai báo kiểu này được gọi là Function Declaration/ Statement, cú pháp như sau:

```
function nameFunction() {
	//code ở đây
}
```

`nameFunction`: Tên của function, tên một function nên đặt tên bằng tiếng anh và theo quy tắc nhé, ở đây mình đặt tên mẫu theo quy tắc lạc đà, bạn nên đặt tên theo chức năng của function mà bạn viết và thêm tiền tố là động từ ở phía trước là được.

Ví dụ:
```
function showName() {
	console.log('Welcome to 200lab');
}
```

**Function có tham số (parameter)**

Tùy thuộc vào mục đích của function mà nó có thể có parameter truyền vào hay không. Một function có parameter truyền vào có cú pháp như sau:

```
function nameFunction(param_1, param_2, ...) {
	//code ở đây
}
```

ví dụ:

```
function getFullName(firstName, lastName) {
	console.log(firstName + ' ' + lastName);
}
```

Ngoài ra, ta cũng có thể gán giá trị mặc định cho parameter truyền vào như sau:

```
function getSum(a = 1, b = 1) {
	console.log(a + b);
}
```

**Rest parameter**

Rest parameter hay dịch nôm na là tham số còn lại, với tính năng này bạn có thể khai báo một hàm với số lượng tham số vô hạn, đây là một tính năng mới được bổ sung trong ES6 khiến cho JavaScript dần trở nên mạnh mẽ hơn.

Cú pháp như sau:

```
function nameFunction(...params) {
	//code ở đây
}
```

ví dụ:

```
function getSum(...params) {
	console.log(params);
}
console.log(getSum([1, 2, 3, 4]));
//-->output:  1, 2, 3, 4
```

Không nhất thiết phải đặt tên là `params` đâu nhé, bạn có thể đặt tên khác tùy thích nhưng nên theo chuẩn và đặt sao cho người đọc code cũng dễ hiểu là được.

**Function có trả về**

Có 2 loại function là có trả về và không có trả về. Các ví dụ trên là các function không có trả về còn đối với một function có trả về thì sẽ sử dụng từ khóa `return` để trả về một kết quả nào đó.

```
function getSum(a, b) {
	return a + b;
}
```

**Gọi một function**

Cách gọi một function cũng đơn giản thôi, chỉ cần ghi lại tên của function đó và truyền parameter vào nếu có là được.

Ví dụ với hàm có parameter truyền vào nhé 😉

```
function getSum(a, b) {
	return a + b;
}

getSum(5, 10);
//--> output: 15
```

**Lưu ý**: Việc ta khai báo function theo kiểu thông thường như vậy thì được JavaScript **hoisting**. Do đó mà ta có thể gọi một function trước khi function đó được khai báo, kiểu như thế này:

```
jsHoisting(); //-->Output: "Hoisted!"
function jsHoisting() {
  console.log('Hoisted!');
};
```

### 2. Phạm vi của một function

Cùng ôn lại phạm vi của một function một chút nào 😁.

Các biến được khai báo trong một function thì sẽ có **function scope**, do đó ta không thể truy cập đến các biến này được. Một function có thể truy cập tới bất kỳ các biến hoặc thậm chí các hàm trong cùng phạm vi mà nó được định nghĩa.

Giải thích một cách đơn giản là một function được khai báo ở **global scope** thì có thể truy cập đến các biến được khai báo ở **global scope**

Một function được định nghĩa bên trong một function khác thì có thể truy cập đến các biến được khai báo bên trong function cha chứa nó, đồng thời nó cũng có thể truy cập đến tất cả các biến mà function cha chứa nó có thể truy cập đến.

Tuy đây nhìn có vẻ không quan trọng nhưng nó quan trọng không tưởng đấy nhé 😁. Các bạn cố gắng ghi nhớ cũng như hiểu rõ vấn đề này nè 😉.

### 3. Phân biệt tham số (parameter) và đối số (argument)

Tham số và đối số cũng là hai khái niệm khó hấp thu đối với những bạn mới học lập trình nói chung và JavaScript nói riêng.

Dưới đây là định nghĩa và ví dụ giải thích đơn giản dễ hiểu dành cho bạn.

* **Tham số** hay **parameter** là các **tên** mà được liệt kê trong dấu ngoặc `()` lúc ta định nghĩa một function.
* **Đối số** hay **argument** là **các giá trị thực** mà ta truyền vào function lúc ta gọi function nó.
Ví dụ đơn giản cho dễ hiểu hơn nè 😉

```
// a và b là tham số
function getSum(a, b) {
  return a + b;
}
// 1 và 2 là đối số
sum(1, 2)
```

### 4. Biểu thức hàm là gì?

Biểu thức hàm hay function expression, đơn giản là function được định nghĩa và lưu trữ trong một biến như một giá trị, kiểu như này:

```
let alt = function() {
	alert('Hello!');
}
alt(); //--> Gọi hàm như thông thường
```

Lưu ý: Việc ta khai báo như vậy thì function sẽ không được **hoisting**, cùng xem ví dụ nhé:

```
funExpression();
var funExpression = function() {
  console.log('Will this work?');
};
//--> output: TypeError: funExpression is not a function
```

Giải thích tại sao lại báo lỗi nè 😄, biến `funExpression` về bản chất thì nó vẫn được **hoisting** nhé 😉 do đó nó sẽ được đẩy lên trên đầu của **scope** để thực thi trước. Tuy nhiên đó cũng chỉ là được khai báo mà thôi, do đó biến `funExpression` nó không được gán bất kỳ giá trị nào nên dẫn đến báo lỗi thôi 😁.

### 5. IIFE (Immediately invoked function expression)

Bản chất thì nó cũng là một biểu thức hàm, tuy nhiên nó hơi khác một chút đó là hàm này sẽ được thực thi ngay sau khi ta định nghĩa xong 😄.

Cú pháp của nó như sau:

```
//IIFE style 1
(function() {})();

//IIFE style 2
(function() {}());

//IIFE style 3: kiểu arrow function
(()=> {})();
```

Khuyến khích các bạn nếu có sử dụng IIFE thì nên sử dụng theo style 1, vì kiểu này thường được sử dụng hơn, phổ biến hơn.

IIFE ta vẫn có thể truyền tham số và sử dụng như bình thường thôi nhé 😉, ví dụ:

```
(function(firstName, lastName){
	console.log('Hello '+ firstName + ' ' + lastName);
})('Alice', 'Zuberg');
//--> Output: Hello Alice Zuberg
```

Một số trường hợp sử dụng IIFE:

* Xử lý logic mà chỉ chạy đúng một lần duy nhất như: init game, init element, bind event, ...
* Tránh các trường hợp sử dụng các biến global, dễ dẫn đến conflict.
* Tạo các biến hoặc các phương thức private.

### 6. Arrow function

Đây là một cách viết function mới, được ra mắt trong ES6 giúp tiết kiệm thời gian code cũng như đơn giản hóa phạm vi của function.

Với **arrow function**, nó ngắn hơn một biểu thức hàm (function Expression) và cũng không phụ thuộc vào từ khóa `this `. Ta có thể áp dụng nó cho hàm ẩn danh hay anonymous function, tuy nhiên nó không thể dùng làm hàm khởi tạo được.

Cú pháp như sau:

```
const nameFunction = () => {
	//code ở đây
}
```

Ví dụ:

```
//Function expression
var multiply = function(a, b) {
	return a * b;
};

//Arrow function
var multiply = (a, b) => {return a * b};

//Arrow function rút gọn hơn
var multiply = (a, b) => a * b;
```

Gọn chưa 😁!

### 7. Anonymous function

Anonymous function hay hàm ẩn danh hay nôm na là hàm không tên. Nghe tên nó ngầu vậy thôi chứ thật ra nếu bạn để ý thì ở function expression, vế bên phải dấu bằng là một anonymous function đó 😉 hoặc IIFE nó cũng là một anonymous function.

Ví dụ:

```
setTimeout(function(){
	console.log('Được 1s rồi!')
} ,1000);
```

### 8. Closures

Closures là một feature khá hay trong JavaScript, nó cho phép ta lồng các function vào nhau. Các function con có thể truy cập đến các biến cũng như các function được định nghĩa bên trong function cha chứa nó.

Mặc khác function cha lại không thể truy cập đến các biến hay function mà được định nghĩa bên trong function con được 😅. Tuy nhiên điều này giúp bảo mật cho các biến bên trong function con.

Do function con có thể truy cập đến các biến hay function được định nghĩa bên trong function cha nên dù function cha có thực thi xong thì các biến hay function được định nghĩa bên trong function cha vẫn tồn tại, nếu function con vẫn còn thời gian sống lâu hơn function cha.

Ví dụ cho dễ hiểu hơn nè 😉

```
function autoGeneratorNumber() {
  let num = 0;
  function checkNumber() {
    console.log(num);
  }
  num++;
  return checkNumber;
}

var number = autoGeneratorNumber();
number();
//-->output: 1
```

function `autoGeneratorNumber()` có một biến `num` là biến local và một function con là `checkNumber()`. Như hình thì ta xác định được `autoGeneratorNumber()` là một closures, do đó function con là `checkNumber()` có thể truy cập đến biến `num` và log ra console được.

### 9. Callback function

**Callback function** là hàm nhận hàm khác làm đối số. Ví dụ như ta có function A và B, ta truyền function A vào function B, tới một thời điểm nào đó function A được function B gọi lại thì được gọi là **callback**.

Ví dụ cho dễ hiểu tý nhé 😁

```
function result(values) {
    console.log(values);
 }

 function getSum(a, b, callback) {
   let total = a + b;
   callback(total);
 }

getSum(5, 10, result);
//-->Output: 15
```

Đơn giản phải không nào 😁, Vậy khi nào ta dùng callback function?

Callback function được dùng trong các trường hợp như:

* Xử lý bất đồng bộ. Bản thân JavaScript là ngôn ngữ lập trình hướng sự kiện và bất đồng bộ, do đó callback ra đời nhằm giải quyết vấn đề này.
* Tạo event, ta sẽ truyền một callback vào để khi người dùng click chuột hoặc hover thì sẽ thực thi hàm xử lý event đó.

## III. Tổng kết

Bài hôm nay tuy hơi dài nhưng đã khái quát những kiến thức cần nhớ và cần phải lưu ý khi sử dụng function trong JavaScript, hy vọng các bạn khi đọc cần lưu ý những điều đó và cố gắng thực hành càng nhiều càng tốt. Cảm ơn các bạn đã đọc 🤗.