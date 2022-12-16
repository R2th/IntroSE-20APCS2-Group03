Trong thế giới phát triển phần mềm liên tục, các nhà phát triển ứng dụng di động được thử thách vẫn nhanh nhẹn trong khi luôn tìm và xóa các lỗi nghiêm trọng của người dùng. Vô số thiết bị mới, cập nhật hệ điều hành và các thách thức bản địa hóa khiến công việc của họ trở nên khó khăn hơn nhiều. Tạo các trường hợp kiểm tra ứng dụng di động thông minh và hiệu quả giúp QA và các nhóm phát hiện ra các vấn đề ảnh hưởng đến trải nghiệm người dùng.

# 9 trường hợp thử nghiệm ứng dụng di động

## 1. Các trường hợp kiểm tra chức năng (Functionality Testing)

Có rất nhiều bàn tay tham gia vào việc tạo ra một ứng dụng di động. Các bên liên quan có thể có những kỳ vọng khác nhau. Các thử nghiệm chức năng xác định xem một ứng dụng di động có tuân thủ các yêu cầu và cách sử dụng khác nhau này không. Nó kiểm tra và xác nhận tất cả các chức năng, tính năng và năng lực của một sản phẩm.

12 câu hỏi tình huống kiểm tra chức năng:

* Ứng dụng có hoạt động như thiết kế bất cứ khi nào nó khởi động và dừng không?
* Ứng dụng có hoạt động tương ứng trên các phiên bản di động và hệ điều hành khác nhau không?
* Ứng dụng có ứng xử phù hợp khi gặp phải sự gián đoạn bên ngoài không? (ví dụ: nhận SMS, thu nhỏ trong khi gọi điện thoại, v.v.)
* Người dùng có thể tải xuống và cài đặt ứng dụng mà không gặp sự cố không?
* Thiết bị có thể đa nhiệm như mong đợi khi ứng dụng đang sử dụng hoặc đang chạy ẩn không?
* Các ứng dụng khác có thể thực hiện thỏa đáng sau khi ứng dụng được cài đặt không?
* Các tùy chọn mạng xã hội như chia sẻ, đăng bài, vv có hoạt động theo yêu cầu không?
* Các lĩnh vực bắt buộc làm việc theo yêu cầu?
* Ứng dụng có hỗ trợ giao dịch cổng thanh toán không?
* Các kịch bản cuộn trang có hoạt động như mong đợi không?
* Bạn có thể điều hướng giữa các mô-đun khác nhau như mong đợi?
* Là thông báo lỗi thích hợp nhận được khi cần thiết?

Có hai cách để chạy thử nghiệm chức năng: kịch bản và thăm dò.

**Kịch bản**
Thực hiện kiểm tra theo kịch bản chỉ là như vậy - một hoạt động có cấu trúc, có kịch bản trong đó người kiểm tra tuân theo các bước được xác định trước. Điều này cho phép người kiểm tra QA so sánh kết quả thực tế với kết quả dự kiến.

Các loại thử nghiệm này thường có tính chất xác nhận, nghĩa là bạn đang xác nhận rằng ứng dụng có thể thực hiện chức năng dự định. Người kiểm thử thường tìm thấy nhiều vấn đề hơn khi họ linh hoạt hơn trong thiết kế thử nghiệm.

**Thăm dò**
Thử nghiệm thăm dò điều tra và phát hiện ra lỗi và lỗi khi đang bay. Nó cho phép người kiểm tra phát hiện ra các vấn đề phần mềm theo cách thủ công thường không được dự đoán trước; trong đó nhóm QA kiểm tra theo cách mà hầu hết người dùng thực sự có thể sử dụng ứng dụng.

Được tạo ra bởi Cem Kaner, thử nghiệm khám phá, nhấn mạnh sự tự do và trách nhiệm cá nhân của người thử nghiệm để liên tục tối ưu hóa chất lượng công việc của họ bằng cách coi việc học liên quan đến kiểm tra, thiết kế thử nghiệm, thực hiện kiểm tra và diễn giải thử nghiệm là các hoạt động hỗ trợ lẫn nhau chạy trong song song trong suốt dự án.

