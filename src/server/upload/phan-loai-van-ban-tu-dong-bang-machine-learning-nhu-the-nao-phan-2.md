Chào các bạn, trong phần này, chúng ta sẽ cùng nhau tiếp tục giải quyết bài toán phân loại bài báo tiếng Việt. 
Trong [phần trước](https://viblo.asia/p/phan-loai-van-ban-tu-dong-bang-machine-learning-nhu-the-nao-4P856Pa1ZY3) chúng ta đã chuẩn bị xong dữ liệu cho bài toán. Dữ liệu mà chúng ta đã chuẩn bị được bao gồm:
* Count Vectors
* TF-IDF Vectors (đã áp dụng SVD cho TF-IDF)
    * Word level
    * N-Gram level
    * Character level
* Word Embeddings 

Bằng cách sử dụng dữ liệu này, trong phần này, chúng ta sẽ xây dựng các mô hình phân loại văn bản sau:
* Naive Bayes Classifier
* Linear Classifier
* Support Vector Machine
* Bagging Models
* Boosting Models
* Shallow Neural Networks
* Deep Neural Networks
    * Convolutional Neural Network (CNN)
    * Long Short Term Modelr (LSTM)
    * Gated Recurrent Unit (GRU)
    * Bidirectional RNN
    * Recurrent Convolutional Neural Network (RCNN)
    * Other Variants of Deep Neural Networks
* Doc2Vec model

Khá nhiều phải không nào, :D mình sẽ cố gắng thực hiện nhiều mô hình nhất có thể để chúng ta có thể so sánh kết quả của các phương pháp với nhau.

### Label Encoder
Trước hết, chúng ta cần chuyển nhãn dữ liệu về dạng số phục vụ quá trình huấn luyện. Nhãn của chúng ta đang có dạng văn bản như sau: ['Chinh tri Xa hoi', 'Doi song', 'Khoa hoc', 'Kinh doanh', 'Phap luat', 'Suc khoe', 'The gioi', 'The thao', 'Van hoa', 'Vi tinh']. Để chuyển dạng văn bản về dạng số, chúng ta sử dụng **LabelEncoder** của thư viện **sklearn**. Cách thực hiện đơn giản là như sau:
```python
encoder = preprocessing.LabelEncoder()
y_data_n = encoder.fit_transform(y_data)
y_test_n = encoder.fit_transform(y_test)

encoder.classes_ # kết quả: array(['Chinh tri Xa hoi', 'Doi song', 'Khoa hoc', 'Kinh doanh',
                 #                 'Phap luat', 'Suc khoe', 'The gioi', 'The thao', 'Van hoa',
                 #                 'Vi tinh'], dtype='<U16')
```

### Note:
Do hạn chế về mặt tính toán, ở đây chúng ta sẽ sử dụng TF-IDF chưa và đã được xử lý bằng SVD, khi đó mỗi vector đại diện cho một văn bản đang là vector 300 chiều. 
# Xây dựng mô hình
Để code sử dụng được ngắn gọn, chúng ta sẽ sử dụng chung một hàm huấn luyện và dự đoán cho tất cả các mô hình, việc này làm giảm bớt thời gian viết code của chúng ta rất nhiều, chi tiết như sau:
```python
def train_model(classifier, X_data, y_data, X_test, y_test, is_neuralnet=False, n_epochs=3):       
    X_train, X_val, y_train, y_val = train_test_split(X_data, y_data, test_size=0.1, random_state=42)
    
    if is_neuralnet:
        classifier.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=n_epochs, batch_size=512)
        
        val_predictions = classifier.predict(X_val)
        test_predictions = classifier.predict(X_test)
        val_predictions = val_predictions.argmax(axis=-1)
        test_predictions = test_predictions.argmax(axis=-1)
    else:
        classifier.fit(X_train, y_train)
    
        train_predictions = classifier.predict(X_train)
        val_predictions = classifier.predict(X_val)
        test_predictions = classifier.predict(X_test)
        
    print("Validation accuracy: ", metrics.accuracy_score(val_predictions, y_val))
    print("Test accuracy: ", metrics.accuracy_score(test_predictions, y_test))
```

Hàm này hỗ trợ cả mô hình là *neural network* hoặc không. Bây giờ chúng ta cùng thử xây dựng một số mô hình khác nhau:
## Naive Bayes
Mô hình Naive Bayes được xây dựng dựa trên công thức Bayes, các bạn có thể tham khảo cách sử dụng phương pháp Naive Bayes của tác giả Phạm Văn Toàn ở [đây](https://viblo.asia/p/ung-dung-thuat-toan-naive-bayes-trong-giai-quyet-bai-toan-chuan-doan-benh-tieu-duong-eW65GYejZDO).

Trong bài toán phân loại văn bản này, chúng ta sẽ thực hiện như sau:
```
train_model(naive_bayes.MultinomialNB(), X_data_tfidf, y_data, X_test_tfidf, y_test, is_neuralnet=False)

# kết quả
# Train accuracy:  0.880031596616529
# Validation accuracy:  0.8690758293838863
# Test accuracy:  0.8650666031405714
```

Tương tự, chúng ta có thể thực hiện với dữ liệu đã được SVD, các bạn hãy chạy thử những dòng lệnh sau đây và xem kết quả:
```python
train_model(naive_bayes.MultinomialNB(), X_data_tfidf_ngram_svd, y_data, X_test_tfidf_ngram_svd, y_test, is_neuralnet=False)

train_model(naive_bayes.MultinomialNB(), X_data_tfidf_ngram_char_svd, y_data, X_test_tfidf_ngram_char_svd, y_test, is_neuralnet=False)
```
Kết quả thế nào?

Chúng ta có thể thử với dạng *BernoulliNB* của Naive Bayes:
```python 
train_model(naive_bayes.BernoulliNB(), X_data_tfidf, y_data, X_test_tfidf, y_test, is_neuralnet=False)

# kết quả thu được:
# Train accuracy:  0.8485995457986374
# Validation accuracy:  0.8293838862559242
# Test accuracy:  0.8531554602664125
```

```python
train_model(naive_bayes.BernoulliNB(), X_data_tfidf_svd, y_data, X_test_tfidf_svd, y_test, is_neuralnet=False)

# kết quả thu được:
# Train accuracy:  0.8087746437152354
# Validation accuracy:  0.8033175355450237
# Test accuracy:  0.8143449864014453
```

Chúng ta sẽ tiếp tục thực hiện với một số mô hình khác (ở đây mình sẽ không giải thích chi tiết cách hoạt động của mỗi mô hình mà mình chỉ thực hiện code, các bạn có thể tham khảo lý thuyết trong các bài viết khác ở [Viblo](https://viblo.asia)).

## Linear Classifier
```python
train_model(linear_model.LogisticRegression(), X_data_tfidf, y_data, X_test_tfidf, y_test, is_neuralnet=False)

# kết quả thu được:
# Train accuracy:  0.9473060593094823
# Validation accuracy:  0.9167654028436019
# Test accuracy:  0.9207511960772636
```

```python 
train_model(linear_model.LogisticRegression(), X_data_tfidf_svd, y_data, X_test_tfidf_svd, y_test, is_neuralnet=False)

# kết quả thu được:
# Train accuracy:  0.9023467070401211
# Validation accuracy:  0.8927725118483413
# Test accuracy:  0.9046314493875688
```

## Support Vector Machine (SVM)
```python
train_model(svm.SVC(), X_data_tfidf_svd, y_data, X_test_tfidf_svd, y_test, is_neuralnet=False)

# kết quả thu được:
# Train accuracy:  0.43359773557581544
# Validation accuracy:  0.4277251184834123
# Test accuracy:  0.3908840053203105
```

Có vẻ kết quả không tốt lắm @@

## Bagging Model
```python 
train_model(ensemble.RandomForestClassifier(), X_data_tfidf_svd, y_data, X_test_tfidf_svd, y_test, is_neuralnet=False)

# kết quả thu được:
# Train accuracy:  0.9962479017871836
# Validation accuracy:  0.8311611374407583
# Test accuracy:  0.834435114049193
```

## Boosting Model (XGB)
``` python 
train_model(xgboost.XGBClassifier(), X_data_tfidf_svd, y_data, X_test_tfidf_svd, y_test, is_neuralnet=False)

# kết quả thu được:
# Train accuracy:  0.9042885824309647
# Validation accuracy:  0.8696682464454977
# Test accuracy:  0.8786850098266928
```

Tiếp theo chúng ta sẽ thực hiện **Deep Neural Network**, một trong những mô hình hot nhất hiện nay bởi hiệu quả của nó trong nhiều lĩnh vực như xử lý ảnh, xử lý ngôn ngữ tự nhiên, xử lý âm thanh,...

### Deep Neural Network
#### Xây dựng mô hình
```python 
def create_dnn_model():
    input_layer = Input(shape=(300,))
    layer = Dense(1024, activation='relu')(input_layer)
    layer = Dense(1024, activation='relu')(layer)
    layer = Dense(512, activation='relu')(layer)
    output_layer = Dense(10, activation='softmax')(layer)
    
    classifier = models.Model(input_layer, output_layer)
    classifier.compile(optimizer=optimizers.Adam(), loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    
    return classifier
```

#### Huấn luyện
```python 
classifier = create_dnn_model()
train_model(classifier=classifier, X_data=X_data_tfidf_svd, y_data=y_data_n, X_test=X_test_tfidf_svd, y_test=y_test_n, is_neuralnet=True)

# kết quả thu được:

Train on 30383 samples, validate on 3376 samples
Epoch 1/3
30383/30383 [==============================] - 33s 1ms/step - loss: 0.4122 - acc: 0.8666 - val_loss: 0.2976 - val_acc: 0.8960
Epoch 2/3
30383/30383 [==============================] - 33s 1ms/step - loss: 0.2560 - acc: 0.9149 - val_loss: 0.2956 - val_acc: 0.9023
Epoch 3/3
30383/30383 [==============================] - 31s 1ms/step - loss: 0.1987 - acc: 0.9322 - val_loss: 0.3094 - val_acc: 0.8969
Validation accuracy:  0.8969194312796208
Test accuracy:  0.9038770770055387
```

## Recurrent Neural Network
### LSTM 
#### Xây dựng mô hình
```python 
def create_lstm_model():
    input_layer = Input(shape=(300,))
    
    layer = Reshape((10, 30))(input_layer)
    layer = LSTM(128, activation='relu')(layer)
    layer = Dense(512, activation='relu')(layer)
    layer = Dense(512, activation='relu')(layer)
    layer = Dense(128, activation='relu')(layer)
    
    output_layer = Dense(10, activation='softmax')(layer)
    
    classifier = models.Model(input_layer, output_layer)
    
    classifier.compile(optimizer=optimizers.Adam(), loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    
    return classifier
```

#### Huấn luyện
```python 
classifier = create_lstm_model()
train_model(classifier=classifier, X_data=X_data_tfidf_svd, y_data=y_data_n, X_test=X_test_tfidf_svd, y_test=y_test_n, is_neuralnet=True)

# kết quả thu được 
Train on 30383 samples, validate on 3376 samples
Epoch 1/10
30383/30383 [==============================] - 4s 144us/step - loss: 2.1759 - acc: 0.1704 - val_loss: 1.9528 - val_acc: 0.2346
Epoch 2/10
30383/30383 [==============================] - 3s 115us/step - loss: 1.6678 - acc: 0.3642 - val_loss: 1.4039 - val_acc: 0.4591
Epoch 3/10
30383/30383 [==============================] - 3s 112us/step - loss: 1.3295 - acc: 0.4862 - val_loss: 1.2670 - val_acc: 0.5092
Epoch 4/10
30383/30383 [==============================] - 4s 118us/step - loss: 1.2106 - acc: 0.5463 - val_loss: 1.2173 - val_acc: 0.5367
Epoch 5/10
30383/30383 [==============================] - 3s 113us/step - loss: 1.1339 - acc: 0.5894 - val_loss: 1.1116 - val_acc: 0.6022
Epoch 6/10
30383/30383 [==============================] - 3s 113us/step - loss: 1.0748 - acc: 0.6167 - val_loss: 1.0639 - val_acc: 0.6336
Epoch 7/10
30383/30383 [==============================] - 4s 117us/step - loss: 1.0265 - acc: 0.6442 - val_loss: 1.0948 - val_acc: 0.6126
Epoch 8/10
30383/30383 [==============================] - 3s 113us/step - loss: 0.9855 - acc: 0.6642 - val_loss: 0.9994 - val_acc: 0.6759
Epoch 9/10
30383/30383 [==============================] - 3s 113us/step - loss: 0.9582 - acc: 0.6789 - val_loss: 1.1321 - val_acc: 0.5892
Epoch 10/10
30383/30383 [==============================] - 3s 114us/step - loss: 0.9293 - acc: 0.6876 - val_loss: 0.9248 - val_acc: 0.7059
Validation accuracy:  0.7058649289099526
Test accuracy:  0.7002163857622139
```

### GRU 
#### Xây dựng mô hình
```python 

def create_gru_model():
    input_layer = Input(shape=(300,))
    
    layer = Reshape((10, 30))(input_layer)
    layer = GRU(128, activation='relu')(layer)
    layer = Dense(512, activation='relu')(layer)
    layer = Dense(512, activation='relu')(layer)
    layer = Dense(128, activation='relu')(layer)
    
    output_layer = Dense(10, activation='softmax')(layer)
    
    classifier = models.Model(input_layer, output_layer)
    
    classifier.compile(optimizer=optimizers.Adam(), loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    
    return classifier
```

#### Huấn luyện
```python 
classifier = create_gru_model()
train_model(classifier=classifier, X_data=X_data_tfidf_svd, y_data=y_data_n, X_test=X_test_tfidf_svd, y_test=y_test_n, is_neuralnet=True, n_epochs=10)

# kết quả thu được:

Train on 30383 samples, validate on 3376 samples
Epoch 1/10
30383/30383 [==============================] - 4s 144us/step - loss: 2.2465 - acc: 0.1557 - val_loss: 2.1616 - val_acc: 0.1505
Epoch 2/10
30383/30383 [==============================] - 3s 100us/step - loss: 1.7984 - acc: 0.3081 - val_loss: 1.4678 - val_acc: 0.4188
Epoch 3/10
30383/30383 [==============================] - 3s 101us/step - loss: 1.3495 - acc: 0.4750 - val_loss: 1.2717 - val_acc: 0.5193
Epoch 4/10
30383/30383 [==============================] - 3s 109us/step - loss: 1.2431 - acc: 0.5203 - val_loss: 1.2419 - val_acc: 0.5320
Epoch 5/10
30383/30383 [==============================] - 3s 95us/step - loss: 1.1760 - acc: 0.5509 - val_loss: 1.1627 - val_acc: 0.5708
Epoch 6/10
30383/30383 [==============================] - 3s 104us/step - loss: 1.1315 - acc: 0.5791 - val_loss: 1.1317 - val_acc: 0.5859
Epoch 7/10
30383/30383 [==============================] - 3s 105us/step - loss: 1.0915 - acc: 0.6021 - val_loss: 1.1042 - val_acc: 0.6093
Epoch 8/10
30383/30383 [==============================] - 3s 115us/step - loss: 1.0643 - acc: 0.6154 - val_loss: 1.0880 - val_acc: 0.6206
Epoch 9/10
30383/30383 [==============================] - 4s 118us/step - loss: 1.0413 - acc: 0.6291 - val_loss: 1.0459 - val_acc: 0.6371
Epoch 10/10
30383/30383 [==============================] - 3s 114us/step - loss: 0.9960 - acc: 0.6554 - val_loss: 1.0201 - val_acc: 0.6520
Validation accuracy:  0.6519549763033176
Test accuracy:  0.6368689575764794
```

Ở đây mình chỉ dùng 10 epochs nên kết quả còn thấp, các bạn hoàn toàn có thể huấn luyện thêm, nhận thấy rằng val_loss đang giảm, cho nên mô hình hoàn toàn có thể tốt hơn khi mình huấn luyện thêm.
### Bidirectional RNN 
#### Xây dựng mô hình
```python 
def create_brnn_model():
    input_layer = Input(shape=(300,))
    
    layer = Reshape((10, 30))(input_layer)
    layer = Bidirectional(GRU(128, activation='relu'))(layer)
    layer = Dense(512, activation='relu')(layer)
    layer = Dense(512, activation='relu')(layer)
    layer = Dense(128, activation='relu')(layer)
    
    output_layer = Dense(10, activation='softmax')(layer)
    
    classifier = models.Model(input_layer, output_layer)
    
    classifier.compile(optimizer=optimizers.Adam(), loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    
    return classifier
```

#### Huấn luyện
```python 
classifier = create_brnn_model()
train_model(classifier=classifier, X_data=X_data_tfidf_svd, y_data=y_data_n, X_test=X_test_tfidf_svd, y_test=y_test_n, is_neuralnet=True, n_epochs=20)
# kết quả thu được:

Epoch 18/20
Train on 30383 samples, validate on 3376 samples

.........................................
30383/30383 [==============================] - 5s 160us/step - loss: 0.2532 - acc: 0.9126 - val_loss: 0.3188 - val_acc: 0.8987
Epoch 19/20
30383/30383 [==============================] - 5s 160us/step - loss: 0.2438 - acc: 0.9162 - val_loss: 0.3299 - val_acc: 0.8907
Epoch 20/20
30383/30383 [==============================] - 5s 162us/step - loss: 0.2399 - acc: 0.9170 - val_loss: 0.3228 - val_acc: 0.8957
Validation accuracy:  0.8957345971563981
Test accuracy:  0.9022095170031564
```

## Recurrent Convolutional Neural Network
Mô hình mạng này khá là mới, chúng ta cùng thử nghiệm xem sao:
#### Xây dựng mô hình
```python
def create_rcnn_model():
    input_layer = Input(shape=(300,))
    
    layer = Reshape((10, 30))(input_layer)
    layer = Bidirectional(GRU(128, activation='relu', return_sequences=True))(layer)    
    layer = Convolution1D(100, 3, activation="relu")(layer)
    layer = Flatten()(layer)
    layer = Dense(512, activation='relu')(layer)
    layer = Dense(512, activation='relu')(layer)
    layer = Dense(128, activation='relu')(layer)
    
    output_layer = Dense(10, activation='softmax')(layer)
    
    classifier = models.Model(input_layer, output_layer)
    classifier.summary()
    classifier.compile(optimizer=optimizers.Adam(), loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    
    return classifier
```

#### Huấn luyện mô hình
```python 
classifier = create_rcnn_model()
train_model(classifier=classifier, X_data=X_data_tfidf_svd, y_data=y_data_n, X_test=X_test_tfidf_svd, y_test=y_test_n, is_neuralnet=True, n_epochs=20)

# kết quả thu được:
Epoch 18/20
30383/30383 [==============================] - 8s 248us/step - loss: 0.1788 - acc: 0.9377 - val_loss: 0.2999 - val_acc: 0.9097
Epoch 19/20
30383/30383 [==============================] - 7s 246us/step - loss: 0.1811 - acc: 0.9370 - val_loss: 0.2993 - val_acc: 0.9002
Epoch 20/20
30383/30383 [==============================] - 7s 245us/step - loss: 0.1688 - acc: 0.9421 - val_loss: 0.3040 - val_acc: 0.9017
Validation accuracy:  0.9016587677725119
Test accuracy:  0.9044924860540369
```

Cũng khá tốt đấy nhỉ!
## Doc2Vec Model
Đây là một mô hình tương đối hiệu quả khi áp dụng cho văn bản, chúng ta có thể thu được một vector đại diện cho một văn bản, và từ vector đó, chúng ta dùng để phân loại văn bản một cách hiệu quả, vector này có thể là mang ý nghĩa của toàn bộ văn bản.

#### Xây dựng corpus
```python
def get_corpus(documents):
    corpus = []
    
    for i in tqdm(range(len(documents))):
        doc = documents[i]
        
        words = doc.split(' ')
        tagged_document = gensim.models.doc2vec.TaggedDocument(words, [i])
        
        corpus.append(tagged_document)
        
    return corpus
    
train_corpus = get_corpus(X_data)
test_corpus = get_corpus(X_test)
```

#### Xây dựng và huấn luyện mô hình Doc2Vec
```pỵthon
model = gensim.models.doc2vec.Doc2Vec(vector_size=300, min_count=2, epochs=40)
model.build_vocab(train_corpus)

%time model.train(train_corpus, total_examples=model.corpus_count, epochs=model.epochs)
```

Sau khi xây dựng và huấn luyện mô hình, từ một văn bản, chúng ta có thể lấy vector đại diện cho văn bản đó như sau:
```python

X_data_vectors = []
for x in train_corpus:
    vector = model.infer_vector(x.words)
    X_data_vectors.append(vector)
    
X_test_vectors = []
for x in test_corpus:
    vector = model.infer_vector(x.words)
    X_test_vectors.append(vector)
```

Khi đã có được vector của văn bản, chúng ta hoàn toàn có thể áp dụng các phương pháp ở trên để phân loại văn bản. Code của phần này hoàn toàn tương tự, một ví dụ như sau:
```python
classifier = create_dnn_model()
train_model(classifier=classifier, X_data=np.array(X_data_vectors), y_data=y_data_n, X_test=(X_test_vectors), y_test=y_test_n, is_neuralnet=True, n_epochs=5)
```

Phần thử nghiệm còn lại coi như là bài tập các bạn nhé! :D

Như vậy chúng ta đã thực hiện xong bài toán phân loại văn bản. Tất nhiên còn có rất nhiều cách để cải tiến mô hình này, trên đây chỉ là cách áp dụng các mô hình cơ bản để giải quyết bài toán này. Hi vọng các bạn có thể hiểu được kha khá sau khi đọc bài viết này. Cám ơn các bạn đã theo dõi, hẹn các bạn vào bài viết lần sau.