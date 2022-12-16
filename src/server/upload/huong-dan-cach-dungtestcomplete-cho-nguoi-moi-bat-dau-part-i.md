Kiểm thử tự động đóng vai trò cực kỳ quan trọng trong kiểm thử phần mềm. Một số test cases rất tốn thời gian, tốn công sức và lặp đi lặp lại. 
Và khi đó kiểm thử tự động những test cases này có thể tiết kiệm rất nhiều thời gian, góp phần làm cho kiểm thự tự động trở nên rất hữu ích trong mô hình phát triển phần mềm.
#  Giới thiệu chung
TestComplete, được phát triển bởi SmartBear Software, cung cấp hỗ trợ cho các công nghệ như là: Net, Delphi, C++Builder, Java, Visual Basic, HTML5, Flash, Flex, Silverlight Desktop, hệ thống Web and Mobile.
TestComplete giúp người kiểm thử phát triển các trường hợp thử nghiệm của họ bằng nhiều ngôn ngữ kịch bản khác nhau như JavaScript, Python, VBScript, Delphi Script, JavaScript. Nó có sẵn với hai giấy phép và một phiên bản dùng thử miễn phí có giá trị trong 30 ngày.
## Tại sao lại sử dụng?
TestComplete cung cấp một loạt các khả năng tự động hóa thử nghiệm. Một trong số đó được liệt kê dưới đây:

**Keyword Testing:** Sử dụng trình kiểm tra soạn thảo được tích hợp sẵn Keyword do đó testers có thể phát triển được frameworks mà kiểm soát Keyword rất dễ dàng. <br>
**Scripted Testing:** Người kiểm thử có thể viết kịch bản kiểm thử từ scratch hoặc sửa đổi các tập lệnh được ghi trong trình chỉnh sửa được tích hợp sẵn<br>
**Test Record and Playback:** Cung cấp cơ chế cơ bản của bản ghi và phát lại những kiểm thử đã khởi tạo. Các test cases được ghi lại có thể được sửa đổi khi cần thiết<br>
**Integration to Bug Tracking Software:** Tích hợp với nhiều phần mềm theo dõi lỗi khác nhau như Jira, Bugzilla, v.v. Nó có thể được sử dụng để sửa đổi hoặc tạo ra các mục trong phần mềm theo dõi lỗi bằng những mẫu theo dõi vấn đề<br>
**Data Driven Testing:** Trích xuất dữ liệu dễ dàng từ tệp CSV, bảng cơ sở dữ liệu, trang tính Excel, v.v.<br>
**Test Visualizer:** Chụp ảnh màn hình trong quá trình thực hiện kiểm thử cho phép chúng ta có thể phân biệt được giữa các màn hình mong muốn và thực tế.<br>

## Yêu cầu cấu hình tối thiểu

**Hệ điều hành:** Microsoft Windows XP Professional 32/64 bit. <br>
**Chip:** Intel Core 2 Duo 2 GHz hoặc cao hơn <br>
**Ram:** 2 GB RAM trên các hệ điều hành khác. <br>
**Ổ đĩa cứng:** 1 GB dung lượng trống để cài đặt <br>
**Độ phân giải:** 1024 × 768 or cao hơn. <br>Chuột or thiết bị trỏ khác

## Cài đặt TestComplete
**Download** => TestComplete có thể được tải xuống từ trang chủ của SmartBear: https://smartbear.com/product/testcomplete/free-trial/ <br>
**Sau khi tải xuống, hãy làm theo các bước sau để cài đặt TestComplete** <br> 1) Nhấp đúp vào gói cài đặt TestComplete đã tải xuống. Cài đặt phần mềm sẽ bắt đầu và thỏa thuận cấp phép sẽ được hiển thị. <br>2) Chỉ định đường dẫn của thư mục mà bạn muốn cài đặt phần mềm. <br>

