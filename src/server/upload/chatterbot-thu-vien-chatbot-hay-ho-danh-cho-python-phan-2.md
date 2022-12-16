Trong phần 1 đã đề cập một số vấn đề cơ bản của chatterbot. Trong phần này sẽ bổ sung thêm một số phần sau đây.

# Training
ChatterBot bao gồm các công cụ giúp đơn giản hóa quá trình training một chat bot instance. Quá trình training của ChatterBot liên quan đến việc tải example dialog (Cuộc hội thoại mẫu) vào database của chat bot. Việc tạo hay xây dựng này dựa trên graph data structure (Biểu đồ Cấu trúc Dữ liệu) đại diện cho tập các statement và các response đã biết. Khi một chat bot trainer được cung cấp một dataset, nó tạo các necessary entries bên trong knowledge graph của chat bot các statement input và statement response một cách chính xác.

![](https://images.viblo.asia/bcaf9e27-5242-4be9-b28e-2fa1de8916b6.png)


Một số training class được tích hợp sẵn trên ChatterBot. Các tiện ích này bao gồm từ cho phép bạn cập nhật database knowledge graph của chat bot dựa trên một list các statement trong cuộc hội thoại, đến các công cụ cho phép bạn train bot của mình dựa trên một corpus of pre-loaded training data (dữ liệu training được tải sẵn).

Bạn cũng có thể tạo training class của riêng bạn. Điều này được khuyến nghị nếu bạn muốn train bot của mình bằng data mà bạn đã lưu trữ ở định dạng chưa được hỗ trợ bởi một trong các class dựng sẵn được liệt kê bên dưới.

# Thiết lập các training class
ChatterBot đi kèm với các training class được dựng sẵn hoặc bạn có thể tự tạo nếu cần. Để sử dụng một training class, bạn gọi phương thức `train()` trên một instance được khởi tạo từ chat bot của bạn.

## Các Training Class
### Training thông qua List Data

`chatterbot.trainers.ListTrainer(chatbot,**kwargs)`
Cho phép chat bot được train bằng cách sử dụng một list chứa các string, trong đó list đại diện cho một cuộc hội thoại.

Đối với quá trình training này, bạn sẽ cần đưa vào một list các statement, trong đó thứ tự của mỗi statement được dựa trên vị trí của nó trong cuộc hội thoại. Ví dụ, nếu bạn chạy bot dưới đây sau khi train, thì kết quả trả về khi chat bot nhận hai statement “Hi there!” và “Greetings!” là “Hello”.

![](https://images.viblo.asia/395142a1-7594-49be-871f-3f613b4004aa.png)

Bạn cũng có thể cung cấp một list dài hơn các training conversation. Điều này sẽ làm cho từng item trong list như một response có thể được trả về khi nhận được input là item đứng trước nó trong list. Như ví dụ bên dưới, nó sẽ trả về “I am good.” nếu nó nhận được “How are you?”.

```
trainer.train([
    "How are you?",
    "I am good.",
    "That is good to hear.",
    "Thank you",
    "You are welcome.",
])

```

### Training bằng corpus data

`chatterbot.trainers.ChatterBotCorpusTrainer(chatbot,**kwargs)`

Cho phép chat bot được train bằng cách sử dụng dữ liệu từ ChatterBot dialog corpus.
ChatterBot đi cùng với một utility module và corpus data giúp bạn nhanh chóng train chatbot để có thể giao tiếp. Để làm như vậy, chỉ cần chỉ định các module corpus data bạn muốn sử dụng.

![](https://images.viblo.asia/b8329aa7-529c-4634-8acc-e003c562edec.png)

**Chỉ định corpus scope**

Cũng có thể import các tập con riêng lẻ từ corpus của ChatterBot cùng một lúc. Ví dụ, nếu bạn chỉ muốn train dựa trên hai corpus english greetings và english conversations thì bạn chỉ cần chỉ định chúng.
```
trainer.train(
    "chatterbot.corpus.english.greetings",
    "chatterbot.corpus.english.conversations"
)

```

Bạn cũng có thể chỉ định các đường dẫn đến các tệp corpus hoặc các thư mục chứa các tệp corpus khi gọi phương thức train().

```
trainer.train(
    "./data/greetings_corpus/custom.corpus.json",
    "./data/my_corpus/"
)
```

**Training bằng Ubuntu dialog corpus**

***Cảnh báo:***
> Ubuntu dialog corpus là một dataset lớn. Các developer sẽ phải chấp nhận performance của việc training và thời gian response của chat bot bị tăng đáng kể khi sử dụng khi corpus này.


`chatterbot.trainers.UbuntuCorpusTrainer(chatbot,**kwargs)`

Cho phép chat bot được train với data được lấy từ Ubuntu dialog corpus.
Training class này cho phép train chatbot của bạn bằng cách sử dụng Ubuntu dialog corpus. Do kích thước của Ubuntu dialog corpus nên quá trình tải xuống và training có thể mất một khoảng thời gian đáng kể.

Training class này sẽ xử lý quá trình tải xuống file corpus được nén và giải nén nó. Nếu tập tin đã được tải xuống, nó sẽ không được tải xuống nữa. Nếu tập tin đã được giải nén, nó sẽ không được giải nén lại.

### Tạo mới một training class

Bạn có thể tạo mới một trainer để train cho chat bot của bạn từ các data file của riêng bạn. Bạn có thể chọn thực hiện việc này nếu bạn muốn train chatbot của mình từ nguồn dữ liệu theo định dạng không được ChatterBot hỗ trợ trực tiếp.

Custom trainer của bạn nên Kế thừa `chatterbot.trainers.Trainer` class. Trainer của bạn sẽ cần phải có một phương thức có tên là *train*, có thể lấy bất kỳ tham số nào tùy bạn.

Một số Training Class hiện có: [https://github.com/gunthercox/ChatterBot/blob/master/chatterbot/trainers.py](https://github.com/gunthercox/ChatterBot/blob/master/chatterbot/trainers.py)


# Preprocessors (bộ tiền xử lý)

Preprocessors của ChatterBot là các hàm đơn giản được tạo ra nhằm mục đích tinh chỉnh input statement mà chat bot nhận được trước khi statement đó được xử lý bởi logic adapter.

Dưới đây là ví dụ về cách đặt preprocessors. Tham số preprocessors phải là một list chứa các string là đường dẫn import đến preprocessors của bạn.

```
chatbot = ChatBot(
    'Bob the Bot',
    preprocessors=[
        'chatterbot.preprocessors.clean_whitespace'
    ]
)
```

## Các preprocessor function

ChatterBot đi kèm với một số preprocessor dựng sẵn.

`chatterbot.preprocessors.clean_whitespace(statement)`  [https://chatterbot.readthedocs.io/en/stable/_modules/chatterbot/preprocessors.html#clean_whitespace](https://chatterbot.readthedocs.io/en/stable/_modules/chatterbot/preprocessors.html#clean_whitespace)

Xóa mọi kí tự khoảng trắng liên tiếp khỏi statement text.

`chatterbot.preprocessors.unescape_html(statement)` [https://chatterbot.readthedocs.io/en/stable/_modules/chatterbot/preprocessors.html#unescape_html](https://chatterbot.readthedocs.io/en/stable/_modules/chatterbot/preprocessors.html#unescape_html)

Chuyển đổi các kí tự escaped HTML thành các kí tự unescaped HTML. Ví dụ: “&lt;b&gt;” thành “<b>”.
    
`chatterbot.preprocessors.convert_to_ascii(statement)` [https://chatterbot.readthedocs.io/en/stable/_modules/chatterbot/preprocessors.html#convert_to_ascii](https://chatterbot.readthedocs.io/en/stable/_modules/chatterbot/preprocessors.html#convert_to_ascii)
    
Chuyển đổi kí tự Unicode thành các kí tự ASCII tương đương. Ví dụ: “på fédéral” thành “pa federal”.

    
## Tạo mới preprocessors

 Tạo preprocessors mới rất đơn giản. Một preprocessor là một hàm đáp ứng các yêu cầu dưới đây.
    
1.    Nó phải có một và chỉ một tham số, là một Statement instance.
2.    Nó phải trả về một Statement instance.

   Đơn giản là làm  sao đưa dữ liệu vào và trả ra các dữ liệu tốt hơn
    
    
    
#  Kết Bài
    
   Trong phần này mình đã trình bày về quá trình training data và tiền xử lý dữ liệu. Trong phần sau mình sẽ trình bày về Logic adapters của chatter bot. Xin cảm ơn các bạn