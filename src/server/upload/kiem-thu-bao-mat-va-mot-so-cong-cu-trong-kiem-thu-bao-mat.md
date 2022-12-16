### Kiểm thử bảo mật là gì?


Kiểm thử bảo mật là một loại Kiểm thử phần mềm nhằm phát hiện các lỗ hổng của hệ thống và xác định rằng dữ liệu và tài nguyên của hệ thống được bảo vệ khỏi những kẻ xâm nhập. Nó đảm bảo rằng hệ thống phần mềm và ứng dụng không có bất kỳ mối đe dọa hoặc rủi ro nào có thể gây ra tổn thất.

Kiểm tra bảo mật của bất kỳ hệ thống nào đều tập trung vào việc tìm ra tất cả các lỗ hổng và điểm yếu trong hệ thống có thể dẫn đến việc mất thông tin hoặc danh tiếng của tổ chức.

##### Mục tiêu của kiểm tra bảo mật là:

- Để xác định các mối đe dọa trong hệ thống.
- Để đo lường các lỗ hổng tiềm ẩn của hệ thống.
- Để giúp phát hiện mọi rủi ro bảo mật có thể có trong hệ thống.
- Để giúp các nhà phát triển khắc phục các vấn đề bảo mật thông qua mã hóa.

##### Các lĩnh vực trọng tâm chính trong kiểm tra bảo mật:

- An ninh mạng
- Bảo mật phần mềm hệ thống
- Bảo mật ứng dụng phía khách hàng
- Bảo mật ứng dụng phía máy chủ

### Các loại kiểm thử bảo mật
1. Rà soát các lỗ hổng tiềm ẩn: lỗ hổng được thực hiện với sự trợ giúp của phần mềm tự động để quét một hệ thống nhằm phát hiện các mẫu lỗ hổng đã biết.
2. Rà soát các điểm yếu của hệ thống: bao gồm việc xác định các điểm yếu của mạng và hệ thống. Sau đó, nó cung cấp các giải pháp để giảm những khiếm khuyết hoặc rủi ro này. Quét an ninh có thể được thực hiện theo cả cách thủ công và tự động.
3. Đánh giá bảo mật bằng cách tấn công vào hệ thống: là loại kiểm thử mô phỏng cuộc tấn công từ phía một hacker mũ đen. Kiểm thử bao gồm việc phân tích một hệ thống cụ thể, tìm ra các lỗ hổng tiềm ẩn bằng cách tấn công từ bên ngoài.
4. Đánh giá rủi ro: kiểm thử này liên quan đến phân tích các rủi ro bảo mật nhận thấy được. Các rủi ro được phân loại là Low, Medium, High. Loại kiểm thử này đưa ra các khuyến nghị nhằm giảm thiểu các rủi ro.
5. Kiểm tra an ninh nội bộ hệ thống: kiểm tra bảo mật nội bộ ứng dụng và OS.  Việc kiểm tra cũng có thể được thực hiện thông qua kiểm tra từng dòng mã.
6. Tấn công vào hệ thống tìm các điểm yếu bảo mật: các hacker mũ trắng thực hiện phương pháp tương tự như những hacker mũ đen, với mục tiêu tìm kiếm các điểm yếu bảo mật và xác định cách thức để thâm nhập vào mục tiêu, nhằm đánh giá mức độ thiệt hại do các lổ hỗng này gây ra, từ đó đưa ra cảnh báo cùng những phương án gia cố, kiện toàn bảo mật thích hợp.
7. Posture assessment: Kết hợp quét bảo mật, hack hệ thống một cách có đạo đức, đánh giá rủ ro và tấn công vào hệ thống tìm các điểm yếu bảo mật để đánh giá bảo mật tổng thể của một tổ chức.

### Các kỹ thuật kiểm thử bảo mật
##### 1. Kiểm tra quyền truy cập ứng dụng
Đa số các ứng dụng hoặc trang web đều có phần quyền truy cập vào từng chức năng, module trên ứng dụng, trang web. Vì vậy chúng ta cần kiểm tra xem quyền truy cập của các user có đúng hay không.

Ví dụ: Cần kiểm tra một user bình thường thì không thể vào được trang admin của trang web.

Một số thử nghiệm truy cập ứng dụng bao gồm kiểm tra các quy tắc chất lượng mật khẩu, kiểm tra đăng nhập mặc định, kiểm tra khôi phục mật khẩu, kiểm tra captcha, kiểm tra chức năng đăng xuất, kiểm tra thay đổi mật khẩu, kiểm tra câu hỏi / câu trả lời bảo mật.

Tương tự, một số thử nghiệm ủy quyền bao gồm thử nghiệm tìm đường dẫn, thử nghiệm cho phép thiếu, thử nghiệm cho các vấn đề kiểm soát truy cập ngang.

##### 2. Kiểm tra việc bảo vệ dữ liệu
Tất cả các dữ liệu nhạy cảm phải được mã hóa trước khi lưu vào database hoặc khi gửi request. Đặc biệt đối với dữ liệu nhạy cảm như mật khẩu, số thẻ tín dụng hoặc thông tin quan trọng khác trong kinh doanh thì cần phải được mã hóa mạnh mẽ.

Cách kiểm tra bảo mật dữ liệu:
- Người kiểm tra nên truy vấn cơ sở dữ liệu về dữ liệu quan trọng và nhạy cảm như mật khẩu, thông tin ngân hàng để xác minh rằng tất cả dữ liệu đó được lưu ở dạng mã hóa trong DB.

