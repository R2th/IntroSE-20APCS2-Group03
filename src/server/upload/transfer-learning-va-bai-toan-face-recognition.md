## Giới thiệu

Trong quá trình xây dựng một mô hình học máy, chắc hẳn các bạn đã gặp phải một số vấn đề như mô hình dự đoán có độ chính xác thấp dù đã dùng một kiến trúc phức tạp, hay lượng dữ liệu quá ít để có thể huấn luyện một mô hình hoàn chỉnh. Thông thường, một mô hình có kết quả dự báo kém là do một số nguyên nhân sau

* Dữ liệu nhỏ không đại diện: Bộ dữ liệu của chúng ta có kích thước quá bé so với mô hình được huấn luyện, khiến cho mô hình không học được các đặc trưng của ảnh để giải quyết các bài toán cụ thể như phân loại, nhận dạng, …

* Mô hình mất cân bằng dữ liệu: Khi mà tập dữ liệu của chúng ta có sự chênh lệch lớn giữa các nhóm, ví dụ như chỉ có 100 ảnh cho con chó và 100.000 ảnh cho con mèo, tất nhiên mô hình sẽ “thiên vị” dự đoán nghiêng về con mèo nhiều hơn

* Kiến trúc mô hình quá phức tạp: Khi ta có bộ dữ liệu lớn tới vài trăm triệu ảnh thì tất nhiên kiến trúc mô hình phức tạp có thể mang lại độ chính xác cao. Tuy nhiên đối với những bộ dữ liệu nhỏ, vừa phải thì mô hình quá phức tạp lại đem lại độ chính xác không cao. Cần chọn kiến trúc mô hình phù hợp với lượng data chúng ta làm việc cùng 

* Quá trình tối ưu hóa gặp khó khăn: Có thể các hyperparameter được thiết lập chưa tốt như learning rate khiến cho mô hình huấn luyện lâu hội tụ hoặc chưa đạt tới điểm global optimal 

Vậy khi chúng ta có một lượng data nhỏ nhưng muốn hoàn thiện một bài toán sử dụng mô hình hoàn chỉnh, làm thế nào để mô hình đó hoạt động tốt? **Transfer Learning** có thế giải quyết điều đó.

## Transfer Learning là gì?

“**Transfer learning** là việc ứng dụng kỹ năng/tri thức mình học được từ vấn đề này (source domain – Ds), với ứng dụng này (source task – Ts) sang vấn đề khác (target domain -Dt) với ứng dụng khác (target task – Tt) có liên quan. Transfer learning nhằm cải thiện việc học hàm f(.) cho ứng dụng Tt trên miền Dt”

Nói một cách đơn giản, Chúng ta sẽ áp dụng tri thức đã được học từ một pre-trained model sang bài toán hiện tại với điều kiện 2 bài toán phải có liên quan tới nhau. Tưởng tượng xem, thay vì chạy bộ từ đầu đến cuối đường, chúng ta bắt grab đến đoạn mà grab không thể đi được thì chúng ta tự đi tiếp. Hãy hình dung sẽ ra sao nếu đoạn đường grab đi được là gần hết quãng đường mà chúng ta cần đi?

Ví dụ bạn tìm trên mạng thấy VGGFace2 có dataset tới 3.31 triệu ảnh của 9131 người, tức là trung bình mỗi người có 362 ảnh. Bài toán Nhận diện khuôn mặt người của họ sử dụng **Convolutional Neural Network (CNN)** và mô hình của họ đạt accuracy tới hơn 99%. Bài toán của bạn cũng là nhận diện khuôn mặt, tuy nhiên mỗi đối tượng bạn có chỉ khoảng 9-10 ảnh. Đây quả là thách thức lớn!

Lục lại kiến thức về mạng CNN nào, đặc trưng của mạng này là có thể lấy ra các đặc trưng của ảnh và học các đặc trưng đó. Các pre-trained model thường là các bài toán với lượng dữ liệu lớn, kiến trúc phù hợp và đem lại độ chính xác tương đối cao. Vì vậy ở đây, với bài toán Face Recognition, ta hoàn toàn có thể sử dụng phần ConvNet của VGGFace2 model vào bài toán nhận diện khuôn mặt của mình. Quá trình sử dụng pre-trained model như trên chính là Transfer Learning.

