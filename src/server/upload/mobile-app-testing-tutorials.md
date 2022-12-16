# Giới thiệu về kiểm thử ứng dụng trên Mobile

Từ những ngày mà điện thoại từng là thứ thiết bị trong góc nhà và phải đổ chuông để thu hút sự chú ý của mọi người hoặc máy tính là một cỗ máy chỉ có một vài người sử dụng thì bây giờ chúng đã là một phần mở rộng của con người hầu hết trên thế giới và chúng đang hỗ trợ chúng ta làm được rất nhiều việc như con người yêu cầu. Máy tính làm thay đổi hoàn toàn cách suy nghĩ, cách cư xử, cách học hỏi cũng như cách tồn tại của con người chúng ta.
![](https://images.viblo.asia/ef06bb80-4208-4ee4-abc0-1057c7d7f98b.jpg)

Ngày nay, các giải pháp di động đã chiếm lĩnh thị trường. Mọi người không muốn chuyển sang máy tính xách tay / PC của họ, mà thay vào đó họ muốn thiết bị cầm tay của họ thực hiện mọi thứ nhanh chóng. Công nghệ di động và thiết bị di động thông minh đang là xu hướng sẽ làm thay đổi tương lai của thế giới.

Do đó các giải pháp di động mà chúng tôi cung cấp cho khách hàng của chúng tôi nên được kiểm tra thật cẩn thận trước khi đưa ra sử dụng. Hướng dẫn này dành cho những người đã từng sử dụng hoặc thử nghiệm thiết bị di động hoặc những người đã chuyển sang thử nghiệm này. Vậy hãy cùng tìm hiểu hướng dẫn này.

## Các loại kiểm thử trên thiết bị di động

Có rất nhiều loại kiểm thử trên thiết bị di động:

### 1. Kiểm thử phần cứng

Thiết bị bao gồm bộ vi xử lý nội bộ, phần cứng bên trong, kích thước màn hình, độ phân giải, không gian hoặc bộ nhớ, camera, radio, Bluetooth, WIFI, ..vv 
Được gọi đơn giản là "Thử nghiệm trên thiết bị di động" .

### 2. Kiểm thử phần mềm hoặc ứng dụng

Các ứng dụng hoạt động trên thiết bị di động và chức năng của chúng nên được kiểm tra, nó được gọi là "Thử nghiệm ứng dụng di động". Phân biệt các loại ứng dụng di động:

**a) Native apps**: Ứng dụng gốc được tạo để sử dụng trên nền tảng của thiết bị di động và máy tính bảng.

**b) Mobile web apps** Ứng dụng web di động là ứng dụng phía máy chủ để truy cập trang web trên thiết bị di động bằng các trình duyệt khác nhau như Chrome, Firefox bằng cách kết nối với mạng di động hoặc mạng không dây như WIFI.

**c) Hybrid apps** Các ứng dụng này là sự kết hợp giữa ứng dụng gốc và ứng dụng web. Chúng chạy trên thiết bị hoặc ngoại tuyến và được viết bằng các công nghệ web như HTML5 và CSS.

**Có một vài sự khác biệt cơ bản để thiết lập chúng:**

* Ứng dụng gốc có nền tảng duy nhất trong khi ứng dụng web di động có mối quan hệ đa nền tảng.
* Ứng dụng gốc được viết trên các nền tảng như SDK trong khi ứng dụng web di động được viết bằng các công nghệ web như HTML, CSS, asp.net, Java, PHP.
* Đối với ứng dụng gốc, cần cài đặt nhưng đối với ứng dụng web di động, không cần cài đặt.
* Ứng dụng gốc có thể được cập nhật từ cửa hàng trò chơi hoặc cửa hàng ứng dụng trong khi ứng dụng web dành cho thiết bị di động là các bản cập nhật tập trung.
* Nhiều ứng dụng gốc không yêu cầu kết nối Internet nhưng đối với ứng dụng web dành cho thiết bị di động thì đó là điều bắt buộc.
* Ứng dụng gốc hoạt động nhanh hơn khi so sánh với ứng dụng web di động.
* Ứng dụng gốc được cài đặt từ các cửa hàng ứng dụng như cửa hàng Google Play hoặc cửa hàng ứng dụng, nơi trang web trên điện thoại di động là các trang web và chỉ có thể truy cập được qua Internet.


