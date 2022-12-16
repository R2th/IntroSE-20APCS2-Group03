Để hiểu rõ một ngôn ngữ, điều quan trọng nhất là phải tìm hiểu cơ bản các kiểu dữ liệu (_data types_) của ngôn ngữ đó. Ngày hôm nay, chúng ta cùng tìm hiểu về **Array** - được dùng khá phổ biến trong Javascript

> _Kiểu dữ liệu của Array trong JavaScript là objects_, và đặc biệt nó có thêm thuộc tính _length_ và  _có thể truy cập các phần tử theo chỉ số._

Trong bài viết hôm nay, chúng ta không đi vào chi tiết tìm hiểu **Array**, mà là chia sẽ _1001 cách để tạo Array hoặc clone từ các Array có sẵn_

## Những cách tạo Array

### Dùng Array Literal
Vâng, đây là cách đơn giản nhất và có thể bạn hay sử dụng nhiều nhất. Chắc chẳng cần phải nói gì nhiều về cách này.
```js
let arr = [1,2,3]
```

### Dùng Array Constructor
Array trong Javascript là object, vì thế ta cũng có thể dùng nó để tạo 1 đối tượng array. Giả sử chúng ta muốn tạo 1 array có 1001 phần tử, và không cần quan tâm đến giá trị các phần tử đó, chẳng lẽ dùng *array literal* để tạo sao? Bạn không rãnh tới mức viết 1001 số phần tử, `Array` constructor sẽ giúp chúng ta giải quyết vấn đề này.
```js
// Tạo array với nhiều tham số
var array1 = new Array(1, 2, 3);
console.log(array1); // [1, 2, 3]
console.log(array1.length); // 3

// Tạo array với 1 tham số  (là số )
var array2 = new Array(3);
console.log(array2); // Array(3) {length: 3}
console.log(array2.length); // 3

// Tạo array với 1 tham số  (không phải là số )
var array3 = new Array("3");
console.log(array3); // ["3"]
console.log(array3.length); // 1
```
Ở ví dụ trên chúng ta có thể thấy `Array`  constructor tạo ra những array khác nhau tùy theo tham số mà nó nhận được.

#### Vấn đề với Array constructor

Bạn tưởng rằng đã giải quyết vấn đề tạo ra 1 array có 1001 phần tử rồi đúng không? Đơn giản ta dùng Array constructor với 1 tham số truyền vào là 1001: `var array = new Array(1001)`. Nhưng không, hãy đọc tiếp, kịch hay còn ở phía sau. Hãy xem đoạn code bên dưới:

