## Giới thiệu
Chào các bạn tới với series về kubernetes patterns. Ở bài này chúng ta sẽ tìm hiểu về một patterns rất quan trọng trong k8s là Service Discovery.

## Service Discovery
Service Discovery pattern sẽ cung cấp cho ta một stable endpoint, và client có thể sử dụng endpoint đó để truy cập các ứng dụng của ta.

![image.png](https://images.viblo.asia/e01bb757-0fe3-414a-a7c1-4effa504b04b.png)
*<div align="center">Image from [nginx](https://www.nginx.com/blog/service-discovery-in-a-microservices-architecture)</div>*

## Problem
Khi ta triển khai một ứng dụng lên trên k8s ta sẽ deploy nó lên trên Pod, và mỗi pod đều có một IP riêng của nó. Nếu các ứng dụng của ta muốn giao tiếp với nhau thông qua pod ip thì ta sẽ gặp một vấn đề rất lớn.

Vì ở trong k8s thì pod là một ephemeral resource, có nghĩa là trong quá trình ta triển khai ứng dụng pod có thể được tạo ra, xóa đi, hoặc thay thế bằng một thằng khác bất cứ lúc nào. Và mỗi lần pod được tạo mới ip của nó sẽ đổi, nên nếu các ứng dụng của ta giao tiếp với nhau thông qua pod ip thì nó sẽ bị lỗi.

![](https://images.viblo.asia/c766af34-7615-4a88-ae31-699e896985af.jpg)

## Solution
Để giải quyết vấn đề trên k8s mới sinh ra thằng Service resource mà implment Service Discovery pattern.

Service resource sẽ tạo ra một fixed Virtual IP cho toàn bộ các pod phía sau nó. Service sẽ chọn các Pod mà nó quản lý connection thông qua thuộc tính `spec.selector`.

![](https://images.viblo.asia/f8f0385d-7aae-4126-ab30-74f9b9d3b7dd.png)

Và khi request của ta gọi tới virtual ip của service thì nó sẽ được gửi random tới một trong những pod ở đằng sau service đó.

![image.png](https://images.viblo.asia/3488fe51-ce2b-4217-9796-9332daa8d6c5.png)

*<div align="center">Image from [Kubernetes In Action](https://www.manning.com/books/kubernetes-in-action)</div>*

## Service Discovery in Kubernetes
Vậy làm thế nào các ứng dụng trong pod có thể phát hiện được Virtual IP của một Service? Ta sẽ có hai cách sau:
+ Discovery thông qua environment variables.
+ Discovery thông qua  DNS lookup.

### Discovery through environment variables
Cách đầu tiên để các ứng dụng có thể phát hiện được Virtual IP của một Service là thông qua environment variables.

Khi một pod bắt đầu chạy thì nó sẽ được nhúng toàn bộ thông tin của các Service đang tồn tại lúc đó vào trong biến environment variables của nó, thông tin Virtual IP của Service cũng sẽ được nhúng vào các env này.

Hai biến env chứa thông tin về Virtual IP của Service là HOST và PORT, có định dạng như sau:
+ `<SERVICE_NAME>_SERVICE_HOST`
+ `<SERVICE_NAME>_SERVICE_PORT`

Ví dụ ở trên ta có Service tên là kubia, thì biến env của nó sẽ có định dạng là:

```
KUBIA_SERVICE_HOST=172.17.0.4
KUBIA_SERVICE_PORT=80
```

Cách discovery thông qua biến env này sẽ có một khuyết điểm. Đó là biến env của Service chỉ được nhúng vào khi pod bắt đầu chạy, còn với các pod đang chạy thì khi ta tạo Service mới thì các không tin của Service đó sẽ không được nhúng vô, để lấy được thông tin mới thì pod của ta cần được restart lại. Do đó thông thường ta sẽ sử dùng cách thứ hai.

### Discovery through DNS lookup
Với cách này thì các ứng dụng sẽ phát hiện Virtual IP của một Service thông qua DNS. Kubernetes có cung cấp cho ta một internal dns server, khi một Service mới được tạo ra thì bên cạnh Virtual IP được gán cho nó thì còn có thêm một DNS đi kèm.

Và ta có thể truy cập Service thông qua DNS đó, dns của Service với format FQDN (fully qualified domain name) `<service-name>.<namespace>.svc.cluster.local`. Với `<service-name>` là tên của service ở trường `metadata.name`, còn `<namespace>` là tên namespace mà Service được tạo, `.svc` định nghĩa cho nó là service resource, `cluster.local` là hậu tố cố định.

Ví dụ với Service ở trên thì dns của ta sẽ có tên là `kubia.default.svc.cluster.local`. Và khi ta sử dụng nó trong pod, ta chỉ cần chỉ định nó với `<service-name>.<namespace>` mà thôi. Ví dụ với `kubia.default.svc.cluster.local` thì khi ta dùng ta chỉ cần lấy `kubia.default` là đủ.

Và khi ứng dụng trong pod gọi tới dns của service thì nó sẽ được resolve bởi k8s internal dns, và sau đó internal dns sẽ trả về cho ứng dụng đó IP của Service.

## Kết luận
Vậy là ta đã tìm hiểu xong về Service Discovery, đây là phần lý thuyết rất quan trọng khi bạn làm việc với kubernetes. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/17647fc7-67d1-44a8-aae1-a8a1f2266351.jpg)

Hiện tại thì công ty bên mình, là Hoàng Phúc International, với hơn 30 năm kinh nghiệm trong lĩnh vực thời trang. Và sở hữu trang thương mại điện tử về thời trang lớn nhất Việt Nam. Team công nghệ của HPI đang tìm kiếm đồng đội cho các vị trí như:
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