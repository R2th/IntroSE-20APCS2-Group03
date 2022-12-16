![Real time object detection](https://images.viblo.asia/85214c38-6295-48c9-9831-c4610aaa918f.jpg)
# **Object Detection**
Một trong những lĩnh vực quan trọng và có xu hướng phát triển mạnh mẽ của Trí tuệ nhân tạo (Artificial Intelligence) là thị giác máy (Computer Vision). Computer Vision là một lĩnh vực bao gồm các phương pháp thu nhận, xử lý ảnh kỹ thuật số, phân tích và nhận dạng các hình ảnh, phát hiện các đối tượng, tạo ảnh, siêu phân giải hình ảnh và nhiều hơn vậy. Object Detection có lẽ là khía cạnh sâu sắc nhất của thị giác máy do số lần sử dụng trong thực tế.

Object Detection đề cập đến khả năng của hệ thống máy tính và phần mềm để định vị các đối tượng trong một hình ảnh và xác định từng đối tượng. Object Detection đã được sử dụng rộng rãi để phát hiện khuôn mặt, phát hiện xe, đếm số người đi bộ, hệ thống bảo mật và xe không người lái. Có nhiều cách để nhận diện đối tượng có thể được sử dụng cũng như trong nhiều lĩnh vực thực hành. Giống như mọi công nghệ khác, một loạt các ứng dụng sáng tạo và tuyệt vời của Object Detection sẽ đến từ các lập trình viên và các nhà phát triển phần mềm.

Bắt đầu sử dụng các phương pháp nhận diện đối tượng hiện đại trong các ứng dụng và hệ thống, cũng như xây dựng các ứng dụng mới dựa trên các phương pháp này.Việc triển nhận diện đối tượng sớm liên quan đến việc sử dụng các thuật toán cổ điển, giống như các thuật toán được hỗ trợ trong OpenCV, thư viện computer vision phổ biến. Tuy nhiên, các thuật toán cổ điển này không thể đạt được hiệu suất đủ để làm việc trong các điều kiện khác nhau.

Việc áp dụng đột phát và nhanh cóng của deep learning vào năm 2012 đã đưa vào sự tồn tại các thuật toán và phương pháp phát hiện đối tượng hiện đại và chính xác cao như R-CNN, Fast-RCNN, Faster-RCNN, RetinaNet và nhanh hơn nhưng rất chính xác như SSD và YOLO. Sử dụng các phương pháp và thuật toán này, dựa trên deep learning và cũng dựa trên việc học máy đòi hỏi rất nhiều kiến thức về toán học và việc học sâu. Có hàng triệu chuyên gia lập trình và các nhà phát triển phần mềm muốn tích hợp và tạo ra các sản phẩm mới sử dụng object detection. Nhưng công nghệ này xa tầm tay của họ và phức tạp để hiểu và sử dụng thực tế của nó.

ImageAI, một thư viện python cho phép các lập trình viên và các nhà phát triển phần mềm dễ dàng tích hợp các công nghệ thị giác máy hiện đại vào các ứng dụng hiện có và mới của họ, và chỉ cần sử dụng một vài dòng mã. ImageAI hỗ trợ một danh sách các thuật toán học máy hiện đại nhất cho việc dự đoán hình ảnh, nhận diện vật thể, phát diện video,...
( Trích dẫn từ bài viết của tác giả [Nguyễn Trung Hiếu](https://viblo.asia/p/computer-vision-object-detection-nhan-dien-vat-the-chi-voi-10-dong-code-su-dung-imageai-naQZRbdjZvx) )
Tuy nhiên về phía ImageAI, trong [doc git](https://viblo.asia/p/computer-vision-object-detection-nhan-dien-vat-the-chi-voi-10-dong-code-su-dung-imageai-naQZRbdjZvx)  của thư viện và trong các tutorial chỉ tập trung vào cho chạy nhận diện các object với nguồn vào là video hoặc là ảnh, thật khó để tìm thấy một bài hướng dẫn (theo hiểu biết của mình :sweat_smile: )nào sử dụng ImageAI chạy real-time. Vậy nên hôm nay mình sẽ hướng dẫn các bạn làm một project real-time object detection chỉ vọn vẹn trong 29 dòng lệnh ( Mọi giải thích cụ thể từng phần, mời bạn đọc bài của anh [Nguyễn Trung Hiếu](https://viblo.asia/p/computer-vision-object-detection-nhan-dien-vat-the-chi-voi-10-dong-code-su-dung-imageai-naQZRbdjZvx)  )
# **Cài đặt**
Để thực hiện nhận diện đối tượng bằng ImageAI, tất cả những gì bạn cần làm là:
   * Cài đặt python
   * Cài đặt ImageAI và phụ thuộc của nó.
   * Tải xuống file mô hình Object Detection
   * Chạy chương trình
    
Bây giờ, hãy bắt đầu:
   * Tải xuống và cài đặt python 3 từ https://python.org
   * Tensorflow 1.4.0 (and later versions) \
        `pip3 install --upgrade tensorflow`
   * Numpy 1.13.1 (and later versions) \
        `pip3 install numpy`
   * SciPy 0.19.1 (and later versions) \
        `pip3 install scipy`
   * pip3 install opencv-python \
        `pip3 install opencv-python`
   * Pillow \
        `pip3 install pillow`
   * Matplotlib \
        `pip3 install matplotlib` 
   * h5py \
        `pip3 install h5py` 
   * Keras 2.x \
         `pip3 install keras` 
   * ImageAI \
        `pip install https://github.com/OlafenwaMoses/ImageAI/releases/download/2.0.1/imageai-2.0.1-py3-none-any.whl`
   * Cuối cùng là tải xuống mô hình YOLOv3 sẽ được sử dụng để nhận diện các đối tượng tại [đây](https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/yolo.h5) 
#### Mọi thứ đã sẵn sàng, bây giờ hãy tạo một tệp tin python là <file name>.py . Sao chép file mô hình yolo.h5 và hình ảnh mà bạn muốn phát hiện vào thư mục chứa file bạn đã tạo.
![file vừa tạo phải chung thư mục với file yolo](https://images.viblo.asia/38ce1ae2-e4a6-4159-b969-2a8af057b973.PNG)
#### Nhập vào file đã tạo dòng mã sau:
```python
# Thêm thư viện vào
from imageai.Detection import ObjectDetection
import os
import cv2

# cài đặt
execution_path = os.getcwd()
detector = ObjectDetection()
detector.setModelTypeAsYOLOv3()
custom_objects = detector.CustomObjects(person=True) # tùy chỉnh các vật thể muốn nhận diện tại đây theo công thức <tên vật thể> = True
detector.setModelPath(os.path.join(execution_path , "yolo.h5"))
detector.loadModel(detection_speed="fastest") # tùy chỉnh các mô hình tốc độ nhận diện từ "normal"(default), "fast", "faster" , "fastest" and "flash"

# chạy
vs = cv2.VideoCapture(0)
while True:
    check, frame = vs.read()
    cv2.imwrite("imageinp.jpg", frame)
    detections = detector.detectCustomObjectsFromImage(custom_objects=custom_objects, input_image=os.path.join(execution_path , "imageinp.jpg"), output_image_path=os.path.join(execution_path , "imagenew.jpg"), minimum_percentage_probability=20)
    for eachObject in detections:
        print(eachObject["name"] , " : ", eachObject["percentage_probability"], " : ", eachObject["box_points"] )
        print("--------------------------------")
    img = cv2.imread('imagenew.jpg')
    cv2.imshow('frame', img)
    key = cv2.waitKey(1)
    if key == ord("q"):
            break
cv2.destroyAllWindows()
vs.stop()
 ```
    
# **Ý tưởng**
Ý tưởng của đoạn code này nằm ở chỗ sử dụng việc nhận diện từng tấm ảnh của ImageAI nhưng được kết hợp với opencv liên tục chụp lấy các khung ảnh và lưu vào một file, file này sau đó được truyền vào trong hàm `detector.detectCustomObjectsFromImage` để nhận diện rồi trả đầu ra là file ảnh mới, file này lại được opencv liên tục gọi show lên. Vì thế nên tốc độ mô hình càng chậm thì sẽ dẫn đến việc các ảnh load không mượt mà, khuyến nghị nên chọn `faster` để đảm bảo vừa nhanh, vừa nhận diện ổn (*trong đoạn code trên để tăng độ mượt, mình đã đẩy lên `fastest` nên khi các bạn chạy sẽ thấy có vài vật thể bị nhận diện sai*). Đến đây là kết thúc, hy vọng qua bài viết đầu tay đơn giản của mình sẽ giúp ích được các bạn hoặc đem lại sự giải trí sau những giờ code căng thẳng :laughing: , chúc các bạn thành công :kissing_heart: .