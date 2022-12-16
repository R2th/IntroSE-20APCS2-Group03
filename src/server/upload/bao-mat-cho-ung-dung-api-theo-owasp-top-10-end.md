# I. Tổng quan
![image.png](https://images.viblo.asia/b59e55e2-1e7d-4905-b437-ab186216dc4a.png)
Ở hai phần đầu chúng ta đã tìm hiểu 3 lỗ hổng bảo mật trong API OWASP TOP 10:

* **API1:2019 — Broken object level authorization**
* **API2:2019 — Broken authentication**
* **API3:2019 — Excessive data exposure**
* **API4:2019 — Lack of resources and rate limiting**
* **API5:2019 — Broken function level authorization**
* **API6:2019 — Mass assignment**

Ở phần cuối này chúng ta sẽ tìm hiểu 4 lỗ hổng cuối cùng trong danh sách top 10:

* **API7:2019 Security Misconfiguration**
* **API8:2019 Injection**
* **API9:2019 Improper Assets Management**
* **API10:2019 Insufficient Logging & Monitoring**

# II. OWASP TOP 10 API (cont)
## 1. API7:2019 — Security misconfiguration
Cấu hình bảo mật không đúng có thể xảy ra ở bất kì nơi nào: từ ứng dụng, server, network... Đây là những lỗ hổng xảy ra khi chúng ta thiết lập hệ thống, những lỗ hổng này dễ dàng có thể phát hiện bằng các công cụ scan lỗ hổng bảo mật tự động. Những kẻ tấn công thường cố gắng tìm và khai thác các lỗ hổng chưa được vá hoặc các hệ thống đã lỗi thời để có thể có thể khai thác dữ liệu hoặc truy cập trái phép vào hệ thống.

![image.png](https://images.viblo.asia/82b1c19a-2f01-4860-8966-d411513e7077.png)

### 1.1 Api có thể bị tấn công khi nào?
- Khi hệ thống không được cập nhật các bản vá bảo mật (patch OS, patch system)
- Khi hệ thống sử dụng phiên bản cũ mà không được cập nhật lên phiên bản mới nhất (update OS, update firmvare)
- Khi hệ thống bật những dịch vụ, cổng, chức năng không cần thiết (Ví dụ: server bật các port dịch vụ telnet (23) và FTP(21) dù không sử dụng đến)
- Thiếu hoặc không thiết lập mã hóa (TLS)
- Hardcode thông tin nhạy cảm trong mã nguồn (Account, secret key.)
- Thiếu các biện pháp bảo vệ file, thư mục nhạy cảm (Thông qua cơ chế phân quyền, disable directory listing...)
- Server không thiết lập các [Security Header](https://owasp.org/www-project-secure-headers/), CORS
- Thông tin lỗi trả về từ phía server chứa các thông tin nhạy cảm (stack trace, sourcecode, secret keys...)
### 1.2 Kịch bản tấn công
**Kịch bản 1**
Một kẻ tấn công tìm thấy file `.bash_history` trong thư mục root của server, file này chứa các câu lệnh đã được nhập vào bởi đội DevOps để có thể truy cập vào API:

`$ curl -X GET 'https://api.server/endpoint/' -H 'authorization: Basic Zm9vOmJhcg=='`
 
 Trong file có chứa lệnh truy cập api, trong link có thông tin Authen đến server qua đó có thể truy cập vào các endpoit khác.
 
 **Kịch bản 1**
 
 Thông qua công dò quét cổng `Nmap`, hacker scan và phát hiện server của một website đang mở cổng mặc định là 21. Đây là cổng dịch vụ FTP được bật mặc định trên server mà đội ngũ triển khai đã không thực hiện disable trước khi đưa lên server. Kẻ tấn công lợi dụng dịch FTP có một tài khoản `anonymous` được enable, hacker có thể đăng nhập vào server FTP qua cổng 21 với tài khoản `anonymous` và pass là giá trị bất kì. Từ đó, kẻ tấn công có thể tùy ý get file hoặc upload độc hại len server để chiếm quyền điều khiển server
 
![image.png](https://images.viblo.asia/55ecd245-37e6-4d0a-a99b-9d8c2fcdb003.png)
### 1.3 Cách thức phòng tránh
- Thực hiện kiểm tra và cập nhật định kỳ các phần mềm, OS lên phiên bản mới không có lỗ hổng bảo mật.
- Cập nhật các bản patch, hotfix khi xuất hiện các lỗ hổng bảo mật nguy hiểm, Zero-day vulnerabilty
- Disable cổng, dịch vụ, function không sử dụng trên server
- Phân quyền, giới hạn truy cập, thiết lập các cơ chế bảo mật để ngăn chặn truy cập trái phép vào server
- Thiết lập các security headers, CORS trên server một cách an toàn
- Triển khai quy trình tự động để liên tục kiểm tra cấu hình và cài đặt trong mọi môi trường triển khai
- Định nghĩa và giới hạn các thông tin nhạy cảm trả về thông qua các thông báo lỗi của hệ thống

## 2. API8:2019 Injection
Lỗ hổng Injection (Chèn mã độc hại) rất phổ biến và thường được tìm thấy trong các truy vấn SQL, LDAP hoặc NoSQL, OS Command, trình phân tích cú pháp XML và ORM. Những sai sót này rất dễ phát hiện khi xem lại mã nguồn. Những kẻ tấn công có thể sử dụng các công cụ rà quét quét tự động (Acunetix, SQLMap...) để phát hiện và khai thác lỗ hổng. Kẻ tấn công có thể khai thông qua các lệnh gọi API bao gồm SQL, NoSQL, LDAP, OS hoặc các lệnh khác mà API mà server không có các cơ chế validation trên phía server

Khai thác thành công lỗ hổng này có thể giúp kẻ tấn công thu thập hoặc phá hoại các thông tin nhạy cảm  trong database hoặc thậm chí là chiếm quyền điều khiển server.

![image.png](https://images.viblo.asia/743892e2-7c8b-4b8b-b535-243dfbdc848c.png)

### 2.1 Api có thể bị tấn công khi nào?
- Dữ liệu do user cung cấp không được API validate hay filter trước khi đưa vào các câu lệnh truy vấn database, câu lệnh hệ thống
- Dữ liệu từ các hệ thống external có kết nối tới hệ thống của chúng ta không được validate, filter trước khi đi vào hệ thống API (SQL/NoSQL/LDAP queries, OS commands, XML parsers, and Object Relational Mapping (ORM)/Object Document Mapper (ODM))
- Sử dụng các thư viện, hàm của các framework không đúng theo khuyến nghị của nhà phát triển dẫn đến các lỗi về Injection.
### 1.2 Kịch bản tấn công
**Kịch bản 1**

Firmaware của một thiết bị điều khiển có enpoint `/api/CONFIG/restore` được gửi cùng `appId` được chia ra làm nhiều phần và truyền trực tiếp vào lệnh gọi hàm. Bằng cách dịch ngược ứng dụng, kẻ tấn công có thể tìm thấy được `appId` được truyền trực tiếp tới các hàm hệ thống (system call) mà không qua bất cứ cơ chế validate hay sanitization nào:
```C
snprintf(cmd, 128, "%srestore_backup.sh /tmp/postfile.bin %s %d",
         "/mnt/shares/usr/bin/scripts/", appid, 66);
system(cmd);
```
Bằng việc truyền vào giá trị appId là những lệnh độc hại, kẻ tấn cong có thể tấn công để thực thi lệnh tùy ý trên server thông qua lệnh gọi tới API như sau:
```
$ curl -k "https://${deviceIP}:4567/api/CONFIG/restore" -F 'appid=$(/etc/pod/power_down.sh)'
```

**Kịch bản 2**

Một ứng dụng với các hàm cơ bản CRUD cho các thao tạo thêm, sửa, xóa sách. Kẻ tấn công có thể tấn công NoSQL Injection thông qua tham số bookingId khi thực hiện request xóa một cuốn sách thông qua link:

```
DELETE /api/bookings?bookingId=678.
```

Server APi thực hiện việc xóa thông qua đoạn code sau:

```java
router.delete('/bookings', async function (req, res, next) {
  try {
      const deletedBooking = await Bookings.findOneAndRemove({'_id' : req.query.bookingId});
      res.status(200);
  } catch (err) {
     res.status(400).json({error: 'Unexpected error occured while processing a request'});
  }
});
```
Kẻ tấn công thực hiện capture và thay đổi giá trị `bookingId` trong request để thực hiện tấn công noSQL Injection:

```
DELETE /api/bookings?bookingId[$ne]=678
```

### 1.3 Cách thức phòng tránh

- Không bao giờ tin tưởng dữ liệu được gửi từ người dùng API, ngay cả khi là người dùng nội bộ.
- Luôn thực hiện việc validate, sanitization  dữ liệu từ người dùng, hệ thống external
- Thực hiện parameterized quries đối với các request có thực hiện thao tác với cơ sở dữ liệu
- Giới hạn số lượng dữ liệu trả về để tránh trả về thừa dữ liệu
- Định nghĩa nghiêm ngặt kiểu dữ liệu được phép truyền vào và trả về thông qua các API endpoint

## 4. API9:2019 — Improper assets management
Lỗ hổng xảy ra thiếu ghi nhật ký, giám sát và cảnh báo thích hợp khi có các cuộc tấn công từ phía kẻ tấn công. Vì quá trình ghi log truy cập, log phân quyền không đầy đủ hoặc không được thực hiện nên rất khó để có thể điều tra và truy vết khi hệ thống gặp phải các cuộc tấn công. Do đó, quá trình tìm ra nguyên nhân và cách thức khai thác của kẻ tấn công cũng rất khó, gây khó khăn cho quá trình xử lý lỗ hổng bảo mật và vá lỗ hổng bảo mật. Những kẻ tấn công lợi dụng việc thiếu ghi nhật ký và giám sát để tấn công hệ thống mà không bị phát hiện.

![image.png](https://images.viblo.asia/10b896d8-7f5a-43fc-b5d2-e0c9966d8b77.png)

### 4.1 Api có thể bị tấn công khi nào?
- Khi hệ thống API không có bất cứ hệ thống ghi log nào để ghi lại log hệ thống (Log truy cập, log authentication, log authorization..)
- Khi hệ thống có ghi lại log nhưng LOG Level thiết lập không đúng
- Tính toàn vẹn của nhật ký không được đảm bảo (Tấn công: Log injection).
- Hệ thống log không thực hiện giám sát liên tục
- Không có hệ thống lưu trữ, xử lý và giám sát liên tục đối với log hệ thống

### 4.2 Kịch bản tấn công
**Kịch bản 1**

Access keys của một administrative API bị lộ thông qua github public repository. Chủ của repo này được thông báo qua email về thông tin key bị lộ, nhưng 48 tiếng sau khi nhận được thông báo sự việc mới được xử lý xong, và access keys bị lộ có thể cho phép kẻ tấn công lợi dụng để truy cập vào thông tin nhạy cảm của API. Nhưng vì hệ thống không có hệ thống lưu trữ và giám sát log nên không phát hiện ra đã có kẻ tấn công lợi dụng để tấn công hệ thống trong thời gian 48 tiếng đó.

**Kịch bản 2**

Một hệ thống API có hệ thống lưu trữ log truy cập của user, hệ thống thực hiện lưu trữ lại tất cả các thông tin truy cập của user như: url, user-agent, ip, username, password. Trong một cuộc tấn công, kẻ tấn công đã lấy được file log và đọc nội dung file log. Vì hệ thống lưu lại cả thông tin username/password nên hacker có thể lấy được thông tin user để truy cập vào hệ thống

![image.png](https://images.viblo.asia/fdc7f8ca-ac72-40cd-9751-2721341cfd5a.png)
### 4.3 Cách thức phòng tránh
- Ghi lại tất cả các log quan trọng của hệ thống:
    - Log truy cập vào hệ thống (IP, thời gian, user-agent, location.)
    - Log khi đăng nhập thành công/thất bại
    - Log khi tài khoản đặc quyền cao thực hiện các thao tác trên hệ thống
    - Log phân quyền khi các đối tượng truy cập thành công/thất bại
    - ..
- Thiết lập LOG Level an toàn: `INFO`
- Không lưu trữ thông tin nhạy cảm vào log: usernaem/password, thông tin thẻ, thông tin cá nhân định danh
- Có cơ chế bảo vệ tính toàn vẹn của các file log trên hệ thống (Hashing)
- Tích hợp với SIEM và các hệ thống monitor, công cụ giám sát và cảnh báo khác để phát hiện tấn công kịp thời
# III. Tổng kết
Qua chuỗi bài viết [Bảo mật cho ứng dụng API theo OWASP TOP 10](https://viblo.asia/s/bao-mat-cho-ung-dung-api-theo-owasp-top-10-Yym400WB491) sẽ giúp những lập trình viên trong quá trình phát triển và triển khai ứng dụng API có thể tham khảo áp dụng để hệ thống API được an toàn hơn, hạn chế được các nguy cơ tấn công từ kẻ xấu. Bài viết được tham khảo theo các nguồn tài liệu bên dưới, nếu có bất kỳ thắc mắc nào các bạn có thể để lại ý kiến dưới bài viết để góp phần làm bài viết hoàn thiện hơn:
* **[OWASP API Security Top 10](https://apisecurity.io/encyclopedia/content/owasp/owasp-api-security-top-10)**
* **[OWASP API Security Project](https://owasp.org/www-project-api-security/)**