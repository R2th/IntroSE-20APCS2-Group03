# **1.Giới thiệu**
ChatterBot là một thư viện của Python giúp chúng ta dễ dàng tạo các phản hồi tự động cho đầu vào của người dùng. ChatterBot sử dụng các thuật toán **machine learning** để xử lý dữ liệu với nhiều ngữ cảnh khác nhau. Điều này giúp các nhà phát triển dễ dàng tạo ra các bot trò chuyện và tự động hóa các cuộc hội thoại với người dùng. Để biết thêm chi tiết mọi người có thể đọc thêm tài liệu về [ChatterBot](https://chatterbot.readthedocs.io/en/stable/) ở trên trang chủ của nó.

**Đây là 1 ví dụ đơn giản về 1 bot:**
```
user: Good morning! How are you doing?
bot:  I am doing very well, thank you for asking.
user: You're welcome.
bot:  Do you like hats?
```
    
# **2.Cài đặt**
* **Install Pip**

    Pip là một Package manager để bạn có thể cài đặt các Python package trong môi trường phát triển của bạn chỉ với một dòng lệnh pip install <tên package>.

    **Advanced Package Tool (Python 2.x)**

    ```
    sudo apt-get install python-pip
    ```
    **Advanced Package Tool (Python 3.x)**

    ```
    sudo apt-get install python3-pip
    ```

* **Install Virtual Environment**
    ```
    $ pip install virtualenv
    ```

* **Tạo Virtual Environment**
    ```
    virtualenv -p python3 ~/chatbot
    ```
* **Khởi động Virtual Environment**
    ```
    source ~/chatbot/bin/activate
    ```
* **install chatterbot**
    ```
    pip install chatterbot
    ```
* **Checking the version of ChatterBot that you have installed**
    ```
    python -m chatterbot --version
    ```
 * **Checking the version of ChatterBot that you have installed**
    ```
    pip install chatterbot --upgrade
    ```
# **3.Cách thức hoạt động của ChatterBot**

![](https://images.viblo.asia/e19f7d97-5272-4562-8e30-75849d54c94f.png)
# **4.Tạo chatbot**
```
from chatterbot import ChatBot
chatbot = ChatBot("Transporter")
```

Bạn có thể đặt bất cứ tên nào bạn thích, ở đây mình đặt là Transporter (mình là fan của Jason Statham) :D

# **5.Huấn luyện chatbot**
Tùy thuộc vào mục đích việc xây dựng chatbot các bạn có thể thu thập dữ liệu theo các cách khác nhau tùy thuộc vào từng chủ đề khác nhau. Dưới đây là một mẫu ví dụ cho một chatbot được sử dụng thông tin về  các câu chào hỏi:
```
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
```

Chúng ta sẽ sử dụng thư viện **chatterbot**  để giúp cho việc training này trở nên đơn giản hơn như sau:
```
chatbot.set_trainer(ListTrainer)

chatbot.train(conversation)
```

Các bạn sẽ đợi cho đến khi chatbot training xong. Tùy thuộc vào tập dữ liệu của các bạn lớn hay nhỏ mà thời gian training cũng tăng lên tương ứng.

ChatterBot cũng hỗ trợ sẵn các kho dữ liệu (corpus data) để phục vụ cho việc training , nếu bạn muốn training theo corpus data thì như sau:
```
from chatbot import chatbot
from chatterbot.trainers import ChatterBotCorpusTrainer

trainer = ChatterBotCorpusTrainer(chatbot)

trainer.train(
    "chatterbot.corpus.english"
)
```

Hoặc training 1 file do chúng ta tự tạo:
```
trainer.train(
    "./data/greetings_corpus/custom.corpus.json",
    "./data/my_corpus/"
)
```

Sau khi training xong chatbot sẽ tự động lưu vào file **db.sqlite3**. Các bạn có thê lưu trữ lại file này để sử dụng trong các trường hợp khác nhau
# **6.Test chatbot**
```
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer

# Create a new chat bot named Transporter
chatbot = ChatBot("Transporter")

# Create a new trainer for the chatbot
chatbot.set_trainer(ListTrainer)

conversation = [
    "Hello",
    "Hi there!",
    "How are you doing?",
    "I'm doing great.",
    "That is good to hear",
    "Thank you.",
    "You're welcome."
]

# Training
chatbot.train(conversation)

# Get a response to the input text 'Good morning!'
response = chatbot.get_response("Good morning!")

print(response)
```

Kết quả:
```
List Trainer: [####################] 100%
I'm doing great.
```

Database:

![](https://images.viblo.asia/60fc488c-debb-4370-b4b6-b18c322837f2.png)

Thật thú vị phải không anh em, hy vọng với bài viết này demo nhỏ này, chúng ta có thể tự phát triển cho mình một  em chatbox để tâm sự mỗi ngày nhỉ! :D

Link tham khảo:

[chatterbot](https://chatterbot.readthedocs.io/en/stable/quickstart.html)

[stackoverflow](https://stackoverflow.com/questions/tagged/chatterbot)