# 1. Giới thiệu về giải thuật trừ nền (Background Subtraction)
Background subtraction hay còn gọi là trừ nền là một trong những giải thuật đơn giản và phổ biến trong lĩnh vực Thị giác máy tính (Computer Vision). Thuật toán được sử dụng nhằm xác định đối tượng chuyển động trong camera nền tĩnh. <br>

Dưới đây tôi sẽ đề cập đến một số phương pháp trừ nền cơ bản.
## 1.1 Frame Difference
Đây là phương pháp đơn giản nhất của giải thuật trừ nền. Ta sẽ tính hiệu giá trị pixel của khung hình hiện tại và khung hình trước đó nếu hiệu này lớn hơn ngưỡng **T** thì pixel tại vị trí đó thuộc về Foreground.<br>

![](https://images.viblo.asia/8ed9ec5a-aab6-4c09-a922-c21854da470e.png)


**Ưu điểm** của phương pháp này là tốc độ tính toán nhanh do việc khởi tạo background image chỉ đơn giản là việc lấy khung hình trước đó. <br>

**Nhược điểm** của phương pháp này là nó chỉ tốt với những đối tượng di chuyển liên tục nhưng khi có một đối tượng đứng yên trong khung hình quá lâu thì đối tượng này sẽ bị cho là background cùng với đó phương pháp này phụ thuộc rất nhiều vào ngưỡng **T** do đó với mỗi video ta đều phải chọn 1 ngưỡng phù hợp.

## 1.2 Mean Filter
Thay vì chỉ sử dụng 1 khung hình trước đó để làm background image thì Mean Filter sử dụng **N** khung hình phía trước khung hình đang xét để khởi tạo background image.
Giả sử khung hình đang xét tại thời điểm **t** thì background tương ứng với nó sẽ được tính như sau: <br>
<div align="center">
    
$\mathbf{B}(x, y, t) = \frac{1}{N}\sum_{i=1}^{N}\mathbf{I}(x, y, t)$ 
 

</div>

Trong đó  **B** là background image tại thời điểm **t**, **N** là số khung hình trước thời điểm **t** để dùng cho việc tính toán ra background image, **I**(x, y, t) là khung hình tại thời điểm **t**. <br>

Sau khi khởi tạo background image thì phần còn lại của phương pháp này cũng giống với phương pháp frame difference.



-----
Trên đây là 2 phương pháp đơn giản nhất của trừ nền. Ngoài ra còn các phương pháp khác như Mixture of Gaussian (MOG, MOG2) ... Các bạn cũng có thể tìm hiểu thêm về những phương pháp này. 


# 2. Thực hành với thư viện OpenCV
### Bước 1: Khai báo các thư viện cần thiết 
Tôi chỉ sử dụng 2 thư viện đó là OpenCV và Numpy 
```python
import cv2
import numpy as np
```
### Bước 2: Khởi tạo Background Subtractor 
OpenCV cung cấp khá nhiều các phương pháp trừ nền, tuy nhiên ở bài viết này tôi sẽ sử dụng phương pháp MOG2.
```python
backSub = cv2.createBackgroundSubtractorMOG2()
```
### Bước 3: Khởi tạo VideoCapture và duyệt qua từng frame
```python
capture = cv2.VideoCapture('test.mp4')

while True:
    _, frame = capture.read()
    if not _:
        break
```

### Bước 4: Xử lý từng frame với Background Subtractor đã khai báo ở bước 2.
Sử dụng Background subtractor với từng frame để thu được Foreground Mask và chuyển Foreground Mask về grayscale.
```python
fgMask = backSub.apply(frame)
fgMask = cv2.cvtColor(fgMask, 0)
```
Tuy nhiên khi thu được Foreground Mask thì tôi nhận thấy có rất nhiều các nhiễu như hình dưới đây.
![](https://images.viblo.asia/8cafb170-14cd-4a04-b007-4b913231126f.gif)

Chính vì thế tôi đã sử dụng thêm **erode** và **dilate** cùng với bộ lọc **Gausian blur** nhằm loại bỏ bớt nhiễu. Chi tiết về cách thức hoạt động của [erode , dilate](https://docs.opencv.org/3.4/db/df6/tutorial_erosion_dilatation.html) và  [Gausian blur](https://docs.opencv.org/master/d4/d13/tutorial_py_filtering.html) các bạn có thể đọc trên trang chủ của OpenCV.
```python
kernel = np.ones((5,5), np.uint8)
fgMask = cv2.erode(fgMask, kernel, iterations=1) 
fgMask = cv2.dilate(fgMask, kernel, iterations=1)
fgMask = cv2.GaussianBlur(fgMask, (3,3), 0)
fgMask = cv2.morphologyEx(fgMask, cv2.MORPH_CLOSE, kernel)
_,fgMask = cv2.threshold(fgMask,130,255,cv2.THRESH_BINARY)
```
Sau đó đưa Foreground mask về ảnh nhị phân và thu được kết quả như hình dưới đây. <br>

<div align="center">
    
</div>    

![](https://images.viblo.asia/d5fc5455-e2e8-4195-882d-3fb71b2245f6.gif)


Sau khi đã thu được ảnh nhị phân như hình trên, các bạn cũng có thể thấy rõ được vùng pixel của đối tượng. Để vẽ ra được bounding box của đối tượng tôi tiếp tục thực hiện như sau:<br>
*  Sử dụng **Canny** để phát hiện cạnh.
*  Tiếp sau đó sử dụng hàm **findContours** để tìm tập hợp các điểm đường viền.
*  Cuối cùng là duyệt lần lượt qua các contours tìm được ở bước trên và sử dụng hàm **boundingRect** để tìm ra được bounding box và tiến hành vẽ lên trên frame để quan sát.
```python
fgMask = cv2.Canny(fgMask,20,200)
contours,_ = cv2.findContours(fgMask,cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

for i in range(len(contours)):
    (x, y, w, h) = cv2.boundingRect(contours[i])
    area = cv2.contourArea(contours[i])
    if area > 300:
        cv2.drawContours(fgMask, contours[i], 0, (0, 0, 255), 6)
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
```
Có 1 lưu ý ở đây là chỗ duyệt qua các contour và tìm ra các bounding box tôi có sử dụng một ngưỡng về diện tích box nhằm loại bỏ các bounding box quá nhỏ của các nhiễu tạo nên. <br>

Dưới đây là toàn bộ phần code tổng hợp các bước ở trên, video test các bạn có thể lấy ở [đây](https://drive.google.com/file/d/1EdVniPQIIqSCLd825CsnKB9KcaFQLzPx/view?usp=sharing) :
```python
import cv2
import numpy as np


backSub = cv2.createBackgroundSubtractorMOG2()

capture = cv2.VideoCapture('test.mp4')

while True:
    _, frame = capture.read()
    if not _:
        break
    
    fgMask = backSub.apply(frame)
    fgMask = cv2.cvtColor(fgMask, 0)

    kernel = np.ones((5,5), np.uint8)
    fgMask = cv2.erode(fgMask, kernel, iterations=1) 
    fgMask = cv2.dilate(fgMask, kernel, iterations=1)
    fgMask = cv2.GaussianBlur(fgMask, (3,3), 0)
    fgMask = cv2.morphologyEx(fgMask, cv2.MORPH_CLOSE, kernel)
    _,fgMask = cv2.threshold(fgMask,130,255,cv2.THRESH_BINARY)

    fgMask = cv2.Canny(fgMask,20,200)
    contours,_ = cv2.findContours(fgMask,cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    
    for i in range(len(contours)):
        (x, y, w, h) = cv2.boundingRect(contours[i])
        area = cv2.contourArea(contours[i])
        if area > 300:
            cv2.drawContours(fgMask, contours[i], 0, (0, 0, 255), 6)
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

    cv.imshow('Frame', frame)
    
    keyboard = cv2.waitKey(30)
    if keyboard == 'q' or keyboard == 27:
        break
```
Và đây là kết quả khi chạy trên toàn bộ video.
{@embed: https://www.youtube.com/watch?v=mSxh6IjPqGc}
# 3. Kết luận
Qua phần nội dung vừa rồi tôi đã nêu sơ qua khái niệm và một số phương pháp trừ nền và cùng các bạn thực hành với thư viện OpenCV. Như đã nói ở trên và cũng như nhìn vào kết quả thực hành ta thấy được sử dụng giải thuật trừ nền để phát hiện đối tượng  chỉ hiệu quả với video thu từ camera nền tĩnh và sẽ không hiệu quả trong các trường hợp ánh sáng thay đổi liên tục, các đối tượng che lấp lên nhau, nền video không cố định...

Cảm ơn các bạn đã dành thời gian để đọc bài viết của tôi !

# Tham khảo
* [OpenCV Background Subtraction](https://docs.opencv.org/3.4/d1/dc5/tutorial_background_subtraction.html)
* [OpenCV Erode and Dilate](https://docs.opencv.org/3.4/db/df6/tutorial_erosion_dilatation.html)
* [Background Modelling and Background Subtraction
Performance for Object Detection](https://sci-hub.ee/10.1109/CSPA.2010.5545291)