![](https://images.viblo.asia/43e1a9e8-ea43-457a-87b2-e9278c826e38.jpg) <br>3) Bây giờ, hộp thoại chào mừng được hiển thị để yêu cầu kích hoạt giấy phép, chúng ta có thể bắt đầu bằng cách nhấp vào giấy phép dùng thử 30 ngày. <br>4) Sau đó khởi động lại máy tính, chúng ta đã hoàn tất quá trình cài đặt TestComplete. <br>
## Tạo Project trong TestComplete
Khởi chạy ứng dụng và bạn sẽ thấy trang start. <br>
**Làm theo các bước sau để tạo một Project mới.** <br>1) Chuyển đến tệp menu. <br>2) Nhấp vào New Menu từ menu. <br>3) Nhấp vào New Project. <br>

![](https://images.viblo.asia/3e739ebd-ed37-484e-8f2a-f7015bfbedc4.jpg) <br>
4) Hoặc bằng cách khác, bạn có thể sử dụng phím tắt (shift + ctrl + N) để tạo New Project. <br>5) Một cửa sổ sẽ xuất hiện, và bạn đặt tên cho Project. <br>6) Nhấp vào Finish <br>7) Vậy là chúng ta đã tạo xong first Project trong TestComplete. <br>
## Giao diện người dùng của TestComplete
Giao diện người dùng của TestComplete được tổ chức hợp lý và được chia thành các phần khác nhau. <br>
* Bảng Project Explorer ở phía bên trái của cửa sổ, hiển thị các project suite , dự án và nội dung
* Bảng điều khiển vùng làm việc là nơi bạn có thể sửa đổi và test
* Bảng Test Visualizer (ở dưới cùng) hiển thị ảnh chụp màn hình được lưu trong quá trình thực thi test cases. <br>

![](https://images.viblo.asia/0ff464be-7eff-49e8-9a18-737f87d08931.jpg) <br>

## Tạo dự án test trên nền tảng web
**Hãy bắt đầu với việc tạo test đầu tiên trên một dự án web trong TestComplete.**<br>1) Chọn File | New | New Project như được hiển thị trong ảnh chụp màn hình. <br>

