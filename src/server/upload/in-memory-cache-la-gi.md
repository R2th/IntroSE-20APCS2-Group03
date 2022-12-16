Bài viết gốc: ***https://www.tranthanhdeveloper.com/2020/12/in-memory-cache-la-gi.html***

Như chúng ta đã biết, máy tính thường sẽ có 2 nơi lưu trữ dữ liệu chính, một là ổ đĩa cứng và vùng thứ 2 là RAM. Việc đọc và ghi dữ liệu tại RAM và ổ đĩa cứng có sự khác biệt nhau rất lớn về mặt tốc độ. RAM cho chúng ta tốc độ đọc ghi đáng kinh ngạc tùy vào vào từng loại nhưng thường cho tốc độ hàng chục Gigabyte trên giây so với tốc độ từ khoảng 50 ~ 250MB/s của SSD. Nhìn vào những con số đó ta thấy rõ ràng tốc đọc và ghi giữa 2 vùng lưu trữ là rất lớn. Ngoài các thao tác đọc dữ liệu từ ổ đĩa cứng làm giảm hiệu năng thì các chương trình yêu cầu CPU tính toán nhiều cũng giảm hiệu năng lớn.

Từ hai vấn đề vừa được đề cập ở trên chúng ta có thể nghĩ tới một giải pháp đó là lưu trữ  tạm thờidữ liệu lên bộ nhớ RAM để tăng hiệu năng ứng dụng, việc lưu trữ tạm thời trên RAM thì người ta gọi là in-memory cache.

## Hạn chế của In-memory cache
Mặc dù cho tốc độ đọc ghi nhanh kinh ngạc thì bộ nhớ RAM thường có dung lượng hạn chế do đó chúng ta phải quan tâm và quản lý cái gì nên được cache và khi bộ nhớ gần đầy thì chúng ta phải xóa bớt dữ liệu đang lưu trữ trên RAM. Thêm một vấn đề với RAM là dữ liệu sẽ bị mất khi tắt máy hay mất điện nên chúng ta nên ưu tiên cho việc lưu tạm những dữ liệu đã được lưu trong ổ cứng nhưng việc truy suất lại từ ổ cứng chậm hoặc ưu tiên lưu trữ dữ liệu có thể tính toán lại được. Hạn chế việc sử dung in-memory cache như là một cơ sở dữ liệu để lưu trữ dữ liệu được tạo mới. Nếu lựa chọn giải pháp lưu dữ liệu được tạo mới tạm thời trên RAM thì nên tiến hành ghi vào ổ cứng ngay khi có thể. Nếu bạn đang lên kế hoạch lưu tạm trên RAM khoảng vài ba giây rồi mình mới lưu thực sự xuống ổ cứng thì bạn phải chấp nhận có thể mất dữ liệu người dùng, pha vỡ tính toàn vẹn dữ liệu của ứng dụng.

## Một số khái niệm quan trọng khi cache dữ liệu:
Lúc suy tính tới việc ứng dụng cache vào bất kì một ứng dụng nào chúng ta nên nắm rõ và ước tính được các thông số như cache hit, cache miss của ứng dụng và Cache Replacement Policy của từng cache provider để có thể tận dụng được tối đa sức mạnh của cache, giảm thiếu bộ nhớ, ..
### Cache hit là gì?
Cache hit là việc dữ liệu được yêu cầu đã được lưu trữ trong bộ nhớ. Tỉ lệ cache hit càng cao thì cho thấy rằng sự quản lý cache của developers là rất tốt nó đồng nghĩa với việc hệ thống cache đạt được tối ưu nhất.
### Cache miss là gì?
Ngược lại với cache hit thì chúng ta có cache miss, cache miss là trạng thái mà dữ liệu yêu cầu chưa được lưu trữ trong bộ nhớ đệm. Trang thái cache miss càng cao thì đồng nghĩa với việc tăng thêm gánh nặng cho hệ thống của chúng ta. Việc áp dụng cache phải nên được đánh giá lại.

![](https://images.viblo.asia/68f0761f-31bc-48f4-a04b-f6a95dd1a888.png)
## Cache Replacement Policy là gì?
Cache Replacement Policy dịch nôm na là các thuật toán để thay thế giá trị hoặc xóa các giá trị cũ để thêm giá trị mới vào. Trong bài viết này thì mình sẽ không giải thích cụ thể nhưng bạn có thể tham khảo link wikipedia nay: https://en.wikipedia.org/wiki/Cache_replacement_policies

Và đây là một số cách thức phổ biến:
* Bélády's algorithm
* First in first out (FIFO)
* Last in first out (LIFO) or First in last out (FILO)
* Least recently used (LRU)
* Time aware least recently used (TLRU)
* Most recently used (MRU)
* Pseudo-LRU (PLRU)
* Random replacement (RR)
* Segmented LRU (SLRU)
* Least-frequently used (LFU)
* Least frequent recently used (LFRU)
* LFU with dynamic aging (LFUDA)
* Low inter-reference recency set (LIRS)
* CLOCK-Pro
* Adaptive replacement cache (ARC)
* AdaptiveClimb (AC)
* Clock with adaptive replacement (CAR)
* Multi queue (MQ)
* Pannier: Container-based caching algorithm for compound objects

## Một số thư viện và cache provider phổ biến sử dụng trong Java và cách ngôn ngữ khác
* EhCache
* Caffeine Cache
* Memcached
* Redis
* Hazelcast
* Couchbase
* Infinispan
* ...