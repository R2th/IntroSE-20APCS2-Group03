Trong hướng dẫn OpenCV với Python này, chúng ta sẽ thảo luận về phát hiện đối tượng với Haar Cascades. Chúng ta sẽ tìm cách để phát hiện khuôn mặt và mắt nhé . Để thực hiện nhận dạng / phát hiện đối tượng với các tệp data có sẵn, trước tiên bạn cần chuẩn bị nguồn data có sẵn đó. Chúng ta có thể lấy các tập data phổ biến, những data này đã tồn tại hoặc có sẵn ở đâu đó để tiện hơn trong việc làm trong ví dụ này . Ví dụ, phát hiện những thứ như khuôn mặt, xe hơi, nụ cười, đôi mắt và biển số xe đều khá phổ biến và có data rất nhiều nguồn ở trên mạng rồi nhé. 
# I. Giới thiệu.
Đầu tiên, tôi sẽ chỉ cho bạn cách sử dụng các tập tin này, sau đó tôi sẽ chỉ cho bạn cách bắt tay vào việc tạo các lớp riêng của riêng bạn, để bạn có thể phát hiện bất kỳ đối tượng nào bạn muốn, điều này thật tuyệt vời đúng không ! 

Bạn có thể sử dụng Google để tìm các Haar Cascades khác nhau về những thứ mà bạn muốn phát hiện. Bạn không nên gặp quá nhiều khó khăn khi tìm các loại đã nói ở trên. Chúng ta sẽ sử dụng một [Face Cascades](https://github.com/opencv/opencv/blob/master/data/haarcascades/haarcascade_frontalface_default.xml) và [Eye Cascades](https://github.com/opencv/opencv/blob/master/data/haarcascades/haarcascade_eye.xml) để demo cho các bạn. Lưu ý giấy phép sử dụng / phân phối các Haar Cascades này.

# II. Haar Cascade Object Detection Face & Eye

## 1. Hướng dẫn.

Hãy bắt đầu mã của chúng tôi. Tôi giả sử bạn đã tải xuống haarcascade_eye.xml và haarcascade_frontalface_default.xml từ các liên kết ở trên và có các tệp này trong thư mục dự án của bạn.

```
import numpy as np
import cv2

# multiple cascades: https://github.com/Itseez/opencv/tree/master/data/haarcascades

#https://github.com/Itseez/opencv/blob/master/data/haarcascades/haarcascade_frontalface_default.xml
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
#https://github.com/Itseez/opencv/blob/master/data/haarcascades/haarcascade_eye.xml
eye_cascade = cv2.CascadeClassifier('haarcascade_eye.xml')

cap = cv2.VideoCapture(0)
```

Ở đây, chúng tôi bắt đầu với nhập cv2 và numpy, sau đó chúng tôi đưa vào face và eye cascades. Bước đầu tiên khá là đơn giản đúng không ?

```
while 1:
    ret, img = cap.read()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
```

Bây giờ chúng ta bắt đầu vòng lặp với while, điều mới duy nhất ở đây là việc tạo ra khung cho các khuôn mặt. Để biết thêm thông tin, hãy truy cập [tài liệu cho chức năng dò tìmMultiScale](https://docs.opencv.org/2.4/modules/objdetect/doc/cascade_classification.html#cascadeclassifier-detectmultiscale). Về cơ bản, nó tìm thấy khuôn mặt! Chúng ta cũng muốn tìm thấy đôi mắt, nhưng trong thực tế thì người ta không tìm trực tiếp đôi mắt, việc tìm kiếm đôi mắt sẽ phức tạp hơn so với việc tìm ra khuôn mặt và nhận diện đôi mắt thông qua vùng màu da trên khuôn mặt đó. Hầu hết các phát hiện mắt sử dụng vùng da xung quanh, mí mắt, lông mi và lông mày để thực hiện phát hiện. Vì vậy, bước tiếp theo của chúng tôi là tìm ra  các khuôn mặt trước, trước khi đến mắt:

```
    for (x,y,w,h) in faces:
        cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = img[y:y+h, x:x+w]
```

Ở đây, chúng tôi đang tìm kiếm khuôn mặt, kích thước của chúng, vẽ hình chữ nhật và lưu ý ROI. Tiếp theo, chúng tôi detect ra mắt ở  trên khuôn mặt đó : 

```
        eyes = eye_cascade.detectMultiScale(roi_gray)
        for (ex,ey,ew,eh) in eyes:
            cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,255,0),2)
```

Nếu chúng ta tìm thấy chúng, chúng ta sẽ tiếp tục và tạo thêm một số hình chữ nhật. Tiếp theo chúng ta sẽ kết thúc việc nhận diện và return kết qủa :

```
    cv2.imshow('img',img)
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

cap.release()
cv2.destroyAllWindows()
```

Full code:

```
import numpy as np
import cv2

# multiple cascades: https://github.com/Itseez/opencv/tree/master/data/haarcascades

#https://github.com/Itseez/opencv/blob/master/data/haarcascades/haarcascade_frontalface_default.xml
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
#https://github.com/Itseez/opencv/blob/master/data/haarcascades/haarcascade_eye.xml
eye_cascade = cv2.CascadeClassifier('haarcascade_eye.xml')

cap = cv2.VideoCapture(0)

while 1:
    ret, img = cap.read()
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    for (x,y,w,h) in faces:
        cv2.rectangle(img,(x,y),(x+w,y+h),(255,0,0),2)
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = img[y:y+h, x:x+w]
        
        eyes = eye_cascade.detectMultiScale(roi_gray)
        for (ex,ey,ew,eh) in eyes:
            cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,255,0),2)

    cv2.imshow('img',img)
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

cap.release()
cv2.destroyAllWindows()
```

## 2. Kết quả.

Kết quả:

![](https://images.viblo.asia/c714000e-2b9b-48b4-af97-48ec53c11f63.png)

# IV. Tổng Kết .

Ok, việc phát hiện khuôn mặt, mắt hay xe hơi, quả bóng là ổn, nhưng chúng ta là những lập trình viên. Chúng ta muốn có thể làm bất cứ điều gì. Vì vậy chúng ta cần hiểu sâu hơn, mọi thứ có thể trở nên khó hiểu và khó khăn hơn để xây dựng Haar Cascades của riêng bạn, như việc chúng ta đang sử dụng các tệp xml cuả những người khác làm ra nó ... và bạn cũng có thể! Đó là những gì cũng được nói về trong hướng dẫn tiếp theo.

# V. Tài liệu tham khảo.
Bài việt được dịch từ các nguồn bên dưới. Mục đích để học tập . Chúc các bạn thành công .
http://docs.opencv.org/

https://techmaster.vn/

https://pythonprogramming.net/

Chờ bài viết tiếp theo nhé các bạn.