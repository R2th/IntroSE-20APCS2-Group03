Câu hỏi thường gặp mà tôi cũng đã thắc mắc là "Cách kiểm thử App dành cho thiết bị di động?" Trong hướng dẫn này, tôi cung cấp Mẫu kiểm thử, Kịch bản / Các trường hợp kiểm tra để thử nghiệm một ứng dụng di động.

Bạn có thể thực hiện một số hoặc tất cả các Test Cases dựa trên các yêu cầu thử nghiệm trên thiết bị di động của bạn. Các test cases được tổ chức dựa trên các loại thử nghiệm trên thiết bị di động.

## Functional Testing Test Cases

Kiểm tra chức năng của Mobiles thường bao gồm trong các lĩnh vực kiểm tra tương tác của người dùng cũng như kiểm tra các giao dịch. Các yếu tố khác nhau có liên quan trong kiểm tra chức năng là:
1. Loại ứng dụng dựa trên việc sử dụng chức năng kinh doanh (ngân hàng, chơi game, xã hội hoặc kinh doanh)
2. Loại đối tượng mục tiêu (người tiêu dùng, doanh nghiệp, giáo dục)
3. Kênh phân phối được sử dụng để truyền bá ứng dụng (ví dụ: Apple App Store, Google play, phân phối trực tiếp)

