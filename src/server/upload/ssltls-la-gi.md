### SSL/TLS là gì
SSL（Secure Sockets Layer）/TLS（Transport Layer Security）là kỹ thuật mã hóa truyền tin trên internet. Sử dụng SSL/TLS , bằng việc mã hóa data truyền tin giữa máy tính và server thì có thể phòng tránh bên thứ ba nghe trộm hoặc giả mạo data.
### Sự khác nhau giữa SSL/TLS
SSL và TLS là cùng chức năng, nó chỉ khác nhau về ký hiệu. Cái tên SSL dường như được biết đến rộng rãi hơn.
### Kiểm tra SSL/TLS
Khi chúng ta trao đổi thông tin quan trọng thì việc kiểm tra xem site đó có đối ứng SSL/TLS hay không là việc cần thiết.
Ở trang web được cài SSL/TLS, URL [http://] hiển thị ở thanh address của trình duyệt được gắn thêm [s] thể hiện secure thành [https://] .

Để đảm bảo hơn, bạn có thể dùng công cụ kiểm tra hoạt động của SSL server certificate để kiểm tra lại. Công cụ kiểm tra việc cài đặt SSL server certificate của từng nhà cung cấp.

VD: [GeoTrust](https://cryptoreport.geotrust.com/checker/views/certCheck.jsp)
![](https://images.viblo.asia/323ff77a-eeec-42e5-a0ce-fad030ffb152.PNG)
### SSL server certificate là gì
Để sử dụng SSL/TLS thì chúng ta cần setting server certificate trên server. Vì tên gọi SSL được biết đến rộng rãi hơn nên ko có [TLS server certificate ] mà chỉ được mô tả là [SSL server certificate].
SSL server certificate là chứng chỉ điện tử do tổ chức ủy quyền bên thứ ba đáng tin cậy như GeoTrust cấp và được trang bị ba chức năng để sử dụng trang web một cách an toàn:
1. Xác nhận chủ sở hữu của web site
 Có thể xác minh nhà điều hành trang web là chủ sở hữu của tên miền (server) được hiển thị trên certificate. Nhờ vậy, khách truy cập site có thể confirm điểm đến thông tin, an tâm thực hiện gửi các thông tin quan trọng.
 Khi bắt đầu thực hiện truyền tinh giữa server và máy tính bằng SSL/TLS thì trước tiên server sẽ gửi [SSL server certificate] đến cho máy tính. Máy tính sẽ kiểm tra certificate và xác nhận những điểm bên dưới
*  certificate là đúng tổ chức chứng nhận (VD: GeoTrust ) phát hành hay không.
*  server đang gửi tin có khớp với thông tin server đang được mô tả trong certificate hay không
Sau khi xác nhận là đúng server thì an tâm bắt đầu thực hiện truyền tin.

2. Mã hóa data truyền tin
Thực hiện mã hóa data truyền tin giữa trình duyệt và server nhờ chức năng SSL/TLS. Nhờ vậy, phòng tránh việc bên thứ ba nghe lén dữ liệu, có thể an tâm truyền tin.
Khi chuẩn bị đăng ký SSL server certificate, ở server áp dụng SSL/TLS sẽ tạo ra [puplic key] và [secret key] . Trong SSL server certificate bao gồm [puplic key], data sử dụng [puplic key] đó để mã hóa thì chỉ có thể đọc được ở server đang lưu trữ  [secret key] được tạo ra đồng thời khi đó.
Khách truy cập web site sử dụng [puplic key] chứa trong SSL server certificate mã hóa thông tin input có thể phòng tránh việc nghe lén của bên thứ ba. Sau khi thông tin chuyển đến server thì sử dụng [secret key] để có thể đọc được.

3. Phát hiện giả mạo
Với chức năng SSL/TLS, có thể phát hiện nội dung được gửi từ trang web được viết lại (giả mạo) bởi bên thứ ba trong quá trình truyền tin hay không.
Phát hiện giả mạo là áp dụng hàm tóm tắt khối lượng dữ liệu lớn thành một dữ liệu ngắn duy nhất, gọi là hàm băm (hash).
Trường hợp dữ liệu ngắn tóm tắt bằng cách sử dụng hàm băm khi gửi dữ liệu đầu vào từ trang web khi đến bên kia nhận được đã bị thay đổi, thì bạn có thể biết được rằng đã có ai đó đã viết lại dữ liệu đầu vào trong quá trình truyền tin.
### Cơ chế kỹ thuật của SSL/TLS
Chúng ta sẽ cùng tìm hiểu cơ chế kỹ thuật của SSL/TLS để biết khi thực hiện truyền tin SSL/ TLS thì có những điều gì xảy ra giữa trình duyệt của người dùng và server.

Khi người dùng gửi yêu cầu kết nối đến server đối tượng, server gửi SSL server certificate có chứa  [puplic key] . 
Ở trình duyệt của người dùng sử dụng root certificate được cài đặt sẵn trong trình duyệt để kiểm chứng SSL server certificate. Nếu không có vấn đề gì thì mã hóa khóa chung của chính nó bằng  [puplic key] được gửi từ server rồi gửi đến server.
Phía server thì bằng cách giải mã bằng [secret key] , lấy được khóa chung và thực hiện truyền tin bằng cách sử dụng khóa chung này.

![](https://images.viblo.asia/63c29d3a-7ccb-4206-a415-ffd345fc137d.png)

Trong đó, chúng ta chú ý đến phần kiểm chứng certificate. Chứng chỉ không được các tổ chức đáng tin cậy chứng nhận thì không thể xác minh bằng root certificate.
Nhiều người sử dụng Internet khi truy cập vào trang web với một trình duyệt cơ bản thì có hiển thị một cảnh báo rằng nó không thể được xác thực, nên rất khó cho người dùng có thể hiển thị màn hình kế tiếp. Do đó, bạn phải sử dụng SSL server certificate được xác thực bởi một bên thứ ba đáng tin cậy.
### Phân loại của SSL/TLS (Xác minh tên miền, xác minh doanh nghiệp, xác minh EV)
SSL server certificate được phân thành 3 loại lớn. Việc lựa chọn SSL server certificate phù hợp với nhu cầu sử dụng của web site là điều quan trọng.
1.  SSL server certificate loại xác minh tên miền

Đây là  SSL server certificate chuyên dùng để mã hóa SSL / TLS. Vì nếu có thể xác nhận quyền sở hữu tên miền (domain) của trang web thì có thể get được nên các cá nhân cũng có thể có được, đặc trưng của loại này là có thể có được với mức giá thấp và thời gian ngắn.
Mặt khác, vì có thể get được bằng cách kiểm tra online đơn giản nếu sở hữu tên miền (bất kể sự tồn tại của tổ chức quản lý trang web), nên hiệu quả ngăn chặn "mạo nhận" là có giới hạn.

2. SSL server certificate loại xác minh doanh nghiệp

Ngoài việc mã hóa bằng SSL / TLS, đây là SSL server certificate được phát hành sau khi xác nhận rằng tổ chức quản lý trang web tồn tại. Vì thực hiện điều tra sự tồn tại của các công ty và tổ chức dựa trên certificate đăng ký và cơ sở dữ liệu của bên thứ ba và xác nhận qua điện thoại ... (không qua Internet) nên đạt được độ tin cậy cao hơn loại xác thực miền.
Khi xác minh phát hành (chứng nhận), vì nó xác nhận sự tồn tại đăng ký pháp lý của doanh nghiệp quản lý trang web nên các cá nhân và doanh nghiệp tư nhân sẽ không thể nhận được.

3.  SSL server certificate loại xác minh nâng cao EV(Extended Validation) 

 SSL server certificate loại xác minh EV (SSL server certificate EV) là loại chứng chỉ có độ tin cậy cao nhất, được phát hành sau khi xác minh doanh nghiệp quản lý trang web với thủ tục chặt chẽ hơn trong SSL server certificate loại xác minh doanh nghiệp.
 Khi xác minh phát hành SSL server certificate EV có sự khác biệt như xác minh cần thiết riêng biệt "người xác nhận thẩm quyền chữ ký" trong tổ chức quản lý trang web và xác nhận "người đăng ký quản lý ứng dụng".
 Ngoài ra, SSL server certificate loại xác thực EV thì việc bảo vệ truyền tin mã hóa  SSL / TLS trực quan dễ hiểu cũng là một tính năng lớn.
 Khi người dùng truy cập vào các website được trang bị  SSL server certificate loại xác minh nâng cao EV thì thanh address của trình duyệt sẽ thành màu xanh lá, tên doanh nghiệp quản lý cũng được hiển thị nên mang đến cho người dùng cảm giác rất an toàn.
 
| | 1.  SSL loại xác minh tên miền  |SSL loại xác minh doanh nghiệp  |SSL loại xác minh nâng cao EV|
| -------- | -------- | -------- | -------- |
| Mã hóa SSL/TLS     | ◎     | ◎     | ◎   |
| Xác minh tính pháp lý của tổ chức doanh nghiệp     | -     | ◎     | ◎   |
| Xác minh sự tồn tại của doanh nghiệp     | -     | -     | ◎   |
 | Xác minh sự tồn tại của người đăng ký thầm quyền chữ ký     | -     | -     | ◎   |
 
###  Nguồn tham khảo:
https://www.geotrust.co.jp/ssl_guideline/ssl_beginners/

https://jp.globalsign.com/service/ssl/