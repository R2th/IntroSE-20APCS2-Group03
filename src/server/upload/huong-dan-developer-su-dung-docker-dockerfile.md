Tạo ra một môi trường nhất quán các môi trường development, **test**, **staging** và **production** là một trong những lợi ích lớn của việc sử dụng các **container**. Các Container không chỉ làm cho toàn bộ môi trường trở nên linh hoạt, chúng loại bỏ các vấn đề môi trường cụ thể như, "Tại sao nó hoạt động trong **test**, nhưng không phải trong **production**?" Thông thường, đó là một **package** hoặc **framework** được cài đặt trên server **test** không bật server **production**. **Container** chứa tất cả những phụ thuộc với chúng, giảm thiểu khả năng cho những vấn đề đó. Để giúp tạo **Container** nhất quán, bạn cần một **image** được cấu hình trong **Dockerfile**.

Một **Dockerfile** (không có phần mở rộng) chỉ đơn giản là một tập tin văn bản với một số từ khóa và quy tắc mà **Docker** sử dụng để tạo ra một **image**. Sau đó, image đó được sử dụng để tạo vùng chứa hoặc nhiều vùng chứa1 hoặc nhiều **Container** có cùng thiết lập. Trong bài viết này, mình sẽ hướng dẫn tạo một Dockerfile mà bạn sẽ sử dụng để tạo một hình ảnh cho một ứng dụng web cơ bản.

# Bắt đầu với Docker Image cơ bản
Bạn sẽ tạo một **image** **Docker** dựa trên **image** **Docker** khác. Dòng FROM cho Docker biết **image** cơ sở nào bạn muốn sử dụng để xây dựng image mới của bạn. Đây phải là dòng đầu tiên của Dockerfile, bạn có thể có các comments ở trên nó, nhưng không có lệnh nào khác. Trong trường hợp này, bạn sẽ bắt đầu từ nút chính thức: **node:8.4**. Vì vậy, hãy tạo một tệp có tên là **Dockerfile** trong thư mục gốc của ứng dụng và thêm dòng FROM ngay dòng đầu tiên:
```
FROM node:8.4
```
Điều này cho Docker biết rằng chúng ta muốn bắt đầu từ **image node** chính thức được gắn thẻ với phiên bản 8.4. Điều này đi kèm với một cơ sở hệ thống Linux (trong trường hợp này Debian Jessie), và thêm Node và NPM vào **image**.
# Đưa ứng dụng vào Image
Tiếp theo, bạn sẽ chạy một số lệnh để đưa ứng dụng của bạn vào **image** bạn đang tạo.
```
COPY . /app
```
Lệnh COPY này chỉ sao chép các files từ thư mục hiện tại vào một thư mục có tên /app bên trong **image** bạn đang tạo.
Tiếp theo, bạn sẽ đặt thư mục /app trong Dockerfile.
```
WORKDIR /app
```
Điều này cho Docker biết rằng các lệnh còn lại sẽ được chạy trong ngữ cảnh của thư mục /app bên trong **image**. Tiếp theo, bạn sẽ thêm lệnh RUN để nhận **dependences** của ứng dụng:
```
RUN ["npm", "install"]
```
Kiểu lệnh RUN này trong một Dockerfile được gọi là “exec form”. Bạn có thể viết các lệnh này dưới dạng “shell form”, như sau:
```
RUN npm install
```
 Bạn có thể sử dụng lệnh SHELL để thay đổi **avoid** mà một lệnh shell form sẽ chạy.

Nhìn chung, lệnh này sẽ khôi phục tất cả các gói NPM cho project của bạn.
# Hiển thị và chạy ứng dụng của bạn
Tiếp theo, bạn sẽ mở port 3000
```
EXPOSE 3000/tcp
```
Cuối cùng, bạn sẽ chạy ứng dụng trong **Container**. Hãy nhớ rằng Docker có nghĩa là 1-1, container để ứng dụng, vì vậy khi xây dựng **container** này, chúng ta chỉ có một lệnh mà chúng ta muốn chạy để ứng dụng của chúng ta chạy trong vùng chứa. Để làm điều này, chúng ta cần chạy một lệnh CMD. Bất cứ điều gì được chạy bởi lệnh CMD sẽ được chạy tại Process ID 1 (PID1) trong container. Miễn là bất cứ điều gì chạy tại PID1 trong container đang chạy, container đang chạy.
```
CMD ["npm", "start"]
```
Toàn bộ **Dockerfile** của bạn dài 6 dòng. Dòng FROM bắt đầu từ một **base image** cung cấp cho bạn hầu hết những gì bạn cần, sau đó sao chép mã của bạn vào **image** và chạy một vài lệnh để nhận **dependences** và biên dịch ứng dụng. Sau đó mở cổng 5000.
# Xem lại Dockerfile
Nội dung của Dockerfile khi đã hoàn thành:
```
FROM node:8.4

COPY . /app

WORKDIR /app

RUN ["npm", "install"]

EXPOSE 3000/tcp

CMD ["npm", "start"]
```
Tại thư mục chứa Dockerfile, chỉ cần chạy:
```
docker build -t tutorial:0.0.1 .
```
Cũng giống như khi pull image từ Dockerhub, lệnh này yêu cầu công cụ Docker tạo một kho lưu trữ có tên là “tutorial” và gắn thẻ nó với “0.0.1”.
Khi kết thúc, bạn có thể chạy:
```
docker image list
```
Bạn sẽ thấy image trong danh sách có tên là tutorial có thẻ là 0.0.1. Nếu bạn muốn tạo một container từ image này và chạy lệnh:
```
docker run -p 3000:3000 -d --name demo tutorial:0.0.1  
```
Điều này sẽ tạo một container dựa trên tutorial image  0.0.1 mà bạn vừa mới quay và đặt tên là ‘demo’. Lệnh này cũng có công tắc -d chỉ định rằng bạn muốn chạy nó trong chế độ daemon (trong nền). Cuối cùng, nó cũng có nút chuyển đổi -p ánh xạ cổng 3000 trên máy chủ (máy cục bộ) của bạn đến cổng tiếp xúc trên vùng chứa (được định dạng giống như [host port]:[container port]). Điều này sẽ cho phép bạn truy cập http://localhost:3000 trên máy của bạn và xem phản hồi của **container** trên cùng một cổng đó.

Tài liệu tham khảo: https://developer.okta.com/blog/2017/08/28/developers-guide-to-docker-part-2#start-with-a-base-docker-image