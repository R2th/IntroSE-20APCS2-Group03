Trước hết mở đầu bài viết sẽ giới thiệu về định nghĩa

**1. Định nghĩa về API**

API là viết tắt của Application Programming Interface – phương thức trung gian kết nối các ứng dụng và thư viện khác nhau.
Nó cung cấp khả năng truy xuất đến một tập các hàm hay dùng, từ đó có thể trao đổi dữ liệu giữa các ứng dụng. Thi thoảng vẫn có người lầm tưởng API là một ngôn ngữ lập trình nhưng thực ra, API chỉ là các hàm hay thủ tục thông thường. Các hàm này được viết trên nhiều ngôn ngữ lập trình khác nhau.

**2. Khái quát về API Testing**

API testing là một loại kiểm thử phần mềm bao gồm kiểm tra trực tiếp các giao diện lập trình ứng dụng (API) và là một phần của kiểm thử tích hợp để xác định xem chúng có đáp ứng mong đợi về chức năng, độ tin cậy, hiệu suất và bảo mật không.
Vì API thiếu GUI, API testing được thực hiện ở message layer.
API testing được coi là quan trọng cho automation testing vì các API đóng vai trò là giao diện chính cho logic ứng dụng và do GUI test rất khó duy trì với các chu kỳ release ngắn và các thay đổi thường được sử dụng trong Agile và DevOps.

