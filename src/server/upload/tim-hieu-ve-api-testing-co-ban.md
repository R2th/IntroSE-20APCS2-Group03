# 1. API là gì?

**API là từ viết tắt của  Application Programming Interface** 
![](https://images.viblo.asia/0a62910a-0463-4f76-81ae-a4dda27ce0ff.PNG)

API được biết đến với vai trò là phương thức kết nối với các thư viện và ứng dụng.Hay chính là cầu nối giữa client và server. Client ở đây có thể là máy tính, điện thoại sử dụng hệ điều hành khác nhau và được viết bằng những ngôn ngữ khác nhau. Tương tự, server back- end cũng được viết bằng các ngôn ngữ khác nhau. Để client và server có thể nói chuyện được với nhau chúng phải nói cùng 1 ngôn ngữ. Ngôn ngữ ấy chính là API.

Cơ chế hoạt động của API: Yêu cầu (request) được gửi từ client tới server và kết quả được phản hồi (response) thông qua giao thức HTTP.
![](https://images.viblo.asia/703ba03a-c4ab-4ab5-b744-16972187522e.PNG)

# 2. Kiểm thử API ?
Loại kiểm thử này không tập trung trên giao diện vì chưa có GUI và thao tác trên một ứng dụng,chủ yếu tập trung vào lớp business logic của phần mềm.

Test API là test trên server không liên quan gì đến client. Test xong API thì test tiếp đến client 
Kiểm thử API khác với những loại kiểm thử khác vì giao diện chưa có nên bạn phải thiết lập môi trường khởi tạo và gọi API với các tham số yêu cầu và sau đó kiểm tra kết quả trả về.

Những ví dụ kiểm tra API phổ biến:

Kiểm tra giá trị trả lại API dựa trên điều kiện đầu vào

Xác nhận API không trả lại bất kỳ điều gì hoặc kết quả sai

Xác nhận API có kích hoạt một số sự kiện khác hoặc gọi một số sự kiện khác không

Xác nhận API có đang cập nhật cấu trúc dữ liệu nào không 

Trong kiểm thử API bạn phải sử dụng một công cụ để gửi các yêu cầu đến API nhận đầu ra và ghi lại các phản hồi của hệ thống. 

Chúng ta có thể dùng một số tool: Postman, Rest client,...

- Giao diện tool Postman:
![](https://images.viblo.asia/32d6fd63-3c31-454e-a419-dd7a5bb89f51.PNG)
- Giao diện tool Rest Client:
![](https://images.viblo.asia/be273d26-31b3-4c5d-b5a6-da8bd53212f8.PNG)

# 3. Tại sao lại cần test API ?
Kiểm thử API giúp có được một chiến lược kiểm thử tự động hiệu quả và giảm chi phí.

Giúp xác định và khắc phục sớm các vấn đề trong vòng đời phát triển.

Trong quá trình triển khai dự án, phần server và client làm độc lập với nhau nên có nhiều chỗ bên Client chưa làm xong, ta không thể chờ Client làm xong để test được dữ liệu. 

Do đó ta cần kiểm tra API bằng công cụ khác, lúc này việc test hoàn toàn không phụ thuộc gì vào client.

Khi Client làm xong rồi, nếu ta kiểm tra trên client mà thấy lỗi liên quan đến logic và dữ liệu thì cũng cần phải kiểm tra thêm cả API để biết chính xác là server hay client sai nhằm giúp cho việc sửa lỗi nhanh hơn.

Khi làm hệ thống web services, dự án chỉ viết API cho bên khác dùng, nên sẽ không có client để test giống như các dự án khác. Do đó, phải test API hoàn toàn.

# 4. Cách test API?
- Gửi yêu cầu (Run request) lên server 

    Các giao thức hay sử dụng :

    GET: Yêu cầu server đưa lại resource

    POST: Yêu cầu server cho tạo ra 1 resource mới

    PUT: Yêu cầu server cho sửa resource

    DELETE: Yêu cầu server cho xóa 1 resource
    
- Check response (Kết quả server trả về)
- So sánh với tài liệu API kết quả mong đợi.

# 5. Cách test API hiệu quả 
**Các test case cho kiểm thử API:**

Các trường hợp thử nghiệm về kiểm tra API dựa trên:

Giá trị trả về dựa trên điều kiện đầu vào:

Nó tương đối dễ dàng để kiểm tra, như đầu vào có thể được xác định và kết quả có thể được chứng thực.

Không trả lại bất cứ điều gì: Khi không có giá trị trả về, hành vi của API trên hệ thống sẽ được kiểm tra.

Kích hoạt một số API / sự kiện / gián đoạn khác.

Nếu đầu ra của một API kích hoạt một số sự kiện hoặc gián đoạn, thì những sự kiện đó phải được theo dõi.

Cập nhật cấu trúc dữ liệu: Cập nhật cấu trúc dữ liệu sẽ có một số kết quả hoặc ảnh hưởng lên hệ thống và cần được chứng thực.

Sửa đổi một số tài nguyên nhất định: Nếu API gọi sửa đổi một số tài nguyên thì cần phải xác nhận hợp lệ bằng cách truy cập các tài nguyên tương ứng.

**Các phương pháp tiếp cận kiểm thử API** 

Dưới đây là các điểm có thể giúp người dùng thực hiện các hướng kiểm thử API:

Hiểu các chức năng của chương trình API và định nghĩa rõ phạm vi của phần mềm

Áp dụng các kỹ thuật kiểm thử như lớp tương đương (equivalence classes), phân tích giá trị biên (boundary value analysis) và đoán lỗi (error guessing) và viết test case cho API

Các tham số truyền vào cho API cần được lập kế hoạch và định nghĩa thích hợp

Chạy các test case và so sánh giữa kết quả mong muốn và kết quả thực tế   

# 6. Một số phương pháp kiểm thử API phổ biến

- Functionality testing - xác nhận API hoạt động chính xác theo đúng chức năng mà nó được tạo ra.
- Usability testing: Xác nhận API có thể hoạt động một cách dễ dàng.
- Reliability testing: xác nhận việc gọi API và trả kết quả hoạt động ổn định và nhất quán.
- Load testing: xác nhận API hoạt động đúng với một lượng cuộc gọi lớn nhất định.
- Security testing: Xác nhận API đã định nghĩa nhưng yêu cầu về bảo mật như authentication, permission và access controls.
- API documentation testing - Discovery testing: xác nhận tài liệu hướng dẫn  sử dụng của API là dễ sử dụng cho user.

#  Kết Luận 
Bài viết này chỉ hy vọng giúp các bạn hiểu cơ bản về API Testing . Bạn cần tìm hiểu thêm để có thể hiểu sâu hơn, thực hành test API bằng tool Postman hay Rest Client và áp dụng hiệu quả nó vào công việc của bạn. Bạn có thể tham khảo  ở link tài liệu tham khảo bên dưới để có thể học và thực hành một cách tốt nhất!

Tài liệu tham khảo: https://www.guru99.com/api-testing.html