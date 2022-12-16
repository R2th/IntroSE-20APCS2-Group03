# Điểm Bán Lẻ (POS) là gì?

POS - Point of sales dịch theo nghĩa là điểm bán lẻ, là nơi giao dịch diễn ra, điểm bán hàng phục vụ cho nhu cầu bán lẻ của các doanh nghiệp. Bạn có thể thấy các hệ thống POS tại các Cửa hàng Bán lẻ, Nhà hàng, Bệnh viện và hầu như ở khắp mọi nơi hàng ngày, nơi có các khoản thanh toán.

POS giúp các chủ doanh nghiệp giảm bớt chi phí quản lý, nhân công. Hạn chế thất thoát hàng hóa và quan trọng nhất là đáp ứng nhu cầu của Khách hàng một cách nhanh gọn, hiệu quả và chuyên nghiệp.

Hầu hết các bạn có thể hiểu rõ thiết bị đọc mã vạch hay thiết bị thanh toán không dây là gì (thiết bị được sử dụng nhiều nhất cho các giao dịch thanh toán) nhưng POS thực sự liên quan đến rất nhiều thành phần và mỗi thành phần cần phải được tích hợp tốt cho nó để chạy thành công.

Trong bài viết này, tôi sẽ cố gắng nói về những điểm khác biệt khi kiểm thử hệ thống bán lẻ so với  những hệ thống phần mềm khác. Tôi cũng đã kết hợp các mẹo kiểm thử trong suốt bài viết để hữu ích hơn cho cộng động Tester của chúng ta.

![](https://images.viblo.asia/9f2b3547-4276-4a64-b222-ab6625b62bb5.jpg)

## Điều gì là khác biệt khi kiểm thử POS:

Kiểm thử hệ thống POS có vẻ phức tạp, nhưng nó không phải là khó cho những người hiểu khái niệm tốt. Điều thú vị là bạn sẽ được ngồi trong một cửa hàng và thực hiện các trường hợp kiểm thử của bạn khi POS được yêu cầu thiết lập như bạn thấy trong bất kỳ cửa hàng. Điều này là khác biệt khi so sánh với việc ngồi trong phòng làm việc của bạn và chạy một số kiểm thử trên một ứng dụng web.

**Những thách thức trong kiểm thử POS là gì?**

* Nhiều cấu hình theo yêu cầu của cửa hàng - Tôi sẽ giải thích với một ví dụ đơn giản, nói rằng một chuỗi bán lẻ muốn chạy một chương trình quảng cáo chỉ ở một thành phố cụ thể, trong trường hợp đó, cần phải thực hiện các cấu hình đặc biệt cho các hệ thống POS đang chạy trong thành phố đó .
* POS yêu cầu thiết lập phù hợp với tất cả các thiết bị, cũng như nhiều loại thiết bị phần cứng và các phiên bản của phần mềm.
* Nhiều thiết bị yêu cầu kiểm thử tính tương thích và cũng yêu cầu kiểm thử tích hợp toàn bộ.
* PCI tuân thủ, bởi vì POS kiểm tra giao dịch chi tiết thẻ của người dùng cuối.


# POS Architecture

![](https://images.viblo.asia/db48d03c-e62d-4892-868a-d44a2ab1fc0b.jpg)

Mỗi thiết bị đầu cuối trong một cửa hàng được kết nối với một máy chủ tập tin. Cài đặt hoặc các cấu hình chính được thực hiện trên máy chủ và sau đó được đẩy đến từng thiết bị đầu cuối trong cửa hàng. 
Đối với các cửa hàng bán lẻ lớn hoặc chuỗi cửa hàng, không có thay đổi nào được thực hiện tại local. Vì các hệ thống POS chấp nhận thanh toán bằng thẻ, chúng được tích hợp với các nhà cung cấp bên thứ ba chủ yếu xử lý thẻ tín dụng, do đó, bất cứ khi nào có giao dịch bằng thẻ tín dụng, dữ liệu được gửi tới bên thứ ba hoặc ngân hàng để ủy quyền.

![](https://images.viblo.asia/35989837-a9d3-436d-9bb1-39e7d683c22d.jpg)

## POS Các thành phần vật lý và Cách thức kiểm tra:

1) Terminal - Terminal là màn hình chính được sử dụng để nhập thông tin chi tiết của giao dịch. Đây chủ yếu là các thiết bị màn hình cảm ứng. Tất cả các cấu hình, có liên quan đến Danh sách sản phẩm, Giá, Khuyến mại, Phương thức thanh toán, được đẩy đến thiết bị đầu cuối. Đây là thiết bị chính được sử dụng tại bất kỳ điểm bán lẻ nào.

    Kiểm thử Terminal yêu cầu xác nhận để đảm bảo rằng các thiết bị được kết nối với mạng và hệ điều hành mới nhất đang chạy trên nó để hỗ trợ các ứng dụng POS.

2) Display Pole - là thiết bị hiển thị thông tin mã hàng và giá cho khách khi sản phẩm được quét bằng máy quét mã vạch.

   Xác minh Display Pole sẽ hiển thị thông tin mã hàng và mức giá như đã thấy trên thiết bị POS

3) Barcode Reader - Máy đọc mã vạch được sử dụng để quét các sản phẩm. Sau khi quá trình quét hoàn tất, kiểm thử được thực hiện phía back end để kiểm tra danh mục hàng tồn kho & giá mặt hàng. Khi sản phẩm được bán, hàng tồn kho được cập nhật để giảm số lượng đơn vị có sẵn.
Các trường hợp có thể thực hiện kiểm thử:
- Xác nhận có thể được thực hiện bằng cách quét một sản phẩm bị thiếu trong danh mục hàng tồn kho
- Xác nhận bằng cách quét các sản phẩm có sẵn trong danh sách hàng tồn kho nhưng không có giá được gắn nhãn
- Xác nhận bằng cách quét các sản phẩm có sẵn trong danh sách kiểm kê với cách gắn thẻ thích hợp với mức giá.

