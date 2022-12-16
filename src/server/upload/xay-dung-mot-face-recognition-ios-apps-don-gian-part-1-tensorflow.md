# 1. Tensorflow cho mobile là gì ?
TensorFlow cung cấp một bộ công cụ để giúp các nhà phát triển xây dựng ứng dụng chạy các mô hình TensorFlow ngay trên thiết bị di động, nhúng hay IoT. Nó cung cấp khả năng thực hiện máy học với độ trễ thấp và kích thước nhị phân nhỏ. ![](https://images.viblo.asia/265c583a-78d3-4ee2-8a61-fae8d121c401.png)
### Tensorflow bao gồm 2 thành phần chính:


* Trình thông dịch chạy các mô hình được tối ưu hóa đặc biệt trên nhiều loại phần cứng khác nhau, bao gồm cả điện thoại di động, thiết bị Linux nhúng và bộ vi điều khiển.


* Trình chuyển đổi, chuyển đổi các mô hình TensorFlow thành một hình thức hiệu quả để trình phiên dịch sử dụng và có thể giới thiệu tối ưu hóa để cải thiện kích thước và hiệu suất tập nhị phân.


TensorFlow được thiết kế để giúp bạn dễ dàng thực hiện việc học máy trên các thiết bị thay vì phải gửi dữ liệu qua lại từ máy chủ. 
### Việc thực hiện học máy trên thiết bị có thể giúp cải thiện:
*  Độ trễ: không có việc phải giao tiếp qua lại với server
* Quyền riêng tư: không cần gửi dữ liệu rời khỏi thiết bị
* Kết nối: không cần kết nối Internet
* Tiêu thụ điện năng: kết nối mạng làm tiêu tốn nhiều điện năng
* TensorFlow hoạt động  hầu hết với các loại thiết bị, từ vi điều khiển nhỏ đến điện thoại di động mạnh mẽ.

### Các tính năng chính 
* Trình thông dịch được điều chỉnh cho ML trên thiết bị, hỗ trợ một bộ toán tử lõi được tối ưu hóa cho các ứng dụng trên thiết bị và với kích thước nhị phân nhỏ. 


* Đa dạng hỗ trợ nền tảng, bao gồm các thiết bị Android và iOS, Linux nhúng và vi điều khiển, sử dụng API nền tảng để tăng tốc tính toán. 


* API cho nhiều ngôn ngữ bao gồm Java, Swift, Objective-C, C ++ và Python. 


* Hiệu suất cao, với khả năng tăng tốc phần cứng trên các thiết bị được hỗ trợ, hạt nhân được tối ưu hóa cho thiết bị và các kích hoạt và xu hướng được hợp nhất trước. 


* Các công cụ tối ưu hóa mô hình, bao gồm lượng tử hóa, có thể giảm kích thước và tăng hiệu suất của các mô hình mà không làm giảm độ chính xác. 


* Định dạng mô hình hiệu quả, sử dụng FlatBuffer được tối ưu hóa cho kích thước nhỏ và tính di động. 


* Các mô hình được đào tạo trước cho các tác vụ học máy thông thường có thể được tùy chỉnh cho ứng dụng của bạn. 


* Các mẫu và hướng dẫn chỉ cho bạn cách triển khai các mô hình học máy trên các nền tảng được hỗ trợ

###  Quy trình phát triển 
Quy trình làm việc để sử dụng TensorFlow  bao gồm các bước sau: 
 ![](https://images.viblo.asia/950e3e4c-ab5e-4f88-a4f1-0fca1bf661b5.png)   
* Chọn một mô hình : Chọn một mô hình mới hoặc đào tạo lại một mô hình hiện có.


![](https://images.viblo.asia/ab102008-c4d5-4299-b00e-2b30e35dbef7.png)
* Chuyển đổi mô hình: Nếu bạn đang sử dụng một mô hình tùy chỉnh, hãy sử dụng trình chuyển đổi TensorFlow Lite và một vài dòng Python để chuyển đổi nó sang định dạng TensorFlow Lite.


![](https://images.viblo.asia/a8c5b61c-2795-4199-98eb-33c9f1b28b87.png)
* Triển khai dự án của bạn : Chạy mô hình của bạn trên thiết bị với trình thông dịch TensorFlow Lite, với API bằng nhiều ngôn ngữ


![](https://images.viblo.asia/d52f175e-d7c7-42fe-913f-24ded16b3efd.png)
*  Tối ưu hóa mô hình của bạn : Sử dụng Bộ công cụ tối ưu hóa mô hình  để giảm kích thước mô hình của bạn và tăng hiệu quả của nó mà không ảnh hưởng đến độ chính xác.

# 2. Thêm Tensorflow vào project của bạn
TensorFlow cung cấp các thư viện iOS gốc được viết bằng Swift và Objective-C.  Để thêm TensorFlow vào dự án của bạn :

### CocoaPods
use_frameworks!
> pod 'TensorFlow-experimental


### Phần tiếp theo mình sẽ hướng dẫn làm sao để load mô hình và sử dụng để tạo một ứng dụng đơn giản Recognition Facenet