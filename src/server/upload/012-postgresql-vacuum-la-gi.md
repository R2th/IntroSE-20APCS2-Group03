© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Performance optimization với PostgreSQL](https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W).

**PostgreSQL multi-version cuncurrency control** giúp giải quyết concurrent read/write nhưng sẽ nảy sinh vấn đề khác:
> - **Bloating**: UPDATE/INSERT/DELETE nhiều dẫn tới dư thừa số lượng lớn các dead tuple (old record version). Chúng không còn giá trị nhưng vẫn nằm đấy, làm tăng disk space.
> - **Wraparound transaction id**: số lượng transaction id vượt quá 2^32 có thể dẫn tới sai lệch data.

Bài viết này sẽ tìm hiểu PostgreSQL xử lý chúng thế nào. Let's begin.

## 1) Vacuum

**PostgreSQL Vacuum** sinh ra để giải quyết 2 nhiệm vụ trên.

Ví dụ trước cho sinh động. Trong tuần bận đi làm túi bụi, đợt này dịch thì WFH nên khỏe. Tuy nhiên việc dọn dẹp nhà cửa vẫn để đến cuối tuần, hoặc tùy thuộc vào tình hình **bừa bộn** :joy:.

**Trash** không tự biến mất mà cần người dọn dẹp. Cơ bản, quy trình bao gồm các bước:
> - Tạm dừng các hoạt động khác.
> - Quét nhà, hút bụi, lau chùi...
> - Sắp xếp lại đồ cho ngăn nắp gọn gàng.
> - Sẽ có rất nhiều đồ đạc, một đứa cá vàng như mình không thể nhớ hết. Vậy nên có thể note lại các đồ quan trọng để đâu, vị trí nào cho dễ tìm kiếm.

**Vacuum** sẽ làm điều tương tự. Mục đích na ná giống **GC** trong **Java** là **dọn dẹp những thứ không còn được sử dụng**, giải quyết 3 vấn đề:
> - Clear **dead tuple**.
> - Giải quyết vấn đề over transaction id.
> - Cập nhật statistic information để tối ưu quá trình **query plan**.

### 1.1) Clear dead tuple

Có hai vùng nhớ cần nắm rõ trước khi tìm hiểu cách **PostgreSQL Vacuum** clear dead tuple:
> - **Visibility map (VM)**: hiểu một cách đơn giản nó là nơi chứa thông tin về **dead tuple** và **page** của mỗi table. Quá trình **vacuuming** được tăng tốc nhờ việc bỏ qua các **page** không chứa **dead tuple** nào.
> Nếu chưa hiểu **page** là gì thì đọc phần này nhé. Có thể coi disk là một căn chung cư, data là con người. Disk sẽ lưu data giống như việc mỗi căn hộ có một số lượng người nhất định, và một căn hộ chỉ được phép chứa tối đa (x) nhân khẩu. Khi read/write data sẽ thực hiện với từng **block of data** đó chứ không thực thi với từng đơn vị data. Ngoài ra, dù bạn chỉ số một mình nhưng phần diện tích bạn ở cũng vẫn là căn hộ. Đấy là lý do vì sao khi tạo một file chỉ chứa 1 kí tự (1 byte) nhưng dung lượng thực tế lưu trên disk có thể nhiều hơn như vậy. Có thể xem **Properties** của một file bất kì và kiểm chứng nhé. **Page** mang ý nghĩa tương tự như **block**. Tuy nhiên **block** diễn giải về mặt **physical**, còn **page** là **logical**.
> Ok, như vậy mỗi page có thể có **dead tuple** hoặc không. Thay vì vào truy cập vào từng **page** để kiểm tra, PostgreSQL sử dụng **VM** để đánh dấu page nào có **dead tuple** cần **vacuum**, giảm thiểu cost cho scan page. 
> - **Free space map (FSM)**: có thể tạm hiểu mỗi table (hoặc index table) trong database có một FSM. FMS sẽ quản lý space có trong mỗi page. Khi insert data, PostgreSQL sẽ look up trong FSM để kiểm tra trước khi thực sự thực hiện các I/O operation. Tránh các thao tác dư thừa không cần thiết.

