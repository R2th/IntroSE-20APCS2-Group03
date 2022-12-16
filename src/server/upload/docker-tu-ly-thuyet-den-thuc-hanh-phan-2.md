Xin chào các bạn, ở phần trước chúng ta đã làm quen với docker, vòng đời và một số lệnh thông dụng với docker container. Hy vọng các bạn đã thực hành đủ nhiều để nhớ và hiểu được ý nghĩa của từng lệnh, cũng không quá khó hiểu phải không?

Trong phần 2 này mình sẽ giới thiệu tiếp đến các bạn nhưng nội dung rất quan trọng mà bất kỳ người dùng docker nào cũng cần phải nắm được. Đó là cách quản lý docker container, liên kết giữa các container như thế nào. Không để mất thời gian của các bạn, chúng ta sẽ bắt đầu ngay và luôn.
## 1. Quản lý container
Thực sự khi thao tác với terminar và nhìn vào đầu ra của một container khi nó chạy xong là điều không hề dễ chịu, khi bạn chạy một container và nó gặp lỗi thì bạn sẽ muốn tìm hiểu xem chuyện gì đã xảy ra, lệnh `docker logs` sinh ra để giúp chúng ta làm việc này.
### docker logs
- Xem ouput của container miễn là container đó vẫn còn tồn tại, chúng ta có thể dùng `docker logs container_name`
Ví dụ ở đây mình có container có tên là **app** bật chế độ chạy ngầm **-d** với tiến trình là **bash** , câu lệnh chạy trong bash là in ra nội dung file etc/sysctl.conf.

