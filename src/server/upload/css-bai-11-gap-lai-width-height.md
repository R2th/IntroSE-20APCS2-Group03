Trong bài viết này, chúng ta sẽ gặp lại các thuộc tính `width` & `height` để thảo luận thêm về chúng. Chúng ta sẽ bắt đầu với một giá trị rất hữu dụng có tên gọi là `auto`. Sau đó, chúng ta sẽ nói về một vài thuộc tính khác có liên quan.

## Giá trị `auto`

Từ `auto` - tự động - được sử dụng trong nhiều lĩnh vực và đâu đó nó gắn với cảm giác rất hiện đại. Có thể bạn đã từng nghe thấy tên nhiều đồ vật công nghệ gắn liền với từ này. Và trong CSS thì chúng ta có `auto` là một giá trị đặc biệt, được sử dụng với nhiều thuộc tính khác nhau. Giá trị này sẽ nói với các trình duyệt web tự động tính toán ra các giá trị thay thế phù hợp cho các thuộc tính CSS.

Hãy giả định rằng chúng ta có 3 tấm ảnh với các kích thước thực tế là 1920x1080 (16:9), 1600x1000 (16:10), và 1000x1000 (1:1). Khi chúng ta nhúng những tấm ảnh này vào một trang web đơn, một thao tác canh chỉnh cơ bản nên thực hiện đó là thiết lập chiều rộng của các phần tử `<img>` chiếm `100%` độ rộng của container phía bên ngoài. Như vậy thì các tấm ảnh sẽ tự động đáp ứng với mọi kích thước màn hình lớn hay nhỏ. Thế nhưng chờ đã, còn chiều cao của các ảnh thì thế nào?

Những tấm ảnh mà chúng ta vừa sử dụng có tỉ lệ kích thước chiều cao/chiều rộng khác nhau. Vì vậy nên nếu như không muốn có tấm ảnh nào bị hiển thị sai tỉ lệ và méo ảnh thì chúng ta cần phải chỉ định chiều cao riêng cho từng tấm? Không, chúng ta sẽ không làm như vậy. Đây chính là lúc mà chúng ta cần tới sự hỗ trợ của giá trị `auto`.

`auto.html`
```html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Auto-m-agic</title>
      <link rel="stylesheet" href="auto.css">
   </head>
   <body>
      <article class="post">
         <h1>Khoa học của một kẻ mộng mơ</h1>
  
         <p>
            Tất cả mọi thứ trong thế giới này đều màu nhiệm, cân bằng,
            và tất cả mọi thứ đều có một quy luật.
         </p>
  
         <img src="https://s19.postimg.cc/mtf99uv9v/magic.jpg">

         <p>Cân bằng là chìa khóa.</p>
  
         <img src="https://s19.postimg.cc/5vgbe3cdf/balance.jpg">

         <p>Có một quy luật đằng sau tất cả mọi thứ.</p>
  
         <img src="https://s19.postimg.cc/pq2d07jv7/pattern.jpg">
      </article>
   </body>
</html>
```

`auto.css`
```css
.post { /* max-width: 720px; */ }
.post > h1 { font-size: 32px; }
.post > p {
   font-size: 16px;
   line-height: 1.6;
}

.post > img {
   width: 100%;
   height: auto;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/OJzVVMG)

Đó có thể được coi là một phép màu không? :D Chúng ta thậm chí còn không cần phải thực hiện bất kỳ thao tác tính toán nào. Trình duyệt web đã tự động thực hiện tác vụ tính toán phức tạp để duy trì tỉ lệ đúng cho mỗi tấm ảnh. Mình cũng không rõ vì sao các trình duyệt web lại có thể biết chính xác điều mà chúng ta muốn. :D

Bạn nhớ lưu ý là giá trị `auto` có thể được sử dụng cùng nhiều thuộc tính CSS khác nữa nhé. Chúng ta sẽ còn gặp lại `auto` nhiều lần nữa.

## Các giá trị tối thiểu và tối đa

Bên cạnh các thuộc tính `width` và `height` mà chúng ta đã biết, CSS còn cung cấp các thuộc tính khác liên quan như `min-width`, `max-width`, `min-height`, và `max-height`. Những thuộc tính này được sử dụng để tạo ra các ràng buộc giới hạn, giúp chúng ta đảm bảo rằng các thành phần của trang web sẽ được hiển thị tốt trong bất kỳ tình huống nào.

Hãy lấy ví dụ về độ dài của các dòng văn bản nếu muốn đem lại trải nghiệm đọc tốt thì
sẽ ở khoảng 90 ký tự trở lại; Kết hợp với kích thước font-size phổ biến (khoảng 16-18px)
thì sẽ cho kết quả là khoảng ~700-800px. Vì vậy nên chúng ta thường muốn đảm bảo rằng
trang blog hay website mà chúng ta đang xây dựng sẽ có khối nội dung chính rộng khoảng 720px. Điều này có thể thực hiện được bằng cách sử dụng thuộc tính `max-width`:

```css
.post { max-width: 720px; }
```

Như vậy thì bài viết blog sẽ được hiển thị đầy màn hình đối với các thiết bị có màn hình nhỏ. Nhưng khi người dùng xem trên thiết bị có màn hình lớn, ví dụ như màn hình máy tính 21" Full HD, những nội dung này sẽ dừng ở 800px chiều rộng và đem lại trải nghiệm đọc khá tốt với các dòng nội dung không quá dài và không hay bị nhầm khi đọc xuống dòng. Khá tuyệt, phải không?

Các thuộc tính này còn hay được sử dụng trong cú pháp truy vấn thiết bị, cho phép chúng ta viết code CSS hướng đến từng khoảng kích thước màn hình cụ thể. Chúng ta sẽ sớm gặp cú pháp mới này trong một vài bài viết nữa. Còn bây giờ thì bạn hãy cứ thử sử dụng những thuộc tính này vào code của bạn để làm quen dần và chuẩn bị tạo ra những thiết kế đáp ứng là vừa.

Như thường lệ thì dưới đây là các liên kết tham khảo để bạn có thể xem chi tiết về các thuộc tính:

- [min-width](https://www.w3schools.com/cssref/pr_dim_min-width.asp)
- [max-width](https://www.w3schools.com/cssref/pr_dim_max-width.asp)
- [min-height](https://www.w3schools.com/cssref/pr_dim_min-height.asp)
- [max-height](https://www.w3schools.com/cssref/pr_dim_max-height.asp)

Trong bài tiếp theo, chúng ta sẽ gặp một vài công cụ mới được sử dụng để thiết lập kích thước và canh chỉnh các phần tử theo một lối tư duy khác.

[[CSS] Bài 12 - Các Thuộc Tính Margin & Padding](https://viblo.asia/p/css-bai-12-cac-thuoc-tinh-margin-padding-1VgZvABMKAw)