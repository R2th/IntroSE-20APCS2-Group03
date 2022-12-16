**1. Scope của project**

Xác định các testcase chính xác, chia ứng dụng thành các phần nhỏ hoặc mô-đun và phân tích từng phần để đưa ra testcase thích hợp.

![](https://images.viblo.asia/3ff9f096-cc9c-4bfd-b649-aa67074f0f0e.jpeg)



 Step:

* Xác định các yếu tố sẽ tạo thành cơ sở để xác định testcase.
* Chia ứng dụng thành các mô-đun nhỏ
* Phân tích từng mô-đun để xác định các trường hợp thử nghiệm

**2.  Complexity của ứng dụng**

*  Xác định size ứng dụng dựa trên số lượng testcase.
*  Xác định verification point and checkpoint của từng trường hợp thử nghiệm.
Ở đây chúng ta phải thiết lập định nghĩa về ứng dụng lớn/vừa và nhỏ. Làm thế nào  phân loại, phụ thuộc vào số lượng các trường hợp thử nghiệm.

![](https://images.viblo.asia/e96e4946-7de1-4907-ba50-67e0fb3bae3b.jpeg)


Ví dụ:

Nếu ứng dụng của bạn có 300 - 500 trường hợp thử nghiệm để tự động hóa, bạn có thể coi đó là ứng dụng có size nhỏ. Nếu các trường hợp thử nghiệm hơn 1500, nó có thể được phân loại là phức tạp. Yếu tố này có thể khác nhau cho các ứng dụng khác nhau. Đối với một số dự án, 1500 trường hợp thử nghiệm để tự động hóa có thể được coi là quy mô nhỏ / vừa. Vì vậy, một khi bạn đã xác định chính xác số lượng trường hợp thử nghiệm hãy chia tỷ lệ. 

Bạn cũng phải xem xét checkpoints and verification points cho trường hợp thử nghiệm của mình. Một trường hợp thử nghiệm có thể có nhiều hơn 1 checkpoint nhưng sẽ chỉ có 1 verification point. Trong trường hợp bạn có nhiều hơn 1 verification point, bạn nên chia thành các trường hợp thử nghiệm riêng biệt. 

**3. Sử dụng các supporting tools/technologies**

* Xác định Framework 
* Dựa trên nhu cầu, phân tích và xác định các tool sẽ được sử dụng.


![](https://images.viblo.asia/24a3bf81-3d57-44fc-81c4-ee08748553ab.jpg)


**4. Triển khai Framework**

* Xác định input và output
* Thiết kế input file ( có thể từ 1 text file đơn giản đến excel file phức tạp)
* Design cấu trúc thư mục dựa trên các tham số đầu vào 
* Implement tính năng report 
* Implement tool cho framework
* Implement unit test 

Có nhiều yêu cầu khác ngoài việc tạo kịch bản trong automation test với Selenium, như đọc dữ liệu từ tệp, báo cáo / theo dõi kết quả kiểm tra, nhật ký theo dõi, kích hoạt tập lệnh dựa trên các điều kiện và môi trường đầu vào, v.v. 

Việc xây dựng Framework rất quan trọng. Nếu Framework của bạn vững chắc, việc bảo trì và update trở nên dễ dàng hơn, đặc biệt là trong mô hình Agile.

**5. Learning & Training**

Học Selenium khác một chút so với học bất kỳ công cụ tự động hóa nào khác. Về cơ bản, nó liên quan đến việc học ngôn ngữ lập trình thay vì chỉ là ngôn ngữ kịch bản (mặc dù ngôn ngữ kịch bản sẽ giúp trong khi xây dựng một framework như bạn muốn viết một tập lệnh sẽ gọi các tập lệnh tự động của bạn sau khi thực hiện thay đổi cài đặt môi trường).

Cùng với việc học java có thể học các công nghệ khác như ANT / Maven, TestNG / jUnit , v.v.


![](https://images.viblo.asia/ecd55780-ab1f-48e6-88a2-392bd1646460.jpg)


**6. Thiết lập môi trường**

*  Thiết lập mã trong môi trường thử nghiệm
*  Thiết lập mã trong production environment
*  Viết scripts để kích hoạt automation test
*  Thiết lập tần suất chạy các tập lệnh
*  Tạo tệp văn bản/excel để nhập dữ liệu thử nghiệm
*  Tạo tập tin để theo dõi môi trường

![](https://images.viblo.asia/79458398-9d74-4326-92c0-dd971e96e383.jpeg)


**7. Coding/scripting and review**

* Framework đã sẵn sàng
* Xác định action mà ứng dụng web của bạn làm. Nó có thể là các hành động đơn giản như điều hướng, nhập văn bản; hoặc một hành động phức tạp như kết nối với cơ sở dữ liệu, xử lý flash hoặc Ajax. Thực hiện một trường hợp thử nghiệm tại một thời điểm và xác định tất cả hành động mà trường hợp thử nghiệm cụ thể đó thực hiện và ước tính số giờ phù hợp cho mỗi trường hợp thử nghiệm. Tổng của tất cả các giờ cho toàn bộ bộ kiểm tra sẽ cung cấp cho bạn con số chính xác.


Trên đây là chia sẻ của mình về c7 yếu tố ảnh hưởng đến test estimation của selenium automation project. Cám ơn các bạn đã đọc, rất mong bài viết của mình có thể giúp đỡ phần nào những vướng mắc của các bạn!

Link tham khảo:  https://techblog.vn/cac-phuong-phap-estimate