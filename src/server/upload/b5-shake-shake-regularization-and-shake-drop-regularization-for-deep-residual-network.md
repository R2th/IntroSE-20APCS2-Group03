Khi overfit xảy ra, một trong các biện pháp hiệu quả là tăng cường lượng data học (train data). Các phương pháp phổ biến hiện nay bao gồm Data augmentation, Adversarial traning thực hiện thêm dữ liệu với **Input** đầu vào hoặc 1 phương pháp gần đây là Label smoothing và MixCut thực hiện cả augmentation cho **Label**. Từ ý tưởng này, Xavier Gastaldi đã nghĩ ra kỹ thuật ứng dụng augmentation với các internal representation (hay có thể hiểu là **feature space**) với Shake-shake regularization áp dụng với họ kiến trúc nhà ResNet. Hãy cùng tìm hiểu nhé!

## 1. Shake-Shake Regularization

Kiến trúc mạng ResNet  nhánh thông thường  
 $$x_{i+1}  = x_i + \mathcal{F}(x_i, \mathcal(\mathcal{W_i^{(1)}}) + \mathcal{F}(x_i, \mathcal{W_i^{(2)}}) $$
 
 trong  đó $x_i$ là input, $x_{i+1}$ là output  
$\mathcal{F}$ là hàm Residual Aggregated Transformations  
$W_i^{(1)}$ và $W_i^{(2)}$ lần lượt là các weight với các khối residual tương ứng
 
 ![](https://images.viblo.asia/2ded998c-deff-41d6-a4ff-40e076cc398b.png)
 
 Shake-Shake regularization sẽ có thêm 1 tham số scaling coefficient $\alpha$  
  $$x_{i+1}  = x_i + \alpha_i\mathcal{F}(x_i, \mathcal(W_i^{(1)}) + (1-\alpha)\mathcal{F}(x_i, W_i^{(2)}) $$ 
  trong đó $\alpha_i$ sẽ là biến ngẫu nhiêu theo uniform distribution (0, 1)
  
*Note: Với tập test, $\alpha$ = 0.5 sẽ cho kết quả như một lớp Dropout(0.5) thông thường<br>*

Tham số $\alpha$ được thay đổi với các giá trị ngẫu nhiên theo distribution trước khi thực hiện lượt backward pass tiếp theo. Từ đó tạo kết quả ngẫu nhiên giữa các lần backward pass và forward pass trong quá trình traning, làm giảm khả năng học thuộc dữ liệu của model. Tác giả cũng đề cập có thể hiểu đây là 1 dạng của *gradient augmentation*.
 

## 2. Phân tích kết quả
Khi training, tác giả có đề xuất 1 số mode để thử nghiệm<br>
**Shake**: random tất cả coefficient (random $\alpha$) trước khi forward pass<br>
**Even**: scaling coefficient đặt bằng 0.5 trước forward pass<br>
**Keep**: trong quá trình backward pass, scaling coefficient giữ nguyên với forward pass<br>

Mức độ áp dụng: <br>
Cấp độ **Batch**: giá trị scaling coefficient trong mỗi **batch** giống nhau<br>
Cấp độ **Image**: giá trị scaling coefficient khác nhau trong mỗi điểm dữ liệu (ảnh)<br>

#### Kết quả trên tập CIFAR10  
![](https://images.viblo.asia/83913fd2-6a36-423d-bb22-314c1cfb9e7c.png)

#### Kết quả trên tập CIFAR100
![](https://images.viblo.asia/6fe6a3da-96f4-4230-8a04-62d8e2fdb945.png)

Nhìn chung với mô hình shake với forward và shake với backward cho kết quả tốt nhất trên tập CIFAR10 với Error rate thấp hơn khá nhiều (chỉ 2.86). Có lẽ vì lý do này nên tác giả đặt tên là Shake-Shake (Forward - Backward)

#### So sánh với các SOTA khác
![](https://images.viblo.asia/7502a3fe-86cf-413d-97e7-7137b57c764c.png)
Với Shake-Shake regularization, model có error rate thấp hơn khá nhiều so với các mô hình trước đó.

## 3. Shake-Drop Regularization
Shake-Shake regularization tuy có kết quả rất tốt nhưng vẫn tồn tại 1 số điểm yếu
* được thiết kế cho mạng ResNet cấu trúc 3 nhánh (ResNeXt)
* nguyên nhân thực sự về độ hiệu quả chưa được làm rõ

Yoshihiro Yamada và các đồng nghiệp đã áp dụng một phương pháp để nâng cấp khả năng ứng dụng của Shake-Shake  
Cụ thể, nhóm nghiên cứu đã thêm [RandomDrop](https://arxiv.org/pdf/1603.09382.pdf) (hay ResDrop) vào trong mạng. RandomDrop có thể hiểu là dạng đơn giản của Dropout, tuy nhiên RandomDrop thực hiện drop **layer** thay vì các node như Dropout

Kiến trúc mạng Resnet:
$$x_{i+1} = G(x) = x + \mathcal{F(x)} $$

Random Drop:
$$  G(x) = 
\begin{cases}
    x + b_l \mathcal{F(x)}      & \text{ in train forward}\\
    x + b_l \mathcal{F(x)}   &\text{ in train backward}\\
    x + E[b_l] \mathcal{F(x)}   &\text{ in test}
\end{cases}
  $$
  trong đó $b_l \in \{0,1\}$ là biến ngẫu nhiên Bernoulli với xác suất $P(b_l = 1) = E[b_l] = p_l$  
  $p_l = 1 - \frac{l}{L}(1 - p_l)$
  được chọn với $p_l$ = 0.5
  
  Phương pháp tác giả đề xuất ShakeDrop:
  
  $$
      G(x) =
      \begin{cases}
            x + (b_l + \alpha - b_l \alpha) \mathcal{F(x)}      & \text{ in train forward}\\
            x + (b_l +\beta - b_l\beta) \mathcal{F(x)}   &\text{ in train backward}\\
                x + E[b_l + \alpha - b_l \alpha] \mathcal{F(x)}   &\text{ in test}
      \end{cases}
  $$
  
![](https://images.viblo.asia/0858f429-180a-4fbb-943f-f05227fb33d4.png)

![](https://images.viblo.asia/a16c26f7-a305-406f-9dab-d3eb88ae0d9b.png)

Phương pháp regularization cho mạng ResNet. a) và b) là các phương pháp được sử dụng trước đây như  [Shake-Shake](https://arxiv.org/abs/1705.07485) và RandomDrop<br>
c) là phương pháp regularization đơn giản 1 nhánh với đạo hàm của d)  
“Conv” thể hiện lớp convolution; E[x] là giá trị expected của x; với $\alpha, \beta$, và $b_l$ là tham số coefficients ngẫu nhiên



## 4. Thí nghiệm
![](https://images.viblo.asia/5b0de98e-4e1a-4e6e-bb8a-94558464b6fb.png)

![](https://images.viblo.asia/8799b477-7239-4587-aea4-f474cec0857f.png)

Theo thí nghiệm, ShakeDrop phù hợp nhất với PyramidNet khi thu được error rate 3.08 trên tập CIFAR-10 và 14.96 trên tập CIFAR-100. ShakeDrop cũng cho kết quả tốt hơn khi cùng áp dụng với mô hình 3 nhánh ResNeXt.

## 5. Kết luận
ShakeDrop là phương pháp stochastic regularization có thể được ứng dụng cho mạng ResNet nhằm hạn chế quá trình overfit. Qua các thí nghiệm, tác giả đã chứng minh được ShakeDrop có performance tốt hơn các phương pháp trước đó (Shake-Shake và RandomDrop). Các bạn có thể tham khảo paper gốc ShakeDrop để có thể xem thêm kết quả thí nghiệm của tác giả trên các mạng ResNeXt, Wide-ResNet, PyramidNet với các layer khác nhau trên các tập dữ liệu ImageNet, COCO mà mình chưa đề cập trong bài Viblo này.

Cảm ơn các bạn đã đọc bài!
## Reference
1. [Shake-Shake regularization](https://arxiv.org/pdf/1705.07485.pdf)
2. [ShakeDrop Regularization for Deep Residual Learning](https://arxiv.org/pdf/1802.02375.pdf)
3. [RandomDrop](https://arxiv.org/pdf/1603.09382.pdf)
4. [Review: Shake-Shake Regularization (Image Classification)](https://towardsdatascience.com/review-shake-shake-regularization-image-classification-d22bb8587953)
5. [Shake-Shake regularization with Interactive Code [ Manual Back Prop with TF ]](https://medium.com/@SeoJaeDuk/shake-shake-regularization-with-interactive-code-manual-back-prop-with-tf-20505cb21a9e)