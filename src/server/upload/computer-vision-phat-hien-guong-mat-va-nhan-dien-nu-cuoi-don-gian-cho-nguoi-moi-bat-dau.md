![](https://images.viblo.asia/2ce0132d-e67d-4808-a71c-6d99eb4ae2f4.PNG)
# Giới thiệu
#### Phát hiện gương mặt là một bài toán không còn mấy xa lạ trong giới computer vision, so với trước đây việc triển khai các thuật toán để phát hiện gương mặt một các thủ công phức tạp thì giờ đã có các thư viện có sẵn, đủ dễ dàng để những người mới vào cũng có thể bắt tay thực hiện, nhưng ta sẽ bị phụ thuộc vào phạm vi dữ liệu của các thư viện cung cấp cho chúng ta các mô hình nhận diện được đào tạo sẵn thế nên nếu bạn có nhu cầu mở rộng khả năng nhận diện hay tùy chỉnh nhận diện theo ý thích thì hãy đọc ngay bài viết chi tiết về cách mà hệ thống nhận diện gương mặt hoạt động của tác giả [Phạm Thu Hằng](https://viblo.asia/p/he-thong-nhan-dien-guong-mat-hoat-dong-nhu-the-nao-6J3ZgOaPZmB) nhé ! Còn ngay dưới đây sẽ là phần hướng dẫn cho các bạn mới bắt đầu, muốn làm ra thứ gì đó hay ho ngay và luôn. Mình sẽ chọn một đề tài thật nhân văn "Nụ cười" :laughing: theo hướng đơn giản và thú vị :heart:

# Ý tưởng
Ý tưởng ở đây đó là, thay vì dùng các thuật toán cao siêu như Machine Learning hay Deep Learning để phân loại thì chúng ta sẽ dựa vào cách xác định gương mặt rồi đến là khung miệng của người đó, tiếp nữa là ta sẽ dùng toán để tính toán vài thứ nhằm xác định hình dạng khung miệng, từ đó mà đặt ngưỡng phát hiện nụ cười  :heart:
#### Nhưng trước tiên các bạn lưu ý nên tra cứu, trang bị kiến thức cơ bản về python và một chút toán về đồ thị để theo dõi bài một cách rành mạch nhất nhé !
# Phần Toán
    Về phần toán hy vọng các bạn nắm được các công thức sau:
* Công thức tính khoảng cách hai điểm trong đồ thị (Dùng công thức độ dài vector)
 [Tham khảo tại đây](https://www.wikihow.vn/T%C3%ADnh-%C4%91%E1%BB%99-l%E1%BB%9Bn-c%E1%BB%A7a-v%C3%A9c-t%C6%A1)
* Công thức tính điểm trung bình đoạn thẳng \
 (x_tb, y_tb) = $( \frac{(x1+x2)}{2} ,\frac{(y1+y2)}{2} )$

# Phần code
#### Các bạn cần cài đặt các thư viện như sau (cài python hoàn chỉnh đã rồi cài các thư viện này sau nhé :sweat_smile: ):
   * Thư viện Dlib
   `pip install dlib`
   * Thư viện Opencv
   `pip install opencv-python`
   * Tải sẵn file shape_predictor_68_face_landmarks.dat [tại đây](https://drive.google.com/file/d/13OZVVPDcmIIBFIo4yqdEL_cK0A7Gik5A/view?usp=sharing) \
    Phòng các bạn muốn biết cái file này là gì, liệu mình có phải đưa virus cho bạn hay không thì đây là thứ mà nó tạo nên nhé : \
            ![Công dụng của file này là xác định 68 điểm trên gương mặt của bạn đấy](https://scontent.fdad4-1.fna.fbcdn.net/v/t1.0-9/71720201_392247348363407_1973497817078956032_n.jpg?_nc_cat=102&_nc_oc=AQl85bjKlL6O4Kn6VOBOhzI5d0tHUvsO_Ig-PghlvEgbNvSlMwh6ylxyUHjJ12QF0kE&_nc_ht=scontent.fdad4-1.fna&oh=e5993f713c946bc1fb1d062d092fb722&oe=5E59A550) \
     Mỗi điểm trắng trên ảnh là một mốc ứng với mặt của bạn, tác dụng của file này sẽ cung cấp cho ta một mô hình xác định 68 điểm cột mốc trên gương mặt, ta sẽ sử dụng những cột mốc !
 #### Chiến code nào:
 ##### Thêm các thư viện đã cài đặt vào code
 ```python
import dlib
import cv2
from math import sqrt
```
##### Load file  shape_predictor_68_face_landmarks.dat và xử dụng thư viện dlib để phát hiện gương mặt nào
```python
predictor = dlib.shape_predictor('./shape_predictor_68_face_landmarks.dat')
detector = dlib.get_frontal_face_detector() # gọi hàm phát hiện gương mặt trong thư viện dlib
```
##### Bật tính năng real-time opencv lên nào
```python
vs = cv2.VideoCapture(0)
while True:
```
##### Tiến hành lấy từng khung hình (frame) vào nào ! (Một đoạn video hay một đầu vào từ webcam là chuỗi các khung hình nên chúng ta cần lấy từng khung hình vào xử lý)
```python
check, frame = vs.read()
```
#### Đổi màu cho khung hình đầu vào - điều này là bắt buộc, bởi ảnh xám (trắng đen) là đầu vào cho mô hình xác định cột mốc được đào tạo sẵn do chúng ta tải về (file  shape_predictor_68_face_landmarks.dat) và đồng thời là đầu vào của hàm phát hiện gương mặt trong thư viện dlib
```python
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
```
##### Để vẽ được khung xác định gương mặt chúng ta sẽ tương tác với hàm phát hiện gương mặt của dlib như sau
```python
for rect in dets:
        x = rect.left()
        y = rect.top()
        w = rect.right()
        h = rect.bottom()
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 1)
 ```
 ##### Đến giờ "đục lỗ" trên gương mặt chúng ta rồi :laughing:
 ```python
 landmark = predictor(gray, rect)
 ```
 ##### Tiếp đến chúng ta sẽ khởi tạo một mảng, mảng này mang nhiệm vụ lưu trữ tọa độ 2D của các cột mốc từ 60 đến 68 ( đây là các cột mốc xác định khung miệng, một nụ cười có thể dễ dàng vẽ qua hình dạng miệng, nên lựa chọn này sẽ vừa dễ và khá tốt cho sự đơn giản :grin: )
 ```python
 # Xác định facial landmark trên khuôn mặt
        for k, d in enumerate(landmark.parts()):
            #xác định khung miệng
            if(k>=60 and k<=68):
                lines.append((d.x,d.y))
  ```
  #### Rồi, giờ chúng ta sẽ tiến hành xác định tính toán (các bạn lưu ý là phần này vì để làm cho các bạn thấy rõ mình đã tính toán như thế nào, nên mình mới vẽ thẳng lên ảnh, còn trong lúc quá trình chạy thật sự, các bạn không cần phải cho nó vẽ lên, nên mãn nguồn mình đưa tất cả chỉ phục vụ cho xử lý ngầm thôi, không có hàm kèm hàm vẽ)
  1. Chúng ta xác định một đường nối giữa 2 đầu mép môi \
  ![Hai đầu mép môi](https://scontent.fdad4-1.fna.fbcdn.net/v/t1.15752-9/75418871_2119463765015374_6743885114771505152_n.png?_nc_cat=105&_nc_oc=AQmUnBcWIlgQO17Ju3KJT7_KCqs7Onh7-IALJg_MOvlycr2eD860RvAgsr9rK3xma_A&_nc_ht=scontent.fdad4-1.fna&oh=44d78c4b9ca72971507472dbb55c64f9&oe=5E4A1213)
  2. Tìm điểm trung bình của đường  nối giữa 2 mép môi này 
  ```python
   #tìm điểm trung bình line
        x_line = round((lines[4][0]+lines[0][0])/2)
        y_line = round((lines[4][1]+lines[0][1])/2)
   ```
  ![Điểm trung bình line nối hai đầu mép môi](https://scontent.fdad4-1.fna.fbcdn.net/v/t1.15752-9/73685239_2728876447163023_3629767635983400960_n.png?_nc_cat=102&_nc_oc=AQnlkHjl1KmCelcVHjh617fmaToFFcvy0AHwH_GQOXKkyObIkoG6FZl16Q_JKtHAfOs&_nc_ht=scontent.fdad4-1.fna&oh=2c6fc9afbe852643e370a2cb4903f923&oe=5E5F66E3)
   3. Tìm điểm trung bình của đường  nối giữa 2 mép môi này
  ```python
        #tính toán khoảng cách

        # Khoảng cách đến môi trên
        u_x = (lines[2][0]-x_line)*(lines[2][0]-x_line)
        u_y = (lines[2][1]-y_line)*(lines[2][1]-y_line)

        # Khoảng cách đến môi dưới
        d_x = (lines[6][0]-x_line)*(lines[6][0]-x_line)
        d_y = (lines[6][1]-y_line)*(lines[6][1]-y_line)
```
4. Kết luận với hạn mức đặt ra, ở đây mình tính độ chênh lệch giữa khoảng cách môi trên và dưới (Việc tính độ chênh lệch này sẽ cho ta biết liệu người kia có cười không - đa số nụ cười thường sẽ nhe răng dù ít hay nhiều  thì điều này sẽ làm thay đổi việc độ chênh lệch giữa điểm trung bình của đường nối giữa hai mép môi với đỉnh môi trên và dưới và thường độ lệch này sẽ là điểm trung bình kia sẽ gần với đỉnh môi trên hơn là đỉnh môi dưới, ta sẽ lấy quy tắc này để xác định nụ cười)
 ```python
        #kết luận
        if sqrt(u_x+u_y) < sqrt(d_x+d_y):
            cv2.putText(frame, 'Happy', (50,50), cv2.FONT_HERSHEY_SIMPLEX , 1, (255, 0, 0) , 2, cv2.LINE_AA) 
        elif sqrt(u_x+u_y) > sqrt(d_x+d_y): # bonus thêm cho các bạn cả hai cảm xúc khác =)))
            if sqrt(u_x+u_y) - sqrt(d_x+d_y) >= 1: #tính độ chênh lệch ( độ chênh lệch tương đương khoảng cách đỉnh môi trên và dưới. Lưu ý : Điểu chỉnh điều kiện để tạo độ nhạy sau dấu >= !)
                cv2.putText(frame, 'Sad', (50,50), cv2.FONT_HERSHEY_SIMPLEX , 1, (255, 0, 0) , 2, cv2.LINE_AA) 
            else:
                cv2.putText(frame, 'Normal', (50,50), cv2.FONT_HERSHEY_SIMPLEX , 1, (255, 0, 0) , 2, cv2.LINE_AA)
 ```
 ##### Done, thế là ta đã xong chương trình
 # Tổng chương trình
 ```python
 import dlib
import cv2
from math import sqrt
predictor = dlib.shape_predictor('./shape_predictor_68_face_landmarks.dat')
detector = dlib.get_frontal_face_detector() #Load face detector
vs = cv2.VideoCapture(0)
while True:
    check, frame = vs.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    dets = detector(gray, 0)  #Xác định vị trí khuôn mặt trong bức ảnh    
    for rect in dets:
        x = rect.left()
        y = rect.top()
        w = rect.right()
        h = rect.bottom()
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 1)		
        landmark = predictor(gray, rect)
        lines = []
        # Xác định facial landmark trên khuôn mặt
        for k, d in enumerate(landmark.parts()):
            #xác định khung miệng
            if(k>=60 and k<=68):
                lines.append((d.x,d.y))

        #tìm điểm trung bình line
        x_line = round((lines[4][0]+lines[0][0])/2)
        y_line = round((lines[4][1]+lines[0][1])/2)

        #tính toán khoảng cách

        # Khoảng cách đến môi trên
        u_x = (lines[2][0]-x_line)*(lines[2][0]-x_line)
        u_y = (lines[2][1]-y_line)*(lines[2][1]-y_line)

        # Khoảng cách đến môi dưới
        d_x = (lines[6][0]-x_line)*(lines[6][0]-x_line)
        d_y = (lines[6][1]-y_line)*(lines[6][1]-y_line)

        #kết luận
        if sqrt(u_x+u_y) < sqrt(d_x+d_y):
            cv2.putText(frame, 'Happy', (50,50), cv2.FONT_HERSHEY_SIMPLEX , 1, (255, 0, 0) , 2, cv2.LINE_AA) 
        elif sqrt(u_x+u_y) > sqrt(d_x+d_y):
            if sqrt(u_x+u_y) - sqrt(d_x+d_y) >= 1: #tính độ chênh lệch ( độ chênh lệch tương đương khoảng cách đỉnh môi trên và dưới. Lưu ý : Điểu chỉnh điều kiện để tạo độ nhạy !
                cv2.putText(frame, 'Sad', (50,50), cv2.FONT_HERSHEY_SIMPLEX , 1, (255, 0, 0) , 2, cv2.LINE_AA) 
            else:
                cv2.putText(frame, 'Normal', (50,50), cv2.FONT_HERSHEY_SIMPLEX , 1, (255, 0, 0) , 2, cv2.LINE_AA)

        cv2.line(frame, (lines[0][0],lines[0][1]) , (lines[4][0],lines[4][1]), (193, 42, 77), 2)
        cv2.circle(frame, (x_line, y_line), 5, (0, 0, 255), -1)
    cv2.imshow('Face video', frame)
    key = cv2.waitKey(1)
    if key == ord('q'):
        break
cv2.destroyAllWindows
```
Chúc các bạn thành công và luôn tìm được niềm vui trong lúc học về computer vision nhé :heart_eyes: