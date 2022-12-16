## Giới thiệu
Như chúng ta đã biết trong MachineLearning có bài toán Supervised learning là bài toán cơ bản nhất trong machine learning. Ta muốn dự đoán về một nhãn (label) y nào đó của quan sát (input) x . Khi train, model sẽ được dạy để dự đoán các nhãn này. Supervised learning có hai dạng chính: classification và regression. Với classification thì nhãn y là một giá trị rời rạc (đoán xem con mèo hay con chó, đồ vật gì). Ngược lại, nhãn y trong regression là một gía trị liên tục (số thực) (đoán xem con chó này nặng bao nhiêu kg hay như giá nhà đất).
Sau đây mình xin giới thiệu bài toán dạng classifier trong nhận diện cảm xúc khuôn mặt.
## Dataset
Với tập dữ liệu hiện tại mình sử dụng bao gồm 5 class tương ứng với 5 cảm xúc của khuôn mặt như: vui, buồn, tức giận, ngạc nhiên, bình thường.Ta hãy xem thử data như thế nào:
![](https://images.viblo.asia/d13b3136-2482-49e8-a52f-94fc586ed097.png)
Mở thử folder Angry với gần 4k image:
<div align="center">

![](https://images.viblo.asia/9d6c1185-b438-4210-a9de-d9af73a3104b.png)
</div>
Folder Happy:
<div align="center">

![](https://images.viblo.asia/2d30cb60-a80c-4727-882b-978563c6ac43.png)
</div>




## Models
Ta import thư viện cần thiết cho việc build models :
```
import keras
from keras.preprocessing.image import ImageDataGenerator
from keras.models import Sequential
from keras.layers import Dense,Dropout,Activation,Flatten,BatchNormalization
from keras.layers import Conv2D,MaxPooling2D
from keras.optimizers import RMSprop,SGD,Adam
from keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
import os
```
Với data như trên ta sẽ có output class = 5 tương ứng với 5 trạng thái cảm xúc của khuôn mặt. Kích thước của ảnh đã được rezise với cùng size = 48 pixel cùng channel =1.Ta cũng ImageDataGenerator một chút:
```
train_datagen = ImageDataGenerator(
					rescale=1./255,
					rotation_range=30,
					shear_range=0.3,
					zoom_range=0.3,
					width_shift_range=0.4,
					height_shift_range=0.4,
					horizontal_flip=True,
					fill_mode='nearest')

validation_datagen = ImageDataGenerator(rescale=1./255)
```
Tiếp tục sử dụng những hàm quen thuộc trong Keras , ta xây dựng một models như sau,các bạn có thể custom model or thử models khác cũng ok:
```
model = Sequential()
# Block-1
model.add(Conv2D(32(3,3),padding='same',kernel_initializer='he_normal',input_shap=(48,48,1)))
model.add(Activation('relu'))
model.add(BatchNormalization())
model.add(Conv2D(32,(3,3),padding='same',kernel_initializer='he_normal',input_shape=(48,48,1)))
model.add(Activation('relu'))
model.add(BatchNormalization())
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Dropout(0.2))

# Block-2 
model.add(Conv2D(64,(3,3),padding='same',kernel_initializer='he_normal'))
model.add(Activation('relu'))
model.add(BatchNormalization())
model.add(Conv2D(64,(3,3),padding='same',kernel_initializer='he_normal'))
model.add(Activation('relu'))
model.add(BatchNormalization())
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Dropout(0.2))

# Block-3
model.add(Conv2D(128,(3,3),padding='same',kernel_initializer='he_normal'))
model.add(Activation('relu'))
model.add(BatchNormalization())
model.add(Conv2D(128,(3,3),padding='same',kernel_initializer='he_normal'))
model.add(Activation('relu'))
model.add(BatchNormalization())
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Dropout(0.2))

# Block-4 
model.add(Conv2D(256,(3,3),padding='same',kernel_initializer='he_normal'))
model.add(Activation('relu'))
model.add(BatchNormalization())
model.add(Conv2D(256,(3,3),padding='same',kernel_initializer='he_normal'))
model.add(Activation('relu'))
model.add(BatchNormalization())
model.add(MaxPooling2D(pool_size=(2,2)))
model.add(Dropout(0.2))

# Block-5
model.add(Flatten())
model.add(Dense(64,kernel_initializer='he_normal'))
model.add(Activation('relu'))
model.add(BatchNormalization())
model.add(Dropout(0.5))

# Block-6
model.add(Dense(64,kernel_initializer='he_normal'))
model.add(Activation('relu'))
model.add(BatchNormalization())
model.add(Dropout(0.5))

# Block-7
model.add(Dense(num_classes,kernel_initializer='he_normal'))
model.add(Activation('softmax'))
```
:grinning: Nếu cứ model.add() như trên thì hơi vất vả, nhưng mới đầu với mình làm như thế cho dễ hình dung, còn có cách khai báo khác ngắn gọn hơn thì các bạn tự search vậy:joy: .
Sau đó ta compile:
```
model.compile(loss='categorical_crossentropy',
              optimizer = Adam(lr=0.001),
              metrics=['accuracy'])
```
Sau khi train xong ta dùng opencv với file *haarcascadefrontalfacedefault.xml* để get ra vị trí khuôn mặt, rồi load_model ta vừa train bên trên để dự đoán xem cảm xúc của khuôn mặt là gì:
```
face_classifier = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
classifier = load_model('model.h5')

img = cv2.imread(filename, flags=cv2.IMREAD_COLOR)
gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
faces = face_classifier.detectMultiScale(gray,1.3,5)

for (x,y,w,h) in faces:
    cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
    roi_gray = gray[y:y+h,x:x+w]
    roi_gray = cv2.resize(roi_gray,(48,48),interpolation=cv2.INTER_AREA)

    if np.sum([roi_gray])!=0:
        roi = roi_gray.astype('float')/255.0
        roi = img_to_array(roi)
        roi = np.expand_dims(roi,axis=0)

        preds = classifier.predict(roi)[0]
        label=class_labels[preds.argmax()]
        label_position = (x,y)
        cv2.putText(img,label,label_position,cv2.FONT_HERSHEY_SIMPLEX,1,(0,255,0),2)
    else:
        cv2.putText(img,'No Face Found',(20,60),cv2.FONT_HERSHEY_SIMPLEX,2,(0,255,0),3)
```
## Kết quả
Sau khi train ta có được các đặc trưng của tập data, bây giờ ta sẽ thử test xem model có dự đoán như thế nào với các ảnh mới :
Test một vài bức ảnh trong film của idol Châu Tinh Trì :blush::
<div align="center">

![](https://images.viblo.asia/cbcf3afc-c9ad-45cb-baab-0d256722f261.png)
</div>
Tiếp theo là vẻ đẹp của Chu Ân:

![](https://images.viblo.asia/7bb2cc84-2d5e-4e54-8d15-d076654530e4.png)

Và **Sư Tử Hống**:

![](https://images.viblo.asia/772cc77a-23f0-4bc0-891a-094cf1f2f025.png)

Tuy nhiên cũng có một số ảnh predict chưa chính xác như:
![](https://images.viblo.asia/07c80215-631c-4cc5-b7cd-02d25acd9947.png)Cách khắc phục ta có thể làm là thêm data or dựng lại model để đự đoán ảnh chính xác hơn.
## Tóm lại
Machine learning có hai quá trình là train và test. Train là khi bạn huấn luyện model bằng một tập data có sẵn. Bạn cho model nhìn thấy các đặc trưng trong tập này nhiều lần và dạy nó dự đoán những gì bạn muốn nó dự đoán. Sau khi train, bạn sẽ test xem model có thật sự “học” được gì hay không bằng cách cho nó dự đoán trên các tập data trong một tập khác, chưa hề được nhìn thấy. Nếu model thật sự có thể dự đoán trên tập data chưa hề được nhìn thấy, tức là nó có khả năng học được một khái niệm trừu tượng gì đó từ việc huấn luyện. Còn không, cho dù model dự đoán rất tốt các quan sát khi train, thì nó chỉ “học vẹt” và cố nhớ hết những gì được dạy mà thôi. Chúng ta có thể hiểu nôm na là như vậy.
## Tài liệu tham khảo
1. https://keras.io/
2. https://docs.opencv.org/2.4/index.html