![](https://images.viblo.asia/e9c91a15-9724-49be-bd52-bef693c7e142.jpg)
# Object Detection
Một trong những lĩnh vực quan trọng của Trí tuệ nhân tạo (Artificial Intelligence) là thị giác máy (Computer Vision). Computer Vision là một lĩnh vực bao gồm các phương pháp thu nhận, xử lý ảnh kỹ thuật số, phân tích và nhận dạng các hình ảnh, phát hiện các đối tượng, tạo ảnh, siêu phân giải hình ảnh và nhiều hơn vậy. Object Detection có lẽ là khía cạnh sâu sắc nhất của thị giác máy do số lần sử dụng trong thực tế.

Object Detection đề cập đến khả năng của hệ thống máy tính và phần mềm để định vị các đối tượng trong một hình ảnh và xác định từng đối tượng. Object Detection đã được sử dụng rộng rãi để phát hiện khuôn mặt, phát hiện xe, đếm số người đi bộ, hệ thống bảo mật và xe không người lái. Có nhiều cách để nhận diện đối tượng có thể được sử dụng cũng như trong nhiều lĩnh vực thực hành. Giống như mọi công nghệ khác, một loạt các ứng dụng sáng tạo và tuyệt vời của Object Detection sẽ đến từ các lập trình viên và các nhà phát triển phần mềm.


Bắt đầu sử dụng các phương pháp nhận diện đối tượng hiện đại trong các ứng dụng và hệ thống, cũng như xây dựng các ứng dụng mới dựa trên các phương pháp này.Việc triển nhận diện đối tượng sớm liên quan đến việc sử dụng các thuật toán cổ điển, giống như các thuật toán được hỗ trợ trong OpenCV, thư viện computer vision phổ biến. Tuy nhiên, các thuật toán cổ điển này không thể đạt được hiệu suất đủ để làm việc trong các điều kiện khác nhau.

Việc áp dụng đột phát và nhanh cóng của deep learning vào năm 2012 đã đưa vào sự tồn tại các thuật toán và phương pháp phát hiện đối tượng hiện đại và chính xác cao như R-CNN, Fast-RCNN, Faster-RCNN, RetinaNet và nhanh hơn nhưng rất chính xác như SSD và YOLO. Sử dụng các phương pháp và thuật toán này, dựa trên deep learning và cũng dựa trên việc học máy đòi hỏi rất nhiều kiến thức về toán học và việc học sâu. Có hàng triệu chuyên gia lập trình và các nhà phát triển phần mềm muốn tích hợp và tạo ra các sản phẩm mới sử dụng object detection. Nhưng công nghệ này xa tầm tay của họ và phức tạp để hiểu và sử dụng thực tế của nó.

ImageAI, một thư viện python cho phép các lập trình viên và các nhà phát triển phần mềm dễ dàng tích hợp các công nghệ thị giác máy hiện đại vào các ứng dụng hiện có và mới của họ, và chỉ cần sử dụng một vài dòng mã. ImageAI hỗ trợ một danh sách các thuật toán học máy hiện đại nhất cho việc dự đoán hình ảnh,, nhận diện vật thể, phát diện video,... 
# Cài đặt
Để thực hiện nhận diện đối tượng bằng ImageAI, tất cả những gì bạn cần làm là:
1. Cài đặt python
2. Cài đặt ImageAI và phụ thuộc của nó.
3. Tải xuống file mô hình Object Detection
4. Chạy chương trình

Bây giờ, hãy bắt đầu

1. Tải xuống và cài đặt python 3 từ [https://python.org](https://python.org)
2. Tensorflow 1.4.0 (and later versions)
```
pip3 install --upgrade tensorflow 
```
3. Numpy 1.13.1 (and later versions)
```
pip3 install numpy 
```
4. SciPy 0.19.1 (and later versions)
```
pip3 install scipy 
```
5. OpenCV
```
pip3 install opencv-python 
```
6. Pillow
```
pip3 install pillow 
```
7. Matplotlib
```
pip3 install matplotlib 
```
8. h5py
```
pip3 install h5py 
```
9. Keras 2.x
```
 pip3 install keras 
```
10. ImageAI
```
pip install https://github.com/OlafenwaMoses/ImageAI/releases/download/2.0.1/imageai-2.0.1-py3-none-any.whl
```
11. Tải xuống mô hình RetinaNet sẽ được sử dụng để nhận diện đối tượng qua [liên kết](https://github.com/OlafenwaMoses/ImageAI/releases/download/1.0/resnet50_coco_best_v2.0.1.h5)

Mọi thứ đã sẵn sàng, tạo một tệp python là ObjectDetection.py. Sao chép file mô hình RetinaNet và hình ảnh mà bạn muốn phát hiện vào thư mục chứa file ObjectDetection.py. 

![](https://images.viblo.asia/0bce9abf-4f91-4261-81af-b8d690f42cd4.png)

Nhập vào file ObjectDetection.py đoạn mã sau:
```
from imageai.Detection import ObjectDetection
import os

execution_path = os.getcwd()
detector = ObjectDetection()
detector.setModelTypeAsRetinaNet()
detector.setModelPath( os.path.join(execution_path , "resnet50_coco_best_v2.0.1.h5"))
detector.loadModel()
detections = detector.detectObjectsFromImage(input_image=os.path.join(execution_path , "image.jpg"), output_image_path=os.path.join(execution_path , "imagenew.jpg"))
for eachObject in detections:
    print(eachObject["name"] + " : " + eachObject["percentage_probability"] )
```
Ba dòng đầu tiên, đã import lớp ImageAI Object Detection ở dòng đầu tiên, dòng thứ 2 là import lớp `python os` và xác định một biến để giữ đường dẫn đến thư mục chứa file python của chúng ta. Tệp mô hình RetinaNet và hình ảnh nằm ở dòng thứ ba
```
from imageai.Detection import ObjectDetection
import os

execution_path = os.getcwd()
```
Tiếp 5 dòng mã sau, chúng ta đã định nghĩa lớp object detection trong dòng đầu, thiết lập kiểu mô hình cho RetinaNet trong dòng thứ hai, thiết lập đường dẫn của mô hình RetinaNet trong dòng thứ ba, load mô hình vào lớp object detection ở trong dòng thứ tư, sau đó ta gọi hàm detection và được phân tích cú pháp trong đường dẫn hình ảnh đầu vào và đường dẫn hình ảnh đầu ra trong dòng thứ năm.
```
detector = ObjectDetection()
detector.setModelTypeAsRetinaNet()
detector.setModelPath( os.path.join(execution_path , "resnet50_coco_best_v2.0.1.h5"))
detector.loadModel()
detections = detector.detectObjectsFromImage(input_image=os.path.join(execution_path , "image.jpg"), output_image_path=os.path.join(execution_path , "imagenew.jpg")
```
Trong hai dòng mã cuối, ta lặp qua tất cả các kết quả được trả về bởi hàm `detector.detectObjectsFromImage` trong dòng đầu tiên, sau đó in ra tên và xác suất phần trăm của mô hình trên từng đối tượng được phát hiện trong hình ảnh trong dòng thứ hai.
```
for eachObject in detections:
    print(eachObject["name"] + " : " + eachObject["percentage_probability"] )
```
ImageAI hỗ trợ nhiều tùy chỉnh mạnh mẽ của quá trình nhận diện đối tượng. Một trong số đó là khả năng trích xuất hình ảnh của từng đối tượng được phát hiện trong hình ảnh. Bằng cách thêm tham số `extract_detected_objects=True` vào hàm `detectObjectsFromImage`. Lớp object detection sẽ tạo một thư mục cho các đối tượng hình ảnh, trích xuất từng ảnh, lưu từng ảnh vào thư mục mới.
```
detections = detector.detectObjectsFromImage(input_image=os.path.join(execution_path , "image.jpg"), output_image_path=os.path.join(execution_path , "imagenew.jpg"), extract_detected_objects=True)
```
Hình ảnh ban đầu:

![](https://images.viblo.asia/147d1bc1-8ed1-4017-8c55-ed0e862cc89c.jpg)
Sau quá trình Object Detection:

![](https://images.viblo.asia/e9c91a15-9724-49be-bd52-bef693c7e142.jpg)

Sau khi ta thêm tham số `extract_detected_objects=True` vào hàm `detectObjectsFromImage`, sẽ tạo thêm một thư mục, rích xuất từng ảnh, lưu từng ảnh vào thư mục mới.

![](https://images.viblo.asia/c2eb1a7a-9993-4cd0-afd7-666300126994.png)

Một vài hình ảnh được trích xuất có trong thư mục:

![](https://images.viblo.asia/42c0061e-6c43-4583-8c30-6a7dc85bf754.jpg)

![](https://images.viblo.asia/28c5ffc8-fa66-4166-b02c-826d2f07f03c.jpg)

![](https://images.viblo.asia/eac10aed-e560-4e15-9721-58c8145569cd.jpg)

![](https://images.viblo.asia/72ddcfdf-d72e-4e8f-9215-8097884a1890.jpg)

Tương tự, ta cũng có thể nhận diện các vật thể qua video sử dụng Video Object Detection có hỗ trợ trong thư viện ImageAI.
```
from imageai.Detection import VideoObjectDetection
import os

execution_path = os.getcwd()

detector = VideoObjectDetection()
detector.setModelTypeAsRetinaNet()
detector.setModelPath( os.path.join(execution_path , "resnet50_coco_best_v2.0.1.h5"))
detector.loadModel()

video_path = detector.detectObjectsFromVideo(input_file_path=os.path.join(execution_path, "traffic.mp4"),
                                output_file_path=os.path.join(execution_path, "traffic_detected")
                                , frames_per_second=20, log_progress=True)
print(video_path)
```
Không chèn được video nên mình đưa link vậy :))

Đầu vào video:
{@youtube: https://www.youtube.com/watch?v=54aHuQagIsM&feature=youtu.be}

Đầu ra video:
{@youtube: https://www.youtube.com/watch?v=-mdzMRoQ4Rw}

-----

ImageAI cung cấp nhiều tính năng hữu ích cho việc triển khai khả năng tùy chỉnh và triển khai việc nhận diện đối tượng. Một vài tính năng được hỗ trợ là:
* Adjusting Minimum Probability: Theo mặc định, các đối tượng được phát hiện có tỷ lệ phần trăm xác suất nhỏ hơn 50 sẽ không được hiển thị hoặc báo cáo. Bạn có thể tăng giá trị này cho các trường hợp chắc chắn cao hoặc giảm giá trị cho các trường hợp mà tất cả các đối tượng có thể cần được phát hiện.
* Custom Objects Detection: Sử dụng lớp CustomObject được cung cấp, bạn có thể yêu cầu lớp phát hiện báo cáo các phát hiện trên một hoặc một số đối tượng duy nhất.
* Detection Speeds: Bạn có thể giảm thời gian cần thiết để phát hiện một hình ảnh bằng cách đặt tốc độ của tốc độ phát hiện thành 'fast', 'faster' và 'fastest'.
*  Input Types: Bạn có thể chỉ định và phân tích cú pháp trong đường dẫn tệp tới hình ảnh, mảng Numpy hoặc luồng tệp của hình ảnh làm hình ảnh đầu vào.
*  Output Types: Bạn có thể chỉ định rằng hàm detectObjectsFromImage sẽ trả về hình ảnh dưới dạng một tệp hoặc mảng Numpy.
# Tham khảo
https://github.com/OlafenwaMoses/ImageAI

https://towardsdatascience.com/object-detection-with-10-lines-of-code-d6cb4d86f606