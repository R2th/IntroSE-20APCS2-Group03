Từ khóa `this` tương đối đơn giản trong các ngôn ngữ khác như C++, C# nhưng trong Javascript **sida** thì không. Để trở thành _master_ Javascript, bắt buộc bạn phải hiểu **context** và **this**, nhưng đừng lo lắng, chúng ta cùng tìm hiểu rõ về các khái niệm ngay bây giờ nhé!

> `this` được xác định _bởi nơi function được gọi_.

Để hiểu `this`, chúng ta cần xác định xem hàm được gọi ở đâu, hay nói cách khác, ngữ cảnh (**context**) khi gọi hàm là gì.

Đầu tiên chúng ta lần lượt tìm hiểu về các trường hợp của **this** nhé!

### Implicit Binding
Xảy ra trong trường hợp chúng ta gọi hàm sử dụng dấu chấm(**dot notation**)

Ví dụ:
```javascript
let MyObject = function (){
	this.name = 'MyObjectName';
	this.myProperty = 'property';
};

MyObject.prototype.doStuff = function (action) {
	console.log(this.name + ' is ' + action + '!');
}

let obj = new MyObject();

obj.doStuff('awesome'); // 'MyObjectName is awesome!'
```
Trong ví dụ trên, thì **đối tượng bên trái của dấu chấm** (obj) sẽ trở thành context của **this** trong hàm `doStuff`. Tất cả **Implicit Binding** tuân theo quy tắc này ngoại trừ trường hợp ở cuối bài viết.

### Explicit Binding
Xảy ra trong trường hợp chúng ta dùng [.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call), [.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply), or [.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) cho các hàm chứa **this**.

Sở dĩ chúng ta gọi là **explicit** (tường minh) vì chúng ta sẽ xác định một cách rõ ràng ngữ cảnh của **this** bằng cách truyền vào call(), apply() hay bind() các tham số mình muốn.

Sử dụng như thế nào???

#### .call() & .apply()
Với call(), chúng ta truyền **this** context vào tham số thứ nhất, các tham số tiếp theo sẽ được truyền vào như những tham số của hàm:

`myFunc.call(thisContext, param1, param2, ... );`

Xem ví dụ sau, sử dụng lại `MyObject` bên trên:
```javascript
let runner = { name: 'duthaho', myFavoriteActivity: 'running' };
MyObject.prototype.doStuff.call(runner, runner.myFavoriteActivity); // 'duthaho is running!';
```
Trong ví dụ trên, ngữ cảnh của **this** sẽ là `runner` (tham số thứ nhất truyền vào hàm call()).

Tương tự như call(), chúng ta truyền **this** context vào hàm với cú pháp như sau, khác với call() là truyền vào mảng các tham số của hàm:

`myFunc.apply(thisContext, [param1, param2, ...]);`

Ví dụ:
```javascript
let runner = { name: 'duthaho', myFavoriteActivity: 'running' };
MyObject.prototype.doStuff.apply(runner, [runner.myFavoriteActivity]); // 'duthaho is running!';
```

#### Default Binding
Khi chúng ta gọi hàm mà ko dùng các quy tắc trên, **this** context sẽ là **global** context. Hay nói cách khác, **this** sẽ là **global** object (đối tượng global).

Nếu bạn đang ở trình duyệt, giá trị của `this` sẽ là`window`, khi đang trong [`strict mode`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode), giá trị sẽ là `undefined`.

Thử function sau trong Chrome:
```javascript
function printMe = function () {
	console.log(this);
}
printMe() // in ra đối tượng window!
```
#### Tóm lại
Hãy nhớ các quy tắc sau

1. Gọi hàm với dấu chấm? Đối tượng được gọi chính là `this`.
2. Gọi hàm với .call() và .apply()? Tham số thứ nhất chính là `this`.
3. Gọi hàm ngoài 2 quy tắc trên? Cần xác định global context là gì? Đó chính là `this`.

>`this` được xác định bởi nơi mà nó được gọi (tiếng Anh gọi là **callsite**).

#### .bind() – Trường hợp ngoại lệ
Với bind() thì mọi chuyện phức tạp hơn một chút. Khi gọi một hàm với bind(), chúng ta sẽ xác định được **this** context tại thời điểm đó bằng cách truyền tham số theo cú pháp:

`myFunc.bind(thisContext);`

Nó sẽ trả về 1 hàm mới với **this** context đã được binding.

Ví dụ:
```javascript
let sayMyName = function () {
  console.log('My name is ' + this.name);
};

let user = {
  name: 'duthaho'
}

var sayMyName = sayMyName.bind(user);
sayMyName(); // 'My name is duthaho'
```
Khi dùng hàm đã được binding, **this** context luôn không đổi, vì vậy chúng ta có thể gọi hàm ở bất kỳ đâu mà vẫn giữ được **this** context ban đầu. Khó khăn khi dùng bind() là khi muốn biết được **this** context, chúng ta phải tìm đến nơi hàm được binding 

#### `this` trong callback

Chúng ta thường nhầm lẫn **this** context khi nó được dùng trong **callback** (chúng ta sẽ tìm hiểu **callback** trong bài viết sau).

Ví dụ:
```javascript
let MyObject = function (){
  this.name = 'MyObjectName';
  this.myProperty = 'property';
};

MyObject.prototype.doStuff = function (action) {
  console.log(this.name + ' is ' + action + '!');
}

let obj = new MyObject();

setTimeout(obj.doStuff, 1000, 'awesome'); // prints ' is awesome!' after a 1 second delay.
                 ^ Hàm callback!
```

Kết quả ngoài dự đoán, nó chỉ in ra `' is awesome!'`, this.name là `undefined`.

Chẳng phải đây là `Implicit Binding` sao? Nó tuân theo quy tắc `dot notation`?

Hãy nhìn kỹ lại một chút, **obj.doStuff** không hề có dấu `()`, vì vậy ở đây chúng ta không gọi hàm *doStuff*, chúng ta chỉ truyền tên hàm như là một tham số vào trong hàm *setTimeout* mà thôi. Vì vậy đây không phải là `Implicit Binding`.

Vì vậy, khi hàm *doStuff* được gọi sau 1 giây, nó nằm trong 1 ngữ cảnh khác, **global** context. Ở đây là `window` object, và nó không có thuộc tính `name`.

Bạn hãy thử giải quyết vấn đề trên nhé!!!

Solution:
```javascript
let MyObject = function (){
  this.name = 'MyObjectName';
  this.myProperty = 'property';
};

MyObject.prototype.doStuff = function (action) {
  console.log(this.name + ' is ' + action + '!');
}

let obj = new MyObject();

setTimeout(obj.doStuff.bind(obj), 1000, 'awesome'); // prints 'MyObjectName is awesome!' after a 1 second delay.
```
Hy vọng qua bài viết này, chúng ta đã một phần nào hiểu rõ hơn về **this** context trong Javascript. Hẹn gặp lại trong bài viết tuần sau về **callback**!
Ghé thăm [blog](http://duthaho.com/) để ủng hộ mình nhé!