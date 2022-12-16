# Khó khăn và giải pháp khi test device
Sự bùng nổ của điện thoại di động rất rõ rệt và nó chưa có dấu hiệu dừng lại. Những chiếc smart-phone đang nhanh chóng trở thành phương pháp chính của sự tương tác cho người tiêu dùng và các doanh nghiệp trên toàn thế giới, cùng với đó là sự ra đời của hàng ngàn ứng dụng mỗi ngày. Các ứng dụng hiện đang được tích hợp vào xe hơi, công nghệ wearable và đồ gia dụng. Cùng với sự phát triển đó là những khó khăn đa dạng về nhiều mặt và đòi hỏi chiến lược kiểm thử cho những thiết bị di động cũng cần phải độc đáo.
Đối với QA khi làm dự án test device thì sẽ có rất nhiều khó khăn vì với mỗi thiết bị di động khác nhau sẽ có độ phân giải màn hình, CPU, bộ nhớ, tối ưu hóa hệ điều hành và phần cứng có thể khác nhau.
Vậy câu hỏi ở đây là: “Test trên 5 đến 8 thiết bị đã được coi là đủ?”
Thế nên, không thể không kể đến đó là vấn đề về sự đa dạng của công cụ kiểm thử. Nếu như công ty có thể cung cấp cho mỗi dự án 1 device thì bạn có thể sẽ mượn được device đang rảnh của dự án khác, nhưng: Với mỗi hệ điều hành thì song song với thời gian chúng sẽ phân mảnh rất nhiều phiên bản ví dụ như iOS với các phiên bản của hệ điều hành như iOS 4.x, iOS 5.X, BB 4.x, 5.x và 6.x...
Vậy thì ví dụ khách hàng của bạn báo bug xảy ra trên Android 6 chứ không phải Android 7, thì dù có đi mượn cũng khó, mà phiên bản thì chỉ có thể update lên. 

Vì thế, Giả lập và mô phỏng thiết bị di động là phương pháp để kiểm thử hữu hiệu và đơn giản nhất hỗ trợ QA lúc này.

# Trình giả lập test đang được sử dụng phổ biến nhất hiện nay
## 1. BlueStacks

BlueStacks (tên đầy đủ: BlueStacks App Player) là phần mềm giả lập Android trên PC miễn phí rất tốt. Với đột phá về giao diện, người dùng hoàn toàn có thể thoải mái chơi game Android, sử dụng các ứng dụng trên giả lập Android trên màn hình máy tính một cách tiện dụng và chuyên nghiệp nhất. Nếu dự án của bạn làm về Game thì bạn nên thử tải về dùng.
Tuy nhiên, BlueStacks thì khá nặng nề và yêu cầu cấu hình máy tính cao.

## 2. NoxPlayer 

NoxPlayer là ứng dụng giả lập Android trên máy tính cực nhẹ, phù hợp với mọi cấu hình máy tính. Nox PC sẽ giúp bạn chạy được các ứng dụng Android trên PC một cách mượt mà, trơn tru với nhiều tính năng và giao diện hấp dẫn. 
Tuy nhiên, Windroy thì chỉ hỗ trợ một phiên bản Android (hiện tại là 4.4).

## 3. Genymotion

Genymotion là ứng dụng giả lập Android trên máy tính với hiệu suất 3D cao cho phép người sử dụng kiểm soát đầy đủ các thiết bị Android. Đặc biệt Genymotion hỗ trợ giả lập rất nhiều dòng máy với các phiên bản hệ điều hành Android khác nhau. hỗ trợ rất nhiều phiên bản Android, tương ứng với từng dòng máy từ HTC, Samsung, Sony Xperia, cho đến Google Nexus 10 (Android 5.1). Do đó bạn sẽ cảm thấy thực sự được sử dụng chiếc điện thoại quen thuộc của mình trên máy tính hoặc có thể kiểm thử các ứng dụng, trò chơi trên những giao diện điện thoại Android khác nhau, với yêu cầu cấu hình phần cứng ở mức chấp nhận được.

# Cách cài đặt Genymotion
## Download Genymotion tương ứng với cấu hình máy tính

