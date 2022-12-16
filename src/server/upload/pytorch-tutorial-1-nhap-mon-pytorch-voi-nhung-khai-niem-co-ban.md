Xin chào các bạn. Với những bạn đang tìm hiểu và làm việc về Deep Leanring thì framework Pytorch không còn xa lạ nữa. PyTorch là một Neural Network Dynamic Framework. Nói đến tính động Dynamic thì cũng sẽ có các Framwork được gọi là Static Neural Network Framework như Tensorflow, Keras, Theano ... và điểm khác biệt cơ bản giữa chúng nằm ở hai điểm sau:

* Trong các **Static Framework** thì đồ thị tính toán (computation graph)) được định nghĩa trước, sau đó được compile và tiến hành ném các mẫu dữ liệu qua đồ thị để tính toán. Bạn có thể tưởng tượng điều này giống như một người làm đường ống nước. Trước tiên anh ta sẽ phải xây dựng đường ống và các van liên kết các đường ống (tương tự như xây dựng kiến trúc một mạng nơ ron) và sau đó anh ta mới đổ nước vào đường ống (tương tự như việc fit dữ liệu vào mô hình)
* Còn đối với một **Dynamic Framework** thì sao. Nó sẽ không thực hiện việc khởi tạo graph trước mà sẽ tiến hành chạy ngay khi bạn fit dữ liệu vào trong mô hình. Sẽ không có các thao tác biên dịch khiến cho việc tính toán được thực hiện nhanh chóng. 

Một trong những ưu điểm dễ thấy nhất của Pytorch đó là việc nó rất gần với ngôn ngữ Python mà không phải đưa vào các khái niệm về Graph, Session phức tạp. Điều này khiến cho các bạn chuyển đổi từ các package khác (nhất là bạn nào quen sử dụng Numpy) sang Pytorch một cách dễ dàng hơn. Do không còn dựa trên Graph nên việc debug có thể thực hiện trực tiếp trong mô hình mà không cần phải khởi tạo một Session giống như trong TF 1.X. Và đó cũng chính là hướng tiếp cận mà TF 2.X đang hướng tới. Thực sự giúp cho các developer thuận tiện hơn trong quá trình học và sử dụng Framework. Ở bài này chúng ta sẽ bắt đầu với các ví dụ đơn giản trong việc sử dụng Pytorch nhé. OK chúng ta bắt đầu thôi 

