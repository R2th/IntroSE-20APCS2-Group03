Khi một project phát triển và mở rộng, việc mô-đun hoá và cấu trúc là thiết yếu. Vì vậy việc tổ chức tệp tin và folder là việc cần thiết mặc dù không có cấu trúc nào "hoàn toàn chính xác" mà nó phụ thuộc vào bạn, dưới đây chỉ là cấu trúc dành cho bạn để tham khảo.

## Cấu trúc dự án Sass như thế nào?

Các tập tin riêng biệt sẽ đại diện cho các components khác nhau. Sau đó import bằng cách sử dụng `@import` vào trong một file chính đặt là _main.scss_. Ví dụ:

```sass
// File: main.scss
@import 'layout/header';
```

Tạo folder layout để chứa các file dành cho các phần bố cục cụ thể. Ví dụ:

```sass
// File: _header.scss
// This file contains all styles related to the header of the site/application.
/* STYLES GO HERE */
```

_Lưu ý:_ Tên của các tệp luôn bắt đầu bằng dấu gạch dưới `_` để import.

## Cấu trúc đơn giản

Nếu như bạn đang làm một project nhỏ với sass ví dụ như một single web page. Một cấu trúc tối thiếu sẽ như sau:

```sass
_base.scss
_layout.scss
_components.scss
main.scss
```

Với 3 file bên trên sẽ được import vào file _main.scss_

**Base** file này bao gồm tất cả các thiết lập trong project của bạn như variables, mixins và bất kỳ các utility classes.
**Layout** file này bao gồm tất cả các css xử lý phần bố cục ví dụ như container và bất kỳ grid systems.
**Components** file này bao gồm bất kể những gì có thể tái sử dụng như buttons, navbars, cards,...
**Main** file này chỉ import các file khác.

Nếu như project của bạn phát triển và nó khiến cho việc cấu trúc như trên rắc rôi và khó quản lý thì bạn hãy tách chúng nhỏ ra thành các file nhỏ để dễ quản lý như _\_button.scss_ và _\_carousel.scss_
Tuy nhiên làm việc với những project lớn thì chúng ta cần cấu trúc một cách chặt chẽ hơn. Hãy xem phần tiếp theo dưới đây.

## 7–1 Pattern

Kiến trúc được gọi là _7–1 pattern_ (7 folders, 1 file), là một cấu trúc được áp dụng rộng rãi làm cơ sở cho các dự án lớn. Chúng ta có tất cả 7 folders khác nhau để bỏ các thành phần vào và một file nằm ở cấp gốc (thường đặt là _main.scss_) để xử lí việc import các file còn lại và cũng là tập để biên dịch thành CSS.
Dưới đây là một ví dụ sử dụng cấu trúc 7-1 pattern và có ví dụ một số file nằm ở trong mỗi thư mục:

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

**Abstracts (or utilities)** bao gồm các tool sass, tệp trợ giúp, variables, functions, mixins và các file cấu hình khác. Những file trong này với mục đích giúp sử dụng những công cụ của sass là không tạo ra bất kỳ CSS nào khi biên dịch.
**Base** giưx những đoạn code sẵn trong dự án. Bao gồm những tiêu chuẩn styles như resets, các rule typographic thường được sử dụng xuyên suốt project.
**Components (or modules)** giữ tất cả các styles dành cho buttons, carousels, sliders, và các thành phần tương tự. Dự án của bạn sẽ thường chứa rất nhiều tệp thành phần như vậy.
**Layout** chứa tất cả các styles liên quan đến layout trong project của bạn. Ví dụ như phần header, footer, navigation và grid system.
**Pages** những styles cho từng trang cụ thể. Ví dụ như có một trang nó không cùng styles với các trang khác và bạn không muốn để ở phần styles chung.
**Themes** phần này không được sử dụng trong nhiều project. File này sẽ giữ các tệp tạo theme cụ thể cho project. Ví dụ các thành phần của trang sẽ chứa bảng màu thay thế như chế độ _light_ và _dark_
**Vendors** bao gồm tất cả những phần code mở rộng của bên thứ 3 của thư viện và frameworks như Normalize, Bootstrap, jQueryUI,.. Tuy nhiên ví dụ như bạn cần override vendor code thì nên đặt tên folder là _vendors-extensions/_ và đặt tên cho các tệp của nhà cung cấp như _vendors-extensions/\_bootstrap.scss_
**Main.scss** tệp này chỉ để import các file khác ví dụ như:

```sass
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

Dưới đây là một ví dụ cấu trúc tóm tắt được đưa lên [Github](https://github.com/HugoGiraudel/sass-boilerplate)

Đọc thêm tại: [https://stech.edu.vn/news](https://stech.edu.vn/news)