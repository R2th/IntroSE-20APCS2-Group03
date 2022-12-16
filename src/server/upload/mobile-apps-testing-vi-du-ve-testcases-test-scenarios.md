Một câu hỏi mà hầu hết những bạn chưa có kinh nghiệm test mobile sẽ đặt ra là: Test apps trên mobile như thế nào? Trong bài viết này, tôi sẽ đưa ra một vài ví dụ về Test scenario/ test cases cho việc testing trên mobile apps.

Bạn có thể thực hiện một số hoặc tất cả các Trường hợp kiểm tra dựa trên các yêu cầu thử nghiệm trên thiết bị di động của bạn. Các trường hợp thử nghiệm được tổ chức dựa trên các loại thử nghiệm trên thiết bị di động.
# Functional Testing Testcases
Functional testing trên Mobiles thường bao gồm việc kiểm thử những vùng liên quan đến tương tác của người dùng cũng như việc kiểm tra việc chuyển đổi giữa các màn hình. Các yếu tố khác có liên quan đến việc kiểm tra chức năng:
1. Loại ứng dụng được phân chia dựa trên tính chuyên môn: ngân hàng, game, xã hội, kinh doanh
2. Loại đối tượng mà ứng dụng hướng đến: người tiêu dùng, doanh nghiệp, giáo dục
3. Kênh phân phối sẽ sử dụng để truyền bá ứng dụng: apple app store, google play, phân phối trực tiếp

## Test scenario cơ bản thường sử dụng :
1. Xác nhận xem tất cả các trường bắt buộc có hoạt động theo đúng yêu cầu hay không
2. Xác nhận việc hiển thị giữa các trường bắt buộc và không bắt buộc có gì khác biệt
3. Xác nhận việc ứng dụng hoạt động tốt trong mọi tình huống khi người dùng khởi động/ dừng lại
4. Xác nhận xem ứng dụng có chuyển sang chế độ thu nhỏ hay không khi đang sử dụng mà có cuộc gọi đến
5. Xác nhận xem điên thoại có thể lưu trữ, xử lý và nhận SMS khi ứng dụng đang chạy hay không ( sử dụng điện thoại thứ 2 để gửi sms đến thiệt bị đang test )
6. Xác nhận xem thiết bị có thể thực hiện được các yêu cầu đa nhiệm mọi khi cần thiết hay không
 7. Xác nhận xem ứng dụng có cho phép các tùy chọn mạng xã hội cần thiết như chia sẻ, đăng bài hay điều hướng không,…
8. Xác nhận xem ứng dụng có hỗ trợ mọi loại cổng thanh toán điện tử: visa, mastercard, paypal, vvv theo yêu cầu không
9. Xác nhận các tình huống cuộc trang đang được kích hoạt trong ứng dụng khi cần thiết
10. Xác nhận rằng việc điều hướng giữa các modul có liên quan đến ứng dụng được thực hiện theo đúng yêu cầu
11. Xác nhận rằng người dùng có nhận được thông báo lỗi thích hợp VD: “ Lỗi mạng. Hãy thử lại sau một thời gian ngắn. “ khi có lỗi mạng xảy ra
12. Xác nhận rằng ứng dụng đã cài đặt không bị xung đột với các ứng dụng khác, không chiếm bộ nhớ của ứng dụng khác
13 .Xác nhận xem ứng dụng có tiếp tục hoạt động không nếu khởi động lại mobile hoặc hệ thống bị hỏng
14. Xác nhận xe việc cài đặt ứng dụng có thể được thực hiện một cách trơn tru không miễn là người dùng có đủ tài nguyên cần thiết và không có bất kì lỗi nào đáng kể xảy ra
15. Xác nhận xem ứng dụng có thực hiện tự khởi động theo yêu cầu không
16. Xác nhận xem ứng dụng có chạy tốt trong tất cả các phiên bản của thiết bị di động: 2G, 3G, 4G hay khong
17. Thực hiện Regression Test để phát hiện các lỗi phần mềm mới trong các khu vực sau khi đã được thay đổi. Chạy lại các case đã thực hiện trước đó để xác định rằng các chức năng không bị ảnh hưởng sau khi có thay đổi
18. Xác nhận xem ứng dụng có cung cấp hướng dẫn sử dụng có sẵn cho những người dùng không quen thuộc với ứng dụng hay không

# Kiểm tra hiệu suất
Mục tiêu của việc kiểm tra hiệu suất là đảm bảo rằng ứng dụng có thể chấp nhận được các yêu cầu về hiệu suất: quyền truy cập của một số lượng lớn người dùng hoặc loại bỏ phần hạ tầng quan trọng như máy chủ cơ sở dữ liệu thì ứng dụng có bị ảnh hưởng gì không?

## Một số kịch bản chung cho việc kiểm tra hiệu suất trên thiết bị di động: 

