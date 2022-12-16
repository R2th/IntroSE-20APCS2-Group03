# 1. SSL là gì
SSL không chỉ đơn thuần là chứng chỉ bảo mật. Nó còn có một cách định nghĩa mang tính kỹ thuật hơn. SSL là một giao thức cho phép truyền đạt thông tin một cách bảo mật và an toàn qua mạng.

Việc kết nối giữa một trình duyệt web tới bất kỳ điểm nào trên mạng Internet đi qua rất nhiều các hệ thống độc lập. Và không có bất kỳ sự bảo vệ nào với các thông tin trên đường truyền. Không một ai kể cả người sử dụng lẫn Web server có bất kỳ sự kiểm soát nào đối với đường đi của dữ liệu hay có thể kiểm soát được liệu có ai đó thâm nhập vào thông tin trên đường truyền.

![](https://images.viblo.asia/b716033c-1c12-4481-aec8-6af770ae69c7.jpg)

Để bảo vệ những thông tin mật trên mạng Internet hay bất kỳ giao thức TCP/IP nào. SSL đã kết hợp những yếu tố sau để thiết lập được một giao dịch an toàn:
*    Xác thực: đảm bảo tính xác thực của trang mà bạn sẽ làm việc ở đầu kia của kết nối. Cũng như vậy, các trang Web cũng cần phải kiểm tra tính xác thực của người sử dụng.
*   Mã hoá: đảm bảo thông tin không thể bị truy cập bởi đối tượng thứ ba. Để loại trừ việc nghe trộm những thông tin “ nhạy cảm” khi nó được truyền qua Internet. Dữ liệu phải được mã hoá để không thể bị đọc được bởi những người khác ngoài người gửi và người nhận.
*    Toàn vẹn dữ liệu: đảm bảo thông tin không bị sai lệch. Thể hiện chính xác thông tin gốc gửi đến.
*  Với việc sử dụng SSL, các Web site có thể cung cấp khả năng bảo mật thông tin. Xác thực và toàn vẹn dữ liệu đến người dùng. SSL được tích hợp sẵn vào các trình duyệt và Web server. Cho phép người sử dụng làm việc với các trang Web ở chế độ an toàn.

# 2. Giao thức SSL
SSL được phát triển bởi Netscape. Ngày nay giao thức SSL đã được sử dụng rộng rãi trên World Wide Web trong việc xác thực và mã hoá thông tin giữa client và server. Tổ chức IETF (Internet Engineering Task Force ) đã chuẩn hoá SSL và đặt lại tên là TLS (Transport Layer Security). Mặc dù là có sự thay đổi về tên nhưng TSL chỉ là một phiên bản mới của SSL. Phiên bản TSL 1.0 tương đương với phiên bản SSL 3.1. Tuy nhiên SSL là thuật ngữ được sử dụng rộng rãi hơn.

SSL được thiết kế như một giao thức riêng cho bảo mật, hỗ trợ cho rất nhiều ứng dụng. Giao thức SSL hoạt động bên trên TCP/IP và bên dưới các giao thức ứng dụng tầng cao hơn như là HTTP, IMAP và FTP.

SSL không phải là một giao thức đơn lẻ mà là một tập các thủ tục đã được chuẩn hoá để thực hiện các nhiệm vụ bảo mật sau:
*   Xác thực server: Cho phép người sử dụng xác thực được server muốn kết nối. Lúc này, phía browser sử dụng các kỹ thuật mã hoá công khai để chắc chắn rằng certificate và public ID của server là có giá trị và được cấp phát bởi một CA (certificate authority) trong danh sách các CA đáng tin cậy của client. Điều này rất quan trọng đối với người dùng. Ví dụ : khi gửi mã số credit card qua mạng thì người dùng thực sự muốn kiểm tra liệu server sẽ nhận thông tin này có đúng là server mà họ định gửi đến không.
*   Xác thực Client: Cho phép phía server xác thực được người sử dụng muốn kết nối. Phía server cũng sử dụng các kỹ thuật mã hoá công khai để kiểm tra xem certificate và public ID của server có giá trị hay không và được cấp phát bởi một CA trong danh sách các CA đáng tin cậy của server không. Điều này rất quan trọng đối với các nhà cung cấp. Ví dụ như khi một ngân hàng định gửi các thông tin tài chính mang tính bảo mật tới khách hàng thì họ rất muốn kiểm tra định danh của người nhận.
*   Mã hoá kết nối: Tất cả các thông tin trao đổi giữa client và server được mã hoá trên đường truyền nhằm nâng cao khả năng bảo mật. Điều này rất quan trọng đối với cả hai bên khi có các giao dịch mang tính riêng tư. Ngoài ra, tất cả các dữ liệu được gửi đi trên một kết nối SSL đã được mã hoá còn được bảo vệ nhờ cơ chế tự động phát hiện các xáo trộn, thay đổi trong dữ liệu. (đó là các thuật toán băm – hash algorithm).

![](https://images.viblo.asia/0a702a09-0cf6-4f8b-90d9-e62c1b3a21b8.jpg)
* Cách thức hoạt động của SSL*

Giao thức SSL bao gồm 2 giao thức con:
*   Giao thức SSL record: xác định các định dạng dùng để truyền dữ liệu
*   Giao thức SSL handshake (gọi là giao thức bắt tay) : sử dụng SSL record protocol để trao đổi một số thông tin giữa server và client vào lấn đầu tiên thiết lập kết nối SSL.

# 3. Các thuật toán dùng trong SSL
### Các thuật toán mã hoá và xác thực của SSL được sử dụng bao gồm:
*  DES (Data Encryption Standard) là một thuật toán mã hoá có chiều dài khoá là 56 bit.
*  3-DES (Triple-DES): là thuật toán mã hoá có độ dài khoá gấp 3 lần độ dài khoá trong mã hoá DES
*  DSA (Digital Signature Algorithm): là một phần trong chuẩn về xác thực số đang được được chính phủ Mỹ sử dụng.
*  KEA (Key Exchange Algorithm) là một thuật toán trao đổi khoá đang được chính phủ Mỹ sử dụng.
*  MD5 (Message Digest algorithm) được phát thiển bởi Rivest.
*  RSA: là thuật toán mã hoá công khai dùng cho cả quá trình xác thực và mã hoá dữ liệu được Rivest, Shamir, and Adleman phát triển.
*  RSA key exchange: là thuật toán trao đổi khoá dùng trong SSL dựa trên thuật toán RSA.
*  RC2 and RC4: là các thuật toán mã hoá được phát triển bởi Rivest dùng cho RSA Data Security.
*  SHA-1 (Secure Hash Algorithm): là một thuật toán băm đang được chính phủ Mỹ sử dụng.

Khi một client và server trao đổi thông tin trong giai đoạn bắt tay (handshake). Họ sẽ xác định bộ mã hoá mạnh nhất có thể và sử dụng chúng trong phiên giao dịch SSL.

Tham Khảo: 
* https://www.ssl.com/faqs/faq-what-is-ssl/
* https://www.digicert.com/ssl/