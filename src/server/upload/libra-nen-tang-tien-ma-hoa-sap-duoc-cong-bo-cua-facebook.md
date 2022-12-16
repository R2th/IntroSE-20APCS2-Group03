Chỉ với một dòng trạng thái của Mark Zuckerberg về nến tảng **Libra** cũng như đồng tiền số sắp được chính thức sử dụng của Facebook đã làm cộng đồng Blockchain sôi động trở lại. Bài viết này mình sẽ giới thiệu tổng quan cho các bạn về nền tảng phát triển cũng như đồng tiền kĩ thuật số sắp được phát hành bởi cộng đồng Facebook và rất nhiều những công ty công nghệ lớn. 
![](https://images.viblo.asia/598b2883-f338-4e46-9ea8-582ab00e147c.jpg)

# Giới thiệu
Facebook đã công bố thông tin về đồng tiền số sắp được ra mắt cũng như kế hoạch sẽ đưa vào thực tế vào năm 2020 [ (Link chi tiết)](https://www.facebook.com/zuck/posts/10107693323579671):
![](https://images.viblo.asia/a3c57a4c-4e67-4728-86d1-74acc204bc6a.png)



Sức mạnh của đồng tiền này theo ý kiến cá nhân của mình nằm ở những tổ chức (Facebook và 27 tổ chức khắp thế giới) tạo nên một hệ sinh thái phù hợp để cho công nghệ blockchain phát triển cũng như phát huy sức mạnh về sự linh hoạt trong thanh toán của tiền kĩ thuật số. Dưới đây là những công ty, tổ chức sẽ góp phần tạo nên hệ sinh thái cho **Libra**
![](https://images.viblo.asia/7627c3b4-62b1-42c6-8185-2d6850c90713.png)

# Các tài liệu liên quan
Những tài liệu cần thiết cho các nhà phát triển cũng đã được Calibra (trung tâm nghiên cứu blockchain của Facebook) cập nhật:
* **White paper (Sách trắng)**: Đây là tài liệu được viết bởi Calibra (chủ sở hữu của **Libra**) để giải thích các vấn đề, công bố hướng giải quyết về nền tảng libra được sử dụng để xây dựng đồng tiền số libra. Các bạn có thể xem tài liệu chính thức tại [đây](https://libra.org/en-US/white-paper/?fbclid=IwAR2DVMnujFLIpEfOovl-H_9uHWNnugqVFeqP5ZvnwjAbIiQSqPpq0YDVHPE#introduction).
* **Mã nguồn mở** : Repository chính thức của **Libra** được công bố tại [đây](https://github.com/libra/libra)
* **Tài liệu kĩ thuật** : Giới thiệu ngôn ngữ lập trình để xây dựng ứng dụng trên nền tảng **Libra**, giao thức, codebase các bạn có thể tìm hiểu tại [đây](https://developers.libra.org/docs/libra-protocol)

# Libra blockchain
Ba định hướng được nhà phát triển hướng đến được chỉ ra trong White paper:
* Khả năng mở rộng tới hàng tỷ tài khoản (số lượng tài khoảng facebook hiện tại lên tới hàng tỉ), đòi hỏi thông lượng giao dịch cao, độ trễ thấp và hệ thống lưu trữ dung lượng cao, hiệu quả.
* Bảo mật cao, để đảm bảo an toàn về tiền và dữ liệu tài chính.
* Linh hoạt, có thể trở thành một nguồn năng lượng để duy trì cho hệ sinh thái **Libra** cũng như sự đổi mới trong tương lai về dịch vụ tài chính.

### Ngôn ngữ lập trình mới 
Ngôn ngữ lập trình được **Libra** xây dựng có tên là **Move**, ngôn ngữ giúp cho các nhà phát triển tùy biến cho các giao dịch và các "hợp đồng thông minh" trên nền tảng blockchain này. Trong những bài viết tiếp theo mình sẽ hướng dẫn các bạn về cách xây dựng những hợp đồng thông minh dựa trên ngôn ngữ mới mẻ này. Các bạn có thể tìm đọc qua tài liệu chính thức của **Libra** tại [đây](https://developers.libra.org/docs/move-paper)

![](https://images.viblo.asia/b358bd1f-4ad1-437a-9b1c-dcc279952a97.png)

### Cơ chế đồng thuận
Tiếp tục trong White paper của **Libra** có đề cập đến **hệ chịu lỗi Byzantine** được chọn là hướng xây dựng cho cơ chế đồng thuận của nền tảng này, hệ chịu lỗi này bắt nguồn từ bài toán kinh điển các vị tướng Byzantine, các bạn có thể đọc thêm chi tiết về thuật toán này tại [đây](https://viblo.asia/p/bai-toan-cac-vi-tuong-byzantine-va-ung-dung-trong-blockchain-jvEla4vmZkw). Do mục tiêu xây dựng để hỗ trợ cho lượng giao dịch cao, độ trễ thấp nên bằng chứng công việc (proof of work) không được lựa chọn

### Cấu trúc dữ liệu
Với mục đích để lưu trữ các giao dịch một cách an toàn, **Libra** cũng sử dụng cấu trúc cây Merkle (cũng được sử dụng trong Bitcoin) để phát hiện sửa đổi trong dữ liệu đang tồn tại. Có một điểm khác biết với các dạng Blockchain đang tồn tại, các dạng đã tồn tại thường hiển thị dữ liệu theo dạng tập hợp các block chứa các giao dịch còn **Libra** là một cấu trúc đơn ghi lại toàn bộ lịch sử giao dịch và trạng thái theo thời gian.

![](https://images.viblo.asia/da99c98c-9711-45f1-8ab8-97247ba1b4ea.png)

# Tiền số libra
Hẳn đây sẽ là phần được nhiều người quan tâm nhất. Đồng tiền số của Facebook sẽ là một đồng tiền mà giá trị được ổn định (**stableCoin**). Một loại tiền tệ ổn định được xây dựng trên một blockchain mã nguồn mở an toàn và ổn định, được hỗ trợ bởi một kho dự trữ tài sản thực và được điều hành bởi một hiệp hội độc lập.

Ở đây có nghĩa là đồng **Libra** sẽ được giữ ổn định chứ không bị biến động như Bitcoin hay Ethereum mà sẽ được bình ổn giống như đồng Tether ~ được bình ổn bởi USD ở mức 1 Tether = 1 USD. Đã có rất nhiều đồng tiền stable được public :

![](https://images.viblo.asia/da4937ed-2e19-4cb9-b041-acc4943e011b.png)

Đồng tiền số **Libra** sẽ được đảm bảo bằng các dạng tài sản thực. Những tài sản thực này sẽ được lựa chọn là những tài sản ít biến động về giá trị. Do đó **Libra** có thể dễ dàng chuyển đổi sang nội tệ dựa vào tỉ giá hối đoái, tránh mất thời gian và tiền bạc khi phải chuyển đổi tiền khi di chuyển các quốc gia không có chung đồng tiền.

# Tổ chức libra

Hệ sinh thái **Libra** được hỗ trợ bởi các doanh nghiệp, tổ chức khắp các nơi trên thế giới. Có thể hiểu tổ chức này được sinh ra với mục đích quản lý trung tâm lưu trữ **Libra** ( Có thể hiểu là nó giống với cục lưu trữ tiền tệ của một quốc gia, tuy nhiên libra mục tiêu tồn tại trên toàn thế giới ). Các thành viên thuộc tổ chức này là những bên duy nhất được quyển tạo ra và hủy đồng tiền chung libra. Các đồng tiền mới được tạo ra khi bên được ủy quyền chuyển đổi tài sản thực sang libra và những đồng libra được hủy khi bên được ủy quyền chuyển đổi từ libra sang tài sản thực. Trung tâm lưu trữ **Libra** sẽ luôn chấp nhận các giao dịch từ các bên được ủy quyền về việc chuyển đổi giữa **Libra** và tài sản thực.

Libra hiện tại đang liên tục mong muốn hợp tác của các tổ chức nhằm lớn mạnh về số lượng các bên ủy quyền. Các bên hiện tại có thể kể ra gồm các tổ chức :
* Thanh toán: Mastercard, PayPal, VISA ...
* Công nghệ và thị trường : Ebay, Spotify, Uber, ...
* Viễn thông : Vodafone
* Blockchain : Coinbase, Xapo

.....

# Định hướng phát triển của libra

Libra đã công bố open source và testnet cho các nhà phát triển có thể đống góp xây dựng cho mục tiêu sẽ launch vào nửa đầu năm 2020. Các bạn có thể theo khảo tại [đây](https://developers.libra.org/)

### Libra blockchain

Tập trung vào bảo mật, hiệu năng và mở rộng của giao thức và cài đặt :
* Xây dựng các thư viện và API để tương tác với **Libra** Blockchain
* Thử nghiệm giao thức và mạng hoàn chỉnh với các thực thể như dịch vụ ví và các giao dịch được chạy ổn định trước khi tiến hành launch
* Thúc đẩy và phát triển ngông ngữ **Move** và phương pháp xây dựng các hợp đồng thông minh cho hệ sinh thái **Libra**.

### Lưu trữ:

* Thành lập tổ chức để giám sát toàn cầu và quy định cho cục lưu trữ **Libra**
* thiết lập quy trình hoạt động với các bên ủy quyền để đảm bảo tính minh bạch trong giao dịch

### Tổ chức libra

Phát triển rộng khắp 100 vùng địa lý với đa dạng thành viên là các node xác thực của **Libra** Blockchain

#  Kết luận

Bài viết trên được mình tóm tắt những nội dung chính từ sách trắng (white paper) của libra về đồng tiền mới sắp ra mắt. Những bài chi tiết tiếp theo về ngôn ngữ **Move** hay cách xây dựng các hợp đồng thông minh mình sẽ cố gắng update sớm nhất. Mong rằng tài liệu này có ích với các bạn. 

# Tham khảo

[White Paper Libra](https://libra.org/en-US/white-paper/?fbclid=IwAR2DVMnujFLIpEfOovl-H_9uHWNnugqVFeqP5ZvnwjAbIiQSqPpq0YDVHPE#what-is-next-for-libra)