![](https://images.viblo.asia/1f01d2da-2d22-46af-b638-242e32b37955.png)

# Khái niệm về Tensors
## Xử lý MLP với Numpy 
Tensor là một khái niệm cơ bản trong Deep Learning. Nó được sủ dụng để thể hiện các ma trận, mảng nhiều chiều (thường là lớn hơn 2 chiều). PyTorch là một framework về Deep Learning thì đường nhiên không thể không based trên Tensor rồi. Tuy nhiên trước khi tìm hiểu khái niệm này được xử lý thế nào trong Pytorch thì chungs ta hãy cùng nhau thực hiện một ví dụ đơn giản với một package quen thuộc trong xử lý dữ liệu đó chính là Numpy để thấy được các cách tính toán với Tensor. 

![](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/NumPy_logo.svg/1200px-NumPy_logo.svg.png)

Trong thư viện Numpy, chúng ta có thể thực hiện nhiều thao tác với mảng nhiều chiều. Có thể viết trực tiếp các hàm activation function cũng như tính toán các đạo hàm. Như vậy chúng ta hoàn toán của thể thực hiện việc training các mạng đơn giản như MLP bằng Numpy Dưới đây chúng ta sẽ xây dựng một MLP đơn giản với 2 hidden layer và thực hiện các thao tác forward, tính toán hàm loss, backward bằng Numpy nhé. Các bạn có thể hình dung kiến trúc của MLP trong hình sau:

![](https://images.deepai.org/glossary-terms/49157de013394ab7a36022759a55b6aa/multipercep.jpg)

Giờ thì code thôi: 
* **Import thư viện**:
```python 
import numpy as np
```
* **Khởi tạo dữ liệu random**
```python 
n, input_dim, hidden_dim, output_dim = 64, 784, 100, 10

# Create random input and output data
x = np.random.randn(n, input_dim)
y = np.random.randn(n, output_dim)
```
* **Khởi tạo weight random**
```pytrhon 
# Randomly initialize weights
w1 = np.random.randn(input_dim, hidden_dim)
w2 = np.random.randn(hidden_dim, output_dim)
```
* **Khởi tạo learning rate**
```python 
learning_rate = 1e-6
```
* **Khởi tạo quá trình forward**

```python 
# Loop for 100 epochs
for i in range(500):
    # Forward pass: compute predicted y
    h = x.dot(w1)
    h_relu = np.maximum(h, 0)
    y_pred = h_relu.dot(w2)

    # Compute and print loss
    loss = np.square(y_pred - y).sum()
    print(i, loss)
```

* **Tiến hành quá trình backward**
Vãn tiếp tục trong vòng for trên chúng ta tiến hành quá trình tính toán đạo hàm cho từng layer và thực hiện gradient descent để cập nhật trong số. 

```python 
    # Backprop to compute gradients of w1 and w2 with respect to loss
    grad_y_pred = 2.0 * (y_pred - y)
    grad_w2 = h_relu.T.dot(grad_y_pred)
    grad_h_relu = grad_y_pred.dot(w2.T)
    grad_h = grad_h_relu.copy()
    grad_h[h < 0] = 0
    grad_w1 = x.T.dot(grad_h)

    # Update weights
    w1 -= learning_rate * grad_w1
    w2 -= learning_rate * grad_w2
```
* **Kết quả chạy**

```python 
Epoch 334 loss = 0.007659277493960106
Epoch 335 loss = 0.007318882365965462
Epoch 336 loss = 0.006993647426368092
Epoch 337 loss = 0.006682912079723925
Epoch 338 loss = 0.006386000771141572
Epoch 339 loss = 0.006102330948624104
```

Việc sử dụng numpy để xây dựng một mạng nơ ron có một nhược điểm lớn đó là không thể tận dụng được GPU để tính toán cho các phép toán trên ma trận khiến cho quá trình training trở nên lâu hơn rất nhiều. Hơn nữa có một module rất quan trọng trong PyTorch bên cạnh việc tính toán ma trận đó là việc  **Automatic differentiation** giúp cho quá trình tính toán đạo hàm trở nên dễ dàng hơn. Giờ chúng ta cùng chuyển quá PyTorch xem sao nhé 

## Xây dựng MLP với Pytorch 
### Điểm khác biệt của PyTorch Tensor 

Tensor trong Pytorch cũng có dạng y hệt như n-dimentional array của Numpy nhưng được add thêm vào đó một số tính năng hữu ích trong quá trình training với nhiều function được operate trên nó. Việc casting giữa các device khác nhau như CPU và GPU khiến cho việc tính toán trên Tensor được dễ dàng hơn. Ngoài ra, tensor trong Pytorch còn được sử dụng trong việc track đồ thị tính toán và gradients cùng nhiều công cụ hữu ích khác 

![](https://miro.medium.com/max/891/0*jGB1CGQ9HdeUwlgB)

Giờ chúng ta sẽ thử define lại mạng trên một cách thủ công nhưng không dùng Numpy Array mà sử dụng Torch Tensor nhé. 

* **Import torch**
```python 
import torch
```
* **Define data tensors**
```python 
n, input_dim, hidden_dim, output_dim = 64, 784, 100, 10

# Create random input and output data
x = torch.randn(n, input_dim)
y = torch.randn(n, output_dim)
```
* **Define weight tensor**
```python 
# Randomly initialize weights
w1 = torch.randn(input_dim, hidden_dim)
w2 = torch.randn(hidden_dim, output_dim)
```
* **Training process**
```python 
learning_rate = 1e-6

for t in range(500):
    # Forward pass: compute predicted y
    h = x.mm(w1)
    h_relu = h.clamp(min=0)
    y_pred = h_relu.mm(w2)

    # Compute and print loss
    loss = (y_pred - y).pow(2).sum()
    if t % 100 == 99:
        print(t, loss)

    # Backprop to compute gradients of w1 and w2 with respect to loss
    grad_y_pred = 2.0 * (y_pred - y)
    grad_w2 = h_relu.t().mm(grad_y_pred)
    grad_h_relu = grad_y_pred.mm(w2.t())
    grad_h = grad_h_relu.clone()
    grad_h[h < 0] = 0
    grad_w1 = x.t().mm(grad_h)

    # Update weights using gradient descent
    w1 -= learning_rate * grad_w1
    w2 -= learning_rate * grad_w2
```
* **Kết quả**

```python 
99 1442.7469362142501
199 13.328768673383937
299 0.26145767173260204
399 0.008008871590855948
```

Chúng ta thấy rằng việc tính toán cũng không khác gì so với việc sử dụng Numpy. Đây cũng chính là ly do mình đã nói ngay từ đầu bài viết là PyTorch sẽ là một Framwork rất phù hợp cho các bạn đã quen sử dụng với Numpy trước đó rồi. Tiếp theo chúng ta sẽ đi tìm heiuer một module rất quan trọng trong PyTorch đó chính là **AutoGrad**

# Khái niệm về AutoGrad 

NẾu như các bạn mới chỉ độc hai ví dụ phía trên thì chắc hẳn các bạn sẽ thấy hơi bị **ngợp** với những tính toán. Việc này vừa nhàm chán vừa dễ bị sai nữa. Các bạn thấy không, chỉ với một mạng neural 2 lớp ẩn đơn giản như trên thôi mà việc tính toán qsu trình forward cũng như backward đã mất quá ư nhiều code của các bạn rồi chứ nói gì đến các mạng **siêu to khổng lồ** cỡ vài trăm triệu thậm chí vài tỷ tham số thì tính toán sao đây. Đây chính là lúc mà **AutoGrad** phát hiuy hiệu quả của nó. Như các bạn đã biết các thao tác tính toán trong qus trình backward của một mạng nơn ron đều dựa trên một quy tắc đó là **Chain Rule** hay đạo hàm của hàm hợp. Và module AutoGrad được sinh ra để giải quyết vấn đề tính toán đạo hàm phức tạp đó 

![](https://i.ytimg.com/vi/ma2KXWblllc/maxresdefault.jpg)

PyTorch sử dụng [automatic differentiation](https://en.wikipedia.org/wiki/Automatic_differentiation) trong module **Autograd**. Trong quá trình forward sẽ định nghĩa đồ thị tính toán với các node là các **Tensors** và các cạnh sẽ là các function tính toán giá trị của Tensor đầu ra khi đưa vào Input Tensor. Quá trình **Backpropagating** cũng được tính toán thông qua biểu đồ này cho phép bạn dễ dàng tính toán giá trị của đạo hàm. Bây giờ chúng ta sẽ sử dụng autograd để xây dựng mạng 2 lớp nói trên xem có dễ dàng hơn không nhé. 

* **Require grad cho weights tensor**
```python 
# Randomly initialize weights
w1 = torch.randn(input_dim, hidden_dim, requires_grad=True)
w2 = torch.randn(hidden_dim, output_dim, requires_grad=True)
```
* **Training sử dụng autograd**
```python 
for t in range(500):
    # Forward 
    y_pred = x.mm(w1).clamp(min=0).mm(w2)

    # Compute loss 
    loss = (y_pred - y).pow(2).sum()
    
    if t % 100 == 99:
        print(t, loss.item())

    # backward 
    loss.backward()

    # Update gradident 
    with torch.no_grad():
        w1 -= learning_rate * w1.grad
        w2 -= learning_rate * w2.grad
        
        # Manually zero the gradients after updating weights
        w1.grad.zero_()
        w2.grad.zero_()
```

* **Kết quả**

```python 
99 1283.6190185546875
199 14.63010311126709
299 0.3335697054862976
399 0.010790261439979076
499 0.0006669819122180343
```

# Sử dụng Neural Network Module
Trong PyTorch có một module mà bạn sẽ phải sử dụng rất nhiều đó chính là **Neural Network Module**. Nếu hiểu đơn giản việc xây dựng một mạng nơ ron là sắp xếp các layers, định nghĩa các learnable parameter và sử dụng đạo hàm để tối ưu các tham số đó theo hàm loss mà ta muốn thì việc sử dụng `nn` module sẽ giúp cho ta thực hiện các công việc đó ở mức **high-level** tức ở mức tổng quát nhất, dễ dàng nhất. Nó tương tự với các package như Keras, Tensorflow Slim với Tensorflow. Trong `nn` pcakage định nghĩa nhiều **modules** nhỏ gần như tương đương với các loại layers trong một mạng nơ ron. Một modules sẽ nhận đầu vào và đầu ra đều là các tensor. Module `nn` cũng định nghĩa các loss function phổ biến thường được sử dụng trong khi xây dựng một mạng nơ ron. 

Sau đây là ví dụ việc sử dụng `nn` module để xây dựng một mạng nơ ron 2 lớp ẩn:

```python 
N, D_in, H, D_out = 64, 1000, 100, 10

x = torch.randn(N, D_in)
y = torch.randn(N, D_out)

model = torch.nn.Sequential(
    torch.nn.Linear(D_in, H),
    torch.nn.ReLU(),
    torch.nn.Linear(H, D_out),
)
```

chúng ta có thể thấy `Sequential` module khá giống với Keras. Ý tưởng chung của chúng là như vậy tuy nhiên sử dụng PyTorch còn còn thế giúp chúng ta tùy biến nhiều hơn thế nữa bằng việc kế thừa lại `torch.Module`. Chúng ta tiến hành training thử mạng trên 

```python 
loss_fn = torch.nn.MSELoss(reduction='sum')

learning_rate = 1e-4

for t in range(500):
    y_pred = model(x)
    loss = loss_fn(y_pred, y)
    
    if t % 100 == 99:
        print(t, loss.item())

    # Zero the gradients before running the backward pass.
    model.zero_grad()
    loss.backward()

    with torch.no_grad():
        for param in model.parameters():
            param -= learning_rate * param.grad
```

Chúng ta thấy việc cập nhật tham số vẫn được thực hiện cách thủ công và điều này thực sự là không cần thiết. PyTorch hỗ trợ sắn cho chúng ta  một module để thực hiện điều này đó chính là module `optim` chúng ta sẽ tìm hiểu nó trong phần tiếp theo 


# Sử dụng module optim 

Như đã trình bày ở phía trên thì việc tối ưu các trọng số trong khi traininig một mạng nơ ron thì không cần phải làm thủ công như thế. Thực tế là có rất nhiều các loại optimizers khác có nhiều cách cập nhật trong số khác chứ không chỉ đơn giản như cách cập nhật phía trên (của SGD). Có thể kế đến như AdaGrad, RMSProp, Adam .... 

Module `optim` được sinh ra để giải quyết vấn đề đó. Nó được implement sẵn nhiều optimizers thường được sử dụng khi training một mạng nơ ron. Chúng ta có thể training lại mạng nơ ron định nghĩa phía trên bằng module này như sau 

```python 
optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate)

for t in range(500):
    y_pred = model(x)

    # Compute and print loss.
    loss = loss_fn(y_pred, y)
    
    if t % 100 == 99:
        print(t, loss.item())

    optimizer.zero_grad()

    # Backward pass: compute gradient of the loss with respect to model
    # parameters
    loss.backward()

    # Calling the step function on an Optimizer makes an update to its
    # parameters
    optimizer.step()
```

Câu truyện trở nên đơn giản hơn rât snhieuef với chỉ một câu lệnh `optimizer.step()`. 
# Viết custom module với nn.Module 
Như chúng ta đã thấy ở phía trên thì việc định nghĩa một model đang khá đơn giản. Tuy nhiên khi thiết kế một mạng nơ ron với nhiều layers, nhiều kết nối, nhiều thành phần custom thì cần sử dụng cách khác đó chính là `nn.Module`. Chúng ta tham khảo mạng 2 lớp phía trên được viết lại như sau 

```python 
class TwoLayerNet(torch.nn.Module):
    def __init__(self, D_in, H, D_out):
        """
        In the constructor we instantiate two nn.Linear modules and assign them as
        member variables.
        """
        super(TwoLayerNet, self).__init__()
        self.linear1 = torch.nn.Linear(D_in, H)
        self.linear2 = torch.nn.Linear(H, D_out)

    def forward(self, x):
        """
        In the forward function we accept a Tensor of input data and we must return
        a Tensor of output data. We can use Modules defined in the constructor as
        well as arbitrary operators on Tensors.
        """
        h_relu = self.linear1(x).clamp(min=0)
        y_pred = self.linear2(h_relu)
        return y_pred
```

Như chúng ta đã thấy, việc định nghĩa theo kiểu kế thừa lại `nn.Module` sẽ giúp chúng ta dễ dàng custom kiến trúc của mạng hơn bằng việc xử lý các Tensor trong hàm `forward`. Lúc này việc khai báo model tương đương với việc khởi tạo instance của class trên 

```python 
model = TwoLayerNet(D_in, H, D_out)
```

# Tổng kết 

Trên đây là các thành phần cơ bản để implement một mạng nơ ron với PyTorch. Các bạn nên thực hành nhiều hơn với các tập dữ liệu đươn giản để hiểu kĩ hơn nhé. Hẹn gặp lại các bạn trong các bài viết sau