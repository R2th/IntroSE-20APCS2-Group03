# Converting to Boolean sử dụng toán tử !!
*  Thỉnh thoảng chúng  ta cần check sự tồn tại của một biến hoặc giá trị hợp lệ của biến.
*  Sử dụng  !! variable , sẽ tự động chuyển đổi bất kỳ loại dữ liệu nào thành boolean và biến này sẽ chỉ trả về false nếu nó có một số giá trị sau: 0, null, "", undefined hoặc NaN, nếu không, nó sẽ trả về đúng .
*  Ví dụ :
```js
function Account(cash) {
    this.cash = cash;
    this.hasMoney = !!cash;
}

var account = new Account(100.50);
console.log(account.cash); // 100.50
console.log(account.hasMoney); // true

var emptyAccount = new Account(0);
console.log(emptyAccount.cash); // 0
console.log(emptyAccount.hasMoney); // false
```
* Trong trường hợp nếu **account.cash** có giá trị lớn hơn 0 nó sẽ trả về **true**;
# Converting to Number sử dụng toán tử +
* This magic is awesome. Và nó rất đơn giản để làm nhưng nó chỉ hoạt động với số chuỗi, nếu không, nó sẽ trả về NaN (Not a Number)
* Ví dụ 
```js
function toNumber(strNumber) {
    return +strNumber;
}
console.log(toNumber("1234")); // 1234
console.log(toNumber("ACB")); // NaN
This magic will work with Date too and, in this case, it will return the timestamp number:
console.log(+new Date()) // 1461288164385
```
# Short-Circuit Conditionals
* Ta có một đoạn code đơn giản như sau:
```js
if (connected) {
    login();
}
```
* Chúng ta có thể rút ngắn nó bằng cách kết hợp một biến và một function sử dụng toán tử &&
* Ví dụ, chúng ta có thể rút ngắn đoạn code trên như sau:
```js
connected && login();
```
* Chúng ta có thể làm tương tự để check một attribute hoặc function có tồn tại hay không, ví dụ
```js
user && user.login();
```
# Giá trị default sử dụng toán tử ||
* Sử dụng toán tử || (OR operator) để set giá trị mặc định như một tham số thứ 2 được sử dụng
* Nếu tham sô thứ nhất return false, tham số mặc định thứ 2 sẽ được sử sụng, ví dụ:
```js
function User(name, age) {
    this.name = name || "Oliver Queen";
    this.age = age || 27;
}
var user1 = new User();
console.log(user1.name); // Oliver Queen
console.log(user1.age); // 27
var user2 = new User("Barry Allen", 25);
console.log(user2.name); // Barry Allen
console.log(user2.age); // 25
```
# Caching the array.length in the Loop
* Mẹo này rất đơn giản và gây ra tác động rất lớn đến hiệu suất khi xử lý các mảng lớn trong một vòng lặp. Về cơ bản, hầu hết mọi người đều viết điều này một cách đồng bộ để lặp lại một mảng:
```js
for(var i = 0; i < array.length; i++) {
    console.log(array[i]);
}
```
* Nếu bạn làm việc với các mảng nhỏ thì ok, nhưng nếu bạn xử lý các mảng lớn, mã này sẽ tính toán lại kích thước của một mảng trong mỗi lần lặp của vòng lặp này và điều này sẽ gây ra một số độ trễ.
* Để tránh việc này, bạn có thể lưu trữ **array.length** trong một biến để sử dụng nó, thay vì gọi **array.length** mỗi lần trong vòng lặp:
```js
var length = array.length;
for(var i = 0; i < length; i++) {
    console.log(array[i]);
}
```
* Hoặc bạn có thể dùng như này:
```js
for(var i = 0, length = array.length; i < length; i++) {
    console.log(array[i]);
}
```
# Lấy ra phần tử cuối của mảng
* Array.prototype.slice (begin, end) có khả năng cắt các mảng khi bạn đặt các đối số begin và end
* Nhưng nếu bạn không đặt đối số end, hàm sẽ tự động set giá trị max của mảng.
* Có thể bạn đã sử dụng hàm slice, nhưng ít người biết rằng hàm này có thể accept các giá trị âm và nếu đặt số âm làm đối số bắt đầu, bạn sẽ nhận được các phần tử cuối cùng từ mảng:
```js
var array = [1,2,3,4,5,6];
console.log(array.slice(-1)); // [6]
console.log(array.slice(-2)); // [5,6]
console.log(array.slice(-3)); // [4,5,6]
```
# Truncating Array
* Kỹ thuật này có thể lock kích thước mảng, điều này rất hữu ích để xóa một số phần tử khỏi mảng dựa trên số lượng phần tử bạn muốn đặt.
* Ví dụ, bạn có một mảng 6 phần tử, bạn chỉ muốn lấy 5 phần tử đầu tiên => bạn cần cắt bới mảng => làm cho nó nhỏ hơn bằng cách đặt **array.length = 3** , ví dụ:
```js
ar array = [1,2,3,4,5,6];
console.log(array.length); // 6
array.length = 3;
console.log(array.length); // 3
console.log(array); // [1,2,3]
```
# Replace All
* Hàm String.replace() cho phép bạn sử dụng string và regex để replace strings, natively. Function này chỉ thay thế cho lần xuất hiện đầu tiên. Nhưng bạn có thể mô phỏng hàm **replaceAll()** bằng cách sử dụng / g ở cuối **Regex**:
```js
var string = "john john";
console.log(string.replace(/hn/, "ana")); // "joana john"
console.log(string.replace(/hn/g, "ana")); // "joana joana"
```
# Converting NodeList to Arrays
* Nếu bạn chạy hàm document.querySelectorAll ("p"), nó có thể sẽ trả về một mảng các phần tử DOM, đối tượng NodeList. Nhưng đối tượng này không có tất cả các hàm mảng, như: sort (), less (), map (), filter ().
* Để sử dụng được các hàm phía trên bạn cần chuyển đổi **NodeList** thành **Array**. Sử dụng hàm `[].slice.call(elements)`
```js
var elements = document.querySelectorAll("p"); // NodeList
var arrayElements = [].slice.call(elements); // Now the NodeList is an array

// This is another way of converting NodeList to Arrayvar 
arrayElements = Array.from(elements);
```
# Merging Arrays
* Nếu bạn muốn merge 2 mảng, bạn có thể sử dụng hàm Array.concat()
```js
var array1 = [1,2,3];
var array2 = [4,5,6];
console.log(array1.concat(array2)); // [1,2,3,4,5,6];
```
* Tuy nhiên hàm này không phù hooejp nhaart để merge những mảng lớn, bởi vì nó sẽ tiêu tốn rất nhiều bộ nhớ bằng cách tạo ra một mảng mới
* Trong trường hợp này, bạn có thể sử dụng `Array.push.apply(arr1, arr2)` . Thay vì nó tạo ra một mảng mới, nó sẽ merge mảng thứ 2 vào mảng thứ nhất => Giảm việc sử dụng bộ nhớ.
```js
var array1 = [1,2,3];
var array2 = [4,5,6];
console.log(array1.push.apply(array1, array2)); // [1,2,3,4,5,6];
```
# Shuffling an Array’s Elements
* Để xáo trộn một phần tử mảng mà không cần sử dụng thư viện bên ngoài như Lodash, chỉ cần chạy magic trick
```js
var list = [1,2,3];
console.log(list.sort(function() { Math.random() - 0.5 })); // [2,1,3]
```
# Tham khảo
* https://medium.com/better-programming/11-extremely-useful-javascript-tips-4484429a5655