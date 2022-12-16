Câu chuyện về chiếc API cực kỳ đơn giản đã được *phù phép* để trở nên phức tạp và fancy.

Vừa rồi mình mới được sếp giao cho 1 task vô cùng đơn giản: Tạo 1 service api với duy nhất 1 endpoint là **Get item by ID**. Tưởng chừng như đây là bài toán tạo API CRUD cho các bạn sinh viên mới ra trường, mình hăm hở lao vào code với tâm thế **cửa trên**. Chỉ sau khoảng 2 tiếng ngồi setup môi trường, tìm thư viện, code,... mình đã có 1 chiếc project sử dụng KoaJS với 1 endpoint đúng như yêu cầu. Và mọi chuyện tới đây là kết thúc.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/rrjzw6qdu5_maxresdefault.jpg)

## First things first

Ấy vậy mà.

Nếu câu chuyện đã kết thúc sớm như vậy thì chắc mình sẽ chẳng ở đây chém gió với các chế làm gì đúng không? Chúng ta hãy tạm nghỉ giải lao ít phút trước khi bắt đầu ngụp lặn trong cái ao sâu tới nửa mét này nhé.

Mình là **Minh Monmen**, 1 devops chân chính sùng bái vẻ đẹp của sự đơn giản, ưa chuộng việc **đu ít mai seo** khi tìm hiểu 1 vấn đề, nhưng lại thích **đứng trên vai người khổng lồ** khi bắt tay vào giải quyết vấn đề đó. Hôm nay mình rất hân hạnh được đồng hành cùng các bạn trong câu chuyện cá chép hóa rồ này. Rất mong được các bạn ủng hộ và cổ vũ để có động lực tiếp tục chém gió trên giang hồ.

Đi vào chủ đề chính của chúng ta: chiếc API chính được dùng để **Get item by ID**.

Thoạt nghe thì các bạn sẽ chẳng thấy nó có gì đáng phải suy ngẫm, tuy nhiên đằng sau chiếc API đơn giản này lại là những yêu cầu hết sức phức tạp đến từ vị trí của người thiết kế hệ thống. Nhưng đó là câu chuyện phía sau, ta hãy cùng điểm qua nhanh 1 số kiến thức nền tảng để có thể hiểu được bài viết này:

- **Eventual Consistency**: Tính nhất quán yếu của dữ liệu
- **Caching Strategy**: Các phương pháp thực hiện caching
- **Cache Eviction Policy**: Các nguyên tắc xóa cache
- **In-memory cache**
- **MongoDB change streams**

Nhào zô.

> **Lưu ý**: Tất cả các kết quả benchmark trên được mình thực hiện trên máy local, không được setup hoàn chỉnh để đo lường do vậy các con số chỉ mang ý nghĩa tương đối khi so sánh với nhau mà không mang ý nghĩa tuyệt đối.

## Context

Tại sao mình lại phải làm 1 service riêng biệt chỉ chứa duy nhất 1 API **Get item by ID**? Well, đó là 1 câu chuyện dài, bắt nguồn từ kiến trúc micro-services.

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/yg1bnfywca_caching.png)

Trong hệ thống micro-services nói chung thường sẽ xuất hiện những service chứa thông tin được dùng chung rất nhiều trên toàn hệ thống (như **Account**, **Product Catalog**,...). Đây là những service trọng yếu của hệ thống, không chỉ xử lý business logic của bản thân nó mà còn là nơi tra cứu data của rất nhiều service khác. Chính vì vậy lượng request liên quan tới **read** của nó sẽ nhiều hơn phần **write** rất nhiều, dẫn tới bọn mình đã phải tiếp cận vấn đề khác đi 1 chút như sau:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/j0brz1t0r7_caching2.png)

Bài toán optimize cho phần read internal là 1 bài toán khá phức tạp, chính vì vậy bọn mình đã quyết định tách phần read internal ra thành 1 service riêng. Service này sẽ chỉ phục vụ với tư cách là nguồn dữ liệu cho các service khác và tập trung vào tối ưu phần read. Việc tách này giúp mình có thể thoải mái lựa chọn giải pháp hơn và tránh ảnh hưởng tới service chứa rất nhiều business rule hiện tại.

