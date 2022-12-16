Trong phần trước mình đã giới thiệu về `Docker Image` và `Docker Container` rồi các bạn có thể tham khảo  [ở đây](https://viblo.asia/p/tim-hieu-co-ban-ve-docker-Do754j0XZM6). Thì trong bài viết này mình muốn chia sẽ cho các bạn thêm cho các bạn thêm về phần kiến thức Docker. Chúng mình cùng tìm hiểu nhé :)
# 1.Docker Volume ?
Thì như các bạn biết đấy `Docker Container` nó cũng tương tự như máy ảo, nhưng điều quan trọng khác biệt của nó với một máy ảo ở chỗ `Docker COntainer` không hề chạy độc lập với môi trường xung quanh như một máy ảo bình thường như : Virtual Box,.... Một `Docker Container` chia sẻ các Linux kernel với hệ điều hành , có nghĩa là nếu như ngày trước chúng ta các bạn có chạy `Virtual Box` và các bạn cài đặt môi trường hệ điều hành Linux lên chẳng hạn thì nó luôn luôn yêu cầu bạn phải chọn vùng nhớ cho nó và máy ảo chạy độc lập so với môi trường hệ điều hành máy chủ của chúng ta, nhưng `Docker Container` không cần như vậy, nó không cần phải khời động như một máy ảo. 

Chết mở bài dài quá, giờ vào trả lời câu hỏi `Docker Volume là gì` này :))) 
```
Docker Volume được dùng để chia sẻ dữ liệu cho các container.
```
Bạn cứ tưởng tưởng nhá, khi chúng ta khời tạo một container lên thì chúng ta cần chỗ để lấy hoặc lưu dữ liệu . Dữ liệu này có thể được lưu mãi mãi hoặc bị xóa ngay khi container bị xóa đi. Khu dữ liệu được lưu lại thì các container khác có thể dùng dữ liệu này.
Dưới đây là một số tính năng của `Docker Volume`:
* Dữ liệu `volume` được chia sẻ và có thể nhiều container sử dụng chung với nhau.
* Các thay đổi trên `volume` sẽ được chia sẻ với file hệ thống của `host`.
* Khi chúng ta cập nhật một `image` thì `volume` sẽ có sự thay đổi.
* Dữ liệu ở `volume` cố định dù container có bị remove đi.
# 2. Docker Data Volume Container
`Docker Data Volume Container` nó cũng giống như các container khác nhưng chúng chỉ sử dụng để lưu trữ. Chúng ta có thể sử dụng việc lưu trữ dữ liệu của container này dùng cho các container khác. Khi chúng ta ghi dữ liệu vào file system của container, nó sẽ ban đầu được ghi vào vùng lưu trữ của container.
 Có 3 trường hợp sử dụng `Docker Data Volume`:
*  Lưu trữ lại dữ liệu của container khi container đó bị xóa.
*  Có thể chia sẻ dữ liệu giữa các hệ thống tập tin máy chủ và container.
*  Có thể chia sẻ dữ liệu với các container Docker khác.

## Create Data Volume Container
```
docker create -v /data --name datacontainer ubuntu
```

Câu lệnh trên tạo ra một container tên là `datacontainer` có `data volume` dựa trên ubuntu image trong thư mục /data. Bây giờ chúng ta chạy một container Ubuntu mới với tùy chọn `--volumes-from` và chạy bash thì bất cứ thứ gì mà ta lưu ở thư mục `/data` sẽ được lưu vào thư mục `/data` volume của container `datacontainer`.

```
docker run -it --volumes-from datacontainer ubuntu /bin/bash
```

Ta chú ý tùy chọn `-it` ở đây có nghĩa là tạo các kết nôi tương tác và chạy terminal trong container.
Tạo ra 1 tập tin trong `/data`
```
echo "Hello World" > /data/index
```

Sau đó chúng ta gõ exit để quay trở về host của chúng ta. Rồi chúng ta lại chạy lệnh 
```
docker run -it --volumes-from datacontainer ubuntu /bin/bash
```

```
cat /data/index
```

Output sẽ là 
```
Hello World
```

# 3. Hooking a Volume to Nodejs Source Code
Đầu tiên chúng ta sẽ tạo 1 project express nodejs bằng câu lệnh sau, ở đây mình sẽ dùng `npm` để tải project về.
```
npm express express generator -y
```
Tiếp theo chúng ta tạo 1 project nodejs default về
```
express ExpressSite -hbs
cd ExpressSite 
npm install
```
Sau đó để test xem là project đã được chạy được hay chưa thì chúng ta sẽ dùng câu lệnh `npm start` và vào đường dẫn `localhost:3000`. 

Tiếp theo chúng ta sẽ pull một image `node` về máy của chúng ta.
```
docker pull node
```

Sau khi chúng ta pull được image về rồi, chúng ta sẽ khởi tạo `volume`. Đầu tiên nếu chúng ta muốn khời tạo `volume` trong `container` thì chúng ta sẽ tạo như sau:
```
docker run -p 8080:3000 -v /var/www node
```
Khi chúng ta dùng câu lệnh `docker inspect id_container`
thì chúng ta sẽ thấy đoạn thông tin sau
```
"Mounts": [
            {
                "Type": "volume",
                "Name": "0eefed98eed2ab7351ce7f9cbcc857af3f9f909a752faf5afc70ea9a40227363",
                "Source": "/var/lib/docker/volumes/0eefed98eed2ab7351ce7f9cbcc857af3f9f909a752faf5afc70ea9a40227363/_data",
                "Destination": "/var/www",
                "Driver": "local",
                "Mode": "",
                "RW": true,
                "Propagation": ""
            }
        ],
```
Chúng ta đã thấy volume được tạo trong container ở thư mục `/var/www`.

Tiếp đến chúng ta muôn mount source code express nodejs của chúng ta vào container để chạy thì chúng ta sẽ làm như sau:
```
docker run -p 8080:3000 -v $(pwd):/var/www -w "/var/www" node npm start
```
Ròi chạy đến đây rồi thì chúng ta đã chạy được project lên rồi đúng không.
# 3.Conclusion
Trên đây là những gì mình tìm hiểu được về Docker, mong rằng mang đến được phần nào những kiến thức bổ ích cho các bạn. Cảm ơn các bạn đã đọc bài viết của mình.
# 4. Reference
https://tecadmin.net/tutorial/docker/docker-data-volumes/