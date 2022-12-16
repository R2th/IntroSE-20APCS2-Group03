## Giới thiệu 
Việc ứng dụng AI vào thực tế là cả một quá trình gian nan, từ việc lên ý tưởng, xử lý data, rồi thực hiện, test, phát hành. Trong mỗi bước đều có vô vàn những khó khăn phát sinh trong quá trình phát triển như việc xử lý data ( ít data, tạp nham, ,....), model hoạt động không hiệu quả, phần cứng không đủ để train model, đặc biệt là sản phẩm còn chạy trên thiết bị di động. Cũng có rất nhiều cách để khắc phục việc đó như ta xây dựng một hệ thống backend chuyên xử lý data nhận được, việc nhận và gửi kết quả đều thực hiện qua API, thiết bị chỉ gửi và nhận kết quả được xử lý từ phía backend được gửi qua API , Device nhận kết quả và hiển thị. 

Cách 2 là sử dụng những model được hỗ trợ cho device như yolo - tiny chẳng hạn, cũng đã có nhiều pages hướng dẫn làm cách đó. Sau khi đi dạo quanh các pages và làm thử thấy cũng ổn nên nay mình mạo nguội hướng dẫn các ban cách train model và sử dụng trên HĐH Android.Trong bài này mình sẽ sử dụng một thư viện là TensorflowLite dành riêng cho device, ý tưởng là ta cũng sẽ xây đựng một model và train với tập data của mình, sau đó convert model sang dạng tflite để có thể sử dụng cho device. Các bạn cũng có thể đọc thêm[ How TensorFlow Lite Optimizes Neural Networks for Mobile Machine Learning](https://heartbeat.fritz.ai/how-tensorflow-lite-optimizes-neural-networks-for-mobile-machine-learning-e6ffa7f8ee12) để biết thêm về cách hoạt động của nó.

<div align="center">
    
:speaking_head:     **---^----Let's go!!----^-----** 
</div>



![](https://images.viblo.asia/02e3c984-4c93-453e-8fae-34a480e9840a.png)

## Model
Và cũng trong bài viết này thay vì mình viết một model từ đầu thì mình sẽ sử dụng một model đã được train từ trước và mình sẽ customize lại một chút cho phù hợp với data của mình. Sau khi model đã train xong thì ta sử dụng TFLite để convert model sử dụng trên mobile. Ta sẽ sử dụng camera của máy để chụp ảnh, rồi đưa vào model để nhận diện (  repo của tensor cũng đã có code sẵn mẫu , nên mình sẽ dùng nó ).

Với tập data hiện tại có size là 320px, có tất cả là 10 class ( laptop, mouse, key,...) hoặc đơn giản các bạn có thể download luôn file model đã được train với tập data nào đó, nhưng trong bài mình sẽ tự train với data mà ta có.

```python
import os
import tensorflow as tf
import numpy

train_dir = "file_train"
validation_dir = "file_val"

image_size = 320
batch_size = 32

train_datagen = tf.keras.preprocessing.image.ImageDataGenerator()
train_generator = train_datagen.flow_from_directory(directory=train_dir, target_size=(image_size, image_size), batch_size=batch_size)

validation_datagen = tf.keras.preprocessing.image.ImageDataGenerator()
validation_generator = validation_datagen.flow_from_directory(directory=validation_dir, target_size=(image_size, image_size), batch_size=batch_size)

IMG_SHAPE = (image_size, image_size, 3)

base_model = tf.keras.applications.MobileNet(input_shape=IMG_SHAPE, include_top=False)
base_model.trainable = False
```

Nội dung đoạn code trên là ta sẽ tập ảnh (train, val)`train_dir, validation_dir`, kích thước ảnh `input_size`, model MobileNet ta sẽ load vào biến `base_model`, trong hàm `tf.keras.applications.MobileNet()` có 2 tham số, một là kích thước ảnh đầu vào `input_shape`, thứ hai là `include_top = True/False` nghĩa là có sử dụng các Fully-connected layer hay không.

Tiếp theo ta sẽ `compile` và `fit` data và bắt đầu quá trình training.

```python
model = tf.keras.Sequential([
  base_model,
  tf.keras.layers.GlobalAveragePooling2D(),
  tf.keras.layers.Dense(10, activation='softmax')
])

model.summary()

model.compile(optimizer=tf.keras.optimizers.Adam(),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

epochs = 5
steps_per_epoch = numpy.ceil(train_generator.n / batch_size)
validation_steps = numpy.ceil(validation_generator.n / batch_size)

history = model.fit_generator(generator=train_generator,
                              steps_per_epoch = steps_per_epoch,
                              epochs=epochs,
                              validation_data=validation_generator,
                              validation_steps=validation_steps)
```

Trong quá trình train model thì ta sẽ nghỉ giải lao một chút. À mà chắc có bạn thắc mắc tại sao lại lại dùng pretrain, tại sao dùng model này mà không dùng model khác thì có câu trả lời là do các mạng AlexNet, VGG, Resnet, MobileNet,... đã được train trên bộ dữ liệu ImageNet rất lớn nên có khả năng trích rút được đa dạng feature (đặc trưng ) của ảnh. Mình dùng model nào thì sử dụng pretraind của model đó, việc sử dụng pretrained đôi khi có thể giúp model của mình được tốt hơn ( không phải 100%), vì nó đã được train với số lượng lớn data rồi.

Sau khi train xong thì ta lưu model và convert nó sang TFLite
```python
saved_model_dir = '/content/TFLite'
tf.saved_model.save(model, saved_model_dir)
converter = tf.lite.TFLiteConverter.from_saved_model(saved_model_dir)
tflite_model = converter.convert()
with open('model.tflite', 'wb') as f:
    f.write(tflite_model)
```

## Android
Về cơ bản là ta đã đi qua nửa chặng đường rồi, tiếp theo là đến phần trên Device . Trong bài viết này mình sẽ clone repo example của tensorflow cho android để dùng luôn :slightly_smiling_face::slightly_smiling_face::slightly_smiling_face:

Link repo [tensorflow](https://github.com/tensorflow/examples.git) , các bạn clone về và vào folder theo đường dẫn `/examples/lite/examples/image_classification/android`. Sau khi clone xong ta sẽ copy 2 file `model.tflite` và `labels.txt` lưu vào folder `/examples/lite/examples/image_classification/android/app/src/main/assets`

Tiếp theo ta sẽ phải sửa lại một chút trong code.

1.Trong class `CameraActivity` sửa dòng 101 cho phù hợp :
```python
private Model model = Model.FLOAT_MOBILENET
```
2. Trong class `ClassifierFloatMobileNet` sửa return hàm `getModelPath() `, return file `model.tflite` mà ta đã train và được copy vào foler asset :

```python
return "model.tflite";
```
3. Đồng thời sửa hàm `getLabelPath()` :
```python
return "labels.txt";
// Định dạng label như sau:
    Clock
    Phone
    Key
```

Như các bạn thấy là tensor flow cũng đã implement hầu hết, ta chỉ việc thay đổi một chút về data cũng như model của ta vào mà thôi :relieved::relieved:.

Một số kết quả khi run trên thiết bị 

![](https://images.viblo.asia/552ed4e6-a938-4d02-abb9-1e22f1d002d3.png)

Thực tế với kết quả trên mình vẫn chưa thấy ok lắm, chắc phải xử lý lại một chút, nhưng cơ bản ta cũng có thể biết trình tự như thế .
## Bonus 
Ngoài cách tự code model và train thì có một cách khác là dùng tool [Teachable Machine](https://teachablemachine.withgoogle.com) , việc của mình là đưa hình ảnh cần train vào và train (có thể thay đổi các tham số như Epochs, Batch Size, Learning rate). Cụ thể như sau:

1. Đưa lần lượt image của mình vào , edit tên lable, lần lượt như thế.
![](https://images.viblo.asia/494f9812-6a14-42bd-a4e2-93f6bbc84586.jpg)

2. Train hiện mặc định là Epochs =50, Batch_size = 16, Learning_rate = 0.001, ta cũng có thể thay đổi nó được .
![](https://images.viblo.asia/b54fb250-cec4-461a-b45c-70cf2377eb5d.png)

3.Sau khi train xong ta có thể Export model tành các dạng Tensorflow.js, Tensorflow Lite , Tensorflow (Keras ), và nó cũng hưỡng dẫn code bên dưới 
![](https://images.viblo.asia/b0076ef8-ec42-4f6c-9196-ecaf30337b58.png)

Ngoài ra thì ta có thể xem thêm về FAQs của [ tool này](https://teachablemachine.withgoogle.com/faq) 
## Tài liệu tham khảo
1. https://medium.com/analytics-vidhya/creating-a-simple-image-classification-android-app-c663b4212ce5
2. https://github.com/tensorflow/examples.git