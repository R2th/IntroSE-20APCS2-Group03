Theo thống kê của trang [datareportal](https://datareportal.com/reports/digital-2021-global-overview-report), số lượng người dùng Internet hiện nay đã đạt  trên 4 tỉ người. Và con số này vẫn đang tăng lên với một tốc độ đáng kinh ngạc từng ngày. Để đáp ứng cho nhu cầu của hơn 4 tỉ người dùng, lượng dữ liệu được sản sinh, lưu trữ và truyền tải còn phải choáng ngợp hơn rất nhiều lần. Trên mảnh đất màu mỡ Internet này, ngoài những người nông dân ngày đêm khai thác với những khách hàng hiền hoà, tồn tại không ít những kẻ xấu xa luôn núp mình trong bóng tối chực chờ cơ hội tấn công những người dùng ngây thơ, các tổ chức bất cẩn để trục lợi cho bản thân. Chúng có vô vàn các cách để làm hại người dùng, một trong số đó là tấn công mã độc như malware, virus, trojan,... Tuỳ theo khả năng mà chúng có thể gây hại khác nhau.

Trong cuộc chiến chống lại các thế lực xấu đó, hiển nhiên các nhà nghiên cứu phải liên tục tìm tòi ra các phương pháp khác nhau để thích ứng. Đối với các loại mã độc, có thể kể tới các loại biện pháp như *sandbox*, *intrusion detection*, *intrusion prevention*,... Trong bài lần này, mình muốn giới thiệu về một giải pháp trong số này là *Content Disarm and Reconstruction (CDR).*

![](https://images.viblo.asia/3e2bd8ba-22a4-4a73-b214-10b992cb72e2.jpg)


## I. CDR là gì?

### 1. Khái niệm

Vậy CDR rốt cuộc là gì? Như đã nói ở trên, đây là một công nghệ phổ biến nhằm chống lại các cuộc tấn công mã độc. Cơ chế hoạt động của công nghệ này gồm 2 phần như tên của nó:

- **Content Disarm**: Đây chỉ việc loại bỏ các thành phần không phù hợp với chính sách được định nghĩa cho từng loại file. Các phần này thường là các macro, các đoạn mã thực thi có trong file.

- **Reconstruction**: Tạo ra 1 file mới sau khi đã loại bỏ các thành phần độc hại kể trên mà vẫn đảm bảo cấu trúc và các thành phần nội dung khác.

Ở đây, khác với việc phân tích mã độc (malware analysis), công nghệ CDR sẽ không tìm kiếm các đoạn mã được coi là mã độc (malware) mà đơn giản là loại bỏ tất cả những gì không an toàn, không phù hợp với chính sách. Ví dụ, với các file định dạng PDF, người ta thấy các đoạn mã Javascript nhúng trong đó có thể gây hại tới người dùng. Đối với malware analysis, người ta cần sử dụng model, rule để xác định các đoạn mã độc trong đó và nếu nó độc thì sẽ không sử dụng file này. Tuy nhiên, đối với việc sử dụng CDR, vì Javascript trong file PDF được định nghĩa là không an toàn nên chỉ đơn giản là xoá bỏ các mã Javascript này và tạo một file mới không có các mã Javascript.

### 2. Ưu điểm
Từ phần khái niệm và ví dụ bên trên, ta có thể thấy một số lợi ích mà công nghệ này có thể mang lại như:
-  Chi phí thấp so với các giải pháp khác
-  Tốc độ xử lí nhanh hơn
-  Khá hiệu quả với các tấn công chưa được công bố (Zero-day attack) trên cơ sở file.
-  Các file đã nhiễm mã độc có thể tiếp tục sử dụng sau khi loại bỏ các thành phần không mong muốn.

Các đặc điểm này tương đối phù hợp với các tổ chức vừa và nhỏ. Ngoài ra, CDR còn có thể kết hợp với rất nhiều các công cụ khác trong hệ thống nhằm tăng tính an toàn cho hệ thống.
### 3. Ứng dụng
Các công nghệ CDR hiện nay thường được áp dụng cho rất nhiều các nguồn file như
- Ứng dụng web
- Email 
- File Transfer
- SMB
- ...

Hiện nay, các nhà nghiên cứu đã áp dụng công nghệ này cho rất nhiều loại file, trong đó phổ biến nhất là 
- PDF
- Office file
- Audio/ Image file
- HTML
- ...

### 4. Luồng hoạt động cơ bản nhất của CDR

![](https://images.viblo.asia/0b1194f0-9cf3-4c7c-a114-c581cdd0f679.png)

Trên hình là luồng hoạt động cơ bản nhất của công nghệ CDR. Đầu tiên, file ban đầu sẽ được giải cấu trúc (deconstruction). Tại đây, từ một file ban đầu người ta sẽ đưa nó về một cấu trúc, định dạng khác phù hợp hơn để xử lí. Tiếp theo, file sau khi đã giải cấu trúc sẽ được quét các nội dung không phù hợp (disarm) và loại bỏ các nội dung này khỏi file. Cuối cùng, từ file đã giải cấu trúc đã sạch các nội dung disarm, người ta sẽ tái cấu trúc nó trở về định dạng ban đầu. 

Đây chỉ là hoạt động cơ bản nhất của công nghệ này. Tuỳ theo công cụ, công nghệ sử dụng có thể sẽ có thêm các bước, các qui trình khác nhau để đạt tối đa hiệu quả và mục tiêu mong muốn.

### 5. Các công cụ CDR phổ biến

Có thể nói, thị trường CDR hiện nay khá nhộn nhịp và vẫn đầy ắp các cơ hội cho các tổ chức có thể phát triển và khai thác. Dưới đây là một số công cụ và nhà cung cấp dịch vụ mà mình điểm qua hiện khá phổ biến trên thị trường.

#### a. Miễn phí
Các công cụ miễn phí thường được dùng với mục đích cá nhân là chủ yếu. Các công cụ này thường chậm update hoặc đã dừng update và khá ít tính năng.
- ExeFilter
- Docbleach
#### b. Trả phí
Các công cụ trả phí là các công cụ được các công ty, tổ chức nghiên cứu và phát triển. Tương ứng với cái giá của nó là những tính năng, ưu điểm vượt xa cho những công cụ miễn phí. Các công cụ cũng như nhà cung cấp các dịch vụ CDR phổ biến hiện tại có thể kể tới như:
- OPSWAT
- Fortinet CDR
- Symantec 
- Check Point Software Technologies
- Votiro
- ...


## II. Ví dụ đơn giản về CDR
Dưới đây mình thử ví dụ một đoạn code hết sức đơn giản về CDR đối với một file. Đầu tiên, mình có một file excel với một đoạn macro.

![](https://images.viblo.asia/840f2095-7c54-4e5e-9d47-bd1464091e6f.png)

Macro *sample* có trong file:

![](https://images.viblo.asia/f3332a53-2136-41d6-bce8-56e0283fe137.png)

Nội dung macro này là chạy một dòng thông báo lên màn hình

![](https://images.viblo.asia/e2ef73c0-c557-4e18-bbec-c6a59353447c.png)

Thông báo được hiển thị:

![](https://images.viblo.asia/e38d86e6-3614-404f-ac3b-deff80857cac.png)

Tiếp theo, mình dùng java để xử lí file này. Ở đây mình xử dụng thư viện Java POI và Java POI-OOXML. Có thể nhiều người chưa biết thì định dạng các file Microsoft Office 2007+ được sử dụng là Office OpenXML. Ở đây mình sử dụng thư viện ooxml của java poi để xử lí file excel này.

Đầu tiên là tải file đó vào và tạo 1 XSSFWorkbook của thư viện. XSSF là định dạng dành cho các file OOXML Excel của java POI. 

![](https://images.viblo.asia/783109d7-113b-43a4-b48b-2cdc1975eb63.png)

Có thể coi bước này giống như deconstruct file ban đầu vậy. Tiếp theo, mình sẽ tìm kiếm các thành phần macro có trong file này. Các đoạn macro sẽ được lưu trong file **/x1/VBAproject.bin**. Do đó mình sẽ tìm kiếm phần này trong workbook vừa tạo ra.

![](https://images.viblo.asia/875e3ceb-0898-44be-9e8b-f35c2730ea7f.png)

Nếu có thể tìm thấy được các đoạn này, mình sẽ thực hiện xoá chúng khỏi file:

![](https://images.viblo.asia/36bb4f5c-789b-4c0d-8838-27c9255d6ee1.png)

Cuối cùng là lưu các thay đổi vào file ban đầu

![](https://images.viblo.asia/b49de3d7-c4bc-47f5-8c0e-33edd2f72df9.png)

Sau khi xử lí thì trong file đã không còn đoạn macro nữa

![](https://images.viblo.asia/7cda4446-2a14-4554-b863-c26df42da937.png)


## III. Kết luận

CDR là một công nghệ khá hay ho, đơn giản và hiệu quả trong việc phòng chống các tấn công dựa trên file cũng như khai thác các lỗ hổng zero-day thông qua file. Trên đây chỉ là những gì cơ bản nhất mà mình tìm hiểu về công nghệ này. Ngoài ra còn rất nhiều thứ thú vị mà mọi người có thể tự mình tìm hiểu thêm.