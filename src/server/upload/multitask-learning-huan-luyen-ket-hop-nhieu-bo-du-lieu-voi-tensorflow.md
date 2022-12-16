# 1. Lời nói đầu
Bài toán multitask có thể thực hiện đồng thời nhiều task được ứng dụng nhiều trong computer vision. Ví dụ như phân tích khuôn mặt đưa ra dự đoán tuổi, cảm xúc, giới tính hay dự đoán một bông hoa là loại nào?  đã được trồng bao nhiêu năm?, .... Tuy nhiên những bài toán multitask thường yêu cầu nhiều nhãn dán trên tập dữ liệu huấn luyện mà chúng ta thường gặp khó khăn trong việc tìm được một bộ dữ liệu chứa tất cả nhãn dán mình mong muốn. Do đó trong bài này, mình giới thiệu cho các bạn mô hình ***CNN Shared Network***  được xây dựng trên framework tensorflow giúp giải quyết vấn đề thiếu dữ liệu vừa đề cập ở trên. 
# 2. Mô hình CNN Shared Network hoạt động như thế nào ?
Đầu tiên chúng ta xây dựng một tập dữ liệu huấn luyện được kết hợp từ nhiều datasets tùy mục đích sử dụng. Bộ dữ liệu kết hợp đó sẽ được đưa vào một mạng **CNN Shared Network**  rồi từ đó sẽ rẽ ra từng nhánh riêng để thực hiện những nhiệm vụ khác nhau. Số nhánh bằng số output mong muốn của mô hình. 
<br>
<p align="center">
  <img width="400" height="500" src="https://miro.medium.com/max/3688/1*rrIJOpJO8fkFECNHlwq-jQ.png">
</p>


Ưu điểm của mô hình CNN Shared Network đó là việc dùng chung một mạng giúp mô hình có thể học chung nhiều lower features từ nhiều bộ datasets khác nhau cải thiện độ chính xác đặc biệt với những task bị hạn chế về mặt dữ liệu và một mô hình có thể sử dụng cho cả classification và regression