![](https://images.viblo.asia/3f20e70e-0f2e-4ca8-924f-a60c085ea9a8.png)

tuy nhiên các bạn có thể thấy thay vì sử dụng `cat /etc/sysctl.conf` mình lại ghi nhầm là `cot /etc/sysctl.conf`. cho nên nội dung file đã không được in ra. Khi đó để xem lỗi ở đâu mình dùng lệnh `docker logs app`, chúng ta có thể thấy ngay lỗi được log lại là `cot: command not found`.

Các bạn lưu ý là không bao giờ được để cho output của container được quá to, qua nặng. Nên xóa những container nào không dùng đến, nếu để log phình quá to sẽ làm cho máy bị chậm.

### Giới hạn tài nguyên mà container có thể sử dụng
Chúng ta hoàn toàn có thể giới hạn tài nguyên cho container, bao gồm giới hạn memory hoặc cpu mà container sử dụng.

- Giới hạn memory
>> docker run --memory <total memory limit> <image> <command>
>> 
>> Ví dụ : docker run --memory 512M ubuntu bash

- Giới hạn CPU
>> docker run --cpu -shares=<limit><image><command>
>> 
>> Ví dụ: docker run --cpu -shares=20 ubuntu bash
>> 

## 2. Mạng nội bộ trong container
Docker cung cấp một mạng nội bộ cho các container trong hệ thống, tuy nhiên chúng ta hoàn toàn có thể tự tạo ra các mạng riêng và chia các container về các nhóm mạng tương ứng, tùy vào mục đích, làm vậy sẽ tránh được việc một container không liên quan sẽ vô tình can thiệp vào mạng của container khác.

Chúng ta hoàn toàn có thể quyết định container nào sẽ liên kết với container nào và ở cổng gì, điều này được hỗ trợ bằng phương thức expose cổng và link container.

### docker networking
Trong docker chúng ta có các mạng cơ bản sau :
>> docker network ls
>> 

![](https://images.viblo.asia/2bf19f2a-052e-4b2d-bfc9-fdcbb079a4cb.png)


Để liệt kê các container có trong network chúng ta có command: `docker inspect network network_name`
Ví dụ:
>> docker inspect network bridge
>> 

![](https://images.viblo.asia/ae89b344-6b5a-44d3-8850-ca108c587c15.png)

Để tạo ra một network riêng dựa trên driver bridge chúng ta có thể làm như sau
>> docker network create -d bridge private_network
>> 
![](https://images.viblo.asia/6d5ded7b-f1f7-47a7-a098-d7940c2f2653.png)

Bây giờ chúng ta có thể tạo một container join vào network vừa tạo, ta sẽ join hai container `box` và `web` vào mạng private_network như sau
>> docker run --name=web -it --net=private_network ubuntu:latest bash
>> 
>> docker run --name=box -it --net=private_network ubuntu:latest bash
>> 
Sau đó kiểm tra trong mạng private_network ta sẽ thấy
![](https://images.viblo.asia/114e61b5-6249-405c-8733-69d64602bb3d.png)

Như vậy là 2 container đã join được vào mạng private_network

### Liên kết container thông qua host
Chúng ta sẽ thực hiện liên kết 2 container thông qua host bằng cách, container 1 liên kết với host và từ host liên kết với container thứ 2

Ví dụ chúng ta sẽ cùng khởi tạo 1 container đóng vai trò là server ở terminal bên trái, và 1 container đóng vai trò client ở bên phải

![](https://images.viblo.asia/b2867454-e144-4c4e-9e6a-d7c24b2c2005.png)

Ở phía trái chúng ta khởi tạo 1 container lắng nghe cổng 111 và expose ra ngoài thông qua cổng 111. Cổng expose này dùng để các container khác gửi dữ liệu vào.

Sau đó chúng ta gõ lệnh `ipconfig` để biết ip của host là `172.17.0.1` và dùng netcat để lắng nghe sự thay đổi qua cổng 111 của container bên trái bằng lệnh 'nc -l 111', tham số `-l` có nghĩa là listen.

Tại terminal bên phải chúng ta tạo container client để gửi thông tin dạng text đến server ở bên phải bằng lệnh 'nc 172.17.0.1' thông quả cổng 111 đã được container 1 expose ra ngoài.

Sau khi đã listen chúng ta hoàn toàn có thể gửi dữ liệu từ client sang server, vậy là thông tin được chuyển từ container client đến host rồi được chuyền đến container server đang listen.

### Liên kết trực tiếp hai container
Chúng ta có một cách khác để liên kết hai container với nhau mà không thông qua host đó là liên kết trực tiếp giữa chúng, cách làm này có một số ưu và nhược điểm hơn so với cách trên.
* Thường được dùng để kiểm tra xem container đang chạy gì và ở chỗ nào
* Kết nối tất cả các cổng, nhưng 1 chiều
* Chỉ dùng cho những dịch vụ mà không thể chạy trên nhiều máy khác nhau
* Liên kết trực tiếp các container mang tính rủi ro cao nếu cách dịch vụ dùng nhiều container không được bật và tắt cùng lúc.

![](https://images.viblo.asia/87f85275-9ca6-4966-a3aa-e2a59cc0ae7c.png)

Tại terminal bên phải chúng ta link trực tiếp tới container bên trái thông qua param `--link`. Khi đó chúng ta có thể gửi data mà không cần phải dùng IP của host.
### Liên kết động giữa các container
Để khắc phục tình trạng đứt kết nối giữa 2 cách trên chúng ta có một cách là tự tạo ra mạng riêng để nhóm các container lại với nhau, thông qua ví dụ dưới đây
![](https://images.viblo.asia/36c44cbe-7d85-4891-9780-6d3f03d13918.png)
Lúc này mỗi khi server container bị exit và khi được khởi động lại, network của chúng ta sẽ đánh lại địa chỉ IP cho nó và client có thể tiếp tục gửi data thông qua ip mới này.

### Mở cổng container
Chung ta thường khó khăn trong việc lựa chọn cổng container , cho nên các bạn cần lưu ý một số điểm sau:
* Cần sự phối hợp giữa các container
* Dễ dàng tìm kiếm cổng được mở
* Công bên trong container là cố định
* Công bên ngoài container là ngẫu nhiên
* Cho phép nhiều container chạy các chương trình với cổng cố định
* Thường được sử dụng với chương trình tìm kiếm dịch vụ

### Mở cổng UDP
Mặc định cổng của container là TCP, nếu chúng ta muốn chuyển đổi sang cổng UDP thì sẽ làm như thế nào:
>> docker  run  -p outside-port:inside-port/protocol (TCP/UDP)
>> 
>>Ví dụ: docker run -p 111:222/udp
udp là option thêm vào nếu muốn port là UDP, còn mặc định docker sẽ tự hiểu là TCP bạn không cần điền gì.

## 3. Lời kết
Trong phần 2 này mình đã giới thiệu cho các bạn cách quản lý docker container và liên kết giữa chúng như thế nào, vì phần này mình cũng đang tiện tìm hiểu và tham khảo được ở một vài nguồn khá hay nên mạo phép đem ra chia sẻ cùng mọi người, có thể là văn phong khá khó hiểu nên mong các bạn thông cảm. Cảm ơn tất cả các bạn!

## 4. Tài liệu tham khảo
https://techmaster.vn/

https://www.docker.com/