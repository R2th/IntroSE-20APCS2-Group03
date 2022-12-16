Hi mọi người,<br>
Trong bài viết này mình sẽ chia sẻ cách sử dụng arrow function trong ES6 nhé.
Từ khi ES6 được sử dụng, chúng ta sẽ có thể viết cú pháp code ngắn gọn hơn so với trước đây.<br>
Ví dụ, trước đây một hàm tính tổng mình sẽ viết code như bên dưới.<br>
```Javascript
let add = function (x, y) {
	return x + y;
};

console.log(add(10, 20)); // 30
```
Bây giờ mình sẽ sử dụng arrow function để thay thế trong cách viết code ở trên.<br>
```Javascript
let add = (x, y) => x + y;

console.log(add(10, 20)); // 30;
```
Cách viết mới sử dụng arrow function thì ngắn gọn hơn và cho kết quả giống với cách viết trước đây.<br>
Tuy nhiên, thay vì viết:<br>
```
let add = (x, y) => x + y;
```
Bạn có thể thay thế cách viết sau:<br>
```Javascript
let add = (x, y) => { return x + y; };
```
Cách viết này sử dụng dấu ngoặc {} và từ khóa return. Cách viết này được sử dụng khi có nhiều câu lệnh được xử lý bên trong dấu {} và 2 cách viết đều cho kết quả giống nhau.<br>

### Sử dụng arrow functions với nhiều parameters
Nếu một arrow function có một hoặc nhiều parameters thì bạn có thể sử dụng cú pháp sau:<br>
```Javascript
(p1, p2, ..., pn) => expression;
```
Thay vì viết:<br>
```Javascript
=> expression;
```
Bạn có thể thay thế bằng code sau:<br>
```Javascript
=> { return expression; }
```
Cả 2 cách viết đều cho kết quả giống nhau nhé.<br>
Tiếp theo các bạn hãy xem ví dụ sắp sếp thứ tự các phần tử trong mảng theo chiều tăng dần các giá trị nhé.<br>
Code trước đây:<br>
```Javascript
	let numbers = [4,2,6,7];
	numbers.sort(function(a,b){ 
	    return a-b; 
	});
	console.log(numbers); // [2, 4, 6, 7]
```
Code sử dụng arrow function:<br>
```Javascript
	let numbers = [4,2,6,7];
	numbers.sort((a,b) => a-b);
	console.log(numbers); // [2, 4, 6, 7]
```
Như các bạn thấy code sử dụng cú pháp arrow function nhìn ngắn gọn hơn code trước đây.<br>
### Sử dụng arrow functions với một parameter
Nếu một arrow function có một parameter thì bạn có thể sử dụng cú pháp sau:<br>
```Javascript
(p1) => { statements }
```
Hoặc bạn có thể bỏ qua dấu ngoặc () như sau:<br>
```Javascript
p => { statements }
```
Ví dụ:<br>
```Javascript
	let source = name_source => { return name_source ;}
	console.log(source('Javascript')); //Javascript
```
### Sử dụng arrow functions với no parameter
Cú pháp sử dụng:<br>
```Javascript
() => { statements }
```
Ví dụ:<br>
```Javascript
let logString = () => console.log('Hello ES6');
logString();
```
Tóm tắt:<br>
- Sử dụng (....args) => expression; để định nghĩa một arrow function.<br>
- Sử dụng (....args) => { expression } để định nghĩa một arrow function, cái có nhiều câu lệnh xử lý bên trong.<br>