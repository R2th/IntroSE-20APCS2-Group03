Chào các bạn, trong bài này mình sẽ giới thiệu về API của Keras dùng để tiền xử lý dữ liệu dạng ảnh trong bài toán machine learning.

Thông thường, để load dữ liệu đầu vào, ta phải load từng ảnh rồi convert chúng thành dạng tensor/ numpy array. Hoặc khi muốn thực hiện data augmentation cũng sẽ mất khá nhiều thời gian để làm thủ công.
Với [Keras Image data preprocessing API](https://keras.io/api/preprocessing/image/), quá trình này trở nên tự động và dễ dàng hơn rất nhiều.

Cụ thể, chúng ta sẽ sử dụng class `ImageDataGenerator` của Keras
```
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
```
Đầu tiên tạo một generator cho dataset:
```
datagen = ImageDataGenerator(
            featurewise_center=False,
            samplewise_center=False,
            featurewise_std_normalization=False,
            samplewise_std_normalization=False,
            zca_whitening=False,
            zca_epsilon=1e-06,
            rotation_range=0,
            width_shift_range=0.0,
            height_shift_range=0.0,
            brightness_range=None,
            shear_range=0.0,
            zoom_range=0.0,
            channel_shift_range=0.0,
            fill_mode="nearest",
            cval=0.0,
            horizontal_flip=False,
            vertical_flip=False,
            rescale=1./255,
            preprocessing_function=None,
            data_format=None,
            validation_split=0.0,
            dtype=None,
)
```

Giải thích các tham số:
- featurewise_center/ featurewise_std_normalization (Boolean): tiến hành zerocenter normalization trên toàn bộ dataset (mean = 0, standart deviation = 1). Zero centering cải thiện perfomance và quá trình optimization của mô hình AI.
- samplewise_center/ samplewise_std_normalization (Boolean): zerocenter normalize từng sample
- zca_whitening (Boolean): thực hiện ZCA whitening
    - zca_epsilon: giá trị epsilon cho ZCA whitening. Giá trị mặc định là 1e-6.
- rotation_range (Int): giới hạn độ khi xoay hình (random rotation)
- width_shift_range/ height_shift_range: dịch chuyển hình theo chiều ngang hoặc chiều dọc (tính theo pixel nếu > 1 hoặc theo tỷ lệ phần trăm so với tổng chiều ngang/ dọc nếu < 1).
- brightness_range (Tuple hoặc list của 2 số float): range của mức độ thay đổi độ sáng
- shear_range (Float): Shear Intensity (góc tính theo độ để thực hiện shear theo chiều ngược chiều kim đồng hồ) 
- zoom_range (Float hoặc [lower, upper]): range for random zoom
- channel_shift_range (Float): range for random channel shifts.
- fill_mode (một trong 4 mode: {"constant", "nearest", "reflect", "wrap"}, mặc định là 'nearest'): cách để điền vào những pixel trống sau khi shift/ zoom hoặc shear hình ảnh. 
    - 'constant': kkkkkkkk|abcd|kkkkkkkk (cval=k) 
    - 'nearest': aaaaaaaa|abcd|dddddddd 
    - 'reflect': abcddcba|abcd|dcbaabcd 
    - 'wrap': abcdabcd|abcd|abcdabcd
- cval (Float or Int): giá trị hằng số k khi fill_mode = "constant"
- horizontal_flip/ vertical_flip (Boolean): lật hình random theo chiều ngang/ chiều dọc
- rescale: rescaling factor. Nếu đặt giá trị 0 hoặc None => không rescale, nếu ngược lại thì nó sẽ chia mỗi giá trị pixel cho giá trị được thiết lập **(sau khi tất cả các hình thức transformation khác)** 
- preprocessing_function: function mà được apply cho từng sample, nó sẽ được chạy sau khi ảnh được resize và augmented 
- validation_split (Float): tỷ lệ ảnh được giữ lại làm validation. Augmentation sẽ không được áp dụng cho validation set.

Nếu apply ZCA whitening và/ hoặc zerocenter normalization, ta cần fit generator trên vào bộ data để tính toán các số liệu cần thiết:
```
datagen.fit(x_train)
```
Đưa dataset vào mô hình theo từng batch và tiến hành̀ data augmentation theo thời gian thực: 
```
model.fit(datagen.flow(x_train, y_train, batch_size=32,
         subset='training'),
         validation_data=datagen.flow(x_train, y_train,
         batch_size=8, subset='validation'),
         steps_per_epoch=len(x_train) / 32, epochs=epochs)
```

Tóm lại, API của Keras có những ưu điểm sau:
- Đơn giản, dễ sử dụng
- Có thể feed trực tiếp vào mô hình thông qua generator
- Data augmentation on-the-fly: không lo bị giới hạn về bộ nhớ do augmentation sẽ được tiến hành đồng thời với việc đưa dữ liệu vào mô hình chứ không phải thực hiện và lưu trữ riêng. Đồng thời, hình ảnh đưa vào model qua mỗi iteration sẽ khác đi một chút giúp mô hình generalize tốt hơn, tránh overfit.

Reference:

- [Keras API docs](https://keras.io/api/preprocessing/image/)
- [How to Configure Image Data Augmentation in Keras](https://machinelearningmastery.com/how-to-configure-image-data-augmentation-when-training-deep-learning-neural-networks/)