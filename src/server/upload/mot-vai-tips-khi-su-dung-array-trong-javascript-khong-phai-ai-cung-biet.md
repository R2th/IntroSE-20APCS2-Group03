# 1, Xóa phần tử trùng nhau trong mảng
```javascript
var fruits = [“banana”, “apple”, “orange”, “watermelon”, “apple”, “orange”, “grape”, “apple”];
// Cách 1:
var uniqueFruits = Array.from(new Set(fruits));
// returns [“banana”, “apple”, “orange”, “watermelon”, “grape”]
// Cách 2:
var uniqueFruits2 = […new Set(fruits)];
// returns [“banana”, “apple”, “orange”, “watermelon”, “grape”]
```

Ở cách số 2 chắc hẳn nhiều bạn sẽ thắc mắc đoạn `[...new Set(fruits)]` cái (...) trong đoạn code này là cái quái quỷ gì vậy. Thật ra nó chỉ là một chức năng khá mới trong ES6 được gọi là `Spread Operator`, nếu bạn nào từng tiếp xúc với Ruby sẽ thấy nó khá giống với `Splat Operator`.  Spread Operator cho phép chuyển đổi một chuỗi thành nhiều argument (trong trường hợp gọi với hàm) hoặc thành nhiều phần tử (cho array). 
<br>
Ví dụ trực quan cho các bạn dễ hiểu.
```javascript
var arr1 = [1,2,3,4];
var arr2 = [5,6,7];
//Bình thường muốn nối 2 mảng bạn có thể sử dụng:
arr1.concat(arr2);
// Nhưng nếu sử dụng spread operator
[...arr1, ...arr2]
```
Ngoài ra Spread Operator này cũng có vài tác dụng khá hay các bạn tự tìm hiểu thêm nhé.

# 2, Thay thế các giá trị trong mảng
```javascript
var fruits = [“banana”, “apple”, “orange”, “watermelon”, “apple”, “orange”, “grape”, “apple”];
fruits.splice(0, 2, “potato”, “tomato”);
// returns [“potato”, “tomato”, “orange”, “watermelon”, “apple”, “orange”, “grape”, “apple”]
```
Phương thức splice () thêm / xóa các items vào một mảng và trả về items đã xóa.
`splice(start, value to remove, valueToAdd)`

# 3, Vòng lặp trong mảng
Ví dụ có 1 mảng sau:
```javascript
var friends = [
    { name: ‘John’, age: 22 },
    { name: ‘Peter’, age: 23 },
    { name: ‘Mark’, age: 24 },
    { name: ‘Maria’, age: 22 },
    { name: ‘Monica’, age: 21 },
    { name: ‘Martha’, age: 19 },
]
```
Giờ muốn lấy ra 1 mảng chứa tên, bình thường nhiều bạn sẽ làm như cách thông thường đó là dùng vòng lặp for như sau.
```javascript
arr = [];
for(var i=0; i< friends.length; i++)
{
	arr.push(friends[i].name);
}
console.log(arr);
```
Có 1 cách sử dụng nhanh hơn đó là sử dụng `.map()`.
```javascript
var friend_names = friends.map((fr, index, friends) => {
    return fr.name;
});
console.log(friend_names); 
```
Nhanh hơn đúng không các bạn.
<br>
Hàm map() nhận vào 3 tham số (theo thứ tự):

* Phần tử hiện tại của mảng.
<br>
* Chỉ số của phần tử hiện tại trong mảng.
<br>
* Mảng ban đầu.

Còn một cách tương tự như method `.map()` đó là method `.from()`.
```javascript
var friendsNames = Array.from(friends, ({name}) => name);
console.log(friendsNames);
```
# 4, Trả về mảng rỗng
Bạn có một mảng đầy đủ các elements nhưng bạn cần làm "sạch" nó cho bất kỳ mục đích nào và bạn không muốn xóa từng mục một?
Quá easy
```javascript
var fruits = [“banana”, “apple”, “orange”, “watermelon”, “apple”, “orange”, “grape”, “apple”];


fruits.length = 0;
console.log(fruits); // returns []
```
# 5, Chuyển array thành object
Nếu bạn muốn sử dụng một object thay vì kiểu mảng cho trước đơn giản bạn có thể sử dụng `Spread Operator` mình vừa giới thiệu ở trên.
```javascript
var fruits = [“banana”, “apple”, “orange”, “watermelon”];
var fruitsObj = { …fruits };
console.log(fruitsObj); // returns {0: “banana”, 1: “apple”, 2: “orange”, 3: “watermelon”, 4: “apple”, 5: “orange”, 6: “grape”, 7: “apple”}
```
Không thì bạn có thể sử dụng như sau:
```javascript
var fruits = [“banana”, “apple”, “orange”, “watermelon”];
Object.assign({}, fruits)
```
Đây đều là 2 cách sử dụng cú pháp trong ES6.

