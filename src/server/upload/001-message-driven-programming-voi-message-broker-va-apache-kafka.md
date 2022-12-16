© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Apache Kafka từ zero đến one](https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2).

Trước khi vào chi tiết và cách thức hoạt động của Apache Kafka, cùng đi tìm hiểu 3 keywords:
> - **Asynchronous programming**.
> - **Message-driven programming**.
> - **Message broker**.

Let's begin.

## 1) Asynchrounous và Message-driven programming

Nếu đọc bài viết này thì chắc chắn chúng ta đã nắm chắc các khái niệm cơ bản về **async programming** và **message-driven**. Còn nếu chưa thì.. đọc tiếp nhé.

### 1.1) Asynchronous programming

Làm một chiếc ví dụ cho sôi động:

> Sau khi release project thành công, leader quyết định cho cả team đi ăn... **KFC**. Thôi cũng được, đi ăn không mất tiền là sướng rồi. 
> 
> Các anh em nhanh chóng phi đến nơi và tự phân chia vào các hàng chờ để đến lượt để gọi món. Người đến sau chờ người đến trước, ông nào lớ ngớ ra khỏi hàng cái là lại xuống cuối, mất chỗ như chơi. 
>
> Ông nào mà vã quá có khi lại đứng tán tỉnh luôn em bán hàng mất đến 15p thì đúng là.. há mồm.
> 
> Thấy nhân viên công ty F đông quá, giám đốc chi nhánh quyết định tăng gấp đôi số lượng line, tốc độ cải thiện rõ rệt. Tuy nhiên vẫn không tránh được việc một số anh em tranh thủ xin số em nhân viên...

Hãy coi các anh em công ty F là **client** và các em nhân viên là **server**. Trong ví dụ này, **client** phải tương tác trực tiếp với **server**, và đó là hình ảnh của **synchronous programming** - lập trình đồng bộ. **Client** cần chờ cho đến khi **server** xử lý xong request để tiếp tục chạy. Như vậy, mấu chốt của **synchronous programming** không nằm ở số lượng client, số lượng request hay số lượng server mà nằm ở cách client và server tương tác với nhau.

> Async programming mình đang đề cập là trong việc giao tiếp giữa nhiều service với nhau, không phải trong single application với multi-thread. Anw, idea của nó na ná nhau, đều muốn tránh **blocking** khi xử lý request.

