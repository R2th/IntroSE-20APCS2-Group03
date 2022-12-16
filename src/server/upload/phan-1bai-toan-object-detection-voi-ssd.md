## Sơ lược
Đầu tiên đối với bài toán Object Detection này input là một bức ảnh bình thường,và output là một bounding box xung quanh đối tượng, mỗi đối tượng là một bouding box , bounding box này không chỉ là cái hình vuông mà còn là độ cao, rộng, vị trí của nó ở đâu mà còn cả nhãn (lable) tức là con người, con vật hay oto như trong hình bên dưới đây. Thậm chí có cả accuracy ( độ chính xác) của cái box là bao nhiêu trong khoảng [0,1] càng cao thì độ chính xác càng được khẳng định.
![](https://images.viblo.asia/7775fcd6-fbd8-4ae8-b4bd-e172353d21c9.png)
Trong bouding box nó có những gì?? Như hình bên dưới thì ta có một bức ảnh có dấu chấm đen ở vị trí (0,0) còn bên trong là một box với vị trí x,y cụ thể x_min, y_min, x_max, y_max hay vị trí top_left, botton_righ, khi ta nối các vị trí này với nhau sẽ tạo ra một bounding box bao quanh vật thể (object,..). Hiện tại thì người ta đã biến đổi một chút đó là sử dụng c_x,c_y điểm ở vị trí trung tâm của box và width, height của box.
Đối với phương pháp sử dụng SSD thì số lượng class sẽ bao gồm cả backgroud, hay số lượng class là **n+1**. Khi đó output ngoài class xe cộ, người, con vật,.. sẽ có cả backgroud,nên sẽ có **n+1** class.
## VOC Dataset 
Đối với xử lý ảnh việc sử dụng data là rất nhiều, có những chỗ cung cấp free cho mình sử dụng, nhưng cũng có data không được cung cấp như thế (thương mại). Với việc làm một bài toán Computer Vision thì trước hết ta phải tìm được nguồn data, mức độ phong phú của data đó, các đặc tính của data ( lượng phân bổ data như thế nào, có bị mất cân bằng hay không). Ví dụ như ta có tập data của người Châu Mĩ, Phi khi ta train được model khi áp dụng lên người Việt Nam thì độ chính xác lại không cao do đăc điểm khác nhau, phân bố khác nhau. Hay như trong bài toán nhận diện biển báo giao thông, ở nhiều nước nội dung biển báo có thể giống nhau nhưng cách biểu diễn hình dạng lại khác nhau(màu đậm, nhạt, nét đậm, nét nhạt). VD khác như khi làm bài toán về Trích xuất thông tin CMT/CCCD thì ta phải thu thập đầy đủ data của cả CMT/CCCD nếu chỉ một trong hai thì kết quả lại không cao. 
Cụ thể trong bài này mình sử dụng Dataset VOC 2012 với 20 class(người, ngựa, máy bay,....) với 5717 image cho việc traning, 5823 image cho validation.Và như mình đã nói ở trên thì do tính cả class là background nên ta sẽ có 21(n+1) class tất cả. Trong tập data có file  .xml annotation với x_min, y_min, x_max, y_max, lable file này lưu thông tin của object có trong từng image ( vị trí, tọa độ, tên đối tượng) hay là các thông tin của bức ảnh dành cho việc trainning.
## SSD
SSD (Single Shot Detector) có 2 version là SSD300, SSD512. Mình sẽ sử dụng SSD300 ,điểm đăc biệt của mạng này là input đầu vào sẽ là 300x300, còn mạng SSD512 thì input sẽ là image với size 512x512. 
## Luồng xử lý
Việc đầu tiên là ta sẽ resize bức ảnh về size 300x300 do mình dùng model SSD300 nên ta cần resize kích thước cho phù hợp với cấu trúc mạng.
Chuẩn bị input image 8732 default box trong mỗi bức ảnh. Ta đưa image vào SSD khi output ta có  default box (8732) x (class(21)+ offset(4)) = 218.300 (thông tin). Trong đó Offset là các thông tin của vật thể(c_x, c_y, w, h). 

Sau đó lấy ra bouding box với cofidence cao nhất, trong SSD thì thường lấy 200 bb trong tổng số 8732. Tiếp theo là nó sử dụng thuật toán NMS ([Non-Maximum Suppression](https://viblo.asia/p/tim-hieu-va-trien-khai-thuat-toan-non-maximum-suppression-bJzKmr66Z9N)). 
Đầu vào là một list các bouding box, mỗi box có tọa độ (x1, y1, x2, y2, c). Với (x1,y1), (x2, y2, c lần lượt là tọa độ Top_Left, Bottom-Right của Box và Confidence Score tương ứng.
Đầu ra sẽ là một list các bouding box sau khi đã loại bỏ các box dư thừa, trùng lặp nhau.
Cuối cùng mỗi một bài toán nó sẽ chọn ra cho mình một threshold (ngưỡng) , nghĩa là khi cofidence mà lớn hơn threshold thì lấy kết quả đó. 

Có hai hướng cho việc chọn threshold: 
1. Hight threshold : tránh detec sai (tức xác suất cao thì mới chọn, nhưng có thể thiếu).
2. Low threshold : tránh được detec thiếu (có thể detec sai, giết nhầm còn hơn bỏ sót).

Phần tiếp theo ta sẽ tiếp tục với việc tạo dataset + Xử lý data trước khi training.
Ta sử dụng đoạn code sau để tải tập data về và giải nén nó:
```
import os
import urllib.request
import zipfile
import tarfile

data_dir = "./data"
if not os.path.exists(data_dir):
    os.mkdir(data_dir)

url = "http://host.robots.ox.ac.uk/pascal/VOC/voc2012/VOCtrainval_11-May-2012.tar"
target_path = os.path.join(data_dir, "VOCtrainval_11-May-2012.tar")

if not os.path.exists(target_path):
    urllib.request.urlretrieve(url, target_path)

    tar = tarfile.TarFile(target_path)
    tar.extractall(data_dir)
    tar.close
```
Sau khi tải xong ta thử open xem có những gì :
![](https://images.viblo.asia/1c71d6c5-9acd-4e42-bfe3-56374c8430ea.png)

Trong folder bao gồm các folder con : Annotations, ImageSets, JPEGImages,SegmentatiionClass, SegmemtationObject. Hãy thử mở từng thư mục xem cụ thể bên trong nó có những gì.
Phần tiếp theo là bước rất quan trọng là xử lý data trước khi training và build model.
Hẹn gặp lại vào phần tiếp theo.
## Tài liệu tham khảo 
1. https://arxiv.org/pdf/1512.02325.pdf
2. https://viblo.asia/p/tim-hieu-va-trien-khai-thuat-toan-non-maximum-suppression-bJzKmr66Z9N
3. https://towardsdatascience.com/review-ssd-single-shot-detector-object-detection-851a94607d11
4. https://paperswithcode.com/task/object-detection
5. http://host.robots.ox.ac.uk/pascal/VOC/voc2012/