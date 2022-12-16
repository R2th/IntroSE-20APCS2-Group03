# Tổng quan
Hiện mình đang làm một dự án trên công ty và API được viết bằng ASP.NET Core. Thấy tạo API trong ASP.NET khá hay nên làm series này chia sẻ cho ae. <br/>
Mình sẽ cố gắng chia sẻ cho ae cách tạo API, phân chia layer, sử dụng validate, entity framework,... trong ASP.NET Core

# Nội dung
Đầu tiên hãy vào Visual Studio (của mình đang dùng VS 2019), khởi tạo một project mới. Tìm đến `ASP.NET Core Web API` như trong hình và chọn **Next**
![image.png](https://images.viblo.asia/0e1e2f34-ea01-49dd-ba10-b96ece111b3e.png)

Tiếp theo hãy đặt tên cho project và chọn **Next**
![image.png](https://images.viblo.asia/2179d4dd-38a3-40a2-b130-46ec69ae6e82.png)

Tiếp theo chọn **.NET 5 (.NET Core 5)** và tích chọn **Enable OpenAPI Support** (Khi tích chọn, Swagger sẽ được thêm vào để tự động gen docs API)
![image.png](https://images.viblo.asia/9e3e8e0c-6aa1-42e0-aaa1-189c0964ee8a.png)

Cuối cùng click **Create**

Tiếp theo hãy chạy thử: Nhấn `Ctrl + Shift + B` để build project sau đó nhấn `Ctrl + F5` để chạy project (chạy không Debug). Hoặc có thể nhấn `Ctrl + F5` luôn cũng được (project sẽ tự động build khi và chạy)
![image.png](https://images.viblo.asia/07acf4de-964e-4fe3-a937-415508a5cf1a.png)

Vậy là khởi tạo xong một project API sử dụng .NET Core 5

# Tổng kết
Bài tiếp theo mình sẽ hướng dẫn các bạn cách tạo ra một controller trong .NET Core
Code phần 1: https://github.com/duonghuan2122000/asp.net-core-5-api-simple/tree/phan-1