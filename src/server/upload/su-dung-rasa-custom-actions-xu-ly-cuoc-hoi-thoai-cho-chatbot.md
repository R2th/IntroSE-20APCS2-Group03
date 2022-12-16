Bài viết này trong series [Chatbots are cool. Let's build a chatbot!](https://viblo.asia/s/chatbots-are-cool-lets-build-a-chatbot-OVlYq8dzl8W)
## 1. Rasa Custom Actions 
Tiếp tục chuỗi bài về Rasa Chatbot hôm nay mình xin giới thiệu các bạn một phần không thể thiếu để xử lý những cuộc hội thoại phức tạp. Trước khi bước vào bài đọc mình nghĩ các bạn nên nắm chắc các định nghĩa cũng như cách tạo các intent, entities, slot...trong bài viết **"Tập tành Rasa Chatbot "** của mình :) . Vậy custom actions trong rasa là cái gì và nó làm được gì ??? Đơn giản nó chỉ là một class và bên trong nó xử lý các hàm để giải quyết các vấn đề trong một cuộc hội thoại bạn muốn xây dựng hay hiểu đơn giản hơn thì nó như một utter_message nhưng utter_message thì chỉ trả về cho người dùng một kịch bản cứng là một câu text và bạn không thể nào tác động vào bên trong nó được, còn custom actions thì khác nó có thể xử lý mọi thứ bên trong như việc lấy ra entities mới nhất, câu text mới nhất bạn muốn bot trả lời, slotset, get slot.....Để dễ hiểu hơn mình có một ví dụ như sau: Bạn muôn làm con bot và bạn muốn con bot đó giúp bạn trong việc hỗ trợ người dùng tìm hiểu về thông tin sản phẩm bạn muốn bán bao gồm các loại sản phẩm sau: sữa rửa mặt, sản phẩm trị mụn, sản phẩm skincare, .... và trong mỗi loại sản phẩm này lại tiếp tục bao gồm vài đến vài chục sản phẩm. Nếu việc bạn dùng utter meassage thì mỗi loại sản phẩm bạn phải tạo cho nó 1 cái intent và cũng như thế mỗi sản phẩm sẽ một cái...nghĩ thôi cũng đã thấy sợ :(. Và mọi thứ sẽ đơn giản hơn khi có custom action. Bạn chỉ cần tạo cho nó 1 cái intent về loại sản phẩm và một cái intent về sản phẩm còn lại cứ để custom actions lo :)). Hay bạn muốn con bot cập nhật thời gian hay load thông tin theo từng phút về dịch corana.... thì utter_meassage chịu thua rồi. 
## 2. Tạo database
Để đơn giản cho việc quản lý sản phẩm cũng như dễ dàng cập nhật sản phẩm mới mình nghĩ các bạn nên tạo database cho bản phẩm để và dưới đây mình đã tạo sẵn một database ví dụ về sản phẩm và các bạn có thể thêm các trường thông tin cũng như nội dung mà mình mong muốn. Để tạo database này mình có sử dụng SQLITE3 python và dưới đây là database mình tạo bao gồm 3 loại sản phẩm bao gồm : sữa rửa mặt, son, dầu gội đầu và tên các sản phẩm và giá kèm theo.
![](https://images.viblo.asia/80ed33b4-024f-45fc-981c-a832b8740143.png)
## 3. Tạo intent, entities, slots...
Sau khi tạo xong database thì mình sẽ bắt tay ngay vào việc tạo intent cho nó. Trong bài trước thì mình đã hướng dẫn các bạn tạo intent, entities, slot như thế nào thì hôm nay mình sẽ không nhắc lại nữa. Chúng ta sẽ tạo ra 2 intent là san_pham và loai_san_pham đươn giản như sau :
```python
## intent:san_pham
- murad giá bao nhiêu tiền
- carave giá bao nhiêu tiền
- senka giá bao nhiêu tiền
- mac giá bao nhiêu tiền
- 3ce giá bao nhiêu tiền
- romanno giá bao nhiêu tiền
- clear giá bao nhiêu tiền
- xmen giá bao nhiêu tiền

## intent: loai_san_pham
- sửa rửa măt có những sản phẩm nào
- son môi có những sản phẩm nào
- dầu gội đầu có những sản phẩm nào
- sữa rửa mặt
- dầu gội đầu
- son môi

## lookup:regex_intent.txt
  data/regex_intent.txt
  ```
  để tăng khả năng bắt intent chính xác sẽ có một vài phương pháp như bạn đánh entities, lookup.. thì trong bài viết này mình dùng lookup regex trong file regex_intent.txt
  ```
  murad
carave
senka
mac
3ce
romanno
clear
xmen
sữa sửa mặt
son môi
dầu gội đâu
```
sau khi tạo xong dữ liệu train nlu thì mình sẽ viết thêm strories và domain 2 file này mình cũng đã giải thích trong bài viết trước rồi các bạn có thể vào tham khảo :
```python
## loai_san_pham
* loai_san_pham
  - action_custom_loai_san_pham

## san_pham
* san_pham
  - action_custom_san_pham
  ```
  và tiếp theo là file domain:
  ```
  session_config:
  session_expiration_time: 0.0
  carry_over_slots_to_new_session: true
intents:
- san_pham
-loai_san_pham
entities:
- san_pham
slots:
  san_pham:
    type: unfeaturized


actions:
- action_custom_loai_san_pham
- action_custom_san_pham
```
và công việc tiếp theo là bấm rasa train để có model nào :)))

