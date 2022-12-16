Cải thiện tốc độ luôn là vấn đề nhức nhối của các dự án cỡ vừa và lớn, và phần lớn nguyên nhân dẫn đến sự chậm trễ này là do những trục trặc ở khâu truy xuất dữ liệu từ database.
Hôm nay chúng ta sẽ cùng nhau tìm hiểu các phương pháp để tìm kiếm nguyên nhân và cải thiện tốc độ trong hệ quản trị cơ sở dữ liệu Microsoft SQL Server (gọi tắt là SQL Server) bằng công cụ SQL Server Management Studio (viết tắt là SSMS).  
## SQL Server
SQL Server là hệ quản trị cơ sở dữ liệu (Database Management System - DBMS) được phát triển bởi Microsoft, để lưu trữ và quản lý dữ liệu. Ngoài ra nó còn cung cấp các công cụ tiện ích khác như report writing, data import/export, và data analysis.

## SQL Server Management Studio
SSMS là một môi trường phát triển nâng cao, cho phép chúng ta config và quản lý DBMS. SSMS bao gồm nhiều công cụ để thao tác với SQL Server.

## Các công cụ để tuning DB
1. ### Execution Plan
    Bước đầu tiên để hiểu và phân tích một câu query là nhìn vào execution plan của nó. Execution plan là một dạng sơ đồ biểu thị các hoạt động được thực hiện bởi database engine khi chạy một câu query.
    Để bật chế độ thực thi query có đính kèm execution plan, các bạn có thể làm theo một trong các cách dưới đây
    
    **Cách 1** Click chọn icon `Include Actual Execution Plan`như hình dưới
   ![](https://images.viblo.asia/c8fc55ac-cbd4-421c-9aa6-b48fe9a9ac3c.PNG)
    
    **Cách 2** Ấn tổ hợp `Ctrl + M` trong giao diện SSMS
    
    **Cách 3** Chọn `Query -> Include Actual Execution Plan`
    
    Sau chỉ bật thì execution plan sẽ hiển thị ra cùng với kết quả của câu query ở tab `Excution plan`như hình dưới
    ![](https://images.viblo.asia/1f3d20dd-e64f-4459-963d-379e9179ffd6.PNG)
    
    Các bạn có thể di chuột vào từng item của plan để xem thông tin chi tiết
    ![](https://images.viblo.asia/ba899f63-cb06-4c85-9395-40641b2c80df.PNG)
    
    execution plan cho ta biết các loại object mà query dùng (table, index, v.v...) và chúng đươc dùng như thế nào (thứ tự các object được gọi, cách chúng được gọi - seek hay scan, loại join, v.v...). Dựa vào đó chúng ta có thể phân tích được đâu là nguyên nhân (hoặc bộ phận nào của câu query) gây ra vấn đề perfomance.
    
2. ### Activity Monitor
    Các xử lý chậm và mất thời gian trên database thường ngốn nhiều processor, memory và disk. Vậy nên ta có thể dựa vào đó để phát hiện những câu query cần cải thiện tốc độ.
    Để mở activity monitor, các bạn có thể click vào icon `activity monitor` như hình dưới
    ![](https://images.viblo.asia/b77254a3-f0d6-48ae-a249-1dce6c284a6d.PNG)
    
    Những query(đã thực hiện trong thời gian gần) ngốn nhiều tài nguyên và thời gian thực hiện sẽ được hiển thị trong mục `Recent Expensive Queries`
    ![](https://images.viblo.asia/1ffba8d4-cd8b-4f59-a5cd-6a45d2505c4d.jpg)
    
    Các bạn có thể nhấp chuột phải vào một dòng nào đó và chọn `Show Execution Plan` để xem chi tiết thực thi của query đó
    ![](https://images.viblo.asia/4fb62c27-351b-4863-ac4e-9d631e1ec260.jpg)

    Ngoài ra activity monitor còn rất nhiều thông tin hữu ích khác hỗ trợ việc theo dõi và quản lý hoạt động của db. Mình sẽ đi chi tiết hơn về mục này trong một bài viết khác.
    
3. ### Dynamic Management View
    Dynamic Management View (DMV) là các view và function được tạo sẵn trong SQL Server. Các view và function này trả về thông tin của database server, giúp đỡ việc theo dõi tình trạng server, chuẩn đoán sự cố và cải thiện performance
    
    Tài liệu tham khảo trên trang chủ của Microsoft doc:  
    [Chi tiết về cách dùng DMV để xem các thống kê về perfomance](https://docs.microsoft.com/en-us/sql/relational-databases/performance/use-dmvs-determine-usage-performance-views?view=sql-server-ver15)  
    [Danh sách các DMV có sẵn trong SQL Server](https://docs.microsoft.com/en-us/sql/relational-databases/system-dynamic-management-views/system-dynamic-management-views?view=sql-server-ver15)  
    
4. ### Database Engine Tuning Advisor
    Database Engine Tuning Advisor(DETA) là tool dùng để phân tích một hoặc nhiều câu lệnh sql, sau đó đưa ra gợi ý về hướng cải thiện performance (thêm index, thêm partitioning)
    để tiến hành phân tích một (hoặc nhiều) query, chúng ta lựa chọn câu query đó, chuột phải, rồi chọn `Analyze Query in Database Engine Tuning Advisor`
    ![](https://images.viblo.asia/8d085d66-a5c5-4a47-a84d-cd7e219fac36.jpg)
    sau đó màn hình đăng nhập sẽ hiện ra, điền thông tin đăng nhập rồi chọn `Connect` để tiếp tục. Giao diện của DETA sẽ được hiển thị như hình dưới
    ![](https://images.viblo.asia/0c8d480e-d873-46a9-976e-d0c9935f66ea.jpg)
    bạn có thể chọn `Start Analysis` trên toolbar để bắt đầu phân tích, hoặc thay đổi các option theo ý mình ở 2 tab `General` và `Tuning Options` rồi bấm `Start Analysis`.  
    
    Sau khi phân tích thành công, nếu DETA có hướng cải thiện thì nội dung sẽ được hiển thị ở tab `Recommendations`, còn báo cáo chi tiết về phân tích sẽ được hiển thị ở tab `Reports`.
    ![](https://images.viblo.asia/5d9aa06f-8c40-4a95-9d97-31c963a0bf83.jpg)
    
    
    Trên đây là một vài phương pháp để theo dõi, phân tích, và tìm ra hướng cải thiện tốc độ cho query của SQL Server bằng SQL Server Management Studio. Bài viết tiếp theo mình sẽ đi sâu hơn về các tips và tricks có thể dùng để cải thiện performance.