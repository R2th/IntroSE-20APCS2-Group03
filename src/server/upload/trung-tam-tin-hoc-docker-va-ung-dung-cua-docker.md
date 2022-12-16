Docker là một trong những phát triển tuyệt vời trong những năm gần đây trong lĩnh vực công nghệ thông tin. Docker đã mở ra một hướng mới cho các nhà phát triển phần mềm về xây dựng giải pháp và các kỹ thuật ứng dụng cho dự án mới. Docker giúp cho việc tổ chức, quản lý các môi trường lập trình được gọn gàng hơn, dễ dàng hơn.

## Docker là gì?

Docker là công cụ giúp bạn tạo Container đóng gói tất cả những thư viện, phần mềm... cần thiết cho ứng dụng. Có thể xem như container là “máy tính” bên trong máy tính và bạn có thể tạo sẵn các môi trường này và chia sẻ với người khác (Images). Docker images và containers nhanh chóng trở thành công cụ hỗ trợ đắt lực cho nhà phát triển phần mềm.

![](https://images.viblo.asia/8e90664d-b3df-4fd8-b174-d988afa6877c.png)https://images.viblo.asia/8e90664d-b3df-4fd8-b174-d988afa6877c.png

Hiện nay, mọi thứ đều có thể được docker hóa (dockerized). Bạn có thể tìm thấy Docker image cho tất cả các nhu cầu mà bạn cần. Nếu không tìm thấy, bạn có thể tự tạo một Docker image phù hợp với nhu cầu của mình. Và bây giờ, chúng ta đã có thêm 1 Docker image nữa đáp ứng cho nhu cầu mới.

## Docker có phải là giải pháp ảo hóa? 

Khi tìm hiểu về Docker, thì các bạn có thể thấy điểm tương đồng giữa các giải pháp về ảo hóa với Docker. Tuy nhiên, giữa ảo hóa và Docker có những điểm khác biệt và mỗi giải pháp có thể ứng dụng cho các mục đích khác nhau.
Các giải pháp về ảo hóa sẽ giúp tạo ra các máy ảo (Virtual machine). Virtual machine (VM) là một hệ thống giả lập của một máy tính dựa trên phần cứng của máy tính. Trên VM, chúng ta có thể cài đặt hệ điều hành và các phần mềm cần thiết cho các yêu cầu sử dụng cụ thể. Hệ điều hành và các phần mềm sẽ chia sẻ tài nguyên phần cứng của máy tính cài phần mềm tạo VM. Phần mềm dùng để quản lý và tạo các máy ảo được gọi là Hypervisor.

![](https://images.viblo.asia/94f340db-fd7d-4a08-810c-9d239c78fb4c.png)https://images.viblo.asia/94f340db-fd7d-4a08-810c-9d239c78fb4c.png

Trong khi các VM được tạo ra khi ảo hóa toàn bộ máy tính thì Docker Containers chỉ ảo hóa hệ điều hành của máy chủ (Host). Mỗi Container chia sẻ nhân của hệ điều hành và các thư viện trên máy Host. Những thành phần được chia sẻ giữa máy Host và các Containers ở trạng thái chỉ đọc. Việc chia sẻ nhân của hệ điều hành và các thư viện giúp cho máy Host có thể chạy được nhiều Containers và sử dụng ít tài nguyên trên máy Host. Nhờ vào việc chia sẻ này mà kích thước của các Containers rất nhẹ, thậm chí chỉ vài chục Megabytes và thời gian khởi động chỉ vài chục giây. Với kích thước nhỏ gọn như vậy nên các tập tin ảnh của Docker Containers (hay còn gọi Docker Images) sẽ được chia sẻ dễ dàng thông qua các hệ thống Docker Registry công cộng (như Docker Hub, Google Container Registry, Amazon ECR,…) hoặc các Docker Registry cục bộ (do các doanh nghiệp tự xây dựng). Chính nhờ điều này mà Docker được sử dụng ngày càng rộng rải trong nhiều lĩnh vực khác nhau như phát triển phần mềm, kiểm thử phần mềm, machine learning, data science, system administration và các hệ thống cung cấp dịch vụ.

![](https://images.viblo.asia/16e913a1-45a5-4260-a756-3f7670ecd86f.png)

## Ứng dụng Docker

Với Machine Learning và Data Science, Docker sẽ hỗ trợ cho việc xây dựng các Container mà trong đó có chứa các thư viện, gói phần mềm cần thiết cho việc học tập, nghiên cứu các dự án về Machine Learning và Data Science. Các Container này có thể được đóng gói thành các Images và chia sẻ cho những người có nhu cầu nghiên cứu và học tập về Machine Learning và Data Science một cách nhanh chóng. Chính nhờ điều này sẽ giúp cho các nhóm nghiên cứu phối hợp làm việc với nhau dễ dàng hơn nhờ một hệ thống các phần mềm và thư viện chuẩn và thống nhất. Việc cập nhật các thư viện, phần mềm trong các Docker Images cũng được thực hiện dễ dàng.
Ngoài ra, Docker cũng có thể được ứng trong các môi trường phát triền phần mềm khác như ASP.NET Core, Python, Java,... Việc sử dụng Docker cho phát triển phần mềm có thể giúp tạo ra môi trường sạch cho việc phát triển và kiểm thử phần mềm. Nhờ vậy sẽ giảm thiểu các lỗi phần mềm do không đồng nhất các thư viện giữa các thiết bị dùng để phát triển và kiểm thử.
Bên cạnh việc tạo môi trường sạch cho việc phát triển và kiểm thử, Docker cũng được sử dụng trong chu trình tích hợp và phân phối phần mềm (Continuous Integration/Continuous Deployment).
Continuous Integration/Continuous Deployment (CI/CD) là chu trình biên dịch, kiểm thử tích hợp và phân phối phần mềm một cách tự động. CI/CD sẽ giúp cho các nhà phát triển phần mềm sớm phát hiện các lỗi tích hợp của phần mềm để khắc phục và tạo sự gắn kết giữa các nhà phát triển phần mềm. Quá trình biên dịch, kiểm thử và phân phối tự động được thực hiện định kỳ sẽ giúp giảm thiểu các lỗi của quá trình phát triển phần mềm.

![](https://images.viblo.asia/16e1c130-4a8a-4564-954d-145097736684.png)https://images.viblo.asia/16e1c130-4a8a-4564-954d-145097736684.png

Docker có thể được ứng dụng để triển khai hệ thống CI/CD bằng cách hỗ trợ cho các nhà phát triển phần mềm phối hợp biên dịch thông qua các Docker Images được chia sẻ trên các nên tảng khác nhau (Windows hoặc Linux). Docker cho phép tích hợp các công cụ CI thông dụng hiện nay như Teamcity, Jelkins, Gitlab CI,…vào trong các Images. Sau khi phần mềm được biên dịch và  khắc phục được các lỗi thì sẽ được phân phối vào các Containers để kiểm thử chức năng của phần mềm. Việc kết hợp giữa CI/CD với Docker sẽ tạo ra môi trường thống nhất để biên dịch, kiểm thử và phân phối phần mềm.
Ngoài các ứng dụng của Docker cho việc phát triển phần mềm, Docker còn được ứng dụng cho việc thử nghiệm, triển khai các dịch vụ trong môi trường mạng. Các nhà quản trị mạng có thể cài đặt và cấu hình các dịch vụ cần thiết vào trong các Containers và đóng gói thành các Images. Sau đó các Images này sẽ được dùng để triển khai và mở rộng các dịch vụ mạng một cách nhanh chóng.

Theo  [Trung Tâm Tin Học ĐH KHTN](https://csc.edu.vn/)