Yêu cầu dành cho service read internal:

- **Low latency**: Data từ service này thường được dùng làm info data phục vụ cho các service đóng vai trò **API composition**, tức là tổng hợp data từ nhiều service (gồm service chính chứa logic - ví dụ 1 list ID - và các service phụ chứa info data). Do vậy latency của nó ảnh hưởng rất lớn tới toàn bộ request của người dùng. Vì vậy yêu cầu tiên quyết là phải có độ trễ thấp.
- **High throughput**: Như mình đã nói ở trên, sẽ có rất nhiều service cần thông tin và gọi tới service này, do vậy nó cần xử lý được khối lượng request khổng lồ. Đây là yêu cầu quan trọng không kém so với latency.
- **Scalable**: Có thể scale được dễ dàng.

Chúng ta có thể bỏ qua việc optimize ở tầng Database do những bảng dữ liệu này tương đối bé (cỡ vài triệu rows) và query trực tiếp bằng **Primary Key**. Thứ chúng ta để ý ở đây là tối ưu phía ứng dụng mà thôi.

## The first attempt

Ban đầu service này được mình viết bằng NodeJS với kiến trúc rất đơn giản sau:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/i90qpz9kyw_caching3.png)

Benchmark qua performance của hệ thống được kết quả sau:

```bash
# AB with concurrent level: 50

# KoaJS app with PM2 cluster mode 

Requests per second:    2034.62 [#/sec] (mean)
Time per request:       24.575 [ms] (mean)
Time per request:       0.491 [ms] (mean, across all concurrent requests)
Transfer rate:          1490.20 [Kbytes/sec] received

Percentage of the requests served within a certain time (ms)
  50%     21
  90%     40
  95%     48
 100%    103 (longest request)
```

Như các bạn có thể thấy, **TP95 rơi vào khoảng 48ms** với **throughput 2000 RPS**. Cũng là 1 con số khá OK nếu như mình muốn sử dụng luôn codebase từ service đang chạy. Cách xử lý này không dùng cache, do vậy sẽ gây gánh nặng lên DB. Tuy nhiên ở mức tải thấp thì MongoDB hoàn toàn cân được. Việc không dùng cache cũng khiến cho data trả về cho các request luôn là data mới nhất.

## The second attempt

Mọi chuyện diễn ra hoàn toàn ổn với chiếc API ở trên và mọi thứ chạy trơn tru trong vòng vài tuần. Tuy nhiên mình có ghi nhận vào 1 số thời gian cao điểm thì latency của API này có vọt lên khá lớn (khoảng vài trăm ms) làm các service phụ thuộc vào nó bị chậm đi. Không chấp nhận kết quả chỉ dừng ở con số **2000rps**, mình bắt tay vào nghiên cứu tối ưu để tăng hiệu năng của service này. Mặc dù NodeJS đáp ứng tốt hầu hết các loại service và workload mình đã làm, tuy nhiên do đây là 1 trong những service đặc biệt đã được tách riêng do đó việc áp dụng một công nghệ khác là hoàn toàn có thể.

1 yếu tố khác cần cân nhắc đó là tài nguyên. Ứng dụng NodeJS của mình khi chạy chiếm khá nhiều tài nguyên, ví dụ với mỗi instance chiếm 100~200MB ram thì việc chạy 10~15 instance (để đảm bảo throughput của hệ thống) sẽ chiếm kha khá tài nguyên. 

Để có 1 bước ngoặt thì buộc chúng ta phải rẽ ngang. Và mình đã chuyển qua viết lại service bằng **Golang**. Do đây là service có logic đơn giản nhất, chỉ cần nhanh nên việc áp dụng hẳn 1 ngôn ngữ mới vào xử lý khá dễ dàng và phù hợp.

Vẫn với mô hình như trên, không cache và gọi trực tiếp tới DB, chiếc API sử dụng Golang của mình ra đời với kết quả benchmark như sau:

```bash
# AB with concurrent level: 50

# Gin gonic (Golang) with no cache

Requests per second:    4967.31 [#/sec] (mean)
Time per request:       10.066 [ms] (mean)
Time per request:       0.201 [ms] (mean, across all concurrent requests)
Transfer rate:          5835.62 [Kbytes/sec] received

Percentage of the requests served within a certain time (ms)
  50%      8
  90%     20
  95%     26
 100%     84 (longest request)
```

