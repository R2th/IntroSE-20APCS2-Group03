Trong dự án hiện tại của mình khi tới phần scaling hệ thống thì kiến trúc hiện tại theo hướng microservice gặp phải một vấn đề: mọi service trong hệ thống đều tương tác trực tiếp với database nên xảy ra vấn đề càng nhiều service thì càng nhiều kết nối tới database dẫn đến tình trạng xảy ra deadlock, performance cũng rất chậm do các kết nối tới database từ các service phải chờ nhau giải phóng. 

Sau khi được gợi ý về việc chuyển sang dùng hàng đợi thay vì để các service thao tác trực tiếp với database, mình có dành thời gian tìm hiểu thêm về kiến trúc Queue. Do dự án chạy chủ yếu bằng python nên tech lead gợi ý sử dụng Celery, một hệ thống quản lý  queue phổ biến.  

Kiến trúc sau khi chuyển sang sử dụng queue trong hệ thống của mình sẽ như sau. Một bài viết khá chi tiết về một dạng thiết kế queue là message queue mọi người có thể đọc thêm ở [toidicodedao](https://toidicodedao.com/2019/10/08/message-queue-la-gi-ung-dung-microservice/)

![](https://images.viblo.asia/a6998f04-52c1-42ba-94be-d8d12116acba.jpg)

# Về Celery 

- Là một hệ thống quản lý hàng đợi xử lý task thời gian thực. Trong hệ thống Celery chúng ta sẽ sử dụng khái niệm task giống như job ở một số framework khác như Sidekiq.
- Input của celery cần kết nối với một loại message broker còn output có thể kết nối tới một hệ thống backend để lưu trữ kết quả

Mọi người có thể tham khảo một bài viết khác về Celery trên viblo ở [đây](https://viblo.asia/p/gioi-thieu-celery-maGK7mvBlj2). Ngoài ra Celery cũng có một hệ thống document chi tiết và dễ đọc ở trang chủ https://docs.celeryproject.org/en/latest/getting-started/introduction.html.

# Các bài toán nên sử dụng Celery
- Chạy background jobs
- Chạy các job lập lịch 
- Tính toán phân tán 
- Xử lý song song 

# Các chức năng chính Celery cung cấp
- Monitor: giám sát các job/task được đưa vào queue
- Scheduling: chạy các task lập lịch (giống cronjob)
- Workflows: tạo một luồng xử lý task
- Time & Rate Limits: kiểm soát số lượng task được thực thi trong một khoảng thời gian, thời gian một task được chạy,...
- Resource Leak Protection: kiểm soát tài nguyên trong quá trình xử lý task
- User Component: cho phép người dùng tự customize các worker.

# Cơ chế của Celery
- Celery hoạt động dựa trên khái niệm task queue. Đây là  cơ chế queue dùng để điều phối các job/work giữa các máy khác nhau. Các worker sẽ nhận task, chạy task và trả về kết quả.
- Input của queue: 
  - Task
 - Các process trên từng worker sẽ theo dõi queue để thực thi các task mới được đẩy vào queue
- Celery thường dùng một message broker để điều phối task giữa các clients và worker. Để tạo một task mới client sẽ thêm một message vào queue, broker sau đó sẽ chuyển message này tới worker.  Celery hỗ trợ 3 loại broker:
  - RabbitMQ
  - Redis
  - SQS
-  Một hệ thống sử dụng celery có thể có nhiều workers và brokers, nhờ vậy việc  scale theo chiều ngang sẽ rất dễ dàng.

# Các module chính của Celery
## Application
- Một instance được khởi tạo từ thư viện Celery được gọi là application
- Nhiều Celery application có thể cùng tồn tại trong một process
- Khởi tạo một celery application:

	```
	from celery import Celery
	app = Celery()
	```
 - Khi gửi một message tới queue, message đó sẽ chỉ chứa tên của task cần thực thi. 
- Các celery worker sẽ map giữa tên của task với hàm thực thi task đó, việc mapping như vậy được gọi là `task registry`

	```
	@app.task
	def add(x, y):
		return x + y
	```

## Tasks
- Task trong Celery  có hai nhiệm vụ chính: 
  - định nghĩa những gì sẽ xảy ra sau khi một task được gọi (gửi đi message) 
  - định nghĩa những gì sẽ xảy ra khi một worker nhận được message đó
- Mỗi task có một tên riêng không trùng lặp, tên này sẽ được refer trong message để worker có thể tìm được đúng hàm để thực thi. Nếu không định nghĩa tên cho task thì task đó sẽ được tự đặt tên dựa vào module mà task được định nghĩa và tên function của task.
- Các message của task sẽ không bị xóa khỏi queue chừng nào message đó chưa được một worker xử lý. Một worker có thể xử lý nhiều message, nếu worker bị crash mà chưa xử lý hết các message đó thì chúng vẫn có thể được gửi lại tới một worker khác
- Các function của task nên ở trạng thái idempotent: function không gây ra ảnh hưởng gì kể cả khi có bị gọi nhiều lần với cùng một tham số => một task đã thực thi sẽ đảm bảo không bị chạy lại lần nữa.

### Tạo task
- Để tạo task chúng ta dùng decorator `@task`

	```python
	from models import User
	@app.task(name='create_new_user')
	def create_user(username, password):
		User.objects.create(username=username, password=password)
	```
- Để task có thể retry chúng ta có thể bound task vào chính instance của nó
	```python
	@task(bind=True)
	def add(self, x, y):
		logger.info(self.request.id)
	```
- Task cũng có thể kế thừa
	```python
	import celery

	class MyTask(celery.Task):

    	def on_failure(self, exc, task_id, args, kwargs, einfo):
        	print('{0!r} failed: {1!r}'.format(task_id, exc))
	
	@task(base=MyTask)
	def add(x, y):
    		raise KeyError()
	```
- Để biết thêm thông tin và trạng thái của task chúng ta có thể sử dụng `Task.request`
	
	```python
	@app.task(bind=True)
	def dump_context(self, x, y):
    		print('Executing task id {0.id}, args: {0.args!r} kwargs: {0.kwargs!r}'.format(
            		self.request))
	```
- Celery quản lý trạng thái của tasks và có thể lưu chúng trong các hệ thống gọi là result backend. Vòng đời mặc định của task trong Celery gồm:
  - PENDING: task đợi được thực thi. 
  - STARTED: task đã khởi chạy
  - SUCCESS: task đã chạy thành công
  - FAILURE: task gặp lỗi sau khi khởi chạy
  - RETRY: task đang được chạy lại
  - REVOKED: task được thu hồi lại
  - Ngoài các trạng thái mặc định trên chúng ta có thể tự định nghĩa thêm trạng thái và cập nhật trạng thái cho task bằng method `update_state`

	```python
	@app.task(bind=True)
	def upload_files(self, filenames):
    		for i, file in enumerate(filenames):
        		if not self.request.called_directly:
            			self.update_state(state='PROGRESS',
                			meta={'current': i, 'total': len(filenames)})
	```

### Gọi task
- Celery cung cấp các API để gọi task sau khi đã định nghĩa chúng ở trên.
- 3 method chính: 
	- `apply_async`: gửi task message.
	- `delay`: gửi task message 
	-  `calling`: task message sẽ không được gửi đi tới worker mà task sẽ được thực thi luôn bởi process hiện tại.
- Có một task như sau:

	```python
	@app.task
	def add(x, y):
		return x + y
	```
- Để gọi task này chúng ta sẽ thử dùng 2 method là `apply_async` và `delay`
	- Với delay chúng ta sẽ viết như sau:
	
	```python
	# task.delay(arg1, arg2, kwarg1='x', kwarg2='y')
    add.delay(10, 5)
    add.delay(a=10, b=5)
	```
	- Dùng `apply_async` thì phải viết phức tạp hơn một chút

	```python
	# task.apply_async(args=[arg1, arg2], kwargs={'kwarg1': 'x', 'kwarg2': 'y'})
    add.apply_async(queue='low_priority', args=(10, 5))
    add.apply_async(queue='high_priority', kwargs={'a': 10, 'b': 5})
	```
- Về bản chất `delay` và `apply_async` là như nhau nhưng `delay` đã có sẵn các thiết lập mặc định và chúng ta chỉ có thể truyền vào những tham số bắt buộc đã định nghĩa trong function của task, còn  với `apply_async` chúng ta có thể truyền thêm các tham số khác như queue chúng ta muốn gửi message vào,.... Best practice là nên sử dụng `apply_async` để tiện việc config chạy task tùy theo nhu cầu sử dụng.
- Celery hỗ trợ việc gọi task theo dạng chaining, kết quả của task này có thể được truyền vào task tiếp theo

	```
	add.apply_async((2, 2), link=add.s(16)) # 20
	```
	- Nhờ vào cơ chế này chúng ta có thể thiết kế callback cho task như sau
	
	```python
	@app.task
	def error_handler(uuid):
    		result = AsyncResult(uuid)
    		exc = result.get(propagate=False)
    		print('Task {0} raised exception: {1!r}\n{2!r}'.format(
          		uuid, exc, result.traceback))
	```
	
	```python
	add.apply_async((2, 2), link_error=error_handler.s())
	```
    
 # Sử dụng Celery

## Cài đặt

```
pip install -U Celery
```


## Sử dụng
- Lựa chọn loại message broker phù hợp với dự án. Như đã nói ở trên Celery hỗ trợ 3 loại message broker là RabbitMQ, Redis, SQS. Mình sẽ đi sâu vào phân tích từng loại message broker trong phần sau về Celery. 
- Tạo một celery worker với task `add`

	```
	from celery Import Celery
	app = Celery('name of module', broker='url_of_broker')

	@app.task
	def add(x, y):
    		return x + y
	```
- Chạy worker

	```
	$ celery -A tasks worker --loglevel=info
	```
- Gọi task

	```
	>>> from tasks import add
	>>> add.delay(4, 4)
	```

## Lưu kết quả

- Celery có thể lưu lại trạng thái của tasks nếu chúng ta cần theo dõi tasks sau này. Với các hệ thống thực hiện task theo phương thức state machine thì việc hệ thống cần nắm được luồng trạng thái của task là vô cùng quan trọng.

- Các hệ thống celery dùng để lưu trạng thái task:
  - SQLAlchemy
  - Memcached
  - Redis
- Để sử dụng cơ chế lưu kết quả trong Celery chúng ta khai báo celery worker có tham số `backend`. Ở đây mình sử dụng redis cho cả việc lưu kết quả task lẫn làm message broker

	```
 	app = Celery('tasks', backend='redis://localhost', broker='redis://localhost:6379/0')
	```

## Cấu hình Celery
- Cấu hình mặc định cơ bản của celery:

	```
	## Broker settings.
	broker_url = 'redis://localhost:6379/0'

	# List of modules to import when the Celery worker starts.
	imports = ('myapp.tasks',)

	## Using the database to store task state and results.
	result_backend = 'db+sqlite:///results.db'

	task_annotations = {'tasks.add': {'rate_limit': '10/s'}}
	```

- Best practice: tạo một file config riêng cho celery `celeryconfig.py`

	```
	broker_url = 'redis://localhost:6379/0://'
	result_backend = 'rpc://'

	task_serializer = 'json'
	result_serializer = 'json'
	accept_content = ['json']
	timezone = 'Europe/Oslo'
	enable_utc = True
	task_routes = {
    		'tasks.add': 'low-priority',
	} # routing một task tới queue mong muốn
	```
- Ngoài cách tạo file config trên ra chúng ta cũng có thể config trực tiếp bằng application của Celery  `app.conf`
	
	```
	app.conf.update(enable_utc=True, timezone='Europe/London',)
	```

# Tổng kết
- Celery không cần phải config nhiều mà chỉ cần import từ module sử dụng trực tiếp như sau

	```
	from celery Import Celery
	app = Celery('name of module', broker='url_of_broker')
	```
- Worker và client của Celery có thể tự retry 
- Một process của Celery có thể xử lý hàng triệu task trong một phút với độ trễ chỉ vài miligiây
- Celery hỗ trợ:
  -  Message brokers:
     - RabbitMQ
     - Redis
     - SQS
  - Xử lý concurrency
    - multiprocessing
    - multithread 
    - single thread
    - eventlet, gevent 
  - Lưu trữ kết quả trên các hệ thống:
    - Amqp
    - Redis 
    - Memcached
    - SQLAlchemy 
    - Amazon S3
    - File system
   - Serialization
     - json
      - yaml
     
   Ở phần sau bài viết mình sẽ đi sâu hơn về worker trong Celery và hai loại message broker mà Celery hỗ trợ: SQS - Redis, đồng thời dựng một ứng dụng cơ bản sử dụng hệ thống này.
   
 # Tham khảo
 1. https://docs.celeryproject.org/en/latest/
 2. https://viblo.asia/p/gioi-thieu-celery-maGK7mvBlj2
 3. https://pawelzny.com/python/celery/2017/08/14/celery-4-tasks-best-practices/