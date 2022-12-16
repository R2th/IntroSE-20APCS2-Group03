Khi một QA bắt đầu làm việc trong một dự án ứng dụng di động, câu hỏi lớn nhất đầu tiên mà chúng ta phải đối mặt là môi trường thử nghiệm là gì?.

Với thị trường  điện thoại di động đang phát triển mỗi ngày, việc quyết định các thiết bị mà ứng dụng di động của bạn nên thử nghiệm là một thách thức thực sự. Việc mua thiết bị thực 1 cách cẩu thả rất tốn kém và không thể thực hiện mọi thử nghiệm trên trình giả lập, nên các thử nghiệm phải được tạo ra một cách thông minh. 

Android là một hệ điều hành với mã nguồn mở, mở ra cánh cửa cho các công ty cá nhân ra mắt các thiết bị của họ dùng hệ điều hành Android, và cũng chính vì đó các thiết bị này có giá thành rẻ hơn. Không phải ai cũng có thể mua Iphone, samsung S10, Google Pixel 3 XL... do đó một lượng lớn người dùng theo xu hướng điện thoại tầm trung và thấp như Samsung S6, Google Nexus 5, LG G4...

### Các loại thiết bị di động

Ở một mức độ cao, các thiết bị có thể được phân loại thành High-end devices (tạm dịch: Những thiết bị cấu hình cao), Low-end devices (Những thiết bị cấu hình thấp). 

* **High-end devices** thường là những thiết bị với hỗ trợ LTE, 4G, kích thước màn hình lớn, Ram trên 2GB... và tất nhiên những thiết bị này rất tốn kém.
* **Low-end devices** là những thiết bị đối lập với nhóm trên, hệ điều hành cũ hơn, kết nối 2G, 3G, màn hình nhỏ, bộ nhớ thấp, khe cắm thẻ nhớ để tăng kích thước bộ nhớ riêng, do đó các thiết bị này thường khá rẻ (nói cách khác là phù hợp với mọi người).

### Môi trường kiểm thử thiết bị di động

Là một QA khi được giao đề xuất chọn môi trường kiểm thử di động cho một ứng dụng,  bạn cần xem xét các yếu tố nào để tối ưu nhất cho việc kiểm thử của mình?

