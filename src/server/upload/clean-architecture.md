# 1. Clean Architecture là gì?
Clean Architecture được xây dựng dựa trên tư tưởng "độc lập" kết hợp với các nguyên lý thiết kế hướng đối tượng(đại diện tiêu biểu là Dependency Inversion). Độc lập ở đây nghĩa là việc project không bị phụ thuộc vào framework và các công cụ sử dụng trong quá trình kiểm thử.

Kiến trúc của Clean Architecture chia thành 4 layer với một quy tắc phụ thuộc. Các layer bên trong không nên biết  bất kỳ điều gì về các layer bên ngoài. Điều này có nghĩa là nó có quan hệ phụ thuộc nên "hướng" vào bên trong. Nhìn vào hình vẽ minh họa sau đây:

![](https://images.viblo.asia/594d086c-73c2-4802-9266-55c7914f3f43.jpeg)

***Entities***: là khái niệm dùng để mô tả các Business Logic. Đây là layer quan trọng nhất, là nơi bạn thực hiện giải quyết các vấn đề - mục đích khi xây dựng app. Layer này không chứa bất kỳ một framework nào, bạn có thể chạy nó mà không cần emulator. Nó giúp bạn dễ dàng test, maintain và develop phần business logic.

***Use case*** : chứa các rule liên quan trực tiếp tới ứng dụng cục bộ (application-specific business rules).

***Interface Adapter*** :  tập hợp các adapter phục vụ quá trình tương tác với các công nghệ.

***Framework and Drivers*** : chứa các công cụ về cơ sở dữ liệu và các framework, thông thường bạn sẽ không phải lập trình nhiều ở tầng này. Tuy nhiên cần chắc chắn về mức ưu tiên sử dụng các công cụ này trong project.

**====>>>> Code của các class thuộc lớp trong không được tham chiếu đến code của class thuộc lớp ngoài.**

Thông thường thì một ứng dụng của bạn có thể có tùy ý số lượng các layer. Thường thì một ứng dụng Android sẽ có 3 layer: 

* **Outer**: Implementation layer: là nơi mà tất cả mọi thứ của framwork xảy ra, điều này bao gồm tất cả các công cụ Android như là tạo các activity, các fragment, gửi intent, networking và databases.
* **Middle**: Interface adapter layer: là hoạt động như một kết nối giữa business logic và framework specific code.
* **Inner**: Business logic layer: tương tự như trên.

Đối với mỗi layer ở trên core layer đều có trách nhiệm chuyển đổi các model thành các model layer thấp hơn trước khi các layer thấp hơn có thể sử dụng đến chúng. Tại sao việc chuyển đổi model là cần thiết? Ví dụ, các business logic model của bạn có thể không thích hợp cho việc hiển thị chúng đối với người dùng cuối, bạn có thể sẽ phải kết hợp nhiều nhiều business logic model cùng một lúc. Vì vậy, bạn nên tạo một lớp ViewModel để có thể dễ dàng hiển thị UI. Sau đó, hãy sử dụng một lớp converter ở outer layer để chuyển đổi các business model của bạn sao cho thích hợp với ViewModel. Tóm lại là chuyển đổi Model để phù hợp với chức năng của từng layer!


Đi vào ví dụ cho dễ hiểu nha: Ở đây mình áp dụng với project MovieDB quen thuộc, mình chia project ra làm 3 tầng như sau: domain, data và presentation:

![](https://images.viblo.asia/e83eaadc-5495-40c2-ae2c-51f55b332d20.png)

*  **Package presentation(Outer)**:  nó chứa UI, Network, Storage, ... UI là nơi bạn có thể đặt các Activity, Fragment hay các đoạn code có liên quan tới  user interface. Storage - Database specific code được implements các Interactors interface để thực hiện truy cập dữ liệu và lưu trữ dữ liệu. Ví dụ như ContentProviders hay DBFlow. Network: gồm những code liên quan tới mạng như là Retrofit: 

![](https://images.viblo.asia/7511f06c-8946-485b-9d6b-1401e86a628b.png)

*  **Package data (Middle)** : Đây là layer kết nối thực hiện business logic.  Presenters - xử lý các event từ UI (như là click, touch) và phục vụ các callback từ inner layer. Interface EntityMapper - Có trách nhiệm chuyển đổi inner models thành outer models và ngược lại: 

![](https://images.viblo.asia/290f12d7-887b-4ce5-ad31-7021383e387f.png)

* **Package domain(Inner)** : Core layer chứa code ở mức level cao nhất. Tất cả các classlà các POJO. Các Class và Object tại layer này không có “knowledge” mà chúng đang chạy trong một Android app và có thể dễ dàng thực hiện trên bất kỳ máy chạy JVM nào. Ở đây ta chú ý tới Model, Usecase và Repo. Models - là mô hình business của bạn, nơi bạn tao thao tác các business logic. Usecase - đây là những class thực sự chứa business logic của bạn. Chúng được chạy ở background và giao tiếp event với layer trên sử dụng callbacks. Repo thì tương tự như chúng ta đã biết: 

![](https://images.viblo.asia/6a8fb6bf-43da-4698-94d4-1a8a9fc9507c.png)

Để ý một chút, như mình đã nói ở trên thì các layer bên trong không nên biết  bất kỳ điều gì về các layer bên ngoài, có thể thấy trong các file build.gradle của các module như sau: 

* module domain: dependencies không implement bất kỳ module nào khác nữa.


*  module data: dependencies implement thêm module domain: 

![](https://images.viblo.asia/3a830ee1-03d5-41f5-9e6d-48a63f130cb4.png)

* module presentation: dependencies implement thêm module domain và data:

![](https://images.viblo.asia/baa80484-a412-44c0-be08-b22422713834.png)


# 2. Lợi ích của Clean Architecture
Theo như mình được biết thì Clean Architecture mang lại những lợi ích sau: 

* Mạch lạc - dễ xem (bản gốc ghi screaming với dụng ý là chỉ cần nhìn cấu trúc package cũng có thể hiểu được mục đích và cơ chế hoạt động của ứng dụng)
* Linh hoạt - thể hiện ở khả năng độc lập, không phụ thuộc vào framework, database, application server.
* Dễ kiểm thử - testable
# 3. Hạn chế của Clean Architecture
Bên cạnh những lợi ích trên thì Clean Architecture còn những hạn chế sau:

* Không thể sử dụng framework theo cách mỳ ăn liền- do luật dependency inversion.
* Khó áp dụng
* Indirect - quá nhiều interface?
* Cồng kềnh - thể hiện ở việc có quá nhiều class so với các project cùng mục tiêu (tuy nhiên các class được thêm vào đều có chủ ý và đáp ứng đúng quy định khi triển khai kiến trúc)

Nếu suy luận từ những hạn chế của Clean Architecture, chúng ta rút ra được một số điểm cần chú ý khi áp dụng Clean Architecture:

* Trình độ của team? Khi khả năng team member có hạn và họ không thích kiểu kiến trúc này (có thể do thói quen hoặc do "lười" đổi mới) thì dĩ nhiên áp đặt lên đầu họ các tư tưởng ở mục #1 chỉ kéo hiệu suất của team đi xuống.
* Cần duy trì và nâng cấp hệ thống kể cả khi người làm ra nó đã rời khỏi công ty?
* Cần duy trì hệ thống ổn định, không phụ thuộc vào sự sinh-tử của framework?

Project tham khảo: [https://github.com/DongHien0896/Kotlin---Clean-chitecture](https://github.com/DongHien0896/Kotlin---Clean-chitecture)
# 4. So sánh với MVP và MVVM
Ở đây mình không so sánh mô hình nào nên dùng hơn mô hình nào, mà tùy trường hợp mọi người dùng mô hình nào cho thích hợp với dự án của mình. Mình xin nêu ra ưu nhược điểm của MVP và MVVM nhé! 

**MVP : Model - View - Presenter**
-   Ưu điểm: Chúng ta có thể dễ dàng viết unit test cho presenter vì nó không gắn với bất cứ view và API nào của Android và nó cũng cho phép chúng ta làm việc với các view khác miễn là view đó implement interface liên kết. Các nhiệm vụ của từng layer giờ đã được chia ra và rõ ràng hơn. Các Class trên từng layer giờ đã ngắn gọn hơn, ít bug hơn, dễ dàng review code.

-   Nhược điểm: Nó sẽ trở lên rườm rà khi ta xây dựng với các ứng dụng nhỏ, hoặc với các Activity đơn giản. Khó sử dụng lại logic code trong Presenter cho các View khác. Khả năng duy trì - Cũng giống như Controller, Presenter dễ dàng bị thêm các business logic rải rác qua thời gian. Các developers sẽ rất khó để chia nhỏ presenter khi đã quá lớn. Tất nhiên, một developer có thể ngăn ngừa điều này nếu cẩn thận phòng tránh vấn đề này theo thời gian. Tuy nhiên, MVVM có thể giúp giải quyết vấn đề này bằng cách làm ngắn gọn hơn!

**MVVM: Model - View - ViewModel**

Trong MVVP sẽ có sự ràng buộc data 2 chiều giữa View và View-Model. Nó cho phép tự động cập nhật data từ View-Model qua View. Thông thường View-Model sử dụng mô hình Observer để thực hiện cập nhật data từ View-Model qua View và ngược lại.

– Thay thế Presenter trong MVP bằng View-Model nhưng không chỉ đơn thuần là vậy.

– Xóa bỏ UI code trong Activity, Fragment.

– View không biết đến Model.

– Data binding sẽ bind View-Model qua Layout.

– View-Model: sẽ đảm nhận công việc đồng bộ dữ liệu từ model lên View. Mối quan hệ giữa View và View-Model là View sẽ được ánh xạ tới View-Model nhưng View-Model lại không biết thông tin gì về View. Nó được ẩn dấu qua cách sử dụng Data-binding và cơ chế của mô hình Observer. Một View-Model có thể được ánh xạ từ nhiều View.

– View: Trong mô hình Observer thì View sẽ là thành phần lắng nghe và emit các event từ người dùng và từ life cycle của View qua View-Model.

* Ưu điểm: Thực hiện Unit testing bây giờ sẽ rất dễ dàng, vì bạn thực sự không phụ thuộc vào view. Khi test bạn chỉ cần xác nhận rằng các biến observable được set thích hợp khi model thay đổi. Không cần phải tạo mockup cho view để test như ở mô hình MVP.

* Mặt hạn chế :
Khả năng duy trì - Khi view có thể gán cả biến và biểu thức, các logic không liên quan sẽ tăng dần theo thời gian, ảnh hưởng đến việc thêm code vào XML. Để phòng tránh điều nay, luôn luôn lấy giá trị trực tiếp từ ViewModel so với việc cố gắng tính toán và viết lại chúng khi gán biểu thức ở view.

Cả MVP và MVVM đều tốt trong việc chia nhỏ ứng dụng thành các modular, các component đơn mục đích, nhưng chúng cũng làm ứng dụng của bạn phức tạp hơn. Với một ứng dụng đơn giản với chỉ một hoặc hai screens, MVC sẽ ổn. MVVM với data binding sẽ ít code hơn. Vậy tùy project mà mỗi mô hình đều có ưu thế riêng, tùy vào cách thức chọn lựa của mỗi người. Chúc mọi người code vui vẻ! :)

Tham khảo: 
[https://techmaster.vn/posts/34271/kien-truc-sach-clean-architecture](https://techmaster.vn/posts/34271/kien-truc-sach-clean-architecture)