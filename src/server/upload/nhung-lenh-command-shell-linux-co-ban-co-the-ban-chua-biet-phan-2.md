## locate
Khi bạn muốn tìm một file được lưu trữ trên máy tính, nhưng không nhớ rõ là được lưu ở đâu, chỉ nhớ mang máng tên file. Thì không cần lo lắng mất thời gian đi tìm, câu lệnh locate sẽ giúp bạn tìm những chỗ có file giống với tên bạn muốn tìm
```
locate ten_can_tim
```
- Sử dụng thêm option -i thì locate sẽ tìm mà không phân biệt chữ hoa chữ thường

```locate -i ten_muon_tim```

- Trong trường hơp bạn muốn kết hợp tìm kiếm tên file có chứa nhiều từ
 
```locate -i ten_can_tim1*ten_can_tim2```

 Thêm dấu * vào giữa locate sẽ tìm kiếm tất cả những file nào có chưa 2 từ `ten_can_tim_1` và `ten_can_tim_2`
## sudo
Trong quá trình sử dụng linux, bạn rất hay phải cài đặt soft hay run 1 file nào đó.  Đôi khi sẽ gặp lỗi permisstion khiến bạn không thể cài đặt hoặc run file được.
Đừng lo lắng, hãy thêm sudo vào trước câu lệnh rồi chạy thôi. `sudo` sẽ chạy câu lệnh của bạn dưới quyền root, quyền cao nhất của linux.

```sudo apt-get install abc-software```

Câu lệnh sudo là vạn năng, nhưng bạn không nên quá lạm dụng, phụ thuộc vào nó. Đôi khi 1 thao tác xóa nhầm file hệ thống mà lại có thêm sudo thì dễ toang lắm nhé
## ping
Khi bạn muốn kiểm tra trạng thái kết nối của bạn đến server, để xem có thể kết nối đến được không và xem thời gian phản hồi từ server

```ping google.com```
```
ping google.com
PING google.com (172.217.24.206) 56(84) bytes of data.
64 bytes from hkg12s13-in-f14.1e100.net (172.217.24.206): icmp_seq=1 ttl=116 time=56.2 ms
64 bytes from hkg12s13-in-f14.1e100.net (172.217.24.206): icmp_seq=2 ttl=116 time=54.3 ms
64 bytes from hkg12s13-in-f14.1e100.net (172.217.24.206): icmp_seq=3 ttl=116 time=52.7 ms
64 bytes from hkg12s13-in-f14.1e100.net (172.217.24.206): icmp_seq=4 ttl=116 time=53.1 ms
64 bytes from hkg12s13-in-f14.1e100.net (172.217.24.206): icmp_seq=5 ttl=116 time=54.3 ms
64 bytes from hkg12s13-in-f14.1e100.net (172.217.24.206): icmp_seq=6 ttl=116 time=53.6 ms
^[64 bytes from hkg12s13-in-f14.1e100.net (172.217.24.206): icmp_seq=7 ttl=116 time=54.1 ms
64 bytes from hkg12s13-in-f14.1e100.net (172.217.24.206): icmp_seq=8 ttl=116 time=54.7 ms
^C
--- google.com ping statistics ---
8 packets transmitted, 8 received, 0% packet loss, time 7013ms
rtt min/avg/max/mdev = 52.770/54.186/56.296/1.049 ms
```
## wget
một command vô cùng hữu ích của linux giúp bạn tải xuống tập tin trên internet từ command shell, sử dụng wget và link tải ở phía sau

```wget https://www.example.com/demo.txt```
## top
Bạn muốn kiểm tra thông tin cpu, ram, network giống như task manager trên window. Câu lệnh top sẽ giúp bạn thực hiện điều này
```top```

![](https://images.viblo.asia/6a05c07c-ae60-4d1d-bde9-e8915a4f11cd.png)
## htop
Một câu lệnh khác hỗ trợ giống như task manager trên window nhưng giao diện đẹp hơn, trực quan hơn so với `top` là `htop`

![](https://images.viblo.asia/b8a3e6e1-7add-481b-835c-12588570f036.png)
Nhưng câu lệnh htop này thì không có sẵn trên linux, ubuntu. Bạn muốn dùng câu lệnh này thì phải cài thêm soft htop

```sudo apt-get install htop```
## man
Khi bạn không biết một lệnh chạy như thế nào. Bạn sợ chạy nhầm câu lệnh sẽ gây ra hậu quả khó lường. Yên tâm đi, `man` sẽ giúp bạn học cách chạy câu lệnh sao cho đúng

Có thể coi man như là 1 bộ help cho các lệnh command trên linux

``` man tail```

![](https://images.viblo.asia/6acbcdd3-3590-4178-a81e-71af4fcc16c3.png)
## echo
Bạn đang muốn bổ sung thêm text vào 1 file nào đó, mà không muốn sử dụng nano hoặc mở bằng 1 editor nào đó để thêm, thì có thể sử dụng câu lệnh echo

``` echo "test text" >> demo1.txt```

Khi sử dụng echo thì nội dung sẽ được thêm vào cuối cùng của file. Rất nhanh chóng phải không
## zip and unzip
- Sử dụng câu lệnh `zip` để tiến hành nén 1 file hoặc nhiều files thành 1 file nén

``` zip -r ten_file.zip file1 file2```

- Giải nén sử dụng câu lệnh `unzip`

```unzip ten_file.zip```
## adduser, userdel
Linux là 1 hệ thống đa người dùng, có thể cho phép nhiều người sử dụng cùng 1 lúc
- Muốn tạo 1 user mới cho hệ thống linux của bạn, sử dụng câu lệnh adduser

``` sudo adduser username ```
Đối với những máy cài linux version cao, thì nó sẽ hỗ trợ gọi câu lệnh tạo password và group cho user mới trong 1 câu lệnh adduser đó luôn.

Còn đối với linux version thấp thì bạn phải tự gõ lệnh passwd để set mật khẩu cho user mới

- Muốn xóa 1 user khỏi hệ thống bạn sử dụng câu lệnh userdel

``` userdel username```

Cậu lệnh trên sẽ xóa user ra khỏi hệ thống linux của bạn

## Kết
Trên đây là 1 số câu lệnh thường sử dụng nhiều trên linux. Ở bài viêt sau mình sẽ tổng hợp thêm những câu lệnh thường dùng khác, để giúp các bạn mới sử dụng linux có thể tiếp cận linux 1 cách nhanh nhất.