## 2. Các trường hợp kiểm tra hiệu năng (Performance testing)

Mục tiêu cơ bản của kiểm tra hiệu năng là đảm bảo hiệu suất và tính ổn định của ứng dụng di động của bạn.

8 câu hỏi tình huống kiểm tra hiệu suất: 

* Ứng dụng có thể xử lý khối lượng tải dự kiến?
* Các nút thắt ứng dụng và cơ sở hạ tầng khác nhau ngăn ứng dụng hoạt động như mong đợi là gì?
* Là thời gian đáp ứng như mong đợi?
* Tiêu thụ pin, rò rỉ bộ nhớ, GPS và hiệu suất máy ảnh trong các hướng dẫn cần thiết?
* Phạm vi phủ sóng mạng hiện tại có thể hỗ trợ ứng dụng ở mức người dùng cao nhất, trung bình và tối thiểu không?
* Có bất kỳ vấn đề về hiệu suất nếu mạng thay đổi thành WIFI và 2G / 3G / 4G không?
* Làm thế nào để ứng dụng thực hiện trong các giai đoạn kết nối không liên tục?
* Các cấu hình máy khách-máy chủ hiện tại có cung cấp mức hiệu suất tối ưu không?

## 3. Các trường hợp kiểm tra sử dụng pin (Battery usage)

Mặc dù việc sử dụng pin là một thành phần lớn trong thử nghiệm hiệu suất, các nhà phát triển ứng dụng di động phải đặt ưu tiên hàng đầu. Các ứng dụng đang trở nên khắt khe hơn về khả năng xử lý, vì vậy khi thiết kế chiến lược thử nghiệm ứng dụng di động của bạn hiểu rằng các ứng dụng di động nặng pin sẽ giết chết trải nghiệm người dùng.

Phần cứng thiết bị - bao gồm tuổi thọ pin - thay đổi tùy theo model và nhà sản xuất. Do đó, các nhóm thử nghiệm QA phải có sẵn nhiều thiết bị mới và cũ trong phòng thí nghiệm thiết bị di động của họ. Ngoài ra, từ góc độ thử nghiệm hao pin, môi trường thử nghiệm cần sao chép việc sử dụng trong thế giới thực bao gồm HĐH, điều kiện mạng (3G, 4G, Wifi, Chuyển vùng) và đa nhiệm.

**7 tình huống thử nghiệm sử dụng pin cần đặc biệt chú ý:**

* Tiêu thụ năng lượng của ứng dụng di động
* Thiết kế giao diện người dùng sử dụng đồ họa mạnh hoặc dẫn đến các truy vấn cơ sở dữ liệu cao không cần thiết
* Tuổi thọ pin có thể hỗ trợ ứng dụng thực hiện theo khối lượng tải dự kiến
* Pin yếu và nhu cầu hiệu năng cao
* Ứng dụng hoạt động như thế nào nếu sử dụng khi tháo pin
* Rò rỉ pin và sử dụng dữ liệu
* Các tính năng và cập nhật mới không giới thiệu việc sử dụng pin và dữ liệu mới

## 4. Các trường hợp kiểm tra khả năng sử dụng (Usability Testing)

Việc kiểm tra khả năng sử dụng của các ứng dụng di động cung cấp cho người dùng cuối một giao diện dễ sử dụng và trực quan.

Kiểm tra khả năng sử dụng thường được thực hiện thủ công như hiện tại, chỉ có con người mới có thể hiểu được sự nhạy cảm và thoải mái của những người dùng khác.

**9 kịch bản trường hợp kiểm tra khả năng sử dụng đảm bảo:**

* Các nút có kích thước thân thiện với người dùng.
* Các nút vị trí, kiểu, vv là nhất quán trong ứng dụng.
* Các biểu tượng phù hợp trong ứng dụng.
* Phóng to và ra các cơ sở làm việc như mong đợi.
* Bàn phím có thể được thu nhỏ và tối đa hóa một cách dễ dàng.
* Quay trở lại, hoàn tác một hành động hoặc chạm vào mục sai có thể dễ dàng được hoàn tác.
* Menu ngữ cảnh không bị quá tải.
* Verbiage là đơn giản, rõ ràng và dễ dàng nhìn thấy.
* Người dùng cuối có thể dễ dàng tìm thấy menu trợ giúp hoặc hướng dẫn sử dụng mà họ cần.

