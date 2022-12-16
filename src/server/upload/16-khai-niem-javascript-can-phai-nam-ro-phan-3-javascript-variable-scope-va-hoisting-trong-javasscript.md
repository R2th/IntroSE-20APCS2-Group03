### Lời mở đầu

Trong bài viết này, chúng ta sẽ tìm hiểu về phạm vi biến trong Javascript, hoisting trong Javascript và tính chất riêng của chúng. Để làm việc tốt với Javascript, thì đây cũng là một khái niệm mà các lập trình viên cần nắm rõ.

-----
# Phạm vi của biến (variable scope)

Phạm vi của biến là ngữ cảnh mà trong đó biến tồn tại. Phạm vi này chỉ định nơi mà bạn có thể truy cập biến và liệu bạn có quyền truy cập vào biến trong ngữ cảnh đó hay không.

Biến trong Javascript có phạm vi toàn cục (global scope) và phạm vi cục bộ (local scope).

# Biến cục bộ (phạm vi cấp chức năng)

Không giống như hầu hết các ngôn ngữ lập trình khác, JavaScript không có phạm vi cấp khối. Thay vào đó, JavaScript có phạm vi cấp chức năng. Các biến được khai báo trong một hàm là các biến cục bộ và chỉ có thể truy cập trong hàm đó hoặc bởi các hàm bên trong hàm đó. 

Dưới đây là 1 ví dụ về phạm vi cấp chức năng:
```js
var name = "Richard";

function showName () {
	var name = "Jack"; // biến cục bộ, chỉ có thể truy cập trong phạm vi hàm showName()
	console.log (name); // Jack
}
console.log (name); // Richard (biến toàn cục)
```

Và không có block-level scope, như ví dụ dưới đây:
```js
var name = "Richard";
// khối lệnh trong câu lệnh if bên dưới không tạo ra ngữ cảnh cục bộ cho biến name
if (name) {
	name = "Jack"; // biến name lúc này là biến toàn cục, và được gán lại thành Jack
	console.log (name); // Jack
}

// thoát khỏi block lệnh if, giá trị của name đã thay bị thay đổi trong câu lệnh if
console.log (name); // Jack
```