Bên cạnh đó, việc lựa chọn giữa thiết bị thực và máy ảo lại càng khó hơn vì không phải tất cả các [sự cố crash](https://viblo.asia/p/nghien-cuu-crash-app-Qpmleqk7lrd) được tìm thấy trên máy ảo, nhưng nếu mua toàn bộ thiết bị thực thì lại quá tốn kém chi phí.

Trong trường hợp này, tôi sẽ đề xuất lựa chọn như sau: 1 thiết bị high-end, 1 hoặc 2 thiết bị mid-end và ít nhất 2 thiết bị low-end.

Dựa trên kinh nghiệm làm việc trên các thiết bị thực có phân cấp khác nhau trên, tôi nhận ra giữa chúng có những đặc điểm khác biệt sau:
* Thiết bị high-end: Dễ nhận thấy ứng dụng chạy rất mượt, và nhanh vì bạn có tới trên 2GB ram, màn hình lớn, độ phân giải cao, dung lượng lớn, các loại điện thoại cấu hình cao này nên được sử dụng ưu tiên để kiểm thử chức năng của ứng dụng. Nhưng không phải là lựa chọn tốt để kiểm thử các trường hợp giao diện hay là tràn bộ nhớ.
* Thiết bị mid-end: Ứng dụng chạy khá mượt mà, nhưng thi thoảng vẫn có thể gặp lỗi tràn bộ nhớ (1/10 hay 1/15 lần thử). Nhưng điều này cũng đủ để cấu thành lỗi nghiêm trọng, vì các sự cố bị lỗi do khách hàng báo cáo cho một ứng dụng di động là không thể chấp nhận được và nó để lại hình ảnh xấu về công ty.
* Thiết bị low-end: Ứng dụng có thể hoặc không thể chạy mượt và ổn định trên các thiết bị cấu hình thấp vì một số yếu tố về cấu hình nhất định.

Các yếu tố đó chính là:

1. Kết nối mạng chậm: Hiên tại các thiết bị cấu hình thấp thường không hỗ trợ mạng 3G và một thiết bị di động thì lại có các ứng dụng chạy ngầm sử dụng mạng di động. Trong một kịch bản thực của kiểm thử, người dùng có thể đã bật đồng bộ về các tài khoản như Gmail, Whatsapp, Google service... Những nguyên nhân ngốn băng thông của thiết bị.

![](https://images.viblo.asia/8d7f6188-b4d6-479b-b270-bfadb1aaa82d.jpg)


2. UI: Các thiết bị cấu hình thấp thường có kích thước màn hình nhỏ, từ 4" tới 6", do đó việc sử dụng app khi trượt lên xuống, ấn vào danh sách hay các icon khá là khó. Các icon, biểu tượng có kích thước nhỏ, không dễ để chạm vào chúng. Tương tự khi cuộn một trang, màn hình với danh sách cách item dài cũng có thể gây ra sự cố hoặc biến dạng về hình ảnh.

![](https://images.viblo.asia/f0a489e2-7afb-47f6-86b6-39e7e078b2db.jpg)

3. Bộ nhớ thấp: Các thiết bị cấu hình thấp thường không có đủ bộ nhớ để có thể hoạt động và lưu trữ của ứng dụng. Thường thì bộ nhớ của máy sẽ là 5- 6GB, chưa tính tới hệ thống đã ngốn tới 3- 4GB. Do đó, các ứng dụng phát triển thường chạy chậm hoặc đôi khi hiển thị các thông báo buộc đóng app để giải phóng bộ nhớ sử dụng.

### Tại sao kiểm thử trên các thiết bị cấu hình thấp lại quan trọng?

Cái này còn tùy vào đối tượng sử dụng chính của ứng dụng bạn đang phát triển, không cần phải sử dụng thiết bị cấu hình thấp lỗi khi thực hiện kiểm thử, nhưng trước khi ứng dụng được release bạn nên thực hiện full-test 1 lần trên 1 thiết bị low-end.

Trên thế giới, nhất là nước ngoài hoặc thị trường Nhật bản, thường các thiết bị sử dụng của họ không cầu kỳ, chủ yếu liên lạc, giải trí đơn thuần. Nhóm những người có điện thoại cấu hình cao chỉ chiếm 1 phần nhỏ trong đó. Nếu ứng dụng của bạn hoạt động ổn định mượt mà trên điên thoại cao cấp điều đó không có nghĩa là nó cũng sẽ hoạt động tốt trên các thiết bị cấp thấp cả.

Kinh nghiệm 2 năm kiểm thử trên rất nhiều thiết bị di động thì 3 vấn đề xảy ra ở trên tôi đã nói, thường khó giải quyết hơn các lỗi thông thường, hoặc các vấn đề này sẽ kéo theo lỗi nghiêm trọng của ứng dụng mà bên dev rất khó để kiểm soát được. Nên theo tôi, bạn nên kiểm trên các thiết bị cấu hình thấp ngay khi có thể.

**Kiểm thử trên các thiết bị cấu hình thấp quan trọng bởi vì:**
* Hệ điều hành của thiết bị đã cũ, không hỗ trợ lên bản mới nhất nên có thể sẽ gặp một số lỗi hỗ trợ.
* Có rất nhiều ứng dụng hệ thống, ứng dụng google được cài sẵn trên máy với bộ nhớ thấp, do đó đây là những thiết bị tốt để bạn kiểm thử bộ nhớ thấp.
* Hoạt động của ứng dụng đang phát triển có tương tác tốt với một số ứng dụng máy như là: Google maps, Tin nhắn, Hangout...
* Một số thiết bị cũ, có thể không được hỗ trợ camera, do đó các ứng dụng cần quyền Camera để hoạt động có thể sẽ phát sinh các vấn đề liên quan.
* Nếu ứng dụng của bạn cần GPS hoạt động liên tục, thì bạn cần để ý dung lượng của pin sẽ hoạt động như thế nào.
* Sở hữu một màn hình cực nhỏ thì việc ấn vào các biểu tượng, icon, trượt kéo danh sách, di chuyển qua lại các màn hình có thể sẽ nảy sinh lỗi.

**Dựa vào kinh nghiệm bản thân và từ các đồng  nghiệp QA tích lỹ được thì các vấn đề sau thường gặp trên các thiết bị cấu hình thấp:**
* Ứng dụng bị lag, freeze có thể là crash khi thao tác trên ứng dụng nhanh hoặc chuyển màn hình liên tục.
* Các văn bản với nhiều kích thước có thể hiển thị sai trên các màn hình nhỏ này.
* Ứng dụng dùng GPS hoặc camera liên tục ngốn pin của thiết bị quá nhiều. 
* RAM thấp nên xử lý khi thao tác chậm, có thể click 1 lần ăn 2, 3 lần.
* Google service ở hệ điều hành thấp crash liên tục, có thể ảnh hưởng tới app của mình khi test bản build từ Google Store.

![](https://images.viblo.asia/5cd6c4a8-73d8-49b0-aef5-692641df7f8a.jpg)

### Máy ảo, trình giả lập có thể thay thế các thiết bị thực cấu hình thấp hay không?

Nếu bạn là 1 QA có trên 1 năm kinh nghiệm chắc chắn đều nhận thức rằng việc sử dụng máy ảo để kiểm thử chưa bao giờ là lựa chọn khôn ngoan cả. Vì sử dụng máy ảo sẽ bị miss rất nhiều lỗi đóng app và stability. 

Thường thì máy ảo sẽ hữu dụng khi bạn đang thiếu thiết bị chưa mua kịp hoặc không thể có. Nhưng mà nếu bạn buộc lòng phải sử dụng thì máy ảo cũng chỉ khá tốt khi kiểm thử các vấn đề về hiển thị, màn hình, màu sắc thôi. 

Vậy câu trả lời cho câu hỏi này sẽ là: Không, chắc chắn rồi. Nhất là các vấn đề về sự ổn định của ứng dụng.


### Kịch bản nào cho kiểm thử trên các thiết bị cấu hình thấp

Sau đây là một số gợi ý của tôi khi thực hiện kiểm thử ứng dụng trên các thiết bị cấu hình thấp:
* Đừng bao giờ kiểm thử nguyên 1 kịch bản trên 1 thiết bị, thay vào đó hãy kiểm thử đan xen để có thể tìm kiếm các lỗi ẩn khó tìm. Ví dụ: QA1 thực hiện chạy testcase cho Funciton 1, QA 2 cho Function 2, QA 3, Verify ticket... đó là nếu bạn đủ nhân lực, còn ngược lại bạn có thể thử thay đổi thiết bị để kiểm thử. Chắc chắn điều này sẽ cho được kết quả thú vị.
* Thảo luận các vấn đề gặp phải với QA trong team hoặc trong công ty, điều này có thể bù đắp được kinh nghiệm bản thân của mình bằng người khác.
* Cho tới khi ứng dụng gặp của bạn gặp vấn đề về sự ổn định, khuyến khích bạn nên có những testcase riêng hoặc kịch bản riêng cho các thiết bị cấu hình thấp để tìm kiếm các lỗi.
* Khi gặp phải lỗi nghiêm trọng, hãy ngồi cùng developer sửa lỗi đó và cùng tìm nguyên nhân, ảnh hưởng của vấn đề này. Chắc chắn rằng bạn không chỉ kiểm tra lại bug đó, mà còn kiểm thử những màn hình liên quan sau khi nó được sửa để đảm bảo rằng các issue tương tự hoặc issue khác sẽ không phát sinh sau khi lỗi được sửa.
* Cuối cùng nhưng không kém phần quan trọng, hãy ghi lại những lỗi khi bạn gặp phải , cách thức tái tạo lỗi, độ ảnh hưởng, thường gặp ở màn hình nào. Điều này sẽ tăng thêm kiến thức của bạn về những lỗi này, và đảm bảo nó không bị gặp lại cho những dự án sau này của bạn.

### Lời kết

Thường thì các hạn chế về bộ nhớ hoặc kết nối internet hay dẫn tới các vấn đề như: Crash ứng dụng (buộc đóng ứng dụng với tin nhắn thông báo không phản hồi), sử dụng ứng dụng giật lag gây khó chịu cho người sử dụng, các item không được thiết kế cho màn hình nhỏ nên có thể rất khó để ấn nếu nó là 1 đống hỗn độn nằm chen lấn nhau, sử dụng ứng dụng quá hao pin....


Ứng dụng di động là một thị trường phát triển rất nhanh và hệ điều hành mới luôn được cập nhật trong vòng vài tháng, do đó, kiểm thử kết hợp tất cả các hệ điều hành di động là bất khả thi. Do đó, lựa chọn thiết bị để kiểm thử cho ứng dụng của bạn là một quyết định quan trọng và phải thật không ngoan. 

Nếu Leader, cấp trên của bạn không quan tâm về việc kiểm thử trên các thiết bị cấu hình thấp, hãy đưa bài viết này cho họ, hãy thuyết phục họ về độ quan trọng của việc kiểm thử trên các thiết bị cấu hình thấp. Trừ khi ứng dụng của bạn được khách hàng đưa ra điều kiện tập trung vào kiểm thử trên các thiết bị xịn thì hãy quên nó đi.

![](https://images.viblo.asia/c3142ff4-67e3-450b-8fa2-05a1dd1e4a80.gif)


-----

Bài viết được tham khảo từ [Software Testing Help](https://www.softwaretestinghelp.com/mobile-testing-low-end-devices/) và bổ sung thêm kiến thức từ kinh nghiệm bản thân.

Ảnh: Internet