Nếu bạn là một nhà phát triển Vue.js, thì bây giờ bạn có thể đã nghe nói về Nuxt.js. Nhưng có thể bạn không biết hết tất cả những gì về nó. Bạn có thể hỏi: "Tại sao tôi lại cần một framework cho một framework?". Vue đã làm cho việc phát triển các ứng dụng JavaScript dễ dàng hơn. Ý tưởng gì khi sinh ra Nuxt.js? Trong bài viết này, tôi sẽ đề cập đến 10 lý do tại sao bạn có thể muốn sử dụng nó trong dự án tiếp theo của bạn.
![](https://images.viblo.asia/84ae9ec3-856c-482c-9b3f-f4c076b34fc1.png)
### Nuxt.js là gì?
Nuxt.js là một framework cấp cao hơn được xây dựng dựa trên Vue. Nó đơn giản hóa việc phát triển các ứng dụng Vue single page. Mục tiêu của Nuxt là nó đủ linh hoạt để bạn sử dụng làm main project base. Bởi vì với Nuxt, bạn nhận được rất nhiều tính năng chỉ với một vài kilobyte bổ sung được thêm vào files JavaScript của bạn.<br>
Hãy cùng khám phá những lý do tại sao bạn có thể xem xét Nuxt cho những dự án Vue tiếp theo của mình nhé.

### 1. Tạo ra universal apps mà không gặp rắc rối
Một trong những điểm hay nhất của Nuxt.js là nó giúp việc tạo các universal apps trở nên dễ dàng hơn.
#### Vậy một universal app là gì?
Một universal app sử dụng để mô tả code JavaScript có thể thực thi cả trên client và phía server.<br>
Nhiều frameword JavaScript hiện đại, như Vue, nhằm mục đích xây dựng Single Page Applications (SPAs).  Có rất nhiều lợi thế để có một SPA trên 1 trang web truyền thống. Ví dụ: bạn có thể xây dựng các giao diện người dùng rất linh hoạt, cập nhật nhanh. Nhưng các SPA cũng gặp phải những nhược điểm như thời gian tải lâu và Google phải vật lộn với chúng vì ban đầu không có nội dung nào trên trang để thu thập thông tin cho mục đích SEO. Tất cả nội dung được tạo với JavaScript sau khi thực thi.<br>
Một universal app là về việc có một SPA, nhưng thay vì có một trang` index.html` trống, bạn có thể tải trước ứng dụng trên web server và gửi mã html đến browser request trên tất cả các route để tăng tốc thời gian tải và cải thiện SEO bằng cách giúp Google thu thập dữ liệu trang dễ dàng hơn.
#### Nuxt.js giúp bạn viết các universal apps đơn giản hơn
Xây dựng các universal apps có thể trở nên tẻ nhạt vì bạn phải thực hiện nhiều cấu hình ở cả phía client và phía server<br>
Vấn đề này đã được Nuxt.js giải quyết cho các ứng dụng Vue. Nuxt.js giúp việc chia sẻ code giữa client và server trở nên đơn giản để bạn có thể tập trung vào code logic ứng dụng của mình.<br>
Nuxt.js cung cấp cho bạn quyền truy cập vào các thuộc tính như isServer và isClient trên các components của bạn để bạn có thể dễ dàng quyết định xem bạn có thể hiển thị nội dung nào đó trên client hoặc trên server không. Ngoài ra, còn có các components đặc biệt như thành phần `no-ssr` được sử dụng để ngăn chặn components này hiển thị ở phía server. <br>
Cuối cùng, Nuxt cung cấp cho bạn quyền truy cập vào một phương thức asyncData bên trong các components bạn có thể sử dụng để fetch data và hiển thị nó ở phía server. Nhấn vào [đây](https://nuxtjs.org/guide?source=post_page---------------------------) để tìm hiểu thêm về những gì Nuxt cung cấp để rendering các ứng dụng Universal.
### 2. Statically render các ứng dụng Vue của bạn và nhận tất cả các lợi ích của một universal app mà không cần server
Sự đổi mới lớn nhất của Nuxt đi kèm với command `nuxt generate` của nó. Command này tạo ra một phiên bản hoàn toàn tĩnh của trang web của bạn. Nó sẽ tạo ra HTML cho mỗi một trong các routes của bạn và đặt vào trong file riêng của nó.
Ví dụ: nếu bạn có các **pages** (Thuật ngữ Nuxt cho các routes):
* * *
 -| pages/<br>
 ----| about.vue<br>
 ----| index.vue
* * *
Nuxt sẽ tạo cấu trúc thư mục sau cho bạn:
* * *
 -| dist/<br>
 ----| about/<br>
 ------| index.html<br>
 ----| index.html
* * *
Sự khác biệt là bạn không cần một server nữa. Tất cả mọi thứ được tạo ra trong khi phát triển.<br>
Nó mạnh mẽ bởi vì bạn có được những lợi ích của universal rendering mà không cần server. Bạn chỉ có thể lưu trữ ứng dụng của mình trên GitHub Pages hoặc Amazon S3.<br>
Đọc thêm về điều này trên phần [Static Genereated (Pre Rendering) ](https://nuxtjs.org/guide?source=post_page---------------------------)của tài liệu Nuxt.js.
### 3. Phân tách code tự động (pre-rendered pages)
Nuxt.js có thể tạo phiên bản tĩnh của trang web của bạn với cấu hình Webpack đặc biệt.<br>
Đối với mỗi route (trang) được tạo tĩnh, route cũng sẽ nhận được file JavaScript của riêng mình, chỉ với code cần để chạy route đó.<br>
Điều này thực sự có thể giúp cải thiện tốc độ vì nó giữ kích thước của file JavaScript nhỏ so với toàn bộ kích thước ứng dụng của bạn.
### 4. Thiết lập thông qua command line với starter template
Nuxt.js cung cấp một starter template được gọi là starter-template cung cấp cho bạn tất cả các thứ mà bạn cần để bắt đầu với một dự án có cấu trúc thư mục tổ chức tốt.
Đảm bảo bạn đã cài đặt` vue-cli` và chạy lệnh sau:<br>
* * *
`$ vue init nuxt-community/starter-template <project-name>`
* * *
Từ đó chỉ cần `cd` vào ứng dụng và chạy cài đặt `npm` và bạn sẽ ổn.
Nhấn vào [đây](https://nuxtjs.org/guide/installation?source=post_page---------------------------) để tìm hiểu thêm về việc thiết lập một dự án với command line.
### 5. Dễ dàng thiết lập transitions giữa các route của bạn
Vue có wrapper <transition>element giúp đơn giản hóa việc xử lý JavaScript animations, CSS animations, và CSS transitions trên các elements hoặc components của bạn. <br>
Nếu bạn cần xem lại <transition> element và transitions của Vue, nói chung, chúng tôi đã viết một bài viết về chúng ở [đây](https://medium.com/vue-mastery/how-to-create-vue-js-transitions-6487dffd0baa)
Nuxt.js thiết lập các routes của bạn theo cách mỗi trang được bọc trong một  <transition> element để bạn có thể tạo chuyển đổi giữa các trang một cách đơn giản.
Nhấn vào [đây](https://nuxtjs.org/examples/routes-transitions/?source=post_page---------------------------) để xem ví dụ về cách Nuxt.js giúp bạn chuyển đổi trang.
### 6. Mặc định cấu trúc dự án tuyệt vời
Trong nhiều ứng dụng Vue nhỏ, cuối cùng bạn sẽ quản lý cấu trúc code tốt nhất có thể trong nhiều files. Cấu trúc ứng dụng Nuxt.js mặc định cung cấp cho bạn một điểm khởi đầu tuyệt vời để tổ chức ứng dụng của bạn theo cách dễ hiểu.
![](https://images.viblo.asia/183cc0d3-b6c6-4e06-b6e7-3cc81fe44bf2.png)
Dưới đây là một vài trong số các thư mục chính mà nó thiết lập cho bạn:<br>
**components** - Một folder để bạn có thể sắp xếp các components Vue riêng lẻ của mình.<br>
**layouts** - Một folder để chứa layouts chính trong ứng dụng của bạn.<br>
**pages** - Một folder để chứa các routes ứng dụng của bạn. Nuxt.js đọc tất cả các tệp .vue trong thư mục này và tạo bộ router ứng dụng.<br>
**store** - Một folder chứa tất cả các Vuex Store Files của ứng dụng.<br>
Nhấn vào [đây](https://nuxtjs.org/guide/directory-structure?source=post_page---------------------------) để tìm hiểu thêm về tất cả các cấu trúc thư mục mà Nuxt.js cung cấp cho bạn.
### 7. Dễ dàng viết các Single File Components
Trong nhiều dự án Vue nhỏ, các components được định nghĩa bằng Vue.component, theo sau là new Vue({ el: ‘#container’ }) để  một phần tử container nằm trong phần thân của mỗi trang.<br>
Điều này hoạt động tốt trong các dự án nhỏ nơi JavaScript chỉ được sử dụng để nâng cao các chế độ xem nhất định. Nhưng trong các dự án lớn hơn, nó có thể trở nên khó quản lý.<br>
Tất cả các vấn đề này được giải quyết bằng  single-file components có phần mở rộng .vue. Để sử dụng chúng, bạn phải build với các công cụ như Webpack và Babel.<br>
Dưới đây, một ví dụ về single-file .vue component
![](https://images.viblo.asia/c5deff05-65e8-4460-a3b7-d7e5f398cb54.png)
Nuxt.js được cấu hình sẵn với Webpack cho bạn để bạn có thể bắt đầu sử dụng các files .vue mà không phải tự thiết lập quy trình xây dựng phức tạp.<br>
Để tìm hiểu thêm về Single File Components, hãy truy cập tài liệu Vue [tại đây](https://vuejs.org/v2/guide/single-file-components.html?source=post_page---------------------------).
### 8. Nhận biên dịch ES6 / ES7 mà không cần thêm bất kỳ công việc gì
Bên cạnh Webpack, Nuxt.js cũng được đóng gói sẵn với Babel. <br>
Babel xử lý biên dịch các phiên bản JavaScript mới nhất như ES6 và ES7 thành JavaScript có thể chạy trên các trình duyệt cũ hơn.<br>
Nuxt.js thiết lập Babel cho bạn để tất cả các files .vue và tất cả code ES6 mà bạn viết bên trong các thẻ <script> biên dịch thành JavaScript sẽ hoạt động trên tất cả các trình duyệt.
Nhấn vào [đây](https://babeljs.io/?source=post_page---------------------------) để tìm hiểu thêm về Babel.
![](https://images.viblo.asia/18edcb88-a01a-45a2-9cbd-aae9990ed1d6.png)
### 9. Nhận thiết lập với một auto-updating server để dễ dàng phát triển
So với việc tự thiết lập quy trình này hoặc quy trình change-refresh-change-refresh mà các nhà phát triển web của chúng tôi đã quen, việc phát triển với Nuxt.js rất đơn giản. Nó thiết lập cho bạn một máy chủ phát triển auto-updating<br>
Trong khi bạn đang phát triển và làm việc trên các files .vue đó, Nuxt.js sử dụng cấu hình Webpack để kiểm tra các thay đổi và biên dịch mọi thứ cho bạn.<br>
Bạn có thể chạy lệnh` npm run dev` bên trong dự án Nuxt.js và nó sẽ thiết lập máy chủ phát triển.
![](https://images.viblo.asia/b899fa79-b30c-4f8d-b33c-3c13cd3372db.png)
### 10. Truy cập vào mọi thứ trong cộng đồng Nuxt.js
Cuối cùng, có một bộ sưu tập GitHub có tên là Nuxt Community, biên dịch các libraries, modules, starter kits và nhiều thứ khác để giúp tạo ứng dụng của bạn dễ dàng hơn nữa. 
Xem qua ở đây để xem những gì bạn cần có sẵn trước khi tự mã hóa nó.
![](https://images.viblo.asia/ca266f71-a01c-4bf1-8b4c-c9b83cbd751b.png)
### Link bài viết gốc: 
https://medium.com/vue-mastery/10-reasons-to-use-nuxt-js-for-your-next-web-application-522397c9366b