## 1. Yolo là gì?
You only look once(Yolo) là một trong những thuật toán nhận diện vật thể nhanh nhất thời điểm hiện tại. Mặc dù không phải là phương pháp chính có độ xác cao nhất tuy nhiên Yolo vẫn là được ứng dụng rất nhiều trong những dự án thực tế khi mà độ chính xác không phải là ưu tiên hàng đầu.

![](https://images.viblo.asia/e61c45cc-8330-4f66-888b-b8592cd853dc.jpg)

Cho đến thời điểm hiện tại, Yolo đã có 3 phiên bản và trong bài viết này sẽ hướng dẫn bạn đào tạo model yolov3 để detect một vật thể bất kì. Bài viết sẽ không giải thích cách mà yolo này hoạt động và mặc định bạn đã có hiểu biết về yolo. Nếu bạn vẫn còn chưa biết yolo là gì, hãy dành ra một chút thời gian để tìm hiểu qua các bài luận của Joseph Redmon và cộng sự để hiểu được cách mà yolo hoạt động.

* [Yolov1](https://pjreddie.com/media/files/papers/yolo_1.pdf)
* [Yolov2](https://pjreddie.com/media/files/papers/YOLO9000.pdf)
* [Yolov3](https://pjreddie.com/media/files/papers/YOLOv3.pdf)
* [Cách hoạt động của YOLO](http://christopher5106.github.io/object/detectors/2017/08/10/bounding-box-object-detectors-understanding-yolo.html)

## 2. Xử lý dữ liệu
Tạo yolo bounding box annotation
Ta sẽ tạo một .txt file ứng với mỗi ảnh .jpg cùng tên và đặt trong cùng 1 thư mục. Thông tin trong mỗi file .txt gồm có số lượng object và toạ độ của object ở trong ảnh, ứng với mỗi object là một dòng:  `<object-class> <x> <y> <width> <height>`

Trong đó:

* `<object-class>` - là số thứ tự của class xuất phát từ 0 đến (số_class-1)
* `<x_center> <y_center> <width> <height>` - là các số thực chỉ vị trí tương ứng của object so với ảnh, nằm trong khoảng từ 0 đến 1
* Ví dụ:` <x> = <absolute_x> / <image_width>` hoặc` <height> = <absolute_height> / <image_height>`
* Chú ý: `<x_center> <y_center>` là tâm của bounding box.

Ví dụ ảnh img1.jpg sẽ có img1.txt:
```
1 0.716797 0.395833 0.216406 0.147222
0 0.687109 0.379167 0.255469 0.158333
1 0.420312 0.395833 0.140625 0.166667
```

Có khá nhiều tool để giúp tạo bbox annotation cho yolo tuy nhiên bạn có thể tham khảo 1 tool mình dùng [link ](https://github.com/Sotatek-HoangTran/Yolo_tool/blob/master/yolo_bounding_box.py) , nó khá là tối giản và dễ sử dụng. Có 3 điều cần chú ý. Thứ nhất là tạo file class_list.txt gồm tên các class object, mỗi tên nằm trên 1 dòng. Thứ 2 là ở dòng 31: bb_dir = “data/” trỏ đến folder lưu các file .txt. Thứ 3 là ở dòng 313: img_dir = “img/” trỏ đến folder chứa ảnh.(hiện vẫn cần ảnh và anno ở 2 folder khác nhau)

## 3.Download Darknet


![](https://images.viblo.asia/13c9e66f-c880-400e-845d-b28808a30300.png)

Darknet là một open source Neural network được viết bằng C và CUDA. Darknet đã có khá nhiều ứng dụng khác nhau([tham khảo tại đây](https://pjreddie.com/darknet/)).
Tuy nhiên trong nội dung bài viết ngày hôm nay chúng ta chỉ đi vào Yolo nên mình khuyên các bạn nên clone mạng darknet đã được implement lại riêng cho Yolo của AlexeyAB: https://github.com/AlexeyAB/darknet.

Yêu cầu hệ thống: 
* CMake >= 3.8 for modern CUDA support: https://cmake.org/download/
* CUDA 10.0: https://developer.nvidia.com/cuda-toolkit-archive (on Linux do Post-installation Actions)
* OpenCV < 4.0: use your preferred package manager (brew, apt), build from source using vcpkg or OpenCV Releases (on Windows set system variable OPENCV_DIR = C:\opencv\build where are include and x64 folders image)
* cuDNN >= 7.0 for CUDA 10.0 https://developer.nvidia.com/rdp/cudnn-archive (set system variable CUDNN = C:\cudnnwhere did you unpack cuDNN. On Linux in .bashrc-file, on Windows see the image )
* GPU with CC >= 3.0: https://en.wikipedia.org/wiki/CUDA#GPUs_supported
* on Linux GCC or Clang, on Windows MSVS 2017 (v15) https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&rel=15#


Sau khi đã clone Darknet và cài các tài nguyên yêu cầu. Vào thư mục gốc của darknet sửa file `Makefile` :
```
GPU=1
OPENCV=1
```
Sau đó chạy lệnh make trên terminal trỏ đến folder darknet. Vậy là bạn đã cài xong darknet.

## 4. Chuẩn bị các file cấu hình

 1.Tạo file `yolo-obj.cfg` có cùng nội dung với [`yolov3.cfg`](https://github.com/AlexeyAB/darknet/blob/master/cfg/yolov3.cfg) (đơn giản chỉ là copy) và:
 * Thay đổi dòng batch thành [`batch=64`](https://github.com/AlexeyAB/darknet/blob/0039fd26786ab5f71d5af725fc18b3f521e7acfd/cfg/yolov3.cfg#L3)
 * Thay đổi dòng subdivisions thành [`subdivisions=64`](https://github.com/AlexeyAB/darknet/blob/0039fd26786ab5f71d5af725fc18b3f521e7acfd/cfg/yolov3.cfg#L4)
 * Thay `classes=80` thành số class object của bạn tại: [dòng 610](https://github.com/AlexeyAB/darknet/blob/0039fd26786ab5f71d5af725fc18b3f521e7acfd/cfg/yolov3.cfg#L610), [dòng 696](https://github.com/AlexeyAB/darknet/blob/0039fd26786ab5f71d5af725fc18b3f521e7acfd/cfg/yolov3.cfg#L696) và [dòng 783](https://github.com/AlexeyAB/darknet/blob/0039fd26786ab5f71d5af725fc18b3f521e7acfd/cfg/yolov3.cfg#L783)
 * Thay [`filters=255`] thành filters = (classes + 5)*3 tại: [dòng 603](https://github.com/AlexeyAB/darknet/blob/0039fd26786ab5f71d5af725fc18b3f521e7acfd/cfg/yolov3.cfg#L603), [dòng 689](https://github.com/AlexeyAB/darknet/blob/0039fd26786ab5f71d5af725fc18b3f521e7acfd/cfg/yolov3.cfg#L689) và [dòng 776](https://github.com/AlexeyAB/darknet/blob/0039fd26786ab5f71d5af725fc18b3f521e7acfd/cfg/yolov3.cfg#L776). Ví dụ: nếu số class bằng 1 thì ta có `filters=18` , số class bằng 2 thì `filters=21 `.
 2. Tạo file `obj.names` với tên của mỗi class được đặt vào 1 dòng(giống với file `class_list.txt `bên trên)
 3. Tạo file obj.data chứa:
```
 classes= 2
 train  = data/train.txt
 valid  = data/test.txt
 names = data/obj.names
 backup = backup/
```
 
 Trong đó:
* File train.txt và test.txt chứa danh sách tên các ảnh, mỗi ảnh một dòng cùng với đường dẫn đến ảnh đó. Ví dụ:
```
data/obj/img1.jpg
data/obj/img2.jpg
data/obj/img3.jpg
```
Bạn có thể tham khảo đoạn code ngắn để tạo file train.txt tại [đây](https://github.com/Sotatek-HoangTran/Yolo_tool/blob/master/train_folder.py).

Sau khi đã tạo xong file train.txt hãy chuyển file img và anno về cùng folder data/obj

Chú ý: tất cả những đường dẫn trên đều phải ở trong thư mục darknet.

4. Tải pre-trained weights của convolution layers: https://pjreddie.com/media/files/darknet53.conv.74


## 5. Huấn luyện trên mạng Darknet

Bắt đầu huấn luyện mạng bằng dòng lệnh: `darknet.exe detector train data/obj.data yolo-obj.cfg darknet53.conv.74 `trên window hoặc `./darknet detector train data/obj.data yolo-obj.cfg darknet53.conv.74` trên linux.
* `(file yolo-obj_last.weights` sẽ được lưu vào folder backup với mỗi 100 iterations)
* `(file yolo-obj_xxxx.weights` sẽ được lưu vào folder backup với mỗi 1000 iterations)
* Sau mỗi 100 iterations bạn có thể dừng train và tiếp tục training bằng dòng lệnh: `darknet.exe detector train data/obj.data yolo-obj.cfg backup/yolo-obj_last.weights`

## 6. Tổng kết và cảm ơn

Vậy là qua bài viết vừa rồi bạn đã biết cách training một model để detect một object tuỳ ý. Tuy nhiên bài viết mới chỉ đề cập đến một phần nhỏ của mạng darknet của AlexeyAB để hiểu rõ hơn bạn có thể tiếp tục đọc (https://github.com/AlexeyAB/darknet#how-to-train-to-detect-your-custom-objects). Cảm ơn đã theo dõi.

* Link tham khảo: https://medium.com/sota-tek-jsc
* cảm ơn: https://medium.com/@hoang.tran_2603