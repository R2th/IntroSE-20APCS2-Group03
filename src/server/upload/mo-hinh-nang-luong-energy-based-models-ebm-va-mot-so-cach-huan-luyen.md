Mục tiêu của mô hình sinh là học phân bố $p(x)$ của dữ liệu $\{x_i\}$. Cụ thể hơn, cho trước một họ các phân bố có thể học được $\{p_{\theta}(x)\}$, ta sẽ tìm phân bố có (log-)likelihood lớn nhất, hay hiểu một cách trực qua là phân bố tương thích nhất với tập dữ liệu cho trước. Việc này cũng tương đương với tìm phân bố có cross-entropy với dữ liệu nhỏ nhất. Tuy nhiên đại lượng này không phải lúc nào cũng tính được dễ dàng.<br>

**Ví dụ:** Với VAE, ta có biến ngẫu nhiên ẩn $\boldsymbol{z}$, phân bố của dữ liệu được mô tả dưới dạng điều kiện $p(x|z)$. Để tính marginal likelihood $p(x)$, cũng như posterior $p(z|x)$ khi huấn luyện và suy luận, ta cần lấy tích phân theo biến liên tục nhiều chiều $\boldsymbol{z}$. Mô hình VAE giải quyết điều này bằng cách xấp xỉ posterior $p(z|x)$ bằng một phân bố $q(z)$ khác.

Một cách tiếp cận khác là mô hình phân bố dưới dạng không chuẩn hóa. Cụ thể hơn, hàm mật độ của một phân bố dương bất kì với tham số $\theta$ có thể viết được dưới dạng

$$
p_{\theta}(x) = \frac{\exp(-E_{\theta}(x))}{Z_{\theta}}
$$

 với $E_{\theta}(x)$ được gọi là *hàm năng lượng* của $x$, $Z_{\theta}=\int\exp(-E_{\theta}(x))dx$ là hằng số chỉ phụ thuộc vào tham số $\theta$ nhằm bảo đảm $p(x)$ là hàm mật độ xác suất. Log-likelihood của phân bố này sẽ là
 
  $$
\log p_{\theta}(x)= -E_{\theta}(x) - \log Z_{\theta}
 $$
  ## Phương pháp Markov chain Monte Carlo với Langevin dynamics
 Ta sẽ đi tìm hàm năng lượng thỏa mãn phân bố có log-likehood lớn nhất dựa vào gradient.
 
 $$
 \nabla_{\theta}\log p_{\theta}(x)= -\nabla_{\theta}E_{\theta}(x) - \nabla_{\theta}\log Z_{\theta}
 $$
 
 Gradient của hàm năng lượng có thể tính một cách dễ dàng. Với hằng số chuẩn hóa, sử dụng đạo hàm của hàm $\log, \exp$, chain-rule và tính tuyến tính của toán tử gradient, ta có khai triển sau
 
 $$\begin{aligned}
 \nabla_{\theta}Z_{\theta} &=  \nabla_{\theta}\log \int\exp(-E_{\theta}(x))dx\\
 &= \mathbb{E}_{x\sim p_{\theta}(x)}[-\nabla_{\theta}E_{\theta}(X)]
 \end{aligned}$$
 
 Lúc này gradient của log-likelihood được viết lại như sau
 
 $$
  \nabla_{\theta}\log p_{\theta}(x)= -\nabla_{\theta}E_{\theta}(x) +\mathbb{E}_{x\sim p_{\theta}(x)}[\nabla_{\theta}E_{\theta}(X)]
 $$

 Giá trị kì vọng của gradient có thể xấp xỉ bằng cách lấy mẫu từ phân bố $p(x)$ thông qua Markov chain Monte Carlo (MCMC). Với phân bố nhiều chiều, cách tiếp cận thường được sử dụng là Stochastic gradient Langevin dynamic (SGLD). Một cách trực quan, ta khởi tạo $x$ ngẫu nhiên, sau đó 'di chuyển' x để sao cho mô phỏng phân bố tốt nhất. Việc thay đổi này được thực hiện bằng cách tính gradient **tại $x$** của $\log$ xác suất. Ở bước này, ta có thể tận dụng cách mô hình của EBM để bỏ qua hằng số chuẩn hóa (lưu ý trong quá trình lấy mẫu $\theta$ không đổi)
 
 $$
 \nabla_x\log p(x) = -\nabla_{x}E_{\theta}(x) - \nabla_{x}\log Z_{\theta}= -\nabla_{x}E_{\theta}(x)
 $$
 
 Phương pháp SGLD thêm vào gradient một giá trị ngẫu nhiên để đảm bảo $x$ là phân bố thực sự chứ không chỉ hội tụ để giá trị MAP. Cụ thể hơn, với tỉ lệ $\epsilon$ (có thể hiểu như learning rate khi học tham số), ta có
 
 $$\begin{aligned}
 x_{t+1} - x_{t}& = -\epsilon\nabla_{x}E_{\theta}(x) +\sqrt{2\epsilon}\eta\\
  \text{với}\  &\eta\sim \mathcal{N}(0,1)
  \end{aligned}$$
  
