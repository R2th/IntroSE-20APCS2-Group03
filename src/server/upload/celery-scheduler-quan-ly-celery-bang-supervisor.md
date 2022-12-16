Celery là một thư viện rất mạnh được viết băng Python với mục đích để quản lý Task, Job và Worker, đang được áp dụng trong rất nhiều các project trên production.
Về cách thức áp dụng Celery với Django các bạn có thể tham khảo bài viết chi tiết tại đây: https://viblo.asia/p/su-dung-django-ket-hop-cung-celery-GrLZDwzwKk0

Trong phạm vi bài viết này, chúng ta sẽ tìm hiểu cách sử dụng Supervisor để quản lý 3 running component: Celerybeat, Celery worker và Redis trong một ứng dụng Celery.

Với Supervisor, chúng ta có thể quản lý, full control các process running bằng Redis, Celerybeat và Celery worker thông qua việc sử dụng Interface.
Nói một cách khác, chúng ta có thể chạy các service này mà không cần sử dụng terminal hoặc restart lại các service đó khi gặp crash, trong mọi trường hợp Supervisor sẽ có nhiệm vụ quản lý giúp bạn bằng cách sử dụng config.

# Cài đặt Supervisor (Ubuntu)
```
sudo apt-get install -y supervisor
```

# Activate virtualenv và cài đặt supervisor
```
source ~/.virtualenvs/celery_env/bin/activate
pip install supervisor==3.3.3
```

Supervisor hoạt động bằng việc execute các service thông qua file cấu hình. Các file cấu hình này sẽ chỉ thị Supervisor chạy như thế nào, biến môi trường truyền vào thế nào và cần output ra nội dung gì sau khi chạy.

Tất cả các service chạy bên dưới Supervisor phải được chạy ở dạng non-daemon mode ( có thể hiều là sau khi chạy command đó phải nhấn Ctrl+C thì mới tắt được)

# Tạo folder cấu hình supervisor
```
cd ~/celery-scheduler
mkdir configs
cd configs
mkdir conf.d
```

Ở cmd trên, chúng ta tạo 1 file main config cho supervisor. Điểm chính cần chú ý là cần phải chỉ định log file được lưu ở đâu ( /var/log/supervisor) và path đến các file cấu hình này ( `~/celery-scheduler/configs/conf.d/*.conf`) 

```
; ==================================
;  supervisor config file
; ==================================

[unix_http_server]
file=/var/run/supervisor.sock   ; (the path to the socket file)

[supervisord]
logfile=/var/log/supervisor/supervisord.log ; (main log file;default $CWD/supervisord.log)
pidfile=/var/run/supervisord.pid            ; (supervisord pidfile;default supervisord.pid)
childlogdir=/var/log/supervisor             ; ('AUTO' child log dir, default $TEMP)

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[supervisorctl]
serverurl=unix:///var/run/supervisor.sock ; use a unix:// URL  for a unix socket

[include]
files = /etc/supervisor/conf.d/*.conf
```

## Program configurations

Để Supervisor biết service nào bạn muốn control và làm thế nào để chạy service đó, bạn phải viết một cấu hình tương tự như sau.
```
[program:hello_world]
command=/bin/hello_word.sh
```

Trong trường hợp này, chúng ta đang cần cấu hình chạy 3 service Celerybeat, Celery worker và Redis, vì thế cần phải tạo các file cấu hình cần thiết và đưa vào thư mục `configs/conf.d`:
```
mkdir conf.d
cd conf.d
```

Lưu lại file cấu hình dưới đây vào thư mục `~/celery-scheduler/configs/conf.d/`

1. `redis.conf`

```
; ================================
;  redis supervisor
; ================================

[program:redis]
command=/path/to/celery-scheduler/redis-3.2.1/src/redis-server
directory=/path/to/celery-scheduler/redis-3.2.1

user=root
numprocs=1
stdout_logfile=/var/log/redis/redis.log
stderr_logfile=/var/log/redis/redis_err.log
autostart=true
autorestart=true
startsecs=10

; Causes supervisor to send the termination signal (SIGTERM) to the whole process group.
stopasgroup=true

; if rabbitmq is supervised, set its priority higher
; so it starts first
priority=998
```

2. `celerybeatd.conf`

```
; ================================
;  celery beat supervisor
; ================================

[program:celerybeat]
command=/path/to/home/.virtualenvs/celery_env/bin/celery beat -A app.celery --schedule=/tmp/celerybeat-schedule --loglevel=INFO --pidfile=/tmp/celerybeat.pid
directory=/path/to/home/celery-scheduler

user=root
numprocs=1
stdout_logfile=/var/log/celery/beat.log
stderr_logfile=/var/log/celery/beat.log
autostart=true
autorestart=true
startsecs=10

; Causes supervisor to send the termination signal (SIGTERM) to the whole process group.
stopasgroup=true

; if rabbitmq is supervised, set its priority higher
; so it starts first
priority=999
```

