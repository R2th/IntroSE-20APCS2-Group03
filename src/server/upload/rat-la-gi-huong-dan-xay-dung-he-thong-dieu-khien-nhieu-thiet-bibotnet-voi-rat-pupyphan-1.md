## I. RAT là gì?
### 1. Khái niệm và phân loại:
&nbsp; RAT là một loại  chương trình máy tính cho phép điều khiển máy tính từ xa mà nó được cài đặt trên đó.
Tùy vào mục đích sử dụng mà ta có thể chia RAT làm 2 loại cơ bản:
* **Remote Adminstrator Tools**: Đây là mục đích mang tính tích cực của RAT. Nó cho phép người dùng quản lý, sử dụng thiết bị của mình từ xa thông qua môi trường mạng nội bộ hoặc inernet. Một số chương trình nổi tiếng như Teamviewer, UltraViewer,...
* **Remote Adminstrator Troijans**: Đây là mặt trái của RAT. Khi một máy tính hoặc một mạng máy tính bị tấn công thông qua lỗ hổng nào đó. Thông thường hacker sẽ cố gắng  "để lại" một cái gì đó trong hệ thống để có thể quay lại sau này. Khi đó RAT là một sự lựa chọn tuyệt vời. Hoặc khi người dùng vô tình cài những phần mềm không rõ nguồn gốc mà bản thân chương trình đó có thể là 1 RAT chính hiệu. Một số loại RAT thông dụng cho mục đích này như Pupy, Ahmit,...<br>
Trong phạm vi của bài viết này mình chỉ đề cập đến RAT với vai trò là Remote Adminstrator Troijan.
### 2.Sơ đồ nguyên lý hoạt động của RAT:
![](https://images.viblo.asia/c8869857-5fa6-4046-a770-d6fe7b7a3801.png)
Trong mô hình trên chúng ta có 3 thành phần chính:
*    **server**: là các thiết bị đã bị cài cắm RAT
*    **C&C(command and controll) server** :  Đây là  server nhận thông tin điều khiển của hacker và đẩy lệnh điều khiển đến các server. Cũng là thiết bị nhận các phản hồi của server.
*    **client**: Đây là thiết bị mà hacker dùng để kết nối đến C&C server để điều khiển các server.

Nhưng nếu xây dựng hệ thống trong mạng local thì có thể gộp 2 thành phần C&C server với client làm một.
### 3.Các tác vụ mà RAT có thể làm:
* Theo dõi các hoạt động của người dùng như là 1 Keyloger hoặc spyware.
* Truy cập thông tin bí mật, chẳng hạn như thẻ tín dụng và số an sinh xã hội.
* Kích hoạt hệ thống camera hoặc hoặc ghi hình qua webcam của nạn nhân.
* Chụp ảnh màn hình.
* Phát tán virus hoặc malware trong hệ thống mạng của nạn nhân.
* Formatting drives.
* Xóa, download, chỉnh sửa các file hệ thống của thiết bị.
* Và nhiều tính năng khác nữa.. tùy thuộc và từng RAT khác nhau mà có thêm các tính năng khác.
### 4.RAT nguy hiểm như thế nào nếu như chúng ta bị nhiễm
![](https://images.viblo.asia/5a40e718-5afd-47c4-8c5b-882d631ebc71.png) <br>
 &nbsp; RAT cung cấp cho hacker quyền kiểm soát toàn diện, ẩn danh trên các máy tính bị nhiễm. Như bạn có thể tưởng tượng, một hacker nắm trong tay RAT có thể làm bất cứ thứ gì, miễn là mục tiêu không nghi ngờ gì. Đôi khi RAT còn được ngụy trang dưới danh nghĩa là một ứng dụng "có ích" nào đó khiến cho nạn nhân không nghi ngờ gì cả. <br>
   
&nbsp; Trong hầu hết các trường hợp, RAT được sử dụng như spyware. Hacker có thể sử dụng RAT để đánh cắp keystroke (những tổ hợp phím bạn nhấn trên bàn phím) và file từ máy tính bị nhiễm. Các keystroke và file này có thể chứa thông tin ngân hàng, mật khẩu, ảnh nhạy cảm, clip "nào đó" (ví dụ như mấy loại mà anh em hay tìm link trên  mạng xã hội ý) hoặc những cuộc hội thoại riêng tư. Ngoài ra, tin tặc có thể sử dụng RAT để kích hoạt webcam hoặc micrô của máy tính một cách kín đáo để xem "stream" chằng hạn. Việc bị theo dõi này rất nguy hiểm vì nó có thể cung cấp các thông tin của nạn nhân cho các hoạt động phạm pháp nào đó.<br>
    
 &nbsp; Vì RAT cung cấp cho hacker quyền truy cập admin vào các máy tính bị nhiễm, nên hacker có thể tự do thay đổi hoặc tải xuống bất kỳ file nào. Có nghĩa là một hacker nắm trong tay RAT có thể xóa sạch ổ cứng, tải xuống nội dung bất hợp pháp từ Internet thông qua máy tính của nạn nhân hoặc cài đặt thêm phần mềm độc hại. Hacker cũng có thể điều khiển máy tính từ xa để thực hiện các hành động bất hợp pháp trực tuyến dưới danh nghĩa nạn nhân hoặc sử dụng mạng gia đình làm máy chủ proxy để thực hiện nhưng hoạt động nguy hiểm khác như tạo hệ thống **Botnet**, đào tiền ảo, điều khiển các thiết bị IoT hoặc sử dụng chính thiết bị của nạn nhân thực hiện các cuộc tấn công khác.
 ### 5.Cách phòng chống  RAT
&nbsp; Do hầu hết những RAT được sử dụng đều khá nổi tiếng nên khá dễ bị phát hiện bởi các chương trình diệt virus. Nhưng bên cạnh đó cũng có những RAT rất khó có thể bị phát hiện. Vậy nên, người dùng không nên tải file từ những nguồn mà bạn không tin tưởng. Bạn không nên mở các file đính kèm email từ người lạ, bạn không nên tải xuống những game crack hoặc phần mềm từ các trang web không tin tưởng hay torrent file trừ khi chúng xuất phát từ một nguồn đáng tin cậy. Luôn cập nhật trình duyệt và hệ điều hành. Nên cài một chương trình diệt virus nào đó hoặc ít nhất cũng không nên tắt **Windown Defender**.<br>

&nbsp; Trong trường hợp phát hiện hoạt động bất thường của máy tính, người dùng nên dùng các phần mềm diệt virus uy tín để quét thiết bị. Nếu trong trường hợp, quét rồi mà vẫn thấy có hoạt động bất thường thì xin "chúc mừng" có thể người dùng dính "hàng" đặc biệt, hãy format và cài lại hệ điều hành(cách này có thể hơi gắt nhưng đảm bảo tới 99%).<br>

&nbsp; Việc phát triển RAT mới khá là phức tạp và mất nhiều thời gian và việc phát triển RAT mới chủ yếu phục vụ mục đính tấn công vào chình phủ hoặc các tập đoàn lớn. Với người dùng thông thường thì việc quét thiết bị bằng phần mềm diệt virus là ổn rồi.</br>

Rất cảm ơn các bạn đã đón đọc. Trong phần 2 tới mình sẽ hướng dẫn xây dựng botnet với RAT Pupy.
## II. Hướng dẫn xây dựng hệ thống điều khiển nhiều thiết bị (Mạng BOTNET) với RAT Pupy
## III. Tài liệu tham khảo
* [https://www.howtogeek.com/410634/what-is-rat-malware-and-why-is-it-so-dangerous/](https://www.howtogeek.com/410634/what-is-rat-malware-and-why-is-it-so-dangerous/)