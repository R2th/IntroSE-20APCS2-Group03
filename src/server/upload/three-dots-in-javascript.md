Chúng ta sẽ nỗ lực giải thích (...) làm gì trong JavaScript. Hy vọng, điều này sẽ loại bỏ sự mập mờ trong khái niệm này cho các bạn, và cho những developer sẽ tìm thấy bài viết này trong tương lai và có cùng câu hỏi. Đây là một trong những tính năng mới thú vị của ECMA6 của Javascript; (...) là một trong những chức năng Javascript mới này.

Thật ra tôi đã trở thành một fan hâm mộ lớn của (...) có thể thay đổi phong cách giải quyết vấn đề của bạn trong JavaScript. Chúng ta có thể sử dụng three dots (...) theo hai khái niệm khác nhau đó là spread operator and rest operator. 

Nhưng trước tiên như các bài viết các chúng ta sẽ đi vào ví dụ để nắm vững và cách học này mang đến sự hiểu quả hơn. 
## 1 - Example Spread Syntax.
Ví dụ 1:

**Without Spread syntax (...)**
```
const arr = [1, 3];
function add(x, y) // here receive parameter x, y
  {
     return x + y; // return addition of x and y
  }
const result = add(arr[0], arr[1]); // here pass manually array's values
console.log(result); // Output 4
```
**With Spread syntax (...)**
```
const arr = [1, 3];
function add(x, y) // here receive parameter x, y
  {
     return x + y; // return addition of x and y
  }
const result = add(...arr); // i.e spread syntax automatically assign the values
console.log(result); // Output 4
```
Ví dụ 2 :

liên quan đến immutable (Tính bất biến trong javascript)

**Without Spread syntax (...)**
```
var new_arr  = ['a', 'b', 'c', 'd'];
var new_arr2 = new_arr;
new_arr2.push('e');

console.log(new_arr);//  ["a", "b", "c", "d", "e"]
console.log(new_arr2);// ["a", "b", "c", "d", "e"]
```
**With Spread syntax (...)**
```
var new_arr  = ['a', 'b', 'c', 'd'];
var new_arr2 = [...new_arr];
new_arr2.push('e');
console.log(new_arr);  // Output 'a', 'b', 'c', 'd'
console.log(new_arr2); // Output 'a', 'b', 'c', 'd', 'e'
```

Qua hai ví dụ đầu tiên các bạn hình dung ra được Spread syntax có nhiệm vụ như thế nào? Ở ví dụ 1 đơn giản thì nhiệm vụ của Spread là làm cho code rõ ràng hơn và ngắn gọn tường mình hơn. Giúp coder tiết kiệm được thời gian và kb code. 

Nhưng đến ví dụ 2 ta thấy nhiệm vụ của Spread không hề đơn giản nữa rồi, liên quan đến Immutable trong javascript. Trong đoạn mã trên, chúng tôi đã tạo ra một mảng new_arr2 với một số giá trị và sao chép new_arr vào new_arr2. Điều đó có nghĩa là reference (address) new_arr đã được gán cho new_arr. điều đó có nghĩa là nếu chúng ta làm bất cứ điều gì với new_arr2, nó cũng sẽ ảnh hưởng đến new_arr và ngược lại vì chúng có chung reference (address). 

Nhưng khi sử dụng spread thì developer không còn lo lắng! Ở đây chúng ta có thể sử dụng spread operator để loại bỏ sự mơ hồ này. 

Nếu bạn nào có thể học nhanh qua các ví dụ cụ thể thì có thể dừng tại đây, và nếu coder nào vẫn chưa hiểu hay đang mơ hồ thì xin đọc phần tiếp theo.

## 2 - Khái niệm Spread syntax (...)
Như chúng tôi nói ở đầu bài thì Chúng ta có thể sử dụng ba (...) theo hai khái niệm khác nhau đó là spread operator and rest operator. 

**2.1 - Spread operator**

Điều này rất hữu ích khi chúng ta muốn copy properties của một object sang một object khác nhưng với một chút sửa đổi về giá trị của một số properties. ví dụ :
```
const object1 = {
    fullName: 'Anonystick',
    occupation: 'Software developer',
    age: 31,
    website: 'https://anonystick.com'
};
console.log(object1)
//Name: "Anonystick", occupation: "Software developer", age: 31, website: "https://anonystick.com"}
```
và chúng tôi muốn tạo các object khác nhau chỉ với thay đổi về Fullname. Chúng tôi có thể làm điều này rất dễ dàng với sự trợ giúp của spread operator:
```
const object2 = {
   ...object1,
   fullName: 'Tom',
}
console.log(object2)
//{fullName: "Tom", occupation: "Software developer", age: 31, website: "https://anonystick.com"}
```
Nó chỉ diễn ra một bước duy nhất. So cool! 

**2.2 - Rest operator**

Điều này tôi thực sự thấy rất hữu ích, Đôi khi chúng tôi phải thiết kế một số Api có thể chấp nhận n số tham số, trong những tình huống này có thể thực sự hữu ích. Hãy để tôi thử giải thích cho bạn bằng một ví dụ đơn giản, Chúng tôi muốn thiết kế một phương thức để tổng n số:
```
function sum(...numbers){
  return numbers.reduce((sum, val)=>{
      return sum += val;
    });
}
```
Bây giờ thử run xem nào
```
sum(3,5) // gives 8
sum(1,2, 3, 5) //gives 11.
```
Cool 😃.. right !!!

## 3 -  Kết luận
Khi chúng ta thấy three dots (…) trong code, đó là rest parameters or the spread operator. Có một cách dễ dàng để phân biệt giữa chúng: 
1. Khi three dots (…) ở cuối các function parameters, đó là "Rest operator" và tập hợp phần còn lại của danh sách các đối số thành một mảng 
2. Khi three dots (…) xảy ra trong một function call hoặc tương tự, nó được gọi là "Spread operator" và mở rộng một mảng thành một list.

Cảm ơn vì đã đọc. Tôi hy vọng bạn thích bài viết này hãy thoải mái thích, bình luận hoặc chia sẻ bài viết này với bạn bè của bạn.