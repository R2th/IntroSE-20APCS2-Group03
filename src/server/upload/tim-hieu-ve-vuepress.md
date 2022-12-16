![](https://images.viblo.asia/909674bc-6e45-488d-9c3a-d0502df970b5.jpg)

Xin chào tất cả các bạn, hôm nay trong trời tiết nóng nực của mùa hè oi ả, mình có ngồi lướt qua được một công cụ mà giúp chúng ta tạo ra một trang web tĩnh của vue- đó chính là VuePress. Nếu các bạn để ý thì VuePress chính là công cụ giúp viết lên trang doc của [Vue](https://vuejs.org/) . Chúng mình cùng đi tìm hiểu nó nhé.
# Static sites là gì ?
* Là một website phục vụ để lưu trữ thông tin.
* Không có bất cứ sự tương tác nào giữa client-server ngoại trừ nhúng bên thứ ba vào trang web.
* Có tốc độ nhanh và không có server nên giảm nhẹ và giảm khả năng của lỗ hổng bảo mật
* Có thể chứa những file HTML, Mardown, .vue file nên khả năng load trang web rất nhẹ và nhanh. Nó có thể giúp cho việc SEO một cách đáng kể.

# VuePress là gì ?
Là "static site generator", được xây dựng và phát triển dựa trên Vue Framework. Với phiên bản đẩu tiên xuất hiện vào đầu tháng tư và phiên bản hiện tại là "0.14.1".

Được tạo bởi 2 phần : "minimalistic static site generator " và "default theme".

# Tại sao lại dùng VuePress ?
* VuePress sẽ parse những file markdown được đặt theo đúng cấu trúc thành những file HTML khi build. Chính vì thế tốc độ load trang rất nhanh.
* Với mỗi file markdown được tạo ra sẽ được parse giống như Vue template, chúng ta có thể dùng VueDevTool để kiểm tra. Có thể dùng các component để truyền vào các file markdown được
* VuePress SEO friendly, có một hệ thộng search build-in - tìm kiếm theo chỉ mục heading và subheading.

# Cách làm việc của VuePress
* 1 trang VuePress thực chất nó là 1 SPA, cũng được xây dựng dựa trên Vue Vue Router và webpack
* Trong suốt quá trình build, chúng ta tạo một server-rendered version của app và render HTML tương ứng khi chúng ta truy câp route tương ứng. Cách tiếp cận này được lấy cảm hứng bởi Nuxt 
* Với mỗi markdown file được biên dịch thành HTML với markdown-it và sau đó đượ xử lý giống như template của Vue component. Điều này cho phép bạn sử dụng trực tiếp Vue bên trong những file markdown và thật tuyệt vời khi chúng ta cần nhúng nội dung động.
# Cài đặt
Bạn có thể tham khảo cách cài đặt như sau:
![](https://images.viblo.asia/f034f4f9-8c4b-488d-8799-dcbf1b539d30.png)

![](https://images.viblo.asia/0d1d0a64-4c15-42c9-822a-98199b85d9d3.png)

# Cấu trúc thư mục
![](https://images.viblo.asia/2456cfd5-b30d-42d7-babc-815da06d0c33.png)

**Default theme**
![](https://images.viblo.asia/388d6cd0-fbb8-4f97-9189-d3b8dce7338c.png)

**Default page routing**

![](https://images.viblo.asia/ac9335e4-6c01-4a09-b3b1-325dc9e061dc.png)

Chúng ta muốn config thì chúng ta có thể viết trong file `.vuepress/config.js`
![](https://images.viblo.asia/16b08932-d386-49c2-889e-542d32cdd7dc.png)

**Slidebar**:
Có rất nhiều kiểu slidebar tùy theo chúng ta cấu hình, nhưng khi dùng slidebar: 'auto' thì mỗi page nó sẽ tự động gán slidebar tương ứng.

![](https://images.viblo.asia/62003459-7679-48c7-b2b3-ddd6c657bfc3.png)

![](https://images.viblo.asia/cd1b1a9a-5fd3-4643-8d06-de72b6f6df5a.png)

**Search box**: 
Search box mặc định của VuePress, nếu không muốn dùng built in này chúng ta có thể để search: false. Ngoài ra có thể search theo Algolia.
![](https://images.viblo.asia/55dd61dc-378b-4f8b-a11b-4b41a9eb2d11.png)

**Styling**:
*  .vuepress/styles/palette.styl: file này chúng ta muốn override lại những màu mặc định của default theme trong vuepress, ngoài ra có thể định nghĩa thêm 1 số màu mà chúng ta dùng. Chỉ định nghĩa các biến màu mà không định nghĩa style trong file này.
*  .vuepress/styles/index.styl: add thêm style chúng ta định nghĩa vào đây để sử dụng
http://stylus-lang.com/

**Custom style**: Chúng ta có thể override lại style của một số class trong default theme
.vuepress/override.styl

![](https://images.viblo.asia/b3ae9342-dad2-467c-b224-1cebb1e6d8f1.png)

**i18n**: ngoài ra VuePress còn có chức năng i18n giúp chúng ta dễ dàng thay đổi các bản dịch. Điểu cần thiết chúng ta cần tạo những folder mà tương ứng với tiền tố

![](https://images.viblo.asia/c78fb398-0e95-4589-891a-f768a1bd117d.png)

![](https://images.viblo.asia/97f3cd5e-a70a-4ec0-9fbb-d61feb25ac8f.png)

**Một vài các lợi ích khi sử dụng VuePress**
* Sử dụng Mardown để viết content
![](https://images.viblo.asia/83e5131e-6997-47c5-b425-60a2988db60f.png)
* Sử dụng Component được trong file Mardown
![](https://images.viblo.asia/a914b03e-8676-4479-a68a-7444e437a54b.png)
* Sử dụng YAMP Front-matter trong file Markdown
![](https://images.viblo.asia/3b0046a2-a69c-47e3-a294-57d9567e7d3b.png)
* Hỗ trợ i18n một cách dễ dàng
![](https://images.viblo.asia/e54296a0-7991-45d5-9d95-ef3c45a38669.png)
* Hỗ trợ search trong default theme
![](https://images.viblo.asia/5c84f245-aeb8-425c-8a6e-7832605af981.png)
# Kết luận
Qua một vài những chia sẻ của mình ở trên mong rằng cung cấp cho bạn được một số những thứ mà bạn có thể cần thiết khi làm việc. Cảm ơn các bạn đã đọc bài viết chia sẻ của mình.
# Tham khảo
https://vuepress.vuejs.org/