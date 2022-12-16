## Thiết lập Cocos2D-x

Để bắt đầu với Cocos2d-x, bạn cần cài đặt một vài thứ, tùy thuộc vào nền tảng bạn đang sử dụng/phát triển.

Điều đầu tiên và cũng là cần thiết nhất - một trình biên dịch C++. Nếu bạn đang làm việc trên Windows, Visual Studio 2015 hiện là phiên bản được đề xuất. Bạn có thể tải xuống phiên bản miễn phí có tên Visual Studio Express cho hệ điều hành Windows. Bạn cũng có thể sử dụng các phiên bản cũ hơn của Visual Studio như Visual Studio 2010 (hoặc phiên bản mới nhất), nhưng series này sẽ sử dụng Visual Studio 2015.

Trên Mac OS, tôi khuyến nghị Xcode. Nó cũng miễn phí, và chúng ta chỉ cần như vậy. Cá nhân tôi không phải là big fan của Xcode nên tôi sử dụng AppCode để phát triển trên Mac, nhưng nó không phải là một phần mềm miễn phí. Vì vậy hình ảnh sử dụng trong bài này sẽ khác đôi chút với những gì bạn làm, nhưng đừng lo, chỉ là giao diện thôi mà.

Thứ 2, là Python. "Ủa tại sao tôi nghe đồn là Cocos chỉ dùng C++ hay JS thôi mà?" Cá là bạn đang hỏi vậy. Đừng lo lắng, Python không được sử dụng để code trong Cocos2d-x, nhưng một số công cụ khác yêu cầu nó, bao gồm cả công cụ bạn sử dụng để tạo và chạy project, vì vậy rõ ràng cài đặt nó khá quan trọng. Một lưu ý quan trọng, vì độ quan trọng của nó nên tôi sẽ in đậm nó lên, hãy tưởng tượng là tôi đang hét vào mặt bạn đi. **BẠN CẦN CÀI ĐẶT PYTHON 2.7x!** Phiên bản mới nhất, Python 3.x không hoạt động và bạn sẽ mắc trong một đống errors nếu sử dụng nó. Vì vậy, hãy sử dụng [Python 2.7x](https://www.python.org/downloads/). Trên Windows, bạn cần phải thêm Python được vào biến môi trường PATH. Nếu không biết cách làm, bạn có thể xem hướng dẫn [tại đây](https://superuser.com/questions/143119/how-do-i-add-python-to-the-windows-path).

Cuối cùng, nếu bạn đang có ý định làm game cho Android, bạn cần cài đặt thêm [SDK Android](https://developer.android.com/sdk/index.html), [ANT](https://ant.apache.org/) và [Android NDK](https://developer.android.com/ndk). Bạn cần ít nhất NDK 9 trở lên để làm việc với Cocos2d-x. Bây giờ sẽ có chút phức tạp ở đây, nếu bạn dùng Windows, Android NDK yêu cầu cài đặt [Cygwin 1.7 ](https://www.cygwin.com/)trở lên (Cygwin cài dễ lắm, chỉ cần next thôi). Khi tải xuống SDK Android, không tải xuống gói ADT mà thay vào đó hãy cuộn xuống dưới trang và cài đặt bằng cách nhấn vào dòng link “Get the SDK for an existing IDE” . Là một FYI, SDK có đủ các công cụ cần thiết cho phát triển Android, NDK là chuỗi công cụ C ++ để phát triển Android, trong khi Ant là một hệ thống xây dựng Java.

À và tất nhiên bạn cần phải tải [cocos2d-x](https://cocos2d-x.org/download)! Đơn giản chỉ cần tải xuống và giải nén ra đặt ở đâu đó trên ổ đĩa là được rồi, chẳng cần phải cài đặt gì luôn.

## Tạo một Cocos2d-x project

OK vậy là xong phần cài đặt và cấu hình, mọi thứ đã sẵn sàng, bắt đầu tạo một project mới thôi. Mở command prompt hoặc terminal và đổi đường dẫn đến thư mục mà bạn giải nén cocos2dx (sử dụng `cd <đường dẫn>`)

Bắt đầu nhập các lệnh sau:

**Trên MAC OS**

`./setup.py`

`source ~/.profile`

`cocos new -l cpp -p com.gamename -d D:\path\to\game\here gamename`

**Trên Windows**

`python setup.py`

Nếu bạn gặp lỗi không thể tìm thấy Python, thì bạn cần xem lại xem PATH đã đúng hay chưa. Tùy thuộc vào việc bạn có cài đặt đầy đủ các biến môi trường ở trên hay không, việc cài đặt có thể yêu cầu bạn cung cấp thư mục cài đặt của Android NDK, SDK cũng như Ant. 

Bước tiếp theo phụ thuộc vào phiên bản Windows của bạn. Nếu bạn đang chạy Windows XP (và có thể cả Vista), bây bạn cần khởi động lại máy tính để các thay đổi có hiệu lực (mà chắc chẳng còn ai xài đâu). Nếu bạn đang chạy Windows 7, 8 hoặc 10, chỉ cần tắt và mở lại command prompt là được.

Sau đó thì nhập:

`cocos new -l cpp -p com.gamename -d D:\path\to\game\here gamename`

Công cụ để tạo các projects cocos được cung cấp bởi cocos, và nó nằm trong cocosfolder/tools/cocos2d-console/bin. -l (hoặc -L ) là nơi bạn chỉ định ngôn ngữ cho dự án bạn muốn tạo, ở đây là cpp. -p là để chỉ định gói, chủ yếu dành cho Android, nó giống như một dạng tên miền đảo ngược theo tiêu chuẩn Java. Nếu bạn không có một trang web thì bạn có thể bịa đại một cái gì đó cũng được. Tham số -d là thư mục mà bạn muốn tạo project.

Sau một khoảng thời gian chờ setup thì bây giờ project của chúng ta đã được tạo ra (hy vọng vậy), hãy xem chúng ta có gì nào

![](https://images.viblo.asia/9c8989a7-35c6-4d97-b539-cf26f2272868.png)

Ở đây bạn có thể thấy nó đã tự động tạo ra rất nhiều thư mục cho bạn, chúng ta sẽ xem xét kỹ hơn từng thư mục.

Mỗi thư mục có tiền tố proj. là nơi chứa các file dự án và mã nguồn của nền tảng, có thể là android, iOS và Mac, linux hoặc Windows. Thư mục cocos2d là nơi bản thân SDK cocos được sao chép. Đây là bản sao hoàn chỉnh của Cocos2d, bao gồm tài liệu, thư viện, tiêu đề, v.v. Thư mục này có kích thước tới 250MB và sẽ được tạo ra mỗi lần bạn tạo project cocos2D mới!

Thư mục Resources là kho lưu trữ chung cho tất cả các tài nguyên khác nhau mà trò chơi của bạn sẽ sử dụng, như đồ họa, âm thanh, v.v. Thư mục Classes là thư mục quan trọng nhất trong tất cả, đây là nơi chứa code của chúng ta. Bên trong thư mục đó sẽ giống như này:

![](https://images.viblo.asia/f5dfc0b1-3290-456e-878a-3d4caec6edd2.png)

Các tệp có sẵn này đã đủ để tạo ra một ứng dụng đơn giản mà cocos tạo sẵn để hỗ trợ cho chúng ta (mặc dù cuối cùng thì chúng ta cũng phá banh nó thôi). AppDelegate là một đối tượng hỗ trợ đi cùng với cửa sổ chính và xử lý các sự kiện phổ biến cho ứng dụng như khởi động, thu nhỏ hoặc đóng. Phần này không có gì để chú ý nhiều, chúng ta sẽ chuyển qua xem phần code chính để bạn thấy đỡ buồn ngủ hơn một chút.

Bây giờ, hãy cùng xem các phần cụ thể của nền tảng mà cocos tạo ra cho cả win32 và ios_mac.

**win32:**

![](https://images.viblo.asia/f5368ce9-fd2e-4293-a931-3d4b31c18517.png)

**ios_mac:**

![](https://images.viblo.asia/8441f206-cc34-4b7d-b03e-056bac74d00d.png)

Như bạn có thể thấy, mỗi thư mục chứa tất cả các code, tài nguyên cụ thể của nền tảng và quan trọng nhất là các file project cho mỗi nền tảng khác nhau. Trong trường hợp của ios_mac, đặc biệt hơn một chút, nó tiếp tục chứa các thư mục cụ thể của nền tảng cho từng nền tảng.

Tất cả các nền tảng có những file thiết yếu riêng (main, WinMain, v.v.) và có các cách khác nhau để xử lý những thứ khác nhau. Hầu hết điều này chỉ liên quan đến khởi động và cocos2d-x sẽ lo việc này cho bạn. Tuy nhiên, trong tương lai gần, bạn có thể cần thêm một vài code cụ thể của nền tảng, chẳng hạn như chỉ có một vài ad network hoạt động trên iOS. Đây là nơi bạn sẽ thêm những đoạn code đó. Điều đó có nghĩa là, 99% logic của game chúng ta sẽ được đặt trong thư mục Classes. Với việc hỗ trợ đa nền tảng, bạn có thể chỉ cần code trong một nền tảng, sau đó mở các tệp của project ở thư mục của nền tảng khác và chạy, game của bạn vẫn sẽ hoạt động bình thường. Đây là cách bạn có thể xử lý nhiều nền tảng với một lần code duy nhất bằng cocos2d-x.

### Getting Started — MacOS/XCode

Để bắt đầu code trên MacOS, nhấp đúp vào .xcodeproj trong thư mục proj.ios_mac. Nó sẽ tự động mở Xcode cho bạn. Bây giờ ở thanh trên cùng, bạn sẽ có thể chọn project nào bạn muốn, iOS hoặc Mac. Vì iOS yêu cầu trình giả lập hoặc thiết bị để thực thi, nên tôi khuyến nghị bạn nên bắt đầu với Mac project.

![](https://images.viblo.asia/4d0f4bfc-cc6d-4efc-957c-b395ba7e7244.png)

### Getting Started — Windows/Visual Studio

Để bắt đầu code trên Windows, nhấp đúp vào tệp .sln trong thư mục proj.win32. Nó sẽ tự động mở Visual Studio cho bạn. Sau đó chỉ cần nhấn Local Windows Debugger để bắt đầu quá trình biên dịch:

![](https://images.viblo.asia/4eb1a66d-bd06-466e-8fe1-a5ce1d48e6d7.png)

Lần đầu biên dịch có thể sẽ hơi lâu nhưng những lần sau sẽ nhanh hơn rất nhiều, kiên nhẫn một xí và Bùm!!! Bạn đã có một game mặc định đầu tiên:

![](https://images.viblo.asia/df00f4a6-9887-4a97-9e0f-58057bf3cb40.png)

Với một vài bước đơn giản, bạn đã xây dựng thành công một game "Hello Word" trên cocos2dx rồi đó. Làm game quá dễ đúng không nào? 

Trên đây tôi đã hướng dẫn các bạn cài đặt, cấu hình và tạo ra một project đầu tiên với Cocos2dx. Trong phần tiếp theo, chúng ta sẽ cùng "mổ xẻ" project này và làm sao để tùy biến nó thành một game của riêng chúng ta, chờ tháng sau nhé, cảm ơn các bạn đã theo dõi.


### Tài liệu tham khảo
https://socs.binus.ac.id/2015/08/20/making-simple-2d-game-using-cocos2d-x/

https://www.gamefromscratch.com/page/cocos2d-x-CPP-Game-Programming-Tutorial-Series.aspx

https://docs.cocos2d-x.org/cocos2d-x/v3/en/basic_concepts/