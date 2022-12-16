Bài viết sau đây sẽ trình bày về bài toán upscale ảnh (tăng độ phân giải của ảnh) và một phương pháp upscale ảnh bằng cách sử dụng mô hình deep learning đơn giản có tên là SRCNN (Super Resolution Convolutional Neural Network).
# 1. Bài toán upscale ảnh
Cho ảnh $X$ là một ảnh high-resolution (độ phân giải cao) và $Y$ là một phiên bản low-resolution (độ phân giải thấp) của $X$. Gọi hàm được dùng để upscale ảnh input là $F$. Bài toán upscale ảnh sẽ hướng đến việc tìm $F$ sao cho $F(Y) \approx X$ hay ảnh upscale từ $Y$ gần giống $X$ nhất có thể.
Đây là một vài các phương pháp truyền thống phổ biến có thể dùng để upscale ảnh:
* Nearest-neighbor interpolation (nội suy láng giềng gần nhất): là phương pháp đơn giản nhất. Trong phương pháp này, các pixel trong ảnh $F(Y)$ sẽ dùng giá trị của pixel trong ảnh $Y$ gần nó nhất.
* Bilinear interpolation (nội suy song tuyến): phương pháp này sẽ nội suy giá trị của một pixel bằng cách tính trung bình có trọng số 4 (2x2) pixel lân cận.
* Bicubic interpolation (nội suy song khối): tương tự như bilinear interpolation nhưng với 16 (4x4) pixel lân cận.
* Lanczos interpolation (nội suy Lanczos): sử dụng thuật toán tính trung bình giá trị pixel bằng hàm sin.

