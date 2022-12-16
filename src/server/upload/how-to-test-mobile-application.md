Bạn muốn biết thêm về cách test ứng dụng Mobile? 
Ở đây bạn sẽ tìm thấy hướng dẫn Mobile Testing cho app của bạn. Chiến lược Mobile Testing, các giai đoạn chính của quy trình Mobile Testing, chỉ định Mobile Testing cho Android và iOS sẽ được xem xét trong bài viết này.

**ARTICLE CONTENT**
1. Mobile application specifics
2. Mobile site testing strategy key points
3. Mobile application testing stages
4. Tips to test mobile application
5. Test mobile application with EasyQA SDK

Sự phát triển bùng nổ của các thiết bị Mobile việc sử dụng và phát triển ứng dụng Mobile khiến việc Testing trở thành một yêu cầu quan trọng để cung cấp thành công và nhanh chóng các ứng dụng Mobile chất lượng cao.

# 1. Chi tiết về ứng dụng Mobile 

Rõ ràng là ứng dụng Mobile rất khác so với Desktop. Vì vậy, chúng ta nên tính đến điều này khi lập kế hoạch cho quá trình Testing.
Vì vậy, trước tiên chúng ta hãy xem xét sự khác biệt chính giữa ứng dụng Mobile và Desktop:

* Thiết bị Mobile là một hệ thống  yếu hơn PC, nên một số chức năng không chạy được trên Mobile giống như PC.
* Tesing ứng dụng Mobile được cung cấp trên thiết bị cầm tay (Apple, Samsung, Nokia, v.v.), trong khi ứng dụng Desktop được Testing trên bộ xử lý trung tâm.
* Màn hình thiết bị Mobile đa dạng, phần mở rộng và màu sắc. Kích thước màn hình điện thoại Mobile nhỏ hơn so với Desktop.
* Thực hiện và nhận cuộc gọi là nhiệm vụ chính của điện thoại, đó là lý do tại sao ứng dụng không nên can thiệp vào chức năng chính này.
* Một loạt các hệ điều hành (OS) cụ thể và cấu hình thành phần : Android, iOS, BlackBerry, Windows Mobile, ...
* Hệ điều hành điện thoại Mobile nhanh chóng trở nên lỗi thời. Ngoài ra, có một giới hạn để cập nhật hệ điều hành của các thương hiệu.
* Thiết bị Mobile sử dụng kết nối mạng (3G, 4G, Wi-Fi), Desktop sử dụng kết nối băng thông rộng hoặc Wi-Fi.
* Thiết bị Mobile liên tục tìm kiếm mạng. Đó là lý do tại sao bạn nên test ứng dụng ở các tốc độ dữ liệu khác nhau.
* Các công cụ tốt cho Testing ứng dụng trên Desktop, không hoàn toàn phù hợp để Testing ứng dụng Mobile.
* Các ứng dụng Mobile phải hỗ trợ nhiều kênh đầu vào (bàn phím, giọng nói, cử chỉ, barcode, nhận diện, ...), công nghệ đa phương tiện và các tính năng khác làm tăng khả năng ứng dụng của chúng.

Một điều quan trọng khác trong quá trình Testing ứng dụng Mobile là phân loại ứng dụng.

Ba phân loại chính của ứng dụng dành cho thiết bị Mobile được chia thành : 
* Mobile Web Apps (Ứng dụng web dành cho thiết bị Mobile)
* Native (Pure native) Apps (Ứng dụng gốc (thuần túy)) 
* Hybrid Apps (Ứng dụng lai).

