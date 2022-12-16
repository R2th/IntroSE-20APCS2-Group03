Trong bài hướng dẩn này với Python và OpenCV, chúng ta sẽ tìm hiểu về vấn đề các biến đổi hình thái học.
# I. Giới thiệu.
Đây là một số thao tác đơn giản mà chúng ta có thể thực hiện dựa trên hình dạng của hình ảnh. 
# II. Các thao tác về hình ảnh.
## 1. Hướng dẫn.
Những xu hướng hiện nay để xử lý một bức ảnh là cách đi theo từng cặp song hành. Cặp đầu tiên chúng ta sẽ nói về là xói mòn và giãn nở.

Xói mòn là nơi chúng ta sẽ "xói mòn" các cạnh, làm mờ các viền và góc cạnh. Cách làm việc này là chúng ta làm việc với một thanh trượt (hạt nhân). Chúng ta cung cấp cho kích thước thanh trượt, giả sử 5 x 5 pixel. Điều gì xảy ra là chúng ta trượt thanh trượt này xung quanh, và nếu tất cả các điểm ảnh có màu trắng thì chúng ta sẽ lấy màu trắng, nếu không thì lấy màu đen làm màu chủ đạo. 

Điều này có thể giúp loại bỏ một số điểm ảnh hổn tạp ròi rạc màu trắng . Các phiên bản khác của điều này là Dilation, mà về cơ bản làm ngược lại: Slides xung quanh, nếu toàn bộ khu vực không phải là màu đen, sau đó nó được chuyển sang màu trắng. Đây là một ví dụ:

```
import cv2
import numpy as np

cap = cv2.VideoCapture(0)

while(1):

    _, frame = cap.read()
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    lower_red = np.array([30,150,50])
    upper_red = np.array([255,255,180])
    
    mask = cv2.inRange(hsv, lower_red, upper_red)
    res = cv2.bitwise_and(frame,frame, mask= mask)

    kernel = np.ones((5,5),np.uint8)
    erosion = cv2.erode(mask,kernel,iterations = 1)
    dilation = cv2.dilate(mask,kernel,iterations = 1)

    cv2.imshow('Original',frame)
    cv2.imshow('Mask',mask)
    cv2.imshow('Erosion',erosion)
    cv2.imshow('Dilation',dilation)

    k = cv2.waitKey(5) & 0xFF
    if k == 27:
        break

cv2.destroyAllWindows()
cap.release()
```

Kết quả:

![](https://images.viblo.asia/9bd8c96e-54eb-4226-8dea-329d211f9200.png)

Cặp tiếp theo là "mở" và "đóng". Mục tiêu với việc mở đầu là xóa "các mặt sai nổi trội" để hiển thị. Đôi khi, ở nền của bức ảnh bạn nhận được một số điểm ảnh ở nhiều chổ khác nhau và có nhiều hône tạp . Ý tưởng "đóng" là loại bỏ các hình ảnh sai. 
Về cơ bản đây là nơi bạn đưa ra một hình ảnh có hình dạng phát hiện của bạn, giống như mũ của chúng tôi, nhưng bạn vẫn có một số điểm ảnh màu đen trong đối tượng. Phương pháp "Đóng" sẽ cố gắng để xóa nó đi.

```
cap = cv2.VideoCapture(1)

while(1):

    _, frame = cap.read()
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    lower_red = np.array([30,150,50])
    upper_red = np.array([255,255,180])
    
    mask = cv2.inRange(hsv, lower_red, upper_red)
    res = cv2.bitwise_and(frame,frame, mask= mask)

    kernel = np.ones((5,5),np.uint8)
    
    opening = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
    closing = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

    cv2.imshow('Original',frame)
    cv2.imshow('Mask',mask)
    cv2.imshow('Opening',opening)
    cv2.imshow('Closing',closing)

    k = cv2.waitKey(5) & 0xFF
    if k == 27:
        break

cv2.destroyAllWindows()
cap.release()
```

Kết quả ở đây:


![](https://images.viblo.asia/88cf7b31-0b9f-48ed-8a63-5c0639265253.png)

## 2. Kết luận.

Hai tùy chọn khác không thực sự hữu ích cho trường hợp của chúng tôi ở đây là "tophat" và "blackhat:"

```
# Đó là sự khác biệt giữa hình ảnh đầu vào và "mở" hình ảnh
    cv2.imshow('Tophat',tophat)

    # Đó là sự khác biệt giữa việc "đóng" hình ảnh đầu vào và hình ảnh đầu vào.
    cv2.imshow('Blackhat',blackhat)
```


Trong hướng dẫn tiếp theo, chúng ta sẽ thảo luận về gradient hình ảnh và phát hiện cạnh. 


# III. Tài liệu tham khảo.
http://docs.opencv.org/ https://techmaster.vn/ https://pythonprogramming.net/