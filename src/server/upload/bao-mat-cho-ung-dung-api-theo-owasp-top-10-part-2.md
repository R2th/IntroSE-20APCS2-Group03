# I. Tổng quan
![image.png](https://images.viblo.asia/532e7775-9eb7-4c50-9656-8ab5dfd2d53b.png)
Ở phần 1 chúng ta đã tìm hiểu 3 lỗ hổng bảo mật trong API OWASP TOP 10:

* **API1:2019 — Broken object level authorization**
* **API2:2019 — Broken authentication**
* **API3:2019 — Excessive data exposure**

Ở phần tiếp theo chúng ta sẽ tìm hiểu 3 lỗ hổng tiếp theo trong danh sách top 10:

* **API4:2019 — Lack of resources and rate limiting**
* **API5:2019 — Broken function level authorization**
* **API6:2019 — Mass assignment**
# II. OWASP TOP 10 API (cont)
## 1. API4:2019 — Lack of resources and rate limiting

API không có cơ chế ngăn chặn số lượng request hoặc kích thước gói tin, tệp tin được gửi đến một endpoit trong một khoản thời gian ngắn, đặc biệt là những endpoit có chức năng nhạy cảm hay quan trọng như: đăng nhập, otp, uploadfile,... Những kẻ tấn công có thể sử dụng điều này cho các lỗi từ chối dịch vụ (DoS) và tấn công bruteforce dò tìm tài khoản/mật khẩu của người dùng. Một số trường hợp điển hình:
![image.png](https://images.viblo.asia/e80eb536-fe12-49d9-aceb-f512022c4c2b.png)
### 1.1 Api có thể bị tấn công khi nào?
* Không giới hạn số lần đăng nhập sai tài khoản/mật khẩu (Quá 5 lần đăng nhập sai mà không khóa tài khoản)
* Không giới hạn số lần nhập mã OTP đối với các chức năng đăng nhập, đổi mật khẩu
* Không giới hạn số lần lần sử dụng và thời gian hết hạn link đổi mật khẩu khi người dùng reset mật khẩu (Mỗi link chỉ nên sử dụng một lần và có thời gian expire khoảng 30 phút)
* Không giới hạn số lượng bản ghi trả về ở mỗi request (Thường qua tham số: `LIMIT`)
* Không giới hạn dung lượng file khi upload
* Không giới hạn hoặc lock thread khi cùng truy cập tới một tài nguyên (đối với các yêu cầu liên quan đến dữ liệu: tiền, hoặc tài nguyên... (Thường biết đến  với tấn công race conditon)
* Không giới hạn số lượng request của một client trong một khoảng thời gian (request per second)
* Không kiểm tra file trước khi extract (Biết đến với cuộc tấn công zip bomb file)

### 1.2 Kịch bản tấn công thực tế
Một website có tính năng tạo mới tài khoản thông qua số điện thoại. Khi người dùng đăng kí và nhập số điện thoại, một tin nhắn SMS được gửi đến số điện thoại của người dùng với nội dung là một mã OTP gồm 4 số. Người dùng sử dụng 4 chữ cái này để hoàn thành việc đăng ký thông qua việc nhập mã OTP thông qua endpoit `POST /api/otp_verify`. Nhưng ứng dụng không thực hiện việc giới hạn số lần nhập sai OTP mà chỉ  cần kiểm tra OTP người dùng gửi lên trùng với OTP mà server sinh ra. Vì vậy, hacker chỉ cần nhập số điện thoại của nạn nhân sau đó sử dụng Burp Site để tiến hành brute force OTP gồm 4 

![image.png](https://images.viblo.asia/674afc33-2eeb-451a-9329-8f97c3da7c18.png)
<div align="center">(hình ảnh minh họa)</div>

### 1.3 Cách thức phòng  tránh
* Sử dụng docker để có thể dễ dàng giới hạn memory, CPU, number of restarts, file descriptors, and processes
* Giới hạn số lần gọi tới 1 api, endpoit trong khoảng thời gian xác định
* Thông báo cho user khi vượt quá giới hạn bằng cách cung cấp số giới hạn và thời gian đặt lại giới hạn (thời gian bị khóa tài khoản) nếu cố gắng thực hiện.
* Giới hạn dung lượng file được phép upload, kiểm tra file nén trước khi giải nén
* Thực hiện xử lý thread một cách đồng bộ, lock phần  dữ liệu khi có một thread đang xử lý cho đến khi thực hiện xong

## 2. API5:2019 — Broken function level authorization
Api dựa vào yêu cầu gửi từ phía client khi gọi tới các api để xác định quyền của người dùng theo cấp bậc phân quyền: super admin, admin, normal user, anonymous... Việc ứng dụng không thực hiện việc kiểm tra quyền của người dùng khi thực hiện việc gọi request có thể bị kẻ tấn công lợi dụng để gọi các API quản trị được "ẩn" phía sau ứng dụng.

So với những ứng dụng web thông thường, việc phát hiện ra những lỗ hổng này trong API sẽ dễ dàng hơn vì API có cấu trúc hơn và cách truy cập vào các chức năng nhất định dễ dự đoán hơn (ví dụ: thay thế phương thức HTTP từ GET thành PUT hoặc thay đổi URL từ `api/v1/user` sang `api/v1/admin` để truy cập vào chức năng admin ).

Mục tiêu hàng đầu của hình thức tấn công này là tấn công vào chức năng quản trị của admin

![image.png](https://images.viblo.asia/74860ab9-f8f5-49c2-a72a-941ff58769af.png)

### 2.1 Api có thể bị tấn công khi nào?

* Một số chức năng quản trị của admin bị lộ ra dưới dạng API mà không có cơ chế kiểm tra quyền trên phía server
* Người dùng không có đặc quyền có thể truy cập các chức năng của user hoặc admin dù không được cấp quyền mà chỉ cần biết endpoint để truy cập.
* Người dùng từ nhóm X có thể truy cập một chức năng chỉ được hiển thị cho người dùng từ nhóm Y, chỉ bằng cách đoán URL và các tham số (ví dụ: `/api/v1/users/export_all`)
* Kẻ tấn công có thể đoán biết các enpoint thông qua các endpoit có sẵn:
    * `/api/users/v1/user/myinfo`
    * `/api/admins/v1/users/all`
### 2.2 Kịch bản tấn công
Một ứng dụng chỉ cho phép người dùng đăng ký mới thông qua lời mời join từ user khác, ứng dụng mobile gọi tới api `GET /api/invites/{invite_guid}`. Response trả về JSON với chi tiết về lời mời, bao gồm `user_role` và `user_email`.

Kẻ tấn công sử dụng lại request và tiến hành chỉnh sửa request để gọi tới api endpoint: `POST /api/invites/new`. Endpoit này chỉ có thể truy cập qua giao diện của admin nhưng lại không được bảo vệ qua cơ chế phân quyền (level authorization checks) mà chỉ thực hiện bằng việc "giấu diếm" endpoit để không lộ ra cho người dùng.

Kẻ tấn công khai thác lỗ hổng cách gọi tới api để tự mời anh ta vào sử dụng hệ thống với quyền admin

```php
POST /api/invites/new

{
    "email":"attacker@malicious.com",
    "role":"admin"
}
```

### 2.3 Cách thức phòng tránh
* Không tin tưởng vào request từ phía client mà cần có cơ chế kiểm tra phân quyền khi truy cập tới chức năng quản trị của adin
* Cần thực hiện cơ chế kiểm tra phân quyền nhằm từ chối tất cả quyền truy cập theo mặc định, yêu cầu cấp quyền rõ ràng cho các vai trò cụ thể để truy cập vào mọi chức năng, đặc biệt chức năng của admin
* Cần có đầy đủ tài liệu, định nghĩa rõ ma trận phân quyền cho từng mức quyền của user và thực hiện phát triển theo đúng vai trò đã được định nghĩa
## 3. API6:2019 — Mass assignment
Một số framework phát triển web (ví dụ: Laravel, Ruby on Rails,..), để thuận tiện cho việc phát triển, nó cho phép developer tự động đẩy các tham số thông qua các HTTP request vào biến của chương trình hay đối tượng. Từ đó chương trình sẽ thực hiện lấy và xử lý dữ liệu trên server. Việc này đôi khi gây ra các vấn đề và bảo mật. Kẻ tấn công có thể lợi dụng việc này để chèn các dữ liệu độc hại là các tham số của chương trình (các tham số này vốn không được cho phép hoặc do các developer không có ý định truyền lên) để từ đó thực hiện các hành vi không mong muốn. Lỗ hổng bảo mật này được gọi là Mass Assigment.

Một số tên gọi khác của hình thức tấn công này:

* **Mass Assignment**: Ruby on Rails, NodeJS.
* **Autobinding**: Spring MVC, ASP NET MVC.
* **Object injection**: PHP

![image.png](https://images.viblo.asia/b2e70cd5-8a4a-4d6a-9f26-a597a43bceb3.png)

### 3.1 Api có thể bị tấn công khi nào?

Các đối tượng thường chứa rất nhiều thuộc tính. Một vài thuộc tính được phép cập nhật bởi user như: `email`, `name`, `phone_number`... Trong khi đó, một số thuộc tính không nên được phép cập nhật (chỉ nên được cập nhật bởi admin) như: `role`, `is_admin`, `is_vip`.

API dễ bị tấn công nếu khi ứng dụng thược việc cập nhật hoặc tạo mới đối tượng. Ứng dụng tự động chuyển đổi các tham số được truyền lên từ phía người dùng thành các thuộc tính đối tượng bên trong mà không xem xét xem thuộc tính này có nhạy cảm hoặc được phép cập nhật bởi người dùng thường hay không. Điều này có thể cho phép kẻ tấn công cập nhật các thuộc tính đối tượng mà chúng không nên có quyền truy cập.

Một số trường hợp cụ thể:
* Các thuộc tính liên quan đến quyền của user: `user.is_admin`, `user.is_vip` chỉ nên được cập nhật bởi admin.
* Thuộc tính phụ thuộc vào quy trình logic: `user.cash`chỉ nên được thiết lập một cách tự động và nội bộ sau khi hoàn thành quá trình thanh toán.
* Thuộc tính nội bộ: `article.created_time`, `article.updated_time` chỉ nên cập nhật bởi chính ứng dụng.

### 3.2 Kịch bản tấn công
Ví dụ 1: Tạo mới user trong hệ thống

User có các trường thông tin sau:
```java
public class User {
   private String userid;
   private String password;
   private String email;
   private boolean isAdmin, default: false;

   //Getters & Setters
}
```

Người lập trình viên tạo ra một form tạo mới user như sau:

```html:html
<form>
     <input name="userid" type="text">
     <input name="password" type="text">
     <input name="email" text="text">
     <input type="submit">
</form>  
```

Ở đây, developer thiết kế cho phép người dùng cập nhật thông tin 3 trường là: `userid`, `password` và `email`. Phần xử lý ở controller sẽ được thực hiện như sau:

```java
@RequestMapping(value = "/addUser", method = RequestMethod.POST)
public String submit(User user) {
   userService.add(user);
   return "successPage";
}
```

Và một request bình thường được gửi lên sẽ trông như thế này:
```markdown
POST /addUser
...
userid=bobbytables&password=hashedpass&email=bobby@tables.com
```

Để tấn công hacker sẽ thực hiện tấn công bằng cách truyền thêm tham số `isAdmin=true` trong request để thực hiện tạo 1 user mới:

```markdown
POST /addUser
...
userid=bobbytables&password=hashedpass&email=bobby@tables.com&isAdmin=true
```

Sau khi request POST được gửi lên, ứng dụng sẽ thực hiện đọc và lấy dữ liệu và thực hiện chèn vào cơ sở dữ liệu. Một user được tạo ra với quyền admin.

![image.png](https://images.viblo.asia/946a4969-55eb-493b-93ca-b5865eba18c6.png)

### 3.3 Cách phòng tránh
Tùy vào framework chúng ta sử dụng, chúng ta có cách xử lý khác nhau, nhưng tất cả sẽ theo cơ chế chung:

* Whitelist các trường được phép bind
* Blacklist các trường không được phép bind
* Sử dụng thuộc tính `readOnly` được đặt thành `true` trong các thuộc tính của đối tượng  có thể được truy xuất thông qua các API nhưng không được phép sửa đổi.
* Sử dụng Data Transfer Objects (tham khảo tại đây). DTO định nghĩa chính xác các trường dữ liệu được phép bind
* Nếu có thể, hãy xác định rõ ràng và thực thi các schemas cho các input đầu vào của người dùng.

# III. Tổng kết
Phần 2 của chuỗi bài **Bảo mật cho ứng dụng API theo OWASP TOP 10**  mình đã giới thiệu thêm các lỗ hổng trong các ứng dụng api có thể gặp phải. Các lỗ hổng đều có thể được xử lý tốt nếu chúng ta triển khai các biện pháp kiểm tra trên phía server.