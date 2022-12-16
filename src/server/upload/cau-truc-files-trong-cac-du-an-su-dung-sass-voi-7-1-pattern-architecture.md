Hãy cùng tìm hiểu về cách chúng ta có thể cấu trúc các dự án sử dụng Sass của mình. Khi một dự án ngày càng phát triển và mở rộng thì đồng nghĩa với cấu trúc tệp của dự án ngày càng tăng lên. Vì vậy, việc tổ chức các files và thư mục sass của bạn một cách hợp lí là vô cùng quan trọng. Dự án của bạn có một cấu trúc hợp lí sẽ cực kì hữu ích khi dự án ngày một lớn lên và cho đến lúc bạn cần maintain nó. Và chẳng phải nó cũng sẽ giúp bạn cảm thấy chuyên nghiệp hơn khi viết code sao =))))

Trong bài viết này chúng ta sẽ cùng tìm hiểu các đặc tính và lợi ích khi sử dụng 7-1 Pattern để sắp xếp các files Sass trong project của mình. 
### Cấu trúc một project sử dụng Sass như thế nào ?
***Ý tưởng*** : Chúng ta sẽ chia các nhỏ file stylesheet của mình thành nhiều file stylesheet con (partials). Mỗi partial sẽ đại diện cho một thành phần (component) riêng biệt. Việc cuối cùng bạn cần làm đó là import tất cả các Sass partials đó vào một file chính main.scss.

Ví dụ :
```
// File: main.scss
@import 'layout/header';
```

Trước đó chúng ta cũng cần tạo trước 1 folder `layout` chứa file `header.scss` mà chúng ta thêm ở trên. 

```
// File: _header.scss
// File này chứa tất cả code Sass style cho header.
/* STYLES GO HERE */
```

*Chú ý* : 
* Các file partial được bắt đầu với dấu gạch dưới `_`
* File được import rong câu lệnh `@import` không chứa đuôi. (VD: `/layout/main.scss`  > `@import layout/main`) 

### Cấu trúc với một project nhỏ
Nếu bạn sử dụng Sass với một dự án web nhỏ. Bạn có thể chỉ cần chia nhỏ các files theo cấu trúc đơn giản như dưới đây: 

```
_base.scss
_layout.scss
_components.scss
main.scss
```

Ở đây chúng ta có 3 partials được import vào `main.scss` của mình.


**_base.scss:**  Nơi chưa tất cả biến, mixins, resets, typography hay các lớp tính năng (utility classes) cho web của bạn. Bạn có thể hiểu đơn giản ở đây sẽ chứa code mỗi khi bạn bắt đầu một dự án mới.

**_layout.scss:** Đúng như tên gọi của nó, file này sẽ chứa code cho các phần cấu thành nên trang của bạn như header, footer,....

**_components.scss:** Chứa code cho các thành phần có thể sử dụng lại (reusable) như buttons, navbars, cards,...

Tuy nhiên nếu bạn làm việc với một dự án lớn hơn, bạn sẽ cần một cấu trúc chi tiết hơn nữa. Và sau đây chúng ta sẽ tìm hiểu về nó.

### 7-1 Pattern
7-1 Pattern là 1 cấu trúc được áp dụng rộng rãi làm cơ sở cho các dự án lớn. Bạn có tất cả các partials của mình được sắp xếp thành 7 thư mục khác nhau và 1 file chính `main.scss` nơi import tất cả các partials và chúng ta sẽ chỉ cần biên dịch duy nhất file này từ Sass sang CSS.

Dưới đây là ví dụ cho thư mục sass:
```
sass/
|
|– abstracts/ (or utilities/)
|   |– _variables.scss    // Sass Variables
|   |– _functions.scss    // Sass Functions
|   |– _mixins.scss       // Sass Mixins
|
|– base/
|   |– _reset.scss        // Reset/normalize
|   |– _typography.scss   // Typography rules
|
|– components/ (or modules/)
|   |– _buttons.scss      // Buttons
|   |– _carousel.scss     // Carousel
|   |– _slider.scss       // Slider
|
|– layout/
|   |– _navigation.scss   // Navigation
|   |– _grid.scss         // Grid system
|   |– _header.scss       // Header
|   |– _footer.scss       // Footer
|   |– _sidebar.scss      // Sidebar
|   |– _forms.scss        // Forms
|
|– pages/
|   |– _home.scss         // Home specific styles
|   |– _about.scss        // About specific styles
|   |– _contact.scss      // Contact specific styles
|
|– themes/
|   |– _theme.scss        // Default theme
|   |– _admin.scss        // Admin theme
|
|– vendors/
|   |– _bootstrap.scss    // Bootstrap
|   |– _jquery-ui.scss    // jQuery UI
|
`– main.scss              // Main Sass file
```

**Abstracts (hay ultilities) :** chứa các *CSS helper* bao gồm biến, functions, mixins....

**Base :** chứa các boilerplate code (có thể hiểu chung là code được áp dụng chung cho toàn bộ project của bạn như typographic rules hay reset rules....

**Components (hay modules) :** Thư mục này chứa code cho các thành phần (components) mà có thể reusable cho trang của bạn như buttons, forms, cards, v.v..

**Layout :** Chứa code định nghĩa cho layout của project như header,  footer, navigation, grid,....

**Pages:** Một dự án lớn sẽ chứa rất nhiều page khác nhau với nhiều style khác nhau. Đây là nơi bạn định nghĩa style cho từng trang.

**Themes:** Nếu trang của bạn có nhiều hơn 1 theme, bạn sẽ định nghĩa tại đây.

**Vendors:** chứa các files từ bên thứ ba ( thư viện, framworks) bạn sử dụng như Normalize, Bootstrap, jQuery,....Tuy nhiên trong thực tế bạn sẽ thường xuyên override code ( hiểu đơn giản là sửa một vài phần code theo ý mình). Nên nếu cần thiết, bạn có thể tạo thêm 1 folder khác `vendors-extensions/` để chứa các  override files của mình. 

Và cuối cùng là `main.scss` :
```
@import 'abstracts/variables';
@import 'abstracts/functions';
@import 'abstracts/mixins';

@import 'vendors/bootstrap';
@import 'vendors/jquery-ui';

@import 'base/reset';
@import 'base/typography';

@import 'layout/navigation';
@import 'layout/grid';
@import 'layout/header';
@import 'layout/footer';
@import 'layout/sidebar';
@import 'layout/forms';

@import 'components/buttons';
@import 'components/carousel';
@import 'components/slider';

@import 'pages/home';
@import 'pages/about';
@import 'pages/contact';

@import 'themes/theme';
@import 'themes/admin';
```

Chú ý : Một lần nữa hãy nhớ rằng không cần thêm đuôi `_` hay `.scss` khi import nhé !

### Lời kết
Oke, cuối cùng bạn chỉ cần biên dịch SCSS sang CSS thôi. Chúng ta sẽ tìm hiểu sâu hơn về chúng trong những bài khác. 

HI vọng bài viết này sẽ giúp ích được cho các bạn. Nếu có bất kì góp ý hay câu hỏi gì hãy comment phía dưới nhé :D

### REFERENCES
https://itnext.io/structuring-your-sass-projects-c8d41fa55ed4