Tiếp phần: Làm thế nào để upload Tests sử dụng Microsoft Excel

Bước 11) Tất cả Test details được tải lên như dưới đây

Người dùng có thể thực hiện tải các test cases lên. Trong trường hợp tải lại test cases, nếu tên đã tồn tại và nếu có bất kỳ thay đổi nào thì sẽ ghi đè lên cái đã có sẵn, nếu tên giống nhau thì chỉ upload một file còn tên khác nhau thì upload như là một file mới.
![](https://images.viblo.asia/7443a41e-18f2-43c9-b986-8f0d60eea26f.PNG)

## Làm thế nào để tạo tài nguyên ##
Test resources cho phép người dùng quản lý tài nguyên thường được chọn bằng cách automated/performance tests. Người dùng có thể tải đoạn script có thể sử dụng bởi một hoặc nhiều cách kiểm tra. Họ có thể tải hoặc sửa và tải lại test resources

Làm thế nào để chúng ta có thể sử dụng  Test Resources hiệu quả. Module này được thể hiện bằng cách tải lên cùng một tệp excel trong test resources mà chúng ta đã sử dụng cho  importing các trường hợp kiểm thử từ excel vào ALM.
Tải lên các trường hợp Tests để chúng tôi có thể chỉnh sửa bất cứ khi nào cần và chỉ tải lên lại các trường hợp kiểm tra đã sửa đổi. Nó cũng dễ dàng để thêm trường hợp mới và chỉ tải lên các trường hợp mới được thêm vào.

Tuy nhiên chúng ta có thể upload các loại file như .xls, .vbs, .qfl etc.

Bước 1) Điều hướng đến Test Resources như dưới đây. Trang test resources được mở
![](https://images.viblo.asia/ae6dda57-eb43-4bf8-a31e-59492c4d5ef1.PNG)

Bước 2) Tạo một thư mục 'New Folder' bằng cách nhấp vào icon New folder như dưới. Thư mục mới được mở. 
![](https://images.viblo.asia/4e7b2d2d-0080-4536-b052-fa672724deef.PNG)

Bước 3) Thư mục được tạo như dưới
![](https://images.viblo.asia/b0576167-37dc-4135-bfb3-53ff42de3473.PNG)

Bước 4) Tương tự chúng ta tạo nhiều hơn 2 thư mục viz – Automation và Performance. Sau khi tạo một thư mục cho mỗi test resources, cấu trúc thư mục cuối cùng sẽ như dưới đây
![](https://images.viblo.asia/cf4e9b71-0360-444f-b54a-5cfa07fa4fa0.PNG)

Bước 5) Chúng ta hãy tạo một test resource bằng cách tải file excel mà chúng ta đã tạo bằng tay trong ALM. Chọn thư mục nơi người dùng muốn tải test resource.

