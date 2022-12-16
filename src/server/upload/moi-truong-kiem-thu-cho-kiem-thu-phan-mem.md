# Môi trường kiểm thử (Test Environment) là gì?
Một môi trường kiểm thử là một thiết lập phần mềm và phần cứng cho các nhóm kiểm thử để thực hiện các trường hợp kiểm thử. Nói cách khác, nó hỗ trợ thực hiện kiểm tra với phần cứng, phần mềm và cấu hình mạng.

Test bed hoặc test environment được định cấu hình theo nhu cầu của Ứng dụng đang thử nghiệm. Trong một số trường hợp, Test bed có thể là sự kết hợp của môi trường thử nghiệm và dữ liệu thử nghiệm mà nó vận hành.

Thiết lập một môi trường kiểm thử đúng đảm bảo kiểm thử phần mềm thành công. Bất kỳ sai sót trong quá trình này có thể dẫn đến chi phí và thời gian thêm cho khách hàng.

# Các vùng chính để thiết lập trong Môi trường kiểm thử
Đối với môi trường kiểm thử, một vùng chính cần thiết lập bao gồm:

* Hệ thống và ứng dụng
* Dữ liệu kiểm tra
* Máy chủ cơ sở dữ liệu
* Môi trường chạy front-end
* Hệ điều hành khách hàng
* Trình duyệt
* Phần cứng bao gồm hệ điều hành máy chủ
* Mạng
* Tài liệu cần có như tài liệu tham khảo / hướng dẫn cấu hình / hướng dẫn cài đặt / hướng dẫn sử dụng

# Quy trình thiết lập môi trường kiểm thử phần mềm
Các lần kiểm thử được giới hạn trong những gì có thể được kiểm tra và những gì không nên được kiểm tra.

Những người sau có liên quan đến thiết lập môi trường thử nghiệm

* Quản trị viên hệ thống,
* Nhà phát triển
* Người kiểm thử
* Đôi khi người dùng hoặc chuyên viên có khả năng kiểm thử.

Môi trường thử nghiệm yêu cầu thiết lập nhiều khu vực riêng biệt khác nhau như,

### Thiết lập máy chủ kiểm thử  (Test Server)

Mọi kiểm thử có thể không được thực hiện trên một máy cục bộ. Nó có thể cần thiết lập một máy chủ kiểm thử, máy chủ này có thể hỗ trợ các ứng dụng.

Ví dụ: Fedora thiết lập cho PHP, các ứng dụng dựa trên Java có hoặc không có máy chủ mail, thiết lập cron, ứng dụng dựa trên Java, v.v.

### Mạng

Mạng được thiết lập theo yêu cầu thử nghiệm. Nó bao gồm,

* Thiết lập Internet
* Thiết lập Wifi, mạng LAN
* Thiết lập mạng riêng

Nó đảm bảo rằng sự tắc nghẽn xảy ra trong quá trình thử nghiệm không ảnh hưởng đến các thành viên khác. (Nhà phát triển, nhà thiết kế, những người viết nội dung, v.v.)

### Cài đặt PC kiểm thử

Để kiểm thử web, bạn có thể cần thiết lập các trình duyệt khác nhau cho những người kiểm thử khác nhau. Đối với các ứng dụng máy tính để bàn, bạn cần nhiều loại HĐH khác nhau cho các máy tính thử nghiệm khác nhau.

Ví dụ: Test cho ứng dụng Windows phone có thể yêu cầu

* Cài đặt Visual Studio
* Trình giả lập điện thoại Windows
* Ngoài ra, chỉ định một điện thoại windows cho người kiểm thử.

### Báo cáo lỗi

Các công cụ báo cáo lỗi nên được cung cấp cho người kiểm thử.

### Tạo dữ liệu kiểm thử (data test) cho môi trường kiểm thử (Test enviroment)

Nhiều công ty sử dụng một môi trường kiểm thử riêng biệt để kiểm tra sản phẩm phần mềm. Phương pháp phổ biến được sử dụng là sao chép dữ liệu sản xuất để kiểm tra. Điều này giúp ích cho người kiểm thử, phát hiện các vấn đề tương tự như một máy chủ sản xuất trực tiếp, mà không làm hỏng dữ liệu sản xuất.

Phương pháp sao chép dữ liệu sản xuất để kiểm tra dữ liệu bao gồm,

* Thiết lập công việc sản xuất để sao chép dữ liệu vào môi trường kiểm thử chung
* Tất cả PII (Personally Identifiable Information - Thông tin nhận dạng cá nhân) được sửa đổi cùng với dữ liệu nhạy cảm khác. PII được thay thế bằng dữ liệu chính xác, nhưng không phải dữ liệu cá nhân.
* Xóa dữ liệu không liên quan đến việc kiểm thử của bạn.

Người kiểm thử hoặc nhà phát triển có thể sao chép điều này vào môi trường kiểm thử cá nhân của họ. Họ có thể sửa đổi nó theo yêu cầu của họ.

* Quyền riêng tư là vấn đề chính trong dữ liệu sản xuất sao chép. Để khắc phục các vấn đề riêng tư, bạn nên xem xét dữ liệu thử nghiệm bị ẩn giấu và ẩn danh.

Để ẩn danh dữ liệu, hai cách tiếp cận có thể được sử dụng,

