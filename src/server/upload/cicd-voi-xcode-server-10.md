> Xcode Server là một giải pháp CI / CD mạnh mẽ và dễ sử dụng mà nó đã cài đặt trên Xcode 10 - mặc dù nhiều người trong số họ không biết điều này! 
> Trong bài viết này, tôi sẽ tổng quan về Xcode Server và thảo luận về một số yếu tố được và chưa được khi sử dụng Xcode Server so với các lựa chọn thay thế của bên thứ 3.

## Xcode Server là cái gì?
Giống như các nền tảng CI / CD khác, vai trò chính của Xcode Server là tự động hóa việc tích hợp, phân tích, Unit Test, lắp ráp và phân phối các ứng dụng.
<br>
<br>
**Các trường hợp sử dụng điển hình bao gồm:**

* Kéo code tích hợp hoặc một nhánh từ repo khi commit được thực hiện.
* Tự động chạy Unit Test để kiểm tra code sau khi commit để phát hiện sự cố hoặc các vấn đề về hiệu suất.
* Chạy phân tích code để phát hiện các vấn đề trước khi lắp ráp ứng dụng.
* Xây dựng QA hoặc các gói ứng dụng sản xuất (archiving, in Apple speak).
* Phân phối tài liệu lưu trữ đã hoàn thành cho các điểm nội bộ (ad-hoc) hoặc bên ngoài (Test Flight, Crashlytics, v.v.)
* Thông báo cho nhóm Phát triển, QA và Sản phẩm về trạng thái xây dựng mới, hoàn thành và ngoại lệ.
* Thực hiện tất cả các thao tác trên liên tục - có thể vài lần mỗi ngày - cho phép các nhà phát triển quay lại làm việc với các nhiệm vụ tiếp theo của họ trong khi các tác vụ thiết yếu nhưng lặp đi lặp lại này được hoàn thành bởi các quy trình tự động.

