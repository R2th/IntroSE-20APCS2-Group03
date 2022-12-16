Chúng ta đã cùng nhau tìm hiểu về Katalon Studio qua loạt bài [Automation test - Katalon](https://viblo.asia/s/automation-test-katalon-Q75wqNLQZWb). Trong bài viết này, chúng ta sẽ nghiên cứu một khả năng các của Katalon Studio đó chính là Mobile Testing, cách làm thế nào để tăng tốc cho dự án test automation và chạy testcase của bạn trên hàng trăm thiết bị của Kabiton trên cloud.
Chúng ta sẽ mặc định rằng bạn đã có kiến thức cơ bản và đầy đủ môi trường để phát triển bao gồm:

* Katalon Studio
* Node JS
* Appium
* Kobiton

# Tạo testcase automation test cho mobile sử dụng Katalon Studio Recording

### 1. Cài đặt app

* Tải app mẫu test – [Material Login Demo](https://github.com/katalon-studio/Material-Login-App-Test/blob/master/App%20Files/MaterialLoginExample.apk). 
* App này cung cấp cơ chế login đơn giản để chúng ta có thể tạo test.

### 2. Viết testcase đầu tiên

Katalon Studio cung cấp hai tool để tăng tốc viết automation test: **Mobile Object Spy** để nhanh chóng tìm ra các object trong dự án và **Mobile Recorder** để sinh ra mã automation từ những hành động đã record. Như bài hướng dẫn này sẽ tập trung vào tính năng **Recorder**, nếu cần, bạn vẫn có thể tham khảo thêm **Object Spy** ở [Katalon Studio Documentation](https://goo.gl/e2RfrH).

* Đầu tiên chúng ta sẽ tạo mới dự án, nhớ rằng chọn **Type** là "Mobile", điều này sẽ giúp Katalon cấu hình cho dự án có thể test ở chế độ mobile

![](https://images.viblo.asia/236538c4-7665-4dc8-8ed7-ab541e374a34.png)

* Sau khi đã tạo dự án và vào giao diện chính, hãy tạo một test case mới.
* Click vào **Mobile Recorder** button để mở cửa sổ sau
    - Ở mục *Device type* để có thể có thể liên kết với device của Kobiton, chúng ta phải chọn là "Kobiton devices"

![](https://images.viblo.asia/141ddbb4-14d4-4f5f-a219-92d0d32ee7bb.png)

- Ở mục *Device name*, hãy chú ý, nhiều bạn sau khi kết nối với Kobiton thì không thể load được device, điều này có thể giải quyết bằng cách hay vào account Kobiton và chọn những device bạn muốn test là *Favorite*, điều này sẽ giúp Katalon lấy được những device mà bạn muốn test với nó

![](https://images.viblo.asia/a90cfb2c-fd7e-4116-a6c1-ee043c5cc8cb.png)

* Sau khi hoàn thành, hãy chọn **Start** để bắt đầu quá trình record

![](https://images.viblo.asia/73807133-a015-4cf9-afb7-e0eabb5cbcfe.png)

* Nếu kết nối thành công thì bạn sẽ thấy giao diện của Katalon sẽ như bên dưới. Tại đây chúng ta có thể thấy được tất cả các UI trên test app ở mục "All Objects"
* Cửa sổ "Device view" sẽ cho phép chúng ta thao tác với device giống như ta đang sử dụng các máy ảo, việc này rất dễ dàng
* Bước tiếp theo hãy chọn "No account yet? Create one" để tạo một account trong test app, việc click sẽ được Katalon record lại thành action tap vào UI, bạn không cần phải thực hiện thủ công tại bước này.

![](https://images.viblo.asia/9366d67f-a30e-4b71-b9cc-6fdeadbed007.png)

* Nhập đầy đủ các thông tin, tại đây, mỗi khi click vào một textbox, Katalon sẽ cho ta chọn action thực hiện với textbox đó để record lại step, hãy chọn "Set text"
* Sau khi đã hoàn thành, hãy chọn "Create account" để hoàn thành việc record.

![](https://images.viblo.asia/9914ef0e-283c-47fc-b479-0d069751e9d9.png)

* Sau khi đã hoàn thành bước record, chúng ta sẽ thực hiện việc chạy lại test case vừa được record, hãy xem thành quả nhé.

![](https://images.viblo.asia/7f4495a4-2d7e-4d04-934c-363eba6842e5.png)

* Và đây là kết quả, bạn đã hoàn thành một testcase một cách đơn giản, Katalon sẽ report lại cho chúng ta thông tin testcase đã chạy như vậy

![](https://images.viblo.asia/7594cdff-8be6-409e-9677-ceeab7419500.png)

* Hãy tiếp tục với testcase tiếp theo nhé, và đây là "Login"

![](https://images.viblo.asia/8a747b0a-2805-44e6-b451-cfef846cb93a.png)

Đây là Video mình làm nhé: https://drive.google.com/file/d/1JOZb_mv5Nr8ABE65QC5efZXdVbNSIu24/view

### 3. Tổng kết

* Qua ví dụ trên:
    * Chúng ta đã tìm hiểu được thế nào để thực hiện một dự án đơn giản với automation mobile
    * Làm thế nào để tích hợp Kobiton (Cloud farm device), để việc chạy testcase chưa bao giờ nhẹ nhàng đến thế, nhất là với các bạn tester chưa có device test hoặc không thể cài được máy ảo
* Mong rằng qua ví dụ trên sẽ giúp các bạn mới bước chân vào nghề tester hoặc làm quen với mobile testing một cách dễ dàng nhất.
# Tham khảo

* https://www.toolsqa.com/katalon-studio/simple-mobile-automation-testing-katalon-studio/
* https://www.toolsqa.com/katalon-studio/testing-mobile-apps-using-katalon-studio-and-kobitons-cloud-based-device-farm/