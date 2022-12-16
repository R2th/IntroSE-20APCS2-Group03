## Mở đầu

Đây là bài dịch tiếp theo của [phần 1](https://viblo.asia/p/phan-1-deep-learning-cho-chatbot-gioi-thieu-gDVK2QEr5Lj) . Chúng ta sẽ cùng tạo một retrieval-based Model Chatbot.

## Nội dung

Trong bài này chúng ta sẽ implement một retrieval-based bot.

Retrieval-based model có một kho định nghĩa trước các câu trả lời chúng có thể sử dụng, không giống như generative models cái mà có thể generate câu trả lời chúng không bao giờ nhìn thấy trước đây. Rõ hơn, từ một câu đầu vào tới retrieval-based model là một context c sẽ chọn ra một câu trả lời response r có khả năng nhất. Ouputs của model là câu trả lời tốt nhất. Để tìm ra câu trả lời tốt nhất bạn cần phải tính toán điểm cho tất cả các câu trả lời và chọn ra một với số điểm cao nhất. 

Nhưng tại sao chúng ta lại tạo một retrieval-based model nếu chúng ta có thể tạo một generative model? Generative models dường như linh hoạt hơn bnowir vì chúng không cần kho câu trả lời định nghĩa trước, phải không các bạn? Vấn đề là generative models không hoạt động tốt trong thực tế. Ít nhất là cho tới bây giờ. Bởi vì chúng ta có quá nhiều tự do cho việc chúng có thể trả lời như thế nào, generative models có thể tạo ra các lỗi cú pháp, không có nghĩa, không nhất quán. Chúng cũng cần một số lượng dữ liệu training lớn và khó để tối ưu. Đa số hệ thống ngày nay là retrieval-based, hoặc kết hợp giữa retrieval-based và generative. Google's Smart Reply là một ví dụ. Generative models đang là lĩnh vực active trong nghiên cứu. Nhưng chúng ta không quan trọng, nếu chúng ta tạo một chatbot ngày nay, lựa chọn tốt nhất là tạo một retrieval-based model

### The Ubuntu Dialog Corpus

Trong bài viết này chúng ta sẽ sử dụng Ubuntu Dialog Corpus ([paper](http://arxiv.org/abs/1506.08909), [github](https://github.com/rkadlec/ubuntu-ranking-dataset-creator)). Ubuntu Dialog Corpus (UDC) là một trong những tập dữ liệu hội thoại lớn nhất được public. Nó được dựa trên các lưu trữ chat từ các kênh Ubuntu trên **public** [**IRC**](https://vi.wikipedia.org/wiki/IRC) **network** (ok là một dạng liên lạc cấp tốc qua mạng gì đó).  [Paper ](http://arxiv.org/abs/1506.08909)này sẽ đi vào chi tiết chính xác dữ liệu được tạo như thế nào, vì thế tôi không lặp lại nó ở đây. Tuy nhiên, việc hiểu được dữ liệu là quan trọng khi chúng ta làm việc với chúng, vì thế để tôi giải thích nó trước. Tập dữ liệu training bao gồm 1000000 mẫu, với 50% positive (label 1), 50% negative (label 0). Mỗi vĩ dụ bao gồm **context**, là điểm bắt đầu hội thoại, và một **utterance**, một câu phản hồi cho context trên. Positive với label 1 nghĩa là câu phản hồi là thực sự cho context đó, và negative label 0 nghĩa là không phải, Chọn ngẫu nhiên một số mẫu, đây là một vài mẫu dữ liệu. ![](http://35.196.17.90/blog/wp-content/uploads/2018/12/ubuntu-dialog-corpus.png) Các dữ liệu được generation script đã được tiền xử lý cho chúng ta (cái này mình không biết là bản thân dữ liệu UDC được tiền xử lý hay là script của bài viết này tiền xử lý, mình sẽ xem thử và trình bày rõ cho các bạn) - Tiền xử lý ở đây là  [tokenized](http://www.nltk.org/api/nltk.tokenize.html#module-nltk.tokenize), [stemmed](http://www.nltk.org/api/nltk.stem.html#module-nltk.stem.snowball), and [lemmatized](http://www.nltk.org/api/nltk.stem.html#module-nltk.stem.wordnet) sử dụng [NLTK tool](http://www.nltk.org/). Script này cũng đã thay thế các entities giống như tên, địa điểm, tổ chức, các url, các đường dẫn hệ thống bằng các ký tự đặc biệt. Việc tiền xử lý này không phải là phải làm, nhưng nó cũng sẽ giúp tăng hiệu quả một vài phần trăm. Trung bình context có 86 từ và utterance có 17 từ. Chúng ta có thể em chi tiết [jupyter notebook.](https://github.com/dennybritz/chatbot-retrieval/blob/master/notebooks/Data%20Exploration.ipynb) Tập dữ liệu còn bao gồm cả tập test sets và validation sets (Ngắn gọn thì đây là 2 tập không để đem đi train mà là tập chưa nhìn thấy để đánh giá model). Định dạng của chúng khác với tập dữ liệu train. Mỗi dữ liệu trong test/validation bao gồm một context, một utterance đúng và 9 utterance sai được gọi là **distractors.** Mục đích của model là gán điểm cao nhất cho đúng utterance, và thấp hơn cho các utterances sai (ok). ![](http://35.196.17.90/blog/wp-content/uploads/2018/12/urc-test-validation-set.png) 

Có rất nhiều cách để đánh giá model. Cách thường sử dụng là recall@k. **Recall@k** nghĩa là model sẽ chọn ra k câu phản hồi tốt nhất trong 10 câu trả lời có thể (1 đúng và 10 sai). Nếu cái đúng nằm trong những cái mà chúng ta đã đánh dấu thì được coi là đúng (để dễ hiểu chọn k=3 ta chọn ra 3 câu phản hồi tốt nhất nếu trong 3 câu đó mà chứa câu đúng thì được coi là đúng). Vì thế k lớn hơn thì là dễ hơn. Nếu chúng ta set k=10 chúng ta sẽ có recall là 100% bởi vì chúng ta chỉ có 10 câu trả lời. Nếu chúng ta chọn k=1 thì model chỉ có một cơ hội để chọn ra câu trả lời đúng. Ở thời điểm này có lẽ bạn đang tự hỏi là 9 distractors(câu sai) được chọn như thế nào. Trong tập dữ liệu 9 câu sai được lấy ngẫu nhiên. Tuy nhiên trong thực tế bạn có cả triệu khả năng để chọn và bạn không biết được cái nào là đúng. Bạn không thể đánh giá cả triệu câu trả lời để lấy ra một cái có số điểm cao nhất - điều này là quá tốn kém (thời gian đôi khi hệ thống cần trả lời nhanh, ví dụ chatbot gửi câu yêu cầu là cần phản hồi nhanh không thể ngồi đợi đánh giá tất cả rồi chọn câu tốt nhất được, đến đây ta có thể mong ngóng bài viết sẽ đưa ra được mô hình tốt chứ không đơn giản như vậy). [Google Smart Reply ](http://arxiv.org/abs/1606.04870)sử dụng kĩ thuật chia nhỏ các câu trả lời có thể chọn, hoặc nếu bạn chỉ có vài trăm câu trả lời thích hợp trong tất cả bạn có thể đánh giá tất. (Brute force được dùng ở mọi nơi phải không các bạn :D).

### Baseline

Trước khi bắt đầu với mạng neural chúng ta hãy thử tạo ra một vài thứ đơn giản để giúp chúng ta có thể hiểu được hiệu quả chúng ta mong muốn. Chúng ta sẽ sử dụng function dưỡi đây để đánh giá recall@k: (Các mã code ở đây mình sẽ copy nguyên si để ta tôn trọng tác giả, mình sẽ implement một cái của riêng mình ở phía cuối cùng chúng ta sẽ cùng làm từ đầu).

```
def evaluate_recall(y, y_test, k=1):
    num_examples = float(len(y))
    num_correct = 0
    for predictions, label in zip(y, y_test):
        if label in predictions[:k]:
            num_correct += 1
    return num_correct/num_examples
```

Ở đây, y là tập các dự đoán của ta đã được sắp xếp theo điểm giảm dần, và y_test là các nhãn thực sự. Ví dụ y = [0,3,1,2,5,6,4,7,8,9] nghĩa là utteramce số 0 nhận điểm cao nhất, và 9 thấp nhất. Nhớ rằng chúng ta có 10 utterance, với mỗi test example và cái đầu tiên luôn là cái đúng, bởi vì trong dữ liệu test ở trên cột đúng đầu tiên, rồi đến 9 cái sai theo sau. Theo trực giác, nếu chọn một cách ngẫu nhiên ta có kết quả recall@1 là 10%, recall@2 là 20%, ...Hãy xem trường hợp dưới đây.

<pre class="lang:default decode:true "># Random Predictor
def predict_random(context, utterances):
    return np.random.choice(len(utterances), 10, replace=False)
# Evaluate Random predictor
y_random = [predict_random(test_df.Context[x], test_df.iloc[x,1:].values) for x in range(len(test_df))]
y_test = np.zeros(len(y_random))
for n in [1, 2, 5, 10]:
    print("Recall @ ({}, 10): {:g}".format(n, evaluate_recall(y_random, y_test, n)))</pre>

<div>Kết quả khi lấy ngẫu nhiên.</div>

<div class="line number1 index0 alt2">`Recall @ (1, 10): 0.0937632`</div>

<div class="line number2 index1 alt1">`Recall @ (2, 10): 0.194503`</div>

<div class="line number3 index2 alt2">`Recall @ (5, 10): 0.49297`</div>

<div class="line number4 index3 alt1">`Recall @ (10, 10): 1`</div>

<div>Great, trông có vẻ đã hoạt động. Đúng vậy nếu chúng ta chỉ lấy ngẫu nhiên. Một kiểu khác chúng ta sẽ thảo luận trong paper chính thức (hay research paper là các bài nghiên cứu) là tf-idf predictor. [tf-idf](https://en.wikipedia.org/wiki/Tf%E2%80%93idf) là viết tắt của "term frequency inverse document"  tần số và các phép đo độ quan trọng của một từ trong một tài liệu quan hệ với cả corpus. Chúng ta không đi vào chi tiết (bạn có thể tìm thấy nhiều bài hướng dẫn về tf-idf trên mạng), các tài liệu có nội dung giống nhau sẽ có các một vector tf-idf tương tự (ok có thể sẽ có tutorial chống đạo văn từ cái này nhỉ). Rõ ràng nếu nội dung có các từ tương tự nhau chúng nhiều khả năng là cặp đúng. Ít nhất thì nó còn hơn là chọn ngẫu nhiên. Nhiều thư viện như scikit-learn có sẵn tf-idf functions, vì thế nên nó dễ dàng sử dụng. Chúng ta cùng tạo ra một tf-idf predictor và xem nó hoạt động tốt không.</div>

<div>

```
class TFIDFPredictor:
    def __init__(self):
        self.vectorizer = TfidfVectorizer()

    def train(self, data):
        self.vectorizer.fit(np.append(data.Context.values,data.Utterance.values))

    def predict(self, context, utterances):
        # Convert context and utterances into tfidf vector
        vector_context = self.vectorizer.transform([context])
        vector_doc = self.vectorizer.transform(utterances)
        # The dot product measures the similarity of the resulting vectors
        result = np.dot(vector_doc, vector_context.T).todense()
        result = np.asarray(result).flatten()
        # Sort by top results and return the indices in descending order
        return np.argsort(result, axis=0)[::-1]
```

```
# Evaluate TFIDF predictor
pred = TFIDFPredictor()
pred.train(train_df)
y = [pred.predict(test_df.Context[x], test_df.iloc[x,1:].values) for x in range(len(test_df))]
for n in [1, 2, 5, 10]:
    print("Recall @ ({}, 10): {:g}".format(n, evaluate_recall(y, y_test, n)))
```

Kết quả

`Recall @ (1, 10): 0.495032`

`Recall @ (2, 10): 0.596882`

`Recall @ (5, 10): 0.766121`</div>

`Recall @ (10, 10): 1`


<div>Chúng ta có thể thấy rằng tf-idf model tốt hơn đáng kể so với chọn ngẫu nhiên. Nhưng nó chưa được hoàn hảo. Giả định rằng chúng ta đã làm không được tốt. Đầu tiên một câu trả lời không cần thiết phải giống với câu context.</div>

<div>Thứ hai, tf-idf bỏ qua thứ tự của từ, cái có thể là một tín hiệu quan trọng. Với một Neural Network model chúng ta có thể làm tốt hơn.</div>

### Dual Encoder LSTM

Deep learning model mà chúng ta sẽ tạo ra trong bài viết này được gọi là Dual Encoder LSTM network. Đây chỉ là một trong nhiều cách chúng ta có thể áp dụng cho vấn đề này và nó không phải là cái tốt nhất. Bạn có thể thử với các loại kiến trúc Deep learning khác cái chưa được thử - nó là một lĩnh vực đang được nghiên cứu. Lấy ví dụ,  [seq2seq model](https://www.tensorflow.org/versions/r0.9/tutorials/seq2seq/index.html) thường xuyên được sử dụng trong Machine Translation (ở bài sau mình sẽ trình bày mô hình này cũng như chatbot mình làm được, mình cứ nghĩ cái mình làm được là generative model, nhưng có vẻ nó chỉ là retieval model thôi. Các bạn có thể trả lời câu hỏi này giúp mình nhé. Cám ơn các bạn) cái mà sẽ hoạt động tốt cho nhiệm vụ này. Lý do chúng ta chọn Dual Encoder là bởi vì nó [được báo cáo](http://arxiv.org/abs/1510.03753) đạt được hiệu quả tốt trên tập dữ liệu này. Điều này có nghĩa là chúng ta biết là cái chúng ta mong đợi có thể chắc chắn model của chúng ta sẽ hoạt động tốt. Việc áp dụng các model khác cho vấn đề này sẽ là một dự án thú vị. The Dual Encoder LSTM chúng ta sẽ tạo giống như ([paper](http://arxiv.org/abs/1506.08909)): ![](http://35.196.17.90/blog/wp-content/uploads/2018/12/dual-encoder-lstm.png) Nó hoạt đống giống như sau:

1.  Tất cả các context và response được chia thành các từ và được chuyển thành dạng vector với embedded (đơn giản nó là một vector được xây dựng sẵn ví dụ từ "father" = [0 2.1 -3.4 .... 2.5] mình ví dụ như vậy). Word Embeddings được khởi tạo từ Stanford’s [GloVe](http://nlp.stanford.edu/projects/glove/) vectors và được fine-tuned trong suốt quá trình training (Side note: Điều này là không bắt buộc và không được thể hiện trong bức tranh. Tôi tìm thấy các word embeddings với GloVe không làm tạo ra sự khác biệt cho độ hiệu quả của model). (ok vậy cũng không quan trọng lắm việc chất lượng word embedded và việc fine-turned được nói ở trên liệu có phải trong quá trình train mình sẽ sửa lại cái ma trận word embbeded được cung cấp sẵn không, model của mình làm thì mình không thay đổi ma trận này).
2.  Tất cả các embedded context và response được cho vào cùng một Recurrent Neural Network word-by-word. Chúng ta có thể chọn vectors lớn hơn, ở đây chúng ta chọn 256 chiều.(ok mình hiểu một từ được biểu diễn 256 con số ví dụ từ "father" bên trên sẽ chuyển thành ma trận 256 cột).
3.  Chúng ta sẽ nhân c với một ma trận M để dự đoán kết quả r'. Nếu c là 1x256 chiều, thì M là 256x256 và kết quả sẽ được là vector 1x256, cái chúng ta có thể tạo ra như là generated response. Ma trận M này sẽ được học trong suốt quá trình train.(ok ma trận này được khởi tạo ngẫu nhiên và trong quá trình train ma trận này sẽ thay đổi trọng số để có thể từ đầu vào sẽ tạo ra đúng đầu ra).
4.  Chúng ta sẽ đo sự giống nhau của kết quả r' và kết quả thực sự bằng cách dot product(nhân ma trận) giữa hai vector. Một dot product lớn nghĩa là hai vectors giống nhau.(ok 1x256 nhân 256x1 sẽ được 1x1 một số nhưng mình vẫn chưa hiểu sao số này lớn 2 vector lại giống nhau ví dụ 0.1x0.5 > 0.1x0.1 nhưng 0.1 và 0.1 giống nhau hơn). Sau đó chúng ta sẽ áp dụng hàm sigmoid function để chuyển kết quả này thành xác suất. Bước 3 và 4 đã bao gồm trong hình.

Để train model, chúng ta cần một loss(cost) function. Chúng ta sẽ sử dụng binary cross-entropy loss là thường sử dụng cho classification problems. Chúng ta sẽ gọi true label cho cặp context-response y. 1 đúng 0 sai. Lấy predicted xác suất từ 4\. Sau đó dùng cross entropy loss được tính toán L= −y * ln(y') − (1 − y) * ln(1−y'). (ok các bạn không cần quá lo lắng chúng ta có sẵn cross entropy loss trong các deep learning framework như tensorflow, pytorch, ... Nếu các bạn vẫn cảm thấy khó chịu thì chúng ta sẽ học machine learning căn bản và deep learning, thời gian sẽ trả lời, ...). Chúng ta sẽ sử dụng cả numpy, pandas, tensorflow và tf learn(tổng hợp của các hàm tiện ích bậc cao cho tensorflow cái này mình không biết mình dùng tensorflow low level và thấy thuận tiện còn muốn high level thì mình dùng keras món tf learn này mình chưa thử).

### Tiền xử lý

[Dataset](https://github.com/rkadlec/ubuntu-ranking-dataset-creator) chính thức có định dạng CSV. Chúng ta có thể làm việc trực tiếp với CSV nhưng tốt hơn để thuận tiện cho việc chuyển dữ liệu sang dạng tensorflow. (Quick side note: tf.SequenceExample nhưng nó dường như không được hỗ trợ bởi tf.learn nữa. ok bản thân mình không hiểu mấy cái này). Lợi ích chính của định dạng này là cho phép chúng ta load tensor trực tiếp từ input files và để tensorflow xử lý tất cả việc shuffling, batching, queuing của inputs (ok nghe hay nhỉ). Một phần của việc tiền xử lý là chúng ta cần tạo ra vocabulary. Nghĩa là chúng ta sẽ map mỗi từ thành một con số, ví dụ "cat" thành 2631\. TFRecord files sẽ chuyển lưu trữ thành các con số thay thế các chuỗi. Chúng ta sẽ lưu vocabulary vì thế chúng ta có thể map các con số trở lại thành các từ sau này. Mỗi một example sẽ bao gồm các trường sau: context: Một sequence of word ids được biểu diễn context text ví dụ [231, 2190, 737, 0, 912] biểu diễn cho "tf learn làm hết rồi". context_len: Chiều dài của context là 5 cho ví dụ bên trên utterance: Một sequence of word ids biểu diễn cho utterance (response) utterance_len: Chiều dài utterance label: Chỉ cho training data là 0 hoặc 1 distractor_[N]: Chỉ cho test/validation data. N từ 0 đến 9\. Một sequence of word ids trình bày distractor utterance distractor_[N]_len: Chỉ cho test/validation data, chiều dài cho cái bên trên The preprocessing đã xong với  [`prepare_data.py.`](https://github.com/dennybritz/chatbot-retrieval/blob/master/scripts/prepare_data.py)Python script, cái sẽ tạo ra 3 files: `train.tfrecords`, `validation.tfrecords` and `test.tfrecords`. Bạn có thể tự chạy script hoặc tải các data file từ [đây ](https://drive.google.com/open?id=0B_bZck-ksdkpVEtVc1R6Y01HMWM).

### Tạo một input function

Để sử dụng Tensorflow's built-in hỗ trợ cho việc training và đánh giá chúng ta cần tạo ra các input function - một function sẽ trả về tập dữ liệu cho chúng ta. Trong thực tế, bởi vì dữ liệu training và dữ liệu test khác nhau về định dạng, chúng ta cần phải có các input functions khác nhau cho chúng. Input function nên trả về batch of features và nhãn (nếu có sẵn). Đây là một vài dòng mã giả:

```
def input_fn():
  # TODO Load and preprocess data here
  return batched_features, labels
```

Bởi vì chúng ta cần input function khác nhau trong suốt quá trình training và đánh giá và bởi vì chúng ta ghét việc phải lặp lại code, chúng ta tạo ra một wrapper gọi là create_input_fn cái mà tạo ra một input function cho các mode thích hợp. Nó thêm một vài tham số khác. Đây là định nghĩa chúng ta sử dụng:

```
def create_input_fn(mode, input_files, batch_size, num_epochs=None):
  def input_fn():
    # TODO Load and preprocess data here
    return batched_features, labels
  return input_fn
```

Đầy đủ code chúng ta có thể tìm thấy trong `[udc_inputs.py](https://github.com/dennybritz/chatbot-retrieval/blob/master/udc_inputs.py).`Một high level function làm được những thứ sau:

1.  Tạo một feature definition để mô tả các trường của chúng ta.
2.  Đọc vào các dòng từ input_files với tf.TFRecordReader
3.  Parse các records thành các feature definition (có lẽ là thành một example với định dạng như phần tiền xử lý mình nói ở trên)
4.  Trích xuất training labels
5.  Tạo batch nhiều mẫu và training labels
6.  Trả về batch và training labels

Định nghĩa cách đánh giá model. Chúng ta đã nhắc đến việc chúng ta muốn sử dụng recall@k metric để đánh giá model của chúng ta. Thật may mắn Tensorflow đã có sẵn với nhiều evaluation metrics cho chúng ta có thể sử dụng bao gồm cả including recall@k. Để sử dụng metrics này chúng ta cần tạo một từ điển maps từ tên số liệu tới một hàm nhận predictions (cái chúng ta dự đoán) và labels(kết quả thật sự) làm tham số.

```
def create_evaluation_metrics():
  eval_metrics = {}
  for k in [1, 2, 5, 10]:
    eval_metrics["recall_at_%d" % k] = functools.partial(
        tf.contrib.metrics.streaming_sparse_recall_at_k,
        k=k)
  return eval_metrics
```

Bên trên chúng ta sử dụng  `[functools.partial](https://docs.python.org/2/library/functools.html#functools.partial)` để chuyển functions nhận 3 tham số tới một cái functions nhận hai tham số (mình không thực sự hiểu lắm). Đừng để tên streaming_sparse_recall_at_k khiến bạn nhầm lẫn. Streaming chỉ có nghĩa là hàm tích lũy thông qua các batches và làm rời rạc để cùng định dạng với labels của chúng ta (kiểu cộng dồn qua các batch và chuyển về dạng 0 1 với định dạng labels). Điều này mang lại một điểm quan trọng: Định dạng chính xác cho predictions là gì? Trong suốt quá trình training chúng ta dự đoán xác suất của các example là đúng. Nhưng trong suốt quá trình đánh giá mục đích của chúng ta là tính điểm cho utterance và 9 distractors và chọn ra cái tốt nhất.

Bài viết chưa hoàn thành, mình sẽ cập nhật sớm nhất có thể, ...

### Kết luận

Trong bài viết này chúng ta đã implemented một retrieval-based neural network model cái có thể assign score tới câu trả lời tiềm năng với một context cho trước. Vẫn có nhiều điểm để cải thiện như thử các neural networks khác làm tốt hơn nhiệm vụ này hơn là Dual LSTM encoder. Cũng có nhiều hyperparameter optimization hoặc cải thiện quá trình tiền xử lý. **[The Code and data for this tutorial is on Github, so check it out.](https://github.com/dennybritz/chatbot-retrieval/)**

## Kết thúc

Như vậy là mình đã dịch xong [http://www.wildml.com/2016/07/deep-learning-for-chatbots-2-retrieval-based-model-tensorflow/](http://www.wildml.com/2016/07/deep-learning-for-chatbots-2-retrieval-based-model-tensorflow/).

Còn một số chỗ mình chưa hiểu, và mình cũng chưa tự làm lại thì chưa thể nói là của mình được. 

Tóm lại 
Chúng ta sử dụng **recall@k** để đánh giá, sử dụng **Dual LSTM encoder** để train, **if-idf** để biết được độ giống nhau với tham vọng làm được một hệ thống chống đạo văn, Ngoài keras còn có một thứ tên là **tf-learn** nữa cần phải đọc qua, và cái chatbot mình đang build dùng seq2seq machine translation model thì có vẻ là một dạng retrieval based model chứ không phải generative models như mình nghĩ. 

Mình mong bài hướng dẫn có ích cho các bạn và có thể góp ý các phần bình luận trong đóng mở ngoặc tròn mà mình còn chưa hiểu. 

Trong bài tiếp theo mình sẽ hướng dẫn tiếp [thiết kế generative chatbot](https://viblo.asia/p/phan-3-deep-learning-cho-chatbot-thiet-ke-generative-chatbot-ByEZkpYxlQ0). 

Cám ơn các bạn!