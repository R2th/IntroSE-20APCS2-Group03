© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Multithread từ hardware tới software với Java](https://viblo.asia/s/QqKLvp2rl7z).

## Shared memory và Distributed memory
Tiếp tục bài trước, mình sẽ giới thiệu về Shared và Distributed memory. Ok, let's start.

Chúng ta đã biết có 4 loại kiến trúc của **parallel computing** được phân chia dựa trên [nguyên lý phân loại Flynn's (Flynn's taxonomy)](https://viblo.asia/p/Ljy5Vvvy5ra#_2-parallel-computing-architecture-1) với 2 yếu tố **instruction** và **data**. 

> Ngoài ra, một yếu tố khác cũng dùng để phân chia đó là **memory**. Vậy phân chia như thế nào, memory được tổ chức như thế nào, làm sao máy tính có thể truy cập được memory đó lấy data để xử lý?

Từ kết luận ở bài trước, mình sẽ nâng cấp con CPU 2 cores lên 8 cores chạy cho mượt, vì thêm processors sẽ tăng tốc độ xử lý. **Vậy có phải thêm càng nhiều processor thì máy tính chạy càng nhanh, các chương trình được thực thi càng nhanh không. Nếu có thì thêm bao nhiêu là đủ?**

Quay lại bài toán đĩa salad. Sẽ có một công đoạn ta ít để ý. Đó là lấy :tomato: ra, thực hiện việc gọt vỏ cắt miếng, sau đó đưa chỗ :tomato: vừa rồi về chỗ cũ. Có vẻ không lan quyên cho lắm?

> Xét về góc độ kĩ thuật, tốc độ xử lý sẽ phụ thuộc thêm vào một yếu tố khác là **tốc độ đọc ghi dữ liệu của memory**. Cũng chính là công đoạn lấy :tomato: ra và bỏ :tomato: lại, vậy là thấy nó có liên quan rồi đó.

Ôn lại lý thuyết, trong máy tính có nhiều thành phần bộ nhớ khác nhau, cơ bản sẽ có: processor register, L1/L2/L3 cache memory, RAM, HDD/SSD. Theo thứ tự từ trên xuống dưới, tốc độ xử lý (speed) giảm dần và dung lượng (capacity) tăng lên. Như vậy, tốc độ xử lý của memory sẽ chậm hơn so với processor/cache memory. 

![](https://i.imgur.com/d4Gxx6v.png)

> **Rút rakết luận**, tốc độ xử lý sẽ phụ thuộc thêm vào tốc độ của memory. Tuy nhiên, tốc độ xử lý của memory chậm hơn processor, vậy thì thêm processor có thực sự giúp chương trình chạy nhanh hơn không vì tốc độ memory không đổi?

Quay lại chủ đề, ta sẽ có thể phân chia kiến trúc **parallel computing** ra thành 2 loại dựa trên **memory**:
- Shared memory.
- Distributed memory.

## 1) Shared memory
Toàn bộ processors sẽ truy cập đến cùng một vùng nhớ ở mức global (có thể hình dung đó là RAM). Mỗi processor hoạt động độc lập với nhau. Tuy nhiên do chia sẻ chung bộ nhớ, nếu một processor thay đổi một giá trị nào đó trong vùng nhớ chung thì các processor khác cũng sẽ nhận thấy sự thay đổi đó. 

Ví dụ, có thể coi bộ nhớ giống như rổ đựng rau củ quả. Cả 2 bọn mình (2 processors) đều dùng chung rổ rau củ quả đó, khi mình cắt đôi quả chuối :persevere: và đặt lại vào rổ, người còn lại cũng nhận thấy sự thay đổi đó.

> Lưu ý, **shared memory** không có nghĩa là bắt buộc phải dùng chung trên một thiết bị vật lý. Keyword ở đây là **tất cả các processors đều nhìn thấy sự thay đổi dữ liệu trên vùng nhớ chung**. 

Đi sâu hơn, với kiến trúc **shared memory**, tiếp tục chia làm 2 loại dựa trên cách kết nối và tốc độ kết nối từ **processor** đến **memory** hay nói cách khác là tốc độ mình lấy ra quả chuối và đặt 2 nửa quả chuối vào rổ:
- **UMA**: Uniform memory access.
- **NUMA**: Non-uniform memory access. 

### 1.1) Uniform memory access (UMA)
Truy cập bộ nhớ thống nhất, dịch ra tiếng Việt có vẻ hơi.. nửa quả chuối. Chúng ta chỉ cần quan tâm chữ `uniform`: nó mang nghĩa thống nhất, hoặc đồng phục. Tại sao học sinh lại phải mặc đồng phục, về mặt tích cực, mọi học sinh đều trông giống nhau không phân biệt nghèo hay nghèo hơn và được đối xử công bằng như nhau. 

> Vậy UMA có nghĩa là toàn bộ các processors đều có quyền truy cập vào bộ nhớ với **độ ưu tiên như nhau, tốc độ ngang nhau**. 

![](https://i.imgur.com/8gxA03V.png)

Trang bị bình dưỡng khí thôi, tiếp tục xuống sâu hơn :hole:. Có khá nhiều mô hình cụ thể về kiến trúc UMA, phổ biến nhất và áp dụng nhiều trong các máy tính ngày nay là SMP, viết tắt của **Symmetric Multiprocessing**. Vậy thì cụ thể nó là gì? 

Với SMP, các processors sẽ kết nối tới bộ nhớ chia sẻ chính (global memory) thông qua system bus. Mỗi processor sẽ có một vùng nhớ riêng (cache). Vùng nhớ này có tốc độ xử lý rất nhanh nhưng dung lượng rất nhỏ (đã nói ở trên). Nơi đây lưu trữ các dữ liệu được sử dụng thường xuyên hoặc đang/chuẩn bị được xử lý bởi processor. 

![](https://i.imgur.com/gYPNupI.png)

Nói về cache, sẽ có vô vàn khó khăn thách thức khi làm việc với nó. Lấy một ví dụ như sau: 
- Một processor lấy biến **i** từ memory.
- **i** từ memory sẽ được copy lên System Bus, sau đó tiếp tục được copy lên Cache memory để xử lý và thay đổi giá trị của **i**.
- Sau đó, biến **i** phải được copy ngược trở lại vào memory để đảm bảo các processor khác lấy được giá trị mới nhất của biến **i**.
- Tuy nhiên trong quá trình cập nhật sự thay đổi trở lại memory, nếu có 1 processor khác truy cập vào biến **i** thì sẽ nhận giá trị cũ của **i**.

Vấn đề này được gọi là **cache coherency**, hệ thống phần cứng đã đảm nhận giúp chúng ta xử lý điều này. Vậy thì hệ thống phần cứng xử lý như thế nào? Để tránh loãng bài viết thì mình sẽ không đề cập ở đây, các bạn có thể tìm hiểu thêm [tại đây](https://www.cs.drexel.edu/~bmitchell/research/CacheCoherence/CacheCoherence.html) nhé :+1:.

Cách diễn giải của **cache coherency** có vẻ giống **data race** mà chúng ta hay nghe. Tuy nhiên `data race` là vấn đề liên quan đến **software** và **multi-thread programming**. Mình sẽ diễn giải cụ thể ở các bài sau.

### 1.2) Non-uniform memory access (NUMA)
Giống phần trên, chúng ta bắt keywork `non-uniform`, có thể tạm đoán là ngược lại với UMA, nói đến việc nhiều processors truy cập đến memory với độ ưu tiên khác nhau và tốc độ khác nhau?

![](https://i.imgur.com/r8Gklwq.png)

Nhìn vào kiến trúc, NUMA đơn giản chỉ là **kết nối các hệ thống SMP lại với nhau**. Về cơ bản, toàn bộ các processors đều thấy sự thay đổi của data (vì cùng là **shared memory**) tuy nhiên **tốc độ truy cập vào data sẽ khác nhau** với từng processor vì chúng phụ thuộc vào tốc truy cập tới System bus nhanh hay chậm. 

### 1.3) Tổng kết
Nhờ sử dụng **shared memory** mà chúng ta lập trình đa luồng tương đối dễ dàng vì chúng giúp chia sẻ vùng nhớ với các phần còn lại trong cùng một ứng dụng. Việc còn lại của developer là đảm bảo việc truy cập data trong lập trình đa luồng là đúng đắn (synchronized), tránh vấn đề **data race**.

> Có một thuật ngữ khác khá giống **data race** là **race condition**. Hai thuật ngữ này dễ nhầm lẫn và hay bị đánh đồng. Tuy nhiên nó diễn tả 2 thứ khác nhau, theo dõi các bài tiếp theo để hiểu hơn nhé.

## 2) Distributed memory
Nghe hao hao giống **distrubuted system**. Cùng đi tìm hiểu xem nó là cái gì.

![](https://i.imgur.com/oqoG0ap.png)

Với kiến trúc này, mỗi processsor sẽ có local memory và khái niệm vùng nhớ chung (global memory) sẽ không còn. Tất cả các processors sẽ kết nối với nhau thông qua network (internet). Mỗi một processor sẽ xử lý data riêng biệt và lưu trữ lại local memory, các processor khác không thấy được sự thay đổi về data đó. 

Điều đó khiến cho các lập trình viên phải implement bằng một cách nào đó để chia sẻ sự thay đổi đến các processor khác trong hệ thống (nếu cần) và nó không đơn giản.. so với việc làm salad. Thêm một nhược điểm khác, khi thêm các processor đồng nghĩa với việc phải thêm memory, tức là tốn nhiều chi phí hơn, hạ tầng triển khai cũng sẽ phức tạp hơn.

Vậy ưu điểm của nó là gì? 

Đó là khả năng scale, scale nữa, scale mãi của hệ thống. Chốt lại, có vẻ đúng là **distributed system**. Tuy nhiên một khái niệm để nói về cách hoạt động phần cứng, cái còn lại nói về cách hoạt động của phần mềm.

### Reference
Reference in series: https://viblo.asia/s/multithread-programming-tu-hardware-toi-software-voi-java-QqKLvp2rl7z

### After credit
Về **hardware** như vậy cũng khá ok rồi, sau bài viết này sẽ tập trung vào **software**, nơi mà tất cả developer đều làm việc với nó.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)