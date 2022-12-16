Trong bài trước mình đã trình bày về Training data cho chatbot và tiền xử lý dữ liệu. Trong phần này sẽ trình bày với các bạn về logic adapter.
 
#  Logic Adapters

Logic adapters là bộ não của chatbot, xác định cách ChatterBot lựa chọn response sao cho logic với input statement mà nó nhận được.  

Class Logic Adapter:
`classchatterbot.logic.LogicAdapter(chatbot, **kwargs)`

Tham số:
* **search_algorithm_name** – Thuật toán để tìm kiếm statement tương đồng với input đầu vào. Defaults to the value of Search.name.
* **maximum_similarity_threshold** – Hệ số tương đống giữa statement và statement trong database(response list). mặc định **0.95**
* **response_selection_method** (collections.abc.Callable) – Phương thức chọn phản hồi. Mặc định là *getfirstresponse*
* **default_response (str or list or tuple)** – Là các phản hồi mặc định trong trường hợp không có response nào phù hợp. ví dụ như: ['Câu này tôi chưa học được!', 'Xin lỗi tôi ngu quá ạ.']


![](https://images.viblo.asia/5f057856-3a68-4e38-9d37-49385485e783.png)

#  Cách Logic Adapter lựa chọn Phản hồi
Một Logic Adapter sử dụng hai bước chính để thực hiện việc trả về Phản hồi cho Statement đầu vào.

* Bước đầu tiên là tìm kiếm trong database để tìm một known statement đã match hoặc gần match với input statement.
* Khi một statement được tìm thấy, bước hai là chọn một known response cho statement được chọn đó. Thông thường, sẽ có một số statement hiện có là response cho known statement

![](https://images.viblo.asia/a4160825-2399-4e43-b518-30765f05f969.png)


Để lựa chọn Phản hồi cho chatbot , một số phương thức đã được tích hợp vào ChatterBot để lựa chọn Phản hồi từ những mẫu có sẵn.

## Phương thức Lựa chọn Phản hồi

Phương thức '***Lựa chọn Phản hồi***' xác định Phản hồi nào sẽ được sử dụng trong trường hợp có nhiều Phản hồi được tạo ra từ Logic Adapter.

Ở đây có một số phương thức có sẵn và có một số ưu/nhược điểm khác  nhau:

*Phương thức 1*:

`chatterbot.response_selection.get_first_response(input_statement, response_list, storage=None)`

Trong đó:

* **input_statement** (Statement) – Một statement, khớp với đầu vào của chat bot.
* **response_list (list)** – Một list các statement để chọn một phản hồi từ đó.
* **storage (StorageAdapter)** – Một instance của một Storage Adapter để cho phép phương thức lựa chọn phản hồi truy cập vào các Statement khác nếu cần.

Phương thức này sẽ trả về ngay Statement đầu tiên trong response_list. Phương thức này có tốc độ phản hồi nhanh nhưng độ chuẩn không được cao.

*Phương thức 2*: 

`chatterbot.response_selection.get_most_frequent_response(input_statement, response_list, storage=None)	`

Phương thức này sẽ lựa chọn ra Phản hồi có tần suất xuất hiện lớn nhất trong tập response list. Phương thức này, mang lại kết quả khá tốt, nhưng hiệu xuất thì không tốt bằng phương pháp trước.

*Phương thức 3*:

`chatterbot.response_selection.get_random_response(input_statement, response_list, storage=None)`

Phương thức này sẽ lấy ngẫu nhiên Phản hồi trong response list đã cung cấp. Phương thức này sẽ đảm bảo độ đa dạng của Phản hồi. Nhưng đôi khi phản hồi sẽ không tốt do tất cả chỉ là ngẫu nhiên.

3 phương thức trên đã được xây dựng sẳn  trong  thư viện rồi. Ngoài ra, chúng ta có thể tự định nghĩa cho mình một Phương thức phản hồi bằng cách tự define thuật toàn lấy Phản hồi từ response_list. Với 2 tham số  (một là ***statement*** và hai là một ***statementlist***)

```
def select_response(statement, statement_list, storage=None):
 
    return statement_list[-1]
```

## Cài đặt response selection method

Để đặt response selection method cho chat bot của bạn, bạn sẽ cần truyền thêm tham số ***responseselectionmethod*** cho chat bot của mình khi khởi tạo nó. Ví dụ:

```
from chatterbot import ChatBot
from chatterbot.response_selection import get_most_frequent_response
 
chatbot = ChatBot(
    # ...
    response_selection_method=get_most_frequent_response
)

```

Trong trường hợp, logic adapter đã được khởi tạo thì có thể sử dụng method sau dể truyền  tham số response selection method cho nó có thể được gọi bằng cách sử dụng ***self.selectresponse*** như sau:

```
response = self.select_response(
    input_statement,
    list_of_response_options,
    self.chatbot.storage
)
```

## Lựa chọn một response từ nhiều logic adapter

Trong trường hợp chatbot của bạn sử dụng nhiều logic adapter thì sẽ có nhiều phản hồi được trả về. Vì vậy, việc lựa chọn sử dụng cái nào là rất quan trọng.

Phương thức ***generateresponse*** được sử dụng để chọn ra một response duy nhất từ nhiều response được trả về bởi tất cả các logic adapter có trong chat bot đó. Mỗi response được trả về bởi các logic adapter được kèm theo với một giá trị confidence cho biết returned statement đó có là một valid response cho input statement hay không, giá trị confidence nằm trong khoảng từ 0 → 1.

### Lựa chọn response

generate_response sẽ trả về response statement có giá trị confidence cao nhất. Ngoại lệ duy nhất là trường hợp nhiều logic adapter trả về cùng một response thì response đó sẽ được xem là response statement có confidence cao nhất và nó sẽ được ưu tiên trả về.

Trong ví dụ này, hãy xem xét một kịch bản trong đó việc sử dụng nhiều logic adapter. Giả sử các kết quả sau được trả về bởi các logic adapter của chat bot.

![](https://images.viblo.asia/5872c806-19d1-4aeb-b7da-dfed2a05860b.png)

Trong trường hợp này, hai trong số ba logic adapter đã tạo ra kết quả giống nhau. Khi nhiều logic adapter cho ra cùng một response, thì response đó được **ưu tiên** hơn response còn lại với confidence cao hơn. Thực tế việc nhiều adapter cùng cho ra một response là một chỉ số quan trọng cho thấy một statement cụ thể có xác suất cao nó chính là response cho input. Trong trường hợp này output là "*Chào buổi sáng*" vì nó được 2 logic adapter trả về.

Có thể chỉ định logic adapter cho bot của bạn sử dụng bằng cách đặt thêm tham số logic_adapters là một list chứa các string là đường dẫn Import đến logic adapter mà bạn muốn sử dụng.
```

chatbot = ChatBot(
    "My ChatterBot",
    logic_adapters=[
        "chatterbot.logic.BestMatch",
        ...
    ]
)

```
Nếu nhiều logic adapter được sử dụng, thì bot sẽ trả về response có confidence (độ tin cậy) cao nhất. Nếu nhiều adapter trả về response có confidence như nhau, thì adapter được import vào tham số logic_adapter trước sẽ được ưu tiên lựa chọn. Tại sao ở đây dùng ***BestMatch*** đầu tiên? sẽ giải thích trong phần sau.

Ví dụ về sử dụng nhiều logic adapter

![](https://images.viblo.asia/1aea7db3-abee-4cab-9393-81d366786d8e.png)


### Best match Adapter

***chatterbot.logic.BestMatch(chatbot, kwargs)***
Logic adapter trả về một response dựa trên các response đã biết với kết quả match gần nhất với input statement.

Paramenters:
* **excluded_words (list)** – Tham số excluded_words là một List bên trong chứa các từ, ngăn cho Logic Adapter trả về các statement chứa bất kì từ nào trong List đó. Ngăn chatbot chửi nhau với người dùng chẳng hạn. Mặc định là None.

BestMatch logic adapter chọn một response dựa trên statement match nhất với statement đã cho.

**Cách nó hoạt động**

Best match adapter sử dụng một hàm để so sánh statement input với các statement đã biết. Khi tìm thấy kết quả match gần nhất với statement input, nó sẽ sử dụng một hàm khác để chọn một trong những response đã biết cho statement đó.


**Cài đặt Tham số**

```
chatbot = ChatBot(
    "My ChatterBot",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            "statement_comparison_function": chatterbot.comparisons.levenshtein_distance,
            "response_selection_method": chatterbot.response_selection.get_first_response
        }
    ]
)
```

**Chú thích**:

Các giá trị `response_selection_method `và `statement_comparison_funtion` có thể là một string của đường dẫn đến hàm hoặc là một hàm có thể gọi được.

xem thêm phần `statement_comparison_function` tại đây để lựa chọn cho phù hợp: [https://chatterbot.readthedocs.io/en/stable/comparisons.html#statement-comparison](https://chatterbot.readthedocs.io/en/stable/comparisons.html#statement-comparison)

## Một số logic adapter mặc định hay ho

**Time Logic Adapter**

`chatterbot.logic.TimeLogicAdapter(chatbot, **kwargs`)

TimeLogicAdapter trả về thời gian hiện tại.

Kwargs:

* ***positive*** (list) – Các câu hỏi liên quan đến thời gian được dùng để nhận diện câu hỏi thời gian. Mặc định là gồm một danh sách các câu tiếng Anh.
* ***negative*** (list) – Các câu hỏi không-liên quan đến thời gian được sử dụng để nhận diện câu hỏi thời gian. Mặc định là gồm một danh sách các câu tiếng Anh.

TimeLogicAdapter nhận diện statement có phải là một câu hỏi hỏi về thời gian hay không. Nếu một matching question được phát hiện, thì một response chứa thời gian hiện tại sẽ được trả về.

```
User: What time is it?
Bot: The current time is 4:45PM.
```

**Mathematical Evaluation Adapter**

`chatterbot.logic.MathematicalEvaluation(chatbot, **kwargs)`

***MathematicalEvaluation Logic Adapter*** parse (phân tích) input để xác định xem người dùng có hỏi một câu hỏi yêu cầu tính toán hay không. Nếu đúng như vậy, phương trình cần tính sẽ được trích xuất từ input và trả về kết quả được tính toán.

Ví dụ:
```
User: ‘What is three plus five?’
Bot: ‘Three plus five equals eight’
```
	
Kwargs:
* language (object) – language mặc định được đặt là chatterbot.languages.ENG cho tiếng Anh.

MathematicalEvaluation logic adapter kiểm tra statement input để xem nó có chứa biểu thức toán học có thể tính toán được hay không. Nếu có, thì nó sẽ trả về một response có chứa kết quả. Adapter này có thể xử lý bất kỳ sự kết hợp nào của các từ ngữ toán học và số.


# Tổng kết
Bài viết đã giới thiệu về logic adapter của chatterbot. Bài viết mới chỉ đi vào lý thuyết và hướng dẫn cơ bản. Trong phần sau sẽ giới thiệu sâu hơn về một số kiến thức liên quan xoay quanh logic adapter. Và sẽ có một con bot nho nhỏ.
Phần này kết thúc tại đây.

Tham khảo thêm tại: [https://chatterbot.readthedocs.io/en/stable/logic/index.html](https://chatterbot.readthedocs.io/en/stable/logic/index.html)