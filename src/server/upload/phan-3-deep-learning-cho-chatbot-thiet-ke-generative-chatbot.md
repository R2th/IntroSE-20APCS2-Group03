<h2>Mở đầu</h2>
Ở bài trước chúng ta đã <a href="https://viblo.asia/p/phan-2-deep-learning-cho-chatbot-tao-mot-retrieval-based-model-chatbot-QpmleEDDlrd">tạo ra một retrieval based Chatbot</a>. Lúc đó mình còn phân vân liệu cái encoder-decoder, seq2seq translate này có phải là retrieval based model hay không. Vì mục đích của mình ban đầu là làm sao cho nó map đúng các câu hội thoại là được. Mình muốn nhắc lại cho các chưa xem các bài viết trước. Retrieval based sẽ đánh giá các câu trả lời có tiềm năng và chọn ra câu tốt nhất để trả lời, không từ mới, không câu mới. Generative model tự sinh ra câu trả lời dựa trên câu yêu cầu. Và mình cũng tìm kiếm các cách tạo ra một generative model nhưng đa phần các bài viết đều nói về mô hình encoder-decoder như mình làm. Cũng có thể gọi là generative vì các câu trả lời được sinh ra đúng theo nghĩa đen tuy rằng nó tối nghĩa. Có nghĩa là chúng ta đang đi đúng hướng. Dẫu chatbot được tạo nó chẳng thông minh tẹo nào, nhưng cũng đươc coi là generative model. Và nó có tệ thế nào đi chăng nữa thì ít nhất chúng ta cũng đã thử. Sự lựa chọn tồi tạo nên những câu chuyện đẹp.
<h2>Chatbots với Seq2Seq</h2>
Khi Telegram released <a href="https://core.telegram.org/bots/api">bot API</a>, cung cấp một cách dễ dàng cho các developers, để tạo ra bots bằng cách tương tác với  <a href="https://telegram.me/botfather">Bot Father.</a> Ngay lập tức mọi người bắt đầu tạo ra các abstractions (thư viện) cho nodejs, ruby và python, để tạo bot. Chúng ta (Cộng đồng phần mềm tự do) đã tạo ra một nhóm cho việc tương tác với các bot chúng ta đã tạo được. Tôi đã tạo bằng nodejs có thể trả lời bất kỳ truy vấn để trong dấu nháy (dấu nháy ở đây chắc để đánh dấu cho câu cần truy vấn). Chương trình sử dụng linux utility <a href="https://en.wikipedia.org/wiki/Fortune_(Unix)">fortune,</a> một pseudorandom message generator. Nó thật ngu ngốc. Nhưng rất vui khi nhìn thấy moi người sẵn sàng tương tác với một chương trình, cái mà đã được tạo ra. Một số người tạo ra Hodor bot. Bạn có thể hình dùng được cái mà nó sẽ làm. Sau khi tôi đã gặp các con bot khác nhau, <a href="http://www.mitsuku.com/">Mitsuku</a> cái mà khá thông minh. Nó được viết bằng AIML (Artificial Intelligence Markup Language), một ngôn ngữ dạng XML cho phép lập trình viên viết các luật cho bot. Về cơ bản, bạn viết một PATTERN và một TEMPLATE, giống như khi bot nhận được câu khớp với pattern từ người dùng, nó sẽ trả lời với một templates. Chúng ta gọi loại model này là <strong>Rule based model</strong>. Mô hình dựa theo luật.

Rule based model là cách dễ dàng cho bất kỳ ai có thể tạo ra được bot. Nhưng nó là vô cùng khó khăn khi tạo ra một bot có câu trả lời phức tạp. Pattern sẽ khớp với các kiểu đơn giản và kể từ đó AIML sẽ khó khăn khi chúng gặp phải những câu chưa được định nghĩa. Và nó cũng mất nhiều thời gian và công sức để viết các luật bằng tay. Nếu chúng ta có thể tạo ra một bot có thể học từ các cuộc hội thoại giữa con người. Đây là nơi mà Machine Learning có đất dụng võ.

Chúng ta sẽ cho model tự học từ data, một model thông minh, Intelligent models có thể chia làm hai loại:
<ol>
 	<li><strong>Retrieval-based</strong> models</li>
 	<li><strong>Generative</strong> models</li>
