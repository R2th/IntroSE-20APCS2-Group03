## Giới thiệu
Khi quyết định xem nên sử dụng kiến trúc server nào cho ứng dụng Web của bạn, có rất nhiều yếu tố cần phải cân nhắc, ví dụ như hiệu năng, khả năng mở rộng, tính khả dụng, độ tin cậy, chi phí và dễ quản lý.

Dưới đây là danh sách một số kiến trúc server được sử dụng phổ biến, với những mô tả ngắn gọn về mỗi loại, bao gồm ưu và nhược điểm của chúng. Hãy nhớ rằng tất cả các khái niệm được đề cập sau đây có thể được sử dụng trong các kết hợp khác nhau, và mỗi môi trường lại đòi hỏi những yêu cầu khác nhau.

## 1. Tất cả trong một
Toàn bộ môi trường đều nằm hết trên một server duy nhất. Đối với một ứng dụng web thông thường, sẽ bao gồm web server, application server và database server. Một ví dụ của cách thiết lập này đó là LAMP stack, viết tắt của Linux, Apache, MySQL và PHP, đều nằm trên một server duy nhất.

**Trường hợp sử dụng:** Tốt cho việc thiết lập một ứng dụng nhanh chóng, bởi vì đây là thiết lập đơn giản nhất có thể

