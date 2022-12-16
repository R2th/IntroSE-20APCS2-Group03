Bài viết này tiếp tục chủ đề rất hay ho là distributed transaction trong MSA. Nếu bạn lần đầu tới đây thì vui lòng đọc 2 bài trước về [SAGA pattern](https://viblo.asia/p/distributed-transaction-saga-pattern-naQZRRnPZvx) và [Transactional outbox pattern](https://viblo.asia/p/distributed-transaction-transactional-outbox-pattern-maGK7r695j2) trước khi bắt đầu

> Hoặc đọc hết bài này đã, không hiểu đọc lại sau.

Những tưởng apply 2 pattern trên là đã giải quyết được mọi vấn đề rồi, ấy thế mà không phải vậy.

Tiếp tục theo chân Thảo - siêu SA của team IT thuộc chuỗi nhà hàng `Pizza và những con bug không thể fix` để tìm hiểu thêm về SAGA pattern - Transaction isolation. Gét gô! 

[Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

## 1) Problem

Sau một thời gian deploy, hệ thống phát sinh một số lỗi: người dùng không đủ tiền nhưng vẫn order được pizza, hoặc đã cancel order mà vẫn nhận được bánh. Nhà hàng thì lỗ, Thảo thì bị trừ lương...

> Cũng **may** không học hỏi chiêu thức đội giá của anh nào đấy trong vụ Việt Á nên nhà hàng vẫn được mở cửa để kinh doanh bù lỗ, chứ không đi tù cả lũ.

Vậy nguyên nhân do đâu, lỗ hổng gì mà có những lỗi như vậy xảy ra? Cách khắc phục, sửa lỗi thế nào?

> Khắc phục thì chỉ có cách Thảo quay lại nghề cũ kiếm $ trả nợ cho nhà hàng thôi.

## 2) Transaction isolation

Thảo quên mất một điều, **SAGA pattern** và **Transactional outbox pattern** chỉ đảm bảo data consistency trong môi trường MSA, vì chỉ thỏa mãn 3/4 tính chất quan trọng của **transaction** là **ACD**:
- Atomicity
- Consistency
- Durability

Còn chữ **I** to đùng [**Isolation**](https://viblo.asia/p/014-postgresql-transaction-isolation-OeVKB67JKkW) thì gì có.

![](https://i.imgur.com/QrzNHVs.png)


Nếu mọi thứ diễn ra một cách **sequential** thì mọi thứ chả có vấn đề gì. Nhưng đời đâu đơn giản như cách crush đã đá bạn, việc order của khách phải diễn ra đồng thời/song song (concurrent) với nhau thì mới không bị ăn chửi. Chứ giờ order online mà cũng phải **xếp hàng** (sequential) thì dẹp tiệm cho rồi.

Nói thế vẫn hơi khó hiểu, cụ thể **isolation** đóng vai trò gì và tại sao lại là **isolation** mà không phải cái khác? 

Cần phải hiểu cụ thể 4 tính chất trên là gì, và SAGA đảm bảo 3/4 tính chất đó thế nào.

- **Atomicity**: SAGA đảm bảo được việc tất cả các local transaction 1 là COMMIT, 2 là ROLLBACK. Việc tất cả các local transaction COMMIT/ROLLBACK không thể diễn ra đồng thời, nhưng chắc chắn nó được diễn ra nếu implement chuẩn. Do đó nó đảm bảo tính **atomicity**: được ăn cả (all commit) ngã về không (all rollback).
- **Consistency**: tương tự tính chất **atomic**, việc data consistent giữa các services là **eventually consistent**, chậm một chút nhưng chắc chắn sẽ consistent.
- **Durability**: giống 2 tính chất trên, sau khi toàn bộ các local transaction được commit success là data vĩnh viễn nằm đó, không mất đi đâu.

> 3 tính chất trên của SAGA transaction đều kế thừa từ local transaction. Nhưng...

Còn **Isolation** thì sao? 

**Isolation** thể hiện tính cô lập dữ liệu của các transaction với nhau, ví dụ với Postgres level cơ bản của transaction isolation là **read committed**. Có nghĩa là với 2 transaction T1 và T2:
- T1 update data nhưng chưa commit.
- Lúc này T1 select sẽ thấy data mới, nhưng T2 select vẫn là data cũ.
- Sau khi T1 commit, T2 select lại sẽ thấy data mới.

Nguyên nhân cũng là vì các local transaction không được **COMMIT/ROLLBACK** đồng thời. Tính chất **Isolation** chỉ có được với các transaction trên cùng database. Với MSA, mỗi service là một database (**database per service pattern**) thì lấy đâu ra?

> Đọc đến đây cũng hơi hơi hình dung ra rồi đúng không? Nhưng cụ thể thì nó liên quan gì đến việc cancel order mà vẫn ship bánh, hoặc không đủ tiền mà vẫn có order? 

## 3) Scenario

Việc không có [**Isolation**](https://viblo.asia/p/014-postgresql-transaction-isolation-OeVKB67JKkW) *có thể* dẫn tới 3 hệ lụy:

- **Lost update**: flow B có thể ghi đè data (without reading change) lên data của flow A.
- **Dirty read**: flow A có thể read data của flow B trong khi flow B chưa commit toàn bộ transaction. Data đó đã được local commit, nhưng toàn bộ flow chưa thực hiện xong, có thể bị rollback sau thời điểm flow A read data.
- **Non-repeatable read**: 2 step khác nhau của flow A query cùng data nhưng data có thể khác nhau, lí do đã có flow B update data giữa 2 step của flow A.

**Non-repeatable read** cũng gần tương tự **dirty read**, vậy tập trung giải quyết **lost update** và **dirty read** là oke.

> Nếu để ý kĩ bạn sẽ thấy thực ra cả 3 hệ lụy trên đều do **read uncommitted** data.
>
> Thế hóa ra là vẫn có tính chất **isolation** này, chả qua level là **read uncommitted** thôi mà, ông chủ thớt bịp chúng tôi à?
>
> Ơ ơ... Theo ý kiến của bạn thì thế nào, để lại comment bên dưới nhé. 

### 3.1) Lost update

Tình huống xảy ra khi flow A ghi đè data lên một data đã được update bởi flow B. Ví dụ:

1. **Flow A** thực hiện **create order** X.
2. Lúc này, vì một lí do nào đó **flow B** được trigger để **cancel order** X. Do client được phép cancel order.
3. **Flow B** cancel order X thành công, update **order state = CANCELLED**.
4. Lúc này **flow A** mới thực hiện đến step cuối, chủ quan không check **order state = CANCELLED**, mà lại update **order stage = COMPLETED**.

Như vậy **flow A** đã bỏ qua updated data của **flow B** và override **order state = COMPLETED**. Và thế là chiếc pizza gà dứa không xúc xích vẫn được ship đến khách hàng.

> Chắc nhiều khách hàng cảm ơn Thảo lắm luôn.

Thực ra lỗi này xảy ra do smell code, có thể ngăn chặn đơn giản. Nhưng trước khi đến với giải pháp thì xem nốt **dirty read** đã.

### 3.2) Dirty read

Xảy ra khi **flow B** read data và data đó đang trong quá trình được update bởi **flow A**. **Flow B** xử lý business logic với data đó (và nghĩ nó là chuẩn) nhưng không thể ngờ sau đó **flow A** quay xe rollback data. 

> Khốn nạn... trên đời này chả tin được bố con thằng nào. Ờ thì ai bắt tin đâu.

Vú dị... à nhầm ví dụ:
1. **Flow A** create new order.
2. **Flow A** đến bước check xem còn vỏ bánh pizza không. May quá còn đúng 1 chiếc, update tạm inventory count = 0.
3. Lúc này **flow B** được trigger tạo order mới.
4. **Flow B** check thì hết cmn vỏ bánh rồi, không làm được đâu bạn hiền ơi.
5. **Flow A** đến bước thanh toán, thế éo nào thẻ chưa được kích hoạt (thực ra hết cmn tiền rồi). Thôi rollback đi nào, hãy cho mọi người thấy sức mạnh của SAGA pattern.
6. Chíu chíu... data rollback thành công, udate inventory count = 1.

Đọc đến đây chắc sếp không vui lắm. Những tưởng chiếc bánh cuối cùng cũng được bán, nhân viên được ra về. Nhưng ***ầu nâu***, ông anh **flow A** muốn ăn mà không đủ tiền, ông em **flow B** có tiền mà éo được ăn, bánh thì vẫn chình ình ra đấy. Quả này cũng hơi đau.

Ờ thì cũng đau phình phường thôi, nó liên quan đến credit mới thốn. Ví dụ khác, hệ thống có tính năng thanh toán bằng điểm thưởng nhằm tri ân các khách hàng *đóng họ* thường xuyên cho quán, trong đó có Angela White:

1. AW đang có 300 điểm. AW order một pizza gà dứa không dưa chuột thành công có giá 100 điểm, tài khoản còn 200 điểm.
2. AW sắp đến giờ diễn rồi, chờ dài cổ không thấy có món nên hủy đơn -> trigger **flow A** cancel order.
3. Ừ thì cứ ghi nhận request và báo đang xử lí. **Flow A** bắt đầu được thực thi, hoàn lại 100 điểm, AW lúc này có 300 điểm.
4. Nhưng AW nghĩ lại, giờ cancel thì cũng đói mốc mồm diễn không nhập tâm, thôi order lại. Lần này chọn hẳn pizza dứa cho *nó* thơm - giá 300 điểm, **flow B** được thực thi. Lúc này **flow B** check credit thì thấy có 300 điểm, trừ hết luôn, thế là còn 0 điểm. Toàn bộ **flow B** được thực hiện thành công và committed. Có gì sai sai ở bước này không nhỉ?
5. Quay lại **flow A**, shipper đã lấy bánh trước khi nhận thông báo **cancel order**, thế nên order không cancel được nữa, rollback lại step (3) đã thực hiện ở trên (SAGA sức mạnh quá bạn ơi). Tức là thực hiện trừ 100 điểm. Nhưng lúc này tài khoản làm gì còn điểm, thế là trừ tạm lương của Thảo.

> Ở một diễn biến khác, AW chén luôn 2 chiếc pizza, thế là ngày diễn hôm ý cực sung, các bạn được thưởng thức những thước phim vô cùng chất lượng. Các bạn cảm ơn Thảo.

Đấy, chỉ có 2 vấn đề đấy thôi mà khiến Thảo mấy tháng nay phải gặm mì tôm trộn nước lọc rồi. Như này sức đâu mà đi lùa gà. Thương Thảo.

## 4) Solution P1

Đến phần hay ho rồi, làm thế nào để giải quyết 2 vấn đề trên?

Tựu chung lại có 2 hướng:
- Ngăn chặn vấn đề.
- Giảm thiểu nhiều nhất ảnh hưởng đến hệ thống. 

Theo SGK, có các cách:
- Semantic lock
- Commutative update
- Pessimistic view
- Reread value
- Versioning
- By value

> *Dự là bài này khá dài, hi vọng đủ hấp dẫn để giữ chân các bạn, chứ chia ra phần sau thì.. tụt hết cả hứng. Follow + upvote nhé.*
>
> Hãy kiên nhẫn, yên tâm chúng ta vẫn gặp lại Angela White.

## 5) Modeling and Structure of SAGA

Trước khi đi chi tiết từng cách giải quyết **isolation**, chúng ta quay lại bài toán ban đầu, define lại chính xác các step - transaction - status mà một order phải trải qua trong quá trình **create order**. Từ đó sẽ có cái nhìn cụ thể để biết chính xác mình cần xử lí thế nào.

### 5.1) SAGA modeling

 Toàn bộ quá trình được minh họa với state machine dưới đây:
 
![](https://i.imgur.com/zOYq06X.png)

1. **Order service** tạo order thành công, order status là **ORDER_PENDING**. Sau đó gửi command/event đến **Consumer service**. **Consumer service** kiểm tra thông tin khách hàng:
    - **FAIL**: gửi command/event về **Order service** thực hiện reject order. Update order status **ORDER_REJECTED**. End flow.
    - **SUCCESS**: gửi command/event đến **Kitchen service**.
2. **Kitchen service** check inventory và tạo ticket với status **TICKET_PENDING**:
    - **FAIL**: reject ticket, send command/event về **Order service** thực hiện reject order. Update order status **ORDER_REJECTED**. End flow.
    - **SUCCESS**: gửi command/event đến **Payment service**.
3. **Payment service** xác thực thẻ và thanh toán:
    - **FAIL**: send event/command về **Kitchen service** reject ticket, update ticket status **TICKET_REJECTED**. Đồng thời gửi command/event về **Order service** thực hiện reject order. Update order status **ORDER_REJECTED**. End flow.
    - **SUCCESS**: send event/command về **Kitchen service** approve ticket.
4. **Kitchen service** approve ticket, update ticket status **TICKET_CREATED**. Sau đó gửi event/command về **Order service** update order status.
5. **Order service** approve order, update order status **ORDER_CREATED**. End flow.

> **Note**: send command hay event, send trực tiếp đến **service** hay **orchestrator** phụ thuộc vào việc apply SAGA choreography hay SAGA orchestration, nhưng tựu chung lại quá trình vẫn như trên.

### 5.2) SAGA structure

Quay lại nghiên cứu **SAGA Create order** state machine modeling và phần **3.1) Lost update**, phân tích thử tình huống xem có gì đặc biệt nếu muốn thử thách bản thân trước khi đi tiếp nhé.

Nếu để ý kĩ ta thấy transaction **Authorizing card** khá quan trọng, nếu đặt sai vị trí thì.. hơi dở. Ví dụ trừ tiền trước rồi mới verify consumer, check inventory. Trong trường hợp fail thì rollback, hoàn lại tiền... hơi thốn. Đấy là **Authorizing card** còn rollback được, chứ lỡ dính feature gọi đến 3rd-party API (gửi mail) thì oẳng. Chỉ có rollback bằng cách gửi mail khác báo cancel, có thể tốn thêm chi phí (cost per request).

Vì vậy, việc phân loại transaction để tạo flow chuẩn là cực kì quan trọng. Theo SGK, SAGA local transaction được chia thành 3 loại:

- **Compensable transaction**: những transaction nên được thực hiện đầu tiên và có thể rollback nếu lỗi xảy ra (optional). Transaction thực hiện việc rollback được gọi là **compensating transaction**. Cần lưu ý kĩ tính chất **có thể rollback**, tức là không chắc chắn 100% transaction này executed succeed.
- **Pivot transaction**: nó là go/no-go point trong SAGA. Nếu transaction fail, thực hiện **compensating transaction** cho các transaction đã succeed trước đó. Ngược lại nếu transaction success, đi tiếp cho đến khi hoàn thành. 
- **Retriable transaction**: những transaction cần thực hiện cuối cùng và chắc chắn 100% executed succeed. Nếu lỗi là yếu tố khách quan như crash app, out of memory, lost connection... có thể retry đến khi nào thành công.

> **Note**: **pivot transaction** có thể là transaction cuối cùng thuộc **compensable transaction** hoặc là transaction đầu tiên thuộc **retriable transaction**, hoặc có thể chả là loại nào, tức là **pivot transaction**.

Kết hợp với **SAGA Create order model** ở trên, các transaction phân bố như sau:

![](https://i.imgur.com/jjhotVp.png)

- **Compensable transaction** bao gồm **createOrder()**, **verifyConsumer()** và **createTicket()**. Các transaction này có các **compensation transaction** tương ứng như trên như, riêng **verifyConsumer()** chỉ query data và check nên không có data rollback -> không cần **compensation transaction**.
- Tiếp theo, **authorizeCard()** là **pivot transaction** của flow. Nếu transaction committed success, chúng ta có thể đảm bảo **SAGA** phải được completed. 
- Lúc này **approveTicket()** và **approveOrder()** là 2 **retriable transaction**, cần committed success, hoặc retry cho đến khi nào success (thực ra rollback toàn bộ SAGA cũng được nhưng chả có lí do gì phải làm vậy).

> **Question**: bạn có để ý vì sao cần 2 transaction cuối để update order status và ticket status thành **ORDER_CREATED** và **TICKET_CREATED** không? Sao không 2 transaction **createOrder()** và **createTicket()** không set status **ORDER_CREATED** và **TICKET_CREATED** luôn, nếu fail thì execute **compensation transaction** update status **..._REJECTED** là được mà? 
>
> Thử suy nghĩ xem sao.

## 6) Solution P2

Đọc nốt **solution** thôi dài vãi nồi rồi. Tổng cộng 6 solution bao gồm:
- Semantic lock
- ~~Commutative update~~
- Pessimistic view
- Reread value
- ~~Versioning~~
- ~~By value~~

Mình chỉ đi vào chi tiết 3 cách được sử dụng thường xuyên và đủ để cung cấp **Isolation** cho **SAGA pattern**. Các cách khác bạn có thể tự tìm hiểu thêm nếu có nhu cầu.

### 6.1) Semantic lock

Đây là trả lời cho câu hỏi phần trên. Với **semantic lock**, các **compensable transaction** đánh dấu (flag) tất cả các row nó update hoặc create. Điều đó nhằm thông báo rằng data đó chưa thực sự commit, nó hoàn toàn có bị thay đổi (rollback) sau đó.

> Best practice là các row đó nên có status kết thúc với pending: **ORDER_PENDING**, **TICKET_PENDING**.

Như vậy row **status** đóng vai trò như ổ khoá, sử dụng để ngăn chặn các transaction khác override data.

Ví dụ với case override data (inventory count) phía trên, **flow B** sẽ chờ cho đến khi nào inventory record status != **..._PENDING** (chờ record released lock) sẽ xử lí tiếp.

Nhưng không phải lúc nào cũng nên waiting như vậy, còn tùy thuộc scenario là gì. Quay lại case **lost update** với việc **cancel order** xảy ra giữa quá trình **create order**, có 2 giải pháp:

- **Retry**: để flow **cancel order** fail và reply lại cho client rằng đang trong quá trình tạo order, vui lòng thử lại sau. Ưu điểm là dễ implement, nhược điểm là client phải.. bấm lại button **Cancel** nếu vẫn muốn hủy, lỡ vẫn fail thì... ăn chửi sml.
- **Block**: disable button **Cancel**. Khi nào **create order** flow complete thì enable.

Có vẻ hay ho đấy nhưng không phải **semantic lock** không có nhược điểm. Suy nghĩ xem nhé, câu trả lời mình để ở phần cuối.. trong những bài sau.

### 6.2) Pessimistic view

Giải pháp này dựa trên **SAGA transaction structure** phía trên. Cần hiểu rõ các step/transaction của SAGA flow để sắp xếp theo trật tự ổn áp nhất để giảm sự ảnh hưởng của **dirty read**, hoặc để tối ưu quá trình rollback SAGA flow nếu có lỗi xảy ra.

Ví dụ với scenario **dirty read** cancel order ở trên với AW, ta có thể sắp xếp lại các transaction theo thứ tự:

1. **Order service**: update order status thành **CANCELLED**.
2. **Delivery service**: cancel delivery.
3. **Payment service**: refund - hoàn điểm cho Angela White. Được gặp lại AW rồi nhé.

Với thứ tự này, transaction cancel delivery diễn ra trước và fail nên sẽ không có điểm nào hoàn về ví của AW.

### 6.3) Reread value

Đọc tên là biết solution này làm gì rồi, trước khi modify data, vui lòng reread để tránh **dirty read**. Quay lại case **lost update** cancel order với **flow A** create order và **flow B** cancel order:
1. **Flow B** cancel order thành công mặc dù **flow A** create order chưa complete, do không áp dụng **semantic lock**. Rất may là vẫn còn cơ hội khác để sửa sai.
2. Order status được update thành **ORDER_CANCELLED**, lúc này **flow A** mới đến step 6 là **approveOrder()**. Nhanh trí check lại status của order xem có còn là **ORDER_PENDING** không, nếu không đúng thì.. abort transaction, rollback flow, execute compesating transaction. Mọi chuyện vẫn tốt đẹp.

> Nhưng **approveOrder()** là retriable transaction, nếu abort thì vi phạm tính chất retriable? 
>
> Đái dầm lại đổ tại hỏng chờ im... Vì code smell ở đoạn trước do không apply **semantic lock**, cũng may còn cơ hội sửa sai, thắc mắc gì nữa.


## 7) Sự thật bàng hoàng

Reng reng... reng reng... Tiếng chuông điện thoại réo liên hồi...

Thảo giật mình bừng tỉnh, hoá ra tất cả chỉ là giấc mộng... Ước mơ làm **đive lốp pờ** thuở bé không thành sự thật... 

Kiểm tra điện thoại, ông khách ruột đang giục. Thảo sửa soạn đồ, châm vội điếu thuốc đã hết hạn sử dụng, sải bước nhanh ra đầu hẻm.

...

Màn đêm dần buông, con phố nhỏ bắt đầu lên đèn. Ánh sáng vàng yếu ớt khẽ xuyên qua kẽ lá chiếu xuống gương mặt dù có thoa 3 lớp phấn vẫn nhận ra đó là Thảo.

> Chắc thành phố hết kinh phí thay bóng đèn.

Một đêm dài phía trước đang chờ Thảo, cô gái mới chạc tuổi đôi mươi... Bóng hình em khuất dần sau rặng cây trong con ngõ nhỏ phố TDH.

![](https://i.imgur.com/D0uFarn.jpg)

> Ban đầu đặt tên là Quỳnh thì hợp lí hơn.

See you in next post...

### Reference

Reference in series https://viblo.asia/s/P0lPmr9p5ox


[Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)