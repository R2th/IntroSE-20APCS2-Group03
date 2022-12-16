Xin chào các bạn. Lại là mình đây. Sau một thời gian dài chỉ viết về lý thuyết, khi mà 2022 đã đến, giao thừa đã điểm, sẽ có những điều cần đổi mới. Và mình nhận ra là mình đang có ít bài viết về thực tiễn quá. Và rồi điều gì đến cũng phải đến, dù lớn lao hay là nhỏ bé, bài viết này sẽ vượt ra khỏi cái rào cản lý thuyết khô khan mà đi vào thực tiễn.

## Mở đầu:
Giới thiệu một chút để dễ đi vào nội dung. Mình vẫn đang là Backend Developer. Công nghệ chính của mình vẫn là NodeJS. Và cái dự án mà mình đang được tham gia, dự án lớn nhất là về e-commerce (thương mại điện tử - TMĐT). Nghe thì chẳng có gì mới lạ, chỉ cần lướt facebook là sẽ thấy nhà nhà, người người khởi nghiệp bằng 1 app, website TMĐT, bởi rõ ràng, bức trang toàn cục mà nó vẽ ra là đầy hoa hồng. Nhưng người ta nhắc đến hoa hồng, chứ hoa hồng đó có bao nhiêu gai thì người ta không nói. Và developer E-commerce cũng không ngoại lệ

