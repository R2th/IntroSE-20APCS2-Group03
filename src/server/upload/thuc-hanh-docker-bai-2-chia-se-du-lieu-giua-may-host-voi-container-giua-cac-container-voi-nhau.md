![](https://images.viblo.asia/10a45775-09ef-4248-995c-df7860fbc342.jpg)


Xin chào mọi người tiếp tục bài 2 series thực hành Docker nay chúng ta cùng tìm hiểu và thực hành với các nội dung về việc chia sẻ dữ liệu trong docker.

Chia sẻ dữ liệu trong docker là gì: chia sẻ dữ liệu trong docker là khi những dữ liệu được sử dụng ở nhiều nơi, nhiều container hoặc dữ liệu lưu trên máy host nhưng các container muốn sử dụng và sửa đổi chúng thì chúng ta sẽ chia sẻ dữ liệu đó cho các container có quyền thao tác.

Ví dụ: ta có 2 file File1.txt và File2.txt lưu trên máy host và có 3 container là container_1 container_2 và container_3, ta chia sẻ các file này cho cả 3 container đó sử dụng  thì đó chính là việc chia sẻ dữ liệu trong docker
# Chia sẻ dữ liệu giữa máy host và container
Ở phần thực hành này chúng ta sẽ tạo ra thư mục data bên trong có file hello.txt trên máy host và chia sẻ thư mục này với container
### 1. Tạo dữ liệu trên máy host

Ta tạo thư mục data tại desktop và có chứa file hello.txt

![](https://images.viblo.asia/4bdba314-c57f-4ef1-9096-9f6f48fcb9eb.png)
Dùng lệnh pwd thì ta lấy được đường dẫn đến thư mục này là : /home/nguyen.van.thinhb/Desktop/data
### 2. Chia sẻ thư mục data vừa tạo mới 1 container
Ta sẽ tạo một container từ image ubuntu và nhận dữ liệu chia sẻ là thư mục data của máy  host bằng lệnh
```
docker run -it -v /home/nguyen.van.thinhb/Desktop/data:/home/data_container ubuntu
```

Để chia sẻ dữ liệu giữa máy host và container thì ta thêm vào tham số **-v**

Để container có thể nhận tương tác và có kết nối với terminal thì thêm tham số **-it**

**/home/nguyen.van.thinhb/Desktop/data** : là đường dẫn đến thư mục chứa dữ liệu trên máy host để chia sẻ (ta vừa dùng lệnh pwd ở trên để lấy đường dẫn này)

**/home/data_container** là đường dẫn đến thư mục chưá dữ liệu trên container

**ubuntu** là image ubuntu dùng để tạo ra container

Sau khi chạy lệnh trên ta đã tạo ra 1 container từ image ubuntu và đang đứng trong terminal của container đó, cd vào thư mục home sẽ thấy thư mục data_container và có file hello.txt => dữ liệu đã được chia sẻ từ máy host vào container

Dữ liệu giữa 2 thư mục này được map với nhau, nếu container lưu dữ liệu vào thư mục này thì cũng lưu trên host, khi xóa container thì dữ liệu vẫn được lưu trên máy host
![](https://images.viblo.asia/7b1061f8-7426-4b5d-b73c-7adbea86c11d.png)

# Chia sẻ dữ liệu giữa 2 container
Bài toán: ta có thư mục data ở máy host và muốn chia sẻ thư mục này cho container_1 sử dụng, đồng thời ta cũng chia sẻ thư mục này cho container_2 sử dụng.

Ở đây ta tiếp tục sự dụng phần vừa thực hành trên (chia sẻ dữ liệu giữa máy host và container), ta đã có thư mục data ở máy host và đã chia sẻ cho 1 container như trên.

Tiếp theo ta sẽ tạo một container nữa và được chia sẻ dữ liệu từ container cũ

Vẫn ở trong container cũ ta nhấn tổ hợp phím Ctrl + p  và  Ctrl + q để thoát ra ngoài container nhưng vẫn chạy container đó 

chạy lệnh `docker ps` sẽ thấy container đó vẫn đang chạy.

![](https://images.viblo.asia/ce2a6d55-1c4a-414e-9e41-6f00210c84da.png)

Giờ ta sẽ tạo một container mới được chia sẻ dữ liệu từ thư mục data_container của container tạo trước đó bằng lệnh
```
docker run -it --name C2 --volumes-from b7cf8479548f ubuntu
```
Lệnh trên ta tạo container có tên là C2 từ image ubuntu và được chia sẻ dữ liệu từ container có Id là b7cf8479548f (container tạo trước đó)

chạy xong lệnh trên thì ta đang đứng trong container C2 vừa tạo, cd vào thư mục home sẽ thấy thư mục data_container được chia sẻ

![](https://images.viblo.asia/dc2e8ef4-5007-446a-806e-a09b7bab40d1.png)





# Tạo và quản lý ổ đĩa (volume), để chia sẻ dữ liệu các ổ đĩa cho các container
Ngoài cách chia sẻ dự liệu giữa máy host với các container thì trong docker còn cho phép chúng ta có thể chia sẻ dữ liệu thông qua tạo và quản lý ổ đĩa, những ổ đĩa được tạo ra và gán vào các container, khi container bị xóa thì các ổ đĩa vần còn tồn tại chúng chỉ mất đi khi ta xóa các ổ đĩa
### 1: Tạo ổ đĩa
Trước hết ta có lệnh `docker volume ls` để xem danh sách các ổ đĩa

Ở đây mình có nhiều ổ đĩa sẵn đang sử dụng
![](https://images.viblo.asia/a0315b31-2bb5-40b5-ae37-239b0817fecf.png)

Để tạo ổ đĩa tên là D1 ta dùng lệnh: `docker volume create D1`

Kiểm tra thông tin 1 ổ đĩa: `docker volume inspect D1`

Xóa ổ đĩa : `docker volume rm [Ten]`

![](https://images.viblo.asia/c0d24cf9-c9eb-4b86-a823-a2c6b741138c.png)
### 2: Gán ổ đĩa vào container
Ta đã tạo ra ổ đĩa D1 giờ chúng ta sẽ tạo 1 container và gán ổ đĩa D1 vào container đó để contaner có thể sử dụng ổ đĩa D1 bằng lệnh sau

`docker run -it --name container1 --mount source=D1,target=/home/disk2 ubuntu`


Lệnh trên là ta tạo container nên là container1

Tham số --mount là để gán thêm ổ đĩa khi tạo container

source=D1 là tham số ổ đĩa cần gán vào container

target=/home/disk2 với /home/disk2 là thư mục ánh xạ ổ đĩa D1 vào container
![](https://images.viblo.asia/19627cd1-13af-4a9e-8d0d-231ea8bdb59e.png)

Ta thoát và xóa container đó đi  thì ổ đĩa vẫn còn

![](https://images.viblo.asia/1d5f1c07-1fca-4b9d-a0f9-104fc9949497.png)


### 3: Tạo ổ đĩa ánh xạ lên một foder trên máy host
Ta muốn tạo một ổ đĩa D2 ánh xạ cố định lên một folder có sẵn trên máy host bằng lệnh

`docker volume create --opt device=/home/nguyen.van.thinhb/Desktop/data/ --opt type=none --opt o=bind D2`

Tham số thứ nhất `--opt device=/home/nguyen.van.thinhb/Desktop/data/ ` là đường dẫn đến thư mục trên máy host

Tham số thứ 2 type=none

Ổ đĩa D2 đã được tạo và ánh xạ vơi thư mục trên máy host, ta có thể kiểm tra ổ đĩa bằng lệnh `docker volume inspect D2`

![](https://images.viblo.asia/226a68d0-696e-4105-8ff7-7240a82a7c71.png)

### 4: tạo container kèm gán ổ đĩa ánh xạ trên local

`docker run -it --name=container3 -v D2:/home/disk ubuntu`

Lệnh trên tạo container tên là container3 từ image ubuntu, có gán ổ đĩa D2 vào đường dẫn /home/disk trên container3, D2 được tạo ánh xa với 1 foder trên máy host  ở phần trên
![](https://images.viblo.asia/dba26307-280f-487e-aeda-ae340696464f.png)
# Kết bài
Các bạn nên thực hành nhiều để nhớ và hiểu rõ hơn, phần sau mình sẽ viết về Network trong Docker. Cảm ơn mọi người đã theo dõi.