Not bad, huh? Chiếc API mới của mình đã có **throughput lớn gấp 2.5 lần** và **TP95 giảm đi 2.5 lần**.  Tuy nhiên tới đây chắc các bạn sẽ đều thắc mắc: Nếu đây chỉ là 1 bài viết khoe rằng **Golang** nhanh hơn **NodeJS** thôi thì có gì mà phải viết dài vậy? Bài viết cũng chả có tý gì gọi là chất xám của tác giả luôn.

Đừng vội thất vọng, những thứ hay ho còn ở phía sau.

## The third attempt

Không hài lòng với chính mình, mình bắt đầu nghiên cứu các giải pháp để tối ưu hơn nữa kết quả này. Và ý tưởng lóe lên đầu tiên chính là sử dụng **caching**. Tất nhiên là khi sử dụng caching thì mình sẽ phải giải quyết 1 số vấn đề sau:

- **Cơ chế cache** ra sao? Dữ liệu từ DB sẽ được load như thế nào vào cache? On-demand hay preload,...
- **Tài nguyên** mà cụ thể hơn là RAM (do mình sẽ thực hiện cache trên RAM). Cache bao nhiêu item, tốn bao nhiêu dung lượng?
- **Xóa cache** như thế nào? Bởi vì tài nguyên RAM là thứ **bị giới hạn**, ta gần như không thể chứa toàn bộ dữ liệu có trong DB vào cache, do vậy ta phải giải quyết bài toán clear bớt cache khi đầy bộ nhớ. Việc này có thể thực hiện qua các cơ chế expire, LRU, LFU,...
- **Dữ liệu không chính xác** so với DB. Đây là điều chắc chắn sẽ xảy ra với mọi hệ thống cache. Chỉ có là chúng ta xử lý ra sao để rút ngắn hết sức có thể khoảng thời gian lag giữa data trong db và data trong cache mà thôi.

### Tôi là ai, đây là đâu?

Việc đầu tiên ta cần làm đó là hiểu được rõ mình đang làm gì. Nghe thì có vẻ hiển nhiên tuy nhiên các bạn đừng coi thường bước này. Đây là bước để các bạn có thể hiểu rõ được hệ thống của mình, các đặc điểm dữ liệu, các yêu cầu đối với response. Mình có thể tóm tắt bằng 1 vài câu hỏi nhanh như sau:

- **Dữ liệu cần cache có dễ lấy không**: Có (get item by ID rất nhanh). Câu hỏi này nhằm mục đích đánh giá cost của 1 lần lấy dữ liệu từ DB.
- **Tỷ lệ đọc/ghi**: 99/1. Con số này các bạn có thể chỉ cần ước lượng xem dữ liệu mình cần sẽ đọc nhiều hay ghi nhiều và so sánh tương quan 2 yêu cầu này với nhau nhằm mục đích đánh giá các giải pháp cập nhật cache.
- **Yêu cầu tính nhất quán**: Trung bình. Liệu dữ liệu của bạn sau khi update cần được cập nhật nhanh cỡ nào tới tay của các service khác? Do service này tập trung cung cấp dữ liệu dạng info cho các API composition, do vậy mình không cần đặt quá nặng vấn đề tính nhất quán. Thông tin của 1 sản phẩm/1 user có thể có độ trễ và hoàn toàn chấp nhận được.
- **Đặc điểm traffic**: có thể biểu diễn bằng quy luật 80-20, tức là 20% item xuất hiện trong 80% traffic. Đây là 1 khía cạnh rất quan trọng trong việc chọn lựa cơ chế **Cache Eviction** để tăng tỷ lệ **Cache Hit Ratio**.

### Caching hiệu quả với thuật toán LFU của Ristretto

