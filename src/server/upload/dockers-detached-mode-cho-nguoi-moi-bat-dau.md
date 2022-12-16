```bash
docker run --detach IMAGE 
```

Bạn có thể sử dụng **Detached mode** bằng các option `--detach` hoặc `-d`. Khi lựa chọn option này Docker container sẽ chạy ngầm trong terminal của bạn - sẽ k nhận input truyền vào và trả ra output. 

Bài viết này chủ yếu dành cho các bạn mới bắt đầu. Tôi sẽ chỉ cho bạn biết cách chạy containers ở detached mode. Nếu cần thì có thể kết nối lại với terminal của bạn. 

# Detached mode
Khi khởi động một container, trước tiên bạn phải quyết định xem bạn muốn chạy container ở chế độ ngầm hoặc mặc định. Bạn có thể muốn sử dụng nếu bạn muốn một container chạy nhưng không muốn xem output của nó. 

Bạn có thể sử dụng lệnh đầy đủ là `--detach` hoặc viết tắt `-d` như sau 

```bash
docker run -d IMAGE
```

*Nếu bạn chạy các container trong detach mode, thì có thể cần kiểm tra trạng thái của chúng hoặc chạy các lệnh trên chúng. Tiếp theo, tôi sẽ giải thích làm thế nào để xem chúng trong terminal.*
# Xem containers
Khi đã chạy các container của bạn trong detach mode , bạn có thể xem chúng đang chạy bằng lệnh CLI `docker ps`. 

Mặc định, nó sẽ hiển thị tất cả các container đang chạy. Ngoài ra có thể tham khảo một số option khác:

* `-a` / `-all` hiển thị tất cả containers 
* `--quiet` / `-q` hiển thị danh sách id của containers 

*Bạn có thể xem log của một container để nắm đươc nhiều thông tin hơn về nó*
# Xem container logs
Để thực hiện bạn có thể sử dụng lệnh 

```bash
docker logs [OPTIONS] CONTAINER
```

Bạn có thể sử dụng tên hoặc ID của container để sử dụng trong câu lệnh trên. 

Có 1 option phổ biến được sử dụng trong câu lệnh là:

* `--tail`: Mặc định là hiển thị toàn bộ số lượng dòng. Bạn có thể chỉ định một số dòng cụ thể để hiển thị từ cuối nhật ký. 

```bash
docker logs --tail=1000 64d5f93bc97c
```

* `--follow`,  `-f` theo dõi nhật kí chạy của container

```bash
docker logs -f 64d5f93bc97c
```

Ngoài ra để xem đầy đủ hơn bạn có thể tham khảo tại [document](https://docs.docker.com/engine/reference/commandline/logs/)

*Bên cạnh việc xem log của container theo cách này, bạn cũng có thể chạy lệnh trong container trên terminal của mình*

# Chạy lệnh trong container đang chạy
Để thực hiện chạy lệnh trong 1 container đang chạy bạn có thể sử dụng lệnh `exec`

Ví dụ như sau:

```bash
docker exec -i -t 64d5f93bc97c /bin/bash
```

`-i` (interactive) để giữ cho stdin mở và `-t` để chỉ định một terminal

Bạn có thể tham khảo chi tiết hơn tại [document](https://docs.docker.com/v17.12/engine/reference/commandline/exec/)
# Attach
Lệnh `docker attach` để kết nối terminal của bạn tới 1 container đang chạy bằng cách truyền ID hoặc name của nó

```bash
docker attach [OPTIONS] CONTAINER
```

Ví dụ 

```bash
docker run -d --name topdemo ubuntu /usr/bin/top -b

docker attach topdemo
```

Bạn có thể tham khảo chi tiết hơn tại [document](https://docs.docker.com/v17.12/engine/reference/commandline/attach/)

# Một vài thứ khác

Học cách sử dụng detached mode cùng với các cách liên kết terminal và container bạn sẽ biết cách quản lý việc chạy nhiều container và các tác vụ khác trên dòng lệnh.

Trong tài liệu của Docker có cung cấp nhiều ví dụ để phân biệt sự khác nhau giữa detached và attached modes. 

* https://docs.docker.com/engine/reference/commandline/attach/#examples
* https://docs.docker.com/engine/reference/run/#detached-vs-foreground

Cảm ơn các bạn đã theo dõi. Bài viết được dịch từ [nguồn](https://medium.freecodecamp.org/dockers-detached-mode-for-beginners-c53095193ee9)