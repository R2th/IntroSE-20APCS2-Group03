Hôm nay mình sẽ giới thiệu các bạn về một external system thường được tích hợp để sử dụng trong các web site EC hoặc các SNS application. External System này được gọi là NaviPlus, được cung cấp bởi công ty NaviPlus.
Đây là công ty của Nhật nên các bạn chỉ có thể gặp trong các dự án Nhật, đặc biệt là khi search trên Google thì không ra kết quả khi search bằng tiếng Anh hoặc tiếng Việt đâu.
NaviPlus cung cấp 5 service sau:
* NaviPlus Search
* NaviPlus Recommend
* NaviPlus Retargeting Mail
* NaviPlus Review
* NaviPlus Transboundary EC

Dưới đây sẽ giới thiệu cụ thể từng dịch vụ

### 1.	NaviPlus Search
NaviPlus Search là một search engine, vừa đảm bảo được tính chính xác của kết quả search, vừa đảm bảo được search usability và cả performance

Về độ chính xác của kết quả search:
* Sử dụng Hybrid algorithm
* Tự động tối ưu hóa
* Filtering
* Liên kết recommend data

Search Usability:
* Suggest keyword
* Hiển thị keyword liên quan
* Hiển thị keyword nổi bật
* Hiển thị content liên quan
* Hiển thị grouping
* Đối ứng đa ngôn ngữ

Performance system:
* Thường xuyên update item data
* Số item có thể liên kết
* Tốc độ response search
* Đối ứng lượng access cùng một lúc nhiều

Chi phí sử dụng dịch vụ này khoảng 3000USD (chưa thuế) chi phí ban đầu và mỗi tháng phải trả 1000USD (chưa thuế)
Để sử dụng dịch vụ này cũng đơn giản, bạn chỉ cần tạo ra 1 file list thông tin item và đặt trên server, NaviPlus sẽ get file đó xây dựng item search và phát triển program. Bạn có thể nhận và hiển thị kết quả search bằng HMTL, API hoặc Ajax

### 2.	NaviPlus Recommend
NaviPlus Recommend là một Recommend  Engine cung cấp conten recommend phản ánh lịch sử hoạt động, lịch sử viếng thăm, thuộc tính item, thuộc tính của visitor.
Service này có thể tăng cường tới mức tối đa tính personal của web site bằng cách điểu chỉnh content hiển thị theo từng visitor.
Để sử dụng service này bạn phải trả chi phí ban đầu là 2000USD (chưa thuế) và mỗi tháng là 1000USD (chưa thuế)
Về cách thức sử dụng service, trước tiên bạn cũng cần đăng ký với NaviPlus những item mà bạn muốn nó recommend, ranking. Sau đó setting thu thập lịch sử hoạt động.
Để làm được việc này cần phải setting beacon tag ở trang item detail, cart page hoặc trang hoàn thành mua sắm.
NaviPlus sẽ thu thập lịch sử hoạt động theo 3 loại: lịch sử view (view item detail), cho vào giỏ hàng và mua hàng.
Cuối cùng bạn phải setting và đăng ký nơi hiển thị recommend data với NaviPlus. Thông thường bạn sẽ sử dụng luôn API của NaviPlus, call API này nhận response là thông tin recommend và cho hiển thị ở nơi mà bạn muốn.
 
### 3.	NaviPlus Retargeting Mail
Đây là một customer service có thể detect action của user trên EC site realtime rồi tự động gửi mail cho user. Nội dung mail phong phú, bạn có thể setting nhiều sceniro gửi mail theo từng nhu cầu của user.
Ví dụ bạn có thể setting những scerio như: khi có user đăng ký hội viên thì 15’ sau gửi mail welcome, nếu user nhấn vào chương trình khuyến mãi thì ngay lập tức gửi mail coupon và các chương trình khuyến mãi, nếu user nhấn vào mục recommend thì trong vòng 15’ gửi mail recommend,…
Đối với dịch vụ này bạn không cần trả phí ban đầu mà chỉ cần trả phí mỗi tháng. Chi phí mỗi tháng thì bạn có thể lựa chọn giữa trả phí cho từng click (event gửi mail) hoặc chi phí cứng thấp nhấp là 500USD.

Để sử dụng service này cũng khá đơn giản, bạn chỉ cần chuẩn bị template muốn sử dụng và setting tag JavaScript ở page đối tượng để get lịch sử hoạt động, mail address và thông tin sản phẩm.

### 4.	NaviPlus  Review
Đây là engine quản lý review duy nhất ở Nhật dành cho những EC site vừa và lớn.
Service này cung cấp nhiều chức năng phong phú. Bao gồm:
Chức năng thu thập
* Free Comment
* Đánh giá 5 sao
* Setting thông tin user
* Bảng trả lời câu hỏi
* Đăng hình
* Post bài thông qua mail
* Mail request review
Chức năng hiển thị
* Review theo đơn vị sản phẩm
* Review theo đơn vị user 
* Radar Chart
* Sort/Filter
* Chức năng report
* Chức năng reply giữa các user
Chức năng quản lý
* Edit review đã đăng
* Staff Response
* Import/Export
* Quản lý status
Service này còn có thể liên kết với service khác để sử dụng data review ở những service liên kết đó. Điển hình là có thể sử dụng data review trong service recommend chẳng hạn.
Chi phí của service này là 2000USD (chưa thuế) cho chi phí ban đầu và chi phí mỗi tháng là 1000 USD (chưa thuế).
NaviPlus sẽ tạo ra script của nội dung review, việc của bạn chỉ là bỏ đoạn script ấy vào nơi bạn muốn hiển thị.

### 5.	NaviPlus Transboundary EC
Thật ra đây chỉ là 1 service kiểu như dịch vụ order hàng khi bạn muốn mua sản phẩm gì đấy ở nước ngoài vậy.
Thông thường các EC Site chỉ nhận buôn bán trong phạm vi lãnh thổ trong nước. Muốn mở rộng buôn bán ra nước ngoài họ phải có dịch vụ trung gian, NaviPlus Transboundary EC chính là 1 dịch vụ như thế. Nó có thể đối ứng đa ngôn ngữ, tiếp nhận order của các user ở nước ngoài và chuyển về website chính.
Cái này không liên quan đến code lắm nên mình nói sơ qua vậy thôi.

Nếu dự án của bạn yêu cầu sử dụng NaviPlus thì cũng đừng hoang vì cái tên nghe khá lạ. Thật ra nếu phải đụng tới thằng này thì bạn sẽ chẳng phải làm gì nhiều đâu.
Trường hợp khách hàng muốn nhận response trực tiếp từ NaviPlus thì bạn chỉ việc tạo ra cái design để hiển thị response của nó trả về. 
Tuy nhiên cũng có trường hợp khách hàng muốn mình viết 1 API trung gian để nhận response của  NaviPlus rồi trả về cho nó thì cũng đơn giản. Vì ngay cả trong trường hợp này bạn cũng chỉ cần tạo ra 1 API với tham số là những item đã đăng ký với NaviPlus và giá trị của tham số thì tùy thuộc vào response bạn muốn nhận lại như thế nào thôi.
Nói chung nếu phải làm việc với thằng này thì cứ xõa thôi. Giá của nó chát thế nên hầu như nó làm cả rồi.