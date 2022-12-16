Trong bài thứ tư này, chúng ta sẽ tìm hiểu về **Deep neural networks**. Từ này đã trở lên thông dụng ngày nay trong ngành công nghiệp và lĩnh vực nghiên cứu. 

Mục tiêu của bài viết này :
 
 * Xem **deep neural networks** khi các lớp kết nối với nhau.
 * Xây dựng và huấn luyện một mạng thần kinh sâu có L lớp
 * Phân tích kích thước ma trận và vectơ để kiểm tra việc triển khai mạng thần kinh
 * Hiểu cách sử dụng bộ đệm để truyền thông tin từ forward propagation sang backward propagation
 * Hiểu vai trò của hyperparameters trong **Deep learning**

**Notation**:
- Ký hiệu chữ cái in hoa A, Z, W, B là các ma trận 
- Ký hiệu các chữ cái thường a, z, w, b là các vector kích thước (x,1)
- Ký hiệu $[l]$ đại diện cho lớp thứ $l^{th}$ . 
    - L là số lớp của mạng lưới thần kinh
    - $n^{l}$ là số unit trong lớp thứ $l$
    - $a^{[l]}= g(z^{[l]}) = g(w^{[l]}a^{[l-1]} +b^{[l]})$ là $l^{th}$  layer's activations với g ở đây là các hàm kích hoạt như sigmod(), relu(), ...
    -  $W^{[l]}$ và $b^{[l]}$ là các thông số của lớp $l^{th}$ (layer parametes).
- Ký hiệu $(i)$ đại diện cho $i^{th}$ example. 
    - VÍ dụ: $x^{(i)}$ là thí dụ thứ  $i^{th}$ của tập training.
- Ký hiệu chữ thường $i$ đại diện cho ví trí thứ $i^{th}$ của 1 vector
    - Ví dụ: $a^{[l]}_i$ dại diện cho ví trí $i^{th}$ của $l^{th}$ layer's activations.

Đây là các ký hiệu mà chúng ta sẽ dùng trong cả bài này. Hãy ghi nhớ chúng để bắt đầu bài đọc, hoặc bạn có thể nhanh chóng kéo lên đầu trang để xem trong trường học bạn quên.:grinning:
 
#  Deep L-Layer Neural Network
Trong phần này, chúng ta sẽ xem xét làm sao các khái niệm **forward** và **backpropogation** có thể được áp dụng trong **deep neural networks**. Shallow và deep là một vấn đề về mức độ. Như ta đã học từ bài trước thì Logistic regression là một mô hình rất nông nó chỉ có 1 layer, (nhớ rằng chúng ta không tính đầu vào của 1 lớp).