* BlackList: Trong cách tiếp cận này, tất cả các trường dữ liệu được giữ nguyên. Ngoại trừ những trường được chỉ định bởi người dùng.
* WhiteList: Theo mặc định, cách tiếp cận này, ẩn danh tất cả các trường dữ liệu. Ngoại trừ một danh sách các lĩnh vực được phép sao chép. Một trường trong danh sách trắng ngụ ý rằng việc sao chép dữ liệu là ổn và không cần phải ẩn danh.
Ngoài ra, nếu bạn đang sử dụng dữ liệu sản xuất, bạn cần phải thông minh về cách lấy dữ liệu nguồn. Truy vấn cơ sở dữ liệu bằng cách sử dụng tập lệnh SQL là một cách tiếp cận hiệu quả.

### Quản lý môi trường kiểm thử
Quản lý môi trường kiểm thử liên quan đến việc bảo trì và bảo trì test bed.

Danh sách các hoạt động của chức năng quản lý môi trường kiểm thử bao gồm,

1. Bảo trì một kho lưu trữ trung tâm với tất cả các phiên bản cập nhật của môi trường kiểm thử.
2. Kiểm tra quản lý môi trường theo yêu cầu của nhóm kiểm thử.
3. Theo yêu cầu mới tạo ra môi trường mới
4. Giám sát môi trường
5. Cập nhật / xóa môi trường kiểm tra lỗi thời
6. Điều tra các vấn đề về môi trường
7. Phối hợp cho đến khi giải quyết vấn đề.

# Test Environment Checklist
![](https://images.viblo.asia/ecbfcf0e-6f90-4a45-b3cc-a7f55a3beb17.PNG)

Bên cạnh đó, có một vài câu hỏi khác để trả lời trước khi thiết lập môi trường thử nghiệm.

* Nên phát triển Môi trường kiểm thử nội bộ hay thuê ngoài?
* Có tuân theo tiêu chuẩn nội bộ của công ty hay theo bất kỳ bên ngoài nào (IEE, ISO, v.v.) không?
* Môi trường kiểm thử trong bao lâu là cần thiết?
* Sự khác biệt giữa các hệ thống thử nghiệm và sản xuất và tác động của chúng đến hiệu lực thử nghiệm phải được xác định.
* Bạn có thể sử dụng lại một thiết lập hiện có cho các dự án khác trong công ty không?

# Những thách thức trong việc thiết lập Quản lý môi trường thử nghiệm
### 1. Lập kế hoạch phù hợp về sử dụng tài nguyên
Lập kế hoạch không hiệu quả cho việc sử dụng tài nguyên có thể ảnh hưởng đến đầu ra thực tế. Ngoài ra, nó có thể dẫn đến xung đột giữa các đội.

### 2. Môi trường từ xa
Có thể là một môi trường Test nằm cách nhau về mặt địa lý. Trong trường hợp như vậy, nhóm kiểm thử phải dựa vào nhóm hỗ trợ cho các tài sản thử nghiệm khác nhau. (Phần mềm, phần cứng và các vấn đề khác).

### 3. Xây dựng thời gian thiết lập
Đôi khi, kiểm tra được thiết lập trở nên quá phức tạp trong các trường hợp Kiểm thử tích hợp.

### 4. Sử dụng chung theo nhóm
Nếu môi trường thử nghiệm được sử dụng bởi nhóm phát triển & thử nghiệm đồng thời, kết quả thử nghiệm sẽ bị hỏng.

### 5. Cấu hình kiểm tra phức tạp
Một số thử nghiệm yêu cầu cấu hình môi trường thử nghiệm phức tạp. Nó có thể đặt ra một thách thức cho nhóm kiểm thử.

# Cách tốt nhất để thiết lập Quản lý môi trường kiểm thử
1. Hiểu các yêu cầu kiểm tra kỹ lưỡng và giáo dục các thành viên trong nhóm thử nghiệm.
2. Kết nối phải được kiểm tra trước khi bắt đầu thử nghiệm
3. Kiểm tra phần cứng và phần mềm cần thiết, giấy phép
4. Trình duyệt và phiên bản
5. Lập kế hoạch sử dụng theo lịch trình của môi trường thử nghiệm.
6. Công cụ tự động hóa và cấu hình của chúng.

# Test Bed là gì?
Nói chung, Test Bed là một môi trường phát triển phần mềm. Nó cho phép các nhà phát triển kiểm tra các mô-đun của họ mà không ảnh hưởng đến các máy chủ sản xuất trực tiếp. Test Bed không chỉ giới hạn cho các nhà phát triển mà còn được sử dụng bởi những người kiểm thử. Nó được gọi là một môi trường thử nghiệm là tốt.

### Tóm lại:

* Môi trường kiểm thử là thiết lập phần mềm và phần cứng mà nhóm kiểm thử sẽ tiến hành thử nghiệm
* Đối với môi trường kiểm thử, một khu vực chính cần thiết lập bao gồm
   - Hệ thống và ứng dụng
   - Dữ liệu kiểm tra
   - Máy chủ cơ sở dữ liệu
   - Môi trường chạy front-end, v.v.
* Vài thử thách trong khi thiết lập môi trường thử nghiệm bao gồm,
  - Môi trường từ xa
  - Sử dụng kết hợp giữa các đội
  - Xây dựng thời gian thiết lập
  - Lập kế hoạch không hiệu quả để sử dụng tài nguyên để tích hợp
  - Cấu hình kiểm tra phức tạp

Nguồn: https://www.guru99.com/test-environment-software-testing.html