Hello ace, :raised_hands:

Tin vui là, nếu bạn đang tìm kiếm những lời khuyên trong quá trình sử dụng **Google Cloud Platform (GCP)** sao cho tiết kiệm về măt chi phí sử dụng, thì bạn sẽ không phải đi đâu nữa rồi nhé! 

Tin không vui lắm, là những chia sẻ chỉ từ cá nhân tác giả của bài viết gốc [*tại đây*](https://rominirani.com/google-cloud-platform-factors-to-control-your-costs-5a256ed207f1) nên sẽ có khả năng có đâu đó những điểm chưa thật sự chính xác 100%, vì thế các bạn hãy comment góp ý để mình tìm hiểu và chỉnh lại nhé. 

> *Thói quen tốt nhất vẫn là theo dõi bill hàng tháng, từ đó đưa ra được phương án hành động phù hợp nhất*

# Free Trial - Gói dùng thử

Sau khi bạn Sign-up GCP sẽ mặc định cho phép bạn sử dụng gói [Free Trial](https://console.cloud.google.com/billing/freetrial) . Để giới thiệu trong vài dòng: sau khi bạn sign-up với thẻ credit, bạn có ngay 300 USD trong TK sử dụng trong 12 tháng. Yên tâm là, con số 300 USD sẽ đủ cho bạn vọc vạch Cloud  - các service của nó.

Bạn có thể lo lắng: "Đậu, mình link với credit card như thế thì sau 12 tháng, ko để ý thì nó charge mình thì bỏ mợ.." thì thoải mái nhé vì GCP cam kết, Credit card của bạn sẽ không bị charge tiền nếu bạn sài hết 300 USD. Và bạn sẽ được GCP khi bạn chạm ngưỡng này. *Xem ý thứ 3 - được đề cập khi bạn sign-up GCP*

![](https://images.viblo.asia/06a7402f-1ca0-47d5-b999-8074342f1b51.png)

# Free Tiers - Gói miễn phí 

Không chỉ GCP mà AWS cũng có các `Gói miễn phí` - `Free Tiers`. `Free Tiers` sẽ *trọn đời* free - và tất nhiên bạn sẽ chỉ được sài giới hạn về số lượng những service của GCP (tức là những Service như Cloud SQL, Memorystore for Redis... sẽ không được cấp chùa) và bị giới hạn ở mức mức độ sử dụng (trên phương diện về cấu hình...)

![](https://images.viblo.asia/429ccc91-8dbb-459a-9702-5802616c126a.png)


Screenshot phía trên chỉ là một góc của những serivce mà `Free Tiers` cho phép bạn sử dụng cùng với ghi chú về *mức độ* sử dụng của nó. Ví dụ: Với Google Compute Engine bạn sẽ được dùng free một em có mã hiệu `f1-micro instance` - nghe *micro* là thấy tí xí rồi :v 

Gói này hướng đến đối tượng là các bạn Developer đang muốn sử dụng - vận hành thử các service cơ bản của GCP trước khi đi sâu vào ứng dụng chuyên nghiệp. Lưu ý là nếu bạn sử dụng vượt qua hạn định cho phép, credit card của bạn sẽ bị charge đấy nhé.

- Chi tiết về gói GCP Free Tier : <https://cloud.google.com/free/>

Ghi nhớ rằng *Free tier* không đi cùng với những điều khoản thỏa thuận về mức độ dịch vụ của GCP (các điều khoản này gọi chung là SLAs - Service-level agreement). 1 ví dụ về SLAs có thể là: "Bọn tao (AWS hoặc GCP) cam kết nếu mày dùng service xyz này thì mức độ avalability (tính sẵn sàng) luôn ở mức 99,999999999%" (Tức là xác suất mà bạn không truy cập được data của bạn là 0,0000000001% ý :v). Gói free mà, họ sẽ không  chạy backup, clone 1 service tương tự để đảm bảo abcxyz cho bạn đúng hem :v 

# GCP Cost Calculator

Hãy làm quen với [Cost Calculator](https://cloud.google.com/products/calculator/) - một tool cũng chính bởi GCP cung cấp. Nếu bạn muốn biết GCP sẽ tính tiền bạn như thế nào khi sử dụng GCP thì hãy vọc cái tool này. Chúng ta dùng Cloud một phần rất lớn vì tính mở rộng linh hoạt của nó, nên trong quá trình vận hành, mô hình chung bạn sẽ sử dụng nhiều service hơn so với dự tính ban đầu.

Hãy chọn thử một service mà bạn định sài, cố gắng fill càng nhiều value càng tốt vào các hạng mục thành phần, khi đó bạn sẽ càng rõ được hạng mục nào "đốt" tiền bạn nhiều nhất đấy :rofl:

![](https://images.viblo.asia/49d47b32-9ff8-4a91-bce7-a6e8e3e80c08.png)

# Setup/Shutdown/Destroy Scripts

Một lời khuyên là bạn hãy nên có sẵn cho mình một bộ scripts setup/shutdown/destroy cho tất cả những resource/service mà bạn đã tạo để sử dụng. Bạn có thể dùng  [**gcloud**](https://cloud.google.com/sdk/gcloud/) - một giao diện command-line để bạn thao tác với Google Cloud Platform. thông qua những câu lệnh trên`gcloud` bạn có thể quản lý hầu hết tất cả các resource và tốt nhất là bạn tạo sẵn 2 loại script quan trọng nhất là **shutdown** và **destroy** nhé.

Lý do là bạn sẽ dùng scripts kiểu này chủ yếu cho các resource về "điện toán" (như Compute Engine). Một trong những thông số để GCP tính tiền bạn là dựa vào thời gian bạn sử dụng dịch vụ đó. Tức là sài càng lâu - resource ở trạng thái active càng lâu thì càng tốn tiền. Những Script này sẽ thay bạn tắt những resource khi bạn không dùng đến chúng vào những khoảng thời gian - tất nhiên là do bạn định ra. 

# Storage Space Allocation

Bạn sẽ bị tính tiền vào dung lượng lưu trữ mà bạn phân bổ/ request/ yêu cầu từ đầu chứ không phải dựa vào dung lượng thực tế mà app/ hệ thống của bạn đang dùng đâu nhé. Ví dụ bạn đặt 100GB SSD, và hiện tại app bạn đang ngốn 10GB thì bạn sẽ bị charge tiền cho cái số 100GB đó. 

Thiết bị lưu trữ thì ngày một rẻ, nhưng nếu bạn sài nhiều thì nó cũng sẽ "bớt" rẻ đấy. Với lại bạn cũng nên đặt nhiều hơn so với dự kiến một chút bởi một số thiết lập mặc định hay IOPS cũng yêu cầu bạn nên cấp phát một lượng ổ đĩa lớn hơn để đảm bảo performance nhé.

## SSD đắt hơn HDD

SSD chắc chắn mắc hơn HDD. Hãy xác định rõ nhu cầu về performance system của bạn từ đó lên kế hoạch đặt SSD hay HDD cho phù hợp 

Ví dụ dưới đây là giá của Persistent disks (Standard and SSD) ở vùng Northern Virginia:

![](https://images.viblo.asia/21fa41bc-83da-48f7-9127-80ce6116ae79.png)

# Setup Budgets

Nếu bạn muốn "đảm bảo" tình chị em với đội Kế Toán, tình anh em với cấp trên thì nhớ `Setup Budget` nhé :rofl:

![](https://images.viblo.asia/00dca1cc-14ab-4cae-8a64-67a3843bc574.png)

Bạn có thể thiết lập mức chi tiêu hằng tháng, GCP sẽ hộ trợ bạn trong khâu kiểm soát việc chi tiêu này để phòng những trường hợp chính bạn không kiểm soát được mức độ tiêu thụ của các dịch vụ mà bạn đã thiết lập hay bị tấn công từ bên ngoài (kiểu hacker sẽ build hàng loạt instance của Compute Engine - tầm vài trăm cái để đào coin chẳng hạn @@). Để biết các setup chi tiết, hãy đọc [documentation](https://cloud.google.com/billing/docs/how-to/budgets) mục **Billing → Budgets and Alerts**.

## Billing Alerts

Bên cạnh budget, anh em cũng nên thiết lập luôn `Billing Alerts` nhé. `Billing Alerts` sẽ thông báo đến bạn khi mức tiêu thụ dịch vụ chạm đến các ngưỡng mà do chính bạn tùy ý thiết lập. Chức năng này quá cần thiết nếu bạn muốn kiểm soát được tình hình trước khi chuyện "tệ hại" diễn ra.

Dưới đây là một ví dụ, để ý thấy bạn có thể set Budget đến hạn mức là một con số cụ thể hay là mức mà bạn đã sử dụng vào tháng trước. 

![](https://images.viblo.asia/ace0154c-bcc0-45e6-b971-e9edf3d033fc.png)

# Hiểu Ingress / Egress

Đây là một đại lượng khó để theo dõi, nhưng chúng ta cần hiểu cơ bản luồng đến system và ra khỏi system của bạn. Có thể hiểu là lượng request / response nói chung. 

GCP không tính tiền với `Ingress (luồng đi vào)` nhưng sẽ thu phí đối với `Egress (luồng đi ra)`. Nhưng điều này cũng còn phụ thuộc vào việc các service trong system của bạn nằm trên cùng hay khác **region (vùng)** , cùng hay khác **zone**, có cùng trên GCP...

Ví dụ, nếu bạn gọi API từ *1 instance* trong GCP đến một service / server nào đó nằm ở nhà cung cấp điện toán đám mây khác (AWS, Azure...) thì Egress này sẽ bị thu phí. Thậm chí không cần phải khác nhà cung cấp, chỉ cần các service GCP của bạn nằm ở các *zones/regions* khác nhau là bạn đã bị thu tiển rồi. 

Dưới đây là 1 ví dụ bảng giá Network của Compute Engine tại thời điểm của bài viết này. Rõ ràng đây là một đại lượng rất khó để dự đoán và phụ thuộc rát nhiều vào mức độ am hiểu của bạn về các service khác nhau và tương tác giữa chúng trong system của bạn. 

![](https://images.viblo.asia/a65ef021-2a76-4351-be2b-970f42d19140.png)

# Auto-scaling : Lợi hay Hại?

Tính năng ưu việt nhất của cloud là `dễ dàng mở rộng`. Những nhà cung cấp cloud ngày càng hỗ trợ mạnh mẽ giúp chúng ta giải quyết những bài toán về quản lý resource khi hệ thống cần phải mở rộng (scale-up) để đáp ứng nhu cầu.

Chỉ cần một *dấu tick* vào check box là bạn đã đồng ý để GCP chủ động - tự động scale-up đồng nghĩa với việc khi nhu cầu tăng lên (một cách đột biến chẳng hạn) thì GCP sẽ tự động bổ sung thêm "cấu hình" để giải quyết vấn đề - đồng nghĩa với việc bạn sẽ bị thu phí thêm cho những "cấu hình" được thêm vào đó. Ngược lại khi nhu cầu giảm đi thì GCP sẽ lại tự động cắt bớt/ hạ thấp những "cấu hình" này. 

Bạn sẽ phải tự mình đưa ra quyết định rằng sẽ tự chủ trong việc quan lý một số lượng cố định những "bản sao" máy chủ (instance) hay để GCP tự động hỗ trỡ bạn trong vấn đề scale-up này.

# Storage Classes - Các Cấp Lưu Trữ. 

Một trong những service phổ biến của GCP đó là [Google Cloud Storage](https://cloud.google.com/storage/), một Store lưu trữ các object có thể được access tại bất cứ đâu. GCP phát hành ra các cấp lưu trữ khác nhau dành cho Storage (Bucket) nhằm hướng đến những nhu cầu sử dụng khác nhau. 
Ví dụ, bạn đơn thuần chỉ muốn lưu log file - dữ liệu ít cần được truy cập (low access frequency) và cũng không cần phải tốc độ cao khi truy cập (low latency), thì class `Nearline Storage` sẽ là lựa chọn phù hợp, giúp bạn tiết kiệm được gần 1 nửa chi phí so với gói thông thường.

Tham khảo bảng dưới đây để xem điểm khác nhau giữa các Cấp Bucket và giá thành giữa chúng như thế nào.

![](https://images.viblo.asia/03deb616-2581-41a6-9fb6-de3ee4596b5f.png)

# Managed Services

`Managed Services` là những serivce mà phía GCP sẽ hỗ trợ mình trong việc quản lý, giúp bạn giải phóng nguồn lực quản lý, bảo trì, vận hành - và tất nhiên là nó sẽ tốn phí hơn. 

Lấy ví dụ như Managed Cloud SQL, GCP sẽ lo phần dựng server, bảo trì, tất cả việc bạn cần làm là thiết lập cài đặt, thông số, nhất nút là xong! bạn đã có một một DB Service sẵn sàng được khai thác. 

Tuy nhiên, nếu bạn có đội ngũ infra ngon lành, bạn hoàn toàn có thể tự mình đăng kí một Compute Engine instance, cài MySQL trên đó, mở vài port, setup network rồi kết quả cũng sẽ được một DB Service như trên và tiết kiệm được hi phí (thường sẽ là thế :v)

During development phase, you might not have a need for Automatic Backup, Failover and Replica features that are provided as part of the Cloud SQL offering .

Nhưng với những bài toán lớn như Big Data thì `Managed Services` chắc chắn sẽ giúp bạn tiết kiệm nhiều. (phần Big Data này mình không rành, nên các bạn tự tìm hiểu nếu có nhu cầu nhé).

# Billing Data Export

Nếu dự án của bạn đòi hỏi cần phải giám sát chặt chẽ chi tiêu trong GCP, thì bạn sẽ có thể muốn khai thác API mà GCP cung cấp để truy cập đến Billing data của bạn để bạn có thể hiện thị nó trên bất cứ công cụ nào khác của mình phục vụ việc phân tích. 

Chi tiết bạn đọc tại [Getting Started guide with the Billing API](https://cloud.google.com/billing/v1/getting-started). 

# Summary

Vậy là chúng ta đã vừa cùng nhau điểm qua vài khía cạnh trong vấn đề làm sao để sử dụng một cách hiệu quả và tiết kiệm các service của GCP. Tất nhiên đây mới chỉ là những chia sẻ rất khái quát, về chi tiết đòi hỏi bạn cần dành thời gian tự mình nghiên cứu sâu hơn!