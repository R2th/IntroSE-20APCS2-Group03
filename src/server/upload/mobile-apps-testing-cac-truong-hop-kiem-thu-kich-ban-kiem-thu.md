Đã có rất nhiều bạn trải qua kiểm thử web app rất nhiều nhưng chưa bao giờ bạn kiểm thử mobile app. Và khi nói đến kiểm thử app trên mobile các bạn đã luôn hỏi là thế nào để kiểm thử chúng.  Còn chần chừ gì nữa chúng ta hãy cùng điểm danh các kịch bản và trường hợp kiểm thử dùng cho Mobile app nhé.
Trước tiên chúng ta hãy cùng nghĩ về thuật ngữ MOBILE APP

# Mobile app là gì?
Mobile App là các ứng dụng di động cho phép bạn sử dụng để truy cập vào các nội dung mà bạn mong muốn trên các thiết bị như điện thoại di động.

Vậy làm thế nào để kiểm thử app trên mobile. Các trường hợp kiểm thử sau đây được tổng hợp lại dựa trên các loại thử nghiệm di động. Bạn có thể thực hiện một số hoặc tất cả các Trường hợp kiểm thử dựa trên các yêu cầu kiểm thử di động của bạn

* Functional Testing Test Cases
* Performance Testing
* Security Testing Test Cases
* Usability Testing Test Cases
* Compatibility Testing Test Cases
* Recoverability Testing Test Cases
* Important Checklist

# Functional Testing Test Cases  (Kiểm thử chức năng)
Kiểm thử chức năng của điện thoại di động thường là các lĩnh vực kiểm thư tương tác của người dùng cũng như kiểm thử các giao dịch. Các điểm khác nhau trong kiểm thử chức năng là:

Loại ứng dụng thuộc chức năng kinh doanh (ngân hàng, chơi game, xã hội hoặc kinh doanh)
Loại đối tượng sử dụng (người tiêu dùng, doanh nghiệp, giáo dục)
Kênh phân phối được sử dụng để truyền bá ứng dụng (ví dụ: Apple App Store, Google play, phân phối trực tiếp)

