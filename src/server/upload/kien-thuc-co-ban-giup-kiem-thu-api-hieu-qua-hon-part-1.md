### API là gì?

API là từ viết tắt của Application Programming Interface, API được sử dụng để tích hợp các hệ thống với nhau. Bạn có thể tạo sẵn dữ liệu cho các hệ thống khác truy cập thông qua API hoặc được các hệ thống khác chia sẻ dữ liệu. Đây là cách các thiết bị và ứng dụng khác nhau trao đổi và chia sẻ dữ liệu. Mỗi hệ thống phần mềm thực hiện một API chứa các hàm/ chương trình con có thể được thực thi bởi một hệ thống phần mềm khác. 

Thông thường, API hoạt động tương tự như cách hoạt động của bất kỳ trang web nào. Yêu cầu (request) được gửi từ client tới server và trả về phản hồi (response) cho client.

Ví dụ, website Google có thể có API cho các chức năng khác nhau như search, translate, calendar,...

Một API có cấu trúc như sau: http://<servername>/v1/export/Publisher/Standard_Publisher_Report?format=csv

API gồm nhiều phương thức, chủ yếu có 4 phương thức phổ biến sau:

GET: Truy xuất một tài nguyên, nhận dữ liệu từ server và hiển thị
    
POST: Tạo một tài nguyên trên server
    
PUT: Thay đổi trạng thái một tài nguyên hoặc cập nhật nó
    
DELETE: Huỷ bỏ hoặc xoá một tài nguyên

### Thế nào là API Testing?