![](https://images.viblo.asia/aa98029c-89a8-421e-b768-a9702464c612.png)

**Ưu điểm:** Đơn giản

**Nhược điểm:**
- Ứng dụng và database sử dụng tranh chấp tài nguyên server (CPU, Memory, I/O,...), do đó bên cạnh việc gây ra giảm hiệu năng của hệ thống, nó còn có thể gây khó khăn trong việc xác định thành phần nào gây ra điều đó.
- Không dễ dàng mở rộng ứng dụng theo chiều ngang

## 2. Tách riêng Database Server
Cách thiết lập này sẽ tách riêng hệ thống database với những phần còn lại để loại bỏ việc tranh chấp tài nguyên giữa ứng dụng và database, đồng thời tăng tính bảo mật bằng cách giấu database khỏi DMZ hay public internet.

**Trường hợp sử dụng:** Tốt cho việc thiết lập một ứng dụng nhanh chóng, tuy nhiên có thể loại bỏ được việc tranh chấp cùng tài nguyên hệ thống giữa ứng dụng với database.

![](https://images.viblo.asia/a37761c4-0579-4605-89e9-489b5682cc25.png)

**Ưu điểm:** 
- Các tầng ứng dụng và database không còn tranh chấp cùng tài nguyên hệ thống nữa (CPU, Memory, I/O,...)
- Bạn có thể mở rộng theo chiều dọc mỗi tầng riêng biệt, bằng cách thêm tài nguyên cho server nào cần (CPU, Memory)
- Tùy thuộc vào thiết lập của bạn, nó có thể tăng tính bảo mật bằng cách giấu database của bạn khỏi DMZ.

**Nhược điểm:**
- Thiết lập phức tạp hơn một chút so với cách chỉ sử dụng một server duy nhất.
- Có thể phát sinh các vấn đề về hiệu năng nếu kết nối mạng giữa 2 server có độ trễ cao (do khoảng cách địa lý giữa các server) hoặc băng thông quá thấp cho việc truyền tải dữ liệu.

## 3. Load Balancer (Reverse Proxy)
Load Balancer (LB) được thêm vào hệ thống để tăng performance và uptime (là thời gian đáp ứng của hệ thống đối với người dùng) của hệ thống bằng cách phân tải ra nhiều server. Nếu một server bị lỗi, các server còn lại sẽ phân chia nhau chịu tải cho đến khi server kia hoạt động trở lại. Nó có thể được sử dụng để cung cấp cho nhiều ứng dụng thông qua cùng một domain và port, bằng cách sử dụng một reverse proxy layer 7 ( tầng ứng dụng)

Một số phần mềm cung cấp khả năng phân tải: HAProxy, Nginx và Varnish,...

**Trường hợp sử dụng:** Kiến trúc này hữu dụng trong những môi trường đòi hỏi khả năng mở rộng bằng cách thêm nhiều servers, hay còn gọi là khả năng mở rộng theo chiều ngang.

![](https://images.viblo.asia/dacd57e7-24e5-4eff-91b8-ed918fc18775.png)

**Ưu điểm:** 
- Cho phép mở rộng hệ thống theo chiều ngang, bằng cách thêm nhiều servers
- Có thể bảo vệ chống lại những tấn công DDOS bằng cách giới hạn kết nối client với một số lượng và tần số hợp lý.

**Nhược điểm:**
- Load balancer có thể gây ra tình trạng "nghẽn cổ chai" nếu server chạy LB không được cung cấp đủ tài nguyên hoặc không được cấu hình tốt.
- Gặp một số phức tạp cần phải xem xét kĩ lưỡng (đồng bộ session giữa 2 server, … )
- Load balancer là một `"single point of failure"`, nếu nó sập, toàn bộ service của chúng ta cũng sẽ sập theo. Một thiết lập `high availability (HA)` là một cấu trúc không phải là "single point of failure". Để biết rõ hơn về cách thiết lập một `HA`, bạn có thể đọc thêm [ở đây](https://www.digitalocean.com/community/tutorials/how-to-use-floating-ips-on-digitalocean#how-to-implement-an-ha-setup).

## 4. HTTP Accelerator (Caching Reverse Proxy)
Một HTTP Accelerator, hay caching HTTP reverse proxy, có thể được sử dụng để giảm thời phục vụ của hệ thống đối với người dùng sử dụng một vài kĩ thuật khác nhau. Kĩ thuật chính của phương pháp này là cache lại response từ một web server hoặc application server vào trong memory, và những request trong tương lai với cùng nội dung sẽ được cung cấp một cách nhanh chóng mà không cần tương tác với web server hoặc application server.

Một số phần mềm cung cấp HTTP acceleration: Varnish, Squid, Nginx.

**Trường hợp sử dụng:** Kiến trúc này hữu dụng trong những hệ thống dynamic web nặng về nội dung hoặc với nhiều tệp được truy cập thường xuyên.

![](https://images.viblo.asia/01e8ca82-aa31-424f-a5c7-50ceebcde55f.png)

**Ưu điểm:**
- Tăng performance bằng cách giảm CPU load trên web server, thông qua caching
- Có thể đóng vai trò như một reverse proxy Load Balancer
- MỘt vài phần mềm caching có thể bảo vệ chống lại các tấn công DDOS

**Nhược điểm:**
- Cần phải tinh chỉnh để có performance tốt nhất.
- Nếu tốc độ truy cập vào cache chậm, nó có thể làm giảm hiệu năng

## 5. Master-Slave Database Replication 
MỘt cách để tăng performance của hệ thống database thực hiện nhiều thao tác đọc hơn ghi, ví dụ như các hệ thống CMS, đó là sử dụng kiến trúc Master-Slave Replication. Master-Slave replication yêu cầu một master và một hoặc nhiều slave. Master đóng vai trò ghi dữ liệu còn các Slave đóng vai trò đọc dữ liệu ra. Khi có dữ liệu được ghi trên Master, những dữ liệu này sau đó sẽ được đồng bộ dần lên các Slave. Kiến trúc này giúp chia tải (các thao tác đọc dữ liệu) ra nhiều servers.

**Trường hợp sử dụng:** Hữu dụng cho các hệ thống mà cần tăng tốc đọc đọc dữ liệu

![](https://images.viblo.asia/ed6524a5-a8e4-4bdc-bf16-6d90e179d33f.png)

**Ưu điểm:**
- Tăng hiệu năng đọc dữ liệu từ database bằng cách phân tải request ra nhiều server Slave
- Có thể tăng hiệu năng ghi dữ liệu bằng cách chỉ sử dụng server Master cho việc ghi thôi (Master không cần phải thực hiện các thao tác đọc)

**Nhược điểm:**
- Cài đặt kiến trúc này khá phức tạp
- Cập nhật lên các server Slaves diễn ra bất đồng bộ, do vậy mà nội dung trên đó có thể sẽ chưa được cập nhật mới nhất trong những thời điểm nhất định
- Nếu Master lỗi, không thể ghi được dữ liệu lên

## 6. Kết hợp tất cả kiến trúc trên
Chúng ta có thể thêm Load Balancer cho các caching server, ngoài những application servers và sử dụng kiến trúc Master-Slave Replication cho databases. Phương pháp này kết hợp ưu điểm của tất cả những phương pháp trên và hạn chế những vấn đề, sự phức tạp của chúng. 
![](https://images.viblo.asia/c3f6a152-d527-4eed-a4dc-8b47633c252c.png)

Giả sử rằng Load Balancer sẽ được cấu hình để nhận biết các statis requests (ví dụ như ảnh, css, javascript,...) và gửi những request đó tới các caching servers, và  gửi những requests khác tới application servers.

Sau đây là mô tả điều gì sẽ xảy ra khi một user gửi một request dynamic content:
1. User gửi một request dynamic content tới `http://example.com/` (load balancer)
2. LB gửi request tới `app-backend`
3. `app-backend` đọc dữ liệu từ các Database Slave và trả về dữ liệu cho LB
4. LB sau đó sẽ trả về dữ liệu cho user

Nếu như user gửi một request static content:
1. LB kiểm tra trong `cache-backend` xem nội dung được yêu cầu đã được cache hay chưa.
2. Nếu **đã được cache**: trả dữ liệu về cho LB  và chuyển tới **Bước 7**. Nếu **chưa được cache**: `cache-backend` sẽ chuyển request này cho `app-backend`, thông qua LB.
3. LB sẽ chuyển  request tới cho `app-backend`
4. `app-backend` đọc dữ liệu từ các Database Slave sau đó trả dữ liệu về cho LB
5. LB chuyển response cho `cache-backend`
6. `cache-backend` thực hiện cache lại nội dung bên trong response
7. LB sau đó sẽ trả về dữ liệu cho user

## Kết luận
Trên đây tôi đã giới thiệu cho các bạn một số kiến trúc server phổ biến cho các ứng dụng web. Các bạn có thể 
kết hợp chúng tùy ý để xây dựng cho một kiến trúc server phù hợp nhất cho ứng dụng riêng của bạn nhé.

## Tài liệu tham khảo
1. https://www.digitalocean.com/community/tutorials/5-common-server-setups-for-your-web-application