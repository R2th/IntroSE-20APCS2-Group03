# Closures, IIFEs, Module pattern trong Javascript
Trong bài viết này mình sẽ giới thiệu với các một một số khái niệm được coi là **cũ mà lại mới**, mới mà lại cũ trong javascript. Tại sao mình lại nói **cũ mà mới, mới mà cũ**, các bạn hãy cũng theo dõi bài viết sau để thấy được điều đó nhé.

## 1. Closures
### 1.1. Khái niệm
Sau khi tìm hiểu ở một số nguồn thì mình thấy có 2 cách định nghĩa dễ hiểu nhất đó là:

> C1: Closure là những function tham chiếu đến các biến tự do (free avariable) tách biệt. Nói cách khác, function được định nghĩa trong closure sẽ ghi nhớ môi trường (environment) trong nó được tạo ra.

> C2: Closure - bao đóng là một hàm được tạo ra từ bên trong một hàm khác (hàm cha), nó có thể sử dụng các biến toàn cục, biến cục bộ của hàm cha và biến cục bộ của chính nó.


Để hiểu hơn về khái niệm của closures thì các bạn hãy cũng mình đến ví dụ minh họa dưới đây nhé!

### 1.2. Ví dụ

```
// Bước 1: Tạo hàm Closures
function showMessage(message) {
    return function() {
        alert(message + "- javascript closures");
    }
}

// Bước 2: Khởi tạo hàm Closures
var messageFuc = showMessage('Xin chào you');

// Bước 3: Chạy hàm Closures
messageFunc();
```


Sau khi xem xong ví dụ trên chắc hẳn những master lập trình như các bạn có thể hiểu đôi chút về định nghĩa trên rồi đúng không ạ?

### 1.3. Ngữ cảnh thực thi

#### 1.3.1. Định nghĩa ngữ cảnh là gì?

> Execution context (ngữ cảnh thực thi) là một khái niệm trừu tượng được sử dụng để theo dõi việc đánh giá thời gian chạy của mã (code). Nó có thể là global context (ngữ cảnh toàn cục), khi đó mã của bạn được thực thi đầu tiên hoặc khi luồng thực thi đi vào thân hàm.

