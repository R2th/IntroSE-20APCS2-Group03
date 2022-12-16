<img src="https://i.imgur.com/lXK1bFq.jpg"
     alt="Markdown Monster icon"/>

# 1. Những điều cần biết trước khi tìm hiểu Kafka

## Publish/Subscribe messaging

Trước khi thảo luận về các chi tiết cụ thể của Apache Kafka , chúng ta cần hiểu rõ cấu tạo của **pub/sub messaging** và tại sao nó lại quan trọng .**Publish/subscribe messaging** là một pattern mà đặc trưng bởi việc gửi (publisher) data (message) mà ko chỉ định người nhận rõ ràng . Thay vào đó người gửi sẽ phân loại tin nhắn thành các lớp và bằng cách nào đó mà người nhận (subscriber) phải đăng kí vào lớp nhất định để nhận tin nhắn ở lớp đấy. Hệ thống pub/sub thường có một broker (nhà phân phối) , là trung tâm nơi mà các message được phân phối.

### Bắt đầu như thế nào nhỉ

Có rất nhiều use case cho Pub/sub ,đơn giản nhất là hãy bắt đầu với một hàng đợi tin nhắn ( message queue ) hay các kênh giao tiếp giữa các tiến trình ( interprocess communication channel) .Ví dụ: bạn tạo một ứng dụng cần gửi dữ liệu để theo dõi các hoạt động của trang web chẳng hạn như vậy bạn tạo kết nối trực tiếp từ trang web của mình đến một ứng dụng có thể hiển thị số liệu đó lên một bảng để có thể theo dõi . ví dụ như trong hình đây
<img src="https://imgur.com/VNtRiyl.png"
     alt="Markdown Monster icon"/>

Đây chỉ là một ví dụ đơn giản khi mới bắt đầu với việc theo dõi dữ liệu. Về sau bạn quyết định thử phân tích dữ liệu trong thời gian dài và vs mô hình hiện tại thì hoạt động không tốt . Thế nên bạn sẽ bắt đầu cần một service mà có thể nhận các số liệu , lưu trữ chúng, thống kê chúng. Để hỗ trợ điều này, bạn sửa đổi ứng dụng của mình để có thể gửi dữ liệu cho cả hai hệ thống. Vì thế bây giờ bạn có thêm các ứng dụng mới mà sẽ tạo ra dữ liệu .Và đương nhiên nó cũng cần phải tạo kết nối giống như service trước . Dần dần do nhu cầu mà bạn sẽ có nhiều ứng dụng và service để phục vụ các mục đích khác nhau
<img src="https://imgur.com/uYwJOMb.png"
     alt="Markdown Monster icon"/>
( ôi mắt của tôi @@ )

Sự bất cập của kỹ thuật xây dựng hệ thống này là rõ ràng, vì vậy bạn quyết định phải làm gì đó. Bạn thiết lập một ứng dụng duy nhất nhận dữ liệu từ tất cả các ứng dụng ngoài và cung cấp một máy chủ để duy trì và truy vấn các dữ liệu đó cho bất kỳ hệ thống nào cần chúng.

<img src="https://imgur.com/gNjSvGP.png"
     alt="Markdown Monster icon"/>

### Individual Queue Systems ( hệ thống xếp hàng cá nhân )

Tại cùng một thời điểm bạn muốn tiến hành các hoạt động khác như kiểm tra hay cung cấp các hành động của người dùng trên trang web của bạn cho những nhà phát triển ML để thu tập và phân tích thói quen khách hàng . Và rồi bạn nhận ra sự giống nhau của các hệ thống đó và hình dưới đây thể hiện tới 3 mô hình pub/sub systems

<img src="https://imgur.com/jCvuDhA.png"
     alt="Markdown Monster icon"/>

Bằng cách này sẽ tốt hơn nhiều là tận dụng các kết nối point to point nhưng nó lại tồn tại nhiều sự lặp lại . Giả sử như công ty của bạn đang duy trì nhiều hệ thống queuing data  (tất cả đều có lỗi và giới hạn riêng) . Bạn cũng biết rằng sẽ sớm có nhiều trường hợp sử dụng message mới trong tương lai. Vì thế bạn muốn có một hệ thống tập trung duy nhất cho phép tạo ra chung một loại dữ liệu mà có thể phát triển khi doanh nghiệp của bạn phát triển

