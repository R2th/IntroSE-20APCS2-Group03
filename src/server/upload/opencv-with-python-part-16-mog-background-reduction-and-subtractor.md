Trong hướng dẫn OpenCV với Python này,  Chúng ta sẽ làm quen với các phương pháp giảm nền và trừ nền có sẵn trong OpenCV nhé.
# I. Giới thiệu.
* Chúng tôi sẽ giới thiệu cách giảm nền của hình ảnh, bằng cách phát hiện chuyển động.  . Bạn có thể sử dụng webcam của mình nếu bạn thích hoặc sử dụng video của mình.
* Phép trừ nền là bước tiền xử lý chính trong nhiều ứng dụng dựa trên tầm nhìn. Ví dụ, hãy xem xét trường hợp của một quầy khách truy cập trong đó một camera tĩnh lấy số lượng khách vào hoặc ra khỏi phòng, hoặc một camera giao thông trích xuất thông tin về các phương tiện, v.v. một mình. Về mặt kỹ thuật, bạn cần trích xuất nền trước di chuyển từ nền tĩnh.

* Nếu bạn có một hình ảnh nền đơn độc, như hình ảnh của căn phòng không có khách ghé thăm, hình ảnh của con đường không có xe cộ, thì đó là một công việc dễ dàng. Chỉ cần trừ hình ảnh mới từ nền. Bạn có được các đối tượng tiền cảnh một mình. Nhưng trong hầu hết các trường hợp, bạn có thể không có hình ảnh như vậy, vì vậy chúng tôi cần trích xuất nền từ bất kỳ hình ảnh nào chúng tôi có. 
* Nó trở nên phức tạp hơn khi có bóng của các phương tiện. Vì bóng cũng di chuyển, phép trừ đơn giản sẽ đánh dấu đó cũng là tiền cảnh. Nó làm phức tạp mọi thứ.

# II. MOG Background Reduction

## 1. Hướng dẫn.

Mã ở đây thực sự khá đơn giản với những gì chúng ta biết cho đến thời điểm này:

```
import numpy as np
import cv2

cap = cv2.VideoCapture('framgia-video-16p.mp4')
fgbg = cv2.createBackgroundSubtractorMOG2()

while(1):
    ret, frame = cap.read()

    fgmask = fgbg.apply(frame)
 
    cv2.imshow('fgmask',frame)
    cv2.imshow('frame',fgmask)

    
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break
    

cap.release()
cv2.destroyAllWindows()

```


## 2. Kết quả.
![](https://images.viblo.asia/846745be-6f5b-4a04-8a63-df05a958730c.gif)






# III. MOG Background Subtraction
## 1. Hướng dẫn.
* **BackgroundSubtractorMOG**

Nó là một thuật toán phân đoạn nền / tiền cảnh dựa trên hỗn hợp Gaussian. Nó được giới thiệu trong bài báo "An improved adaptive background mixture model for real-time tracking with shadow detection" của P. KadewTraKuPong và R. Bowden vào năm 2001. Nó sử dụng một phương pháp để mô hình hóa từng pixel nền bằng hỗn hợp phân phối K Gaussian ( K = 3 đến 5). Trọng lượng của hỗn hợp đại diện cho tỷ lệ thời gian mà những màu đó ở lại trong cảnh. Các màu nền có thể xảy ra là những màu tồn tại lâu hơn và tĩnh hơn.

Trong khi mã hóa, chúng ta cần tạo một đối tượng nền bằng cách sử dụng hàm, cv.createBackgroundSubtractorMOG (). Nó có một số tham số tùy chọn như chiều dài của lịch sử, số hỗn hợp gaussian, ngưỡng, v.v ... Tất cả được đặt thành một số giá trị mặc định. Sau đó, bên trong vòng lặp video, sử dụng phương thức Backgroundubtractor.apply () để lấy mặt nạ nền trước.

Xem một ví dụ đơn giản dưới đây:

```
import numpy as np
import cv2 as cv
cap = cv.VideoCapture('framgia-video-16p.mp4')
fgbg = cv.bgsegm.createBackgroundSubtractorMOG()
while(1):
    ret, frame = cap.read()
    fgmask = fgbg.apply(frame)
    cv.imshow('frame',fgmask)
    k = cv.waitKey(30) & 0xff
    if k == 27:
        break
cap.release()
cv.destroyAllWindows()
```

(Tất cả các kết quả được hiển thị ở cuối để so sánh).

* **BackgroundSubtractorMOG2**

Nó cũng là một thuật toán phân đoạn nền / tiền cảnh dựa trên hỗn hợp Gaussian. Nó dựa trên hai bài báo của Z.Zivkovic, "Improved adaptive Gaussian mixture model for background subtraction" năm 2004 và "Ước tính mật độ thích ứng hiệu quả trên mỗi pixel ảnh cho nhiệm vụ của phép trừ nền" vào năm 2006. Một đặc điểm quan trọng của thuật toán này là nó chọn số lượng phân phối gaussian thích hợp cho mỗi pixel. (Hãy nhớ rằng, trong trường hợp cuối cùng, chúng tôi đã lấy một phân phối K gaussian trong suốt thuật toán). Nó cung cấp khả năng thích ứng tốt hơn với các cảnh khác nhau do thay đổi chiếu sáng, v.v.

Như trong trường hợp trước, chúng ta phải tạo một đối tượng trừ nền. Tại đây, bạn có tùy chọn phát hiện bóng hay không. Nếu DetShadows = True (theo mặc định), nó sẽ phát hiện và đánh dấu bóng, nhưng làm giảm tốc độ. Bóng sẽ được đánh dấu màu xám.

```
import numpy as np
import cv2 as cv
cap = cv.VideoCapture('framgia-video-16p.mp4')
fgbg = cv.createBackgroundSubtractorMOG2()
while(1):
    ret, frame = cap.read()
    fgmask = fgbg.apply(frame)
    cv.imshow('frame',fgmask)
    k = cv.waitKey(30) & 0xff
    if k == 27:
        break
cap.release()
cv.destroyAllWindows()
```


## 3. Kết quả.
* **BackgroundSubtractorMOG**
![](https://images.viblo.asia/020d5e84-83f3-4c64-a53e-481b0778051d.png)

* **BackgroundSubtractorMOG2**
![](https://images.viblo.asia/c093cfd4-fba1-4f35-a2a2-9d64313e441d.png)
# IV. Tổng Kết .

Ý tưởng ở đây là trích xuất forground di chuyển từ nền tĩnh. Bạn cũng có thể sử dụng điều này để so sánh hai hình ảnh tương tự và trích xuất ngay sự khác biệt giữa chúng.

Trong trường hợp của chúng tôi, chúng tôi có thể thấy chúng tôi chắc chắn đã phát hiện ra một số người, nhưng chúng tôi có một số "Tạp ảnh" Tạp ảnh thực sự là sự di chuyển của cammera ,hay sưj lay động của các vật xung quanh. Giá như chúng ta biết cách giảm bớt tạp ảnh. Đợi đã! chúng tôi làm Một thử thách hoang dã đã xuất hiện cho bạn + = 1 folks!

Hướng dẫn tiếp theo bắt đầu giúp chúng ta tránh khỏi việc áp dụng các bộ lọc hoặc biến đổi và giúp chúng ta phát hiện các đối tượng chung bằng cách sử dụng Haar Cascades cho những thứ như phát hiện khuôn mặt và hơn thế nữa.
# V. Tài liệu tham khảo.
http://docs.opencv.org/

https://techmaster.vn/

https://pythonprogramming.net/

Chờ bài viết tiếp theo nhé.