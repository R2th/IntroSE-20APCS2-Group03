# I. Chữ ký số (Digital Signature)
## 1. Khái niệm.
Chữ ký số (digital signature) là một kĩ thuật xác thực cho phép người chủ nội dung của 1 thông điệp được quyền đính kèm 1 đoạn dữ liệu số như là chữ kí đánh dấu của người chủ đối với nội dung đã tạo ra. Về cơ bản, chữ kí số sẽ được tạo ra bằng cách hash nội dung thông điệp sau đấy mã hoá chuỗi hash bằng khoá bí mật (private key) của người chủ nội dung.

Chữ ký số, digital signature, giúp ta đạt được những mục đích sau :
*  Non-repudiation : có thể hiểu là giúp cho người nhận khi kiểm tra nội dung đã được ký chữ ký số kèm theo sẽ biết chắc người ký không thể chối cãi về những gì đã tạo ra ở thời điểm bắt đầu tạo chữ kí số. 
*  Integrity : chữ ký số giúp kiểm tra tính toàn vẹn dữ liệu của nội dung được gửi đi là không bị thay đổi hay chỉnh sửa kể từ lúc khởi tạo chữ ký số và ký vào văn bản gửi đi.
* Authenticity : chữ ký số cũng dùng để chứng thực nguồn gửi nội dung thông điệp đi. Thường thì thông tin về người chủ của chữ ký sẽ được thêm vào kèm với nội dung chữ ký số để giúp người nhận chứng thực được ai đã gửi thông điệp đi.

Chữ ký số ứng dụng nhiều trong các hoạt động cấp chứng chỉ Certificate SSL,… Chữ ký số cũng có có thể sử dụng trong các giao dịch thư điện tử, để mua bán hàng trực tuyến, đầu tư chứng khoán trực tuyến, chuyển tiền ngân hàng, thanh toán trực tuyến mà không sợ bị đánh cắp tiền như với các tài khoản Visa, Master.
* Giải thuật tạo chữ ký số là một phương pháp sinh chữ ký số.
* Giải thuật kiểm tra chữ ký số là một phương pháp xác minh tính xác thực của chữ ký số.

Quá trình tạo chữ ký số bao gồm: 
* Giải thuật tạo chữ ký số. 
* Phương pháp chuyển dữ liệu thông điệp thành dạng có thể ký được.

Quá trình kiểm tra chữ ký số bao gồm: 
* Giải thuật kiểm tra chữ ký số. 
* Phương pháp khôi phục dữ liệu từ thông điệp. 
## 2. Quá trình ký và kiểm tra chữ ký số.
### a. Quá trình ký.
Các bước của quá trình ký một thông điệp:
* Tính toán chuỗi đại diện (message digest/hash value) của thông điệp sử dụng một giải thuật băm (Hashing algorithm);
* Chuỗi đại diện được ký sử dụng khóa riêng (Private key) của người gửi và một giải thuật tạo chữ ký (Signature/Encryption algorithm). Kết quả là chữ ký số (Digital signature) của thông điệp hay còn gọi là chuỗi đại diện được mã hóa (Encrypted message digest);
* Thông điệp ban đầu (message) được ghép với chữ ký số (Digital signature) tạo thành thông điệp đã được ký (Signed message);
* Thông điệp đã được ký (Signed message) được gửi cho người nhận.
### b. Quá trình kiểm tra.
Các bước của quá trình kiểm tra chữ ký:
* Tách chữ ký số và thông điệp gốc khỏi thông điệp đã ký để xử lý riêng.
* Tính toán chuỗi đại diện MD1 (message digest) của thông điệp gốc sử dụng giải thuật băm (là giải thuật sử dụng trong quá trình ký).
* Sử dụng khóa công khai (Public key) của người gửi để giải mã chữ ký số -> chuỗi đại diện thông điệp MD2.

So sánh MD1 và MD2: 
* Nếu MD1 = MD2 -> chữ ký kiểm tra thành công. Thông điệp đảm bảo tính toàn vẹn và thực sự xuất phát từ người gửi (do khóa công khai được chứng thực). •	Nếu MD1 <> MD2 -> chữ ký không hợp lệ. Thông điệp có thể đã bị sửa đổi hoặc không thực sự xuất phát từ người gửi.
# II. Hạ tầng khóa công khai - PKI.
## 1 Khái niệm.
Dựa trên nền tảng của mật mã khóa công khai, PKI là một hệ thống bao gồm phần mềm, dịch vụ, chuẩn định dạng, giao thức, quy trình, chính sách để giúp đảm bảo an toàn, tin cậy cho các phiên truyền thông.
PKI đáp ứng các yêu cầu về xác thực, bảo mật, toàn vẹn, chống chối từ cho các thông điệp được trao đổi.

Hạ tầng khóa công khai (Public-key infrastructure - PKI) là một tập các phần cứng, phần mềm, nhân lực, chính sách và các thủ tục để tạo, quản lý, phân phối, sử dụng, lưu trữ và thu hồi các chứng chỉ số.
## 2. Thành phần.
Ngoài các thành phần cơ bản chứng chỉ số, chữ ký số và mật mã. PKI còn được tạo nên bởi các thành phần chức năng chuyên biệt sau:

* Certificate Authority
* Registration Authority
* Certificate Repository và Archive
* Security Server
* PKI-enabled applications và PKI users

Certificate Authority (CA): là một bên thứ được tin cậy có trách nhiệm tạo, quản lý, phân phối, lưu trữ và thu hồi các chứng chỉ số. CA sẽ nhận các yêu cầu cấp chứng chỉ số và chỉ cấp cho những ai đã xác minh được nhận dạng của họ.

Registration Authority (RA): đóng vai trò trung gian giữa CA và người dùng. Khi người dùng cần chứng chỉ số mới, họ gửi yêu cầu tới RA và RA sẽ xác nhận tất cả các thông tin nhận dạng cần thiết trước khi chuyển tiếp yêu cầu đó tới CA để CA thực hiện tạo và ký số lên chứng chỉ rồi gửi về cho RA hoặc gửi trực tiếp cho người dùng.

Certificate Repository và Archive: có 2 kho chứa quan trọng trong kiến trúc của PKI. Đầu tiên là kho công khai lưu trữ và phân phối các chứng chỉ và CRL (chứa danh sách các chứng chỉ không còn hiệu lực). Cái thứ 2 là một cơ sở dữ liệu được CA dùng để sao lưu các khóa hiện đang sử dụng và lưu trữ các khóa hết hạn, kho này cần được bảo vệ an toàn như chính CA.

Security Server: là một máy chủ cung cấp các dịch vụ quản lý tập trung tất cả các tài khoản người dùng, các chính sách bảo mật chứng chỉ số, các mối quan hệ tin cậy (trusted relationship) giữa các CA trong PKI, lập báo cáo và nhiều dịch vụ khác.

PKI-enabled applications và PKI users: bao gồm các người dùng sử dụng các dịch vụ của PKI và các phần mềm có hỗ trợ cài đặt và sử dụng các chứng chỉ số như các trình duyệt web, các ứng dụng email chạy phía máy khách.
## 3. Lưu đồ cấp và sử dụng.
# Tham khảo
* HANDBOOK of APPLIED CRYPTOGRAPHY - Alfred J. Menezes , Paul C. van Oorschot , Scott A. Vanstone .
* Giáo trình an toàn và bảo mật thông tin - TS. Hoàng Xuân Dậu.