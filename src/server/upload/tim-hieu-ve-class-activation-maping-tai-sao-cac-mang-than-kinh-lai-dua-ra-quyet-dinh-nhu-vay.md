# Visualizing neural network(Trực quan hoá mạng lưới thần kinh) là gì?
Một khái niệm quá quen thuộc với deep learning đó chính là DNNs (deep neural network) , trong computer vision nó được áp dụng cực kỳ nhiều với các tác vụ như: phân loại, phát hiện, segmentation. Yep chúng ta biết DNNs đã làm điều đó, nhưng bằng cách nào, hay nói rõ hơn bên trong các layers hay nó đã xử lý để đưa ra quyết định ouput của chúng ta? 

Để hiểu rõ được điều đó mời bạn đọc tiếp, đọc đến chỗ này mà bỏ thì quá phí Nuôn :v 

Nôm na là trong vài năm trở lại đây việc nghiên cứu để hiểu neural network và mô hình hoá nó ra, hay nói cách khác là hiểu cái quần què gì đang diễn ra bên trong cái mạng đấy mà tại sao nó lại detect với phân loại được ảnh, những thông tin gì bên trong nó học được để nó ra quyết định đấy. 

Ukm nói thì hay đấy cơ mà hiểu bên trong nó hoạt động được thì có ích lợi gì, nhiều bác cứ nghĩ là lấy luôn pretrained ốp thẳng vào cho nhanh, hiểu làm gì cho mệt não đúng ko!  Nope nghĩ thế là sai đấy nhé :v 

