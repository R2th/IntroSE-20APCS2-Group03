# Như thế nào là thiết bị test thật?

Kiểm thử trên các thiết bị thật cho phép QA chạy các ứng dụng di động của mình và kiểm tra chức năng trên thiết bị đó. Test trên thiết bị thật giúp chúng ta đảm bảo rằng ứng dụng của mình sẽ hoạt động trơn tru trên các thiết bị cầm tay của khách hàng.
Thiết bị test thật chính là các thiết bị mobile chúng ta sử dụng hằng ngày - sẽ được khách hàng sử dụng để cài đặt ứng dụng mà ta phát triển lên đó và sử dụng.

![](https://images.viblo.asia/4d32b50c-2a36-437e-8dea-23bc0d0cf393.jpg)

# Emulator là gì?

Emulator hay còn được gọi là “ Trình giả lập” - là một chương trình phần mềm cho phép thiết bị điện thoại di động của bạn bắt chước các tính năng của một máy tính hoặc phần mềm di động khác mà bạn muốn chúng bắt chước bằng cách cài đặt vào máy tính hoặc thiết bị di động của mình.

![](https://images.viblo.asia/8fcad394-3a23-417a-9abe-19d05847d409.jpg)

# Sự khác biệt giữa emulator và simulator

Cả emulator và Simulator đều là các thiết bị ảo tức là chúng không phải là 1 thiết bị vật lý thực sự mà là một phần mềm cung cấp các chức năng giống như điện thoại thực sự ( ngoại trừ 1 số chức năng như máy ảnh) 
Nhưng có một số khác biệt giữa emulator và simulator:



| Simulator | Emulator | 
| -------- | -------- | 
| Mục đích của simulator là mô phỏng trạng thái bên trọng của đối tượng giống nhất có thể. Càng giống càng tốt     | Emulator nằm mục đích mô phỏng hoặc bắt chước hành vi bên ngoài của đối tượng giống nhất có thể    |
| Simulator thích hợp để QA kiểm tra các biểu hiện bên ngoài của thiết bị di động: máy tính, các giao tiếp bên ngoài ...     | Emulator thích hợp cho QA kiểm thử các hành vi bên trong của thiết bị di động như phần cứng nội bộ, chương trình nội bộ...     | 
| Simulator được viết bằng ngôn ngữ cấp cao    | Emulator được viết bằng ngôn ngữ máy assembly ( ngôn ngữ bậc thấp nhất )     | 
| Việc mô phỏng simulator có thể gặp khó khăn trong việc gỡ lỗi    | Emulator phù hợp hơn khi nói đến mục đích gỡ lỗi     | 
| Trình simulator chỉ là một phần trong việc thực hiện lại phần mềm gốc | Thường thì một trình emulator được hiểu như một sự tái triển khai hoàn chỉnh của phần mềm gốc |

# Ưu điểm của việc testing dựa trên thiết bị thực tế và emulator



| Vấn đề | Kiểm thử trên emulator | Kiểm thử trên thiết bị thực |
| -------- | -------- | -------- |
| Việc ứng dụng theo tình huống     | Có những tình huống mà thời hạn để thực hiện và báo cáo kết quả gấp nhưng việc mua mới thiết bị thực lại không kịp, do đó cần phải sử dụng trình emulator để kiểm tra ứng dụng di động mà cần thiết     | Thiết bị kiểm thử thật cho phép QA kiểm tra được hầu hết những thao tác thực tế mà người dùng sẽ sử dụng: sử dụng thiết bị mobile bằng ngón tay, hay mô phỏng các thao tác thực sự. Có những tình huống chỉ có thể kiểm thử bằng thiết bị thật. Hãy hình dung rằng chúng ta không thể kiểm tra một ứng dụng trên tàu hỏa khi mà đang đi bộ. Hoặc không thể kiểm tra mức độ gay gắt của ánh sáng mặt trời nếu giả lập ở trời mưa.     |
| Cảm giác gần gũi với thiết bị      | Một số trường hợp đòi hỏi các thiết bị di động có gam màu rộng, độ phân giải cao, và đó là vấn đề về việc phải quyết định xem thiết bị di động nào là phù hợp để đưa vào kiểm thử cũng như ngân quỹ phải bỏ ra để đầu tư thiết bị. Trong trường hợp này thì việc sử dụng emulator là vô cùng hợp lý    | Thiết bị thực cho phép QA kiểm tra các vấn đề về khả năng sử dụng cũng như giao diện của ứng dụng, độ phân giải màu của màn hình, cho dù hình ảnh sáng hay không trong cả điều kiện ban ngày và ban đêm.     |
| Tính sẵn có     | Trình emulator/ simulator hầu hết là các phần mềm mở và miễn phí, có thể tải xuống rất dễ dàng từ internet và luôn sẵn sàng để đưa vào kiểm thử    | Các thiết bị thật cho phép kiểm tra các vấn đề liên quan đến hiệu năng sử dụng ví dụ như việc làm việc với ứng dụng truyền tải thời gian trong 15 giờ liên tục mà không thể mô phỏng thành công bởi các trình giả lập     |
| Dễ mở ứng dụng web thông qua url     | Việc kiểm thử ứng dụng web trở nên dễ dàng hơn khi mở ứng dụng từ web. Và trên emulator, người dùng chỉ cần sao chép và dán url của ứng dụng vào vào để mở    | Kiểm thử trên thiết bị thật thì sẽ có độ tin cậy cao hơn     |
| Chụp ảnh màn hình nếu có bug     | Rất dễ và đơn giản để chụp ảnh màn hình từ emulator bởi chúng ta chỉ cần sử dụng các tiện ích văn phòng của microsoft     | Test trên các thiết bị thực rất hữu dụng trong việc thử nghiệm khả năng tương tác     |
| Các case về các vấn đề với pin     | Không thể mô phỏng các vấn đề về pin     | Thiết bị thực thì dễ dàng thực hiện những case tương tự    |
| Xác nhận các trường hợp đến gây gián đoạn     | Emulator không thể mô phỏng các gián đoạn khi đến từ SMS hay các cuộc gọi đến     | Các thiết bị thật thì rất đơn giản để thực hiện các case bị gián đoạn khi SMS đến hay cuộc gọi đến bị ngắt     |
| Xác nhận chính xác màu hiển thị     | Emulator không thể mô tả chính xác màu được hiển thị trên thiết bị ở những môi trường ánh sáng không lí tưởng: ánh sáng mặt trời chói hoặc trong bóng tối     | Thiết bị thực dĩ nhiên có thể mô phỏng những điều bên     |
| Hiệu suất     | Hiệu suất làm việc của emulator có vẻ chậm hơn so với các thiết bị thực trong cùng 1 khoảng thời gian     | Các thiết bị thực có xu hướng làm việc nhanh hơn các giả lập     |
| Các vấn đề về bộ nhớ     | Bộ nhớ của máy simulator/ emulator có xu hướng lớn hơn, nhiều hơn so với các thiết bị thực. Do đó có thể gây ra những sai lệch khi kiểm thử     | Mức lưu trữ bộ nhớ của các thiết bị thực có xu hướng thấp hơn nhiều so với bộ giả lập    |

# Nhược điểm của Emulator và thiết bị thực



| Emulator/ Simulator | Real Device | 
| -------- | -------- | 
| Trình giả lập không phải lúc nào cũng là giải pháp tốt nhất cho các kịch bản kiểm thử ví dụ như việc test performance trong một khoảng thời gian dài     | Sử dụng các thiết bị thực luôn tốn kém hơn so với các giả lập. Do đó đối với các dự án có sự hạn chế về ngân quỹ và thời gian có thể gây rủi ro về khả năng sinh lời cũng như tính khả thi của cả dự án     | 
| Chỉ phù hợp với kiểu kiểm thử chức năng nhất định nào đó    | Có rất nhiều loại thiết bị di động: từ Apple đến Samsung cho các hệ điều hành khác nhau: Android, Symbian … Nếu xem xét trên phạm vi rất rộng của các loại thiết bị thì bài toán sắp xếp tất cả các loại thiết bị trong khi làm việc là rất lớn    | 
| Trình emulator đôi khi có thể sẽ không support một số kiểu ứng dụng nào đó, và khi đó thì người kiểm thử phải đi mua thêm các bản chắp vá và điều này có thể khá là tốn kém và mất thời gian    | Các thiết bị thực tế thì khó kết nối với IDE hơn là các trình giả lập, do đó gây khó khăn trong vấn đề gỡ lỗi, ảnh hưởng đến tốc độ của dự án và việc tìm ra lỗi.     |
| Không phải tất cả các trình giả lập đều hỗ trợ âm thanh chuẩn từ các ứng dụng di động. Ví dụ: bộ mô phỏng bada hỗ trợ Maemo( nokia N900), Symbian Touch ( Nokia N8), Symbia không cảm ứng ( Nokia E71) nhưng nó không hỗ trợ các thiết bị di động khác như Android.      | Để kiểm thử với các thiết bị thực, các thiết bị cần phải luôn được kết nối với cổng USB của máy. Vì vậy, nếu các cổng USB không hoạt động đúng cách, thì việc kiểm thử sẽ không thực hiện được. Nếu không cung cấp các biện pháp bảo mật thích hợp, các thiết bị di động( nếu chúng đắt như iPhone cảu Apple) có thể bị mất hoặc bị đánh cắp, do đó cản trở nỗ lực tổng thể. Tăng cường an ninh cũng có thể tiếp tục tăng tổng chi phí liên quan đến dự án    | 
| Text     | Người dùng phải nhập thủ công URL để mở ứng dụng web cần thiết khi kiểm thử. Để giải quyết vấn đề cụ thể này, người kiểm thử có thể tạo dấu trang trên điện thoại, dịch vụ URL ngắn hoặc gửi URL tới thiết bị di động bằng kết nối Bluetooh hoặc tạo trang web chứ một số URL. Việc áp dụng các thủ tục này sẽ đảm bảo rằng rất nhiều không gian bộ nhớ quan trọng có thể bị ăn mòn do đó ảnh hưởng đến hiệu suất tổng thể của ứng dụng    | 

# Kết luận:

![](https://images.viblo.asia/c67d198e-8c1d-4097-a464-f177353aa118.jpg)

Ngày nay, vai trò của các ứng dụng di động là rất quan trọng, việc kiểm thử và phát triển các ứng dụng di động đòi hỏi cao và gắt gao để đảm bảo được chất lượng và sự hoạt động của chúng. 
Chúng ta luôn cần phải cẩn thận khi cân nhắc xem nên dùng thiết bị thực hay các trình giả lập. Thật khó để kết luận rằng phương pháp nào là tối ưu. Chúng ta nên kết hợp cả hai phương pháp để đạt được kết quả tốt nhất trong công việc
Các trình giả lập có thể được coi là rất phù hợp cho các giai đoạn phát triển giai đoạn đầu của dự án.
Tuy nhiên, để tránh những bug quan trọng và nguy hiểm trước khi release ứng dụng ra thị trường thì các nhà sản xuất phải chắc chắn rằng các ứng dụng đã được thử nghiệm trên thiết bị thật tế.
Mỗi tổ chức cần lập chiến lược và lập kế hoạch cẩn thận để xác định giai đoạn giới thiệu thiết bị thực, họ cũng cần phải quyết định có bao nhiêu thiết bị đủ để đáp ứng nhu cầu thị trường và lựa chọn nào tốt nhất có thể áp dụng để quản lý các thiết bị đó.

Dịch từ link: https://www.guru99.com/real-device-vs-emulator-testing-ultimate-showdown.html