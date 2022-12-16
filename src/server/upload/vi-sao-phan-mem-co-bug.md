Hầu như tất cả các Software Tester đều có một câu hỏi trong đầu rằng 

“Tại sao phần mềm lại có Bug ? ”  

và

" Những bug này xảy ra như thế nào?” 

Câu hỏi này sẽ được giải đáp trong bài viết dưới đây.

Trong bài viết này, chúng ta sẽ biết 20 lý do hàng đầu tại sao Bug xảy ra trong phần mềm. 

## Thế nào là 1 Bug trong phần mềm ? 

Bug phần mềm là một lỗi hoặc lỗ hổng trong phần mềm tạo ra kết quả không mong muốn hoặc không chính xác, làm cho ứng dụng không hoạt động được như bình thường.

## Vì sao phần mềm có Bug ? 
Có nhiều lý do dẫn đến Bug, lý do phổ biến nhất là do lỗi của con người trong thiết kế và viết code.

Một khi bạn biết nguyên nhân của Bug, bạn sẽ dễ dàng thực hiện các hành động sửa chữa để giảm thiểu những khiếm khuyết này.

![](https://images.viblo.asia/e76d0802-532f-497f-a5a9-429dfeab664a.jpg)

## 20 lý do hàng đầu dẫn đến lỗi phần mềm 

### 1) Thông tin sai lệch hoặc không có thông tin liên lạc giữa các bên
Sự thành công của bất kỳ ứng dụng phần mềm nào cũng phụ thuộc vào giao tiếp giữa các bên liên quan, nhóm phát triển và kiểm thử. Yêu cầu không rõ ràng và diễn giải sai yêu cầu là hai yếu tố chính gây ra lỗi trong phần mềm.

Ngoài ra, các khiếm khuyết cũng có thể xảy ra trong giai đoạn code nếu các yêu cầu chính xác không được truyền đạt đúng cách cho các nhóm phát triển.

Ví dụ : 

Dự án X có chức năng phát triển video giới thiệu sản phẩm đến khách hàng.  Các vieo này sẽ xuất hiện ở trang chủ và 1 số màn hình khác. 

Khách hàng muốn thêm 1 mục con chứa các sub-video bên dưới các video trên, nhưng không nói rõ sẽ thêm ở màn nào. Dev khi bắt tay vào code không confirm lại mà tự động add các sub-video vào tất cả các màn có video chính. QA khi test chức năng này đã confirm lại với BrSE và phía khách hàng thì phát hiện mong muốn của họ là chỉ add các sub-video ở màn trang chủ. 

Lỗi này xảy ra do thiếu sự liên lạc giữa dev - BrSE - khách hàng. Để khắc phục thì cần có sự confirm lại khi không chắc chắn, không tự ý tạo specs như ở trên. 
### 2) Độ phức tạp của phần mềm
Sự phức tạp của các ứng dụng phần mềm hiện tại có thể gây khó khăn cho bất kỳ ai nếu không có kinh nghiệm phát triển phần mềm hiện đại.

Giao diện kiểu Windows,Client-Server và Ứng dụng phân tán, Truyền thông dữ liệu, Cơ sở dữ liệu nhiều quan hệ và kích thước của các ứng dụng đều góp phần vào sự tăng trưởng theo cấp số nhân về độ phức tạp của phần mềm hoặc hệ thống.

Việc sử dụng các kỹ thuật hướng đối tượng có thể phức tạp thay vì đơn giản hóa một dự án, trừ khi nó được thiết kế tốt.
### 3) Lỗi lập trình
Các lập trình viên cũng giống như bất kỳ ai khác, đều có thể mắc lỗi lập trình. Không phải tất cả các nhà phát triển đều là chuyên gia về domain. Lập trình viên thiếu kinh nghiệm hoặc lập trình viên không có kiến ​​thức về domain phù hợp có thể mắc các lỗi đơn giản trong khi viết code.

Bỏ qua những dòng code đơn giản, thiếu bước kiểm thử đơn vị, quá trình tìm nguyên nhân gây ra lỗi là một số lý do phổ biến khiến bug xảy ra ở giai đoạn phát triển. 
### 4) Khách hàng thay đổi yêu cầu
Khách hàng có thể không hiểu độ ảnh hưởng khi thay đổi một số yêu cầu, hoặc có thể hiểu mà vẫn yêu cầu chúng ta thiết kế lại, lên lịch lại cho đội dự án, ảnh hưởng đến tiến độ hiện tại, công việc đã hoàn thành có thể phải làm lại hoặc bỏ đi làm mới, các yêu cầu về phần cứng có thể bị ảnh hưởng, v.v.

Các thay đổi dù nhỏ hay lớn, các yếu tố phụ thuộc đã biết và chưa biết giữa các phần của dự án có khả năng tương tác, gây ra vấn đề và sự phức tạp của việc theo dõi các thay đổi có thể dẫn đến sai sót. Sự nhiệt huyết của cả đội dự án có thể bị ảnh hưởng.

Trong một số môi trường kinh doanh có đặc thù thay đổi thường xuyên, việc các yêu cầu được sửa đổi liên tục có thể là một phần thực tế diễn ra hàng ngày.

Trong trường hợp này, những người quản lý phải hiểu các rủi ro có thể xảy ra, đồng thời QA và các kỹ sư kiểm thử phải thích ứng và lập kế hoạch kiểm tra liên tục trên diện rộng để giữ cho các lỗi không vượt quá tầm kiểm soát.

### 5) Áp lực về thời gian
Việc khó nhất là lên lịch thực hiện cho các dự án phần mềm vì thường đòi hỏi rất nhiều phỏng đoán. Nếu estimate thời gian không chuẩn xác, khi deadline đến gần thì các sai lầm sẽ dần hiện rõ. 
Nếu không có đủ thời gian để thiết kế, viết mã và kiểm tra thích hợp, Bug chắc chắn sẽ xuất hiện. 
Ví dụ : Dự án có thời gian kiểm thử là 2 tuần thì khả năng tìm ra nhiều Bug sẽ lớn hơn dự án chỉ có thời gian kiểm thử là 1 tuần. Khi có đủ thời gian, QA khi kiểm thử sẽ không chỉ tập trung vào tìm lỗi mà sẽ chú ý đến khả năng thích hợp của ứng dụng đối với người dùng như giao diện chưa phù hợp, button A nên đặt ở vị trí trên đầu màn hình mà không nên để ở cuối màn hình. 

### 6) Những người tự cao hoặc quá tự tin
Mọi người thích nói những điều như:

'Không có vấn đề gì đâu'


'Đơn giản'


'Tôi sẽ xử lý nó trong vài giờ nữa'


"Rất dễ dàng cập nhật dòng code cũ đó"


thay vì:

'Nhiều thứ phức tạp được thêm vào có thể khiến chúng ta mắc rất nhiều lỗi ở giai đoạn cuối'

"Chúng tôi không biết liệu có thể làm được điều đó hay không, chúng tôi sẽ xem xét"

"Tôi không ước tính được sẽ mất bao lâu cho đến khi khi xem xét kỹ vấn đề"

"Chúng tôi không thể tìm ra mã  nguồn cũ đó đã gây ra những vấn đề gì ở giai đoạn đầu "

Nếu một sản phẩm phần mềm có quá nhiều thứ "không có vấn đề gì" như ở trên, khả năng lỗi xuất hiện là rất lớn. 

Để khắc phục, QA khi thực hiện test nên có mind set rằng chỗ nào cũng có thể gây nên lỗi, ngay cả những tính năng đã chạy từ lâu. Từ đó phân bổ thời gian test cho hợp lý sao cho ứng dụng chạy ổn định khi đến tay người dùng. 

### 7) Tài liệu về coding ít được ghi lại 
Thật khó để bảo trì và sửa đổi những dòng code yếu kém hoặc ít được ghi chép lại, kết quả là dẫn đến Bug. Trong nhiều tổ chức, người quản lý dự án không khuyến khích các lập trình viên ghi chép lại code của họ hoặc viết code rõ ràng, dễ hiểu. Điều này khiến bất kỳ lập trình viên mới nào bắt đầu làm việc với code này đều có thể bị nhầm lẫn do độ phức tạp của dự án và có quá ít tài liệu về code. Đôi khi phải mất khá nhiều thời gian hơn để thực hiện các thay đổi nhỏ trong code vì trước mỗi một thay đổi, lập trình viên lại phải tự mày mò tìm hiểu về code vì không có tài liệu về code được ghi chép lại. 

### 8) Các tool phát triển phần mềm
Các công cụ trực quan, thư viện, trình biên dịch, công cụ viết kịch bản, v.v. thường chứa lỗi do đặc thù của chúng hoặc được ít được ghi chép lại về nghiệp vụ, dẫn đến sự xuất hiện của lỗi.

Các nhà lập trình thường có xu hướng liên tục thay đổi các công cụ phần mềm. Việc theo kịp các phiên bản khác nhau và khả năng tương thích của chúng là một vấn đề lớn có thể dẫn đến bug.
### 9) Sự lỗi thời của các tập lệnh tự động hóa
Việc viết các tập lệnh tự động hóa mất rất nhiều thời gian, đặc biệt là đối với các kịch bản phức tạp. Nếu nhóm tự động hóa ghi lại hoặc viết bất kỳ tập lệnh kiểm thử nào mà quên cập nhật nó trong 1 khoảng thời gian thì thử nghiệm đó sẽ trở nên lỗi thời, dẫn đến bug. 

Nếu kiểm thử tự động không xác thực kết quả một cách chính xác, các khiếm khuyết sẽ không được phát hiện.

### 10) Thiếu những kiểm thử viên có tay nghề 
Việc có những người kiểm thử lành nghề với kiến ​​thức về domain là cực kỳ quan trọng cho sự thành công của bất kỳ dự án nào. Tuy nhiên, không phải dự án nào cũng có thể sở hữu tất cả những kiểm thử viên có kinh nghiệm.

Kiến thức về domain và khả năng tìm ra lỗi của kiểm thử viên là yếu tố chính đảm bảo phần mềm đạt chất lượng cao. Thỏa hiệp về bất kỳ điều nào trong số này cũng có thể dẫn đến lỗi trong phần mềm. 

Dưới đây là một số lý do khác dẫn đến Lỗi phần mềm. Những lý do này hầu hết có thể áp dụng cho vòng đời kiểm thử phần mềm:

### 11) Không thiết lập môi trường thử nghiệm thích hợp để thử nghiệm tất cả các yêu cầu.

### 12) Bắt tay vào viết code hoặc viết test case mà không hiểu rõ các yêu cầu.

### 13) Design không chính xác dẫn đến các vấn đề  trong tất cả các giai đoạn của Chu kỳ Phát triển Phần mềm.

### 14) Phát hành  thường xuyên các bản fix lỗi mà không hoàn thành Vòng đời kiểm thử phần mềm. 

### 15) Không đào tạo nhân lực về các kỹ năng cần thiết để phát triển hoặc kiểm thử ứng dụng đúng cách.

### 16) Dành rất ít hoặc không có thời gian cho Kiểm thử hồi quy.

### 17) Không tự động hóa các trường hợp kiểm thử lặp đi lặp lại, và tùy thuộc vào người kiểm thử để thử nghiệm thủ công mọi lúc.

### 18) Không ưu tiên thực hiện việc kiểm thử.

### 19) Không thường xuyên theo sát tiến trình phát triển và kiểm thử phần mềm. Những thay đổi vào phút cuối có khả năng gây ra Bug.

### 20) Thực hiện sai giả định trong giai đoạn code và kiểm thử.

Nguồn : https://www.softwaretestinghelp.com/why-does-software-have-bugs/