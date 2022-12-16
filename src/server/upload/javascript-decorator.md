> Original article: https://manhhomienbienthuy.github.io/2019/02/20/javascript-decorator.html

Trong một [bài viết cũng khá lâu rồi](https://manhhomienbienthuy.github.io/2015/Dec/22/exploring-python-decorators.html), chúng ta đã tìm hiểu về decorator trong Python.  Gần đây, sau một thời gian tìm hiểu ngôn ngữ JavaScript, thì tôi phát hiện ra, JavaScript cũng có thể sử dụng decorator, với một cú pháp không khác nhau là mấy.

Có thể đây là kiến thức cơ bản mà nhiều người đã quen thuộc từ lâu, nhưng với tôi nó vẫn cứ là kiến thức mới.  Thế nên, tôi viết ra đây để coi như bản thân đã học được một điều gì đó.

# Function decorator

Việc các ngôn ngữ lập trình có tư tưởng thiết kế tương tự nhau, ngôn ngữ này có thể cài đặt tính năng của ngôn ngữ kia thì cũng không phải chuyện gì quá xa lạ.

Với JavaScript, nó cũng có tư tưởng thiết kế cho phép một hàm có thể được sử dụng như một object thông thường.  Chugns ta cũng có thể truyền hàm thành tham số cho hàm khác, gán nó vào một object và rất nhiều thứ khác nữa.

Do đó, chúng ta có thể cài đặt decorator cho JavaScript tương tự như cách mà chúng ta làm với Python.  Hãy xem xét một ví dụ như sau:

Giả sử chúng ta có một hàm `calc(x, y)` chẳng hạn, đây là một hàm tính toán rất tốn thời gian và bộ nhớ.  Có thể lấy ví dụ đây là hàm tính toán cho hàm số [Ackermann](http://mathworld.wolfram.com/AckermannFunction.html) chẳng hạn.

Hàm này có một đặc điểm, là dù rất phức tạp trong tính toán, lại tốn nhiều thời gian và bộ nhớ để cho ra kết quả, thế nhưng nó lại "có tính ổn định cao".  Có nghĩa là với những tham số đầu vào giống nhau, hàm sẽ luôn cho kết quả giống nhau.

Với những hàm có tính chất như vậy, để chương trình hoạt động hiệu quả hơn, chúng ta sẽ cần phải tìm cách cache giá trị của những hàm đó lại, tránh trường hợp phải tính đi tính lại những kết quả giống nhau.

Lúc này, chúng ta có thể sử dụng kỹ thuật tương tự như decorator của Python, để cache giá trị của hàm, mà không cần thay đổi hàm đó.

Dưới đây là một đoạn code mô phỏng điều đó (chỉ mô phỏng thôi, lập trình hàm Ackermann thật sợ máy tính không chịu nổi):

```javascript
function calc(x) {
	// Xử lý ở đây có thể rất tốn thời gian và bộ nhớ
	console.log(`Calc with ${x}`);
	return x;
}

function cachingDecorator(func) {
	const cache = new Map();

	return function(x) {
		if (cache.has(x)) {
			return cache.get(x);
		}
		
		const result = func(x);
		cache.set(x, result);
	
		return result;
	};
}

calc = cachingDecorator(calc);
console.log(calc(1));
```

Giờ đây, chúng ta có thể gọi thực thi hàm và xem kết quả:

```javascript
console.log(calc(1))
// Calc with 1
// 1
console.log(calc(1))
// 1
```

Như vậy, trong ví dụ trên, chúng ta có thể thấy rằng, trong lần gọi `calc(1)` thứ hai, không hề có lời gọi hàm nào cả (không có `Calc with 1` được in ra), tức là chúng ta đã cache thành công kết quả của hàm này.　　Và hàm `cachingDecorator` thực sự đã hoạt động như một decorator: một hàm nhận đầu vào là một hàm khác, và thay đổi hoạt động của hàm đó.

Việc hoạt động của một decorator có lẽ không cần phải giải thích nhiều nữa rồi.  Nó rất đơn giản, nhận vào một hàm và trả về một hàm, trong đó hàm đầu vào sẽ được "bao" bởi các logic cần thiết của decorator.

Một decorator như `cachingDecorator` có thể được dùng cho bất cứ một hàm nào khác.  Đây là một điều rất quan trọng của decorator, chúng ta có thể áp dụng nó cho bất cứ hàm nào mà chúng ta muốn.

Bằng cách tách biệt decorator và hàm chính, chúng ta tách biệt được logic của hàm và các xử lý ngoài lề.  Dưới đây là một số lợi ích mà chúng ta sẽ thu được khi xử dụng decorator.

- Decorator có thể tái sử dụng, chúng ta có thể áp dụng nó cho bất cứ hàm nào chúng ta muốn.
- Logic của decorator là riêng biệt với logic của hàm, nhờ đó, chúng ta không cần làm phức tạp thêm logic vốn đã rất phức tạp của hàm cần decorate rồi.
- Chúng ta có thể dùng nhiều decorator với một hàm nếu cần thiết.

Tuy nhiên, cách tạo decorator như trên cũng chưa phải là tốt lắm, vì JavaScript không có cú pháp ngắn gọn giúp chúng ta làm việc này. Nhiều bài viết trên Internet có nói về cú pháp tương tự như Python, bằng cách sử dụng `@cachingDecator` nhưng tôi đã thử và không thành công.

# Method decorator

Cách thức sử dụng decorator như ở trên tuy rất hiệu quả, nhưng nó chỉ áp dụng được với hàm mà thôi.  Chúng ta không thể dùng cách đó với các phương thức của một đối tượng được.

Trong ví dụ dưới đây, phương thức sẽ không hoạt động sau khi decorate.

```javascript
const worker = {
	multiplier: 1,
	calc: function(x) {
		console.log(`Calc with ${x}`);
		return x * this.multiplier;
	}
}

function cachingDecorator(func) {
	const cache = new Map();

	return function(x) {
		if (cache.has(x)) {
			return cache.get(x);
		}
		const result = func(x);
		cache.set(x, result);
	
		return result;
	};
}
```

Chúng ta có thể thử và thấy rằng, decorator lúc này đã không còn có tác dụng nữa.

```javascript
worker.calc(1)
// Calc with 1
// 1
worker.calc = cachingDecorator(worker.calc);
worker.calc(1)
// Calc with 1
// NaN
```

Như kết quả trên, chúng ta có thể thấy, sau khi dùng decorator, phương thức không còn hoạt động được nữa.  Lý do là vì, ngữ cảnh của phương thức đã thay đổi, sau khi chúng ta truyền nó vào trong decorator.

Sau khi truyền vào decorator, phương thức sẽ mất ngữ cảnh hiện tại và không thể truy cập đến `this` được nữa (`this` lúc này là `window` chứ không phải là `worker` nữa).  Cách gọi phương thức trong decorator như này tương tự như cách chúng ta làm như sau:

```javascript
const func = worker.calc;
func(1);
```

Việc gọi hàm như vậy sẽ khiến phương thức mất đi ngữ cảnh.  Đây là điểm khác biệt rất quan trọng giữa JavaScript và Python.  (Với Python, chúng ta có thể gán biến cho một phương thức mà khi gọi vẫn có ngữ cảnh bình thường.)

```pycon
>>> class Foo:
...     def __init__(self):
...         self.x = 1
...     def calc(self, y):
...         print('calc', y);
...         return y * self.x
... 
>>> foo = Foo()
>>> foo.calc(1)
calc 1
1
>>> func = foo.calc
>>> func(1)
calc 1
1
```

Vì sự khác biệt này, nên việc sử dụng decorator với các phương thức của một đối tượng không còn dễ dàng như việc decorate một hàm nữa. Ngay cả khi sử dụng fat arrow function (hàm không phát sinh ngữ cảnh) cũng không có tác dụng:

```javascript
const worker = {
	multiplier: 1,
	calc: function(x) {
		console.log(`Calc with ${x}`);
		return x * this.multiplier;
	}
}

cachingDecorator = (func) => {
	const cache = new Map();

	return (x) => {
		if (cache.has(x)) {
			return cache.get(x);
		}
		const result = func(x);
		cache.set(x, result);
	
		return result;
	};
}
worker.calc = cachingDecorator(worker.calc);
worker.calc(1)
```

Nhưng vẫn có những cách giúp chúng ta làm việc đó.

## Sử dụng `Function.prototype.bind`

Phương thức [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) sẽ tạo ra một hàm mới, mà khi gọi hàm đó, nó sẽ luôn có ngữ cảnh (`this`) là giá trị được "bind".

```javascript
const foo = {
	x: 1,
	getX: function() {
		return this.x;
	}
}

const func = foo.getX;
func();
// undefined
const boundFunc = foo.getX.bind(foo);
boundFunc();
// 1
```

Bằng cách sử dụng phương thức này, chúng ta có thể "dính chặt" ngữ cảnh của phương thức cho do có truyền nó đi đâu chăng nữa.  Chúng ta có thể áp dụng nó mới decorator như sau:

```javascript
const worker = {
	multiplier: 1,
	calc: function(x) {
		console.log(`Calc with ${x}`);
		console.log(this);
		return x * this.multiplier;
	}
}

function cachingDecorator(func) {
	const cache = new Map();

	return function(x) {
		if (cache.has(x)) {
			return cache.get(x);
		}
		const result = func(x);
		cache.set(x, result);
	
		return result;
	};
}
worker.calc = cachingDecorator(worker.calc.bind(worker));
worker.calc(1);
// Calc with 1
// 1
worker.calc(1); // Lần gọi này kết quả đã được cache
// 1
```

Tuy nhiên, cách sử dụng `bind` như này hơi rườm rà một chút, do mỗi lần gọi decorator chúng ta phải bind một lần.  Chưa kể, việc bind như vậy sẽ sinh ra một hàm mới, có thể gây tốn bộ nhớ nên gọi nhiều lần.

## Sử dụng `Function.prototype.call`

Có một phương thức đặc biệt của JavaScript cho phép chúng ta gọi một hàm với ngữ cảnh của nó, đó chính là [`Function.prototype.call`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

Phương thức này cho phép chúng ta có thể gọi hàm, đồng thời truyền ngữ cảnh cho nó một cách tường minh.  Ví dụ, chúng ta có thể gọi một hàm theo hai cách sau:

```javascript
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```


Chúng đều gọi hàm `func` với các tham số `1, 2, 3`, sự khác biệt duy nhất là `func.call` truyền thêm một tham số làm ngữ cảnh cho hàm.  Về cơ bản, tham số này không có nhiều ý nghĩa, trừ khi hàm của chúng ta cần tham chiếu đến `this`.

Hãy xem xét ví dụ sau cho dễ hiểu:

```javascript
function fullName() {
	return `${this.firstName} ${this.lastName}`;
}

const user1 = {firstName: 'foo', lastName: 'bar'};
const user2 = {firstName: 'Foo', lastName: 'Bar'};

fullName.call(user1);
// foo bar
fullName.call(user2);
// Foo Bar
```

Bằng cách sử dụng cách gọi hàm như vậy, chúng ta vẫn có thể decorator một phương thức được, bằng cách truyền ngữ cảnh đúng cho nó:

```javascript
const worker = {
	multiplier: 1,
	calc: function(x) {
		console.log(`Calc with ${x}`);
		return x * this.multiplier;
	}
}

function cachingDecorator(func) {
	const cache = new Map();

	return function(x) {
		if (cache.has(x)) {
			return cache.get(x);
		}
		const result = func.call(this, x);
		cache.set(x, result);
	
		return result;
	};
}
worker.calc = cachingDecorator(worker.calc);
worker.calc(1);
// Calc with 1
// 1
worker.calc(1); // Lần gọi này kết quả đã được cache
// 1
```

Đây là một cách khá hay, cho phép chúng ta decorate một phương thức, nhưng nhược điểm của nó là chúng ta cần biết chính xác số tham số của hàm cần decorate.  Với những decorator mang tính khái quát hơn, chúng ta cần một phương thức khác.

# Xây dựng decorator tổng quát

Trở lại với ví dụ của chúng ta, giờ đây, giả sử chúng ta cần phải viết lại `cachingDecorator` sao cho nó có thể support các hàm có 2 tham số, nhưng vẫn đảm bảo hoạt động với các hàm có 1 tham số.

Ví dụ, chúng ta cần cache thêm một phương thức như thế này:

```javascript
function foo(min, max) {
	return min + max;
}
```

và như thế này:

```javascript
const anotherWorker = {
	calc(x, y, z):
		return x + y + z;
	}
}
```

Trong trường hợp này, chúng ta cần giải quyết hai vấn đề.

Vấn đề đâu tiên là làm thế nào để sử dụng nhiều giá trị (`min, max`) để làm key cho đối tượng `cache`.  Trong trường hợp đơn giản, chúng ta dùng luôn giá trị của tham số làm key.  Nhưng giờ đây, chúng ta cần phải có một phương thức khác, do đối tượng thuộc class `Map` không hỗ trợ việc dùng các giá trị phức tạp.

Để giải quyết vấn đề này, chúng ta có thể dùng nhiều cách.  Đầu tiên là tự cài đặt (hoặc dùng thư viện) để xử lý các tham số, cho ra một giá trị duy nhất với các đầu vào khác nhau.  Một cách khác là sử dụng `Map` lồng nhau, ví dụ, `cache.set(min)` sẽ lưu một `Map` vào giá trị của nó, lúc này chúng ta cần gọi kết quả bằng cách `cache.get(min).get(max)`.

Tuy nhiên, trong trường hợp cụ thể của chúng ta, chúng ta có thể sử dụng một phương pháp đơn giản, đó là sử dụng string `min,max` là key của `Map`.

Vấn đề thứ hai, quan trọng hơn, là chúng ta phải tìm cách truyền tham số cho hàm trong decorator.  Khi trước, chúng ta biết chính xác hàm chỉ có 1 tham số nên việc cài đặt còn đơn giản.  Giờ đây chúng ta cần cài đặt decorator sao cho nó có thể nhận nhiều tham số hơn (mà vẫn support hàm có 1 tham số).

[`Function.prototype.apply`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) chính là phương thức cho phép chúng ta có thể cài đặt các decorator một cách khái quát.  Một ví dụ rất điển hình mà các lập trình viên vẫn hay dùng, đó là:

```javascript
const numbers = [4, 6, 7, 2, 3];

const max = Math.max.apply(null, numbers);
console.log(max);

const min = Math.min.apply(null, numbers);
console.log(min);
```

Đây là một cách giúp chúng ta có thể truyền tham số một cách khá tuỳ ý vào các hàm hoặc phương thức.  Ngoài ra, JavaScript còn một cú pháp khác (mới xuất hiện gần đây) cũng cho phép chúng ta làm điều tương tự. Đó là sử dụng ellipsis, ví dụ:

```javascript
Math.max(...numbers);
```

Thế nhưng, nếu với các hàm cần tham chiếu đến `this` thì chúng ta cần kết hợp cú pháp ellipsis với `call` theo kiểu:

```javascript
Math.max.call(null, ...numbers);
```

Sử dụng `call` hay `apply` thì về mặt code cũng không khác nhau là mấy (ngoài từ `call` thì dài hơn một chút), nhưng về mặt hiệu năng, `apply` có vẻ cho kết quả tốt hơn, do nó cần ít thao tác hơn.

Lưu ý rằng, trong hai cách làm này, chúng ta cần các giá trị được truyền vào phải được lưu vào trong một mảng, hoặc một đối tượng có tính chất gần giống như mảng.

Chúng ta có thể khái quát hoá như sau:

```javascript
const worker = {
	calc(min, max) {
		console.log(`Calc with ${min}, ${max}`);
		return min + max;
	}
}

function cachingDecorator(func, hash) {
	let cache = new Map();
  
	return function(...args) {
		let key = hash(args);
		if (cache.has(key)) {
			return cache.get(key);
		}

	    let result = func.apply(this, args);
		cache.set(key, result);
		
		return result;
	};
}

function hash(...args) {
	return args.join();
}

worker.calc = cachingDecorator(worker.calc, hash);
worker.calc(1, 2);
// Calc with 1, 2
// 3
worker.calc(1, 2); // Lần gọi này kết quả đã được cache
// 3
```

Với cách làm này, chúng ta có thể sử dụng decorator `cachingDecorator` với bất cứ hàm nào và bất cứ phương thức nào cũng không vấn đề gì, cho dù những hàm hay phương thức đó cần bao nhiêu tham số đi chăng nữa. Việc tương thích ngược với hàm đầu tiên của chúng ta cũng không gặp khó khăn gì

```javascript
function calc(x) {
    console.log(`Calc with ${x}`);
    return x;
}
calc = cachingDecator(calc, hash);
calc(1);
// Calc with 1
// 1
worker.calc(1); // Lần gọi này kết quả đã được cache
// 1
```

Chỉ có một lưu ý nhỏ, là mỗi khi áp dụng decorator này ở đâu, chúng ta cần phải xây dựng một hàm để tính key cho `Map` từ các tham số.  Trong ví dụ trên, hàm đó chỉ đơn giản là `join` các tham số tạo thành một string mà thôi.

# Kết luận

Decorator thực sự là một phương pháp tốt, giúp chúng ta thay đổi hành vi của các hàm, phương thức mà không tác động gì vào source code của chúng.

Chỉ có một lưu ý nhỏ khi sử dụng decorator, đó là nó sẽ tạo một wrapper cho hàm được decorate, do đó, một số thuộc tính của hàm gốc sẽ không thể sử dụng được nữa.  Do đó, chúng ta phải hết sức cẩn thận nếu cần đến các thuộc tính này (dù thực tế nhu cầu đó cũng không cao lắm).