![](https://images.viblo.asia/50c7bfcd-0a4a-460f-a88d-2235e764c2ae.png)

## 1.1. Mobile Web application

Trên thực tế, Mobile Web App là trang web được mở trong tiện ích (smartphone hoặc tablet) với sự trợ giúp của trình duyệt Mobile.

**Một số ưu điểm của Mobile Web App :**
* Dễ dàng phát triển
* Dễ dàng truy cập
* Cập nhật dễ dàng
* Mobile Web App không yêu cầu cài đặt

**Một số nhược điểm của Mobile Web App :**
* Không hỗ trợ khả năng offline.
* Bị hạn chế chức năng hạn chế khi so sánh với Hybrid App và Native App. (không có quyền truy cập vào hệ thống tập tin và local resources).
* Các vấn đề về phân phối/truy cập lại: Google Play và App Store không hỗ trợ phân phối lại Mobile Web App.

## 1.2. Native App

Native App là ứng dụng được phát triển riêng cho một nền tảng (Android, iOS, Tizen, Windows 10 Mobile, BlackBerry).

**Một số ưu điểm của Native App :**
* Native App hỗ trợ hoạt động offline.
* Nó có thể sử dụng tất cả các tính năng trên thiết bị của nó.
* Trải nghiệm người dùng nâng cao.
* Push notifications có thể được sử dụng để cảnh báo người dùng.

**Một số ưu điểm của Native App :**
* Phát triển Native App rất tốn kém so với các Mobile Web App.
* Đòi hỏi chi phí cao cho việc bảo trì.

## 1.3. Hybrid App

Hybrid App là sự pha trộn giữa Native App và Mobile Web App. Nó có thể được định nghĩa như điện thoại di động trình bày nội dung trang web theo định dạng ứng dụng.

**Một số ưu điểm của Hybrid App :**
* Chi phí hiệu quả hơn so với Native App.
* Dễ dàng phân phối
* Trình duyệt nhúng (Embedded browser)
* Tính năng thiết bị

**Một số ưu điểm của Hybrid App :**
* Hoạt động không quá nhanh như Native App.
* Đồ họa ít thân thuộc với OS hơn so với Native App.

# 2. Những điểm chính trong chiến lược Testing trang web Mobile

Bây giờ, chúng ta có thể nghĩ về chiến lược thử nghiệm. Hãy xem xét những điểm chính và thách thức chúng ta nên đối mặt.

![](https://images.viblo.asia/f388fe36-f2f6-4b74-832e-b50a0967d85a.png)

## 2.1. Devices selection (Lựa chọn thiết bị)

![](https://images.viblo.asia/d5b75bbd-b2b9-4e7a-ac39-66901fac933e.png)

Không còn nghi ngờ gì, thiết bị thực là quyết định tốt nhất nếu bạn muốn test ứng dụng Mobile. Testing trên một thiết bị thực luôn mang lại cho bạn kết quả chính xác cao nhất.

Trên thực tế, điều này thực sự không dễ để chọn thiết bị phù hợp nhất. Dù sao, đây là một số action nên làm trong khi chọn thiết bị để Testing Mobile:
* Thực hiện phân tích để xác định các tiện ích phổ biến nhất và được sử dụng trên thị trường.
* Chọn các thiết bị có hệ điều hành khác nhau.
* Chọn các thiết bị có độ phân giải màn hình khác nhau.
* Hãy chú ý đến các yếu tố tiếp theo: khả năng tương thích (compatibility), kích thước bộ nhớ (memory size), kết nối (connectivity), ...

**Như đã đề cập ở trên, bạn sẽ có nhiều lợi thế để Testing ứng dụng Mobile trên thiết bị thực:**
* Độ chính xác cao của kết quả Testing.
* Sao chép/mô phỏng bug đơn giản.
* Các điểm như thoát pin, định vị địa lý, push notifications, thiết bị tích hợp cảm biến dễ dàng để Testing.
* Khả năng test các ngắt đến (cuộc gọi, SMS).
* Có khả năng test ứng dụng Mobile trong môi trường và điều kiện thực tế.
* Không nhận diện sai.

**Và một vài nhược điểm:**
* Một số lượng lớn các thiết bị thường được sử dụng.
* Chi phí bổ sung cho việc bảo trì các thiết bị.
* Hạn chế truy cập vào các thiết bị thường được sử dụng ở nước ngoài.

Như bạn có thể thấy Testing trên các thiết bị thực là tốt, nhưng nó cũng có một số hạn chế. Vì vậy bạn nên khắc phục chúng để làm cho quá trình Testing ứng dụng Mobile thực sự hiệu quả.

## 2.2. Emulators or simulators (Trình giả lập hoặc Mô phỏng giả lập) ?

![](https://images.viblo.asia/1ec0e092-faa1-4397-8496-8fc91549d2cb.png)

Không có gì khó đoán, chúng là những công cụ đặc biệt sao chép / mô phỏng chức năng và hành vi của các thiết bị Mobile.

Ý nghĩa của **Emulator** và **Simulator** thường bị nhầm lẫn, mặc dù cách phát âm gần như giống nhau của chúng, nhưng chúng không có ý nghĩa tương đương.

Trong thực tế, **Trình giả lập (Emulator)** là sự thay thế thiết bị gốc. Mặc dù bạn có thể chạy phần mềm và ứng dụng trên tiện ích của mình nhưng bạn không có khả năng sửa đổi chúng.

**Mô phỏng giả lập (Simulator)** không sao chép phần cứng của thiết bị, nhưng bạn có khả năng thiết lập môi trường tương tự như OS của thiết bị gốc.

Vì vậy, tốt hơn là sử dụng Mô phỏng giả lập Mobile để Testing ứng dụng Mobile. Trình giả lập thích hợp hơn cho việc kiểm tra trang web Mobile.

Tại đây, bạn có thể tìm hiểu thêm về [Trình giả lập và Mô phỏng giả lập](https://geteasyqa.com/qa/test-website-mobile/).

**Một số ưu điểm của việc sử dụng Mô phỏng giả lập để test ứng dụng Mobile :**
* Dễ dàng thiết lập.
* Làm việc nhanh.
* Giúp xác minh và khám phá hành vi của ứng dụng di động của bạn.
* Chi phí hiệu quả.

**Một số nhược điểm của việc sử dụng Mô phỏng giả lập để test ứng dụng Mobile :**
* Phần cứng thiết bị không được đưa vào xem xét.
* Nhận diện sai có thể xảy ra.
* Dữ liệu không đầy đủ của kết quả mô phỏng, điều này gây ra một số khó khăn cho việc phân tích đầy đủ các kết quả test.

## 2.3. Cloud-based testing of the mobile application

![](https://images.viblo.asia/b0cef01c-c07b-4de8-ae1c-bf4ba94e9575.jpg)

Testing các ứng dụng Mobile với các công cụ Cloud-based dường như là lựa chọn tối ưu. Nó có thể giúp bạn khắc phục nhược điểm của các thiết bị thực và Mô phỏng giả lập.

**Những ưu điểm chính của phương pháp này:**
* Dễ dàng có sẵn.
* Khả năng chạy các thiết bị Mobile trên nhiều hệ thống và mạng.
* Có khả năng không chỉ để test mà còn cập nhật và quản lý các ứng dụng trong cloud.
* Chi phí hiệu quả.
* Khả năng mở rộng cao.
* Kịch bản tương tự có thể được chạy song song trên một số thiết bị.

**Một số điểm yếu của Cloud mobile testing:**
* Khó kiểm soát hơn.
* Không có mức độ bảo mật cao.
* Sự phụ thuộc của kết nối Internet.

Một số công cụ cloud-based hữu ích, có thể giúp bạn test ứng dụng Mobile : [Xamarin Test Cloud](https://appcenter.ms/), [ Perfecto Mobile Continuous Quality Lab](https://www.perfecto.io/products/platform/cloud-based-testing-lab). Tại đây bạn có thể tìm hiểu thêm về các công cụ mobile testing tool.

## 2.4. Mobile manual and automated testing 

![](https://images.viblo.asia/c7b5f5ee-7d46-45a9-be42-ea0fe6df03ea.jpg)

Ngày nay nhiều chuyên gia ủng hộ ý kiến rằng Manual testing (thử nghiệm thủ công) sẽ hết thời. Chắc chắn, đó không phải là sự thật. 
Tất nhiên, chúng ta không thể làm mà không có Mest automation, nhưng cũng có những tình huống Manual testing là thích hợp hơn.

**Một số ưu điểm của Manual testing ứng dụng Mobile:**
* Hiệu quả về chi phí hơn trong thời gian ngắn hạn.
* Manual testing linh hoạt hơn.
* Mô phỏng tốt hơn các hành động của người dùng.

**Một số nhược điểm của Manual testing ứng dụng Mobile:**
* Manual test cases khó để được sử dụng lại.
* Ít hiệu quả với việc thực hiện nhiệm vụ nhất định và liên tục.
* Quá trình test chậm.
* Một số loại test case không thể được thực hiện thủ công (Load testing).

**Một số ưu điểm của Automation testing ứng dụng Mobile:**
* Quá trình test khá nhanh.
* Chi phí hiệu quả trong thời gian dài.
* Automated test cases rất dễ dàng để được sử dụng lại.
* Lựa chọn duy nhất cho một số loại thử nghiệm (Perfomance testing).
* Kết quả kiểm tra rất dễ dàng được chia sẻ.

**Một số nhược điểm của Automation testing ứng dụng Mobile:**
* Công cụ Automated mobile testing có một số hạn chế.
* Quá trình tốn thời gian.
* Automated testing có ít hiệu quả hơn trong việc xác định mức độ thân thiện với người dùng hoặc trải nghiệm khách hàng tích cực.

Như bạn có thể thấy, bạn nên đưa ra các quyết định khác nhau tạo ra chiến lược cho Mobile testing. Tất nhiên, không có câu trả lời nào định nghĩa về chúng.

Sự kết hợp của các phương pháp khác nhau dường như là cách tối ưu. 
Ví dụ: bạn có thể sử dụng Mô phỏng giả lập trong giai đoạn sớm nhất của quy trình Testing của mình. 
Nhưng tốt hơn là sử dụng các thiết bị thực (physical hoặc cloud-based) trong giai đoạn cuối. 
Automated testing là thích hợp hơn cho Load testing và Regression testing (Kiểm thử hồi quy). 
Nhưng các công cụ manual mobile testing tốt hơn nên được để Usability testing (Kiểm thử tính khả dụng) và Exploratory testing (Kiếm thử thăm dò).

# 3. Mobile application testing stages (Các giai đoạn trong Mobile App Testing)
Vì vậy, hãy bắt đầu xem xét các giai đoạn chính của quy trình  Mobile App Testing. Chúng chủ yếu tương tự như các giai đoạn Web Testing. 
Hầu hết, nhưng không hoàn toàn tương tự. Như trình bày phía trên, có một số khác biệt cơ bản giữa ứng dụng Mobile và Desktop. Do đó, chúng ta cần vượt qua một số giai đoạn bổ sung và thực hiện một số xác minh bổ sung.

![](https://images.viblo.asia/0bcdb83e-5db0-45a6-ac75-5a854936b18b.png)

## 3.1. Documentation Testing

![](https://images.viblo.asia/2cf8c44b-65fb-49ac-b083-13336fa32c84.png)

Documentation Testing (Kiểm tra tài liệu) là giai đoạn chuẩn bị cần thiết của quy trình Mobile App Testing.

Trên thực tế, Testing bắt đầu trước quá trình phát triển phần mềm. Testers có được navigational chart (biểu đồ điều hướng), layout (bố cục màn hình), các yêu cầu khác không hiện hữu trên thiết kế. Những yêu cầu này được phân tích đầy đủ và không nhất quán. Mâu thuẫn trong các yêu cầu phải được giải quyết trước khi bắt đầu phát triển.

Các tài liệu được tạo và phân tích trong giai đoạn này như :  Requirements (Specification, PRD), Test Plan, Test Cases, Traceability Matrix.

## 3.2. Functional testing

![](https://images.viblo.asia/4bc31d02-a672-4017-96ea-1d0478d12979.jpg)

Functional testing (Kiểm tra chức năng) nhằm mục đích đảm bảo rằng nó hoạt động theo yêu cầu. Nói một cách đơn giản, chúng ta kiểm tra xem ứng dụng có thực hiện các chức năng dự kiến hay không, thường được mô tả trong specification hoặc tương ứng với logic của quy trình business. Hãy chú ý đến các yếu tố quan trọng tiếp theo trong khi cung cấp Functional testing cho ứng dụng Mobile của bạn:
* Phân loại ứng dụng, được xác định bởi chức năng business của nó (social networks (mạng xã hội), banking (ngân hàng), education (giáo dục), ordering and delivery of food, (đặt hàng và giao đồ ăn), tickets (vé), the game industry (ngành công nghiệp trò chơi), ...).
* Đối tượng mục tiêu (công ty, người dùng, môi trường giáo dục, ...).
* Kênh phân phối (giao hàng trực tuyến, Google Play, App Store, ...)

Bây giờ, hãy xem xét những việc cần xác minh chính, cần được thông qua để test chức năng ứng dụng Mobile.

## 3.2.1. Installing and running the application (Cài đặt và chạy ứng dụng)

* Việc cài đặt ứng dụng sẽ diễn ra mà không có lỗi nghiêm trọng, nếu thiết bị đáp ứng các yêu cầu hệ thống.
* Xác nhận ứng dụng tự động khởi động chính xác.
* Đảm bảo hướng dẫn sử dụng có sẵn.
* Đảm bảo hoạt động của ứng dụng trong quá trình khởi động / thoát đáp ứng các yêu cầu cơ bản.

## 3.2.2. Fields testing

* Xác nhận các Field bắt buộc (required ) hoạt động chính xác.
* Đảm bảo rằng các Field bắt buộc (required ) và tùy chọn (optional) được hiển thị theo các cách khác nhau.

## 3.2.3. Business functionalities testing (Testing chức năng nghiệp vụ)

* Xác nhận mức giá khai báo và nội dung tương ứng cho người dùng nhận được thông tin.
* Đảm bảo người dùng có thể thực hiện các thao tác cơ bản: mua, thêm hàng vào giỏ hàng, đặt hàng v.v.
* Đảm bảo ứng dụng hỗ trợ các giao dịch thanh toán thông qua các hệ thống thanh toán như Visa, Mastercard, Paypal, v.v.
* Kiểm tra sự phục hồi của giao dịch mua ở bất kỳ thiết bị nào, nhưng có ràng buộc tài khoản.

## 3.2.4. Interruptions testing (Kiểm tra gián đoạn)

* Cuộc gọi đến và đi, SMS và MMS.
* Hết pin / tháo gỡ pin.
* Ngắt kết nối và kết nối mạng/Wi-Fi.
* Ngắt kết nối và kết nối thẻ SD.
* Sạc thiết bị.

## 3.2.5. Constant users feedback testing (Testing phản hồi người dùng liên tục)

* Tải nội dung thông báo 
* Progress bar (Thanh tiến trình)
* Phản ứng thích hợp của các button khi nhấn.
* Thông báo lỗi truy cập mạng.
* Cố gắng xóa các tin nhắn thông tin quan trọng.
* Tính khả dụng và đồng bộ hóa âm thanh, độ rung và thông báo hình ảnh.
* Sự xuất hiện của một màn hình (tin nhắn) ở cuối quá trình (trò chơi).

## 3.2.6. Update testing

* Tất cả dữ liệu người dùng được lưu sau khi cập nhật.
* Đảm bảo tiến trình cập nhật được hiển thị đúng.
* Đảm bảo cập nhật được hỗ trợ bởi các hệ điều hành cũ.
* Thử nghiệm với nhiều cách cài đặt bản cập nhật (Wi-Fi, Bluetooth, USB)

## 3.2.7. Device resources testing

* Thiếu không gian để cài đặt hoặc chạy ứng dụng.
* Rò rỉ bộ nhớ. Hãy chú ý đến các cửa sổ, với rất nhiều thông tin và các tác vụ với quy trình làm việc dài.
* Cài đặt / thay thế ứng dụng trên SD-card.
* Sự vắng mặt của một số chức năng được ứng dụng hỗ trợ (3G, SD-card, ...).
* Đảm bảo ứng dụng đã cài đặt không can thiệp vào hoạt động bình thường của các ứng dụng khác và không tiêu thụ bộ nhớ của chúng.

## 3.2.8. Some other verifications:

* Các trò chơi xác minh liên quan: tính không chính xác của việc kết nối / ngắt kết nối người chơi, kết nối người chơi qua các mạng khác nhau, ...
* Hãy chắc chắn rằng các thông báo lỗi thông tin là chính xác về thời gian và thích hợp.
* Xác minh kết nối với các công cụ phân tích như Google Analytics.
* Kiểm tra mức tiêu thụ điện năng.
* Xác minh các tùy chọn cần thiết hoạt động chính xác với các mạng xã hội - Share, Publish, Navigation.

Some useful tools to test mobile application functionality: Appium, Selendroid, Robotium, Ranorex.
Một số công cụ hữu ích để test chức năng ứng dụng Mobile : [Appium](http://appium.io/), [Selendroid](http://selendroid.io/), [Robotium](https://github.com/RobotiumTech/robotium), [Ranorex](https://www.ranorex.com/).

## 3.3. Usability testing

![](https://images.viblo.asia/c5fd4b5b-332a-4ae5-8d80-a9dd758838c5.jpg)

Usability testing nhằm mục đích đảm bảo sự thuận tiện khi sử dụng ứng dụng, tạo ra một giao diện trực quan phù hợp với các tiêu chuẩn. Nó được thực hiện để tạo ra các ứng dụng nhanh và dễ sử dụng. Dưới đây là 3 tiêu chí cơ bản chính để đánh giá ứng dụng:

* Satisfaction (Mức độ hài lòng)
* Efficiency (Hiệu xuất/Năng xuất)
* Effectiveness (Tính hiệu quả)

Hãy xem xét checklist đơn giản để test khả năng sử dụng ứng dụng Moble:
* Đảm bảo rằng các button có kích thước bình thường và được đặt ở một vùng của màn hình
* Xác minh ứng dụng hoạt động ở chế độ đa nhiệm, khi cần thiết.
* Kiểm tra sự điều hướng của các module ứng dụng quan trọng.
* Đảm bảo các biểu tượng và hình ảnh trông tự nhiên trong môi trường ứng dụng.
* Xác nhận màu của các button thực hiện cùng chức năng là giống nhau.
* Văn bản phải đơn giản, rõ ràng và người dùng có thể nhìn thấy. những câu ngắn và đoạn văn có thể đọc.
* Xác định kích thước phông chữ tối ưu.
* Đảm bảo hoạt động chính xác của hệ thống Zoom-in và Zoom-out .
* Xác nhận các menu không bị quá tải.
* Hãy chắc chắn rằng ứng dụng có thể bị chấm dứt bởi bất kỳ trạng thái nào và nó sẽ tiếp tục hoạt động lại trong trạng thái tương tự.
* Đảm bảo rằng các component ứng dụng được đồng bộ hóa với các hành động của người dùng.
* Xác minh người dùng có thể quay lại hoặc hủy hành động nếu nhấn sai button.
* Xác nhận tốc độ phản hồi đủ cao.

Một vài công cụ hữu ích để test tính khả dụng của ứng dụng Mobile : [User Zoom](https://www.userzoom.com/), [Reflector](https://reflector.en.softonic.com/mac), [Loop11](https://www.loop11.com/)

## 3.4. UI (User Interface) testing

![](https://images.viblo.asia/01cd82ab-71f1-4880-a159-f5e65a0cb701.jpg)

User Interface (UI) testing được thực hiện để đảm bảo giao diện người của ứng dụng đáp ứng với yêu cầu.

Dưới đây là một vài xác minh để test UI của ứng dụng Mobile :

* Đảm bảo tuân thủ các tiêu chuẩn của UI
* Kiểm tra giao diện người dùng của ứng dụng với độ phân giải màn hình tiêu chuẩn: 640 × 480, 800 × 600, 1024 × 768, 1280 × 800, 1366 × 768, 1400 × 900, 1680 × 1050.
* Xác minh khả năng phản hồi của các ứng dụng trên các thiết bị khác nhau.
* Kiểm tra thành phần thiết kế chính: button, icon, màu sắc, link, phông chữ, kích thước phông chữ, layout, textbox, định dạng văn bản, label, chú thích, danh sách,...
* Xác minh quảng cáo không chồng lấp các nút điều khiển ứng dụng.
* Đảm bảo quảng cáo có button đóng để có thể truy cập.
* Đảm bảo hiển thị chính xác các yếu tố khác nhau trên màn hình retina và non-retina.
* Xác minh tất cả các yếu tố hiển thị với hướng dọc và ngang trang.

Một vài công cụ hữu ích để test giao diện của ứng dụng Mobile : [FitNesse](http://www.fitnesse.org/), [iMacros](https://imacros.net/download/), [Coded UI](https://docs.microsoft.com/en-us/visualstudio/test/use-ui-automation-to-test-your-code?view=vs-2015&redirectedfrom=MSDN), [Jubula](https://www.eclipse.org/jubula/).

## 3.5. Compatibility (Configuration) testing (Kiểm tra tính tương thích (Cấu hình))

![](https://images.viblo.asia/c449f88b-48d2-490c-83c3-26cdaa08a58a.jpg)

Compatibility (Configuration) testing được thực hiện để đảm bảo hiệu suất ứng dụng tối ưu trên các thiết bị khác nhau - có tính đến kích thước, độ phân giải màn hình, phiên bản, phần cứng, ... 
Bạn nên chú ý đến các điểm tiếp theo:

OS Configuration (Cấu hình hệ điều hành)
Browser Configuration (Cấu hình trình duyệt)
Database Configuration (Cấu hình cơ sở dữ liệu)
Device Configuration (Cấu hình thiết bị)
Network Configuration (Cấu hình mạng)

**Cross-platform testing** giúp bạn kiểm tra ứng dụng Mobile trong các OS khác nhau: Windows, iOS, Android và BlackBerry, ...

**Cross-browser testing** cho phép đảm bảo hoạt động chính xác của ứng dụng trong các cấu hình trình duyệt khác nhau: Mozilla Firefox, Google Chrome, Opera Mini, ...

**Database testing**  nhằm mục đích xác minh hoạt động chính xác của ứng dụng trong các cấu hình cơ sở dữ liệu khác nhau: Oracle, DB2, MySql, MSSQL Server, Sybase.

**Device Configuration testing** nên tính đến các tham số như :
* Device type: smartphone, tablet, etc.
* Device configuration: RAM, loại bộ xử lý, độ phân giải màn hình, dung lượng pin, ... 

**Network configuration testing** để đảm bảo hoạt động chính xác trong các cấu hình mạng khác nhau (GSM, TDMA) và các tiêu chuẩn (2G, 3G, 4G).

Một số mẹo để kiểm tra khả năng tương thích ứng dụng Mobile của bạn:

* Tạo một matrix bao phủ (trong đó tất cả các cấu hình có thể được nhập).
* Ưu tiên cấu hình.
* Kiểm tra từng cấu hình, từng bước, theo các ưu tiên đã đặt.

Một số công cụ hữu ích để kiểm tra tính tương thích của ứng dụng Mobile: [BrowserStack](https://www.browserstack.com/), [CrossBrowserTesting by Smart Bear](https://crossbrowsertesting.com/), [Litmus](https://litmus.com/), [Browsera](http://www.browsera.com/), [Rational Clearcase by IBM](https://www.ibm.com/products/software).

## 3.6. Perfomance testing

![](https://images.viblo.asia/2916e67f-54b2-41a8-9fc6-392a5796ccb9.png)

Perfomance testing là một tập hợp các loại Testing, mục đích là để xác định khả năng hoạt động, tính ổn định, mức tiêu thụ tài nguyên và các thuộc tính khác của chất lượng ứng dụng theo các kịch bản sử dụng và load khác nhau.

Mục đích chính của Perfomance testing:

* Kiểm tra thời gian phản hồi của ứng dụng với các loại yêu cầu khác nhau, để đảm bảo rằng ứng dụng hoạt động theo các yêu cầu đối với lượt tải người dùng thông thường (**Load testing**).
* Kiểm tra khả năng làm việc của ứng dụng ở lượt tải vượt quá người dùng thông thường nhiều lần (**Stress testing**).
* Kiểm tra khả năng hoạt động của ứng dụng cho những hoạt động trong thời gian dài, dưới lượt tải bình thường (**Stability testing**).
* Kiểm tra công việc trong các điều kiện của cơ sở dữ liệu đã được mở rộng, trong thời gian bình thường (**Volume testing**).
* Xác định số lượng người dùng có thể đồng thời làm việc với ứng dụng (**Concurrency testing**).

Một số xác minh để Perfomance testing ứng dụng Mobile của bạn:
* Xác định xem ứng dụng có chạy giống nhau trong các điều kiện mạng khác nhau không.
* Tìm các tắc nghẽn ứng dụng và cơ sở hạ tầng khác nhau làm giảm hiệu suất ứng dụng.
* Đánh giá khả năng của ứng dụng để đối phó với khối lượng tải theo kế hoạch.
* Xác nhận thời gian phản hồi của ứng dụng đáp ứng yêu cầu.
* Kiểm tra sự ổn định của ứng dụng trong các điều kiện của tải của người dùng là không được tốt.
* Đảm bảo hiệu suất của ứng dụng nếu nó hoạt động trong các điều kiện kết nối không cố định với Internet.
* Đảm bảo cấu hình client-server hiện tại cung cấp hiệu suất tối ưu.

Một số công cụ hữu ích để test perfomance của ứng dụng Mobile : [NeoLoad by Neotys](https://www.neotys.com/neoload/overview),  [Apteligent (formerly Crittercism)](https://www.neotys.com/neoload/overview), [New Relic](https://newrelic.com/why-new-relic).

## 3.7. Security testing

![](https://images.viblo.asia/883b1b08-cdbf-454d-823f-cac118ba597c.jpg)

Security testing nhằm kiểm tra tính bảo mật của hệ thống, cũng như phân tích các rủi ro liên quan đến việc cung cấp cách tiếp cận toàn diện để ứng dụng được an toàn, ngăn tin tặc, vi rút, truy cập trái phép vào dữ liệu nhạy cảm.

Một số xác minh cần phải vượt qua để test bảo mật ứng dụng Mobile:
* Đảm bảo dữ liệu của người dùng ứng dụng (đăng nhập, mật khẩu, số thẻ ngân hàng) được bảo vệ khỏi các cuộc tấn công mạng của các hệ thống tự động và không thể tìm thấy bằng cách chọn.
* Xác minh hệ thống bảo mật ứng dụng yêu cầu mật khẩu mạnh và không cho phép kẻ tấn công lấy được mật khẩu của người dùng.
* Đảm bảo rằng ứng dụng không cấp quyền truy cập vào nội dung hoặc chức năng nhạy cảm mà không có xác thực phù hợp.
* Bảo vệ ứng dụng chống lại các cuộc tấn công của kiểu SQL injection.
* Bảo vệ ứng dụng và mạng khỏi tấn công DoS (DoS Attacks).
* Bảo vệ ứng dụng khỏi các cuộc tấn công độc hại vào máy khách hàng.
* Bảo vệ hệ thống khỏi các triển khai độc hại khi chương trình đang chạy.
* Cung cấp quản lý phiên làm việc được bảo vệ từ những người dùng trái phép.
* Ngăn chặn hậu quả độc hại có thể có của tập tin bộ nhớ caching.
* Kiểm tra các tập tin người dùng và ngăn chặn các tác động có hại của chúng.
* Phân tích sự tương tác của các tập tin hệ thống, xác định và sửa các lỗ hổng.
* Ngăn chặn các hành động độc hại có thể có của cookie.

Một số công cụ hữu ích để test bảo mật ứng dụng Mobile : [OWASP Zed Attack Proxy](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project), [Veracode](https://www.veracode.com/), [Google Nogotofail](https://github.com/google/nogotofail), và [SQL Map](http://sqlmap.org/).

## 3.8. Recovery testing

![](https://images.viblo.asia/5a760830-d45b-4f05-b3be-b72891af7d09.jpg)

Recovery testing xác minh ứng dụng đang được test về khả năng chịu đựng và phục hồi thành công từ các lỗi có thể xảy ra do lỗi phần mềm, lỗi phần cứng hoặc sự cố giao tiếp.

Dưới đây là danh sách các xác minh cho Recovery testing :
* Xác minh sự phục hồi hiệu quả của ứng dụng sau các tình huống sự cố không lường trước.
* Đảm bảo quá trình phục hồi dữ liệu sau khi ngắt kết nối.
* Kiểm tra sự phục hồi sau lỗi hệ thống và lỗi giao dịch.
* Xác minh khả năng ứng dụng xử lý các giao dịch trong trường hợp mất điện (pin yếu, tắt ứng dụng không đúng cách, ...)

## 3.9. Localization testing

![](https://images.viblo.asia/fa5c3bd5-4b94-4acb-abd3-180ea800f67e.jpg)

Localization testing cho phép bạn test thích ứng ứng dụng Mobile cho đối tượng mục tiêu cụ thể phù hợp với đặc thù văn hóa của nó.

Một số xác minh cho Localization testing:
* Xác định ngôn ngữ được ứng dụng hỗ trợ.
* Đảm bảo tính chính xác của bản dịch.
* Xác minh tính chính xác của bản dịch theo chủ đề của ứng dụng
* Kiểm tra các định dạng ngày.
* Kiểm tra các dấu phân cách trong số.

Tất nhiên, người bản ngữ được ưu tiên thực hiện Localization testing của ứng dụng Mobile

[Ubertesters](https://ubertesters.com/) có thể hữu ích để Localization testing ứng dụng Mobile.

## 3.10. Change related testing

![](https://images.viblo.asia/fc0f8f11-4338-448e-9818-62d2bdd5afbc.png)

Vì vậy, sau khi vượt qua tất cả các giai đoạn được đề cập và tìm thấy một số lỗi. Do đó, một số thay đổi đã được thực hiện vào code của ứng dụng của bạn.

Các mục tiêu chính của thử nghiệm liên quan đến thay đổi (Change related testing):
* Xác minh team của bạn đã fix thành công tất cả các lỗi được phát hiện (Re-testing or Confirmation testing). Nói một cách đơn giản, các trường hợp kiểm tra phát hiện lỗi ban đầu được chạy lại. Và lần này chúng sẽ được thông qua mà không có lỗi.
* Xác minh những thay đổi mới không dẫn đến sự xuất hiện của các lỗi mới. (Regression testing). Trên thực tế, cung cấp Regression testing, bạn không chỉ vượt qua các trường hợp kiểm tra với các lỗi được phát hiện mà còn kiểm tra các trường hợp kiểm tra tất cả các chức năng của ứng dụng của bạn.

Một số công cụ hữu ích để Change related testing cho ứng dụng của bạn: [Appium](http://appium.io/), [Robotium](https://github.com/RobotiumTech/robotium), [Ranorex](https://www.ranorex.com/).

## 3.11. Beta testing

![](https://images.viblo.asia/a36ff045-b59d-43ba-ba39-1e85e1c8ee2c.jpg)

Cuối cùng, bạn có phiên bản đầy đủ chức năng phát hành trước của ứng dụng Mobile. Sẽ là tốt hơn để đánh giá khả năng và sự ổn định của chương trình cho người dùng trong tương lai của nó.

Beta testing là giai đoạn gỡ lỗi và kiểm tra phiên bản beta của chương trình. Mục đích chính của nó là xác định số lượng lỗi tối đa trong công việc của mình để loại bỏ chúng trước khi phát hành ứng dụng cuối cùng ra thị trường.

Những người có kinh nghiệm làm việc với các loại ứng dụng  tương tự sẽ tốt hơn là có kinh nghiệm với phiên bản trước của ứng dụng được chọn vào vai trò của tester Beta.

Bạn nên chú ý đến các yếu tố tiếp theo trước khi cung cấp Beta testing cho ứng dụng Mobile của mình:
* Một số người tham gia Testing.
* Thời gian Testing.
* Vận chuyển
* Đảm bảo thông tin bảo mật về ứng dụng
* Chi phí Testing.

Mặc dù bạn cần phải bỏ ra một số tiền để Beta testing, nhưng đó có thể là một khoản đầu tư tốt cho chất lượng của ứng dụng Mobilt của bạn.

Một số nền tảng phổ biến để thử nghiệm beta các ứng dụng di động: [HockeyApp](https://hockeyapp.net/blog/), [Ubertesters](https://ubertesters.com/), [TestFlight](https://developer.apple.com/testflight/).

## 3.12. Certification testing

![](https://images.viblo.asia/d08c2104-6032-4989-b6de-913d79abebf4.jpg)

Có một số quy tắc nhất định để tổ chức tệp cài đặt (.apk) và quy tắc thiết kế ứng dụng cho từng store ứng dụng. Certification testing xác minh ứng dụng đáp ứng yêu cầu của các store phổ biến nhất như Google Play, App Store và Windows Phone.

Hãy xem xét các tiêu chí chính để tuân thủ ứng dụng với các tiêu chuẩn, thỏa thuận cấp phép và điều khoản sử dụng.

**1. Android :**

* Tệp cài đặt cho ứng dụng (.apk) khớp với Chính sách chương trình ([Program Policies](https://play.google.com/intl/us/about/developer-content-policy/)).
* Ứng dụng đáp ứng các yêu cầu của [UIG](https://developer.android.com/guide/practices/ui_guidelines/index.html).
* Không có virus trong ứng dụng. Thị trường Android bán tự động kiểm tra ứng dụng để tìm virus và có thể chặn tài khoản của bạn nếu phát hiện ra chúng.
* Bạn nên tuân theo thứ tự kiểm soát phiên bản trong trường hợp xuất bản phiên bản cập nhật của ứng dụng.

**2. iOS :**

* Ứng dụng đáp ứng các yêu cầu của Nguyên tắc Giao diện Con người ([Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/overview/themes/)).
* Ứng dụng phải có một tên duy nhất.
* Bạn cần cung cấp một liên kết cho phản hồi từ nhà phát triển.
* Các ứng dụng nên được đưa vào danh mục cụ thể được xác định.
* App Store kiểm tra ứng dụng để tương thích.
* Ứng dụng không có chứa các tài liệu bị cấm, sự chậm trễ không lường trước trong công việc hoặc lặp lại các chức năng hiện có.

**3. Windows Phone :**

* Ứng dụng đáp ứng các yêu cầu của yêu cầu chứng nhận Ứng dụng ([App certification requirements](https://msdn.microsoft.com/en-us/library/windowsphone/develop/hh184843(v=vs.105).aspx)).
* Mô tả rõ ràng về các yêu cầu phần cứng và mạng.
* Các chức năng được đề cập trong mô tả hoặc hiển thị trong ảnh chụp màn hình được thực hiện đầy đủ
* Tùy chọn để kiểm soát âm thanh có thể phát tự động được yêu cầu.

# 4. Tips to test mobile application

Hãy hệ thống hóa kiến thức của chúng ta và cố gắng xác định các tip chính để Testing ứng dụng Mobile.

1. Tìm hiểu ứng dụng bạn sẽ test.
2. Ghi nhớ sự khác biệt giữa ứng dụng Desktop và Mobile.
3. Có tính đến các chi tiết cụ thể của hệ điều hành và phần cứng
4. Sử dụng các thiết bị thực khi có thể.
5. Đừng cố gắng tìm "Swiss Army Knife" của Testing. Sử dụng các công cụ mà bạn quen thuộc.
6. Sử dụng những lợi thế của Cloud mobile testing.
7. Xác nhận phát hiện của bạn bằng screenshot, log và video.
8. Cung cấp thử nghiệm ứng dụng di động của bạn cho cả chế độ màn hình dọc và ngang.
9. Sử dụng các tùy chọn menu phát triển cho iOS và Android.
10. Đừng bỏ qua (nhưng không lạm dụng) trình giả lập và mô phỏng giả lập để Testing.
11. Xác minh sự hoàn hảo của ứng dụng của bạn.
12. Đừng tự động hóa mọi thứ
13. Tiếp nhận người dùng thực để kiểm tra ứng dụng của bạn
14. Giải phóng thời gian để giải quyết các tình huống test phức tạp, độc đáo hơn.
15. Xem xét yếu tố con người

## Nguồn Tham khảo:
https://geteasyqa.com/qa/mobile-apps-testing/