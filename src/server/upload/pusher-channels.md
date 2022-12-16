## Tổng quan
Pusher Channels giúp kết nối realtime giữa các servers, apps và devices. Channels được dùng cho các biểu đồ realtime, realtime user lists, realtime maps, game nhiều người chơi, và nhiều ứng dụng khác.

Khi có thay đổi trên hệ thống của bạn, nó có thể update web-pages, apps và devices. Khi có một event xảy ra trên app, thì app cũng có thể bắn notify đến các apps khác và hệ thống của bạn. Ví dụ, nếu giá của Bitcoin thay đổi, hệ thống có thể update việc hiển thị các thông tin hiển thị chart, dữ liệu của tất cả apps và trang web đang mở.

Pusher Channels có thư viện hỗ trợ cho: web browsers, iOS, Android apps, PHP frameworks, cloud functions, bash scripts, IoT devices. Pusher Channels có thể hoạt động bất kỳ đâu bởi vì nó sử dụng [WebSockets](https://pusher.com/websockets) and HTTP, và WebSockets đồng thời nó còn hỗ trợ cơ chế dự phòng cho những device không sử dụng WebSockets.

![image.png](https://images.viblo.asia/1906cd5d-7851-43a9-9b8d-37b7707e8582.png)

Pusher Channels có publish/subscribe model. Ví dụ một ứng dụng mobile app mà nó theo dõi giá Bitcoin hiện tại thì có thể subscribe đến channel có tên là `bitcoin`. Và khi giá Bitcoin thay đổi, thì hệ thống có thể pubish giá mới đến channel có tên `bitcoin` đó. Tất cả các subscibers đến channel `bitcoin` có thể nhận giá trị mới để update dữ liệu.

Bạn có thể publish những thông tin data bảo mật thông qua private channels. Apps phải có sự cho phép để subscribe đến private channel. Ví dụ, bạn có thể hạn chế channel `private-user-alice` vì thế chỉ có Alice's app mới có thể subscribe đến nó. Còn đối với public data thì ta có thể sử dụng public channels.

Presence channels cho biết ai đang online. Các ứng dụng có thể sử dụng các presence channels để hiển thị danh sách người dùng có trạng thái "online/offline". Ví dụ, khi Bob’s app subscribes đến một presence channel, ứng dụng sẽ cung cấp user id bob. Alice’s app có thể subscribe đến presence channel, sau đó cho Alice biết rằng Bob đang online.

Pusher Channels cho bạn biết mọi thứ đang diễn ra, vì vậy bạn có thể gỡ lỗi, phân tích và ghi lại hoạt động ứng dụng của mình. Bạn có thể xem mọi connection, publish, và subscribe. Hoạt động realtime được hiển thị trong trang Channels dashboard của bạn và có thể được gửi đến hệ thống của bạn qua webhooks. Bạn có thể truy vấn các kết nối và đăng ký hiện tại thông qua API và thư viện. Các chỉ số được hiển thị trong trang dashboard của bạn và có thể được xuất sang tài khoản Datadog hoặc Librato của bạn.

## Connection

Client API: cung cấp thông tin về cách thực hiện các hành động cụ thể bằng cách sử dụng [thư viện](https://pusher.com/docs/channels/channels_libraries/libraries) do Pusher cung cấp. 
Channels connection là phương tiện giao tiếp cơ bản với sevice. Nó là một kết nối hai chiều và có thể nhận tin nhắn cũng như gởi tin nhắn từ server.
Khi bạn tạo new Pusher object thì nó tự động connect tới Channels.

`var pusher = new Pusher("APP_KEY", options);`

Trong đó:
`"APP_KEY"`
`options`: Tham số không bắt buộc, config đối với instance Pusher mới được khởi tạo. Ví dụ, config như sau:

```
{
  cluster: 'APP_CLUSTER',
  forceTLS: true,
  auth: {
    params: {
      param1: 'value1',
      param2: 'value2'
    },
    headers: {
      header1: 'value1',
      header2: 'value2'
    }
  }
}
```

với "APP_KEY",  "APP_CLUSTER" được lấy khi bạn [Create your Channels apps](https://dashboard.pusher.com/apps) chi tiết như sau:

![Create app](https://images.viblo.asia/da1477d8-cb5d-4447-9695-538d3d4929f5.png)

![App key](https://images.viblo.asia/92a67b42-c973-4dae-ae45-c8f4071c2098.png)

## Channels
Mỗi ứng dụng có thể có một hoặc nhiều channel và mỗi client có thể chọn những channel mà ứng dụng đăng ký. Có 4 loại channel:
* Public channels: Bất kỳ ai biết tên của họ đều có thể đăng ký.
* Private channels: phải có tiền tố private-. Nó giới thiệu một cơ chế cho phép server của bạn kiểm soát quyền truy cập vào dữ liệu bạn đang phát.
* Private encrypted channels phải có tiền tốprivate-encrypted-. Chúng mở rộng cơ chế xác thực của các private channels, thêm mã hóa các data payloads để ngay cả Pusher cũng không thể truy cập vào nó mà không cần xác thực.
* Presence channels: phải có tiền tố presence- và là phần mở rộng của các private channels. Nó cho phép bạn 'register' thông tin người dùng khi đăng ký và cho các thành viên khác của channel để biết ai đang online.

Bạn có thể subscribe và unsubscribe channel bất kỳ lúc nào. Không cần phải đợi Channel hoàn thành việc connect lần đầu:

```
//subscribe
var channel = pusher.subscribe(channelName);

//unsubscribe
pusher.unsubscribe(channelName);
```

Nếu channel đã được subscribe, bạn có thể truy cập các channel theo name, ví dụ:

```
var channel = pusher.channel(channelName);
```

## Events
Events là phương pháp chính để đóng gói thông điệp trong hệ thống Channel. Chúng tạo thành nền tảng của mọi giao tiếp.

Về cơ bản, chúng là "named messages", có nghĩa là bạn có thể thiết lập "handlers" trong client code của mình để xử lý các loại khác nhau. Vì vậy, chúng được sử dụng cho định tuyến 'client-side’ và không được sử dụng làm bộ lọc (các channel có thể thực hiện việc này hiệu quả hơn nhiều ở phía server).

Các event có thể được coi là một thông báo về điều gì đó đang xảy ra trên hệ thống của bạn và chúng thường được đặt tên ở thì quá khứ. Ví dụ:message-created, todo-finished.

### Binding to events
Hầu hết hành vi `binding` và `triggering` được gắn với channels mà client được subscribed đến, mặc dù nó có thể bind đến tất cả các events trên bất kể Channels nào. Ví dụ:

* Binding on the channel

```
var pusher = new Pusher("APP_KEY");
var channel = pusher.subscribe("APPL");
channel.bind("new-price", (data) => {
  // add new price into the APPL widget
});
```

* Binding on the client

```
var pusher = new Pusher("APP_KEY");
var channel1 = pusher.subscribe("my-channel-1");
var channel2 = pusher.subscribe("my-channel-2");
var channel3 = pusher.subscribe("my-channel-3");
var eventName = "new-comment";
var callback = (data) => {
  // add comment into page
};
// listen for 'new-comment' event on channel 1, 2 and 3
pusher.bind(eventName, callback);
```

* Unbinding from events

```
var pusher = new Pusher("APP_KEY");
var channel = pusher.subscribe("APPL");
var callback = (data) => {
  // Do something with the data here
};
channel.bind("new-price", callback);

// Remove just 'handler' for the 'new-price' event
channel.unbind("new-price", handler);

// Remove all handlers for the 'new-price' event
channel.unbind("new-price");

// Remove all handlers on 'channel'
channel.unbind();

```