# Giới thiệu
Đã bao giờ các bạn tự hỏi khi bạn chạy câu lệnh "**npm install**" (NodeJS) hay là "**Install-package**" (.NET) thì  package đó được lấy từ đâu không? Hẳn là nó được lấy được từ server [npm](https://www.npmjs.com/) hay [nuget](https://www.nuget.org/) rồi phải không. 
Trong các dự án product thì việc xây dựng package server là cần thiết để chúng ta có thể build những package riêng của công ty, chỉ nội bộ công ty được access thôi. Hoặc việc xây dựng một package server riêng ở local cũng hay chứ nhỉ.
Vừa rồi thì mình đã thử dùng [ProGet](https://inedo.com/proget/download) để tạo 1 package server riêng ở local. Thực sự là bất ngờ là chỉ cần install là đã dùng được ngay, phần mềm thời nay xịn vãi :D
Ngoài ProGet thì còn có các tool khác như [Chocolatey](https://chocolatey.org/), [Bower](https://bower.io/).
# ProGet
## Giới thiệu
> ProGet helps you package applications and components so you can ensure your software is built only once, and then deployed consistently across environments. This means everyone can be certain that what goes to production is exactly what was built and tested.

ProGet giúp bạn đóng gói application và component, và đảm bảo phần mềm của bạn được build 1 lần, và deploy lên mọi nơi. Có nghĩa là chúng ta chắc chắn package được cài trên production chính là package đã được build và test.
## Xây dựng server với ProGet
Tải proget tại https://inedo.com/proget/download 
Hiện tại bạn có thể cài trên windows hoặc nếu không có windows thì bạn có thể xài docker. Mình dùng windows nên cài windows cho nó lẹ. 

Database ProGet dùng là SQL Server nên bạn phải cài đặt SQL Server trước. Download tại đây nếu bạn chưa có https://www.microsoft.com/en-us/sql-server/sql-server-downloads
Lưu ý bạn cần connectionString để kết nối tới SQL Server
```
Data Source=.;Initial Catalog=ProGet;Persist Security Info=True;User ID=sa;Password=yourpassword
```

Sau đó thì next next đơn giản thì nó đã build xong cho bạn từ A tới Z cmnr. 
Cuối cùng thì ProGet đã cài đặt luôn cho bạn Server local, với URL kiểu localhost:1234
Đăng nhập vào ProGet bằng user Admin/Admin mà ProGet đã tạo sẵn cho bạn.

## Khám phá
### Feed: https://docs.inedo.com/docs/proget/core-concepts/feeds
> Think of a feed like a private 'app store', but for your own applications and components. Users can easily see what's available and download desired packages, and old and unused packages can be automatically cleaned.


Về cơ bản thì feed giống như một cái 'app store' và chứa đựng các package của bạn trong này. Bạn có thể thấy hình dưới mình có 4 package trong feed này. Kiểu như trong app store của mình có 4 app vậy.

![](https://images.viblo.asia/d5f6e6fe-aee6-47c1-a09f-b1bc25999dc6.png)

### Package: https://docs.inedo.com/docs/proget/core-concepts/packages
> Think of a package like a uniform-sized shipping box with uniform, machine- and human-readable labels describing the package. Inside the box are the things you want to deliver, and the box may even include assembly, installation, delivery or other instructions on what to do with the contents.


Một package giống như một cái hộp mà chứa đựng tất cả mọi thứ như nội dung, mô tả package đó. Nói chung nó là thứ mà bạn muốn cài đặt, có đầy đủ hướng dẫn sử dụng.

![](https://images.viblo.asia/93c22efc-f0c8-4b2a-914b-f3f226d17418.png)

Để tạo một package thì bạn chỉ cần click button "Create Package" rồi update file lên thôi. Ví dụ bạn tạo 1 nuget package thì chỉ cần update file .nupkg, npm thì mình chưa thử :v: 

Giao diện chi tiết của trang package như sau, có đầy đủ mô tả cho package, liệt kê tất cả version của package, có lệnh để bạn chỉ cần copy cái là install package luôn. Quá ư là dễ dàng. 
![](https://images.viblo.asia/4621f4d7-b8e4-45ea-96c1-8f8cbd8e980a.png)

Ngoài ra thì còn có các phần như Asset (là một folder của các file như trên S3), Container (như docker registry, quản lý các docker ). 

# Kết 
Nói chung là cái ProGet này khá hay nên mình muốn viết lại bài để nhớ và chia sẻ cho mọi người đều biết. Cảm ơn các bạn đã đọc bài.