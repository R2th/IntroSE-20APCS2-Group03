Một dự án phần mềm bao gồm quá trình xây dựng phát triển, bàn giao, bảo trì. Hệ thống dù tốt đến đâu cũng do con người phát triển và sử dụng.Tất nhiên không thể tránh khỏi lỗi. Và những lỗi lớn tạo nên incident đúng là ác mộng của cả dự án nhất. 

Trước hết chúng ta cần biết incident là gì ?
Trong quá trình test, bạn sẽ thấy kết quả thực tế khác với kết quả mong muốn. Những trường hợp đó được gọi là Incidents, bugs, defects, problems or issues. Chúng ta cần phân biệt sự khác nhau giữa Incidents, bugs hay defects. Về cơ bản, một Incidents là bất kỳ tình huống nào mà hệ thống hoạt động bất thường, chúng ta để cập đến incidents như một defects hay bugs chỉ khi nguyên nhân gốc rễ là một problem trong item đã được test.

Các nguyên nhân khác của Incidents bao gồm cấu hình sai, hoặc do test environment, data test sai, kết quả mong muốn không hợp lý, lỗi của tester.

Dù không muốn thì chúng ta vẫn phải đối mặt và giải quyết các incident, bởi vậy chúng ta cần một quy trình khoa học để xử lí vấn đề một cách nhanh gọn, hiệu quả nhất.
![](https://images.viblo.asia/6b1d1e7e-3e58-4628-9921-ec7a9d694477.jpg)
# 1. Phát hiện incident :
Chúng ta đều mong muốn tất cả các incident đều được QA tìm ra và được fix trước khi khách hàng tự mình phát hiện ra nhưng phần lớn các lỗi tạo ra incident lại do khách hàng phát hiện sau thời gian sử dụng sản phẩm. Bởi vậy, nhiều khi các incident này sẽ gây thiệt hại trực tiếp cho khách hàng và cần xử lập tức.
# 2. Xử lí incident tạm thời:
Sau khi phát hiện hoặc được thông báo của khách hàng về incident. Dev phải điều tra ngay nguyên nhân và khắc phục nhanh nhất có thể để tránh ảnh hưởng đến quá trình vận hành của sản phẩm . Đặc biệt là các incident liên quan đến End users, các giao dịch thanh toán...
Lúc đầu chúng ta có thể xử lí tạm thời để giảm nhẹ hậu quả. Sau khi có thời gian chúng ta sẽ phải đi phân tích sâu hơn về nguyên nhân để tìm ra cách giải quyết triệt để.
# 3.Báo cáo về incident :
![](https://images.viblo.asia/9b0169b3-73a9-4d17-b037-6fb1ada37db1.jpeg)
Sau khi đã khắc phục được incident, các thành viên trong dự án và Group Leader sẽ phải họp để thực hiện các bước sau :

Phân tích incident : 
- Incident xảy ra khi nào ? Chức năng nào? Dự án nào?
- Vì sao lại xảy ra incident?
- Làm thế nào để giải quyết incident?
- Làm thế nào để tránh incident tương tự xảy ra?
- Bài học rút ra là gì?
+ Đặc biệt cần tìm nhấn mạnh các biện pháp để tránh lặp lại các incident tương tự 

Vậy tại sao phải báo cáo Incidents? Có rất nhiều lợi ích khi báo cáo Incidents:

Tiện cho việc theo dõi Incidents: 
Trong dự án thực tế, có rất nhiều bug/defect được tìm thấy. Nếu không có quy trình báo cáo, phân loại, quản lý chúng thì sẽ rất khó để theo dõi.

Cung cấp thông tin chi tiết về Incidents cho các bên liên quan.

Dựa vào các tài liệu báo cáo, có thể phân tích chất lượng hệ thống. Phân tích báo cáo trên một dự án hoặc giữa các dự án để cung cấp thông tin nhằm cải tiến quá trình phát triển và kiểm thử.

Dev cần thông tin trong báo cáo để tìm và fix bug. Mặt khác, các báo cáo cũng cung cấp thông tin giúp team lead xem xét độ ưu tiên để phân bổ tài nguyên cho phù hợp.

Một số Incidents là lỗi do người dùng, tuy nhiên không ít trong số chúng bị lack khi test.

Từ báo cáo, ta có được phần trăm phát hiện lỗi bằng cách so sánh bug/defect được báo cáo với những bug/defect tester phát hiện ra trong quá trình test. 

Sau đó báo cáo này sẽ được gửi cho cấp quản lí và giải trình cho khách hàng và thỏa thuận khắc phục hậu quả nếu có.
# 4. Thực hiện seminar để chia sẻ trong team :
Từ việc báo cáo, phân tích incident, chúng ta sẽ tổng hợp lại thành tài liệu để chia sẻ cho các mumbers trong team. Chẳng hạn thực hiện một buổi seminar chia sẻ về incident. Trong tài liệu chia sẻ cần đặc biệt nhấn mạnh bài học để khắc phục không để cho incident lặp lại .

Đây là các bước cơ bả nhất để giải quyết khu xảy ra incident nhăm hạn chế thấp nhất các hậu quả đã xảy ra và rủi ro có thể gặp phải trong tương lai. Chẳng ai muốn incident xảy ra trong dự án của mình nhưng khi không may gặp phải cách giải quyết vấn đề và rút ra bài học sẽ giúp chúng ta có nhiều kinh nghiệm hơn .