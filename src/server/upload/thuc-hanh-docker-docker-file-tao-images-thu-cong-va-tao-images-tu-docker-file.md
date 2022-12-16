Tiếp tục loạt bài thực hành docker từ căn bản ở bài này chúng ta cùng tìm hiểu docker file, thực hành build docker image thủ công và build image bằng docker file nhé.

Công việc chúng ta làm sẽ như sau
- Tạo image từ image cơ sở centos
- Image có cài sẵn máy chủ httpd
- htop
- vim
- Copy file dữ liệu index.html vào thư mục var/ww/html trên container
thi hành nền /usr/sbin/httpd 
Khi container từ image này chạy thì nó sẽ chạy máy chủ web httpd
# Tạo dữ liệu
Trước hết ta cần tạo dữ liệu. Tạo thư mục mycode chứa thư mục myimage, bên trong thư mục myimage tạo file test.html có nội dung html cơ bản

```
pc:~/Documents$ mkdir mycode
pc:~/Documents$ cd mycode/
pc:~/Documents/mycode$ mkdir myimage
pc:~/Documents/mycode$ cd myimage/
pc:~/Documents/mycode/myimage$ touch test.html
pc:~/Documents/mycode/myimage$ 
```
![](https://images.viblo.asia/5dec3ddd-40a4-4b97-9b6c-e99af42aac9d.png)

Sửa file html
![](https://images.viblo.asia/715b9642-f1d2-4fa0-b689-a6cd746f3f36.png)

# Thực hành build thủ công

Tạo container cent từ images centos phiên bản latest bằng lệnh

`docker run -it --name cent centos:latest`

![](https://images.viblo.asia/1d4aa0f5-a227-49b1-ba37-c677cab42761.png)

Tiếp theo chạy lệnh `yum update` để update centos của container

![](https://images.viblo.asia/f2d3d4e0-52e5-4a1a-ba21-870109b68bfe.png)

Tiếp theo cài httpd và  httpd-tools bằng lệnh

`yum install httpd httpd-tools -y`

 sau khi cài xong thì chúng ta có thể kiểm tra httpd bằng lệnh `httpd -v`
 
 ![](https://images.viblo.asia/aefeefa6-2cf2-446b-bf73-99152ee9c41f.png)

Tiếp theo ta cài vim 
`yum install vim -y`

Để cài htop ta cần cài kho phân phối mở rộng
```
yum install epel-release -y
yum update
yum install htop
```

Chúng ta đã hoàn thành phần cài đặt httpd, htop, vim. Tiếp theo chúng ta tiến hành copy dữ liệu là file test.html đã tạo vào thư mục làm việc /var/www/html trên container

Trước hết cần thoát ra khỏi container đang chạy bằng tổ hợp phím ctrl+p, ctrl+q

- Chạy lệnh` docker ps` để kiểm tra docker đang chạy
- Copy dữ liệu từ máy host vào container bằng lệnh `docker cp /home/nguyen.van.thinhb/Documents/mycode/myimage/test.html cent:/var/www/html`
- Vào container để kiểm tra xem dữ liệu đã được copy hay chưa

![](https://images.viblo.asia/bdba8d4b-863a-4703-8c46-0ab78367dc63.png)

Ta thấy file test.html đã có trong container

Tiếp theo ta đóng gói container này thành images 

- Trước hết cần thoát và tắt container bằng lệnh `exit`

- Đóng gói container tên là cent vừa tạo thành images có tên là imagecent

![](https://images.viblo.asia/3ce675d7-e16a-420b-b20e-9deb1fda8f68.png)

Vậy là đã tạo xong image, giờ chúng ta thử tạo container và chạy máy chủ httpd từ image vừa tạo bằng lệnh

`docker run --rm -p 6789:80 imagecent:latest httpd -D FOREGROUND`

Tham số `-rm`  để khi container tắt sẽ đồng thời tự động xóa container này đi

Tham số `-p 6789:80`  để ánh xạ cổng 6789 trên máy host với cổng 80 trên container 

Tham số `-D FOREGROUND` để chạy nền

Sau đó  truy cập cổng 6789 tại trình duyệt trên mày host sẽ thấy máy chủ httpd của container đã chạy

![](https://images.viblo.asia/bc685457-3fbc-4e19-98e0-f4d24d8c4aa5.png)

![](https://images.viblo.asia/52d279ba-bc8c-40c9-856a-1355e1c64f16.png)

Chúng ta đã tiến hành build images thủ công, tiếp theo sẽ thực hiện công việc này bằng docker file

# Thực hành build bằng dockerfile
### Tạo docker file
Ta tạo docker file tại thư mục myimage, cd vào thư mục myimage và tạo bằng lệnh `touch Dockerfile`

mở Dockerfile lên và chỉnh sửa nội dung như sau
```
FROM centos:latest

RUN yum update -y
RUN yum install httpd httpd-tools -y
RUN yum install vim -y
RUN yum install epel-release -y
RUN yum update -y
RUN yum install htop -y

WORKDIR /var/www/html
EXPOSE 80

ADD ./test.html /var/www/html/


ENTRYPOINT [ "httpd" ]
CMD [ "-D", "FOREGROUND"]
```
![](https://images.viblo.asia/3c848aaa-c9e2-4272-a7f8-17f8c009114c.png)
Giải thích phần này:

`FROM centos:latest` chỉ định image gốc là images centos:latest

Các lệnh RUN  để thực thi các câu lệnh như update centos..

WORKDIR cài đặt thư mục làm việc mặc định

EXPOSE cài đặt  cổng lắng nghe trên container

ADD để copy dữ liệu từ máy host vào container 

ENTRYPOINT là tiến trình chạy mặc định khi tạo container

CMD [ "-D", "FOREGROUND"] là tham số cho ENTRYPOINT

### Chạy docker file để sinh ra image
Tại thư mục chưa Dockerfile chạy lệnh

`docker build --rm -t dockerfileimage -f Dockerfile .`

![](https://images.viblo.asia/c719d481-f63b-45bc-a6d0-d61a3c910009.png)

Sau khi chạy lệnh build image ta thấy terminal chạy 12 tiến trình tương ứng với các lệnh ta tạo trong Dockerfile, khi chạy xong thì ta kiểm tra images bằng lệnh `docker images` sẽ thấy images **dockerfileimage** đã được tạo thành công.

### Tạo container từ image vừa tạo và chạy máy chủ web httpd

Ta đã tạo ra image dockerfileimage giờ chúng ta tạo container và chạy máy chủ web httpd từ images này

Chạy lệnh `docker run --rm -p 6789:80 dockerfileimage `

![](https://images.viblo.asia/79f472de-73c9-4c3f-b0f2-c858a6c06e14.png)

Container đã được tạo và đang chạy máy chủ web, giờ ta truy cập máy chủ web của container bằng  trình duyệt với cổng 6789 sẻ thấy máy chủ web hoạt động

![](https://images.viblo.asia/a766b5b4-0e5f-41bb-a374-fe1b382d5420.png)

# Kết bài
Trên đây là nội dung cơ bản về docker file, cùng đón chờ phần tiếp theo nhé, cảm ơn mọi người.