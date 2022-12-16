## Giới thiệu
Bootstrap thường được biết đến nhiều như một css framework với khả năng hỗ trợ responsive design cực mạnh. Nhưng có một yếu tố khiến nó được yêu thích, mà đôi khi người sử dụng còn không nhận ra, đó là hệ thống đặt tên class cực kì chặt chẽ, dễ nhớ và mang tính biểu đạt cao. Nói vậy không có nghĩa đó là điểm khác biệt của Bootstrap, đa phần các css framework phổ biến khác như Bulma, Materializecss,... đều có cách đặt tương tự tên như vậy. (Nhưng bọn nó ra đời sau Bootstrap) :grinning:

Nhờ việc đặt tên khoa học, Bootstrap tạo ra rất nhiều thành phần tái sử dụng mà không bị xung đột, giúp cho việc phát triển ứng dụng trở nên siêu tốc. Hệ thống class của Bootstrap được chia làm 4 phần: layout, content, components, utilities. Chúng được xây dựng dựa trên tư tưởng của OOCSS (Object oriented CSS - một phương pháp viết css hướng đối tượng).

## Chi tiết
OOCSS mang 2 nguyên tắc chính: 
* Tách biệt cấu trúc và giao diện (Structure and Skin)
* Tách biệt vùng chứa và nội dung (Container and Content)

Với nguyên tắc thứ nhất, các thuộc tính CSS tạo cấu trúc sẽ được đặt trong class mô tả chức năng của thành phần/đối tượng đó (Cái này là cái gì?), ví dụ như nút bấm (button), biểu mẫu (form), thông báo (alert),... Trong khi đó, phần giao diện sẽ được đảm nhận bởi các class khác nhau, để giúp đối tượng thay đổi màu sắc, font chữ, kích cỡ (những cái nhìn thấy được).
```CSS
/* Khởi tạo các giá trị mặc định cho button */
.btn {
  display: inline-block;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
}
/* Bổ sung và ghi đè các thuộc tính */
.btn-primary {
  color: blue;
}
.btn-lg {
  padding: 10px 16px;
  font-size: 18px;
}
```
```HTML
<button class="btn btn-primary btn-lg">Click Me!</button>
```
Nguyên tắc thứ 2 của OOCSS là chia tách container và content. 

```HTML
<ul class="pagination">
  <li class="page-item">
    <a class="page-link" href="#">Previous</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">1</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">2</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">3</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">Next</a>
  </li>
</ul>
```
Với việc sử dụng các class như trên (thay vì chỉ sử dụng thẻ), chúng ta thấy rõ sự liên hệ giữa các thành phần. Trong đó, ".page-item" là content của ".pagination", đồng thời cũng là container của ".page-link". Khi đó, thay vì style nhiều cấp với CSS, chúng ta có thể viết đơn giản hơn, vì các thành phần là độc lập.
```CSS
.pagination {}
.page-item {}
.page-link {}
```
## Tổng kết
Nói chung, Bootstrap ra đời sớm và đã trở nên phổ biến trong gần chục năm qua, nó không thể bị thay thế trong một sớm một chiều được. Mọi người tiếp cận với Bootstrap nhiều hơn các CSS framework khác, cái bài viết, câu hỏi về nó cũng nhan nhản. Có thể vì vậy chúng ta cảm thấy quen thuộc với nó ngay cả trước khi bắt đầu học. Dù sao hình thành một tư duy Bootstrap sẽ rất hữu dụng ngay cả khi bạn sử dụng CSS thuần hay bất cứ một công nghệ nào khác. :beers: