Chào các bạn, hôm nay mình sẽ giới thiệu và giải thích cách thức hoạt động của closures trong javascript, một khái niệm mà nếu ai đến từ các ngôn ngữ khác thì khá là khó hiểu.

## Closure là gì ?
Theo mình thì closure là một khái niệm khá phức tạp mà những ai mới bắt đầu với javascript thường không hiểu chính xác nó là gì hoặc thậm chí không biết đến sự tồn tại của nó.

Có lẽ vì khả năng pass function làm argument mà closure được ra đời. 



Theo định nghĩa trong cuốn You don't know JS thì closure là khi 1 function có khả năng ghi nhớ và truy cập **lexical scope** của nó kể cả khi nó được thực thi bên ngoài **lexical scope** của nó.
```
Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.
```
Đọc định nghĩa thì khá là khó hiểu về lexcial scope nhỉ. Lexical scope theo mình hiểu là cách mà function được định nghĩa.
```
function foo(){
  var a = 1
  function bar(){
    console.log(a);
  }
  return bar;
}
var baz = foo()
baz()
```
Ở đây thì function **bar** được định nghĩa một cách lexicly so với function **foo**. Hàm bar được trả về khi thực hiện foo(). 

Theo cách thức hoạt động của Javascript thì như sau:
- Global execution context được khởi tạo trong callstack
- **foo** excecution context được khởi tạo, ở đây định nghĩa biến a = 1 và function bar, sau đó return bar
- **foo** được thực hiện xong, execution context của foo được xoá khỏi callstack.
- biến baz được khởi tạo trong global execution context và có giá trị là function **bar**. Khi **bar** được thực thi thì mặc dù execution context của foo đã được xoá khỏi callstack nhưng bằng một cách nào đó thì vẫn có thể ghi nhớ và truy cập được biến a, print ra console giá trị 1.

Closure trong javascript hoạt động như vậy đó.

Nếu các bạn là một developer Ios và tiếp cận Javascript từ Swift thì có lẽ hiểu rất nhanh vì trong Swift cũng có **closure** và pass function làm argument.


Một ví dụ rất đơn giản khác mà có lẽ gần như ai làm web javascript cũng từng làm qua là attach event trong jquery

```
function clickme(name, selector) {
	$( selector ).click( function event(){
		console.log( "Clicked: " + name );
	} );
}

clickme( "Button1", "#btn_1" );
```

Mỗi khi bạn click vào button thì cũng đều trigger event, mặc dù khi web page của chúng ta không còn lưu lại các **execution environment** trong callstack. 

Hiểu một cách đơn giản thì closures là một cơ chế trong JS engine mà cho phép ta có thể truy cập được **execution environment** đã kết thúc(không còn được lưu lại trong callstack) và gọi ra các biến, dữ liệu được định nghĩa trong đó.

Bất cứ khi nào bạn pass function vào làm argument thì cũng có khả năng bạn đang sử dụng closures rồi.

Một ví dụ khác điển hình cho closure là

```
for (var i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}
```

Kết quả là Console print ra 6 năm lần. Để có thể print ra là 1...5 thì ta phải sử dụng let hoặc IIFE

Do variable defined với let khác nhau qua các vòng lặp for nên biến **i** được acccess sẽ có giá trị khác nhau
```
for (let i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}
```

Hoặc cũng có thể dùng IIFE như sau
```
for (var i=1; i<=5; i++) {
	(function(){
		var j = i;
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})();
}
```




OK, bài viết của mình đến đây là hết. Hy vọng các bạn có thể hiểu rõ được closure trong JS là gì. Mong các bạn cho ý kiến đòng góp để có nhiều bài viết tốt hơn.