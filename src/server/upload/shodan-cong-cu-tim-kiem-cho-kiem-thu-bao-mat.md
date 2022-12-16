# Giới thiệu công cụ shodan
## Shodan là gì?
![](https://images.viblo.asia/038b06c1-7d7e-4a06-9d08-180a547df317.png)

Shodan (https://www.shodan.io/) là một công cụ tìm kiếm được thiết kế bởi nhà phát triển web John Matherly (http://twitter.com/achillean). Shodan là một công cụ tìm kiếm khác nhiều so với các công cụ tìm kiếm nội dung như Google, Yahoo hoặc Bing.
Shodan là một công cụ tìm kiếm để tìm các thiết bị trực tuyến trên internet như: máy tính, server, webcam, các thiết bị routers... Nó hoạt động bằng cách quét toàn bộ các các thiết bị trên internet có mở cổng  public ra internet và thực hiện phân tích các dấu hiệu được phản hồi về từ các thiết bị. Sử dụng thông tin đó, Shodan có thể cho bạn biết những thứ như máy chủ web (và phiên bản) nào phổ biến nhất hoặc có bao nhiêu máy chủ FTP ẩn danh tồn tại ở một vị trí cụ thể, hay trả về danh sách các camera có thể truy cập trực tuyến qua internet. Nói chung, với shodan bạn có thể tìm kiếm bất cứ thiết bị nào trên internet miễn là chúng đang có kết nối internet và mở cổng public.

Shodan được sử dụng hiệu quả trong việc kiểm thử bảo mật các thiết bị IOT (Internet Of Thing) qua việc phát hiện nhanh chóng các thiết bị đang trực tuyến và các thiết bị có tồn tại lỗ hổng bảo mật. Shodan hoạt động 24/7 nên dữ liệu của nó luôn được cập nhật một cách nhanh và chính xác nhất.

## Shodan hoạt động như thế nào
Shodan (Sentient Hyper-Optimized Data Access Network) hoạt động theo thuật toán sau:
1. Tạo một địa chỉ IPv4 ([IPV4 là gì](https://vi.wikipedia.org/wiki/IPv4)) một cách ngẫu nhiên.
2. Chọn port (cổng dịch vụ) ngẫu nhiên và thực hiện gửi câu lệnh kiểm tra
3. Xem nội dung phản hồi của thiết bị (Service Banner) từ đó xác định xem đó là loại thiết bị gì và chạy cổng gì
4. Lặp lại quá trình trên nhưng với ip và port mới

Điều này giúp tạo ra sự ngẫu nhiên cũng như đảm bảo tránh gây ra lượng kết nối quá lớn tới một thiết bị một cách liên tục.

Các cổng dịch vụ mà shodan thường xuyên rà quét: (Port 554 – Real Time Streaming Protocol, Port 5060 – SIP, Port 25 – SMTP, Port 161 – SNMP, Port 23 – Telnet, Port 993 – IMAP, Port 22 – SSH, Port 21 – FTP, Ports 8443, 443, 8080, and 80 – HTTPS/HTTP)

# Hướng dẫn sử dụng
## Bước 1: Đăng ký tài khoản
Đăng ký tài khoản trên: https://www.shodan.io. 
Việc đăng ký tài khoản là không bắt buộc nhưng nó giúp bạn có thể tìm kiếm nhiều kết quả hơn cũng như có thể sử dụng các bộ lọc tìm kiếm (net filters, country..)
## Bước 2: Tìm kiếm từ  khóa
Nhập từ khóa cần tìm kiếm vào ô searchbox trên shodan. Ví dụ với từ khóa: Apache
![](https://images.viblo.asia/f35fcca0-2780-4553-a77f-580233959da8.png)

Kết quả trả và các máy chủ apache public, đồng thời cho bạn rất nhiều các thông tin liên quan:
- Total results: Số lượng kết quả
- Results map: Bản đồ mật độ các khu vực trên thế giới có kết quả phù hợp
- Top countries : Top các nước có số lượng tương ứng 
- Top operating systems: Top các hệ điều hành sử dụng
- Top services (Ports): Top các cổng dịch vụ mở
...

Khi vào một địa chỉ IP các bạn có thêm các thông tin như: cổng đang mở, dịch vụ đang chạy, các lỗ hổng ([CVE](https://en.wikipedia.org/wiki/Common_Vulnerabilities_and_Exposures)) của dịch vụ..

![](https://images.viblo.asia/f35fcca0-2780-4553-a77f-580233959da8.png)

Để kết quả tìm kiếm chính xác hơn, các bạn có thể sử dụng thêm dấu "", kết hợp các toán tử +  để có thể có nhiều hơn hoặc  - để lọc bớt các kết quả không mong muốn. Ví dụ: Apache + os:windows
![](https://images.viblo.asia/afc52dae-c653-46b6-83b4-0743996e32e8.png)
## Tìm kiếm shodan có được coi là phạm pháp?
CNN Business đã gọi Shodan là công cụ tìm kiếm đáng sợ nhất trên Internet. Từ góc độ người dùng, một công cụ tìm kiếm cung cấp những thông chi tiết và sâu và các thiết bị hay một số thông tin riêng tư. Tuy nhiên, Shodan hoàn toàn hợp pháp và không vi phạm luật. Về bản chất, shodan chỉ thu thập dữ liệu đã có sẵn trên internet và shodan chỉ đơn giản là báo cáo những gì nó tìm thấy.
# Tìm kiếm hiệu quả hơn với shodan
Ngoài các tìm kiếm cơ bản, để dử dụng hiệu quả shodan hơn các bạn cần biết sử dụng kết hợp các bộ lọc (filter) một cách chính xác và "thông minh". Sau đây là các bộ lọc mà các bạn có thể sử dụng kết hợp:
## Các bộ lọc
Cấu trúc sử dụng filter: ***filtername:value***

**- city**: Tìm kiếm các thiết bị trong một thành phố cụ thể sử dụng mã thành phố (Ví dụ: hanoi,...)

**-country**: Tìm kiếm các thiết bị trong một quốc gia cụ thể sử dụng mã quốc gia (Ví dụ: vn, us,...)

**- hostname**: Tìm kiếm theo hostname hay domain (Ví dụ: goole, edu.vn,...)

**- net**: Tìm kiếm bằng địa chỉ IP hoặc CIDR (Classless Inter-Domain Routing)

**- os**: Tìm kiếm theo hệ điều hành

**- port**: Tìm kiếm theo port cụ thể được mở

**-before/after**: Tìm kiếm trong một khoảng thời gian
...

Ngoài ra còn một số các filter khác có thể tham khảo tại [Filter list shodan github](https://github.com/JavierOlmedo/shodan-filters)
## Ví dụ về sử dụng filter
- Tìm kiếm các web server chạy apache tại thành phố hà nội, 200 OK thể hiện các website trả về `response code 200`
```
Apache city:hanoi 200 OK
```

- Tìm kiếm các web server chạy IIS tại quốc gia Việt Nam
```
IIS country:vn
```

- Tìm kiếm các web có hostname ".edu.vn" với server chạy Apache
```
"Server apache" hostname: ".edu.vn"
```
- Tìm kiếm các thiết bị cisco trong dải mạng cụ thể
```
cisco net:"216.219.143.0/24"
```
- Tìm kiếm các máy tính chạy hệ điều hành Windows 7 ở Việt Nam
```
os:"Windows 7" country:vn
```
- Tìm kiếm các thiết bị hay server đang mở cổng telnet (23) ở Việt Nam
```
port:23 country:vn
```
apache country:CH after:22/03/2010 before:4/6/2010
Ngoài những ví dụ cơ bản trên, các bạn hoàn toàn có thể sử dụng thêm nhiều bộ filer cũng như kết hợp chúng với nhau để đạt hiệu quả tìm kiếm tốt nhất
## Export kết quả search shodan
Cho phép chúng ta trích xuất kết quả tìm kiếm theo định dạng mong muốn

# Ứng dụng shodan trong kiểm thử bảo mật
## Pen Testing: Ethics
- Sử dụng shodan để xem hoặc thay đổi cấu hình các thiết bị hay server mà không yêu cầu xác thực
- Sử dụng shodan để xem hoặc thay đổi cấu hình các thiết bị hay server sử dụng tài khoản và mật khẩu mặc định
- Sử dụng shodan để xem hoặc thay đổi cấu hình của các thiết bị sử dụng chung tài khoản mật khẩu
- Sử dụng shodan để xem hoặc thay đổi cấu hình của các thiết bị bị lộ tài khoản và mật khẩu (trong cấu hình hoặc file...)
**Hướng tiếp cận**
![](https://images.viblo.asia/91ef321d-919c-43de-96b0-8e045c320cea.png)

## Pen Testing Applications
- Tìm kiếm để kiểm tra xâm nhập các ứng dụng trên thiết bị hay server sử dụng các yếu tố
    - Mã code HTTP trả về
    - Các thông tin banner, foot printing  của dịch vụ
    - Phiên bản của dịch vụ
    - Các cổng dịch vụ đang mở
## Pen Testing: HTTP Status Codes
Tìm kiếm dựa theo phản hồi từ phía server


| Status Code | Description |
| -------- | -------- | 
| 200 OK     | Request succeeded     |
| 401 Unauthorized     | Request requires authentication     |
| 403 Forbidden      |Request is denied regardless of authentication     |

# Case study
## Camera hacking
Ở cases study này mình sẽ vận dụng kỹ thuật tấn công bằng mật khẩu mặc định, mật khẩu yếu của các thiết bị camera kết hợp sử dụng công cụ tìm kiếm shodan

**Bước 1**: Chọn vendor mục tiêu: Vivotek camera

**Bước 2**: Tìm kiếm mục tiêu qua shodan:
![](https://images.viblo.asia/7dce23e8-71c0-42e1-b686-1f88bcd255d1.png)
http://14.***.***.***:8086/

**Bước 3**: Sử dụng danh sách mật khẩu mặc định, tham khảo: ([IP Cameras Default Passwords](https://ipvm.com/reports/ip-cameras-default-passwords-directory) hoặc [camera default password](https://learnhackin.wordpress.com/2016/08/29/default-webcam-username-passwords/))
hoặc danh sách mật khẩu yếu như (admin/admin, admin/password, admin/123456,...)

Ở đây mình sử dụng: **admin/admin**

**Bước 4**: Tèn ten! Truy cập tới camera
![](https://images.viblo.asia/2268f22c-25b5-4fda-bf2e-a6257c25bcc6.png)

## Server hacking
Ở case study này mình sẽ tìm kiếm các máy chủ windows bị lỗi bảo mật [CVE-2019-0708](https://www.cvedetails.com/cve/CVE-2019-0708/) một lỗi rất nghiêm trọng trên các máy chủ windows sử dụng giao thức RDP (Remote Desktop Protocol)

**Bước 1**: TÌm kiếm mục tiêu qua shodan
Sử dụng từ khóa: `os:windows vuln:cve-2019-0708`
![](https://images.viblo.asia/a05a2945-22e8-48a2-aaaa-b878236c611e.png)

**Bước 2**: Kiểm tra server có bị lỗi CVE-2019-0708 hay không (Mình sẽ chỉ dừng ở bước kiểm tra mà không khai thác). Mình sử dụng module trên [Metasploit Framework](https://www.kali.org/docs/tools/starting-metasploit-framework-in-kali/)
![](https://images.viblo.asia/7db3116d-7092-458b-af23-75c8ab3b594a.png)
Kết quả là server có dính lỗ hổng trên, chúng ta hoàn toàn có thể khai thác sâu hơn lỗ hổng trên :D
# Kết luận
Shodan là một công cụ tìm kiếm tuyệt vời không chỉ cho những người làm bảo mật mà nó còn giúp người dùng có thể xác định được việc các thiết bị cá nhân hay thuộc sở hữu của tổ chức có đang được kết nối tới internet, tránh gặp phải những cuộc tấn công không mong muốn
Shodan là công cụ hỗ trợ cho quá trình tìm kiếm thông tin phục vụ kiểm thử xâm nhập rất hiệu quả
# Tài liệu tham khảo
https://danielmiessler.com/study/shodan/

https://www.defcon.org/images/defcon-18/dc-18-presentations/Schearer/DEFCON-18-Schearer-SHODAN.pdf

https://www.safetydetectives.com/blog/what-is-shodan-and-how-to-use-it-most-effectively/