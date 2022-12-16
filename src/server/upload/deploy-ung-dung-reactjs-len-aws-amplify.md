Xin chào các bạn, hôm này mình sẽ hướng dẫn các bạn deploy một dự án ReactJS lên nền tảng AWS Amplify.

### AWS Amplify là gì
AWS Amplify là một bộ công cụ được xây dựng có mục đích để phát triển, phân phối và quản lý các ứng dụng với khả năng mở rộng và được xây dựng trên các nền tảng web và nền tảng di động phổ biến.

![image.png](https://images.viblo.asia/0214bca1-386b-4189-8364-ead6a7a6f82b.png)

Các bạn có thể đọc thêm thông tin tại [AWS Amplify](https://aws.amazon.com/amplify/)


### Tạo React Application
Dùng công cụ create-react-app để tạo thư mục dự án ReactJS có tên là **reactjs-amplify**, mở Terminal và gõ:
```
npx create-react-app reactjs-amplify
cd reactjs-amplify
npm start
```

Nếu bạn chưa rõ thì có thể tham khảo bài viết này của mình về cách tạo ReactJS App với công cụ **create-react-app** nhé:

https://viblo.asia/p/tao-ung-dung-reactjs-bang-create-react-app-Eb85oXr0K2G

### Tạo Github Repository
Mình sẽ link AWS Amplify tới github để thực hiện deploy, do đó cần tạo một repository:
![image.png](https://images.viblo.asia/045d09c8-1bbf-4977-9113-e6c0cd6a2cea.png)

Tiếp theo ở terminal, cần gán github repo mới tạo cho folder dự án ReactJS, sau đó đẩy code đã được tạo lên github.
```
git init
git remote add origin git@github.com:username/reponame.git
git add .
git commit -m "First commit"
git push origin master
```

### Deploy ứng dụng
Để truy cập vào **AWS Amplify** các bạn vào link [AWS Management Console](https://console.aws.amazon.com/console), sau đó tìm ở ô tìm kiếm và nhấn vào **AWS Amplify**:

![image.png](https://images.viblo.asia/3cf3bf38-b03d-4835-b46c-5e6ce15155e3.png)

Tiếp theo nhấn vào nút **New App**, chọn **Host web app** để tạo web app mới:

![image.png](https://images.viblo.asia/f7638924-768b-453e-a3ae-a8f8ca6efca7.png)


Chọn lấy source code từ github rồi bấm **Continue**:
![image.png](https://images.viblo.asia/d4dc33f4-39c3-4b6a-abaf-8028b2d9d2d7.png)

Nếu bạn chưa đăng nhập thì sẽ có tuỳ chọn để bạn đăng nhập và cho phép AWS Amplify có thể lấy thông tin từ github của bạn.


Chọn repo của bạn, sau đó chọn branch chứa source code cần deploy, bấm **Next**:

![image.png](https://images.viblo.asia/726f1468-eaa2-4822-8df1-f3cd62376762.png)

Tiếp tục bấm **Next**:

![image.png](https://images.viblo.asia/bfd62d5b-61b0-4e8e-a08b-71f8d7a4d4bf.png)


Chọn **Save and deploy**:

![image.png](https://images.viblo.asia/87f35902-ba7d-4d48-bdb7-79d462a16f90.png)

Sau đó cần đợi một chút để quá trình deploy hoàn tất.



### Tạo thêm môi trường khác

Bạn có thể tạo thêm môi trường khác để deploy đồng thời với môi trường được deploy từ nhánh **master** bằng cách chọn **Connect branch**:

![image.png](https://images.viblo.asia/07cfb6ae-5020-4c36-8afe-bc38cf8b30af.png)

Chọn nhánh cần để deploy, ở đây của mình là nhánh **develop**, sau đó chọn **Next** và làm các bước tương tự như khi nãy:

![image.png](https://images.viblo.asia/99a41ce1-b2fe-4468-ab7b-67c49c6e781d.png)

Sau khi deploy xong thì mình đã có 2 môi trường cho 2 nhánh **master** và **develop**, như ở đây:

![image.png](https://images.viblo.asia/bb70e0b1-a11f-4a2d-9932-9746adfa2f2e.png)

### Kết quả
Đây là 2 link đã được deploy từ 2 nhánh như mình đã làm ở trên, các bạn có thể tham khảo nhé. Cảm ơn các bạn đã đọc bài viết của mình!

Master: https://master.d12u7dmslwbee4.amplifyapp.com/

Develop: https://develop.d12u7dmslwbee4.amplifyapp.com/

![image.png](https://images.viblo.asia/cb02b9ea-328c-4483-a2f8-1ab01ca3fcb5.png)