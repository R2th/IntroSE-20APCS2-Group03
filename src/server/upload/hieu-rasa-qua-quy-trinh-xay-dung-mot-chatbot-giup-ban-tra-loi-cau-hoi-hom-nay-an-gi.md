# 1. Tổng quan về Rasa
Trước tiên, để bắt đầu đi vào quy trình xây dựng một chatbot bằng Rasa, mình nghĩ các bạn sẽ cần biết Rasa là gì và Rasa có những ưu điểm vượt trội gì để được lựa chọn cho việc xây dựng chatbot.

![](https://legacy-docs.rasa.com/docs/core/0.10.4/_images/rasa_system.png) 

Nếu các bạn là người bắt đầu muốn nghiên cứu về chatbot, hay chỉ đơn giản là nảy ra một ý tưởng xây dựng một chú "bot" thú vị có thể "chat", hoặc cập nhật tin tức, hoặc làm một tác vụ gì đó phức tạp nhưng chưa biết bắt đầu từ đâu. Đi hỏi người khác: "how can i build a chatbot?" và bạn sẽ nhận được rất nhiều lời khuyên về framework khác nhau hoặc thậm chí cả một câu trả lời [như này](https://lmgtfy.com/?q=how+can+i+build+a+chatbot?)

Và bản thân mình thì lựa chọn [Rasa framework](https://rasa.com/docs/getting-started/) vì một vài lí do như sau:

* Rasa thực sự dễ tiếp cận cho người mới bắt đầu, thậm chí là người không biết gì về chatbot hay NLP. Hầu hết công việc của người sử dụng là tập trung xây dựng nội dung kịch bản, khả năng của chatbot chứ không cần thiết phải quan tâm đến công nghệ xây dựng.
* Rasa hoạt động khá tốt và mạnh mẽ, đặc biệt trong vấn đề xác định ý định người dùng (intent) và đối tượng được nhắc đến trong câu (entity) dù dữ liệu bạn thu thập và cung cấp cho rasa là vô cùng ít.
* Mã nguồn của Rasa là mã nguồn mở, do đó Rasa giúp bạn biết chính xác được bạn đang làm gì với chatbot của mình, thậm chí có thể custom chatbot theo ý thích của bản thân, ví dụ như: [custom action](https://viblo.asia/p/su-dung-rasa-custom-actions-xu-ly-cuoc-hoi-thoai-cho-chatbot-bJzKmOywl9N), [custom tokenizer](https://viblo.asia/p/rasa-chatbot-xay-dung-chatbot-voi-custom-component-va-custom-tokenizationtieng-viet-tieng-nhat-Qbq5QN4mKD8), hay cả việc quyết định nền tảng tin nhắn của chatbot [custom connector](https://viblo.asia/p/cach-ket-noi-chatwork-voi-rasa-va-5-phut-mac-niem-latency-tren-troi-924lJJb0lPM).

Việc nói lý thuyết về Rasa thì cũng có khá nhiều blog nói đến rồi, mà thật ra thì đọc Docs của Rasa vẫn là con đường chính đạo nhất. Thế nên, hôm nay mình sẽ cùng các bạn tiếp cận Rasa theo một hướng khác, nghe có vẻ thú vị hơn: **Học hiểu Rasa thông qua ví dụ**

OK, Let's GOOOOOO :airplane:

# 2. Đặt vấn đề
Muốn học hiểu Rasa thông qua ví dụ thì cần phải có ví dụ cái đã. 

Ngoài lề một chút thì ở nơi công ty mình đang thực tập, thời gian làm việc bắt đầu từ 7h45 (khá sớm với một đứa sinh viên hay ngủ nướng như mình), thế nên việc chuẩn bị bữa trưa trước khi đến công ty là một vấn đề không thể đối với mình (ngủ dậy đi làm luôn còn muộn, hic). Vậy nên, bữa trưa mình thường cùng anh em trong team ra ngoài tìm quán ăn, cũng tiện hoạt động chân tay một chút luôn. Và đây là lúc một câu hỏi thường được nhắc đến khá nhiều: "Trưa nay ăn gì anh em nhỉ ?????"

Chẹp, câu hỏi này làm cả team lượn một vòng hết cái dãy quán ăn rồi mới quyết định vô bừa một quán. Anh trong team vẫn thường đùa: hay làm cái hệ thống hay cái chatbot hỗ trợ xem quyết định trưa nay ăn gì nhỉ ?

Thế nên, trong bài viết này mình sẽ làm thử một con chatbot giúp trả lời câu hỏi ấy: "Trưa nay ăn gì nhỉ?"

Ý tưởng thì cũng đơn giản thôi, chúng ta sẽ xây dựng một con bot, có khả năng chào hỏi cơ bản, biết khen, biết chê, và biết "chọn quán ăn". Việc chọn quán ăn thì về cơ bản, các quán ăn đều có độ ưu tiên như nhau, nên chúng ta sẽ chọn món theo kiểu đơn giản nhất: random :joy:

Tất nhiên trong quá trình xây dựng chatbot, mình sẽ giới thiệu từng phần của Rasa một cách cụ thể (nội dung chính của bài viết này mà ^^). Hãy bắt đầu bằng việc cài đặt Rasa vào máy trước đã 
```
pip install rasa==1.7.0
``` 
Sau đó di chuyển đến thư mục bạn muốn khởi tạo Rasa và sử dụng:
```
rasa init
```
Một folder sẽ được tạo ra bao gồm các file sau: 
* data/nlu.md
* config.yml
* data/stories.md
* domain.yml
* action.py
* enpoints.yml
* credentials.yml

Mình sẽ đi sâu và giải thích từng phần ngay sau đây...
# 3. Rasa NLU
Rasa NLU (Nature Language Understanding) là phần đầu tiên và cũng là phần mà Rasa được sử dụng nhiều nhất. Nếu chatbot mà bạn cần xây dựng không quá phức tạp, hoàn toàn có thể xử lí bằng logic if-else thì có lẽ, bạn sẽ chỉ cần duy nhất phần NLU này của Rasa. Vậy phần NLU này hoạt động như thế nào ???

Đầu tiên, chúng ta quan sát file *config.yml*
```
# Configuration for Rasa NLU.
language: vi
pipeline: supervised_embeddings
```
Đây là phần cấu hình cho NLU, nơi chúng ta lựa chọn ngôn ngữ, model cần thiết. Chúng ta sẽ lựa chọn ngôn ngữ ở đây là vi (vietnam). Tiếp theo là đến pipeline, các bạn có thể thấy pipeline đơn giản có 1 dòng thế kia, vậy thực chất là nó làm gì. Vậy để mình viết rõ hơn ra nhé, chúng ta có 
```
pipeline: supervised_embeddings
=
pipeline:
    - name: "WhitespaceTokenizer"
    - name: "RegexFeaturizer"
    - name: "CRFEntityExtractor"
    - name: "EntitySynonymMapper"
    - name: "CountVectorsFeaturizer"
    - name: "CountVectorsFeaturizer"
          analyzer: "char_wb"
          min_ngram: 1
          max_ngram: 4
    - name: "EmbeddingIntentClassifier"
```
Đó là một quy trình hoàn chỉnh từ lựa chọn Tokenizer, Featurizer, Extractor đến Classiffer. Tất nhiên các bạn hoàn toàn có thể lựa chọn thay thế bất cứ một công đoạn nào trong pipeline này nếu các bạn cảm thấy nó sẽ đạt hiệu quả tốt hơn. Việc lựa chọn phương án thay thế có thể là trong chính Rasa hoặc một package nào đó bên ngoài mà bạn thấy phù hợp. 

Bên cạnh supervised_embeddings thì Rasa cũng cung cấp sẵn thêm một vài pipeline template khác là pretrained_embeddings_spacy, pretrained_embeddings_convert, ... (các bạn có thể đọc thêm ở [Docs](https://rasa.com/docs/rasa/nlu/choosing-a-pipeline/)). Trong trường hợp này của chúng ta, với ngôn ngữ tiếng việt thì supervised_embeddings là lựa chọn tốt nhất vì nó thực hiện train lại từ đầu, dựa vào file nlu.md mà chúng ta cung cấp

Ok, vậy hãy bàn tiếp đến file *nlu.md*
```
## intent:greet
- chào em
- hello em
- hi em
- em ơi, cho anh hỏi
- bot ơi
- cho mình hỏi chút

## intent:goodbye
- good bye
- bye bye
- tạm biệt em
- tạm biệt bot nhá

## intent:ask_ability
- em có thể làm những gì nhỉ
- em có chức năng gì?
- em giúp gì được anh không?
- em có thể giúp gì cho anh?
- em biết làm gì?
- em hỗ trợ anh như thế nào?
- cho anh xem các chức năng của em

# intent: thankyou
- cảm ơn em nhá
- thanks em nha
- cảm ơn nha
- good job
- thank you
- cảm ơn bot nha
- thanks bot
- cảm ơn
- thank you so much
- great! Thanks

# intent: praise
- bot giỏi quá
- great
- awsome
- bot làm tốt lắm
- ui giỏi thế
- bot thông minh
- đẹp trai đấy
- Ênm đệnp léăm

# intent: decry
- quá tệ
- ngu ngốc
- chả biết gì cả
- ngu thật
- dở ghê
- có thế mà cũng không biết
- kém cói

# intent: ask_for_lunch
- trưa nay anh nên ăn gì nhỉ
- trưa nay ăn gì bây giờ nhỉ
- chọn giúp t bữa trưa phát
- ăn trưa nào
- tiểu nhị, chọn món
- bữa trưa
- ăn gì bây giờ
- chọn giúp anh một quán ăn
```
Phía trên là file nlu.md tương đối ngắn. Và đó là công việc của chúng ta. Với pipeline đã được chúng ra duyệt qua trong file config.yml thì chúng ra cần thêm data để train model và file nlu.md chịu trách nhiệm về data đó. Ở đây chúng ta có các câu message người dùng có thể hỏi đã được gán nhãn là intent tương ứng. Đó là lí do mà mình có bảo: thậm chí bạn không biết chút gì, với Rasa, bạn cũng có thể tạo chatbot theo ý mình.

Sẽ còn một chặng đường dài nữa, nhưng các bạn có thể test trước thành quá bằng câu lệnh
```
rasa train nlu
rasa shell nlu
```
Và kết quả đây
```
NLU model loaded. Type a message and press enter to parse it.
Next message:
hôm nay anh nên ăn gì nhỉ??
{
  "intent": {
    "name": "ask_for_lunch",
    "confidence": 0.8929486870765686
  },
  "entities": [],
  "intent_ranking": [
    {
      "name": "ask_for_lunch",
      "confidence": 0.8929486870765686
    },
    {
      "name": "praise",
      "confidence": 0.03839283809065819
    },
    {
      "name": "ask_ability",
      "confidence": 0.03015107288956642
    },
    {
      "name": "decry",
      "confidence": 0.02754569798707962
    },
    {
      "name": "greet",
      "confidence": 0.0060586160980165005
    },
```
# 4. Rasa Core
Chúng ta chuyển đến phần tiếp theo, phần khá cốt lõi tuy nhiên thường bị bỏ qua không dùng đến vì đọc Docs khá lằng nhằng. Rasa Core là nơi thực hiện quản lí luồng hội thoại. Dựa vào các intent, entity đã được detect ra ở phần NLU, Rasa Core tiến hành lấy các kết quả này làm đầu vào, rồi quyết định message đầu ra. Thực hành cho dễ hiểu nào.

Đầu tiên, vẫn cần cấu hình cho Core trong file *config.yml*
```
# Configuration for Rasa Core.
policies:
  - name: MemoizationPolicy
  - name: KerasPolicy
  - name: MappingPolicy
  - name: FallbackPolicy
    nlu_threshold: 0.6
    core_threshold: 0.3
    fallback_action_name: 'utter_fallback'
```
Chúng ta lần lượt khai báo cái Policy cần thiết. Ở đây, mình cần dùng một số policy như: MemoizationPolicy (quyết định message đầu ra dựa vào thông tin của những đoạn hội thoại trước đó), KerasPolicy (sử dụng mạng LSTM để tính xác suất đưa ra lựa chọn cho message tiếp theo), MappingPolicy(quyết định message dựa vào dữ liệu đã mapping) và trong trường hợp, việc tính xác suất đầu ra không thể vượt được ngưỡng mà FallbackPolicy đề ra, message trả ra sẽ là một utter_fallback kiểu như: "Xin lỗi anh chị ạ, em không hiểu được nội dung anh chị nói ạ" (cái này do các bạn đặt)


Tiếp theo, chúng ra cần khai báo các thông tin cần thiết trong file *domain.yml*
```
session_config:
  session_expiration_time: 60.0
  carry_over_slots_to_new_session: true
intents:
- greet
- goodbye
- thankyou
- praise
- decry
- ask_for_lunch
- ask_ability
responses:
  utter_greet:
  - text: "Em chào anh(chị) ạ. \nEm là chatbot được thiết kế để giúp anh chị quyết\
      \ định 'trưa nay ăn gì?' ạ"
  utter_goodbye:
  - text: Hẹn gặp lại anh chị ạ ^^
    image: https://i.imgur.com/nGF1K8f.jpg
  utter_happy:
  - text: Hì hì, anh chị khen quá lơì rồi ạ
  utter_sorry:
  - text: Em xin lôĩ vì em chưa đủ thông minh ạ =(((
  utter_noworries:
  - text: Em luôn sẵn lòng giúp đỡ anh(chị) bất cứ lúc nào ạ ^^
  utter_show_ability:
  - text: Em có thể trò chuyện với anh(chị), thi thoảng có thể đề xuất anh(chị) nên
      ăn gì trưa nay ạ
  utter_fallback:
  - text: Em xin lỗi, em chưa hiểu ý muốn của anh(chị) ạ. Anh chị có thể nói lại được
      không ạ
actions:
- utter_greet
- utter_happy
- utter_goodbye
- utter_sorry
- utter_noworries
- action_recommend
- utter_show_ability
- utter_fallback

```
Ở đây:
* intent là các thông tin đã nếu trong file nlu, (có thể có cả entity), 
* action là phần liệt kê các hành động, message đầu ra mà chúng ra định nghĩa. 
* respone là phần chúng ta định nghĩa các message dạng text, hoặc hình ảnh, ... (các respone này thường có dạng utter_{})
* Với các action cần thao tác với database, chúng ta định nghĩa trong file action.py (lát nữa mình sẽ nói cụ thể hơn)
* Cuối cùng là session_config, là phần cấu hình cho một session như thời gian để restart lại một session, có mang slot từ session cũ sang session mới hay không, ...

Sau khi khai báo trong domain, chúng ta xây dựng các kịch bản cần thiết cho việc trò chuyện của "bot". Nhìn chung, phần này có logic khá giống if-else. Hãy nhìn vào file *stories.md*
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

## ask_for_lunch
* ask_for_lunch
  - action_recommend
```
Việc dự tính trước các luồng hội thoại và xây dựng sẵn một kịch bản sẽ giúp con bot của chúng ta xử lí một cách trơn tru hơn và vó vẻ là thông minh hơn. Vậy nên, hãy cố gắng nghĩ đủ sâu các trường hợp mà người dùng có thể hỏi bot, việc này thật sự cần thiết nếu muốn bot đưa ra câu trả lời như mong đợi, không bị hỏi một đằng, trả lời một nẻo ^^

Cấu trúc chung của 1 luồng hội thoại như sau:
```
## Tên luồng
* Tên intent
    - Tên action
* Tên intent
    - Tên action
...
```
# 5. Custom action
Xong cũng kha khá rồi nhỉ... Bây giờ chúng  ta tiếp cận đến một khái niệm mới: custom action. Về cơ bản, một chatbot sẽ luôn cần có một database để lưu trữ thông tin: đó có thể là ngân hàng câu hỏi, thông tin về lĩnh vực bot được hỏi, các thao tác với database, ...do đó, chúng ra cũng cần có những xử lí riêng theo từng tác vụ. Rasa hỗ trợ điều đó trong file *action.py*
```
from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import random

DATABASE = ["bún đậu mắm tôm",
            "bún đậu nước mắm",
            "bún cá",
            "bún hải sản",
            "cơm văn phòng",
            "cơm sườn",
            "xôi",
            "bún ốc",
            "mì vằn thắn",
            "hủ tiếu",
            "bún chả",
            "bún ngan",
            "ngan xào tỏi",
            "bún bò huế",
            "mì tôm hải sản",
            "bánh mì trứng xúc xích rắc thêm ít ngải cứu",
            "bánh mì trứng",
            "bánh mì xúc xích",
            "bánh mì pate"]


class ActionRecommend(Action):

    def name(self) -> Text:
        return "action_recommend"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        food = []
        for i in range(2):
            food_number = random.randrange(len(DATABASE))
            food.append(DATABASE[food_number])

        dispatcher.utter_message(
            text="Em nghĩ hôm nay anh chị có thể thử món '{}' hoặc bên cạnh đó cũng có thể là món '{}' ạ".format(food[0], food[1]))

        return []
```
Bài viết mang tính chất lấy ví dụ nên mình xin phép lưu database như kia cho tiện 

Bỏ qua vấn đề database, mình sẽ nói về hàm action ở đây. Với mỗi action cụ thể, chúng ta xây dựng riêng một class. Class này có đặc điểm sau: chỉ bao gồm 2 method là name() và run()
* name() sẽ trả về tên của action, cái mà chúng ta khai báo trong file domain và file stories
* run() là nơi chúng ta thoải sức sáng tạo, làm điều ta muốn (cụ thể là code python cho cho cái action này hoạt động thôi). Khá đơn giản nhỉ

Ngoài Action, chúng ta còn có các khái niệm khác về Slot, Form Action, Tracker, ... những công cụ hữu ích cho việc custom cho Rasa. Tuy nhiên, bài viết này là bài basic, nên có lẽ mình sẽ để lại những khái niệm đó cho những bài viết tiếp theo.

Sau khi đã có file action.py, muốn action hoạt động được, đừng quên file *endpoints.yml*
```
action_endpoint:
 url: "http://localhost:5055/webhook"
```
Hãy nhớ uncomment 2 dòng trên đi nhá, vì action của Rasa sẽ chạy trên một cổng hoàn toàn riêng biệt với rasa, vậy nên, nếu quên thì action của bạn sẽ không thể hoạt động được đâu. Rasa sẽ run trên cổng 5005 trong khi đó action sẽ run trên cổng 5055

Được rồi, tiến hành train lại toàn bộ nào 
```
rasa train
```
Bạn có thể test chatbot của mình trên rasa x (nhớ đừng quên action nhá)
```
rasa x
rasa run actions
```
2 cổng này cần duy trì cùng lúc
![](https://images.viblo.asia/9533236a-96db-43f4-b016-98f27e77fb75.PNG)
# 6. Kết nối Rasa với các nền tảng nhắn tin khác
Bên cạnh việc chat trên Rasa X, Rasa có thể hỗ trợ kết nối đến rất nhiều nền tảng khác nhau. Mở file credentials.yml : 
```
rest:
#  # you don't need to provide anything here - this channel doesn't
#  # require any credentials


#facebook:
#  verify: "<verify>"
#  secret: "<your secret>"
#  page-access-token: "<your page access token>"

#slack:
#  slack_token: "<your slack token>"
#  slack_channel: "<the slack channel>"

#socketio:
#  user_message_evt: <event name for user message>
#  bot_message_evt: <event name for but messages>
#  session_persistence: <true/false>

#mattermost:
#  url: "https://<mattermost instance>/api/v4"
#  team: "<mattermost team>"
#  user: "<bot username>"
#  pw: "<bot token>"
#  webhook_url: "<callback URL>"

rasa:
  url: "http://localhost:5002/api"
```
Các bạn có thể thấy một vài kết nối của Rasa đến facebook, slack, socketio,.... Công việc của chúng ta chỉ cần uncomment phần code đó, sau đó điền thông tin về chatbot của mình vào. Với những nền tảng chưa được hỗ trợ mặc định, chúng ta cũng có thể custom nó theo ý của bản thân. Hãy theo dõi bài viết  [Cách kết nối Chatwork với Rasa, và 5 phút mặc niệm latency trên trời.](https://viblo.asia/p/cach-ket-noi-chatwork-voi-rasa-va-5-phut-mac-niem-latency-tren-troi-924lJJb0lPM)
# 7. Kết luận
Trên đây là bài viết tổng hợp lại những phần mình đã tìm hiểu được khi tiếp xúc với Rasa. Hi vọng bài viết giúp các bạn mới bắt đầu như mình có một cái nhìn dễ thở hơn với Rasa và có thể tự tin tạo ra được nhưng con chatbot theo ý muốn. Hẹn gặp mọi người ở những blog tiếp theo.