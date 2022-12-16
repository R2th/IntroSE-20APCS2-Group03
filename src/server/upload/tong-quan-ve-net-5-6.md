### 1. .NET Framework là gì?

- .Net Framework là một framework được phát hành bởi Microsoft vào năm 2001 để xây dựng ứng dụng trên **nền tảng Window**.
- Có thể xây dựng ứng dụng website, winform, webform, web service, wpf bằng .Net Framework.
- Version hiện tại của .net framework là .NET Framework 4.8 và microsoft hiện chưa có plan để ra phiên bản mới (4.9).
- .NET Framework là mã nguồn đóng (không được microsoft public source code ra bên ngoài)


### 2. .NET Core là gì?

- .NET core là một framework được phát hành bởi Microsoft vào năm 2016 để xây dựng ứng dụng trên đa nền tảng (window, linux và macOS).
- Có thể xây dựng ứng dụng Desktop (WPF, Winform), website, mobile, game, IOT và cả AI.
- Các phiên bản của .NET Core: (từ .net 5 (2020) microsoft đã bỏ chữ core và gọi chung là .NET), khuyến khích dùng các phiên bản LTS (Long term support) được MS hỗ trợ lâu dài.
![image.png](https://images.viblo.asia/81ee0ec0-e37f-49d2-8dc1-ec3908f2ea14.png)
- .NET core là mã nguồn mở (open source) và source code được public trên github, các lập trình viên có thể vào để đóng góp phát triển giúp mã nguồn tốt hơn.
![image.png](https://images.viblo.asia/afe3948f-7f69-4d6c-9c52-09b5b7bd1935.png)


### 3.Ưu điểm .NET core (.NET 5, 6) so với .Net Framework

- .NET Core hỗ trợ xây dựng ứng dụng đa nền tảng (window, linux, MacOS), .NET Framework chỉ hỗ trợ trên window.
- .NET Core ra đời sau nên Microsoft ra đời các phiên bản mới liên tục, cập nhật theo từng năm (tương lai), .NET Framework ra đời lâu và Microsoft ngừng cập nhật phiên bản(lớn) mới.
- .NET Core có nhanh và nhẹ hơn .NET Framework
- .NET Core không cần tải toàn bộ framework, chỉ cần cài bộ SDK và khi cần package nào thfi tải xuống nên nhẹ hơn. .NET Framework phải cài toàn bộ framework đầy đủ thư viện lên window nên rất nặng.
- .NET Core là mã nguồn mở nên các nhà phát triển (developers) có thể đóng góp để gúp mã nguồn tốt hơn.

### 4. Cài đặt .NET 6

- .NET 6 ra đời năm 2021 và được đánh dấu là LTS (Long Term Support)

- Download SDK 6.0 : https://dotnet.microsoft.com/en-us/download/dotnet/6.0
(SDK - Software development kit: bộ công cụ phát triển)

- Download Visual Studio 2022 community (free)
https://visualstudio.microsoft.com/downloads/

- Hoặc sử dụng visual studio code (link hướng dẫn): https://www.c-sharpcorner.com/article/how-to-setup-visual-studio-code-for-c-sharp-10-and-net-6-0/

### 5. Tạo và chạy ứng dụng đầu tiên với .NET 6
![image.png](https://images.viblo.asia/d3d9298d-fb73-4567-8250-f467f7e6abaa.png)

- Ứng dụng web
![image.png](https://images.viblo.asia/be9c15b3-8a06-4667-bce1-331f9c459bb0.png)
![image.png](https://images.viblo.asia/5c4bbc5e-9a6e-4a2a-a4bf-ec1d0b25ca2d.png)
![image.png](https://images.viblo.asia/c2ead1d5-ee82-4c19-8497-75d1927b49a2.png)
![image.png](https://images.viblo.asia/f413e06e-5665-4714-b2d7-963aab37b4d5.png)

- Chạy ứng dụng
![image.png](https://images.viblo.asia/cfd9bbff-8e33-4f79-9942-9a5e2fb6e7c2.png)

### 6. Các thành phần trong ứng dựng web với .NET 6

![image.png](https://images.viblo.asia/c6c26e6b-79d2-496a-8560-a6b86a6d9594.png)

- Ví dụ với launchSettings.json ta có thể config aplicationurl hoặc thêm các profiles theo từng môi trường (development, staging, production)
![image.png](https://images.viblo.asia/fc16bd27-c421-4554-821f-7c34336b609e.png)

- Program.cs file chính chạy chương trình khi run ứng dụng. Chứa khai báo các service, config, middleware...

![image.png](https://images.viblo.asia/b649b949-ee5b-4db2-9d57-86db71ad5b99.png)

(app.run chạy app)

**Note:** Ở phần này chỉ là tổng quan nên sẽ không giải thích chi tiết về biến môi trường, middleware, razor page hay các khái niệm chi tiết khác...


### 7. Razor pages

- Razor là một thành phần trong .NET nó giúp cho phép ta xây dựng giao diện dễ dàng bằng cách sử dụng code c# trong file HTML. 
- Các file Razor có chứa đuôi .cshtml (gồm code c# và html)
- Razor engine sẽ giúp biến các file razor thành file html và trình duyệt có thể hiểu được.
- Để sử dụng razor page ta thêm cấu hình
![image.png](https://images.viblo.asia/3efaef54-a7d5-441d-a657-4bbb7c8a9ac3.png)


Tham khảo cách sử dụng razor page: https://learn.microsoft.com/vi-vn/aspnet/core/tutorials/razor-pages/model?view=aspnetcore-6.0&tabs=visual-studio





**Tham khảo**
- https://learn.microsoft.com/en-us/archive/msdn-magazine/2019/july/csharp-net-reunified-microsoft%E2%80%99s-plans-for-net-5
- https://www.c-sharpcorner.com/article/what-is-new-in-net-6-0/
- https://learn.microsoft.com/vi-vn/aspnet/core/tutorials/razor-pages/page?view=aspnetcore-6.0&tabs=visual-studio