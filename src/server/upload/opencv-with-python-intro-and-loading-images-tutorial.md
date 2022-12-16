Ở đây Chúng ta sẽ cần ba thư viện chính là python-OpenCV, Numpy và Matplotlib.

Đầu tiên, chúng ta nên hiểu một vài giả định cơ bản về mô hình khi nói đến phân tích hình ảnh và video. Với cách làm là về tất cả các bản ghi máy quay video ngày nay, bản ghi thực sự là khung hình. Tuy nhiên, chúng là các khung tĩnh, giống như hình ảnh. Do đó, nhận dạng hình ảnh và phân tích video sử dụng các phương pháp giống nhau cho hầu hết các phần. Một số thứ như theo dõi định hướng sẽ yêu cầu một loạt các hình ảnh, hoặc nhận dạng đối tượng có thể được thực hiện với hầu như cùng một mã chính xác trên hình ảnh và video. Ví dụ về lọc màu mà phát hiện đường biên ở hình bên dưới.

Lọc màu:
![](https://images.viblo.asia/33199f99-74e5-47ae-8220-7e9b226fe4ac.jpg)

Phát hiện đường biên:
![](https://images.viblo.asia/884b1b3c-e091-4f82-a7f9-05497cf1c6b4.png)

Trong trường hợp phát hiện đường biên, màu đen tương ứng với các giá trị pixel là (0,0,0) và các đường màu trắng là (255,255,255). Mỗi hình ảnh và khung hình từ video đều phân tách thành các pixel như thế này và chúng ta có thể suy ra như trong trường hợp phát đường biên, nơi các cạnh được dựa trên các pixel màu trắng được so sánh với màu đen. Sau đó, nếu chúng ta muốn xem hình ảnh gốc với các cạnh được đánh dấu, chúng ta lưu ý tất cả vị trí tọa độ của các pixel trắng và sau đó đánh dấu các vị trí này trên hình ảnh hoặc video trên nguồn cấp dữ liệu gốc.

```
import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('watch.jpg',cv2.IMREAD_GRAYSCALE)
cv2.imshow('image',img)
cv2.waitKey(0)
cv2.destroyAllWindows()
```

Đầu tiên, chúng ta nhập các mô-đun mà bạn đã cài đặt. Tiếp theo, chúng ta định nghĩa img là cv2.read (tệp hình ảnh, parm). Mặc định sẽ là IMREAD_COLOR, là màu không có bất kỳ kênh alpha nào. Alpha là mức độ mờ nhạt. Nếu bạn cần giữ lại kênh alpha, bạn cũng có thể sử dụng IMREAD_UNCHANGED. Bạn sẽ được đọc trong phiên bản màu, và sau đó chuyển đổi nó thành màu xám. Nếu bạn không có webcam, đây sẽ là phương pháp chính bạn sẽ sử dụng trong suốt hướng dẫn này.

Thay vì sử dụng IMREAD_COLOR ... v.v, bạn cũng có thể sử dụng các số đơn giản. Bạn nên biết sử dụng với cả hai lựa chọn, vì vậy bạn hiểu những gì người đó đang làm. Đối với tham số thứ hai, bạn có thể sử dụng -1, 0 hoặc 1. Màu là 1, thang độ xám là 0 và giá trị không đổi là -1. Do đó, đối với thang độ xám, ta có thể coi img = cv2.imread ('watch.jpg', 0).

Sau khi tải, chúng ta sử dụng cv2.imshow để hiển thị hình ảnh. Từ đây, chúng ta sử dụng cv2.waitKey (0). Khi đã xong, chúng ta sử dụng cv2.destroyAllWindows () để đóng tất cả.

Như đã đề cập trước đây, bạn cũng có thể hiển thị hình ảnh với Matplotlib, dưới đây là một số mã bạn có thể làm:

```
import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('watch.jpg',cv2.IMREAD_GRAYSCALE)

plt.imshow(img, cmap = 'gray', interpolation = 'bicubic')
plt.xticks([]), plt.yticks([])  # to hide tick values on X and Y axis
plt.plot([200,300,400],[100,200,300],'c', linewidth=5)
plt.show()
```

Lưu ý rằng bạn có thể vẽ các dòng, giống như bạn có thể làm với bất kỳ biểu đồ Matplotlib khác bằng cách sử dụng các vị trí pixel làm tọa độ. Nếu bạn muốn vẽ trên hình ảnh của bạn thì Matplotlib là không cần thiết. Khi bạn hoàn tất việc sửa đổi, bạn có thể lưu, như vậy:

```
cv2.imwrite('watchgray.png',img)
```

Làm cách nào để tải nguồn cấp dữ liệu video? Dưới đây, tôi sẽ chỉ cách tải trong nguồn cấp dữ liệu webcam hoặc video.

Trong OpenCV tôi sẽ giới thiệu một số thao tác cơ bản với video và webcam. Ngoài các dòng bắt đầu, việc xử lý khung hình từ một video giống hệt với việc xử lý hình ảnh, ví dụ:

```
import numpy as np
import cv2

cap = cv2.VideoCapture(0)
 
while(True):
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
 
    cv2.imshow('frame',gray)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

Đầu tiên, ta nhập numpy và cv2, tiếp theo, chúng ta lấy cap = cv2.VideoCapture (0). Thao tác này sẽ trả lại video từ webcam đầu tiên trên máy tính của bạn.

```
while(True):
    ret, frame = cap.read()
```

Đoạn mã này khởi tạo một vòng lặp vô hạn. Trong đó chúng ta có ret và frame được định nghĩa là cap.read (). Về cơ bản, ret là một boolean liên quan đến việc có hay không có một sự lặp lại nào,

```
gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
```

Ở đây, chúng ta xác định một biến mới. Chú ý BGR2GRAY. Điều quan trọng cần lưu ý là OpenCV đọc các màu ví dụ như BGR (Blue Green Red), nơi mà hầu hết các ứng dụng máy tính đọc là RGB (Red Green Blue).
```
 cv2.imshow('frame',gray)
```

Mặc dù là một luồng video, chúng ta vẫn sử dụng imshow. Ở đây, ta đang hiển thị nguồn cấp dữ liệu được chuyển đổi thành màu xám. Nếu bạn muốn hiển thị cả hai cùng một lúc, bạn có thể làm imshow cho khung ban đầu, và imshow cho màu xám và hai cửa sổ sẽ xuất hiện.

```
 if cv2.waitKey(1) & 0xFF == ord('q'):
        break
```
Câu lệnh này chỉ chạy một lần trên mỗi khung hình. Về cơ bản, nếu chúng ta lấy một khóa, và khóa đó là q, chúng ta sẽ thoát khỏi vòng lặp while với một ngắt, sau đó chạy:

```
cap.release()
cv2.destroyAllWindows()
```

Giải phóng webcam này, sau đó đóng tất cả các cửa sổ imshow ().

Trong một số trường hợp, bạn có thể thực sự muốn ghi lại và lưu bản ghi vào một tệp mới. thì ta làm như sau

```
import numpy as np
import cv2

cap = cv2.VideoCapture(1)
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('output.avi',fourcc, 20.0, (640,480))

while(True):
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    out.write(frame)
    cv2.imshow('frame',gray)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
out.release()
cv2.destroyAllWindows()
```
Chủ yếu cần lưu ý ở đây là codec được sử dụng và thông tin đầu ra được xác định trước vòng lặp while. Sau đó, trong vòng lặp while, chúng ta sử dụng out.write () để xuất khung. Bên ngoài vòng lặp while, sau khi chúng ta phát hành webcam của mình, thì nó cũng xuất ra.

Tài liệu tham khảo: https://pythonprogramming.net/loading-images-python-opencv-tutorial/