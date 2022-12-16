© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

**Microservices Architecture (MSA)** - không còn quá mới mẻ nhưng vẫn nóng hổi và hấp dẫn. Nó hấp dẫn bởi rất nhiều yếu tố khác nhau và một trong số đó là **sự phức tạp**.

Tại sao mình lại nói vậy, hãy thử nghĩ xem, nếu nó không phức tạp, không có nhiều vấn đề cần giải quyết, không có những pattern hay solution hay ho thì liệu có ai quan tâm đến nó nhiều không?

> Đơn giản như một chiếc xe ngựa ít tiền (ngựa real) và một chiếc xe ngựa nhiều tiền (Ferarri). Cả 2 đều có thể giải quyết nhu cầu đi lại, nhưng chiếc xe ngựa nhiều tiền chứa trong nó cả hàng nghìn nhưng thứ phức tạp được ghép nối lại với nhau để có thể hoạt động tốt. Và đa số chúng ta sẽ thích chiếc.. chiếc nào thì ai cũng rõ, dù có đôi lúc Ferarri mà hỏng thì.. mệt hơn ngựa real là cái chắc.

Tạm bỏ qua các ưu điểm tuyệt vời mà MSA đem lại, hãy nhìn vào thực tế, nhìn vào những sự khó khăn khi triển khai hay sự phức tạp khi thiết kế. Bạn sẽ thấy rằng nó thật sự có quá nhiều thứ phải giải quyết. Một trong những thứ đau đầu đó là **dual write problem**, thứ mà chẳng bao giờ xuất hiện trong **Monolithic Architecture**.

Nếu bạn chưa hiểu về **dual write problem** và **Distributed transaction** là gì thì không sao cả vì bài viết này dành cho bạn. Let's begin.

## 1) Transaction trong MSA

