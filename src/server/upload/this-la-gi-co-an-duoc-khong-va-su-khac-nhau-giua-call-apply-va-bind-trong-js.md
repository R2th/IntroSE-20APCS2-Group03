Xin chào các bạn đến với series JavaScript căn bản cho Beginner ^^

Hôm nay chúng ta sẽ tiếp tục tìm hiểu về **this** và sự khác nhau giữa **call**, **apply**, **bind** trong **JavaScript**

**What is this ?**

Con trỏ ``this`` có lẽ là một khái niệm không mấy xa lạ trong lập trình hướng đối tượng, nó thể hiện cho đối tượng đang chứa nó, để mình lấy ví dụ cho các bạn dễ hình dung:

> **A** có bài thực hành môn lập trình Java vào sáng mai, nhưng hiện tại **A** vẫn ngồi chơi game


  > **A** có bài thực hành môn lập trình Java vào sáng mai, nhưng hiện tại **anh ấy** vẫn ngồi chơi game
  
  Có thể thấy 2 câu trên hoàn toàn đồng nghĩa với nhau nhưng trong văn nói cũng như văn viết chúng ta thường dùng cách thứ 2 đúng không ^^

Vậy **this** ở đây là gì? Theo như câu nói trên ta có thể thấy **this** được sử dụng như là một đại từ nhân xưng để thay thế cho đối tượng cụ thể trước đó.

**Sử dụng This như nào? Và khi nào thì sử dụng this?**

Trước khi bắt đầu mình sẽ đá qua từ khóa **this** trong lập trình hướng đối tượng của **PHP** nhé  🤒: 

```php
class Student
{
	private $name;
	
	public function __construct($name)
	{
		$this->name = $name;
	}
       
    public function __get($property)
    {
     return $this->name;
    }
}
   
$student = new Student("Vỹ");
echo $student->name;
```

Như chúng ta đã biết thì trong mỗi đối tượng thì sẽ có những thuộc tính, phương thức riêng của chính nó đúng không nào 🤔.

Trong đoạn code bên trên ta có thể thấy **this** chính là con trỏ, trỏ thẳng đến đối tượng bao nó và đại diện cho đối tượng đó luôn nên khi ta gọi **$this->name** chính là chỉ định tới thuộc tính **name** của đối tượng **Student**

Cũng giống như **đại từ nhân xưng** trong ngôn ngữ nói, `this` đại diện cho đối tượng ( Object ) ở trong một ngữ cảnh ( context ) được nhắc đến trước đó. 

**This trong JavaScript**

Trước khi đi vào tìm hiểu this trong JavaScript ta sẽ nói qua 1 chút về function nhé, như ta đã biết trong JS thì một hàm (Function) cũng được coi như là 1 đối tượng (Object) và tất nhiên như mình đã nói bên trên thì đối tượng sẽ có những thuộc tính riêng của nó. Trong JS, khi một hàm được gọi, thì nó sẽ có một thuộc tính là `this`, và thuộc tính `this` này chứa giá trị về một đối tượng đang gọi tới hàm này.

Trong JS **this** được sử dụng như sau : 

 1. Trong một phương thức, **this** được refer đến chính đối tượng chứa nó
 2. Nếu đứng một mình **this** refer đến **Global Object** ( Window )
 3. Trong một hàm **this** refer đến **Global Object** ( Window )
 4. Trong một hàm ( strict mode ) **this** không được định nghĩa
 5. Trong một sự kiện, **this** được refer đến chính **element** nhận sự kiện đó

**1. This trong một phương thức**

```js
let student = {
	name: "Vỹ",
	getName: function() {
		return this.name;
	},
};
console.log(student.getName()); // Vỹ
```

**2. This khi đứng một mình**

```js
console.log(this); // [object Window]
```

**3. This khi nằm trong một hàm**

```js
function whoAmI()
{
	console.log(this);
}
whoAmI(); // [object Window]
```

