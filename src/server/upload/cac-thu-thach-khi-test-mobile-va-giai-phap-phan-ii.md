### Power Consumption/Battery Life: Tiêu thụ năng lượng và vòng đời pin 
Mặc dù xu hướng ngành công nghiệp hiện đại là tuổi thọ pin đang được tăng lên trong vài năm qua, tuy nhiên tốc độ phát triển (bước nhảy) đã không đạt nhiều kỳ tích như hầu hết mọi người mong đợi hoặc hy vọng. Trong khi sự tăng trưởng về tuổi thọ pin tăng với tốc độ khá chậm, thì xu hướng tiêu thụ năng lượng từ các ứng dụng đang thúc đẩy việc phải nhanh chóng phát triển pin hơn nữa. Khi các ứng dụng có xu hướng hướng tới các nhu cầu đòi hỏi khắt khe hơn - chẳng hạn như video chất lượng cao hơn hoặc tính toán nhanh hơn nữa - phần cứng di động buộc phải phát triển, nâng cấp để theo kịp và năng lượng pin cũng sẽ bị cạn kiệt nhanh hơn nhiều (bởi phải xử lý nhanh và nhiều hơn trước đây).
Rõ ràng, điều này có nghĩa là các quy trình kiểm thử cần cover được mức tiêu thụ điện bất cứ khi nào có thể, đặc biệt đối với các task đòi hỏi xử lý nhanh và nhiều mà ứng dụng có thể có khả năng xử lý được. 
![](https://images.viblo.asia/f1d52685-a73b-44d9-9125-0ac3bde330e7.jpg)

### Connection Types: Dạng thức kết nối 
Kiểm thử tất cả các loại kết nối khác nhau có sẵn cho các thiết bị di động hiện đại có thể là một thách thức khác đối với nhóm QA. Các loại kết nối data di động thường rơi vào ba loại phổ biến là 2G, 3G và 4G, mỗi loại thế hệ kết nối 2G, 3G và 4G được phát triển để tăng tốc độ và công nghệ truyền dẫn tốt hơn. Mặc dù 90% dân số thế giới dự kiến sẽ có quyền truy cập ít nhất là thế hệ 2G vào khoảng năm 2017, nhưng tốc độ và chất lượng kết nối khác nhau giữa các thế hệ này khiến việc kiểm thử trở thành một thách thức. Ngay cả kết nối WiFi cũng có thể từ mức tốt như là kết nối băng thông rộng đến mức tốt hơn so với kết nối dữ liệu di động.

Vì những lý do này, điều quan trọng là phải có các tài khoản test (testing accounts) cho phạm vi rộng về tốc độ và chất lượng kết nối mà ứng dụng có thể gặp phải khi chạy trên môi trường thực tế. Hơn nữa, khi kiểm thử cũng phải nhìn nhận ra và đo lường mức độ sử dụng băng thông của ứng dụng, vì nhiều nhà mạng và gói dịch vụ không cho phép sử dụng dữ liệu không giới hạn.
![](https://images.viblo.asia/c0c67126-3d60-4ac8-826e-79c95946a80c.jpg)

### Device Settings: Cài đặt thiết bị 
Hầu hết các thiết bị di động hiện đại cho phép truy cập vào hàng tá cài đặt dành riêng cho thiết bị: Mọi thứ từ phương thức kết nối mạng và chế độ máy bay (airplane mode) đến xoay màn hình (screen rotation) và định vị (GPS) đến thông báo (notification). Nếu bạn chưa bao giờ dành thời gian thử tìm hiểu, bạn chỉ cần mở màn hình cài đặt điện thoại của bạn ngay bây giờ và đếm xem có bao nhiêu cài đặt thiết bị duy nhất có sẵn - bạn có thể ngạc nhiên về số lượng đó, hầu hết trong số đó bạn có thể không bao giờ sử dụng.
Tuy nhiên, thách thức đối với người tester là bất kỳ hoặc tất cả các cài đặt thiết bị này có thể (và sẽ) được thay đổi bất cứ lúc nào khi ứng dụng cụ thể của bạn đang được sử dụng, cho dù nó được khởi chạy, đóng hoặc thao tác theo cách nào đó.
![](https://images.viblo.asia/15d20fcf-ac2d-49f1-a0d8-728b7757329d.jpg)

### Location-Dependence: Phụ thuộc địa điểm 
Một thách thức khác để phát triển ứng dụng di động là nhận biết và xử lý thông tin dựa trên vị trí mà ứng dụng của bạn có thể cần sử dụng, tùy thuộc vào vị trí của người dùng hiện tại. Trong các tính năng di động hiện đại như vậy, hệ thống GPS được sử dụng thường xuyên nhất. Tuy nhiên cũng có một loạt các ứng dụng ngày này hiện đang sử dụng thuật toán phụ thuộc vào vị trí để cung cấp thông tin theo thời gian thực về môi trường xung quanh người dùng hoặc cung cấp cảnh báo cho những người dùng khác của cùng một ứng dụng có thể ở gần đó .

Tester phải đảm bảo rằng mọi chức năng phụ thuộc vào vị trí đều được kiểm tra đúng cách, thông qua các công cụ mô phỏng các thay đổi về vị trí trên chính thiết bị hoặc bằng cách đưa thiết bị đến các vị trí khác nhau và kiểm tra kết quả.

## ***Solution***
Vì vậy, giải pháp lý tưởng cho nhu cầu kiểm thử di động (mobile testing) của bạn là gì? Các biện pháp khác nhau bạn nên đưa ra là gì? Chúng ta hãy xem một số trong số các giải pháp nhé!

### Mobile test lab: phòng thí nghiệm kiểm thử di động
Nếu nhu cầu kiểm thử di động của bạn là rất lớn và thường xuyên, một ý tưởng tốt là đầu tư vào việc tạo phòng thí nghiệm kiểm thử di động của riêng bạn.
![](https://images.viblo.asia/cf28bdbc-4b4b-478a-99ee-3913ed4b8a39.jpg)

Hoặc người ta cũng có thể tìm kiếm các giải pháp để thuê một phòng thí nghiệm thử nghiệmkiểm thử bên ngoài hoặc khám phá các giải pháp phòng thí nghiệm di động đám mây. Nhiều công ty đã bắt đầu mạo hiểm vào nó. Một số trang web của các công ty này là:
* MobileLabs : https://mobilelabsinc.com/
* Xamarin Test Cloud : https://appcenter.ms/
* SauceLabs : https://saucelabs.com/

### The Right Testing Solution: Giải pháp kiểm thử đúng đắn
Vậy thì chính xác những gì bạn đang tìm kiếm trong giải pháp kiểm thử di động là gì? Một IDE để giảm kịch bản (script), cách tiếp cận dựa trên từ khóa để ngay cả những người manual testers cũng có thể sử dụng nó một cách hiệu quả, tích hợp với đám mây di động (mobile cloud) để giúp bạn vượt qua các thách thức của thiết bị, hay một công cụ giúp bạn xác định đối tượng dựa trên thuộc tính và trên hình ảnh. Nhiều giải pháp đã được cung cắp sẵn có trên thị trường như là  - Robotium, Appium, Calabash từ mã nguồn mở v.v

Dưới đây là một bảng so sánh, được lấy từ một blog CNTT, để giúp bạn hiểu các tính năng có sẵn với các công cụ này: 
![](https://images.viblo.asia/7e99b1b3-b062-4daf-b201-2518cf21e589.jpg)

## Tổng kết:

Bài viết trên là phần mở rộng cho người mới bắt đầu, trong đó mục đích là làm nổi bật các thách thức thực tế gặp phải trong khi kiểm thử di động và đưa ra một ma trận so sánh các giải pháp này để giúp người tester đưa ra lựa chọn sáng suốt về cách tiếp cận và giải pháp cho nhu cầu kiểm thử di động của họ.

Preferences:
* https://www.softwaretestinghelp.com/5-mobile-testing-challenges-and-solutions/
* https://test.io/blog/top-10-mobile-testing-challenges/
* https://saucelabs.com/blog/what-are-mobile-app-testing-challenges