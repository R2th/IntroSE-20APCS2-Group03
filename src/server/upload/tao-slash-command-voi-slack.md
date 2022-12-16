## 1. Mở đầu
<hr>

Gần đây do yêu cầu công việc mà mình mới tiếp xúc với Slack, một comunication platform phục vụ cho việc liên lạc giữa các thành viên trong team, trong tổ chức với nhau. Giống như các nền tảng khác như Chatwork, Telegram, Skype, ... thì Slack cung cấp cho chúng ta các tính năng cơ bản như chat với nhau, video call, chia sẻ file, ... . Tuy nhiên ngoài các tính năng cơ bản đó, Slack cung cấp cho các developer một loạt các tính năng cho phép chúng ta bổ sung thêm các tính năng mong muốn trên Slack và trong bài viết ngày hôm nay mình sẽ giới thiệu với các bạn về `Slash Command`.

## 2. Slash Command
<hr>

### a. Giới thiệu

Giả sử chúng ta đang bàn bạc công việc với team trên Slack và cần lấy các thông tin liên quan đến số liệu về sản phẩm mà chúng ta đang phát triển như lượt truy cập, số lượng user mới trong ngày, ... thì thông thường ta sẽ cần truy cập vào trang admin của sản phẩm để lấy thông tin đó và copy lên cho mọi người trong team cùng xem.