**Tầm quan trọng của kiểm thử ứng dụng di động**

Kiểm thử ứng dụng trên thiết bị di động khó khăn hơn kiểm thử các ứng dụng web trên máy tính để bàn do:

* Phạm vi khác nhau của thiết bị di động với kích thước màn hình khác nhau và cấu hình phần cứng như một bàn phím cứng, bàn phím ảo (màn hình cảm ứng) và trackball vv.
* Nhiều loại thiết bị di động như HTC, Samsung, Apple và Nokia.
* Các hệ điều hành di động khác nhau như Android, Symbian, Windows, Blackberry và iOS.
* Các phiên bản khác nhau của hệ điều hành như iOS 5.x, iOS 6.x, BB5.x, BB6.x, v.v.
* Các nhà khai thác mạng di động khác nhau như GSM và CDMA.
* Cập nhật thường xuyên - (như Android-4.2, 4.3, 4.4, iOS-5.x, 6.x) - với mỗi lần cập nhật, chu kỳ kiểm tra mới được khuyến nghị để đảm bảo không có chức năng ứng dụng nào bị ảnh hưởng.

Dù với bất kỳ ứng dụng nào, thì kiểm thử ứng dụng di động vẫn là rất quan trọng, vì khách hàng truy cập thường xuyên sẽ luôn là hàng triệu người dùng cho một sản phẩm nhất định - và một sản phẩm có lỗi không bao giờ được đánh giá cao. Nó thường dẫn đến tổn thất tiền tệ, vấn đề pháp lý và thiệt hại hình ảnh thương hiệu không thể khắc phục.


**Sự khác biệt cơ bản giữa kiểm thử ứng dụng trên thiết bị di động và máy tính để bàn:**

Vài khác biệt rõ ràng về kiểm thử ứng dụng dành cho thiết bị di động từ máy tính để bàn:

* Trên máy tính để bàn, ứng dụng được kiểm tra trên một đơn vị xử lý trung tâm. Trên thiết bị di động, ứng dụng được kiểm tra trên các thiết bị cầm tay như Samsung, Nokia, Apple và HTC.
* Kích thước màn hình thiết bị di động nhỏ hơn máy tính để bàn.
* Thiết bị di động có ít bộ nhớ hơn máy tính để bàn.
* Điện thoại di động sử dụng kết nối mạng như 2G, 3G, 4G hoặc WIFI nơi máy tính để bàn sử dụng kết nối băng thông rộng hoặc quay số.
* Tool tự động được sử dụng cho kiểm thử ứng dụng trên máy tính có thể không hoạt động trên một số ứng dụng của thiết bị di động .

**Các loại kiểm thử ứng dụng dành cho thiết bị di động:**

Để giải quyết tất cả các khía cạnh kỹ thuật nói trên, các loại kiểm thử sau đây được thực hiện trên ứng dụng dành cho thiết bị di động.

