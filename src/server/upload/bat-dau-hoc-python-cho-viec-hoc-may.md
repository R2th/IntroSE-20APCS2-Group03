# **Bắt Đầu Học Python Cho Việc Học Máy**
Có một số người đã từng nói rằng đối với việc học một ngồn ngữ lập trình bạn chỉ cần 2 tuần thôi, bạn sẽ học được rất nhanh sau khi bạn đã từng biết rõ ràng một ngồn ngữ nào đó trước đây rồi. Đối với Học Máy cùng vậy, bạn không bao giờ biết về Python trước đó hay không ? không phải là điều quan trọng. Nhưng bạn có thể code được và hiểu được basic của học máy chỉ vòng vài ngày thôi. Đây không phải là một điều bất ngỡ bởi vì nhiều người coder đã từng vượt qua việc đây rồi. Trong bài viết này, chúng ta sẽ giờ thiểu các bạn một cách học nhanh nhất để bạn hiểu biết và nằm được những phần cơ bản của việc học máy với python.

Trong bài viết này chúng ta sẽ đi qua từng bước một từ phần cài đặt và phần cài đặt môi trường như sau:

- Phần cài đặt [Anaconda](https://www.anaconda.com/) 
- Phần cát đặt môi trường cho Anacoda và cách dùng một số thư viện như [tensorflow](https://www.tensorflow.org/), **keras**, **pandas**, **scikit-learn** và **matplotlib**.

# Anacoda
## Việc cài đặt Anacoda
Trong việc cài đặt Anacoda ở đây, chúng ta sẽ lựa chọn việc cài đặt trong môi trường Window và dùng Python 3.7. Chúng ta phải vào site này để tài file cài đặt [ https://www.anaconda.com/distribution/ ]( https://www.anaconda.com/distribution/ ) 
bạn sẽ thấy version file của Anacoda giống ảnh dưới này:

![](https://images.viblo.asia/617b0a63-e37e-47dd-abec-7c7b4932b988.png)

bạn phải click vào download bản version 3.7 môi trường window và lưu vào thư mục trong disk của bạn

![](https://images.viblo.asia/f7f86ea3-f9bb-4f49-8d6d-33ea8362e971.png)

Lúc bạn cài đặt. bạn sẽ bước qua những bước như ảnh dưới này:

![](https://images.viblo.asia/8213ec9d-1094-4016-8515-30f79d4fb08f.png)

![](https://images.viblo.asia/0922109d-742d-4843-8a1b-154b75a61fe8.png)

![](https://images.viblo.asia/1e24dd1a-319d-4e22-b08d-e16789c34a01.png)

![](https://images.viblo.asia/0c9895fc-7139-47e2-8f33-e58f075a0b71.png)

![](https://images.viblo.asia/c23dd8fe-ae4c-4b77-b33b-efe64e0ea912.png)

![](https://images.viblo.asia/b30b8ec2-bd4a-41ed-a692-77359c3e7076.png)

![](https://images.viblo.asia/ca6f63d6-3da6-4e33-a23d-b60bcecc5437.png)

Sau khi cài đặt xong, bạn có thể tìm thấy **Anacoda3** trong thư mục software của bạn:

![](https://images.viblo.asia/5e5405f9-869d-4e20-b8c7-c51c7494a06f.png)

Bắt đầu chạy trường trình Anacoda lần đầu bạn sẽ thấy mặt trước của application như thế này

![](https://images.viblo.asia/0cd0af1d-c199-463b-9798-976be61b02af.png)

## Việc cài đặt môi trường và thêm thư việc
Nhiều lúc scratch code của học máy thật là khó giải thích và phức tạp, nhưng thư việc trong Anacoda sẽ giúp chúng ta về việc đó càng dễ ràng hơn. Như lời bắt đâu trong chúng ta sẽ thêm những thư việc sau đây vào:

- [Tensorflow](https://www.tensorflow.org/)
- [Keras](https://keras.io/)
- [Pandas](https://pandas.pydata.org/)
- [Scikit-learn](https://pandas.pydata.org/)
- [Matplotlib](https://matplotlib.org/)

Trước mặt về việc làm đó chúng ta phải cài đặt môi trường Python cho project của bạn. Đây là việc thật quan trọng cần phải làm và là cái được gọi là **good practice** (Once Project One Enviroment Python). Tuy nhiên có một số người nói rằng việc này khả phức tạp trong việc quan lý môi trường Python. Ok chúng ta sẽ bắt đầu vào trong **Anacoda** chọn vào **Enviroments**  bạn sẽ thấy 
![](https://images.viblo.asia/1d59e50c-78c9-45d7-a512-07e0ad551e84.png)

Ở đây bạn sẽ thấy có rất nhiều thư viện trong đây. Chúng ta sẽ bắt đầu với tạo môi trường của mình đặt tên là "machine-learning", (click vào **Create**) làm như vậy đó sẽ tốt cho việc của mình có thể thêm những thư viện nào vào project và có thể quản lý được version nào của thư viện chung ta đang dùng cho project.
![](https://images.viblo.asia/9c673e55-a8cb-4d46-a19a-67adf8716711.png)

Sau khi chung ta tạo được môi trường xong, chung ta có thể thêm thư viện vào môi trường và chúng ta có thể search những thư viện bằng tên, click vào chọn tài về và apply

![](https://images.viblo.asia/e3171ccf-8d13-4522-a2f0-b6a0b3cd383a.png)

sau khi click vào apply, chúng ta sẽ thấy có những package trong thư việc của mình vừa chọn sẽ tài về

![](https://images.viblo.asia/703364e5-dda2-4976-a1a3-cf9e0ea7ed37.png)

- **Pandas**:

![](https://images.viblo.asia/c2ec6837-e27a-4288-8a8f-3086c007cbf8.png)

- **Scikit-learn**:

![](https://images.viblo.asia/32aa0e4d-6bd3-4dd2-ad42-28dbf06ecb26.png)

- **Matplotlib**:

![](https://images.viblo.asia/ddd54981-8f19-49f2-a704-2934114e4ae8.png)

việc tài về này sẽ nhanh hoặc chậm phụ thuộc vào mạng internet của bạn nhé. :joy::joy::joy: Sau tài về xong các bạn có thể dùng được thư việc bầng cách
```
import tensorflow as tf
import keras
import pandas
import sklearn
import matplotlib
```

# Kết luận
Trong bài viết này chúng ta chỉ giờ thiệu qua về việc bắt đâu của python về học máy và cách lựa chọn tool đúng cho việc học máy của các bạn. Chúng ta sẽ chi tiết thêm về cách dùng riêng từng thư viện. Tuy nhiên nếu các bạn cảm thấy có vấn đề về việc cái đặt hoặc không hiểu về cách giải thích của chúng ta, có thể giúp chúng ta vài comment dưới này để bài viết của chúng ta sau này càng ngày càng tốt hơn.

# Tài Liệu tham khảo
- [Cách cài đặt Anaco trong Window](https://docs.anaconda.com/anaconda/install/windows/)