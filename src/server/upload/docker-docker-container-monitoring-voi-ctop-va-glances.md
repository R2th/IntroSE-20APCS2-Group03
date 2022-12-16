Chào mọi người, **Happy New Year 2022**  🎉🎉🎉    mọi người. Tiếp tục bài viết chủ đề về **Docker** hôm nay mình chia sẻ mọi người cách **Monitor** các **Container** bằng 2 cách đó là dùng **CTOP** và **Glances** .
# Giới thiệu
Khi mọi người triển khai và sử dụng Docker trong các dự án của mình. Mọi người muốn theo dõi dung lượng **RAM, CPU, Network, Disk** sử dụng cho các Container đó thường quan tâm đến Monitor. Hôm nay mình chia sẻ mọi người 2 cách để Monitor chúng nhanh và đơn giản.

- **Ctop** - Công cụ giám sát  Container bằng command line trực quan và realtime.
- **Glances** Giám sát Container qua giao diện trên trình duyệt.

## Cài đặt
## CTOP
**CTOP** là một cli đơn giản để bạn cài đặt và sử dụng trên Linux, Macos. Nguồn cài đặt mọi người tham khảo [tại đây](https://github.com/bcicen/ctop). 

![](https://images.viblo.asia/4fa7096d-8159-4db7-86e6-c8ba44242249.gif)

**CTOP** mô tả trực quan các thành phần **CPU, MEM, NET** mà các container đang sử dụng.

Nếu dùng Docker bạn có thể cài chúng đơn giản như sau:
```
docker run --rm -it --name ctop-container \
--volume /var/run/docker.sock:/var/run/docker.sock:ro \
quay.io/vektorlab/ctop:latest
```
 Các **Option** đi kèm sau lệnh ctop mà bạn sử dụng: 

**-a**	show active containers only

**-f** <string>	set an initial filter string
    
**-h**	display help dialog
    
**-i**	invert default colors
    
**-r**	reverse container sort order
    
**-s**	select initial container sort field
    
**-v**	output version information and exit
## GLANCES   
   Giám sát tất cả các Container của bạn đang chạy bằng giao diện web dựa trên console của OS (UI: console / Web + API).
    
   **Glances** được viết bằng Python và sử dụng các thư viện để lấy thông tin từ hệ thống. Nó dựa trên một kiến trúc mở, nơi các nhà phát triển có thể thêm các plugin mới hoặc truy xuất các mô-đun.
    
   Cài **Glance** khá đơn giản bằng docker. Bạn tham khảo image đóng gói trên docker hub [tại đây](https://hub.docker.com/r/nicolargo/glances/).
```
docker run -d --restart="always" -p 61208-61209:61208-61209 -e GLANCES_OPT="-w" -v /var/run/docker.sock:/var/run/docker.sock:ro --pid host docker.io/nicolargo/glances
```
 Sau khi cài xong các bạn vào trình duyệt gõ: http://ip:61028
    
![](https://images.viblo.asia/5c6e5c0b-babf-4f62-9f66-c2b7e92f2a19.png)

 Các bạn sẽ thấy tất cả những thông tin của OS và các Container đang chạy
  ![](https://images.viblo.asia/5e514cc7-f45d-4d44-9250-fd6fcb7419bf.png)

   Các bạn có thể **public** port để có thể xem trên máy tính, điện thoại hoặc ipad từ xa.     

# Lời kết
   Trên đây là 2 cách mà mình sử dụng để monitor container khi triển khai Docker. Hi vọng sẽ hữu ích với các bạn. 
    
   Chúc các bạn thành công.!
    
  **Tham khảo:**
   
   https://github.com/bcicen/ctop
    
   https://hub.docker.com/r/nicolargo/glances/