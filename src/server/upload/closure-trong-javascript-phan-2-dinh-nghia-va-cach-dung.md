# Các bạn có thể đọc qua phần 1 ở [đây](https://viblo.asia/p/closure-trong-javascript-phan-1-lexical-environment-3P0lP1vv5ox) 
## Để mọi người không quên, mình xin tóm tắt gọn lại khái niệm lexical environment:
Lexical Environment là một object giấu tên có trong mọi object trong Javacript, nó chứa các biến trong 1 scope và các reference đến môi trường bên ngoài. 

## Oke chứ ? Giờ thì đến định nghĩa về Closure:
***
Closure là một hàm mà có thể nhớ và truy cập `lexical environment` của nó ngay cả khi ở ngoài `lexical environment` đó. 
***

Chúng ta hãy cùng xem ví dụ sau:
```js
function say() {
    let term = "I would like to say:";
    
    function stuff() {
        console.log(`${term} Hello Hi Ha Ya`);
    }
    
    return stuff;
}
let s = say();
s()
> I would like to say: Hello Hi Ha Ya
```

Có thể thấy hàm `stuff` được trả về bởi hàm `say`, và chúng ta gán `s` thành chính hàm `stuff` (chứ không phải giá trị trả về của hàm `stuff`).

Vậy, hàm `stuff` sau khi được gán vào `s`, đã không còn chạy trong `lexical environment` mà nó được khai báo kèm.  

Sau khi hàm `say` được chạy, chúng ta sẽ nghĩ rằng các thông tin trong `lexical environment` của nó sẽ biến mất, nhưng bởi vì hàm `stuff` vẫn tồn tại và có chứa một kết nối đến `lexical environment` bên ngoài (ở đây là hàm `say`, các thông tin này vẫn được lưu giữ. Có người gọi chính sợi dây kết nối này mới là `closure`.

## Closure trong Javascript thông dụng hơn bạn nghĩ
Chúng ta sẽ lấy tiếp 1 ví dụ như sau:
```js
function wait(message) {

	setTimeout( function timer(){
		console.log( message );
	}, 1000 );

}

wait( "Hello, closure!" );
> Hello, closure!
```
Đây là một ví dụ lấy trực tiếp từ sách [You Dont Know Javascript](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/scope%20%26%20closures/ch5.md) .
Ai đã từng động đến Javascript thì đều đã dùng đến hàm `setTimeout`. Ở trong ví dụ này, chúng ta có một hàm trong cùng là `timer` và sẽ truyền nó vào trong `setTimeout` để chạy sau 1 giây. Đây là một cách dùng mà mình nghĩ là khá phổ biến. Cũng giống như ví dụ trước, có thể bạn nghĩ rằng sau 1s thì tham số `message` của hàm `wait` đúng ra đã phải biến mất, nhưng hàm `timer` ở đây vẫn có một sợi dây kết nối đến lexical environment của `wait`, và ngăn không cho `message` bị bộ dọn rác (Garbage Collector) xóa. 
## Closure và vòng lặp
Bạn nghĩ vòng lặp sau sẽ in ra gì ?
```js
for (var i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}
```
Kết quả thực là nó sẽ in ra số `6` 5 lần, mỗi lần cách 1 giây. Tức là `i` mà `setTimeout` nhận được đang khác với `i` mà `timer` nhận được, tại sao thế ?

Đầu tiên, `6` đến từ đâu ? Nó là kết quả khi vòng lặp gặp điều kiện không thỏa mãn `i <= 5`, tức `i = 6`, khi đó nó kết thúc và hàm `setTimeout` mới bắt đầu được chạy. Và cho dùng bạn có thay `i*1000` bằng `0`, hàm `setTimeout` vẫn sẽ chạy sau vòng lặp hoàn thành. 
Vậy làm thế nào để in đúng như mình muốn ?

Điều chúng ta muốn ở đây có lẽ là mỗi vòng lặp bắt được biến `i` của riêng nó, nhưng hiện tại, cả 5 lần lặp của vòng lặp này đang dùng chung một `lexical environment` bên ngoài mà chỉ có một `i` khi vòng lặp đã chạy xong. Vậy cái chúng ta cần là một `lexical environment` mà có thể chứa biến `i` này. 

```js
for (var i=1; i<=5; i++) {
	(function(){
		var j = i;
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})();
}
```
Hoặc

```js
for (var i=1; i<=5; i++) {
	(function(j){
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})( i );
}
```

Cú pháp này:
```
(function(){
   ...
})();
```
Là một [IIFE ](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), việc dùng một IIFE trong vòng lặp sẽ tạo ra một `lexical environment` mới bọc quanh hàm `setTimeout` ở mỗi vòng, cung cấp cho nó biến `i` mà nó cần. 

## Closure được dùng trong trường hợp nào ?

Có nhiều tính huống đời thường dùng đến closure, bạn hãy thử đọc lại Javascript mình đã viết xem có chỗ nào dùng đến không.  Nhiều người sử dụng nó để viết các hàm [`debounce` và `throttle`](https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf)

Đó là những điều cơ bản nhất mà mình biết về Closure. Các bạn có thể tham khảo thêm ở [đây](https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/scope%20%26%20closures/ch5.md) và [đây](https://javascript.info/closure) . 
Một điều thú vị nữa với ví dụ ở trên 
```js
for (var i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}
```
Là khi bạn thay `var` bằng `let`, hành vi khác lại xảy ra. Bạn thử tự tìm hiểu xem tại sao lại thế nhé.

Cảm ơn vì đã đọc.