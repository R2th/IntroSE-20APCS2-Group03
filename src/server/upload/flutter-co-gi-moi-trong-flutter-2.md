![image.png](https://images.viblo.asia/f448c8b6-718e-4a90-b7cb-1d7e7f85f51d.png)

Web Flutter và Null Safety đã đưa vào stable, Flutter desktop chuyển sang phiên bản beta và hơn thế nữa!

Có rất nhiều điều thú vị trong bản phát hành Flutter 2. Để biết tổng quan về những tính năng mới trên Flutter 2 và Dart 2.12 . Để xem bản thân Flutter 2 có gì mới, hãy tiếp tục đọc!

https://200lab.io/blog/flutter-la-gi-cac-dac-tinh-vuot-troi-flutter/

## Web

Kể từ hôm nay, phần hỗ trợ cho web của Flutter đã chuyển từ kênh beta sang kênh stable. Với khởi đầu này, Flutter đẩy cao khả năng tái sử dụng của code lên một cấp độ khác với sự hỗ trợ của nền tảng web. Vì vậy, bây giờ khi bạn tạo ứng dụng Flutter, web có thể là một mục tiêu thiết bị khác cho ứng dụng của bạn.

![image.png](https://images.viblo.asia/e34e6d5f-c41b-4c1b-abc5-55bcc3a86c19.png)

Bằng cách tận dụng nhiều điểm mạnh của web platform, Flutter đã xây dựng nền tảng cho việc phát triển các ứng dụng web giàu tính tương tác. Flutter chủ yếu tập trung vào hiệu suất và cải thiện độ chính xác của kết xuất đồ hoạ. Đối với HTML renderer, Flutter đã thêm trình kết xuất dựa trên CanvasKit mới. Flutter cũng đã thêm các tính năng dành riêng cho web, chẳng hạn như [Link widget](https://pub.dev/documentation/url_launcher/latest/link/Link-class.html), để đảm bảo ứng dụng của bạn chạy trong trình duyệt giống như một ứng dụng web.

## Sound Null Safety

Sound null safety là một bổ sung đáng kể cho ngôn ngữ Dart, giúp tăng cường type system bằng cách phân biệt nullable types với non-nullable types. Điều này cho phép các nhà phát triển ngăn chặn null error, một lý do phổ biến khiến các ứng dụng gặp sự cố. Bằng cách kết hợp null checks vào type system, những lỗi này có thể được phát hiện trong quá trình phát triển, do đó ngăn ngừa sự cố trong môi trường production. Sound null safety được hỗ trợ đầy đủ ở chế độ ổn định kể từ Flutter 2, có chứa [Dart 2.12](https://medium.com/dartlang/announcing-dart-2-12-499a6e689c87).

Kho lưu trữ pub.dev package đã có hơn 1.000 null safe packages được xuất bản, bao gồm hàng trăm packages của nhóm Dart, Flutter, Firebase và Material. Nếu bạn là tác giả của packages, hãy xem lại [hướng dẫn migration](https://dart.dev/null-safety/migration-guide) và cân nhắc migrating ngay hôm nay.

## Desktop

Trong bản phát hành này, Flutter hỗ trợ dành cho desktop khả dụng trong stable channel (release flag). Điều này có nghĩa là Flutter đã sẵn sàng để bạn dùng thử nó như một mục tiêu triển khai cho các ứng dụng Flutter của bạn: bạn có thể coi nó như một “beta snapshot” xem trước của bản phát hành ổn định cuối cùng sẽ ra mắt vào cuối năm nay.

Để đưa Flutter desktop đến mức chất lượng này, đã có những cải tiến cả lớn và nhỏ, bắt đầu với việc đảm bảo rằng chỉnh sửa văn bản hoạt động giống như trải nghiệm native trên từng nền tảng được hỗ trợ, bao gồm các tính năng cơ bản như điểm xoay chuyển văn bản và khả năng để dừng sự lan truyền của một keyboard event sau khi nó đã được xử lý. Về phía đầu vào – chuột, thao tác kéo trỏ có độ chính xác cao giờ đây bắt đầu ngay lập tức thay vì phải đợi độ lag khi xử lý đầu vào. Ngoài ra, một menu context tích hợp đã được thêm vào các tiện ích TextField và TextFormField cho các ngôn ngữ thiết kế Material và Cupertino. Cuối cùng, xử lý kéo thả đã được thêm vào ReorderableListView widget.

![image.png](https://images.viblo.asia/70bccee8-d327-4f6c-894f-d29341016ef0.png)

ReorderableListView luôn làm tốt trong việc dịch chuyển các mục, nhưng nó yêu cầu người dùng bắt đầu kéo bằng cách nhấn và giữ. Điều đó là hợp lý trên thiết bị di động, nhưng ít người dùng desktop nghĩ rằng phải nhấn và giữ chuột trên một mục để di chuyển nó, vì vậy bản phát hành này bao gồm một tay cầm thích hợp cho đầu vào bằng chuột hoặc cảm ứng. Một cải tiến khác cho chức năng platform-idiomatic là thanh cuộn được cập nhật hiển thị chính xác cho form-factor trên desktop.

![image.png](https://images.viblo.asia/b971e13e-6c4f-4864-80c4-595087bd76b3.png)

Scrollbar widget đã được cập nhật để cung cấp các tính năng tương tác được mong đợi trên desktop, bao gồm khả năng kéo, nhấp vào track để page up and down, và để hiển thị một track khi con chuột di chuột qua bất kỳ phần nào của thanh cuộn. Hơn nữa, vì Scrollbar có thể thiết lập theme bằng cách sử dụng [class mới là ScrollbarTheme](https://api.flutter.dev/flutter/material/ScrollbarTheme-class.html), bạn có thể tạo kiểu cho nó để phù hợp với giao diện ứng dụng của mình.

Đối với chức năng bổ sung dành riêng cho desktop, bản phát hành này cũng cho phép xử lý đối số dòng lệnh cho các ứng dụng Flutter để những việc đơn giản như nhấp đúp vào tệp dữ liệu trong Windows File Explorer có thể mở tệp trong ứng dụng của bạn. Flutter cũng đã cố gắng thay đổi dung lượng sao cho mượt mà hơn cho cả Windows và macOS, đồng thời bật IME (Input Method Editors) cho người dùng quốc tế.

![](https://images.viblo.asia/77f2f394-c60d-45b2-bf15-dc67b37cdcd8.gif)

Ngoài ra, Flutter đã cung cấp các tài liệu cập nhật về những gì bạn cần làm để bắt đầu chuẩn bị triển khai ứng dụng dành cho desktop của bạn cho từng OS đặc thù.

Khi dùng thử bản beta dành cho Flutter desktop, bạn có thể access bằng cách chuyển sang kênh beta cũng như đặt config flags cho các nền tảng bạn đang nhắm mục tiêu theo hướng dẫn trên Flutter.dev. Ngoài ra, Flutter cũng đã tạo snapshot về các bit beta có sẵn trên stable channel. Nếu bạn sử dụng ‘flutter config’ để bật một trong các cài đặt desktop config (ví dụ: enable-macos-desktop), thì bạn có thể thử chức năng beta dành cho desktop dễ dàng vào kênh beta và kéo xuống tất cả bản beta mới nhất của Flutter SDK, xây dựng các công cụ, v.v. Điều này thật tuyệt khi dùng thử hoặc sử dụng desktop support như một “Máy ảo Flutter” (Flutter Emulator) đơn giản.

Tuy nhiên, nếu bạn chọn ở trên stable channel để access phiên bản beta dành cho desktop, bạn sẽ không nhận được các tính năng mới hoặc bản sửa lỗi nhanh chóng như chuyển sang kênh beta hoặc dev channels. Vì vậy, nếu bạn đang nhắm mục tiêu đến Windows, macOS hoặc Linux, bạn nên chuyển sang kênh cung cấp các bản cập nhật nhanh hơn.

Khi Flutter tiếp cận bản phát hành Flutter desktop full production-quality đầu tiên của mình, Flutter còn nhiều việc phải làm, bao gồm hỗ trợ tích hợp với các native top-level menu, chỉnh sửa văn bản giống như trải nghiệm của từng nền tảng riêng lẻ và hỗ trợ trợ năng, cũng như các bản sửa lỗi chung và cải tiến hiệu suất.

## Platform Adaptive Apps: Flutter Folio Sample

Bây giờ Flutter hỗ trợ ba nền tảng cho phát triển ứng dụng (Android, iOS và web) và ba nền tảng khác ở phiên bản beta (Windows, macOS và Linux), một câu hỏi tự được đặt ra: làm thế nào để bạn viết một ứng dụng tự thích ứng tốt với nhiều các yếu tố hình thức (màn hình nhỏ, trung bình và lớn), các chế độ nhập liệu khác nhau (chạm, bàn phím và chuột) và các idioms khác nhau (thiết bị di động, web và desktop)? Để trả lời câu hỏi này, Flutter đã đưa vào sử dụng ứng dụng Flutter Folio scrapbooking.

Folio là một ví dụ đơn giản về một ứng dụng mà bạn muốn chạy tốt trên nhiều nền tảng từ một code base duy nhất. Và “tốt” nghĩa là nó trông đẹp trên màn hình nhỏ, vừa và lớn, vì nó tận dụng được khả năng nhập liệu bằng cảm ứng, bàn phím và chuột và nó hoạt động tốt với các idioms của nền tảng, (ví dụ: bằng cách sử dụng các liên kết trên web và menu trên desktop). Những ứng dụng này là “thích ứng với nền tảng” (platform adaptive) vì nó thích ứng tốt với bất kỳ nền tảng nào mà nó đang chạy.

Nếu bạn muốn biết bằng cách nào có thể làm cho nền tảng ứng dụng của riêng mình thích ứng, bạn có thể xem source code cho Folio. Trong tương lai, hy vọng sẽ tìm thấy các tài liệu và codelabs khám phá chủ đề này sâu hơn.

## Google Mobile Ads sang Beta

Ngoài Flutter desktop chuyển sang phiên bản beta, hôm nay Flutter có bản beta mở cho SDK Google Mobile Ads. Đây là một plugin hoàn toàn mới cung cấp inline banner và native ads, ngoài các overlay formats hiện có (overlay banner, interstitial, and rewarded video ads). Plugin này hợp nhất hỗ trợ cho Ad Manager và Admob, vì vậy, bất kể bạn là nhà phát hành ở quy mô nào, plugin này có thể được điều chỉnh cho phù hợp với các tình huống của bạn.

![image.png](https://images.viblo.asia/faf3c3bd-36bf-493d-92e9-ae643d43f122.png)

Đội ngũ Flutter đã thử nghiệm plugin này với một số khách hàng đầu tiên của họ trong private beta program và nhiều người trong số họ đã khởi chạy thành công ứng dụng của họ với các định dạng mới này. Ví dụ: Sua Musica (nền tảng âm nhạc Mỹ Latinh lớn nhất dành cho các nghệ sĩ độc lập với hơn 15 nghìn nghệ sĩ đã được xác minh và 10 triệu MAU) đã dùng plugin Google Mobile Ads SDK cho Flutter. Họ thấy rằng số lần hiển thị tăng 350% với CTR tăng 43% và eCPM tăng 13%.

Plugin này đang khả dụng để bạn sử dụng ngay hôm nay. Là một phần của Flutter Engage, Andrew Brogdon và Zoey Fan đã trình bày một phiên về “Kiếm tiền từ ứng dụng với Flutter” (có sẵn trên trang Flutter Engage), nơi họ nói về các chiến lược kiếm tiền cho các ứng dụng được xây dựng bằng Flutter và cách bạn có thể tải quảng cáo trong ứng dụng Flutter. Hơn nữa, Flutter đã tạo một trang quảng cáo mới trên flash.dev, nơi bạn có thể tìm thấy tất cả các tài nguyên hữu ích như hướng dẫn triển khai plugin, inline banner và native ads codelab cũng như overlay banner, codelab quảng cáo xen kẽ và quảng cáo video có tặng thưởng.

## Các tính năng iOS mới

Flutter đang tiếp tục nâng cao chất lượng hỗ trợ cho các nền tảng khác nên đừng nghĩ rằng nó đang bỏ quên iOS. Trên thực tế, bản phát hành này mang đến 178 PRs được hợp nhất có liên quan đến iOS, bao gồm 23495 mang đến tính năng Khôi phục trạng thái (State Restoration) cho iOS, 67781 đáp ứng yêu cầu lâu dài là xây dựng IPA trực tiếp từ dòng lệnh mà không cần mở Xcode và 69809 cập nhật phiên bản CocoaPods để phù hợp với công cụ mới nhất. Ngoài ra, một số tiện ích iOS đã được thêm vào việc triển khai ngôn ngữ thiết kế Cupertino.

CupertinoSearchTextField mới cung cấp cho giao diện người dùng thanh tìm kiếm iOS.

![image.png](https://images.viblo.asia/0292415d-c5d4-42fc-89c4-71daa2783af4.png)

Các widget CupertinoFormSection, CupertinoFormRow và CupertinoTextFormFieldRow giúp tạo các trường biểu mẫu đã được xác thực với tính thẩm mỹ hình ảnh từng phần của iOS dễ dàng hơn.

![image.png](https://images.viblo.asia/0c669000-0927-4d70-96b9-af7ae0c48fc7.png)

Ngoài tính năng hoạt động cho iOS, đội ngũ Flutter đang tiếp tục nghiên cứu các cải tiến hiệu suất cho iOS và Flutter nói chung khi nói đến trình tạo bóng và hoạt ảnh. iOS tiếp tục là nền tảng hàng đầu cho Flutter và nó sẽ tiếp tục làm việc để mang đến những cải tiến hiệu suất và tính năng mới quan trọng.

## Các widget mới: Autocomplete và ScaffoldMessenger

Bản phát hành Flutter này đi kèm với hai widget mới bổ sung là AutocompleteCore và ScaffoldMessenger. AutocompleteCore đại diện cho chức năng tối thiểu cần thiết để có được chức năng auto-complete vào ứng dụng Flutter của bạn.

![image.png](https://images.viblo.asia/a7231454-0136-4fed-b1b8-a99d016a887c.png)

Autocomplete là một tính năng often-requested cho Flutter, vì vậy bản phát hành này bắt đầu cung cấp chức năng này. Bạn có thể sử dụng nó ngay hôm nay, nhưng nếu bạn tò mò về thiết kế cho tính năng hoàn chỉnh, hãy tham khảo tài liệu thiết kế autocomplete.

Tương tự như vậy, ScaffoldMessenger được tạo ra để giải quyết một số vấn đề liên quan đến SnackBar, bao gồm khả năng dễ dàng tạo SnackBar để làm việc với AppBar action. SnackBars để tồn tại giữa các lần chuyển đổi Scaffold và có thể hiển thị SnackBar khi hoàn thành một action không đồng bộ, ngay cả khi người dùng đã điều hướng đến một trang có Scaffold khác.

![image.png](https://images.viblo.asia/abe922d2-8590-4634-aa6f-84289b038f6b.png)

Tất cả những điều tốt đẹp này có thể làm được với một vài dòng code:

```
final messenger = ScaffoldMessenger.of(context);

messenger.showSnackBar(SnackBar(content: Text(‘I can fly.’)));
```

## Nhiều phiên bản Flutter với Add-to-App

Qua trao đổi với nhiều nhà phát triển Flutter, một lượng lớn các bạn không có điều kiện bắt đầu một ứng dụng hoàn toàn mới nhưng bạn có thể tận dụng Flutter bằng cách thêm nó vào các ứng dụng iOS và Android hiện có của mình. Tính năng này được gọi là Add-to-App, là một cách tuyệt vời để sử dụng lại code Flutter của bạn trên cả hai nền tảng di động trong khi vẫn bảo toàn native code base hiện tại. Tuy nhiên, họ có thể cảm thấy khó hiểu với cách tích hợp first screen vào Flutter. Việc đan xen Flutter và native screens khiến trạng thái điều hướng khó duy trì và việc tích hợp nhiều Flutter ở view level sẽ sử dụng rất nhiều bộ nhớ.

Trước đây, các phiên bản Flutter bổ sung có cùng tiêu tốn bộ nhớ như phiên bản đầu tiên. Trong Flutter 2, chúng tôi đã giảm mức độ tiêu tốn bộ nhớ tĩnh của việc tạo các công cụ Flutter bổ sung từ ~ 99% xuống ~ 180kB cho mỗi instance.

![image.png](https://images.viblo.asia/423c90e6-733b-43a7-b314-1cd80213f739.png)

Các API mới để làm điều này đang ở bản xem trước trên kênh beta và được document lại trên flash.dev. Với thay đổi này, bạn nên tạo nhiều phiên bản của công cụ Flutter trong các ứng dụng native của bạn.

## Flutter Fix

Khi mà framework càng hoàn chỉnh thì nó sẽ tập hợp những người dùng có code base càng lớn, xu hướng theo thời gian là tránh thực hiện bất kỳ thay đổi nào đối với framework API để tránh phá vỡ số lượng dòng code ngày càng tăng. Với hơn 500.000 Flutter developers trên một số nền tảng, Flutter 2 nhanh chóng được xếp vào danh mục này. Tuy nhiên, để đội ngũ tiếp tục cải thiện Flutter theo thời gian, họ muốn có thể thực hiện các thay đổi đột phá đối với API. Câu hỏi đặt ra là, làm thế nào để tiếp tục cải thiện API Flutter mà không làm gián đoạn các developers của họ?

Câu trả lời của họ là Flutter Fix.

Flutter Fix là sự kết hợp của nhiều thứ. Đầu tiên, có một tùy chọn command-line mới cho công cụ dart CLI được gọi là dart fix giúp biết nơi tìm danh sách các API không dùng nữa và cách cập nhật code bằng các API đó. Thứ hai, đó là danh sách các bản sửa lỗi có sẵn, được bundle với Flutter SDK kể từ phiên bản 2. Và cuối cùng, đó là một bộ tiện ích mở rộng Flutter được cập nhật cho VS Code, IntelliJ và Android Studio IDE biết cách hiển thị cùng danh sách các bản sửa lỗi có sẵn như các bản sửa lỗi nhanh với một chút light bulbs sẽ giúp bạn thay đổi code bằng một cú nhấp chuột.

Ví dụ: giả sử bạn có dòng mã sau trong ứng dụng của mình:

![image.png](https://images.viblo.asia/1f7142dd-7ad4-4814-987b-f77d5ea95b6e.png)

Vì đối số của constructor này không được dùng nữa, nên nó sẽ được thay thế bằng đối số sau:

![image.png](https://images.viblo.asia/027b3cf5-bbe0-447a-9874-e536e069b1bb.png)

Ngay cả khi bạn đã quen với tất cả trong số rất nhiều bản không dùng nữa của Flutter (deprecations), thì số lượng thay đổi bạn phải thực hiện trong code của mình càng lớn, bạn càng khó áp dụng tất cả các bản sửa lỗi và càng dễ mắc lỗi; con người không giỏi trong những loại công việc lặp đi lặp lại này. Nhưng máy tính thì khác; bằng cách thực hiện lệnh sau, bạn có thể xem tất cả các bản sửa lỗi mà chúng tôi biết cách thực hiện trên toàn bộ dự án của bạn:

`$ dart fix --dry-run`

Nếu bạn muốn áp dụng hàng loạt, bạn có thể dễ dàng làm như vậy:

`$ dart fix --apply`

Hoặc nếu bạn muốn áp dụng các bản sửa lỗi này một cách tương tác trong IDE yêu thích của mình, bạn cũng có thể làm điều đó.

![image.png](https://images.viblo.asia/71400c01-0ecb-4d98-ac5c-2b4741d478cd.png)

Mặc dù Flutter đã đánh dấu các API cũ là không được dùng nhưng giờ đây nó đã có chính sách về thời điểm thực sự xóa các API không dùng nữa, Flutter 2 lần đầu tiên làm như vậy. Mặc dù nó vẫn chưa hoàn toàn nắm bắt được tất cả các API không dùng nữa làm dữ liệu để cung cấp Flutter Fix, nhưng nó vẫn tiếp tục bổ sung thêm từ các API không dùng nữa và sẽ tiếp tục làm như vậy với các thay đổi đột phá trong tương lai. Mục tiêu của Flutter là cố gắng hết sức để làm cho API của Flutter trở nên tốt nhất có thể đồng thời giữ cho code của bạn luôn được cập nhật.

## Flutter DevTools

Rõ ràng là DevTools là một công cụ nên được sử dụng để debugging các ứng dụng Flutter của bạn, đội ngũ Flutter đã đổi tên nó thành Flutter DevTools khi nó debugging một ứng dụng Flutter. Ngoài ra, họ đã làm rất nhiều việc để production quality của nó xứng đáng với Flutter 2.

Một tính năng mới giúp bạn giải quyết các vấn đề của mình ngay cả trước khi bạn khởi chạy DevTools là khả năng cho Android Studio, IntelliJ hoặc Visual Studio Code để thông báo khi có một lỗi phổ biến và đề nghị đưa nó vào trong DevTools để giúp bạn debug nó. Ví dụ: phần sau cho thấy một lỗi overflow đã được đưa vào ứng dụng của bạn, điều này sẽ đưa ra một tùy chọn trong Visual Studio Code để debug sự cố trong DevTools.

![image.png](https://images.viblo.asia/533bc7c2-1102-4c6c-ac5b-dd8ed2a246dc.png)

Nhấn vào nút đó sẽ đưa bạn đến ngay Flutter Inspector trong DevTools trên widget đang gây ra sự cố để bạn có thể khắc phục sự cố. Đội ngũ Flutter chỉ làm điều này cho các trường hợp layout overflow ngoại lệ hiện nay nhưng kế hoạch của họ bao gồm xử lý cho tất cả các loại ngoại lệ phổ biến mà DevTools có thể là giải pháp.

Khi bạn đã chạy DevTools, các error badges mới trên các tab sẽ giúp bạn theo dõi các vấn đề cụ thể trong ứng dụng của mình.

![image.png](https://images.viblo.asia/dcf02fd9-fb18-4b50-a7e5-df981846b7c7.png)

Một tính năng mới khác trong DevTools là khả năng dễ dàng nhìn thấy hình ảnh có độ phân giải cao hơn so với hình ảnh được hiển thị, giúp theo dõi việc sử dụng bộ nhớ và kích thước ứng dụng quá mức. Để bật tính năng này, hãy bật Invert Oversized Images trong Flutter Inspector.

![image.png](https://images.viblo.asia/1027b005-1b72-4c0e-9f18-b78408a3f20d.png)

Giờ đây, khi bạn hiển thị hình ảnh có độ phân giải lớn hơn đáng kể so với kích thước hiển thị, hình ảnh đó sẽ xuất hiện lộn ngược để giúp bạn dễ dàng tìm thấy trong ứng dụng của mình.

![image.png](https://images.viblo.asia/73b7a8a3-72bb-4f25-a5c8-3cb878158ba8.png)

Ngoài ra, theo nhu cầu phổ biến, ngoài việc hiển thị chi tiết về bố cục linh hoạt trong Trình khám phá bố cục của Trình kiểm tra Flutter (Flutter Inspector’s Layout Explorer), chúng tôi cũng đã thêm khả năng hiển thị bố cục cố định, cho phép bạn debug các loại bố cục.

![image.png](https://images.viblo.asia/f8ed5ecb-fc64-48e2-802c-74a234b5ba4d.png)

Và đó không phải là tất cả. Đây chỉ là bản tóm tắt về một vài tính năng mới khác trong Flutter DevTools 2:

* Đã thêm thông tin FPS trung bình và cải tiến khả năng sử dụng vào Flutter frames chart
* Hiển thị ra các network requests không thành công trong network profiler có nhãn lỗi màu đỏ
* Biểu đồ memory view mới nhanh hơn, nhỏ hơn và dễ sử dụng hơn, bao gồm một hovercard mới để mô tả hoạt động tại một thời điểm cụ thể
* Đã thêm tìm kiếm và lọc vào Logging tab
* Track logs từ trước khi DevTools được bắt đầu để bạn có thể xem toàn bộ lịch sử logging khi bạn khởi động nó
* Đổi tên chế độ xem “Performance” thành “CPU Profiler” để làm rõ hơn chức năng mà nó cung cấp
* Thêm timing grid vào biểu đồ CPU Profiler
* Đổi tên chế độ xem “Timeline” thành “Performance” để làm rõ hơn chức năng mà nó cung cấp

## Android Studio / Tiện ích mở rộng IntelliJ

Flutter plugin cho dòng IDE IntelliJ cũng đã đạt được một số tính năng mới cho Flutter 2. Để bắt đầu, có một trình hướng dẫn dự án mới, phù hợp với giao diện IntelliJ.

![image.png](https://images.viblo.asia/8663f4b4-c619-4e29-b108-79218770cf4a.png)

![image.png](https://images.viblo.asia/c2c1418d-6c24-4e86-b59f-3042a8d94a37.png)

Ngoài ra, nếu bạn đang sử dụng IntelliJ hoặc Android Studio trên Linux để lập trình dựa trên Flutter SDK được cài đặt từ Snap Store, thì đường dẫn Flutter snap path đã được thêm vào danh sách các đường dẫn SDK đã biết. Điều này giúp người dùng Flutter snap dễ dàng hơn trong việc thiết lập Flutter SDK trong Cài đặt.

![image.png](https://images.viblo.asia/f46c0637-ae76-4735-9f37-fd229339337b.png)

## Mở rộng Visual Studio Code

Tiện ích mở rộng Flutter cho Visual Studio Code cũng đã được cải thiện cho Flutter 2, bắt đầu với một số cải tiến cho phần testing, bao gồm khả năng chạy lại các test failed.

![image.png](https://images.viblo.asia/66af582b-da87-42b0-b603-ee0aa72d6252.png)

Sau hai năm phát triển, hỗ trợ LSP (Language Server Protocol) cho Dart hiện đang được tung ra như mặc định để truy cập trình phân tích Dart để tích hợp vào Visual Studio Code cho tiện ích mở rộng Flutter. Hỗ trợ LSP cho phép một số cải tiến cho sự phát triển của Flutter, bao gồm khả năng áp dụng tất cả các bản sửa lỗi của một loại nhất định trong tệp Dart hiện tại và hoàn thành code để tạo ra các lệnh gọi hàm hoàn chỉnh, bao gồm dấu ngoặc đơn và các đối số bắt buộc.

![image.png](https://images.viblo.asia/8a955356-5240-421b-b887-35f859906131.png)

![image.png](https://images.viblo.asia/3e2f315f-c080-4031-8305-e49b580744db.png)

Và hỗ trợ LSP không chỉ dành cho Dart; nó cũng hỗ trợ hoàn thành code trong các tệp pubspec.yaml và analysis_options.yaml.

![image.png](https://images.viblo.asia/3e221fdd-2ff9-465c-9526-dbd5bcf2d88e.png)

## DartPad được cập nhật để hỗ trợ Flutter 2

Danh sách các bản cập nhật công cụ này sẽ không hoàn chỉnh nếu không đề cập đến DartPad, đã được cập nhật để hỗ trợ Flutter 2.

![image.png](https://images.viblo.asia/2363c94b-3e7f-4b61-b6ef-5cefcf06550b.png)

Giờ đây, bạn có thể dùng thử phiên bản Flutter null safe mới mà không cần rời khỏi trình duyệt yêu thích của mình.

## Cập nhật hệ sinh thái
Trải nghiệm phát triển Flutter bao gồm nhiều thứ hơn là framework và các công cụ; nó cũng bao gồm một loạt các packages và plugin có sẵn cho các ứng dụng Flutter. Kể từ bản phát hành ổn định Flutter cuối cùng, nhiều điều đã xảy ra trong không gian đó. Ví dụ: giữa máy ảnh và các plugin video_player, gần 30 PRs đã được hợp nhất để tăng đáng kể chất lượng của cả hai. Nếu trước đây bạn gặp khó khăn khi sử dụng một trong hai thứ này, bạn nên có cái nhìn khác;

Ngoài ra, nếu bạn là người dùng Firebase, đội ngũ Flutter thông báo rằng các plugin phổ biến nhất đã được nâng cao production quality, bao gồm hỗ trợ null safety và bộ tài liệu tham khảo đầy đủ và hướng dẫn sử dụng phổ biến cho Android, iOS, web, và macOS. Các plugin này bao gồm:

* Core
* Authentication
* Cloud Firestore
* Cloud Functions
* Cloud Messaging
* Cloud Storage
* Crashlytics

Ngoài ra, nếu bạn đang tìm kiếm báo cáo sự cố (crash report) cho ứng dụng của mình, bạn có thể xem xét thử Sentry, công ty đã công bố SDK mới cho ứng dụng Flutter.

![image.png](https://images.viblo.asia/750a6ec8-1c5e-4fcb-812a-85eed3efabbf.png)

Với Sentry’s SDK cho Flutter, bạn có thể được thông báo về các lỗi xảy ra trên Android, iOS hoặc native platforms trong real-time. Bạn có thể xem chi tiết trong tài liệu Sentry.

Ngoài ra, nếu bạn chưa biết các “plus” plugins của Cộng đồng Flutter, bạn sẽ muốn thử chúng. Họ đã chia nhỏ một số plugin phổ biến do nhóm Flutter phát triển ban đầu và đã bổ sung hỗ trợ  null safety, hỗ trợ cho các nền tảng bổ sung và một bộ tài liệu hoàn toàn mới cũng như bắt đầu khắc phục các sự cố đặc biệt từ kho lưu trữ flutter/plugins. Các plugin này bao gồm những thứ sau:

* Android Alarm+
* Android Intent+
* Battery+
* Connectivity+
* Device Info+
* Network Info+
* Package Info+
* Sensors+
* Share+

Tại thời điểm này, tập hợp các package và plugin tương thích với Flutter có số lượng lớn hơn 15.000, điều này khiến bạn khó tìm thấy những package và plugin mà bạn nên cân nhắc trước tiên. Vì lý do này, Flutter công bố Pub Points (điểm phân tích tĩnh), xếp hạng mức độ phổ biến, lượt thích và để có chất lượng đặc biệt cao, một chỉ định đặc biệt cho những package được đánh dấu như là Flutter Favorite. Đội ngũ Flutter 2 đã thêm một số packages mới vào danh sách yêu thích:

* animated_text_kit
* bottom_navy_bar
* chopper
* font_awesome_flutter
* flutter_local_notifications
* just_audio

Và cuối cùng nhưng chắc chắn không kém phần quan trọng, đối với các tác giả package hoặc người dùng package quan tâm đến việc phiên bản mới nhất của package có hoạt động trên phiên bản Flutter mới nhất hay không, bạn cần xem qua trang web pub.green mới của Codemagic.

![image.png](https://images.viblo.asia/b026334f-46c7-4258-b3d7-c45963d7218e.png)

Trang pub.green kiểm tra khả năng tương thích của các Flutter package và Dart package có trên pub.dev với các phiên bản Flutter khác nhau.

## Thay đổi quan trọng

Trong Flutter 2, nhiều thay đổi trong số đó có thể được giảm thiểu tự động bằng cách sử dụng lệnh sửa lỗi dart hoặc các bản sửa lỗi nhanh trong IDE mà bạn chọn:

* 61366 Continue the clipBehavior breaking change
* 66700 Default FittedBox’s clipBehavior to none
* 68905 Remove nullOk parameter from Cupertino color resolution APIs
* 69808 Remove nullOk from Scaffold.of and ScaffoldMessenger.of, create maybeOf for both
* 68910 Remove nullOk parameter from Router.of and make it return a non-nullable value
* 68911 Add maybeLocaleOf to Localizations
* 68736 Remove nullOK in Media.queryOf
* 68917 Remove nullOk parameter from Focus.of, FocusTraversalOrder.of, and FocusTraversalGroup.of
* 68921 Remove nullOk parameter from Shortcuts.of, Actions.find, and Actions.handler
* 68925 Remove nullOk parameter from AnimatedList.of and SliverAnimatedList.of
* 69620 Remove deprecated methods from BuildContex
* 70726 Remove the nullOk parameter from Navigator.of and add Navigator.maybeOft
* 72017 Remove deprecated CupertinoTextThemeData.brightness
* 72395 Remove deprecated [PointerEnterEvent, PointerExitEvent].fromHoverEvent
* 72532 Remove deprecated showDialog.child
* 72890 Remove deprecated Scaffold.resizeToAvoidBottomPadding
* 72893 Remove deprecated WidgetsBinding.[deferFirstFrameReport, allowFirstFrameReport]
* 72901 Remove deprecated StatefulElement.inheritFromElement
* 72903 Remove deprecated Element methods
* 73604 Remove deprecated CupertinoDialog
* 73745 Remove deprecated actionsForegroundColor from Cupertino[Sliver]NavigationBar
* 73746 Remove deprecated ButtonTheme.bar
* 73747 Remove span deprecations
* 73748 Remove deprecated RenderView.scheduleInitialFrame
* 73749 Remove deprecated Layer.findAll
* 75657 Remove vestigial nullOk parameter from Localizations.localeOf
* 74680 Remove nullOk from Actions.invoke, add Actions.maybeInvoke