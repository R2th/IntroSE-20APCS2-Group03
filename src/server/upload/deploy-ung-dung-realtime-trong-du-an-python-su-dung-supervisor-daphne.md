Hiện tại dứ án của mình có một app nhỏ về chat realtime cho user sử dụng, dự án sử dụng python và framework django để phát triển, đối với realtime sử dụng trong python có module channel để hỗ trợ cũng như phát triển chức năng này rất mạnh mẽ. Việc tạo app sử dụng ở local khá đơn giản nhưng việc deploy lên server mình gặp khá nhiều khó khăn trục trặc nên mình sẽ chia sẻ lại một chút kinh nghiệm deploy ở bài viết này  một cách đơn giản nhất:
# 1. Setup
* Về việc tạo app realtime bạn có thể đọc qua tài liệu channel ở đây , khá dễ hiểu : https://channels.readthedocs.io/en/latest/
* Một server đã được cấu hình nginx, redis, uwsgi (https://uwsgi-docs.readthedocs.io/en/latest/ hoặc gunicorn), supervisor (http://supervisord.org/) 
* Daphne :  là một máy chủ giao thức HTTP, HTTP2 và WebSocket cho ASGI và ASGI-HTTP, được phát triển để cung cấp năng lượng cho channels Django. Nó hỗ trợ tự động trao đổi các giao thức; không cần tiền tố URL để xác định điểm cuối WebSocket so với điểm cuối HTTP.
* Cài đặt các thư viện để phục vụ cho chat real time : channels , channels_redis

# 2. Cấu hình 
Cấu hình file settings.py của project 
```
INSTALLED_APPS = [
    # .....
    'channels',
]

ASGI_APPLICATION = "myproject.routing.application"

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': "channels_redis.core.RedisChannelLayer",
        'CONFIG': {
            "hosts": [(env('REDIS_HOST'), 6379)],
        },
    },
}

```
Với REDIS_HOST là server redis bạn sử dụng cho từng loại môi trường (staging hay production)

```
file room.html 
    var chatSocket = new WebSocket(
        'wss://' + window.location.host +
        '/ws/chat/' + roomName + '/');
hoặc 
    var chatSocket = new WebSocket(
        'ws://' + window.location.host +
        '/ws/chat/' + roomName + '/');
```
với để SSL hoặc không SSL:
* wss connects on https only
* ws connects on http

and vice-versa:
 * https accepts wss only
* http accepts ws only

```
với file supervisor
[program:socket-chat]
# Directory where your site's project files are located
directory=/var/www/html/app/myproject

# Each process needs to have a separate socket file, so we use process_num
# Make sure to update "mysite.asgi" to match your project name

command=/var/www/html/app/.env/bin/daphne -b 10.0.1.242 -p 8001 voice.asgi:application

# Number of processes to startup, roughly the number of CPUs you have
numprocs=4

# Automatically start and recover processes
autostart=true
autorestart=true

# Choose where you want your log to go
stdout_logfile=/var/log/supervisor/asgi.log
redirect_stderr=true

# Chmod
chmod=0777
```
Mình cấu hình daphne để trong supervisor như trên . Chỉ cần trỏ Daphne vào ASGI application của bạn và tùy ý đặt địa chỉ liên kết và cổng (mặc định là localhost, cổng 8000) , Vì python server đã chạy cổng 8000 nên mình sẽ chạy vào cổng 8001 để lắng nghe các request liên quan đến websocket, Nếu bạn có ý định chạy daphne phía sau máy chủ proxy, bạn có thể sử dụng  UNIX sockets để liên lạc 
```
command=/var/www/html/app/.env/bin/daphne -u /tmp/daphne%(process_num)d.sock --fd 0 --access-log - --proxy-headers voice.asgi:application
```
nếu chạy daphne thành công bạn có thể thấy như sau:
![](https://images.viblo.asia/195eb437-d850-4b13-8d82-7e1e260d257b.png)
Bây giờ chúng ta cấu hình nginx 
```
upstream daphne_server {
    server ip_server:8001;
}

server {
    location /ws/ {
        proxy_pass http://daphne_server;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_redirect off;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Host $server_name;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
```
với /ws/ sẽ giúp nginx pass về daphne_server