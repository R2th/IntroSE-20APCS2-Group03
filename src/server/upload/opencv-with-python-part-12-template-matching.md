Ở bài trước mình đã hướng dẩn các bạn về Canny Edge Detection và Gradients. Và ở bài viết tiếp theo này mình sẽ giới thiệu và hướng dẩn một phiên bản khá cơ bản về nhận dạng đối tượng.
# I. Giới thiệu.
Ý tưởng ở đây là tìm các vùng giống nhau của hình ảnh khớp với mẫu tôi cung cấp, đưa ra một ngưỡng nhất định. So sánh chính xác đối tượng, chính xác ánh sáng / quy mô / góc, điều này có thể làm việc tuyệt vời. 

Một ví dụ trong đó các điều kiện này thường được đáp ứng chỉ cần là có các điểm giống nhau, tương tưj nhau như các ánh đèn trên thiết bị điện tử. Có các nút và hình ảnh của chúng gần gần giống nhau, vì vậy bạn có thể sử dụng đối sánh mẫu. Để bắt đầu, bạn sẽ cần một hình ảnh chính và một mẫu. Bạn nên lấy mẫu của bạn từ việc cắt chúng ta từ ảnh gốc sao cho chính xác với ảnh bạn đang muốn tìm kiếm trong hình ảnh. Tôi sẽ cung cấp một hình ảnh làm ví dụ, nhưng vui lòng sử dụng hình ảnh của bạn yêu thích hoặc một cái gì đó tương tự. 

# II. Template Matching 
## 1. Ví dụ.
Hình ảnh chính:

![](https://images.viblo.asia/3e7ae231-91b4-4fc8-a7d0-eb1ec77dae2a.jpg)
Mẫu mà tôi sẽ tìm kiếm: (một nút trên thiết bị điện)

![](https://images.viblo.asia/96cfee95-00e9-403e-aea1-0a97a8445247.jpg)

Đây chỉ là một trong các nút, nhưng tôi tò mò muốn xem liệu tôi có thể tìm thấy kết hợp bất kỳ nút nào khác không. Tôi có tùy chọn ngưỡng, vì việc chọn ngường hoàn toàn không có vấn đề gì khi thực hiện việc so sánh nên tôi chọn là 80%, và tôi cho rằng đó là một ngưỡng tốt. 

Tôi sẽ bắt đầu bằng cách tải và chuyển đổi hình ảnh ngay bây giờ.
## 2. Hướng dẫn.
```
import cv2
import numpy as np

img_rgb = cv2.imread('opencv-template-matching-python-tutorial.jpg')
img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_BGR2GRAY)

template = cv2.imread('opencv-template-for-matching.jpg',0)
w, h = template.shape[::-1]
```

Cho đến nay, tôi sẽ tải cả hai hình ảnh lên, chuyển đổi sang màu xám cho chúng. Tôi giữ nguyên hình ảnh RGB gốc và tạo phiên bản màu xám. Tôi đã đề cập điều này trước đây, nhưng lý do tại sao tôi làm điều này là bởi vì tôi thực hiện tất cả việc xử lý trong phiên bản màu xám, sau đó sử dụng cùng tọa độ cho nhãn và như vậy trên hình ảnh màu. 

Với hình ảnh chính, tôi chỉ có phiên bản màu và phiên bản màu xám. Tôi tải mẫu và lưu ý kích thước.

```
res = cv2.matchTemplate(img_gray,template,cv2.TM_CCOEFF_NORMED)
threshold = 0.8
loc = np.where( res >= threshold)
```


Ở đây, ta gọi res matchTemplate giữa img_gray (hình ảnh chính của chúng ta), khuôn mẫu, và sau đó là phương thức kết hợp mà chúng ta sẽ sử dụng. Tôi chỉ định ngưỡng, ở đây 0,8 cho 80%. 

Sau đó, tôi tìm các vị trí có câu lệnh logic, trong đó tỷ lệ này lớn hơn hoặc bằng 80%. Cuối cùng, tôi đánh dấu tất cả các kết quả phù hợp trên hình ảnh gốc, sử dụng tọa độ tôi tìm thấy trong hình ảnh màu xám:

```
for pt in zip(*loc[::-1]):
    cv2.rectangle(img_rgb, pt, (pt[0] + w, pt[1] + h), (0,255,255), 2)

cv2.imshow('Detected',img_rgb)
```
![](https://images.viblo.asia/52a77f3f-93d1-4e06-9b1b-195fcd0516c8.jpg)
Vì vậy, tôi đã có một vài nút tìm thấy trên hình. Có thể hạ thấp ngưỡng? Tôi sẽ thử ngưỡng = 0,7.

![](https://images.viblo.asia/b08d4001-c528-473c-9da6-ae6a9a20d486.jpg)
## 3. Kết quả.
Có một số kết quả sai ở đây. Bạn có thể tiếp tục điều chỉnh ngưỡng cho đến khi bạn có 100%, nhưng bạn có thể không bao giờ đạt được điều đó mà không có kết quả dương tính giả. Một tùy chọn khác là chỉ cần chụp một mẫu hình ảnh khác. Đôi khi, có thể hữu ích khi có nhiều hình ảnh của cùng một đối tượng. Bằng cách này, bạn có thể giữ cho ngưỡng của bạn đủ cao để tương đối chắc chắn rằng kết quả của bạn sẽ chính xác. Trong hướng dẫn tiếp theo, chúng ta sẽ bao gồm khai thác tiền cảnh.

# III. Tài liệu tham khảo.
http://docs.opencv.org/
https://techmaster.vn/
https://pythonprogramming.net/

Trong hướng dẫn tiếp theo, tôi sẽ giới thiệu về GrabCut Foreground Extraction trong openCV với Python nhé .