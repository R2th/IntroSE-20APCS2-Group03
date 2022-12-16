Chào mọi người ! Như các bạn đã biết, Image Semantic Segmentation là một bài toán điển hình trong Computer Vision xử lý ảnh. Một yêu cầu đặt ra đó là việc ứng dụng nó trong các lĩnh vực của đời sống. Trong đó, y tế là một mảnh đất mà chúng ta có thể áp dụng bài toán trên để tiến hành trích xuất các yếu tố quan trọng trong các hình ảnh chụp (x-quang hay MRI-cộng hưởng từ,...). 

Trong bài viết này, mình sẽ giới thiệu cho mọi người về bài xác định vị trí và hình dạng khối u trong não từ dữ liệu thô là các ảnh scan MRI bằng kiến trúc U-Net, mục đích là từ kết quả phân tích được để chuẩn đoán bệnh. Cụ thể, bài viết sẽ gồm các phần chính:
1. Semantic Segmentation và kiến trúc U-Net
2. Giới thiệu Bài toán Semantic Segmantation for Medical Decathlon - Brain Tumour
     
     
## 1. Semantic Segmentation và kiến trúc U-Net

### 1.1 Sematic Segmentation

Semantic image segmentation là một nhiệm vụ nhằm phân loại từng điểm ảnh trong 1 ảnh từ một tập các lớp được định nghĩa trước. Hay đơn giản có thể hiểu đó là việc phân loại các đối tượng  trong một ảnh vào các lớp đã định nghĩa trước đó. 

