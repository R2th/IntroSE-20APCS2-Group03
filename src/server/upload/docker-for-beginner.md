# Lời mở đầu
Công cụ đóng gói ứng dụng nổi tiếng Docker không còn gì là mới mẻ trong giới công nghệ trong nước cũng như ngoài nước. Docker được ra mắt từ 2013 và đã được các lập trình viên hay các nhà quản lý hệ thống đón nhận nồng nhiệt. Đã có rất nhiều công nghệ sử dụng docker làm nền tảng như CircleCI, DroneCI hay thậm chí FramgiaCIv3.

<br>
Trong bài viết này tôi sẽ hướng dẫn cho bạn về Docker, công dụng của nó và lý do vì sao nhiều người lại yêu mến nó như vậy. 

# What is Docker?
Theo trang Wikipedia, Docker là một chương trình máy tính mã nguồn mở cho phép thực hiện ảo hóa ở tầng hệ điều hành, hay còn được gọi là containerization (dịch là sự đóng gói vào một container). Nói một cách đơn giản và dễ hiểu, Docker cho phép bạn ảo hóa một môi trường, và cho phép ứng dụng của bạn chạy trên môi trường ảo hóa đó.

Vậy nó khác gì so với những chương trình như VMware Workstation hay VirtualBox???

Điểm khác biệt chính ở trong định nghĩa của nó, Docker thực hiện ảo hóa trên tầng hệ điều hành, có nghĩa là nó sẽ tận dụng các lời gọi hệ thống của Linux Kernel trên máy host để thực hiện các tiến trình trong môi trường ảo hóa, trong khi các phần mềm như VirtualBox thực hiện ảo hóa toàn bộ hệ thống (từ phần cứng đến phần mềm)

Điều này cho phép Docker có thể chạy nhẹ hơn so với các máy ảo (virtual machine) do không phải tốn công ảo hóa các phần cứng và các interface của chúng.

