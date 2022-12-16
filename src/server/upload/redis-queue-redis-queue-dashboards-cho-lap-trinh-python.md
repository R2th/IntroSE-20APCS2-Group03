# 1. Giới thiệu
Kho lưu trữ dữ liệu trong bộ nhớ - Redis được các nhà phát triển sử dụng rộng rãi làm cơ sở dữ liệu, cache layer, để quản lý hàng đợi công việc, v.v.
Nó rất hữu ích khi bạn đang xây dựng các API với cơ chế hàng đợi công việc để xử lý các tác vụ như chạy các công việc nền (background job) tốn nhiều bộ nhớ trong, đếm số lượt truy cập trang hoặc gửi các  email hàng loạt.
Nếu bạn đang xây dựng một API bằng Python, thì mô-đun Redis Queue (RQ) cung cấp cho bạn các hàm để xếp hàng, lập lịch và xử lý các công việc này bằng cách triển khai các worker.

Trong bài viết này, bạn sẽ khám phá mô-đun RQ để thiết lập hàng đợi công việc và công nhân, cũng như mô-đun RQ-Dashboard để hình dung chúng.
# 2 . Thiết lập Redis
Clone repo của redis và cài đặt các phụ thuộc của nó:
```
$ git clone git@github.com:StackAbuse/redis-queues-redis-queue-dashboards.git
$ cd redis-queues-redis-queue-dashboards
$ python -m venv env
$ . env/bin/activate
$ pip install -r requirements.txt
```
Cách dễ nhất để cài đặt nó trên các hệ điều hành không phải Linux là thông qua Docker Compose :
```
$ docker-compose up -d
```
docker-compose:  File cấu hình để tải xuống Redis image và lệnh đó sẽ chạy nó ở chế độ nền. Ngoài ra, bạn có thể cài đặt Redis cục bộ.
Đối với Ubuntu, cài đặt đó trông giống như sau:
```
$ sudo apt-get install redis
$ sudo service redis-server start
Starting redis-server: redis-server.
$ redis-cli -v       
redis-cli 4.0.9
```
# 3. Hàng đợi Redis (RQ)
Redis Queue (RQ) là một module xếp hàng đợi mà chạy trên đầu trang của Redis. Nó hoạt động như nhà producer để gửi các công việc vào hàng đợi. Mô-đun cũng đi kèm với các worker đóng vai trò là consumers để xử lý các công việc đã gửi từ hàng đợi một cách không đồng bộ. 
> Jobs are references to Python functions that are pushed to the queue.

Nhiều hàng đợi để xử lý job có thể tồn tại và những hàng đợi này có thể được đặt tên theo bất kỳ cách nào bạn muốn. Các job được gửi đến hàng đợi có thể được theo dõi bằng cách sử dụng job id của chúng.

Hãy viết một script đơn giản để sắp xếp một công việc trong Hàng đợi Redis, chẳng hạn như test.py:
```
# Imported to assign redis as the backend to rq
from redis import Redis
# Imported to initialize the queue object
from rq import Queue
# Functions from the __main__ module can't be processed by workers
# Hence, we have a separate Python file containing the function
from test_job import i_am_a_job

# Create the queue object by passing in the redis object
q = Queue(connection=Redis())
 
# Run the job asynchronously
job = q.enqueue(i_am_a_job, 1)
# Return the function output
```
Hàm mà bạn muốn xếp hàng phải được nhập từ một tệp Python riêng biệt  test_job.py:
```
# A Function (or) a job
def i_am_a_job(arg1):
    # Perform some function
    return arg1
```
Bây giờ Hàng đợi Redis và hàm đã được thiết lập, hãy thực thi tập lệnh Python:
```
$ python test.py
```
Chạy lệnh này sẽ tạo ra một job nhưng không trả về kết quả nào . Nếu bạn gặp lỗi, hãy xem lại các bước thiết lập trước khi tiếp tục.

Nếu mọi thứ đều hoạt động, hãy sử dụng RQ-Dashboard để quản lý công việc của mình.

# 4. Quản lý Công việc Hàng đợi Redis với RQ-Dashboard
Bạn có thể kiểm tra trạng thái công việc của mình trong Hàng đợi Redis bằng cách sử dụng RQ-Dashboard , một ứng dụng Flask nhẹ được sử dụng để theo dõi Hàng đợi Redis. Hãy chạy RQ-Dashboard để theo dõi công việc mà chúng ta vừa tạo.

Trong một Terminal riêng biệt , điều hướng đến thư mục mà bạn đã sao chép repo. Ở đó, sẽ giới thiệu RQ-Dashboard: 
```
$ . env/bin/activate
$ rq-dashboard
RQ Dashboard version 0.5.2
 * Serving Flask app 'rq_dashboard.cli' (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on all addresses.
   WARNING: This is a development server. Do not use it in a production deployment.
 * Running on http://192.168.1.10:9181/ (Press CTRL+C to quit)
192.168.1.10 - - [11/Jun/2021 15:30:12] "GET / HTTP/1.1" 200 -
```
Bạn có thể truy cập RQ-Dashboard tại http: // localhost: 9181 . Khi bạn mở liên kết, bạn sẽ nhận thấy rằng công việc của bạn vẫn đang trong hàng đợi và chưa có bất kỳ worker nào được giao:
![redis-queues-redis-queue-dashboards-01.jpg](https://images.viblo.asia/b361c28b-878a-4dd7-9645-72a980e40822.jpg)
# 5. Redis Queue Workers
Worker chọn một job từ hàng đợi để thực hiện chúng. Trong một Terminal khác (bạn cũng có thể sử dụng Terminal đầu tiên), hãy tạo một worker:
```
$ . env/bin/activate # For new Terminals when you don't install the dependencies locally
$ rq worker --with-scheduler
15:42:38 Worker rq:worker:a33eb6277eda4969921cc8e3f1e857c0: started, version 1.8.1
15:42:38 Subscribing to channel rq:pubsub:a33eb6277eda4969921cc8e3f1e857c0
15:42:38 *** Listening on default...
15:42:38 Trying to acquire locks for default
15:42:38 Cleaning registries for queue: default
15:42:38 Scheduler for default started with PID 1093
15:42:38 default: test_job.i_am_a_job(1) (b92bf928-48dd-4fb9-a551-427866c46a38)
15:42:38 default: Job OK (b92bf928-48dd-4fb9-a551-427866c46a38)
15:42:38 Result is kept for 500 seconds
```
Job bạn gửi đã được thực hiện và kết quả được lưu trong Redis trong 500 giây. Ngoài việc thực hiện job ngay lập tức, các công việc cũng có thể được lên lịch để chạy vào một thời điểm trong tương lai, tương tự như một CRON job . Câu lệnh enqueue có thể được viết như một câu lệnh đã lên lịch bằng cách:
```
job = queue.enqueue_at(datetime(2021, 7, 7, 13, 15), i_am_a_job, 1)
```
Các hoạt động này là cơ sở của việc sử dụng Hàng đợi Redis, giám sát chúng và phân công worker. Bây giờ, chúng ta hãy viết một ứng dụng thực tế nhỏ, tính số lượt truy cập trang.
# 6. Ứng dụng trình diễn hàng đợi Redis - Đếm lượt truy cập trang web

```
from flask import Flask
from redis import Redis
from rq import Queue
from counter import visit

app = Flask(__name__)
q = Queue(connection=Redis())


@app.route('/visit')
def count_visit():
    count = q.enqueue(visit)
    return "Visit has been registered"


@app.route('/')
def return_visit_count():
    count = Redis().get('count').decode('utf-8') if Redis().get('count') else '0'
    return (f'<h1> Congrats! Your are the visitor no.: {count} </h1>')
```
Trong Terminal của bạn , hãy chạy ứng dụng Flask này:

```
$ . env/bin/activate # Unless it's already running
$ flask run
```
Điều này khởi chạy ứng dụng Flask trong app.py. Ứng dụng này có hai router : /và /visit.

Mỗi khi endpoint http://localhost:5000/ lượt truy cập được nhấn, count trong Redis được tăng thêm 1 và trang web sau được trả về.![redis-queues-redis-queue-dashboards-02.jpg](https://images.viblo.asia/8f8890c2-adb9-4de1-99dc-ed447566bbc1.jpg)

Hàm tăng dần được xếp hàng đợi như một công việc. Số lượt truy cập được hiển thị trong điểm cuối: http: // localhost: 5000 dưới dạng:![redis-queues-redis-queue-dashboards-03.jpg](https://images.viblo.asia/838388a4-2393-4b0a-852b-78aef7eda8bd.jpg)

Hãy thử truy cập điểm cuối http://localhost:5000/ lượt truy cập ba lần. Điều này sẽ nộp công việc của chúng tôi ba lần. Sau đó, hãy kiểm tra trạng thái công việc của chúng ta trên RQ-Dashboard. Truy cập http://localhost:9181 và bạn có thể quan sát trang web sau đây nơi các công việc của chúng ta được gửi thành công nhưng không có worker nào xử lý chúng:
![redis-queues-redis-queue-dashboards-04.jpg](https://images.viblo.asia/d46fba21-3676-459a-9fa9-03a9ed1c4894.jpg)

Để khởi động trình lập lịch và worker hàng đợi Redis. Quan sát rằng các job đã gửi đang được thực hiện lần lượt:
```
$ . env/bin/activate # For new Terminals when you don't install the dependencies locally
$ rq worker --with-scheduler
23:40:06 Worker rq:worker:f5a178b0931b42859699ce57696ed402: started, version 1.8.1
23:40:06 Subscribing to channel rq:pubsub:f5a178b0931b42859699ce57696ed402
23:40:06 *** Listening on default...
23:40:06 Trying to acquire locks for default
23:40:06 Cleaning registries for queue: default
23:40:06 Scheduler for default started with PID 2889
23:40:06 default: counter.visit() (d23c4df8-d638-476b-b70a-dbb4b6f091f2)
23:40:06 default: Job OK (d23c4df8-d638-476b-b70a-dbb4b6f091f2)
23:40:06 Result is kept for 500 seconds
23:40:06 default: counter.visit() (f4ca10c4-16f2-4578-b1b7-67dfce3cee5a)
23:40:06 default: Job OK (f4ca10c4-16f2-4578-b1b7-67dfce3cee5a)
23:40:06 Result is kept for 500 seconds
23:40:06 default: counter.visit() (956b7b39-0b82-4ac6-b29e-fe3f0706431e)
23:40:06 default: Job OK (956b7b39-0b82-4ac6-b29e-fe3f0706431e)
23:40:06 Result is kept for 500 seconds
```
Bạn có thể kiểm tra lại bảng điều khiển và bạn có thể thấy rằng các job đã được thực hiện. Bạn có thể kiểm tra điều này bằng cách trỏ tới URL trên trình duyệt của bạn tới http://localhost:9181 . Lưu ý rằng worker hiện đang hoạt động và các công việc đã được xử lý thành công.
![redis-queues-redis-queue-dashboards-05.jpg](https://images.viblo.asia/6d0b376b-71cc-4528-8a69-49474c8e52f5.jpg)
Hãy kiểm tra số lượt truy cập bằng cách mở hoặc làm mới ứng dụng trên http: // localhost: 5000 . Thì đấy! Bộ đếm lượt truy cập trang đã được tăng lên 3.
![redis-queues-redis-queue-dashboards-06.jpg](https://images.viblo.asia/e92678ad-6484-4d9f-80e4-c2c44dab25b1.jpg)

Hãy nghĩ về một trang web có lưu lượng truy cập cao và người ta muốn theo dõi lượt truy cập trang web và lượt truy cập trang. Trong trường hợp này, nhiều phiên bản của API này được phân phát trong bộ cân bằng tải và số lượng được thực hiện dựa trên các job  được gửi trong hàng đợi một cách không đồng bộ.

# 7. Kết luận
Trong bài viết này, chúng tôi đã khám phá tầm quan trọng của hàng đợi job và cách RQ và RQ-Dashboards có thể đóng vai trò như một ngăn xếp hàng đợi job tối giản cho các ứng dụng web của bạn. Ví dụ thực tế có thể được mở rộng sang các ứng dụng trong thế giới thực khác, nơi các khả năng là vô tận.

nguồn: https://stackabuse.com/redis-queues-redis-queue-dashboards/