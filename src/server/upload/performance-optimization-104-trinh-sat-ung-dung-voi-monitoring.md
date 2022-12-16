Con đường trở thành **thám tử chuyên nghiệp** của chàng developer.

Người ta thường nói **lạt mềm buộc chặt**, hàm ý chỉ muốn giữ hạnh phúc gia đình thì hãy tạo cho nhau khoảng trống và đừng quản lý nhau kiểu mất tự do. Nhưng câu nói này không có ý nghĩa mấy với chúng ta, những developer chân chính đi tìm kiếm sự hoàn hảo đâu. 

Nếu bạn yêu ứng dụng của mình thì chỉ có cách **cần trô** thật chặt, thật kinh khủng, thật mất tự do vào. Nhất cử nhất động của ứng dụng chúng ta đều phải nắm được. Nó đang khỏe hay yếu, nhanh hay chậm, ho sốt cảm cúm gì không mình cũng đều phải biết cả. 

Hãy theo dõi thật chặt, đừng để ứng dụng của bạn đi với **trà xanh**!!!

![](https://images.viblo.asia/504cd3fe-6734-4766-99e7-0f67b14207df.jpg)

## First things first

Vâng và lại là mình trong bài viết thứ 4 của series [**Performance Optimization Guide**](https://viblo.asia/s/DVK2jDQ2KLj) đây các bạn. Mong rằng các bạn vẫn ủng hộ đều series này của mình để mình có thêm động lực viết tiếp nhé. Hãy **upvote** và **clip** bài viết này ngay trước khi đọc kẻo trôi mất nhé =))

Thế tôi là đâu, đây là ai?

- [Chap 1: Performance Optimization 101: Những câu hỏi cơ bản?](https://viblo.asia/p/performance-optimization-101-nhung-cau-hoi-co-ban-Qbq5Q9BE5D8)
- [Chap 2: Performance Optimization 102: Scalability và câu chuyện về ảo tưởng distributed](https://viblo.asia/p/performance-optimization-102-scalability-va-cau-chuyen-ve-ao-tuong-distributed-3Q75wQA9ZWb)
- [Chap 3: Performance Optimization 103: Nghệ thuật tìm kiếm bottleneck](https://viblo.asia/p/performance-optimization-103-nghe-thuat-tim-kiem-bottleneck-jvEla784Kkw) 

- **Chap 4: Performance Optimization 104: Trinh sát ứng dụng với monitoring** <~ YOU ARE HERE

Sau ba phần đầu của series thì chắc hẳn các bạn đã hiểu được sương sương việc tối ưu performance nó sẽ cần phải làm những thứ gì rồi đúng không? Trà xanh thì cũng nghi ngờ 1 vài đứa rồi. Cái các bạn cần bây giờ là bằng chứng, rồi lịch sử trò truyện của chúng nó, rồi xem chúng nó có check-in chỗ nào quen quen không,...

Vâng mình xin trân trọng giới thiệu dịch vụ thám tử mang tên **monitoring**, thứ giúp cho nhất cử nhất động của ứng dụng của bạn đều nằm dưới sự kiểm soát. Giả mà có nó léng phéng với đứa nào thì bạn sẽ biết ngay, đây sẽ là cơ sở quan trọng để bạn bắt bệnh của nó, tại sao nó lại hay chết, tại sao nó lại phản bội bạn.

![](https://images.viblo.asia/6f5c0f26-9dcf-4049-8d48-105b40520239.jpg)

**Okay, let's start!**

## Some thuật ngữ

Bởi vì chắc các bạn, những người đọc bài viết này phần lớn là developer (sorry nếu bạn không phải). Mà developer thì mình thấy thường có tư tưởng lo phần code của mình cho tốt thôi là xong. Do đó monitoring ứng dụng chắc cũng là những kiến thức khá mới lạ đối với các bạn. Do đó mình sẽ giải thích 1 số thuật ngữ mà các bạn có thể gặp khi bước chân vào con đường này nhé. Giải thích kiểu nôm na dễ hiểu thôi không học thuật đâu.

Để vận hành 1 application, ta thường có các hệ thống sau đi kèm: **Logging**, **Tracing**, **Metrics monitoring**:

**Logging**: Là hệ thống thu thập, tìm kiếm, phân tích,... log của ứng dụng

**Metrics**: Là các **giá trị**, **phản ánh hệ thống** tại **1 thời điểm**. Việc thu thập metrics theo thời gian sẽ tạo ra các **time series data**. **Monitoring** thường được hiểu là việc thu thập và theo dõi các metrics trên.

**Tracing**: Là các hệ thống theo dõi đường đi của 1 request tới hệ thống. Nó đi qua những service nào, dừng ở mỗi service bao lâu, lỗi ở step nào,...

Trong bài trước mình đã hướng dẫn các bạn quy trình và các phương pháp tìm kiếm bottleneck rồi. Còn đây sẽ là **công cụ** để phục vụ các phương pháp tìm kiếm trên.

Trong bài viết này mình chủ yếu nói tới monitoring với stack **prometheus / grafana**, do đó chắc các bạn nên có kiến thức 1 chút về 2 thằng này trước khi đọc tiếp nhé.

## Các metrics cần thiết cho từng loại ứng dụng

Mới bước chân vào thế giới monitoring thì ai ai cũng sẽ hỏi những câu hỏi sau:

- **Tôi cần thu thập data gì?**
- **Thu thập data nó như thế nào?**
- **Nhìn vào 1 cái dashboard thì sẽ nhìn vào đâu, những con số này nói lên điều gì?**

Để trả lời cho câu hỏi đầu tiên thì mình sẽ tóm tắt cho các bạn bằng sơ đồ tư duy sau (cái này là mình rút ra từ quá trình làm việc thực tế luôn). Dưới đây là những chỉ số cần thiết đối với từng loại ứng dụng:

![](https://images.viblo.asia/5630a46f-3f34-47bc-b5e5-aa1c07bd02d6.png)

Giải thích 1 chút, các bạn sẽ nhìn thấy việc monitoring bao gồm 2 hệ metrics:

**Resource Metrics**: các metrics liên quan tới tài nguyên như CPU, RAM, Network,... Những metrics này có thể dễ dàng thu thập qua các tool của bên thứ 3. (như thu thập CPU, RAM,... bằng `node_exporter` với prometheus).

Các metrics này nói chung sẽ thường liên quan tới các chỉ số dạng:

- Utilization: Tỷ lệ sử dụng
- Saturation: Phản ánh sự quá tải
- Error: Tỷ lệ lỗi (nhưng thường là ít)
- Availability: Tỷ lệ khả dụng

**Application Metrics**: các metrics liên quan tới workload của ứng dụng. 

Nếu ứng dụng ở đây là 1 application của bên thứ 3 thì sẽ thường đi kèm với các loại metrics của riêng nó. Ví dụ MySQL sẽ đi kèm các chỉ số riêng nó và có thể thu thập qua `mysqld_exporter` chẳng hạn. 

Nếu ứng dụng là application do bạn xây dựng, thường thì bạn sẽ phải là người cung cấp các chỉ số như trên thông qua việc tính toán và viết exporter riêng.

Metrics hệ application thường bao gồm 3 chỉ số sau:

- **Throughput**: Các chỉ số liên quan tới tốc độ (req/s, byte/s, msg/s...)
- **Latency / duration**: Các chỉ số liên quan tới thời gian xử lý.
- **Error rate**: Các chỉ số liên quan tới tỷ lệ lỗi và thành công.

Trong hình mình có đề cập tới chỉ số của các loại ứng dụng thường gặp:

- **API**: Ứng dụng cung cấp API. Với loại ứng dụng này thì thông thường người ta có thể thu thập các loại metrics của nó thông qua tầng **proxy** ở phía trước như nginx, haproxy,.... và bạn không phải làm gì mấy.

> **TIPs**: Để thu thập được metrics của API qua tầng proxy thì bạn nên tuân thủ quy chuẩn về HTTP status code. Ví dụ 2xx là thành công, 4xx là lỗi client, 5xx là lỗi server. Nếu bạn dùng chung HTTP status là 2xx xong trả lỗi trong response body thì sẽ không thu thập được error rate qua proxy đâu nhé.

- **Worker**: Các ứng dụng dạng background job thì hên xui, nếu bạn dùng 1 thư viện có sẵn như celery của python, bull của js,... thì nó có những thằng thu thập được metrics của nó luôn. Còn nếu không dùng các thư viện nổi tiếng thì bạn sẽ phải tự viết các loại exporter để thu thập metrics.

> **TIPs**: Viết exporter cho prometheus khá đơn giản, bạn import client của prometheus vô app, expose ra 1 endpoint `/metrics` để prometheus gọi tới. Và cứ mỗi khi thực hiện hành động thì chỉ cần increase cái counter của nó là xong.

- **Socket**: Đối với các ứng dụng socket thì người ta sẽ quan tâm tới **số lượng client** nhiều nhất. Về mặt performance mà nói thì các metrics của socket sẽ thường liên quan tới việc tối ưu config nhiều hơn (timeout, connection lenght, openfile,...)

- **Cache**: Caching đóng vai trò cực kỳ quan trọng trong các hệ thống tải lớn, và cũng là con át chủ bài của tối ưu performance. Chính vì thế theo dõi được các metrics của hệ thống cache có ý nghĩa to lớn với việc xem xét tối ưu. Metrics quan trọng nhất cho thằng này chính là **hit/miss** ratio.

> **TIPs**: Redis, memcache,... hay những thằng chuyên cache có exporter riêng, còn nếu bạn tự sử dụng memory cache trong ứng dụng của mình (tự lưu vào biến ấy) thì sẽ phải tự implement phần metrics này nhé.

- **Message queue**: Hệ thống message queue cũng có vai trò quan trọng trong các hệ thống microservices, write buffering,... do đó cũng là 1 chỗ dễ dàng nhìn thấy bottleneck. Monitor hệ thống message queue thì hãy quan tâm tới các chỉ số về trạng thái message và độ lag của consumer sau producer (báo hiệu consumer có vấn đề)

Ngoài ra thì nếu đi vào tối ưu sâu hơn thì sẽ gặp các loại **Language specific** metrics, tức là các metrics cho các ngôn ngữ cụ thể. Kiểu java thì có các metrics của JVM như heap memory, thread, garbage collector. Golang thì có các metrics về goroutine, garbage collector,... Những cái này nếu các bạn đi sâu thì sẽ gặp, còn không thì cũng không gặp mấy.

## Thu thập data metrics như nào?

Để không mất nhiều thời gian loằng ngoằng thì hãy đi vào cụ thể luôn với stack phổ biến nhất nhì hiện nay là prometheus + grafana.

![](https://images.viblo.asia/fc17740c-b57f-4e18-bfc4-f9d6f014b36e.png)

Trong ảnh trên, các bạn sẽ thấy hệ thống prometheus + grafana sẽ gồm các phần chính:

- **Exporter**: thu thập data từ resource, application và expose ra 1 endpoint **/metrics**
- **Prometheus**: định kỳ gọi tới các endpoint **/metrics** để lấy data về lưu.
- **Grafana**: Dashboard để visualize metrics được lưu trong Prometheus
- **Alert Manager**: Setup các rule để notify người dùng khi có vấn đề bất thường.

Vậy với hệ thống của bạn thì bạn sẽ cần làm các bước sau: 

- Setup prometheus, grafana
- Setup exporter cho application
- Config job cho prometheus gọi tới exporter của bạn
- Vào grafana và tạo chart hiển thị data từ exporter của bạn.

Đây là [grafana dashboard](https://dashboards.gitlab.com) của **gitlab**:

![](https://images.viblo.asia/7e7b8ab4-de8e-43fe-8a5a-2adf834c4259.png)

Setup prometheus, grafana hay config job, chart thì có tut đầy rẫy trên mạng rồi, mình sẽ chỉ nói qua 1 tý về phần exporter cho ứng dụng của bạn thôi.

**Metrics data** mà exporter xuất ra sẽ có dạng sau:

```
<tên metric>{<label>=<label_value>,...} <value>

Ví dụ:
http_request_total{method="GET", path="/profile/me"} 10
http_request_total{method="POST", path="/posts"} 11
```

Trong đó `http_request_total` là tên metric. `method` và `path` là label và `10` là **giá trị của metric tại thời điểm prometheus thu thập**.

> **Lưu ý:** Prometheus hoạt động dựa vào mô hình pull metric, tức là prometheus sẽ gọi tới các endpoint **/metrics** để lấy data. Do đó data này sẽ **KHÔNG CHỨA THỜI GIAN** mà thời gian sẽ được prometheus tính tại thời điểm gọi luôn.

Giả sử bạn có 1 API `GET /profile/me` với đoạn code như sau:

```javascript
const express = require('express')
const app = express()
const port = 3000

router.get('/profile/me', async (req, res) => {
    res.json(await db.findById(req.user.id));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

Để thêm 1 chiếc counter đếm số request được gọi vào app của bạn thì bạn có thể thêm đoạn code sau:

```javascript
const prometheus = require('prom-client');

const counter = new prometheus.Counter({
    name: 'http_request_total',
    help: 'Number of requests',
    labelNames: ['method', 'path']
})

app.use((req, res, next) => {
    // don't count /metrics request
    if (req.path != '/metrics') {
        counter.inc({ 
            method: req.method, 
            path: req.path 
        });
    }
    next();
});

// expose metrics endpoint
app.get('/metrics', async (req, res, next) => {
    res.set('Content-Type', prometheus.register.contentType);
    return res.end(prometheus.register.metrics());
});
```

Data khi gọi `/metrics` sẽ có dạng:

```
http_request_total{method="GET", path="/profile/me"} 100
```

Rất đơn giản phải không? Bạn có thể sử dụng để đếm số request, đếm thời gian,... tất cả những cái mình vừa nói ở trên và đẩy ra thành metrics cho prometheus rồi.

## Những con số này nói lên điều gì?

Đến đây công việc của bạn mới chỉ hoàn thành 1 nửa thôi. Thu thập được data là 1 chuyện, nhưng có sử dụng được data đó không lại là 1 chuyện khác.

Bọn mình khá tự hào là có 1 hệ thống monitoring tương đối xịn xò và đầy đủ, tức là tất cả các loại resource, rồi tất cả các metrics ứng dụng ở trên đều đã có trên hệ thống, có dashboard monitor hẳn hoi rồi. Nhưng thật sự số người có thể dùng được những dashboard đó, tức là biết **cần phải xem cái gì**, **ở đâu**, **những con số có ý nghĩa thế nào**, đây là **cao hay thấp**, **bất thường hay bình thường**,... thì chỉ đếm chưa hết 1 bàn tay.

Có vậy mới hiểu trong tất cả các hệ thống thì xây dựng công cụ vẫn là phần rất dễ. Bài toán về những người sử dụng công cụ ấy mới là nan giải.

Hãy cùng mình điểm qua 1 ngày làm việc của bạn Minh Monmen trên cương vị là người monitor hệ thống. (Thật ra có nhiều thứ có thể làm tự động, nhưng mình vẫn thường thích thi thoảng nhặt lá đá ống bơ đi xem xét)

> Xin lỗi các bạn vì chỗ này mình không thể chụp ảnh dashboard thật cho các bạn xem được vì lý do bảo mật. Do đó hãy tạm nghe lời kể và tưởng tượng thôi nhé.

Đầu tiên hãy nhìn vào **dashboard tổng quan hệ thống compute**. Trong đó bọn mình có các chỉ số bao gồm:

- **CPU usage cho toàn bộ cluster K8S**
- Top các ứng dụng sử dụng CPU
- RAM usage
- API Throughput (req/min)
- API error rate 
- CCU

Đối với hệ thống compute thì thông thường **CPU sẽ phản ánh chính xác** tình hình hệ thống của bạn (vì RAM thường thì sẽ thừa).

Lúc này, mình sẽ **đối chiếu** lượng tài nguyên CPU và CCU/throughput của hệ thống. Thường thì sẽ có thể nhận ra những bất thường kinh khủng khiếp như CCU ít mà CPU 80-90% chẳng hạn. Đây là hiện tượng thường thấy khi **hệ thống có tính năng mới chưa được tối ưu**. Do đó với số lượng request chưa lớn mà đã dùng rất nhiều tài nguyên hệ thống.

> **TIPs**: Kinh nghiệm ở đây thể hiện ở việc bạn map được throughput của hệ thống sang việc sử dụng tài nguyên. Đội vận hành có thể biết 1 con số là cao hay thấp **so với bình thường**, nhưng lại không nhận ra các nguy cơ **bottleneck** nếu như không hiểu về ứng dụng.

Kế tiếp là nhìn vào **dashboard hệ persistent**. Chỗ này sẽ là các chỉ số của đội database, thường là về tài nguyên của hội database này như:

- **CPU / load**
- **IOPS** (cái này rất quan trọng)
- RAM
- Query per second (thường thì ko hay xem cái này mấy, thật luông =))))

Yếu tố cần để ý nhất của hội database là phần **CPU load** và **IOPS** của disk. Bởi vì thông thường database hay bị yếu ở phần disk, do đó theo dõi **CPU load** lên cao, **CPU usage** do iowait và **IOPS** của db sẽ dễ nhận ra các điểm bất thường hơn cả.

**30% CPU là thấp hay cao?** Đây là câu hỏi khó trả lời và sẽ bị những thanh niên non kinh nghiệm bỏ qua. Cái này bọn mình đã gặp rất nhiều khi team vận hành phải setup alert cho metrics. Rất nhiều trường hợp nguy hiểm bị miss ở bước này do thiếu thông tin về việc application sử dụng tài nguyên.

Để đánh giá được 30% là thấp hay cao thì các bạn hãy tính toán đến các yếu tố sau:

- Query vào db có **đặc điểm** thế nào? Nhiều nhưng nhẹ? ít nhưng nặng? Thông thường 30% cái nhiều + nhẹ sẽ là ít, vì bạn sẽ cần rất nhiều query nữa mới hết tài nguyên. Nhưng nếu 30% là do 1 số ít nhưng nặng thì đó sẽ trở thành vấn đề vì chỉ cần tăng số query thêm 1 ít là db của bạn sẽ quá tải.
- 30% CPU nhưng là **user-busy**, **system-busy** hay là **iowait**. **system-busy** là kiểu ít gặp, **user-busy** là kiểu CPU của database phải tính toán nhiều như sum, count, sort,..., để tối ưu thì hãy quay lại **đặc điểm** query db ở trên nhé. Thông thường gặp kiểu này mà query dạng **nhiều mà nhẹ** thì bọn mình sẽ coi 30% là thấp. Nếu gặp **iowait** thì sẽ phải kiểm tra iops nữa, đây là dấu hiệu bạn query đọc ghi nhiều xuống disk và là kiểu thường sẽ bắt buộc phải tối ưu. Ở đây tối ưu thì có thể là đánh index, mở rộng ram, thay đổi query,...
- So với trung bình 1 khoảng thời gian. Nếu trước đó chỉ dùng 10% và nay lên 30% thì đó sẽ là vấn đề và hãy đi điều tra điều gì vừa thay đổi trong application của bạn.

Thứ ba là nhìn vào **dashboard job system**. Hệ thống background job của mình có thể nói là to và nặng nhất trong hệ thống khi lắng nghe event từ tương đối nhiều service. Ở đây sẽ có các chỉ số: 

- **Job state** (waiting, processing, success,...) (cái này quan trọng nhất)
- **Job duration** 
- Throughput (job/m)
- Error rate

Hệ thống job của mình có thể nói là cái mạng nhện khi connect tới kha khá service khác, do đó bất kỳ sự rung động nào của hệ thống cũng có thể được phản ánh bằng những biểu hiện như:

- Đọng job (waiting queue)
- Duration 1 job tăng cao
- Error rate tăng

> **TIPs:** Tất nhiên là giữa bao nhiêu hệ thống khác thì không phải tự nhiên mình lại hay lượn vào hệ thống job để coi. Hệ thống job thường có đặc điểm là làm các **công việc nặng nhọc và chậm như ghi data**. Thêm nữa **mức độ ảnh hưởng của nó lớn** (do kết nối nhiều service khác). Nên đây sẽ là nơi thấy được nhiều vấn đề nhất. Đừng chọn mấy hệ thống khỉ ho cò gáy vào xem làm gì cho mệt.

Cuối cùng là đảo qua 1 chút **dashboard của hệ thống caching**. Mặc dù Redis, memcache rất nhanh và xịn. Nhưng người dùng của nó (chính là chúng ta) thì không. Dashboard này sẽ có các chỉ số như:

- **Latency** (cái này lại thành quan trọng nhất)
- **Hit/miss ratio**
- CPU usage
- RAM usage
- Throughput (rps)

Với hệ thống caching, hiểu được chỉ số latency là quan trọng nhất, vì nó phản ánh chính performance của hệ thống cache và cách chúng ta sử dụng hiện tại. Có rất nhiều trường hợp anh em báo redis quá tải, nhưng khi kiểm tra thấy CPU không cao mà latency lại cao thì mình xác định được rằng chính việc sử dụng redis của dev mới là vấn đề. Chi tiết bạn có thể xem trong bài viết này: [Kỳ án tốc độ: Nỗi oan của chàng Redis](https://viblo.asia/p/ky-an-toc-do-noi-oan-cua-chang-redis-RQqKLQJzZ7z)

## Tổng kết

Mặc dù nằm trong chuỗi bài viết **guide**, nhưng do hạn chế về mặt thời lượng nên mình sẽ không đi sâu hơn vào từng chi tiết như cài đặt công cụ như nào, tạo dashboard như nào,... mà chỉ hy vọng các bạn sẽ nắm được cái linh hồn và kinh nghiệm tổng quát để sẵn sàng lặn sâu hơn vào bể kiến thức rộng lớn này.

Có rất nhiều ý kiến cho rằng: **đã làm dev thì không cần phải biết về vận hành** (không phải mình bịa đâu thật đó, mà từ những người rất có thâm niên công tác luôn). Tuy nhiên đối với mình thì điều đó không đúng. Kinh nghiệm vận hành, theo dõi hệ thống đã giúp mình rất nhiều và là thứ tạo nên sự khác biệt của mình trong nghề dev.

Đây gần như là điều kiện cần, là công cụ để các bạn thực hiện được những mục tiêu cao hơn bởi nếu chưa biết hiện tại ứng dụng của bạn ra sao, dùng tài nguyên thế nào thì thôi đừng nghĩ tới chuyện tối ưu.

Hope you enjoy this and upvote for me :D

Bye.