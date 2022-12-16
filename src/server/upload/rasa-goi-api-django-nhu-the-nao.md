Ở bài trước [](https://viblo.asia/p/ket-noi-rasa-voi-django-nhu-the-nao-gDVK26X2KLj) mình đã viết về chủ đề Kết nối Rasa với Django, tuy nhiên để việc maintain, scale hay deploy, vận hành trên server cũng sẽ dễ dàng  cho sau này chúng ta sẽ phải tách ra 2 phần Django và Rasa riêng biệt và gọi nhau qua API. 

Các mục mình sẽ viết trong bài 
* Viết API 
*  Rasa gọi API từ django 
*  Kết Luận
* Reference 

# Viết API 
Ở bài trước có 2 tính năng *ask_countries* và *ask_totalinfect*  cần phải thông qua Django Model để lấy được dữ liệu trả ra cho  người dùng. Vì vậy muốn tách biệt Django và Rasa  chúng ta phải viết API để gọi từ Rasa nhé. Các bước tạo project đã có sẵn ở [bài trước ](https://viblo.asia/p/ket-noi-rasa-voi-django-nhu-the-nao-gDVK26X2KLj) rồi nên mọi người có thể làm theo các bước ở bài đó trước rồi quay qua bài này nha. 

Cùng bắt đầu thôi nào!

Khi bắt đầu viết API thì chúng ta cùng tạo thêm thư mục views trong folder *test_app*, nhớ tạo luôn cả file __init__.py nhé. Sau đó tạo folder helpers, trong thư mục này chứa __init__.py và format_response.py 
Thêm đoạn code dưới đây vào format_response.py nhé.
```python:format_response.py
from rest_framework.response import Response

def format_response(code=200, data=[], message='Default response message', errors=[]):
    return Response(
        {
            'code': code,
            'data': data,
            'message': message,
            'errors': errors
        }, status=code
    )

def success_response(data=[], message='Success'):
    return format_response(data=data, message=message, code=200)

def error_response(errors=[], message='Failed', code=422):
    return format_response(code=code, message=message, errors=errors)

```

## API ask_countries

Tạo file ask_countries_view.py: 
 Chúng ta cùng code api thôi nào.
 Thêm vào file với đoạn code sau: 
 ```python:ask_countries_view.py
 from rest_framework.views import APIView
from test_app.helpers.format_response import success_response, error_response
from test_app.models import CovidCountries

class AskCountriesView(APIView):
    success_message = "Success"
    failure_message = "Failed"
    def post(self, request):
        data = request.data['message']
        if data is None:
            return error_response(errors=[], message=self.failure_message)
        if data == 'ask_countries':
            query_set = CovidCountries.objects.all()
            response = "Các nước nhiễm covid-19 là: "
            for q in query_set:
                response = response + \
                    "\n {}".format(q.country)
            print(response)
            return success_response(message=self.success_message, data=response)
 ```

 Sau đó chúng ta phải thêm urls.py trong folder test_app: 
```python:test_app/urls.py
 from django.urls import path
from test_app.views.ask_countries_view import AskCountriesView

app_name ="test_app"

urlpatterns = [
    path("ask-countries", AskCountriesView.as_view(),name='ask-countries'),
]
```

Khi đó url api của hỏi countries nhiễm covid sẽ là :  "http://127.0.0.1:8002/test_app/ask-countries"

 Trong file action.py ở Hàm custom AskCountriesAction: 

 ```python:action.py
 def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        message = tracker.latest_message['intent'].get('name')

        headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }

        payload = {"message": message}
        payload = json.dumps(payload)
        response = requests.post("http://127.0.0.1:8002/test_app/ask-countries",
                                    data=payload,
                             headers=headers)

        data = response.json()['data']
        dispatcher.utter_message(data)

 ```

 Sau đó  bật  rasa x rồi test thử thôi nào, mn có thể  Dùng postman để thử tuy nhiên để trực quan hơn mình sẽ thử bằng  rasa x nhé: 
 ![](https://images.viblo.asia/2c4b7f2f-840a-4b3d-b6f5-678734a109a2.PNG)
Hình 1: đoạn hội thoại hỏi countries nhiễm covid 19 

Dựa vào hình này mình có thể biết là chúng ta đã sử dụng api để giao tiếp giữa django và api rồi :D 

Tiếp theo chúng ta cùng viết tiếp tính năng còn lại nhé :D 

## ask_totalinfect

Tương tự như ở trên chúng ta cần tạo thêm file ask_totalinfect_view.py chỉnh sửa trong actions và thêm đường dẫn vào test_app/urls.py

Với file ask_totalinfect_view.py: 

```python:ask_totalinfect_view.py
from rest_framework.views import APIView
from test_app.helpers.format_response import success_response, error_response
from test_app.models import CovidCountries

class AskTotalInfectView(APIView):
    success_message = "Success"
    failure_message = "Failed"
    def post(self, request):
        data = request.data['message']
        if data is None:
            return error_response(errors=[], message=self.failure_message)
        if data == 'ask_totalinfect':
            query_set = CovidCountries.objects.all()
            total = 0 
            for q in query_set:
                total += q.count_infect
            total_response = "Tổng số ca nhiễm là: {}".format(total)
            return success_response(message=self.success_message, data=total_response)
```

```python:test_app/urls.py
from django.urls import path
from test_app.views.ask_countries_view import AskCountriesView
from test_app.views.ask_totalinfect_view import AskTotalInfectView
app_name ="test_app"

urlpatterns = [
    path("ask-countries", AskCountriesView.as_view(),name='ask-countries'),
    path("ask-totalinfect", AskCountriesView.as_view(),name='ask-totalinfect'),
]

```

Tiếp theo là trong file actions.py

```python:actions.py
class ActionAskTotalInfect(Action):
    def name(self) -> Text:
        return "action_ask_totalinfect"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        message = tracker.latest_message['intent'].get('name')

        headers = {
            'Content-Type': 'application/json; charset=utf-8',
        }

        payload = {"message": message}
        payload = json.dumps(payload)
        response = requests.post("http://127.0.0.1:8002/test_app/ask-totalinfect",
                                    data=payload,
                             headers=headers)

        data = response.json()['data']
        dispatcher.utter_message(data)
```

![](https://images.viblo.asia/8f874110-e8fb-4089-bcc4-918deb913740.PNG)

# Kết Luận 
Cảm ơn mọi người đã đọc bài viết của mình ạ

# Reference
https://viblo.asia/p/ket-noi-rasa-voi-django-nhu-the-nao-gDVK26X2KLj

https://www.django-rest-framework.org/tutorial/quickstart/