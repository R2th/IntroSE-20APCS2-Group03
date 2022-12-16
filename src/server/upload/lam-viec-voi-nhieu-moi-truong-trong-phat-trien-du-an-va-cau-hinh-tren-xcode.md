## Giới thiệu
Trong quá trình phát triển dự án chúng ta sẽ trải qua các giai đoạn như : Develop, Test, UAT, Release.

``Vậy làm thế nào chúng ta có thể quản lý các môi trường này và cấu hình nó trong project của mình?``

Bài viết này sẽ giúp bạn giải đáp câu hỏi trên.

Ứng với mỗi giai đoạn phát triển lại gắn liền với một môi trường. 
Ví dụ như trong quá trình phát triển và test chúng ta sẽ dùng môi trường staging, khi khách hàng UAT sẽ dùng môi trường Develop, và khi dự án release đưa vào sử dụng sẽ là môi trường Production.
Với mỗi môi trường sẽ có server URL khác nhau, việc thay đổi này khá bất tiện trước mỗi lần build. Chính vì thế cần cấu hình vào project của mình, bài viết này sẽ hướng dẫn bằng cách dùng Scheme.

## Thiết lập project

### 1. Mở Xcode và tạo ứng dụng mới

![](https://images.viblo.asia/af0dd61d-5812-4c63-9615-6ba01a85ec9a.png)

### 2. Tạo thêm các Scheme
Với mỗi Scheme đều có 2 cấu hình khác nhau đó là Debug và Release. Tạo thêm các cầu hình Build như hình dưới :
![](https://images.viblo.asia/7682c640-39d1-4c91-a766-e4d1b29f0f74.png)

sau khi đã tạo đủ các scheme theo mong muốn bạn có thể đổi tên chúng

![](https://images.viblo.asia/23f75d01-c349-4e02-a3a5-7545842b33fd.png)

Sau khi đã tạo xong các cấu hình build, chúng ta tiến hành tạo các scheme. 
Ở góc trên bên trái chúng ta chọn Manager Schemes để tiến hành tạo thêm các scheme. Ban đầu nó sẽ có sẵn 1 scheme, trong bài này chúng ta coi đó là môi trường staging
![](https://images.viblo.asia/d8296be1-d308-4a8e-868b-aa70ddad502a.png)

![](https://images.viblo.asia/83cf7653-033a-4707-8a7c-01568b3a414b.png)
                                    *Tạo thêm Scheme*
Chúng ta cũng tiến hành tạo thêm 2 môi trường là Develop và Production. 

![](https://images.viblo.asia/386cd78e-7f2a-46de-a46e-3021e2e38262.png)

Giờ ở phần chọn scheme sẽ có thêm 2 lựa chọn mới để run project
![](https://images.viblo.asia/6c914560-8954-4497-b166-be25e080e366.png)

### 3. Cấu hình cho từng Scheme
Sau khi đã tạo xong các Scheme, chúng ta cần cấu hình cho từng scheme tương ứng với các cấu hình build đã tạo trước đó .
![](https://images.viblo.asia/d1113e76-54b2-42ac-a26a-8ea71d2d44ae.png)

Sau khi đã cấu hình xong các bạn hãy vào Build Settings để thêm các định danh với từng môi trường, nó hỗ trợ  trong quá trình xử lý code.

Vào mục Build Settings của target project , tìm đến phần ``Active Compilation Conditions`` và đặt định danh 
![](https://images.viblo.asia/5b537710-de5a-4f1f-a1b0-b9d3eb2a2c3d.png)

### 4. Coding
Giờ bạn đã có được cho mình 3 môi trường staging, develop, production cho từng giai đoạn. Việc cuối cùng đó là tiến hành kiểm tra môi trường để xử lý code tương ứng dựa vào định danh đã đặt ở trên:

``` swift
        #if DEBUG || RELEASE
        print("Staging")
        #elseif DEVELOP_DEBUG || DEVELOP_RELEASE
        print("Develop")
        #else
        print("Production")
        #endif 
 ```
 Khi build với từng scheme sẽ chạy vào đoạn code tương ứng.
 
 Nếu bạn có dùng cocoapods thì nhớ pod install lại nhé !
 
 Bài viết này mong muốn giúp ích cho các bạn trong quá trình phát triển dự án Ios với nhiều môi trường.