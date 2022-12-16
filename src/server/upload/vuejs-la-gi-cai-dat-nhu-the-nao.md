# Lời mở đầu:
Các ứng dụng web ngày càng phong phú, đa dạng và luôn đưa trải nghiệm người dùng lên tiêu chí hàng đầu, nhờ vậy Javascript được ưu chuộng trong việc kết hợp xây dựng giao diện kể đến như **React**, **Angular**, ...Gần đây, **Vue.js** nổi lên như một hiện tượng mới, được **Laravel phiên bản từ 5.3** gợi ý là một Javascript framework mặc định. Vậy hãy cùng tìm hiểu về **VueJS** trong series này nhé.


# Nội dung:
## VueJS là gì?
Theo như định nghĩa trên [trang chủ](https://vuejs.org) thì Vue là một **framework** dùng để xây dựng giao diện người dùng (user interfaces). 

Cụ thể, Vue là một **progressive framework** (framework linh động), cho phép và khuyến khích phát triển ứng dụng theo từng bước. Phần lõi của VueJS chủ yếu là vào phần View, ngoài ra có thể cài thêm các thành phần, thư viện hỗ trợ để đáp ứng nhu cầu xây dựng những ứng dụng **SPA** (**Single-Page-Applications**) .  

Khác với các **monolithic framework** (framework nguyên khối) cung cấp tất cả mọi thứ cần có để xây dựng app trong một framework duy nhất.

Ngoài ra cần chú ý một vấn đề nữa, **VueJS** sử dụng mô hình **MVVM** (**Model**- **View**- **ViewModel**), nghe có vẻ hơi lạ đúng không, hẹn các bạn trong bài viết khác sẽ tìm hiểu về nó và mô hình MVC.
## Chuẩn bị gì trước khi học VueJS?
Khái niệm tìm hiểu sơ qua là như vậy, giờ hãy cùng tìm hiểu xem để học VueJS thì ta cần phải có những kiến thức gì:
- **javascript**: tất nhiên rồi, vì VueJS là một framework javascript, giống như laravel là một framework PHP vậy, bạn phải biết nền tảng thì mới học được.
- **webbase**: **HTML** (**Hyper Text Markup Language**- là ngôn ngữ đánh dấu siêu văn bản) , **CSS** (**Cascading Style Sheets**), ngoài ra có thể cần thêm framework **Bootstrap**.
- Ngoài ra nên tìm hiểu các ngôn ngữ lập trình web (**PHP, Ruby**) để có thể làm một trang web với độ phức tạp cao hơn.
## Vì sao nên chọn VueJS:
Hiện nay có rất nhiều các thư viện, framework Javascript mạnh mẽ, kể đến có **React** (hậu thuẫn bởi Facebook), **Angular** (hậu thuẫn bởi Google). Tuy nhiên Vue.js đang là sự lựa chọn lý tưởng cho các ứng dụng web ở mức vừa. Có một vài lí do như sau:
   - Hiệu năng VueJS là thực sự đáng nể so với các đối thủ khác.
    - VueJS có dung lượng tải thấp do chỉ giữ lại phần core, từ đó tăng đốc độ tải của toàn trang.
    - VueJS đơn giản, dễ học, dễ áp dụng hơn, đặc biệt là với những người chưa có nhiều kiến thức nền.

## Hướng dẫn cài đặt:
### C1: CDN (Content delivery Network) 
Đây chắc chắn là cách nhanh gọn nhất, khi bạn chỉ cần thêm 1 đường link vào là xong.
```
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
```
Nếu bạn thắc mắc **CDN** là gì thì hiểu đơn giản là dữ liệu sẽ được đưa lên các server trên toàn cầu, và tùy thuộc vào vị trí của bạn sẽ lựa chọn server gần nhất để cung cấp dữ liệu, giúp tốc độ tải tốt nhất.
### C2: Download
Đây là cách truyền thống nhất, bạn lên trang chủ và tải file .js về rồi thêm đường dẫn tới file js đó.
```
<script src="your-app/your-folder/vue.js"></script>
```

Khi sử dụng 2 cách này thì bạn cần chú ý rằng sẽ có 2 phiên bản, đó là phiên bản **dành cho phát triển** (đuôi **.js**) và phiên bản **tối ưu dung lượng** (đuôi **.min.js**)

### C3: NPM (Node Package Manager)
Đây là công cụ tạo, quản lí các gói thư viện Javascript, tức là sẽ quả lí tự động, loại bỏ các thao tác thủ công như hai cách trên. Chúng ta chỉ cần khai báo những thư viện cần sử dụng vào file **package.json**, npm sẽ sự động tải chúng về giúp bạn mà không lo thiếu sót.

- [Cài đặt Node kèm Npm](https://nodejs.org/en/download/)
- Cài đặt vue bằng npm:
    - Sử dụng câu lệnh ` $ npm install vue`
    - Khi đã làm quen, bạn nên cài đặt thêm **Vue-CLI** (**Command Line Interface**) giúp nhanh chóng khởi tạo nền tảng cho các ứng dụng.
    ```
    $ npm install --global vue-cli  #cài đặt vue-cli
    $ vue init webpack my-vue # tạo một dự án mới với template "webpack"
    $ cd my-vue 
    $ npm run dev #chạy server 
    ```
Hình ảnh cấu trúc thư mục project:![](https://images.viblo.asia/9662047f-89b8-4ca3-aa8c-3fced4ae0cc7.png)

Hình ảnh khi chạy (cổng mặc định là 8080):
![](https://images.viblo.asia/2756aa30-1b9b-4115-8ac9-a60c6d20391d.png)
# Lời kết:
Như vậy là mình đã hướng dẫn các bạn tìm hiểu các khái niệm trong Vue cũng như cách cài đặt. Giờ đã có project rồi, từ bài sau chúng ta sẽ bắt tay vào code nhé.
# Tài liệu tham khảo:
https://vuejs.org

https://allaravel.com/tutorials/lap-trinh/vuejs-framework/cai-dat-moi-truong-vue-js/

https://toidicode.com/vuejs-la-gi-viet-chuong-trinh-dau-tien-67.html