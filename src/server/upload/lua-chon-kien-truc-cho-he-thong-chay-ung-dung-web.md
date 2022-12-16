***(Monolith, SOA, Microservice hoặc Serverless)***

Tạo ra một ứng dụng web mới thì không tránh khỏi rủi ro. Và lựa chọn kiến trúc phù hợp là một bước thiết yếu để thành công. Bài phân tích này sẽ giúp chúng ta lựa chọn giữa một kiến trúc nguyên khối, kiến trúc hướng dịch vụ, kiến trúc microservice hoặc kiến trúc không có máy chủ.

## 1. Kiến trúc nguyên khối

*Monolith* là một từ cổ để chỉ một khối đá khổng lồ. Trong công nghệ phần mềm, một mẫu nguyên khối đề cập đến một đơn vị phần mềm không thể chia tách. Khái niệm phần mềm nguyên khối nằm trong các thành phần khác nhau của ứng dụng được kết hợp thành một chương trình duy nhất trên một nền tảng duy nhất. Thông thường, ứng dụng nguyên khối bao gồm cơ sở dữ liệu, giao diện người dùng phía client và ứng dụng phía máy chủ. Tất cả các bộ phận của phần mềm được hợp nhất và tất cả các chức năng của phần mềm được quản lý ở một nơi. Chúng ta hãy xem xét cấu trúc của phần mềm nguyên khối một cách chi tiết.


