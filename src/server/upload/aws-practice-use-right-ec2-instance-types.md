## Giới thiệu
Chào các bạn tới với series thực hành về AWS, tuy là nói series thực hành nhưng bài này chúng ta chỉ tìm hiểu lý thuyết thôi `:))))`. Nếu các bạn làm việc với AWS thì chắc chắn rất quen thuộc với AWS Elastic Computing (EC2), trước khi tạo EC2 ta phải chọn instance types cho nó, thông thường khi mới làm việc với EC2 thì ta hay chọn instance types thuộc dòng General Purpose.

Tuy nhiên EC2 có rất nhiều loại instance types khác nhau và mỗi thằng sẽ phù hợp với một mục đích nào đó. Bài hôm nay chúng ta sẽ tìm hiểu về các họ của instance types, sau bài này các bạn sẽ có cái nhìn overview hơn về việc chọn instance types cho EC2.

Ở thời điểm mình viết bài này, Amazon cung cấp các họ instance types như sau:
+ General Purpose: A1, T2, T3, T4g ...
+ Compute Optimized: C5, C6 ...
+ Memory Optimized: R1, X1 ...
+ Accelerated Computing: P3, G3, F1 ...
+ Storage Optimized: H1, D2, I3 ...

![image.png](https://images.viblo.asia/0255485f-72fc-4683-8fe5-64d8404b05c5.png)

## General Purpose
Đây là dòng instance types phổ biến và được sử dụng nhiều nhất, nó bao gồm các họ là A1, T2, T3, T4g.

![image.png](https://images.viblo.asia/8667d512-336e-44fa-bc6e-b7b01699873d.png)

Khi ta tạo EC2 từ instance types họ A1, T2, T3, T3a, T4g thì resources trong EC2 đó của ta sẽ được phân bổ đều cho cả compute, memory, and networking. Và General Purpose instances sẽ cung cấp cho ta sự cân bằng giữa chi phí và chức năng. Nếu bạn mới làm việc với EC2, T3 là một lựa chọn rất phù hợp.

Sự khác biệt của các họ trong dòng này là khả năng **burstable performance**. Burstable performance cho phép EC2 có thể sử lý workloads vượt quá CPU định mức của EC2. Ví dụ như khi so sánh T3a và T3 thì khả năng burstable performance của T3 sẽ tốt hơn T3a.

Còn họ A1 vì sử dụng ARM chip nên rất tốt cho các workload mà sử dụng ngôn ngữ như Java, Ruby, và Python.

=> Sử dụng General Purpose khi bạn là người mới xài EC2 hoặc trong quá trình develop ta chưa chắc chắn ứng dụng của ta sẽ ra sao, hoặc sử dụng nó cho các process không quá đặc biệt như các web servers thông thường không cần sử lý quá nhiều request.

## Compute Optimized
Dòng instance types này thích hợp cho các ứng dụng compute intensive, mà cần sử dụng tối đa hiệu xuất của CPU.

![image.png](https://images.viblo.asia/99bb0e14-5da6-4554-adb5-194afe6453a2.png)

Dòng này gồm các instance types họ C4, C5, C6g. Khi ứng dụng của ta được deploy lên trên EC2 mà chạy với các họ này thì ứng dụng của ta có thể sử dụng được raw compute power (sử dụng CPU với tốc độ cao).

=> Sử dụng Compute Optimized cho các ứng dụng mà yêu cầu sử dụng CPU nhiều, thích hợp với các ứng dụng:
+  Video encoding.
+  High-performance computing.
+  Multiplayer gaming servers.

## Memory Optimized
Từ tên thì các bạn chắc cũng đoán được là dòng này phù hợp cho các ứng dụng yêu cầu memory nhiều.

![image.png](https://images.viblo.asia/199a2c41-cd43-46b1-b6f5-3fa3f32eadef.png)

Điểm hình của dòng này là instance types họ X1, R4, R5. Các EC2 chạy với dòng Memory Optimized sẽ có performance rất cao bởi việc cho phép tải một lượng lớn datasets vào bên trong memory để xử lý.

R5 sử dụng Intel chip và R5a sử dụng AMD chip, hai họ này thích hợp cho các ứng dụng memory intensive cần sử dụng memory cực nhiều. Ví dụ như là redis.

Còn họ X1 thì cung cấp số lượng memory cực lớn, lên tới hàng 1000 GiB, trong ghi họ R thì đa số chỉ dưới 1000 GiB.

=> Sử dụng Memory Optimized cho các ứng dụng mà cần memory nhiều, ví dụ như:
+ Real-time data analytics.
+ In-memory databases.
+ High-performance databases.
+ In-memory caches.
+ ERP applications.
+ Hadoop or Spark workloads.

## Accelerated Computing
Dòng instance types này phù hợp cho các ứng dụng về graphics processing.

![image.png](https://images.viblo.asia/48ae89f5-1881-407a-a250-4456344a56fa.png)

Dòng này bao gồm các instance types họ P3, G3, F1. Khi ta tạo EC2 với dòng Accelerated Computing thì AWS sẽ cung cấp cho ta các phần cứng liên quan khác cho việc sử lý graphics như là GPUs, FPGAs.

P3 instances can có performance rất cao vì nó được trang bị lên tới 8 NVIDIA V100 Tensor Core GPUs và 100 Gbps of networking throughput.

G4 thì cho phép ta triển khai các ứng dụng mà yêu cầu graphics intensive, phù hợp với các ứng dụng 3D modeling.

Họ F1 thì cung cấp cho ta FPGAs (FieldProgrammable Gate Array) hardware, thích hợp cho việc phát triển các ứng dụng IC (Integrated Circuit).

=> Sử dụng Accelerated Computing cho các ứng dụng như sau:
+ Artificial intelligence/machine learning.
+ High-performance computing applications.
+ Big data analytics.
+ Genomics research.
+ Data compression.
+ Image processing.
+ Network security.
+ Search.

## Storage Optimized
Từ tên thì ta có thể đoán được là dòng này phù hợp cho các ứng dụng mà yêu cầu về việc đọc và ghi dữ liệu lớn.

![image.png](https://images.viblo.asia/d4b3c8d6-8eab-406f-b83e-4bf4373505d5.png)

Dòng này bao gồm các instance types họ H1, D2, I3. Với H1 và D2 có thể liên tục đọc và writes với datasets lên tới petabyte, hai họ này sử dụng storage loại HDD.

Với họ I3 thì nó sẽ sử dụng SSD, nên độ trễ của nó sẽ nhỏ hơn H1 và D2.

=> Sử dụng Storage Optimized cho các ứng dụng như sau:
+ NoSQL databases such as MongoDB, Cassandra.
+ In-memory databases such as MemSQL and Aerospike.
+ Data warehouses.
+ Scale-out transactional databases.
+ Elasticsearch.
+ BI and analytics workloads.

Đây là các dòng instance types hiện tại mà EC2 đang cung cấp, tương lai có lẽ sẽ còn rất nhiều instance types nữa được release. Và tất nhiên thì mong là giá của các instance types này sẽ giảm mà performance sẽ tăng `:))))`.

## Kết luận
Vậy là ta đã tìm hiểu xong về các dòng instance types và mục đích của nó. AWS cung cấp cho ta rất nhiều instance types mà sẽ phù hợp cho rất nhiều ứng dụng mà ta dự định sẽ phát triển. Sử dụng đúng instance types cho EC2 sẽ giúp ta đạt được một kết quả rất tốt cho ứng dụng. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

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

Team đang xây dựng một hệ thống rất lớn với rất nhiều vấn để cần giải quyết, và sẽ có rất nhiều bài toàn thú vị cho các bạn. Nếu các bạn có hứng thú trong việc xây dựng một hệ thống lớn, linh hoạt, dễ dàng mở rộng, và performance cao với kiến trúc microservices thì hãy tham gia với tụi mình.

Nếu các bạn quan tâm hãy gửi CV ở trong trang tuyển dụng của Hoàng Phúc International hoặc qua email của mình nha `hmquan08011996@gmail.com`. Cảm ơn các bạn đã đọc.