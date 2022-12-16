Thử nghiệm hiệu suất di động hiện nay rất phổ biến trong số các trang web cố gắng tạo sự hiện diện của họ trên thiết bị di động và thiết bị di động.<br>
Thử nghiệm hiệu suất trên máy tính để bàn là điều chúng tôi đang thực hiện trong một vài năm và tốt để hiểu cách Kiểm tra hiệu suất trên thiết bị di động khác với thử nghiệm Hiệu suất trên máy tính để bàn.<br>
Hướng dẫn này sẽ giúp bạn trả lời câu hỏi này và nó cũng khiến bạn chú ý đến BlazeMeter - một công cụ mới nổi trong Kiểm tra hiệu năng di động.<br>
Hướng dẫn sẽ chạm vào các tính năng chính của BlazeMeter và thông tin quan trọng cần biết về nó trước khi bắt đầu sử dụng nó.<br>
Đến cuối hướng dẫn, bạn sẽ có thể biết BlazeMeter đáp ứng kỳ vọng của bạn khi thực hiện Kiểm tra Hiệu suất Di động.<br>
## Kiểm tra hiệu suất:<br>
Kiểm tra hiệu suất là:<br>
- Một loại thử nghiệm phi chức năng<br>
- Áp dụng cho các ứng dụng có người dùng đồng thời<br>
- Thử nghiệm được thực hiện để xác định cách một hệ thống thực hiện theo khối lượng công việc cụ thể (người dùng)<br>
- Để chứng minh rằng hệ thống đáp ứng các tiêu chí hiệu suất<br>
- Đo lường phần nào của hệ thống hoặc khối lượng công việc làm cho hệ thống hoạt động kém<br>
Sau khi biết về thử nghiệm hiệu suất, điều tiếp theo đến với tâm trí của chúng tôi là<br>
## Tại sao chúng ta cần kiểm tra hiệu năng?<br>
Tôi sẽ đặt một ví dụ về một trang web nổi tiếng được cải thiện rất nhiều trong vài tháng qua<br>
tức là Tổng công ty Du lịch và Dịch vụ Đường sắt được sử dụng để đặt vé tàu.<br>
Vì vậy, kiểm tra hiệu suất là bắt buộc để<br>
- Xác minh sự sẵn sàng của ứng dụng để phát trực tiếp<br>
- Xác minh xem các tiêu chí hiệu suất mong muốn có được đáp ứng hay không<br>
- So sánh đặc điểm / cấu hình hiệu suất của ứng dụng với tiêu chuẩn<br>
- Xác định các nút cổ chai hiệu suất<br>
- Tạo điều kiện cho hiệu suất điều chỉnh<br>

