Hệ thống của các bạn bình thường xử lý được 10 request/s. Nếu bây giờ số lượng request đó tăng lên thành 100, 1000 request/s thì bạn có dám khẳng định hệ thống của bạn sẽ chạy ngon không?

Để có thể phán đoán được nó chạy ngon hay không thì việc **test tải hệ thống trở nên vô cùng quan trọng**.

Nói là test tải hệ thống, nhưng nếu mà yêu cầu bạn lên plan để test chắc hẳn các bạn cũng chẳng biết nên bắt đầu từ đâu, làm thế nào để đánh giá quá trình test của mình là thành công. Hay đơn giản chỉ cần chạy mấy tool benchmark là xong?

Vậy hãy cùng đọc bài này để giải đáp được thắc mắc đó nhé.

**Mục tiêu bài viết:**

* Hiểu được việc test tải hệ thống là làm những gì.
* Biết cách làm thế nào để cải thiện hệ thống.


Bài này hơi dài 1 tí, các bạn cố gắng đọc hết nhé. Sau khi đọc xong sẽ hoàn toàn tự tin để có thể lên được plan test tải hệ thống.

## Mục đích của việc test tải hệ thống
Dưới đây là 3 mục đích chính của việc test tải hệ thống:

* **Tìm điểm bottleneck (nút cổ chai):** Đưa ra 1 số Use Case có thể xảy ra trong tương lai (ví dụ như sắp tới đưa ra campaign hot, số lượng người đăng kí lúc đó sẽ tăng đột biến …). Sau đó ứng với mỗi Use Case sẽ đo xem thời gian response của hệ thống là bao nhiêu. Tìm điểm bottleneck (nút cổ chai).
* **Cải thiện hệ thống:** Sau khi biết được điểm bottleneck sẽ tiến hành đi cải thiện hệ thống.
* **Xác nhận tính scale của hệ thống**.

Cụ thể cùng đi xem những Use Case nào hay gặp trong thực tế nhé.

### Đưa ra Use Case và đo response của hệ thống
Dưới đây là 1 vài Use Case mình thấy hay gặp nhất trong quá trình vận hành hệ thống.

Đối với mỗi Use Case, chúng ta sẽ đi đo đạc xem thời gian response của hệ thống là bao nhiêu và tiến hành cải thiện hệ thống nếu có.

**Use Case 1: **Sau khi hệ thống được đưa ra, số lượng người dùng đăng kí vào hệ thống tăng đột biến.

Với những hệ thống mà nhiều người quan tâm thì khi release sẽ có rất nhiều người vào đăng kí hệ thống.

Ví dụ như tuần sau sẽ release hệ thống “dự đoán giá đề chuẩn 80%” chẳng hạn. Nếu có hệ thống đó ra đời, mình khẳng định sẽ có rất nhiều người vào đăng kí vào thời điểm đó.

Vậy để đảm bảo hệ thống của bạn chạy không vấn đề gì với số lượng lớn người đăng kí vào thời điểm đó thì việc test tải hệ thống trước khi release là điều vô cùng quan trọng.

**Use Case 2:** Sau khi hệ thống chạy được 1 thời gian thì dữ liệu càng ngày càng nhiều.

Khác với Use Case 1 thì Use Case này chủ yếu tập trung vào vấn đề dữ liệu trong DB càng ngày càng to ra, dẫn đến tốc độ query trong DB cũng càng ngày càng chậm xuống. Kể cả có đánh index chuẩn đi chăng nữa, nhưng nếu dữ liệu trong DB mà tăng lên thì dẫn đến việc index không thể lưu hết trên Memory được. Kết quả hiệu năng của câu query sẽ giảm xuống.

Với Use Case này thì việc test tải hệ thống cũng khá quan trọng để đảm bảo thời gian response hệ thống là nhanh nhất có thể.

**Use Case 3:** Nhờ vào việc đưa ra campaign mà số lượng người dùng access vào hệ thống tăng đột biến.

Với Use Case này mình thấy hay gặp nhất và việc đưa ra plan để test tải trước khi release là điều không thể thiếu.

Ví dụ như nhà mạng Viettel chuẩn bị có đợt khuyến mãi nạp thẻ 100k sẽ được tặng 500k. Các bạn nghĩ sao về campaign này. Chắc hẳn số lượng người nạp thẻ lúc đó phải kinh khủng lắm.

### Cải thiện hệ thống
Bình thường chúng ta hay làm việc với dữ liệu nhỏ thì mình khẳng định ít ai để ý đến vấn đề hiệu năng hay 1 số lỗi xảy ra như out of memory … Nhưng 1 khi chạy hệ thống đó với dữ liệu lớn thì chắc chắn sẽ ra nhiều vấn đề.

Như ngày trước mình có làm 1 chức năng upload file csv về thông tin người dùng và gửi tin nhắn đến tất cả người đó. Bình thường mình chỉ test file csv tầm 100 record, cùng lắm 1000 record thấy chạy khá ok.

Nhưng khi đưa cho khách hàng dùng, bên họ upload file csv toàn tầm 1 triệu, 10 triêu record. Lúc đó hệ thống lăn quay ra chết. Vì mình toàn load tất cả dữ liệu trong file csv vào 1 biến duy nhất. Kết quả tràn bộ nhớ.

Do đó ở đây mình muốn nói rằng để đảm bảo hệ thống chạy có ngon hay không, có đáp ứng được dữ liệu lớn hay không thì việc test hệ thống với dữ liệu lớn là điều cực kì quan trọng.

**Vừa test vừa đi cải thiện hệ thống là 1 trong những mục đích quan trọng nhất.**

### Xác nhận tính scale của hệ thống
Đặc thù của những hệ thống đang được xây dựng trên môi trường Cloud như AWS, GCP, Azure đó là nếu số lượng request tăng lên thì sẽ tăng thêm server, nếu số lượng request giảm xuống thì sẽ giảm server.

Để đáp ứng được nhu cầu này thì cần phải nắm rõ tính scale của hệ thống. Cụ thể phải nắm bắt được những điểm sau:

* Cấu trúc hệ thống có thể xử lý được 1 số lượng throughput nào đó (ví dụ như 100 request/s, 1000request/s, 2000 request/s, 5000 request/s)
* Hệ thống xử lý tối đa throughput là bao nhiêu?

Cái ý thứ nhất là điểm quan trọng nhất cần phải nắm bắt được.

Ví dụ như throughput tăng lên 2 lần thì chỉ cần tăng số lượng web server lên 2 lần là được ak? Hay phải tăng số lượng DB lên 2 lần? Ngược lại khi số lượng request giảm đi 2 lần thì cần giảm cái nào đi thì được? Những điểm như này cần phải nắm bắt.

Cái ý thứ 2 thì không cần phải nắm bắt cũng được. Nhưng nếu tương lai muốn cung cấp hệ thống xử lý nhiều request hơn nữa thì việc phán đoán xem với cấu trúc hiện tại thì có scale được hay không? cần phải thiết kế lại hệ thống không? là điều không thể thiếu.

## 2 chỉ báo quan trọng khi đo hiệu năng
Mình chắc hẳn khi tối ưu hệ thống, ai cũng gặp những case kiểu như: ví dụ như nếu đưa cái plugin này vào thì wordpress sẽ chạy nhanh gấp 10 lần …

Tuy nhiên, cái việc “nhanh gấp 10 lần” ở đây tức là đang nói đến vấn đề gì? thì chúng ta cần nên để ý tới.

Có thể đang nói về tốc độ của hệ thống?

Thế nhưng để đánh giá về tốc độ thì hiện nay có 2 chỉ bảo chắc hẳn mọi người cũng thường hay nghe thấy đó là **throughput (lưu lượng)**  và **latency (thời gian trễ).**

Cùng nhau tìm hiểu xem 2 chỉ báo này khác nhau thế nào nhé.