</ol>
Retrieval-based model lấy một câu trả lời trong tập câu trả lời có sẵn. Nó không thể tạo ra bất kỳ câu thoại mới, vì thế chúng ta không cần lo lắng về ngữ pháp. Generate models thông minh hơn. Chúng tạo ra các câu trả lời, word by word. Các câu trả lời được tạo ra có thể có lỗi cú pháp. Những model này khó để train, chúng cũng cần phải học cấu trúc các câu một cách tự động. Tuy nhiên sau khi train, generative model sẽ cho kết quả tốt hơn retrieval-based model trong trường hợp phải xử lý câu mà nó chưa từng gặp và tạp ra một cuộc nói chuyện ấn tượng như con người (có lẽ là trẻ con).

Đọc  <a href="http://www.wildml.com/2016/04/deep-learning-for-chatbots-part-1-introduction/">Deep Learning For Chatbots</a> bởi Denny Britz, anh ta nói về length of conversations, open vs closed domain, các thử thách trong generative model như ngữ cảnh, tính cá nhân, hiểu được ý định của người dùng và làm thế nào để đánh giá được model. Chính là các bài viết trước mình đã dịch các bạn có thể tìm đọc lại.
<h3>Seq2Seq</h3>
Sequence To Sequence model  giới thiệu trong  <a href="http://arxiv.org/abs/1406.1078">Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation</a> sau đó trở thành model cho Dialogue System (Chatbot) và Machine Translation. Nó bao gồm hai RNNs (Recurrent Neural Network): Một Encoder và một Decoder. Encoder lấy một chuỗi (câu) làm input và xử lý các ký tự (các từ) trong mỗi lần. Nhiệm vụ của nó là chuyển một từ thành các vector có cùng kích cỡ, chỉ bao gồm các thông tin cần thiết và bỏ đi các thông tin cần thiết (có vẻ việc này được thực hiện tự động trong quá trình train). Bạn có thể xem flow.

<img class="alignnone size-full wp-image-120" src="http://35.196.17.90/blog/wp-content/uploads/2018/12/encoder-decoder.png" alt="" width="639" height="318" />

Hình ảnh được mượn từ<em> <a href="https://github.com/farizrahman4u/seq2seq">farizrahman4u/seq2seq</a></em>

Mỗi hidden state (Một LSTM - một hình vuông trên ảnh đầu vào sẽ là một từ và một hidden state, đầu ra là hidden state và truyền qua LSTM cell tiếp theo) ảnh hưởng tới hidden state tiếp theo và hidden state cuối cùng có thể được nhìn thấy như là tổng kết của chuỗi. State này được gọi là context hoặc thought vector. Từ context (nghĩa là hidden state cuối cùng), the decoder sẽ tạo ra sequence (là câu trả lời được tạo ra), mỗi một từ một lần. Ở mỗi bước decoder sẽ bị ảnh hưởng bởi từ được tạo ra ở bước trước.

<img class="alignnone size-full wp-image-96" src="http://35.196.17.90/blog/wp-content/uploads/2018/12/nct-seq2seq.png" alt="" width="640" height="193" />

Hình ảnh được mượn từ<em> <a href="http://www.wildml.com/2016/04/deep-learning-for-chatbots-part-1-introduction/">Deep Learning for Chatbots : Part 1</a></em>

Có một vài thử thách khi sử dụng model này. Cái mà phiền nhất là model không thể tự xử lý được chiều dài của câu văn. Nó là một điều phiền phức bởi hầu hết cho các ứng dụng seq2seq. Decoder dùng softmax cho toàn bộ từ vựng, lặp lại với mỗi từ của output. Điều này sẽ làm chậm quá trình train, mặc dù nếu phần cứng của bạn có khả năng xử lý được nó. Việc biểu diễn các từ là rất quan trọng. Bạn biểu diễn từ như thế nào? Sử dụng one-hot vector nghĩa là phải xử lý với vector lớn và one-hot vector không có ý nghĩa cho từ. Chúng ta sẽ phải đối mặt với các thử thách trên, từng cái một.
<h3>Padding</h3>
Trước train, chúng ta sẽ nhìn vào tập dữ liệu để chuyển chiều dài của các câu cho nó giống nhau bằng cách padding. Chúng ta sẽ sử dụng một vài ký tự đặc biệt để thêm vào câu.
<ol>
 	<li><strong>EOS</strong>: End of sentence</li>
 	<li><strong>PAD: </strong>Filler</li>
 	<li><strong>GO: </strong>Start decoding</li>
 	<li><strong>UNK: </strong>Từ không có trong từ điển</li>
