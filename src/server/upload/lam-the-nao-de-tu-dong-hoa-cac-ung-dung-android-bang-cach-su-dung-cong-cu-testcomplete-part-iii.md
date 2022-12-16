Trong thế giới hiện đại ngày nay, điện thoại thông minh đang đóng một vai trò rất quan trọng trong cuộc sống hàng ngày của chúng ta. Với các bản cập nhật thường xuyên về công nghệ và nhiều thiết bị có sẵn, nó trở thành một nhiệm vụ rất cấp thiết cho các nhà phát triển và testers để kiểm tra tính tương thích của ứng dụng. <br>
Các công cụ như TestComplete có thể tăng phạm vi kiểm tra và cải thiện hiệu quả kiểm tra. Chúng ta đã có một số khái niệm cơ bản về TestComplete trong các bài hướng dẫn trước.<br>
Trong bài hướng dẫn lần này, chúng ta sẽ xem xét những điều sau:
* Android là gì?
* Phần mềm yêu cầu để tự động hóa ứng dụng Android.
* Tải xuống và cài đặt Java trên máy tính.
* Cấu hình Java JDK trong Windows.
* Tải xuống và cài đặt Android SDK.
* Cấu hình Android trong Windows.
* Cấu hình Java JDK và Android SDK thành TestComplete.
* Cài đặt Trình điều khiển USB của Google.
* Chuẩn bị thiết bị di động để test.
* Tạo Test Project cho ứng dụng Android.
* Về ứng dụng thử nghiệm.
* Làm thế nào để record quá trình test trong TestComplete?
* Phân tích thử nghiệm đã ghi.
* Chạy thử nghiệm.
* Giải quyết lỗi. <br>
# Android là gì?
Android đã được phát triển bởi Android Inc. Và được Google khổng lồ mua lại vào năm 2005. Android là hệ điều hành nguồn mở (hoàn toàn miễn phí), đặc biệt được sử dụng cho các thiết bị di động màn hình cảm ứng như điện thoại, máy tính bảng, v.v. trên hạt nhân Linux. <br>
Ứng dụng Android là một phần mềm chạy trên nền tảng Android. Nền tảng đó có thể là bất cứ thứ gì như thiết bị di động, máy tính bảng, v.v. hỗ trợ chức năng màn hình cảm ứng.
# Phần mềm cần thiết để tự động hóa ứng dụng Android
Để làm việc cùng, chúng tôi sẽ phải chuẩn bị hệ thống của mình và cài đặt phần mềm cần thiết để cấu hình TestComplete để nó có thể tạo các kiểm tra tự động cho các ứng dụng Android.
Bạn sẽ phải cài đặt như sau:
* Java JDK<br>
* Android SDK<br>
* Device USB Drivers<br>
* Android Agent<br>
* TestComplete Mobile Plugins<br>

Chúng ta hãy học cách cài đặt phần mềm nói trên.<br>
# Java JDK
**Tải xuống và cài đặt Java trên máy** <br>