![Máy ảo so với Docker (containers)](https://images.viblo.asia/f1f116d3-62ce-4ff2-b830-80d754aa7c89.jpg)

# Lợi ích của Docker
Lợi ích dễ thấy nhất của Docker chính là khả năng ảo hóa của nó, Nó cho phép tách ứng dụng của bạn ra khỏi host mà thay vào đó, chạy nó trên một môi trường ảo hóa. Chính điểm này mang lại tính bảo mật rất cao khi bạn không biết ứng dụng kia có ảnh hưởng như thế nào đến máy tính của mình. Hay khi bạn phải duy trì 7 phiên bản của `ruby` để chạy 7 Ruby on Rails khác nhau, thay vào đó, hãy build 7 cái image cho ứng dụng của bạn. Bạn sẽ không còn phải đau đầu khi 7 phiên bản kia update lên bản mới và break cái gì đó trong app của bạn.

Dưới đây là một số lợi ích của Docker cho các lập trình viên cũng như các system admin:
- Tạo ra một môi trường phát triển nhất quán, Docker sẽ chạy giống hệt nhau trên tất cả các host mà không phải dựa trên môi trường hay hệ điều hành trên máy host, tất cả các thư viện, biến môi trường đều được lưu trữ trên docker image. Sẽ không còn cảnh "Nhưng nó chạy trên máy của em mà!!!"
- Nếu bạn gặp khó khăn khi build hoặc compile một ứng dụng nào đó, hãy thử build chúng bên trong docker. Vì môi trường bên trong docker là một môi trường sạch, sẽ có rất ít thay đổi hay cấu hình bên trong làm conflict với build của bạn
- Khi bạn phải lập trình với nhiều ngôn ngữ như `python`, `ruby`, hay như `nodejs`, bạn sẽ thường gặp phải vấn đề versioning của các chương trình trên không phù hợp với ứng dụng của bạn. Hãy để chúng vào bên trong docker, cùng với các phiên bản mà ứng dụng của bạn yêu cầu.
- Dễ dàng deploy ứng dụng. Nếu ứng dụng của bạn chạy trong một container trên máy dev của bạn, chúng cũng sẽ chạy trong một container trên server của bạn. Bây giờ, deploy chỉ đơn giản là build một docker image mới với những phiên bản code mới của bạn và run những image đó trên production server.
- Cộng đồng hỗ trợ to lớn, có rất nhiều ứng dụng đã được xây dựng trên DockerHub, bạn chỉ cần pull các image đó và run chúng trên máy tính của mình. Sẽ không còn cảnh phải configure dependancies rồi configure config để một ứng dụng nào đó chạy để rồi break một ứng dụng khác.

![](https://images.viblo.asia/8705735a-dae1-4d58-ada0-b889af7492af.png)


# Docker Image && Docker Container
Đây là hai khái niệm cơ bản nhất của Docker.

- Docker Image là một executable package có chứa tất cả những gì cần tiết để có thể chạy một ứng dụng, từ core application cho đến các thư viện runtime và các các biến môi trường cùng với các file configuration của chúng. 

- Docker Container là một instance của một image. Điều này có nghĩa là image đó được nạp vào bộ nhớ và có thể được thực thi.

<br>
Bạn có thể hiểu một docker image là một image chứa toàn bộ trạng thái của một máy tính trong khi nó đang bị tắt, còn một container là trạng thái mà khi cái máy tính đó đang được bật lên, và cái máy tính đó sẵn sàng thực thi ứng dụng của bạn.

# Làm sao để có thể chạy một docker container?
Để có thể khởi động một docker container, trước tiên bạn cần phải có một docker image. May mắn là Docker Hub có chứa rất nhiều các docker image cho bạn lựa chọn để có thể chạy trực tiếp các image đó hay để tùy biến những image đó theo yêu cầu của cá nhân.

<br>
Ví dụ điển hình nhất là image `hello-world`. Nhiệm vụ của image này rất đơn giản, nó chỉ in ra màn hình của bạn một vài dòng chữ giới thiệu về docker và sau đó sẽ tự tắt.

Hay một ví dụ hay ho hơn đó là `nginx`:
```
docker pull nginx
docker run nginx
```
Ở ví dụ này, câu lệnh đầu tiên có nghĩa là chúng ta sẽ kéo image `nginx` từ DockerHub về máy tính của bạn. Câu lệnh thứ hai có nghĩa là chạy `nginx` nó trên terminal của bạn. Log của nginx cũng được hiển thị ở đây. Bạn có thể nhấn `Ctrl+C` để thoát chương trình này.

**Note**: Nếu trên máy tính của bạn chưa có image `nginx` và bạn thực hiện `docker run nginx` thì docker sẽ tự động kéo image `nginx` về máy tính của bạn.

# Xây dựng một docker image mới
Như đã nói ở trên, ta cần phải có một docker image để có thể chạy một ứng dụng docker.

Để xây dựng một image khá là đơn giản, Docker sẽ tự động dọc file Dockerfile trong thư mục hiện tại để xây dựng image. Dưới đây là một ví dụ về việc xây dựng một docker image 
```
FROM ruby:2.5
WORKDIR /app
RUN apt-get update; \
    apt-get upgrade -y; \
    apt-get install -y build-essential libssl-dev libreadline-dev libyaml-dev \
      default-libmysqlclient-dev gnupg2 nodejs
RUN gem install rails --no-ri --no-rdoc; rails new .
ENV RAILS_ENV="development"
EXPOSE 3000
CMD ["bundle", "exec", "rails", "server"]
```

Trong ví dụ này, ta sẽ xây dựng một image dựa trên base image là `ruby:2.5` (image có tên là `ruby` với phiên bản của image này là 2.5, bạn có thể tìm hiểu thêm về image này [tại đây](https://hub.docker.com/_/ruby/))
- Dòng 2: dòng này dùng để xác định thư mục trên image mà bạn muốn làm việc. Trong trường họp này là `/app`. Tất cả các lệnh được thực thi dưới dòng 2 này đều được thực hiện trong thư mục `/app` này.
- Dòng 3: tại dòng này, lệnh `RUN` có thể hiểu là những gì bạn làm việc trên shell của cái máy tính có trạng thái giống với trạng thái của image `ruby:2.5`. Có nghĩa là bạn sẽ gõ các lệnh đứng sau `RUN` vào terminal của mình để máy tính xử lý. Như trong ví dụ này, nó sẽ update hệ thống, cài đặt các package cần thiết cho ứng dụng Rails.
- Dòng 4: Dòng này cũng là một câu lệnh `RUN`, như bạn cũng có thể đoán được. Ở đây docker sẽ cài đặt một ứng dụng  Rails mới trong thư mục `/app`
- Dòng 5: Với câu lệnh `ENV`, bạn có thể thiết lập một environment variable trong image này. Trong ví dụ này, ta sẽ set biến môi trường `RAILS_ENV` thành `development`
- Dòng 6: Lệnh `EXPOSE` là một câu lệnh đặc biệt trong docker, dùng để thông báo với docker rằng image này có thể nghe ở một cổng xác định (cổng 3000 trong trường hợp này). *Lưu ý: lệnh `EXPOSED` này không có nghĩa là làm cho cổng này tiếp cận được trên máy host*
- Dòng 7: Lệnh CMD cũng là một lệnh đặc biệt của docker. Nó dùng để khai báo image sẽ làm gì sau khi nó được khởi chạy bằng lệnh `docker run`. Như trong ví dụ này, image sẽ tự động khởi động ứng dụng Rails bên trong container và cho nó lắng nghe ở cổng 3000 mặc định.

<br>
Build image mới này bằng cách chạy lệnh `docker build -t [image_name] .`. Vì bạn chạy lệnh `docker build` bên trong thư mục có chứa Dockerfile nên không cần phải khai báo Dockerfile vào lệnh `docker build`. Dấu chấm ở cuối cùng là không thể thiếu. Nó định nghĩa thư mục mà lệnh `docker build` sẽ chạy. Bạn có thể truyền vào đây một thự mục bất kì mong muốn.


# Chạy một docker image
Như đã nói ở trên, bạn có thể chạy một docker image bằng cách sử dụng lệnh `docker run`.
Ví dụ, ta lấy Dockerfile như ở ví dụ trước và build nó với tên là `test-docker` chẳng hạn, bạn sẽ có thể chạy nó bằng cách gọi `docker run test-docker`. Khi đó, docker sẽ tự động khởi động ứng dụng rails đã được cài đặt sẵn trong image `test-docker` mà bạn vừa build ra.

<br>
Tuy nhiên, khi bạn mở trang `localhost:3000` thì vẫn chả thấy gì. 

![docker run](https://images.viblo.asia/d99b3ffb-75f0-4b12-8e3a-a9aaeea3cdb4.jpg)


Lý do cho điều này khá là đơn giản, như tôi đã nói ở trong dòng 6 của Dockerfile ở trên, "Lệnh `EXPOSE` là một câu lệnh đặc biệt trong docker, dùng để thông báo với docker rằng image này có thể nghe ở một cổng xác định". Điều này hoàn toàn không đồng nghĩa với việc ta có thể truy cập đến cổng 3000 trong container này.

Để có thể truy cập vào cổng 3000 của container, ta cần phải map cổng 3000 của container vào một cổng nào đó trên máy host bằng cách sử dụng cờ `-p` của `docker run`.
```
docker run -p 3000:3000 test-docker
```

***Violà***, thế là bạn có thể truy cập vào cổng 3000 của container này. Ứng dụng rails trong container có thể truy cập và Rails logs sẽ hiện trên terminal của bạn!!!

# Lời kết
Trong bài viết này, bạn đã được giới thiệu cơ bản về Docker, nó là gì, nó có tác dụng như thế nào, và làm thế nào để có thể sử dụng docker một cách cơ bản nhất.

<br>
Trong bài viết tới, tôi sẽ gửi đến các bạn những thủ thuật sử dụng docker cao cấp hơn và phù hợp với thực tế hơn. Cũng như một ví dụ nho nhỏ về build một docker image phù hợp để có thể deploy chúng trên staging hay production server.