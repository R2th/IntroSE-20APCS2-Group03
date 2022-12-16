# Introduction
Image-to-image translation là một lớp bài toán computer vision mà mục tiêu là học một ánh xạ giữa ảnh input và ảnh output. Bài toán này có thể áp dụng vào một số lĩnh vực như style transfer, tô màu ảnh, làm nét ảnh, sinh dữ liệu cho segmentation, face filter,...
![](https://images.viblo.asia/8da94e54-fbe2-40e0-a528-d0569d80433e.png)

![](https://images.viblo.asia/2af42d07-0199-4972-8e16-5704550c3b1e.png)

![](https://images.viblo.asia/f9ae1b58-0e00-4c97-a2b4-98e3a84f4ba7.png)


Thông thường để huấn luyện một mô hình Image-to-image translation, ta sẽ cần một lượng lớn các cặp ảnh input và label. Ví dụ như: ảnh màu và ảnh grayscale tương ứng với nó, ảnh mờ và ảnh đã được làm nét, ....Tuy nhiên, việc chuấn bị dataset theo kiểu này có thể khá tốn kém trong một số trường hợp như: style transfer ảnh từ mùa hè sang mùa đông (kiếm được ảnh phong cảnh trong các điều kiện khác nhau), biến ngựa thường thành ngựa vằn  (khó mà kiếm được ảnh của 1 con ngựa thường và ảnh của nó nhưng là ngựa vằn :D).

Do các bộ dataset theo cặp gần như là không tồn tại nên mới nảy sinh như cầu phát triển một mô hình có khả năng học từ dữ liệu unpaired. Cụ thể hơn là có thể sử dụng bất kỳ hai tập ảnh không liên quan  và các đặc trưng chung được trích xuất từ mỗi bộ sưu tập và  sử dụng trong quá trình image translation. Đây được gọi là bài toán unpaired image-to-image translation.

Một cách tiếp cận thành công cho  unpaired image-to-image translation là [CycleGAN](https://arxiv.org/pdf/1703.10593.pdf).
# CycleGAN architecture
CycleGAN được thiết kế dựa trên Generative Adversarial Network (GAN). Kiến trúc GAN là một cách tiếp cận để huấn luyện một mô hình sinh  ảnh bao gồm hai mạng neural: một mạng generator và một mạng discriminator. Generator sử dụng một vector ngẫu nhiên lấy  từ latent space làm đầu vào và tạo ra hình ảnh mới và Discriminator lấy một bức ảnh làm đầu vào và dự đoán xem nó là thật (lấy từ dataset) hay giả (được tạo ra bởi generator). Cả hai mô hình sẽ thi đấu với nhau, Generator sẽ  được huấn luyện để sinh ảnh có thể đánh lừa Discriminator  và Discriminator sẽ được huấn luyện để phân biệt tốt hơn hình ảnh được tạo.

CycleGAN là một mở rộng của kiến trúc GAN cổ điển bao gồm 2 Generator và 2 Discriminator. Generator đầu tiên gọi là G, nhận đầu vào là ảnh từ domain X (ngựa vằn) và convert nó sang domain Y (ngựa thường). Generator còn lại gọi là Y, có nhiệm vụ convert ảnh từ domain Y sang X. Mỗi mạng Generator có 1 Discriminator tương ứng với nó 

* $D_Y$: phân biệt ảnh lấy từ domain Y và ảnh được translate G(x).
* $D_X$: phân biệt ảnh lấy từ domain X và ảnh được translate F(y).

![](https://images.viblo.asia/bbaa6c06-d707-4bd8-b988-81b44086136f.png)

## Generator
Generator của CycleGAN dựa trên được lấy từ paper [này](https://arxiv.org/abs/1603.08155), bao gồm 3 thành phần: encoder, transformer và decoder

![](https://images.viblo.asia/21fab617-eee8-41e9-bf74-7d31495db355.png)
Phần encoder bao gồm 3 lớp tích chập, 2 lớp sau có stride = 2  để làm giảm kích thước đầu vào của ảnh và tăng số channel. Output của encoder được sử dụng làm đầu vào cho transformer bao gồm 6 khối residual như trong [resnet](https://arxiv.org/abs/1512.03385). Lớp batch normalization trong khối residual được thay bằng instance normalization. Cuối cùng phần decoder bao gồm 3 lớp transposed convolution sẽ biến đổi ảnh về kích thước ban đầu và số channel phụ thuộc vào domain đầu ra.

## Discriminator
Discriminator sử dụng kiến trúc [PatchGAN](https://export.arxiv.org/pdf/1611.07004). Thông thường trong bài toán classification, output của mạng sẽ là một giá trị scalar - xác suất thuộc class nào đó. Trong mô hình CycleGAN, tác giả thiết kế Discriminator sao cho output của nó là một feature map $N\times N\times1$.  Có thể xem là Discriminator sẽ chia ảnh đầu vào thành 1 lưới $N \times N$ và giá trị tại mỗi vùng trên lưới sẽ là xác suất để vùng tương ứng trên ảnh là thật hay giả.![](https://images.viblo.asia/1696ebe2-b162-41a8-8f0b-92fc8bc88fdf.png)

# Loss function
## Adversarial loss
Trong quá trình huấn luyện, generator G cố gắng tối thiểu hóa hàm adversarial loss bằng cách translate ra ảnh G(x) (với x là ảnh lấy từ domain X) sao cho giống với ảnh từ domain Y nhất, ngược lại Discriminator $D_Y$ cố gắng cực đại hàm  adversarial loss bằng cách phân biệt ảnh G(x) và ảnh thật y từ domain 

   $L_{adv}(G, D_Y, X, Y) = \frac{1}{n}[ logD_{Y}(y)] + \frac{1}{n}[log(1- D_Y(G(x))]$

Adversarial loss được áp dụng tương tự đối với generator F và Discriminator

   $L_{adv}(F, D_X, Y, X ) = \frac{1}{n}[ logD_{X}(x)] + \frac{1}{n}[log(1- D_X(F(y))]$
   ## Cycle consistency loss
   Chỉ riêng adversarial loss là không đủ để mô hình cho ra kết quả tốt. Nó sẽ lai generator theo hướng tạo ra được ảnh output bất kỳ trong domain mục tiêu chứ không phải output mong muốn. Ví dụ với bài toán biến ngựa vằn thành ngựa thường, generator có thể biến con ngựa vằn thành 1 con ngựa thường rất đẹp nhưng lại không có đặc điểm nào liên quan tới con ngựa vằn ban đầu. 
   
   Để giải quyết vấn đề này, cycle consistency loss được giới thiệu. Trong paper, tác giả cho rằng nếu ảnh x từ domain X được translate sang domain Y và sau đó translate ngược lại về domain Y lần lượt bằng 2 generator G, F thì ta sẽ được ảnh x ban đầu: $x\rightarrow G(x) \rightarrow F(G(x)) \approx x$
   
   $L_{cycle}(G, F) = \frac{1}{n}\sum|F(G(x_i)) - x_i|+|G(F(y_i)) - y_i|$ 
   
   ## Full loss
   $L = L_{adv}(G, D_Y, X, Y) + L_{adv}(F, D_X, Y, X) + \lambda L_{cycle}(G, F)$
   
   trong đó $\lambda$ là siêu tham số và được chọn là 10.
   
   # Một số kết quả
   Style transfer tranh vẽ sang ảnh chụp
   
   ![](https://images.viblo.asia/a7a99d48-7b3c-4d95-a0ae-a26da4c6165f.jpeg)

Ngựa vằn sang ngựa thường

![](https://images.viblo.asia/7ca03581-b525-4dd5-8081-5f1ed72a2fc1.png)

Táo thành cam
![](https://images.viblo.asia/67dcff3b-1ad7-4840-b334-b1f13e640588.png)

Mặt người thành búp bê

![](https://images.viblo.asia/91dee65d-88d2-4035-8449-17b2d9b39247.jpeg)
![](https://images.viblo.asia/695363eb-e617-44ef-8cc3-d9ce2ca0ae0b.jpeg)

# References
* [https://github.com/junyanz/CycleGAN](https://github.com/junyanz/CycleGAN)
* https://machinelearningmastery.com/what-is-cyclegan/
* https://towardsdatascience.com/cyclegan-learning-to-translate-images-without-paired-training-data-5b4e93862c8d