Khi thiết kế database đối với một hệ thống lớn , đòi hỏi thông lượng cao luôn là bài toán khó . Nào là tùy thuộc vào loại dữ liệu như nào, kiến trúc app ra sao hay nên chọn loại database nào cho phù hợp ,... rất nhiều yếu tố chúng ta cần phải cân nhắc . Trong bài viết này mình muốn chia sẻ về **Sharding** một phương pháp để phân phối dữ liệu trên nhiều máy mà MongoDB sử dụng để hỗ trợ triển khai với những app dữ liệu rất lớn và đòi hỏi thông lượng cao.

![](https://images.viblo.asia/704e567c-6960-4bba-875d-c068a05a50e9.jpg)

## Mở đầu
Các hệ thống cơ sở dữ liệu với các tập dữ liệu lớn hoặc các ứng dụng đòi hỏi thông lượng cao có thể thách thức khả năng của một máy chủ. Ví dụ ứng dụng chat có một lượng lớn người dùng , hơn nữa người dùng luôn đòi hỏi việc gửi và nhận tin nhắn của họ phải realtime . Lúc đó nhu cầu truy vấn cao đòi hỏi một lượng lớn RAM và CPU mà chắc chắn 1 máy chủ sẽ khó lòng đáp ứng được . Sẽ có 2 giải pháp đối với các ứng dụng kiểu này đó là : mở rộng theo chiều ngang ( **horizontal scaling** ) và mở rộng theo chiều dọc ( **vertical scaling** )

* **Vertical scaling :** scale theo chiều dọc liên quan đến việc tăng dung lượng của một máy chủ, chẳng hạn như sử dụng CPU mạnh hơn hay thêm RAM hoặc tăng dung lượng lưu trữ.
* **Horizontal scaling :** scale theo chiều ngang liên quan đến việc chia nhỏ dữ liệu của hệ thống và tải chúng lên nhiều server , thêm server để tăng công suất . Mặc dù tốc độ hoặc công suất chung của mỗi máy có thể vẫn thế nhưng mỗi máy xử lý một tập hợp con của khối lượng dữ liệu chung vì thế nó có khả năng mang lại hiệu quả tốt hơn so với một server công suất cao .

MongoDB hỗ trợ scale theo chiều ngang thông qua **sharding**. Và đây cũng là những gì mình sẽ giới thiệu thông qua bài viết này .

## Sharded Cluster
MongoDB sharded cluster sẽ gồm các thành phần :
* **shard** : mỗi một shard chứa một tập con của dữ liệu tổng. Ngoài ra mỗi shard có thể được triển khai như một bản sao của shard khác .
* **mongos** : đây là thành phần hoạt động như một query router , cung cấp một interface giữa client và sharded cluster
* **config servers** : đây là thành phần lưu trữ metadata và cấu hình cho mỗi cluster .
![](https://images.viblo.asia/d49f7ed4-fdaa-47b8-917d-fe1e64eb0ffc.png)

MongoDB phân chia dữ liệu ở mức **collection** và phân phối chúng trong các shard ở trên các cluster
## Shard Keys
MongoDB sử dụng **shard key** để phân phối các **collections's documents** trên các shard. Shard key bao gồm một hoặc nhiều trường tồn tại trong mọi document trong collection cần truy vấn.

Bạn phải chọn shard key khi sharding một collection. Việc lựa chọn shard key không thể thay đổi sau khi sharding. Một sharded collection có thể chỉ có một shard key duy nhất . Để tìm hiểu thêm về [cấu hình shard key](https://docs.mongodb.com/manual/core/sharding-shard-key/#sharding-shard-key-creation) 
![](https://images.viblo.asia/8b67fba6-e37f-46dd-b21d-060462ddbc08.png)

hình minh họa vs shard key là x 

Việc lựa chọn shard key ảnh hưởng đến hiệu suất, hiệu quả cũng như khả năng mở rộng của database. Một cluster với phần cứng và infrastructure tốt nhất vẫn có thể bị ngẽn bởi việc lựa chọn shard key không hiệu quả. 

## Ưu điểm của việc sharding

### Reads / Writes
Đối với truy vấn kèm theo shard key mongos có thể target đến một shard cụ thể .Việc target này chắc chắn sẽ hiệu quả hơn việc truy vấn tất cả rồi .

### Khả năng lưu trữ 
Việc sử dụng shards trên cluster cho phép mỗi shard chứa một tập hợp con của dữ liệu tổng . Khi dữ liệu lớn lên thì việc thêm các shards sẽ tăng khả năng lưu trữ của cluster
### Tính sẵn sàng cao
Việc đọc ghi vẫn sẽ ổn cho dù có vài shard bị down vì mỗi máy cũng sao lưu các shard của các máy khác và chúng ta vẫn có thể đọc ghi đc .
## Các chú ý trước khi sharding 
* Vì nó yêu cầu nhiều máy nên đòi hỏi phải thiết kế cũng như bảo trì cẩn thận .
* Lựa chọn shard key cẩn thận vì nó ảnh hưởng đến hiệu xuất cũng như sau khi sharded rồi thì ko thay đổi đc shard key
* khi truy vấn hãy truy vấn cùng shard key nếu ko mongos sẽ truy vấn tất cả cá shard và như thế sẽ mất thời gian

## Sharded và Non-Sharded Collections
Một database có thể bao gồ cả sharded và unsharded collections .Sharded collection thì chia và phân phối trên các cluster. Unsharded collecton chỉ được lưu ở một shard chính ( mỗi db đều có 1 shard chính )
![](https://images.viblo.asia/3b176a64-b4be-4ef4-9a8c-d581022fa817.png)

Từ app connect tới db chúng ta phải thông qua mongos để tương tác vs các sharded và unsharded colleciton .
![](https://images.viblo.asia/6e6c1ea8-6061-4438-8751-1cb799d8d18c.png)
## Chiến lược Sharding
MongoDB hỗ trợ 2 cách đó là **Hashed Sharding** và **Ranged Sharding** :

### Hashed Sharding
Chúng ta sử dụng một hàm hash đối với shard key .Mỗi phần sau đó được gán một phạm vi dựa trên các giá trị hash của shard key .

chú ý mongoDB hỗ trợ việc hash này rồi nên mình ko cần phải làm gì cả 
![](https://images.viblo.asia/c892a77c-2f9e-4c11-b3fe-e99248dfc52a.png)
* **Chuck** : MongoDB chia dữ liệu thành các khối gọi là **Chuck**. Mỗi chuck đc chia liên quan đến shard key
Cách chia này cũng chỉ phù hợp vs shard có sự thay đổi là đồng đều .

### Ranged Sharding
Ranged Sharding liên quan đến việc chia dữ liệu dựa theo giá trị của shard key. Mỗi chuck sau đó sẽ đc gán với một phạm vi
![](https://images.viblo.asia/f9a10ed7-b558-4756-9e9c-a11ea15f9da8.png)
## Demo
- mình sẽ chạy demo một ứng dụng vs mongo cluster ở một bài viết sau
- Các đặc điểm khi thiết kế db vs mongo cluster các bạn có thể đọc tại đây :  https://viblo.asia/p/cach-thiet-ke-co-so-du-lieu-chat-trong-mongodb-Ljy5VQgolra
## Reference
* https://stackoverflow.com/questions/36287097/can-i-connect-mongoose-to-a-sharded-mongodb-instance