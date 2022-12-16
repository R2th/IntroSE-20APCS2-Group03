Rasa là một framework mã nguồn mở giúp bạn có thể build một con chatbot assistant. Nhờ cách tiếp cận theo stories, Rasa chatbot có thể thu thập các thông tin người dùng cung cấp trước đó để hiểu bối cảnh và có một "cuộc hội thoại" đúng nghĩa với người dùng (contextual assistant) thay vì chỉ cung cấp các câu trả lời 1-1 theo kiểu FAQ thông thường, nhờ vậy con chatbot có vẻ "thông minh" và "người" hơn.
> Fun fact: Trong tiếng Phạn, "rasa" có nghĩa đen là "tinh chất hoặc hương vị". Nó dùng để chỉ hương vị thẩm mỹ của các tác phẩm nghệ thuật gợi lên trong người đọc hoặc khán giả những cảm xúc hoặc cảm giác không thể diễn tả được. Nó đề cập đến các hương vị / tinh túy cảm xúc được tác giả tạo ra trong tác phẩm và được thưởng thức bởi một "khán giả nhạy cảm", một người "có trái tim", và có thể kết nối với tác phẩm bằng cảm xúc. 

Nếu bạn đang có ý định xây dựng một con chatbot, mình nghĩ Rasa là một khởi đầu khá tuyệt đấy. Bạn có thể làm quen với Rasa qua một số bài viết trên Viblo như:

