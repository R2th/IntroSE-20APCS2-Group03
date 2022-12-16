Trong [bài trước](https://viblo.asia/p/mo-hinh-nang-luong-energy-based-models-ebm-va-mot-so-cach-huan-luyen-6J3Zga9B5mB), ta đã biết mô hình năng lượng biểu diễn một phân bố không chuẩn hóa, cụ thể hơn
$$
p(x)=\frac{\exp( -E(x))}{Z}
$$
Với phân bố $p(x)$ như trên, ta sinh dữ liệu bằng phương pháp stochasic gradient Langevin dynamics. Phương pháp này sử dụng gradient tại $x$ của $\log p(x)$ để lấy mẫu. 

Từ điều này, ta có thể thấy việc học một mô hình năng lượng có thể chuyển thành học $\nabla_{x}\log p(x)$, còn được gọi là hàm score, thay vì học tham số $\theta$ của hàm năng lượng. Quan sát này dẫn tới một lớp các phương pháp học mới, được gọi là score matching. 

Mục tiêu của chúng ta là xây dựng một hàm score $s_{\theta}(x)$ sao cho xấp xỉ $\nabla_{x}\log p(x)$ tốt nhất. Ta sẽ sử dụng Fisher divergence để đo sự khác nhau giữa phân bố $p(x)$ cần xấp xỉ và phân bố ẩn $q(x)$ nhận $s_{\theta}(x)$ làm hàm score. Giá trị này được tính như sau
$$
F(p, q) = \int_{\mathbb{R}^d} ||\nabla \log q(x)-\nabla\log p(x)||^2p(x)dx
$$
Fisher divergence có thể xem như khoảng cách $L_2$ trung bình giữa hai hàm score. 

Tuy nhiên, ta không thể tính trực tiếp giá trị này được, do nó yêu cầu gradient của phân bố $p(x)$ thật của dữ liệu, trong khi ta chỉ có một lượng mẫu từ phân bố này là dữ liệu huấn luyện. 
## Phương pháp sliced score matching
Ta có thể thêm ràng buộc của phân bố để biến đổi Fisher divergence về dạng tính được. Khoảng cách này được viết lại như sau (giả sử tất cả hạng tử đều hữu hạn)

$$\begin{aligned}
F(p, q) &= \mathbb{E}_p[||\nabla\log q(X)||^2] + \mathbb{E}_p[||\nabla\log p(X)||^2] - 2\mathbb{E}_p[\nabla\log p(X)^\intercal\nabla\log q(X)]\\
\end{aligned}$$

Hạng tử thứ nhất không chứa $\nabla\log p(x)$, hạng tử thứ hai không phụ thuộc vào $q(x)$, do đó có thể bỏ qua. Ta sẽ biến đổi hạng tử cuối cùng để bỏ đi $\nabla\log p(x)$. Áp dụng chain rule, ta có
$$\begin{aligned}
\mathbb{E}_p[\nabla\log p(X)^\intercal\nabla\log q(X)] &=  \sum_i\int_{\mathbb{R}^d}p(x)\frac{\partial p(x)}{\partial x_i}\frac{1}{p(x)}\frac{\partial \log q(x)}{\partial x_i}dx \\
&= \sum_i\int_{\mathbb{R}^d}\frac{\partial p(x)}{\partial x_i}s_i(x)dx 
\end{aligned}$$
$$\text{với }s_i(x)=\frac{\partial \log q(x)}{\partial x_i}\text{ là chỉ số thứ i của }s(x)=\nabla\log q(x)$$
Ở đây ta sẽ dùng tích phân từng phần để loại bỏ đạo hàm riêng của $p(x)$
$$
\frac{\partial p(x) s_i(x)}{\partial x_i}=\frac{\partial p(x)}{\partial x_i}s_i(x)+p(x)\frac{\partial s_i(x)}{\partial x_i}
$$
Giả sử $\lim_{||x||\to\infty}p(x)s_i(x)=0$, ta có
$$
\int_{\mathbb{R}}\frac{\partial p(x)}{\partial x_i}s_i(x)dx_i+\int_{\mathbb{R}}p(x)\frac{\partial s_i(x)}{\partial x_i}dx_i=\lim_{x_i\to\infty}p(x)s_i(x) - \lim_{x_i\to-\infty}p(x)s_i(x)=0
$$
$$\begin{aligned}
\int_{\mathbb{R}^d}\frac{\partial p(x)}{\partial x_i}s_i(x)dx &=\int_{\mathbb{R}^{d-1}}\int_{\mathbb{R}}-p(x)\frac{\partial s_i(x)}{\partial x_i}dx_id(x_1...x_{i-1}x_{i+1}...x_n)\\
&=-\int_{\mathbb{R}^d}p(x)\frac{\partial s_i(x)}{\partial x_i}dx
\end{aligned}
$$
Tổng hợp lại, Fisher divergence sẽ được viết lại như sau
$$\begin{aligned}
F(p,q)&= \mathbb{E}_p[||s(X)||^2]+2\mathbb{E}_p[\sum_i\frac{\partial s_i(X)}{\partial x_i}] +c\\
&=\mathbb{E}_p[||s(X)||^2]+2\mathbb{E}_p[tr(J_s(X))] +c
\end{aligned}
$$
với $J_s$ là ma trận Jacobian của $s(x)$.

Công thức này đã không còn $\nabla \log p(x)$, do đó có thể tính toán được. Tuy nhiên điều này cũng chỉ là trên lý thuyết, vì ta sẽ cần phải tính (vết của) ma trận Jacobian, trong khi $x$ thường có số chiều lớn. Ta có thể xấp xỉ giá trị này bằng cách chiều xuống một vector ngẫu nhiên $v$ (đây là kĩ thuật Hutchinson). Cụ thể hơn, với vector ngẫu nhiên $v$ thỏa mãn $\mathbb{E}[vv^\intercal]=I$, ta có
$$
tr(J_s)=tr(J_sI)=tr(J_s\mathbb{E}[vv^\intercal])=\mathbb{E}[tr(J_svv^\intercal)]=\mathbb{E}[v^\intercal J_sv]
$$
Cách làm này này sẽ giúp tính vết nhanh hơn, cụ thể hơn với $v$ bất kì, ta có
$$
\nabla v^\intercal s(x)=v^\intercal J_s+(\nabla v)s(x)=v^\intercal J_s
$$
Nếu ta lấy mẫu $m$ vector $v$, ta sẽ cần tính $m$ lần gradient của $v^\intercal s(x)$, trong khi với $J_s$ sẽ cần tính gradient $d$ lần với $d$ là số chiều của $x$. Phương pháp này được gọi là **sliced score matching**, với hàm mục tiêu lúc này là 
$$
L(p, q)=\mathbb{E}_{p(x)}[||s(X)||^2]+2\mathbb{E}_{p(x)}\mathbb{E}_{p(v)}[v^\intercal J_sv]
$$
## Phương pháp denoise score matching
Một cách khác để loại bỏ $\nabla\log p(x)$ là cộng thêm nhiễu vào phân bố. Ta đạt được biến ngẫu nhiên mới $\tilde{X}=X+\epsilon$ với $\epsilon$ là nhiễu tùy ý, giả sử $\epsilon \sim \mathcal{N}(0,\sigma^2)$. Phân bố của biến ngẫu nhiên này sẽ là $q(\tilde{x})=\int q(\tilde{x}|x)p(x)dx$, trong đó $\tilde{x}|x \sim\mathcal{N}(x,\sigma^2)$. Với phân bố mới, Fisher divergence được viết lại thành
$$\begin{aligned}
F(p,q)&= \mathbb{E}_{q(\tilde x)}[||s_{\theta}(\tilde X)||^2]  - 2\mathbb{E}_{q(\tilde x)}[\nabla_{\tilde x}\log q(\tilde X)^\intercal s_{\theta}(\tilde X)] +c\\
&= \mathbb{E}_{q(\tilde x)}[||s_{\theta}(\tilde X)||^2]-2\int \nabla_{\tilde x} q(\tilde x)^{\intercal}s_{\theta}(\tilde x)d\tilde x +c\\
&= \mathbb{E}_{q(\tilde x)}[||s_{\theta}(\tilde X)||^2]-2\int(\int p(x)\nabla q(\tilde x|x)dx)^\intercal s_{\theta}(\tilde x)d\tilde x +c\\
&=\mathbb{E}_{q(\tilde x)}[||s_{\theta}(\tilde X)||^2]-2\int\int p(x)q(\tilde x|x)\nabla \log q(\tilde x|x)^\intercal s_{\theta}(\tilde x)dx d\tilde x+c\\
&= \mathbb{E}_{q(\tilde x)}[||s_{\theta}(\tilde X)||^2]-2\mathbb{E}_{q(\tilde x, x)}[\nabla_{\tilde x}\log q(\tilde X|X)^\intercal s_{\theta}(X)]+c\\
&=\mathbb{E}_{q(\tilde x,x)}[||s_{\theta}(\tilde X)-\nabla \log q(\tilde X|X)||^2]+c
\end{aligned}
$$
ở đây $c$ tượng trưng cho hằng số không phụ thuộc vào $s(x)$.

Như vậy, ta không cần phải tính  $\nabla\log p(x)$ nữa mà chuyển thành tính score của phân bố $\mathcal{N}(x,\sigma^2)$ với công thức là $\frac{1}{\sigma^2}(x-\tilde x)$. Tuy nhiên điều này dẫn tới một điểm yếu của phương pháp này. Thứ nhất, ta muốn nhiễu có phương sai không quá lớn, nếu không sẽ làm sai lệch phân bố đi nhiều. Tuy nhiên, khi phương sai của nhiễu nhỏ thì phương sai khi ước lượng sẽ tăng. Cụ thể hơn khi $\sigma\to0$, $s(\tilde x)\approx s(x)$, đại lượng trên xuất hiện thành phần 

$$
    \frac{(x-\tilde x)^2}{\sigma^4}-2(\frac{x-\tilde x}{\sigma^2})^\intercal s(x)
$$
có phương sai tiến tới $\infty$. Ta có thể dùng [control variate](https://en.wikipedia.org/wiki/Control_variates) để giảm phương sai khi ước lượng với hàm
$$\begin{aligned}
c(\tilde x, x) &= \frac{(x-\tilde x)^2}{\sigma^4}-2(\frac{x-\tilde x}{\sigma^2})^\intercal s(x)-\mathbb{E}_{q(\tilde x, x)}[\frac{(x-\tilde x)^2}{\sigma^4}-2(\frac{x-\tilde x}{\sigma^2})^\intercal s(x)]\\
&=\frac{(x-\tilde x)^2}{\sigma^4}-2(\frac{x-\tilde x}{\sigma^2})^\intercal s(x)-\frac{d}{\sigma^2}
\end{aligned}
$$
trong đó $d$ là số chiều của x. Với $m$ mẫu $x^i, \tilde x^i$ từ $q(\tilde x, x)$, hàm mục tiêu sẽ được xấp xỉ như sau
$$
\frac{1}{m}\sum_i^m ||s_{\theta}(\tilde x^i)-\frac{x^i-\tilde x^i}{\sigma^2}||^2-c(\tilde x^i, x^i)
$$
## Mối liên hệ giữa MCMC và score matching
Ta đã biết phương pháp MCMC đi tìm phân bố $q(x)$ có likelihood cao nhất, tương đương với việc tìm phân bố có KL divergence nhỏ nhất với phân bố của dữ liệu $p(x)$. Trong khi đó score matching đi tìm phân bố có Fisher divergence nhỏ nhất. Do vậy, mối liên hệ giữa hai phương pháp có thể quy về mối liên hệ giữa hai loại khoảng cách này.


Cho biến ngẫu nhiên $X$ và $X_t=X+\sqrt tZ$ với $z\sim\mathcal{N}(0,1)$, $\tilde p,\tilde q$ là hai luật của $X$, $p, q$ là hai luật tương ứng của $X_t$. Giả sử $p, q$ hội tụ về $0$ đủ nhanh khi $||x||\to\infty$, ta có **đẳng thức de Bruijn**

$$
\frac{d}{dt}KL( p||q)=-\frac{1}{2}F( p, q)
$$
Cực tiểu Fisher divergence tương đương với việc tìm phân bố $\tilde q$ sao cho chênh lệch của KL divergence giữa hai luật trước và sau khi cộng thêm nhiễu là nhỏ nhất. Nói cách khác, score matching đi tìm phân bố có tính ổn định với nhiễu.
## Cực tiểu vi phân của KL divergence
Đẳng thức de Bruijin có thể tổng quát như sau: Cho phương trình vi phân ngẫu nhiên 
$$
dX_t=V(x)dt+\beta dW_t
$$
với $p,q$ là hai luật tại $X_0$, $p_t, q_t$ là hai luật tương ứng tại $X_t$. Ta có
$$
\frac{d}{dt}KL( p_t||q_t)=-\frac{1}{2}F( p_t, q_t)
$$
nếu $\frac{d}{dt}KL( p_t||q_t)$ tồn tại.
Ta có thể thể thấy đẳng thức ở phần trước là trước là một trường hợp đặc biệt khi $dX_t = dW_t$.

Một trường hợp khác là phương trình Langevin như trong bài trước, có phân bố ổn định là $p_{data}(x)$

$$
\frac{d}{dt}KL( p_{data}||q_t)=-\frac{1}{2}F( p_{data}, q_t)
$$
dẫn đến một cách khác để cực tiểu Fisher divergence, đó là cực tiểu tốc độ thay đổi của KL divergence. Do Fisher divergence luôn không âm, đẳng thức này chỉ ra KL divergence luôn giảm, do đó ta có thể dùng một toán tử $\phi$ sao cho $KL(p||q)\geq KL(\phi(p)||\phi(q))$ để mô phỏng toán tử sinh của chu trình ngẫu nhiên. Lúc này, hàm mục tiêu cần cực tiểu sẽ là
$$
KL(p||q)- KL(\phi(p)||\phi(q))
$$
## Kết 
Trong bài này, chúng ta đã tìm hiểu về họ phương pháp score matching và tính chất của nó. Ở các bài tiếp theo, chúng ta sẽ tiếp tục tìm hiểu về các phương pháp khác để huấn luyện EBM, và các vấn đề khi huấn luyện score-based models.
## Tham khảo
- [How to Train Your Energy-Based Models](https://arxiv.org/abs/2101.03288)
- [A connection between score matching and denoising autoencoders](http://www.iro.umontreal.ca/~vincentp/Publications/smdae_techreport.pdf)
- [Sliced score matching: A scalable approach to density and score estimation](https://arxiv.org/abs/1905.07088)
- [Chứng minh đẳng thức de Bruijn cho trường hợp $dX_t=dW_t$](https://arxiv.org/ftp/arxiv/papers/1205/1205.2629.pdf)
- [Chứng minh đẳng thức de Bruijn tổng quát](https://arxiv.org/pdf/1702.03656.pdf)