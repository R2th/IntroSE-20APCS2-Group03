Định vị địa lý là một tính năng quan trọng nếu bạn đang phát triển web truyền thông xã hội hoặc ứng dụng di động. Theo một báo cáo năm 2016 của Trung tâm Nghiên cứu Pew, 90% người dùng điện thoại thông minh ở Hoa Kỳ luôn bật tính năng định vị địa lý.

Để thực hiện thử nghiệm, bạn cần một trình mô phỏng vị trí. Xcode là một trình mô phỏng phổ biến, được sử dụng để kiểm tra các ứng dụng iOS. Bạn cũng có thể sử dụng các định dạng tệp Vị trí được gọi là GPX và KML.

GPX hoặc Định dạng Trao đổi GPS là tài liệu có sẵn ở định dạng dữ liệu XML được sử dụng để trao đổi thông tin vị trí của dữ liệu GPS giữa ứng dụng di động của bạn và dịch vụ web. Điều cần thiết là phương pháp, công cụ chính xác và nhóm phù hợp.

## 1. Cách test ứng dụng dựa trên vị trí bằng cách sử dụng vị trí giả

Có 2 cách test:
Cách test 1 là đi trên con đường, vị trí thật để kiểm tra
Hai là mô phỏng rằng người dùng đang di chuyển trên tuyến đường đó, vị trí đó trong khi đang ở một nơi khác
Chúng ta là một kiểm thử nếu theo cách 1 sẽ rất bị hạn chế về thời gian và công sức. Vì vậy sẽ phải thực hiện bằng cách mô phỏng các tình huống khách nhau khi đang ngồi tại nơi làm việc.

Để thực hiện thử nghiệm, bạn cần một trình mô phỏng vị trí. Xcode là một trình mô phỏng phổ biến, được sử dụng để kiểm tra các ứng dụng iOS. Bạn cũng có thể sử dụng các định dạng tệp Vị trí được gọi là GPX và KML.

GPX - Định dạng Trao đổi GPS là tài liệu có sẵn ở định dạng dữ liệu XML được sử dụng để trao đổi thông tin vị trí của dữ liệu GPS giữa ứng dụng di động của bạn và dịch vụ web.

Mặt khác, KML là định dạng hiển thị dữ liệu địa lý trên Google Earth và các ứng dụng khác. Nó có cấu trúc dựa trên thẻ sử dụng các thuộc tính và phần tử lồng nhau, rất giống với tiêu chuẩn XML.

Để tạo GPX hoặc KML, bạn có thể sử dụng nhiều trình tạo có sẵn trực tuyến. Một số trong số này bao gồm Tuyến đường, Google Earth to ADT plugin, RunKeeper, Google Earth và KML Generator.

## 2. Tạo tệp GPX bằng RunKeeper
Sử dụng RunKeeper khá đơn giản nhưng đòi hỏi một chút thao tác thực tế. 

**Bước 1** Tải xuống ứng dụng RunKeeper trên điện thoại di động của bạn.

