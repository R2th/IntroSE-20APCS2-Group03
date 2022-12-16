# Tensorflow trong Ruby
![](https://images.viblo.asia/53f27b69-344f-4c61-8654-1accf03011de.jpeg)
Sự phát triển của trí tuệ nhân tạo dẫn đến việc tìm hiểu về machine learning và deep learning đã trở thành xu thế hiện nay. Việc sử dụng các thư viện có sẵn để tính toán đã giúp việc tiếp cận các bài toán trở nên đơn giản hơn. Tensorflow là một thư viện phần mềm mã nguồn mở hỗ trợ mạnh mẽ các phép toán học để tính toán trong machine learning và deep learning. Hôm nay mình sẽ cùng nhau tìm hiểu về Tensorflow trong Ruby.
## Giới thiệu
Theo mình hiểú thì Tensorflow là một thư viện mã nguồn mở cung cấp khả năng xử lí tính toán số học dựa trên biểu đồ mô tả sự thay đổi của dữ liệu, trong đó các node là các phép tính toán học còn các cạnh biểu thị luồng dữ liệu. Nó được phát triển bởi các nhà nghiên cứu của Google với mục đích tiến hành học máy và nghiên cứu mạng lưới thần kinh sâu.<br>
TensorFlow đi kèm với giao diện Python dễ sử dụng và giao diện C ++ để xây dựng và thực hiện các biểu đồ tính toán của bạn. Tuy nhiên, Tensorflow chỉ có sẵn trong Python và do sự quan tâm mạnh mẽ từ cộng đồng Ruby, Tensorflow đã được xây dựng trên ngôn ngữ lập trình Ruby. Tensorflow được hỗ trợ bởi nền tảng **Somatic.io** và **SciRuby**.
## Cài đặt
Để cài đặt gem **tensorflow.rb**, hãy làm theo các bước [ở đây](https://github.com/somaticio/tensorflow.rb?source=post_page---------------------------). Bây giờ mình sẽ chỉ cho các bạn một ví dụ về cách bạn có thể sử dụng Tensorflow.
## Tạo và chạy đồ thị trong Ruby
Nếu mọi thứ hoạt động tốt cho bạn thì bạn có thể chạy tệp này.
```
require 'tensorflow'
graph = Tensorflow::Graph.new
tensor_1 = Tensorflow::Tensor.new([   [[2.0,5.0],
                                      [1.0,-20.0]],

                                      [[124.0,5.0],
                                      [53.0,-2.0]],

                                      [[1.0,0.0],
                                      [0.0,1.0]]
                                 ])
placeholder_1 = graph.placeholder('tensor1', tensor_1.type_num)
opspec = Tensorflow::OpSpec.new('Determinant_of_matrix', 'MatrixDeterminant', nil, [placeholder_1])
op = graph.AddOperation(opspec)
session_op = Tensorflow::Session_options.new
session = Tensorflow::Session.new(graph, session_op)
hash = { placeholder_1 => tensor_1 }
result = session.run(hash, [op.output(0)], [])
print result, "\n"
# [[-45.0, -513.0, 1.0]]
```
Chương trình này in đầu ra [[6.0, 5.5], [57.0, 7.4]] là kết quả của việc thêm hai tensors.
Giải thích đơn giản nhất cho điều này là:
```
graph = Tensorflow::Graph.new
tensor_1 = Tensorflow::Tensor.new([[2, 2.3], [ 10, 6.2]])
tensor_2 = Tensorflow::Tensor.new([[4, 3.2], [ 47, 1.2]])
placeholder_1 = graph.placeholder('tensor1', tensor_1.type_num)
placeholder_2 = graph.placeholder('tensor2', tensor_2.type_num)
```
Ở đây, chúng ta xác định hai tensors và sau đó chúng ta xác định hai placeholders tương ứng với các tensors đó.
```
opspec = Tensorflow::OpSpec.new(‘Addition_of_tensors’, ‘Add’, nil, [placeholder_1, placeholder_2])
op = graph.AddOperation(opspec)
```
Sau đó, chúng ta chỉ định một hoạt động để thêm hai placeholders
```
session_op = Tensorflow::Session_options.new
session = Tensorflow::Session.new(graph, session_op)
```
Sau đó bắt đầu một Tensorflow Session
```
hash = {}
hash[placeholder_1] = tensor_1
hash[placeholder_2] = tensor_2
result = session.run(hash, [op.output(0)], [])
```
Sau đó, chúng ta xác định hash mới trong ruby với key là placeholder tương ứng với tensors và giá trị là tensors và sau đó chạy session để nhận kết quả. <br>
Cú pháp rất dễ hiểu cũng như tạo ra kết quả đúng, vì vậy bất kỳ ai cũng có thể sử dụng nó với kiến thức cơ bản về Ruby / Tensorflow. Bạn cũng có thể đọc tài liệu [tại đây](https://www.rubydoc.info/github/somaticio/tensorflow.rb?source=post_page---------------------------).<br>
Trên đây là một ví dụ đơn giản về Tensorflow trong Ruby, dưới đây là một ví dụ khác thú vị hơn
```
require 'tensorflow'
graph = Tensorflow::Graph.new
tensor_1 = Tensorflow::Tensor.new([[      [2.0,5.0],
                                         [1.0,-20.0]],
 
                                         [[124.0,5.0],
                                         [53.0,-2.0]],

                                         [[1.0,0.0],
                                         [0.0,1.0]]
                                ])
placeholder_1 = graph.placeholder('tensor1', tensor_1.type_num)
opspec = Tensorflow::OpSpec.new('Determinant_of_matrix', 'MatrixDeterminant', nil, [placeholder_1])
op = graph.AddOperation(opspec)
session_op = Tensorflow::Session_options.new
session = Tensorflow::Session.new(graph, session_op)
hash = { placeholder_1 => tensor_1 }
result = session.run(hash, [op.output(0)], [])
print result, "\n"
# [[-45.0, -513.0, 1.0]]
```
Ví dụ này cho bạn thấy làm thế nào để có được định thức của một loạt ma trận. Nếu bạn nhìn kỹ, điều này rất giống với ví dụ trước với sự khác biệt là mình chỉ có một đầu vào duy nhất và op được sử dụng là BatchMatrixDeterminant. Kết quả là [[-45.0, -513.0, 1.0]] là yếu tố quyết định cho ma trận thứ nhất, thứ hai và thứ ba. Trên thực tế bạn có thể làm rất nhiều điều tốt như:<br>
1. Toán tử số học: <br>
* Addition
* Subtraction 
* Element wise multiplication
* Element wise Mod etc.
2. Các hàm toán học cơ bản
* Element wise exponent 
* Element wise power
* Element wise Log
* Trigonometric operations like tan, sin, cos 
* ….
3. Hàm ma trận (Đây là tốt nhất)
* Matrix Inversion
* Matrix multiplication
* Determinants, diagonal, trace
* Solving a system of linear equations
* cholesky decomposition etc.
* ….
* ….

Trên thực tế, tất cả mọi thứ được đề cập ở đây trong Toán tử số học, Hàm toán học cơ bản và Hàm ma trận cũng có thể có trong ruby tensorflow.<br>
Bạn cũng có thể thực hiện các hàm số phức (như nhân các ma trận phức). Nếu bạn muốn xem các hàm này được sử dụng như thế nào, hãy xem tệp spec [này](https://github.com/somaticio/tensorflow.rb/blob/master/spec/math_spec.rb?source=post_page---------------------------). Ngoài ra, bạn có thể hiểu việc sử dụng ops bằng cách xem tập tin [này](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/core/ops/ops.pbtxt?source=post_page---------------------------).
## Kết luận
Qua các ví dụ cơ bản ở trên, chúng ta phần nào đã hiểu nguyên lý cơ bản cách hoạt động và sử dụng của ruby tensorflow. Tensorflow là một thư viện có tính ứng dụng cao vì thế việc ruby tensorflow tồn tại giúp cho các lập trình viên Ruby có thể ứng dụng Tensorflow một cách dễ dàng