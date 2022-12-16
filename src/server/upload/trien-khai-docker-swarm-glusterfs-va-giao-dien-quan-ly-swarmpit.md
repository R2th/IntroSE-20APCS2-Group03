### 1. Giới thiệu Docker Swarm, Glusterfs, swarmpit.
Như các bạn đã biết Docker Swarm là công cụ native clustering cho Docker. Cho phép ta có thể gom một số Docker host lại với nhau thành dạng cụm (cluster) và ta có xem nó như một máy chủ Docker ảo (virtual Docker host) duy nhất. ... Và Swarm mode cung cấp cho ta các tính năng để quản lý và điều phối cluster.

Glusterfs là gì?
Khi các hệ thống lưu trữ ngày càng trở nên rộng lớn, thách thực được đặt ra là làm sao để nó vận hành được tối ưu và dễ dàng mở rộng thêm hơn nữa. Hãy tưởng tượng giờ ta có khoảng 10TB dung lượng lưu trữ trên một server storage, ở đó các các client kết nối vào, tất cả các hoạt động đọc ghi được thực hiện trên server lưu trữ này. Giả sử đến một thời điểm nào đó, tất cả các hoạt động đọc ghi trên server storage này đều đã quá tải, ta lại có một server tương tự đã chuẩn bị sẵn. Vậy cách nào để ghép thêm server storage mới này vào hoạt động cùng server storage cũ và chia sẻ tải I/O của nó. Đó là lúc ta cần đến Glusterfs.

Còn về swarmpit là giao diện quản lý và vận hành cụm Docker Swarm.
Bây giờ mình sẽ giới thiệu đến các bạn sự kết hợp của 3 thằng này nhé.
### 2.Môi trường
Đầu tiên chúng ta cần chuẩn bị 3 server có thể kết nối local với nhau (Cùng chung 1 mạng nội bộ) và có dung lượng ổ cứng giống nhau  thì càng thuận lợi cho việc triển khai nhé.
3 server của mình có IP local lần lượt là 10.20.12.5, 10.20.12.9, 10.20.12.10.
Mình dùng server có hệ điều hành là ubuntu 18.04.3
### 3. Cài đặt docker swarm
Việc đầu tiên cần làm là cài đặt docker lên cả 3 server này: 

```
apt upgrade
apt install docker.io
```

Sau đó chúng ta tạo docker swarm
Chúng ta sẽ chọn 1 server làm manager. 
Trên manager chúng ta chạy : 
```
docker swarm init --advertise-addr 10.20.12.5
```
Lấy token để các node khác join swarm
```
docker swarm join-token manager 
```
![image.png](https://images.viblo.asia/4341afde-ff04-4ba8-92b4-1fa88f0419a4.png)
Join node vào swarm : 
```
docker swarm join --token SWMTKN-1-3vu5n3owvvrjycif60ywcf92wdoyu8exkb3r1t03ojd3cv2l97-52shxw6lj4pqw9auh6hkc1h3e 10.20.12.5:2377
```

Chúng ta đã hoàn thành việc cài đặt xong 1 khối docker swarm
![image.png](https://images.viblo.asia/d4ec47eb-244e-485f-be21-42654c725492.png)
### 4. Cài đặt swampit
Tiếp theo chúng ta cài đặt swarmpit trên 1 trong 3 server theo link : https://swarmpit.io/
```
docker run -it --rm \
  --name swarmpit-installer \
  --volume /var/run/docker.sock:/var/run/docker.sock \
swarmpit/install:1.9
```
Các bạn nhớ ghi lại user và password khi cái đặt swarmpit để có thể đăng nhập trên web để quản lý nhé.

### 5.Cài đặt glusterfs
Cấu hình file /etc/host trên các server
vi /etc/host
![image.png](https://images.viblo.asia/0e30056d-eed8-4f8e-b026-e1ab698f0fcc.png)
Cài đặt glusterfs
```
apt install glusterfs-server glusterfs-common glusterfs-client -y
systemctl enable glusterd
systemctl start glusterd
```
Cấu hình cluster
- Tại gluster01:
```
gluster peer probe gluster02
gluster peer probe gluster03
Kiểm tra:
gluster peer status
```
![image.png](https://images.viblo.asia/96a0e4b6-f09a-4453-a6e2-d645bebf5748.png)

Cấu hình storage
Tạo thư mục trên các node:
```
mkdir -p /mnt/gfs-brick
```
Tạo volume tên là data, tại gluster01: 
```
gluster volume create data replica 3 transport tcp gluster01:/mnt/gfs-brick gluster02:/mnt/gfs-brick gluster03:/mnt/gfs-brick force
gluster volume status data
```
Kiểm tra
gluster volume status data
![image.png](https://images.viblo.asia/cea43746-d2bc-4cda-aeae-bd93b0b0ffe0.png)

Tại gluster02 và gluster03:
```
mkdir -p /mnt/data
mount -t glusterfs localhost:/data /mnt/data
df -h
umount /mnt/data
```
Tạo file trên gluster01, gluster02, gluster03:
vi /lib/systemd/system/mnt-data.mount
[Unit]
Description=GlusterFS mount
Requires=glusterd.service
After=glusterd.service

[Mount]
What=localhost:/data
Where=/mnt/data
Type=glusterfs
Options=defaults,_netdev 

[Install]
WantedBy=multi-user.target

![image.png](https://images.viblo.asia/22ea19ed-0c67-4743-b22c-e67315c95a63.png)

- Start mount data
```
systemctl daemon-reload
systemctl start mnt-data.mount
systemctl enable mnt-data.mount
```
### 5.Kiểm tra thành quả
Chúng ta đã hoàn thành việc triển khai docker swarm và glusterfs. Có thể vào giao diện quản lý swarmpit để quản lý các node và container.
Chúng ta mở trình duyệt và vào link :http://ipswarmpit:888
ipswarmpit là IP của server mà chúng ta đã cài swarmpit.
Giao diện đăng nhập như sau:

![image.png](https://images.viblo.asia/75726650-fde3-456a-a4fa-381eb31bf2b2.png)

Tại đây chúng ta có thể kiểm tra các node hiện đang có trong swarm: 
![image.png](https://images.viblo.asia/ee6c8aac-81d6-4e52-9625-30537e108d6a.png)

Chúng ta cũng có thể triển khai các service hay container khác: 
![image.png](https://images.viblo.asia/ec32d361-75b1-4a7f-bc13-8a3ccec50687.png)
![image.png](https://images.viblo.asia/5da54f74-e253-48b4-9b7d-a6f21c1fd299.png)
Mong rằng bài viết này sẽ hữu ích cho các bạn.