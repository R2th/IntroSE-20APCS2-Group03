***Xem thêm*** : [***LaTeX cho người mới bắt đầu với 7 videos***](https://www.tailieubkhn.com/2021/12/latex-cho-nguoi-moi-bat-au-voi-7-videos.html)
### Để chia sẻ thư mục trên máy host cho container 
- Cú pháp: `docker run -i -v <path1>:<path2> [image_ID]`
- Ví dụ: `docker -it -v /user/trannguyenhan/dulieu:/home/dulieu ff85`
	- Tham số `-v` : chỉ định tài nguyên 
	- `<path1>`: đường dẫn tài nguyên trong máy host
	- `<path2>`: tài nguyên trên máy host được ánh xạ sang đường dẫn path2 trong container

-> Mọi dữ liệu được chỉnh sửa trên container hay trên máy host thì đều được thay đổi trên cả 2
		
### Tạo 1 container cùng được chia sẻ dữ liệu giống 1 container đang chạy
- Cú pháp: `docker run -it --name [container_2] --volumes-from [container_1] [image_ID]`
- Ví dụ: `docker run -it --name C2 --volumes-from C1 ubuntu:16.04`

-> Mọi dữ liệu được thay đổi thì đều thay đổi trên các bên

## TẠO VÀ QUẢN LÝ Ổ ĐĨA BẰNG DOCKER
### Kiểm tra đang có ổ đĩa nào
- Cú pháp: `docker volume ls`

### Tạo ổ đĩa
- Cú pháp: `docker volume create [name_volume]`
- Ví dụ: `docker volume create D1`

### Kiểm tra thông tin ổ đĩa vừa tạo
- Cú pháp: `docker volume inspect [name_volume]`
- Ví dụ: `docker volume inspect D1`

### Xóa ổ đĩa 
- Cú pháp: `docker volume rm [name_volume]`
- Ví dụ: `docker volume rm D1`

### Gán ổ đĩa vào container để container sử dụng ổ đĩa
- Cú pháp: `docker run -it --name [container_name] --mount source=[name_volume], target=<path> [image_ID]`
- Ví dụ: `docker run -it --name C1 --mount source=D1, target=/home/disk2 ubuntu:16.04`
	- `<path>` ổ đĩa được ánh xạ vào thư mục nào
	- Có thể lưu trữ dữ liệu từ container vào ổ đĩa mà khi xóa đi không bị mất dữ liệu
	- Muốn truy cập ổ đĩa, phải truy cập qua container

### Tạo ra ổ đĩa mà ánh xạ tới thư mục nào đó trong máy host
- Cú pháp: `docker volume create --opt device=<path1> --opt type=none --opt o=bind [volume_name]`
- Ví dụ: `docker volume create --opt device=/user/trannguyenhan --opt type=none --opt o=bind D1`
	- `<path1>`: đường dẫn trên máy host
	- Khi gán ổ đĩa này cho container không sử dụng tham số `--mount` và sử dụng tham số `-v`
	- Ví dụ: `docker run -it -v D1:/home/disk ubuntu:16.04` (giống chia sẻ thư mục máy host cho container)

## TẠO MẠNG TRONG DOCKER
### Kiểm tra trong docker có những mạng nào
- Cú pháp : `docker network ls`