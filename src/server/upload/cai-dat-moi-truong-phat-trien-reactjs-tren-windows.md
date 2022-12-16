Mục tiêu của bài viết: Khởi chạy một ứng dụng React đơn giản sau khi thiết lập môi trường phát triển.

Dưới đây là những công cụ cần thiết:

* Visual Studio Code (VS Code): Đây chắc chắn không phải là một yêu cầu để tạo các ứng dụng React, nhưng nó là một editor khá dễ sử dụng và hỗ trợ nhiều cho việc phát triển, việc sử dụng vscode sẽ làm cho công việc phát triển trở nên thú vị hơn nhiều.
* Git Bash: Git là một công cụ rất phổ biến được sử dụng để quản lý mã nguồn, đặc biệt nếu bạn đang làm việc trong một nhóm phát triển lớn. VS cho phép bạn tích hợp thiết bị đầu cuối Git Bash và điều này làm cho việc đẩy mã của bạn lên kho Git rất thuận tiện. Ngoài ra, nó cho phép bạn sử dụng hầu hết các lệnh UNIX tiêu chuẩn với việc mô phỏng môi trường Bash.
* Node.js: Môi trường thời gian chạy JavaScript. Facebook gợi ý rằng nên sử dụng phiên bản NodeJS mới nhất khi tạo các ứng dụng ReactJS
* npm: trình quản lý gói Node. Điều này được sử dụng cùng với Node để chúng ta có thể dễ dàng chia sẻ các mô-đun mã được đóng gói.

# Download VS Code
Các bạn có thể tải VS Code tại [đây](https://code.visualstudio.com/)

Công việc tải và cài đặt khá dễ. Microsoft đã thực hiện tốt công việc đơn giản hóa quá trình cài đặt cho ứng dụng này.

# Sử dụng Git Bash với VS Code
Tải Git Bash tại [đây](https://git-scm.com/downloads)

Khi bạn nhấp qua trình cài đặt Git, tôi khuyên bạn nên sử dụng tất cả các cài đặt cài đặt mặc định trừ khi bạn thực sự biết bạn đang làm gì.

Bây giờ chúng ta sẽ thêm Git Bash như một thiết bị đầu cuối tích hợp bên trong VS Code.

* Mở 1 terminal mới trong VS Code (Ctrl + Shift + ` ) hoặc Termial -> New Terminal

![](https://images.viblo.asia/d1d64212-d60f-418f-9460-b2b45b859ca5.png)

* Chọn Git Bash

![](https://miro.medium.com/max/1829/0*S59fs0drTrxJm_Of.png)

Kiểm tra phiên bản Git: Nhập lênh sau để kiểm tra

`git --version`

![](https://miro.medium.com/max/339/0*XWM4N6BVydl5w1xt.png)

# Cài đặt NodeJS

Tải nodejs tại [đây](https://nodejs.org/en/)

Tôi đã chọn tùy chọn được đề xuất cho hầu hết người dùng và sau đó sử dụng tất cả các cài đặt mặc định trong thiết lập Node.js.

Điểm kiểm tra: Sau khi cài đặt xong, hãy nhập vào dòng lệnh của bạn:

`node -v && npm -v`

Và nó sẽ trông như thế này (phiên bản của bạn có thể gần đây hơn phiên bản của tôi):

![](https://miro.medium.com/max/434/0*a1034y3ES1yQc_4q.png)

# Sử dụng create-react-app và tạo React App đầu tiên

Nhập lệnh sau vào dòng lệnh.

`npx create-react-app hello-world`

Sẽ mất vài phút để tạo project, sau đó bạn có thể mở trong VS Code bằng cách chạy lệnh sau:

`cd hello-world && code .` 

Lệnh trên thực thi hai lệnh. Chúng ta đang thay đổi thư mục trong ứng dụng React mới của bạn và sau đó mở nó trong VS Code.

Bây giờ, hãy mở một terminal mới (Ctrl + Shift + `) và nhập lệnh này để khởi động máy chủ Node và chạy ứng dụng của bạn

`npm start`

Để kiểm tra, các bạn mở trình duyệt và truy cập vào `localhost:3000`

![](https://miro.medium.com/max/1089/0*1-BkF-_rxlN57SnK.png)

# Tổng kết

Chúng ta vừa thực hiện cài đặt song những công cụ cần thiết cho việc phát triển React App

* VS Code

* Git Bash

* Nodejs

* npm

Và môi trường phát triển của bạn đã được thiết lập và sẵn sàng hoạt động!

# Tham khảo
[https://medium.com/better-programming/my-react-dev-environment-s.....](https://medium.com/better-programming/my-react-dev-environment-setup-ded7cedb87a)