![](https://cdn-media-1.freecodecamp.org/images/HuAR3m0WmxP390Ezk4Ufyam-9vlyDzwNvEzi)

Thoạt nhìn thì chẳng có vấn đề gì cả, bạn nghĩ rằng `array1` sẽ có 5 phần tử, và mỗi phần tử của nó có giá trị là `undefined`. Thật ra thì chẳng có phần tử nào ở đây cả, mà chỉ có mỗi thuộc tính `length` được gán = 5.

Còn không tin? Hãy chạy đoạn code sau:

![](https://cdn-media-1.freecodecamp.org/images/wtfHBQo1MBofKp-EVs-IB6qqq07cfM18rK8I)

Vấn đề này làm cho các hàm như  `map()`,  `filter()`  hoặc  `reduce()` trở nên vô dụng khi dùng với array ở trên. Và dưới đây là 1 sai lầm thường gặp nếu chúng ta không hiểu rõ vấn đề này (_bạn muốn tạo ra 1 array có 5 phần tử và mỗi phần tử có giá trị = 5_):

![](https://cdn-media-1.freecodecamp.org/images/1OHTGXHuG93TuWcOpzRVtUNjoB-BFP3Pykq5)

Oát đờ heo, chẳng có phần tử = 5 nào được tạo ra cả, hàm `map` không làm việc vì trong `array1` chỉ có thuộc tính `length` mà không có thuộc tính index nào.

Chẳng lẽ đành bó tay chấm cơm? Tạo ra mà không dùng được thì tạo làm lol gì? Các hàm dưới đây giúp giải quyết vấn đề này.

#### 1. Dùng Array.prototype.fill()

Hàm `fill` cho phép chúng ta điền vào tất cả các phần tử của array với 1 giá trị, quá easy phải không? Bạn có thể tìm hiểu thêm [tại đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill).

![](https://cdn-media-1.freecodecamp.org/images/w3CWlvnWqG5VEy6qupnAYvTqECGhPdj3P9Wu)

#### 2. Dùng Array.from()

Hàm `Array.from` tạo mới 1 array, là bản sao từ 1 array ban đầu (ở đây chỉ là shallow copy). Bạn có thể tìm hiểu thêm về `Array.from()`  [tại đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

![](https://cdn-media-1.freecodecamp.org/images/XfZGhDWQWU1VwxliMKIjYgHuwYvkfvPSBkVT)

Bạn có thể thấy log `undefined` ở đây giống như ví dụ lúc dùng `Array constructor`, nhưng giờ `undefined` chính là giá trị của phần tử nhé.

Một điều tuyệt vời nữa của `Array.from()`  là nó có thể nhận tham số thứ 2, là một **map function.** Hàm này sẽ được gọi với mỗi phần tử của array và giá trị trả về là giá trị của phần tử đó, giống như hàm `.map()` vậy:

![](https://cdn-media-1.freecodecamp.org/images/UgaAHFIo4xzuw4cc4bI1iaxaPzGHKkTCbjYK)

#### 3. Dùng Spread Operator

**spread operator**  (`...`), tính năng này được thêm vào trong ES6, nó cho phép thêm những phần tử bị thiếu vào array với giá trị `undefined`, kết quả giống như sử dụng hàm  `Array.from()`.

![](https://cdn-media-1.freecodecamp.org/images/gZrwaPsFq15WkPf2BnuAb2wA54JdIEXx7VNv)

### Dùng Array.of()

Cách dùng hàm `Array.of` giống y như dùng `Array constructor`, chỉ có 1 khác biệt duy nhất là cách mà Array.of tạo ra array khi tham số truyền vào là 1 số nguyên.

Trong khi `Array.of(5)`  tạo 1 array có `1` phần tử, và giá trị của nó là `5`, thì `new Array(5)`  tạo ra 1 array với `length` là `5`

```js
var array1 = Array.of(5); // [5]
var array2 = Array(5); // Array(5) {length: 5}
```

Bạn có thể tìm hiểu thêm về `Array.of()`  [tại đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of).

## Áp dụng thực tế

Viết hàm `range` cho phép chúng ta tạo ra 1 array gồm các phần tử, bắt đầu (start) từ đâu, kết thúc (end) ở đâu và bước (step) bằng bao nhiêu:

```js
function range(start, end, step = 1) {
	// kiểm tra điều kiện
	const allNumbers = [start, end, step].every(Number.isFinite);
	if (!allNumbers) {
		throw new TypeError('range() expects only finite numbers as arguments.');
	}
	if (step <= 0) {
		throw new Error('step must be a number greater than 0.');
	}
	if (start > end) {
		step = -step;
	}

	// tính toán số  phần tử
	const length = Math.floor(Math.abs((end - start) / step)) + 1;

	return Array.from(Array(length), (x, index) => start + index * step);
}
```

Ở đây mình dùng `Array.from`, các bạn có thể dùng nhiều cách khác nhé.

![](https://cdn-media-1.freecodecamp.org/images/zFBQwh8KfkoDDWXcZDl8YnDe7e9jBEsocdCa)

Ở phần 1 hôm nay chúng ta đã được tìm hiểu về các cách tạo Array trong Javascript, hy vọng các bạn ủng hộ để mình sớm viết phần 2 về các cách để clone 1 array từ array có sẵn nhé! Cũng như là áp dụng để viết hàm shallow/deep copy 1 array.

Ghé thăm [blog](https://duthaho.com) để ủng hộ mình nhé. Chào thân ái và hẹn gặp lại!