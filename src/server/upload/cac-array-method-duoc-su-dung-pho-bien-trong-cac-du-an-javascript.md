Đối với các dự án sử dụng Javascript chắc hẳn không thể thiếu việc sử dụng các Array method , chúng giúp bạn viết code ngắn gọn và rõ ràng hơn .Vì vậy trong bài viết này tôi sẽ giới thiệu với các bạn một số array method được sử dụng phổ biến nhất 
### 1.map
Phương thức map sẽ tạo ra một array hoàn toàn mới thông qua việc xử lý từng element trong array ban đầu với một phương thức mà chúng ta hay gọi là callback function .
```
let originArray = [1,2,3,4,5,6,7]
let newArray = originArray.map(
  (item)=> item *2
)
console.log(newArray)
//out put : [ 2,  4,  6, 8, 10, 12, 14 ]
```
### 2.filter
Trước hết bạn cần hiểu filter nghĩa là gì ? Filter dịch ra tiếng Việt nghĩa là sàng lọc . Khi bạn bạn muốn lọc array ban đầu theo một điều kiện nào đó , filter sẽ giúp bạn làm điều này .
lưu ý : filter sẽ không thay đổi ở array ban đầu và ouput của nó sẽ là một array .
```
let originArray = [1,2,3,4,5,6,7]
let newArray = originArray.filter(
  (item)=> item > 5 
)
console.log(newArray)
//out put : [ 6, 7 ]
```

### 3.find 
Phương thức Find cũng có chức năng dùng để lọc phần tử tuy nhiên nó chỉ trả về phần tử đầu tiên thoả mãn điều kiện trong callback function ,nếu không có phần tử nào thoả mãn điều kiện nó sẽ trả về undefind  .Đây cũng chính là sự khác nhau giữa filter và find
```
let originArray = [1,2,3,4,5,6,7,8,9]
let itemNeedFind = originArray.find(
  (item)=> item > 5 
)
console.log(itemNeedFind)
//out put : 6
```
### 4.some 
Phương thức này sử dụng dễ dàng hơn rất nhiều so với 2 người anh em của nó là filter và find . Chẳng hạn như bạn muốn kiểm tra xem có thằng nào trong array ban đầu thoả mãn điều kiện trong callback function hay không và câu trả lời chỉ cần là có hoặc không , thì some cũng có chức năng như vậy 
```
let originArray = [1,2,3,4,5,6,7,8,9]
let checkItem = originArray.some(
  (item)=> item > 55
)
console.log(checkItem)
//out put : false
```
### 5.push 
Phuơng thức này  sẽ thay đổi array ban đầu thông qua việc  thêm 1 phần tử vào vị trí cuối cùng của array 
```
let originArray = [1,2,3,4,5,6,7,8,9]
originArray.push(100)
console.log(originArray)
//output : [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]
```
### 6.pop
Phuơng thức này  sẽ thay đổi array ban đầu thông qua việc   đi 1 phần tử  ở  vị trí cuối cùng của array 
```
let originArray = [1,2,3,4,5,6,7,8,9]
originArray.pop()
console.log(originArray)
//output : [ 1, 2, 3, 4, 5, 6, 7, 8]
```
### 7.sort 
Phương thức này cho phép bạn sắp xếp lại vị trí của các phần tử trong array theo điều điện so sánh mà bạn muốn 
```
var originArray = [2,1,3,6,0,9,8]
var originCharacter = ['leuleu','ahihi','hihi','ocschos','sushi']
// tính năng mặc định là thứ tự sắp xếp tăng dần , sau đó so sánh chuỗi giá trị đơn vị mã UTF-16

originArray.sort()
originCharacter.sort()
console.log(originArray)
// [ 0, 1, 2, 3, 6, 8, 9 ]
console.log(originCharacter)
// [ 'ahihi', 'hihi', 'leuleu', 'ocschos', 'sushi' ]
```
Ngoài ra các bạn có thể tự custom điều kiện sắp xếp như sau 
```
var originArray = [2,1,3,6,0,9,8]
originArray.sort(
  (x,y)=> y - x 
)
console.log(originArray)
// [ 0, 1, 2, 3, 6, 8, 9 
```
### 8.slice
Phương thức này cho phép bạn cắt một mảng nhỏ từ mảng ban đầu với 2 tham số đầu vào là index của 2 vị trí trong mảng ban đầu 
```
// Syntax
// slice()
// slice(start)
// slice(start, end)

const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2, 4));
// output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
//output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// output: Array ["duck", "elephant"]
```

### 9.splice
Phương thức này sẽ thay đổi mảng ban đầu bằng việc xoá bỏ hoặc thay thế các phần tử đã có trong mảng hoặc thêm phần tử mới 
```
//Syntax
// splice(start)
// splice(start, deleteCount)
// splice(start, deleteCount, item1)
// splice(start, deleteCount, item1, item2, itemN)

const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
//  thêm phần tử  index 1
console.log(months);
// output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
//  thay thế 1 element tại index 4

console.log(months);
// output: Array ["Jan", "Feb", "March", "April", "May"]
```
### 10 Array.from
Phương thức này cho phép bạn tạo ra một array mới từ một kiểu dữ liệu khác 
```
let fullname = "toandapzai"
let arrayCharacter = Array.from(fullname)
console.log(arrayCharacter)
//out put : [ 't', 'o', 'a', 'n','d', 'a', 'p', 'z','a', 'i']
```

### Kết luận 
Trên đây là một số array method mình hay dùng trong dự án , mình hi vọng nó sẽ giúp ích cho những bạn mới làm quen với javascript sử dụng chúng hiệu quả .
Bài viết tham khảo ở một số nguồn như:  <br/>
https://www.w3schools.com/  <br/>
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#