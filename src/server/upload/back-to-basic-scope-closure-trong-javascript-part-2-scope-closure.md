# Mở đầu
Tôi đã làm việc với Javascript được một vài năm mà không thực sự hiểu khái niệm closure là gì, đơn giản vì Js là ngôn ngữ có thể làm việc được mà không cần hiểu quá rõ bản chất. Tuy nhiên vào thời điểm tôi muốn năng cao trình độ của mình hơn bằng cách vooc vạch vào source code của các framework, lại rơi vào trạng thái mông lung, không thực sự hiểu được cách thức hoạt động của chúng, thì tôi mới nhận thức được tầm quan trọng của việc nắm bắt những kiến thức basic trong Js - đặc biệt là `closure`. `Closure` không phải là tool hay syntax mới gì ta phải học, nó xuất hiện khắp nơi trong code của ta, đơn giản là ta chưa thực sự `nhìn ra` nó thôi.

## Closure là gì
> Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.
Hiểu đơn giản, closure là khi một function có khả năng ghi nhớ và truy cập lexical scope của nó ngay cả khi function được thực thi bên ngoài lexical scope của nó. 

Hơi hack não nhỉ, ta cùng xem ví dụ dưới đây:
```
function foo() {
	var a = 2;

	function bar() {
		console.log( a ); // 2
	}

	bar();
}

foo();
```
Ở đây, function bar() có quyền truy cập vào biến a trong scope bên ngoài nó. Vậy đây có phải là `closure` không ? Về mặt kỹ thuật thì uhm.. có thể, cơ mà theo định nghĩa bên trên thì không chính xác lắm, việc tham chiếu được tới `a` là thông qua `lexical scope looking-up rules` (quy tăc tìm kiếm trong Lexical scope - ở đây là tìm kiếm RHS) mà đó chỉ là một phần của `closure`.

Cùng xét ví dụ tiếp theo:
```
function foo() {
	var a = 2;

	function bar() {
		console.log( a );
	}

	return bar;
}

var baz = foo();

baz(); // 2 -- âu, closure đây rồi
```

Ở đây function foo() được thực thi và kết quả trả lại là tham chiếu tới bar() và được gán cho biến `baz`, sau đó lại baz là được gọi đến (thực chất là bar được thực thi, chỉ là khác tên định danh thôi). Như vậy ở đây bar được thực thi bên ngoài lexical scope được định nghĩa ban đầu của nó.
Thông thường sau khi foo() được thực thi, ta expect rằng toàn bộ inner scope của foo sẽ biến mất do cơ chế giải tỏa bộ nhớ của Garbage collector của Engine. Thực tế thì inner scope của foo vẫn còn được ghi nhớ bởi function bar -> đây chính là cơ chế closure.

Dù bằng cách nào, miễn là function được truyền đi như 1 tham số, và sau đó thực thi ở chỗ khác, thì đó là closure

```
function foo() {
	var a = 2;

	function baz() {
		console.log( a ); // 2
	}

	bar( baz );
}

function bar(fn) {
	fn(); // đây là closure
}
```
Ở đây ta pass tham chiếu tới `baz` vào cho function `bar`, khi bar được thực thì `baz` được thực thi (fn()), nhờ closure được tạo ra mà baz vẫn ghi nhớ và truy cập được vào biến `a`

### Ví dụ trong thực tế
Tôi đảm bảo rằng Closure hiện hữu khắp trong code hiện tại của bạn. Đây là 1 ví dụ điển hình:
```
function wait(message) {

	setTimeout( function timer(){
		console.log( message );
	}, 1000 );

}

wait( "Hello, closure!" );
```
function `timer` có một bao đóng bao gồm cả context của function `wait` nên có quyền truy cập biến `message`, và nó được pass vào trong function setTimeout. Cả nghìn micro giây sau khi thực thi xong `wait()`, timer mới được thực thi nhưng vẫn ghi nhớ context của `wait`. Đây chính là closure trong thực tế.

## Module
Một trong những code pattern tận dụng sức mạnh của closure mà ta sẽ cùng xem xét dưới đây, đó là Module pattern.
```
function foo() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}
}
```
Với đoạn code trên, chưa xuất hiện cái gì là closure cả, chỉ đơn giản là 1 function với các biến private data `something another` và các function `doSomething doAnother` tồn tại bao đóng chứa inner scope của `foo`. Nếu tôi thêm như sau:
```
function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething,
		doAnother: doAnother
	};
}

var foo = CoolModule();

foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
```
Đây chính là pattern được gọi là `Module`. 
Trước tiên, CoolModule() đơn thuần là một function, nhưng nó cần được thực thi để instance của module được tạo ra, nếu không closure sẽ không được tạo ra và không thể truy cập inner scope của CoolModule được.
Sau đó, CoolModule() trả về một object. Object này lại có tham chiếu tới các inner function bên trong nó. Có thể coi đây như là một dạng Public API, chỉ lộ ra các phương thức chứ không lộ private data.
Object được trả về này cuối cùng được gán cho biến `foo`, và từ đó ta có quyền truy cập tới các property methods, ví dụ `foo.doSomething()`. 

Để tổng kết lại, có 2 yêu cầu để hiện thực hóa module pattern đó là:
1. Phải có 1 function bao ngoài và nó phải được thực thi ít nhất một lần
2. Function bao ngoài đó phải trả về ít nhất 1 inner function, để inner function tạo ra closure, từ đó cso quyền truy cập private data

# Kết luận
Trên đây chúng ta đã cùng review lại khái niệm closure, ví dụ trong thực tế cũng như module pattern. Hi vọng bài viết sẽ hữu ích với những người bắt đầu làm quen với Js hay như những người cần review lại những khái niệm basic nhất để tiếp tục học cao hơn.
### Nguồn tham khảo
1. You don't know JS