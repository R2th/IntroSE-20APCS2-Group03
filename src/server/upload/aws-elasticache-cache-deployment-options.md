## Giới thiệu
Chào các bạn, ở bài trước chúng ta đã tìm hiểu cơ bản về Elasticache. Ở bài này chúng ta sẽ tìm hiểu về các cách triển khai của Elasticache trên môi trường AWS.

Trước khi triển khai Elasticache, ta sẽ xem xét các yếu tố sau:
+ Engine: chọn Memcached hay Redis.
+ Backup/Restore: ta có cần backup và restore dữ liệu cache không?
+ Replication: nếu một node chết thì data của ta có còn hay không?
+ Sharding: dữ liệu có thể lưu trữ được ở nhiều node hay không?

<br />

Từ các yếu tố trên, ta sẽ có các cách sau để triển khai  Elasticache.
1. Memcached: cluster.
2. Redis: single node.
3. Redis: cluster mode disabled.
4. Redis: cluster mode enabled.

Memcached sẽ có 1 cách để triển khai và Redis sẽ có 3 cách để triển khai.

## Memcached: cluster
Ở dạng deploy này, ta sẽ có một Memcached Cluster bao gồm 1-20 node.

![image.png](https://images.viblo.asia/19a53e32-4e4d-4929-b3a0-c864e13241b7.png)

Dữ liệu sẽ được lưu trữ ở từng node riêng biệt, các node sẽ không có chia sẻ dữ liệu lẫn nhau. Khi ta sử dụng Memcached Cluster, ta sẽ tự quyết định sẽ lưu trữ dữ liệu ở node nào. Từng node sẽ có một endpoint url của nó.

Nếu một node chết, thì sẽ có một node mới được tạo ra để thay thế nó, tuy nhiên dữ liệu của ta sẽ bị mất. Và lưu ý dữ liệu ở trong Memcached của ta sẽ không thể backup được.

Ta sử dụng Memcached Cluster khi ta cần một giải pháp cache đơn giản, dữ liệu có thể bị mất mà không gây ảnh hưởng nhiều tới ứng dụng chính. Và ta chấp nhận dữ liệu có thể bị mất.

## Redis: Single-node cluster
Ở dạng deploy này ta sẽ chỉ sử dụng 1 node redis, sharding (mình sẽ giải thích về sharding sau) và high availability sẽ không có trong mode redis single-node.

![image.png](https://images.viblo.asia/1594c351-cb8e-4599-962a-9a6044e58ae7.png)

Tuy chỉ có một node, nhưng redis có hỗ trợ backup và restore cho ta, nếu node ta bị chết thì ta có thể tạo lại node mới với dữ liệu đã được backup trước đó.

Single node chỉ có 1 node nên khi node chết, cho dù nó có tự động tạo lại thì vẫn có thời gian downtime, điều này sẽ dẫn đến một single point of failure (SPOF) cho ứng dụng của ta.

Chỉ nên dùng mode này cho môi trường dev, không nên dùng cho production.

## Redis cluster
Tiếp theo ta sẽ nói về hai cách triển khai quan trọng nhất của Elasticache dạng redis, là Redis: cluster mode disabled và Redis: cluster mode enabled.

Ta sẽ sử dụng các thuật ngữ sau khi nói về Redis Cluster:
+ Cluster.
+ Shard (node group).
+ Node.

Thì giải thích đơn giản shard chỉ là một node group gồm nhiều redis node. Một redis cluster sẽ bao gồm nhiều shard, một shard sẽ chứa nhiều node, một node sẽ chứa một redis process.

## Redis: cluster mode disabled
Ở dạng deploy này, ta sẽ có một Redis Cluster chỉ có 1 Shard với số lượng node của Shard là 1 tới 6 node.

![image.png](https://images.viblo.asia/c7a097cc-75f6-415c-8201-e90a9cab6454.png)

Trong 6 node của shard thì sẽ có 1 primary node và 1 tới 5 node còn lại sẽ là replica nodes. Redis cluster mode disabled có hỗ trợ backup và replication.

Khi ta làm việc với Redis cluster mode disabled ta chỉ cần lưu dữ liệu vào primary node và nó sẽ tự động sync dữ liệu qua các replica node cho ta, thay vì ta phải tự động ghi cache vào node nào khi sử dụng Memcached.

Và ta có thể đọc cache từ 1 trong 5 replica node để tăng tốc độ truy cập thay vì cứ phải đọc cache từ primary node.

Sử dụng cách triển khai này khi ta cần một giải pháp cache cho một ứng dụng vừa phải, không có quá nhiều write request vào master node.

## Redis: cluster mode enabled
Đây là cách triển khai cuối cùng của elasticache, ở dạng deploy này Redis Cluster của ta sẽ có nhiều shards và mỗi shard cũng sẽ có 1 tới 6 node. Và số lượng Shard ta có thể deploy là 500 => Maximun node của dạng Redis cluster mode enabled là 3000 node => tha hồ cache.

![image.png](https://images.viblo.asia/fd10bcb1-f25d-4fe2-b478-5176c81b3a71.png)

Redis cluster mode enabled cũng có hỗ trợ backup, replication và cả sharding. Sharding là cách mà redis chia sẻ dữ liệu giữa các primary node với nhau, ta có thể ghi dữ liệu vào bất kì primary node nào, và redis sẽ tự động quyết định cho ta dữ liệu đó sẽ được lưu trữ ở đâu.

Với redis cluster mode enabled, tốc độ failover rất nhanh vì ta có rất nhiều primary node. Sử dụng dạng này khi ta cần một giải pháp cache cực kì lớn.

## Secutiry
ElastiCache được bảo vệ với 3 tầng như sau:
+ Network access
+ Cache Engine Auth
+ Encryption

### Controlling network access
Tầng đầu tiên là tầng network, **điểm quan trọng ta cần nhớ là Elasticache chỉ có thể truy cập ở bên trong local network của một VPC**. Bên cạnh đó thì Secutiry Group cũng được dùng để quản lý network access tới Elasticache. Để có thể truy cập được tới Elasticache bên trong một VPC thì ta cần Secutiry Group có cấu hình cho phép truy cập port 6379 (Redis) hoặc 11211 (memcached).

![image.png](https://images.viblo.asia/d4915171-187e-4ff8-9f2c-f6c1812a555e.png)

### Cache Engine Auth
Tầng tiếp theo là tầng chứng thực ở công nghệ ta sử dụng, chỉ có Redis mới có Auth, còn Memcached thì không.

### Encryption
Đây là tầng mã hóa dữ liệu của ElastiCache, có thể là **transit** (được mã hóa lúc data được chuyển đi) hoặc **at rest** (dữ liệu lưu vào bên trong ElastiCache sẽ được mã hóa).

## Tweaking cache performance
Phần cuối cùng ta sẽ nói về vấn đề làm sao để cải thiện hiệu suất của một ứng dụng cache, nếu các bạn chỉ nghĩ đơn giản là để cải thiện hiệu suất của cache thì ta chỉ cần tăng RAM lên là xong, nếu công ty ta giàu thì việc này đúng, còn lại thì không nha 😁.

Mà để cải thiện hiệu suất của cache, ta sẽ có cả một sơ đồ các step mà ta cần xem xét để cải thiện hiệu suất và tốc độ của ứng dụng cache. Sơ đồ như sau.

![image.png](https://images.viblo.asia/85150aae-5823-44e6-8bfb-be0869628d9c.png)

Ta sẽ đi theo từng bước ở sơ đồ trên.
1. Bước đầu tiên ta sẽ kiểm tra performance của ứng dụng của ta có vấn đề gì không, nếu không thì ta không làm gì hết, nếu có ta sẽ xem xét bước tiếp theo.
2. Ở bước thứ hai, ta kiểm tra coi ta đã implement nén dữ liệu trước khi lưu vào cache hay chưa, nếu chưa thì ta implement, nếu có mà performance vẫn kém thì ta sẽ đi qua bước tiếp theo.
3. Ở bước thứ ba, ta sẽ xem xét coi node của ta có instance type nào lớn hơn không, nếu có thì ta tăng nó lên (ở đây khi tăng instance type lên ta cũng cần xem xét tới yếu tố giá cả), nếu không thì ta sẽ đi qua bước tiếp.
4. Ở bước thứ tư, ta sẽ xem coi dữ liệu của ta có cần lưu trong một primary node hay không, nếu không thì ta sẽ thêm shard, nếu dữ liệu chỉ cần lưu trong một primary ta sẽ đi qua bước tiếp theo.
5. Ở bước thứ năm, ta sẽ xem xét là ta cần ghi nhiều hơn hay đọc nhiều hơn, nếu ghi nhiều hơn thì ta phải quay lại việc tạo thêm shard, còn nếu ta đọc nhiều hơn ghi thì ta sẽ tăng số lượng read replica lên.

Đó là các bước ta cần xem xét để cải thiện performance cache của một ứng dụng, đây là cái mình thấy hay nhất trong bài và hữu dụng nhất.

## Kết luận
Vậy là ta đã tìm hiểu xong về các cách triển khai Elasticache ở trên AWS, lựa chọn cách triển khai phù hợp sẽ giúp ta phát triển ứng dụng một cách rất mượt mà. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Ở bài tiếp theo mình sẽ hướng dẫn các bạn **dùng Terraform để tạo Elasticache**.

## Mục tìm kiếm đồng đội
Hiện tại thì bên công ty mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và là trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
+ Senior Backend Engineer (Java). Link JD: https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022
+ Senior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021
+ Junior Backend Engineer (Java). https://tuyendung.hoang-phuc.com/job/junior-backend-engineer-1067
+ Junior Front-end Engineer (VueJS). https://tuyendung.hoang-phuc.com/careers/job/1068
+ App (Flutter). https://tuyendung.hoang-phuc.com/job/mobile-app-engineer-flutter-1239
+ Senior Data Engineer. https://tuyendung.hoang-phuc.com/job/seniorjunior-data-engineer-1221

Với mục tiêu trong vòng 5 năm tới về mảng công nghệ là:
+ Sẽ có trang web nằm trong top 10 trang web nhanh nhất VN với 20 triệu lượt truy cập mỗi tháng.
+ 5 triệu loyal customers và có hơn 10 triệu transactions mỗi năm.

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn đề cần giải quyết, và sẽ có rất nhiều bài toán thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.