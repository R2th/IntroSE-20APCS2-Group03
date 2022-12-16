![](https://images.viblo.asia/1b58e343-f163-4595-b9ef-122be7526964.jpg)

Bài viết được lược dịch từ trang https://www.guru99.com/test-environment-software-testing.html, có bổ sung thêm một số quan điểm của dịch giả.

# Môi trường kiểm thử là gì?
Môi trường kiểm thử là một thiết lập phần mềm và phần cứng cho các nhóm kiểm thử để thực hiện các trường hợp kiểm thử. Nói cách khác, nó hỗ trợ thực hiện kiểm tra với phần cứng, phần mềm và cấu hình mạng.
Môi trường kiểm thử được cấu hình theo nhu cầu của Ứng dụng đang thử nghiệm. Trong một số trường hợp, môi trường kiểm thử có thể là sự kết hợp của môi trường kiểm thử và dữ liệu kiểm thử mà nó vận hành.

Thiết lập một môi trường kiểm thử đúng đảm bảo kiểm thử phần mềm thành công. Bất kỳ sai sót trong quá trình này có thể dẫn đến việc tăng chi phí và thời gian sử dụng.

# Các khóa then chốt để thiết lập trong môi trường kiểm thử
Đối với môi trường kiểm thử, các khóa then chốt cần thiết lập bao gồm:
* Hệ thống và ứng dụng (**System and Application**): là phần quan trọng nhất cho việc kiểm thử, chính là máy chủ với các thiết lập để khởi động được ứng dụng cần kiểm thử.
* Dữ liệu kiểm tra (**Test data**): các bộ dữ liệu được xây dựng sẵn theo các yêu cầu nghiệp vụ, các test case, checklist, bao gồm cả dữ liệu đầu vào và các dữ liệu đầu ra mong muốn.
* Máy chủ cơ sở dữ liệu (**Database server**): máy chủ dùng để lưu trữ dữ liệu của ứng dụng
* Môi trường chạy Front-end (**Front-end running environment**): là nơi lưu trữ máy chủ và các thiết lập cho môi trường giao diện của ứng dụng.
* Hệ điều hành máy khách (**Client operating system**): phần lớn các ứng dụng sẽ cần phải hỗ trợ đa nền tảng, chẳng hạn nhiều trình duyệt, nhiều hệ điều hành được hỗ trợ.
* Trình duyệt (**Browser**): trình duyệt được sử dụng bởi kiểm thử viên, hiện nay thì sẽ có các trình duyệt hay được sử dụng là `Google Chrome` hay `Mozilla Firefox`, đôi khi có thể là trình duyệt cho di động.
* Phần cứng bao gồm hệ điều hành máy chủ (**Hardware includes Server Operating system**): môi trường để cài đặt các ứng dụng lên sẵn sàng cho việc kiểm thử.
* Mạng (**Network**): hệ thống mạng là cần thiết cho việc kết nối tới các máy chủ
* Tài liệu cần có như tài liệu tham khảo / hướng dẫn cấu hình / hướng dẫn cài đặt / hướng dẫn sử dụng: các tài liệu hướng dẫn sử dụng cũng là một phần không thể thiếu để các thành viên kiểm thử dễ dàng nắm bắt hơn.

# Quy trình thiết lập môi trường kiểm thử phần mềm
Việc kiểm thử được giới hạn trong những gì có thể được kiểm tra và những gì không nên được kiểm tra.

Những người sau đây là những thành viên cần thiết có liên quan đến thiết lập cho môi trường kiểm thử:
* Quản trị viên hệ thống: là người quản lý và điều hành các thiết lập chung của các máy chủ
* Nhà phát triển: là người chịu trách nhiệm cho việc xây dựng ứng dụng.
* Người kiểm thử: là người chịu trách nhiệm cho việc kiểm thử ứng dụng

Môi trường kiểm thử sẽ cần phải làm các bước như sau:

### Thiết lập máy chủ thử nghiệm
Việc kiểm thử không nên thiết lập trên một máy cục bộ, mà nên thiết lập trên một máy chủ phân tán để đảm bảo mọi quá trình vận hành và sử dụng sẽ được tương thích với mọi user.  
Chẳng hạn, thiết lập một máy chủ `Fedora` cho ứng dụng `PHP`, hay một máy chủ `Ubuntu` cho ứng dụng `Java Spring` ....

### Hệ thống kết nối mạng

Hệ thống mạng sẽ được thiết lập theo yêu cầu thử nghiệm. Nó bao gồm:
* Thiết lập Internet
* Thiết lập mạng LAN
* Thiết lập mạng dùng riêng (**private**)

Điều này đảm bảo sự tắc nghẽn xảy ra trong quá trình thử nghiệm không ảnh hưởng đến các thành viên khác. (Nhà phát triển, nhà thiết kế, người chuẩn bị nội dung, v.v.)

### Thiết lập máy tính cho việc kiểm thử
Để kiểm thử ứng dụng web, chúng ta có thể cần thiết lập các trình duyệt khác nhau trên cùng 1 thiết bị hoặc các thiết bị khác nhau (Chrome, Firefox hoặc Safari cho macOS, Edge cho Windows).  
Đối với các ứng dụng máy tính để bàn, ta cần nhiều loại Hệ Điều Hành khác nhau cho việc kiểm thử đa nền tảng (Windows, macOS, Linux).

Ví dụ: thử nghiệm ứng dụng `Windows phone` có thể yêu cầu:
* Cài đặt `Visual Studio`
* Trình giả lập điện thoại Windows
* Ngoài ra, sẽ cần cấp một máy điện thoại Windows cho người kiểm thử.

### Báo cáo lỗi
Kiểm thử viên sẽ cần các công cụ chuyên dùng cho việc ghi lại các báo cáo lỗi 

### Tạo dữ liệu cho môi trường kiểm thử
Nhiều công ty sử dụng một môi trường kiểm thử riêng biệt để kiểm tra các phần mềm hay ứng dụng. Phương pháp phổ biến được sử dụng là sao chép lại các dữ liệu của môi trường **production** để kiểm tra. Điều này giúp người kiểm thử phát hiện các vấn đề tương tự như một máy chủ thực tế, mà không làm hỏng dữ liệu đó.

Phương pháp sao chép dữ liệu **production** để kiểm thử dữ liệu bao gồm:
* Thiết lập một chương trình tự động để sao chép dữ liệu vào môi trường thử nghiệm chung
* Tất cả `Personal Identifiable Information` (**PII** - Thông tin nhận dạng cá nhân) được sửa đổi cùng với các dữ liệu bí mật khác. **PII** được thay thế bằng dữ liệu chính xác, nhưng không phải dữ liệu cá nhân.
* Xóa các dữ liệu không liên quan đến việc kiểm thử.

Người kiểm thử hoặc nhà phát triển có thể sao chép các dữ liệu này vào môi trường thử nghiệm cá nhân của họ. Đồng thời, họ có thể sửa đổi nó theo yêu cầu nếu muốn.

Quyền riêng tư là vấn đề chính cần xem xét khi sao chép dữ liệu **production**. Để khắc phục các vấn đề quyền riêng tư, chúng ta cần xem xét các dữ liệu kiểm thử bị ẩn giấu.

Đối với các dữ liệu này, chúng ta có thể xem xét 2 cách tiếp cận như sau:
* `Black List`:  Trong phương pháp này, tất cả các trường dữ liệu được giữ nguyên. Ngoại trừ những trường được chỉ định bởi người dùng.
* `White List`: Theo mặc định, tất cả các trường dữ liệu sẽ bị giấu đi. Ngoại trừ một danh sách các phần được phép sao chép. Một trường trong được đánh dấu trong `White List` có ý rằng việc sao chép dữ liệu là ổn và không cần phải ẩn giấu đi.

Ngoài ra, nếu như chúng ta sử dụng dữ liệu của môi trường **production**, ta cần phải biết cách để lấy được dữ liệu nguồn. Truy vấn cơ sở dữ liệu bằng tập lệnh SQL là một cách tiếp cận khá hiệu quả cho việc này.

# Quản lý môi trường kiểm thử
Quản lý môi trường kiểm thử liên quan đến việc bảo trì và theo dõi những thiết lập và chức năng của môi trường.

Danh sách các hoạt động của chức năng quản lý môi trường thử nghiệm thường sẽ bao gồm như sau:

1. Bảo trì một kho lưu trữ trung tâm với tất cả các phiên bản cập nhật của môi trường kiểm thử.
2. Kiểm tra quản lý môi trường theo yêu cầu của nhóm kiểm thử.
3. Tạo ra môi trường mới dựa vào các yêu cầu bổ sung.
4. Giám sát môi trường kiểm thử.
5. Cập nhật / xóa môi trường kiểm thử đã lỗi thời.
6. Điều tra các vấn đề về môi trường kiểm thử.
7. Phối hợp cho đến khi các vấn đề được giải quyết.

# Danh sách kiểm tra cho môi trường kiểm thử
Ta có một danh sách kiểm tra như sau cho môi trường kiểm thử

### Thiết bị phần cứng
1. Kiểm tra xem thiết bị cần thiết cho môi trường kiểm thử có sẵn có không? Nếu không, cần phân tích chi phí thời gian bỏ ra để cung cấp.
2. Kiểm tra xem các thiết bị ngoại vi có sẵn không? Chẳng hạn như máy quét, máy in, các thiết bị cầm tay ...

### Phần mềm/ kết nối
1. Kiểm tra xem có cần các phần mềm đặc thù không? Chẳng hạn như phần mềm soạn thảo văn bản `MS Word`, phần mềm bảng tính `MS Excel` ...
2. Đối với phần mềm mới, môi trường kiểm thử nghiệm có sẵn cho tổ chức không? Cần người có kinh nghiệm sử dụng và bảo trì cho các phần mềm này.

### Dữ liệu môi trường
1. Kiểm tra xem các bộ dữ liệu kiểm thử tiêu chuẩn có sẵn không? Nếu không cần tiến hành thu gom dữ liệu cần thiết.
2. Có được phép sử dụng hoặc có thỏa thuận sử dụng dữ liệu với chủ sở hữu để tiến hành kiểm thử không?

### Công cụ hoặc quy trình bảo trì
1. Kiểm tra xem có tối thiểu một đầu mối liên hệ cho việc bảo trì môi trường kiểm thử không? Nếu không có ai, cần xem xét trong các thành viên hiện tại những ai có khả năng để bảo trì môi trường, cần giữ liên lạc với họ.
2. Kiểm tra xem chất lượng của môi trường kiểm thử hiện tại đã được kiểm chứng hoặc được chấp thuận chưa
3. Kiểm tra xem có phải tất cả các thành viên tham gia bảo trì môi trường đều được biết đến hay chưa.

### Các câu hỏi khác
* Có nên phát triển Môi trường kiểm thử trong nội bộ tổ chức hay thuê một máy chủ bên ngoài?
* Liệu có tuân theo tiêu chuẩn nội bộ của tổ chức hay tuân theo bất kỳ tiêu chuẩn quốc tế nào khác không (IEE, ISO, ....)?
* Môi trường kiểm thử được yêu cầu sử dụng trong bao lâu?
* Sự khác biệt giữa các hệ thống kiểm thử và thực tế (**production**), tác động của chúng đến hiệu quả kiểm thử phải được xác định.
* Có thể sử dụng lại một thiết lập môi trường kiểm thử hiện có cho các dự án khác trong công ty không?


# Các thử thách khi thiết lập quản lý môi trường kiểm thử
### Lập kế hoạch phù hợp về sử dụng tài nguyên
Lập kế hoạch không hiệu quả cho việc sử dụng tài nguyên có thể ảnh hưởng đến đầu ra thực tế. Ngoài ra, nó có thể dẫn đến xung đột giữa các đội trong dự án.

### Môi trường từ xa
Có thể môi trường kiểm thử nằm cách xa nhau về mặt địa lý so với môi trường phát triển. Trong trường hợp như vậy, nhóm kiểm thử phải dựa vào các nhóm hỗ trợ cho các tài sản, thiết bị thử nghiệm khác nhau (Phần mềm, phần cứng và các vấn đề khác).

### Xây dựng thời gian thiết lập
Đôi khi, môi trường kiểm thử được thiết lập trở nên quá phức tạp trong các trường hợp Kiểm thử tích hợp (**Integration testing**)

### Chia sẻ thiết lập chung theo nhóm
Nếu môi trường kiểm thử được sử dụng bởi nhóm phát triển và nhóm kiểm thử một cách đồng thời, kết quả kiểm thử sẽ bị hỏng do khó có thể xác định được đầu ra mong muốn so với thực tế.

### Cấu hình kiểm thử phức tạp
Một số quá trình kiểm thử yêu cầu cấu hình môi trường kiểm thử phức tạp. Nó có thể đặt ra một thách thức cho nhóm kiểm thử (về thời gian, chi phí...).
# Các `Best Practices` cho người quản lý môi trường kiểm thử
* Hiểu các yêu cầu kiểm tra kỹ lưỡng và truyền đạt lại cho các thành viên trong nhóm kiểm thử.
* Các kết nối phải được kiểm tra trước khi bắt đầu kiểm thử.
* Kiểm tra thiết bị phần cứng và phần mềm cần thiết, các giấy phép sử dụng đi kèm.
* Trình duyệt web và các phiên bản sử dụng. 
* Lập kế hoạch sử dụng theo lịch trình của môi trường kiểm thử.
* Các công cụ tự động hóa và cấu hình của chúng.

# Kết luận
Qua bài dịch, mình đã tìm hiểu được thế nào là môi trường kiểm thử, các thiết lập của môi trường kiểm thử cũng như các vấn đề khó khăn đặt ra cho một người quản lý môi trường kiểm thử. Cảm ơn mọi người đã đọc bài. Hi vọng mọi người đóng góp giúp mình để bài dịch được hoàn thiện hơn ^^.

# Tài liệu tham khảo
* https://www.guru99.com/test-environment-software-testing.html
* https://qa-platforms.com/test-environment-for-software-testing/