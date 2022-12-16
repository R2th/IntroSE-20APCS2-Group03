Tại sao lại là **tạo Linebot 2020 đơn giản** mà không phải là tạo **Linebot đơn giản**, chắc hẳn các bạn cũng đang thắc mắc điều này nhỉ :D

Mình nhấn mạnh 2020 đơn giản vì đó là năm đầu tiên của thập kỷ mới ....

.

.

.

.

.

.

... đùa đấy =)) Thực ra có 2 lý do chính ở đây:

1. Gần đây, mình đang có Task tìm hiểu về LINE Bot. Trong quá trình tìm hiểu, mình thấy rằng các bài chia sẻ trước đây có vẻ đã hơi cũ vì cuối năm ngoái Line đã thông báo cho kế hoạch [update](https://developers.line.biz/en/news/#new-messaging-api-endpoints-for-friend-statistics-2019-07-08) API trong 2020. 
Do đó, mình viết bài này để chia sẻ cũng như note lại kiến thức khi cần. Và nhấn mạnh 2020 để phân biệt với các bài chia sẻ cũ hơn mà thôi :D

2. Điều thứ hai là với sự phát triển vượt bậc của Artificial Intelligence - Trí tuệ nhân tạo nói chung và mảng Natural Language Processing  - xử lý ngôn ngữ tự nhiên nói riêng trong những năm gần đây. Thì việc tạo ra Chatbot (có khả năng giao tiếp bằng ngôn ngữ tự nhiên với con người) thực sự dễ dàng hơn bao giờ hết. 2020 rồi, mình cũng nên tìm hiểu vêf lĩnh vực này xem sao nhỉ !?

# I. Bài toán đặt ra

Bài toán của mình là xây dựng 1 LINE Chatbot tự động trả lời các câu hỏi đơn giản của người dùng (FAQ) sau khi kết bạn và nhắn tin thông báo định kỳ cho người dùng (kiểu như là nhắn tin đòi tiền điện, nước hàng tháng thông qua việc gửi tin nhắn trên LINE ấy =))))
Dựa theo các yêu cầu trên, mình cần xử lý các vấn đề sau:

1. Xây dựng hệ thống Chatbot: hệ thống này sẽ giúp trả lời các câu hỏi trong 1 vài ngữ cảnh nhất định của người dùng.
2. Xây dựng Backend: hệ thống này sẽ là trung gian cầu nối liên kết giữa Chatbot nói trên và LINE plattform.

Sau khi xác định được yêu cầu bài toán mình sẽ tiến hành lựa chọn các công nghệ sử dụng. Vì hệ thống cũ đang được phát triển bằng Ruby on Rails, bên cạnh đó RoR cũng là công nghệ mình hay sử dụng nhất nên sẽ không có gì lã khi mình sử dụng:

