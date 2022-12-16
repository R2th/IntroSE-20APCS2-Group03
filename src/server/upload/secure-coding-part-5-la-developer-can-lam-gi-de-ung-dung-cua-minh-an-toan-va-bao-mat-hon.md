# Tổng quan về vấn đề bảo mật
Trở lại với chuỗi bài viết về hướng dẫn lập trình an toàn cho lập trình viên, bài viết thứ năm trong series's post: [Secure coding for developers](https://viblo.asia/s/secure-coding-for-developers-dbZN76EalYM) sẽ tiếp tục với nội dung về các vấn đề liên quan đến các vấn đề: Communication Security và System Configuration

# Secure Coding Practices Checklist
## Communication Security
Dữ liệu được truyền trên đường truyền mạng tiềm ẩn những nguy cơ bị đánh cắp, nghe lén hoặc sửa đổi trái phép. Bên cạnh yêu cầu bảo mật khi lưu trữ, yêu cầu bảo vệ dữ liệu trong quá trình trình truyền tải cũng đóng vai trò quan trọng. Hacker với kỹ thuật ngày càng tiên tiến có thể thực hiện các cuộc tấn công Man in the middle (MITM) để tiến hành nghe lén dữ liệu nếu dữ liệu trên đường truyền không được  mã hóa an toàn. Yêu cầu về Communication Security tập trung vào việc mã hóa và bảo vệ dữ liệu trong quá trình truyền tải và trao đổi dữ liệu giữa các thành phần của ứng dụng hay giữa các ứng dụng với nhau.
![](https://images.viblo.asia/4e1836c7-36c6-4eb6-ab26-656643537a03.png)


**1. Thực hiện mã hóa để truyền tất cả các thông tin nhạy cảm**

- Điều này bao gồm sử dụng TLS cho việc mã hóa đường truyền giúp bảo vệ kết nối và có thể kết hợp với việc mã hóa riêng các tệp nhạy cảm hoặc các kết nối được chạy trên HTTP. Chú ý về TLS chúng ta nên sử dụng version mới nhất để tránh các lỗ hổng bảo mật như: TLS 1.2 hay TLS 1.3

**2. Chứng chỉ TLS sử dụng phải là chứng chỉ hợp lệ và còn thời hạn sử dụng**
- Chứng chỉ TLS cần là chứng chỉ hợp pháp, hợp lệ và có tên miền chính xác của website đang sử dụng. Chứng chỉ cần còn thời hạn và được gia hạn trước thời điểm hết hạn để tránh những rủi ro về bảo mật cho người dùng.

**3. Có cơ chế xử lý khi kết TLS nối thất bại một cách an toàn**
- Trang web không được phép xử lý trả lại kết nối không an toàn (HTTP) khi kết nối TLS bị lỗi. Có một số website thiết lập trả về kết nối http nếu kết nối tới kênh mã hóa thất bại, điều này đảm bảo tính sẵn sàng của website nhưng tiềm ẩn nguy cơ bảo mật khi dữ liệu nhạy cảm được truyền trên không mã hóa có thể bị đánh cắp hay nghe nén.

**4. Luôn luôn sử dụng kết nối có mã hóa an toàn cho các tác vụ nhạy cảm**
- Càn thiết lập cho website luôn sử dụng kết nối TLS cho tất cả nội dung yêu cầu quyền truy cập được xác thực và cho tất cả các thao tác truy cập hay truyền tải thông tin nhạy cảm

**5. Sử dụng kết nối TLS cho các thành phần kết nối từ bên ngoài một cách an toàn**
- Khi các hệ thống bên ngoài thực hiện kết nối và truy cập thông tin tới hệ thống của chúng ta cần đảm bảo có kết nối TLS. Ví dụ khi các service, api thực hiện kết nối tới hệ thống của chúng ta đều cần sử dụng TLS cho đường truyền kết nối.

**6. Sử dụng tiêu chuẩn duy nhất và hợp lệ cho TLS**
- Khi triển khai TLS cần sử dụng TLS tiêu chuẩn từ một nhà cung cấp tin tưởng và hợp lệ, tránh việc tự tạo ra vì điều này tiềm ẩn nguy cơ thiếu an toàn bảo mật.

**7. Sử dụng bộ ký tự encode hợp lệ**
- Cần xác định rõ bộ "character encode" được sử dụng cho kết nối mã hóa. Ví dụ; UTF-8,

**8. Đảm bảo HTTP referer không chứa thông tin nhạy cảm**
- HTTP referer header có thể chứa các thông tin nhạy cảm của user như: session_id, token,.. Cần đảm bảo các tham số này được lọc khỏi HTTP referer trước khi thực hiện truy cập tới website khác.

## System Configuration
Một trong những nguyên nhân gây ra rất nhiều lỗ hổng bảo mật nghiêm trọng trên website hiện nay là việc triển khai hệ thống một cách thiếu an toàn. Khi các dòng code của các bạn an toàn là chưa đủ, việc triển khai hệ thống web server, database, api, servies đóng vai trò quan trọng trong việc bảo vệ website khỏi các cuộc tấn công từ kẻ xấu. Theo thống kê những năm gần đây, số lỗ hổng bảo mật đến từ việc thiết lập hệ thống không an toàn chiếm gần 1/4 số lỗ hổng của một website. Là quản trị viên của một website, bạn cần làm gì để bảo vệ website khỏi các cuộc tấn công, hãy theo 
![](https://images.viblo.asia/ebf27f16-675e-4d01-afe8-e79517cf9ab2.png)


**1. Đảm bảo phiên bản của tất cả các thành phần trong website đang sử dụng phiên bản không có lỗ hổng bảo mật**
- Đảm bảo server, OS, framework và các thành phần của hệ thống đang sử dụng phiên bản an toàn không có lỗ hổng bảo mật, tốt nhất là sử dụng phiên bản mới nhất.

**2. Đảm bảo phiên bản của tất cả các thành phần trong website luôn được cập nhật bản vá kịp thời.**
- Đảm bảo server, OS, framework và các thành phần của hệ thống luôn được cập nhật các bản vá bảo mật từ nhà phát triển để hạn chế việc hacker khai thác từ các mã khai thác được public. Chúng ta có thể theo dõi lỗ hổng của các các nền tảng trên CVE Mitre: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-22986. Đây là cơ sở dữ liệu tổng hợp lỗ hổng tất cả các nền tảng, chúng tá có thể tìm lỗ hổng theo tên sản phẩm hoặc mã id được gán của mỗi lỗ hổng (Ví dụ: Apache Tomcat 8.7.3, CVE-2020-12321..)

**3. Tắt chức năng Directory listing trên web server**
- Điều này hạn chế việc lộ ra các file nhạy cảm, các file chứa thông tin quan trọng. Hacker khai thác lỗ hổng này qua các công cụ scan tự động rất dễ dàng, vì vậy cần đảm bảo web server của bạn tắt chức năng Directoty listing.

**4. Thực hiện thiết lập đặc quyền tối thiểu trên website**
- Thực hiện phân quyền tối thiểu cho các user chạy dịch vụ trên server. Thực hiện giới hạn truy cập tới web server, dịch vụ cho những user có đặc quyền để hạnc hế các truy cấp trái phép tới web server.

**5. Xử lý ngoại lệ một cách an toàn.**
- Khi có ngoại lệ xảy ra cần được xử lý fail securely, đảm bảo từ chối mặc định tất cả truy cập khi exception xảy ra.

**6. Xóa tất cả các chức năng, files không cần thiết**
- Cần định kỳ kiểm tra việc sử dụng các dịch vụ, chức năng hay file trên hệ thống để thực hiện loại bỏ khi không còn nhu cầu sử dụng. Đây là một trong những sai lầm chúng ta thường mắc phải khi có phiên bản mới của một ứng dụng, chức năng hay api chúng ta không xóa bỏ mà vẫn để tồn tại trên server, điều này tạo điều kiện cho hacker tấn công vào hệ thống.

**7. Xóa các đoạn code test hay debug trước khi triển khai.**
- Xóa các đoạn code test hay debug trong mã nguồn hoặc bất kỳ chức năng nào không  dùng cho production trước khi triển khai.

**8. Thiết lập file robots.txt một cách an toàn**
- File robots.txt cho phép liệt kê các thư mục cho phép các công cụ tìm kiếm có thể dễ dàng scan và đánh chỉ mục. Chúng ta không nên liệt kê các thư mục nhạy cảm để tránh việc lộ các thông tin nhạy cảm. Ví dụ các thư mục của admin, /admin, /admin/login .. để tránh việc thu thập thông tin nhằm tấn công website.

**9. Thiết lập các HTTP method được hỗ trợ trên web server**
- Xác định rõ phương thức HTTP nào được hỗ trợ trên web site, ví dụ: GET, POST. Chỉ thực hiện xử lý request nếu người dùng gửi lên các request có method được hỗ trợ.

**10. Tắt các phương thức HTTP không cần thiết.**
- Tắt các phương thức HTTP không cần thiết, ví dụ như phần mở rộng WebDAV. Nếu một phương thức HTTP mở rộng hỗ trợ xử lý tệp là bắt buộc, sử dụng cơ chế xác thực đã được kiểm tra để thực hiện xử lý.

**11.Loại bỏ các thông tin nhạy cảm trả về qua respone của website**
- Xóa thông tin không cần thiết khỏi HTTP response liên quan đến hệ điều hành, phiên bản máy chủ web, thông tin debug hay mã nguồn. Nếu không được thiết lập an toàn, response trả về có thể chứa các thông tin nhạy cảm trên từ đó kẻ tấn công thu thập và làm cơ sở để tấn công sâu hơn vào webisite

**12. Thông tin lưu trữ cấu hình bảo mật cần được thiết lập để có thể phục vụ việc audit hệ thống.**
- Các dữ liệu thiết lập về cấu hình bảo mật cần thiết lập để có thể xuất ra dưới dạng đọc được, giúp phục vụ quá trình audit khi hệ hống có vấn đề về bảo mật.

**13. Cần cô lập giữa các môi trường dev - test - production.**
- Mỗi môi trường trên cần được thiết lập để cô lập không sử dụng chung tài nguyên, cơ sở dữ liệu. Môi trường dev - test thường được cấu hình kém an toàn (tài khoản có mật khẩu yếu, dịch vụ truy cập từ bên ngoài, dịch vụ không xác thực, chứa thông tin nhạy cảm...) nên cần dược tách biệt với môi trường production. Việc này giúp kiểm soát tốt dữ liệu cũng như tránh nguy cơ tấn công hệ thống test rồi tấn công hệ thống production.

**14. Triển khai hệ thống quản lý phiên bản cho hệ thống và mã nguồn.**
- Cần có hệ thống quản lý mã nguồn, lịch sử phiên bản, lịch sử thay đổi, log thay đổi tất cả các thành phân trong hệ thống để quản lý một cách dễ dàng và hạn chế rủi ro mất mát hay rủi ro bảo mật.

# Tổng kết
Phần 5 này là phần không liên quan nhiều tới developer mà liên quan nhiều đến kỹ sư triển khai và quản trị hệ thống. Tuy nhiên với xu thế devops ngày càng phát triển như ngày nay, thì việc kết hợp giữa lập trình và triển khai hệ thống an toàn là vô cùng quan trọng và giúp hệ thống cũng như quy trình có thể thực hiện một cách trơn tru, nhất quán, hạn chế rủi ro bảo mật.

Cảm ơn các bạn đã theo dõi!!!
Xem thêm các bài viết khác trong series tại đây nhé: [Secure coding for developers](https://viblo.asia/s/secure-coding-for-developers-dbZN76EalYM)