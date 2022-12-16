“Nó hoạt động trên máy của bạn."

Đây là phản hồi mà một nhân viên kiểm thử phần mềm thường gặp nhất từ nhà phát triển khi báo cáo một lỗi. Và câu trả lời từ nhân viên kiểm thử sẽ là “Hãy sao lưu hệ thống của bạn. Chúng tôi cần chuyển nó cho khách hàng, vì sản phẩm của chúng tôi chỉ hoạt động trên hệ thống của bạn.”

Chúng ta đều biết rằng, các phần mềm đều có thể bị lỗi. Tuy nhiên, nó đòi hỏi nhân viên kiểm thử phần mềm phải sử dụng những kỹ năng và kỹ thuật kiểm thử của mình để tìm ra càng nhiều vấn đề càng tốt. Đặc biệt, đối với kiểm thử thiết bị di động, nhân viên kiểm thử phần mềm cần nhiều kỹ thuật khác nhau để xác định các vấn đề trong các trường hợp khác nhau trước khi khách hàng phát hiện ra. Dưới đây là hướng dẫn về những kỹ thuật kiểm thử căn bản cho nhân viên kiểm thử chất lượng.

## Kiểm thử gián đoạn: Xác định cản trở
Sự gián đoạn không được chào đón trong cuộc sống hàng ngày, và đặc biệt là trong thế giới di động. Tuy nhiên, chúng ta lại phải quan tâm đến nó khi chúng xảy ra với một thứ gì đó quan trọng.

Chẳng hạn, những thông báo đẩy trên một thiết bị di động không chỉ thông báo cho người dùng về những nội dung đã được cập nhật, mà hầu hết chúng còn đưa ra những hành động như trả lời hoặc trì hoãn. Vì thế, người dùng có thể biết được những hoạt động trên thiết bị di động của mình và dễ dàng phản hồi lại với mọi thứ cập nhật các hoạt động trên thiết bị di động của họ và phản hồi dễ dàng với mọi thứ xảy ra.

Mặt khác, những thông báo di động có thể gây ảnh hưởng đến âm thanh nếu như đang nghe nhạc, làm cản trở những tác vụ trong ứng dụng khác, hoặc làm chậm hiệu suất chung của thiết bị. Trung bình khoảng 50-80 gián đoạn mỗi ngày từ các thông báo đẩy, nó có thể lấn át người dùng. Phương pháp kiểm thử gián đoạn sẽ kiểm tra những rối loạn gây ra từ những gián đoạn và đề xuất những giải pháp thực tế để giúp thiết bị di động chạy mượt mà hơn.

Khi tiến hành phương pháp kiểm thử gián đoạn, nhân viên kiểm thử thiết bị di động phải tạo mọi loại thông báo khác nhau từ ứng dụng trên một thiết bị thực để xác nhận các thao tác và các deep link (liên kết sâu) đang hoạt động. Tuy nhiên, nhân viên kiểm thử thiết bị di động cũng cần phải kiểm tra cách ứng dụng xử lý những gián đoạn từ bên ngoài. Nghĩa là, một thông báo đẩy khác từ một ứng dụng hoặc một cuộc gọi đến trong khi ứng dụng kiểm thử đang hoạt động. Những gián đoạn có thể cũng phát sinh từ phần cứng của điện thoại. Chẳng hạn, nhấn các nút âm lượng cũng làm gián đoạn hệ thống và có thể ảnh hướng đến ứng dụng.

Trong khi tiến hành kiểm thử gián đoạn, nhân viên kiểm thử phải chú ý đến những vấn đề về UI, sự cố ứng dụng, hoặc những vấn đề liên quan đến hiệu năng. Điều này giúp tránh được tình trạng gián đoạn và tìm ra được những phương án giúp người dùng được trải nghiệm thiết bị một cách mượt mà.

## Kiểm thử đầu vào: Bắt chước những tình huống thực
Trong khi kiểm thử một ứng dụng di động, nhân viên kiểm thử thiết bị di động phải thực hiện nhiều thao tác khác nhau trên màn hình thiết bị. Những thao tác này thường là nhập dữ liệu vào các mục để cuộn qua danh sách và nhấn vào các nút. Tuy nhiên, những chiếc smartphone lại có nhiều loại đầu vào bổ sung cần phải nhớ và thực hiện trong giai đoạn kiểm thử.

