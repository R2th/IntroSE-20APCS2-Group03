## I. Lời mở đầu
![](https://images.viblo.asia/1e584999-0b5a-4189-9081-b9a41212265d.jpg)

Tailwindcss -  một utility-first CSS framework, đang dần trở nên phổ biến trong giới lập trình frontend với `34.7k` star trên github và gần `2k` fork contribute. Có thể thấy Tailwindcss đang dần hoàn thiện để tiếp nối sức ảnh hưởng của bootstrap trong thời điểm hiện tại.

Trải qua quá trình phát triển cũng như release nhiều phiên bản, Tailwindcss cho ra mắt v2, đã cải thiện đáng kể nào là placeholder styling, screenreader visibility, CSS grid, transitions, transforms, animations, layout utilities, integrated tree-shaking, gradients, ... và nhiều tiện ích khá "ngon" cho Frontend Developer.
## II. Nội dung chính
### 1. Tailwindcss cung cấp bảng mã màu mới

![](https://images.viblo.asia/267d739a-f19b-4901-9e20-3365dcb8cccc.jpg)

- Nếu như ở v1: https://v1.tailwindcss.com/docs/customizing-colors Tailwindcss chỉ có 10 màu chính thì ở v2 con số đã lên đến 22 màu chính với 10 sắc thái mỗi màu nâng tổng số các màu sắc lên con số 220.
- Tailwindcss cấu hình sẵn cho ta 8 màu cơ bản, bạn có thể import `tailwindcss/colors` và sử dụng. Khi nào cần thì ta import trong `tailwind.config.js` nhé
```js
// tailwind.config.js
const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    colors: {
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
    },
  },
}
```
### 2. Dark mode
Như các bạn có thể thấy hầu hết các trang web hiện nay đều sử dụng 2 theme chính là Dark mode and Light mode. Có thể kể đến như: Facebook, Github, Viblo, ...
Ta chỉ cần khai báo trong tailwind config:
```js
// tailwind.config.js
module.exports = {
  darkMode: 'media',
  // ...
}
```
### 3. Mở rộng 2XL breakpoint
Để hỗ trợ responsive ở những màn hình rộng hơn, cụ thể thì Tailwindcss trong config mặc định:
```js
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  }
}
```
và sau đó sử dụng:
```html
<h1 class="... 2xl:text-9xl">Viblo</h1>
```
Cá nhân mình ngay từ v1.9 thì bạn hoàn toàn có thể customize độ lớn của màn hình responsive rồi :v nên sự thay đổi này không có gì đặc biệt lắm.
### 4. Những tiện ích mới cho outline ring
- `Ring` cung cấp một solid box-shadow cho thẻ, ví dụ khi bạn muốn focus vào 1 button và nó sẽ có thêm 1 solid box-shadow thì bạn thêm như sau: 
```html
<button
  class="... focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
>
  <!-- ... -->
</button>
```
- Bạn có thể thêm các hiệu ứng với `ring-offset-{width}`
 ```html
<button
  class="... focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 focus:ring-opacity-50"
>
Viblo
</button
```
- Viêc sử dụng `ring` cũng có thể kết hợp với `shadow`:
```html
<button class="shadow-sm focus:ring-2 ...">
    Viblo
</button>
```
### 5. Utility-friendly form styles
TailwindCss cung cấp thêm 1 plugin cho forms được khai báo tại `@tailwindcss/forms`
```js
// tailwind.config.js
module.exports = {
  // ...
  plugins: [require('@tailwindcss/forms')],
}
```
### 6. Mặc định line-heights theo font-size
Khi khai báo font-size thì sẽ khai báo line-heights kèm theo luôn.
```js
// Tailwind's default theme
module.exports = {
  theme: {
    // ...
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
  },
}
```
Chính vì thế khi ta sử dụng font-size `base` thì thẻ sẽ nhận line-height là `1.5rem`. Ví dụ:
```html
<p class="text-base">Viblo</p>
```
Ngoài ra, thuộc tính `leading` (line-height) khi được viết cùng font-size sẽ ghi đè line-height của thẻ.
```html
<p class="text-base leading-none">Viblo</p>
```
### 7. Mở rộng spacing, typography, and opacity
- Thêm bắt đầu từ các giá trị `0.5`, `1.5`, `2.5`, và `3.5` cho các khoảng trống khi chúng ta sử dụng padding, margin, ...
```html
<span class="ml-0.5">Viblo</span>
```
- Và kết thúc bởi các giá trị `72`, `80`, và `96`:
```html
<div class="p-96">Viblo</div>
```
- Thêm thuộc tính `inset` để căn vị trí (top/right/bottom/left):
```html
<div class="inset-0">Viblo</div>
```
- Fontsize mở rộng thêm các thuộc tính  `7xl`, `8xl`, and `9xl`:
```html
<h1 class="text-9xl">Viblo</h1>
```
- Opacity mở rộng từ  `0` đến `100`:
```html
<figure class="opacity-10">
    Viblo
</figure>
```
### 8. Sử dụng @apply với mọi thứ
Bạn có thể sử dụng `@apply` để inline các class utility cho các thẻ:
```html
.btn {
  @apply bg-indigo-500 hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50;
}
```
### 9. Thêm tiện ích mới cho text overflow 
- Thêm  `overflow-ellipsis` and `overflow-clip`
```html
<p class="overflow-ellipsis overflow-hidden">
  viblo
</p>
```
### 10. Mở rộng variants
Ở phiên bản trước, muốn sử dụng thuộc tính `focus-visible` cho `backgroundColor` thì phải liệt kê trong config tất cả các thuộc tính kiểu như:
```js
// tailwind.config.js
module.exports = {
  // ...
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'focus-visible'],
  },
}
```
Còn với TailwindCss v2:
```js
// tailwind.config.js
module.exports = {
  // ...
  variants: {
    extend: {
      backgroundColor: ['focus-visible'],
    },
  },
}
```
### 11. Khai báo group-hover and focus-within
`group-hover` and `focus-within` được bật mặc định:
```js
<div class="group ...">
  <span class="group-hover:text-blue-600 ...">Da ba dee da ba daa</span>
</div>
```
### 12. Đăng ký transition duration and easing curve
Trước đây khi thêm một transition bạn phải thêm 3 classes:
```html
<button class="... transition duration-150 ease-in-out">Post</button>
```
Còn bây giờ bạn hãy đăng ký các effect trong config
```
// tailwind.config.js
module.exports = {
  // ...
  theme: {
    // ...
    transitionDuration: {
      DEFAULT: '150ms',
      // ...
    },
    transitionTimingFunction: {
      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      // ...
    },
  },
}
```
Ta sử dụng:
```html
<button class="... transition">Post</button>
```
Và đương nhiên ta cũng có thể ghi đè thuộc tính nếu viết kiểu cũ:
```html
<button class="... transition duration-300 ease-out">Post</button>
```
### 13. Không còn tương thích với IE11
Bạn nên cân nhắc sử dụng nếu dự án của mình có sử dụng IE11 nhé.
## III. Tạm kết
TailwindCss v2 đã cải thiện khá nhiều tiện ích, còn các bạn thấy sao. Riêng mình thì vẫn đang chờ đợi một sự đột phá nữa từ Tailwind.
![](https://images.viblo.asia/de712910-d0ef-4e55-aaf8-d7cffca1e892.jpg)