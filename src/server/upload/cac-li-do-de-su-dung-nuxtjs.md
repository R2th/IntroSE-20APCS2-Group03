Nếu bạn là một developer Vuejs, thì có thể bạn đã nghe về Nuxt.js. Nhưng bạn có thể không biết tất cả những gì cường điệu nói về nó.  Có lẽ bạn đang hỏi, "Tại sao bạn cần một framework cho một framework?" Vue đã làm cho việc phát triển ứng dụng JavaScript một cách đơn giản. Ý tưởng đằng sau Nuxt.js là gì? 

Trong bài viết này, mình sẽ đề cập đến một số lí do tại sao bạn nên chọn Nuxt.js trong các dự án tiếp theo của bạn.

**Nuxt.js là gì?**

Là một framework để tạo ra các ứng dụng Vue.js. Nó xây dựng giao diện người dùng (UI rendering), trong trừu tượng hóa việc phân phối giữa client và server. Mục tiêu của Nuxt.js là tạo ra một framework đủ linh hoạt để bạn có thể sử dụng nó làm cơ sở cho project hoặc ngoài project dựa trên Node.js.

Ngoài ra, Nuxt.js cũng cung cấp một lựa chọn deploy khác, gọi là: nuxt generate. Nó sẽ xây dựng một Static Generated cho ứng dụng Vue.js. Lựa chọn này có thể là bước tiến lớn cho việc phát các ứng dụng Web trên microservices.

Hãy cùng mình khám phá những lý do tại sao bạn có thể xem xét Nuxt cho dự án Vue tiếp theo nhé.

**1. Tạo các ứng dụng phổ quát mà không gặp rắc rối**

Một trong những điểm bán hàng lớn nhất của Nuxt.js là nó giúp việc tạo các ứng dụng phổ quát trở nên dễ dàng hơn.

**Một ứng dụng phổ quát là gì?**

Một ứng dụng phổ quát được sử dụng để mô tả mã JavaScript có thể thực thi cả trên máy khách và phía máy chủ.

Nhiều frameworks JavaScript hiện đại, như Vue, nhằm mục đích xây dựng Single Page Applications (SPAs). Có rất nhiều lợi thế để một SPA trên một trang web truyền thống. Ví dụ: bạn có thể xây dựng các giao diện người dùng rất linh hoạt, cập nhật nhanh. Nhưng các SPA cũng gặp phải những nhược điểm như thời gian tải lâu và Google phải vật lộn với chúng vì ban đầu không có nội dung nào trên trang để thu thập thông tin cho mục đích SEO. Tất cả nội dung được tạo bằng JavaScript sau khi thực tế.

Một ứng dụng phổ quát là về việc có một SPA, nhưng thay vì có một trang index.html trống, bạn đang tải trước ứng dụng trên máy chủ web và gửi HTML được hiển thị dưới dạng phản hồi cho yêu cầu trình duyệt cho mọi tuyến đường để tăng tốc độ tải lần và cải thiện SEO bằng cách giúp Google thu thập dữ liệu trang dễ dàng hơn.

**Nuxt.js giúp bạn viết các ứng dụng phổ quát đơn giản hơn**

Xây dựng các ứng dụng phổ quát có thể tẻ nhạt vì bạn phải thực hiện nhiều cấu hình ở cả phía máy chủ và phía máy khách.

Đây là vấn đề Nuxt.js nhằm giải quyết cho các ứng dụng Vue. Nuxt.js giúp chia sẻ mã giữa máy khách và máy chủ một cách đơn giản để bạn có thể tập trung vào logic logic ứng dụng của mình.

Nuxt.js cung cấp cho bạn quyền truy cập vào các thuộc tính như isServer và isClient trên các thành phần của bạn để bạn có thể dễ dàng quyết định xem bạn có thể hiển thị nội dung nào đó trên máy khách hoặc trên máy chủ không. Ngoài ra, còn có các thành phần đặc biệt như thành phần no-ssr được sử dụng để ngăn chặn thành phần này hiển thị ở phía máy chủ.

