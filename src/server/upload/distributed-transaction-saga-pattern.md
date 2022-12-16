Tiếp tục chủ đề distributed transaction, bài viết này sẽ giới thiệu về SAGA pattern. Let's begin!

> Bạn có thể đọc bài viết trước về 2-phase commit tại [đây](https://viblo.asia/p/naQZRBemZvx).

[Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

## 1) Scenario

Phải có vấn đề thì mới sinh ra giải pháp để giải quyết vấn đề đó. Thế vấn đề ở đây là gì?

Thảo hiện tại là Solution Architect của team IT thuộc chuỗi cửa hàng `Pizza và những con bug không thể fix`. Thời buổi dịch bệnh khó khăn, chủ doanh nghiệp muốn Thảo thiết kế hệ thống bán hàng online để tăng doanh số. Vì đã có thâm niên chục năm vén váy.. à nhầm.. vén tay áo.. nên Thảo rất nhanh apply ngay Microservices Architecture bao gồm các services:
- **Order service**.
- **Payment service**.
- **Restaurant service**.
- **Delivery service**.

Quá trình hoàn tất ship một chiếc `pizza bò dứa không xúc xích` bao gồm các 5 bước:

![](https://i.imgur.com/pGTplm2.png)

- :one:: khách hàng tiến hành đặt order online, trigger **order service**.
- :two:: sau khi tạo order với state **CREATED**, **order service** trigger **payment service** để thực hiện thanh toán.
- :three:: thanh toán thành công, **payment service** respond về **order service** báo đã thanh toán thành công, chuyển order state thành **PAID**, đồng thời trigger tiếp **restaurant service** để chuẩn bị món ăn.
- :four: sau khi nhà hàng thực hiện xong, respond về **order service** update order state thành **PREPARED**, trigger **delivery service** để giao hàng.
- :five:: giao hàng thành công, **delivery service** gửi message cuối cùng về **order service** để **COMPLETED** order.

Flow quá chuẩn chỉnh không một sai sót. Nhưng vấn đề là cần implement như thế nào, handle transaction như thế nào để không xảy ra chuyện đã thanh toán thành công nhưng lại không nhận được pizza?

Với những bài toán dạng thế này, các transaction không bắt buộc tightly coupled (không bắt buộc việc thanh toán và nhận pizza diễn ra đồng thời), các action có thể được rollback nếu workflow xảy ra lỗi, thì chúng ta có thể apply SAGA pattern.

Cụ thể hơn, SAGA pattern xử lí distributed transaction với 2 cách thức là **choreography** và **orchestration**.
- **Choreography - Event based**.
- **Orchestration - Command based**.

Trước khi đi vào chi tiết thì cần hiểu **event** và **command** là gì đã.
- **Event**: về cơ bản **event** nói về một điều gì đó đã xảy ra. Mang tính chất thông báo, giống như **notification**. Tối nay có trận derby thành Manchester giữa MU và MC (**event**), việc bạn có xem hay không là chuyện của bạn (**no response required**).
  > Bây giờ phải là MC và Liverpool mới hấp dẫn chứ MU thì... Mình mạnh dạn đoán luôn CK C1 năm nay là MC vs Liverpool và hòa 2 - 2 trong 90'. Chờ kết quả cuối tháng 5 xem như nào.
- **Command**: là một yêu cầu, phía nhận command phải thực hiện, và phía yêu cầu mong muốn có response. Kiểu bạn nhờ nóc nhà lấy hộ.. ly nước (**command**). Và bạn expect sau đó bạn sẽ có ly nước (**response required**).. trong thực tế có thể không có ly nước nào, thay vào đó là vài cái.. dép. Nói nhỏ thế thôi, nóc nhà nào chứ nóc nhà mình không thế đâu các bạn ạ :joy:.

## 2) Orchestration - Command based

Theo khái niệm, SAGA orchestration là cách điều phối các local transaction để các transaction được execute hoặc rollback đúng thứ tự. Việc execute hay rollback phụ thuộc vào yêu cầu của orchestrator.

### 2.1) Happy path

Để đơn giản hoá và dễ hình dung, hãy coi 4 services trên tương đương với 4 vị trí trong cửa hàng thực hiện 4 nhiệm vụ khác nhau:
- **Order service** - **Nhân viên trực tổng đài** - **Ông bác Tokuda**:  nhận order từ khách.
- **Payment service** - **Thu ngân** - **Em gái Melody Mark**: thu tiền chứ còn làm gì nữa :money_mouth_face:.
- **Restaurant service** - **Nhà bếp** - **Master chef Angela White AW**: nấu đồ ăn.
- **Delivery service** - **Shipper** - **Cô chị Reiko Kobayakawa**: mặc dù đã lớn tuổi nhưng vẫn nhiệt huyết với nghề.

> Team có vẻ mạnh, toàn hảo hán các phương thế này. Thanh niên mới lớn nào nghe tên mà thấy không quen thì cũng đừng Google nhé, cảnh báo trước rồi đấy.

Cùng xem quá trình order một chiếc pizza diễn ra như thế nào với SAGA orchestration!

Quên, còn một thứ không thể thiếu là **orchestrator service** - **điều phối viên** - **tổ trưởng trẻ trung Karla Kush**: đóng vai trò trung gian control toàn bộ quá trình order một chiếc pizza từ đầu đến cuối.

Đầu tiên khách hàng chọn món và order online. Ông bác Tokuda (**order service**) nhận request, tạo order với state **CREATED**. Sau đó gửi message đến Karla Kush (**orchestrator**) báo rằng order đã được tạo, toàn bộ việc còn lại là của cháu đấy (thì đúng là tuổi cháu thật).

![](https://i.imgur.com/QAu4gmH.png)

Karla Kush (**orchestrator**) nhận command từ bác Tokuda (**order service**), sau đó tiến hành phân tích và gửi một command khác đến Melody Mark (**payment service**) yêu cầu thanh toán đi em êi order được tạo rồi nhé bla blo... Sau đó Karla (**orchestrator**) báo lại cho bác Tokuda (**order service**) là: cháu bảo em Melody thanh toán rồi bác nhé, tí bác nhớ thưởng cho cháu vài cây kem đấy.

Melody Mark (**payment service**) nhận command từ Karla (**orchestrator**), ngay lập tức tiến hành thanh toán. Khổ nỗi máy POS gặp trục trặc nên Melody phải **retry** mấy lần mới được, tí nữa thì đập cmn máy, bực vcđ. Bác Tokuda thấy thế nhẹ nhàng bảo Meolody cứ từ từ, làm tốt tí bác cũng thưởng cho mấy cái kem, tình chị em lại càng thêm thắm thiết. Nhờ nghe lời bác mà Melody cũng hoàn thành task, respond lại trừ tiền thành công. Melody hết nhiệm vụ, Karla lại phải ra tay xử lí tiếp.

![](https://i.imgur.com/Yf4xaP3.png)

Có mỗi cái việc cà thẻ cũng không xong, Karla thầm nghĩ, đừng hòng ăn kem của bác Tokuda. Karla (**orchestrator**) nhận response từ Melody (**payment service**) và thông báo lại cho bác Tokuda (**order service**) rằng đơn hàng đã được thanh toán, cập nhật order state đi bác. Rồi Karla lại lật đật chạy ra bảo chị AW (**restaurant service**) chuẩn bị món ăn.

Chị AW (**restaurant service**) nhận yêu cầu từ Karla (**orchestrator**) và tiến hành chuẩn bị chiếc pizza. Nhờ kinh nghiệm lâu năm nên chả mấy chốc đã hoàn tất, AW (**restaurant service**) báo với Karla (**orchestrator**) rằng mọi thứ đã xong. Nhanh nhanh chị em mình cùng di ăn kem.

![](https://i.imgur.com/xKQSlCQ.png)

Karla (**orchestrator**) nhận response từ AW, báo lại bác Tokuda (**order service**) rằng món ăn đã chuẩn bị xong, cập nhật state cho order. Và không quên thông báo cho cô chị Reiko (**delivery service**) lấy hàng ship cho khách.

Reiko (**delivery service**) nhận lệnh đi ngay lập tức. Sau khi ship thành công, Reiko (**delivery service**) báo lại Karla (**orchestrator**), Karla (**orchestrator**) tiếp tục báo lại cho bác Tokuda (**order service**) rằng toàn bộ quá trình đã hoàn tất, update state thành **ORDER_COMPLETED**.

![](https://i.imgur.com/vSKwCNr.png)

Ok, cũng không có gì phức tạp, khá đơn giản dễ hiểu. Nhưng mà.. thương bác Tokuda, thương em gái Karla vất vả, thôi thì hai bác cháu rủ nhau đi.... ăn kem lấy lại tinh thần làm việc vậy.

Ví dụ trên mới là happy path thôi, thực tế còn rất nhiều tình huống oái oăm có thể xảy ra.

### 2.2) Exception handling

Nếu trong quá trình chuẩn bị món ăn, nhà bếp (**restaurant service**) hết nguyên liệu thì xử lí thế nào?

Thực tế có 2 cách xử lí như sau:
- **Retry**: AW sai nhân viên đi mua nguyên liệu nhanh còn kịp. Sau khi có đầy đủ nguyên liệu thì thực hiện tiếp công việc.
- **Abort**: báo lại cho Karla (**orchestrator**) rằng nhà bếp không thể xử lí được tình huống này. Karla nhận thông tin và báo lại cho Melody (**payment service**) hoàn trả tiền vào thẻ cho khách. Sau đó báo tiếp đến bác Tokuda (**order service**) update order, gọi điện xin lỗi khách.

Dễ hình dung hơn rồi đúng không, điều tương tự xảy ra trong lập trình:
- **Retry**: restaurant service cần có cơ chế retry cho đến khi nào thành công.
- **Abort**: hoặc retry fail quá nhiều (hoặc k cần retry) thì báo lại cho **orchestrator service** để có phương án phù hợp hơn.

Đấy là tưởng tượng thì nó thế thôi, còn implement phức tạp hơn nhiều lần, có vô số các thứ cần phải xử lí như:
- Retry như thế nào? State cần lưu ở đâu để đảm bảo vẫn có thể retry nếu service crash...
- Retry bao lâu, trường hợp nào thì retry, trường hợp nào abort...
- Đấy là còn chưa bàn đến backbone communication: REST API, gRPC, Message broker...

Đó là tất tần tật về **SAGA pattern orchestrator - command based**. Dễ hiểu và hình dung rồi đúng không? Bài sau chắc làm cái demo thực tế cho vui. 

### 2.3) Characteristic

Bất kì cách tiếp cận nào cũng có 2 phần là ưu điểm và nhược điểm, vấn đề là cần nắm rõ 2 phần này để áp dụng sao cho tối ưu được ưu điểm và hạn chế được nhược điểm.

#### 2.3.1) Benefits

**Good for complex workflow / Less coupling**: trong trường hợp có nhiều services hoặc khả năng trong tương lai có thêm các services khác join vào workflow thì SAGA orchestration là sự lựa chọn phù hợp. Lí do vì service mới không cần biết về state hiện tại của workflow cũng không cần care các services khác đang làm như thế nào, chỉ cần cung cấp 2 state cơ bản EXECUTE / ROLLBACK là có thể hoạt động. Hơi khổ cho orchestrator tí, phải control thêm state, sửa code, nhưng gần như không ảnh hưởng đến các service hiện tại.

**Separation of concerns**: orchestrator làm nhiệm vụ control state, quyết định EXECUTE / ROLLBACK transaction nào. Hay nói cách khác, toàn bộ business logic tập trung tại orchestrator. Do đó các service không cần biết về các state của service khác, dẫn tới việc dễ dàng hơn trong implement.

#### 2.3.2) Drawbacks

**Single-point failure**: nếu **orchestrator** gặp sự cố thì toàn bộ tất cả các workflow đều dừng hoạt động.  Nhưng với các modern application ngày nay thì đa số deploy multiple instance cả rồi nên không cần lo lắng lắm.

**Bottle neck / Letancy**: **orchestrator** chịu trách nhiệm việc control state, send command cho toàn bộ các workflow. Một service không trực tiếp gửi command đến service khác mà phải thông qua **orchestrator**, more round trip, higher letancy. Nếu số lượng service trong workflow là vài chục thậm chí vài trăm thì.. há mồm. Design không cẩn thận rất dễ dính vào cái bẫy **distributed monolithic application**. Ngoài ra các service tuy là tách biệt về business logic nhưng trên thực tế mỗi service đều cần chờ **command** từ orchestrator để execute, sau đó reply result. Như vậy nếu một service xử lý fail thì tổng thời gian complete workflow tăng lên đáng kể.

## 3) Choreography - Event based

Ok, cùng đến với **choreography - event based** xem có gì cải tiến hơn không.

Hiểu đơn giản SAGA choreography loại bỏ **orchestrator** khỏi workflow, như vậy các service giao tiếp **trực tiếp** với nhau để hoàn thành nhiệm vụ.

> Các cháu thương bác Tokuda quá đây mà.

### 3.1) Happy path

Vẫn là quán Pizza ngon nhất Vịnh Bắc Bộ, làm việc theo kiểu cũ em Karla thấy mệt, các nhân viên chẳng tương tác gì với nhau mà cứ thông qua mình. Karla thấy không hiệu quả, Karla quyết định rút lui, để họ tự làm việc.

> Karla phải học tập bác Tokuda kìa, dù tuổi đã cao nhưng vẫn rất tâm huyết với nghề.

Vẫn là 4 vị trí tương đương với 4 services:
- **Order service** - Tokuda
- **Payment service**  - Melody Mark
- **Restaurant service** - Angela White
- **Delivery service** - Reiko Kobayakawa

Cùng xem quá trình order một chiếc `pizza gà nấm không cà chua` với SAGA choreography sẽ diễn ra thế nào. 

Khách hàng chọn món và order online (**order service**). Bác Tokuda (**order service**) nhận yêu cầu, tạo order với state CREATED. Sau đó chuyển thông tin credit/debit card cho Melody (**payment service**) thanh toán. 

> Về phương thức communication có thể là trực tiếp (HTTP/TCP) hoặc gián tiếp (Message broker). Tất nhiên để đảm bảo HA và loose-coupling thì Message broker là lựa chọn hàng đầu.

![](https://i.imgur.com/lIEt7Lo.png)

Sau khi cààà... thẻ thành công, Melody (**payment service**) báo lại bác Tokuda (**order service**) cập nhật order state thành ORDER_PAID, đồng thời báo AW (**restaurant service**) chuẩn bị đồ ăn.

![](https://i.imgur.com/LcyN64n.png)

Sau 15 phút món ăn đã sẵn sàng, AW (**restaurant service**) báo lại bác Tokuda (**order service**) cập nhật order state và báo luôn Reiko (**delivery service**) giao đồ cho khách.

![](https://i.imgur.com/Xwif2Ii.png)

Sau khi giao hàng thành công, Reiko (**delivery service**) báo lại bác Tokuda (**order service**). Lúc này bác Tokuda (**order service**) cập nhật state order và complete flow.

![](https://i.imgur.com/uKfqzjK.png)

Mới nhìn thì có vẻ đơn giản hơn **SAGA orchestration**, nhưng sự thật có như thế không, thử suy nghĩ trước khi đi tiếp nhé.

> Cần lưu ý rằng một event **ORDER_CREATED** có thể trigger đồng thời nhiều service khác chứ không chỉ một service. Hoàn toàn có thể implement theo hướng trigger đồng thời **payment service** và **restaurant service**, tuy nhiên việc xử lý exception sẽ phức tạp hơn đôi chút.
>
> Hoặc tạo một service khác là **notification-service** cũng listen event **ORDER_CREATED** để gửi thông báo đến client.. Tóm lại, idea là có thể có nhiều service cùng listen một **event** để execute business logic.

### 3.2) Exeption handling

Về cơ bản vẫn là cơ chế EXECUTE / RETRY or ROLLBACK diễn ra theo dây chuyền. Nếu AW (**restaurant service**) không thể chuẩn bị món ăn, họ cần báo lại cho Melody (**payment service**) để thực hiện hoàn tiền. Sau đó Melody (**payment service**) báo lại cho bác Tokuda (**order service**). 

> Mọi thứ được diễn ra ngược lại so với lúc bắt đầu.

### 3.3) Characteristic

Về cơ bản, các service listen event từ các service khác để quyết định nên làm gì tiếp theo. Việc không có **orchestration** làm giảm độ phức tạp tổng thể, nhưng việc **implement** và **maintain** với các workflow lớn có thể phức tạp hơn nhiều lần.

#### 3.3.1) Benefits

**No extra service / Simplicity**: không cần thêm service để quản lý state, workflow.

**No single-point failure**: trách nhiệm được phân chia đều cho tất cả các service trong workflow. Ngoài ra việc chạy multi-instances cho các service cũng là điều hết sức phổ biến nên gần như không có **single-point failure**.

**Loose coupling / Fault tolerance**: nếu cần thêm service mới, đơn giản chỉ cần listen trên các **event** có sẵn (hoặc tạo mới cũng chẳng có vấn đề gì), như vậy thêm thêm/bớt các service diễn ra hoàn toàn không phụ thuộc vào nhau. Tuy nhiên có ảnh hưởng đến business logic hay không lại là bài toán của lúc design. Ví dụ có thể thêm **notification service** listen event **ORDER_PREPARED** để thực hiện thông báo đến khách hàng rằng món ăn đã chuẩn bị xong, vui lòng chờ trong giây lát.

#### 3.3.2) Drawbacks

**Difficult to maintain/understand**: nếu cần thêm step, thêm event, thêm service, khả năng cao chúng ta cần sửa cả những service publish event liên quan đến service mới. Ngoài ra việc các business phân tán ở nhiều chỗ khiến việc hiểu toàn bộ flow.. khó khăn hơn.

**Risk of cyclic dependency**: nếu workflow lớn mà thiết kế không cẩn thận, không clean code thì khả năng cao các service được trigger thành một vòng luẩn quẩn (vì các service consume trực tiếp event của nhau).

## 4) When to choose which?

Giờ thì chúng ta đã có cái nhìn rõ hơn về cả 2 cách tiếp cận **orchestration** và **choreography**, vấn đề đau đầu tiếp theo cần giải quyết là nên lựa chọn hướng nào?

### 4.1) Business processing model

Nếu không quan tâm đến việc centralize business process thì cứ **choreography** mà quẩy thôi.

Còn nếu bạn muốn quản lý tập trung toàn bộ business, state, hoặc đã có sẵn MSA và muốn apply SAGA thì **orchestration** là sự lựa chọn phù hợp. 

> Đơn giản thôi, việc apply **choreography** vào một hệ thống đã/đang chạy thì việc refactor tốn công hơn rất nhiều.

### 4.2) Service coupling

Phần này mình đã đề cập bên trên **characteristic** với mỗi approach. Về cơ bản, sử dụng **choreography** giúp cho hệ thống **loose coupling** hơn so với sử dụng **orchestration**.

### 4.3) Transaction management

Cả 2 approach đều hướng đến distributed transaction, đều có thể rollback transaction. Vấn đề mình muốn đề cập ở đây là trong trường hợp workflow error, chúng ta có thể rollback state không, có data để rollback không, hay nói cách khác có khả năng rollback không? 

Nếu có thì hãy cân nhắc việc sử dụng SAGA, **orchestration** hoặc **choreography** đều được, tuy nhiên việc control rollback state với **orchestration** dễ dàng hơn. Lí do, với **choreography**, một **event** có thể trigger nhiều service rollback nên việc control cần nhiều kĩ thuật phức tạp hơn.

> Trường hợp nào thì transaction không thể rollback? Thực ra việc rollback với distributed transaction khác với rollback của local transaction. Với distributed transaction, data đã được commit xuống database, do vậy việc rollback bản chất không phải là câu lệnh `ROLLBACK`, mà là phải có snapshot data trước quá trình commit, nó phức tạp hơn rất nhiều. Vậy nên mới sinh ra câu hỏi **có thể rollback không, có data để rollback không**.

Túm cái váy lại, việc lựa chọn option nào phụ thuộc khá nhiều vào requirement và kĩ năng của SA, làm sao để solution ít phức tạp, dễ dàng maintain, deliver, support... mới là điều quan trọng. Còn pattern hay, solution hoàn hảo nhưng đến lúc implement thì phức tạp, khó support thì.. cũng bỏ đi.

> Tuy nhiên, best practice là với các simple sagas thì nên lựa chọn **choreography** mà quẩy. Ngược lại, với bàn toán đòi hỏi độ phức tạp cao, phối hợp nhiều flow với nhau thì nên sử dụng **orchestration**.

### After credit

Phía trên mới là lý thuyết thôi, đi vào thực hành mới thấy nhiều thứ hơn cần phải xử lý. Quay lại bài toán trên, giả sử **payment** đã thanh toán xong và response lại cho **orchestrator** (**SAGA orchestration**) hoặc publish event (**SAGA choreography**), bao gồm 2 step:
- **persistToDatabase()**
- **response() / publish()**

Đen một nỗi, **persist** data xong rồi nhưng **publish** message không thành công thì sao (application crash hoặc lost connection)?

![](https://i.imgur.com/M7AVEe2.png)

Hoàn toàn có khả năng lost message, tiền đã trừ rồi, mà chờ dài cổ không thấy pizza đâu.. mọi chuyện diễn ra sau đó chắc các bạn cũng có thể hình dung được.

Vậy phải xử lí tình huống này thế nào, đón chờ [bài sau](https://viblo.asia/p/maGK7r695j2) để hiểu rõ hơn nhé!

### Reference

Reference in series https://viblo.asia/s/P0lPmr9p5ox

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/aWj53xePK6m)