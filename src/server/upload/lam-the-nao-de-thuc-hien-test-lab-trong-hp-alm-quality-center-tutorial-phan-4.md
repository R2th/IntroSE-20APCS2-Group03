Ở phần trước chúng ta đã biết làm thế nào để tạo 1 tập test link https://viblo.asia/p/test-plan-module-in-hp-alm-quality-center-tutorial-phan-3-L4x5xd1q5BM 

ở phần này chúng ta nghiên cứu thêm về làm thế nào để thực hiện test.
## Làm thế nào để thực hiện test ##
Bước 1) Tạo tập test để sẵn sàng thực hiện chúng được thực thi bởi 2 lựa chọn
* Run Test Set - Lựa chọn này cho phép người dùng thực thi tất cả các trường hợp tests trong một tập tests đã lựa chọn
* Run - Lựa chọn này giúp người dùng thực thi chỉ những trường hợp đã chọn
![](https://images.viblo.asia/46649e07-ab60-42b6-b77c-931e63eadfc1.PNG)

Bước 2) Bây giờ thực hiện toàn bộ tập test của mô-đun đăng nhập bởi lựa chọn 'Run Test Set'. Khi nhấp vào 'Run Test Set' nó sẽ hiển thị người dùng với hai tùy chọn.
* Manual Runner (default) - Thứ tự của các trường hợp kiểm thử được hiển thị trong khi thực hiện sẽ giống như các lệnh được hiển thị trong tập Tests.
* Automatic Runner - Thứ tự của các trường hợp kiểm thử được hiển thị trong khi thực hiện sẽ được hiển thị theo thứ tự được đặt trong tab thực thi.

![](https://images.viblo.asia/985a4b67-e0a2-49ef-ba66-a7dc5d65bd5f.PNG)

Bước 3) Test runner được hiển thị cho người dùng. Hộp thoại này giúp chúng ta hiểu các tính năng quan trọng.
* Begin Run – Bắt đầu thực hiện
* End Run – Chấm dứt thực hiện vào đóng trình chạy thủ công
* Cancel Run – Hủy bỏ thực hiện kiểm tra trường hợp hiện tại.
* Attachments – Giúp chúng ta đính kèm ảnh chụp màn hình hoặc bất kỳ thông tin nào liên quan tới thực hiện kiểm thử.
* New Defect – Khi nhấp vào nó hộp thoại new defects để sử dụng đăng lỗi
* OS Info – Cung cấp thông tin về hệ điều hành trong các trường hợp đã được thực thi
* Run Name –  Tên kết quả test vào thời điểm nào.

Nhấp 'Begin Run'.
![](https://images.viblo.asia/f0ac6bfd-f4c4-44a2-98fc-193fc1aa2377.PNG)

Bước 4) Manual test runner với trình điều khiển Test được hiển thị tới người dùng
1. Các bước được tạo trong giai đoạn thiết kế thử nghiệm
2. Mô tả các bước đã chọn
3. Kết quả của các bước đã chọn.
![](https://images.viblo.asia/ce53d2ca-8a8a-40b7-8459-132dbdced599.PNG)

Bước 5) Các trường hợp kiểm thử tiếp theo sẽ hiển thị tới người dùng.  Lặp lại bước 3 và bước 4 để thực hiện kiểm tra theo trạng thái tương ứng.
![](https://images.viblo.asia/72be2150-fdd9-43e6-a91b-5e24a91a8e79.PNG)


## Làm thế nào để tạo kế hoạch chạy ##
Người kiểm thử có thể kiểm soát việc thực hiện kiểm tra với sự trợ giúp của tab "Luồng thực thi". Người kiểm tra cũng có thể chỉ định ngày và giờ để thực hiện một phiên bản kiểm tra cụ thể.

Chúng ta có thể lên kế hoạch kiểm tra dựa vào kết quả của một trường hợp test được xác định trong Excecution Flow.
Để hiểu làm thế nào tạo kế hoạch test trong HP-ALM chúng ta sẽ có các bước sau:

Bước 1) Chọn "Execution Flow" tab từ Test Lab module
![](https://images.viblo.asia/549ac13d-a3ff-4e6e-a83a-2229dbc37b0b.PNG)

Bước 2) Nhấp đúp chuột vào trường hợp kiểm tra cần lên kế hoạch chạy
 "Test Run Schedule" Sẽ hiển thị như dưới. Khi không có điều kiện thực thi nào sẽ hiển thị thông báo "Test has no Execution conditions"
 ![](https://images.viblo.asia/95a0ab32-076e-4bff-bdd6-ca88517108a4.PNG)
 
 Bước 3) Thêm điều kiện thực hiện, Nhấp vào biểu tượng "+"  hiển thị như dưới
![](https://images.viblo.asia/ca8b3c5c-eceb-4c58-a61d-de6f3d100bf0.PNG)

Bước 4) Hộp thoại điều kiện thực thi được mở
* Chọn trường hợp test từ dropdownlist. Tất cả trường hợp test trong tập test được hiển thị.
* Chọn điều kiện 'Passed' hoặc 'Finished'
![](https://images.viblo.asia/31dd7a31-3898-45ee-8d42-1e047e1cb4b7.PNG)


Bước 5) Kế hoạch chạy test được hiển thị với điều kiện được thêm vào
![](https://images.viblo.asia/c03500d7-0c40-40b8-a865-0dfababe59ba.PNG)

Bước 6) Luồng thực thi sẽ tự động điều chỉnh lại như hiển thị bên dưới.
Theo luồng hiển thị bên dưới, 'Cluster Head' sẽ được thực thi khi '02 – Reset Button Check' kết thúc.
![](https://images.viblo.asia/fdef9d0a-0ff4-4edc-90de-d726e8b69dd7.PNG)

Bước 7) Bây giờ chúng ta sẽ hiểu làm thế nào để người kiểm thử xác định được thời gian luồng thực thi thực hiện một thử nghiệm cụ thể. Sẽ hữu ích cho người kiểm thử biết được kế hoạch của một chức năng cụ thể hoặc kế hoạch test tự động.
![](https://images.viblo.asia/dbc8f627-ed14-4a07-bc07-36409f45c09f.PNG)

Bước 8) Sau đó thực hiện các bước dưới đây
1. Điều hướng đến Mô-đun 'Time Dependancy'
2. Chọn 'Run at Specified Time'
3. Nhập ngày mà bạn muốn thực hiện
4. Nhập thời gian khi bạn muốn thực hiện test
5. Nhấp OK
![](https://images.viblo.asia/f76ade5d-8572-40d1-aeba-c90031a7ee4a.PNG)

Bước 9) Tab luồng thực thi sẽ được sắp xếp như dưới đây

Chú ý: Khi kế hoạch test được lên, ALM sẽ tự động chạy theo kế hoạch đó, điểu này sẽ dễ dàng khi thực hiện test tự động. 

Điều kiện để chạy tự động là máy chủ nên sẵn sàng (Không tắt hoặc không lock máy) 
![](https://images.viblo.asia/d7e1a10b-46a7-4c7c-a455-26c168aa3a38.PNG)

<Còn tiếp> Ở phần sau sẽ nghiên cứu về kết quả test

Tài liệu tham khảo: https://www.guru99.com/hp-alm-test-lab.html