Ví dụ minh họa cho phân bố chuẩn 2 chiều
```
import matplotlib.pyplot as plt
import numpy as np
mus = np.random.rand(2)
sigmas = np.array([[2, 1], [1, 2]], dtype = float)
pre = np.linalg.inv(sigmas)
def grad(point, mean, pre):
    #gradient hàm năng lượng của phân bố chuẩn
    return - np.matmul(point - mean, pre) 
x = np.random.rand(2)
lr = 0.3
arr = [np.copy(x)]
step = 1000
for i in range(step):
    x_grad = grad(x, mus, pre)
    noise = np.random.normal(0, 1, size = 2)
    x += lr * x_grad + noise * np.sqrt(2 * lr) # bỏ nhiễu để thấy sự khác nhau giữa nghiệm MAP và SGLD
    arr.append(np.copy(x))
plt.scatter(*zip(*arr))
plt.show()
```
  Cách làm này có thể xem như xấp xỉ của phương trình vi phân ngẫu nhiên Langevin 
  $$
  dX_t = -\nabla E_{\theta}(X_t)dt  + \sqrt2 dB_t
  $$
  với $B_t$ là chuyển động Brown, vi phân của nó được mô hình thông qua phân bố chuẩn. Phương trình này có nghiệm duy nhất là phân bố $p(x)=\frac{\exp(-E_{\theta}(x))}{Z_{\theta}}$[$^1$].
  
  [$^1$]: https://link.springer.com/book/10.1007/978-1-4939-1323-7
  
  Bên cạnh việc sử dụng để huấn luyện mô hình, việc lấy mẫu trực tiếp từ $p(x)$ còn được áp dụng để sinh dữ liệu từ phân bố đã được học.
  ## Adversarial training
  Như ta đã thấy ở trên, vấn đề của việc học và suy luận với EBM là tính toán cho hằng số chuẩn hóa $Z(\theta)$. Phương pháp MCMC giải quyết điều này bằng việc tìm cách lấy mẫu từ phân bố $p(x)$. Một cách tiếp cận khác là dùng một phân bố biến phân $q_{\phi}(x)$ để xấp xỉ đại lượng này (trong các phân bố hàm mũ, phân bố $q_{\phi}$ còn được gọi là đối ngẫu Fenchel của $p_{\theta}$).  Từ bất đẳng thức Jensen ta có 
  

  $$\begin{aligned}
  \log Z(\theta) &= \log \int \exp(-E_{\theta}(x))dx\\
  &= \log \int \frac{\exp(-E_{\theta}(x))}{q_{\phi}(x)}dq_{\phi}\\
  &\geq \int q_{\phi}(x)\log\frac{\exp(-E_{\theta}(x))}{q_{\phi}(x)}dx\\
 &=\mathbb{E}_{q_{\phi}(x)}[-E_{\theta}(x)] + H(q_{\phi})
  \end{aligned}$$
  
  Để $\log$-likelihood đạt giá trị lớn nhất, ta cần cực tiểu $-E_{\theta}(x) - \log Z_{\theta}$, và từ công thức trên ta có chặn dưới của $Z(\theta)$. Như vậy một mặt ta cần tìm $\theta$ sao cho $-E_{\theta}(x) - \log Z_{\theta}$ nhỏ nhất, mặt khác ta muốn tối ưu $\phi$ sao cho phân bố biến phân xấp xỉ $\log Z(\theta)$  tốt nhất. Tổng hợp lại ta có muốn hàm mục tiêu sau
  $$
     \max_{\theta}\min_{\phi} -E_{\theta}(x) - \mathbb{E}_{q_{\phi}(x)}[-E_{\theta}(x)] - H(q_{\phi})
  $$
  Cách tiếp cận này gần giống như adversarial training trong GAN, ở đây tham số $\phi$ của phân bố $q(x)$ đóng vai trò như tham số của mô hình sinh (không phải mô hình sinh của EBM mà ta cần), tham số $\theta$ đóng vai trò như discriminator khi kiểm tra phân bố của mô hình sinh thông qua log-likelihood.
  
  Một vấn đề của phương pháp này nằm ở việc tính entropy của $q_{\phi}$, do ta cần phải biết chính xác giá trị của hàm mật độ. Có một vài cách tiếp cận bằng việc dùng một phân bố biến phân nữa để xấp xỉ.
  
  Một cách giải quyết khác là mô tả quá trình lấy mẫu dưới dạng flow[$^2$], lúc này hàm mật độ sẽ được tính thông qua hàm mật độ tại thời điểm trước. Ví dụ với phương pháp SGLD bên trên, giả sử cần lấy $T$ mẫu, ta sẽ thêm $T$ biến ngẫu nhiên ẩn $v_i$ đại diện cho sự thay đổi của $x$ giữa mỗi bước, lúc này ta có phân bố sau
  $$
  p(x, \{v^i\}_{i=1}^T) = \frac{\exp(-E(x) - \frac{\lambda}{2}\sum^T_i||v_i||^2_2)}{Z}

  $$
