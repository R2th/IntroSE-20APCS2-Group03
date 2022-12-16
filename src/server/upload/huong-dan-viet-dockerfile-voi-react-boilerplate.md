### Mở đầu

Xin chào tất cả mọi người! Nếu ai đã từng làm việc với Docker thì chắc hẳn đều phải biết đến **Dockerfile** nhỉ!? Dockerfile chính là trái tim của **Docker**. Nó định nghĩ chi tiết image bao gồm những gì để từ đó **Docker** có thể xác định build image đó như thế nào. **Dockerfile** thực chất là một file text có tên là **Dockerfile**, không có phần mở rộng. Nó chứa các command cần thiết được sắp xếp theo thứ tự để xây dựng một image (các command sẽ được thực thi từ trên xuống). 

Để hiểu hơn về **Dockerfile**, hôm nay mình sẽ cùng mọi người viết 1 **Dockerfile** thông qua ví dụ thực tế nhé!!!

### Setup

Đầu tiên các bạn cần chuẩn bị 1 project để từ đó chúng ta có thể tạo image cho nó. Trong bài viết ngày hôm nay mình sẽ sử dụng thằng React-boilerplate để làm ví dụ.

Các bạn lên trang chủ của [React-boilerplate](https://github.com/react-boilerplate/react-boilerplate) clone source code về:

`git clone https://github.com/react-boilerplate/react-boilerplate.git`

Sau khi đã clone, ta tiến hành setup môi trường:

`npm run setup`

Vậy là bước chuẩn bị project đã xong, bây giờ ta sẽ tiến hành viết **Dockerfile**

### Dockerfile

Trong thư mục root của React-boilerplate các bạn hãy tạo 1 file tên là Dockerfile.

Các bạn có thể vào [đây](https://medium.com/@phamducquanptithcm/docker-l%C3%A0-g%C3%AC-ki%E1%BA%BFn-th%E1%BB%A9c-c%C6%A1-b%E1%BA%A3n-v%E1%BB%81-docker-13c6efc4aefe) để tìm hiểu xem các thành phần có trong 1 **Dockerfile** nhé!!

![](https://images.viblo.asia/3fd8b332-bcb6-4558-8bb9-718d9287ea6f.png)

##### 1. FROM node:8.15.1

Đây là nơi để chỉ định base image, kiểu như là môi trường mà project của mình đang chạy vậy, ví dụ như là: python, ubuntu, node…. Ở đây React-boilerplate đang chạy trên môi trường là **node 8.15.1**. Mọi người có thể vào trong file **package.json** để kiểm tra nhé!!!

![](https://images.viblo.asia/fd4f596e-5316-4049-9b3a-6fc0e0b38649.png)

<br/>

##### 2. USER node
dùng để chỉ định username hoặc UID được sử dụng trong quá trình tạo image cho các lệnh RUN, CMD và ENTRYPOINT. Do chạy trên môi trường node nên mình để là node luôn cho nhanh :D

<br/>

##### 3. RUN mkdir /home/node/react-boilerplate
dùng để thực thi 1 command bất kỳ trong quá trình build-image. Đại loại là mình muốn tạo ra 1 folder trong docker image và sau đó mình sẽ copy toàn bộ project vào trong đấy.

<br/>

##### 4. COPY . /home/node/react-boilerplate
Cái tên nói lên tất cả, câu lệnh trên làm nhiệm vụ là copy toàn bộ project vào trong folder mà mình vừa tạo bên trên bởi câu lệnh RUN

<br/>

##### 5. WORKDIR /home/node/react-boilerplate
Thiết lập thư mục gốc cho các lệnh khác như RUN, CMD, ENTRYPOINT, COPY, ADD,… Ở đây mình thiết lập thư mục gốc chính là thư mục đã tạo bên trên.

<br/>

##### 6. RUN npm install
Sau khi đã có thư mục gốc rồi thì ta chỉ việc chạy npm install để cài đặt các package bên trong docker image

<br/>

##### 7. EXPOSE 3000
Thiết lập port để truy cập tới container sau khi đã khởi chạy

<br/>

##### 8. ENV NODE_ENV=production
Thiết lập các biến môi trường. Trong React-boilerplate thì biến NODE_ENV dùng để setup môi trường khởi chạy của project như là **development**, **test**, **production**. Do mục đích của mình là tạo ra 1 docker image để chạy trên môi trường production cho nên ở đây mình sẽ để NODE_ENV là production.

<br/>

##### 9. CMD [“node”, “server”]
Dùng để thực thi một command bất kỳ trong quá trình chạy container. CMD sẽ không thực thi bất cứ thứ gì trong quá trình build image và mỗi Dockerfile chỉ chứa duy nhất một lệnh CMD. Sau khi đã setup xong xuôi thì bước cuối cùng ta chỉ việc khởi chạy app lên thôi. Với câu lệnh CMD thì ta sẽ thực thi command là **node** với đối số là **server** (đây chính là command dùng để start app).

### RUN DOCKER

Sau khi đã viết xong Dockerfile thì ta sẽ tiến hành build image bằng command:

`docker build .`

Và ta sẽ có giao diện terminal thực hiện việc build image như dưới đây

![](https://images.viblo.asia/15ba2b0a-1220-4245-8543-b73eb06add43.png)

### KẾT LUẬN

Như vậy là ta đã thực hiện xong việc build image cho 1 project sử dụng ReactJS. Hy vọng qua bài viết này mọi người sẽ có thể tự tay viết được 1 file **Dockerfile** cho dự án của riêng mình nhé!!!