1. Xác định xem trong các điều kiện tải khác nhau thì ứng dụng có thực hiện đúng như yêu cầu hay không
2. Xác định việc hoạt động của ứng dụng trong điều kiện khác nhau về mức độ phủ sóng của mạng: mức cao nhất, mức trung bình, mức tối thiểu
3. Xác định xem cấu hình được thiết lập của máy chủ - khách có cung cấp mức hiệu suất tối ưu được yêu cầu hay không
4. Xác định các trường hợp tắc nghẽn, các môi trường cơ sở hạ tầng khác nhau có ảnh hưởng đến ứng dụng không
5. Xác nhận thời gian phản hồi có đúng yêu cầu hay không
6. Đánh giá ứng dụng, phần cứng xem có thể xử lý khối lượng tải dự kiến hay không
7. Đánh giá tuổi thọ pin có thể hỗ trợ ứng dụng thực hiện theo khối lượng tải dự kiến hay không
8. Xác thực hiệu suất ứng dụng khi mạng được thay đổi từ wifi --> 2G/ 3G và ngược lại
9. Xác nhận sự hợp lệ của mỗi chu kỳ CPU được yêu cầu là tối ưu
10. Xác nhận mức tiêu thụ pin, bộ nhớ và các tài nguyên khác như GPS khi chạy ứng dụng
11. Xác nhận tuổi thọ của ứng dụng bất cứ khi nào người dùng tải nặng
12. Xác thực hiệu suất của mạng khi di chuyển xung quanh thiết bị
13. Xác thực hiệu suất của ứng dụng khi ngắt kết nối/ kết nối lại liên tục

# Kiểm tra bảo mật
Mục tiêu cơ bản của kiểm tra bảo mật là đảm bảo rằng các yêu cầu về bảo mật mạng và dữ liệu của ứng dụng cần được đáp ứng theo các nguyên tắc đề ra.

## Sau đây là các lĩnh vực quan trọng nhất cần để kiểm tra tính bảo mật của các ứng dụng di động:
1. Xác thực xem ứng dụng có thể chịu được bất kỳ tấn công bạo lực nào hay không, đó là trình thử nghiệm và lỗi tự động được sử dụng để đoán tên người dùng, mật khẩu hoặc số thẻ tín dụng của một người
2. Xác nhận xem một ứng dụng có cho phép kẻ tấn công truy cập vào nội dung hoặc chức năng nhạy cảm mà không có xác thực hợp lệ hay không
3. Xác nhận rằng ứng dụng có hệ thống bảo vệ mật khẩu mạnh và không cho phép kẻ tấn công lấy và thay đổi hoặc khôi phục mật khẩu của người dùng khác
4. Xác nhận rằng ứng dụng không bị hết hạn phiên bảo mật
5. Xác nhận rằng ứng dụng tự động thực hiện các biện pháp để ngăn chặn bất kỳ kẻ tấn công nào truy cập các lỗ hổng này
6. Ngăn chặn các cuộc tấn công liên quan đến SQL
7. Xác định và phục hồi từ bất kỳ kịch bản mã nào không được quản lý
8. Đảm bảo các chứng chỉ có được xác nhận hay không, ứng dụng có triển khai chứng chỉ ghim hay không
9. Bảo vệ ứng dụng và mạng khỏi các cuộc tấn công 
10. Phân tích lưu trữ dữ liệu và yêu cầu xác thực dữ liệu
11. Cho phép các phiên quản lý để ngăn chặn người dùng trái phép truy cập thông tin không được yêu cầu
12. Kiểm tra xem mật mã có bị hỏng hay không và đảm bảo khi hỏng sẽ được sửa chữa
13. Để xác thực xem việc thực hiện logic nghiệp vụ có được bảo mật hay không và không dễ bị tấn công từ bên ngoài.
14. Để phân tích các tương tác hệ thống tệp, xác định bất kỳ lỗ hổng nào và sửa các vấn đề này.
15. Để xác thực các trình xử lý giao thức, ví dụ như cố gắng cấu hình lại trang đích mặc định cho ứng dụng bằng một iframe độc hại.
16. Để bảo vệ chống lại việc tiêm bên khách hàng độc hại.
17. Để bảo vệ chống lại việc tiêm thời gian độc hại.
18. Để điều tra bộ nhớ đệm của tệp và ngăn chặn mọi khả năng độc hại từ cùng một tệp.
19. Để ngăn không cho lưu trữ dữ liệu không an toàn trong bộ đệm ẩn của bàn phím của ứng dụng.
20. Để điều tra cookie và ngăn chặn bất kỳ hành động độc hại nào từ cookie.
21. Để cung cấp kiểm toán thường xuyên cho phân tích bảo vệ dữ liệu.
22. Điều tra các tệp được tạo tùy chỉnh và ngăn chặn bất kỳ hành động độc hại nào từ các tệp được tạo tùy chỉnh.
23. Để ngăn chặn tràn bộ đệm và các trường hợp tham nhũng bộ nhớ.
24. Để phân tích các luồng dữ liệu khác nhau và ngăn ngừa bất kỳ lỗ hổng nào từ các luồng này.