1. Rails cho backend: Rails là 1 web framework quen thuộc được viết trên ngôn ngữ lập trình Ruby. Mình sử dụng nó để liên kết các thành phần lại với nhau.
2. [Rasa](https://github.com/RasaHQ/rasa) để tạo chatbot: Trong bài này, mình sử dụng RASA NLU - Natural Language Understanding để nhằm phân loại intent từ câu hỏi của người dùng.
3. [LINE Messenger API](https://developers.line.biz/en/docs/messaging-api/overview/#page-title) (LMA): như tiêu đề bài viết, thì chúng ta không thế thiếu thành phần này rồi đúng không? LMA à 1 phần của LINE platform, cho phép chúng ta tương tác trực tiếp với người dùng thông qua tài khoản LINE chính thức, với LMA chúng ta có thể tự động phản hồi tin nhắn của người dùng sau khi tài khoản của họ kết bạn với BOT. Cũng như tự động gửi tin nhắn tương tác sử server LINE Bot tới người dùng bất cứ khi nào. Kiến trúc cơ bản của LMA có thể được mô tả như hình vẽ dưới đây:

![](https://images.viblo.asia/a33668d4-7b57-41d9-882c-06a72661960f.png)

# II. Xây dựng Chatbot với Rasa

Rasa là framework Machine Learning mã nguồn mở hết sức mạnh mẽ giúp tự động xử lý các cuộc hội thoại của con người dựa trên văn bản và giọng nó. Hiểu theo cách đơn giản nhất của mình là khi ta hỏi thì Bot sẽ tự động đưa ra những câu trả lời phù hợp nhất có thể. 

Giờ chúng ta cùng tiến hành xây dựng 1 Chatbot xem sao nhé :D

## 1. Cài đặt môi trường

Để sử dụng Rasa, trước hết chúng ta cần cài Python. Có khá nhiều cách để cài đặt tuy nhiên ở đây, mình sử dụng Conda (cụ thể là Miniconda) để cài môi trường ảo cho Python 1 cách dễ dàng nhất. Các bạn có thể tham khảo cài đặt ở [đây](https://docs.conda.io/en/latest/miniconda.htm). 

```command
## Kiểm tra phiên bản conda
conda --version or conda -V

## Cập nhập conda mới nhất
conda update conda
```

Ở bài viết này mình sử dụng python3.6. Các bước để cài đặt Rasa như sau:

```command
## Tạo virtual envrionment cho python3.6
conda create --name botenv python=3.6

## Activate môi trường để sử dụng
conda activate botenv

## Cài đặt Rasa NLU
pip install rasa_nlu
hoặc Python3 install rasa_nlu

## Cài đặt các packages sử dụng
## spaCy+sklearn (pipeline)
pip install rasa_nlu[spacy]
python3 -m spacy download en
python3 -m spacy download en_core_web_md
python3 -m spacy link en_core_web_md en

##Tensorflow (pipeline)
pip install rasa_nlu[tensorflow]
```

## 2. Khởi tạo Rasa Project

Sau khi setup và cài cắm môi trường xong. Chúng ta tạo Rasa project mới bằng commad như sau:

```command
rasa init --no-prompt
```

`rasa init` sẽ tạo ra giúp chúng ta tạo ra tất cả các file cần thiết của 1 Rasa Project và sẵn sàng `train` - huấn luyện - 1 chú bot đơn giản dựa trên 1 số dữ liệu mẫu. Nếu bạn bỏ flag `--no-prompt` bạn sẽ được hỏi 1 số câu hỏi về cách bạn muốn thiết lập dự án.

Cấu trúc thư mục sau khi `init` như sau:
```
.
├── __init__.py
├── actions.py
├── config.yml
├── credentials.yml
├── data
│   ├── nlu.md
│   └── stories.md
├── domain.yml
├── endpoints.yml
└── models
    └── <timestamp>.tar.gz
```

Để hiểu hơn về ý nghĩa từng file được sinh ra khi gõ câu lệnh trên, các bạn có tham khảo ở [đây](https://rasa.com/docs/rasa/user-guide/rasa-tutorial/#create-a-new-project).  

### Xác định cấu hình Model của bạn

Để sử dụng Rasa cho từng ngôn ngữ 1 cách chính xác nhất, các bạn cần thay đổi config ngôn ngữ trong file `config.yml` cho phù hợp. Ở bài viết này mình sử dụng tiếng Việt, các bạn hoàn toàn có thể thay đổi sang ngôn ngữ khác nếu muốn.
```yml
# Configuration for Rasa NLU.
# https://rasa.com/docs/rasa/nlu/components/
language: vi
pipeline: supervised_embeddings
```

Bắt đầu với những dữ liệu đơn giản bằng tiếng Việt, mình sử dụng pipeline là`supervised_embeddings`. Các bạn có thể tham khảo thử nghiệm các pipeline mà Rasa cung cấp tại [đây](https://rasa.com/docs/rasa/nlu/choosing-a-pipeline/#choosing-a-pipeline)

### Xây dựng dữ liệu training NLU 

Phần đầu tiên của 1 Rasa Bot là NLU Model. NLU là viết tắt của Natural Language Understanding, có nghĩa là biến các thông điệp của người dùng thành dữ liệu có cấu trúc. Để làm điều này với Rasa NLU, chúng ta chỉ cần thêm các ví dụ `training` mô tả các thông điệp của người dùng 1 cách càng chi tiết càng tốt, sau đó train model để thêm các dữ liệu đó.

Dưới đây là 1 số ví dụ về dữ liệu của Rasa NLU. Dữ liệu này được viết trong file `data/nlu.md`

```
## intent:greet
- xin chào
- chào bạn
- hello
- hey boy

## intent:ask_name
- bạn tên là gì?
- em tên là gì?
- tên gì?
- bạn tên là gì nhỉ?
```

Trong đó:
- `## intent:greet` là những điều bạn **dự đoán** người dùng sẽ thực hiện khi chat với bot, ví dụ cơ bản nhất ở đây là greet (chào hỏi), đương nhiên rồi, cũng như con người khi mới gặp nhau thì chào hỏi nên là việc đầu tiên cần làm nhỉ?

- các gạch đầu dòng bên dưới mỗi `intent` sẽ là các mẫu câu cụ thể để diễn đạt cho `intent` đó. Ví dụ cùng 1 `intent:greet` thì thực tế mỗi người đều có cách nói nhất định. Có thể là *xin chào, chào bạn, bạn gì ơi, hello* ....

*Note: Chúng ta định nghĩa càng nhiều mẫu câu trong mỗi intent thì kết quả thu được khi giao tiếp với bot càng hiệu quả nhé :D*.

### Xây dựng câu chuyện tình huống

Ở phần này, chúng ta sẽ định nghĩa cho Bot hiểu những câu chuyện tình huống có thể xảy ra. Các định nghĩa này được viết trong file `data/stories.md`

```
## greeting 1
* greet
  - utter_greet
* ask_name
  - utter_ask_name
* ask_old
  - utter_ask_old
* bye
  - utter_bye

## ask 1
* ask_name
  - utter_ask_name
* ask_old
  - utter_ask_old
* ask_fine
  - utter_ask_fine
```

Như ví dụ ở trên là định nghĩa 1 đoạn chat cơ bản giữa người và máy. 
> Người chào -> máy chào lại -> người hỏi tên -> máy trả lời -> người tạm biệt -> máy tạm biệt

Giải thích các thành phần 1 chút:

- `* greet`:  ứng với `intent` mà bạn define ở phía trên
- `utter_greet`: sẽ là câu trả lời của bot, sẽ được mình giới thiệu ở phía dưới

*Note: cũng tương tự như việc xây dựng dữ liệu training NLU ở phía trên, việc xây dựng các câu chuyện (Stories) càng chi tiết bao nhiêu thì Bot của bạn sẽ càng thông minh bấy nhiêu*

### Xây dựng câu trả lời

Với Rasa thì các câu phản hồi của bot sẽ được viết trong file `domain.yml`.  1 ví dụ về `domain` như sau

```
intents:
  - greet
  - bye
  - ask_name
  - thanks

actions:
- utter_greet
- utter_bye
- utter_ask_name
- utter_thanks

templates:
  utter_greet:
  - text: "Hihi, chào bạn!"

  utter_ask_name:
  - text: "Mình là Bot, rất vui được làm quen với bạn :)"
    image: "https://i.imgur.com/nGF1K8f.jpg"

  utter_bye:
    - text: "Chào bạn, hẹn gặp lại!"
    - text: "BB"

  utter_thanks:
    - text: "Hổng có gì, cảm ơn bạn"
    - text: "Cảm ơn bạn rất nhiều"

session_config:
  session_expiration_time: 60
  carry_over_slots_to_new_session: true

```

Cấu trúc cơ bản nhất của 1 `domain.yml` gồm:
- intents: những điều bạn mong đợi người dùng nói
- actions: những điều Bot có thể làm và nói
- templates: nội dung những điều mà Bot có thể nói

Ngoài ra còn có những khải báo khác như `entities`, `slots`,  `session_config`. Những điều này chúng ta có thể tìm hiểu sau và sâu hơn ở trên Docs của Rasa.

### Chạy thử bot

Về cơ bản chúng ta đã tạo xong 1 em chatbot đơn giản. Giờ là lúc là chúng ta đi đu đi đưa với em nó :D
```
## training dữ liệu cho bot
rasa train

## nói chuyện thử với bot
rasa shell
```
 Dưới đây là 1 vài đoạn chat giữa mình và Bot sau khi bật `shell`
 
![](https://images.viblo.asia/5edccaf9-dea5-4cc1-98a2-e44e08bf62c2.png)

### HTTP API với Rasa
```
## bật server Rasa cho model bạn đã train ở trên xong
rasa run
```

Sau khi bật server Rasa chúng ta hoàn toàn có thể gọi request HTTP đến chatbot để lấy dữ liệu câu trả lời của bot về. Ví dụ

![](https://images.viblo.asia/99db2819-4de3-400c-b5b1-47ae2a02ab93.png)

*Note: Rasa-bot có thể dễ dàng triển khai trên nhiều nền tảng nhắn tin thực như Facebook Messenger, Slack, Telegram, Twillion ... chỉ bẳng cách cùng cấp config trong `credentials.yml`, chi tiết các bạn có thể xem ở [đây](https://rasa.com/docs/rasa/user-guide/messaging-and-voice-channels/)*

### Deploy chatbot

Để sử dụng được Chatbot vừa tạo ở trên, chúng ta cần pulic endpoint trên lên internet. Có nhiều cách khác nhau, như dựng server riêng rồi dùng docker, dùng cloud ... Tuy nhiên những cách này thường mất thời gian và đôi khi chúng ta không có đủ điều kiện để thực hiện. 

Nhưng thật may chúng ta có thể dùng Ngrok để deploy chatbot. Về cách cài cắm cũng như sử dụng Ngrok, các bạn hoàn toàn có thể  tìm hiểu trên mạng nha. 

```
 ngrok http 5005; rasa run
```

Sau khi chạy command trên chúng ta sẽ có Ngrok URL được public lên internet dạng như sau: https:// — — — .ngrok.io

# ... Còn tiếp ...

Phần tới mình sẽ giới thiệu về cách triển khai Rails Backend và LINE Messenger API và cách giao tiếp với Chatbot được viết ở trên. Cũng như source code để các bạn tham khảo.

Cảm ơn các bạn vì đã đọc đến đây nhiều nhiều ^^