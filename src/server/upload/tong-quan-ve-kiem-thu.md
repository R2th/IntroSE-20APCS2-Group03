Kiểm thử được định nghĩa là một hoạt động nhằm đánh giá chất lượng hoặc tính chấp nhận được của sản phẩm. Kiểm thử cũng nhằm phát hiện lỗi hoặc bất cứ vấn đề gì về sản phẩm.

## 1. Một số khái niệm về kiểm thử phần mềm

 **Yêu cầu của khách hàng và đặc tả phầm mềm**: Phần mềm được viết để thực hiện các nhu cầu của khách hàng. Các nhu cầu của khách hàng được thu thập, phân tích đánh gía và là cơ sở để quyết định chính xác các đặc trưng cần thiết mà phần mềm phải có. Dựa trên yêu cầu của khách hàng, đặc tả được xấy dựng để mô tả chính xác các yêu cầu mà phần mềm cần đáp ứng được và có giao diện như thế nào. Tài liệu đặc tả là cơ sở để đôi ngũ phát triển phần mềm xây dựng sản phẩm.
 
 **Kiểm chứng và thẩm định**: Kiểm chứng (verification) và thẩm định (validation) hay được dùng lẫn lộn nhưng thực ra chúng có ý nghĩa khác nhau. Kiểm chứng là quá trình đảm bảo rằng một phần mềm thoả mãn đặc tả của nó. Còn thẩm định là quá trình để đảm bảo rằng sản phẩm đáp ứng yêu cầu của người dùng (khách hàng). Trong thực tế chúng ta cần thực hiện kiểm chứng trước khi thực hiện thẩm định sản phẩm. Vì vậy chúng ta có thuật ngữ V&V (Verification & Validation). Lý do của việc này là chúng ta cần đảm bảo sản phẩm đúng với đặc tả trước, nếu thực hiện thẩm định trước, một khi phát hiện ra lỗi chúng ta không xác định được lỗi nà là do đặc tả sai hay lập trình sai so với đặc tả.
 
 **Chất lượng phần mềm**: Chất lượng của một sản phẩm phần mềm là sự đáp ứng các yêu cầu về chức năng, sự hoàn thiện và việc tuân thủ nghiêm ngặt các chuẩn đã được đặc tả, cùng các đặc trưng, mong chờ từ mọi sản phẩm phần mềm chuyên nghiệp.Chất lượng phần mềm đặc trưng cho độ tốtm độ tuyệt hảo của phầm mềm bao gồm: tính đúng đẵn (hành vi đúng như đặc tả), tính hiểu quả (tiết kiệm thời gian và tiền bạc), độ tin cậy, tính khả kiểm thử (kiểm thử được và dễ dàng), dễ học, dễ sử dụng, dễ bảo trì,....Như vậy độ tin cậy chỉ là 1 yếu tố để đánh gía chất lương về một sản phẩm phần mềm. 
 
** Độ tin cậy của phần mềm**: Độ tin cậy là xác suất để phần mềm chạy không có thất bại trong 1 khoảng thời gian nhất đinh, Nó được xem là 1 yếu tố quan trọng của chất lượng phần mềm, Ngoài ra, thời gian trung bình cho việc khắc phục 1 sự cố cũng là một thông số quan trọng trong việc đánh giá độ tin cậy của sản phẩm phần mềm.
 
## 2. Vai trò của kiểm thử phần mềm

Kiểm thử phần mềm đóng vai trò quan trọn trong việc đánh giá chất lượng và là hoạt động chủ chốt trong việc đảm bảo chất lượng cao của sản phẩm. thông qua chu trình "kiểm thử - tìm lỗi - sửa lỗi" chất lượng của sản phẩm cải tiến ngày một tốt hơn, Mặt khác thông qua việc tiến hành kiểm thử, ta biết được sản phẩm của ta tốt ở mức độ nào. Việc kiểm thử phần mềm là một quy trình kiểm chứng để đánh giá và tăng cường chẩt lượng phần mềm. Quy trình này gồm 2 phần là phần tích tĩnh và phân tích động.

**Phân tích tĩnh**

Việc phân tích tĩnh được làm dựa trên khảo sát các tài liệu được xây dựng trong quá trình phát triển phần mềm như: tài liệu đặc tả nhu cầu người dùng, mô hình phát triển phần mềm, hồ sơ thiết kế và mã nguồn phần mềm. Các phương pháp phân tích tĩnh truyền thống bao gồm việc khảo sát đặc tả và mã nguồn cùng các tài liệu thiết kế. 

Chúng ta có thể dùng các kĩ thuật phân tích như: kiểm chứng mô hình, chứng minh định lý để chứng minh tính đúng đắn của thiết kế và mã nguồn.

**Phân tích động**

