**Open edx là gì?**

Open edX là một mã nguồn mở có sẵn các chức năng đáp ứng một mô hình đào tạo từ xa MOOC hoàn chỉnh. Là một nền tảng cho mọi nhu cầu học tập của bạn.

# 3.1 Tổng quan về Open edX
Open edX được xây dựng để đem lại những gì mới nhất trong khoa học nghiên cứu, thiết kế giảng dạy. Nền tảng Open edX được cải thiện từng ngày bởi cộng đồng các nhà phát triển, nhà cung cấp công nghệ, nhóm nghiên cứu và chính người sử dụng dịch vụ. Open edX là một nền tảng bao gồm nhiều dịch vụ khác nhau.

![](https://images.viblo.asia/0bb0a587-84f8-45d6-9fb4-c55dadeb3b99.png)

Open edX sử dụng nhiều công nghệ mới hiện nay:

* ubuntu, docker, cloud, S3
* Python - 80% sử dụng Python, Django
* Reactjs, Rest API

![](https://images.viblo.asia/af3404b5-2364-4200-b09b-367a879404fe.png)

Open edX LMS là dịch vụ cho phép người học tham gia học tập trong hệ thống. Giao diện dịch vụ Open edX LMS:

![](https://images.viblo.asia/fcb9a25f-9b3c-4dfa-954a-c42261c4bb10.png)

Open edX Studio là dịch vụ cho phép người dạy tạo và thiết lập các khóa học. Giao diện dịch vụ Open edx Studio:

![](https://images.viblo.asia/fb2922a2-d0e6-47ad-bf0c-b16d54d5af1a.png)

Open edX Insights là dịch vụ cung cấp dữ liệu về hoạt động và hiệu suất của người học trong tất cả các khóa học. Giao diện dịch vụ Open edX Insights:

![](https://images.viblo.asia/6fcea667-78d1-4fe1-ae6e-a458b04716ac.png)

# 3.2 Các phiên bản open edX
Dự án Open edX là nền tảng mã nguồn mở được thành lập và phát triển bởi MIT – Học viện công nghệ Massachusetts và Đại học Harvard vào năm 2012. Phiên bản đầu tiên là Aspen được công bố ngày 05/09/2014. Từ đó đến nay đã có 11 phiên bản đã được công bố.

![](https://images.viblo.asia/e0f1080a-b5f5-4db0-adc7-288c7f407b44.png)

Lilac là phiên bản mới nhất được công bố năm 2021. Các phiên bản edX được đặt tên theo thứ tự bảng chữ cái và theo tên của các loài thực vật. Chu kỳ phát hành giữa các phiên bản là 6 tháng.

Từ phiên bản Ginkgo về trước sử dụng Vagrant để triển khai hệ thống. Tuy nhiên, Vagrant đã từ rất lâu và khi cài đặt gặp nhiều lỗi nên từ bản Hawthorn đến các phiên bản hiện tại đã triển khai trên docker – cho phép triển khai ứng dụng trong các container ảo hóa.

Phiên bản Juniper được phát hành vào ngày 27/05/2020 là phiên bản mới nhất tại thời điểm tôi triển khai, nên hiện tại trên hệ thống đang cài đặt phiên bản Juniper. Có nhiều thứ thay đổi trong bản phát hành này, nhưng điểm nổi bật nhất là nâng cấp phần cốt lõi sử dụng Python 3 và Django 2. Khoảng 55% nền tảng Open edX được viết bằng Python, do đó phần lớn mã được viết trong vòng 8 năm qua đã được cập nhật để hỗ trợ Python 3. Ngoài ra có sự thay đổi về giao diện người dùng, thêm tính năng mới cho người học, và loại bỏ đi những thành phần không còn được sử dụng nữa.

# 3.3 Kiến trúc của Open edX
Open edX là một hệ thống dựa trên website để tạo, triển khai và phân tích các khóa học trực tuyến. Bao gồm các ứng dụng nhỏ hơn, các dịch vụ này là một tập hợp các dịch vụ web tự trị được triển khai độc lập (IDA), chúng giao tiếp với nhau bằng cách sử dụng các API.

![](https://images.viblo.asia/37445fc8-5a2d-4deb-9612-4dc95e224ae1.png)

Trọng tâm của kiến trúc Open edX là 2 dịch vụ: Dịch vụ học tập - Open edX LMS và dịch vụ quản lý khóa học - Open edX Studio. Đây cũng là hai dịch vụ mà người học và người dạy tương tác trực tiếp với hệ thống.

Open edX Studio là dịch vụ mà người dạy tạo và thiết lập các khóa học. Nội dung khóa học sau khi tạo sẽ được lưu vào cơ sở dữ liệu MongoDB. Sau đó người học sẽ tham gia vào các khóa học có trong dịch vụ Open edX LMS, nội dung khóa học sẽ được truy xuất từ cơ sở dữ liệu.

![](https://images.viblo.asia/9d874fbb-d638-46a7-8f9e-12303cc8ce21.png)

Khi người học tương tác với mỗi khóa học trong hệ thống bằng cách tham gia khóa học, xem video và các sự kiện có thể thu thập khác, thì các sự kiện tương tác này sẽ được thu thập và đưa sang công cụ phân tích dữ liệu – Open edX Insights để phân tích và lưu trữ.

![](https://images.viblo.asia/00f95e9f-4341-4c79-91ed-3266e5be8e66.png)

Người quản lý sẽ có báo cáo sau quá trình phân tích bằng các giao diện lập trình ứng dụng – Application Programming Interface (API) hoặc thông qua giao diện đồ họa trực quan cho phép họ biết được người học đang làm gì và các khóa học của họ đang được sử dụng như thế nào. Dựa trên nhưng thông tin phân tích này để đánh giá độ tập trung của người học.

-----

Done. Bài này là bài đầu thứ 3 trong chuỗi các bài về Open edx. Mời các bạn đón đọc số thứ 4 - cài đặt và link ở đây. Cảm ơn mọi người đã quan tâm.