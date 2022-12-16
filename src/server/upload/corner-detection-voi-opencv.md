## 1. Lời mở đầu
Bài toán xác định góc (corner detection) được sử dụng khá nhiếu trong các bài toán về computer vision như image matching, object detection, ... 
<br>
**Ứng dụng của nó trong xử lý ảnh như thế nào ?**. Trong các bài toán image matching, hai ảnh bên dưới là hai ảnh chụp cùng một cảnh với nhiều góc khác nhau. Khi ta muốn tìm điểm tương tự (feature point) của hai ảnh để nối ảnh, chúng ta tìm được vô vàn điểm giống nhau. Nhưng điểm nào mới là điểm quan trọng ? Giống như cách hoạt động của mắt người, khi xác định sự giống nhau giữa hai bức ảnh ta đi so sánh giữa các vị trí góc trong khi các đặc trưng về cạnh thường bị lặp lại không thể dùng làm yếu tố đặc trưng.  Hoặc trong các bài toán nhận diện biển số xe, chỉ cần sự dụng thuật toán lấy bốn góc của biển số xe ta có thể nhanh chóng lấy ra vùng biển số xe nhanh hơn nhiều so với các phương pháp sử dụng Deep learning. 
<p align="center">
  <img width="200" height="200" src="https://images.viblo.asia/75da8aee-b79e-4d8d-b84c-8ca6f0fc0296.png">
</p>

Corner Detection được sử dụng nhiều trong xử lý ảnh do đó hôm nay mình tiện review cho mọi người hai  thuật toán phổ biến đó là 
***Harris Corner Detection*** và ***Shi-Tomasi Corner Detection***.

## 2. Đặc trưng góc
<p align="center">
  <img width="100" height="200" src="https://images.viblo.asia/4a3b51fc-7f0d-44af-acb2-cca2d5c5a107.png">
</p>
Khi so sánh giữa ba vùng:  mặt phẳng, cạnh và góc, ta dùng một cửa sổ nhỏ có kích thước cố định trượt trên ảnh.

1. **Vùng mặt phẳng**: dù có di chuyển cửa sổ theo bất cứ hướng nào thì cũng không  có sự thay đổi nào về cường độ 
2. **Vùng cạnh**: nếu di chuyển cửa sổ theo chiều ngang dọc mép cạnh cũng không có sự thay đổi nào
3. **Vùng góc**: di chuyển cửa sổ theo bất cứ hướng nào

## 3. Các thuật toán xác định góc (corner detection)
Do vùng góc di chuyển cửa sổ theo hướng nào thì cũng có sự thay đổi về cường độ nên để phát hiện góc ta sử dụng công thức :
   ![](https://images.viblo.asia/0aec0d37-6d9d-4db4-ac86-15c304d11e0d.png)
Trong đó :
* w(x, y): cửa sổ trượt tại tọa độ (x, y)
* I(x +u, y + v): cường độ tại tọa độ đã dịch chuyển một khoảng (u, v)
* I(x, y): cường độ tại tọa độ điểm hiện tại
* E(u, v): sự thay đổi cường độ với cửa sổ (x, y) so với cường độ tại (x + u,  y + v)

Sau đó thêm một vài bước khai triển Taylor(phần này tính toán khá dài và liên quan nhiều đến toán nên mình không giải thích sâu), ta có một biểu thức tương đương công thức bên trên như sau:      
<p align="center">
  <img width="100" height="200" src="https://images.viblo.asia/872df5ed-6abc-4937-a0ab-2f327f061f2c.png">
</p>

trong đó:  **Ix** và **Iy**  là đạo hàm theo hướng x và y tương ứng của ảnh như trong thuật toán sobel mình đã giải thích ở [sobel edge detection](https://viblo.asia/p/part1-edge-detection-voi-opencv-L4x5xLVB5BM#_3-sobel-edge-detection-2)
<p align="center">
  <img width="100" height="200" src="https://images.viblo.asia/9fc357ae-7a39-4bc1-a2f9-17815359a451.png">
</p>

## 3.1. Harris Corner Detection
Sau khi sử dụng công thức tính thay đổi cường độ bên trên, ta có thể chọn ra những vùng ***có khả năng*** là một góc. Để đánh giá chính xác vùng đó có thật sự chứa góc hay không? Thuật toán **Harris Conner Detection** sử dụng một cái confidence score. lambda1, lambda2 lần lượt là giá trị eigen của ma trận M
 <p align="center">
  <img width="100" height="200" src="https://images.viblo.asia/8da70002-888c-4483-b9ab-a7728a101913.png">
</p>
Ta có thể có những trường hợp như sau:

* Confidence score nhỏ khi cả lambda1 và lambda2 đều nhỏ ==> là vùng mặt phẳng
* Nếu một trong hai lambda lơn hơn cái còn lại ==> là vùng cạnh do chỉ thay đổi cường độ theo một chiều
* Nếu cả hai lambda đều có giá trị lơn thì Confidence score sẽ lớn ==> là góc do do theo hướng nào thì cường độ cũng sẽ thay đổi
 <p align="center">
  <img width="100" height="200" src="https://images.viblo.asia/6dc3a0a7-cbb0-4b3f-a3f3-3ac9f6410727.jpg">
</p>

**Example**:
Chúng ta đọc ảnh và chuyển sang dạng ảnh GRAY để xử lý. Vì dst có dạng cv2.CV_32F1 nên ta ép kiểu cho gray sang float32 trước rồi  mới cho vào hàm cv2.cornerHarris() của OpenCV. Với một giá trị pixel lớn hơn giá trị lớn nhất nhân với hệ số threshold ta đánh dấu bằng pixel màu đỏ. Cuối cùng ta thu được hình ảnh kết quả như bên dưới đây. **Note: mình đang sử dụng jupyter notebook để demo ví dụ**.
```python
import cv2
import numpy as np
from IPython.display import Image
def detect_corner(image_path, blockSize=2, ksize=3, k=0.04, threshold=0.01):
    """
    image_path: link to image
    blockSize: the size of neighbourhood considered for corner detection
    ksize: parameter of Sobel derivative
    k: Harris detector free parameter in the equation.
    """
    
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    gray = np.float32(gray)
    dst = cv2.cornerHarris(gray, blockSize, ksize, k)

    #result is dilated for marking the corners, not important
    dst = cv2.dilate(dst, None)
    
    # Threshold for an optimal value, it may vary depending on the image.
    img[dst>threshold*dst.max()]=[0, 0, 255]
    
    cv2.imwrite('example.png',img)
    return img
    
out_path = detect_corner('sudoku.png', blockSize=2, ksize=5, k=0.04, threshold=0.005)
Image(out_path)
```
![](https://images.viblo.asia/8c996166-0338-4845-8ebf-3588b4316582.png)

## 3.2.  Shi-Tomasi Corner Detection
**Shi-Tomasi Corner Detection** chỉ khác với Harris Corner Detection tại hàm  tính cofidence score. Tuy nhiên đây chính là điểm giúp cho thuật toán này có thể phát hiện vùng có khả năng là góc nhiều hơn Harris.
<p align="center">
  <img width="100" height="200" src="https://images.viblo.asia/76e95416-3a74-42df-a43f-4b73d344f6a0.png">
</p>

**Confidenece score function**(lambda1, lambda2 vẫn lần lượt các giá trị eigen value của ma trận M):
<p align="center">
  <img width="100" height="200" src="https://images.viblo.asia/b5e15dae-b069-4be6-970d-f9a1609ecb9e.png">
</p>
Chỉ cần lambda1 và lambda2 đồng thời lớn hơn ngưỡng LambdaMin thì góc đó đã được xem là vùng chứa góc. Một cách trực quan bạn có thể thấy vùng màu xanh(vùng chứa góc ) của Shi-Tomasi lớn hơn nhiều so với Harris do đó nó cũng biểu hiện tiêu chuẩn một vùng là góc đã được mở rộng hơn.
 <br> 
 
 Trong OpenCV có cung cấp một hàm **cv2.goodFeaturesToTrack()** có thể thực hiện thuật toán này dễ dàng hơn. Chi tiết về hàm này các bạn có thể xem link [ở đây](https://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_feature2d/py_shi_tomasi/py_shi_tomasi.html). Trong bài viết này, mình chỉ giải thích lại một số tham số quan trọng :
 
 * **image**: nên chuyển về dưới dạng ảnh xám để xử lý
 * **maxCorners:** Số góc bạn mong muốn tìm thấy. Nếu số góc tìm được lớn hơn số bạn mong muốn thì sẽ trả về số góc bạn mong muốn nhưng có confidence cao nhất
 * **qualityLevel**: tham số này nhân với điểm confidence lớn nhất của một góc tìm được tạo ra mỗi giá trị ngưỡng. Và dựa trên ngưỡng này để loại giá trị góc có điểm confidence bé hơn ngưỡng. Nếu số góc tìm được bé hơn góc mong muốn thì chỉ trả về số góc tìm được
 * **minDistance**: khoảng cách Euclid bé nhất giữa hai góc.
 
 Mọi người có thể điều chỉnh tham số để phù hợp cho từng bài toán và thấy rõ sự khác biệt của thuật toán
```python
import cv2
import numpy as np
from IPython.display import Image

def shi_tomasi_detect_corner(img_path, maxCornerNB, qualityLevel, minDistance=0.6):
    img = cv2.imread(img_path)
    
    # convert to gray image
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # shi tomasi detect corners
    corners = cv2.goodFeaturesToTrack(gray, maxCornerNB, qualityLevel, minDistance)
    corners = np.int0(corners)

    for i in corners:
        # take (x, y) of corners
        x, y = i.ravel()
        
        # draw circle
        cv2.circle(img, (x, y), 3, (0, 0, 255), -1)

    cv2.imwrite('example_shitomasi.png', img)
    return 'example_shitomasi.png'
    
img_path = shi_tomasi_detect_corner('house.jpg', 600, 0.05)
Image(img_path)
  ```
  ![](https://images.viblo.asia/1df24965-9c4b-442a-a172-4c465cd698da.png)
  
  Cảm ơn mọi người đã dành thời gian đọc bài viết của mình:kissing_smiling_eyes::kissing_smiling_eyes:
  
  ## Tham khảo
  * [Shi-Tomasi Corner Detector OpenCV](https://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_feature2d/py_shi_tomasi/py_shi_tomasi.html)