Trong bài này chúng ta sẽ xây dựng một hệ thống sử dụng YOLOv3 kết hợp với DeepSORT để tracking được các đối tượng trên camera, YOLO là một thuật toán deep learning ra đời vào tháng 5 năm 2016 và nó nhanh chóng trở nên phổ biến vì nó quá nhanh so với thuật toán deep learning trước đó, sử dụng YOLO trên GPU ta có thể đạt tới **45 fps**.  Dựa vào YOLO chúng ta sẽ detect được object rồi sau đó ta dùng DeepSORT để tracking object đó qua từng frames. 

# YOLO và DeepSORT
## YOLO
![](https://images.viblo.asia/381a09d8-b9df-4cae-9794-5ede2df3e61f.png)

Có lẽ YOLO đã không còn xa lạ gì với các bạn khi làm về chủ đề object detection. Trong bài viết này mình sẽ sử dụng YOLOv3, được kế thừa các tính năng từ v1 và v2. Nó sẽ dự đoán 4 tọa độ cho mỗi bounding boxs  **tx, ty, tw, th** và dùng logistic regression để dự đoán confidence của mỗi object. Để tìm hiểu sâu hơn về lý thuyết mời bạn đọc bài [Tìm hiểu về YOLO trong bài toán real-time object detection](https://viblo.asia/p/tim-hieu-ve-yolo-trong-bai-toan-real-time-object-detection-yMnKMdvr57P)

## DeepSORT
Để hiểu thế nào là DeepSort thì chúng ta sẽ tìm hiểu  **SORT - Simple Online Real-time Tracking là gì?**

Và như cái tên của nó, SORT được sinh ra để có thể traking đối tượng trên thời gian thực dựa trên bốn yếu tố:
* Phát hiện đối tượng (Detection)
* Đánh giá và dự đoán (Estimation)
* Liên kết các đối tượng với nhau (Association)
* Theo dõi và huỷ bỏ danh tính đối tượng (Track Identity creation and destruction)

Về cơ bản SORT rất đơn giản và dễ implement. Nhưng nó tồn tại điểm yếu chết người về vấn đề **ID Switches** và **dự đoán đối tượng dựa trên Kalman Filter** . Để giải quyết vấn đề đó thì DeepSORT được tạo ra.

![](https://images.viblo.asia/f9c005e9-5674-4173-87d0-a8e9675a3ab7.jpeg)


Mặc dù SORT đạt được hiệu suất tổng thể tốt về precision và accuracy, nhưng như nói ở trên nó vẫn tồn tại điểm yếu quá lớn. Để cải thiện điều này tác giả  **DeepSORT** đã tạo ra một distance metric dựa trên “**appearance**” của đối tượng. Để tìm hiểu sâu hơn về DeepSORT mời bạn đọc [bài này](https://viblo.asia/p/sort-deep-sort-mot-goc-nhin-ve-object-tracking-phan-2-djeZ1m78ZWz) và [Bài này](https://viblo.asia/p/sort-deep-sort-mot-goc-nhin-ve-object-tracking-phan-1-Az45bPooZxY#comment-7LKXDnBpEKV) của tác giả Bùi Túng Tiền

![](https://images.viblo.asia/02dabd1d-092d-41f8-a985-d7424f2dec93.jpeg)

Oke sau khi các bạn đã hiểu qua về lý thuyết thì phần dưới mới là phần chính của bài này :))


# Build everything with some codes 
## Setup
Đầu tiên các bạn phải clone repo này về từ trên github để xử lý phần detection của YOLOv3:
> https://github.com/Qidian213/deep_sort_yolov3

Sau đó các bn phải down về 2 files quan trọng nhất là **yolov3-tiny.cfg** và **yolov3-tiny.weights** [Tại đây](https://www.google.com/search?q=yolo+weights&oq=yolo+we&aqs=chrome.1.69i57j0i19l7.4125j0j7&sourceid=chrome&ie=UTF-8). Mình chọn bản tiny vì nó nhẹ và có thể chạy trên **CPU**, các bạn cũng có thể chọn bản yolov3 với weight khác nếu các bạn có **GPU** (Nghèo nó khổ thể đấy huhu) 

Sau đó bạn cấu trục thư mục như sau: 
![](https://images.viblo.asia/07b5eca7-c565-4a6a-b7a2-1d63fbbb611e.png)

Còn một số thư viện như opencv, numpy, .... Các bạn tự setting nhé :v 
Chúng ta sẽ thực hiện ở file **main.py** , đầu tiên là implement các thư viện cần thiết để chạy:

```python
import cv2
import numpy as np
import time
from deep_sort_yolov3.deep_sort import preprocessing
from deep_sort_yolov3.deep_sort import nn_matching
from deep_sort_yolov3.deep_sort.detection import Detection
from deep_sort_yolov3.deep_sort.tracker import Tracker
from deep_sort_yolov3.deep_sort.detection import Detection as ddet
from deep_sort_yolov3.tools import generate_detections as gdet
from collections import deque
```

Chú ý import cho chuẩn nhé, ko chuẩn bước này là lần sau ko chạy đc đừng có chửi mình :v 
Tiếp đó là ta sẽ load YOLO và khởi tạo các tham số cần thiết:
```python
net = cv2.dnn.readNet("yolov3-tiny.weights", "yolov3-tiny.cfg")
model_filename = "./YoloV3/deep_sort_yolov3/model_data/market1501.pb"
layer_names = net.getLayerNames()
output_layers = [layer_names[i[0] - 1] for i in net.getUnconnectedOutLayers()]
max_cosine_distance = 0.5
nms_max_overlap = 0.3
classes = []
nn_budget = None
counter = []
# fps = 0.0
pts = [deque(maxlen=30) for _ in range(9999)]
COLORS = np.random.randint(0, 255, size=(200, 3),
	dtype="uint8")
```

Ở đây mình đã dùng **opencv** để load weight của YOLO thay vì nó nhanh :v, các tham số như  `max_cosine_distance` để đo khoảng cách hàng xóm gần nhất trong deepSORT và `nms_max_overlap` là non maximum suppression,...

Sau đó ta sẽ load model deepSORT và khởi tạo các giá trị về khoảng cách với tham số đã tạo ở trên:

```python
encoder = gdet.create_box_encoder(model_filename, batch_size = 1) #Dữ liệu được encode của từng boxs
metric = nn_matching.NearestNeighborDistanceMetric("cosine", max_cosine_distance, nn_budget) # Dùng cosine để so sánh khoảng cách của từng boxs
tracker = Tracker(metric) # track đối tượng dược trên k/c thu được
```

Tiếp tục là load camera từ máy, lưu ý là nếu cam rời thì` cap = cv2.VideoCapture(1)` còn liền thì như dưới:

```python
# Loading camera
cap = cv2.VideoCapture(0)
font = cv2.FONT_HERSHEY_PLAIN
starting_time = time.time()
frame_id = 0
```

Sau đó ta sẽ bắt từng bounding boxs được detect ra:
```python
while True:
    _, frame = cap.read()
    frame_id += 1
    height, width, channels = frame.shape[:3]

    # Detecting objects
    blob = cv2.dnn.blobFromImage(frame, 1/255, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)
    # Showing informations on the screen
    class_ids = []
    confidences = []
    bboxes = []
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5:
                # Object detected
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)
                # Rectangle coordinates
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)
                bboxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)
```

Tất cả code phần sau vẫn là trong vòng `while True:` nhé

Sau khi có từng boxs đã được detect ra ta sẽ lấy ra các features qua từng frame để tracking:

```python
    #feature extraction
    features = encoder(frame, bboxes)
    # import pdb; pdb.set_trace()
    detections = [Detection(bbox, 1.0, feature) for bbox, feature in zip(bboxes, features)]

    #non-maxima supression
    boxes = np.array([d.tlwh for d in detections])
    scores = np.array([d.confidence for d in detections])
    indices = preprocessing.non_max_suppression(boxes, nms_max_overlap, scores)
    detections  =[detections[i] for i in indices]

    #Call the tracker
    tracker.predict()
    tracker.update(detections)
```

Ở trên với mỗi `boxes` thì sẽ tương ứng với  các features sau khi đã detect được objects, `indices` là những phần tử được xử lý với **non-maxima supression** để lấy ra được bounding boxs tốt nhất có thể, sau ó hàm `tracker.predict()` có nhiệm vụ track các objects đã được dự đoán và update tiếp tục tương tự với các đối tượng khác với `tracker.update(detections)`

Thực hiện tracking theo IDs theo từng bounding boxs và draw boxs trên từng frames:

```python
    for track in tracker.tracks:
        if not track.is_confirmed() or track.time_since_update > 1:
            continue
        # boxes.append([track[0], track[1], track[2], track[3]])
        indexIDs.append(int(track.track_id))
        counter.append(int(track.track_id))
        bbox = track.to_tlbr()
        color = [int(c) for c in COLORS[indexIDs[i] % len(COLORS)]]
        cv2.rectangle(frame, (int(bbox[0]), int(bbox[1])), (int(bbox[2]), int(bbox[3])), (color), 3)
        cv2.putText(frame, str(track.track_id), (int(bbox[0]), int(bbox[1] - 50)), 0, 5e-3 * 150, (color), 2)

        i += 1
        # bbox_center_point(x,y)
        center = (int(((bbox[0]) + (bbox[2])) / 2), int(((bbox[1]) + (bbox[3])) / 2))
        # track_id[center]
        pts[track.track_id].append(center)
        thickness = 5
        # center point
        cv2.circle(frame, (center), 1, color, thickness)

        # draw motion path
        for j in range(1, len(pts[track.track_id])):
            if pts[track.track_id][j - 1] is None or pts[track.track_id][j] is None:
                continue
            thickness = int(np.sqrt(64 / float(j + 1)) * 2)
            cv2.line(frame, (pts[track.track_id][j - 1]), (pts[track.track_id][j]), (color), thickness)

    count = len(set(counter))
    cv2.putText(frame, "Total Object Counter: " + str(count), (int(20), int(120)), 0, 5e-3 * 200, (0, 255, 0), 2)
    cv2.putText(frame, "Current Object Counter: " + str(i), (int(20), int(80)), 0, 5e-3 * 200, (0, 255, 0), 2)
    elapsed_time = time.time() - starting_time
    fps = frame_id / elapsed_time
    cv2.putText(frame, "FPS: %f" % (fps), (int(20), int(40)), 0, 5e-3 * 200, (0, 255, 0), 3)
    cv2.namedWindow("YOLO3_Deep_SORT", 0)
    cv2.imshow('YOLO3_Deep_SORT', frame)
    key = cv2.waitKey(1)
    if key == 27:
        break
cap.release()
cv2.destroyAllWindows()
```

# Result
Nhắc lại là ở đây mình cấu hình chạy thẳng trên CPU ở laptop của mình nên vì thế nên mới được có khoảng 6 fps nhé:
![](https://images.viblo.asia/6ffb0b27-2dde-4ac8-8081-49229f2fb3fc.png)


Cảm ơn các bạn đã đọc bài, nếu có gì ko hiểu thì các bạn cmt ở dưới nhé, rồi mình sẽ giải đáp sau, chúc mừng năm mới =))