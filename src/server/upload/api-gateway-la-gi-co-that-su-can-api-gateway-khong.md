© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/aWj53xePK6m)

Tiếp tục một chủ đề đã có quá nhiều bài viết, nhưng nếu bạn đã quen với style của mình thì chắc chắn sẽ biết nó rất khác với phần còn lại. Khác như thế nào thì... đọc thôi bạn êi.

Gét gô!

Trước khi đi vào chi tiết chúng ta cần hiểu qua về [**reverse proxy**](https://viblo.asia/p/forward-proxy-va-reverse-proxy-WAyK8rM9lxX#_3-reverse-proxy-4).

## I) Câu chuyện về Backend & Frontend developer

Đầu tiên cần hiểu rằng API Gateway là concept vô cùng.. quan trọng trong MSA (Microservices Architecture). Thế nó quan trọng thế nào, vì sao nó quan trọng, không có nó thì chuyện gì xảy ra?

Lấy ví dụ trước, mình thích ví dụ vì nó sinh động, trực quan, dễ hiểu.

Vẫn là cô giáo Thảo, nhưng lần này Thảo chuyển ngành sang làm Senior Backend Engineer làm cho sàn thương mại điện tử top đầu Ađâynè. Thảo build e-commerce application của công ty sử dụng MSA với rất nhiều các services: Product service, Cart service, Catalog service, User service... Mọi thứ vô cùng hoàn hảo, áp dụng [Saga pattern](https://viblo.asia/p/distributed-transaction-saga-pattern-naQZRRnPZvx) để handle distributed transaction, sử dụng Message broker để loose-coupling, cụ thể là [Kafka](https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2) cho nó hot trend, à dạo gần đây thì cũng không còn hot lắm. Apply nhiều concept, pattern... để hệ thống chạy ổn định và mượt mà.

![](https://i.imgur.com/cecuJnd.png)

Đến đây các bạn đã ngầm đoán ra được mục đích của API Gateway là gì chưa? Mình mạnh dạn đoán đa số trong số chúng ta nghĩ thế này, xem có đúng không nhé:
> Nếu có vài servies như trên thì việc communication giữa các service trông vẫn khá clear, nhưng nếu có vài chục hoặc hàng trăm communication thì chả khác nào nồi lẩu thập cẩm 500k. Và API Gateway được sinh ra như một cầu nối giữa các service với nhau. Lúc này các service communicate với nhau theo dạng hình sao (**star**).
>
> ![](https://i.imgur.com/4qtCHwX.png)

Hãy thành thật đi, có phải các bạn đang nghĩ như trên không? 

Nghĩ như trên không có gì sai, nó cũng là lợi ích và một phần mục đích của API Gateway. Tuy nhiên mục đích ban đầu của nó không phải như vậy. Giờ hãy nghĩ thử nếu các service không call RESTful API mà giao tiếp thông qua Message broker hoặc các loại protocol khác thì sao? Lúc này chẳng phải [Kafka](https://viblo.asia/s/apache-kafka-tu-zero-den-one-aGK7jPbA5j2), ActiveMQ.. đều có thể thay thế được vai trò của API Gateway?

Vậy cụ tỉ API Gateway được sinh ra với mục đích gì? 

Cùng khám phá tiếp câu chuyện của Thảo ở Ađâynè để hiểu rõ hơn. 

Nhờ bàn tay ma thuật của Thảo mà hệ thống backend chạy cực kì nuột nà. Tất cả API đều ready chỉ chờ front-end implement/integrate.

Tokuda là Frontend Developer chịu trách nhiệm làm UX/UI và implementation. Vì cũng mới vào nghề nên Tokuda chưa nắm rõ các quy trình khi làm việc. Nhưng không sao học dần dần.

> Tokuda nào thì mình không biết chứ Tokuda này mới vào nghề thật các bạn ạ.

Tokuda đang làm màn hình đầu tiên là **homepage**, hiển thị các thông tin liên quan đến catalog. Tokuda hỏi Thảo:

- **Tokuda**: em cần thông tin của **catalog** để hiển thị trên **homepage**, dùng API nào chị Thảo?
- **Thảo**: dùng API getCatalogs ở **Catalog service** em nhé.

Tokuda về implement sử dụng API ở **Catalog service**, nhưng tòi ra một cái là cần hiển thị thông tin user đang login. Tokuda tiếp tục hỏi chị Thảo:

- **Tokuda**: em cần thông tin của **user**, em check ở **Catalog service** không thấy có API này?
- **Thảo**: đương nhiên nó nằm ở **User service** rồi em, API getUserDetail nhé.
- **Tokuda**: ok chị.

Tokuda lật đật về chỗ implement tiếp, vẫn thiếu thông tin detail cart info. 

- **Tokuda**: thông tin **detail cart info** ở **Cart service** đúng không chị Thảo?
- **Thảo**: ku em thông minh hơn rồi đấy.
- **Tokuda**: ok chị...

Sau bao ngày lao động vất vả, Bình đã implement xong front-end, tổng cộng Bình phải gọi đến 4 - 5 services khác nhau để lấy đủ thông tin hiển thị lên UI.

...

Cuối cùng, sản phẩm cũng được release, deploy to production và cả team đi ăn mừng chiến thắng. Tất nhiên sau đó sẽ là chuỗi ngày xử lí các issue trên production (project nào mà chả thế), và đến một lúc Thảo chợt nhận ra phải refactor đống smell code này, nó không perfect như Thảo đã nghĩ...

 Thảo quyết định tách **User service** thành 2 services là **Profile service** và **Session service**. Nhưng khoan, UI đang work ngon lành, nếu refactor như vậy thì front-end cũng cần sửa theo. Không còn cách nào khác, Thảo lon ton ra vỗ vai thằng em:
 - **Thảo**: này ku em, mày update lại đống API gọi sang **User service** cho chị nhé!
 - **Tokuda**: sao thế ạ?
 - **Thảo**: vì... chị mày refactor code! Tao tách thành 2 services mới, liệu mà sửa nhé.
 - **Tokuda**: ... vâng (nghẹn ngào và đắng cay).

...

Mình hi vọng rằng sau câu chuyện bịa ra bên trên thì chúng ta phần nào hiểu API Gateway được sinh ra để làm gì :joy_cat:.

## 2) Abstraction layer

Thảo đã đi một bước thẳng xuống lòng đất, nếu chúng ta là Thảo thì chúng ta làm thế nào?

Tokuda - Frontend developer về mặt lý thuyết không cần quan tâm có bao nhiêu service phía BE, các service được chia thế nào. Tokuda chỉ muốn **chọc** vào... à nhầm access vào duy nhất một endpoint để lấy được đầy đủ thông tin cần thiết.

Lúc này, cần tạo một abstract layer có nhiệm vụ nhận request từ client, điều hướng đến các micro-services phía sau để xử lý, sau đó trả response về client. Theo ngôn ngữ học thuật là apply Facade design pattern.

![](https://i.imgur.com/QjhgWDv.png)

Nếu hệ thống được thiết kế như trên, Tokuda chỉ cần quan tâm đến một endpoint duy nhất để thực hiện implement frontend (tất nhiên phải có API document). Lúc này, abstraction layer đóng vai trò như traffic controller điều hướng request đến một/nhiều service nào để lấy data và response cho client.

> Như vậy, Thảo có thể thoải mái refactor đống microservices của mình, cộng thêm việc sửa abstraction layer để đảm bảo API vẫn hoạt động đúng. 

Và abstraction layer phía trên chính là ý tưởng ban đầu để hình thành nên **API Gateway**.

## 2) API Gateway

Các bước tạo API Gateway gồm 2 steps:
- List các public APIs.
- Implement API bên phía Gateway, có thể là forward/composite/aggregate tuỳ thuộc mục đích của bạn.

Rất đơn giản, nhưng để implement thì đúng là.. hơi gian nan.

Nên thường chúng ta chọn các OSS (open-source software) hoặc cao cấp hơn là chơi với các enterprise software hoặc hơn nữa là Cloud platform để làm API Gateway:
- Zuul by Netflix
- Kong API Gateway 
- Nginx
- Amazon API Gateway

> Bài này chỉ giới thiệu về API Gateway và sự hình thành của nó nên mình không đi vào chi tiết implementation. Anh chị em bạn dì có thể search tutorials để practice thêm nếu muốn.

Cùng đến với phần tiếp theo để tìm hiểu thêm về pros & cons của API Gateway.

## 3) Pros & Cons

### 3.1) Pros

#### 3.1.1) Decrease MSA complexity

Ví dụ trên chính là một ưu điểm điển hình của API Gateway trong việc giảm độ phức tạp khi implement application với MSA. Ngoài ra, API Gateway còn làm được nhiều thứ hơn thế nữa.

Mọi request từ FE đến BE đều phải đi qua API Gateway nên ta có thể làm được rất nhiều thứ hay ho ở đây:
- **Rate limit**: thay vì tất cả các service implement **rate limit** thì chỉ cần tập trung tại một chỗ ở API Gateway.
- **Token authn/authz**: việc xác thực token, phân quyền, kiểm tra kiểm soát... hoàn toàn có thể thực hiện tại API Gateway thay vì request trực tiếp đến các service bên trong, giảm thiểu công sức implement tại từng service.

Như vậy các micro-services chỉ cần tập trung vào xử lí business, không cần bận tâm đến những vấn đề trên, đã có API Gateway gánh rồi.

#### 3.1.2) Cross-cutting concern

Những phần này đã quá quen thuộc, mình đã giới thiệu ở bài trước [Forward proxy và Reverse proxy](/SOkG1wrnTWmhODT-rE2bhw). Cơ bản API Gateway là một Reverse proxy nên có những tính chất và ưu điểm tương tự Reverse proxy:
- Tăng thêm một lớp bảo mật tới hệ thống: ngăn một phần DDoS, chặn các request lạ...
- Theo dõi, monitor API, quản lý lưu lượng traffic. Các hệ thống API Gateway xịn sò hiện này đều cung cấp sẵn với GUI tuyệt đẹp, dễ sử dụng.
- Phân tích, thống kê các request đến từ đâu... thậm chí hỗ trợ dev debug khi hệ thống gặp sự cố.

#### 3.1.3) Protocol translating

Chuyển đổi các dạng protocol khác nhau để phù hợp với từng bài toán cụ thể. HTTP -> TCP, TCP -> gRPC...

Trên đây là các benefit chính chúng ta cần quan tâm, ngoài ra còn khơ khớ các benefit khác dễ dàng tìm kiếm được trên Google.

### 3.2) Cons

Ưu điểm thì cũng nhiều nhưng nhược điểm cũng không thua kém. 

- **Latency**: chắc chắn khi có thêm layer đứng giữa thì response time sẽ tăng lên.
- **Single-point failure**: nếu chỉ deploy API Gateway với single instance thì có thể phải đối mặt với single-point failure và bottle-neck.
- **Cost**: hàng loạt các chi phí liên quan để quản lý API Gateway: resource, time, operation, thậm chí nếu sử dụng các Enteprise edition thì chi phí bản quyền cũng là một thứ cần để ý.
- **Complexity**: nó giúp giảm độ phức tạp khi implement MSA thật đấy nhưng về tổng hệ cả hệ thống thì chưa chắc. Cần team có kĩ năng thực sự tốt để control được API Gateway. Ngoài ra cũng cần impl thêm Service registry / Service discovery để tối đa hóa được ưu điểm của API Gateway.
- **Security**: ưu điểm là xác thực/phân quyền tập trung thật đấy, nhưng nó cũng là điểm dở. Vì chỉ cần sai sót trong quá trình implement hoặc có một lỗ hổng bảo mật nào đó thì không chỉ một mà toàn bộ các services đều có thể bị tấn công.

## 4) Backend for Frontend (BFF)

Như vậy ta đã nắm khá cụ tỉ về API Gateway cùng những ưu/nhược điểm nó đem lại. Cùng đi tìm hiểu thêm một communication pattern khác trong MSA đó là BFF để xem có gì hay ho. 

> Trong MSA, có 3 loại communication pattern phổ biến là:
> - **Direct call**: là việc FE request trực tiếp tới BE mà không thông qua API Gateway.
> - **API Gateway**: API Gateway đứng giữa request từ FE đến BE.
> - **BFF**: bản chất vẫn là API Gateway đứng giữa nhưng là nhiều gateway cho nhiều client type.

Tình huống đơn giản thế này, sau khi Thảo biết về API Gateway liền lập tức triển khai cho dự án và transfer cho Tokuda. Và thế là tình chị chị em em lại khăng **khít** như xưa (à cũng không còn **khít** lắm). Dự án release thành công ngoài mong đợi. Ban lãnh đạo thấy vậy quyết định tung ra phiên bản Mobile app để tiện hơn cho người dùng. 

Ozawa là Senior iOS Engineer được giao nhiệm vụ triển khai con app này. API có đầy đủ rồi chỉ việc impl và integrate là xong. Khổ nỗi màn hình iPhone bé tí tẹo làm sao hiển thị hết thông tin, thế là một vài API dùng cho Web app response vài chục field thì với Mobile app chỉ dùng được vài field mà thôi. 
> Tỉ dụ Web app là 30 fields còn mobile app chỉ cần 10 fields, thế là thừa mất 20 fields. Số lượng users cỡ vài chục nghìn x với lượng data thừa... lãng phí quá.

Thế là BFF ra đời với ý tưởng cực kì đơn giản: làm 2 bộ API Gateway khác nhau, một cho Web app và một cho Mobile app. Như vậy, client tự do trong việc lựa chọn các tập API tương thích nhất để tối ưu hóa được nhiều thứ.

![](https://i.imgur.com/WOBffv3.png)

> Mình tin rằng một vài bạn sẽ lóe lên trong đầu câu hỏi: **sao không dùng GraphQL nhỉ?** Vì mình cũng có câu hỏi tương tự. Nếu bạn chưa biết GraphQL là gì thì có thể Google để có thêm thông tin nhé. Còn câu trả lời thì.. hẹn gặp ở bài tiếp theo.

## 5) Có thật sự cần đến API Gateway?

Mãi mới đến phần quan trọng, thế cuối cùng có cần đến API Gateway khi triển khai MSA không? Khi nào cần và khi nào không cần?

Thực ra câu trả lời.. tùy thuộc vào hoàn cảnh của bạn. Các ưu nhược điểm cơ bản bên trên là một phần của câu trả lời.

Ngoài ra một vài yếu tố khác cũng ảnh hưởng đến quyết định có sử dụng API Gateway hay không:

- **Project size**: dự án không quá lớn, số lượng service đếm trên đầu ngón tay thì đôi khi việc triển khai API Gateway chưa thực sự cần thiết tại thời điểm đó. Ngoài ra nếu FE không hiển thị các thông tin của nhiều service mà chỉ là FE riêng lẻ cho từng service thì cũng chưa cần đến API Gateway.

- **Timeline**: nếu dự án cần triển khai trong thời gian gấp rút, deploy thần tốc thì cứ theo cách truyền thống làm trước đã. Việc đi ngay với API Gateway từ đầu có thể tốn thời gian nếu không có đội ngũ nhiều kinh nghiệm. 

- **Team skill**: nếu sử dụng **buy decision** thì không cần quá quan ngại. Nhưng nếu đi theo **build decision**, bạn tự build một API Gateway đáp ứng đúng nhu cầu cần thiết của dự án thì... **team skill** là thứ cần đặt lên bàn cân.

### After credit

Nếu đã quyết định và chốt phương án sử dụng API Gateway thì... vấn đề đau não tiếp theo là nên đi theo hướng nào: **build** or **buy**. Nhà giàu lắm tiền nhiều của mua luôn giải pháp có sẵn, support 24/7 cho khỏe. Hay là team ngon thì tự build cho hoành tá tràng, tuy hơi vất vả nhưng có kha khá lợi ích.

Mình thấy hiện tại có 2 loại khá phổ biến là **Kong Gateway** và **AWS API Gateway**.
- **Kong Gateway**: có cả free-tier (open-source) và enterprise-tier, community lớn và cũng hỗ trợ nhiều plugin.
- **Cloud Gateway** (AWS, GCP, Azure...): tất nhiên là hàng trả phí rồi (có free-tier nhưng dành cho những bài lab nghịch ngợm thôi), cộng đồng nhỏ hơn so với Kong Gateway và số lượng plugin cũng không đa dạng. Nếu đi theo Gateway dạng này thì chắc chắn sẽ gặp bài toán **vendor lock-in**. Nhưng cũng chẳng phải gì quá quan trọng.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/aWj53xePK6m)