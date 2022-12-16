**Bài viết dưới đây của mình sẽ thống kê một số thư viện cung cấp các Bootstrap components cho các ứng dụng Angular, React hay Vue.js**

Ngày nay, các Website có xu hướng được phát triển theo concept Single Page Applications (SPAs), với tốc độ nhanh và đem lại trải nghiệm tốt cho người dùng. Và Angular, React hay Vue.js chính là những công cụ để tạo nên chúng.

Khi nói đến việc style cho các component được tạo bởi các thư viện này, bạn có rất nhiều cách để lựa chọn: tự viết một file CSS global, inline style vào các component, hoặc là sử dụng UI Frameworks, cụ thể ở đây là những UI Framworks được base trên Bootstrap - Framework đã rất quen thuộc trong việc xây dựng UI cho website.

## For Angular
### ng-bootstrap
![](https://images.viblo.asia/bf55c1d2-2f44-41e9-a3c1-266e47f9c083.png)

**ng-bootstrap** cung cấp một tập các component theo kiểu Bootstrap, giúp cho việc xây dựng các ứng dụng Bootstrap với Angular trở nên vô cùng dễ dàng. Cụ thể hơn, tài nguyên này chứa một tập các lệnh Angular dựa trên markup và định dạng của Bootstrap. Để hoạt động được, nó không cần bao gồm các file JavaScript Bootstrap như Boostrap thông thường. Bạn chỉ cần các file CSS Bootstrap và Angular mà thôi. **ng-bootstrap** miễn phí và là một open-source project. Hãy tùy ý thích mà đóng góp hay yêu cầu những tính năng mới trên GitHub nhé

### ngx-bootstrap
![](https://images.viblo.asia/c7f40aa5-74f6-4ed5-9105-a243923cf177.png)

Đây là một thư viện dạng module tuyệt vời với mã nguồn mở khác của component Bootstrap dành cho Angular. Bạn không cần dùng đến jQuery hay Bootstrap JS file nào, mặc dù markup và CSS ở đây đều được cung cấp bởi Bootstrap. 
Để cài đặt thư viện với npm, thực thi câu lệnh: 

```
  npm install ngx-bootstrap --save
```

Bạn có thể tham khảo thêm về **ngx-bootstrap** ở trang document của thư viện này tại [đây](https://valor-software.com/ngx-bootstrap/#/documentation) để nắm được rõ hơn cách sử dụng cũng như các components của nó

## For React

### reactstrap
![](https://images.viblo.asia/b550ac34-a778-45e6-a7fd-298536d4c432.png)

Tương tự những những boostrap UI Framework dành cho Angular, **reactstrap** là một thư viện với các component được cung cấp từ Bootstrap và các chức năng sử dụng Javascript được tích hợp vào các component của nó

Lưu ý nhỏ khi cài đặt thư việc này thông qua CDN, bạn sẽ phải đảm bảo đã cài đặt 2 thư viện đi kèm bắt buộc là [React](https://cdnjs.com/libraries/react) và [ReactTransitionGroup](https://unpkg.com/react-transition-group@4.3.0/dist/react-transition-group.min.js)

### React-Bootstrap
![](https://images.viblo.asia/11504333-a345-448a-a855-5ee6fb38f045.png)

Đây là một open-soucre project vẫn đang được tích phát triển và hoàn thiện để đáp ứng được những yêu cầu từ các developer.

Thư viện này không hỗ trợ một phiên bản Bootstrap cụ thể nào, vậy nên bạn có thể áp dụng nó cho bất kỳ phiên bản Bootstrap nào được sử dụng trong dự án của bạn. Tóm gọn lại, dù là phiên bản Bootstrap mới nhất, **React-Bootstrap** cũng sẽ đảm bảo cập nhật đầy đủ và chi tiết nhất để developer có thể dễ dàng sử dụng.

### Material Design for Bootstrap React Version
![](https://images.viblo.asia/0f91cfce-5d9b-4c40-ac8c-55559d563868.png)

Material Design cho Bootstrap này (cũng có cả phiên bản Angular và Vue) là một thư viện UI cho React, kết hợp giao diện của Bootstrap và Material Design của Google. Một vài lợi ích của nó có thể kể đến:
* Tương thích với các phiên bản Bootstrap mới nhất
* Document và tutorials tuyệt vời của nó
* Tương thích với phiên bản mới nhất của React
* Sử dụng JSX
* Dễ dàng cài đặt
* Miễn phí cho các dự án cá nhân + thương mại

Để sử dụng Material Design for Bootstrap, chỉ cần download trực tiếp từ website của nó, hoặc sử dụng npm / yarn:

```
npm install mdbreact

or 

yarn add mdbreact
```

## For Vue.js
### BootstrapVue
![](https://images.viblo.asia/25526276-8458-4deb-9c42-59ebbe7d694f.png)

[BootstrapVue](https://bootstrap-vue.js.org/) được giới thiệu là một thư viện UI:

> provides one of the most comprehensive implementations of Bootstrap V4 components and grid system available for Vue.js 2.4+, complete with extensive and automated WAI-ARIA accessibility markup.

Nghĩa là nó cung cấp những trải nghiệm toàn diện nhất với Boostrap 4 components và Grid system dành cho Vue.js 2.4+, được hoàn thiện với truy cập WAI-ARIA tự động và mở rộng.

Đây là một thư viện rất hay trong việc xây dựng UI cho dự án sử dụng Vue.js. Bạn có thể tham khảo thêm về BootstrapVue cũng như cách sử dụng nó tại [đây](https://bootstrap-vue.js.org/docs)

## Kết
Bài viết trên giới thiệu đến bạn một vài gợi ý nhỏ giúp bạn dễ dàng hơn trong việc xây dựng UI cho dự án sử dụng Angular, React cũng như Vue.js. Hi vọng với những thư viện UI trên, bạn sẽ dễ dàng tạo ra những sản phẩm với UI đẹp mắt và thân thiện với người dùng

Nguồn tham khảo: https://www.sitepoint.com/bootstrap-ui-libraries-angular-react-vue/