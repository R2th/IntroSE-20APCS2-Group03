## 1. Single-page application (SPA) và Multiple-page application (MPA)
Với **Multiple-page application (MPA)** các website sẽ được render với cơ chế server-side rendering, có nghĩa là khi client thực hiện một request. Server sẽ tiếp nhận request này, sử lý các logic nghiệp vụ, cuối cùng là render một trang html hoàn chỉnh sau đó trả lại phía client. Lúc này, phía client (thường là web browser) sẽ đọc các file html này và hiển thị trong trình duyệt.

Với mô hình **MPA**, có thể thấy việc xử lý chính được diễn ra ở phía server và client chỉ đóng vai trò hiển thị data. Hơn thế nữa, cứ mỗi khi nhận một response thì phải load lại toàn bộ trang cùng với các file js, css, image, ... Ngoài ra, gần như front-end và back-end gần như nằm chung một phía, yêu cầu phải có sự liên kết chặt chẽ giữa 2 phía này. Mô hình **SPA** ra đời một phần để khắc phục các nhược điểm đó của mô hình **MPA**. 

**Single-page application (SPA)** là cơ chế ngay khi client gửi request lần đầu tiên, server sẽ gửi cho chúng ta một trang index.html duy nhất, với các request tiếp theo, chúng ta sẽ gọi các api từ phiá web server bằng `AJAX`, sau đó dựa trên kết quả trả về mà chúng ta sẽ render lại một phần hay toàn bộ trang với JS. Lúc này web server sẽ chỉ còn đóng vai trò xử lý các logic, nghiệp vụ hoặc lấy dữ liệu từ phía database.

![](https://images.viblo.asia/f24f33da-f196-4536-ad27-f3ce328e61a2.jpg)

Mô hình **SPA** đã gần như tách rời front-end và back-end, mỗi bên có thể xử lý công việc của mình riêng rẽ, trình duyệt thay vì chỉ hiển thị view như trước đây, giờ còn đóng thêm vai trò xử lý các response từ phía server và re-render lại trang nếu cần thiết. Đa phần các resource đã được tải về trong lần gửi request đầu tiên không cần phải tải lại nhiều lần nên về cơ bản đã tăng đáng kể hiệu suất của toàn app. Tuy vậy, mô hình **SPA** đòi hỏi khá nhiều xử lý ở phía client, xử lý các hàm js, callback, ajax, .... Từ đây các framwork JS được ra đời để hỗ trợ các developer trong việc xử lý ở phía front-end. 

## 2. Giới thiệu VueJS
Năm 2014, `Even You` - một kỹ sư từng làm việc tại Google - cho ra mắt phiên bản đầu tiên của VueJS. Ở thời điểm hiện tại VueJS cùng với Angular và React là 3 framework được sử dụng nhiều nhất bởi cộng đồng. Theo wikipedia : 
> Vue.js, gọi tắt là Vue (phát âm là /vjuː/, giống như view trong tiếng Anh), là một framework linh động dùng để xây dựng giao diện người dùng (user interfaces - UI). Khác với các framework nguyên khối, Vue được thiết kế từ đầu theo hướng cho phép và khuyến khích việc phát triển ứng dụng theo các bước. Khi phát triển lớp giao diện, người dùng chỉ cần dùng thư viện lõi (core library) của Vue, vốn rất dễ học và tích hợp với các thư viện hoặc dự án có sẵn.  Cùng lúc đó, nếu kết hợp với những kĩ thuật hiện đại như SFC (single file components) và các thư viện hỗ trợ, Vue cũng đáp ứng được dễ dàng nhu cầu xây dựng những ứng dụng đơn trang (SPA - Single Page Applications) với độ phức tạp cao.

Trong mô hình MVC, View và Model sẽ giao tiếp với nhau qua Controller. Từ View sẽ không biết Model là ai và Model cũng không biết View là ai. Khi cần dữ liệu gì, View sẽ gọi tới Controller và từ Controller sẽ tự đi tìm và thao tác tại Model thích hợp xử lý nghiệp vụ và trả về View thông qua Controller.

![](https://images.viblo.asia/6e10ab04-d65a-40dd-867a-d475b1aef137.png)

VueJS là framework sinh ra để phát triển giao diện người dùng, đóng vai trò View trong mô hình MVC theo SPA concept. Vue khá nhẹ và hiệu năng cũng khá tốt so với mặt bằng chung các framework đồng thời cũng dễ dàng tích hợp với các project qua CDN hoặc NodeJS. Vue hỗ trợ xây dựng các DOM ảo, giúp tương tác với các thể html bằng JS thông qua `<template>`, routing thông qua `vue-router` hay quản lý state trong `vuex`. 

Ngay tại thời điểm bài viết, VueJS đã release alpha phiên bản Vue 3 với rất nhiều tính năng mới và hiệu năng được cải thiện đáng kể. Tuy vậy, Vue 3 vẫn chưa ổn định nên trong series này mình sẽ chủ yếu nói về Vue 2 mà thôi. Nhưng các bạn đừng lo, về cơ bản cú pháp của 2 phiên bản Vue 3 và Vue 2 không quá khác biệt. Nếu đã quen với Vue 2 thì các bạn cũng sẽ dễ dàng tìm hiểu về Vue 3. Các bạn có thể tìm hiểu thêm về document của hai phiên bản Vue tại đây : [Vue2](https://vi.vuejs.org/v2/guide/) và [Vue 3](https://v3.vuejs.org/guide/introduction.html)
## 3. Cài đặt
Đầu tiên, với bất cứ framework JS nào, chúng ta cũng nên cài đặt NodeJS, các bạn có thể cài đặt NodeJS [tại đây](https://nodejs.org/en/). NodeJS là một platform, hỗ trợ chạy JS trực tiếp ngay trên máy thay vì chỉ chạy được trên trình duyệt. Việc cài đặt khá đơn giản, cứ next next là được. Chúng ta chạy lệnh cmd sau để kiểm tra NodeJS trên máy: 
```
node -v
```
Để hỗ trợ tạo các project Vue, chúng ta sẽ cài đặt thêm Vue-CLI. Tìm hiểu thêm Vue-CLI [tại đây](https://cli.vuejs.org/)
```
npm install -g @vue/cli
hoặc
yarn global add @vue/cli
```
## 4. Tạo một project Vue
Để tạo project mới chúng ta gõ lệnh vue create <tên project>. Vd  `vue create demo-vue`. Trong các options, chúng ta sẽ chọn `Default Vue 2`

![](https://images.viblo.asia/b717ac51-c065-49c5-ae3c-a2e373426bd9.png)

![](https://images.viblo.asia/e59d4e65-3808-4598-a17e-47ad17c961e9.png)

Chúng ta cd vào project vừa tạo như trong hình, thực thi lệnh sau `yarn serve` hoặc `npm run serve` để chạy project. Mở `http://localhost:8080` để kiểm tra.

![](https://images.viblo.asia/529fcd37-5916-4b56-b704-ddf33982109d.png)

Done, vậy là chúng ta đã thành công tạo và chạy một project VueJS !!!