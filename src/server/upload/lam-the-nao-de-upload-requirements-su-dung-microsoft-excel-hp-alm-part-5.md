Ở chương này chúng ta sẽ biết cách làm thế nào để upload requirements sử dụng Microsoft Excel

Đôi khi, người dùng sẽ không tạo yêu cầu theo cách thủ công mà sẽ muốn sử dụng tải tất cả các requirement thay vì tải từng cái một, đó là quá trình tốn thời gian.

Để tải lên ALM, HP đã đưa ra Admin để người dùng có thể tải trực tiếp MS excel / MS Word. lên.

Để tải requirements chúng ta cần hiểu luồng sau:

![](https://images.viblo.asia/e9ba18e8-3c9f-4476-a7fb-20695c71fcb6.PNG)

Part A - Tải về:

` Bước 1` Điều hướng tới trang chủ ALM http://localhost:8181/qcbin và click vào "Tools" từ danh sách của links.

![](https://images.viblo.asia/f420d92d-0d1e-4cb3-823a-8a77b6529eba.PNG)

` Bước 2 ` Click vào  "More HP ALM Add-ins" link từ trang add-ins như dưới:

![](https://images.viblo.asia/5e5e8575-9248-49db-bc46-1aa1a8ede3a3.PNG)

` Bước 3` Chọn 'Add-ins for Microsoft Applications' và chọn  'Microsoft Excel'  từ liên kết vì chúng tôi sẽ sử dụng bổ trợ MS Excel để tải dữ liệu lên HP-ALM

![](https://images.viblo.asia/a051e582-eb62-4f0a-b0b1-be677d7a8db7.PNG)

` Bước 4` Chọn HP-ALM Microsoft Excel Add-in cho ALM 12.00 link

![](https://images.viblo.asia/d374b702-c6da-4fab-91f6-e9cc979e4c63.PNG)

`Buoc 5` Chọn HP-ALM Microsoft Excel Add-in cho ALM 12.00 link. Người dùng có thể tham khảo hướng dẫn 'Read-me' và 'Add-in'. Sau đó click vào link, add-in sẽ được tải tới vị trí mặc định/vị trí người dùng đã chọn.

![](https://images.viblo.asia/e4b63d95-3564-4f55-9f9d-fdb2bb6dd4d9.PNG)

Part B – Cài đặt:

`Buoc 1` Chọn tải add-in và thực hiện chuột phải click vào tải file. Chọn 'Run as Administrator'

![](https://images.viblo.asia/7db06413-5e0d-40fd-8d67-1b0d1468deb4.PNG)

` Bước 2`  Chọn tải add-in và thực hiện nhấp chuột phải vào download file. Chọn 'Run as Administrator' vì vậy chúng ta có thể cài đặt Add-in

![](https://images.viblo.asia/b3dc3297-137d-45f3-8cfb-453f732b7cda.PNG)

` Bước 3` Chọn loại cài đặt. Ở đây chúng ta chọn 'For all user' là cài đặt mặc định. Nếu bạn mong đợi cài đặt chỉ cho người dùng hiện tại thì hãy chọn 'For Current User Only' và click 'Next'

![](https://images.viblo.asia/a8731651-f177-4e55-8722-9437238773cd.PNG)

` Bước 4` Khi người dùng hoàn thành cài đặt trạng thái message được hiển thị và sau đó nhấn vào 'Finish' button

![](https://images.viblo.asia/98ca1a64-5980-4c7e-808c-3df23fc84280.PNG)

` Bước 5` Để xác định nếu add-in cài đặt thành công, mở Excel và chuyển hướng tới 'Add-ins' Tab. Bạn sẽ tìm một lựa chọn 'Export to HP ALM' điều đó có nghĩa là 'add-in' đã cài đặt thành công.

![](https://images.viblo.asia/349f1a3d-321f-451b-9334-58b50af39d3e.PNG)

Part C – Yêu cầu tải lên ALM

` Bước 1` Trước khi tải lên requirements từ excel, chúng ta cần chuẩn bị Excel 

1. Chọn trường mà bạn mong đợi upload trong ALM và tạo header trong Excel để upload lên những trường này

2. Nhập dữ liệu hợp lệ vào từng trường như sau.

![](https://images.viblo.asia/e3bcbf10-07f8-4f12-a311-5a6a8b6d706b.PNG)

` Bước 2`Sau khi chọn dữ liệu để tải lên thì click 'Export to HP ALM'  từ  'Add-Ins' .

![](https://images.viblo.asia/e046cc2b-3814-4b5c-9b86-4b2536d6af76.PNG)

` Bước 3` Nhập HP ALM Server URL và click 'Next' khi ALM Export Wizard được mở

![](https://images.viblo.asia/6b6a0162-1d08-4c17-9fb2-03a07cc2cdad.PNG)

Nhập User name và password ở form dưới

![](https://images.viblo.asia/f4925760-1e21-4e57-9f42-36687ffaf3d5.PNG)

` Bước 4` Chọn Domain, tên project trong phần bạn muốn tải requirements sau đó click 'Next'

![](https://images.viblo.asia/9bfc6f6c-4336-47bb-83ce-324458a2dba2.PNG)

` Bước 5` Chọn loại dữ liệu bạn muốn tải, trong trường hợp này nó là Requirements chúng ta có thể upload Tests/Defects sẽ xử lý sau này

![](https://images.viblo.asia/74298ca9-fb27-41e0-945c-5e3f00d4c584.PNG)

` Bước 6` Nhập tên New Map. Lựa chọn đầu tiên ' Select a map' được hiển thị bởi vì chúng ta chưa tạo map. Do đó chúng ta nên tạo map mới và click 'Next'. Chúng ta chưa chọn 'Create a Temporary map' vì chúng ta muốn sử dụng lại mọi lúc để tải Requirements lên.

![](https://images.viblo.asia/988b8e71-3f9a-4a5e-a991-16c959a15110.PNG)

` Bước 7` Trong dialog này người dùng phần lớn chọn requirement type. Nếu chúng ta chỉ tải một loại requirement thôi thì chúng ta sẽ chọn 'Single Requirement Type'

![](https://images.viblo.asia/c34ec82f-8226-41ba-8f01-6307755619d1.PNG)

` Bước 8` Khi nhấn vào ' Next' Mapping dialog được mở và hiển thị như dưới:

Các mục bên trái được liệt kê với các trường tương ứng có sẵn cho upload trong HP ALM. Lưu ý là các trường được đánh dấu đỏ sẽ được ánh xạ vì chúng là các trường bắt buộc

Các mục bên phải tham chiếu đến các trường được ánh xạ để các giá trị trong Excel sẽ hiển thị vào các trường tương ứng của ALM

![](https://images.viblo.asia/b77e11e6-94d3-46df-a084-372a5aa1fb4e.PNG)

Nhập tên cột trong Excel tương ứng với tên cột thích hợp trong HP ALM

![](https://images.viblo.asia/a3205cb3-4769-440a-a24d-2b6341232df3.PNG)

Map tất cả các cột require trong excel dựa vào các trường thích hợp trong HP ALM. Sau khi ánh xạ tất cả các trường bắt buộc, hãy nhấp vào 'Export'

![](https://images.viblo.asia/9131d5d3-b30b-4bd8-8672-3d7b4b89d650.PNG)

` Bước 9` Sau khi hoàn thành tải lên, ALM sẽ hiển thị message được hiển thị như dưới. Nếu lỗi xuất hiện, vui lòng khắc phụ vấn đề và thử tải lại.

![](https://images.viblo.asia/6e797742-f5bd-437a-a4f6-429010961899.PNG)

` Bước 10` Bây giờ chúng ta hãy kiểm tra tương tự trong tab ' Requirement'. Tất cả các yêu cầu chi tiết bao gồm đính kèm được tải lên như dưới

![](https://images.viblo.asia/bdd4b5b4-898d-48e1-affd-24af8bc7969d.PNG)

Tài liệu tham khảo: https://www.guru99.com/hp-alm-requirements-specifications.html