# Vấn đề
Từ hồi học đại học mình đã từng được ông bạn giới thiệu về docker. Ông bạn giải thích rằng:
```
- Docker là cái mày thích cài ngôn ngữ với version nào cũng được hay cài bất kể cái gì cũng được
- Nó cực tiện và chạy được ở mọi máy nếu máy đó cài Docker, rất thích hợp cho một con laptop yếu như mày
- Mày sẽ không cần cài gì chỉ cần chạy một câu lệnh thôi, còn lại chúng nó lo
```
Đây là link github mà ông bạn làm [github](https://github.com/Shinigami2208/Du-an-Shop-LA-LA-LAND).

Hồi đó mình khá bảo thủ với lối suy nghĩ: có mỗi `php` `mysql` `composer` `node` thì quan trong gì, version cao thì nó hỗ trợ hết các version thấp mà. Hơn nữa là cũng ngại cài thêm docker vì cài thêm docker nữa thì không biết cả thanh xuân này có chờ được laptop cài xong không nữa :v

Mãi về sau khi mình có tiếp cận với con `laravel` với `package` yêu cầu phiên bản cũ hay là cài đặt từng môi trường khác nữa, hơn nữa quá trình cài đặt nó khá mất thời gian 

=> Giờ mới thấy **docker** có tác dụng này.
Cùng mình tìm hiểu về docker nhé - . ^.
# Giới thiệu

![image.png](https://images.viblo.asia/c6297f98-075f-4dd2-8bfc-9cf0d0e5ddb3.png)

Theo AWS thì **docker** là một nền tảng cho phép bạn `build` `test` `deploy` một cách nhanh chóng, Docker sẽ đóng gói ứng dụng của bạn bao gồm các công nghệ bạn sử dụng thành từng `container` , Sử dụng docker bạn sẽ nhanh chóng triển khai ở bất kì môi trường nào.

Chúng ta chỉ cần thiết lập cho app của mình môi trường và các công nghệ sử dụng, khi ai đó muốn sử dụng hoặc cài đặt ứng dụng đó chỉ cần tải về và chạy các câu lệnh từ đó sẽ rút ngắn được thời gian cài đặt môi trường. Bạn sẽ không cần quan tâm phải cài đặt như thế nào và phiên bản của nó nữa

## Kiến trúc của docker

![image.png](https://images.viblo.asia/f97cbd8c-b6d1-4e8d-86fc-b8a08fe386eb.png)

- **Docker client**: Đảm nhiệm vai trò giữ tương tác với người dùng và Docker. Khi bạn sử dụng câu lệnh `docker run` , docker client sẽ gửi câu lệnh đó tới dockerd và thực hiện chúng, các câu lệnh docker sử dụng docker API và chúng có thể tương tác một hoặc nhiều docker daemon.
- **Docker daemon**: Sẽ lắng nghe các `API request` từ phía `docker client`  và quản lý các đối tượng của docker như: image, container, network, volumes. Chúng có thể giao tiếp với các daemon khác để quản lý các dịch vụ của docker
- **Registry**: Dùng để lưu trữ các image, `Docker hub` là một Public Request nơi mà mọi người có thể sử dụng và theo mặc định docker được cấu hình sẽ tìm kiếm và pull images từ docker hub. Khi bạn chạy câu lệnh `docker run` hoặc `docker pull`, các image cần thiết sẽ được lấy từ docker hub và khi sử dụng câu lệnh `docker push` cũng là lúc bạn tải image lên `docker hub`.
- **Docker Desktop**: là ứng dụng dễ cài đặt cho môi trường window và Mac, Docker desktop bao gồm cả `docker client`, `docker daemon`, `docker compose`, `Docker Content Trust`, `Kubernetes` và `Credential Helper` để biết rõ bạn có thể xem qua [docker desktop](https://docs.docker.com/desktop).

## Các đối tượng của docker
###  Image
image là một `read-only template` ví dụ một ứng dụng của bạn sẽ được đóng gói thành image, image này sẽ chứa môi trường, thư viện, công nghệ ..., thông thường image này sẽ lại dựa theo image khác ( ví dụ ứng dụng laravel của bạn đóng gói thành image laravel thì sẽ cần image php ).

Bạn có thể tự tạo image hoặc sử dụng image của người khác và có thể cho lên Registry, để tạo image bạn cần tạo `dockerfile`  với những cú pháp đơn giản để xác định các bước cần thiết để tạo và sử dụng.

`Dockerfile` sẽ chạy từng câu lệnh được chia từng layout, nếu bạn có thay đổi hay sửa đổi 1 câu lệnh nào đó trong dockerfile thì chúng sẽ chỉ thay đổi ở layout đó và giữ nguyên các layout còn lại, đó là một trong những lý do vì sao image nhanh và nhỏ gọn khi so sánh với các công nghệ ảo hóa khác.
### Container
Container là một instance của image, hiểu đơn giản là docker container được sinh ra từ docker image khi chạy câu lệnh và những thứ chúng ta sử dụng hoặc thao tác là thông qua thằng này

Bạn có thể tạo, xóa, dừng, di chuyển container bằng docker API hoặc CLI, có thể kết nối nhiều network ..., Container sẽ hoạt động độc lập với các container khác, bạn có thể kiểm soát được mức độ cô lập của container thông qua network, hoặc các hệ thống con, các container khác hoặc máy chủ

# Docker vs Virtual Machine
## Virtual Machine

![image.png](https://images.viblo.asia/bc7749d4-232a-4975-bed2-807c5e343a60.png)

Là một máy ảo hoạt động giống y hệt một máy tính, một cách ngắn gọn là nó giúp tạo nhiều máy trên một máy vật lý.

ví dụ như ứng dụng `VMware Workstation`, nó giúp chúng ta cài được nhiều hệ điều hành trên một máy tính vật lý và chúng cũng có yêu giống y hệt các hệ điều hành khác như ram bộ nhớ .... và các thứ đó đều được ảo hóa.

- Infrastructure ( hạ tầng):  có thể là laptop, server ... được hiểu là máy vật lý
- HOST OPERATING SYSTEM: là hệ điều hành đang được sử dụng ở hạ tầng
- HYPERVISOR (phần mềm giám sát): coi máy ảo như một máy tính độc lập được đóng gói thành một tệp tin, HYPERVISOR sẽ được sử dụng để stop, start, reset từng máy ảo, cho phép chúng truy cập tài nguyên phần cứng ở bên dưới, phần mềm này sẽ giới hạn tài nguyên của mỗi máy ảo
- GUST OS: là hệ điều hành của máy ảo, cần phải cài đặt một hệ điều hành đi kèm cho máy ảo và cung cấp các tài nguyên cần thiết cho máy ảo đó ( ví dụ ram , bộ nhớ ...).
- Bins/libs các service và application sẽ cần có tệp tin và thư viện đi kèm
- App mã nguyền của ứng dụng và phần mềm

## Docker

![image.png](https://images.viblo.asia/6c73d77d-5234-4ed8-91cf-f72c7c27e347.png)

- INFRASRUCTURE và HOST OPERATING SYSTEM giống như giải thích ở trên nhé.
- DOCKER DAEMON: đây là service hoạt động trên server, được dùng để quản lý các thành phần cần thiết và nhận tương tác với docker container
- BINS/LIBS các tập tin, thư viện đi kèm của service được thêm vào docker image.
- App mã nguồn của các ứng dụng , phần mềm được thêm vào docker container.

## Sự khác nhau giữa docker và VM

![image.png](https://images.viblo.asia/69165e83-ad1d-4692-a977-635cfd8c1458.png)

Từ hình ảnh chúng ta có thể thấy VM có từng máy ảo riêng chạy trên hệ hiều hành ảo và không chia sẻ hệ điều hành, Điều này sẽ làm cho máy trở lên nặng vì mỗi hệ điều hành điều yêu cầu tài nguyên cứng cấp bao nhiêu là lấy cần đó, mặc khác với đối docker container chỉ chia sẻ và đó là lý do docker container nhẹ hơn.

Việc chia sẻ hệ điều hành giữa các container sẽ giúp chúng trở lên rất nhẹ và việc khởi động chỉ mất vài giây, do đó chi phí để quản lý sẽ rất thấp so với máy ảo

Docker container sẽ rất phù hợp khi bạn chạy nhiều ứng dụng qua một kernel của hệ điều hành, nhưng nếu bạn cần chạy trên nhiều hệ điều hành thì máy ảo sẽ là điều cần phải chạy :v:
### Tính bảo mật
VM không chia sẻ hệ điều hành và chúng được cô lâp hoàn toàn trong kernel do đó chúng an toàn hơn container. Container có nhiều rủi ro bảo mật do chúng chia sẻ và dùng chung kernel.

Các tài nguyên của docker không được đặt `namespace` , có thể khai thác tất cả container trong một nhóm nếu chúng có quyền truy cần vào một container.  Ở VM thì HYPERVISOR đã giới hạn sử dụng tài nguyên của máy ảo và bạn không thể truy cập vào tài nguyên của VM.
### Tính linh hoạt
Docker container dễ dàng di chuyển vì chúng không có hệ điều hành riêng biệt, chúng có thể di chuyển qua hệ điều hành khác và dễ dàng khởi động. Mặc khác VM có hệ điều hành riêng biệt nên việc di chuyển do đó việc di chuyển sẽ khó hơn và tốn nhiều thời gian bởi vì kích thước của chúng

Dưới đây là kết luận giữa docker và VM

| Docker |  Virtual Machine |
| -------- | -------- |
| Chia sẻ hệ điều hành     | Đều có hệ điều hành riêng     |
| Khởi động trong vài giây     | Tùy vào từng máy nhưng mà khởi động mất nhiều thời gian hơn   |
| Dung lượng nhỏ     | Dung lượng lớn     |
| Ảo hóa phần mềm     | Ảo hóa phần cứng     |
|  Yêu cầu ít dùng bộ nhớ hơn     |Phân bổ bộ nhớ theo nhu cầu     |
| Cô lập ở mức tiến trình kém an toàn hơn     | Hoàn toàn bị cô lạp và an toàn hơn   |

# Kết Luận
Ở bài viết này mình giới thiệu tổng quan và sự khác nhau giữa docker và VM phần tiếp theo mình sẽ tìm hiểu chi tiết từng phần của docker.

Cảm ơn mọi người đã dành chút thời gian đọc bài viết của mình.