![](https://images.viblo.asia/51400c13-da04-4800-9f10-e4ea9a4f4efc.png)

Một **Deep Neural Network** có số lượng lớp ấn nhiều hơn. 

![](https://images.viblo.asia/64f4c319-1638-4250-9989-6adbf3a9b26c.png)
 

Với mạng thân trên, ta thấy các điểm như sau:
- Có $L=4$ layer 
- Số unit của các layer lần lượt là $n^{[1]}=5$, $n^{[2]}=5$, $n^{[3]}=3$, $n^{[4]}=1$ 
# Forward Propagation in a Deep Network 
Đâu tiên chúng ta nhìn vào **Forward Propagation** của mạng lưới thần kinh trên với 1 dữ liệu $a^{[0]} = x = \begin{bmatrix}
 & x_{1} \\
 & x_{2} \\
 & x_{3}
\end{bmatrix}$
 đào tạo duy nhất. Ta có:
 
$z^{[1]} = w^{[1]}a^{[0]} + b^{[1]} ;  a^{[1]} = g^{[1]}(z^{[1]}) \newline 
z^{[2]} = w^{[2]}a^{[1]} + b^{[2]}; a^{[2]} = g^{[2]}(z^{[2]}) \newline
z^{[3]} = w^{[3]}a^{[2]} + b^{[3]}; a^{[3]} = g^{[3]}(z^{[3]}) \newline
z^{[4]} = w^{[4]}a^{[3]} + b^{[4]}; a^{[2]} = g^{[3]}(z^{[4]}) =\hat{y} \newline$

Tổng quát hóa với trường hợp có $L$ layer :

$$z^{[l]} = w^{[l]}a^{[l-1]} + b^{[l]} $$  
$$a^{[l]} = g^{[l]}(z^{[l]}) \newline$$

Chúng ta có thể vectorize các bước này khi có m dữ liệu đào tạo như sau:

$$Z^{[l]} = W^{[l]}A^{[l-1]} + B^{[l]} $$
$$  A^{[l]} = g^{[l]}(Z^{[l]}) \newline$$

# Getting your matrix dimensions right
Phân tích kích thước của ma trận là một trong những công cụ gỡ lỗi tốt nhất để kiểm tra mức độ chính xác của code của chúng ta. Chúng ta sẽ thảo luận về những gì nên là kích thước chính xác cho mỗi ma trận trong phần này. Hãy xem xét ví dụ sau:
![](https://images.viblo.asia/e73bc41e-c69b-4e40-8fa5-e6ca950a9d8f.png)

Mạng lưới thần kinh trên có số layer L = 5 với 4 hidden layer và 1 output layer. Số unit trong  mỗi layer được thể hiện trên hình vẽ. 

Ta phân tích kích thước của $z^{[1]} = w^{[1]}a^{[0]} + b^{[1]}$. Khi có 1 dữ liệu đào tạo.
- Kích thước của $w^{[1]}: (3,2)$ hay $(n^{[0]}, n^{[1]})$
-  Kích thước của $x=a^{[0]} = x: (2,1)$ hay $(n^{[0]}, 1)$
-   Kích thước của $b^{[1]}: (3,1)$ hay $(n^{[1]}, 1)$
-  Do đó, kích thước của $z^{[1]}: (3,1)$ hay $(n^{[1]}, 1)$

 Suy ra dạng tổng quát của $W, b$ và các dẫn suất của chúng khi có m training example:
- $W^{[l]}: (n^{[l]}, n^{[l-1]})$
- $b^{[l]}: (n^{[l]}, 1)$
- $dW^{[l]} = \frac{\partial \mathcal{J} }{\partial W^{[l]}}: (n^{[l]}, n^{[l-1]})$  trong đó L là hàm loss function.
- $db^{[l]} = \frac{\partial \mathcal{J} }{\partial Z^{[l]}}: ((n^{[l]}, 1)$
- Kích thước của $Z^{[l]}, A^{[l]}, dZ^{[l]}, dA^{[l]} : (n^{[l]}, m)$

Đây là một số kích thước ma trận tổng quát sẽ giúp code của bạn chạy một cách trơn tru. Chúng ta đã thấy một số điều cơ bản của **deep neural networks** cho đến thời điểm này. Nhưng tại sao chúng ta cần đại diện sâu sắc ngay từ đầu? Tại sao làm cho mọi thứ phức tạp khi giải pháp dễ dàng hơn tồn tại? Hãy cùng tìm hiểu!

# Why Deep Representations?
Trong các mạng lưới thần kinh sâu, chúng ta có một số lượng lớn các lớp ẩn. Những lớp ẩn này thực sự đang làm gì? Để hiểu điều này, hãy xem xét hình ảnh dưới đây:

![](https://images.viblo.asia/c8a46f1a-e9bb-4aa9-9ef6-a543df7fce7c.png)

Mạng lưới thần kinh sâu tìm mối quan hệ với dữ liệu (quan hệ đơn giản đến phức tạp). Lớp ẩn đầu tiên có thể đang làm gì, đang cố gắng tìm các hàm đơn giản như xác định các cạnh trong ảnh trên. Và khi chúng ta đi sâu hơn vào mạng, các chức năng đơn giản này kết hợp với nhau để tạo thành các chức năng phức tạp hơn như nhận diện khuôn mặt. Một số ví dụ phổ biến về việc tận dụng **deep neural network ** là:

*  Nhận dạng khuôn mặt
    * Image ==> Edges ==> Face parts ==> Faces ==> desired face

- Nhận dạng âm thanh:
    * Audio ==> Low level sound features like (sss, bb) ==> Phonemes ==> Words ==> Sentences

# Building Blocks of a Deep Neural Network
Ta xem xét bất kỳ lớp trong **Deep Neural Network**, đầu vào của lớp này là các **activation** từ lớp trước (l-1) và đầu ra của lớp này là các **activations** của chinh lớp nó.
 * Input: $a^{[l-1]}$
 * Output: $a^{[l]}$

Lớp này trước tiên tính $z^{[l]}$  dựa trên $a^{[l-1]}$ được truyền vào . $z^{[l]}$ này được lưu dưới dạng cache, trong cache này cũng lưu $W^{[l]}, b^{[l]}$ để về sau còn cập nhật  các tham số. Đối với **backward propagation**, trước tiên, nó sẽ tính $da^{[l]}$ , nghĩa là đạo hàm **activation** ở lớp $l^{th}$, đạo hàm của trọng số $dW^{[l]}, db^{[l]},dZ^{[l]}$, và cuối cùng là $da^{[l-1]}$ . Các bạn hãy hình dùng các bước như sau: 

![](https://images.viblo.asia/5bda95b1-85c1-4571-82a7-769f627c5cd6.png)

Đay là cách mỗi khối hay lớp trong **Deep Neural Network**. Bây giờ ta sẽ xem cách thức hiện của **Forward and Backward Propagation** trong từng khối như thế nào.

# Forward and Backward Propagation 

## Forward Propagation  for layer $l$:
* Input: $a^{[l-1]}$
* Output: $a^{[l]}, cache(z^{[l]}])$ trong đó $Z^{[l]}$ là một hàm của $W^{[l]}, b^{[l]}$


Với 1 dữ liệu đạo tạo thì ta tính như sau: 

$$Z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]} $$
$$a^{[l]} = g^{[l]}(Z^{[l]})$$

Vectorized với m dữ liệu đào tạo ta được:

$$Z^{[l]} = W^{[l]}A^{[l-1]} +b^{[l]}$$ 
với $A^{[0]} = X$. 

$$A^{[l]} = g^{[l]}(Z^{[l]})$$
 
Chúng ta sẽ tính $Z$ và $A$ cho mỗi lớp của mạng. Sau khi tính toán các **activations**, bước tiếp theo là **backward propagation** (lan truyền ngược), trong đó chúng tôi cập nhật các trọng số bằng cách sử dụng **gradient descent** như mình đã trình bày ở các bài trước.

## Backward propagation for layer $l$

* Input: $da^{[l]}$
* Ouput: $da^{[l-1]}, dW^{[l]}, db^{[b]}$

Với 1 dữ liệu đạo tạo thì ta tính như sau: 

$$dZ^{[l]} = \frac{\partial \mathcal{L} }{\partial Z^{[l]}} = da^{[l]} * g'^{[l]}(Z^{[l]})$$
$$ dW^{[l]} = \frac{\partial \mathcal{J} }{\partial W^{[l]}} =  dZ^{[l]} a^{[l-1] T} $$
$$ db^{[l]} = \frac{\partial \mathcal{J} }{\partial b^{[l]}} = dZ^{[l]}$$
$$ da^{[l-1]} = \frac{\partial \mathcal{L} }{\partial a^{[l-1]}} = W^{[l] T} dZ^{[l]} $$

Vectorized với m dữ liệu đào tạo ta được:
$$dZ^{[l]} = \frac{\partial \mathcal{L} }{\partial Z^{[l]}} = da^{[l]} * g'^{[l]}(Z^{[l]})$$
$$ dW^{[l]} = \frac{\partial \mathcal{J} }{\partial W^{[l]}} = \frac{1}{m} dZ^{[l]} A^{[l-1] T} $$
$$ db^{[l]} = \frac{\partial \mathcal{J} }{\partial b^{[l]}} = \frac{1}{m} \sum_{i = 1}^{m} dZ^{[l](i)}$$
$$ dA^{[l-1]} = \frac{\partial \mathcal{L} }{\partial A^{[l-1]}} = W^{[l] T} dZ^{[l]} $$

Với $L$ ở đây là hàm loss fuction $L(y - \hat{y})$ và cost function $J =  \frac{1}{m} \sum_{i = 1}^{m}L(y(^{(i)} - \hat{y^{(i)}})$


Với lập trình thì ta có thể viết của thể tính dW, db, dA_prev như sau: 
```python
 dW = 1/m * np.dot(dZ, A_prev.T)
 db = 1/m * np.sum(dZ, axis = 1, keepdims = True)
 dA_prev = np.dot(W.T, dZ)
```

## Update Parameters
Sau khi **Backward propagation**, thì ta sẽ cập nhật tham số như sau, với $\alpha \text{ }$ là **learning rate** ta tự khởi tạo.
$$ W^{[l]} = W^{[l]} - \alpha \text{ } dW^{[l]} $$
$$ b^{[l]} = b^{[l]} - \alpha \text{ } db^{[l]} $$

Đây là cách chúng ta thực hiện deep neural networks..

 Deep neural networks. hoạt động tốt đáng ngạc nhiên (có thể không quá ngạc nhiên nếu bạn đã sử dụng chúng trước đó!). Chỉ chạy một vài dòng mã cho chúng ta kết quả khả quan. Điều này là do chúng tôi đang cung cấp một lượng lớn dữ liệu cho mạng và nó đang học hỏi từ dữ liệu đó bằng cách sử dụng các lớp ẩn.

Chọn đúng **hyperparameters** giúp chúng ta làm cho mô hình của mình hiệu quả hơn. Mình sẽ đề cập chi tiết về điều chỉnh siêu tham số trong bài viết tiếp theo của loạt bài này.

# Parameters vs Hyperparameters
Đây là một câu hỏi thường gặp của những người mới học **Deep learning**. Sự khác biệt chính giữa **Parameters** vs **Hyperparameters** là các **Parameters**  được mô hình học trong thời gian đào tạo, trong khi **Hyperparameters** có thể được thay đổi trước khi đào tạo mô hình và ta phải tự chọn qua kinh ngiệm.

Các **Parameters**  của mạng nơ ron sâu là $W$ và $b$, mô hình cập nhật trong bước **Backward propagation**. Mặt khác, có rất nhiều **Hyperparameters** cho một deep NN,, bao gồm: 
* Learning rate $\alpha \text{ }$
* Number of iterations
* Number of hidden layers
* Units in each hidden layer
* Chọn activation function

Đây là một tổng quan ngắn gọn về sự khác biệt giữa hai khía cạnh này. Bạn có thể tham khảo [bài viết của anh Toàn](https://viblo.asia/p/ai-interview-12-cau-hoi-phong-van-deep-learning-sieu-hay-khong-the-bo-qua-LzD5djvEZjY) phần thứ 7 để biết thêm chi tiết.

# References
- Tuần  4 khóa học [ Neural Networks and Deep Learning](https://www.coursera.org/learn/neural-networks-deep-learning?specialization=deep-learning) trên coursera.
- Video trên yotube về tuần 4, có Translate, rất dễ cho những bạn mới học như mình :smiley:, với mỗi phần trong bài viết của mình trùng tên với video [link](https://www.youtube.com/watch?v=2gw5tE2ziqA&list=PLkDaE6sCZn6Ec-XTbcX1uRg2_u4xOEky0&index=36)

# TL,DR
Đến đây đã hoàn thành khóa học đầu tiên  [ Neural Networks and Deep Learning](https://www.coursera.org/learn/neural-networks-deep-learning?specialization=deep-learning)(Course 1 of the Deep Learning Specialization) Bây giờ chúng ta biết làm thế nào để thực hiện **forward and backward propagation and gradient descent** cho các deep neural networks. Chúng ta cũng đã thấy làm thế nào vectorization giúp chúng ta thoát khỏi các vòng lặp rõ ràng, làm cho code của chúng ta hiệu quả trong quá trình. 

Chắc 1 số bài viết tới mình sẽ giới thiệu các nền tảng để lập trình bao gồm python, numpy, panda, matplot, sau đó mình sẽ hướng dẫn làm lại bài thực hành tuần 4 trên khóa học để các bạn có cái nhìn rõ nét hơn cách code các phần ở trên từng bước một, để các bạn về sau khi làm quen với các thư viện có sẵn như **Tensorflow, keras, pytorch**,.. sẽ hiểu bên dưới chúng thực hiện những gì và để mình cũng nhớ lâu hơn :grinning:. Rất mong được sự ủng hộ của các bạn.

Trong phần tiếp theo (sẽ bao gồm khóa 2) sẽ 1 thời dài sau, chúng ta sẽ xem làm thế nào chúng ta có thể cải thiện mạng lưới thần kinh sâu bằng cách điều chỉnh **hyperparameter**, **regularization** và **optimization**. Đó là một trong những khía cạnh khó khăn và hấp dẫn hơn của deep learning.