# Kiểm tra khả năng sử dụng:
Kiểm tra khả năng sử dụng cần được thực hiện để có một ứng dụng dễ dàng sử dụng và nhanh chóng truy cập, ít chức năng hơn so với ứng dụng chậm và khó khăn với nhiều tính năng. Mục tiêu chính để đảm bảo chúng ta có một giao diện dễ sử dụng, trực quan và tương tự như các ngành được chấp nhận trong ngành đưcọ sử dụng rộng rãi.

1. Đảm bảo các nút phải có kích thước phù hợp với các kích cỡ ngón tay: lớn / bé
2. Đảm bảo các nút được đặt trong cùng một phần của màn hình để tránh nhầm lẫn
3. Đảm bảo rằng các biểu tượng là tự nhiên và nhất quán với ứng dụng
4. Để đảm bảo rằng các nút có cùng chức năng cũng phải có cùng màu.
5. Để đảm bảo rằng việc xác thực cho các tiện ích phóng to thu nhỏ và thu nhỏ phải được bật.
6. Để đảm bảo rằng đầu vào bàn phím có thể được giảm thiểu một cách thích hợp.
7. Để đảm bảo rằng ứng dụng cung cấp một phương thức để quay lại hoặc hoàn tác một hành động, khi chạm vào mục sai, trong một khoảng thời gian chấp nhận được.
8. Để đảm bảo rằng các menu ngữ cảnh không bị quá tải vì nó phải được sử dụng nhanh chóng.
9. Để đảm bảo rằng văn bản được giữ đơn giản và rõ ràng để hiển thị cho người dùng.
10. Để đảm bảo rằng các câu ngắn và đoạn văn có thể đọc được cho người dùng cuối.
11. Để đảm bảo rằng kích thước phông chữ đủ lớn để có thể đọc được và không quá lớn hoặc quá nhỏ.
12. Để xác thực ứng dụng sẽ nhắc người dùng bất cứ khi nào người dùng bắt đầu tải xuống một lượng lớn dữ liệu có thể không có lợi cho hiệu suất ứng dụng.
13. Để xác thực rằng việc đóng ứng dụng được thực hiện từ các trạng thái khác nhau và xác minh xem nó có mở lại trong cùng một trạng thái hay không.
14. Để đảm bảo rằng tất cả các chuỗi được chuyển đổi thành các ngôn ngữ thích hợp bất cứ khi nào có sẵn một cơ sở dịch thuật ngôn ngữ.
15. Để đảm bảo rằng các mục ứng dụng luôn được đồng bộ hóa theo các hành động của người dùng.
16. Để đảm bảo rằng người dùng cuối được cung cấp hướng dẫn sử dụng giúp người dùng cuối hiểu và vận hành ứng dụng có thể không quen thuộc với ứng dụng

# Kiểm tra tính tương thích
Thử nghiệm tương thích trên thiết bị di động được thực hiện để đảm bảo thiết bị di động có kích thước, độ phân giải màn hình, phiên bản, và các phần cứng khác nhau mà ứng dụng vẫn hoạt động như mong muốn

1. Xác nhận giao diện người dùng của ứng dụng theo các kích thước khác nhau của màn hình, không có phần tử nào là bị mất đi hoặc không thể truy cập được
2. Đảm bảo rằng văn bản có thể đọc được cho tất cả người dùng 
3. Đảm bảo chức năng gọi/ báo thức được bật bất cứ khi nào ứng dụng đang chạy
4. Ứng dụng được thu nhỏ hoặc tạm ngưng trong trường hợp có cuộc gọi và sau đó bất cứ khi nào cuộc gọi dừng lại, ứng dụng sẽ được tiếp tục

# Những điểm quan trọng cần chú ý:
1. Kiểm tra cài đặt 
2. Gỡ cài đặt thử nghiệm
3. Kiểm tra mạng ở các trường hợp
4. Kiểm tra các phím chưa được ánh xạ
5. Kiểm tra màn hình, độ mượt, độ giật của ứng dụng
6. Tiếp tục nhập bàn phím trong các lần ngắt, các thời điểm khác khi có sự cố mạng
7. Các cách xử lý việc thoát khỏi ứng dụng
8. Hiệu ứng sạch khi ứng dụng chạy ở chế độ nền
9. Pin yếu, nhu cầu hiệu năng cao
10 .Hết pin trong khi ứng dụng đang được thực hiện
11. Mức tiêu thụ pin
12. Kiểm tra các liên quan của ứng dụng đến các ứng dụng khác trong máy

Link tham khảo: https://www.guru99.com/testing-mobile-apps.html