## 4. Custom actions file
Trong bài toán này mình sử dụng tracker.latest_message['text'] hoặc bạn cũng có thể sử dụng lấy ra entities mới nhất tuỳ theo cách xử lý của từng người. Như mình đã nói thì custom actions nó đơn giản chỉ là 1 file python bình thường nên bạn có thể xử lý tuỳ thích nhé, dưới đây là ví dụ đơn giản của mình :
```python
from typing import Text, List, Dict, Any
from rasa_sdk import Action, Tracker
from rasa_sdk.events import SlotSet, SessionStarted, ActionExecuted, EventType
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import json
import re
import sqlite3

sqliteConnection = sqlite3.connect('path_to_database')
cursor = sqliteConnection.cursor()
print("Database created and Successfully Connected to SQLite")

class ActionAskKnowledgeBaseLoaiSanPham(Action):
    def name(self) -> Text:
        return "action_custom_loai_san_pham"
    
    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        text = tracker.latest_message['text']
        text_input = text.lower()
        sqlite_select_Query = '''SELECT * from san_pham'''
        cursor.execute(sqlite_select_Query)
        record = cursor.fetchall()
        check = False
        print(text_input)
        for result in record:
            san_pham = result[0].lower()
            loai_san_pham = result[1].lower()
            gia = result[2].lower()
            if loai_san_pham in text_input:
                check = True
                dispatcher.utter_message("Nội dung bạn muốn con bot trả lời")       
        if not check:
            dispatcher.utter_message("Dạ hiện tại cửa hàng em chưa có sản phẩm như anh(chị) cần ạ")
        return [SlotSet("san_pham", gia)
        

class ActionAskKnowledgeBaseSanPham(Action):

    def name(self) -> Text:
        return "action_custom_san_pham"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        text = tracker.latest_message['text']
        text_input = text.lower()
        sqlite_select_query = ''' SELECT * from san_pham'''
        cursor.execute(sqlite_select_query)
        record = cursor.fetchall()
        san_pham_slot = tracker.get_slot("san_pham")
        for index in record:
            san_pham = result[0].lower()
            loai_san_pham = result[1].lower()
            gia = result[2].lower()
            if san_pham in text_input:
                check = True
                dispatcher.utter_message("Nội dung bạn muốn bot trả lời")
            elif san_pham_slot in text_input:
                check = True
                dispatcher.utter_message("Nội dung bạn muốn con bot trả lời")
        if not check:
            dispatcher.utter_message("Dạ cửa hàng em chưa có sản phẩm như anh chi cần ạ")
  ```
 Sau khi kết nối thành công với database thì mình sẽ viết cacs class cho intent mỗi class sẽ là một action_custom cho một intent, ở đây thì mình dùng hàm tracker.latest_message['text'] để lấy ra đoạn text mà bạn truyền vào xem nôi dung là gì và SlotSet để set slot và tracker.get_slot để lấy ra slot mới nhất.
<br>  Tong bài viết tiếp theo mính sẽ cùng các bạn xây dựng một chuỗi hội thoại với những stories phức tạp có chiều sâu hơn. Cảm ơn các bạn đã theo dõi bài viết của mình.