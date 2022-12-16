Sáng nay tui luộc trứng. Bỏ trứng vào nồi, bật bếp rồi bỏ ra ngoài chơi game. Liếc nhìn đồng hồ trên lò vi sóng hiển thị 07:36. Dự là sẽ canh đúng 6 phút để có trứng lòng đào hoàn hảo.

07:42, tui vào tắt bếp và bóc trứng. Lòng đỏ nhão nhẹt . Nhìn kĩ mới để ý là đồng hồ trên lò chậm hơn đồng hồ trong game console gần 2 phút.

> ### Khi đồng hồ không đáng tin
Đồng hồ pin mà chúng ta xài mỗi ngày sử dụng một bộ dao động Quartz, hoạt động bằng cách đo tần suất dao động của một viên pha lê thạch anh được cấp điện bởi một cục pin.
![](https://images.viblo.asia/4276a0b2-a319-4433-ae21-93947b41a51d.jpg)
Bạn nào yêu thích tìm hiểu đồng hồ chắc sẽ biết là bộ dao động Quartz, dù cho chính xác cao hơn nhiều so với bộ dao động cơ, vẫn có sai số từ ±10-20s/tháng trong điều kiện bình thường, ngoài ra còn phụ thuộc vào nhiều yếu tố khác như là nhiệt độ.


Có nghĩa sau khi chạy được một khoảng thời gian nào đó, đồng hồ Quartz sẽ chạy lệch so với thời gian của vũ trụ. Hiện tượng này có thuật ngữ là clock drift (tạm dịch: trượt đồng hồ), clock drift có thể trượt về tương lai hoặc quá khứ tùy vào hứng của viên pha lê.

Nó đồng nghĩa với việc thời gian trên cái đồng hồ đôi khi không đáng tin cậy. Vì vậy, đồng hồ cần phải được căn chỉnh đồng bộ thường xuyên. Giống như khi đồng hồ treo trường hết pin hoặc sắp hết pin, nó sẽ không chạy chính xác nữa mà bạn “dòm” nhờ đồng hồ nhà hàng xóm để vặn lại cho đúng.

Nhưng rồi bạn sẽ đặt câu hỏi: “Tui có bao giờ chỉnh đồng hồ trên game console hay smart phone đâu mà nó vẫn chạy đúng thôi?”.

Đó là bởi vì những thiết bị đó luôn tự chỉnh lại thời gian của chính nó, thông qua một giao thức có tên gọi là NTP (Network Time Protocol).

Việc giải thích cách giao thức NTP hoạt động nằm ngoài phạm vi bài viết này, nhưng cơ bản là máy của bạn join vào một mạng lưới bao gồm rất nhiều máy tính “hàng xóm”, nơi mà lâu lâu nó ngó vào đồng hồ của chúng và tự chỉnh sửa lại cho hợp lý dựa trên một công thức phức tạp. Thời gian của mạng lưới này có nguồn từ những atomic clock có độ chính xác gần như tuyệt đối, tính bằng giây/tỉ năm. NTP đảm bảo cho độ sai lệch ở mức vài chục millisecond.

Mặc dù vậy, không có gì đảm bảo đồng hồ trên máy của bạn luôn đúng mặc dù sử dụng NTP, bởi vì không chỉ thời gian, network cũng không đáng tin cậy. Máy tính có thể bị mất kết nối tới NTP server, mất kết nối Internet, hoặc chết đi sống lại sau một thời gian dài, lúc đấy không có gì đảm bảo thời gian của bạn là reliable cả.
> ### Bài toán "trứng lòng đào"

Ta hãy thử mô tả lại bài toán trứng lòng đào dưới con mắt của một lập trình viên.

Ở đây ta có một distributed system, với 2 service (tạm gọi là `Kitchen` và `GameConsole`) chạy trên 2 máy tính riêng biệt và có kết nối mạng với nhau. Tui sẽ mô phỏng lại bằng đoạn code Ruby dưới đây, với các lớp giao tiếp networking đã được tối giản.

 `Kitchen` có 2 thao tác `boil_eggs` và `turn_stove_off`. Khi bắt đầu nấu trứng, `Kitchen` sẽ gọi `GameConsole` nhắc nó tắt bếp sau 6 phút.
 
 ![](https://images.viblo.asia/8f0b9077-ddb4-486a-9ada-655ed36eb0e9.PNG)
 
 Phương thức `GameConsole.remind` chỉ là một vòng lặp vô hạn kiểm tra khi nào thì báo bên kia tắt bếp.
 
 ![](https://images.viblo.asia/4d01a481-14df-4b81-a2b0-b1cde347a682.PNG)
 
 Ở đây, ta có một vấn đề “trứng lòng đào”. Nếu thời gian của chúng lệch nhau, như đã nói, bếp sẽ được tắt trước hạn nếu đồng hồ `GameConsole` chạy nhanh hơn `Kitchen` hoặc sau hạn nếu ngược lại. Sự đúng đắn của đoạn code này phụ thuộc vào độ đồng bộ thời gian của cả 2 máy tính.
 
 Vậy ta sẽ sửa lại bài toán trên như thế nào? Đương nhiên bạn không thể cập nhật lại đồng hồ định kì bằng cơm, càng không thể cài NTP vào lò vi sóng. Cho dù bạn cài được NTP vào lò vi sóng đi chăng nữa, bạn vẫn không thể đảm bảo đồng hồ của lò luôn luôn chính xác. Bởi vì network là không đáng tin cậy như tui đã đề cập ở trên.

Cơ mà nếu ở ngoài đời thực, ta gần như lập tức nghĩ ra cách dùng đồng hồ bấm giờ.

Hầu hết mọi hệ điều hành đều cung cấp cho ta hai loại đồng hồ để thao tác với thời gian: real-time clock `CLOCK_REALTIME` và monotonic clock `CLOCK_MONOTONIC`. Hai loại đồng hồ này được thiết kế để dùng trong những trường hợp khác nhau.
* real-time clock – còn lại là wall clock (đồng hồ treo tường), thể hiện dự đoán gần đúng nhất của máy tính về **thời điểm thực hiện tại**. Đồng hồ treo tường này luôn luôn cần được đồng bộ và có thể **go backward**.
* monotonic clock – thể hiện thời gian **đã trôi qua** tính từ một thời điểm cố định bất kì nào đó trong quá khứ. Monotonic clock **luôn tăng**.

Ta có thể sử dụng *monotonic clock* cho bài toán trên.

Lúc này thay vì gửi một giá trị tuyệt đối là timestamp đáo hạn cho `GameConsole`, `Kitchen` chỉ đơn thuần gửi gắm là nó muốn được đáo hạn sau một đơn vị thời gian.

![](https://images.viblo.asia/0e64eff9-80f8-4ba7-9d89-e18d5b0bf525.PNG)

Với `GameConsole`, khi nhận được tin nhắn, ta sẽ ghi lại `start` là monotonic time hiện tại trên máy. Sau đó tính elapsed time (thời gian trôi qua) trong mỗi vòng lặp.

![](https://images.viblo.asia/ce0c981d-8a86-4332-92bf-35a4884b5731.PNG)

Vì sao không dùng `Time.now()`?

`Time.now()` trong Ruby dùng `wall-clock`.

> ### Bài viết giúp gì bạn?

* Không giúp bạn tăng lương nhưng giúp bạn biết nấu trứng lòng đào
* Bạn cũng biết rằng bạn KHÔNG nên dùng wall clock khi muốn tính elapsed time.
* Bạn cũng nhớ rằng KHÔNG có gì đảm bảo một sự kiện xảy ra sau sẽ hiển thị sau ở hệ thống (causal effect), nếu dùng timestamp từ wall clock để order.

> Nguồn: https://quan-cam.com/posts/trung-long-dao-va-dong-ho