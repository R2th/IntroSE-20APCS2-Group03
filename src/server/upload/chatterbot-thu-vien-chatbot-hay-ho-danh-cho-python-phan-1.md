Vào một ngày đẹp trời và chán nản. Tôi lang thang trên các diễn đàn về Tech và đọc được một post về chat bot nó có cái tên nghe khá là simple nhưng cực hữu ích với những thanh niên muốn tiếp cận với "chat bot".

![](https://images.viblo.asia/67c2d752-093f-4787-aa22-231e0bf7fe49.png)


### Đôi nét về ChatterBot
ChatterBot là một thư viện Python giúp bạn tạo ra một chat bot có khả năng trả lời tự động từ input của người dùng. ChatterBot sử dụng thuật toán lựa chọn của máy học để tạo ra các loại Response khác nhau. Điều này giúp các nhà phát triển dễ dàng tạo các chatbot có khả năng trò chuyện và tự động hóa cuộc hội thoại với người dùng. Để biết thêm chi tiết về các ý tưởng và khái niệm đằng sau ChatterBot hãy xem Process Flow Diagram (Sơ đồ luồng xử lý ở bên dưới).

Một ví dụ cho một cuộc hội thoại giữa người và bot:

> * user: Good morning! How are you doing?
> * bot:  I am doing very well, thank you for asking.
> * user: You're welcome.
>* bot:  Do you like hats?


### Độc lập Ngôn ngữ
Thiết kế Độc lập Ngôn ngữ của ChatterBot cho phép nó được Huấn luyện để có thể nói bất cứ ngôn ngữ nào. Ngoài ra bản chất  Machinelearing của ChatterBot cho phép một Instance là tác nhân cải thiện kiến thức của chính nó về các phản ứng có thể có khi nó tương tác với con người và từ các nguồn dữ liệu khác.

### Cách ChatterBot hoạt động

ChatterBot là một thư viện Python được thiết kế để giúp dễ dàng tạo một phần mềm mà ở đó nó có thể tham gia vào việc giao tiếp hay còn gọi là chatbot.

Một instance của ChatterBot chưa được train, start mà chưa có kiến thức về cách giao tiếp. Mỗi khi người dùng nhập một statement, thư viện sẽ lưu văn bản mà họ đã nhập và văn bản mà bot phản hồi lại. Khi số lượng input mà ChatterBot nhận được tăng thì số lượng các response mà nó có thể trả lời cũng như độ chính xác của từng response có liên quan đến input statement đó cũng tăng theo.

Chương trình này lựa chọn response phù hợp nhất bằng cách tìm kiếm statement đã biết gần nghĩa nhất với input statement, sau đó nó chọn một response từ các response đã biết của statement đó. (Cái này khá giống với app Simimi)


### Process Flow Diagram


![](https://images.viblo.asia/f03eecea-f680-4220-849d-a889cfc9f934.png)

### Cài đặt


Chú ý phải các các thư viện hỗ trợ:
* tensorflow
* numpy
* pandas
* sklearn
* imutils


Nếu bạn mới bắt đầu với ChatterBot, bạn nên cài đặt phiên bản mới nhất của nó từ Python Package Index (PyPi), để cài đặt ChatterBot bằng pip, bạn sử dụng lệnh sau trong Terminal.

```
pip install chatterbot
```


**Cài đặt từ GitHub**

Bạn có thể cài đặt phiên bản development mới nhất của ChatterBot trực tiếp từ GitHub bằng cách sử dụng pip:

```
pip install git+git://github.com/gunthercox/ChatterBot.git@master
```

**Cài đặt từ Source**

1. Tải về bản sao của code trên GitHub. Bạn cần phải cài đặt git để làm điều này.

    ```git clone https://github.com/gunthercox/ChatterBot.git```

2. Cài đặt code mà bạn vừa tải bằng cách sử dụng pip

    ```pip install ./ChatterBot```

Kiểm tra phiên bản ChatterBot mà bạn vừa cài đặt
Bạn sử dụng lệnh sau để kiểm tra phiên bản của ChatterBot vừa mới cài đặt.
 
 ```python -m chatterbot --version```

Nâng cấp ChatterBot lên phiên bản mới nhất
Giống như bất cứ phần mềm nào, Chatterbot sẽ được cải tiến theo thời gian. Thường thì, bạn không phải thay đổi bất cứ điều gì trong code của mình để hưởng lợi từ phiên bản mới.

Đôi khi, có những thay đổi sẽ yêu cầu sửa đổi code của bạn hoặc sẽ có những thay đổi giúp bạn cải thiện chất lượng code của mình bằng cách sử dụng những tính năng mới.

Có thể xem các bản release của Chatter Bot tại đây:.
https://github.com/gunthercox/ChatterBot/releases


### Một số thứ cơ bản ban đầu

Tạo mới một chat bot
```python
from chatterbot import ChatBot
chatbot = ChatBot("Ron Obvious")
```

Chú thích:
Tham số yêu cầu duy nhất của ChatBot là tên. Bạn có thể đặt tên của nó sao cũng được. Và bạn có thể gọi ra tên của chat bot thông qua thuộc tính name.

**Training cho chatbot**

Sau khi tạo mới một instance Chatbot, bạn đã có thể train cho nó. Training là một cách tốt để đảm bảo rằng con bot của bạn khởi đầu với một lượng kiến thức về các response mà nó có thể sử dụng. Phương thức training hiện tại là nhận một list các statement (câu nói) trong cuộc nói chuyện thông thường. Chi tiết về phần training có thể mình sẽ viết trong bài sau.


Chatter Bot này đã có một số bộ ngôn ngữ nên chúng ta có thể sử dụng luôn mà không cần phải training lại. Nhưng với tiến Vieetjj thì chắc phải training đấy.

Một ví dụ nho nhỏ cho việc training con bot này:

```python
from chatterbot.trainers import ListTrainer
 
conversation = [
    "Hello",
    "Hi there!",
    "How are you doing?",
    "I'm doing great.",
    "That is good to hear",
    "Thank you.",
    "You're welcome."
]
trainer = ListTrainer(chatbot)
trainer.train(conversation)
```


Để lấy ra response trả về. Ở đây tham số đầu vào là một input của người dùng và respone là câu phản hồi của bot:

```python
response = chatbot.get_response("Good morning!")
print(response)
```

 <hr>
 
**Thiết lập storage adapter**

ChatterBot đi kèm với các adapter class tích hợp cho phép nó kết nối với nhiều loại database khác nhau. Trong hướng dẫn này, sẽ sử dụng SQLStorageAdapter cho phép chat bot kết nối tới SQL database. Mặc định, adapter này sẽ tạo một SQLite database.

Tham số database được sử dụng để chỉ định đường dẫn đến database mà chat bot sẽ sử dụng. Trong ví dụ này, sẽ sử dụng database sqlite:///database.sqlite3. Tập tin này sẽ được tạo tự động nếu nó không tồn tại.


```python
bot = ChatBot(
    'Norman',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    database_uri='sqlite:///database.sqlite3'
)
```
*Chú thích*:

> SQLStorageAdapter là adapter mặc định của ChatterBot. Nếu bạn không chỉ định một adapter nào trong constructor, adapter SQLStorageAdapter sẽ được tự động sử dụng.


### Chỉ định các logic adapter

Tham số  **logic_adapters** là một list các logic adapter. Trong ChatterBot, một logic adapter là một class nhận một *input atatement* và trả về một *response cho statement* đó.

Có thể chọn sử dụng nhiều logic adapter nếu muốn (Có thể tham khảo thêm tại trang chủ của chatterbot). Trong ví dụ này, ta sử dụng hai logic adapter. TimeLogicAdapter trả về thời gian hiện tại khi input statement hỏi nó. MathematicalEvaluation adapter sử dụng toán tử cơ bản (cộng trừ nhân chia) để giải quyết các vấn đề toán học.

```python
bot = ChatBot(
    'Norman',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    logic_adapters=[
        'chatterbot.logic.MathematicalEvaluation',
        'chatterbot.logic.TimeLogicAdapter'
    ],
    database_uri='sqlite:///database.sqlite3'
)
```

**Training chat bot**

Lúc này chat bot của bạn – Norman sẽ học cách giao tiếp khi bạn nói chuyện với nó. Bạn có thể tăng tốc quá trình này bằng cách training nó với các ví dụ về cuộc hội thoại hiện có(như ví dụ bên trên kia). Có thể chạy quy trình training này nhiều lần để củng cố các response ưa thích cho các input statement cụ thể. Bạn cũng có thể chạy lệnh train trên các cuộc hội thoại mẫu khác nhau để tăng độ rộng của các input mà chat bot của bạn có thể phản hồi lại. (Chi tiết về thuật toán sẽ được trình bày sau)

### Một số ví dụ ứng dụng Chatter Bot


[Một số ví dụ](https://github.com/gunthercox/ChatterBot/tree/master/examples)


**Ví dụ đơn giản**
```python
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
 
# Create a new chat bot named Charlie
chatbot = ChatBot('Charlie')
 
trainer = ListTrainer(chatbot)
 
trainer.train([
    "Hi, can I help you?",
    "Sure, I'd like to book a flight to Iceland.",
    "Your flight has been booked."
])
 
# Get a response to the input text 'I would like to book a flight.'
response = chatbot.get_response('I would like to book a flight.')
 
print(response)
```
**Ví dụ trên Terminal**

Đoạn code này sẽ cho thấy cách tạo một terminal client đơn giản cho phép bạn giao tiếp với chat bot của mình bằng cách nhập vào terminal.
```python
from chatterbot import ChatBot
 
 
# Uncomment the following lines to enable verbose logging
# import logging
# logging.basicConfig(level=logging.INFO)
 
# Create a new instance of a ChatBot
bot = ChatBot(
    'Terminal',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    logic_adapters=[
        'chatterbot.logic.MathematicalEvaluation',
        'chatterbot.logic.TimeLogicAdapter',
        'chatterbot.logic.BestMatch'
    ],
    database_uri='sqlite:///database.db'
)
 
print('Type something to begin...')
 
# The following loop will execute each time the user enters input
while True:
    try:
        user_input = input()
        bot_response = bot.get_response(user_input)
        print(bot_response)
 
    # Press ctrl-c or ctrl-d on the keyboard to exit
    except (KeyboardInterrupt, EOFError, SystemExit):
        break
```
**Sử dụng MongoDB**

 Để khai báo cho ChatterBot sử dụng adapter này, bạn sẽ cần đặt tham số *storage_adapter*.
 
 Đây là code mẫu:
```python
from chatterbot import ChatBot
 
# Uncomment the following lines to enable verbose logging
# import logging
# logging.basicConfig(level=logging.INFO)
 
# Create a new ChatBot instance
 
 
bot = ChatBot(
    'Terminal',
    storage_adapter='chatterbot.storage.MongoDatabaseAdapter',
    logic_adapters=[
        'chatterbot.logic.BestMatch'
    ],
    database_uri='mongodb://localhost:27017/chatterbot-database'
)
 
print('Type something to begin...')
 
while True:
    try:
        user_input = input()
        bot_response = bot.get_response(user_input)
        print(bot_response)
 
    # Press ctrl-c or ctrl-d on the keyboard to exit
    except (KeyboardInterrupt, EOFError, SystemExit):
        break
```

**Ví dụ về Thời gian và Tính toán**

ChatterBot có khả năng đánh giá natural language cho phép nó xử lý và đánh giá các input Toán học (Mathematical) và Thời gian (Time-Based) tất nhiên là bằng tiếng Anh. Tiếng việt chúng ta cần phải training

```python
from chatterbot import ChatBot
 
bot = ChatBot(
    'Math & Time Bot',
    logic_adapters=[
        'chatterbot.logic.MathematicalEvaluation',
        'chatterbot.logic.TimeLogicAdapter'
    ]
)
 
# Print an example of getting one math based response
response = bot.get_response('What is 4 + 9?')
print(response)
 
# Print an example of getting one time based response
response = bot.get_response('What time is it?')
print(response)
```


**Sử dụng SQL Adapter**

Dữ liệu của ChatterBot có thể được lưu và lấy ra từ SQL database.
```python
from chatterbot import ChatBot
 
# Uncomment the following lines to enable verbose logging
# import logging
# logging.basicConfig(level=logging.INFO)
 
# Create a new instance of a ChatBot
bot = ChatBot(
    'SQLMemoryTerminal',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    database_uri=None,
    logic_adapters=[
        'chatterbot.logic.MathematicalEvaluation',
        'chatterbot.logic.TimeLogicAdapter',
        'chatterbot.logic.BestMatch'
    ]
)
 
# Get a few responses from the bot
 
bot.get_response('What time is it?')
 
bot.get_response('What is 7 plus 7?')
```

**Read-only mode**

Chat bot của bạn sẽ học dựa trên mỗi input statement mới mà nó nhận được. Nếu bạn muốn tắt tính năng học này sau khi bot của bạn đã được train, bạn có thể truyền giá trị cho tham số *readonly=True* khi khởi tạo chat bot.

`chatbot = ChatBot("Johnny Five", read_only=True)`


### Tổng kết phần

Qua phần trên mình đã trình bày một số kiến thức cơ bản về chatter bot và một số tính năng hay ho của nó. Trong phần sau mình sẽ trình bày thêm về (kỹ thuật training, logic adapters, ... ) và tích hợp vào django 

https://github.com/gunthercox/ChatterBot