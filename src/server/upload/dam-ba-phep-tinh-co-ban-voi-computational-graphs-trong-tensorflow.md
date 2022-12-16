Mình lại quay trở lại với series [Machine Learning, Deep Learning cho người bắt đầu](https://viblo.asia/s/machine-learning-deep-learning-cho-nguoi-bat-dau-vElaBkkY5kw)

Trong bài này mình xin được giới thiệu tới các bạn cái thứ tên là TensorFlow :)

Theo [Wiki](https://vi.wikipedia.org/wiki/TensorFlow), "TensorFlow là một thư viện phần mềm mã nguồn mở dành cho máy học trong nhiều loại hình tác vụ nhận thức và hiểu ngôn ngữ". 
Ngoài ra, TensorFlow còn được dùng để training/inference machine learning model có thể sử dụng cho cả nghiên cứu và sản phẩm. TensorFlow được ghép bởi 2 từ Tensor và Flow. Tensor đại diện cho giá trị các biến, Flow là dòng chảy. TensorFlow mang hàm ý là dòng chảy các giá trị trong Graph. Và trái tim của TensorFlow chính là Computational Graph.
![](https://images.viblo.asia/86e22baf-3089-4984-b459-8bdcdbb65959.jpeg)
## Computational Graphs
![](https://images.viblo.asia/6782bcc7-b40a-42a4-9656-9178429b9484.jpeg)
Computational Graph tương tự một Graph thông thường gồm nhiều đỉnh và các cạnh. Nó dùng để biểu diễn các phép tính toán dựa trên ngôn ngữ của Graph.

* Đỉnh (Node) đại diện cho biến đầu vào, phép tính toán

* Các cạnh (Edge) đại điện cho dữ liệu truyền bên trong Graph

![](https://images.viblo.asia/80dac774-23c8-4b94-a16b-6113135ca5e8.png)
 Graph đại hiện cho phép toán (x+y)*z
* Khởi tạo Graph trên TensorFlow

  Một chú ý quan trọng khi sử dụng TensorFlow: Chúng ta phải khởi tạo đầy đủ Graph trước khi đổ giá trị của các node(Tensor) vào trong Graph. Điều này sẽ làm bạn đôi khi không quen lúc mới bắt đầu.
  
    *   tf.Graph
    
         Hầu hết các ứng dụng TensorFlow (TF) đều được khởi chạy bằng việc tạo ra Computation Graph như đã nhắc ở bên trên. Trong quá trình này, TF sẽ tạo ra đối tượng.

        * Gọi hàm tf.constant(42.0) sẽ tạo ra một đối tượng tf.Operation và thêm nó vào Graph đồng thời trả về một đối tượng tf.Tensor mang giá trị 42.0.
        * Gọi hàm tf.matmul(x, y) sẽ tạo ra một đối tượng tf.Operation và thêm nó vào Graph đồng thời trả về một đối tượng tf.Tensor mang giá trị tích của phép nhân này.
        * Gọi hàm tf.train.Optimizer.minimize sẽ thêm các phương thức và tensors vào Graph để phục vụ cho việc tính đạo hàm riêng và trả về một đối tượng tf.Operation mà khi chạy Graph sẽ thực hiện việc tính đạo hàm riêng trên các biến cho trước.
## 1. Phép cộng
![](https://images.viblo.asia/6f99a4bd-0b7e-447b-9be2-5fd61d408272.png)

Graph đại diện cho phép cộng: (x+y)

* Phép cộng số nguyên là hằng số
```
import tensorflow as tf

x = tf.constant(4)
y = tf.constant(5)
# Chú ý: x và y chưa có giá trị cho đến khi phiên (session) được khởi tạo. 
# Bạn có thể dùng hàm x.eval() để lấy giá trị khỏi Tensor.

z = tf.add(x, y) # Hàm cộng
with tf.Session() as sess:
    # x, y ở đây mới bắt đầu có giá trị
    result = sess.run(z)
    print(z.eval())
```

* Phép cộng số nguyên là biến số

```
import tensorflow as tf
a = tf.Variable(10) # giá trị sẽ được khởi tạo ban đầu
b = tf.Variable(29) # giá trị sẽ được khởi tạo ban đầu

# Hàm khởi tạo giá trị ban đầu cho các biến x, y
# Chú ý, khác với lập trình thông thường, đây mới dừng lại việc định nghĩa hàm
# Hàm initialize_all_variables() chưa thực sự chạy, x và y node chưa hề có giá trị

init = tf.initialize_all_variables()

# Chạy Graph
with tf.Session() as sess:
    # initialize_all_variables lúc này mới chạy thực sự -> các node x và y mới bắt đầu có giá trị
    sess.run(init)
    sess.run(c) # Chạy Graph
    print(c.eval())
```
*  Phép cộng ma trận là hằng số
![](https://images.viblo.asia/91f99fa6-508c-4ee0-af62-0108c2630d56.png)
```
import tensorflow as tf
a = tf.constant([
    [1, 2, 3],
    [4, 5, 6]
])

b = tf.constant([
    [3, 4, 5],
    [6, 7, 8]
])

matrix_1
matrix_2

c = tf.add(a, b)

with tf.Session() as sess:
    sess.run(c)
    print(c.eval())
```
## 2. Hidden Layer của một Neural network
![](https://images.viblo.asia/807fc9e4-d13c-4afc-aafc-697dde6e3ed5.png)
Công thức h = ReLU(Wx+b

Giải thích các phép tính toán trên Graph này:

* MatMul <-> Wx: Nhân vô hướng 2 ma trận

* Add <-> Wx + b: Cộng ma trận

* ReLU hàm phi tuyến. Bạn chỉ cần hiểu đơn giản về hàm này: Hàm này sẽ trả về giá trị của chính đầu vào nếu đầu vào lớn hơn 0 và trả về 0 nếu đầu vào nhỏ hơn 0. Bạn có thể hiểu rõ tính chất của hàm này thông qua đồ thị của nó.
![](https://images.viblo.asia/d89216ab-65f9-4758-a2de-a01e7b375812.jpeg)
* Tạo một lớp layer ẩn với TensorFlow

Input
```
import tensorflow as tf
import numpy as np

x = tf.placeholder(tf.float32, (100, 784))

W = tf.Variable(tf.random_uniform((784, 100), -1, 1))

b = tf.Variable(tf.zeros((100)))

h = tf.nn.relu(tf.matmul(x, W) + b)

print(h)

sess = tf.Session()

sess.run(tf.initialize_all_variables())

sess.run(fetches, feeds)

sess.run(h, {x: np.random.random((100, 784))})
```
Output:
```
array([[ 0.       ,  9.201424 ,  0.       , ...,  0.       ,  0.       ,
         0.       ],
       [ 0.       , 13.298065 ,  0.       , ...,  0.       ,  1.2823265,
         0.       ],
       [ 0.       ,  4.288911 ,  0.       , ...,  6.110207 ,  3.9334798,
         0.       ],
       ...,
       [ 0.       ,  4.820806 ,  0.       , ...,  4.610816 ,  4.833015 ,
         6.31176  ],
       [ 0.       ,  0.       ,  0.       , ...,  9.902921 ,  1.8157439,
         0.       ],
       [ 0.       ,  7.734725 ,  0.       , ...,  4.4870186,  0.       ,
         1.8016957]], dtype=float32)
```
![](https://images.viblo.asia/4b9edd93-01c3-4a32-8e20-178550f66cb8.png)

## Tại sao cần phải sử dụng Computational Graph?

Như đã đề cập ở bên trên, Computational Graph hay Dataflow Graph dùng để biểu diễn các phép tính toán. Bạn sẽ phải tạo Graph trước rồi sử dụng TensorFlow Session để chạy các phần của Graph này.
![](https://images.viblo.asia/524bcb4e-544a-4889-a26d-6c415098e4e4.gif)

Dataflow là mô hình lập trình (programming model) chuyên dùng cho tính toán song song. Ở trong Graph, các đỉnh (nodes) đại diện cho các phép tính, và các cạnh (edges) đại diện cho dữ liệu đầu vào và đầu ra của các phép tính trên.

Một số ưu điểm của Dataflow mà TensorFlow (TF) có thể tận dụng được:

* Tính toán song song (Parallelism): Bằng việc chia tách các phép tính toán độc lập, TF có khả năng lựa chọn thực hiện song song các phép tính cụ thể.

* Thực thi phân tán (Distributed Execution): TF có khả năng chia nhỏ ứng dụng của bạn cho nhiều CPU, TPU, GPU khác nhau trên nhiều máy khác nhau.

* Biên dịch (Compliation): XLA của TF có thể dùng graph để generate ra code chạy nhanh hơn thông thường.

* Tính di động (Portability): Graph là ngôn ngữ biểu diễn độc lập (language-independent representation) với model của bạn. Bạn có thể build một Graph bằng Python, save model, store lại bằng C++.

Trong phần tiếp theo chúng ta sẽ tìm hiểu về Bài toán hồi quy (Regression).

Cảm ơn các bạn đã theo dõi.

Thân ái!!!