Như chúng ta biết, **transaction** bao gồm 4 tính chất **ACID**:
- Atomicity.
- Consistency.
- [Isolation](https://viblo.asia/p/014-postgresql-transaction-isolation-OeVKB67JKkW).
- Durability.

Mình không diễn giải từng tính chất vì trên google cũng đã có khá nhiều tại liệu, các bạn có thể tìm đọc để hiểu thêm. Về cơ bản, **concept** của một transaction là **All or Nothing**.

![](https://i.imgur.com/gbXEeNd.png)

> Khi một transaction bao gồm một hoặc nhiều DML query khác nhau (insert/update/delete), chúng ta coi nó là một **atomic** block, khi được execute thì tất cả các query phải được thực thi thành công. Nếu một query thất bại thì toàn bộ kết quả của các câu query thành công trước đó đều bị huỷ bỏ.

Để đảm bảo được concept trên với **single database** là một chuyện hết sức đơn giản:

```sql
BEGIN TRANSACTION;

INSERT INTO...;
UPDATE ...;
DELETE ...;

COMMIT;
```

Nhưng... nếu hệ thống của chúng ta distributed system, cụ thể là MSA với các service và database riêng biệt thì có khả năng cao đối mặt với **dual write problem**. Nói nôm na đó là việc cần đảm bảo tính đúng đắn của data với rất nhiều transaction khác nhau diễn ra trên các database khác nhau với service khác nhau.

### 1.1) Monilithic Architecture

Ví dụ, với việc order một sản phẩm trong mô hình Monolithic Architecture, một transaction được tạo ra và thực thi như sau:

![](https://i.imgur.com/utuP4sp.png)

- Khởi tạo transaction.
- Trừ tiền trong tài khoản.
- Tạo đơn hàng.
- Cập nhật thông tin giao hàng.
- Commit.

Transaction success đồng nghĩa với với tài khoản của khách hàng đã bị trừ tiền, đơn hàng được tạo và thông tin giao hàng đã được cập nhật. Monolithic với single database quá tuyệt vời, chả có vấn đề gì ở đây cả. Nếu một trong các step trên fail thì transaction được rollback, vẫn đảm bảo data consistency.

Có thể nghĩ tới một tình huống khác oái oăm hơn, cùng một user đặt 2 order cùng lúc, đồng nghĩa với việc có 2 transaction có thể được thực thi đồng thời. Tất nhiên chẳng có vấn đề gì nghiêm trọng nếu hiểu về [transaction isolation](https://viblo.asia/p/014-postgresql-transaction-isolation-OeVKB67JKkW) là có thể giải quyết một cách đơn giản.

### 1.2) Microservices Architecture

Bây giờ, hãy tiếp cận bài toán theo hướng MSA với nhiều services hơn và cùng xem có vấn đề gì:
- **Payment service**: xử lý liên quan đến kiểm tra tài khoản, cộng trừ số dư.
- **Order service**: tạo và quản lý order.
- **Delivery service**: tạo và quản lý công việc liên quan đến giao hàng.

Lúc này, có thể miêu tả quá trình order thông qua sequence sau:

![](https://i.imgur.com/OOoPftU.png)

User **place order** bằng cách click button **Đặt hàng** trên UI. Lúc này toàn bộ thông tin về đơn hàng được gửi đến **Orcheschator** - có thể hiểu là một service đứng trước làm nhiệm vụ điều hướng request và tổng hợp response trả về cho client. Các step cần thực hiện có thể diễn ra tuần tự hoặc đồng thời, tuỳ thuộc vào business logic:
- Check và update balance cần thực hiện trước khi tạo order và shipment.
- Sau khi update balance thành công, 2 step tiếp theo là update order và update shipment có thể thực hiện đồng thời.

Nghe có vẻ hợp lý nhưng lại không hợp lý tí nào. Transaction sẽ bị giới hạn tại một database, có nghĩa là cả 3 action trên không còn đảm bảo các tính chất ACID của transaction vì nó thuộc 3 database khác nhau.

Và đó chính là **dual write problem** chúng ta cần xử lý. Chuyện gì sẽ xảy ra nếu user bị trừ tiền thành công nhưng order không được khởi tạo, hoặc order tạo thành công nhưng shipper không nhận được đơn giao?

> Thậm chí shipper đã đi giao hàng nhưng order lại chưa được tạo, số tiền vẫn chưa bị trừ? Chém thế chứ chắc không có ông nào code ra hệ thống thế này, cùng lắm là đã trừ tiền mà không có order thôi :joy:.

### 1.3) Distributed transaction

Như vậy, một câu chuyện rất đơn giản với Monolithic nhưng lại trở nên phức tạp với Microservies. Dẫu sao, những advantages Microservices đem lại là không thể phủ phận, vì vậy chỉ có cách là đối mặt và tìm cách giải quyết chúng.

Và chắc chắn rồi, **distributed transaction** chính là concept để xử lý **dual write problem** trong MSA.

Có nhiều các thuật toán, cơ chế, pattern khác nhau để implement **distributed transaction** có thể kể tên:
- Two-phase commit.
- Three-phase commit.
- Saga pattern with Orchestration & Choreography.
- Parallel pipeline.

Liệt kê ra như thế chính là để đi qua từng pattern chứ còn gì nữa. Nhâm nhi li trà và đọc tiếp thôi. 

### 1.4) Crazy idea

Nhưng trước khi đến với distributed transaction, thử xem qua một vài crazy idea xem có gì hay ho.

#### 1.4.1) Sử dụng chung database

Một ý tưởng chợt loé lên có thể giải quyết vấn đề ngay lập tức đó là tất cả các service sử dụng chung **database** (shared database).

![](https://i.imgur.com/h7xU5A1.png)

Yep, một **ý tưởng**.. không thể **crazy** hơn. Nó có thể giải quyết được vấn đề nhưng không phải là một design được khuyến khích với MSA. Nói cách khác, nó là **anti-pattern**, cần tránh nhiều nhất có thể. 

> Tất nhiên trong một vài trường hợp và bài toán cụ thể chúng ta có thể áp dụng phương pháp này. Tuy nhiên cần lưu ý rằng nó nên là cách cuối cùng nếu không tìm ra giải pháp nào khác.

Với việc sử dụng chung database như này, nó còn liên quan đến vấn đề scale hệ thống. Giả sử số lượng order là cực lớn và ta chỉ có nhu cầu scale những phần liên quan đến Order service chẳng hạn.

Do đó, Về mặt technical, ta có thể thực hiện được để giải quyết **dual write problem** nhưng không khuyến khích vì nó có thể nảy sinh những thứ khù khoằm khác trong tương lai.

#### 1.4.2) Sử dụng replicate/cluster database

Một idea khác crazy không kém là không sử dụng chung mà cũng không tách riêng database, cụ thể là cluster/replicate database. Mỗi service connect đến một node khác nhau của database, các node này đồng thời  connect với nhau để duy trì mạng cluster hoặc đồng độ data giữa các node với replicate.

![](https://i.imgur.com/qbLeEaM.png)

Với cách xử lý này, một vấn đề dễ nhận thấy nhất là data giữa các node có thể không consistence với nhau tại một khoảng thời gian nhất định - **eventual consistence**.

Điều này có thể dẫn tới khó khăn trong việc check data, xử lý logic để đảm bảo chương trình chạy đúng.

Tất nhiên, nếu application không yêu cầu data consistence thì chúng ta hoàn toàn có thể apply cách này nếu muốn. Nhưng mình tin là không ai muốn sử dụng cách này cả :joy_cat:.

Tốt nhất nên giữ nguyên như ban đầu - each service has it own database và sử dụng **distributed transaction** để xử lý **dual write problem**.

> Đã thiết kế ra được MSA thì sẽ có cách xử lý được các vấn đề khi làm việc với nó. Dài dòng quá, bây giờ mới đi vào phần chính.

## 2) Two-phase commit

Lưu ý rằng **Two-phase commit**, **Three-phase commit** hay **Saga pattern** là những algorithm/pattern thực hiện **distributed transaction**, do vậy nên có thể có rất nhiều cách implement khác nhau. Ngoài ra một số RDBMS hiện tại đã hỗ trợ 2PC dưới dạng protocol.

Bắt đầu với 2PC (two-phase commit), bao gồm 2 phase để thực thi:
- Prepare phase.
- Commit phase.

Với 2PC, ta cần một component gọi là **Coordinator** làm nhiệm vụ quản lý các local transaction của operation services. **Coordinator** có thể là một module của service nào đó hoặc thậm chí là một service độc lập. Để bài toán đơn giản hơn thì mình lấy ví dụ với 2 services, hình dung như sau:

![](https://i.imgur.com/U3iHpeD.png)

Ok, cùng đi vào cụ thể cách thức hoạt động của 2PC với **Coordinator**.

### 2.1) Prepare phase

Với **prepare phase**, **Coordinator** thực hiện 2 công việc:
- Request tới **Payment service** yêu cầu kiểm tra số dư tài khoản của user xem có đủ để thực hiện giao dịch không. Cụ thể, **Payment service** implementation như sau:
    - Begin transaction.
    - Kiểm tra số dư, nếu thoả mãn thì thực hiện tiếp. Không thì response ERROR.
    - Thực hiện trừ số dư tài khoản.
    - Response OK.
- Request tới **Order service** kiểm tra số lượng hàng hoá để thực hiện tạo order. Implement như sau:
    - Begin transaction.
    - Kiểm tra số lượng hàng hoá nếu đủ thì tiếp tục thực hiện. Nếu không response ERROR.
    - Thực hiện tạo order, trừ số lượng hàng trong kho.
    - Response OK.

![](https://i.imgur.com/3N78Wjc.png)

Lúc này, với mỗi service sẽ là một local transaction riêng biệt và thực hiện block executing record, như vậy về mặt tổng thể nó vẫn đảm bảo tính **global isolation**. Giả sử vẫn là user đó thực hiện một order khác thì sẽ cần chờ cho đến khi transaction hiện tại hoàn thành trước khi transaction thứ hai được thực thi. Hoặc thậm chí nếu user khác order cùng sản phẩm cũng không thể được vì lúc này record đã bị block, cần chờ transaction trước đó hoàn thành. Như vậy việc fail hay success được quyết định ngay ở **prepare phase**.

Happy path là cả 2 step đều check/prepare data thành công. Lúc này **Coordinator** thực hiện phase tiếp theo là **commit phase**. 

> Cần lưu ý rằng, nếu reply OK nghĩa là service của bạn chắc chắn phải commit thành công ở **commit phase** nếu được request từ **Coordinator**. Đó là lí do vì sao cần block ở database để đảm bảo data consistence trước khi thực hiện commit.


Nhưng, hãy nói về tình huống không happy trước. Nếu bất kì service nào response **ERROR** thì ngay lập tức toàn bộ transaction ở tất cả các service phải được rollback. **Coordinator** sẽ gửi request tới tất cả các service để yêu cầu rollback transaction. Detail impelemtation là **ROLLBACK** transaction, có thể check choác thêm một vài thứ khác hoặc gửi thông báo tuỳ thuộc vào business.

> Một lưu ý nữa, **Coordinator** bắt buộc phải chờ cho đến khi nhận đủ tất cả các reply để quyết định commit hay rollback transaction. Do đó cần thêm cơ chế xử lý timeout, nếu quá một khoảng thời gian mà không nhận đủ reply thì thực hiện rollback transaction ở tất cả services. 

 ### 2.2) Commit phase
 
 Sau khi check/prepare data thành công ở **prepare phase**. **Coordinator** tiếp tục tiến hành commit phase bằng cách gửi yêu cầu commit transaction được tạo ở prepare phase tại tất cả các services.
 
 ![](https://i.imgur.com/Lg2WVHF.png)

Tất cả các **local transaction** được commit thành công. Lúc này việc place order hoàn thành, user bị trừ tiền và order cũng được tạo. **Coordinator** hoàn thành xuất sắc nhiệm vụ.

### 2.3) Drawback

Tất nhiên mỗi cách sẽ đều có ưu và nhược điểm riêng. Two-phase commit là một giải pháp cực kì tốt nếu muốn có strong consistence. Nhưng nó không được khuyến khích sử dụng trong MSA vì những nhược điểm dưới đây:
- **Latency**: Coordinator cần chờ reply từ tất cả các services để quyết định tiếp theo cần làm gì. Các transaction bắt buộc phải lock ([pessimistic lock](https://viblo.asia/p/009-optimistic-lock-va-pessimistic-lock-L4x5xr7aZBM)) nếu thực hiện trên cùng data.
- **Coordinator**: bản thân coordinator cũng là một mắt xích yếu trong 2PC. Nếu **coordinator** gặp sự cố thì đúng là tai hoạ. Toàn bộ các transactions sẽ bị block cho đến khi **coordinator** phục hồi.
- **Transaction dependency**: các local transaction sẽ phụ thuộc vào nhau. Các transaction cần chờ được commit hoặc rollback cho đến khi transaction cuối cùng phản hồi, có thể dẫn tới resource leak.
- **Eventually consistence**: mặc dù 2PC là một giải pháp cực kì tốt nếu muốn có strong consistency nhưng sự thật thì không hẳn là really consistence. Có độ trễ nhất định giữa các commit của services, có thể một thoáng tích tắc nào đó refresh page thấy tiền đã bị trừ nhưng chưa lên order.

### After credit

Thế giới không ngừng tiến bộ, vì vậy mà **three-phase commit (3PC)** được sinh để khắc phục nhược điểm của **two-phase commit** bằng cách thêm **pre-commit phase (2PC)** trong trường hợp **coordinator** hoặc bất kì **service** nào gặp sự cố.

Với **three-phase commit** bất kì một service nào trong MSA cũng có thể trở thành **Coordinator** để phù hợp với việc nếu một service gặp sự cố thì sẽ có **Coordinator** khác thay thế và tiếp tục công việc. Một **Coordinator** mới lên cần contact với các service khác để biết được state hiện tại của transaction là gì để quyết định phase tiếp theo là gì. Ngoài ra một phase nữa sẽ được thêm vào là **pre-commit phase** để kiểm tra lại một lần nữa chắc chắn service có thể commit transaction (có thể hiểu nó tương tự như ack).

Tuy nhiên nó không giải quyết bài toán blocking với **synchronous** nên gần không được khuyến khích trong MSA. Nhưng **synchronous** chính là lí do giúp 2PC hay 3PC có tính consistence cao. 

Bài viết tiếp theo sẽ tìm hiểu về một cách khác khá **xịn xò** để thực hiện **distributed transaction** là Saga pattern.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)