# 3. Xây dựng mô hình multitask learning dự đoán tuổi, giới tính, nụ cười sử dụng 
Để minh họa cho tính hiệu quả của mô hình CNN Shared Network, mình xây dựng một demo dự đoán tuổi, giới tính, nụ cười dựa trên một mạng backbone BKNET.  Chi tiết về BKNET các bạn có thể xem ở [paper BKNET](https://www.researchgate.net/publication/328586470_Effective_Deep_Multi-source_Multi-task_Learning_Frameworks_for_Smile_Detection_Emotion_Recognition_and_Gender_Classification?fbclid=IwAR0Mw11DfcFSOfpqFLp4rcHuVG06TC7KG6C9mrOHXktH_8slFvSCsBMtlMk)

## 3.1. Load dữ liệu
Ở đây mình sử dụng hai datasets chính đó là [IMDB-WIKI Age & Gender Datasets](https://data.vision.ee.ethz.ch/cvl/rrothe/imdb-wiki/) và [GENKI-4K Smile Datasets](https://inc.ucsd.edu/mplab/wordpress/index.html%3Fp=398.html).  Code cụ thể việc load dữ liệu thì các bạn có thể xem ở [Multitask Age-Gender-Smile](https://github.com/buiquangmanhhp1999/Age-Gender-Smile-Multitask-Learning/blob/master/data_provider.py). Ở đây có chi tiết rất quan trọng giúp mô hình có thể nhận dữ liệu kết hợp từ nhiều datasets khác nhau. Đó là ta gán cho mỗi loại dữ liệu của một label một chỉ số **index**  để phân biệt khi xử lý dữ liệu. Index = 1 gắn cho Smile, Index = 3 gắn cho Age, Index = 4 gắn cho Gender. Ở đây mình có normalize lại dữ liệu và đưa dữ liệu về dạng one hot vector. **Lưu ý:**  chúng ta đưa dữ liệu về dạng one hot bằng số class nhiều nhất mà một label có thể có. Ví dụ ở đây age task có tối đa 7 class
thì ta lấy 7
```python
def convert_data_format(self):
    if self.trainable:
         # Smile datasets
         for i in range(len(self.smile_train) * 10):
             image = (self.smile_train[i % 3000][0] - 128.0) / 255.0
             label = utils.get_one_hot_vector(7, int(self.smile_train[i % 3000][1]))
             index = 1.0
             self.all_data.append((image, label, index))
        
        # Age datasets
        for i in range(len(self.age_train)):
             image = (self.age_train[i][0] - 128.0) / 255.0
             label = utils.get_one_hot_vector(7, int(self.age_train[i][1]))
             index = 3.0
             self.all_data.append((image, label, index))
           
        # Gender datasets
        for i in range(len(self.gender_train)):
            image = (self.gender_train[i][0] - 128.0) / 255.0
            label = utils.get_one_hot_vector(7, int(self.gender_train[i][1]))
            index = 4.0
            self.all_data.append((image, label, index))
 ```
  ## 3.2. Model
  Ở trong bài giới thiệu này, mình sử dụng [model BKNET](https://www.researchgate.net/publication/328586470_Effective_Deep_Multi-source_Multi-task_Learning_Frameworks_for_Smile_Detection_Emotion_Recognition_and_Gender_Classification?fbclid=IwAR0Mw11DfcFSOfpqFLp4rcHuVG06TC7KG6C9mrOHXktH_8slFvSCsBMtlMk) để tiến hành huấn luyện. Dữ liệu đầu tiêu được đưa vào một mạng chung gồm 4 `VGG_BLOCK` sau đó sẽ rẽ thành 3 nhánh tương ứng với 3 task: Smile branch, Gender branch, Age branch. Ở cuối mỗi nhánh ta có một bộ phân loại softmax activation giúp phân loại multiclass cho mỗi label dựa trên đặc trưng đã được trích xuất. 
 ```python
# Extract features
x = utils.VGG_ConvBlock('Block1', self.input_images, 1, 32, 2, 1, self.phase_train)
x = utils.VGG_ConvBlock('Block2', x, 32, 64, 2, 1, self.phase_train)
x = utils.VGG_ConvBlock('Block3', x, 64, 128, 2, 1, self.phase_train)
 x = utils.VGG_ConvBlock('Block4', x, 128, 256, 3, 1, self.phase_train)

# Smile branch
smile_fc1 = utils.FC('smile_fc1', x, 256, self.keep_prob)
smile_fc2 = utils.FC('smile_fc2', smile_fc1, 256, self.keep_prob)
self.y_smile_conv = utils.FC('smile_softmax', smile_fc2, 2, self.keep_prob, 'softmax')

# Gender branch
 gender_fc1 = utils.FC('gender_fc1', x, 256, self.keep_prob)
 gender_fc2 = utils.FC('gender_fc2', gender_fc1, 256, self.keep_prob)
self.y_gender_conv = utils.FC('gender_softmax', gender_fc2, 2, self.keep_prob, 'softmax')

# Age branch
age_fc1 = utils.FC('age_fc1', x, 256, self.keep_prob)
age_fc2 = utils.FC('age_fc2', age_fc1, 256, self.keep_prob)
self.y_age_conv = utils.FC('age_softmax', age_fc2, 5, self.keep_prob, 'softmax')
 ```       
## 3.3. Loss function
Để có thể huấn luyện dữ liệu kết hợp từ nhiều datasets khác nhau, việc xử lý dữ liệu trong **loss function** rất quan trọng.

Đầu tiên ta sử dụng ba mặt nạ mạng(mask) dựa trên chỉ số index được truyền vào như ta đã đề cập ở **phần 3.1**. Mặt nạ mạng giúp phân biệt từng loại dữ liệu nào được truyền vào.
```python
self.smile_mask = tf.cast(tf.equal(self.input_indexes, 1.0), tf.float32)
self.age_mask = tf.cast(tf.equal(self.input_indexes, 3.0), tf.float32)
self.gender_mask = tf.cast(tf.equal(self.input_indexes, 4.0), tf.float32)
 ```
 Sau đó chúng ta lấy input label tùy theo số class mỗi label. Ở đây smile có 2 class: `Smile, Not Smile`; Age có 5 class được chia tương ứng: `1-13, 14-23, 24-39, 40-55, 56-80` và Gender có 2 class: `Male, Female`
 ```python
self.y_smile = self.input_labels[:, :2]
self.y_age = self.input_labels[:, :5]
 self.y_gender = self.input_labels[:, :2]
 ```
Ở phần tính số dự đoán chính xác(smile_true_pred, age_true_pred, gender_true_pred) theo từng task ta cần phải nhân thêm `mask` vì trong một batch dữ liệu được truyền vào có thể gồm cả smile, age và gender, nên nhân với mask giúp lấy ra các dự đoán chính xác tương ứng theo từng task. Cuối cùng vì phần ***Model*** ta dùng softmax activation nên hàm loss ở đây là cross_entropy. **Lưu ý:  hàm tf.clip_by_value giúp loại bỏ lỗi số lớn hoặc 0 gây ra cho hàm log**
```python
# Extra variables
smile_correct_prediction = tf.equal(tf.argmax(self.y_smile_conv, 1), tf.argmax(self.y_smile,1))
age_correct_prediction = tf.equal(tf.argmax(self.y_age_conv, 1), tf.argmax(self.y_age, 1))
gender_correct_prediction = tf.equal(tf.argmax(self.y_gender_conv, 1), tf.argmax(self.y_gender, 1))

self.smile_true_pred = tf.reduce_sum(tf.cast(smile_correct_prediction, dtype=tf.float32) * self.smile_mask)
self.age_true_pred = tf.reduce_sum(tf.cast(age_correct_prediction, dtype=tf.float32) * self.age_mask)
self.gender_true_pred = tf.reduce_sum(tf.cast(gender_correct_prediction, dtype=tf.float32) * self.gender_mask)

self.smile_cross_entropy = tf.reduce_mean( tf.reduce_sum(-self.y_smile * tf.math.log(tf.clip_by_value(tf.nn.softmax(self.y_smile_conv), 1e-10, 1.0)), axis=1) * self.smile_mask)
self.age_cross_entropy = tf.reduce_mean(tf.reduce_sum(-self.y_age * tf.math.log(tf.clip_by_value(tf.nn.softmax(self.y_age_conv), 1e-10, 1.0)), axis=1) * self.age_mask)

self.gender_cross_entropy = tf.reduce_mean(tf.reduce_sum(-self.y_gender * tf.math.log(tf.clip_by_value(tf.nn.softmax(self.y_gender_conv), 1e-10, 1.0)), axis=1) * self.gender_mask)
 ```
 Cuối cùng hàm loss tổng bằng tổng các lỗi của từng task đảm bảo cân bằng giữa từng task. Việc chia ra từng loss riêng như này giúp chúng ta có thể thực hiện nhiều loại hàm loss trong một model và không bị ảnh hưởng lẫn nhau. Ở đây ta sử dụng thêm l2 regularizer nên phải thêm l2_loss vào loss tổng.
 
``` python
self.total_loss = self.smile_cross_entropy + self.gender_cross_entropy + self.l2_loss + self.age_cross_entropy
```

# 4. Kết quả
Các bạn có thể xem toàn bộ phần xử lý dữ liệu ,model training & prediction cũng như độ chính xác model của mình ở [Multitask learning Age-Gender-Smile](https://github.com/buiquangmanhhp1999/Age-Gender-Smile-Multitask-Learning). Dưới đây là một số kết quả mình đã thu được:
<p align="center">
<img  width="1400" height="400" src="https://user-images.githubusercontent.com/48142689/76433597-1e968e80-63e7-11ea-8104-79194c32a411.jpg">
</p>

Mong bài viết này giải quyết được một số vấn đề cho anh em về việc thiếu dữ liệu cũng như implement trong xây dựng model multitask. Cảm ơn mọi người đã dành thời gian đọc bài của mình

# References
* [Effective Deep Multi-source Multi-task Learning Frameworks for SmileDetection, Emotion Recognition and Gender Classiﬁcation](https://www.researchgate.net/publication/328586470_Effective_Deep_Multi-source_Multi-task_Learning_Frameworks_for_Smile_Detection_Emotion_Recognition_and_Gender_Classification?fbclid=IwAR0Mw11DfcFSOfpqFLp4rcHuVG06TC7KG6C9mrOHXktH_8slFvSCsBMtlMk)
* Dinh Viet Sang, Le Tran Bao Cuong, Pham Thai Ha, Multi-task learning for smile detection, emotion recognition and gender classification, December 2017