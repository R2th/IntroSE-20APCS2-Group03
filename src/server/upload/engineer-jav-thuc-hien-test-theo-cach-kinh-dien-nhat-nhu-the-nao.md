Hôm qua đọc được bài khá hay về 1 thanh niên nhật (tên miwa) chia sẻ cách mà engineer trong công ty của họ test như thế nào.

Đọc xong thấy công nhận khâm phục thật. Công ty họ chạy theo cách đó được gần hơn chục năm rồi. Và gần như sản phẩm chạy rất khó ra bug.

Cùng nhau đọc xem họ làm kiểu gì nhé.

## Bối cảnh

Công ty này chuyên phát triển về các phần mềm cho lĩnh vực y tế và cũng chạy được gần 30 năm rồi.

Hiện tại anh Miwa cũng đã từng tham gia vào nhiều dự án, làm với rất nhiều các kĩ sư nhưng team hiện tại mà a đang làm thì quả thực năng lực test của các engineer khá là đỉnh.

Vậy tại sao họ lại test đỉnh như vậy?

Có rất nhiều yếu tố giúp họ làm được điều đó, nhưng mà trong những thứ đó có 1 thứ làm mình thực sự ấn tượng đó là: **Mỗi ngày mọi kĩ sư bỏ ra 1 tiếng để test hệ thống.**

Từ trước đến giờ quả thực chưa gặp công ty nào kiên trì như công ty này. Kĩ sư thì mình nghĩ ai ai cũng ghét test cả, ai cũng muốn làm cho xong. Nhưng mà công ty này đã làm được, và làm được trên 15 năm mới kinh khủng.

## Mọi engineer mỗi ngày phải dành ra 1 tiếng để test hệ thống

Hằng ngày, bất kì ai trong team cũng phải bỏ ra 1 tiếng để test.

Thời gian test thì sẽ từ 10:00 ~ 17:00 mỗi ngày. Không phải là trong khoảng thời gian đó ai thích test lúc nào thì test mà thời gian này sẽ được fix từ trước cùng với PC để test.

Ví dụ như A sẽ test từ 10:00 ~ 11:00 sử dụng PC-01.

B sẽ test từ 11:00 ~ 12:00 sử dụng PC-02

Và cứ thế cho đến hết member thì thôi.

PC test ở đây được cài đặt sẵn chương trình để test rồi. Việc test này cũng giống như khách hàng đang sử dụng sản phẩm thật vậy.

Test case thì đã được chuẩn bị từ trước và cứ thế làm theo. Test từng case 1 và xác nhận xem kết quả có như mong đợi hay không và ghi lại kết quả đã test. Đương nhiên có thể free test. Cứ miễn là tìm ra bug thì thôi.

Cứ hết thời gian là kết thúc quá trình test, kể cả chưa test xong đi chăng nữa.

## Kết quả thu được sau quá trình test hệ thống

* Có thể biết được những chức năng hay sản phẩm mà bản thân mình không tham gia phát triển.
* Biết được workflow mà khách hàng sử dụng hệ thống
* Có thể phát hiện được những bug tiềm tàng.
* Biết được quá trình phát triển phần mềm như thế nào? ai là người đảm nhiệm, ai thiết kế …
* Ngoài những test case được ghi trong bản đặc tả ra thì có thể test tự do. Do đó có thể tìm ra được những bug mà ít ai để ý đến.

## Kết luận
Ai ai cũng ghét test nhưng mà nếu làm theo cách này quả thực chất lượng sản phẩm theo mình nghĩ sẽ được cải thiện rõ rệt.

1 mình tester thì có thể không cover đủ hết tất tần tật các trường hợp nhưng nếu có sự giúp đỡ của các engineer thì điều đó là hoàn toàn có thể.

Nếu dự án nào đang gặp phải vấn đề về chất lượng thì hi vọng qua bài này sẽ có chút giải pháp gì đó cho các bạn.

Chúc các bạn thành công.

Nguồn: [https://nghethuatcoding.com/2019/06/27/engineer-jav-thuc-hien-test-theo-cach-kinh-dien-nhat/](https://nghethuatcoding.com/2019/06/27/engineer-jav-thuc-hien-test-theo-cach-kinh-dien-nhat/)

==============

Để nhận thông báo khi có bài viết mới nhất thì các bạn có thể like fanpage của mình ở bên dưới nhé:

→→→ [Nghệ thuật Coding Fanpage Facebook](https://www.facebook.com/669339543503374)