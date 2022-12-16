![](https://images.viblo.asia/a56c33fa-ea1f-486e-afe8-51f342143243.jpg)
Chắc hẳn với những người làm dev chúng ta ai cũng đã từng có suy nghĩ "code chạy được là được". Suy nghĩ đó nghe có phần khá tiêu cực, vì khi đi sâu vào bên trong sẽ còn rất nhiều vấn đề khác phát sinh.

Lấy ví dụ có 3 bạn dev với những mẫu code như sau

Bạn A
```css
a {color:#000;display:inline-block;}
```
Bạn B
```css
a {
  color: #000;
  display: inline-block;
}
```
Bạn C
```css
a {
  display: inline-block;
color: #000;
}
```
Đương nhiên khi hiển thị lên trình duyệt chúng sẽ chẳng có gì khác nhau, tuy nhiên hãy nhìn xa hơn. Khi dự án đó giao cho người khác tiến hành bảo trì hoặc nâng cấp họ sẽ nghĩ như thế nào. Code của bạn đáp ứng được yêu cầu nhưng chắc chắn chưa đáp ứng được chất lượng, cái mà ta hay gọi với nhau là "clean code"

Stylelint hay scss-lint được tạo ra nhằm tạo ra một bộ quy tắc chung cho cách viết và trình bày SCSS/CSS/LESS.

PostCSS Sorting là một trong các tiêu chuẩn "Clean Code CSS" đó, tập trung chủ yếu vào việc sắp xếp thứ tự các thuộc tính theo bảng chữ cái
![](https://images.viblo.asia/ba47855f-3923-458c-b9b0-d93cedd361d1.gif)

Trong bài viết này mình sẽ hướng dẫn chi tiết cho bạn cách cài đặt và cấu hình tiện ích/package PostCSS Sorting trên 2 IDE (VS Code & Sublime Text) để bạn có thể dễ dàng sắp xếp file scss/css/less của mình chỉ với vài thao tác cơ bản
## 1. Sublime Text
### Bước 1: Cài đặt Package Control (chuyển đến bước 2 nếu bạn đã cài đặt)

![](https://images.viblo.asia/f369426c-038c-4fea-bfc1-7d324492b45c.png)

Truy cập https://packagecontrol.io/installation copy code và dán vào cửa sổ console vừa hiện ra. Chờ khi quá trình cài đặt hoàn tất hãy khởi động lại IDE

### Bước 2: Cài đặt Post CSS Sorting

![](https://images.viblo.asia/29825368-7b25-432a-bf3c-6070e5c2b458.png)

Chọn phần Install Package và tìm với từ khóa `PostCSS Sorting` để cài đặt

### Bước 3: Cấu hình cho tiện ích
![](https://images.viblo.asia/59df957d-3c53-4147-86e4-34e14e5f4246.png)
Tại phần bên phải cài đặt của user bạn tiến hành nhập chuỗi json sau và lưu lại để hoàn tất
```json
{
  "properties-order": "alphabetical"
}
```
### Bước 4: Sử dụng
Bạn có thể làm theo các bước sau để chạy tiện ích

![](https://images.viblo.asia/510030ed-b1ed-4cd5-82c0-20925829d3a1.png)

Hoặc nhanh hơn có thể sử dụng tổ hợp phím tắt `Ctrl`+`Alt`+`Shift`+`S`
## 2. VS Code
### Bước 1: Cài đặt tiện ích trong kho extension
![](https://images.viblo.asia/82e0eb81-338d-472e-b8ae-a50cb7dceea6.png)

### Bước 2: Cấu hình

![](https://images.viblo.asia/c9cee88c-7fc6-4ae9-8a43-0aff6c51c903.png)

![](https://images.viblo.asia/f83c9094-8c0e-4037-87bf-297c051390f6.png)

Nếu file config của bạn chưa có gì hãy tạo đoạn config sau
```json
{
  "postcssSorting.config": {
    "properties-order": "alphabetical"
  }
}
```
Nếu đã có một vài config rồi hãy thêm dấu phẩy và nối tiếp vào file
![](https://images.viblo.asia/77db1c9e-70e0-4d6e-b190-8f9460380190.png)
Cuối cùng hãy lưu lại cài đặt

### Bước 3: Sử dụng
![](https://images.viblo.asia/68be8eee-06fb-4aff-b7fa-462e79d61138.png)

## Kết luận
Done ! Rất nhanh thôi bạn đã có thể order toàn bộ thuộc tính cho các file css của mình chỉ với vài thao tác đơn giản (nói thật đợt trước mình cũng hay làm thủ công nhưng dần thấy bực quá nên quyết định mò mẫm xem có tool nào làm được không và đó là lý do có bài viết này :v)

Bạn hãy tập làm quen dần với các standard viết code (ví dụ indent, chấm phẩy, end of new line, stylelint, scss-lint,...) đảm bảo sau này nhìn lại code cũ đã viết ko theo các tiêu chuẩn đó cảm thấy rất khó chịu khi review code

Nếu thấy bài viết hay, hãy cho mình +1 upvote nhé. Nếu thích mình hãy nhấn nút follow để biết thêm nhiều thứ hay ho hơn.
Chúc bạn thành công !