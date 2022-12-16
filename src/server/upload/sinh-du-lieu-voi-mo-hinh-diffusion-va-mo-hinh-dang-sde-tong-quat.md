Trong bài viết này, mình sẽ giới thiệu về mô hình diffusion, một mô hình sinh với sự đột phá gần đây, cùng với mô hình score matching đã vượt qua GAN trong việc sinh dữ liệu. Hai mô hình này có thể xem như trường hợp đặc biệt của phương trình vi phân ngẫu nhiên, và được tổng quát thành mô hình dạng phương trình vi phân ngẫu nhiên (Stochastic differential equation - SDE), đưa ra một góc nhìn mới cũng như việc kết hợp hai loại mô hình này. Mô hình diffusion cũng như mô hình dạng SDE khi sinh dữ liệu không điều kiện thậm chí còn cho kết quả tốt hơn GAN khi sinh dữ liệu với nhãn cho trước.

Do nội dung khá dài nên phần cài đặt mình sẽ để sang bài khác nếu có thời gian, các bạn có thể xem notebook tutorial của tác giả tại [đây](https://colab.research.google.com/drive/120kYYBOVa1i0TD85RjlEkFjaWDxSFUx3?usp=sharing). Một số chứng minh chi tiết mình sẽ để ở cuối để tránh đi xa khỏi nội dung chính, bạn đọc quan tâm có thể đọc thêm. 
# Mô hình diffusion
Ý tưởng của phương pháp này là biến đổi phân bố dữ liệu thành một phân bố có thể lấy mẫu được. Việc sinh dữ liệu sẽ bắt đầu từ phân bố này, sau đó biến đổi ngược về phân bố ban đầu. Mô hình cần học ở đây sẽ là phép biến đổi ngược đó. Quá trình biến đổi này được mô tả bằng một chuỗi các phân bố, cụ thể hơn chúng ta sẽ sử dụng quá trình ngẫu nhiên để mô tả chuỗi này.

![image.png](https://images.viblo.asia/a6e379fc-7807-45f8-a0bf-f4d3f373692d.png)

Quá trình ngẫu nhiên là một họ các biến ngẫu nhiên $\{X_t\}_{t\in T}$ từ cùng một không gian xác suất sang cùng một không gian trạng thái. Ở đây ta chỉ quan tâm đến tập chỉ số $T$ có thứ tự, được hiểu như trục thời gian, ví dụ $T=\mathbb{R}^+$ hoặc $T=\mathbb{Z}^+$. 

Quá trình ngẫu nhiên được gọi là quá trình Markov nếu nó thỏa mãn tính chất Markov. Một cách trực quan, xác suất của trạng thái tại tương lai khi biết trạng thái hiện tại không phụ thuộc vào quá khứ. Đối với chuỗi Markov, tính chất này có thể được viết thành 
$$
\mathbb{P}(X_{n+m}=i|X_1,\dots,X_n)=\mathbb{P}(X_{n+m}=i|X_n)
$$
## Quá trình thuận
Tại từng mốc thời gian, dữ liệu sẽ được biến đổi bằng cách thêm lần lượt nhiễu, quá trình này được gọi là quá trình thuận. Để cho đơn giản, xác suất chuyển từ thời điểm $t$ sang thời điểm $s$ sẽ được kí hiệu là $q(x_s|x_t)$.Từ tính chất Markov, xác suất liên hợp được phân tích thành
$$
q(x_0\dots x_t)=q(x_0)\prod_{i=1}^T q(x_i|x_{i-1})
$$

Trong quá trình thuận, xác suất chuyển sẽ được xác định trước là một phân bố nào đó. Ở đây tham số của phân bố này sẽ được cố định trước, do đó không tham gia vào quá trình huấn luyện, tuy nhiên trong trường hợp khác chúng cũng có thể xem như tham số học được.

Đối với dữ liệu ảnh, chúng ta có thể xem chúng như dữ liệu liên tục, và xác suất chuyển $q(x_t|x_{t-1})$ được mô hình bởi $\mathcal{N}(x_t;\sqrt{1-\beta_t} x_{t-1}, \beta_tI)$.
Xác suất khi biết trạng thái $x_0$ cũng là phân bố Gaussian, đạt được nhờ tính chất Markov. Đặt $\alpha_t = 1-\beta_t,\,\bar{\alpha_t}=\prod_{i=1}^t \alpha_i$, ta có $q(x_t|x_0) = \mathcal{N}(x_t; \sqrt{\bar{\alpha_t}}x_0, (1-\bar{\alpha_t})I)$, chứng minh công thức có thể xem ở cuối bài.

Phân bố tại trạng thái $x_T$ được xem như prior, sao cho có thể lấy mẫu được. Nhờ vào tính chất của xác suất điều kiện trên, với $\beta_t$ phù hợp, $q(x_T)\approx \mathcal{N}(0, I)$.
## Quá trình nghịch
Khi đã có phân bố prior $p(x_T)$ dễ lấy mẫu rồi, việc sinh dữ liệu sẽ bắt đầu lấy mẫu từ phân bố này, sau đó biến đổi ngược trở về phân bố $p(x_0)$ ban đầu. Việc làm này cũng có thể mô tả bởi một quá trình ngẫu nhiên, gọi là quá trình nghịch, chúng ta sẽ cần một mô hình học quá trình ngẫu nhiên này. Quá trình này có thể xem như một chuỗi Markov với chiều ngược lại, do đó xác suất liên hợp được phân tích thành
$$
p(x_0\dots x_T) = p(x_T)\prod_{i=1}^{T}p(x_{i-1}|x_i)
$$
Mục tiêu lúc này là tìm xác suất chuyển $p(x_{t-1}|x_t)$ của chuỗi Markov này. Ta sẽ mô hình xác suất này bởi phân bố Gaussian, có dạng $\mathcal{N}(x_{t-1};\mu_{\theta}(x_t,t), \Sigma_{\theta}(x_t, t))$. Khi mô hình được quá trình nghịch rồi, ở bước sinh mẫu, dữ liệu từ phân bố của $x_T$ sẽ được biến đổi thêm lần lượt nhiễu dựa trên xác suất chuyển này.

## Huấn luyện
Mục tiêu của quá trình huấn luyện là cực đại likelihood của phân bố dữ liệu của mô hình sinh
$$\begin{aligned}
p(x_0)&=\int p(x_0\dots x_T)dx_1\dots x_T\\
&=\int \frac{p(x_0\dots x_T)}{q(x_1\dots x_T|x_0)}q(x_1\dots x_T|x_0)dx_1\dots x_T\\
&= \int p(x_T)\prod_{i=1}^T \frac{p(x_{i-1}|x_i)}{q(x_i|x_{i-1})} dQ(x_1\dots x_T|x_0)
\end{aligned}$$
Chúng ta sẽ muốn biến đổi likelihood sao cho có thể tối ưu trên từng thành phần (tương ứng với thời điểm) riêng. Áp dụng bất đẳng thức Jensen ta có

$$\begin{aligned}
\log p(x_0) &\geq\int \log(p(x_T)\prod_{i=1}^T \frac{p(x_{i-1}|x_i)}{q(x_i|x_{i-1})}) dQ(x_1\dots x_T|x_0)
\end{aligned}$$

với $t>1$, ta có thể tính posterior như sau
$$\begin{aligned}
q(x_t|x_{t-1}) &= q(x_t|x_{t-1}, x_0)\quad \text{tính chất Markov}\\
&=\frac{q(x_{t-1}|x_t, x_0)q(x_t|x_0)}{q(x_{t-1}|x_0)}
\end{aligned}
$$
Chặn dưới của log likelihood trở thành

$$\begin{aligned}
L(x_0)&=\mathbb{E}_{q(x_1\dots x_{T}|x_0)}[\log p(X_T)+\sum_{t=2}^T\log\frac{p(X_{t-1}|X_t)}{q(X_t|X_{t-1})} + \log p(x_0|X_1) + \log q(X_1|x_0)]\\
&=\mathbb{E}_{q(x_1\dots x_{T}|x_0)}[\log\frac{p(X_T)}{q(X_T|x_0)}+\sum_{t=2}^T\log \frac{p(X_{t-1}|X_T)}{q(X_{t-1}|X_t, x_0)}  + \log p(x_0|X_1) + \log q(X_1|x_0)]\\
\end{aligned}$$

Thành phần $\log q(x_1|x_0)$ là xác suất chuyển của quá trình thuận, do đó không có tham số và có thể loại bỏ trong quá trình huấn luyện. Mục tiêu của chúng ta là cực đại chặn dưới của log likelihood, tương đương với việc cực tiểu hàm mục tiêu sau

$$
L=\mathbb{E}_q[KL(q(x_T|X_0)||p(x_T)) +\sum_{t=2}^TKL(q(x_{t-1}|X_t, X_0)||p(x_{t-1}|X_t))-\log p(X_0|X_1)]
$$
với kì vọng được lấy theo $q(x_0\dots x_T)$.

Các xác suất ở trên đều là phân bố Gaussian, do đó khoảng cách KL có thể tính từ kì vọng và phương sai. Đối với posterior, $q(x_{t-1}|x_t, x_0)$ sẽ là phân bố Gaussian $\mathcal{N}(x_{t-1}; \frac{\sqrt{\bar\alpha_{t-1}}\beta_t}{1-\bar\alpha_t}x_0 +\frac{\sqrt{\alpha_t}(1-\bar\alpha_{t-1})}{1-\bar\alpha_{t}}x_t, \tilde\beta_tI)$, với $\tilde \beta_t=\frac{1-\bar\alpha_{t-1}}{1-\bar\alpha_t}\beta_t$, chứng minh công thức có thể xem ở cuối bài.

# Mô hình denoise diffusion
Để cho đơn giản, $\Sigma_{\theta}(x_t, t)$ sẽ được đặt là $\sigma_t^2I$, với $\sigma_t$ được chọn trước, do đó không tham gia vào quá trình huấn luyện. Tác giả đưa ra hai lựa chọn $\sigma_t^2=\beta_t$ và $\sigma_t^2=\tilde \beta_t$, tương đương với việc entropy $H(q(x_{t-1}|x_t))$ lớn nhất và nhỏ nhất (xem thêm ở phần cuối), qua thực nghiệm hai cách chọn này cho kết quả tương đương.

Kí hiệu $\tilde\mu_t(x_t, x_0)$ là kì vọng của $q(x_{t-1}|x_t, x_0)$, với khoảng cách KL giữa hai phân bố Gaussian ta có 
$$\begin{aligned}
L_{t-1} &= \mathbb{E}_q[KL(q(x_{t-1}|X_t, X_0)||p(x_{t-1}|X_t))]\\
&=\mathbb{E}_{x_0, x_t}[\frac{1}{2\sigma_t^2}||\tilde\mu_t(X_t,X_0)-\mu_{\theta}(X_t,t)||^2] + C
\end{aligned}
$$

Hàm $\mu_{\theta}(x_t,t)$ dự đoán kì vọng $\tilde\mu(x_t,x_0)=\frac{\sqrt{\bar\alpha_{t-1}}\beta_t}{1-\bar\alpha_t}x_0 +\frac{\sqrt{\alpha_t}(1-\bar\alpha_{t-1})}{1-\bar\alpha_{t}}x_t$ của $q(x_{t-1}|x_t, x_0)$ khi biết $x_t$ và $t$. Điều này tương đương với việc dự đoán $x_0$ khi biết $x_t$. Tuy nhiên, từ thực nghiệm, tác giả thấy việc tham số như vậy không đưa ra kết quả tốt. Từ xác suất chuyển của quá trình thuận, chúng ta có $x_t(x_0,\epsilon) = \sqrt{\bar{\alpha_t}}x_0+ \sqrt{1-\bar{\alpha_t}}\epsilon$, trong đó $\epsilon\sim\mathcal{N}(0,I)$. Nói cách khác, trong quá trình thuận, $x_0$ có thể được tham số bởi $x_t(x_0,\epsilon)$ và một biến ngẫu nhiên độc lập $\epsilon$ thông qua $x_0=\frac{1}{\sqrt{\bar \alpha_t}}(x_t-\sqrt{1-\bar\alpha_t}\epsilon)$. Như vậy, thay vì đoán $x_0$ khi biết $x_t$, chúng ta có thể xây dựng mô hình $\epsilon_{\theta}(x_t,t)$ đoán nhiễu $\epsilon$ khi biết $x_t$ (đây là lí do cho từ denoise trong tên gọi).

Từ cách tham số này, chúng ta có thể thay vào $\tilde\mu(x_t,x_0)$ để được

$$\begin{aligned}
\tilde\mu(x_t,x_0)&=\frac{\sqrt{\alpha_t}(1-\bar\alpha_{t-1})}{1-\bar\alpha_{t}}x_t+\frac{\sqrt{\bar\alpha_{t-1}}\beta_t}{1-\bar\alpha_t}(\frac{1}{\sqrt{\bar \alpha_t}}(x_t-\sqrt{1-\bar\alpha_t}\epsilon))\\
&=\frac{1}{\sqrt{\alpha_t}}(x_t-\frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\epsilon)
\end{aligned}$$
Tương tự như vậy, $\mu_{\theta}(x_t,t)$ lúc này sẽ được tham số như sau

$$
\mu_{\theta}(x_t,t)=\frac{1}{\sqrt{\alpha_t}}(x_t-\frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\epsilon_{\theta}(x_t,t))
$$
Nhắc lại, trong quá trình huấn luyện (quá trình thuận), $x_t$ có thể tính từ $x_0$ thông qua $x_t(x_0,\epsilon) = \sqrt{\bar{\alpha_t}}x_0+ \sqrt{1-\bar{\alpha_t}}\epsilon$. Lúc này, hàm mục tiêu sẽ trở thành

$$
L_{t-1}=\mathbb{E}_{x_0,\epsilon}[\frac{\beta_t^2}{2\sigma_t^2\alpha_t(1-\bar{\alpha_t})}||\epsilon-\epsilon_{\theta}(\sqrt{\bar{\alpha_t}}x_0+ \sqrt{1-\bar{\alpha_t}}\epsilon,t)||^2]
$$
và hàm mục tiêu cho tại toàn bộ vị trí sẽ là $L=\mathbb{E}_t[L_{t-1}]$ với $t$ tuân theo phân bố đều $\mathcal{U}\{1,T\}$.

Để cho đơn giản, chúng ta có thể tối ưu với phiên bản không trọng số của hàm mục tiêu bên trên 

$$
L=\mathbb{E}_{x_0,\epsilon,t}[||\epsilon-\epsilon_{\theta}(\sqrt{\bar{\alpha_t}}x_0+ \sqrt{1-\bar{\alpha_t}}\epsilon,t)||^2]
$$

## Lấy mẫu

Thay vì mô hình trực tiếp kì vọng của $p(x_{t-1}|x_t)$, chúng ta đã mô hình nhiễu $\epsilon_{\theta}(x_t,t)$. Do đó, ở bước lấy mẫu, giả sử đã biết $x_t$, chúng ta sẽ tính lại kì vọng này qua công thức
$$
\tilde \mu(x_t,t)=\frac{1}{\sqrt{\alpha_t}}(x_t-\frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\epsilon_{\theta}(x_t,t))
$$

Lúc này $x_{t-1}$ sẽ được tính bởi
$$
x_{t-1}=\tilde\mu(x_t,t)+\sigma_t z,\,z\sim\mathcal{N}(0,I)
$$
Bắt đầu từ $x_T\sim \mathcal{N}(0,I)$, chúng ta thực hiện tuần tự $T$ bước đến khi tìm được $x_0$.
# Mô hình SDE tổng quát

## Liên hệ giữa mô hình diffusion và score matching

Hàm mục tiêu của mô hình denoise diffusion có thể xem như denoise score matching. Với phân bố $q(x_t|x_0) = \mathcal{N}(x_t; \sqrt{\bar{\alpha_t}}x_0, (1-\bar{\alpha_t})I)$, score $\nabla\log q(x_t|x_0)$ của phân bố này sẽ là $\frac{\sqrt{\bar\alpha_t}x_0-x_t}{1-\bar\alpha_t}$. Chú ý $-\frac{\sqrt{\bar\alpha_t}x_0-x_t}{\sqrt{1-\bar\alpha_t}}=\epsilon$, nếu ta thay biến ngẫu nhiên này cho $\epsilon$ trong thành phần $L_{t-1}$ của hàm mục tiêu không trọng số trong mô hình denoise diffusion, ta có

$$\begin{aligned}
L_{t-1}&=\mathbb{E}_{x_0,x_t}[||-\sqrt{1-\bar\alpha_t}\nabla\log q(x_t|x_0)-\epsilon_{\theta}(x_t,t)||^2]\\
&=(1-\bar\alpha_t)\mathbb{E}_{x_0,x_t}[||\nabla\log q(x_t|x_0)-s_{\theta}(x_t,t)||^2]
\end{aligned}$$
với $s_{\theta}(x_t,t)=-\frac{\epsilon_{\theta}(x_t,t)}{\sqrt{1-\bar\alpha_t}}$. Lúc này, hàm mục tiêu sẽ là 
$$
L=\sum_{t=1}^T(1-\bar\alpha_t)\mathbb{E}_{x_0,x_t}[||\nabla\log q(x_t|x_0)-s_{\theta}(x_t,t)||^2]
$$
Nhắc lại, với mô hình [Noise conditional score network](https://viblo.asia/p/sinh-du-lieu-voi-mo-hinh-dua-tren-score-GrLZDBOO5k0)(NCSN), mô hình sẽ tối ưu khoảng cách Fisher giữa phân bố của dữ liệu khi thêm nhiễu và phân bố của mô hình trên nhiều mức độ nhiễu. Ta có thể thấy hàm mục tiêu của mô hình denoise diffusion chính là hàm mục tiêu của NCSN với trọng số $(1-\bar\alpha_t)$ khi sử dụng denoise score matching. Tương tự như NCSN, trọng số $(1-\bar\alpha_t)$ có tính chất $(1-\bar\alpha_t)\propto1/\mathbb{E}[||\nabla\log q(x_t|x_0)||^2]$. Cách nhìn này cho thấy sự liên hệ giữa phương pháp score matching và mô hình diffusion, đó là thay đổi phân bố dữ liệu bằng một họ các nhiễu, và học mô hình khử nhiễu lần lượt. Từ đây, ta có thể tổng quát cả hai phương pháp này, bằng cách mô hình họ các nhiễu bởi quá trình ngẫu nhiên liên tục, biểu diễn bởi một phương trình vi phân ngẫu nhiên (SDE).


## Mô hình với SDE
![image.png](https://images.viblo.asia/b8b19f0a-33d5-4847-9300-d3eb8cd61a45.png)

Cụ thể hơn, với phân bố dữ liệu $p_0$ ban đầu, ta mong muốn biến đổi nó thành một phân bố đơn giản $p_T$, theo nghĩa có thể lấy mẫu một cách dễ dàng, ví dụ như $\mathcal{N}(0,I)$ trong mô hình diffusion. Nói cách khác, ta cần một quá trình ngẫu nhiên ${X_t}$ với $t\in[0,T]$ sao cho $p(x_0)=p_0, p(x_T)=p_T$. Quá trình ngẫu nhiên này có thể mô tả bởi phương trình vi phân ngẫu nhiên Itô (từ bây giờ khi nhắc đến SDE, chúng ta sẽ hiểu đó là Itô SDE)

$$dx_t=f(x,t)dt + g(t)dw$$

trong đó $f(x,t):\mathbb{R}^d\times\mathbb{R}^+\mapsto \mathbb{R}^d$, $g(t):\mathbb{R}^+\mapsto\mathbb{R}$, $dw$ kí hiệu một cách hình thức vi phân của chuyển động Brown. Một cách trực quan, $dw=\mathcal{N}(0,\Delta tI)$ với $\Delta t\to 0$. Để cho đơn giản, chúng ta chỉ xét $g(t)$ có dạng trên, tuy nhiên tất cả kết quả bên dưới đều có thể mở rộng cho hàm $g(t)$ trả về ma trận.

Quá trình thuận và nghịch lúc này sẽ là quá trình liên tục. Để phân bố không bị thay đổi quá nhiều theo thời gian, chúng ta sẽ mô hình bởi quá trình diffusion mô tả bởi phương trình vi phân ngẫu nhiên như trên. Phương trình này có thể hiểu như sau: Theo thời gian, trạng thái của biến ngẫu nhiên $x$ bị thay đổi dần dần theo hàm $f$, tuy nhiên nếu chỉ như vậy, quá trình biến đổi này sẽ là tất định, do đó chúng ta sẽ thêm thành phần ngẫu nhiên $dw$ vào phép biến đổi này. Chuyển động Brown có thể hiểu như một quá trình ngẫu nhiên mà tại mỗi thời điểm, xác suất để chuyển sang các trạng thái có vị trí gần với trạng thái hiện tại cao hơn. Một ví dụ minh họa là một người bước đi một cách ngẫu nhiên trên mặt phẳng, mỗi bước do đó không thể có độ dài quá lớn. Một ví dụ khác từ góc nhìn phân bố: Xác suất trạng thái biến ngẫu nhiên $x$ tại mỗi thời điểm có thể xem như nhiệt độ tại vị trí (trạng thái) đó, theo thời gian nhiệt độ sẽ tản ra từ từ sang các vị trí lân cận, cuối cùng hội tụ đến một phân bố nào đó. 

## SDE của mô hình diffusion

Nhắc lại quá trình thuận của mô hình diffusion có thể được mô tả bởi quá trình ngẫu nhiên $\{x_t\}_{t=0}^T$. Giả sử chúng ta dùng $\sigma_t^2=\beta_t$, chuỗi Markov có dạng

$$
x_t=\sqrt{1-\beta_t}x_{t-1}+\sqrt{\beta_t}z_{t-1},\, z\sim\mathcal{N}(0,1)
$$
Quá trình ngẫu nhiên này có thể xem như rời rạc của một quá trình ngẫu nhiên liên tục, chúng ta sẽ tìm quá trình này bằng cách cho $T\to\infty$. Đặt $\bar\beta_t=T\beta_t$, chuỗi này sẽ tiến về một hàm $\beta(t):[0,1]\mapsto\mathbb{R}$, $\beta(\frac{t}{T})=\bar\beta_t$. Tương tự quá trình ngẫu nhiên của $x_i$ và $z_i$ cũng tiến tới quá trình ngẫu nhiên liên tục $x(\frac{t}{T})=x_t, z(\frac{t}{T})=z_t$. Đặt $\Delta t=t/T$, dùng khai triển Taylor bậc 1, phương trình trên có thể viết lại thành

$$\begin{aligned}
x(t+\Delta t)&=\sqrt{1-\beta(t+\Delta t)\Delta t}x(t)+\sqrt{\beta(t+\Delta t)\Delta t}z(t)\\
&\approx x(t)-\frac{1}{2}\beta(t)\Delta tx(t)+\sqrt{\beta(t)\Delta t}z(t)
\end{aligned}$$
Khi $\Delta t\to 0$, phương trình này hội tụ tới SDE
$$
dx_t=-\frac{1}{2}\beta(t)x_tdt+\sqrt{\beta(t)}dw
$$

## SDE của mô hình NCSN

Nhắc lại, mô hình NCSN thêm lần lượt nhiễu với phương sai $\{\sigma_t\}_{t=1}^N$ vào phân bố dữ liệu. Quá trình này có thể viết lại thành

$$
x_{t}=x_{t-1}-\sqrt{\sigma_{t}^2-\sigma_{t-1}^2}z,\qquad z\sim\mathcal{N}(0,I)
$$
với $\sigma_0=0$.
Lập luận tương tự như trên, ta có thể tính giới hạn khi $N\to\infty$

$$
x(t+\Delta t)=x(t)+\sqrt{\sigma^2(t+\Delta t)-\sigma^2(t)}z(t)\approx\sqrt{\frac{d \sigma^2(t)}{dt}\Delta t}z(t)
$$
sử dụng khai triển Taylor bậc 1 của $\sigma^2(t)$. Khi $\Delta t\to 0$, chuỗi $x_t$ hội tụ tới quá trình ngẫu nhiên mô tả bởi

$$
dx_t=\sqrt{\frac{d \sigma^2(t)}{dt}}dw
$$

## Lấy mẫu

Việc lấy mẫu tương đương với đảo chiều thời gian của quá trình ngẫu nhiên. Quá trình nghịch này được mô tả bởi SDE sau
$$
dx_t=(f(x,t)-g(t)^2\nabla_{x_t}\log p_t(x_t))dt + g(t)d\bar w
$$
ở đây $\bar w$ là chuyển động Brown theo chiều ngược lại, từ $1$ về $0$.

Nếu biết được score của $p_t(x)$, chúng ta có thể mô phỏng lại quá trình ngược này. Bắt đầu từ $x_T\sim p_T$, từ phương trình trên, chúng ta sẽ biến đổi $x_T$ thành $x_0$ tuân theo phân bố $p_0$ của dữ liệu. Như vậy, mục tiêu của chúng ta là xây dựng mô hình $s_{\theta}(x(t),t)$ xấp xỉ $\nabla_{x_t}\log p_t(x_t))$.

#### Giải SDE
Quá trình lấy mẫu được thực hiện bằng cách giải phương trình SDE nghịch. Tương tự như khi rời rạc hóa quá trình thuận, chúng ta có thể giải bằng cách rời rạc hóa quá trình nghịch
$$
x_{t_i}=x_{t_{i+1}}-f(t_{i+1})(x_{t_{i+1}})+g(t_{i+1})^2s_{\theta}(x_{t_{i+1}},t_{i+1})+g(t_{i+1})z,\,z\sim\mathcal{N}(0,I)
$$
với $0=t_0<t_1<\cdots<t_{T-1}<t_T=1$.

Quay lại với cách cập nhật của mô hình denoise diffusion, giả sử ta dùng $\sigma_t^2=\beta_t$

$$
x_{t-1} = \frac{1}{\sqrt{\alpha_t}}(x_t-\frac{\beta_t}{\sqrt{1-\bar\alpha_t}}\epsilon_{\theta}(x_t,t)) + \sqrt{\beta_t}z
$$

Đặt $s_{\theta}(x_t,t)=-\frac{\epsilon_{\theta}(x_t,t)}{\sqrt{1-\bar\alpha_t}}$, ta có thể biến đổi như sau

$$\begin{aligned}
x_{t-1}&=\frac{1}{\sqrt{1-\beta_t}}(x_t+\beta_ts(x_t,t))+\sqrt{\beta_t}z\\
&\approx (1+\frac{1}{2}\beta_t)(x_t+\beta_ts(x_t,t)) +\sqrt{\beta_t}z\qquad \text{khai triển Taylor}\\
&=(1+\frac{1}{2}\beta_t)x_t+ \beta_ts(x_t,t)+\frac{1}{2}\beta_t^2s(x_t,t)+\sqrt{\beta_t}z\\
&\approx x_t+\frac{1}{2}\beta_tx_t+ \beta_ts(x_t,t)+\sqrt{\beta_t}z
\end{aligned}$$
Quá trình nghịch của SDE ứng với mô hình diffusion là
$$
dx_t=(-\frac{1}{2}\beta(t)x_t-\beta_t\nabla_x\log p_t(x_t))dt+\sqrt{\beta(t)}dw
$$
Ta có thể thấy thuật toán lấy mẫu của mô hình denoise diffusion gần giống với việc giải quá trình nghịch thông qua rời rạc hóa.

#### Lấy mẫu với Predictor-Corrector

Ở phần trước, ta đã biết quá trình lấy mẫu có thể thực hiện bằng việc giải phương trình SDE nghịch, và thuật toán lấy mẫu của mô hình diffusion thuộc loại này. Mặt khác, ta đang mô hình score của $p_t(x_t)$, do đó ta cũng có thể lấy mẫu với (annealed) Langevin dynamics.

Để có thể sinh dữ liệu tốt hơn, chúng ta có thể kết hợp hai phương pháp này. Lấy mẫu thông qua giải SDE sẽ được xem như thuật toán chính, gọi là Predictor. Ở bước thứ $i$ trong Predictor, sau khi cập nhật $x_{T-i}$ qua $x_{T-i+1}$, chúng ta sẽ thực hiện Langevin dynamics $M$ lần với $s(x_{T-i},T-i)$
$$
x_{T-i}=x_{T-i}+\epsilon_i s(x_{T-i},T-i) + \sqrt{2\epsilon_i}z,\,z\sim\mathcal{N}(0,I)
$$
Từ góc nhìn này, cách sinh dữ liệu của NCSN có thể xem như Predictor là hàm đồng nhất, Corrector là Langevin dynamics, cách sinh dữ liệu của mô hình denoise diffusion có thể xem như Predictor là giải quá trình nghịch, Corrector là hàm đồng nhất.
## Huấn luyện

Tương tự như hàm mục tiêu của NCSN cũng như mô hình denoise diffusion, hàm mục tiêu của mô hình SDE sẽ có dạng score matching trên tất cả mức độ nhiễu. Điểm khác biệt là biến thời gian $t$ lúc này là biến ngẫu nhiên liên tục tuân theo phân bố đều $\mathcal{U}[0,1]$

$$
L=\mathbb{E}_t[\lambda(t)\mathbb{E}_{x_0,x_t}[||\nabla\log p(x_t|x_0)-s_{\theta}(x_t,t)||^2]]
$$

Ở đây $\lambda(t)$ là hàm trọng số, có thể chọn giống như NCSN và mô hình denoise diffusion là $\lambda(t)\propto1/\mathbb{E}[||\nabla\log q(x_t|x_0)||^2]$. 

Việc tính hàm mất mát yêu cầu score của phân bố chuyển trong quá trình thuận. Đối với trường hợp SDE tổng quát, ta cần giải phương trình Kolmogorov tiến để tìm phân bố này. Khi $f(x,t)=a(t)x+b(t)$, phân bố chuyển là phân bố Gaussian, do đó chỉ cần biết kì vọng và phương sai để tính score. Kì vọng $m_t$ và ma trận hiệp phương sai $P_t$ sẽ thỏa mãn phương trình vi phân sau 

$$
\frac{dm_t}{dt}=a(t)m_t+b(t)
$$

$$
\frac{dP_t}{dt}=2a(t)P_t+g(t)^2
$$

Để tránh việc phải tính phân bố chuyển, chúng ta có thể dùng phương pháp score matching khác, ví dụ như [sliced score matching](https://viblo.asia/p/mo-hinh-nang-luong-energy-based-models-ebm-va-mot-so-cach-huan-luyen-2-aWj53zObl6m), với hàm mục tiêu
$$
L=\mathbb{E}_t[\lambda(t)\mathbb{E}_{x_0}\mathbb{E}_{x_t}\mathbb{E}_v[\frac{1}{2}||s_{\theta}(x_t,t)||^2+v^\intercal J_{s(.,t)}(x_t)v]]
$$
với $J_{s(.,t)}(x_t)$ là ma trận Jacobian của $s(x_t,t)$, $v^\intercal J_{s(.,t)}(x_t)v$ tính bởi $v^\intercal\nabla(v^\intercal s(x_t,t))$.

# Kết luận

Trong bài này, mình đã giới thiệu mô hình diffusion và mô hình dạng SDE tổng quát mà trong đó score matching và mô hình diffusion là trường hợp đặc biệt. Cách tiếp cận này hiện đã cho kết quả tốt nhất hiện tại cho mô hình sinh. 

Tuy nhiên cách tiếp cận này có các nhược điểm sau: Các trạng thái có cùng số chiều, do đó việc mô hình quá trình nghịch cần đảm bảo điều đó chứ không thể thay đổi số chiều dữ liệu. Việc lấy mẫu tốn khá nhiều thời gian, do cần phải đi từng bước để giải phương trình SDE nghịch, chưa tính đến việc kết hợp với Corrector trong quá trình lấy mẫu.
# Tham khảo 
- [Deep Unsupervised Learning using
Nonequilibrium Thermodynamics
](https://arxiv.org/pdf/1503.03585.pdf)
- [Denoising Diffusion Probabilistic Models](https://arxiv.org/pdf/2006.11239.pdf)
- [SCORE-BASED GENERATIVE MODELING THROUGH
STOCHASTIC DIFFERENTIAL EQUATIONS
](https://arxiv.org/pdf/2011.13456.pdf)
- [Blog của tác giả](http://yang-song.github.io/blog/2021/score/)
- Công thức posterior của quá trình thuận [DIFFWAVE: A VERSATILE DIFFUSION MODEL FOR
AUDIO SYNTHESIS](https://arxiv.org/pdf/2009.09761v3.pdf)
- [Tham khảo thêm về SDE](https://users.aalto.fi/~asolin/sde-book/sde-book.pdf)
# Một số định nghĩa và chứng minh chi tiết
## Công thức các phân bố trong quá trình thuận của mô hình diffusion


**Tính chất:** Với $q(x_t|x_{t-1})=\mathcal{N}(x_t;\sqrt{\alpha_t}x_{t-1}, (1-\alpha_t)I)$, ta có $q(x_t|x_0) = \mathcal{N}(x_t; \sqrt{\bar{\alpha_t}}x_0, (1-\bar{\alpha_t})I)$, 

trong đó $\bar\alpha_t=\prod_{i=1}^t\alpha_i$.

*Chứng minh:*

Quá trình Markov thỏa mãn tính chất sau

**Mệnh đề:** Với $t_1>t_2>t_3$, xác suất chuyển thỏa mãn phương trình Chapman-Kolmogorov 
$$
p_{t_3t_1}(x_{t_1}|x_{t_3})=\int p_{t_3t_2}(x_{t_2}|x_{t_3})p_{t_2t_1}(x_{t_1}|x_{t_2})dx_{t_2}
$$
Tính chất trên có thể chứng minh dễ dàng bằng tính chất Markov. 

Chúng ta chỉ cần chứng minh cho $t=2$, các trường hợp còn lại có thể suy ra theo quy nạp. Hơn nữa, ma trận hiệp phương sai có dạng $\beta_tI$, do đó ta chỉ cần chứng minh cho trường hợp $x\in\mathbb{R}$.

Từ phương trình Chapman-Kolmogorov, ta có 

$$\begin{aligned}
q(x_2|x_0) &= \int q(x_2|x_1)q(x_1|x_0)dx_1\\
&=\frac{1}{2\sqrt{(1-\alpha_1)(1-\alpha_2)}\pi}\int \exp(-\frac{(x_2-\sqrt\alpha_2x_1)^2}{2(1-\alpha_2)})\exp(-\frac{(x_1-\sqrt\alpha_1x_0)^2}{2(1-\alpha_1)})dx_1\\
&=\frac{1}{2\sqrt{(1-\alpha_1)(1-\alpha_2)}\pi}\int\exp(-\frac{1}{2}(\frac{(x_2-\sqrt{\alpha_1\alpha_2}x_0)^2}{1-\alpha_1\alpha_2} +\frac{(1-\alpha_1\alpha_2)(x_1-\frac{\sqrt\alpha_2(1-\alpha_1)x_2+\sqrt\alpha_1(1-\alpha_2)x_0}{1-\alpha_1\alpha_2})^2}{(1-\alpha_1)(1-\alpha_2)}))dx_1\\
&=\frac{1}{\sqrt{2\pi(1-\alpha_1\alpha_2)}}\exp(-\frac{1}{2}\frac{(x_2-\sqrt{\alpha_1\alpha_2}x_0)^2}{1-\alpha_1\alpha_2}). 
\end{aligned}$$  
$\square$

**Tính chất:** $q(x_{t-1}|x_t, x_0) =\mathcal{N}(x_{t-1}; \frac{\sqrt{\bar\alpha_{t-1}}\beta_t}{1-\bar\alpha_t}x_0 +\frac{\sqrt{\alpha_t}(1-\bar\alpha_{t-1})}{1-\bar\alpha_{t}}x_t, \tilde\beta_tI)$, với $\tilde \beta_t=\frac{1-\bar\alpha_{t-1}}{1-\bar\alpha_t}\beta_t$

*Chứng minh:* Tương tự như trên, chúng ta cũng chỉ cần chứng minh cho trường hợp $x\in\mathbb{R}$.
$$\begin{aligned}
q(x_{t-1}|x_t, x_0)&=\frac{q(x_t|x_{t-1})q(x_{t-1}|x_0)}{q(x_{t}|x_0)}\\
&=(2\pi\beta_t)^{-1/2}(2\pi(1-\bar\alpha_{t-1}))^{-1/2}(2\pi(1-\bar\alpha_t))^{1/2}\\
&\quad\exp\left(-\frac{||x_t-\sqrt{\alpha_t}x_{t-1}||^2}{2\beta_t}-\frac{||x_{t-1}-\sqrt{\bar\alpha_{t-1}}x_0||^2}{2(1-\bar\alpha_{t-1})}+\frac{||x_t-\sqrt{\bar\alpha_t}x_0||^2}{2(1-\bar\alpha_t)}\right)\\
&=(2\pi\tilde\beta_t)^{-1/2}\exp\left(-\frac{1}{\tilde\beta_t}||x_{t-1}-\frac{\sqrt{\bar\alpha_{t-1}}\beta_t}{1-\bar\alpha_t}x_0 -\frac{\sqrt{\alpha_t}(1-\bar\alpha_{t-1})}{1-\bar\alpha_{t}}x_t||^2\right).
\end{aligned}
$$
$\square$

## Ràng buộc của entropy $H(q(x_{t-1}|x_t))$
Phần này sẽ chỉ ra chặn trên và chặn dưới của $H(q(x_{t-1}|x_t))$ bởi entropy của xác suất chuyển trong quá trình thuận.

Trước hết ta có
$$
H(x_{t-1}|x_t)=H(x_t|x_{t-1})+H(x_{t-1})-H(x_t)
$$
Do $x_t$ tính từ $x_{t-1}$ và nhiễu $z$, $H(x_t)\geq H(x_{t}|z)\geq H(x_{t-1}|z)\geq H(x_{t-1})$. Suy ra $H(x_{t-1}|x_t)\leq H(x_t|x_{t-1})$. Nếu mô hình xác suất trong quá trình nghịch của $x_{t-1}$ khi biết $x_t$ bởi $\mathcal{N}(x_{t-1};\mu(x_t),\sigma_t^2I)$, dấu bằng xảy ra khi $\sigma_t^2=\beta_t$.

Đối với chặn dưới, ta có $H(x_0|x_t)\geq H(x_0|x_{t-1})$, suy ra
$$
H(x_{t-1})-H(x_t)\geq H(x_0,x_{t-1})-H(x_0,x_t)=H(x_{t-1}|x_{0})-H(x_t|x_0)
$$
Do đó
$$\begin{aligned}
H(x_{t-1}|x_t)&\geq H(x_t|x_{t-1})+H(x_{t-1}|x_{0})-H(x_t|x_0)\\
&=H(x_t|x_0,x_{t-1})+H(x_{t-1}|x_{0})-H(x_t|x_0)\\
&=H(x_{t-1}|x_0,x_t)
\end{aligned}$$
Dấu bằng xảy ra khi $\sigma_t^2=\tilde \beta_t$.

## Một số tính chất của phương trình vi phân ngẫu nhiên
Phương trình vi phân ngẫu nhiên Itô với điều kiện đầu $x_0=x$
$$
dx_t=f(x_t,t)dt+g(t)dw
$$
là biểu diễn hình thức của phương trình tích phân sau

$$
x_t=x+\int_0^tf(x_t,t)dt+\int_0^tg(t)dw
$$

Tích phân đầu tiên là tích phân Riemann-Stieltjes thông thường. Tuy nhiên ta không thể tính tích phân thứ hai như vậy, do chuyển động Brown không thỏa mãn tính chất bounded variation. Thay vào đó, ta sẽ sử dụng tích phân Itô để tính đại lượng này

$$
\int_0^tg(t)dw=\lim_{K\to \infty}\sum_{k=0}^{K-1}g(t_k)(w_{t_{k+1}}-w_{t_k})
$$
với $t_k=k\Delta t, t=K\Delta t$.

Từ đây chúng ta có tính chất sau
$$\sum_{k=0}^{K-1}\mathbb{E}[g(t_k)(w_{t_{k+1}}-w_{t_k})]=\sum_{k=0}^{K-1}\mathbb{E}[g(t_k)]\mathbb{E}[w_{t_{k+1}}-w_{t_k}]=0$$
theo định nghĩa của chuyển động Brown, do đó
$$\mathbb{E}[\int_0^tg(t)dw]=0
$$
Với quá trình ngẫu nhiên $x_t$ và một hàm tất định $u(x,t):\mathbb{R}^d\times \mathbb{R}^+\mapsto\mathbb{R}$, chúng ta cũng không thể tính đạo hàm toàn phần $\frac{du(x_t,t)}{dt}$ bằng chain rule như thông thường, thay vào đó chúng ta sẽ dùng công thức Itô
$$
du(x_t,t)=\frac{\partial u(x_t,t)}{\partial t}dt+\nabla u(x_t,t)^\intercal dx_t+\frac{1}{2}(dx_t)^\intercal H_xu(x_t,t)dx_t
$$
trong đó $H_xu(x_t,t)$ là ma trận Hessian của $u$.

#### Chứng minh SDE nghịch

Từ công thức Itô, chúng ta có hai phương trình quan trọng. Đó là phương trình Kolmogorov tiến
$$
\frac{\partial p(x_t,t)}{\partial t}=-\sum_i\frac{\partial f^i(x_t,t)p(x_t,t)}{\partial x_t^i}+\frac{1}{2}\sum_{i,j}\frac{\partial^2 g(t)^2p(x_t,t)}{\partial x_t^ix_t^j}
$$
và phương trình Kolmogorov lùi
$$
-\frac{\partial p_{ts}(x_s|x_t)}{\partial t}=\sum_if^i(x_t,t)\frac{\partial p_{ts}(x_s|x_t)}{\partial x_t^i}+\sum_{i,j}\frac{g(t)^2}{2}\frac{\partial^2 p_{ts}(x_s|x_t)}{\partial x_t^i x_t^j}
$$
với $t<s$, $p_{ts}(x_s|x_t)$ là xác suất chuyển từ trạng thái $x_t$ tại $t$ sang trạng thái $x_s$ tại $s$, $f_i,x_i$ là chỉ số thứ $i$ của $f,x$.

Phương trình SDE nghịch có thể suy ngược từ phương trình Kolmogorov như sau: Với xác suất liên hợp $x_s, x_t$, ta có 
$$p(x_s,x_t)=p_{ts}(x_s|x_t)p(x_t)$$
$$\frac{\partial p(x_s,x_t)}{\partial t}= p_{ts}(x_s|x_t)\frac{\partial p(x_t,t)}{\partial t}+ p(x_t)\frac{\partial p_{ts}(x_s|x_t)}{\partial t}$$
Thay phương trình Kolmogorov vào phương trình trên, ta được

$$-\frac{\partial p(x_s,x_t)}{\partial t}=\sum_i\frac{\partial \bar{f^i}(x_t,t)p(x_s,x_t)}{\partial x_t^i}+\frac{1}{2}\sum_{i,j}\frac{\partial^2 g(t)^2p(x_s,x_t)}{\partial x_t^ix_t^j}$$
trong đó 
$$\bar f(x_t,t)= f(x,t)-g(t)^2\frac{1}{p(x_t)}\nabla p_t(x_t)=f(x,t)-g(t)^2\nabla\log p_t(x_t)$$
Chia hai vế cho điều kiện cuối $x_s$ của phương trình Kolmogorov lùi, ta được phương trình Kolmogorov tiến của quá trình nghịch, ứng với SDE
$$dx_t=\bar f(x_t,t)dt+g(t)d\bar w$$

#### Kì vọng và phương sai của SDE tuyến tính

Với hàm $u$ bất kì, từ công thức Itô

$$\begin{aligned}
du(x_t,t)&=\frac{\partial u(x_t,t)}{\partial t}dt+\nabla u(x_t,t)^\intercal dx_t+\frac{1}{2}(dx_t)^\intercal H_xu(x_t,t)dx_t\\
&=\left(\frac{\partial u(x_t,t)}{\partial t}+\nabla u(x_t,t)^\intercal f(x_t,t)+\frac{1}{2}g(t)^2\sum_{i,j}\frac{\partial^2u}{\partial x^i\partial x^j}\right)dt + \nabla u \,g(t)dw
\end{aligned}$$
Lấy kì vọng hai vế và dùng tính chất kì vọng của tích phân Itô bằng 0, ta có
$$
\frac{d\mathbb{E}[u]}{dt}=\mathbb{E}[\frac{\partial u}{\partial t}]+\mathbb{E}[\nabla u^\intercal f(x_t,t)]+\frac{1}{2}g(t)^2\mathbb{E}[\sum_{i,j}\frac{\partial^2u}{\partial x^i\partial x^j}]
$$
Thay $u=x^i$, ta tính được kì vọng của $x^i$, từ đó suy ra kì vọng của $x$. Với ma trận hiệp phương sai, ta thay $u=x^ix^j-m^i(t)m^j(t)$, với $m(t)$ là kì vọng của $x_t$.