Tiếp nỗi chuỗi các bài viết về các kiến thức mình tự học để trau dồi kiến thức cho bản thân, hôm nay mình xin giới thiệu tới các bạn một công cụ vô cùng hữu ích trong giới học máy. ONNX thì thực chất trên Viblo đã có một bài viết của tác giả Bùi Quang Mạnh đã nói rất chi tiết [ở đây](https://viblo.asia/p/chuyen-doi-mo-hinh-hoc-sau-ve-onnx-bWrZnz4vZxw). Tuy nhiên từ khóa về ONNX trên Viblo chưa thực sự có nhiều bài viết bổ trợ, đồng thời mình cũng hay dùng Tensorflow nhiều hơn, và mình nghỉ cũng sẽ có một số bạn giống mình (Trong khi đó bài viết của tác giả Mạnh là Tutorial với Pytorch cơ :v). Nói chung bằng rất rất nhiều lý do, cùng với việc mình tìm hiểu thì mình xin phép chia sẻ bài viết này. Rất mong nhận được sự ủng hộ và góp ý từ mọi người

# ONNX là gì?
Tiếp nối lời kết của tác giá Bùi Quang Mạnh: “Có một câu mình rất thích "Mô hình ở trên paper mãi là mô hình chết", việc ứng dụng các mô hình ngày càng trở nên được quan tâm hơn bao giờ hết đồng nghĩa để phát triển được thì các kỹ năng về Engineer là vô cùng cần thiết bên cạnh các kiến thức khác”

ONNX là một Machine Learning framework được sử dụng để chuyển đổi giữa các Machine Learning framework khác nhau. Giả sử bạn đang nghiên cứu, đào tào mô hình với Pytorch, tuy nhiên khi triển khai thành sản phẩm, bạn lại chỉ tìm thấy các công cụ hỗ trợ Tensorflow, TFLite, … Chả nhẽ mình ngồi code lại? Nope, ONNX sinh ra để giúp bạn giải quyết những vấn đề này. ONNX được phát triển bởi cộng đồng các đối tác như Microsoft, Facebook và AWS

ONNX đóng vai trò trung gian trong việc chuyển đổi từ framework này tới framework kia một cách dễ dàng. Hiện tại thì ONNX hỗ trợ các framework phổ biến như Tensorflow, Pytorch, Scikit-learn, …

ONNX được hỗ trợ rộng rãi, nó cho phép khả năng tương tác giữa các frameworks khác nhau và làm “hợp lý hóa” con đường đi từ nghiên cứu tới sản phẩm, điều này góp phần thúc đẩy tốc độ tăng trưởng của cộng đồng AI. NÓ giải quyết được các bài toán nan giải về sự phụ thuộc phần cứng đối với các mô hình AI.

# Tutorial ONNX với Tensorflow 
Về lý thuyết ONNX thì mình chỉ tìm hiểu được như vậy, cái mình chú trọng nhiều hơn là cách vận dụng nó. Đầu tiên, mình sẽ thực hiện việc convert một Tensorflow model sang ONNX nhé

Trước hết, cần cài đặt các thư viện cần thiết cho việc chuyển đổi.
> !pip install tf2onnx

> pip install onnxruntime 

Tf2onnx là thư viện giúp cho quá trình convert từ TF model sang ONNX một cách dễ dàng hơn, còn onnxruntime là thư viện phục vụ cho quá trình Inference của ONNX

## Đào tạo mô hình
Trước hết, khởi tạo một mô hình Deep Learning đơn giản bằng Tensorflow. Ở đây mình sử dụng MNIST dataset, tương ứng sẽ là bài toán phân loại. Kiến trúc mô hình sẽ tương đối đơn giản:
```Python
model = tf.keras.models.Sequential([
    tf.keras.layers.Input(shape=(28, 28), name='input'),
    tf.keras.layers.LSTM(20, time_major=False, return_sequences=True),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(10, activation='softmax', name='output')
])
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
model.summary()
```
  ![image.png](https://images.viblo.asia/b813fac8-fd91-463b-b12b-10f455b729e9.png)

Load dataset 
```Python
# Load MNIST dataset.
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0
x_train = x_train.astype(np.float32)
x_test = x_test.astype(np.float32)
```

Compile model và fit dữ liệu thôi
```Python
EPOCHS=50
BATCH_SIZE=64
model.fit(x_train, y_train, epochs=EPOCHS, batch_size=BATCH_SIZE)
model.evaluate(x_test, y_test, verbose=0)

model.save(MODEL_TF_DIR)
```
## Convert model sang ONNX
Sau khi đã đào tạo và lưu mô hình, việc tiếp theo tất nhiên chúng ta sẽ tiến hành convert mô hình sang ONNX
```Python
import tf2onnx
import onnx

onnx_model, _ = tf2onnx.convert.from_keras(model, opset=13)
onnx.save(onnx_model, MODEL_TF2ONNX_DIR)
```

Ngắn gọn nhỉ, để mình giải thích chút về các tham số. 
* model: Mô hình đã huấn luyện. Có thể khởi tạo bằng tf.keras.models.load_model()
* opset: Để định danh version của tf2onnx
* MODEL_TF2ONNX_DIR: nơi chúng ta sẽ chứa ONNX model. Định dạng kiểu /dest/model.onnx

Ngoài ra, các bạn có thể convert mô hình sang ONNX bằng Command theo cấu trúc sau:
> !python -m tf2onnx.convert --saved-model $MODEL_TF_DIR --output $MODEL_TF2ONNX_DIR --opset 13

Trong đó MODEL_TF_DIR là đường dẫn tới mô hình đã lưu

## Kiểm tra mô hình sau chuyển đổi
Để kiếm thử ONNX, một công cụ rất hữu ích là ONNX Runtime. Đây là bộ công cụ giúp cho việc Training và Inference mô hình ML trên các nền tảng một cách nhanh hơn.
```Python
Import onnxruntime as ort

sess = ort.InferenceSession(MODEL_TF2ONNX_DIR)
input_name = sess.get_inputs()[0].name
label_name = sess.get_outputs()[0].name

result = sess.run([label_name], {input_name:x_test})  
```
Trong quá trình Inferences thì việc định hình đúng đầu vào và đầu ra là vô cùng quan trọng. Làm theo hướng dẫn của trang chủ ONNXRuntime mà mình cũng loay hoay fix bug mãi. Thay vì họ get_inputs().name với get_outputs().name thì họ viết luôn tên ra. Đối với người mới thì chả hiểu kiểu gì =))) 

 
# Tutorial ONNX với Scikit-learn
Đầu tiên, vẫn là phải cài đặt thư viện cần thiết cho việc convert, ở đây là skl2onnx
> !pip install skl2onnx
## Đào tạo mô hình
Ở đây, mình sử đụng mô hình RandomForestClassifier và IRIS dataset của Sklearn luôn cho tiện
```Python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

iris = load_iris()
X, y = iris.data, iris.target
X_train, X_test, y_train, y_test = train_test_split(X, y)
clr = RandomForestClassifier()
clr.fit(X_train, y_train)
```

