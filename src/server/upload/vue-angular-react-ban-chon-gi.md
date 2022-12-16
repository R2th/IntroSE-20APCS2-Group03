Trong thời buổi ngày nay các nhà phát triển ngày càng có xu hướng chuộng những ứng dụng web chạy ở phía client (chạy ở browser của người dùng). Và Javascript là một trong những ngôn ngữ được sử dụng phổ biến và rộng rãi nhất. Dưới đây là một khảo sát của Stack Overflow về độ phổ biến của ngôn ngữ lập trình:

![](https://images.viblo.asia/e755d0dd-1597-4d74-baae-a77c148e80cc.png)

Javascript là ngôn ngữ được sử dụng rộng rãi nhất. Kèm theo đó là sự phát triển và phủ sóng nhanh chóng của các framework javascript. Được nhắc đến nhiều nhất có lẽ là `Vue`, `Angular`, `React`. Vậy hôm nay chúng ta sẽ đi tìm hiểu xem có điều gì hay và không hay ở 3 framework javascript này. Bắt đầu thôi!

# I. Vue, Angular, React.
## 1. Vue.
Vue là một framework linh động dùng để xây dựng giao diện người dùng. Khác với các framework nguyên khối, Vue được thiết kế từ đầu theo hướng cho phép và khuyến khích việc phát triển ứng dụng theo từng bước.

Trong một báo cáo khảo sát của Stack Overflow thì Vue đứng thứ 7 trong những web framework phổ biến nhất, đứng thứ 2 trong những web framework được yêu thích nhất và đứng thứ 2 trong những framework muốn được sử dụng nhất.

Rất ổn áp đúng không nào!

Cũng theo một báo cáo về Javascript năm 2019 của JetBrains thì Vue đứng thứ 3 trong những javascript framework được sử dụng nhiều nhất.

Và độ phủ sóng của nó thì ngày càng phình to.

Tại trang [github của Vue](https://github.com/vuejs/vue) đã đạt hơn 162.000 star và 292 người đóng góp rồi.

Một số công ty lớn cũng đã sử dụng Vue như là Facebook, Adobe, Alibaba, Gitlab, Nintendo.

```javascript
// index.html
<div id="app">
  <h1>{{ msg }}</h1>
</div>

// index.js
new Vue({
  el: '#app',
  data: {
    msg: "Hello World"
  }
});
```
## 2. Angular.
Angular (chúng ta sẽ đề cập đến Angular 2 trở lên nhé) là một nền tảng phát triển web được viết bằng TypeScript nó cung cấp cho developer những công cụ mạnh mẽ để tạo một ứng dụng web chạy ở client.

Phiên bản đầu tiên của nó là Angular 1 còn được gọi là AngularJS. Ở những phiên bản sau được gọi là Angular (v2+) và được làm lại từ phiên bản đầu tiên.

Trong một thời gian dài thì Angular và React được biết là 2 framework đối thủ truyền kiếp của nhau trong công cuộc giành vị trí framework javascript phổ biến nhất.

Theo [hotframeworks](https://hotframeworks.com/) thì AngularJS là framework phổ biến đứng thứ 2 và Angular là thứ 3.

Theo Stack Overflow thì Angular đứng thứ 3 trong các framework muốn được sử dụng nhất. Và đứng thứ 4 về độ phủ sóng theo JetBrains.

Một số công ty như YouTube, Microsoft, Cisco, Udemy, Paypal, Google, Apple đang sử dụng Angular hoặc AngularJS trong những dự án.

```javascript
import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    template: `<h1>Hello World</h1>`,
})
export class AppComponent {}
```

## 3. React.
React là một thư viện mạnh mẽ được phát hành và bảo trì bởi Facebook cho phép developer tạo giao diện người dùng.

React hiện tại đang giữ ngôi vương của rất nhiều khảo sát cũng như báo cáo.

Theo JetBrains React đứng vị trí đầu tiên trong các framework được sử dụng rộng rãi nhất.

Theo Stack Overflow React cũng giữ vị trí độc tôn trong những framework muốn được sử dụng nhiều nhất cũng như những framework được yêu thích nhất.

Cũng theo [hotframeworks](https://hotframeworks.com/) React đứng ở ngưỡng cao nhất của bảng xếp hạng những framework có độ phổ biến nhất.

Có rất nhiều các ông lớn về công nghệ sử dụng React trong dự án của họ. Có thể nói đến như là Facebook, Instagram, WhatsApp, Khan Academy, Codecademy, Dropbox, Atlassian, and Airbnb.

Vẫn là React vẫn là ông hoàng quyền lực của làng javascript framework!!!

```javascript
// index.html
<div id="app"></div>
// index.js
React.render(
  <div>
    <h1>Hello World</h1>
  </div>,
  document.getElementById('app')
);
```

Tiếp theo hãy cùng đi đến những điểm hay và không hay giữa các framework. Bắt đầu thôi!

# II. Vue, Angular, React! Hãy xem chúng được trang bị và hạn chế những gì.
## 1. Vue.
**Điểm hay:**
+ Được xây dựng trong mô hình kiến trúc MVC làm cho các cấu hình của ứng dụng Vue trở nên đơn giản và nhanh hơn.
+ Vue thì rất nhẹ và nhanh. Một file Vue.js (2.4.2) sau khi được minifiy chỉ khoảng 58.8 KB.
+ Sẽ rất dễ dàng để chúng ta sử dụng Vue để xử lý những two-way binding và thay đổi DOM khi mà data của chúng ta thay đổi. Nó tạo nhiều ý tưởng cho các ứng dụng yêu cầu realtime.
+ Có tool CLI được bảo trì và sửa đổi khá tốt mang lại những tính năng giúp developer dễ dàng hơn trong quá trình phát triển ứng dụng. Như là kiến trúc plugin-based và PWA.
+ Có 1 dev tool là một browser extension hỗ trợ tốt trong quá trình phát triển sản phẩm.
+ Các component Vue cũng là những thể hiện Vue (Vue instances). Chúng có thể dễ dàng sử dụng lại cũng như là được kết hợp với những công nghệ khác. 
+ Một điểm nữa cũng khá thú vị là Vue rất dễ tiếp cận đối với các developer chuyên markup. "Bạn biết HTML, CSS và Javascript?"

**Điểm không hay:**
+ Vue thì gần như là không được giới hạn. Quá nhiều lựa chọn sẽ gây tranh chấp trong một đội phát triển. Đặc biệt là khi làm trong một dự án lớn và cần nhiều những kỹ thuật, công nghệ đặc thù.
+ Rào cản ngôn ngữ cũng là một điểm trừ cho Vue. Không giống như các framework khác thì Vue rất được chuộng ở Trung Quốc. Và cả cộng đồng ở đây cũng vậy. Nhưng tài liệu thì phần lớn là được viết là tiếng Trung. Khá khó khăn để dịch chuẩn xác từ tiếng Trung sang tiếng Anh (Phổ biến với developer).

## 2. Angular.
**Điểm hay:**
+ Kiến trúc Component-based. Ở phiên bản thứ hai Angular thay đổi từ MVC sang kiến trúc component-based.
+ Angular’s ahead-of-time (AOT): Trình biên dịch Angular’s ahead-of-time (AOT) biên dịch TypeScript và HTML sang Javascript trong quá trình build. Điều đó có nghĩa là khi chúng ta code thì những đoạn code đó sẽ được chuyển đổi sang Javascript trước khi browser tải những file của ứng dụng của chúng ta để chạy. Vì thế mà tốc độ render sẽ rất nhanh.
+ Angular Elements. Bắt đầu từ Angular 6 thì developer có thể dễ dàng thêm một custom element vào bất kỳ ứng dụng nào viết bằng React, Jquery, Vue, ....
+ Ivy Renderer. Có lẽ đây là điểm hay nhất trong Angular (từ Angular 6). Ivy Renderer có thể phiên dịch những component cùng với những template sang javascript code và có thể được hiển thị trên trình duyệt.
+ Angular Universal. Được sử dụng cho SSR (server-side rendering). Hỗ trợ cho SEO, giảm thời gian tải trang và tăng tốc độ xử lý trên các thiết bị mobile.
+ Một điều nữa là luồng xử lý của Angular rất bài bản. Các đối tượng được làm rất nổi bật và rõ ràng chức năng. Những tài liệu tham khảo rất chi li và giải thích rất cặn kẽ giúp người đọc có để phần nào đào sâu vào các kiến thức bên dưới.

**Điểm không hay:**
+ Dependency Injection (DI) có thể sẽ gây mất thời gian và có thể trở nên rất khó để tạo những dependencies cho những component của chúng ta. Ngoài ra thì khái niệm DI cũng rất mơ hồ và gây khó hiểu nếu không tìm hiểu chuyên sâu.
+ Angular có lẽ là công cụ nặng nhất (vì nó quan tâm quá nhiều vấn đề) so với 2 framework còn lại. Phiên bản của Angular sau khi được minify thì khoảng 566 KB, AngularJS (1.4.5) là 155 KB. Nặng hơn hai framework kia rất nhiều.
+ Như chúng ta biết thì Angular có 2 phiên bản riêng biệt là AngularJS (v1) và Angular (v2+). Và hai phiên bản này khác nhau rất nhiều nên việc chuyển một dự án từ AngularJS sang Angular gần như là điều bất khả thi.

## 3. React.
**Điểm hay:**
+ Chúng ta có lẽ phải cảm ơn kiến trúc component-based của React. Nó làm cho code của chúng ta dễ dàng được sử dụng lại. Rất có lợi trong các dự án lớn khi chúng ta ở quá trình báo trì hoặc gỡ lỗi.
+ Dễ dàng chuyển đổi từ phiên bản cũ sang phiên bản mới.
+ React có thể dễ dàng được tích hợp với các framework khác như Backbone.js or Angular.js, ...
+ Chúng ta có thể làm việc trực tiếp với các component và sử dụng luồng data đi xuống (từ cha về con) thay vì data binding. Đảm bảo tốt nhất tính ổn định của luồng data, hạn chế tối đa sự biến đổi bất thường của luồng data.
+ Cung cấp một dev tool extension phục vụ tốt nhất cho việc phát triển sản phẩm.
+ React cũng hỗ trỗ SSR (server-side rendering) nữa.
+ Và theo như nhiều develop và có cả mình thì React thì rất linh hoạt, khả năng mở rộng rất ổn và về tốc độ nữa.
+ Một điều nữa là React khá dễ học. Những kiến thức cơ bản khá dễ dang để hiểu, chỉ là sẽ khó hơn nếu chúng ta muốn đào sâu vào.

**Điểm không hay:**
+ Vẫn là không được giới hạn. Rất nhiều hướng có thể phát triển, tiếp cận để hoàn thành nhất sản phẩm.
+ React thì dùng JSX, một cú pháp để viết cả HTML và javascript. Nó khá phức tạp vì thể mà nó như một rào cản những người mới bước chân vào React.
+ React cung cấp cho chúng ta chỉ là phần lõi thôi. Vì thế để mà ứng dụng của chúng ta có thể phục vụ được những tính tăng thì cần phải có những cơ cố tool để thực hiện đúng cách và phải tương thích với những tool khác dùng trong phát triển web.

# III. Kết luận.
Thì ở trên mình đã trình bày xong về 3 framework javascript phổ biến nhất hiện nay. Vậy các bạn đã có lựa chọn nào cho mình hay chưa.

Có thể bạn đã sử dụng 1, 2 và thậm chí cả 3 framework trên rồi. Nhưng hãy nhớ là học nhiều là không có nghĩa là biết hết. Nó có thể gây lẫn lộn, làm kiến thức bị pha tạp. Vì vậy hãy cân nhắc hướng đi và chọn 1 framework bạn giỏi nhất, 2 framework còn lại thì hãy tiếp tục khi bạn cảm thấy mình đã ổn với 1 framework rồi.

Vậy là bài viết của mình đến đây là hết rồi. Xuyên suốt bài viết một là mình tham khảo trên internet, một phần nữa là mình có được thông qua kinh nghiệm làm của bản thân. Thì mong là bài viết này sẽ mạng lại lợi ích cho các bạn. Nhưng mình đoán là 3 framework này sẽ còn phát triển và cạnh tranh mạnh hơn nữa trong những năm tới. Vì thế những nội dung mình nêu bên trên sẽ còn thay đổi nữa.

Còn bây giờ thì xin chào và hẹn gặp lại các bạn trong các bài viết kế tiếp!!!