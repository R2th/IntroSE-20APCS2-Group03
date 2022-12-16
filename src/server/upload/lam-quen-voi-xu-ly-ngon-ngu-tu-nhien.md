## 1. Giới thiệu
### 1.1. Ngôn ngữ tự nhiên
Ngôn ngữ tự nhiên có thể hiểu đơn giản là ngôn ngữ mà con người sử dụng để giao tiếp với nhau trong cuộc sống hằng ngày. Nó có thể tồn tại dưới dạng âm thanh, chữ viết, ký hiệu, ... Ngôn ngữ tự nhiên cần được phân biệt với những [ngôn ngữ hình thức](https://vi.wikipedia.org/wiki/Ng%C3%B4n_ng%E1%BB%AF_h%C3%ACnh_th%E1%BB%A9c) điển hình như các ngôn ngữ lập trình.
### 1.2. Xử lý ngôn ngữ tự nhiên
Xử lý ngôn ngữ tự nhiên (Natural Language Procesing - NLP) là một nhánh của [trí tuệ nhân tạo](https://vi.wikipedia.org/wiki/Tr%C3%AD_tu%E1%BB%87_nh%C3%A2n_t%E1%BA%A1o) tập trung vào việc giải quyết các bài toán liên quan tới ngôn ngữ tự nhiên. Đây không phải là một thuật ngữ mới tuy nhiên nó mới chỉ được biết tới rộng rãi hơn trong những năm gần đây do sự phát triển mạnh mẽ của Trí tuệ nhân tạo.
### 1.3. Một số bài toán xử lý ngôn ngữ tự nhiên kinh điển
* **Truy xuất thông tin (Infomation Retrieval - IR):** Trọng tâm của bài toán là giải quyết vấn đề đưa ra những nội dung, thông tin phù hợp nhất với với đầu vào là một câu hỏi của người dùng. Ứng dụng của bài toán có thể kể tới Google Search, Bing Search, ...
* **Dịch máy (Machine Translation):** Đây là bài toán tập trung vào việc dịch thuật tự động để chuyển đổi từ ngôn ngữ này sang một ngôn ngữ khác.
* **Tóm tắt văn bản (Text Summary)**: Mục tiêu của bài toán là từ một văn bản dài có thể thu gọn thành một văn bản ngắn nhưng vẫn giữ được những nội dung cốt lõi, chủ yếu của văn bản.
* **Hệ hỏi đáp (Question Answering - QA):** Là bài toán xây dựng hệ thống có khả năng trả lời các câu hỏi bằng ngôn ngữ tự nhiên.

Ngoài những bài toán kể trên xử lý ngôn ngữ tự nhiên còn có rất nhiều những bài toán khác như: Nhận dạng tiếng nói, nhận dạng chữ viết, hệ thống hội thoại (chatbot), [Sentiment Analysis](https://en.wikipedia.org/wiki/Sentiment_analysis), khai phá dữ liệu (data mining) và phát hiện tri thức, ... Những vấn đề, bài toán mà xử lý ngôn ngữ tự nhiên giải quyết có vai trò, ứng dụng to lớn trong sự phát triển của xã hội.
## 2. Các thuật ngữ cơ bản trong xử lý ngôn ngữ tự nhiên
### 2.1. Corpus
Corpus hiểu một cách đơn giản là các tập hợp dữ liệu văn bản, ngôn ngữ đã được số hóa, nó là các dữ liệu đã được xử lý, nó được dùng để kiểm chứng các quy luật của ngôn ngữ  quá trình phân tích thông kê hay kiểm định giả thuyết thống kê của các mô hình dự đoán.

Tham khảo: [[1]](http://viet.jnlp.org/tai-nguyen-ngon-ngu-tieng-viet/khai-yeu-ve-corpus), [[2]](http://viet.jnlp.org/tai-nguyen-ngon-ngu-tieng-viet/khai-yeu-ve-corpus/chuyen-sau-hon-ve-corpus)
### 2.2. Phân tích hình thái (Morphological analysis)
Trong ngôn ngữ học, hình thái học là môn học xác định, phân tích và miêu tả cấu trúc của hình vị (morpheme) và các đơn vị ý nghĩa khác như từ, phụ tố, từ loại, thanh điệu, hàm ý. Để có thể dễ hiểu ta có thể sử dụng từ vựng để thay thế cho hình vị. Phân tích hình thái trong NLP có thể kể đến các khâu xử lý như:

1. Tách từ (Word segmentation): Đối với một văn bản để xử lý, phân tích được ngôn ngữ thì việc tách từ là vô cùng cần thiết. Để hiểu được một văn bản ta cần hiểu được từng từ trong đoạn văn bản đó. Đối với những ngôn ngữ khác nhau lại có những đặc trưng khác biệt. Lấy ví dụ trong tiếng Anh các từ được phân cách nhau bởi dấu cách, tuy nhiên trong tiếng Thái, tiếng Trung, tiếng Nhật giữa các từ vựng lại không có khoảng trắng đối với tiếng Việt thì khoảng trắng lại chỉ có tác dụng ngăn cách tiếng chứ không phải ngăn cách giữa các từ vì thế việc xử lý tách từ là một công việc quan trọng.
2. Nhận diện riêng
3. Xử lý từ ghép
4. Phục hồi thể nguyên dạng(Lemmantization): Làm trở lại thể nguyên dạng của từ. Đây là việc cần thiết đối với các ngôn ngữ sử dụng hình vị (morpheme) để tạo ra ý nghĩa của từ. Ví dụ trong tiếng Anh sử dụng các phụ tố "s-es", "ed" sau các động từ để biến thể một từ đó đi, tương tự đối với tiếng Nhật. Tuy nhiên trong tiếng Việt lại không sử dụng morpheme để tạo ra ý nghĩa của từ nên công đoạn này không cần thiết.

### 2.3. Phân tích ngữ pháp (Parser)
Một số công việc cần làm khi phân tích ngữ pháp như:
1. Xác định từ loại (Part-of-Speech Tagging): Đối với các từ đã được tách công việc cần làm tiếp theo là gán nhãn xác định từ loại của từ, việc xác định từ loại của từ có vai trò quan trọng để hiểu nghĩa của từ và trong việc phân tích ngữ pháp hay các bước xử lý ngôn ngữ khác vì 1 từ có thể thể hiện dưới nhiều dạng từ loại khác nhau trong những trường hợp khác nhau.
2. Gán nhãn danh giới từ (chunking) để phân biệt đâu là điểm bắt đầu, kết thúc của một cụm từ.
3. Gán nhãn cây cú pháp (parse tree): 
![](https://images.viblo.asia/31e8943a-fb16-4391-820e-74a5b98eda88.PNG)
Việc phân tích ngữ pháp của câu giúp cho việc hiểu ý nghĩa của câu trở nên dễ dàng hơn.
## 3. Kết luận
Trong bài viết này mình giới thiệu khái quát về Xử lý ngôn ngữ tự nhiên và bước đầu làm quen với các thuật ngữ trong xử lý ngôn ngữ tự nhiên. Trong bài viết tiếp theo mình sẽ đề cập thêm một số khái niệm khác của NLP hy vọng có thể giúp những người mới làm quen với xử lý ngôn ngữ tự nhiên dễ dàng hơn trong việc tiếp cận với hướng nghiên cứu này.
### Tham khảo
https://qiita.com/yura/items/6c1481ca652d3d131e47
https://ongxuanhong.wordpress.com/2016/02/05/cac-thuat-ngu-trong-xu-ly-ngon-ngu-tu-nhien/
http://viet.jnlp.org