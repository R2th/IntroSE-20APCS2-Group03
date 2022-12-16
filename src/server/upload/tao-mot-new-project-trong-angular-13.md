Trong bài viết này mình sẽ chia sẻ các bước để tạo một new project trong angular 13 và chạy nó trên trình duyệt.<br>

> 1. Cài đặt các thư viện cần thiết


- **Node.js** : Angular yêu cầu phiên bản LTS đang hoạt động hoặc LTS bảo trì của [Node.js](https://nodejs.org/en/about/releases/).
- Các bạn có thể truy cập vào trang [nodejs.org](https://nodejs.org/en/) để cài đặt.
- Mở terminal window và gõ command **node -v** để kiểm tra xem nodejs đã hoạt động chưa.
- **npm**( node package manager) : **npm** là thư viện phần mềm lớn nhất thế giới, nó cũng là một trình quản lý và cài đặt các gói phần mềm.

Các ứng dụng Angular, Angular CLI và Angular phụ thuộc vào các gói trong thư viện npm  cho nhiều tính năng và chức năng. <br>
**npm** được cài đặt với Node.js theo mặc định, để kiểm tra **npm** đã hoạt động chưa, bạn gõ command **npm -v**  trong terminal window.<br>

> 2. Install the Angular CLI

Bạn sử dụng Angular CLI để tạo dự án, tạo mã ứng dụng và thư viện, đồng thời thực hiện nhiều tác vụ phát triển liên tục như kiểm tra, đóng gói và triển khai.<br>
```Angular
npm install -g @angular/cli
```
<br>

> 3. Install Angular 13 Project

Bây giờ, bạn có thể tạo một new project trong angular 13 bằng cách sử dụng command angular cli như bên dưới:<br>
```
ng new first-app
```

Bạn sẽ được hỏi về một số điều như dưới đây: <br>
1. Would you like to add Angular routing?(y/n)<br>
Nếu bạn chọn yes thì ứng dụng sẽ tạo ứng dụng có định tuyến(routing). Nếu No, ứng dụng sẽ tạo mà bỏ qua định tuyến(routing).<br>
2. Which stylesheet format would you like to use? <br>
Mình chọn CSS và nhấn Enter<br>

Nếu chạy thành công, bạn sẽ thấy một màn hình như sau:<br>
![](https://images.viblo.asia/e30f3666-1518-4e96-a33a-a556dc36e062.png)


Cuối cùng bạn chạy command sau để chạy ứng dụng nhé:<br>
```
cd first-app
ng serve --open
```

Nếu bạn cài đặt thành công, bạn sẽ thấy màn hình như sau: <br>
![](https://images.viblo.asia/711eedd1-cc66-4923-8a11-057b3f60d79a.png)