Xác định các yêu cầu là một trong những giai đoạn sơ bộ cho vòng đời phát triển phần mềm.

Xác định Yêu cầu đề cập đến những gì bàn giao cho khách hàng ở lần cuối cùng release

Việc thiết lập các yêu cầu với độ dài ngắn gọn và rõ ràng sẽ giảm tối thiểu quá trình re-work sau khi đã phát triển hoàn thiện

Module trong ALM cho phép users có thể xác định, quản lý và theo dõi requirements

![](https://images.viblo.asia/bff1951a-1796-41a0-8a0e-16009d95f688.jpg)

Chúng ta sẽ sử dụng ví dụ hệ thống (GURU99 Banking) để hiểu nó hơn

Trong phần này chúng ta sẽ được học:
+ Làm thế nào để tạo yêu cầu
+ Làm thế nào để upload yêu cầu sử dụng Microsoft Excel
+ Làm thế nào để phân tích độ bao phủ (Requirement Traceability)

![](https://images.viblo.asia/6207c79c-3b51-4dbb-8bbc-76f92c7173b1.png)
## 1. Làm thế nào để tạo Requirement ##

`Bước 1` Click vào 'Requirements' trong 'Requirements' module
![](https://images.viblo.asia/88b59941-c2b6-49b1-a4e9-3d4440683b7c.png)

` Bước 2` Nào bây giờ chúng ta sẽ tổng hợp tất cả các requirements cho lần release (2017 R1) trong một thư mục xác định vì vậy nó sẽ dễ dàng để truy cập. Trong lần thêm này chúng ta sẽ hiển thị sực khác biệt giữa ' Functional' và ' Non Functional' bằng cách đặt chúng vào các thư mục khác nhau.

1. Click vào 'New Folder' Icon dưới Requiremets Module
2. Nhập tên của Folders như "2017 R1" để dễ dàng xác định yêu cầu cho lần release này.

![](https://images.viblo.asia/07b0c512-ceb8-4a2b-9705-34cbfd53badb.png)

` Bước 3` Tạo thư mục sẽ hiển thị như dưới đây

![](https://images.viblo.asia/abc15def-7ac6-4440-8b8f-32902994dc08.png)

` Bước 4` Bây giờ chúng ta hãy tạo một thư mục cho yêu cầu 'Functional' nơi tất cả các tài liệu yêu cầu chức năng / các mục công việc được duy trì

![](https://images.viblo.asia/41a9775b-7cb8-4c7f-8479-eb12d103786c.png)

` Bước 5` Tạo một thư mục sẽ hiển  thị trong ' Requirements' module như dưới đây

![](https://images.viblo.asia/8e93aaf1-f8ef-43fb-999f-2b6062e5aa83.png)

` Bước 6` Tương tự tạo thư mục ' Non Functional' Khi tạo cả thư mục Functional and Non Functional, chúng ta sẽ có cấu trúc thư mục như hình bên dưới.

![](https://images.viblo.asia/20539a97-ff47-4073-8d41-50641ea0d4da.png)

` Bước 7` Click vào 'New Requirements' icon trong trang requirements như hiển thị dưới đây

![](https://images.viblo.asia/c967b121-0ddb-40f5-8fa0-81cff3a11aad.png)

Hộp thoại 'New Requirements' được mở và users có thể nhập các trường bắt buộc như sau:

1. Nhập tên của Requirement
2. Chọn Requirement Type

![](https://images.viblo.asia/c5f94ac8-6725-4fe3-958d-9ab87c135eee.png)

` Bước 8` Người dùng có thể nhập những trường không bắt buộc như:
+ Author
+ Priority
+ Reviewed
+ Target Release
+ Target Cycle
+ Description and Comments.

` Bước 9` Yêu cầu cũng cho phép người dùng nhập trưc tiếp ở định dạng văn bản như hiển thị phía dưới

![](https://images.viblo.asia/e94686ed-1c87-4629-98fc-c4711215a344.png)

`Bước 10` Thông thường, các yêu cầu được ghi lại trong một tài liệu word. Chúng được tải lên dưới tab tệp đính kèm như được hiển thị bên dưới. ALM cũng hỗ trợ tất cả các loại tệp khác như .xls, .jpg, v.v. Sau khi tải lên, hãy nhấp vào nút Gửi

![](https://images.viblo.asia/a593f5d2-aac6-44f0-aedd-bf3f82c3cc64.png)

` Bước 11` Yêu cầu sẽ được hiển thị tới người dùng như dưới:

![](https://images.viblo.asia/54d9ceb5-dfad-4d71-b4d9-e2531ec217e3.png)

## 2. Làm thế nào để upload requirements sử dụng Microsoft excel ##

Đôi khi, người dùng sẽ không tạo yêu cầu theo cách thủ công. Nó rất dễ dàng để tải lên tất cả các yêu cầu với số lượng lớn thay vì tạo từng yêu cầu một, đó là một quá trình tốn thời gian. Để tạo điều kiện tải lên ALM, HP đã trở thành Addin do vậy người dùng có thể tải lên trực tiếp từ MS excel / MS Word. Nào bây giờ chúng ta sẽ hiểu quy trình từng bước để tải lên các yêu cầu về QC từ Excel.
Cho việc tải Requirements, người dùng cần hiểu workflow như sau:

![](https://images.viblo.asia/d4a88635-6cf9-4ca8-a1cf-cafcccb8db4d.png)

Part A - Downloading:

` Bước 1` Chuyển hướng tới ALM home page http://localhost:8181/qcbin và click vào " Tools" từ danh sách của links

![](https://images.viblo.asia/bfe76b8d-3dab-436c-ae92-2a31b69c446d.png)

` Bước 2` Click vào "More HP ALM Add-ins" link từ add-in của trang như dưới đây:

![](https://images.viblo.asia/147778e5-eea1-4a63-9790-3098243d85d8.png)

` Bước 3` Chọn 'Add-ins for Microsoft Applications' và chọn 'Microsoft Excel' từ link như chúng ta sẽ sử dụng MS Excel add-in để tải dữ liệu lên HP-ALM

![](https://images.viblo.asia/46f7f620-c871-48ce-a66b-82b82a795859.png)

` Bước 4`Chọn HP-ALM Microsoft Excel Add-in cho ALM 12.00 link

![](https://images.viblo.asia/d3cef826-a9c6-474a-b7fd-d42a8cbee595.png)

` Bước 5` Chọn HP-ALM Microsoft Excel Add-in cho ALM 12.00 link. Người dùng cũng có thể di chuyển tới hướng dẫn 'Read-me' và 'Add-in' khi nhấp vào liên kết, tệp cài đặt bổ trợ sẽ được tải xuống vị trí mặc định của người dùng / vị trí đã chọn.

![](https://images.viblo.asia/d0e00b92-0408-4cba-96ed-b46717649f5b.png)

Part B – Cài đặt:

` Bước 1` Chọn tải add-in và thực hiện nhấn chuột phải trên downloaded file. Chọn ' Run as Administrator'

![](https://images.viblo.asia/422bcbe0-21af-45f7-9ae4-e053d9474dfa.png)

` Bước 2 ` Chọn 'Run as Administrator' vì vậy người dùng có thể cài đặt add-in.

![](https://images.viblo.asia/432d14cc-bf8a-4d57-9f88-beba92a42b50.png)

` Bước 3` Chọn loại cài đặt. Ở đây 'For All Users' được chọn mặc định. Nếu bạn chỉ muốn cài đặt cho người dùng hiện tại thì hãy chọn 'For Current User Only' và nhấn ' Next'

![](https://images.viblo.asia/56d0154f-cde4-40ea-bf8d-917de8a5c631.png)

` Bước 4` Khi hoàn thành cài đặt, người dùng sẽ lấy được trạng thái message. Nhấn vào ' Finish' button.

![](https://images.viblo.asia/538eb936-ee0e-4af7-8e2e-d342a82f5c5d.png)

` Bước 5` Để xác định nếu add-in cài đặt thành công, mở Excel và điều hướng tới 'Add-ins' Tab. Bạn sẽ tìm thấy lựa chọn 'Export to HP ALM' như vậy có nghĩa là 'add-in' được cài đặt thành công

![](https://images.viblo.asia/748cfd4d-da18-40fc-a808-d91b51eb8fbb.png)

(Còn tiếp)
Ở phần sau chúng ta sẽ biết được cách upload requirements trong ALM: