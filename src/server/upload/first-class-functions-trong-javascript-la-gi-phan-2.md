Ở [phần 1](https://duthaho.com/blogs/js-first-class-functions), chúng ta đã được tìm hiểu nhiều khái niệm của `first-class functions` trong Javascript. Bài viết hôm nay mình sẽ cùng các bạn tìm hiểu khái niệm cuối cùng, cũng như các ví dụ cụ thể để ứng dụng các khái niệm này.

Cùng tìm hiểu khái niệm cuối cùng trước khi đi vào ví dụ cụ thể nhé!

## Inner functions có thể giữ lại trạng thái của outer functions

Tiêu đề nghe có vẻ chung chung và khó hiểu nhỉ??? Nhớ lại ở phần trước, bạn có thể định nghĩa 1 function bên trong 1 function khác, hay nói cách khác, 1 outer function có thể chứa nhiều inner function bên trong nó, và outer function còn có thể trả về inner function.

Cụ thể khái niệm này cho phép những inner function có thể _giữ lại và sử dụng trạng thái (biến) của outer function_, kể cả khi outer function đã thực thi xong.

Mình sẽ sử dụng lại hàm `getDinhDang` ở phần trước cho dễ hiểu. Tuy nhiên version mới này sẽ khác một chút, là sẽ truyền vào tham số là `volume` và `text`, để version cũ ở đây luôn cho dễ so sánh:

- version cũ
```js
function getDinhDang(volume) { 
	function inThuong(text) { 
		return text.toLowerCase() + '...' 
	} 

	function inHoa(text) { 
		return text.toUpperCase() + '!' 
	} 

	if (volume > 0.5) return inHoa
	else  return inThuong 
}
```
- version mới
```js
function getDinhDang(text, volume) {
    function inThuong() {
        return text.toLowerCase() + '...'
    }
    
    function inHoa() {
        return text.upper() + '!'
    }
    
    if (volume > 0.5) return inHoa
    else return inThuong
}
```
```js
getDinhDang('Hello, World', 0.7)()
// 'HELLO, WORLD!'
```

Bạn hãy so sánh 2 version thì bây giờ, inner functions `inHoa` và `inThuong` không còn tham số `text` nữa phải không? Vậy mà nó vẫn chạy và trả về kết quả như mong muốn? wtf? Vâng, đây chính là lúc khái niệm này có tác dụng rồi đó, hàm `inHoa` và `inThuong` có thể truy cập đến tham số `text` của hàm `getDinhDang`, mặc dù hàm này đã được thực thi xong.

Đến đây thì có thể bạn hiểu bản chất của vấn đề rồi, nhưng cũng chỉ ở mức cơ bản nhất mà thôi. Nếu bạn muốn đau não hơn, xin mời tìm hiểu về khái niệm được gọi là [_lexical closures_](https://en.wikipedia.org/wiki/Closure_(computer_programming))  (hay ngắn gọn là _closure_). Một closure ghi nhớ các giá trị (biến) từ _lexical scope_ của nó, mặc dù chương trình không còn trong scope đó nữa. Bài viết hôm nay sẽ không đi sâu vào các khái niệm nâng cao như _scope_ hay _closure_. Hẹn các bạn ở các bài viết sau.

Sau đây là một ví dụ về _closure_:
```js
function calculator(n) {
    function add(x) {
        return x + n // tham số  n sẽ được giữ lại trong các lần gọi tiếp theo
    }
    
    return add
}
var plus_3 = calculator(3)
var plus_5 = calculator(5)

plus_3(4)
// 7
plus_5(4)
// 9
```

Ở ví dụ này, bạn có thể thấy ứng dụng của hàm `calculator` như là 1 nhà máy, để tạo và cấu hình cho các phép toán khác nhau. Khá hữu ích phải không nào?

## Một số ví dụ ứng dụng thực tế

### Higher order functions

Cũng ở phần trước, chúng ta đã được nghe đến khái niệm này, và được dùng đa số trong các functions của Array:  `filter()`,  `map()` và  `reduce()`.

`filter()` nhận tham số là 1 function (có tham số lần lượt là các phần tử của mảng và trả về giá trị boolean để quyết định xem có nên giữ lại hay không).

```js
let numbers = [1,2,3,4,5,6];

function isEven(x) {   
	return x % 2 === 0; 
}

let evenNumbers = numbers.filter(isEven); // 2 4 6
```

`map()` nhận tham số là 1 function (có tham số lần lượt là các phần tử của mảng và trả về giá trị chính là giá trị mới của mảng).

```js
let numbers = [1,2,3,4,5,6];

function double(x) {  
	return x*2;
}

let doubleNumbers = numbers.map(double); // 2 4 6 8 10 12
```

Đó là build-in functions, còn ví dụ thực tế thì sao. Tưởng tượng ứng dụng của bạn đang dùng 1 thư viện bên thứ 3 cung cấp và méo sửa code của họ được, vấn đề của bạn là muốn thêm 1 số log vào để xem hàm tụi nó code performance như thế nào. Nhớ lại kiến thức đã học nên hí hửng custom 1 hàm là  `withLogging()`, mình chỉ đơn giản là thêm 2 dòng console.log thôi.

```js
function withLogging(fn) {  
	console.log("start logging");  

	let returnValue = fn();  

	console.log("end logging");  

	return returnValue;
}
```

```js
function fromOtherLibrary() { 
	console.log("do process");
}
```

```js
withLogging(fromOtherLibrary);
// start logging
// do process
// end logging
```

### Closure

Bạn có một list các button và muốn sinh ra `id` khác nhau cho từng button. Bạn có thể implement function này 1 cách dễ dàng với sự giúp đỡ của _closure_. Tạo một hàm `createGenerator()`  sẽ trả về  `generateNewID()`, mỗi lần nó được gọi, sẽ sinh ra 1 ID mới.

```js
function createGenerator(prefix) {  
	let index = 0;  

	return function generateNewID() {    
		index++;    
		return prefix + index.toString();  
	}
}
```

```js
let generateNewID = createGenerator("btn");
console.log(generateNewID()); // btn1
console.log(generateNewID()); // btn2
console.log(generateNewID()); // btn3
```

### Decorators
_Decorators_ là một trong [pattern](https://en.wikipedia.org/wiki/Decorator_pattern) khá phổ biến và được áp dụng nhiều nhất trong các kỹ thuật lập trình, và Javascript cũng không ngoại lệ.
> Một  **function decorator** là một _higher-order function_ nhận vào tham số là một hàm, và trả về một hàm mới chính là biến thể của hàm truyền vào.

Chúng ta có thể thấy _decorators_ phổ biến như thế nào vì có khá nhiều thư viện implement chúng như [underscore.js](http://underscorejs.org/#once)  hay  [lodash.js](https://lodash.com/docs/4.17.5#once). Cùng custom 1 function decorator `once`(hàm chỉ được gọi 1 lần duy nhất) tương tự 2 thư viện trên nhé.

```js
function once(fn){
	let returnValue;
	let canRun = true;
	return function(...args){
	    if(canRun) {
	        returnValue = fn(...args);
	        canRun = false;
	    }
	    return returnValue;
	}
}
```

```js
var processonce = once(fromOtherLibrary); // dùng lại fromOtherLibrary bên trên
processonce(); // do process
processonce(); //
```

_Function decorators_ là một trong những công cụ tuyệt vời để chúng ta có thể tạo ra những bộ mặt khác nhau của hàm mà không chỉnh sửa nào ở hàm ban đầu cả. OMG!!!

## Túm váy

-   Functions trong Javascript là Object. Bạn có thể gán nó cho biến, lưu trữ chúng như cấu trúc dữ liệu, truyền như tham số vào hàm hoặc có thể được trả về bên trong 1 hàm.
-   Functions có thể định nghĩa bên trong hàm khác, đặc biệt nó có thể giữ lại và sử dụng trạng thái của outer function. Còn được gọi là _closures_.
-   Hãy like và share nhiệt tình để động viên mình viết thêm nhé, và đừng quên ghé thăm [blog](https://duthaho.com) của mình để cập nhật nhiều bài viết mới.