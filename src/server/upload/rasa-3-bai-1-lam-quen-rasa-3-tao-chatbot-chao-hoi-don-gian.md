[Rasa](https://rasa.com/docs/rasa/) là framework mã nguồn mở giúp xây dựng chatbot - sử dụng ngôn ngữ lập trình Python.

Có rất nhiều bài giới thiệu về Rasa rồi nên mình không lặp lại nữa.
Mục đích chính của chuỗi bài viết này là chia sẻ lại quá trình thực hành với Rasa 3 của mình, hy vọng có thể giúp ích được một vài bạn đang tập tành tìm hiểu Rasa 3 như mình tiếp cận nhanh hơn.

Lưu ý: Tại thời điểm mình viết bài viết này, với version Rasa mới nhất là 3.3.1 thì Rasa 3 chỉ cài được trên Python version 3.7.x và 3.8.x thôi, cũ hơn hoặc mới hơn đều không được nên các bạn lưu ý chổ version Python này tránh mất thời gian cài đặt lỗi mà không biết do đâu.

## Cài đặt và khởi tạo Rasa 3

*Để chi tiết hơn các bạn có thể xem ở [hướng dẫn chính thống của Rasa cho Windows, Ubuntu, MacOS](https://rasa.com/docs/rasa/installation/installing-rasa-open-source)*

Dưới đây mình sẽ tóm tắt các bước cài đặt trên Windows.

Mở cửa sổ Terminal lên, di chuyển đến thư mục muốn chứa source và thực hiện các bước sau:

**Bước 1: Tạo môi trường ảo**

Mình sẽ tạo 1 môi trường ảo để cài Rasa mục đích là khi thực hành vọc phá cài đặt các thứ sẽ không ảnh hưởng đến các project khác, các bạn thấy không cần thiết có thể bỏ qua bước này.

Mình đặt tên venv mới là venvRasa, thực hiện gõ lệnh sau:
```sql
python -m venv venvRasa
```
Khi này trong source sẽ được sinh ra một thư mục venvRasa, gõ thêm lệnh để trỏ đến venv muốn dùng:
```go
venvRasa\Scripts\activate
```
Kết quả thấy trước lệnh comment có tên venv trong dấu ngoặc đơn như ảnh dưới là đúng nhé
![rasa3venv.png](https://images.viblo.asia/dd1958cf-08df-49e2-afd9-e871a9b1a970.png)

**Bước 2: Cài đặt Rasa 3**

Chỉ cần gõ 1 lệnh duy nhất như sau:
```python
pip install rasa
```
Mặc định sẽ cài đặt version mới nhất, nếu bạn muốn chỉ định version thì thêm version phía sau:
```shell
pip install rasa==3.3.1
```
Đợi hơi lâu nhé.

Sau khi cài đặt xong, kiểm tra version Rasa bằng lệnh:
```shell
rasa --version
```
Kết quả như hình dưới:
![rasa_version.png](https://images.viblo.asia/bbda4a79-7223-4ff1-8117-402ab7742efa.png)

**Bước 3: Khởi tạo một project Rasa mới**

Gõ lệnh:
```shell
rasa init
```
![image.png](https://images.viblo.asia/63ad9b79-10ad-40f1-8b52-2df5730267cc.png)

Sẽ xuất hiện câu hỏi: ?Please enter a path where the project will be created [default: current directory]

Bước này là Rasa yêu cầu chỉ định thư mục tạo project Rasa, nếu muốn tạo ở thư mục khác thì nhập đường dẫn vào, mặc định là tạo ngay thư mục hiện tại. Lưu ý là thư mục tạo cần là thư mục trống vì trước khi khởi tạo rasa sẽ xóa hết các file đang có trong thư mục.

Mình thì muốn tạo trong 1 thư mục con tên rasa3 nên gõ "rasa3" rồi nhấn Enter để tiếp tục.

Do thư mục rasa3 mình chưa tạo sẵn nên Rasa hỏi tiếp là có muốn tạo mới thư mục không? Nhấn Y để xác nhận đồng ý.

Đợi một lúc bạn sẽ thấy Rasa đã tạo xong thư mục "rasa3" trong máy của mình rồi, bước khởi tạo tới đây coi như hoàn thành.

Tiếp đến Rasa sẽ hỏi: ?Do you want to train an initial model?

Mình thì chọn Y để Rasa train sẵn model với các data mặc định, làm vậy để sau khi khởi tạo là có sẵn chatbot để test.

(Nếu bạn thấy không cần thiết thì nhấn "n" và đi tiếp đến phần "Tạo chatbot chào hỏi siêu cơ bản bằng Tiếng Việt" luôn)

Khi train xong Rasa sẽ hỏi: ? Do you want to speak to the trained assistant on the command line?

Mình nhấn Y để tiếp tục.

Đợi 1 lúc sẽ xuất hiện dòng lệnh "Your input ->", hãy test thử các câu chào hỏi bằng Tiếng Anh xem Rasa phản hồi như thế nào nhé
![image.png](https://images.viblo.asia/9c98f31d-9967-4daf-a4e5-edf2d9909026.png)

Để thoát khỏi không gian test bạn gõ /stop và nhấn Enter.

## Tạo chatbot chào hỏi cơ bản siêu đơn giản bằng Tiếng Việt
Mục đích phần này là để làm quen với việc sử dụng rasa train chatbot thôi vì mặc định Rasa đã có train các kịch bản chào hỏi và chào tạm biệt cho chatbot rồi nhưng bằng Tiếng Anh, bây giờ mình sẽ custom lại để Rasa có thể chào hỏi theo Tiếng Việt nhé.
Cấu trúc source Rasa 3 mới tạo sẽ như ảnh dưới:
![rasa_truct.png](https://images.viblo.asia/ab35d80c-5f8d-4655-80bf-d12794caeeb0.png)

Trước mắt, để phục vụ yêu cầu tạo chatbot chào hỏi cơ bản thôi thì chúng ta chỉ quan tâm đến các file trong thư mục data và file domain.yml , các file khác trong các bài chuyên sâu hơn chúng ta sẽ cùng tìm hiểu sau.

**Bước 1: Định nghĩa các ý định trong file  /data/nlu.yml**

File /data/nlu.yml sẽ chứa các ví dụ mẫu để dạy cho bot nhận diện ý định (intent) của người chat.
Ví dụ muốn dạy cho bot: Khi người dùng chat câu "tạm biệt" hoặc "ngủ ngon" thì ý định là tạm biệt kết thúc trò chuyện thì khai báo như sau:
```markdown
nlu:
- intent: goodbye
  examples: |
    - tạm biệt
    - ngủ ngon
```
Bạn càng dạy cho bot nhiều ví dụ thì bot sẽ càng thông minh hơn.

Mặc định trong file nlu có sẵn một vài intent (ý định), mình không cần dùng nên sẽ xóa hết chừa 2 intent là  greet và goodbye thôi.

Tên intent bạn muốn đặt như thế nào cũng được (miễn theo chuẩn đặt tên biến trong python là được), mình thì giữ là greet và goodbye.

Chèn thêm các mẫu câu tương ứng với từng intent như sau:
```markdown
version: "3.1"

nlu:
- intent: greet
  examples: |
    - hey
    - hello
    - hi
    - chào
    - xin chào
    - chào bot
    - có ai ở đó không
    - tôi cần hỗ trợ
    - Chào bạn
    - Chào anh
    - Chào chị
    - Chào buổi sáng
    - Có đó không
    - Rãnh không
    - Ê
    - Hú
    - chào em
    - em ơi, cho anh hỏi
    - bot ơi
    - cho mình hỏi chút

- intent: goodbye
  examples: |
    - bye
    - goodbye
    - g9
    - good night
    - bye bye
    - tạm biệt
    - Hẹn gặp lại
    - Ngủ ngon
    - Chúc ngủ ngon
    - Nói chuyện sau nhé
    - Tôi sẽ liên hệ sau
    - tạm biệt em
    - tạm biệt bot nhá
    - Biến

```
**Bước 2: Định nghĩa các câu trả lời của bot ở file domain.yml**

File domain.yml có tác dụng khai báo các đối tượng và cấu hình chatbot sẽ dùng.

Để phục vụ cho con bot siêu đơn giản trong bài viết này thì mình chỉ quan tâm đến 2 khai báo intents và responses thôi nhé.

**instents** là nơi khai báo các instent bạn đã định nghĩa ở file /data/nlu.yml. Với 2 intent là greet và goodbye mình khai báo như sau:
```markdown
intents:
  - greet
  - goodbye
```
**responses** là nơi khai báo những câu thoại của bot. Để dạy bot chat chào tạm biệt ta định nghĩa như sau:
```html
responses:
  utter_goodbye:
  - text: "Tạm biệt bạn!"
  - text: "Bye!"
```
Trong đoạn khai báo ở trên utter_goodbye là tên của lời nói mà mình dạy bot, bạn muốn đặt như thế nào cũng được (miễn theo chuẩn đặt tên biến trong python là được).

Phần text là nguyên văn lời nói mà bạn muốn bot phản hồi. Để bot có nhiều câu trả lời khác nhau thì bạn khai báo nhiều text khác nhau, bot sẽ nói ngẫu nhiên trong danh sách các câu bạn định nghĩa.

Rasa có hỗ trợ dạy bot nói những câu linh hoạt hơn nhưng bài này mình chỉ dừng ở trả lời theo mẫu câu cụ thể thôi.

Tổng hợp lại mình sẽ có nội dung file domain.yml như sau:
```markdown
version: "3.1"

intents:
  - greet
  - goodbye

responses:
  utter_greet:
  - text: "Xin chào! Tôi có thể giúp gì cho bạn?"
  - text: "Chào bạn! Bạn cần Bot giúp gì không?"
  - text: "Xin chào!\nTôi là Bot, rất hân hạnh được trò chuyện với bạn!"

  utter_goodbye:
  - text: "Bye"
  - text: "Tạm biệt bạn!"
  - text: "Tạm biệt!\nHẹn gặp lại!"

  utter_iamabot:
  - text: "I am a bot, powered by Rasa."

session_config:
  session_expiration_time: 60
  carry_over_slots_to_new_session: true

```
**Bước 3: Chỉ định cách ứng xử của bot trong file /data/rules.yml**

File /data/rules.yml có tác dụng dạy cho bot biết cách phản ứng lại với các lời chat như thế nào.

**intent**: điền tên ý định đã định nghĩa ở file /data/nlu.yml

**action**: điền tên response đã định nghĩa ở file domain.yml.
Ngoài response thì còn có thể điền tên action, trong bài này không dùng nên mình không nói thêm.

Để dạy bot phản ứng khi xác định được người dùng có ý định chào hỏi với intent là greet thì trả lời với response là utter_greet thì mình nhập thông tin trong file /data/rules.yml như sau:
```markdown
rules:
- rule: Chào hỏi
  steps:
  - intent: greet
  - action: utter_greet
```
Tương tự với intent goodbye. Cuối cùng mình có nội dung file /data/rules.yml như sau:
```markdown
version: "3.1"

rules:
- rule: Chào hỏi
  steps:
  - intent: greet
  - action: utter_greet

- rule: Tạm biệt
  steps:
  - intent: goodbye
  - action: utter_goodbye
```
Ngoài chỉ định ứng xử ở rule Rasa còn hỗ trợ dạy cho bot ứng xử linh hoạt và có vẻ thông minh hơn bằng cách định nghĩa các ngữ cảnh ứng xử trong file /data/stories.yml, mình sẽ trình bày trong bài khác cần yêu cầu phức tạp hơn. 

Còn có chỗ config ngôn ngữ ở file config.yml nhưng mình thấy ở bài này chưa cần thiết nên bỏ qua luôn.

Bây giờ công đoạn định nghĩa đã xong, bước tiếp mình yêu cầu Rasa dạy cho chatbot các định nghĩa mình đã nhập và xem thành quả thôi.

**Bước 4: Chạy lệnh train và test kết quả**

Ở cửa sổ Terminal, chuyển vào thư mục chứa source rasa và chạy lệnh sau:
```markdown
rasa train
```
Quá trình train hơi lâu tùy theo cấu hình máy tính của bạn.
Sau khi train xong thì chạy lệnh sau để test kết quả:
```shell
rasa shell
```
Kết quả sẽ như sau:
![image.png](https://images.viblo.asia/b562b2af-1ab9-403b-b36d-f9f96041a56b.png)

Trên đây là 4 bước đơn giản nhất để dạy chatbot Rasa nhận diện ý định của người trò chuyện và trả lời theo văn mẫu. 

Chúc bạn thành công!

Có bạn nào thực hiện theo bài này mà gặp lỗi hoặc có góp ý gì thì comment bên dưới nhé.

## Tài liệu tham khảo:
https://rasa.com/docs/rasa/