***Xem thêm*** : [***Công nghệ web và dịch vụ trực tuyến***](https://www.tailieubkhn.com/2021/10/cong-nghe-web-va-dich-vu-truc-tuyen.html)
## Supervisor

Supervisor là một hệ thống client/server được sử dụng để kiểm soát một số những tiến trình cụ thể của hệ điều hành UNIX, cụ thể hơn là các quy trình liên quan tới một dự án hoặc một khách hàng. Ví dụ, bạn có thể sử dụng supervisor để quản lý hàng đợi trong ứng dụng Laravel của bạn.

Các thành phần của supervisor bao gồm: 
- _supervisor_: phần máy chủ của hệ thống
- _supervisorctl_: giao diện dòng lệnh để tương tác với server
- _Web server_: Một giao diện web đơn giản để trực quan hóa một số chức năng cơ bản của _supervisorctl_
- _XML-RPC Interface_: Giống với HTTP server sử dụng bởi web client, _XML-RPC Interface_ có thể được sử dụng để điều khiển các chương trình của _supervisor_

### Install supervisor

```bash
sudo apt-get install supervisor
```

check status: 

```bash
sudo systemctl status supervisor.service
```

### Start supervisor server

Kiểm tra trạng thái của _supervisor_ server: 

```bash
sudo systemctl status supervisor.service
```

![](https://images.viblo.asia/02927e85-0c68-44a6-9aa5-2edafb943692.png)

Tương tự để khởi động, tắt, tạm dừng chúng ta lần lượt thay `status` bằng `enable`, `start`, `stop`, `disable` (xem kỹ hơn [kiểm tra một dịch vụ trên Ubuntu](https://viblo.asia/p/cac-lenh-co-ban-tren-ubuntu-gDVK2OG0ZLj#_kiem-tra-mot-dich-vu-tren-ubuntu-9))

### Thêm một chương trình mới

Các chương trình do _supervisor_ điều khiển phải là các chương trình khác nhau. Mỗi chương trình sẽ được quản lý và khai báo bới 1 file cấu hình độc lập, trong file cấu hình sẽ cấu hình đường dẫn thực thi, một số biến môi trường, các thực hiện trong trường hợp tắt máy, khởi động lại,...

Tệp cấu hình được tạo sẽ được đặt tại thư mục `/etc/supervisor/conf.d/` hoặc nếu bạn không muốn đặt chúng ở đây thì phải khai báo cho supervisor biết đường dẫn file cấu hình của bạn tại phần `[include]` trong file `/etc/supervisor/supervisord.conf`, ví dụ như sau: 

```conf
[include]
files = /etc/supervisor/conf.d/*.conf /home/trannguyenhan/laravel-project/laravel-worker.conf
```

Chúng ta cũng có thể thấy các file đặt trong `/etc/supervisor/conf.d/` được thực hiện vì chúng đã được khai báo mặc định sẵn.

Chi tiết hơn về phần thêm chương trình mình sẽ để tới phần sau chúng ta sẽ đi chi tiết hơn tới ví dụ chạy laravel queue với supervisor.

Sau khi thêm một chương trình mới, chúng ta nên chạy hai lệnh sau, để thông báo cho máy chủ đọc lại các tệp cấu hình và áp dụng bất kỳ thay đổi nào: 

```bash
sudo supervisorctl reread
sudo supervisorctl update
```

## Chạy Laravel queue với supervisor

Như ở phần trên đã nói thì chúng ta sẽ phải tạo 1 file config, trong trường hợp này thì việc tạo file config tại thư mục `/etc/supervisor/conf.d` là rất khó kiểm soát, vì thế chúng ta sẽ tạo ngay 1 file config tại project laravel của chúng ta và dẫn đường dẫn file cấu hình tại `/etc/supervisor/supervisord.conf`.

Tạo một file `laravel-worker.conf` tại thư mục chính của project Laravel: 

```conf
[program:laravel-worker]  
process_name=%(program_name)s_%(process_num)02d  
command=php /home/trannguyenhan/laravel-project/artisan queue:listen --tries=3  
autostart=true  
autorestart=true  
stopasgroup=true  
killasgroup=true  
user=trannguyenhan  
numprocs=1  
redirect_stderr=true  
stdout_logfile=/home/trannguyenhan/laravel-project/storage/logs/worker.log  
stopwaitsecs=30
```

Trong đó: 
- `autostart`: thông báo là chương trình sẽ tự động được khởi động khi _supervisor_ được khởi động
- `autorestart`: nếu chương trình bị tắt vì bất cứ lý do gì, lệnh này sẽ thông báo cho _supervisor_ khởi động lại chương trình
- `stderr_logfile`, `stdout_logfile`: định nghĩa đường dẫn log đầu ra và log lỗi
- `redirect_stderr`: nếu là true thì stderr sẽ bị redirect để xuất vào file chỉ định ở stdout_logfile
- `numprocs`: số lượng tiến trình mà Supervisor sẽ chạy. Ví dụ để gửi mail, ta để numprocs=4, nghĩa là 4 tiến trình cùng chạy task gửi mail.
- Xem thêm các section value khác tại đây: [http://supervisord.org/configuration.html#program-x-section-values](http://supervisord.org/configuration.html#program-x-section-values)

Sau khi cấu hình xong, chúng ta sẽ chạy lại 2 lệnh sau để supervisor đọc lại tệp cấu hình và áp dụng thay đổi: 

```bash
sudo supervisorctl reread
sudo supervisorctl update
```

Sau đó start laravel-worker: 

```bash
sudo supervisorctl start laravel-worker:*
```

Tương tự các lệnh `stop`, `restart` lần lượt để tắt và khởi động lại worker.

Ngoài ra chúng ta cũng có thể sử dụng `superviserctl` để tắt, bật, xem chi tiết các worker.

## Webserver client

Như phần đầu chúng ta nói thì supervisor cung cấp 1 giao diện trực quan sử dụng một số các chức năng cơ bản, ban đầu thì nó không được cấu hình mặc định, để cấu hình webserver client, thêm vào file `/etc/supervisor/supervisord.conf` của bạn dòng sau: 

```conf
[inet_http_server]
port=*:10001
username=trannguyenhan
password=2000
```

Với: 
- `port`: cổng bất kì sao cho không trùng với cổng dịch vụ nào khác đang chạy
- `username` và `passơrd`: thông tin đăng nhập bạn mong muốn khi vào webserver client

Thoát ra, khởi động lại supervisor sau đó truy cập vào cổng bạn đã cấu hình để xem: 

```bash
sudo systemctl restart supervisor.service
```

![](https://images.viblo.asia/40488b13-7bbf-4d31-9213-9c18181d6231.png)

Tìm hiểu thêm chạy supervisor trên docker: [https://docs.docker.com/config/containers/multi-service_container/](https://docs.docker.com/config/containers/multi-service_container/)

Tham khảo: [https://www.vultr.com/](https://www.vultr.com/docs/installing-and-configuring-supervisor-on-ubuntu-16-04), [https://www.digitalocean.com/](https://www.digitalocean.com/community/tutorials/how-to-install-and-manage-supervisor-on-ubuntu-and-debian-vps), [https://youtube.com/](https://youtu.be/T9hfgkKgKOU), [https://viblo.asia/](https://viblo.asia/p/cau-hinh-supervisor-de-chay-laravel-queue-tren-linux-RQqKLoGN57z)