### Lưu ý rằng, trong mọi trường hợp cần chắc chắn bạn đã định nghĩa biến local
Luôn khai báo các biến cục bộ của bạn trước khi bạn sử dụng chúng. Bạn có thể sử dụng ứng dụng [JSHint](https://jshint.com/) để kiểm tra lại về cú pháp cũng như style guides của đoạn code.

Dưới đây là 1 ví dụ về việc không định nghĩa biến:
```js
// Nếu chúng ta không định nghĩa biến với từ khóa var, thì khi truy cập có thể sẽ bị nhầm lẫn với 1 biến toàn cục đã được định nghĩa trước đó
var name = "Michael Jackson";

function showCelebrityName () {
	console.log (name);
}

function showOrdinaryPersonName () {	
	name = "Johnny Evers";
	console.log (name);
}
showCelebrityName (); // Michael Jackson

// Trong trường hợp này, name không còn là 1 biến cục bộ. Câu lệnh name = "Johnny Evers"; được hiểu là gán lại giá trị cho biến toàn cục name
showOrdinaryPersonName (); // Johnny Evers
showCelebrityName (); // Johnny Evers

// Mấu chốt của vấn đề vẫn là ở việc khai báo với từ khóa var
function showOrdinaryPersonName () {	
	var name = "Johnny Evers"; //Lúc này name luôn được hiểu như 1 biến cục bộ và sẽ không ghi đè lên biến toàn cục kia nữa
	console.log (name);
}
```

### Biến cục bộ có độ ưu tiên cao hơn biến toàn cục
Nếu bạn khai báo một biến global và một biến local có cùng tên, biến cục bộ sẽ được ưu tiên khi truy cập biến bên trong một hàm (phạm vi cục bộ). Ví dụ:
```js
var name = "Paul";

function users () {
// Biến name ở đây là biến local và được ưu tiên hơn biến toàn cục cùng tên
    var name = "Jack";

// Việc tìm kiếm name được bắt đầu trong phạm vi cấp chức năng trước khi tìm kiếm ra ngoài đến phạm vi toàn cục
    console.log (name); 
}

users (); // Jack
```

# Biến toàn cục
Tất cả các biến được khai báo bên ngoài một hàm đều nằm trong phạm vi toàn cục.

* Bất kỳ biến nào được khai báo hoặc khởi tạo bên ngoài một hàm là một biến toàn cục, và do đó nó có sẵn cho toàn bộ ứng dụng. Ví dụ:
```js
// Để định nghĩa biến global, chúng ta có thể làm như sau
var myName = "Richard";

// hoặc
firstName = "Richard";

// hoặc
var name;
name;

// Cần lưu ý là tất cả các biến toàn cầu được gắn với đối tượng window. Vì vậy, tất cả các biến toàn cục mà chúng ta vừa khai báo có thể được truy cập trên đối tượng window như sau:
console.log(window.myName); // Richard;

 // hoặc
console.log("myName" in window); // true
console.log("firstName" in window); // true
```

* Nếu một biến được khởi tạo (gán một giá trị) mà không được khai báo đầu tiên với từ khóa var, nó sẽ tự động được thêm vào ngữ cảnh chung và do đó nó là biến toàn cục:
```js
function showAge () {
// age là 1 biến toàn cục do nó không được định nghĩa với từ khóa var
	age = 90;
	console.log(age);// 
}

showAge (); // 90

// age thuộc về global context, do đó nó cũng có thể được truy cập ở đây
console.log(age); // 90

//// Một vài ví dụ khác về biến trong phạm vi toàn cục, mặc dù có vẻ như không phải như vậy:
// Cả hai biến firstName đều nằm trong phạm vi toàn cục, mặc dù biến thứ hai được bao quanh bởi một khối {}.
var firstName = "Richard";
{
var firstName = "Bob";
}

// Để nhắc lại: JavaScript không có phạm vi cấp khối

// Khai báo thứ hai của firstName chỉ đơn giản là ghi đè lại giá trị
console.log (firstName); // Bob

for (var i = 1; i <= 10; i ++) {
    console.log (i); // Outputs: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10;
};

// Biến i ở trên là một biến toàn cục và nó có thể truy cập được trong hàm sau với giá trị cuối cùng nó được gán ở trên
function aNumber () {
    console.log (i);
}

aNumber (); // 11
```

* Các biến setTimeout được thực hiện trong phạm vi toàn cục
Lưu ý rằng tất cả các hàm trong setTimeout được thực hiện trong phạm vi toàn cục. Chúng ta cùng xét thử 1 ví dụ:
```js
// Việc gọi đối tượng "this" bên trong hàm setTimeout đề cập đến đối tượng window, không phải là myObj

var highValue = 200;
var constantVal = 2;
var myObj = {
    highValue: 20,
    constantVal: 5,
    calculateIt: function () {
        setTimeout (function () {
            console.log (this.constantVal * this.highValue);
        }, 2000);
    }
}

// Đối tượng "this" trong hàm setTimeout sử dụng biến highValue và constantVal toàn cục, vì tham chiếu tới "this" trong hàm setTimeout đề cập đến đối tượng window toàn cục, không phải đối tượng myObj.

myObj.calculateIt (); // 400
```

* Và thêm 1 lưu ý khác: đừng tạo ra quá nhiều biến trong global scope, như ví dụ dưới đây:
```js
// Hai biến này thuộc về global scope, nhưng liệu có cần thiết phải khai báo với phạm vi này không?
var firstName, lastName;

function fullName () {
	console.log ("Full Name: " + firstName + " " + lastName );
}
```
Và đây là phiên bản đáng để cân nhắc của đoạn code trên:
```js
// Khai báo lại thành biến local

function fullName () {
	var firstName = "Michael", lastName = "Jackson";
	console.log ("Full Name: " + firstName + " " + lastName );
}
```

# Variable hoisting
Tất cả các khai báo biến đều được đưa lên và khai báo trên cùng của hàm (nếu chúng được định nghĩa trong một hàm), hoặc trên cùng của ngữ cảnh chung  (nếu bên ngoài một hàm).

Lưu ý: chỉ có các khai báo biến được đưa lên đầu, các phép khởi tạo hoặc gán thì không.

Để dễ hiểu hơn, cùng xem xét ví dụ sau:
```js
function showName () {
    console.log ("First name:" + name);
    var name = "Ford";
    console.log ("Last name:" + name);
}

showName ();
// First name: undefined
// Last name: Ford

// Giải thích cho trường hợp này: giá trị của First name là undefined là do biến name đã được đưa lên trên cùng, hiểu nôm na là được định nghĩa đầu tiên khi thực hiện hàm

// Đây là cách mà đoạn code trên thực thi:

function showName () {
    var name; 
    console.log ("First name:" + name); // First name: undefined

    name = "Ford";

    console.log ("Last name:" + name); // Last name: Ford
}
```

# Định nghĩa 1 phương thức sẽ ghi đè việc định nghĩa biến khi hosting
Cả khai báo hàm và khai báo biến đều được đưa lên trên cùng của phạm vi ngữ cảnh. Và khai báo hàm được ưu tiên hơn các khai báo biến (nhưng không được ưu tiên hơn trường hợp gán giá trị cho biến). Như đã lưu ý ở trên, phép gán biến không được nâng, và gán chức năng cũng tương tự (```var myFunction = function () {}```)

```js
// Cả biến và function đều có tên là myName
var myName;
function myName () {
    console.log ("Rich");
}

// Việc định nghĩa hàm đã ghi đè lên tên biến
console.log(typeof myName); // function
```
```js
// Tuy nhiên, trong ví dụ này, việc gán biến lại ghi đè lên việc định nghĩa phương thức
var myName = "Richard"; // Đây là phép gán biến

function myName () {
    console.log ("Rich");
}

console.log(typeof myName); // string 
```

-----
Trên đây là những gì tối thiểu nhất mà bạn cần nắm được về variable scope và hoisting trong Javascript. Hẹn gặp lại các bạn ở bài viết tiếp theo trong series **16 khái niệm Javascript cần phải nắm rõ**

Bài viết được tham khảo từ *http://javascriptissexy.com/javascript-prototype-in-plain-detailed-language/*