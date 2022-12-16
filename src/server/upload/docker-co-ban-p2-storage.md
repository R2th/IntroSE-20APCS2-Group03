Hello guys, sau phần một với kiến thức Docker ở bài viết [Docker cơ bản (P1)](https://viblo.asia/p/docker-co-ban-p1-image-va-container-m68Z0A7XlkG) , mình đã giới thiệu sơ lược về kiến trúc và hai khái niệm cơ bản nhất trong docker đấy là **images**  và **container**, trong phần hai này, chúng ta cùng đến với những kiến thức như Storage, Network. Bắt đầu ngay thôi nào!



# 1. Docker storage

Theo mặc định, tất cả các file được tạo, hay được sinh ra trong quá trình chạy bên trong container  sẽ được lưu trữ trong một layer cho phép ghi dữ liệu những khi container bị xóa đi thì dữ liệu trong đấy sẽ mất hoàn toàn. Và dữ liệu trong container này rất khó chia sẻ với các container khác. Để giải quyết vấn đề dữ liệu khó quản lý từ bên trong docker container qua bên ngoài docker host. Docker đã thiết lập cơ chế lưu trữ dữ liệu và đồng bộ dữ liệu ở bên trong Docker Container và Docker Host đấy là Docker Storage. Từ đó giúp việc quản lý dữ liệu  dễ dàng hơn.


![](https://images.viblo.asia/8392ad44-bd06-4e94-b4a1-c392519768e7.png)

Trong hình là Docker Storage. Với 3 cách lưu dữ liệu đấy là **bind mount**, **volume** và **tmpfs mount**. Giải thích dưới đây mình đọc được từ trang chủ của docker: https://docs.docker.com/storage/

- **Volumes** : được lưu trữ trong host trên linux có đường dẫn : ```var/lib/docker/volumes/``` và được quản lý bởi Docker. Những tiến trình không phải Docker sẽ không làm thay đổi được những file này.
- **Bind mounts** : có thể được lưu trữ ở bất kỳ đâu trong máy host.  Những tiến trình không phải từ Docker vẫn có thể thay đổi dữ liệu trong này bất kỳ khi nào. (vd chúng ta có thể code từ máy host và khi mount thì trong docker những dữ liệu đấy sẽ được đồng bộ)
- **tmpfs mounts** được lưu trữ trong  memory (vì vậy khi docker khởi động lại hay dừng container thì dữ liệu trong đây sẽ mất đi)

Đi vào chi tiết hơn với từng cách mount storage chúng ta có :
### 1.1 **Volumes** 
sẽ được tạo và quản lý bởi docker. Để tạo một volume, rất đơn giản chúng ta sử dụng : ```docker volume create```. 

Example: 
   ```bash
   $ docker volume create new_volume
   new_volume
   ```
   Chúng ta vừa tạo ra một volume, bây giờ để kiểm tra xem volume này đã chắc chắn tạo hay chưa sử dụng lệnh : 
   ```bash
   $ docker volume ls -f "name=new_volume" 
   
    // -f là tag để filter và phía sau sẽ là thuộc tính cần filte ở đây mình filter theo name là new_volume
   ```
   kết quả trả về như hình dưới là chúng ta đã tạo thành công 1 volume
![](https://images.viblo.asia/ec7b7ff8-fd79-44fc-bd48-3dab064951c9.png)

Bây giờ chúng ta có thể mount volume này với container, việc này có hơi giống so với cách sử dụng **bind mounts** tuy nhiên điểm khác biệt lớn nhất đấy chính là Docker sẽ quản lý **Volumes**  và volume trong dockers sẽ quản lý tách biệt so với máy chủ. 

Vì vậy Volume được sử dụng khi chúng ta cần đồng bộ dữ liệu giữa các container đang chạy với nhau hay backup, khôi phục dữ liệu, và không cần thiết thay đổi từ bên phía máy host. Ví dụ như trường hợp chúng ta cần backup di chuyển dữ liệu từ  máy host này sang máy host khác vì cùng chung vào volume nên việc quản lý thuận tiện hơn.

**Thực hành**:  với  volume vừa tạo, mình có một image ubuntu có sẵn, giờ sẽ mount ```new_volume``` với một thư mục bất kỳ trong container ubuntu này (mình sẽ mount vào /opt/new_volume  nhé). 
    
   Sử dụng lệnh: 
   ```bash
   $ docker run -itd --name=ubuntu1 -v new-volume:/opt/new_volume/ ubuntu
   ```
   Tiếp theo test thử xem bên trong container và tạo một file test bên trong /opt/new_volume
   ```bash
   $ docker exec -it ubuntu1 bin/bash
   $ cd /opt/new_volume
   $ touch test.txt
   ```
   
   Chúng ta cùng tìm đường dẫn tới volume new-volume của docker:
  ```bash
  $ docker volume inspect new-volume
  [
    {
        "CreatedAt": "2021-05-07T14:58:11+07:00",
        "Driver": "local",
        "Labels": null,
        "Mountpoint": "/var/lib/docker/volumes/new-volume/_data",
        "Name": "new-volume",
        "Options": null,
        "Scope": "local"
    }
]

  ```
  
 Mountpoint chính là thư mục của Volume, ngoài máy host chúng ta vào đường dẫn trên : 
 ```bash
 $ cd /var/lib/docker/volumes/new-volume/_data
 $ ls
 test.txt
 ```
   Như vậy chúng ta đã tạo một volume trong docker và thực hiện mount thành công container với volume đó.
   
###  1.2  Bind mounts :

Bind mounts cũng có những đặc điểm giống volumes, tuy nhiên bind mounts cũng có nhiều chức năng hạn chế so với volumes. Khi sử dụng bind mount, tệp tin hoặc thư mục trên máy chủ sẽ được mount vào trong container. Tệp tin hoặc thư mục được mount qua đường dẫn tuyệt đối trên máy chủ và phụ thuộc vào đường dẫn đó. 

Với bind mounts chúng ta có 2 tùy chọn là flag -v hoặc --mount. Mình sẽ giải thích rõ ở phía bên dưới:
- -v hoặc --volume: 

```bash
$ docker run -itd --name=ubuntu1 -v ~/Documents/host_folder/:/opt/mounted_folder ubuntu
```

Như câu lệnh trên : mình sử dụng ``` ~/Documents/host_folder/:/opt/mounted_folder ``` để khai báo folder cần mount. Với phía trước dấu ```:``` là thư mục ở máy host (máy thật) và phía sau là thư mục mount vào trong container. Flag ```-v``` sẽ giúp chúng ta tạo folder nếu phía máy host chưa có folder. 

- --mount: 

```bash
$ docker run -itd --name=ubuntu1 --mount type=bind,source="$(pwd)"/host_folder,target=/opt/mounted_folder ubuntu

docker: Error response from daemon: invalid mount config for type "bind": bind source path does not exist: /home/pham.viet.hieu/Documents/host_folder.
See 'docker run --help'.
```
Trong câu lệnh trên bị lỗi vì chúng ta chưa có folder cần binding ở phía máy host vì vậy chúng ta cần phải tạo thêm folder ```host_folder``` để không bị lỗi khi sử dụng --mount.

```bash
$ mkdir host_folder
$ docker run -itd --name=ubuntu1 --mount type=bind,source="$(pwd)"/host_folder,target=/opt/mounted_folder ubuntu

224a2a4aab538727fc30104aa7cedfda06e8eeed3f1c86d0678edf0c989eb50e
```


Như vậy chúng ta sẽ không gặp lỗi trên nữa. 

Inspect container thử nhé: 
```bash
$ docker inspect ubuntu1
    ...
    "Mounts": [
        {
            "Type": "bind",
            "Source": "/home/pham.viet.hieu/Documents/host_folder",
            "Destination": "/opt/mounted_folder",
            "Mode": "",
            "RW": true,
            "Propagation": "rprivate"
        }
    ],
    ...
```

Tóm lại câu lệnh trên gồm : Type là cách mount, như đầu bài mình đã có 3 cách là volumes, bind mounts, tmpfs thì cũng tương ứng giá trị đấy là ```volume```, ```bind```, ```tmpfs``` ở phần này chúng ta sử dụng bind mount vì vậy mình sử dụng ```type=bind```.
Với bind mounts chúng ta còn nhiều tùy chọn khác như readonly để thư mục mount vào container chỉ có quyền đọc, destination, dst hoặc target, có thể dùng 3 fields trên, ở câu lệnh của mình đã sử dụng ```target``` mục đích chính là trỏ vào folder cần mount bên trong container. Ngoài ra các bạn có thể đọc thêm một vài tùy chọn ở trang chủ của docker.

### 1.3 tmpfs mounts: 
Với tmpfs mounts sử dụng khi bạn không muốn lưu lại bất kì data gì trên docker host hay container. Bởi vì khi sử dụng tmpfs mount mỗi khi restart, stop container sẽ mất hoàn toàn tmpfs mount hay file hoặc thư mục trong đó.

```bash
$ docker run -itd --name=ubuntu1 --mount type=tmpfs,destination=/opt/mounted_folder ubuntu

hoặc

$ docker run -itd --name=ubuntu1 --tmpfs /opt/mounted_folder ubuntu

```

Nhớ lưu ý khi chúng ta stop hoặc restart container sẽ mất dữ liệu ở trong này. 


# 2. Docker networks:
-- To be continue ...
# 3. Tổng kết:
Như vậy với phần 2 này mình đã giới thiệu cũng như giải thích rõ về Docker storage. Với storage hi vọng mọi người có thể sử dụng được trong công việc của mình. Docker storage cũng rất quan trọng trong quá trình chúng ta phát triển ứng dụng, lựa chọn cách thích hợp để mount volume và đặt vị trí lưu ứng dụng của mình. Cảm ơn mọi người đã theo dõi bài viết, hẹn gặp lại mọi người vào bài viết tiếp theo về chủ đề Docker. Nếu thấy hữu ích thì ấn upvote nhé. Many thanks !