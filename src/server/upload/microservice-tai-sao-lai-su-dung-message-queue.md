# Mở đầu
Kiến trúc `microservice` đang dần trở thành một xu hướng kiến trúc phần mềm được các developer ngày nay lựa chọn để xây dựng các ứng dụng của mình thay vì kiến trúc nguyên khối (`Monolithic`) truyền thống. Rất nhiều các nhà phát triển, công ty ở khắp mọi nơi như Amazon, Netflix, Spotify hay Uber... từ lâu đã chuyển đổi cách tiếp cận nguyên khối (monolithic) chậm chạp, phức tạp sang kiến trúc microservice để đơn giản hóa và mở rộng cấu trúc của họ.

Mình sẽ không lãng phí thêm thời gian của các bạn để tiếp tục nói về tại sao chúng ta nên sử dụng microservice, đã có rất nhiều sự ủng hộ dành cho microservice cũng như các thảo luận được chia sẻ, giới thiệu và nói về tính chất, lợi ích của microservice. 

Tuy nhiên, bên cạnh rất nhiều lợi ích thì microservice cũng có những nhược điểm của nó. Một trong những nhược điểm lớn nhất của microservice là sự phức tạp trong tương tác, giao tiếp giữa các service được xây dựng. Khi bạn muốn các service độc lập trong kiến trúc microservice của bạn xử lý tất cả các yêu cầu, ngay cả với khối lượng lớn và độ phức tạp cao, thì làm thế nào bạn có thể đảm bảo được điều này và làm thế nào bạn có thể cải thiện về hiệu suất hệ thống? 

Câu trả lời chính là: `Message queue` (hàng đợi tin nhắn)
# Message queue là gì?
Vậy Message queue là gì và nó hoạt động như thế nào?

Message queue là một kiến trúc cung cấp giao tiếp không đồng bộ.  Ý nghĩa của `queue` ở đây chính là 1 hàng đợi chứa `message` chờ để được xử lý tuần tự theo cơ chế vào trước thì ra trước (FIFO - First In First Out). Một `message` là các dữ liệu cần vận chuyển giữa người gửi và người nhận. Vậy có thể hiểu đơn giản, message queue giống như một hòm thư email của chúng ta. Email có lẽ là ví dụ tốt nhất về giao tiếp không đồng bộ. Khi một email được gửi đi, người gửi tiếp tục xử lý những thứ khác mà không cần phản hồi ngay lập tức từ người nhận. Cách xử lý tin nhắn này tách người gửi khỏi người nhận để họ không cần phải tương tác với hàng đợi tin nhắn cùng một lúc.

