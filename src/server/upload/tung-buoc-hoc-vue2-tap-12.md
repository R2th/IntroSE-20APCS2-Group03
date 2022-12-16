**Giới thiệu cơ bản về Vue 2**

Lại là mình quay trở lại với series Từng bước học Vue2. 

Sau bao ngày đã quá ngán ngẩm về các bài tập về components, hôm nay mình sẽ giới thiệu đến các bạn 1 web-pack và vue-cli có tên gọi là **vue-loader**. Site chính thức các bạn có thể tham khảo thêm tại https://vue-loader.vuejs.org/ . Mình sẽ không nói kĩ vào việc tại sao phải sử dụng web-pack nên bạn nào chưa rõ thì có thể tìm hiểu thêm xem web-pack và cli là gì nhé.

![](https://images.viblo.asia/7b2aae8d-45ed-40cc-90c4-30cebabf6c0b.jpg)

Ở phần giới thiệu mở đầu của site chúng ta cũng đã thấy được cấu trúc sau khi compile thì mọi thứ bạn cần trong 1 page vue như template, script, style đều sẽ được compile vào 1 single file

Giờ chúng ta cùng bắt đầu vào việc setting web-pack này vào 1 project Vue nhé

![](https://images.viblo.asia/c0c28388-ba09-4824-8a73-d4fc62653386.jpg)

Ở phần docs có hướng dẫn các command line để tạo được 1 project Vue có setting luôn web-pack.Sau khi chạy lần lượt các lệnh `npm install -g vue-cli` 

![](https://images.viblo.asia/f6f6fa89-b55e-4e8c-9bb2-a8d7844b6501.jpg)

Và `vue init webpack-simple my-app`

![](https://images.viblo.asia/b25d4973-71fe-464e-939a-24875109d8dd.jpg)

Chúng ta đã khởi tạo được 1 project Vue có apply web-pack vue-loader

Cùng mở project trên sublime, chúng ta sẽ thấy được cấu trúc của project như sau :

![](https://images.viblo.asia/06a0af3b-fa51-407c-9a86-9856ffe18f3a.jpg)

Ở file main.js chúng ta sẽ cùng bắt đầu tìm hiểu cách dùng theo web-pack. Các bạn có thể thấy trong file có thể import các file để sử dụng, cũng như khai báo `new Vue`
![](https://images.viblo.asia/45f10cce-8589-47ae-ab7d-730b45aa44aa.jpg)

Tiếp theo là file App.vue sẽ chứa tất cả những template, script, style.
![](https://images.viblo.asia/557d0573-d47d-44b7-be54-db5cceb01be9.jpg)

File webpack.config.js thì chính là webpack sử dụng để build cho cả project. Các bạn có thể xem qua để hiểu hơn về các entry, module-> rules ....
![](https://images.viblo.asia/3b2043cf-60a6-41c6-9c58-9e703c76600f.jpg)

Okie, giờ chúng ta tiếp tục chạy command line `npm install` để bắt đầu chạy thử project nhé.
![](https://images.viblo.asia/28f6a511-d375-45f7-a604-fd3dee57e577.jpg)

Sau khi chờ install hết package, chạy tiếp `npm run dev`
![](https://images.viblo.asia/df1c7753-589a-4f33-8a7c-f3cb7c687664.jpg)

Chuyển sang file App.vue chúng ta cũng copy paste dòng Core Docs
![](https://images.viblo.asia/8cb69874-1a7e-40fc-ac65-46dd04307af0.jpg)

Và trình duyệt sẽ tự build ngay lập tức với kết quả như sau:
![](https://images.viblo.asia/e3147d52-a427-49f4-ac5c-d98a5be563e7.jpg)

Sau đó mình sẽ xóa hết các phần bên trong đi để chúng ta cũng bắt đầu thử dùng component theo cấu trúc web-pack vue-loader nhé
![](https://images.viblo.asia/fc33aa3f-27b5-4d23-a477-2bc3f045501f.jpg)

Tiếp đến mình sẽ tạo ra 1 file component/Message.vue

![](https://images.viblo.asia/55bb4f52-0f1d-4422-84f8-c0eb652f877d.jpg)

Trong đó mình sẽ tạo ra template sử dụng cặp thẻ <slot></slot> để nhận dữ liệu như đã giới thiệu ở những bài trước.
Ở phần <script> mình sẽ export default. Cuối cùng thì mình tạo style cho phần template ở trên.
    
Quay lại file App.vue mình sẽ import file Message.vue vào, nhớ phải thêm cả components ở phần export nhé. Sau đó chúng ta sẽ có kết quả như bên phải ảnh. Style đã được nhận cho cặp thẻ <message></message>
![](https://images.viblo.asia/0c61c8ea-a71e-4fef-b594-1b7a4bec8ddf.jpg)

Và tất nhiên là chúng ta có thể sử dụng components message nhiều lần 
![](https://images.viblo.asia/5598663e-6e39-47be-8026-8d67f9ebe8d9.jpg)



Okie, bài học hôm nay cũng dừng lại ở đây, vào tập tiếp theo mình sẽ giới thiệu đến các bạn những phần khác của Vue2, cùng đón chờ nhé

Hẹn gặp lại các bạn vào bài tiếp theo trong Series nhé !!!!