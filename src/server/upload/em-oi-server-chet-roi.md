Dạo này mới thay đổi công việc, mình không còn được nghe câu này nhiều lắm. nhưng đúng là gần mực thì đen mà gần đèn thì nhớ mực nên mạn phép tản mạn chia sẻ 1 chút "kinh nghiệm" nửa mùa. Hi vọng sẽ có 1 chút hữu ích đối với các anh em amater như mình đang và sắp được nghe câu nói kinh điển ấy.

Bài viết có sử dụng nhiều quan điểm cá nhân, cũng như có sự hạn chế về mặt kiến thức của người viết nên mong các anh chị em thông cảm :D 

![](https://images.viblo.asia/8a3e335d-06bd-419c-ba09-9bba6fdf5ca6.png)

## OOPS! Server chết rồi em ơi
Bạn sẽ làm gì khi đang rảnh rỗi ngồi đánh giá "databases" cùng các huynh đệ thì nhận được yêu cầu kiểm tra gấp hệ thống XYZ đang không vào được?
#### 1. Xác nhận, kiếm tra thông tin
Thông thường các phản hồi này được gửi tới từ end user - những người thường là không có kiến thức về kỹ thuật nên việc đầu tiên là hãy cố gắng làm rõ các thông tin được cung cấp.

Ví dụ: 
- Thời gian gặp vấn đề là bao giờ? Trong bao lâu?
- Hiện tại có đang gặp vấn đề không?
- .....
#### 2. Thông báo đến user nhanh nhất có thể
Thời điểm dầu sôi lửa bỏng, hãy luôn đảm bảo các kênh liên lạc được thông suốt. 
#### 3. Tìm cách khắc phục sự cố nhanh nhất có thể
Thay vì tìm nguyên nhân gốc rễ, hoặc tìm ra người gây ra lỗi, hãy tập trung vào nguyên nhân trực tiếp và khắc phục sự cố trước. Đảm bảo giữ được bình tĩnh khi nói chuyện/trao đổi trong bối cảnh xảy ra sự cố
#### 4. Điều tra nguyên nhân gốc rễ, đưa giải pháp ngắn hạn/ dài hạn
Sau khi hệ thống đã ổn, đào sâu tìm hiểu đưa ra nguyên nhân gốc rễ và các biện pháp để giải quyết triệt để vấn đề. 
#### 5. Tạo ghi chú, chia sẻ, đảm bảo "không tắm 2 lần trên 1 dòng sông"
Ghi chú lại các sự cố, kèm theo kết quả điều tra. Điều này giúp cho các thành viên trong team có thể đọc lại, tránh gặp tình huống tương tự, hoặc tạo cơ sở phán đoán cho các tình huống sự cố khác liên quan.

## Làm thế nào để xác định nguyên nhân?
Trước hết, để làm hệ thống, bạn phải là người hệ thống. Có nghĩa chúng ta sẽ phải trả lời được các câu hỏi kiểu:
- Hệ thống này dùng để làm gì?
- Cấu trúc hệ thống như thế nào?
- Luồng dữ liệu như thế nào?
- Luồng sử dụng như thế nào?
- ..v..v

"Chú không thể làm 1 thứ mà chính mình còn không hiểu nó là cái gì" - 1 tiền bối said

Ví dụ với 1 hệ thống Web, kiến trúc dạng dạng như này:
![](https://images.viblo.asia/30626381-a668-4966-ac6b-bf4dc984aa55.png)
>  Khi nhập 1 địa chỉ Web lên URL ví dụ viblo.asia, trình duyệt sẽ gửi 1 request tới DNS server để phân giải tên miền viblo.asia, đưa ra địa chỉ máy chủ của Viblo và gửi tiếp request đến đó.
> 
>Request đến được với máy chủ Viblo, sẽ đi qua một con Load balancer, nó sẽ chọn 1 trong nhiều replicas web server của Viblo để xử lý request này. Sau đó web server thực hiện render giao diện HTML và gửi nó quay trở lại cho trình duyệt của bạn. Trang HTML này sẽ chứa Javascript, CSS,.. và chúng được trình duyệt tải về từ các service CDN, các đường dẫn (thứ mà được cung cấp trong trang HTML trên).
>
>Cuối cùng thì trình duyệt sẽ kết hợp những thứ trên và hiển thị trang web tới bạn.

Mỗi thành phần đều có khả năng gặp sự cố, bên dưới là 1 số cách khoanh vùng và kiểm tra
#### 1. Kiếm tra status của Server
có thể kiếm tra bằng `ping`
```
anhquan@Thinkpad:/mnt/c/Users/AQ$ ping 104.27.189.151
PING 104.27.189.151 (104.27.189.151) 56(84) bytes of data.
64 bytes from 104.27.189.151: icmp_seq=1 ttl=52 time=92.8 ms
64 bytes from 104.27.189.151: icmp_seq=2 ttl=52 time=124 ms
64 bytes from 104.27.189.151: icmp_seq=3 ttl=52 time=103 ms
64 bytes from 104.27.189.151: icmp_seq=4 ttl=52 time=54.7 ms
--- 104.27.189.151 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4005ms
rtt min/avg/max/mdev = 54.776/116.906/208.511/51.093 ms
```
#### 2. Kiểm tra IP/ Domain có đúng không
Có thể sử dụng `nslookup` để kiếm tra. Về lệnh `nslookup`, có thể xem ở đây
https://quantrimang.com/su-dung-nslookup-de-chuan-doan-dns-server-44280

Ví dụ
```
anhquan@Thinkpad:/mnt/c/Users/AQ$ nslookup viblo.asia
Server:         8.8.8.8
Address:        8.8.8.8#53

Non-authoritative answer:
Name:   viblo.asia
Address: 104.27.189.151
Name:   viblo.asia
Address: 172.67.188.158
Name:   viblo.asia
Address: 104.27.188.151
Name:   viblo.asia
Address: 2606:4700:3037::681b:bd97
Name:   viblo.asia
Address: 2606:4700:3032::ac43:bc9e
Name:   viblo.asia
Address: 2606:4700:3037::681b:bc97
```

#### 3. Kiểm tra Service (Web, DB) có chạy không?
Có thể sử dụng telnet tới cổng chạy service để kiểm tra. Về lệnh telnet bạn có thể tìm được rất nhiều bài viết trên GG, mình xin không đề cập ở đây

Ví dụ:
```
anhquan@Thinkpad:/mnt/c/Users/AQ$ telnet 104.27.189.151 80
Trying 104.27.189.151...
Connected to 104.27.189.151.
Escape character is '^]'.
telnet> Connection closed.
```
Như này nghĩa là cổng 80 (service Web) vẫn đang hoạt động bình thường.
Thông thường MySQL là port 3306, Elasticsearch là 9200

#### 4. Kiểm tra tình trạng RAM/CPU của các server
Một số command phổ biến kiểm tra tài nguyên:
```
free -m                      Check RAM
lsblk, fdisk -l, df -h       Check DISK
top/htop                     Check nhiều thứ =))
ps -aux                      Check process
....
```
#### 5. Phân tích log
Phân tích log cũng là 1 công việc khá mất tay. Tuy nhiên, ghi nhớ 1 điểm quan trọng là hãy khoanh vùng trước khi phân tích quá sâu vào log. Kẻo log thực sự nằm ở server A trong khi ta lại mò kim đáy bể ở server B.

Một số câu lệnh hay sử dụng kết hợp để phân tích log:
```
grep	Tìm các dòng chứa chuỗi được chỉ định
awk	    Phân tách cột và tìm kiếm hàng có điều kiện
sort	Sắp xếp dòng
uniq	Loại bỏ các hàng trùng lặp và đếm
wc	    Đếm số ký tự, số dòng
sed	    Thay thế điều kiện quy định
```

Ví dụ nhỏ:

Cho đoạn log NginX
```
203.0.113.1 - - [03/Nov/2020:12:00:00 +0900] "GET /index.html HTTP/1.1" 200 1000 "http://example.com/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
203.33.113.1 - - [03/Nov/2020:12:10:00 +0900] "GET /index.html HTTP/1.1" 200 1000 "http://example.com/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
203.123.113.2 - - [03/Nov/2020:12:20:00 +0900] "GET /index.html HTTP/1.1" 200 1000 "http://example.com/" "Mozilla/5.0 (Windows NT 6.3; Win64; x64)"
203.111.113.2 - - [03/Nov/2020:12:30:00 +0900] "GET /index.html HTTP/1.1" 200 1000 "http://example.com/" "Mozilla/5.0 (Windows NT 6.3; Win64; x64)"
```
Kiểm tra tấn công chèn script:
```
grep -i "<script>" --color access.log
```
Trích xuất IP nguồn:
 ```
  awk '{print $1}' access.log
  ```
 Check mỗi IP request bao nhiều lần:
 ```
   awk '{print $1}' access.log | sort | uniq -c | sort -rn
 ```
 Bằng cách kết hợp các lệnh trên, chúng ta có thể làm được kha khá thứ đấy 
#### 6. Trace request
Phần này liên quan đến hệ thống network, mình sẽ update sau :D