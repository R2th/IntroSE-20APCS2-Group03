## Giới thiệu

Bài viết này mình sẽ giới thiệu cho bạn cách tổ chức các tệp CSS trong một ứng dụng. Phần này sẽ giúp bạn làm việc hiệu quả hơn và cho phép bạn ngay lập tức tìm thấy nơi bạn phải sửa đổi code CSS của mình.

Và để làm được như vậy, chúng ta sẽ tìm hiểu về mô hình (pattern) 7 - 1.

Nhìn chung nó khá là đơn giản. Với pattern này bạn phải tuân thủ 2 quy tắc:

1. Viết tất cả partial CSS của bạn trong 7 thư mục khác nhau.
2. Import tất cả chúng vào một file main.scss.

## 7 folders

* `base`: Nới chứa tất cả code CSS boilerplate của bạn. CSS Boilerplate ở đây bạn có thể hiểu là code CSS bạn sẽ viết mỗi lần start một dự án mới. Ví dụ: quy tắc typography, animations, utilities v.v..

* `components`: Cái tên khá là tường minh rồi. Thư mục này chứa tất cả các thành phần (components) CSS của bạn được sử dụng để tạo nên các trang như buttons, forms, swipers, popups, v.v..

* `layout`: Được sử dụng để bố trí các phần khác nhau của trang, có nghĩa là header, footer, navigation, section, grid do chính bạn định nghĩa v.v..

* `pages`: Ứng dụng của bạn sẽ có rất nhiều page, mỗi page lại có những style khác nhau, và đây chính là nơi bạn sẽ put CSS page của mình vào.

* `themes`: Nếu trong ứng dụng của bạn có nhiều themes khác nhau (dark mode, admin v.v..), hãy đặt chúng trong thư mục này.

* `abstracts`: Đặt tất cả các function CSS của bạn ở đây, cùng với variables và mixin. (Hiểu nôm na chúng là CSS helpers của bạn đấy)

* `vendors`: Nơi bạn chứa tất cả các file không phụ thuộc nếu ứng dụng của bạn sử dụng thư viện bên ngoài (third party). Chúng có thể là FontAwesome, Bootstrap và các nội dung tương tự v.v..

## main file

Nơi import tất cả các partial CSS của bạn.

```SCSS
@import abstracts/variables;
@import abstracts/functions;

@import base/reset;
@import base/typography;
@import base/utilities;

@import components/button;
@import components/form;
@import components/user-navigation;

@import layout/header;
@import layout/footer;
...
```

CSS Architecture này phù hợp với các dự án lớn hơn. Với những dự án có quy mô nhỏ bạn có thể sẽ không cần đến `themes` hay `vendors`.

Dưới đây là một Architecture bạn có thể tham khảo thêm:

```
sass/
  _animations.scss
  _base.scss
  _buttons.scss
  _header.scss
  ...
  _variables.scss
  main.scss
  ```

Sau tất cả, nhiệm vụ của bạn là tìm hiểu cách biên dịch SCSS sang CSS nhé.

Hi vọng, bài viết giúp ích được các bạn. Chúc bạn học tốt !!!