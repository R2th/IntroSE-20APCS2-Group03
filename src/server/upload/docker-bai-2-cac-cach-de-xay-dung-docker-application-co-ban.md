## Giới Thiệu
- Ở bài 1 chúng ta đã làm quen với một số khái niệm căn bản của Docker, hôm nay mình sẽ tiếp đến bài viết hướng dẫn tạo một Docker image và chạy thử để có một cái nhìn tổng quan hơn.  
## Nội Dung
### 1. Các cách để tạo một Docker image 
   - Có 4 phương pháp để tạo một docker image 
       - Thứ nhất, tạo bằng Docker commands / "by hand" : nghĩa là kích hoạt một container bằng `docker run` và nhập command để tạo image của bạn trên giao diện dòng lệnh. Tạo một image mới với lệnh `docker commit` . Sử dụng phương pháp này khi bạn đã có sẵn 1 image. 
       - Thứ hai, tạo docker image từ đầu bằng Dockerfile 
       - Thứ ba, tạo bằng Dockerfile và công cụ quản lý cấu hình ( configuation managerment - CM )  : nghĩa là tạo một docker thông qua một công cụ hỗ trợ khác.  
       - Thứ tư, bắt đầu bằng một empty image và nạp các file yêu cầu vào image đó. 
   - Trong các phương pháp trên, một cách căn bản thì khi mới bắt đầu tạo một project, bước đầu tiên là ta tạo dockerfile. 
 ### 2. Hướng dẫn viết Dockerfile 
- Docker file là một file dạng text với các chuỗi lệnh bên trong nó. 
- Ví dụ <br>
```
FROM node 
 LABEL maintainer cuongtop4598@gmail.com 
 RUN git clone -q https://github.com/docker-in-practice/todo.git 
 WORKDIR /todo 
 RUN npm install > /dev/nul 
 EXPOSE 8000
 CMD ["npm","start"]
```
 - Mô tả ví dụ 
     - Ta bắt đầu Dockerfile bằng việc định nghĩa base image với lệnh FROM. Ví dụ trên định nghĩa `node` tức là ta sử dụng Node.js image được build sẵn nên giờ đây ta có thể truy cập vào Node.js binaries. 
     - Tiếp theo ta khai báo LABEL command. Dòng này không yêu cầu cần có nhưng ta nên cho vào để miêu tả một số thông tin quan trọng. 
     - Tiếp theo là Run command. Lệnh Run sử dụng để khởi chạy các lệnh cho phép lấy code, thư viện cho ứng dụng của chúng ta. Trong ví dụ trên, Run thực hiện gọi lệnh git clone để kéo code từ github về. Git lúc này đã được cài sẵn ở node image nên ta chỉ cần gọi ra và sử dụng. 
     - Tiếp theo là WORKDIR commad. Dùng để khai báo thư mục mặc định bắt đầu khởi chạy khi ta khởi tạo container khi build image này.
     - Tiếp theo là RUN gọi lệnh `npm install` ta khởi chạy lệnh này để cài đặt các dependence cho app. Ouput sinh ra sẽ được đẩy vào thư mục /dev/nul. 
     - Tiếp theo là EXPOSE command. Lệnh này nhằm khai báo cổng mà container sẽ lắng nghe trên đó. Bởi vì khi khởi chạy mặc định bằng npm start, web app của ta được thiết lập cổng listen mặc định là 8000 
     - Tiếp theo là lệnh CMD. Lệnh này nhằm mục đích chạy lệnh command line `npm start` khi container bắt đầu khởi chạy. 
- Ten ten, thế là xong 1 cái dockerfile rồi, tiếp theo ta thử build nó ra image và xem kết quả nhé. Cách chạy như sau. <br>
### 3. Hướng dẫn build một docker image 
- Cú pháp cực kỳ đơn giản. 
>`docker build path_dockerfile` <br>
- Kết quả  
![image.png](https://images.viblo.asia/374b00e9-c7bf-4d0a-bcc7-681a24263959.png)
Như các bạn thấy, Docker sẽ download base image của node một cách tự động. Và thực hiện lần lượt 7 bước từ trên xuống dưới như các lệnh mà ta khai báo. <br>
- Tiếp theo, ta cần Tag cái image vừa tạo ra, mục đích của việc Tag này là để xác định được cái image của mình tên là gì, gọi nó ra sao, kiểu gì hay nói cách khác là gán cho nó một cái tên dễ đọc hiểu. Khi build xong bạn thấy ở dòng cuối cùng của terminal, docker xuất ra ID của image vừa tạo. Lấy cái ID này tiến hành tag image như sau: 
> docker tag xxxxxxxxxx  todoapp  // xxxx.. là ID
- Sau khi build xong 1 docker image, ta khởi chạy một container từ nó như sau: <br>
> docker run -i  -t -p 8000:8000 --name example todoapp<br>
    
   - Trong đó, example là tên của container vừa tạo ra dựa trên image todoapp. 
### 4. Làm việc với Layer hay Docker layering 
- Chuyện gì sẽ xảy ra khi từ một image, ta khởi chạy hàng trăm container, thậm chí là hàng nghìn container. Ví dụ như nhiều service có chức năng giống nhau được khởi chạy dựa trên một image và chứa trong các container của image đó. Chúng chỉ khác nhau bởi port khởi chạy. Nôm na là, ta nghĩ ngay đến việc gọi lệnh `docker run` 100 lần và thay đổi port của nó là xong! cách này thực tế đúng. Nhưng không hiệu quả về mặt bộ nhớ disk. Bởi vì, khi ta khởi tạo mới một thực thể container từ image. Thì toàn bộ cấu trúc base được lưu lại ở bộ nhớ disk của các container đều giống nhau, dẫn tới lãng phí bộ nhớ. Và từ đó, Layer sinh ra để giải quyết vấn đề trên. Với chiến lược tối ưu tiêu chuẩn **copy-on-write** mô hình computing được thiết lập lại như sau : <br> 
- ![image.png](https://images.viblo.asia/5f992dc1-8eae-40a0-b80a-845775b629b7.png)
- ![image.png](https://images.viblo.asia/1e0cbda2-52fa-4db5-8516-5df014712629.png)
## Kết Luận 
   - Trên đây là toàn bộ các khái niệm và kiến thức cơ bản khi bắt đầu với docker. Bài viết còn nhiều thiếu sót, bạn đọc vui lòng bổ sung và chỉnh sửa giúp mình. 
   - Bài tiếp theo mình sẽ đi sâu vào kiến trúc của Docker và chi tiết về cách nó hoạt động bên trong phần cứng của chúng ta.