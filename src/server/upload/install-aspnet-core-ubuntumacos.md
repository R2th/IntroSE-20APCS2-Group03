Như chúng ta đã biết, từ trước đến nay, mọi dịch vụ và ứng dụng của Microsoft thì hầu hết phải trả phí thì mới có thể sử dụng được và những dịch vụ đó thì chỉ có thể chạy được trên nền tảng Windows. Tuy nhiên vào tháng 6 năm 2016, Microsoft đã cho ra mắt ra bản framework ASP.NET Core 1.0 có thể xây dựng web app và hosting trên mọi nên tảng khác như Ubuntu, Max OS với VScode chứ không chỉ Windows. Phiên bản mới nhất hiện nay là ASP.NET Core 5.0 được phát hành vào tháng 11 năm 2020.
Nhân tiện trong quá trình tìm hiểu về C# và ASP.NET, mình sẽ viết một số bài giới thiệu về những công nghệ được sử dụng trong ASP.NET tới các bạn. Và bài viết đầu tiên chính là cách cài đặt ASP.NET Core trên môi trường Linux và MacOS.

# 1. Cài đặt ASP.NET Core trên hệ điều hành Ubuntu
Các phiên bản ASP.NET Core như 2.1, 3.1, 5.0 thì đều được hỗ trợ cài đặt được trên các phiên bản Ubuntu LTS như Ubuntu 16.04 LTS, Ubuntu 18.04 LTS, Ubuntu 20.04 LTS và Ubuntu 20.10.
Trong bài viết này, mình sẽ hướng dẫn các bạn cài đặt ASP.NET 5.0 trên Ubuntu 20.04.
- Thiết lập môi trường và các gói cần thiết của .netdev packet
`wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb`
`sudo dpkg -i packages-microsoft-prod.deb`
- Cài đặt .NET Core SDK:
`sudo apt-get update; \`
`sudo apt-get install -y apt-transport-https && \`
`sudo apt-get update && \`
`sudo apt-get install -y dotnet-sdk-5.0`
 Như vậy là bạn đã cài đặt thành công ASP.NET Core trên Ubuntu rồi đó :) Để kiểm tra lại cho chắc chắn thì bạn dùng câu lệnh `dotnet --version` để kiểm tra phiên bản nha.
 # 2. Cài đặt ASP.NET Core trên hệ điều hành MacOS
 Với hệ điều hành MacOS thì có vẻ việc cài đặt dễ dàng hơn, bạn chỉ cần gõ hai lệnh này thui nè:
 `brew update`
 `brew install --cask dotnet`
 Và để kiểm tra lại version của ASP.NET Core thì ta cũng sử dụng lệnh `dotnet --version`.
 # 3. Một số Extension thông dụng trên VScode 
Có nhiều Extension hỗ trợ cho việc lập trình ASP.NET Core, tuy nhiên đến thời điểm hiện tại thì có Extension C# (ms-vscode.csharp) là được dùng nhiều nhất và được khuyến cáo sử dụng. 
Extension C #  hữu ích  quá trình phát triển ứng dụng .NET Core. Nó mang lại nhiều tính năng mong đợi như Intellisense, highlight syntax, gỡ lỗi, debug, ... 
Ngoài ra cũng có những extension khác thường được sử dụng như Visual Studio Keymap, .NET Core Test Explorer, C# XML Documentation, .NET Core Tools, ....

Như vậy, trong bài viết này mình đã giới thiệu cho các bạn cách cài đặt ASP.NET trên các nền tảng khác Window. Đối với mình, mình cũng không thích code trên windows nên việc có thể lập trình ASP.NET trên Ubuntu thật là tuyệt vời :3

Nếu các bạn muốn tìm hiểu kĩ hơn về việc cài đặt các phiên bản .NET khác nhau trên các phiên bản khác nhau của các nền tảng khác nhau thì có thể tham khảo thêm tại link này nhé:
https://docs.microsoft.com/en-us/dotnet/fundamentals/

Hẹn gặp lại các bạn ở những bài viết tới về những công nghệ sử dụng trong ASP.NET nhe!