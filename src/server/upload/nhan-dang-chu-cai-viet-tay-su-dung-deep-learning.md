Trí tuệ nhân tạo (Artifical Intelligent) hay học máy (Machine Learning) là một lĩnh vực đang được nhắc đến khá nhiều trong thời gian gần đây bởi tính ứng dụng của nó trong thực tiễn. Có khá nhiều ứng dụng của công nghệ học máy đã được áp dụng trong cuộc sống hàng ngày như: google dịch, xe ô tô tự lái, hệ thống gợi ý mua hàng, hệ  thống nhận diện khuôn mặt... Có bao giờ bạn thắc mắc rằng cách mà chúng được xây dựng như thế nào, công nghệ đứng sau nó là gì hay chưa? Bài viết này sẽ hướng dẫn các bạn xây dựng một hệ thống sử dụng công nghệ học máy (machine learning) từ bước đầu đến cuối (end-to-end systems) cho hệ thống nhận diện chữ cái viết tay. Mặc dù đây là một bài toán khá đơn giản, nhưng mình tin rằng nó sẽ là một bài toán phù hợp cho những người bắt đầu tiếp cận với công nghệ Machine Learning. Nào chúng ta hãy cùng bắt đầu!
# Bài toán đặt ra
Hệ thống mà chúng ta xây dựng có nhiệm vụ nhận diện và phân biệt được 26 chữ cái in hoa (uppercase) trong tiếng anh: A, B, C, ..., Z. Ứng dụng của bài toán này được sử dụng trong việc xây dựng ứng dụng chấm điểm bài thi trắc nghiệm tại đây: https://viblo.asia/p/cham-phieu-dien-trac-nghiem-bang-opencv-va-deep-learning-ByEZk9b25Q0
# Xử lý dữ liệu
Bộ dữ liệu hình ảnh mà chúng ta sử dụng trong bài toán này bao gồm hình ảnh của 26 chữ cái trong tiếng Anh từ A đến Z. Các bạn có thể tải bộ dữ liệu (82MB) ở link sau: https://www.kaggle.com/sachinpatel21/az-handwritten-alphabets-in-csv-format. Sau khi tải về và giải nén, chúng ta sẽ nhận được tệp dữ liệu định dạng CSV: **A_Z Handwritten Data.csv**, mình sẽ đổi tên file thành **hand_written.csv** cho dễ nhớ và tiện sử dụng (các bạn có thể đổi theo hoặc không).<br>
Bây giờ chúng ta bắt đầu xử lý dữ liệu bằng cách xử lý file CSV này:
```python
# import các thư viện cần thiết
import numpy as np
import csv
import matplotlib
import matplotlib.pyplot as plt
import matplotlib
import cv2

# đọc dữ liệu
with open('hand_written.csv', 'r') as csv_file:
    result = csv.reader(csv_file)
    rows = []
    
    # đọc từng dòng của file và thêm vào list rows, mỗi phần tử của list là một dòng
    for row in result:
        rows.append(row)
```

Chúng ta hãy cùng xem dữ liệu của chúng ta có gì:
```python
print(rows[100000])
# result: ['11', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '95', '155', '150', '67', '11', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '208', '255', '255', '218', '68', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '208', '255', '255', '226', '71', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '121', '231', '255', '226', '71', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '94', '224', '255', '246', '125', '25', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '94', '224', '255', '255', '206', '67', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '94', '224', '255', '255', '244', '89', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2', '180', '249', '255', '255', '170', '49', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '141', '236', '255', '255', '172', '50', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '70', '212', '255', '255', '239', '98', '3', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '19', '168', '244', '255', '255', '169', '49', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '153', '240', '255', '255', '199', '73', '2', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '153', '240', '255', '255', '255', '132', '16', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '102', '220', '255', '255', '255', '132', '16', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '3', '131', '232', '255', '255', '163', '43', '0', '0', '0', '0', '10', '29', '37', '75', '84', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '42', '190', '255', '255', '249', '167', '49', '21', '62', '103', '168', '230', '233', '246', '208', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '29', '184', '255', '255', '255', '249', '222', '214', '241', '255', '255', '255', '222', '110', '45', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '8', '113', '221', '255', '255', '255', '255', '255', '255', '255', '251', '204', '89', '21', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '4', '108', '219', '255', '255', '255', '255', '246', '186', '93', '48', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '67', '182', '230', '172', '115', '67', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']

print(np.shape(rows[100000]))
# result: (785,) 
```
Mỗi dòng đại diện cho một ảnh có kích thước 28*28, ký tự đầu tiên đại diện cho class mà ảnh đó thuộc về. 
<br>
Ví dụ:
* A là class 0
* B là class 1
* ...
* Z là class 26 <br>