Likelihood lúc này là của phân bố trên cả $x$ và $v_i$, tuy nhiên do $x$ và $v_i$ độc lập nên tối ưu đại lượng này tương đương với cực đại $\log$-likelihood của phân bố marginal trên $x$. Hàm mục tiêu lúc này trở thành
  $$
     \max_{\theta}\min_{\phi} -E_{\theta}(x) - \mathbb{E}_{q_{\phi}(x,\{v^i\}_{i=1}^T)}[-E_{\theta}(x)- \frac{\lambda}{2}\sum^T_i||v_i||^2_2] - H(q_{\phi})
  $$

  Kí hiệu phân bố của $x$ và $\{v_i\}_{i=1}^k$ là $q^k(x, \{v_i\}_{i=1}^k)$, $p_{\Eta}$ là phân bố của nhiễu thêm vào. Do nhiễu $\eta$ tại mỗi bước độc lập với $x$ và $v^i$, ta có
  $$q^{k-1}(x_{k-1}, \{v_i\}_{i=1}^{k-1}).p_{\Eta}(\eta)=q^{k}(x_{k-1}, \{v_i\}_{i=1}^{k-1}, \eta)$$
  Ở mỗi bước thứ $i$, $v_i$ được tính từ gradient hàm năng lượng tại $x_{i-1}$ như sau
  $$v_i = -\epsilon\nabla E_{\theta}(x_{i-1}) +\eta\, ,\quad \eta\sim p_{\Eta_{i-1}}$$ 
  Do đó
  $$q^{k}(x_{k-1}, \{v_i\}_{i=1}^{k-1}, \eta)= |\det(J_f)| q^{k}(x_{k-1}, \{v_i\}_{i=1}^{k-1}, v_k)$$
  trong đó $J_f$ là ma trận Jacobian của ánh xạ $f:(x, V, v) \mapsto (x, V, -\epsilon\nabla E_{\theta}(x) + v)$. Ma trận này có định thức bằng $1$, suy ra $q^{k}(x_{k-1}, \{v_i\}_{i=1}^{k-1}, \eta)= q^{k}(x_{k-1}, \{v_i\}_{i=1}^{k-1}, v_k)$
  
  Sau đó $x_k$ được tính từ $x_{k-1}$ và $v_k$. Tương tự ta cũng có $q^{k}(x_{k-1}, \{v_i\}_{i=1}^{k-1}, v_k)=q^{k}(x_{k}, \{v_i\}_{i=1}^{k-1}, v_k)$. Như vậy ta có thể  tính được hàm mật độ thông qua hàm mật độ của các phân bố khởi tạo.
  
  Tuy nhiên phương pháp này có nhược điểm khi dùng số bước lớn, $\prod p_{\Eta_i}$ sẽ gần với $0$. Một phương pháp tổng quát hơn[$^2$] sử dụng Hamilton dynamic có tính chất hàm mật độ không đổi sau mỗi bước, giúp việc tính toán đơn giản hơn.
  
  [$^2$]: https://proceedings.neurips.cc/paper/2019/file/767d01b4bac1a1e8824c9b9f7cc79a04-Paper.pdf
  
  ## Tham khảo
 [How to Train Your Energy-Based Models](https://proceedings.neurips.cc/paper/2019/file/767d01b4bac1a1e8824c9b9f7cc79a04-Paper.pdf)