* Để tải Java JDK về hệ thống của bạn, bấm vào http://www.oracle.com/technetwork/java/javase/downloads/index.html
* Nhấp vào nút "Download" như được hiển thị trong hình ảnh<br>
![](https://images.viblo.asia/e49d7a4e-57f8-455f-95c5-44cf6bfd64fd.jpg)
* Sau khi bộ tải xuống được tải xuống, hãy nhấp đúp vào nó để mở<br>
* Làm theo hướng dẫn để cài đặt Java JDK trên hệ thống<br>

**Cấu hình Java JDK trong Windows**<br>
Khi Java được tải xuống và cài đặt, nó cần được cấu hình cho máy tính và với công cụ TestComplete. Chúng ta sẽ học cách cấu hình Java trên cả hai môi trường.
Java JDK có thể được cấu hình bằng cách thiết lập đường dẫn cài đặt. Có hai cách để làm điều đó:
* Temporary
* Permanent
Ở đây chúng ta đang áp dụng cách Permanent để thiết lập đường dẫn cài đặt:<br>
Hãy bắt đầu!!!
1) Nhấp chuột phải vào biểu tượng My Computer trên màn hình nền của bạn và chọn Properties
![](https://images.viblo.asia/9e621b69-42db-48ab-a925-83f366a4dc79.jpg)
2) Mở cài đặt hệ thống ‘Advanced’ ở bên trái màn hình<br>
![](https://images.viblo.asia/9cb5fc48-009d-46f3-99aa-0a81690c01e7.jpg)<br>
3) Chuyển đến tab ‘Advanced’<br>
4) Nhấp vào nút Environment Variables<br>
![](https://images.viblo.asia/e3ceb170-05ba-4721-bffc-8c6b6a6981bc.jpg)<br>
5) Trong user variables, nhấp vào ‘New’<br>
![](https://images.viblo.asia/474f3c5a-993b-4c42-8098-7288a0160dae.jpg)<br>
6) Trong loại tên biến ‘path’  bây giờ chuyển đến thư mục bin (C: \ Program Files (x86) \ Java \ jdk) hoặc đường dẫn nơi java được cài đặt và sao chép đường dẫn của thư mục bin<br>
7) Bây giờ dán đường dẫn của thư mục bin trong giá trị biến<br>
![](https://images.viblo.asia/378dc5f4-8e00-4be9-a3d8-4b84030fd029.jpg)
8) Nhấp vào nút Ok<br>
**Lưu ý**: Để kiểm tra xem Java đã được cài đặt và cấu hình có hoạt động đúng hay không, hãy mở command prompt và gõ java -version trong dòng lệnh. Xác minh nếu phiên bản Java được hiển thị khi thực hiện lệnh.<br>
![](https://images.viblo.asia/3aa82cd0-813d-4bed-8821-8083ed7ba621.jpg)<br>

**Tại sao chúng ta phải đặt Java Class Path?**<br>
Để thực thi các chương trình Java, các lệnh javac và java được sử dụng. Bằng cách chỉ định đường dẫn trong biến môi trường, chỉ định đường dẫn nơi các lệnh này được đặt trong hệ điều hành.
Vì thư mục bin chứa tất cả các tệp nhị phân thực thi, chúng ta đã chỉ định đường dẫn của thư mục bin trong các biến môi trường.
# Android SDK
**1) Tải xuống và cài đặt Android SDK**<br>
* Trỏ đến URL này: https://developer.android.com/studio/<br>
* Di chuyển đến dưới cùng của trang<br>
* Nhấp vào liên kết như được hiển thị trong hình ảnh<br>
![](https://images.viblo.asia/cf711c59-06fb-4677-84e0-2ccc376793d1.jpg)<br>
* Chọn the Terms and Conditions và Click nút Download<br>
![](https://images.viblo.asia/e5d765ab-a33a-41ad-9307-6e5ab9a0ee0a.jpg)<br>

**2) Cấu hình Android trong Windows**<br>
Để tạo tập lệnh tự động, chúng tôi cần định cấu hình SDK Android trong hệ điều hành của chúng tôi và trong TestComplete.<br>
* Sau khi tải xuống, bạn có thể trích xuất thư mục và sao chép các tệp được trích xuất trong ổ đĩa cục bộ của mình<br>
* Mở thư mục; điều hướng đến SDK-> công cụ chương trình<br>
* Sao chép đường dẫn của thư mục<br>
* Nhấp chuột phải vào My Computer và chọn Properties<br>
![](https://images.viblo.asia/9e621b69-42db-48ab-a925-83f366a4dc79.jpg)<br>
* Mở Cài đặt hệ thống nâng cao ở bên trái màn hình<br>
![](https://images.viblo.asia/9cb5fc48-009d-46f3-99aa-0a81690c01e7.jpg)<br>
* Trỏ tới tab Advanced<br>
* Chọn nút Environment Variables<br>
![](https://images.viblo.asia/9f26602d-dbf5-45bf-80bd-c8815291ef96.jpg)<br>
* Trong phần system variable section, cuộn xuống path’ và nhấp vào Edit
* Trong hộp phần text ở variables value, di chuyển đến cuối đường dẫn đã được viết, đặt dấu chấm phẩy và dán đường dẫn của thư mục các công cụ chương trình (mà chúng ta đã sao chép)<br>
![](https://images.viblo.asia/b82384bb-d799-4dc3-a468-71c8a3a6ba71.jpg)<br>
* Nhấp vào nút Ok<br>
**Lưu ý:** Để xác minh xem Android đã được cài đặt và đã định cấu hình có hoạt động chính xác không, hãy mở lời nhắc lệnh và nhập android trên dòng lệnh. Xác minh Trình quản lý SDK được khởi chạy khi thực hiện lệnh.
* Điều hướng đến thư mục SDK gốc và nhấp đúp vào SDK Manger.exe để khởi chạy quản lý SDK<br>
* Trong quản lý SDK, chọn các mục sau<br>
  * Phiên bản API tương ứng với thiết bị được sử dụng để thử nghiệm<br>
  * Trình điều khiển USB của Google<br>
  * Các công cụ nền tảng Android SDK.<br>
  * Công cụ xây dựng SDK Android.<br>
Chọn các gói cần thiết khác từ SDK Manager và nhấp vào Install Packages như thể hiện trong hình ảnh<br>
![](https://images.viblo.asia/bfcc4fa2-4e99-414c-9f13-6cd220ba80c3.jpg)<br>

**3) Định cấu hình Java JDK và Android SDK thành TestComplete.**<br>
Theo mặc định, Android và Java sẽ được định cấu hình thành TestComplete. Nhưng trong một số trường hợp, nếu điều này không xảy ra thì chúng ta cần thiết lập đường dẫn theo cách thủ công.<br>
*Làm theo các bước để định cấu hình Android và Java thành TestComplete*<br>

* Điều hướng đến Công cụ | Tùy chọn<br>
* Đi tới Công cụ | Điện thoại di động | Android<br>
* Chỉ định đường dẫn của Android SDK và Java như được hiển thị trong hình ảnh<br>
![](https://images.viblo.asia/d891fad1-623f-4e68-885f-bdfaaf6aae8b.jpg)<br>

 **Lưu ý**: Nếu tùy chọn Mobile không hiển thị trong Engines thì bạn cần bật tiện ích mở rộng di động trong TestComplete.<br>
  Làm theo các bước để bật tiện ích mở rộng di động<br>
 * Chuyển đến Tệp | Cài đặt tiện ích mở rộng<br>
 * Một hộp thoại Cài đặt mở rộng sẽ mở ra<br>
 * Chọn các plugin cần thiết để bật như được hiển thị trong hình ảnh<br>
 ![](https://images.viblo.asia/b093a4e4-e3ac-4e75-94db-14fe97646486.jpg)<br>
 
**Cài đặt Trình điều khiển USB của Google**<br>
*Làm theo các bước để cài đặt Trình điều khiển USB của Google trên Windows*<br>
1. Kết nối thiết bị Android của bạn với máy tính thông qua cổng USB<br>
2. Nhấp chuột phải vào My Computer và nhấp vào Manage<br>
3. Chọn và nhấp vào Device Manager trong phân vùng bên trái<br>
4. Chọn thiết bị di động<br>
5. Nhấp chuột phải vào tên thiết bị và chọn Update Driver Software<br>
6. Nhấp vào Duyệt máy tính của tôi để tìm phần mềm trình điều khiển<br>
7. Duyệt đến thư mục sau - C: \ SDK \ extras \ google \ usb_driver<br>
8. Nhấp vào Tiếp theo để cài đặt trình điều khiển.<br>
9. Do đó, chúng tôi đã cài đặt Trình điều khiển USB của Google trên hệ điều hành của chúng tôi.<br>

# Chuẩn bị thiết bị di động để kiểm tra<br>
Để chạy thử nghiệm Android với TestComplete, bạn cần chuẩn bị thiết bị Android của mình để thử nghiệm và chúng tôi gọi nó là "Thử nghiệm Sẵn sàng".<br>

**a) Bật tùy chọn nhà phát triển trên thiết bị Android**<br>
Làm theo các bước để bật tùy chọn nhà phát triển trên Thiết bị Android<br>
1. Điều hướng đến tùy chọn Cài đặt<br>
2. Đi tới Giới thiệu về điện thoại / máy tính bảng<br>
3. Lặp lại tap Build number 7 lần<br>
4. Bằng cách đó, bạn sẽ thấy một tùy chọn bổ sung trong menu của bạn có tên là "Tùy chọn nhà phát triển"<br>

Nhấn vào Tùy chọn nhà phát triển trong Cài đặt và bật các tùy chọn sau:<br>
1) Gỡ lỗi USB: Bằng cách bật gỡ lỗi USB, bạn có chữ viết tắt là ADB.<br>
2) Stay awake: Bằng cách bật Stay awake, chúng tôi đang ngăn thiết bị chuyển sang sleep trong khi thực hiện kiểm tra. Tính năng này khả dụng trên tất cả các thiết bị Android.<br>

**b) Tạo dự án thử nghiệm cho ứng dụng Android**<br>
Hãy bắt đầu bằng cách tạo dự án thử nghiệm đầu tiên của chúng tôi để tự động hóa ứng dụng Android bằng cách sử dụng TestComplete<br>

1) Chọn File –>New –>New Project<br>
2) Nhập tên dự án. Nhấp vào Next<br>
![](https://images.viblo.asia/cd48e903-45d4-4acf-99d7-9b9bfd4f9916.jpg)<br>
3) Trên trang tiếp theo của trình hướng dẫn, hãy chọn Ứng dụng Android. Nhấp vào Tiếp theo<br>
![](https://images.viblo.asia/1d183f22-dfc3-4d35-94f6-6fb1c1d9b0c7.jpg)<br>
4) Trên trang tiếp theo của trình hướng dẫn, chúng ta cần thêm ứng dụng Android vào dự án<br>
5) Để thêm ứng dụng vào dự án, hãy nhấp vào Thêm và duyệt đến vị trí của ứng dụng mà nó được lưu<br>
![](https://images.viblo.asia/d079b8f2-4cf1-4992-adee-bfc0fcff8714.jpg)<br>
6) Với mục đích demo, chúng tôi có thể sử dụng ứng dụng được cung cấp bởi SmartBear tại vị trí sau<br>
C: \ Users \ Public \ PublicDocuments \ TestComplete12 Samples \ Mobile \ Android \ Orders \ Đơn hàng Ứng dụng \ bin \ Orders.apk<br>
7) Khi chúng tôi đã chọn nền tảng của chúng tôi bước trước, tạo trình hướng dẫn sẽ đưa chúng tôi đến trang Kiểm tra hình ảnh, nơi chúng tôi có thể bật / tắt chức năng Kiểm tra hình ảnh. Nhấp vào Tiếp theo<br>
8) Bây giờ chúng ta cần phải xác định ngôn ngữ kịch bản cho dự án JavaScript, JScript, Python, VBScript, DelphiScript, C # Script, C ++ của chúng tôi. Sau khi chọn ngôn ngữ kịch bản, nhấn Finish<br>
![](https://images.viblo.asia/b20e8ddd-3889-4901-a75e-46f022cc7e28.jpg)<br>
Dự án của chúng tôi để kiểm tra một ứng dụng Android đã sẵn sàng.<br>

**Về ứng dụng thử nghiệm<br>**
Trong hướng dẫn này, chúng tôi đã sử dụng một ứng dụng Android được cung cấp cùng với TestComplete. Ứng dụng này là để quản lý đơn đặt hàng. Người dùng có thể tạo đơn đặt hàng, sửa đổi hoặc xóa đơn đặt hàng hiện tại.<br>
Ứng dụng này nên cài đặt trên thiết bị sẽ được sử dụng để kiểm tra tự động.<br>
![](https://images.viblo.asia/bfc7b220-397b-4c38-814b-47edf9cd757e.jpg)<br>
# Làm thế nào để ghi lại thử nghiệm của chúng tôi trong TestComplete?<br>

Khi chúng ta hoàn thành việc thiết lập môi trường và ngôn ngữ để tự động hóa các ứng dụng và ghi lại một quá trình tương tự như chúng ta đã thực hiện cho các ứng dụng dựa trên web.<br>

**Để bắt đầu ghi dưới đây là các bước sau**<br>

1) Nhấp vào Append to test như được hiển thị trong hình bên dưới<br>
![](https://images.viblo.asia/dd9d819a-2466-482b-a4d7-f728f3d2b909.jpg)<br>
**Lưu ý:** Chỉ các tương tác được thực hiện trên màn hình thiết bị di động, hiển thị trên cửa sổ mới được ghi lại trong công cụ TestComplete.<br>
2) Một bảng ghi như được hiển thị trong hình ảnh sẽ được hiển thị, nó xác nhận rằng bản ghi của bài kiểm tra đã bắt đầu<br>
3) Khi bắt đầu thanh công cụ ghi âm bị thu gọn và chúng tôi có thể nhấp để mở rộng. Như thể hiện trong hình ảnh<br>
4) Sau khi ghi âm đã được bắt đầu, ứng dụng Android sẽ được phát hành tự động. Bây giờ chúng ta đã sẵn sàng để thực hiện hành động.<br>
**Lưu ý:** Nếu trong trường hợp ứng dụng được thử nghiệm không khởi động tự động, thì để khởi động ứng dụng điều hướng đến Chạy ứng dụng | Ứng dụng thử nghiệm | Các đơn đặt hàng, như được hiển thị trong hình ảnh.<br>
![](https://images.viblo.asia/02fa524e-358d-4b63-89d3-a25f845ce9bb.jpg)<br>
5) Trong ứng dụng Android đã cài đặt của chúng tôi, nhấp vào nút New<br>
![](https://images.viblo.asia/55180ace-b01e-4072-8089-d94651cd1722.jpg)<br>
6) Nhập chi tiết vào các tham số đầu vào như trong hình và nhấn OK<br>
7) Một mục nhập mới sẽ được lưu ở cuối danh sách. Nhấp vào mục nhập đó<br>
8) Nhấp vào chỉnh sửa. Và chỉnh sửa các chi tiết được hiển thị trong biểu mẫu và nhấp OK<br>
9) Bây giờ bấm vào dừng ghi âm<br>
Sau khi nhấp vào nút dừng ghi, TestComplete sẽ hiển thị trình soạn thảo từ khóa. Tất cả các lệnh được ghi sẽ được hiển thị trong trình soạn thảo từ khóa.<br>
10) Nhấp vào nút như được hiển thị trong hình ảnh<br>
![](https://images.viblo.asia/8ce5c57d-96ff-468e-917d-92ac1bef7dab.jpg)<br>
# Phân tích thử nghiệm đã ghi<br>
Khi chúng tôi đã nhấp vào nút dừng, TestComplete sẽ hiển thị trình chỉnh sửa từ khóa nơi tất cả các từ khóa được ghi lại của chúng tôi được hiển thị. Nó có thể là các từ khóa được hiển thị trong hình ảnh.<br>
**Hãy để chúng tôi phân tích các từ khóa được ghi lại.**<br>
* Chọn Thiết bị: Từ khóa này chỉ định cho thiết bị di động mà thử nghiệm sẽ được thực hiện. Tất cả các hoạt động như chỉnh sửa, xóa sửa đổi trong ứng dụng Android của chúng tôi sẽ được thực hiện trên thiết bị này
* Chạy thử nghiệm ứng dụng: Từ khóa thứ hai là chạy thử nghiệm ứng dụng. Ứng dụng thử nghiệm (trong trường hợp của chúng tôi là Orders.apk) được khởi chạy bởi TestComplete thông qua lệnh này<br>
* ListView_listView1: Lệnh này được sử dụng để gọi thao tác chạm trên danh sách các lệnh. Như thể hiện trong hình ảnh<br>
* Button_Edit: Thao tác liên quan đến việc nhấp vào nút chỉnh sửa trong ứng dụng đơn đặt hàng đã dẫn đến việc tạo ra từ khóa Button_Edit<br>
* EditText_cust_name: Thao tác được thực hiện trong việc chỉnh sửa tên khách hàng được ghi lại dưới dạng từ khóa sau<br>
* Button_Ok: Khi chúng tôi đã nhấp vào nút Ok trong đơn đặt hàng, hoạt động đó đã tạo từ khóa này<br>
Một trong những tính năng đáng chú ý của TestComplete là mô tả của từng từ khóa được tạo ra tương ứng với hoạt động được thực hiện trên ứng dụng.<br>
Chạy thử nghiệm
Để làm cho playback của chúng tôi mà không có bất kỳ lỗi nào, kiểm tra được ghi lại phải được bắt đầu với các điều kiện ban đầu giống như trong quá trình ghi của vỏ kiểm tra.<br>
Một khi thử nghiệm đã được thực thi, một nút log kiểm tra được tạo ra trong dự án. Nhật ký kiểm tra này được mở tự động sau khi kiểm tra đã được thực hiện hoàn toàn.<br>
Để chạy thử nghiệm, chỉ cần nhấp vào Chạy thử nghiệm như được hiển thị trong hình ảnh.<br>
![](https://images.viblo.asia/04b69889-7391-4763-8264-29a8ca80ebe1.jpg)<br>
# Giải quyết lỗi
Trong một số trường hợp, nếu thử nghiệm của bạn không thành công, những điều sau đây có thể là một số nguyên nhân<br>
1) Bất kỳ ứng dụng của bên thứ ba nào như quảng cáo của Google chồng chéo lên màn hình của ứng dụng tạo ra lỗi<br>
2) Điều kiện ban đầu cần thiết để chuẩn bị kiểm tra không được thực hiện thành công<br>
3) Đường dẫn cho Java JDK, Android SDK không được định cấu hình trong TestComplete<br>
4) Trình điều khiển USB của thiết bị không được cài đặt đúng cách trên máy tính<br>
5) Kiểm tra cấp API từ trình quản lý SDK và phiên bản Android của thiết bị. Bất kỳ sự không khớp nào cũng có thể gây ra lỗi. API thích hợp sẽ được tải xuống thiết bị<br>
6) TestComplete hỗ trợ các phiên bản Android 4.0.1+. Đảm bảo thiết bị của bạn tương thích với TestComplete<br>
# Kết luận<br>
Đây là một giới thiệu nhỏ gọn và hữu ích cho TestComplete và cách thử nghiệm các ứng dụng Android với nó. Như mọi khi, với tự động hóa, bạn có thể mở rộng thông tin chúng tôi cung cấp trong không gian này để giải quyết các hệ thống và khung phức tạp và phức tạp.<br>
Chúng tôi hy vọng, loạt bài hướng dẫn TestComplete này hữu ích cho bạn.<br>
Nguồn dịch:https://www.softwaretestinghelp.com/testcomplete-tutorial-3/