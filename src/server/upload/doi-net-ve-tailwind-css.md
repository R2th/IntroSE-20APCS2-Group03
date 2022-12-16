`Tailwind` là một utility-first CSS framework. Khác so  với các framework CSS khác như Bootstrap  nó không đi kèm với các thành phần được xác định trước. Thay vào đó, `Tailwind CSS` hoạt động ở cấp độ thấp hơn và cung cấp cho bạn một tập hợp các class hổ trợ CSS. Bằng cách sử dụng class này bạn có thể nhanh chóng tạo thiết kế tùy chỉnh một cách dễ dàng. `Tailwind CSS` không  những tạo ra các class có sẵn  và nó còn để bạn tạo ra thiết kế độc đáo cho riêng mình.

# Utility-first
### 1 ) Utility-first css:
Là một cách tiếp cận mới giúp bạn thiết kế trang web của mình mà không cần viết quá nhiều css.Thay vào đó chúng ta có thể sử dụng những class có sãn trong thư viện đã được xây dựng.Đặc tính hay ho của nó là coi mổi thuộc tính trong css
là một class, giúp bạn có thể style trược tiếp trên thẻ. Ngoài ra nó còn giúp chúng ta tránh lập đi lập lại các thuộc tính trong css như cách viết cũ nhờ đó khiến file css  nhẹ đi đáng kể và tối ưu việc tránh xung đột css giữa các class.
### 2 ) Utility-first frameworks:
`Utility-first frameworks` cung cấp một lớp  cấp thấp để tạo ra các thiết kế tùy chỉnh trong tệp HTML. Các lớp  được đặt tên theo mục đích dự định của chúng để người bình thường dễ hiểu.

```html
<div class="bg-white"></div>
```
Mục đích chính của class `.bg-white` là thêm `background-color` là màu trắng. Có các class khác nhau cho các mục đích khác nhau, chẳng hạn như thiết lập `background-color` hoặc thêm `border`.

# Setup Tailwind with React

Tạo project react:

``` 
npx create-react-app my-project
cd my-project
```
Vì Create React App không cho phép bạn ghi đè cấu hình PostCSS , chúng ta  cần cài đặt `CRACO` để có thể định cấu hình Tailwind:

```
npm install @craco/craco
```
Sau đó cập nhật lại file `package.json`:

```js
  {
    "scripts": {
     "start": "craco start",
     "build": "craco build",
     "test": "craco test",
     "eject": "react-scripts eject"
    },
  }
```

Tạo file `craco.config.js` với cấu hình sau:

```js
module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}
```

Tạo file `tailwind.config.js`:
```js
npx tailwindcss init
```
Nó sẽ tự động tạo ra cấu hình như sau:
```js
// tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```
Cấu hình file `index.css`:

```css
/* ./src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```js
 // src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
```

# Ví dụ

```js
import React from "react";

const Card = () => {
  return (
    <div class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
      <div class="flex justify-center md:justify-end -mt-16">
        <img
          class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
          src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
        />
      </div>
      <div>
        <h2 class="text-gray-800 text-3xl font-semibold">Design Tools</h2>
        <p class="mt-2 text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
          deserunt ea doloremque natus error, rerum quas odio quaerat nam ex
          commodi hic, suscipit in a veritatis pariatur minus consequuntur!
        </p>
      </div>
      <div class="flex justify-end mt-4">
        <a href="#" class="text-xl font-medium text-indigo-500">
          John Doe
        </a>
      </div>
    </div>
  );
};

export default Card;
```
Import nó vào trong app . Kết quả thu được
![](https://images.viblo.asia/57dae4c6-4494-452f-8386-0746918595e7.png)

# Các đặc tính nổi bật

## I) Functions & Directives

### 1) @tailwind
Sử dụng lệnh `@tailwind` để chèn thiết lập ban đầu `base`, `components`, `utilities` và `screens` vào css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@tailwind screens;
```

### 2) @apply
Sử dụng` @apply` để sử dụng được những class built-in của framework trong một class mới.Giúp code chúng ta gọn hơn.

```css
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 hover:bg-blue-700 text-white;
}
```
```html
<button className="btn btn-blue"></button>
```
Và khi render ra nó củng chỉ được tạo ra dưới dạng `atomic`

### 3) @layer
Sử dụng lệnh @layer để cho Tailwind biết tập hợp các kiểu này thuộc về nhóm nào. Các lớp hợp lệ là `base`, `components`, và `utilities`.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
}

@layer components {
  .btn-blue {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
}

@layer utilities {
 .filter-none {
    filter: none;
 }
 .filter-grayscale {
    filter: grayscale(100%);
 }
}
```

Tailwind sẽ tự động di chuyển bất kỳ CSS nào trong nhóm chỉ định @layer đến với nhóm của nó, vì vậy bạn không phải lo lắng nhiều về việc tạo CSS của mình theo một thứ tự cụ thể để tránh các vấn đề về tính cụ thể.

## II) Customizing design
Ngoài việc sử dụng các giá trị mặc định được định nghĩa sẵn bởi Tailwind CSS chúng ta hoàn toàn có thể thiết lập, override lại các giá trị đó bằng cách sửa file tailwind.config.js .

```js
module.exports = {
  important: true,
  theme: {
    borderRadius: {
       sm:'2px',
       md: '5px',
    },
    extend: {
        fontSize: {
         sm: '12px',
         base: '14px',
         m: '16px',
         l: '18px',
         xl: '24px',
         '2xl': '36px',
         '3xl': '48px',
        },
    },
    
  },
  variants: {},
  plugins: []
}
```
```html
<h6 className="text-sm">Trong</h6>
<h6 className="text-sm">Trong</h6>
<h6 className="text-sm  rounded-md">Trong</h6>
```
Lưu ý rằng các thuộc tính viết ở ngoài `extend` thì các thuộc tính có sãn trong tailwind sẽ không sử dụng được

## III) Configuring Variants

Phần biến thể của tệp tailwind.config.js là nơi bạn kiểm soát những biến thể nào nên được bật cho mỗi plugin :

```js
// tailwind.config.js
module.exports = {
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderColor: ['focus-visible', 'first'],
      textColor: ['visited'],
    }
  },
}
```
Lưu ý rằng chỉ có một vài `variants` được bật sãn. Bạn cần đọc tài liệu để nắm được thông tin đó
https://tailwindcss.com/docs/configuring-variants

```js
// tailwind.config.js
module.exports = {
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      borderColor: ['disabled'],
    }
  },
}
```
Sử dụng như sau:
```html
<button className="disabled:bg-gray disabled:border-gray">Trong</button>
```

# Kết luận
Tailwind CSS giới thiệu một cách khác về cách viết css mới lạ. Nó cung cấp cho bạn một tập hợp các lớp tiện ích có thể được sử dụng để tạo cho bạn thiết kế độc đáo và tùy chỉnh một cách dễ dàng.
Tailwind CSS dể tuỳ biến, vì vậy bạn hoàn toàn tự do trong việc lựa chọn thiết kế các yếu tố và thành phần trên trang web của mình.

# Tài liệu tham khảo
- https://tailwindcss.com/docs
- https://medium.com/codingthesmartway-com-blog/tailwind-css-for-absolute-beginners-3e1b5e8fe1a1
- https://blog.logrocket.com/top-utility-first-css-frameworks/