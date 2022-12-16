### Chào các bạn, như tiêu đề, hôm nay mình sẽ giới thiệu đến các bạn một thứ hay ho mới của Vue mà Evan You mới tạo ra.....đó là Vue Vite

**Trước tiên phải giới thiệu về Vue Vite**

Vite là một thử nghiệm của vue về việc bạn có thể chạy 1 file vue (single-file component) mà không cần phải trải qua bất kì bước bundle nào,  nó được trực tiếp import bởi trình duyệt ([native ES module imports ](https://caniuse.com/#feat=es6-module)) :)

**Hơi khó mường tượng phải không? đến ngay với ví dụ cho dễ hiểu nào.**

Trước khi bắt đầu, nhớ kiểm tra xem bạn đã cài nodejs chưa nhé :laughing:

Đầu tiên tạo 1 file component tên **App.vue**

![](https://images.viblo.asia/d185eb9c-6452-4df5-bead-f2906dcdfa3b.png)

Như chúng ta đã biết, cần phải có 1 cái root element để code của chúng ta có thể được render ra.

Tiếp tục tạo 1 file tên **index.html** cùng cấp với file **App.vue**  vừa nãy với nội dung như sau:

![](https://images.viblo.asia/3ebc9c19-b429-4c20-b84b-26be4d931fa9.png)

Mở terminal và chạy  lệnh `npx vite`

Sau đó mở browser và truy cập `http://localhost:3000` 

![](https://images.viblo.asia/bc1228a7-defd-45e4-b22a-ae1382018767.png)

**Vite** cũng hỗ trợ hot-reload Bạn có thể sửa file `.vue` để thấy nó có hot-reload

Bạn cũng có thể build production để public app của bạn (mấy mini project chẳng hạn)

Tạo file **package.json** nội dung như sau:

![](https://images.viblo.asia/0a40df4f-9c93-4d1a-a17f-268008fae325.png)

Cài đặt vite: `npm i vite -D`

Build: `npm run build`  sau đó kiểm tra source code của bạn có thư mục dist hay chưa, đó là source code đã được build :upside_down_face: 
## Kết
 Bạn cũng có thể sử dụng lệnh `npx create-vite-app <project-name>` để tạo project của mình

 Hiện tại **Vite** vẫn đang là thử nghiệm và đang trong quá trình hoàn thiện hy vọng sớm được trải nghiệm tiếp thứ gì thú vị từ nó mang lại.

Có thể bạn đã biết: **Vue** là **view** trong tiếng pháp còn **Vite** là **fast** trong tiếng pháp :nerd_face:

Các bạn có thể tham khảo và tìm hiểu thêm tại đây: https://github.com/vuejs/vite