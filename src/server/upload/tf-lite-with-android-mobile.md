Như các bạn đã biết việc đưa ứng dụng đến với người sử dụng thực tế là một thành công lớn trong Machine Learning.Việc làm AI nó không chỉ dừng lại ở mức nghiên cứu, tìm ra giải pháp, chứng minh một giải pháp mới,... mà quan trọng là đưa được những nghiên cứu đó vào ứng dụng thực tế, được sử dụng để giải quyết vấn đề cụ thể trong thực tế.Trong bài viết này chúng ta sẽ cùng nhau tìm hiểu cách deploy một ứng dụng AI trên điện thoại HĐH Android. Mình tạm gọi là ứng dụng nhận diện đồ vật,hiểu đơn giản là khi chụp một bức ảnh thì sẽ classification ảnh là ảnh gì. 

Để có thể sử dụng Model AI trên điện thoại thì có hai cách có thể sử dụng, một là các bạn có thể dựng Server, viết một API  cho thằng App gọi đến, truyền vào input là hình ảnh. Server xử lý xong thì trả về kết quả. Cách thứ hai là ta convert model sang dạng TF Lite đưa trực tiếp lên App xử lý trên thiết bị luôn. Với cách đầu dùng API thì mọi người có thể xem bài [Thử làm app Flutter cho nhận diện chứng minh thư](https://viblo.asia/p/thu-lam-app-flutter-cho-nhan-dien-chung-minh-thu-3Q75w1n2ZWb), một app có thể trích xuất thông tin từ CMT, cũng đã hướng dẫn mẫu cách làm, xây dựng App bằng Flutter (**chỉ sau 2 tuần tìm hiểu của tác giả** ). Và trong bài viết này mình sẽ xây dựng App với cách thứ hai, là đưa trực tiếp model lên App và xử lý trực tiếp trên điện thoại luôn. Và cũng tùy thuộc vào bài toán mà các bạn muốn áp dụng mà làm theo những cách thích hợp.

# TF Lite 
Vì đặc thù của các thiết bị như IoT, Mobile,.... là cấu hình phần cứng hạn chế,... nên không thể đưa hẳn một model AI lên App được mà cần phải xử lý để giảm kích thước của nó xuống, tiết kiệm được độ trễ xử lý, không gian bộ nhớ,.....TensorFlow Lite là phiên bản nhẹ hơn của TensorFlow cũng do Google phát triển. TensorFlow Lite được thiết kế để chạy các mô hình trên thiết bị di động và thiết bị nhúng. Như hình bên dưới đây :

![](https://images.viblo.asia/700371ca-8edc-4924-b77f-f165e407d315.png)

Và như thế là ta sẽ sử dụng Tensorflow cho việc train model, trên các thiết bị phần cứng `ngon`, có thể dùng luôn trên Colab để train mô hình, do việc train cần sức mạnh tính toán lớn. Cũng có thể thực hiện train thiết bị di động và thiết bị nhúng, nhưng sẽ tốn rất nhiều thời gian (mình cũng chưa thử train trên thiết bị xem tốn nhiều đến mức nào ). Vì vậy, mình sẽ sử dụng Tensorflow cho việc train mô hình và Tensorflow Lite được sử dụng cho việc Inference. Sau khi đã có model thì ta sẽ convert sang dạng TF Lite, đưa model đó lên điện thoại để Inference. Ngoài ra các bạn có thể đọc thêm bài [Hướng dẫn convert TF Lite không vấp lỗi :D](https://viblo.asia/p/huong-dan-convert-tf-lite-khong-vap-loi-d-vyDZO3XPZwj), tác giả cũng đã có đưa ra cách làm và thực nghiệm trên thiết bị Raspberry pi 3, và cũng có show các lỗi hay gặp khi convert.

Các bạn cũng xem thêm video về TF Lite dưới đây `TF Dev Summit '20`: 

  {@embed:https://www.youtube.com/watch?v=27Zx-4GOQA8&feature=emb_logo&ab_channel=TensorFlow}
  
  # I.Model
  ## 1. Tensorflow 
  Khi mọi người bắt đầu với AI với Tensorflow thì được recomment sử dụng các tập dữ liệu như Handwriting Datasets, Fashion-MNIST, Cifar-10, Cifar-100, Large Movie Review ( imdb_reviews ),... là những tập data được gọi là `gối đầu giường` đối với mọi người khi bắt đầu với AI, ngoài ra còn có các tập lớn như Coco, Pascal Voc,....Trong bài viết này mình sử dụng tập Cifar-10 (gồm 10 class: airplane, automobile, bird, cat, deer, dog, frog, horse, ship, truck ) để làm demo nho nhỏ. Để sử dụng data thì đã có trong Tensorflow :
  
 ```python
 import tensorflow as tf
import matplotlib.pyplot as plt
%matplotlib inline
from tensorflow.keras.datasets import cifar10

class_names=['airplane','automobile','bird','cat','deer','dog','frog','horse','ship','truck']
(X_train,Y_train),(X_test,Y_test) = cifar10.load_data()
X_train = X_train /255.0
X_test = X_test / 255.0
#print(X_train.shape) # (50000, 32, 32, 3)
#print(X_test.shape) # (10000, 32, 32, 3)
 ```
Và cũng để đơn giản mình xin build tạm một model đơn giản để train :
```python 
cifar10_model = tf.keras.models.Sequential()

cifar10_model.add(tf.keras.layers.Conv2D(filters = 32,kernel_size = 3, padding="same", activation="relu", input_shape=[32,32,3]))
cifar10_model.add(tf.keras.layers.Conv2D(filters=32,kernel_size=3,padding="same", activation="relu"))
cifar10_model.add(tf.keras.layers.MaxPool2D(pool_size=2,strides=2,padding='valid'))

cifar10_model.add(tf.keras.layers.Conv2D(filters=64,kernel_size=3,padding="same", activation="relu"))
cifar10_model.add(tf.keras.layers.Conv2D(filters=64,kernel_size=3,padding="same", activation="relu"))
cifar10_model.add(tf.keras.layers.MaxPool2D(pool_size=2,strides=2,padding='valid'))

cifar10_model.add(tf.keras.layers.Conv2D(filters=128,kernel_size=3,padding="same", activation="relu"))
cifar10_model.add(tf.keras.layers.Conv2D(filters=128,kernel_size=3,padding="same", activation="relu"))
cifar10_model.add(tf.keras.layers.MaxPool2D(pool_size=2,strides=2,padding='valid'))

cifar10_model.add(tf.keras.layers.Flatten())
cifar10_model.add(tf.keras.layers.Dropout(0.5,noise_shape=None,seed=None))
cifar10_model.add(tf.keras.layers.Dense(units=526,activation='relu'))
cifar10_model.add(tf.keras.layers.Dense(units=128,activation='relu'))
cifar10_model.add(tf.keras.layers.Dense(units=10,activation='softmax'))

cifar10_model.summary()

```

Model :
```
Model: "sequential"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
conv2d (Conv2D)              (None, 32, 32, 32)        896       
_________________________________________________________________
conv2d_1 (Conv2D)            (None, 32, 32, 32)        9248      
_________________________________________________________________
max_pooling2d (MaxPooling2D) (None, 16, 16, 32)        0         
_________________________________________________________________
conv2d_2 (Conv2D)            (None, 16, 16, 64)        18496     
_________________________________________________________________
conv2d_3 (Conv2D)            (None, 16, 16, 64)        36928     
_________________________________________________________________
max_pooling2d_1 (MaxPooling2 (None, 8, 8, 64)          0         
_________________________________________________________________
conv2d_4 (Conv2D)            (None, 8, 8, 128)         73856     
_________________________________________________________________
conv2d_5 (Conv2D)            (None, 8, 8, 128)         147584    
_________________________________________________________________
max_pooling2d_2 (MaxPooling2 (None, 4, 4, 128)         0         
_________________________________________________________________
flatten (Flatten)            (None, 2048)              0         
_________________________________________________________________
dropout (Dropout)            (None, 2048)              0         
_________________________________________________________________
dense (Dense)                (None, 526)               1077774   
_________________________________________________________________
dense_1 (Dense)              (None, 128)               67456     
_________________________________________________________________
dense_2 (Dense)              (None, 10)                1290      
=================================================================
Total params: 1,433,528
Trainable params: 1,433,528
Non-trainable params: 0
_________________________________________________________________
```

Test thử model thì ta nhận được acc ~ 80% . Vì độ acc không cao nên mình dùng VGG-16 để train vậy.

![](https://images.viblo.asia/9d647889-1086-4a94-9b64-cca8adb022e3.png)

Nhìn hình trên thì ta có thể cover lại để phù hợp với input data của mình (32,32) và output (10 class). Mình sẽ tạo lần lượt từng layer một: Input --> 2Conv2D --> MaxPooling --> 2Conv2D --> MaxPooling --> 3Conv2D --> MaxP --> ...--> Ouput.

```python

model = Sequential()
model.add(Conv2D(64,(3,3),activation='relu',input_shape=(32,32),padding='same'))
model.add(Conv2D(64,(3,3),activation='relu',padding='same'))
model.add(MaxPooling2D(pool_size=(2,2),strides=(2,2)))

model.add(Conv2D(128,(3,3),activation='relu',padding='same'))
model.add(Conv2D(128,(3,3),activation='relu',padding='same'))
model.add(MaxPooling2D(pool_size=(2,2),strides=(2,2)))

model.add(Conv2D(256,(3,3),activation='relu',padding='same'))
model.add(Conv2D(256,(3,3),activation='relu',padding='same'))
model.add(Conv2D(256,(3,3),activation='relu',padding='same'))
model.add(MaxPooling2D(pool_size=(2,2),strides=(2,2)))

model.add(Conv2D(512,(3,3),activation='relu',padding='same'))
model.add(Conv2D(512,(3,3),activation='relu',padding='same'))
model.add(Conv2D(512,(3,3),activation='relu',padding='same'))
model.add(MaxPooling2D(pool_size=(2,2),strides=(2,2)))

model.add(Conv2D(512,(3,3),activation='relu',padding='same'))
model.add(Conv2D(512,(3,3),activation='relu',padding='same'))
model.add(Conv2D(512,(3,3),activation='relu',padding='same'))
model.add(MaxPooling2D(pool_size=(2,2),strides=(2,2)))

model.add(Flatten())
model.add(Dense(4096,activation='relu'))
model.add(Dense(4096,activation='relu'))
model.add(Dense(10))
model.add(Activation('softmax'))
```
Sau khi minhg train xong thì acc tăng lên 90% (tạm vậy !!!!!! ) các bạn có thể cải thiện thêm bằng các kỹ thuật khác.... Giờ ta sẽ lưu lại model :
```python
model.save("/content/drive/MyDrive/TFLite/Cifar-10/model")
```
Và như vậy là ta đã có model cho bài toán Classifier với tập data Cifar-10. Tiếp theo là sẽ phải convert sang TF Lite.

## 2. TF Lite 
Để convert thì ta chỉ cần vài dòng code đơn giản do Tensorflow cũng đã hỗ trợ sẵn :

```python
dir = "/content/drive/MyDrive/TFLite/Cifar-10/model"
converter = tf.lite.TFLiteConverter.from_saved_model(dir)
converter.optimizations = [tf.lite.Optimize.DEFAULT]

tflite_model = converter.convert()
tflite_model_file = '/content/drive/MyDrive/TFLite/Cifar-10/converted_model.tflite'

with open(tflite_model_file, "wb") as f:
  f.write(tflite_model)
```

### Compression the Model 
Như mọi người cũng đã biết một model bình thường có hàng chục triệu đến hàng trăm triệu tham số để tính toán thì cần một lượng tài nguyên lớn, thậm chí cẩn cả đến GPU. Ngược lại với một model quá ít tham số thì khả năng học, dự đoán của model đó cũng kém, không hiệu quả. Cho nên việc compression model là việc làm rất cần thiết giúp cho model chở nên gọn nhẹ, mà vẫn giữ được độ chính xác, có thể sử dụng trong những thiết bị nhỏ gọn. Cũng có khá nhiều thuật toán để optimize như : Pruning and Quantization, Low-rank Factorization, Transferred/compact convolutional filters or Knowledge distillation,....

Trong Tensorflow Lite thì có sử dụng các cách compression :  
* Quantization
* Weight Pruning

Như trong code bên trên, các bạn để ý đến hàm `tf.lite.Optimize` như trên là mình để là `DEFAULT` ngoài ra còn có `OPTIMIZE_FOR_LATENCY`, `OPTIMIZE_FOR_SIZE` tuy nhiên từ version 2. trở lên thì nó bị `Deprecated` và hiện dùng mặc định là `DEFAULT`. 
Ngoài ra các bạn có thể đọc thêm bài viết dưới đây để biết thêm về Optimize :
1. [Compression model: Áp dụng các kỹ thuật nén để tăng hiệu năng sử dụng các mô hình deep learning(Phần 1)](https://viblo.asia/p/compression-model-ap-dung-cac-ky-thuat-nen-de-tang-hieu-nang-su-dung-cac-mo-hinh-deep-learningphan-1-Az45br0z5xY) tác giả [PhamHuuQuang](https://viblo.asia/u/QuangPH)
2. [[Deep Learning][Optimization] Neural Network Compression - All essential things You Need!](https://viblo.asia/p/deep-learningoptimization-neural-network-compression-all-essential-things-you-need-bWrZnmBbKxw?fbclid=IwAR3LRPlhguH_t5P4UHLYvMX4yzDasW7YdzA0JpeRderhOIAbBFaRRhxiBF0) tác giả [NguyenVanDat](https://viblo.asia/u/vandat2912)

### Load model TF Lite 
Và bây giờ ta đã có model dưới dạng tflife. Để thực hiện việc inferrence ta làm như sau :
```python
interpreter = tf.lite.Interpreter(model_path=tflite_model_file)
interpreter.allocate_tensors()

input_index = interpreter.get_input_details()
output_index = interpreter.get_output_details()
print(input_details)
print(output_details)
```

Với input là shape ảnh mà model có thể sử dụng, output là đầu ra của model. Ta đã train mô hình với image_size = (32, 32) và ouput là 10 class tương ứng tập Cifar-10:
```
[{'name': 'serving_default_conv2d_14_input:0', 'index': 0, 'shape': array([ 1, 32, 32,  3], dtype=int32), 'shape_signature': array([-1, 32, 32,  3], dtype=int32), 'dtype': <class 'numpy.float32'>,...]
[{'name': 'StatefulPartitionedCall:0', 'index': 33, 'shape': array([ 1, 10], dtype=int32), 'shape_signature': array([-1, 10], dtype=int32), 'dtype': <class 'numpy.float32'>,..]
```
Các bạn cũng có thể test thử với một vài image:
```python
import tensorflow as tf
import cv2
import numpy as np 
from keras.preprocessing import image

lables = {'Aeroplane':0,'Automobile':1,
          'Bird':2,'Cat':3,
          'Deer':4,'Dog':5,
          'Frog':6,'Horse':7,
          'Ship':8,'Truck':9}
          
path_img = ""
image =image.load_img(path_img,target_size =(32,32))
#img = cv2.imread(path_img)
#cv2_imshow(img)

test_image =image.img_to_array(image) 
test_image =np.expand_dims(test_image, axis =0) 

interpreter.set_tensor(input_details[0]['index'], test_image)
interpreter.invoke()
tflite_results = interpreter.get_tensor(output_details[0]['index'])

categorical = tflite_results.argmax(axis=-1)[0]
print([k for k,v in lables.items() if v == categorical][0])
```

Bước tiếp theo sau khi đã có model TF Lite thì ta sẽ đưa nó lên App Android.

# II. Android App
Về cách cài đặt Android Studio và setup môi trường thì các bạn hãy xem thêm, mình sẽ không đưa vào đây, nó cũng đơn giản thôi ( hiện tại mình đang dùng Android Studio vesion 4.1 nhé, ngoài ra có thể dùng [Android Studio Canary hoặc  Android Studio Preview](https://developer.android.com/studio/preview) cũng được, nó cũng suggest khá nhiều khi app có sử dụng Tensorflow ). Về ý tưởng của app thì mình sẽ làm 2 Activity ( màn hình ). Màn đầu có hai button cho người dùng chọn, một là chọn ảnh từ thư viện Gallery của máy, hai là sử dụng Camera để chụp hình ảnh. Tiếp theo là màn hình thứ hai sẽ show ảnh và kết quả, output của ảnh là gì, là class nào trong tập Cifar-10 mà ta đã train ở bên trên .

## Design Activity 
Ta cũng sẽ sử dụng các thẻ cơ bản, các Layout như ta thường làm. Hiện mình tạm làm như sau. Ở *activitymain.xml* thì m code như dưới đây :
```xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical">

    <TextView
        android:id="@+id/tv_top_heading"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:textAlignment="center"
        android:text="Cifar-10 Classifier"
        android:foregroundGravity="top"
        android:textColor="@color/teal_200"
        android:layout_marginTop="20dp"
        android:textSize="40sp"
        />
    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:gravity="center"
        android:orientation="vertical"
        android:layout_marginBottom="30dp">

        <Button
            android:id="@+id/b_select_from_gal"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_margin="20dp"
            android:background="@drawable/button_bg"
            android:padding="10dp"
            android:text="Select image from gallery"
            android:textSize="20sp"
            android:textAllCaps="false"
            android:textColor="@android:color/holo_blue_dark" />

        <Button
            android:id="@+id/b_select_from_cam"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_margin="20dp"
            android:padding="10dp"
            android:text="Select image from camera"
            android:background="@drawable/button_bg"
            android:textSize="20sp"
            android:textAllCaps="false"
            android:textColor="@android:color/holo_blue_dark"
            />

    </LinearLayout>

</LinearLayout>
```

Kết quả ta được màn tạm như sau :

![](https://images.viblo.asia/a62d4465-89d8-4c20-9e83-950cba75ae29.png)

Tiếp đến là màn gọi là ResultActivity thì cũng tương tự cách code, mọi người có thể tìm hiểu thêm, dưới đây là kết quả code của mình :

![](https://images.viblo.asia/7e866148-f282-49f3-b18a-7d8b95d2cbef.png)

Về giao diện thì mình code tạm như thế. Tiếp đến là ta sẽ phải xin quyền Read, Camera trong AndroidManifest.xml :

```xml
 <uses-permission android:name="android.permission.CAMERA" />
 <uses-feature android:name="android.hardware.camera" />
```
Và điều quan trọng là để sử dụng được Tensorflow trong Android thì ta phải config trong file *build.gradle (app)*, trong thẻ android ta thêm :
```xml
android{
  aaptOptions {
        noCompress "tflite"
        noCompress "lite"
    }
}
```

Trong *dependencies* ta thêm plugin:

```xml
dependencies {
    implementation 'org.tensorflow:tensorflow-lite:0.0.0-nightly'
}
```

Tiếp theo ta create một folder là **/app/src/main/assets**, ta sẽ đưa **model tflite đã convert** được bên trên và file **lable.txt** có ghi tên 10 class của tập Cifar-10. Dưới đây mình có thêm file định dạng text thôi, chứ nó chỉ cần 2 file tflite, label.txt là được .

![](https://images.viblo.asia/d5f5fe27-23a8-4f98-a5a5-8d37711ca50e.png)

## Code
Luồng xử lý như hình dưới đây :

![](https://images.viblo.asia/56cf10a3-51ad-4c95-ad01-e0aa5a25a416.png)


Đầu tiên thì ta sẽ tạo một class **Classifier.java** chuyên xử lý input, output, load model, load label từ asset. Tạo một contructor truyền vào các tham số :
```java 

public class Classifier {
        private AssetManager assetManager;
        private String modelPath;
        private String labelPath;
        private List<String> labelList;
        private int inputSize = 32;
        private Interpreter interpreter;
     
        public Classifier(AssetManager assetManager, String modelPath, String labelPath, int inputSize) {
            this.assetManager = assetManager;
            this.modelPath = modelPath;
            this.labelPath = labelPath;
            this.inputSize = inputSize;
    }
    
     class Recognition{
        private String id = "";
        private String title = "";
        private float confidence = 0f;

        public Recognition(String id, String title, float confidence) {
            this.id = id;
            this.title = title;
            this.confidence = confidence;
        }

        @Override
        public String toString() {
            return "Pred:{" +
                    "title=" + title +
                    ", confidence=" + confidence +
                    '}';
        }
    }
}
```
Trong class thì ta cũng tạo các fun cho từng nhiệm vụ :

```java 
 public void init() throws IOException {
        Interpreter.Options options= new Interpreter.Options();
        options.setNumThreads(5);
        options.setUseNNAPI(true);
        
        # Load model vào bộ nhớ và khởi tạo 
        interpreter = new Interpreter(loadModelFile(assetManager, modelPath),options);
        labelList = loadLabelList(assetManager, labelPath);
    }
    
   private List<String> loadLabelList(AssetManager assetManager, String labelPath) throws IOException {
        List<String> labelList = new ArrayList<>();
        BufferedReader reader = new BufferedReader(new InputStreamReader(assetManager.open(labelPath)));
        String line;
        while ((line = reader.readLine()) != null) {
            labelList.add(line);
        }
        reader.close();
        return labelList;
    }
    
    
     private static MappedByteBuffer loadModelFile(AssetManager assetManager, String modelPath) {
        AssetFileDescriptor fileDescriptor = null;
        try {
            fileDescriptor = assetManager.openFd(modelPath);
            FileInputStream inputStream = new FileInputStream(fileDescriptor.getFileDescriptor());
            FileChannel fileChannel = inputStream.getChannel();
            long startOffset = fileDescriptor.getStartOffset();
            long declaredLength = fileDescriptor.getDeclaredLength();
            return fileChannel.map(FileChannel.MapMode.READ_ONLY, startOffset, declaredLength);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
```

Trong hàm init() bên trên có dùng *Interpreter.Options()* với mục đích là controller thời gian chạy interpreter, số lượng Thread được sử dụng, xem thêm tại đây 

Do input size của ảnh phù hợp với model bên trên ta sẽ phải resize lại kích thước ảnh trước khi ta đưa nó vào model. Vì trong Android để thể hiện ảnh thì có lớp Bitmap, mỗi một điểm ảnh trong Bitmap là một số nguyên đại diện cho một màu của 4 kênh màu là **Alpha, Red, Green, Blue**, cái input đầu vào của model là image với 3 kênh RGB và chuyển sang dạng Byte Buffer.
```java
private static ByteBuffer comvertBitmapToByteBuffer(Bitmap bitmap) {
        # Resize hình ảnh về size (32, 32) để đưa vào model
        bitmap = Bitmap.createScaledBitmap(bitmap, INPUT_SIZE, INPUT_SIZE, false);
        
        # Convert bitmap sang ByteBuffer
        ByteBuffer byteBuffer = ByteBuffer.allocateDirect(4 * INPUT_SIZE * INPUT_SIZE * 3);
        byteBuffer.order(ByteOrder.nativeOrder());
        int[] intValues =new int[INPUT_SIZE * INPUT_SIZE];

        # Lấy kênh màu RGB của bitmap 
        bitmap.getPixels(intValues, 0, bitmap.getWidth(), 0, 0, bitmap.getWidth(), bitmap.getHeight());
        int pixel = 0;
        for (int i=0; i< INPUT_SIZE; i++) {
            for (int j=0; j<INPUT_SIZE; j++) {
                int input = intValues[pixel++];

                byteBuffer.putFloat((((input>>16  & 0xFF) - IMAGE_MEAN) / IMAGE_STD)); # Red
                byteBuffer.putFloat((((input>>8 & 0xFF) - IMAGE_MEAN) / IMAGE_STD)); # Green
                byteBuffer.putFloat((((input & 0xFF) - IMAGE_MEAN) / IMAGE_STD));   # Blue 
            }
        }
        return byteBuffer;
    }
```

Chuyển sang MainActivity chính ta sẽ phải setOnClick hai button mà ta đã nói bên trên, trước hết là ta sẽ phải create initClassifier ngay trong onCreate():
```java

 private static final int MY_CAMERA_REQUEST_CODE = 100;
 private static Classifier classifier;
 Button btn_From_Gra;
 Button btn_From_Cam;
    
  @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        try {
            initClassifier();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        # Set Button Id 
        ......
   }
   
 private void initClassifier() throws IOException {
        classifier = new Classifier(getAssets(),"converted_model.tflite","label.txt",32);
        classifier.init();
    }

```

Gửi image sang màn ResultActivity để show kết quả nhận được :

```java
 @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        switch (requestCode) {
            case 0: //select from camera
                if (resultCode == RESULT_OK) {
                    Bitmap bitmap = (Bitmap) data.getExtras().get("data");
                    startActivity(new Intent(this, ResultActivity.class).putExtra("image-bitmap", bitmap));
                }
                break;
            case 1: //select from gallery
                if (resultCode == RESULT_OK) {
                    Uri imageUri = data.getData();
                    startActivity(new Intent(this, ResultActivity.class).putExtra("image-uri", imageUri));
                }
                break;
        }
    }
```

Trong màn ResultActivity ta cũng sẽ sử dụng Intent để lấy image mà màn Main đã gửi sang :

```java
        # Trong onCreate()
        Intent intent = getIntent();
        Bitmap imageBitmap = intent.getParcelableExtra("image-bitmap");

        if(imageBitmap!= null) {
            imView.setImageBitmap(imageBitmap);
        }
        else{
            Uri imageUri = intent.getParcelableExtra("image-uri");
            imView.setImageURI(imageUri);
        }
        try {
            Bitmap image = ((BitmapDrawable) ((ImageView) imView).getDrawable()).getBitmap();
            List<Classifier.Recognition> result = classifier.recognzeImage(image);
            tvRes.setText(result.toString());
        }
        catch (Exception e){
            tvRes.setText("Can't find the image!");
        }
```

Và sau khi đã có image thì ta sẽ show kết quả ra TextView:

```java
  private void changeImage(Bitmap bitmap) {
        progressLayout.setVisibility(View.VISIBLE);
        tvRes.setVisibility(View.GONE);
        imView.setImageBitmap(bitmap);

        List<Classifier.Recognition> result = classifier.recognzeImage(bitmap);
        
        tvRes.setText(result.toString());
        tvRes.setVisibility(View.VISIBLE);
        progressLayout.setVisibility(View.GONE);
    }
```
Build App kết quả tạm thời hiện tại như video dưới đây:


{@vimeo: https://player.vimeo.com/video/508701133}


Ngoài ra các bạn cũng xem hướng dẫn trong bài [Recognize Flowers with TensorFlow Lite on Android](https://codelabs.developers.google.com/codelabs/recognize-flowers-with-tensorflow-on-android#0) để xem thêm cách làm khác. Trong bài viết tới nếu có time mình sẽ làm App Real time Recognize trên Mobile và có thể sẽ dùng thêm [OpenGL](https://www.youtube.com/watch?v=f3Cr8Yx3GGA&ab_channel=ThinMatrix) để show thêm animation của output, thậm chí cả [AR ](https://developers.google.com/ar/develop/java/scene-viewer) hãy upvote + follow nhé.

# Tài liệu tham khảo 
1. https://www.tensorflow.org/lite/guide/inference
2. https://codelabs.developers.google.com/codelabs/recognize-flowers-with-tensorflow-on-android
3. https://towardsdatascience.com/step-by-step-vgg16-implementation-in-keras-for-beginners-a833c686ae6c
4. https://www.tensorflow.org/lite/examples
5. https://heartbeat.fritz.ai/image-recognition-for-android-with-a-custom-tensorflow-lite-model-6418186ecc0e
6. https://awesomeopensource.com/projects/tensorflow-lite