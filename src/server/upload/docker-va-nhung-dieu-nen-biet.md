### I. Giới thiệu.

- Docker là chương trình máy tính thực hiện operating-system-level virtualization, hay còn được gọi là “containerization”.
- Một công cụ phổ biến để giúp xây dựng, triển khai và chạy các ứng dụng bằng cách sử dụng các container. Các container cho phép đóng gói tất cả những thứ mà ứng dụng cần như thư viện hay package gửi tất cả dưới dạng một package (package này là của docker). Theo cách này, ứng dụng có thể chạy trên bất kỳ máy nào mà không cần máy đó cài đặt environment, thư viện hay package.
- Không phải là một virtual machine (máy tính ảo) viết tắt VM.
- Không giống với VM, docker không yêu cầu hay bao gồm một hệ điều hành tách biệt. Thay vào đó nó dựa trên chức năng của kernel và sử dụng tài nguyên cách ly từ cpu, memory và namespaces tách rời để tách biệt application's view của hệ điều hành.
- Dưới đây là hình mô tả giữa VM và container

![](https://images.viblo.asia/5f42c633-4363-43c2-bd3a-e2523b27c5bc.jpeg)

- Như trong hình, docker hoạt động đơn giản hơn so với VM, vì vậy t có thể tránh được các trường hợp về chi phí bảo trì VM.
### II. Vì sao sử dụng docker?
- Khi một project được đưa lên server, kể cả là môi trường development, staging hay product, việc đầu tiên chúng ta luôn luôn phải làm là cài các công cụ, môi trường để phục vụ cho project đó chạy thành một application và bạn cũng thấy nó cực kì phiền phức, nhiều khi còn quên mất một số env quan trọng để làm app chạy, cái là lại vò đầu bức tóc để tìm lỗi :v
- Thế nên docker được sinh ra. Nó đơn giản là đã được gói thành 1 cục, và việc của bạn là quăng nó lên trên server, chạy nó và tận hưởng app
- À nó cũng giải quyết câu nói hay ám ảnh nhất khi một người mới vào thường hay có "sếp ơi, em cần 1 ngày để setup cái này, cần 1 tuần để setup cái kia"
- Cạch cạch vài phát với docker là bạn có sẵn các thứ cần thiết để chạy :v
### III. Lợi ích của docker
- Không như máy ảo, docker chỉ cần mất khoảng 1 đến 2 dây để start hay stop.
- Có thể chạy trên hầu hết mọi loại hệ thống mà bạn cần.
- Gỡ bỏ cực kì nhanh và cực kì sạch sẽ, không làm ảnh hưởng tới các phần khác.
- Chỉ cần config 1 lần và bạn có thể đem đi muôn nơi :v
- Không cần phải làm doc hướng dẫn cài đặt môi trường, cần những gì, chỉ cần quăng cái config và một chút kiến thức về docker là chạy được.
- Đối với 1 dự án, việc test là việc không thể thiếu, nhưng có những chức năng cực kì nặng và tốn nhiều thời gian, có khi ngồi chơi cả ngày mà chỉ để đợi test cho xong một chức năng :v (ví dụ như chức năng về việc download file csv nặng, ...). Đối với docker, bạn chỉ cần tách nó ra thành nhiều image, và cho nó chạy các chức năng cùng lúc (cái này được gọi là test song song)
### IV. Nhược điểm
- Tuy có nhiều điểm tốt là vậy, nhưng có tốt thì phải có xấu, và xấu ở đây lại nằm ngay ở tính an toàn của nó.
- Vì sao lại nói như vậy, bạn hãy tưởng tượng, khi ta có hàng chục container cùng chạy trên một hostOS là linux, khi ai đó có được quyền superUser, điều gì sẽ xảy ra? Về lý thuyết là họ có mọi quyền truy cập vào các container khác trong hostOS.
- Và vì dùng chung OS nên nếu karnel có lỗ hỏng bảo mật thì hostOS đó cũng dính chưởng, nó sẽ làm ảnh hưởng tới toàn bộ container trong nó.
- Không phải app nào củng containerized được.
- Số lượng container càng lớn thì càng phức tạp.
### V. Khác biệt giữa docker image và docker container
1. Docker image
    - Là một template chỉ cho phép đọc, ví dụ một image có thể chứa hệ điều hành Ubuntu và web app chạy bằng nodejs.
    - Image được dùng để tạo Docker container. Docker cho phép chúng ta build và cập nhật các image có sẵn một cách cơ bản nhất, hoặc bạn có thể download Docker images của người khác.
    - Nói chung image giống như là việc bạn đóng gói hàng mẫu, rồi quăng đi mọi nơi, những nơi khác có dây chuyền sản xuất y thế chỉ cần làm y chang là ra thành phẩm.
2. Docker container
    - Có nét giống với các directory.
    - Có mọi thứ chúng ta cần để chạy một app.
    - Được tạo từ docker image.
    - Gồm các status: run, started, stopped, moved và deleted.
### VI. Kết
- Trên đây là một số tổng hợp của mình về docker, và vì trên mạng đầy những bài viết về cách tạo một docker nên mình cũng không thêm vào trong này
- Docker tuy hay nhưng cũng không thể lúc nào cũng dùng, nên biết khi nào cần dùng và khi nào không để có thể tối đa hiệu suất công việc