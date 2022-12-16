Hiện nay, có nhiều ứng dụng thông báo cho người dùng những tin nhắn quan trọng liên quan đến ứng dụng của họ bằng cách gửi đi những thông báo - điều này có thể thông qua thông báo đẩy hoặc web. Với một thông báo web, một người dùng có thể click vào thông báo và ngay lập tức đi đến ứng dụng để tiếp tục hoạt động trên phần nội dung đó.<br>
Với các ứng dụng Stream Chat, một trường hợp có thể gửi thông báo khi có tin nhắn mới đến, như là Slack, WhatsApp, tin nhắn Facebook, v.v...<br> Trong bài này, bạn sẽ học cách sử dụng API thông báo Web - một đặc điểm của web - để hiện thông báo khi có tin nhắn đến ứng dụng của bạn.

[demoo: ](https://ucarecdn.com/0acf83d9-557a-4d9a-8378-fd25334872b1/?auto=format&fit=clip&ixlib=react-9.0.3&w=798)<br>
## Chuẩn bị cho dự án
Chúng ta sẽ làm ví dụ với dự án React. Để làm được, bạn sẽ phải clone một [Project React đơn giản từ Github](https://github.com/pmbanugo/react-conversational-ui-tutorial). Dự án này đồng hành với một [bài hướng dẫn ](https://getstream.io/blog/react-conversational-ui-chatbots/) dựng giao diện ứng dụng trò chuyện với React và Stream Chat. Mở ứng dụng command-line và parse dòng sau vào terminal của bạn:
```
git clone https://github.com/pmbanugo/react-conversational-ui-tutorial.git && cd react-conversational-ui-tutorial && yarn install
```
## Dùng API Thông báo
Câu lệnh bạn vừa chạy tải về project và cài đặt các phụ thuộc được yêu cầu để run app. Chúng tôi sẽ thêm các chỉnh sửa với app để người dùng được thông báo khi có tin nhắn mới đến.<br> Điều đầu tiên chúng ta cần làm để dùng API đúng cách là yêu cầu sự chấp nhận từ người dùng để cho phép ứng dụng của chúng ta gửi các thông  báo hệ thống từ trình duyệt.<br> Bằng cách đề nghị sự chấp thuận, API Thông báo sẽ cho phép người dùng điều khiển cái mà ứng dụng được cho phép để hiển thị thông báo, cũng như cái nào không được. Khi đã thực hiện một lựa chọn, các cài đặt nói chung vẫn tồn tại cho phiên hiện tại và cả tương lai. 
### Yêu cầu sự chấp nhận
API [Thông báo](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) hiển thị một phương thức `requestPermission()` được yêu cầu để yêu cầu sự chấp nhận để hiển thị thông báo đến người dùng. Chúng tối sẽ yêu cầu sự chấp thuận khi ứng dụng được load.<br> Mở project trong IDE mà bạn ưa thích và mở file `src/App.js`.<br> Sau đó, thêm code dưới đây vào lớp:
```js
componentDidMount() {
    this.askNotificationPermission();
  }

  askNotificationPermission = async () => {
    // check if the browser supports notifications
    if ("Notification" in window) {
      if (this.checkNotificationPromise()) {
        const permission = await Notification.requestPermission();
        this.handlePermission(permission);
      } else {
        Notification.requestPermission(permission => {
          this.handlePermission(permission);
        });
      }
    } else {
      console.log("This browser does not support notifications.");
    }
  };

  handlePermission = permission => {
    if (!("permission" in Notification)) {
      Notification.permission = permission;
    }
  };
  ```
  Trong đoạn code trên, chúng ta đã thêm một phương thức tên là `askNotificationPermission()` cái mà được gọi khi component được mounted.<br> Phương thức `askNotificationPermission()` đầu tiên kiểm tra xem trình duyệt có hỗ trợ API Thông báo hay không. Nếu có, nó gọi `checkNotificationPromise()` để kiểm tra xem trình duyệt có hỗ trợ phiên bản promise-based của `Notification.requestPermission()` hay không, và dựa trên kết quả này, nó sẽ gọi một trong hai: promised-based API version hoặc callback-based version.<br>Khi một người dùng đáp lại yêu cầu chấp thuận, chúng ta sẽ gọi phương thức `handlePermission(permission)` cái mà sẽ cài đặt một cách rõ ràng giá trị của `Notification.permission` bởi vì phiên bản cũ của Chrome không tự động làm điều này.<br> Chúng ta đã nhắc đến là ta phải kiểm tra xem liệu trình duyệt có hỗ trợ promise-based version hay không của `Notification.requestPermission()`. Chúng ta đã làm điều này với một lần gọi đến phương thức `this.checkNotificationPromission(). Hãy thêm định nghĩa cho phương thức này:
  ```js
  checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch (e) {
      return false;
    }

    return true;
  }
  ```
  Điều mà phương thức này làm là gọi phương thức `.then()` trong `Notification.requestPermission()` và sau đó trả về true nếu nó không ném ra lỗi, hoặc trả về false nếu nó có.
  ### Hiện thông báo
  Một thông báo được hiển thị khi ta gọi instance `Notification` bằng constructor. Constructor phải được truyền một đối số `title`, và có thể lựa chọn truyền thêm đối tượng `options` để phân loại các lựa chọn như `text direction`, `body text`, và hơn thế nữa.<br>
  Hãy tạo một phương thức mà sẽ chịu trách nhiệm cho điều này và gọi phương thức này trong phương thức `onNewMessage`.<br> Thêm một phương thức tên là `createNotification`:
  ```js
  createNotification(message) {
    return new Notification(`${message.author.name} sent a message`, {
      body: message.text
    });
  }
  ```
  Phương thức này chấp nhận tin nhắn như là những đối số. Nó gọi constructor `Notification()` với một tiêu đề dùng tin nhắn văn bản là phần thân văn bản của thông báo.<br> Bây giờ chúng ta sẽ gọi phương thức này bên trong phương thức `onNewMessage`. Thêm code dưới đây vào sau dòng 77
  ```js
  if (message.author.id !== this.user.id) {
   this.createNotification(message);
}
```
Với code vừa thêm, thông báo sẽ chỉ tạo ra nếu tác giả của tin nhắc gần đây không đăng nhập người dùng.
## Đặt tất cả lại với nhau
Hãy xem cách điều này hoạt động trên trình duyệt. Chúng ta sẽ chạy ứng dụng React, nhưng chúng ta cũng cần một API để sinh các user access token cho Stream Chat client. Chúng ta sẽ dùng dự án mà bạn có thể tìm kiếm trên Github. Theo dõi hướng dẫn trong file README để cài đặt và bắt đầu ứng dụng. Khi nó đã được bắt đầu, bắt đầu ứng dụng React bằng cách chạy `yarn start` trong command line.<br>
[demo](https://ucarecdn.com/0acf83d9-557a-4d9a-8378-fd25334872b1/?auto=format&fit=clip&ixlib=react-9.0.3&w=798)
  ## Kết thúc
Xong rồi! Bạn đã biết được cách dùng API Thông báo để hiển thị thông báo. Để sử dụng API này, đầu tiên bạn cần có sự chấp thuật từ người dùng bằng cách gọi `Notification.requestPermission()` và sau đó tạo thông báo sử dụng constructor `Notification()`, truyền và title và đối tượng options.
  
Code của hướng dẫn này 100% là mã nguồn mở và có sẵn trên [Github](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
  he he