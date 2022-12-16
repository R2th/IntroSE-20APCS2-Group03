# Mục tiêu bài viết

Phân tích câu hỏi là pha đầu tiên trong kiến trúc chung của một hệ thống hỏi đáp, có nhiệm vụ tìm ra các thông tin cần thiết làm đầu vào cho quá trình xử lý của các pha sau (trích chọn tài liệu, trích xuất câu trả lời, …). Vì vậy phân tích câu hỏi có vai trò hết sức quan trọng, ảnh hưởng trực tiếp đến hoạt động của toàn bộ hệ thống. Nếu phân tích câu hỏi không tốt thì sẽ không thể tìm ra được câu trả lời. 

Hôm nay mình sẽ trình bày về các phương pháp phân loại ý định của người hỏi trong hệ thống hỏi đáp dựa trên tập dữ liệu là các câu hỏi của sinh viên trường Đại học Xây dựng. Trong quá trình xây dựng mình đã thử nghiệm nhiều phương pháp khác nhau, tuy nhiên với phạm vi blog này mình sẽ chia sẻ một phương pháp tốt nhất mà mình đã sử dụng, các phương pháp khác mình sẽ chia sẻ dần trong các bài viết tiếp theo. 

# Xác định ý định là gì?

Đối với hệ thống hỏi đáp, phân loại ý định (intent classification) là việc xác định ý định của người hỏi khi tương tác với hệ thống thông qua câu hỏi hay câu truy vấn của người dùng.
Ví dụ đối với câu hỏi: "Cho mình hỏi địa chỉ cơ sở A ở đâu ạ?", thì ý định của người dùng là họ đang muốn hỏi về 'ADDRESS', ví dụ khác như câu hỏi : "Thời gian mở cửa của cửa hàng là mấy giờ?" thì ý định của người dùng là hỏi về 'TIME'. 
Dựa vào việc xác định ý định sẽ giúp việc trả lời câu hỏi được chính xác và đưa ra được câu trả lời mong muốn của người dùng.

# Các phương pháp xác định ý định

Đối với các bài toán cần xác định ý định, có nhiều phương pháp để thực hiện. 
## Hướng tiếp cận nông (shalow)
Phương pháp cổ điển là dựa trên tần suất xuất hiện và mức độ quan trọng các từ trong các ý định đã biết hay còn gọi là hướng tiếp cận nông. Ví dụ để hỏi về thời gian thì trong câu hỏi sẽ hay xuất hiện các từ như "mấy giờ", "ngày nào", "tháng nào", "năm nào",...
Còn ý định muốn hỏi về địa điểm thì sẽ có các từ: "ở đâu", "địa chỉ", "chỗ nào",..v.v.
Nhiều phương pháp sử dụng trong Q&A dùng các kĩ thuật dựa trên từ khóa để định vị các câu, đọan văn có khả năng chứa câu trả lời từ các văn bản được trích chọn về. Sau đó giữ lại các câu, đoạn văn có chứa chuỗi ký tự cùng loại với loại câu trả lời mong muốn (ví dụ các câu hỏi về tên người, địa danh, số lượng…).

Khi xác định được các từ hay xuất hiện trong các ý định thì tùy vào xác suất xuất hiện của các từ trong câu hỏi mà chúng ta sẽ dự đoán được khả năng ý định của người dùng sẽ thuộc vào loại nào.
Tuy nhiên việc xác định dựa trên từ điển như vậy sẽ không đầy đủ và thiếu chính xác. Ngôn ngữ tự nhiên là ngôn ngữ có tính nhập nhằng, vì vậy nên một số câu hỏi nếu dựa vào những từ như vậy chưa chắc đã xác định được ý định câu hỏi.

## Hướng tiếp cận sâu (deep)

Trong những trường hợp khi mà hướng tiếp cận bề mặt
không thể tìm ra câu trả lời, những quá trình xử lý về ngữ pháp, ngữ nghĩa và ngữ cảnh là cần thiết để trích xuất hoặc tạo ra câu trả lời. Các kĩ thuật thường dùng như nhận dạng thực thể (named-entity recognition), trích xuất mối quan hệ, loại bỏ nhập nhằng ngữ nghĩa,… Hệ thống thường sử dụng các nguồn tri thức như Wordnet, ontology để làm giàu thêm khả năng lập luận thông qua các định nghĩa và mối liên hệ ngữ nghĩa. Các hệ thống hỏi đáp dựa theo mô hình ngôn ngữ thống kê cũng đang ngày càng phổ biến.

Trong bài viết này mình sẽ tiếp cận theo hướng tiếp cận sâu.

