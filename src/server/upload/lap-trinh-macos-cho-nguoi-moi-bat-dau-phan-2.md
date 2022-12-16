WELCOME BACK ^^

Đợt này dự án căng quá, khách hàng dí suốt ngày, cũng chẳng có thời gian nghiên cứu, tìm hiểu về cái gì mới mẻ hay hay ho cả. (buonvd)

Y nguyên như câu dưới:
```
Nhiều lúc khách hàng dí, đối tác dí, các xếp kêu, anh em dè bỉu, QA phũ phàng.
Tôi lại muốn bỏ tất cả ra bến cảng tìm cái tàu nào của Pháp, 
xin làm phụ bếp rồi sang châu Âu một thời gian, lúc về lại vẻ vang.
```

Thực ra hôm nay cũng chưa có ý tưởng viết về chủ đề gì cả, nên lên mạng đọc làm theo nâng cao kiến thức vậy.

Chào mừng trở lại phần 2 của hướng dẫn lập trình phát triển macOS dành cho những người mới bắt đầu!

Trong Phần 1 của loạt bài này, bạn đã học cách cài đặt Xcode, cách tạo ứng dụng mới, thêm UI, kết nối UI với code, chạy ứng dụng, gỡ lỗi ứng dụng và làm thế nào để được trợ giúp.
Ngoài ra chúng ta đã làm quen với việc sử dụng các thành phần UI đơn giản, nên ở phần 2 này chúng ta sẽ làm quen với những UI phức tạp hơn, các bạn sẽ học cách để tùy chỉnh độ lớn của window tùy thích. Cùng với đó là cách thiết kế và chuyển màn hình hay windown để hiện trong app của bạn

# Getting Started

Mở Xcode ra và click **Create a new Xcode project** từ cửa sổ **Welcome window** hoặc chọn **File/New/Project**
Tạo một project mới tên là "EggTimer", chọn sử dụng ngôn ngữ Swift và dùng Storyboard nhé.

# EggTimer App

Chúng ta sẽ tạo một app tên là EggTimer; nó sẽ đếm ngược thời gian trên màn hình hình. Sẽ có những chi tiết đồ họa biểu hiện việc luộc trứng như thế nào và các trạng thái của nó. Cửa sổ thứ hai của app sẽ hiện ra tùy chọn của app. Như hình dưới:

![](https://images.viblo.asia/4dbbc5d7-4337-49c7-ae3f-91e80ccbcf63.png)

Việc đầu tiên là hãy mở Storyboard lên, như đã giới thiệu ở phần trước thì trong giao diện của Storyboard sẽ tồn tại 3 thành phần
* "Application Scene"
* "Window Controller Scene" 
*  "View Controller Scene". 

**Application Scene** chứa thanh trình đơn và các menu xuất hiện bất cứ khi nào ứng dụng đang chạy. 
**Window Controller** là một phần của ứng dụng định nghĩa cách cửa sổ sẽ hoạt động như thế nào nó sẽ thay đổi kích cỡ, làm thế nào cửa sổ mới sẽ xuất hiện, cho dù ứng dụng sẽ lưu kích thước cửa sổ và vị trí vv. 
Một bộ **Window Controller** có thể quản lý nhiều hơn một cửa sổ, nhưng nếu họ cần các thuộc tính khác nhau, bạn sẽ cần thêm bộ điều khiển cửa sổ khác.
**View Controller** hiển thị giao diện người dùng bên trong cửa sổ - đó là nơi bạn sẽ bố trí UI cho màn hình chính.
Hãy chọn vào "Window Controller" trước, đối với app này bạn sẽ để độ lớn không nhỏ hơn 346x471, nó sẽ là độ lớn mặc định của app.

![](https://images.viblo.asia/14b56de0-28d9-4917-9690-4f3d84b646f2.png)

NOTE: Window Controller có một mũi tên trỏ vào nó. Điều này cho thấy nó sẽ kiểm soát màn hình ban đầu khi ứng dụng khởi động. Bạn có thể kiểm tra điều này bằng cách chọn Window Controller trong Document Outline và đi tới Inspector Attributes. Bỏ chọn là bộ điều khiển ban đầu và mũi tên sẽ biến mất. Kiểm tra lại lần nữa vì bạn muốn điều này là bộ điều khiển ban đầu.

Tiếp theo hãy vào "Size Inspector" trong mục "Ultilities" và chọn "Content Size Width" bằng 346 và tương tự với "Content Size Height" bằng 471. Chọn checkbox "Minimum Content Size" để độ lớn của window không nhỏ hơn kích thước này. Hãy chọn "Window" trong "WindowController" và sửa Title thành "EggTimer" và Autosave thành "EggTimerMainWindow" để lưu lại độ lớn và vị trí của windown sau mỗi lần chạy.

![](https://images.viblo.asia/049c8d2b-9d69-423b-a1cd-3d3c6a2567aa.png)

# Laying out the UI – part 1

Giao diện của chúng ta sẽ gồm 2 stack view. Cái đầu sẽ chứa text thời gian còn lại và ảnh quả trứng. Cái thứ 2 sẽ chứa 3 button ở bên dưới. Hãy bắt đầu với button trước :

* Tìm "Button" trong "Object Library"
* Kéo một Gradient button vào trong View Controller
* Dùng "Attribute Inspector" để bỏ ảnh và thêm title là "Start"
* Chuyển font thành System 24.

![](https://images.viblo.asia/f72e8ad9-4c87-4585-9e6c-745c44f22b31.png)

* Mở rộng button cho vừa với text
* Chọn Start button và ấn tổ hợp Command-D hai lần để tạo ra 2 bản sao chép
* Kéo 2 button mới đó ra cho dễ nhìn
* Sửa lại title của chúng thành "Stop" và "Reset"
* Chọn cả 3 button đó và chọn Editor/Embed In/Stack View.


![](https://images.viblo.asia/46d4b23b-a55d-4cfd-b1af-311c53a0c587.png)


Để làm cho các button nằm trong view thì hãy chọn Stack View mới và thực hiện những thay đổi sau trong Inspector Attributes:
* Distribution: Fill Equally
* Spacing: 0


![](https://images.viblo.asia/748a1868-716f-4c71-9fbb-3c396cd83b67.png)


Trong mục Document Outline, kéo chuột từ Start button sang Stack View và chọn Equal Heights. 
Làm tương tự cho 2 buttons còn lại.


![](https://images.viblo.asia/ba592235-bd82-48d4-9406-96f7597d3b01.png)

Hãy chạy thử app để xem giao diện của chúng ta


![](https://images.viblo.asia/7ee9f943-6f3e-4980-8d9a-7085a304c6ba.png)

Chú ý hãy bỏ Enable 2 nút stop và reset trong "Attribute Inspector" đi vì khá vô lý khi start còn chưa bắt đầu.

# Laying out the UI – Part 2

Stack View thứ 2 của chúng ta sẽ chứa phần text và phần ảnh quả trứng. Hãy kéo một Label vào trong View Controller, chỉnh Title của nó thành "6:00" và "Alignment" thành Center. Chỉnh font thành "Helvetica Neue" và chuyển font size thành 100. Điều này sẽ làm cho text trong label bị mất cho nên hãy chỉnh lại độ lớn cho label.


![](https://images.viblo.asia/18c864e1-10d4-45e6-af04-98b85f7cb3ec.png)

Để thêm một ảnh hãy vào "Object Library" và gõ "image". Hãy chọn "Image View", kéo nó vào trong View Controller và để nó ngay dưới Label. 
Hãy lấy ảnh ở [ĐÂY](https://koenig-media.raywenderlich.com/uploads/2017/01/EggTimerAssets-1.zip) nếu như bạn không có. 
Giải nén file lấy được về và kéo thả các ảnh vào trong "Assets.xcassets" trong "Project Navigator".
Bởi vì các tên tệp hình ảnh có chứa "@2x", nên chúng sẽ được tự động phân bố vào thư mục 2x trong image asset.


![](https://images.viblo.asia/06f9e53d-5635-4096-bb9a-65e8613b4fba.png)

Quay trở lại Storyboard, thêm ảnh vào trong "Image View" , sau đó hãy tạo Stack View thứ hai giống như cái đầu tiên bằng cách chọn cả label và ảnh sau đó ấn vào Editor/Embed In/Stack View. Hãy thêm constraint cho Stack View như sau:


![](https://images.viblo.asia/2870058b-5d36-41af-9a86-936768c810c4.png)

Sau khi làm xong ta sẽ thấy ảnh ở bên trong vẫn còn quá nhỏ, hãy set constraint cho ảnh như sau:


![](https://images.viblo.asia/04facea6-dc1a-4682-b4b9-398c13bb41fd.png)

Trong "Attributes Inspector", chọn "Scaling to Proportionally Up or Down".

Hãy chạy app và ta sẽ có kết quả:


![](https://images.viblo.asia/d7ae55d0-18c5-4920-803e-dcbe31a05810.png)

# Connecting the UI to the code

Giống như trong phần đầu bạn đã biết về @IBOutlets và @IBActions để kết nối tới UI. 

Trong phần này, bạn cần @IBOutlets cho:

* Time remaining label
* Egg image view
* The 3 buttons

Ba button sẽ cần cả @IBActions để bắn lên sự kiện khi chúng ta ấn vào nó. Trong "Project Navigator", chọn "Main.storyboard". Ấn tổ hợp "Option-click" vào "ViewController.swift" trong "Project Navigator" để mở "Assistant Editor". Hãy chọn label thời gian và ấn "Control-kéo" vào trong ViewController, giống như ở phần 1. 

Đổi tên label thành "timeLeftField". Làm như vậy với "Image View", đổi tên nó thành "eggImageView". 

Đặt tên 3 button là "startButton", "stopButton" and "resetButton". Các button cũng cần có @IBActions. Ấn "Control-kéo" từ button nhưng lần này hãy đổi thành Action và đổi tên nó là "startButtonClicked". 

Làm tương tự với các button khác "stopButtonClicked" và "resetButtonClicked".

ViewController sẽ như thế này:

![](https://images.viblo.asia/f54380f2-5d13-45ad-8da7-530c367235ee.png)

![](https://images.viblo.asia/a5a0f40a-2a3f-43d7-9d63-21052c7e84aa.png)

Như vậy chúng ta đã kết nối được GUI với code cơ bản. Tuy nhiên chúng ta cần implement cụ thể các xử lý cho từng action tương ứng nữa.
Trong phần sau chúng ta sẽ thêm code vào trong các function này để chúng hoạt động và cách tạo menu. 
Cảm ơn các bạn đã theo dõi. HAPPY CODING ^^

Ref : https://www.raywenderlich.com/151746/macos-development-beginners-part-2