Sau khi xác định yêu cầu xong đội phát triển bắt đầu thiết kế và thực hiện viết code chương trình, ở giai đoạn này đội kiểm thử cũng thực hiện viết kịch bản và có thể thực hiện test bản build đầu tiên

Thành công của bất kỳ sản phẩm nào đều phụ thuộc vào quy trình và chất lượng kiểm thử 

Một kế hoạch kiểm thử tốt dẫn đến một sản phẩm ít lỗi

ALM hỗ trợ bảo trì và thực hiện các bài kiểm tra thủ công, tự động hóa và hiệu suất vì ALM được tích hợp hoàn hảo với tất cả các sản phẩm của HP như HP UFT và HP Load Runner.

![](https://images.viblo.asia/25599330-6ab3-4ff3-a79c-3a37a7f669a4.PNG)

Trong lần này chúng ta sẽ học các nội dung:

* Làm thế nào để tạo Test Plan
* Làm thế nào để tải Tests sử dụng Microsoft Excel
* Làm thế nào để tạo tài nguyên Test 

Bước 1) Tương tự requirements, nào bây giờ chúng ta sẽ tạo một placeholder/folder cho mỗi một loại test như Functional và Non Functional
1. Click vào Test Plan link từ trang chủ ALM 
2. Click 'New Folder' Icon
3. Nhập tên thư mục như 'Functional' và click 'OK'

![](https://images.viblo.asia/62f6b1a2-2f6c-42ff-a0bf-3ef3f25a630c.PNG)

Bước 2) Tạo thư mục sẽ hiển thị như dưới đây:
![](https://images.viblo.asia/4667d7d8-f2b2-4b73-ab47-10e6c207c459.PNG)

Bước 3) Tương tự, chúng ta hãy tạo các thư mục con cho  'Manual' và 'Automated'  trong Thư mục 'Functional'. Do đó, cấu trúc thư mục cuối cùng sẽ như dưới đây:
![](https://images.viblo.asia/8c0041dd-37f2-4ee0-965a-55cc9621cd42.PNG)

Bước 4) Tạo một thư mục cho mỗi modules của ứng dụng để lưu trữ tất cả manuals test trong một thư mục. Đối với các ứng dụng phức tạp sẽ có hàng ngàn kịch bản test do đó sẽ rất khó xử lý nếu chúng ta không sắp xếp quy củ. Một ví dụ tạo thư mục cha con như dưới đây.
![](https://images.viblo.asia/df9b854d-136b-4822-83c9-45d7525834cb.PNG)

Bước 5) Sau khi tạo xong thư mục Manual test thì bây giờ chúng ta sẽ tạo manual test cho module 'Login' bằng cách click vào 'New Test' icon trong 'Test Plan' Tab
![](https://images.viblo.asia/7d8769fb-400d-48b2-a123-a35fd924cf8e.PNG)

Bước 6)  Nhập chi tiết để việc tạo new test thành công
+ Nhập New test Name
+ Nhập loại Test. Trong trường hợp này nhập 'Manual' Test
+ Người dùng cũng có thể nhập các trường không bắt buộc khác như ngày, Mô tả như bên dưới.
+  Nhấp vào 'Gửi' khi tất cả các chi tiết được nhập.
![](https://images.viblo.asia/5adc40c8-763a-40c1-bc3b-234424157779.PNG)


Bước 7) Sau khi tạo xong 'Login Test' sẽ hiển thị ở dưới thư mục 'Manual' test với các tab khác được tạo như hiển thị phía dưới.
![](https://images.viblo.asia/69b61ea7-01f7-44af-a342-4fd2e8ee4b84.PNG)

Bước 8) Click chọn 'Design Steps' tab và nhấp vào biểu tượng ' New Step' hộp thoại chi tiết mở ra và được hiển thị như bên dưới

+ Nhập tên Step
+ Nhập mô tả
+ Nhập kết quả mong đợi
+ Nhấp vào 'OK'
![](https://images.viblo.asia/9e5750b4-59a3-4f23-8e2e-00b8649f2970.PNG)

Bước 9) Làm lại Bước 6 và nhập tất cả các bước có liên quan để kiểm tra chức năng. Sau khi tạo tất cả các bước yêu cầu, 'Design Steps' tab hiển thị tất cả nội dung đã tạo như dưới đây
![](https://images.viblo.asia/435413ba-8ea1-4045-89a5-ae86e26ca251.PNG)

Bước 10) Parameters, giúp người dùng gán giá trị cho một biến, cho phép người dùng thực hiện test với các bộ dữ liệu khác nhau. Trong trường hợp này, user name và password là 2 tham số sẽ được gán với một giá trị.

Bây giờ chúng ta sẽ biết cách làm thế nào tạo một parameters
1. Chọn bước kiểm tra muốn thêm tham số.
2. Biểu tượng 'Parameter' sẽ được bật . Nhấp vào sẽ hiển thị như hình dưới đây
![](https://images.viblo.asia/975277f9-ac31-4d34-bfe5-ce550da3a2bc.PNG)

Bước 11) Parameter dialog sẽ hiển thị như dưới đây. Chọn 'New Parameter' button
![](https://images.viblo.asia/d5f1ca7c-d903-4394-80ca-6341713359f3.PNG)

Bước 12) Chi tiết parameter được hiển thị ở dưới
1. Nhập tên parameter
2. Gán một giá trị cho tham số
3. Nhấp vào 'OK'

![](https://images.viblo.asia/6b5e3374-dd7c-4f12-b3a1-75fcfc9e0600.PNG)

Bước 13) 'parameters' dialog hiển thị trở lại cho người dùng
1. Với tham số đã tạo
2. Giá trị
3. Click 'OK'.
![](https://images.viblo.asia/77c41c26-e05a-43fc-bf59-77e283b43d2e.PNG)

Bước 14) Nào bây giờ chúng ta có thể nhận thấy rằng tham số được thêm vào trong 'Test Step' sẽ như hiển thị bên dưới
![](https://images.viblo.asia/3e27b963-156e-440b-a000-f1406de19e4f.PNG)

Bước 15) Parameters đã được tạo có thể xem/sửa trong tab parameters. Hộp thoại này giúp người dùng tạo, sửa, xóa parameter
![](https://images.viblo.asia/a1e4fa4a-dcb2-47c4-9875-ff8c7f50f6f4.PNG)

Bước 16) Tab đính kèm cho phép người dùng tải lên bất kỳ loại tệp nào, chẳng hạn như 'xls', 'jpg', v.v.
![](https://images.viblo.asia/83c0cc11-7454-4bd2-b7d0-d06347c92226.PNG)

Sẽ còn các bước tiếp theo ở phần sau.

Tài liệu tham khảo: https://www.guru99.com/hp-alm-test-plan-module.html