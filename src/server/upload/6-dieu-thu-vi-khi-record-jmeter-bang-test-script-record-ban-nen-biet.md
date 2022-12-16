Nếu bạn là người đã biết qua seledium cơ bản thì việc thực hiện các record bằng jmeter cũng thật dễ dàng. Ngoài cách nhập tay bởi các giá trị API giá trị đầu vào login, các đường link bạn có thể để cho jmeter tự động record những bước đó qua những thao tác bằng tay của bạn.
### 1.	Thực hiện thao tác tạo record 
Bước 1: Mở jmeter 
Bước 2: Chọn icon Test script record 
 ![](https://images.viblo.asia/ff30c3b5-7bb2-4b8b-8bdb-94a41e319cc6.png)
Bước 3: Hiển thị pop_up templates -> chọn select template : recording -> click create

Bước 4: Set up môi trường viết record
TH ví dụ với chrome: Setting -> Open proxy setting -> LAN settings ->  Chọn Use a proxy.... có address : localost và Port 8080 giống với Port cổng trên proxy
![](https://images.viblo.asia/8d4f17a4-60ae-4b35-b4ba-773172cc913d.png)

Bước 5: Click start button và thực hiện record -> sau khi tạm dừng record và chọn lọc kịch bản dư thừa.
### 2.	Thực hiện sử dụng Regular Expression Extractor để tạo biến chung token cho các trang
![](https://images.viblo.asia/2ba8fe61-5009-42ed-a293-ceb466bfde3f.png)
Name of created variable: Tên biến mà mình muốn đặt
Regular expression: 
Cách lấy expression là một công thức ta cần biết đến:
Bước 1 : Login vào trang web test-> mở code -> search token -> tìm kiếm chỗ có tên giá trị của token ( ví dụ name="_csrfToken") -> Copy toàn bộ giá trị liên quan -> Link : https://regex101.com/ check giá trị công thức của postman
Template: Điền giá trị $
Giá trị Default value: Giá trị trả về khi không gọi được token nó trả về giá trị default

Bước 2: Thay toàn bộ những đoạn record có chứa token = templete+{Name}

Bước 3: Chay kịch bản và đọc kết quả

### 3.	Cách đặt tên biến random variables
TIếp tục các bước trên 
Bước 1: Thread group -> Add -> Config Element -> Random variables

Bước 2: 
 ![](https://images.viblo.asia/93e7664e-0c84-4351-9472-89d5eaef5ee6.png)

Variable Name: Tên biến
Output Format: Nhập hoặc không, Khuyến khích nhập thường áp dụng các dạng như register nhập email đúng định dạng email ( ví dụ: 000_@gmail.com)
Minimum Value: độ dài  nhỏ nhất giá trị
Maximum Value : độ dài nhất giá trị

Bước 3: Vào trang truyển là param default cho giá trị 
Ví dụ : 
Trang register : Gmail : ${variable name}

Bước 4: Chạy và ra kết quả 
### 4.	Các sử dụng User Defined Variables 
Đối với trường này là thường áp dụng để thêm mới một ký tự được tạo thành lần lượt theo tổ hợp của một chuỗi ký tự nào đó. Bạn có thể mường tượng đến thêm chuỗi ký tự của id có định dạng: ( abs3_daess_adsee_3293jsdf). Lúc này User Defined Variables là hữu hiệu nhất mà bạn có thể có. Các bước thực hiện như sau:
Vẫn lấy nguyên giá trị luồng phía trên

Bước 1:  Thread group -> Add -> Config Element -> User Defined Variables

Bước 2:  
 ![](https://images.viblo.asia/a60d8ac4-5f86-482d-ae8b-8af803fe15a6.png)

 Nhập Name là tên biến 
 Nhập Value có định dạng : ${RandomString(8,abcdefghijklmnopqrstuvwxyz)}-${RandomString(4,abcdefghijklmnopqrstuvwxyz)}-${__RandomString(4,abcdefghijklmnopqrstuvwxyz)}-${__RandomString(4,abcdefghijklmnopqrstuvwxyz)}-${__RandomString(12,abcdefghijklmnopqrstuvwxyz)}
 
Bước 3: Quay lại trang cần biến random gán giá trị là : ${Name}

Bước 4: Chạy kịch bản và đọc kết quả

### 5.	Sử dụng CSV Data Set Controller 
Việc áp dụng này là thường áp dụng khi mình muốn truy vấn hoặc gọi những giá trị mà hệ thống có sẵn. Các bước thực hiện như sau:

Bài toán đặt ra: Cùng truy cập vào nhiều task user 1 lúc

Bước 1: Chuẩn bị file CSV : Vào Database tải id task : câu lệnh SELECT DISTINCT taskId FROM `tbschedule` -> xuất file CSV

Bước 2: Mở CSV Data Set Controller: Thread group -> Add -> Config Element -> CSV Data Set Controller
 ![](https://images.viblo.asia/81ca8335-b95a-4923-91d7-9a05643edc0a.png)

Filename : Upload file csv
Variable Names : Tên biến

Bước 3: Thay giá trị của id cần đẩy lên =${Variable Names”

Bước 4: Thực hiện chạy kịch bản và đọc kết quả

Chú ý một số tình huống báo thành công nhưng kết quả trả về ko như mong muốn như data bị mã hóa làm trả về giá trị sai: hãy thay đổi giá trị Allow quoted data thành True
### 6.	Debug Sampler 
Từ những kết quả hành động trên tôi thấy rằng đôi khi jmeter có báo kết quả thành công màu xanh nhưng giá trị mong muốn là không trả về đúng. Và Debug Sampler giúp người dùng check giá trị trả về để có thể fix đúng chỗ đúng hướng

Bước 1 : Mở Debug Sampler: Thread group -> Add -> Sampler -> Debug Sampler

Bước 2: Thực hiện chạy kịch bản và đọc kết quả

Bước 3: Check kết quả tại mục Debug sampler -> chọn Response Body -> check giá trị trả về

                                          ` Hẹn gặp các bạn chủ để test tiếp tục lần sau `