© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Microservices vẫn luôn là một thứ gì đó hay ho và cuốn hút với tất cả chúng ta từ Fresher, Junior, Senior, TA, SA, DevOps thậm chỉ cả BA, QA... Chả thế mà trong JD vẫn luôn có câu:

> Đã làm việc với Microservies là một lợi thế.
> 
> Hoặc..
> 
> Microservices is plus point. 

... mặc dù thực tế toàn thấy làm với Monolithic.. hoặc Microservices chưa đến nơi đến chốn.

> Chém thế thôi chứ làm Microservices đâu có đơn giản. Nhưng nó đem lại kha khá advantages nên vì yêu cứ đâm đầu. Dù rằng những khổ đau nhận lại nhiều không kém.

Quay lại vấn đề chính, Microservices bao gồm rất nhiều thứ xung quanh, các concept, pattern, services... để master hết được là cả một quá trình. Chưa kể phải thực chiến mới hiểu hết được sức mạnh và cả những đau thương mà nó đem lại.

Mở bài dài dài cho nguy hiểm, cùng đi tìm hiểu về một thành phần nho nhỏ là Service Mesh và vai trò của nó trong Microservices Architecture. Let's begin.

## 1) Monolithic to Microservices

Chúng ta có monolith application siêu to khổng lồ với rất nhiều team cùng làm việc trên đống codebase đó. Team A implement feature, team B fix bug, team C refactor... mọi thứ diễn ra vô cùng **"nhộn nhịp"**, nếu không muốn nói là nhốn nháo.

> Chém thế chứ nếu được tổ chức tốt thì cũng không có vấn đề gì. Chỉ là đang lấy ví dụ để thấy được benefit của **Microservices** như thế nào :hammer_and_pick:.

Chiến lược **chia để trị** chưa bao giờ là lỗi thời. Vì vậy mà **Microservies architecture** ra đời, tất nhiên còn nhiều yếu tố khác không bàn luận ở đây.

