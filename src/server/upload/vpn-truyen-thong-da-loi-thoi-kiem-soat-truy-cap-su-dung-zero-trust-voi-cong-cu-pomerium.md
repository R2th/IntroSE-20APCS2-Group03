# Mở đầu
Nếu là một người hay thích tìm hiểu các khái niệm mới trong ngành IT thì chắc sẽ không còn xa lạ với cụm từ Zero Trust, lần đầu mình nghe về khái niệm này đã cách đây 3,4 năm. Đây không phải là một khái niệm mới tuy nhiên cũng không có nhiều người thực sự hiểu Zero Trust là gì... Okay, thực ra nó cũng không quá khó hay trừu tượng gì đâu, trong bài hôm nay mình sẽ cung cấp cho mọi người những ý chính về thằng Zero Trust này và tiến hành thực nghiệm ứng dụng Zero Trust vào môi trường thực tế. 
![image.png](https://images.viblo.asia/85aad495-a3fc-4eaf-9096-1390b07874db.png)

# Zero Trust là gì?
Bạn có thể tìm thấy rất nhiều các định nghĩa về Zero Trust trên mạng, mình có thể gói gọn những định nghĩa đó lại thành 1 câu: Zero Trust là không tin bố con thằng nào hết, ai muốn vào thì đều cần **xác thực** và **ủy quyền** (Authentication and Authorization). Đây chính là ý cốt lõi giúp Zero Trust được coi là bảo mật hơn các phương thức truyền thống.

Zero Trust sẽ **không phải là một công cụ hay giải pháp một bên thứ 3 cung cấp** mà đây là ***một loạt các nguyên tắc*** chúng ta cần follow theo, khi follow theo được các nguyên tắc này thì có nghĩa là ta đã áp dụng được Zero Trust cho doanh nghiệp, hạ tầng của chúng ta. Về cơ bản các nguyên tắc trong Zero Trust có thể áp dụng cho hầu hết các đơn vị doanh nghiệp, tuy nhiên tùy vào đặc thù mỗi doanh nghiệp sẽ phải chỉnh sửa lại những chính sách cho phù hợp. Vậy những nguyên tắc ở đây là gì? 

* **Đặc quyền tối thiểu** - Hay người dùng khi truy cập vào hệ thống chỉ được cấp quyền vừa đủ để thực hiện nhiệm vụ trong 1 khoảng thời gian nhất định (không phải vĩnh viễn).
* **Hỗ trợ Multi-Factor Authentication** (Có thể là Username - password, vân tay, OAuth, SSO, thiết bị định danh phần cứng,...) - Đây cũng là cách mà tý chúng ta sẽ thử ứng dụng Zero Trust vào môi trường thực tế.
* **Kiểm soát hay định danh được tất cả các thiết bị có trong mạng**, nói cách khác chúng ta luôn phải biết trong mạng chúng ta có những thiết bị gì, của ai quản lý.
* **Bất cứ  yêu cầu kết nối** nào gửi đến các dịch vụ như database, web-server,... đều **cần được xác thực**.
* **Cần có các Policy phù hợp với môi trường từng doanh nghiệp**, ví dụ: vào ngày thứ 7, Chủ nhật sẽ không có user là Developer nào được truy cập đến các hạ tầng máy chủ môi trường Production mà chỉ có DevOps hay SysAdmin mới có quyền truy cập, việc này tránh sự cố xảy ra vào ngày nghỉ. 
* Còn nhiều ...

Hy vọng với việc tóm tắt ngắn gọn các ý chính bên trên đã giúp mọi người hiểu được thế nào là Zero Trust. Như trên mình nói  Zero Trust không phải là công cụ, tuy nhiên việc áp dụng Zero Trust thủ công sẽ khá là khó khăn đấy. Chính vì thế có người đã phát triển ra các công cụ để chúng ta apply những nguyên tắc này 1 cách dễ dàng hơn. Trong bài này mình sẽ giới thiệu tới mọi người công cụ có tên **Pomerium**

# Ứng dụng Zero Trust vào môi trường thực tế
Đối với hầu hết các doanh nghiệp hiện nay thường sẽ sử dụng VPN (Virtual Private Network) để phân chia ra làm môi trường private và public, nên khi muốn truy cập đến các dịch vụ  ở trong mạng private thì người dùng sẽ cần kết nối vào VPN. Và thường là khi đã kết nối vào VPN thì người dùng đó có thể kết nối đến toàn bộ các service có trong mạng đó. Việc này được cho là khá nguy hiểm và vi phạm nguyên tắc **Đặc quyền tối thiểu**. 

**[Pomerium](https://www.pomerium.com/)** cung cấp cho chúng ta cơ chế đặt ra các policy cho từng service nên khi người dùng yêu cầu kết nối đến bất cứ dịch vụ nào thì cũng cần xác thực danh tính để xem có quyền truy cập hay không.
![image.png](https://images.viblo.asia/d584c4ef-a2e0-4530-87c5-a9d6d2bdfa8f.png)

Để cài đặt được Pomerium cũng không quá khó, Pomerium cần 1 domain tập trung để có thể làm Proxy cho mọi request đi qua. Nếu lab thì các bạn có thể fake host trong /etc/hosts hoặc nếu chạy thực tế thì cần mua 1 Domain. Ngoài ra Pomerium cũng sẽ cần SSL/TLS **để mã hóa request** (đây cũng là 1 trong những yêu cầu tiên quyết của Zero Trust). Mình sẽ không hướng dẫn cài đặt thằng Pomerium này, mọi người có thể xem ở trên trang chủ Pomerium (https://www.pomerium.com/docs/overview/releases#pomerium)

Trong quá trình cài đặt ta sẽ phải chọn Identity Providers (IDP) là một bên thứ 3 đóng vai trò xác thực người dùng, Pomerium có hỗ trợ khá nhiều bên như: Google, Okta, Auth0, Ping, GitHub, Gitlab,... Trong bài này mình sẽ sử dụng Github.
![image.png](https://images.viblo.asia/b57b1d97-f5c8-43ca-88a0-aa4941ddcaaa.png)

Khi truy cập vào bất cứ Application nào phía sau người dùng sẽ đều phải gọi qua 1 domain có dạng *** .yourdomain.com . Những yêu cầu này sẽ đi qua thằng Pomerium đóng vai trò như một "Gateway" và được xác thực ở đây. Nếu user chưa được xác thực sẽ được đẩy qua bên Identity Provider để xác thực, nếu đã xác thực xong thì sẽ check tiếp xem user đó có quyền truy cập vào service đã yêu cầu hay không, nếu không sẽ trả về 403 và tất nhiên nếu có quyền sẽ allow cho truy cập. Dưới đây là các bước khi có người dùng yêu cầu truy cập:

![image.png](https://images.viblo.asia/87f12789-94ab-42f5-a4eb-d49d42f3e22a.png)

Như vậy tạm thời mọi người đã có hình dung cơ bản về thằng Pomerium này, giờ chúng ta sẽ ứng dụng để apply một số policy. Mình có dựng thử thằng Pomerium này để mọi người có thể test thử. Khi truy cập trang này https://authenticate.0trust.site/.pomerium/ (Hy vọng lúc mọi người đọc nó còn sống, nếu không mọi người xem ảnh tạm) Pomerium sẽ đẩy bạn qua GitHub để yêu cầu đăng nhập hoặc cấp quyền do bạn chưa từng truy cập vào thằng Pomerium này trước đây. Sau khi xác thực xong nó sẽ trả về trang như dưới:
![image.png](https://images.viblo.asia/3fbcee73-e408-46bb-b2dc-d4f299640319.png)

Trang này chứa các thông tin về user của bạn đã được authen với Pomerium như thế nào, ta thấy có trường Seesion ID, User ID, thời gian User hết hạn, trạng thái xác thực,... Thông tin này sẽ được lấy khi người dùng yêu cầu đến 1 dịch vụ nào đó để so sánh với policy xem người dùng đó có quyền truy cập hay không.

### Kịch bản 1: Cho phép người dùng truy cập khi có tài khoản hợp lệ
Trong thực tế, doanh nghiệp khi cung cấp một số dịch vụ ở dạng dùng thử cho 1 nhóm khách hàng nhất định sẽ mong muốn lưu lại thông tin người dùng để tăng sự trải nghiệm và nhận được góp ý, phản hồi của khách hàng. Mình cấu hình trong Pomerium policy có dạng:
![image.png](https://images.viblo.asia/c7ec8cdd-fd07-4415-9417-f6c8a48aa88c.png)

Như vậy tất cả các user nếu đã xác thực đều có thể truy cập dịch vụ này! Bạn có thể truy cập qua đường dẫn https://beta-trangchu.0trust.site/ Nếu đã xác thực ở link authenticate bên trên thì bạn sẽ không bị yêu cầu login lại github nữa, còn nếu chưa authen thì sẽ bị đẩy về bên Github để authen.

![image.png](https://images.viblo.asia/8be47e59-2edc-4063-b0bf-4a0889bfd8a5.png)

Log được lưu ở phía server sẽ có dạng như sau cho từng request một:
```
Sep 15 15:50:39 pomerium pomerium[1275311]: 
{
  "level": "info",
  "service": "authorize",
  "request-id": "dd55d49a-9b32-4811-acd8-293b8ee253b2",
  "check-request-id": "dd55d49a-9b32-4811-acd8-293b8ee253b2",
  "method": "GET",
  "path": "/assets/css/app.css",
  "host": "beta-trangchu.0trust.site",
  "query": "",
  "ip": "123.30.170.999",
  "session-id": "c813d89b-5356-4ce8-b896-2755dbcc15a2",
  "allow": true,
  "allow-why-true": [
    "user-ok"
  ],
  "deny": false,
  "deny-why-false": [
    "valid-client-certificate-or-none-required"
  ],
  "user": "MMA17",
  "email": "nguyenhoangviet170500@gmail.com",
  "time": "2022-09-15T15:50:39+07:00",
  "message": "authorize check"
}
```

### Kịch bản 2: Xác thực người dùng trong doanh nghiệp dựa trên domain của email.

Trong doanh nghiệp thường ta có email domain riêng của công ty kiểu @vccorp.vn, @vtc.gov.vn,... Đây cũng là một yếu tố để ta có thể xác thực theo. Ở đây ta chỉ cho những người dùng trong doanh nghiệp có thể truy cập ta có thể xác thực theo domain này. Policy mình cấu hình như sau:

![image.png](https://images.viblo.asia/bec0bca1-918e-49ab-a29f-6d1898369f06.png)

Vậy chỉ các User có email domain là @vccorp.vn mới có thể truy cập domain https://grafana.0trust.site/ ngoài ra đều sẽ bị Deny và trả về giao diện 

![image.png](https://images.viblo.asia/04bb2a5c-1f05-4c14-b8e0-31cbda93e348.png)


Ngoài ra Pomerium cho phép ta cấu hình Policy dựa trên nhiều các yếu tố khác như:
- device
- email domain
- email
- groups
- http_method
- http_path
- pomerium_routes
- user

Ngoài ra đối với bản trả phí thì sẽ hỗ trợ thêm 1 số yếu tố nâng cao như:
- date
- day_of_week
- time_of_day
- record

Không chỉ hỗ trợ với các Application là Web, Pomerium còn hỗ trợ xác thực các **ứng dụng sử dụng giao thức TCP**, để kết nối ta sử dụng **pomerium-cli** hoặc **Pomerium Desktop** chạy được cho tất cả các nền tảng. Phần này mọi người có thể đọc thêm ở Doc của Pomerium https://www.pomerium.com/docs/tcp

# Kết thôi
Vậy các kiểm soát truy cập thông qua Pomerium nói riêng hay Zero Trust nói chung có thể thay thế VPN hay không? Câu trả lời là **TÙY** Zero Trust để áp dụng cho toàn bộ ứng dụng thì thực sự khó và sẽ khá bất tiện đặc biết đối với các ứng dụng đã xây dụng với cách thức xác thực truyền thống. Thay vào đó ta có thể sử dụng song hành và VPN và Zero Trust cho từng Application, áp dụng Zero Trust cho 1 số ứng dụng đơn giản rồi dần dần mở rộng ra toàn bộ các App. Hy vọng mọi người đã học được thêm gì đó mới sau bài viết này.

Một cuốn sách cho các Dummies muốn bắt đầu tìm hiểu Zero Trust:  http://hviet17.ddns.net/s/NEiPFEcyGptTMNX