# Giới thiệu
Từ lần đầu phát hành vào tháng 2 năm 2014, Vue đã có những bước phát triển rất nhanh chóng và được nhiều developer sử dụng. Bên cạnh đó, các công cụ của Vue.js cũng đang xuất hiện ở khắp mọi nơi. Lí do để Vue đạt được những thành tích đáng nể đó là do Vue được thiết kế từ đầu theo hướng cho phép và khuyến khích việc phát triển ứng dụng theo từng bước. Tài liệu dễ học giúp cho người mới dễ dàng tiếp cận, không chỉ vậy nó còn cho các developer có kinh nghiệm có thể chuyển đổi từ React hoặc Angular sang Vue mà không gặp khó khăn.

Nếu bạn thực sự muốn tìm hiểu về Vue thì sớm muộn gì bạn cũng sẽ phải làm việc với các tool và thư viện của nó. Sử dụng chúng có thể giúp bạn nâng cấp level trở thành Vue developer và làm cho bạn trở nên pro hơn :D

Trong bài, tôi sẽ viết ra 1 danh sách các công cụ - thư viện đáng chú ý mà bạn nên biết, và nói sơ qua cách sử dụng chúng trong các dự án Vue.js.  Không giống như nhiều bài viết khác chỉ liệt kê các thư viện UI, bài này sẽ cho bạn khám phá về cả hệ sinh thái Vue. Những công cụ - thư viện này được chọn dựa trên tính hữu dụng, hiệu quả và tính độc đáo của chúng chứ không phải rating sao trên Github.

