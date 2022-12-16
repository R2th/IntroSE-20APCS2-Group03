Note: 
    
*  Link bài dịch: https://www.surekhatech.com/blog/find-memory-leaks-in-ios-apps-with-xcode-instruments

* Một số từ mình sẽ giữ nguyên vì dịch không còn đúng nghĩa nữa: viewcontroller, memory leaks,...
    
Ngày nay, có nhiều ứng dụng được đẩy lên app store,  để làm cho ứng dụng của bạn nổi bật trong số đó, ứng dụng của bạn nên tiêu thụ ít bộ nhớ trong khi vẫn cung cấp trải nghiệm nhanh và tốt hơn.

Apple cung cấp những công cụ tuyệt vời với Xcode để lập profile ứng dụng cho việc tìm memory leaks và các công cụ phát hiện bug tuyệt vời khác. Hôm nay, tôi sẽ hướng dẫn bạn thông qua ví dụ nhỏ để bạn biết làm cách nào có thể phát hiện leaks trong ứng dụng.

Các bước làm

1. Đầu tiên, download project mẫu theo link được cung cấp ở cuối bài viết để debugging leaks trong ứng dụng mẫu đó.
    Khi bạn chạy ứng dụng, bạn sẽ thấy bộ nhớ được sử dụng bởi ứng dụng tăng lên khi bạn làm theo các bước sau:
    
    * Vào tableview chứa list hình ảnh

    * Click vào hình ảnh để xem chi tiết

    * Quay lại tableview những hình ảnh.

    * Làm theo các bước này khoảng 30-40 lần. 
 
Bạn có thể thấy việc sử dụng bộ nhớ của ứng dụng sẽ tăng lên liên tục.

![](https://images.viblo.asia/34dc7e14-d1fb-4398-ade9-7b0f4a85483e.png)

Để theo dõi các vấn đề về bộ nhớ trong ứng dụng của bạn, bạn có thể sử dụng công cụ allocations được cung cấp bởi Apple. Hãy bắt đầu với một ứng dụng mẫu để làm quen với nó 

 2. Chuẩn bị ứng dụng của bản cho việc bắt memory leaks.
 
Apple cung cấp một công cụ tuyệt vời gọi là instruments cho việc tìm memory leaks trong ứng dụng. Để sử dụng nó: 

* Chọn Product > Profile in your Xcode
* Chọn Allocations trong profiler
* Nhấn ![](https://images.viblo.asia/40410932-2125-4d85-ae7c-545b030b6482.png)  trong cửa sổ làm việc. Điều này sẽ bắt đầu ứng dụng của bạn một cách bình thường.

3. Phân tích ứng dụng của bạn cho việc rò rỉ bộ nhớ. 

Bây giờ bắt đầu sử dụng ứng dụng như bình thường. Để có được bug leaks, người dùng nên lặp lại các bước trong ứng dụng, nó sẽ khiến memory tăng cao.

Trong trường hợp của chúng tôi khi bạn qua lại SecondViewController tới DetailViewController thì memory sẽ tăng rất nhiều. Làm điều này 30 - 35 lần, sau đó click vào nút Pause.

Bạn sẽ thấy biểu đồ như hình bên dưới, nơi mà nó đang tiếp tục tăng lên. Nó có nghĩa là có một leak trong ứng dụng. Vì vậy hãy tìm nó.

![](https://images.viblo.asia/22907156-e128-405f-80d0-41f52f24691e.png)

Có một số điều cần ghi nhớ.

1. Tại đây, bạn sẽ chọn vào Details > Call Trees, cái mà sẽ show cho bạn list các dòng với mức tiêu thụ bộ nhớ.

Chọn dòng với hầu hết các bytes được sử dụng. Nhìn hình bên dưới 

![](https://images.viblo.asia/7610b2d0-ef27-4b93-ba54-5c10062a3a4e.png)

2. Bạn có thể thấy nhiều cuộc gọi hệ thống, ở đó có những thứ không hữu ích cho mục đích của chúng ta. Bạn nên ẩn những cuộc gọi đó từ danh sách bằng cách chọn tuỳ chọn  Hiding System Libraries trong cài đặt hiển thị.

3. Như vậy, đảm bảo rằng Record reference counts được kiểm tra, điều này sẽ hữu ích cho việc theo dõi các leaks.

Bây giờ, Call Tree sẽ show chế độ xem dạng cây với các phương thức quen thuộc bên dưới.

![](https://images.viblo.asia/a63462e4-c81f-4a05-aaaa-d91f2d743011.png)

Bây giờ chọn dòng để đi vào chi tiết memory leaks, sẽ dẫn đến code bên trong editor có thể gây ra vẫn đề bộ nhớ . Trong trường hợp sau đây, code được hiển thị như bên dưới.

![](https://images.viblo.asia/cad68692-bc22-4028-b50b-dd982ceaefab.png)

Để đảm bảo hơn, chọn Details > Statistics và tìm kiếm, DetailViewController nơi mà chúng ra đang đối mặt với vấn đề.

![](https://images.viblo.asia/253458b8-0393-4ad3-a504-06a0adb2ed6c.png)

Như bạn thấy trong hình ảnh trên, 27 trường hợp đã được tạo ra, nhưng không có trường hợp nào released. Chọn nó để lấy list các instance cho nó.

![](https://images.viblo.asia/d6d632b4-9f32-4da8-b7c8-dfbe120de2f6.png)

Chọn bất kỳ trong số chúng vì tất cả đều cùng loại để theo dõi vấn đề. Khi bạn sẽ chọn bất kì trong số chúng, nó sẽ show như màn hình bên dưới.

![](https://images.viblo.asia/8fa3c187-0a9d-4adc-8428-9b2bf6cf81a2.png)

Hãy chắc chắn rằng bạn đã chọn Unpaired để lọc danh sách tốt hơn. Tìm dòng nơi mà thư viện có trách nhiệm được khai báo không phải là UIKit và Event type "retain" và không liên quan đến Release đã được tạo ra. Từ đó phải được Retain để Released cho mọi Responsible Caller. 

Trong trường hợp của chúng tôi, nó nằm trên dòng 129 nơi mà Retain không liên quan kiểu Release. Nó trỏ đến viewDidLoad() trong DetailViewController.Vì vậy chúng ta bây giờ chúng ta chắc chắn rằng vấn đề về bộ nhớ được tạo trong viewDidLoad().

Nếu chúng ta quan sát code một cách chặt chẽ, chúng ta có thể suy luận ra chúng, biến dữ liệu đang loading file từ đường dẫn bên trong viewDidLoad(). Khi DetailViewController xuất hiện nó sẽ tự động được release.

Hãy nhìn vào dòng self.imageView.delegate = self, 
Nó thật đáng nghi ngờ bởi vì chúng ta không biết cái gì mà imageView đang giữ. Đi tới class CustomImageView.

Vì vậy vấn đề ở đây là biến var delegate thuộc kiểu AnyObject? và mặc định nó là strong.

Chúng ta đang gán đối tượng DetailViewController  cho delegate. Điều này đang tạo ra strong reference giữa DetailViewController và CustomImageView.

Vì CustomImageView là một con của DetailViewController, nó nên được định nghĩa là một weak variable để giải quyết memory leaks như một practice chung. Vì vậy hãy sửa nó lại và chạy lại ứng dụng

Khi chúng ta chạy lại ứng dụng, vấn đề của chúng ta đã được giải quyết.

Tải ứng dụng mẫu bạn vui lòng truy cập link bài viết gốc và tìm xuống dòng cuối cùng.