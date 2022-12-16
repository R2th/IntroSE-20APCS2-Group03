Một App Engine được tạo thành từ một tài nguyên ứng dụng đơn bao gồm một hoặc nhiều service. Mỗi service có thể được cấu hình để sử dụng runtime khác nhau và để vận hành những cài đặt performance khác nhau. Trong mỗi service, bạn deploy những version của service đó. Mỗi version sau đó chạy với một hoặc nhiều instance. Nó phụ thuộc vào lượng traffic mà bạn đã cấu hình để xử lý.
### 1. Các thành phần của 1 ứng dụng:
App Engine của bạn được tạo trong dự án Google Cloud khi bạn tạo một Application resource. App Engine bao gồm các service, version, instance tạo nên ứng dụng của bạn. Khi bạn tạo App Engine của bạn, tất cả tài nguyên của bạn được tạo trong region mà bạn chọn bao gồm code, cùng với cài đặt, credential, metadata.
Mỗi App Engine bao gồm ít nhất một service. Nó là default service và chứa nhiều version.
Biểu đồ sau giải thích cấu trúc của một ứng dụng App Engine:

![](https://images.viblo.asia/a2486261-971f-4023-b9ed-57df22e1c1c7.jpeg)

### 2. Service:
Mỗi service trong App Engine bao gồm source code từ app của bạn và những file cấu hình cho App Engine. Tập hợp của các file bạn deploy tới một service được gọi là một version đơn của service đó và mỗi lần bạn deploy tới service đó, bạn đang tạo thêm version trong cùng một service.
### 3. Version:
Có nhiều version trong một service cho phép bạn chuyển qua lại nhanh chóng giữa các version khác nhau. Bạn có thể điều hướng traffic tới một hoặc nhiều version cụ thể bằng việc migrating hoặc splitting traffic.
### 4. Instance:
Version trong service của bạn chạy một hoặc nhiều instance. Mặc định, App Engine sẽ mở rộng ứng dụng của bạn để phù hợp với tải. Ứng dụng của bạn sẽ tăng thêm số instance đang chạy để đảm bảo performance phù hợp hoặc giảm xuống để tối thiểu hóa các instance không hoạt động và cắt giảm chi phí.
### Kết luận:
Bài viết đã giới thiệu sơ qua về các thành phần của một App Engine trong Google Cloud cũng như ý nghĩa của các thành phần trong nó.
### Reference:
 Bài viết chủ yếu được dịch từ document sau: 
 https://cloud.google.com/appengine/docs/standard/java/an-overview-of-app-engine