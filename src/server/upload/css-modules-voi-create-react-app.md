Nếu bạn có kinh nghiệm làm việc với các stylesheets của các ứng dụng web lớn, source css cả trăm files, cả ngàn dòng, hàng chục ngàn tên class, thì vấn đề **naming classes**, các classes bị xung đột, overrides đôi khi trở nên cực kì quan trọng và có lúc bạn tốn tới hàng giờ để refactor lại component cũ chỉ để style component mới không bị ảnh hưởng tới các component đã style.

Từ đó, **CSS Modules** ra đời 🎉  . Nó giúp chúng ta có thể module hoá stylesheet thành các file CSS nhỏ và **scoped locally to the component** (*)

> scoped locally to the component (*): nôm na là tất cả class name, selectors, animations trong css modules files sẽ chỉ hợp lệ ở component import nó và không ảnh hưởng tới thành phần các trong website.

![](https://images.viblo.asia/d1b533a1-f106-469e-b088-1c4def5c8e63.png)

Ở bài viết này, chúng ta sẽ sử dụng CSS Modules trong React. Nếu bạn sử dụng **[create-react-app (v2)](https://github.com/facebook/create-react-app)** để setup ứng dụng react của bạn thì CSS Modules đã được setup sẵn.


*Vậy còn chờ gì nữa ? Give it a try.*

## Sử dụng CSS Modules trong React

Bắt đầu với 1 component Logo được style bằng SASS và convert nó sang kiểu CSS Modules.
```jsx
/* -- Logo.js -- */

import React from "react";

const Logo = () => {
  return (
    <div className="logo">
      <div className="logo__text">
        <span className="logo__extra logo-extra--left" />
        <span className="logo__extra logo-extra--right" />
        <span className="logo__content">
          <span className="logo__name">{`thebao`}</span>
          <span className="logo__key">{`dev`}</span>
        </span>
      </div>
    </div>
  );
};

export default Logo
```
    

## Style Component với CSS Modules:

### 1.Tạo file CSS Modules

Chúng ta sẽ tạo 1 file scss với dạng là `ComponentName.module.scss`   cùng folder với Logo.js và bắt dầu style component Logo. 

> Lưu ý ở ví dụ này mình sử dụng SCSS, các bạn hoàn toàn có thể sử dụng vanila CSS với` .module.css`

```scss
/* -- Logo.module.scss -- */
        
.logo-wrapper {
  position: relative;
  z-index: 10;
  margin: 0 auto;


.logo-text {
  font-size: $font-size-large;
  padding: 0 .5rem;

  @include flexbox();

  @include align-items(center);

  @include position(relative);

  .content {
    font-family: $font-family-logo;
    background-color: $white;
    color: $primary;
    margin: auto 10px;
    padding: 5px 10px;
    border-radius: $border-radius-base;
    transform: skew(-15deg, 0deg);
  }

  .key {
    font-size: $font-size-super-large;
  }

  .name {
    font-size: $font-size-large;
  }

  .extra {
    background-color: $info;
    border-radius: $border-radius-base;
    opacity: .4;
    transform: skew(-15deg, 0deg);
    z-index: -1;

    @include size(30px, 25px);

    &-right {
      @include position(absolute, -6px, 2px, null, null);
    }

    &-left {
      @include position(absolute, null, null, -6px, 2px);
    }
  }
```


### 2.Import CSS Modules 

Import styles ở trên vào Logo.js component. Biến **logoStyles** là 1 object chứa các CSS styles đã define ở trên. Từ đó chúng ta có thể get các classnames đã được create-react-app **modular hoá (*)** và sử dụng chúng trong JSX của Logo component.

```jsx
 /* -- Logo.js -- */
        
import React from "react";

/* Import logoStyles */
import logoStyles from "./Logo.module.scss";

const Logo = () => {
  return (
    <div className={logoStyles["logo-wrapper"]}>
      <div className={logoStyles.["logo-text"]}>
        <span className={`${logoStyles.["extra"]} ${logoStyles.["extra-left"]}`} />
        <span className={`${logoStyles.["extra"]} ${logoStyles.["extra-right"]}`} />
        <span className={logoStyles.["content"]}>
          <span className={logoStyles.["name"]}>{`thebao`}</span>
          <span className={logoStyles.["key"]}>{`dev`}</span>
        </span>
      </div>
    </div>
  );
};

export default Logo
```



> ***modular hoá:** khi chúng ta inspect Logo component, các tên class còn được thêm vào 1 chuỗi kí tự đằng sau nó. Điều này giúp cho các classname được unique, scope chỉ trong component import nó. Lưu ý là import Logo.module.scss ở 2 component khác nhau thì nó cũng là 2 chuỗi kí tự khác nhau. Giải quyết được các vấn đề conflict, CSS specificity và cascade.
> 
> ![](https://images.viblo.asia/7c2dcac3-bedc-4f28-86ee-6333dbbf68ea.png)


Tìm hiểu kĩ hơn về CSS Modules: [https://viblo.asia/p/tim-hieu-ve-css-modules-phan-1-E7bGoxl4v5e2](https://viblo.asia/p/tim-hieu-ve-css-modules-phan-1-E7bGoxl4v5e2)

[](https://www.notion.so/469ce11d0ab64f099f925488108a0c4a#4e613c74ff9e471faaad255d6dfb49f0)

That's it 😄.
Cám ơn các bạn đã theo dõi.

Nguồn tham khảo:
https://create-react-app.dev/docs/adding-a-css-modules-stylesheet