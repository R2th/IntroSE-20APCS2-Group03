Bài viết nằm trong series [Chatbots are cool. Let's build a chatbot!](https://viblo.asia/s/chatbots-are-cool-lets-build-a-chatbot-OVlYq8dzl8W)

Tuần trước mình có  tham gia vào một dự án của công ty, một trong những nhiệm vụ của mình đó làm ra một trợ lý chatbot, sau một thời gian tìm hiểu và được sự suppor nhiệt tình của anh Phạm Hữu Quang  thì hôm nay mình xin chia sẻ một số kinh nghiệm của mình với RASA - một NLU framework hỗ trợ chúng tôi tạo ra chatbot với mục tiêu giúp các bạn có thể nhanh chóng sử dụng. 
### I. Introduction
**Rasa là một nền tảng chabot bao gồm** : <br> - Natural Language Unit (NLU) <br> - The Rasa Core Dialogue Engine <br> - Rasa X
<br> Trước tiên mình xin giải thích một số thuật ngữ sẽ được nhắc lại nhiều lần trong bài viết này cũng như việc tìm hiểu thêm sau này:
<br> 1. **Rasa NLU** - một thư viện để hiểu ngôn ngữ tự nhiên (NLU) thực hiện phân loại ý định và trích xuất thực thể từ đầu vào của người dùng và giúp bot hiểu những gì người dùng đang nói. 
<br> 2. **Rasa Core**  - một khung chatbot với quản lý hội thoại , lấy đầu vào có cấu trúc từ NLU. NLU và Core là độc lập và người ta có thể sử dụng NLU mà không cần Core, và ngược lại. 
<br>3. **Rasa X** : là một tool giúp chúng ta xây dựng, cải thiện và triển khai model chatbot vừa tạo.
<br>4. **Intent**:  RASA cần biết người dùng muốn gì, vì vậy cần nhận ra ý định của họ. Ví dụ: Người dùng nói rằng : "Tôi muốn đặt bàn cho 2 người tối nay tại nhà hàng ABC" thì intent ở đây là việc đặt bàn. ![](https://images.viblo.asia/0832fd2b-6cbd-4c09-8247-7f19a08fad36.png)


<br>5. **Entity**:  thực thể là để trích xuất thông tin từ đầu vào của người dùng. Như ví dụ ở trên thì entity ở đây chính là thời gian và địa điểm đặt bàn   <br> ![](https://images.viblo.asia/a24680b8-1c3a-4db5-adab-cdb4bcdf42c6.png)


<br> 6. **Stories** : Câu chuyện xác định sự tương tác giữa người dùng và chatbot theo intent và action được thực hiện bởi bot. Giống như trong ví dụ trên, bot có ý định đặt bàn và các thực thể như địa điểm, thời gian và điều đó sẽ thực hiện hành động tiếp theo từ bot.![](https://images.viblo.asia/83942429-dd50-40af-bfad-0e9f997edf70.png)

 <br>7.  **Action**:  Hành động về cơ bản là các hoạt động được thực hiện bởi bot hoặc yêu cầu thêm một số chi tiết để có được tất cả các thực thể hoặc tích hợp với một số API hoặc truy vấn cơ sở dữ liệu để nhận / lưu một số thông tin. ![](https://images.viblo.asia/f4649284-a786-46a4-a35c-aa2d9c31bd6a.png)

### II. Rasa Natural Language Understanding (NLU)
<br> Như  đã tóm tắt về NLU ở trên, chúng ta cần dạy con bot của chúng ta để nó có thể hiểu các thông điệp của chúng ta trước. Vì vậy, chúng tôi phải đào tạo mô hình NLU với các đầu vào ở định dạng văn bản đơn giản và trích xuất dữ liệu có cấu trúc. Chúng ta sẽ đạt được điều này bằng cách xác định intent và cung cấp một vài cách người dùng có thể thể hiện chúng.
Để làm việc này, chúng ta cần hiểu rõ hơn về nlu.md file 
<br> **nlu.md file**  : Nó chứa dữ liệu đào tạo về mặt đầu vào của người dùng cùng với việc ánh xạ các intent và entity có trong mỗi câu.  Nó có thêm các ví dụ khác nhau mà chúng ta cung cấp, giúp cho khả năng  của bot sẽ trở nên tốt hơn. Việc bạn tạo ra  nhiều dữ liệu train và đa dạng cho con bot thì độ chính xác của nó càng cao.Ví dụ: ![](https://images.viblo.asia/1396f665-6cd3-442f-b8ee-5eaab3bac1cd.png)
<br> Trong intent: check_balance có thấy [savings] (source_account) ở đây có nghĩa entity chính là source_account có giá trị là saving. Regex có thể hiểu đơn giản khi entity chúng ta muốn bắt là số điện thoại hay số tài khoản thì có thể xét các các số từ 0-9 và 5 giá trị liên tiếp chẳng hạn. Bạn có thể đọc thêm trên doc của rasa hoặc có thể thử demo theo link dưới đây để hiểu hơn: https://regex101.com/
Và bây giờ bạn có thể bấm " rasa train nlu" để train mô hình nlu với file config bạn có thể để mặc định hoặc chỉnh sửa để phù hợp với yêu cầu của mình ( trong doc của rasa có giải thích rất rõ nhé :) https://rasa.com/docs/rasa/user-guide/rasa-tutorial/
### III.The Rasa Core Dialogue Engine (RASA CORE)
Như mình đã trình bày ở trên thì Rasa NLU và Rasa Core là hai phần độc lập và không liên quan gì tới nhau, bạn có thể sử dụng NLU mà không dùng Core và ngược lại. Mình đã thử làm cả hai hướng như sau: 
<br>1. Sau khi có model được train từ Rasa NLU thì bạn có thể không dùng tới rasa core mà tự viết 1 file python và và gọi tới port http://localhost:5005/model/parse và đơn giản là những câu lệnh if...else và đừng quên phải run nlu server nhé không là không gọi được nó đâu. Theo mình đánh giá thì phương pháp này có độ chính xác rất cao vì khi đó bạn có thể control được mọi thứ nhưng khi số lượng intent quá lớn thì ôi no gẫy tay đấy.
<br> 2. Một cách khác là chúng ta sẽ sài rasa core. Theo mình đánh giá thì  thì nó rất tiện cho người dùng nhưng mà doc của nó thì hơi ngán. Trước tiên là file domail.yml bao gồm: intents, entities, slots và actions. responses. Bạn cần điền đầy đủ thông tin vào file nhé. ![](https://images.viblo.asia/15700549-6843-4347-9227-3e8b20b73ebd.png)
<br> Actions trả về có thể là utter_ hoặc action_ với text là nội dung con bot sẽ trả lời bạn khi nó bắt vào intent và bạn có thể thêm button hoặc image theo responses. Bạn có thể xem ví dụ dưới đây để hiểu rõ hơn: ![](https://images.viblo.asia/a81f0b3f-d458-479f-8038-c77835be424f.png)
<br> Tiếp theo là stories.md <br>![](https://images.viblo.asia/456119d6-7cf5-43bb-a635-b6a31a64209f.png)
<br> Với *greet_happy  chính là intent còn utter_greet_happy là hành động mà bạn định nghĩa con bot sẽ trả lời khi nó bắt được intent đó.
<br>Và Rasa cũng hỗ trợ bạn việc bạn có thể tự custom action của mình trong file action.py . 
<br> Ngoài ra Rasa X còn hỗ trợ bạn việc train model, định nghĩa entities với những trường hợp nó bắt sai intent do trong dữ liệu của bạn chưa đủ. Sau khi set up mọi thứ đã xong bây giờ bạn chỉ cần gõ rasa train rồi sau đó rasa x và tận hưởng thành quả thôi. 
#### Tài liệu tham khảo: 
https://rasa.com/docs/rasa/api/rasa-sdk/
<br>https://medium.com/@itsromiljain/build-a-conversational-chatbot-with-rasa-stack-and-python-rasa-nlu-b79dfbe59491
<br> Cảm ơn các bạn đã theo dõi bài viết của mình, mong nhận được sự góp ý từ tất cả mọi người