Giả sử với ảnh gốc sau:
![PARROT.png](https://images.viblo.asia/61413430-a296-4c21-8735-41d0bf555062.png)

* Ảnh low-resolution:

![THUMB.png](https://images.viblo.asia/59a4dc79-7e88-4a49-b574-297ec1f694da.png)
Sau khi downscale ảnh gốc xuống 4 lần và chạy từng phương pháp upscale về resolution gốc, ta có được kết quả như sau:
* Nearest-neighbor interpolation:

![resized_inter_nearest.png](https://images.viblo.asia/d48dfd8e-7230-4871-8c31-b24a25927805.png)
* Bilinear interpolation:

![resized_inter_linear.png](https://images.viblo.asia/0aa2552a-6770-48d2-874e-cf4de85ee096.png)
* Bicubic interpolation:

![resized_inter_cubic.png](https://images.viblo.asia/b840b587-2e03-4c3a-9507-cea46a2d6248.png)
* Lanczos interpolation:

![resized_inter_lanczos.png](https://images.viblo.asia/366ee5c3-0c1e-4dab-b973-e1793506d8cc.png)

Tuy nhiên, các thuật toán này lại có nhược điểm là ảnh output khá mờ, bị răng cưa, ringing artifact... Trong đó, nhược điểm khá lớn đó là các thuật toán này không thể restore lại được các chi tiết có trong ảnh gốc. Bằng việc sử dụng deep learning, các chi tiết trên sẽ được các mạng CNN thêm vào bằng cách đoán các giá trị pixel mà nó thấy phù hợp nhất. Để biết được pixel nào là hợp lý nhất, mạng CNN này sẽ phải được train với rất nhiều ảnh. Ngoài ra, các ảnh mà nó được train sẽ cần phải có chung kiểu với ảnh cần predict để model có thể hoạt động tốt. Ví dụ, một mạng CNN được train trên dataset gồm các ảnh có style của anime sẽ predict tốt với ảnh cùng style anime nhưng lại kém với ảnh ngoài đời thật.
# 2. SRCNN
Bài viết này sẽ tìm hiểu về một mạng CNN đơn giản tên là **SRCNN** được dùng để upscale ảnh. Đây là mạng CNN sẽ được dùng để học end-to-end mapping giữa ảnh low res và high res. Link bài báo: https://arxiv.org/abs/1501.00092.

Cấu trúc mạng SRCNN rất đơn giản. Nó chỉ có 3 layer tất cả: patch extraction and representation, non-linear mapping và reconstruction.
![image.png](https://images.viblo.asia/1da1a7ab-0323-4043-adc5-3898226bee9b.png)

Trong mạng SRCNN, ảnh input ($Y$) sẽ là ảnh low-resolution nhưng lại được upscale nên bằng phương pháp bicubic interpolation để cho kích thước bằng ảnh groundtruth ($X$).

## 2.1 Patch extraction and representation
Layer đầu tiên này sẽ có nhiệm vụ lấy các patch (mảnh) overlap nhau ở trên ảnh input bằng cách trượt một kernel có kích thước cố định ở trên ảnh. Sau đó, nó biểu diễn feature map của từng patch dưới dạng một vector nhiều chiều. Số lượng feature map sẽ tương ứng với số chiều của vector. Phép toán được thực hiện ở layer đầu tiên là:

$$F_1(Y)=\text{max}(0,W_1\circledast Y+B_1)$$

trong đó, $W_1$ là các filter, $B_1$ là các bias và $\circledast$ là phép tích chập. $W_1$ sẽ có tất cả $n_1$ filter với kích thước $c \times f_1 \times f_1$ với $c$ là số lượng channel của ảnh đầu vào (thường là 3 với ảnh màu, 1 với ảnh grayscale). Hàm $\text{max}$ có thể coi như là một layer ReLU. Output của layer này là một vector $n_1$ chiều tương ứng với $n_1$ feature map.
## 2.2 Non-linear mapping
Sau khi lấy được vector feature của ảnh low-resolution, ta sẽ cho nó qua layer tích chập thứ hai. Layer này có nhiệm vụ lấy map (ánh xạ) vector $n_1$ chiều ở layer trước tới một vector $n_2$ chiều. Phép toán được thực hiện ở layer này là:

$$F_2(Y)=\text{max}(0,W_2\circledast F_1(Y)+B_2)$$
trong đó, $W_2$ là các filter, $B_2$ là các bias của layer này. $W_2$ sẽ có tất cả $n_2$ filter với kích thước $n_1 \times f_2 \times f_2$ với $c$ là số lượng channel của ảnh đầu vào (thường là 3 với ảnh màu RGB và 1 với ảnh grayscale). Output của layer này là một vector $n_2$ chiều ứng với $n_2$ feature map. Mỗi một feature map trong vector này sẽ là biểu diễn của một high-resolution patch được dùng để khôi phục ảnh.

Theo tác giả bài báo, chúng ta có thể thêm nhiều layer hơn ở giữa để tăng tính phi tuyến tính (non-linearity). Tuy nhiên, việc tăng số lượng layer lên sẽ làm mô hình trở nên phức tạp hơn và tốn nhiều thời gian train để mô hình hội tụ. Đồng thời, kết quả trong bài báo cho thấy việc tăng số lượng layer (lớn hơn tổng 3 layer của cả model) cũng không làm tăng đáng kể chất lượng của output nên trong phần cài đặt, bài viết này sẽ chỉ cài đặt một layer ở giữa.
## 2.3 Reconstruction
Layer cuối này sẽ được dùng để khôi phục ảnh high-resolution từ vector $n_2$ chiều ở layer trước. Phép toán được thực hiện ở layer này là:

$$F(Y)=W_3\circledast F_2(Y) + B_3$$

$W_3$ gồm $c$ filter có kích thước $n_2 \times f_3 \times f_3$. Kết quả của layer này sẽ là ảnh đã được upscale, có kích thước bằng kích thước ảnh input (do ảnh kích thước đã được upscale từ đầu).
## 2.4 Hàm loss
Hàm loss được dùng để train mạng SRCNN là MSE:

$$L(\Theta)= \frac{1}{n} \sum_{i=1}^n||F(Y_i;\Theta)-X_i||^2 $$

với $n$ là số sample được dùng để train. Việc dùng hàm MSE sẽ giúp tối đa hóa được PSNR (Peak Signal-to-Noise Ratio hay Tỉ số tín hiệu cực đại trên nhiễu). PSNR được dùng để đo chất lượng tín hiệu khôi phục của các thuật toán. PSNR càng cao thì chất lượng dữ liệu khôi phục được càng tốt.

# 3. Cài đặt và kết quả
Theo như bài báo, phần cài đặt, tác giả để các tham số lần lượt là: $f_1=9$, $f_2=1$, $f_3=5$, $n_1=64$ và $n_2=32$. Tuy nhiên, do size của output khi dùng tham số này lại khác so với size của input (đã được upscale 4x dùng bicubic interpolation), không thuận tiện cho việc training nên trong phần cài đặt, mình sẽ cho $f2$ tăng lên $5$.
[Đây](https://colab.research.google.com/drive/16umnQKwF6P9PFwBz2qhgdCM5y7dPvXkT?usp=sharing) là link notebook colab chứa code cài đặt và train model. Model có thể được cài đặt khá đơn giản chỉ với vài dòng code:

```
class SRCNN(nn.Module):
    def __init__(self, num_channels=1):
        super().__init__()

        # Patch extraction and representation
        self.conv1 = nn.Conv2d(num_channels, 64, 9, 1, 4)
        self.relu1 = nn.ReLU(inplace=True)

        # Non-linear mapping
        self.conv2 = nn.Conv2d(64, 32, 5, 1, 2)
        self.relu2 = nn.ReLU(inplace=True)

        # Reconstruction
        self.conv3 = nn.Conv2d(32, num_channels, 5, 1, 2)

        # Initialize weight
        nn.init.normal_(self.conv1.weight.data, mean=0.0, std=0.001)
        nn.init.zeros_(self.conv1.bias.data)
        nn.init.normal_(self.conv2.weight.data, mean=0.0, std=0.001)
        nn.init.zeros_(self.conv2.bias.data)
        nn.init.normal_(self.conv3.weight.data, mean=0.0, std=0.001)
        nn.init.zeros_(self.conv3.bias.data)

    def forward(self, x):
        x = self.relu1(self.conv1(x))
        x = self.relu2(self.conv2(x))
        x = self.conv3(x)

        return x
```

Do số lượng dataset của tác giả bài báo khá ít (chỉ có 91 ảnh) và việc downscale ảnh xuống 4 lần làm mất mát khá nhiều thông tin nên sau khi train model khoảng 2200 epoch, kết quả upscale 4x sẽ được có PSNR là $28.12$:

![test_srcnn_x4.png](https://images.viblo.asia/11c01f59-566b-407c-885a-e2dd607c9350.png)

Với model pretrained [này](https://www.dropbox.com/s/pd5b2ketm0oamhj/srcnn_x4.pth?dl=0), ảnh output trông rõ hơn chút, bớt bị ringing artifacts và phần mỏ trông sharp hơn do model được train lâu hơn với bộ dataset to hơn. PSNR là $29.26$.

![test_srcnn_x4_pretrained.png](https://images.viblo.asia/9e316efc-5be9-471f-8742-98a00dcb6abd.png)