JavaScript (viết tắt là "js") là một ngôn ngữ lập trình mang đầy đủ tính năng của một ngôn ngữ lập trình động mà khi nó được áp dụng vào một tài liệu HTML, nó có thể đem lại khả năng tương tác động trên các trang web. Cha đẻ của ngôn ngữ này là Brendan Eich, đồng sáng lập dự án Mozilla, quỹ Mozilla, và tập đoàn Mozilla.

JavaScript thật sự rất linh hoạt. Bạn có thể bắt đầu với các bước nhỏ, với thư viện ảnh, bố cục có tính thay đổi và phản hồi đến các nút nhấn. Khi có nhiều kinh nghiệm hơn, bạn có thể tạo ra các trò chơi, hoạt họa 2D hoặc 3D, ứng dụng cơ sở dữ liệu toàn diện và nhiều thứ khác!

Bản thân Javascript là một ngôn ngữ linh động. Các nhà phát triển đã viết ra một số lượng lớn các công cụ thuộc top của core Javascript, mở ra một lượng lớn tính năng bổ sung.

Ngoài ra, Javascript là một ngôn ngữ mà được đánh giá là khó và cực kì hại não đối với các anh em mới vào nghề. Tuy vậy, không thể phủ nhận được sức mạnh của Javascript đối với Frontend được.

Hôm nay, tôi sẽ giới thiệu một vài tricks có thể hữu ích với các bạn dev.

# 1. Viết câu điều kiện rút gọn
Giả sử bạn có một đoạn code như sau:

```js
if (money) {
      married();
}
```

Bạn có thể rút gọn lại như sau:

```js
money && married();
```

Ngoài ra, bạn cũng có thể kiểm tra một thuộc tính hoặc một object có tồn tại hay không. Ví dụ như sau:

```js
var person = {
  firstName: "John",
  lastName: "Doe",
  age: 50,
  eyeColor: "blue"
};
person && person.first_name
// undefined
person && person.firstName
// "John"
```

Trong khi code, có thể bạn sẽ gặp trường hợp như sau:

```js
number1 = 1;
number2 = 2;

if (number1 === number2)
  console.log("number1 = number2");
else
  console.log("number1 != number2");
```

Trông đoạn code trên có vẻ khá là dài dòng, bạn có thể rút ngắn lại bằng cách sử dụng toán tử 3 ngôi:

```js
number1 === number2 ? console.log("number1 = number2") : console.log("number1 != number2");
```

# 2. Loại bỏ các phần tử lặp trong mảng
Nếu bạn có một mảng giá trị, có một vài giá trị trong mảng trùng nhau. Bạn có thể sử dụng `Set` và toán tử `...` (ES6)

```js
arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
newArr = [...new Set(arr)];
// [1, 2, 3, 4, 5]
```

# 3. Gộp mảng
Nếu bạn muốn gộp 2 mảng với nhau, bạn có thể sử dụng hàm `concat()` của Array

```js
var array_1 = [1, 2, 3];  
var array_2 = [4, 5, 6];  
array_1.concat(array_2); 
// [1,2,3,4,5,6];
```

Ngoài ra, bạn có thể sử dụng cách tối ưu hơn như sau

```js
var array_1 = [1, 2, 3];  
var array_2 = [4, 5, 6];  
array_1.push.apply(array_1, array_2);
// [1,2,3,4,5,6];
```

Với cách trên, thay vì tạo ra một mảng mới (nếu sử dụng `concat()`) thì cách trên sẽ push luôn giá trị mảng thứ 2 vào mảng thứ nhất -> giảm thiểu bộ nhớ sử dụng.

# 4. Tráo đổi giá trị của 2 biến
```js
var a = 1,
	  b = 2;
var c = 3,a: 2, b: 1, c: 4, d: 3
	  d = 4;

[a, b] = [b, a];
[c, d] = [d, c];

console.log(`a: ${a}, b: ${b}, c: ${c}, d: ${d}`);
// a: 2, b: 1, c: 4, d: 3
```

# 5. Lấy giá trị ngẫu nhiên trong một mảng
Ví dụ, bạn có một mảng các giá trị và muốn lấy ngẫu nhiên một giá trị trong mảng. Bạn có thể sử dụng cách sau:

```js
var arrs = [1, 2, 3, 4, 5];

var randomValue = arrs[Math.floor(Math.random() * arrs.length)];
```

# 6. Cắt bớt một mảng
Ví dụ, bạn đang có một mảng gồm nhiều giá trị nhưng sau đó bạn chỉ muốn lấy ra một vài phần tử đầu tiên thì bạn có thể sử dụng cách sau:

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];  
arr.length = arr.length - 2;
arr
// [1, 2, 3, 4, 5, 6, 7, 8]
```

# 7. Lấy phần tử cuối cùng trong mảng
Bên trên là cách lấy ra các phần tử đầu tiên, ngoài ra bạn cũng có thể lấy ra các phần tử cuối cùng của mảng bằng cách sử dụng `Array.slice()`. Thông thường, `slice(begin, end)` sẽ cắt mảng từ vị trí `begin` đến vị trí `end` của mảng. Nhưng trong trường hợp bạn không nhập tham số `end`, hàm này sẽ tự động đặt giá trị lớn nhất cho mảng. Nếu bạn đặt giá trị âm cho tham số `begin` thì bạn sẽ lấy được ra các phần tử cuối cùng của mảng đó. Ví dụ:

```js
var arr = [1, 2, 3, 4, 5, 6];  
arr.slice(-1); 
// [6]  
arr.slice(-3); 
// [4,5,6]
```

# 8. Chuyển string về dạng số 
Bạn có thể chuyển một `string`, một giá trị `boolean` về một `number` với cách sử dụng toán tử `+`

```js
var strInt = "4";
number = +strInt;
// 4
typeof number;
// "number"

var str = "hello";
+str
// NaN

+true
// 1
+false
// 0
```

# 9. Trộn các phần tử trong mảng

Bạn có thể xáo trộn các phần tử của một mảng bằng cách sử dụng tips sau:

```js
var arr = [1, 2, 3, 4, 5];

arr.sort(()=> Math.random() - 0.5);
// [4, 5, 1, 3, 2]
```

# 10.  Nhận diện thuộc tính trong một object
Bạn cần kiểm tra một vài thuộc tính tồn tại hay không để giúp tránh được lỗi `undefined` khi chạy các hàm hoặc các thuộc tính. Ví dụ, trong trường hợp các trình duyệt hỗ trợ hàm khác nhau, có thể với hàm này, trình duyệt Chrome chạy ngon lành nhưng sang Firefox thì oẳng củ tỏi chẳng hạn, bạn có thể kiểm tra hàm này có tồn tại hay không bằng cách sử dụng toán tử `in`. Ví dụ như sau:

```js
'querySelector' in document ? document.querySelector("#id") : document.getElementById("id");
```
 Trường hợp trên, nếu không có hàm `document.querySelector` trong `document`, bạn có thể sử dụng `document.getElementById` để thay thế.


# Kết luận
Phía trên là 10 tricks với javascript mình có tìm hiểu và thấy rất hữu ích. Hy vọng qua bài viết này sẽ giúp ích được nhiều cho bạn đọc.