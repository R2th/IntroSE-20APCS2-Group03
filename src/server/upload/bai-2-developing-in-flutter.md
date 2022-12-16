Như chúng ta đã thấy trong chương trước, Flutter cho phép chúng ta tạo các ứng dụng chạy trên Web, trên máy tính để bàn và trên thiết bị di động (có vẻ là điểm nỗi bật). Nhưng chờ một chút, chính xác thì chúng ta tạo các ứng dụng này như thế nào? Chúng ta nên sử dụng trình soạn thảo nào? Những gì cần thiết trong dự án Flutter? Bạn biên dịch mã nguồn Dart như thế nào? Chúng tôi có cần bất kỳ công cụ nào khác để hỗ trợ dự án không? Làm cách nào để bạn đưa nó vào trình duyệt hoặc trên thiết bị để kiểm tra nó? Câu hỏi hay, phải không?
Hãy trả lời những câu hỏi đó và hơn thế nữa trong chương này. Chúng ta hãy đề cập đến hai chủ đề quan trọng:

> 1. Công cụ cần thiết - Cách cài đặt và bảo trì chúng

> 2. Quá trình phát triển - Cách tạo ứng dụng, chạy và gỡ lỗi ứng dụng

# 1. Chuỗi công cụ Flutter
Không có hồi kết cho sự phát triển không ngừng của các công cụ hữu ích mà cộng đồng đã tạo ra. Nó thực sự rộng lớn. Tôi không cố gắng để bao quát tất cả các công cụ ở bài viết này. Tôi muốn cung cấp cho bạn mức vừa đủ để bạn thành thạo nhưng không quá nhiều khiến bạn bị quá tải. Thứ lỗi cho tôi nếu tôi đã bỏ qua yêu thích của bạn.

## SDK Flutter

Flutter SDK là công cụ duy nhất không thể thiếu. Nó bao gồm trình biên dịch Flutter, trình tạo dự án, trình quản lý thiết bị, test runner và các công cụ chẩn đoán - và thậm chí khắc phục - các vấn đề với cấu hình Flutter

#### Cài đặt flutter SDK
Hướng dẫn cài đặt được tìm thấy tại đây: https://flutter.dev/docs/get-started/install .

#### IDEs
Về lý thuyết, một IDE không thực sự cần thiết. Flutter có thể được viết bằng bất kỳ trình soạn thảo nào, sau đó được biên dịch và chạy bằng SDK Flutter mà bạn đã cài đặt trước đó. Nhưng trên thực tế thì hầu như không ai làm điều đó. Tại sao lại như vậy? 

- **VS Code from Microsoft**

VS Code là của Microsoft. Tên chính thức của nó là “Microsoft Visual Studio Code”, nhưng hầu hết chúng ta chỉ gọi nó là VS Code. Dù bạn gọi nó là gì, xin đừng nhầm nó với sản phẩm khác của Microsoft có tên “Microsoft Visual Studio”. không giống nhau bất kể tên tương tự.
Bạn có thể lấy VS Code tại đây: https://code.visualstudio.com.

- **Android Studio/IntelliJ from JetBrains**

Android Studio và IntelliJ về cơ bản giống nhau. Chúng được xây dựng từ cùng một cơ sở mã và có các tính năng giống nhau.
Bạn có thể tải Android Studio tại https://developer.android.com/ studio và IntelliJ IDEA tại đây: www.jetbrains.com/idea/download.

#### Tôi nên sử dụng IDE nào?

