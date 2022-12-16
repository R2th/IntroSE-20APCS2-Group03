Dựa trên nền tảng ASP.NET, ASP.NET MVC là một framework được phát triển bởi Microsoft, cho phép chúng ta xây dựng ứng dụng web theo mô hình MVC: (Model, View và Controller). 
Sau đây, mình sẽ hướng dẫn các bạn cách tạo một website ASP.NET MVC đơn giản bằng Visual Studio 2019 nhé.


# 1. Tạo một project ASP.NET bằng Visual Studio 2019
Đầu tiên, sau khi mở VS 2019, chọn **File** -> **New** -> **Project**, một cửa sổ New Project sẽ hiện lên. Trong cửa sổ này, bạn tìm kiếm và chọn **ASP.NET core Web App (Model-View-Controller)** với ngôn ngữ là C#.
![](https://images.viblo.asia/5600e111-2834-46bf-b953-734a6d54f8ab.PNG)

Sau đó bạn chọn Next và đặt tên cho ứng dụng web của mình. Ở đây, mình đặt tên ứng dụng của mình là "*My book*".
![](https://images.viblo.asia/4c012de2-160d-4dee-b782-ffcc3cb94f30.PNG)


Tiếp tục chọn Next và chuyển tới cửa sổ lựa chọn phiên bản. Các bạn có thể lựa chọn các phiên bản *.NET core 2.1*,* .NET core 3.1* hay *.NET core 5.0* và một số tùy chọn khác tùy theo phiên bản .NET mà bạn đã chọn.
![](https://images.viblo.asia/e6efc779-bf0f-40a6-9402-6f5b8a85b48b.PNG)

Sau đó, bạn chọn Create để tạo web app. Visual Studio sẽ tự động tạo một template mặc định cho ứng dụng ASP.NET MVC bạn vừa tạo ra.
Trong ứng dụng mặc định đa được tạo,  có 2 trang chính Home và Privacy nằm thanh menu.

Để có thể xem được cấu trúc thư mục web bằng cách mở **Solution Explorer** (**View** -> **Solution Explorer** hoặc phím tắt **Ctrl + Alt + L**).
![](https://images.viblo.asia/0666917a-461a-4d96-9f65-feba178c4b77.PNG)

# 2. Cấu trúc Solution Explorer 
Mọi Solution chứa 3 folder chính là *Dependencies*, *Properties* và* wwwroot*
## 2.1. Thư mục *Properties*
Thư mục Properties chứa file *launchSettings.json*. File này chứa tất cả thông tin cài đặt để ứng dụng có thể chạy được bao gồm các profile debug và các biến môi trường. 
Tuy nhiên, file này chỉ sử dụng cho môi trường phát triển local, khi publish lên server thì file này không cần thiết. Lúc đó mọi thiết lập sẽ được cài đặt trong file *appSettings.json*.
## 2.2. Thư mục *wwwroot*
Các file tĩnh như HTML, CSS, Javascript hay hình ảnh hoặc các thư mục con của nó sẽ được lưu trư trong thư mục *wwwroot* 

Thư mục *wwwroot* được coi như thư mục root của website. Url của các thành phần trong thư mục root sẽ được đặt ngay sau domain. Ví dụ, domain của mình là `http://cress1004.com/` và trong thư mục *wwwroot* của mình có file *image.png* thì đường dẫn của file sau khi publish sẽ là `http://cress1004.com/image.png`.

Toàn bộ code như C#, Razor file nên đặt ngoài thư mục này. Nếu muốn dùng tính năng này chúng ta cần sử dụng tính năng StaticFiles trong ASP.NET Core mà chúng ta sẽ tìm hiểu sau.

## 2.3. Dependencies
Trong thư mục Dependencies, chúng ta có thư mục Nuget chứa các Nuget Packages đang sử dụng. Visual Studio sử dụng Nuget Packages để quản lý tất cả các dependencies phía server. 
Có 3 cách để tải Nuget Package vào project:
* Chỉnh sửa thẳng file .csproj
*  Sử dụng Nuget Package Manager
* Qua lệnh Package Manager Console

## 2.4. Các file trong hệ thống
 Ngoài ra, ta còn có 3 hệ thống file rất quan trọng là *Program.cs* và *Startup.cs*, *appSettings.json*.

## 2.5. MVC 
Ở đây, chúng ta vừa tạo ra một ASP.NET MVC project nên sẽ có thêm 3 folder Controllers, Models và Views.
Controllers: Chứa các controller.
Models: Chứa các file tương tác với CSDL.
Views: Thư mục chứa các file HTML với đuôi là .cshtml.
### Các file HTML trong ASP.NET MVC
Các file này còn được gọi là Razor file. Controller trong MVC gọi View bằng cách gán dữ liệu để tạo giao diện. View phải có khả năng xử lý dữ liệu và tạo response. Điều này được xử lý bằng cách dùng Razor, nó cho chúng ta sử dụng C# code trong file HTML.Các file chứa Razor có đuôi .cshtml. Cú pháp Razor thường ngắn hơn và đơn giản hơn cũng dễ học như C#.
Sau này, mình sẽ có 1 bài viết cũ thể hơn về Razor View Engine. 

Như vậy, mình đã giới thiệu sơ qua về cách tạo một project ASP.NET bằng Visual Studio 2019. Ở bài viết tới, mình sẽ ứng dụng mô hình MVC để tạo một trang web đơn giản.

Từ năm 2016 ASP.NET đã trở thành một phần mềm mã nguồn mở và có thể xây dựng web app và hosting trên mọi nên tảng khác như Ubuntu, Max OS với VScode chứ không chỉ Windows.
Các bạn có thể tham khảo cách cài đặt ASP.NET core trên các nền tảng khác như Ubuntu, MacOS **[tại đây](https://viblo.asia/p/install-aspnet-core-ubuntumacos-aWj53BY1l6m)**.