# Styling React components
Đối với bài viết này, Mình sẽ giời thiểu các bạn, những cách đơn giản nhất để sử dùng Style trong React. Trước mặt chúng ta phải hiểu rằng theo cách đơn giản của mô hình [MVC](http://www.tutorialsteacher.com/mvc/mvc-architecture) đó, React là một lớp view (view layer) liên quan nhiều về phia người dùng, cho nền cách xử lý đánh dấu hiển thị (markup rendered) là một cái dễ nhất đối với React, và chúng ta cùng biết rằng để xử lý việc đó chúng phải cần phải sử dùng CSS để làm việc đó để kết nối chặt chẽ với cách xử lý đánh dấu hiển thị đó. ở bên dưới này chúng ta sẽ đi qua 4 cách xử lý styling css trong React.

![](https://images.viblo.asia/aac33709-8afd-43fc-af6d-65e5d7c8ea3a.png)

## CSS Stylesheet
- Tạo file `css` ở thử mục nào đó và import vào file đó vào react file của mình
 
 Trong file `Header.jsx`
```javascript
import React from 'react';
import './header.css';

const Header = () => (
   <div className="header">
      Đây là header của page
   </div>
);

export default Header;
```

Trong file `header.csss`
```javascript
header {
 position: relative;
 z-index: 500;
 font-size: 15px;
 text-align: center;
}
```
## Inline Styling
Cú pháp của JSX mình có thể gọi là một bạn thận tốt của cú pháp HTML. Trong trạng thái đơn gian của HTML. Trong React, Đối với inline style thì không có quy định kiểu dữ liệu `string`. Người ta chỉ là quy định một `key` đặc biệt nhất đó là `camelCased` đối với tên của style. vi dụ:
```javascript
font-size -> fontSize
text-align -> textAlign
....
```

![](https://images.viblo.asia/fcb6f02a-0617-44aa-929f-1ffbdbe39ca0.png)

Như vậy chúng ta có thể  dùng ES6 const để chuyển vào thuộc tích `style` của HTML luôn.

Trong file `Header.jsx`
```javascript
import React from 'react';

const headerStyle = {
   position: 'relative',
   fontSize: '15px',
   textAlign: 'center'
};

const Header = () => (
   <div style={ headerStyle }>
      Đây là header của page
   </div>
);

export default Header;
```

## Sử dụng CSS Module
CSS Module là một kiểu css được viết trong những file `css` mà tất cả tên `classes` và `animation` trong một `scope` default được gọi là `local`. Cách này cùng khả giống cách thử  nhất của mình (CSS Stylesheet)  chỉ khác biết chỗ  phải viết thêm `scope local` cho những `css` của mình.

![](https://images.viblo.asia/f13a1b0a-babb-4cca-a5b7-76e6ce4da8e9.png)

- Trong file `Header.jsx`
```javascript
import React from 'react';
import styles from './header.css';

const Header = () => (
   <div className={styles.header}>
      Đây là header của page
   </div>
);

export default Header;
```

- Trong file `header.css`
```javascript
:local(.header) {
   position: relative;
   z-index: 500;
   font-size: 15px;
   text-align: center;
}
```

-`:local(.className)` : được tạo ra từ wepack, nếu bạn đang dùng webpack để chạy tạo project react của bạn. Tuy nhiên chúng ta phải add cấu hình theo trong `webpack.config.js` file nữa để chạy được `CSS Module`.
```javascript
...
{
  test: /\.css$/,
  loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]' 
}
...
```
## Styled-Components
**[Stylee-Compoents](https://github.com/styled-components/styled-components)** là một thư viện css của `React` và `React Native` tạo ra, cho phép chúng ta viết CSS style trong file Javascript. Cách này cùng khả giống đối với cách thứ 2, đối với cách này bạn có thể tạo component css riêng cho dự án của mình luôn.

![](https://images.viblo.asia/4be16d53-f435-40e6-9be2-f4d21d093891.png)

- Trong file `Header.jsx`
```javascript
import React from 'react`;
import styled from 'styled-components';

const StyleHeader = styled.header`
  position: relative;
  z-index: 500;
  font-size: 15px;
  text-align: center;
`;

const Header = () => (
 <StyleHeader>
    Đây là header của page
 </StyleHeader>
);

export default Header;
```
# Kết luận
Sau khi chúng ta đã miêu tả như trên, các bạn có thể lựa chọn một hoặc nhiều trong những cách trên để áp dụng trong project của các bạn.

# Tài liệu
- [Styled Component](https://github.com/styled-components/styled-components)
- [Style React navtive](https://facebook.github.io/react-native/docs/style.html) 
- [React CSS Module](https://github.com/gajus/react-css-modules)