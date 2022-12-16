![](https://images.viblo.asia/2887a7b8-a9f8-49bd-b7dc-5096c96af302.JPG)
# 1. Unit Testing( Kiểm thử đơn vị)
## Định nghĩa
Unit Testing là một mức kiểm thử phần mềm với mục đích để xác nhận từng unit của phần mềm được phát triển đúng như được thiết kế. Unit testing là mức test nhỏ nhất trong bất kỳ phần mềm nào. các hàm (Function), thủ tục (Procedure), lớp (Class), hoặc các phương thức (Method) đều có thể được xem là Unit. Nó thường có một hoặc vài đầu vào nhưng đầu ra là duy nhất.
## Khi nào thực hiện Unit Testing?
Unit testing là mức kiểm thử đầu tiên trong các mức kiểm thử phần mềm. Nó được thực hiện trước khi Integration Testing.
## Ai thực hiện Unit Testing?
Unit Testing thường do lập trình viên thực hiện. Unit test được thực hiện càng sớm càng tốt trong giai đoạn viết code và xuyên suốt quá trình phát triển phần mềm.
## Mục đích
* Tăng sự đảm bảo khi có sự thay đổi mã
* Code dễ sử dụng, dễ hiểu, có thể tái sử dụng nhiều hơn
* Phát triển nhanh hơn
* Chi phí sửa lỗi thấp hơn so với các mức kiểm thử giai đoạn sau
* Debug dễ dàng
# 2. Integration Testing( Kiểm thử tích hợp)
## Định nghĩa
Kiểm thử tích hợp là một mức của kiểm thử phần mềm kiểm tra một nhóm các module nhỏ liên quan đến nhau xem chúng có hoạt động đúng chức năng như trong thiết kế hay không.
Theo ISTQB ( International Software Testing Qualifications Board): 
* Kiểm thử tích hợp được thực hiện để phát hiện các lỗi về giao diện hoặc trong tương tác giữa các thành phần hoặc hệ thống tích hợp
* Kiểm thử tích hợp thành phần: kiểm tra sự tương tác giữa các thành phần với điều kiện các thành phần đã pass ở phần kiểm thử thành phần trước đó 
* Kiểm thử tích hợp hệ thống: kiểm tra sự tương tác giữa các hệ thống con khác nhau và các hệ thống này đã pass ở lần kiểm thử trước đó
## Khi nào thực hiện Integration Testing?
Kiểm thử tích hợp là mức thứ 2 trong các mức kiểm thử phần mềm. Nó được thực hiện sau Unit Testing  và trước System testing.
## Ai thực hiện Integration Testing?
Kiểm thử integration có thể được thực hiện bởi developer, một test team chuyên biệt hay một nhóm chuyên developer/kiểm thử viên tích hợp bao gồm cả kiểm thử phi chức năng.
## Mục đích
Kiểm tra sự tích hợp 1 nhóm các thành phần riêng lẻ có liên quan xem chúng có hoạt động đúng như mong đợi hay không.
## Một số phương pháp kiểm thử tích hợp
### Bigbang
![](https://images.viblo.asia/93f6a8d1-fdbc-4eb9-af34-f60ea6000589.JPG)

Đây là phương pháp test tích hợp mà tất cả hoặc hầu hết các unit được kết hợp với nhau và cùng được kiểm thử. Phương pháp này được thực hiện khi team kiểm thử nhận được toàn bộ phần mềm. => Như vậy big bang testing là kiểm tra sự tương tác giữa các unit , còn system test là sự tương tác của cả hệ thống.
### Top down
![](https://images.viblo.asia/c9822732-ea91-471e-a006-016fb609aebc.JPG)

Đơn vị cao nhất được kiểm thử đầu tiền, đơn vị thấp hơn được kiểm thử sau đó một các tuần tự.
### Bottom up
Đơn vị dưới cùng được kiểm thử đầu tiên, đơn vị cao hơn được kiểm thử tuần tự sau đó.
### Sanwich
![](https://images.viblo.asia/a4eaa4b3-cacd-47a2-8819-7c25dc250d19.JPG)

Sandwich là một cách tiếp cận để kiểm thử tích hợp, đó là sự kết hợp của các phương pháp Top Down và Bottom Up.
##  Một số lưu ý trước khi thực hiện kiểm thử tích hợp
* Đảm bảo rằng bạn có tài liệu thiết kế chi tiết phù hợp trong đó các tương tác giữa mỗi đơn vị được xác định rõ ràng.
* Đảm bảo rằng bạn có một hệ thống quản lý cấu hình phần mềm mạnh mẽ tại chỗ. Hoặc nếu không, bạn sẽ có một thời gian khó khăn theo dõi phiên bản phù hợp của từng đơn vị, đặc biệt là nếu số lượng đơn vị được tích hợp là rất lớn.
* Đảm bảo rằng mỗi đơn vị được kiểm thử đơn vị trước khi bạn bắt đầu Kiểm thử tích hợp.
# 3. System Testing( Kiểm thử hệ thống)
## Định nghĩa
Kiểm thử hệ thống là một mức của kiểm thử phần mềm . Giai đoạn này sẽ hoàn thiện và hợp nhất phần mềm để kiểm thử. 
Theo ISTQB định nghĩa: quy trình của kiểm thử tích hợp hệ thống để xác nhận xem hệt hống phần mềm có đáp ứng đúng theo đặc tả yêu cầu.
## Khi nào thực hiện System Testing?
Kiểm thử hệ thống là mức kiểm thử thứ 3 trong các mức kiểm thử phần mềm được thực hiện sau kiểm thử tích hợp và trước kiểm  thử chấp nhận.
## Ai thực hiện System Testing?
Thông thường, các tester thực hiện kiểm thử hệ thống.
## Mục đích
Mục đích của giai đoạn này là để đánh giá sự hoạt động của hệ thống có đúng theo như tài liệu đặc tả.
# 4. Acceptance Testing( Kiểm thử chấp nhận)
## Định nghĩa
Theo ISTQB định nghĩa: Kiểm thử chấp nhận chính thức liên quan đến yêu cầu và quy trình kinh doanh để xác định liệu hệ thống có đáp ứng tiêu chí chấp nhận hay không và cho phép người dùng, khách hàng hoặc tổ chức được ủy quyền khác xác định có chấp nhận hệ thống hay không.
## Khi nào thực hiện Acceptance Testing?
Kiểm thử chấp nhận là mức thứ 4 được thực hiện sau khi hoàn thành kiểm thử hệ thống và trước khi đưa sản phẩm vào sử dụng chính thức.
## Ai thực hiện Acceptance Testing?
Kiểm thử chấp nhận được chia thành 2 mức khác nhau 
* Kiểm thử alpha: được thực hiện bởi những người trong tổ chức nhưng không tham gia phát triển phần mềm.
* Kiểm thử beta: được thực hiện bởi khách hàng/ người dùng cuối tại địa điểm của người dùng cuối.
## Mục đích
Đảm bảo phần mềm đáp ứng đúng yêu cầu của khách hàng. Sản phẩm nhận được sự chấp nhận từ khách hàng/ người dùng cuối.
# 5. Kết luận
Như vậy, mình đã trình bày khá chi tiết về các mức kiểm thử phần mềm. Các bạn có thể hiểu ngắn gọn qua bảng tổng quát dưới đây :

| Các mức kiểm thử  | Unit Testing | Integration Testing | System testing | Alpha Testing | Beta Testing |
| -------- | -------- | -------- | -------- | -------- | -------- |
|   Định nghĩa   |   Là mức kiểm thử nhỏ nhất, test từng module nhỏ trong hệ thống  | Kiểm thử tích hợp một nhóm các module riêng lẻ có liên quan với nhau | Mức kiểm thử toàn bộ, hợp nhất tất cả các chức năng của phần mềm | Hoạt động kiểm thử chấp nhận nội bộ | Kiểm thử chấp nhận khi phát hành, bàn giao cho khách hàng.|
| Người thực hiện     | Do chính dev viết module đó     |  kiểm thử độc lập hoặc do lập trình viên    |  Tester     | Người dùng/ nhóm test độc lập( không phải người phát triển phần mềm) thực hiện tại nơi sản xuất phần mềm  | Thực hiện bởi khách hàng/ người dùng cuối tại địa điểm của họ |
| Thời gian thực hiện    | * Trong quá trình build module đó.<br>  * Phải hoàn thành trước khi chuyển sang Integration Testing  | Sau khi các module nhỏ liên quan đã được unit test |  Sau Integration Testing và trước Acceptance Testing | Sau system Testing , và trước Beta Testing | Sau alpha testing |
| Mục đích     | Đảm bảo mỗi module nhỏ của phần mềm được thực hiện đúng với thiêt kế  | Kiểm tra chức năng, độ tin cậy và hiệu suất của hệ thống khi tích hợp |  Đánh giá toàn bộ hệ thống hoạt động đúng theo đặc tả yêu cầu hay không     | Đảm bảo phần mềm hoạt động đúng trước khi bàn giao cho khách hàng | Đảm bảo khách hàng xác nhận phần mềm hoạt động đúng như yêu cầu của họ |
| Ưu điểm   |  * Tăng sự đảm bảo khi có sự thay đổi mã. <br> * Code dễ sử dụng, dễ hiểu, có thể tái sử dụng nhiều hơn. <br> * Phát triển nhanh hơn.<br> * Chi phí sửa lỗi thấp hơn so với các mức kiểm thử giai đoạn sau.<br> * Debug dễ dàng| * Phát hiện lỗi ở đơn vị thấp của sản phẩm.<br>  * Thuận tiện với các dự án nhỏ     |  Kiểm tra được tổng thể hoạt động của toàn hệ thống trước khi phát hành     | Các vấn đề xuất hiện có thể được giải quyết ngay bởi bên sản xuất     | Chỉ đòi hỏi thực hiện trong thời gian ngắn     |
| Nhược điểm | Dev ít kinh nghiệm sẽ mất khá nhiều thời gian để fix bug | * Các lỗ hổng về thiết kế ở cấp cao hơn sẽ được phát hiện chỉ ở cuối vòng đời.<br>   * Có thể bỏ qua các bug giao diện nhỏ trong quá trình tìm bug| Chỉ có thể thực hiện khi tất cả các module riêng lẻ đã hoàn tất và không có lỗi lớn | Có thể kéo dài lâu hơn | * Giới hạn số lượng người dùng.<br> * Chi phí sửa lỗi cao hơn nếu có |
| Kỹ thuật kiểm thử      | Kiểm thử hộp trắng     | Kiểm thử hộp trắng, đen và xám     |  Kiểm thử hộp đen     | Kiểm thử hộp trắng và đen     | Kiểm thử hộp đen     |