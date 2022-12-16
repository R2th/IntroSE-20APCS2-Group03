## Bối cảnh
    
Chào mọi người ! Mình làm một dự án cũng khá là lâu, dự án được cái cũng có số lượng người dùng tương đối, nên cũng may mắn được trải nghiệm vấn đề như thế này: 
1.  Server batch (dùng để chạy sidekiq job) cứ khoảng 1 tuần với số lượng người dùng đủ lớn thì sẽ càng ngày càng leak memory và không giải phóng, hậu quả đương nhiên là chiếc server già cỗi nó cứ cảnh báo liên tục. Em Bot cảnh báo vì thế mà hoạt động hết công suất. 
2.  Cũng đau đầu, mình có nhảy vào check các job đang hoạt động bằng câu lệnh quen thuộc `ps aux|gref sidekiq`
Và kết quả là `[0 of 25 busy]` chẳng thấy cái job nào được chạy cả. Tương tự kiểm tra queue job sidekiq cũng không thấy gì bất thường.
3.  Chạy `htop` để theo dõi %CPU %MEM => thì thấy tác vụ liên quan đến ruby đang chiếm % khá cao.
4.  Giải pháp tạm thời cho vấn đề trên là `restart lại sidekiq`. Mọi thứ lại okie cho đến 1 tuần sau đó =))

## Nguyên nhân và cài đặt jemalloc

#### 1. Nguyên nhân

Như mình đã nói ở trên, phán đoán ban đầu nguyên nhân ngọn thì nó là do leak memory, các tác vụ xử lý xong không giải phóng bộ nhớ và càng ngày sẽ càng đầy. Tuy nhiên nguyên nhân gốc rễ thì mình tìm được ở bài viết này [taming-rails-memory-bloat](https://www.mikeperham.com/2018/04/25/taming-rails-memory-bloat/). Vấn đề về cấp phát bộ nhớ cũng như khả năng giải phóng của ruby on rails khi sử dụng sidekiq được mô tả khá chi tiết ở trong bài viết, mình không đề cập thêm. Bài viết có đề cập rằng việc sử dụng `jemalloc` mang lại kết quả khả quan (giảm việc sử dụng bộ nhớ, tránh phân mảnh ... đến hơn 4 lần). Nói chung cái này phải cài thử và có thời gian theo dõi thực tế thì chúng ta mới có đánh giá khách quan được.

#### 2. Cài đặt jemalloc
![jemalloc.png](https://images.viblo.asia/9c5642dc-a4df-497b-8e5f-9bf26fe8957e.png)

Đây là kết quả sau khi tôi cài đặt jemalloc vào 12h ngày 1/6/2022, như quý bạn đọc có thể thấy là độ dốc của đồ thị đã giảm đáng kể (những pha hẫng của các ngày trước chính là thời điểm restart sidekiq). Vậy thì hiệu quả mang lại của jemalloc đối với tôi mà nói là 9.5 điểm.

* Cài đặt `jemalloc` lên server và theo dõi (nó chỉ là reinstall ruby với option jemalloc thôi nhé):

`
sudo apt install libjemalloc-dev
`

`
rvm reinstall 2.5.1 -C --with-jemalloc
`

* Sau khi cài đặt thì check thử xem đã cài đặt thành công chưa bằng câu lệnh:

`
ruby -r rbconfig -e "puts RbConfig::CONFIG['LIBS']"
`

* Kết quả trả về có chứa 'jemalloc' là được:

`
-lpthread -ljemalloc -lgmp -ldl -lcrypt -lm
`

**Lưu ý:** *Mình đã cài đặt thử trên các môi trường Dev, stag để test lại các chức năng dự án trước khi được cấp phép install nó trên Production. Các chức năng hoạt động bình thường, tuy nhiên để test leak memory thì do việc sử dụng chủ yếu là QA, số lượng request khôgn đủ nhiều, nên có thể chưa có đánh giá nào đó rõ ràng, mọi người cân nhắc trước khi sử dụng nhé.*

**Update ngày 6/6/2022:** *Sau quá trình sử dụng từ 1/6 đến 6/6 thì độ dốc đồ thị đã giảm rõ rệt trên production* 

#### 3. Một số cách thủ công khác

##### Crontab restart sidekiq

* Tại sao tôi lại gọi là thủ công, vì như ở đầu bài viết có đề cập, việc restart lại sidekiq sẽ giúp giải phóng thủ công memory. Do đó tuỳ theo dự án của bạn như thế nào thì có thể chạy crontjob để restart sidekiq thủ công. Tuy nhiên phải có những lưu ý sau:
* Cơ chế restart sidekiq của bạn không làm mất các job đang chạy mà chỉ đẩy lại các job về queue và lôi ra xử lý lại.
* Nên viết một file sidekiq.service trong thư mục `/etc/systemd/system` để dùng câu lệnh `sudo service sidekiq restart` được dễ dàng hơn. (Nội dung file service này tôi sẽ không ghi chi tiết ở đây vì có thể nó không phù hợp với dự án của bạn, tuy nhiên hiểu đơn giản thì cách dùng của nó cũng tương tự một file bash script mà thôi, khác cái là đứng đâu bạn cũng có thể sử dụng được câu lệnh trên).

##### Config concurency của sidekiq

* Như ở ví dụ đầu tiên sau khi check ra  `[0 of 25 busy]` chúng ta cứ hiểu là tôi đang sử dụng concurency config của sidekiq là 25. Theo link bài viết đã được [dẫn ở trên](https://www.mikeperham.com/2018/04/25/taming-rails-memory-bloat/) cũng đã để cập đến vấn đề này, tất nhiên việc giảm con số này sẽ giúp giảm leak memory, nhưng cũng nên cân bằng với spec dự án, để đưa ra con số cho phù hợp.

## Tổng kết

Bài viết trên đây là một vài kiến thức tôi thu nhặt được trong quá trình xử lý vấn đề leak memory của dự án, mục đích viết bài vừa để chia sẻ kinh nghiệm cá nhân đến những ai đang gặp vấn đề tương tự, cũng như là một **NOTE** cho chính bản thân. Thật vui nếu như bài viết nhận được những comment bổ sung kiến thức của quý bạn đọc, nó sẽ là kinh nghiệm quý báu không chỉ cho tôi mà còn cho những ai có thể view được bài viết này.