### I. Giới thiệu
**1. Thiệt bị kiểm thử thật là gì?**<br>
Kiểm thử trên thiết bị thật cho phép bạn chạy các ứng dụng di động và kiểm tra chức năng của thiết bị. Kiểm thử thiết bị thật đảm bảo với bạn rằng ứng dụng của bạn sẽ hoạt động trơn tru trong thiết bị cầm tay của khách hàng.<br>
![](https://images.viblo.asia/5628b990-b085-4325-824d-a5962ed76506.jpg)

**2. Trình giả lập là gì?**<br>
Trình giả lập là một chương trình phần mềm cho phép điện thoại di động của bạn bắt chước các tính năng của máy tính hoặc phần mềm di động khác mà bạn muốn chúng bắt chước bằng cách cài đặt chúng vào máy tính hoặc di động.
![](https://images.viblo.asia/6db0939b-f4f0-428c-8e99-3e671b93b0ff.jpg)

### II. Sự khác biệt giữa kiểm thử trên thiết bị thật và thiết bị giả lập<br>
**1. Sự khác biệt của kiểm thử giữa Emulator và Simulator** <br>
Cả Emulator và Simulator đều là thiết bị ảo. Một thiết bị ảo không phải là điện thoại thật mà là một phần mềm có chức năng tương tự như điện thoại thật (ngoại trừ một vài chức năng như máy ảnh).
Nhưng có một số khác biệt giữa Emulator và Simulator sau đây:
| Kiểm thử dựa trên Simulator | Kiểm thử dựa trên Emulator | 
| -------- | -------- | 
|Mục tiêu của  Simulator là mô phỏng trạng thái bên trong của đối tượng giống với đối tượng đó<br><br>Simulator được ưu tiên bất cứ khi nào nhóm kiểm thử cần kiểm tra hành vi bên trong của thiết bị di động như phần cứng, phần sụn,...<br><br>Simulator được viết bằng ngôn ngữ cấp cao<br><br> Simulator có thể gặp khó khăn trong trường hợp debug<br><br>Simulator chỉ triển khai được một phần của phần mềm gốc| Emulator có mục đích mô phỏng hoặc bắt chước càng gần càng tốt hành vi bên ngoài của đối tượng đó  <br><br>  Emulator được ưu tiên bất cứ khi nào nhóm kiểm thử cần kiểm tra hành vi bên ngoài của thiết bị di động như tính toán, thực hiện giao dịch, v.v.<br><br> Emulator được viết bằng ngôn ngữ cấp thấp<br><br> Emulator phù hợp hơn trong trường hợp debug <br><br> Thông thường, Emulator sẽ triển khai được toàn bộ phần mềm gốc| 
<br>

**2. Ưu điểm của kiểm thử trên thiết bị thật và Emulator/Simulator**<br>

| Vấn đề|  Kiểm thử trêngiả lập| Kiểm thử trên thiết bị thật|
| -------- | -------- | -------- |
| Ứng dụng dựa trên tình huống    | Có những tình huống cụ thể trong đó thời hạn để đưa ra kết quả kết quả thực tế ngắn và việc mua các thiết bị di động cần thiết là không thể. Do đó, cần phải sử dụng Emulator/Simulator trong những trường hợp này để kiểm tra các ứng dụng di động cần kiểm thử.     |Thiết bị thật cho phép người kiểm thử kiểm tra gần như tất cả các tình huống thời gian thực có thể được kiểm tra cho các ứng dụng di động. Các thiết bị này được vận hành bằng  tay và mô phỏng việc sử dụng thực tế. Họ cũng giúp đỡ trong tình huống bối cảnh thực tế: có dễ sử dụng ứng dụng trên tàu hay khi đi bộ trên đường không? Tình hình về ánh sáng mặt trời hay trong mưa? |
|Cảm giác gần gũi với các thiết bị cầm tay|Giao diện của các thiết bị di động tạo ra vấn đề, theo đó người kiểm thử không tự tin về việc đầu tư vào thiết bị di động để thử nghiệm, xem xét các hạn chế về ngân sách. Emulator/Simulator được thiết kế riêng cho loại tình huống này.|Thiết bị thực cho phép người kiểm tra kiểm tra các vấn đề về khả năng sử dụng như giao diện của ứng dụng, độ phân giải màu của màn hình, hình ảnh có sáng hay không trong cả điều kiện ngày và đêm, v.v.|
|Dễ sử dụng|Emulator/Simulator trong hầu hết các trường hợp là phần mềm mở và miễn phí, có thể dễ dàng tải xuống từ internet và sẵn sàng để kiểm thử.|Các thiết bị thật cho phép kiểm tra hiệu suất nghiêm ngặt như làm việc với ứng dụng hoạt động với thời gian thực trong 15 giờ liên tục,việc này không thể mô phỏng thành công bởi các trình giả lập.|
|Dễ dàng mở ứng dụng Web thông qua URL|Việc kiểm tra ứng dụng web sẽ dễ dàng hơn khi mở ứng dụng web. Người dùng chỉ cần sao chép và dán URL ứng dụng.|Thử nghiệm trên các thiết bị thật cung cấp nhiều hơn về độ tin cậy.|
|Chụp ảnh màn hình các tình huống xuất hiện lỗi|Việc chụp ảnh màn hình trên trình giả lập rất dễ dàng vì chúng ta chỉ cần sử dụng các tiện ích văn phòng của Microsoft.|Thử nghiệm với các thiết bị thật rất hữu ích về mặt kiểm tra khả năng tương tác.|
|Mô phỏng xác nhận các kịch bản pin|Emulator/Simulator không thể mô phỏng các vấn đề về pin.|Các thiết bị thật có thể dễ dàng thực hiện tương tự.|
|Xác nhận các gián đoạn|Emulator/Simulator không thể mô phỏng các gián đoạn cho SMS cũng như các cuộc gọi đến.|Các thiết bị trong thật có thể dễ dàng mô phỏng các gián đoạn.|
|Xác nhận hiển thị màu chính xác|Emulator/Simulator không thể mô phỏng chính xác màu màn hình của thiết bị khi thiết bị thực ở dưới ánh sáng mặt trời hoặc trong tối.|Các thiết bị thật có thể dễ dàng mô phỏng màu màn hình chính xác.|
|Xác nhận hiệu suất|Hiệu suất của Emulator/Simulator đôi khi có xu hướng chậm hơn các thiết bị gốc.|Các thiết bị gốc có xu hướng hoạt động nhanh hơn Emulator hoặc Simulator.|
|Mô phỏng vấn đề liên quan đến bộ nhớ|Bộ nhớ khả dụng tại Emulator/Simulator có xu hướng vượt xa các thiết bị thật, do đó, điều này có thể tạo ra quan niệm sai lầm cho người dùng sẽ sử dụng.|Mức lưu trữ bộ nhớ của các thiết bị có xu hướng thấp hơn nhiều so với trình giả lập|
<br>

**3. Nhược điểm của kiểm thử trên thiết bị thật và Emulator/Simulator**<br>
| Emulator/Simulator| Thiết bị thật | 
| -------- | -------- | 
| Emulator/Simulato không phải lúc nào cũng là loại giải pháp tốt nhất cho các tình huống, chẳng hạn như các giải pháp mà nhóm kiểm thử cần xác thực hiệu năng của ứng dụng trong một khoảng thời gian dài.  <br><br>Emulator/Simulato phù hợp chủ yếu cho một số loại trường hợp kiểm thử chức năng nhất định.  <br><br>Trình giả lập đôi khi không thể hỗ trợ một số loại ứng dụng và trong những trường hợp này, nhóm kiểm thử có thể cần phải mua các bản phần mềm không phải lúc nào cũng miễn phí nhưng đôi khi có thể tốn kém.<br><br> Trình giả lập đôi khi không thể hỗ trợ một số loại ứng dụng và trong những trường hợp này, nhóm kiểm thử có thể cần phải mua các bản phần mềm không phải lúc nào cũng miễn phí nhưng đôi khi có thể tốn kém. <br><br>Không phải tất cả các trình giả lập đều hỗ trợ toàn bộ ứng dụng di động. <br>Ví dụ: trình giả lập bada hỗ trợ Maemo (như Nokia N900), Symbian Touch (như Nokia N8) và Symbian không cảm ứng (như Nokia E71) nhưng nó không hỗ trợ các thiết bị di động khác như Android. Theo các chức năng kiểm tra ứng dụng có liên quan, bada không hỗ trợ kiểm tra duyệt web trực tiếp, nhưng nó cho phép người dùng kiểm tra và chỉ tạo các ứng dụng web và widget.| Các thiết bị thật thực sự tốn kém so với trình giả lập. Do đó, các dự án với vấn đề về ngân sách và thời gian có thể có rủi ro về lợi nhuận cũng như khả năng tồn tại của toàn bộ dự án.     <br><br>Có rất nhiều thiết bị di động từ Apple, Samsung đến Android và Symbian, v.v. Xem xét kích thước màn hình của các thiết bị di động này, rất khó để nhóm kiểm thử sắp xếp tất cả các loại thiết bị di động trong khi làm việc với một số lượng đáng kể các vấn đề liên quan đến ngân sách và dòng thời gian.<br><br>Các thiết bị di động thật khi được sử dụng trong giai đoạn phát triển để kiểm tra đơn vị và các mục đích tương tự có thể khó kết nối với IDE hơn trình giả lập và điều này gây ra các vấn đề rất lớn cho việc gỡ lỗi, và trong một dự án, với các ràng buộc về thời gian, điều này rất có thể cũng cản trở kết luận chung của dự án.<br><br> Để kiểm tra với các thiết bị thật, các thiết bị cần phải luôn được kết nối với cổng USB của máy. Vì vậy, nếu các cổng USB không hoạt động đúng, việc kiểm tra sẽ không thể thực hiện được. Nếu không cung cấp các biện pháp bảo mật đầy đủ, các thiết bị di động (nếu chúng có thể gây tốn kém như iPhone của Apple) có thể bị mất hoặc bị đánh cắp, do đó cản trở nỗ lực chung. Tăng cường an ninh cũng có thể tiếp tục để tăng chi tiêu chung liên quan đến dự án.<br><br>Người dùng phải nhập URL thủ công để mở ứng dụng web cần được kiểm tra. Để giải quyết vấn đề cụ thể này, người kiểm thử có thể cần tạo dấu trang điện thoại, dịch vụ URL ngắn hoặc gửi URL tới thiết bị di động bằng kết nối Bluetooth hoặc tạo trang web có chứa một số URL. Việc áp dụng các quy trình này sẽ đảm bảo rằng nhiều không gian bộ nhớ rất quan trọng có thể bị mất hết, do đó ảnh hưởng đến hiệu suất chung của ứng dụng.|

### III. Tổng kết
Xem xét vai trò quan trọng của các ứng dụng di động, ngày nay, trong cuộc sống hàng ngày của chúng ta, việc thử nghiệm các ứng dụng này sẽ phát triển, và do đó chúng đòi hỏi rất nhiều thử nghiệm để làm cho chúng hoạt động theo yêu cầu. Thử nghiệm trong cả trình giả lập cũng như các thiết bị thật là cần thiết để duy trì các tiêu chuẩn mạnh và đảm bảo chất lượng.

Cân nhắc cẩn thận cả ưu và nhược điểm của trình giả lập di động và thiết bị thật, sẽ rất đáng để đưa ra kết luận rằng giải pháp thử nghiệm di động tối ưu cho các doanh nghiệp là không bỏ tất cả trứng vào giỏ của thiết bị thật cũng như không đặt chúng vào giả lập nhưng đúng hơn những gì chúng ta cần là sự kết hợp tối ưu của cả hai .

Trình giả lập có thể được coi là rất phù hợp cho các giai đoạn phát triển ứng dụng ban đầu.

Tuy nhiên, để tránh kịch bản tốn kém khi phát hành ứng dụng quan trọng cho doanh nghiệp có khiếm khuyết, doanh nghiệp cần đảm bảo rằng họ thực hiện phần chính của thử nghiệm di động trên thiết bị thực trước khi ứng dụng đi vào sản xuất.

Mỗi tổ chức cần lập chiến lược và lập kế hoạch cẩn thận để xác định ở giai đoạn nào để giới thiệu các thiết bị thật. Họ cũng cần quyết định có bao nhiêu thiết bị đủ để đáp ứng nhu cầu thị trường và đâu là lựa chọn tốt nhất có thể áp dụng để quản lý các thiết bị đó.

Thực tiễn tốt nhất sẽ chỉ ra rằng phát triển thực tế nên sử dụng trình giả lập (và một vài thiết bị cầm tay thực sự cần thiết) để tăng tốc độ gỡ lỗi của ứng dụng trong giai đoạn mã hóa, trong khi sự tỉnh táo, kiểm tra khói , hiệu suất, khả năng tương tác và kiểm tra hồi quy nên được thực hiện trên thiết bị cầm tay.

Đây cũng là một thực tiễn mới nổi để đảm bảo rằng các nhà phát triển sử dụng trình giả lập để thực hiện nhanh trong giai đoạn phát triển, trong khi đó nhóm thử nghiệm nên thử nghiệm với thiết bị thật trong giai đoạn thử nghiệm để đảm bảo các mục tiêu và chất lượng tổng thể . Để tiết kiệm chi phí, họ có thể cân nhắc sử dụng các công cụ kiểm tra di động ảo. Các dịch vụ này cung cấp cho nhà phát triển để thử nghiệm ứng dụng của họ trên nhiều thiết bị cầm tay sử dụng các mạng di động khác nhau có vị trí địa lý trên toàn thế giới (hữu ích cho các ứng dụng sử dụng GPS). Các dịch vụ như vậy được cung cấp trên cơ sở hàng giờ và rất hiệu quả so với việc mua điện thoại mới.


**Tham khảo:**<br>
Nguồn: https://www.guru99.com/real-device-vs-emulator-testing-ultimate-showdown.html