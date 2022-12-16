**Ứng dụng trên nền tảng iOS**

iOS là một hệ điều hành di động được Apple thiết kế cho các thiết bị của họ.

Nghiên cứu hiện tại báo cáo rằng iOS là hệ điều hành di động phổ biến thứ hai trên thị trường.  iOS bị giới hạn ở phần cứng của Apple chứ không đa nền tảng như Android.

iOS đã chứng kiến tổng cộng 10 bản phát hành lớn trong những năm qua và đã cung cấp các bản cập nhật tính năng đáng chú ý trong mỗi bản phát hành.

![](https://images.viblo.asia/b600b71d-366b-419b-b407-40dc18780abf.jpg)
Hệ điều hành iOS này nổi tiếng vì sự thân thiện với người dùng, tính linh hoạt trong hoạt động, ứng dụng không có sự cố... Kho ứng dụng Apple iTunes cho iOS khá phong phú với số lượng ứng dụng lên tới 2,2 triệu. Việc tải xuống các ứng dụng đã nhanh chóng lên tới con số khổng lồ 130 tỷ.

iOS là một hệ điều hành không bị hạn chế bởi bất kỳ rào cản khu vực hoặc ngôn ngữ nào. Đây là một trong những yếu tố chính giúp hệ điều hành này trở nên nổi tiếng chỉ sau 10 năm phát triển. Nó hỗ trợ 40 ngôn ngữ khác nhau.

**Vấn đề phổ biến mà các ứng dụng iOS gặp phải**

1. Lỗi làm ứng dụng bị treo

Một trong những vấn đề khó chịu nhất khi sử dụng ứng dụng trên các thiết bị của Apple là ứng dụng có thể bị treo thường xuyên . Ứng dụng có thể gặp phải lỗi treo khi thực hiện một thao tác cố định nào đó hoặc do rò rỉ bộ nhớ trong ứng dụng.

2. Ứng dụng không tương thích

Ứng dụng iOS có thể chạy hoàn hảo trên phiên bản iOS hiện tại, nhưng nếu phiên bản iOS được nâng cấp, nó có thể không hoạt động do ứng dụng đó chưa hỗ trợ được phiên bản cao hơn. Đó là lỗi trong quá trình phát triển đã không phát hiện ra vấn đề này, gây ra lỗi không tương thích.

3. Lỗi lỗ hổng bảo mật

Lỗ hổng bảo mật trong iOS cho phép tin tặc tấn công các thiết bị iOS, đánh cắp thông tin cá nhân của người dùng. Cho đến hiện tại, đã có nhiều lỗ hổng bảo mật nghiêm trọng của iPhone được phát hiện trong các phiên bản iOS khác nhau.

4. Lỗi rò rỉ bộ nhớ

Rò rỉ bộ nhớ là các lượng bộ nhớ vẫn được phân bổ cho ứng dụng trong khi ứng dụng không còn được sử dụng nữa. Rò rỉ bộ nhớ khiến ứng dụng iOS bị treo, đây là lỗi rất nghiêm trọng.

5. Sự cố về cài đặt

Những lỗi này có thể làm cho quá trình cài đặt kém. Bạn có thể gặp sự cố trong khi cài đặt iOS. Bạn có thể phải khởi động lại thiết bị thường xuyên để sử dụng tốt hơn.

6. Pin dự phòng yếu

Nhiều người dùng phàn nàn về thời lượng pin kém của iOS 8.3. Trong khi đang sử dụng thiết bị thì pin dự phòng sẽ tắt. Nó có thể không phải là vấn đề của pin, có thể là vấn đề của iOS. Nó có thể là một lỗi của iOS đang tiêu tốn pin ngày càng nhiều.

Bây giờ chúng ta sẽ tìm hiểu về iOS testing MindMap

![](https://images.viblo.asia/006802e0-12e6-4f05-9461-a7f3d4c50ac3.png)

MindMap iOS hiển thị tất cả các mục mà người kiểm thử nên xem xét khi tiến hành thử thử trên iOS.

- Về giao diện: cần xem xét hoạt động của animation, các hiệu ứng, sự thân thiện, dễ dùng của ứng dụng, kiểm tra hoạt động khi xoay màn hình thiết bị.
- Về Hardware: cần xem xét ứng dụng trên nhiều loại thiết bị iOS khác nhau như iPhone, iPad, iPod (tùy vào yêu cầu của ứng dụng)
- Về chức năng: cần xem xét các chức năng quan trọng của thiết bị mà ứng dụng có liên quan đến như Email, Service, Web, Phone Call...
- Về phần mềm: cần xem xét các lỗi quan trọng hay xảy ra như lỗi treo ứng dụng, lỗi rò rỉ bộ nhớ, lỗi về bảo mật...

**iOS Application Testing Checklist**

Checklist này được thiết kế để kiểm tra các đặc điểm của ứng dụng di động iOS. Checklist này chỉ hỗ trợ những đặc điểm chung của các ứng dụng trên iOS chứ không đi sâu vào từng chức năng.

1. Kiểm tra thời gian được cài đặt trên thiết bị. Hãy chắc chắn rằng ứng dụng được cài đặt trong một thời gian hợp lý.

2. Sau khi ứng dụng được cài đặt, hãy kiểm tra xem ứng dụng có biểu tượng và tên ứng dụng trên màn hình thiết bị hay không. 

3. Khởi chạy ứng dụng và kiểm tra xem màn hình splash có được hiển thị hay không.

4. Kiểm tra thời gian màn hình splash hiển thị và thời gian để tải màn hình chính. Màn hình chính của ứng dụng sẽ tải trong khoảng thời gian chấp nhận được. 

5. Kiểm tra xem ứng dụng có hỗ trợ cả định hướng ngang và dọc màn hình hay không. Nếu có, hãy kiểm tra ứng dụng theo cả hai hướng và đảm bảo giao diện người phải được thiết kế phù hợp.

6. Hãy mở ứng dụng khi không có kết nối internet. Hãy đảm bảo rằng ứng dụng  hoạt động như yêu cầu. Trong trường hợp này, có khả năng ứng dụng có thể treo hoặc có thể chỉ hiển thị một màn hình trống.

7. Nếu ứng dụng sử dụng chức năng định vị thì hãy kiểm tra xem cảnh báo cho phép vị trí có được hiển thị hay không. Thông báo này chỉ được nhắc cho người dùng một lần.

8. Nếu ứng dụng gửi push notifications, hãy kiểm tra xem thông báo có được hiển thị hay không.

9. Khởi chạy ứng dụng, thoát ứng dụng và khởi chạy lại. Kiểm tra xem ứng dụng có hoạt động như yêu cầu không.

10. Đóng ứng dụng bằng cách nhấn vào nút Home của thiết bị và mở lại ứng dụng. Kiểm tra xem ứng dụng có hoạt động như yêu cầu không.

11. Sau khi cài đặt, hãy kiểm tra xem ứng dụng có được liệt kê trong ứng dụng cài đặt của iPhone hay không.
 
12. Sau khi ứng dụng được phát hành, hãy kiểm tra xem ứng dụng có thể được tìm thấy trong Cửa hàng ứng dụng hay không. Sẽ có phiên bản hệ điều hành được hỗ trợ cho ứng dụng. Vì vậy, hãy đảm bảo có thể tìm thấy ứng dụng trong App Store của thiết bị có phiên bản hệ điều hành được hỗ trợ đó. Ngoài ra, ứng dụng không được tìm thấy trong App Store của thiết bị có hệ điều hành không được hỗ trợ.

13. Kiểm tra xem ứng dụng có chuyển sang chế độ ngủ khi chạy ở chế độ nền để tránh hao pin không.

14. Nếu hiệu suất của ứng dụng chậm hoặc khi có một nội dung đang được tải, hãy kiểm tra xem có biểu tượng trạng thái tiến trình không ( biểu tượng "Đang tải") hoặc phải có một thông báo cụ thể.


**Lưu ý khi kiểm thử ứng dụng iOS**

Để thử nghiệm ứng dụng iOS theo đúng hướng, có thể triển khai các lưu ý sau:

1. Không kiểm thử trên trình giả lập

Trình giả lập không phải môi trường  lý tưởng để kiểm thử. Những vấn đề như tương tác người dùng, tiêu thụ pin, tính khả dụng của mạng, hiệu suất sử dụng, cấp phát bộ nhớ không thể được kiểm tra trên trình giả lập. Vì vậy, hãy  kiểm thử trên các thiết bị thực.

2. Tự động hóa hay vì thủ công

Làm thế nào để thực hiện công việc một cách nhanh chóng? Hãy nghĩ đến tự động hóa. Tự động hóa không chỉ làm giảm thời gian thực hiện mà còn tăng hiệu lực, hiệu quả và phạm vi kiểm thử phần mềm.

3. Chia sẻ công việc

Chia sẻ những khó khăn gặp phải trong quá trình kiểm thử với các đội khác và cả đội phát triển để nhận được sự giúp đỡ về mặt thực hiện thủ công các trường hợp thử nghiệm cũng như nhận được sự giúp đỡ từ đội phát triển về mặt tự động hóa các trường hợp thử nghiệm thủ công.

4. Xác định Crash Logs

Ứng dụng cho iOS có thể bị đóng băng hoặc bị sập trong một số trường hợp nhất định. Để khắc phục sự cố, hãy sử dụng công cụ để có thể đọc crash logs, xác định đúng vị trí đã gây ra lỗi.

5. Chụp màn hình

Lưu lại màn hình xảy ra lỗi sẽ giúp việc hiểu vấn đề trở nên dễ dàng và do đó dễ khắc phục hơn.

Nên ghi lại màn hình hoặc chụp ảnh màn hình về các vấn đề để làm cho nhóm phát triển hiểu chúng hơn. Ảnh chụp màn hình có thể được chụp bằng tính năng sẵn có bằng cách nhấn nút nguồn và Home cùng nhau.

Trên đây chỉ là nhưng điều cần chú ý khi thực hiện kiểm thử iOS,  quan trọng là việc lựa chọn phương pháp phù hợp, quy trình thử nghiệm, công cụ, thiết bị phù hợp nhất sẽ giúp thử nghiệm ứng dụng iOS thành công.