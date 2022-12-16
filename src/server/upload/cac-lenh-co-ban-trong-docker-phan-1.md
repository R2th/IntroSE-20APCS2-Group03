***Xem thêm*** : [***LaTeX cho người mới bắt đầu với 7 videos***](https://www.tailieubkhn.com/2021/12/latex-cho-nguoi-moi-bat-au-voi-7-videos.html)

### Tải về 1 image
- Ví dụ: 
	- Tải về ubuntu version 16.04 -> `sudo docker pull ubuntu:16.04`
	- Tải về phiên bản cuối cùng -> `sudo docker pull ubuntu:lastest`
- Cú pháp: `sudo docker pull [name_image]:[tag]`
	     
### Xóa đi 1 image
- VD: 
	- Cách 1 -> `sudo docker rm ubuntu:16.04 `
	- Cách 2 -> `sudo docker rm [image_id]`
- Cú pháp : 
	- Cách 1 -> `sudo docker rm [name_image]:[tag]`
	- Cách 2 -> `sudo docker rm [image_id]` (không cần viết hết ID nếu như những kí tự đầu không trùng)
		   
**Lưu ý**: Khi image chạy, các phiên bản thực thi của image là các container (1 image có thể tạo nhiều container)

### Khởi tạo và chạy 1 image
- Cú pháp: `docker run [param] IMAGE command [param_command]`
- Ví dụ : 
	- `docker run -i -t ubuntu:16.04`
		- Tham số `-i` : container tạo ra nhận tương tác
		- Tham số `-t` : kết nối với terminal
	- `docker run -it --name "ABC" -h ubuntu1 ubuntu:16.04`
		- Tham số `--name` : đặt tên cho container
		- Tham số `-h` : tên cho host name (ví dụ `root@ubuntu1` thay vì host name do docker đặt)

### Xem những container đang chạy 
- Cú pháp: `docker ps`
	
### Để xem tất cả những container
- Cú pháp: `docker ps -a`

### Để tắt container : 
- Cú pháp: 
	- Trong terminal của container -> `exit`
	- Trong cửa sổ terminal khác -> `docker stop [container_ID]`
	- Để đóng cửa sổ terminal của container nhưng container vẫn chạy -> `Ctrl + P + Q`

### Để khởi chạy lại những container đã tắt
- Cú pháp: `docker start [container_ID]`

### Để xóa container
- Cú pháp: 
	- `docker rm [container_ID]`
	- Khi container đang chạy mà vẫn muốn xóa : `docker rm -f [container_ID]`	

### PHỤ LỤC 
- `parameters` -> `param` : tham số
- 1 IMAGE đặc trưng bởi tên + phiên bản hoặc ID (`[name]:[tag]` && `[ID]`). Mọi `[name]:[tag]` đều có thể thay thế bằng `[iD]`. Với mọi thông tin có thể dùng bởi `[name]:[tag]` thì đều có thể thay thế bởi `[ID]`.