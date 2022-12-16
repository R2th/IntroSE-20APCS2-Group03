***Xem thêm*** : [***LaTeX cho người mới bắt đầu với 7 videos***](https://www.tailieubkhn.com/2021/12/latex-cho-nguoi-moi-bat-au-voi-7-videos.html)

### Muốn trở lại 1 container đang chạy
- Cú pháp: `docker attach [container_ID]`

### Khi đứng ở ngoài container nhưng vẫn muốn thi hành một lệnh cho container đang chạy
- Cú pháp: `docker exec [container_ID] command`
- Ví dụ: `docker exec U1 ls`
- Ví dụ: `docker exec -it U1 bash` <-> `docker attach`
		-> Khi thoát bằng lệnh exit sau khi dùng lệnh bash thì container vẫn sẽ chạy.
		-> Muốn cài cái gì thì cài như bình thường khi dùng máy thật.
		
### Lưu container trở lại thành image
-> Container phải ở trạng thái dừng
- Cú pháp: `docker commit [container_ID]`

### Lưu image trở thành 1 file
- Cú pháp: `docker save --output [file_name.tar] [image_ID]` (tới đường dẫn muốn lưu image)
- Ví dụ: `docker save --output myimage.tar ff`

### Khi có 1 container của image đang chạy, không thể xóa image, để ép nó phải xóa
- Cú pháp: `docker image rm [image_ID] -f`
	
### Để import file docker lại thành 1 image
- Cú pháp: `docker load -i [file_name.tar]`
- Ví dụ: `docker load -i myimage.tar`

### Đổi tên cho image
- Cú pháp : `docker tag f [name]:[tag]`
- Ví dụ: `docker tag f [newimage]:[version2]`

### Khi muốn chạy container đúng 1 lần, chạy xong container tự xóa sử dụng
- Cú pháp : `docker run -it --rm [image_name]`
	- Tham số `--rm` : tự xóa container sau khi sử dụng