#### 1.3.2. Ví dụ và giải thích 
![](https://images.viblo.asia/c6a89767-ade2-437d-aa87-eea17602c27a.PNG)

Bây giờ mình xin được giải thích về ý nghĩa của hình vẽ ở trên đây.

Khi thực thi đoạn code trên, javascript sẽ tạo thành một Execution Stack như sau:

Global Context => function foo Context => function bar Context.

Global context sẽ tạo ra this và object Window, mà ở đây this cũng chính là object Window. Ta có thể hiểu context = scope. Nó tạo ra một phạm vi hay ngữ cảnh cho function. Nên nhớ var là function scope.
######
Javascript là một ngôn ngữ synchronous(đồng bộ) và single thread(đơn luồng). Code sẽ thực thi theo thứ tự line by line, top to bottom. Thứ từ trong Stack sẽ là: function foo thực thi, sau đó function bar thực thi. Mỗi function đều có context của nó, nên sau khi thực thi Context cũng được xóa bỏ. 
######
Ở đây các biến sẽ được giải phóng khi nào. 

Ví dụ khi ta gọi `foo()` thì khi đó hàm `foo()` sẽ được thực thi và trong hàm `foo()` có gọi đến hàm `bar()` thì lúc này hàm bar sẽ thực thi. 

Ta nên nhớ rằng các biến trong javascript đều được cấp phát động. Trong chương trình của chúng ta lúc này có các biến như sau: x, y, z;
######
Sau khi thực thi hàm `bar()` thì biến z sẽ được giải phóng. Và khi hàm `bar()` chưa được thực thi xong thì y chưa được giải phóng do lúc này hàm `bar()` vẫn còn dùng đến nó. Đến khi `bar()` thực thi xong nó sẽ kiểm tra thêm biến y lúc này còn được dùng ở đâu không? Nếu không có thì nó cũng được giải phóng luôn. Còn đối với biến x là biến cục bộ thì không được giải phóng.
######
Vậy tại sao chúng ta cần phải hiểu ngữ cảnh sử dụng của nó. Đây chính là một câu hỏi mà lập trình viên như chúng ta nên cố gắng trả lời nó. Lý do chủ yếu nhất ở đây đó là vấn đề cấp phát và thu hồi vùng nhớ. Do nội dung bài viết của mình chỉ giới hạn nên mình sẽ có thêm bài viết để giải thích rõ hơn về vấn đề này nhé.

## 2.  IIFEs
### 2.1. Khái niệm
> IIFE (Immediately Invoked Function Expression) là một hàm javacript, nó được chạy ngay sau khi nó được định nghĩa.

### 2.2. Mục đích sử dụng
> IIFE như là một các hộp đóng gói code của chính nó. Do đó, sẽ không truy xuất hay thay đổi được biến toàn cục - Ngăn nhiễm Global Scope

### 2.3. Cú pháp

```
(function() {
	//code here
})();
```

Khi ta muốn truyền tham số cho IIFEs
```
(function(par1, par2, …, parn)){
	//code here
})(arg1, arg2, …, argn);
```

### 2.4. Ví dụ
Ví dụ khi in ra giá trị nguyên từ 0 đến 9
```
for(var i = 0; i < 10; i++){
	(function(i){
		//IIFE tạo ra một scope khác cho từng i, nên giá trị của i là khác nhau
		console.log(i);
	})(i); 
}
```

Để thấy rõ lợi ích khi dùng IIFEs thì mình có ví dụ sau:

1. Khi không dùng IIEFs

```
function celebrityIDCreator (theCelebrities) {
	var i;
	var uniqueID = 100;
	for (i = 0; i < theCelebrities.length; i++) {
	  theCelebrities[i]["id"] = function ()  {
		return uniqueID + i;
	  }
	}
	return theCelebrities;
}

var actionCelebs = [{name:"Stallone", id:0}, 
					{name:"Cruise", id:0}, 
					{name:"Willis", id:0}];

var createIdForActionCelebs = celebrityIDCreator (actionCelebs);

var stalloneID = createIdForActionCelebs [0];
console.log(stalloneID.id()); // 103
```
Output ở đây chính là 103 nhưng mà theo mong đợi kết quả là 100. Nhưng do về vấn đề thực thi ngữ cảnh ta nói ở trên nên kết quả đã ra sai lệch.

2. Ví dụ về kết hợp Closures và IIFEs cũng ở ví dụ trên
```
function celebrityIDCreator (theCelebrities) {
	var i;
	var uniqueID = 100;
	for (i = 0; i < theCelebrities.length; i++) {
		theCelebrities[i]["id"] = function (j)  { 
			return function () {
				return uniqueID + j; 
			}();
		} (i);
	}
	
	return theCelebrities;
}

var actionCelebs = [{name:"Stallone", id:0}, 
					{name:"Cruise", id:0}, 
					{name:"Willis", id:0}];

var createIdForActionCelebs = celebrityIDCreator (actionCelebs);

var stalloneID = createIdForActionCelebs [0];
console.log(stalloneID); // 100
```

Với sự kết hợp hoàn hảo của bộ đôi nên ta đã thu được kết quả chính xác.

## 3. Module pattern
### 3.1. Giới thiệu
Module pattern (là một design pattern) trong javascript là phương pháp implement source code theo các modules riêng biệt với các ưu điểm như dễ mở rộng, giảm thiểu conflict khi làm việc theo nhóm, quản lý các biến local dễ hơn…

### 3.2. Ví dụ
#### 3.2.1. Ví dụ cơ bản
```
function counter(initValue) {
	let currentValue = initValue;

	function increase(change) {
		currentValue += change;
	}

	function descrease(change) {
		currentValue -= change;
	}

	function getCurrentValue() {
		return currentValue;
	}

	return {
		current : currentValue,
		increase: increase,
		descrease: descrease,
		getCurrentValue: getCurrentValue
	};
}

var c = counter(10);
console.log(c.current);
console.log(c.getCurrentValue()); // 10
c.increase(50);
console.log(c.getCurrentValue()); // 60
c.descrease(20);
console.log(c.getCurrentValue()); // 40
```

Ở trong đây ta cần chú ý một số điều:
> Từ khóa let thì có ý nghĩa như khi ta đặt scope private cho một biến như trong các ngôn ngữ lập trình hướng đối tượng.
> 
> Khi ta muốn truy cập đến các function của module thì các function đó phải được public ra bằng cách sử dụng từ khóa **return**.

### 3.2.2. Sự kết hợp giữa IIFEs và Module pattern
Để chỉ có duy nhất một instance, ta sử dụng kết hợp giữa IIFEs và Module pattern => đây cũng chính là Singleton pattern. Ví dụ:
```
var counter = (function() {
	var currentValue = 0;

	function initializeValue(initValue) {
		currentValue = initValue;
	}

	function getCurrentValue() {
		return currentValue;
	}

	function increase(change) {
		currentValue += change;
	}

	function descrease(change) {
		currentValue -= change;
	}

	return {
		initializeValue: initializeValue,
		getCurrentValue: getCurrentValue,
		increase: increase,
		descrease: descrease
	};
})();

counter.initializeValue(10);
console.log(counter.getCurrentValue()); // 10
counter.increase(50);
console.log(counter.getCurrentValue()); // 60
counter.descrease(20);
console.log(counter.getCurrentValue()); // 40
```


Các bạn có thể tham khảo trong bài viết sau để hiểu rõ hơn về singleton pattern: [JavaScript Design Pattern - Singleton Pattern](https://viblo.asia/p/javascript-design-pattern-singleton-pattern-gDVK28GelLj) của tác giả [Lam Pham](https://viblo.asia/u/completejavascript)
### 3.3. Tại sao nên sử dụng Module pattern?
Hình ảnh đươi đây sẽ chỉ rõ các nguyên nhân ta nên sử dụng Module pattern
![](https://images.viblo.asia/6bfe2813-1026-48af-94f9-d2da3e60375c.PNG)
#####
– **Scalable**: các module là các phần riêng biệt nên nếu được thiết kế cẩn thận thì nó sẽ hoàn toàn không động chạm đến các module khác, cho nên việc thêm bớt hay xóa bỏ một tính năng, function cho module rất thuận tiện
#####
-**Team-work**:  khi phát triển một hệ thống js đồ sộ, việc các thành viên 1 team phải edit cùng một source code thật sự là thảm họa. Nếu mỗi người chỉ phải quan tâm đến module do mình phát triển thì việc conflict code sẽ được giảm thiểu đi rất nhiều. Không những thế, việc được làm việc với module riêng của mình đồng nghĩa với việc mình có thể code theo style mà mình thích (đương nhiên vẫn phải theo convention của project) giúp mình có thể code thoải mái hơn.

#####
– **Localized**: việc không phát triển theo module pattern có thể dẫn đến việc các biến global js được khai báo tràn lan, khó cho việc quản lý và có thể bị conflict với các biến khác. Với module pattern, các biến được khai báo trong module là private, không thể access từ bên ngoài có thể giải quyết được vấn đề này. Ngoài ra, các biến ngoài vẫn có thể truyền vào module thoải mái nên không lo ngại việc không liên kết được với bên ngoài
#####
– **Dynamical extension**: Khi làm việc theo module pattern, nếu bạn muốn thêm một function chỉ trong một số trường hợp, mà không muốn làm thay đổi cấu trúc của module chính là việc hoàn toàn có thể.

### 3.4. Một số gợi ý cho việc design modules tốt hơn

– Đừng để các module phải phụ thuộc vào nhau. Cần hạn chế việc sử dụng hàm của module này trong module khác, hay trong một plugin nào đó được sử dụng chung bởi các module khác
#####
– Việc liên kết giữa các module nên được thực hiện thông qua các sự kiện chung, không nên gọi trực tiếp từ module này vào module khác. Phương pháp này được gọi là pubsub (public subscribe pattern mọi người có thể tự tìm hiểu thêm)
#####
– Tạo ra những lớp nhỏ để xử lý những công việc như thêm bớt hay liên kết các module

# Kết luận
Trên đây là bài viết của mình về **Closures, IIFEs, Module pattern trong Javascript**. Hy vọng bài viết này có thể giúp ích cho các bạn.
####
Bạn viết của mình nếu có chỗ nào thiếu sót hy vọng mọi người sẽ góp ý cho bài viết hoàn thiện hơn.

Tài liệu tham khảo:

https://techinsight.com.vn/javascript-module-pattern/[](https://techinsight.com.vn/javascript-module-pattern/)
[https://www.w3schools.com/js/js_function_closures.asp](https://www.w3schools.com/js/js_function_closures.asp)
[http://thaunguyen.com/javascript/javascript-iife-la-gi](http://thaunguyen.com/javascript/javascript-iife-la-gi)