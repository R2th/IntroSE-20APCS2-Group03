Chào mừng các bạn đả quay lại với tutorial lần này. Trong bài hướng dẫn lần này, tôi sẽ giới thiệu một số thao tác đơn giản mà chúng ta có thể thực hiện trên các hình ảnh như làm mờ làm mịn bức ảnh sau khi được lọc màu .
# I. Giới thiệu.

Bây giờ chúng ta sẽ tìm hiểu cách để loại bỏ nhiễu từ các bộ lọc, như các ngưỡng đơn giản hoặc thậm chí là một bộ lọc màu cụ thể như trước đây:

![](https://images.viblo.asia/7db574d8-c691-448f-9ac1-16d50febf3b1.png)
# II. Các thao tác về hình ảnh.
Như bạn có thể thấy, chúng ta có rất nhiều chấm đen, nơi chúng ta muốn màu đỏ, và rất nhiều chấm màu khác nằm rải rác. Chúng ta có thể sử dụng các kỹ thuật làm mờ và làm mịn khác nhau để cố gắng khắc phục điều này một chút. 

Chúng ta có thể bắt đầu với một số mã quen thuộc:
## 1. Hướng dẫn.
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
```

Bây giờ, hãy áp dụng một thao tác đơn giản, nơi chúng ta thực hiện một loại trung bình cho mỗi khối pixel. Trong trường hợp của chúng ta, hãy làm một hình vuông 15 x 15, có nghĩa là chúng ta có tổng cộng 225 pixel.

```
    kernel = np.ones((15,15),np.float32)/225
    smoothed = cv2.filter2D(res,-1,kernel)
    cv2.imshow('Original',frame)
    cv2.imshow('Averaging',smoothed)

    k = cv2.waitKey(5) & 0xFF
    if k == 27:
        break

cv2.destroyAllWindows()
cap.release()
```

Kết quả:


![](https://images.viblo.asia/02435c81-8032-4fbd-bcd9-9179946aa034.png)


Điều này là đơn giản, nhưng kết quả lại mất đi rất nhiều chi tiết. Tiếp theo, hãy thử một số Gaussian Blurring:

```
blur = cv2.GaussianBlur(res,(15,15),0)
    cv2.imshow('Gaussian Blurring',blur)
```

Kết quả:

![](https://images.viblo.asia/b959ca1e-9dc6-49e1-ae9d-d2a000efd705.png)

Ngoài ra còn một tùy chọn khác được gọi là Median Blur:
```
median = cv2.medianBlur(res,15)
    cv2.imshow('Median Blur',median)
```

Kết quả:

![](https://images.viblo.asia/8c70eefb-308e-4fbf-a508-3cd6bc8525ea.png)

Cuối cùng, một tùy chọn khác là làm mờ song phương:

```
bilateral = cv2.bilateralFilter(res,15,75,75)
    cv2.imshow('bilateral Blur',bilateral)
```

Tất cả các blurs so sánh:

![](https://images.viblo.asia/e1421258-d675-40cb-a584-e1e466b1f90b.jpg)

## 2. Kết quả.

Ít nhất trong trường hợp này, tôi có thể sử dụng với Median Blur, nhưng các ánh sáng khác nhau, các ngưỡng / bộ lọc khác nhau và các mục tiêu và mục tiêu khác nhau có thể lựa chọn và hướng bạn nên sử dụng một trong những cách làm khác nhau. Trong hướng dẫn tiếp theo, chúng ta sẽ thảo luận về các biến đổi hình thái học.



# III. Tài liệu tham khảo.
http://docs.opencv.org/ https://techmaster.vn/ https://pythonprogramming.net/