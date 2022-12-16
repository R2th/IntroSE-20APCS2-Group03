Bài viết được dịch từ bài [ES6 Arrow Functions in JavaScript](https://scotch.io/tutorials/es6-arrow-functions-in-javascript-getting-started) của tác giả [jamesqquick](https://scotch.io/@jamesqquick).

-----
Với ES6 JavaScript đã xuất hiện nhiều bản cập nhật cho ngôn ngữ bao gồm spread operator, object destructuring, loại variable mới và hơn thế nữa. Trên tất cả các tính năng tuyệt vời đó là arrow function, một cách mới mẻ và ngắn gọn để viết các function. Trong bài viết này, chúng ta sẽ tìm hiểu những điều cơ bản về arrow function và thảo luận về lợi ích của chúng.
> Với các **arrow function**, bạn có thể define một hàm có thể đọc và súc tích **chỉ trong một dòng**!

## ES5 Functions
Hãy bắt đầu với việc xem xét cách chúng ta xác định các function với ES5 JavaScript. Để xác định hàm, nó yêu cầu từ khóa hàm. Ví dụ, nếu chúng ta muốn xác định một hàm sẽ nhân một số với hai, thì nó sẽ trông giống như thế này.
```js
function multiplyByTwo(num){
    return num * 2;
}
```
Chúng ta cũng có thể định nghĩa hàm và gán nó cho một biến nếu chúng ta muốn.
```js
const multiplyByTwo = function(num){
    return num * 2;
}
```
Bất kể bạn làm theo cách nào, keyword `function`  phải được đưa vào.
## Arrow function ES6 đầu tiên
Để tạo arrow function, bạn không cần keyword `function`. Trong thực tế, về cơ bản, bạn loại bỏ từ khóa đó và thêm một mũi tên `=>` ngay sau các tham số nhưng trước dấu ngoặc nhọn mở. Nó sẽ trông như thế này.
```js
const multiplyByTwo = (num) => {
    return num * 2;
}
```
Tại thời điểm này, nó không khác biệt đáng kể so với cách "cũ" , nhưng chúng ta có thể thực hiện một vài *cải tiến*.
## Loại bỏ dấu ngoặc không cần thiết
Dấu ngoặc quanh các tham số là bắt buộc nếu không có tham số hoặc nhiều hơn một tham số. Tuy nhiên, khi arrow function của bạn chỉ có một tham số, bạn có thể bỏ dấu ngoặc đơn để đơn giản hóa nó một chút như vậy.
```js
const multiplyByTwo = num => {
    return num * 2;
}
```
## Implicit Return(trả về ngầm)
Thông thường, chúng ta viết các hàm trả về chỉ sau một dòng mã. Với cách viết hàm "cũ", số lượng dòng trong hàm không ảnh hưởng đến cách bạn định nghĩa hàm. Với arrow function, nó có thể.
```js
const multiplyByTwo = num => num * 2;
```
Ví dụ, nếu tôi chỉ muốn print một cái gì đó lên console, ta có thể sử dụng trả về ngầm để rút ngắn độ dài của hàm.
```js
const printName = (first, last) => console.log(`${first} ${last}`);
```
## Sử dụng arrow function với map và filter
Bằng cách sử dụng các arrow function với các phương thức reduce, filter, map ... , bạn có thể thực hiện các phép biến đổi mảng hoàn chỉnh chỉ trong một dòng.
Hãy xem xét hai ví dụ, một với map và filter. Nó sẽ trông giống như thế này.
```js
const twodArray = [1,2,3,4].map( num => num * 2);
```
Giả sử chúng ta muốn lọc tất cả các số chẵn.
```js
const filteredArray = [1,2,3,4].filter( num => num % 2 == 0);
```
Một lần nữa, không có dấu ngoặc đơn và trả lại ngầm. Siêu nhanh để thực hiện chuyển đổi mảng chỉ với một dòng!
## Tóm tắt
Các arrow function là một trong nhiều tính năng nhỏ tiện lợi của ES6 JavaScript. Bạn sẽ thấy chúng được sử dụng ngày càng nhiều trong các ví dụ và tài liệu, vì vậy thật đáng để học cách chúng hoạt động. Chưa kể, chúng có thể cải thiện đáng kể tính đồng nhất và dễ đọc của mã code của bạn!