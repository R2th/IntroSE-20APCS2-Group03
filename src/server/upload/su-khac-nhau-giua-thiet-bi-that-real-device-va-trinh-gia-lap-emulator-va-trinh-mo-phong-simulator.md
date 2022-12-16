# 1. Thiết bị test là gì?
Kiểm thử trên thiết bị thực cho phép chạy các ứng dụng di động và kiểm tra chức năng của thiết bị. Kiểm thử trên thiết bị thực đảm bảo rằng ứng dụng sẽ hoạt động trơn tru trên thiết bị cầm tay của khách hàng.
![](https://images.viblo.asia/8ae3ead5-8a2f-4ef6-8b75-34e7f1c90a53.png)
# 2. Trình giả lập (Emulator) là gì?
Emulator là một chương trình phần mềm cho phép mobile bắt chước các tính năng của máy tính hoặc phần mềm di động khác mà cần mô phỏng bằng cách cài đặt chúng vào máy tính hoặc di động.
![](https://images.viblo.asia/a02dc2e6-6fcf-416b-a072-e3cd456e106e.png)
# 3. Sự khác nhau giữa Simulator và Emulator dựa trên kiểm thử
Cả Emulator và Simulator đều là thiết bị ảo. Một thiết bị ảo không phải là điện thoại thật mà là một phần mềm có chức năng tương tự như điện thoại thật (ngoại trừ một vài chức năng như máy ảnh).
Nhưng có một số khác biệt giữa Emulator và Simulator như sau:
| Simulator | Emulator | 
| -------- | -------- |
|Mục tiêu: mô phỏng trạng thái bên trong càng gần với trạng thái bên trong của một đối tượng trong|Mục tiêu mô phỏng hoặc bắt chước càng gần càng tốt hành vi bên ngoài của một đối tượng|
|Được ưu tiên bất cứ khi nào nhóm thử nghiệm cần kiểm tra hành vi bên trong của thiết bị di động như phần cứng bên trong, firmware, v.v.|Được ưu tiên bất cứ khi nào nhóm thử nghiệm cần kiểm tra hành vi bên ngoài của thiết bị di động như tính toán, thực hiện giao dịch, v.v.|
|Được viết bằng ngôn ngữ cấp cao.|Được viết bằng hợp ngữ (Assembly Language)|
|Khó khăn trong việc debug lỗi |Phù hợp, dễ dàng hơn khi debug lỗi|
|chỉ implement lại một phần của phần mềm gốc.|Implement lại toàn bộ phần mềm gốc|

# 4. Ưu điểm của kiểm thử dựa trên device thật và Emulator/Simulator
| Vấn đề | Kiểm thử bằng Emulator | Kiểm thử bằng device thật |
| -------- | -------- | -------- |
| Các tình huống dựa trên ứng dụng | Trong thực tế sẽ xảy ra tình huống: thời gian thực hiện ngắn và việc mua device cần thiết là không thể. Do đó, cần sử dụng emulator/simulator trong trường hợp này để kiểm thử ứng dụng | Thiết bị thực cho phép tester kiểm tra gần như tất cả các tình huống cho các ứng dụng di động. Các thiết bị này được vận hành bằng ngón tay và mô phỏng việc sử dụng thực tế, giúp hỗ trợ kiểm tra trong các tình huống bối cảnh thực tế: có dễ sử dụng ứng dụng trên tàu hay khi đi bộ trên đường không? Tình hình về ánh sáng mặt trời hay trong mưa? |
| Các thiết bị cầm tay sẽ thân thiện hơn | Trong thực tế do ngân sách ít và giao diện thiết bị hay gặp lỗi nên việc đầu tư mua thiết bị để kiểm thử bị hạn chế. Nên Emulator/simulator được sử dụng để giải quyết tình huống này. | Thiết bị thực cho phép tester kiểm tra ngay cả các vấn đề về tính khả dụng như giao diện của ứng dụng, độ phân giải màu của màn hình, hình ảnh có sáng hay không trong cả điều kiện ngày và đêm, v.v. |
|Dế sử dụng | Emulator/simulator trong hầu hết các trường hợp là phần mềm mở và miễn phí, có thể dễ dàng tải xuống từ Internet và sẵn sàng để kiểm thử. | Các thiết bị thực cho phép kiểm tra các vấn đề về hiệu suất nghiêm ngặt như làm việc với ứng dụng trong 15 giờ liên tục, vấn đề này thì các trình mô phỏng không thể thực hiện được |
| Dễ dàng mở ứng dụng Web thông qua URL | Việc kiểm tra ứng dụng web sẽ dễ dàng hơn khi mở ứng dụng web. Người dùng chỉ cần sao chép và dán URL ứng dụng. | Thử nghiệm trên các thiết bị thực cần nhiều hơn về độ tin cậy. |
| Capture màn hình các tình huống xuất hiện lỗi | Việc chụp ảnh màn hình qua trình giả lập rất dễ dàng vì chỉ cần sử dụng các tiện ích văn phòng của Microsoft. | Thử nghiệm với các thiết bị trong thế giới thực rất hữu ích về mặt kiểm tra khả năng tương tác. |
| Simulator trong việc xác nhận các kịch bản pin | Emulator/simulator không thể mô phỏng các vấn đề về pin. | Device thật có thể dễ dàng thực hiện các kịch bản pin |
| Xác nhận các tình huống ngắt  (interrupt) | Emulator/simulator không thể mô phỏng các tình huống ngắt như nhận SMS, các cuộc gọi đến | Device thật có thể dễ dàng mô phỏng các tình huống ngắt |
| Xác nhận hiển thị màu chính xác | Emulator/simulator không thể mô phỏng / mô phỏng chính xác hiện thị màu của thiết bị khi thiết bị ở dưới ánh sáng mặt trời hoặc trong tối. | Device thật có thể dễ dàng mô phỏng màn hình màu chính xác. |
| Xác nhận hiệu suất | Hiệu suất của Emulator/simulator có xu hướng chậm hơn các device thật | Các device thật có xu hướng hoạt động nhanh hơn  Emulator/simulator. |
| Mô phỏng các vấn đề liên quan đến bộ nhớ | Bộ nhớ khả dụng của Emulator/simulator có xu hướng vượt xa các device thật, do đó, điều này có thể tạo ra quan niệm sai lầm cho người dùng làm các xác nhận tương tự  | Mức lưu trữ bộ nhớ của các thiết bị có xu hướng thấp hơn nhiều so với Emulator, do đó có thể xác nhận chính xác các vấn đề liên quan đến bộ nhớ |
# 5. Nhược điểm của Emulator/Simulator và device thật.
| Emulators/ Simulators | Thiết bị thật |
| -------- | -------- | -------- |
| Emulator/simulator không phải lúc nào cũng là giải pháp tốt nhất cho các kịch bản, chẳng hạn như các kịch bản mà nhóm thử nghiệm cần xác thực hiệu năng của ứng dụng trong một khoảng thời gian dài. | Các thiết bị thật tốn kém hơn nhiều so với Emulator/simulator . Do đó, các dự án dưới sự ràng buộc về ngân sách và thời gian có thể có rủi ro về lợi nhuận cũng như khả năng tồn tại của toàn bộ dự án. | 
| Emulator/simulator phù hợp chỉ phù hợp cho 1 số trường hợp kiểm thử chức năng nhất định | Có rất nhiều loại thiết bị di động của Apple, Samsung, Android và Symbian, v.v. Xem xét sẽ sử dụng các thiết bị nào là khó cho team kiểm thử khi có các ràng buộc liên quan đến ngân sách và timeline | 
| Emulator/simulator đôi khi không thể hỗ trợ một số loại ứng dụng nhất định và trong những trường hợp này, nhóm thử nghiệm có thể cần phải mua các phiên bản phần mềm không phải lúc nào cũng miễn phí và đôi khi có thể tốn kém. | Các device thật khi được sử dụng trong giai đoạn phát triển để kiểm thử và dùng vào các mục đích tương tự có thể khó kết nối với IDE hơn emulator và điều này gây ra các vấn đề rất lớn để gỡ lỗi và trong một dự án, với các ràng buộc về timeline, điều này rất có thể cũng cản trở tiến trình của dự án. | 
| Không phải tất cả các emulator/simulator đều hỗ trợ toàn bộ các ứng dụng di động. Ví dụ: trình giả lập bada hỗ trợ Maemo (như Nokia N900), Symbian Touch (như Nokia N8) và Symbian không cảm ứng (như Nokia E71) nhưng nó không hỗ trợ các thiết bị di động khác như Android. Các chức năng kiểm tra ứng dụng có liên quan, bada không hỗ trợ kiểm tra duyệt web trực tiếp, nhưng nó cho phép người dùng kiểm tra và chỉ tạo các ứng dụng web và widget. | Để kiểm tra với device thật, các thiết bị cần phải luôn được kết nối với cổng USB của máy. Vì vậy, nếu các cổng USB không hoạt động đúng, việc kiểm tra sẽ không thể thực hiện được. Nếu không có các biện pháp bảo mật đầy đủ, các thiết bị di động (như iPhone của Apple) có thể bị mất hoặc bị đánh cắp, do đó ảnh hưởng đến dự án. Việc tăng cường an ninh cũng có thể tăng chi phí của dự án | 
|     | Người dùng phải nhập URL thủ công để mở ứng dụng web cần kiểm tra. Để giải quyết vấn đề này, tester cần tạo các bookmark, URL ngắn hoặc gửi URL tới thiết bị di động bằng kết nối Bluetooth hoặc tạo trang web có chứa một số URL. Việc áp dụng các quy trình này sẽ đảm bảo rằng bộ nhớ không bị đầy, do đó ảnh hưởng đến hiệu suất chung của ứng dụng. |  
# 6. Kết luận
Do vai trò quan trọng của các ứng dụng di động, ngày nay, trong cuộc sống hàng ngày của chúng ta, việc kiểm thử các ứng dụng này sẽ rất phát triển, và do đó hỏi rất nhiều thử nghiệm để làm cho các ứng dụng hoạt động theo yêu cầu. Thử nghiệm bằng Emulator/simulator cũng như các device thật là cần thiết để duy trì các tiêu chuẩn và đảm bảo chất lượng.

Việc cân nhắc cẩn thận cả ưu và nhược điểm của emulator và device thật, giải pháp thử nghiệm di động tối ưu cho các doanh nghiệp là sự kết hợp tối ưu của cả hai.

Emulator có thể được coi là rất phù hợp cho các giai đoạn phát triển ban đầu của ứng dụng.

Tuy nhiên, để tránh phát sinh chi phí tốn kém khi ứng dụng đã release mà có lỗi, doanh nghiệp cần đảm bảo rằng ứng dụng đã được kiểm thử trên device thật trước khi release.

Mỗi tổ chức cần lập chiến lược và lập kế hoạch để xác định ở giai đoạn nào thì giới thiệu các device thật. Họ cũng cần quyết định có bao nhiêu thiết bị là đủ để đáp ứng nhu cầu thị trường và đâu là lựa chọn tốt nhất có thể áp dụng để quản lý các thiết bị đó.

Thực tiễn chỉ ra rằng phát triển thực tế nên sử dụng emulator (và một vài thiết bị cầm tay thực sự) để tăng tốc độ gỡ lỗi của ứng dụng trong giai đoạn coding, còn trong khi thực hiện sanity test, somke test, performance test, khả năng tương tác và Kiểm tra hồi quy nên được thực hiện trên các device thật.

Và thực tế cũng chỉ ra rằng các nhà phát triển sẽ sử dụng emulator để thực hiện nhanh trong giai đoạn phát triển, trong khi đó nhóm thử nghiệm nên kiểm thử với thiết bị thực trong giai đoạn kiểm thử để đảm bảo các target và mục tiêu chất lượng tổng thể. Để tiết kiệm chi phí, họ có thể xem xét sử dụng các công cụ Kiểm tra Di động ảo. Các dịch vụ này cung cấp cho nhà phát triển để kiểm thử ứng dụng trên nhiều thiết bị cầm tay sử dụng các mạng di động khác nhau có vị trí địa lý trên toàn thế giới (hữu ích cho các ứng dụng sử dụng GPS). Các dịch vụ như vậy được cung cấp với chi phí tính theo giờ và rất hiệu quả so với việc mua điện thoại mới.

Link tham khảo: https://www.guru99.com/real-device-vs-emulator-testing-ultimate-showdown.html