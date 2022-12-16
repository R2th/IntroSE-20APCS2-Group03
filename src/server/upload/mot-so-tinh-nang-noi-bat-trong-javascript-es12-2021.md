# Một số tính năng nổi bật trong javascript ES12
1. Giới thiệu
2. Private Accessors
3. Promise.any() và AggregateError
4. Numeric Separators
5. String.prototype.replaceAll()
6. Logical Assignment Operators
7. Kết luận
## 1. Giới thiệu
-  ES12 2021 đang ở giai đoạn 4 và dự kiến ra mắt vào năm nay với nhiều tính năng hữu ích.
-  Nó cho phép chúng ta dễ dàng sử dụng, tiết kiệm thời gian và giúp code dễ đọc hơn rất nhiều.
-  Những tính năng nổi bật này sẽ được liệt kê trong bài viết dưới đây.
## 2. Private Accessors
- Các chức năng của accessors có thể được đặt ở chế độ private bằng cách viết # trước function

ví dụ: 
```
class Cat {
  // Public accessor
  get cat_name() { return "Luchi" }
  set cat_name(value) {}

  // Private accessor
  get #cat_age() { return 2 }
  set #cat_age(value) {}
}
```

- get và set trong đoạn mã trên là từ khóa tạo nên cat_name() một thuộc tính truy cập. Mặc dù cat_name() trông giống như một hàm, nó có thể được đọc như một thuộc tính bình thường như sau:
```
const obj = new Cat();
console.log(obj.cat_name); // "Luchi"
console.log(obj.cat_age); // undefined
```
## 3. Promise.any() và AggregateError
- Promise.any() được gọi ngay sau khi bất kỳ promise nào được thực hiện hoặc tất cả chúng đều bị reject.

```
Promise.any([
  fetch('https://dantri.com/').then(() => 'dantri'),
  fetch('https://facebook.com/').then(() => 'facebook'),
  fetch('https://volam2.vn/').then(() => 'volam2')
]).then((first) => {
  // Any of the promises was fulfilled.
  console.log(first);
  // -> 'dantri'
}).catch((error) => {
  // All of the promises were rejected.
  console.log(error);
})
```

- Trong mã trên đang đưua ra ba yêu cầu đồng thời. Khi một trong các yêu cầu được giải quyết, Promise.any cũng được giải quyết và ghi lại yêu cầu đã được giải quyết đầu tiên trong bảng điều khiển (trong ví dụ trên là dantri).
- Nếu tất cả những promises đã bị reject, Promise.any sẽ ném ra một exception mới của lỗi: AggregateError.
- Điểm mới về nó là đối tượng AggregateError đại diện cho một lỗi trong đó một số lỗi được gói gọn trong một lỗi duy nhất.
- Nó sẽ trông như thế này:

```
Promise.any([
  Promise.reject(new Error("error 1")),
  Promise.reject(new Error("error 2")),
  Promise.reject(new Error("error 3")),
]).then((first) => {
  console.log(first);
}).catch((error) => {
  console.log(e.message);  // "All Promises rejected"
  console.log(e.name);     // "AggregateError"
  console.log(e.errors);   // [ Error: "error 1", Error: "error 2", Error: "error 3" ]
})
```

- ở trên e.errors là một mảng của đối tượng errors.
## 4. Numeric Separators
- Khi chúng ta làm việc với nhưng con số lớn có thể gặp khó khăn hoặc khó hiểu. Ví dụ:  "21989854". Phải nhìn thật kĩ mới thấy đây là 21 triệu và ...
- Với tính năng mới của ES2021, chúng ta có thể viết lại với dấu gạch dưới để dễ dàng nhận biết hơn như sau “21_989_854”. Nhìn vào chúng ta có thể thấy nó đã dễ nhận biết hơn rất nhiều. Bây giờ, chúng ta có thể thấy rõ ràng đó là 21 triệu.
- Do đó, tính năng Numeric Separators có tác dụng đơn giản là để cải thiện khả năng đọc. Nó không ảnh hưởng đến hiệu suất của ứng dụng của chúng ta.
```
// previous syntax before ES12
const money = 1248723742;

// new syntax coming with ES12
const money = 1_248_723_742;
```

- Nhìn vào ví dụ trên chúng ta đã thấy nó đã dễ đọc hơn rất nhiều.

## 5. String.prototype.replaceAll()
- Ở ES12 replaceAll được tối giản cách sử dụng hơn nhiều so với trước đây, thay vì sử dụng regex chúng ta có cú pháp đơn giản hơn.
```
// previous syntax before ES12
const fullname = 'fullname = Nguyen + Xuan + Hung'; 
const fullnameFormated = fullname.replace (/ \ + / g, '');
// Nguyen Xuan Hung

// new syntax coming with ES12
const fullname = 'fullname = Nguyen + Xuan + Hung'; 
const fullnameFormated = fullname.replaceAll ('+', '');
// Nguyen Xuan Hung
```

## 6. Logical Assignment Operators
- Với ES12, sẽ có sự kết hợp giữ toán tử logic và  biểu thức gán:
```
a || = b 
// Tương đương với: a || (a = b), chỉ gán nếu a là Falsy.
a && = b 
// Tương đương với: a && (a = b), chỉ gán nếu a là Truthy.
a ?? = b 
// Tương đương với: a ?? (a = b), chỉ gán nếu a là Nullish.
```
## 7. Kết luận
- Đây là những chức năng mới của ES12 mình tìm hiểu được, các bạn có thể tham khảo thêm dưới đây:
+ https://js.plainenglish.io/javascript-es2021-es12-new-features-7aa5f411d81f
+ https://backbencher.dev/javascript/es2021-new-features
+ https://www.pullrequest.com/blog/javascript-es2021-you-need-to-see-these-es12-features/
+ https://medium.com/better-programming/the-top-3-new-javascript-es-2021-es-12-features-im-excited-about-a3ac129efbb2