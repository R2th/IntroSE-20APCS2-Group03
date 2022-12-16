# SƠ LƯỢC VỀ ARTIFICIAL NEURAL NETWORK 
<br><br>

![](https://images.viblo.asia/5fc47b38-52fb-4701-8c78-180982a9cdb5.jpeg)

Artificial Neural Network (ANN) gồm 3 thành phần chính: Input layer và output layer chỉ gồm 1 layer , hidden layer có thể có 1 hay nhiều layer tùy vào bài toán cụ thể. ANN hoạt động theo hướng mô tả lại cách hoạt động của hệ thần kinh với các neuron được kết nối với nhau<br>
Trong ANN, trừ input layer thì tất cả các node thuộc các layer khác đều full-connected với các node thuộc layer trước nó. Mỗi node thuộc hidden layer nhận vào ma trận đầu vào từ layer trước và kết hợp với trọng số để ra được kết quả. Ở trong course của Andrew Ng trên coursera, thầy sử dụng Logistic Regression ở các node.<br><br>

**Sơ qua về Logistic Regression:**
<br><br>
Logistic Regression có activation function là hàm sigmoid :

![](https://images.viblo.asia/fa2bd0ea-42e5-448b-a4ab-1bdb5d0cb9de.PNG)

Hàm hypothesys : 

![](https://images.viblo.asia/eafd4e1e-de8f-4085-bedc-0e1ca3fd6c17.PNG)

Đồ thị có dạng : 

![](https://images.viblo.asia/973cf0b2-5a28-4eca-a99b-7b9535f355b6.png)
 
Cost function: 

![](https://images.viblo.asia/75e2c6e6-fd2b-4af0-800c-3d10fb835d73.PNG)

Với : 

![](https://images.viblo.asia/d2e0b8e6-0b6c-4324-98ea-4e27d655cb9a.PNG)

![](https://images.viblo.asia/86c6cd5f-ba5d-4bf5-84ad-6c20a3932244.PNG)

Vậy ta có cost function :

![](https://images.viblo.asia/d9b209a6-9e7c-41c7-a058-51df017692a6.PNG)

Kết hợp với Regurlarization:

![](https://images.viblo.asia/7438256d-de9f-4601-8ebc-bdb86017cea6.PNG)

Vậy **với ANN** với mỗi node thuộc layer khác input layer đều là một Logistic Regression ta sẽ có :

![](https://images.viblo.asia/d17c69a6-44d7-4984-9ea9-b2609d3ec0ea.PNG)

Công việc của chúng ta hiện tại là tìm ra được $\Theta$ sao cho $J(\Theta)$  min.<br>
Để tìm cực tiểu của  $J(\Theta)$ ta áp dụng thuật toán Gradient Descent.<br>

![](https://images.viblo.asia/2ef39c5a-b50d-4e6c-8934-1b4c5000ef77.PNG)

Với α là learning rate.<br>
Để thực hiện được thì cần phải tính được $\frac{∂}{∂\Theta_{j}}J(\Theta)$, để tính được đạo hàm này là việc tương đối khó và ta cần thực hiện một thuật toán được gọi là backpropagation để tính.
<br><br>



# FORWARD PROPAGATION<br><br>
Ta có mạng neural như sau :

![](https://images.viblo.asia/af510d23-c443-40a4-844b-2a0c7d128080.PNG)
 
**Chú thích :** 	<br>
$x_{1},x_{2}$ là các features của input.<br>
        $y_{1},y_{2}$ là các output.<br>
		$b_1,b_2$ là các bias.<br>
		$w_1,w_2,…,w_8$ là các trọng số.<br>
Như cái tên của forward propagation , ta  sẽ tiến hành tính toán $a_{1},a_{2},y_{1},y_{2}$ từ trái qua phải.<br><br>
$z_{1}=x_{1} w_{1}+x_{2} w_{3}+b_{1}$<br>
$a_{1}=sigmoid(z_{1} )=\frac{1}{1+e^{x_{1} w_{1}+x_{2} w_{3}+b_{1}}}$<br><br>
Tương tự :<br><br>
$z_{2}=x_{1} w_{2}+ x_{2} w_{4}+b_{2}$<br>
$a_{2}=\frac{1}{1+e^{x_{1} w_{2}+ x_{2} w_{4}+b_{2}}}$<br>
$z_{3}=a_{1} w_{5}+a_{2} w_{7}+b_{2}$<br>
$y_{1}=\frac{1}{1+e^{a_{1} w_{5}+a_{2} w_{7}+b_{2}}}$<br>
$z_{4}=a_{1} w_{6}+a_{2} w_{8}+b_{2}$<br>
$y_{2}=\frac{1}{1+e^{a_{1} w_{6}+a_{2} w_{8}+b_{2}}}$<br><br>

Forward propagation là một công đoạn tính toán giá trị tại từng node để phục vụ việc tính toán trong Back propagation. <br><br>

# BACK PROPAGATION<br><br>
Như đã nói ở trên, mục tiêu của back propagation là đi tính  $\frac{∂}{∂\Theta_{j}} J(\Theta)$.<br>
Giả sử ta đang cần tính  $\frac{∂}{∂\Theta_{5}} J(\Theta)$.<br>
Áp dụng [chain rule](https://en.wikipedia.org/wiki/Chain_rule) ta tách $\frac{∂}{∂\Theta_{5}} J(\Theta)$thành :<br>
$\frac{∂}{∂w_{5}} J(w)=  \frac{∂J(w)}{∂y_1}* \frac{∂y_1}{∂z_3}* \frac{∂z_3}{∂w_5 }$<br>
Để cho dễ hiểu chúng ta sẽ bỏ qua regularization và giả sử m = 1 với tập kết quả trong training set ứng với $y_1,y_2 $ là $T_1=1,T_2=0$ :<br>

![](https://images.viblo.asia/e5b43890-7378-4197-8a94-4985d1fa432f.PNG)

![](https://images.viblo.asia/0c309f2e-53ef-42d4-b3b3-a2021392576b.PNG)

Tất cả các kết quả của $\frac{∂J(w)}{∂y_1},\frac{∂y_1}{∂z_3},\frac{∂z_3}{∂w_5}$ đều có thể tính được thông qua kết quả thu được từ forward propagation. Vậy ta có thể tính được $\frac{∂}{∂w_5} J(w)$.<br>
Tương tự như vậy ta có thể lần lượt tính được giá trị $\frac{∂}{∂w_j} J(w)$ với j = 1, 2, …, 8 trong trường hợp này.<br>
Như vậy nhờ vào back propagation ta đã có thể tính được $\frac{∂}{∂w_j} J(w)$ từ đó giúp thuật toán Gradient descent có thể hoạt động và ta có thể tìm ra tập $\Theta$ sao cho Cost function là nhỏ nhất.