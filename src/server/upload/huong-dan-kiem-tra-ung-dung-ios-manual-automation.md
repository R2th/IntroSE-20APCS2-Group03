## Tại sao phải thử nghiệm iOS?

Được phát hành lần đầu tiên vào ngày 29 tháng 6 năm 2007, iOS là tên của nền tảng Apple cho các ứng dụng di động. Không giống như Android, Apple không cấp phép iOS để cài đặt trên phần cứng không phải của Apple. Ứng dụng iOS và iOS chỉ được cài đặt trên thiết bị Apple. Ứng dụng của bạn phải tương thích với bốn loại thiết bị và phiên bản iOS.

![](https://images.viblo.asia/837660bf-288b-4a19-a456-5702e7185cdb.png)

Đây là câu hỏi phổ biến khi nhà phát triển tạo một ứng dụng iOS.

![](https://images.viblo.asia/b9d9d309-b8cc-4e37-bb60-43c55c5f7af7.png)

Không quan trọng bạn đầu tư bao nhiêu thời gian vào thiết kế và triển khai, lỗi là không thể tránh khỏi và lỗi sẽ xuất hiện. Có một số lỗi phổ biến trên ứng dụng iOS. Được nêu dưới đây :

1. Ứng dụng bị treo.
Một trong những vấn đề khó chịu nhất, khi sử dụng các thiết bị của Apple là ứng dụng có thể bị sập thường xuyên trong quá trình thực thi. Nhiều lần ứng dụng gặp sự cố vì có một số lỗi hoặc rò rỉ bộ nhớ trong ứng dụng.

2. Ứng dụng không tương thích.
Ứng dụng iOS của bạn có thể chạy hoàn hảo trên phiên bản iOS hiện tại, nhưng nếu iOS được nâng cấp, nó có thể không hoạt động do sự cố không tương thích.

3. Lỗ hổng bảo mật
Lỗ hổng bảo mật trong iOS cho phép tin tặc tấn công các thiết bị iOS của bạn, đánh cắp thông tin cá nhân của bạn. Cho đến hiện tại, các lỗ hổng bảo mật nghiêm trọng của iPhone được phát hiện trong các phiên bản iOS khác nhau.

4. Rò rỉ bộ nhớ
Rò rỉ bộ nhớ là các khối bộ nhớ được phân bổ mà chương trình không còn sử dụng. Rò rỉ bộ nhớ khiến ứng dụng iOS của bạn bị sập. Chúng là những lỗi và phải luôn được sửa.

Trong hướng dẫn này, sẽ nói đến

* Tại sao phải thử nghiệm iOS.?
* Bản đồ thử nghiệm iOS.
* Danh sách kiểm tra iOS.
* Chiến lược thử nghiệm iOS.
* Kiểm thử tự động
* Kiểm tra đơn vị với OCUnit
* Kiểm tra giao diện người dùng với UIAutomation
* Kiểm thử bằng tay
* Kiểm thử thăm dò
* Kiểm tra người dùng
* Kiểm tra khái niệm
* Kiểm tra khả năng sử dụng
* Kiểm thử beta
* Kiểm thử  A / B
* Kiểm thử IOS Thực tiễn tốt nhất
* MYTHS về kiểm thử iOS.

## Bản đồ thử nghiệm iOS

Như thể hiện trong hình trên, Bản đồ thử nghiệm iOS hiển thị tất cả các mục mà người kiểm tra nên xem xét khi tiến hành thử nghiệm trên iOS.

![](https://images.viblo.asia/c07dd126-b266-488a-bcba-e6582feeade9.png)

## Danh sách kiểm thử ứng dụng iOS

Danh sách kiểm tra này được thiết kế đặc biệt để kiểm tra các đặc điểm của ứng dụng di động iOS. Rõ ràng, nó chỉ kiểm tra các đặc điểm ứng dụng chung chung chứ không phải chức năng của nó.

* Kiểm tra thời gian cài đặt được thực hiện bởi ứng dụng trên thiết bị. Hãy chắc chắn rằng ứng dụng được cài đặt trong một thời gian chấp nhận được.
* Sau khi ứng dụng được cài đặt, hãy kiểm tra xem ứng dụng có biểu tượng và tên ứng dụng hay không. Ngoài ra, hãy chắc chắn rằng cả biểu tượng và tên đều tự giải thích phản ánh ý định cốt lõi của ứng dụng.
* Kiểm tra thời gian chờ màn hình giật  và thời gian thực hiện để tải màn hình chính. Màn hình chính của ứng dụng sẽ tải trong khoảng thời gian chấp nhận được. Nếu màn hình chính chỉ mất nhiều thời gian hơn để tải, thì có nhiều cơ hội hơn cho người dùng thoát hoặc thậm chí gỡ cài đặt ứng dụng. Ngoài ra, hãy kiểm tra cách tải nội dung trong màn hình chính.
* Các chức năng chính của ứng dụng nên được rõ ràng ngay lập tức. Nó nên nói cho chính nó.
* Kiểm tra xem ứng dụng có hỗ trợ cả định hướng ngang và dọc hay không. Nếu vậy, hãy kiểm tra ứng dụng theo cả hai hướng. Giao diện người dùng ứng dụng nên được thiết lập phù hợp.
* Nếu không có kết nối internet, hãy khởi chạy ứng dụng. Hãy chắc chắn rằng ứng dụng đó hoạt động như thiết kế / mong muốn. Có khả năng ứng dụng có thể bị sập khi khởi chạy nó hoặc có thể chỉ hiển thị một màn hình trống.
* Nếu ứng dụng sử dụng dịch vụ định vị, thì hãy kiểm tra xem cảnh báo cho phép vị trí có được hiển thị hay không. Thông báo này chỉ được nhắc cho người dùng một lần.
* Nếu ứng dụng gửi thông báo đẩy, sau đó kiểm tra xem cảnh báo cho phép thông báo đẩy có được hiển thị hay không. Thông báo này cũng nên được nhắc nhở cho người dùng chỉ một lần.
* Khởi chạy ứng dụng, thoát khỏi nó và khởi chạy lại. Kiểm tra xem ứng dụng có hoạt động như thiết kế / mong muốn không
* Đóng ứng dụng bằng cách nhấn vào nút Home của thiết bị và mở lại ứng dụng. Kiểm tra xem ứng dụng có hoạt động như thiết kế / mong muốn không.
* Sau khi cài đặt, hãy kiểm tra xem ứng dụng có được liệt kê trong ứng dụng cài đặt của iPhone hay không.
* Sau khi ứng dụng được phát hành trực tiếp, hãy kiểm tra xem ứng dụng có thể được tìm thấy trong Cửa hàng ứng dụng hay không. "Sẽ có phiên bản HĐH được hỗ trợ cho ứng dụng. Vì vậy, hãy đảm bảo có thể tìm thấy ứng dụng trong" App Store "của thiết bị phiên bản HĐH được hỗ trợ đó. Ngoài ra, ứng dụng không được liệt kê trong "App Store" của thiết bị hệ điều hành không được hỗ trợ.
* Kiểm tra xem ứng dụng có chuyển sang chế độ ngủ khi chạy ở chế độ nền để tránh hao pin không.
* Nếu hiệu suất của ứng dụng chậm hoặc bất cứ khi nào nội dung đang tải, hãy kiểm tra xem có biểu tượng trạng thái tiến trình không ("Đang tải"), tốt nhất là với một thông báo cụ thể.
* Tìm kiếm ứng dụng với tên của nó trong thanh tìm kiếm thiết bị. Kiểm tra xem ứng dụng có được liệt kê không
* Kiểm tra xem sự xuất hiện của các nút thực hiện hành động tiêu chuẩn không bị thay đổi trong ứng dụng (ví dụ: làm mới, sắp xếp, rác, Trả lời, quay lại, v.v.)
* Kiểm tra xem các nút tiêu chuẩn không được sử dụng cho các chức năng khác sau đó chúng có thường được sử dụng cho

## Chiến lược thử nghiệm iOS

 Hình dưới đây giới thiệu một số loại chiến lược thử nghiệm iOS phổ biến.
 
![](https://images.viblo.asia/9536b4c1-1f27-4ef9-bb4d-78747b106ab1.png)

## Kiểm tra tự động
Kiểm tra tự động là lợi thế nhất của kiểm tra IOS. Nó cho phép bạn phát hiện lỗi và các vấn đề hiệu suất một cách nhanh chóng. Những lợi ích của kiểm tra tự động như dưới đây:

Kiểm tra tự động có thể chạy trên nhiều thiết bị, tiết kiệm thời gian của bạn.
Kiểm tra tự động có thể nhắm mục tiêu SDK. Bạn có thể chạy thử nghiệm trên các phiên bản SDK khác nhau.
Kiểm thử tự động tăng năng suất kiểm thử của bạn, tiết kiệm chi phí phát triển phần mềm.
Có nhiều khung Kiểm tra mã nguồn mở hỗ trợ kiểm tra tự động trên IOS.

## Kiểm tra đơn giản và tối ưu OCUnit.

Khi SDK iOS. ban đầu được phát hành, nó thiếu khả năng Kiểm tra đơn vị. Vì vậy, Apple đã mang lại giải pháp kiểm tra đơn vị OCUnit trong iOS SDK phiên bản 2.2.

OCUnit là một khung thử nghiệm cho C- Objective trong Mac OS. Ưu điểm lớn nhất của khung OCUnit là tích hợp chặt chẽ vào môi trường phát triển XCode như dưới đây.

![](https://images.viblo.asia/a99ac8b5-770f-4882-bced-96a0ba3b12b6.png)

Một số lợi ích của OCUnit được hiển thị trong hình dưới đây.

![](https://images.viblo.asia/66967b25-192b-420f-8e7f-0d6f836a8e20.png)

Bắt đầu với thử nghiệm iOS

# Kiểm tra giao diện người dùng với UIAutomation

UI Tự động là một thư viện JavaScript được cung cấp bởi Apple Inc, có thể được sử dụng để thực hiện kiểm tra tự động trên các thiết bị thực và trên Trình mô phỏng iOS. Khung này được thêm vào iOS SDK4.0. Sử dụng UI Tự động hóa, bạn có thể tự động kiểm tra ứng dụng không chỉ trên trình giả lập mà còn cả thiết bị thực.

UIAutomation mang đến cho bạn những lợi ích sau:

1. Giảm nỗ lực kiểm thử bằng tay.
2. Sử dụng ít bộ nhớ của bạn để thực hiện tất cả các case test.
3. Đơn giản hóa quy trình kiểm tra giao diện người dùng của bạn (chỉ cần nhấn một hoặc ba nút và chạy đầy đủ bộ test của bạn)
 Công cụ UIAutomation hoạt động từ các tập lệnh, được viết bằng JavaScript. Nó mô phỏng các sự kiện của người dùng trên ứng dụng iOS mục tiêu.
 
| Column 1 | Column 2 | 
| -------- | -------- |
| Pros     | Cons    |
| Cần chuẩn bị ít hơn, phát hiện sớm các lỗi nghiêm trọng.     | Yêu cầu kỹ năng cao của người thử  |
| Không cần Test Plan tăng tốc phát hiện lỗi.   | Kiểm tra phạm vi bảo hiểm thấp. Nó không đảm bảo rằng tất cả các yêu cầu của bạn được kiểm tra.   |
| Hầu hết các lỗi được phát hiện sớm bởi một số loại thử nghiệm thăm dò.   | Thiếu tài liệu kiểm tra    |

![](https://images.viblo.asia/cd9b5193-e30f-49cd-a905-ec05640f0306.png)

## Kiểm tra người dùng

Kiểm tra người dùng là một loại Kiểm tra thủ công trên iOS. Mục đích của thử nghiệm này là tạo ra các ứng dụng tốt hơn, không chỉ các ứng dụng không có lỗi. Hình dưới đây cho thấy bốn loại Kiểm tra người dùng

![](https://images.viblo.asia/5cd977a7-14d7-4eb7-a932-5c24b976bf78.png)

Bắt đầu với thử nghiệm iOS.

## Kiểm tra khái niệm

Đánh giá phản ứng của người dùng đối với một ý tưởng ứng dụng trước khi phát hành ra thị trường. Quy trình thử nghiệm khái niệm trên iOS. được mô tả như dưới đây

![](https://images.viblo.asia/77a285c3-a85c-4bd0-8ea4-a0b162d2c934.png)

## Kiểm tra khả năng sử dụng

Kiểm tra khả năng sử dụng là một thử nghiệm dễ sử dụng ứng dụng iOS của bạn. Trong thử nghiệm iOS., kiểm tra khả năng sử dụng có thể được ghi lại để ghi nhớ hoặc chia sẻ với người khác.

Có một số công cụ hỗ trợ kiểm tra khả năng sử dụng trên iOS.

Magitest, một thử nghiệm khả năng sử dụng iOS. đơn giản cho các trang web và ứng dụng.

Delight.io, công cụ này có thể nắm bắt tương tác người dùng thực trên ứng dụng iOS. của bạn.

## Kiểm thử beta

Thử nghiệm Beta là thử nghiệm tích hợp với dữ liệu thực để nhận phản hồi cuối cùng từ người dùng. Để phân phối ứng dụng của bạn để thử nghiệm beta, bạn phải làm theo các bước dưới đây.

![](https://images.viblo.asia/be79c5ca-4705-4636-a76b-e0f0458e2d59.png)

Bắt đầu với thử nghiệm iOS.

> Pre-condition: Nếu bạn đang thử nghiệm bản beta một ứng cử viên cuối cùng để phát hành, hãy chắc chắn xác thực ứng dụng trước khi phân phối nó cho người kiểm tra.

> Tìm thử qua dịch vụ: bạn thu thập ID thiết bị từ người kiểm tra và thêm chúng vào Trung tâm thành viên

> Tạo phân phối đặc biệt: Phân phối Ad Hoc cho phép người kiểm tra chạy ứng dụng của bạn trên thiết bị của họ mà không cần Xcode. Bước này bao gồm 2 bước phụ

* Tạo chứng chỉ phân phối
* Tạo hồ sơ cung cấp đặc biệt
Phản hồi -Solicit từ người kiểm tra: Người kiểm tra tiến hành kiểm tra và gửi báo cáo lỗi cho bạn. Sau khi ứng dụng của bạn được phát hành, bạn có thể nhận được các báo cáo từ iTunes kết nối.

### Kiểm thử A / B

Thử nghiệm A / B là một trong những cách mạnh mẽ nhất để đánh giá hiệu quả của ứng dụng iOS. của bạn. Nó sử dụng các thí nghiệm ngẫu nhiên với hai thiết bị A và B.

![](https://images.viblo.asia/aacb70fa-d00e-41fd-a15a-a09a008c76f1.png)

Bắt đầu với kiểm thử iOS.

Kiểm thử A / B bao gồm ba bước chính

Định cấu hình kiểm tra: Đã chuẩn bị 2 phiên bản cho ứng dụng iOS (A & B) của bạn và số liệu kiểm tra
Kiểm tra: Kiểm tra đồng thời 2 phiên bản ứng dụng iOS trên thiết bị.
Phân tích: Đo lường và chọn phiên bản tốt hơn để phát hành
Các công cụ sau hỗ trợ thử nghiệm A / B trên iOS.

Phát sinh: kiểm thử A / B cho cả iOS và Android. Nó có thể được tích hợp vào ứng dụng iOS của bạn và làm cho quá trình kiểm thử nhanh hơn.
Thực hành tốt nhất để kiểm thử A / B

Xác định mục tiêu kiểm tra của bạn. Bất kỳ thử nghiệm là vô ích mà không có mục tiêu.
Xem người dùng cuối sử dụng ứng dụng của bạn lần đầu tiên
Chạy một thử nghiệm chỉ trên mỗi bản cập nhật. Nó tiết kiệm thời gian của bạn khi tiến hành kiểm tra
Theo dõi kiểm tra của bạn một cách cẩn thận. Bạn có thể học hỏi kinh nghiệm từ bài kiểm tra của mình bằng cách theo dõi nó.

## Kiểm thử  iOS Thực tiễn tốt nhất

Dưới đây là một số mẹo bạn nên biết khi tổ chức thử nghiệm ứng dụng iOS của mình

1. Kiểm tra ứng dụng trên thiết bị thực để hiểu thực tế về hiệu suất.
2. Cải thiện phương pháp thử nghiệm của bạn, bởi vì phương pháp thử nghiệm truyền thống không còn đủ để bao quát tất cả các thử nghiệm trên thử nghiệm iOS.
3. Sử dụng bảng điều khiển để kiểm tra ứng dụng iOS. Đây là một tính năng của iOS bao gồm thông tin từ mọi ứng dụng trên thiết bị.
4. Lỗi ứng dụng tài liệu bằng cách sử dụng lệnh ngắn màn hình tích hợp. Nó giúp nhà phát triển hiểu làm thế nào các lỗi xảy ra.
5. Báo cáo sự cố là công cụ hữu ích khi kiểm tra ứng dụng của bạn. Họ có thể phát hiện sự cố và đăng nhập chi tiết để bạn có thể điều tra các lỗi dễ dàng.

## MYTHS về thử nghiệm iOS.

Phần này xem xét một số huyền thoại và thực tế phổ biến về thử nghiệm iOS. 

Ứng dụng thử nghiệm trên iOS và Android là như nhau.

IOS  và Android là hai nền tảng được phát triển bởi Apple Inc và Google. Họ hoàn toàn khác nhau. Môi trường kiểm tra vv, khung kiểm tra, ngôn ngữ lập trình.

Ứng dụng thử nghiệm trên iOS Simulator là đủ.

IOS Simulator không đủ mạnh để thử nghiệm một ứng dụng. Vì iOS Simulator có một số hạn chế:

Giới hạn phần cứng (Camera, đầu vào micrô, cảm biến).
Giao diện người dùng của ứng dụng của bạn có thể chạy nhanh hơn và mượt mà hơn trên thiết bị.
Hạn chế API
Một số khung không được hỗ trợ (Media Player, Store Kit, Message UI ..)
Mọi người sẽ tải xuống ứng dụng của tôi trên cửa hàng ứng dụng vì nó có nhiều tính năng.

Ứng dụng của bạn càng có nhiều tính năng, bạn càng có nhiều lỗi. Không có người dùng sẽ tải xuống ứng dụng của bạn nếu nó vẫn còn nhiều khiếm khuyết.

Nguồn :https://www.guru99.com/getting-started-with-ios-testing.html