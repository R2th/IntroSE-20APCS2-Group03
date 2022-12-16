![](https://images.viblo.asia/3539a5d0-9040-4c51-b263-b396721886d7.png)
Tiếp tục với loạt bài tìm hiểu và thực hành Docker thì bài hôm nay chúng ta cùng tìm hiểu kiến thức về Network trong docker,  những kiến thức căn bản về tạo quản lý và kết nối network trong docker, cách mà các container kết nối với nhau, cách mà từ máy host truy cập đến container qua các cổng.

bắt tay vào tìm hiểu và thực hành thôi !!!
# Khái niệm và các default Docker Network
### Khái niệm Docker Network

Docker network là nơi sẽ đảm nhiệm nhiệm vụ cho container kết nối vào network 

* Các container cùng một network có thể liên lạc với nhau qua tên của container và cổng (port) được lắng nghe của container trên mạng đó

* Kết nối trên 1 host hoặc nhiều host, 

* Kết nối giữa các cụm (swarm) docker containers. 

* Kết nối container với các mạng khác nằm ngoài docker.

* Có thể cung cấp hầu hết các chức năng mà một hệ thống mạng bình thường cần có.

### Default Networks

Có 3 loại networks được tự động tạo ra trong docker là **bridge, none, host**  ta có thể xem bằng lệnh `docker network ls`

![](https://images.viblo.asia/7bb577ab-ad30-4dbd-8473-a0238c46d089.png)

**bridge** đây là driver mạng mặc định của Docker, bridge là driver phù hợp nhất cho việc giao tiếp các containers độc lập. các container trong cùng mạng có thể giao tiếp với nhau qua địa chỉ IP, nếu không chỉ định driver thì bridge sẽ là driver mạng mặc định khi khởi tạo.

**none**  driver cung cấp cho một container networking stack và không gian mạng riêng của nó, thường được dùng với mạng tùy chỉnh, driver này không thể dùng trong cụm swarm.

**host** dùng khi container cần giao tiếp với host và sử dụng trực tiếp mạng  của máy chủ đang chạy

# Thực hành tạo và quản lý Network
### Tạo kết nối giữa 2 container

  Phần thực hành này chúng ta sẻ tạo ra 2 container và nằm cùng trong một network bridge để cho 2 container này có thể kết nối đến nhau.

1. Tải image busybox: là 1 công cụ nhỏ gọn chứa sẵn các lệnh ubuntu

    `docker pull busybox`

![](https://images.viblo.asia/e2426d52-4047-4150-b897-3c6a6630fda0.png)

2.  Tạo container B1 từ image busybox

    `docker run -it --rm --name B1 busybox`
    
    Thêm tham số --rm để khi ta dừng container thì sẽ tự động xóa container này
    
    Khi tạo xong container B1 thì ta có thể bật 1 terminal khác để kiểm tra network bridge bằng lệnh
    
     `docker network inspect bridge`
 
     Ta thấy B1 đã được kết nối vào mạng này
     
     ![](https://images.viblo.asia/ab26fc50-be22-4a30-b0d0-960d185af3d0.png)
     
     Hoặc có thể kiểm tra một container đang kết nối trong mạng nào bằng lệnh : `docker inspect B1`
     
3. Tạo container B2 từ image busybox tương tự phần tạo container B1

     Khi tạo xong container B2 thì thoát ra ngoài container bằng tổ hợp phím strl + p và strl + q, sau đó chạy lệnh `docker network inspect bridge` để kiểm tra xem các container nào kết nối vào mạng này, ta thấy cả B2 và B1
     
     ![](https://images.viblo.asia/6529c006-bdeb-4eb2-b46c-b43d00fe56d5.png)

4. Thử ping từ B1 sang B2

    Ảnh trên ta thấy B1 có IPV4 là : 172.17.0.2 , B2 có IPV4 là: 172.17.0.3

     Ở terminal nếu đang đứng ngoài B1 thì ta attach vào B1 bằng lệnh `docker attach B1`
 
     Đứng trong container B1 và ping sang B2 băng lệnh `ping 172.17.0.2` , ping thành công vậy là container B1 đã kết nối được với container B2
 
 ![](https://images.viblo.asia/c4ac2c08-15ed-4ae9-b47a-5bca9e2ea4e4.png)
 Tắt các container đã thực hành để tiếp tục thực hành phần tiếp theo

###  Tạo kết nối từ máy host đến container
Phần thực hành này chúng ta sẽ tạo 1 container B3 từ busybox và container này có máy chủ web httpd để chạy file html, container này có cổng ánh xạ  với cổng của máy host để từ máy host có thể truy cập vào máy chủ web trên container busybox này

1: Tạo container B3 và ánh xạ cổng 80 của container này với cổng 8888 của máy host

` docker run -it --name B3 -p 8888:80 busybox`

Bật một terminal khác để kiểm tra các container đang chạy

![](https://images.viblo.asia/50ae773c-9ac6-4934-b447-010ea03c52c5.png)

Tạo xong container B3 và thấy posts được ánh xạ từ cổng 8888 của máy host vào cổng 80 của container, nghĩa là khi ta truy cập cổng 8888 trên máy host chính là truy cập vào cổng 80 của container.

2:  Quay lại terminal của B2 ta vào thư mục var/www và bật máy chủ web httpd lên

![](https://images.viblo.asia/d84ecea7-249a-485c-b06e-04bbf2874964.png)

Sau đó ta tạo file index.html và sửa file này
![](https://images.viblo.asia/896f7e72-25eb-490a-8aac-7b87d92a92cb.png)

![](https://images.viblo.asia/cda33dc5-866f-4a30-9d12-f6770f3c6166.png)

:wq! để lưu và thoát file

3: Từ máy host vào trình duyệt truy cập vào container qua cổng 8888 

![](https://images.viblo.asia/5ff2b42a-0ba1-450e-8d8e-1e94150958bd.png)

Vậy là đã kết nối thành công từ máy host tới container

###  Tạo docker network
Ngoài việc sử dụng các mạng có sẵn thì ta có thể tạo các mạng riêng để các container có thể sử dụng tách biệt với các container đó

1: Tạo network

   `docker network create --driver bridge network1`

   Lệnh trên tạo ra mạng network1 ta kiểm tra bằng lệnh `docker network ls`

2: Xóa network 

   `docker network rm name_network`

3: Tạo container kết nối vào một network được chỉ định

   `docker run -it --name B4 --network network1 busybox`

   Lệnh trên ta tạo một container tên là B4 từ image busybox và có kết nối trong mạng network1 mới tạo ở trên

   kiểm tra bằng lệnh `docker network inspect network1` sẽ thấy có container B4 kết nối
   
4: Kêt nối một container đang chạy với một mạng khác

Ví dụ: ta có 2 network là network1 và network2 có một container B5 đang kết nối với mạng network1 và ta muốn container này kết nối với cả network2 thì ta chạy lệnh

`docker network connect network2 B5`

Lệnh trên là kết nối container B5 vào mạng network2
# Kết bài
Trên đây chúng ta đã tìm hiểu những kiến thức căn bản về tạo và quản lý và kết nối network trong docker. Cùng theo dõi những bài tiếp theo của hành trình chinh phục docker cùng mình nhé. Cảm ơn mn