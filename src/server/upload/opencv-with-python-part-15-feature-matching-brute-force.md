Chào mừng bạn đến với hướng dẫn Feature Matching Brute Force với OpenCV và Python. Feature Matching sẽ là một phiên bản khớp mẫu ấn tượng hơn một chút, trong đó bắt buộc phải có một kết hợp hoàn hảo hoặc rất gần với hoàn hảo.

# I. Giới thiệu.
Chúng tôi bắt đầu với hình ảnh mà chúng tôi hy vọng tìm thấy, và sau đó chúng tôi có thể tìm kiếm hình ảnh này trong một hình ảnh khác. Điều thú vị ở đây là hình ảnh không cần phải giống nhau về ánh sáng, góc, xoay ... vv. Các tính năng chỉ cần phù hợp với mẩu.

Để bắt đầu, chúng tôi cần một số hình ảnh mẫu. "Mẫu" hoặc hình ảnh của chúng tôi sẽ cố gắng khớp:
![](https://images.viblo.asia/d53c82c0-6137-484a-abc8-32332bb7d7ff.jpg)
# II. Brute Force 
Sau đó, hình ảnh của chúng tôi để tìm kiếm mẫu này trong:
![](https://images.viblo.asia/afb5422e-53d3-451f-adeb-9014149cf551.jpg)

Ở đây, hình ảnh mẫu của chúng tôi nhỏ hơn một chút trong mẫu so với hình ảnh chúng tôi sẽ tìm kiếm. Nó cũng là một vòng quay khác nhau, và có một số bóng khác nhau.


## 1. Ví dụ.

Bây giờ chúng ta sẽ sử dụng một hình thức kết hợp "Brute Force ". Chúng tôi sẽ tìm thấy tất cả các tính năng trong cả hai hình ảnh. Sau đó, chúng tôi sẽ tìm ra những điểm phù hợp với các tính năng này. Chúng tôi có thể rút ra nhiều thứ giống nhau như chúng tôi muốn. Mặc dù cẩn thận. Nếu bạn vẽ cangf nhiều, bạn sẽ có rất nhiều kết quả dương tính giả. Vẽ vài cái đầu tiên thôi.

## 2. Hướng dẫn.

```python
import numpy as np
import cv2
import matplotlib.pyplot as plt

img1 = cv2.imread('opencv-feature-matching-template.jpg',0)
img2 = cv2.imread('opencv-feature-matching-image.jpg',0)
```

Cho đến nay chúng tôi đã nhập các mô-đun chúng tôi sẽ sử dụng và xác định hai hình ảnh của chúng tôi, mẫu (img1) và hình ảnh chúng tôi sẽ tìm kiếm mẫu trong (img2).

```python
orb = cv2.ORB_create()
```
Đây là máy dò chúng tôi sẽ sử dụng cho các tính năng.

```python
kp1, des1 = orb.detectAndCompute(img1,None)
kp2, des2 = orb.detectAndCompute(img2,None)
```

Ở đây, chúng tôi tìm thấy các điểm chính và mô tả của chúng với máy dò quả cầu.

```scala
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
```

Đây là đối tượng BFMatcher của chúng tôi.

```python
matches = bf.match(des1,des2)
matches = sorted(matches, key = lambda x:x.distance)
```
Ở đây chúng tôi tạo ra các trận đấu của các mô tả, sau đó chúng tôi sắp xếp chúng dựa trên khoảng cách của chúng.

```python
img3 = cv2.drawMatches(img1,kp1,img2,kp2,matches[:10],None, flags=2)
plt.imshow(img3)
plt.show()
```

Ở đây, chúng tôi đã rút ra 10 trận đấu đầu tiên. Đầu ra:


## 3. Kết quả.
![](https://images.viblo.asia/d2d0887f-7fae-43ec-972f-1106479f1139.png)
# III. Tài liệu tham khảo.
http://docs.opencv.org/
https://techmaster.vn/
https://pythonprogramming.net/

Chờ bài viết tiếp theo nhé.