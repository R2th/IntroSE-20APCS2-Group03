Array là một trong những khái niệm phổ biến nhất về Javascript, nó cung cấp cho chúng ta rất nhiều khả năng để làm việc với dữ liệu được lưu trữ bên trong. Array là một trong những chủ đề cơ bản nhất trong Javascript bạn nên tìm hiểu khi bắt đầu con đường lập trình của mình, trong bài viết này tôi muốn chỉ cho bạn một vài thủ thuật mà bạn có thể không biết và rất hữu ích trong công việc. Bắt đầu nào!
![](https://images.viblo.asia/a3b4686e-a711-4943-9b75-1fbb06cab1ba.png)

### 1. Loại bỏ phần tử trùng lặp trong array.
Đây là một câu hỏi rất phổ biến khi phỏng vấn, làm như thế nào để trích xuất các giá trị duy nhất trong Array, có một cách nhanh chóng và dễ dàng cho vấn đề này là bạn có thể sử dụng **Set()**  để giải quyết.  Và trong ví dụ này tôi muốn chỉ cho bạn 2 cách đó là sử dụng **.from()** và **spread operator**. Hãy viết lại những đoạn code này để xem kết quả nhé :D 
```js
var fruits = [“banana”, “apple”, “orange”, “watermelon”, “apple”, “orange”, “grape”, “apple”];

var uniqueFruits = Array.from(new Set(fruits));
console.log(uniqueFruits); 

var uniqueFruits2 = [...new Set(fruits)];
console.log(uniqueFruits2); 
```
### 2. Thay thế một giá trị cụ thể trong array.
Đôi khi, vì yêu cầu của một bài toán mà bạn cần phải thay thế một giá trị nào đó trong array và tôi có một phương pháp hay để làm điều đó mà bạn có thể chưa biết. Đó là sử dụng **.splice()**, đây là một hàm nhận vào 3 tham số từ trái qua phải, vị trí đầu tiên bạn muốn thay thế, vị trí cuối cùng và giá trị bạn muốn thêm vào.
```js
var fruits = [“banana”, “apple”, “orange”, “watermelon”, “apple”, “orange”, “grape”, “apple”];
fruits.splice(0, 2, “potato”, “tomato”);
console.log(fruits); 
```
### 3. Map một array mà không sử dụng .map().
Có lẽ mọi người đều biết phương thức **.map()** của array, nhưng có một giải pháp khác có thể được sử dụng để có được hiệu ứng tương tự và code trông rất sạch. Chúng ta có thể sử dụng phương thức **.from()** cho mục đích này.
```js
var friends = [
    { name: ‘John’, age: 22 },
    { name: ‘Peter’, age: 23 },
    { name: ‘Mark’, age: 24 },
    { name: ‘Maria’, age: 22 },
    { name: ‘Monica’, age: 21 },
    { name: ‘Martha’, age: 19 },
]

var friendsNames = Array.from(friends, ({name}) => name);
console.log(friendsNames);
```
### 4. Làm trống một array.
Bạn có một array với hàng tá element và bạn lại muốn xoá tất cả không còn một phần tử nào nhưng lại không muốn phải xoá từng phần tử một cách vất cả thì phải như thế nào ? Hãy sử dụng **.length()**.
```js
var fruits = [“banana”, “apple”, “orange”, “watermelon”, “apple”, “orange”, “grape”, “apple”];

fruits.length = 0;
console.log(fruits);
```
### 5. Convert một array sang một object.
Vì một mục đích nào đó, bạn muốn chuyển một array sang một object một cách nhanh nhất, **spread operator (…)** sẽ giúp bạn, kết quả trả về sẽ là **array like object**
```js
var fruits = [“banana”, “apple”, “orange”, “watermelon”];
var fruitsObj = { ...fruits };
console.log(fruitsObj);
```
### 6. Tạo một array với nhiều phần tử giống nhau.
Có một số tình huống khi chúng ta tạo một mảng và tôi muốn điền nó với một số dữ liệu hoặc tôi cần một mảng có cùng các giá trị và trong trường hợp này, phương thức **.fill()** đi kèm là một giải pháp dễ dàng và sạch sẽ.
```js
var newArray = new Array(10).fill(“1”);
console.log(newArray);
```
### 7. Merge nhiều array với nhau.
Một lần nữa  **spread operator (...)**  lại hoàn thành xuất sắc nhiệm vụ mà không cần sử dụng đến **.concat()**.
```js
var fruits = [“apple”, “banana”, “orange”];
var meat = [“poultry”, “beef”, “fish”];
var vegetables = [“potato”, “tomato”, “cucumber”];
var food = [...fruits, ...meat, ...vegetables];
console.log(food);
```
### 8. Tìm những element giống nhau của 2 arrray.
Đây cũng là một yêu cầu phổ biến mà bạn có thể gặp bất cứ lúc nào trong các cuộc phỏng vấn về Javascript vì nó cho thấy bạn có thể sử dụng các phương thức của mảng và logic của bạn là gì. Để tìm những element giống nhau, tôi sẽ dũng đến các phương thức đã có sẵn bên trên, để đảm bảo các giá trị không trùng lặp tôi sẽ dùng 2 phương thức **.filter()** và **.includes()**.
```js
var numOne = [0, 2, 4, 6, 8, 8];
var numTwo = [1, 2, 3, 4, 5, 6];
var duplicatedValues = [...new Set(numOne)].filter(item => numTwo.includes(item));
console.log(duplicatedValues);
```
### 9. Loại bỏ các giá trị falsy trong array.
Đầu tiên, hãy để xác định giá trị falsy. Trong Javascript, các giá trị falsy là **false, 0, "", null, NaN, undefined**. Bây giờ chúng ta có thể tìm hiểu làm thế nào để loại bỏ loại giá trị này khỏi mảng của chúng ta. Để đạt được điều này, chúng ta sẽ sử dụng phương thức **.filter()**.
```js
var mixedArr = [0, “blue”, “”, NaN, 9, true, undefined, “white”, false];
var trueArr = mixedArr.filter(Boolean);
console.log(trueArr);
```
### 10. Lấy ngẫu nhiên một element từ array.
Đôi khi chúng ta cần chọn một giá trị từ mảng một cách ngẫu nhiên. Để tạo nó một cách dễ dàng, nhanh chóng và ngắn gọn và giữ cho code của tôi sạch sẽ, tôi có thể lấy một số chỉ mục ngẫu nhiên theo độ dài mảng. Hãy để xem đoạn code này:
```js
var colors = [“blue”, “white”, “green”, “navy”, “pink”, “purple”, “orange”, “yellow”, “black”, “brown”];
var randomColor = colors[(Math.floor(Math.random() * (colors.length)))]
````
### 11. Đảo ngược một array.
Khi chúng ta cần lật mảng của chúng ta, không cần phải tạo nó thông qua các vòng lặp và hàm phức tạp, có một phương thức mảng dễ dàng thực hiện tất cả cho chúng ta, và với một dòng code, chúng ta có thể đảo ngược mảng của chúng ta. Hãy thử chạy đoạn code này đi:
```js
var colors = [“blue”, “white”, “green”, “navy”, “pink”, “purple”, “orange”, “yellow”, “black”, “brown”];
var reversedColors = colors.reverse();
console.log(reversedColors);
```
### 12. Phương thức .lastIndexOf()
Trong Javascript, có một phương thức thú vị cho phép tìm **index** của lần xuất hiện cuối cùng của phần tử đã cho. Ví dụ: nếu mảng của chúng ta có các giá trị trùng lặp, chúng ta có thể tìm thấy vị trí xuất hiện cuối cùng của nó. Hãy để xem ví dụ bên dưới:
```js
var nums = [1, 5, 2, 6, 3, 5, 2, 3, 6, 5, 2, 7];
var lastIndex = nums.lastIndexOf(5);
console.log(lastIndex);
```
### 13. Tính tổng tất cả các giá trị bên trong array.
Một yêu cầu khác xảy ra rất thường xuyên trong các cuộc phỏng vấn  Javascript. Không có gì đáng sợ đến đây, nó có thể được giải quyết bằng phương thức **.reduce()** trong một dòng lệnh.
```js
var nums = [1, 5, 2, 6];
var sum = nums.reduce((x, y) => x + y);
console.log(sum);
```
### The end
Trong bài viết này, tôi đã trình bày cho bạn 13 mẹo và thử thuật có thể giúp bạn viết code và giữ cho code của bạn ngắn gọn và sạch sẽ. Ngoài ra, hãy nhớ có rất nhiều thủ thuật khác nhau mà bạn có thể sử dụng trong Javascript đáng để khám phá, không chỉ về mảng mà cả các loại dữ liệu khác. Tôi hy vọng bạn thích các giải pháp được cung cấp trong bài viết và bạn sẽ sử dụng chúng để cải thiện quá trình phát triển của mình.

Have a nice coding!
### Tham khảo: 
* [Dev.to](https://dev.to/duomly/13-useful-javascript-array-tips-and-tricks-you-should-know-2jfo?fbclid=IwAR2LfHfwaXbqzNotCDmDzVHVOUI5b1BLzigg2EL4jjF-gnoFCYO_sk8HWsg)