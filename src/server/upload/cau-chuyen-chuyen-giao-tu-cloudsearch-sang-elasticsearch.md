![](https://images.viblo.asia/0805685b-1222-4458-b7a3-7daf1bc6a8d1.png)

Ở bài viết này, chúng tôi xin chia sẻ với các bạn một câu chuyện về 2 hệ thống này ở Pixta Việt Nam
# Câu chuyện chuyển giao từ CloudSearch sang Elasticsearch
Với Cloudsearch, chúng tôi đã sử dụng dịch vụ này từ rất lâu, khoảng đầu những năm 2010. Với dịch vụ Cloudsearch, chúng tôi sử dụng nó làm một search engine chính cho hệ thống tìm kiếm của mình. 

Tuy nhiên, bắt đầu từ năm 2014, AWS đã ngừng hỗ trợ và phát triển cho search engine này. Cùng với đó là DSL của Cloudsearch khó sử dụng, các công cụ hỗ trợ cũng như cộng đồng phát triển ngày càng thu hẹp lại. Vì thế, chúng tôi quyết định sử dụng Elasticsearch thay thế với những lợi thế vượt trội. 

Sau khi chuyển giao toàn bộ logic tìm kiếm từ Cloudsearch sang Elasticsearch, với cấu hình hiện tại của hệ thống tìm kiếm, chi phí hàng tháng vào khoảng vài nghìn đô la.

Tính năng đang sử dụng của Elasticsearch đang mang lại giá trị lớn cho công ty
Đối với Elasticsearch, chức năng full text search đã quá nổi tiếng và làm nên thương hiệu của dịch vụ này. Chúng tôi đã áp dùng nó vào hệ thống của mình để giảm thời gian truy vấn và tối ưu sự chính xác và phù hợp đối với mỗi lần tìm kiếm của người dùng. 

Ngoài ra, Elasticsearch còn cung cấp mã nguồn mở điều đó thật sự đã giúp chúng tôi rất nhiều trong việc tích hợp AI, Machine Learning vào hệ thống nhằm giúp kết của tìm kiếm của người dùng trở nên thân thiện và đúng với mục đích tìm kiếm hơn. Có thể kể đến một số tích hợp như Learning To Rank, PCC, Face-search,…

Còn một điều nữa rất thú vị là chức năng More Like This Query của Elasticsearch giúp chúng tôi tạo ra được những danh sách ảnh, video liên quan đến nhau, việc này giúp cho người dùng không công sức để tìm kiếm những hình ảnh liên quan mà nó được hiển thị ngay dưới ảnh gốc và thay đổi theo ngày, không bị trùng lặp và không tốn công sức chọn ảnh thủ công như những trang web khác. Điều này thật sự tuyệt vời khi nó đã và đang giúp CVR của chúng tôi tăng lên từ 1.5 – 3% mỗi tháng kể từ lúc apply lên hệ thống.

![](https://images.viblo.asia/6b14dcf9-1da5-4f5a-bae2-e7069b7b0ba2.png)
*<div align="center">Các ảnh tương tự hiển thị trên trang chi tiết</div>*

![](https://images.viblo.asia/bafdc62f-8d64-4efc-a67a-4744289021b3.png)
*<div align="center">Các ảnh tương tự hiển thị trên xem nhanh của trang tìm kiếm</div>*

Theo thống kê hàng tháng, tỷ lệ click rate vào những items được suggest rất khả quan, nó chiếm khoảng 6.6% trên tổng số lượng click của toàn hệ thống.

Đó là 2 chức năng lớn nhất trong nhiều chức năng khác mà chúng tôi đang sử dụng cũng như update hệ thống của mình hàng ngày. Ngoài ra, công ty chúng tôi hiện có một team AI gần 20 thành viên đang làm thực hiện nhiều dự án AI, ML để tích hợp vào hệ thống search của mình, nhằm đem lại nhiều giá thật trị và tăng cao trải nghiệm sử dụng cho người dùng, cũng như làm tăng doanh thu cho khách hàng.

Đến đây, bạn chắc hẳn sẽ đặt ra một câu hỏi là: Liệu làm việc với hệ thống này có phức tạp không? 

Câu trả lời này là của bản thân tôi – người đang trực tiếp đang làm việc với hệ thống: Bạn biết đó, Elasticsearch có một cộng đồng rất phát triển và nhiệt tình, thêm vào đó những service tools mà chúng tôi áp dùng như Kibana, Logstash, Newrelic, Treasure Data,… nhằm mục đích đảm bảo cho hệ thống hoạt động trơn tru, hiệu quả phần nhiều sẽ làm bạn cảm thấy khó khăn và không biết tiếp cận thế nào khi mới bắt đầu. Nhưng sau một vài tháng bạn sẽ dần quen với nó và trở nên dễ dàng hơn nhiều.
# Đoạn kết

Việc áp dụng những tiện ích của Elasticsearch vào hệ thống đem lại nhiều giá trị sử dụng nhưng đồng thời, chúng tôi cũng cần rất nhiều sự nỗ lực để vận hành nó một cách trơn tru. Với chúng tôi, sự thử thách sẽ giúp cả team nâng cao tinh thần trách nhiệm và khi thành quả xuất hiện thì đó cũng chính là trái ngọt mà chúng tôi hướng đến.

Nếu bạn cảm thấy hứng thú, tò mò cũng như có tinh thần ham học hỏi, hãy apply vào Pixta Vietnam nhé! Hy vọng chúng ta sẽ được làm việc, giải quyết vấn đề cùng nhau.

# Tìm hiểu thêm về Pixta và cơ hội làm việc tại Pixta
🌐 [Website](https://pixta.vn/careers) |🏠 [Facebook](https://www.facebook.com/pixtaVN) | 🔖 [LinkedIn](https://www.linkedin.com/company/pixta-vietnam/) |✉️ Email: recruit.vn@pixta.co.jp