![](https://images.viblo.asia/021832ac-60c9-4c76-b48d-f6cf6a5a49eb.PNG)

Các kịch bản kiểm thử cơ bản nhất trong kiểm thử chức năng như sau:

1. Xác nhận tất cả các trường bắt buộc có hoạt động như yêu cầu hay không.
2. Xác nhận các trường bắt buộc được hiển thị trên màn hình có đặc biệt hơn các trường không bắt buộc không.
3. Xác nhận ứng dụng có hoạt động theo yêu cầu khi khởi động hoặc tắt ứng dụng hay không.
4. Xác nhận ứng dụng có ở chế độ thu nhỏ khi có cuộc gọi điện thoại đến không. Để kiểm thử được trường hợp này thì chúng ta cần có điện thoại thứ hai để thực hiên cuộc gọi đến.
5. Xác nhận điện thoại có khả năng lưu trữ, xử lý và nhận SMS khi ứng dụng đang chạy hay không. Để kiểm thử được trường hợp này thì chúng ta cần có điện thoại thứ hai để gửi sms đến thiết bị đang được kiểm thử ứng dụng đang chạy.
6. Xác nhận thiết bị có thể thực hiện các yêu cầu đa nhiệm cần thiết.
7. Xác nhận ứng dụng cho phép các tùy chọn mạng xã hội cần thiết như chia sẻ, đăng và điều hướng, v.v.
8. Xác nhận ứng dụng hỗ trợ mọi giao dịch cổng thanh toán như Visa, Mastercard, Paypal, v.v. theo yêu cầu của ứng dụng.
9. Xác nhận các kịch bản cuộn trang đang được bật trong ứng dụng khi cần thiết.
10. Xác nhận điều hướng giữa các mô-đun có liên quan trong ứng dụng theo yêu cầu.
11. Xác nhận các lỗi cắt ngắn hoàn toàn đến một giới hạn phải chăng.
12. Xác nhận người dùng nhận được thông báo lỗi thích hợp ví dụ như lỗi mạng “Network error. Please try after some time”
13. Xác nhận ứng dụng đã cài đặt sẽ không làm ảnh hưởng đến hoạt động của các ứng dụng khác và nó không ảnh hưởng đến bộ nhớ của các ứng dụng khác.
14. Xác nhận ứng dụng sẽ tiếp tục ở hoạt động cuối cùng trong trường hợp khởi động lại cứng hoặc sự cố hệ thống.
15. Xác nhận việc cài đặt ứng dụng thành công không xảy ra lỗi.
16. Xác nhận ứng dụng thực hiện tự động khởi động theo các yêu cầu.
17.Xác nhận ứng dụng có hoạt động theo yêu cầu trong tất cả các phiên bản Di động là 2g, 3g và 4g hay không.
18. Để thực hiện Kiểm tra hồi quy để phát hiện ra các lỗi phần mềm mới trong các khu vực hiện có của hệ thống sau khi các thay đổi đã được thực hiện đối với chúng. Đồng thời chạy lại các thử nghiệm đã thực hiện trước đó để xác định rằng hành vi của chương trình không thay đổi do những thay đổi.
19. Xác nhận ứng dụng có cung cấp hướng dẫn sử dụng cho những người  dùng không

#  Performance Testing (Kiểm tra năng suất)

Mục tiêu cơ bản của kiểm thử này là để đảm bảo ứng dụng hoạt động có thể chấp nhận được theo các yêu cầu hiệu suất nhất định như truy cập bởi một số lượng lớn người dùng hoặc loại bỏ một phần cơ sở hạ tầng quan trọng như máy chủ cơ sở dữ liệu.

Các kịch bản thử nghiệm chung cho Kiểm tra hiệu suất trong ứng dụng Di động là:

1. Xác định xem ứng dụng có thực hiện theo yêu cầu trong các điều kiện tải khác nhau hay không.
2. Xác định xem phạm vi phủ sóng hiện tại có thể hỗ trợ ứng dụng ở mức người dùng cao nhất, trung bình và tối thiểu hay không.
3. Xác định xem thiết lập cấu hình máy khách-máy chủ hiện tại có cung cấp mức hiệu suất tối ưu cần thiết hay không.
4. Xác định các tắc nghẽn ứng dụng và cơ sở hạ tầng khác nhau ngăn ứng dụng thực hiện ở mức chấp nhận được yêu cầu.
5. Xác nhận thời gian đáp ứng của ứng dụng có theo yêu cầu hay không.
6. Đánh giá sản phẩm và / hoặc phần cứng để xác định xem nó có thể xử lý khối lượng tải dự kiến hay không.
7. Đánh giá xem thời lượng pin có thể hỗ trợ ứng dụng thực hiện theo khối lượng tải dự kiến hay không.
8. Xác nhận hiệu suất ứng dụng khi mạng được đổi thành WIFI từ 2G / 3G hoặc ngược lại.
9. Xác nhận từng yêu cầu, chu trình CPU là tối ưu hóa
10. Xác nhận mức tiêu thụ pin, rò rỉ bộ nhớ, tài nguyên như GPS, Hiệu suất máy ảnh nằm trong các hướng dẫn bắt buộc.
11. Xác nhận tuổi thọ của ứng dụng bất cứ khi nào người dùng tải về thiết bị.
12. Xác nhạn hiệu suất mạng trong khi di chuyển xung quanh với thiết bị.
13. Xác nhận hiệu suất ứng dụng khi chỉ yêu cầu các giai đoạn kết nối không liên tục.


# Security Testing Test Cases
![](https://images.viblo.asia/35d74eb2-8363-4f6f-b393-56dbcbdf89fb.PNG)

Mục tiêu cơ bản của kiểm tra bảo mật là đảm bảo rằng các yêu cầu bảo mật dữ liệu và mạng của ứng dụng được đáp ứng theo hướng dẫn.

Sau đây là các lĩnh vực quan trọng nhất để kiểm tra tính bảo mật của các ứng dụng Di động.

1. Xác nhận ứng dụng có thể chịu được bất kỳ cuộc tấn công nào ví dụ như là quá trình thử nghiệm tự động và lỗi được sử dụng để đoán tên người dùng, mật khẩu hoặc số thẻ tín dụng.
2. Xác nhận một ứng dụng không cho phép kẻ tấn công truy cập nội dung hoặc chức năng nhạy cảm mà không cần xác thực hợp lệ.
3. Xác nhận rằng ứng dụng có hệ thống bảo vệ mật khẩu mạnh và nó không cho phép kẻ tấn công lấy, thay đổi hoặc khôi phục mật khẩu người dùng khác.
4. Xác nhận rằng ứng dụng không bị hết hạn session .
5. Xác nhận các phụ thuộc động và thực hiện các biện pháp để ngăn chặn bất kỳ kẻ tấn công nào truy cập vào các lỗ hổng này.
6. Ngăn chặn các cuộc tấn công liên quan đến SQL .
7. Xác định và phục hồi từ bất kỳ kịch bản mã không được quản lý.
8. Đảm bảo các chứng chỉ có được xác thực hay không, ứng dụng có thực hiện Ghim chứng chỉ hay không.
9. Để bảo vệ ứng dụng và mạng khỏi các cuộc tấn công từ chối dịch vụ.
10. Để phân tích các yêu cầu lưu trữ dữ liệu và xác nhận dữ liệu.
11. Để cho phép quản lý phiên để ngăn người dùng trái phép truy cập thông tin không mong muốn.
12. Để kiểm tra xem có bất kỳ mã mật mã nào bị hỏng hay không và đảm bảo rằng nó đã được sửa chữa.
13. Để xác thực xem việc triển khai logic nghiệp vụ có được bảo mật và không dễ bị tấn công từ bên ngoài hay không.
14. Để phân tích các tương tác hệ thống tệp, xác định bất kỳ lỗ hổng nào và khắc phục các sự cố này.
15. Để xác thực các trình xử lý giao thức, ví dụ như cố gắng cấu hình lại trang đích mặc định cho ứng dụng bằng iframe độc ​​hại.
16. Để bảo vệ chống lại tiêm độc hại phía khách hàng.
17. Để bảo vệ chống lại tiêm thời gian độc hại.
18. Để điều tra bộ nhớ đệm tập tin và ngăn chặn bất kỳ khả năng độc hại nào từ cùng.
19. Để tránh lưu trữ dữ liệu không an toàn trong bộ đệm bàn phím của ứng dụng.
20. Để điều tra cookie và ngăn chặn mọi hành vi độc hại từ cookie.
21. Để cung cấp kiểm toán thường xuyên để phân tích bảo vệ dữ liệu.
22. Điều tra các tệp được tạo tùy chỉnh và ngăn chặn mọi hành động độc hại từ các tệp được tạo tùy chỉnh.
23. Để ngăn chặn tràn bộ đệm và các trường hợp tham nhũng bộ nhớ.
24. Để phân tích các luồng dữ liệu khác nhau và ngăn chặn bất kỳ lỗ hổng nào từ chúng.

# Usability Testing Test Cases
![](https://images.viblo.asia/0ae01f8e-479f-4f8d-9b0d-c6b2001c7b39.PNG)

Quá trình kiểm tra khả năng sử dụng của ứng dụng Di động được thực hiện để có một ứng dụng nhanh và dễ dàng với ít chức năng hơn một ứng dụng chậm và khó với nhiều tính năng. Mục tiêu chính là để đảm bảo rằng sản phẩm cuối cùng có một giao diện dễ sử dụng, trực quan và tương tự như các giao diện được chấp nhận trong ngành được sử dụng rộng rãi.

1. Để đảm bảo rằng các nút phải có kích thước yêu cầu và phù hợp với ngón tay lớn.
2. Để đảm bảo rằng các nút được đặt trong cùng một phần của màn hình để tránh gây nhầm lẫn cho người dùng cuối.
3. Để đảm bảo rằng các biểu tượng là tự nhiên và phù hợp với ứng dụng.
4. Để đảm bảo rằng các nút có cùng chức năng cũng phải có cùng màu.
5. Để đảm bảo rằng việc xác thực cho các tiện ích phóng to và thu nhỏ phải được bật.
6. Để đảm bảo rằng đầu vào bàn phím có thể được giảm thiểu theo cách thích hợp.
7. Để đảm bảo ứng dụng cung cấp phương thức quay lại hoặc hoàn tác một hành động, chạm vào mục sai, trong khoảng thời gian chấp nhận được.
8. Để đảm bảo rằng các menu theo ngữ cảnh không bị quá tải vì nó phải được sử dụng nhanh chóng.
9. Để đảm bảo rằng văn bản được giữ đơn giản và rõ ràng để người dùng có thể nhìn thấy.
10. Để đảm bảo rằng các câu và đoạn văn ngắn có thể đọc được cho người dùng cuối.
11. Để đảm bảo rằng kích thước phông chữ đủ lớn để có thể đọc được và không quá lớn hoặc quá nhỏ.
12. Để xác thực ứng dụng sẽ nhắc người dùng bất cứ khi nào người dùng bắt đầu tải xuống một lượng lớn dữ liệu có thể không có lợi cho hiệu suất của ứng dụng.
13. Để xác thực rằng việc đóng ứng dụng được thực hiện từ các trạng thái khác nhau và xác minh xem nó có mở lại ở cùng trạng thái không.
14. Để đảm bảo rằng tất cả các chuỗi được chuyển đổi thành ngôn ngữ phù hợp bất cứ khi nào có sẵn một cơ sở dịch ngôn ngữ.
15. Để đảm bảo rằng các mục ứng dụng luôn được đồng bộ hóa theo hành động của người dùng.
16. Để đảm bảo rằng người dùng cuối được cung cấp hướng dẫn sử dụng giúp người dùng cuối hiểu và vận hành ứng dụng có thể không quen thuộc với các thủ tục của ứng dụng.

Kiểm tra khả năng sử dụng thường được thực hiện bởi manual test vì chỉ có con người mới có thể hiểu được sự nhạy cảm và khả năng thoải mái của những người dùng khác.

# Compatibility Testing Test Cases

Kiểm tra khả năng tương thích trên thiết bị di động được thực hiện để đảm bảo rằng các thiết bị di động có kích thước, độ phân giải, màn hình, phiên bản và phần cứng khác nhau nên ứng dụng phải được kiểm tra trên tất cả các thiết bị để đảm bảo ứng dụng hoạt động như mong muốn.

Sau đây là những lĩnh vực nổi bật nhất để thử nghiệm khả năng tương thích.

1. Để xác thực rằng Giao diện người dùng của ứng dụng theo kích thước màn hình của thiết bị, không có văn bản / điều khiển nào là vô hình hoặc không thể truy cập được.
2. Để đảm bảo rằng văn bản có thể đọc được cho tất cả người dùng cho ứng dụng.
3. Để đảm bảo rằng chức năng gọi / báo thức được bật bất cứ khi nào ứng dụng đang chạy. Ứng dụng được thu nhỏ hoặc tạm dừng trong trường hợp có cuộc gọi và sau đó bất cứ khi nào cuộc gọi dừng lại, ứng dụng sẽ được tiếp tục.

# Recoverability Testing Test Cases

1. Phục hồi sự cố và gián đoạn giao dịch
2. Xác nhận tình huống phục hồi ứng dụng hiệu quả đăng các tình huống gián đoạn / sự cố bất ngờ.
3. Xác minh cách ứng dụng xử lý giao dịch trong khi mất điện (ví dụ: Pin chết hoặc tắt thiết bị đột ngột bằng tay)
4. Xác nhận quá trình trong đó kết nối bị treo, hệ thống cần thiết lập lại để khôi phục dữ liệu bị ảnh hưởng trực tiếp bởi kết nối bị treo.

# Important Checklist

1. Kiểm tra cài đặt (liệu ứng dụng có thể được cài đặt trong một khoảng thời gian hợp lý và với tiêu chí bắt buộc không)
2. Kiểm tra gỡ cài đặt (liệu ứng dụng có thể được gỡ cài đặt trong một khoảng thời gian hợp lý và với tiêu chí bắt buộc không)
3. Các trường hợp kiểm tra mạng (xác thực xem mạng có hoạt động theo tải yêu cầu hay không, liệu mạng có thể hỗ trợ tất cả các ứng dụng cần thiết trong quy trình kiểm tra hay không)
4. Kiểm tra các phím chưa được ánh xạ
5. Kiểm tra màn hình giật gân ứng dụng
6. Tiếp tục nhập bàn phím trong khi bị gián đoạn và các thời điểm khác như sự cố mạng
7. Các phương thức xử lý thoát ứng dụng
8. Hiệu ứng sạc trong khi một ứng dụng đang chạy ẩn
9. Pin yếu và nhu cầu hiệu năng cao
10. Tháo pin trong khi một ứng dụng đang được thực hiện
11. Tiêu thụ pin theo ứng dụng
12. Kiểm tra tác dụng phụ của ứng dụng


Nguồn: https://www.guru99.com/testing-mobile-apps.html