3. `celeryd.conf`

```
; ==================================
;  celery worker supervisor
; ==================================

[program:celery]
command=/path/to/home/.virtualenvs/celery_env/bin/celery worker -A app.celery --loglevel=INFO
directory=/path/to/home/celery-scheduler

user=root
numprocs=1
stdout_logfile=/var/log/celery/worker.log
stderr_logfile=/var/log/celery/worker.log
autostart=true
autorestart=true
startsecs=10

; Need to wait for currently executing tasks to finish at shutdown.
; Increase this if you have very long running tasks.
stopwaitsecs = 600

; Causes supervisor to send the termination signal (SIGTERM) to the whole process group.
stopasgroup=true

; Set Celery priority higher than default (999)
; so, if rabbitmq is supervised, it will start first.
priority=1000
```

Có thêm 1 điểm chú ý là tất cả các đường dẫn (path) trong file cấu hình tại supervisor đều phải sử dụng absolute path. Ví du như ở trên, đường dẫn đến thư mục bin của virtualenv là `/path/to/home/.virtualenvs/celery_env/bin`

Sau khi hoàn thành xong 3 file cấu hình trên, copy chúng vào thư mục `/etc/supervisor/conf.d/*.conf` vì supervisor sẽ đọc từ thư mục này!

```
# Copy supervisor.conf to /etc/supervisor
sudo mkdir /etc/supervisor/
cp ~/celery-scheduler/configs/supervisord.conf /etc/supervisor/

# Copy program configs to /etc/supervisor/conf.d
sudo mkdir /etc/supervisor/conf.d/
cp ~/celery-scheduler/configs/conf.d/*.conf /etc/supervisor/conf.d/
```

Ở step cuối cùng, chúng ta tạo ra các thư mục log cho các service theo các command dưới đây:
```
sudo mkdir /var/log/supervisor
sudo mkdir /var/log/celery
sudo mkdir /var/log/redis
```

Start supervisord bằng cách sử dụng command 
```
supervisord -c /etc/supervisor/supervisord.conf
```

### Check process status
Để kiểm tra supervisor đã hoạt động chưa, thì chỉ cần chạy command, ouput có thể view được danh sách trạng thái các process:
```
supervisorctl status
```
hoặc sử dụng command:  `px aux`
```
USER PID %CPU %MEM VSZ RSS TTY STAT START TIME COMMAND
 root 1 0.0 2.5 56492 12728 ? Ss Oct21 0:05 /usr/bin/python /usr/bin/supervisord — nodaemon
 root 7 0.0 0.5 31468 2616 ? Sl Oct21 0:30 /home/ubuntu/celery-scheduler/redis-3.2.1/src/redis-server *:6379
 root 8 0.0 8.3 98060 41404 ? S Oct21 0:00 /home/ubuntu/.virtualenvs/celery_env/bin/python2.7 /home/ubuntu/.virtualenvs/celery_env/bin/celery beat -A ap
 root 9 0.1 8.4 91652 41900 ? S Oct21 0:42 /home/ubuntu/.virtualenvs/celery_env/bin/python2.7 /home/ubuntu/.virtualenvs/celery_env/bin/celery worker -A
 root 20 0.0 9.3 99540 46820 ? S Oct21 0:00 /home/ubuntu/.virtualenvs/celery_env/bin/python2.7 /home/ubuntu/.virtualenvs/celery_env/bin/celery worker -A
 ```
 
### Check the program logs
```
tailf /var/log/redis/redis.log
tailf /var/log/celery/beat.log
tailf /var/log/celery/worker.log
tailf /var/log/supervisor/supervisord.log
```

Ví dụ output của command: `tail -f /var/log/celery/worker.log`

**Output:**
```
[2017–10–22 03:18:00,050: INFO/MainProcess] Received task: app.tasks.test.print_hello[aa1b7700–1665–4751-ada2–35aba5670d40]
[2017–10–22 03:18:00,051: INFO/ForkPoolWorker-1] app.tasks.test.print_hello[aa1b7700–1665–4751-ada2–35aba5670d40]: Hello
[2017–10–22 03:18:00,052: INFO/ForkPoolWorker-1] Task app.tasks.test.print_hello[aa1b7700–1665–4751-ada2–35aba5670d40] succeeded in 0.000455291003163s: None
```
Nếu triển khai thành công, supervisor log sẽ như sau:
```
INFO success: redis entered RUNNING state, process has stayed up for > than 10 seconds (startsecs)
INFO success: celerybeat entered RUNNING state, process has stayed up for > than 10 seconds (startsecs)
INFO success: celery entered RUNNING state, process has stayed up for > than 10 seconds (startsecs)
 ```

Trên đây là toàn bộ cách cấuhinhf để Celery app có thể fully managed bởi Supervisor.

Tham khảo: 
- https://medium.com/@channeng/celery-scheduler-part-2-managing-celery-with-supervisor-2a0c6e7f7a6e