[Tâp tành làm RASA CHATBOT](https://viblo.asia/p/tap-tanh-lam-rasa-chatbot-gAm5y8Nwldb)

[Hiểu Rasa qua quy trình xây dựng một chatbot giúp bạn trả lời câu hỏi: "Hôm nay ăn gì?" ](https://viblo.asia/p/hieu-rasa-qua-quy-trinh-xay-dung-mot-chatbot-giup-ban-tra-loi-cau-hoi-hom-nay-an-gi-WAyK8P4pKxX)

Còn trong phạm vi bài viết này, mình muốn giới thiệu về **Retrieval Action** trong Rasa. Nói đơn giản, action là những hành động của con bot thực hiện để phản hồi lại tin nhắn của người dùng. Có 4 loại action:
- Default actions: các action mặc định của Rasa, không cần khai báo trong file domain. VD: action_listen, action_restart, action_default_fallback
- Utterance actions: gửi một tin nhắn cụ thể cho user, tên action bắt đầu bằng utter_
- Custom actions: thực hiện một hoặc một số task cụ thể
- Retrieval actions: một tính năng mới, được đưa vào thử nghiệm. Hãy đọc bài viết này để xem nó là cái gì nhé :wink:
# 1. Retrieval Actions dùng để làm gì?
Retrieval actions được thiết kế để giúp chúng mình xử lý một cách gọn gàng hơn những trường hợp mà bot chỉ cần đưa ra một câu trả lời cố định, không phụ thuộc vào nội dung trò chuyện trước đó (hỏi đáp FAQ, nói chuyện phiếm kiểu hôm nay trời đẹp nhỉ, vv.). Cụ thể, nếu muốn bot có thể trả lời được 100 câu FAQ, thay vì phải có 100 intents, 100 actions và 100 stories khác nhau, ví dụ như thế này:
```
## rasa là gì?
* ask_rasa_intro
   - utter_rasa_intro

### retrieval action là gì?
* ask_retrieval_action_intro
   - utter_retrieval_action_intro

vv.
```
100 intent đó có thể được gộp lại thành 1 intent chung là FAQ và bạn có thể tóm gọn như sau trong file stories.md:
```
## FAQ
* ask_faq
   - respond_faq
```
Còn các example câu hỏi được viết như sau trong file nlu.md:
```
## intent: ask_faq/rasa_intro
- Rasa là gì?
- Tôi muốn biết về Rasa
- Em có thể cho anh thông tin về Rasa không?

## intent: ask_faq/retrieval_action_intro
- retrieval action là gì thế?
- cho tôi biết về retrieval actions
- retrieval action dùng để làm gì
- tại sao lại cần retrieval actions
```
Cần chú ý, các câu trả lời tương ứng với mỗi câu hỏi cần phải được đặt trong một file riêng thay vì file NLU hay khai báo trong domain.yml (ví dụ: responses.md, có thể lưu trong cùng folder với file nlu và stories) 
```
## rasa là gì?
* ask_faq/rasa_intro
    - Rasa là một nền tảng chabot.
    
## retrieval action là gì
* ask_faq/retrieval_action_intro
    - Retrieval action là một dạng action trong Rasa được thiết kế để xử lý các câu hỏi dạng FAQ.
```
*Tips: Nếu khi chạy rasa train mà gặp lỗi này: `No response phrases found for ask_faq/rasa_intro. Check training data files for a possible wrong intent name in NLU/NLG file` thì có thể là do bạn thiếu một comment line ('##') ở cuối file responses đó ^^*

Vậy là giờ khi các câu hỏi đã được gộp chung vào một intent, làm sao để chọn được câu trả lời tương ứng từ danh sách trong file responses? Để làm được điều này, Rasa đã đưa vào một thành phần (component) trong NLU gọi là **ResponseSelector**. Cách thức hoạt động của nó có thể tóm gọn trong hình sau:

![](https://images.viblo.asia/9ebb54c7-d225-40b6-a8b8-4ccb39a4eb8d.png)
Các bước tiến hành:
- Thu thập bag of word cho mỗi message của user và câu response.
- Tính ra embedded representation cho mỗi câu.
- Dùng một hàm tính mức độ tương đồng giữa embedding của user message và response tương ứng.
- Tối đa hóa mức tương đồng giữa những cặp user message - response đúng và tối thiếu hóa mức độ tương đồng của những cặp sai. Đây chính là hàm optimization cho model machine learning khi training.
- Khi user nhập message, hệ thống sẽ so độ tương đồng giữa message này với tất cả các response và đưa ra câu trả lời có mức tương đồng cao nhất. 

Để có thể sử dụng, ResponseSelector cần được khai báo trong file config.yml. Trong pipeline cần khai báo tokenizer, featurizer và intent classifier trước ResponseSelector. Ví dụ:
```
language: "en"

pipeline:
- name: "WhitespaceTokenizer"
  intent_split_symbol: "_"
- name: "CountVectorsFeaturizer"
- name: "EmbeddingIntentClassifier"
- name: "ResponseSelector"
```
Rasa còn support multiple ResponseSelector, tức là bạn có thể dùng các ResponseSelector khác nhau cho mỗi mục đích như FAQ, nói chuyện phiếm. Tuy nhiên đội phát triển cũng chưa ghi nhận được sự cải thiện về độ chính xác khi dùng thêm response selector. Do vậy để cho đơn giản chúng ta vẫn được khuyến nghị là chỉ cần dùng 1 selector thôi. Tuy nhiên nếu bạn có kết quả khác thì hãy trao đổi trên forum của Rasa nhé.

Kết quả:
![](https://images.viblo.asia/ae7e36e8-55e3-416d-9459-366fea6fc2a2.png)

# 2. Pros and Cons
### Pros
- Như đã giới thiệu ở trên, retrieval action giúp làm đơn giản hóa việc handle các đoạn hội thoại kiểu 1 câu hỏi - 1 câu trả lời không có liên quan đến context của những nội dung khác. Thay vì phải khai báo rất nhiều intent và action trong file  domain cũng như luồng hội thoại trong stories, chúng ta chỉ cần khai báo 1 intent, 1 action và 1 story duy nhất, nhờ thế mà story đơn giản hơn rất nhiều. 
- Do số lượng intent giảm đi, con bot của chúng mình sẽ có khả năng phân loại intent tốt hơn, thích hợp với những chatbot kiêm nhiệm nhiều chức năng
- Điểm khác biệt quan trọng giữa response của chatbot cho retrieval action và response thông thường là chính những câu retrieval response cũng được đưa vào làm dữ liệu training, như vậy câu response và cách thiết lập câu response cũng sẽ có tầm quan trọng không nhỏ 
### Cons
- Đây mới chỉ là tính năng thử nghiệm để lấy feedback từ cộng đồng, do đó nó có thể bị thay đổi bất kỳ lúc nào và hiện cũng chưa support Rasa X
- Câu response chỉ có thể ở dạng plain text chứ chưa hỗ trợ slot, hình ảnh hay button, vv. Bạn cũng mới chỉ có thể cung cấp 1 câu response cho mỗi câu hỏi (do mô hình training không support multiple ground truth)
- Một điều cũng đáng nêu ra để cân nhắc là kích cỡ của file model sẽ tăng lên khá đáng kể khi sử dụng retrieval action so với khi không sử dụng (như trường hợp của mình file training data có khoảng 4000 dòng thì khi dùng retrieval action file model nặng gấp đôi :scream: )
- Chưa có cơ chế fallback: nếu message rơi vào intent dùng retrieval action, trong bất cứ trường hợp nào mô hình sẽ lựa chọn 1 response có confidence cao nhất để đưa ra làm câu trả lời, dù nó có sai đi chăng nữa. Cơ chế fallback cho retrieval action vẫn đang được tiếp tục nghiên cứu phát triển, tuy nhiên tùy tính chất của bot thì bạn cũng có thể cân nhắc thêm vào NLU một intent out_of_scope, kiểu như những câu hỏi không liên quan để đưa ra phản hồi phù hợp.

Đây là bài viết trên Viblo đầu tiên của mình, cảm ơn bạn đã đọc. Nếu có gì cần góp ý hoặc trao đổi, rất mong các bạn để lại comment cho mình nhé ^^