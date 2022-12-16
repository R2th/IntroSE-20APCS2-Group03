Các hệ thống lớn luôn luôn cần phải có một cơ chế _caching_ để tăng tốc độ xử lý cũng như làm giảm lưu lượng mạng vào database. Hiện tại có hai công cụ rất phổ biến là **Memcached** và **Redis**, trong bài viết này mình sẽ so sánh ưu nhược điểm của cả hai và trường hợp nào nên dùng công cụ nào.

## Điểm giống nhau
**Redis** và **Memcached** đều là các hệ thống lưu trữ dữ liệu trong bộ nhớ. **Memcached** là một hệ thống **lưu trữ bộ nhớ đệm phi tập trung** với tốc độ cao, còn **Redis** là một bộ nhớ theo dạng **key-value**. Giống như **Memcached**, **Redis** có thể **lưu trữ được hầu hết tất cả các loại dữ liệu** trong bộ nhớ và có thể **thực hiện các phép toán với nhiều kiểu dữ liệu** (ví dụ như *string*, *hash table*, *linked list*, ...). 

Cả hai công cụ này đều rất nhanh và hữu dụng khi được dùng làm bộ nhớ đệm, giúp tăng tốc ứng dụng web bằng cách *cache* các câu query, HTML hoặc bất cứ thứ gì có thể *cache* được.

## Khác biệt về bản chất
Theo định nghĩa trên [trang chủ của Redis](https://redis.io/):
> *Redis is an open source (BSD licensed), in-memory data structure store, used as a database, cache and message broker. It supports data structures such as strings, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes with radius queries and streams.*
> 

và định nghĩa của [Memcached](https://memcached.org/):
> *Free & open source, high-performance, distributed memory object caching system, generic in nature, but intended for use in speeding up dynamic web applications by alleviating database load.*
> 
> *Memcached is an in-memory key-value store for small chunks of arbitrary data (strings, objects) from results of database calls, API calls, or page rendering.*
> 

Qua hai định nghĩa trên ta thấy, **Redis** được sử dụng như là một **database** (*used as database*) trong khi đó **Memcached** là một **hệ thống lưu trữ bộ nhớ đệm** (*memory caching system*). Để hiểu rõ hơn sự khác biệt này ta sẽ so sánh trên các khía cạnh chính sau:
* **Server-end data operations** (các phép toán cho dữ liệu ở phía server)
* **Memory usage efficiency** (Mức độ hiệu quả trong cách sử dụng bộ nhớ)
* **Performance comparison** (So sánh hiệu năng)
* **Read/write speed** (Tốc độ đọc/ghi)
* **Disk I/O dumping** (Backup dữ liệu)

### Server-end data operations
**Redis** hỗ trợ các phép toán cho dữ liệu ở phía server, biết nhiều kiểu dữ liệu và nhiều phép toán hơn **Memcached**. Vì vậy nếu bạn muốn hệ thống của mình có thể cache được nhưng cấu trúc dữ liệu phức tạp thì **Redis** sẽ là một lựa chọn tốt hơn.

### Memory usage efficiency
**Memcached** sử dụng hiệu quả hơn với kiểu dữ liệu dạng **key-value** đơn giản. Tuy nhiên, nếu sử dụng **Redis** với các cấu trúc dạng **hash** thì sẽ hiệu quả hơn **Memcached** do nó được thiết kế để lưu trữ những kiểu dữ liệu phức tạp như vậy.

### Performance comparison
**Redis** chỉ sử dụng **duy nhất một core** trong khi **Memcached** được tối ưu để **sử dụng nhiều core**. Vì vậy **Redis** sẽ có hiệu năng tốt hơn **Memcached** khi so sánh lượng dữ liệu trên một core. Tuy nhiên, **Memcached** lại vượt trội hơn **Redis** nếu so sánh lượng dữ liệu tổng thể. Mặc dù **Redis** đã có cơ chế để tối ưu cho dữ liệu lớn nhưng vẫn kém hơn so với **Memcached**.
### Read/write speed
Cả hai đều rất nhanh. Mặc dù có rất nhiều yếu tố ảnh hưởng như khối lượng dữ liệu, phiên bản nhưng thông thường thì **Redis** nhanh gần bằng **Memcached**.
### Disk I/O dumping
**Redis** có cơ chế mặc định backup dữ liệu vào disk trong khi **Memcached** không có cơ chế này nếu không dùng tool hỗ trợ.
## Tổng kết
**Memcached** là một cached server đơn giản, cho phép bạn lưu trữ cặp key-value với dữ liệu nhỏ hơn 1MB. Nó hoạt động cực kì tốt nhưng đó là tất cả những gì mà nó có thể làm được. Khi bạn restart lại thì dữ liệu sẽ bị mất, vì vậy **Memcached** rất phù hợp với những dự án chỉ cần *cache* những dữ liệu đơn giản, nhẹ, và không quan trọng. Ngoài ra, vẫn có các tool, product, service của bên thứ ba để thêm các tính năng cần thiết.

**Redis** cũng có thể làm như **Memcached**, thậm chí còn có thể tốt hơn. **Redis** cũng có thể được sử dụng như một bộ nhớ **cache** nhưng dữ liệu mà nó có thể lưu trữ lên tới 512MB. Không giống như **Memcached**, **Redis** vẫn có thể lưu lại dữ liệu của nó sau khi restart, thực tế đây là cài đặt mặc định. Ngoài ra, **Redis** còn có cơ chế **cluster support** giúp cho bạn có thể scale với nhiều instance. Số lượng tool, service, ecosystem của **Redis** cũng lớn hơn rất nhiều, các hệ thống lớn sử dụng **Redis** cũng nhiều hơn so với **Memcached**.

## Nguồn tham khảo
* Stackoverflow: [Memcached vs. Redis?](https://stackoverflow.com/questions/10558465/memcached-vs-redis)
* Medium: [Redis vs Memcached: In- Memory Data Storage Systems](https://medium.com/@Alibaba_Cloud/redis-vs-memcached-in-memory-data-storage-systems-3395279b0941)