# 6, Tạo một mảng các giá trị giống nhau
Ở đây mình giới thiệu với các bạn một method mà mình cũng mới biết đó là method `.fill()`
```javascript
var newArray = new Array(10).fill(“1”);
console.log(newArray); // returns [“1”, “1”, “1”, “1”, “1”, “1”, “1”, “1”, “1”, “1”, “1”]
```
# 7, Gộp mảng
Có rất nhiều cách để gộp mảng lại với nhau như sử dụng vòng for rồi push thêm phần thử, hay sử dụng hàm `.concat()` đều được.
Nhưng có một cách mà mình đã nói qua ở trên đó là sử dụng `Spread Operator`.
```javascript
var fruits = [“apple”, “banana”, “orange”];
var meat = [“poultry”, “beef”, “fish”];
var vegetables = [“potato”, “tomato”, “cucumber”];
var food = […fruits, …meat, …vegetables];
console.log(food); // [“apple”, “banana”, “orange”, “poultry”, “beef”, “fish”, “potato”, “tomato”, “cucumber”]
```
# 8, Tìm các phần tử trùng nhau trong 2 mảng cho trước.
```javascript
var numOne = [0, 2, 4, 6, 8, 8];
var numTwo = [1, 2, 3, 4, 5, 6];
var duplicatedValues = […new Set(numOne)].filter(item => numTwo.includes(item));
console.log(duplicatedValues); // returns [2, 4, 6]
```
Ở đây có sử dụng method `.filter()` hiểu nôm na là bạn sẽ được trả về một mảng các giá trị theo điều kiện nào đó. Và method `.includes()` đơn giản chỉ kiểm tra xem giá trị của 1 phần tử nào đó có nằm trong mảng hay không.
# 9, Loại bỏ các giá trị đó theo điều kiện
```javascript
var mixedArr = [0, “blue”, “”, NaN, 9, true, undefined, “white”, false];
var trueArr = mixedArr.filter(Boolean);
console.log(trueArr); // returns [“blue”, 9, true, “white”]
```
Đơn giản bạn chỉ cần sử dụng hàm `.filter()` như mình đã giải thích ở trên.
# 10, Lấy random 1 phần tử trong mảng
```javascript
var colors = [“blue”, “white”, “green”, “navy”, “pink”, “purple”, “orange”, “yellow”, “black”, “brown”];
var randomColor = colors[(Math.floor(Math.random() * (colors.length)))]
```
# 11, Đảo ngược mảng
Khi muốn đảo ngược một mảng, nếu là một người mới bắt đầu học lập trình bạn sẽ sử dụng vòng for để rồi duyệt từ phần tử cuối đến phần tử đầu tiên. Nhưng để đơn giản hơn javascript đã sinh ra một method ngắn gọn là `reverse()`.
```javascript
var colors = [“blue”, “white”, “green”, “navy”, “pink”, “purple”, “orange”, “yellow”, “black”, “brown”];
var reversedColors = colors.reverse();
console.log(reversedColors); // returns [“brown”, “black”, “yellow”, “orange”, “purple”, “pink”, “navy”, “green”, “white”, “blue”]
```
# 12, Tìm vị trí xuất hiện cuối cùng của một phần tử trong mảng.
Chỉ cần sử dụng `lastIndexOf()` là xong.
```javascript
var nums = [1, 5, 2, 6, 3, 5, 2, 3, 6, 5, 2, 7];
var lastIndex = nums.lastIndexOf(5);
console.log(lastIndex); // returns 9
```
# 13, Tính tổng value trong mảng
Với một cách dễ nhất đó là sử dụng vòng for. Ví dụ
```javascript
var nums = [1, 5, 2, 6];
var total=0;
for(var i=0;i<nums.length; i++)
    total += nums[i];
console.log(total); // return 14
```
Đây là sử dụng thông thường, còn một cách nữa đó là sử dụng method `.reduce()`. Bạn có thể sử dụng hàm là từ những giá trị có sẵn trong mảng tạo ra một giá trị mới hoàn toàn. Như ở đây là bài tính tổng
```javascript
var nums = [1, 5, 2, 6];
var sum = nums.reduce((x, y) => x + y);
console.log(sum);
```
`.reduce()` có thể nhận nhiều tham số truyền vào. Trong trường hợp trên
* Tham số thứ nhất là giá trị khởi tạo, thường thường ta sẽ sét giá trị này ở cuối hàm
* Tham số thứ hai là phần tử hiện tại trong mảng

# Kết luận
Trên đây là vài cách để các bạn có thể dễ dàng sử dụng array trong javascript.
### Tài liệu tham khảo [tại đây](https://dev.to/duomly/13-useful-javascript-array-tips-and-tricks-you-should-know-2jfo)