### Kiểm thử trên thiết bị thật

Kiểm thử trên thiết bị thật cho phép chúng ta chạy các ứng dụng di động của mình và kiểm thử chức năng của nó. Việc thực hiện kiểm thử trên thiết bị thật đảm bảo với bạn rằng ứng dụng của bạn sẽ hoạt động trơn tru trên các thiết bị của khách hàng. Bởi vì khi không được test trên một số thiết bị hạn chế, thì việc test trên device thật của bạn cũng sẽ nhận được một ứng dụng tốt hơn khi không được kiểm tra trên bất cứ một thiết bị thật nào.

![](https://images.viblo.asia/fc97a07d-45cf-42b7-9822-3ef5c6e1b455.jpg)

###  Kiểm thử trên thiết bị giải lập/mô phỏng 

#### 1. Emulator là gì?
Emulator là một phần mềm giả lập cho phép điện thoại di động của bạn được mô phỏng đầy đủ các tính năng của một máy tính hoặc phần mềm di động khác bằng cách cài đặt chúng vào máy tính hoặc thiết bị di động của bạn. Tuy nhiên nó chỉ giống với device thật ở mức tương đối,  nên sẽ có những bug chạy trên emulator thì không bị bug nhưng khi test thật trên device thì lại bị bug .

![](https://images.viblo.asia/95984a40-01c6-42f4-bf4e-38f0c020098c.png)

#### 2. Simulator là gì?
Simulator là một ứng dụng mô phỏng di động, nó là một ứng dụng ít phức tạp , nó mô phỏng một số hành vi của một thiết bị, nhưng không bắt chước phần cứng và không hoạt động trên hệ điều hành thật. Simulator sẽ tạo ra được ứng dụng mô phỏng giống các sản phẩm mobile đến từng chi tiết, giống thật nhất có thể, những công cụ này đơn giản và ít hữu ích hơn trình giả lập.

![](https://images.viblo.asia/5022c130-0a6f-48e2-89b0-38657dc5f378.png)

#### 3. Sự khác biệt giữa Emulator và Simulator trong kiểm thử

Cả Emulators và Simulators đều là các thiết bị ảo vậy thì sự khác biệt giữa Emulator và Simulator trong kiểm thử là gì ? 

| Simulator | Emulator |
| -------- | -------- | 
| Mục tiêu của simulator là mô phỏng trạng thái bên trong của một đối tượng.     | Mục tiêu của emulator là mô phỏng hoặc bắt chước hành vi bên ngoài của đối tượng càng gần càng tốt.     | 
| Simulator thích hợp khi cần kiểm tra hành vi bên ngoài của thiết bị di động như tính toán, thực hiện giao dịch và .... | Emulator thích hợp khi cần kiểm tra hành vi nội bộ của thiết bị di động như phần cứng, phần cứng nội bộ của nó và .... |
| Simulator được viết bằng ngôn ngữ cao cấp. | Emulator được viết bằng các ngôn ngữ máy. |
| Simulator có thể gây ra khó khăn trong việc debug | Emulator thì lại phù hợp hơn trong việc debug |
| Simulator chỉ là một phần được xây dựng lại từ phần mềm gốc | Emulator là một sự tái triển khai hoàn chỉnh của phần mềm gốc. |

### Ưu/ nhược điểm giữa việc sử dụng thiết bị thật và thiết bị giả lập/ mô phỏng

#### 1. Ưu điểm của thiết bị thật, Simulator và Emulator trong việc kiểm thử.


| Vấn đề | Kiểm thử trên máy ảo | Kiểm thử trên thiết bị thật |
| -------- | -------- | -------- |
| Ứng dụng dựa trên tình huống | Có những tình huống cụ thể mà việc mua thiết bị để đáp ứng như cầu không thể đáp ứng như : kinh tế , phiên bản , số lượng ... Vì vậy có thể cần phải sử dụng trình giả lập/mô phỏng trong các trường hợp như thế này. | Thiết bị thật cho phép người kiểm thử kiểm tra gần như tất cả các tình huống thời gian thật có thể được kiểm tra cho các ứng dụng di động. Các thiết bị này được mô phỏng cách sử dụng thực tế. Nó cũng hỗ trợ được trong hoàn cảnh thực tế như: có dễ sử dụng ứng dụng khi trên tàu hoặc khi đi bộ không? Có sử dụng được bên ngoài ánh sáng mặt trời hay khi mưa không? ...|
| Cảm giác dễ tương tác với những thiết bị thật | Các giao diện của các thiết bị di động tạo ra các vấn đề, theo đó những người kiểm thử không biết chính xác nên mua thiết bị thực nào để test và cần xem xét các ràng buộc về ngân sách. Trình giả lập/mô phỏng được thiết kế riêng cho loại tình huống này. | Thiết bị thật cho phép người kiểm thử kiểm tra ngay cả các vấn đề khả năng sử dụng như giao diện của ứng dụng, độ phân giải màu của màn hình, cho dù hình ảnh sáng hay không trong cả điều kiện ban ngày lẫn ban đêm ...|
| Tính năng sẵn có | Trình giả lập/mô phỏng trong hầu hết các trường hợp là phần mềm mở và miễn phí, có thể tải xuống rất dễ dàng từ Internet và sẵn sàng để được kiểm tra. | Các thiết bị thật cho phép các vấn đề kiểm tra hiệu năng nghiêm ngặt như làm việc với ứng dụng truyền tải thời gian thực trong 15 giờ liên tục mà không thể mô phỏng được khi sử dụng các trình giả lập. |
| Dễ mở một ứng dụng web thông qua URL | Việc kiểm thử một ứng dụng web sẽ trở nên dễ dàng hơn. Người dùng chỉ cần sao chép và dán URL ứng dụng. | Việc thực hiện kiểm thử trên các thiết bị thật sẽ có độ tin cậy cao hơn. |
| Chụp ảnh màn hình của các tình huống có lỗi xuất hiện | Chụp ảnh màn hình trên trình mô phỏng rất dễ dàng vì chỉ cần sử dụng các tiện ích văn phòng của Microsoft. | Việc test với các thiết bị thật là rất hữu ích về test khả năng tương tác. |
| Mô phỏng chính xác vấn đề về pin | Trình giả lập/mô phỏng không thể mô phỏng các vấn đề về pin. | Các thiết bị thật có thể dễ dàng thực hiện các tình huống này. |
| Xác nhận các tác động cắt ngang tương tác | Trình giả lập/mô phỏng không thể mô phỏng các tương tác ngắt như SMS đến, những cuộc gọi đến... | Các thiết bị thật có thể dễ dàng mô phỏng các trường hợp đó . |
| Xác nhận hiển thị màu chính xác | Trình mô phỏng/giả lập không thể mô phỏng đúng ,mô phỏng hiển thị màu chính xác của thiết bị khi thiết bị thật ở trong ánh sáng mặt trời hoặc màu đen. | Các thiết bị thực có thể dễ dàng mô phỏng các màn hình màu chính xác. |
| Xác nhận hiệu suất | Hiệu suất của trình giả lập có xu hướng chậm hơn so với các thiết bị thực | Các thiết bị thật có xu hướng hoạt động nhanh hơn so với trình giả lập hoặc trình mô phỏng. |

#### 2. Nhược điểm của thiết bị thật và trình giả lập 


| Trình giả lập (Emulators / Simulators) | Thiết bị thật |
| -------- | -------- |
| Trình giả lập/mô phỏng không phải lúc nào cũng là giải pháp tốt nhất cho các kế hoạch như các câu lệnh trong đó nhóm kiểm thử cần xác thực hiệu suất của ứng dụng trong một khoảng thời gian dài hơn. | Các thiết bị thực tế là tốn kém so với giả lập/mô phỏng. Do đó các dự án theo ngân sách cố định và hạn chế về thời gian có thể gây rủi ro về khả năng sinh lời cũng như tính khả thi của tổng thể dự án. |
| Trình giả lập/mô phỏng phù hợp chủ yếu đối với một số loại trường hợp kiểm thử chức năng nhất định. | Có rất nhiều loại thiết bị di động từ các hãng như Apple hay Samsung cho Android và Symbian, ... Xem xét phạm vi rộng của các thiết bị di động này, rất khó cho nhóm kiểm thử sắp xếp tất cả các loại thiết bị di động trong khi làm việc với số ngân sách lớn và các ràng buộc liên quan đến thời gian.|
| Trình mô phỏng/giả lập có thể không hỗ trợ một số loại ứng dụng nhất định và trong những trường hợp này nhóm kiểm thử có thể cần phải mua các bản sửa lỗi phần mềm có thể không phải lúc nào cũng miễn phí nhưng đôi khi có thể tốn kém. | Các thiết bị di động thực tế khi được sử dụng trong giai đoạn phát triển để thực hiện unit test và các mục đích tương tự có thể khó kết nối với IDE hơn là giả lập và điều này gây ra các vấn đề lớn cho việc gỡ lỗi. |
| Không phải tất cả các mô phỏng / giả lập đều hỗ trợ âm thanh hoàn chỉnh của các ứng dụng di động. Ví dụ, bộ mô phỏng bada hỗ trợ Maemo (như Nokia N900), Symbian Touch (như Nokia N8) và Symbian không cảm ứng (như Nokia E71) nhưng nó không hỗ trợ các thiết bị di động khác như Android. Theo như các chức năng kiểm tra ứng dụng có liên quan, bada không hỗ trợ kiểm tra duyệt web trực tiếp nhưng nó cho phép người dùng kiểm tra và chỉ tạo các ứng dụng web và widget.| Để kiểm tra với các thiết bị thực, các thiết bị cần phải luôn được kết nối với cổng USB của máy. Vì vậy, nếu các cổng USB không hoạt động đúng cách, kiểm thử sẽ không thể thực hiện được. Nếu không cung cấp các biện pháp bảo mật thích hợp, các thiết bị di động (nếu chúng có giá đắt như iPhone của Apple) có thể bị mất hoặc bị đánh cắp, do đó cản trở nỗ lực tổng thể. Tăng cường an ninh cũng có thể tiếp tục tăng tổng chi phí liên quan đến dự án. |
|  | Người dùng phải nhập thủ công URL để mở ứng dụng web cần thiết để kiểm tra. Để giải quyết vấn đề cụ thể này, người kiểm tra có thể cần tạo dấu trang trên điện thoại, dịch vụ URL ngắn hoặc gửi URL tới thiết bị di động bằng kết nối Bluetooth hoặc tạo trang web chứa một số URL. Việc áp dụng các thủ tục này sẽ đảm bảo rằng rất nhiều không gian bộ nhớ rất quan trọng có thể bị ăn mòn do đó ảnh hưởng đến hiệu suất tổng thể của ứng dụng. |

#### Vậy cần sử dụng chúng như nào là hợp lý ?

Ứng dụng trên thiết bị di động ngày càng phát triển, đi đôi với nó là quá trình phát triển, kiểm thử phần mềm để làm cho ứng dụng hoạt động theo mục đích và yêu cầu của người dùng. Vì các thiết bị thật là cần thiết để duy trì các tiêu chuẩn và đảm bảo chất lượng.

Cẩn thận cân nhắc giữa ưu và nhược điểm của thiết bị mô phỏng/giả lập và thiết bị thực, sẽ tốt nhất khi kết hợp cả 2 để tận dụng ưu điểm từ chúng.
Các trình giả lập có thể được coi là rất phù hợp cho các giai đoạn phát triển ứng dụng ban đầu.

Tuy nhiên, để tránh tình huống tốn kém khi phát hành một ứng dụng kinh doanh quan trọng với nhiều lỗi, các doanh nghiệp cần đảm bảo rằng họ thực hiện phần lớn thử nghiệm trên thiết bị thực trước khi ứng dụng đi vào sản xuất.

Mỗi tổ chức cần lập chiến lược và lập kế hoạch cẩn thận để xác định giai đoạn giới thiệu thiết bị thật, họ cũng cần phải quyết định có bao nhiêu thiết bị đủ để đáp ứng nhu cầu thị trường và lựa chọn nào có thể áp dụng một cách tốt  nhất để quản lý các thiết bị đó.

Kiểm thử trên nhiều thiết bị sẽ cho thấy rằng việc phát triển thực tế nên sử dụng trình giả lập (và một vài thiết bị cầm tay thật) để tăng tốc độ gỡ lỗi của ứng dụng trong giai đoạn mã hóa.

Việc kiểm thử sử dụng thiết bị giả lập/ mô phỏng giúp đẩy nhanh quá trình phát triển ứng dụng nhưng bên cạnh đó việc kiểm thử nên được thực hiện kết hợp cùng với thiết bị thật để đảm bảo chất lượng tổng thể của phần mềm. 
Riêng về chi phí, các công ty có thể sử dụng công cụ kiểm thử bằng thiết bị giả lập. Các dịch vụ này được cung cấp cho nhà phát triển để thử nghiệm ứng dụng của họ trên nhiều loại thiết bị cầm tay sử dụng các mạng di động khác nhau về mặt địa lý trên toàn thế giới (hữu ích cho các ứng dụng sử dụng GPS). Các dịch vụ này được cung cấp theo giờ và rất hiệu quả khi so sánh với việc mua thiết bị mới.

### Tổng kết 

Simulator và Emulator là công cụ tiện ích để kiểm thử nhưng kiểm thử thiết bị thực là một phần không thể thiếu của quá trình phát triển ứng dụng và không bao giờ được bỏ qua bởi vì người sử dụng sẽ không truy cập ứng dụng của bạn bằng trình giả lập / mô phỏng di động..

Emulators và Simulators với những ưu điểm là dễ tương tác , chi phí rẻ , dễ cài đặt .... Tuy nhiên nó chỉ giống với device thật ở mức tương đối,  nên sẽ có những bug chạy trên emulator thì không bị bug nhưng khi test thật trên device thì lại bị bug . Và thêm nữa có nhiều môi trường test mà Emulators và Simulators bị giới hạn hơn so với thiết bị thật .
Do đó việc kiểm thử sử dụng thiết bị giả lập/ mô phỏng nên được sử dụng trong các giai đoạn ban đầu của dự án và kết hợp cùng với thiết bị thật ở giai đoạn cuối của dự án nhằm đảm bảo chất lượng tổng thể của phần mềm. 

Nguồn: https://www.guru99.com/real-device-vs-emulator-testing-ultimate-showdown.html