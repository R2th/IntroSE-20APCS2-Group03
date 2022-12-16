Vì đang theo ReactJS và có định hướng học chắc xong nhảy sang React Native, đồng thời cũng nhận ra cái thế mạnh của React(tất) nên mình đăng kí tham gia hội nghị F8 Meetup. Và đây là những điều mình đã thu hoạch được trong buổi hôm nay. Mình xin viết về những điều nghe được. Có gì sai sót về tên nhân vật hay khái niệm ngôn ngữ xin các bạn phản hồi để mình sửa sai.

![](https://images.viblo.asia/fca73f98-48fa-4f94-8933-2b120fc59e90.jpg)

# Mở đầu: Bài phát biểu của Mark Zuckerberg tại F8 San Francisco
 Có thể chia bài phát biểu ra làm 2 phần: Phần 1 là liên quan tới sự cố chính trị với Cambridge Analytica vừa rồi và phần 2 là giới thiệu các tính năng mới cho các sản phẩm sắp ra của Facebook.
 
##  Sự cố chính trị với Cambridge Analytica
 Với phần 1, CEO của Fb khắng định định hướng của Facebook là để kết nối mọi người lại với nhau và mong muốn tiến lên cũng như khắc phục vụ bê bối chính trị vừa rồi. "Ai cũng có thể mắc sai lầm, và chắc chắn sẽ phải có hậu quả, nhưng nếu chúng ta không làm và khắc phục thì thế giới sẽ không thể tự tiến bộ được".

Với mục này, Facebook đưa ra các giải pháp:

1. Bảo đảm tính chính xác của các cuộc bầu cử
* Sử dụng bộ lọc cho các thông tin chính trị tiêu cực.
* Sử dụng bộ lọc các tài khoản ảo và khóa toàn bộ các tài khoản đó nếu phát hiện 1 xu hướng chính trị.
* Xử lý các thông tin giả nguy hiểm.
2. Cải thiện quyền riêng tư dữ liệu
* Cho phép giới hạn quyền riêng tư dữ liệu cho từng nhóm.
* Chống lại các ứng dụng nguy hiểm có nguy cơ lấy quá nhiều dữ liệu của người dùng hơn mức cần thiết.
* Chức năng Xóa lịch sử sử dụng Facebook, tức là lịch sử sử dụng Facebook có thể trở thành XXX(tức là Xem Xong Xóa 🤣🤣🤣 ).
## Tính năng mới cho các sản phẩm của Facebook

Với Facebook, chúng ta sẽ có 1 cái profile riêng cho dating. Theo mình hiểu nhưng quảng cáo là nó sẽ gồm các mốc của 1 quan hệ, các bài đăng liên quan tới 1 mối quan hệ và địa điểm,....

Với Instagram, có 3 điểm sau:
* Tối ưu hóa giao diện giúp cho tìm kiếm hình ảnh theo 1 chủ đề, ví dụ như từ khóa "Gái xinh" là bạn sẽ có giao diện kq rất thân thiện =)))
* Video chat: Tính năng mới. Và theo quảng cáo bạn có thể vừa lướt IG vừa chat video với cửa sổ thu nhỏ(giống xem video youtube trên di động và khi bạn chán tìm video khác thì video đang theo dõi thu nhỏ lại)
* AR Camera Effects Platform. Các bạn thích chụp ảnh có hiệu ứng tai chuột tai mèo rất thích điều này =)))

Với WhatsApp:
* Bổ sung Group Video Calling. Chúc các bạn Video Call theo nhóm vui vẻ.
* Các chức năng bổ trợ cho doanh nghiệp trên WhatsApp.

Messenger cũng nằm trong danh sách chuẩn bị có phiên bản update với:
* Đơn giản hóa giao diện và tối ưu tốc độ.
* AR Camera Effects Platform cho các cuộc gọi video.
* Business Bots

Và VR thì anh ấy phát cho mỗi dev tham gia F8 1 cái VR cty anh ấy đầu tư
# React + GraphQL. Xây dựng ứng dụng realtime trên mobile

Đây là phần được diễn thuyết bởi anh Phạm Thanh Tú, CTO của AgileTech Vietnam.Qua phần này thì mình đã hiểu rõ hơn về React. Nó định nghĩa mọi thứ đều là component và bản chất UI cũng chỉ là việc thay đổi trạng thái của phần tử

UI=state

Về GraphQL thì đây là 1 công cụ giúp chúng ta mô tả các view mình sẽ cần, kiểm soát các API. Front-end sẽ không phụ thuộc back-end mà chủ động lấy API. Ví dụ như có 1 database khá to đã chuyển thành API. Tùy theo yêu cầu dự án bỗng ta phải thêm, bớt hoặc thay đổi. Khi đó viết lại back-end và chúng ta sẽ có rất nhiều API. GraphQL sẽ giúp chúng ta tránh trường hợp này.
GraphQL có 3 phần là query, mutation và subscription. Ngoài ra thì có Relay để hỗ trợ GraphQL

Và anh Tú cũng đã demo app ngay tại sự kiện

![](https://images.viblo.asia/7428701c-410a-4d91-b4a9-ab186d957dbb.jpg)

Rồi viết đến đây mỏi quá. Nên mình nghĩ vừa hết phần này chúng ta sẽ đến mục phụ: Teabreak sự kiện có gì? =))

![](https://images.viblo.asia/4ab46bab-4a5f-4ad7-b185-35332e302952.jpg)

Biết ảnh đồ ăn chất lượng kém rồi, đừng ông nào than =)) Muốn thì chăm đi các sự kiện tech vào.
# Unit test trong React
Anh Lê Quốc Hưng, hiện đang là 1 kĩ sư cho mã nguồn mở chủ trì phần này

