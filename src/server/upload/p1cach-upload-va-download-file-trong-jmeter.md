Trong một số trường hợp sử dụng kiểm tra hiệu suất, chỉ kiểm tra xem máy chủ mất bao lâu để hiển thị một trang, tạo ra một tập hợp kết quả tìm kiếm hoặc tạo một thực thể. Đối với một số loại ứng dụng nhất định - hãy lấy hệ thống quản lý nội dung doanh nghiệp làm ví dụ - hiệu suất của các yêu cầu tải lên và tải xuống tệp là rất quan trọng và phải được kiểm tra. Trong bài viết này, chúng tôi sẽ mô tả cách các kịch bản Tải lên và Tải xuống Tệp có thể được thực hiện bằng JMeter, làm nổi bật các khu vực có thể phức tạp hơn về mặt này và đề xuất một số phương pháp hay nhất.

## I. Upload file 

Upload file dựa trên biểu mẫu HTML được xác định nhiều [Multipart/form-data] là một loại phương tiện cho các tệp đính kèm. ĐỔi lại, Jmeter's HTTP Request Sampler  cung cấp một [Multipart/form-data  cho Post] trong checkbox. Khi checkbox nó được đánh dấu thì nó chỉ ra rằng yêu cầu có chứa tệp dữ liệu. Các tệp cần được thông quá "Send Files With the Request"
    
 Thành phần: 

- File Path : Vị trí để tải tệp lên 
- Parameter Name: Dạng " file" có liên quan 
- MIME Type: là mã định danh gồm hai phần cho các định dạng tệp và nội dung định dạng được truyền trên Interne ví dụ như 	image/png 


###     File Path

Bạn nên sử dụng đường dẫn đầy đủ vì nếu bạn chỉ cung cấp đường dẫn tương đối chẳng hạn như tên tệp thì Jmeter sẽ tra cứu nó ở thư mục cơ sở.  Để xem thu mục đang được xem cét, bạn có thể kiểm tra jmeter.log. Tìm kiếm các dòng chứa "fileserver"

  Chú ý 1 lần nữa : 

- Nếu bạn chạy test toàn bộ thì tốt nhất lên dùng đường dẫn đầy đủ
- Nếu bạn không chắc chắn vị trí tệp đạt đâu. thì hãy lấy hoặc FileServer ( file cở sở )
-  Nếu cần nhiều file bạn có thể dùng sự trợ giúp của CSV

###     Parameter Name


Đây là tên tham số bạn cần chỉ cẩn thận nếu không jmeter sẽ chẳn thể hiểu bạn muốn đi đâu. Muốn xác định vị trí chính xác bạn cần làm bước sau

- Kiểm tra ở Inspect của page source và lấy thuộc tính "name" của đầu vào loại "file"
 - Hoặc dễ nhất là nhờ tính năng HTTP(S) Test Script Recorder trong jmeter 

###     MIME type

Khi được cung cấp, loại MIME đang được sử dụng làm giá trị tiêu đề yêu cầu " Content-Type" . Điều quan trọng là phải cung cấp loại MIME nội dung chính xác vì một úng dụng hoặc máy chủ web có thể hoạt động khác nhau tuy thuộc vào loại nội dung đã nêu, tạo ra lỗi trong trường hợp không khớp. Theo sự tham khảo sử dụng để map đúng thì bạn có thể tra cứu ở [đây](https://www.freeformatter.com/mime-types-list.html ) để lấy đúng MIME tương ứng

### DEMO

link test: http://www.csm-testcenter.org/test

![](https://images.viblo.asia/cb49bb1a-aaec-4b33-a946-dcb0cf231c83.PNG)

Bước 1 : Thread Group --> HTTP Request 

Bước 2: Xác định server name là www.csm-testcenter.org
           
Check các giá trị:  Upload file ==> POST. path =/test
                                Choose option for upload file  [Multipart/form-data] là một loại phương tiện cho các tệp đính kèm.
                            
 
 Mở chức năng upload file của page ta cần truyền parameter ==> cũng như test thông thường ta cũng cần có các quy trình 
 
 1. Mở đường dẫn đến page ( đã khai báo đầu)
2. Mở đến chức năng upload file 
3. Upload file 
4. Click submit file 

==> các bước đó cũng được thực hiện bằng cách khai báo parameters kết quả sẽ được đưa vào Parameters ở trên 

![](https://images.viblo.asia/efe82a11-8ce5-463e-a727-6f7a3cb7cc04.PNG)

 
 Bước 3 : Tại vị trí Upload file có tên là file_upload cần truyền data 
 
 ![](https://images.viblo.asia/1bc4d383-099a-438e-90ca-b37c5a7a09ec.PNG)

Xác định giá trị : 

File path: download.jpd ==> đây là file ở cơ sở nên tôi ghi gọn không rõ nguồn dẫn chi tiết 

Parameter name: là tham số đã khai báo bên trên là File_upload 

MIME type : xác đinh loại jpg tương ứng với image/jpeg


Bước 4: Chạy kết quả 

![](https://images.viblo.asia/bf03a4fd-f3bf-41e4-806d-cf0a19fcc532.PNG)


===> ngoài cách trên tạo bằng tay thì nên khuyến khích mọi người sử dụng  HTTP(S) Test Script Recorder trong jmeter . Hẹn mọi người bài viết download file bằng jmeter ở kì sau.