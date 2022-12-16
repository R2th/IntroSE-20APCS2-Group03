# Docker là gì và sử dụng để làm gì?
Theo wikipedia:

> Docker là một dự án mã nguồn mở giúp tự động triển khai các ứng dụng Linux và Windows vào trong các container ảo hóa.

Nghe có vẻ trừu tượng và khó hiểu. Hãy tưởng tượng như này, vào một ngày đẹp trời bạn được phân công vào một dự án PHP mới, bạn hứng khởi bay ngay vào vọc code và đọc file `Readme.md` thì ôi thôi... Dự án yêu cầu cài cắm một đống thứ như là PHP, MySql, Nginx, Redis ...vân vân và mây mây. Còn chưa kể phiên bản PHP và MySql lại hoàn toàn khác so với phiên bản trong máy của bạn, cứ thế mà dùng có được không hay lại sinh ra những bug trên trời vì conflict phiên bản? Vậy lối đi nào cho em. :(. Có cách nào để chạy code mà không cần cài cắm cái đống nhì nhằng đó không.....
Giải pháp chính là Docker. Với Docker, mọi thứ trở lên đơn giản hơn nhiều, chỉ với vài dòng lệnh, bạn có thể nhanh chóng tạo được `môi trường ảo hóa` chứa đầy đủ những cài đặt cần thiết để chạy project rồi. :3 
Vậy Docker là gì?
> Docker là một công cụ tạo môi trường được “đóng gói” (còn gọi là Container) trên máy tính mà không làm tác động tới môi trường hiện tại của máy.

> Môi trường ảo hóa? Vậy nó giống như cài máy ảo à? Liệu toy dùng Vitual box có được hông? -_-

Hãy cùng tìm hiểu nhé...
# Sự khác biệt giữa Docker và Hypervisors?
## Hypervisors là gì?
Hypervisor là 1 ứng dụng  phần mềm chịu trách nhiệm chạy nhiều máy ảo  trên 1 hệ thống, mỗi máy ảo đều chạy những OS riêng, nó trực tiếp tương tác với tài nguyên phần cứng .
Một số cái tên sử dụng công nghệ này như VitualBox, hay VMware có lẽ bạn đã nghe đến rồi.

## Sự khác biệt giữa Docker và Hypervisors
### Hypervisors
* Khi sử dụng cần thêm một máy ảo sử dụng một hệ điều hành riêng biệt, đồng thời phải cấp cho nó một dung lượng ổ cứng và Ram nhất định. Đồng nghĩa với việc kể cả khi không làm gì nhưng máy host vẫn phải phân phát tài nguyên dẫn đến lãng phí.
* Thời gian khởi động và shutdown cũng khá lâu, tùy vào độ mạnh của máy, thậm chí có thể lên tới vài phút.
### Docker
* Sử dụng công nghệ `containerlization`,  bằng cách sử dụng công nghệ này, trên một máy chủ ta có thể sinh ra được nhiều máy con, nhưng khác với Hypervisors là các máy con này sử dụng chung phần nhân của máy mẹ và chia sẻ tài nguyên của máy mẹ.
Bởi vậy sẽ không xảy ra việc lãng phí tài nguyên, máy con cần bao nhiêu thì được cấp bấy nhiêu, thời gian khởi động cũng nhanh hơn nhiều.
## Docker Image và Docker Container ?
### Docker Image
Docker Image là nền tảng của Container, giúp định hình được Container
Một Image bao gồm hệ điều hành ( ubuntu, debian, windows) và các môi trường lập trình chuyên dụng cài sẵn ( PHP, MySQL, Nginx, Python, Rail....) .
Người sử dụng có thể tự tạo riêng cho mình một Image, hoặc sử dụng những Image của người khác trên kho chứa Docker Hub.
### Docker Container
Docker Container có thể nói nó tương tự như một máy ảo, có được bằng cách sử dụng câu lệnh khởi chạy Image.
Có thể hiểu Container như một cái thùng, trong cái thùng đó chứa tất cả những môi trường mà lập trình viên cần sử dụng để chạy project, mọi hoạt động trong cái thùng đó đều không ảnh hưởng tới môi trường bên ngoài.

## Làm thế nào để tạo ra một Docker Image ?
Như trên mình cũng đã nhắc đến, Docker Hub là một kho chứa, nơi lưu trữ và chia sẻ các Image, rất đơn giản, bạn chỉ cần lên trang chủ Docker Hub và gõ Image bạn muốn tìm ( ở đây mình ví dụ Image MySQL)
Để lấy về ta chỉ cần gõ câu lệnh: 
`docker pull mysql` 

![](https://images.viblo.asia/637413da-589e-48cf-a1b8-28b082ee6ea8.png)

Và sau đó kiểm tra danh sách image bằng câu lệnh:
`docker images`

![](https://images.viblo.asia/de79e0b8-29b1-4901-b2e7-6be3f7b22e75.png)

> Vậy làm cách nào để có thể tạo một Image và public lên Docker Hub?

Chúng ta cần sử dụng Dockerfile:
`Dockerfile` là một file dạng text không có đuôi. 
File này chứa danh sách các câu lệnh giúp thiết lập cấu trúc cho Image, quy định lên Image được khởi tạo từ đâu, bao gồm những môi trường nào.
Để tạo ra một Docker Image, ta cần những file sau:

![](https://images.viblo.asia/3a1d82d4-759d-40af-aeb1-b16408537db7.png)

File `script.sh` chứa những câu lệnh được chạy khi bật container,
File `Dockerfile` có nội dung như sau:
```
FROM ubuntu
MAINTAINER TuanPL<tuanphamle112@gmail.com>

RUN apt-get update

RUN apt-get install -y nginx

WORKDIR /venv

COPY script.sh /venv

RUN chmod a+x /venv/*

ENTRYPOINT ["/venv/script.sh"]

EXPOSE 80
```
File `Script.sh`:
```
#!/bin/bash
echo hello world
exec $@
```
Trong đó: 

**FROM**  : dùng để khai báo Image cha mà mình sử dụng, sau khi build image và Docker đọc tới câu lệnh này, nó sẽ tìm trong máy xem đã có image đó chưa ( trong ví dụ mình là ubuntu ), nếu chưa có nó sẽ lên Docker hub và tự động pull về.

**RUN**   : Dùng để chạy các câu lệnh trong quá trình build image, ở đây mình sử dụng để cài đặt `Nginx` và sửa quyền cho thư mục `/venv`

**WORKDIR** : định nghĩa thư mục cho **CMD** bên trong container, ngay sau khi `run Image` thành `Container` và truy cập terminal ở trong Container, ta sẽ ở thư mục này.

**COPY** : Copy file ở máy host sang  thư mục của `Container` ( ở đây ta copy file `script.sh`  sang thư mục `venv` của `Container`, để sau khi Container được hình thành sẽ chạy vào file `script.sh` bên trong Container đó )

**ENTRYPOINT** : Việc điều hướng Container chạy vào file `cript.sh`khi Container được khởi tạo

**EXPOSE** : Container sẽ lắng nghe  cổng mạng được chỉ định khi chạy

Xong công đoạn tạo Dockerfile, tiếp theo cùng build image nào:

`sudo docker build -t ubuntu-nginx . `

Trong đó : 

`ubuntu-nginx` là tên image.

Option `-t` ở đây chỉ định việc đặt tên tùy chọn 1 tag theo định dạng : `name:tag`, nếu không chỉ định mặc định sẽ là `latest`.

Ok rồi, cùng xem thành quả nào : `sudo docker images`

![](https://images.viblo.asia/7e7493f3-d6bd-4e76-8c8e-bc7b0e45a830.png)

-> Đã có `Image`, cùng chạy nó xem sao:  

![](https://images.viblo.asia/18aaaf88-a798-40a7-b2da-2791ad6ebd10.png)

Tarraaaaaa :sunny: , sau khi Container được tạo đã chạy thẳng vào file `script.sh`, bạn có thể sử dụng file này để chạy các câu lệnh ( thường để start nginx, mysql,redis....)

# Các câu lệnh thường sử dụng thao tác với Docker Image và Docker Container ?
## Câu lệnh thao tác với Docker Image
* `docker images` :  Câu lệnh kiểm tra danh sách các image đã cài đặt
* `docker rmi <id/Name>` : Câu lệnh xóa 1 image chưa chạy dựa vào id hoặc tên
* `docker rmi -f <id/Name>` : Câu lệnh xóa 1 image kể cả khi đang chạy dựa vào id hoặc tên
## Câu lệnh thao tác với Docker Container
* `docker ps` : Câu lệnh liệt kê danh sách các container đang chạy
* `docker ps -a`: liệt kê danh sách các container đang chạy và đã tắt
* `docker inspect { container_id }` : Xem thông tin chi tiết của container được tạo ra
* `docker logs { container_id }` : xem lịch sử container
* `docker rm <id/Name>`: xóa 1 container dựa vào id hoặc tên
* `docker rm -f <id/Name>`: xóa 1 container kể cả đang chạy
* `docker rm $(docker ps -a -q)`: xóa tất cả các container

    # Tổng kết
Trên đây là những chia sẻ của em(mình) , bài viết có tham khảo một số nguồn và viết theo ý hiểu vậy nên còn nhiều sai sót, mong nhận được góp ý của mọi người để mình cải thiện ở những bài viết sau, cảm ơn vì đã đọc. :smile::smile::smile:

Nguồn :

* https://www.docker.com/

* https://vi.wikipedia.org/wiki/Docker_(phần_mềm)