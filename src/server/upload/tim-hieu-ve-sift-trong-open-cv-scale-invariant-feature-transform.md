### Mục tiêu.
* Tìm hiểu về các khái niệm của thuật toán SIFT.
*  Tìm các Keypoint của SIFT.
### 1. Scale-space Extrema Detection (Không gian tỷ lệ)
![](https://images.viblo.asia/a560ccf3-0cdd-4433-bbd3-fc1cae1c8e08.jpg)


Từ hình trên, rõ ràng là chúng ta không thể sử dụng cùng một cửa sổ để phát hiện những Keypoint với quy mô khác nhau. Nó đúng với các góc nhỏ. Nhưng để phát hiện các góc lớn hơn, chúng ta cần các cửa sổ lớn hơn. Trong trường hợp này, bộ lọc không gian tỷ lệ được sử dụng. Trong đó, Laplacian và Gaussian là hình ảnh với các giá trị sigma khác nhau. LoG hoạt động như một máy dò blob phát hiện các đốm màu ở nhiều kích cỡ khác nhau do thay đổi sigma. Nói tóm lại, sigma hoạt động như một tham số tỷ lệ. Ví dụ ở hình trên, gaussian có sigma thấp cho giá trị cao với góc nhỏ, khi guassian có sigma cao sẽ phù hợp với góc lớn hơn. Vì vậy, chúng ta có thể tìm thấy giá trị cực đại cục bộ trên thang đo và không gian tỷ lệ cho ta biết danh sách các giá trị (x, y, sigma) có nghĩa là có một điểm trọng tâm tại (x, y) theo tỷ lệ sigma.

Nhưng LoG này hơi tốn kém, do đó thuật toán SIFT được sử dụng, sự khác nhau giữa Gaussian và LoG không quá chênh lệch. Cái khác của Gaussian là làm mờ hình ảnh với hai sigma khác nhau. Quá trình này được thực hiện cho các quãng tám khác nhau. Nó được thể hiện trong hình ảnh dưới đây:
![](https://images.viblo.asia/dde6d496-e890-4aa8-89ee-c110e50ee9c1.jpg)

Khi DoG này xuất hiện, hình ảnh được tìm kiếm cho giá trị cực trị theo tỷ lệ và không gian. Ví dụ: một pixel trong ảnh được so sánh với 8 lân cận điểm cũng như 9 pixel ở các tỷ lệ tiếp theo và 9 pixel ở các tỷ lệ trước. Nếu nó là một giá trị cực trị thì nó là một Keypoint. Về cơ bản nó có nghĩa là điểm được thể hiện tốt nhất trong thang đo đó. Được hiển thị trong hình dưới đây:
![](https://images.viblo.asia/c51f6906-a03e-43fc-9728-4054f0922b3b.jpg)

Về các tham số khác nhau, bài viết đưa ra một số dữ liệu thực nghiệm có thể được tóm tắt là, số quãng tám = 4, số mức tỷ lệ = 5, sigma = 1.6, k = \ sqrt {2}, 
### 2. Keypoint Localization (Hóa điểm chính)
Khi tìm được vịu trí các Keypoint, chúng phải được tinh chỉnh để có kết quả chính xác hơn. Ta sử dụng chuỗi Taylor mở rộng không gian tỷ lệ để có được vị trí Keypoint chính xác hơn và nếu cường độ tại điểm cực này nhỏ hơn giá trị ngưỡng 0,03 , nó sẽ bị loại bỏ. Ngưỡng này được gọi là tương phản (ngưỡng trong OpenCV).

DoG có phản hồi cao hơn với các cạnh, do đó, các cạnh cũng cần phải được loại bỏ. Đối với điều này, một khái niệm tương tự như máy dò góc Harris được sử dụng. Họ đã sử dụng ma trận Hessian 2x2 (H) để tính độ cong dự đoán. Ta biết từ máy dò góc Harris rằng đối với các cạnh, một giá trị eigen lớn hơn giá trị kia. Vì vậy, ở đây ta sẽ sử dụng một chức năng đơn giản hơn,

Nếu tỷ lệ này lớn hơn ngưỡng, được gọi là ngưỡng cạnh trong OpenCV, điểm khóa đó sẽ bị loại bỏ.

Vì vậy, nó giúp loại bỏ bất kỳ điểm chính có độ tương phản thấp, điểm cạnh và những gì còn lại là điểm ta cần quan tâm.
### SIFT in OpenCV (SIFT trong OpenCV)
Bây giờ chúng ta hãy xem chức năng SIFT có sẵn trong OpenCV. Hãy bắt đầu với việc phát hiện Keypoint và vẽ chúng. Đầu tiên ta phải xây dựng một đối tượng SIFT. Chúng ta có thể truyền các tham số khác nhau cho nó.
```
import cv2
import numpy as np

img = cv2.imread('home.jpg')
gray= cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

sift = cv2.SIFT()
kp = sift.detect(gray,None)

img=cv2.drawKeypoints(gray,kp)

cv2.imwrite('sift_keypoints.jpg',img)
```

Hàm sift.detect () tìm Keypoint trong ảnh. Bạn có thể bỏ qua một mặt nếu bạn chỉ muốn tìm kiếm một phần của hình ảnh. Mỗi Keypoint là một cấu trúc đặc biệt có nhiều thuộc tính như tọa độ (x, y) của nó, kích thước của vùng lân cận, góc xác định hướng của nó, phản hồi chỉ định cường độ của các điểm chính...

OpenCV cũng cung cấp hàm cv2.drawKeyPoints () để vẽ các vòng tròn nhỏ trên các vị trí của các Keypoint. Nếu bạn truyền cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS cho nó, nó sẽ vẽ một vòng tròn có kích thước của Keypoint và thậm chí nó sẽ hiển thị hướng của nó. Xem ví dụ dưới đây.
```
img=cv2.drawKeypoints(gray,kp,flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
cv2.imwrite('sift_keypoints.jpg',img)
```
Ta có kết quả dưới đây:
![](https://images.viblo.asia/7c9540c2-07ad-4493-9c62-abe047805d17.jpg)
Bây giờ để tính toán mô tả, OpenCV cung cấp hai phương thức.

1.  Vì bạn đã tìm thấy các điểm chính, bạn có thể gọi sift.compute () để tính toán các mô tả từ các Keypoint mà chúng tôi đã tìm thấy.  Eg: `kp,des = sift.compute(gray,kp)`
2.  Nếu bạn không tìm thấy các Keypoint, hãy trực tiếp tìm các Keypoint và mô tả trong một bước duy nhất với hàm, sift.detectAndCompute ().

Chúng ta sẽ thấy phương pháp thứ hai như sau:
```
sift = cv2.SIFT()
kp, des = sift.detectAndCompute(gray,None)
```
Ở đây kp sẽ là một danh sách các Keypoint và des là một mảng dạng  Number_of_keypoints * 128
Vì vậy, chúng ta đã có các Keypoint, mô tả... Bây giờ ta muốn xem làm thế nào để khớp các Keypoint trong các hình ảnh khác nhau. Điều đó chúng ta sẽ học trong các phần tới.

Tài liệu tham khảo: https://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_feature2d/py_sift_intro/py_sift_intro.html