![](https://images.viblo.asia/e536d19d-9234-4c52-bac9-9e95cd1ee80b.jpg)

### Throughput
Chỉ báo Throughput muốn nói đến lượng công việc xử lý trong 1 đơn vị thời gian. Về Website thì muốn nói đến số lượng request xử lý trong 1 giây. Nó còn được gọi là **rps (Request per second).**

Quay lại ví dụ trên, 「sau khi đưa plugin này vào hệ thống thì tốc độ wordpress sẽ tăng lên gấp 10 lần」nếu đang nói về throughput thì tức là số lượng page hiển thị trong 1 giây tăng lên 10 lần.

### Latency
Chỉ báo Latency là tổng thời gian xử lý của 1 việc nào đó.

Quay lại ví dụ trên, 「sau khi đưa plugin này vào hệ thống thì tốc độ wordpress sẽ tăng lên gấp 10 lần」nếu đang nói về latency thì tức là thời gian response của hệ thống đang từ 1s bây giờ giảm xuống còn 0.1 giây.

### Throughput và Latency trong hệ thống
Đa số các hệ thống ngày nay sẽ không chỉ gồm 1 web server mà còn bao gồm rất nhiều thành phần khác nữa như database server, cache server …

Hiệu năng của từng con server đó cũng có thể gây ảnh hưởng đến hiệu năng của toàn bộ hệ thống. Ví dụ như tốc độ query của DB chậm thì cho dù con web có xử lý nhanh đi chăng nữa thì thời gian xử lý của toàn bộ hệ thống vẫn chậm. Vì con DB nó gây ảnh hưởng đến con Web.

* Throughput của toàn bộ hệ thống là giá trị throughput nhỏ nhất của từng hệ thống con.
* Latency của toàn bộ hệ thống là giá trị tổng cộng của lantecy của từng hệ thống con.

Đến đây có vẻ hơi trừu tượng đúng không. Vậy mình lấy 1 ví dụ để các bạn dễ hình dung nhé.

Thay vì lấy ví dụ hệ thống gồm web server, database server … thì mình lấy ví dụ về đường cao tốc.

Mình thấy khá dễ hiểu khi áp dụng vào throughput và latency.

![](https://images.viblo.asia/47de410c-6396-4e28-82cc-0a9759bb3ac3.jpg)

Nhìn vào hình ảnh bên trên ta có thể thấy được:

* throughput của đoạn đường trên là 500 xe / 1 tiếng
* latency của đoạn đường trên là 15 tiếng (15 = 3 + 4 + 8)

## Cải thiện hệ thống
Để cải thiện hệ thống thì chúng ta cần phải tăng số lượng throughput và giảm latency.

Cùng đọc phần tiếp theo để hiểu xem cụ thể là làm thế nào nhé.

### Cải thiện throughput
Vậy làm thế nào có thể cải thiện được throughput của hệ thống.

Như ví dụ về đoạn đường ở bên trên ta thấy, nếu ta cải thiện sai chỗ thì hiệu năng của hệ thống cũng không thể tăng được.

Ví dụ như trong đoạn đường từ Hà Nội đến Thanh Hoá, cho dù có thêm mấy làn đường để tăng số lưu lượng xe từ 1000 đến 5000 xe đi chăng nữa thì tổng throughput của hệ thống cũng không thể tăng được, vẫn chỉ là 500 xe thôi. Lí do tại sao?

Bởi vì throughput của đoạn từ Vinh đến Đà Nẵng đang gây cản trở đến toàn bộ hệ thống, bởi vì 5000 xe mà đi vào đoạn đường chỉ max 500 xe thì đương nhiên vẫn bị tắc rồi. Có cố cũng không thể đi được.

Nên nếu cải thiện thì nên cải thiện đoạn đường này là tốt nhất.

Và cái đoạn từ Vinh đến Đà Nẵng này người ta gọi là **bottleneck (nút cổ chai).**

Nhờ vào việc xác định được bottleneck mà có thể khiến ta dễ dàng cải thiện throughout của toàn bộ hệ thống.

**Ví dụ về cải thiện throughput**
Quay lại ví dụ về đoạn đường ở bên trên. Giả sử như đoạn đường từ Vinh đến Đà Nẵng đang thi công và xảy ra tắc đường. Hiện tại số lượng xe lưu thông trên 1 giờ chỉ còn có 100 xe.

![](https://images.viblo.asia/d86815c7-0090-4724-8511-152cf615827f.jpg)

Khi này throughput của toàn bộ hệ thống giảm xuống còn 100 xe / 1 giờ.

Nếu như chúng ta giải quyết được vấn đề tắc đường này thì chắc chắn throughput của hệ thống sẽ tăng lên. Giả sử như sau khi giải quyết xong tắc đường đoạn từ Vinh đến Đà Nẵng thì bây giờ lưu lượng xe đã tăng lên thành 2000 xe / 1 giờ.

![](https://images.viblo.asia/6056437f-93b3-4ad0-8ebd-c7a3736639a6.jpg)

Lúc này throughput của hệ thống đã chuyển sang đoạn từ Thanh Hoá đến Vinh và là 800 xe / 1 giờ (trước khi cải thiện là 100 xe / 1 giờ).

Nếu như chúng ta tăng thêm làn đường mới ở đoạn này thì chắc chắn throughput của toàn bộ hệ thống sẽ tăng lên.

Nhưng chẳng may chúng ta lại đi thêm làn đường ở đoạn mà không phải bottleneck thì sẽ như thế nào?

Chẳng hạn như chúng ta thêm làn đường ở đoạn Thanh Hoá – Vinh để số lương xe lưu thông tăng lên thành 1200 xe / 1 giờ.

![](https://images.viblo.asia/1884e4f4-4717-4ba5-93df-84199108761a.jpg)

Vậy throughput của toàn bộ hệ thống theo các bạn có tăng lên không? Câu trả lời là không nhé.

Vì đoạn ở Vinh – Đà Nẵng vẫn còn đang tắc mà. Số lượng xem lưu thông ở đoạn này có 100 xe. Nên cho dù ở Thanh Hoá – Vinh mà nhiều xe lưu thông đi chăng nữa thì đến đoạn Vinh – Đà Nẵng thì vẫn phải chịu cảnh tắc đường thôi. Nên đoạn này mà không cải thiện thì throughput của hệ thống sẽ không thể tăng được.

Ở ví dụ trên là mình đang nói về vấn đề lưu thông xe trên đường. Nhưng với hệ thống website hiện nay thì hoàn toàn có thể áp dụng được.

**Chính vì vậy, để có thể cải thiện được throughput của hệ thống thì điều đầu tiên mình nên làm là tìm ra chính xác đâu là điểm bottleneck.**

### Cải thiện Latency
Latency là tổng thời gian xử lý của từng bộ phận trong hệ thống, bao gồm cả thời gian đợi.

Để cải thiện được Latency thì chúng ta sẽ đi xem xét xem bộ phận nào xử lý đang chiếm nhiều thời gian nhất thì sẽ đi cải thiện bộ phận đó trước. Sau đó sẽ đi cải thiện các bộ phận tiếp theo.

Nhưng nếu mà thời gian xử lý của từng bộ phận đã nằm trong khoảng thích hợp rồi thì cho dù muốn cải thiện thêm nữa thì cũng không thể được. Tức là nó đã đạt đến ngưỡng rồi ấy.

Ví dụ như với web application, những bộ phận nào đang xử lý chiếm thời gian nhất thì tìm hiểu xem xem thuật toán của nó đã tối ưu chưa, có dùng lãng phí memory không, nếu là DB thì kiểm tra xem đã gắn index chưa …

Để đo xem thời gian chạy của từng chức năng là bao nhiêu, có bao nhiêu lời gọi hàm thì có 1 tool sẽ giúp các bạn làm được điều đó là **Profiler**.

Ví dụ các bạn đang dùng php thì search google là: Profiling Tools For PHP

Nếu là java thì các bạn cũng search tương tự.

**Ví dụ về cải thiện Latency**
Quay lại ví dụ ở bên trên, đoạn đường Vinh – Đà Nẵng đang tắc đường. Nên lúc này latency của toàn bộ hệ thống là 18 giờ.

Sau khi giải quyết được vấn đề tắc đường thì latency đã được cải thiện thành 13 giờ.

Thế nhưng nếu chúng ta đi cải thiện nhầm ở đoạn đường mà không xảy ra bottleneck thì mặc dù throughput không được cải thiện nhưng mà latency ít nhiều cũng được cải thiện, vì nó chỉ còn 16 giờ.

Từ đó chúng ta có thể thấy được, so với việc cải thiện throughput thì cải thiện latency sẽ hơi khác 1 chút. Đó là chúng ta chỉ cần cải thiện latency của 1 bộ phận nào đó trong hệ thống cũng kéo theo latency của toàn bộ hệ thống giảm xuống.

## Tổng kết
Đọc qua bài này các bạn thấy thế nào ak? Đã nắm rõ được test tải hệ thống là sẽ làm thế nào chưa? Hơi lắm chữ 1 chút nhưng nó khá cần thiết đấy.

Mình hi vọng qua bài này sẽ giúp các bạn có chút hình dung xem việc test tải hệ thống sẽ làm những gì, và để cải thiện hệ thống thì chúng ta nên làm gì.

Bài này mình sẽ chỉ tập trung vào phần lý thuyết thôi nên đọc sẽ hơi mệt nhưng cũng khá dễ hiểu. Có thể bài tới mình sẽ viết 1 bài dạy các bạn cách test tải sẽ như thế nào, dùng tool nào hợp lí, cách tìm bottleneck ra sao.

Viết 1 bài mất nhiều năng lượng quá, cũng giống như các bạn làm việc trên giường ấy. Mà thôi nói đến đây các bạn tự hiểu. 😀

Nguồn: [https://nghethuatcoding.com/2019/05/18/test-tai-he-thong-thuc-su-can-thiet/](https://nghethuatcoding.com/2019/05/18/test-tai-he-thong-thuc-su-can-thiet/)

==============

Để nhận thông báo khi có bài viết mới nhất thì các bạn có thể like fanpage của mình ở bên dưới nhé:

👉👉👉 [Nghệ thuật Coding Fanpage Facebook](https://www.facebook.com/669339543503374)

Chúc các bạn 1 tuần thật vui vẻ.