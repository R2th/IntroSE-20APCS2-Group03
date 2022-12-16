Xin chào các bạn, tiếp nối bài viết trước về Active Learning - một trong những phương pháp hữu hiệu để xử lý đối với trường hợp thiếu dữ liệu có nhãn. Bài viết này mình xin phép được chia sẻ với các bạn một phương pháp khác đó là **semi-supervised learning** hay còn gọi với cái tên khác là **học bán giám sát**. Và không còn chần chừ gì nữa chúng ta sẽ bắt đầu ngay thôi. Gét gô. 

# Semi supervised learning là gì 
Semi-supervsied learning là một phương pháp sử dụng kết hợp cả dữ liệu có nhãn và dữ liệu không nhãn trong quá trình huấn luyện mô hình học máy. 

![image.png](https://images.viblo.asia/7d2ad66d-94b8-4b35-9eef-f670a0059291.png)

Các bạn có thể đặt câu hỏi rằng việc huấn luyện như vậy có sự khác biệt gì không? Ồ, chắc chắn là có rồi và chúng ta sẽ cùng nhau đi sâu tìm hiểu trong bài viết này. Xuyên suốt bài viết này, khái niệm **loss function** được hiểu là sự kết hợp giữa supervised loss và unsupervised loss $\mathcal{L} = \mathcal{L}_s +  \mu(t) \mathcal{L}_u$. Supervsied loss $\mathcal{L}_s$ không có gì xa lạ đối với các bạn nữa rồi vì dữ liệu là dữ liệu có nhãn. Chúng ta sẽ tìm hiểu rõ hơn về các thiết kế unsupervised loss $\mathcal{L}_u$. Chúng ta có thể để ý thấy một hàm $\mu(t)$ là một **ramp function** giúp tăng mức độ quan trọng của unsupervised loss theo thời gian.

# Các kí hiệu sử dụng trong bài
Để thuận tiện cho việc mô tả các  thuật toán trong bài viết này, chúng ta sẽ cùng nhau dịnh nghĩa một số kí hiệu cần thiết. Đừng quá lo lắng nếu như bạn không phải là người thích các kí hiệu toán, mọi thứ mình sẽ cố gắng giải thích một cách dễ hiểu nhất các bạn nhé. Sau đây là bảng kí hiệu 


| Kí hiệu | Ý nghĩa | 
| -------- | -------- |
| $L$     | Số lượng của các unique labels trong bài toán      |
| $(\mathbf{x}^l, y) \sim \mathcal{X}, y \in \{0, 1\}^L$ | Tập dữ liệu có nhãn, y là biểu diễn one-hot của true label |
|$\mathbf{u} \sim \mathcal{U}$ | Tập dữ liệu không nhãn |
| $\mathcal{D} = \mathcal{X} \cup \mathcal{U}$ | Toàn bộ tập dữ liệu bao gồm tập có nhãn và không có nhãn |
| $\mathbf{x}$ | Bất kể sample nào trong tập dữ liệu (kể cả có nhãn hoặc không nhãn) |
|$\bar{\mathbf{x}}$|Sample $x$ được apply augmentation|
| $\mathbf{x}_i$ | Sample thứ $i$ |
| $\mathcal{L}, \mathcal{L}_s, \mathcal{L}_u$ | Loss, supervised loss, unsupervised loss|
|$\mu(t)$|loss weight của dữ liệu không nhãn, là một hàm tăng theo thời gian|
|$p(y \vert \mathbf{x}), p_\theta(y \vert \mathbf{x})$|Xác suất có điều kiện của label set $y$ khi biết đầu vào $x$|

|$f_\theta(.)$|Mạng nơ ron cần huấn luyện với tham số $\theta$|
|$\mathbf{z} = f_\theta(\mathbf{x})$|Vector logits đầu ra của mạng nơn ron $f$|
|$\hat{y} = \text{softmax}(\mathbf{z})$|The predicted label distribution.|
|$D[.,.]$|Hàm đo khoảng cách giữa hai phân phối, có thể là MSE, cross entropy, KL divergence, etc.|
|$\beta$|Tham số weight EMA để cập nhật mô hình teacher - momentum|
|$\alpha, \lambda$|Các tham số cho thuật toán Mixup $\lambda \sim \text{Beta}(\alpha, \alpha)$|
|$T$|Temperature for sharpening the predicted distribution.|
|$\tau$|Ngưỡng để lựa chọn độ tin cậy của nhãn giả. |

# Một vài giả thuyết cần chú ý 
Chúng ta có một vài giả thuyết chúng ta cần chú ý khi thiết kế một phương pháp semi-supervised learning như sau:

* **H1 - Smoothness Assumptions**: Giả thiết này nói rằng nếu như hai mẫu dữ liệu gần nhau trong các high-density regiion trong feature space thì nhãn của chúng cũng rất có khả năng tương đồng nhau. Ví dụ như các mẫu dữ liệu thuộc vào cùng một cluster chẳng hạn. 
* **H2 - Cluster Assumptions**: Feature space sẽ bao gồm các vùng dày đặc (densse region) và các vùng thưa thớt (sparse region). Các vùng dày đặc sẽ tập trung lại thành 1 cụm và các sample thuộc vào cùng 1 cụm được kì vọng là sẽ có nhãn giống nhau.
* **H3 - Low-density Separation Assumptions** Ranh giới quyết định (decision boundary)  giữa các lớp có xu hướng nằm trong các vùng thưa thớt (spare regions), mật độ thấp (low density regions), bởi vì nếu không, ranh giới quyết định sẽ cắt một cụm mật độ cao (high-density cluster)_ thành hai lớp, tương ứng với hai cụm, làm mất hiệu lực H1 và H2.
* **H4: Manifold Assumptions**: Giả thuyết này nói rằng các dữ liệu ở không gian chiều cao hơn có thể biểu diễn được dưới các **đa tạp - manifold** chiều thấp hơn. Để hiểu rõ hơn về manifold trong học máy các bạn có thể tham khảo bài viết [sau đây](https://thetalog.com/machine-learning/locally-linear-embedding/). Giả thuyết H4 là cơ sở cho việc học biểu diễn **representation learning** giúp tìm ra các đặc trưng biểu diễn cho các dữ liệu có số chiều cao như hình ảnh ... trong một không gian biểu diễn có số chiều nhỏ hơn. 

# Consistency Regularization

Đây là một khái niệm rất quan trọng và cũng rất phổ biến trong khi thực hiện các thuật toán semi-supervised learning. **Consistency Regularization** hay còn gọi là **Consistency Training** xuất phát từ một giả định rằng các noise được inject trong dữ liệu (thông qua các phương pháp data augmentation) hoặc từ trong chính mạng nơ ron (thông qua các regularization như dropout) sẽ **không làm ảnh hưởng** đến kết quả đầu ra của mô hình. Hay nói cách khác, mô hình cần robusst với những nhiễu loạn trong dữ liệu đầu vào. Phương pháp này được lấy cảm hứng từ các thuật toán **self supervised learning** như **SimCLR, BYOL, SimCSE, etc.**.  Hi vọng sắp tới sẽ có thời gian để viết thêm nhiều về các hướng này. Tư tưởng chính của chúng là 

> **Các biến đổi khác nhau của cùng một mẫu dữ liệu đầu vào thì phải có cùng một giá trị biểu diễn**

Chúng ta sẽ cùng tìm hiểu một số thuật toán áp dụng **Consistency Regularization** nhé. 

## $\Pi- model$ 

Được giới thiệu trong paper [Regularization With Stochastic Transformations and Perturbations for Deep Semi-Supervised Learning](https://arxiv.org/abs/1606.04586) các tác giả đề xuất unsupervised loss sử dụng để minimize sự khác biệt giữa hai kết quả của cùng một mẫu dữ liệu khi đưa qua mạng nơ ron với các stochastic transformations (e.g. dropout, random max-pooling). Loss này sẽ không sử dụng nhãn nên có thể áp dụng cho tập dữ liệu không nhãn 

![image.png](https://images.viblo.asia/0520c366-f1ef-4924-a6c6-87232c2742d8.png)

Loss của $\Pi - model$ được định nghĩa là MSE giữa hai output kể trên. 

$$\mathcal{L}_u^\Pi = \sum_{\mathbf{x} \in \mathcal{D}} \text{MSE}(f_\theta(\mathbf{x}), f'_\theta(\mathbf{x}))$$

Trong đó $f'$ là một phiên bản của mạng nơ ron gốc $f$ với các **stochastic augmentation** hoặc **dropout** khác nhau được thêm vào. 

## Temporal ensembling

Được giới thiệu trong paper [Temporal Ensembling for Semi-Supervised Learning](https://arxiv.org/abs/1610.02242) cũng lấy cảm hứng từ Π-model. Trong Π-model thì với một mẫu dữ liệu đầu vào chúng ta sẽ cần phải đưa qua mạng 2 lần khiến cho chi phí tính toán tăng cao. Để khắc phục vấn đề này **Temporal Ensembling** sử dụng đầu ra của mô hình được cập nhật thông qua EMA trong quá trình huấn luyện để làm learning target. 

![image.png](https://images.viblo.asia/c46918c1-5dbb-4d75-92bb-f9c5fbb917fe.png)

công thức cập nhật cho momentum model khá đơn giản như sau 

$$\tilde{\mathbf{z}}^{(t)}_i = \frac{\alpha \tilde{\mathbf{z}}^{(t-1)}_i + (1-\alpha) \mathbf{z}_i}{1-\alpha^t}$$

Trong đó $\tilde{\mathbf{z}}^{(t)}$ là ensemble prediction tại epoch thứ $t$ và $\mathbf{z}_i$ là model prediction tại thời điểm huấn luyện.  Mẫu số $(1-\alpha^t)$ là để normalize giá trị của hàm loss về đúng startup bias.

## Mean teachers

![image.png](https://images.viblo.asia/2e3e0ed4-045f-49d6-828e-5a4d251da276.png)

Phương pháp Temporal Ensembling sẽ sử dụng chính model output đã được cập nhật thông qua EMA làm learning target.  Tuy nhiên việc cập nhật này chỉ diễn ra sau mỗi epoch dẫn đến mô hình học không có hiệu quả với những tập dữ liệu lớn do label prediction chỉ được cập nhật sau mỗi epoch. **Mean teachers** là phương pháp được đề xuất trong paper [Mean teachers are better role models: Weight-averaged consistency targets improve semi-supervised deep learning results
](https://arxiv.org/abs/1703.01780). Phương pháp này sử dụng một phiển bản self-ensembling của chính mô hình hiện tại được cập nhật thông qua **exponential moving average (EMA)**. Đây cũng chính là **momentum model** mà ta thường thấy trong các nghiên cứu sau này về semi-supervised learning. **Mean teachers** là paper đã đưa ra khái niệm về momentum model. Thực tế cho thấy phiên bản momentum model này sẽ cho độ ổn định tốt hơn là mô hình gốc. Thay vì cập nhật model outputs thì **Momentum model** sẽ cập nhật lại toàn bộ weights của mạng thông qua EMA. Việc cập nhật này đơn giản như sau 

$$\theta’ \gets \beta \theta’ + (1-\beta)\theta$$

Trong đó weight của mô hình gốc $\theta$ được coi như student và weight của mô hình momentum $\theta’$ được gọi là **mean teachers**. 

Trong mean teachers, **consistency regularization loss** có mục tiêu minimize student-teacher gap. **Mean teachers** được kiểm chứng bằng thực nghiệm cho kết quả tốt hơn mô hình student. Chúng ta có thể xem kết quả trong hình sau 

![image.png](https://images.viblo.asia/28b668cb-38bf-4f87-9742-257a10b0a974.png)

Một số kết luận được rút ra từ **mean teachers**:

* Input augmentation (e.g. random flips of input images, Gaussian noise) hay student model dropout là cần thiết để đạt được good performance. Tuy nhiên dropout sẽ không cần thiết trong mô hình mean-teachers 
* Độ chính xác của mô hình mean-teachers khá nhạy cảm với việc họn hệ số $\beta$. Thường thì ở giai đoạn đầu tiên hệ số này sẽ được chọn ở mức nhỏ $\beta=0.99$ và sẽ càng lớn hơn ở những stage sau bởi lúc này student đã improve khá chậm $\beta=0.999$.
* Tác giả thấy rằng MSE cho kết quả tốt hơn so với các consistency cost functions khác như KL-Divergence. 

## Adversarial Training

Một vài phương pháp **consistency training methods** hiện nay được lấy cảm hứng từ việc minimize prediction giữa các phiên bản augmentation khác nhau của cùng một mẫu dữ liệu đầu vào.  Tư tưởng này tương tự như trong Π-model tuy nhiên consistency regularization loss sẽ chỉ áp dụng cho unlabeled data. 

![image.png](https://images.viblo.asia/48b09a74-9169-42ae-91ed-6dfce60644ad.png)

Việc huấn luyện như vậy cũng đã được đề xuất trong các phương pháp Aversarial Training trong paper [Explaining and Harnessing Adversarial Examples](https://arxiv.org/abs/1412.6572) bằng cách đưa thêm các adversarial noise vào dữ liệu input giúp cho mô hình có thể robust với các adversarial attack.  Nó hoạt động khá tốt trên dữ liệu có nhãn. 

$$\begin{aligned}
\mathcal{L}_\text{adv}(\mathbf{x}^l, \theta) &= D[q(y\mid \mathbf{x}^l), p_\theta(y\mid \mathbf{x}^l + r_\text{adv})] \\
r_\text{adv} &= {\arg\max}_{r; \|r\| \leq \epsilon} D[q(y\mid \mathbf{x}^l), p_\theta(y\mid \mathbf{x}^l + r_\text{adv})] \\
r_\text{adv} &\approx \epsilon \frac{g}{\|g\|_2} \approx \epsilon\text{sign}(g)\quad\text{where }g = \nabla_{r} D[y, p_\theta(y\mid \mathbf{x}^l + r)]
\end{aligned}$$

Trong đó $q(y \mid \mathbf{x}^l)$ là true distribution, nó xấp xỉ hoá one-hot encoding của ground truth label. $y=p_\theta(y \mid \mathbf{x}^l)$ là model prediction. $D[.,.]$ là loss function đo lường sự khác biệt giữa hai phân phối. 

## Virtual Adversarial Training - VAT 

Được trình bày trong paper [Virtual Adversarial Training: A Regularization Method for Supervised and Semi-Supervised Learning](https://arxiv.org/abs/1704.03976). **VAT** mở rộng ý tưởng của **Adversarial Training** với semi-superviosed learning. Bởi trong semi-supervised learning chúng ta sẽ không thể biết được $q(y \mid \mathbf{x}^l)$. **VAT** đã thay thế nó bằng current model prediction của original input với trọng số của mô hình tại thời điểm hiện tại là $\hat{\theta}$. Lưu ý rằng $\hat{\theta}$ đơn giản chỉ là bản copy cứng của model weights và không cập nhật gradient vào $\hat{\theta}$

$$\begin{aligned}
\mathcal{L}_u^\text{VAT}(\mathbf{x}, \theta) &= D[p_{\hat{\theta}}(y\mid \mathbf{x}), p_\theta(y\mid \mathbf{x} + r_\text{vadv})] \\
r_\text{vadv} &= {\arg\max}_{r; \|r\| \leq \epsilon} D[p_{\hat{\theta}}(y\mid \mathbf{x}), p_\theta(y\mid \mathbf{x} + r)]
\end{aligned}$$

Chúng ta thấy rằng **VAT** sẽ áp dụng cả labeled và unlabeled data samples. 

## Interpolation Consistency Training - ICT 

Phương pháp này được đề xuất trong paper [Interpolation Consistency Training for
Semi-Supervised Learning](https://arxiv.org/pdf/1903.03825.pdf) làm giàu thêm dữ liệu bằng cách interpolate các mẫu dữ liệu khác nhau và bắt mô hình phải consistancy với các thay đổi đó. **ICT** được lấy cảm hứng từ [Mixup](https://arxiv.org/abs/1710.09412) để thực hiện mix hai sample images thông qua weighted và label smoothing được sử dụng để làm ground truth cho mô hình. Lấy cảm hứng từ Mixup, ICT expect prediction của model với input là mixup image cũng phải tương tự với việc interpolate từ 2 mẫu độc lập.

$$\begin{aligned}
\text{mixup}_\lambda (\mathbf{x}_i, \mathbf{x}_j) &= \lambda \mathbf{x}_i + (1-\lambda)\mathbf{x}_j \\
p(\text{mixup}_\lambda (y \mid \mathbf{x}_i, \mathbf{x}_j)) &\approx \lambda p(y \mid \mathbf{x}_i) + (1-\lambda) p(y \mid \mathbf{x}_j)
\end{aligned}$$

Trong đó $\theta'$ chính là momentum model của $\theta$

Tư tưởng chính của nó được thể hiện trong hình sau 

![image.png](https://images.viblo.asia/0196c98d-6ac4-499d-b476-73e012b3ee96.png)

Có thể nhận thấy rằng xác suất để hai samples được lựa chọn để interpolation có cùng một nhãn là khá thấp. (Ví dụ với dataset 1000 classs như image net). Dựa vào gỉa thuyết **Low-density Separation Assumptions** đã bàn ở các phần trên. Decision boundary thường có xu hướng tập trung tại các low density regions. Hàm loss của ICT như sau 

$$\mathcal{L}^\text{ICT}_{u} = \mathbb{E}_{\mathbf{u}_i, \mathbf{u}_j \sim \mathcal{U}} \mathbb{E}_{\lambda \sim \text{Beta}(\alpha, \alpha)} D[p_\theta(y \mid \text{mixup}_\lambda (\mathbf{u}_i, \mathbf{u}_j)), \text{mixup}_\lambda(p_{\theta’}(y \mid \mathbf{u}_i), p_{\theta'}(y \mid \mathbf{u}_j)]$$

trong đó $\theta'$ là phiên bản EMA của $\theta$

# Pseudo Labeling 

Lần đầu tiên được giới thiệu trong paper [Pseudo-Label : The Simple and Efficient Semi-Supervised Learning Method for Deep Neural Networks](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.664.3543&rep=rep1&type=pdf) năm 2013, phương pháp này gán các fake labels cho các dữ liệu không có nhãn dựa vào maximum softmax probabilities được dự đoán bởi mô hình hiện tại. Sau đó cả dữ liệu không nhãn và có nhãn được tổng hợp lại để huấn luyện mô hình theo chiến lược tương tự như huấn luyện dữ liệu có nhãn. 

Có một câu hỏi là tại sao việc sử dụng pseudo label như vậy lại hoạt động? Pseudo label về bản chất tương đương với **Entropy Regularizaiton** được đề cập trước đó trong paper [Semi-supervised Learning by Entropy Minimization](https://papers.nips.cc/paper/2004/hash/96f2b50b5d3613adf9c27049b2a888c7-Abstract.html) từ những năm 2004.  Nó cực tiểu hoá conditional entropy của các class probabilities đối với dữ liệu không nhãn giúp cho decision boundary giữa các class có low density. Hay nói các khác, việc minimize entropy giúp giảm sự overlap giữa các class và giúp các decision boundary phân tách rõ ràng hơn. 

![](https://lilianweng.github.io/posts/2021-12-05-semi-supervised/pseudo-label-segregation.png)

Huấn luyện với pseudo labeling thường là một quá trình được lặp lại với nhiều iterations trong đó mô hình sử dụng để sinh nhãn giả được gọi là mô hình teacher và mô hình học với nhãn giả được sinh ra được gọi là mô hình student. Chúng ta sẽ cùng tìm hiểu một số thuật toán ứng dụng của **Pseudo Labeling**

## Self Training với Noisy Student 

**Self training** không phải là một khái niệm mới. Thậm chí nó đã xuất hiện từ những năm 60 của thế kỉ trước [Scudder 1965](https://ieeexplore.ieee.org/document/1053799). Đây là một **iterative algorithm** trong đó các bước sau được thực hiện lặp đi lặp lại trong suốt quá trình huấn luyện:
* Khởi tạo và huấn luyện môt mô hình trên dữ liệu có nhãn 
* Sử dụng mô hình vừa huấn luyện để sinh nhãn giá cho dữ liệu không nhãn
* Lựa chọn các most confidence sample bổ sung vào tập dữ liệu có nhãn 
* Lặp lại bước 1

Một bài báo nổi tiếng gần đây đó là [Xie et al. (2020)](https://arxiv.org/abs/1911.04252) đề xuất mô hình **Noisy Student** đánh bại các phương pháp supervised trước đó trên cuộc thi ImageNet Classification. Để tạo mô hình teacher, họ huấn luyện EfficientNet ([Tan & Le 2019](https://arxiv.org/abs/1905.11946)) trên tập ImageNet sau đó sử dụng mô hình này để sinh nhãn giả cho tập dữ liệu gồm 300 triệu ảnh không có nhãn. Một mạng student có kích thước lớn hơn với mạng teacher được sử dụng để huấn luyện semi-supervised learning với các noise được inject vào trong data (thông qua augmentation) và trong model (thông qua dropout và max pooling). Có một vài điểm cần chú ý của phương pháp này như sau:
* Kích thước của student phải thực sự lớn để có thể học được nhiều partern phức tạp hơn từ dữ liệu không nhãn 
* Đồi hỏi dữ liệu phải có sự cân bằng giữa các class, đặc biệt là việc cân bằng số lượng các mẫu dữ liệu có chứa nhãn giả ở mỗi class. 
* Soft label cho kết quả tốt hơn là hard label 

Một diểm thú vị là **Noisy Student** cũng thể hiện rằng nó có khả năng chống lại các **adversarial robustness** như **FGSM (Fast Gradient Sign Attack)**


## Reducing Confirmation Bias 

**Confirmation Bias** là một trong những vấn đề gặp phải khi huấn luyện semi supervised learning. Vấn đề này xảy ra khi nhãn giả được sinh ra bởi một mô hình teacher chưa đủ tốt. Việc overfiting trên các nhãn giả sai có thể dẫn đến việc mô hình student học không tốt. 

Để reduce confirmation bias, [Arazo et al. (2019)](https://arxiv.org/abs/1908.02983) đề xuất 2 kĩ thuật để khắc phục tình trạng này. Thứ nhất đó là áp dụng Mixup với soft-labels. Với hai mẫu dữ liệu đầu vào $(\mathbf{x}_i, \mathbf{x}_j)$ và hai pseudo label tương ứng là $(y_i, y_j)$. Khi áp dụng Mixup, các interpolated label sẽ được sử dụng để tính toán Cross Entropy Loss thông qua softmax output. 

$$\begin{aligned}
&\bar{\mathbf{x}} = \lambda \mathbf{x}_i + (1-\lambda) \mathbf{x}_j \\
&\bar{y} = \lambda y_i + (1-\lambda) y_j \Leftrightarrow
\mathcal{L} = \lambda [y_i^\top \log f_\theta(\bar{\mathbf{x}})] + (1-\lambda) [y_j^\top \log f_\theta(\bar{\mathbf{x}})]
\end{aligned}$$

Tuy nhiên MixUp là không đủ nếu như chúng ta chỉ có một số lượng dữ liệu có nhãn quá ít. Các tác giả đề xuất oversampling các mẫu có nhãn trong một mini-batch để đạt được số lượng dữ liệu có nhãn theo một tỉ lệ nhất định 


## Meta Pseudo Label 

Được trình bày trong nghiên cứu của [Pham et al. 2021](https://arxiv.org/abs/2003.10580) đạt được kết quả SOTA vượt qua Pseudo Labels trong việc phân loại hình ảnh trên ImageNet với 90.2% accuracy.  Cũng giống như Pseudo Labels, Meta Pseudo Label cũng bao gồm mô hình teacher để xsinh nhãn giả để huấn luyện mô hình student. Tuy nhiên nó khác với Pseudo Labels đó là teacher sẽ được liên tục thích nghỉ với các feedback của student performance trên tập dữ liệu có nhãn. Điều này giúp cho teacher có thể sinh ra các mẫu dữ liệu có chất lượng tốt hơn để dạy cho student. 

Giả sử trọng số của teacher và student lần lượt là $\theta_T$ và $\theta_S$. Loss của mô hình student trên dữ liệu có nhãn được định nghĩa như một hàm $\theta^\text{PL}_S(.)$ của $\theta_T$ và chúng ta có thể cực tiểu hoá hàm loss này bằng các tối ưu mô hình teacher cho phù hợp:

$$\begin{aligned}
\min_{\theta_T} &\mathcal{L}_s(\theta^\text{PL}_S(\theta_T)) = \min_{\theta_T} \mathbb{E}_{(\mathbf{x}^l, y) \in \mathcal{X}} \text{CE}[y, f_{\theta_S}(\mathbf{x}^l)]  \\
\text{where } &\theta^\text{PL}_S(\theta_T)
= \arg\min_{\theta_S} \mathcal{L}_u (\theta_T, \theta_S)
= \arg\min_{\theta_S} \mathbb{E}_{\mathbf{u} \sim \mathcal{U}} \text{CE}[(f_{\theta_T}(\mathbf{u}), f_{\theta_S}(\mathbf{u}))]
\end{aligned}$$

Tuy nhiên để bài toán tối ưu phương trình trên là không tầm thường. Để có thể thực hiện được việc tính toán đạo hàm, tác giải sử dụng một ý tưởng được trình bày trước đó về meta learning [MAML](https://arxiv.org/abs/1703.03400), nhằm xấp xỉ hoá multi-step $\arg\min_{\theta_S}$ bằng one-step gradient $\theta_S$.

$$\begin{aligned}
\theta^\text{PL}_S(\theta_T) &\approx \theta_S - \eta_S \cdot \nabla_{\theta_S} \mathcal{L}_u(\theta_T, \theta_S) \\
\min_{\theta_T} \mathcal{L}_s (\theta^\text{PL}_S(\theta_T)) &\approx \min_{\theta_T} \mathcal{L}_s \big( \theta_S - \eta_S \cdot \nabla_{\theta_S} \mathcal{L}_u(\theta_T, \theta_S) \big)
\end{aligned}$$

Chú ý rằng khi sử dụng soft-label thì công thức trên hoàn toàn khả vi và có thể sử dụng back-propagation để tính toán đạo hàm như thông thường. Tuy nhiên với hard label thì hàm này không khả vi và cần phải sử dụng REINFORCE như đề xuất của tác giả. 

Quá trình tối ưu hoá có thể thực hiện luân phiên giữa hai mô hình:
* **Student update**: Cho một batch các unlabeled samples $\{ \mathbf{u} \}$ tiến hành sinh nhãn giả cho $f_{\theta_T}(\mathbf{u})$ và tối ưu trọng số $\theta_S$ bằng one step SGD $\theta’_S = \color{green}{\theta_S - \eta_S \cdot \nabla_{\theta_S} \mathcal{L}_u(\theta_T, \theta_S)}$
* **Teacher update** Cho một batch của labeled samples $\{(\mathbf{x}^l, y)\}$, sử dụng lại optimizer của student để optimize mô hình teacher $\theta’_T = \theta_T  - \eta_T \cdot \nabla_{\theta_T} \mathcal{L}_s ( \color{green}{\theta_S - \eta_S \cdot \nabla_{\theta_S} \mathcal{L}_u(\theta_T, \theta_S)} )$. Thêm vào đó UDA objective được sử dụng để áp dụng cho mô hình teacher để incorporate consistency regularization. 

Kết quả của **Meta Pseudo Label** khá ấn tượng, đạt được SOTA trên cuộc thi ImageNet 

![](https://lilianweng.github.io/posts/2021-12-05-semi-supervised/MPL-results.png)

# Pseudo Labeling with Consistency Regularization

Chúng ta hoàn toàn có thể sử dụng kết hợp cả hai kĩ thuật nói trên vào trong bài toán semi-supervised và sau đây là một vài thuật toán tiêu biểu cho hướng kết hợp này 

## MixMatch 

**MixMatch** ([Berthelot et al. 2019](https://arxiv.org/abs/1905.02249)), là một hướng tiếp cận tổng hợp cho semi-supervised learning giúp tận dụng các nguồn dữ liệu không có nhãn bằng sự kết hợp các kĩ thuật

* **Consistency regularization**: Như đã trình bày bên trên, mục tiêu của phương pháp này là giúp cho dầu ra của mô hình có độ tương đồng giữa sample gốc và các perturbed version của unlabeled samples.
* **Entropy minimization**: Lựa chọn các mẫu có kết quả dự đoán tự tin nhất 
* **MixUp Augmentation**: Giúp cho mô hình có linear behaviour giữa các samples như đã trình bày ở phần trên. 

Tư tưởng chính của MixMatch, giả sử chúng ta có một batch dữ liệu có nhãn $\mathcal{X}$ và không nhãn $\mathcal{U}$. Chúng ta tạo một augmented version của chúng thông qua $\text{MixMatch}(.)$ thu được $\bar{\mathcal{X}}$ và $\bar{\mathcal{U}}$ chứa các augmented samples và các guessed labels cho các mẫu dữ liệu không nhãn 

$$\begin{aligned}
\bar{\mathcal{X}}, \bar{\mathcal{U}} &= \text{MixMatch}(\mathcal{X}, \mathcal{U}, T, K, \alpha) \\
\mathcal{L}^\text{MM}_s &= \frac{1}{\vert \bar{\mathcal{X}} \vert} \sum_{(\bar{\mathbf{x}}^l, y)\in \bar{\mathcal{X}}} D[y, p_\theta(y \mid \bar{\mathbf{x}}^l)] \\
\mathcal{L}^\text{MM}_u &= \frac{1}{L\vert \bar{\mathcal{U}} \vert} \sum_{(\bar{\mathbf{u}}, \hat{y})\in \bar{\mathcal{U}}} \| \hat{y} - p_\theta(y \mid \bar{\mathbf{u}}) \|^2_2 \\
\end{aligned}$$

Trong đó $T$ là **sharpening temperature** để giảm sự overlap giữa các guessed label. $K$ là số lượng các augmentations generated từ mỗi unlabeled example, $\alpha$ là tham số của MixUp. 

Cho mỗi mẫu không nhãn $\mathbf{u}$, MixMatch sinh ra $K$ augmentation $\bar{\mathbf{u}}^{(k)} = \text{Augment}(\mathbf{u})$ và pseudo label được dự đoán bằng trung bình $\hat{y} = \frac{1}{K} \sum_{k=1}^K p_\theta(y \mid \bar{\mathbf{u}}^{(k)})$

![](https://lilianweng.github.io/posts/2021-12-05-semi-supervised/MixMatch.png)

Theo nghiên cứu của họ, điều quan trọng là phải có MixUp đặc biệt là trên dữ liệu không nhãn. Việc loại bỏ sharpen temperture trên phân phối nhãn giả làm ảnh hưởng đến hiệu suất khá nhiều. Average over multiple augmentations cho label guesing cũng đóng một vai trò rất quan trọng.


## FixMatch 

**FixMatch** ([Sohn et al. 2020](https://arxiv.org/abs/2001.07685)) sinh nhãn giả cho dữ liệu có nhãn với weak augmentation và chỉ giữ lại các high confidences samples. Tác giả nhận thấy rằng chính các weak augmenattion và high confidence sẽ giúp cho các nhãn giả trở nên đáng tin cậy hơn. Sau đó, FixMatch học cách dự đoán các nhãn giả này bằng một mẫu được strong augmentation. 

![](https://lilianweng.github.io/posts/2021-12-05-semi-supervised/FixMatch.png)

Hàm loss của FixMatch được thể hiện như sau:

$$\begin{aligned}
\mathcal{L}_s &= \frac{1}{B} \sum^B_{b=1} \text{CE}[y_b, p_\theta(y \mid \mathcal{A}_\text{weak}(\mathbf{x}_b))] \\
\mathcal{L}_u &= \frac{1}{\mu B} \sum_{b=1}^{\mu B} \mathbb{1}[\max(\hat{y}_b) \geq \tau]\;\text{CE}(\hat{y}_b, p_\theta(y \mid \mathcal{A}_\text{strong}(\mathbf{u}_b)))
\end{aligned}$$

Trong đó $\hat{y}_b$ là pseudo label cho các dữ liệu không nhãn, $\mu$ là hyperparameter thể hiện tỉ lệ tương đối của $\mathcal{X}$ và $\mathcal{U}$

* Weak Augmentation $\mathcal{A}_\text{weak}(.)$ là phép flip và shift augmentation cơ bản 
* Strong Augmentation $\mathcal{A}_\text{strong}(.)$ bao gồm các phương pháp AutoAugment, Cutout, RandAugment, CTAugment
![](https://lilianweng.github.io/posts/2021-12-05-semi-supervised/FixMatch-results.png)

Theo nghiên cứu của FixMatch:
* Sharpening the predicted distribution with a temperature parameter $T$ không quá ảnh hưởng nếu như threshold $\tau$ được sử dụng. 
* -   Cutout và CTAugment as part of strong augmentations là cần thiết để đạt được good performance.
* Khi thay thế weak augmentation cho label guessing bằng strong augmentation mô hình sẽ bị diverge trong quá trình training và nếu như loại bỏ hoàn toàn weak augmentation thì mô hình sẽ bị overfit trên guessed label. 
* Sử dụng weak thay vì strong augmentation cho pseudo label prediction sẽ cho ra các kết quả không ổn định. Strong data augmentation là yếu tố quan trọng trong sự thành công của FixMatch. 

# Kết luận 

Semi-supervised learning là một trong những kĩ thuật rất tiềm năng và rất phù hợp để ứng dụng trong thực tế khi mà lượng dữ liệu có nhãn của chúng ta không đủ. Mặc dù hiện tại các kĩ thuật semi-supervised learning vẫn đang được phát triển và bổ sung thêm nhiều hướng mới tuy nhiên việc hiểu được các tư tưởng và thuật toán nền tảng sẽ giúp chúng ta dễ dàng áp dụng hơn. Hi vọng bài viết này sẽ giúp ích cho các bạn. Hẹn gặp lại các bạn trong các bài viết tiếp theo.