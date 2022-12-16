### Mở đầu
Tuy rằng hiện tại đã có rất nhiều tài liệu cũng như bài viết giải thích về cơ chế xác thực OAuthen, nhưng đối với những người mới bắt đầu tiếp cận với công nghệ, hoặc hạn chế kiến thức về kĩ thuật, thì những document đó có vẻ hơi khó tiếp cận.
Vì vậy bài viết này sẽ cố gắng giải thích một cách đơn giản và dễ hiểu nhất, hướng tới mục tiêu giúp cho cả những người hạn chế kiến thức về kĩ thuật cũng có thể tiếp cận được.

Ok, chúng ta bắt đầu thôi.

### Bắt đầu giải thích
（1）Đầu tiên, chúng ta có User's Data, là phần dữ liệu của người dùng cần được bảo vệ và chia sẻ cho các ứng dụng liên quan.
![](https://images.viblo.asia/b8f90d5e-235c-421e-81c1-3d971b69799b.png).

（2）Để quản lý User's Data này, chúng ta có 1 server gọi là Resource Server.
![](https://images.viblo.asia/3e4bb348-d55e-4b5b-ab1e-29c8cfb8d400.png)

（3）Ở đâu đó có 1 Ứng dụng của Client muốn được sử dụng User's Data này.
![](https://images.viblo.asia/14e9dbe6-a3ae-4a67-9734-b2045244e98e.png)

（4）Để trao đổi User's Data thì phía Resource Server cần chuẩn bị 1 "cánh cửa" để có thể truyền nhận data. "Cánh cửa" này được gọi là API.
![](https://images.viblo.asia/4419c53b-cb3d-46a1-a70b-22bb7fd33221.png)

（5）Phía ứng dụng Client sẽ gửi request sử dụng User's Data tới Resource Server.
![](https://images.viblo.asia/e771fb21-6bd8-4e5c-9248-550871467736.png)

（6）Phía Resource Server sẽ trao User's Data cho ứng dụng Client.
![](https://images.viblo.asia/d96ab1c7-f38d-499a-a874-f3ada40139eb.png)

（7）Tuy nhiên, giả sử, nếu ứng dụng Client là 1 Ứng dụng có ý đồ xấu, hay Ứng dụng độc hại.
![](https://images.viblo.asia/e8a74eb6-c47f-4b9f-9f30-a8841f0ea4d7.png)

（8）Khi ứng dụng độc hại này gửi request lấy User's Data tới Resource Server
![](https://images.viblo.asia/b15bd5b4-d5ba-41cd-b651-6fdc2951df04.png)

（9）Thì Resource Server vẫn cứ trao User's Data cho ứng dụng này.
![](https://images.viblo.asia/8fab98ee-e0bc-4d05-aa59-771fccae90b0.png)

（10）Nếu cứ theo follow như vậy, thì User's Data sẽ được trao cho cả những ứng dụng độc hại, có ý đồ xấu...
![](https://images.viblo.asia/6d6afd0a-872c-423d-9bc6-a48a4b88cd26.png)

（11）Bởi vậy, sẽ cần 1 cơ chế để bảo vệ "cánh cửa" API.
![](https://images.viblo.asia/d6636d39-337c-4344-b405-5c9bab582ca1.png)

（12）Cơ chế bảo vệ API tốt nhất là trao trước cho Ứng dụng Client 1 thứ gọi là "Access Token". Access Token này sẽ chỉ ra Ứng dụng nào là thích hợp để được cho phép sử dụng User's Data.
(Có thể xem Access Token như 1 tấm vé để đi qua cổng API vậy)

![](https://images.viblo.asia/5c35391d-9cc2-450e-b589-57be4276af9c.png)

（13）Khi Ứng dụng Client gửi request lấy User's Data thì cùng lúc đó sẽ gửi kèm Access Token của mình.
![](https://images.viblo.asia/e374fa48-3f52-4e9b-941d-cd4044919d60.png)

（14）Phía Resource Server sẽ lấy ra Access Token được gửi kèm trong request.
![](https://images.viblo.asia/826be798-c414-4f02-b734-cf5a037da0cd.png)

（15）Và kiểm tra xem ứng dụng có quyền sử dụng User's Data hay không.
![](https://images.viblo.asia/a8f706e2-c9ef-413d-89d5-cd26978e8a9a.png)

（16）Nếu confirm được rằng ứng dụng đó có các quyền cần thiết để sử dụng User's Data thì sẽ trao User's Data cho Ứng dụng đó.
![](https://images.viblo.asia/4a02c1d0-14a9-409b-848c-81c00f1b06ab.png)

（17）Tuy nhiên, để làm cho cơ chế này hoạt động thì cần thiết phải trao Access Token cho Ứng dụng Client trước đó.
![](https://images.viblo.asia/7578d20d-898e-4538-8fde-102108455dbc.png)

（18）Hệ quả đương nhiên là sẽ cần tới một bên quản lý việc phát hành Access Token.
![](https://images.viblo.asia/9980b986-e9a3-4d48-9675-adf55e083340.png)

（19）Bên quản lý phát hành Access Token.
![](https://images.viblo.asia/74a86acf-7773-4f3c-a4a0-abf32b3bdf4c.png)

（20）Bên quản lý này sẽ được gọi là Authorization Server (Máy chủ uỷ quyền).
![](https://images.viblo.asia/4ce8cdd4-dc5f-4a70-ba93-cd91c2633eea.png)

（21）Sau đây sẽ giải thích một cách đơn giản hoạt động của Authorization Server và Ứng dụng Client.
![](https://images.viblo.asia/90bf32a0-0e00-4b35-8d2d-8d63cddc99b1.png)

（22）Authorization Server sẽ sinh ra Access Token.
![](https://images.viblo.asia/39a4393e-3b33-41c2-ac5c-02576c37c048.png)

（23）Sau đó sẽ phát hành Access Token cho Ứng dụng Client.
![](https://images.viblo.asia/a9c47b12-7a10-414f-b5fa-e29c17e9caa5.png)

（24）Chúng ta sẽ xem xét lại nội dung từ đầu cho tới bây giờ, với các đối tượng là Authorization Server, Ứng dụng Client, Resource Server.
![](https://images.viblo.asia/107546a7-b1b8-4ec7-a1c1-b636ac09cd2f.png)

Note：Thực tế thì có nhiều trường hợp cùng 1 server sẽ kiêm luôn Authorization Server và Resource Server.

（25）Authorization Server sẽ sinh ra Access Token.
![](https://images.viblo.asia/8572912d-bd73-45cc-b290-ce00c60b8a16.png)

（26）Sau đó sẽ phát hành Access Token cho Ứng dụng Client.
![](https://images.viblo.asia/f913cf84-385d-4c5e-924e-593237da025f.png)

（27）Ứng dụng Client, sẽ gửi request sử dụng User's Data kèm theo cả Access Token tới Resource Server.
![](https://images.viblo.asia/2faf24b3-62c6-4180-8dad-79c39c9e5547.png)

（28）Resource Server sẽ lấy ra Access Token được gửi kèm trong Request.
![](https://images.viblo.asia/7cee6a1d-18ed-4cd9-b09c-38c04dcd16a8.png)

（29）Và kiểm tra xem với Access Token này thì Ứng dụng Client có quyền sử dụng User's Data hay không?
![](https://images.viblo.asia/19b4e374-1d1a-4d31-a9c3-abdd89712daa.png)

（30）Nếu có, Resource Server sẽ trao User's Data cho Ứng dụng Client.
![](https://images.viblo.asia/2ecd0587-9797-4233-adfe-02001e27ec13.png)

（31）Với follow cho tới thời điểm hiện tại, thì Authorization Server sẽ cứ thế mà tạo Access Token rồi phát hành cho Ứng dụng Client. Nhưng trong thực tế thì, trước khi phát hành Access Token, Authorization Server sẽ lấy xác nhận của User. (User ở đây chính là phía sở hữu User's Data.)
![](https://images.viblo.asia/ec0d255e-16a6-4f4e-87db-c9e6a353b2f4.png)

（32）Đầu tiên, Ứng dụng Client sẽ gửi request xin Access Token tới Authorization Server.
![](https://images.viblo.asia/6bfc35d1-a39c-4705-b312-948324f9cb5b.png)

（33）Sau đó, Authorization Server sẽ xác nhận với User rằng có thể trao cho Ứng dụng Client các quyền mà Ứng dụng này đã request hay không.
![](https://images.viblo.asia/a566408a-bebf-4aae-b4a2-b9200b3045de.png)

（34）Nếu như phía User đồng ý việc trao quyền vào Access Token thì
![](https://images.viblo.asia/06bae597-1312-4a95-b62d-e4f64b0653d6.png)

（35）Phía Authorization Server sẽ sinh Access Token với các quyền tương ứng.
![](https://images.viblo.asia/4a33819c-698a-4073-ba39-8eec831417b0.png)

（36）Rồi phát hành Access Token đó cho Ứng dụng Client.
![](https://images.viblo.asia/e5d1abcb-91cc-41d6-9b0f-6df8684e92e2.png)

（37）Để ý tới phần được khoanh màu vàng bên dưới
![](https://images.viblo.asia/5d76a310-cc6e-4908-8347-58aa577026a1.png)

（38）Phần này thể hiện cho việc Request và Response Access Token
![](https://images.viblo.asia/a08a3c78-a171-480c-8844-219551291c10.png)

（39）Phần này được người ta tiêu chuẩn hoá thành 『OAuth 2.0』. Cụ thể về 『OAuth 2.0』sẽ được định nghĩa trong document [RFC 6749](https://tools.ietf.org/html/rfc6749)

![](https://images.viblo.asia/5be06aba-c0fb-42c6-9a1d-bbb88266c3bc.png)


**Đến đây là kết thúc phần giải thích cho OAuthen.**

Liên quan tới việc xác định tới User xem có cấp quyền cho Ứng dụng Client hay không (hình 33), mình sẽ giải thích cụ thể ở phần sau.
Hy vọng rằng bài viết này sẽ giúp ích cho những người mới bắt đầu tiếp cận tới cơ chế bảo mật API.

*Bài viết gốc:*
[一番分かりやすい OAuth の説明](https://qiita.com/TakahikoKawasaki/items/e37caf50776e00e733be)