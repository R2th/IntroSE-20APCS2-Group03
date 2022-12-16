### Giới Thiệu NestJS.
- NestJS là một framework được phát triển trên nền của Nodejs.
- Nodejs là Node.js là một nền tảng chạy trên môi trường V7 JavaScript runtime. Chính vì vậy mà Nodejs có thể hoat động được cả trên client và server.
- Nhưng đặc biệt của NestJS  là nó được xây dựng bằng ngôn ngữ Typescript, đây là ngôn ngữ kết hợp của  tư duy hướng đối tượng (OOP), tư duy lập trình hàm ( functional programming ).

Nest.js có rất nhiều tính năng như:
* Khả năng mở rộng: Nhờ kiến trúc mô đun, Nest cho phép bạn sử dụng các thư viện hiện có khác cho project của mình.
* Kiến trúc: Nest có cấu trúc thiết kế cho projet, đam lại khả năng kiểm tra dễ dàng, khả năng mở rộng và khả năng bảo trì cao.
* Tính linh hoạt: Nest cung cấp một hệ sinh thái để xây dựng tất cả các loại ứng dụng cho server side.
* Tính tiến bộ: Nest sử dụng các tính năng JavaScript mới nhất và triển khai các giải pháp và mẫu thiết kế hoàn thiện trong phát triển phần mềm.
* Vì dùng TypeScript và các khái niệm nền của Angular, Angular developer có thể học Nest.js rất nhanh, và viết được ngay backend cho Angular app mà không cần dùng đến các server-side framework khác..

Express là web framework tối giản và nhanh cho Node.js, cung cấp nhiều tiện ích HTTP giúp bạn build  các REST API mạnh mẽ thật dễ dàng và nhanh chóng. Về phần TypeORM, đây là ORM (Object Relational Mapper) ổn định nhất hiện nay cho ngôn ngữ TypeScript và JavaScript hiện đại. Nó có hỗ trợ cho cả hai mẫu Active Record và Data Mapper, cho phép bạn xây dựng các ứng dụng chất lượng cao, loose couple, có thể mở rộng và có thể bảo trì trên các hệ thống cơ sở dữ liệu phổ biến nhất hiện có như MySQL, PostgreQuery và Oracle.

### cài đặt.
### 1: Trước Khi Sử Dụng
Để bắt đầu với Nest.js, bạn cần một vài điều kiện tiên quyết như sau:<br>
* Node.js và NPM đã được cài đặt trên hệ thống, bạn có thể cài đặt cả hai từ trang web chính thức hoặc làm theo hướng dẫn trong documentation của hệ thống bạn đang sử dụng.<br>
* Khả năng làm việc thành thạo bằng TypeScript. Nếu đã có kinh nghiệm develop với Angular, chắc hẳn điều kiện này sẽ là hiển nhiên, vì Angular dựa trên TypeScript mà.<br>
### 2: install nestjs CLI.
Nest CLI là một tiện ích giao diện dòng lệnh, cho phép bạn nhanh chóng tạo project từ với các base files và dependencies cần thiết. Với Nest CLI, bạn cũng có thể cấu trúc nhiều artifacts khác nhau như components và modules; serving cho app đang develop và xây dựng app cuối cùng <br>sẵn sàng cho production. Nest CLI dựa trên pakage Angular Devkit và sử dụng nodemon để xem các thay đổi trên file.　<br>
Hãy bắt đầu bằng cách cài đặt Nest CLI. Mở new terminal  và chạy lệnh sau:<br>
`npm install -g @nestjs/cli`<br>
Lưu ý: bạn có thể sẽ phải thêm sudo trước lệnh (với macOS và Debian) hoặc dùng thêm CMD prompt (với Windows). Nếu không phải là superuser mà vẫn muốn cài đặt globally, bạn cần chỉnh sửa quyền npm trước.<br>
Sau khi cài đặt CLI, bạn đã có thể nhanh chóng tạo project Nest.js và develop ngay rồi.<br>
### 3: Tạo Nest Project trong Nest.js

Sau khi cài đặt CLI, bạn có thể sử dụng nó để nhanh chóng tạo project. Sau khi cài đặt CLI, mở terminal chạy lệnh sau:<br>
`nest new firstnestproject`<br>
CLI sẽ hỏi bạn một số thông tin về dự án của bạn, chẳng hạn như description, version và tác giả. Bạn có thể thêm các chi tiết này hoặc chỉ để trống và nhấn Enter.<br>
CLI sẽ tạo ra một loạt các tệp và thư mục sau đó nhắc bạn về package manager bạn muốn sử dụng với dự án của mình. Bạn có thể chọn npm hoặc yarm, trong hướng dẫn này chúng ta sẽ dùng npm.<br>
Sau khi cài đặt thành công các dependencies cần thiết, hãy điều hướng đến thư mục gốc của dự án và chạy lệnh sau để khởi động live-load server dựa trên nodemon:<br>
`npm run start:dev`<br>
Bạn có thể sử dụng trình duyệt web truy cập server Nest tại địa chỉ http://127.0.0.1:3000/. Thời điểm nay, page sẽ chỉ hiển thị Hello World!.<br>
Bạn có thể để máy chủ chạy và mở terminal chạy lệnh khác mà chúng tôi sẽ đề cập trong bài hướng dẫn này.<br>

### 4: Cấu Trúc Của Project!
Dưới đây là screenshot cấu trúc của project:<br>
[](https://images.viblo.asia/24c603ef-acd6-4c59-8569-fde377f5fa42.png)
Project gồm folder node_modules và file package.json, thành phần cần thiết cho bất kỳ project Node.js nào. Đồng thời, bạn còn có thể thấy:
* File tsconfig.json giúp tùy chỉnh TypeScript
* File nodemon.json giúp tùy chỉnh nodemon
* File tslint.json giúp lint TypeScript
* nest-cli.json giúp tùy chỉnh CLI
* Folder src/ chứa code của project
* Folder test/ chứa file test.

### Lời kết
Trong bài viết này mình giới thiệu về framework Nest.js. Bài sao mình sẽ tạo controller và Module.
thanks!