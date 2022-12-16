# Mở đầu 
Xin chào các bạn hôm nay mình sẽ giới thiệu đến mọi người một số `methods` trong array mà mình thấy khá là hay. Bình thường khi nói đến các `methods` trong array các bạn sẽ nghĩ ngay đến các methods hay dùng như : 

   * push 
   * pop
   * shift 
   * unshift 
 
 đúng không :). vì thế nên hôm nay mình sẽ giới thiệu một vài `methods` khác mà mình thấy nó cũng hữu ích không kém. Còn chờ gì nữa cùng tìm hiểu luôn nhé.
 # Map
 Vậy `Map` là gì mình lên google dịch thì dịch ra map là ánh xạ (yaominh) nghe khó hiểu nhỉ :D. Thật ra chỉ cần hiểu đơn giản là biến đổi một cái này thành một cái khác. Vậy `array.map` có nghĩa là biến đổi một mảng này thành một mảng khác với số lượng phần tử không đổi, thông qua một hàm nào đó. 
 
 Ví dụ ở đây mình có một mảng gồm các số, và có một hàm để cộng  thêm 2 vào các phần tử của mảng, ta sẽ thu được mảng mới. đây là đoạn code của mình 
 ```php
 var array = [1, 4, 6 ,8];
var newArray = array.map(function(item){
  item += 2;
  return item;
});

console.log(newArray);
```
còn đây là kết quả 
![](https://images.viblo.asia/c05b13e7-d212-4a8d-b245-fbf3d77a7eae.png)

khá đơn giản phải không. tiếp nhé :D
# Filter
Cái tên nói lên tất cả :v `filter` có nghĩa là lọc vậy `map.filter` có nghĩa là lọc các phần tử của mảng thỏa mãn điều kiện nào đó. Khác với `array.map` thì số lượng phần tử của mảng mới sau khi qua `array.filter` có thể không bằng số lượng của mảng cũ.
Ví dụ ở đây mình cũng có một mảng gồm các số âm dương khác nhau. và có một hàm để `filter` ra các số dương.
 ```php
 var array = [-1, 4, -6 ,8,10,-23];
var newArray = array.filter(function(item){
  return item > 0;
});

console.log(newArray);
``` 
Kết quả được ![](https://images.viblo.asia/6687435e-5402-4e6d-831a-bec4f21f84a9.png)

# Find
`array.find` nó cũng gần giống như `array.filter` chỉ có một điểm khác đó là thay vì trả về hết các phần tử thỏa mãn điều kiện của hàm nào đó thì nó chỉ trả về phần tử đầu tiên thỏa mãn điều kiện mà thôi.

Ví dụ: mình sẽ lấy theo ví dụ trên của  `filter` chỉ thay methods `filter` bằng methods `find` và đây là đoạn code của mình 
```php
var array = [-1, 4, -6 ,8,10,-23];
var newArray = array.find(function(item){
  return item > 0;
});

console.log(newArray);
```
Còn đây là kết quả 

![](https://images.viblo.asia/3a418564-5952-41f3-afa1-ad3fd78b0dae.png)

có thể thấy kết quả chỉ trả về một phần tử đầu tiên thỏa mãn điều kiện lớn hơn 0 đó là phần tử có giá trị bằng 4.
# Reduce
`reduce` mình lại lên google dịch thì có nghĩa là giảm. Có nghĩa là hàm `array.reduce` sẽ nhận đầu vào là 2 phần tử của mảng để xử lý trả về một phần tử rồi hàm đó lại tiếp tục nhận 2 phần tử trong đó một phần tử vừa được tính toán từ trước và một phần tử tiếp theo cứ thế đến khi trả về một phần tử duy nhất. Hơi khó hiểu đúng không :D đi vào ví dụ luôn nhé xem xong ví dụ sẽ dể hiểu hơn :D.

Ví dụ ở đây mình cũng có một mảng các số và mình dùng `array.reduce` để tính tổng giá trị các phần tử của mảng này. Đây là code
```php
var array = [1, 4, 6 ,8, 9];
var newArray = array.reduce(function(a, b){
  return a + b;
});

console.log(newArray)
```

Kết quả  ![](https://images.viblo.asia/7f0fe6cf-9ab4-407d-acf0-27174976d969.png)

**Lưu ý**: `array.reduce` khác với `array.filter` và `array.find` là luôn trả về một phần tử còn `array.filter` trả về nhiều hoặc một hoặc `không` phần tử nào. `array.find` thì trả về một hoặc không phần tử.

# Kết luận
Vậy là mình đã giới thiệu với các bạn một số methods mà mình thấy khá hữu ích khi dùng với array. Bài viết dựa theo quan điểm các nhân vì vậy còn chỗ nào thiếu xót rất mong các bạn comment để mình có thể hoàn thiện bài viết tốt hơn hoặc có chỗ nào chưa rõ thì cũng comment xuống dưới để mình có thể nói rõ hơn. Cuối cùng xin cảm ơn mọi người đã đọc, nếu thấy bài viết có ích thì hãy cho mình 1 `up vote` nhé, Bấm `Follow` để có thể xem được nhiều bài viết hơn từ mình nhé :).