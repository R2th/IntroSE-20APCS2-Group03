## Monitoring with Prometheus Series
Chào các bạn tới với Monitoring with Prometheus Series. Trong series này chúng ta sẽ tìm hiểu về cách giám sát hệ thống sử dụng công cụ Prometheus, chắc đa số mọi người đều tìm hiểu Prometheus bằng cách cài đặt nó lên trên Kubernetes, ở trong series này thì chúng ta sẽ không làm vậy. Mình sẽ hướng dẫn các bạn cách sử dụng Prometheus từ đầu tới cuối, từ cách cài Prometheus bằng Linux package, cách cài đặt các công cụ để cung cấp metrics cho Prometheus lên trên các con máy ảo, container, tới cách thiết kế hệ thống Alertmanager và cấu hình mở rộng Prometheus, và rất nhiều chủ đều khác 😁.

![](https://images.viblo.asia/fee657b7-ef13-4850-8fe8-ca3618408aca.png)

Series này mình tham khảo từ cuốn sách *Monitoring with Prometheus*.

![image.png](https://images.viblo.asia/7e6bdb11-6a41-4203-9316-7a5e54ca3369.png)

*<div align="center">[Monitoring with Prometheus](https://www.amazon.com/Monitoring-Prometheus-James-Turnbull-ebook/dp/B07DPH8MN9)</div>*

Bài đầu tiên ta sẽ tìm hiểu khái niệm **Monitoring** là gì?

## What is Monitoring?
Trong khía cạnh về kỹ thuật, monitoring là cách ta sử dụng các công cụ để giám sát hệ thống và ứng dụng của ta. Monitoring sẽ cung cấp cho ta các giá trị về hiệu suất, trình trạng của hệ thống và ứng dụng, để ta có thể nhanh chóng phát hiện các vấn đề xảy ra với hệ thống.

Nhưng monitoring không dừng lại ở việc chỉ giám sát các giá trị về hệ thống như CPU hoặc memory, mà còn bao gồm các giá trị có thể giúp ích về mặt kinh doanh như số lượng khách hàng truy cập trang web, thời gian khách hàng ở lại trang web, số lượng khách hàng bấm vào một sản phẩm nào đó, ...

Nên đối với monitoring ta sẽ có hai đối tượng là:
+ Hệ thống (the system).
+ Kinh doanh (the business).

## System Monitoring
Đối với một hệ thống thì ta cần monitoring các thành phần sau:
+ Infrastructure monitoring: đầu tiên trong một hệ thống thì ta cần phải monitoring hạ tầng vì đây là nơi các ứng dụng được triển khai, các giá trị của hạ tầng ta cần quan tâm là CPU và memory còn lại của hạ tầng là bao nhiêu, ổ đĩa lưu trữ còn lại là bao nhiêu, các quá trình (process) đang chạy trên hạ tầng còn sống hay đã chết, ...
+ Application monitoring: tiếp theo là ta cần phải monitoring các thông số của ứng dụng, đối với một ứng dụng thì ta sẽ quan tâm các giá trị như là thời gian phản hồi của ứng dụng, tình trạng của ứng dụng (chạy hay chết), CPU và memory ứng dụng, số lượng yêu cầu (request) vào ứng dụng trong 1 giây, ...
+ Network monitoring: cuối cùng là ở tầng mạng thì ta cần quan tâm các giá trị như số lượng *byte* ra và vào, tình trạng của firewall, ...

## Business
Như ta đã nói ở trên các giá trị liên quan tới kinh doanh thông thường là các giá trị về tương tác của người dùng. Việc phân tích được tương tác của người dùng sẽ đem lại giá trị rất lớn trong hoạt động kinh doanh của công ty của ta.

Để monitoring được tương tác của người dùng thì ta cần phải thực hiện ở tầng code front-end hoặc backend, ví dụ ở tầng front-end để theo dõi được hành vi của người dùng ta sẽ dùng *Google Analytics*.

Trong series này ta sẽ nói về việc monitoring ở tầng hệ thống.

## Monitoring Mechanism
Đối với monitoring thì ta sẽ có hai cách tiếp cận là: probing và introspection.

Probing monitoring là cách ta giám sát hệ thống từ bên ngoài, ta sẽ thực hiện một yêu cầu tới hệ thống và thu thập các giá trị mà nó trả về, như là hệ thống có trả lời yêu cầu hay không, hệ thống có mở *port* ta cần không, hệ thống có trả về mã phản hồi (HTTP code) đúng hay không. Ví dụ là ta thực hiện gọi tới một API và kiểm tra HTTP code nó trả về có phải là 200 hay không?

Introspection monitoring là cách ta giám sát hệ thống từ bên trong, ta sẽ dùng các công cụ để thu thập các giá trị về hiệu suất và tình trạng của hệ thống. Các bài tiếp theo ta sẽ tìm hiểu về introspection monitoring trước rồi sau đó sẽ tới probing monitoring.

## How to monitoring tool collects data
Thông thường các công cụ monitoring sử dụng hai cách sau để thu thập dữ liệu từ các đối tượng nó cần monitoring: pull-based và push-based.

Pull-based: ở cách này các hệ thống mà ta cần monitoring phải cung cấp một đường dẫn mà khi ta gọi vào đường dẫn đó nó sẽ trả cho ta các giá trị thể hiện tình trạng của nó. Sau đó các công cụ monitoring sẽ gọi vào đường dẫn này để thu thập dữ liệu. Ví dụ ứng dụng của ta cung cấp một dường dẫn là `/metrics`  để các công cụ monitoring gọi vào là lấy dữ liệu.

Push-based: ở cách này thì ngược lại, công cụ monitoring của ta sẽ cung cấp một đường dẫn và các ứng dụng của ta sẽ đẩy các giá trị của nó tới đường dẫn này.

**Trong series này ta sẽ tìm hiểu về Prometheus, nó có hỗ trợ cả hai cách pull-based và push-based.**

## Prometheus
Prometheus là một công cụ chuyên dùng trong việc giám sát hệ thống, ở thời điểm mình viết bài này thì nó là công cụ phổ biến nhất. Prometheus sẽ thu thập và lưu trữ các thông số của hệ thống dưới database của nó, các giá trị nó thu thập được sẽ được lưu trữ dưới Prometheus ở dạng time series. Bạn có thể xem Prometheus như là một time series database.

Các tính năng chính của Prometheus:
+ Lưu trữ dữ liệu ở dạng time series.
+ Có thể truy vấn dữ liệu dùng PromQL.
+ Hỗ trợ cả hai cách pull-based và push-based.
+ Có thể tự động tìm kiếm các đối tượng nó cần giám sát bằng *service discovery*.
+ Kết hợp được với các công cụ khác để biểu diễn dữ liệu lên biểu đồ, ví dụ kết hợp với Grafana.

 Ở bài tiếp theo chúng ta sẽ tìm hiểu về cách cài đặt Prometheus. Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để nhận thông báo về bài viết sớm nhất nhé 😁.

## Kết luận
Thì đây là các khái niệm quan trọng về monitoring mà mình biết, các bạn có góp ý gì thêm thì ghi ở phần bình luận giúp mình nha, hẹn gặp mọi người ở bài tiếp theo của series 😁.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).