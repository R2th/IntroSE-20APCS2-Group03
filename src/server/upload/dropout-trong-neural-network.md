###  Một vấn để thường gặp trong xử lí network là Overfitting:

![](https://images.viblo.asia/363449ef-bc8e-4476-98b9-a450498aa5f6.jpeg)

- Trong neural network, việc cuối cùng là tối ưu các tham số để làm cho giảm loss function, nhưng đôi khi có unit thay đổi theo cách sửa lại lỗi của các unit khác dẫn đến việc hòa trộn làm giảm tính dự đoán của model, hay còn gọi là overfitting.  

- Dropout là cách thức mà chúng ta giả định một phần các unit bị ẩn đi trong quá trình training, qua đó làm giảm tích hòa trộn (hay nói cách khác là 1 hidden unit không thể dựa vào 1 unit khác để sửa lỗi lầm của nó, dễ cho chúng ta thấy các hidden unit không đáng tin cậy).

- Tại mỗi step trong quá trình training, khi thực hiện Forward Propagation (Lan truyền xuôi) đến layer sử dụng Drop-Out, thay vì tính toán tất cả unit có trên layer, tại mỗi unit ta “gieo xúc xắc” xem unit đó có được tính hay không dựa trên xác suất p

![](https://images.viblo.asia/be70e57d-d255-418f-acc9-1115f9c799f9.png)

- Cách thức hoạt động của dropout là để đạt được kết qủa trung bình của việc train nhiều mạng con trong network (bằng việc giả định ẩn đi % unit) thay vì chỉ lấy kết quả dựa trên việc train 1 mạng mẹ.

### Implement dropout theo cách đơn giản:

1. Ở đây mình có hàm forward với W1, W2, W3 là 3 nerual network layer. Việc apply dropout được áp dụng ở layer thứ 2:
````
def forward(x, W1, W2, W3, dropout, training=False):
    z1 = np.dot(x, W1)
    y1 = np.tanh(z1)

    z2 = np.dot(y1, W2)
    y2 = np.tanh(z2)

    # Dropout in layer 2
    if training:
        m2 = np.random.binomial(1, dropout, size=z2.shape)
    else:
        m2 = dropout
    y2 *= m2

    z3 = np.dot(y2, W3)
    y3 = z3 # linear output

    return y1, y2, y3, m2
````
Ở đây ta có hàm **np.random.binomial** , hàm này tạo ra random giá trị maxtrix nhằm deactive % các node mình muốn tạm dừng, nó dựa trên công thức 
![](https://images.viblo.asia/5a159afa-ec69-4fc2-ad9d-89764249c659.png)

Nó giúp tạo ra các xác xuất:
* n = số lượng case thử nghiệm 
* p = xác xuất mà bạn muốn nó xảy ra 
* size = số lần chạy thử nghiệm.

Ví dụ như khi tung xúc xắc, bạn muốn biết bao nhiêu lần bạn ra số 6:
- Thí nghiệm 1 bạn có 3 lần 6
- Thí nghiệm 2 bạn có 2 lần 6
- Thí nghiệm 3 bạn có 4 lần 6.
- Thí nghiệm P bạn có 2 lần 6.  (P ở đây chính là size )

2. Cũng tương tự với một ví dụ khác :
````
import numpy as np
X = np.array([ [0,0,1],[0,1,1],[1,0,1],[1,1,1] ])
y = np.array([[0,1,1,0]]).T
alpha,hidden_dim,dropout_percent,do_dropout = (0.5,4,0.2,True)
synapse_0 = 2*np.random.random((3,hidden_dim)) - 1
synapse_1 = 2*np.random.random((hidden_dim,1)) - 1
for j in xrange(60000):
    layer_1 = (1/(1+np.exp(-(np.dot(X,synapse_0)))))
    if(do_dropout):
        layer_1 *= np.random.binomial([np.ones((len(X),hidden_dim))],1-dropout_percent)[0] * (1.0/(1-dropout_percent))
    layer_2 = 1/(1+np.exp(-(np.dot(layer_1,synapse_1))))
    layer_2_delta = (layer_2 - y)*(layer_2*(1-layer_2))
    layer_1_delta = layer_2_delta.dot(synapse_1.T) * (layer_1 * (1-layer_1))
    synapse_1 -= (alpha * layer_1.T.dot(layer_2_delta))
    synapse_0 -= (alpha * X.T.dot(layer_1_delta))
````
- Ví dụ này cũng tương tự như trên, ở đây mình có tỉ lệ disable node là: dropout_percent, 2 input hidden là synapse_0, synapse_1, số lần lặp là 60000 lần. Sau khi có được layer_1 ta tiến hành xử lí dropout và tạo ra các giá trị delta để cập nhập các nút mạng.
3. Với Keras thì mọi thứ đơn giản hơn:
````
	model = Sequential()
	model.add(Dense(60, input_dim=60, kernel_initializer='normal', activation='relu', kernel_constraint=maxnorm(3)))
	model.add(Dropout(0.2))
	model.add(Dense(30, kernel_initializer='normal', activation='relu', kernel_constraint=maxnorm(3)))
	model.add(Dropout(0.2))
	model.add(Dense(1, kernel_initializer='normal', activation='sigmoid'))
	# Compile model
	sgd = SGD(lr=0.1, momentum=0.9, decay=0.0, nesterov=False)
	model.compile(loss='binary_crossentropy', optimizer=sgd, metrics=['accuracy'])
````
Chỉ cần pass Dropout(0.2), với 0.2 là tỉ lệ hidden unit bạn muốn train mỗi lần.
Cảm ơn các bạn đã đọc (len)