![](https://i.imgur.com/aUnEZdS.png)

Đại khái idea là từ một service lớn chia thành nhiều services nhỏ hơn để đạt được một vài benefit sau:
- **Faster delivery**: chia thành service nhỏ hơn dẫn đến scope nhỏ hơn, thời gian phát triển nhanh hơn, dễ dàng maintain, update..
- **Isolation**: mỗi service là độc lập với nhau, một service trong microservices nếu crash cũng không ảnh hưởng đến các services khác. Lý thuyết là vậy nhưng để implement chính xác như thế không đơn giản.
- **Scaling**: scale service dựa trên nhu cầu. Không cần scale toàn bộ hệ thống.
- **Flexibility**: đa ngôn ngữ, đa nền tảng.

> Để tránh làm loãng bài viết thì mình chỉ nêu một vài benefit cơ bản như trên.
>
> Ngoài ra, việc chia service thế nào, làm thế nào để chia service... cũng là một câu hỏi hóc búa. Mình sẽ đề cập đến trong bài viết khác.

Việc chia tách thành nhiều services khiến nhu cầu giao tiếp giữa các services tăng vọt. Và chính nhu cầu đó nảy sinh ra nhiều vấn đề:
- Service discovery.
- Load balancing.
- Fault tolerance.
- Distributed tracing.
- Telemetrics.
- Security: mTLS, policies, patches.

Cùng đến với từng vấn đề trước khi làm rõ hơn về Service mesh. 

> Tiết lộ luôn những vấn đề này cũng chính là thứ mà Service mesh sẽ giải quyết cho chúng ta.

## 2) Service discovery

Sau khi chia thành nhiều services, mỗi services có thể chạy trên các physical machine hoặc virtual machine khác nhau. Mỗi VM lại có địa chỉ IP riêng. Vậy làm cách nào để một service có thể biết được địa chỉ của các service khác?

Cách đơn giản hardcode luôn địa chỉ IP :hammer:. Khoan đã, chúng ta là những Engineer chuyên nghiệp, ở đây chúng ta không làm như thế. 

Lỡ VM restart hoàn toàn có khả năng bị đổi IP address, hoặc nếu mỗi service có nhiều instance thì hardcore.. à nhầm hardcode kiểu gì.

Một cách khác pro hơn, sinh ra một service đứng bên ngoài, gọi là **Service registry** làm nhiệm vụ lưu trữ địa chỉ của tất cả services. 
- Mỗi service khi start sẽ đăng kí địa chỉ của mình lên **Service registry**. 
- Khi nào muốn gọi đến service khác sẽ gửi request đến **Service registry** yêu cầu trả về địa chỉ của service đích.

![](https://i.imgur.com/VGjtSc8.png)

Nếu bạn là Java Engineer và đã làm việc với Spring Cloud thì không còn lạ gì với Eureka. Cách thức hoạt động của Eureka chính là mô hình trên, bao gồm 2 components:
- Eureka server.
- Eureka client.

> Note: Eureka là hàng của Netflix OSS (open-source software).

![](https://i.imgur.com/Bd3LK3v.png)

Trông thì tiện lợi nhưng thực tế lại không như thế, có thể kể đến một vài nhược điểm sau:
> - Tất cả các service đều cần code bằng Java và thêm Eureka library, thêm code, giảm tính flexible.
> - Cần manage Eureka server, deploy cluster hoặc multi-replicas để đảm bảo HA.

Ngày nay, các servies không deploy trực tiếp lên các VM theo kiểu Linux service nữa mà đều dùng container và deploy lên các container orchestration như Kubernetes hoặc Docker Swarm. Bản thân các container orchestration đều cung cấp sẵn các giải pháp liên quan đến infrastructure, network, service discovery, tuy nhiên không vì thế mà ta bỏ qua vấn đề này.

## 3) Load balancing

Tiếp theo, trong trường hợp các service được scale với multi-repilcas, cần implement thêm các phần liên quan đến load balancing để cân bằng tải tránh trường hợp tất cả các request đều rơi vào một instance.

Thông thường, LB được đặt ở server-side. Khi các request đến, LB sẽ route request đến một server bất kì dựa trên nhiều tiêu chí và thuật toán khác nhau. Kinh điển nhất là round-robin.

![](https://i.imgur.com/hsUR5b4.png)

Tuy nhiên trong môi trường microservices, khi service gọi service, LB lúc này nằm ở client-side. Nói cách khác, LB là một module của service.

Điều đó có nghĩa là mỗi service cần implement thêm module load balancer. May thay đã có Ribbon library, cũng là hàng của Netflix OSS luôn. Việc cần làm chỉ là add thêm dependency và set up các config tương ứng.

> Như vậy tất cả các service đều cần add Ribbon. Nhưng vô tình nó trở thành một sợi dây vô hình trói buộc tính flexible khi phụ thuộc vào Java.
> 
> Nếu toàn bộ hệ thống đi theo Spring cloud thì chẳng cần bàn luận thêm làm gì. 

![](https://i.imgur.com/MO7KDkI.png)

Và vẫn là các container orchestration như Docker Swarm hoặc K8S đã cung cấp sẵn load balancing cho các request từ service đến service. Nhưng lưu ý rằng không phải lúc nào cũng có thể deploy với container và container orchestration.

> Mấy cái thứ container orchestration bá đạo thật, nhưng để master được nó thì là cả một quá trình gian nan. Chả thế mà người người nhà nhà đổ xô đi học DevOps luôn trong khi chẳng cần biết code, nhận lương khủng vài ngàn USD.
>
> Ops là chủ yếu chứ chẳng thấy Dev đâu :hammer:. Các anh em DevOps chân chính đừng ném đá nhé.

![](https://i.imgur.com/twaoThq.png)

## 4) Deployment

Vừa nhắc đến ở trên xong, lại chọc ngoáy đến deployment, đúng nghề của các anh DevOps đây rồi.

Phần này không đi vào chi tiết từng strategy hay so sánh các strategy với nhau mà muốn chỉ ra khó khăn khi thực hiện upate deployment.

Các deployment strategy có thể kể đến như:
> - Recreate
> - Rolling update
> - Blue/Green
> - Canary
> - A/B testing

Mỗi thứ lại có ưu nhược điểm khác nhau, phụ thuộc vào mục đích của service và đối tượng end user. Tựu chung lại có 2 loại chính:
> - Switch toàn bộ traffic sang version mới: **recreate**, **rolling update**.
> - Chạy 2 version song song: **blue/green**, **canary**, **A/B testing**.

Với hướng đầu tiên, cần đảm bảo tất cả các request đang được serve ở v1.0 hoàn thành trước khi shutdown để switch qua v2.0. 

![](https://i.imgur.com/wIBgq0K.png)

Trong trường hợp muốn thử nghiệm feature mới với một nhóm người dùng trước khi tung ra thị trường, chúng ta sẽ tiếp cận với phương án deploy thứ hai. Chỉ khoảng 5% requests được serve ở v2.0, còn lại 95% tiếp tục sử dụng v1.0. 

Sau một khoảng thời gian, nếu ổn, tiến hành migrate dần dần 95% lượng traffic còn lại sang v2.0.

![](https://i.imgur.com/ydnyflw.png)

Như vậy, cần sinh ra một thứ đứng giữa là **Traffic controller** làm nhiệm vụ điều hướng request.

> Các hệ thống có số lượng người dùng lớn như Facebook, Twitter... hay sử dụng **A/B testing** để release tới end user. Chỉ một số lượng nhỏ user được trải nghiệm trước tính năng mới, **giang cư mận** hay gọi là **người có nhân phẩm**.

--- 

**P/S**: tranh thủ kiếm tìm talent về với team mình. Nếu bạn đang cân nhắc một cơ hội mới với 2 mục tiêu:
- Job remote full time, không quản thúc thời gian hay địa điểm. Bạn hoàn toàn có thể vừa nhâm nhi li cocktail bên bãi biễn, vừa fix bug và trò chuyện với crush.
- Package hàng năm lên tới 50k USD (chưa tính thưởng + bonus), tất nhiên nó còn tùy thuộc vào sự chai lì của bạn.

Đừng ngại ngần [contact](mailto:datbv.other@gmail.com) với mình nếu có nhu cầu nhé. Mà thời buổi này ngại chỉ có thiệt thân thôi, good luck!

---

## 5) Distributed tracing

Tiếp theo là vấn đề liên quan đến tracing request. Chúng ta đã quá quen thuộc với việc các services giao tiếp với nhau trong microservices để hoàn thành một request.

Ví dụ như các ứng dụng thương mại điện tử, người dùng sau khi chọn xong sản phẩm chỉ cần một thao tác duy nhất để hoàn thành đơn hàng. Nhưng phía backend servies là hàng loạt những thứ phức tạp diễn ra:
- Request được gửi tới **Service A** để check tồn kho.
- Đến **Service B** check thông tin khách hàng.
- **Service C** thực hiện thanh toán.
- **Service D** lưu lại lịch sử.
- ...

Như vậy, mỗi request sẽ có cuộc hành trình thú vị từ service này sang service. Tưởng tượng mỗi phút có vài chục thậm chí vài ngàn request như vậy thì việc tracing và debug đúng là.. không dễ dàng. 

> Bình thưởng chẳng ai đi debug làm gì, trừ khi hệ thống gặp sự cố. Mà tất nhiên là chẳng thể đảm bảo 100% hệ thống không bao giờ gặp sự cố, nên việc debug hay tracing sớm hay muộn cũng xảy ra.

Để xử lý bài toán này, mỗi request cần được add thêm một unique id, kéo dài từ thời điểm nhận request đến khi xử lý xong. Mỗi khi log được print sẽ bao gồm luôn unique, như vậy có thể trace toàn bộ luồng request tại tất cả các services.

Sử dụng thư viện cho nhanh, hoặc có thể tự implement nếu muốn với Java Logging MDC. 

Mấy thư viện bên dưới cùng sử dụng Slf4J MDC, có thêm tí UI cho ngầu nữa.
- Spring Cloud Sleuth.
- Jaeger tracing.

## 6) Security

Tiếp tục một bài toán khác cần xử lý trong service to service communication là vấn đề **security**.

### 6.1) Mutual TLS - mTLS

Ngày nay việc sử dụng HTTPS là điều bắt buộc vì những lợi ích mà nó đem lại, bất kể là internal hay external, mà càng internal lại càng cần cẩn thận.

> Chủ yếu các vụ tấn công hoặc lộ thông tin đều xảy ra từ bên trong, điển hình là vụ việc gần đây của công ty bảo mật hàng đầu Việt Nam là... Thôi không cần nói cũng biết :hammer_and_pick:.

Đồng nghĩa với việc cần install cert cho các services để chúng có thể giao tiếp với nhau an toàn. 

Ngoài ra với mục đích tăng thêm tính bảo mật, cần apply **certificate rotation**. Mỗi cert chỉ có thể dùng được trong một khoảng thời gian 2 tuần hoặc 1 tháng, có nghĩa là cần thêm cơ chế để update cert cho các services.

### 6.2) Network policies

Vấn đề tiếp theo liên quan đến bảo mật là **network policies**. Có những service đặc biệt không phải service nào cũng được phép request tới, hoặc các service trong cụm A không được kết nối tới service ở cụm B. Do đó, cần có các rule, config để xác định service nào được quyền kết nối tới service nào. 

## 7) Service mesh

Càng hiện đại thì càng hại điện. Nhiều thứ lằng nhằng rắc rối thật, từ những thứ dính dáng đến code: distributed tracing, load balancing.. cho đến những thứ liên quan đến infrastructure: network policy, deployment...

Tất cả những vấn đề kể trên chủ yếu liên quan đến infrastructure, operation, administrative hay communication. Hầu như chẳng một chút nào dính dáng đến business code.

> Do not burden my code with all these infrastructure related decisions.

Vẫn là câu châm ngôn quen thuộc từ những bài trước: **"Cái gì khó nhằn, phức tạp thì outsource cho nhanh"**. Chúng ta cần một thứ gì đó, một framework, một library hoặc chỉ cần một đoạn code nào đó có thể take care toàn bộ những vấn đề trên.

Và ... khái niệm về **Service mesh** ra đời. Có thể hiểu ngắn gọn rằng **Service mesh** là một infrastructure layer đi kèm cùng mỗi service, có nhiệm vụ giải quyết những vấn đề kể trên. 

Perfect, vậy **Service mesh** giải quyết bài toán thế nào?

### 7.1) Sidecar

Sidecar là một ứng dụng có thể được code bằng Java, Golang, C#... được deploy cùng service, chạy song song với service trên cùng machine, container. Có thể ví von service và sidecar như đôi bạn thân mến thân cùng tiến cùng lùi.

Vậy nhiệm vụ của Sidecar là gì, vì sao chúng lại xuất hiện ở đây?

![](https://i.imgur.com/A4lrShI.png)

Sidecar đóng vai trò như một proxy. Service không giao tiếp trực tiếp với nhau mà phải thông qua Sidecar. Như vậy, toàn bộ công việc liên quan đến infrastructure, communication được **outsource** cho Sidecar. Các Service chỉ cần tập trung vào code business logic, không cần quan tâm đến các vấn đề ở trên nữa.

![](https://i.imgur.com/3r72ZT9.jpg)

> Hình ảnh của **sidecar** sau khi Google.

### 7.2) Data plane & Control plane

Nghe có vẻ không hợp lý lắm. Tự dưng sinh ra Sidecar xong bảo nó giải quyết tất cả các vấn đề. Nó giải quyết thế nào? Theo dõi tiếp xem sao.

Chỉ riêng Sidecar là chưa đủ, cần thêm một component nữa là **Control tower** có nhiệm vụ:
- Quản lý toàn bộ **Sidecar** trong **Service mesh**.
- Centralize configuration: lưu trữ toàn bộ các config liên quan đến LB, Network policies, Traffic management, mTLS certificate...

Như vậy ta đã có đủ bộ components của **Service mesh** với 2 level:
- **Data plane**: **Sidecar** proxy chạy song song với service.
- **Control plane**: đóng vai trò như Service registry. Ngoài ra còn lưu trữ config tập trung, quản lý, điều phối **Sidecar** proxy.

![](https://i.imgur.com/TcU2MCu.png)

### 7.3) Traffic management

Lúc này, **Control tower** control toàn bộ **Sidecar** dẫn đến việc có thể dễ dàng kiểm soát lưu lượng traffic đến mỗi service. Ví dụ:
- Service B deploy version mới sử dụng canary stratege và chỉ muốn xử lý 5% lượng requests phục vụ cho testing. 95% requests còn lại vẫn được xử lý ở service version cũ.
- Một trường hợp khác, Service A chỉ xử lý những request đến từ iPhone bằng cách check request header, nếu không thì route đến service B.

![](https://i.imgur.com/vMlMPN4.png)

## 8) Có thật sự cần Service mesh?

Qua các vấn đề kể trên và cách giải quyết với **Service mesh**, có thể hình dung được ưu/nhược điểm như sau:

|Advantage|Disadvantage|
|-|-|
|Tập trung vào business logic. Tách biệt communication và infrastructure ra khỏi code base.|Cồng kềnh, phức tạp, cần đội ngũ Engineer chất lượng để implement.|

Tất nhiên chẳng tự dưng mà các Engineer đẻ ra **Service mesh** làm gì nếu không dùng đến. Mấu chốt cần quan tâm là khi nào nên dùng nó?

Có thể dựa trên một vài tiêu chí sau để quyết định có cần sử dụng **Service mesh** không:
> - **Số lượng services trong hệ thống**: tỉ dụ có dăm ba service mà triển khai **Service mesh** thì.. cũng được thôi, nhưng tốn tiền của, nhân lực mà không đem lại lợi ích nhiều.
> - **Tính cấp bách và project's size**: nếu project nhỏ hoặc vừa, scope ổn định không thay đổi nhiều. Dự án cần release gấp thì.. cứ phệt theo cách truyền thống thôi. Khi nào có time refactor sau... nhưng không biết đến bao giờ.
> - **Phụ thuộc vào tổ chức và đội nhóm**: chẳng thể nào một tay che trời. Cái này ai có thâm niên rồi sẽ hiểu :hammer_and_pick:.

![](https://i.imgur.com/TDGySyQ.png)

### After credit

Bài viết này nhằm mục đích giới thiệu về concept và cách thức hoạt động của **Service mesh** trong Microservices architecture. Thực tế khi implement sẽ phức tạp hơn nhiều lần, một vài framework được ưa chuộng để làm Service mesh có thể kể đến:
> - [Istio](https://github.com/istio/istio)
> - [Linkerd](https://github.com/linkerd/linkerd2)
> - [Consul](https://github.com/hashicorp/consul)
> - [OSM](https://github.com/openservicemesh/osm)
> - [Traefik Mesh](https://github.com/traefik/mesh)

Bài viết sau sẽ thực hành với **Istio**.. nhưng cũng chưa rõ là bao giờ :joy:.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)