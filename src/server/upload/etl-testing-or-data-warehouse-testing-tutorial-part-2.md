Trong bài viết trước chúng ta có những khái niệm cơ bản về kiểm thử ETL là gì. (https://viblo.asia/p/etl-testing-or-data-warehouse-testing-tutorial-part-1-6J3Zgn9PKmB) 
<br>
Phần 2 này sẽ nói thêm về những khía cạnh khác về kiểm thử ETL. Hãy cùng nhau tìm hiểu nhé!

<br>

Sau khi có testcase kiểm thử rồi thì hẳn là chúng ta sẽ phải quan tâm xem các loại bug sẽ tìm thấy là gì đúng không ạ. Dưới đây là bảng tổng hợp các loại bug trong kiểm thử ETL.
### Các loại bug ETL
![](https://images.viblo.asia/7eaee342-a9b9-40ca-855b-7d5afab222f5.png)


|Loại bug| Mô tả |
| -------- | -------- |
|User interface bugs/cosmetic bugs   |-  Liên quan tới GUI của ứng dụng <br> - Font style, font size, colorsLoại font chữ, kích thước font, màu sắc, căn chỉnh, lỗi chính tả, điều hướng, vv|
|Boundary Value Analysis (BVA) related bug   |Các giá trị min và max |
|  Equivalence Class Partitioning (ECP) related bug | Loại đúng và không đúng|
|  Input/Output bugs |- Các giá trị đúng không chấp nhận được <br> - Các giá trị sai chấp nhận được |
| Calculation bugs  |- Các lỗi toán học <br> - Kết quả cuối cùng sai |
|  Load Condition bugs |- Không cho phép nhiều người dùng <br> Không cho phép khách hàng tải dữ liệu như mong đợi |
| Race Condition bugs  | - Hệ thống bị chết và treo <br>-  Hệ thống không thể chạy trên nền tảng máy khách|
| Version control bugs  | - Không có logo phù hợp <br>-  Không có thông tin phiên bản <br> - Điều này thường xảy ra trong kiểm thử hồi quy|
|  H/W bugs | Thiết bị không đáp ứng với các ứng dụng |
|  Help Source bugs | Lỗi trong tài liệu Help|

### Sự khác nhau giữa kiểm thử CSDL và kiểm thử ETL



|Kiểm thử ETL  |Kiểm thử CSDL  |
| -------- | -------- | 
| Xác minh xem liệu dữ liệu có được di chuyển như mong đợi hay không |Mục tiêu chính là kiểm tra xem liệu dữ liệu có tuân theo các quy tắc / tiêu chuẩn được định nghĩa trong Mô hình dữ liệu hay không| 
| Xác minh xem số lượng dữ liệu nguồn và đích có khớp nhau không. Liệu chuyển đổi dữ liệu có như mong đợi hay không |Xác minh rằng không có bản ghi mồ côi nào và mối quan hệ giữa khóa chính và khóa phụ được duy trì| 
|Xác minh rằng mối quan hệ giữa khóa chính và phụ được bảo tồn trong ETL  |Xác minh rằng không có các bảng dự phòng và CSDL được chuẩn hóa 1 cách tối ưu| 
| Xác minh lặp dữ liệu trong quá trình tải dữ liệu |Xác minh xem liệu dữ liệu có bị thiếu ở những nơi yêu cầu hay không| 

### Trách nhiệm của một ETL tester
Các trách nhiệm chính của 1 ETL tester được chia làm 3 loại:

* Stage table/ SFS or MFS
* Logic chuyển đổi doanh nghiệp được áp dụng
* Tải dữ liệu từ bảng nguồn vào file hoặc bảng sang khi áp dụng chuyển đổi dữ liệu 

Một số trách nhiệm của 1 ETL tester là: 

* Kiểm thử phần mềm ETL
* Kiểm thử các thành phần của Kho dữ liệu ETL
* Thực hiện kiểm thử dựa trên dữ liệu phụ trợ
* Tạo, thiết kế và thực thi kiểm thử testcase, test plan và kiểm thử độ cứng
* Xác định các vấn đề và cung cấp các giải pháp cho các vấn đề tiềm ẩn
* Phê duyệt các yêu cầu và các thông số kỹ thuật thiết kế
* Truyền dữ liệu và kiểm thử tập tin phẳng
* Viết các câu truy vấn SQL cho các kịch bản khác nhau như kiểm thử đếm

### Điều chỉnh và kiểm thử hiệu suất ETL

Kiểm thử hiệu suất ETL là nhằm đảm bảo rằng một hệ thống ETL có thể xử lý tải các giao dịch và đa người dùng. Mục tiêu của điều chỉnh hiệu suất là tối ưu hóa hiệu suất các phiên làm việc bằng việc loại bỏ các tắc nghẽn hiệu suất.

Để điều chỉnh hay nâng cao hiệu suất của phiên làm việc, bạn phải xác định các tắc nghẽn hiệu suất loại bỏ chúng. Các tắc nghẽn hiệu suất có thể được tìm thấy trong CSDL nguồn và đích, bản ánh xạ, phiên làm việc và hệ thống. 

Một trong những công cụ tốt nhất được sử dụng cho việc kiểm thử hiệu suất là **Informatica.**
 
### Tự động hóa của kiểm thử ETL

Phương pháp chung của kiểm thử ETL là sử dụng tập lệnh SQL hoặc “eyeballing” dữ liệu. Các phương pháp tiếp cận kiểm thử ETL này tốn nhiều thời gian, dễ bị lỗi và hiếm khi đưa ra được phạm vi kiểm thử hoàn chỉnh. 

Để tăng tốc, nâng cao phạm vi kiểm thử, giảm chi phí, nâng cao tỷ lệ phát hiện khiếm khuyết của kiểm thử ETL trong môi trường production và development, tự động hóa là việc cần thời gian. Informatica là một  trong những công cụ như thế.


### Các thực hành tốt nhất đối với kiểm thử ETL

1. Chắc chắn dữ liệu được chuyển đổi một cách chính xác
1. Không có bất kỳ dữ liệu nào bị mất và các dữ liệu dự kiến được cắt ngắn nên được tải vào kho dữ liệu
1. Đảm bảo rằng ứng dụng ETL từ chối và thay thế bằng các giá trị mặc định và báo cáo dữ liệu không hợp lệ một cách thích hợp
1. Cần đảm bảo rằng dữ liệu được tải trong kho dữ liệu trong các khung thời gian quy định và như dự kiến để xác nhận khả năng mở rộng cũng như hiệu suất
1.  Tất cả các phương pháp nên có các kiểm thử đơn vị phù hợp bất kể tầm nhìn
1. Để đo lường hiệu quả của việc kiểm thử thì tất cả các kiểm thử đơn vị nên sử dụng các kỹ thuật bao phủ phù hợp
1. Nỗ lực cho một khẳng định chắc chắn đối với mỗi trường hợp kiểm thử
1. Tạo ra các kiểm thử đơn vị mà mục tiêu ngoại lệ

Bài dịch từ link: https://www.guru99.com/utlimate-guide-etl-datawarehouse-testing.html