![](https://images.viblo.asia/1e5549d9-39e3-4cbd-a54c-b734bc2479cf.png)

Tuy nhiên với Slack cung cấp cho chúng ta một tính năng gọi là `Slash Command` được dùng để thực hiện các thao tác dạng như trường hợp nói trên. Nghĩa là ta có thể gõ một command bất kỳ trên phần chat của Slack và Slack sẽ gửi lệnh của chúng ta đến hệ thống của chúng ta và hệ thống của chúng ta sẽ xử lý yêu cầu đó và trả kết quả như nói trên về cho chúng ta. Về flow nó sẽ như sau:

![](https://images.viblo.asia/50f3ba99-8e2a-42a3-9756-ccb965853319.png)

### b. Tạo slash command

Để tạo một `Slash Command`, đầu tiên chúng ta sẽ cần tạo sẵn một Slack App. Việc tạo Slack App rất đơn giản chỉ gồm một vài bước click chuột rất đơn giản nên mìn sẽ không để cập đến ở đây, các bạn có thể tạo App ở đây: https://api.slack.com/apps . Sau khi đã tạo được App, bạn vào mục **Basic Information** chọn **Slash Commands**:

![](https://images.viblo.asia/5b333b92-391b-4f32-9953-9f9cea51afae.png)

Sau khi bấm vào **Slash Commands**, sẽ hiện ra giao diện chứa danh sách các command đã được tạo trước đó cũng  như nút để tạo command mới:

![](https://images.viblo.asia/12093782-f063-4237-90d6-b01a3d3f8e65.png)

Tiếp đến là giao diện để điền các thông tin cho command của bạn:

![](https://images.viblo.asia/75db2e99-7885-48d8-b6b7-793b4fc929f9.png)

- **Command**: sẽ là lệnh mà người dùng sẽ gõ trên Slack. Bạn lưu ý các lệnh này bắt buộc phải bắt đầu bằng ký tự `/` ở đầu.
- **Request URL**: đây sẽ là URL của hệ thống của bạn dùng để xử lý lệnh nói trên.
- **Short Description**: sẽ là mô tả ngắn gọn cho lệnh của bạn.
- **Usage Hint**: sẽ là mô tả bổ sung trong trường hợp command của bạn có nhận vào thêm tham số, tạm thời mình chưa cần để ý.
- **Escape**: cũng tương tự dùng cho trường hợp lệnh của bạn có tham số phụ, tạm thời mình sẽ chưa nói đến .

Sau khi đã điền đầy đủ thông tin bạn chọn **Save** là xong.

### c. Demo command

Sau đây mình sẽ demo tạo một `Slash command` đơn giản bên Slack, yêu cầu cụ thể như sau:
- Khi người dùng gõ lệnh `/hello` sẽ nhận lời chào từ dịch vụ của chúng ta là "Hi".

Đây là phần config mình đã tạo sẵn trên Slack như sau:

![](https://images.viblo.asia/c9b2de08-6484-4687-8bfd-d132763bf445.PNG)


Bên hệ thống của bạn cần có một API tương ứng với phần **Request URL** dùng để xử lý lệnh từ người dùng. Ở đây bạn có thể dùng bất cứ ngôn ngữ backend nào mình muốn còn mình muốn để xử lý yêu cầu này. Đầu tiên thứ ta cần quan tâm khi nhận một payload từ `Slash Command` của Slack là phần payload header:

```json
{
    "host": "0d6f6febbcc912.localhost.run",
    "forwarded": "for=34.228.241.92;proto=https;host=0d6f6febbcc912.localhost.run",
    "x-forwarded-for": "34.228.241.92",
    "x-forwarded-proto": "https",
    "x-forwarded-host": "0d6f6febbcc912.localhost.run",
    "user-agent": "Slackbot 1.0 (+https://api.slack.com/robots)",
    "accept-encoding": "gzip,deflate",
    "accept": "application/json,*/*",
    "x-slack-signature": "v0=ca2dd138f97d5874837c17dafc2d91734b00a05c6842aab168780acf684adaf8",
    "x-slack-request-timestamp": "1637315186",
    "content-length": "415",
    "content-type": "application/x-www-form-urlencoded",
}
```
Sở dĩ ta cần quan tâm đến phần header này trước vì trước khi xử lý bất cứ yêu cầu gì từ phía Slack ta sẽ cần kiểm tra xem yêu cầu đó có đúng đến từ Slack App của chúng ta hay không. Bạn để ý, ở header sẽ có phần `x-slack-signature` sẽ được dùng để kiểm tra tính xác thực mà mình nhắc đến ở trên. Ta sẽ sử dụng một phép biến đổi từ nội dung chính của payload cũng như các thông tin trong header để tạo ra một chuỗi mới và đem chuỗi này so sánh với `x-slack-signature`, nếu giống nhau thì yêu cầu này hợp lệ và ngược lại là không hợp lệ. Để tạo ra chữ ký từ payload nhận được ta sẽ sử dụng phương pháp `hash sha256` kết hợp với chuỗi gồm và một khóa ta lấy trong phần config app của Slack:

![](https://images.viblo.asia/090de798-6141-4c05-bff7-64b4f811e679.PNG)

Còn chuỗi ta lấy được từ payload sẽ có dạng như sau:

```php
"{slack_version}:{x-slack-request-timestamp}:{payload_content}"
```

Trong đó:
- **slack_version**: sẽ là phiên bản của Slack, ở đây ta nhìn vào phần `x-slack-signature` sẽ thấy bắt đầu bằng `v0` và đây chính là phiên bản ta dùng
- **x-slack-request-timestamp**: là chi tiết thời gian yêu cầu này được Slack gửi đi, lấy từ phần header nói trên
- **payload_content**: chính là toàn bộ phần body của yêu cầu từ Slack và nó có dạng như sau:
```json
{
    "token": "IkwuWcOVqoe0ZrOuKuxpY6St",
    "team_id": "T02GU9BDN6P",
    "team_domain": "rnd-yom9168",
    "channel_id": "C02GU907ZH8",
    "channel_name": "general",
    "user_id": "U02JL6L6545",
    "user_name": "dqhuy78",
    "command": "/weather",
    "text": null,
    "api_app_id": "A02H6SYFWLR",
    "is_enterprise_install": "false",
    "response_url": "https://hooks.slack.com/commands/TXXXXXXXXXX/YYYYYYYYYYYYY/ZZZZZZZZZZZZZZZZZZZZZZZZ",
    "trigger_id": "2746976576578.2572317464227.bf9a70e6ec5d9805f55a9e799c658897"
}
```
Và đây là phần chữ ký chúng ta cần tạo ra với code PHP:
```php
$signature = 'v0='.hash_hmac('sha256', "v0:1637315186:${payloadBody}", $signingSecret);
```
*Lưu ý: Signature ta tạo ra cần có thêm phần `v0=` tương ứng với phiên bản Slack API*

Cuối cùng ta đêm phần vừa tạo được so sánh với **x-slack-signature** mà ta nhận được. Sau khi đã verify thành công thì ta có thể tùy chọn xử lý logic bên hệ thống của chúng ta và trả về kết quả cho người dùng. Cụ thể ở đây ta sẽ cần phản hồi lại nội dung text là **"Hi"** cho người dùng. Với code Laravel thì nó chỉ đơn giản như sau:
```php
public function __invoke(Request $request)
{
    $this->verifySignature($request);
    
    return response()->json([
        'response_type' => 'ephemeral',
        'text' => 'Hi',
    ]);
}
```

### d. Quy tắc 3s

Đối với tất cả các slash command thì hệ thống của chúng ta bắt buộc phải phản hồi lại cho người dùng ngay trong 3s, nếu không bên người dùng Slack sẽ nhận được thông báo lỗi như sau:

![](https://images.viblo.asia/76509aca-2273-4acb-b022-5350e3df1666.PNG)

Trong trường hợp ứng dụng của bạn cần nhiều hơn 3s để xử lý yêu cầu của người dùng, thì tốt nhất bạn nên đẩy việc xử lý đó vào queue để xử lý và trả về kết qua ngay cho người dùng trước như sau:

```php
public function __invoke(Request $request)
{
    $this->verifySignature($request);
    dispatch(new SomeBackgroundJob($request->input('response_url')));

    return response()->json([
        'response_type' => 'ephemeral',
        'text' => 'Processing your request!',
    ]);
}
```

Với cách làm như trên người dùng sẽ lập tức nhận được tin nhắn như sau:

![](https://images.viblo.asia/acf40fca-5773-4261-88a7-3b73bf5daebd.PNG)

Bạn có thể thấy với kiểu `response_type = ephemeral` thì cái tin nhắn ở trên chỉ duy nhất người dùng gửi yêu cầu lên hệ thống thấy nó mà thôi. Tiếp đến trong phần code xử lý mà chúng ta đẩy vào queue nói trên thì tất nhiên không thể dùng `response()->json()` được nữa rồi mà thay vào đó, ta sẽ gửi yêu đầu đến phần `response_url` mà trong phần payload cung cấp cho chúng ta để phản hồi lại cho đúng người dùng như sau:
```php
$guzzleClient->request('POST', $responseUrl, [
    'json' => [
        'response_type' => 'ephemeral',
        'text' => 'Your message'
    ],
]);
```
Trong ví dụ cụ thể của chúng ta thì `$responseUrl` sẽ là:
```
https://hooks.slack.com/commands/TXXXXXXXXXX/YYYYYYYYYYYYY/ZZZZZZZZZZZZZZZZZZZZZZZZ
```

Thêm một lưu ý nữa là `response_url` bạn chỉ có thể gửi yêu cầu thông qua nó tối đa 5 lần và nó chỉ tồn tại trong 30 phút mà thôi. Nếu ứng dụng của bạn mất quá nhiều thời gian để xử lý thì sẽ không còn cách nào khác để phản hồi lại cho người dùng cả.

## 3. Kết bài
<hr>

Bài viết của mình đến đây là kết thúc, cảm ơn cả bạn đã theo dõi. Nếu bạn có bất cứ thắc mắc gì hoặc cần trao đổi gì có thể comment ngay ở bên dưới để mình biết. Cuối cùng các bạn đừng quên để lại một upvote để ủng hộ mình nhé.