## Kafka là gì ?

Apache Kafka là một hệ thống publish/subscribe messaging được thiết kế để giải quyết vấn đề này. Nó thường được mô tả như là một hệ thống "phân phối các commit log" hay gần đây còn đc gọi là một "nền tảng phân phối stream". Hiểu nôm na là một hệ thống file hoặc cơ sở dữ liệu về commit log được thiết kế để cung cấp một bản ghi bền vững về tất cả các transaction để có thể tạo nên tính nhất quán của hệ thống, dữ liệu trong Kafka được lưu trữ lâu dài, theo thứ tự . Ngoài ra, dữ liệu có thể được phân phối trong hệ thống để cung cấp các biện pháp bảo vệ hay bổ sung để chống lại các lỗi hệ thống khiến dữ liệu ko nhất quán, cũng như các khả năng để scaling hiệu suất.

### Messages and Batches

Đơn vị dữ liệu trong Kafka được gọi là `message` .Nếu bạn tiếp cận Kafka từ góc nhìn của nền tảng cơ sở dữ liệu, bạn có thể nghĩ về message tương tự như một `row` hoặc một `record`.Một message chỉ đơn giản là một mảng byte , vì vậy dữ liệu chứa trong đó không có định dạng cụ thể hoặc ý nghĩa . Một message có thể có một tùy chọn **bit of metadata**, được gọi là một khóa ( nghĩa là cái bit này là khóa của metadata :v ). Khóa này cũng là một mảng byte và cũng giống như message nó không có ý nghĩa cụ thể nào cả.Các key được sử dụng khi message được ghi vào các phân vùng khác nhau một cách dễ kiểm soát hơn. Đơn giản nhất là tạo ra một hàm băm nhất quán của key và sau đó cho vào phân vùng có số là kết quả sau khi băm của key. Điều này đảm bảo rằng các tin nhắn có cùng khóa luôn được ghi vào các vùng giống nhau.

Để hiệu quả, message được viết vào Kafka theo đợt( Batches ). `batch` chỉ là một tập hợp các message, tất cả chúng đang được tạo ra cho cùng một **topic** ( chủ đề ) và **partition** ( phân vùng)  .Cứ mỗi message mà cứ chạy riêng lẻ trên mạng thì chi phí quá cao vì thế việc gộp các message này thành một lô ( Batches ) làm giảm thiểu chi phí này. Tất nhiên, đây là sự đánh đổi giữa độ trễ và thông lượng ,cũng chỉ là 2 mặt của một đồng xu thôi các lô càng lớn càng nhiều message sẽ phải đợi cho đủ lô mới đc gửi như thế độ trễ sẽ lớn. Các lô cũng thường được nén vì vậy cung cấp khả năng truyền và lưu trữ dữ liệu hiệu quả hơn

### Schemas

Mặc dù các thông điệp là các mảng byte không có ý nghĩa vì thế chúng ta nên áp dụng cấu trúc hoặc lược đồ ( shemas ) cho nội dung message để có thể dễ hiểu hơn. Có nhiều tùy chọn có sẵn cho message schema, tùy thuộc vào ứng dụng của bạn cần gì. Các hệ thống đơn giản, chẳng hạn như (JSON) và (XML), rất dễ sử dụng và dễ đọc với con người. Tuy nhiên, chúng thiếu các tính năng như xử lý kiểu mạnh mẽ và khả năng tương thích giữa các phiên bản schemas. Nhiều nhà phát triển Kafka ủng hộ việc sử dụng Apache Avro, một framework tuần tự hóa ban đầu được phát triển cho Hadoop. Avro cung cấp một định dạng tuần tự hóa nhỏ gọn, các Schemas tách biệt với tải trọng của message và không yêu cầu phải code lại khi chúng thay đổi .

