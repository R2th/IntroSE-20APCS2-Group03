Trong bài viết này, tôi sẽ chỉ ra một số thủ thuật JavaScript đơn giản và tuyệt vời mà bạn có thể sử dụng để cải thiện code của mình.
# Trick 1:  Kết hợp nhiều đối tượng
Hãy xem xét bạn có ba đối tượng khác nhau:
```javascript
const obj1 = {'a': 1, 'b': 2};
const obj2 = {'c': 3};
const obj3 = {'d': 4};
```
Nếu ta muốn một đối tượng chứa các thuộc tính kết hợp của tất cả các đối tượng này, chúng ta có thể làm như sau với code đơn giản dưới đây:
```javascript
const objCombined = {...obj1, ...obj2, ...obj3};
```
In ra giá trị `objCombined` trong console:

![](https://images.viblo.asia/1d161b5c-56ee-4ac4-9789-2208a047f985.png)

{@embed: https://jsfiddle.net/6cqd79yu/}

"`...`" là một "spread operator", bạn có thể đọc thêm ở đây [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

`objCombined` là một đối tượng mới được tạo. Cập nhật bất kỳ giá trị nào của `obj1, obj2 hoặc obj3` sẽ không ảnh hưởng đến các giá trị của `objCombined`

Đối với các đối tượng nested (lồng nhau), các tham chiếu của các đối tượng bên trong sẽ được copy và sẽ không tạo ra các đối tượng mới. Cú pháp spread sẽ sao chép tất cả các thuộc tính của đối tượng, nhưng sẽ chỉ tạo một đối tượng mới ở cấp cao nhất.
Bạn cũng có thể kết hợp các đối tượng bằng phương thức `Object.assign ()`.

# Trick 2: Chèn giá trị vào giữa một mảng
Xem xét bạn có mảng số nguyên sau:
```javascript
const arr = [0, 1, 2, 3, 5, 6, 7, 8];
```
Nếu ta muốn chèn số nguyên 4 vào index thứ 4 của mảng thì sao?
Chúng ta chỉ đơn giản có thể làm như vậy bằng cách sử dụng hàm `splice` của Array. Cú pháp của hàm `splice` là:
```javascript
arr.splice(index, itemsToDelete, item1ToAdd, item2ToAdd, ...)
```
Để chèn số nguyên 4 vào index thứ 4 :
```javascript
arr.splice(4, 0, 4);

kết quả :
-> [0, 1, 2, 3, 4, 5, 6, 7, 8]
```
Để chèn nhiều số nguyên vào một index, ta cũng có thể viết :
```javascript
arr.splice(4, 0, 100, 101, 102);

Output :
->  [0, 1, 2, 3, 4, 100, 101, 102, 5, 6, 7, 8]
```
Sử dụng `splice` sẽ làm thay đổi mảng ban đầu, không tạo ra một mảng mới :

{@embed: https://jsfiddle.net/84ark7ey/}

Bạn muốn tìm hiểu thêm về chức năng của `splice`? Đọc thêm về nó trong bài viết sau :  [Array.splice and Array.slice in JavaScript](https://medium.com/developers-arena/array-splice-and-array-slice-in-javascript-e53006d4d6fb)

# Trick 3:  Lấy thời gian hiện tại
Để có được thời gian hiện tại trong JavaScript, bạn chỉ cần thực thi đoạn code sau:
```javascript
var date = new Date();
date.getTime()

Output :
-> 1573490661715
```
Ngoài ra còn có một cách ngắn hơn để có được thời gian hiện tại.
```javascript
+new Date()
hoặc
Date.now()
```
# Trick 4: Kiểm tra nếu một đối tượng là một mảng
Để kiểm tra xem một đối tượng có phải là một mảng không, bạn có thể gọi phương thức` isArray () `của `Array`.
```javascript
const obj = {data: 1};
const arr = [1, 2, 3];
```
Để kiểm tra một mảng, sử dụng đoạn code sau:
```javascript
Array.isArray(obj);  // false
Array.isArray(arr);  // true
```
# Trick 5:  Object Destructuring (Phá hủy đối tượng)
Hãy xem xét bạn có đối tượng sau trong JavaScript:
```javascript
const user = {
    name: 'Kunal',
    age: 25,
    profile: 'https://medium.com/@kunaltandon.kt',
    followers: 1000,
    blogs: 57
};
```
Chúng ta có thể trực tiếp lấy các biến cho các thuộc tính của đối tượng bằng cách sử dụng cú pháp sau:
```javascript
const { name, profile, blogs, followers } = user;
console.log(name);      // Kunal
console.log(profile);   // https://medium.com/@kunaltandon.kt
console.log(blogs);     // 57
console.log(followers); // 1000
```
{@embed: https://jsfiddle.net/6kcp7aqn/}

Sau khi chạy câu lệnh trên, bây giờ chúng ta sẽ có 4 biến khác nhau chứa các thuộc tính của đối tượng.
Để làm việc này, các tên biến ở phía bên trái phải khớp chính xác với tên chính của đối tượng.
Cú pháp được gọi là  `Object Destructuring `phá hủy đối tượng.
# Trick 6: Rest parameter syntax (Cú pháp tham số phần còn lại)
Bạn có biết rằng bạn có thể tạo một hàm chấp nhận bất kỳ số lượng đối số nào không? Có một cú pháp đặc biệt gọi là `Rest parameter syntax` để tạo ra một hàm như vậy.
```javascript
function sum(...values) {
    console.log(values);
}
sum(1);
sum(1, 2);
sum(1, 2, 3);
sum(1, 2, 3, 4);
```
Gọi các hàm `sum` sẽ thu thập các giá trị dưới dạng một mảng các tham số được truyền cho hàm. Điều này sẽ in đầu ra sau đây.
```javascript
[1]
[1, 2]
[1, 2, 3]
[1, 2, 3, 4]
```
Chúng ta cũng có thể hoàn thành hàm sum và làm cho nó tính tổng của tất cả các tham số được truyền cho hàm.
```javascript
function sum(...values) {
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
    }
  
    return sum;
}
console.log(sum(1));
console.log(sum(1, 2));
console.log(sum(1, 2, 3));
console.log(sum(1, 2, 3, 4));

Output:
1
3
6
10
```

{@embed: https://jsfiddle.net/mp67snah/}

Nguồn dịch : https://medium.com/developers-arena/some-simple-and-amazing-javascript-tricks-292e1962b1f6