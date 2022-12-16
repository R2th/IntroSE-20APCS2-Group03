## Giới thiệu
Mảng là một trong những khái niệm phổ biến nhất về Javascript, nó cung cấp cho chúng ta rất nhiều khả năng để làm việc với dữ liệu được lưu trữ bên trong. Thao tác với mảng là chủ đề cơ bản nhất trong Javascript mà bạn cần tìm hiểu khi bắt đầu con đường lập trình của mình, trong bài viết này, tôi muốn chỉ cho bạn một vài thủ thuật có thể bạn chưa biết nhưng chúng rất hay và hữu ích. Bắt đầu nào :grinning::grinning:.
### 1. Loại bỏ phần tử trùng lặp từ 1 mảng
Một trong những câu hỏi phỏng vấn rất phổ biến về mảng Javascript, làm thế nào để trích xuất các giá trị duy nhất từ mảng Javascript. Đây là một giải pháp nhanh chóng và dễ dàng cho vấn đề này, bạn có thể sử dụng new **Set()** để giải quyết vấn đề này. Và tôi muốn chỉ cho bạn hai cách có thể để làm điều đó, một cách với phương thức **.from()** và cách thứ hai với toán tử **(…)**.
```javascript
var fruits = [“banana”, “apple”, “orange”, “watermelon”, “apple”, “orange”, “grape”, “apple”];

// First method
var uniqueFruits = Array.from(new Set(fruits));
console.log(uniqueFruits); // returns [“banana”, “apple”, “orange”, “watermelon”, “grape”]

// Second method
var uniqueFruits2 = […new Set(fruits)];
console.log(uniqueFruits2); // returns [“banana”, “apple”, “orange”, “watermelon”, “grape”]
```
 
