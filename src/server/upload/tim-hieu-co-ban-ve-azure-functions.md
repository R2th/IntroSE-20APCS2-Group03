Azure Functions là một dịch vụ đám mây, được cung cấp sẵn tất cả các tài nguyên và cơ sở hạ tầng - luôn được cập nhật để đáp ứng nhu cầu của người dùng. Azure Functions không là 1 máy chủ, nhưng có thể cung cấp các tính toán, xử lý chức năng,... Chúng ta có thể sử dụng nó để xây dựng các API web, phản hồi với các thay đổi cơ sở dữ liệu, xử lý các luồng IoT, quản lý hàng đợi tin nhắn và nhiều thứ khác. <br>

Vì Azure Functions là một giải pháp không có máy chủ nên bạn có thể viết ít mã hơn,cần ít cơ sở hạ tầng để duy trì hơn và tiết kiệm chi phí hơn. Thay vì lo lắng về việc triển khai và bảo trì máy chủ, cơ sở hạ tầng đám mây cung cấp tất cả các tài nguyên luôn được cập nhật cái mới cần thiết để giữ cho các ứng dụng của bạn hoạt động tốt.

### Ngôn ngữ được hỗ trợ. 
- C#: bao gồm cả precompiled class libraries và C# script.<br>
- JavaScript: chỉ hỗ trợ version 2.x của Azure Functions runtime. Yêu cầu version 1.7.0 của Durable Functions extension,hoặc version mới hơn.<br>
- Python: yêu cầu version 2.3.1 của Durable Functions extension, hoặc version mới hơn. <br>
- F#: precompiled class libraries và F# script. F# script chỉ hỗ trợ version 1.x của Azure Functions runtime.
- PowerShell: hỗ trợ cho Durable Functions extension hiện đang ở bản xem trước công khai. Chỉ được hỗ trợ cho version 3.x của Azure Functions runtime của Azure Functions và PowerShell 7. <br>
### Các mô hình ứng dụng cơ bản
- Function chaining: là một chuỗi các hàm thực thi theo một thứ tự cụ thể, mà trong mô hình này thì đầu ra của hàm này được áp dụng cho đầu vào các hàm khác. 
- Fan out/fan in: Đối với mô hình này thì cùng lúc sẽ thực hiện nhiều chức năng và đợi tất cả chức năng kết thúc. 
- Async HTTP APIs: mô hình HTTP API bất đồng bộ để giải quyết các vấn đề điều phối trạng thái hoạt động lâu dài với các máy khách bên ngoài. 
- Monitor: Mô hình này đề cập đến một quy trình linh hoạt, lặp đi lặp lại trong một quy trình làm việc đến khi một điều kiện cụ thể được đáp ứng.
- Human interaction: Mô hình này cho phép sự tương tác của con người trên hệ thống, ví dụ như một quy trình kinh doanh, cần có sự chấp thuận của người quản lý.
- Aggregator: mô hình dùng để tổng hợp dữ liệu có thể từ nhiều nguồn với nhau, và có thể được phân phối theo lô hoặc có thể bị phân tán trong thời gian dài. Trình tổng hợp có thể cần thực hiện hành động đối với dữ liệu sự kiện khi dữ liệu đến và các khách hàng bên ngoài có thể cần truy vấn dữ liệu tổng hợp.
### Các loại và tính năng của Durable Functions
Durable Functions là một tính năng mở rộng của Azure Functions, chúng ta có thể sử dụng Durable Functions để điều phối trạng thái thực thi chức năng.<br>
Hiện tại có 4 loại Durable function trong Azure Function: activity, orchestrator, entity, và client.
### Tạo Durable Functions sử dụng Azure portal
- Tạo function app
    1. Ở giao diện Azure portal menu hoặc Home page, chọn Create a resource.
    2. Trong New page, chọn Compute > Function App.
    3. Ở Basics page, cài đặt thông tin function app theo cầu : cần chú ý các nội dung sau:
        + Resource Group: chọn resource group mà chúng ta đã tạo.
        + Function App name: các ký tự hợp lệ là từ a-z (không phân biệt chữ hoa chữ thường ) từ 0-9 và ký tự -
    5. Chọn next:hosting, điền vào các nội dung cần thiết, cần chú ý những nội dung sau:
        + Storage account: Tên tài khoản phải có độ dài từ 3 đến 24 ký tự và chỉ được chứa số và chữ thường. Bạn cũng có thể sử dụng tài khoản hiện có, tài khoản này phải đáp ứng các yêu cầu về tài khoản đang tạo hiện tại. 
        + Plan: hosting plan xác định cách phân bổ tài nguyên cho functions app của bạn. Trong Consumption plan mặc định, các tài nguyên được thêm động theo yêu cầu của các functions của bạn.
    7. Chọn Next : Monitoring và tiếp tục điền vào các nội dung theo yêu cầu.
        + Application Insights: Bằng cách mở rộng cài đặt này hoặc chọn create, bạn có thể thay đổi tên app name hoặc chọn một khu vực khác trong Azure nơi bạn muốn lưu trữ dữ liệu của mình.
    9. Chọn Review + create để xem lại các nội dung đã điền, và các lựa chọn cấu hình cho ứng dụng
    10. Sao khi kiểm tra lại các thông tin, ở trang Review + create , chọn create để tạo function app
    11. Chọn Notifications ở góc trên bên phải để xem thông báo tạo thành công
    12. Chọn Go to resource để xem nội dung bên trong function app mới tạo, và thao tác thực hiện công việc. <br>
    ![](https://images.viblo.asia/fd4d411d-9f4c-4fe4-84c7-56f322257344.png)
- Cài đặt Durable functions bằng npm package (chỉ sử dụng cho javascript)
    1. Từ trang function app, ở menu bên trái Development Tools, chọn Advanced Tools.
    ![](https://images.viblo.asia/36487475-f2bf-492c-93bb-a71cd3f578b2.png)

    2. Ở Advanced Tools chọn Go
    3. Vào Kudu console, chọn Debug console, và thực hiện CMD.
    ![](https://images.viblo.asia/7e1914cf-9c9a-48a3-83d8-56d437f2e49e.png)

    4. Ở đây thì chúng ta sẽ thấy được cấu trúc thư mục, điều hướng thư mục vào wwwroot, sau đó tải lên tiệp tin package.json
    5. Sau khi tiệp tin tải lên đã hoàn tất, từ Kudu Remote Execution Console chạy lệnh npm install.
    ![](https://images.viblo.asia/4abca7c6-4659-4cfa-8a8e-0167a6de7029.png)
    Như vậy cơ bản chúng ta đã cài xong Durable Functions, những thư viện khác cần cho phát triển chúng ta cũng có thể dùng cách tương tự. 

Bài viết này được tham khảo chủ yếu từ document của microsoft, và cũng là bước đầu tìm hiểu học tập để biết về Azure functions để sử dụng thay thế cho cloud function của firebase. Vì vậy sẽ còn nhiều thiếu sót, mong nhận được sự góp ý của mọi người.<br>
Xin chân thành cám ơn !

Link tham khảo: https://docs.microsoft.com/en-us/azure/azure-functions