Sau khi có thông tin về đặc điểm cũng như traffic hệ thống thì mình bắt tay vào tìm kiếm thư viện với các cơ chế cache phù hợp. Và [Ristretto](https://github.com/dgraph-io/ristretto) là một thư viện sáng giá đáp ứng đầy đủ yêu cầu của mình:

- **High performance**
- **Concurrency-safe**
- **Support expire time**
- **Cache eviction policy: LFU** giúp tăng tỷ lệ Cache Hit Ratio khi mà 1 số item có tần suất xuất hiện trong traffic nhiều hơn những item khác

> Ở đây mình chỉ đề cập tới 1 thư viện là Ristretto tuy nhiên mình khuyên các bạn nên tìm hiểu kỹ các cơ chế cache đứng sau những thư viện khác nhau để có thể đưa ra 1 lựa chọn phù hợp với loại hình dữ liệu của bản thân.

Các bạn có thể đọc thêm về từng bước xây dựng cũng như benchmark với các cache lib khác trong 2 bài blog này: [The State of Cache in Go](https://dgraph.io/blog/post/caching-in-go/) và [Introducing Ristretto: A High-Performance Go Cache](https://dgraph.io/blog/post/introducing-ristretto-high-perf-go-cache/)

> Nói thêm 1 chút về 2 thuật toán xóa cache **LRU (Least recently used)** và **LFU (‎Least frequently used)**. Các bạn có thể đọc thêm về 2 thuật toán này trên mạng để hiểu rõ hơn, ở đây mình giải thích 1 cách nôm na là khi bộ nhớ cache đầy, để **thêm 1 item** vào cache thì ta sẽ phải **xóa 1 hoặc nhiều item** khác khỏi cache. Vậy lựa chọn item nào để xóa chính là vấn đề các hệ thống cache cần giải quyết. Nếu các bạn xóa 1 item rất thường xuyên được request thì tất nhiên tỷ lệ miss cache của các bạn sẽ tăng lên, do đó tùy vào đặc điểm phân bố dữ liệu mà các bạn chọn 1 thuật toán phù hợp. Ở đây mình chọn LFU bởi data của mình có sự phân bố không đều, 1 số item sẽ rất thường xuyên được access. Thuật toán phù hợp sẽ giúp tỷ lệ Cache Hit của các bạn tăng lên đáng kể đó.

Tới đây, sau khi implement xong phần cache thì về cơ bản là mình đã xong việc. Đây là kết quả benchmark sau khi request gửi tới đã được cache hoàn toàn:

```bash
# AB with concurrent level: 50

# Gin gonic (Golang) with in-mem cache

Requests per second:    39630.33 [#/sec] (mean)
Time per request:       1.262 [ms] (mean)
Time per request:       0.025 [ms] (mean, across all concurrent requests)
Transfer rate:          8785.24 [Kbytes/sec] received

Percentage of the requests served within a certain time (ms)
  50%      1
  90%      2
  95%      3
 100%     19 (longest request)
```

Rất ấn tượng phải không? Mình đã tăng throughput của service từ **5k rps** lên **40k rps** với latency giảm đi 10 lần với các item được cache.

Mặc dù implement Ristretto vào project rất dễ, tốc độ của API cũng được cải thiện rất nhiều lần. Tuy nhiên đây chưa phải là trạm dừng chân của chúng ta. Sử dụng cache thôi không khiến cho API của bạn bất khả chiến bại. Có rất nhiều yếu tố cần được xem xét để có thể sử dụng cache 1 cách hiệu quả:

- **Số lượng cache item** - con số này ảnh hưởng tới lượng ram mà 1 instance app của bạn sử dụng.
- **Tỷ lệ Cache Hit Ratio** - phản ánh hiệu quả sử dụng cache của các bạn.
- **Số cache item bị xóa** - phản ánh tương quan với luồng ghi và sự phân bố item trong cache của bạn theo thời gian.
- **Thời gian cache** - điều chỉnh độ trễ của dữ liệu và dọn dẹp các item cũ. 

Quá trình tinh chỉnh các thông số trên của mình khá mất thời gian, tuy nhiên có 1 số kinh nghiệm rút ra để các bạn tham khảo:

- Tăng số lượng cache item làm tăng Cache Hit Ratio tới 1 mức giới hạn (mà qua mức này hiệu quả cache giảm đi do hit ratio không tăng thêm mà lại tốn nhiều memory). Với các hệ thống của mình thì số lượng cache item tương đương với 20-30% tổng số item được request trong ngày.
- Giảm thời gian cache giúp giảm lag data, tuy nhiên lại làm giảm Cache Hit Ratio đi khá nhiều.
- Nếu số cache item bị xóa quá nhiều (việc update dữ liệu diễn ra với tần suất lớn) sẽ làm hiệu quả sử dụng cache giảm rất nhiều.

Số lượng cache item và số item bị xóa sẽ phụ thuộc hoàn toàn vào đặc điểm traffic và hệ thống của các bạn, do vậy để xác định được các con số này chẳng có cách nào khác ngoài việc monitor hệ thống của mình, tìm hiểu xem trong 1 ngày có bao nhiêu item được request, tần suất xuất hiện như thế nào, cân đối với lượng RAM cho mỗi instance để quyết định. 

### Giải quyết bài toán độ trễ dữ liệu với MongoDB Change Streams

Độ trễ dữ liệu luôn là 1 bài toán rất đau đầu với mọi hệ thống cache. Mình nhớ có lần đã từng đọc 1 bác nào đó phát biểu:

> **Nếu có cơ chế invalidate cache hợp lý thì tôi có thể cache mọi thứ**

Nghe cũng hợp lý phết đúng không? Ở phía trên khi chưa có cơ chế invalidate cache thì mình chỉ sử dụng expire time để invalidate cache thôi. Đây là cách dễ nhất để quản lý độ trễ dữ liệu. Tuy nhiên việc giảm expire time xuống sẽ ảnh hưởng trực tiếp tới Cache Hit Ratio. Thêm vào đó những item ít thay đổi cũng bị invalidate trong khi những item thường xuyên thay đổi thì vẫn phải chấp nhận độ trễ dữ liệu.

Dựa vào đặc điểm dữ liệu là update không thường xuyên / ít so với tần suất đọc, mình có mạnh dạn sử dụng 1 tính năng rất xịn xò của MongoDB đó là [**Change Streams**](https://docs.mongodb.com/manual/changeStreams/). Qua đó thay vì việc mình lắng nghe các sự kiện của ứng dụng để invalidate cache thì sẽ lắng nghe trực tiếp event của database thông qua **Change Streams**. 

Nôm na là khi collection của các bạn xuất hiện các action thêm sửa xóa thì Change Streams sẽ trả cho bạn 1 event liên quan tới những document có thay đổi. Mình dựa vào event này để invalidate cache của item đó trong ứng dụng.

Cách này có 1 số đặc điểm mà các bạn cần lưu ý:

- Change Streams chỉ khả dụng trên **replicaset** hoặc **sharded cluster**.
- Change Streams không gây gánh nặng quá lớn cho Database, tuy nhiên việc lắng nghe Change Streams sẽ **tốn connection**. Các bạn nên để ý con số này so sánh với pool size ở client.
- Xử lý Change Streams gây **gánh nặng cho chính ứng dụng của bạn**. Hãy cân nhắc khi sử dụng và chỉ nên dùng với những dữ liệu có tần suất write thấp hơn read rất nhiều.

Vậy là cơ chế cache hoàn chỉnh của mình sẽ là:

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/z8d1jk2i70_caching4.png)

Nhờ vào cơ chế invalidate này, mình có thể tăng thời gian cache lên tới 1-2 ngày, từ đó giúp tăng Cache Hit Ratio lên tối đa. (>90%)

## Tổng kết

Một số thành quả mình thu được:

- Tối ưu việc sử dụng RAM phục vụ cho cache. **200MB cho 30k active item** với thời gian expire là 1 ngày.
- Tăng throughput API từ **2k rps** lên **40k rps**
- Giảm latency từ **TP95 48ms** xuống **TP95 3ms**
- Cache Hit Ratio đạt **93%** với 5 instance chạy song song (chạy nhiều instance song song sẽ làm giảm Cache Hit Ratio). Đây là chỉ số rất quan trọng giúp mình đánh giá được hiệu quả của việc sử dụng cache trên 1 tập dữ liệu tự nhiên (chứ không phải ngồi benchmark 1 item được cache rồi nghĩ nó xịn đâu nhé)
- Cache lag time chỉ **tính bằng ms** - thời gian xử lý event Change Streams.

Hết rồi. Nếu có câu hỏi gì vui lòng comment nhé.