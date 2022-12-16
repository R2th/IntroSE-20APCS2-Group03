Như phần trước đã giới thiệu về các loại xâm nhập mạng và các cách giám sát hệ thống mạng.
Phần này mình xin giới thiệu về các phương pháp phát hiện tấn công mạng:
## Hệ thống phát hiện lạm dụng.
 - Hệ thống phát hiện xâm nhập lạm dụng là Intrusion Misuse Detection System ( IMDS ). 
 - Ở đây lạm dụng là các hành động không hợp lệ nhằm sử dụng, tác động đến tài nguyên của hệthống. IMDS nắm bắt các đặc điểm của các cuộc tấn công đã được biết đến trước đó để đưa ra các mẫu. Bất kỳ hành động nào phù hợp với các mẫu của cuộc tấn công được biết đến trước đều được xem là xâm nhập. IMDS xác định sự xâm nhập bằng cách kết hợp giữa các sự kiện thu được với các mẫu hoặc dấu hiệu của các cuộc tấn công.
Cơ chế của hệ thống đuợc miêu tả duới hình sau:
![](https://images.viblo.asia/c1cf866c-3ba4-4d1f-8e2f-8f9cd395c974.png)

- Ưu điểm hệ thống:
 + Các bộ phát hiện lạm dụng rất ít cảnh báo sai.
 + Các bộ phát hiện lạm dụng có thể dự đoán được các công cụ hay kỹ thuật tấn công một cách nhanh chóng và tin cậy.
 + Các bộ phát hiện lạm dụng cho phép những người quản lý hệ thống, không cần có nhiều kinh nghiệm về an toàn an ninh, có thể theo vết các vấn đề an toàn trên hệ thống, khởi tạo các thủ tục .
- Nhược điểm hệ thống:
+ Các bộ phát hiện lạm dụng chỉ có thể phát hiện được các cuộc tấn công đã biết -> cần thường xuyên cập nhật các dấu hiệu của các cuộc tấn công mới.
+ Nhiều bộ phát hiện lạm dụng được thiết kế để sử dụng các dấu hiệu được định nghĩa chặt chẽ để phòng tránh các cuộc tấn công phổ biến. Các bộ phát hiện lạm dụng dựa trên trạng thái có thể giải quyết được hạn chế này, nhưng không được sử dụng trong các IDS thương mại.
## Hệ thống phát hiện bất thuờng.
- Hệ thống phát hiện bất thuờng là Anormaly –based IntrusionDetection System(AIDS)
- Hệ thống thực hiện so sánh các sự kiện thu bắt được với các hành vi bình thường của đối tượng. Bất kể một hành động nào sai lệch so với hành vi bình thường đều được coi là xâm nhập. Điều đó có nghĩa nếu chúng ta thiết lập một dữ liệu của các hoạt động bình thường cho một hệ thống, sau đó chúng ta có thể đánh dấu tất cả các trạng thái khác nhau từ dữ liệu mới được thiết lập. 
- Có một sự khác biệt quan trọng giữa bất thường và lạm dụng:
 + Bất thường sử dụng kỹ thuật dựa trên các đặc điểm có hành vi bình thường để phát hiện các đặc điểm có hành vi xấu.
 + Lạm dụng thì dựa trên các hành vi xấu đã được biết đến trước đó để phát hiện các hành vi xấu đuợc lặp lại.
Cơ chế của hệ thống được mô tả ở hình sau:
![](https://images.viblo.asia/867ee178-3ade-43d6-8c62-d5d5baeaa782.png)

- Ưu điểm của hệ thống chính là nó có thể phát hiện các cuộc tấn công không biết trước. Tuy nhiên, lợi thế này lại trả giá về một tỷ lệ cao các cảnh báo sai bởi vì trong thực tế, bất thường không nhất thiết là xâm nhập. 
- Vì số lượng các cuộc tấn công mới tăng lên một cách nhanh chóng, đó là khó khăn cho cách tiếp cận của phương pháp phát hiện lạm dụng để duy trì tỷ lệ phát hiện cao. Ngoài ra các cuộc tấn công ngày càng có trình độ cao và trong thời gian dài nên dẫn đến khối lượng các công việc duy trì cơ sở dữ liệu dấu hiệu sẽ nặng nề. 
- Mặt khác, phương pháp phát hiện bất thường để phát hiện ra sự xâm nhập thông qua học máy theo kinh nghiệm là tương đối dễ dàng để duy trì. Một loạt các kỹ thuật được sử dụng trong phát hiện bất thường. Họ dựa trên các tính năng phổ biến, chủ yếu là những kỹ thuật có thể được phân loại thành bốn mô hình khác nhau: dựa trên thống kê, dựa trên đặc điểm, dựa trên khả năng miễn dịch và máy học (khai thác dữ liệu). 
- Phát hiện xâm nhập có thể được coi là một vấn đề phân loại nhị phân vì nó nhằm mục đích phân biệt giữa các hành vi bình thường và các hành vi bất thường.
- Kỹ thuật máy học là phù hợp nhất để phát hiện xâm nhập:
+ Kỹ thuật máy học chắt lọc những kiến thức trực tiếp từ dữ liệu trước đó. Vì vậy nó không yêu cầu thủ công trong việc trích xuất kiến thức.
+ Nó có khả năng tạo ra mô hình dựa trên các dữ liệu không đầy đủ.
+ kỹ thuật máy học có thể đại diện cho những kiến thức trừu tượng, một khả năng mà làm cho chúng thích hợp với việc xử lý một lượng lớn dữ liệu.
- Ưu điểm của hệ thống:
+ AIDS có thể phát hiện các hành vi không bình thường và do đó có khả năng phát hiện các dấu hiệu của các cuộc tấn công mà không có tri thức chi tiết về các cuộc tấn công đó.
+ Các bộ phát hiện bất thường có thể tạo ra thông tin mà có thểđược sử dụng để định nghĩa các dấu hiệu cho các bộ phát hiện lạm dụng.
- Nhược điểm của hệ thống:
+ Các phương pháp phát hiện bất thường thường tạo ra một số lượng lớn cảnh báo sai đối với các hành vi không dự đoán được của người dùng hay của mạng.
+ Các phương pháp phát hiện bất thường thường yêu cầu tập dữ liệu huấn luyện lớn.

Cảm ơn các bạn đã theo dõi, phần sau mình sẽ tiếp tục giới thiệu về phương pháp SVN trong ứng dụng của AIDS ...