### Nếu như bạn đã từng nghe về các từ vựng SHA mà vẫn chưa chắc chắn đã hiểu chúng, bài viết này sẽ làm rõ những thuật ngữ này. Nhưng trước khi đề cập đến SHA, chúng ta cần tìm hiểu mã hàm băm là gì, sau đó là chứng thư SSL sử dụng mã hàm băm như thế nào để tạo chữ ký số. Đây là những concept quan trọng trước khi bạn có thể hiểu về SHA1 và SHA2.
### 
### Mã hàm băm (Hashing Algorithm)
Một mã hàm băm là một thuật toán nhằm biến đổi bất kỳ dữ liệu nào thành một định dạng đơn giản. Ví dụ, ta có một dòng chữ như sau:

“The Quick Brown Fox Jumps Over The Lazy Dog”

Khi chạy dòng chữ này qua thuật toán có tên gọi CRC32, chúng ta ra kết quả:

“07606bb6”

Kết quả này được hiểu là mã băm hay giá trị băm. Đôi khi, hàm băm còn được biết tới là “mã hóa một chiều”.

Mã hàm băm trở nên tiện lợi cho các trường hợp mà máy tính muốn nhận dạng, so sánh, hoặc chạy các phép tính đối với tệp/chuỗi dữ liệu. Quy trình sẽ dễ dàng hơn nếu máy tính sản sinh một mã băm và sau đó so sánh giá trị băm hơn là so sánh nội dung các tệp gốc với nhau.

Một trong những đặc tính then chốt của thuật toán hàm băm đó là tính cố định. Bất cứ máy tính nào trên thế giới sử dụng mã hàm băm mà chúng ta đã chọn cũng có thể tính toán ra kết quả băm tương tự từ câu ví dụ.
Thuật toán hàm băm được sử dụng trong đủ loại quy trình – từ việc lưu trữ mật khẩu đến cơ sở dữ liệu. Có đến hàng trăm loại mã hàm băm được sử dụng cho các mục đích cụ thể – một vài trong số chúng được tối ưu hóa cho từng loại dữ liệu, một số khác thì cho tốc độ, hoặc tính bảo mật.

Trong bài viết này, chúng ta sẽ nói đến mã SHA. Mã “SHA” được viết tắt từ cụm Secure Hasing Algorithm – và như cái tên nói lên mục đích – mã SHA được tối ưu cho khả năng bảo mật.

Mã hóa hàm băm SHA tạo ra những kết quả băm không thể đảo ngược và là duy nhất. Không thể đảo ngược nghĩa là dù cho có được kết quả băm cũng không thể tìm ra dữ liệu ban đầu được băm, do đó đảm bảo tính bảo mật tuyệt đối của dữ liệu. Tính duy nhất có nghĩa là hai khối dữ liệu khác nhau sẽ không bao giờ tạo ra kết quả băm giống hệt nhau.

**Chữ ký số?**
Khi chúng ta đã hiệu mã hàm băm là gì, chúng ta có thể tìm hiểu vài trò của chúng trong chứng thư số, cụ thể trong bài viết này với ví dụ chứng thư SSL.

Giao thức SSL/TLS được sử dụng để kích hoạt quy trình truyền tải thông tin một cách bảo mật giữa hai thiết bị trên mạng lưới Internet. Thông thường, SSL được nhắc tới như một dạng “mã hóa”. Nhưng trên tực tế, SSL còn cung cấp khả năng định danh. Các tệp chứa chứng thư SSL cung cấp những thông tin cần thiết cho quá trình định danh. Nói cách khác, chứng thư số SSL liên kết một khóa công khai với một danh tính cụ thể.

Giao thức SSL/TLS cho phép thực hiện kết nối sử dụng mã hóa bất đối xứng. Việc này sử dụng hai khóa mã hóa – một khóa công khai và một khóa bí mật, mỗi khóa xử lý một nửa quy trình Mỗi chứng thư số SSL chứa một khóa công khai để khách hàng mã hóa dữ liệu, và người sở hữu chứng thư SSL lưu trữ bảo mật một khóa bí mật trên máy chủ để giải mã.