Cả VS Code và Android Studio / IntelliJ đều là mã nguồn mở và miễn phí. Cả hai đều chạy đa nền tảng trên Windows, Mac và Linux. Cả hai đều phổ biến như nhau đối với các nhà phát triển Flutter.
Nhưng nếu bạn phải chọn một, những gì chúng tôi nhận thấy là nền tảng của bạn có thể ảnh hưởng đến cách bạn thích các công cụ. Các nhà phát triển từ thế giới phát triển web, những người sử dụng công nghệ như HTML, CSS, JavaScript, NodeJS, React, Angular hoặc Vue , rất thích VS Code. Mặt khác, những nhà phát triển đến từ thế giới Java, đặc biệt là các nhà phát triển Android, dường như nghiêng về Android Studio / IntelliJ.
Tin tốt là đây là một lựa chọn rất ít áp lực. Việc chuyển đổi người chỉnh sửa là điều không bình thường - ngay cả khi đang làm việc trên một dự án nhất định. Hãy bắt đầu từ một người và xem bạn thích nó như thế nào. Nếu không, bạn có thể cho người kia Thực sự không có vấn đề gì lớn để chuyển đổi. Thực sự không có vấn đề gì lớn khi chuyển đổi.

#### IDE DevTools
Mặc dù những IDE đó rất tuyệt nhưng chúng không được xây dựng dành riêng cho Flutter; chúng cũng được sử dụng để phát triển bằng các ngôn ngữ và khuôn khổ khác. Vì vậy, để cải thiện quy trình phát triển Flutter, chúng ta nên cài đặt Flutter DevTools. Nó bổ sung thêm trong trình gỡ lỗi hỗ trợ, cho phép bạn xem nhật ký, kết nối liền mạch với trình giả lập và một số thứ khác.
Việc cài đặt DevTools được thực hiện từ bên trong mỗi IDE. Trong Android Studio / IntelliJ, đi tới “Preferences ➤ Plugins” từ menu chính (Hình 2-1). Trong VS Code, chuyển đến “View ➤ Extensions” (Hình 2-2 )). Các công cụ phát triển Flutter được gọi đơn giản là “Flutter” và một tìm kiếm sẽ hiển thị chúng. Trong một trong hai nền tảng, hãy nhấn vào nút “Cài đặt” màu xanh lục.

