Xin chào mọi người, có rất nhiều bạn đang thắc mắc là có một framework CSS nào khác thay thế được Bootstrap hay không ? Theo bản thân mình thấy hiện giờ có rất nhiều các framework CSS khác nhau nhưng `Bootstrap`, `Foundation` thì vẫn là cha đẻ , là nguồn cảm hứng vô tận của các framework CSS khác. Dạo gần đây chúng ta thấy nổi trên thị trường một thứ mang tên **Tailwind CSS** giúp xây dựng website một cách nhanh chóng nhất với các thuộc tính CSS đã được gán thành những class riêng, khi dùng chúng ta chỉ có việc gọi ra để dùng. Vậy một câu hỏi đặt ra là tại sao chúng ta không sử dụng Bootstrap cho nó truyền thống đi ? Chắc chắn framwork CSS này nó phải có một điểm mạnh gì nó thì các lập trình Front-end mới dùng chứ nhỉ ? Chúng mình sẽ điểm qua một vài các ưu nhược điểm của nó nhé.

![](https://images.viblo.asia/aec9657d-51c9-4d60-acc3-b784680ff410.png)


# Tailwind CSS là gì ?
Thì nó là một utility-first CSS framework, nó cũng giống như Bootstrap, nó có những class built-in mà chúng ta có thể dùng. Tailwind CSS có nhiều các class bao gồm các thuộc tính CSS khác nhau và quan trọng, chúng ta có thể dễ dàng mở rộng tạo mới ra những class bằng chính những class của nó.

# Tại sao chúng ta nên dùng Tailwind ?
Nói chung là nó cũng na ná Boostrap thôi nhưng một điều tiện lợi khi dùng framework này là chúng ta có nhiều class mới hơn tiện lợi hơn Boostrap. Các bạn có thể tham khảo [tại đây](https://nerdcave.com/tailwind-cheat-sheet) trong Tailwind. Và hơn nữa, việc có nhiều thêm những class nhưng với quy tắc đặt tên cực kỳ thân thiện với người dùng, người dùng cũng có thể nhìn vào class đó và có thể biết được class này nó đang style cái gì. Chúng ta cũng phải nói đến khả năng tùy biến và mở rộng cao, đem đến cho ta sự linh hoạt không giới hạn.

# Cài đặt Tailwind trong Nextjs
Sau đây mình sẽ giới thiệu cho các bạn cách cài đặt Tailwind trong Nextjs nhé. Nếu ai dùng Nuxtjs thì các bạn cũng có thể làm tương tự, ở một góc độ nào đó mình thấy về cơ bản 2 cái này nó giống nhau. 

Đầu tiên các bạn phải tạo một Nextjs project
```Javascript
npm init -y
npm install --save next react react-dom @zeit/next-css
```
Tiếp theo chúng ta sẽ cài `tailwind` và  một vài các package khác được sử dụng để complie CSS
```Javascript
npm install tailwindcss autoprefixer postcss-loader --save-dev
```
Và chúng ta cũng cần cài thêm `next-css` plugin
```Javascript
npm install @zeit/next-css
```
Khi chúng ta init nextjs project xong rồi, thì chúng ta sẽ tạo 1 file `postcss.config.js` để require 2 plugin `tailwindcss` và `autoprefixer` vào nhé
```Javascript
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
```

Tiếp theo trong file `next.config.js` chúng ta sẽ config như sau
```javascript
import path from 'path'
import fs from 'fs'

import withPlugins from 'next-compose-plugins'
import css from '@zeit/next-css'
import less from '@zeit/next-less'
import lessToJS from 'less-vars-to-js'

import progressBar from 'next-progressbar'
import nextConfig from './next.base.config'


export default withPlugins([
  progressBar,
  css,
  [less, lessConfig],
], nextConfig)

```
Trong file `package.json` các bạn cho đoạn script này vào như sau
```Javascript
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}
```
Trong thư mục assets ở trong project các bạn tạo `styles/less/tailwind.less`
```Javascript
@tailwind base;
@tailwind utilities;

@tailwind components;
```
Sau đó các bạn tạo thêm `app.less` với nội dung
```Javascript
@import "./libs/tailwind.less";
```
Mình không muốn đi giới thiệu từng class trong `tailwind css`, việc đó sẽ gây mất thời gian và nhàm chán. Thay vào đó mình sẽ thử tạo ra một page và style theo class rồi mình sẽ nói cụ thể cho các bạn nhé. hehe.
Bây giờ chúng mình sẽ vào folder page và tạo 1 file `demo.js` nhé
```Javascript
import '~/assets/styles/less/app.less';

const Demo = () => (
    <div className="flex justify-between items-center py-4 bg-blue-900">
        <div className="flex-shrink-0 ml-10 cursor-pointer">
            <i className="fas fa-drafting-compass fa-2x text-orange-500"></i>
            <span className="ml-1 text-3xl text-blue-200 font-semibold">Viblo</span>
        </div>
        <i className="fas fa-bars fa-2x visible md:invisible mr-10 md:mr-0 text-blue-200 cursor-pointer"></i>
        <ul className="hidden md:flex overflow-x-hidden mr-10 font-semibold">
            <li className="mr-6 p-1 border-b-2 border-orange-500">
                <a className="text-blue-200 cursor-default" href="#">Home</a>
            </li>
            <li className="mr-6 p-1">
                <a className="text-white hover:text-blue-300" href="#">Services</a>
            </li>
            <li className="mr-6 p-1">
                <a className="text-white hover:text-blue-300" href="#">Projects</a>
            </li>
            <li className="mr-6 p-1">
                <a className="text-white hover:text-blue-300" href="#">Team</a>
            </li>
            <li className="mr-6 p-1">
                <a className="text-white hover:text-blue-300" href="#">About</a>
            </li>
            <li className="mr-6 p-1">
                <a className="text-white hover:text-blue-300" href="#">Contacts</a>
            </li>
        </ul>
    </div>
);

export default Demo;

```
Sau đó chúng ta sẽ bật `npm run dev`, đánh đường dẫn, kết quả chúng ta sẽ thu được như sau

![](https://images.viblo.asia/768d3493-0169-46f2-9e81-4065b977dd8c.png)

Mình sẽ đi qua một vài các class như sau: Đầu tiên thì chúng ta muốn tạo 
được thanh menu thì chúng ta sẽ phải tạo ra 1 div có class flex
container để chứa tất cả 
các thành phần trong thanh menu đó, đó chính là logo, các navigation 
như Home, Service, Project, Team, About, Contacts. Và chúng ta cũng không quên
style padding và background cho thanh menu `py-4` thêm padding cho trên và dưới 
với các thông số py-1 tức là padding-top và padding-bottom mỗi bên 0.25rem, tương tự 
chúng ta cũng tăng dần lên từ py-1 cho đến py-64, các bạn [tham khảo](https://tailwindcss.com/docs/padding/#app) ở đây nhé.
Cùng với nữa đó chính là class `bg-orange-900` tức là thuộc tính css `background-color` màu cam 
và 900 chính là mức độ đậm của màu cam.

Chúng ta sẽ đầu tiên đến với logo, chúng ta dùng class `ml-10` để lo có thể cách margin 
bên trái 1 khoảng là 2.5 rem. và khi di chuột qua biểu tượng logo này thì chuột sẽ thay đổi 
thành hình bàn tay khi chúng ta có thuộc tính `cursor-pointer`.

Chữ Viblo chúng ta muốn tăng font-size lên thì dùng class `text-3xl`, màu chữ xan blue tương đối nhẹ `text-blue-200`
và 1 chút font-weight: 600 `font-semibold`

Icon 3 gạch được style với class visible khi width màn hình dưới 768px, khi màn hình lớn hơn thì icon 3 gạch này sẽ bị 
ẩn đi với class `md:invisible` . Các bạn lưu ý, trong tailwind css thì khi chúng ta muốn responsive cho các màn thì chúng ta
chỉ cần thêm các tiền tố `sm:, md:, lg:, xl:` vào trước các class . Các bạn tham khảo thêm responsive [ở đây](https://tailwindcss.com/course/responsive-design/#app).

Tiếp đến đó chính là thành phần liên kết điều hướng  Home, Service, Project, Team, About, Contacts, 
Chúng ta thấy hầu hết các liên kết điều hướng này có cùng class style như nhau nhưng 
thành phần Home sẽ làm khác đi một chút bằng các thêm style `cursor-default`. Và đáng nhẽ ra 
nó sẽ thành một danh sách sổ xuống nhưng do dùng class `hidden` nên khi màn hình tầm 768px trở xuống 
danh sách đó sẽ bị ẩn đi, và khi màn hình trên 768px thì danh sách đó được hiện lên nằm ngang với 
class `md:flex overflow-x-hidden`.
 

# Điểm mới khi dùng Tailwind CSS
Như các bạn đã biết đấy, khi chúng ta dùng framwork này ngoài việc nhiều class hơn tiện cho việc chúng ta style thì chúng ta còn có thể sử dụng lại các class build-in trong framework này để viết một class mới. Đó chính là khi chúng ta sử dụng từ khóa **@apply**.

Bây giờ chúng ta lại mở file assets/styles/less/app.less ra chúng ta sẽ viết thêm css cho class như sau 
```Javascript
@import "./libs/tailwind.less";

.demo {
    @apply flex justify-between items-center py-4 bg-blue-900;
}

```
Và sau đó các bạn thay đoạn code thành như sau thì các bạn cũng nhận được kết quả giống y hệt như ban đầu
```Javascript
import '~/assets/styles/less/app.less';

const Demo = () => (
    <div className="demo">
        <div className="flex-shrink-0 ml-10 cursor-pointer">
            <i className="fas fa-drafting-compass fa-2x text-orange-500"></i>
            <span className="ml-1 text-3xl text-blue-200 font-semibold">Viblo</span>
        </div>
        <i className="fas fa-bars fa-2x visible md:invisible mr-10 md:mr-0 text-blue-200 cursor-pointer"></i>
        <ul className="hidden md:flex overflow-x-hidden mr-10 font-semibold">
            <li className="mr-6 p-1 border-b-2 border-orange-500">
                <a className="text-blue-200 cursor-default" href="#">Home</a>
            </li>
            <li className="mr-6 p-1">
                <a className="text-white hover:text-blue-300" href="#">Services</a>
            </li>
            <li className="mr-6 p-1">
                <a className="text-white hover:text-blue-300" href="#">Projects</a>
            </li>
            <li className="mr-6 p-1">
                <a className="text-white hover:text-blue-300" href="#">Team</a>
            </li>
            <li className="mr-6 p-1">
                <a className="text-white hover:text-blue-300" href="#">About</a>
            </li>
            <li className="mr-6 p-1">
                <a className="text-white hover:text-blue-300" href="#">Contacts</a>
            </li>
        </ul>
    </div>
);

export default Demo;
```
Đây có thể nói là một đặc điểm riêng biệt mà mình thích nhất ở framework này, tại vì nó giúp mình sử dụng được những class built-in của framework trong một class mới, trông code chúng ta gọn gàng hơn rất là nhiều. Nếu dùng Bootstrap thì mình sẽ phải viết hết tất cả các class built-in của framework mà mình cần vào thẻ đó, như thế nhìn code front-end mình trông nó không gọn tí nào cả.

Tiếp theo đó chính là bạn có thể generate `responsive`, `hover`, `focus`, `active`, `group-hover`các class này bằng cách chúng ta sẽ viết trong file css , wrap chúng bằng `@variants`

Ví dụ 
```CSS
/* Input */
@variants hover, focus {
  .banana {
    color: yellow;
  }
}

/* Output */
.banana {
  color: yellow;
}
.hover\:banana:hover {
  color: yellow;
}
.focus\:banana:focus {
  color: yellow;
}
```
Viết 1 mà sinh ra được nhiều thứ như này, thật ngắn gọn mà lại mang lại hiệu quả đúng ko các bạn.

Tiếp theo đến `responsive` nó cũng tương tự như vậy
```CSS
.bg-gradient-brand {
  background-image: linear-gradient(blue, green);
}

/* ... */

@media (min-width: 640px) {
  .sm\:bg-gradient-brand {
    background-image: linear-gradient(blue, green);
  }
  /* ... */
}

@media  (min-width: 768px) {
  .md\:bg-gradient-brand {
    background-image: linear-gradient(blue, green);
  }
  /* ... */
}

@media (min-width: 1024px) {
  .lg\:bg-gradient-brand {
    background-image: linear-gradient(blue, green);
  }
  /* ... */
}

@media (min-width: 1280px) {
  .xl\:bg-gradient-brand {
    background-image: linear-gradient(blue, green);
  }
  /* ... */
}
```

Sử dụng phương thức `theme()` để các bạn có thể truy cập là lấy ra giá trị trong `Tailwind config`. Ví dụ bạn có file `tailwind.config.js` như sau :
```Javascript
module.exports = {
  important: true,
  theme: {
    screens: {
      vs: '320px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1600px',
    },
    extend: {},
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '8xl': '6rem',
      '9xl': '7rem',
      '10xl': '8rem',
      '11xl': '9rem',
    },
  },
  variants: {},
  plugins: [],
}
```

Bây giờ các bạn có file css như sau 
```CSS
.btn-blue {
  font-size: theme('fontSize.11xl');
}
```
Thật dễ dàng đúng ko nào các bạn.
# Custom your design
Trong project nextjs,  chúng ta sẽ tạo một file `tailwind.config.js` với nội dung như sau:
```Javascript
module.exports = {
  important: true,
  theme: {
    screens: {
      vs: '320px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1600px',
    },
    extend: {},
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '8xl': '6rem',
      '9xl': '7rem',
      '10xl': '8rem',
      '11xl': '9rem',
    },
  },
  variants: {},
  plugins: [],
}

```
Ví dụ ở trên mình custome lại các kích cở của màn hình, fontSize các thứ . Tương tự các bạn muốn custome font-family thì các bạn chỉ việc thêm vào file này thôi
```Javascript
module.exports = {
  important: true,
  theme: {
    screens: {
      vs: '320px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1600px',
    },
    extend: {},
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '8xl': '6rem',
      '9xl': '7rem',
      '10xl': '8rem',
      '11xl': '9rem',
    },
    fontFamily: {
      display: ['Gilroy', 'sans-serif'],
      body: ['Graphik', 'sans-serif'],
    },
    
  },
  variants: {},
  plugins: [],
}
```
Dễ như ăn kẹo đúng không các bạn :)))

# Pseudo-Class Variants
Đây là một điểm mình rất thích ở framework CSS này bởi vì chúng ta có thể viết class cho các sự kiện `hover, focus, active, disabled, visited, first-child, last-child, odd-child, even-child, focus-within, ` cho các thẻ.

Ví như 
```Javascript
<form>
  <input class="bg-gray-200 hover:bg-white hover:border-gray-300 focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 ...">
  <button class="bg-teal-500 hover:bg-teal-600 focus:outline-none focus:shadow-outline ...">
    Sign Up
  </button>
</form>
```

Đoạn code trên là chúng ta tạo ra 1 ô input với nút Sign up, thay vì phải viết css dài dướm dà chúng ta thêm tiền tố `hover, focus` vào trước class thôi là chúng ta đã có thể thực hiện thay đổi style khi hover hoặc focus vào thẻ html. Các bạn tham khảo thêm các ví dụ [tại đây](https://tailwindcss.com/docs/pseudo-class-variants)
# Kết luận
Vậy qua đó, qua một vài những tìm hiểu của mình về `Tailwind CSS` ở trên cũng giúp các bạn phần nào mường tượng ra nó là cái gì, nó sử dụng như thế nào, một vài các dặc điểm đặc trung của nó ra sao. Mong rằng qua bài viết này của mình các bạn có thể dùng và áp dụng chúng vào các project các bạn đang làm. Cảm ơn các bạn đã đọc bài viết của mình.
# Tham khảo
https://tailwindcss.com/