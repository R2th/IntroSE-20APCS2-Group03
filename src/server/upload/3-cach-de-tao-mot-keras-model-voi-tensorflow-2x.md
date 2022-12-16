## Abstract
Hiện tại, các framework deep learning đã có rất nhiều thay đổi, **Pytorch** vươn lên trở thành framework chủ đạo trong giới academic, **TensorFlow** thì vẫn giữ vị trí số 1 ở thị trường industry. Keras từ vị trí 1 python library hỗ trợ cho các framework deep learning đã trở thành API chính được Google khuyến khích sử dụng trong TensorFlow 2.x. Các viết session ở các bản 1.x cũng không còn nữa, vì vậy mình khuyến khích các bạn upgrade TensorFlow lên bản 2.x và sử dụng tensorflow.keras.

Keras và TensorFlow 2.x cung cấp cho bạn 3 cách thức để thực hiện tạo một mô hình neural network, đó là :
* Sequential API
* Functional API 
* Model subclassing 

Trong bài viết này, chúng ta sẽ cùng học cách sử dụng các phương pháp này, bao gồm cả cách chọn API phù hợp cho công việc
## Main Content
### 1. Sequential API
 ![image.png](https://images.viblo.asia/2f93c6e7-7825-44ed-b393-9ec59832a8e8.png)
Trong Sequential model, như tên gọi của nó, cho phép bạn tạo mô hình từng lớp theo kiểu từng bước.

Keras Sequential API là cách dễ nhất để khởi tọa và chạy mô hình với Keras, nhưng tất nhiên cũng có giới hạn nhất định, Khi sử dụng Keras Sequential API, bạn không thể tạo các mô hình mà có khả năng:
* Share layers
* Có nhánh (branches) (không thể hoặc rất khó khăn)
* Có nhiều đầu vào (multiple inputs)
* Có nhiều đầu ra (multiple outputs)

Một vài kiến trúc nổi tiếng có thể triển khai theo Sequential API:
* LeNet
* AlexNet
* VGGNet

Cùng đến với một đoạn code về một mạng Convolutional Neural Networo sử dụng TF 2.0 và Keras Sequential API:
```python
from tensorflow.keras.models import Sequential
from tensorflow.keras import layers
def shallownet_sequential(width, height, depth, classes):
	# initialize the model along with the input shape to be
	# "channels last" ordering
	model = Sequential()
	inputShape = (height, width, depth)

	# define the first (and only) CONV => RELU layer
	model.add(layers.Conv2D(32, (3, 3), padding="same",
		input_shape=inputShape))
	model.add(layers.Activation("relu"))

	# softmax classifier
	model.add(layers.Flatten())
	model.add(layers.Dense(classes))
	model.add(layers.Activation("softmax"))

	# return the constructed network architecture
	return model
```
Trước tiến ta sẽ cần khởi tạo một mô hình như là 1 thể hiện của lớp Sequential, sau đó ta thêm từng layer vào mô hình. Có thể thấy từng dòng trong đoạn code trên mình gọi phương thức add() để “lắp ráp” mô hình. Mỗi khi cần thêm layer, sẽ đều phải gọi phương thức add() này.

Sau cùng, bạn có thể trả về model bạn vừa ráp, để tiếp theo đó sẽ là compile & fit model.

### 2. Functional API
![image.png](https://images.viblo.asia/45ff9bff-ed8b-4225-a06c-41df21008ba5.png)
 
Mình nghĩ là sau khi bạn triển khai một vài kiến trúc mạng học sâu sử dụng Sequential API, bạn sẽ muốn làm việc với Functional API, bởi đây là cách viết mà mình thấy được khá nhiều người sử dụng.

Keras Functional API rất dễ sử dụng. Việt sử dụng Functional API có thể giúp bạn:
* Tạo mô hình phức tạp
* Đáp ứng được các bài toán nhiều đầu vào, nhiều đầu ra
* Dễ dàng định nghĩa các nhánh trong kiến trúc mô hình
* Thiết kế đồ thị xoay chiều có hướng (DAGs)
* Dễ dàng chia sẻ các lớp bên trong kiến trúc mô hình
* Đặc biệt là bất kì Sequential model nào cũng có thể triển khai bằng cách sử dụng Keras Functional API

Một vài kiến trúc nổi tiếng giúp bạn dễ hình dung hơn về Keras Functional API
* ResNet
* GoogLeNet/Inception
* Xception
* SqueezeNet

Để minh họa cho việc tạo model dạng Functional, mình sẽ mình sẽ viết lại việc xây dựng kiến trúc Resnet 50, dưới đây là mô hình Resnet 50
 ![image.png](https://images.viblo.asia/a5da8547-eca3-4e3c-a8d6-8e031be6d21c.png)
Như các bạn có thể thấy, xây dựng resnet 50 dạng Sequentail là rất khó, thậm chí là không thể, tuy nhiên việc xây dựng mô hình Resnet 50 dạng Functional lại vô cùng dễ dàng

Trước khi xây dựng kiến trúc Resnet, chúng ta cần xây dựng các blocks cần thiết cho kiến trúc Resnet, đó là conv_block và identity_block
```python
def identity_block(input_tensor, kernel_size, filters):
    filters1, filters2, filters3 = filters
    bn_axis = 3  # channel_last

    x = layers.Conv2D(filters1, (1, 1))(input_tensor)
    x = layers.BatchNormalization(axis=bn_axis)(x)
    x = layers.Activation('relu')(x)

    x = layers.Conv2D(filters2, kernel_size, padding='same')(x)
    x = layers.BatchNormalization(axis=bn_axis)(x)
    x = layers.Activation('relu')(x)

    x = layers.Conv2D(filters3, (1, 1),
                      kernel_initializer='he_normal')(x)
    x = layers.BatchNormalization(axis=bn_axis)(x)

    x = layers.add([x, input_tensor])
    x = layers.Activation('relu')(x)
    return x
```

Ở identity_block, với đầu vào sẽ được hia làm 2 nhành và cuối cùng 2 nhánh này sẽ được ộng lại để cho ra 1 output, Việc cộng nay được thể hiện ở dòng

**x = layers.add([x, input_tensor])**

Đây chính là phép gộp 2 branches làm một.
Tương tự như vậy, ta thiết kế conv_block
```python
def conv_block(input_tensor, kernel_size, filters, strides=(2, 2)):
    filters1, filters2, filters3 = filters
    bn_axis = 3  # channel_last

    x = layers.Conv2D(filters1,(1,1),strides=strides)(input_tensor)
    x = layers.BatchNormalization(axis=bn_axis)(x)
    x = layers.Activation('relu')(x)

    x = layers.Conv2D(filters2, kernel_size, padding='same')(x)
    x = layers.BatchNormalization(axis=bn_axis)(x)
    x = layers.Activation('relu')(x)

    x = layers.Conv2D(filters3, (1, 1))(x)
    x = layers.BatchNormalization(axis=bn_axis)(x)

    shortcut = layers.Conv2D(filters3,(1, 1),                                                         strides=strides)(input_tensor)
    shortcut = layers.BatchNormalization(axis=bn_axis)(shortcut)

    x = layers.add([x, shortcut])
    x = layers.Activation('relu')(x)
    return x
```
Sau khi đã xây dựng các block, ta sẽ viết model chính để kết nối 2 block trên với phần thân của model. Model chính cần có Input được khi báo.
```python
def ResNet50(classes=1000):
    bn_axis = 3  # channel_last
    img_input = layers.Input(shape=(224, 224, 3))

    x = layers.ZeroPadding2D(padding=(3, 3), name='conv1_pad')(img_input)
    x = layers.Conv2D(64, (7, 7), strides=(2, 2), padding='valid',)(x)
    x = layers.BatchNormalization(axis=bn_axis, name='bn_conv1')(x)
    x = layers.Activation('relu')(x)
    x = layers.ZeroPadding2D(padding=(1, 1), name='pool1_pad')(x)
    x = layers.MaxPooling2D((3, 3), strides=(2, 2))(x)

    x = conv_block(x, 3, [64, 64, 256], stage=2, block='a', strides=(1, 1))
    x = identity_block(x, 3, [64, 64, 256], stage=2, block='b')
    x = identity_block(x, 3, [64, 64, 256], stage=2, block='c')

    x = conv_block(x, 3, [128, 128, 512], stage=3, block='a')
    x = identity_block(x, 3, [128, 128, 512], stage=3, block='b')
    x = identity_block(x, 3, [128, 128, 512], stage=3, block='c')
    x = identity_block(x, 3, [128, 128, 512], stage=3, block='d')

    x = conv_block(x, 3, [256, 256, 1024], stage=4, block='a')
    x = identity_block(x, 3, [256, 256, 1024], stage=4, block='b')
    x = identity_block(x, 3, [256, 256, 1024], stage=4, block='c')
    x = identity_block(x, 3, [256, 256, 1024], stage=4, block='d')
    x = identity_block(x, 3, [256, 256, 1024], stage=4, block='e')
    x = identity_block(x, 3, [256, 256, 1024], stage=4, block='f')

    x = conv_block(x, 3, [512, 512, 2048], stage=5, block='a')
    x = identity_block(x, 3, [512, 512, 2048], stage=5, block='b')
    x = identity_block(x, 3, [512, 512, 2048], stage=5, block='c')

    x = layers.GlobalAveragePooling2D(name='avg_pool')(x)
    x = layers.Dense(classes, activation='softmax', name='fc1000')(x)

    # Create model.
    model = models.Model(inputs=img_input, outputs=x, name='resnet50')

    return model
```
Một số lưu ý quan trọng khi xây dựng mô hình dạng Functional:
* Cần khai báo lớp Input
* Ở cuối hàm, cần feed inputs, outputs cho mô hình. Chú ý là inputs phải có dạng Input tensor 

### 3. Model subclassing 
Đây là mô hình được coi như dành cho các nhà phát triển cấp độ cao, những người cần toàn quyền kiểm soát mô hình, lớp và quy trinhg đạo tạo. Các xây dựng kiểu này sẽ cung cấp cho bạn tất cả sự linh hoạt bạn cần.

Vì Keras sử dụng lập trình hướng đối tượng, vì vậy ta có thể phân lớp con của lớp Model, sau đó chèn định nghĩa kiến trúc của ta
Phân lớp mô hình hoàn toàn có thể tùy chỉnh và cho phép bạn triển khai mô hình tùy chình của mình, tất nhiên sẽ khá là khó sử dụng hơn so với Sequential API và Functional API

Chúng ta cùng xem xét một ví dụ đơn giản sau, chuyển đội một mô hình Sequential thành một mô hình subclass:
```python
class MiniVGGNetModel(Model):
	def __init__(self, classes, chanDim=-1):
		# call the parent constructor
		super(MiniVGGNetModel, self).__init__()

		# initialize the layers in the first (CONV => RELU) * 2 => POOL
		# layer set
		self.conv1A = Conv2D(32, (3, 3), padding="same")
		self.act1A = Activation("relu")
		self.bn1A = BatchNormalization(axis=chanDim)
		self.conv1B = Conv2D(32, (3, 3), padding="same")
		self.act1B = Activation("relu")
		self.bn1B = BatchNormalization(axis=chanDim)
		self.pool1 = MaxPooling2D(pool_size=(2, 2))

		# initialize the layers in the second (CONV => RELU) * 2 => POOL
		# layer set
		self.conv2A = Conv2D(32, (3, 3), padding="same")
		self.act2A = Activation("relu")
		self.bn2A = BatchNormalization(axis=chanDim)
		self.conv2B = Conv2D(32, (3, 3), padding="same")
		self.act2B = Activation("relu")
		self.bn2B = BatchNormalization(axis=chanDim)
		self.pool2 = MaxPooling2D(pool_size=(2, 2))

		# initialize the layers in our fully-connected layer set
		self.flatten = Flatten()
		self.dense3 = Dense(512)
		self.act3 = Activation("relu")
		self.bn3 = BatchNormalization()
		self.do3 = Dropout(0.5)

		# initialize the layers in the softmax classifier layer set
		self.dense4 = Dense(classes)
		self.softmax = Activation("softmax")
```
Các lớp của chúng ta được định nghĩa là các thuộc tính cá thể, mỗi thuộc tính có tên riêng.

Hàm ____init__ __ hoạt động như một phương thức khởi tạo. Nhờ ____init__ __, chúng tôi có thể khởi tạo các thuộc tính ( ví dụ: các lớp ) của mô hình của chúng tôi. super được sử dụng để gọi hàm tạo cha (hàm tạo trong tf.keras.Model ) và self được sử dụng để tham chiếu đến các thuộc tính cá thể ( ví dụ: các lớp ).

Sau đó, ta sẽ xác định cấu trúc liên kết/đồ thị mạng bên trọng hàm call() được sử dụng để thực hiện chuyển tiếp, hàm call() là nơi các hoạt động được xác định sau khi các lớp được xác định trong hàm __ __init__ __
```python
def call(self, inputs):
		# build the first (CONV => RELU) * 2 => POOL layer set
		x = self.conv1A(inputs)
		x = self.act1A(x)
		x = self.bn1A(x)
		x = self.conv1B(x)
		x = self.act1B(x)
		x = self.bn1B(x)
		x = self.pool1(x)

		# build the second (CONV => RELU) * 2 => POOL layer set
		x = self.conv2A(x)
		x = self.act2A(x)
		x = self.bn2A(x)
		x = self.conv2B(x)
		x = self.act2B(x)
		x = self.bn2B(x)
		x = self.pool2(x)

		# build our FC layer set
		x = self.flatten(x)
		x = self.dense3(x)
		x = self.act3(x)
		x = self.bn3(x)
		x = self.do3(x)

		# build the softmax classifier
		x = self.dense4(x)
		x = self.softmax(x)

		# return the constructed model
		return x
```
## Summary
3 kiểu này có những đặc điểm riêng, do đó cũng có những điểm mạnh điểm yếu riêng biệt:
* Sequential API: cách viết đơn giản, tuy nhiên sẽ không dựng được các shared layer (residual block chẳng hạn), không handle được multiple inputs/outputs, do đó không dựng được 1 số model như Resnet, MVCNN,…
* Functional API: cách viết có phần tương tự tensorflow graph version 1.x, tuy vậy vẫn có khả năng tạo được các model phức tạp, các layers có khả năng sharing 1 cách đơn giản. Thêm vào đó, tất cả các Sequential model đều có thể tạo được bằng Functional model.
* Model subclassing: cách viết có phần tương tự pytorch subclassing. Có khả năng viết được các model phức tạp cũng như các khả năng khác của Functional model.

Trên đây là 3 cách tạo một Keras model với TensorFlow 2.x, mà mình nghĩ ai làm về Machine Learning, Deep Learning cũng nên tìm hiểu để việc triển khai xây dựng mô hình dễ dàng hơn. 

Cảm ơn mọi người đã đọc bài viết!
## References 
1. [3 ways to create a Keras model with TensorFlow 2.0 (Sequential, Functional, and Model Subclassing) - Pyimagesearch](https://www.pyimagesearch.com/2019/10/28/3-ways-to-create-a-keras-model-with-tensorflow-2-0-sequential-functional-and-model-subclassing/)

2. [3 ways to create a Machine Learning model with Keras and TensorFlow 2.0 (Sequential, Functional, and Model Subclassing) - Towards Data Science](https://towardsdatascience.com/3-ways-to-create-a-machine-learning-model-with-keras-and-tensorflow-2-0-de09323af4d3)