Phân tích động liên quan đến việc thực thi chương trình để phát hiện những lỗi có thể có của chương trình, hoặc quan sát tính chất nào đó về hành vi và hiệu năng, Vì gần như không thể thực thi chương trình trên tất cả các dữ liệu vào có thể, ta có thể chọn một tập con các dữ liệu để thực thi, gọi là các "ca kiểm thử".

Bằng việc phân tích tĩnh và động, giúp người kiểm thử có thể phát hiện nhiều lỗi nhất có thể để có thể sửa ở giai đoạn sớm nhất trong quá trình phát triển phần mềm. Phân tích tĩnh và động là hai kĩ thuật bổ sung cho nhau và cần được lặp đi lặp lại nhiều lần trong quá trình phát triển phần mềm.


## 3. Ca kiểm thử

Mỗi ca kiểm thử đều có tên và được liên kết với một hành vi của chương trình. Ca kiểm thử gồm 1 tập dữ liệu đầu vào và 1 chuỗi các giá trị đầu ra mong đợi đối với sản phẩm.

Cốt lõi của kiểm thử phần mềm dựa trên việc xác định tập các ca kiểm thử sao cho chúng có khả năng phát hiện nhiều lỗi nhất. Các ca kiểm thử bao gồm các thông tin cơ bản như sau:
* Tên của ca kiểm thử
* Mục đích kiểm thử
* Tiền điều kiện
* Đầu vào
* Đầu ra mong đợi
* Đầu ra thực tế
* Lịch sử thực hiện ca kiểm thử ( ngày, kết quả thực tế, phiên bản, kiểm thử viên)

## 4. Phương pháp kiểm thử

Có 2 cách cơ bản để xác định các ca kiểm thử là kiểm thử chức năng hay còn gọi là kiểm thử hộp đen( black-box testing) và kiểm thử cấu trúc hay kiển thử hộp trắng( white-box testing). Mỗi các tiếp cận có các phương pháp xác định khác nhau và được gọi chung là phương pháp kiểm thử.

### 4.1. Kiểm thử chức năng (hộp đen)

Kiểm thử chức năng dựa trên quan niệm rằng bất kì chương trình nào cũng được coi là một hàm ánh xạ các miền dữ liệu đầu vào và dữ liệu đầu ra của nó. Cũng tương tự như hộp đen, nội dung của hộp đen không được biết tới hoặc không cần quan tâm, và chức năng của hộp đen được hiểu theo các dữ liệu đầu vào và đầu ra của nó.

Với cách tiếp cận của kiểm thử chức năng, để xác định các ca kiểm thử, thông tin cần duy nhất là đặc tả của phần mềm cần kiểm thử. Ưu điểm chính cho việc kiểm thử chức năng: các ca kiểm thử được phát triển song song và độc lập với việc cài đặt hệ thống  nên khi thay đổi cài đặt thì các case vẫn có thể sử dụng được do đó có thể tiết kiệm thời gian phát triển của dự án. Mặt khác, cách tiếp cận này thường có thể có tính dư thừa đáng kể trong các ca kiểm thử.

Các phương pháp cơ bản trong kiểm thử chức năng:
* Phân vùng tương đương
* Phân tích giá trị biên
* Bảng quyết định
* Bảng chuyển trạng thái
* Dựa vào nguyên nhân kết quả

### 4.2. Kiểm thử cấu trúc (hộp trắng)

 Kiểm thử cấu trúc không dựa vào tài liệu mô tả yêu cầu mà dựa vào việc phân tích cấu trúc code (mã nguồn) của chương trình để mà xác định các trường hợp cần kiểm thử.
 
 Kiểm thử hộp trắng có thể áp dụng ở mọi mức kiểm thử từ component test (unit test) - kiểm thử đơn vị, cho đến kiểm thử ở mức hệ thống (system test). Nhưng trong thực tế thì white-box testing thường được áp dụng nhiều và thông dụng ở mức unit test. Vì khi áp dụng kỹ thuật này ở mức cao như integration test (kiểm thử tích hợp), thì số lượng dòng code, và các thành phần được tích hợp nhiều nên độ phức tạp rất cao. Vì thế, công sức bỏ ra thì rất nhiều nhưng hiệu quả thì không tương xứng.
 
 Các kĩ thuật trong kiểm thử cấu trúc bao gồm:
* Kiểm thử API – kiểm thử phần mềm liên quan đến việc kiểm thử các giao diện lập trình ứng dụng (APIs).
* Mức độ che phủ code –  tạo các trường hợp kiểm thử để nhằm cover tối đa các khu vực bị thiếu hoặc không hợp lệ.
* Phương pháp tiêm lỗi – cải tiến bao phủ một trường hợp bằng cách đưa một số lỗi vào để test các đường dẫn code.
* Kiểm thử đột biến ( Mutation Testing)
* Phương pháp kiểm tra tĩnh
 
 Nguồn: https://en.wikipedia.org/wiki/Software_testing