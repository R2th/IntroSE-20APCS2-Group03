Xã hội ngày càng phát triển đồng nghĩ với việc công nghệ cũng phát triển một cách vượt bậc, chúng ta có thể thấy được rằng càng ngày càng có nhiều công trình dự án công nghệ ra mắt với những tính năng thông minh, gần gũi và hiểu với con người,  hỗ trợ rất nhiều cho con người trong những công việc hàng ngày, người ta gọi đó là **AI**, vậy AI là gì ? 

![](https://images.viblo.asia/115d1ec4-32fd-4516-812d-8f77508ac9b4.jpeg)


* AI - Artificial Intelligence hay còn gọi là Trí tuệ nhân tạo là một ngành khoa học, kỹ thuật chế tạo máy móc thông minh, đặc biệt là các chương trình máy tính thông minh.
* AI được thực hiện bằng cách nghiên cứu cách suy nghĩ của con người, cách con người học hỏi, quyết định và làm việc trong khi giải quyết một vấn đề nào đó, và sử dụng những kết quả nghiên cứu này như một nền tảng để phát triển các phần mềm và hệ thống thông minh, từ đó áp dụng vào các mục đích khác nhau trong cuộc sống. Nói một cách dễ hiểu thì AI là việc sử dụng, phân tích các dữ liệu đầu vào nhằm đưa ra sự dự đoán rồi đi đến quyết định cuối cùng.

Những năm gần đây AI đang rất bùng nổ và thịnh hành, thực sự nó vô cùng hot, và bản thân mình cũng rất thích và tình hiểu về lĩnh vực này vậy nên hôm nay chúng ta sẽ cùng nhau đi xây dựng cho mình 1 con trợ lý ảo giống như **Siri** hay **Google assistant** bằng python cực đơn giản chỉ với hơn 50 dòng code nhé :

Let's go:

Đầu tiên chúng ta cần setup các môi trường và cài đặt python trên máy của mình nếu bạn nào đã có sẵn python trong máy thì có thể bỏ qua bước này :
* Hướng dẫn setup : https://realpython.com/installing-python

ok tiếp theo chúng ta cần phải hình dung và chia bài toàn thành các phần nhỏ, hãy thử hình dung xem với 1 con trợ lý ảo thì nó cần phải có những thuộc tính gì nào ? 

1: Là nó phải nghe được

2: Nó phải hiểu được

3: Nó phải đọc được
<hr> 
ok ! bây giờ chúng ta sẽ đi viết chương trình phần nghe của con robot này nhé :

mình tạo ra 1 file có tên là: 

*  Đầu tiên ta cần install thư viện có tên là `speech_recognition`

`pip install speechrecognition`
`pip install pyaudio`


`nghe.py`
 
```python
import speech_recognition #Tên thư viện

robot_ear = speech_recognition.Recognizer() #Khỏi tạo nên 1 cái mà robot có thể nghe được
with speech_recognition.Microphone() as mic: #Ở đây mình sử dụng with để bật cái mic sau khi dùng xong mic sẽ tự tắt
    print("Robot: I'm Listening")
    audio = robot_ear.listen(mic)
 
try:
    you = robot_ear.recognizer_google(audio) #Đây nó sẽ nhận dạng âm thanh
except:
    you = "" # nếu không nói gì hoặc âm thanh không đúng 
    
# ở phần try và except kia để xử lý việc khi bật mic lên mà không nói gì hoặc những âm thanh không đúng nó sẽ sinh ra lỗi và khi có lỗi sẽ hiển thị "" thay vì báo lỗi trên màn hình của bạn.
print("You: " you)
```
<hr>

* để có thể cho con robot có thể nói, hay cách khác là chuyển đổi từ chữ sang lời nói
 được thì chúng ta cần phải tải 1 thư việc để thực hiện điều này :

**Run:**

`pip install pyttsx3`

à hơn nữa trước khi chạy máy tính của bạn phải đảm bảo rằng đã được cài đặt `pip` rồi nhé !

các bạn có thể xem qua cách cài đặt `pip` ở đây. 

https://pypi.org/project/pip/

( nếu bạn nào dùng window mà install pyttsx3 có lỗi thì hãy tham khảo cách fix ngay đây.)

https://stackoverflow.com/questions/52283840/i-cant-install-pyaudio-on-windows-how-to-solve-error-microsoft-visual-c-14

 `noi.py`
 
```python
import pyttsx3
robot_brain = "I can't hear you, try again"

robot_mouth = pyttsx3.init()
robot_mouth.say(robot_brain)
robot_mouth.runAndWait()
```

* đến đây thì khi bạn chạy lệnh `python3 noi.py` thì máy tính của bạn sẽ nói ra câu `"I can't hear you, try again"`

<hr>

`hieu.py`

```python
you = "Hello" # ở đây khi mà chúng ta bắt đầu bằng câu Hello thì robot sẽ kiểm tra các điều kiện bên dưới
#ở đây mình đang fix cứng chút nữa gộp 3 file lại thì sẽ custom lại  

if you == "":
    robot_brain = "I can't hear you, try again"
elif you == "Hello":
    robot_brain: "Hello Python"
elif you == "Today"
    robot_brain: "Thu 6"
else:
    robot_brain = "I'm fine thank you and you"

print(robot_brain)
```  
<hr>

ok và bây h mình sẽ gộp 3 file kia lại với nhau thành 1 nhé :

`robot.rb`

```python
import speech_recognition
import pyttsx3
import datatime import data, datatime

robot_ear = speech_recognition.Recognizer()
robot_mouth = pyttsx3.init()
robot_brain = ""

while True: # cái này để mình và robot giao tiếp liên tục thay vì nói 1 câu chương trình đã kết thúc.
    with speech_recognition.Microphone() as mic:
        print("Robot: I'm Listening")
        audio = robot_ear.listen(mic)
    
    print("Robot:...")
 
    try:
        you = robot_ear.recognizer_google(audio)
    except:
        you = ""

    if you == "":
        robot_brain = "I can't hear you, try again"
    elif "Hello" in you: # in you này thay vì chúng ta nói Hello sẽ trả ra 
    #"Hello python thì nó sẽ kiểm tra là trong câu mà bạn nói có từ Hello hay không ?
        robot_brain: "Hello Python"
    elif "Today" in you:
        today = date.today()
        robot_brain = today.strftime("%B %d, %Y")
    elif "Time" in you:
        now = datetime.today()
        robot_brain = now.strftime("%H hours %M minutes %S seconds")
    elif "goodbye" in you: ## đoạn này khi nói goodbye thì chương trình sẽ tắt thay vì mở liên tục khi ở phía trên
        robot_brain = "Good Bye"
        break
    else:
        robot_brain = "I'm fine thank you and you"

print("Robot:" + robot_brain)
robot_mouth.say(robot_brain)
robot_mouth.runAndWait()

```

Và sau đó bạn chạy file `python3 robot.py` và thử trò chuyện với nó nhé !


Đó như các bạn đã thấy ở trên chúng ta vừa hoàn thành 1 con trợ lý ảo với python mà chỉ với hơn 50 dòng code không quá khó phải không nào, hiện tại ở đây nó chưa được thông minh lắm do mình vẫn còn đang fix cứng code ở 1 số chỗ và content cho nó trả lời cũng chưa nhiều nếu bạn nào muốn nâng cao cho con robot thông minh hơn có thế tham khảo các thư viện sau 
* https://dialogflow.com/
* https://github.com/ChatScript/ChatScript
* https://github.com/facebookresearch/DrQA

Mình cũng mới học python nên có gi mọi người comment để mình học hỏi nhé ! và hẹn các bạn trong các bài viết tiếp theo về python của mình !