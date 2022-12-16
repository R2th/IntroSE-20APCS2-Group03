*Celery là một open source asynchronous task queue or job queue. Nó dễ sử dụng, bạn không cần phải nắm quá rõ để sử dụng được nó. Celery được thiết kế có khả năng mở rộng, tích hợp với nhiều ngôn ngữ và có riêng phần quản lý*

### 1. Chọn Message Broker
Message broker là nền tảng trung gian giúp giao tiếp giữa 2 ứng dụng. Với Celery, bạn có nhiều lựa chọn:

    1. RabbitMQ
Tính năng hoàn chỉnh, ổn định, bền bỉ và dễ dàng cài đặt là nhưng điều kiện để lựa chọn RabbitMQ. Để cài đặt RabbitMQ chạy lệnh sau:
```
$ sudo apt-get install rabbitmq-server
```
Sau khi cài đặt xong thì RabbitMQ sẽ chạy ở chế độ background cùng một message: `Starting rabbitmq-server: SUCCESS`

    2. Redis
Điểm trừ của Redis so với RabbitMQ là có thể mất data nếu bị dừng đột ngột do lỗi nào đó hoặc mất điện.
```
$ wget http://download.redis.io/redis-stable.tar.gz
$ tar xvzf redis-stable.tar.gz
$ cd redis-stable
$ make
```

    3. Other brokers
Cũng có thể chọn những dịch vụ Message broker khác từ [Amason SQS](http://docs.celeryproject.org/en/latest/getting-started/brokers/sqs.html#broker-sqs). Đây là [danh sách](http://docs.celeryproject.org/en/latest/getting-started/brokers/index.html#broker-overview) các broker được hỗ trợ trong Celery

### 2. Cài đặt
CÓ thể cài đặt Celery dễ dàng qua `pip` hoặc `easy_install`:
```
$ pip install celery
```

### 3. Application
Tạo một file `tasks.py` trong thư mục dự án:
```
from celery import Celery

app = Celery('tasks', broker='pyamqp://guest@localhost//')

@app.task
def add(x, y):
    return x + y
```
*Giải thích:* Đối số đầu tiên của **Celery** là tên của module. Việc đặt tên này sẽ cần thiết cho việc tạo tự động các task được định nghĩa trong hàm `__main__`

Đối số thứ 2 là keyword cho broker, nếu chọn Redis thì thay đổi giá trị thành `redis://localhost`

Sau đó, defined một task có tên `add` nhận 2 tham số đầu vào và trả về tổng giá trị của chúng

### 4. Chạy Celery worker server
Chạy câu lệnh sau:
```
$ celery -A tasks worker --loglevel=info
```
Để Celery chạy nền thì cần follow theo các bước sau:

    Step 1: Cài đặt `supervisord` qua `apt-get`
    
    Step 2: Tạo file: `/etc/supervisor/conf.d/celery.conf` và thêm vào nội dung sau
```
[program:celery]
directory = /my_project/
command = /usr/bin/python manage.py celery worker
```
    Step 3: Khởi động lại `supervisor` và sau đó sử dụng các câu lệnh sau
```
$ supervisorctl start/restart/stop celery
$ supervisorctl tail [-f] celery [stderr]
```

### 5. Call task
Để call một task, bạn có thể sử dụng method `delay()`
```
>>> from tasks import add
>>> add.delay(4, 4)
```
Sau khi gọi method trên, task vụ được đưa vào thực hiện và bạn có thể confirm tại màn hình console log lúc chạy `Celery` server. Khi gọi hàm trên thì bạn sẽ được trả về một `AsyncResult`. Bạn có thể sử dụng `AsyncResult` để kiểm tra trạng thái của task mình vừa add vào, đợi task hoàn thành hoặc nhận giá trị trả về của task(có thể nhận được ngoại lệ và traceback)

### 6. Lưu giữ Result
Mặc định, Celery sẽ không trả về  `AsyncResult` nếu không được cấu hình. Để nhận được kết quả khi chạy task bạn cần khai báo như sau:
```
app = Celery('tasks', backend='rpc://', broker='pyamqp://')
```
Trong đó param `backend` là nơi bạn muốn lưu trữ, ví dụ như: `SQLAlchemy/Django ORM, Memcached, Redis, RPC (RabbitMQ/AMQP)...` Nếu muốn sử dụng Redis thay thế giá trị của param `backend` thành `redis://localhost`.
Ok, sau khi cấu hình xong, chạy lại server và thử lại với câu lệnh trên:
```
>>> result = add.delay(4, 4)
>>> result.ready()
False
>>> result.get(timeout=1)
8
```
Nếu muốn handle ngoại lệ, bạn có thể dùng
```
>>> result.traceback
```
Thông tin có nhiều hơn tại [`celery.result`](http://docs.celeryproject.org/en/latest/reference/celery.result.html#module-celery.result)

### 7. Kết luận
Mình vừa giới thiệu cho các bạn về `Celery`, cách cài đặt và demo đơn giản. Hẹn gặp lại các bạn ở những phần nâng cao của Celery.

Nguồn: http://docs.celeryproject.org/en/latest/getting-started/first-steps-with-celery.html