![](https://images.viblo.asia/ff6b0c7a-3a24-4f57-a5d1-693b69b15b13.png)

API Testing hoàn toàn khác với GUI Testing, tập trung chủ yếu vào logic nghiệp vụ của ứng dụng phần mềm và sẽ không tập trung vào giao diện của ứng dụng.

Thay vì sử dụng đầu vào từ người dùng chuẩn (bàn phím/ chuột) và đầu ra, thì trong kiểm thử API  sử dụng phần mềm để gửi các yêu cầu đến API, nhận đầu ra và ghi lại phản hồi của hệ thống.

API Testing yêu cầu ứng dụng tương tác với API. Để kiểm thử một API  sẽ cần:

* Sử dụng công cụ kiểm thử để tiếp cận API
* Viết script để kiểm thử API
 
Như vậy, kiểm thử API là:
* Kiểm thử không cần giao diện (GUI).
* Lập trình mô phỏng dữ liệu và điều khiển theo kịch bản.
* Kiểm thử tập trung vào chức năng, không phụ thuộc vào hành vi hay kinh nghiệm của người dùng.
    
### Lập kế hoạch kiểm thử API cần những gì?

Trước khi bắt tay vào kiểm thử API, bạn nên suy nghĩ về những gì sẽ được test và thực hiện nó như thế nào. Tùy thuộc vào yêu cầu, bạn có thể cần tạo tài liệu kỹ thuật hoặc tài liệu thiết kế, và nó nên được review bởi các đồng nghiệp của mình. Tài liệu này sẽ sử dụng trong suốt quá trình kiểm thử cũng như nâng cấp của bạn.

Thiết lập một môi trường kiểm thử: cấu hình databasse và server cho các yêu cầu của ứng dụng, đáp ứng các thông số cần thiết của API. Sau khi thiết lập xong môi trường kiểm thử, các API cần được gọi để đảm bảo API được hoạt động trước khi thực hiện những kiểm thử chi tiết hơn.

Bạn cần phải sắp xếp thời gian cho các kiểm thử API cần có. Bắt đầu bằng cách tự hỏi những câu hỏi sau:

* Đối tượng mục tiêu của bạn là ai? người sử dụng API là ai?
* Các API thường sử dụng môi trường gì?
* Bạn đang kiểm thử ở khía cạnh nào?
* Kiểm thử cho vấn đề gì?
* Ưu tiên kiểm tra cho cái nào?
* Những gì sẽ xảy ra trong trường hợp bình thường?
* Những khả năng nào có thể xảy ra trong trường hợp bất thường?
* Những gì được định nghĩa là Pass/ Fail? dữ liệu đầu ra mong muốn dữ liệu là gì? chuỗi hành động là gì?
* API có thể tương tác với API nào khác không?
* Ai trong team sẽ phụ trách thử nghiệm này?

### Set-up môi trường kiểm thử API

Kiểm thử API khác với các loại kiểm thử khác như GUI Testing, phải thiết lập môi trường ban đầu để gọi API với các tham số bắt buộc, sau đó kiểm tra kết quả đã thực hiện.

Do đó, việc thiết lập môi trường để kiểm thử API có vẻ hơi phức tạp một chút.

Database  và server phải được cấu hình theo yêu cầu của ứng dụng.

Sau khi cài đặt xong, hàm API sẽ được gọi để kiểm tra xem API này đó có đang hoạt động hay không.

### Output của một API

Output of API có thể là:

1. Bất kỳ loại dự liệu nào.
Ex: Có một hàm API cần tính tổng hai số nguyên.
> Long add(int a, int b)

a,b là các tham số để input. Output là tổng của hai số nguyên, được so sánh với Expected result (Kết quả mong muốn).

Ví dụ cụ thể:

> add (1234, 5656)

Các ngoại lệ phải được xử lý nếu số đó vượt quá giới hạn số nguyên.

2. Trạng thái (Pass or Fail).

Xét hàm API sau đây:

* Lock()
* Unlock()
* Delete()

Các hàm này trả về kết quả đầu ra là True (trong trường hợp thành công) hoặc False (trong trường hợp có lỗi).

Một Test Case chính xác hơn khi gọi bất kỳ hàm nào trong tập script và sau đó kiểm tra các thay đổi trong database hoặc GUI ứng dụng.

3. Gọi tới một API khác.

Gọi một trong các hàm API, sau đó lần lượt sẽ gọi một hàm khác.

Ex: Hàm API đầu tiên có thể được sử dụng để xóa một bản ghi đã chỉ định trong bảng và lần lượt, hàm này gọi một hàm khác để REFRESH database.

### Test Cases cho API Testing

Test cases về API testing được dựa trên:

* Giá trị trả về dựa vào điều kiện đầu vào: case này tương đối dễ kiểm thử, vì đầu vào có thể được xác định và kết quả có thể được xác thực.
* Không trả ra bất cứ điều gì: Khi không có giá trị trả về, hoạt động của API trên hệ thống sẽ được kiểm tra.
* Kích hoạt một số API/ Event/ gián đoạn khác: Nếu đầu ra của API kích hoạt một Event hoặc một gián đoạn, thì những Event, gián đoạn đó sẽ trả về kết quả tương ứng và được theo dõi.
* Cập nhật cấu trúc dữ liệu: Cập nhật cấu trúc dữ liệu sẽ có một số kết quả hoặc ảnh hưởng đến hệ thống và cần được xác thực.
* Chỉnh sửa resource: Nếu gọi API chỉnh sửa một số resource thì nó sẽ được xác thực bằng cách truy cập các resource tương ứng.

### Những loại kiểm thử trong API Testing

* **Discovery testing**: Kiểm thử thủ công (manually execute) tập hợp các API được gọi như xác minh rằng resource cụ thể được API hiển thị có thể được liệt kê, tạo và xóa khi thích hợp.
* **Usability testing** (Kiểm thử khả năng sử dụng): xác minh xem API có hoạt động hay không, thân thiện với người dùng hay không, API có tích hợp tốt với một nền tảng khác hay không.
* **Security testing** (Kiểm thử bảo mật): bắt buộc xác định loại xác thực, và dữ liệu bảo mật đã được mã hóa qua HTTP chưa.
* **Automated testing**: Việc kiểm thử API có thể đạt đến đỉnh điểm khi tạo ra một tập script và tool được sử dụng để kiểm thử thường xuyên.
* **Documentation**: Tester phải đảm bảo đầy đủ tài liệu và cung cấp đủ thông tin để tương tác với API. Tài liệu là một phần của bản cuối cùng trước khi bàn giao cho giai đoạn kiểm thử tiếp đó.

### Phân loại Bug của API Testing

* Không xử lý các điều kiện lỗi một cách chuẩn.
* Cờ báo hiệu lỗi không hoạt động.
* Thiếu hoặc trùng lặp chức năng.
* Vấn đề độ tin cậy. Khó kết nối và nhận phản hồi từ API.
* Vấn đê bảo mật.
* Sự cố đa luồng.
* Vấn đề hiệu năng. Thời gian phản hồi API rất lâu.
* Lỗi/ cảnh báo không đúng cho user.
* Xử lý không chính xác các giá trị đối số hợp lệ.
* Dữ liệu phản hồi không được cấu trúc đúng.

Continue...

Bài viết được dịch và tham khảo từ nguồn:
    
    https://www.guru99.com/api-testing.html
    https://www.guru99.com/api-testing-with-qtp-hp-uft.html
    https://www.guru99.com/testing-rest-api-manually.html