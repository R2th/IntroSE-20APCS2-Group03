## Setup môi trường làm việc
### Cài đặt phần mềm
- NodeJS: https://nodejs.org/en/ => Môi trường để thực thi code javascript
- VSCode: https://code.visualstudio.com/ => Code editor, ưu điểm là free có thể tích hợp thêm nhiều tính năng và extensions. Giúp code dễ dàng và nhanh chóng hơn.

### Setup VSCode
- Bật chế độ auto format on save
1.  Vào **File --> Preferences --> Settings** hoặc nhấn tổ hợp phím Ctrl và dấu phẩy **Ctrl + ,**
2.  Tìm kiếm **Format on save**
3.  Check vào ô checkbox

- Cài một vài extension hữu ích


| **Tên extension** | **Công dụng** | **Link** |
| -------- | -------- | -------- |
| ReactJS code snippets     | Code reactjs nhanh với snippets     | https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets     |
| Javascript (ES6) code snippets     | Code js nhanh với snippets     | https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets     |
| Material Icon Theme     | Sử dụng bộ icon đẹp cho folders, files     | https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme     |
| SCSS Formatter     | Format styles: CSS. SCSS     | https://marketplace.visualstudio.com/items?itemName=sibiraj-s.vscode-scss-formatter     |
| Bracket Pair Colorizer 2     | Tô màu khác nhau cho dấu ngoặc lồng nhau     | https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2     |
| ESLint     | Báo lỗi khi code vi phạm best practices/rules     | https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint     |


- Cài đặt FiraCode: Link hướng dẫn: https://github.com/tonsky/FiraCode

## Setup Git
### Tải và cài đặt Git
- Mỗi hệ điều hành có cách cài đặt khác nhau, bạn xem hướng dẫn tại đây nhé https://git-scm.com/
![](https://images.viblo.asia/40cc7582-b353-417f-a716-8b3dbab59f5f.png)

### Kiểm tra để xác nhân cài đặt thành công
1. Mở Git Bash (Có thể mở bằng Powershell hoặc Terminal đều được nhé)
2. Chạy lệnh kiểm tra version của git
```
git --version
```
### Cấu hình chung cho Git
- Khi mới cài git, mình cần cấu hình để git hiểu:
1. Người dùng git tên gì?
2. Người dùng git có email là gì?

- Chạy 2 lệnh sau:
```
git config --global user.name "Your Name"
```
```
git config --global user.email "your-email@gmail.com"
```
- Sau khi chạy xong, dùng lệnh này để kiểm tra để cấu hình thành công chưa?
```
git config --list | grep user
```
- Ý nghĩ câu lệnh này là xem danh sách **git config** mà có chứa chữ **user**

## Tạo ReactJS project với Create React App (CRA)
### Điều kiện
Bạn nhớ kiểm tra là đã cài đặt 
- NodeJS
- Git
Nếu chưa cài đặt thì xem lại phần cài đặt và cấu hình nhé.

### Giới thiệu CRA
```
Create React App is an offically supported way to create single-page React applications. It offers a modern build setup with no configuration.
```
- Tool chính thức để tạo ra một project ReactJS đơn giản và được cấu hình sẵn.
- Trước đây khi không có CRA, thường phải tự đi config tools khá là khoai.

### Tạo project ReactJS với CRA
- Rất đơn giản, chỉ cần 1 lệnh duy nhất:
```
npx create-react-app learn-reactjs
```
- Trong đó learn-reactjs là tên project mà bạn muốn đặt.
- Dùng VSCode, mở folder learn-reactjs vừa mới được tạo ra hoặc dùng lệnh trong terminal:
```
cd learn-reactjs # di chuyển vào folder learn-reactjs
code . # mở folder hiện tại bằng VSCode
```
- Từ VSCode, hiển thị cửa sổ terminal bằng tổ hợp phím **Ctrl + J**. Chạy lệnh sau để bắt đầu project ReactJS.
``
npm start
``
- Link tham khảo: https://create-react-app.dev/docs/getting-started/

## Có gì bên trong folder ReactJS project
```
learn-reactjs/
    README.md
    node_modules/
    package.json
    
    public/
        index.html # html template
        favicon.ico
        
    src/ # all resources should be inside this folder
        App.css
        App.js
        App.test.js
        index.css
        index.js # entry point
        logo.svg
```

Lưu ý:
- Không thay đổi tên file của **public/index.html** và **src/index.js**
- index.js: Đây là filder đầu vào của project.
- index.html: Đây là file template của project. App sẽ được mount vào node **root** trong template này.
- package.json: Chứa thông tin các packages mà project sử dụng cũng như một vài config khác.
- node_modules: Đây là folder rất nặng, rất lớn. Nó chứa tất cả các packages mình sử dụng, folder này chỉ có dưới local, không push lên **Github**, không có trên môi trường **production**.

Link tham khảo
- Folder structure: https://create-react-app.dev/docs/folder-structure
- Các scripts được setup sẵn: https://create-react-app.dev/docs/available-scripts
- Các trình duyệt hỗ trợ: https://create-react-app.dev/docs/available-scripts

Phần Setup môi trường làm việc đến đây là hết nhé  :D.