Chúng ta cùng bắt đầu thôi!
# Vue.js Tools & Libraries
## 1. Vue CLI
![](https://images.viblo.asia/a6848abb-ab96-4efb-bd05-d7963331b671.PNG)

Dường như các công cụ dòng lệnh CLI giờ đây là những tính năng không thể thiếu cho một framework JavaScript. Vue cũng không ngoại lệ. Vue CLI là một bộ công cụ đầy đủ tính năng để phát triển Vue 1 cách nhanh chóng. Nó tương tự như PHP artisan trong laravel, nhưng Vue CLI còn cho phép bạn thử nghiệm các ý tưởng mới ngay cả khi không tạo ra full project. 

Mặc định Vue CLI hỗ trợ cho các công cụ và công nghệ phát triển web chính như Babel, TypeScript, ESLint, PostCSS, PWA, Jest, Mocha, Cypress và Nightwatch. Điều này có thể là nhờ hệ thống plugin mở rộng của nó, có nghĩa là cộng đồng có thể xây dựng và chia sẻ các plugin phục vụ nhu cầu tái sử dụng.

>[ Vue CLI](https://cli.vuejs.org/)

## 2. VuePress
![](https://images.viblo.asia/09a6d681-ae71-442d-a894-d3bb5eb1de3f.PNG)
Tiếp theo trong hệ sinh thái Vue thì phải tìm hiểu đếm VuePress, một trình tạo static site do Vue cung cấp. 

Vậy Static site là gì? Nó là 1 website phục vụ lưu trữ thông tin, không có sự tương tác nào giữa client và server, ngoại trừ nhúng bên thứ 3 vào trang, tốc độ load trang nhanh và giảm thiểu khả năng xảy ra lỗ hổng bảo mật.

VuePress được tạo ra như một công cụ để viết tài liệu kĩ thuật, bây giờ nó là một CMS nhỏ gọn. Kể từ phiên bản 1.x, nó đã cung cấp tính năng viết blog tuyệt vời và một hệ thống plugin mạnh mẽ. Nó đi kèm với 1 theme mặc định (phù hợp với tài liệu kĩ thuật), tuy nhiên bạn cũng có thể xây dựng các theme tùy chỉnh hoặc được tạo sẵn từ cộng đồng.

Trong VuePress, bạn viết nội dung trong Markdown, sau đó được chuyển đổi thành các file HTML tĩnh được render sẵn. Khi các file đó được tải, trang web của bạn sẽ chạy dưới dạng 1 single-page được cung cấp bởi Vue, Vue Router và Webpack.

Một trong những lợi ích chính của VuePress là bạn có thể include code Vue hoặc component vào bên trong file Markdown của mình. Điều này mang lại cho bạn tính linh hoạt vì bạn có thể phát triển trang web của mình gần giống như một ứng dụng Vue thông thường.

> [VuePress](https://v1.vuepress.vuejs.org)

## 3. Gridsome
![](https://images.viblo.asia/84055492-4d09-4dce-a6e8-06f517e2f098.PNG)

Gridsome có nhiều điểm tương đồng với VuePress nhưng cần 1 cách tiếp cận khác và nó rất mạnh khi xử lý các nguồn dữ liệu. Nó cho phép bạn kết nối và sử dụng nhiều loại giữ liệu khác nhau trong ứng dụng của mình, sau đó hợp nhất trong 1 lớp GraphQL. Về cơ bản, Gridsome sử dụng Vue cho chức năng front-end và GraphQL để quản lý dữ liệu. Cách thức hoạt động này có thể được tóm tắt trong 3 bước sau:

1. Bạn cung cấp nội dung ở các định dạng dữ liệu Markdown, JSON, YAML hoặc CVS, hoặc import nó từ 1 CMS như là WordPress hoặc Drupal.
2. Nội dung được chuyển thành lớp GraphQL, cung cấp quản lý dữ liệu tập trung. Sau đó, bạn sử dụng dữ liệu đó để xây dựng ứng dụng của mình với Vue.
3. Bạn triển khai các file HTML được render sẵn đến các máy chủ web tĩnh hoặc CDN như Netlify, Amazon S3, Now.sh, Surge.sh...

> [Gridsome](https://gridsome.org/)
## 4. Vuex
![](https://images.viblo.asia/523f125a-5b6f-4d01-9930-8279a9b0e530.PNG)

Quản lý state (trạng thái) là một trong những vấn đề chính mà các developer gặp phải trong khi xây dựng ứng dụng web. Để giải quyết điều này, Vue cung cấp một hệ thống quản lý state - Vuex. Nó là nơi lưu trữ tập trung cho tất cả các component của một ứng dụng, với nguyên tắc là các state chỉ có thể được thay đổi theo kiểu có thể dự đoán. 

Vuex có các thành phần sau:
* State: là một đối tượng lưu trữ dữ liệu ứng dụng
* Getters: một đối tượng chứa các phương thức được sử dụng để trừu tượng hóa việc truy cập vào state (trạng thái)
* Mutations: một đối tượng chứa các phương thức ảnh hưởng trực tiếp đến state (trạng thái)
* Actions: một đối tượng chứa các phương thức được sử dụng để trigger các mutation và thực thi mã không đồng bộ
> [Vuex](https://vuex.vuejs.org/)
## 5. Nuxt
![](https://images.viblo.asia/af0bb82c-9c37-47b4-b4a4-9fb28136eb1d.PNG)
Nuxt là một framework để tạo ra các ứng dụng Vue.js.

Mục tiêu của Nuxt.js là tạo ra một framework đủ linh hoạt để bạn có thể sử dụng nó làm cơ sở cho project hoặc ngoài project dựa trên Node.js.

Nuxt.js cài đặt trước tất cả cấu hình cần thiết để dễ dàng tạo ra Server Rendered của một ứng dụng Vue.js.


Sau khi nhìn thấy những ưu điểm của thiết kế của Next trong React, người ta đã triển khai tương tự nó cho Vue gọi là Nuxt.

Là một framework, Nuxt.js có rất nhiều tính năng giúp bạn phát triển giữa client và server, ví dụ như: dữ liệu không đồng bộ, Middleware, Layouts...

Với Nuxt, bạn có thể tạo server-rendered apps (SSR), single-page applications (SPA), progressive web applications (PWA) hoặc sử dụng nó như một trình tạo static site.

> [Nuxt](https://nuxtjs.org)
## 6. Vuetify
![](https://images.viblo.asia/20bb564b-7496-4b14-936b-0b3aedc43d86.PNG)
Vuetify là một trong những thư viện UI component lớn nhất hiện có. Nó cung cấp một tập lớn các component được tạo dựa trên Material Design, đủ cho hầu hết mọi nhu cầu của ứng dụng.

Bạn có thể sử dụng nó để xây dựng SSR app, SPAs, PWAs và mobile apps. Bạn cũng có thể tạo các ứng dụng mới hoặc thêm chúng vào các ứng dụng hiện có. Nó cung cấp các theme miễn phí và cao cấp, hoặc là bạn có thể tự xây dựng của riêng mình. Nó cung cấp một hệ thống để lựa chọn và chỉ chọn các thành phần đang sử dụng, do đó giảm đáng kể kích thước ứng dụng của bạn.

Tất cả các Vuetify component đều có tài liệu rất tốt và cung cấp các ví dụ rõ ràng.

> [Vuetify](https://vuetifyjs.com/en/)
## 7. Quasar
![](https://images.viblo.asia/86266830-10f8-4eaa-b3f3-0229abd6c251.PNG)

Quasar là một phiên bản Javascript theo triết lí "viết một lần, chạy ở mọi nơi". Nó cho phép bạn viết ứng dụng cho các nền tảng khác nhau như website, PWA, mobile app, electron app... với cùng một codebase. 

Nó có một tài liệu tuyệt vời và một bộ các component được thiết kế với hiệu suất và khả năng tương thích cao. Quasar tích hợp (HTML/CSS/JS mification, cache busting, tree shaking, source mapping, code-spilite với lazy loading, ES6, mã hóa code, phân quyền) mặc định để bạn có thể tập trung  chủ yếu vào các tính năng trong ứng dụng của mình. Không chỉ vậy nó còn cung cấp CLI tool cho project mới.

> [Quasar](https://quasar.dev)
## 8. Storybook
![](https://images.viblo.asia/542530c4-e382-45e5-90ab-20d3fbe9568f.PNG)
Storybook mới đầu chỉ phát triển cho các ứng dụng React, sau đó đã mở rộng cho Vue và Angular.

Vue là component-based framework nên việc viết các component tốt, hiệu quả là rất quan trọng với mỗi developer. Storybook cho phép bạn phát triển, quản lý và kiểm tra các UI componet trong một môi trường dễ sử dụng và biệt lập. Công cụ này cho phép các developer tạo các component độc lập với ứng dụng chính và hiển thị chúng trong một môi trường phát triển biệt lập mà không phải lo lắng về các yêu cầu hay phụ thuộc dành riêng cho ứng dụng.

Storybook cung cấp nhiều tiện ích bổ sung, thêm vào đó là API linh hoạt để dễ dàng tùy chỉnh. Bạn cũng có thể export như 1 static web app và deploy project của mình đến bất kì máy chủ HTTP nào.

> [Storybook](https://storybook.js.org/)
## 9. Vue Apollo
![](https://images.viblo.asia/83f67802-d231-40fb-81c8-393490cac98a.PNG)

Nếu bạn đã quen thuộc với GraphQL thì bạn có thể muốn tích hợp nó với Vue, và Vue Apollo sẽ giúp bạn làm điều đó. Thư viện này làm cho việc sử dụng Vue và GraphQL/ Apollo một cách mượt mà.
> [Vue Apollo](https://vue-apollo.netlify.com/)
## 10. Eagle.js
![](https://images.viblo.asia/7e63b5e7-3203-4ad3-b0ea-f8fe86b2890c.PNG)

Eagle.js là một hệ thống slideshow linh hoạt được xây dựng với Vue. Nó cho phép bạn dễ dàng tạo các component, slide và style trong project của mình. Nó cũng hỗ trợ cả animation, theme... để tạo web demo. Eagle.js có API đơn giản vì vậy bạn có thể tự do tạo các slideshow mà bạn muốn.

Một trong những điều tuyệt vời mà bạn có thể làm với thư viện này là đặt 1 slide trong 1 file riêng biệt và sau đó sử dụng lại trong những slideshow khác. Bạn cũng có thể import các slide của 1 slideshow cụ thể bên trong 1 slideshow khác. Với 1 công cụ mạnh như vậy, bạn có thể thực hiện những sideshow với độ khó cao.


> [Eagle.js](https://github.com/zulko/eagle.js/)
## Khác
Ngoài ra, có 5 công cụ và thư viện rất đáng chú ý khi bạn làm việc với Vue, phải kể như dưới đây:
- [Vue DevTools](https://github.com/vuejs/vue-devtools): là một browser extension để debug Vue và Vuex
- [Vue Test Utils](https://github.com/vuejs/vue-test-utils): là tập hợp các tiện ích cho việc test Vue component
- [Vue Router](https://github.com/vuejs/vue-router): định nghĩa routercho Vue
- [Vue Native ](https://vue-native.io/): là Javascript framework cho moble app, giống với React Native
- [Weex](https://weex.apache.org/): là framework để xây dựng mobile app với công nghệ web hiện đại, bao gồm cả Vue.

# Tổng kết

Bây giờ bạn đã có những công cụ bạn cần để xây dựng các dự án, bất kể chúng là gì: trang web, ứng dụng, thư viện, plugin.... Hi vọng các bạn sẽ tìm được gì đó hay ho từ bài viết này.

> Tham khảo:
> https://www.sitepoint.com/vue-js-tools-libraries/