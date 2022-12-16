**.NET Core** ra đời từ 2016 và đến nay đã ra phiên bản 3. Hiện nay .NET Core cũng giành được sự ưu tiên so với .NET Framework – một nền tảng truyền thống đã ra đời từ 2001.

Trong thời gian gần đây xuất hiện rất nhiều thay đổi quan trọng đối với .NET Core, đặc biệt là .NET Core 3.0 (tháng 9/2019) và 3.1 (tháng 11/2019). Những sự thay đổi lớn này làm cho nhiều lập trình viên .NET bị rối. 

Nó càng dễ gây nhầm lẫn hơn cho những bạn chưa từng biết đến các công nghệ .NET và mong muốn theo học hướng công nghệ này. 

Trong bài viết này chúng tôi sẽ cố gắng giải thích theo cách đơn giản nhất sự liên quan giữa hai nền tảng .NET Core và .NET Framework cũng như xu hướng phát triển trong tương lai của các nền tảng này.

**.NET Framework – platform, framework, library .NET Framework là một nền tảng (Platform) + các framework + hệ thống thư viện (Library) do Microsoft phát triển từ 2001.**

Đừng để từ "Framework" trong tên gọi gây nhầm lẫn. .NET Framework thực sự bao trùm nhiều định nghĩa. 

Thứ nhất, .NET Framework là một nền tảng (platform) để thực thi ứng dụng. Chương trình bạn viết bằng bất kỳ ngôn ngữ lập trình .NET nào sẽ dịch sang mã trung gian (Intermediate Language) dù chương trình ở dạng thư viện dll hoặc tự thực thi exe. 

Khi chạy, mã IL sẽ được một trình biên dịch khác có tên gọi là Just-in-Time (JIT) compiler chuyển tiếp thành một dạng mã máy (machine instruction) và thực thi trong một môi trường khép kín do .NET quản lý. Mỗi trường thực thi này có tên gọi là Common Language Runtime. Cả quy trình code – dịch sang mã IL – dịch sang mã máy – thực thi như vậy được gọi là toolchain của .NET Framework. 

Thứ hai, .NET Framework tạo ra nhiều loại chương trình khung (framework) khác nhau giúp bạn nhanh chóng bổ sung những tính năng riêng để tạo thành chương trình hoàn chỉnh. .NET Framework đã tạo khung xương cho nhiều loại ứng dụng khác nhau, bao gồm ứng dụng web (ASEP.NET), ứng dụng desktop (như Windows Forms, Windows Presentation Foundation), ứng dụng hướng dịch vụ (Windows Communication Foundation). .NET Framework cung cấp hệ thống thư viện class khổng lồ chung mà tất cả các framework trên nó đều có thể sử dụng. 

Ngoài ra, với từng framework lại có hệ thống thư viện class hỗ trợ riêng. Đây chính là vai trò "thư viện" của .NET Framework. Trên thực tệ, hệ thống thư viện của .NET Framework còn ảnh hưởng đến tất cả các ngôn ngữ hỗ trợ. Ví dụ ngôn ngữ lập trình C# chỉ có hệ thống cú pháp chứ không có hệ thống kiểu dữ liệu và thư viện của riêng mình. Tất cả những thứ này trong C# đều đến từ .NET Framework. Các kiểu dữ liệu của C# (như int, bool, char, v.v.) đều là những biệt danh (alias) của các kiểu dữ liệu đến từ .NET Framework (Int32, Boolean, Char, v.v.). 

Dưới đây là minh họa toolchain của .NET Framework.

