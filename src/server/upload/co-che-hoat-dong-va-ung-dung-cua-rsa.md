## Giới Thiệu
RSA là một thuật ngữ vô cùng quen thuộc đối với những người học trong lĩnh vực mật mã học. RSA đánh dấu sự phát triển vượt bậc trong lĩnh vực mật mã học nói chung và được sử dụng rộng rãi trong các hoạt động thương mại điện tử. Hôm nay tại bài viết này, hãy cùng chúng tôi đi tìm hiểu về RSA là gì cũng như cơ chế hoạt động và những ứng dụng của RSA trong thời đại công nghệ hiện nay như thế nào nhé!
## RSA là gì?
RSA là một sản phẩm nghiên cứu với sự hợp lực của 3 nhà khoa học lớn là Adi Shamir, Len Adleman và Ron Rivest và được đưa ra mô tả lần đầu vào năm 1977 tại Học viện MIT. Cái tên RSA được lấy từ những chữ cái đầu tiên của 3 nhà khoa học.
![image.png](https://images.viblo.asia/dd461e43-d614-45e3-912f-849a065f46d4.png)
RSA là một thuật toán hay còn được gọi là hệ mã hóa đối xứng có phạm vi ứng dụng rộng rãi và phổ biến. Người ta thường sử dụng RSA ở công tác mã hóa hay thiết lập chữ ký điện tử với vai trò là mã hóa khóa công khai. Bất kỳ ai cũng có thể sử dụng khóa công khai để mã hóa được dữ liệu muốn gửi đi nhưng để giải mã được chúng cần phải có sự hỗ trợ của khóa bí mật.

Hoạt động gửi và nhận cần có sự can thiệp bởi RSA vì bản thân nó chứa hai khóa là công khai và bí mật để đảm nhận hai nhiệm vụ bất đối xứng là mã hóa và giải mã. Điều này cũng tương tự như cơ chế đóng và mở khóa cửa vậy tuy nhiên RSA sẽ phức tạp hơn nhiều vì nó là một thuật toán. Việc mã hóa giúp bảo mật thông tin nhưng cũng gây bất lợi cho người nhận khi không biết cách giải mã để xem được những thông tin bên trong. Chính vì lý do này mà khóa bí mật luôn được đi kèm với việc mã hóa.

Khác với các loại mã hóa có khóa đối xứng, khóa bí mật của RSA không truyền được tin ra bên ngoài kể cả có kẻ tấn công nếu không có khóa bí mật cũng sẽ không giải mã được những thông tin đó. Như vậy ta có thể thấy hai tính năng mã hóa và giải mã tối ưu đến tuyệt đối của RSA, đây cũng là lý do chúng được sử dụng ở hầu hết các trường hợp cần bảo mật thông tin. Giao thức SSL hay HTTPS cùng với chứng chỉ điện tử đều sử dụng RSA.
### RSA hoạt động như thế nào?
Để hoàn thiện mọi yếu tố để cải thiện chức năng bảo mật của RSA cần trải qua các bước sau:

**Sinh hóa**
Sinh hóa là quá trình tìm kiếm một bộ bao gồm 3 số tự nhiên là d, n, e thỏa mãn công thức dưới đây.

**Med trùng mmod n**

Trong đó d là giá trị được bảo mật tuyệt đối để khi biết các giá trị khác là n, e, m thì cũng không thể tìm ra được giá trị của d. Với công thức này, RSA sẽ sinh khóa theo quy trình:

Chọn ra hai số nguyên tố là p và q.
Tính n = pq, sau đó giá trị của n sẽ có vai trò ở cả hai loại khóa là khóa bí mật và khóa công khai.
Một vài số giả nguyên tố sẽ được tính toán và đưa và giữ bó mật.
Chọn một số e ở giữa số 1 và số giải nguyên tố n sao cho ước chung lớn nhất của hai số này bằng 1 (giá trị của e và số giả nguyên tố n có nguyên tố trùng nhau).
Tiếp tục tìm giá trị của d sao cho d trùng với 1/e hay de =1. Số tự nhiên d lúc này sẽ là nghịch đảo của số e theo công thức modulo mod λ(n).
Khi đó khóa công khai sẽ là bộ số (n, e) còn khóa bí mật là bộ số (n, d). Nhiệm vụ chính của bạn chính là giữ cẩn thận khóa bí mật và số nguyên tố p, q để từ đó phục vụ việc tính toán và mở khóa.

Trên thực tế, khi đưa vào thực hành, người ta vẫn lựa chọn giá trị của e nhỏ để việc giải mã trở nên nhanh chóng, thông thường e = 65537.
![image.png](https://images.viblo.asia/cc7e27c1-27c6-4ed4-a139-ef539b7a0c84.png)

**Mã hóa và giải mã**
Cũng chính vì tính bảo mật của RSA mà chỉ người nhận mới có thể mở khóa dữ liệu. Nếu bạn đang có dữ liệu M, hãy chuyển nó thành số tự nhiên m nằm trong khoảng (0, n) và hãy đảm bảo rằng giá trị m và n có nguyên tố cùng nhau. Để tìm được số tự nhiên này, hãy áp dụng kỹ thuật padding sau đó tiến hành mã hóa m thành c với công thức:

c ≡ m^e mod n

c sẽ là dữ liệu được chuyển đến người nhận, người nhận lúc này sẽ giải mã c để lấy được giá trị của m thông qua công thức:

c^d ≡ m^de ≡ m mod n

Sau khi lấy được giá trị của m, người nhận chỉ cần đảo ngược padding để lấy thông tin gốc.

Bạn đọc tham khảo thêm: Ứng dụng của Clustering là gì trong quản trị cơ sở dữ liệu [LINK](https://itnavi.com.vn/blog/clustering-la-gi/)

## Ứng dụng của RSA trong cuộc sống
### RSA trong bảo mật dữ liệu
RSA ra đời với mục đích bảo vệ dữ liệu, do vậy chúng được ứng dụng rất nhiều trong hoạt động hiện đại. Những ứng dụng của RSA trong bảo mật dữ liệu như:

Chứng thực dữ liệu: chắc hẳn các bạn đã từng gặp tình trạng yêu cầu xác minh bằng cách đưa ra các con số gửi về email hay số điện thoại trước khi đăng nhập. Đây chính là phương pháp bảo mật thông tin, dữ liệu ứng dụng thuật toán RSA để tránh những tình trạng mạo danh, hack tài khoản gây ảnh hưởng cho người dùng và xã hội. Việc chứng thực giúp bảo vệ được tài khoản của bản thân người sử dụng giúp an tâm hơn khi sử dụng các dịch vụ trực tuyến.
Truyền tải dữ liệu an toàn: hiện nay tình trạng nghe lén, theo dõi hoạt động cũng như lấy cắp dữ liệu cá nhân trên mạng xã hội bị lên án và chỉ trích rất nhiều, bao gồm cả ông lớn Facebook. Không chỉ những trang mạng xã hội, các trang web cũng không tránh khỏi việc lưu lại các hoạt động, hành vi truy cập để phục vụ các mục đích Marketing. Do đó với thuật toán RSA giúp dữ liệu khỏi các cuộc tấn công của kẻ xấu.
Chữ ký số/ chữ ký điện tử: trên các thẻ ATM luôn có phần chữ ký điện tử đã được mã hóa từ chữ ký của khách hàng khi đăng ký tài khoản tại ngân hàng. Có thể nói, trong lĩnh vực ngân hàng, vấn đề bảo mật thông tin của khách hàng cần được đặt lên hàng đầu, chúng quyết định chất lượng của dịch vụ. RSA được ứng dụng để bảo mật dữ liệu khi người dùng thực hiện những giao dịch ngân hàng, đem lại trải nghiệm tốt và giúp khách hàng an tâm hơn.

### Ứng dụng của RSA trong công nghệ thông tin
Trong ngôn ngữ lập trình Java, các nhà lập trình viên thường sử dụng những đoạn code chứa RSA để tăng tính bảo mật cho trang web và ứng dụng cũng như đảm bảo an toàn cho người sử dụng.

Các đoạn code RSA này có thể hoạt động dưới bất kỳ sự thay đổi nào của môi trường. Ngoài ra, các lập trình viên cũng sử dụng các ngôn ngữ lập trình khác bên cạnh Java có thể tìm hiểu và ứng dụng những tính năng của RSA trong hoạt động làm việc và bảo mật thông tin.

Ngày nay việc sử dụng các ứng dụng, trang web trên internet ngày càng gia tăng khiến cho vấn đề bảo mật dữ liệu càng được chú trọng. Những dữ liệu này có thể là những thông tin bí mật cá nhân, thông tin về tài chính,… gây không ít nguy hại cho người sử dụng. Cũng chính vì lý do này mà thuật toán RSA được biết đến và sử dụng nhiều hơn trong tất cả các lĩnh vực đặc biệt là trong ngành ngân hàng. Với những chia sẻ trong bài viết, chúng tôi hy vọng bạn đã giải mã được câu hỏi RSA là gì cũng như những thông tin liên quan đến thuật toán này. Mong rằng các bạn đã có thêm một bí quyết để bảo vệ những dữ liệu của mình một cách tốt hơn nhé!
## Kết Luận
Hy vọng bài viết trên sẽ giúp bạn hiểu hơn về mã hóa RSA là gì? Nếu có thắc mắc hay đóng góp ý kiến, mời bạn để lại bình luận phía dưới bài viết này.
## Tham Khảo 
http://www.iet.unipi.it/g.dini/Teaching/sncs/lectures/handouts/05.02.RSA.pdf