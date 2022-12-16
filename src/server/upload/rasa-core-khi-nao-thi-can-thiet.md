# 1. Lời mở đầu
> Theo như dự tính ban đầu, mình sẽ viết thêm một bài hướng dẫn làm chatbot giống như bài viết trước (nhưng nâng cao hơn) [Hiểu Rasa qua quy trình xây dựng một chatbot giúp bạn trả lời câu hỏi: "Hôm nay ăn gì?"](https://viblo.asia/p/hieu-rasa-qua-quy-trinh-xay-dung-mot-chatbot-giup-ban-tra-loi-cau-hoi-hom-nay-an-gi-WAyK8P4pKxX) (Do bản thân mình cũng khá thích viết các bài mang tính ứng dụng hơn). Tuy nhiên, một vài hôm gần đây, mình có đứa bạn gặp rắc rối trong việc đọc Docs của Rasa và khá khó khăn trong việc xây dựng một chatbot theo ý muốn. Vậy nên mình nghĩ rằng, có lẽ việc củng cố lại lí thuyết một chút sẽ tốt hơn trong thực hành sau này. Đó là lí do có bài viết hôm nay :smile:

Vậy hôm nay, chúng ta có gì ???

Rasa gồm 2 phần chính : Rasa NLU và Rasa Core. Trong đó, với một message đầu vào, Rasa NLU sẽ tiến hành phân tích câu để đưa ra ý định (intent) của người dùng và đối tượng (entity) trong câu. Rasa Core sau đó sẽ tiếp nhận phần thông tin để quyết định công việc cần làm cũng như message trả ra 
![](https://d33wubrfki0l68.cloudfront.net/7c8474e873bb21965c8a57fe2520adae51164d9d/d6be4/_images/rasa-message-processing.png)
Các bạn có thể thấy, toàn bộ quá trình xử lí của Rasa sẽ follow như trên. Trong đó, Rasa NLU sẽ lo phần 1, 2 còn lại 3, 4, 5, 6 sẽ do Rasa Core đảm nhận. Tuy có vẻ đảm nhận nhiều phần, nhưng trong kha khá các trường hợp, Rasa Core lại ít được sử dụng. Có thể lấy ngay ví dụ về con chatbot mình viết trong bài trước :
```
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
Đoạn code này là phần Action mình viết trong file actions.py giúp việc quay random một số để quyết định vị trí ăn trưa. Vậy nếu bây giờ giả sử mình không viết vào file actions.py nữa (tức là không dùng Rasa Core) thì con bot có thực hiện random quay số và đưa ra đáp án được không ??? Câu trả lời là CÓ (thậm chí là làm tốt hơn) 

Mình sẽ chỉ cần đơn giản 
* Đưa message vào Rasa NLU
* Lấy output của Rasa NLU, đưa vào 1 file custom.py tự viết
* Trong file custom.py, mình xét intent, nếu intent là "ask_for_lunch", vậy mình sẽ quay random và chọn món rồi đưa ra kết quả, nếu intent là chào hỏi, vậy mình sẽ đưa ra câu chào lại, ...

Nghe đơn giản hơn nhiều nhỉ. Cũng không cần tìm hiểu về các policy, viết story, khai báo domain, ... Không cần chạy thêm một cổng 5055 để chạy action nữa ---> Rasa Core không cần thiết.

Vậy khi nào thì thì chúng ta cần dùng đến Rasa Core, đọc tiếp để tìm hiểu cùng mình nhá (mới hết phần mở đâu thôi)
# 2. Tracker
Mình sẽ xét theo đúng luồng của message khi đi vào Rasa cho mọi người dễ hình dung và hiểu rõ hơn. 

Tracker là một phần của Rasa Core. Vậy cụ thể tracker là gì ?? Tại sao message sau khi qua NLU lại vào Tracker đầu tiên??
```
{
  "conversation_id": "default",
  "slots": [
    {
      "slot_name": "slot_value"
    }
  ],
  "latest_message": {
    "entities": [
      {
        "start": 0,
        "end": 0,
        "value": "string",
        "entity": "string",
        "confidence": 0
      }
    ],
    "intent": {
      "confidence": 0.6323,
      "name": "greet"
    },
    "intent_ranking": [
      {
        "confidence": 0.6323,
        "name": "greet"
      }
    ],
    "text": "Hello!"
  },
  "latest_event_time": 1537645578.314389,
  "followup_action": "string",
  "paused": false,
  "events": [
    {
      "event": "slot",
      "timestamp": 1559744410
    }
  ],
  "latest_input_channel": "rest",
  "latest_action_name": "action_listen",
  "active_form": {
    "name": "restaurant_form"
  }
}
```
Phía trên là toàn bộ các thông tin mà tracker lưu giữ. Có thể coi tracker như bộ nhớ của chatbot vậy. Bộ nhớ này sẽ được update mỗi khi có một message mới từ người dùng, và đương nhiên, chúng ta cũng có thể custom được theo ý muốn chúng ta (Người ta gọi nó là khả năng điểu khiển kí ức :smile:)

OK, vậy phân tích sâu hơn một chút về "bộ nhớ " tracker của chatbot nào!

* Thứ nhất, tracker sẽ lưu giữ các thông tin phân tích được từ phần NLU, sau đó lưu vào dưới lable là "latest meaasge". Thông tin đó đương nhiên là về Entity, Intent, Intent Ranking rồi, phải có những dữ liệu đó mới phân tích được chứ.

Tuy nhiên, nếu tracker của chatbot chỉ lưu duy nhất mỗi phần "latest_mesage" thì khi đó, chúng ta không nên dùng Rasa Core nữa, vì nó khá đơn giản rồi. Lí do cần Rasa Core là ở những phần còn lại của Tracker nè 
* Bên cạnh "latest mesage", Tracker cũng lưu giữ thông tin về đoạn hội thoại để quản lí luồng hội thoại, lưu giữ thông tin về các slots (slot có thể hiểu là các biến nhớ mà chúng ta muốn giữ lại để gọi lại khi cần hoặc lưu thông tin từ action này sang action khác) - Nhớ là các slot cũng cần phải khai báo trong domain.yml.
* Tracker lưu giữ các thông tin về event (Chúng ta có thể thêm sửa xóa các event này tròn hàm custom action hoặc ngày từ ban đầu khi mesage gửi đến) - Mình sẽ nói sâu hơn một chút về event ở phần dưới
* Tracker cũng lưu thông tin về các action đặc biệt như: form action, followup action (Cái này các bạn đọc tiếp đến gần cuối nha)


Cuối cùng, sau khi tracker đã hoàn chỉnh, thông tin ở tracker sẽ được đưa vào phần Policy, dựa vào đó để đưa ra các quyết định, các mesage trả ra hợp lí và tự nhiên nhất. Tưởng tượng nếu không có tracker lưu giữ các thông tin cần thiết này, việc chúng ta tự viết 1 file if-else sẽ vất vả như thế nào 
# 3. Event
Như phần 2 đã trình bày, Tracker lưu giữ thông tin về Event. Hãy tìm hiểu sau hơn một chút về các loại event và tác dụng từng loại nào.
Event gốm 2 loại chính: Event được tự động thêm khi nhận được mesage mới (Automatically tracked events) và thứ 2: Event cho phép chúng ta custom theo ý muốn, để thêm thông tin vào Tracker (General Purpose Events)

Mình sẽ chỉ giải thích 1 chút để dễ hiểu hơn thôi chứ Rasa trình bày phần [Event](https://rasa.com/docs/rasa/api/events/) này cũng khá chi tiết rồi 
#### Automatically tracked events
* User sent message: Đây là phần event lưu thông tin của user, thật ra thì nếu các bạn chỉ dùng thuần Rasa (ý mình là chat trên Rasa X) thì phần này không quan trọng lắm. Tuy nhiên, nếu các bạn muốn phát triển chatbot của bản thân lên các môi trường khác như Slack, Messenger, Chatwork, ... thì phần này sẽ đặc biệt quan trọng đó. Các bạn có thể lưu các thông tin về sender_id, mesage_id, ... vào metadat của event này, và gọi lại khi cần thiết. 
```
evt = {
    "event": "user",
    "text": "Hey",
    "parse_data": {
        "intent": {
            "name": "greet",
            "confidence": 0.9
        },
        "entities": []
    },
    "metadata": {},
}
```
* Bot responsed message: Giống với User sent mesage, nhưng khác một chút, chủ thể của mesage không phải user nữa mà là bot. Event này lưu lại thông tin về message ngay trước đó của bot. Việc sử dụng event này như nào thì chắc phải tùy vào custom của mọi người rồi ^^ (Tạo conbot nhắc lại lời nó vừa nói hẳng hạn)
```
evt = {
    "event": "bot", 
    "text": "Hey there!", 
    "data": {}
    }
```
* Undo a user message, Undo an action: 2 event này thì cũng khá ít dùng, hiểu đơn giản là bot sẽ bỏ qua các message hay action hiện tại để chờ đợi một mesage, một action mới được đưa ra 
```
	
evt = {"event": "rewind"}

	
evt = {"event": "undo"}
```
#### General Purpose Events
Đây rồi, sau các event mặc định thì đến những envent hay được gọi nhất trong action rồi. Việc sử dụng những event này để sửa đổi Tracker như việc chúng ta đang lập trình mệnh lệnh cho bot thôi 
* Set a Slot, Reset all Slots: Các event liên quan đến slot giúp chung ta kiểm soát các thông tin cần lưu trữ từ action này đến action khác, ngoài ra slot còn là một trong những thành phần cốt lõi của Form Action. Để sử dụng một slot, trước hết chúng ta cần khai báo trong domain với các giá trị và kiểu mặc định (Đọc thêm  về slot tại [Docs](https://rasa.com/docs/rasa/core/slots/) )
```
# Slot Set
evt = {
        "event": "slot", 
        "name": "departure_airport", 
        "value": "BER" 
}

# Reset all slot
evt = {"event": "reset_slots"}
```
Ngoài ra còn thêm các event khác như:
* Restart a conversation: Restart lại cuộc hội thoại, khi đó các giá trị lưu trong tracker sẽ bị xóa bỏ, event, slot, channel, ... tất cả quay về giá trị Null

* Schedule a reminder,  Cancel a reminder: Lập lịch (hoặc  hủy) lịch trình cho các action với thời gian báo trước
* Pause a conversation, Resume a conversation: Tạm dừng cuỗ hội thoại, khi đó tracker sẽ không tiếp nhận và cập nhật thông tin mới cho đến khi Resume trở lại
# 4. Rasa SDK
Mình đã trình bày kha khá về Tracker cũng như Event, cũng như việc chúng ta có thể thay đổi tracker, thêm thắt event, thêm các action, .... Nhưng đấy là có thể, còn cụ thể làm thế nào ? Rất may, chúng ta có Rasa SDK
> Rasa SDK provides the tools you need to write custom actions in python.

Cứu tinh đây rồi, xem thử việc sử dụng SDK như thế nào nào 

* Thứ nhất, Rasa SDK là tool để viết action trong python. Vậy nó sẽ đc khai báo trong file python duy nhất của cả thư mục: actions.py
* Tiếp theo, import các thư mục cần thiết:
    * Tracker
        ```
        from rasa_sdk import Tracker

        #lấy ra slot được khai báo trong domain
        slot = Tracker().get_slot('tên slot')
        ``` 
    * Slot Set
        ```
        from rasa_sdk.events import SlotSet

        SlotSet("requested_slot", slot)
        ```
    * Reset Slot
        ```
        from rasa_sdk.events import AllSlotsReset

        AllSlotsReset()
        ```
    * ...
    
* Cuối cùng, để đảm bảo action hoạt động, hãy chắc chắn là cổng 5055 đã được mở (rasa run actions)
# 5. Form Action, Follow Up Action
Phần này mình sẽ trình bày về 2 action đặc biệt: Form Action và Follow up Action
* Follow up Action
    * Follow up Action được sử dụng khi chúng ta cần đảm bảo 2 action được thực hiện liền mạch
    * Có thể hình dung một trường hợp như thế này: Giả sử, bạn tạo một chatbot hỗ trợ thực hiện các giao dịch. Khi khách hàng yêu cầu giao dịch, Rasa bắt intent và thục hiện action "giao dịch", ở đây chatbot cần kiểm tra thông tin user, do đó, cần return một followup Action đến action "kiểm tra" để thực hiện kiểm tra thông tin, sau đó quay trở lại action "giao dịch" ban đầu để tiếp tục thực hiện giao dịch 
    * Để Follow up Action hoạt động, hãy Return ở cuối action
        ```
        return [FollowupAction("update_group_description_form")]
        ```
* Form Action
    * Khi chatbot cần thu thập nhiều thông tin từ user để tiến hành một tác vụ như: thông tin đặt phòng, thông tin tạo nhóm, ... Đó là lúc cần đến Form Action để thực hiện Slot Filling
    * Form Action sẽ thực hiện hỏi lần lượt user để thu thập đủ các slot cần thiết. Trong quá trình hỏi, Form cũng sẽ tiến hành validate giá trị của slot để đảm bảo giá trị thu được là hợp lí. User sẽ không thể thoát khỏi Form khi chưa cung cấp đủ thông tin (thật ra thì sau một số lần hữu hạn không thu thập đủ thì Form cũng sẽ dừng )

Chắc nên có một example cho dễ hiểu một chút :1234:

Vấn đề ở đây là bạn muốn thiết kế một chatbot giúp hỗ trợ đặt phòng khách sạn. 

Trong file story.md :
```
* request_room_booking
    - action_room_booking
```

Oke, bây giờ ta sẽ chỉ tập trung vào file actions.py. 
Trước tiên là action_room_booking sẽ tiền hành kiểm tra thông tin khách hàng, nếu khách hàng đã có thông tin trong database, ta sẽ followup đến form_room_booking, nếu khách hàng chưa có thông tin, ta sẽ followup đến form_get_infor để lấy thông tin người dùng và điền vào database
```
class ActionRoomBooking(Action):

    def name(self) -> Text:
        return "action_room_booking"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        user = [x["metadata"] for x in tracker.events if x["event"] == "user"][-1]
        user_id = f["sender_id"]
        user_infor = Customer.get_object(user_id=user_id)
        if user_infor:
            return [FollowupAction("form_room_booking")]
        return [FollowupAction("form_get_infor")]
```
Sau đó là viết form_get_infor để lấy thông tin khách hàng bao gồm: Tên, địa chỉ (mình lấy ít cho đơn giản )
```
class FormGetInfor(FormAction):

    def name(self) -> Text:
        return "form_get_infor"

    @staticmethod
    
    def required_slots(tracker: Tracker) -> List[Text]:
        return ["name", "address"]

    def slot_mappings(self) -> Dict[Text, Union[Dict, List[Dict]]]:
        return {
            "name": [self.from_entity(entity="name", intent=["inform"] ), self.from_text()],
            "address": [self.from_entity(entity="address", intent=["inform"] ), self.from_text()],
        }
        
    def submit(
                self,
                dispatcher: CollectingDispatcher,
                tracker: Tracker,
                domain: Dict[Text, Any],
            ) -> List[Dict]:

        user = [x["metadata"] for x in tracker.events if x["event"] == "user"][-1]
        user_id = f["sender_id"]
        user_name = tracker.get_slot('name')
        user_address = tracker.get_slot('address')
        Customer.create(user_id=user_id, name=name, address=address)
```
Cuối cùng là class form_room_booking để hỏi các thông tin phòng và thời gian đặt phòng
```
class FormRoomBooking(FormAction):

    def name(self) -> Text:
        return "form_room_booking"

    @staticmethod
    
    def required_slots(tracker: Tracker) -> List[Text]:
        return ["room_id", "time"]

    def slot_mappings(self) -> Dict[Text, Union[Dict, List[Dict]]]:
        return {
            "room_id": [self.from_entity(entity="room_id", intent=["request_room_booking"] ), self.from_text()],
            "time": [self.from_entity(entity="time", intent=["request_room_booking"] ), self.from_text()],
        }
        
    def validate_room_id(
                        self,
                        value: Text,
                        dispatcher: CollectingDispatcher,
                        tracker: Tracker,
                        domain: Dict[Text, Any],
                    ) -> Dict[Text, Any]:

        if value > 50:
            dispatcher.utter_message("Số phòng không hợp lệ")
            return {"room_id": None}
        return {"room_id": value}
       
    def submit(
                self,
                dispatcher: CollectingDispatcher,
                tracker: Tracker,
                domain: Dict[Text, Any],
            ) -> List[Dict]:

        user = [x["metadata"] for x in tracker.events if x["event"] == "user"][-1]
        user_id = f["sender_id"]
        room_id = tracker.get_slot('room_id')
        time = tracker.get_slot('time')
        Customer.create(user_id=user_id, name=name, address=address)
        
        return [AllSlotReset(), Restarted]
```
Tất nhiên, để action hoạt động, cần khai báo ở file domain.yml nữa 
```
intents:
    - request_room_booking
    - inform
entities:
    - name
    - address
    - room_id
    - time
slots:
    - name:
            type: unfeaturized
            auto_fill: false
    - address:
            type: unfeaturized
            auto_fill: false
    - room_id:
            type: float       
            min_value:  0.0
            max_value:  100.0
            auto_fill: false
    - time
            type: unfeaturized
            auto_fill: false
responses:
    utter_ask_name:
        - text: Anh(chị) cho em xin họ tên?
   utter_ask_address:
        - text: Anh(chị) cho em xin địa chỉ?
    utter_ask_room_id:
        - text: Anh(chị) cho em xin số phòng?
    utter_ask_time:
        - text: Anh(chị) cho em xin thời gian đặt phòng?
actions:
    - action_room_booking
forms:
    - form_get_infor
    - form_room_booking
```
Tạm ổn, đủ để vận hành ^^. Một số giải thích của mình đối với các hàm trong form
* required_slots() : Làm phần sẽ được gọi đến đầu tiên, để kiểm tra xem form sẽ cần fill những slot nào 
* slot_mappings(): Sau đó, form sẽ tiến hành lấy dữ liệu từ slot_mapping để map giá trị và fill vào slot
* validate_"slot name"(): Kiểm tra xem giá trị được fill vào slot đã chuẩn hay chưa, nếu chưa sẽ Set Slot về None và hỏi lại user
* request_next_slot(): Thực hiện fill các slot tiếp theo, trong trường hợp muốn hủy form giữa chùng, có thể code vào hàm này để thực hiện
* submit(): Hàm cuối cùng, sau khi đã fill đủ hết slot, form sẽ đến hàm submit và thực hiện các câu lệnh cần thiết với slot đã được fill
* ...

Các bạn có thể thử không dùng Rasa Core viết 1 hàm if else thực hiện cũng tác vụ tương tự để so sánh sự phức tạp . 
# 6. Kết luận
Vậy khi nào cần Rasa Core:
* Khi cần lưu và sử dụng lại các thông tin về cuộc hội thoại: slot, coversation_id, latest_channel, ...
* Khi cần các action liền mạch
* Khi cần lưu lại các thông tin cần cho các action phí sau (lưu vào slot)
* Khi cần slot filling
* Tận dụng khả năng của các Policy khi tác vụ quá phức tạp
* ...

Bài viết mang tính chất ôm đồn hơi nhiều và hơi nặng lí thuyết nên có thể sẽ khó hiểu một vài chỗ, mong các bạn thông cảm. Các bài viết sau sẽ dễ hiểu hơn. Hẹn gặp lại các bạn vào [Viblo May Fest 2020](https://mayfest.viblo.asia/)