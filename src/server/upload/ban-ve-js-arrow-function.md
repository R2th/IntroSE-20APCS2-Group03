# Arrow Function

Hẳn chúng ta đều đã biết về sự phiền phức khi phải binding `this` với function trong ES5. Và kể từ ES6, chúng ta đã có một feature mới để giải quyết vấn nạn này đó là arrow function.

Đầu tiên hãy xem một arrow function trông thế nào khi đứng với một function thường:
```
function foo(x, y) {
	return x + y;
}

// vs

var foo = (x, y) => x + y;
```
Định nghĩa về arrow function bao gồm một danh sách param (0 hoặc nhiều param, được bao quanh bởi một cặp `( .. )`, tiếp sau là dấu `=>`, và cuối cùng là thân hàm.

Và ta có thể thấy ở ví dụ trên, arrow function chỉ là phần `(x, y) => x + y` và được gán reference vào biến `foo`.

Phần thân hàm sẽ được bao bởi dấu `{ .. }` nếu có nhiều hơn một biểu thức hoặc có một câu lệnh phi biểu thức nào đó. Nếu chỉ có duy nhất một biểu thức, và ta bỏ đi hai dấu ngoặc `{ .. }`, mặc định hàm sẽ return lại kết quả của biểu thức, như mô tả trong ví dụ trên.

Đây là một vài biến thể của arrow function mà ta có thể xem xét:
```
var f1 = () => 12;
var f2 = x => x * 2;
var f3 = (x, y) => {
	var z = x * 2 + y;
	y++;
	x *= 3;
	return (x+ y + z) / 2;
};
```
Arrow function luôn là một function expression, không có khai báo arrow function. Rõ ràng ra mà nói thì nó là một anonymous function expression, nó không có tên để tham chiếu cho việc đệ quy hay event binding/unbinding.

> Tất các các tính năng của function bình thường đều có ở arrow function, như là default values, destructuring, rest parameters,...

Arrow function có cú pháp gắn gọn, sạch đẹp, trông rất thích. Gần như tất cả các mã viết với ES6 đều sử dụng ngay tính năng này để viết function.

Và có thể nói là gần như tất cả các ví dụ khi bàn luận về arrow function đều sử dụng tối đa khả năng viết gọn của nó, ví dụ như:
```
var a = [1, 2, 3, 4, 5];
a = a.map(v => v * 2);
console.log(a);              // [2, 4, 6, 8, 10]
```
Trong những trường hợp như ví dụ trên, ta cần một inline function expression, thì arrow function sẽ phù hợp hơn và đẹp hơn nhiều so với việc viết một cú pháp function thông thường khá là dài dòng.

## Không chỉ là cú pháp gắn gọn

Những điểm gây chú ý đầu tiên về arrow function thường là việc giúp ta có thể giảm thiểu `function`, `return`, và `{ .. }` trong code.

Nhưng có một chi tiết lớn mà ta chưa kể tới, đó là điều mà ta nói từ đầu bài viết, rằng `=>` function có liên quan với behaviour của `this` binding. Thực tế thì, `=>` function được thiết kế chủ yếu cho việc này.

Hãy xem xét một ví dụ khác:
```
var controller = {
	makeRequest: function(..) {
		var self = this;
		btn.addEventListener("click", function() {
			// ..
			self.makeRequest(..);
		}, false);
	}
};
```
Ta sử dụng `var self = this` để đối phó với `this` binding, tham chiếu tới `this` bằng việc gọi `self.makeRequest(..)` bên trong hàm callback mà chúng ta truyền vào addEventListener(..).  Bởi vì `this` binding là dynamic, bằng việc làm như trên, ta xác định được `this` một cách lexical thông qua biến `self`.

Ở đây ta có thể thấy đặc tính được thiết kế chính của `=>` function đó là bên trong arrow function, `this` binding không còn dynamic, thay vào đó được xác định một cách lexical. Trong đoạn code trên, nếu ta sử đụng arrow function cho callback, `this` sẽ được bind đúng như những gì ta muốn:
```
var controller = {
	makeRequest: function(..) 
		btn.addEventListener("click", () => {
			// ..
			this.makeRequest(..);		
		}, false);
	}
}
```
`this` trong arrow function callback trong đoạn code trên giờ sẽ trỏ tới cùng context với `makeRequest(..)` function. Hay nói cách khác, `=>` là ngầm định cho `var self = this`.

Trong trường hợp ta sử dụng `var self = this` (hoặc sử dụng `.bind(this)`), thì thay vào đó ta dùng arrow function sẽ đẹp hơn.

Tuy nhiên mọi chuyện cũng không đơn giản.

Nếu `=>` thay thế cho việc sử dụng `var self = this` hoặc `.bind(this)`, chuyện gì sẽ xảy ra nếu hàm của chúng ta không cần đến tính năng này, mọi thứ sẽ bắt đầu trở nên rối rắm.

```
var controller = {
	makeRequest: (..) => {
		// ..
		this.helper(..);
	},
	helper: (..) => {
		// ..	
	}
};

controller.makeRequest(..);
```
Mặc dù ta gọi `controller.makeRequest(..)`, thì câu lệnh `this.helper` sẽ tham chiếu fail, bởi vì `this` lúc này không trỏ tới `controller` như đáng ra nó phải vậy. Thế nó trỏ về đâu? Nó kế thừa một cái lexical `this` từ scope bao ngoài. Trong đoạn code trên, đó là global scope, `this` trỏ tới global object.

Thêm vào đó để có thể lexical `this`, arrow function cũng phải lexical các argument - nó không có mảng argument riêng mà thay vào đó kế thừa từ parent - cũng như việc lexical `super` hay `new.target`.

Vì thế bây giờ chúng ta có thể kết luận một tập rule xem khi nào thì arrow function là thích hợp:

- Nếu ta có một inline function expression ngắn và dạng single-statement. Ở đó statement là dạng return một giá trị đã tính toán, và function này không tạo sẵn tham chiếu `this` bên trong, và không có tự tham chiếu (đệ quy, event binding/unbinding), và bạn không có ý định xây dựng hàm này hoạt động theo cách đó. Khi ấy, bạn đã an toàn để chuyển thành arrow function.
- Nếu bạn có một inner function expression mà phải dựa vào cái trò `var self = this` hoặc `.bind(this)` ở function bao ngoài để đảm bảo `this` binding. Lúc này đây bạn đã rất ổn để chuyển cái inner function kia thành arrow function.
- Nếu bạn có một inner function expression mà phải dựa vào cái trò kiểu `var args = Array.prototype.slice.call(arguments)` trong hàm bao ngoài để tạo lexical copy của các arguments. Cái inner function này đã sắn sàng để chuyển thành arrow function.
- Với những trường hợp khác - khai báo normal function, hàm nhiều câu lệnh, hàm cần có tên để tự tham chiếu, và bất cứ hàm nào khác không phù hợp với các đặc tính kể phía trước - ta nên tránh sử dụng arrow function.

Arrow function được sử dụng để lexical binding `this`, `arguments` và `super`. Đây là những feature được thiết kế có chủ đích nhằm sửa chữa một số common problems trong ES6.

Đừng nghĩ là việc dùng arrow function để viết cho gọn là chính. Dù bạn có tiết kiệm được vài chữ hay phung phí thừa thãi, thì bạn cũng cần phải biết chính xác bạn định làm gì với tất cả các chữ mà bạn gõ code.

# Kết
Trên đây là một số kiến thức về tính năng arrow function xuất hiện từ ES6, hy vọng sẽ là một nguồn tham khảo hữu ích dành cho các bạn.

------

Dịch và tham khảo từ cuốn You Don't Know JS - ES6 & Beyond của Kyle Simpson.