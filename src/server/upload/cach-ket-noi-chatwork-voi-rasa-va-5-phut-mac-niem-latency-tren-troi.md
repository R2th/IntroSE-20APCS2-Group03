**TL;DR**: Code đây. https://github.com/ngoctnq-1957/rasa-chatwork-echo

## Mở bài
Nếu bạn là người đi làm chatbot như mình, chắc hẳn bạn đã dùng Rasa. Với các ưu điểm vượt trội như là hoàn toàn local không sợ mất thông tin, một dialog handler xịn cùng các connector (cho dù bắt entity hơi ngu), Rasa là sự lựa chọn số 1 của các dự án cần tính bảo mật/hay cần mọi thứ trong 1 gói. Đồng thời, nếu bạn làm ở một công ty sử dụng Chatwork như mình, bạn sẽ cần tìm cách sao cho Chatwork liên hệ được với Rasa để nó có thể thay thế bạn trả lời tin nhắn của sếp :D Vậy bài này mình sẽ hướng dân bạn làm vậy nhé. Bonus thêm cách làm một con chatbot chuyên đi nhại lại đúng lời bạn nói luôn.

*Chú thích: post này sử dụng Rasa<1.8.0 vì nó tương thích với TensorFlow 1.x, do kinh nghiệm là bản TF2.0 vẫn còn nát lắm.*

## Cách để Rasa nhại lại bạn
Đằng nào mình cũng phải xây dựng một con bot cơ bản để demo cho các bạn mà, nên tiện mình giới thiệu luôn: hành động nhại lại bạn sẽ định nghĩa trong file `actions.py`:

```python
from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionHelloWorld(Action):

    def name(self) -> Text:
        return "action_echo"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        dispatcher.utter_message(text=tracker.latest_message["text"])

        return []
```

Và bạn để mặc định là sẽ chạy action đó trong `config.yml`:

```yaml
policies:
  - name: "FallbackPolicy"
    nlu_threshold: 1.0
    core_threshold: 1.0
    fallback_action_name: 'action_echo'
```

Hết :D

## Cách để Rasa kết nối với Chatwork
### Việc đầu tiên là bạn định nghĩa webhook nhận tin nhắn vào cho Rasa.
Cấu trúc của các class extend `InputChannel` cần có các methods sau: bắt đầu là `name`, sẽ quyết định webhook URL của bạn.
```python
class ChatworkInput(InputChannel):
    @classmethod
    def name(cls) -> Text:
        return "chatwork"
```
Ví dụ của mình để return `chatwork` thì URL sẽ là `/webhooks/chatwork/webhook`.

Tiếp theo là method để lấy các settings về token trong file `credentials.yml`. Phần này cũng sẽ được nói sau ở cuối mục này.
```python
@classmethod
def from_credentials(cls, credentials):
    if not credentials:
        cls.raise_missing_credentials_exception()
    return cls(credentials.get("api_token"), credentials.get("secret_token"))

def __init__(self, api_token: Text, secret_token: Text) -> None:
    self.api_token = api_token
    self.secret_token = secret_token
```

Tiếp theo là một method không bắt buộc, nhưng mình đưa vào để gỡ các loại To/Reply khỏi tin nhắn đầu vào cho nó sạch.
```python
@staticmethod
def _sanitize_user_message(text):
    """
    Remove all tags.
    """
    for regex, replacement in [
        # to messages
        (r"\[[Tt][Oo]:\d+\]", ""),
        # reply messages
        (r"\[[Rr][Pp] aid=[^]]+\]", ""),
        (r"\[Reply aid=[^]]+\]", ""),
    ]:
        text = re.sub(regex, replacement, text)

    return text.strip()
```

Quan trọng nhất trong các đoạn code là `blueprint` cho `sanic` server của Rasa. Trong đó, Rasa yêu cầu bạn cần implement 2 route đó là `/` với tên method `health`, và `webhook` với tên method `receive`.
```python
def blueprint(
    self, on_new_message: Callable[[UserMessage], Awaitable[None]]
) -> Blueprint:
    custom_webhook = Blueprint("chatwork_webhook", "chatwork"
    )

    @custom_webhook.route("/", methods=["GET"])
    async def health(request: Request) -> HTTPResponse:
        return response.json({"signature_tag": "o' kawaii koto."})
```

