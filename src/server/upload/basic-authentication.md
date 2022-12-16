![](https://images.viblo.asia/2a858b1a-c7b8-428f-9e66-34c45209e378.png)


Mở đầu

Chào các bạn, cũng lâu lắm rồi mình chưa ra bài viết mới. 1 phần cũng vì bận quá, 1 phần cũng do lười, 1 phần nữa cũng do chưa có ý tưởng gì cho các bài viết của mình.
Chả là đợt này mình đang hệ thống hóa lại tất cả các kiến thức từ cơ bản tới nâng cao nên đây sẽ là 1 seri về Authentication của mình.
Khởi đầu của phần 1 này như tiêu đề các bạn thấy : BASIC AUTHENTICATION

**Cấu trúc bài viết:**

*     Định nghĩa
*     Cách hoạt động
*     Một số khái niệm xung quanh, note
*     Kết luận


**Định nghĩa**

**Authentication:**

 - Là một quá trình trình bày thông tin đăng nhập của bạn cho hệ thống và hệ thống xác thực thông tin đăng nhập của bạn. Những thông tin này cho hệ thống biết bạn là ai. Cho phép hệ thống đảm bảo và xác nhận danh tính người dùng. Ở đây hệ thống có thể là bất cứ thứ gì, nó có thể là một máy tính, điện thoại, ngân hàng hoặc bất kỳ cơ sở văn phòng vật lý nào.


**Basic authentication**

![](https://images.viblo.asia/2a858b1a-c7b8-428f-9e66-34c45209e378.png)


- Hiểu 1 cách đơn giả thì nó là phương thức để xác thực người dùng khi truy cập tài nguyên thông qua HTTP(s)
- Thông tin đăng nhập được gửi kèm theo mỗi request
- Cấu trúc header sẽ có thêm :
`   Authorization: Basic <Base 64 endcode {username:password}>`

**2. Cách hoạt động**

**Bước 1**

![](https://images.viblo.asia/557796e1-ccb8-4ae8-a25e-0a11853eb5ac.png)

Người dùng truy cập vào đường dẫn(URL) nào được được bảo vệ bằng basic authentication

**Bước 2**


Server check nếu request có header Authorization  và với username, password có hợp lệ hay không?
- Nếu hợp lệ, thì trả về status: 200, và cho phép truy cập

![](https://images.viblo.asia/4c9b5d2e-8fdb-47a5-ac14-d4d5e8a0a47b.png)

- Nếu không hợp lê, thì trả về status: 401 Unauthorized

![](https://images.viblo.asia/6b61e248-6d25-471b-9692-7549e8323a23.png)


- Lưu ý: 

`Khi server trả response cho client, thì có kèm theo 1 chuỗi là www-authenticate: Basic realm="MyApp"`


![](https://images.viblo.asia/46872319-22ee-4e71-8d8e-088256a2c5ef.png)


**Bước 3**

![](https://images.viblo.asia/c506e2e2-8a68-4476-998a-94440ad2b747.png)


- Trình duyệt nhận thấy có www-authenticate trong header trả về, sau đó hiện thị hộp thoại cho thông tin đăng nhập (thường thấy là hộp thoại hiện lên trên cùng bên phải trang web)


**Bước 4**

- Người dùng gửi thông tin đăng nhập. Trình duyệt sẽ mã hóa bằng Base64, sau đó gửi kèm theo header của request. Thông tin đăng nhập có dạng
`   Authorization: Basic <Base 64 endcode {username:password}>`

**Bước 5**
- Quay lại **bước 2**.

**3. Một số khái niệm xung quanh, note**

- **Realm**: Là nhóm các trang web có chung thông tin đăng nhập. Trình duyệt có thể cache những thông tin đăng nhập hợp lệ lại cho realm. Có thể sử dụng lại trong tương lại. (Đương nhiên, là trình duyệt sẽ không tự động làm việc này, mà sẽ hỏi bạn có đồng ý thực hiện không)

![](https://images.viblo.asia/5369c77b-1f27-4529-acdb-d19a21443e07.png)

- **"MyApp"**: Giá trị của realm, có thể là bất cứ đoạn text nào đó, do Server có trách nhiệm định nghĩa realms và xử lý xác thực người dùng.

- Basic Authentication **không được coi là an toàn** khi **không sử dụng cùng với TLS/HTTPS**( mình sẽ có bài viết về phần này sau nhé). Lý do thì đơn giản thôi, bất kì ai cũng có thể lấy và giải mã thông tin xác thực của bạn(Vì mã hóa bằng base64, khá đơn giản, trên mạng hiện giờ có rất nhiều các giải mã cái này rồi)

**4. Kết luận**

* Basic Authentication là phương pháp xác thực cơ bản nhất mà bạn nên biết.
* Tuy cơ bản, nhưng cho đến hiện nay, một số trang web cũng vẫn dùng cách này để xác thực người dùng.

Cảm ơn các bạn đã đọc bài viết đến hết. Mình rất mong góp ý của các bạn để mình có thể ở các bài viết tới.
Thân!

Nguồn tham khảo:
* https://roadmap.sh/guides/basic-authentication
* https://en.wikipedia.org/wiki/Basic_access_authentication