### 1. Đầu vào đa chạm
Ngoài đầu vào đơn chạm mặc định, màn hình cảm ứng hiện đại có khả năng xử lý được cả những đầu vào đa chạm. Có thể sử dụng hai, ba, và thậm chí là bốn ngón tay để thực hiện những thao tác như phóng to, thu nhỏ, hoặc xoay màn hình. Nhân viên kiểm thử thiết bị di động phải biết được những thao tác nhập đầu vào khác nhau từ các nền tảng di động cũng như những thao tác được app và tính năng hỗ trợ bên trong.

Trong quá trình kiểm thử những đầu vào thao tác, có thể thay đổi tốc độ đầu vào bằng ngón tay. Ví dụ: thử chạm 2 lần vào màn hình bằng một hoặc nhiều ngón tay, hoặc thậm chí là dùng cả hai tay để xem ứng dụng phản ứng như thế nào. Có thể ứng dụng không thể xử lý được thao tác này và có thể gặp sự cố.

### 2. Đầu vào giọng nói
Bất kỳ ứng dụng nào có thể xử lý âm thanh và giọng nói cũng đều phải được kiểm thử trong những tình huống thực. Chúng có thể là ở văn phòng, trên đường phố, trên tàu, hoặc thậm chí là trong những môi trường thực sự yên tĩnh. Mục đích cuối cùng là để xem ứng dụng có thể xử lý đầu vào chính xác khi có tiếng ồn bên ngoài hay không.

Tùy thuộc vào cơ sở mục tiêu khách hàng, mức độ của giọng nói cũng nên được chú ý. Ví dụ: đối với một ứng dụng cho trẻ con, bạn nên kiểm thử đầu vào bằng giọng nói của trẻ, vì giọng của chúng khác với giọng của người lớn.

### 3. Đầu vào cảm biến
Tùy thuộc vào những tính năng của ứng dụng kiểm thử, thiết bị cảm biến của thiết bị cũng có thể gây ảnh hưởng đến việc kiểm thử. Các thiết bị di động hiện đại có các thiết bị cảm biến khác nhau để thu thập dữ liệu từ môi trường xung quanh. Danh sách những loại cảm biến sau có thể có được tích hợp trong thiết bị:
* Cảm biến ánh sáng môi trường xung quanh
* Cảm biến tiệm cận
* Cảm biến gia tốc
* Cảm biến con quay hồi chuyển (Gyroscope)
* Cảm biến từ
* Cảm biến áp suất
* Cảm biến nhiệt độ
* Cảm biến độ ẩm

Nhân viên kiểm thử thiết bị di động phải nắm rõ được những cảm biến được cài đặt trong điện thoại và những tính năng nào của app dựa trên dữ liệu cảm biến. Những loại cảm biến này phải được kiểm định trong các môi trường khác nhau để xem chúng ảnh hưởng như nào đến app. Ví dụ: nếu app đang sử dụng dữ liệu động, có thể khởi động và làm chậm tốc độ để xem app phản ứng thế nào về tình huống thay đổi tốc độ di chuyển.

## Khoan đã, còn nữa!
Trên đây là giới thiệu sơ qua những kỹ thuật kiểm thử thiết bị di động có sẵn cho nhân viên kiểm thử. Còn rất nhiều những kỹ thuật kiểm thử thiết bị di động khác mà một nhân viên kiểm thử nên biết. Dưới đây là một số kỹ thuật bổ sung khác cần được tiến hành thực hiện trong giai đoạn phát triển và kiểm thử.
* Kiểm thử cụ thể phần cứng
* Kiểm thử lắp đặt và cập nhật
* Kiểm thử dự phòng
* Kiểm thử mức sử dụng pin
* Kiểm thử bộ nhớ cục bộ
* Kiểm thử Beta

Mọi nhân viên kiểm thử đều muốn phát triển những kỹ năng toàn diện. Như đã nói, để đạt được điều này, phải giành thời gian, kiên nhẫn, và thực hành thật nhiều. Hãy bắt đầu với 3 kỹ thuật kiểm thử trên. Tóm lại, không có chỗ cho sự thỏa hiệp khi nói đến việc cung cấp các sản phẩm số chất lượng cao.

Link tham khảo: https://www.applause.com/blog/mobile-testing-techniques-every-qa-person-must-know/