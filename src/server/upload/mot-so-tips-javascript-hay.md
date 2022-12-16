## Two ways to empty an array
Thường thì chúng ta thường làm rỗng mảng bằng 2 cách sau
```javascript
// define Array
let list = [1, 2, 3, 4];

function empty_1() {
    list = [];
}

function empty_2() {
    list.length = 0;
}
```

Vậy 2 cách này có khác biệt như thế nào ?
> * `list = []` assigns a reference to a new array to a variable, while any other references are unaffected. which means that references to the contents of the previous array are still kept in memory, leading to memory leaks
```javascript
let list = [1, 2, 3, 4];
list = []; 
// Vùng tham chiếu 1 cho giá trị [1, 2, 3, 4]
// Vùng tham chiếu 2 cho giá trị []
// Gán lại vùng tham chiếu 2 cho biến list
// -> Vùng tham chiếu 1 vẫn được lưu trong bộ nhớ 
// -> Rò rỉ bộ nhớ.
```
> * `list.length = 0` deletes everything in the array, which does hit other references.
```javascript
const list = [1, 2, 3, 4];
list.length = 0
// Với cách này vùng tham chiếu hoàn toàn không bị thay đổi 
// nên có thể khai báo const cho biến list
// -> Không tốn thêm bộ nhớ.
```

## Deduplicate an Array
**Đối với dữ liệu mảng nguyên thuỷ**

```javascript
[ 1, 1, 'a', 'a' ] // mảng nguyên thuỷ
```
* Sử dụng Filter
```javascript
const arr = [ 1, 1, 'a', 'a' ];
const deduped = arr.filter((el, i) => arr.indexOf(el) === i);
console.log(deduped); // [ 1, 'a' ]
```
* Sử dụng Set
```javascript
const deduped = [...new Set([ 1, 1, 'a', 'a' ])];
console.log(deduped); // [ 1, 'a' ]
```
**Đối với dữ liệu mảng Object**
```javascript
[
	{ a: 1 },
	{ a: 1 },
	[ 1, 2 ],
	[ 1, 2 ],
	1,
	1,
	'1',
	'1'
]
// mảng Object
```
* Có thể code như thế này :')
```javascript
function deDuplicate(arr) {
	const hashTable = {}

	return arr.filter(el => {
		const key = JSON.stringify(el)
		const match = hashTable[key]
		return (match ? false : hashTable[key] = true)
	})
}

const deDuplicated = deDuplicate([
	{ a: 1 },
	{ a: 1 },
	[ 1, 2 ],
	[ 1, 2 ],
	1,
	1,
	'1',
	'1'
])
console.log(deDuplicated) // [ {a: 1}, [1, 2], 1, '1' ]
```

## Flattening multidimensional Arrays in JavaScript
Một số cách Flatten hợp nhất mảng hai chiều thành mảng một chiều duy nhất

```javascript
const myArray = [[1, 2], 3, 4, 5, [6, 7, 8, 9]];
// expected output: Array [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

* **Sử dụng concat(), apply()**
```javascript
const myNewArray = [].concat.apply([], myArray);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
* **Sử dụng reduce()**
```javascript
const myNewArray = myArray.reduce((prev, curr) => prev.concat(curr), []);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
* **Sử dụng *Spread Operator* in ES6**
```javascript
const myNewArray = [].concat(...myArray);
console.log(myNewArray);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```
* **Sử dụng flat() in ES10**
```javascript
const myNewArray = myArray.flat();
console.log(myNewArray);
// [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

## Create array sequence > in one line
* **0 to N-1**
```javascript
// Array.from 
const sequenceArr = Array.from(new Array(N),(val,index)=>index)

// Array(N).keys
const sequenceArr = [...Array(N).keys()]
```

* **1 to N+1**
```javascript
Array.from(new Array(N),(val,index)=>index+1);
```
## Converting truthy/falsy values to boolean
Bạn có thể chuyển đổi giá trị truthy hoặc falsy thành boolean với toán tử !! 
```javascript
!!"" // false
!!0 // false
!!null // false
!!undefined // false
!!NaN // false

!!"hello" // true
!!1 // true
!!{} // true
!![] // true
```


## Lời Kết
Trên đây là một số tips mà mình đã tìm hiểu và chọn lọc ra được, hy vọng có thể giúp ích cho các bạn. 
Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^
Cảm ơn bạn đã ghé thăm :heart_eyes:

Nguồn: [JS_tips](https://www.jstips.co/en/javascript/)