Để tránh việc một ai đó bắn request láo vào webhook của bạn (mà không từ Chatwork), bạn cần kiểm tra tin nhắn đó có phải từ Chatwork không.
```python
def validate_request(request):
    # Check the X-Hub-Signature header to make sure this is a valid request.
    chatwork_signature = request.headers.get('X-ChatWorkWebhookSignature', '')
    signature = hmac.new(base64.b64decode(bytes(self.secret_token, encoding='utf-8')),
                         request.body,
                         hashlib.sha256)
    expected_signature = base64.b64encode(signature.digest())

    return hmac.compare_digest(bytes(chatwork_signature, encoding='utf-8'),
                               expected_signature)
```
Về cơ bản, header của request được gửi đến webhook sẽ bao gồm hash của nội dung tin nhắn, ký với secret token của bạn. So sánh thấy ok là ok 👌

Và tâm điểm của bài này chính là webhook. Code có một số callback khá là cơ bản thôi.
```python
@custom_webhook.route("/webhook", methods=["POST"])
async def receive(request: Request) -> HTTPResponse:

    if not validate_request(request):
        return response.json("you've been a very bad boy!", status=400)

    content = request.json["webhook_event"]

    sender_id = content["from_account_id"]
    room_id = content["room_id"]
    message_id = content["message_id"]
    text = content["body"]
    metadata = {
        "sender_id": sender_id,
        "room_id": room_id,
        "message_id": message_id,
        "text": self._sanitize_user_message(text)
    }

    out_channel = self.get_output_channel(room_id)
    try:
        await on_new_message(
            UserMessage(
                text,
                out_channel,
                sender_id,
                input_channel=room_id,
                metadata=metadata,
            )
        )
    except CancelledError:
        logger.error(
            "Message handling timed out for "
            "user message '{}'.".format(text)
        )
    except Exception:
        logger.exception(
            "An exception occured while handling "
            "user message '{}'.".format(text)
        )
    return response.json("alles gut 👌")

return custom_webhook
```

Và cuối cùng là method không bắt buộc, dùng để tạo ra `OutputChannel` để bạn có thể gửi trả lại tin nhắn cho người dùng.
```python
def get_output_channel(self, room_id) -> OutputChannel:
    return ChatworkOutput(self.api_token, room_id)
```

### Sau đó, bạn định nghĩa tin nhắn gửi trả sẽ như thế nào.
```python
class ChatworkOutput(OutputChannel):
    @classmethod
    def name(cls):
        return "chatwork"

    def __init__(self, token_api: Text, room_id: int) -> None:
        self.room_id = room_id
        self.header = {"X-ChatWorkToken": token_api}

    async def send_text_message(
        self, recipient_id: Optional[Text], text: Text, **kwargs: Any
    ) -> None:
        uri = "https://api.chatwork.com/v2/rooms/" + str(self.room_id) + "/messages"
        data = {"body": text}
        requests.post(uri, headers=self.header, data=data)
```
Về cơ bản, class này chỉ bắn một POST request lên server Chatwork theo đúng cú pháp vào đúng phòng thôi. Nếu bạn muốn thêm một phát reply người gửi gốc cho ngầu, hãy sửa thêm như sau:

```python
class ChatworkOutput(OutputChannel):
    @classmethod
    def name(cls):
        return "chatwork"

    def __init__(self,
            token_api: Text,
            sender_id: int,
            room_id: int,
            message_id: int
        ) -> None:
        self.room_id = room_id
        self.sender_id = sender_id
        self.message_id = message_id
        self.header = {"X-ChatWorkToken": token_api}

    async def send_text_message(
        self, recipient_id: Optional[Text], text: Text, **kwargs: Any
    ) -> None:
        uri = "https://api.chatwork.com/v2/rooms/" + str(self.room_id) + "/messages"
        name = 'Người lạ'
        for contact in requests.get("https://api.chatwork.com/v2/contacts",
                                    headers=self.header).json():
            if contact["account_id"] == self.sender_id:
                name = contact["name"]
                break
        text = f'[rp aid={self.sender_id} to={self.room_id}-{self.message_id}]{name}\n' + text
        data = {"body": text}
        requests.post(uri, headers=self.header, data=data)
```

Nhớ thay code tạo `ChatworkOutput` object trong `ChatworkInput` class nhé.

### Tiếp đến, bạn cần cài đặt các API cần thiết.
Cả 2 đều có thể vào được từ mục API Setting của Chatwork:

![](https://images.viblo.asia/ef5cd7a6-6468-4072-8dcb-e085cbce9b4c.png)

Với API key, nhập password vào mục sau và bạn sẽ lấy được flag:

![](https://images.viblo.asia/0dcf77d5-c66c-475d-81f6-8c1b82f4062d.png)

Còn với webhook secret token, click vào Webhook và tạo mới một mục:

![](https://images.viblo.asia/6d47af20-6e9b-4e26-a3bb-084166809280.png)

trong đó secret token là mục Token, như đã được mình highlight. Thêm nữa, bạn cần điền vào mục Webhook URL theo như cấu trúc mình đã đặt trong ảnh. Ví dụ, nếu bạn chạy Rasa và không có port proxy pass gì (như với `nginx` chẳng hạn) thì link đó sẽ là

```
https://<server_ip>:5005/webhooks/chatwork/webhook
```

### Cuối cùng, bạn cần cài đặt các settings về API.
Hãy vào file `credentials.yml` và thêm 3 dòng này vào dưới cùng
```yaml
chatwork_connector.ChatworkInput:
  api_token: "put_your_api_token_here"
  secret_token: "your_secret_token_too"
```
với các giá trị token được lấy từ bước trước.

## Và vấn đề của Chatwork Webhook
Chưa kể việc Chatwork đổi theme làm mù mắt tôi đi, thì Chatwork webhook nhiều lúc chạy vô cùng dở. Điển hình là việc mình đã thử gửi một tin nhắn và đến 5' sau thì Rasa mới nhận là đến :(

![](https://images.viblo.asia/c2f7b71d-83b0-434a-bb6f-5868661129a0.png)<br><sub>Sau khi tìm lại được ảnh thì mình xác nhận là 16' chứ không phải 5' nhé!</sub>

Để chứng minh đây không phải là vấn đề của Rasa hay là internet, mình đã thử bắn replay lại đúng payload của Chatwork vào cái webhook, và mọi thứ xảy ra bình thường như chưa hề có cuộc chia ly:

Trong file `chatwork_connector.py` như trên, trong hàm `receive` của Sanic blueprint, bạn hãy sửa một chút để lấy được payload của Chatwork (5' sau khi bạn gửi):

```python
async def receive(request: Request) -> HTTPResponse:
    print(request.body.decode('utf-8'))
    print(request.headers.get('X-ChatWorkWebhookSignature', ''))
```

Từ đó, bạn đã có payload để replay attack server rồi :D Đừng lo, bạn sẽ không thể bị hack như thế này ngoài đời thật đâu, vì Chatwork yêu cầu HTTPS nên sẽ không thể có Man-in-the-Middle (MITM) attack như mình đang làm bây giờ. Bật Postman lên và gửi vào webhook URL -- nhớ bao gồm cả header để tin nhắn của bạn được validate nhé:

![](https://images.viblo.asia/d6330346-899d-4b05-a51b-b3c0c57dc5b5.png)

Mất có 1.5s thôi nhé chứ không phải 5' đâu, biết rồi nhé. Mình cũng bắn request này từ máy mình đến server EC2 dùng để host con bot này, nên không phải latency localhost đâu.

## Kết luận
Nếu bạn có thể, hãy vận động sếp đổi sang Slack. Nếu bạn không thể, hãy cố gắng cam chịu với nó, và sử dụng code này để cho cuộc đời bạn dễ thở hơn một tí tẹo :D Cảm ơn bạn đã đọc bài này, và chúc bạn may mắn.