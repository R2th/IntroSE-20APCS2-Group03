# 1. Mở đầu 
![](https://images.viblo.asia/4a8fa908-8ad1-4be2-863d-90faf8fe9467.png)
* ## Mục tiêu
Tiếp tục loạt bài viết lần trước từ [Xây dựng chatbot Messenger cập nhật thời khóa biểu cho sinh viên (Phần 1) - Phân tích thiết kế hệ thống](https://viblo.asia/p/xay-dung-chatbot-messenger-cap-nhat-thoi-khoa-bieu-cho-sinh-vien-phan-1-phan-tich-thiet-ke-he-thong-OeVKBW8QZkW), trong phần này, chúng ta sẽ bắt đầu những bước đầu tiên để xây dựng nội dung chatbot với Rasa. Như biểu đồ phân cấp chức năng mình đã nói từ bài viết trước, chúng ta sẽ triển khai chức năng đầu tiên trong bài viết này: **Chào hỏi cơ bản**

Dưới đây là luồng xử lí dữ liệu khi chatbot nhận được tin nhắn. Do phần chào hỏi vẫn chưa cần thiết đển sự có mặt của cơ sở dữ liệu nên phần dữ liệu chúng ta crawl từ phần 1 vẫn chưa được sử dụng ở đây

![](https://images.viblo.asia/e2016b18-7197-4eb0-91a2-abe95e55b2e8.PNG)

* ## Các bước cần thực hiện
Nội dung phần này vẫn khá basic nên chúng ta vẫn làm những bước quen thuộc như vẫn làm trước đó
1. **Xây dựng rasa nlu**
    * Viết nội dung cho file nlu.md
    * Cấu hình cho nlu trong file config.yml
3. **Xây dựng rasa core**
    * Viết kịch bản cho chatbot trong story.md
    * Cấu hình các policy cho core trong file config.yml
    * Khai báo trong file domain.yml
    * Có thể mở trước các cổng cần thiết cho action (dù bây giờ chưa cần thiết)
5. **Kết nối chatbot với facebook messenger**
    * Khởi tạo một Facebook Messenger app
    * Tạo trang facebook
    * Cấu hình webhook
    * Chỉnh sửa file Credentials.yml
7. **Test**
    * Test cá nhân
    * Test với 1 nhóm nhỏ
    * Đăng kí app với facebook
# 2. Xây dựng chatbot cơ bản
> Hãy bắt đầu với `rasa init`
* ## Rasa nlu
Như mục tiêu đã vạch ra, chúng ta sẽ xây dựng với nlu trước tiên. Các nội dung sẽ bao gồm như sau 

1. Trong file nlu.md: 

**Chào hỏi**
```
## intent:greet
- chào em
- hello em
- hi em
- em ơi, cho anh hỏi
- bot ơi
- cho mình hỏi chút
- chào bạn nha
- chào bot
- hello
- xin chào 
- hôm nay bạn thế nào 
- hey
- chào bạn
- alo alo
- hú
- merci
```
**Tạm biệt**
```
## intent:goodbye
- good bye
- bye bye
- tạm biệt em
- tạm biệt bot nhá
- tạm biệt bạn nha
- bye
- gặp sau nha
- hẹn lần khác
- lúc khác nói tiếp sau
- thôi nha
- gặp sau
- đi đây
```
**Hỏi khả năng của bot**
```
## intent:ask_ability
- em có thể làm những gì nhỉ
- em có chức năng gì?
- em giúp gì được anh không?
- bạn có thể  làm gì?
- em có thể giúp gì cho anh?
- bạn biết hát không ?
- bạn biết xem lịch học ah?
- em biết làm gì?
- em hỗ trợ anh như thế nào?
- cho anh xem các chức năng của em
```
**Cảm ơn**
```
## intent: thankyou
- cảm ơn em nhá
- thanks em nha
- cảm ơn nha
- good job
- cảm ơn bạn nha
- cảm ơn nhiều
- thank you
- cảm ơn bot nha
- thanks bot
- cảm ơn
- thank you so much
- great! Thanks
```
**Khen**
```
## intent: praise
- bot giỏi quá
- great
- awsome
- bot làm tốt lắm
- ui giỏi thế
- bot thông minh
- đẹp trai đấy
- Ênm đệnp léăm
```
**Chê**
```
## intent: decry
- quá tệ
- ngu ngốc
- chả biết gì cả
- ngu thật
- dở ghê
- có thế mà cũng không biết
- kém cỏi
- sai rồi, chán ghê
```
Phía trên là một vài intent hay gặp, hay được hỏi nên mình liệt kê ra, các bạn hoàn toàn có thể thêm nhiều intent, thêm nhiều nội dung hơn nữa để kiến thức chatbot được phong phú, đa dạng hơn.

2. Trong file config.yml
Phần cuối cho nlu là cấu hình 
```
language: "vi"

pipeline:
- name: "WhitespaceTokenizer"
- name: "RegexFeaturizer"
- name: "CRFEntityExtractor"
- name: "CountVectorsFeaturizer"
- name: "CountVectorsFeaturizer"
  analyzer: "char_wb"
  min_ngram: 1
  max_ngram: 4
```
Mấy phần này mình đã giải thích khá nhiều trong các bài viết trước nên mình xin phép đi nhanh, chỉ trích code chứ không giải thích nhiều 
* ## Rasa core
Trong file story.md
```
## greet
* greet
  - utter_greet

## goodbye
* goodbye
  - utter_goodbye

## thankyou
* thankyou
  - utter_noworries

## ask ability
* ask_ability
  - utter_show_ability

## praise
* praise
  - utter_happy

## decry
* decry
  - utter_sorry
```
Cấu hình các policy trong file config.yml
```
policies:
  - name: MemoizationPolicy
  - name: TEDPolicy
    max_history: 5
    epochs: 100
  - name: MappingPolicy
  - name: FallbackPolicy
    nlu_threshold: 0.6
    core_threshold: 0.3
    fallback_action_name: 'utter_fallback'
```
Và cuối cùng, file domain.yml
```
session_config:
  session_expiration_time: 60
  carry_over_slots_to_new_session: true
intents:
  - greet
  - goodbye
  - thankyou
  - praise
  - decry
  - ask_ability
responses:
  utter_greet:
    - text: "Chào bạn ^^. \nMình là chatbot được thiết kế để giúp Huster cập nhật thời\
        \ khóa biểu một cách thuận tiện hơn"
  utter_goodbye:
    - text: Hẹn gặp lại bạn nha ^^
      image: https://i.imgur.com/nGF1K8f.jpg
  utter_happy:
    - text: Hì hì, bạn khen quá lời rồi
  utter_sorry:
    - text: Xin lôĩ nha vì mình chưa đủ thông minh để hiểu được các bạn :(((
  utter_noworries:
    - text: Mình luôn sẵn lòng giúp đỡ bất cứ khi nào các bạn cần ^^
  utter_show_ability:
    - text: Mình có thể giúp bạn cập nhật thời khóa biểu trong một ngày hoặc một tuần
        cụ thể , hoặc thể giúp bạn xem thông tin chi tiết một học phần bất kì trong
        thời khóa biểu !
  utter_fallback:
    - text: Hic, mình xin lỗi, mình chưa hiểu ý bạn lắm. Bạn có thể nói lại được không???
actions:
  - utter_greet
  - utter_happy
  - utter_goodbye
  - utter_sorry
  - utter_noworries
  - utter_show_ability
  - utter_fallback
```
Xong, code siêu ngắn cho một chú chatbot. Các bạn có thể test thử với `rasa x` để chắc chắn là chatbot của mình đã hoạt động trước khi đến phần tiếp theo
# 3. Kết nối chatbot với Messenger
* ## Các bước kết nối
1. **Khởi tạo một Facebook Messenger app**

Đầu tiên, chúng ta cần truy cập https://developers.facebook.com/ để tạo Facebook app

![](https://images.viblo.asia/1462d8d3-4e7e-46a5-97d4-f4d2428d6784.PNG)

Sau khi đăng nhập bằng tài khoản facebook, chúng ta nhấn **bắt đầu** ở góc phải trên màn hình và làm theo hướng dẫn để tiến hành đăng kí và tạo ứng dụng đầu tiên

Truy cập ứng dụng vừa tạo, kéo xuống phần **Messenger** ở mục **Thêm sản phẩm** và nhấn **Thiết lập** 

Tiếp theo, trong phần thiết lập, kéo xuống mục **Mã truy cập**, bây giờ, chúng ta cần tạo một trang cộng đồng trên facebook

![](https://images.viblo.asia/11aa5ce6-b11a-4f9e-9ee6-fd7dcfb82db9.PNG)

2. **Tạo trang facebook**

Ấn **Tạo trang mới**  (nếu các bạn chưa có trang nào cả) hoặc **Thêm hoặc gỡ trang** nếu các bạn đã có sẵn trang và muốn tích hợp chatbot lên trang đó.
Các bước tiếp theo, facebook đã hướng dẫ các bạn một cách cực kì cụ thể rồi, chỉ cần làm theo là ok

3. Chỉnh sửa file Credentials.yml

![](https://images.viblo.asia/32bc24a8-27f3-4c41-8246-696912285b95.PNG)

Ấn mục **tạo mã** để sinh ra mã truy cập (các bạn nhớ lưu lại nha)
Quay lại với rasa, trong file credentials.yml, ta tiến hành uncomment credential của facebook
```
facebook:
 verify: "Mã xác thực bất kì, mã này sẽ được dùng trong webhook của messenger"
 secret: "Mã bảo mật của app facebook"
 page-access-token: "mã truy cập bạn vừa tạo"
```

5. **Cấu hình webhook**

Ở mục **webhooks**, chúng ta cần 1 url gọi lại. 

Giải thích 1 chút ở đây, Webhook cho phép một ứng dụng cung cấp data cho một ứng dụng khác một cách real time. Không như các API điển hình khác ta cần phải thăm dò server thường xuyên để biết xem có events mới hay không, với webhook bất cứ khi nào có event mới, server-side sẽ tự động thông báo cho client-side được biết. Trong trường hợp chatbot của chúng ta, bất cứ khi nào cho message mới được gửi cho chatbot trên messenger, message này sẽ được truyền vào **url gọi lại** mà chúng ta cung cấp, từ đó đi đến bộ xử lí của rasa.

Do đó, URL ở đây sẽ là Url được expopse ra từ cổng 5005 của Rasa. Ở đây, một cách free, mình đề xuất sử dụng **ngrok** (ngoài ra, các bạn có thể sử dụng local tunnel hoặc localhost.ssh.run)

Download ngrok tại https://ngrok.com/download và các bạn sẽ chỉ mất 1-2 phút để cài đặt, 3-5 phút để hiểu cách sử dụng ngrok. Nếu các bạn muốn sở hữu một domain và subdomain cố định, hay những ưu đãi khác của ngrok, đừng ngận ngại nâng cấp tài khoản :smile: 

![](https://images.viblo.asia/6963b4c7-ecae-4c45-85a1-91be3d2e0140.PNG)

OK, chuẩn bị xong rồi, bắt đầu nào 

* Khởi động rasa :  rasa run
* Expose cổng 5005 : ngrok http 5005
* Cập nhật url lên mục Webhook của messenger

![](https://images.viblo.asia/15ca35cf-0301-4f1a-a0db-d6789d8a6df9.png)

Hãy đảm bảo mục URL ở đây là có endpoint là webhooks/facebook/webhook (lát nữa chúng ta sẽ tìm hiểu lí do tại sao)

Mã xác minh là phần **verify** bạn khai báo trong file *Credentials.yml*

OK, done, facebook sẽ tiến hành gửi 1 request POST đến url của bạn kèm mã xác minh. Nếu mọi thứ hoàn động bình thường, tức là chatbot của chúng ta đã sẵn sàng hoạt động trên messenger.

6. **More...**

Hiện tại, chatbot chỉ có thể giao tiếp với duy nhất người sở hữu Trang (là chúng ta), để mọi người có thể chat với bot, chúng ta cần tiến gửi xét duyệt lên facebook

![](https://images.viblo.asia/03db64a7-7363-4c4f-9113-0f8f8c7bec7a.png)

Hoặc, bạn có thêm 1 số bạn bè để test với chatbot bằng mục **người dùng thử nghiệm**

![](https://images.viblo.asia/be860dd5-f342-4d9c-a3b6-6bebc2a2d94b.png)

* ## Tìm hiểu sâu hơn 1 chút ...
Vậy là xong phần hướng dẫn, mình sẽ tiến hành giải thích một chút sâu hơn về cách mà Rasa kết nối với Messenger. Nếu các bạn hiểu rõ hơn phần này, các bạn hoàn toàn có thể tự mình kết nối Rasa với các nền tảng chat khác, không bị phụ thuộc vào các phần mặc định của Rasa.

Trước tiên, chúng ta đào code của Rasa phần này thôi nào. Các bạn có thể đọc chi tiết ở [đây](https://github.com/RasaHQ/rasa_core/blob/master/rasa/core/channels/facebook.py) 

File này gồm 2 class chính : 
* FacebookInput() để xử lí message từ user gửi đến.
* MessengerBot() để xủ lí message từ rasa trả ra, và đấy lên messenger.
* 1 class phụ Messenger hỗ trợ cho class FacebookInput()

Sâu hơn nào : https://rasa.com/docs/rasa/user-guide/connectors/custom-connectors/

```
class FacebookInput(InputChannel):
    """Facebook input channel implementation. Based on the HTTPInputChannel."""

    @classmethod
    def name(cls):
        return "facebook"

    @classmethod
    def from_credentials(cls, credentials):
        if not credentials:
            cls.raise_missing_credentials_exception()

        return cls(credentials.get("verify"),
                   credentials.get("secret"),
                   credentials.get("page-access-token"))

    def __init__(self, fb_verify: Text, fb_secret: Text,
                 fb_access_token: Text) -> None:
        """Create a facebook input channel.
        Needs a couple of settings to properly authenticate and validate
        messages. Details to setup:
        https://github.com/rehabstudio/fbmessenger#facebook-app-setup
        Args:
            fb_verify: FB Verification string
                (can be chosen by yourself on webhook creation)
            fb_secret: facebook application secret
            fb_access_token: access token to post in the name of the FB page
        """
        self.fb_verify = fb_verify
        self.fb_secret = fb_secret
        self.fb_access_token = fb_access_token

    def blueprint(self, on_new_message):

        fb_webhook = Blueprint('fb_webhook', __name__)

        @fb_webhook.route("/", methods=['GET'])
        async def health(request):
            return response.json({"status": "ok"})

        @fb_webhook.route("/webhook", methods=['GET'])
        async def token_verification(request):
            if request.raw_args.get("hub.verify_token") == self.fb_verify:
                return request.raw_args.get("hub.challenge")
            else:
                logger.warning(
                    "Invalid fb verify token! Make sure this matches "
                    "your webhook settings on the facebook app.")
                return response.text("failure, invalid token")

        @fb_webhook.route("/webhook", methods=['POST'])
        async def webhook(request):
            signature = request.headers.get("X-Hub-Signature") or ''
            if not self.validate_hub_signature(self.fb_secret, request.data,
                                               signature):
                logger.warning("Wrong fb secret! Make sure this matches the "
                               "secret in your facebook app settings")
                return response.text("not validated")

            messenger = Messenger(self.fb_access_token, on_new_message)

            await messenger.handle(request.json)
            return response.text("success")

        return fb_webhook

    @staticmethod
    def validate_hub_signature(app_secret, request_payload,
                               hub_signature_header):
        """Make sure the incoming webhook requests are properly signed.
        Args:
            app_secret: Secret Key for application
            request_payload: request body
            hub_signature_header: X-Hub-Signature header sent with request
        Returns:
            bool: indicated that hub signature is validated
        """

        # noinspection PyBroadException
        try:
            hash_method, hub_signature = hub_signature_header.split('=')
        except Exception:
            pass
        else:
            digest_module = getattr(hashlib, hash_method)
            hmac_object = hmac.new(
                bytearray(app_secret, 'utf8'),
                request_payload, digest_module)
            generated_hash = hmac_object.hexdigest()
            if hub_signature == generated_hash:
                return True
        return False
```
Đầu tiên, Rasa sẽ tiến hành lấy các thông tin đã được khai báo từ file *Credentials.yml*

Khi có 1 tin nhắn được gửi cho bot, tin nhắn này sẽ được webhook đưa về server bằng 1 request POST. Ở đây, trong hàm blueprint() sẽ tiến hành kiểm tra thông tin request gửi đến và đảm bảo nó là an toàn. Tiếp đến, class Messenger sẽ tiến hành một vài công đoạn tiền xử lí (lấy thông tin id, kiếm tra có phải tin nhắn audio, ...) và đưa vào Rasa (xử lí tin nhắn, lưu thông tin trong Tracker, ...), cuối cùng trả ra message

```
class MessengerBot(OutputChannel):
    """A bot that uses fb-messenger to communicate."""

    @classmethod
    def name(cls):
        return "facebook"

    def __init__(self, messenger_client: MessengerClient) -> None:

        self.messenger_client = messenger_client
        super(MessengerBot, self).__init__()

    def send(self, recipient_id: Text, element: Any) -> None:
        """Sends a message to the recipient using the messenger client."""

        # this is a bit hacky, but the client doesn't have a proper API to
        # send messages but instead expects the incoming sender to be present
        # which we don't have as it is stored in the input channel.
        self.messenger_client.send(element.to_dict(),
                                   {"sender": {"id": recipient_id}},
                                   'RESPONSE')

    async def send_text_message(self, recipient_id: Text,
                                message: Text) -> None:
        """Send a message through this channel."""

        logger.info("Sending message: " + message)

        for message_part in message.split("\n\n"):
            self.send(recipient_id, FBText(text=message_part))
```
MessengerBot sẽ chịu trách nhiệm cho việc đấy message trả ra từ rasa lên trên messenger. Vậy là một quá trình nhận - xử lí - trả về message đã hoàn thành. 

Các bạn có thể đọc thêm một bài viết khác về tự custom connector trên Chatwork (một nền tảng chat khác cũng khá phổ biến) tại bào viết [Cách kết nối Chatwork với Rasa, và 5 phút mặc niệm latency trên trời.](https://viblo.asia/p/cach-ket-noi-chatwork-voi-rasa-va-5-phut-mac-niem-latency-tren-troi-924lJJb0lPM)

OK, tạm kết phần 2 tại đây, các bạn có thể đọc tiếp phần 3 tại [Xây dựng chatbot Messenger cập nhật thời khóa biểu cho sinh viên (Phần 3) - Xử lí logic chatbot khi được hỏi về thông tin lịch học](https://viblo.asia/p/xay-dung-chatbot-messenger-cap-nhat-thoi-khoa-bieu-cho-sinh-vien-phan-3-xu-li-logic-chatbot-khi-duoc-hoi-ve-thong-tin-lich-hoc-oOVlYzoQ58W)

Seeya :smile: