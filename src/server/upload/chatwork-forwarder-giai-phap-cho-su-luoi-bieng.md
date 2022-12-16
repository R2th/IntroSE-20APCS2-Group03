![](https://images.viblo.asia/f0a33127-77a8-41f9-ac61-b38e11ea7950.png)

**Chatwork Forwarder** là một opensource được phát triển bằng Laravel framework, giúp dự án của bạn giải quyết những vấn đề sau
1. Gửi message lên Chatwork (private hoặc room)
2. Nhận payload từ một service khác, bóc tách dữ liệu theo các điều kiện và config của người dùng.
3. Mapping dữ liệu để message gửi đi thân thiện, dễ hiểu hơn với người đọc.
4. Cùng lúc gửi được nhiều message cho nhiều room hoặc private, tùy vào config của người dùng.

Nếu dự án của bạn đang làm việc với chatwork, bạn đang cần xử lý gửi message khi nhận được dữ liệu đầu vào, hoặc đơn giản chuyện diễn ra hàng ngày khi mội member trong project gửi một **Pull Request** họ lại phải TO lên box dự án yêu cầu review merge Pull, công việc này lặp đi lặp lại, vừa gây nhàm chán mà tốn thời gian. Chatwork forwarder sẽ giúp dự án cuả bạn giải quyết những vấn đề đó cực kỳ nhanh gọn, chỉ cần vài thao tác config dễ dàng.

Cùng xem qua một chút về cách sử dụng Chatwork forwarder nhé.

### 1. Landing page & login
Đầu tiên truy cập vào url [https://cw-forwarder.sun-asterisk.vn/](https://cw-forwarder.sun-asterisk.vn/) là màn hình landing page của Chatwork forwarder, tại đây khi chưa đăng nhập chúng ta sẽ thấy một button Login, bạn có thể dùng bất kỳ tài khoản google nào để login và bắt đầu sử dụng.

![](https://images.viblo.asia/17cef2a1-4f85-468b-ae32-8e5cf78854d8.png)

### 2. Dashboard
Sau khi login thành công là giao diện dashboard thể hiện thống kê
1.  Số webhook đã tạo
2.  Số Payload đã gửi đến
3.  Số message được gửi đi
4.  Số bot đang sử dụng

![](https://images.viblo.asia/eaf055ad-9a8e-4b70-aa07-dcf30548ca5f.png)

### 3. Bots
Đây là phần quản lý việc thêm, sửa một chatwork bot vào hệ thống, như chúng ta biết để có thể gửi message lên chatwork bắt buộc bạn phải có một tài khoản chatwork làm con Bot, và phải lấy được API token của nó để thực hiện gửi message.

![](https://images.viblo.asia/8334a8e2-74f7-4747-beed-a182e48b81b4.png)

> Bot Key hay chính là API token của tài khoản Bot bạn có thể vào phần API setting của chatwork để lấy.
> 
Chúng ta sẽ sử dụng con bot này cho ví dụ gửi message yêu cầu check Pull Request ở những phần sau.

### 4. Webhooks
Tại màn hình list webhook là những webhook đã tạo, tại đây chúng ta có thể tạo mới webhook hoặc edit webhook đã tồn tại.

Ví dụ mình sẽ tạo webhook cho dự án XYZ để gửi message check Pull Request mỗi khi có member gửi Pull. Sử dụng con bot đã tạo lúc đầu và TO đến chính mình (Nếu muốn TO lên room bạn có thể chọn type room là `Group` thay vì `Private` )
![](https://images.viblo.asia/4f096d38-c040-4d3c-8ba9-cfd18fb14e27.png)

Sau khi **save**, lập tức chúng ta sẽ qua màn hình `edit webhook`, ở đây là nơi cho phép config các thành phần quan trọng như **payload** sẽ nhận, các điều kiện để message được gửi đi khi payload thỏa mãn và convert dữ liệu nếu cần ở mục **mapping**

![](https://images.viblo.asia/0e3e5478-b8f9-449c-affd-666fedb7fdb6.jpg)

**Url** chính webhook được tạo ra để cung cấp cho các dịch vụ mà chúng ta muốn nhận được payload. copy url này và vào phần setting webhook trên github dự án (Chỉ quyền admin dự án mới vào được phần setting này)

![](https://images.viblo.asia/bc05c6a5-0c7f-4b57-87f1-0a21dd326294.png)

> Lưu ý phần Content type sẽ default là `applicationi/x-www-form-urlencoded` chúng ta cần chuyển về application/json.
> 

Để nhận được payload mỗi khi có Pull Request chúng ta cần check chọn vào event `Pull requests` trong setting của github.

![](https://images.viblo.asia/a74ec04b-9997-4852-9268-f04c869bae4a.png)

Nhấn **Update webhook** 

### 5. Payload
Đây là phần quan trọng nhất cho phép config payload, điều kiện và content cần gửi lên chatwork, tại mỗi phần sẽ có example (màu xanh) để cho các bạn dễ hiểu.

![](https://images.viblo.asia/289395d8-6fd1-436e-a35d-db59a002b8e9.png)

![](https://images.viblo.asia/7b231cf7-267a-43c2-a000-9b0cb043f0c8.png)

Với Github để có payload params mẫu, chúng ta lại vào phần setting webhook, tại phần `Recent Deliveries` tùy vào từng event mà github sẽ trả về những payload khác nhau, ở đây của chúng ta là event Pull Request.

![](https://images.viblo.asia/0ac0c8d2-9d60-4131-bb97-9058c2e8bdfe.jpg)

Sau khi copy phần payload mẫu của một PR, chúng ta sẽ paste vào input Payload params. Các phần condition và content chúng ta có thể làm theo example sao cho hệ thống có thể tìm và đọc được dữ liệu bạn muốn lấy trong payload đã paste vào ở trên.
ví dụ:

![](https://images.viblo.asia/e7bc15e0-af66-47b3-94e9-e1e3f8d6cb1c.png)

> Lưu ý: Chúng ta có thể sử dụng tiền tố **$params** hoặc không.
> 

Như vậy là sau khi save lại và chờ đợi khi có một PR , chúng ta sẽ nhận được message TO đến chatwork

![](https://images.viblo.asia/f09e17cf-9716-4fa6-b7b5-5b5cda93634b.png)

### 6. Mapping
Đây là phần có tác dụng giúp bạn convert dữ liệu từ value này sang value khác, hiểu đơn giản như ví dụ trên chúng ta có user id là 38203330, tuy nhiên bạn không muốn hiển thị như vậy mà muốn thay vì là 38203330 sẽ hiển thị là Quách Đại Phúc. Đơn giản chỉ cần config trong phần mapping như sau:

![](https://images.viblo.asia/eb4d7daa-a0db-47e2-a67b-3b7f134fcac4.png)

Trong phần content của payload chúng ta cũng hoàn toàn có thể config lúc nào thì mapping value, còn lúc nào thì không
> Giữ nguyên value **{!! $params.user.display_name !!}**
> 
> Dữ liệu muốn mapping **{{$params.user.display_name}}**
> 

### 7. Kết luận
Như vậy chúng ta đã có giải pháp cho những công việc nhàm chán hàng ngày bằng một trải nghiệm mới với Chatwork forwarder, ngoài ví dụ trên các bạn hoàn toàn có thể dùng chatwork forwarder để làm nhiều việc khác nếu dự án của các bạn có đang sử dụng chatwork. Trên đây là toàn bộ hướng dẫn sử dụng trước khi dùng, hy vọng sẽ phần nào giúp ích được cho các bạn.

### 8. Contribution
Github  [https://github.com/sun-asterisk-research/chatwork-forwarder ](https://github.com/sun-asterisk-research/chatwork-forwarder )