# Giới tiệu

Với những ai đã tìm hiểu về React, chắc hẳn các bạn đều biết đến create-react-app. Create-react-app là một tool built cho phép bạn cài đặt và khởi chạy ứng dụng React trong vòng chưa đầy một phút.

Khi mới bắt đầu học React, mình luôn lo lắng về việc push code lên GitHub sẽ chứa những thông tin về Database hoặc API keys và URLs. Qua quá trình đấu tranh, tìm tòi không ngừng nghỉ, mình đã tìm thấy một vị cứu tinh,  một NPM package khá nhỏ và tiện lợi gọi là dotenv.

dotenv là một mô-đun tải các biến từ tệp .env vào process.env. Chính vì vậy, nó là nơi lý tưởng để lưu trữ usernames, passwords, URLs và các dữ liệu nhạy cảm khác.

# Install & Setup

Bạn cài đặt dotenv bằng cách chạy lệnh sau: 
 
```bash
# npm
npm install dotenv

# yarn
yarn add dotenv
```

Sau đó, để sử dụng bạn cần require và config dotenv càng sớm càng tốt trong ứng dụng của bạn. Thường sẽ là index.js hoặc App.js.

```JavaScript
require('dotenv').config()
```

Tiếp theo, bạn tạo một tệp .env trong thư mục gốc của ứng dụng. Thêm các biến môi trường trên các dòng mới dưới dạng `NAME = VALUE`. Ví dụ:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```

process.env bây giờ có các key và value mình đã định nghĩa trong tệp .env.

```JavaScript
const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})
```

Lưu ý, bạn không bên commit file .env. Bởi lẽ, nó chỉ nên bao gồm các biến môi trường cụ thể như mật khẩu Database hoặc API keys. Database ở môi trường production của bạn phải có mật khẩu khác với database ở môi trường development hay staging...

# Kết luận

Các bạn đọc thêm ở đây nhé https://www.npmjs.com/package/dotenv

Chúc các bạn học tốt !