![](https://images.viblo.asia/55bb0565-fb48-4970-a63c-99ee540251ae.png)


Các kịch bản thử nghiệm cơ bản nhất trong thử nghiệm chức năng có thể được coi là:

1. Để xác nhận xem tất cả các trường bắt buộc bắt buộc có đang hoạt động theo yêu cầu hay không.
2. Để xác nhận rằng các trường bắt buộc được hiển thị trên màn hình theo cách đặc biệt hơn các trường không bắt buộc.
3. Để xác nhận xem ứng dụng có hoạt động theo yêu cầu bất cứ khi nào ứng dụng bắt đầu / dừng lại hay không.
4. Để xác nhận xem ứng dụng có chuyển sang chế độ thu nhỏ bất cứ khi nào có cuộc gọi đến không. Để xác nhận điều tương tự, chúng ta cần sử dụng điện thoại thứ hai để gọi điện thoại.
5. Để xác nhận xem điện thoại có thể lưu trữ, xử lý và nhận SMS bất cứ khi nào ứng dụng đang chạy hay không. Để xác nhận tương tự, chúng ta cần phải sử dụng một điện thoại thứ hai để gửi sms đến thiết bị đang được thử nghiệm và nơi ứng dụng đang thử nghiệm hiện đang chạy.
6. Để xác thực rằng thiết bị có thể thực hiện các yêu cầu đa nhiệm bất cứ khi nào cần thiết.
7. Để xác nhận rằng ứng dụng cho phép các tùy chọn mạng xã hội cần thiết như chia sẻ, đăng và điều hướng, v.v.
8. Để xác nhận rằng ứng dụng hỗ trợ bất kỳ giao dịch cổng thanh toán nào như Visa, Mastercard, Paypal, vv theo yêu cầu của ứng dụng.
9. Để xác thực rằng các tình huống cuộn trang đang được kích hoạt trong ứng dụng khi cần thiết.
10. Để xác nhận rằng việc điều hướng giữa các mô-đun có liên quan trong ứng dụng là theo yêu cầu.
11. Để xác nhận rằng các lỗi cắt ngắn là hoàn toàn nằm trong khẳ năng giải quyết.
12. Để xác thực rằng người dùng nhận được thông báo lỗi thích hợp như “Lỗi mạng. Hãy thử sau một thời gian ”bất cứ khi nào có bất kỳ lỗi mạng nào.
13. Để xác thực rằng ứng dụng đã cài đặt cho phép các ứng dụng khác thực hiện thỏa đáng, và nó không ăn vào bộ nhớ của các ứng dụng khác.
14. Để xác thực rằng ứng dụng sẽ tiếp tục hoạt động sau cùng trong trường hợp khởi động lại hoặc hỏng hệ thống.
15. Để xác nhận xem việc cài đặt ứng dụng có thể được thực hiện trơn tru miễn là người dùng có các tài nguyên cần thiết và nó không dẫn đến bất kỳ lỗi đáng kể nào.
16. Để xác nhận rằng ứng dụng thực hiện cơ sở khởi động tự động theo các yêu cầu.
17. Để xác thực xem ứng dụng có thực hiện theo yêu cầu trong tất cả các phiên bản của thiết bị di động là 2g, 3g và 4g hay không.
18. Để thực hiện Kiểm tra hồi quy để phát hiện các lỗi phần mềm mới trong các khu vực hiện có của một hệ thống sau khi đã thực hiện các thay đổi đối với chúng. Cũng chạy lại các kiểm tra đã thực hiện trước đó để xác định rằng hành vi của chương trình đã không thay đổi do các thay đổi.
19. Để xác nhận xem ứng dụng có cung cấp hướng dẫn sử dụng có sẵn cho những người không quen thuộc với ứng dụng hay không.

## Performance Testing Test Cases

Loại mục tiêu cơ bản của thử nghiệm này là đảm bảo rằng ứng dụng thực hiện chấp nhận được theo các yêu cầu hiệu suất nhất định như quyền truy cập của một số lượng lớn người dùng hoặc loại bỏ phần cơ sở hạ tầng quan trọng như máy chủ cơ sở dữ liệu.

Các kịch bản thử nghiệm chung cho Kiểm tra hiệu suất trong ứng dụng dành cho thiết bị di động là:
1. Để xác định xem ứng dụng có thực hiện theo yêu cầu trong các điều kiện tải khác nhau hay không.
2. Để xác định xem mức độ phủ sóng của mạng hiện tại có thể hỗ trợ ứng dụng ở mức cao nhất, trung bình và tối thiểu hay không.
3. Để xác định xem thiết lập cấu hình máy khách-máy chủ hiện có có cung cấp mức hiệu suất tối ưu được yêu cầu không.
4. Để xác định các tắc nghẽn ứng dụng và cơ sở hạ tầng khác nhau ngăn cản ứng dụng thực hiện ở các mức chấp nhận được yêu cầu.
5. Để xác nhận xem thời gian phản hồi của ứng dụng có đúng với các yêu cầu không.
6. Để đánh giá sản phẩm và / hoặc phần cứng để xác định xem nó có thể xử lý khối lượng tải dự kiến hay không.
7. Để đánh giá liệu tuổi thọ pin có thể hỗ trợ ứng dụng thực hiện theo khối lượng tải dự kiến hay không.
8. Để xác nhận hiệu suất ứng dụng khi mạng được chuyển thành WIFI từ 2G / 3G hoặc ngược lại.
9. Để xác nhận mỗi chu kỳ CPU được yêu cầu là tối ưu hóa
10. Để xác nhận rằng mức tiêu thụ pin, rò rỉ bộ nhớ, tài nguyên như GPS, hiệu suất Máy ảnh cũng nằm trong các hướng dẫn bắt buộc.
11. Để xác nhận tuổi thọ của ứng dụng bất cứ khi nào người dùng tải nghiêm ngặt.
12. Để xác thực hiệu suất mạng trong khi di chuyển xung quanh với thiết bị.
13. Để xác nhận hiệu suất của ứng dụng khi chỉ cần có các giai đoạn kết nối liên tục.

## Security Testing Test Cases

![](https://images.viblo.asia/19f586b4-51bb-47b1-916a-0ba9d6502cdd.png)


Mục tiêu cơ bản của kiểm tra bảo mật là đảm bảo rằng các yêu cầu về bảo mật mạng và dữ liệu của ứng dụng được đáp ứng theo các nguyên tắc.

Sau đây là các lĩnh vực quan trọng nhất để kiểm tra tính bảo mật của các ứng dụng di động:

1. Để xác thực rằng ứng dụng có thể chịu được bất kỳ tấn công bạo lực nào, đó là quá trình thử nghiệm và lỗi tự động được sử dụng để đoán tên người dùng, mật khẩu hoặc số thẻ tín dụng của một người.
2. Để xác nhận xem một ứng dụng có cho phép kẻ tấn công truy cập vào nội dung nhạy cảm hoặc chức năng mà không cần xác thực thích hợp hay không.
3. Để xác thực rằng ứng dụng có hệ thống bảo vệ mật khẩu mạnh và không cho phép kẻ tấn công lấy, thay đổi hoặc khôi phục mật khẩu của người dùng khác.
4. Để xác nhận rằng ứng dụng không bị hết hạn phiên.
5. Để xác định các phụ thuộc động và thực hiện các biện pháp để ngăn chặn bất kỳ kẻ tấn công nào truy cập các lỗ hổng này.
6. Để ngăn chặn các cuộc tấn công liên quan đến SQL injection.
7. Để xác định và phục hồi từ bất kỳ kịch bản mã không được quản lý nào.
8. Để đảm bảo các chứng chỉ có được xác nhận hay không, ứng dụng có triển khai Chứng chỉ ghim hay không.
9. Để bảo vệ ứng dụng và mạng khỏi các cuộc tấn công từ chối dịch vụ.
10. Để phân tích lưu trữ dữ liệu và yêu cầu xác thực dữ liệu.
11. Để cho phép quản lý phiên để ngăn chặn người dùng trái phép truy cập thông tin không được yêu cầu.
12. Để kiểm tra xem mã mật mã có bị hỏng hay không và đảm bảo rằng mã đã được sửa chữa.
13. Để xác thực xem việc thực hiện logic nghiệp vụ có được bảo mật hay không và không dễ bị tấn công từ bên ngoài.
14. Để phân tích các tương tác hệ thống tệp, hãy xác định bất kỳ lỗ hổng nào và sửa các vấn đề này.
15. Để xác thực các trình xử lý giao thức, ví dụ như cố gắng cấu hình lại trang đích mặc định cho ứng dụng bằng một iframe độc ​​hại.
16. Để bảo vệ chống lại tiêm bên khách hàng độc hại.
17. Để bảo vệ chống lại tiêm thời gian độc hại.
18. Để điều tra bộ nhớ đệm của tệp và ngăn chặn mọi khả năng độc hại từ cùng một tệp.
19. Để ngăn không cho lưu trữ dữ liệu không an toàn trong bộ đệm ẩn của bàn phím của ứng dụng.
20. Để điều tra cookie và ngăn chặn bất kỳ hành động độc hại nào từ cookie.
21. Để cung cấp kiểm toán thường xuyên cho phân tích bảo vệ dữ liệu.
22. Điều tra các tệp được tạo tùy chỉnh và ngăn chặn bất kỳ hành động độc hại nào từ các tệp được tạo tùy chỉnh.
23. Để ngăn chặn tràn bộ đệm và các trường hợp tham nhũng bộ nhớ.
24.Để phân tích các luồng dữ liệu khác nhau và ngăn ngừa bất kỳ lỗ hổng nào từ các luồng này.


## Usability Testing Test Cases

![](https://images.viblo.asia/e6ae400c-5d9f-440a-8a45-f9beaab1330e.png)


Quy trình kiểm tra khả năng sử dụng của ứng dụng Di động được thực hiện để có một ứng dụng bước nhanh chóng và dễ dàng với ít chức năng hơn so với ứng dụng chậm và khó khăn với nhiều tính năng. Mục tiêu chính là để đảm bảo rằng chúng ta sẽ có một giao diện dễ sử dụng, trực quan và tương tự như các ngành được chấp nhận trong ngành được sử dụng rộng rãi.
1. Để đảm bảo rằng các nút phải có kích thước cần thiết và phù hợp với các ngón tay lớn.
2. Để đảm bảo rằng các nút được đặt trong cùng một phần của màn hình để tránh nhầm lẫn với người dùng cuối.
3. Để đảm bảo rằng các biểu tượng là tự nhiên và nhất quán với ứng dụng.
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
16. Để đảm bảo rằng người dùng cuối được cung cấp hướng dẫn sử dụng giúp người dùng cuối hiểu và vận hành ứng dụng có thể không quen thuộc với các thủ tục của ứng dụng.

Kiểm tra khả năng sử dụng thường được thực hiện bởi người dùng thủ công vì chỉ có con người mới có thể hiểu được khả năng nhạy cảm và thoải mái của những người dùng khác.

## Compatibility Testing Test Cases

Thử nghiệm tương thích trên thiết bị di động được thực hiện để đảm bảo rằng thiết bị di động có kích thước, độ phân giải, màn hình, phiên bản và phần cứng khác nhau nên ứng dụng sẽ được kiểm tra trên tất cả các thiết bị để đảm bảo ứng dụng hoạt động như mong muốn.

Sau đây là những khu vực nổi bật nhất để kiểm tra khả năng tương thích.

1. Để xác nhận giao diện người dùng của ứng dụng là theo kích thước màn hình của thiết bị, không có văn bản / điều khiển nào là vô hình hoặc không thể truy cập được.
2. Để đảm bảo rằng văn bản có thể đọc được cho tất cả người dùng cho ứng dụng.
3. Để đảm bảo chức năng gọi / báo thức được kích hoạt bất cứ khi nào ứng dụng đang chạy. Ứng dụng này được thu nhỏ hoặc tạm ngưng trong trường hợp có cuộc gọi và sau đó bất cứ khi nào cuộc gọi dừng lại, ứng dụng sẽ được tiếp tục.

## Recoverability Testing Test Cases

1. Phục hồi sự cố và gián đoạn giao dịch
2. Xác nhận tình hình phục hồi ứng dụng hiệu quả sau các tình huống gián đoạn / sự cố bất ngờ.
3. Xác minh cách ứng dụng xử lý giao dịch trong khi mất điện (tức là pin chết hoặc đột ngột tắt thiết bị thủ công)
4. Việc xác nhận quá trình mà kết nối bị treo, hệ thống cần phải thiết lập lại để khôi phục dữ liệu bị ảnh hưởng trực tiếp bởi kết nối bị treo.

**Important Checklist**

1. Cài đặt thử nghiệm (cho dù các ứng dụng có thể được cài đặt trong một khoảng thời gian hợp lý và với tiêu chuẩn bắt buộc)
2. Gỡ cài đặt thử nghiệm (cho dù ứng dụng có thể được gỡ cài đặt trong một khoảng thời gian hợp lý và với tiêu chí bắt buộc)
3. Các trường hợp kiểm tra mạng (xác nhận xem mạng có hoạt động theo tải yêu cầu hay không, cho dù mạng có thể hỗ trợ tất cả các ứng dụng cần thiết trong quá trình thử nghiệm)
4. Kiểm tra các phím chưa được ánh xạ
5. Kiểm tra màn hình splash của ứng dụng
6. Tiếp tục nhập bàn phím trong quá trình ngắt và các thời điểm khác như sự cố mạng
7. Các phương thức xử lý việc thoát khỏi ứng dụng
8. hiệu ứng sạc trong khi một ứng dụng đang chạy trong nền
9. Pin yếu và nhu cầu hiệu suất cao
10. Loại bỏ pin trong khi một ứng dụng đang được thực hiện
11. Tiêu thụ pin theo ứng dụng
12. Kiểm tra tác dụng phụ của ứng dụng


Nguồn dịch: https://www.guru99.com/testing-mobile-apps.html