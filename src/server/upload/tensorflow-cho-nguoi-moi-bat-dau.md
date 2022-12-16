# Tensorflow cho người mới bắt đầu
Sự phát triển của trí tuệ nhân tạo dẫn đến việc tìm hiểu về  machine learning và deep learning đã trở thành xu thế hiện nay. Việc sử dụng các thư viện có sẵn để tính toán đã giúp việc tiếp cận các bài toán trở nên đơn giản hơn. Tensorflow là một thư viện phần mềm mã nguồn mở hỗ trợ mạnh mẽ các phép toán học để tính toán trong machine learning và deep learning. Hôm nay mình sẽ hướng dẫn các bạn những thứ cơ bản về tensorflow và tạo ra một mô hình training cơ bản bằng tensorflow.
## Những khái niệm cơ bản trong tensorflow
Theo mình hiểú thì Tensorflow là một thư viện mã nguồn mở cung cấp khả năng xử lí tính toán số học dựa trên biểu đồ mô tả sự thay đổi của dữ liệu, trong đó các node là các phép tính toán học còn các cạnh biểu thị luồng dữ liệu. Trong tesorflow có một vài khái niệm cơ bản sau. ![](https://images.viblo.asia/57082b4c-6271-47fc-8677-2e3658bc98d7.png)
### Tensor
Tensor là cấu trúc dữ liệu trong tensorflow đại diện cho tất cả các loại dữ liệu. Nói cách khác, tất cả các kiểu dữ liệu khi đưa vào trong tensorflow thì đều được gọi là Tensor. Vậy nên có thể hiểu được Tensorflow là một thư viện mô tả, điều chỉnh dòng chảy của các Tensor. Tensor có 3 thuộc tính cơ bản là *rank*, *shape* và *type*.
### Rank
Rank là số bậc của tensor. Ví dụ ```Tensor = [1]```  thì có rank = 1, ```Tensor = [[3,4],[5,6]]``` thì sẽ có rank = 2. Việc phân rank này khá quan trọng vì nó đồng thời cũng giúp phân loại dữ liệu của Tensor. Khi các rank đặc biệt cụ thể, Tensor có những tên gọi riêng như sau:
* Scalar: Khi Tensor có rank bằng 0
* Vector: Vector là một Tensor rank 1. .
* Matrix: Đây là một Tensor rank 2 hay mảng hai chiều theo khái niệm của Python
* N-Tensor: Khi rank của Tensor tăng lên lớn hơn 2, chúng được gọi chung là N-Tensor.
### Shape
Shape là chiều của tensor. Vi dụ ```Tensor = [[[1,1,1],[178,62,74]]]``` sẽ có Shape = (1,2,3), ```Tensor = [[1,1,1],[178,62,74]]``` sẽ có Shape = (2,3).
### Type 
Type kiểu dữ liệu của các elements trong Tensor. Vì một Tensor chỉ có duy nhất một thuộc tính Type nên từ đó cũng suy ra là chỉ có duy nhất một kiểu Type duy nhất cho toàn bộ các elements có trong Tensor hiện tại. 
## Tạo chương trình Tensorflow đơn giản
Một chương trình Tensorflow được chia thành hai phần chính. Phần thứ nhất là xây dựng mô hình tính toán (được gọi là *construction phase*), phần thứ hai là chạy mô hình vừa mới xây dựng (được gọi là *execution phase*). Bây giờ mình sẽ hướng dẫn viết chương trình tính hàm *f(x,y)* trong hình 9.1.
### Import Tensorflow
Vì Tensorflow không phải là thư viện có sẵn trong python vì vậy khi sử dụng cần phải import
```>>> import tensorflow as tf```
### Xây dựng graph
Đầu vào để tính hàm f gồm 3 node trong đó node *x* và node *y* là các biến số còn *2* là hằng số. Bây giờ ta sẽ tạo 3 node này.
```python
>>> x = tf.Variable(3, name="x")
>>> y = tf.Variable(4, name="y")
>>> f = x*x*y + y + 2
```
hoặc có thể tạo như sau 
```python
>>> x = tf.Variable(3, name="x")
>>> y = tf.Variable(4, name="y")
>>> z = tf.constant(2)
>>> f = x*x*y + y + z
```
f cũng có thể tạo bằng cách 
```python
>>> f = tf.add(tf.add(tf.multiply(tf.multiply(x,x), y), y), 2)
```
### Chạy mô hình vừa xây dựng
Trên đây là tạo các node để tính hàm f. Trên thực tế các câu lệnh trên không thực thi bất kì một phép tính nào mặc dù nó chứa các phép toán. Thậm chí các biến x, y cũng không được khởi tạo bởi 2 giá trị 3 và 4. Để chạy mô hình này ta cần phải mở một *sesion* và dùng nó để thiết lập giá trị cho 2 biến x, y và tính toán hàm f (biến z không cần thiết lập vì dùng tf.constant thì nó đã được gán giá trị là hằng số rồi).
```python
>>> sess = tf.Session()
>>> sess.run(x.initializer)
>>> sess.run(y.initializer)
>>> result = sess.run(f)
>>> print(result) #42
>>> sess.close()
```
Thay vì sess.run() cho tất cả các node, ta có thể dùng cách sau
```python
with tf.Session() as sess:
    x.initializer.run()
    y.initializer.run()
    result = f.eval()
    print(result)
```
Hàm f ở đây chỉ có 2 biến là x và y nên ta có thể khởi tạo từng biến một nhưng trong mạng neural network có hàng nghìn, hàng triệu biến thì chẳng nhẽ ta phải ngồi code hàng nghìn dòng khởi tạo biến hay sao? Câu trả lời là không. Thay vì khởi tạo từng biến, ta dùng hàm ```global_variables_initializer()``` để khởi tạo tất cả các biến
```python
init = tf.global_variables_initializer()

with tf.Session() as sess:
    init.run()
    result = f.eval()
```
##  Kết luận
Trên đây là những khái niệm cơ bản và mô hình đơn giản nhất dùng Tensorflow để tính toán. Hi vọng bạn đọc có thể tự tạo cho mình những hàm tính toán phức tạp hơn sau này. Hẹn gặp các bạn trong bài tiếp theo

#### Nguồn tham khảo
[1] https://kipalog.com/posts/Bat-dau-voi-Machine-Learning-thong-qua-Tensorflow--Phan-I-2

[2] http://shop.oreilly.com/product/0636920052289.do