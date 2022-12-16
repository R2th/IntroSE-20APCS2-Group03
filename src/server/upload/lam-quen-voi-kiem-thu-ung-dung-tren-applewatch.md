Việc kiểm thử ứng dụng di động ngày nay đã không còn dừng lại ở những thiết bị smartphone, trên sự phát triển của những công nghệ mới, smartwatch là một lĩnh vực hết sức thu hút và được chào đón rất nồng nhiệt. Dựa vào một bài viết tham khảo được về kiểm thử ứng dụng trên Apple Watch, tôi muốn truyền đạt lại những kiến thức cơ bản nhất về những vấn đề mà một tester cần chú ý khi kiểm thử với công nghệ mới này, dù có thể là không đầy đủ các tính năng tân tiến nhất của thế hệ Apple Watch hiện nay, nhưng tôi nghĩ đây cũng là những chia sẻ đủ để chúng ta làm quen với một lĩnh vực mới trong kiểm thử.

Nếu bạn chưa quen với smartwatch của Apple - Apple Watch và hệ điều hành mới -  WatchOS,  việc tìm hiểu về hướng phát triển, UX và thiết kế là rất quan trọng. Apple cung cấp một số nguồn thông tin hữu ích trên Developer Website của họ. [Đây](https://developer.apple.com/design/human-interface-guidelines/watchos/overview/getting-started/) là những guideline đầy tiên và cơ bản nhất dành cho tất cả những ai tham gia phát triển, thử nghiệm hoặc thiết kế ứng dụng smartwatch chạy trên Apple Watch.

![](https://images.viblo.asia/065eed6e-3105-4b6d-a17f-91ea69d5f4f8.jpg)

# 1. Phần cứng

Về phần cứng, AppleWatch cung cấp bộ nhớ 512MB, bộ nhớ 8GB. Có một phiên bản Apple Watch 38 mm với màn hình 1.337 inch với độ phân giải 272 × 340 pixel và 326dpi. Phiên bản còn lại là phiên bản 42 mm với màn hình 1,534 inch với độ phân giải 312 × 390 pixel và cùng dpi.  Tuy vẫn hỗ trợ những tính năng như nhau nhưng do có sự khác nhau về kích thước màn hình nên UI ứng dụng vẫn là một vấn đề mà tester cần quan tâm đến. <br/><br/>
:star2:   Điều quan trọng cần biết khi test ứng dụng Apple Watch là nó chỉ tương thích với các thiết bị  iOS 8.2 và iPhone 5 trở lên.

# 2. Một số thao tác cơ bản và chức năng đặc trưng của Apple Watch:
Như chúng ta đã biết, Apple tập trung cao độ vào thiết kế sản phẩm rất tốt. Do đó, họ đang cung cấp các nguyên tắc đặc trưng về user's UX trên thiết bị của mình.

 ### :star2: Thao tác cơ bản
Việc sử dụng các phím tắt, thao tác đặc trưng của device cũng phần nào ảnh hưởng đến các event trong app, vì vậy chúng ta cũng cần thành thạo những thao tác cơ bản khi sử dụng thiết bị Apple Watch như:
- Một lần nhấn sẽ kích hoạt một hành động dựa trên các sự kiện trong ứng dụng.
- Vuốt dọc sẽ cuộn màn hình hiện tại.
- Vuốt ngang sẽ hiển thị màn hình trước hoặc tiếp theo dựa trên thao tác người dùng.
- Vuốt cạnh trái sẽ điều hướng trở lại màn hình chính trong giao diện phân cấp.

### :star2: Chức năng đặc trưng
WatchOS đang cung cấp nhiều tính năng phần mềm có thể có tác động đến ứng dụng của bạn. Danh sách sau đây cho thấy một số về các tính năng mà bạn nên biết và sử dụng trong các case kiểm thử của mình:

- Một tính năng rất quan trọng mà tester không thể bỏ qua đó là ***chụp ảnh chụp màn hình Apple Watch***. Để chụp ảnh màn hình, bạn phải nhấn nút "the digital crown" và nút bên cạnh đồng hồ cùng một lúc. Sự kết hợp này sẽ lưu ảnh chụp màn hình trong ứng dụng ảnh và ảnh chụp màn hình có thể được chuyển sang smartphone để lưu trữ và có thể được sử dụng làm evidence để log bug.
- Giống như các đồng hồ thông minh khác, Apple Watch đang cung cấp **micro** để trả lời các cuộc gọi điện thoại hoặc gửi / trả lời tin nhắn. Khi nhấn đúp vào  "the digital crown" , user có thể dễ dàng kích hoạt ngay Siri trên đồng hồ, và từ đó thực thi các chức năng nghe gọi thông qua Siri.
- Một phương thức nhập liệu nữa mà Apple Watch đang cung cấp là ***cảm biến***. Apple Watch có thể đo lường được nhịp tim, gia tốc và cảm biến ánh sáng xung quanh. Cảm biến nhịp tim được đặt ở mặt sau của đồng hồ (hình bên dưới). Chức năng này là một lý do để người dùng chọn sử dụng smartwatch cùng tập luyện hoặc dùng cho các ứng dụng về sức khỏe.

![](https://images.viblo.asia/8debb2e9-a50f-4df5-a685-c897d93bc509.jpg)

- Để kết nối Apple Watch với thiết bị iOS, nó cung cấp ***Wi-Fi, Bluetooth 4.0 và NFC***. Phương thức kết nối chính là Bluetooth để trao đổi dữ liệu giữa Smartwatch và Smartphone. Khi đồng hồ không thể thiết lập kết nối Bluetooth với điện thoại hoặc điện thoại đã tắt Bluetooth, đồng hồ sẽ sử dụng kết nối Wi-Fi để thử kết nối. Kết nối NFC chủ yếu được sử dụng cho Apple Pay để trao đổi dữ liệu thanh toán, ví dụ như trong quá trình thanh toán trong siêu thị.
- ***Siri***: Nếu ứng dụng của bạn hỗ trợ lệnh thoại ( ghi âm, gọi điện thoại ), Siri chắc chắn phải được nằm trong danh sách các case cần phải kiểm thử.
- ***Complications***: Complications là các phần nhỏ của mặt đồng hồ cung cấp dữ liệu bổ sung, ví dụ như bước đi hiện tại, các sự kiện sắp tới hoặc thời tiết. Tùy thuộc vào kích thước mặt đồng hồ mà số lượng complications có thể khác nhau. Chạm vào một thông tin nào đó trên danh sách các complications, Apple Watch sẽ mở ứng dụng đó lên cho bạn. Nó tương tự như Notification Center trên smartphone vậy.
- ***Time Travel***: Time Travel là một tính năng có thể được sử dụng bằng cách xoay "the digital crown" để tìm kiếm các sự kiện sắp tới hoặc trong quá khứ, ví dụ như trong lịch.
- ***Do not disturb mode***: Chế độ này sẽ tắt tất cả các chuông rung hoặc thông báo trên thiết bị AppleWatch, nhưng vẫn có thể kết nối với điện thoại và vẫn có thể tiếp tục nhận dữ liệu.
- **Silent mode**: Chế độ này sẽ giúp thiệt bị của bạn tắt tất cả âm thanh.
- ***Power reserve mode***: Chế độ này sẽ được bật lên tự động khi mức pin của đồng hồ dưới 10%. Trong chế độ này, tất cả các kết nối sẽ được tắt, chỉ có thời gian được hiển thị trên màn hình. Ngoài ra, chế độ này có thể được setting bằng tay.
- ***Camera remote control***: Bạn có thể sử dụng Apple Watch làm điều khiển từ xa cho ứng dụng camera.

# 3. Set up môi trường test
Phát triển ứng dụng cho Apple có thể rất mệt mỏi vì quá trình gửi ứng dụng. Mọi ứng dụng đều phải vượt qua các nguyên tắc gửi. Do đó, điều rất quan trọng đối với đội phát triển là biết được loại resources nào Apple cần từ team để kiểm tra ứng dụng. Hơn nữa, điều cần thiết là phải biết loại kiểm thử nào Apple sẽ thực hiện, để chúng ta có thể trải nghiệm các kiểm thử đó trước khi gửi ứng dụng cho họ. Nếu bạn đã quen thuộc với quy trình gửi ứng dụng của Apple, chắc chắn bạn đã biết các nguyên tắc gửi cho các ứng dụng iOS bao gồm iPhone và iPad. Tuy nhiên, có một số kiểm thử khác bạn cần thực hiện khi ứng dụng đang phát triển có tiện ích mở rộng cho Apple Watch. Apple cũng cung cấp một hướng dẫn cho smartwatch của họ và nó có thể được tìm thấy ở [đây](https://developer.apple.com/watchos/submit/). 

Giống như đối với các hệ điều hành smartwatch khác, Apple Watch yêu cầu một ứng dụng trên iOS có tên là Watch, nó có chức năng cài đặt hoặc chuyển dữ liệu từ những thiết bị Apple khác sang Apple Watch. Ứng dụng Watch được cài đặt sẵn trên tất cả các thiết bị iOS hỗ trợ Apple Watch. Ứng dụng phải được sử dụng để kích hoạt, setting cấu hình đồng hồ và cũng là trung tâm để cài đặt, xóa hoặc setting cấu hình ứng dụng trên AppleWatch. 

Hơn nữa, dữ liệu có thể được gửi hoặc nhận, ví dụ như ảnh, message, mail, lịch trình hoặc các hoạt động thể thao. Sau khi đồng hồ được định cấu hình, bạn có thể sử dụng nó mà không cần thiết bị iOS được ghép nối nhưng điều này hiện không có ý nghĩa gì, do những hạn chế của đồng hồ về chức năng và tính năng. Tuy nhiên, sử dụng đồng hồ không có thiết bị iOS được ghép nối là một case kiểm thử khá là đặc biệt để xem ứng dụng xử lý tình huống độc lập như thế nào.

Khi bạn đang cần phải test AppleWatch, tôi khuyên bạn nên thuê hoặc mua Apple Watch để làm quen với tất cả các tính năng và phương thức khác nhau mà hệ thống này đang cung cấp. Tôi tin rằng đọc và biết tất cả các hướng dẫn về thiết bị là chìa khóa thành công khi thực hiện test đối với bất kỳ nền tảng di động hoặc thiết bị đeo nào khác trên thị trường.

# 4. Cần check những gì với ứng dụng chạy trên Apple Watch
:star2:  ***UI:*** Như đã nói ở trên, Apple Watch có nhiều kích cỡ màn hình khác nhau nên việc kiểm thử UI ứng dụng, kiểm thử độ tương thích màn hình là hết sức quan trọng.<br/><br/>
:star2:  ***UX:*** Do màn  hình của Apple Watch sẽ nhỏ hơn rất nhiều so với smartphone, nên cách hành vi tap cũng tương đối cần sự tập trung và chạm có chủ đích hơn. Và cũng vì thế đa số các ứng dụng phát triển trên Apple Watch thường có giao diện đơn giản, 1 màn hình chỉ hiển thị 1 chức năng độc lập.<br/><br/>
:star2:  ***Functional:*** Và tất nhiên, cũng như toàn bộ những ứng dụng trên các nền tảng khác, việc kiểm thử tính đúng đắn và tiện lợi của các chức năng trên ứng dụng là việc mà một tester cần phải đảm bảo. Hãy chắc rằng, dù trên một nền tảng, một công nghệ mới lạ đến thế nào cũng không làm khó được bạn. 

# 5. Tham khảo:
https://adventuresinqa.com/2016/02/22/smartwatch-app-testing-watchos/