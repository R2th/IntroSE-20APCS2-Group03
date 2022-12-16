# Lời mở đầu

Xin chào!

Hôm nay mình lại tiếp tục viết tiếp về chủ đề docker. Mình đã viết về [dockerfile](https://viblo.asia/p/dockerfile-don-gian-hon-ban-nghi-jvEla16Dlkw) và [docker compose](https://viblo.asia/p/docker-compose-co-gi-kho-RQqKLLGOK7z) rồi. Vậy docker còn gì hấp dẫn nữa? vâng, lần này mình xin giới thiệu một phần không thể thiếu khi làm việc với docker đó chính là docker command. 

Có rất rất rất là nhiều docker command được giới thiệu trong docker doc. Nhưng hiển nhiên, chúng ta chắc hẳn không thể nào sử dụng hết được tất cả chúng. Vậy với những người mới bắt đầu sử dụng docker, chúng ta cần chú ý đến những command nào. Trong bài viết này, mình sẽ giới thiệu cho các bạn một số lệnh docker phổ biến nhất mà mình hay sử dụng. Nếu như bạn thấy lệnh nào cần thiết mà mình chưa có đề cập, đừng ngại mà để lại một comment để mình học hỏi nhé.


# Docker command
Giới thiệu sơ về docker command chút. Docker command bắt đầu bằng từ khóa docker (như một điều hiển nhiên). Cấu trúc của một command như sau

`docker [OPTIONS] COMMAND [ARG...]`

tuy nhiên thì mình hay sử dụng theo cấu trúc sau:

`docker [MANAGERMENT_CATEGORY] [OPTIONS] COMMAND [ARG...]`

bạn có thể thấy gợi ý cách dùng bằng lệnh `docker` hoặc `docker --help`

![](https://images.viblo.asia/c8b43c9d-2355-4786-981e-5e73b46b275d.jpg)


Lệnh `docker` ngoài việc gợi ý sử dụng docker command còn cung cấp các option cũng như các command cơ bản. Các lệnh mình giới thiệu ở phần tiếp theo cũng sẽ là những lệnh cơ bản hay sử dụng nhất


Lưu ý: `MANAGERMENT_CATEGORY` chính là phần management commands trong ảnh minh họa


Phần đầu tiên mình muốn giới thiệu khi bắt đầu với docker chính là cách lệnh thao tác với system của docker. Đó chính là `version`, `login`, `ps`.  Ngoài ra còn có  `docker build`, `docker run`, `docker stop`, `docker rm` tuy nhiên các lệnh này mình khá ít dùng nên mình sẽ không giới thiệu ở phần này (do mình sử dụng image, container, compose... :smiley: )


## Version

`docker version` : hiển thị thông tin chi tiết về các phiên bản docker (docker client và docker server). 

![](https://images.viblo.asia/bde6c25f-f159-465d-8721-e5cd78a556b4.png)

Ảnh minh họa trên cung cấp cho mình biết client (Docker desktop) mình đang sử dụng là bản dành cho windows 64-bit có version là 19.03.8 còn Server (Linux container) đang sử dụng là linux 64-bit và cũng có version là 19.03.8

## Login

`docker login`: đăng nhập vào docker registry. Docker registry sẽ là nơi lưu trữ và phân phối docker image của chính bạn.

![](https://images.viblo.asia/7aafab40-d4b6-4a1e-bf32-09467fee47fe.png)

Như các bạn thấy mặc định docker sẽ đăng nhập vào Docker Hub. Nếu bạn muốn đăng nhập vào một host khác ngoài Docker Hub thì rất đơn giản, bạn chỉ cần thêm nó vào đằng sau lệnh trên. Chẳng hạn

`docker login localhost:8080`

## ps

`docker ps`: liệt kê các container đang chạy. Và option hay dùng với lệnh ps đó là -a
`docker ps -a`: liệt kê tất cả các container đang có trong hệ thống

![](https://images.viblo.asia/645ee251-38f1-411e-8833-489e32428fad.jpg)

Các bạn chú ý đến cột status, Up có nghĩa là đang chạy còn Exited là đã stop. 


# docker system

`docker system COMMAND`: docker system là các lệnh dùng để quản lý docker. 

Các lệnh trong docker system bao gồm

`docker system df`: hiển thị thông tin dung lượng bộ nhớ (disk space) được sử dụng bởi docker bao gồm image, container, volume, cache.

`docker system events`: hiển thị realtime event từ phía server

`docker system info`: hiển thị thông tin của toàn hệ thống như số lượng container (đang chạy, dừng), số lượng image, ...

`docker system prune`: xóa bỏ những thành phần không sử dụng


Với docker system thì lệnh hay sử dụng nhất đó là `docker system prune`. Tuy nhiên bạn cũng cần nắm cả 4 lệnh để có thể quản lý hệ thống docker của mình một cách toàn diện.

## prune

Đây là lệnh rất rất rất là hữu ích khi sử dụng docker. Lệnh này giúp chúng ta loại bỏ tất cả container, image, network, và build cache không được sử dụng. Và một option bổ sung nữa đó là loại bỏ tất cả volume không sử dụng. Nghĩa là giải phóng kha khá dung lượng bộ nhớ.

Khi thực thi lệnh này, docker sẽ có thông báo rõ những phần tử nào sẽ được xóa bỏ và cần sự xác nhận để thực hiện.

`docker system prune` : loại bỏ tất cả container, image, network, và build cache không được sử dụng

![](https://images.viblo.asia/66446844-951c-434a-9f50-04c6ed57bb88.png)

Vì mình dùng prune thường xuyên nên chẳng có nhiều thứ phải remove. Chứ mà cứ để đấy thì prune phát là free khoảng chục GB bộ nhớ.


`docker system prune -a --volumes` : loại bỏ tất cả container, image, network, build cache và volume không được sử dụng

![](https://images.viblo.asia/35d845f8-c002-4f7b-8e93-5e9a4fd25e6e.jpg)


Lưu ý: 
* `-a` là cách dùng ngăn hơn của option` --all` (hiện nay hầu hết các CLI đều cung cấp các option kiểu như thế để rút gọn)  
* Nếu bạn không muốn xóa bỏ nhiều thành phần cùng một lúc thì bạn có thể sử dụng các lệnh khác như `docker image prune`, `docker container prune` để xóa bỏ những phần mong muốn

# Image

`docker image COMMAND`: bao gồm các lệnh dùng để quản lý image. 

các lệnh thường dùng với docker image

`docker image build`: thực hiện build image từ Dockerfile

`docker image history IMAGE`: hiển thị history của một image như thời gian tạo, kích thước và cách image được tạo ra.

`docker image inspect IMAGE`: hiển thị thông tin chi tiết của một image, đặc biệt là các layer tạo ra nó.

`docker image ls`: hiển thị danh sách các image (có thể dùng docker images thay thế) với các thông tin về tên image, tag, image id, size và thời gian tạo

`docker image prune`:	xóa bỏ các image không sử dụng (dangling image)

`docker image push`: Push image của bạn lên docker registry. Để làm được điều này bạn cần phải thực hiện `docker login` trước

`docker image rm`: xóa bỏ một hoặc nhiều image được chỉ định.


với docker image thì các lệnh sử dụng nhiều nhất là build, ls, prune và rm. Tạo, xem danh sách, và xóa image - quá đủ để quản lý image rồi.

## build

`docker image build [OPTIONS] PATH | URL | -` 

cấu trúc mà mình hay sử dụng với lệnh docker build đó là

`docker image build -t my_image:my_tag .`

trong đó option `-t` (`--tag`) dùng để đặt tên và tag cho image (theo format `image_name:image_tag`)
chú ý là có dấu `.` ở cuối lệnh nhé. Dấu `.` để báo cho docker biết rằng sẽ build image từ Dockerfile ở folder hiện tại


# Containers


`docker container COMMAND`: bao gồm các lệnh dùng để quản lý container. 

các lệnh được dùng nhiều nhất khi sử dụng docker container

`docker container create IMAGE`: khởi tạo container từ một image

`docker container inspect CONTAINER`: hiển thị chi tiết thông tin của container

`docker container logs CONTAINER`: hiển thị logs của một container

`docker container ls`: liệt kê tất cả container hiện có

`docker container prune`: xóa bỏ tất cả các container không hoạt động

`docker container rm`: xóa bỏ một hoặc nhiều container

`docker container run IMAGE`: khởi tạo và chạy một container từ một image

`docker container start`: khởi chạy container 

`docker container stop`: chấm dứt hoạt động của container đang chạy


## Create, start và run

Đây là 3 lệnh thường sử dụng khi bắt đầu làm việc với container. Để thực thi một container thì bạn cần khởi tạo container từ image và chạy nó. Để làm được điều này bạn có 2 cách
Cách 1: dùng docker container create để tạo container từ image và dùng docker container start để khởi chạy

`docker container create --name CONTAINER_NAME IMAGE`

`docker container start CONTAINER`


Cách 2: dùng docker run để tạo container từ image và chạy nó

`docker container run --name CONTAINER_NAME -d IMAGE --rm`

* option `--rm` tự động xóa container ngay sau khi nó stop
* option `-d` chạy container dưới chế độ background

Tùy theo sở thích của mỗi người nhưng với mình thì mình hay sử dụng cách thứ 2 hơn (vì mình lười, cơ mà theo mình thấy mọi người cũng giống mình nên việc dùng lệnh run phổ biến hơn :sweat_smile: )


## Stop và kill

Có 2 cách để dừng một container đang chạy đó là dùng lệnh `docker container stop` và lệnh `docker container kill`

`docker container stop CONTAINER` : mặc định cung cấp 10 giây để container có thể hoàn thành nốt các task của nó trước khi dừng hoạt động.

`docker container kill CONTAINER` : dừng hoạt động ngay lập tức.

Cũng tùy theo mục đich nhưng mình hầu như chỉ xài mỗi lệnh stop. Bạn hoàn toàn có thể thay đổi giá trị 10 giây mặc định với option `--time/ -t` 

# Compose

Về docker compose thì nó sẽ hơi khác một chút đó là dùng Docker Compose CLI thay vì Docker CLI. Nghĩa là thay vì bắt đầu bằng docker thì nó bắt đầu bằng docker-compose.

Các lệnh thường sử dụng với docker compose đó là

`docker-compose build`: dùng để build tất cả container được định nghĩa trong compose file

`docker-compose up`: thực hiện tạo và khởi chạy các container

`docker-compose down`: dùng để dừng các container và xóa hết những gì được tạo từ lệnh up

Về chi tiết thì có lẽ mình đã giải thích trong bài về docker compose rồi. Các bạn có thể đọc chi tiết tại [đây](https://viblo.asia/p/docker-compose-co-gi-kho-RQqKLLGOK7z)


# Lời kết

Bài viết này chủ yếu mình giới thiệu về các lệnh cơ bản thường dùng khi sử dụng docker, bao gồm các lệnh về quản lý hệ thống, lệnh về quản lý image và container (tạo, xem, xóa). Hi vọng sẽ giúp ích cho các bạn mới bắt đầu sử dụng docker. Cảm ơn các bạn đã theo dõi bài viết này. Xin chào tạm biệt và hẹn gặp lại các bạn ở bài viết tiếp theo.

# Tham khảo
https://docs.docker.com/engine/reference/commandline/cli/