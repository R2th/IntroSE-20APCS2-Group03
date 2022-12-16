## Mã hóa là gì ?
Mã hóa là phương pháp biến thông tin (phim ảnh, văn bản ...) từ định dạng bình thường sang định dạng không thể đọc được nếu không có phương tiện giải mã.

Mã hóa bao gồm các thành phần:
1. Thông tin trước khi mã hóa (`Plaintext`)
2. Sau tin sau khi mã hóa (`Ciphertext`)
3. Chìa khóa (`Key`)
4. Phương pháp giải mã (`Encryption/Decryption`)

Quá trình mã hóa được tiến hành bằng cách sử dụng các hàm toán học `Encryption` lên thông tin `Plaintext`, vốn được biểu diễn dưới dạng số, để trở thành thông tin mã hóa `Ciphertext`
## Giải mã là gì ?
Giải mã là phương pháp đưa thông tin ở dạng mã hóa về dạng thông tin ban đầu, đây là quy trình ngược của mã hóa
Quá trình giải mã được tiến hành như sau: Áp dụng các hàm toán học `Decryption` lên thông tin `CipherText` để được thông tin đã giải mã `Plaintext`
## Phân loại các kiểu mã hóa và giải mã
### Mã hóa cổ điển
Trong thế giới mã hóa, mã hóa cổ điển là một dạng mã hóa được sử dụng trong lịch sử phát triển của con người. 
Nhưng ngày nay đã bị lạc hậu vì phương thức mã hóa này quá đơn giản và những kẻ tấn công có thể dễ dàng bẻ khóa được chúng thông qua nhiều phương thức khác nhau như:
* Tấn công vét cạn (Sử dụng máy tính thử hết mọi trường hợp có thể xảy ra)
* Phương pháp tấn công thống kê (Dựa vào tần suất xuất hiện của các chữ cái)

Mã hóa cố điển hoạt động trên cở sở bảng chữ cái, được thực hiện bằng tay hoặc một số máy móc cơ khí đơn giản
Mã hóa cổ điển dễ bị phá bởi tấn công văn bản mã hóa, hoặc không cần biết chi tiết cụ thể của hệ thống mã hóa bằng cách sử dụng các công cụ phân tích tần xuất

Các phương pháp mã hóa cổ điển chủ yếu dựa trên mật mã hoán vị và mật mã thay thế 
* Mật mã thay thế sử dụng các ký tự được thay thế 1 cách có quy luật trong thông điệp 
VD: Câu  `I am Mr. Enigma from` được thay thế bằng `This is morning star`
* Mật mã hoán vị, các ký tự củ chúng giữ nguyên không thay đổi theo một quy luật nào đo
### Mã hóa một chiều
Đây là phương pháp dùng để mã hóa những thông tin không cần dịch lại nguyên bản gốc

VD: 
Khi login mật khẩu nhập vào sẽ được mã hóa thành 1 chuỗi dài các ký tự gọi là hash. Chuỗi này sẽ được lưu vào cơ sở sữ liệu để làm tăng tính bảo mật cho bạn. 
Mỗi lần đăng nhập thì `hash function` sẽ mã hóa mk bạn nhập vào thành một dãy ký tự, sau đó so sánh với dãy ký tự được lưu trong database. Nếu đúng thì login thành công, nếu sai thì thôi. 


`Hash function` chức năng của nó là đổi một chuỗi ký tự bình thường thành 1 chuỗi ký tự khác có độ dài cố định 
`Hash function` thường được dùng để kiểm tra tính toàn vẹn của dữ liệu

Thuật toán hash function thường được sử dụng nhiều nhất là `MD5` và `SHA`
### Mã hóa đối xứng
Là một thuật toán mã hóa trong đó các khóa dùng cho việc mã hóa và giải mã có quan hệ rõ ràng với nhau
Khóa dùng để mã hóa có liên hệ một cách rõ ràng với khóa dùng để giải mã có nghĩa chúng có thể hoàn toàn giống nhau, hoặc chỉ khác nhau nhờ một biến đổi đơn giản giữa hai khóa. 
Trên thực tế, các khóa này đại diện cho một bí mật được phân hưởng bởi hai bên hoặc nhiều hơn và được sử dụng để giữ gìn sự bí mật trong kênh truyền thông tin.

Thuật toán đối xứng có thể được chia ra làm hai thể loại.
- Mật mã luồng (`stream ciphers`)  
- Mật mã khối (`block ciphers`).
Mật mã luồng mã hóa từng bit của thông điệp trong khi mật mã khối gộp một số bit lại và mật mã hóa chúng như một đơn vị
### Mã hóa bất đối xứng
Dùng 2 chìa khóa khác nhau để mã hóa và giải mã thông tin bí mật
`public key` sẽ được công khai, và được gửi đi đến đối tượng cần mã hoá thông tin, 
còn `private key` được giữ bí mật, và nó đóng vai trò như chìa khoá vạn năng có thể mở được tất cả thông tin được khoá bằng `public key`

Quy trình mã hóa bất đối xứng như sau:

- Bên nhận sẽ tạo ra một cặp `public + private key`. Người này giữ lại `private key` cho riêng mình và cất cẩn thận, còn `public key` thì chuyển cho bên gửi (dưới hình thức email, copy qua USB, v.v) hoặc post đâu đó lên mạng.
- Bên gửi sử dụng `public key` để mã hóa dữ liệu, sau đó gửi file đã mã hóa lại cho bên nhận.
- Bên nhận lúc này sẽ xài `private key` đã lưu khi nãy để giải mã dữ liệu và sử dụng.

Một nhược điểm của mã hóa bất đối xứng đó là tốc độ giải mã chậm hơn so với mã hóa đối xứng, tức là chúng ta phải tốn nhiều năng lực xử lý của CPU hơn, phải chờ lâu hơn, dẫn đến “chi phí” cao hơn. Khoảng thời gian lâu hơn là bao nhiêu thì còn tùy vào thuật toán mã hóa, cách thức mã hóa và key.
### Ứng dụng của mã hóa
Mã hóa chủ yếu để tránh những cái nhìn soi mói của những người tò mò tọc mạch, nói chung là những người mà bạn không muốn thông tin của mình lộ ra ngoài. `HTTPS` là một ví dụ, nó dùng thuật toán mã hóa `TLS` (lai giữa đối xứng và bất đối xứng) để mã hóa dữ liệu của bạn khi gửi thông tin giữa trình duyệt và máy chủ.

Bằng cách này, những kẻ tọc mạch với hi vọng đánh cắp dữ liệu trong lúc dữ liệu đang được gửi đi sẽ không biết chính xác dữ liệu là gì (do chúng không nắm được key trong tay).

 không có gì là an toàn tuyệt đối 100%. Mã hóa bằng `RSA` đôi khi vẫn có thể bị phá mã nếu sử dụng một cái máy tính đủ mạnh chạy trong thời gian đủ lâu. Mã hóa `HTTPS` cũng có cách để khai thác lỗ hổng trong cơ chế và ăn cắp dữ liệu. Chính vì thế mà mới có nhiều vụ tấn công xảy ra trên thế giới công nghệ ngày nay.
##  Kết
Mình đã giới thiệu với các bạn mã hóa, giải mã là gì, các loại phương pháp mã hóa và ứng dụng của mã hóa.
Ở bài viết sau mình sẽ giới thiệu đến các bạn các loại thuật toán mã hóa thông dụng và ví dụ liên quan