Bước 6) Nhập tên của Test resource và cũng chọn type là test resource sau đó click ' OK'
![](https://images.viblo.asia/93c166c2-2ef4-480e-a8c6-d875bd8cf5cb.PNG)

Bước 7) Các bước cần tải resource 
1. Nhấp vào 'Resource Viewer' Tab
2. Nhấp vào 'Upload File' và chọn file upload
![](https://images.viblo.asia/3c8822b4-b99c-4614-8862-00ade182fcd1.PNG)

Bước 8) Sau khi tải file, trạng thái sẽ được hiển thị tới người dùng và nó sẵn sàng để tải xuống.
![](https://images.viblo.asia/0c962197-395c-471d-843e-2af205090648.PNG)

## Làm thế nào để tạo một Test Set ##
Bước 1) Bước đầu tiên là để tạo một thư mục gốc để chứa một tập tests. Chúng ta có thể đặt tên cho nó phù hợp với bản phát hành và chu kỳ để dễ theo dõi.
1. Nhấp vào 'Test Lab' module dưới 'Testing' Tab
2. Tạo một tên một thư mục mới bởi nhấp vào 'New Folder' icon.
3. Hộp thoại 'New Test Set Folder'. Nhập tên folder '2017 R1 – Cycle 1'.
4. CLick 'OK'
![](https://images.viblo.asia/dff82365-a51c-4708-b04c-3ccf290434cd.PNG)

Bước 2) Thư mục run sẽ được tạo như bên dưới
![](https://images.viblo.asia/bf60d107-a202-4098-9a32-8c39f0b04a23.PNG)

Bước 3) Chọn thư mục đã tạo và gán 'Cycle'  cho nó, có nghĩa là toàn bộ tập test sẽ được thực hiện cho Cycle 1
![](https://images.viblo.asia/a4d4ee3f-5abf-4298-86a7-171495751b6c.PNG)

Bước 4) Nhập tên của tập test và click " OK"
Lưu ý:  Trường Target Cycle bị vô hiệu hóa như vì ctarget cycle được chọn ở cấp thư mục(2017 R1 – Cycle 1).
![](https://images.viblo.asia/e49a2c42-8269-4122-a705-56e592b173d9.PNG)

Bước 5) Sau khi tạo một tập test, chúng ta cần chọn các thử nghiệm để thêm nó vào tập kiểm thử
1) Chọn tập Test
2) Điều hướng tới "Execution Grid"
3) Nhấp vào nút 'Select Tests'. Cây Test Plan được mở
4) Chọn kiểm thử cần thực hiện cho chu trình hiện tại
5) Nhấp vào mút '<=' để di chuyển các trường hợp kiểm thử từ test plan tới test lab.
![](https://images.viblo.asia/8d19ee96-65b9-4da5-bbd7-0d315ee4a1e3.PNG)

Bước 6) Khi thêm Tests từ cây test plan, tất cả các tham số cấu hình của các tests đã chọn sẽ được hiển thị cho người dùng. Người dùng có thể chỉnh sửa cấu hình trước khi thêm nó vào test lab.

Lưu ý: Người dùng không có quyền kiểm soát lựa chọn cấu hình thử nghiệm trong Lab thử nghiệm. Do đó, toàn bộ cấu hình sẽ được thêm vào thử nghiệm theo mặc định. Trong trường hợp một trong các cấu hình được chọn KHÔNG phải là một phần của chu trình, sau khi thêm các  trường hợp kiểm thử, hãy xóa khỏi test lab.
![](https://images.viblo.asia/9b361494-12f7-4b35-b36a-7248110fbc6a.PNG)

Bước 7) Sau khi chọn cấu hình, chọn các kiểm thử đã được thêm vào tập Test. Trong tường hợp này chúng ta có thể chọn tất cả 3 cấu hình; do đó chúng ta có thể tìm thấy 3 trường hợp của '01- Login Test'.
![](https://images.viblo.asia/274dcf5a-f6a6-49ff-8b9c-39b4dd4ad0a2.PNG)

Bước 8) Lặp lại các bước trên để tạo thêm cho tập test và chọn tất cả các thử nghiệm có liên quan được lên kế hoạch cho chu trình này. Sau khi tạo tất cả các tập test, cấu trúc của tập test sẽ như dưới đây

![](https://images.viblo.asia/bd4add59-3bed-40a5-85b5-ceb5f471f86f.PNG)

Bước 9) Tab quan trọng khác mà chúng ta cần hiểu là "Execution Flow". Chọn 'Excecution Flow Tab' hiển thị thứ tự kiểm tra các trường hợp test trong khi thực hiện. Người dùng cũng có thể thay đổi thứ tự bằng cách sử dụng tab sẽ được xử lý trong một phần riêng biệt của mô-đun này.
![](https://images.viblo.asia/5f53208a-489f-4fd4-a308-1078ff3134bd.PNG)

<<Còn tiếp>>

Phần sau sẽ nói đến phần " Làm thế nào để thực hiện test"

Tài liệu tham khảo : https://www.guru99.com/hp-alm-test-plan-module.html