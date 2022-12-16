***
## 1. Lời mở đầu
**Edge Detection** hay bài toán phát hiện cạnh được ứng dụng rất nhiều trong các bài toán về thị giác máy tính. Ví dụ như trong các bài toán như extract information, recognize object, .... Cạnh là nơi mã hóa nhiều thông tin ngữ nghĩa(semantics information) và hình dạng(shape)  trong một bức ảnh. Sau đây tôi xin giới thiệu hai thuật toán phổ biến được sử dụng trong phát hiện cạnh(edge detection) đó là ***sobel edge detection*** và ***canny edge detection***.

## 2. Thế nào là một good edge detector?
Để dễ so sánh, hình dung khi xem xét giữa nhiều thuận toán khác nhau, ta cần xác định thế nào là một bộ xác định tốt có hiệu quả cao (good edge detector) . Vậy câu hỏi đặt ra thế nào là **Good Edge Detector** ?. Chúng ta có ba tiêu chí:
<br>

1.  **Good Detection**: giảm thiểu được xác suất *`false positive`* (phát hiện nhầm cạnh giả do noise tạo ra)  và *`false negatives`*(xác suất bị thiếu mất một cạnh).
2.  **Good Localization**:  vị trí cạnh dự đoán phải gần nhất với cạnh thật (true edges).
3.  **Single response**:  Cạnh (true edges) được cấu tạo từ rất nhiều points. **single response** là tiêu chí đánh giá bao nhiêu point được dự đoán cho một true point. Càng nhiều point được dự đoán cho một true point thì độ tốt của detector sẽ giảm xuống.

![](https://user-images.githubusercontent.com/48142689/82718215-5b2a1480-9ccb-11ea-837a-22046718940c.jpg)

## 3. Sobel Edge Detection
Sobel thường sử dụng một Gaussian filter để loại bớt nhiễu,  làm mịn ảnh trước để thuật toán edge detection làm việc tốt hơn. Ta có thể sử dụng luôn hàm **cv2.GaussianBlur()** do OpenCV cung cấp. Sau đó Sobel sử dụng một kernel có kích thước 3x3 nhân tích chập với ảnh gốc để tính đạo hàm theo hướng ngang (Gx) hoặc dọc (Gy) sao đó tính trung bình độ lớn của gradient(magnitude)  . Đạo hàm theo hướng ngang và dọc chính là sự thay đổi của giá trị pixel theo hướng ngang hoặc dọc. Cuối cùng dựa vào cường độ đã được tính làm nổi bật các đường biên (edge) và làm mờ một số pixel. Ta sử dụng **skipping_threshold** để loại bỏ những điểm ánh sáng yếu này làm cạnh sắc nét hơn.

### 3.1. Sobel Edge Detection detect một cạnh
Đầu tiên ta chuyển ảnh từ dạng BGR sang Gray để xử lý. Sau đó sử dụng một Gaussian filter để làm mịn ảnh giúp một phần loại bỏ các cạnh giả do nhiễu. Sau đó sử dụng hàm sobel để tính gradient theo hướng x và y. Cuối cùng sử dụng skipping_threshold như đã nói ở trên. Chú ý ở đây ta sử dụng tham số **ddepth = cv2.CV_8U** trong hàm cv2.Sobel(). 
```python
def sobel_edge_detection(image_path, blur_ksize=5, sobel_ksize=1, skipping_threshold=30):
    """
    image_path: link to image
    blur_ksize: kernel size parameter for Gaussian Blurry
    sobel_ksize: size of the extended Sobel kernel; it must be 1, 3, 5, or 7.
    skipping_threshold: ignore weakly edge
    """
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img_gaussian = cv2.GaussianBlur(gray,(blur_ksize,blur_ksize),0)

    #sobel
    img_sobelx = cv2.Sobel(img_gaussian,cv2.CV_8U,1,0,ksize=sobel_ksize)
    img_sobely = cv2.Sobel(img_gaussian,cv2.CV_8U,0,1,ksize=sobel_ksize)

    img_sobel = (img_sobelx + img_sobely)/2
    for i in range(img_sobel.shape[0]):
        for j in range(img_sobel.shape[1]):
            if img_sobel[i][j] < skipping_threshold:
                img_sobel[i][j] = 0
            else:
                img_sobel[i][j] = 255
    return img_sobel
```
Và đây là kết quả của phần thuật toán bên trên:
<br>
<p align="center">
  <img width="100" height="200" src="https://user-images.githubusercontent.com/48142689/82720732-8703c500-9ce0-11ea-86b0-00a6bf1c4c91.png">
</p>

### 3.2. Sobel Edge Detection detect hai cạnh
Như ta đã thấy ở ví dụ trên chúng ta chỉ xác định được một cạnh của hạt gạo. Nguyên nhân là do chúng ta sử dụng **ddepth = cv2.CV_8U**. cv2.CV_8U hay chính là np.unint8 chỉ nhận gía trị dương tương ứng với Black-to-White Transition nên chiều ngược lại White-to-Black do nhận giá trị âm nên với kiểu np.uint8 sẽ nhận giá trị 0 hết nên chúng ta sẽ bị miss mất cạnh

Do đó để detect được cả hai cạnh, chúng ta sử dụng **cv2.CV_64F** để nhận được cả giá trị âm và dương  thay cho **cv2.CV_8U**.

```python
def sobel_edge_detection(image_path, blur_ksize=7, sobel_ksize=1, skipping_threshold=30):
    """
    image_path: link to image
    blur_ksize: kernel size parameter for Gaussian Blurry
    sobel_ksize: size of the extended Sobel kernel; it must be 1, 3, 5, or 7.
    skipping_threshold: ignore weakly edge
    """
    # read image
    img = cv2.imread(image_path)
    
    # convert BGR to gray
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img_gaussian = cv2.GaussianBlur(gray, (blur_ksize, blur_ksize), 0)
    
    # sobel algorthm use cv2.CV_64F
    sobelx64f = cv2.Sobel(img_gaussian, cv2.CV_64F, 1, 0, ksize=sobel_ksize)
    abs_sobel64f = np.absolute(sobelx64f)
    img_sobelx = np.uint8(abs_sobel64f)

    sobely64f = cv2.Sobel(img_gaussian, cv2.CV_64F, 1, 0, ksize=sobel_ksize)
    abs_sobel64f = np.absolute(sobely64f)
    img_sobely = np.uint8(abs_sobel64f)
    
    # calculate magnitude
    img_sobel = (img_sobelx + img_sobely)/2
    
    # ignore weakly pixel
    for i in range(img_sobel.shape[0]):
        for j in range(img_sobel.shape[1]):
            if img_sobel[i][j] < skipping_threshold:
                img_sobel[i][j] = 0
            else:
                img_sobel[i][j] = 255
    return img_sobel
   ```
   Dưới đây là kết quả sử dụng **cv2.CV_64F**:
<p align="center">
  <img width="100" height="200" src="https://user-images.githubusercontent.com/48142689/82721010-435e8a80-9ce3-11ea-9761-b2476ebdae0e.png">
</p>

Phần 2 của bài là [Canny Edge Detection](https://viblo.asia/p/part-2-edge-detection-voi-opencv-eW65Gv4YlDO) một thuật toán được sử dụng phố biển trong xác định cạnh. Các bạn có thể xem tiếp bài viết ở [link này](https://viblo.asia/p/part-2-edge-detection-voi-opencv-eW65Gv4YlDO). Cảm ơn các bạn đã theo dõi.:smiley::smiley::smiley:
## References
1. [Image Gradient Opencv Python Tutorials](https://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_imgproc/py_gradients/py_gradients.html)