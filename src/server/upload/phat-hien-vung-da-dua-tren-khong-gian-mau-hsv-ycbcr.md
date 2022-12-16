Phát hiện da (Skin detection) vẫn là một vấn đề thách thức trong xử lý ảnh. Nó được sử dụng nhằm mục đích xác định xem một chuỗi video nhất định, một hình ảnh, một vùng hoặc một pixel có thể hiện da người hay không. Các phân vùng da đó thường được xác định ranh giới dựa trên các đặc điểm của da như màu sắc và kết cấu. 

Hồi học xử lý ảnh, bọn mình được giao một bài tập phát hiện da và các tiếp cận được mình lựa chọn là sử dụng không gian màu, các giá trị mà mình sử dụng được phỏng đoán bằng cách thử nhiều lần. Trong thời gian vừa rồi mình có đọc được một bài báo của các tác giả Djamila Dahmani, Mehdi Cheref, Slimane Larabi cung cấp một cách tiếp cận mới cho vấn đề này. 

Bài viết này sẽ trình bày sơ qua các cài đặt cũng như kết quả thu được khi mình thử nghiệm với kết quả mà bài báo cung cấp. Về chi tiết bài báo mọi người có thể xem tại [D. Dahmani, M. Cheref and S. Larabi, Zero-sum game theory model for segmenting skin regions, Image and Vision Computing](https://doi.org/10.1016/j.imavis.2020.103925)

# Sơ lược cách cài đặt và kết quả thu được
Các cài đặt đơn giản như sau: giá trị hình ảnh RGB sẽ được chuyển đổi thành HSV cũng như giá trị YCbCr, hai giá trị đó của mỗi pixel được so sánh với giá trị tiêu chuẩn của pixel da và quyết định được đưa ra liệu pixel có phải là pixel da hay không tùy thuộc vào việc các giá trị nằm trong một loạt các giá trị ngưỡng được xác định trước cho mỗi tham số.

#### Mã cài đặt cụ thể như sau:
```python
import cv2
import numpy as np
img=cv2.imread("ảnh chân dung hoặc có vùng da")

#chuyển đổi từ không gian màu gbr sang hsv
img_HSV = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
#lấy khoảng giá trị màu trong không gian màu hsv 
HSV_mask = cv2.inRange(img_HSV, (0, 15, 0), (17,170,255)) 
HSV_mask = cv2.morphologyEx(HSV_mask, cv2.MORPH_OPEN, np.ones((3,3), np.uint8))

#chuyển đổi từ không gian màu gbr sang YCrCb
img_YCrCb = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb)
#lấy khoảng giá trị màu trong không gian màu YCrCb 
YCrCb_mask = cv2.inRange(img_YCrCb, (0, 135, 85), (255,180,135)) 
YCrCb_mask = cv2.morphologyEx(YCrCb_mask, cv2.MORPH_OPEN, np.ones((3,3), np.uint8))

#kết hợp kết quả của hai phép phân đoạn trên
global_mask=cv2.bitwise_and(YCrCb_mask,HSV_mask)
global_mask=cv2.medianBlur(global_mask,3)
global_mask = cv2.morphologyEx(global_mask, cv2.MORPH_OPEN, np.ones((4,4), np.uint8))

HSV_result = cv2.bitwise_not(HSV_mask)
YCrCb_result = cv2.bitwise_not(YCrCb_mask)
global_result=cv2.bitwise_not(global_mask)

cv2.imwrite("1_HSV.jpg",HSV_result)
cv2.imwrite("2_YCbCr.jpg",YCrCb_result)
cv2.imwrite("3_global_result.jpg",global_result)
```

Trong đó, tác giả sau khi dùng hàm inRange để lấy các pixel có trong khoảng giá trị có dùng thêm phép biến đổi hình thái Opening nhằm giảm nhiễu.

#### Kết quả thu được như sau:
Tác giả có thử nghiệm kết quả với hai bộ dữ liệu là HGR (Hand Gesture Recognition) Image Database và SFA (A Human Skin Image Database based on FERET and AR Facial Images) Image Database kết quả thu được được thể hiện qua hình minh họa sau:
![](https://images.viblo.asia/b991cdbd-d48e-4cb0-8031-cee1897437da.png)
Về chi tiết kết quả mọi người có thể tham khảo thêm trong bài báo.

# Sơ lược về cách tiếp cận của tác giả
Để có được kết quả là không gian màu như trên, tác giả sử dụng một phương pháp mới để phân đoạn vùng da dựa trên mô hình lý thuyết trò chơi tổng bằng 0 (Zero-sum game), khai thác các phân loại đối lập của một vùng hình ảnh bằng các máy dò da khác nhau.
Từ góc nhìn của các bài toán phân loại, phát hiện da có thể được xem như một bài toán phân loại hai lớp: lớp pixel da và pixel không da.

Trong bài báo này, các tác giả đề xuất mô hình hóa vấn đề phát hiện xung đột pixel da như một trò chơi tiến hóa. Ý tưởng chính của trò chơi này là coi khu vực xung đột là lãnh thổ tranh chấp giữa hai người chơi chính (người chơi muốn đánh dấu các pixel là da và người chơi muốn đánh dấu các pixel không là da). Mỗi người chơi cần đánh dấu đúng các lãnh thổ của mình và sẽ thua nếu xâm nhập vào lãnh thổ đối diện. Trò chơi này sẽ hoàn toàn phù hợp với một trò chơi có tổng bằng không (mỗi người tham gia được hoặc mất tiện ích được cân bằng chính xác bởi những mất mát hoặc lợi ích của những người tham gia khác). Việc phân tách vùng da dựa trên các giá trị không gian màu trên là một phần của phương pháp được tác giả đề xuất. Bên cạnh phân tách bằng không gian màu, từ ảnh đầu vào nhóm tác giả còn xử lý bằng mạng nơ ron nhân tạo để trích xuất các đặc trưng bề mặt, từ hai kết quả trên xây dựng ma trận dữ liệu da cũng như ma trận tích chập để làm đầu vào cho mô hình lý thuyết trò chơi và từ đó thu được ảnh đầu ra. Về chi tiết phương pháp này, mọi người có thể tìm hiểu thêm trong bài báo.

# Kết luận
Kết quả được trình bày trong bài báo cho thấy phương pháp được đề xuất có hiệu quá khá cao trong viện phân đoạn vùng da. Kết quả cho thấy phương pháp được đề xuất vượt trội hơn các phương pháp phân đoạn da hiện có trong việc giảm tỷ lệ false positive và thu được kết quả đầy hứa hẹn trong việc nâng cao hiệu suất của quá trình phân đoạn da.