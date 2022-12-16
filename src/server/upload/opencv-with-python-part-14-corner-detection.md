Chào mừng bạn đến với Corner Detection với hướng dẫn OpenCV và Python. Mục đích của việc phát hiện các góc là để theo dõi những thứ như chuyển động, làm mô hình 3D, và nhận ra các đối tượng, hình dạng và các ký tự.
# I. Giới thiệu.
Phát hiện góc là phương pháp được sử dụng trong các hệ thống thị giác máy tính để trích xuất một số loại tính năng nhất định và suy ra nội dung của hình ảnh. Phát hiện góc thường được sử dụng trong phát hiện chuyển động, đăng ký hình ảnh, theo dõi video, ghép hình ảnh, ghép ảnh toàn cảnh, mô hình 3D và nhận dạng đối tượng. Phát hiện góc trùng lặp với chủ đề phát hiện điểm quan tâm.

Một góc có thể được định nghĩa là giao điểm của hai cạnh. Một góc cũng có thể được định nghĩa là một điểm mà trong đó có hai hướng cạnh nhau và chi phối khác nhau trong một khu vực lân cận của điểm.

Điểm quan tâm là một điểm trong hình ảnh có vị trí được xác định rõ và có thể được phát hiện mạnh mẽ. Điều này có nghĩa là một điểm quan tâm có thể là một góc nhưng nó cũng có thể là một điểm cô lập của cường độ cục bộ tối đa hoặc tối thiểu, kết thúc dòng hoặc một điểm trên đường cong có độ cong cực đại cục bộ.
# II. Corner Detection
Đối với hướng dẫn này, chúng ta sẽ sử dụng hình ảnh sau:
## 1. Ví dụ.
![](https://images.viblo.asia/3e495400-5338-4c4f-b066-fa2ae3136e4d.jpg)

Mục tiêu của chúng ta ở đây là tìm tất cả các góc trong hình ảnh này. Tôi sẽ lưu ý rằng chúng ta có một số vấn đề bí ẩn ở đây (răng cưa trong các đường nghiêng), vì vậy, nếu chúng ta để nó, rất nhiều góc sẽ được tìm thấy, và đúng như vậy. Như thường lệ với OpenCV, phần khó khăn đã được thực hiện cho chúng ta, và tất cả những gì chúng ta cần làm là nạp vào một số tham số. Hãy bắt đầu với tải hình ảnh và thiết lập một số thông số:
## 2. Hướng dẫn.

```python
import numpy as np
import cv2

img = cv2.imread('opencv-corner-detection-sample.jpg')
gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
gray = np.float32(gray)

corners = cv2.goodFeaturesToTrack(gray, 100, 0.01, 10)
corners = np.int0(corners)
```
Cho đến nay, chúng ta đang tải hình ảnh, chuyển đổi sang màu xám, sau đó là float32.

Tiếp theo, chúng ta phát hiện các góc với hàm goodFeaturesToTrack. Các tham số ở đây là hình ảnh, góc tối đa để phát hiện, chất lượng và khoảng cách tối thiểu giữa các góc. Như đã đề cập trước đây, các vấn đề bí ẩn mà chúng tôi có ở đây sẽ cho phép nhiều góc được tìm thấy, vì vậy chúng tôi đặt giới hạn cho nó. 

Kế tiếp:

```python
for corner in corners:
    x,y = corner.ravel()
    cv2.circle(img,(x,y),3,255,-1)

cv2.imshow('Corner',img)
```

Bây giờ chúng ta lặp qua từng góc, tạo ra một vòng tròn tại mỗi điểm mà chúng ta nghĩ là một góc.

## 3. Kết quả.

![](https://images.viblo.asia/0c2de015-33f9-4dea-a7bf-444c86fc211b.png)

Trong hướng dẫn tiếp theo, chúng ta sẽ thảo luận về tính năng matching/homography.
# III. Tài liệu tham khảo.
http://docs.opencv.org/
https://techmaster.vn/
https://pythonprogramming.net/

Chờ bài viết tiếp theo nhé.