## 5. Các trường hợp kiểm tra thử nghiệm tương thích (Compatibility testing)

Kiểm tra khả năng tương thích được thực hiện để bảo vệ chống lại các lỗi ứng dụng di động vì các thiết bị có hệ điều hành, kích thước, độ phân giải khác nhau, v.v.

**6 câu hỏi tình huống kiểm tra khả năng tương thích:**

* Bạn đã thử nghiệm trên các thiết bị thử nghiệm và hệ điều hành ứng dụng di động hàng đầu chưa?
* Làm thế nào để ứng dụng hoạt động với các thông số khác nhau, chẳng hạn như băng thông, tốc độ hoạt động, công suất, v.v?
* Ứng dụng có hoạt động đúng với nhiều trình duyệt di động khác nhau như Chrome, Safari, Firefox, Microsoft Edge, v.v. không?
* Giao diện người dùng (UI) của ứng dụng có còn nhất quán, hiển thị và có thể truy cập trên các kích thước màn hình khác nhau không?
* Là văn bản có thể đọc được cho tất cả người dùng?
* Ứng dụng có hoạt động trơn tru trên các cấu hình khác nhau không?

## 6. Các trường hợp kiểm tra bảo mật (Security testing)

Kiểm tra bảo mật đảm bảo rằng các yêu cầu bảo mật dữ liệu và mạng của ứng dụng được đáp ứng theo hướng dẫn.

**24 kịch bản thử nghiệm bảo mật cho các ứng dụng di động:**

* Ứng dụng di động có thể chịu được bất kỳ cuộc tấn công vũ phu nào để đoán tên người dùng, mật khẩu hoặc số thẻ tín dụng của một người không?
* Ứng dụng có cho phép kẻ tấn công truy cập nội dung hoặc chức năng nhạy cảm mà không cần xác thực đúng không? Điều này bao gồm đảm bảo các liên lạc với phụ trợ được bảo mật đúng cách.
* Có một hệ thống bảo vệ mật khẩu mạnh trong ứng dụng di động?
* Xác nhận phụ thuộc động.
* Các biện pháp được thực hiện để ngăn chặn những kẻ tấn công truy cập vào các lỗ hổng này.
* Những bước nào đã được thực hiện để ngăn chặn các cuộc tấn công liên quan đến tiêm SQL?
* Xác định và phục hồi bất kỳ kịch bản mã không được quản lý.
* Đảm bảo liệu chứng chỉ có được xác thực hay không và ứng dụng có thực hiện Ghim chứng chỉ hay không.
* Bảo vệ ứng dụng và mạng khỏi các cuộc tấn công từ chối dịch vụ.
* Phân tích lưu trữ dữ liệu và yêu cầu xác nhận.
* Tạo quản lý phiên để ngăn người dùng trái phép truy cập thông tin không mong muốn.
* Kiểm tra xem mã mật mã có bị hỏng hay không và sửa chữa những gì đã tìm thấy.
* Các triển khai logic kinh doanh có được bảo mật và không dễ bị tấn công từ bên ngoài không?
* Phân tích các tương tác hệ thống tệp, xác định bất kỳ lỗ hổng nào và khắc phục các sự cố này.
* Những giao thức nào được đặt ra nên tin tặc cố gắng cấu hình lại trang đích mặc định?
* Bảo vệ chống lại tiêm độc hại phía khách hàng.
* Bảo vệ chống lại tiêm thời gian độc hại.
* Điều tra và ngăn chặn bất kỳ khả năng độc hại từ bộ nhớ đệm tập tin.
* Bảo vệ chống lưu trữ dữ liệu không an toàn trong bộ đệm bàn phím ứng dụng.
* Điều tra và ngăn chặn bất kỳ hành động độc hại từ cookie.
* Để cung cấp kiểm toán thường xuyên để phân tích bảo vệ dữ liệu.
* Điều tra và ngăn chặn mọi hành động độc hại từ các tệp được tạo tùy chỉnh.
* Ngăn chặn các vụ án tham nhũng bộ nhớ.
* Phân tích và ngăn chặn bất kỳ lỗ hổng từ các luồng dữ liệu khác nhau.