Quá trình **vacuum** không giúp giải phóng disk space. Mục đích của nó là có thể tái sử dụng vùng space đó, chống phân mảnh table.
> Y như việc chúng ta dọn nhà. Dọn dẹp xong chỉ có bụi bặm biến mất, diện tích căn nhà còn nguyên không mất đi nửa cm. Sau một thời gian căn nhà lại ngập tràn trong bụi :joy:.
>
> Tiện thể mình nói qua về **fragement** (phân mảnh). Nếu data của table được tổ chức liền mạch, việc scan diễn ra rất nhanh chóng dễ dàng. Tuy nhiên nếu data bị chia cắt ra nhiều chỗ thì chắc chắn performance sẽ bị ảnh hưởng, không nhiều thì ít. Giống y hệt trò chơi tìm số tự nhiên trong 2 dãy số sau:
> ```
> 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 ii ii ii ii ii ii
>
> 10 11 12 ii 13 14 15 ii ii ii 16 ii 17 18 19 ii 20 ii ii 21 22 ii ii 23 ii 24 ii
> ```
> Dãy số nằm trên chắc chắn dễ scan hơn rồi :100:.

Các step **Vacuum** thực hiện **clear dead tuple** như sau:
> - Scan tất cả page của toàn bộ table (hoặc các table được chỉ định) để tìm dead tuple.
> - Freeze dead tuple.
> - Loại bỏ các index point đến dead tuple nếu có.
> - Remove dead tuple.
> - Update **FSM** và **VM**.
> - Update các system table liên quan.

**Vacuum** có vẻ xịn sò. Nhưng có vẻ vẫn thiếu thiếu? **Vacuum** clear **dead tuple** để sử dụng cho các future tuple (tức là các record được insert/update trong tương lai). Nếu trong tương lai không có insert/update thì.. **vacuum** cũng hơi dư thừa. Nói thế chứ không dư thừa đâu, nó sẽ làm các công việc khác như xử lý **wraparound transaction** và update **statistic information**.
> Giả sử table chiếm 100 GB trên disk nhưng có đến 99 GB dead tuple. Tự nhiên phí mất 99 GB để lưu **tài liệu học tập** :joy:. Cũng may thời ngày nay toàn dùng **tài liệu online** là chính. Tuy nhiên vẫn rất lãng phí.

Tất nhiên các kĩ sư PostgreSQL tính toán hết rồi. Nếu muốn được lợi ích to phải kèm theo sự hy sinh lớn. Muốn giải phóng dung lượng cho OS và disk, ta cần làm nhiều việc hơn.
> Quay về ví dụ nhà chung cư, giải phóng dung lượng sẽ giống việc trả lại các căn hộ cho chủ đầu tư. Một là chúng ta ra khỏi nhà (deleted), hai là chuyển sang ở chung với hàng xóm (moved). Cách thứ hai có vẻ thích hơn.

Quá trình này được gọi là **Vacuum full**. Tạm để đây đã.

### 1.2) Wraparound transaction id

Vấn đề thứ hai mà **vacuum** xử lý đó là **wraparound transaction id**.

**Transaction id** được lưu dưới dạng int-32 bit, tăng dần bắt đầu từ 0, transaction sau hơn trước 1 đơn vị. Khi đạt đến giá trị max nó sẽ thực hiện một cuộc nhảy vọt.. về giá trị min. Nếu chưa hiểu vì sao thì tìm đọc về **integer overflow** nhé.

Điều đó có nghĩa là khi số lượng transaction vượt quá giới hạn, transaction mới sẽ trở thành transaction cũ. Khiến data trở nên sai lệch, update data mới nhưng query vẫn là data cũ.