Bước 1: Truy cập link https://download.com.vn/genymotion/download
Bước 2: Download về máy
Bước 3:  Giải nén file
Bước 4: Chuột phải vào file Genymotion và Run as Administrator
Bước 5: Click next và hoàn thành cài đặt

Sẽ được như hình sau:
![](https://images.viblo.asia/8797d614-e105-4d63-8014-9977b91cd72b.png)

## Download Oracle VM VirtualBox Manager

Mình cần cài đặt VM này để tạo môi trường chạy cho Genymotion nhé.
Bước 1: Truy cập link https://download.com.vn/virtualbox/download
Bước 2: Download về máy
Bước 3:  Giải nén file
Bước 4: Chuột phải vào file Genymotion và Run as Administrator
Bước 5: Click next và hoàn thành cài đặt

Sẽ được như hình sau:
![](https://images.viblo.asia/bf5a1c20-a494-41c1-b5c3-757c5a8303fe.png)

Sau khi hoàn tất 2 cài đặt trên chúng ta sẽ bắt đầu chạy thử Genymotion:

## Run Genymotion

### Mở Oracle VM VirtualBox Manager

Đầu tiên phải mở Oracle VM VirtualBox Manager lên setting network trước:
Bước 1: Vào Oracle VM VirtualBox Manager chọn Setting
Bước 2: Trong box Custom Phone - Setting, mình sẽ chọn Network bên menu trái
Bước 3: Chọn Enable Network Adapter với giá trị Only Ethernet Adapter 

Như hình sau nhé:
![](https://images.viblo.asia/c0e821dc-4d64-4602-8acf-0840c31bcdbe.png)

### Mở Genymotion lên

Tiếp theo, mình mở Genymotion lên:
Bước 1: Ở màn hình đầu tiên bạn có thể dễ dàng nhìn thấy trong Available templates là 1 list các device với đầy đủ các loại custom type như Android API, Size, Density.
Bạn có thể click vào biểu tượng tùy chọn bên phải để xem detail của từng device cũng như install nó.
![](https://images.viblo.asia/d4ec725d-d37a-4983-a2eb-7f3fb1c0a2c2.png)

Bước 2: Click vào biểu tượng tùy chọn bên phải để install nó.
Chọn Install => Sẽ có Box xuất hiện để custom device này trước khi cài đặt để sử dụng :
Có thể thay đổi Name
Kích thước màn hình để hiển thị ở mục Display
Version Android tùy chỉnh cũng như size bộ nhớ ở mục System
![](https://images.viblo.asia/a3898365-5d80-4915-b11f-eac9f6258127.png)

Bước 3: Chọn Install và bắt đầu theo dõi quá trình cài đặt cho đến khi hoàn tất:
![](https://images.viblo.asia/bef67429-dd1a-4eee-bf29-92e3aa4913fd.png)

Bước 4: Sau khi cài xong bạn có thể chọn mục tùy chọn bên phải và chọn Start
![](https://images.viblo.asia/49593d18-469e-4892-9bee-032d00293564.png)

Bước 5: Quá trình cài đặt device của bạn có thể mất vài phút hãy theo dõi Abort chạy nhé:
![](https://images.viblo.asia/3c0dcacd-b840-452c-9d4f-39a534287222.png)

*Nếu quá trình này gặp lỗi không tìm được IP của VM bạn có thể sẽ cần phải quay lại bước cài đặt Network cho Oracle VM VirtualBox bên trên.*

Bước 6: Bạn cần 1 file APK kéo thả trực tiếp vào device vừa cài đặt
Hoặc có thể truy cập Beta/TestFlight để down app về máy.
![](https://images.viblo.asia/1ad68669-cc2f-49fd-8efc-26f2cc18894e.png)

Đã xong, và giờ bạn có thể sử dụng app trên bất cứ device Android nào với đa dạng kích thước màn hình cũng như phân mảnh phiên bản :D Giải quyết được vấn đề thiếu thốn device test nhé.
### Thanks for reading !!

Nguồn tham khảo: 
https://www.softwaretestinghelp.com/5-mobile-testing-challenges-and-solutions/#
https://download.com.vn/genymotion/download
https://download.com.vn/bluestacks-app-player-1/download
https://download.com.vn/nox-app-player/download
https://download.com.vn/virtualbox/download




Nguồn tham khảo: