# Giới thiệu
Trong ML, DL các hàm/thuật toán tối ưu (optimizer) đóng vai trò không thể bàn cãi. Về cơ bản, thuật toán tối ưu là cơ sở để xây dựng mô hình neural network với mục đích "học " được các features  của dữ liệu đầu vào, từ đó có thể tìm 1 cặp weights và bias phù hợp để tối ưu hóa mô hình.

Các thuật toán phổ biến hiện nay có thể kể đến như RMSProp, SGD, SGDM, AdaGrad và optimizer người người nhà nhà dùng Adam (AdamW). Một thống kê nhỏ trên paperwithcode ![tại đây](https://images.viblo.asia/ace52ec4-0f34-4e29-9d10-b098f1038acf.png) cho thấy được độ phổ biến của hàm tối ưu Adam. Số liệu này có thể không chính xác hoàn toàn nhưng đủ thấy được sức ảnh hưởng của Adam ;))

Tuy nhiên không có hàm tối ưu nào là tốt trong mọi trường hợp mà còn phụ thuộc vào rất nhiều yếu tố về dữ liệu, mô hình, tham số... Chính điều này khiến cho việc tìm ra hàm tối ưu phù hợp nhất trở thành một vấn đề lớn khi phải thực nghiệm rất nhiều lần với các tham số khác nhau. 

Trong paper này, các tác giả từ Rice University có đề xuất một thiết kế hàm tối ưu mới, dựa trên momentum decaying. Đúng là momentum decaying thay vì weight decay hay learning rate decay. 

## Ý tưởng
Với sự phát triển của các mô hình Deep learning, việc huấn luyện mô hình trở nên dễ dàng hơn. Tuy nhiên quá trình này vẫn đòi hỏi nhiều resource, thời gian trong việc tuning các tham số cần thiết để tìm ra mô hình tối ưu. Các phương pháp đã được đề ra trước đây để giảm gánh nặng này ví dụ như phương pháp adaptive gradient-base (AdaGrad, Adam, AdamW nhìn chung là họ nhà Adam). Tuy nhiên tác giả khẳng định SGD/SGDM nhìn chung vẫn phổ biến hơn khi huấn luyện mô hình DNNs. Đi tìm một vài nguyên nhân cụ thể hơn thì khá nhiều tác giả đồng tình [1](https://ruder.io/optimizing-gradient-descent/), [2](https://shaoanlu.wordpress.com/2017/05/29/sgd-all-which-one-is-the-best-optimizer-dogs-vs-cats-toy-experiment/). Tuy nhiên, để SGDM đạt hiệu năng tốt, cần phải tùy chỉnh hyperparameter cẩn thận. Dù chỉ một thay đổi nhỏ với learning rate, learning rate decay, momentum hay weight decay có thể thay đổi hiệu năng đáng kể. Và quá trình này rất tốn thời gian (grid search obviously?)

## Momentum tuning
Momentum được nghĩ ra với mục tiêu ban đầu là làm tăng tốc độ học theo hướng tại độ cong nhỏ, mà tránh việc ảnh hưởng đến vùng có độ cong lớn. 

Thông thường với SGDM sẽ tối tiểu hàm $L(.)$: 
$$ v_t = \beta v_{t-1} - g_t$$
với $\beta$ là tỉ lệ giảm của momentum (momentum decay), $g_t$ là stochastic gradient, $v_t \in R^p$ tích lũy momentum . $\beta$ thường được đặt giá trị mặc định là 0.9 (trong các paper nghiên cứu, thư viện PyTorch). Tuy nhiên không có nghiên cứu nào chỉ ra rằng giá trị này work tốt trong mọi trường hợp :v

Một vài paper trước đây cũng đã thử tuning giá trị momentum này. Điển hình như [YellowFin](https://arxiv.org/pdf/1706.03471.pdf) (phương pháp tùy chỉnh learning rate + momentum đồng bộ và cả bất đồng bộ), các mô hình GANs [1](https://arxiv.org/abs/1411.1784), [2](https://arxiv.org/pdf/1807.04740.pdf)  

# Ôn lại kiến thức cũ =))
## SGDM
Như đã nhắc ở trên, paper này hướng đến việc cải tiến SGDM 
$$\theta_{t+1} = \theta_t + \eta v_t$$
$$ v_t = \beta v_{t-1} - g_t$$
Trong đó $\theta_t \in R^p$ là param tại step $t$, $\eta \in R$ là learning rate và $g_t$ là stochastic gradient tương ứng vơi $\theta_t$.
Có thể thấy nếu $\beta = 0$ thì phép đệ quy trên trở về SGD. Giá trị của $\beta$ thường gần 1, trong đó 0.9 là giá trị mặc định của nhiều paper cũng như PyTorch Framework. Tuy nhiên không có nghiên cứu nào chỉ ra rằng giá trị này work tốt trong mọi trường hợp

## Adaptive gradient descent
Phương pháp này tận dụng thông tin gradient trước cùng với learning rate param.

$$\theta_{t+1, i} = \theta_{t,i} - \frac{\eta}{\sqrt{\mathcal{E}_{t+1,i}^{g \circ g} + \varepsilon}} . \mathcal{E}^{g}_{t+1, i}, \space \forall t$$

Phương trình này mình xin phép viết thêm bản gốc trong paper [Adam](https://arxiv.org/pdf/1910.04952v3.pdf) cho dễ hiểu.

$$\alpha_t = \alpha . \sqrt{1- \beta^{t}_{2}}/(1-\beta^t_1)$$

$$\theta_t = \theta_{t-1} - \frac{m_t}{\sqrt{v_t}+\hat{\epsilon}} . \alpha_t$$

# Phương pháp
Mục tiêu DEMON:

Giống như learning rate decay, để giảm sự phụ thuộc của gradient hiện tại và sau này. Tương tự như vậy với việc chọn momentum làm giá trị decay, nhóm tác giả kỳ vọng giảm được sự phụ thuộc gradient vào các giá trị phía sau. 

Hàm tính toán momentum decay: 
$$\beta_t = \beta_{init} . \frac{(1- \frac{t}{T})}{(1-\beta_{init})+\beta_{init}(1-\frac{t}{T})}$$
 Trong đó $(1-\frac{t}{T})$ là tỉ lệ cho các iteration còn lại. t là iteration hiện tại và T là tổng step. 
 
 $$\theta_{t+1} = \theta_t - \eta g_t - \eta \beta g_{t-1} - \eta \beta^2 g_{t-2} + \eta\beta^3v_{t-2} = \theta_t - \eta g_t - \eta . \sum_{i=1}^t(\beta^i . g_{t-i})$$
 
Phân tích kỹ hơn: $g_t$ cùng với $\eta\sum_i \beta^i$ sẽ ảnh hưởng đến gradient phía sau ($g_{t+1}$). Đồng thời $\beta$ cũng ảnh hưởng đến $t-1$. 

$\sum_{i=1}^\infin \beta^i = \beta \sum_{i=0}^\infin \beta^i = \frac{\beta}{1-\beta}$ 

 
![](https://images.viblo.asia/083dd93b-5bcf-4a16-8e74-d29174073224.png)

![](https://images.viblo.asia/fe89de26-fcbb-451e-bdd3-0398a7a61308.png)

 
 Nhóm tác giả đã đưa ra scheduler với quy luật mới để đưa cummulatie momentum về 0. Cho $\beta_{init}$ là giá trị ban đầu của $\beta$, vậy tại step $t$ (trên tổng $T$ step). 
 
 $$\beta / (1-\beta) =\beta_{init}\frac{(1-\frac{t}{T})}{1-\beta_{init}}$$
 
 Giả mã thuật toán:
 ![](https://images.viblo.asia/501274b5-9e90-47f9-82bd-d9fba0e22b1a.PNG)
Decay momentum được cài đặt $\beta = \beta_{init}$ tại $t=0$ và $t=T$. 

# Thí nghiệm thực hiện
Nhóm tác giả chia thành 2 nhánh thí nghiệm chính bao gồm adaptive learning rate và adaptive momentum. 
DEMON được thử nghiệm trên nhiều bộ dữ liệu khác nhau với các domain khác nhau cùng rất nhiều tham số tùy chỉnh. 

Các bộ dữ liệu thử nghiệm bao gồm: CIFAR10, TINY IMAGENT, CIFAR100, STL10, PTB, FMNIST, MNIST với các domain khác nhau image classification, text classification, variational auto encoder, GAN...

![](https://images.viblo.asia/a8253764-0c52-44db-a6f0-74721fdc71ee.png)

![](https://images.viblo.asia/0102d5c6-7785-4fca-b1ea-8e9990a4754a.png)

![](https://images.viblo.asia/3f481730-f7e0-447a-b945-584d6ac32872.png)

Kết quả cho thấy DEMON cho thấy kết quả tốt hơn với hầu hết các optimizer còn lại bao gồm SGDM, AggMo, QHM, Adam, AMSGrad, AdamW, QHAdam và YellowFin

![](https://images.viblo.asia/e515f3e8-0e24-4c22-9457-cd729c1e4bca.png)

![](https://images.viblo.asia/4923a9a2-3434-46e7-8f5d-d98f1c91a342.png)

![](https://images.viblo.asia/eb5d36c8-639c-43da-8d14-3ae50e31c4b3.png)

Trên đây là một vài kết quả được report trong paper. Các tác giả đã thực hiện rất nhiều thí nghiệm với nhiều tham số khác nhau để có thể tìm ra params tốt nhất với các task. DEMON được thử nghiệm với setting về 0 bắt đầu từ epoch đầu tiên hoặc 3/4 epoch. Các kết quả thí nghiệm được report cụ thể hơn trong paper, bạn đọc có thể tham khảo để biết rõ hơn.
# Tổng kết 
Momentum decay có kết quả tốt khi training mô hình và được thử nghiệm với các bài toán phân loại ảnh, mô hình sinh, mô hình ngôn ngữ. Khi sử dụng DEMON, mô hình nhìn chung ít nhạy cảm hơn khi tune chỉnh tham số. 

Mình có thử nghiệm optimizer này trên tập CIFAR10, tuy nhiên kết quả lại thấy không chênh quá nhiều :D

Nguyên nhân có thể do sử dụng community code [TF](https://github.com/autasi/demon_sgd), [Torch](https://github.com/JRC1995/DemonRangerOptimizer) hoặc số lượng epoch chưa đủ nhiều chăng?

[Code Colab](https://colab.research.google.com/drive/1BEcCPM45LttjxP6AVRK0EcohVZ1RoKHB?usp=sharing) tham khảo

Cảm ơn các bạn đã đọc bài. 

P/s: sau này mình mới phát hiện tác giả có share bản implement gốc tại [openreview](https://openreview.net/forum?id=yNFwsrcEtO0). Nếu có điều kiện mình sẽ thử và update lại sau

# Tham khảo
\[1\] [Demon: Momentum Decay for Improved Neural Network Training](https://arxiv.org/abs/1910.04952v3)

\[2\] https://openreview.net/forum?id=yNFwsrcEtO0

\[3\] https://johnchenresearch.github.io/demon/