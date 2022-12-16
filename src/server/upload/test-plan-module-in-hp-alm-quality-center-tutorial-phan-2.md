Ở bài viết trước chúng ta đã biết làm thế nào tạo Test plan 
Ở phần này chúng ta sẽ tiếp tục các bước tìm hiểu Tab test configuration và Req Coverage

Bước 17) test configuration giúp chúng ta sử dụng lại các trường hợp test theo các scenarios khác nhau. Bây giờ chúng ta sẽ hiểu test configurations làm việc như thế nào với một ví dụ. Mặc định có một test configuration được xác định như dưới
![](https://images.viblo.asia/8ffb9f77-dbc8-4d6b-8f09-14b82f8c902b.PNG)

Bước 18) Chúng ta nói tới chức năng login có thể thực hiện bởi 3 loại người dùng như 'helpdesk', 'manager' và 'cluster head'.

Chúng ta hãy đổi tên cấu hình thử nghiệm mặc định thành 'helpdesk' bằng cách chỉnh sửa trường tên của 'Test Configuration'.
![](https://images.viblo.asia/c6e8e32c-3bb7-4cb3-b210-ae39b6e6ae37.PNG)

Bước 19) Bây giờ chúng ta add thêm nhiều test configurations bằng cách click '+' icon dưới test configurations.
![](https://images.viblo.asia/c824dd5e-fed9-4e90-8b5f-08e1aef780af.PNG)

Bước 20) Hộp thoại 'New test Configuration' được mở
1) Nhập tên Test configuration
2) Nhập các tham số không bắt buộc như created by' , 'creation date', 'description'
3) Click 'OK'
![](https://images.viblo.asia/f7f2aa2e-f73a-45a1-9b1c-68f24e3f3d0e.PNG)

Bước 21) Lặp lại bước tương tự như trên để tạo thêm một cấu hình thử nghiệm cho 'cluster head' và toàn bộ cấu hình thử nghiệm sẽ được hiển thị cho người dùng như hiển thị bên dưới. Điều này sẽ cho phép testers thực hiện test độc lập đối với tất cả các cấu hình đã tạo trong quá trình thực hiện test, điều này sẽ không dẫn đến việc viết lại các kịch bản test.
![](https://images.viblo.asia/fa37fe0a-47e9-4edd-a15b-8ec26e49cebf.PNG)

Bước 22) Tab 'Req Coverage' giúp người dùng map các trường hợp kiểm thử theo yêu cầu, giúp người dùng tạo phạm vi và truy xuất nguồn gốc