**4.  This khi nằm trong một hàm với strict mode**

```js
"use strict";
function whoAmI()
{
	console.log(this);
}
whoAmI(); // undefined

```

**5. This trong một sự kiện**

```html
<button data-id="5" id="btn" onclick="alert(this.getAttribute('data-id'))">Click me</button>
```

Ngoài ra this còn có thể sử dụng trong **callback function**, **closure**, **borrowing methods** và trong trường hợp được **gán cho một biến khác**. Nhưng trước khi đi vào tìm hiểu cách sử dụng, chúng ta sẽ lướt qua **call**, **apply** và **bind** 🤧.

**call(), apply(), bind() là gì? Tại sao chúng ta cần đến nó?**

Ba hàm **call**, **apply** và **bind** là các [prototype](https://completejavascript.com/cac-khia-canh-lap-trinh-huong-doi-tuong-trong-javascript/) của [Function](https://completejavascript.com/tim-hieu-function-javascript/). Nên chỉ có Function mới có thể gọi được 3 hàm này. Sở dĩ, một Function có thể gọi function khác vì trong JavaScript, Function cũng là một loại [Object](https://completejavascript.com/javascript-object-last-but-not-least/), mà đã là Object thì sẽ có prototype hay nói cách khác là gọi được phương thức của nó.

**Call**

```js
function.call(thisArg, arg1, arg2, ...)
```

Trong đó : 

 - function là hàm chúng ta cần gọi ra để xử lý
 - call là 1 function prototype
 - thisArg là object key value
 - arg1, arg2... là các tham số truyền vào được cách nhau bởi dấu ,
 

``Ví dụ :  ``

```js
let user = {
	name: "Vỹ",
	phone: 123456
};

function getUser(level, address)
{
	return `${this.name} - ${this.phone} - ${level} - ${address}`;
}

console.log(getUser.call(user, 10, "Viet Nam")); // Vỹ - 123456 - 10 - Viet Nam

```

**Apply**

```js
function.apply(thisArg, [arg1, arg2.. ])
```

Khác với call thì apply cho phép bạn truyền 1 object và các tham số thông qua mảng

``Ví dụ :  ``

```js
let user = {
	name: "Vỹ",
	phone: 123456
};

function getUser(level, address)
{
	return `${this.name} - ${this.phone} - ${level} - ${address}`;
}

console.log(getUser.apply(user, [10, "Viet Nam"])); // Vỹ - 123456 - 10 - Viet Nam

```

**Bind**

```js
function.bind(thisArg, arg1, arg2)
```

Bind cũng gần giống với call, tuy nhiên hàm này không thể gọi hàm trực tiếp mà nó sẽ trả về cho chúng ta một hàm mới

``Ví dụ :  ``

```js
let user = {
	name: "Vỹ",
	phone: 123456
};

function getUser(level, address)
{
	return `${this.name} - ${this.phone} - ${level} - ${address}`;
}

console.log(getUser.bind(user, 10, "Viet Name")); // Không trả về dữ liệu

let helloUser = getUser.bind(user, 10, "Viet Name");
helloUser(); // Vỹ - 123456 - 10 - Viet Nam


```


Các bạn có thể thấy mặc dù trong hàm **getUser()** mình không hề define biến **name** và **phone** mà khi chúng ta console.log ra thì kết quả lại được set?. Rõ ràng bên trên mình có nói  khi **this** đứng trong một **function** nó sẽ có giá trị trả về là một **[ Window Object ]**, vậy điều gì xảy ra nếu như mình khai báo một biến **name**? **This** sẽ trỏ đến biến **name** đó hay là **name** ở trong object kia?

Có một lưu ý nhỏ là : 

> Methods like  `call()`, and  `apply()`  can refer  `this`  to  **any object**.

Do đó thi ta sử dụng **call**, **apply**, **bind**. **This** sẽ được trỏ thẳng đến **object** được gói đó ^^ kể cả khi việc bạn có **define** một biến cùng tên đi chăng nữa thì this cũng sẽ chỉ trỏ đến **object** đó mà thôi 😉

Vừa rồi mình đã giới thiệu qua cách sử dụng cũng như sự khác nhau giữa ba hàm call, apply và bind. 

Chém gió xong xuôi rồi chúng ta chuyển qua cách sử dụng **this** trong callback function, closure :D.

**This trong callback function**

Trước khi nói về **this** trong **callback function** ta sẽ định nghĩa lại xem **callback function** là gì nhé :D

Có thể nói nôm na hàm callback là việc chúng ta truyền 1 hàm với vai trò như một tham số vào một hàm khác để có thể kích hoạt hàm đó sau này. Xét ví dụ sau:

``Ví dụ :``
```js
function calcu(a, b, callback)
{
	return callback(a, b);
}

function multiple(a, b)
{
	return a * b;
}

console.log(calcu(5, 2, multiple)); // 10
```

``Sử dụng this trong callback như thế nào?``

Giả sử bạn có một event function như sau :

```js
let Student = {
  name: "Vỹ",
  getName: function()
  {
     console.log(this.name);
  }
};
document.getElementById('btn').addEventListener('click', Student.getName); // undefined

``` 

Con trỏ `this` đang tham chiếu tới `document.getElementById('btn')` chứ không phải đối tượng `Student`, dẫn tới việc gọi `this.name` là vô nghĩa.

Để đoạn code trên chạy đúng như mong muốn – in ra được name của Student – thì ta phải đảm bảo được  `context`  của hàm callback  `Student.getName`  là chính đối tượng  `Student`  lúc hàm này được gọi. Cụ thể trong trường hợp này chúng ta có thể dùng hàm  `Bind()`  để gắn context vào hàm callback đó.
```js
document.getElementById('btn').addEventListener('click', Student.getName.bind(Student)); // Vỹ
```

**This trong closure**

Nói một cách ngắn gọn thì  `closure`  là một hàm con (inner function) nằm bên trong 1 hàm khác (outer function). Ta đã biết rằng  `closure`  thì không thể truy cập tới con trỏ  `this`  của hàm cha (outer function), do đó sẽ có thể xuất hiện trường hợp như sau:

```js
let Square = {
	name: "square",
	points: [
		{
			x: 10,
			y: 12
		},
		{
			x: 5,
			y: 2
		}
	],
	drawPoints: function() {
		// Có thể gọi this
		this.points.forEach(function(item) {
		  // this không còn tham chiếu đến Square nữa
          console.log(`${this.name} is on ${item.x} - ${item.y}`);
        });
	}
};
Square.drawPoints(); 
// undefined is on 10 - 12
// undefined is on 5 - 2
```
**Cách khắc phục**

```js
let Square = {
	name: "square",
	points: [
		{
			x: 10,
			y: 12
		},
		{
			x: 5,
			y: 2
		}
	],
	drawPoints: function() {
		 const self = this;
		 this.points.forEach(function(item) {
		  // this không còn tham chiếu đến Square nữa
          console.log(`${self.name} is on ${item.x} - ${item.y}`);
        });
	}
};
Square.drawPoints();

// "square is on 10 - 12"
// "square is on 5 - 2"
```

Qua vài chia sẻ trên đây, hi vọng mọi người có thể hiểu rõ hơn về con trỏ  `this`  trong lập trình Javascript. Chúng ta có trong tay các công cụ là các hàm như  `apply(), bind(), call()`  để kiểm soát con trỏ  `this`  trong nhiều tình huống khác nhau

Quy tắc cốt lõi cần nhớ khi làm việc với con trỏ  `this`  là: luôn chú tới  **context của con trỏ this**  khi hàm được gọi, đảm bảo chúng ta đang sử dụng đúng  `context`  của hàm như ý muốn.

**Xin chân thành cảm ơn**