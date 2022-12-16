Trong bài viết trước chúng ta đã được [Giới thiệu Vue.js là gì?](https://viblo.asia/p/gioi-thieu-framework-vuejs-gDVK2m0X5Lj), hẳn bạn rất nóng lòng muốn tìm hiểu ngay vào sâu framework này. Bạn hãy bình tĩnh, những bài cơ bản ban đầu này sẽ không mất của bạn nhiều thời gian đâu. Nào chúng ta cùng bắt tay cài đặt môi trường Vue.js để có môi trường thực hành các kiến thức tiếp theo. Hiện có nhiều cách cài đăt sử dụng framework Vue.js, bạn hãy tìm cho mình một cách thích hợp nhé.

### Sử dụng file độc lập
Đây là cách truyền thống nhất, bạn tải framework này về dưới dạng một file javascript có thể ở dạng phiên bản cho phát triển hoặc phiên bản tối ưu dung lượng, sau đó copy file này vào một thư mục trong dự án và đưa chúng vào mã HTML thông qua thẻ <script>.
```
<script src="thu_muc_trong_du_an/vue.js"></script>
```
 Thực hiện tải phiên bản phù hợp trong các liên kết dưới đây.

* [Phiên bản dành cho phát triển ](https://vuejs.org/js/vue.js)(dùng kèm với DevTools của Vue.js phục vụ cho debug và phát triển ứng dụng).
* [Phiên bản tối ưu dung lượng](https://vuejs.org/js/vue.min.js)
###  CDN
CDN là viết tắt của Content Delivery Network - mạng phân phối nội dung hiểu nôm na là các file dữ liệu sẽ được đưa lên các server trên toàn cầu và khi bạn yêu cầu file này, hệ thống mạng sẽ tính toán để chọn ra server cung cấp file gần bạn nhất, giúp cho việc tải file cực nhanh. Framework Vue.js hiện có trên rất nhiều các dịch vụ CDN khác nhau:
* jsdelivr: https://cdn.jsdelivr.net/vue/2.0.3/vue.js
* cdnjs: https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.3/vue.js
* unpkg: https://unpkg.com/vue@2.0.3/dist/vue.js (Khuyến cáo nên sử dụng)
    
Trong mã HTML tham chiếu đến framework Vue.js thông qua các liên kết được cung cấp bởi dịch vụ CDN, ví dụ:
```
<script src="https://unpkg.com/vue@2.5.16/dist/vue.js"></script>
```
> Chú ý, vue.js là phiên bản phát triển, nếu bạn muốn dùng phiên bản tối ưu dung lượng thì chỉ đơn giản thay thế vue.js thành vue.min.js.
    
### NPM
NPM viết tắt của Node Package Manager là công cụ tạo, quản lý các gói thư viện trong Node.js, một ứng dụng máy chủ chạy Javascript, lúc đầu npm chỉ dùng cho Node.js nhưng sau đó được sử dụng rộng rãi trong tất cả các dự án có sử dụng các gói thư viện Javascript. Bạn có thể tìm hiểu kỹ hơn [NPM là gì?](https://viblo.asia/p/tong-quan-ve-npm-4P856dy3ZY3) Trong các dự án lớn có thể bạn sử dụng đến hàng trăm gói thư viện Javascript của các nhà phát triển mã nguồn mở, một số vấn đề đặt ra như sau:

* Làm thế nào để biết được có phiên bản mới cho gói thư viện nào đó? Trước đây chúng ta thường thực hiện thủ công như sau, vào website nơi cung cấp gói này, kiểm tra nếu có phiên bản mới thì tải về và thay thế cho phiên bản cũ.
* Quản lý tính tương thích giữa các thư viện, ngoài ra các gói thư viện cũng tham chiếu lẫn nhau. Ví dụ khi bạn cài một gói thư viện A, nó có thể yêu cầu một vài gói thư viện khác.
* Một vấn đề cũng thường gặp phải là cùng một phiên bản ứng dụng đang phát triển, có thể trên máy chủ chính khác với máy chủ kiểm tra, tuy nhiên nếu sử dụng npm mọi vấn đề này được giải quyết. Khi cập nhật mã nguồn thay vì phải tải các gói thư viện từ máy phát triển lên máy chủ, chúng ta chỉ tải file cấu hình package.json (chứa danh mục các gói thư viện và phiên bản cho phép) lên và thực hiện chạy npm để nó tự động cài đặt.
 
Cú pháp sử dụng npm
```
npm install vue
```
Ngoài ra khi sử dụng npm bạn sẽ kết hợp được với các hệ thống quản lý module như Webpack, Browserify... nó giúp cho việc đóng gói các gói thư viện khác nhau và thực hiện một số công việc giúp các ứng dụng cực lớn có thể hoạt động trơn tru:

* Chia nhỏ toàn bộ tài nguyên các thư viện và các tài nguyên phụ thuộc thành các “chunk” và chỉ tải các thành phần nhỏ này khi cần thiết.
* Giúp quá trình tải các tài nguyên nhanh.
* Mọi file tĩnh sau quá trình đóng gói sẽ ở dạng module.
* Cho phép tích hợp các thư viên bên thứ ba ở dạng module.
* Cho phép cá nhân hóa mọi thành phần của công cụ đóng gói module.
 
### CLI
CLI (Command Line Interface) hay giao diện dòng lệnh là ứng dụng giúp tối ưu hóa các thao tác bằng dòng lệnh. Vue.js có một CLI chính thức là [Vue-CLI](https://cli.vuejs.org/guide/), với giao diện dòng lệnh này bạn có thể tạo ra một ứng dụng mẫu cho Vue.js cực nhanh, ứng dụng mẫu sẽ được cài đặt sẵn một số các gói thư viện cần thiết, ví dụ như các gói quản lý module, tối ưu hóa file, các gói mở rộng của Vue.js...
```
# Cài đặt vue-cli toàn cục
$ npm install --global vue-cli
# Tạo một dự án mới sử dụng mẫu "webpack"
$ vue init webpack my-project
# Cài đặt các gói thư viện phụ thuộc và chạy ứng dụng
$ cd my-project
$ npm run dev
```
### Kết luận
Có thể một số cách cài đặt khá mới lạ với các bạn, hãy tìm hiểu thêm từ Google nhé, nếu có dịp chúng ta sẽ quay lại một số công cụ như npm, vue-cli, yarn... chi tiết hơn. Trong đa số các bài viết của loạt bài hướng dẫn framework Vue.js chúng ta sẽ sử dụng liên kết CDN để có thể kết hợp với jsfield thực hiện demo tốt hơn.

Cảm ơn các bạn đọc bài viết của mình. Hẹn các bạn trong bài tiếp theo :kissing_heart::kissing_heart: