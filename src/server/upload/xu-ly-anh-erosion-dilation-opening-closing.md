# Lí thuyết 
Hôm nay mình xin giới thiệu về một số phương pháp xử ảnh nhị phân sẽ được dùng trong quá trình preprocessing hoặc postprocessing. Tuỳ theo dữ liệu mà chúng ta sẽ áp dụng những phương pháp xử lý cho phù hợp với những bộ lọc phù hợp nó sẽ giúp cho hình ảnh sau khi xử lý loại bỏ bớt nhiễu, cân bằng sáng.. gây ảnh hưởng tới chất lượng của ảnh. Bài hôm nay mình xin giới thiệu 4 phương pháp: <br>
1. Erosion
2. Dilation
3. Opening
4. Closing <br>

Trước khi đi vào tìm hiểu chúng ta sẽ cùng nhìn qua các hình ảnh dưới đây để hình dung qua về quá trình xử lý của các phương pháp trên.
 
 ![](https://images.viblo.asia/cf620fb5-3213-492b-be85-ccc93f2def63.png)
 
 a-original image <br>
 b-dilation<br>
 c-erosion<br>
 e-opening<br>
 f-closing<br>
 
 Ta có công thức xác định erosion và dialation như sau : <br>
  ![](https://images.viblo.asia/0227f11d-a442-4f4f-b238-fc5d053515b8.png)
  
  Với : <br>
  ![](https://images.viblo.asia/0f2eccf5-8b85-4710-8cad-80564c50f33f.png)
 
 và <br>
 ![](https://images.viblo.asia/895dc477-af61-4bee-bc89-cd9091dcb7d3.png)
 
 Với s là ma trận pixel của ảnh, f là filter có thể là 1 mảng hoặc một ma trận nhị phân tuỳ theo từng loại dữ liệu mà ta sẽ chọn kích thước fiter cho phù hợp.

 
 
 
 
 
 ## Erosion
 Erosion hay còn gọi là xói mòn là một trong  hai toán tử cơ bản trong lĩnh vực hình thái toán học ( mathematical morphology). Nó thường được áp dụng trong những hình ảnh nhị phân tuy nhiên có một số phiên bản sẽ được áp dụng trên những hình ảnh xám tuy nhiên trong phạm vi bài viết của mình hôm nay thì chỉ tập trung vào những hình ảnh nhị phân. <br>
 Mục đích của phương pháp này sẽ giúp: <br>
1.  Loại bỏ những pixel nhiễu cô lập
2.  Loại bỏ những pixel nhiễu xung quanh đối tượng giúp cho phần viền (cạnh) của đối tượng trở nên mịn hơn
3.  Loại bỏ lớp viền (cạnh) của đối tượng giúp đối tượng trở nên nhỏ hơn và đặt những pixel viền đó trở thành lớp nền của đối tượng<br>
Ta có ví dụ sau đây : <br>
![](https://images.viblo.asia/565b8f14-ca2e-463d-86d6-576ce6cde595.png)

## Dilation 
Dilation hay còn còn là sự giãn nở là toán tử còn lại mà đã nêu ở trên, nó ngược lại với erosion cũng được áp dụng trong các ảnh nhị phân. Mục đích của phương pháp này  sẽ giúp:<br>
1. Với những hình ảnh bị đứt nét có thể giúp nối liền ảnh lại
2. Với những pixel nhiễu xung quanh đối tượng sẽ trở thành viền của đối tượng
3. Giúp nổi bật đối tượng trong ảnh hơn<br>
Ta có ví dụ sau đây: <br>![](https://images.viblo.asia/0778aed2-b61e-4dd1-b498-a89eb1739460.png)

## Opening 
Open = Erode next Dilate <br>
Với : <br> 
![](https://images.viblo.asia/3158908e-57d1-46e4-8340-ba7d868c2301.png)

## Closing
Close = Dilate next Erode 
Với <br>
![](https://images.viblo.asia/a34101fa-4542-4cfe-8e82-8372b83df1a4.png)

Ta có hình ảnh trực quan  sau : <br>
![](https://images.viblo.asia/68c36e81-93dc-4ea5-9956-7fde41db190f.png)

Tuỳ theo từng loại dữ liệu và yêu cầu của bài toán thì sẽ áp dụng các phương pháp linh hoạt. <br>
## Thực hành
Code thôi nào, phần mình hứng thú nhất đây rồi :) <br>

### Erosion
```python  
import cv2
from IPython.display import Image
image = cv2.read(path, cv2.IMREAD_GRAYSCALE)  #doc hinh anh

```
![](https://images.viblo.asia/6184a3c5-2816-4e7e-ab0d-a1a5f303e4ee.jpg)

```python
#ta có thể áp dụng các bộ lọc  sepFilter2D(), filter2D(), blur(), boxFilter(), bilateralFilter(), medianBlur()
#dưới đây mình xin áp dụng bộ lọc trung vi 3x3

img = cv2.medianBlur(image, 3) 
cv2.imwrite(path, img) #lưu ảnh vào đường dẫn
Image(path)  #hiển thị ảnh
```
![](https://images.viblo.asia/8d3ad080-951e-484c-80f3-d7186e7f6e26.jpg)

### Dilation
```python
import cv2
from IPython.display import Image
image = cv2.read(path, cv2.IMREAD_GRAYSCALE)  #doc hinh anh
```
![](https://images.viblo.asia/48a7fe27-e9a8-4a6e-a2e2-c317b76b2faf.jpg)
 
 ```
 img = cv2.convertScaleAbs(image, 1.1, 5)
cv2.imwrite(path, img)
Image(path)
 ```
 ![](https://images.viblo.asia/a3e3d63f-054f-4777-a82c-97b365735684.jpg)



####  Tài liệu tham khảo:
Bài viết trên được mình tổng hợp khi mình tham gia học lớp của thầy Đinh Viết Sang - giảng viên trường Đại học Bách Khoa Hà Nội và một số tài liệu mình tham khảo dưới đây: 
- Thư viện opencv
- Computer Vision: Algorithms and Applications, 2010 by Richard Szelisk

<br>Cảm ơn các bạn đã theo dõi bài viết của mình :)