Bạn đang suy nghĩ để lựa chọn một CSS framework cho dự án của mình? Nếu bạn đang băn khoăn thì hãy trải nghiệm với Tailwind nhé, đó sẽ là một trải nghiệm thú vị khi bạn sử dụng một loại framework mới đó. Để biết Tailwind như thế nào bạn có thể đọc tham khảo bài viết [giới thiệu](https://viblo.asia/p/tailwind-co-thuc-su-tuyet-voi-nhu-loi-don-gDVK2OreZLj) và bắt đầu chi tiết hơn với bài viết này nhé. Chúng ta bắt đầu thôi!

![](https://images.viblo.asia/b708e821-f9a6-4205-8769-a48b9a2d6700.png)

Về cách cài đặt Tailwind như thế nào thì bạn có thể xem tài liệu chi tiết của [trang chủ](https://tailwindcss.com/docs/installation), ở bài viết này mình sẽ chia sẻ những config có thể bạn cần khi sử dụng Tailwind nè.

Đối với Tailwind thì hiện tại không thể nào đủ hết 100% thuộc tính css nên bạn cần phải config thêm khi muốn sử dụng cho phù hợp với design của bạn. Khi các bạn cài đặt Tailwind, họ sẽ cung cấp một tệp cấu hình là `tailwind.config.js` được đặt trong thư mục gốc của dự án, để bạn có thể config lại màu sắc, font size, breakpoints... tuỳ theo nhu cầu sử dụng của bạn.

> Lưu ý: Khi bạn sử dụng link CDN thì sẽ không có tệp cấu hình này nha.


Cấu trúc của một file `tailwind.config.js` sẽ trông như thế này:
```js
// tailwind.config.js
module.exports = {
 theme: {
    extend: {
      container: {
        center: true,
        padding: '15px',
      },
      colors: {
        red: {
          500: '#da372c',
        },
        yellow: {
          500: '#ffc61c',
        },
      },
      zIndex: {
        '-1': '-1',
      },
      boxShadow: {
        box: '0px 0px 10px rgba(0, 0, 0, 0.2)',
      },
    },
    fontSize: {
      sx: ['12px', '18px'],
      sm: ['14px', '22px'],
      base: ['16px', '24px'],
      lg: ['20px', '30px'],
      xl: ['32px', '40px'],
      '2xl': ['24px', '36px'],
    },
    maxWidth: {
      100: '100px',
    },
}
```
Lưu ý rằng các thuộc tính mà bạn thiết lập lại ở ngoài extend thì các thuộc tính có sẵn trong tailwind sẽ không sử dụng được.

Ngoài ra bạn có thể sử dụng vài config sau:
#### Breakpoints
Mỗi class của Tailwind đều có hành vi Responsive của nó, giúp bạn dễ dàng Responsive nhanh chóng các class mà không cần style lại, chỉ cần sử dụng tiền tố {screen}:{class}, ví dụ:
```html
<div class="lg:text-2xl md:text-lg text-sm">Xin chào!</div>
```
Và config lại ở đây để phù hợp với design của bạn:
```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  }
}
```
Bạn cũng có thể Config Responsive cho class
```js
.bg-brand-gradient { /* ... */ }
@media (min-width: 640px) {
  .sm\:bg-brand-gradient { /* ... */ }
}
@media (min-width: 768px) {
  .md\:bg-brand-gradient { /* ... */ }
}
@media (min-width: 992) {
  .lg\:bg-brand-gradient { /* ... */ }
}
@media (min-width: 1280px) {
  .xl\:bg-brand-gradient { /* ... */ }
}
```
Đối với ứng dụng của bạn sử dụng trên mobile thì cần phần này nhỉ:
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        'portrait': {'raw': '(orientation: portrait)'},
        // => @media (orientation: portrait) { ... }
      }
    }
  }
}
```
#### Configuring Variants:
```js
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

#### Plugins:
Đây là phần config để sử dụng before và after:

```js
const plugin = require('tailwindcss/plugin');

plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    plugin(({ addVariant, e }) => {
      addVariant('before', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`before${separator}${className}`)}::before`;
        });
      });
      addVariant('after', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`after${separator}${className}`)}::after`;
        });
      });
    }),
    plugin(({ addUtilities }) => {
      const contentUtilities = {
        '.content': {
          content: 'attr(data-content)',
        },
        '.content-before': {
          content: 'attr(data-before)',
        },
        '.content-after': {
          content: 'attr(data-after)',
        },
      };

      addUtilities(contentUtilities, ['before', 'after']);
    }),
  ],
```

 Không giống như các Framework CSS khác, cấu hình Tailwind là không phụ thuộc. Điều này sẽ cho bạn thoả thích tuỳ chỉnh lại mà không sợ ảnh hưởng đến những thành phần khác đã được cài đặt của Tailwind.
 
#### Tổng kết
Những phần trên là tổng hợp những phần config mình đã sử dụng trong dự án, hy vọng sẽ giúp ích được các bạn khi mới trải nghiệm sự dụng. Cảm ơn bạn đã dành thời gian đọc bài viết!