## 7. Các trường hợp thử nghiệm nội địa hóa (Localization testing)

Thử nghiệm bản địa hóa đảm bảo ứng dụng di động hoạt động theo văn hóa và quy định địa phương. Điều này ảnh hưởng đến nội dung và giao diện người dùng để tùy chỉnh phần mềm theo ngôn ngữ và quốc gia được nhắm mục tiêu.

Bởi vì các ứng dụng và trang web được bản địa hóa hoàn toàn vượt trội so với các đối thủ cạnh tranh, đây là một trường hợp thử nghiệm không nên bỏ qua. Hợp tác với một bên thứ ba được kính trọng với phạm vi toàn cầu giúp giảm bớt một số căng thẳng và các biến số chưa biết khi làm việc với nội địa hóa. Ví dụ, Testlio bao gồm hơn 100 quốc gia và hơn 140 ngôn ngữ.

**10 kịch bản thử nghiệm bản địa hóa cho các ứng dụng di động:**

* Nội dung địa phương cần được kiểm tra tính chính xác. Điều này cũng nên bao gồm tất cả các thông báo xác nhận hoặc lỗi có thể phát sinh.
* Ngôn ngữ nên được định dạng đúng. (ví dụ: định dạng tiếng Ả Rập từ phải sang trái, phong cách viết tiếng Nhật của LastName, FirstName, v.v.)
* Thuật ngữ là nhất quán trên UI.
* Thời gian và ngày được định dạng chính xác.
* Tiền tệ là tương đương địa phương.
* Màu sắc phù hợp và truyền tải đúng thông điệp.
* Đảm bảo giấy phép và các quy tắc tuân thủ luật pháp và quy định khu vực mục tiêu.
* Bố cục nội dung văn bản không có lỗi.
* Các siêu liên kết và chức năng phím nóng hoạt động như mong đợi.
* Các trường nhập hỗ trợ các ký tự đặc biệt và được xác thực khi cần thiết (ví dụ: mã bưu chính)
* Đảm bảo giao diện người dùng được bản địa hóa có cùng loại phần tử và số với sản phẩm nguồn.

## 8. Các trường hợp kiểm tra khả năng phục hồi (Recoverability testing)

Kiểm tra khôi phục là một kỹ thuật kiểm tra phi chức năng xác định ứng dụng di động có thể phục hồi nhanh như thế nào sau khi gặp sự cố hệ thống hoặc lỗi phần cứng.

**5 câu hỏi kiểm tra khả năng phục hồi:**

* Ứng dụng có tiếp tục ở hoạt động cuối cùng trong trường hợp khởi động lại cứng hoặc sự cố hệ thống không?
* Điều gì - nếu có - đang gây ra sự phục hồi sự cố và gián đoạn giao dịch?
* Phục hồi ứng dụng hiệu quả như thế nào sau khi bị gián đoạn hoặc sự cố không mong muốn?
* Làm thế nào để ứng dụng xử lý một giao dịch trong khi mất điện?
* Quá trình dự kiến khi ứng dụng cần khôi phục dữ liệu bị ảnh hưởng trực tiếp bởi kết nối không thành công là gì?

## 9. Các trường hợp kiểm tra hồi quy (Regression testing)

QA và thử nghiệm ứng dụng trên thiết bị di động kết thúc khi một ứng dụng được phát hành. Khi một ứng dụng được cập nhật - ngay cả những thay đổi nhỏ cũng có thể tạo ra sự cố không mong muốn. Đây là lý do tại sao kiểm tra hồi quy là chìa khóa.

**4 kịch bản thử nghiệm hồi quy cho các ứng dụng di động:**

* Kiểm tra mọi thay đổi đối với chức năng hiện có
* Kiểm tra các thay đổi mới được thực hiện
* Kiểm tra các tính năng mới được thêm vào
* Kiểm tra các tác dụng phụ có thể xảy ra sau khi thay đổi được đưa ra

Tài liệu tham khảo:
https://testlio.com/blog/9-mobile-app-test-cases/