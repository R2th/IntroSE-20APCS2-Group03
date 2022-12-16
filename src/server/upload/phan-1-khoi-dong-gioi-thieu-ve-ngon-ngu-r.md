Một vấn đề phổ biến với người học lập trình nói chung và những người quan tâm đến R language là họ không biết bắt đầu từ đâu và học như thế nào khi nó còn khá mới (so với các ngôn ngữ lập trình phổ biến khác). Vậy nên bắt đầu từ đâu, nên học những gì và cần khám phá những chủ đề nào? Nếu bạn cũng có chung những câu hỏi đó, series này sẽ là một lựa chọn tốt để giải đáp những câu hỏi kể trên. Mình sẽ đề cập đến nội chủ đề liên quan đến lập trình R từ cơ bản đến nâng cao và ví dụ cụ thể cho tất cả mọi người dù bạn chỉ là newbie hoặc dù cho bạn có là "master" R đi chăng nữa. 

OK. let's get started!
![R language](https://images.viblo.asia/07721939-f1c6-4111-adb4-8c5e59c1cd8f.png)
## Giới thiệu tổng quát về ngôn ngữ R
R là một ngôn ngữ lập trình mà nhiều nhà phân tích dữ liệu, nhà khoa học dữ liệu, nhà thống kê sử dụng cho mục đích phân tích dữ liệu và thực hiện phân thích thống kê bằng biểu đồ và các công cụ trực quan khác. Qua việc sử dụng R, người ta có thể phân tích các bộ dữ liệu lớn(big data) . R đang nổi lên như là một ngôn ngữ mang nhiều tiềm năng và ngày càng mở rộng với hàng ngàn gói (packages) cung cấp cho nhiều ứng dụng.
![R introduction](https://images.viblo.asia/023dffdb-5968-4e3c-9f3a-b5d83789485c.jpg)
Bạn có thể đọc thêm giới thiệu chi tiết về R tại [bài viết này](https://viblo.asia/p/r-la-gi-nhung-ly-do-ban-nen-bat-dau-hoc-ngon-ngu-lap-trinh-r-6J3ZgBRgKmB)
## Lịch sử của ngôn ngữ R
John Chambers và các cộng sự đã phát triển R tại phòng thí nghiệm Bell. R là một phần mở rộng của ngôn ngữ lập trình S(short of Schema). Dự án phát triển R bắt đầu vào năm 1992, phiên bản ban đầu của nó được release năm 1995 và bản beta được release năm 2000.

## Vì sao chọn học ngôn ngữ R?
Sau đây mình liệt kê các lý do để chọn học ngôn ngữ R:
![WhychooseR](https://images.viblo.asia/62f359fd-de69-4e64-936c-17963672684b.jpg)
* Chúng ta có thể sử dụng ngôn ngữ lập trình R nhưng một công cụ chuẩn cho hoạt động học máy (Machine Learning), thống kê cũng như phân tích dữ liệu. Các đối tượng, hàm, và packages dễ dàng được tạo bởi R. Thêm vào đó, nó độc lập với nền tảng cũng như là miễn phí. Vì vậy, ai cũng có thể cài đặt mà không cần phải trả bất kí loại phí nào. Còn nữa, nó cũng có thể chạy trên tất cả các hệ điều hành phổ biến như: Windows, Mac, Lunix
* Ngôn ngữ lập trình R không đơn thuần chỉ là một package thống kê, nó còn cho phép chúng ta tích hợp với các ngôn ngữ khác(C, C++). Do đó, bạn có thể làm việc mới một số source dữ liệu cũng như các package thống kê. Và kết quả là nhờ đó mà R có cộng đồng người dùng ngày càng lớn nhất là khi AI, Machine Learning hay Deep Learning đang cực hot.
## R - sự lựa chọn hoàn hảo cho công việc kinh doanh
R là lựa chọn tốt nhất cho công việc kinh doanh bởi nó là một công cụ mã nguồn mở. Ngoài ra, R có nhiều tính năng tốt hơn so với các công cụ tương tự. Các công ty đang dùng R để làm nền tảng chính cho việc làm việc với dữ liệu và khai thác sức mạnh dữ liệu. Do đó, họ đang rất cần nhân lực có kiến thức cũng như kinh nghiệm với ngôn ngữ R.
## Cơ hội việc làm ngôn ngữ R
Các công việc cần sử dụng đến R không chỉ liên quan đến các công ty CNTT mà tất cả các công ty đang tuyển dụng R, nổi bật trong số đó là:
* Công ty tài chính
* Các tổ chức bán lẻ
* Ngân hàng
* Các tổ chức y tế, chăm sóc sức khỏe,...

Các vị trí tuyển dụng liên quan đến R bao gồm:
* Nhà Khoa học dữ liệu R
* Nhà khoa học dữ liệu (R)
* Giám đốc phân tích
* Chuyên viên phân tích dữ liệu
* Phân tích kinh doanh
* Tư vấn phân tích
## Cài đặt R và R Studio trên Linux
Có 3 bước cơ bản sau để có thể chạy R và R Studio trên máy tính của bạn
* Cài đặt R 

Đầu tiên chúng tai tải R-base, bạn có thể tải R-base từ Ubuntu Software Center, nhưng như đều bị outdate, nên thôi để chắc chắn chúng ta sẽ tải từ repo

`sudo echo "deb http://cran.rstudio.com/bin/linux/ubuntu xenial/" | sudo tee -a /etc/`

`gpg --keyserver keyserver.ubuntu.com --recv-key E084DAB9`

`gpg -a --export E084DAB9 | sudo apt-key add -`

`sudo apt-get update`

`sudo apt-get install r-base r-base-dev`

* Cài đặt R Studio

`sudo apt-get install gdebi-core`

`wget https://download1.rstudio.org/rstudio-1.0.143-amd64.deb`

`sudo gdebi -n rstudio-1.0.143-amd64.deb`

`rm rstudio-1.0.143-amd64.deb`

Giao diện khi cài đặt R Studio thành công:
![Rstudio](https://images.viblo.asia/c53b6fd7-119e-4e06-98b2-28f532dbd311.png)

Bạn có thể chỉnh màu background từ màu trắng sang màu tối để đỡ chói mặt bằng cách click vào tab `Tool` -> `Global options...` -> Appearance và customize theo ý thích:

![Rstudio_appearance](https://images.viblo.asia/aee0e1e3-7186-46f1-8090-7f831563e886.png)
* Cài đặt R Packages:
Trong Rstudio, nếu bạn cần sử dụng một thư viện cụ thể bạn phải làm theo chỉ dẫn như sau:
1. Chạy R Studio
2. Sau khi click vào tab `Tools`, chọn `Install Packages...`, hộp thoại như sau sẽ xuất hiện, bạn điều tiên của packages mà bạn muốn cài đặt vào input box, sau đó click `Install`. Rstudio sẽ tiến hàng cài đặt package mà bạn tìm kiếm hoặc cho bạn một list các package khớp với tên dựa với tên bạn nhập.

![install packages](https://images.viblo.asia/974bb6ab-9c85-462c-8a60-7a6632d55fcb.png)
## Tổng kết
Thông qua một số giới thiệu tổng quan về các khía cạnh chính của R nói trên, hy vọng bạn đã hiểu một phần nào về ngôn ngữ R. Hi vọng sẽ gặp lại bạn trong các bài viết tiết theo trong chuỗi các bài viết hướng dẫn học ngôn ngữ lập trình R.

Bài viết được tham khảo từ website [Data Flair](https://data-flair.training/blogs/r-programming-language/)