## Convert model 
Việc chuyển đổi cũng tương đối đơn giản, nếu bạn đã hiểu phần trên rồi thì phần này sẽ tương đối dễ dàng 
```Python
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType

# convert model
initial_type = [('float_input', FloatTensorType([None, 4]))]
onx = convert_sklearn(clr, initial_types=initial_type)

# save model
with open("/content/rf_iris.onnx", "wb") as f:
    f.write(onx.SerializeToString())
```

## Kiểm tra mô hình sau khi chuyển đổi
Bởi việc kiểm thử vẫn dùng ONNXRuntime, vì vậy, không có gì khác biệt so với phần kiểm tra mô hình như trên
```Python
sess = rt.InferenceSession("/content/rf_iris.onnx")
input_name = sess.get_inputs()[0].name
label_name = sess.get_outputs()[0].name
pred_onx = sess.run([label_name], {input_name: X_test.astype(numpy.float32)})
```

# Lời kết
Trên đây là các thử nghiệm mình thực hiện với ONNX, cùng gặp phải 1 số vấn đề tuy nhiên đã fix được nên mới dám chia sẻ lên đây :v. Toàn bộ Code mình thử nghiệm mình để [ở đây](https://colab.research.google.com/drive/15oJH-3tN13FCCT7CW8Bfnna_4GJW7w1i?usp=sharing). Mình nghĩ khi động vào 1 dự án cụ thể sẽ còn nhiều vấn đề hơn bởi thử nghiệm của mình là vô cùng đơn giản. Bởi vậy mình rất mong nhận được những đóng góp, nhận xét, đánh giá từ mọi người. 

Một lần nữa cảm ơn mọi người đã đọc tới những dòng cuối này ^^

# Inferences 
* [Getting started converting Tensorflow to ONNX ](https://onnxruntime.ai/docs/tutorials/tf-get-started.html )
* [Sklearn-onnx: Convert your scikit-learn model int ONNX ](http://onnx.ai/sklearn-onnx/ )