###  2. Thay thế giá trị cụ thể trong 1 mảng
Đôi khi, bạn cần thay thế một giá trị cụ thể trong mảng trong khi lập trình và có một phương pháp ngắn để làm điều đó mà bạn có thể chưa biết. Chúng tôi có thể sử dụng **.splice** (start, value to remove, valueToAdd) và truyền cả ba tham số chỉ định: nơi chúng ta muốn bắt đầu sửa đổi, có bao nhiêu giá trị chúng tôi muốn thay đổi và các giá trị mới.
```javascript
var fruits = [“banana”, “apple”, “orange”, “watermelon”, “apple”, “orange”, “grape”, “apple”];
fruits.splice(0, 2, “potato”, “tomato”);
console.log(fruits); // returns [“potato”, “tomato”, “orange”, “watermelon”, “apple”, “orange”, “grape”, “apple”]
```
### 3. Duyệt mảng không dùng .map()
Có lẽ mọi người đều biết phương thức **.map()** của mảng, nhưng có một giải pháp khác có thể được sử dụng để có được hiệu quả tương tự và rất "clean code". Chúng ta có thể sử dụng phương thức **.from ()**
```javascript
var friends = [
    { name: ‘John’, age: 22 },
    { name: ‘Peter’, age: 23 },
    { name: ‘Mark’, age: 24 },
    { name: ‘Maria’, age: 22 },
    { name: ‘Monica’, age: 21 },
    { name: ‘Martha’, age: 19 },
]

var friendsNames = Array.from(friends, ({name}) => name);
console.log(friendsNames); // returns [“John”, “Peter”, “Mark”, “Maria”, “Monica”, “Martha”]
```
### 4. Làm trống 1 mảng nhanh chóng
Bạn có một mảng đầy đủ các yếu tố nhưng bạn cần phải làm sạch nó cho bất kỳ mục đích nào và bạn không muốn xóa từng mục một? Nó rất đơn giản để làm điều đó trong một dòng lệnh. Để làm trống một mảng, bạn cần đặt chiều dài của mảng thành 0 :smile:
```javascript
var fruits = [“banana”, “apple”, “orange”, “watermelon”, “apple”, “orange”, “grape”, “apple”];

fruits.length = 0;
console.log(fruits); // returns []
```
### 5. Chuyển đổi mảng thành 1 đối tượng
Giả sử chúng ta có một mảng, nhưng với mục đích nào đó, chúng ta cần một đối tượng với dữ liệu này và cách nhanh nhất để chuyển đổi mảng thành đối tượng là sử dụng toán tử **(...)**
```javascript
var fruits = [“banana”, “apple”, “orange”, “watermelon”];
var fruitsObj = { …fruits };
console.log(fruitsObj); // returns {0: “banana”, 1: “apple”, 2: “orange”, 3: “watermelon”, 4: “apple”, 5: “orange”, 6: “grape”, 7: “apple”}
```
### 6. Điền mảng với giá trị
Có một số tình huống khi chúng ta tạo một mảng và chúng ta muốn điền nó với một số dữ liệu hoặc chúng ta cần một mảng có cùng các giá trị và trong trường hợp này, phương thức **.fill()** mang đến với một giải pháp dễ dàng và "sạch sẽ".
```javascript
var newArray = new Array(10).fill(“1”);
console.log(newArray); // returns [“1”, “1”, “1”, “1”, “1”, “1”, “1”, “1”, “1”, “1”, “1”]
```
### 7. Hợp nhất mảng
Bạn có biết cách hợp nhất các mảng thành một mảng mà không sử dụng phương thức **.concat ()** không? Có một cách đơn giản để hợp nhất nhiều mảng thành một trong một dòng lệnh. Như bạn có thể nhận ra toán tử **(...)** khá hữu ích khi làm việc với các mảng và nó cũng giống như vậy trong trường hợp này.
```javascript
var fruits = [“apple”, “banana”, “orange”];
var meat = [“poultry”, “beef”, “fish”];
var vegetables = [“potato”, “tomato”, “cucumber”];
var food = […fruits, …meat, …vegetables];
console.log(food); // [“apple”, “banana”, “orange”, “poultry”, “beef”, “fish”, “potato”, “tomato”, “cucumber”]
```
### 8. Tìm những phần tử chung của 2 mảng
Nó cũng là một trong những thách thức phổ biến nhất mà bạn có thể gặp phải trong bất kỳ cuộc phỏng vấn Javascript nào vì nó cho thấy nếu bạn có thể sử dụng các phương thức mảng và logic của bạn là gì. Để tìm giao điểm của hai mảng, chúng ta sẽ sử dụng một trong các phương thức được hiển thị trước đó trong bài viết này, để đảm bảo rằng các giá trị trong mảng mà chúng ta đang kiểm tra không bị trùng lặp và chúng ta sẽ sử dụng phương thức **.filter** và phương thức **.includes** . Kết quả là, sẽ có được mảng với các giá trị xuất hiện trong cả hai mảng.
```javascript
var numOne = [0, 2, 4, 6, 8, 8];
var numTwo = [1, 2, 3, 4, 5, 6];
var duplicatedValues = […new Set(numOne)].filter(item => numTwo.includes(item));
console.log(duplicatedValues); // returns [2, 4, 6]
```
### 9. Loại bỏ các giá trị "giả" từ một mảng
Lúc đầu, hãy để xác định giá trị giả. Trong Javascript, các giá trị giả là *false, 0, „”, null, NaN, undefined*. Bây giờ chúng ta có thể tìm hiểu làm thế nào để loại bỏ loại giá trị này khỏi mảng của chúng ta. Để làm được điều này, chúng ta sẽ sử dụng phương thức** .filter().**
```javascript
var mixedArr = [0, “blue”, “”, NaN, 9, true, undefined, “white”, false];
var trueArr = mixedArr.filter(Boolean);
console.log(trueArr); // returns [“blue”, 9, true, “white”]
```
### 10. Lấy giá trị ngẫu nhiên từ 1 mảng
Đôi khi chúng ta cần chọn một giá trị từ mảng một cách ngẫu nhiên. Để tạo nó một cách dễ dàng, nhanh chóng và ngắn gọn và giữ cho mã của chúng ta sạch sẽ, chúng ta có thể lấy một số chỉ mục ngẫu nhiên theo độ dài mảng. Hãy xem ví dụ bên dưới:
```javascript
var colors = [“blue”, “white”, “green”, “navy”, “pink”, “purple”, “orange”, “yellow”, “black”, “brown”];
var randomColor = colors[(Math.floor(Math.random() * (colors.length + 1)))]
```
### 11. Đảo ngược 1 mảng
Khi chúng ta cần đảo ngược mảng của chúng ta, không cần phải tạo nó thông qua các vòng lặp và hàm phức tạp, có một phương thức mảng dễ dàng thực hiện tất cả cho chúng ta và với một dòng lệnh. Hãy xem ví dụ:
```javascript
var colors = [“blue”, “white”, “green”, “navy”, “pink”, “purple”, “orange”, “yellow”, “black”, “brown”];
var reversedColors = colors.reverse();
console.log(reversedColors); // returns [“brown”, “black”, “yellow”, “orange”, “purple”, “pink”, “navy”, “green”, “white”, “blue”]
```
### 12. Phương thức .lastIndexOf()
Trong Javascript, có một phương thức thú vị cho phép tìm chỉ mục của lần xuất hiện cuối cùng của phần tử đã cho. Ví dụ: nếu mảng của chúng ta có các giá trị trùng lặp, chúng ta có thể tìm thấy vị trí xuất hiện cuối cùng của nó.
```javascript
var nums = [1, 5, 2, 6, 3, 5, 2, 3, 6, 5, 2, 7];
var lastIndex = nums.lastIndexOf(5);
```
### 13. Tính tổng tất cả các giá trị trong mảng
Một thách thức khác xảy ra rất thường xuyên trong các cuộc phỏng vấn Javascript.Nó có thể được giải quyết bằng phương thức **.reduce()** trong một dòng lệnh.
```javascript
var nums = [1, 5, 2, 6];
var sum = nums.reduce((x, y) => x + y);
console.log(sum); // returns 14
```
## Kết Luận
Trong bài viết này, tôi đã trình bày cho bạn 13 thủ thuật và mẹo có thể giúp code của bạn ngắn gọn và sạch sẽ. Ngoài ra, hãy nhớ có rất nhiều thủ thuật khác nhau mà bạn có thể sử dụng trong Javascript đáng để khám phá, không chỉ về mảng mà cả các loại dữ liệu khác nhau. Tôi hy vọng bạn thích các giải pháp được cung cấp trong bài viết và bạn sẽ sử dụng chúng để cải thiện quá trình phát triển của mình.<br>
Bài viết được dịch và tham khảo tại đây: https://www.blog.duomly.com/13-useful-javascript-array-tips-and-tricks-you-should-know/