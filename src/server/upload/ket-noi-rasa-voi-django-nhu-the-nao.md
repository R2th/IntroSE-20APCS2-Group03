*Hôm nay mình sẽ hướng dẫn cách viết chatbot đơn giản kết nối rasa với django và làm sao để custom câu trả lời theo ý mình muốn. Ví dụ như ở bài này mình sẽ tạo database về các nước đang có dịch covid-19  sử dụng django model sau đó sẽ custom con bot có thể lấy dữ liệu của data ra trả lời*. 

Đầu tiên chúng ta phải tạo một app django đã nhé. Mọi người có thể tham khảo ở [bài viết này](https://viblo.asia/p/ket-noi-django-va-postgresql-nhu-the-nao-4P856NDa5Y3) của mình nhé 
# Create project Django 
## Tạo môi trường
Đầu tiên mình sẽ tạo môi trường với virtualenv: 
- Install: 

            pip install virtualenv
 - Tạo môi trường: 
 
             virtualenv env
  - Sử dụng: 
  
            source env/bin/activate
     Khi không muốn sử dụng nữa thì mn *deactivate* nó đi là xong. 
     
     ## Create project django
cài Django:

     `pip install Django`
     
  Tạo app thôi nào: 
  
  `Django-admin startproject myproject .`
  
  Vậy là đã tạo xong project django rồi, tiếp theo mình sẽ tạo app nhé. 
  
  `python manage.py startapp test_app`
  
  Thêm vào myproject/urls.py
  ```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('test_app/', include('test_app.urls')),
    path('admin/', admin.site.urls),
]
  ```
  
  trong file setting thì thêm 'test_app' 
  
  ```python
  INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'test_app',
    'rasa_test',
]
  ```
  
  Vậy là đã tạo xong một app hoàn chỉnh rồi, bước tiếp theo là tạo model trong file models.py tham khảo [tại đây](https://djangobook.com/mdj2-models/)
  
```python
from django.db import models

# Create your models here.

class CovidCountries(models.Model):
    country = models.CharField(null=False, blank=False, max_length=512)
    count_infect = models.IntegerField(null=False, blank=False)
    count_cure = models.IntegerField(null=False, blank=False)
    count_died = models.IntegerField(null=False, blank=False)
```

Bao gồm các trường:
* country - tên đất nước
* count_infect: số ca nhiễm
* count_cure: Chữa khỏi
* count_died:  số  người chết
  
Để dễ dàng thì mình sẽ tự add data vào bằng cơm nhá. Mọi người có thể tự crawl data về rồi thêm vào database nhé. Tham khảo [bài viết này](https://viblo.asia/p/tao-chatbot-tren-chatwork-tu-dong-giai-dap-thong-tin-ve-dich-covid-2020-924lJq9XZPM) của a Phạm Văn Toàn nhé. 
 Để có thể trực tiếp thêm data trên site admin thì thêm đoạn code dưới đây vào test_app/admin.py nhé:
 
```python
from django.contrib import admin
from test_app.models import CovidCountries

@admin.register(CovidCountries)
class CovidCountries(admin.ModelAdmin):
    list_display = ["country", "count_infect", "count_cure", "count_died"]
 ```
 
 Bây giờ các bạn thử runserver lên nhé: 
 
 ```python
 python manage.py makemigrations
  python manage.py migrate
  # create supperuser
  python manage.py createsuperuser
 python manage.py runserver
 ```
 
 Sau khi runserver và đăng nhập vào file admin thì sẽ được giao diện như thế này: 
 
 ![](https://images.viblo.asia/71750679-5ff9-4c07-82cf-ed097d37f941.PNG)

Hình 1: Admin site

Tiếp tục thêm data nào, mình chỉ thêm 4 quốc gia để test thôi nhé, bao gồm: Việt Nam, Mỹ, Ý, Trung Quốc. 

![](https://images.viblo.asia/69e16933-543c-44d8-be04-2f0127e61327.PNG)

Hình 2: data

# Create bot bằng Rasa 
Sau khi đã tạo xong project Django thì chúng ta  sẽ tạo chatbot nhé :D 
Nếu muốn biết vì sao  mình lại sử dụng  Rasa để viết chatbot thì mọi người tham khảo [bài này nè ](https://viblo.asia/p/hieu-rasa-qua-quy-trinh-xay-dung-mot-chatbot-giup-ban-tra-loi-cau-hoi-hom-nay-an-gi-WAyK8P4pKxX)

Bước đầu tiên tất nhiên là chúng ta phải cài đặt Rasa rồi: 
`pip install rasa==1.7.0`

Khởi tạo Rasa trong myproject 

`rasa init`

Folder sẽ bao gồm các file:
* data/nlu.md
* config.yml
* data/stories.md
* domain.yml
* actions.py
* enpoints.yml
* credentials.yml

## NLU

Trong config.yml sẽ chứa: 

```python
# Configuration for Rasa NLU.
language: vi
pipeline: supervised_embeddings
```
Ngôn ngữ được lựa chọn ở đây là vi (vietnam).

Với file nlu.md sẽ tạo ra các intent như: chào hỏi, tạm biệt, cảm ơn, hỏi số ca bệnh bị nhiễm, ...

```python
## intent:greet
- hey
- hello
- hi
- chào
- xin chào
- chào anh
- chào chị
- chào bạn
- chào buổi sáng
- chào buổi tối
- chào buổi chiều
- chào em
- chào đằng ấy
- này
- này ơi
- bạn gì đó ơi
- ê mày

## intent:goodbye
- bye
- goodbye
- bye bye
- gặp lại sau
- tạm biệt
- chào tạm biệt
- hẹn gặp lại
- lúc khác gặp lại
- về đây
- see you again
- tạm biệt bạn
- tạm biệt anh
- tạm biệt chị
- lần sau gặp lại

## intent:thankyou
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

## intent:ask_countries
- Hiện có đất nước nào đang có dịch bệnh?
- Các nước có dịch bệnh?
- cho anh hỏi nước nào đang có dịch thế em?
- Những đất nước nào đang có dịch bệnh rồi?
- tình hình dịch bệnh dạo này ra sao nhỉ?
- Quốc gia nào đang có dịch?
- những đất nước đang nhiễm covid

## intent:ask_totalinfect
- Có tất cả bao nhiêu người nhiễm hiện nay?
- Tổng số người nhiễm covid
- Số ca nhiễm
- tổng số ca nhiễm covid
- Có tất cả bao nhiêu ca nhiễm vậy em?
- lượng người nhiễm covid hiện nay là bao nhiêu

```
## Stories

```
## say greeting
* greet
   - utter_greet

## say goodbye
* goodbye
   - utter_goodbye

## say thankyou
* thankyou
   - utter_thankyou

## ask countries
* ask_countries
   - action_ask_countries

## ask total infect
* ask_totalinfect
   - action_ask_totalinfect
```

## domain
```
session_config:
  session_expiration_time: 0.0
  carry_over_slots_to_new_session: true
intents:
- greet
- goodbye
- thankyou
- ask_countries
- ask_totalinfect
responses:
  utter_greet:
  - text: Này! Bạn khỏe chứ?
  - text: Dạo này bạn sao rồi?
  - text: Bạn cần tui giúp gì
  - text: Chào, tôi có thể giúp gì được cho bạn
  - text: Chào bạn, chúc bạn một ngày mới tốt lành
  - text: Chào
  utter_goodbye:
  - text: Tạm biệt bạn
  - text: Hẹn gặp lại vào lần sau
  - text: Tạm biệt
  - text: Hẹn gặp lại  lần sau
  - text: Khi nào rảnh lại nói chuyện với tôi nhé
  - text: Bye :(
  utter_thankyou:
  - text: Rất vui được nói chuyện với bạn
actions:
- utter_greet
- utter_goodbye
- utter_thankyou
- action_ask_countries
- action_ask_totalinfect
```

## actions
 Ở đây mình sẽ custom action cho 2 intents: ask_countries và  ask_totalinfect để có thể lấy được data từ database nhé. 
 
 Thực chất để kết nối với database thì chỉ cần: 


  ```python
 import os
import django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings")
django.setup()
from test_app.models import CovidCountries
 ```
 
Sau khi đã kết nối xong rồi thì mình viết hàm custom actions và query đến thôi nào. Các bạn có thể [tham khảo query django model tại đây](https://tutorial.djangogirls.org/en/django_orm/) nhé
 ```python
 from typing import Text, List, Dict, Any
from rasa_sdk import Action, Tracker
from rasa_sdk.events import SlotSet, SessionStarted, ActionExecuted, EventType
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import sys
import os
import django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "myproject.settings")
django.setup()
from test_app.models import CovidCountries


class ActionAskCountries(Action):
    def name(self) -> Text:
        return "action_ask_countries"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
       
        message = tracker.latest_message['intent'].get('name')
        if message == 'ask_countries':
            query_set = CovidCountries.objects.all()
            response = "Các nước nhiễm covid-19 là: "
            for q in query_set:
                response = response + \
                    "\n {}".format(q.country)
            dispatcher.utter_message(response)


class ActionAskTotalInfect(Action):
    def name(self) -> Text:
        return "action_ask_totalinfect"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
       
        message = tracker.latest_message['intent'].get('name')
        if message == 'ask_totalinfect':
            query_set = CovidCountries.objects.all()
            total = 0 
            for q in query_set:
                total += q.count_infect
            total_response = "Tổng số ca nhiễm là: {}".format(total)
            dispatcher.utter_message(total_response)
 ```
 
 Sau khi xong thì bật 2 terminal lên: 1 cái để chạy rasa-x , 1 cái để run actions
 
 Đầu tiên mình phải train đã : 
 `rasa train`
 
 sau đó run rasa-x lên nào 
 
 `rasa x`
 
 Tiếp theo là run file actions lên nhé: 
 
 Để chạy được actions.py thì phải thêm vào endpoints.yml 
 
 ```python
 action_endpoint:
 url: "http://localhost:5055/webhook"
 ```
 # Test 
 Sau khi đã bật rasa x lên thì mình tiến hành test thôi, trước khi trò chuyện với bot thì bạn phải active model lên trước nha. 
 
 ![](https://images.viblo.asia/f6196b4a-4b2d-4c05-b39a-5837808b0f64.PNG)

 Hình: Thử trò chuyện với bot

# Kết Luận
Cảm ơn mọi người đã kiên trì đọc hết bài của mình ạ. Bài viết chỉ mang tính chất demo để mọi người có thể tham khảo nếu muốn làm project liên quan ạ nên dữ liệu mình chỉ fake 1 ít thôi như mình đã nói ở trên nếu các bạn muốn crawl hẳn data về covid 19 về thì có thể tham khảo bài của anh Phạm Văn Toàn ở trên :D. Mong nhận đc sự góp ý của mọi người.

# Reference

- https://tutorial.djangogirls.org/en/django_orm/
- https://djangobook.com/mdj2-models/