4) Cash Register - Đăng ký tiền mặt được sử dụng để lưu trữ Tiền mặt. Đối với bất kỳ giao dịch tiền mặt nào, Đăng ký tiền mặt sẽ mở ngay lập tức cho thủ quỹ để nhận tiền mặt từ khách hàng và trả lại số dư nếu có.

   Kiểm tra đăng ký tiền mặt có thể được thực hiện bằng cách chọn chế độ thanh toán dưới dạng Tiền mặt, và thực hiện giao dịch bằng tiền mặt với số tiền hoàn lại.

5) Handheld device - Thiết bị cầm tay là thiết bị không dây được sử dụng để chấp nhận thanh toán bằng thẻ tín dụng. Việc xác thực người dùng cũng trở nên dễ dàng hơn bằng cách đưa thiết bị cho người dùng để người dùng có thể trực tiếp nhập mã pin.

    Việc kiểm tra có thể được thực hiện bằng cách tạo một giao dịch với hình thức thanh toán dưới dạng Thẻ. Cần nhập số tiền thủ công và verify giao dịch thanh toán.

6) Máy in - Máy in được kết nối với mỗi đầu cuối và được gọi là máy in đăng ký, chúng được sử dụng để tạo biên lai sau mỗi giao dịch.

- Tester có thể verify việc in hóa đơn, kiểm tra sự liên kết, ghi đè văn bản, kích thước văn bản, phông, v.v ...
- Lỗi xử lý có thể được kiểm tra với trường hợp điều gì sẽ xảy ra nếu thực hiện lệnh in khi máy in không ở trạng thái sẵn sàng hoặc máy in đã hết giấy.
- Verify kết quả khi máy in không kết nối mạng hoặc mất kết nối ở giữa giao dịch.

7) Magnetic Swipe Reader - MSRs (Đầu đọc thẻ từ) được sử dụng để vuốt thẻ được sử dụng để thanh toán có thể là ghi nợ, tín dụng hoặc Thẻ quà tặng. Điều này chủ yếu được sử dụng trong các cửa hàng bán lẻ hoặc nhà hàng, nhưng với thời gian thay đổi, nơi mà người dùng được yêu cầu nhập PIN để thanh toán, ở nhiều nơi bạn sẽ thấy một thiết bị không dây được sử dụng để chấp nhận thanh toán bằng thẻ.

   Trong trường hợp Thẻ quà tặng, Đầu đọc thẻ từ được sử dụng để kiểm tra số dư, ngày hết hạn và để thanh toán. Biên lai in được trao cho khách để xin phép. Tester nên kiểm tra các trường hợp này.
   
# Một vài ví dụ về các trường hợp kiểm thử cho hệ thống bán lẻ
| Test Scenario | Test case | 
| -------- | -------- |
| Hoạt động thu ngân | Kiểm tra việc nhập hàng hóa đã bán là chính xác  | 
|    | Kiểm tra chiết khấu hàng hóa được áp dụng chính xác  | 
|    | Kiểm tra hệ thống POS tương thích với các thiết bị ngoại vi như RFID Reader, Máy quét mã vạch, Máy in  | 
| Xử lý cổng thanh toán   | Kiểm tra số CVV của thẻ tín dụng là hợp lệ  | 
|    | Xác minh thông tin thẻ đã chụp được mã hóa và giải mã đúng  | 
| Kiểm tra việc bán hàng    | Kiểm tra quy trình bán hàng thông thường  | 
|    | Kiểm tra doanh số bán hàng với thẻ ghi nợ/thẻ tín dụng  | 
|    | Kiểm tra với trường hợp khách hàng là thành viên thân thiết  | 
|    | Kiểm tra với trường hợp giao dịch "O" hoặc "null" | 
| Kiểm tra giao dịch & việc hoàn trả   | Kiểm tra với trường hợp đổi hoặc trả lại hàng bằng tiền mặt  | 
|    | Kiểm tra hệ thống bán hàng với in biên lai hoặc không in biên lai  | 
|    | Kiểm tra hệ thống nên cho phép nhập mã vạch bằng tay khi máy quét mã vạch không hoạt động  | 
|    | Xác minh hệ thống hiển thị cả số tiền hiện tại cũng như số tiền chiết khấu trên hóa đơn nếu có | 
| Tuân thủ quy định và bảo mật  | Kiểm tra hệ thống với trường hợp thẻ đã hết hạn  | 
|    | Kiểm tra với trường hợp mã PIN của thẻ credit card không hợp lệ  | 
|    | Kiểm tra bảng kê với việc nhập mã code của hàng hóa bị sai  | 
|    | Kiểm tra với trường hợp nhập ngày khuyến mại không hợp lệ cho chi tiết đơn hàng | 
| Kiểm tra báo cáo  | Kiểm tra báo cáo phân tích xu hướng  | 
|    | Thông tin kiểm tra liên quan đến giao dịch thẻ tín dụng phải được phản ánh trong báo cáo  | 
|    | Kiểm tra báo cáo cá nhân cũng như hợp nhất của lịch sử khách hàng mua | 
|    | Kiểm tra tạo báo cáo online | 

# Kết luận

Kiểm thử hệ thống POS đòi hỏi mức độ kiểm thử cao vì hiệu suất và chức năng của hệ thống ảnh hưởng trực tiếp đến doanh thu kinh doanh của các hệ thống bán lẻ. Vì vậy, để giảm thiểu rủi ro và thất bại trong quá trình giao dịch, kiểm thử trong điều kiện khắc nghiệt là cần thiết. Hi vọng bài viết này phần nào giúp các bạn hiểu rõ hơn về quá trình kiểm thử hệ thống POS.

Nguồn: http://www.softwaretestinghelp.com/how-to-test-point-of-sale-pos-system/