![](https://i.imgur.com/OLhPig9.png)

Nếu chỉ cần cải thiện tốc độ thì không khó, cứ làm theo giải pháp của giám đốc chi nhánh là ok, tăng số lượng nhân viên bằng số lượng khách hàng. 

![](https://i.imgur.com/6PqHZxx.png)

Và dĩ nhiên trong thực tế chẳng ai làm như thế :hammer:.  Và nó cũng không giải quyết được vấn đề giao tiếp trực tiếp, chờ đợi lẫn nhau:

> - Nhân viên: ...
> - Khách hàng: ...
> - Nhân viên: ...
> - Khách hàng: ...
> - Nhân viên: ...

Mọi chuyện tưởng chừng không có vấn đề gì, nhưng sẽ có 2 bất lợi chính:
> - Nếu **server** có gặp sự cố, **client** phải chờ cho đến khi **server** phục hồi và trả lời request hoặc quá timeout, và không chỉ một mà còn rất nhiều **client** phía sau cũng phải chờ.
> - **Client** phải chờ phản hồi từ **server** mới có thể tiếp tục thực hiện các công việc khác. 

Chuyện gì cũng có cách giải quyết. Vậy giám đốc chi nhánh xử lý thế nào?

> Nhà hàng nhận thấy điểm yếu trong khâu order. Họ quyết định chuyển sang hình thức khác. Sau khi lựa chọn được các món ăn ưa thích, khách hàng sẽ **thông báo** cho nhân viên. Trong lúc nhân viên ghi chép tính toán thì khách hàng có thể đi tìm chỗ ngồi và làm việc cá nhân. Sau khi xác nhận đơn hàng hàng công, nhân viên báo lại cho khách hàng ra thanh toán và nhận đồ.

Vấn đề được giải quyết, **client** và **server** vẫn giao tiếp trực tiếp nhưng không chờ đợi nhau. **Client** có thể làm việc riêng tùy thích trong khoảng thời gian đó, và được thông báo khi **server** xử lý xong yêu cầu.

Đó là ví dụ của **asynchronous programming**. Như vậy, việc giải quyết bài toán không nằm ở cách thức giao tiếp hay kênh giao tiếp mà giải pháp là**tách biệt request và response**.

![](https://i.imgur.com/kFlrwPj.png)

> **Tách biệt hai luồng request và response**, nghĩa là hoàn toàn **có thể** thực hiện giao tiếp trực tiếp giữa nhiều service với nhau.
> - **Service A** gửi request đến **Service B**.
> - **Service B** nhận request và phản hồi đã nhận được request. Để đó xử lý sau.
> - Trong lúc đó, **Service A** hoàn toàn rảnh rang thực hiện các công việc khác.
> - Sau khi **Service B** xử lý xong request sẽ gửi ngược lại cho **Service A**.

Tuy nhiên chưa thực sự triệt để, vẫn có thể gặp 2 vấn đề:
> - Nếu **server** quá tải từ chối nhận thêm request, hoặc **server**.. die. **Client** cần cơ chế retry để gửi lại request. 
> - Trong trường hợp muốn order ở tất cả cửa hàng tại Hà Nội. Khách hàng cần gửi request đến từng cửa hàng.

### 1.2) Message-driven programming

Ca này hơi khó, nhà hàng quyết định thuê các chuyên gia về tìm giải pháp gỡ rối.

> Sau một hồi xem xét, các chuyên gia đều đồng tình phán một câu xanh rờn: **việc gì mà phức tạp thì outsource cho nhanh**.
> 
> Những tưởng chỉ là câu nói đùa nhưng vấn đề đã được giải quyết êm đẹp. Nhà hàng thay đổi cách thức hoạt động, khách hàng thực hiện order qua hệ thống SMS. Sau đó hệ thống SMS điều phối request đến các cửa hàng, nhân viên để thực hiện nhiệm vụ. Không lo việc chẳng may một nhà hàng bị đóng cửa thì đã có nhà hàng khác phục vụ. Hoặc muốn thử đồ ăn ở nhiều nơi thì không cần gửi một list các request mà chỉ cần gửi một request. Các nhiệm vụ còn lại là công việc của hệ thống SMS.
>
> Ngoài ra, khách hàng và nhân viên không cần biết nhau, tránh việc khách hàng đánh nhân viên u đầu vì món ăn quá tệ :hammer:.
> 
> Đấy là mình lấy ví dụ thôi chứ nhà hàng nào mà áp dụng hình thức này chắc phá sản :joy:. Trong thực tế hệ thống message broker là Grab, Now, Baemin... với các chàng shipper đẹp zai lực lưỡng.

**Message-driven programming** bắt nguồn từ tư tưởng trên. **Server** và **client** không giao tiếp trực tiếp với nhau nữa. Tất cả các request sẽ được gửi dưới dạng **message** cho bên thứ 3. Bên thứ 3 có nhiệm vụ điều hướng các **message** đến địa chỉ cụ thể với 2 mục tiêu:
> - Đảm bảo gửi message thành công.
> - Và gửi đến đúng địa chỉ.

## 2) Message broker

Với ví dụ trên, hệ thống SMS là một **Message Broker** với mục đích điều hướng, trung chuyển message từ người gửi đến người nhận, với 4 ưu điểm:
> - Giảm tải cho các **server** bằng việc giảm các tương tác trực tiếp.
> - Lưu trữ request, trong trường hợp **server** gặp sự cố.
> - Phân phối request đến các nhiều **server** trong các bài toán cụ thể.
> - Đơn giản hóa quá trình gửi nhận message trong môi trường multi-services.

![](https://i.imgur.com/vthDw79.png)

**No silver bullet**, nhìn có vẻ gọn gàng nhưng cũng có hạn chế nhất định tuy nhiên không đề cập quá kĩ trong bài viết này :hear_no_evil:.
> - Đảm bảo việc gửi nhận message đến đích.
> - Cần monitor thêm cả hệ thống Message broker.
> - Xử lý vấn đề khi Message broker gặp lỗi.
> - Tăng latency, giảm performance.
> - Vân vân và mây mây...

Hiện nay, có khá nhiều Message broker hoạt động dựa trên cách thức và nền tảng khác nhau, nhưng tựu chung lại đều chung mục đích điều hướng, trung chuyển message:
> - Apache ActiveMQ.
> - Apache RocketMQ.
> - RabbitMQ.
> - Apache Kafka.
> - IronMQ.
> - ZeroMQ.
> - Redis, thực tế hiếm khi sử dụng. Chẳng ai đi **KIA Morning** trên cao tốc trong khi đã có **Lamborghini**.

Nói chung là, nhiều loại vcđ... Chọn cái gì cũng cần đau đầu để nghĩ. Chọn sai là phải trả giá, đắt hay rẻ tùy thuộc túi tiền của bạn. 

## 3) Message distribution patterns

Tương tự với ví dụ cửa hàng KFC, Message broker cung cấp 2 patterns chính để cung cấp việc điều hướng message:
> - **Point-to-point messaging**: hay còn gọi là **Queue**. Hiểu đơn giản đó là dạng phân phối message có quan hệ 1 - 1 giữa **client** và **server**, tao chỉ nói cho.. một mình mày thôi đấy. Mỗi message chỉ được gửi đến một endpoint duy nhất. Ví dụ là cuộc trò chuyện trên Skype giữa 2 người với nhau.
> - **Broadcast messaging**: một message có thể được gửi tới nhiều địa chỉ khác nhau, chỉ những người subcribe nội dung đó mới nhận được message. Ví dụ như khi follow mình, hệ thống chỉ gửi thông báo khi mình có bài viết mới đến các followers. Pattern này được gọi là **Topic**.

Với từng bài toán khác nhau ta sẽ linh hoạt sử dụng **queue** hoặc **topic** để xử lý vấn đề.
> - Nhắn tin hai người có thể dùng **queue**.
> - Khi nhắn tin trong group thì dùng **topic**.

## 4) Mô hình sử dụng Message broker

Message broker được đặt trong hệ thống bao gồm:
> - **Producer/Publisher**: nơi gửi message.
> - **Message broker**: hệ thống điều hướng message.
> - **Consumer/Subcriber**: nơi nhận message.

Không còn khái niệm **client** và **server** mà thay vào đó là **producer/publisher** và **consumer/subscriber**. Về bản chất vẫn như nhau, một bên gửi và một bên nhận message.

![](https://i.imgur.com/rUXqx2X.png)



## 5) Phân chia Message broker theo cách thức hoạt động

Các chuyên gia phân chia Message broker ra thành 2 loại dựa trên cách thức hoạt động của chúng:
> - Message base.
> - Data pipline.

|Message base|Data pipeline|
|-|-|
|ActiveMQ, RabbitMQ, ZeroMQ|RocketMQ, Kafka|
|Lưu trạng thái của Consumer để đảm bảo tất cả đều nhận được message từ topic đang subscribe.|Không lưu trạng thái của Consumer.|
|Message bị xóa sau khi các Consumer nhận được message.|Message chưa bị xóa ngay sau khi Consumer nhận message.|
|Khi có message mới, Consumer chỉ lấy được duy nhất message đó.|Consumer có thể tùy ý lựa chọn lấy về một danh sách các message, bao gồm cả message cũ.|

Có thể quyết định sử dụng loại Message broker nào dựa trên bảng so sánh trên:
> - Với các bài toán yêu cầu đảm bảo Consumer đều nhận được một message và duy nhất một lần nhận là quan trọng nhất, ta sử dụng **Message base**.
> - Các bài toán yêu cầu sự chính xác cao và đảm bảo không lost message thì cân nhắc sử dụng **Data pipeline**.

Mạnh miệng thế chứ hiện tại chúng ta đa số đều sử dụng **Apache Kafka**, với hai lý do chính:
> - Mạnh mẽ, được quảng cáo performance tốt. Feature được nhấn mạnh là không mất message.
> - Công nghệ mới, tội gì không làm.

### Reference
Reference in series https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2

### After credit

Lừa đảo thật, tiêu đề Apache Kafka rõ to mà không thấy viết gì? Có đấy, rất nhiều và cũng rất chi tiết. Đón chờ trong các bài tiếp theo nhé.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)