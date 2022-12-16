## 1. Lời mở đầu
Ở [phần 1 về chủ đề Edge Detection](https://viblo.asia/p/part1-edge-detection-voi-opencv-L4x5xLVB5BM), mình đã trình bày về tiêu chuẩn đánh giá một detector như thế nào là một detector tốt cũng như thuật toán **Sobel Edge Detection** và ví dụ cụ thể. Các bạn có thể xem lại [ở đây](https://viblo.asia/p/part1-edge-detection-voi-opencv-L4x5xLVB5BM). Ở phần 2 này, mình xin tiếp tục trình bày về thuật toán **Canny Edge Detection**. Đây là một thuật toán xác định cạnh được sử dụng phổ biến và hiệu quả trong các bài toán về thị giác máy tính. 

## 2. Thuật toán Canny Edge Detection
Một cách tổng quát, thuật toán Canny Edge Detection gồm có **4 bước**:
1.  Lấy đạo hàm của ảnh theo chiều ngang và dọc theo phân phối Gaussian
2.  Tính cường độ và hướng của gradient
3.  Non-maximum supression (phần này mình xin để tiếng anh vì không biết nói như nào :joy:)
4.  Sử dụng threshold để tạo loại bỏ cạnh gỉa, xác định cạnh thực sự (real edge)

Sau đây chúng ta lần lượt khám phá ý nghĩa từng bước một. Ở đây mình dùng một ảnh dưới đây là ảnh đầu vào cho tất cả các ví dụ bên dưới
<p align="center">
  <img width="100" height="200" src="https://user-images.githubusercontent.com/48142689/82734192-6de03000-9d43-11ea-819f-4ae800eed09d.png">
</p>

### 2.1. Lấy đạo hàm theo phân phối Gaussian
Cũng tương tự như khi xử lý với thuật toán Sobel, ta lấy đạo hàm theo chiều ngang x  **(Gx)** và chiều dọc y **(Gy)** . Do hướng của gradient luôn vuông góc với các cạnh nên ảnh lấy đạo hàm theo chiềng ngang x (Gx) sẽ thu được các nét dọc còn ảnh lấy đạo hàm theo chiều dọc (Gy) sẽ thu được các nét ngang của bức ảnh
<p align="center">
  <img width="100" height="200" src="https://user-images.githubusercontent.com/48142689/82734292-52295980-9d44-11ea-9fc5-ccf5cff65b2e.png">
</p>

### 2.2. Tính cường độ và hướng gradient
Từ kết quả tính đạo hàm theo hướng x và y trên ảnh đầu vào, ta tính cường độ gradient và hướng của mỗi pixel theo công thức :
<br>
1.  **Cường độ gradient** = sqrt( Gx^2 + Gy^2)
2.  **Hướng của gradient:** theta = atan2(gy, gx)
<br>

![2](https://user-images.githubusercontent.com/48142689/82735191-0b3e6280-9d4a-11ea-9c77-381ee7750453.png)
### 2.3. Non-maximum supression
Các bạn có thể nhìn thấy cô gái trong ảnh của **phần kết quả 2.2** có nhiều đường biên bao quanh cơ thể dày hơn ảnh gốc. Đó là do có nhiều pixel cùng miêu tả một pixel trên cạnh của ảnh ban đầu. Vậy để làm những đường biên trở nên sắc nét và mảnh hơn giống ảnh gốc ta sử dụng **Non-maximum supression** để loại bỏ những pixel thừa.
<br>
<p align="center">
  <img width="200" height="300" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS51GhVixvrL7aCaW2ieI39bovbrPZsJV_X-OAtu5_gBK0rDgcl&usqp=CAU">
</p>
Mình giải thích thuật toán Non-maximum supression như sau: Với một pixel A được xác định nằm trên một cạnh. Ta sẽ có vector gradient direction luôn  vuông góc với cạnh edge. Trên vector gradient direction ta có thể có nhiều pixel ví dụ ở đây là B và C. Ba pixel A, B, C cùng miêu tả một pixel trên cạnh ban đầu nên ta phải so sánh giá trị giữa A, B và C xác định đâu là pixel nào có giá trị lớn nhất. Sau đó loại bỏ hai pixel còn lại bằng cách đặt chúng bằng 0.
<br>
<br>
Các bạn có nhìn thấy sự khác biệt rõ ràng ảnh bên trái chưa sử dụng  Non-maximum supression thì các nét sẽ dày và đậm hơn còn sau khi áp dụng thuật toán ta thu được cạnh với những nét mảnh hơn do loại bỏ các pixel thừa.
<p align="center">
  <img width="200" height="300" src="https://user-images.githubusercontent.com/48142689/82735825-cbc64500-9d4e-11ea-8fe5-2ee67861e2b2.png">
</p>

### 2.4. 'Hysteresis' thresholding
Bước này sẽ quyết định một cạnh ta dự đoán ở các bước trên nó có phải là một cạnh thật sự hay không. Giá trị threshold ở đây có hai ngưỡng **Vmax và Vmin** . Ta triển khai thuật toán dựa vào hai giá trị này như sau:

* Nếu cường độ của gradient(Magnitude) > Vmax thì đó là chắc chắn là một cạnh (strong edge)
* Nếu Magnitude < low threshold < Vmin thì đó là noise
* Nếu Vmin < Magnitude < Vmax thì đó là một cạnh yếu chưa xác định được là cạnh hay nhiễu (weak edge)
* Đối với những weak edge, nếu cạnh nào có kết nối với một strong edge thì weak edge đó là cạnh, nếu không sẽ là noise
<p align="center">
  <img width="200" height="300" src="https://www.researchgate.net/profile/Bradly_Alicea2/publication/338145885/figure/fig3/AS:839640856682496@1577197388056/Diagram-showing-an-example-of-hysteresis-thresholding-and-the-labeled-edge-relative-to.ppm">
</p>

Ví dụ ở hình trên A nằm trên ngưỡng Vmax nên A chắc chắn là cạnh (strong edge). C nằm giữa ngường Vmax và Vmin nên C là cạnh yếu (weak edge) nhưng C kết nối với strong edge là A nên C cũng là một cạnh. Tuy nhiên B cũng nằm trong ngưỡng giống C nhưng không kết nối với cạnh nào chắc chắn là cạnh (strong edge) nên B là nhiễu

## 3. Ví dụ với Canny Edge Detection
```python
def canny_edge_detection(image_path, blur_ksize=5, threshold1=100, threshold2=200):
    """
    image_path: link to image
    blur_ksize: Gaussian kernel size
    threshold1: min threshold 
    threshold2: max threshold
    """
    
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    img_gaussian = cv2.GaussianBlur(gray,(blur_ksize,blur_ksize),0)

    img_canny = cv2.Canny(img_gaussian,threshold1,threshold2)

    return img_canny
    
    
image_path = 'example.png'
gray = cv2.imread(image_path, 0)
img_canny = canny_edge_detection(image_path, 25, 50, 100)
  ```
  
  Ta có thể điều chỉnh tham số threshold1 và threshold2 để tùy chỉnh cho từng bức ảnh bạn áp dụng thuật toán.

<p align="center">
  <img width="200" height="300" src="https://user-images.githubusercontent.com/48142689/82736450-1eeec680-9d54-11ea-8b28-aabfff730e1c.png">
</p>

Cảm ơn các bạn đã theo dõi bài viết của mình. Nhớ like và subrice để ủng hộ bài viết của mình nha:kissing_smiling_eyes::kissing_smiling_eyes: