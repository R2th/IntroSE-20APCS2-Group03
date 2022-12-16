## Load balancing

Cân Bằng Tải là một tính năng công nghệ rất quan trọng trong ngành mạng máy tính, giúp các máy chủ ảo hoạt động đồng bộ và hiệu quả hơn thông qua việc phân phối đồng đều tài nguyên.

Cân Bằng Tải là việc phân bố đồng đều lưu lượng truy cập giữa hai hay nhiều các máy chủ có cùng chức năng trong cùng một hệ thống. Bằng cách đó, sẽ giúp cho hệ thống giảm thiểu tối đa tình trạng một máy chủ bị quá tải và ngưng hoạt động. hoặc khi một máy chủ gặp sự cố, cân bằng tải sẽ chỉ đạo phân phối công việc của máy chủ đó cho các máy chủ còn lại, đẩy thời gian uptime của hệ thống lên cao nhất và cải thiện năng suất hoạt động tổng thể.

![](https://images.viblo.asia/fd130f98-dc2d-4a07-be6d-e1464042864a.jpg)

Ở bài viết này mình sẽ giới thiệu các bước để tạo một load balancer trên aws

## Xây dựng một load balancer

Giả sử mình đã có 2 instances chạy 2 web app đơn giản như sau:

![](https://images.viblo.asia/5a2d8636-95c2-4b45-b7e3-f5cb0600a59e.PNG)

![](https://images.viblo.asia/8cf85128-306c-4522-9b86-037a316d1547.PNG)


Mình sẽ tạo một load balancer để cân bằng tải giữa 2 máy đó.

![](https://images.viblo.asia/6ac0f68f-dc27-47d1-84f7-482d3530ccdc.PNG)

Vào service EC2, chọn mục Load Balancer, sau đó chọn Create Load Balancer

### Step 1: Define Load Balancer

![](https://images.viblo.asia/dc84e544-79fb-433b-a7bd-71ccd766b701.PNG)

Đặt tên cho bộ cân bằng tải mới của bạn. Bạn cũng sẽ cần phải định cấu hình các cổng và giao thức cho bộ cân bằng tải của mình.
Lưu lượng truy cập có thể được định tuyến từ bất kỳ cổng cân bằng tải nào đến bất kỳ cổng nào trong các phiên bản EC2 của bạn.
Mặc định đã cấu hình bộ cân bằng tải của bạn với một máy chủ web tiêu chuẩn trên cổng 80.

### Step 2: Assign Security Groups

![](https://images.viblo.asia/f632a9a0-1d99-41f1-8ede-ff5251773a3a.PNG)

Bạn có thể chọn những Security Groups đã định nghĩa trước đó hoặc tạo mới Security Groups cho load balancer của mình.
Ở đây mình tạo mới một Security Groups và mở cổng 80 cho dịch vụ web.

### Step 3: Configure Security Settings

Nếu lưu lượng truy cập của bạn đến bộ cân bằng tải cần được bảo mật, hãy sử dụng giao thức HTTPS hoặc SSL. 
Nếu bạn có config sữ dụng các giao thức này ở bước đầu tiên thì bạn phải Configure Security Settings ở bước này.
Tuy nhiên mình chỉ sữ dụng HTTP bên bỏ qua ở đây nhé :v 

### Step 4: Configure Health Check

![](https://images.viblo.asia/150a7955-f908-46d3-b03f-55227eaec3ed.PNG)

Bộ cân bằng tải của bạn sẽ tự động thực hiện kiểm tra sức khỏe trên các instance EC2 của bạn và chỉ định tuyến lưu lượng truy cập đến healthy instance.
Nếu một trường hợp unhealthy, nó sẽ tự động bị xóa khỏi bộ cân bằng tải.
Bạn có thể tùy chỉnh các thông số theo yêu cầu của mình.

### Step 5: Add EC2 Instances

![](https://images.viblo.asia/c85968d9-a625-4158-891f-b9a3f7b24b43.PNG)

Chọn các instances mà mình muốn thêm vào load balancer

### Step 6: Add Tags

Cái này tạm cho qua :v 

### Step 7: Review

Xem lại toàn bộ những thông tin của load balancer trước khi tạo
Sau khi mọi thứ đã xong, mình nhấn Create

Như vậy mình đã tạo xong một load balancer với các thông tin cơ bản như sau

![](https://images.viblo.asia/896f8555-f5e9-490a-b74c-2859aa9de783.PNG)

Vào DNS name của load balancer mới tạo để kiểm tra nào

![](https://images.viblo.asia/671c2453-72a9-4a6f-8817-d03c737eed09.gif)

Có nhảy qua nhảy về giữa 2 intances là được rồi hehe



-----

Tham khảo lý thuyết: https://longvan.net/load-balancing-can-bang-tai-la-gi.html

-----


## Mr.Nara