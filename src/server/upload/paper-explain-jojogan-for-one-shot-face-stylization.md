<div align="center"></div># Intro

![](https://images.viblo.asia/1da7ddf4-39d1-4644-9d1e-e02f749214c3.png)
Style transfer là một bài toán thuộc lĩnh vực computer vision nhận được  sự chú ý của nhiều nhà nghiên cứu bởi tính ứng dụng cao trong các ứng dụng chỉnh sửa ảnh áp dụng công nghệ AI.  Việc huấn luyện một mạng nơ ron để thực hiện style transfer là rất khó khăn bởi vấn đề tìm kiếm dữ liệu.  Paper JoJoGAN mà mình sẽ giới thiệu ở đây đã đề xuất một thủ tục để finetune mạng Generator của StyleGAN để thực hiện style transfer chỉ với duy nhất 1 ảnh reference.

# Một số khái niệm cần biết
## StyleGAN generator

Mạng generator của stylegan có 1 chút khác biệt với các mô hình GAN truyền thống. Thay vì nhận đầu vào trực tiếp là vector latent $z_i \in Z$ thì vector $z$ sẽ được đưa qua một mạng MLP 8 lớp để tạo ra vector $w \in W$ với cùng số chiều.   Vector $w$ được dùng để kiểm soát style của ảnh thông qua lớp Adaptive Instance Normalization. Một phép biến đối affline (học thông qua một lớp fully connected - ký hiệu A trong hình dưới)  được áp dụng lên $w$ trước khi đưa vào mạng generator.

![](https://images.viblo.asia/f0be86ce-884d-41b5-8071-6b69ae9b140e.png)

## GAN inversion
Mạng generator của GAN sẽ tạo ra ảnh từ một vector latent $z$.  GAN inversion là quá trình ngược lại, từ ảnh đầu vào tìm vector latent tương ứng của nó. 

![image.png](https://images.viblo.asia/0c058147-fe4a-4d8c-8f8e-188fc8e13035.png)

Một số cách tiếp cận cho GAN inversion

* **Optimization based:** sử dụng gradient descent để tối ưu vector $z$  sao cho ảnh khôi phục $x^{rec}$ giống với ảnh thật $x$ nhất. 
$$
z ^ { * } = \underset { z } { \arg \min } \ell ( x , G ( z ; \theta ) )
$$
Do quá trình tối ưu diễn ra lúc inference nên chi phí tính toán khá là tốn kém. Một số paper dựa trên cách tiếp cận này: 
* https://arxiv.org/abs/2012.09036
* https://arxiv.org/abs/1904.03189
* https://arxiv.org/abs/1911.11544

* **Encoder based:** sử dụng 1 mạng encoder được huấn luyện trên nhiều ảnh được tạo ra bởi mạng generator với các latent vector tương ứng. 
$$
\theta _ { E } ^ { * } = \underset { \theta _ { E } } { \arg \min } \sum _ { n } L ( G ( E ( x _ { n } ; \theta _ { E } ) ) , x _ { n } )
$$
Một số paper: 
* https://arxiv.org/abs/2102.02766
* https://arxiv.org/abs/2104.02699
Ở Việt Nam thì gần đây cũng có một paper của VinAI về chủ để này: 
[HyperInverter: Improving StyleGAN Inversion via Hypernetwork](https://arxiv.org/abs/2112.00719)


* **Hybrid based:** vector $z$ được sinh ra bởi mạng encoder được dùng để khởi tạo cho quá trình gradient descent và tiếp tục được finetune.

# JoJoGAN
## Workflow chính
![image.png](https://images.viblo.asia/dfb300e1-bf67-4e53-ba19-e1a581d7568f.png)
Workflow bao gồm 4 bước. Ký hiệu: 
* $T$: ánh xạ GAN inversion
* $G$: generator của StyleGAN
* $s$: style parameter (output của biến đổi affline - các khối chữ A trong generator)
* $\theta$: trọng số generator của StyleGAN.

**Bước 1**: GAN inversion. Một quan sát của tác giả trong quá trình inversion là với 1 ảnh style reference $y$ thì ảnh sau khi reconstruct lại trông khá là thật thay vì có nét *stylized* kiểu hoạt hình (step 1 trong hình trên). Nguyên nhân có thể do các mạng encoder trong GAN inversion được huấn luyện để tạo ra latent vector cho ảnh thật hơn là ảnh được stylized. Output của quá trình là vector $w = T(y)$ trong không gian $W$ và một tập style parameter tương ứng $s(w)$

**Bước 2**: Tạo tập training. Dùng $s(w)$ thu được ở bước 1 để tìm 1 tập style parameter $S$ khác gần giống với $s(w)$. Việc tìm kiếm tập $S$ được thực hiện thông qua cơ chế style mixing của StyleGAN. Trong lúc huấn luyện StyleGAN, một phần ảnh trong tập training được tạo ra bằng cách sample 2 latent vector $z_1$ và $z_2$ thay vì một. Trong quá trình forward của mạng generator, ta lựa chọn ngẫu nhiên một điểm trong mạng để chuyển sử vector style $w_1$ sang $w_2$. \
Style mixing trong JoJoGAN: Với kiến trúc StyleGAN2 gồm 26 modulation layer (Adaptive instance normalization), ta sẽ có style parameter kích thước $26 \times 512$. Ký hiệu: $M \in  \{0, 1\}^{26}$
và vector mask; FC là lớp mạng mapping  $Z \rightarrow W$; $z_i \sim N(0, 1)$. Tập style parameter mới được tính bằng công thức:
$$s _ { i } = M \cdot s + ( 1 - M ) \cdot s ( F C ( z _ { i } ) )$$
Lựa chọn vector M khác nhau sẽ dẫn đến các hiệu ứng khác nhau

![image.png](https://images.viblo.asia/65c31a73-7454-46cc-a32f-56a24a1a4c8d.png)

**Bước 3**: Finetuning mạng generator để có $G(s_i, \hat \theta) \approx y$
$$
\hat { \theta } = \stackrel { argmin } { \theta } \frac { 1 } { N } \sum _ { i } ^ { N } L \left ( G \left ( s _ { i } ; \theta \right ), y \right )
$$
trong đó hàm mất mát L được sử dụng là [perceptual loss](https://arxiv.org/abs/1603.08155). Thông thường perceptual loss được tính bằng backbone VGG được train trên ảnh kích thước $224 \times 224$, còn StyleGAN lại sinh ảnh kích thước  $1024 \times 1024$. Một hướng để xử lý là down sample ảnh sau khi sinh xuống để tính loss nhưng cách xử lý này sẽ dẫn tới mất mát đặc trưng ảnh. Hướng thứ 2 được sử dụng trong paper này là tính perceptual loss dựa trên activation của mạng discriminator. Quá trình training của StyleGAN giúp discriminator tính toán các feature map mà không bỏ qua các chỉ tiết nhỏ. 

$$L ( G ( s _ { i } ; \theta ) , y ) = \| D ( G ( s _ { i } ; \theta ) ) - D ( y ) \| _ { 1 }$$

**Bước 4**: Inference. Với ảnh input $u$, Ảnh được stylized được tính bằng $u_{stylized} = G ( s ( T ( u ) ) ; \hat { \theta } )$. Ta cngx có thể tạo ra ảnh ngẫu nhiên với style chỉ định bằng cách sample từ phân phối $N(0, 1)$ và đưa qua generator.

## Một số biến thể


### Controling identity
Một số ảnh style reference khiển ảnh input không giữ được identity (mất đi nhiều đặc trưng về structure). Trong trường hợp này, tác giả  có  sử dụng thêm hàm identity loss để bảo toàn thông tin về nhận dạng. 
$$
L _ { i d } = 1 - s i m ( F ( G ( s _ { i } ; \theta ) ) , F ( G ( s _ { i } ; \hat { \theta } ) ) )
$$
trong đó $sim$ là khoảng cách cosine và $F$ là mô hình [arcface](https://arxiv.org/abs/1801.07698) pretrained. 

![image.png](https://images.viblo.asia/ccba3429-2df0-430c-9327-44a01f530956.png)

### Kiểm soát style intensity bằng feature interpolation
Sử dụng feature interpolation cho phép ta kiểm soát cường độ của style được transfer sang input.  Ký hiệu $f_i^A$ là feature map thứ $i$ của generator gốc và $f_i^B$ là feature map của generator sau khi fine tune. Feature map mới được tính bằng công thức  $f = ( 1 - \alpha ) f _ { i } ^ { A } + \alpha f _ { i } ^ { B }$

![image.png](https://images.viblo.asia/a7e2c9fc-655d-4263-b3c7-ebac30497ae5.png)

### Extreme Style References

Khi muốn transfer style với một ảnh reference out of distribution $y$ (ví dụ ảnh chó mèo trong khi StyleGAN train trên ảnh mặt người), thay vì sử dụng trực tiếp $s(T(y))$ để xây dựng tập style parameter, tác giả sử dụng mean style code $\overline { s } = \sum _ { 1 } ^ { 10000 } s ( F C ( z \sim N ( 0 , I ) ) )$ để làm ước lượng cho $s(T(y))$ cho ảnh out of distribution.

![image.png](https://images.viblo.asia/8a984700-5d2c-4898-8865-9360c25231aa.png)

### Lựa chọn GAN inversion

Theo quan sát của tác giả, mếu thủ tục GAN inversion tạo ra ảnh *realistic* từ ảnh reference, JoJoGAN sẽ được train để ánh xạ $s_i$ sang ảnh được stylized với cường độ mạnh. Ngược lại nếu GAN inversion tạo ra ảnh được stylized JoJoGAN sẽ ánh xạ $s_i$ sang ảnh stylized nhưng với cường độ nhẹ hơn và giữ lại nhiều đặc trưng của input hơn. 
![image.png](https://images.viblo.asia/0fbc7f9a-c993-41f3-9273-463828b0f74e.png)

Như đã nhắc đến ở phần **Extreme Style References**, mean style code là ước lượng tốt nhất của $s(T(y))$ với ảnh out of distribution. Điều này cũng đúng khi áp dụng với một GAN inverter không tốt. Tác giả tạo ra một virtual inverter $V(y)$ bằng cách cộng latent vector từ GAN inversion với mean style code bằng thủ tục ở bước 3 với các vector M khác nhau. Vector M được lựa chọn sao cho $G ( s ( V ( y ) ) ; \theta )$ có các đặc trưng mong muốn (VD: output có mắt của ảnh reference thì $G ( s ( V ( y ) ) ; \theta )$ phải có mắt trông thật. 
![image.png](https://images.viblo.asia/9ed39a2d-0140-46a2-b2e7-e9a1ec378fc8.png)

# Qualitative result
Một số kết quả so sánh về mặt hình ảnh
![image.png](https://images.viblo.asia/95bd2118-0347-40f4-9fd4-00aa92bcd808.png)

![image.png](https://images.viblo.asia/f45f7e15-0083-4c52-8b66-a8306fba15ca.png)
# Reference
* [https://github.com/mchong6/JoJoGAN](https://github.com/mchong6/JoJoGAN)
* Playground https://huggingface.co/spaces/akhaliq/JoJoGAN
* [JoJoGAN: One Shot Face Stylization](https://arxiv.org/abs/2112.11641)
* [A Style-Based Generator Architecture for Generative Adversarial Networks](https://arxiv.org/abs/1812.04948)