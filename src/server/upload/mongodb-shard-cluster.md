**I. KHÁI NIỆM MONGDB SHARD CLUSTER**
![image2022-1-28_9-39-0.png](https://images.viblo.asia/ddf888d0-bf81-4f1d-a431-fd9426efa7a6.png)

**II. NHỮNG KEYWORD CẦN BIẾT**
- ***Mongos***: Đây thực ra là một query router, cung cấp một giao diện tương tác giữa ứng dụng và các sharded cluster.
- ***Mongod***: Nó xử lý các yêu cầu dữ liệu, quản lý quyền truy cập dữ liệu và thực hiện các hoạt động quản lý nền
- ***Shard***: Mỗi shard chứa đựng một tập nhỏ các data đã sharded, từ phiên bản 3.6 trở lên, shards phải được cấu hình chạy replicaset nếu muốn trở thành một phần của cluster.
- ***Config server***: Config server chứa đựng metadata và cấu hình cho cluster, từ phiên bản 3.4 trở lên config server phải deploy dưới dạng replicaset.
- ***Replicaset** (Primary, secondary)*: Một replica set trong MongoDB là một nhóm các tiến trình của mongodb duy trì cùng một bộ dữ liệu. Các replica set cung cấp tính dự phòng và tính sẵn sàng cao và là cơ sở để triển khai nhập xuất dữ liệu khi cần thiết.


**III. REPLICASET**

![rep.png](https://images.viblo.asia/ab3d2912-b20f-4692-9ecc-5cc6630f491a.png)

**IV. CƠ CHẾ LƯU VÀ TÌM KIẾM CỦA SHARD CLUSTER**
![co.png](https://images.viblo.asia/c5b14a22-1331-464c-a579-13f764a4a2ca.png)


- ***Shard key***: MongoDB sử dụng shard key để phân phối các collections's documents trên các shard. Shard key bao gồm một hoặc nhiều trường tồn tại trong mọi document trong collection cần truy vấn. Bạn phải chọn shard key khi sharding một collection. Việc lựa chọn shard key không thể thay đổi sau khi sharding. Một sharded collection có thể chỉ có một shard key duy nhấ
- ***Ranged sharding***: Ranged Sharding liên quan đến việc chia dữ liệu dựa theo giá trị của shard key. Mỗi chuck sau đó sẽ đc gán với một phạm vi
- ***Hashed sharding***: Chúng ta sử dụng một hàm hash đối với shard key .Mỗi phần sau đó được gán một phạm vi dựa trên các giá trị hash của shard key . Chú ý mongoDB hỗ trợ việc hash này rồi nên mình ko cần phải làm gì cả.
- ***Chuck***: MongoDB chia dữ liệu thành các khối gọi là Chuck. Mỗi chuck đc chia liên quan đến shard key Cách chia này cũng chỉ phù hợp vs shard có sự thay đổi là đồng đều.


**V. RANGED SHARDING**
![shard1.png](https://images.viblo.asia/b41936be-8ef2-451e-bf41-61a49a434f99.png)


**VI. HASHED SHARDING**
![shard2.png](https://images.viblo.asia/56a7253a-15a6-4092-8fe9-97c9e9f17533.png)

**VII. XÂY DỰNG SHARD CLUSTER**
- Setup shards
- Setup config server
- Setup query router

**VIII. SOURCE DEMO**

***Github config  mongodb shard cluster***: https://github.com/congdat850/sharding-by-docker-compose