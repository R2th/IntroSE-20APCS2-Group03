Gần đây mình có tính toán Disk cho ES, dưới đây là 1 số kiến thức mình tìm được
![image.png](https://images.viblo.asia/8a42321f-cc13-4e9a-90e9-498192cdd7b1.png)

# Giới hạn Disk của Elasticsearch là bao nhiêu?
Nhiều người lầm tưởng giới hạn Disk của ES chính là dung lượng ổ cứng.

Nhưng thực tế không phải như vậy. ES chạy trên JVM, và được giới hạn dung lượng dựa vào tham số
```
cluster.routing.allocation.disk.watermark.low parameter
```
https://www.elastic.co/guide/en/elasticsearch/reference/6.8/disk-allocator.html

Mặc định, tham số này 85%. Do đó, khi 1 node đạt giới hạn này thì các shard sẽ không thể được cấp phát thêm. Do đó, việc đánh index lên ES sẽ không thể thực hiện được 

Vậy nên đừng thắc mắc khi 1 ngày ổ cứng vẫn free vài chục GB nhưng ES của bạn lại lăn ra chết 

Vậy để tính build 1 server lưu 100 GB index ES, chúng ta cần 1 server có tối thiểu Disk là 118GB 

```
ES Disk = Server Disk * 0.85
```

# Triển khai ES với Cluster nhiều node
Công thức bê trên dùng để tính Disk cho 1 node. Vậy với trường hợp triển khai ES trên 1 cụm (Cluster) thì sao?

GIả sử chúng ta có 5 Node, thiết lập 5 Shard, 1 Replica.
Data được lưu trữ như sau
![image.png](https://images.viblo.asia/37c7e5d6-e3ea-4512-a9d3-61e6963a69fe.png)

Điều này nghĩa là:
-  1 index được chia thành 5 phần chia đều trên 5 Node
-  Mỗi phần sẽ có 1 bản sao

Giả sử:
- Mỗi Node có dung lượng ổ cứng là 100GB
- Mỗi Node có thể dùng 85GB để lưu trữ data ES
- Mỗi Node đang dùng 70GB để lưu data ES

Vậy thì khi 1 node của chúng ta gặp vấn đề:
- Giả sử Node 1 chết, Shard 0 và 2 sẽ biến mất 
- Search vẫn đủ dữ liệu do có replica
- ES thực hiện rebuild lại dữ liệu để đảm bảo luôn có 1 Replical, tránh mất dữ liệu 

Việc ES rebuild là rất tốt, tuy nhiên, lúc này Cluster chỉ còn 4 Server. Mỗi server sẽ phải gánh thêm 70/4 = 17/5 GB dữ liệu

Lúc này, mỗi Node sẽ phải lưu trữ 87 GB data ES, vượt qua ngưỡng 85GB. Điều này khiến 4 Node còn lại full và toàn bộ ES sẽ không thể thêm index

Do đó chúng ta cần thêm không gian trống đủ để môi node có thể tái phân bổ lại primary và replica từ node fail. Đây là công thức tính dung lượng tối đa để một node có thể an toàn:

```
(disk per node * .85) * (node count - 1 / node count)
```

Nếu chúng ta có nhiều hơn 1 Replica, thì công thức sẽ là 

```
(disk per node * .85) * (node count - replica count / node count)
```

Đây là công thức đảm bảo ES vẫn sống sót khi có 1 Node chết. 

Dựa vào những kiến thức ở trên, ta có thể tính toán Disk cho hợp lí cho server ES rồi 

# Tham khảo
http://svops.com/blog/elasticsearch-disk-space-calculations/