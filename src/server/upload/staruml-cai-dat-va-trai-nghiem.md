# Giới thiệu
`StarUML`  là một mô hình nền tảng, là phần mềm hỗ trợ UML (Unified Modeling Language). Nó hỗ trợ các phương pháp tiếp cận MDA (Model Driven Architecture) bằng cách hỗ trợ các khái niệm hồ sơ UML. Tức là StarUML hỗ trợ phân tích và thiết kế hệ thống một điều mà bất cứ dự án nào đều cần có.
Ngoài ra dùng StarUML sẽ đảm bảo tối đa hóa năng suất và chất lượng của các dự án phần mềm của bạn.  Vì nó cho phép mô hình hóa nên sẽ không phụ thuộc vào người code, ngôn ngữ code hay nền tảng sử dụng. Do mô hình hóa nên rất dễ đọc và dễ hiểu.
Một điều mình thích nhất ở StarUML là khả năng tự sinh code từ những mô hình class.
# Cài đặt
Để sử dụng được StarUML thì trước hết phải cài đặt nó, có thể tải trực tiếp từ trang chủ của [staruml](http://staruml.io/download)
Đối với `ubuntu` sau khi tải về cần cài đặt, chạy các lệnh dưới đây (cần thay phiên bản phù hơp):
```
wget http://staruml.io/download/releases/StarUML-3.0.1-x86_64.AppImage
chmod +x StarUML-3.0.1-x86_64.AppImage
./StarUML-3.0.1-x86_64.AppImage
```
# Sử dụng
Mở StarUML lên, để bắt đầu sử dụng bạn có thể thiết lập các thông số của project theo nhu cầu sử dụng:
![](https://images.viblo.asia/d35f8aa1-40a7-4b33-adf5-2d9bae72e829.PNG)

Đầu tiên sẽ có một model Main tạo sẵn có thể thiết kế class tổng quát trong này.
Hoặc nếu bạn muốn tạo một sơ đồ khác thì cần click chuột phải vào tên Project hoặc  Model  chọn Add Diagram -> Chọn một diagram muốn tạo
![](https://images.viblo.asia/e4010d7a-5be3-4c1d-a6f7-0b8f42c21a40.png)

StarUML hỗ trợ đầy đủ các khái niệm hồ sơ UML:

*  Class Diagram
*  Package Diagram
*  Object Diagram
*  Composite Structure Diagram
*  Component  Diagram
*  Deployment Diagram
*  Use Case Diagram
*  Sequence Diagram
*  Comunication Diagram
*  Statechart  Diagram
*  Activity  Diagram
*  Profile  Diagram
*  ER  Diagram  (mô hình quan hệ - thực thể; CSDL)
*  Flowchart Diagram
*  Data Flow  Diagram

Với mỗi Diagram khi tạo sẽ cho ra một model mới. Bằng cách kéo thả các thành phần bên phải vào thì sẽ xây dựng được một Diagram hoàn chỉnh. Mọi người có thể tự mình thử, rất hữu ích.

**Note**: các thực thể được định nghĩa ở các Diagram khác nhau cũng có thể được sử dụng lại bằng cách kéo thả từ bên phải vào.
# Tự sinh code bằng StarUML
Không phụ thuộc vào nền tảng, ngôn ngữ nên StarUML có thể biên dịch ra tất cả các ngôn ngữ (mới thử với `PHP`). Tức là từ các Diagram ta có thể sinh ra code của một ngôn ngữ một cách tự động. Thật tuyệt khi không cần code chỉ cần thiết kế là code tự sinh!
Sau đây mình xin giới thiệu tính năng tuyệt vời này.
## Cài đặt Extension
Trước hết để sử dụng ta cần cài đặt Extension của ngôn ngữ muốn sinh code vào StarUML, Click vào biểu tượng hình mảnh ghép phía trên cùng. Sau đó chọn ngôn ngữ muốn thêm:
![](https://images.viblo.asia/02c3215b-9bd9-4ea3-9c4d-2281f8c98fbd.PNG)

## Sinh code tự động
Sau khi cài xong Extension 
Chúng ta cần có một Diagram, ở đây mình đã xây dựng một Class Diagram:
![](https://images.viblo.asia/1f25e87a-8d4d-4702-ba83-014d81a294e8.PNG)

cần chỉ ra chính xác các thuộc tính và phương thức với các data type, access modifiers tương ứng,  các quan hệ giữa các class.
Bây giờ các yếu tố cần thiết đã đầy đủ chúng ta có thể bắt đầu sinh code chỉ tốn trong 2s 
Chọn Tools-> Ngôn ngữ đã Extension -> Generate Code -> chọn Model -> save
![](https://images.viblo.asia/89fc20e5-daa8-4af9-8ee3-66b9013bf129.png)

Vậy là ta đã có code, code chưa bao giờ là dễ đến thế!!!!
# Kết luận
Phân tích thiết kế trước khi làm sẽ cho ta không phải vất vả khi bắt đầu cũng như bảo trì. 
StarUML - một mô hình nền tảng hỗ trợ mạnh điều đó mà bạn nên thử.

Bài viết có tham khảo video của [Ramdom Access Videos](https://www.youtube.com/watch?v=GPWpE66pmHk)