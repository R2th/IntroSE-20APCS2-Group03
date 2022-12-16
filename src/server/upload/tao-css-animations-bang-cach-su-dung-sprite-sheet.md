## 1. Lời mở đầu
Chắc 1 số bạn đã biết đến CSS sprites là một kỹ thuật tái sử dung hỉnh ảnh giúp tối ưu việc tải trang bằng cách giảm thiểu số lượng HTTP requests và dung lượng của các tài nguyên (file ảnh, icon...) cần thiết cho website. Hôm nay mình chia sẻ CSS animations bằng cách sử dụng sprite sheet khá là thú vị, và sử dụng `@keyframes ` để kiểm soát hiệu ứng ảnh động của bạn.

## 2. Cách tạo CSS animations bằng cách sử dụng sprite sheet
Cách thực hiện animations này có tư tưởng giống như những thước phim trong điện ảnh, để tạo ra chuyển động chúng ta tạo ra nhiều khung hình trong đó. Mỗi khung đại diện cho điểm ngắt chuyển động riêng biệt. Thông thường để tạo ra 1 chuyển động liên tục, thì số lượng khung hình nên là 24 hình. Các khung hình đó phải được hiển thị trong khoảng thời gian bằng nhau trong một lần hiển thị.

**Ví dụ:**
- Chúng ta có ảnh kích thước 1472px X 325px với sprite sheet 8 khung hình. Do đó chúng ta có khung kích thước 184px X 325px.

![](https://images.viblo.asia/b86e432a-81b4-4fb3-9d90-cc7b8d9060f6.png)

- Việc tiếp theo chúng ta làm đó là tạo sự chuyển động kéo ảnh sang bên trái trong 1 khung nhất định bằng cách tao ra thẻ `div` có kích thước 148px X 325px. Sau đó sử dụng @keyframes, làm ảnh chuyển động theo chiều ngang từ 0px (chiều rộng của trang mặc định - chiều rộng khung) (1472px - 184px) trong một khoảng thời gian.
- Để hiển thị hình ảnh ta sử dung `background-image` cho khung hình. Ngoài ra để tao ra ảnh chuyển động theo từng khung hình định sẵn ta sử dụng `Steps function`, `Steps` sẽ tạo ra chuyển động theo từng khung hình bằng với khung bao bên ngoài ta đã chọn kích thước và đánh lừa thị giác chúng ta như 1 ảnh chuyển động chứ không như hiệu ứng trôi ảnh bình thường từ trái qua phải.
```
.item{
  width: 184px;
  height: 325px;
  margin:0 auto;
  background-image : url(https://i.imgur.com/KBRlzAK.png);
 -webkit-animation: moveX 1s steps(8) infinite;
  -moz-animation: moveX 1s steps(8) infinite;
  -o-animation: moveX 1s steps(8) infinite;
  animation: moveX 1s steps(8) infinite;
}
```
- Để bức ảnh chuyển động liên tục từ trái quá phải ta sử dụng `@keyframes`  với thuộc tính `background-position-x` từ 0px - 1472px
```
@-webkit-keyframes moveX {
  from{background-position-x:0px;}
  to{background-position-x:-1472px;}
}
@-moz-keyframes moveX {
  from{background-position-x:0px;}
  to{background-position-x:-1472px;}
}
@-o-keyframes moveX {
  from{background-position-x:0px;}
  to{background-position-x:-1472px;}
}
@keyframes moveX {
  from{background-position-x:0px;}
  to{background-position-x:-1472px;}
}
```
**Chúc các bạn thành công và tạo ra nhiều hình ảnh động đẹp mắt với một số thao tác cơ bản trên**

 






-----


{@embed: https://codepen.io/TrinhThang/pen/dQJrpo}