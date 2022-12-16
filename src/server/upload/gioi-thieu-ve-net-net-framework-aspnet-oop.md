## 1 - Lập trình hướng đối tượng (OOP) là gì?
- **Tạo ra các đối tượng trong code trừu tượng hóa các đối tượng thực tế trong cuộc sống.** 
	+ Khi sử dụng OOP thì phải định nghĩa class để mô hình hóa các đối tượng thực tế (các đối tượng có thuộc tính, hành động tương tự nhau thì được gom lại thành 1 class đối tượng - Hiểu nôm na: class nó như là 1 khuôn mẫu thì đối tượng là 1 thực thể thể hiện dựa trên khuôn mẫu đó).
	+ Class định nghĩa đối tượng gồm các thuộc tính (thông tin, đặc điểm của đối tượng: Con người có thuộc tính - mắt, mũi, chân, tay..., Máy tính sẽ có các thuộc tính như: màu sắc, kích thước, bộ nhớ,...) và phương thức (Những thao tác, hành động mà đối tượng đó có thể thực hiện: Con người có hđ - ăn, nói, uống..., Máy tính có phương thức như: quét virus, tắt máy, khởi động máy,...) 
- **Các nguyên lý cơ bản trong OOP:** 
	+ **Tính đóng gói (Encapsulation):** Tính đóng gói có 2 ý chính:
		1. Các dữ liệu và các phương thức có liên quan đến nhau thì đc đóng gói thành các lớp để tiện cho việc quản lý và sử dụng (được thể hiện qua cách mà ta xây dựng 1 class).
		2. Là một là chắn bảo vệ để ngăn chặn biến hoặc phương thức được truy cập bởi code bên ngoài lá chắn này (tức là kiểm soát quyền truy cập (và thay đổi) giá trị của thuộc tính cũng như quyền gọi phương thức của đối tượng (hoặc lớp) và đối tượng (hoặc lớp) con).   
			**2.1.** Về mặt kỹ thuật trong đóng gói, các biến hoặc dữ liệu của class là bị ẩn đi từ bất kì lớp nào khác cũng như bên ngoài lớp, và chỉ có thể được truy cập thông qua các hàm thành viên của lớp.   
			**2.2.** Để đạt được tính đóng gói thì khai báo các biến bên trong class có phạm vi truy cập là private và viết các phương thức (methods - các methods này có phạm vi truy cập là: public/protected) trong class để set và get giá trị cho biến private đó.
            ![](https://images.viblo.asia/e488f701-9f2e-4e14-ba6e-da5d8c44a5fb.jpg)
	+ **Tính kế thừa (Inheritance):**
		Lớp con sử dụng các thuộc tính cũng như phương thức của class cha, ngoài ra có thể mở rộng các thành phần kế thừa và bổ sung thêm các thành phần mới.
	+ **Tính đa hình (Polymorphism):**
		Là một hành động có thể đc thực hiện bằng nhiều cách khác nhau hoặc đa hình là khái niệm mà hai hay nhiều class có những methods giống nhau nhưng lại thực thi khác nhau. Đây là 1 tính chất có thể nói là chứa đựng hầu hết sức mạnh của lập trình OOP. Ví dụ: Cùng một hành động là kêu nhưng còn mèo và còn gà lại kêu khác nhau.  
	+ **Tính trừu tượng (abstraction):**   
		1. Tổng quát hóa một cái gì đó lên, không cần chú ý đến chi tiết bên trong. (VD: Ta có 1 phương thức A xử lý 1 chức năng gì đấy thì không cần quan tâm chi tiết về xử lý đấy mà chỉ cần quan tâm mục đích của phương thức này là gì).   
		2. Trong OOP thì tính trừu tượng là chọn ra các thuộc tính, phương thức của đối tượng mà ta cần làm vc chứ ko phải chọn hết tất cả. Ví dụ: Bài toán quản lý sinh viên thì ta chỉ cần các thông tin như Tên, ngày sinh, mã sinh viên, quê quán... mà không cần các thông tin khác như: chiều cao, cân nặng, có người yêu chưa....
- **Tham khảo:**   
    https://codelearn.io/sharing/tat-tan-tat-ve-lap-trinh-huong-doi-tuong-phan-1   
    https://www.freecodecamp.org/news/object-oriented-programming-concepts-21bb035f7260/  
    https://www.guru99.com/java-data-abstraction.html
## 2 - Khái niệm .Net
- .Net là một nền tảng phát triển mã nguồn mở (open source), đa nền tảng (cross-platform), miễn phí để xây dựng nhiều loại ứng dụng khác nhau.  
- Với .Net thì các bạn có thể sử dụng các ngỗn ngữ .Net (như: C#, F#, or Visual Basic), editors(như: Visual studio, Visual Studio Code...), các thư viện để viết các ứng dụng .Net (như: web, mobile, desktop, games, và IoT...) và một số ứng dụng .Net là đa nền tảng, một số ứng dụng thì hoạt động trên 1 hệ điều hành hoặc 1 .NET implementations (Mình tạm dịch là .1 triển khai của .Net). Cụ thể: 
![](https://images.viblo.asia/18c8657a-4696-4e93-be8e-33e68bf14d9f.png)
- **Biên dịch và thực thi trong .Net:**  Các ứng dụng viết bằng ngôn ngữ được hỗ trợ bởi .Net sẽ được trình trình biên dịch tương ứng chuyển đổi thành ngôn ngữ trung gian (Đươc gọi là MSIL(Microsoft Intermediate Language) hoặc CIL(Common Intermediate Language) hoặc IL(Intermediate Language)) cùng với metadata của nó (Chứa các thông tin về class, method, các trường dữ liệu, thông tin runtime, etc. ) và chúng được lưu trữ trong file assembly (.dll hoặc .exe), khi chạy ứng dụng .Net thì CLR nó lấy assembly và sử dụng trình biên dịch JIT để chuyển đổi assembly đó (Tức là chuyển đổi CIL) thành mã máy và sau đó CPU trên máy của bạn sẽ thực thi mã máy đó. Hình dưới đây thì "Compile Time" là quá trình "built", "Run time" là quá trình chạy (Quá trình này bắt đầu từ khi bạn khởi động ứng dụng của mình). 
    ![](https://images.viblo.asia/37e15804-90c2-4964-b02e-acb2199b440d.jpg)  
    ![](https://images.viblo.asia/3d91517d-dd2a-4180-9ec0-809ef5e54555.jpg)   
     - **Common Language Runtime (CLR):** là thành phần máy ảo cũng như là một môi trường runtime(Môi trường hoạt động, đây là môi trường cung cấp các dịch vụ có sẵn để chạy chạy các chương trình .Net, môi trường runtime này cùng với Libraries (thư viện) và Toolings (công cụ phát triển) là khác nhau trong từng triển khai của .Net) trong .Net Frameword để chạy code và đồng thời cung cấp các dịch vụ khác nhau như quản lý luồng, type-safety, xử lý exception... giúp cho quá trình phát triển ứng dụng dễ dàng hơn (Hiểu cơ bản là nó sẽ chịu trách nhiệm quản lý việc thực thi các trương chình .Net ). 
     - **CLR** là triển khai (or CLR là một phiên bản) của Hệ thống thực thi ảo (Virtual Execution System (VES): VES có nhiệm vụ tải và thực thi các chương trình tương thích vs CLI, chú ý là các chương trình này sẽ được biên dịch sang MSIL trước khi đc thực thi rồi thằng VES nó mới chuyển MSIL này thành mã máy theo phần cứng và hệ điều hành cụ thể ) và VES này được định nghĩa trong  Common Language Infrastructure (CLI - là một tiêu chuẩn kĩ thuật do microsoft phát triển và nó là yêu cầu cho bất kì ngôn ngữ lập trình nào dùng để viết ứng dụng trên .Net Framework đều phải tuân theo, tham khảo chi tiết [ở đây!](https://vi.wikipedia.org/wiki/C%C6%A1_s%E1%BB%9F_ng%C3%B4n_ng%E1%BB%AF_d%C3%B9ng_chung))
      - Hình ảnh sau minh họa cách CLR được kết hợp hệ điều hành/phần cứng và các thư viện lớp trong quá trình thực thi các trương trình .Net.  
     ![](https://images.viblo.asia/7138ca9a-0083-4ee8-a7cd-9effc1ca6bb9.png) 
    - Tham khảo ở:   
        https://meherchilakalapudi.wordpress.com/2010/06/16/basic-knowledge-about-clr/    
        https://www.geeksforgeeks.org/common-language-runtime-clr-in-c-sharp/   
        https://stackoverflow.com/questions/480752/clr-and-cli-what-is-the-difference   
        https://en.wikipedia.org/wiki/Common_Language_Runtime   
        https://www.c-sharpcorner.com/UploadFile/f64127/What-is-cli-clr/ 
https://www.tma.vn/Hoi-dap/Cam-nang-nghe-nghiep/NET-core-vs-ASP-NET-core-Phan-biet-NET-Framework-NET-Core-va-Mono/16707

- Trong .Net có 1 cái mà chắc chắn ai cũng phải cần đó chính là: Nuget. Vậy Nuget là gì?  
    1. **Nuget** là trình quản lý package (package manager) được xây dựng riêng cho .Net. Package Manager này thì nó cung cấp 1 nền tảng cùng với các công cụ nào đấy để anh em có thể tạo, chia sẻ và sử dụng các packages có trên Package Manager. Và Nuget này thì nó có sẵn trên Visual Studio nếu bạn ko có thì bạn có thể [vào đây](https://docs.microsoft.com/en-us/nuget/) để cài đặt.
    [![](https://images.viblo.asia/d7878bbe-c459-43d7-b24f-e6e8c8842adf.png)](https://www.youtube.com/watch?v=WW3bO1lNDmo&t=31s)
    2. Các khái niệm khác liên quan (như framework là gì ...):  
        **2.1 - Libraries là gì?**       
        *2.1.1* - Thư viện là các đoạn mã được xây dựng sẵn cho 1 chức năng nào đó và bạn có thể tái sử dụng lại chức năng đó mà không phải code lại, ví dụ: jquery, underscore, lodash... Có nhiều tools để quản lý thư viện như: NPM, Composer, Bower ...  
        *2.1.2* - Ví dụ bạn tạo các hàm có thể tái sử dụng như này:  
        ``` javascript
        function getWords(str) {
           const words = str.split(' ');
           return words;
        }
        function createSentence(words) {
           const sentence = words.join(' ');
           return sentence;
        }
        ```
        Khi bạn tạo 2 hàm này có nghĩa là bạn đang tạo thư viện riêng cho mình rồi đấy!  
    
         **2.2 - Framework là gì?**  
         *2.2.1* - Framework là các đoạn code đã được viết sẵn, cấu thành 1 bộ khung và các thư viện lập trình được đóng gói trong framework (Hiểu cơ bản: Framework nó như cái khung nhà đã được làm móng, nền, trụ cơ bản và từ đó bạn có thể xây thêm, thêm màu sơn, thiết kế nội thất... tùy theo ý bạn mà không phải đào móng, làm nền, làm trụ từ đầu) .   
         *2.2.3* - Tính năng cốt lõi của Framework là giúp tăng hiệu suất khi phát triển app, mở rộng các chức năng và cung cấp các thư viện sẵn có để anh em lập trình không phải code từ đầu.Ví dụ các Framework để phát triển ứng dụng Mobile và các framework này có đặc điểm, khi anh em sử dụng nó để viết ứng dụng là "Viết một nơi, chạy muôn nơi" ( Cụ thể: ae viết code chạy trên android thì code đó cũng chạy trên IOS):  React Native, Flutter...   
    
        **2.3 - Platform là gì?**  
        Với Platform thì nó yêu cầu bạn phải tuân theo hoàn toàn mọi quy tắc mà nó đưa ra và không được làm khác đi (Một định nghĩa mở rộng hơn về platform: platform bao gồm cả phần cứng (máy tính hay laptop) và phần mềm (Hệ điều hành) mà các ứng dụng hay framework có thể hoạt động), Ví dụ: .Net là một platform vì để sử dụng đc .Net trên window thì bạn phải cài .Net framework hoặc .Net Core cho win, .NET Core trên linux và macOS , để viết các ứng dụng trên .Net thì các bạn phải dùng các ngôn ngữ mà .Net hỗ trợ như: C#, F#, Visual Basic.
        
        **2.4 - Tham khảo ở:**  
        https://dotnet.microsoft.com/learn/dotnet/what-is-dotnet
        https://www.freecodecamp.org/news/the-difference-between-a-framework-and-a-library-bd133054023f/   
        https://kipalog.com/posts/La-framework--hay-la-library   
        https://topdev.vn/blog/framework-la-gi/    
    
- Cross Platform (Đa nền tảng) trong .Net:  
    Để cho ứng dụng mà bạn viết bằng C#, F# hay Visual Basic chạy trên hệ điều hành mà bạn đang sử dụng thì bạn phải sử dụng 1 trong 3 triển khai của .Net (.Net implementations), cụ thể:  
    **1 -  .NET Core** là một triển khai .Net đa nền tảng (cross-platform ) cho các websites, servers, and console apps chạy trên Windows, Linux, and macOS.  
    **2 - .NET Framework** giúp  cho các websites, services, desktop apps... chạy trên Windows.  
    **3 - Xamarin/Mono** là một triển khai .Net để chạy các ứng dụng trên các hệ điều hành mobile như Android, IOS... 

### 2.1 - .NET Framework
   - .NET Framework có 2 thành phần chính đó là Common Language Runtime (CLR) và .NET Framework Class Library (FCL).    
    - **Class Library:** FCL là một tập hợp các class, namespace, interface và các kiểu dữ liệu (string, number...) được sử dụng để xây dựng nhiều chức năng và các loại ứng dụng khác nhau như ứng dụng web hay desktop... FCL này cũng được tích hợp với CLR của .NET Framework và được sử dụng bởi tất cả ngôn ngữ .NET như: C#, F#, Visual Basic .NET, etc. Ngoài ra nó cũng bao gồm các api cho việc đọc, viết file, kết nối databse, etc. BCL  (Base Class Library) là tập con (subnet) của FCL và cung cấp các chức năng cơ bản như:   
    ![](https://images.viblo.asia/c3088c83-ddfa-483c-8e73-7fc0840ad3af.jpg)
    ![](https://images.viblo.asia/14370d81-29c3-4cff-89aa-e2fb0a0e2e85.jpg)
    - Namespace trong FCL là một nhóm các class và interface liên quan có thể được sử dụng bởi tất cả ngôn ngữ .Net Framework (Đọc thêm về một vài namespaces ở [GeeksforGeeks](https://www.geeksforgeeks.org/net-framework-class-library-fcl/), [javapoint](https://www.javatpoint.com/net-framework-class-library), [Microsoft](https://docs.microsoft.com/en-us/dotnet/standard/class-library-overview#system-namespace))!   
    - Tham khảo:   
    https://www.geeksforgeeks.org/c-sharp-tutorial/?ref=leftbar-rightbar#polymorphism  
    https://stackoverflow.com/questions/807880/bcl-base-class-library-vs-fcl-framework-class-library  
    https://www.javatpoint.com/net-framework   
### 2.2 - .Net Core vs .NET Framework
1. **Sự khác nhau:** Mình liệt kê một vài sự khác nhau giữa .net core và .net framework, bạn có thể tham khảo chi tiết sự khác nhau giữa chúng ở [medium](https://medium.com/@mindfiresolutions.usa/difference-between-net-core-and-net-framework-c0588e734b99) và [stackoverflow!](https://stackoverflow.com/questions/38063837/whats-the-difference-between-net-core-net-framework-and-xamarin)  
![](https://images.viblo.asia/e333a29e-45cf-42dc-b55c-e4f11ca26433.jpg)
![](https://images.viblo.asia/6af0af12-3919-4d97-87fb-a482d397bbb1.jpg)
    - .Net Framework trợ giúp tạo Console app, các ứng dụng window và web. Cụ thể là bạn có thể sử dụng Windows Forms, WPF, and UWP để xây dựng các ứng dụng window, ASP.NET MVC để xây dựng các ứng dụng web chạy trên IIS trong .Net framework.
    - .Net Core được sử dụng để sây dựng console app đa nền tảng, xây dựng các ứng dụng web bằng asp.net core và cloud services, .Net core còn trợ giúp UWP (Universal Windows Platform (UWP): Giúp phát triển các ứng dụng kiểu Metro chạy trên cả window 10 và windown 10 mobile mà không cần phải viết lại ứng dụng cho mỗi nền tảng.)
    - .Net core là đa nền tảng, chạy đc trên window, linux, macos, còn .Net framework chỉ chạy trên win.
    - .Net core là mã nguồn mở nên được cộng đồng đóng góp phát triển, .Net framerword thì không.
    - Phần lớn những thay đổi trong .Net là xảy ra trên .Net Core 
    - .Net framework là tự động được cập nhật bởi window update, .Net Core thì cập nhật thủ công.
2. **Sử dụng .Net Core cho ở bên phía server khi:**
     - Ứng dụng của bạn (Web/service) cần chạy trên nhiều nền tảng như (Windows, Linux, and macOS).
     - Bạn đang sử dụng Docker containers.
     - Bạn cần một hệ thống có hiệu suất cao và có thể mở rộng.  
     - Bạn cần một ứng dụng sử dụng một phiên bản .Net thì dùng .Net Core ( Vì mỗi phiên bản .Net framework nó sẽ thay thế phiên bản trước đó).  
3. **Sử dụng .Net Framework cho ở bên phía server khi:**
     - Ứng dụng của bạn sử dụng thư viện của bên thứ ba hoặc NuGet packages không có sẵn trong .Net Core.  
     - App của bạn sử dụng các công nghệ .Net không có sẵn .Net Core.
     - App của bạn chạy trên nền tảng không trợ giúp .Net Core (Window, Linux, MacOs trợ giúp .Net Core).
4. **Tham khảo:**   
https://docs.microsoft.com/en-us/dotnet/standard/choosing-core-framework-server  
https://docs.microsoft.com/en-us/archive/msdn-magazine/2017/september/net-standard-demystifying-net-core-and-net-standard   
https://www.c-sharpcorner.com/article/difference-between-net-framework-and-net-core/   
https://vi.wikipedia.org/wiki/Universal_Windows_Platform   
### 2.3 - Asp.Net và Asp.net Core   
1. **Khái niệm Asp.Net:** 
    - Framework mã nguồn mở, được được sử dụng để tạo ra những trang web động, những ứng dụng web và dịch vụ web.  
    - Đa nền tảng: Các ứng dụng viết bằng Asp.Net có thể chạy trên Windows, Linux, macOS, and Docker.
    - Cho phép bạn xây dựng nhiều loại ứng dụng web, bao gồm: Web pages, REST APIs, microservices và real-time. 
    - Được biên dịch dưới dạng Common Language Runtime (CLR) nên bạn có thể viết Asp.Net bằng bất kì ngôn ngữ mà được .Net hỗ trợ như: C#, Visual Basic.Net, Jscript...    
![](https://images.viblo.asia/55b0d197-c7df-41e2-a112-1048ccd3637f.jpg)
    - Asp.Net Core là mã nguồn mở, đa nền tảng đồng thời nó là phiên bản nâng cao của Asp.Net (Trước khi Asp.Net Core ra đời (phát hành năm 2016) thì các phiên bản Asp.Net (phát hành năm 2002 cùng với .Net Framework) chỉ dành cho window và thường được gọi là Asp.Net)
2. **Asp.Net mở rộng .Net**  
     Asp.Net mở rộng nền tảng .Net là thêm các tools và các thư viện dành riêng cho việc xây dựng web. (Cú pháp tạo template cho trang web: Razor, Thư viện cho các mẫu web phổ biến: MVC, syntax highlighting....)
3. **Tạo các trang web động bằng C#, HTML, CSS, và JavaScript.**
    - Razor cung cấp cú pháp cho việc tạo các trang web động sử dụng HTMl vs C# (Code ở phía server thì ta dùng C# để viết và phía server trả về HTML cho client.)
    - Asp.Net được tích hợp với các JavaScript frameworks, đồng thời gộp các templates đã đc cấu hình trước cho các framework SPA (single page app - hiểu nôm na thì các framework khi sử dụng thì ta ko phải load lại trang nhiều lần mỗi khi request đến server) như React và Angular.
4. **Mô hình lập trình (Programming models):** Asp.Net hỗ trợ một số Model lập trình cho việc xây dựng các ứng dụng web:  
    - ASP.NET Web Forms: Xây dựng các trang web động bằng cách sử dụng model hướng sự kiện drag-and-drop(kéo và thả).
    - ASP.NET MVC: Xây dựng các trang web theo Design pattern: MVC
    - ASP.NET Web Pages – Là một Framework để tạo các trang web động( Tức là sử dụng lightweight syntax (Cú pháp nhẹ - Razor) để  thêm code lấy và xử lý dữ liệu hiển thị ngay trong HTML). 
    - ASP.NET Single Page Applications. 
 5. **Tham khảo:**  
 https://dotnet.microsoft.com/learn/aspnet/what-is-aspnet   
 https://www.tutorialspoint.com/asp.net/asp.net_introduction.htm   
 https://en.wikipedia.org/wiki/ASP.NET   
 https://www.slideshare.net/rishikothari/developing-an-aspnet-web-application
 ## 3. Góp ý
 Cảm ơn bạn đã đọc bài của mình, bài viết của mình có sai sót ở đâu, hiểu sai hay ntn thì mong các bạn góp ý để mình hoàn thiện thêm sao cho chuẩn nhất nhé, thank you!