1) Nhấp vào 'Req Coverage' Tab.
2) Chọn 'Requirement' sẽ ánh xạ 
3) Chọn '<=' button để ánh xạ tới các yêu cầu được lựa chọn test. Chúng ta có thể map nhiều Requirements với cùng kịch bản test.
![](https://images.viblo.asia/35168f5b-8909-48b7-ab4c-bd6a5f15dccb.PNG)

Bước 23) Tab 'Linked Defects' hiển thị trống khi chúng ta không thực hiện bất kỳ test/raised hoặc bất kỳ lỗi nào đối với trường hợp thử nghiệm. Tab này sẽ được điền với các chi tiết lỗi nếu các lỗi được đăng so với trường hợp kiểm tra tại thời điểm tạo ra các lỗi.
![](https://images.viblo.asia/5be08c67-2264-4313-a844-3ef9f705dbc4.PNG)

Bước 24) History tab hiển thị các danh sách thay đổi được hiển thị theo thời gian
![](https://images.viblo.asia/7e0f5598-757f-4561-ba49-0b8d659de5c8.PNG)

## Làm thế nào để upload Tests sử dụng Microsoft Excel ##
Bước 1

1. Trước khi upload tests từ excel, chúng ta cần chuẩn bị file Excel cần upload
2. Chọn Trường bạn muốn upload trong ALM và tạo một header trong Excel cho những trường đó
3. Nhập dữ liệu hợp lệ vào từng trường như hình bên dưới.

![](https://images.viblo.asia/b82ae9bd-1726-4335-8bcf-70a78b160028.PNG)

Bước 2) Sau khi chọn dữ liệu để upload, nhấn 'Export to HP ALM' từ  'Add-Ins'.

![](https://images.viblo.asia/3cca8a3c-ee33-438c-86c1-5413a6ddfb65.PNG)

Bước 3) ALM Export Wizard được mở. Nhập HP ALM Server URL và nhấn 'Next'

![](https://images.viblo.asia/ee3b2e35-cb16-496a-b933-72c73e41acf2.PNG)

Bước 4) Nhập tên người dùng và mật khẩu để xác thực sau đó nhấn 'Next'

![](https://images.viblo.asia/2da5c12d-a502-4e3a-8f24-6dc3dc22117d.PNG)

Bước 5) Chọn Domain, Project Name muốn tải lên sau đó nhấn vào 'Next'

![](https://images.viblo.asia/66e7eabd-ef23-4935-9cce-2bfbe6c5cd29.PNG)

Bước 6) Chọn loại dữ liệu muốn tải lên

![](https://images.viblo.asia/07f2a7ff-823e-4f23-9d1d-c203279edf37.PNG)

Bước 7) Nhập tên New Map. Lựa chọn đầu tiên, 'Select a map' bị vô hiệu hóa bởi vì chúng ta chưa tạo map trước đó

![](https://images.viblo.asia/bd0fe994-c814-4449-9207-965601143a01.PNG)

Bước 8) Khi nhấp vào 'Next', hộp thoại ánh xạ sẽ mở ra như hiển thị bên dưới.

1. Các mục lưới khung bên trái được liệt kê tương ứng với các trường có sẵn để tải lên trong HP ALM. Xin lưu ý rằng các trường được đánh dấu trong 'ĐỎ' phải được ánh xạ vì chúng là các trường bắt buộc.
2. Các mục lưới khung bên phải tham chiếu đến các trường được ánh xạ để các giá trị trong Excel sẽ phụ thuộc vào các trường ALM tương ứng đó.
![](https://images.viblo.asia/18dfb53d-9128-40fe-b043-47c6f539a9fa.PNG)

Bước 9) Nào bây giờ chúng ta sẽ hiểu làm thế nào để map các trường trong Excel với các trường trong ALM

1. Chọn Trường mà người dùng muốn ánh xạ và nhấp vào nút mũi tên như hình bên dưới.
![](https://images.viblo.asia/132e9b26-ce64-41fb-ba5e-d21261a5980f.PNG)

2. Nhập tên cột trong Excel tương ứng với tên cột thích hợp trong HP ALM.
![](https://images.viblo.asia/45d049c8-5357-4e33-91c7-9a5fedffd4cb.PNG)

3. Ánh xạ tất cả các cột bắt buộc trong Excel theo các trường thích hợp trong HP ALM. Sau khi ánh xạ tất cả các trường bắt buộc, nhấp vào 'Export'.
![](https://images.viblo.asia/a46effd6-c869-46c5-aab8-db534b16a696.PNG)

Bước 10) Khi tải lên thành công, ALM sẽ hiển thị thông báo như hình bên dưới. Nếu lỗi xuất hiện, vui lòng khắc phục sự cố và thử tải lên lại như cũ.

Một số lỗi phổ biến được liệt kê dưới đây:

1. Subject/Path không hợp lệ / không khả dụng hoặc KHÔNG được ánh xạ bởi người dùng.
2. Trường 'Test Type' có giá trị khác. Kiểm tra tự động KHÔNG THỂ được tải lên bằng Excel.
3. Trường Test Name trống hoặc KHÔNG ánh xạ.
4. Trạng thái không nên có các giá trị khác ngoài Design, ready, Imported, Repair.
![](https://images.viblo.asia/e56a5d25-c0dc-4094-8ce2-a732e273f9da.PNG)

<Còn tiếp>

Tài liệu tham khảo : https://www.guru99.com/hp-alm-test-plan-module.html