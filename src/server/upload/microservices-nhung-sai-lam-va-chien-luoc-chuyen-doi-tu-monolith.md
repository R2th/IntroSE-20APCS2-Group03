![image.png](https://images.viblo.asia/14e2b1f4-bb73-4f55-bba0-1bf4805c8cf7.png)

Thay vì viết một bài hoặc một seri về Microservices, mình nghĩ nên recap luôn những vấn đề, thách thức, khó khăn khi chuyển đổi hệ thống Monolith lên Microservices.

Những kinh nghiệm này mình có được qua việc trải nghiệm với các hệ thống đã đang sử dụng Microservices cũng như tư vấn cho các đơn vị đang muốn chuyển đổi.

## Microservices là gì?

Có lẽ các bạn đã nghe rất nhiều về từ khoá Microservices trong những năm gần đây. Thậm chí trong tuyển dụng phỏng vấn ứng viên frontend mà nhà tuyển dụng cũng kèm theo "biết Microservices" là một lợi thế. Ừ đúng là nó không liên quan thật.

![image.png](https://images.viblo.asia/3394c6ba-4567-40f8-b4cd-6b110be36a03.png)

Microservices - còn được gọi là kiến trúc Microservice - kiến trúc này thường được sử dụng ở backend hay có hệ thống lớn.

Để cho dễ hiểu, ngày trước backend code nguyên một cục rồi deploy lên server. Ngày nay người ta chia nó thành nhiều cục nhỏ hơn deploy riêng lẻ. Mấy cục nhỏ nhỏ này được kết nối để phục vụ chức năng nghiệp vụ vốn có.

Các bạn nhận slide 500K CCU với Microservices tại bài viết này nhé: https://200lab.io/blog/microservices-chien-luoc-chuyen-doi-tu-monolithic/

## Vì sao cần chuyển đổi Microservices

Sẽ có vài câu chuyện rất quen thuộc trên công ty, à chính xác là ở team/bộ phận backend:

1. Khi bạn muốn deploy service vì update một tính năng X -> X' nhưng team thì đang hì hục code hoặc debug tính năng A,B,C,D thì bạn sẽ phải đợi cho mọi thứ xong hết.
2. Mỗi thành viên trong team (developer) đều nhìn thấy toàn bộ source code. Bạn muốn bảo mật hoặc giới hạn là không thể.
3. Bạn muốn đổi stack backend, có thể là framework khác, hoặc đổi luôn ngôn ngữ thậm chí database. Mình tin là sếp bạn sẽ không dám mạo hiểm để đổi toàn bộ sourcecode lớn như thế.
4. Mỗi ngôn ngữ và DB đều có thế mạnh riêng. Nhưng vì là monolith, bạn buộc phải follow theo stack từ rất lâu đời này.

![image.png](https://images.viblo.asia/36cec349-7e03-4933-95b1-e187684b84e9.png)

Đương nhiên sẽ không thể thiếu "vì hệ thống hiện tại đang chậm quá nên cần chuyển đổi lên Microservices". Nhưng đây là một trong những sai lầm phổ biến nhất!!

## Những sai lầm phổ biến về Microservices

Rất nhiều tổ chức đã chuyển đổi hệ thống lên Microserices xong lại phải chuyển về Monolith vì những vấn đề sau:

### Thiếu hụt hệ thống monitoring

Đây là điều mình thấy khác ngạc nhiên rằng hầu hết các hệ thống đang có vấn đề điều thiếu hụt hoặc sơ sài thậm chí không hề có mornitoring.

Hệ thống mornitoring giống như những cái ống nghe, điện tâm đồ trong ngành Y. Thời xưa, trước khi có những máy móc hiện đại, các lương y còn phải bắt mạch cơ mà.

Không có công cụ mornitor hệ thống, bạn bị đau chân nhưng sẽ đi mổ tim, uống thuốc bổ phổi. Thật lạ là đó lại là điều đang diễn ra ở khá nhiều công ty công nghệ.

![](https://images.viblo.asia/ff115989-1070-4ec9-9f36-253e7ad3393a.jpg)

### Vì muốn hệ thống chạy nhanh hơn

Điều này nghe cực kỳ hợp lý, nhưng bản thân Microservices ra đời không vì lý do này. Trong định nghĩa của Microservices không hề có bất kỳ một chữ "faster" hay đại loại thế. Mà thật ra thì về bản chất tất cả kiến trúc sinh ra không vì mục đích này.

Muốn hệ thống chạy nhanh hơn thì chúng ta đi tối ưu hệ thống, điều chỉnh các I/O xuống DB/disk,  shard/replica DB, dùng caching hợp lý, load balancing có đúng chưa...

Microservices dù giúp hệ thống chia nhỏ và phân tán nhưng nếu bạn không thực hiện những điều chỉnh trên thì kết quả không khác biệt mấy, hệ thống vẫn chậm, thậm chí chậm hơn do tốn thêm thời gian remote call đến các service nhỏ.

> Thay vì chuyển đổi lên Microservice ngay, hãy tìm hiểu cụ thể cái gì đang làm chậm hệ thống của bạn!

Theo kinh nghiệm của mình, các hệ thống dưới 100K CCU vẫn hoạt động tốt đến rất tốt, ngay cả khi họ không dùng Microservices. Tuy nhiên thực tế vẫn cần phải Monitor cụ thể để hiểu rõ hệ thống hơn.

### Cứ chia service ra là được

Không phải cứ chia service thì sẽ được gọi là Microservices. Khi đến với kiến trúc này bạn sẽ phải tìm hiểu thêm một mớ thứ đi kèm nữa: monitoring, sidecar, service mesh, service discovery, các công cụ deploy và scaling,... Dù những đồ chơi này không nhất thiết phải có, nhưng chúng lại là những thành phần then chốt giúp hệ thống bạn hoạt động ổn định.

> Microservices loại bỏ các mối lệ thuộc trong hệ thống nhưng lại thêm vào rất nhiều rắc rối khác.

### Tách service nhưng... xài chung DB

Nếu làm chuẩn Microservices, bạn sẽ chia tác cả phần code và phần DB. Tức là mỗi service chỉ được sử dụng DB của riêng nó mà thôi. VD service Account thì dùng table accounts, service Product thì dùng table products.

Phần này nghe đơn giản nhưng không hề dễ chịu chút nào đâu. Vì bạn sẽ phải đối mặt với các vấn đề sau:

1. Chia các tables như thế nào là hợp lý, giả sử có table liên kết Category và Product thì table này của service nào?
2. Việc phân tách tables ra sẽ khiến bạn phải từ bỏ khoá ngoại (foreign key), thứ mà trước đó bạn dùng để đảm bảo tính chất bảo toàn dữ liệu.
3. Bạn sẽ không thể join khác table được nữa nếu trước đó bạn dùng SQL.
4. Nếu bạn có dùng transaction, trigger hay store procedure giữa các table này thì bạn cũng buộc phải từ bỏ.

Thường các hệ thống legacy (lâu đời) thì các developer đã quen với việc phó thác những phần khó nhất xuống DB rồi. Từ bỏ chúng là một quyết định không hề dễ dàng. Nó buộc các developer phải thay đổi từ mindset đến cách tổ chức lại dữ liệu cho phù hợp.

> Đây là lý do nhiều tổ chức sử dụng Microservice với xì-tai chung DB. Việc này không mang lại lợi ích gì cả, họ gọi nó là Microservice nhưng thực tế là không.

### Không có vị trí DevOps (hoặc hiểu sai về DevOps)

Để giải quyết các vấn đề từ Microservices, bạn nên để việc này cho các chuyên gia. Họ chính là những kỹ sư chuyên trách xử lý từ giải pháp hệ thống cho tới deploy và điều hành (Operate) các công cụ trong Microservices.

Một sai lầm thường thấy là rất nhiều nơi sử dụng DevOps ở giai đoạn từ Deploy trở đi. Nếu chỉ deploy và quản trị hệ thống thì họ giống như một sysadmin ngày xưa hơn. DevOps nên được tham gia vào ngay từ đầu, họ tham gia vào khâu quyết định lựa chọn các thành phần hệ thống. Hơn ai hết, họ rất hiểu ưu và nhược của các thành phần này, cũng như thực hiện các đo đạc trước khi đưa vào triển khai.

DevOps có thể biết code bình thường, nhưng không nhiều, cũng không bắt buộc.

Đó là lý do tại sao biểu tượng DevOps là hình vô cực này:

![](https://images.viblo.asia/055590fb-9173-4ad9-8a2d-fb9abdf9f186.png)

## Chiến lược chuyển đổi hệ thống Monolith lên Microservices

Sau cùng, nếu bạn vẫn muốn chuyển đổi hệ thống từ Monolith lên Microservice, bạn có thể tham khảo một cách tổng quát của mình như sau:

Giả sử bạn có một hệ thống monolith khá lớn và đang cần chuyển đổi. Lời khuyên là ở thời điểm đầu mới chuyển đổi bạn không nên tách service quá nhỏ.

1. Bình tĩnh và từ từ, đừng tách code và DB ngay. Hãy clone full project thành từng service (vẫn chung source base), mỗi cái nhận một vài API (theo domain, VD: account). Hãy chọn 1 service nhỏ làm trước, đừng làm hết vì rất nhiều và rối.
2. Cấp account DB riêng cho từng service bên trên, hãy giới hạn scope account thay vì cho dùng full DB. Việc này giúp bạn xử lý và phát hiện những chỗ nó cần gọi qua table khác.
3. Nếu bạn có join, foreign key hoặc store procedure liên quan tới table đang xử lý thì hãy loại bỏ nó. Đây là lý do tại sao bạn nên chọn một module ít quan trọng để thực hiện trước.
4. Thay các query tới các bảng nó không có permission bằng remote API Call hoặc RPC.
5. Service gọi đi thì cũng phải nhận API từ các service khác. Hãy nhớ implement lại các API này nếu có.
6. Sau khi đã xử lý được hết các query trên, bạn đã có thể chắc chắn rằng service đó chỉ dùng đúng table của nó mà thôi. Giờ đây bạn đã có thể refactor code, bỏ hết những cái dư thừa không liên quan.
7. Từ đây bạn đã có thể tách hẵn table và service code ra không cần dùng chung source base nữa.
8. Tiếp tục với các service còn lại tới khi đủ thì thôi.

Về cơ bản là như vậy, trên thực tế sẽ bạn chỉ mới bước nửa người vào cánh của Microservices thôi. Bởi vì sẽ còn khá nhiều thứ cần xử lý tiếp theo:

1. Hệ thống Authentication cho toàn bộ các service.
2. Đảm bảo các service kết nối được với nhau (network). Về sau bạn sẽ cần sidecar và discovery để xử lý thêm (health check, service downtime, load balancing) cũng như gọi service name chứ ko dùng IP trực tiếp nữa.
3. Tối ưu các lời gọi API và bảo mật cho các services.
4. Hệ thống thu gom log và các metrics cho toàn bộ services.
5. Nên có hệ thống distributed tracing để truy vết được sự cố trong hệ thống phân tán như Microservices.
6. Các transation trên remote services cần có giải pháp thay thế: Saga, two phase commit,...
7. Các aysnc call (trước đó là trigger DB) diễn ra trên khắp services nên chắc chắn sẽ cần message broker (event sourcing) - Kafka, NATS. Nếu không thì các service sẽ call chồng chéo mất kiểm soát.
8. Bây giờ là câu chuyện mấy chục, mấy trăm service nên sẽ cần hệ thống auto scaling từ hạ tầng tới application (Terraform, k8s,...)

Các bạn có thể xem thêm seri chia sẻ về quá trình các bạn developer của đối tác mình nghiên cứu và đưa Microservices vào sản phẩm của họ tại đây:

https://egany.com/blogs/microsevices-2-trien-khai-microservices-tinh-gon-de-bat-dau-de-dang-hon