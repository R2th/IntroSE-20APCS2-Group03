Blobs là những đối tượng nhị phân lớn, dữ liệu phi cấu trúc mà bạn muốn lưu trữ. <br>
Giao diện RESTful, blob store của Azure giảm bớt rất nhiều sự phức tạp của việc xử lý các file và nền tảng Azure đảm bảo rằng cùng một đối tượng có sẵn trên nhiều bản sao lưu trữ, sử dụng tính nhất quán để đảm bảo rằng tất cả các phiên bản của một bản ghi chính xác trước khi đối tượng có thể được read. <br>
Dữ liệu có thể được phân lớp, tùy thuộc vào tần suất bạn mong đợi nó được read, với hot, cold và preview của các tùy chọn lưu trữ có sẵn.
### Blob Storage là gì ?
Lưu trữ Azure Blob là giải pháp lưu trữ đối tượng của Microsoft cho đám mây. <br>
Bộ lưu trữ Blob được tối ưu hóa để lưu trữ một lượng lớn dữ liệu phi cấu trúc. 
Dữ liệu phi cấu trúc là dữ liệu không tuân theo mô hình hoặc định nghĩa dữ liệu cụ thể, chẳng hạn như dữ liệu văn bản hoặc dữ liệu nhị phân.<br>
### Blob storage resources
Blob storage resources gồm <br>
- Storage account
- Container trong Storage account
-  Blob trong container<br>
Dưới đây là hình ảnh mô tả mối quan hệ giữa các resource<br>
![](https://images.viblo.asia/2da54b51-0a70-4938-b0b1-c73db8488332.png)
<br>
<br>
**1. Storage account** : là tài khoản Storage Azure của bạn, nơi đây chứa tất cả các đối tượng dữ liệu như: blobs, files, queues, tables, và disks. Dữ liệu trong này có thể truy cập được từ mọi nơi trên thế giới qua HTTP hoặc HTTPS. Dữ liệu trong storage account của bạn có tính bền, khả dụng cao, an toàn và có khả năng mở rộng lớn.<br>
    Các loại Storage account: 
    - General-purpose v2 accounts: Một loại tài khoản lưu trữ cơ bản cho: blobs, files, queues, và tables . Và được đề xuất cho hầu hết các trường hợp sử dụng Azure Storage
    - General-purpose v1 accounts: dùng để sử dụng mở rộng cho *purpose v2 accounts* khi cần
    - BlockBlobStorage accounts: Tài khoản lưu trữ cao cấp có hiệu suất cao cho: block blobs và append blobs.
    - FileStorage accounts: tài khoản lưu trữ chỉ dành cho file có hiệu suất cao
    - BlobStorage accounts <br>
    
    **2. Container trong Storage account**: Là một vùng chứa để tập hợp các blob, tương tự như một thư mục trong hệ thống tệp. Một tài khoản lưu trữ có thể không giới hạn số lượng container và một container có thể lưu trữ không giới hạn số lượng các blobs.<br><br>
    **3. Blob**: Azure storage hỗ trợ 3 loại blob
    - Block blobs: lưu trữ dữ liệu dạng text và dữ liệu nhị phân.
    - Append blobs: lý tưởng cho việc ghi dữ liệu từ máy ảo
    - Page blobs: lưu trữ các tệp truy cập ngẫu nhiên có kích thước lên đến 8 TB<br>
### Thực hành cơ bản về blob storage: upload, download và list blobs với Azure portal
Trước khi tiến hành thao tác thì bạn cần chuẩn bị tài khoản microsoft: có thể tạo tài khoản miễn phí Azure portal.<br><br>
**1. Tạo storage account**<br>
Vào trang https://portal.azure.com/  -> Chọn Storage accounts
![](https://images.viblo.asia/a36acba2-fbad-4756-b7af-e828299afae1.png)
-> Chọn Add
![](https://images.viblo.asia/41b604eb-c4cf-4ebb-b44a-43badea9c026.png)
Điền tất cả thông tin cần thiết -> Chọn Review + create
![](https://images.viblo.asia/16c7f078-b40e-4b68-89bb-aeaaed8ca3a8.png)
Nào, đợi một tí ta đã tạo thành công storage account (bên dưới là hình ảnh bên trong storage account sau khi tạo xong)<br>
![](https://images.viblo.asia/521bb46a-f232-410c-b61b-ed42539331bd.png)

**2. Tạo container**<br>
Ở menu bên trái màn hình bên trong storage account, ta tìm đến Blob service và chọn Containers.
![](https://images.viblo.asia/23a298e1-4cb4-42ee-a139-e5af13aeb001.png)
Tiếp theo ta tạo container<br>
Điền thông tin theo yêu cầu, Name của new container bắt đầu bằng chữ thường hoặc số và chỉ chứa chữ thường, số và ký tự "-" .<br>
![](https://images.viblo.asia/90b820ea-8dce-4d44-9a47-73779778abda.png)
Nhấn Create nữa là ta đã tạo thành công rồi. <br>
**3. Upload a block blob**<br>
Hầu hết các tình huống lưu trữ đều sử dụng block blob. Các block blob dùng để lưu trữ văn bản và dữ liệu nhị phân trên đám mây, như tệp, hình ảnh và video. Qua phần thực hành bên dưới chúng ta sẽ hiểu thêm về cách hoạt động của block blob.<br>
Bắt đầu vào container mới tạo ( phía trên đã hướng dẫn ) -> chọn Upload 
![](https://images.viblo.asia/11f18dcb-e669-47a8-adff-74378a102a31.png)
Chọn File cần upload
![](https://images.viblo.asia/bd14d885-6500-4da4-8dcc-ac0595d461c2.png)
Chọn button Upload để upload file lên blob.<br>
Đây là hình ảnh sau khi upload file lên blob.<br>
![](https://images.viblo.asia/637019e7-7206-4899-80e3-276c872fa0c7.png)
**4. Download a block blob**<br>
Bạn có thể download block blob về trình duyệt để xem hoặc tải về local để thao tác. (cũng có thể thực hiện các thao tác đã được hỗ trợ sẵn như hình bên dưới )<br>
![](https://images.viblo.asia/df591520-54f9-4946-9d91-35078892cc68.png)
**5. Delete a block blob**<br>
Để xóa hết những dữ liệu đã tạo, ta chỉ cần xóa container, tất cả dữ liệu bên trong sẽ được xóa.
![](https://images.viblo.asia/b0047780-fd70-4d2c-82bb-e151c318e49e.png)
Click vào container và nhấn Delete -> bạn đã xóa xong container chứa dữ liệu vừa tạo. <br><br>
Bài viết mình hôm nay hướng dẫn đến đây là kết thúc - Sẽ có các nội dung tiếp nối ở các bài tiếp theo, mong nhận được sự góp ý từ mọi người.<br>
Xin chân thành cám ơn!<br><br>

Nguồn tham khảo :https://docs.microsoft.com/en-us/azure/storage/blobs