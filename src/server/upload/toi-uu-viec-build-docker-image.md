![](https://images.viblo.asia/e0d7aee6-040e-4ea4-9de9-a76e167add79.png)

### **Cách build một Docker image?**

Khi chạy lệnh docker build sẽ thực hiện build một Docker image dựa trên những chỉ dẫn được định nghĩa trong Dockerfile. Dockerfile sẽ chứa những dòng lệnh được người dùng sắp xếp theo thứ tự để hình thành một Docker image.
Ví dụ về một Dockerfile:
```
FROM ubuntu:18.04
COPY . /app
RUN make /app
CMD python /app/app.py
```

Mỗi lệnh trong tệp này đại diện cho một lớp riêng biệt trong Docker image. Dưới đây là giải thích ngắn gọn về từng lệnh: 
* FROM tạo một lớp từ ubuntu: 18.04 Docker image 
* COPY thêm tệp từ thư mục hiện tại của client Docker  
* RUN xây dựng ứng dụng của bạn
* CMD chỉ định lệnh nào sẽ chạy trong vùng chứa
Bốn lệnh này sẽ tạo các lớp trong Docker image khi chúng được thực thi.

### **Tối ưu hóa quá trình build image**

Bây giờ chúng ta đã trình bày một chút về quy trình tạo Docker, tôi muốn chia sẻ một số lời khuyên tối ưu hóa để giúp build image một cách hiệu quả.

**Vùng chứa tạm thời**

Image được xác định bởi Dockerfile của bạn sẽ tạo ra các containers tạm thời. Các containers tạm thời có nghĩa là các containers có thể được dừng lại và phá hủy, sau đó được xây dựng lại và thay thế bằng một containers mới tạo, sử dụng thiết lập và cấu hình tối thiểu tuyệt đối. Containers tạm thời có thể được coi là dùng một lần. Mọi phiên bản đều mới và không liên quan đến các phiên bản containers trước đó. Khi build Docker image, bạn nên tận dụng càng nhiều containers tạm thời càng tốt.

**Không cài đặt package không cần thiết**

Tránh cài đặt các tệp và gói không cần thiết. Docker image nên càng mỏng càng tốt. Điều này giúp mang lại tính di động, thời gian build ngắn hơn, giảm độ phức tạp và kích thước tệp nhỏ hơn. Ví dụ, cài đặt trình soạn thảo văn bản vào vùng chứa là không bắt buộc trong hầu hết các trường hợp. Không cài đặt bất kỳ ứng dụng hoặc dịch vụ nào không cần thiết.

**Triển khai các tệp .dockerignore**

Tệp .dockerignore loại trừ các tệp và thư mục mà bạn đã khai báo bên trong nó. Điều này giúp tránh việc gửi các tệp và thư mục lớn hoặc nhạy cảm một cách không cần thiết tới daemon và có khả năng thêm chúng vào public image. Để loại trừ các tệp không liên quan đến bản dựng hãy sử dụng tệp .dockerignore. Tệp này hỗ trợ tương tự như tệp .gitignore.

**Sắp xếp các đối số nhiều dòng**

Bất cứ khi nào có thể, hãy giảm bớt các thay đổi sau này bằng cách sắp xếp các đối số nhiều dòng theo kiểu chữ và số. Điều này giúp tránh trùng lặp các packages và giúp danh sách cập nhật dễ dàng hơn nhiều. Điều này cũng làm cho dễ đọc và review hơn rất nhiều. Thêm khoảng trắng trước dấu gạch chéo ngược `\` cũng hữu ích.

Dưới đây là một ví dụ từ buildpack-deps của Docker trên Docker Hub:
```
RUN apt-get update && apt-get install -y \
  bzr \
  cvs \
  git \
  mercurial \ 
  subversion \
  && rm -rf /var/lib/apt/lists/*
```

**Tách các ứng dụng**

Trong một số trường hợp, các ứng dụng phụ thuộc vào các ứng dụng khác, chúng được lưu trữ trên cùng một máy chủ hoặc máy tính. Điều này phổ biến trong các triển khai container, nhưng đối với các dịch vụ nhỏ, mỗi ứng dụng nên tồn tại trong container của nó. Việc tách các ứng dụng thành nhiều container giúp dễ dàng mở rộng theo chiều ngang và tái sử dụng các container. Ví dụ: một ngăn xếp ứng dụng web được tách rời có thể bao gồm ba container riêng biệt, container chứa có image duy nhất của riêng nó: một để quản lý ứng dụng web, một để quản lý cơ sở dữ liệu và một cho bộ nhớ đệm trong bộ nhớ. . Sau đó, nếu các container phụ thuộc vào nhau, bạn có thể sử dụng mạng để đảm bảo rằng các container này có thể giao tiếp.

**Giảm thiểu số lớp**

Chỉ các lệnh RUN, COPY và ADD mới tạo ra các lớp. Các lệnh khác tạo image trung gian tạm thời và cuối cùng không làm tăng kích thước của bản dựng. Nếu có thể, chỉ sao chép mọi thứ bạn cần vào image cuối cùng. Điều này cho phép bạn bao gồm các tools và / hoặc debug trong giai đoạn xây dựng của bạn mà không làm tăng kích thước của image cuối cùng.

**Tận dụng bộ nhớ cache**

Trong việc build image, Docker thực hiện từng bước theo hướng dẫn trong Dockerfile của bạn, thực thi từng thứ theo thứ tự. Tại mỗi hướng dẫn, Docker tìm kiếm một image hiện có trong bộ nhớ cache của nó để sử dụng thay vì tạo một hình ảnh trùng lặp mới. Đây là quy tắc cơ bản mà Docker tuân theo:
> Bắt đầu với image mẹ đã có trong bộ nhớ cache, lệnh tiếp theo được so sánh với tất cả các image con bắt nguồn từ image cơ sở đó để xem liệu một trong số chúng có được tạo bằng cách sử dụng cùng một lệnh hay không. Nếu không, bộ nhớ cache bị vô hiệu.

Trong hầu hết các trường hợp, chỉ cần so sánh các lệnh trong Dockerfile với một trong các image con là đủ. Đối với lệnh ADD và COPY, nội dung của (các) tệp trong image được kiểm tra và tổng kiểm tra được tính cho mỗi tệp. Lần sửa đổi cuối cùng và lần truy cập cuối cùng của (các) tệp không được xem xét trong các tổng kiểm tra này. Trong quá trình tra cứu bộ nhớ cache, tổng kiểm tra được so sánh với tổng kiểm tra trong các hình ảnh hiện có. Nếu bất kỳ điều gì đã thay đổi trong (các) tệp, chẳng hạn như nội dung và siêu dữ liệu, thì bộ đệm ẩn sẽ bị vô hiệu.

Ngoài các lệnh ADD và COPY, kiểm tra bộ nhớ cache không xem xét các tệp trong container để xác định khớp với bộ nhớ cache. Ví dụ: khi xử lý lệnh cập nhật RUN apt-get -y, các tệp được cập nhật trong container sẽ không được kiểm tra để xác định xem có tồn tại lần truy cập bộ nhớ cache hay không. Trong trường hợp đó, chuỗi lệnh được sử dụng để tìm kết quả khớp.

Khi bộ nhớ cache bị mất hiệu lực, tất cả các lệnh Dockerfile tiếp theo sẽ tạo ra image mới và bộ nhớ cache không được sử dụng. Tận dụng bộ nhớ cache của bạn liên quan đến việc phân lớp image của bạn để chỉ các lớp thay đổi thường xuyên. Bạn muốn các bước RUN của mình thay đổi thường xuyên hơn về phía dưới cùng của Dockerfile, trong khi các bước thay đổi ít thường xuyên hơn nên được sắp xếp theo thứ tự ở trên cùng.