![Ảnh minh hoạ về APP TMĐT](https://images.viblo.asia/fb5c3914-2971-4371-834b-098058e945bf.png)

Mình bắt đầu làm ứng dụng này khi mới chập chừng bắt tay vào làm việc với NodeJS vào tháng 02/2021. Tức là còn rất non kinh nghiệm. Và chắc chắn rằng, bất kể ai là lập trình viên cũng đã từng tự hỏi bản thân: "Mình code cái củ chuối gì thế này?" sau một thời gian nhìn lại code của những năm tháng chập chững ấy. Nào bắt đầu thôi

## Bài toán:
Xây dựng 1 ứng dụng TMĐT, thông thường người ta chú trọng những điều sau:
- Có đầy đủ chức năng quản lý sản phẩm
- Cho phép mua bán, thanh toán trên ứng dụng
- Các chức năng thống kê, theo dõi biến động (tracking) cụ thể
- Các chức năng quảng cáo
- UI / UX bắt mắt, dễ sử dụng
- **Hiệu suất (Performance) tốt, đảm bảo phục vụ tốt cho hàng trăm nghìn, hay hàng triệu người dùng**

![Ảnh minh hoạ về APP TMĐT](https://images.viblo.asia/48543df6-5c33-49d0-a9a8-22ba816158f2.png)

Sẽ chẳng phải ngẫu nhiên mà mình "in đậm" dòng trên. Bởi, đó là vấn đề nhức nhối nhất của một ứng dụng TMĐT. Vậy thế nào là "tốt"? Tốt ở đây hiểu đơn giản, là ứng dụng của bạn có thể đáp ứng được 1 lượng lớn request/s khi có hàng trăm, hàng nghìn, hàng triệu người dùng APP cùng 1 lúc mà không gây ra các vấn đề về "crash", "timeout" hay phổ biến nhất là app của chúng ta xoay đều, xoay đều đợi phản hồi từ server

Như vậy, bài toán đặt ra, là chúng ta phải tổ chức code, logic như thế nào để ứng dụng của chúng ta đạt hiệu suất tốt nhất có thể.

## Đặt vấn đề:
Với ứng dụng mà mình làm lúc đó, sau khi hoàn thiện các tính năng chính. Team quyết định chạy thử ứng dụng với lượng lớn người dùng. Mọi chuyện êm ả cho đến 15 phút sau đó. Tôi nhận được phản hồi:
> Ứng dụng liên tục **crash**, **timeout** khi thanh toán và đặt hàng. **App xoay, xoay nữa, xoay mãi**...

![App performance](https://images.viblo.asia/7ee2330f-6c74-40a2-9bf5-1bf9f0bc69ee.png)

Và không cần nói cũng biết, lúc ấy tâm trạng thế nào. Phải thú thực là lúc code dự án này, tôi và đồng nghiệp không nghĩ quá nhiều về performance, mặc dù trong đầu vẫn luôn nghĩ cố gắng làm sao code tốt nhất. Nhưng do thiếu kinh nghiệm, chúng tôi cũng chẳng nghĩ, Backend chưa đủ tốt để phục vụ lượng lớn user. Mà như đã nói, quy mô của 1 ứng dụng TMĐT là lên đến hàng trăm nghìn người một lúc

Ngay sau hôm đó, chúng tôi bắt đầu họp, lập kế hoạch (plan) để xem xét vấn đề ở đầu và tìm hướng khắc phục

## Xem xét tình hình
Trước khi bắt tay vào giải quyết vấn đề, hãy xem qua dự án ở thời điểm đó có những gì?
- Ngôn ngữ: JavaScript (run on Node.JS)
- Framework: Express.js
- Database: MongoDB
- CPUs: 16 core, 32GB RAM
- Building & Deploying: Docker, Docker Compose

Rõ ràng, cấu hình server là ổn. Lướt qua 1 vòng, chúng tôi liệt kê được những thứ cần làm:
- **Kiểm tra lại kỹ thuật coding**: Rõ ràng với những người thiếu kinh nghiệm, code như thế nào để đạt được hiệu suất tốt cho ứng dụng là vấn đề mà nhiều người rất muốn thực hiện. Nhưng không phải ai cũng biết cách. Lúc đấy, mình được giao trách nhiệm kiểm tra phần này. Xem xét hết lại source code và optimize. Trước hết là phần thanh toán, đặt hàng, mã giảm giá, quản lý đơn hàng, sản phẩm,...
- **Kiểm tra lại database và query**: Với việc sử dụng MongoDB, 1 CSDL dạng NoSQL, rõ ràng lợi thế của nó là tốc độ. Nhưng nếu developer không biết cách, sẽ vô tình khiến nó chậm đi. Đặc biệt là cách viết query, tổ chức CSDL. Công việc này được giao cho mình và thêm 1 người đồng nghiệp. Bọn mình sẽ phải kiểm tra và tái cấu trúc, sửa đổi query cho hợp lý
- **Caching**: Vâng, một thứ quá quen thuộc. Đồng ý rằng dự án ban đầu chưa nên sử dụng đến cache, mà ta chỉ nên dùng nó khi các tính năng đã đạt được logic ổn định. Vì khi dùng cache, rất dễ xảy ra những vẫn đề về đồng bộ dữ liệu. Tuy nhiên, ở thời điểm mà team xem xét, đã đến lúc cần dùng đến Cache. Phương án được tính đến là **Redis**. Quá phổ biến đúng không nào?
- **Cron job & Queue**: Tương tự, đây cũng là 2 thứ rất quan trọng trong việc cải thiện performance hệ thống. Và dù dự án đã được setup ***node-cron*** và ***kue***, nhưng vẫn chưa ai sử dụng. Lại phí phạm lần nữa
- **Tăng khả năng xử lý của NodeJS nhờ cluster**: Như các bạn đã biết, NodeJS là Single Thread (Đơn luồng). Thế mạnh của Node.js là none-blocking I/O, điều này giúp cho ứng dụng mặc dù chỉ sử dụng 1 thread để chạy nhưng tốc độ là rất tốt nhờ tận dụng được thời gian nhàn rỗi của CPU. Và với ***cluster***, mọi thứ sẽ còn tuyệt vời hơn. Tuyệt vời hơn như thế nào thì hãy chờ đến bài viết về chủ đề này nhé
- **Sử dụng Micro service**: Đây là giải pháp mang tính lâu dài. Nhưng ở thời điểm đó, thời gian gấp gáp không cho phép chúng tôi áp dụng nó vào dự án. Bởi event tiếp theo đến quá gần.
![Performance Idea](https://images.viblo.asia/ae4b2525-4c77-4566-bfac-65aab9a1ef96.png)

## Tạm kết phần 1

Và như vậy là team đã cùng nhau tìm ra những vấn đề trước mắt, và bắt đầu bắt tay vào làm. Tuy nhiên, đây đều là những giải pháp mang tính ngắn hạn, do đó, trong suốt series này, mình sẽ không nhắc đến Micro Service, nên bạn nào kỳ vọng về nó thì đợi 1 thời gian sau khi mình hoàn thành series này nhé. Trước mắt, sẽ là về tư duy xử lý, tư duy code và tính ứng dụng của cluster, background job, queue và đặc biệt caching. Mình sẽ đi vào chi tiết từng vấn đề, từng giải pháp để các bạn dễ theo dõi nha. 

Còn bây giờ, hãy nghỉ ngơi đôi chút, chuẩn bị tinh thần nhận bao lì xì, tung tăng chơi Tết nhưng nhớ đảm bảo an toàn nhé. Sẽ có bài viết tiếp theo sớm thôi. **Đừng quên upvote, comment và follow mình cũng như series này, để nhận thông báo về bài viết mới nha, và để mình còn có động lực viết các bài tiếp theo cho hay hơn ^^**. Chúc mọi người 1 năm mới bình an, hạnh phúc, vạn sự như ý. Chúc cộng đồng Viblo sẽ ngày càng phát triển. Happy New Year 2022.

![Happy new year 2022](https://images.viblo.asia/6e7e5500-caa5-4f48-a2b7-e7c9bd096030.png)