# Dữ liệu sử dụng
 
Để xây dựng mô hình xác định ý định câu hỏi, mình sẽ sử dụng ontology là các cặp "câu hỏi - ý định" được thu thập từ sinh viên trường Đại học Xây dựng.
Mình sẽ đưa bài toán về việc xây dựng một mô hình phân lớp với các class là các ý định của người hỏi. Ví dụ sau đây là các câu hỏi trong tập dữ liệu:

```
{'content': 'thưa thầy cô, bảng điểm của em hiện tại giờ được 1 môn C+ 2 tín chỉ, 2 môn ghi F là em bảo lưu ạ, nhưng điểm hệ số 4 của em lại ghi 0.45 là  như nào ạ, mong các thầy cô giải đáp hộ em', 'intent': 'DIEM'}
{'content': 'với tiêu chí xét học bổng năm 2 là bắt buộc qua tacb1,2 hay phải đạt 250 toeic ạ ', 'intent': 'HOC_BONG'}
{'content': 'Em chào thầy cô ạ. Em xin được có một vài lời về vấn đề học bổng của nhà trường ạ. Trước tiên em xin chân thành cảm ơn quý thầy cô và nhà trường đã tạo điều kiện cho em cũng như các anh chị, các bạn sinh viên được học tập và thêm vào đó là những suất học bổng những phần quà để động viên tinh thần học tập của sinh viên chúng em. Theo em được biết thì trong khoảng thời gian trước thời điểm hiện tại thì nhà trường đã tiến hành trao học bổng cho sinh viên trong diện được xét học bổng của kì học trước. Một vài bạn trong lớp em đã nhận được học bổng nhưng riêng về cá nhân em thì em vẫn chưa nhận được học bổng ạ. Em không rõ là do có sai sót gì không nên em rất mong nhà trường xem xét lại và cho em lời đáp ạ. Những lời em nói ở trên nếu có chỗ nào không phù hợp thì cho em xin lỗi ạ. Em rất mong nhận được hồi âm ạ. Em xin chân thành cảm ơn ạ!', 'intent': 'HOC_BONG'}
{'content': 'Trong khoảng thời gian chờ bằng, em có được phép đăng ký học lại môn học để nâng điểm tích lũy hay không?', 'intent': 'DKMH'}
{'content': 'Em đã bảo vệ đồ án tốt nghiệp thì có thể học lại để cải thiện điểm các môn không ạ', 'intent': 'DKMH'}
{'content': 'Em muốn xin hoãn xét tốt nghiệp để học cải thiện thì có được không ạ, và làm cách nào để đăng ký môn học ạ', 'intent': 'DKMH'}
{'content': 'Thưa thầy, em học khóa 62 em có thể học lại môn cơ học đất khóa 64 được không ạ. Vì em thấy mã môn học khác nhau (138802, 130211)', 'intent': 'DKMH'}
{'content': 'Cho em hỏi em có thể đăng ký trả nợ môn học cùng tên nhưng khác mã được không ạ?', 'intent': 'DKMH'}
{'content': 'Em chào cô. Cô cho em\xa0hỏi\xa0lâu nữa không sẽ có đợt huỷ môn học mà mình đăng kí nhầm vậy cô. Em cảm ơn cô nhiều.', 'intent': 'DKMH'}
{'content': 'Cho em hỏi nếu em đăng ký môn học mà bị nhầm thì có hủy được không ạ', 'intent': 'DKMH'}
```

Các câu hỏi được chia thành 10 nhóm ý định: `['DIEM', 'HOC_BONG', 'DKMH', 'HOC_PHI', 'KHAC', 'LICH_HOC', 'TAI_KHOAN', 'THU_TUC_SV', 'TN', 'TOEIC']`
Trong đó 
* 'DIEM' bao gồm các câu hỏi thắc mắc về Điểm
* 'HOC_BONG' bao gồm các câu hỏi thắc mắc về Học bổng
* 'DKMH' bao gồm các câu hỏi thắc mắc về việc đăng ký môn học
* 'HOC_PHI' bao gồm các câu hỏi thắc mắc về học phí

...

* 'KHAC' bao gồm các câu hỏi không thuộc vào 1 trong 9 nhóm trên

# Xây dựng mô hình

## Tài nguyên

