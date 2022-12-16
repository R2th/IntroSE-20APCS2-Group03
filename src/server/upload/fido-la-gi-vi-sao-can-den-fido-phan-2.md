# Mở Đầu 
Xin chào các bạn mình đã trở lại rồi đây :D ở bài trước mình đã giới thiệu về `FIDO` là gì , tiêu chuẩn xác thực `UAF` các bạn có thể xem lại tại [đây](https://viblo.asia/p/fido-la-gi-vi-sao-can-den-fido-phan-1-oOVlYz2a58W). Hôm nay mình sẽ trình bày tiếp về tiêu chuẩn `U2F` xác thực 2 bước, ứng dụng của nó, cũng như xu hướng phát triển. Bắt đầu thôi nào :D
# Tiêu Chuẩn U2F
U2F (Universal 2nd Factor) cho phép các dịch vụ trực tuyến tăng cường bảo mật bằng cách thêm yếu tố thứ 2 vào đăng nhập của người dùng . người dùng vẫn đăng nhâp user name/ password .  và chèn thêm “thiết bị U2F” làm yếu tố thứ 2 .
Người dùng đăng kí tài khoản tại 1 trang web, thiết bị sẽ tạo ra 1 cặp khóa mới . người dùng có thể sử dụng 1 “thiết bị U2F” cho nhiều trang web . các hoạt động xác thực và đăng ký thiết bị được thông qua API javascrip được tích hợp trong trình duyệt .
“thiết bị  U2F ”  được thể hiện ở nhiều dạng  :  USB  , NFC – giao tiếp trường gần , bluetooth tích hợp trên máy khách
* Thông số U2F có 2 lớp

    Lớp trên chỉ định sử dụng lõi mật mã của giao thức. Lớp dưới chỉ định cách ứng dụng người dùng giao tiếp với thiết bị 
    Yếu tố quan trọng là thiết bị U2F có thể hoạt động với bất kì thiết bị khách nào do người dùng sở hữu  không cần cài đặt thêm phần mềm 

* Cặp khóa private/public 

    Cặp khóa tạo ra trong quá trình đăng kí . khi đăng kí trình duyệt gửi cho thiết bị U2F 1 hàm băm gốc (kết hợp giao thưc, tên máy chủ và cổng ) .   “thiết bị U2F ” trả về khóa chung cho server .  Khi người dùng xác thực máy chủ sẽ gửi khóa này cho trình duyệt . trình duyệt sẽ xử lý khóa và hàm băm .. .nếu không phù hợp thì không đăng nhập được .  

Đảm bảo rằng  cặp khóa  do thiết bị U2F cấp cho 1 dịch vụ trực tuyến hoặc trang web không thể sử dụng bởi trang web nào khác

* Đăng kí : tạo cặp khóa 
    Người dùng được đăng ký được xác minh bởi trang web gốc (với tên người dùng và mật khẩu hoặc bất kỳ phương tiện nào khác). Trang đăng ký gọi hàm javascript để tạo cặp khóa. Khi chức năng javascript được gọi, người dùng phải phê duyệt thông tin . Sau khi người dùng chấp thuận, yêu cầu tạo cặp khóa được gửi đến mọi thiết bị U2F được gắn vào máy tính.

Thiết bị U2F đầu tiên được gắn vào máy tính có 'kiểm tra sự hiện diện của người dùng (nghĩa là thiết bị U2F được gắn đầu tiên mà người dùng nhấn nút) đáp ứng yêu cầu này. Trình duyệt đóng gói phản hồi từ thiết bị U2F (tay cầm khóa, khóa chung, v.v.) và trả lại cho trang web dưới dạng kết quả trả về của lệnh gọi hàm javascript. Trang web đăng ký sẽ gửi chúng đến trang web gốc và các trang web gốc lưu trữ thông tin tài khoản của người dùng để hoàn tất quá trình đăng ký.

* Xác thực tạo chữ ký 

    Bắt đầu quá trình xác thực với trang web …trang web gửi về hàm javascrip để tạo chữ ký . khi chức năng được gọi trình duyệt hiển thị yêu cầu chấp thuận từ người dùng . sau khi chấp thuận trình duyệt sẽ giao tiếp với thiết bị U2F 
    hàm Javascrip trả về  dữ liệu khách hàng 


* Phương thức xác thực 

    Phương thức xác thực U2F bao gồm 2 luồng là đăng ký (registration) và xác thực (authentication). Để xác thực, U2F sử dụng giao thức challenge – response được mở rộng với các chức năng chống tấn công phishing và MitM (Man-in-the-Middle), định danh theo dịch vụ, chống giả mạo thiết bị và chứng thực thiết bị theo thông tin của nhà cung cấp. Quá trình xác thực của U2F bao gồm 3 nhân tố: thiết bị (U2F Device), trình duyệt của người dùng (Browser, Client) và hệ thống xác thực phía dịch vụ (Server, Relying party – RP).
 
* Giao thức challenge – response

    Giao thức challenge – response là phương thức xác thực cơ bản của U2F, thông qua mật mã khóa công khai. Thiết bị U2F sinh ra cặp khóa bí mật và công khai cho mỗi ứng dụng. Thiết bị U2F lưu trữ khóa bí mật private key để tạo chữ ký (signature) và RP lưu trữ khóa công khai public key tương ứng để giải mã chữ ký. Cặp khóa được sinh ra trong môi trường chống tác động từ bên ngoài (tamper-resistant) để đảm bảo khóa bí mật được bảo vệ.

* Chống tấn công phishing và MitM

    Trình duyệt sẽ kiểm tra những thông tin về kết nối HTTP hiện tại của trình duyệt bao gồm đường dẫn URI và kênh truyền. Tất cả những thông tin này đã được ký bởi thiết bị U2F và được gửi tới RP. Nếu quá trình xác thực thông tin thành công thì yêu cầu đăng nhập của người dùng được chấp nhận và đảm bảo dịch vụ người dùng đang đăng nhập là chính xác và an toàn.

Phương thức này kiểm tra đường dẫn URI (origin) của dịch vụ để đảm bảo người dùng không bị tấn công phishing và kiểm tra ID của kênh truyền TLS (channel ID) để đảm bảo thông tin trên đường truyền được mã hóa, không bị đánh cắp hoặc chỉnh sửa, nhờ đó có khả năng chống lại được tấn công MitM.

* Lưu trữ khóa theo dịch vụ

    Một thiết bị U2F có thể lưu trữ nhiều khóa cho nhiều tài khoản user khác nhau của cùng một dịch vụ, bởi thiết bị U2F lưu trữ các khóa theo hình thức phân tách theo dich vụ. Với mỗi lần đăng kí, thiết bị sẽ tạo ra một cặp khóa bao gồm khóa công khai và khóa bí mật, cùng một khóa điều khiển (handle) tương ứng với mỗi tài khoản user khác nhau trên cùng một dịch vụ (app id). Khóa điều khiển này được lưu trữ trên RP và sẽ được gửi lại thiết bị U2F trong quá trình xác thực.

Ví dụ, có 2 tài khoản user1 và user2 đăng kí cùng một thiết bị U2F. Khi tài khoản user1 yêu cầu xác thực, phía RP kiểm tra nếu trên thiết bị đó có khóa điều khiển của tài khoản user1 thì phiên đăng nhập đó được xác thực và chấp nhận. Ngoài ra, việc lưu trữ theo khóa điều khiển đảm bảo nếu có tác động từ phía bên ngoài thì kẻ tấn công cũng không thể biết được đâu là khóa của tài khoản user1 và user2.
* Cơ chế sinh khóa của thiết bị U2F

    Thiết bị U2F sẽ tạo ra một cặp khóa đường cong Elliptic (ECC) mới tương ứng với dịch vụ mà người dùng đăng kí thiết bị. Mỗi một dịch vụ có một tên dịch vụ riêng, được lưu trữ trên thiết bị.
# Ứng Dụng FIDO Trong Các  Lĩnh Vực 
* Dịch vụ tài chính
* Ngân hàng trực tuyến
*  Chính phủ điện tử
*  Thương mại điện tử
*  Tài khoản email và mạng xã hội
*  Hồ sơ y tế trực truyến
# Xu Hướng Phát Triển

##### FIDO 2  webauthn&CTAP 

FIDO2 cho phép người dùng phổ biến dễ dàng xác thực các dịch vụ trên môi trường máy tinh để bàn và di động  
Thông số kỹ thuật  xác thực web (W3C ) của World Wide Web Consortium (WebAuthn) và Giao thức khách hàng tương ứng (CTAP) của FIDO Alliance .  

Thông tin đăng nhập mật mã FIDO2 là duy nhất trên mỗi trang web, không bao giờ rời khỏi thiết bị của người dùng và không bao giờ được lưu trữ trên máy chủ. Mô hình bảo mật này giúp loại bỏ các rủi ro của lừa đảo, tất cả các hình thức đánh cắp mật khẩu và tấn công lại.

Người dùng mở khóa thông tin đăng nhập bằng mật mã bằng các phương thức tích hợp đơn giản như đầu đọc dấu vân tay hoặc máy ảnh trên thiết bị của họ hoặc bằng cách tận dụng các khóa bảo mật FIDO dễ sử dụng. Người tiêu dùng có thể chọn thiết bị phù hợp nhất với nhu cầu của họ.

Trang web có thể kích hoạt FIDO2 thông qua lệnh gọi API JavaScript đơn giản được hỗ trợ trên các trình duyệt và nền tảng hàng đầu trên hàng tỷ thiết bị mà người tiêu dùng sử dụng mỗi ngày.
# Kết Luận
Như vậy mình và các bạn đã cùng tìm hiểu nốt về `FIDO`, bài viết dựa trên những hiểu biết cá nhân nên không tránh khỏi những thiếu sót, mọi người có thắc mắc hay phản hồi gì thì hãy comment xuống bên dưới để mình có thể giải đáp cũng như bổ sung để bài viết được hoàn thiện hơn. Cảm ơn các bạn đã theo dõi bài viết.

Tài liệu tham khảo: 

(https://fidoalliance.org/)

https://vtcsmarttech.com.vn/download/STID-FIDO%20Alliance.pdf