Ví dụ như semantic segmentation trong ảnh phòng ngủ, các pixel thuộc về "bed" sẽ được phân loại vào lớp "bed, pixel thuộc về "table" được gán nhãn là "table": 
![](https://images.viblo.asia/ea8fa7a3-89de-4035-86e1-fd22f7351476.png)

_<p align="center">(Nguồn:  Divam Gupta)</p>_

Mục tiêu của lớp bài toán này là từ ảnh đầu vào với shape = (W, H, 3) để tạo ra ma trận WxH đầu ra với mỗi điểm ảnh sẽ là class_ID(label) tương ứng được dự đoán.

![](https://images.viblo.asia/922d878b-a7b0-49f6-b176-74f2ce71dc1f.png)

_<p align="center">(Nguồn:  Divam Gupta)</p>_

Khác với bài toán Object Detection ở điểm Semantic Segmentation sẽ không dự đoán "bounding boxes" của đối tượng và cũng không phân biệt giữa các đối tượng khác nhau của một lớp (bài toán Instance Segmentation). Ví dụ như, trong một ảnh chụp đường phố với các class là "car", "street", "tree" thì có thể có nhiều car trong ảnh và tất cả sẽ cùng một nhãn.

![](https://images.viblo.asia/bad3ea3d-6a17-4810-9a16-3af9e151a9ac.png)

_<p align="center">(Nguồn:  Divam Gupta)</p>_

#### Các ứng dụng của Semantic Segmentation

Semantic Segmentation được ứng dụng trong nhiều lĩnh vực (y tế, giao thông, xe lái, vệ tinh,...) và nhiều bài toán thực tiến, ví dụ như :

-  Chuẩn đoán bệnh và phân tích trong y học với các hình ảnh chụp X-quang hay ảnh chụp cộng hưởng từ (MRI) 
![](https://images.viblo.asia/9bbbc618-a995-44d7-ae19-6f46e4fcb87a.png) 
_<p align="center">Xác định vị trí và hình dạng khối u trong não</p>_
- Xe tự lái. Từ việc semantic segmentation chúng ta có thể phát hiện ra các phương tiện, chướng ngại vật trên đường di chuyển cũng như khu vực có thể di chuyển được.
![](https://images.viblo.asia/2966502d-7a42-418d-b360-0fb20e5288f8.gif)

- Phân tích ảnh vệ tinh: Phân chia các loại khu vực (đất đai, ao hồ, khu dân cư,...)
![](https://images.viblo.asia/d9731347-25c6-45be-aac9-d105e7246ec1.png)

### 1.2 Kiến trúc U-Net

[U-Net](https://arxiv.org/pdf/1505.04597v1.pdf) là  một kến trúc được thiết kế giống như bộ auto-encoder (mã hóa tự động), bao gồm một encoding-path(contracting) bắt cặp với một decoding path(expanding) tạo thành một kiến trúc dạng hình chữ U. Tuy nhiên, ngược lại với auto-endcoder, U-Net dự đoán pixelwise segmenatation map (segmentation map theo chiều pixel) của ảnh đầu vào thay vì phân loại toàn bộ ảnh đầu vào.

Với mỗi pixel thuộc ảnh gốc, U-Net sẽ tiến hành phân loại pixel này thuộc lớp nào. Điều này cho phép U-Net dự đoán đồng thời các phần khác nhau của hình ảnh.

![u-net_architecture](https://miro.medium.com/max/1400/0*NEnNDa6o5CGzCZFI.png)

#### Đặc điểm

- U-net có thể được chia làm 2 đường dẫn, một là contracting path, hai là expanding path
- Contracting path tiến hành down-sampling cho việc trích xuất các đặc trưng. Nó được xây dựng tương tự như một mạng Convolutional Neural Netwwork nhưng được tiếp nối bởi Expanding path thực hiện việc up-sampling để định vị chính xác các đặc trưng.
-   Một điều làm cho mạng U-Net trở nên mạnh mẽ là việc các feature map của tầng convolution được huấn luyện ở đường dẫn down-sampling và kết hợp chúng với đường dẫn up-sampling của tầng de-convolution.

## 2. Giới thiệu Bài toán Semantic Segmantation for Medical Decathlon - Brain Tumour

### Mục tiêu bài toán

Mục tiêu của bài toán là xác định hình dạng, vị trí của khối u não bên trong các hình ảnh 2D hoặc 3D chụp cộng hưởng từ (MRI), từ đó dễ dàng cho việc chuẩn đoán bệnh và lập kế hoạch điều trị.
![](https://images.viblo.asia/9bbbc618-a995-44d7-ae19-6f46e4fcb87a.png) 
_<p align="center">Xác định vị trí và hình dạng khối u trong não</p>_


### Xây dựng mô hình U-Net cho bài toán

Pipeline của model sẽ được mô tả qua ảnh sau: 
![model.png](https://github.com/dangnam739/unet-for-medical-deecathlon/blob/master/2D/images/model.png?raw=true)

_<p align="center">(Nguồn: [unet-for-medical-deecathlon/2D/images/model](https://github.com/dangnam739/unet-for-medical-deecathlon/blob/master/2D/images/model.png))</p>_

Code xây dựng model các bạn có thể tham khảo tại [đây](https://github.com/dangnam739/unet-for-medical-deecathlon/blob/master/2D/model.py)

### Đánh giá model

Về mặt đánh giá, trong bài toán này chúng ta sử dụng hệ số [Dice coefficient](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient) (số liệu chuẩn cho bộ dữ liệu BraTS được sử dụng trong nghiên cứu).  Dice coefficient được sử dụng để so sáng độ tương đồng giữa 2 mẫu. Ví dụ, với 2 tập X, Y thì dice sẽ được tính theo công thức:

$$ dice = \frac{2|X\cap Y|}{|X|+|Y|}

```python
 def dice_coef(self, target, prediction, axis=(1, 2), smooth=0.01):
        """
        Sorenson Dice
        \frac{  2 \times \left | T \right | \cap \left | P \right |}{ \left | T \right | +  \left | P \right |  }
        where T is ground truth mask and P is the prediction mask
        """
        prediction = K.backend.round(prediction)  # Round to 0 or 1

        intersection = tf.reduce_sum(target * prediction, axis=axis)
        union = tf.reduce_sum(target + prediction, axis=axis)
        numerator = tf.constant(2.) * intersection + smooth
        denominator = union + smooth
        coef = numerator / denominator

        return tf.reduce_mean(coef)
        
 
def dice_coef_loss(self, target, prediction, axis=(1, 2), smooth=1.0):
        """
        Sorenson (Soft) Dice loss
        Using -log(Dice) as the loss since it is better behaved.
        Also, the log allows avoidance of the division which
        can help prevent underflow when the numbers are very small.
        """
        intersection = tf.reduce_sum(prediction * target, axis=axis)
        p = tf.reduce_sum(prediction, axis=axis)
        t = tf.reduce_sum(target, axis=axis)
        numerator = tf.reduce_mean(intersection + smooth)
        denominator = tf.reduce_mean(t + p + smooth)
        dice_loss = -tf.log(2.*numerator) + tf.log(denominator)

        return dice_loss
```

### Một số kết quả

![](https://images.viblo.asia/06e1c5b4-cad5-423c-aac5-3d7cb7c5d5c2.png)

_<p align="center">(Nguồn: [unet-for-medical-deecathlon/2D/images](https://github.com/dangnam739/unet-for-medical-deecathlon/tree/master/2D/images))</p>_

## Lời kết

Như vậy, trên đây là một số phần mình tìm hiểu được về Semantic Segmentation và bài toán Semantic Segmantation for Medical Decathlon - Brain Tumour thông qua repository [InterlAI/unet/2D](https://github.com/IntelAI/unet/tree/master/2D).

Hy vọng bài viết sẽ hữu ích với mọi người. Cảm ơn các bạn đã dành thời gian theo dõi <3

## References

1. [A Beginner's guide to Deep Learning based Semantic Segmentation using Keras](https://divamgupta.com/image-segmentation/2019/06/06/deep-learning-semantic-segmentation-keras.html)
2. [SEMANTIC SEGMENTATION ON MEDICAL IMAGES
](https://medium.com/@venkateshtata9/semantic-segmentation-on-medical-images-3ba8264cda5e)
3. [InterlAI/unet/2D](https://github.com/IntelAI/unet/tree/master/2D)