Một định dạng dữ liệu nhất quán rất quan trọng trong Kafka, vì nó cho phép viết và đọc các message bị tách rời. Khi các tác vụ này được kết hợp chặt chẽ, các ứng dụng đăng ký để nhận message phải được cập nhật để xử lý định dạng dữ liệu mới song song với định dạng cũ. Sau đó, các ứng dụng cần bắn các message mới được cập nhật để sử dụng định dạng mới. Bằng cách sử dụng các shemas được xác định rõ các message trong Kafka có thể được hiểu dễ dàng hơn. ( phù nếu mà khó hiểu quá thì cứ nghĩ nó giống như rpc gửi dữ liệu và cần file proto để định dạng lại dữ liệu khi nhận ý )

### Topics and Partitions (chủ đề và phân vùng )

Message trong Kafka được phân loại thành các `topics` . Ví dụ gần nhất với topic đó chính ra table trong db hay folder trong filesystem . Các topic được chia nhỏ ra thành các phân vùng nhỏ. Quay trở lại mô tả về `commit log`, một phân vùng được hiểu là một bản ghi duy nhất của các message. Message được viết theo kiểu mục lục và được đọc theo thứ tự từ đầu đến cuối .Lưu ý rằng vì một topic thường có nhiều phân vùng , không có gì đảm bảo việc sắp xếp thời gian của các message trên topic trong một phân vùng là duy nhất. Hình bên dưới cho thấy một topic có bốn phân vùng, với việc các message đang được thêm vào cuối mỗi phân vùng. Mỗi phân vùng có thể được lưu trữ trên một máy chủ khác nhau, điều đó có nghĩa là một topic có thể được scale theo chiều ngang trên nhiều máy chủ để cung cấp hiệu suất vượt xa khả năng của một máy chủ duy nhất.

<img src="https://imgur.com/aVGb3VY.png"
     alt="Markdown Monster icon"/>

`Stream` là thuật ngữ thường được sử dụng khi nói về dữ liệu trong các hệ thống như Kafka. Thông thường, một `stream` được coi là một `single topic` của dữ liệu, bất kể số lượng phân vùng trong topic. Điều này thể hiện một `stream` dữ liệu duy nhất chuyển từ producers sang consumers. Cách đề cập đến các message này là khá phổ biến khi miêu tả việc xử lý của`stream`, đó là khi một số framework như Kafka Streams, Apache Samza và Storm, hoạt động trên các message theo thời gian thực. Phương pháp hoạt động này có thể được so sánh với cách các framework ngoại tuyến, cụ thể là Hadoop, được thiết kế để hoạt động trên các dữ liệu đã đc xử lý xong ( ko phải real time như những các trên ).

### Producers and Consumers

Kafka client là những người dùng hệ thống Kafka và có 2 loại cơ bản : producers và consumers . Ngoài ra còn có các advandced client APIs- `Kafka Connect API` để tích hợp các dữ liệu và `Kafka Streams` cho việc stream processing. 

`Producers` là thành phần tạo ra các message. Trong hệ thống pub/sub có thể đc gọi là `publishers` hay `writers` .Nói chung là nó sẽ tạo message và cung cấp cho một topic cụ thể. Theo mặc định, producers không quan tâm việc message được cho vào phân vùng nào của topic. Trong một số trường hợp, producer sẽ gửi message đến các phân vùng cụ thể. Điều này thường được thực hiện bằng cách sử dụng key và trình phân vùng sẽ tạo ra một hàm băm của khóa và ánh xạ nó tới một phân vùng cụ thể . Điều này đảm bảo rằng tất cả các message được tạo bằng một khóa đã cho sẽ được ghi vào cùng một phân vùng duy nhất.

`Consumers` là thành phần đọc các message. Trong các hệ thống pub/sub khác, consumers có thể gọi là subscribers hoặc là reader. Consumers đăng ký một hoặc nhiều topic và đọc các message theo thứ tự mà chúng được tạo ra. Consumers giữ việc theo dõi những message mà nó đã đăng kí bằng cách theo dõi các offset (là giá trị số nguyên tăng lên mỗi khi message đc tạo ra) . Mỗi message trong một phân vùng đều có số này là duy nhất. Việc sử dụng giá trị offset này giúp consumers có thể dừng hay khi khởi động lại có thể đọc tiếp các message mà không bị mất vị trí đã đọc được trước đó. Ngoài ra các consumers sẽ hoạt động như một group .Theo cách này, consumer có thể mở rộng theo chiều ngang để xử lý hết các topic với số lượng lớn các message. Ngoài ra, nếu một consumer ngừng hoạt động, các thành viên còn lại của nhóm sẽ cân bằng lại các phân vùng đang được sử dụng và tiếp quản việc của thành viên bị ngừng hoạt động .

