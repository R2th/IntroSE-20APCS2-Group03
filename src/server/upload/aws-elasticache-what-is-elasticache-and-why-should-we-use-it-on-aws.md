## Giới thiệu
Chào các bạn, ở bài hôm này chúng ta sẽ tìm về Elasticache, chúng ta sẽ tìm hiểu xem nó là gì và tại sao chúng ta nên sử dụng nó khi ta đã làm việc trên hệ thống AWS.

![image.png](https://images.viblo.asia/7af5b95e-9e40-4e39-9dea-e093118971ea.png)
*<div align="center">Image from [redis](https://redis.com/redis-enterprise-cloud/compare-us-with-aws-elasticache/)</div>*

Từ cái tên chắc các bạn cũng có thể biết được là Elasticache được sử dụng cho cache, thì trước khi bắt đầu tìm hiểu về Elasticache, chúng ta sẽ xem qua tại sao chúng ta lại cần cache đã.

## Why we need cache?
### Problem
Ví dụ ta có một trường hợp như sau, ta đang có một trang leaderboard hiển thị điểm và rank của người dùng, và ta thường xuyên phải truy vấn vào database để lấy dữ liệu liên quan tới rank để hiển thị cho user.

![image.png](https://images.viblo.asia/34e6b14a-a1e2-447d-ae7e-e8d6ef8378cc.png)

Tuy nhiên thông tin trang leaderboard này rất ít khi thay đổi mà số lượng user truy cập trang này rất lớn dẫn tới database của ta bị quá tải.

![image.png](https://images.viblo.asia/4c2a145a-6448-4b32-aaa3-87801d338ff7.png)

### Resolve
Thì để giải quyết vấn đề trên ta có thể sử dụng cache. Nó sẽ là một layer trung gian giữa user và database, thay vì phải truy vấn trực tiếp vào database để lấy dữ liệu, thì ta sẽ truy cập vào cache để lấy dữ liệu ra.

Cách implement của cache thường được sử dụng nhất là ta request dữ liệu ở trong cache, nếu chưa có dữ liệu ta cần, thì ta sẽ truy vấn xuống dưới database để lấy dữ liệu, sau đó lưu dữ liệu vào trong cache, lần tiếp theo khi ta request thì dữ liệu của ta đã có trong cache.

![image.png](https://images.viblo.asia/64931a0a-0e18-47a9-8595-14898dd7a17f.png)

### Popular cache database
Hai công nghệ cache phổ biến nhất hiện tại có lẽ là Memcached and Redis.

![image.png](https://images.viblo.asia/428963e1-00e3-45a0-a36a-997f66462715.png)

So sánh Memcached và Redis.

| | Memcached | Redis|
| --- | --- | --- |
| Dữ liệu | Đơn giản | Phức tạp |
| Command line | 12 | 125 |
| Server-side scripting | No | Yes (Lua) |
| Transactions | no | yes |
| Multi-threaded | yes | no |

<br />
Vậy thì ElastiCache là gì và nó có liên quan gì tới mencached và redis?

## ElastiCache
ElastiCache là một dịch vụ của AWS mà cho phép ta tạo một clusters Memcached hoặc Redis một cách dễ dàng thay vì ta phải tự cài đặt và cấu hình nhiều thứ.

![image.png](https://images.viblo.asia/a5f14179-14de-4644-bf10-3305d7238a67.png)

AWS ElastiCache sẽ cover cho ta nhứng thứ sau:
+ Installation: khi ta tạo một ElastiCache thì AWS sẽ tự động cài đặt những thứ cần thiết cho Memcached và Redis ở bên dưới của nó, ta chỉ cần đợi nó cài xong và xài.
+ Administration: những vấn đề liên quan tới công việc của system admin cho một ElastiCache thì ta không cần phải quan tâm, AWS làm cho ta.
+ Monitoring: ElastiCache sẽ push metrics của nó lên trên CloudWatch.
+ Backups: AWS có option cho ta tự động backup dữ liệu cache (redis only).

## Why should we use it on AWS?
Có một câu hỏi đặt ra là nếu đã làm việc trên môi trường AWS thì tại sao ta lại nên sử dụng ElastiCache? Để trả lời câu hỏi này thì mình sẽ có một ví dụ tiếp theo như sau.

Thông thường khi triển khai ứng dụng dùng cache ta sẽ install redis hoặc memcached lên trên server của ta. Nếu ứng dụng ta đơn giản thì cách này sẽ vẫn sẽ chạy tốt.

![image.png](https://images.viblo.asia/751e8682-a38c-44cf-95d9-5ef2e8b4f796.png)

Nhưng nếu ứng dụng của ta nó mở rộng ra thì redis của ta cũng cần mở rộng theo để đáp ứng được ứng dụng. Tới đây thì vẫn không có vấn đề gì xảy ra cả.

![image.png](https://images.viblo.asia/5d6cc736-b737-4e87-a626-1ce6c4a6c65c.png)

Nhưng nếu ứng dụng của ta lại cần mở rộng nhiều nữa, lúc này con redis của ta cũng sẽ cần mở rộng theo. Đây là lúc mà ta sẽ gặp vấn đề, lúc này thì redis đã chiếm hết resource của server và không thể mở rộng hơn nữa.

![image.png](https://images.viblo.asia/8490902d-8b7a-4757-8727-e29e91c7c474.png)

**Ở trên chỉ là ví dụ server 2 CPU 2 GB RAM, cho dù server của ta có là 32 CPU 32 GB RAM thì ta cũng sẽ gặp vấn về này sớm hay muộn.**

Để giải quyết vần đề trên thì ta phải xài redis dạng cluster. Cluster sẽ giúp ta giải quyết vấn đề scale của redis. Ta sẽ tạo ra thêm một con redis replica ở một server khác và cấu hình để con redis ở server cũ thành con master, và enable cho con master có thể sync dữ liệu qua cho con replica.

![image.png](https://images.viblo.asia/4ad826ee-a43c-4ab2-88af-18350920bc6a.png)

Thì để setup một cluster redis như vậy là một công việc tuy không quá khó nhưng cũng không hề đơn giản, và quan trọng nhất là khi ta làm việc này sẽ mất rất nhiều thời gian. 

Do đó khi ta đã làm việc với AWS ta nên sử dụng Elasticache, thay vì ta phải tạo nhiều con EC2 rồi dựng cụm redis cluster lên trên nó. **Với Elasticache ta chỉ cần vài thao tác đơn giản trên Console ta sẽ có được một Cluster Redis.**

## Create Elasticache Memcached
Để tạo một Elasticache cluster trước tiên ta cần phải tạo subnet group cho nó, ta làm các bước như sau:
1. Truy cập Elasticache Console [https://console.aws.amazon.com/elasticache/home](https://console.aws.amazon.com/elasticache/home).
2. Chọn **Subnet Groups**, bấm vào Create Subnet Group.
3. Nhập Name và Description.
4. Chọn **VPC ID** => Chọn **Availability Zone** => Chọn **Subnet ID** mà ta muốn Elasticache Node sẽ được deploy tới.
5. Nhập tags và bấm Create.

<br />

Sau khi tạo Subnet Groups, ta sẽ tạo Elasticache Memcached, ta làm như sau:
1. Ở Elasticache Console, chọn menu Memcached, bấm Create.
2. **Cluster engine** chọn Memcached.
3. **Location** ta chọn Amazon Cloud.
4. **Memcached settings** ta nhập vào Name, các thông số còn lại bạn có thể chọn hoặc để mặc định.
5. Mở mục **Advanced Memcached settings** ra ta sẽ thấy **Subnet Group** mà ta vừa tạo khi nãy đã được chọn.
6. Bấm Create.

Oke, ta đã tạo được một Elasticache Memcached 😁.

## Kết luận
Vậy là ta đã tìm hiểu xong cơ bản về Elasticache. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Ở bài tiếp theo chúng ta sẽ tìm hiểu về **Cache Deployment Options** trong Elasticache.

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