Cuối cùng, Nuxt cung cấp cho bạn quyền truy cập vào một phương thức asyncData bên trong các thành phần bạn có thể sử dụng để tìm nạp dữ liệu và hiển thị nó ở phía máy chủ.

Đó là mẹo của tảng băng trôi về cách Nuxt giúp bạn tạo ra các ứng dụng phổ quát. [Nhấn vào đây](https://nuxtjs.org/guide) để tìm hiểu thêm về những gì Nuxt cung cấp để hiển thị các ứng dụng Universal.

**2. Kết xuất tĩnh các ứng dụng Vue của bạn và nhận tất cả các lợi ích của một ứng dụng phổ quát mà không cần máy chủ**

Sự đổi mới lớn nhất của Nuxt đi kèm với lệnh tạo nuxt của nó. Lệnh này tạo ra một phiên bản hoàn toàn tĩnh của trang web của bạn. Nó sẽ tạo HTML cho mỗi một trong các tuyến của bạn và đặt nó vào trong tệp riêng của nó.

Ví dụ: nếu bạn có các trang sau: 
![](https://images.viblo.asia/d83ecd7e-def3-4f19-8559-74f38f34be45.png)

Nuxt sẽ tạo cấu trúc thư mục sau cho bạn:
![](https://images.viblo.asia/81f38261-fc4b-48f2-bd8f-571a06ee2220.png)

Những lợi ích để làm điều này rất giống với lợi ích của các ứng dụng phổ quát. Có đánh dấu ở đó để tải trang nhanh hơn và để giúp công cụ tìm kiếm và trình thu thập dữ liệu truyền thông xã hội thu thập dữ liệu trang web.

Sự khác biệt là bạn không cần một máy chủ nữa. Tất cả mọi thứ được tạo ra trong giai đoạn phát triển.

Nó mạnh mẽ bởi vì bạn có được những lợi ích của kết xuất phổ quát mà không cần máy chủ. Bạn chỉ có thể lưu trữ ứng dụng của mình trên GitHub Pages hoặc Amazon S3.

Đọc thêm về điều này trên [Static Genereated (Pre Rendering) ](https://nuxtjs.org/guide) của tài liệu Nuxt.js.

**3. Nhận phân tách mã tự động (pre-rendered pages)**

Nuxt.js có thể tạo phiên bản tĩnh của trang web của bạn với cấu hình Webpack đặc biệt.

Đối với mỗi route (trang) được tạo tĩnh, router cũng sẽ nhận được tệp JavaScript của riêng mình, chỉ với mã cần để chạy tuyến đó.

Điều này thực sự có thể giúp với tốc độ vì nó giữ kích thước của tệp JavaScript nhỏ so với toàn bộ kích thước ứng dụng của bạn.

**4. Thiết lập thông qua dòng lệnh với mẫu khởi động**

Nuxt.js cung cấp một mẫu khởi động được gọi là mẫu khởi động cung cấp cho bạn tất cả các scaffolding mà bạn cần để bắt đầu với một dự án có cấu trúc thư mục tốt cho tổ chức.

Đảm bảo bạn đã cài đặt vue-cli và chạy lệnh sau:
```
$ vue init nuxt-cộng đồng / starter-template <tên dự án>
```

Từ đó chỉ cần cd vào ứng dụng và chạy `npm install`.

[Nhấn vào đây](https://nuxtjs.org/guide/installation) để tìm hiểu thêm về việc thiết lập project với dòng lệnh.

**5. Dễ dàng thiết lập chuyển tiếp giữa các routers**

Vue có phần tử bao bọc <transition> giúp đơn giản hóa việc xử lý hoạt ảnh JavaScript, hoạt hình CSS và chuyển tiếp CSS trên các thành phần hoặc thành phần của bạn.

Nuxt.js thiết lập các routers của bạn theo cách mỗi trang được bọc trong một phần tử <transition> để bạn có thể tạo chuyển tiếp giữa các trang một cách đơn giản.

[Nhấn vào đây](https://nuxtjs.org/examples/routes-transitions/) để xem ví dụ về cách Nuxt.js giúp bạn chuyển đổi trang.
    
**6. Nhận cấu trúc dự án tuyệt vời theo mặc định**
    
Trong nhiều ứng dụng Vue nhỏ, cuối cùng bạn sẽ quản lý cấu trúc mã tốt nhất có thể trong nhiều tệp. Cấu trúc ứng dụng Nuxt.js mặc định cung cấp cho bạn một điểm khởi đầu tuyệt vời để tổ chức ứng dụng của bạn theo cách dễ hiểu.
    ![](https://images.viblo.asia/edc12324-cbe6-4a6f-be94-e12a43b98ab7.png)
    
  Dưới đây là các thư mục chính mà nó thiết lập cho bạn:
    
* components: Nơi để bạn có thể sắp xếp các thành phần Vue riêng lẻ của mình.
*  layouts: Chứa bố cục ứng dụng chính của bạn. 
*  pages: Chứa các routers trong ứng dụng của bạn. Nuxt.js đọc tất cả các tệp .vue trong thư mục này và tạo bộ định tuyến ứng dụng.
*   store: Chứa tất cả các ứng dụng của bạn trong tập tin lưu trữ Vuex Store.
    
[Nhấn vào đây](https://nuxtjs.org/guide/directory-structure) để tìm hiểu thêm về tất cả các cấu trúc thư mục mà Nuxt.js cung cấp cho bạn.
    
**7. Dễ dàng viết các components đơn lẻ**
    
Trong nhiều dự án Vue nhỏ, các thành phần được xác định bằng Vue.component, theo sau là `new Vue ({el:  '#container'})` để nhắm mục tiêu một phần tử container trong phần thân của mỗi trang.

Điều này hoạt động tốt cho các dự án nhỏ nơi JavaScript chỉ được sử dụng để nâng cao các chế độ xem nhất định. Nhưng trong các dự án lớn hơn, nó có thể trở nên khó quản lý.
    
 Tất cả các vấn đề này được giải quyết bằng *single-file components* có phần mở rộng .vue. Để sử dụng chúng, bạn phải thiết lập quy trình xây dựng với các công cụ như Webpack và Babel.
    
Để tìm hiểu thêm về Single File Components, hãy truy cập tài liệu Vue tại [đây](https://vuejs.org/v2/guide/single-file-components.html).
    
**8. Tự biên dịch ES6/ES7**

Bên cạnh Webpack, Nuxt.js cũng được đóng gói sẵn với Babel. Babel xử lý biên dịch các phiên bản JavaScript mới nhất như ES6 và ES7 thành JavaScript có thể chạy trên các trình duyệt cũ hơn.

Nuxt.js thiết lập Babel cho bạn để tất cả các tệp .vue và tất cả mã ES6 mà bạn viết bên trong các thẻ <script> biên dịch thành JavaScript sẽ hoạt động trên tất cả các trình duyệt.
    
Nhấn vào [đây](https://babeljs.io/) để tìm hiểu thêm về Babel.
    
 **Tổng kết**
    
 Tất cả các tính năng này làm cho việc phát triển ứng dụng Vue.js trở nên đơn giản hơn nhiều. Ngay cả khi bạn không cần một ứng dụng phổ quát và muốn gắn bó với một SPA, vẫn có những lợi ích khi sử dụng Nuxt.js. Nó có thể là cơ sở chính dự án của bạn với các lợi ích như tệp .vue, biên dịch ES6 và nhiều tính năng khác.
    
  Hi vọng những chia sẻ trên sẽ giúp các bạn có cái nhìn rõ hơn về Nuxt.js. Hẹn các bạn ở các bài viết tiếp theo.
    
 Tham khảo: https://medium.com/vue-mastery/10-reasons-to-use-nuxt-js-for-your-next-web-application-522397c9366b