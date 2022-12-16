Vào ngày 6 tháng 4 năm 2022, OpenAI công bố mô hình mới nhất của họ là DALLE 2, đi kèm với bài báo có tên là Hierarchical Text-Conditional Image Generation with CLIP Latents. Mô hình có thể tạo ra những hình ảnh với độ phân giải cao với nhiều thuộc tính và phong cách khác nhau, dựa vào một đoạn text mô tả. Những hình ảnh mà DALLE 2 tạo ra vừa độc đáo vừa chân thực. Nó có thể phối kết hợp các thuộc tính, concept và các phong cách khác nhau. Tính hiện thực của ảnh, sự tạo ra được các biến thể khác nhau và khả năng tạo ra ảnh có mức độ tương quan cao với caption đã khiến DALLE 2 trở thành một trong những sự cải tiến đáng được quan tâm nhất hiện nay.  Bài viết sau đây sẽ đi vào chi tiết cách mà DALLE-2 hoạt động.

![image.png](https://images.viblo.asia/b76266c0-4fc7-45b1-862b-984bfaa338e0.png)

# 1. Tổng quan về DALLE-2
Về tổng quan, ban đầu dữ liệu đầu vào của DALLE-2 là các cặp image-caption, sau đó sẽ có một text encoder sẽ lấy đoạn text mô tả (y) và sinh ra text embedding $(z_t)$. Text embedding này sẽ làm đầu vào cho một model gọi là prior, từ đó sinh ra image embedding $(z_i)$ tương ứng. Cuối cùng, một image decoder sẽ biến đổi image embedding đó thành ảnh cuối cùng (i). 
![image.png](https://images.viblo.asia/ad3c0956-1181-4b26-84d7-dd9f0885298b.png)

Ảnh bên trên mô tả 2 giai đoạn training của DALLE-2: Giai đoạn 1 là training CLIP model để lấy image embedding $(z_i)$ và text embedding ($z_t$), sang giai đoạn 2, CLIP model được đóng băng và thực hiện quá trình sinh ảnh bởi prior và decoder 

Về khái quát là như vậy, nhưng cụ thể thì sao? Trước tiên, text và image embedding mà DALLE-2 sử dụng sẽ do một model khác tạo ra, đó là CLIP. Chi tiết CLIP thế nào thì chúng ta hãy cùng tìm hiểu bên dưới.

# 2. CLIP (Contrastive Language–Image Pre-training)
CLIP là viết tắt của cụm từ Contrastive Language–Image Pre-training. Mục tiêu của CLIP là kết nối text – image; tức là text embedding và image embedding được tạo ra từ CLIP sẽ có một độ tương quan lẫn nhau nhất định và mang thông tin của nhau. Vậy cụ thể là làm như thế nào?
![image.png](https://images.viblo.asia/f986b2b9-56d2-40b7-b84e-8a1ac4d7e938.png)
Mô tả một cách đơn giản thì CLIP hoạt động như sau:

Với đầu vào là các cặp image-caption:

Bước 1: Sinh image embedding và text embedding cho mỗi một cặp ảnh-caption từ text encoder và image encoder (model cho text encoder và image encoder có nhiều lựa chọn, chẳng hạn như image encoder thì dùng vision transformer hoặc CNN, text encoder thì có thể dùng transformers...

Bước 2: Tính toán cosine similarity cho từng cặp text-image embedding

Bước 3: Lặp lại quá trình maximize cosine similarity cho cặp ảnh-caption đúng và minimize cosine similarity cho các cặp ảnh-caption không khớp với nhau

Hàm loss:
Với 2 ma trận có được là image embedding matrix và text embedding matrix, ta nhân dot product với nhau, ra ma trận mới tạm gọi là ma trận dot product. Ta cũng tính ma trận cosine similarity giữa các cặp ảnh và text để ra ma trận cosine similarity. Sau đó dùng hàm cross-entropy để minimize phân phối giữa hai ma trận này

Sau khi training xong, chúng ta sẽ đóng băng mô hình lại và chuyển sang giai đoạn tiếp theo: tìm ra image embedding phù hợp nhất cho caption đầu vào

# 3. PRIOR - Kết nối ngữ nghĩa văn bản và ngữ nghĩa hình ảnh
Mặc dù CLIP có thể tạo ra text embedding và image embedding, nhưng cuối cùng image embedding từ CLIP không được dùng để sinh ra ảnh ở giai đoạn decode. DALLE 2 sử dụng một model khác để tạo ra image embedding $z_i$, đó là prior model, cụ thể là diffusion prior. Chúng ta hãy dừng lại để xem qua một chút về diffusion model nhé
![Fixed_Forward_Diffusion_Process.png](https://images.viblo.asia/9d77eda3-fdad-4721-9547-86d9b2ce0c5e.png)

Hãy tưởng tượng chúng ta có một ảnh sau đó dần dần thêm nhiễu vào ảnh đó (nhiễu lấy từ phân phối Gaussian) với số lượng timestep đủ lớn để bức ảnh toàn nhiễu và không thể nhận ra được có cái gì trong bức ảnh đấy nữa, rồi từ ảnh toàn nhiễu đó chúng ta lại khử nhiễu để có được bức ảnh hoàn chỉnh. Chính xác, đó là ý tưởng đằng sau diffusion model. Quá trình thêm nhiễu vào ảnh là quá trình thuận, quá trình khử nhiễu ảnh được gọi là quá trình nghịch.  Toàn bộ quá trình được mô tả bằng chuỗi Markov, tức là xác suất chuyển từ một trạng thái chỉ phụ thuộc vào trạng thái trước đó mà không phụ thuộc vào bất kì trạng thái nào khác.
![image.png](https://images.viblo.asia/b515592d-0466-484c-be23-024389f8adc7.png)

Chúng ta sẽ lấy ví dụ với một bức ảnh, và gọi nó là $x_0$. Ở quá trình thuận, ta sẽ dần dần thêm nhiễu để có được một bức ảnh toàn nhiễu ở timestep thứ $T$ ($x_T$). Xác suất chuyển từ timestep $t$ sang timestep $t-1$ được ký hiệu là $q(x_t|x_{t-1})$. Từ tính chất Markov, xác suất liên hợp được phân tích thành:

$$q(x_{1:T}|x_0) = \prod_{t=1}^Tq(x_t|x_{t-1})$$

Xác suất chuyển sẽ được xác định trước là một phân bố nào đó. Ở đây, xác suất chuyển $q(x_t|x_{t-1})$ được mô hình bởi $N(x_t;\sqrt{1-\beta_t}x_{t-1}, \beta_t I)$. Trong đó, $\beta_t$ là phương sai tại timestep $t$ và là một hyperparameter; qua mỗi timestep nó sẽ được tăng lên nhưng vẫn giới hạn trong khoảng $(0,1)$.  Đến timestep $T$, ta có $q(x_T|x_0) \approx N(0,I)$, lúc này ta đã mất hết thông tin đã có trong ảnh lúc đầu và có được bức ảnh toàn nhiễu

Còn trong quá trình nghịch, khi ta đã có được phân bố $p(x_T)$, việc sinh dữ liệu sẽ bắt đầu từ phân bố này, sau đó biến đổi ngược trở về phân bố $p(x_0)$ ban đầu. Xác suất liên hợp được phân tích thành:
$$p(x_{0:T}|x_0) := p(x_T)\prod_{t=1}^Tq(x_{t-1}|x_t)$$
Mục tiêu lúc này là tìm xác suất chuyển $p(x_{t-1}|x_t)$. Ta sẽ mô hình xác suất này bởi phân bố Gaussian, có dạng $N(x_{t-1};\mu_\theta(x_t, t);\sum_\theta(x_t,t)$. Khi mô hình được quá trình nghịch rồi, ở bước sinh dữ liệu, dữ liệu từ phân bố của $x_T$ sẽ được biến đổi thêm dựa trên xác suất chuyển này.

Hàm loss được tính như sau:
$$
L = \mathbb{E}_{x_0,\epsilon} \left[ ||\epsilon - \epsilon_\theta(\sqrt{\=\alpha_t}x_0 + \sqrt{1-\=\alpha_t}\epsilon, t)||^2\right]
$$

Trong đó, $\epsilon$ là nhiễu ban đầu được thêm vào, $\epsilon_\theta$ là nhiễu được dự đoán. Mục tiêu của hàm loss trên là minimize khoảng cách giữa $\epsilon$ và $\epsilon_\theta$. Ta sẽ sinh ra $x_{t-1} \sim p_\theta(x_{t-1}|x_t)$ và tính được $x_{t-1} = \frac{1}{\sqrt{\alpha_t}}(x_t - \frac{\beta_t}{\sqrt{1-\=\alpha_t}} \epsilon_\theta(x_t,t)) + \sigma_tz$ với $z \sim N(0,I)$ Còn $\=\alpha_t := \prod_{s=1}^t \alpha_s$ với  $\alpha_t := 1- \beta_t$. Và
 $\epsilon_\theta$ được học bởi mô hình Unet.
 
Phía trên là khái quát cách thức mà diffusion model hoạt động, vậy diffusion prior là như thế nào? 

Về cơ bản là người ta sẽ dùng một diffusion model, nhưng trong quá trình nghịch, thay vì dùng Unet ở bước học $\epsilon_\theta$ thì tác giả thay vào bằng phần decoder của Transformer. Đầu vào của decoder-only Transformer gồm 1 chuỗi các thành phần:  encoded text (y), the CLIP text embedding $z_t$, diffusion timestep và the CLIP image embedding $z_i$ được noise.

Sau các bước trên, ta sẽ có được unnoised image embedding $z_i$ 

# 4. Decoder - gen ảnh từ image embedding ($z_i$)

Sau khi có được image embedding ($z_i$), việc tiếp theo sẽ là decode image embedding ($z_i$) ra ảnh. Tác giả chọn dùng model GLIDE để làm decoder. GLIDE là một diffusion model nhưng có chỉnh sửa một chút. Cụ thể ở đây là nó sẽ thêm thông tin về text để guide quá trình học của model. Bởi vì đối với một diffusion model đơn thuần, quá trình từ nhiễu trắng đến ảnh được gen ra sẽ không có bất kì sự chỉ dẫn cụ thể nào để gen ra một ảnh với một nội dung mong muốn cụ thể. Ví dụ, ta có một diffusion model được train trên tập dataset về chó sẽ gen ra ảnh một con chó giống như thật. Nhưng nếu chúng ta muốn gen ra ảnh một loại chó cụ thể thì sao?

![image.png](https://images.viblo.asia/8a3747f9-b2d8-4ee0-8a46-a1bbb1002082.png)

Ở quá trình ngược ở diffusion model, thông tin về text sẽ được thêm vào. Phần text này sẽ được encode qua mô hình Transformer. Sau khi có được embedding từ Transformer, ta sẽ lấy embedding đó  $(c)$ để làm  conditioning cho diffusion model . Tức là $x_{t-1} \sim p_\theta(x_{t-1}|x_t)$ ở đây sẽ thành $x_{t-1} \sim p_\theta(x_{t-1}|x_t, c)$.

Vậy làm sao để tích hợp thêm embedding $(c)$ kia? Ở quá trình denoise, trong bước học $\epsilon_\theta$ tác giả có dùng mạng Unet để thực hiện điều này.

![image.png](https://images.viblo.asia/886c0fca-a021-4322-8da6-0238453ef368.png)

Embedding $(c)$ này sẽ được ánh xạ tới các lớp trung gian của UNet thông qua cơ chế cross-attention. Cụ thể:
$$
Attention(Q,K,V) = softmax \left(\frac{QK^T}{\sqrt{d}}).V \right),\\
Q= W_Q^{(i)}.\varphi_i(z_t), K = W_K^{(i)} . c, V =W_V^{(i)} . c.
$$

Với $\varphi_i(z_t)$ là một đại diện trung gian của UNet khi thực hiện Denoising, tức là đây là giá trị output trước khi đi qua Max pool hay Up-conv trong Unet. 
$W_V^{(i)}, W_Q^{(i)}, W_K^{(i)}$ là ma trận học được trong quá trình huấn luyện.

Lúc này hàm loss của chúng ta sẽ có dạng như sau:

$$
L = \mathbb{E}_{E(x), c, \epsilon \sim N(0,1), t} \left[||\epsilon - \epsilon_\theta(z_t, t, c||^2_2 \right]
$$


Nhờ quá trình trên, ảnh cuối cùng được sinh ra đã mang nội dung mong muốn từ caption. Đây chính là ý nghĩa text-conditional image generation mà tác giả nhắc đến từ đầu.

# Kết luận
Đến đây, chúng ta có thể xâu chuỗi lại toàn bộ quá trình như sau:
1. Sử dụng CLIP model để tạo ra image embedding $z_i$ và text embedding $z_t$
2. Sau đó diffusion prior tạo ra image embedding từ CLIP text embedding và CLIP image embedding
3. Dùng decoder (diffusion-base) để decode từ image embedding ra ảnh cuối cùng

# Tham khảo
* Hierarchical Text-Conditional Image Generation with CLIP Latents (https://arxiv.org/pdf/2204.06125.pdf)
* Learning Transferable Visual Models From Natural Language Supervision (https://arxiv.org/pdf/2103.00020.pdf)
* GLIDE: Towards Photorealistic Image Generation and Editing with Text-Guided Diffusion Models (https://arxiv.org/pdf/2112.10741.pdf)