![](https://images.viblo.asia/82d7a926-2685-4fee-8783-db3701cfa023.png)

**Bước 2** Kết thúc thủ tục đăng ký và bạn bắt đầu ghi lại GPS 

**Bước 3** Khi bạn đến vị trí cần ghi, hãy nhấp vào Bắt đầu hoạt động và bắt đầu đi bộ xung quanh.

![](https://images.viblo.asia/ca60a6cc-1bdc-4333-83d0-473c8158a6f2.png)

**Bước 4** Tiếp tục đi bộ cho đến khi bạn cảm thấy mình có đủ dữ liệu. Nhấn STOP và nhấp vào Yes I’m Done. Lưu tệp và quay lại nơi làm việc của bạn.

![](https://images.viblo.asia/a1d571ad-83b0-4be4-8116-205f2792b31d.png)


**Bước 5**  Mở trang web RunKeeper và đăng nhập bằng tên người dùng và mật khẩu của bạn.

![](https://images.viblo.asia/5ce4f55d-9784-4a17-817b-3cb3ae062e65.png)

**Bước 6** Nhấp vào Hoạt động và tìm tùy chọn Xuất GPX. Tải xuống tệp và lưu trên máy tính của bạn.

## 3. Thử nghiệm ứng dụng Android
Trước khi bạn bắt đầu, hãy tạo một tuyến GPX hoặc KML như được đề cập ở trên.

**Bước 1**. Mở Eclipse và nhấp vào Tạo dự án. Tạo một ứng dụng Cập nhật vị trí cho nhà cung cấp vị trí được chỉ định.

**Bước 2** Nhấp vào Tạo giả lập. Đi tới thư mục ứng dụng của bạn trong trình khám phá dự án. Nhấp chuột phải vào nó và chạy như. Chọn tùy chọn Ứng dụng Android.

![](https://images.viblo.asia/78f859ec-b928-40c8-a8eb-7cbe9db782a5.png)

**Bước 3** Mở Google Map. Đi tới DDMS và chọn Emulator Control.

**Bước 4** Đi tới Emulator Control, nhấp vào GPX và mở tải tệp GPX của bạn.

**Bước 5** Sau khi tải lên, chọn tệp. Bây giờ bạn có thể bắt đầu chọn các địa điểm giả. Quá trình này giống nhau đối với các tệp KML.

## 4. Thử nghiệm ứng dụng iOS
Để kiểm tra ứng dụng iOS, bạn sẽ cần định dạng tệp GPX hơi khác. Sử dụng RunKeeper để chuyển đổi tuyến đường tương thích với Android ở trên thành tuyến đường tương thích với iOS. Ngoài ra, bạn sẽ cần trình mô phỏng xCode cho quá trình này.

**Bước 1** Mở dự án xCode. Nhấp vào Product> Debug> Simulate location> Add GPX vào Dự án của bạn.

**Bước 2** Nhấp vào biểu tượng Vị trí và sau đó chọn tệp GPX của bạn. Điểm trên bản đồ sẽ bắt đầu di chuyển và bạn có thể bắt đầu thử nghiệm.

## 5. Thử nghiệm các ứng dụng web dựa trên vị trí bằng cách sử dụng một vị trí giả
Với các trang web và ứng dụng web, việc kiểm tra vị trí địa lý rất dễ dàng. Tất cả những gì bạn phải làm là cài đặt VPN hoặc Mạng riêng ảo, đây là phần mềm ẩn vị trí hiện tại của bạn.

Bạn có thể gửi dữ liệu mà không ai khác có thể theo dõi nó. Khi bạn kích hoạt nó, bạn chỉ cần thay đổi vị trí hiện tại của mình thành bất kỳ vị trí nào bạn muốn và bắt đầu thử nghiệm.

## 6. Các mẹo cần nhớ khi thử nghiệm các ứng dụng dựa trên vị trí
Thử nghiệm dựa trên vị trí là một thử thách, có nghĩa là bạn cần phải chú ý hơn trong khi thực hiện. Dưới đây là một số mẹo sẽ giúp bạn:

1. Đề cập đến vị trí chính xác
Chọn một địa điểm cách điểm kiểm tra của bạn dưới 100 mét có thể tạo ra sự khác biệt lớn trong kết quả. Nếu bạn không chắc mình đã chỉ đúng địa điểm, hãy nhập vĩ độ và kinh độ của vị trí đó. Bạn có thể tìm thấy nó dễ dàng trên internet.

2. Chế độ bay thử nghiệm
Người kiểm tra thường quên kiểm tra cách ứng dụng hoạt động khi điện thoại ở chế độ máy bay. Nó mang lại kết quả thú vị, vì vậy hãy đảm bảo rằng bạn thực hiện nó.

3. Thử nghiệm các điều kiện khác nhau
Sử dụng nhiều địa điểm thử để test, hiệu suất ứng dụng trong chuyển động, trong khi gọi điện thoại và trong khi mất tín hiệu. Hãy sáng tạo và nghĩ ra các điều kiện khác.

4. Kiểm tra chế độ tiết kiệm điện
Khi một người kích hoạt chế độ tiết kiệm năng lượng của điện thoại, chế độ này sẽ ảnh hưởng đến GPS. Kiểm tra xem điều này ảnh hưởng như thế nào đến hiệu suất ứng dụng của bạn. Ngoài ra, nếu ứng dụng của bạn cung cấp chế độ tiết kiệm năng lượng, hãy kiểm tra hiệu suất của tính năng khi bạn kích hoạt nó.

5. Cường độ tín hiệu
Luôn kiểm tra tính năng vị trí của ứng dụng của bạn ở các cường độ tín hiệu khác nhau. Nó sẽ có thể hỗ trợ GPS tối đa ngay cả khi tín hiệu thấp nhất . Bạn cũng có thể kiểm tra bằng cách sử dụng các nguồn internet khác nhau bao gồm Wi-Fi và dữ liệu di động 3G hoặc 4G.

Thực hiện nhiều thử nghiệm khác nhau trong khi thử nghiệm tại các địa điểm giả bao gồm khả năng sử dụng, bảo mật, chức năng và thử nghiệm tải.

Nguồn tài liệu: https://www.testbytes.net/blog/location-based-app-testing/