- Phải xác minh rằng dữ liệu được truyền giữa các màn hình khác nhau phải được mã hóa trước khi truyền đi. Hơn nữa, người kiểm tra cần đảm bảo rằng dữ liệu được mã hóa được giải mã chính xác tại đích.
- Người kiểm tra phải xác minh rằng khi thông tin được truyền giữa máy khách và máy chủ, nó không được hiển thị trên thanh địa chỉ của trình duyệt web ở định dạng dễ hiểu.

##### 3. Brute Force Attack
Brute Force Attack chủ yếu được thực hiện bởi một số công cụ phần mềm. Khái niệm này là đăng nhập nhiều lần vào hệ thống bằng cách đoán mật khẩu.

Ví dụ: Một ví dụ đơn giản về bảo mật chống lại một cuộc tấn công như vậy là đình chỉ tài khoản trong một khoảng thời gian ngắn. Chẳng hạn bạn cố gắng đăng nhập vào Gmail không thành công quá 3 lần thì bạn sẽ bị chặn đăng nhập trong vòng khoảng 30 phút

Cách kiểm thử Brute force attack: Người kiểm tra sẽ thực hiện đăng nhập nhiều lần vào ứng dụng với thông tin không hợp lệ để xác minh rằng cơ chế tạm dừng tài khoản có sẵn và đang hoạt động chính xác trên ứng dụng.

##### 4. SQL Injection và XSS
SQL injection là kĩ thuật cho phép các kẻ tấn công thực hiện các lệnh thực thi SQL bất hợp pháp (mà người phát triển không lường trước được), bằng cách lợi dụng các lỗ hổng bảo mật từ dữ liệu nhập vào của các ứng dụng.

XSS là một kĩ thuật tấn công, trong đó kẻ tấn công sẽ chèn các đoạn mã độc (thường là Javascript) vào bên trong trang web, các đoạn mã này sẽ được thực thi khi người dùng truy cập và hiển thị các trang có chứa những đoạn mã đó.

##### 5. Kiểm tra quản lý session
Session là một chuỗi các giao dịch phản hồi và yêu cầu HTTP được liên kết với cùng một người dùng.

Người kiểm tra phải kiểm tra việc có chấm dứt phiên sau thời gian tối đa, chấm dứt phiên sau khi đăng xuất, kiểm tra phạm vi và thời lượng cookie phiên, kiểm tra xem một tài khoản có thể chạy đồng thời trên nhiều phiên làm việc không?

##### 6. Kiểm tra các chức năng có rủi ro cụ thể
Trên các ứng dụng có một vài chức năng có thể xảy ra các rủi ro về bảo mật như thanh toán, tải tập tin,..

Ví dụ chức năng tải tập tin chúng ta cần kiểm tra rằng các tập tin không mong muốn hoặc độc hại đều bị hạn chế khi sử dụng chức năng này. 

### Một số công cụ dùng trong kiểm thử bảo mật
##### 1. WireShark
WireShark là một công cụ phân tích mạng trước đây được gọi là Ethereal. Nó chụp gói tin trong thời gian thực và hiển thị chúng ở định dạng có thể đọc được. Về cơ bản, nó là một bộ phân tích gói mạng - cung cấp các chi tiết nhỏ nhất về các giao thức mạng, giải mã, thông tin gói, v.v ... Nó là một mã nguồn mở và có thể được sử dụng trên Linux, Windows, OS X, Solaris, NetBSD, FreeBSD và nhiều các hệ thống khác.

##### 2. Owasp
OWASP là một tiêu chuẩn để phục vụ việc kiểm thử của Penetration Testing (Pentest) do tổ chức Open Web Application Security Project(OWASP) đề xuất. OWASP là tổ chức phi lợi nhuận và đưa ra chuẩn OWASP phục vụ cho công việc pentest hiệu quả và chi tiết. Tuy nhiên, để rõ hơn, mình xin giới thiệu sơ qua Pentest là gì.

OWASP là một tổ chức phi lợi nhuận trên toàn thế giới tập trung vào việc cải thiện tính bảo mật của phần mềm. Dự án có nhiều công cụ để kiểm tra các môi trường và giao thức phần mềm khác nhau. Các công cụ hàng đầu của dự án bao gồm:
- Zed Attack Proxy (ZAP - một công cụ tự động tìm các lỗi bảo mật trong khi bạn đang phát triển và thử nghiệm ứng dụng)
- Kiểm tra phụ thuộc OWASP (quét các phụ thuộc của dự án và kiểm tra các lỗ hổng đã biết)
- Dự án môi trường thử nghiệm web OWASP (bộ sưu tập các công cụ và tài liệu bảo mật)

##### 3. W3af
W3af là một framework giúp kiểm tra và xác định các lỗ hổng trong các ứng dụng web. Công cụ này đi kèm với một số plugin hữu ích để quét một trang web với hơn 200 lỗ hổng công khai. Các plugin hiện có sẵn bao gồm kiểm tra, xác thực, bruteforce, thu thập thông tin, trốn, grep và cơ sở hạ tầng. Mỗi plugin có một bộ mục tiêu quét khác nhau.

#### Kết luận
Kiểm thử bảo mật là loại kiểm thử quan trọng trong kiểm thử phần mềm, giúp xác định liệu các dữ liệu quan trọng có được đảm bảo bí mật hay không.

Với loại kiểm thử này, người kiểm tra đóng vai trò là kẻ tấn công vào hệ thống để tìm ra các lỗ hổng bảo mật

*Nguồn tham khảo:*

https://www.guru99.com/what-is-security-testing.html#:~:targetText=Security%20Testing%20is%20defined%20as,may%20cause%20a%20big%20loss.

https://www.softwaretestinghelp.com/how-to-test-application-security-web-and-desktop-application-security-testing-techniques/