Do đó độ dài của list đại diện cho mỗi dòng là 28*28 + 1 = 785.

Chúng ta hãy thử in ra một vài ảnh xem điều mà mình đã nói ở trên có đúng hay không:
```python 
letter = arr[30000]
x = np.array([int(j) for j in letter[1:]])
x = x.reshape(28, 28)

print(letter)
plt.imshow(x)

#result: ['2', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '60', '162', '255', '255', '255', '255', '255', '255', '224', '100', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '46', '77', '233', '255', '255', '255', '236', '246', '255', '255', '255', '255', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '255', '255', '255', '255', '255', '167', '65', '116', '255', '255', '255', '255', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '19', '185', '255', '255', '255', '255', '150', '3', '0', '32', '218', '255', '236', '162', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '15', '175', '255', '255', '255', '255', '155', '12', '0', '0', '0', '37', '62', '49', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '83', '185', '255', '255', '255', '227', '116', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '17', '187', '255', '255', '255', '221', '136', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '12', '168', '255', '255', '255', '236', '42', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '102', '255', '255', '255', '229', '49', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '241', '255', '255', '224', '49', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '255', '255', '255', '153', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '255', '255', '255', '153', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '255', '255', '255', '181', '14', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '153', '255', '255', '255', '51', '0', '0', '0', '0', '0', '0', '0', '0', '3', '15', '9', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '102', '255', '255', '255', '121', '0', '0', '0', '0', '0', '0', '0', '46', '144', '255', '199', '23', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '15', '212', '255', '255', '247', '124', '62', '12', '0', '0', '12', '62', '232', '255', '255', '255', '181', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '107', '255', '255', '255', '255', '255', '181', '162', '162', '181', '255', '255', '255', '255', '252', '105', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '29', '212', '255', '255', '255', '255', '255', '255', '255', '255', '255', '255', '255', '190', '88', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '121', '223', '255', '255', '255', '255', '255', '255', '255', '255', '255', '88', '19', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '40', '131', '255', '255', '255', '255', '255', '255', '162', '100', '20', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
```

Ký tự đầu tiên của list là **2**, vậy ký tự mà ta mong chờ thu được là ký tự **C**. Đúng như vậy, ảnh mà ta nhận được từ đoạn code trên là:

![](https://images.viblo.asia/6b392ad5-eb19-48a7-9061-d4cc958e8b07.png)

Để cho đơn giản và có thể ứng dụng mô hình thu được cho bài toán chấm điểm trắc nghiệm, mình sẽ chỉ xây dựng mô hình cho bốn ký tự đầu tiên của bảng chữ cái là A, B, C, D. Cách xử lý với toàn bộ 26 chữ cái có thể được thực hiện hoàn toàn tương tự.
```python
train_data = [] # dữ liệu training
train_label = [] # label của chúng

for letter in arr:
    if (letter[0] == '0') or (letter[0] == '1') or (letter[0] == '2') or (letter[0] == '3'):
        x = np.array([int(j) for j in letter[1:]])
        x = x.reshape(28, 28)
        train_data.append(x)
        train_label.append(int(letter[0]))
    else:
        break
```
Trong đoạn code trên, tôi đã lấy ra các ký tự A, B, C, D có trong tập dữ liệu của mình và lưu vào **train_data** và **train_label**. Mỗi phần tử trong **train_data** là một mảng 28 *x* 28, đại diện cho một ảnh của một ký tự. Label tương ứng của ký tự đó là một số được lưu trong **train_label**
<br>
Tổng số ảnh của 4 ký tự mà chúng ta thu được là:
```python
print(len(train_label))

#result: 56081
```
Để dữ liệu training là hoàn toàn ngẫu nhiên, không theo thứ tự xác định, chúng ta sẽ xáo trộn dữ liệu ban đầu như sau:
```python
import random

shuffle_order = list(range(56081))
random.shuffle(shuffle_order)

train_data = np.array(train_data)
train_label = np.array(train_label)

train_data = train_data[shuffle_order]
train_label = train_label[shuffle_order]
```

Để áp dụng cho bài toán Machine Learning, chúng ta chia tập dữ liệu của mình thành ba tập riêng biệt: **training set**, **test set** và **validation set**:
```python 
print(train_data.shape)
train_x = train_data[:50000]
train_y = train_label[:50000]

val_x = train_data[50000:53000]
val_y = train_label[50000:53000]

test_x = train_data[53000:]
test_y = train_label[53000:]
```
Trong đó x là dữ liệu đầu vào (input), y là label tương ứng (output).
<br>

# Xây dựng mô hình
Trong bài viết này, chúng ta sẽ sử dụng thư viện TFLearn cho việc xâu dựng mô hình học máy. Đây là một thư viện tương đối dễ sử dụng và không yêu cầu nhiều kiến thức về Machine Learning. Bạn đọc có thể sử dụng một thư viện khác tùy theo ý muốn.
<br>
* Import các module cần thiết cho việc xây dựng mô hình
```python
import tensorflow as tf
import tflearn
from tflearn.layers.conv import conv_2d, max_pool_2d
from tflearn.layers.core import input_data, dropout, fully_connected
from tflearn.layers import regression
from tflearn.data_utils import to_categorical
```

* Khởi tạo các giá trị hằng số được sử dụng trong mô hình:
```
BATCH_SIZE = 32
IMG_SIZE = 28
N_CLASSES = 4
LR = 0.001
N_EPOCHS = 50
```

Trong đó:
* BATCH_SIZE: kích thước mỗi batch dữ liệu truyền vào
* IMG_SIZE: kích thước mỗi chiều của hình ảnh đầu vào
* N_CLASSES: số lượng classes mà chúng ta cần huấn luyện (training)
* LR = 0.001: tốc độ học (learning rate)
* N_EPOCHS = 50: số lượng epoch mà chúng ta training

<br>
Mô hình mà chúng ta sử dụng ở đây bao gồm 6 lớp Convolutional layer và 2 lớp Fully Connected Layer nối tiếp nhau. Tại sao chúng ta lại sử dụng mô hình này, và tại sao mô hình này lại hiệu quả cho bài toán, mình sẽ giải thích trong bài tiếp theo. Bây giờ chúng ta hãy nhìn vào mô hình mà chúng ta xây dựng:

```python
tf.reset_default_graph()

network = input_data(shape=[None, IMG_SIZE, IMG_SIZE, 1]) #1

network = conv_2d(network, 32, 3, activation='relu') #2
network = max_pool_2d(network, 2) #3

network = conv_2d(network, 64, 3, activation='relu')
network = max_pool_2d(network, 2)

network = conv_2d(network, 32, 3, activation='relu')
network = max_pool_2d(network, 2)

network = conv_2d(network, 64, 3, activation='relu')
network = max_pool_2d(network, 2)

network = conv_2d(network, 32, 3, activation='relu')
network = max_pool_2d(network, 2)

network = conv_2d(network, 64, 3, activation='relu')
network = max_pool_2d(network, 2)

network = fully_connected(network, 1024, activation='relu') #4
network = dropout(network, 0.8) #5

network = fully_connected(network, N_CLASSES, activation='softmax')#6
network = regression(network)

model = tflearn.DNN(network) #7
```

Trong đó:
* #1: kích thước dữ liệu đầu vào là [None, IMG_SIZE, IMG_SIZE, 1]
    * None đại diện cho BATCH_SIZE
    * IMG_SIZE là kích thước mỗi chiều của ảnh
    * 1 là số dải màu của ảnh, do chúng ta sử dụng ảnh đen trắng nên chỉ có 1 dải màu, nếu chúng ta sử dụng ảnh màu thì số dải màu mà chúng ta sử dụng là 3, đại diện cho 3 dải màu RGB.
* #2: Convolutional layer
    * 32: số lượng filters
    * 3: filter size 3x3
    * Bước nhảy(stride) được mặc định là 1
    * Activation function: ReLU
* #3: Maxpool layer
    * 2: kernel size
* #4: Fully-connected layer
    * 1024: số lượng neuron
    * Activation function: ReLU
* #5: Dropout 80%
* #6: Fully-connected layer đại điện cho đầu ra (output)
    * N_CLASSES: số output đầu ra
    * Activation function: softmax (để tổng xác suất đầu ra bằng 1)
* #7: Xây dựng mô hình
<br>
Để dữ liệu đầu vào được trùng khớp với mô hình đã xây dưng, chúng ta cần phải đưa dữ liệu về định dạng phù hợp như sau:
```python
train_x = train_x.reshape(-1, IMG_SIZE, IMG_SIZE, 1)
val_x = val_x.reshape(-1, IMG_SIZE, IMG_SIZE, 1)
test_x = test_x.reshape(-1, IMG_SIZE, IMG_SIZE, 1)
```
Tương tự với label, đưa label về dạng onehot vector:
```python
original_test_y = test_y # được sử dụng để test ở bước sau

train_y = to_categorical(train_y, N_CLASSES)
val_y = to_categorical(val_y, N_CLASSES)
test_y = to_categorical(test_y, N_CLASSES)

```
Bây giờ chúng ta cùng training:
```python
model.fit(train_x, train_y, n_epoch=N_EPOCHS, validation_set=(val_x, val_y), show_metric=True)
```

Sau khi training được 67 steps, kết quả thu được như sau:
```
Training Step: 52190  | total loss: 0.23665 | time: 12.616s
| Adam | epoch: 067 | loss: 0.23665 - acc: 0.9886 -- iter: 49984/50000
Training Step: 52191  | total loss: 0.21299 | time: 13.646s
| Adam | epoch: 067 | loss: 0.21299 - acc: 0.9897 | val_loss: 0.02314 - val_acc: 0.9970 -- iter: 50000/50000
```
Đối với Validation set, độ chính xác thu được lên đến 99.70%. Vậy với tập test thì như thế nào? 
<br>
Chúng ta hãy lưu lại model đã train được như sau:
```
model.save('mymodel.tflearn')
```
# Thử nghiệm mô hình:
Load lại mô hình đã lưu:
```
model.load('/content/drive/new_hr/hr.tflearn')
```
Thử nghiệm với tập test:
```
# dự đoán với tập dữ liệu test
test_logits = model.predict(test_x)
#lấy phần tử có giá trị lớn nhất 
test_logits = np.argmax(test_logits, axis=-1)
```

Kết quả thu được là:
```python
print(np.sum(test_logits == original_test_y) / len(test_logits))
#result: 0.9964297306069458
```
Kết quả cũng khả quan đấy chứ!
# Lời kết
Bài viết đã hướng dẫn các bạn xây dựng một mô hình để nhận diện chữ cái viết tay từ bước xử lý dữ liệu đến bước xây dựng mô hình và kiểm thử mô hình thu được. Hi vọng qua bài viết này, các bạn có thể hiểu được cơ bản cách xây dựng một mô hình Machine Learning từ đầu đến cuối. Nếu có gì thắc mắc vui lòng đặt câu hỏi ở bên dưới. Cảm ơn các bạn đã đọc bài!