Cho đến nay chúng tôi đã thực hiện thử nghiệm hiệu suất cho các ứng dụng dành cho máy tính để bàn nhưng hiện tại có rất nhiều sự tập trung vào thử nghiệm hiệu suất di động? Tại sao vậy?<br>
Tại sao vậy?<br>
Hãy xem một số sự kiện dưới đây cho thấy việc sử dụng thiết bị di động ngày càng tăng và nó đang trở thành một phần trong cuộc sống của chúng tôi<br>
- 28% sử dụng Internet đến từ điện thoại di động. Dự kiến sẽ tiếp quản mức sử dụng máy tính để bàn vào năm 2014<br>
- 62% các công ty thiết kế trang web dành riêng cho thiết bị di động đã tăng doanh thu<br>
- Khoảng 91 phần trăm công dân Hoa Kỳ có thiết bị di động của họ với họ 24/7<br>
- Số lượng độ phân giải màn hình độc đáo đã tăng từ 97 trong năm 2010 lên khoảng 232 vào năm 2013<br>
- Chỉ 55% các công ty hiện đang tiến hành thử nghiệm trải nghiệm người dùng trực tuyến<br>
- 48% người dùng nói rằng nếu họ đến một trang web kinh doanh không hoạt động tốt trên thiết bị di động, họ coi đó là dấu hiệu của doanh nghiệp đơn giản là không quan tâm<br>
- 90% người dùng sử dụng nhiều màn hình để truy cập web<br>
## Thử nghiệm hiệu suất di động và Thử nghiệm hiệu suất máy tính để bàn<br>
Hãy xem cách thử nghiệm hiệu suất trên thiết bị di động khác với thử nghiệm hiệu suất trên máy tính để bàn<br>
![](https://images.viblo.asia/bdecb833-8b2c-4c84-b678-73897ad55120.jpg)<br>
## Nền tảng và thiết bị<br>
Điện thoại di động có nhiều nền tảng chạy trên các thiết bị khác nhau. Nó được đảm bảo rằng tất cả các nền tảng chính và tất cả các loại thiết bị được cung cấp bởi các thương hiệu lớn được bảo hiểm. Trong máy tính để bàn, các nền tảng cụ thể được nhắm mục tiêu.<br>
## Kích thước màn hình<br>
Điện thoại di động có rất nhiều biến thể trong kích thước màn hình mà không phải là trường hợp cho máy tính để bàn.<br>
## Khả năng sử dụng<br>
Trong máy tính để bàn, tương tác của người dùng bị giới hạn ở chuột và bàn phím trong khi ở chế độ tương tác người dùng điện thoại di động là màn hình cảm ứng, lệnh thoại, phát hiện chuyển động và những điều này phức tạp và khó mô phỏng hơn.<br>
## Các loại ứng dụng<br>
Các ứng dụng dành cho máy tính để bàn chủ yếu là các ứng dụng trên nền Windows (máy tính để bàn) hoặc các ứng dụng dựa trên web trong khi các ứng dụng di động có thể là Native, Web hoặc Hybrid.<br>
## Mô phỏng & Trình giả lập<br>
Đối với thử nghiệm trên thiết bị di động, việc sử dụng Trình mô phỏng & Trình mô phỏng là phổ biến nhưng chúng vẫn không phải là biểu diễn thực sự của các thiết bị.<br>
## Quyền riêng tư và bảo mật<br>
Hầu hết các ứng dụng di động sử dụng dữ liệu cá nhân như danh bạ và tin nhắn điện thoại, video, ảnh và giả định rằng các ứng dụng được bảo mật và chúng không truy cập dữ liệu cố ý. Nó cũng giả định rằng họ sẽ không chia sẻ những chi tiết hơn nữa.<br>
## Mạng
Máy tính để bàn sử dụng mạng LAN và không dây, rất dễ dự đoán so với mạng di động. Mạng di động có thể là 3G, 4G, tín hiệu yếu, không có tín hiệu, tín hiệu mạnh và rất khó để mô phỏng hoặc chuyển đổi từ mạng này sang mạng khác rất thực tế.
## Nâng cấp SW
Trong điện thoại di động, sửa đổi hệ điều hành / nền tảng là rất phổ biến và điều này ảnh hưởng đến hiệu suất của một ứng dụng di động.<br>
## Quản lý phiên và gián đoạn
Ứng dụng và người dùng liên tục bị gián đoạn bởi các cuộc gọi, SMS, thông báo đẩy, v.v. Trong thử nghiệm trên thiết bị di động, chúng tôi cũng phải đưa họ vào tài khoản.<br>
## Pin
Pin không phải là tất cả trong hình ảnh cho máy tính để bàn đóng một vai trò quan trọng trong thử nghiệm hiệu suất di động. Thật tuyệt khi thấy hiệu suất của ứng dụng trên trạng thái pin khác nhau.<br>
## Thành phần của thử nghiệm hiệu suất di động. <br>
![](https://images.viblo.asia/f3c307e5-ec99-479d-8f6d-934ce069f24c.jpg)<br>
Đây là những thành phần chính của thử nghiệm trên thiết bị di động<br>
**1) Trình giả lập và mô phỏng** - Trình giả lập di động là các nền tảng phần mềm, được cài đặt trên máy tính xách tay hoặc máy tính để bàn, bắt chước nền tảng di động hoặc môi trường hệ điều hành từ quan điểm của ứng dụng đang chạy trên hệ điều hành. Nói cách khác, các ứng dụng nghĩ rằng chúng đang chạy trên một chiếc điện thoại thực, không phải máy tính.<br>
Đây không phải là đại diện thực sự của điện thoại di động mặc dù nó giúp rất nhiều trong cắt giảm chi phí.<br>
**2) Thiết bị di động**- Kiểm tra trong thời gian thực yêu cầu thiết bị thực và có một vài trường hợp không thể thực hiện trên trình mô phỏng, ví dụ: cách ứng dụng hoạt động khi ứng dụng bị gián đoạn bởi cuộc gọi hoặc SMS.<br>
**3) Lựa chọn công cụ** - Lựa chọn công cụ phù hợp là chìa khóa của Kiểm tra di động.<br>
**4) Mạng** - Người dùng thực sử dụng mạng giữ thay đổi theo tín hiệu. Điều quan trọng là mô phỏng các mạng khác nhau với các giới hạn băng thông khác nhau.<br>
## Công cụ kiểm tra hiệu suất di động - BlazeMeter<br>
Dưới đây là các tính năng chính của BlazeMeter:<br>
### BlazeMeter là Công cụ kiểm tra hiệu suất di động<br>
- Công cụ này có khả năng mở rộng cao đến một triệu người dùng ảo<br>
- Nó có báo cáo dựa trên web toàn diện có thể được truy cập từ mọi nơi<br>
- BlazeMeter cung cấp plug-in Relic mới giúp theo dõi mắt trên máy chủ. Đối với tài khoản Relic mới (giấy phép) là bắt buộc<br>
- BlazeMeter sử dụng các máy chủ đám mây của Amazon và tất cả việc thực hiện kiểm tra được thực hiện từ đám mây<br>
- BlazeMeter cũng cung cấp hỗ trợ trình cắm thêm cho Google Analytics, Apache JMeter và Drupal<br>
- Trong khi tạo một thử nghiệm mới, hãy chọn tùy chọn Google Analytics và BlazeMeter xử lý phần còn lại. BlazeMeter phân tích dữ liệu trong 12 tháng qua và tạo một thử nghiệm dựa trên các phương pháp hay nhất<br>
- Điều này bao gồm kiểm tra 5 trang được truy cập nhiều nhất (có thể truy cập trực tiếp qua HTTP) và tính toán số lượng người dùng đồng thời được yêu cầu và độ trễ giữa các yêu cầu dựa trên dữ liệu sử dụng trang web thực tế<br>
- Trình cắm thêm JMeter cho phép chạy thử nghiệm từ máy trạm của chúng tôi và xuất dữ liệu thực hiện sang BlazeMeter để phân tích và tạo báo cáo<br>
- BlazeMeter cho phép tạo tải bằng cách gán máy phát điện tải từ các vị trí địa lý khác nhau. Nó cũng cho phép người dùng ảo sử dụng IP duy nhất làm cho nó có thể mô phỏng người dùng ảo thực tế hơn (IP Spoofing).<br>
- BlazeMeter cũng hỗ trợ vài công cụ tích hợp liên tục như TeamCity, Jenkins và JetBrains. Do đó, nó có thể được sử dụng trong thần thoại Agile<br>
- Nó cũng cung cấp bảo mật dữ liệu bằng cách che dấu dữ liệu. Điều này có thể xảy ra nếu thay vì tạo tải từ Đám mây, chúng tôi chọn tạo tải tại chỗ<br>
- Tính năng quan trọng và độc đáo nhất của BlazeMeter là công cụ tạo kịch bản của nó. Nó sử dụng JMeter làm thành phần kịch bản của nó<br>
### Các tính năng chính của JMeter là:<br>
- Nhiều nền tảng<br>
- Khả năng mở rộng cao<br>
- Hỗ trợ nhiều giao thức<br>
- Tính khả dụng của nhiều loại Assertions và Listeners khác nhau<br>
## Khả năng tham số và tương quan tốt
Kiến trúc của BlazeMeter<br>
**(Lưu ý: Nhấp vào bất kỳ hình ảnh nào để mở rộng)<br>**
![](https://images.viblo.asia/5047599b-d4ea-4aa4-acc3-0ae2fc01373f.jpg)<br>
- Đây là kiến trúc của BlazeMeter. Nó có bộ điều khiển BlazeMeter tập trung trong Cloud. Kiểm tra được điều khiển bởi bộ điều khiển và tùy thuộc vào tùy chọn mà chúng tôi lựa chọn, người dùng ảo có thể được tạo ra bởi máy chủ Cloud hoặc On-Premises Load Generator.<br>
- Những máy tạo tải này tạo ra những người dùng thiết bị di động thực tế bằng cách mô phỏng các thiết bị khác nhau và mô phỏng một loạt các mạng.Những máy tạo tải này tạo ra những người dùng thiết bị di động thực tế bằng cách mô phỏng các thiết bị khác nhau và mô phỏng một loạt các mạng.<br>
- Yêu cầu sau đó nhấn vào máy chủ ứng dụng giao tiếp với máy chủ cơ sở dữ liệu. BlazeMeter thu thập dữ liệu từ máy chủ ứng dụng và hiển thị kết quả dưới dạng biểu đồ. Nếu chúng ta có công cụ giám sát tại chỗ, nó cũng sẽ thu thập các quầy biểu diễn và gửi nó đến BlazeMeter.<br>
- BlazeMeter tích hợp dữ liệu giám sát với kết quả kiểm tra và giúp chúng tôi xác định trạng thái của máy chủ khi chúng ta thấy sự xuống cấp hiệu suất. Do đó, giúp đỡ trong việc xác định các vấn đề hiệu suất.<br>
## BlazeMeter - tính năng FollowMe
**FollowMe** là tính năng độc đáo của BlazeMeter. Nó đang được quảng cáo bởi BlazeMeter với dòng chữ “No Scripting. Không có ghi chú. Chỉ cần kiểm tra “.<br>
***Dưới đây là một vài tính năng chính:<br>***
- Tạo ra một triệu người dùng và thậm chí nhiều người dùng ảo hơn để theo dõi chúng tôi trong thời gian thực.<br>
- Người dùng ảo làm theo hoạt động duyệt web của chúng tôi<br>
- Xem phân tích thời gian thực và điều chỉnh thử nghiệm của chúng tôi ngay lập tức<br>
![](https://images.viblo.asia/3b94a397-d6ce-44c2-a279-de5ae2a8113f.jpg)<br>
***(Lưu ý: Biểu đồ này là từ BlazeMeter)<br>***
Đây là plugin của Chrome và sau khi cài đặt, chúng tôi có thể thấy ở phía bên phải của trình duyệt.<br>
Thực hiện theo các số để chạy thử nghiệm. Tham khảo hình trên ở bước 7, chúng ta có thể chọn User Agent. Tôi đã chụp nhanh các tùy chọn sắp tới trong trình đơn thả xuống dành cho Đại lý người dùng.<br>
Sau khi nhấn nút Bắt đầu (bước 9), tất cả người dùng đồng thời sẽ sẵn sàng làm theo các bước của chúng tôi. Bất cứ bước nào chúng ta sẽ thực hiện trên trình duyệt, tất cả chúng sẽ làm điều đó. Trong thời gian chạy, chúng tôi có thể tạm dừng hoặc ngừng thử nghiệm. Chúng tôi cũng có thể xem báo cáo thử nghiệm và xuất hoạt động của người dùng sang tập lệnh JMeter.<br>
## Tạo BlazeMeter-Scenario<br>
![](https://images.viblo.asia/570e4cfb-3d45-4a50-9510-7dc1418fec1f.jpg)<br>
Đây là trang tạo kịch bản BlazeMeter. Kịch bản thử tải được thiết kế từ đây. Trong phần Thuộc tính kiểm tra JMeter, tập lệnh JMeter được tải lên. Khi BlazeMeter cung cấp một tùy chọn để chạy tập lệnh JMeter của bất kỳ phiên bản nào, chúng ta phải chọn phiên bản JMeter được sử dụng để tạo tập lệnh.<br>
Nếu có bất kỳ đối số dòng lệnh nào, nó cũng có thể được truyền cho kịch bản. Thông qua ghi đè máy chủ, Vusers được hướng dẫn để tạo tải bằng cách sử dụng địa chỉ IP duy nhất.<br>
Phần mô phỏng mạng giúp cấu hình các thiết lập mạng. Để hiểu rõ hơn, ảnh chụp nhanh của cùng một phần được giữ ở phía dưới cùng bên phải. Từ phần này, chúng ta có thể chọn mạng, thiết lập giới hạn tải xuống băng thông và độ trễ mạng trễ. Điều này giúp mô phỏng người dùng thực.<br>
Nếu chúng ta có tài khoản Relic mới, chúng ta có thể theo dõi các máy chủ. Tùy chọn New Relic APM và New Relic Insights được sử dụng cho tương tự.<br>
Ở phía bên tay phải, chúng ta có phần Thuộc tính kịch bản tải. Trong phần này, chúng tôi có tùy chọn “Vị trí” giúp chọn vị trí từ nơi chúng tôi muốn chạy thử tải. Danh sách thả xuống hiển thị vị trí của trình tạo tải trong đám mây.<br>
Sau đó, chúng tôi phải định cấu hình không có người dùng đồng thời, tăng tốc, thời lượng thử nghiệm tải. Lưu kịch bản và sẵn sàng thực hiện. Trong phiên bản dùng thử, chúng tôi có thể chạy thử nghiệm trong nửa giờ và hỗ trợ tối đa 50 Vusers.<br>
![](https://images.viblo.asia/3a019c83-6b34-45cf-98d1-9b3c8ca1cde3.jpg)<br>
Trong ảnh chụp nhanh ở trên, chúng tôi sẽ lấy ý tưởng về kết quả và báo cáo thử nghiệm. Ở bên tay trái, chúng ta có tên kịch bản ở phía trên (Test) và chạy thử cho mỗi kịch bản ở phía dưới (Session). Các liên kết phía trên biểu đồ không là gì ngoài tên giao dịch và có sẵn để chọn và bỏ chọn bằng tùy chọn chuyển đổi. Các tùy chọn chuyển đổi tương tự với người dùng, thời gian phản hồi và nhấn mỗi giây.<br>
Trên menu thả xuống ở phía trên cùng bên phải, chúng ta có thể thấy các báo cáo và nhật ký khác nhau mà chúng tôi có thể nhận được cho thử nghiệm. Báo cáo và Nhật ký có thể là Báo cáo tải, Báo cáo tổng hợp, Theo dõi, Nhật ký, Nhật ký lỗi, Cấu hình thử nghiệm ban đầu.<br>
## BlazeMeter - Http URL Test<br>
![](https://images.viblo.asia/73d15bfe-839e-4a18-a553-97abb64a7521.jpg)
Kiểm tra URL HTTP là tùy chọn tập lệnh mới. Chúng tôi phải tiếp tục thêm URL và yêu cầu cần gửi tới các URL đó. Một kịch bản lệnh JMeter được tự động tạo ra từ kiểu yêu cầu được cung cấp và trong quá trình thực thi nó gửi các yêu cầu tới máy chủ tuần tự từ trên xuống dưới.<br>
Do kịch bản được tạo ra tương tự như bất kỳ kịch bản lệnh JMeter được tạo thủ công nào, mỗi Vuser tuân theo chuỗi URL trong tập lệnh và duy trì phiên trình duyệt, cookie và bộ nhớ cache của riêng nó. Để hiển thị trang HTML làm phản hồi cho lần truy cập được gửi tới máy chủ, nó tải xuống tất cả các tài nguyên trên trang web bao gồm tệp CSS, tệp js, hình ảnh và nội dung tĩnh khác.<br>
Trong ảnh chụp ở trên, tôi đã cố gắng thêm 3 URL của Times of India và các URL này sẽ được thực thi bởi một người dùng ảo tuần tự - Trang chủ đầu tiên sau đó đến trang Thế giới và sau đó là trang Doanh nghiệp.<br>
Chúng tôi có thể thêm bốn loại yêu cầu tức là GET, POST, PUT và DELETE. Đối với yêu cầu đăng bài, các thông số và giá trị của chúng mà chúng tôi cần để vượt qua tập lệnh có thể được xác định bằng cách sử dụng bất kỳ công cụ chụp mạng nào như Fiddler.<br>
## BlazeMeter- Ưu và khuyết điểm<br>
![](https://images.viblo.asia/28cc9b8a-410b-48af-ab88-70811b502d90.jpg)<br>
Cảm ơn bạn rất nhiều vì đã dành thời gian quý báu để đọc bài viết. Hy vọng bài viết này có thể cung cấp một ý tưởng tốt về công cụ và người đọc chắc chắn sẽ cung cấp cho nó một thử.<br>
Nguồn dịch: https://www.softwaretestinghelp.com/blazemeter-basics/<br>