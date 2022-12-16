Hi lại là mình đây, bài này mình sẽ viết và giải thích về Sample trong jmeter nhé
Link tham khảo: Link: https://jmeter.apache.org/usermanual/component_reference.html#samplers
Vậy Sample là gì : sử dụng để tạo ra request trong jmeter, jmeter trang bị nhiều loại sampler khác nhau.

**FTP Request** : cho phép upload, download từ FTP server
- Thường khi thiết lập test case dạng này sử dụng 2 thành phần:
    + Assertions: sử dụng kiểm tra response
    + FTP Request Defaults: được sử dụng định nghĩa template cho các sampler FTP
    + FTP Request: sử dụng tạo request dạng FTP tới server
   ![](https://images.viblo.asia/53f1ee9d-d327-40a9-a5b0-db282daff46f.png)
   
- Thành phần trong FTP request:

    - Name :tên của mẫu FTP request  ko bắt buộc
    
    - Server Name or IP : địa chỉ domain của FTP server  ( bắt buộc)
    
    - Port: Port sử dụng, Port >0, trường hợp ko có thì Jmeter sử dụng port mặc định 
    
    - remote file: tên file muốn lấy hoặc tên file muốn upload ( tên file ở trên ftp server) ( bắt buộc)

    - Local File :tên file ở local sử dụng để upload hoặc download
     **Trường hợp upload file thì điền thông tin:**
    -  Local File contents:  cung cấp nội dung cho upload, ghi đè file
    - Username: FTP account username ( bắt buộc)
    - Password: FTP account username (bắt buộc)

    **Ví dụ FTP Request**
    
-     Step 1: thiết lập thread-group : 
    
chọn Test plan => kích chuột phải => chọn add => chọn ThreadGroup


![](https://images.viblo.asia/4ea87ed3-89d7-41b6-aa94-3215cbb2859d.png)


Step 2: Thêm Default FTP Request : sử dụng để tạo template cho các sampler FTP  

ThreadGroup FTP Users => chọn Add => Config Element => FTP Request Defaults

![](https://images.viblo.asia/7b690d2d-3a98-465e-91e9-d9145c462a60.png)

Step 3: tạo FTP request sampler:  
    
    threadgroup FTP User => Add -> FTP request  

![](https://images.viblo.asia/452ddda7-c137-4a6c-be29-10a8df3fc794.png)


Step 4: tạo view tree để xem kết quả test :  
    FTP User => add Listener => View Results in Table