Như trong bài viết trước, mình đã trình bày về Charles tool : tổng quan, cách cài đặt , setting và một số chức năng chính như get log, giới hạn tốc độ đường truyền....
Trong bài biết này, mình sẽ đi sâu hơn , tìm hiểu thêm về một số chức năng nâng cao của Charles Tool.
# 1. Save / Open Charles Proxy Sessions
Khi chúng ta đã tìm ra lỗi hay vấn đề nào đó thông qua Charles, muốn để cho mọi người cùng xem và tìm hiểu trên chính máy của họ thì chúng ta có thể lưu lại Charlrs proxy session của mình.

Nội dung sẽ được lưu ở dạng file đuôi .chls , file này sẽ lưu toàn bộ thông tin request mà trước đó chúng ta đã dùng Tooles để chạy.

Khi gửi file này cho những người khác thì họ có thể mở và xem thông tin những request đó.
Để save một session : Click vào file --> Chọn Save Session
![](https://images.viblo.asia/06231739-da0d-4257-9b43-72dd1cfff0d8.png)

Để mở file : Click to file --> Chọn Open Session


# 2. Multi-Session Windows
Khi check chúng ta phải check khá nhiều chức năng, vì vậy số request mà charles tool ghi lại được rất nhiều. Dẫn đến việc mình tìm request rất tốn thời gian.
Vì vậy , chúng ta có thể sử dụng chức năng Multi - Session của Charles. Với mỗi chức năng, mỗi lần tải trang  nên để một session riêng biệt để tránh nhần lẫn cũng như tìm thông tin của request nhanh hơn.
Để mở một session mới : File --> New Session
![](https://images.viblo.asia/a171c8cf-411f-4080-ad6f-9f55df679315.png)

Ngoài ra, chúng ta còn có thể tận dụng tính năng Auto-Save của Charles. Tính năng này có thể tự động lưu session sau mỗi X phút hoặc lâu hơn.

Khi Charles lưu lịch sử của bạn vào một tệp , nó sẽ xóa dữ liệu đó khỏi phiên hoạt động, giải phóng tài nguyên cho hệ thống.

Cách tiếp cận nmulti - session có ý nghĩa nếu chỉ cần kiểm tra trong một khoảng thời gian ngắn, thì Auto - Save sẽ là một lựa chọn tốt hơn nếu chúng ta kiểm tra nhiều thứ trong một giờ hoặc trong thời gian lâu hơn.

Để mở Auto - Save :  Tool --> Auto Save
![](https://images.viblo.asia/8c4ee83c-17c2-4f63-9a33-2ca78962d37b.png)
Ở đây mình có thể setting thời gian tự động lưu.
# 3. Repeat Advanced
Trong trường hợp bạn muốn thực hiện một request lặp đi lặp lại nhiều lần để nắm bắt một vấn đề nào đó thì tính năng repeat advanced của Charles sẽ thực hiện được điều này.

Ví dụ bạn thực hiện 10 request với cùng một tiêu đề và xem độ trễ trung bình request phản hồi. Tính năng này có thể được sử dụng để sao checps các yêu cầu trước đó và thực hiện lặp lại nhiều lần theo mong muốn của bạn.

**Bước 1:**

Click chuột phải vào request muốn lặp lại nhiều lần và chọn Select Advanced từ menu:

![](https://images.viblo.asia/7d7a6809-d160-458a-90c8-2d49a28a84a3.png)

**Bước 2 :**

Chỉ định số lần muốn lặp lại request. Giá trị default là 10.

Có thể chỉ định đồng thời số lượng request chạy cùng một lúc và nếu muốn delay request theo bất kì khoảng thời gian cụa thể nào.
Nếu để ở mức một thì mỗi request sẽ chạy lần lượt theo thứ tự, lần lượt từng request một.

![](https://images.viblo.asia/6d8abc7f-4fc2-4f9e-963c-87313f941a9c.png)

**Bước 3:**

Lúc này bạn sẽ thấy Charles tạo ra những request mới, giống hệt nhau trong một tab riêng biệt.
# 4. Charles Proxy Breakpoints
Chức năng này nhằm để chỉnh sửa request hoặc response . Với mỗi trường hợp test , chúng ta có thể chỉnh sửa đầu vào cho các trường hợp để check các case mong muốn.

Chọn Proxy/Breakpoint Settings và break thử với link https://viblo.asia/series

![](https://images.viblo.asia/7f96370a-1e74-45c9-ad56-5cc673d8a421.png)

Khi chạy trên device tới trang nay, sẽ xuất hiện thông báo có thực thi tiếp hay cancel không?

Ở bước này , charles breaking request gói tin đó, bạn có thể chỉnh sửa header, body, ... tuỳ ý, sau đó ấn execute để thực hiện tiếp.

![](https://images.viblo.asia/0743cac0-726a-46f7-8a37-f07f4a325e73.png)

Tiếp tục sẽ breakpoint response, tại đây bạn có thể chỉnh sửa format json trả về trước khi execute.

![](https://images.viblo.asia/6be89a77-a8f3-4dcb-b9c3-57fdc2c5a068.png)

Như vậy mình có thể check được những case theo mong muốn.

Ví dụ như cần check một case thông tin call API sau khi xem video xong xem nó gọi API nào trước trong trường hợp: đang xem video -> Tắt mạng -> Tiếp tục xem video cho đến khi xong -> Bật mạng.

Khi mà thực hiện bằng tay , mình không thể căn đúng lúc gọi API để ngắt mạng đúng lúc được. Như vậy, trong trường hợp này Charles rất giúp ích cho QA trong việc kiểm thử.


Trên đây là một số tính năng khác của Charles Tool mà mọi người có thể sử dụng, rất hữu ích trong nhiều trường hợp. Mong có thể giúp mọi người biết thêm một số tính năng khác nữa của nó.

## Tài liệu tham khảo:

https://www.charlesproxy.com/documentation/tools/auto-save/