Quá trình **Transfer learning** sẽ tận dụng lại các đặc trưng được học từ pre-trained model. Kiến trúc mô hình sử dụng transfer learning bao gồm 2 phần

* Một mạng **Based network** có tác dụng trích lọc đặc trưng, based network này được trích xuất từ một phần của pre-trained model sau khi loại bỏ các top fully connected layers

* Các lớp **Fully Connected Layers** giúp giảm chiều dữ liệu và tính toán phân phối xác suất ở output. Bản chất Fully Connected Layers chính là một mạng **Multiple Layer Perceptron (MLP)** - một kiến trúc nguyên thủy nhất của thuật toán neural network. Tùy vào các bài toán cụ thể sẽ điều chỉnh số lượng các units ở output

Quá trình khởi tạo mô hình ta sẽ tận dụng các **weights** của **Based network**. Dữ liệu ảnh sau khi đi qua Based network sẽ tạo ra những đặc trưng tốt, những đặc trưng này chính là đầu vào cho mạng MLP để dự báo cho bài toán yêu cầu.

## Thử nghiệm Transfer Learning trên Python cùng Tensorflow

Để dễ hình dung các bước của transfer learning, sau đây mình sẽ thử nghiệm trên Python cùng Tensorflow nhé

**Import các thư viện cần thiết**

Ở đây mình sẽ sử dụng Based Network là **VGG16**
```python
import numpy as np
import os 
from PIL import Image
import tensorflow as tf 
from tensorflow.keras import layers
from tensorflow.keras import Model
from tensorflow.keras.applications import vgg16
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import train_test_split
```

**Load dữ liệu ảnh và các nhãn tương ứng**

Đọc dữ liệu ảnh, gán nhãn, đồng bộ kích cỡ ảnh về 1 cỡ cố định, chuyển đổi ảnh về numpy ndarray, phân loại dữ liệu ảnh thành 2 tập training và validation set
```python
folder_images = [os.path.join(data_path, f) for f in os.listdir(data_path)]
for folder in folder_images:
  id_person = int(os.path.basename(folder))
  vector_label = get_label_vector(num_classes, id_person)

  images = [os.path.join(folder, f) for f in os.listdir(folder)]
  for image in images:
    face_image = Image.open(image)

    # resize the image
    face_image = face_image.resize((img_rows, img_cols))
    face_numpy = np.array(face_image, 'uint8')

    numpy_images.append(face_numpy)
    labels.append(vector_label)

numpy_images = np.array(numpy_images)
labels = np.array(labels)

# split data
X_train, X_val, y_train, y_val = train_test_split(numpy_images, labels, test_size=0.15, random_state=42)

print(X_train.shape, y_train.shape)
print(X_val.shape, y_val.shape)
```

**Load Based Network và đóng băng các layers để không training lại các layers đó**
``` python
# load model VGG16
based_model = vgg16.VGG16(weights = 'imagenet',
                    include_top = False,
                    input_shape = (img_rows, img_cols, 3))

# Freeze layers, not training these layers
for layer in based_model.layers:
    layer.trainable = False 

# Summary model 
based_model.summary()
```
Ở đây include_top = False để loại bỏ lớp Fully Connected trên cùng.