<img src="https://imgur.com/hTRBzBw.png"
     alt="Markdown Monster icon"/>

### Brokers and Clusters

Một máy chủ Kafka được gọi là **broker**. Broker nhận đc message từ producers , gán offsets cho chúng  và lưu trữ chúng trên ổ đĩa. Nó cũng phục vụ các comsumer, đáp ứng yêu cầu tìm phân vùng và trả lại các message đã đc commit trong ổ đĩa. Tuỳ vào phần cứng cụ thể và các đặc điểm về hiệu xuất của nó mà một broker có thể xử lý hàng ngàn phân vùng và hàng triệu message mỗi giây .

Kafka brokers được thiết kế để hoạt động như một phần của một **cluster**. Trong một cụm các broker sẽ có một broker hoạt động như cluster controller ( nó được bầu tự động từ các thành viên trong cluster đó). Controller chịu trách nhiệm cho các hoạt động quản trị, bao gồm việc gán các phân vùng cho các broker và giám sát các lỗi của chúng. Một phân vùng mà được sở hữu bởi một broker duy nhất trong cluster thì broker đó được gọi là leader của phân vùng đó. Một phân vùng có thể được gán cho nhiều broker, điều này sẽ dẫn đến phân vùng có thể được sao chép . Điều này cho phép một broker khác trở thành leader nếu broker leader hiện tại sập.

<img src="https://imgur.com/d2yK5om.png"
     alt="Markdown Monster icon"/>

Tính năng chính của Apache Kafka là khả năng lưu giữ message trong một khoảng thời gian dài. Các broker được cấu hình mặc định để giữ lại message trong topic một khoảng thời gian (ví dụ: 7 ngày) hoặc cho đến khi topic đạt đến kích thước nhất định tính bằng bytes (ví dụ: 1 GB). Khi đạt đến các giới hạn này, các message sẽ hết hạn và bị xóa để lưu giữ các message mới. Các topic riêng lẻ cũng có thể được cấu hình việc lưu giữ riêng biệt để các message sẽ được lưu trữ miễn là chúng còn hữu ích. Ví dụ: một message theo dõi có thể được giữ lại trong vài ngày, trong khi các message ít quan trọng hơn sẽ bị xóa và thay thế chỉ trong vài giờ.

### Multiple Clusters

Khi Kafka phát triển, thường sẽ hiệu quả hơn nếu có nhiều Cluster. Chúng ta có một vài lý do để hiểu tại sao điều này lại hiệu quả :

* Phân chia các loại dữ liệu 
* Tách ra do các yêu cầu về bảo mật 
* Nhiều datacenter hơn (khắc phục việc bị 1 lỗi khiến cả hệ thống sụp đổ)

Khi làm việc với nhiều datacenter nói riêng, thông thường các message phải được tạo các bản sao giữa chúng.  Ví dụ: nếu người dùng thay đổi thông tin công khai trong hồ sơ của họ, thay đổi đó sẽ cần được cập nhật trên bất kì datacenter nào .Tuy nhiên các cơ chế sao chép trong các cluster Kafka được thiết kế để hoạt động trong một cluster duy nhất, không phải giữa nhiều cluster.

Kafka có một tool là **MirrorMaker**, được sử dụng cho mục đích này. Về cốt lõi, **MirrorMaker** chỉ đơn giản là một Kafka consumer và producer được liên kết với nhau bằng 1 hàng đợi ( queue ) để message từ một cluster này được cung cấp cho một cluster khác. Hình bên dưới cho thấy một ví dụ về kiến trúc sử dụng MirrorMaker, tổng hợp các message từ hai local clusters thành một cụm tổng hợp, sau đó sao chép cụm đó sang các datacenter khác. 

<img src="https://imgur.com/grOSFed.png"
     alt="Markdown Monster icon"/>

## Why Kafka

Có nhiều lựa chọn để tạo hệ thống publish/subscribe messaging systems , vậy điều gì khiến Apache Kafka là một lựa chọn tốt?

