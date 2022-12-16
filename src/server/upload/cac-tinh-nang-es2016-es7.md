# 1. includes()
Với tính năng này, khi chúng ta kiểm tra xem một mảng có chứa một phần tử nào đó hay không thì chúng ta có thể viết bằng một cú pháp dễ đọc hơn.
<br>

Ở ES6 và các phiên bản cũ hơn, để check xem mảng có chứa một phần tử nào đó hay không thì bạn phải dùng `indexOf` để check index của phần tử và nhận về `-1` nếu phần tử không có trong mảng..
<br>

Vì `-1` được tính là một giá trị true nên check phần tử trong mảng như sau sẽ không có tác dụng:
```javascript
if (![1,2].indexOf(3)) {
  console.log('Not found')
}
```

Còn với `includes()` trong ES7 thì chúng ta có thể thực hiện được:
```javascript
if (![1,2].includes(3)) {
  console.log('Not found')
}
```

# 2. Toán tử lũy thừa
Toán tử lũy thừa `**` tương đương với `Math.pơ()`, nhưng nó được đưa trực tiếp vào trong ngôn ngữ JavaScript thay vì là một hàm của thư viện.
```javascript
Math.pow(4, 2) == 4 ** 2
```

Tính năng này là một bổ sung tất tốt đặc biệt là cho các ứng dụng JS chuyên sâu về toán học.
<br>

Toán tử `**` đã được chuẩn hóa trên nhiều ngôn ngữ bao gồm Python, Ruby, MATLAB, Lua, Perl và nhiều ngôn ngữ khác.

---

Hết! Tính năng mới trong ES2016 chỉ có ngần này thôi ạ. Các bạn có thể đọc tiếp về các tính năng ES2017 trong [bài viết sau](https://viblo.asia/p/cac-tinh-nang-es2017-es8-eW65G86YKDO).