![](https://images.viblo.asia/2e808386-3369-4906-bf12-2cf22f697682.jpg)
Bên trên mình có tập dữ liệu với ảnh giống con ếch tạm gọi là ếch xanh, và một tập test toàn là hình giống con ếch cam( bên dưới). Bạn thử nghĩ xem nếu bạn mạng tập ếch xanh ra train thì liệu mạng của bạn có học được gì đến đoán được ở dưới đấy có phải là con ếch cam hay ko? 

![](https://images.viblo.asia/85a49961-88ad-49eb-9e35-70673c6c9bef.jpg)

Khả năng đoán không đoán được khá là cao vì mạng đã xem rất nhiều những hình ảnh giống ếch xanh và thứ đập vào mắt nó nhiều nhất là cỏ xanh và nó sẽ học những features từ cỏ nhiều hơn là từ ếch (poor ếch ) :'( .

Bình thường bạn sẽ dùng một mạng thần kinh và train trên tập ếch xanh, nhưng bạn sẽ ko biết  trong quá trình training đó mạng đã và đang học được những gì hoặc nó dựa trên những đặc điểm gì để ra quyết định đó là một con ếch chả hạn. Và vì thế, trực quan hóa các mạng  thần kinh là điều vô cùng cần thiết để hiểu cái vẹo gì đang diễn ra bên trong.

Một ví dụ đơn giản nữa, Nếu ta sử dụng cho các mạng thần kinh trong tác vụ phát hiện khối u từ một tập dữ liệu hình ảnh, khi bạn trình bày kết quả cho các bên liên quan hoặc đối tác của bạn, kết quả ra tốt nuôn 99% trên tập test và loss pơ phệch. Tự dưng có một ông dở hơi đất hỡi nào hỏi, thế phần nào trong mạng của bạn đã học để đưa ra quyết định như thế và tại sao nó lại đưa ra quyết định như vậy, chả lẽ cứ cho input vào xong nó học xong nó cho ra output là xong à?. Bạn" Ơ ơ,...." , toang rồi đấy :v . Cho dù model có hoàn hảo đến đâu thì mạng người không phải là trò đùa nhé, bye bọn tớ đi tìm thằng khác, trong khi đó bạn vẫn" Ơ, ơ...." :v
# Bản đồ kích hoạt lớp (Class activation maps)
Có rất nhiều kỹ thuật để visualize network, một trong những kỹ thuật đó là sử dụng class activation maps.

## Bản đồ kích hoạt lớp là gì?
Bản đồ kích hoạt lớp là một kỹ thuật đơn giản để tìm thấy những vùng đặc biệt trên bức ảnh liên quan đến class ta cần xác định. Nói cách khác, CAM(bản đồ kích hoạt lớp) sẽ show cho ta vùng nhiệt có liên quan đến class này, giống như Như bức tranh Mona Lisa ở dưới(các vùng nhiệt đang cố gắng dự đoán và khoanh vùng những đặc điểm về người trên bức tranh) :

![](https://images.viblo.asia/99a0c720-37bd-44e1-8c95-696849a42a08.jpg)

CAM được giới thiệu trong paper [Learning Deep Features for Discriminative Localization](https://arxiv.org/abs/1512.04150)
Các tác giả của bài báo đã sử dụng Kiến trúc mạng tương tự như [GoogLeNet](https://arxiv.org/abs/1409.4842) và [Network in Network](https://arxiv.org/abs/1512.04150). Thực hiện global average pooling trên các features của các layers conv trước đó. Những features sau đó sẽ được cho vào tiếp một lớp fully-connected với hàm kích hoạt softmax, với cấu trúc đơn giản này ta sẽ xác định ra tầm quan trọng của vùng hình ảnh bằng projecting các weight của output layer lên convolutional feature maps mà đã thu được từ lớp chập cuối cùng. Kỹ thuật này được gọi là Class Activation Mapping.

![](https://images.viblo.asia/c1137449-1fde-42ab-96f2-390ff4ac801b.jpeg)

## Thử nghiệm trên tập MNIST
Oke , đến phần hay nhất rồi, học là phải thêm tý "Hành" phải ko nào.

Đầu tiên import nhẹ các thư viện cái nào
```python
import keras
from keras.datasets import mnist
import numpy as np
import matplotlib.pyplot as plt
from keras.models import Sequential,Model
from keras.layers import Dense,Conv2D,Flatten,MaxPooling2D,GlobalAveragePooling2D
from keras.utils import plot_model
from keras.models import Model
import scipy as sp
```

Dễ nhể =)) , tiếp đến là download Mnist: 
```python
(X_train, Y_train), (X_test, Y_test) = mnist.load_data()
```
Chia (train, test), chuẩn hoá và ép kiểu sang float. Để ý nhé chúng ta phải reshape như phần dưới để cho đúng với cấu trúc mạng:
```python
X_train = X_train.reshape((X_train.shape[0],X_train.shape[1],X_train.shape[2],1))
X_test = X_test.reshape((X_test.shape[0],X_test.shape[1],X_test.shape[2],1))
X_train = X_train/255
X_test  = X_test/255
X_train = X_train.astype('float')
X_test  = X_test.astype('float')
```
60000 ảnh train kích cỡ 28x28 và một chiều (tương tự vs ảnh test):
![](https://images.viblo.asia/ff484965-5823-4590-908d-07beb0bce4c6.png)

Nhìn khá đơn giản phải không chỉ có hơn 98k params, 4 lớp conv 2d đi qua GAP cuối cùng là 1 lớp Dense, nhiều bạn sẽ hỏi là sao ko có lớp max pooling nào, đơn giản là vì mỗi lần qua 1 lớp MP thì thông tin không gian sẽ bị mất cho nên mình đã loại bỏ nó, nhưng như thế đồng nghĩ với việc mạng sẽ train mất thời gian hơn
![](https://images.viblo.asia/a404e45d-64ad-489a-a347-499f54e5ccb3.png)

![](https://images.viblo.asia/8cf5973b-292a-46a9-8ec2-5b6c299a5c07.png)

Và đây là code :
```python
np.random.seed(0)
model = Sequential()
model.add(Conv2D(16,input_shape=(28,28,1),kernel_size=(3,3),activation='relu',padding='same'))

model.add(Conv2D(32,kernel_size=(3,3),activation='relu',padding='same'))

model.add(Conv2D(64,kernel_size=(3,3),activation='relu',padding='same'))

model.add(Conv2D(128,kernel_size=(3,3),activation='relu',padding='same'))
model.add(GlobalAveragePooling2D())
model.add(Dense(10,activation='softmax'))
```

Ở đây chúng ta sẽ dùng categorical_crossentropy và chia train test theo tỷ lệ 9:1
```python
model.compile(loss='sparse_categorical_crossentropy',metrics=['accuracy'],optimizer='adam')
model.fit(X_train,Y_train,batch_size=32,epochs=5,validation_split=0.1,shuffle=True)
```
Done =)) , 7 epochs và có ngay acc train: **97,42%** và val_acc: **98,18%**
![](https://images.viblo.asia/3d71bc4b-8217-40f4-8f41-612a2afc199d.png)

Tiếp theo là đánh giá model ngon hay không ngon dựa trên hàm evaluate của tf, nó sẽ show cho ra kết quả loss và acc trên tập test: 
```python
acc_test = model.evaluate(X_test, Y_test)
```
![](https://images.viblo.asia/b02bee25-a549-43d4-8463-694281e47e6e.png)

Ngon phết rồi, keras cung cấp cho ta một hàm để trả về các trọng số của lớp dưới dạng một danh sách các mảng Numpy đó là **getweights()** . 
**model.layers[-1]** là lấy lớp Dense cuối cùng ra và  **model.layers[-3]** là lấy lớp conv2D gần cuối cạnh GAP ra
```python
gap_weights = model.layers[-1].get_weights()[0]
cam_model  = Model(inputs=model.input,outputs=(model.layers[-3].output,model.layers[-1].output))
features,results = cam_model.predict(X_test)
```
Predict nào:
```python
features,results = cam_model.predict(X_test)
```

oke tất cả công đoạn đã xong giờ chúng ta sẽ cho thêm mắm thêm muốn để hiện ra kết quả nào :))

```python
for idx in range(5):
    features_for_one_img = features[idx,:,:,:]
    height_roomout = X_train.shape[1]/features_for_one_img.shape[0]
    width_roomout  = X_train.shape[2]/features_for_one_img.shape[1]
    #print(height_roomout,width_roomout)
 
    cam_features = sp.ndimage.zoom(features_for_one_img, (height_roomout, width_roomout, 1), order=2)
    pred = np.argmax(results[idx])
    
    
    plt.figure(facecolor='white')
    cam_weights = gap_weights[:,pred]
    cam_output  = np.dot(cam_features,cam_weights)

    buf = 'Predicted Class = ' +str( pred )+ ', Probability = ' + str(results[idx][pred])

    plt.xlabel(buf)
    plt.imshow(np.squeeze(X_test[idx],-1), alpha=0.5)
    plt.imshow(cam_output, cmap='jet', alpha=0.5)
    plt.show()
```

**RESULT**

![](https://images.viblo.asia/2dc7514d-670f-43b7-9094-91b17ae6f169.png)
Như các bạn có thể thấy các vùng heatmap(xanh đỏ tím vàng lam chàm tím) đều hiện lên ở bức ảnh, ta đã visualize thành công. HURAAAA!!!



# SUMMARY
Trong ví dụ  ta đã thảo luận ở trên, nếu chúng ta có thể hình dung và quan sát rằng nền của con ếch là lý do cho sự thất bại của mạng, ta có thể cải thiện tập dữ liệu đào tạo của mình bằng cách thêm nhiều hình ảnh ếch với các background khác nhau. Do đó, chúng ta có thể đạt được kết quả tốt hơn với sự trợ giúp của các kỹ thuật Visualizing Activation Heatmap

Cảm ơn các bạn đã đọc bài, nếu các bạn không hiểu chỗ nào hoặc mình có chỗ nào ko đúng thì các bạn cmt bên dưới nhá, hẹn gặp lại các bạn ở bài tiếp theo, thân ái và chào quyết thắng :v 

# Reference
1 -http://cnnlocalization.csail.mit.edu/Zhou_Learning_Deep_Features_CVPR_2016_paper.pdf

2 -https://heartbeat.fritz.ai/class-activation-maps-visualizing-neural-network-decision-making-92efa5af9a33

3 -https://towardsdatascience.com/demystifying-convolutional-neural-networks-using-class-activation-maps-fe94eda4cef1

4 -https://jacobgil.github.io/deeplearning/class-activation-maps

5 -https://medium.com/analytics-vidhya/visualizing-activation-heatmaps-using-tensorflow-5bdba018f759