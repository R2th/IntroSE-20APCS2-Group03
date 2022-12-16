![](https://images.viblo.asia/7b8a9a1e-6acf-4e72-a596-d77970b13db6.png)
# Lời giới thiệu.
   Vue.js chỉ là một hype, đó là một khuôn khổ tuyệt vời lối vào. Nó là khá dễ dàng để bắt đầu với nó và để xây dựng một ứng dụng web Vue.js thường được mô tả như là một khuôn khổ cho các ứng dụng nhỏ và thậm chí đôi khi là một thay thế cho jQuery vì kích thước nhỏ của nó! Cá nhân tôi nghĩ rằng nó cũng có thể phù hợp cho các dự án lớn hơn và trong trường hợp này, điều quan trọng là cấu trúc nó tốt, trong điều khoản của kiến trúc thành phần.<br>
    Trước khi bắt đầu dự án Vue.js lớn đầu tiên của tôi, tôi đã làm một số nghiên cứu để tìm ra cấu trúc thư mục hoàn hảo, thành phần kiến trúc và quy ước đặt tên. Tôi đã đi qua các tài liệu Vue.js, một vài bài viết và nhiều GitHub mở nguồn dự án.<br>
     Tôi cần phải tìm ra câu trả lời cho một số câu hỏi tôi đã có. Đó là những gì bạn sẽ tìm thấy trong bài viết này:
1. Làm thế nào để bạn cấu trúc các tập tin và thư mục bên trong dự án Vue.js ?
2. Làm thế nào bạn viết thành phần thông minh và câm và nơi mà bạn đặt chúng? Nó là một khái niệm mà đến từ phản ứng.
3. Vue.js phong cách mã hóa và thực tiễn tốt nhất là gì?
# Cấu trúc thư mục Vue.js.
Dưới đây là nội dung của thư mục src. Tôi khuyên bạn nên khởi động dự án với Vue CLI. Cá nhân tôi sử dụng mẫu Webpack mặc định.
```
.
├── app.css
├── App.vue
├── assets
│   └── ...
├── components
│   └── ...
├── main.js
├── mixins
│   └── ...
├── router
│   └── index.js
├── store
│   ├── index.js
│   ├── modules
│   │   └── ...
│   └── mutation-types.js
├── translations
│   └── index.js
├── utils
│   └── ...
└── views
    └── ...
```

Thông tin trong các thư mục:

*   **assets**   --- Trong đây bạn để bất kỳ tài nguyên nào được nhập vào trong các components của bạn.
*  **components**  --- Tất cả các components phụ dùng chung  của project.
*  **mixins**  --- Các mixin là các phần của mã javascript được sử dụng lại trong các thành phần khác nhau. Trong một mixin, bạn có thể đặt bất kỳ phương thức thành phần nào từ Vue.js, chúng sẽ được hợp nhất với các phương thức của thành phần sử dụng nó.
*   **router**  --- Tất cả các routes  của các dự án của bạn (trong trường hợp của tôi có chúng trong index.js). Về cơ bản, trong Vue.js, tất cả mọi thứ là một thành phần. Nhưng không phải tất cả mọi thứ là một trang. Một trang có một route như "/dashboard", "/settings" hoặc "/search". Nếu một thành phần có một route đó định tuyến.
*   **store (optional)** --- Các hằng số Vuex trong các đột biến-type.js, các mô đun Vuex trong các mô đun thư mục con (mà sau đó được nạp trong index.js).
*  ** **translations (optional)****  ---  Tập tin Locales, tôi sử dụng Vue-i18n, và nó hoạt động khá tốt.
*  **utils (optional)** --- Các hàm mà tôi sử dụng trong một số components, chẳng hạn như kiểm tra giá trị regex, hằng hoặc bộ lọc.
*  **views**   --- Để thực hiện dự án nhanh hơn để đọc tôi tách các thành phần được định tuyến và đặt chúng trong thư mục này. Các thành phần được định tuyến đối với tôi là hơn một phần vì họ đại diện cho trang và họ có các tuyến đường, tôi đặt chúng trong “views” sau đó khi bạn kiểm tra một trang bạn truy cập thư mục này.


Cuối cùng, bạn có thể thêm các thư mục khác phụ thuộc vào nhu cầu của bạn như filters hoặc constants, API.

Đưới đây là một số resources để bạn lắm rõ hơn.
1. [https://vuex.vuejs.org/en/structure.html](https://vuex.vuejs.org/en/structure.html)
2. [https://github.com/vuejs/vue-hackernews-2.0/tree/master/src](https://github.com/vuejs/vue-hackernews-2.0/tree/master/src)
3. [https://github.com/mchandleraz/realworld-vue/tree/master/src](https://github.com/mchandleraz/realworld-vue/tree/master/src)

# Các components  thông minh và câm với Vue.js

Thành phần thông minh và câm là một khái niệm tôi học được từ phản ứng. thành phần thông minh còn được gọi là container, họ là những người xử lý các thay đổi trạng thái, họ chịu trách nhiệm cho những việc làm như thế nào. Trên ngược lại, các thành phần câm, hay còn gọi là presentational, chỉ xử lý giao diện.<br>
<br>
Nếu bạn quen thuộc với mô hình MVC, bạn có thể so sánh các thành phần kết xuất với Chế độ xem và components thông minh với Bộ điều khiển!<br>
<br>
<br>

Trong React, các thành phần thông minh và câm thường được đặt trong các thư mục khác nhau trong khi trong Vue.js bạn đặt tất cả chúng trong cùng một thư mục: các thành phần. Để phân biệt trong Vue.js, bạn sẽ sử dụng quy ước đặt tên. Hãy để nói rằng bạn có một thành phần thẻ câm, sau đó bạn nên sử dụng một trong những tên sau:<br>
<br>

* BaseCard
* AppCard
* VCard
<br>
<br>

Nếu bạn có một smart component sử dụng BaseCard và thêm một số phương thức cho nó, bạn có thể đặt tên cho nó, tùy thuộc vào dự án của bạn:<br>
<br>
* ProfileCard
* ItemCard
* NewsCard
<br>
<br>
Ví dụ, nếu smart component của bạn không chỉ là Thẻ thông minh cơ sở của Smarter, có thể sử dụng bất kỳ tên nào phù hợp với thành phần của bạn và không bắt đầu với Base (hoặc App hoặc V), ví dụ:
<br>
<br>

* DashboardStatistics
* SearchResults
* UserProfile
<br>
<br>

Quy ước đặt tên này xuất phát từ bản định kiểu chính thức của Vue.js cũng chứa các quy ước đặt tên!

# Quy ước đặt tên.
Dưới đây là một số quy ước đến từ văn bản chính thức của Vue.js mà bạn cần cấu trúc tốt dự án của mình:

* Tên component  phải luôn luôn là nhiều từ, ngoại trừ gốc "App" components. Sử dụng "UserCard" hoặc "ProfileCard" thay vì "Card" ví dụ.
* Mỗi component  nên có trong tập tin riêng của mình. 
* Tên tệp của các components tệp đơn phải luôn là PascalCase hoặc luôn là kebab-case. Sử dụng  “UserCard.vue”  hoặc “user-card.vue”.
* Các components chỉ được sử dụng một lần trên mỗi trang nên bắt đầu bằng tiền tố  "The", để biểu thị rằng chỉ có thể có một. Ví dụ: đối với navbar hoặc footer , bạn nên sử dụng TheNavbar.vue và hoặc TheFooter.vue.
* Luôn sử dụng tên đầy đủ thay vì viết tắt trong tên của các components của bạn. Ví dụ: không sử dụng "UDSettings", thay vì sử dụng "UserDashboardSettings".

# Vue.js official  styleguide.
Cho dù bạn là người mới bắt đầu hay người mới bắt đầu sử dụng Vue.js, bạn nên đọc bản định kiểu Vue.js này, nó chứa rất nhiều mẹo và cả quy ước đặt tên. Nó chứa rất nhiều ví dụ về những điều nên làm và không nên làm.<br>

[https://vuejs.org/v2/style-guide/](https://vuejs.org/v2/style-guide/)


# Lời kết.
Cảm ơn các bạn đã đọc bài viết đến tháng của mình và đừng quên like bài post này nếu nó giúp ích cho bạn một chút gì gì đó.<br>
Ngoài ra, hãy bình luận và đưa ra bất kỳ phản hồi nào nếu bạn muốn để tôi và bạn ngày ngày học hỏi thêm.<br>
Thank All!!

Tham khảo.
[https://itnext.io/how-to-structure-a-vue-js-project-29e4ddc1aeeb](https://itnext.io/how-to-structure-a-vue-js-project-29e4ddc1aeeb)
#  Don’t forget to follow me!