![](https://images.viblo.asia/e96419d9-012b-45b6-8875-476e804e3bb7.png)

Bạn có thể phải khởi động lại IDE sau khi cài đặt.

#### Emulators

Khi bạn đã cài đặt IDE và DevTools, bạn đã sẵn sàng để biên dịch ứng dụng của mình. Nhưng để chạy ứng dụng, bạn cần tải ứng dụng đó trên một thiết bị. Trình giả lập - một thiết bị ảo chạy trên máy tính xách tay / máy tính để bàn của bạn - làm cho nó Có thể bạn sẽ muốn thử nghiệm trên cả iOS và Android, vì vậy bạn sẽ cần trình giả lập cho mỗi loại. Có một số trình giả lập có sẵn, nhưng tôi sẽ chỉ đề cập đến một vài, trình mô phỏng iOS của Xcode và trình giả lập Android của AVD.

 - iOS simulator
 
Nếu bạn không sở hữu máy Mac, bạn sẽ không chạy trình giả lập iOS hoặc thậm chí biên dịch cho iOS cho vấn đề đó.2 Nhưng nếu bạn làm như vậy và bạn đã cài đặt Xcode thì bạn thật may mắn; bạn đã có trình mô phỏng iOS rồi Để chạy nó, bạn mở Xcode, sau đó vào Xcode ➤ Open Developer Tool ➤ Simulator (Hình 2-3) Trình mô phỏng sẽ khởi động và từ bên trong nó, bạn có thể chọn bất kỳ thiết bị iOS nào bao gồm cả iPhone và iPad.

![](https://images.viblo.asia/40f02a48-1822-4891-914b-d067abb1e8f4.png)Hình 2-3


- Android emulator

Giống như có rất nhiều mẫu Android, cũng có rất nhiều trình giả lập Android, nhưng chỉ có hai cách phổ biến để tương tác với chúng: Genymotion và AVD Manager. Genymotion là một công ty hoạt động vì lợi nhuận, vì vậy khi bạn truy cập trang web của họ, Họ sẽ cố gắng hết sức để hướng bạn đến phiên bản trả phí của họ. Điều đó có thể hiểu được. Chúng tôi sẽ tập trung vào Trình quản lý AVD vì nó hoàn toàn miễn phí và phổ biến hơn với các nhà phát triển Flutter.
AVD là viết tắt của “Android Virtual Device.” Trình quản lý AVD được tìm thấy trong Android Studio bên dưới Công cụ (Hình 2-4).

![](https://images.viblo.asia/c62bb7f5-cc42-433b-9e86-e98724c2938e.png)
Hình 2-4

Sau khi mở, bạn sẽ thấy danh sách các trình giả lập hiện được cài đặt của mình. Ban đầu, danh sách này sẽ trống. Bạn sẽ có khả năng cài đặt một hoặc nhiều trong số hàng trăm trình giả lập thiết bị Android có sẵn bằng cách nhấn vào nút “+ Tạo thiết bị ảo ... ”ở dưới cùng (Hình 2-5).

Nhấn vào nó và bạn có thể chọn từ tất cả các loại thiết bị hoặc tạo một thiết bị của riêng mình. Bạn chỉ cần cài đặt một thiết bị một lần. Sau khi cài đặt xong, thiết bị giả lập đó có thể sử dụng được từ bất kỳ IDE nào, cho dù là IntelliJ / Android Studio hay VS Code . Không cần thiết lập riêng trên VS Code.

#### Luôn cập nhật các công cụ
Ngay từ đầu, việc phát triển đa nền tảng với các công cụ như Xamarin và React Native đã vô cùng khó khăn vì số lượng công cụ liên quan quá nhiều và sự phụ thuộc lẫn nhau giữa chúng. Tôi vẫn đang điều trị khỏi cơn đau.
Nhưng vì Flutter xuất hiện muộn hơn nên nó có thể học hỏi từ những sai lầm của người khác. Nhóm Flutter, nhận ra những điểm khó khăn này, đã cung cấp cho chúng tôi một công cụ sáng tạo để quản lý phần còn lại của chuỗi công cụ. Nó sẽ kiểm tra máy phát triển của bạn, tìm kiếm tất cả các công cụ Nó thậm chí sẽ chỉ định một giải pháp cho những vấn đề đó. Nghe giống như một bác sĩ, bạn sẽ cần phát triển các ứng dụng Flutter, các phiên bản bạn có, các phiên bản có sẵn, sự phụ thuộc lẫn nhau giữa chúng và sau đó đưa ra chẩn đoán các vấn đề. Vâng, để tôi giới thiệu bạn với bác sĩ rung động!

#### flutter doctor
Bạn sẽ chạy chương trình phát sóng từ dòng lệnh. Nó sẽ kiểm tra tất cả các công cụ trong chuỗi công cụ của bạn và báo cáo lại bất kỳ sự cố nào mà nó gặp phải. Đây là một trong những vấn đề mà Xcode cần một số trợ giúp:

```
 flutter doctor
```

![](https://images.viblo.asia/b04cc20b-7d4a-49df-a5e7-be0bd6a5cdae.png)

#### flutter upgrade

Có, quá trình cài đặt Flutter SDK ban đầu hơi khó khăn nhưng việc nâng cấp diễn ra thật dễ dàng. Bạn sẽ nhập hai từ theo nghĩa đen, “nâng cấp rung lắc”:

```
flutter upgrade
```
Lưu ý rằng bước cuối cùng sẽ chạy tự động bác sĩ rung, xác nhận rằng tất cả đều ổn. Nâng cấp là một miếng bánh.
# 2. Quá trình phát triển Flutter
Bây giờ chúng ta đã cài đặt tất cả các công cụ và cập nhật, hãy tạo một ứng dụng và chạy nó thông qua trình gỡ lỗi.

### Cài đặt 
Tạo một ứng dụng Flutter hoàn toàn mới bằng cách chạy ...
```
flutter create my_app
```
Thao tác này sẽ tạo một thư mục con trong thư mục hiện tại có tên là my_app. Nó sẽ chứa đầy mã Dart sẵn sàng chạy.

###  Xem một dự án Flutter có gì nhé

![](https://images.viblo.asia/a6f08d7d-9208-40d4-8af9-4f7d1318d706.png)

Bạn sẽ có các thư mục này:

- android và ios - Đây là những phần dành riêng cho nền tảng của dự án. Về phần lớn, bạn không cần phải chạm vào những phần này.
- lib - Đây là nơi lưu trữ tất cả mã nguồn Dart của bạn. Bạn sẽ xây dựng hệ thống phân cấp ứng dụng của mình tại đây. Đây là nơi bạn sẽ dành gần như toàn bộ thời gian và sự chú ý của mình.
- kiểm tra - Nếu bạn có các bài kiểm tra đơn vị (và cuối cùng bạn có thể nên làm), hãy đặt chúng ở đây.
Và bạn sẽ có những tệp này:
- pubspec.yaml - Đây thực chất là tệp dự án cho các dự án Dart. Đây là nơi chúng tôi đặt tên dự án, mô tả, các phụ thuộc và hơn thế nữa. Hãy nhớ đọc các nhận xét tại đây để có bức tranh rõ hơn về những gì được đề xuất và khả thi.
- .gitignore và README.md - Những thứ này sẽ rất quen thuộc với những nhà phát triển sử dụng git và github cho kho mã nguồn của họ. Những người khác không quan tâm.
- .metadata và .packages - Đây là những tệp cấu hình quan trọng mà bạn sẽ không bao giờ mở. Nhưng Flutter cần chúng.

### Chạy ứng dụng của bạn

Bạn hiện đã tạo một ứng dụng Flutter. Hãy bắt đầu chạy ứng dụng đó. Có nhiều cách để chạy ứng dụng của bạn. Cách phổ biến nhất là nhấn vào nút "Phát" màu xanh lục trong Android Studio / IntelliJ hoặc VS Code. Bạn cũng có thể làm điều đó từ dòng lệnh bằng cách sử dụng “flashing run”:

```
flutter run
```
Nhưng nếu bạn nhấn vào nút Phát / Gỡ lỗi màu xanh lục trong IDE của mình (Hình 2-7), bạn sẽ có tùy chọn gỡ lỗi ứng dụng của mình bằng cách đặt các điểm ngắt và chuyển qua mã bằng các công cụ dành cho nhà phát triển (Hình 2-8).

![](https://images.viblo.asia/55d4c135-32d4-444c-a54b-d3694670a0cd.png)

![](https://images.viblo.asia/fbae182d-33b1-47a3-865d-da34d4d90b0c.png)

Rõ ràng là bạn sẽ cần chạy ứng dụng của mình trên một số loại thiết bị. Có một số loại: trình duyệt Chrome dành cho ứng dụng web, trình giả lập hoặc thiết bị vật lý được kết nối với máy phát triển của bạn qua cáp. Khi bạn nhấp vào Play / Nút gỡ lỗi, bạn có thể chọn thiết bị bạn muốn chạy tại thời điểm đó. Lưu ý rằng trong ảnh chụp màn hình trước của Android Studio, có một menu thả xuống với danh sách các thiết bị có sẵn. Trong VS Code, hãy nhấn vào nút Phát và menu ngay lập tức bật lên với các lựa chọn của bạn. Với IDE, bạn có quyền kiểm soát.

Bạn có thể kiểm tra những thiết bị nào hiện khả dụng cho bạn bằng cách chạy “thiết bị rung” từ dòng lệnh.

```
flutter devices
```

### Chạy nó như một ứng dụng web

Flutter coi trình duyệt của bạn là thiết bị khi bạn đang chạy dưới dạng ứng dụng web. Vì vậy, tất cả những gì cần thiết để chạy dưới dạng ứng dụng web là bật trình duyệt web Google Chrome làm thiết bị. Bạn có thể bật trình duyệt này một lần lệnh: lệnh:

```
flutter config --enable-web
```

Từ đó trở đi, khi bạn nhận được danh sách các thiết bị để chạy ứng dụng của mình, “Chrome” sẽ xuất hiện dưới dạng một trong số chúng. Chỉ cần chọn chạy ứng dụng của bạn trong Chrome và IDE sẽ tải ứng dụng web của bạn trong đó.

### Chạy nó trên thiết bị kết nối
Đôi khi bạn cần chạy ứng dụng của mình trên một thiết bị vật lý.
Ví dụ: tôi đang phát triển một dự án liên quan đến việc in nhãn
Với một máy in thực được kết nối bằng Bluetooth. Trình mô phỏng không ghép nối qua Bluetooth. Để kiểm tra việc in, tôi cần một thiết bị vật lý thực tế đã được ghép nối với máy in Bluetooth của mình.
Để kết nối thiết bị vật lý với máy phát triển của bạn, bạn sẽ sử dụng cáp USB cho hầu hết các thiết bị Android và cáp Lightning cho hầu hết các iPhone.

### Hot reloading
Khi ứng dụng đang chạy trong trình giả lập / trình duyệt / thiết bị vật lý / bất cứ thứ gì của bạn, bạn sẽ muốn thực hiện các thay đổi đối với mã nguồn và chạy lại. Đây là điều thực sự thú vị: bất cứ khi nào bạn lưu thay đổi vào mã nguồn, nó sẽ được biên dịch lại Và phiên bản mới được tải ngay lập tức. Ứng dụng của bạn sẽ bắt đầu từ nơi bạn đã dừng lại - ở cùng một vị trí, cùng trạng thái và cùng một dữ liệu. Chúng tôi gọi đó là “tải lại nóng” và nó làm cho chu kỳ phát triển nhanh và dễ dàng một cách kỳ lạ.

### Debugging
Cả hai IDE về cơ bản đều có các công cụ gỡ lỗi giống nhau mà bạn đã quen với trong tất cả các IDE. Khi bạn bắt đầu chạy dự án của mình, các công cụ gỡ lỗi sẽ xuất hiện.
Trong Android Studio, cửa sổ gỡ lỗi sẽ mở ra, thường ở cuối IDE, có một thanh công cụ nhỏ trông giống như Hình 2-9.

![](https://images.viblo.asia/d3f89862-a05e-4892-aa95-28904ce8dd48.png)
Hình 2-9

Các tùy chọn là“step over,” “step into,” “force step into,” và “step out”


Trong VS Code, thanh công cụ xuất hiện nổi trên mã nguồn của bạn (Hình 2-10).

![](https://images.viblo.asia/51e9aa0b-956c-4a0c-9876-11f0f523035c.png)
Hình 2-10

Các tùy chọn của nó là “play/pause”, “step over,”, “step into”, “step out”, “hot reload”, “restart” và “stop debugging.”.

# Kết luận

Ok. tôi biết rằng bạn đang có rất nhiều thứ cần phải nhớ. Bản chất của phát triển đa nền tảng khiến công cụ trở nên  dạng. Nhưng điều tồi tệ nhất đang ở phía sau chúng ta. Sau khi bạn đã có Flutter SDK và IDE (VS Code / Android Studio ) / IntelliJ IDEA) đã được cài đặt, đó là tất cả những gì bạn thực sự cần. Và được chấp nhận, DevTools và một hoặc hai trình giả lập thực sự có thể giúp ích. Tất cả những gì còn lại là thực hiện nhiều lần và lặp đi lặp lại. Bạn sẽ trở nên tuyệt vời!
Bây giờ chúng ta đã thấy chuỗi công cụ Flutter, hãy bắt đầu tạo các widget!