</ol>
Các cặp câu query-response như sau:
<pre class="lang:default decode:true ">Q : How are you? 
A : I am fine.</pre>
<h3>Bucketing</h3>
Giới thiệu padding đã giải quyết được vấn đề chiều dài của câu. nhưng trường hợp câu quá dài. Nếu câu dài nhất trong dữ liệu là 100, chúng ta encoder tất cả các câu của chúng ta với chiều dài 100, trường hợp này không mất bất kỳ từ nào. Bây giờ, chuyện gì sẽ xảy ra với từ "How are you?" ? Chúng ta có 97 PAD trong encoderd. Điều này sẽ làm mờ đi thông tin thật của cả câu("How are you").

Bucketing giải quyết được vấn đề này, bằng cách đặt các câu trong các bucket khác kích cỡ. Cân nhắc danh sách sau: [(5, 10), (10, 15), (20, 25), (40, 50)]. Nếu chiều dài câu query là 4 và câu response là 4 chúng ta sẽ đặt vào bucket (5, 10). Query sẽ padded tới 5 ký từ và kết quả là 10. Trong khi run model (khi train và dự đoán), chúng ta sẽ sử dụng một model khác cho mỗi bucket, tương thích với chiều dài của query và response. Tất cả các model sẽ cùng parameter và ví thể function sẽ hoàn toàn giống nhau

Nếu chúng ta sử dụng bucket (5, 10). các câu của chúng ta sẽ được encoded như sau:
<pre class="lang:default decode:true ">Q : [ PAD, “?”, “you”, “are”, “How” ] 
A : [ GO, “I”, “am”, “fine”, “.”, EOS, PAD, PAD, PAD, PAD ]</pre>
<h3>Word Embedding</h3>
Word Embedding là kĩ thuật cho việc biểu diễn các từ một không gian vector có số chiều thấp. Mỗi từ có thể được nhìn thấy như một điểm trong không gian này, biểu diễn bởi chiều dài cố định. Ngữ nghĩa liên quan giữa các từ cũng được lưu giữ bởi kĩ thuật này. Word vectors có những thuộc tính thú vị:
<pre class="lang:default decode:true ">paris – france + poland = warsaw</pre>
khoảng cách giữa paris - france = warsaw - poland

<img class="alignnone size-full wp-image-121" src="http://35.196.17.90/blog/wp-content/uploads/2018/12/word-embedding.png" alt="" width="1552" height="922" />

Hình ảnh được mượn từ <em><a href="https://blog.kaggle.com/2016/05/18/home-depot-product-search-relevance-winners-interview-1st-place-alex-andreas-nurlan/">Home Depot Product Search Relevance, Winners’ Interview</a></em>

Word embedding là thường là lớp đầu tiên của mạng: Embedding layer map 1 từ trong từ điển tới một vector cho sẵn kích thước. Trong seq2seq model trọng số của embedding layer được train cùng với các tham số khác của model. Theo chân <a href="http://sebastianruder.com/word-embeddings-1/">tutorial</a> này bởi Sebastian Ruder để học về các model kahsc sử dụng word embedding và tầm quan trọng của nó trong NLP. (ok mình thì dùng một word embedding đã được trên từ trước và mình không thay đổi nó, mình không rõ như bên trên có cải thiện nhiều không, chẳng còn cách nào khác chỉ có thể thử thôi :D)
<h3>Papers on Sequence to Sequence</h3>
<ol>
 	<li><a href="http://arxiv.org/abs/1406.1078">Learning Phrase Representations using RNN Encoder-Decoder for Statistical Machine Translation</a></li>
 	<li><a href="http://arxiv.org/abs/1409.3215">Sequence to Sequence Learning with Neural Networks</a></li>
 	<li><a href="https://arxiv.org/abs/1409.0473">Neural Machine Translation by Jointly Learning to Align and Translate</a></li>
 	<li><a href="http://arxiv.org/abs/1506.05869">A Neural Conversational Model</a></li>
</ol>
&nbsp;

Phần sau của bài viết này nói đến Attention Mechanism. Mình có xem phần lý thuyết của Attention rồi nhưng mình sẽ học thêm cho vững và trình bày trong một bài khác.
<h2>Kết thúc</h2>
Bài viết được dịch từ <a href="http://complx.me/2016-06-28-easy-seq2seq/">http://complx.me/2016-06-28-easy-seq2seq/</a>

Có rất nhiều thứ cần phải làm ở đây. Chúng ta cứ đi thẳng, đến ngã rẽ tự bản thân sẽ biết đi đường nào. Hẹn gặp lại các bạn trong bài viết tiếp theo. Mình sẽ trình bày về cách tạo Chatbot của mình.

Cám ơn các bạn!.

&nbsp;