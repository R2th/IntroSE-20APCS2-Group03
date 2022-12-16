AI (Trí tuệ nhân tạo) đang dần "xâm chiếm" hầu như tất cả các lĩnh vực trong cuộc sống. Với tính chất tự động hóa cao, có thể thực hiện các công việc khó và có độ chính xác ngày càng được cải thiện, AI đang dần trở thành một công cụ khó có thể thay thế được. Tuy nhiên, các mô hình AI hiện tại được đánh giá là "nặng, yêu cầu phần cứng cao" khiến cho việc áp dụng vào trong các dự án thực tế trở nên khá khó khăn, nhất là với các thiết bị mobile hoặc edge devices - xu thế hiện tại. Vì vậy, Google đã đưa ra một giải pháp, chính xác hơn là một bộ công cụ, cung cấp các công cụ cho các bài toán AI/ML đã được tối ưu để chạy trên nhiều nền tảng khác nhau, với tên gọi là [MediaPipe](https://github.com/google/mediapipe). Trong bài này, mình sẽ giới thiệu về bộ công cụ trên và áp dụng nó vào một ứng dụng cụ thể: Hand Drawing bằng webcam.

![image.png](https://images.viblo.asia/d70d57f3-6756-47cd-a942-249cc1a7da82.png)

<p align="center">Hình 1. MediaPipe - Công cụ tuyệt vời của "ông lớn" Google </p>

# 1. MediaPipe - Live ML anywhere
## 1.1 Giới thiệu về MediaPipe:

Về tổng quan, [MediaPipe](https://github.com/google/mediapipe) là tập hợp của một loạt các giải pháp Machine Learning đa nền tảng, có thể can thiệp được và cực kỳ lightweight. Một số ưu điểm có thể kể tới của giải pháp này bao gồm:
- Cung cấp một giải pháp inference nhanh chóng: Google khẳng định rằng bộ công cụ này có thể chạy ổn định trên hầu hết các cấu hình phần cứng thông dụng.
- Dễ dàng cài đặt và triển khai: Việc cài đặt cực kỳ dễ dàng và tiện lợi, có thể triển khai trên nhiều nền tảng khác nhau như Mobile (Android/iOS), Desktop/Cloud, Web và IoT devices.
- Mã nguồn mở và miễn phí: Toàn bộ source code được công khai trên [MediaPipe](https://github.com/google/mediapipe), người dùng hoàn toàn có thể sử dụng và tùy chỉnh trực tiếp để phù hợp với bài toán của mình.

![image.png](https://images.viblo.asia/d7c67ad9-d96e-46dd-8363-b84045958021.png)

<p align="center">Hình 2. Các giải pháp được cung cấp và tính khả dụng trên các nền tảng </p>

## 1.2 Các giải pháp trong MediaPipe:

Hầu hết các bài toán nổi bật trong lĩnh vực Computer Vision - Thị giác máy tính, đều được Google cài đặt trong MediaPipe. Ta sẽ đi qua một lượt các giải pháp được cung cấp để hiểu rõ hơn về độ đa dạng của MediaPipe.

### 1.2.1 Face Detection

Đây là một bài toán quen thuộc với tất cả mọi người. Với đầu vào là một ảnh hoặc một video, nhiệm vụ của chúng ta là tìm ra vị trí và đóng hộp (bounding box) những khuôn mặt con người xuất hiện trên đấy, cũng như đánh dấu các điểm quan trọng (MediaPipe sử dụng 5-landmarks) trên khuôn mặt đó. MediaPipe Face Detection sử dụng mạng BlazeFace làm nền tảng nhưng thay đổi backbones. Ngoài ra, thuật toán NMS (non-maximum suppression) cũng được thay thế bởi một chiến thuật khác, giúp thời gian xử lý giảm đáng kể.

![image.png](https://media.giphy.com/media/iB33HuXvVC9rMNmuP5/giphy.gif)

<p align="center">Hình 3. Face Detection trên một thiết bị Android </p>

### 1.2.2 Face Mesh

Thay vì tìm bounding box bao quanh mặt, Face Mesh là một bài toán nhận diện một loạt các điểm trên khuôn mặt, từ đó tạo thành 1 lưới (mesh) của mặt. Chiếc lưới này sẽ được áp dụng vào các bài toán chỉnh sửa ảnh mặt 3D hay các tác vụ liên quan tới 3D Alignment và Anti-spoofing. Công cụ trong MediaPipe sẽ sinh ra tổng cộng 468 điểm trên mặt và tạo thành lưới mà không đòi hỏi quá nhiều năng lực tính toán cũng như số camera (chỉ cần 1 camera chính diện).

![image.png](https://media.giphy.com/media/6BE7k6hCOTEdfI2x7J/giphy.gif)

<p align="center">Hình 4. Face Mesh khi áp dụng vào Augmented Reality - AR </p>

### 1.2.3 Hands Detection

Hands Detection, hay còn gọi là nhận diện bàn tay, là bài toán mà chúng ta sẽ thử nghiệm trong bài này. Đầu ra của giải pháp này là một mô hình skeleton (khung xương) của bàn tay, gồm vị trí của các landmarks trên bàn tay và được nối với nhau thành một khung bàn tay hoàn chỉnh.

![image.png](https://media.giphy.com/media/hR3qbjGlC0fxlE1yUK/giphy.gif)

<p align="center">Hình 5. Nhận diện 3D-Skeleton của tay </p>

### 1.2.4 Human Pose Estimation

Mở rộng từ bài toán Hands Detection, Human Pose Estimation cung cấp một mô hình skeleton 3D cho cả cơ thể, với các khớp quan trọng được định nghĩa sẵn và được nối với nhau để tạo thành khung của người. Chiến thuật được đặt ra cho bài toán này tương tự như bài Hands Detection và Face Mesh. BlazeFace, một lần nữa, được sử dụng làm tư tưởng chính cho thuật toán xử lý bài này.

![image.png](https://media.giphy.com/media/lW4bYxjfAzRZXooOi3/giphy.gif)

<p align="center">Hình 6. Human Pose Tracking trong môi trường 3D </p>

Ngoài ra, còn rất nhiều giải pháp nữa được Google cung cấp trong bộ cung cấp này, bao gồm như các bài toán Segmentation (Selfie, Hair, ...), Object Detection, Motion Tracking, 3D Object Detection, ... Tuy nhiên, mình sẽ không liệt kê hết trong bài viết này do quá dài. Còn bây giờ, mình sẽ giới thiệu một ứng dụng đơn giản để áp dụng bộ công cụ này vào thực tế.
# 2. Drawing with Hands Gestures

## 2.1 Nền tảng ứng dụng:

Với ứng dụng Hands Detection, ta có thể xây dựng một mô hình skeleton tay với các điểm như sau:

![image.png](https://images.viblo.asia/0a3ec395-e3c3-443a-8f1c-12fe1b989450.png)

<p align="center">Hình 7. Skeleton của tay gồm 21 điểm quan trọng trên bàn tay </p>

Nghiên cứu về ứng dụng của mình một chút, ta cần những tiêu chí gì nhỉ?
- Yêu cầu vẽ (chắc chắn rồi), để thuận tiện tay mình nhất thì sẽ dùng ngón trỏ làm động tác để vẽ.
- Vẽ thì chắc chắn sẽ có lúc sai, nên chúng ta cần tẩy để xóa những nét vẽ bị sai trên màn hình.
- Nhưng nếu chúng ta cần tẩy nhanh, thì ta phải thay đổi được kích thước của tẩy. Từ đó, có thể thêm để thay đổi kích thước của nét bút nói chung.
- Thay đổi được nét bút rồi đấy, giờ nếu muốn thay đổi màu sắc của chì vẽ nữa. Bức tranh cần nhiều màu sắc đúng không :D
- Ngoài ra, cần thêm một số động tác như: Di chuyển bàn tay tự do, xóa toàn bộ màn hình, lưu ảnh vừa vẽ...

Vậy là ta đã tạm liệt kê được ra một số chức năng quan trọng cho ứng dụng của mình, giờ ta cần xác định động tác để thực hiện các hành động trên. Theo như hình 6, ta có rất nhiều lựa chọn về các điểm, từ đó ta có thể xác định được rõ động tác. Giờ ta sẽ thử chọn các động tác cho từng thao tác nhé:
    
- Vẽ: Như ở trên, ta có thể sử dụng ngón trỏ để ngòi bút vẽ. Động tác này yêu cầu xác định điểm số 8 đang là điểm có vị trí cao nhất trong tất cả các điểm.

- Tẩy: Dùng động tác giống vẽ, ta sẽ sử dụng trick một chút để biến từ ngòi bút thành ngòi tẩy. Vì chiếc "bảng" của chúng ta có nền là đen, nên chiếc tẩy chỉ là việc mình đè màu đen lên các màu đã vẽ để có thể xóa.

![image.png](https://images.viblo.asia/114fd3e5-d35e-4dfc-a99b-6a005ef0da19.png)

<p align="center">Hình 8. Động tác vẽ và tẩy </p>

- Thay đổi kích thước: Giống như khi sử dụng điện thoại cảm ứng, ta sẽ sử dụng 2 đầu ngón cái và trỏ để xác định ra yêu cầu này. Ngoài ra, ta phải tính toán khoảng cách giữa 2 đầu ngón tay để ứng sang tỷ lệ của ngòi bút.

![image.png](https://images.viblo.asia/8e4d070c-3015-422e-9716-7f6797cce4ab.png)

<p align="center">Hình 9. Động tác thay đổi kích thước </p>

- Thay đổi màu vẽ: Vì số lượng màu sắc rất lớn, nên ta sẽ chỉ để một số màu sắc ở trên màn hình. Còn về động tác của việc chọn này, để đơn giản hóa, ta chỉ cần chọn động tác ngón tay trỏ và ngón tay giữa cùng hướng thẳng lên, để có thể tận dụng được module có sẵn của động tác vẽ.

![image.png](https://images.viblo.asia/d5d19320-1b7f-4142-9029-0ea3fe638bfc.png)

<p align="center">Hình 10. Động tác thay đổi màu vẽ </p>

- Xóa toàn bộ màn hình: Đây là một chức năng khá nhạy cảm, vì nếu lỡ tay hoặc bị detect sai là chúng ta sẽ mất hết toàn bộ bức tranh. Vì vậy, mình để động tác cụp tay xuống để tránh cả 2 trường hợp trên nhiều nhất có thể.

![image.png](https://images.viblo.asia/9ce7a713-9778-4bf5-b1de-3e4835fe49c8.png)

<p align="center">Hình 11. Động tác xóa toàn bộ màn hình </p>

- Di chuyển: Mình để tạm là 5 ngón tay giơ lên, vì có thể tiện dụng các chức năng khác.
    
Okayyy, vậy là chúng ta đã đề ra một số vấn đề cần xử lý và hướng giải quyết. Giờ ta sẽ bắt tay vào việc code nào!
    
## 2.2 Code:
### 2.2.1 Module File

Đây là file code chứa toàn bộ thông tin về các hàm module cần thiết để cấu thành nên ứng dụng của mình. Như đã viết ở trên, chúng ta cần một số hàm đặc trưng để nhận diện chức năng cụ thể. Đầu tiên, ta cần thiết lập một số điều kiện cho MediaPipe và lấy bộ công cụ cho Hands Detection, sau đó lấy toàn bộ thông tin vị trí của các điểm có skeleton tay để đưa vào tập `landmarksList`. `landmarksList`  được trả về có dạng là [landmarks, bbox], mỗi một landmarks có dạng là [id, x, y]. Từ đó, ta sẽ xây dựng ra các hàm để hiện thực hóa các ý tưởng đã kể ở trên. Một số hàm quan trọng như `fingersUp`: Check xem ngón tay nào đang giơ lên, `checkErase`: Check xem có ở động tác xóa toàn bộ không, `checkDraw`: Check xem có đang ở động tác vẽ không. Ví dụ về hàm `fingersUp` như sau:
```
def fingersUp(self):
        fingers = []
        # Thumb, we will compare x, not y
        if self.landmarksList[self.fingerTops[0]][1] > self.landmarksList[self.fingerTops[0] - 1][1]:
            fingers.append(1)
        else:
            fingers.append(0)

        # Other fingers, y will be taken
        for id in range(1, 5):
            if self.landmarksList[self.fingerTops[id]][2] < self.landmarksList[self.fingerTops[id] - 2][2]:
                fingers.append(1)
            else:
                fingers.append(0)

        return fingers
```
Toàn bộ source code mình để ở cuối bài, các bạn có thể tham khảo thêm ở file `handModule.py` trong repo nhé! Bây giờ, ta sẽ tới phần tiếp theo, phần main của ứng dụng.

### 2.2.2 Main

Đầu tiên, mình sẽ thiết lập một số hệ số tổng quan như, bao gồm màu sắc - độ lớn của ngòi vẽ ban đầu, các màu sắc có thể lựa chọn, kích thước cửa sổ và header. Ngoài ra, `imgCanvas` chính là cái "bảng" để chúng ta có thể vẽ lên, dùng để đè lên frame ảnh của video sau này để hiển thị cũng như lưu.

```
#######################
brushThickness = 1
drawColor = (255, 0, 255)
headerColor = [(255, 0, 255), (255, 255, 0), (0, 255, 255), (0, 0, 0)]
########################

# HD webcam will be (720, 1280, 3), sorry but my webcam support only for standard VGA :(
WINDOW_SIZE = (480, 640, 3)
HEADER_SIZE = (int(WINDOW_SIZE[1]), int(WINDOW_SIZE[0]/20))

imgCanvas = np.zeros(WINDOW_SIZE, np.uint8)
# print(WINDOW_SIZE[:-1]/4)
header = np.zeros(WINDOW_SIZE, np.uint8)
header[:] = headerColor[1]
# print(header.shape)
header[0:WINDOW_SIZE[0], 0:(WINDOW_SIZE[1]//4)] = headerColor[0]
header[0:WINDOW_SIZE[0], (WINDOW_SIZE[1]//4)
                          :(WINDOW_SIZE[1]//2)] = headerColor[1]
header[0:WINDOW_SIZE[0], (WINDOW_SIZE[1]//2)
                          :(WINDOW_SIZE[1]//4*3)] = headerColor[2]
header[0:WINDOW_SIZE[0], (WINDOW_SIZE[1]//4*3)
                          :(WINDOW_SIZE[1])] = headerColor[3]
header = cv2.resize(header, HEADER_SIZE)
```

Do camera của mình chỉ có độ phân giải là VGA (640x480) nên các bạn có thể chỉnh `WINDOW_SIZE` thành (720,1280,3) nếu webcam của bạn là HD. Tiếp theo, ta sử dụng OpenCV để truyền lấy video từ webcam, sau đó lấy từng frame và đưa vào module vừa xong để thu được `landmarksList`.  Sau đó, tương ứng với từng chức năng (số ngón tay đang giơ, check chế độ vẽ và tẩy), ta sẽ tiến hành kiểm tra qua các biến `fingers`, `checkDraw` và `checkErase`. 5 chức năng được mình code ngắn gọn như sau:

```
# 1. Handfree Mode - 5 finger up and nothing happends except for moving hands and pointer
if fingers[1] == 1 and fingers[2] == 1 and fingers[3] == 1 and fingers[4] == 1:
    xp, yp = 0, 0

# 2. Erase Mode - All fingers go down
elif checkErase:
    xp, yp = 0, 0
    imgCanvas = np.zeros(WINDOW_SIZE, np.uint8)

# 3. Thickness Changing Mode - Thumb and first finger go up
elif fingers[0] == 0 and fingers[1]:
    cv2.rectangle(img, (x1, y1 - 25),
                  (x2, y2 + 25), drawColor, cv2.FILLED)
    # print(abs(x1-x2)*(abs(y1-25-(y2+25))))
    calibrator = math.sqrt((x2-x3)**2+(y2-y3)**2)
    print(calibrator)
    brushThickness = max(
        int(abs(x1-x2)*(abs(y1-25-(y2+25)))/(calibrator*15)), 1)
    print(brushThickness)
    xp, yp = 0

# 4. Selection Color Mode - first and second fingers go up
elif fingers[1] and fingers[2]:
    xp, yp = 0, 0
    if y1 < HEADER_SIZE[1]:
        if 0 < x1 < WINDOW_SIZE[1]//4:
            drawColor = headerColor[0]
        elif WINDOW_SIZE[1]//4 < x1 < WINDOW_SIZE[1]//2:
            drawColor = headerColor[1]
        elif WINDOW_SIZE[1]//2 < x1 < WINDOW_SIZE[1]//4*3:
            drawColor = headerColor[2]
        elif WINDOW_SIZE[1]//4*3 < x1 < WINDOW_SIZE[1]:
            drawColor = headerColor[3]

# 5. Drawing Mode - Only first fingers go up
elif checkDraw:
    cv2.circle(img, (x1, y1), 15, drawColor, cv2.FILLED)
    if xp == 0 and yp == 0:
        xp, yp = x1, y1
    cv2.line(imgCanvas, (xp, yp), (x1, y1),
             drawColor, brushThickness)

    xp, yp = x1, y1
```
Sau cùng, ta chỉ cần lồng 2 frame là `img` và `imgCanvas` vào nhau để hiện thị lên màn hình. Ngoài ra, mình có tạo thêm 1 window tên `Trackbars` để theo dõi quá trình vẽ cũng như để dễ dàng lưu hơn. Ở đây mình dùng `cv2.add` để áp 2 frame vào, còn `np.hstack` để ghép 2 frame vào thành 1 frame gốc theo chiều ngang:
```
img = cv2.add(img, imgCanvas)
# Optionally stack both frames and show it.
stacked = np.hstack((imgCanvas, img))
cv2.imshow('Trackbars', cv2.resize(stacked, None, fx=0.6, fy=0.6))
img[(WINDOW_SIZE[1]-HEADER_SIZE[0]):HEADER_SIZE[1],
    (WINDOW_SIZE[1]-HEADER_SIZE[0]):WINDOW_SIZE[1]] = header
cv2.imshow("Image", img)
```
Và để lưu lại thành quả của mình, ta sẽ thiết lập nút Spacebar để lưu frame vẽ (không phải frame đã được ghép) vào 1 file có đường dẫn là `pics/`. Done, vậy là chúng ta đã xong một ứng dụng đơn giản chỉ với 2 file code ngắn gọn rồi. Để minh họa, mình có để một chiếc video demo đơn giản ở ngay dưới đây.

{@embed: https://www.youtube.com/watch?v=bHFlErMTUg0}

# 3. Tổng kết:
MediaPipe là một công cụ rất mạnh mẽ, có thể sử dụng một cách dễ dàng và đa nền tảng. Rất nhiều các cá nhân và tổ chức đã sử dụng bộ công cụ này để tối ưu các tác vụ liên quan tới lĩnh vực Computer Vision của mình bởi những điểm mạnh của nó. Ở trên, mình đã ví dụ cho các bạn về một ứng dụng của MediaPipe trong việc sử dụng Hands Gestures trong việc vẽ hình. Source code mình để ở đây: https://github.com/pewdspie24/Hands_Gestures_MediaPipe

Bài viết chắc chắn sẽ còn nhiều thiếu sót, rất mong nhận được góp ý của mọi người để bài viết trở nên tốt hơn. Cảm ơn các bạn đã theo dõi và đọc bài của mình, nếu các bạn thấy bài viết hay thì có thể cho mình 1 upvote và 1 bookmark nha. See ya!

# 4. Tài liệu tham khảo:
*  [MediaPipe](https://github.com/google/mediapipe)
*  [MediaPipe Page](https://mediapipe.dev/)