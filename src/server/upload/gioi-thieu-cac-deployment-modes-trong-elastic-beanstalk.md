# Các deployment modes trong Elastic Beanstalk
* **All at once:** nhanh nhất nhưng server sẽ không thể nhận traffic trong một khoảng thời gian (downtime)
* **Rolling:** update một vài instances cùng một lúc (gọi là một bucket), sau đó tiếp tục update đến các bucket tiếp theo
* **Rolling with additional batches:** giống như **rolling**, tạo thêm instance mới trong khi update để đảm bảo fleet size không thay đổi trong quá trình deploy
* **Immutable:** Tạo mới các instance trong một ASG, deploys version mới lên những instance này, sau đó swap chúng với các instance cũ khi tất cả đều healthy

# All at once
Cũng giống như tên gọi của nó vậy, khi bạn sử dụng All at once mode thì Beanstalk sẽ tiến hành update tất cả các instance cùng lúc.
![](https://images.viblo.asia/b000446c-8cf2-494a-a972-aa8b0283aa82.png)

### Tổng quan:
* Thời gian deploy nhanh
* Ứng dụng sẽ có dowtime
* Phù hợp với môi trường dev hoặc test vì nếu như quá trình deploy có sự cố sẽ gây ảnh hưởng đến service
* Không phát sinh thêm chi phí

# Rolling
Khi sử dụng rolling mode Beanstalk sẽ nhóm các instances lại thành các batch và sẽ deploy lần lượt từng batch cho đến khi quá trình deploy hoàn tất:
![](https://images.viblo.asia/467bb7aa-665f-48e6-99b4-2fe0715616a4.png)

Vậy nếu như quá trình deploy gặp sự cố thì sao? Nếu theo ví dụ bên trên có 3 instance và với batch size là 1:
* Nếu như sự cố xảy ra ở batch đầu tiên thì instance đầu tiên sẽ bị down, 2 instance còn lại sẽ chạy ở version cũ.
* Nếu như sự cố xảy ra ở batch thứ hai thì lúc này hệ thống sẽ chạy với cả 2 version app cũ và mới.
![](https://images.viblo.asia/e8c05c59-cce0-4442-a0d5-422d6e87f319.png)

Trong quá tình deploy thì feet size cũng sẽ bị giảm đi tùy theo só lượng instance trong các batch vì trong quá tình deploy các instance trong batch không thể tiếp nhận traffic.

### Tổng quan
* Zero downtime
* Số lượng instance hoạt động trong hệ thống sẽ bị giảm
* Ứng dụng sẽ chạy cùng lúc cả 2 version ứng dụng trong quá trình deploy
* Không phát sinh thêm chi phí
* Thời gian deploy lâu hơn All at once

# Rolling with additional batches
Giống như tên gọi của nó, Beanstalk sẽ tạo thêm một batch các instance và bắt đầu deploy version mới lên batch này trước, sau đó sẽ lần lượt update các batch tiếp theo. Sau quá trình deploy ment hoàn tất sẽ terminate số lượng instance bằng với số lượng instance trong một batch để trở về fleet size ban đầu. Việc này sẽ xử lý được vấn đề giảm fleet size của **Rolling** mode.
![](https://images.viblo.asia/19e4ce9a-3e4b-4a77-8f8c-ad27697f5343.png)

Trong trường hợp deploy gặp sự cố:
* Nếu sự cố xảy ra ở batch đầu tiên thì hệ thống sẽ vẫn hoạt động bình thường, fleet size của hệ thống không bị giảm
* Nếu sự cố xảy ra ở các batch tiếp theo thì cũng sẽ giống như **Rolling** mode, các instance trong batch sẽ bị down và hệ thống sẽ chạy cùng lúc cả 2 version cũ và mới của ứng dụng. Tuy nhiên fleet size của hệ thống không bị giảm.
![](https://images.viblo.asia/3c8cb250-d384-40f6-a946-daaf828d2e21.png)

### Tổng quan
* Zero downtime
* Số lượng instance hoạt động trong hệ thống không bị giảm
* Ứng dụng sẽ chạy cùng lúc cả 2 version ứng dụng trong quá trình deploy
* Phát sinh thêm một khoản chi phí nhỏ tùy theo batch size
* Tốt cho môi trường Production
* Thời gian deploy lâu hơn **Rolling**

# Immutable
Khi sử dụng deployment mode này các instance sẽ là **Immutable**, chúng ta không update chúng mà sẽ tạo mới và thay thế. Beanstalk sẽ tạo ra số lượng instance mới bằng với số lượng instance hiện tại và bắt đầu deploy version ứng dụng mới lên chúng.
![](https://images.viblo.asia/94dd86ea-1285-42b9-be82-cd8025f60519.png)

Sau khi quá trình deploy hoàn tất Beanstalk sẽ terminate tất cả instance chạy version cũ đi
![](https://images.viblo.asia/723178f1-17bb-4cba-af1b-872168529f5d.png)

Khi xảy ra sự cố trong quá trình deploy thì sẽ hoàn toàn không ảnh hưởng gì tới các instance đang hoạt động
![](https://images.viblo.asia/b88a9a6d-9e2c-44a9-b260-606b37ab3d09.png)

### Tổng quan
* Zero downtime
* Phát sinh thêm chi phí lớn do double fleet size
* Thời gian deploy lâu nhất
* An toàn nhất, phù hợp với môi trường Production

# Tham khảo
https://blog.shikisoft.com/which_elastic_beanstalk_deployment_should_you_use/