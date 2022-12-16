![](https://images.viblo.asia/6af8ddcb-ea51-44b0-b346-191ed4093b89.jpeg)


Tiếp nối quá trình deploy ứng dụng rails lên Cloud(cụ thể là lên AWS), bài viết trước mình đã note các bước chuẩn bị đầu tiên đó là: [tạo rails app với docker](https://viblo.asia/p/build-rails-sidekiq-web-app-in-docker-ORNZqXgLK0n)

Nay chúng ta sẽ tìm hiểu về ECR và cách push được image đầu tiên của bạn lên AWS

Một số khái niệm cơ bản: https://dev.to/jamby1100/deploy-rails-in-amazon-ecs-part-1-concepts-26nl ([Vietsub](https://viblo.asia/p/deploy-du-an-ruby-on-rails-tren-amazon-ecs-part-1-y-tuong-924lJWg85PM#_task-defination-3))

## Set up IAM user(role)

Giới thiệu qua một chút. Chúng ta sẽ cần có 1 nơi lưu trữ image của Docker mà ta đã build ở local - giống Dockerhub zậy đó.
Amazon đã cung cấp 1 seriver cho phép chúng ta làm điều đó Amazon ECR(Elastic Container Registry)

Nhưng trước hết là phải setup 1 user có đầy đủ `role` cho việc này cái đã

**1**. Đầu tiên là vào IAM service và chọn `Policies`, sau đó chị click `Create policy`
![2.png](https://images.viblo.asia/51c9fa93-27d6-4858-8db2-3d1474836216.png)

***2***. Chọn service `Elastic Container Registry` , tíc chọn `All Elastic Container Registry Actions` và All Resources ở ngay dưới

![3.png](https://images.viblo.asia/0862b7a4-9ddc-4c9d-a69d-9c0de0bab04e.png)

***3***. Đặt tên cho nó và mô tả rõ ràng  tí :)) -> `Create Policy `
![4.png](https://images.viblo.asia/ff1f5204-f2ce-48ca-82cd-f53306356d81.png)

***4***. Giờ ta sẽ tạo user mới có quyền thao tác vs ECR
![5.png](https://images.viblo.asia/4c3b3207-c2af-43c4-81c3-3677afa17376.png)

***5***. Đặt tên (đơn giản thôi đừng nghĩ sâu xa :)) ) và enable `Programmatic access`
![6.1.png](https://images.viblo.asia/b0b20e75-37aa-469a-a11b-ba353f0b73e0.png)

***6***. Tìm kiếm ecr role và next nhé
![6.png](https://images.viblo.asia/9d764951-cb0c-4c52-b427-5ca4d86d7bbf.png)

***7***. Skip nếu bạn muốn, còn nếu bạn không muốn `just skip`

***8***. Nhớ là download file credentical nhé vì nó là lần đâu tiên bạn thấy nó và cũng là lần cuối cùng :)
![6.2.png](https://images.viblo.asia/15fbb561-ebd1-402b-8033-de367719b670.png)

## Create an ECR repository
hay còn gọi là tạo nơi lưu trữ ECR

***1***. Create repository
![7.png](https://images.viblo.asia/3281b044-cdfc-4301-9185-af323ecae3ba.png)

***2***. Nhập tên, enable tag immutability
![8.png](https://images.viblo.asia/e733b7be-dde9-4139-900d-efa229a20d08.png)

***3***. Kết quả
![9.png](https://images.viblo.asia/e935e258-1f68-4dca-b474-810f579d9793.png)

## Push an image to ECR
***1*** . Click vào 1 repository mà bạn muốn push imagge lên, sau đó click `View push commands`

Ở đây ta có một thiên đường commands à nhầm xin lỗi, mình hơi quá. Ở đây ta có tất cả các bước để push image của bạn lên ECR bằng tay, nên nhớ là bằng tay nhé(manual) :v

Có cả cho Mac/Linux và Window nhé nên không cần phải tranh nhau đâu :3
![10.png](https://images.viblo.asia/cf4a1050-43b1-4409-8dd3-25971fd621b2.png)

***2***. Đã có các bước chi tiết ở đây rồi nên mình cũng sẽ không note lại làm màu làm gì :D. Chúc các bạn thành công!

Comment phía bên dưới nếu bạn có bất kì thắc mắc gì!