![](https://images.viblo.asia/350c08c4-6d7e-468d-9b0e-b8fc2fe6d80b.png)

**So sánh API testing và GUI testing**

- API testing phù hợp hơn cho test automation và test liên tục (đặc biệt trong Agile và DevOps) so với GUI testing. Bởi vì:
Độ phức tạp của hệ thống: GUI testing không thể xác minh đầy đủ các fuctional path và API / service liên quan đến kiến trúc đa nhiệm. API được coi là giao diện ổn định nhất cho hệ thống được test.
Các chu kỳ release ngắn với các vòng phản hồi nhanh: Các nhóm Agile và DevOps làm việc với các vòng lặp ngắn (short iterations) và các vòng phản hồi nhanh (fast feedback loops) thấy rằng GUI testing  yêu cầu làm lại đáng kể để theo kịp sự thay đổi thường xuyên. Testing ở lớp API ít hơn và dễ bảo trì hơn.
Vì những lý do này, chúng ta nên tăng API testing và giảm sự phụ thuộc vào GUI testing. API testing được khuyến nghị cho phần lớn các automation test và thử nghiệm càng nhiều càng tốt. GUI testing sau đó được dành riêng để xác thực các trường hợp ở system level, mobile testing, và usability testing.

**Thiết lập môi trường test API**

- API testing khác với các loại kiểm thử phần mềm khác vì GUI không khả dụng.
Tuy nhiên, bạn được yêu cầu thiết lập môi trường ban đầu gọi API với một bộ tham số bắt buộc và cuối cùng là kiểm tra kết quả.
Do đó, thiết lập môi trường thử nghiệm API testing  khá phức tạp.
Cơ sở dữ liệu và máy chủ nên được cấu hình theo yêu cầu ứng dụng.
Sau khi cài đặt xong, Hàm API sẽ được gọi để kiểm tra xem API đó có hoạt động không.

**Các loại đầu ra của API**

- Đầu ra của API có thể là:
   + Bất kỳ loại dữ liệu nào
   + Trạng thái (Pass hoặc Fail1)
   + Gọi một API function khác.

*Hãy xem xét ví dụ về từng loại trên:*

Bất kỳ loại dữ liệu nào
Ví dụ: một hàm API sẽ thêm hai số nguyên.

Long add(int a, int b)

Các số phải được đưa ra làm tham số đầu vào. Đầu ra phải là tổng của hai số nguyên. Đầu ra này cần phải được xác minh với một kết quả mong đợi.
Call phải là
add (1234, 5656)
Các ngoại lệ phải được xử lý nếu số lượng vượt quá giới hạn số nguyên.

*Trạng thái (Pass hoặc Fail)*

Hãy xem xét API function bên dưới
Lock()
Unlock()
Delete()
Nó trả về bất kỳ giá trị nào như True (trường hợp thành công) hoặc false (trường hợp có lỗi).
Một Test Case chính xác hơn sẽ có thể gọi các hàm trong bất kỳ tập lệnh nào và sau đó kiểm tra các thay đổi trong cơ sở dữ liệu hoặc application GUI.

*Call một API / Event*

Trong trường hợp này, khi ta gọi một trong các hàm API, và hàm này sẽ gọi một hàm khác.

Ví dụ: Hàm API đầu tiên có thể được sử dụng để xóa một record đã chỉ định trong bảng và tiếp đó, hàm này gọi một hàm khác để REFRESH cơ sở dữ liệu.
 
*Test case trong API testing*

Test case trong API testing dựa vào:

– Giá trị trả về dựa trên điều kiện đầu vào: tương đối dễ kiểm tra, vì đầu vào có thể được xác định và kết quả có thể được xác thực.

– Không trả về bất cứ điều gì: Khi không có giá trị trả về, một hành vi API trên hệ thống sẽ được kiểm tra

– Kích hoạt một số API / Event / Interupt: Nếu đầu ra của API kích hoạt một số event hoặc gián đoạn, thì những listerner của event hoặc interupt đó sẽ được theo dõi.

– Cập nhật cấu trúc dữ liệu: Cập nhật cấu trúc dữ liệu sẽ có một số kết quả hoặc ảnh hưởng đến hệ thống và cần được xác thực.

– Sửa đổi một số tài nguyên: Nếu lệnh gọi API sửa đổi một số tài nguyên thì nó phải được xác thực bằng cách truy cập các tài nguyên tương ứng.

**3. Tại sao lại cần test API** 

Kiểm thử API giúp có được một chiến lược kiểm thử tự động hiệu quả và giảm chi phí.
Giúp xác định và khắc phục sớm các vấn đề trong vòng đời phát triển.
Trong quá trình triển khai dự án, phần server và client làm độc lập với nhau nên có nhiều chỗ bên Client chưa làm xong, ta không thể chờ Client làm xong để test được dữ liệu.
Do đó ta cần kiểm tra API bằng công cụ khác, lúc này việc test hoàn toàn không phụ thuộc gì vào client.
Khi Client làm xong rồi, nếu ta kiểm tra trên client mà thấy lỗi liên quan đến logic và dữ liệu thì cũng cần phải kiểm tra thêm cả API để biết chính xác là server hay client sai nhằm giúp cho việc sửa lỗi nhanh hơn.
Khi làm hệ thống web services, dự án chỉ viết API cho bên khác dùng, nên sẽ không có client để test giống như các dự án khác. Do đó, phải test API hoàn toàn.

**4.  Cách test API**

Gửi yêu cầu (Run request) lên server

*Các giao thức hay sử dụng :*

GET: Yêu cầu server đưa lại resource

POST: Yêu cầu server cho tạo ra 1 resource mới

PUT: Yêu cầu server cho sửa resource

DELETE: Yêu cầu server cho xóa 1 resource

Check response (Kết quả server trả về)

So sánh với tài liệu API kết quả mong đợi.

**5. Cách test API hiệu quả**
 
* Các test case cho kiểm thử API:*

Các trường hợp thử nghiệm về kiểm tra API dựa trên:
Giá trị trả về dựa trên điều kiện đầu vào:
Nó tương đối dễ dàng để kiểm tra, như đầu vào có thể được xác định và kết quả có thể được chứng thực.
Không trả lại bất cứ điều gì: Khi không có giá trị trả về, hành vi của API trên hệ thống sẽ được kiểm tra.
Kích hoạt một số API / sự kiện / gián đoạn khác.
Nếu đầu ra của một API kích hoạt một số sự kiện hoặc gián đoạn, thì những sự kiện đó phải được theo dõi.
Cập nhật cấu trúc dữ liệu: Cập nhật cấu trúc dữ liệu sẽ có một số kết quả hoặc ảnh hưởng lên hệ thống và cần được chứng thực.
Sửa đổi một số tài nguyên nhất định: Nếu API gọi sửa đổi một số tài nguyên thì cần phải xác nhận hợp lệ bằng cách truy cập các tài nguyên tương ứng.

*Các phương pháp tiếp cận kiểm thử API*

Dưới đây là các điểm có thể giúp người dùng thực hiện các hướng kiểm thử API:
Hiểu các chức năng của chương trình API và định nghĩa rõ phạm vi của phần mềm
Áp dụng các kỹ thuật kiểm thử như lớp tương đương (equivalence classes), phân tích giá trị biên (boundary value analysis) và đoán lỗi (error guessing) và viết test case cho API
Các tham số truyền vào cho API cần được lập kế hoạch và định nghĩa thích hợp
Chạy các test case và so sánh giữa kết quả mong muốn và kết quả thực tế

**6. Một số phương pháp kiểm thử API phổ biến**

Functionality testing – xác nhận API hoạt động chính xác theo đúng chức năng mà nó được tạo ra.
Usability testing: Xác nhận API có thể hoạt động một cách dễ dàng.
Reliability testing: xác nhận việc gọi API và trả kết quả hoạt động ổn định và nhất quán.
Load testing: xác nhận API hoạt động đúng với một lượng cuộc gọi lớn nhất định.
Security testing: Xác nhận API đã định nghĩa nhưng yêu cầu về bảo mật như authentication, permission và access controls.
API documentation testing – Discovery testing: xác nhận tài liệu hướng dẫn sử dụng của API là dễ sử dụng cho user.

**KẾT LUẬN**

API bao gồm một tập hợp các lớp / hàm / tổng quan logic nghiệp vụ. Nếu API không được kiểm tra đúng cách, nó có thể gây ra sự cố nghiêm trọng không chỉ ứng dụng API mà còn trong chính phần mềm kiểm thử. 

Tài liệu tham khảo: https://www.guru99.com/api-testing.html