* Kiểm tra tính khả dụng - Để đảm bảo rằng ứng dụng dành cho thiết bị di động dễ sử dụng và mang lại trải nghiệm người dùng thỏa đáng cho khách hàng
* Kiểm tra khả năng tương thích - Kiểm tra ứng dụng trong các thiết bị di động khác nhau, trình duyệt, kích thước màn hình và các phiên bản hệ điều hành theo yêu cầu.
* Kiểm tra giao diện - Kiểm tra các tùy chọn trình đơn, nút, dấu trang, lịch sử, cài đặt và luồng điều hướng của ứng dụng.
* Kiểm tra dịch vụ - Kiểm tra các dịch vụ của ứng dụng trực tuyến và ngoại tuyến.
* Kiểm tra tài nguyên cấp thấp: Kiểm tra việc sử dụng bộ nhớ, tự động xóa các tệp tạm thời, các vấn đề phát triển cơ sở dữ liệu cục bộ được gọi là kiểm tra tài nguyên cấp thấp.
* Kiểm tra hiệu suất - Kiểm tra hiệu suất của ứng dụng bằng cách thay đổi kết nối từ 2G, 3G sang WIFI, chia sẻ tài liệu, mức tiêu thụ pin, v.v.
* Kiểm tra hoạt động - Thử nghiệm các bản sao lưu và kế hoạch khôi phục nếu pin bị hỏng hoặc mất dữ liệu trong khi nâng cấp ứng dụng từ một cửa hàng.
* Kiểm tra cài đặt - Xác thực ứng dụng bằng cách cài đặt / gỡ cài đặt ứng dụng trên thiết bị.
* Kiểm tra bảo mật - Thử nghiệm một ứng dụng để xác thực nếu hệ thống thông tin bảo vệ dữ liệu hay không.

## Chiến lược thử nghiệm ứng dụng di động

Chiến lược Kiểm tra phải đảm bảo rằng tất cả các nguyên tắc về chất lượng và hiệu suất đều được đáp ứng. Một vài gợi ý trong lĩnh vực này:

### 1) Lựa chọn các thiết bị 
Phân tích thị trường và chọn các thiết bị được sử dụng rộng rãi. Khách hàng hoặc người xây dựng ứng dụng xem xét yếu tố phổ biến của một số thiết bị nhất định cũng như nhu cầu tiếp thị cho ứng dụng để quyết định thiết bị nào cần sử dụng để thử nghiệm.


### 2) Trình giả lập 
Việc sử dụng chúng cực kỳ hữu ích trong các giai đoạn phát triển ban đầu, vì chúng cho phép kiểm tra nhanh chóng và hiệu quả ứng dụng. Trình giả lập là một hệ thống chạy phần mềm từ môi trường này sang môi trường khác mà không thay đổi phần mềm. Nó sao chép các tính năng và hoạt động trên hệ thống thực.

**Về trình mô phỏng di động**

Trình mô phỏng thiết bị do nhà sản xuất thiết bị cung cấp và trình giả lập trình duyệt - mô phỏng môi trường của trình duyệt di động đang được sử dụng giả lập/mô phỏng kiểm tra các thiết bị cầm tay như iPhone, Blackberry, HTC, Samsung, Hệ điều hành Emulator - Apple cung cấp bộ giả lập cho iPhone, Microsoft cho điện thoại Windows và điện thoại Google Android v.v.


**Tham khảo danh sách một vài trình mô phỏng thiết bị di động miễn phí và dễ sử dụng**

1. Emulator: Sử dụng để kiểm thử trải nghiệm thiết bị di động giống như iPhone, Blackberry, HTC, Samsung etc.

