### Gutenberg là gì
Gutenberg là một trình soạn thảo mới cho WordPress. Nó được đặt tên theo **Johannes Gutenberg**, người đã giới thiệu máy in cơ khí và bắt đầu cuộc cách mạng in ấn ở châu Âu.
Trình soạn thảo hiện tại yêu cầu có kỹ năng cơ bản về code, để sử dụng shortcode và HTML để tạo ra trang web. Mục tiêu của các nhà phát triển là làm cho việc này trở nên dễ dàng hơn, đặc biệt đối với những người mới bắt đầu với WordPress. Họ sẽ tạo ra những khối nhỏ và thêm nhiều tuỳ chọn để người dùng thiết lập, các bạn có thể xem trang mẫu [tại đây](http://moc.co/sandbox/example-post/)

Thêm một điểm nữa, Gutenberg sẽ được tích hợp vào phiên bản WordPress 5.0.

### CGB là gì
CGB có tên là **Create Guten Block Toolkit**, bộ công cụ được viết bởi **Ahmad Awais** giúp người dùng dễ dạng tạo các **block Gutenberg**, nó đã được thiết lập sẵn để hoạt động với ReactJS, JSX, Webpack...

Plugin WordPress về block Gutenberg đầy đủ nhất hiện tại là [Atomic Blocks](https://wordpress.org/plugins/atomic-blocks/) cũng được phát triển bằng bộ công cụ này.

### Tính năng chính của CGB
* Hỗ trợ React, JSX và ES6
* Chỉ dependency 1 resource: cgb-scripts
* Auto-prefixed CSS
* Không yêu cầu phải include nhiều files mà vẫn có thể hoạt động với output sau khi đã build.

Package **cgb-scripts** xử lý tất cả các loại cấu hình khác mà bạn có thể cần. Nói cách khác, bạn không phải include các package khác để bắt đầu phát triển **block Gutenberg**.

### Cài đặt CGB
- Yêu cầu: Máy bạn cần cài đặt [NodeJS](https://nodejs.org/en/) 8, [NPM](https://www.npmjs.com/get-npm) 5.3 trở lên để có thể cài đặt CGB.
- Tiếp theo hãy cài đặt npx từ NPM:
```npm install -g npx```

Sau khi cài đặt xong, hãy cài đặt WordPress ở local, cài đặt và active plugin **Gutenberg**, tiếp theo đi đến thư mục wp-content/plugins, tạo block đầu tiên bằng lệnh sau:
```
npx create-guten-block first-block
cd my-block
npm start
```

Chúng ta sẽ được thư mục first-block với cấu trúc như sau:
![](https://images.viblo.asia/f0715c0f-77c9-4fda-8979-562f58a7292d.png)

Tiếp theo vào WordPress admin plugins, active plugin First Block mà chúng ta vừa tạo, sau đó tạo mới Page hoặc bài viết, sẽ thấy block CGB Block, đó chính là block mà CGB đã tạo sẵn khi chúng ta cài đặt:
![](https://images.viblo.asia/6c8af707-fce5-4677-8671-a0c5767f0988.png)

### Kết luận
Sau bài viết này các bạn đã có thể tạo block Gutenburg một cách dễ dàng. Bài viết sau mình sẽ đi vào hướng dẫn chi tiết cách tạo một block Gutenburg. Hẹn gặp lại các bạn nhé!