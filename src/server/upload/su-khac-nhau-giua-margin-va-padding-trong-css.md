# 1. Giới thiệu :
Nếu bạn là người mới làm quen với CSS , bạn có thể đã nghe thấy các từ margin và padding nhưng không chắc chắn về ý nghĩa của chúng hoặc cách sử dụng chúng trong các thiết kế trang web. Margin và padding có những chức năng tương tự nhau trong việc thiết kế layout cho trang web. Tuy nhiên, chúng không hoàn toàn giống nhau và có những điểm khác biệt cơ bản quan trọng trong cách sử dụng.
Khi bạn hiểu đầy đủ về sự khác biệt giữa margin và padding, bạn sẽ có thể đưa ra quyết định tốt hơn dành cho việc thiết kế website của mình. Vì vậy, trong khuôn khổ bài viết này chúng ta sẽ cùng tìm hiểu về cách mà 2 thuộc tính này hoạt động thông qua những ví dụ.
# 2. Margin, Padding là gì ?
**Margin** : Nó là không gian xung quanh một phần tử. Margin được sử dụng để di chuyển một phần tử lên hoặc xuống trên một trang cũng như sang trái hoặc sang phải. Margin hoàn toàn trong suốt và không có bất kỳ màu nền nào. Mục đích chính của margin là đẩy các phần tử liền kề ra xa khỏi phần tử có chứa thuộc tính margin.

![image.png](https://images.viblo.asia/df531cde-1742-48e6-8bf8-b10f4b2a0e79.png)

![image.png](https://images.viblo.asia/065b79fa-2488-41b2-8f80-a2b08ad37aaa.png)

**Padding** : Nó là khoảng trống giữa phần tử và nội dung liên quan bên trong nó. Padding xác định các phần tử sẽ trông như thế nào và cách chúng sẽ được đặt bên trong một container.Khi phần tử có thuộc tính padding thì khoảng trống giữa nội dung bên trong phần tử với lề của phần tử đó sẽ tăng lên và background của padding sẽ phụ thuộc vào background của phần tử. Khi thêm padding thì kích thước của phần tử có thể thay đổi, mặc định thì kích thước của nó sẽ tăng lên.

![image.png](https://images.viblo.asia/887db24b-de35-49bb-b82d-938a0d1debd6.png)

# 2. Khi nào thì sử dụng margin và padding:
Khi bạn đang điều chỉnh bố cục của thiết kế của mình, bạn sẽ cần xác định xem nên điều chỉnh margin hay padding. 
Nếu chiều rộng trang của bạn được cố định, việc căn giữa một phần tử theo chiều ngang rất đơn giản, chỉ cần gán giá trị margin: auto . Bạn cũng sẽ sử dụng margin để đặt khoảng cách giữa các phần tử lân cận. Bạn sẽ thay đổi padding nếu bạn muốn tạo khoảng trống giữa phần tử và cạnh của vùng chứa hoặc đường viền.
Margin cũng có thể được sử dụng để tạo khoản cách giữ hình ảnh và mô tả của hình ảnh đó.

CSS Padding được sử dụng nếu chúng ta muốn tạo khoảng cách giữa một phần tử và cạnh của vùng chứa hoặc đường viền. Nó cũng hữu ích trong yêu cầu thay đổi kích thước của phần tử. 

**Ví dụ về margin**: 
```html
<!DOCTYPE html>
<html>
<head>
<style>
  .center {
margin: auto;
background: lime;
width: 66%;
}
  
.outside {
margin: 3rem 0 0 -3rem;
background: cyan;
width: 66%;
}
</style>
</head>
<body>
  <h2 style="color:green">GeeksforGeeks</h2>
  <p class="center">This element is centered.</p>
  <p class="outside">The element is positioned outside of its corner.</p>
</body>
</html>
```
Ví dụ trên tôi sử dụng ` margin: auto` để căng giữ element có class là `center`
Dưới đây là kết quả : 

![image.png](https://images.viblo.asia/9e1d2175-54c7-42e4-96b0-c855131fab06.png)

**Ví dụ về padding**: 
```html
<!DOCTYPE html>
<html>
<head>
<style>
h4 {
 background-color: lime;
padding: 20px 50px;
}
  
h3 {
background-color: cyan;
padding: 110px 50px 50px 110px;
}
</style>
</head>
<body>
   <h2 style="color:green">GeeksforGeeks</h2>
   <h4>This element has moderate padding.</h4>
   <h3>The padding is huge in this element!</h3> 
</body>
</html>
```

Đoạn code phía trên mình sử dụng padding cho thẻ h3 để thay đổi khoảng cách giữa nội dung so với các lề của element.
Dưới đây là kết quả cho đoạn code trên : 

![image.png](https://images.viblo.asia/2abf9b13-70bd-4ad2-ae8b-27defadf52b6.png)

Một lưu ý nhỏ là khi thêm padding mà bạn không cố định chiều rộng cũng như độ cao của phần tử thì độ rộng và chiều cao của nó sẽ phụ thuộc vào độ lớn của padding.

# 3. Sự khác nhau giữ margin và padding: 
Sự giống nhau giữa margin và padding là đều dùng để thay đổi khoản cách. Tuy nhiên chúng hoàn toàn không giống nhau, dưới đây là một vài điểm khác biệt giữa chúng

| Margin | Padding
| -------- | -------- |
|Margin sẽ thay đổi khoản cách bên ngoài của phần tử so với các phần tử khác  mà không làm thay đổi kích thước của phân tử     | Padding sẽ thay đổi khoảng cách của nội dung bên trong phần tử so với các lề của nó và sẽ làm thay đổi kích thước của phần tử |
|Margin chấp nhận số âm và cả số thực   | Padding không chấp nhận các giá trị âm |
|Margin có thuộc tính auto  | Padding không có thuộc tính auto |
|Margin không có màu nền  | Màu nền của Padding phụ thuộc vào màu nền của element |

![image.png](https://images.viblo.asia/a7f7f8e6-cd21-4ebd-8866-876c671a3bbf.png)

# 4. Kết luận:
Qua bài viết lần này mình mong các bạn sẽ hiểu hơn về margin và padding và áp dụng nó một cách chính xác nhất trong việc thiết kế giao diện

Nguồn tham khảo : https://www.geeksforgeeks.org/css-padding-vs-margin/  Geeks for Geeks