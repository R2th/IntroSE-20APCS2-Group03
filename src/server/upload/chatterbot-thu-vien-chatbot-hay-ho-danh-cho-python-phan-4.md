Hôm nay mình sẽ chia sẽ thêm về một số kiến thức liên quan về ChatterBot. Chắc đây sẽ là bài lý thuyết cuối, để từ đó mỗi bạn có thể tự build cho mình một con chatbot vui vui. Ngoài ra, chúng ta có thể kết hợp với các bộ thư viện khác để tạo ra được 1 sản phẩm demo nho nhỏ.

### Filters (bộ lọc) của chatterBot
Đây là một giải pháp giúp cho chatterbot của chúng ta hoạt động ngon lành hơn. Cụ thể, **Filter** là một cách hiệu quả để tạo các truy vấn có thể được truyền đến storage adapter của ChatterBot. Filter sẽ giảm số lượng các statement mà chat bot phải xử lý khi nó đang chọn một response.

![](https://images.viblo.asia/caaa20e3-d66f-4b89-910a-60acc2817fcc.png)

**Cài đặt**:

Cái này rất đơn giản, chỉ cần chúng ta thêm các method filter khi khởi tạo đối tượng chatterbot là được. Ví dụ:

```python
chatbot = ChatBot(
    "My ChatterBot",
    filters=[filters.get_recent_repeated_responses]
)
```
Cụ thể ở đây chúng ta sử dụng một built-in filter 

`chatterbot.filters.get_recent_repeated_responses(chatbot,conversation,sample=10,threshold=3,quantity=3)`

Filter này giúp loại bỏ các response có thể lặp đi lặp lại để ngăn chat bot lặp lại các response mà nó đã nói gần đây, khiến cho cuộc trò chuyện đỡ chán hơn.
có thể tham khảo source[ tại đây](https://chatterbot.readthedocs.io/en/stable/_modules/chatterbot/filters.html#get_recent_repeated_responses)

### Conversations (cuộc hội thoại) của chatterbot

**ChatterBot** hỗi trợ thực hiện nhiều conversation đồng thời với nhiều người dùng. **Conversation** là nơi chat bot tương tác với một người và hỗ trợ nhiều conversation đồng thời có nghĩa là chat bot có thể có nhiều conversation khác nhau với những người khác nhau cùng một lúc.

**Phạm vi Conversation**

Nếu hai instance ChatBot được tạo, ***mỗi chat bot sẽ có cuộc hội thoại riêng biệt với nhau***.
Một Adapter có thể truy cập bất kỳ cuộc hội thoại nào miễn là Unique Identifier (Định danh Duy nhất) cho cuộc hội thoại được cung cấp.

**Ví dụ về Conversation**

Ví dụ sau đây được lấy từ Django ***ChatterBotApiView*** được tích hợp trong *ChatterBot*. Trong phương thức này, các định danh duy nhất cho mỗi phiên trò chuyện đang được lưu trữ trong các *session object* của Django. Điều này cho phép nhiều người dùng khác nhau tương tác với bot thông qua các trình duyệt web khác nhau để có các cuộc trò chuyện riêng với chatbot.

```python
def post(self, request, *args, **kwargs):
    """
    Return a response to the statement in the posted data.
 
    * The JSON data should contain a 'text' attribute.
    """
    input_data = json.loads(request.body.decode('utf-8'))
 
    if 'text' not in input_data:
        return JsonResponse({
            'text': [
                'The attribute "text" is required.'
            ]
        }, status=400)
 
    response = self.chatterbot.get_response(input_data)
 
    response_data = response.serialize()
 
    return JsonResponse(response_data, status=200)
```

**Statements**

Chatterbot’s statement object đại diện cho các input statement mà chat bot nhận được từ người dùng, hoặc output statement do chat bot trả về dựa trên input.

**class chatterbot.conversation.Statement(text, inresponseto=None,kwargs)**[[source](https://chatterbot.readthedocs.io/en/stable/_modules/chatterbot/conversation.html#Statement)]

Statement đại diện cho một câu nói từ một người dùng gửi cho chat bot.

* *confidence* = None
Logic Adapter của ChatterBot gán độ tin cậy cho phản hồi trước khi nó được trả về. Độ tin cậy cho biết mức độ chắc chắn mà chat bot tin rằng đây là phản hồi chính xác cho đầu vào đã cho.

* *inresponseto* = None
Thuộc tính response thể hiện mối quan hệ giữa hai statement. Giá trị này của trường này cho biết rằng một statement đã được ban hành để đáp ứng với statement khác.

* *save*() Lưu Statement vào CSDL.

**Mối quan hệ giữa statement và response**

ChatterBot lưu trữ kiến thức các về các cuộc hội thoại dưới dạng các Statement. Mỗi Statement có thể có nhiều Response.

![](https://images.viblo.asia/0a58d831-5195-4288-a90f-ad29e81625c8.png)

Mỗi Statement object có một tham chiếu in_response_to liên kết statement này tới các statement khác mà nó đã được học để có thể response khi gặp. Thuộc tính in_response_to về cơ bản là một tham chiếu đến tất cả các statement cha của statement hiện tại.

![](https://images.viblo.asia/548d6f03-2b0b-4403-b933-440ef486c7f0.png)

Số lượng statement được ghi trùng khớp, hoặc văn bản tương tự với nhau cho biết số lần statement được đưa ra dưới dạng response. Điều này giúp chat bot có thể xác định một response cụ thể có được sử dụng phổ biến hơn so với những cái khác không.


Trên đây đã trình bày thêm một số kiến thức về hội thoại trong chatterbot. Ngoài ra chúng ta cũng nên để ý thêm một số thư viện hay ho mà chatterbot đã cung cấp.

* Utility Methods
ChatterBot có một utility module chứa một tập hợp các hàm linh tinh nhưng hữu ích.
* Module Import
chatterbot.utils.import_module(dotted_path)[source]
Import module chỉ định dựa trên đường dẫn import có ký hiệu chấm “.” dành cho module.
* Class initialization
chatterbot.utils.initialize_class(data,*args,**kwargs)
Tham số: data – Một chuỗi hoặc một dict chứa một thuộc tính import_path.
* NLTK corpus downloader
chatterbot.utils.nltk_download_corpus(resource_path)[source]
Tải xuống tập tin NLTK corpus chỉ định nếu nó chưa được tải xuống.
Trả về True nếu corpus đã được tải xuống.
* ChatBot response time
`chatterbot.utils.get_response_time(chatbot, statement='Hello')`

Trả về thời gian mà chat bot  Phản hồi.
Tham số: chatbot (ChatBot) – Một instance chat bot.
Trả về: thời gian phản hồi tính bằng giây.
Kiểu trả về: float.
* Lấy ra thông tin datetime
`chatterbot.parsing.datetime_parsing(text, base_date=datetime.datetime(2019, 2, 14, 10, 45, 40, 941220))`.
Trích xuất đối tượng datetime từ một chuỗi văn bản.


### ChatterBot Corpus (kho văn bản)

Đây là một corpus chứa dữ liệu về những cuộc hội thoại đi kèm với ChatterBot module ngay khi cài đặt. Để biết thêm thông tin về module chatterbot-corpus bạn có thể tìm hiểu trong ChatterBot Corpus Documentation.

**Corpus của các Ngôn ngữ có sẵn**

Corpus data là do người dùng đóng góp, nhưng cũng không khó để tạo một corpus nếu bạn biết một ngôn ngữ nào đó (nếu bạn biết Tiếng Việt thì bạn sẽ có thể tạo ra một corpus data Tiếng Việt). Điều này là do mỗi corpus chỉ là một mẫu của các input statement khác nhau và response của chúng để bot tự train.

Để khám phá thêm những Corpus của các Ngôn ngữ có sẵn bạn có thể xem thư mục *chatterbotcorpus/data* trong thư viện chatterbot-corpus repository riêng biệt.

**Xuất database của chat bot dưới dạng một training corpus**

Sau khi bạn tạo và train xong chat bot của mình và bạn muốn gửi nó ra bên ngoài thế giới, có lẽ bạn đang tìm cách chia sẻ những gì nó đã học được với các chat bot khác? Module training của ChatterBot cung cấp các phương thức cho phép bạn xuất nội dung trong database của chat bot của bạn dưới dạng một corpus training có thể được sử dụng để train các chat bot khác.

```python
chatbot = ChatBot('Export Example Bot')
chatbot.trainer.export_for_training('./export.yml')
```

đây là solution vidu: 

```python
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
 
chatbot = ChatBot('Export Example Bot')
 
# First, lets train our bot with some data
trainer = ChatterBotCorpusTrainer(chatbot)
 
trainer.train('chatterbot.corpus.english')
 
# Now we can export the data to a file
trainer.export_for_training('./my_export.json')
```


### Tích hợp với django

ChatterBot hỗ trợ trực tiếp việc tích hợp với Django’s ORM. Sử dụng Chatterbot với Django tương đối dễ dàng, giúp bạn có thể tạo ra các chatbox và endpoint.

**ChatterBot Django Settings**

Bạn có thể chỉnh sửa cấu hình ChatterBot thông qua tệp setting.py Django
```python
CHATTERBOT = {
    'name': 'Tech Support Bot',
    'logic_adapters': [
        'chatterbot.logic.MathematicalEvaluation',
        'chatterbot.logic.TimeLogicAdapter',
        'chatterbot.logic.BestMatch'
    ]
}
```

Bất kỳ cài đặt nào được đặt trong dict CHATTERBOT sẽ được chuyển đến chat bot được cung cấp cho Django App của bạn.

**ChatterBot Django Views**

Ví dụ cho Chatterbot’s Django dưới đây đi kèm với API view hướng dẫn cách sử dụng ChatterBot tạo một conversational API endpoint cho ứng dụng của bạn.
Endpoint yêu cầu một JSON request theo định dạng sau:

`{"text": "My input statement"}`
thì ta có 1 view demo sau":

```python
class ChatterBotApiView(View):
    """
    Provide an API endpoint to interact with ChatterBot.
    """
chatterbot = ChatBot(**settings.CHATTERBOT)
 
    def post(self, request, *args, **kwargs):
        """
        Return a response to the statement in the posted data.
 
        * The JSON data should contain a 'text' attribute.
        """
        input_data = json.loads(request.body.decode('utf-8'))
 
        if 'text' not in input_data:
            return JsonResponse({
                'text': [
                    'The attribute "text" is required.'
                ]
            }, status=400)
 
        response = self.chatterbot.get_response(input_data)
 
        response_data = response.serialize()
 
        return JsonResponse(response_data, status=200)
 
    def get(self, request, *args, **kwargs):
        """
        Return data corresponding to the current conversation.
        """
        return JsonResponse({
            'name': self.chatterbot.name
        })

```

Link demo: xem thêm tại [đây](https://github.com/gunthercox/ChatterBot/tree/master/examples/django_app)

### Tổng kết

Vậy qua đây mình đã giới thiệu thêm một số kiến tthức liên quan và cho ví dụ về tích hợp vào django. Từ đây ta có thể ứng dụng vào nhiều thứ hay ho. Ngoài ra, có thể kết hợp thêm các thư hiện text_to_speech để ngon hơn. Xin cảm ơn.

Tham khảo thêm về chattter bot: https://chatterbot.readthedocs.io/en/stable/_modules/chatterbot/filters.htm