Đây là kiến trúc Based Network
![image.png](https://images.viblo.asia/1bf3f226-f77f-4df6-86e5-cbb0e448d4fc.png)


**Xây dựng mạng MLP**

Ở đây mình dùng thử một tập dữ liệu nhỏ của tầm 19 người, tức là số classes =19. Mình tọa một mạng MLP gồm 3 lớp Fully Connected, trong đó lớp cuối cùng sẽ có số units chính là số classes. Các lớp Fully Connected treeb mình sử dụng activation ReLU, còn ở layer cuối mình sử dụng activation Softmax cho bài toán phân loại.


Đầu vào của mạng MLP chính là đầu ra của Based Network 
```python
def layer_added(output_based_network, num_classes):
  x = output_based_network
  x = layers.Flatten()(x)
  x = layers.Dense(1024, activation='relu')(x)
  x = layers.Dense(256, activation='relu')(x)
  x = layers.Dense(num_classes, activation='softmax')(x)

  return x

output_based_network = based_model.output 
output_layer = layer_added(output_based_network, num_classes)
model = Model(based_model.input, output_layer)
model.summary()
```

Đây là kiến trúc mô hình hoàn chỉnh sau khi thêm các Fully Connected layers. Có thể thấy kiến trúc mô hình đã thêm các lớp Fully Connected sao với Based Network 
![image.png](https://images.viblo.asia/fd312238-d95d-483b-a53a-550168fd53de.png)

**Compile & Fit**

Khi xây dựng được backbone của mô hình, mình sẽ compile mô hình và fit dữ liệu vào mô hình.  
``` python
# compile model 
model.compile(optimizer = tf.keras.optimizers.Adam(), 
              loss = tf.keras.losses.CategoricalCrossentropy(), 
              metrics=['acc'])    

# fit model
history = model.fit(X_train, y_train, validation_data=(X_val, y_val),
          batch_size=32, 
          epochs=20)
```

**Kết quả quá trình training với 10 epochs:**

 ![image.png](https://images.viblo.asia/3376b26f-9b90-4923-b3f3-611f0211baeb.png)
 
 ![image.png](https://images.viblo.asia/7f7a3753-1963-467a-8521-545375619fcf.png)

 
Có thể thấy kết quả tương đối tốt, train_acc và val_acc đều tăng dần tới 1, tuy loss_val vẫn còn cao tuy nhiên vẫn có xu hướng giảm. Do thời gian hạn hẹp nên mình chỉ training với 10 epochs. Các bạn có thể chạy thử với số epochs cao hơn xem kết quả thế nào nhé ^^

**Test model**

Mình thử dùng mô hình test với 1 số ảnh của những người thuộc các lớp training xem kết quả thế nào 

```python
path_test = '/content/drive/MyDrive/Colab Notebooks/data_test_fr'
test_images = [os.path.join(path_test, f) for f in os.listdir(path_test)]
for image in test_images:
    face_image = Image.open(image)
    # resize the image
    face_image = face_image.resize((img_rows, img_cols))
    face_numpy = np.array(face_image, 'uint8')
    face_numpy = [face_numpy]
    face_numpy = np.array(face_numpy)

    predict = model.predict(face_numpy/255)

    id_predict = predict[0].tolist().index(max(predict[0])) + 1
    id_true = int(os.path.basename(image).split('.')[0])
    if id_predict == id_true:
      print("True with ", max(predict[0]))
    else:
      print("False", id_predict,' with ', max(predict[0]), ' but ', id_true, predict[0][id_true-1])
```
Và cho kết quả khá tốt
 
Có thể thấy kết quả cao như vậy có thể nói phần lớn do mạng Backbone khá tốt trong việc trích xuất đặc trưng ảnh. Dễ hiểu thôi, VGG16 là mạng lớn và được training trên số lượng dữ liệu vô cùng lớn mà :D 

Cảm ơn các bạn đã đọc bài viết đầu tiên của mình. Rất mong được nghe các sự góp ý từ mọi người ^^
Nếu thấy bài viết hay và hữu ích, đừng quên upvote cho mình nhé. Thank you!




## References 

[A gentle introduction to Transfer Learning for  Deep Learning](https://machinelearningmastery.com/transfer-learning-for-deep-learning/)


[A comprehensive hands-on Guide to Transfer Learning with Real-World Applications in Deep Learning](https://towardsdatascience.com/a-comprehensive-hands-on-guide-to-transfer-learning-with-real-world-applications-in-deep-learning-212bf3b2f27a)

[Phương pháp Transfer Learning – Khanh’s Blog](https://phamdinhkhanh.github.io/2020/04/15/TransferLearning.html)


[Kĩ thuật Transfer learning và Data Augmentation ](https://nttuan8.com/bai-9-transfer-learning-va-data-augmentation/)