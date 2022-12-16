Chào mọi người, sau 2 bài viết về các phương pháp phát hiện live host và scan port bằng nmap, hôm nay mình sẽ hướng dẫn xây dựng 1 công cụ đơn giản có thể quét live host và scan port bằng cách tạo ra các gói tin, gửi chúng đi và chờ đợi phản hồi. Từ các phản hồi, ta có thể phân tích và đưa ra các kết quả.

Để hiểu rõ cách hoạt động của các phương pháp scan, từ đó giúp xây dựng gói tin, các bạn nên đọc qua 2 bài viết trước của mình nằm trong series này. 

Link port scan: https://viblo.asia/p/nmap-port-scan-cac-phuong-phap-quet-cong-tu-co-ban-den-nang-cao-gDVK2PMwlLj


Link live host scan: https://viblo.asia/p/nmap-live-hosts-discovery-6J3ZgpJWlmB
## 1. Cài đặt module scapy (python3)
Như những module khác của python, các bạn cài đặt scapy với cú pháp như sau:``` pip install scapy```

## 2. Xây dựng layer với scapy
Đầu tiên, ta import scapy ```from scapy.all import *```

Với scapy, nó hỗ trợ cho ta tất cả các layer, ví dụ như Ether(), ARP(), IP(), UDP(), TCP(),...

Một số function cơ bản cần phải nhớ

- sumary(): Show một cách tóm tắt gói tin
- show(): Show chi tiết gói tin
- srp(): Gửi và nhận gói tin đi ở layer 2
- sr(): Gửi và nhận gói tin đi ở layer 3 
- sendp(): Gửi gói tin ở layer 2
- send(): Gửi gói tin ở layer 3
Ví dụ dưới đây mình sẽ tạo ra 1 gói tin với layer IP, thực hiện 2 func show và sumary.

![](https://images.viblo.asia/9bbacd3c-7c0f-4e9e-b558-ff69b68b8d71.png)
Sau khi sử dụng function show() để hiển thị các giá trị trong layer, ta có thể thực hiện sửa đổi giá trị trong layer, ví dụ mình thực hiện thay đổi ```src``` trong layer IP: 
```pkt = IP(src=192.168.1.1)```
## 3. Xây dựng các packet
Trong scapy, các packet được xây dựng từ các layer, để kết hợp các layer lại với nhau, ta sử dụng ```/```,  theo thứ tự từ layer thấp đến layer cao. Ví dụ: ```pkt = Ether()/ARP()/IP()```
### 3.1 Host discovery 

- **ARP**: ```pkt = Ether(dst='ff:ff:ff:ff:ff:ff')/ARP(pdst=ipdest)```

Trong đó, dst trong Ether layer là MAC address của địa chỉ đích, ở đây cần gửi cho tất cả các máy nên mình sẽ để địa chỉ là broadcast address, pdst là vùng địa chỉ ip đích cần quét, ví dụ 192.168.1.* 
Sau đó mình tiến hành gửi gói tin đi và nhận lại kết quả với hàm srp()

```
ip = 'scanme.nmap.org'
ans, unans = srp(Ether(dst='ff:ff:ff:ff:ff:ff')/ARP(pdst=ip), timeout = 3)
```
Nếu có kết quả trả về, tức là host live, điều này mình sẽ không giải thích nữa vì đã nói trong các bài trước.Tương tự như vậy, ta có thể xây dựng các gói tin để quét ICMP, SYN ping, ACK ping và UDP ping, hay port scan. Mình sẽ gửi link github với code đã xây dựng xong của mình cho các bạn tham khảo, tuy nhiên mình nghĩ mng nên tự xây dựng và thử nghiệm, từ đó có thể hiểu chi tiết cách hoạt động của các phương pháp này.

Link github: https://github.com/vuongle-vigo/scanport