Điều này có nghĩa rằng khả năng xác thực danh tính là cực kỳ quan trọng để đảm bảo rằng SSL/TLS thực hiện chức năng bảo mật. Hãy thử tưởng tượng rằng máy tính của bạn không có cách nào đáng tin cậy để biết được ai là bên sở hữu khóa mã hóa mà bạn đang sử dụng. Lúc ấy mã hóa dữ liệu bằng khóa công khai sẽ không có ích lợi gì bởi bạn không thể biết ai đang sở hữu khóa bí mật để giải mã. Rốt cuộc, mã hóa dữ liệu là không có ý nghĩa nếu dữ liệu của bạn bị gửi thẳng đến bên thứ ba hoặc bên có mục đích xấu ở đầu kia kết nối.

Chữ ký số là một thành phần qua trọng thông qua đó chứng chỉ SSL cung cấp tính năng xác thực định danh. Khi một chứng thư số được cấp, chứng thư sẽ được “ký số” bởi Nhà Cung Cấp Chứng thực Số – CA (VD: TrustCA) . Chữ ký số này cung cấp bằng chứng rằng CA đã ký số lên chứng thư SSL và chứng thư không bị sửa đổi hay làm giả. Quan trọng hơn, chữ ký số chứng thực rằng thông tin trong chứng thư được kiểm định bởi một bên thứ ba đáng tin cậy: không có mánh khóe, che đậy hay sửa đổi nào được thực hiện lên chứng thư.

Chữ ký số cực kỳ nhạy cảm – bất cứ thay đổi nào đến tập tin được ký số cũng sẽ khiến chữ ký bị thay đổi. Trong câu ví dụ của chúng ta, chỉ cần thay từ viết hoa thành viết thường (“the quick brown fox jumps over the lazy dog”) thì kết quả mã băm cũng sẽ khác hoàn toàn. Điều này tương đương với một chữ ký số cũng khác hoàn toàn. Chỉ cần thay đổi một bit trong cả ngàn Gigabit cũng đủ để tạo ra kết quả mã hóa băm khác biệt.

Vì vậy, kẻ tấn công sẽ không thể sửa đổi một chứng thư số đã ký hoặc tạo ra một chứng thư số giả mạo. Một kết quả băm khác biệt có nghĩa chữ ký số không còn có hiệu lực, và máy tính của bạn sẽ lập tức phát hiện điều này khi xác thực chứng thư SSL. Nếu máy tính của bạn gặp phải một chữ ký không có hiệu lực, bạn sẽ gặp một thông báo lỗi và mất hoàn toàn khả năng đảm bảo kết nối bảo mật.

### SHA1 và SHA2
Giờ khi chúng ta đã có nền tảng về mã băm và chữ ký số, chúng ta có thể nói về chủ đề chính: mã băm SHA

Mã SHA là viết tắt của cụm Secure Hashing Algorithm. SHA1 và SHA2 là hai phiên bản của thuật toán nói trên. Chúng khác nhau trong cách thiết kế (cách tạo ra kết quả băm từ dữ liệu gốc) và trong độ dài khóa của chữ ký số. Nói ngắn gọn , SHA-2 là người kế nhiệm của SHA-1 với các cải tiến tổng thể.

Tổ hợp SHA2 có thể gây chút khó hiểu, bởi các trang điện tử và ngành công nghệ diễn đạt rất khác nhau. Nếu bạn thấy “SHA2”, “SHA256” hay “SHA256 bit”, thì các tên này đều chỉ là một.

Từ năm 2011 đến 2015, SHA1 đã từng là thuật toán chủ yếu. Tuy nhiên, một số lượng ngày càng lớn các nghiên cứu khóa học chỉ ra điểm yếu của SHA1 đã thúc đẩy quy trình kiểm tra lại tính bảo mật của thuật toán này. Google thậm chí còn tạo ra một “va chạm mã hóa” SHA1 (khi hai tệp dữ liệu riêng biệt tạo ra cùng một mã băm, chúng được gọi là đã “va chạm”). Vì vậy, từ năm 2016 trở đi, SHA2 trở thành tiêu chuẩn mới. Ngày nay nếu bạn nhận được một chứng thư số SSL/TLS , chứng thư ấy phải dùng SHA-2 ở mức tối thiểu.

Mức bảo mật của chữ ký số chỉ được đảm bảo khi va chạm mã hóa không xảy ra. Va chạm mã hóa cực kỳ nguy hiểm bởi chúng cho phép hai tệp dữ liệu khác nhau cho ra cùng một chữ ký số, vì vậy, khi máy tính kiểm tra chữ ký, chữ ký ấy sẽ có vẻ có hiệu lực mặc dù có một tệp chưa hề được ký số.

<div align="right">Hashout Blog
</div>

https://savis.vn/trustca-timestamp-dich-vu-chung-thuc-dien-tu-dau-thoigian/