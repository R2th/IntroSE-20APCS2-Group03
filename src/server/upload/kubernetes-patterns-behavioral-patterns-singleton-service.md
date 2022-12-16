## Giới thiệu
Chào các bạn tới với series về kubernetes patterns, ở bài trước chúng ta đã nói về Batch Job và Periodic Job. Ở bài chúng ta sẽ tìm hiểu tiếp một patterns nữa là Singleton Service.

## Singleton Service
Singleton Service pattern chắc chắn rằng chỉ có một instance của application được active cho một Service tại một thời điểm, mà vẫn đảm bảo độ highly available cho application. Ta có thể thực hiện công việc này bằng cách implement code bên trong ứng dụng, hoặc có thể dùng k8s để làm việc đó.

Sơ đồ đơn giản diễn tả Singleton Service pattern.

![image.png](https://images.viblo.asia/e7f46a1f-be4f-4bdf-b514-2ba5d31303ce.png)

Thông thường khi ta làm việc với k8s, ta sẽ sử dùng Pod để run application, và để ứng dụng của ta có thể highly available nhất thì ta sẽ dùng ReplicaSet để chạy nhiều Pod cùng một lúc. Và cách ta chạy nhiều Pod giống nhau như vậy được gọi là active-active topology, lúc này thì toàn bộ instance của ứng dụng điều được active.

![image.png](https://images.viblo.asia/dff8e4a7-1c45-4827-bc93-1e6738877a4d.png)

Và khi ta cần gửi request tới Pod, ta sẽ tạo một thằng Service cho tất cả những thằng Pod đó.

![image.png](https://images.viblo.asia/a0345baf-57d3-4175-8966-0e7054d4974e.png)

Nhưng giờ ta được nhận một yêu cầu là bắt buộc từng thằng Pod instance của ta sẽ có một thằng Service định danh cụ thể của nó, vì nếu có nhiều thằng Pod instance mà chỉ có một Service định danh thì ứng dụng của ta sẽ bị lỗi.

Ví dụ đơn giản là ta có một ứng dụng mà khi ta gửi request tới nó thì nó sẽ thực hiện request tới một database nhất định để cập nhật dữ liệu, nếu mà ta có nhiều hơn hai instance của ứng dụng đều nằm sau một Service, thì công việc cập nhật dữ liệu trong database của ta sẽ bị duplicates hoặc có thể bị lỗi luôn.

![image.png](https://images.viblo.asia/6882f03c-0f51-4c72-880d-97a808015226.png)

Nên ta phải có cách định danh Service cho một Pod nhất định, nếu bạn xài Service thông thường thì khi ta gọi request tới Service đó thì request sẽ được gửi random tới 1 trong những Pod nằm phía sau Service, ta không thể gọi chính xác tới Pod mà ta muốn được. Để giải quyết vấn đề này, ta có hai cách implement như sau: **out-of-application and inapplication locking**.

## Out of Application
Như tên gọi thì ở cách này ta sẽ thực hiện công việc Singleton Service ở bên ngoài ứng dụng, nghĩa là ta sẽ dùng một thằng khác bên ngoài giúp ta control công việc này chứ không cần phải implement code trong ứng dụng.

Ở trong k8s thì ta sẽ làm công việc này bằng cách kết hợp StatefulSet với Headless Service. Khi ta dùng Service thông thường, nó sẽ tạo ra một thằng Virtual IP cho ta và thực hiện load balancing giữa các Pod instances mà nó lựa chọn thông qua selector matches.

![](https://images.viblo.asia/f8f0385d-7aae-4126-ab30-74f9b9d3b7dd.png)

Còn khi ta dùng Headless Service **(tạo Service với config clusterIP: None)**, thì nó sẽ không tạo ra một thằng Virtual IP cho ta, mà thay vào đó nó sẽ  tạo ra một DNS chính xác cho từng thằng Pod phía sau nó.

![](https://images.viblo.asia/0eb37cf3-aaa6-4679-b412-6ada5c4c323e.png)

Bằng cách sử dụng Headless Service thì ta có thể tạo Service định danh chính xác cho từng Pod instances.

![image.png](https://images.viblo.asia/72f19372-5a39-42b8-b669-bb819a4431b0.png)

Nhưng với cách out of application này thì ứng dụng của ta sẽ không đạt được yêu cầu về highly available, vì nếu chỉ có 1 Pod cho một ứng dụng mà Pod đó nó chết, thì ứng dụng của ta sẽ chết theo, tuy một lúc sau StatefulSet có thể tạo lại Pod được nhưng ứng dụng của ta cũng sẽ bị downtime.

Vì vậy ta phải có cách tạo nhiều Pod mà chỉ có một thằng được active, mấy thằng còn lại thì ở trạng thái passive hết để đảm bảo highly available. Ta làm bằng phương pháp inapplication locking.

![](https://images.viblo.asia/57c13d25-1521-4455-bdea-c96ef088eb97.jpg)

## Inapplication locking
Như tên gọi thì để thực hiện được việc này ta phải implement code trong ứng dụng của ta, hoặc dùng những frameworks khác để làm việc này chứ hiện tại thì k8s chưa hỗ trợ chức năng này cho ta. Những frameworks như vậy được gọi là **distributed frameworks**, nó sẽ implement **distributed lock** mà control toàn bộ instance của ta.

Nó sẽ thực hiện công việc đó như sau, khi toàn bộ instance của ta đang được active, nó sẽ gửi một request tới một trong những instance đang active và yêu cầu lock instance đó, nếu thành công thì instance đó sẽ được set là active còn toàn bộ các instance còn lại sẽ được chuyển sang passive và chờ lock request.

![image.png](https://images.viblo.asia/1a74a10e-2ac4-4a35-9416-fd8447d498af.png)

Ví dụ ta có thể làm việc này bằng cách sử dụng Apache Camel với Kubernetes connector để implement Singleton Service, Camel sẽ chắc chắn chỉ có một route instance là được active và toàn bộ instance khác sẽ ở trạng thái passive và chờ cho tới khi được activating.

> Đây là những keywork để bạn tìm kiếm thêm best practice về Singleton Service
> + Singleton Service Example
> + Simple Leader Election with Kubernetes and Docker
> + Leader Election in Go Client
> + Configuring a Pod Disruption Budget
> + Creating Clustered Singleton Services on Kubernetes
> + Apache Camel Kubernetes Connector

## Kết luận
Vậy là ta đã tìm hiểu xong về Singleton Service, sử dụng out-of-application sẽ giúp ta implement Singleton Service rất dễ dàng nhưng nó sẽ không đạt yêu cầu về highly available, để đạt được highly available thì ta cần sử dụng thêm cách inapplication locking. Nhưng để implement inapplication locking không hề đơn giản, cần xem xét nhiều trước khi implement. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment. Hẹn gặp mọi người ở bài tiếp theo ta sẽ nói tiếp về **Service Discovery**.

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