![monolithic vs microservices](https://rubygarage.s3.amazonaws.com/uploads/article_image/file/2545/%D0%9C%D0%BE%D0%BD%D1%82%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C_48.png "monolithic architecture")

Một kiến trúc nguyên khối sẽ dễ thực hiện cho các công ty nhỏ, đó là lý do tại sao nhiều công ty khởi nghiệp chọn phương pháp này khi xây dựng ứng dụng. Các thành phần của phần mềm nguyên khối được kết nối với nhau và phụ thuộc lẫn nhau, giúp phần mềm được khép kín. Kiến trúc này là một giải pháp truyền thống để xây dựng các ứng dụng, nhưng một số lập trình viên thấy nó đã lỗi thời. Tuy nhiên, trong nhiều trường hợp, một kiến trúc nguyên khối là một giải pháp hoàn hảo cho một số loại phần mềm.

Để tìm hiểu xem giải pháp này có tốt hay không, hãy xem xét ưu và nhược điểm của nó.

### 1.1 Ưu điểm của kiến trúc nguyên khối

#### **Phát triển và triển khai đơn giản**

Có rất nhiều công cụ có thể tích hợp vào kiến trúc này để phát triển. Ngoài ra, tất cả các đoạn code được để chung một thư mục, giúp cho việc triển khai dễ dàng hơn. Với bộ core nguyên khối, các lập trình viên không cần triển khai các thay đổi hoặc cập nhật riêng lẻ, vì họ có thể làm điều đó cùng một lúc và tiết kiệm rất nhiều thời gian.

#### **Hiệu suất tốt hơn**

Nếu được xây dựng đúng cách, các ứng dụng nguyên khối thường có hiệu suất cao hơn các ứng dụng dựa trên microservice. Ứng dụng có kiến trúc microservice có thể cần thực hiện 40 lệnh gọi API đến 40 dịch vụ microservice khác nhau để load từng màn hình, điều này rõ ràng dẫn đến hiệu suất chậm hơn. Đổi lại, các ứng dụng nguyên khối cho phép giao tiếp nhanh hơn giữa các thành phần phần mềm do code và bộ nhớ được chia sẻ.

### 1.2 Nhược điểm của một kiến trúc nguyên khối

#### **Codebase trở nên cồng kềnh theo thời gian**

Theo thời gian, hầu hết các sản phẩm phát triển gia tăng, phạm vi và cấu trúc  trở nên rất khó kiểm soát. Các đoạn code bắt đầu trông thực sự đồ sộ và trở nên khó hiểu và khó sửa đổi, đặc biệt là đối với các lập trình viên mới. Chất lượng code ngày càng giảm và môi trường phát triển tích hợp (IDE) bị quá tải vì phải load quá nhiều file cùng 1 lúc.

#### **Khó áp dụng công nghệ mới**

 Nếu có nhu cầu thêm một số công nghệ mới vào ứng dụng, các lập trình viên có thể gặp phải rào cản đối với việc áp dụng. Thêm công nghệ mới có nghĩa là viết lại toàn bộ ứng dụng, việc này rất tốn kém và mất thời gian.

#### **Kém linh hoạt**

Trong các ứng dụng nguyên khối, mỗi bản cập nhật nhỏ yêu cầu deploy lại đầy đủ. Vì vậy, tất cả các lập trình viên phải đợi cho đến khi deploy xong. Khi một vài nhóm cùng làm việc trong cùng một dự án, hiệu xuất phát triển chung có thể giảm đi rất nhiều.

### 1.3 Kết luận

Mô hình nguyên khối chưa bị lỗi thời và nó vẫn hoạt động tốt trong một số trường hợp. Một số công ty khổng lồ như Etsy vẫn dùng nguyên khối bất chấp sự phổ biến ngày nay của microservice. Kiến trúc phần mềm nguyên khối có thể có lợi nếu công ty đang ở giai đoạn sáng lập, đang xây dựng một sản phẩm chưa được chứng minh và không có kinh nghiệm với microservice. Monolithic khá hoàn hảo cho các công ty mới khởi nghiệp cần có một sản phẩm và chạy càng sớm càng tốt. Tuy nhiên, một số vấn đề được đề cập ở trên cần được cân nhắc khi xây dụng phần mềm nguyên khối.

## 2. SOA (Service-oriented architecture) 


Kiến trúc hướng dịch vụ (SOA) là một kiểu kiến trúc phần mềm dùng để chỉ ứng dụng bao gồm các tác nhân phần mềm rời rạc và lỏng lẻo thực hiện một chức năng cần thiết. SOA có hai vai trò chính: nhà cung cấp dịch vụ và người tiêu dùng dịch vụ. Cả hai vai trò này có thể được tham gia trong cùng một phần mềm. Khái niệm về SOA nằm ở chỗ: ứng dụng có thể được thiết kế và xây dựng theo kiểu mô-đun hóa, tích hợp dễ dàng và có thể tái  sử dụng lại.

### 2.1 Ưu điểm của SOA

#### **Khả năng sử dụng lại dịch vụ**

Do tính chất khép kín và liên kết lỏng lẻo của các thành phần chức năng trong các ứng dụng hướng dịch vụ, các thành phần này có thể được sử dụng lại trong nhiều ứng dụng mà không ảnh hưởng đến các dịch vụ khác.

#### **Khả năng bảo trì tốt hơn**

Vì mỗi dịch vụ phần mềm là một đơn vị độc lập, thật dễ dàng để cập nhật và bảo trì nó mà không làm tổn thương các dịch vụ khác. Ví dụ: các ứng dụng doanh nghiệp lớn có thể được quản lý dễ dàng hơn khi được chia thành các dịch vụ.

#### **Độ tin cậy cao hơn**

Các services dễ debug và test hơn là các đoạn code lớn như trong cách tiếp cận nguyên khối. Điều này làm cho các sản phẩm dựa trên SOA đáng tin cậy hơn.

#### **Phát triển song song**

Là một kiến trúc hướng dịch vụ bao gồm các lớp, nó giúp cho quá trình phát triển chạy song song. Các dịch vụ độc lập có thể được phát triển song song và hoàn thành cùng một lúc.

### 2.2 Nhược điểm của SOA

#### **Quản lý phức tạp**

Hạn chế chính của kiến trúc hướng dịch vụ là sự phức tạp của nó. Mỗi dịch vụ phải đảm bảo rằng tin nhắn được gửi kịp thời. Số lượng các tin nhắn này có thể lên tới hơn một triệu lần, khiến việc quản lý tất cả các dịch vụ trở thành một thách thức lớn.

#### **Chi phí đầu tư cao**

Phát triển SOA đòi hỏi một sự đầu tư lớn về nguồn nhân lực, công nghệ và nguồn lập trình viên.

#### **Quá tải**

Trong SOA, tất cả các đầu vào được xác nhận trước khi một dịch vụ tương tác với một dịch vụ khác. Khi sử dụng nhiều dịch vụ, điều này làm tăng thời gian phản hồi và giảm hiệu suất tổng thể.

### 2.3 Kết luận

Mô hình SOA phù hợp nhất cho các hệ thống doanh nghiệp phức tạp như các hệ thống dành cho ngân hàng. Một hệ thống ngân hàng cực kỳ khó để viết dạng microservice. Nhưng một cách xây dựng nguyên khối cũng không tốt cho hệ thống ngân hàng vì ứng dụng ngân hàng đơn giản là quá lớn, quá phức tạp để triển khai thành một khối. Giải pháp tốt nhất là sử dụng cách tiếp cận SOA và tổ chức các ứng dụng phức tạp thành các dịch vụ độc lập riêng biệt.

## 3. Kiến trúc microservice


Microservice là một loại kiến trúc phần mềm hướng dịch vụ, tập trung vào việc xây dựng một loạt các thành phần tự quản lý tạo nên ứng dụng. Không giống như các ứng dụng nguyên khối được xây dựng dưới dạng một đơn vị không thể chia tách, các ứng dụng microservice bao gồm nhiều thành phần độc lập output ra các API.

*So sánh cấu trúc của microservice và kiến trúc nguyên khối*

![monolith vs microservices](https://rubygarage.s3.amazonaws.com/uploads/article_image/file/2561/%D0%9C%D0%BE%D0%BD%D1%82%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C_48_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F.png "microservices architecture")

Cách tiếp cận microservice tập trung chủ yếu vào các độ ưu tiên của chức năng dành cho người dùng, trong khi cách tiếp cận nguyên khối được tổ chức xung quanh các lớp công nghệ, giao diện người dùng và cơ sở dữ liệu. Cách tiếp cận microservice đã trở thành một xu hướng trong những năm gần đây khi ngày càng nhiều doanh nghiệp đang phát triển nhanh và sử dụng nhiều công nghệ DevOps.

> Microservice rất quan trọng, đơn giản vì chúng đơn giản hóa sự phức tạp trong các hệ thống. Bằng cách chia hệ thống hoặc ứng dụng  thành nhiều phần nhỏ hơn, làm giảm trùng lặp, tăng sự gắn kết và dễ dàng kết nối giữa các bộ phận thông qua giao thức RESTFul API, do đó làm cho các thành phần hệ thống tổng thể dễ hiểu hơn, dễ mở rộng hơn và dễ thay đổi hơn.

> **Lucas Kraus, tác giả của microservice**

Có rất nhiều ví dụ về các công ty đã phát triển từ cách tiếp cận nguyên khối lên sử dụng Microservice. Trong số nổi bật nhất là Netflix, Amazon, Twitter, eBay và PayPal. Để xác định xem microservice có phù hợp với dự án hay không, hãy xác định ưu và nhược điểm của phương pháp này.

### 3.1 Ưu điểm của microservice

#### **Dễ dàng phát triển, thử nghiệm và triển khai**

Ưu điểm lớn nhất của microservice so với các kiến trúc khác là các dịch vụ nhỏ có thể được xây dựng, thử nghiệm và triển khai độc lập. Vì một đơn vị triển khai là nhỏ, nó tạo điều kiện và tăng tốc độ phát triển và phát hành cho người dùng. Ngoài ra, việc phát hành một service không bị giới hạn bởi việc phát triển một service khác chưa kết thúc. Và điểm cộng cuối cùng ở đây là rủi ro khi triển khai đã giảm khi các lập trình viên triển khai các phần của phần mềm chứ không phải toàn bộ ứng dụng.

#### **Tăng hiệu suất**

Với microservice, một số nhóm có thể làm việc trên các dịch vụ của họ một cách độc lập và nhanh chóng. Mỗi phần riêng lẻ của ứng dụng có thể được xây dựng độc lập do việc tách các thành phần microservice. Ví dụ:  có thể có một nhóm gồm 100 người làm việc trên toàn bộ ứng dụng (như theo cách tiếp cận nguyên khối) hoặc  có thể có 10 nhóm 10 người phát triển các dịch vụ khác nhau cho ứng dụng. Hãy tưởng tượng điều này một cách trực quan.

![monolithic vs microservices](https://rubygarage.s3.amazonaws.com/uploads/article_image/file/2549/%D0%9C%D0%BE%D0%BD%D1%82%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C_48_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F_2.png "microservice software architecture")

Hiệu xuất tăng cho phép các lập trình viên cập nhật các thành phần hệ thống mà không làm giảm ứng dụng. Hơn nữa, hiệu xuất cung cấp một quy trình triển khai an toàn hơn và thời gian hoạt động được cải thiện. Các tính năng mới có thể được thêm vào khi cần mà không cần chờ toàn bộ ứng dụng khởi chạy.

#### **Khả năng mở rộng theo chiều ngang**

Chia tỷ lệ dọc (chạy cùng một phần mềm nhưng trên các máy cấu hình cao) có thể bị giới hạn bởi dung lượng của từng dịch vụ. Nhưng tỷ lệ ngang (tạo thêm dịch vụ trong cùng một nhóm) không bị giới hạn và có thể chạy linh hoạt với microservice. Hơn nữa, tỷ lệ ngang có thể hoàn toàn tự động.

### 3.2 Nhược điểm của microservice

#### **Phức tạp**

Nhược điểm lớn nhất của microservice nằm ở sự phức tạp . Việc chia ứng dụng thành các dịch vụ siêu nhỏ độc lập đòi hỏi phải có nhiều tạo tác hơn để quản lý. Kiểu kiến trúc này đòi hỏi lập kế hoạch cẩn thận, nỗ lực to lớn, tài nguyên nhóm và kỹ năng. Những lý do cho sự phức tạp cao là như sau:

-   Nhu cầu tự động hóa tăng lên, vì mọi service cần được test và giám sát
-   Các công cụ có sẵn không hoạt động với phụ thuộc service
-   Tính nhất quán dữ liệu và quản lý giao dịch trở nên khó khăn hơn vì mỗi service có cơ sở dữ liệu

#### **Bảo mật**

Trong ứng dụng microservice, mỗi chức năng giao tiếp bên ngoài thông qua API sẽ tăng khả năng bị tấn công. Những cuộc tấn công này chỉ có thể xảy ra nếu các tính toán bảo mật thích hợp không được thực hiện khi xây dựng ứng dụng.

#### **Ngôn ngữ lập trình khác nhau**

Khả năng chọn các ngôn ngữ lập trình khác nhau là hai mặt của cùng một đồng tiền. Sử dụng các ngôn ngữ khác nhau làm cho việc triển khai khó khăn hơn. Ngoài ra, việc chuyển đổi lập trình viên giữa các giai đoạn phát triển trở nên khó khăn hơn khi mỗi dịch vụ được viết bằng một ngôn ngữ khác nhau.

### 3.3 Kết luận

Microservice là tốt, nhưng không phải cho tất cả các loại ứng dụng. Mẫu này hoạt động tuyệt vời để phát triển các ứng dụng và hệ thống phức tạp. Cân nhắc chọn kiến trúc microservice khi  có nhiều nhóm có kinh nghiệm và khi ứng dụng đủ phức tạp để chia nó thành các dịch vụ. Khi ứng dụng lớn và cần phải linh hoạt và có thể mở rộng, microservice có lợi.

### 3.4 So sánh năm ngôn ngữ hàng đầu để viết microservice

|    Ngôn ngữ                         |    Golang                                                                                                                                       |    Java                                                                                                                                       |    Python                                                                                                         |    C   ++                                                                                                                                      |    Ruby                                                                                                                                                     |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
|    Số   công ty sử dụng             |    4.038                                                                                                                                        |    26.269                                                                                                                                     |    11.757                                                                                                         |    8,584                                                                                                                                       |    4,417                                                                                                                                                    |
|    Ưu   điểm                        |    Tốc độ lớn và hỗ trợ đồng thời, được tạo để xây dựng   các ứng dụng lớn và phức tạp, thư viện tiêu chuẩn mạnh mẽ để tạo các dịch vụ   web    |    Rất nhiều tài nguyên lập trình và thư viện, rất   nhiều lập trình viên, khả năng di chuyển dễ dàng từ hệ thống này sang hệ   thống khác    |    Khả năng code dễ đọc dễ học, hỗ trợ mạnh mẽ việc   tích hợp với các công nghệ khác, năng suất lập trình cao    |    Khả năng viết các chương trình nhanh và di động, hỗ   trợ chạy đa nhiệm tuyệt vời, được tạo để xây dựng các ứng dụng hiệu năng rất   cao    |    Phát triển nhanh chóng, khả năng mở rộng quy mô bất   kỳ sản phẩm nào một cách nhất quán, được thực hiện để xây dựng các ứng dụng   có độ tin cậy cao    |
|    Nhược   điểm                     |    An toàn chỉ được test trong thời gian biên dịch,   không có quản lý bộ nhớ thủ công                                                          |    Không kiểm soát thu gom rác, hiệu suất chậm, không   hỗ trợ lập trình cấp thấp                                                             |    Thực thi chậm, nhiều giới hạn thiết kế, khả năng chỉ   gặp lỗi trong thời gian chạy, tiêu thụ bộ nhớ cao       |    Không có bộ dọn rác tự động, không có hỗ trợ tích   hợp thư viện ngoài                                                                      |    Tốc độ thời gian chạy thấp ảnh hưởng đến hiệu suất,   thuật toán đa luồng không được triển khai hoàn hảo                                                 |
|    Các   lĩnh vực có thể áp dụng    |    Tự động hóa, nền tảng nhắn tin, phân tích dữ liệu,   học máy                                                                                 |    Trang web thương mại điện tử, ứng dụng khoa học,   giao dịch điện tử, game online                                                          |    Hệ thống xây dựng tự động, phân tích dữ liệu, học   máy                                                        |    Ô tô, máy chủ cơ sở dữ liệu, robot, thiết bị                                                                                                |    Phát triển di động, học máy, robot, trí tuệ nhân tạo                                                                                                     |


---
Bây giờ chúng ta có thể so sánh ba kiến trúc phần mềm này để xác định sự khác biệt giữa chúng một cách trực quan.

![monolithic vs microservices](https://rubygarage.s3.amazonaws.com/uploads/article_image/file/2557/%D0%9C%D0%BE%D0%BD%D1%82%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C_48_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F_3.png "architectures in comparison")

Các ứng dụng nguyên khối bao gồm các đơn vị phụ thuộc lẫn nhau, không thể phân chia và có tốc độ phát triển rất thấp. SOA được chia thành các dịch vụ nhỏ hơn, được kết hợp vừa phải và các tính năng phát triển chậm. Microservice chia rất nhỏ, dịch vụ độc lập kết hợp lỏng lẻo và có tính năng phát triển liên tục nhanh chóng.

## 4. Kiến trúc không có máy chủ (Serverless architecture)


Serverless architecture là một cách tiếp cận điện toán đám mây để xây dựng và chạy các ứng dụng và dịch vụ mà không cần quản lý cơ sở hạ tầng. Trong các ứng dụng không có máy chủ, việc thực thi code được quản lý bởi một máy chủ, cho phép các lập trình viên triển khai code mà không phải lo lắng về việc bảo trì và cung cấp máy chủ. Trên thực tế, serverless không có nghĩa là không có máy chủ. Không có ứng dụng trên máy chủ, nhưng một dịch vụ đám mây của bên thứ ba như AWS chịu trách nhiệm hoàn toàn cho các máy chủ này. Một kiến trúc không có máy chủ giúp loại bỏ sự cần thiết của các tài nguyên bổ sung, mở rộng ứng dụng, bảo trì máy chủ và cơ sở dữ liệu và hệ thống lưu trữ.

Kiến trúc serverless kết hợp hai khái niệm:

-   **FaaS (Function as a Service)** - mô hình điện toán đám mây cho phép các lập trình viên tải các phần code chức năng lên đám mây và để các phần này được thực thi độc lập
-   **BaaS (Backend as a Service)** - mô hình điện toán đám mây cho phép các lập trình viên thuê ngoài các phần mềm quản lý phụ trợ (quản lý cơ sở dữ liệu, lưu trữ đám mây, lưu trữ, xác thực, định danh và phân quyền người dùng, v.v.) và người lập trình viên chỉ viết code và sửa lỗi phần giao diện. Toàn bộ phần backend đã được nhà cung cấp xử lý hết.

![microservices vs serverless](https://rubygarage.s3.amazonaws.com/uploads/article_image/file/2553/%D0%9C%D0%BE%D0%BD%D1%82%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C_48_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F_4.png "serverless software architecture")

*Đây là kiến trúc cơ bản của mô hình không có máy chủ*

Khi sử dụng kiến trúc không có máy chủ, các lập trình viên có thể tập trung vào chính sản phẩm mà không phải lo lắng về quản lý máy chủ hoặc môi trường thực thi. Điều này cho phép các lập trình viên tập trung vào phát triển các sản phẩm có độ tin cậy và khả năng mở rộng cao.

Có rất nhiều nhà cung cấp đám mây trên thị trường. Dưới đây là một số nhà cung cấp máy chủ serverless hàng đầu:


![serverless computing providers](https://rubygarage.s3.amazonaws.com/uploads/article_image/file/2555/%D0%9C%D0%BE%D0%BD%D1%82%D0%B0%D0%B6%D0%BD%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C_48_%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F_5.png "serverless architecture")


### 4.1 Ưu điểm của kiến trúc không có máy chủ

#### **Dễ dàng triển khai**

Trong các ứng dụng không có máy chủ, các lập trình viên không cần phải lo lắng về cơ sở hạ tầng. Điều này cho phép họ tập trung vào chính code. Kiến trúc Serverless cho phép  quay ứng dụng cực kỳ nhanh, vì việc triển khai chỉ mất vài giờ hoặc vài ngày (so với ngày hoặc tuần với cách tiếp cận truyền thống).

#### **Giá rẻ**

Đi máy chủ giảm chi phí. Vì  không cần xử lý cơ sở dữ liệu, một số logic và máy chủ,  không chỉ có thể tạo code chất lượng cao hơn mà còn cắt giảm chi phí. Khi sử dụng kiểu máy chủ,  chỉ bị tính phí cho chu kỳ CPU và bộ nhớ  thực sự sử dụng.

#### **Tăng cường khả năng mở rộng**

Nhiều chủ doanh nghiệp muốn ứng dụng của họ có ảnh hưởng lớn và được nhiều người biết đến như Google hoặc Facebook. Máy chủ serverless giúp cho việc mở rộng bộ nhớ và CPU được tự động và liền mạch. Ứng dụng  sẽ tự động mở rộng RAM hoặc CPU khi tải nặng hoặc cơ sở dữ liệu người dùng tăng lên mà không bị giảm hiệu suất tải trang. Các ứng dụng serverless có thể xử lý một số lượng lớn yêu cầu, trong khi ứng dụng truyền thống sẽ bị crash (quá tải) bởi sự gia tăng đột ngột của các request đến từ phía người dùng.

### 4.2 Nhược điểm của kiến trúc không có máy chủ

#### **Nhà cung cấp hoàn toàn độc quyền**

Nhà cung cấp có thể có tình huống cần  cung cấp toàn quyền kiểm soát các hoạt động. Và nếu  muốn thay đổi các nghiệp vụ logic kinh doanh, việc thay đổi ở phía server khá hạn chế và việc chuyển từ nhà cung cấp này sang nhà cung cấp khác có thể gặp nhiều thách thức. Có thể nói là gần như phải làm lại từ đầu nếu đổi sang nhà cung cấp khác

#### **Không dành cho tác task chạy nặng**

Mô hình không có máy chủ không phù hợp cho các hoạt động xử lý tính toán nặng nề. Ứng dụng không có máy chủ rất tốt cho các quy trình thời gian thực thi ngắn, nhưng nếu một tác vụ mất hơn năm phút, ứng dụng không có máy chủ sẽ cần thêm chức năng FaaS.

### 4.3 Kết luận

Kiến trúc phần mềm không có máy chủ có lợi cho việc hoàn thành các nhiệm vụ một lần và các quy trình phụ trợ. Nó hoạt động tuyệt vời cho các ứng dụng và ứng dụng nặng dành cho khách hàng đang phát triển nhanh và cần mở rộng không giới hạn.

Và cuối cùng, hãy nhìn vào hình ảnh sau đây để biết khi nào nên chọn một trong bốn loại kiến trúc mà chúng ta vừa phân tích:

![](https://images.viblo.asia/ff88fd11-4d40-4243-a791-ccc7a282ef00.png)

---
Đây là một bài dịch, các bạn có thể đọc bài gốc ở đây: https://rubygarage.org/blog/monolith-soa-microservices-serverless