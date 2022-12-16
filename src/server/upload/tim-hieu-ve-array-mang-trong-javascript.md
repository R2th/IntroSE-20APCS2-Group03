### Giới thiệu
Hôm nay mình sẽ giới thiệu cho các bạn một kiểu dữ liệu trong Javascript, đó là **Array**. Nó sẽ giúp bạn có thể biểu diễn được những dữ liệu phức tạp và dễ dàng hơn trong việc quản lí cũng như xử lí dữ liệu
#### Vậy Array là gì ?

**Array**, hay được gọi là **mảng**, là kiểu dữ liệu mà giá trị của nó chứa nhiều giá trị khác. Mỗi giá trị của mảng được gọi là *element* (phần tử)

Có 2 cách khai báo Array trong  Javascript:

*  Dùng Array literals - Được biểu diễn bằng dấu ngoặc vuông và theo sau là giá trị rỗng hay một hoặc nhiều giá trị được ngăn cách nhau bằng dấu phẩy
```
var foo = [];
var number = [1, 2, 3, 4, 5];
```
*  Dùng Array constructor - Được khởi tạo bằng sử dụng từ khóa  *'new'*
```
var foo = new Array()
var number = new Array(1, 2, 3, 4, 5);
```
#### Thuộc tính
**length** --- Là thuộc tính đưa ra độ dài của mảng. Nếu bạn dùng một số nguyên âm, số thực hoặc một chuỗi làm chỉ mục thì độ dài của mảng cũng là một số nguyên dương cao nhất.

Ví dụ:
```
var foo = [];
console.log(foo.length) // 0

var number = [1, 2, 3];
number[9] = 9;
number[-3] = 'so am';
number['string'] = 'String';
console.log(number.length); // 10
console.log(number); // [ 1, 2, 3, empty * 6, 9, '-3': 'so am', string: 'String']
```

#### Phương thức
Có nhiều phương thức liên quan đến mảng. Một số phương thức dùng để thay đổi mảng ban đầu ( **Mutator Methods** ) , một vài số dùng để truy cập giá trị, trả về một số giá trị cần thiết và không làm thay đổi mảng hiện có ( **Accessor Methods**  ), phương thức dùng để lặp các phần tử trong mảng ( **Iterator Methods** ), ... Và bây giờ chúng ta sẽ tìm hiểu một số phương thức trên nhé.

**Mutator Methods** 

- `Array.prototype.push()` -- Phương thức thêm một phần tử vào cuối mảng và trả về độ dài của mảng.
```
const number = [1, 2, 3];
number.push(5); // 4
console.log(number) // [1, 2, 3, 5]
```
- `Array.prototype.pop()` -- Phương thức xóa  phần tử cuối của mảng và trả về phần tử đã xóa.
```
const number = [1, 2, 3];
number.pop(); // 3
console.log(number); // [1, 2]
```
- `Array.prototype.shift()` -- Giống như *pop*, phương thức này xóa  phần tử đầu tiên của mảng và trả về phần tử đó.
```
const number = [1, 2, 3];
number.shift(); // 1
console.log(number); // [2, 3]
```
- `Array.prototype.splice()` -- Là phương thức dùng để chèn hoặc xóa đi một hay nhiều phần tử. *splice* có thể có nhiều đổi số, đầu tiên là chỉ số bắt đầu, thứ hai là số phần tử muốn xóa từ đối số thứ nhất ( nếu bằng 0 thì không có phần tử xóa ), tiếp theo các đối số có thể có hoặc không, nếu có chúng sẽ là nhưng phần tử được chèn vào ngay sau vị trí bắt đầu.
```
Syntax
array.splice(start, deleteCount, item1, item2, ...)


var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
days.splice(2,1); //["Tuesday"]
console.log(days); //["Sunday", "Monday", "Wednesday", "Thursday", "Friday"]
days.splice(2,0,'Tuesday');
console.log(days) //["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
```
**Accessor Methods** 
- `Array.prototype.includes()` -- Trả về **true** hoặc **false**, kiểm tra sự tồn tại của phần tử nằm trong mảng.
```
const number = [1, 2, 3, 4];
console.log(number.includes(1)); // true
console.log(number.includes(5)); // false
```
- `Array.prototype.indexOf()` -- Trả về chỉ mục đầu tiên tìm thấy được. Nếu không tìm thấy sẽ trả về **-1** . Nó cũng nhận đối số thứ 2 ( tùy chọn ) để làm vị trí bắt đầu.
```
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
days.indexOf('Tuesday'); //2
days.indexOf('Tuesday', 4); //-1
days.indexOf('March'); //-1
```
- `Array.prototype.join()` -- Là phương thức nối các phần tử của mảng thành một chuỗi. Nó nhận đối số là điểm nối giữa các phần tử với nhau.
```
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
days.join('-');
// Sunday-Monday-Tuesday-Wednesday-Thursday-Friday
```
**Iteration methods** 
- `Array.prototype.filter()` -- Lặp các phần tử trong mảng đã cho và trả về một mảng mới với các phần tử thõa mãn điều kiện lọc. Ví dụ dưới đây dùng *'arrow function'* :
```
var numbers = [1, 34, 5, 2, 67, 46, 24];
number.filter(number => number % 2 === 0)
// [34, 2, 46, 24]
```
- `Array.prototype.map()` -- Tạo một mảng mới với sự biến đổi của các phần tử trong mảng.
```
var numbers = [1, 2, 3, 4, 5];
number.map(number => number * 2)
// [2, 4, 6, 8, 10]
```
- `Array.prototype.find()` -- Trả về một phần tử đầu tiên trong mảng thõa mãn điều kiện tìm kiếm.
```
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
days.find(day => day.length === 6)
// 'Sunday'
```
- `Array.prototype.reduce()` -- Là phương thức phức tạp hơn các phương thức còn lại. Nó duyệt qua các phần tử trong mảng và gọi một callback trên mỗi phần tử, các giá trị trả về sẽ truyền từ callback này sang callback khác, cuối cùng trả về giá trị sau khi duyệt đến cuối mảng.
```
var frui = [
    { name: 'apple', price: 10 },
    { name: 'orange', price: 50 },
    { name: 'tomato', price: 150 }, 
    { name: 'coconut', price: 80 },
    { name: 'pear', price: 200 },
];

frui.reduce((total, item) => {
    if (item.price > 50) {
        return total + item.price;
    }
    return total;
}, 0)
```
`map()`, `filter()`, `find()`, `reduce()` là các phương thức rất mạnh mẽ để tìm kiếm, biến đổi cũng như xử lí dữ liệu. Chúng làm code của bạn dễ hiểu, không dài dòng, dễ bảo trì hơn.
### Kết luận

Còn rất nhiều phương thức cũng như tính chất của mảng mà mình chưa kịp nêu hết. Hi vọng bài chia sẻ trên sẽ giúp các bạn mới bắt đầu với mảng trong Javascript dễ tiếp cận hơn.

**Tài liệu tham khảo**: [Array In JavaScript](https://codeburst.io/all-about-javascript-arrays-44d2d36874b9)