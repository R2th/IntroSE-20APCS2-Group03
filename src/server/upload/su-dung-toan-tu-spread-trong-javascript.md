Hi mọi người,<br>
Trong bài viết này mình sẽ chia sẻ cách sử dụng toán tử **spread** nhé.<br>
Toán tử spread được định nghĩa bằng 3 dấu chấm (...). Ví dụ:<br>
```Javascript
const odd = [1,3,5];
const combined = [2,4,6, ...odd];
console.log(combined);
```
Output:<br>
```Javascript
[ 2, 4, 6, 1, 3, 5 ]
```
Ở ví dụ trên 3 dấu chấm (...) ở trước mảng odd là toán tử spread. Nó có nhiệm vụ giải nén các phần tử trong mảng odd.<br>
Trong ES6 cũng sử dụng  dấu 3 chấm (...) để định nghĩa một **rest parameter** . Nó có nhiệm vụ là gom tất cả các tham số còn lại trong hàm vào một mảng.<br>
```Javascript
function f(a, b, ...args) {
	console.log(args);
}

f(1, 2, 3, 4, 5);

```
Output:<br>
```Javascript
[ 3, 4, 5 ]
```
Sự khác nhau giữa spread và rest parameter.<br>
* Toán tử spread giải nén các phần tử trong một mảng
* Rest parameter thì gom các phần tử còn lại của hàm vào một mảng

Khi sử dụng rest parameter thì nó phải là tham số cuối cùng của mảng, nếu không sẽ không sử dụng được. Tuy nhiên toán tử spread có thể đặt ở mọi nơi. ví dụ:<br>
```Javascript
const odd = [1,3,5];
const combined = [...odd, 2,4,6];
console.log(combined);
```
Output:<br>
```Javascript
[ 1, 3, 5, 2, 4, 6 ]
```
Hoặc là<br>
```Javascript
const odd = [1,3,5];
const combined = [2,...odd, 4,6];
console.log(combined);
```
Output:<br>
```
[ 2, 1, 3, 5, 4, 6 ]
```