![](https://images.viblo.asia/c5fde1ee-da48-40a9-a8e8-c4a57ed5a462.png)


**.NET Core là một hệ thống độc lập với .NET Framework Khi bạn đã hiểu .NET Framework theo khía cạnh như trên, bạn sẽ cần hình dung tương tự về .NET Core. .NET Core cũng là một hệ thống trọn vẹn bao gồm nền tảng dịch mã trung gian và thực thi ứng dụng, các framework để phát triển các loại ứng dụng, và là hệ thống thư viện hỗ trợ. Hệ thống của .NET Core được xây dựng mới hoàn toàn và độc lập với .NET Framework.** 

Dưới đây là minh họa toolchaine của .NET Core.


![](https://images.viblo.asia/b2d610c1-625f-4e92-adde-34cb68b31ba0.png)


Về mặt ý tưởng nó có những điểm tương tự như trong .NET Framework. Tuy nhiên nó không liên quan đến .NET Framework. 

Thứ nhất, môi trường thực thi của .NET Core được gọi là CoreCLR. CoreCLR có thể chạy trên nhiều hệ điều hành. Hiện nay CoreCLR có thể hoạt động trên Windows, Linux và macOS. CoreCLR sử dụng một trình biên dịch trung gian tương tự JIT compiler của .NET Framework. Mặc dù tên gọi giống nhau nhưng JIT compilter của .NET Core không phải là JIT của .NET Framework. JIT của .NET Core có thể dịch mã IL sang mã máy của 3 nền tảng nó hỗ trợ. 

Một sự khác biệt nữa về runtime nằm ở chỗ, CoreCLR và mã máy được tải và kích hoạt bởi một tiến trình khác, dotnet.exe, trong khi CLR được kiểm soát bởi hệ điều hành Windows. Với vai trò framework, .NET Core cung cấp khung sườn cho phát triển ứng dụng web (ASP.NET Core), phát triển ứng dựng desktop trên windows (Windows Forms và WPF, từ .NET Core 3.1). Về tính năng này, .NET Core và .NET Framework gần như tương đương nhau. 

Với vai trò thư viện, .NET Core cũng cung cấp hệ thống class cho các ngôn ngữ nó hỗ trợ (hiện nay có C#, VB.NET và F#). Tuy nhiên ở đây cần nhấn mạnh rằng, 

Thứ nhất, hệ thống thư viện của .NET Core và .NET Framework là hoàn toàn độc lập nhau. Tuy nhiên chúng đều là các file chứa mã trung gian IL cho nên về lý thuyết chúng có thể sử dụng thư viện của nhau. Trên thực tế, bắt đầu từ .NET 2.0 bạn có thể tham chiếu tới các thư viện viết trên .NET Framework. Điều này giúp việc chuyển đổi sang .NET Core dễ dàng hơn. 

Tuy nhiên, việc tham chiếu này cũng có giới hạn. Thư viện xây dựng trên .NET Framework sẽ không chạy được trên .NET Core nếu nó phụ thuộc vào những API không được .NET Core hỗ trợ. Thứ hai, đội ngũ phát triển .NET Core sử dụng lại nguyên vẹn của các thư viện cơ bản của .NET Framework. Điều này giúp lập trình viên dễ dàng chuyển đổi từ .NET Framework sang .NET Core. 

Lấy ví dụ, cả trong .NET Framework và .NET Core đều có class Console (System.Console), trong đó đều có các phương thức như Write, WriteLine, Read, ReadLine. Do vậy, nếu bạn đã thành thạo C# (trên .NET Framework), bạn tiếp tục sử dụng nó trên .NET Core mà không cần học thêm gì về ngôn ngữ lập trình nữa. Nói chung, nếu bạn có thư viện ở dạng các POCO (Plain Olde C# Object) viết trên .NET Framework, bạn có thể dễ dàng tham chiếu tới và sử dụng nó trong project .NET Core.

**.NET Standard** – chia sẻ code giữa các nền tảng Đây là một tên gọi cũng như một "thể loại" gây nhiều nhầm lẫn và khó hiểu. Như trên đã nói, .NET Core và .NET Framework khá khó khăn khi chia sẻ thư viện. Microsoft đưa ra một giải pháp – .NET Standard. 

.NET Standard là một bộ đặc tả kỹ thuật (specification) về những API (tạm hiểu là những kiểu dữ liệu) chung mà tất cả các loại .NET phải thực thi. Nếu bạn hiểu và phân biệt khái niệm interface và implementation trong C# thì .NET Standard có thể xem như là một dạng interface, còn .NET Core hay .NET Framework là những implementation khác nhau. 

.NET Standard cho phép bạn viết các thư viện nhưng thư viện này khá đặc biệt: mã IL của nó không thực sự chứa code như các thư viện viết trên .NET Core hay .NET Framework! Khi bạn sử dụng thư viện trong project của .NET Core, các class thực sự của .NET Core mới được "ghép" vào. Tương tự, khi bạn sử dụng nó trong project của .NET Framework, các class cụ thể của .NET Framework sẽ được đưa vào.

Loại kỹ thuật này có tên gọi là type forwarding. Như vậy, hiện nay có hai implementation cụ thể của .NET chạy trên máy desktop là .NET Core và .NET Framework. Ngoài ra có Xamarin/Mono chạy trên Android và iOS. .NET Standard đóng vai trò là interface để thống nhất các thư viện mà các implementation cụ thể cần xây dựng. Qua đó giúp các nền tảng trên chia sẻ code với nhau.