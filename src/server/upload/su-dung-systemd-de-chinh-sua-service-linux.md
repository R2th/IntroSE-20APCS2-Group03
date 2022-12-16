Trong một vài năm gần đây, Linux và các distribution của nó dần chuyển đổi qua việc sử dụng systemd làm init system. Bài viết này sẽ giới thiệu về các command của **systemd** và tạo 1 service và run nó với systemctl.


## Basic Unit Management

Systemd quản lý các **Unit** . Unit có 12 loại khác nhau, nhưng loại thường sử dụng phổ biến nhất là service.

Để quản ly service trong Linux, chúng ta sử dụng tool **systemctl**


**Start service**
```
$ sudo systemctl start nginx.service
```


**Stop service**
```
$ sudo systemctl stop nginx.service
```

**Restart service**
```
$ sudo systemctl restart nginx.service
```

**Reload service**
```
$ sudo systemctl reload nginx.service
```


Mặc định thì các service trong linux không được tự động bật khi start hệ điều hành. Để làm điều đó thì cần phải enable service

```
$ sudo systemctl enable nginx.service
```

Disable service
```
$ sudo systemctl disable nginx.service
```


## Getting an Overview of the System State

Chúng ta có thể xem được thông tin của cá unit với systemctl
- List các units files được systemd list là "active" 

```
$ systemctl list-units
```
io
- List các unit files được load vào memory nhưng hiện tại chưa active
```
$ systemctl list-units --all
```

- List các unit files chưa load vào memory 
```
$ systemctl list-unit-files
```


## Unit States and Logs

Để xem trạng thái của các service unit có thể sử dụng status option của systemctl 

```
systemctl status nginx.service
```

Để xem tất cả các entry nhật kí của unit 
```
$ journalctl -u nginx.service
```

Nếu chỉ muốn list những entries của phiên boot hiện tại, thêm option -b 
```
$ journalctl -b -u nginx.service
```


## Inspecting Units and Unit Files

Hiện tại chúng ta đã biết cách chỉnh state của unit bằng cách start hoặc stop service thông qua systemctl.

Unit file có chứa các parameter mà systemd sử dụng để quản lý và chạy unit.Để xem full thông tin của nó:
```
$ systemctl cat nginx.service
```

Để xem các các unit cần chạy khi khởi đọng nginx 
```
$ systemctl list-dependencies nginx.service
```

show recursive 

```
$ systemctl list-dependencies --all nginx.service
```

Cuối cùng, để xem các thông tin cụ thể low level của unit settings (giá trị của các parameter được quản lý bởi systemd)
```
$ systemctl show nginx.service
```


## Modify unit file

Chúng ta có thể sửa unit file mà ko cần phải vào tận trong thư mục để tìm

Append thêm option vào unit file
```
$ sudo systemctl edit nginx.service
```

Sửa trực tiếp toàn bộ nội dung file

```
$ sudo systemctl edit --full nginx.service
```

Reload lại systemd sau khi sửa

```
$ sudo systemctl daemon-reload
```



## Use Systemd to start service at boot 

Chúng ta sẽ thử tạo 1 custom service, run nó khi boot với systemd

File service sẽ run shell script sau
```shell
test_service.sh

DATE=`date '+%Y-%m-%d %H:%M:%S'`
echo "Example service started at ${DATE}" | systemd-cat -p info

while :
do
echo "Looping...";
sleep 30;
done
```

Copy file script vào thư mục bin 
```
$ sudo cp test_service.sh /usr/bin/test_service.sh
$ sudo chmod +x /usr/bin/test_service.sh
```

Tạo unit file (để xem full các option có thể tham khảo https://www.freedesktop.org/software/systemd/man/systemd.service.html)

```
File: /lib/systemd/system/myservice.service

[Unit]
Description=Example systemd service.

[Service]
Type=simple
ExecStart=/bin/bash /usr/bin/test_service.sh

[Install]
WantedBy=multi-user.target
```

- Start & see status 

```
$ sudo systemctl start myservice
```

```
sudo systemctl status myservice
```

```
  
● myservice.service - Example systemd service.
   Loaded: loaded (/lib/systemd/system/myservice.service; enabled; vendor preset: enabled)
   Active: active (running) since Tue 2018-05-01 18:17:14 UTC; 4s ago
 Main PID: 16266 (bash)
    Tasks: 2
   Memory: 748.0K
      CPU: 4ms
   CGroup: /system.slice/myservice.service
           ├─16266 /bin/bash /usr/bin/test_service.sh
           └─16270 sleep 30

May 01 18:17:14 localhost systemd[1]: Started Example systemd service..
May 01 18:17:14 localhost cat[16269]: Example service started at 2018-05-01 18:17:14
May 01 18:17:14 localhost bash[16266]: Looping...

```

- Enable service on boot
```
$ sudo systemctl enable myservice
```


https://www.linode.com/docs/guides/start-service-at-boot/

https://www.digitalocean.com/community/tutorials/systemd-essentials-working-with-services-units-and-the-journal