![](https://images.viblo.asia/009ea988-6d62-49a3-9936-91727af9a769.png)

<p align="center"> Xcode Server Build Process Overview </p>

<br>
Nhiều tác vụ mà Xcode Server thực hiện là các bước tự động hóa hoàn toàn. Một số khác là các tác vụ kịch bản tùy chỉnh có thể được thêm vào để bắt các lỗ hổng trong các khả năng tích hợp sẵn - và thêm các bước quy trình hoàn toàn mới chỉ giới hạn bởi trí khả năng của nhà phát triển.

## Lịch sử Xcode Server

Lần đầu tiên được Apple giới thiệu với Xcode 5, Xcode Server là một giải pháp CI / CD của bên thứ nhất - tức là được phân phối và hỗ trợ trực tiếp bởi Apple. Khi được giới thiệu lần đầu tiên, máy chủ Xcode là một trong nhiều mô-đun có trong OS X  Server (hiện được gọi là macOS Server). Ngoài khả năng CI / CD, OS X Server trong thời điểm đó còn có:

* Email server
* DNS Server
* Git repository server
* User profile management
* And more…

Theo thời gian, Apple đã cả tiến lại macOS Server, loại bỏ nhiều tính năng không cần thiết trên macOS. Ngày nay, macOS Server vẫn là lớp quản trị hệ thống trên macOS để sử dụng cho quản trị viên hệ thống, trong khi Xcode Server đã được chuyển sang sản phẩm Xcode.app.

## Xcode Server trong Xcode

Với Xcode 9 và Xcode 10, Xcode Server được tích hợp với Xcode, thay vì tích hợp với macOS Server. Điều này có một số lợi thế:

* Mọi cài đặt Xcode cũng cài đặt Xcode Server và có thể được sử dụng trực tiếp.
* Không cần phải cấp phép hoặc cài đặt macOS Server trên máy chủ tích hợp từ xa.
* Tích hợp tổng thể chặt chẽ hơn với Xcode.
* Trải nghiệm người dùng quen thuộc hơn cho các nhà phát triển định cấu hình Máy chủ Xcode.

Với tích hợp Xcode đầy đủ, việc cài đặt máy chủ Xcode thực sự không thể dễ dàng hơn - chỉ cần cài đặt Xcode và Xcode Server cũng được cài đặt. Tất cả những gì còn lại là để cho phép nó trong tùy chọn và chọn người dùng, trên một tab mới trong màn hình tùy chọn Xcode.
<br>
<br>
![](https://images.viblo.asia/086c1be5-bc69-4527-bfc5-a1bbc9bbe18e.png)
<p align="center"> Enabling Xcode Server in Xcode 10 Preferences</p>

### Chạy cục bộ hoặc trên máy chủ tích hợp

Xcode Server được cài đặt cùng với Xcode 10, vậy có nghĩa là máy trạm phát triển của riêng bạn có thể là máy chủ CI / CD của bạn không? Câu trả lời là - Có! Điều này chắc chắn là có thể, và có thể có ý nghĩa đối với các dự án mà nhà phát triển đang làm việc một mình hoặc với một nhóm rất nhỏ trong dự án - nhưng vẫn muốn tận dụng tự động hóa tích hợp thay vì chạy các tác vụ theo cách thủ công.

### Chạy trên máy chủ tích hợp chuyên dụng

Có lẽ phổ biến hơn là cho một nhóm các nhà phát triển làm việc trên một sản phẩm sử dụng Xcode Server làm điểm tích hợp tự động. Kịch bản này không làm thay đổi quy trình làm việc của nhà phát triển đi quá nhiều. 
<br>
<br>
Một nhà phát triển chính hoặc nhân viên Devops sẽ cài đặt và định nghĩa cấu hình Máy chủ Xcode trên máy Mac chuyên dụng và sau đó hầu hết các nhà phát triển khác sẽ đẩy các bản cập nhật mã đến các nhánh git từ xa. 
<br>
<br>
Xcode Server sau đó sẽ chạy với các con bot của nó trên các sự kiện đẩy git hoặc trên một sự kiện theo lịch trình, ví dụ: build và test . Xcode Server hỗ trợ Subversion cũng như git, mặc dù sau này được sử dụng phổ biến hơn hiện nay.

![](https://images.viblo.asia/3764406b-6f01-4812-a33a-0ef67738c8e0.png)
<p align="center">Developers contributing to a shared Xcode Server Installation</p>
<br>
Khi được sử dụng như một phần của việc triển khai máy chủ tích hợp, nó là cách phổ biến nhất để triển khai máy Mac chuyên dụng trên mạng LAN - ví dụ như máy Mac Mini dành cho nhiệm vụ tìm  các nhánh đã commit và chạy các con bot tích hợp.
<br>
<br>
Khi triển khai máy chủ tích hợp trên mạng LAN là một giải pháp khả thi (ví dụ: các nhóm từ xa), Mac có thể được thuê trên Cloud, đây là một cách tiết kiệm để triển khai Mac Mini trong một trung tâm dữ liệu được quản lý chuyên nghiệp. Các nhà cung cấp dịch vụ lưu trữ Mac Mini phổ biến có thể cung cấp phần cứng dựa trên Cloud mà ngay cả các nhóm nhỏ cũng có thể mua được:

* [Mac Stadium](https://www.macstadium.com/usecases#Build-Machines)
* [Mac In Cloud](https://www.macincloud.com/pages/xcode.html)
* [XCLOUD](https://xcloud.me/)

Hiện tại, có một dịch vụ cung cấp dịch vụ nền tảng (PAAS) cho Xcode Server (Trung tâm ứng dụng Microsoft hoặc Circle CI). Tuy nhiên, việc mua lại và cắt giảm gần đây của nhà cung cấp Buddy Build PaaS đã đặt ra một câu hỏi rõ ràng: có phải là một Xcode Server PAAS đang được phát triển không?

### Các lựa chọn thay thế Xcode Server

Ngay cả đối với các nhà phát triển iOS / macOS, Xcode Server cũng không phải là lựa chọn duy nhất. Các công cụ hoặc dịch vụ thương mại nguồn mở phổ biến có thay thế Xcode Server bao gồm:

* [Fastlane](https://fastlane.tools/)
* [Jenkins](https://wiki.jenkins.io/display/JENKINS/Home)
* [Microsoft App Center](https://appcenter.ms/)
* [Circle CI](https://circleci.com/build-environments/#apple-platforms)

### Ưu điểm của Xcode Server so với bên ngoài

* Xcode Server được cho là giải pháp CI / CD dễ sử dụng nhất để phát triển ứng dụng iOS hoặc macOS. Phần mềm đã được cài đặt với Xcode và các vấn đề rắc rối như quản lý chứng chỉ và xây dựng tập lệnh cho các trường hợp sử dụng đơn giản, tự động và không gây rắc rối cho nhà phát triển.
* Apple hỗ trợ và kiểm tra các bản cập nhật cho Xcode Server cùng với sản phẩm Xcode.
* Ngoại trừ chi phí cho phần cứng máy chủ chuyên dụng (là tùy chọn), Xcode Server không yêu cầu thêm chi phí vận hành trước hoặc liên tục cho các nhóm phát triển.
* Xcode Server có thể chạy Unit Test và UI Test  trên các thiết bị iOS vật lý. Chỉ cần đính kèm các thiết bị iPhone / iPad thử nghiệm vào Xcode Server và thêm chúng vào tích hợp thử nghiệm để bot chạy. Đơn giản.

### Nhược điểm của Xcode Server so với các lựa chọn thay thế khác

* Xcode Server không đa nền tảng và chỉ hỗ trợ các ứng dụng mục tiêu của Apple OS.
* Việc thiếu cung cấp PaaS (tại thời điểm viết bài này) có nghĩa là để triển khai Xcode Server yêu cầu bạn cung cấp phần cứng. Điều này có thể tự mình ở dạng máy Mac mini (hoặc loại Mac khác) hoặc thuê máy Mac từ nhà cung cấp đám mây. Tuy nhiên, điều này cũng đúng với các lựa chọn thay thế nguồn mở như Fastlane / Jenkins - cũng là phần mềm tại chỗ. Nó cũng đúng là chi phí của máy Mac không được vượt quá chi phí cho các dịch vụ PaaS thương mại như Circle CI hoặc Microsoft App Center trong thời gian dài.
* Ngoài ra, Xcode Server thiếu một số tính năng được tìm thấy trong các giải pháp khác. Ví dụ: Máy chủ Xcode (tại thời điểm viết bài) không bao gồm bước tích hợp tích hợp để triển khai bên ngoài (ví dụ: Test Flight).

## Máy chủ Xcode có dành cho bạn không?

Như mọi khi, câu trả lời là: "Có thể". Nếu dự án bạn muốn tự động hóa tích hợp / thử nghiệm / triển khai cho việc nhắm mục tiêu iOS hoặc macOS, thì thực sự không có lý do gì để không thử Xcode Server. Nó có kèm theo Xcode 10 và rất dễ cài đặt và sử dụng.

<br>
Đặc biệt nếu bạn chưa quen với CI / CD, trong trường hợp bạn sẽ có một số kinh nghiệm với CI, có thể cắt giảm một số công việc thử nghiệm/xây dựng hướng dẫn sử dụng và hiểu rõ hơn về những tính năng mà bạn cần trong một giải pháp lâu dài nếu Xcode Server hoàn toàn không đáp ứng các nhu cầu của bạn.
<br>
<br>
Mặt khác, nếu bạn là một phần của nhóm đa nền tảng tích hợp đầy đủ (ví dụ: iOS + Android) muốn có một giải pháp thống nhất cho tất cả các mục tiêu phát triển, Xcode Server có thể không dành cho bạn. Mặc dù các giải pháp khác có thể có ưu thế hơn và cần nhiều kịch bản hơn để so với Xcode Server, có những nền tảng thương mại và nguồn mở có thể cung cấp các giải pháp đa nền tảng trong đó cơ sở hạ tầng CI / CD / Devops thống nhất là điều cần thiết.

Thank for reading!

[Sources](https://medium.com/rekerrsive/ci-cd-with-xcode-server-10-8ad29b08c337)