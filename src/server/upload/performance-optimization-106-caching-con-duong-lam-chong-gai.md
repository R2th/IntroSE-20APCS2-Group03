**Con đường vươn tới những hệ thống tải cao** đầy chông gai và cỏ dại.

Nếu các bạn đã chán theo dõi truyện trinh thám, chán việc đuổi bắt những tên tội phạm khét tiếng nhất trong giới phần mềm, chán những tiết tấu dồn dập khi hệ thống sập vì database thì đây sẽ là nốt lặng cần thiết để các bạn bình tâm. Bài viết này sẽ nói về con đường chông gai của một kẻ leo núi độc hành, khi mà hành trang chỉ là vài quyển sách giáo khoa cơ bản bạn chẳng hiểu để làm gì và một bức vẽ về đỉnh núi lung linh cuối con dốc cheo leo.

Caching luôn là một con đường chông gai bởi vì nó không có hồi kết. Nó luôn luôn sẽ có những thử thách mới để bạn vượt qua, những đỉnh cao mới để bạn cố gắng, và giải pháp của bạn rồi sẽ chẳng bao giờ là đủ. Thứ mình nói ở đây, trong series [**Performance Optimization Guideline**](https://viblo.asia/s/performance-optimization-guideline-DVK2jDQ2KLj) này chỉ là **một vài bước chân** mà mình đã đi qua trên con đường ấy mà thôi.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/v3t9uvzwtn_Screenshot%20from%202021-08-02%2000-14-45.png)

## First things first

Tôi là đâu, và đây là ai? Hãy cùng trở lại với con đường tối ưu mà chúng ta đang đi:

- [Performance Optimization 101: Những câu hỏi cơ bản?](https://viblo.asia/p/performance-optimization-101-nhung-cau-hoi-co-ban-Qbq5Q9BE5D8)
- [Performance Optimization 102: Scalability và câu chuyện về ảo tưởng distributed](https://viblo.asia/p/performance-optimization-102-scalability-va-cau-chuyen-ve-ao-tuong-distributed-3Q75wQA9ZWb)
- [Performance Optimization 103: Nghệ thuật tìm kiếm bottleneck](https://viblo.asia/p/performance-optimization-103-nghe-thuat-tim-kiem-bottleneck-jvEla784Kkw) 
- [Performance Optimization 104: Trinh sát ứng dụng với monitoring](https://viblo.asia/p/performance-optimization-104-trinh-sat-ung-dung-voi-monitoring-gGJ59MpP5X2)
- [Performance Optimization 105: Database bottleneck - Đuổi bắt kẻ tội đồ](https://viblo.asia/p/performance-optimization-105-database-bottleneck-duoi-bat-ke-toi-do-63vKj1qx52R)

- **Performance Optimization 106: Caching - con đường lắm chông gai** <~ YOU ARE HERE

Và bởi vì tác giả bài viết - tất nhiên là mình, **Minh Monmen**, vừa mới hoàn thành sương sương series [Caching đại pháp](https://viblo.asia/s/QqKLvpNbl7z) để các bạn có những cái nhìn tổng quan nhất về caching nên ở bài viết này mình sẽ mặc nhiên coi như các bạn đã đọc series đó của mình, và hiểu được những gì mình nói nếu có động chạm đến đó.

Nhưng mà như thế thì trong bài viết này mình sẽ nói về điều gì? Khi mà 3 bài viết dài như văn tế kia đã đề cập kha khá vấn đề rồi? Nếu như sau 3 bài viết kia, các bạn đã bắt đầu sử dụng được những hệ thống caching riêng cho mình rồi thì ở bài viết này mình sẽ đề cập đến một vấn đề khó hơn chính là **Caching Optimization**, hay chính là tối ưu hiệu quả sử dụng cache. Các bạn sẽ không chỉ copy 1 vài dòng code implement cache trên mạng rồi bỏ đó nữa mà sẽ phải có cách đánh giá hiệu quả của dòng code đó 1 cách đàng hoàng.

Đã rõ mình là ai và mục đích bạn ở đây chưa? Bắt đầu thôi. (Nếu mà chưa rõ thì đề nghị đọc lại hết những bài viết đã dẫn bạn đến đây)

## Caching performance - really?

**Tôi tưởng hệ thống caching là hệ thống giải quyết vấn đề performance?**

**Apply caching cái là hệ thống auto ngon rồi cơ mà?**

**Tại sao tôi lại còn phải quan tâm đến performance của chính hệ thống caching thần thánh nữa?**

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/epvazx92bt_4f227c19477cee3aece50ed5c2b2a14b.jpg)

Đừng hoảng sợ, mình đã từng có những thắc mắc y hệt các bạn, cũng từng có niềm tin sắt đá rằng làm hệ thống nhanh không khó, thấy bảo cứ áp caching vào phát là xịn luôn rồi có cần quan tâm nhiều làm gì nữa đâu. Những năm đầu đi làm, mình đã từng rất tự hào viết vào CV kinh nghiệm thế này:

> **Tối ưu hóa và tăng tốc hệ thống bằng caching (giảm response time từ >2000ms xuống ~300ms)**

Đối với mình đây là một thành tựu rất nổi bật, bởi vì hệ thống này không phải do mình code hay thiết kế mà chỉ là thằng sinh viên chân ướt chân ráo được giao nhiệm vụ tối ưu một hệ thống đang chạy với traffic lớn, sử dụng mã nguồn base trên framework Zend của PHP rất phức tạp. Mỗi 1 page show ra sẽ gọi **30 -> 120 query**, **build js, css từ database** (các hệ thống Forum, CMS thời đó đều vậy).

Sau rất nhiều thời gian phân tích query từng trang, thử nghiệm rồi inject code các kiểu các kiểu, mình có 1 pattern chúng là cứ chỗ nào chậm thì đặt cache của mình vào, thời gian set auto 1h. Và quả thật là nó đã có hiệu quả cực kỳ rõ rệt khi 1 trang web full **load vài s** giảm xuống chỉ **vài trăm ms**. Tài nguyên CPU, RAM của code và DB cũng đã giảm đi rất nhiều trong những giờ cao điểm. 

**Nhưng.**

Tất nhiên là phải có **nhưng** rồi. Đến giờ nhìn lại, thành quả khi đó của mình có nhiều phần là may mắn, gặp đúng hệ thống điển hình mà sử dụng caching cực kỳ hiệu quả là **báo chí**, tức là những hệ thống có **nội dung thay đổi tần suất thấp**, tỷ lệ **sử dụng chung dữ liệu giữa các user rất cao**. Chính vì vậy mà mình có thể apply cache vào mọi chỗ mình nghĩ là cache được mà không cần đắn đo gì bởi mặc định là hiệu quả của nó đã rất cao rồi.

Cho tới khi mình làm những hệ thống có dữ liệu thay đổi thường xuyên liên tục như thương mại điện tử, hay mạng xã hội,... với yêu cầu khắt khe về tính đúng đắn và độ trễ thì cách suy nghĩ đơn giản **áp cache vào là nhanh** không thể áp dụng được nữa.

Lúc này các bạn sẽ gặp những trường hợp oái oăm như:

- **Dùng cache rồi mà không nhanh**
- **Dùng cache rồi mà vẫn quá tải**
- **Rõ ràng benchmark thấy nhanh hơn không dùng cache cả chục lần tới trăm lần, thế mà user thật vào vẫn thấy chậm**
- **Nhanh thì dữ liệu lại sai nhiều, dữ liệu chuẩn thì lại chậm quá**

vân vân và mây mây.

Vậy tới lúc này phải làm sao để biết mình gặp vấn đề gì và cần làm gì để giải quyết?

## Caching metrics - sự thật bị giấu kín

**Hãy hỏi những con số** 

> Những con số không giấu bạn sự thật nhưng bạn lại thường bỏ qua chúng.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/jj2ndz1kwp_the-truth-is-no-longer-hidden-now-people-are-hiding-18284412.png)

Làm việc trong lĩnh vực tối ưu thì không chém gió suông. Những con số sẽ cho bạn biết thực sự hệ thống của các bạn gặp vấn đề gì. Mình ngoài việc làm ở công ty ra thì còn nhận tư vấn và tối ưu hệ thống cho cá nhân và doanh nghiệp khác nữa nên việc đo đạc số liệu luôn là 1 trong những việc làm đầu tiên và bắt buộc để mình nắm bắt tình hình hệ thống hiện tại của họ. Nếu bạn muốn **tối ưu 1 cái gì đó**, hay thậm chí là để biết được **bạn có cần phải tối ưu không** thì bạn phải tìm cách **đo lường được hiệu quả hiện tại** của nó đã.

Áp dụng vào bài toán caching. Làm cách nào để bạn biết hệ thống cache hiện tại có hiệu quả không? Hãy nhìn vào những con số sau:

**Cache hit ratio**: Đây là chỉ số quan trọng nhất, phản ánh trực tiếp hiệu quả cache. Mục tiêu của bạn đối với chỉ số này chính là làm sao để nó càng cao càng tốt. Cách tính của nó là:

**Cache hit ratio** = (Cache hit) / (Total request) * 100%

Ví dụ với 100 request vào hệ thống, có 10 request không có trong cache và phải gọi vào DB, 90 request có trong cache thì tỷ lệ cache hit sẽ là 90%.

Một hệ thống cache hiệu quả sẽ là hệ thống có chỉ số này cao. Cao bao nhiêu thì còn tùy vào tính chất dữ liệu của các bạn có sử dụng lại được nhiều không. Tuy nhiên kinh nghiệm thường thấy thì mình sẽ đánh giá hệ thống cache hiệu quả với **tỷ lệ hit > 90%**.

Các bạn đừng nghĩ mình kỳ vọng cao nhé. Cache hit 50% là vứt đi, 80% là miễn cưỡng sử dụng còn 90% là thấp rồi. Với các hệ thống dynamic data, hãy đặt target cache hit là 90%, còn với các hệ thống data ít thay đổi thì hãy target >95% hoặc >99% với những dữ liệu kiểu static data.

**Cache miss ratio**: Thật ra chỉ số này là lấy 100% trừ đi tỷ lệ hit ở phía trên thôi. Nhưng nó cho chúng ta biết cái gọi là **miss penalty** - tức là quả phạt mà hệ thống phải gánh chịu nếu không tìm thấy cache. Ở đây cụ thể chính là thời gian cho request trực tiếp tới data source như DB, API,...

Tưởng tượng hệ thống của bạn có 1000rps (request per second) mà tỷ lệ hit cache của bạn chỉ ở mức 90%, tức là database của bạn sẽ phải gánh 100rps. Nếu các bạn tính được con số này cộng với thời gian cho mỗi request tới database là sẽ ra số query concurrent mà db của bạn phải chịu. **Tỷ lệ cache miss** sẽ được dùng chủ yếu trong việc xác định giới hạn chịu tải của hệ thống và xác định trải nghiệm tệ nhất của người dùng.

**Cache size**: Chi phí cho tốc độ chính là bộ nhớ. Các bạn muốn tăng hiệu quả của cache (cache hit ratio) thì phải bỏ thêm chi phí (space). Đây là câu chuyện thuần túy về tính kinh tế để xác định điểm nào là điểm các bạn có lợi nhất và trả lời cho câu hỏi: **nó có đáng hay không**.

**Expired rate**: Tốc độ item hết hạn và tự xóa khỏi cache. Đây là 1 chỉ số phụ dùng để tìm nguyên nhân khi cache hit ratio thấp. 

Ví dụ nếu các bạn thấy **Cache hit ratio thấp**, **Expired rate cao** thì tức là dấu hiệu của việc các bạn set Time to live (TTL) cho cache thấp quá, nên tăng lên để tăng hit ratio (nhưng phải để ý tới việc dữ liệu bị stale nếu set lâu quá nhé).

**Eviction rate**: Tốc độ item bị đá khỏi cache. Sau khi các bạn đã xác định được chi phí (space) và sử dụng hết chi phí đó cho cache (cache full) thì sẽ tới lúc kẻ đến trước nhường bước cho người tới sau, tức là những item ít sử dụng hoặc cũ sẽ bị đá ra khỏi cache để giải phóng chỗ. Đây cũng là 1 chỉ số phụ dùng để tìm nguyên nhân khi cache hit ratio thấp.

Ví dụ nếu **Cache hit ratio thấp**, **Expired rate thấp** mà **Eviction rate cao** thì tức là lượng memory hiện tại bạn dùng cho cache đang bị ít quá cần tăng thêm. Tăng memory lên sẽ cần monitor sự thay đổi của các chỉ số để biết điểm dừng nhé.

## Optimize cache - con đường chông gai của kẻ độc hành

Optimize cache là các bạn dựa trên số liệu thực tế của chính các bạn để tinh chỉnh các thông số như TTL, cache size, eviction policy hay thậm chí là lựa chọn giải pháp cache. Việc này hoàn toàn phụ thuộc vào đặc điểm truy cập, đặc điểm dữ liệu của từng hệ thống và người ta cũng không có cái gì là công thức chuẩn chỉ hay cách làm chuẩn chỉ dành cho bạn. 

Bạn biết về các **phương pháp cache**, bạn biết về cách **đo lường hiệu quả**, và bạn phải **tự bước đi** trên đôi chân của mình.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/gy8xtvob1d_2559.jpg_wh860.jpg)

Ngay cả mình khi tìm hiểu về vấn đề này cũng gần như là mò mẫm. Nếu các bạn thử thì sẽ thấy chị gu gờ đầy rẫy những bài xây dựng những hệ thống cache siêu to khổng lồ của netflix hay facebook, scale những hệ thống cache to chà bá, tối ưu tốc độ rồi hiệu năng các hệ thống cache các thứ các thứ, hoặc những kiến thức nền nhưng lại đi rất sâu xuống computer science như cache trên CPU ra sao,... rất ít bài nào nói về **cách tối ưu hiệu quả cache** một cách toàn diện. Đa phần là các bạn phải tự chắp ghép những mảnh kiến thức rời rạc để đưa ra được phương án cho mình. 

> P/s: Nếu các bạn tìm thấy bài viết nào hay thì hãy comment ở phía dưới cho mình đọc với nữa nha

Mình xin mạn phép đưa ra một số bước thực hiện chung như sau để các bạn tham khảo. Tuy nhiên hãy nhớ: **mọi biểu đồ, mọi bài test** trên mạng đều **không đúng với dữ liệu của bạn** và chỉ có tính **tham khảo về xu hướng**. 

### Phân tích và lựa chọn giải pháp cache

Phần này mình sẽ không nói lại, các bạn đọc thêm về cách lựa chọn các giải pháp (local vs distributed remote) trong bài [Caching đại pháp 2: Cache thế nào cho hợp lý?](https://viblo.asia/p/caching-dai-phap-2-cache-the-nao-cho-hop-ly-ByEZkawE5Q0) của mình nhé.

Cái mình nói thêm ở đây là việc phân tích access pattern để lựa chọn evict policy cho phù hợp:

- **Kiểu 1 đi không trở lại**: sau khi thêm 1 item vào cache, item đó thường chỉ dùng tại thời điểm đó và không sử dụng trong tương lai ~> **Evict dạng FIFO (First In First Out)**. Dạng này dễ implement nhất nhưng thường chỉ phù hợp 1 vài loại data nhất định.
- **Kiểu hot cold theo thời gian**: phù hợp với phần lớn các loại dữ liệu, điển hình như tin tức, báo chí,... được truy cập rất nhiều tại 1 thời điểm và nguội dần theo thời gian ~> **Evict dạng LRU (Least Recently Used)**. Dạng này cũng dễ implement nhưng thường xuyên update thời gian có thể ảnh hưởng performance nên người ta còn sử dụng các cấu trúc gần đúng để tính toán. 
- **Kiểu hot cold theo nội dung**: Giống như video youtube, bài hát hot hit thì sẽ cực hot và tồn tại theo năm tháng, bài hát chán đời thì chả ma nào xem. Dữ liệu dạng này theo kiểu đã hot là luôn hot, phù hợp với **Evict dạng LFU (Least Frequently Used)**. Đây là dạng evict hiệu quả với rất nhiều loại data nhưng lại khó implement vì phải track tần suất sử dụng của từng item. Nhờ việc sử dụng các cấu trúc gần đúng để tính toán thì LFU đã phổ biến hơn và cũng đem lại hiệu quả cao hơn trong nhiều trường hợp.

Để có những so sánh sâu hơn về các loại policy này và xem cache engine của bạn có hỗ trợ không thì hãy tham khảo gu gờ nhé.

### Đo lường chỉ số

Việc tiếp theo là phải đo lường. Đo lường như thế nào thì mình sẽ không nói sâu nữa nhưng có 1 vài lưu ý cho các bạn như sau:

**Với caching system riêng biệt** như memcached, redis,... các bạn hãy tìm kiếm cách đo metric riêng cho từng app bằng cách lên gu gờ search kiểu: "redis exporter, redis metrics,..."

Điểm lưu ý với những system riêng biệt này là các chỉ số của nó **không hoàn toàn đáng tin** nếu các bạn sử dụng cho những mục đích khác. Ví dụ redis được mình dùng cả cho các thao tác dữ liệu khác mà không phải cache (như job queue). Do đó tỷ lệ cache hit / miss trên dashboard không còn phản ánh cụ thể hiệu quả cache của mình nữa.

~> Lúc này nếu muốn đo lường chính xác thì mình sẽ phải:

- Tách riêng việc sử dụng redis cho mục đích cache và mục đích khác
- Đo lường trực tiếp trên ứng dụng (nhúng prometheus client vào code chả hạn)

**Với các hệ thống CDN, HTTP cache,...** thì nhà cung cấp sẽ đo các chỉ số này cho bạn. Tuy nhiên phần lớn các nhà cung cấp CDN chỉ đo **con số tổng**, trong khi với việc cache web như HTML, CSS, JS thì tỷ lệ hit cao (>90%) chưa chắc đã nói lên site của các bạn ngon. Đây là 1 cái bẫy nếu như các bạn không hiểu **các thành phần cụ thể** như CSS, JS rất dễ ru ngủ bạn bởi tỷ lệ hit cao nhưng phần HTML không được cache mới là cái gây cao tải server.

Chỉ 10% request không được cache nhưng có **miss penalty** cao hơn 90% request được cache rất rất nhiều lần!!!

~> Nếu dùng CDN hay các hình thức cache HTTP, hãy để ý đến **Cache hit ratio theo loại file**. Tập trung tối ưu vào phần HTML nếu có thể.

**Với các hệ thống cache internal tự build** thì tất nhiên bạn phải tự track chỉ số. Việc này nếu có dùng 1 số lib cache theo ngôn ngữ thì nó có thể support bạn, tuy nhiên việc track chỉ số sẽ **ảnh hưởng tới performance**. Vậy nên nếu là tay mơ thì phải hết sức thận trọng khi tự làm và luôn để ý test lại performance nhé.

### Test, test, và test

Sau khi đo lường được các chỉ số, hãy thử nhiều tham số khác nhau và đo lường hiệu quả dựa vào việc theo dõi chỉ số. Ở đây mình lưu ý các bạn cần theo dõi các chỉ số khi chạy thật chứ không phải môi trường test, bởi vì data access pattern trong thực tế có thể khác xa những gì bạn dự đoán. 

Với các kết quả test khác nhau thì cũng sẽ có nhiều cách để tối ưu khác nhau, do đó mình không có một cách tối ưu chung nào ở đây cho các bạn cả. Mình chỉ có thể chia sẻ lại những cách mình đã làm trong 1 trường hợp cụ thể như này:

Đây là một ví dụ về hệ thống mà mình đã tối ưu không chỉ về cache mà còn là tổng thể giải pháp cho service ấy, các bạn có thể đọc thêm ở bài viết [Bài toán "Super fast API" với Golang và Mongodb](https://viblo.asia/p/bai-toan-super-fast-api-voi-golang-va-mongodb-3Q75wmA7ZWb). Mình sẽ tóm tắt một số quyết định của mình như sau:

- Phân tích dữ liệu:
    + Tổng số dữ liệu lớn, không có giới hạn (số item trong DB) ~> **Phù hợp với distributed remote cache**
    + Access pattern: Active item sẽ được truy cập nhiều lần, inactive item sẽ hoạt động rất ít ~> **Có thể xem xét cache 1 phần rất nhỏ item** ~> **có thể dùng local cache** ~> **phù hợp với LFU**
    + Yêu cầu latency rất thấp ~> **ưu tiên dùng local cache nếu có thể**
    ~> **sử dụng local cache** + **LFU policy**
- Tính toán TTL:
    + Độ trễ chấp nhận được: 15p
    + Thời gian cho 1 phiên truy cập liên quan tới item: ~10p
    ~> **Thời gian TTL ban đầu đặt 15p**
- Ước lượng size:
    + Số unique item trung bình được truy cập trong 15p: 10k 
    ~> **Set max items là 10k**
- Số instance: 3 (default)

Sau khi có các tham số trên, mình bắt đầu đưa vào chạy thử. Kết quả là:

- Cache hit ratio chỉ đạt ~80%
- Khi concurrent request lớn, tăng vọt các chỉ số về latency của 3 instance
- Eviction rate cao, tỷ lệ thay thế item rất lớn
- Memory sử dụng thấp (80MB ~ 10k items)

~> **Có thể tăng memory**

Mình thử thay đổi tham số:

- Set max item là 30k

Kết quả:

- Cache hit ratio tăng lên 85%
- Expired rate cao
- Latency vẫn lớn do 3 instance vẫn gặp giới hạn về concurrent

~> **Tìm phương án tăng TTL**

Ở bước này để tăng được TTL thì phải đảm bảo dữ liệu luôn tươi mới, mình đã phải implement Mongodb Changed Stream để tự động refresh cache, từ đó có thể set TTL lên 1 ngày.

Kết quả:

- Cache hit ratio tăng lên 90%
- Eviction rate trung bình
- Latency vẫn lớn 

~> **Tăng số instance để đảm bảo latency cho concurrent request**

- Tăng số instance lên 7 và giảm dần về 5
- Tăng max item lên 100k (số active item trong 1 ngày tương ứng với TTL)

Kết quả:

- Cache hit ratio đạt 93%
- Eviction rate thấp
- Latency chấp nhận được

Đến đây lại xuất hiện 1 bài toán mới: **1 Service mới đưa lên có gọi sang data của mình**

- Cache hit ration giảm xuống 88%
- Eviction rate cao
- Latency tăng trở lại

Ở đây sau khi phân tích mình nhận ra đặc điểm access dữ liệu của service mới này khác với user bình thường. Đây là service lấy dữ liệu theo batch thời gian, phân bổ đều số lần gọi cho từng item. Do đó LFU của mình sẽ vô dụng với nó. Việc service mới này gọi làm ảnh hưởng tới cả request của user bình thường do cache xuất hiện các item ít truy cập với user bình thường.

~> **Clone service của mình ra và tách riêng luồng gọi của service mới với user thường**

User thường ~> 5 instance cũ
Service mới ~> 2 instance mới

Bằng việc theo dõi thường xuyên hiệu quả cache, mình đã kịp thời khắc phục các vấn đề phát sinh sau khi hệ thống của mình đã đưa vào vận hành.

## Vài lời sau cuối

**Optimize cache không phải là 1 đích đến, nó là 1 quá trình kéo dài và gian khổ**. Mình cũng ngồi xem chart so sánh benchmark các loại policy rồi tăng cache hit ratio theo size các thứ, thế nhưng áp nó vào chính app của mình thì lại là 1 câu chuyện khác hoàn toàn bởi data access pattern của mình thì chỉ mình biết và cũng chỉ có mình mới có thể tối ưu thôi.

Đừng nhìn vào việc mình benchmark từ **5k RPS lên 40k RPS** mà nghĩ là hệ thống của mình nhanh, bởi vì đó chỉ là benchmark **tốc độ get 1 item** thôi, và **item đó được cache** rồi. Khi lên hệ thống thật các bạn sẽ thấy nào là tốc độ evict data, tốc độ expired data, rồi tỷ lệ miss vì data mới,... vô vàn thứ ảnh hưởng tới hiệu quả giải pháp cache của bạn chứ không chỉ là tốc độ thần sầu để get 1 item được cache.

Mong rằng qua bài viết này, các bạn đã có thêm 1 vài cái nhìn mới về tối ưu hệ thống cache của mình và sẽ có thêm hành trang để tự bước đi trên con đường gian khó này. Hẹn gặp lại trong bài viết sau nhé.