Dữ liệu, pre-trained các mô hình biểu diễn từ các bạn có thể download [ở đây](https://drive.google.com/drive/folders/1EqS0xTEGGaQM-uAb6phbmLOfUkWjjZNy?usp=sharing).

## Cài đặt các gói cần thiết

Trong bài này mình sử dụng thư viện `pyvi` để tiến hành một số tiền xử lý với văn bản. Để cài đặt bạn chạy lệnh sau:

```bash
pip3 install pyvi
```

## Import các thư viện cần thiết

```python
# -*- coding: utf-8 -*-
 
import pandas as pd
import string
import numpy as np
import re, os, string
from pyvi import ViTokenizer
from pyvi.ViTokenizer import tokenize
import tensorflow as tf
from gensim.models.fasttext import FastText 
import json
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras import *
from tensorflow.keras.layers import *
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import *
import matplotlib.pyplot as plt; plt.rcdefaults()
import matplotlib.pyplot as plt

```

## Khai báo các hàm tiền xử lý

```python
# Loại bỏ các ký tự thừa
def clean_text(text):
    text = re.sub('<.*?>', '', text).strip()
    text = re.sub('(\s)+', r'\1', text)
    return text

#tách câu
def sentence_segment(text):
    sents = re.split("([.?!])?[\n]+|[.?!] ", text)
    return sents

#tách từ
def word_segment(sent):
    sent = tokenize(sent)
    return sent

#Chuẩn hóa từ
def normalize_text(text):
    listpunctuation = string.punctuation.replace('_', '')
    for i in listpunctuation:
        text = text.replace(i, ' ')
    return text.lower()
```

Để loại bỏ từ dừng, mình dùng danh sách từ dừng, các bạn thay `stopwords.csv` bằng đường dẫn trong file mình để bên trên.

```python
filename = 'stopwords.csv'
data = pd.read_csv(filename, sep="\t", encoding='utf-8')
list_stopwords = data['stopwords']
def remove_stopword(text):
    pre_text = []
    words = text.split()
    for word in words:
        if word not in list_stopwords:
            pre_text.append(word)
        text2 = ' '.join(pre_text)
    return text2
````

## Huấn luyện mô hình FastText phù hợp với dữ liệu bài toán

Trong bài này mình sử dụng FastText trong gói thư viện của Gensim để thực hiện mã hóa các từ thành vector (word2vec). Dữ liêu huấn luyện mình để trong file `xaa`. 
FastText được đánh giá là tốt hơn so với word2vec trong việc biểu diễn các từ mới nên mình sẽ sử dụng trong bài toán này.
Đây là file gồm 1 phần các bài viết từ wikipedia tiếng việt, các văn bản đã được tiền xử lý bằng một số
kỹ thuật như tách từ, loại bỏ từ dừng, chuẩn hóa...

Ngoài ra mình cũng cần bổ sung các câu trong file dữ liệu của bộ dữ liệu phân loại ý định để huấn luyện cho mô hình word2vec. 
Điều này giúp bổ sung một số từ trong miền dữ liệu của topology mà trong bộ ngữ liệu của wikipedia không có. Điều này giúp mô hình FastText có khả năng biểu diễn đầy đủ hơn.



```python
import json 
    
wiki_data_path = 'xaa'
qa_data_path = 'intent_db_v2.json'

def read_data(path):
    traindata = []
    sents = open(pathdata, 'r').readlines()
    for sent in sents:
        traindata.append(sent.split())
    with open(qa_data_path) as json_file:
        qa_data = json.load(json_file)  
        for question in qa_data: 
            if 'content' in question :
              content = clean_text(question['content']) 
              content = word_segment(content)
              content = remove_stopword(normalize_text(content))
              traindata.append(content.split())
    print("Corpus loaded")
    return traindata, qa_data
train_data, qa_data = read_data(wiki_data_path)


```

Huấn luyện mô hình FastText như sau:

```python
model_fasttext = FastText(size=150, window=10, min_count=2, workers=4, sg=1)
model_fasttext.build_vocab(train_data)
model_fasttext.train(train_data, total_examples=model_fasttext.corpus_count, epochs=model_fasttext.iter)
```

Sau khi đã huấn luyện xong các bạn cần lưu lại model để sử dụng cho lần sau bằng đoạn code sau:

```python 
model_fasttext.wv.save("fasttext_gensim.model")
```

Để loại lại mô hình chúng ta làm như sau:

```python
fast_text_model = KeyedVectors.load('/content/drive/MyDrive/NUCE/NLP/QA/model/fasttext_gensim.model')
```

In thử kích thước một từ:

```python
input_text = fast_text_model.wv.get_vector("hôm_nay") 
print(input_text.shape)
```

```
(150,)
```

## Biểu diễn từ và biểu diễn câu

Sau khi đã huấn luyện mô hình FastText, chúng ta sẽ tiến hành mã hóa các câu thành vector bằng cách mã hóa từng từ trong câu và đưa các vector biểu diễn các từ này vào một vector có kích thước bằng số từ của câu dài nhất (để đảm bảo các câu đều được biểu diễn đầy đủ).
Các câu ngắn hơn độ dài của câu dài nhất sẽ được thêm padding là các số 0 để đưa các câu về cùng kích thước mà không ảnh hưởng đến ý nghĩa của câu. Việc padding mình sử dụng hàm `tf.keras.preprocessing.sequence.pad_sequences`

Code thực hiện như sau:

```python
max_length_inp = 30
def sentence_embedding(sent):
    content = clean_text(sent) 
    content = word_segment(content)
    content = remove_stopword(normalize_text(content))
    inputs = []
    for word in content.split():
      if word in fast_text_model.wv.vocab:
        inputs.append(fast_text_model.wv.get_vector(word))
    inputs = tf.keras.preprocessing.sequence.pad_sequences([inputs],
                                                                maxlen=max_length_inp,
                                                                dtype='float32',
                                                                padding='post')
    return inputs
```

## Đọc dữ liệu 

```python
import json 

def read_data(qa_data_input):
  sentences = [] 
  labels = []
  intents = [] 
  for question in qa_data: 
    if 'intent' in question:
      if question['intent'] not in intents: 
        intents.append(question['intent']) 
      sentences.append(sentence_embedding(question['content'])[0])
      labels.append(intents.index(question['intent']))
  print("Corpus loaded")
  return sentences, labels, intents

sentences, labels, intents = read_data(qa_data)
```

## Phân chia dữ liệu

Vì dữ liệu trong các class là không đều nhau, vì vậy để đánh giá chính xác mô hình ta cần phân chia dữ liệu đánh giá sao cho số lượng các samples trong các class bằng nhau.

Đây là hình ảnh số lượng các câu hỏi trong các class tương ứng:

![Số lượng các câu hỏi trong các class](https://images.viblo.asia/4fb73932-8572-4ba5-90c7-80a9a2fa5e85.png)


Để phân chia sao cho các câu hỏi trong các class của tập validate như nhau ta thực hiện như sau: 

```python
def split_balanced(data, target, test_size=0.2):

    classes = np.unique(target)
    # can give test_size as fraction of input data size of number of samples
    if test_size<1:
        n_test = np.round(len(target)*test_size)
    else:
        n_test = test_size
    n_train = max(0,len(target)-n_test)
    n_train_per_class = max(1,int(np.floor(n_train/len(classes))))
    n_test_per_class = max(1,int(np.floor(n_test/len(classes))))

    ixs = []
    for cl in classes:
        if (n_train_per_class+n_test_per_class) > np.sum(target==cl):
            # if data has too few samples for this class, do upsampling
            # split the data to training and testing before sampling so data points won't be
            #  shared among training and test data
            splitix = int(np.ceil(n_train_per_class/(n_train_per_class+n_test_per_class)*np.sum(target==cl)))
            ixs.append(np.r_[np.random.choice(np.nonzero(target==cl)[0][:splitix], n_train_per_class),
                np.random.choice(np.nonzero(target==cl)[0][splitix:], n_test_per_class)])
        else:
            ixs.append(np.random.choice(np.nonzero(target==cl)[0], n_train_per_class+n_test_per_class,
                replace=False))

    # take same num of samples from all classes
    ix_train = np.concatenate([x[:n_train_per_class] for x in ixs])
    ix_test = np.concatenate([x[n_train_per_class:(n_train_per_class+n_test_per_class)] for x in ixs])

    X_train = data[ix_train,:]
    X_test = data[ix_test,:]
    y_train = target[ix_train]
    y_test = target[ix_test]

    return X_train, X_test, y_train, y_test
```

Tiến hành chia dữ liệu huấn luyện và kiểm tra:

```python
trainX = np.array(sentences)
trainy = to_categorical(np.array(labels), len(intents))
X_train, X_test, y_train, y_test = split_balanced(trainX, trainy, test_size=0.2)
```

## Định nghĩa mô hình

Trong bài này mình sử dụng LSTM để tiến hành phân lớp. Mạng LSTM được sử dụng với keras bằng cách khá đơn giản như sau

```python
#model A
model = Sequential()
model.add(LSTM(128, input_shape=(max_length_inp, fast_text_model.vector_size)))
model.add(Dropout(0.2))
model.add(Dense(64, activation='relu'))
model.add(Dense(len(intents), activation='softmax'))
model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
```

Xem chi tiết số lượng các tham số mô hình: 

```
Model: "sequential_1"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
lstm_1 (LSTM)                (None, 128)               142848    
_________________________________________________________________
dropout (Dropout)            (None, 128)               0         
_________________________________________________________________
dense (Dense)                (None, 64)                8256      
_________________________________________________________________
dense_1 (Dense)              (None, 10)                650       
=================================================================
Total params: 151,754
Trainable params: 151,754
Non-trainable params: 0
```

## Huấn luyện mô hình

Để huấn luyên mô hình chúng ta sẽ fit dữ liệu huấn luyện và kiểm tra như sau:

```python
model.fit(X_train, y_train, epochs=300, batch_size=20, verbose=1,  validation_data=(X_test, y_test), callbacks=[tensorboard_callback])
```
Tham số `verbose=1` để chỉ định in ra kết quả đánh giá sau mỗi lần thực hiện xong 1 epoch

Kết quả sau khi chạy xong 1 số epochs như sau:

```
.....
Epoch 246/300
87/87 [==============================] - 1s 13ms/step - loss: 0.0073 - accuracy: 0.9941 - val_loss: 1.7335 - val_accuracy: 0.8364
Epoch 247/300
87/87 [==============================] - 1s 13ms/step - loss: 0.0119 - accuracy: 0.9915 - val_loss: 1.7414 - val_accuracy: 0.8295
Epoch 248/300
87/87 [==============================] - 1s 13ms/step - loss: 0.0074 - accuracy: 0.9929 - val_loss: 1.7672 - val_accuracy: 0.8295
Epoch 249/300
87/87 [==============================] - 1s 13ms/step - loss: 0.0098 - accuracy: 0.9915 - val_loss: 1.7550 - val_accuracy: 0.8295
Epoch 250/300
87/87 [==============================] - 1s 14ms/step - loss: 0.0050 - accuracy: 0.9966 - val_loss: 1.7392 - val_accuracy: 0.8364
```

## Đánh giá mô hình

Import các thư viện cần thiết để đánh giá:

```python
from sklearn.metrics import accuracy_score
from sklearn.metrics import precision_score
from sklearn.metrics import recall_score
from sklearn.metrics import f1_score
from sklearn.metrics import cohen_kappa_score
from sklearn.metrics import roc_auc_score
from sklearn.metrics import confusion_matrix
from sklearn.metrics import multilabel_confusion_matrix
```

Chúng ta sẽ tiến hành đánh giá mô hình dựa trên các chỉ số như f1_score, độ chính xác (accuracy) như sau:

Các phương pháp đánh giá hệ thống phân lớp các bạn có thể xem [tại đây](https://ndquy.github.io/posts/bai-toan-phan-lop-va-danh-gia/)

* f1-score

```python
yhat_classes = model.predict_classes(X_test, verbose=0)
y_test_true = np.array([np.where(label ==1)[0][0] for label in y_test])
f1 = f1_score(yhat_classes, y_test_true, average='weighted')
print(f1)
```

Kết quả in ra sẽ được: 

```
0.8303684789128464
```

* Độ chính xác

```python
print("Evaluate on test data")
results = model.evaluate(X_test, y_test, batch_size=10)
print("test loss, test acc:", results)
```

Kết quả: 

```
Evaluate on test data
44/44 [==============================] - 0s 5ms/step - loss: 1.2874 - accuracy: 0.8272
test loss, test acc: [1.2874339818954468, 0.8271889686584473]
```

Như vậy kết quả dự đoán của mô hình trên tập kiểm tra đạt 82.7 %. Kết quả chưa cao lắm nhưng có thể chấp nhận được.

## Fine-tune mô hình

Để nâng cao độ chính xác của mô hình, bạn đọc có thể thử nghiệm các thay đổi bằng cách sử dụng mô hình biểu diễn từ tốt hơn hoặc sử dụng mô hình khác như BERT, GRU, RNN...
Ngoài ra chúng ta có thể thử nghiệm thay đổi các tham số để và so sánh các thay đổi để đưa ra được mô hình tốt nhất.

# Tổng kết

Bài viết mình đã vừa trình bày về kỹ thuật xác định ý định của câu hỏi sử dụng deeplearning. Mọi thắc mắc và ý kiến đóng góp các bạn có thể trao đổi dưới bài viết này. 

[Link google colab của bài viết](https://colab.research.google.com/drive/1spADlkgMyVUfcBgMAwp3wMywVZTcVYk8?usp=sharing)

[Bài viết gốc](https://ndquy.github.io/posts/intent-classification/)

Cám ơn các bạn đã đọc bài viết.