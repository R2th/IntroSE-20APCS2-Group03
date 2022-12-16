## I. Introduction
Xin chào tất cả mọi người, chả là thời gian trước mình có tìm hiểu về Object Tracking và mình có lên viblo và google search search thì số lượng bài viết chia sẻ về chủ đề này còn khá hạn chế nên hôm nay mình mạn phép đóng góp một bài viết nằm trong chuỗi series về Video Object Tracking, mong nhận được sự ủng hộ và góp ý từ tất cả các bạn. Bài viết với mục đích chia sẻ tới các  bạn một cái nhìn tổng quan về bài toán Tracking cho các bạn muốn tìm hiểu về chủ đề này có thể tiếp cận một cách dễ dàng hơn. Bài viết tiếp theo của mình sẽ giải thích chi tiết về Deep Sort và thuật toán Kalman Filter các bạn chú ý theo dõi bài viết của mình nhé.  Nếu thấy bài viết hay hãy cho mình xin 1 lượt upvote nhé (hihi).
## II. Video Object Tracking
Trong video object traking, mục tiêu của nó là xác định vị trí của một hoặc nhiều đối tượng (mục tiêu ) trong mỗi khung hình (frame) của video. 
{@embed: https://www.youtube.com/watch?v=_i4numqiv7Y&t=186s}
  <br> 

MÌnh xin phép lấy video từ kênh **Dr. Tang's AI Research** để giải thích cho rõ, mình sẽ để link video ở cuối bài viết các bạn có thể tham khảo thêm nhé. Như các bạn có thể thấy trong video trên thì mô hình theo dõi chuyển động của những chiếc xe ô tô khác nhau. Tuy nhiên sẽ có bạn đặt ra câu hỏi rằng liệu object detection và object tracking khác nhau ở điểm nào. Từ video trên ta có thể thấy rằng object detection và object tracking có một mối quan hệ rất chặt chẽ. Object detection là việc mô hình xác định một hoặc nhiều đối tượng trong một khung hình nhất định còn object traking là theo dõi đối tượng trong toàn bộ video. Để theo dõi được một đối tượng trước hết mô hình cần phải phát hiện được đối tượng đó trong từng frame sau đó sẽ cho qua một thuật toán về tracking nên việc theoi dõi đối tượng có chính xác hay không thì cần phải xem việc phát hiện đối tượng tốt đến đâu. Như trong video chúng ta có thể thấy rằng mô hình đang theo dõi chuyển động của những chiếc xe ô tô và mỗi ô tô sẽ có một khung hình vuông mang một màu sắc nhất định biểu thị rằng đối tượng đó được xuất hiện qua các video. Object detection sẽ phát hiện sự xuất hiện của những chiếc xe ô tô trong hình ảnh tuy nhiên để xem trong video đó khi các đối tượng chuyển động thì cùng 1 đối tượng mô hình sẽ hiểu đó là cùng 1 đối tượng chứ không phải là 2 đối tượng để giữ nguyên màu sắc trên đối tượng thì đó chính là bài toán tracking. 
## III. Single Object tracking (SOT) and Multiple Object Tracking (MOT)
Có hai cách tiếp cận chính cho bài toán Object Tracking đó là Single Object Tracking (SOT) and Multiple Object Tracking (MOT). <br>
**Single Obkect Tracking (SOT)**: Chỉ một đối tượng được theo dõi ngay cả khi môi trường có nhiều đối tượng ngay cả khi môi trường có nhiều đối tượng trong đó. Đối tượng được theo dõi xác định bằng cách khởi tạo trong frame đầu tiên của video . <br>
**Multiple Object Tracking (MOT)**: Tất cả các đối tượng xuất hiện đều được theo dõi theo thời gian, nó thậm chí có thể theo dõi các đối tượng mới xuất hiện ở giữa video. Đây là một chủ đề khó và phức tạp hơn SOT.  <br>
Các bạn có thể chạy đoạn code OpenCV dưới đây để hiểu hơn về SOT nhé (mình sẽ để đường link dẫn dưới mục tài liệu tham khảo ):
```python 
import cv2
import sys
(major_ver, minor_ver, subminor_ver) = (cv2.__version__).split('.')
if __name__ == '__main__' :
    tracker_types = ['BOOSTING', 'MIL','KCF', 'TLD', 'MEDIANFLOW', 'GOTURN', 'MOSSE', 'CSRT']
    tracker_type = tracker_types[2]
    if int(minor_ver) < 3:
        tracker = cv2.Tracker_create(tracker_type)
    else:
        if tracker_type == 'BOOSTING':
            tracker = cv2.TrackerBoosting_create()
        if tracker_type == 'MIL':
            tracker = cv2.TrackerMIL_create()
        if tracker_type == 'KCF':
            tracker = cv2.TrackerKCF_create()
        if tracker_type == 'TLD':
            tracker = cv2.TrackerTLD_create()
        if tracker_type == 'MEDIANFLOW':
            tracker = cv2.TrackerMedianFlow_create()
        if tracker_type == 'GOTURN':
            tracker = cv2.TrackerGOTURN_create()
        if tracker_type == 'MOSSE':
            tracker = cv2.TrackerMOSSE_create()
        if tracker_type == "CSRT":
            tracker = cv2.TrackerCSRT_create()
    video = cv2.VideoCapture(0)
    if not video.isOpened():
        print("Could not open video")
        sys.exit()
    ok, frame = video.read()
    if not ok:
        print ('Cannot read video file')
        sys.exit()
    bbox = (287, 23, 86, 320)
    bbox = cv2.selectROI(frame, False)
    ok = tracker.init(frame, bbox)
    while True:
        ok, frame = video.read()
        if not ok:
            break
        timer = cv2.getTickCount()
        ok, bbox = tracker.update(frame)
        fps = cv2.getTickFrequency() / (cv2.getTickCount() - timer)
        if ok:
            p1 = (int(bbox[0]), int(bbox[1]))
            p2 = (int(bbox[0] + bbox[2]), int(bbox[1] + bbox[3]))
            cv2.rectangle(frame, p1, p2, (255,0,0), 2, 1)
        else :
            cv2.putText(frame, "Tracking failure detected", (100,80), cv2.FONT_HERSHEY_SIMPLEX, 0.75,(0,0,255),2)
        cv2.putText(frame, tracker_type + " Tracker", (100,20), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (50,170,50),2);
        cv2.putText(frame, "FPS : " + str(int(fps)), (100,50), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (50,170,50), 2);
        cv2.imshow("Tracking", frame)
        k = cv2.waitKey(1) & 0xff
        if k == 27 : break
```
## IV. Traditional Methods
### Meanshift
Meanshift or Mode seeking là một thuật toán phổ biến chủ yêu được sử dụng để clustering hoặc những vấn đề liên quan tới unsupervised. Phân cụm KMeans là ứng dụng khai thác dữ liệu phân vùng n quan sát thành các cụm k. Mỗi quan sát thuộc về cụm với giá trị trung bình gần nhất. Trong phân cụm KMeans có thể chỉ định số lượng cụm được tạo, trong khi đó trong cụm MeanShift, số cụm được tự động phát hiện dựa trên số lượng mật độ trung tâm được tìm thấy trong dữ liệu.Meanshift tương tự như K-Means, nhưng thay vì sử dụng centroid để tính toán các tâm cụm thì Meanshift chuyển các điểm dữ liệu lặp đi lặp lại theo chế độ, đây là mật độ điểm dữ liệu cao nhất trung bình. Nó cũng được gọi là thuật toán tìm kiếm chế độ. Mục tiêu của thuật toán là tìm tất cả các chế độ trong phân phối dữ liệu đã cho. Khác với thuật toán K-mean thì Meanshift không yêu cầu phải xác định K nhóm từ trước. <br>
GIả sử trong một video khi mô hình phát hiện được đối tượng trong khung hình và trích xuất ra được các đặc trưng như màu sắc, kết câu, histogram. Sau khi áp dụng thuật toán Meanshift thì sẽ có một idea chung về phân phối tương đối của các đối tượng ở trạng thái hiện tại.  Sau đó có một frame tiếp theo thì các phân phối này có thể thay đổi do sự chuyển động của đối tượng thì meanshift sẽ tìm kiếm theo chế độ vào do đó theo dõi đối tượng. 
### Optical flow
Phương pháp này khác biệt so với phương pháp trên là chúng ta không nhất thiết phải sử dụng các tính năng được trích xuất từ đối tượng được phát hiện. Thay vào đó đối tượng được theo dõi sử dụng các image brightness variations theo không gian- thời gian ở các cấp độ pixel. Trong thuật toán thì sẽ tập trung vào việc thu được vecto dịch chuyển cho các đối tượng qua các frame . <br>
**1. Brightness consistency:** Độ sáng xung quanh một vùng nhỏ được cho là gần như không đổi, mặc dù vị trí của vùng có thể thay đổi. <br>
**2. Spatial coherence:** Các điểm lân cận trong cùng một khung cảnh thường sẽ cùng thuộc một bề mặt do đó sẽ có những sự chuyển động tương tự. <br>
**3. Temporal persistence**: Các điểm thường sẽ có sự chuyển động dần dần. <br>
Khi các tiêu chí trên được thoả mãn thì sẽ sử dụng phương pháp Lucas-Kanade để có được phương trình vận tốc  của các điểm nhất định được theo dõi ( thường ở đây là những điểm dễ phát hiện). Sử dụng phương trình cùng một số phương pháp dự đoán, thì một đối tượng sẽ được theo dõi trong toàn bộ video. <br>
![](https://images.viblo.asia/9417f01a-9460-4deb-99fe-e4174a94db0a.png) <br>
Hình ảnh trên cho thấy sự chuyển động của quả bóng qua 5 frame liên tiếp. 
Chúng ta giả sử một pixel I(x,y,t) tại frame đầu tiên sau đó một khoảng thời gian dt thì chuyển động được khoảng cách (dx,dy). Do đó pixel đó thoả mãn những tính chất trên nên ta có phương trình: I(x,y,t) = I(x +dx, y+dy, t+dt). Sau khi xấp xỉ taylor cho vế phải ta có: <br>![](https://images.viblo.asia/3caf9341-d5d9-4a7e-8271-4e7c7737426b.png) <br>
OpenCV cung cấp tất cả những điều mà mình nói trên trong một hàm duy nhất, cv.calcOpticalFlowPyrLK () . Ở đây họ tạo một ứng dụng đơn giản để theo dõi một số điểm trong video. Để quyết định điểm, họ sử dụng hàm cv.goodFeaturesToTrack () . Họ lấy khung hình đầu tiên, phát hiện một số điểm góc Shi-Tomasi trong đó, sau đó theo dõi lặp đi lặp lại các điểm đó bằng cách sử dụng Optical Flow Lucas-Kanade. Đối với hàm cv.calcOpticalFlowPyrLK (), chuyển khung trước, điểm trước và khung tiếp theo. Nó trả về các điểm tiếp theo cùng với một số trạng thái có giá trị là 1 nếu tìm thấy điểm tiếp theo. Lặp đi lặp lại các điểm tiếp theo này như các điểm trước đó trong bước tiếp theo. Các bạn có thể đọc chi tiết hơn trong doc của OenCV nhé mình có để đường linh ở phần tài liệu tham khảo bài viết. 
Các bạn có thể thực hành nhanh qua opencv với đoạn code sau:
```python
import numpy as np
import cv2 as cv
import argparse
parser.add_argument('image', type=str, help='path to image file')
args = parser.parse_args()
cap = cv.VideoCapture(args.image)
# params for ShiTomasi corner detection
feature_params = dict( maxCorners = 100,
                       qualityLevel = 0.3,
                       minDistance = 7,
                       blockSize = 7 )
# Parameters for lucas kanade optical flow
lk_params = dict( winSize  = (15,15),
                  maxLevel = 2,
                  criteria = (cv.TERM_CRITERIA_EPS | cv.TERM_CRITERIA_COUNT, 10, 0.03))
# Create some random colors
color = np.random.randint(0,255,(100,3))
# Take first frame and find corners in it
ret, old_frame = cap.read()
old_gray = cv.cvtColor(old_frame, cv.COLOR_BGR2GRAY)
p0 = cv.goodFeaturesToTrack(old_gray, mask = None, **feature_params)
# Create a mask image for drawing purposes
mask = np.zeros_like(old_frame)
while(1):
    ret,frame = cap.read()
    frame_gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    # calculate optical flow
    p1, st, err = cv.calcOpticalFlowPyrLK(old_gray, frame_gray, p0, None, **lk_params)
    # Select good points
    good_new = p1[st==1]
    good_old = p0[st==1]
    # draw the tracks
    for i,(new,old) in enumerate(zip(good_new, good_old)):
        a,b = new.ravel()
        c,d = old.ravel()
        mask = cv.line(mask, (a,b),(c,d), color[i].tolist(), 2)
        frame = cv.circle(frame,(a,b),5,color[i].tolist(),-1)
    img = cv.add(frame,mask)
    cv.imshow('frame',img)
    k = cv.waitKey(30) & 0xff
    if k == 27:
        break
    # Now update the previous frame and previous points
    old_gray = frame_gray.copy()
    p0 = good_new.reshape(-1,1,2)
```
**Kalman Filters** <br>
Thuật toán này mình xin phép sẽ trình bày ở bài viết sau trong chuỗi series này nhé. 
## V.Deep Learning based Approaches
### Deep Regression Networks (ECCV, 2016)
Đó là trong những phương pháp được sử dụng với deep learning sớm cho các bài toán single object tracking. Mô hình được training trên một tập dữ liệu lớn bao gồm các video được gắn label cho từng frame.  Mục tiêu của mô hình là theo dõi đối tượng từ phần ảnh được crop, để đạt được điều này thì tác giả đã sử dụng một kiến trúc CNN  với đầu vào là frame hiện tại và trước đó.
![](https://images.viblo.asia/7a6d8032-6f2d-4b17-b3c9-e15321ac75e2.png)
<br>
Như trong hình các bạn có thể thấy rất rõ sau mô hình sẽ lấy đối tượng được crop từ frame trước đó được dùng để tìm kiếm và và theo dõi tại khung hiện tại. 
### ROLO - Recurrent Yolo (ISCAS 2016)
ROLO là cách viết tắt của Recurrent YOLO với mục đích để phát hiện và theo dõi đối tượng. <br>
Mô hình được thiết kế bằng cách kết hợp giữa YOLO VÀ LSTM giúp theo dõi đối tượng bằng cách nắm bắt các đặc điểm về không gian và thời gian, các bạn có thể xem ở hinh dưới:
![](https://images.viblo.asia/6f3ad3b8-8027-40b8-b3e0-ace319fe14da.png) <br>
Như hình trên thì mô hinh này kiến trúc khá đơn giản sau khi có các bounding box được detection từ YOLO sẽ được kết hợp với những vecto đặc trưng được trích xuẩt từ mô hình CNN hoặc cũng có thể sử dụng lại YOLO để trích xuất đặc trưng.  Sau khi có vecto đặc trưng này được concatenated thành vector đặc trưng đại diện cho các thông tin về đối tượng hiện tại cùng với thông tin từ frame trước đó cho qua mô hình LSTM.  Mô hình sẽ sử dụng CNN để trích xuất đặc trưng và LSTM để dự đóa hộp giới hạn. 
## VI. Tài liệu tham khảo
1. https://github.com/davheld/GOTURN <br>
2. https://github.com/Guanghan/ROLO
3. https://opencv.org
4. https://nanonets.com/blog/optical-flow/
5. https://docs.opencv.org/master/d7/d00/tutorial_meanshift.html
## VII. Kết luận
Bài viết của mình tới đây là kết thúc cảm ơn các bạn đã theo dõi bài viết của mình, nếu thấy bài viết hay cho mình xin 1 lượt upvote nhé. Bài viết tiếp theo của mình sẽ giải thích về paper Deep Sort và thuật toán Kalman Filter.