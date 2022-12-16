### Mục tiêu.

* Tìm hiểu cách vẽ các hình dạng hình học khác nhau với OpenCV.
* Bạn sẽ học các hàm này: cv2.line (), cv2.circle (), cv2.rectangle (), cv2.ellipse (), cv2.putText ()...
### Code.
 Trong tất cả các hàm trên, bạn sẽ thấy một số đối số phổ biến như được đưa ra dưới đây:
 
*  img: Hình ảnh bạn muốn vẽ hình.
*  Color: Màu sắc của hình dạng cho BGR, chuyển nó thành một bộ tuple, ví dụ: (255,0,0) cho màu xanh lam. Đối với thang độ xám, chỉ cần vượt qua giá trị vô hướng của nó.
*  Độ dày (thickness): Độ dày của đường thẳng hoặc đường tròn, vv Nếu -1 được chuyển cho các hình dạng khép kín như hình tròn, nó sẽ lấp đầy hình dạng. độ dày mặc định = 1.
*  LineType: Loại dòng, cho dù 8-kết nối, dòng chống răng cưa vv Theo mặc định, nó là 8-kết nối. cv2.LINE_AA cung cấp dòng chống răng cưa trông rất tuyệt vời cho các đường cong.

### Vẽ đường (Drawing Line).
Để vẽ một đường thẳng, bạn cần phải có các tọa độ bắt đầu và kết thúc của dòng. Ta sẽ tạo ra một hình ảnh màu đen và vẽ một đường màu xanh trên nó từ góc trên bên trái đến góc dưới cùng bên phải.
```
import numpy as np
import cv2

# Create a black image
img = np.zeros((512,512,3), np.uint8)

# Draw a diagonal blue line with thickness of 5 px
img = cv2.line(img,(0,0),(511,511),(255,0,0),5)
```
### Vẽ hình chữ nhật (Drawing Rectangle)
Để vẽ một hình chữ nhật, bạn cần góc trên bên trái và góc dưới cùng bên phải của hình chữ nhật. Lần này ta sẽ vẽ một hình chữ nhật màu xanh lá cây ở góc trên cùng bên phải của hình ảnh.
```
img = cv2.rectangle(img,(384,0),(510,128),(0,255,0),3)
```
### Vẽ vòng tròn (Drawing Circle)
Để vẽ một vòng tròn, bạn cần tọa độ trung tâm và bán kính của nó. Chúng ta sẽ vẽ một hình tròn bên trong hình chữ nhật được vẽ ở trên.
```
img = cv2.circle(img,(447,63), 63, (0,0,255), -1)
```
### Vẽ hình elip (Drawing Ellipse)
Để vẽ hình elip, chúng ta cần truyền một số đối số. Một đối số là vị trí trung tâm (x, y). Đối số tiếp theo là độ dài trục (chiều dài trục chính, chiều dài trục nhỏ). Angle là góc quay của hình elip theo hướng ngược chiều kim đồng hồ. startAngle và endAngle biểu thị điểm bắt đầu và kết thúc của hình elip được đo theo chiều kim đồng hồ từ trục chính. tức là cho các giá trị 0 và 360 cho hình elip đầy đủ. Để biết thêm chi tiết, hãy kiểm tra tài liệu của cv2.ellipse (). Dưới đây ví dụ vẽ một nửa hình elip ở trung tâm của hình ảnh.
```
img = cv2.ellipse(img,(256,256),(100,50),0,0,180,255,-1)
```
### Vẽ đa giác (Drawing Polygon)
Để vẽ một đa giác, trước tiên bạn cần tọa độ các đỉnh. Làm cho các điểm đó thành một mảng có dạng ROWSx1x2 trong đó ROWS là số đỉnh và nó có kiểu int32. Ở đây chúng ta vẽ một đa giác nhỏ với bốn đỉnh màu vàng.
```
pts = np.array([[10,5],[20,30],[70,20],[50,10]], np.int32)
pts = pts.reshape((-1,1,2))
img = cv2.polylines(img,[pts],True,(0,255,255))
```
**Lưu ý:**
*  Nếu đối số thứ ba là False, bạn sẽ nhận được một polylines tham gia tất cả các điểm, không phải là một hình dạng khép kín.
*  cv2.polylines () có thể được sử dụng để vẽ nhiều dòng. Chỉ cần tạo một danh sách tất cả các dòng bạn muốn vẽ và chuyển nó vào hàm. Tất cả các dòng sẽ được vẽ riêng lẻ. Đó là cách tốt và nhanh hơn để vẽ một nhóm các dòng hơn là gọi cv2.line () cho mỗi dòng.

### Thêm văn bản vào hình ảnh (Adding Text to Images)
Để đưa văn bản vào hình ảnh, bạn cần chỉ định những điều sau đây.
* Dữ liệu văn bản bạn muốn viết
* Tọa độ vị trí của nơi bạn muốn đặt nó (ví dụ: góc dưới cùng bên trái nơi dữ liệu bắt đầu).
* Kiểu phông chữ (Kiểm tra tài liệu cv2.putText () cho phông chữ được hỗ trợ).
* Quy mô phông chữ (chỉ định kích thước phông chữ).
* Những thứ thông thường như màu sắc, độ dày, loại đường ... (Để có giao diện tốt hơn, hãy sử dụng lineType = cv2.LINE_AA).

Ta sẽ viết OpenCV trên hình ảnh với màu trắng.
```
font = cv2.FONT_HERSHEY_SIMPLEX
cv2.putText(img,'OpenCV',(10,500), font, 4,(255,255,255),2,cv2.LINE_AA)
```
### Kết quả (Result)
Ta có kết quả sau:
![](https://images.viblo.asia/a1168741-1bbd-4541-9224-e3d1cbbf0bc5.jpg)

Link tham khảo: https://opencv-python-tutroals.readthedocs.io/en/latest/py_tutorials/py_gui/py_drawing_functions/py_drawing_functions.html