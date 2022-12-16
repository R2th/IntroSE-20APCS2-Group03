# I. Giới thiệu.
Chào mừng bạn đến với OpenCV với ngôn ngữ Python. Trong hướng dẫn này, chúng ta sẽ sử dụng bao gồm các gradient hình ảnh và phát hiện cạnh.
# II. Các thao tác về hình ảnh.
## 1. Hướng dẫn.

  Hình ảnh gradient có thể được sử dụng để đo cường độ định hướng, và phát hiện cạnh là chính xác những gì nó có như là tìm kiếm các cạnh! .  
  Trước tiên, hãy hiển thị một số ví dụ về gradient:
   - Mục tiêu :
       + Trong chương này, chúng ta sẽ tìm hiểu về Khái niệm về phát hiện cạnh Canny 
       + Các hàm OpenCV cho điều đó: cv.Canny ()
    - Học thuyết và thứ tự để giải quyết bài toán.
        + Nó là một thuật toán nhiều giai đoạn và chúng tôi sẽ đi qua từng giai đoạn.
        + Giảm nhiểu 
        + Vì phát hiện cạnh dễ bị nhiễu trong ảnh, bước đầu tiên là loại bỏ nhiễu trong ảnh bằng bộ lọc Gaussian 5x5
        + Tìm Gradient cường độ của hình ảnh
        + Ảnh được làm mịn sau đó được lọc bằng hạt nhân Sobel theo cả hướng ngang và dọc để lấy đạo hàm đầu tiên theo hướng nằm ngang (Gx) và hướng thẳng đứng (Gy). Từ hai hình ảnh này, chúng ta có thể tìm gradient và hướng cạnh cho mỗi pixel như sau:
        + ![](https://images.viblo.asia/f0c27eee-6842-4a9a-a15f-8375f8fd6ea5.png)
        + >     Canny Edge Detection là một thuật toán phát hiện cạnh phổ biến. Nó được phát triển bởi John F. Canny
        + Tìm Gradient cường độ của hình ảnh
        + Không loại bỏ tối đa 
 ![](https://images.viblo.asia/ba548031-3682-4845-8da1-8b80ff82ac3a.jpg)
Sau khi nhận được độ lớn và hướng gradient, việc quét toàn bộ hình ảnh được thực hiện để xóa bất kỳ pixel không mong muốn nào có thể không tạo thành cạnh. Đối với điều này, tại mỗi điểm ảnh, pixel được kiểm tra nếu nó là một cực đại cục bộ trong vùng lân cận theo hướng gradient. Kiểm tra hình ảnh dưới đây:

 - Hysteresis Thresholding

Giai đoạn này quyết định đó là tất cả các cạnh thực sự là cạnh và cạnh không phải là cạnh. Đối với điều này, chúng ta cần hai giá trị ngưỡng, minVal và maxVal. Bất kỳ cạnh nào có gradient cường độ lớn hơn maxVal đều chắc chắn là các cạnh và các cạnh dưới minVal chắc chắn là không có cạnh, do đó bị loại bỏ. Những người nằm giữa hai ngưỡng này được phân loại các cạnh hoặc các cạnh không dựa trên kết nối của chúng. Nếu chúng được kết nối với các pixel "chắc chắn", chúng được coi là một phần của các cạnh. Nếu không, chúng cũng bị loại bỏ. Xem hình ảnh bên dưới:

![](https://images.viblo.asia/791919bd-8db6-4bf0-acd7-042570803681.jpg)

Cạnh A nằm trên giá trị maxVal, do đó được coi là "chắc chắn". Mặc dù cạnh C là dưới maxVal, nó được kết nối với cạnh A, do đó cũng được coi là cạnh hợp lệ và chúng ta có được đường cong đầy đủ đó. Nhưng cạnh B, mặc dù nó ở trên minVal và nằm trong cùng một vùng với cạnh của C, nó không được kết nối với bất kỳ "cạnh chắc chắn" nào, do đó nó bị loại bỏ. Vì vậy, điều rất quan trọng là chúng ta phải chọn minVal và maxVal cho phù hợp để có được kết quả chính xác. 
![](https://images.viblo.asia/a9d69844-f103-41b4-b936-a46a56416eaf.jpg)
Giai đoạn này cũng loại bỏ các điểm ảnh nhỏ trên giả định rằng các cạnh là các đường dài.
```python
import cv2
import numpy as np

cap = cv2.VideoCapture(1)

while(1):

    # Take each frame
    _, frame = cap.read()
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    
    lower_red = np.array([30,150,50])
    upper_red = np.array([255,255,180])
    
    mask = cv2.inRange(hsv, lower_red, upper_red)
    res = cv2.bitwise_and(frame,frame, mask= mask)

    laplacian = cv2.Laplacian(frame,cv2.CV_64F)
    sobelx = cv2.Sobel(frame,cv2.CV_64F,1,0,ksize=5)
    sobely = cv2.Sobel(frame,cv2.CV_64F,0,1,ksize=5)

    cv2.imshow('Original',frame)
    cv2.imshow('Mask',mask)
    cv2.imshow('laplacian',laplacian)
    cv2.imshow('sobelx',sobelx)
    cv2.imshow('sobely',sobely)

    k = cv2.waitKey(5) & 0xFF
    if k == 27:
        break

cv2.destroyAllWindows()
cap.release()
```

Kết quả : 
![](https://images.viblo.asia/aff152a2-6f99-4ce0-9c72-e984b5a540d8.jpeg)

Nếu bạn đang tự hỏi những gì cv2.CV_64F là gì ?, đó là kiểu dữ liệu. ksize là kích thước hạt nhân. Chúng tôi sử dụng 5, vì vậy vùng 5x5 được tham vấn.

Trong khi chúng ta có thể sử dụng các gradient này để chuyển đổi sang các cạnh thuần túy, chúng ta cũng có thể sử dụng phát hiện Canny Edge!

```python
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

    cv2.imshow('Original',frame)
    edges = cv2.Canny(frame,100,200)
    cv2.imshow('Edges',edges)

    k = cv2.waitKey(5) & 0xFF
    if k == 27:
        break

cv2.destroyAllWindows()
cap.release()
```

Kết quả : 

![](https://images.viblo.asia/dae98f39-9037-4ed8-bdca-9ada4adfe816.png)

## 2. Kết luận.
Khá bổ ích đungs không. Đây là một trong các bước để bắt đầu cho một ứng dụng phát hiện hình ảnh cho tương lai sau này . Trong hướng dẫn OpenCV tiếp theo, chúng ta sẽ nói về cách chúng ta có thể tìm kiếm và tìm các mẫu hình ảnh giống hệt nhau trong các hình ảnh khác.

# III. Tài liệu tham khảo.
http://docs.opencv.org/ https://techmaster.vn/ https://pythonprogramming.net/