![](https://images.viblo.asia/f6ffa7e4-83e8-44f7-a5cc-528b268337cf.jpg)

2. MobiReady : Với ứng dụng này, chúng ta không những kiểm thử được ứng dụng web mà còn kiểm tra được code

![](https://images.viblo.asia/3b8e3863-2af0-4133-95b4-542b20d38c28.jpg)

3. Responsivepx: Kiểm thử phản hồi của web pages, hiển thị và chức năng của websites

![](https://images.viblo.asia/28391afc-dd68-4095-8009-14072e160329.jpg)

4. Screenfly: Là một công cụ tuỳ chỉnh và sử dụng để kiểm thử websites trên nhiều tiêu mục khác nhau

![](https://images.viblo.asia/8c344760-8bf1-47a3-8ff3-ba9ec1a4e6e0.jpg)

### 3) Kiểm thử trên các thiết bị vật lý
Sau khi hoàn thành kiểm thử phát triển phần mềm thỏa đáng cho ứng dụng dành cho thiết bị di động, bạn có thể chuyển đến kiểm thử trên các thiết bị vật lý để thực hiện nhiều thử nghiệm dựa trên thực tế hơn.

### 4) Kiểm thử di động trên điện toán đám mây
Điện toán đám mây về cơ bản đang chạy các thiết bị trên nhiều hệ thống hoặc mạng qua Internet nơi các ứng dụng có thể được kiểm tra, cập nhật và quản lý. 
Đối với mục đích thử nghiệm, thì nó đang tạo ra môi trường di động dựa trên web, trên trình mô phỏng để truy cập ứng dụng dành cho thiết bị di động.

![](https://images.viblo.asia/b0e1d8b4-ed27-4f16-aada-a49e72e11940.jpg)

**Ưu điểm:**

* Sao lưu và phục hồi - Điện toán đám mây tự động sao lưu dữ liệu của bạn vị trí từ xa giúp phục hồi dữ liệu dễ dàng. Và ngoài ra, dung lượng lưu trữ không giới hạn.
* Điện toán đám mây có thể được truy cập từ các thiết bị khác nhau và bất cứ nơi nào.
* Điện toán đám mây tiết kiệm chi phí, dễ sử dụng, dễ duy trì và cập nhật.
* Tốc độ nhanh hơn, triển khai ứng dụng cũng dễ dàng và nhanh chóng.
* Giao diện dựa trên nền tảng web.
* Có thể chạy cùng một tập lệnh giống nhau trên các thiết bị song song.

**Nhược điểm**

* Khó kiểm soát hơn - Vì ứng dụng chạy trên môi trường điều khiển từ xa hoặc từ bên thứ ba, nên người dùng có quyền kiểm soát và truy cập rất hạn chế các chức năng.
* Sự cố kết nối Internet - thiết lập trên Internet nên các vấn đề về mạng sẽ ảnh hưởng đến tính khả dụng và chức năng của ứng dụng
* Các vấn đề về bảo mật và quyền riêng tư: Điện toán đám mây là một kho dữ liệu trên Internet-tính bảo mật không cao, vì vậy khả năng tấn công dữ liệu nhiều hơn.

### 5) Kiểm thử tự động với kiểm thử thủ công

* Nếu ứng dụng có chức năng mới, hãy kiểm tra nó theo cách thủ công.
* Nếu ứng dụng yêu cầu thử nghiệm một lần hoặc hai lần, hãy thực hiện thủ công.
* Kiểm thử tự động các tập lệnh cho các trường hợp kiểm tra hồi quy. Nếu kiểm tra hồi quy được sử dụng lặp đi lặp lại, thì kiểm thử tự động là phương pháp hoàn hảo trong lúc này.
* Hãy kiểm thử tự động cho các tập lệnh có kịch bản phức tạp tốn thời gian .

**Có hai loại Kiểm thử tự động có sẵn để kiểm thử cho ứng dụng di động:**

Object-based mobile testing tools - Kiểm thử tự động bằng cách đối chiếu các phần tử trên màn hình thiết bị vào các đối tượng. Cách tiếp cận này độc lập với kích thước màn hình và chủ yếu được sử dụng cho các thiết bị Android.

Ví dụ: - Ranorex, giải pháp jamo

Image-based mobile testing tools - tạo tập lệnh tự động kiểm thử dựa trên tọa độ màn hình của các phần tử.

Ví dụ: - Sikuli, Egg Plant, RoutineBot


### 6) Cấu hình mạng
Cũng là một phần cần thiết của thử nghiệm di động. Việc này là để xác thực kiểm thử ứng dụng trên các mạng khác nhau như 2G, 3G, 4G hoặc WIFI.

***Tham khảo nguồn: https://www.softwaretestinghelp.com/beginners-guide-to-mobile-application-testing/***