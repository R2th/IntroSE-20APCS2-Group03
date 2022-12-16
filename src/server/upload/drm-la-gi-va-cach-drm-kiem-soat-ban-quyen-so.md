### 1. Một chút về vấn đề bản quyền số

Vấn đề về bản quyền sở hữu luôn là vấn đề quan trọng khi chia sẻ và mua bán. Trước đây sách giấy và các ca khúc được đăng ký sở hữu trí tuệ nhằm đảm bảo quyền lợi cho người sáng tác, sở hữu. Bằng cách này, nếu có người muốn sử dụng những sản phẩm đã được đăng ký bản quyền thì họ sẽ phải tuân thủ các quy định, yêu cầu của tác giả,...

Hiện nay khi rất nhiều dữ liệu, nội dung được đưa lên mạng Internet thì vấn đề quản lý bản quyền cũng được nâng cao. Sách giấy và ca khúc có đơn vị quản lý việc in lậu, sử dụng trái phép bởi các cơ quan chức năng. Sách, video, nhạc,... và các dữ liệu số thậm chí còn được kiểm soát gay gắt hơn.

Ví dụ như cuộc chiến giữa **game cracker** và **đơn vị làm game**. Cracker thì luôn muốn crack bản quyền để chơi game miễn phí, đơn vị phát hành thì luôn muốn bảo vệ sản phẩm của họ để có thể bán đc game.
> Đạo cao một thước, ma cao một trượng.

Đơn vị làm game càng tìm ra các cách tốt hơn để kiểm soát bản quyền, thì các cracker cũng càng thêm cao tay khi liên tục crack những game offline nổi tiếng. Một số game còn có cả crack online =))

### 2. DRM là gì ?

Nói qua một chút vậy để mọi người có cái nhìn nho nhỏ về bản quyền số. **DRM** cũng là một cách để bảo vệ bản quyền số cho các file Ebook, PDF, âm thanh, video...

**DRM - Digital Rights Management**:
- Digital: chỉ các phương tiện số, thường là các tệp tin âm thanh, ebook, video, phim, game,...
- Rights: bản quyền. Thể hiện chủ sở hữu bản quyền, đơn vị phân phối, các quyền hạn, điều khoản quy định đối với người dùng,...
- Management: sự kiểm soát đối với file, khả năng truy cập nội dung,...

DRM thực chất là một cách kiểm soát bản quyền nội dung dữ liệu số dựa vào mã hóa.

Bằng cách sử dụng DRM, đơn vị sở hữu bản quyền có thể kiểm soát cách người dùng (người mua sản phẩm số) sử dụng sản phẩm của họ. VD như giới hạn số lần cài đặt file, giới hạn thời gian sử dụng, giới hạn đối tượng sử dụng file,...

### 3. DRM hoạt động như nào ?

Hiểu cơ bản thì DRM hoạt động dựa trên việc mã hóa nội dung file bằng 1 **secret key**. Khi có nhu cầu sử dụng file, ứng dụng riêng biệt để đọc file sẽ tiến hành giải mã file. Lúc này chúng ta mới có thể sử dụng được file.

Quá trình hoạt động cụ thể hơn như sau:

![](https://images.viblo.asia/efd191fe-f157-4f35-8cf5-355f058ff1fd.png)

Để hoạt động thì cần có 1 **DRM System** đóng vai trò cung cấp **Encryption key** để mã hóa và **Decryption key** để giải mã file.

**Mã hóa (màu đỏ):**
- Đầu tiên, người tiến hành đóng gói file sẽ gửi yêu cầu tới DRM System để nhận eKey.
- Sau đó sử dụng eKey để mã hóa file.
- Encrypted file sẽ được chia sẻ ra ngoài khi có người cần sử dụng.
- Đôi khi Encryption key được tạo bởi chính người tiến hành đóng gói file. Sau đó key này mới được lưu trữ trên DRM System.

**Giải mã (màu xanh):**
- Khi có nhu cầu sử dụng file. Người dùng sẽ mở **file X** bằng ứng dụng chuyên biệt. (File X là một file chứa thông tin về nội dung người dùng muốn truy cập)
- Ứng dụng sẽ tải nội dung đã được mã hóa về.
- Sau khi có Encrypted file rồi, ứng dụng sẽ yêu cầu nhận Decryption key từ DRM System.
- Nếu thông tin xác thực được chấp nhận, DRM System sẽ gửi lại dKey. Ứng dụng sẽ giải mã file DRM bằng dKey này để người dùng sử dụng.

### 4. Lợi ích và bất tiện của DRM

Việc kiểm soát bằng DRM đem lại những lợi ích và cả những bất tiện.

**Lợi ích:**
- Chủ sở hữu có thể kiểm soát sách người dùng sử dụng file. 
- Nội dung kiểm soát bởi DRM có thể đọc qua các ứng dụng của bên thứ 3.
- Không yêu cầu xác nhận rườm rà khi truy cập, giúp nâng cao trải nghiệm người dùng.

**Hạn chế:**
- Một số người dùng cảm thấy bất tiện và khó chịu khi họ không được toàn quyền với file họ đã bỏ tiền mua.
- Nếu không có DRM, người dùng có thể mở file với bất cứ ứng dụng nào cho phép đọc định dạng file đó.
- File có DRM sẽ không còn khả năng sử dụng khi đơn vị cung cấp bản quyền ngừng hoạt động, trong khi file thường có thể sử dụng vĩnh viễn.

### 5. Có nên loại bỏ (lậu) DRM khỏi file ?

Như mình đã nói qua ở phần 1 của bài viết, cuộc chiến giữa việc bảo vệ bản quyền số và crack bản quyền luôn diễn ra. Tất nhiên với DRM cũng không ngoại lệ.

Hiện nay trên mạng có thể dễ dàng tìm được các tool cho phép loại bỏ DRM ra khỏi file. Những nền tảng phổ biến như Spotify cũng có cách giải mã file nhạc để chia sẻ ra ngoài rồi (Nếu mình nhớ không nhầm là Spotify có cách loại bỏ Digital license rồi).

Tuy nhiên việc tôn trọng bản quyền là việc mỗi người nên làm.

Có một thầy ở PTIT từng nói với mình: ***"Là lập trình viên thì chúng ta nên tôn trọng bản quyền phần mềm."***

-----

Nguồn tham khảo:
- [What is DRM and how does it work?](https://www.quora.com/What-is-DRM-and-how-does-it-work)
- [Securing OTT Content — DRM](https://medium.com/@eyevinntechnology/securing-ott-content-drm-1af2c08fdd31)