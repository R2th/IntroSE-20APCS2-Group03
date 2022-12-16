Chào các bạn,

**SASS** :  1 trong những CSS preprocessor rất phổ biến được nhiều developer sử dụng để viết CSS hiệu quả hơn và modular hơn với hàng loạt tính năng như nesting, variables, mixins, extends,...

**[create-react-app](https://github.com/facebook/create-react-app)**   : 1 bộ react boilerplate và CLI được phát triển bởi chính cha đẻ của react - Facebook. Chỉ với 1 dòng command line đơn giản, bạn đã setup xong 1 react project được configured kĩ càng, support hầu hết các technologies cần thiết để bạn tập trung vào việc phát triển ứng dụng thay vì loay hoay với đống configs, setup.

**Vậy tại sao chúng ta không sử dụng SASS cho styling kết hợp với React cho business logics?**

*Let's do that 😎*

## 1. Setup SASS với create-react-app

Sau khi các bạn setup xong ứng dụng bằng [create-react-app](https://github.com/facebook/create-react-app)  , chúng ta cần cài node-sass package - là 1 npm package giúp chúng ta compile sass sang css. 

```
    create-react-app new-app
    cd new-app
    npm install node-sass --save 
```

> Create React App 2 đã chính thức support SASS nên chúng ta không cần phải thay đổi thêm bất kì config gì nữa, hooray 🎉
> 
## 2. Style React Component với SASS

Setup xong rồi, thử nó thôi. Ví dụ chúng ta có 1 component Menu để hiển thị danh sách các links của ứng dụng :

```jsx
//-App.js

import React, { Component } from 'react';
import Menu from './Menu';

const MENUS= [
  { text: 'Website', url: 'http://thebaodev.me' },
  { text: 'Blog', url: 'http://blog.thebaodev.me' },
];

class App extends Component {
  render() {
    return (
      <div>
        <Menu menus={MENUS} />
      </div>
    );
  }
}
export default App;
```

Ở `Menu` component, nó sẽ nhận vào list `menus` và render với `<a>` tag.

```jsx
//-Menu.js
import React from 'react';
import './Menu.scss';
const Menu = ({ menus }) => (
  <div className="Menu">
    <ul>
      {menus.map(menu => (
        <li key={menu.url}>
          <a href={menu.url}>{link.text}</a>
        </li>
      ))}
    </ul>
  </div>
);
export default Menu;
```


Có thể thấy, Menu component còn import thêm 1 file scss `Menu.scss` được sử dụng để styling. 

> Chú ý: Để tránh xảy ra các vấn đề về css overrides, cascade chúng ta nên có 1 class để wrap ( bao bọc ) hết component và style từng thành phần bên trong. *( xem ví dụ bên dưới để hiểu rõ hơn )*

```scss
# Menu.scss

.Menu {
# Menu selector bao bọc các element con 
# để tránh gây xung đột css với component khác.
  background-color: bisque;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
  }
  li {
    margin: 10px 20px;
  }
  a {
    text-decoration: none;
  }
  a,
  a:visited {
    color: #ffffff;
  }
  a:hover {
    color: lightseagreen;
  }
}
```


Nesting các element `ul`  `li`  `a`  bên trong `.Menu` là 1 trong những tính năng nổi bật của SASS so với CSS thuần. Tiếp theo hãy thử sử dụng variables nhé:

```scss
# Menu.scss

@import './variables.scss';
.Menu {
  background-color: $primary-background;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
  }
  li {
    margin: 10px 20px;
  }
  a {
    text-decoration: none;
  }
  a,
  a:visited {
    color: #ffffff;
  }
  a:hover {
    color: $primary-color;
  }
}
```


`variables.scss` được import để sử dụng các biến đã được define sẵn. 

```scss
# variable.scss

$primary-background: bisque;
$primary-color: lightseagreen;
```

---

**Awesome!** Sass còn rất nhiều tính năng mà bạn có thể tận dụng để productivity hơn, hiệu quả hơn trong việc styling React components. 

Vẫn còn nhiều cách khác để styling ứng dụng React của bạn, phổ biến là [styled-components](https://github.com/the-road-to-learn-react/react-styled-components-example) và [CSS Modules](https://viblo.asia/p/css-modules-voi-create-react-app-1VgZvG9YlAw)

Cám ơn các bạn đã theo dõi bài viết của mình.

Cheers 🍻



*Nguồn tham khảo:*

https://scotch.io/tutorials/using-sass-in-create-react-app-v2

https://create-react-app.dev/docs/adding-a-sass-stylesheet