![](https://images.viblo.asia/df9a83ec-575e-4d41-b07b-c54ef6fdfec3.jpg)

Khái niệm về Unit Test được mô tả như sau:
* Chia nhỏ chương trình ra thành các phần đơn giản(units)
* Tạo cho mỗi unit 1 vài cái test
* Chạy tất cả các test
* Chạy các test theo định kì, đặc biệt khi thêm chức năng mới thì chạy unit test toàn bộ ctr để chắc rằng phần mới ko gây lỗi cho phần cũ
 
 Lời khuyên được đưa ra cho Unit Test là viết code tới đâu thì test đi tới đấy.
 
 Sau đó là màn giới thiệu Jest - 1 framework test đa chức năng và demo Jest với game Mario tự làm đang trong quá trình phát triển. Từng chức năng đi, lùi cũng như hiển thị bầu trời, đường đi đều có unit test cụ thể
 
# Thảo luận

Ở phần này, chúng ta có anh Tú, anh Hưng, chị Vũ Thị Thanh Bình - kĩ sư của World Quant, anh Lại Phương - 1 trong những đại diện của cộng đồng FCC(mình nhớ tạm thế chứ quên giới thiệu đầy đủ, chỉ biết anh Phương là 1 trong những người nhiều kinh nghiệm trong cộng đồng FCC Hanoi), anh Trần Đức Thắng từ Framgia(cũng là 1 gương mặt quen thuộc của Viblo) và anh Nguyễn Viết Dũng từ Alt Plus.

![](https://images.viblo.asia/eb8da4d2-e9a9-4826-a1d6-58d355007a8d.jpg)

Mở đầu, anh Hưng chia sẻ về việc tạo ra sản phẩm tốt. Anh ấy đã theo 1 công ty trong 1 thời gian rồi sau đó bỏ việc để tự học. Thời gian tự học ấy anh học kĩ về 1 vấn đề với độ distract thấp, học từ cộng đồng để tự phát triển. Từ đó phát triển các ý tưởng, hiện thực hóa nó và sau đó đưa ra cộng đồng sử dụng dưới dạng open source.

Phần thảo luận tiếp đó đã diễn ra theo cách rất cởi mở về vấn đề học với người lập trình viên. Anh Hưng cũng đã cởi mở rằng tùy từng người sẽ có những cách học khác nhau. Tuy nhiên khi tiếp xúc với khái niệm với thì với tư cách là người xuất thân từ design, anh ấy biểu diễn khái niệm mới bằng cách vẽ. Đồng thời khi học thì anh Hưng sẽ có chọn lọc vì ngành IT có rất rất nhiều lĩnh vực để học.

Anh Phương thì đưa ra ý kiến quan trọng: 1 là tự học và đọc sách là 1 cách tự học, và 2 là tìm 1 công ty để làm. Anh Phương cũng nói rằng đọc sách cũng là thói quen tốt của người Nhật. Làm trong công ty sẽ có cái lợi là mình sẽ được trải nghiệm 1 sản phẩm thực tế sẽ có những công đoạn nào và code phải chuẩn ra sao.

Với việc người Nhật đọc sách thì anh Thắng cũng nhán mạnh thêm việc người Nhật đọc sách rất nhiều và việc quan trọng của việc tham gia vào làm 1 sản phẩm. Anh Thắng cũng chia sẻ giấc mơ có 1 sản phẩm open source của mình

Anh Dũng đưa ra 3 điều quan trọng: Học hiểu, chuyên sâu về 1 lĩnh vực; Tập trung vào 1 framework và Làm nhiều dự án

Chị Bình thì nhấn mạnh vào vấn đề chuyên sâu, đồng thời cũng nêu cao vai trò việc phân tích ưu, nhược điểm của từng công nghệ để chọn công nghệ chuyên sâu. Đồng thời không nên có 1 suy nghĩ là Lập trình viên sẽ nhiều tiền và học code để lên các vị trí PM với Leader.

Quay lại vấn đề Lập trình viên tốt, anh Phương nhấn mạnh tầm quan trọng của thuật toán. Càng lên dự án cao và phức tạp thì thuật toán là vấn đề quan trọng, đặc biệt khi làm việc với AI và Machine Learning. Anh Hưng thì cho rằng Cấu trúc dữ liệu cũng quan trọng không kém. Anh Thắng chia sẻ về tầm quan trọng của Thuật toán và tư duy code, đồng thời các môn học trên trường với các bạn chuyên về CNTT là rất quan trọng. Có khi học hiện tại chưa dùng để làm gì cả mà phải đến 5-10 năm sau các bạn phải dùng

Câu hỏi tiếp theo là của mình: Với việc đề cao vai trò của việc học thì làm thế nào các anh-chị có thể sắp xếp thời gian dự án của mình trên công ty với việc học của bản thân(và ý mình cũng là các chuyện vợ con, gia đình,... nữa)?

Anh Tú đã nêu kinh nghiệm bản thân trước khi vào AgileTech Vietnam. Qúa khứ làm 2 tháng rồi nghỉ liên tục. Với việc nghỉ thế anh Tú có nhiều thời gian để học để có thể chắc kỹ năng và trở thành CTO của AgileTech VN.

Anh Phương thì không khuyến khích việc bùng việc cúp cơ quan. Anh chỉ ra về việc project sẽ yêu cầu công nghệ khác nhau và các trường hợp ấy sẽ phải cần học mới. Đó là 1 cơ hội học và nhất là 1 số cty có lộ trình training cho những việc học công nghệ như vậy. Nhưng nếu chỉ dựa vào công ty bảo gì làm đấy thì việc học cũng không hiệu quả và bản thân giá trị sẽ không hề cao. Vì vậy anh Phương có lời khuyên về việc "bán mình cho xã hội", tức là lập 1 side project của các nhân song song với công ty và dùng side project quảng cáo bản thân. Làm như vậy để biết giá trị bản thân ở đâu trong xã hội và cũng cái lợi thì khi có project đó, cty cần đúng công nghệ mình đã biết và show ra thì sẽ được tăng lương.

Câu hỏi chiếm nhiều thời gian nhất của buổi Thảo luận là câu hỏi về việc học trái ngành của 1 bạn nữ rất xinh. Các anh kỹ sư khách mời hỏi đáp đã rất nhiệt tình trả lời, không kể việc quá thời gian.

Anh Hưng chia sẻ rằng khi học trái ngành thì mình sẽ lấy nguyên cách suy nghĩ của ngành cũ sang IT. Với anh Hưng thì gốc design sang code là 1 lợi thế lớn về UI/UX. Nhưng bất lợi đó là phải tìm hiểu 1 thứ hoàn toàn mới. Lời khuyên anh Hưng đưa ra là phải tiếp tục cố gắng, luôn tự so sánh bản thân với ngày hôm qua xem mình tiến bộ như thế nào, kiên trì và biến việc học thành thói quen. Anh cũng chia sẻ là theo ngành này sẽ ~~thỉnh thoảng~~ fail rất nhiều, nhưng phải rút ra bài học mỗi lần fail và giữ vững tinh thần muốn học

Chị Bình thì cũng chia sẻ ngay cả trong nghề cũng có lúc suy nghĩ mình chọn nhầm nghề, tuy nhiên những lúc ấy là cân nhắc kĩ vì chắc chắn đây không phải nghề chơi và hái ra tiền.

Anh Phương thì cho 1 ý kiến khá khắc nghiệt. Anh khuyên em gái không nên đổi từ công việc liên quan tới ngoại ngữ và marketing sang thành Lập tình viên vì:
1. Ngành IT khá khắc nghiệt với nữ giới. Nữ giới trong ngành thường phải đánh đổi thanh xuân và .... vẻ ngoài khi ở trong nghề.
2. Hầu hết mọi người chuyển như vậy thường fail. Hoặc không tiến xa được trong nghề. Cái này được chỉ rõ hơn về tư duy toán. Làm 1 sản phẩm nhỏ thì có thể framework bao hết nhưng khi động vào công nghệ như AI thì thuật toán lại là sống còn. Mà thuật toán thì là cốt lõi của AI.

Tuy nhiên anh Phương cũng chỉ ra 1 đường nếu bạn nữ nhất quyết theo lập trình:
* Học trên FCC.
* Nhờ người chỉ dạy. Bạn nữ là dân ngoại ngữ làm marketing trong IT nên sẽ có các đồng nghiệp chỉ dạy

Và có bạn nam đề nghị được hỏi lý do bạn nữ theo IT. Khi được biết là bạn nữ có ước mơ thực hiện 1 ý tưởng thành hiện thực dựa vào phần mềm, anh Phương đã đưa ra bổ sung:
* Kiếm anh IT đẹp trai giỏi giang lập trình cho phần mềm. Để thực hiện ý tưởng thì luôn có nhiều cách.
* IT là ngành công nghiệp phụ trợ ngành khác. Nên tuy là 1 chìa khóa quan trọng nhưng sẽ không phải chìa khóa quan trọng nhất cho 1 vấn đề.

Anh Tú thì lại ủng hộ bạn nữ theo IT với lợi thế tiếng Anh thì cũng phân cú pháp, cấu trúc. Áp dụng cho câu lệnh sẽ nhàn. Và điểm chung là cả 2 đều phải luyện tập nhiều mới nhớ. Và với lập trình thì phải thực sự đam mê lớn mới theo được.

Anh Hưng đưa ra 1 giải pháp cần cân nhắc vì có 2 loại pain: pain Kỷ luật và pain Năng lực. Khi trẻ thì ta chịu pain Kỷ luật kém do ta có thể làm đc nhiều thứ, nhưng đến khi già thì pain Năng lực lại là thứ làm ta đau nhất. Phải sắp xếp thời gian hợp lý để có thể nhận ra mình cần cái gì và theo cái gì.

Và nhân dịp này thì các anh chị cũng đưa ra các vị trí trong IT cần có như dev, PM, BrSE, Data Analyst, quản trị mạng,... và comtor IT - vị trí phải tiếp xúc IT ít nhất cho bạn nữ tham khảo

Sau đó là chi sẻ qua về mức lương cũng như career path của lập trình viên

Đó là toàn bộ chương trình Developers Circles Hanoi ngày hôm nay