![](https://images.viblo.asia/f9b772af-aa0f-48ab-a62f-8ea7e43aa6fe.png)

Kiến trúc cơ bản của message queue rất đơn giản, bao gồm các thành phần như sau:
- Message: Thông tin được gửi (có thể là text, binary hoặc JSON)
- Producer: Service tạo ra thông tin, đưa thông tin vào message queue.
- Message Queue: Nơi chứa những message này, cho phép producer và consumer có thể trao đổi với nhau
- Consumer: Service nhận message từ message queue và xử lý
- Một service có thể vừa làm producer, vừa làm consumer 
![](https://images.viblo.asia/25560e0e-09b7-4eef-9064-3a6a7c92d9a7.jpg)

# Các loại message queue
Trong các hệ thống của chúng ta, nhiều khi ta cần tới hai hoặc nhiều các service độc lập cùng xử một yêu cầu, vậy phải làm thế nào nhỉ? Đừng lo, vì message queue có những cơ chế khác nhau giúp giải quyết vấn đề này.
### 1. Point-to-point

Message queue có thể là kiểu point-to-point, tức là khi đó ta chỉ có một hàng đợi và một consumer duy nhất dể xử lý các tin nhắn trong hàng đợi:
![](https://images.viblo.asia/36c32e39-92cf-45a7-b615-6ef4d4678e1a.gif)

### 2. Publisher-Subscriber

Ngoài ra, message queue có thể sử dụng định dạng Publisher-Subscriber, trong đó publisher (nhà sản xuất) gửi tin nhắn đến hàng đợi (trong trường hợp này được gọi là Topic) và tất cả subscriber (người đăng ký) vào cùng 1 Topic đều sẽ nhận được tin nhắn trong Topic đó:
![](https://images.viblo.asia/733bc325-2467-4fe5-bef1-797ceb502621.gif)
# Message queue trong kiến trúc microservice
Chà, message queue là một kiến trúc tuyệt vời cho giao tiếp không đồng bộ. Vậy trong hệ thống microservice, khi mà ta cần các microservice vừa độc lập lại vừa có thể tương tác với nhau mà không cần ghép nối thì message queue là một lựa chọn hàng đầu. Giao tiếp được thực hiện bằng cách gửi tin nhắn có chứa thông tin hoặc lệnh cần được xử lý. Người gửi là `Producer`. Những tin nhắn này sau đó được đưa vào trong một hàng đợi và được xử lý bởi một microservice khác ( `Consumer`). Sau đó, khi một tin nhắn được xử lý, nó sẽ bị xóa hoặc vô hiệu hóa, điều này đảm bảo rằng nó chỉ được xử lý một lần duy nhất.
![](https://images.viblo.asia/25ec394f-2fab-4d79-b701-2cebf7997f14.png)
### *Một ví dụ sử dụng đơn giản của message queue*
Hãy tưởng tượng rằng bạn có một dịch vụ web nhận được nhiều yêu cầu mỗi giây, tất cả các yêu cầu cần đảm bảo không bị mất và cần được xử lý bởi một hàm có thông lượng cao. Nói cách khác, dịch vụ web của bạn luôn phải ở trạng thái sẵn sàng cao và sẵn sàng nhận một yêu cầu mới thay vì bị khóa bởi quá trình xử lý các yêu cầu đã nhận trước đó.

Trong trường hợp này, đặt một message queuq giữa dịch vụ web và dịch vụ xử lý là lý tưởng. Dịch vụ web có thể đặt thông báo "bắt đầu xử lý" vào một hàng đợi và dịch vụ khác có thể nhận và xử lý thông báo theo thứ tự. Hai quá trình được tách rời khỏi nhau và không cần chờ đợi. Nếu bạn có nhiều yêu cầu đến trong một khoảng thời gian ngắn, hệ thống xử lý sẽ có thể xử lý tất cả. Hàng đợi sẽ tồn tại với các yêu cầu ngay cả khi số lượng của chúng tăng lên.

Sau đó, hãy tưởng tượng rằng dịch vụ của bạn đang phát triển, khổi lượng yêu cầu cần xử lý tăng lên và hệ thống cần được mở rộng. Tất cả những gì bạn cần làm là thêm nhiều `consumer` để giải quyết hàng đợi nhanh hơn.
## Ưu điểm

Message Queue là một thành phần cực kì quan trọng, không thể thiếu trong các hệ thống lớn cũng như trong kiến trúc microservice nhờ các ưu điểm sau:

- **Dự phòng**: Sau khi lưu trữ tin nhắn, hàng đợi đảm bảo tin nhắn sẽ chỉ bị loại bỏ khi quá trình đọc nó xác nhận thành công trong việc đọc và xử lý. Nếu có gì sai sót, tin nhắn sẽ không bị mất và được xử lý lại sau này.
- **Nhắn tin không đồng bộ**: Trong trường hợp ứng dụng của bạn không yêu cầu phản hồi đúng cách cho một quy trình, các consumer có thể nhận và xử lý theo logic và tốc độ riêng của nó.
- **Khả năng phục hồi**: Ví dụ: giả sử hệ thống của bạn bao gồm 2 microservice, một để xử lý đơn đặt hàng và một dịch vụ khác để gửi email. Có một hàng đợi cho biết rằng một email cần được gửi đi có nghĩa là ngay cả khi hệ thống email của bạn không hoạt động, dịch vụ xử lý đơn đặt hàng vẫn có thể tiếp tục nhận và xử lý đơn đặt hàng. Khi dịch vụ email trực tuyến trở lại, nó có thể bắt đầu đọc tin nhắn và gửi email.
- **Khả năng mở rộng**: Hàng đợi cho phép bạn tách hệ thống của mình thành các microservices khác nhau và chia tỷ lệ chúng theo nhu cầu.
## Nhược điểm
Và tất nhiên, không có gì là hoàn hảo :D bên cạnh nhiều lợi ích thì message queue cũng có những nhược điểm của nó:
- **Làm phức tạp hệ thống**
- **Phải có message format:** Từ 2 phía producer và consumer cần phải thống nhất format message để có thể gửi và nhận message.
- **Monitor Queue là cần thiết:**  Bạn cần phải theo dõi queue của mình để đảm bảo queue không quá nhiều hay đầy queue.
- **Khó xử lý đồng bộ:** Không phải lúc nào message queue cũng là lựa chọn hàng đầu khi chúng ta xây dựng hệ thống. Sẽ có nhiều trường hợp hệ thống bắt buộc cần phải xử lý đồng bộ giữa các service, khi đó ta sẽ cần lựa chọn những cơ chế phù hợp hơn như Remote Procedure Invocation (RPI).

# Tóm lược

Để kết luận, nếu bạn đang nghĩ đến việc xây dựng hệ thống microservices hoặc nếu bạn cần cải thiện hiệu suất của chúng và business logic của bạn không yêu cầu chúng phải được xử lý ngay lập tức, thì **Message queue** là thứ bạn cần. Chúng sẽ đảm bảo rằng tất cả các yêu cầu nhận được đều được xử lý trong khi tách khỏi các microservices khác và nếu cần, chúng cho phép bạn dễ dàng mở rộng quy mô trong những khoảng thời gian có nhu cầu cao.