### Multiple Producers

Kafka có thể xử lý liền mạch nhiều producers, cho dù clients đó đang sử dụng nhiều topic hoặc cùng một topic. Điều này tạo nên một hệ thống lý tưởng để tổng hợp dữ liệu từ nhiều frontend. Ví dụ: một trang web cung cấp nội dung cho người dùng thông qua nhiều microservice như thế nghĩa là sẽ có nhiều producers bắn dữ liệu thu thập từ các hoạt động của ng dùng vì thế sẽ có nhiều topic như thế sẽ nhiều các định dạng ,tuy nhiên Kafka có thể giải quyết tất cả các service và có thể ghi và sử dụng một định dạng chung cho tất cả. Consumer application có thể nhận một luồng dữ liệu mà không cần phải nhận từ nhiều topic .

### Multiple Consumers

Ngoài việc có thể thêm nhiều producers, Kafka còn được thiết kế cho nhiều consumers để đọc bất kỳ (steam of message) dòng tin nhắn nào mà không ảnh hưởng lẫn nhau. Điều này có vẻ trái ngược vs queuing systeam nghĩa là trong hàng đợi đó khi một tin nhắn được sử dụng bởi một consumer, thì nó không khả dụng với những consumer khác. Multiple Kafka consumers có thể chọn hoạt động như một phần của nhóm và chia sẻ một stream, đảm bảo rằng toàn bộ nhóm xử lý message đã cho chỉ trong một lần.

### Disk-Based Retention (Duy trì dựa trên đĩa)

Kafka không chỉ có thể xử lý multiple consumers, mà còn có có thể lưu giữ tin nhắn khá lâu ( duy trì bền ) vì consumer không phải lúc nào cũng cần làm việc theo thời gian thực. Messages được commit vào ổ đĩa, và sẽ được lưu trữ với các quy tắc nhất định. Các tùy chọn này có thể là được chọn trên cơ sở từng topic, cho phép các luồng message khác nhau có sự khác biệt về số lượng duy trì phụ thuộc vào nhu cầu của consumer. **Duy trì bền** có nghĩa là nếu consumer tụt lại phía sau, do xử lý chậm hoặc bị rối loạn trong khi truyền cũng không có nguy cơ bị mất dữ liệu. Nó cũng có nghĩa là bảo trì có thể được thực hiện trên consumer, lấy các ứng dụng ngoại tuyến trong một khoảng thời gian ngắn, không quan tâm về các message sao lưu trên producer hoặc bị mất. consumer có thể bị dừng lại và các message sẽ được giữ lại ở Kafka. Điều này cho phép nó khởi động lại và nhận các tin nhắn xử lý nơi chúng thoát mà không mất dữ liệu.

### Scalable

Khả năng mở rộng linh hoạt của Kafka sẽ giúp bạn dễ dàng xử lý bất kỳ lượng dữ liệu nào. Người dùng có thể bắt đầu với một broker duy nhất như một **proof of concept**, mở rộng từ một phát triển từ một cluster nhỏ gồm 3 brokers rồi chuyển sang với một mô hình lớn hơn với một cluster lớn với hàng trăm ngàn broker phát triển theo thời gian khi dữ liệu tăng lên. Scale có thể được thực hiện bên trong khi cluster đang online mà không ảnh hưởng đến tính khả dụng của toàn bộ hệ thống. Điều này cũng có nghĩa là một nhóm nhiều broker có thể xử lý sự thất bại của một broker riêng lẻ và tiếp tục phục vụ khách hàng. Các cluster gặp nhiều thất bại hơn có thể được cấu hình với các yếu tố sao chép cao hơn. 

### High Performance

Tất cả các tính năng này kết hợp với nhau để biến Apache Kafka thành một hệ thống publish/subscribe messaging với hiệu suất tuyệt vời dưới tải trọng cao. Producers, consumers và brokers đều có thể mở rộng quy mô để xử lý các luồng message rất lớn một cách dễ dàng.

## The Data Ecosystem (hệ sinh thái dữ liệu)

