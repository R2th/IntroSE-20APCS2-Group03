![](https://images.viblo.asia/4596df29-857f-486c-baf2-cdf46daa09d6.png)

**Spread Syntax** là một khái niệm khá mới mẻ nhưng lại rất mạnh mẽ, hữu ích của ES6. Chúng ta hãy cùng tìm hiểu rõ hơn về khái niệm và những công dụng của nó nhé.
# The Spread Syntax
* Cú pháp spread đơn giản được biểu diễn bởi dấu 3 chấm: `...`
* Spread Syntax cho phép duyệt qua các phần tử và truyền vào phương thức như các đối số

Để dễ dàng hình dung ta hãy cùng xem qua một số ví dụ sau: 
## 1. Inserting Arrays
```
var mid = [3, 4];
var arr = [1, 2, mid, 5, 6];

console.log(arr);
```
Chúng ta sẽ tạo một array được đặt tên là `mid` sau đó tạo một array khác chứa các phần tử `mid` array. Có vẻ như kết quả không được như mong đợi với đoạn code trên: 
```
[1, 2, [3, 4], 5, 6]
```

Với việc chèn `mid` array vào `arr` array kết quả sẽ trả về là array bao gồm một array. Tuy nhiên, nếu ta mong muốn kết quả trả về theo một dạng khác đó là array mới sẽ bao gồm 6 phần tử trong đó có chứa 2 phần tử của `mid` array, ta có thể thực hiện điều này bằng cách đơn giản đó là áp dụng *spread syntax*
```
var mid = [3, 4];
var arr = [1, 2, ...mid, 5, 6];

console.log(arr);
```
Và đây là kết quả: 
```
[1, 2, 3, 4, 5, 6]
```
Thay vì việc insert `mid` array, spread syntax duyệt qua các phần tử của mid array và insert chúng vào `arr` array. Vì vậy, kết quả chúng ta được mảng mới chưa 6 phần tử. 
## 2. Math
JavaScript đã xây dựng một số phương thức tính toán thú vị cho math object. Trước hết cùng nhìn qua phương thức `Math.max()`: 
```
Math.max();
// -Infinity
Math.max(1, 2, 3);
// 3
Math.max(100, 3, 4);
// 100
```
Vấn đề đặt ra ở đây là nếu như chúng ta có quá nhiều phần tử để tìm ra giá trị lớn nhất, khi đó ta có thể nghĩ ngay đến `spread syntax` để truyền các phần tử trong mảng đến hàm `Math.max() ` như các đối số. 
```
var arr = [2, 4, 8, 6, 0];
var max = Math.max(...arr);

console.log(max);
```
## 3. Copy an array 
Với JavaScript, bạn không thể copy một array bằng cách setting một biến mới bằng với array đã tồn tại
```
var arr = ['a', 'b', 'c'];
var arr2 = arr;

console.log(arr2);
```
Output: 
```
['a', 'b', 'c']
```
Thoạt trông có vẻ như ta đã sao chép được arr sang arr2, tuy nhiên nếu như ta thay đổi arr2 nó cũng sẽ tác động đến arr. Hiểu đơn giản là cả arr và arr2 đều trỏ đến một vùng nhớ chứ không phải ta đã sao chép arr đến arr2. Cùng thử đoạn code dưới đây để xem kết quả nhé: 
```
var arr = ['a', 'b', 'c'];
var arr2 = arr;

arr2.push('d');

console.log(arr);
```
Output: 
```
['a', 'b', 'c', 'd']
```
Ta có thể copy arr bằng cách sử dụng `spread syntax` tương tự như sau: 
```
var arr = ['a', 'b', 'c'];
var arr2 = [...arr];

arr2.push('d');

console.log(arr);
```
Và đây là kết quả: 
`["a", "b", "c"]`

Tại sao lại có sự khác biệt vậy, `spread syntax` đã thực hiện duyệt qua các phẩn tử của arr và gán cho arr2. Như vậy việc thay đổi arr2 sẽ không ảnh hưởng gì đến arr ban đầu. 
## 4. String to Array
Một tính năng khá thú vị ở đây là ta cũng có thể tách một chuỗi string thành mảng các character như sau: 
```
var str = "hello";
var chars = [...str];

console.log(chars);
```

Bài viết trên mình đã chia sẻ cho các bạn một số công dụng hữu ích khi áp dụng `spread syntax`. Chúc các bạn một ngày làm việc vui vẻ và hiệu quả

Tham khảo: https://codeburst.io/javascript-es6-the-spread-syntax-f5c35525f754