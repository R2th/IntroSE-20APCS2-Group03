Xin chào! Như các bạn đã biết, Slack là một trong những công cụ hỗ trợ trao đổi thông tin cũng như quản lý làm việc nhóm thuận tiện nhất hiện nay. Với Slack bạn có thể nhắn tin, chia sẻ tài liệu, họp mặt, sắp xếp lịch họp một cách dễ dàng thông qua việc sử dụng các "kênh chat" đóng vai trò như một phòng thảo luận nhỏ và khép kín. Điều làm nên sự khác biệt của Slack so với những công cụ khác như Skype, Mattermost hay Discord có thể kể tới 3 điều sau đây:
* Slack có một kho lưu trữ [Slack App Directory](https://miraidevworkspace.slack.com/apps) bao gồm các ứng dụng bên thứ 3 vô cùng rộng lớn, cho phép người dùng có thể thoải mái sử dụng các tiện ích của chúng trong quá trình làm việc. Có thể kể tới như: Github, Dropbox, Google Calendar, Trello,.....Ngoài ra, Slack còn cho phép người dùng có thể tự phát triển cho mình một App với tính năng tùy ý để phục vụ cho mục đích cá nhân khi sử dụng Slack. Bạn có thể public chúng lên Slack App Directory. Tuy nhiên, trước khi App của bạn được đẩy lên trên kho ứng dụng, nó sẽ phải vượt qua được sự đánh giá của đội ngũ Slack để đảm bảo chất lượng và tính hữu dụng của sản phẩm nhé.
* Slack hỗ trợ đa nền tảng (Windows, Linux, MacOS, Android, iOS…), cho phép nhóm có thể trao đổi với nhau từ bất kỳ thiết bị nào mà không gặp bất kỳ một khó khăn gì.
* Slack cho phép lưu trữ miễn phí đến 10.000 tin nhắn, 5GB dung lượng lưu trữ và kết nối đến 5 dịch vụ hãng khác. Gói trả phí tất nhiên sẽ còn nhiều nâng cấp hơn nữa :sunglasses: 

Tóm lại, điều mà Slack mang lại đó là sự kết nối (Connected) , tính linh hoạt (Flexible) và toàn diện (Inclusive) thông tin cho người dùng. Tránh đi những phiền phức và lộn xộn mà việc trao đổi qua mail gây ra.

## Một số khái niệm trong Slack
Okay! Phần này mình sẽ giới thiệu nhanh một số những khái niệm cơ bản trong Slack đối với những bạn chưa từng nghiên cứu qua về chúng nhé!

| Tên | Chức năng | 
| -------- | -------- |
| Workspace     | Là một ngôi nhà lớn - nơi tập hợp mọi người lại, cài đặt app tiện ích và lưu trữ tệp tin. Nó là thứ đầu tiên bạn cần [tạo](https://slack.com/intl/en-vn/help/articles/206845317-Create-a-Slack-workspace) để bắt đầu sử dụng Slack     | 
| Conversation/Channel    |Là một căn phòng trong ngôi nhà Workspace - nơi một nhóm người nhất định tham gia có thể trực tiếp trò chuyện, trao đổi thông tin với nhau| 
| Message  | Nội dung tin nhắn gửi lên channel     | 
| Thread     | Là một cuộc thảo luận xung quanh một tin nhắn cố định nào đó. Cụ thể nó sẽ được sinh ra khi bạn reply một tin nhắn bất kỳ     | 
|  Shortcut     | Là một phần tử giúp bạn gọi ra một xử lý cụ thể. Shortcut hoàn toàn có thể định nghĩa khi tạo App và sử dụng chúng như 1 con trigger gọi đến webhook. Có 2 loại shortcut cơ bản: Global Shortcut và Message Shortcut | 
| Global Shortcut  | Là shortcut luôn tồn tại trong message composer, có thể gọi ở bất kỳ channel nào và thường được sử dụng để trigger các xử lý không quan tâm đến bối cảnh của 1 channel cụ thể như tạo sự kiện hay xem lại lịch họp,,....    | 
| Message Shortcut  | Là shortcut hiển thị trong menu của 1 message cụ thể và đi kèm ngữ cảnh của tin nhắn đó (channel_id, user_id,...). Chính vì thế, nó thường được sử dụng để gửi tin nhắn lên 1 channel,  xử lý nội dung message,...    | 
| Command     | Là phần tử cho phép bạn gọi đến ứng dụng bằng cách gõ lên ô nhập tin nhắn theo cú pháp` /ten_command`. Không chỉ giống như Shortcut có chức năng hoạt động như 1 trigger, Command còn thường được sử dụng để mở đầu sự tương tác của người dùng với app bằng việc trả về thông tin hướng dẫn cơ bản | 

![image.png](https://images.viblo.asia/abb63e64-2ea0-4d8b-8363-b265332104e8.png)

![image.png](https://images.viblo.asia/fa4e67a1-ddfc-453a-919b-d2fc2e1f3d96.png)

*Global Shortcut và Messageshortcut*

Ở đây mình sẽ chỉ liệt kê 1 số khái niệm bạn sẽ gặp phải trong quá trình khởi tạo và sử dụng Slack App ở phần sau. Để biết chi tiết hơn về các khái niệm khác, các bạn có thể đọc thêm [tại đây](https://slack.com/intl/en-vn/help/articles/360059928654-How-to-use-Slack--your-quick-start-guide?utm_source=hppromo&utm_medium=promo)

## Xây dựng một Slack App
Như mình đã nói, Slack sẽ hỗ trợ chúng ta có thể tự tạo một Slack App, cấu hình chúng liên kết với Workspace và sử dụng những chức năng mà ta tự phát triển trong quá trình làm việc. Tiếp theo đây, mình sẽ tạo một Slack App có tính năng giống như 1 con Bot thực hiện việc dịch văn bản.

Đầu tiên bạn cần tạo cho mình một Slack App[ tại đây](https://api.slack.com/apps?new_app=1). Sẽ có 2 lựa chọn: 
* From scratch: sẽ sử dụng màn hình setting của Slack để cài đặt thủ công các cấu hình của app như thông tin hiển thị, phạm vi truy cập,....
* From an app manifest: sẽ sử dụng file config mà bạn đã định nghĩa sẵn để thực hiện cấu hình app.

Sau khi điền một số thông tin như tên app và lựa chọn workspace tương ứng để cài đặt app, bạn sẽ được dẫn đến màn hình dưới đây:
![image.png](https://images.viblo.asia/c62cf1f0-8cf7-447c-8833-39b4c88e300e.png)

Ở đây, ta sẽ quan tâm tới một số tab trong mục Features:` Interactivity & Shortcuts`,` Slash Commands`, `OAuth & Permissions` và `Event Subscriptions` để thực hiện việc tạo 1 con Bot như mong muốn:
### Config tại OAuth & Permissions
Đầu tiên ta sẽ đi tới tab  OAuth & Permissions để cài đặt các thông số liên quan đến Token và Scope - quyền và phạm vi mà con Bot có thể hoạt động trên workspace của bạn:
![image.png](https://images.viblo.asia/f6d058b1-0dc9-40a4-b31e-3f42d690122a.png)

Thông số Bot User OAuth Token sẽ là unique với từng Slack App và sẽ dùng nó là một trong những thông số bắt buộc khi bạn gọi app để xử lý phía webhook.

Cái mà ta cần config ngay lúc này đó là mục Bot Token Scopes, ta cần thêm cho nó những phạm vi truy cập cơ bản để Bot có quyền được đọc thông tin của tin nhắn trong Slack (`im:read`), quyền được gửi một tin nhắn lên Slack (`chat:write`). Ngoài ra bạn có thể add thêm scope khác nếu cảm thấy cần thiết.
![image.png](https://images.viblo.asia/d368e3f5-76f6-4e86-bc96-d2eb729fa421.png)

### Tạo Webhook 
Đến bước này, bạn tạm ngưng config trên Slack và bắt đầu khởi tạo webhook để đón trigger từ phía Slack. Trước tiên, ta sẽ sử dụng Bolt - một framework khá đơn giản cho phép bạn tạo các ứng dụng Slack với chức năng cố định một cách nhanh chóng. Để cài đặt Bolt:

```
npm install @slack/bolt
```
Sau đó thực hiện việc khởi tạo Slack App dưới Webhook: 
```
const { App } = require('@slack/bolt');
require('dotenv').config()

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,  
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('Bolt app is running!');
})();
```
* Giá trị của SLACK_BOT_TOKEN chính là giá trị bot token ở mục OAuth & Permissions mà mình vừa nói ở trên.
* Giá trị của SLACK_SIGNING_SECRET bạn có thể lấy ra ngay tại mục App Credentials trong tab Basic Information. Giống như bot token, nó được sinh ra ngay sau khi bạn tạo app mới trên giao diện Slack.

### Lắng nghe các tương tác trên Slack 
Để Slack có thể liên kết với bên phía Server của bạn, bạn cần cung cấp cho bên Slack một URL mà nó có thể truy cập vào. Mỗi khi có sự kiện được xảy ra, Slack sẽ gửi một HTTP POST tới URL đó. Bolt sử dụng endpoint `/slack/events` để lắng nghe các yêu cầu tới (có thể là shortcut, command, events hay payload,..) 
Để test dưới môi trường local, bạn có thể sử dụng dịch vụ proxy như [ngrok](https://ngrok.com/) để tạo public URL và yêu cầu tunnel tới môi trường phát triển của bạn. Các bạn có thể tham khảo cách cài đặt [tại đây ](https://api.slack.com/tutorials/tunneling-with-ngrok)

### Config tại Event Subscriptions
Sau khi chạy webhook ngon nghẻ dưới local và tạo 1 public URL từ ngrok ta sẽ quay lại màn hình config của Slack App của mình, vào tab Event Subscriptions.

Tại đây bạn ấn enable đăng ký dịch vụ lắng nghe sự kiện từ Slack, sau đó điền Request URL có giá trị là `https://ngrok_domain//slack/events`

![image.png](https://images.viblo.asia/1b59db97-c093-4d38-a590-9cdb771ee33f.png)

Sau đó bạn add thêm một vài events mà Bot cần truy cập vào. Mình sẽ add bốn [events](https://api.slack.com/events) liên quan đến message: `message.channels`, `message.groups`, `message.im`, `message.mpim`

Sau khi Save, sẽ có thông báo yêu cầu bạn phải reinstall app của bạn qua bên workspace nhé!

### Đón trigger và trả về tin nhắn cho bên Slack 
Mình sẽ test thử việc tạo app và liên kết nó với bên webhook đã thành công hay chưa bằng cách chạy đoạn code sau: 
```
const { App } = require('@slack/bolt');
require('dotenv').config()

console.log(process.env.SLACK_BOT_TOKEN);

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('hello', async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
});


(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('Bolt app is running!');
})();
```
Ở đây, mình có tạo một hàm lắng nghe sự kiện liên quan đến *message*. Hàm này sẽ có chức năng bắt những message mà có kí tự 'hello' trong nội dung, lấy ra thông tin message và trả về hàm say(). Hàm say() có chức năng send một message trên Slack với vai trò là con Bot. Chúng ta quay trở lại Channel trên Slack:
* Add app vào channel bằng cách gõ `@name_app` 
* Thực hiện gửi message có nội dung Hello

Đây là kết quả mình nhận được:
![image.png](https://images.viblo.asia/dead1bce-02e2-41e4-a2f0-8e7584003d2c.png)


## Kết luận
Vậy là mình đã cùng các bạn tìm hiểu về Slack, đi qua một vài khái niệm cơ bản của Slack và cùng nhau dựng lên Slack App đơn giản,  connect nó với webhook phía local. Mình sẽ để phần giới thiệu về việc tạo shortcut cũng như làm con Bot có thêm tính năng dịch văn bản ở bài viết sau nhé! Hẹn gặp lại  :kissing_heart: 

## TÀI LIỆU THAM KHẢO
*  https://slack.dev/bolt-js/tutorial/getting-started-http
* https://api.slack.com/interactivity/shortcuts/using