Apache Kafka cung cấp hệ thống tính toán cho hệ sinh thái data . Nó mang message giữa các thành phần khác nhau của cơ sở hạ tầng, cung cấp một giao diện nhất quán cho tất cả client. Khi được kết hợp với một hệ thống để cung cấp các message, producers và consumers không còn yêu cầu kết nối chặt chẽ hoặc kết nối trực tiếp dưới bất kỳ hình thức nào. Các thành phần có thể được thêm và xóa khi gặp các trường hợp khác nhau ,và các producers không cần phải quan tâm đến việc ai đang sử dụng dữ liệu hoặc số lượng ứng dụng lấy dữ liệu.

## Use Cases

### Activity tracking

Trường hợp sử dụng phổ thông nhất cho Kafka, như được thiết kế tại LinkedIn, là theo dõi hoạt động của người dùng. Một người dùng trên trang web tương tác với các ứng dụng frontend, tạo ra các thông tin liên quan đến các hành động mà người dùng đang thực hiện. Đây có thể là thông tin thụ động, chẳng hạn như lượt xem trang và theo dõi nhấp chuột hoặc có thể là các hành động phức tạp hơn, chẳng hạn như thông tin mà người dùng thêm vào hồ sơ của họ. Các message được publiched đến một hoặc nhiều topic, sau đó được các ứng dụng sử chúng trong phần backend. Các ứng dụng này có thể tạo báo cáo, cho hệ thống ML học, cập nhật kết quả tìm kiếm hoặc thực hiện các hoạt động khác cần thiết để cung cấp trải nghiệm người dùng thêm phong phú.

### Messaging

Kafka cũng được sử dụng để nhắn tin, nơi các ứng dụng cần gửi thông báo (như email) cho người dùng. Những ứng dụng đó có thể tạo tin nhắn mà không cần phải quan tâm đến định dạng hoặc cách tin nhắn sẽ thực sự được gửi. Sau đó, một ứng dụng có thể đọc tất cả các tin nhắn được gửi và xử lý chúng một cách nhất quán, bao gồm:

- Định dạng các message
- Thu thập nhiều message vào một rồi mới đc gửi
- Áp dụng tùy chọn của người dùng về cách họ muốn nhận tin nhắn

Sử dụng một ứng dụng duy nhất cho việc này để tránh sự cần thiết phải sao chép chức năng trong nhiều ứng dụng, cũng như cho phép các hoạt động như tổng hợp mà không thể thực hiện được.

### Metrics and logging

Kafka cũng lý tưởng để thu thập các dữ liệu và logging. Đây là một công dụng trong trường hợp là có khả năng nhiều ứng dụng tạo ra cùng loại message. Các ứng dụng public dữ liệu thường xuyên cho topic Kafka và những dữ liệu này có thể được sử dụng bởi các hệ thống để theo dõi và cảnh báo. Họ cũng có thể được sử dụng trong một hệ thống ngoại tuyến như Hadoop để thực hiện phân tích dài hạn hơn, chẳng hạn như dự báo tăng trưởng. Message có thể được public theo cùng một cách, và có thể được được chuyển đến các hệ thống tìm kiếm logging chuyên dụng như Elastisearch hoặc ứng dụng phân tích bảo mật.

### Commit log

Vì Kafka dựa trên khái niệm commit log, các thay đổi cơ sở dữ liệu có thể được public lên Kafka và các ứng dụng có thể dễ dàng theo dõi luồng này để nhận cập nhật trực tiếp khi chúng xuất hiện. Luồng thay đổi này cũng có thể được sử dụng để sao chép các cập nhật cơ sở dữ liệu vào một hệ thống từ xa hoặc để hợp nhất các thay đổi từ nhiều ứng dụng vào một chế độ xem . Duy trì lâu dài rất hữu ích ở đây để cung cấp bộ đệm cho thay đổi, có nghĩa là nó có thể được phát lại trong trường hợp ứng dụng lấy dữ liệu bị lỗi. Luân phiên, các topic được nén có thể được sử dụng để cung cấp khả năng lưu giữ lâu hơn

Oaaa giới thiệu có vẻ dài và việc đọc có thể cải thiện giấc ngủ . Nhưng yên tâm ngay sau đây là phần hướng dẫn cài đặt sẽ có trong bài viết dưới đây :

Link : tu bi con tờ niu