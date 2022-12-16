## Mở đầu

Mình đang cố làm một em chatbot học từ lời thoại phim tiếng việt. Mình dùng encoder-decoder LSTM implement bằng Tensorflow đã ok map đúng lời thoại. Mình đang cho train với full lời thoại khoảng hơn 6000 câu thoại, khá lâu hiện tại vẫn chưa xong (đã hơn 1 ngày). Cũng có thể do model của mình chưa được tốt. Nhưng loss vẫn đang giảm và chắc là được thôi :D .Mình sẽ giới thiệu trong các bài tiếp theo. Trong lúc chờ đợi thì mình dịch một blog viết về chatbot khá hay.

## Deep learning cho chatbot

Chatbots còn được gọi là  Conversational Agents  hay Dialog Systems, đang là chủ đề nóng. Microsoft đang tạo [big bets](http://www.bloomberg.com/features/2016-microsoft-future-ai-chatbots/)  chatbot, và tương tự với các công ty facebook(M), Apple(Siri), Google, WeChat, Slack. Có nhiều startup đang thay đổi cách giao tiếp người tiêu dùng với dịch vụ của họ bằng cách tạo ra các ứng dụng giống như [Operator](https://operator.com/) hay [x.ai](https://x.ai/), hay các nền tảng như [Chatfuel](http://chatfuel.com/), và các thư viện bot như [Howdy’s Botkit](http://howdy.ai/botkit/). Microsoft cũng đang released [bot developer framework](https://dev.botframework.com/) của  họ. Rất nhiều công ty đang hi vọng phát triển bot có thể giao tiếp tự nhiên như con người và nhiều rất nhiều tuyên bố sử dụng NLP (Natual language proccessing - xử lý ngôn ngữ tự nhiên) hay kĩ thuật Deep learning để tạo ra bot có khả năng trên. Nhưng với tất cả đều là thổi phồng xung quanh AI, nói ra sự thật từ viễn tưởng thỉnh thoảng rất khó khăn. Trong series này. Tôi muốn sẽ đi trình bày một vài kĩ thuật Deep Learning được sử dụng để tạo ra conversational agents (Chatbot), bắt đầu từ việc giải thích chúng ta đang ở đâu bây giờ, cái gì có thể, và cái gì gần như không thể trong thời gian gần. Chúng ta sẽ tạo chatbot chi tiết trong các bài viết tiếp theo.

### Phân loại

**Retrieval-Based vs Generative Models.** 

**Retrieval-Based (dễ hơn):** 

Sử dụng một kho được định nghĩa trước các câu trả lời và một vài thuật toán tìm kiếm để chọn ra câu trả lời thích hợp từ đầu vào (câu thoại trước hay câu hỏi) và ngữ cảnh (đang tán tỉnh hay hỏi về sản phẩm điện thoại, ...). Thuật toán tìm kiếm có thể đơn giản như là sử dụng các luật , hoặc phức tạp như là kết hợp một vài thuật toán phân lớp machine learning. Những hệ thống này không thể tạo ra bất kỳ từ mới, chúng chỉ lấy một số câu phản hồi (câu trả lời response) từ một tập có sẵn. 

**Generative model (khó hơn):**

Không định nghĩa trước câu trả lời. Chúng tự tạo ra câu trả lời (from scratch). Generative models tạo ra dựa trên kĩ thuật machine translation, nhưng thay vì chuyển từ ngôn ngữ này sang ngôn ngữ kia, chúng chuyển từ câu thoại này sang câu thoại kia. ![](http://35.196.17.90/blog/wp-content/uploads/2018/12/nct-seq2seq.png) 

Tất cả các phương pháp đều có ưu nhược điểm. Dùng kho dữ liệu được tạo bằng tay như retrieval-based không tạo ra các lỗi cú pháp. Tuy nhiên chúng không thể trả lời các trường hợp chưa nhìn thấy bao giờ cái mà không thích hợp với các câu trả lời đã định nghĩa trước. Vì nhiều lý do, những models này không biết thông tin đối tượng giống như tên được nhắc tới trong hội thoại. Generative models thông minh hơn. Chúng có thể truy xuất thông tin đối từ từ input và phản hồi ấn tượng như bạn đang nói chuyện với con người. Tuy nhiên, những models này thì khó để train, và hay mắc lỗi cú pháp (đặc biệt là câu hội thoại dài), và cần rất nhiều dữ liệu để train. Deep learning có thể được sử dụng cho cả hai loại trên retrieval-based hay generative models, nhưng nghiên cứu thường nhắm tới hướng generative. Kiến trúc deep learning giống như Sequence to Sequence (mình ví dụ dịch tiếng anh sang việt, text to speech, speech to text hay chatbot này) là phù hợp cho tạo ra câu văn và các nhà nhiên cứu hi vọng sẽ có những tiến bộ nhanh trong lĩnh vực này. Tuy nhiên, chúng ta vẫn ở giai đoạn bắt đầu của việc tạo ra generative models giao tiếp hợp lý. Các hệ thống được sử dụng hiện tại thường là retrieval-based.

### Long vs Short Conversations

Đoạn hội thoại dài khó tự động hóa. **Short-text Conversation** sẽ dễ hơn khi mục đích là câu trả lời đơn từ câu đầu vào đơn. Ví dụ, bạn nhận được một câu hỏi từ một người dùng và trả lời với một câu trả lời thích hợp. **Long conversations** khó hơn, bạn sẽ có nhiều lượt hỏi đáp qua lại và bạn cần phải giữ được thông tin đã nói. Các hệ thống giao tiếp hỗ trợ khách hàng là ví dụ về long conversational với nhiều câu hỏi.

### Open Domain vs. Closed Domain

Open domain (khó hơn), người dùng có thể tạo cuộc hội thoại bất kỳ lĩnh vực nào. Không cần thiết phải định nghĩa trước mục tiêu hay ý định.  Các cuộc trò chuyện trên các trang mạng xã hội như twitter và reddit là các ví dụ điển hình cho open domain. Chúng có thể đi qua các chủ đề khác nhau. Có vô hạn các chủ đề với nhiều hiểu biết được yêu cầu để tạo ra câu trả lời hợp lý, đây là một vấn đề khó khăn. 

**Closed domain (dễ hơn),** 
Giới hạn câu đầu vào và câu trả lời bởi vì hệ thống muốn hoàn thành một nhiệm vụ cụ thể. Hệ thống hỗ trợ khách hàng hay trợ lý bán hàng là các ví dụ cho closed domain. Những hệ thống này không cần phải nói về chính trị, chúng chỉ cần hoàn thành các nhiệm vụ cụ thể hiệu quả nhất có thể. Chắc chắn rồi, người dùng vẫn có thể tạo các cuộc hội thoại ở bất kỳ đâu họ muốn, nhưng hệ thống sẽ không cần phải xử lý tất cả các trường hợp và người dùng cũng không mong mỏi điều đó.

### Các thử thách thường gặp

Có một số thử thách rõ ràng và không rõ ràng khi tạo một conversational agents hầu hết chúng là lĩnh vực đang được nghiên cứu.

**Incorporating Context**

Để tạo ra câu trả lời có ý nghĩa, hệ thống cần kết hợp cả ngôn ngữ học và ngữ cảnh vật lý ( _linguistic context_ and _physical context),_ Trong các cuộc hội thoại dài con người sẽ lưu lại những gì đã nói và những thông tin đã trao đổi. Đây là một ví dụ về ngôn ngữ học. Hầu hết các cách tiếp cận thường thấy là chuyển cuộc hội thoại thành một vector, nhưng đối với một cuộc thoại dài là một thử thách. Kinh nghiệm trong việc tạo ra một [End-To-End Dialogue Systems Using Generative Hierarchical Neural Network Models](http://arxiv.org/abs/1507.04808) và [Attention with Intention for a Neural Network Conversation Model](http://arxiv.org/abs/1510.08565) cả hai đều theo hướng này. Các thông tin như ngày giờ, địa điểm, hay thông tin về người dùng cũng là những thông tin cần thiết

**Coheret Personality** 

Khi tạo ra các câu trả lời, máy cần phải trả lời một cách thống nhất với các câu đầu vào giống nhau. Ví dụ, bạn muốn lấy cùng một câu trả lời cho "How old are you?" và "What is your age?". Điều này nghe thì đơn giản, nhưng kết hợp với hiểu biết cố định hay cá nhân và trong model là một vấn đề cần nghiên cứu nhiều. Rất nhiều hệ thống học tạo các câu trả lời đúng về ngữ nghĩa, nhưng chúng không được train từ cùng một nguồn thống nhất. Bởi vì  họ train dữ liệu từ nhiều người dùng khác nhau. Model giống như  [A Persona-Based Neural Conversation Model](http://arxiv.org/abs/1603.06155) là bước đầu tiên của hướng này về explicitly modeling a personality. 

**Đánh giá model** 

Có nhiều cách để đánh giá cuộc hội thoại của máy bởi các thang đo hoặc không, nó có hoàn thành nhiệm vụ, ví dụ giải quyết vấn đề hỗ trợ khách hàng, trong một cuộc hội thoại. Việc đánh giá cuộc hội thoại là đắt đỏ bởi vì cần ý kiến đánh giá của con người. Thỉnh thoảng không có một mục đích tốt được định nghĩa trước như trong trường hợp với open-domain models. Các thang đo thông thường như  [BLEU](https://en.wikipedia.org/wiki/BLEU) cái mà được sử dụng trong machine traslation và được dựa trên text maching là không phù hợp bởi vì độ hợp lý của câu trả lời có thể chứa các từ hay cụm từ khác nhau. Sự thật, trong [How NOT To Evaluate Your Dialogue System: An Empirical Study of Unsupervised Evaluation Metrics for Dialogue Response Generation](http://arxiv.org/abs/1603.08023) các nhà nghiên cứu đã tìm ra không có thang đo thông thường nào tương đương với ý kiến đánh giá của con người. 

**Intention and Diversity (chủ định và đa dạng)**

Một vấn đề nữa với generative systems là chúng hay trả lời các câu như "That's great!" hay "I dont't know" nó được tạo ra bởi rất nhiều trường hợp đầu vào. Một số phiên bản đầu của Google's Smart thường trả lời với "I love you" với bất cứ thứ gì. Một số nghiên cứu đã thử làm đa dạng các hàm mục tiêu khác nhau, tuy nhiên con người thường tạo ra nhiều câu trả lời với cùng một câu đầu vào cụ thể và mang theo chủ định của họ. Bởi vì generative systems (đặc biệt là open domain systems) không được train với ý định cụ thể, đây là loại đa dạng.

### Chatbots đã hoạt động tốt đến đâu?

Lấy tất cả các khía cạnh nghiên cứu ở thời điểm hiện tại,  chatbot đã đi tới đâu? Cùng nhau xem lại các loại chatbot. Một retrieval-based open domain là không thể bởi vì bạn không bao giờ có thể tạo bằng tay đủ các câu trả lời có thể cover tất cả các trường hợp. Một hệ thống generate open domain thì là cả trí tuệ nhân tạo rộng lớn bởi vì nó cần xử lý tất cả các kịch bản có thể. Chúng ta còn cách rất xa (nhưng một số nhà nghiên cứu đang đi theo lĩnh vực này). Chúng ta quay lại với vấn đề restricted domains cả phương pháp generative và retrieval based đều thích hợp. Trong một [buổi phỏng vấn gần đây](http://www.seattletimes.com/business/baidu-research-chief-andrew-ng-fixed-on-self-taught-computers-self-driving-cars/), Andrew Ng, bây giờ là chuyên gia chính của Baidu, đã nói:

> Most of the value of deep learning today is in narrow domains where you can get a lot of data. Here’s one example of something it cannot do: have a meaningful conversation. There are demos, and if you cherry-pick the conversation, it looks like it’s having a meaningful conversation, but if you actually try it yourself, it quickly goes off the rails.

Mình tạm dịch là hầu hết giá trị deep learning ngày nay là các lĩnh vực hẹp, nơi bạn có thể lấy rất nhiều dữ liệu. Dây là một ví dụ về vài thứ nó không làm được: như có một cuộc hội thoại có nghĩa. Có rất nhiều demo và nếu bạn chọn ngẫu nhiên một số cuộc hội thoại, nó trông nhữ có ý nghĩa, nhưng nếu bạn thực sự thử nó thì bạn sẽ nhanh chóng nhận ra chúng trật khỏi đường ray. Rất nhiều công ty bắt đầu với việc gia công phần mềm, các cuộc hội thoại với các công nhân và các lời hứa họ có thể tự động nó khi họ thu thập đủ dữ liệu. Điều này có thể xảy ra chỉ nếu họ hướng đến lĩnh vực nhỏ - giống như giao diện chat gọi một Uber. Bất cứ thứ gì có một chút open domain như thư điện tử bán hàng là vượt ra ngoài cái chúng ta có thể làm ở thời điểm hiện tại. Tuy nhiên chúng ta cũng có thể tạo ra các hệ thống trợ lý cho con người, các đề xuất và các câu trả lời đúng. Chúng là khả thi. Lỗi cú pháp trong các hệ thống là rất tốn kém và có thể đánh lạc hướng người dùng. Đó là lý do hầu hết các hệ thống thường sử dụng phương pháp retrieval based chúng thoải mái với lỗi cú pháp và các câu trả lời phản cảm. Nếu các công ty bằng cách nào đó làm bằng tay nhiều dữ liệu sau đó generative models là khả thi. Nhưng họ phải được sự hỗ trợ bởi các kĩ thuật để ngăn chặn chúng không bị đi xuống như  [Microsoft’s Tay.](http://www.businessinsider.com/microsoft-deletes-racist-genocidal-tweets-from-ai-chatbot-tay-2016-3)

## Kết thúc

Nguồn dịch từ [http://Nguồn http://www.wildml.com/2016/04/deep-learning-for-chatbots-part-1-introduction/ ](http://Nguồn http://www.wildml.com/2016/04/deep-learning-for-chatbots-part-1-introduction/) Bài viết từ tháng 4 năm 2016 cũng khá lâu rồi. Chatbot hiện tại có lẽ tiến xa hơn thời điểm viết bài nhiều. Tóm lại, việc sử dụng deep learning để tạo chatbot đã đạt được một số thành tựu, một số khác còn đang nghiên cứu. Các hệ thống hiện tại thường là Retrieval based. Chúng đang hoạt động tốt chỉ trong lĩnh vực nhỏ. Công việc của chúng ta thử tạo ra chatbot của riêng chúng ta. Bài tiếp theo mình sẽ dịch tiếp bài viết về [tạo chatbot retrieval based](https://viblo.asia/p/phan-2-deep-learning-cho-chatbot-tao-mot-retrieval-based-model-chatbot-QpmleEDDlrd). Cám ơn các bạn!