![](https://images.viblo.asia/3c745bf7-6e0f-4b7c-bbda-edc191dd3ea8.jpg) <br>2) Nhập tên dự án; bạn cũng có thể thay đổi Location nếu cần. <br>

![](https://images.viblo.asia/3f83458d-7ee2-488c-b9c7-a2097619f826.jpg) <br>3) Nhấp vào nút Next.<br>
***Lưu ý: Vì TestComplete hỗ trợ các nền tảng khác nhau như web, máy tính để bàn, thiết bị di động, v.v., chúng ta phải chọn nền tảng mà chúng ta test*** .<br>4) Ban đầu, chúng ta đang sử dụng ứng dụng test web, do đó chọn "Functional testing of web pages" và nhấp vào Next. <br>

![](https://images.viblo.asia/43dfbdeb-a697-4f03-a7f5-82fd0d3fd869.jpg) <br>5) Khi chúng ta đã chọn nền tảng ở bước trước, trình hướng dẫn tạo project sẽ trỏ đến trang Test Visualizer, ở đây chúng ta có thể bật / tắt chức năng Test Visualizer. Nhấp vào Next <br>

![](https://images.viblo.asia/968ce78b-518e-4811-a387-13961d2f3083.jpg) <br>6) Bây giờ chúng ta cần phải xác định ngôn ngữ scripting cho dự án. Sau khi chọn ngôn ngữ dự án, nhấp vào Finish. <br>

![](https://images.viblo.asia/c73a3cef-9f68-4205-8f50-d4caa33edab4.jpg) <br>Giờ đây Project để test ứng dụng web đã sẵn sàng! <br>

## Ghi lại quá trình test cho ứng dụng web
Chúng ta sẽ bắt đầu với việc ghi lại quá trình test, trong đó chúng ta sẽ mở trong công cụ tìm kiếm của Google và tìm kiếm một truy vấn.

**Làm theo các bước để ghi lại quá trình test:**<br>1) Nhấp vào Append to Test, như trong hình dưới đây.<br>

***Lưu ý: TestComplete ghi lại hành động của người dùng và thường là nhấp chuột, tức là bất cứ khi nào người dùng nhấp vào bất kỳ đối tượng nào, id và tham chiếu đều được ghi lại***.<br>

![](https://images.viblo.asia/af9af79b-1e3c-4d03-bd27-5ce769acda65.jpg) <br>2) Một bảng ghi được hiển thị như trong ảnh dưới đây, điều này chứng tỏ trình record quá trình test đã bắt đầu. Bây giờ chúng ta đã sẵn sàng để thực hiện. <br>

![](https://images.viblo.asia/5e9a4059-3f57-44bd-a22a-e9bd63dc2255.jpg) <br>3) Khởi chạy trình duyệt, TestComplete nhận diện trình duyệt với lệnh kiểm tra đặc biệt tích hợp sẵn. <br>4) Điều hướng đến URL này https://www.google.com<br>5) Nhập bất kỳ truy vấn nào trên hộp tìm kiếm của Google, ví dụ phần mềm kiểm tra trợ giúp.<br>6) Nhấp vào nút Stop như được hiển thị trong hình ảnh. <br>

![](https://images.viblo.asia/5e9a4059-3f57-44bd-a22a-e9bd63dc2255.jpg) <br>7) Khi nhấp vào nút Stop, TestComplete sẽ hiển thị trình chỉnh sửa từ khóa trong đó tất cả các từ khóa được ghi lại sẽ đc được hiển thị.<br>8) Để phát lại, các test cases đc lưu trữ thì chỉ cần nhấp vào nút Run Test như được hiển thị trong hình dưới. <br>

![](https://images.viblo.asia/63feabbe-2c60-4231-8543-081316a52811.jpg) <br>

## Phân tích kết quả test
Hãy bắt đầu phân tích kết quả test. <br>

![](https://images.viblo.asia/e0e3a120-3364-47e4-b654-93649f29a4fc.jpg) <br>

Trình duyệt đang chạy sẽ khởi chạy trình duyệt. Nó phát hiện trình duyệt được khởi chạy bằng các hàm kiểm tra tích hợp sẵn và thực hiện test trong suốt quá trình phát lại. <br>

![](https://images.viblo.asia/5718c823-f6ec-4293-b792-ed081538e5fc.jpg) <br>

Lệnh này được sử dụng để đợi trang được tải; ở đây chúng ta đã mở trang chủ Google, vì vậy điều đó có nghĩa là việc thực thi test bị tạm dừng cho đến khi trang chủ của Google đã được tải hoàn toàn. <br>

![](https://images.viblo.asia/387b62d5-ac30-4d94-8afa-4b558aa18c7d.jpg) <br>

Lệnh sau đây được sử dụng để đặt text trong thanh tìm kiếm của Google, chúng ta sử dụng phần mềm test như là từ khóa và do đó những text sau đây được hiển thị. <br>

![](https://images.viblo.asia/d54e4c2a-3a4d-41b1-9178-f6e6a5774c0a.jpg) <br>

Trong Test Visualizer, các ảnh chụp màn hình đã được chụp trong khi thực hiện test, để tester có thể phân biệt giữa đầu ra màn hình thực tế và dự kiến.<br>

***Chú ý : Cho đến bây giờ, chúng ta chỉ ghi lại một vài bước cơ bản. Thực tế, đây không phải là một thử nghiệm test hoàn chỉnh. Bạn sẽ phải thêm / xóa / tùy chỉnh các bước để thực hiện xác thực các script mà bạn cần để thực hiện*** .<br>

## Tạo thử nghiệm trên ứng dụng máy tính để bàn
TestComplete hỗ trợ cả Web cũng như Ứng dụng dựa trên Máy tính để bàn.

**Hãy bắt đầu với việc tạo dự án trên Ứng dụng dựa trên máy tính để bàn.**

Ghi chú: Đóng tất cả các project đang mở trong TestComplete. Nhấp vào File | Close.<br>1) Tạo new project-> File | New | New Project mở một trình thủ thuật tạo dự án mới.<br>2) Chỉ định tên project và location. Bấm Next. <br>

***Lưu ý: Vì chúng ta đang chạy test trên một ứng dụng máy tính để bàn, nên hãy chọn ứng dụng Windows trên trình hướng dẫn. Điều này sẽ đưa đến trang để chúng ta có thể chỉ định nền tảng của project. Chọn Generic Windows application và bấm Next***.<br>

![](https://images.viblo.asia/140402d6-b92d-41ab-88e9-58758571b645.jpg) <br>

***Lưu ý: Khi chúng ta đang tự động hóa ứng dụng dành cho máy tính để bàn, chúng ta cần chỉ định ứng dụng để test trong TestComplete*** <br>4) Nhấp vào nút Add và chỉ định đường dẫn của dự án trong ở cửa sổ mở ra. 

![](https://images.viblo.asia/0bcc2546-230e-4b12-b8f1-ecd73b094bf9.jpg) <br>

Với mục đích demo, chúng ta chỉ tạo việc test trên notepad.exe.<br>5) Chỉ định đường dẫn cho tệp notepad.exe trên máy tính
Ví dụ: "C:\Users\Admin\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Accessories\Notepad.lnk". <br>

![](https://images.viblo.asia/9a6b69bf-915e-4136-a896-7329c24db2ca.jpg) <br>6) Nhấp OK. Sau đó Next.<br>7) Chọn cài đặt cần thiết cho Test Visualizer. Bấm Next.<br>8) Chọn ngôn ngữ script. Nhấp vào Finish.

Bây giờ chúng ta đã tạo dự án để ghi lại quá trình test của mình trên một ứng dụng máy tính để bàn. <br>
## Ghi lại quá trình test cho ứng dụng trên máy tính để bàn
Khi chúng ta đã ghi lại quá trình test của mình trên một dự án Web, việc ghi lại quá trình test của chúng ta cho các ứng dụng dựa trên Máy tính để bàn rất đơn giản.<br>1) Nhấp vào Append to test.<br>2) Một tập tin mới của notepad sẽ mở ra. <br>

![](https://images.viblo.asia/21ccc1c2-d440-4b46-b3d6-63a451d56669.jpg) <br>3) Bạn có thể chọn bất kỳ text. ví du "Software testing help." <br>

![](https://images.viblo.asia/a24e3625-98f7-40e8-9b67-cf0682188ea7.jpg) <br>4) Nhấp vào nút Stop.<br>5) Đóng tập tin notepad.<br>6) Để phát lại, chỉ cần nhấp vào Run Test.

## Phân tích bản test đã ghi
![](https://images.viblo.asia/e1679e97-3ab9-45ff-a72e-a396ca5d1a7e.jpg) <br>
Run Tested App là lệnh được sử dụng để khởi chạy ứng dụng. Vì chúng ta đang thực test trên notepad.exe do đó tên notepad được hiển thị trong Operation Column. TestComplete sẽ ghi lại quá trình vận hành khi ứng dụng được khởi chạy. <br>

![](https://images.viblo.asia/32a28301-b67c-4926-9fae-7a6dc763a7a4.jpg)

Chúng ta đã đánh chữ software testing help trong cửa sổ mở của notepad, do đó lệnh Edit được sử dụng để thiết lập text trong ứng dụng. <br>
## Phần kết luận
Trong bài viết này, chúng ta đã có một cái nhìn cơ bản về tool TestComplete. <br>

Chúng ta đã học được cách tạo ra projects dựa trên nền tảng Web và Desktop. Chúng ta đã ghi lại các bài test trên hai lĩnh vực khác nhau và đã học cách phân tích kết quả. <br>

Tại thời điểm này, bạn có thể cài đặt bản dùng thử và sử dụng. Hãy thử tạo một project và ghi lại một số bài test. Hãy tự tin với việc hiểu các bước và chức năng mà tool này chỉ dẫn cho bạn.

Nguồn dịch: https://www.softwaretestinghelp.com/testcomplete-tutorial-1/