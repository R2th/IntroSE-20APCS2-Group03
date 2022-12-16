Hi các bạn, tiếp tục chuỗi chủ đề bàn luận về JavaScript hôm nay mình sẽ tiếp tục chia sẻ đến các bạn các thủ thuật khi làm việc cùng JS để tối ưu hóa hiệu suất công việc cũng như tạo các "helpers" xịn xò nhất để sẵn sàng đánh chiếm các dự án lớn. Cụ thể như nào thì hãy cùng kéo xuống dưới để tìm hiểu cùng mình nhé (go)

![](https://images.viblo.asia/6611729b-963a-4846-9fd5-0f74804be878.png)

### 1. Lọc các giá trị unique trong mảng

Trong ES6 đã giới thiệu đến `Set`, ẻm này có tác dụng loại bỏ các giá trị trùng lặp trong mảng, kết hợp với `spread operator` bạn có thể tạo ra 1 mảng mới gồm những giá trị unique

```js
const myArray = ['a', 1, 'a', 2, '1'];
const unique = [...new Set(myArray)];

console.log(unique); // > ['a', 1, 2, '1']
```
Cách này sẽ đáp ứng được với các dữ liệu `undefined`, `null`, `boolean`, `string`, `number`. Trường hợp array phức tạp chứa object thì ta phải tìm phương án khác :  ))

Trong trường hợp bạn muốn sử dụng với ES5 thì 1 cách khác đó là sử dụng `filter`, tại đây ta sẽ lặp qua từng phần tử trong mảng để kiếm tra nó đã tồn tại hay chưa để return vào 1 array mới

```js
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const myArray = ['a', 1, 'a', 2, '1'];
const unique = myArray.filter(onlyUnique);

console.log(unique); // > ['a', 1, 2, '1']
```

### 2. Convert kiểu sang Boolean

Khi nhắc đến `boolean` ta sẽ liên tưởng đến hai giá trị `true` và `false`.  Trong JS có tồn tại 2 khái niệm `truthy` và `falsy`, falsy bao gồm các giá trị `false`, `0`, `-0`, `0n`, `''`, `null`, `undefined`, `NaN`, `document.all` các giá trị còn lại không phải falsy thì được coi là truthy

Trong JS để ép kiểu sang Boolean ta sẽ dùng dấu `!` đại diện cho phép phủ định

```js
const isTrue  = !0;
const isFalse = !1;

console.log(isTrue);  // > true
console.log(isFalse); // > false
```

1 cách nữa đó là sử dụng hàm `Boolean()` có sẵn trong js (xem thêm về [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean))

```js
let str = '100';
console.log(Boolean(str)); // > true
```

### 3. Convert kiểu sang String

Trong JS để convert sang String bạn chỉ cần cộng giá trị với `''` hoặc sử dụng template string trong ES6

```JS
const val_1 = 1 + "";
const val_2 = `${1}`; // ES6

console.log(val_1); // > "1"
console.log(val_2); // > "1"

console.log(typeof val_1); // > "string"
console.log(typeof val_2); // > "string"
```

1 cách nữa đó là sử dụng hàm `String()` có sẵn trong js (xem thêm về [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))

```js
let str = 100;
console.log(String(str)); // > '100'
```

### 4. Convert kiểu sang Number

Để convert kiểu sang Number ta sẽ sử dụng toán tử `+`

```js
let int = "100";
int = +int;

console.log(int); // > 100
console.log(typeof int); // > "number"

console.log(+true);  // > 1
console.log(+false); // > 0
console.log(+null); // > 0
console.log(+''); // > 0
```

1 cách nữa đó là sử dụng hàm `Number()` có sẵn trong js (xem thêm về [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number))

```js
let int = "100";
console.log(Number(int)); // > 100
```

Ngoài ra ta có thể sử dụng 2 toán tử `~` (toán tử phủ định bitwise). Xem ví dụ sau

```js
let int = ~~'100';

console.log(int); // > 100
console.log(typeof int); // > "number"
```

Nhìn khó hiểu đúng không, công thức của nó sẽ là `~n = -n - 1`. Như vậy ví dụ trên sẽ được giải thích như sau

```js
let int = ~'100'; // -100 - 1 = -101
int = ~int; // -(-101) - 1 = 100

console.log(int); // > 100
console.log(typeof int); // > "number"
```

### 5. Tính luỹ thừa

Trước đây để tính luỹ thừa ta sẽ sử dụng hàm `Math.pow()`

```js
const result = Math.pow(5, 3); // 5^3 = 125
console.log(result); // > 125
```

Kể từ khi ES7 được phát hành, bạn có thể dùng 2 dấu `**` để thay thế, vì sao ư :v vì hiệu năng của nó nhanh hơn

```js
const result = 5 ** 3;
console.log(result); // > 125
```


### 6. Convert Float to Integer

Để convert kiểu dữ liệu float sang int thông thường ta sẽ sử dụng 1 số hàm có sẵn như `Math.floor()`, `Math.ceil()`, `Math.round()`. Tuy nhiên có 1 cách nhanh hơn đó là sử dụng `|` (toán tử OR trong bitwise)

```js
console.log(100.1001 | 0); // > 100
console.log(-100.1001 | 0); // > -100
```

Giải thích như sau: Nếu n dương thì `n | 0` làm tròn xuống. Nếu n âm thì `n | 0` làm tròn lên. Nói một cách chính xác hơn, thao tác này sẽ loại bỏ bất cứ thứ gì đứng sau dấu thập phân, cắt bớt một số thực cho một số nguyên.

1 ứng dụng nữa của toán tử này đó là 'cắt chuỗi'. Đây là thứ ta thường làm để loại bỏ bớt đi n kí tự trong chuỗi/số

```js
let str = '1001'; 
console.log(Number(str.substring(0, str.length - 1))); // > 100
```

Còn khi sử dụng `|` nó sẽ như này
```js
let str = '1001'; 
console.log(Number(str) / 10 | 0);   // > 100 (cắt 1 kí tự)
console.log(Number(str) / 100 | 0);  // > 10  (cắt 2 kí tự)
console.log(Number(str) / 1000 | 0); // > 1   (cắt 3 kí tự)
```

Nhìn ngon đúng không =))

### 7. Các giá trị mặc định dùng operator ||

Trong ES6 hiện tại có feature `default argument`. Để mô phỏng feature này bạn có thể dùng `||` (OR operator) bằng cách đưa default value như một param thứ hai. Nếu param đầu tiên trả về `false` thì param thứ 2 sẽ được dùng như default value. 

```js
function User(name, age) {
  this.name = name || 'Oliver Queen';
  this.age = age || 27;
}

const user1 = new User();
console.log(user1.name); // > Oliver Queen
console.log(user1.age);  // > 27

const user2 = new User('Barry Allen', 25);
console.log(user2.name); // > Barry Allen
console.log(user2.age);  // > 25
```

### 8. Convert NodeList thành Array

Trong DOM API chắc bạn đã nhiều lần phải dùng đến `document.querySelectorAll()`. Khi ta chạy function này, nó trả về một array các DOM element là một object NodeList

Nhưng object này không có tất cả các method của array như `sort()`, `reduce()`, `map()`, `filter()`...  Và đây là cách ta hay dùng để convert NodeList thành Array

```js
const elements = document.querySelectorAll('p'); // NodeList

const arrayElements = [].slice.call(elements); // Now the NodeList is an array
const arrayElements = Array.from(elements);    // This is another way of converting NodeList to Array
```

### Kết luận

Trên đây mình tiếp tục giới thiệu đến các bạn các thủ thuật khi làm việc với JavaScript, hi vọng sẽ giúp ích cho các bạn trong quá trình làm việc, nghiên cứu

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn. Chúc bạn thành công và hẹn gặp lại ở bài viết sau nhé !