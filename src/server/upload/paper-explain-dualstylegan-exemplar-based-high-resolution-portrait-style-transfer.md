![image.png](https://images.viblo.asia/0773f00a-ce9d-46f4-9581-4099c39d1b8f.png)

# Introduction
Gần đây, nhiều nghiên cứu chỉ ra rằng StyleGAN có thể thực hiện style transfer chất lượng cao chỉ với một lượng dữ liệu hạn chế bằng một chiến lược fine tuning phù hợp. Paper Pastiche Master: Exemplar-Based High-Resolution Portrait Style Transfer đề xuất một mở rộng của kiến trúc StyleGAN với intrinsic style path và extrinsic style path để mã hóa style của domain gốc và domain cần transfer sang. Paper cũng đề xuất một chiến lược fine tuning theo 3 bước để biến đổi không gian của domain gốc sang domain mới ngay cả với những thay đổi về kiến trúc mạng. 

# Một số khái niệm
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
* **Encoder based:** sử dụng 1 mạng encoder được huấn luyện trên nhiều ảnh được tạo ra bởi mạng generator với các latent vector tương ứng. 
$$
\theta _ { E } ^ { * } = \underset { \theta _ { E } } { \arg \min } \sum _ { n } L ( G ( E ( x _ { n } ; \theta _ { E } ) ) , x _ { n } )
$$
Trong paper này  tác giả sử dụng encoder based dựa trên model [psp](https://arxiv.org/abs/2008.00951)
## Style mixing
Trong lúc huấn luyện StyleGAN, một phần ảnh trong tập training được tạo ra bằng cách sample 2 latent vector $z_1$ và $z_2$ thay vì một. Trong quá trình forward của mạng generator, ta lựa chọn ngẫu nhiên một điểm trong mạng để chuyển từ vector style $w_1$ sang $w_2$. 

# Dual StyleGAN
DualStyleGAN được xây dựng dựa trên một mạng StyleGAN pretrain. Việc finetune lại mô hình unconditional trên một dataset khác sẽ làm dịch chuyển cả không gian sample, dẫn tới mất đa dạng trong các sample sinh ra. Ý tưởng chính của DualStyleGAN tìm kiếm chiến lược finetuning phù hợp để học các style đa dạng bằng cách thêm **extrinsic style path** để encode style của domain mục tiêu
![image.png](https://images.viblo.asia/1b03a0f2-8a10-483c-83e3-af4da57bec8f.png)

## Facial Destylization
Mục tiêu của bước này là khôi phục ảnh người thật từ ảnh style để tạo pair dataset huấn luyện mô hình. Với một ảnh style từ domain mục tiêu, ta cần tìm một khuôn mặt tương ứng phù hợp ở domain gốc. Quá trình này được thực hiện qua 3 bước:

1.  **Khởi tạo**:
 Một ảnh style S đầu tiên sẽ được embed thành 1 vector latent trong domain gốc thông qua quá trình GAN inversion. Cụ thể ở đây tác giả sử dụng mô hình [psp](https://arxiv.org/abs/2008.00951) kí hiệu là $E$. Thay vì embed ảnh thành vector trong không gian $\mathcal Z$ (1 vector sample từ phân phối chuẩn), tác giả sử dụng không gian $\mathcal Z^+$ (18 vector sample từ phân phối chuẩn, stack lên thành ma trận $18 \times 512$). 

Khuôn mặt sau khi tái tạo trong domain gốc kí hiệu là $g(\pmb z_e^+)$. Với $g$ là generator của mạng StyleGAN gốc và $\pmb z_e^+ = E(S) \in \mathbb R^{18 \times 512}$. 

2. **Finetune vector latent**: Không gian $\mathcal Z^+$  của một mạng StyleGAN đẫ được finetune trên tập ảnh style (ký hiệu $g'$) được tối ưu để sinh ra ảnh style bằng cách finetune StyleGAN với hàm loss
$$
\hat { \mathbf { z } } _ { e } ^ { + } = \arg \min _ { z ^ { + } } L _ {  { p e r c } } \left ( g ^ { \prime } \left ( z ^ { + } \right ), S \right )  + \lambda _ { ID } L _ { ID } \left ( g ^ { \prime } \left ( z ^ { + } \right ), S \right ) + \| \sigma \left ( z ^ { + } \right ) \| _ { 1 }
$$
trong đó
* $L_{perc}$: là perceptual loss với đặc trưng trích xuất từ VGG19
* $L_{ID} = 1 - \cos(F( g ^ { \prime } \left ( z ^ { + } \right )), F(S))$: identity loss để bảo toán nhận dạng với $F$ là mô hình Arcface.
* $\|\sigma \left (z^{ + } \right ) \| _ { 1 }$: regularization term - độ lệch chuẩn giữa 18 vector trong $z^+$. Dùng để giảm overfitting

3. **Image embedding** :
Vector embedding cuối cùng  được cho bằng công thức $z _ { i } ^ { + } = E \left ( g \left ( \hat { z } _ { e } ^ { + } \right ) \right )$. Kết quả reconstruct qua 3 bước finetune được cho trong hình (d)

![image.png](https://images.viblo.asia/e853e685-c954-4cd4-b40e-1de532a1c12a.png)

## Kiến trúc mạng
![image.png](https://images.viblo.asia/b04ed0d1-353a-48e0-9ace-82abc8b40f5d.png)

Kiến trúc mạng DualStyleGAN bao gồm 2 phần gồm 2 phần: 
* intrinsic style path + generator. Phần này là kiến trúc StyleGAN gốc và được fix cứng trong quá trình finetune.
* Extrinsic style path: gồm 1 mạng MLP giống intrinsic path, các khối color transform $T_c$ và structure transform $T_s$. Đầu vào của extrinsic path là vector $\boldsymbol z_e^+$ của ảnh style tương ứng. 

**Color control block**: phần này khá giống StyleGAN gốc. Style code từ extrinsic path đi qua một mạng MLP $f$ và  các khối color transform $T_c$ được mô hình hóa bởi 1 mạng MLP.  Các khối này chỉ nằm ở phần có độ phân giải cao ở generator (lớp 8-18). Style code sau khi đi qua $T_c$ sẽ được cộng có trọng số với style code từ intrinsic path trước khi đi qua Adaptive Normalization. 

**Structure control block**:  dùng để đặc trưng hóa cấu trúc của ảnh style. Style code sau khi đi qua mạng $f$ và structure control block $T_s$ sẽ được cho qua 1 khối  ModRes trước khi được cộng với feature map của generator. Các khối này chỉ xuất hiện ở các lớp độ phân giải thấp (lớp 1 - 7). Các trúc của khối ModRes giống hệt các residual block trong Resnet chỉ khác là các lớp Batch normalization được thay thế bằng Adaptive Instance Normalization. 


Với một ảnh mặt thật $I$ và ảnh style $S$, style transfer được thực hiện bằng $G(E(I), E(S), w)$ với $w \in \mathbb R^{18}$ và trọng số để kết hợp giữa style của intrinsic và extrinsic path.  

## Progressive  finetuning
DualStyleGAN sử dụng chiến lược finetuning nhiều bước để từ từ biến đổi không gian sample sang domain mục tiêu. Hai bước đầu có mục đích là để pretrain DualStyleGAN trên data gốc sau đó mới finetune trên data mới trong bước 3.
![image.png](https://images.viblo.asia/7b466fc8-d9cf-4911-a301-1146d90f014d.png)

### Bước 1: color transfer
Nhờ vào thiết kế của DualStyleGAN, bước này ta không cần huấn luyện lại mạng mà chỉ cần khởi tạo các khối ở extrinsic path một cách hợp lý.
* Các khối ModRes được khởi tạo gần 0 để loại bỏ các residual feature
* Trọng số các khối color transform được khởi tạo bằng ma trận đơn vị nên style code không thay đổi khi đi vào generator.
Có thể thấy màu của ảnh style được transfer khá tốt sang ảnh mặt người chỉ nhờ khởi tạo trong hình trên

### Bước 2: structure transfer
Finetune extrinsic path để transfer các đặc trưng về structure

Đầu tiên ta sample 2 vector $z_1, z_2$ từ phần phối chuẩn. DualStyleGAN được finetune sao cho $G(z_1,  z_2, w=1) \approx g(z_l^+)$. Trong đó, $z_l^+ \in \mathcal Z^+$ là ma trận $18 \times 512$ với $l$ hàng đầu tiên là $z_1$ và $18-l$ hàng cuối là $z_2$. $l$ giàm dần từ 7 xuống 5 trong quá trình finetune. Hàm mục tiêu:

$$
\min _ { G } \max _ { D } \lambda _ { \operatorname { a d v } }L_{adv} + \lambda_{perc}L_{perc}(G(z_1,  z_2, w=1),  g(z_l^+))
$$

### Bước 3: finetune trên domain mục tiêu
Ta cần style code $z_i^+$ và $z_e^+$ của một ảnh style S trong domain mục tiêu có thể được tái tạo thông qua DualStyleGAN $G(z_i^+, z_e^+, 1) \approx S$ thông qua perceptual loss.  Hàm mục tiêu của bước 3:
$$
\min _ { G } \max _ { D } \lambda _ { \operatorname { a d v } }L_{adv} + \lambda_{perc}L_{perc}(G(z_i^+,  z_e^+, 1),  S) + L_{sty} + L_{con}
$$
trong đó
$$L_{sty} = \lambda_{CX}L_{CX}(G(z, z_e^+, 1), S) + \lambda_{FM}L_{FM}(G(z, z_e^+, 1), S)$$ 
$L_{CX}$ và $L_{FM}$ lần lượt là [context loss](https://arxiv.org/abs/1803.02077) và [feature matching loss](https://arxiv.org/abs/1703.06868)


$$
L_{con} = \lambda_{ID}L_{ID}(G(z, z_e^+, 1), g(z)) + \lambda_{reg} \| W\|_2
$$
với $W$ là trọng số của các lớp ModRes.

## Result
Một số kết quả thí nghiệm
![image.png](https://images.viblo.asia/a0efd137-c99d-4085-9ed5-9adffa6176ef.png)

![image.png](https://images.viblo.asia/1d3190fb-172b-4a50-a3ab-1badbf0d8a2c.png)
# Reference
* [DualStyleGAN paper](https://arxiv.org/abs/2203.13248)
* [Github repo](https://github.com/williamyang1991/DualStyleGAN)
* [StyleGAN](https://arxiv.org/abs/1812.04948)
* [psp GAN inversion](https://arxiv.org/abs/2008.00951)