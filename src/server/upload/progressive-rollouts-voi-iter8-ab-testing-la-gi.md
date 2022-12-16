Đôi khi đưa ra một quyết định có thể quyết định việc thành bại của một giải pháp và chẳng ai muốn mình phải chịu trách nhiệm về một quyết định mang đến kết quả xấu, được đưa ra theo bản năng cả. Tất nhiên đó là một điều tốt và may mắn thay, có rất nhiều cách để lấy thông tin mà không cần phải dựa trên bản năng của một người. Một trong những phương pháp phổ biến nhất, và cũng thường được sử dụng để đánh gía các mô hình mà tính hiệu quả được ảnh hưởng từ nhiều yếu tố, là thử nghiệm A/B hay `A/B Testing`. Trong bài viết này, ta sẽ làm quen lại với khái niệm `A/B Testing` trước khi tìm hiểu về cách sử dụng thư viện `Iter8` để triển khai các mô hình lên `Seldon` với chiến lược `Progressive Rollout` ở bài sau (nếu được viết :v )

![IMG_0055.jpg](https://images.viblo.asia/ed2be1d4-ec32-4c28-9466-ab3cb94f8066.jpg)

# Vậy  `A/B Testing` là gì
Thử nghiệm A/B hay `A/B Testing`, ở mức cơ bản nhất, là một cách so sánh hai phiên bản của một thứ gì đó để tìm ra phiên bản nào hoạt động tốt hơn. Mặc dù nó thường được sử dụng trong quá trình phát triển các trang web và ứng dụng, phương pháp này đã gần 100 năm tuổi khi vào những năm 1920, nhà thống kê và nhà sinh vật học Ronald Fisher đã khám phá ra các nguyên tắc quan trọng nhất đằng sau thử nghiệm A/B và các thử nghiệm ngẫu nhiên có kiểm soát nói chung khi ông tự đặt câu hỏi rằng *Điều gì xảy ra nếu tôi bón nhiều phân bón hơn cho vùng đất này?* và kiểm tra giả thiết đó thông qua việc thiết kế  các thí nghiệm để xác định tác động của các yếu tố bên ngoài khác nhau đối với sự phát triển của thực vật và mùa màng. 

Cho đến ngày này, ý tưởng về `A/B Testing` vẫn không thay đổi và về cơ bản chúng vẫn là những khái niêm giống nhau, [chỉ là giờ đây ta đang thực hiện đó trực tuyết, trên môi trường thời gian thực và ở quy mô khác về số lượng người tham gia và số lượng thử nghiệm](https://hbr.org/2017/06/a-refresher-on-ab-testing#:~:text=It%E2%80%99s%20the%20same%20core%20concepts%2C%20but%20now%20you%E2%80%99re%20doing%20it%20online%2C%20in%20a%20real%2Dtime%20environment%2C%20and%20on%20a%20different%20scale%20in%20terms%20of%20number%20of%20participants%20and%20number%20of%20experiments.), theo Kaiser Fung trong bài viết [A Refresher on A/B Testing trên Harvard Business Review](https://hbr.org/2017/06/a-refresher-on-ab-testing)

![image.png](https://static.wingify.com/gcp/uploads/2021/05/1.png)

> Hình minh họa được lấy từ bài viết [A/B Testing Guide](https://vwo.com/ab-testing/)


# `A/B Testing` hoạt động như thế nào?
Hãy tưởng tượng rằng trang web của bạn đang có một cái nút to đùng nằm chính giữa có màu xanh cổ vịt và cả team đang sắp đấm nhau đến nơi vì một nửa muốn đổi nó sang màu xám xanh còn một nửa lại muốn giữ nguyên (nói thật trước khi bị ăn chửi từ bạn thân thì tôi vẫn không phân biệt được 2 loại màu này :v ). Việc tranh cãi này vẫn không đi đến hồi kết sau một tỉ nỗ lực thống nhất và rồi ta sẽ cần đưa ra một phương pháp để định lượng được rằng cách nào sẽ đưa ra kết quả tốt hơn.

Tuy nhiên định lượng tính hiệu quả của một sự thay đổi thường sẽ cần đến một con số có thể cộng trừ nhân chia được và trong trường hợp này, một `metric` hữu ích để định lượng sẽ là **số người dùng ấn vào button đó**. Và để thực hiện quá trình kiểm tra, ta sẽ chia nhóm người dùng thành hai nhỏm nhỏ hơn và hiển thị từng phiên bản của cái button thần thánh cho họ và xác định phiên bản sẽ mang lại hiệu quả cao hơn mà ở đây là với màu nào thì sẽ khiến nhiều người dùng truy cập nhấn vào hơn.

![image.png](https://images.viblo.asia/f25bc915-3225-477f-842c-7c25864fbfc0.png)

> Hình ảnh từ bài viết [A/B testing](https://www.optimizely.com/optimization-glossary/ab-testing/)

Tuy nhiên cuộc sống thì không đơn giản như vậy khi ta có nhiều yếu tố ảnh hưởng đến việc ai đó có nhấp chuột hay không, ví dụ như có thể việc hiển thị màu ở một số màn hình bị sai màu khiến cho màu hiển thị không chính xác là màu mà chúng ta mong muốn hay chỉ đơn giản là sẽ có nhiều người mù màu như tôi =))). Đây là nơi ngẫu nhiên hóa có thể hữu ích và sẽ trở nên rất quan trọng khi mà bằng cách chọn ngẫu nhiên người dùng nào thuộc nhóm nào, ta giảm thiểu khả năng các yếu tố khác sẽ ảnh hưởng đến kết quả của quá trình kiểm tra. Và như với tất cả các [Randomized Controlled Experiments](https://hbr.org/2016/03/a-refresher-on-randomized-controlled-experiments), ta sẽ cần phải ước tính kích thước mẫu để đạt được ý nghĩa thống kê , điều này sẽ giúp ta đảm bảo rằng kết quả mà ta đang thấy [không chỉ do background noise](https://hbr.org/2017/06/a-refresher-on-ab-testing#:~:text=isn%E2%80%99t%20just%20because%20of%20background%20noise%2C).

# Kết quả của `A/B Testing` nên được đọc như thế nào?

Thông thường, sau khi thực hiện`A/B Testing`, ta thường sẽ thu được kết quả bao gồm một số các giá trị của `metric` được đo lường với `Control` (khái niệm để chỉ phiên bản cũ - ở đây là việc giữ nguyên màu cũ cho button) và và `Variation` (khái niệm để chỉ phiên bản mới - ở đây là việc đổi màu của button sang màu khác) chẳng hạn như `Control: 15% (+/- 2.1%) Variation 18% (+/- 2.3%).` điều ngày có nghĩa là `18%` số lượng user đã nhấn vào phiên bản `Variation` của button với biên sai số là `2.3%` trong khi con số với `Control` là `18%` với biên là `2.1%` lúc này ta sẽ có khái niệm `conversion rate` (tỉ lệ chuyển đối) nhận giá trị trong khoảng từ `15,7% ` đến `20,3%` nhưng cũng chưa có thể tin tưởng cho lắm khi mà [thức tế rằng nếu bạn chạy thử nghiệm A/B nhiều lần, thì 95% phạm vi giá trị sẽ nắm bắt được `conversion rate` thực trong khi 5% trường hợp kết quả `conversion rate` mà ta thu được sẽ là kết quả sai](https://hbr.org/2017/06/a-refresher-on-ab-testing) và chỉ khi tổng hợp từ nhiều lần thực hiện  thì ý nghĩa thống kê của thử nghiệm mới được thiết lập.

Thôi thì sau khi có kết quả mà cụ thể theo ví dụ trên là tăng hẳn `3%` từ `15%` (tức là hiệu suất `120%`) thì rõ ràng ta đã có thể có thêm luận cứ đáng tin cậy để khẳng định là việc thay đổi sẽ mang lại kết quả tốt hơn. Tất nhiên là nói đi cũng phải nói lại vì việc tăng được `3%` tỉ lệ click đôi khi không tương xứng với công sức cũng như các rủi ro về các vấn đề có thể phát sinh từ quá trình thay đổi, tuy nhiên việc có thêm một số các thông tin dưới dạng số liệu cũng giảm bớt được tính chủ quan khi đưa ra bất kì quyết định thay đổi nào.

![image.png](https://images.viblo.asia/86e339a5-2d88-4244-a23d-cd46d2bb6ae9.png)

# Khi sử dụng `A/B Testing` nên tránh những gì?

Với một tỷ bài blog có thể tìm được trên Internet, ta có thể tổng hợp nội dung chúng thành một số điều cần nên tránh như sau:

- Do nhiều dịch vụ cung cấp các chức năng có tên kiểu như `real-time optimization` nên đôi khi người dùng sẽ quyết định quá nhanh và những giá trị `conversion rate` chưa chính xác sẽ dẫn đến các quyết định chưa chính xác
- Một vấn đề nữa là khi sử dụng quá ít hoặc quá nhiều các `metric` để đánh giá thì sẽ gặp phải một số trường hợp tồi tệ tương ứng. Trong khi sử dụng quá ít `metric` khiến cho góc nhìn được cung cấp bởi kết quả trở bên phiến diện thì sử dụng quá nhiều sẽ dẫn đến việc ta sẽ mắc phải cái được gọi là tương quan giả tạo (`Spurious Correlations`) và chúng đều mang lại những kết quả không tốt

Bên cạnh đó còn khá nhiều sai lầm khác mà tôi chưa từng gặp hoặc chưa đọc đến nên khi đó việc search Google với từ khóa `A/B testing mistakes` sẽ cung cấp cho bạn đầy đủ hơn nội dung bài viết này của tôi =))

# Tổng kết
Rõ ràng là `A/B Testing` không hề là giải pháp hữu ích cho mọi trường hợp khi có nhiều loại thí nghiệm phức tạp hơn, hiệu quả hơn và sẽ cung cấp cho ta dữ liệu đáng tin cậy hơn. Tuy vậy nó vẫn là một phương pháp tuyệt vời để hiểu nhanh về câu hỏi và ta đang có. Bài viết này giới thiệu về `A/B Testing` và sẽ trong bài viết sau ta sẽ cùng nhau tìm hiểu về cách sử dụng thư viện `Iter8` để triển khai các mô hình lên `Seldon` với chiến lược `Progressive Rollout`. Nội dung bài viết đến đây là hết, cảm ơn các bạn đã dành thời gian đọc.

# Tài liệu tham khảo
- https://en.wikipedia.org/wiki/A/B_testing
- https://hbr.org/2017/06/a-refresher-on-ab-testing
- https://www.investopedia.com/terms/s/spurious_correlation.asp
- https://www.optimizely.com/optimization-glossary/conversion-rate/