Vậy **PostgreSQL**, cụ thể là **Vacuum** xử lý thế nào?

Chuyển bài toán sang ví dụ thực tế cho dễ hình dung.

> Cùng theo dõi chặng đua vòng quay hồ Tây mở rộng với các coureur (vận động viên xe đạp) đến từ khắp nơi trên thế giới. Người chiến thắng là người hoàn thành 10 vòng đua nhanh nhất. **Transaction wraparound** sẽ giống như hồ Tây và các coureur sẽ là các **transaction id**, khi chạy xong vòng 1 sẽ bắt đầu vòng 2 luôn. Nếu nhìn về chỉ số laps đã hoàn thành thì những coureur chạy sang vòng 2 là những người nhanh hơn. Nhưng nhìn trên bản đồ thì giống như họ chỉ vừa mới xuất phát.
>
> ![](https://i.imgur.com/tMUXFuD.png)
>
> Một cách đơn giản để nhận biết các **coureur cam** vẫn nhanh hơn **coureur xám** mà không nhìn vào laps đó là.. xóa luôn các **coureur xám** đi :joy:.

**Vacuum** thực hiện điều tương tự để giải quyết **wraparound transaction id** nhưng sẽ phức tạp hơn.

Chia vòng hồ Tây thành 2 nửa trên và dưới. Khi theo dõi trận đấu thì theo dõi từng nửa một, những coureur nào chưa hoàn thành nửa trước đó thì.. bỏ đi. Hai nửa cứ liên tục đổi chỗ cho nhau như vậy, không bao giờ kết thúc.

> Như này
> 
> ![](https://i.imgur.com/ZkxvHKm.png)
>
> Hoặc như này
> 
> ![](https://i.imgur.com/LMZBzqN.png)

Detail implementation, **Vacuum** sẽ thực hiện **freezing** các old transaction id ở vòng cũ. Để trigger việc này, ta có thể sử dụng câu lệnh `VACUUM FREEZE`. Tuy nhiên, mặc định hệ thống đã **auto vacuum** nên việc của chúng ta chỉ là tuning các config để tìm ra best case cho bài toán cụ thể. Các config cho phần **freezing** bao gồm:
> - **vacuum_freeze_min_age**: số lượng transaction tối thiểu cần có trước khi thực hiện **freeze**, mặc định là 50m tx. Giá trị tối thiểu là 0 và tối đa là một nửa của **autovacuum_freeze_max_age**.
> - **autovacuum_freeze_max_age**: số lượng transaction tối đa trước khi chạy **vacuum** để ngăn chặn vấn đề **wraparound transaction**. 
> - **vacuum_freeze_table_age**: maximum là 95% giá trị của **autovacuum_freeze_max_age**. Vacuum sẽ thực hiện **aggressive scan** khi số lượng transaction của table đạt đến giá trị này. Khác với **default scan** ở chỗ nó sẽ truy cập hết tất cả các page có chứa transaction id chưa được **freeze**. Giá trị default là 150m.

Ok, mình chỉ tạm nắm phần này đến đây. Thỉnh thoảng rảnh vào tuning hệ thống xem có ổn tí nào không. Các phần thâm sâu hơn là nhiệm vụ của DBA expert, mình không thể múa rừu qua mắt thợ được :joy: (thực ra là không biết múa).

### 1.3) Update statistic

Phần trước chúng ta đã làm quen với **query plan** và **explain** với **analyze** option. Mục đích của nó là cho chúng ta thấy được plan thực thi các statement, từ đó tiến hành optimize/update code nếu cần thiết.

Tuy nhiên, để việc lên plan được hiệu quả và chính xác, ta cần có các thông tin thống kê về database/table/column... càng nhiều thông tin thì việc tính toán và chọn plan thực thi càng chính xác. Mấu chốt nằm ở chỗ thông tin thống kê (statistic information) phải đúng và đủ.

Có 2 cách để thực hiện update statistic information:
- Thủ công: bằng cách thực thi câu lệnh **analyze**. Lưu ý, **analyze** này khác với **analyze** option của **explain**, đừng nhầm lẫn.
    ```sql=
    -- nếu không khai báo gì, analyze sẽ thu thập statistic của tất cả table và materialized view.
    ANALYZE;

    -- nếu thực thi cho từng table riêng lẻ thì khai báo như sau.
    ANALYZE engineer;

    -- hoặc thực thi cho các column của table.
    analyze engineer(id, first_name, last_name);
    ```
- Tự động: **Vacuum** và cụ thể là **auto vacuum** sẽ làm việc này. Khỏe re. Có nghĩa là khi thực thi thủ công **vacuum**, nó cũng sẽ update các statistic information.

## 2) Vacuum full

Phần này sẽ trả lời vấn đề bỏ ngỏ ở cuối **mục 1.1**. Let's continue.

**Vacuum** là keywork giống như **explain**. Vậy nên nó cũng sẽ có một vài các options khác. Một trong những option quan trọng ta cần quan tâm đó là **full**.

**Vacuum** chỉ clear các **dead tuple** và dự trữ phần bộ nhớ đó cho các **future tuple**. Nó không thật sự giải phóng disk space. Tuy nhiên, khi thêm **full** option, mọi chuyện được giải quyết.

> **Vacuum full**: thực hiện clear dead tuple và hoàn trả disk space không dùng đó. Cái giá phải trả không hề rẻ, sẽ là giảm performance và **cần thêm** disk space.
> 
> Vẫn là ví dụ dọn dẹp nhà cửa. Có 2 cách để thực hiện, thứ nhất là lau chùi quét dọn giống **vacuum**. Cách thứ hai là... xẻo luôn phần đất đó đi :joy:, bụi bẩn sẽ biến mất cùng với diện tích căn phòng, cost cho việc thực hiện là rất lớn. Thực tế thì không ai làm thế, nhưng trong thế giới lập trình thì dễ như.. ăn biên bản vì ra đường không có lý do chính đáng trong thời buổi Covid hiện nay.
 
Quay lại vấn đề, thấy gì đó không đúng lắm, giảm performance thì dễ hiểu, nhưng tại sao mục đích là hoàn trả disk space mà vẫn tốn thêm disk space?

Cùng tìm hiểu cơ chế hoạt động của **vacuum full** để hiểu rõ hơn về kết luận trên.

![](https://i.imgur.com/4DfwK40.png)

![](https://i.imgur.com/5Agtq9m.png)

Data được lưu trữ trong các file, các file được lưu trữ trong disk dưới dạng block. Như vậy, nếu muốn giải phóng disk space, ta cần tổ chức lại data trên block một cách liền mạch.

> **PostgreSQL** sẽ copy toàn bộ dữ liệu (không bao gồm dead tuple) sang file mới, sau khi hoàn thành sẽ xóa file cũ. Idea rất đơn giản dễ làm, và chính nó dẫn tới 2 hệ quả trên:
> - **Reduce performance**: việc copy và check dead tuple yêu cầu exclusive lock toàn bộ table. Ngoài ra còn liên quan đến các I/O operation. Dẫn tới giảm performance.
> - **More disk space**: tạo ra file mới clone từ file cũ chắc chắn cần thêm disk space. Sau khi thực hiện xong sẽ tiến hành xóa file cũ, trả lại space cho disk và OS. Lùi 1 để tiến 2.

Phần này lý thuyết nhiều quá. Bài viết sau sẽ bàn luận thêm về **REINDEX** và thực hành với **VACUUM** xem thực hư thế nào nhé.

### Reference
Reference in series https://viblo.asia/s/performance-optimization-voi-postgresql-OVlYq8oal8W

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)