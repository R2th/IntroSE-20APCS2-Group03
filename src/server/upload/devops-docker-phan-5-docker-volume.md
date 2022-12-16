# Chào các mọi người. Hy vọng là các phần kiến thức trước trong series Docker có thể giúp ích cho mọi người. Và đây là phần số 5 - Docker Volume
## I. Bài toán quản lý bộ nhớ
Trong phần 5 này bạn cần hiểu rộng bài toán hơn so với tiêu đề của nó. Trong phần này sẽ làm rõ cách mà quản lý bộ nhớ trên máy host và khi các container chạy trên host thì các container này cũng sẽ có một vùng nhớ được cấp riêng. Chính vì vậy cần tìm hiểu cách quản lý các vùng nhớ này.

Hệ điều hành linux quản lý filesystem theo dạng cây gốc với đường dẫn trong CLI là /. Cây dữ liệu sẽ chia ra các nhánh theo các chức năng riêng như /etc, /var, /usr, ...

Và toàn bộ filesystem của container sẽ được lưu trữ trong thư mực /var/lib/ của máy host.
![image.png](https://images.viblo.asia/f63e2eef-0821-4071-a49f-2751e36ad8ed.png)
Docker hỗ trợ 3 loại lưu trữ trong container là 
1. Bind mounts
2. Inmemory storage 
3. Docker volume
### 1.1. Bind mounts
Bind mount là các điểm gắn kết được sử dụng để gắn lại các phần của cây hệ thống tệp vào các vị trí khác. Khi làm việc với container, liên kết gắn kết đính kèm một vị trí do người dùng chỉ định trên hệ thống tệp máy chủ lưu trữ vào một điểm cụ thể trong cây tệp vùng chứa. Gắn kết liên kết hữu ích khi máy chủ cung cấp tệp hoặc thư mục cần thiết cho chương trình đang chạy trong container hoặc khi chương trình được chứa đó tạo ra tệp hoặc nhật ký được xử lý bởi người dùng hoặc chương trình chạy bên ngoài container.

Để hiểu đơn giản hơn thì bind mount sẽ tạo thư mục chia sẻ chung là một thư mục trên container và một thư mục nằm trên host ( thư mục này thường nằm ngoài khu vực bộ nhớ quản lý container là /var/lib/ )

Bạn sẽ cần tạo thư mục chia sẻ trên host trước khi chạy container.

`mkdir /home/daihv/data_onhost`\
`docker run -ti --rm --name server --mount type=bind,source=/home/daihv/data_onhost,target=/data_oncontainer alpine:latest`\
`docker run -ti --rm --name server -v /home/daihv/data_onhost:/data_container alpine:latest`\
Hai lệnh trên là tương đương nhau.
![image.png](https://images.viblo.asia/d50c76fb-1427-472b-b5e3-482293fc791d.png)

Khi đã có thư mục chia sẻ chung giữa host và container. Bạn thử tạo hoặc copy một file khác vào thư mục đó và kiểm tra lại trên thư mục đã mount  trên container. Trong hướng dẫn mình đã tạo file *ebook3.txt*

Thường tính năng này được sử dụng khi chia sẻ file cấu hình quan trọng, vì nếu sử dụng inmemory storage sẽ bị mất khi thoát hoặc khỏi động lại container. Nếu sử dụng docker volume cũng có thể bị mất vùng nhớ chia sẻ chung này. Đôi khi bạn muốn sử dụng tính năng này với việc xử lý log của ứng dụng ngay trên host mà không cần mất thời gian vào log trên container kiểm tra.

Bạn có thể xem tra lại cấu hình mount bằng\
`docker inspect server`           
![image.png](https://images.viblo.asia/8c6a7fcb-f530-40e3-825b-d3ba54961ff7.png)

**Nếu trong trường hợp đặc biệt bạn chỉ muốn thư mục mount trên container chỉ có quyền read bạn có thể cấu hình ở mode readonly**

`docker run -ti --rm --name server --mount type=bind,source=/home/daihv/data_onhost,target=/data_oncontainer,readonly alpine:latest`
![image.png](https://images.viblo.asia/f9f93edd-e0bc-4876-8941-30ccfb1ff882.png)\
Lúc này "RW" là false. Và bạn thử tạo file mới trên thư mục của container nó sẽ báo lỗi nhưng trên thư mục của máy host vẫn có quyền read và write.

Một điểm lưu ý lớn và cũng là nhược điểm lớn của bind mount là khi mount một thư mục trong container thuộc hệ điều hành windows với thư mục trên host là linux, lúc này sẽ xảy ra lỗi không tương thích do cấu trúc thư mục windows khác với linux.
### 1.2. Inmemory storage
Hầu hết phần mềm dịch vụ và ứng dụng web muốn đảm bảo tính bảo mật đều sử dụng private key, mật khẩu cơ sở dữ liệu, tệp khóa API hoặc tệp cấu hình nhạy cảm khác. Trong những trường hợp này, điều quan trọng là bạn không bao giờ muốn lưu chúng trên imgae của container cũng như là lưu trữ trực tiếp trên host. Thay vào đó, bạn nên sử dụng inmemory storage. Bạn cũng có thể thêm dung lượng lưu trữ của vùng nhớ inmemory bằng các cờ *--mount type=tmpfs,dst=/tmp,tmpfs-size=16k,tmpfs-mode=1770*.

`docker run -ti --rm --name server --mount type=tmpfs,destination=/data_oncontainer alpine:latest`\
`docker run -ti --rm --name server --tmpfs /data_oncontainer alpine:latest`
![image.png](https://images.viblo.asia/b2641fd6-8bbe-4524-8398-3b73bec08fea.png)
Inmemory storage sử dụng tmpfs cho phép tốc độ đọc ghi nhanh chóng nhưng có hạn chế là khi bạn khởi động lại hoặc tắt container thì dữ liệu trong vùng nhớ đó sẽ mất.
### 1.3. Docker volume
Đây là chủ đề chính của phần này nên mình sẽ đi sâu về docker volume trong phần **II. Docker volume**
## II. Docker volume
### 2.1. Docker volume là gì
Docker volume được đặt tên là cây hệ thống tệp do Docker quản lý. Chúng có thể được triển khai với lưu trữ đĩa trên hệ thống tệp của host hoặc một phần mềm phụ trợ khác lạ hơn như lưu trữ đám mây. Sử dụng volume là một phương pháp tách bộ nhớ khỏi các vị trí chuyên biệt trên hệ thống tệp mà bạn có thể chỉ định bằng các liên kết gắn kết.

Docker volume hỗ trợ việc chia sẻ dữ liệu giữa các container với nhau.

Cần phải thực hiện tạo volume trước khi chạy các container sử dụng volume đó.

### 2.2. Quản lý Docker volume
**Tạo volume**\
`docker volume create --driver local --label example=location sharing`
![image.png](https://images.viblo.asia/ed2f759e-bb35-47e5-a955-42d3f1e06c02.png)\
Lệnh thêm cờ *--driver và --label* để thêm thông tin cho volume.

**Liệt kê các volume**\
`docker volume ls`    
![image.png](https://images.viblo.asia/2c5618a0-f0dd-4d64-828b-249468ea52a5.png)

**Xem cấu hình volume** \
`docker volume inspect sharing`
![image.png](https://images.viblo.asia/9e9bbd3f-0631-4d3c-8453-8c593ee6333a.png)

**Khởi tạo container với volume đã tạo**\
`docker run -ti --rm --name server --volume=sharing:/data_oncontainer alpine:latest`\
`docker run -ti --rm --name server --mount source=sharing,target=/data_oncontainer alpine:latest`
![image.png](https://images.viblo.asia/8c02929f-d332-44ee-a87c-c2de299a34fc.png)

Trong một số trường hợp bạn có thể đặt quyền chỉ đọc cho container ở mode readonly\
`docker run -ti --rm --name server --volume=sharing:/data_oncontainer:ro alpine:latest`

**Link container mới với một container đã sử dụng volume**\
`docker run -ti --rm --name client --volumes-from server alpine:latest`\
![image.png](https://images.viblo.asia/5ca10c36-8d9c-438f-94a3-6379d59a553b.png)\
Việc này cũng tương đương với việc bạn tạo một container mới với cờ *--volume=sharing:/dataoncontainer* . Nhưng nó hữu ích trong các trường hợp bạn muốn liên kết các container mà bạn nhớ tên container mà không nhớ tên volume. Nhược điểm là bạn sẽ không thay đổi được đường dẫn thư mục chia sẻ trên container client.

**Xóa volume**\
`docker volume rm sharing`                       
![image.png](https://images.viblo.asia/64635985-ab4e-4a77-9298-2884c26e2905.png)

Nếu bạn muốn xóa toàn bộ các volume có thể sử dụng (cân nhắc kỹ trước khi thực hiện lệnh này ).\
`docker volume prune`

***Cám ơn mọi người đã đọc bài viết của mình và khi đọc xong xin cho mình ý kiến phản hồi. Bài viết sau có hay hơn chính là nhờ vào các ý kiến phản hồi của các bạn. Nếu thấy bài viết có ích thì cho mình 1 upvote. Mình xin cám ơn.***