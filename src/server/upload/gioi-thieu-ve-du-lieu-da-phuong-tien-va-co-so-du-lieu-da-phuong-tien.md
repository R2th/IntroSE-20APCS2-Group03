Trong nhiều năm gần đây, thuật ngữ đa phương tiện ngày càng được sử dụng nhiều hơn và rộng rãi hơn. Việc nghiên cứu và phát triển đa phương tiện là cần thiết trong ứng dụng truyền thông và thể hiện thông tin đa phương tiện. Ngày càng nhiều dữ liệu số đa phương tiện được thể hiện dưới dạng hình ảnh, video, âm thanh... đòi hỏi các kĩ thuật lưu trữ, tìm kiếm hiệu quả và mạnh mẽ hơn để khai thác và sử dụng. Nhưng trước tiên ta cần phải biết dữ liệu đa phương tiện và cơ sở dữ liệu đa phương tiện là gì?
![](https://images.viblo.asia/2e4ccd09-f75a-44f7-9406-8ace50a99d10.jpg)

### Khái niệm dữ liệu đa phương tiện
*Định nghĩa: Phương tiện (media) là nhằm đến các kiểu thông tin hay kiểu thể hiện thông tin như dữ liệu số, văn bản, hình ảnh, âm thanh, video.*

Đa phương tiện nhằm vào tập các kiểu phương tiện sử dụng cùng nhau. Nó cũng ngầm xác định có kiểu dữ liệu khác số, văn bản. Do vậy thuật ngữ “đa phương tiện” cũng nhằm chỉ tính chất như một tính từ. Cũng có thể hiểu đơn giản đa phương tiện là tổ hợp của văn bản, hình ảnh, hoạt hình, âm thanh và video. Và đa phương tiện có mặt trong mọi khía cạnh hoạt động, đời sống của con người như truyền thông, giải trí, thương mại, giáo dục, ...

*Dữ liệu đa phương tiện (multimedia data) là dữ liệu hướng đến thể hiện máy đọc được của các kiểu phương tiện gộp.*

Đặc điểm của dữ liệu đa phương tiện:
* Dung lượng lớn
* Đa dạng và phức tạp, phi cấu trúc

Tìm kiếm dữ liệu theo các kiểu câu hỏi cũng rất đa dạng, ví dụ:
* Tìm theo nội dung: Tìm ảnh có hồ nước?
* Tìm theo mẫu đặc trưng: TÌm bài hát có "một đoạn nhạc mẫu"
* Tìm theo dữ liệu meta: Tìm người tên là Hồ Chí Minh?
* ...

Dữ liệu đa phương tiện còn thường xuyên liên quan tới vấn đề bản quyền - quyền sở hữu về trí tuệ đối với sản phẩm, dữ liệu. Các lĩnh vực được giữ bản quyền trên thế giới bao gồm: phần mềm, âm nhạc, điện ảnh, văn học, kịch, kiến trúc, tạo hình tự nhiên, ảnh, nghệ thuật (hội họa, đồ họa, điêu khắc, ...).

### Sự gia tăng dữ liệu đa phương tiện và các tính chất của chúng
Người ta không thể tránh hết các dữ liệu âm thanh và tranh, ảnh. Xu hướng sử dụng dữ liệu đa phương tiện làm các công nghệ lưu trữ số phát triển nhanh hơn, có thể dễ dàng đáp ứng nhu cầu về đa phương tiện nhỏ. Nhưng đối với yêu cầu toàn diện thì đòi hỏi cả hệ thống tổ chức dữ liệu, tìm kiếm nhanh hơn.

![](https://images.viblo.asia/19c44713-84a9-4225-983b-10120bdee680.png) 

*sử  dụng khái niệm đa phương tiện - máy bay bay vượt ngưỡng âm thanh*

Người ta không chỉ chịu sức ép về khối lượng dữ liệu, mà còn các kiểu dữ liệu đa dạng và các tính chất khác với dữ liệu số, văn bản truyền thống. Dữ liệu đa phương tiện còn có các tính chất chính sau:

* Dữ liệu đa phương tiện, đặc biệt dữ liệu âm thanh, video là những dữ liệu được nén với tỉ lệ cao, khoảng 1Gb chỉ chức được khoảng 10 phút video.
* Dữ liệu âm thanh và video có chiều thời gian, đòi hỏi thể hiện theo tốc độ cố định để đạt hiệu quả dự định.
* Các dữ liệu âm thanh, hình ảnh và video số được thể hiện theo một loạt các mẫu riêng, do vậy khó tự động ghi nhận nội dung bởi không dễ xác định được cấu trúc ngữ nghĩa của chúng.
* Nhiều ứng dụng đa phương tiện cần thể hiện đồng thời của nhiều dạng phương tiện theo cách tương ứng với không gian và thời gian.
* Ý nghĩa của dữ liệu đa phương tiện thường mờ và chủ quan, không tiện xác định rõ.
* Dữ liệu đa phương tiện mang nhiều thông tin, đòi hỏi nhiều tham số thể hiện nội dung.

![](https://images.viblo.asia/52ec80f3-163e-44cb-9b0d-96d504b9425e.png)

Ví dụ về một hình động tạo bởi các khung như trên, khi xem hình động ta có thể dễ dàng nhận ra quả bóng đang nảy nên rơi xuống. Nhưng rất khó để tự động ghi nhận được nội dung đó của hình động.

### Cơ sở dữ liệu đa phương tiện
*CSDL đa phương tiện = CSDL + đa phương tiện*

Có rất nhiều định nghĩa khác nhau về CSDL đa phương tiện: Theo nghiên cứu EURESCOM thì CSDL đa phương tiện là một CSDL có hiệu năng cao, sức chứa lớn với khả năng hỗ trợ các kiểu dữ liệu đa phương tiện cũng như các kiểu dữ liệu chữ số cơ bản khác và nó có thể quản lý một khối lượng rất lớn thông tin đa phương tiện.

Theo cách nhìn trên ta nhận thấy CSDL đa phương tiện bao gồm năm mục tiêu chính như sau:
* Hỗ  trợ  các  kiểu  dữ  liệu  (Type=Structure+Operations)  đa  phương  tiện:  các phương tiện khác nhau và các thao tác thông thường cũng như các thao tác đặc biệt mà kiểu dữ liệu thông thường không có như tiến, lùi, dừng...
* Có  khả năng quản lý số lượng lớn các đối tượng đa phương tiện: đề cập đến không gian lưu trữ của CSDL.
* Hỗ trợ hiệu năng cao, sức chứa cao và quản trị lưu trữ hiệu quả.
* Có các khả năng của hệ CSDL truyền thống.
* Có khả năng truy tìm thông tin đa phương tiện.

CSDL đa phương tiện khác với các CSDL truyền thống (CSDL quan hệ). Sự khác nhau của các kiểu dữ liệu trong CSDL đa phương tiện đòi hỏi các phương thức đặc biệt để tối ưu hóa lưu trữ, truy nhập, đánh chỉ mục và khai thác. Do đó hệ quản trị CSDL đa phương tiện (MDBMS) phải đáp ứng những yêu cầu đặc biệt này bằng cách cung cấp các cơ chế tóm tắt bậc cao để quản lý các kiểu dữ liệu khác nhau cũng như các giao diện thích hợp để thể hiện chúng.

Một MDBMS trước hết phải hỗ trợ các kiểu dữ liệu đa phương tiện khác nhau bên cạnh việc phải cung cấp đầy đủ các chức năng của một DBMS truyền thống như khai báo và tạo CSDL, truy vấn và tổ chức dữ liệu, độc lập, bảo mật, toàn vẹn dữ liệu và kiểm soát phiên bản.

### Cấu trúc lưu trữ CSDL đa phương tiện

![](https://images.viblo.asia/e35d327f-6426-42f6-9d58-85a00ef66741.PNG)
*Mô hình dữ liệu đa phương tiện*

Khi đề cập về cấu trúc dữ liệu đa phương tiện, một điểm cần lưu ý trước tiên là dữ liệu da phương tiện luôn mang khía cạnh không gian và  thời gian. Không gian đối với dữ liệu đa phương tiện thường nhiều chiều. 

Người ta quan tâm việc nhận thức các dữ liệu đa phương tiện, cách hình thức hoá chúng. Các khái niệm đa phương tiện cần được áp dụng phương pháp hình thức để có thể phát triển ứng dụng. Hầu hết các dữ liệu n chiều đều dùng cách thể hiện phân rã theo cây thông tin. 

Để hình thức hoá, trừu tương hoá dữ liệu đa phương tiện, người ta cần đến các kĩ thuật như cây B, B+, cây k-d (k-chiều), cây tứ phân theo điểm, cây tứ phân, cây R. Đồng thời còn phải quan tâm đến các phương pháp cài đặt các kĩ thuật này.

* Cây 2-d được dùng ñể thể hiện các nút trong không gian 2 chiều. Cây k-d với k ≥ 2 được dùng cho không gian k chiều, chẳng hạn các điểm (x, y, z) sử dụng cây 3-d.
* Cây tứ phân, hay cây bốn phần, được dùng để thể hiện điểm không gian 2 chiều. Cây 2-d cũng có tác dụng như vậy. Tuy nhiên điểm khác biệt là cây tứ phân chia miền thành 4 phần, trong khi cây 2-d cho phép tách miền ra hai phần.

![](https://images.viblo.asia/09a8f88d-93d5-4b25-a6b2-f574156d3dd4.PNG)

*Ví dụ 4 phần so với một nút trong cây tứ phân*
* Cây miền chữ nhật được sinh ra nhằm nhằm cho phép sử dụng cấu trúc thể hiện dữ liệu là các miền chữ nhật. Người ta gọi nó là cây R. Ngoài tác dụng trực quan trên, cây R có ưu điểm cho phép tổ chức thông tin trên đĩa từ, ít ra là ưu điểm trong việc giảm số lần truy cập đĩa từ.

![](https://images.viblo.asia/f0d0f348-6396-43b7-9ff1-8bc2c6a2553c.PNG)

*Các hình chữ nhật được tạo nhằm chứa các điểm*

Để lựa chọn cấu trúc dữ liệu phù hợp cho các đối tượng đa phương tiện, người ta cần xem xét nhiều mặt. Tuy nhiên trong số một vài cấu trúc, người ta có thể so sánh để chọn ra cấu trúc phù hợp với các kiểu dữ liệu, các thông số đã xem xét khác. Trong bài giới thiệu sẽ không đi sâu vào phân tích các cấu trúc trên.


-----
Tài liệu tham khảo:
* Giáo trình Cơ sở dữ liệu đa phương tiện - PGS.TS Đỗ Trung Tuấn
* Managing Multimedia and Unstructured Data in the Oracle Database - Marcelle Kratochvil