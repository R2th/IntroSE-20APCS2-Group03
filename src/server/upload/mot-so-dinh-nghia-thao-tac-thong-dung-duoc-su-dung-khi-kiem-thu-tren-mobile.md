Hiện nay, việc viết testcase bằng tiếng anh trở nên phổ biến. Thậm chí, với những cty đa quốc gia, đây còn là việc bắt buộc cần phải thực hiện. Bên cạnh đó, khi viết hay trao đổi chúng ta nên dùng những từ ngữ mang tính thông dụng, và chuẩn xác giúp người khác tiếp cận vấn đề mà chúng ta đang nhắc tới nhanh hơn rất nhiều. Sau đây, tôi xin giới thiệu một vài định nghĩa phổ biến và thường được sử dụng khi viết Testcase hay trao đổi với các bên kỹ thuật liên quan tới thao tác người dùng khi kiểm thử giao diện trên mobile.

# Các thao tác cơ bản cho hầu hết các lần chạm
| Hành động người dùng | Từ sử dụng | Ghi chú/ Ví dụ|
| -------- | -------- | -------- |
| Chạm nhanh vào một nơi nhất định trên bề mặt điện thoại bằng đầu ngón tay  |   Tap | Step: User taps into search box|
|Thực hiện chạm nhanh 2 lần liên tiếp vào cùng 1 chỗ|Double Tap|Thường được sử dụng trong các case không hợp lệ để kiểm tra các button hoạt động có đúng không|
|Di chuyển ngón tay liên tuc trên bề mặt thiết bị mà ko bị ngắt quãng|Drag|Có nhiều kiểu kéo, phụ thuộc vào hành vi và yêu cầu tài liệu. Như: Kéo lên trên - Drag Up, Kéo xuống dưới - Drag Down, Kéo sang trái - Drag Left, Kéo sang phải - Drag Right. Ví dụ - Step: User drags left ticket from column 1 to column 2|
|Dùng ngón tay để di chuyển có hướng với tốc độ nhanh|Swipe|Giống như drag, swipe cũng có nhiều kiểu vuốt, vuốt sang trái - Swipe left, vuốt sang phải - Swipe right, vuốt lên trên - Swipe up, vuốt xuống dưới - Swipe down|
|Sử dụng hai hoặc nhiều ngón tay đồng thời để phóng to/ thu nhỏ một ảnh|Pinch/ Spread| Step: User pinches/spreads action for file preview => Expect result: User can zoom in/ zoom out file  |
|Sử dụng ngón tay để chạm vào bề mặt thiết bị trong một khoảng thời gian|Press|Press được kết hợp với nhiều kiểu khác. Giống như Press and Drag hoặc Press and Tap|
|Sử dụng 2 ngón tay để chạm vào bề mặt thiết bị và di chuyển chúng theo chiều kim đồng hồ hoặc ngược chiều kim đồng hồ| Rotate|Thường được sử dụng để kiểm tra các trường hợp xoay ngang hoặc xoay dọc màn hình của app|
|Sử dụng cả bàn tay để cầm xong lắc sang phải|Bump Right|Đối với một số app giải trí hiện nay hay có tính năng lắc để chơi. Ví dụ: User bump right action on the timeline|
|Sử dụng cả bàn tay để cầm xong lắc sang phải|Bump Left|Ví dụ: User bump right action on the timeline |
|Sử dụng ngón tay để chạm vào bề mặt thiết bị và giữ trong một khoảng thời gian| Press & Hold|Ví dụ: User press and hold action for copy text in file preview|
|Sử dụng 2 ngón tay chạm vào bề mặt thiết bị sau đó mở to chiều rộng của 2 tay |Zoom out or scale up|Ví dụ: User zoom out action for photo preview|
|Người dùng thực hiện zoom out sau đó thu nhỏ chiều rộng 2 tay |Zoom in or scale down|Ví dụ: User zoom in or scale down action for photo preview |
|Sử dụng ngón tay chạm vào thanh cuộn trên bề mặt thiết bị và kéo sang trái|Scroll left|Ví dụ: User scroll left action in the timeline |
|Sử dụng ngón tay chạm vào thanh cuộn trên bề mặt thiết bị và kéo sang phải|Scroll right|Ví dụ: User scroll right action in the timeline|
|Sử dụng ngón tay chạm vào thanh cuộn trên bề mặt thiết bị và kéo từ trên xuống dưới |Scroll down|Ví dụ: User scroll down action for new message in the timeline|
|Sử dụng ngón tay chạm vào thanh cuộn trên bề mặt thiết bị và kéo từ dưới lên trên|Scroll up|Ví dụ: User scroll up action for old message in the timeline|
> Ảnh mô tả các hành động 
> ![](https://images.viblo.asia/670b4dd9-2fc9-4275-8882-7af66c249bc2.jpg)
![](https://images.viblo.asia/829e4705-c90a-40cb-835d-87cb039e638a.jpg)
![](https://images.viblo.asia/76a56abf-82e5-4d8f-bfd8-759944d1f209.jpg)

> Bài viết tham khảo: https://sangbui.com/mobile-gesture-definitions-post/