Https sử dụng giao thức SSL để bảo mật thông tin liên lạc bằng cách truyền dữ liệu được mã hóa. 
Về cơ bản, SSL hoạt động với các khái niệm sau:
+ Asymmetric Cryptography
+ Symmetric Cryptography
### Asymmetric Cryptography
Mật mã bất đối xứng (còn được gọi là Mã hóa không đối xứng hoặc Mật mã khóa công khai) sử dụng một cặp khóa liên quan đến toán học để mã hóa và giải mã dữ liệu. Trong một cặp khóa, một khóa được chia sẻ với bất kỳ ai quan tâm đến giao tiếp. Nó gọi là Public Key và khóa khác trong cặp khóa được giữ bí mật và được gọi là Private Key.
Ở đây, các khóa đề cập đến một giá trị toán học và được tạo ra bằng cách sử dụng một thuật toán toán học để mã hóa hoặc giải mã dữ liệu.
Trong mật mã không đối xứng, dữ liệu có thể được ký bằng khóa riêng, chỉ có thể được giải mã bằng khóa công khai liên quan trong một cặp.
![](https://images.viblo.asia/2e64e5ba-f1fb-4d6a-99e0-b54557f59feb.png)
SSL sử dụng mật mã không đối xứng để bắt đầu giao tiếp được gọi là SSL handshake. Các thuật toán mã hóa khóa bất đối xứng được sử dụng phổ biến nhất bao gồm EIGamal, RSA, DSA, kỹ thuật đường cong Elliptic và PKCS.
### Symmetric Cryptography
Trong mật mã đối xứng, chỉ có một khóa mã hóa và giải mã dữ liệu. Cả người gửi và người nhận đều phải có khóa này mà chỉ họ mới biết.
![](https://images.viblo.asia/aee20fff-3dc0-4bb3-92a4-34a25115237e.png)
SSL sử dụng mật mã đối xứng bằng cách sử dụng khóa phiên sau khi quá trình bắt tay ban đầu được thực hiện. Các thuật toán đối xứng được sử dụng rộng rãi nhất là AES-128, AES-192 và AES-256.
### Truyền dữ liệu qua SSL
Giao thức SSL sử dụng mật mã không đối xứng và đối xứng để truyền dữ liệu một cách an toàn. Hình sau minh họa các bước của giao tiếp SSL
![](https://images.viblo.asia/9ecb0056-6764-4928-8e7c-11333ca86af1.png)
Như bạn có thể thấy trong hình trên, giao tiếp SSL giữa trình duyệt và máy chủ web (hoặc bất kỳ hai hệ thống nào khác) chủ yếu được chia thành hai bước: SSL handshake và truyền dữ liệu thực tế.
### SSL Handshake
Giao tiếp qua SSL luôn bắt đầu bằng SSL Handshake. Handshake SSL là một mật mã không đối xứng cho phép trình duyệt xác minh máy chủ web, lấy khóa công khai và thiết lập kết nối an toàn trước khi bắt đầu truyền dữ liệu thực tế.
Hình sau minh họa các bước liên quan đến quá trình SSL Handshake.
![](https://images.viblo.asia/5900f21f-669f-4ce6-81a0-ba0dbe6a5109.png)
1. Máy khách gửi thông báo "client hello". Điều này bao gồm số phiên bản SSL của máy khách, cài đặt mật mã, dữ liệu theo phiên cụ thể và thông tin khác mà máy chủ cần giao tiếp với máy khách bằng SSL.
2. Máy chủ phản hồi bằng một thông báo "server hello". Điều này bao gồm số phiên bản SSL của máy chủ, cài đặt mật mã, dữ liệu theo phiên cụ thể, chứng chỉ SSL có khóa công khai và thông tin khác mà máy khách cần để giao tiếp với máy chủ qua SSL.
3. Máy khách xác minh chứng chỉ SSL của máy chủ từ CA (TCertificate Authority) và xác thực máy chủ. Nếu xác thực không thành công, thì máy khách từ chối kết nối SSL và ném một ngoại lệ. Nếu xác thực thành công, hãy chuyển sang bước 4.
4. Máy khách tạo một session key, mã hóa nó bằng khóa công khai của máy chủ và gửi đến máy chủ. Nếu máy chủ đã yêu cầu xác thực máy khách (chủ yếu là trong giao tiếp máy chủ với máy chủ), thì máy khách sẽ gửi chứng chỉ của chính mình đến máy chủ.
5. Máy chủ giải mã khóa phiên bằng khóa riêng của nó và gửi xác nhận đến máy khách được mã hóa bằng khóa phiên.

Do đó, khi kết thúc quá trình bắt tay SSL, cả máy khách và máy chủ đều có khóa phiên hợp lệ mà họ sẽ sử dụng để mã hóa hoặc giải mã dữ liệu thực tế. Khóa công khai và khóa cá nhân sẽ không được sử dụng nữa sau đó.
### Actual Data Transfer
Máy khách và máy chủ hiện sử dụng khóa phiên dùng chung để mã hóa và giải mã dữ liệu thực tế và chuyển dữ liệu đó. Điều này được thực hiện bằng cách sử dụng cùng một khóa phiên ở cả hai đầu và do đó, nó là một mật mã đối xứng. Việc truyền dữ liệu SSL thực tế sử dụng mật mã đối xứng vì nó dễ dàng và tốn ít CUP hơn so với mật mã không đối xứng.
![](https://images.viblo.asia/0f5aee9c-9cc4-4c9a-832f-3f1b907efee7.png)
Do đó, về cơ bản SSL hoạt động bằng cách sử dụng mật mã không đối xứng và mật mã đối xứng. Có một số cơ sở hạ tầng liên quan đến việc đạt được giao tiếp SSL trong cuộc sống thực, được gọi là Public Key Infrastructure
### Public Key Infrastructure
Public Key Infrastructure là một tập hợp các vai trò, chính sách và thủ tục cần thiết để tạo, quản lý, phân phối, sử dụng, lưu trữ và thu hồi chứng chỉ số và quản lý mã hóa khóa công khai.
PKI bao gồm các yếu tố sau:
+ Cơ quan cấp chứng chỉ: Cơ quan xác thực danh tính của các cá nhân, máy tính và các thực thể khác.
+ Cơ quan đăng ký: CA cấp dưới phát hành chứng chỉ thay mặt cho CA gốc cho các mục đích sử dụng cụ thể.
+ Chứng chỉ SSL: Tệp dữ liệu bao gồm khóa công khai và các thông tin khác.
+ Hệ thống quản lý chứng chỉ: Hệ thống lưu trữ, xác nhận và thu hồi chứng chỉ.

Chúng ta đã tìm hiểu cơ bản về cách thức hoạt động của SSL. Mọi người muốn tìm hiểu chi tiết hơn về SSL thì có thể tham khảo thêm ở [đây nhé](https://www.tutorialsteacher.com/https).