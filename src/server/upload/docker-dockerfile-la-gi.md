# Dockerfile là gì?
Dockerfile là một tệp tin gồm tập hợp các chỉ thị, mà khi docker gọi tệp tin đó, nó có thể tự động tạo thành các image. Tham khảo thêm
https://docs.docker.com/engine/reference/builder/
# Một số lệnh dùng trong Dockerfile:

**FROM** Là base image để chúng ta tiến hành build một image mới. Chỉ thị này phải được đặt trên cùng của Dockerfile
```
FROM <image> [AS <name>]
FROM <image>[:<tag>] [AS <name>]
FROM <image>[@<digest>] [AS <name>]
MAINTAINER Chứa thông tin của tác giả tiến hành build image.
```
**RUN** Được dùng khi muốn cài đặt cái gói bổ sung trong quá trình build image.

```
RUN <command>
RUN [“executable”, “param1”, “param2”]
```
**COPY** Chỉ thị này dùng để copy tệp tin hoặc thư mục mới từ source (src) và chuyển đến destination (dest) trong hệ thống tệp tin của container. Source ở đây có thể là đường dẫn local host hoặc URL. COPY có 2 forms:
```
COPY [–chown=<user>:<group>] <src>… <dest>
COPY [–chown=<user>:<group>] [“<src>”,… “<dest>”] (yêu cầu đường dẫn chứa khoảng trắng)
```
**ENV** Định nghĩa các biến môi trường
```
ENV <key> <value>
ENV <key>=<value> …
```
**EXPOSE** Dùng khai báo các listen port của container.
```
EXPOSE <port> [<port>/<protocol>…]
```
Kết hợp với tham số -p để expose port của container ra bên ngoài (NAT port)

**CMD** Là chỉ thị cho biết lệnh nào được thực hiện mỗi khi khởi tạo container. Trong Dockerfile chỉ có duy nhất một chỉ thị CMD
```
CMD [“executable”,”param1″,”param2″] (exec form, this is the preferred form)
CMD [“param1″,”param2”] (as default parameters to ENTRYPOINT)
CMD command param1 param2 (shell form)
```
**ENTRYPOINT** cho phép cấu hình một container mà chạy như một lệnh thực thi. ENTRYPOINT sẽ ghi đè lên các phần tử mà được sử dụng bởi chỉ thị CMD.
```
ENTRYPOINT [“executable”, “param1”, “param2”] (exec form, preferred)
ENTRYPOINT command param1 param2 (shell form)
```
##### Ví dụ: docker run -it centos top -H

Tương tác **CMD** và **ENTRYPOINT**. Cả 2 lệnh đều xác định lệnh nào được thực hiện khi chạy một container.

Có vài quy tắc trong sự tương tác giữa 2 lệnh:

Tối thiểu sẽ có 1 chỉ thị được chỉ định trong Dockerfile (tất nhiên là có thể 2 chỉ thị đều xuất hiện trong Dockerfile)
 - **ENTRYPOINT** được định nghĩa khi sử dụng container như một lệnh thực thi
 - **CMD** được sử dụng như một cách để xác định các tham số mặc định cho chỉ thị ENTRYPOINT hoặc thực thi một lệnh trong một container
- **CMD** sẽ bị ghi đè khi chạy container với các tham số xen kẽ.
##### Ví dụ  về CMD & ENTRYPOINT trong Dockerfile:
```
ENTRYPOINT [“/usr/sbin/apache2ctl”]
CMD [“-D”, “FOREGROUND”]
ADD
```
Chỉ thị **ADD** dùng để copy tệp tin, thư mục hoặc tệp tin với URL từ source (src) và thêm chúng đến đường dẫn đích (dest) trong hệ thống tệp tin của image.

**ADD** có 2 forms:
```
ADD [–chown=<user>:<group>] <src>… <dest>
ADD [–chown=<user>:<group>] [“<src>”,… “<dest>”] (this form is required for paths containing whitespace)
```
**Note**: Để ý là sự khác nhau giữa **COPY/ADD**. **COPY** hỗ trợ copy chỉ đường dẫn local; còn **ADD** có thể hỗ trợ copy được tệp tin nén .tar và hỗ trợ đường dẫn URL.

**WORKDIR** Là chỉ thị dùng để thiết lập thư mục làm việc. Nó giống home directory, trong trường hợp này là home directory của container. Khi gọi **WORKDIR** nó sẽ tạo ra thư mục ngay lần gọi đầu và truy cập đến nó như home directory. Nó có thể được dùng nhiều lần trong một Dockerfile.
```
WORKDIR /path/to/workdir
```
**USER**

Được sử dụng để thiết lập user để sử dụng khi chạy image and cho một số chỉ thị: **RUN, CMD & ENTRYPOINT** trong Dockerfile.

**VOLUME**

Dùng để mount file/directories giữa host và container. Mục đích của VOLUME là:
- Giữ được dữ liệu khi container bị remove
- Chia sẻ dữ liệu giữa host và container
- Chia sẻ dữ liệu giữa các container

=>>> Tham khảo thêm về các chỉ thị: https://docs.docker.com/engine/reference/builder

##### Thực hiện build image với Dockerfile
Chúng ta build thử gói cài đặt nginx trên centos:7 base image (CentOS7:nginx). Tạo tệp tin Dockerfile với nội dung sau:
```
FROM centos:7
MAINTAINER TonyLe
RUN yum -y install epel-release && yum -y install nginx
#Running with FOREGROUND
CMD ["nginx", "-g", "daemon off;"]
```
Chạy Nginx ở chế độ **FOREGROUND** ( mặc định thì nginx chạy ở chế độ BACKGROUND – daemon on)

Build image
```
docker build -t TonyLe/CentOS7-Nginx .
```
Run container
```
docker run -it -p 8080:80 TonyLe/CentOS7-Nginx
```
Mình xin kết thúc phần tìm hiểu Dockerfile tại đây.  Thân ái và quyết thắng 🤗

**Tham khảo** https://docs.docker.com/engine/reference/builder/