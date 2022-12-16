# Remove duplicates from an array
Giả sử chúng ta có 1 array lưu trữ danh sách thông tin các lập trình viên bao gồm tên và vị trí làm việc của họ.
```js
var developers = [
	{
		name: 'Adams',
		occupation: 'UI Designer'
	},
	{
		name: 'Beth',
		occupation: 'Front End Developer'
	},
	{
		name: 'Carl',
		occupation: 'Back End Developer'
	},
	{
		name: 'David',
		occupation: 'Back End Developer'
	},
	{
		name: 'Evans',
		occupation: 'UI Designer'
	}
];
```
Giờ chúng ta sẽ lấy ra tên các vị trí làm việc hiện tại không trùng lặp nhau. Đầu tiên mình sẽ sử dụng Vanilla JS.
```js
// Get all occupations and put into a new array of String
var jobs = developers.map(function (developer) {
	return developer.occupation;
});
// jobs = ['UI Designer', 'Front End Developer', 'Back End Developer', 'Back End Developer', 'UI Designer']

/*
 * If the returned index is smaller than the current index, that means an instance of item already exists. 
 * Otherwise, return that item and add it to the new array.
 */ 
var uniqueJobs = jobs.filter(function (job, index) {
	return jobs.indexOf(job) >= index;
});
```
Đặc biệt, ECMAScript 6 (ES 6) cung cấp thêm cho chúng ta Set Data-Structure, giúp cho việc lọc lấy unique item trở nên dễ dàng hơn.
```js
const uniqueJobs = Array.from(new Set(jobs));
// or
const uniqueJobs = [...new Set(jobs)];
```

# Replace the specific value in an array
## Using splice
Phương thức [`splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)  thay đổi nội dung của một mảng bằng cách loại bỏ hoặc thay thế các phần tử hiện có và (hoặc) thêm các phần tử mới vào vị trí tương ứng.
```js
const list = ['bar', 'baz', 'foo', 'qux'];

// Starting at index position 1, insert 1 element
list.splice(1, 0, 'foobar'); // return []
console.log(list); // ['bar', 'foobar', 'baz', 'foo', 'qux']

// Starting at index position 1, replace 2 elements with 1 new element
list.splice(1, 2, 'barfoo'); // return ['foobar', 'bar']
console.log(list); // ['bar', 'barfoo', 'foo', 'qux']

// Starting at index position 2, remove 2 elements
list.splice(2, 2); // return ['foo', 'qux']
console.log(list); // ['bar', 'barfoo']
```

## Using pop, push
Riêng đối với phần tử nằm ở cuối mảng, chúng ta có thể sử dụng các phương thức [`push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) và [`pop()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) để lần lượt thêm mới hoặc xóa bỏ bớt 1 phần tử. Các thuật ngữ push và pop xuất phát từ stack trong memory và được thiết kế theo nguyên lý cấu trúc dữ liệu LIFO (Last-In-First-Out).
```js
const list = ['bar', 'baz', 'foo', 'qux'];
 
// Remove the last element of the array
list.pop();
console.log(list); // ['bar', 'baz', 'foo'];

// Insert an element to the end of the array
list.push('foobar');
console.log(list); // ['bar', 'baz', 'foo', 'foobar'];
```

## Using shift, unshift
Có cách hoạt động tương tự lần lượt các phương thức `pop()` và `push()` nhưng [`shift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) và [`unshift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) sẽ có ảnh hưởng lên phần tử nằm ở đầu của mảng.
```js
const list = ['bar', 'baz', 'foo', 'qux'];
 
// Remove the first element of the array
list.shift();
console.log(list); // ['baz', 'foo', 'qux'];

// Insert elements to the beginning of the array
list.unshift('foobar', 'barfoo');
console.log(list); // ['foobar', 'barfoo', 'baz', 'foo', 'qux'];
```

# Empty an array
Để làm trống mảng đã tồn tại, mình thấy phần lớn mọi người hay sử dụng cách gán mảng đó thành 1 mảng rỗng như thế này.
```js
let numbers = [1,2,3,4,5];

// Empty array
numbers = [];
```
Nhưng cách trên không thật sự làm trống mảng đang có của các bạn mà là tạo mới một mảng rỗng rồi thay đổi reference trỏ tới mảng rỗng vừa mới tạo đó, mảng `[1,2,3,4,5]` thật sự vẫn tồn tại. 
```js
let a = [1,2,3,4,5];
let b = a;
a = [];

console.log(a); // []
console.log(b); // [1,2,3,4,5]
```

Một cách tốt để làm rỗng mảng là set lại độ dài của mảng về 0, điều này vừa giúp chúng ta đạt được mục đích mà không tạo thêm mảng mới giúp tiết kiệm resources, vừa đạt được performance cao.
```js
const numbers = [1,2,3,4,5];

// Correct way to empty an array
numbers.length = 0;
console.log(numbers); // []
```

# Merge arrays
Một số ngôn ngữ cho phép chúng ta ghép các mảng bằng toán tử cộng, riêng đối với JavaScript Array có một phương thức gọi là [`concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) cho phép chúng ta lấy một mảng, kết hợp nó với một mảng khác và trả về một mảng mới.
```js
const even = [0, 2, 4, 6, 8];
const odd = [1, 3, 5, 7, 9];

const merge = even.concat(odd);
console.log(merge); // [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
```

Ngoài ra, phiên bản ES6 còn hỗ trợ cho chúng ta thêm 1 cách khác để thực hiện: dùng tới [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (`...`)
```js
const even = [0, 2, 4, 6, 8];
const odd = [1, 3, 5, 7, 9];

const merge = [...even, ...odd];
console.log(merge); // [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]
```

Cả 2 cách làm trên đều có chung một đặc điểm là các giá trị được kết hợp từ 2 mảng đều được lưu vào 1 mảng mới, từ đó không gây ảnh hưởng đến 2 mạng có sẵn.

# Reversing an array
Giờ đây với sự hỗ trợ của ES6, mỗi khi cần đảo ngược mảng thì chúng ta không cần phải thông qua các vòng lặp hay các phương thức phức tạp nữa. Chỉ cần 1 phương thức vô cùng đơn giản có thể giải quyết được vấn đề này và đặc biệt là chỉ tốn 1 dòng code là chúng ta đã có thể đảo ngược được bất kỳ mảng nào.
```js
const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'magenta', 'purple'];
const reverse = rainbow.reverse();

console.log(reverse); // ['purple', 'magenta', 'blue', 'green', 'yellow', 'orange', 'red']
console.log(rainbow); // ['purple', 'magenta', 'blue', 'green', 'yellow', 'orange', 'red']
```
Tuy nhiên phương thức [`reverse()`]() sẽ làm thay đổi trực tiếp trên mảng có sẵn của chúng ta nên trong trường hợp không muốn ảnh hưởng đến mảng hiện tại thì các bạn có thể clone ra thành 1 mảng mới trước khi thực hiện quá trình reverse.
```js
const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'magenta', 'purple'];
const reverse = [...rainbow].reverse();
// or
const reverse = rainbow.slice().reverse();

console.log(reverse); // ['purple', 'magenta', 'blue', 'green', 'yellow', 'orange', 'red']
console.log(rainbow); // ['red', 'orange', 'yellow', 'green', 'blue', 'magenta', 'purple']
```