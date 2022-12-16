Mình viết bài này chủ yếu để chia sẻ lại kiến thức trong quá trình nghiên cứu để phát triển ứng dụng web 3D trong đó một số tác vụ time-consuming, complex-computing như render, extract data từ image ...sẽ được xử lí phía server và cập nhật tiến độ cho client để theo dõi.

Đây là layout hệ thống mà mình sử dụng cho riêng tác vụ xử ly task từ user.
![](https://images.viblo.asia/b0a00789-051a-4b48-a074-0606ef3944d2.png)

## Yêu cầu hệ thống:
###  Chức năng:
1. * User upload các loại asset được hỗ trợ ( file 3D: .fbx, .obj ...; file 2D: substance).
2. * Hệ thống thực hiện các tác vụ tùy vào loại asset được upload.
3. * Các task chạy background và chạy parallei-mode.
4. * Update realtime về trạng thái task cho user


Trong khuôn khổ bài viết này, mình không đề cập chi tiết các module như Redis, RabbitMQ, Celery, FastAPI, các bạn có thể tìm thấy rất nhiều tutorial hướng dẫn trên internet.
Ở đây mình sẽ chia sẻ cách thức mà team mình xây dựng để kết nối các module trên thành hệ thống để vận hành bài toán đặt ra.

Ok, vào việc luôn nha.

## Modules
### Celery
Đầu tiên, là một chút giới thiệu về Celery.
Đối với các bạn làm Python thì Celery là công cụ khá nổi tiếng cho các tác vụ dạng Distributed Queue. Về cơ bản, nó sẽ phân bổ các task cho các worker, có một broker trung gian để nhận task từ server đưa xuống.
Broker trung gian thường sử dụng là RabbitMQ hoặc Redis. Ở đây, mình sẽ sử dụng RabbitMQ là broker, Redis mình sẽ sử dụng chức năng PUB/SUB để publish trạng thái của task cho client.

Cốt lõi của Celery là các task sẽ được thực thi bởi các worker. Chúng ta chuyển function thông thường thành celery task bằng cách sử dụng decorator **@task** 
![](https://images.viblo.asia/584db547-0fce-46e5-a8db-8efddb34dc0b.png)


Ở đây, với mỗi task chúng ta sẽ ghi nhận lại task-ID đồng thời kết hợp với session-ID mình dùng JWT (JSON web token), hai ID sẽ được tổ hơp lại thành channel để sử dụng Redis PUB. Vì user có thể submit nhiều file và mỗi file sẽ tương ứng với một task được thực thi ở background nên channel cần có thông tin của task-ID để sau này server có thể PSUBSCRIBE ( pattern subscribe). Nghe có vẻ rắc rối nhỉ, :), thêm tí nữa cho nó xoắn não, và session-ID giúp cho WebSocket gửi thông tin lại cho đúng user đã gửi tasks.
![](https://images.viblo.asia/277e149c-8541-4737-9e50-965e85bfa9da.png)

Hi vọng layout trên giúp các bạn dễ dàng hình dung được lí do vì sao mình cần session-ID và task-ID.

Phần tiếp theo chỉ đơn giản là cấu hình celery application.
Bắt đầu bằng việc định nghĩa các configuration:
![](https://images.viblo.asia/acf49222-ac72-4ef3-9eb0-318b7acb3771.png)

Và celery application sẽ run với Configuration object bên trên
![](https://images.viblo.asia/1505d425-b6f2-4901-abe5-6f39b911e29b.png)

Cuối cùng, chỉ còn việc khởi động celery worker, sẵn sàng nhận task khi được yêu cầu:
```
celery -A services.queue.tasks worker --pool=eventlet --loglevel=info --concurrency=4
```

### FastAPI
Phần tiếp theo, mình sẽ đề cập tóm tắt về HTTP Request và WebSocket của FastAPI. 
Minh sẽ ví dụ vài HTTP request khi user yêu cầu để thực thi các tác vụ.
![](https://images.viblo.asia/b17cb2fd-9f22-494a-81ec-29484e78779d.png)

WebSocket connection:
![](https://images.viblo.asia/3486967b-dfec-4561-92b2-6679c8f2b3a8.png)

WebSocket chỉ được connect khi user đã chứng thực, do đó trong URL của WebSocket mình kèm thêm session-ID được khởi tạo khi user login và được server response bằng JSON web token.

Để tránh web server bị block các synchronous process khi sử dụng redis SUB, mình dùng module aioredis để tạo Pattern Subscribe đến Redis server. 

Các bạn có thể thấy mình chọn pattern subscribe *tasksession-ID* đảm bảo subscribe tất cả các messges từ các tasks mà user đã submit trong 1 session. WebSocket sẽ gửi tất cả các message mỗi khi nhận được một message từ celery task.
Ứng dụng web phía client sẽ cập nhật thông tin từ WebSocket và hiển thị process của task tương ứng. Phần này mình xin dành để nói thêm trong phần sau.

### Lời kết
Cám ơn mọi người đã đọc tới phần này. Hi vọng đã cung cấp cho mọi người một vài thông tin hữu ích. Thật ra, những phần này mình cóp nhặt đây đó trên mạng và thay đổi tùy chỉnh theo yêu cầu của hệ thống bên mình. Mọi phản hồi và trao đổi team mình đều rất cảm ơn.