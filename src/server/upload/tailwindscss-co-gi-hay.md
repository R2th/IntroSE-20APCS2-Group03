## 1. Mở đầu
<hr>

Đổi với các bạn làm việc bên phía front-end hoặc thậm chí cả back-end thì cái tên `Bootstrap` không còn xa lạ gì với chúng ta. Đây là một trong những framework nổi tiếng hỗ trợ chúng ta trong việc style cho trang web của chúng ta. Framework này cũng đã gắn bó với mình trong rất nhiều các dự án khác nhau cho đến gần đây mình thấy có một cái tên khác bắt đầu được nổi lên đó là `TailwindCSS` và mình đã có cơ hội để thử sử dụng nó trong dự án mình tham gia. Trong bài viết này mình sẽ chia sẻ với các bạn về những trải nghiệm của mình với nó.

## 2. TailwindCSS
<hr>

### a. Ultility First

Nếu bạn đã từng dùng `Bootstrap` thì chắc hẳn sẽ nhận ra phần này:


![](https://images.viblo.asia/f39e336a-9f5b-4b11-be0f-9cce24b6b4ec.png)

```index.html
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
```

Sở dĩ các button nói trên có giao diện như vậy vì phần style với css của nó đã được Bootstrap viết sẵn vào các class có tên là `btn`, `btn-primary`, ... . Chi tiết khi bạn nhìn nó sẽ có dạng như sau:

```bootstrap.css
.btn {
    display: inline-block;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color 
        .15s ease-in-out,border-color 
        .15s ease-in-out,box-shadow 
        .15s ease-in-out;
}
```

Và một cái button được style đầy đủ như nói trên được gọi là 1 components. Bạn có thể tìm thấy rất nhiều các components khác mà Boostrap đã định nghĩa sẵn ở [đây](https://getbootstrap.com/docs/5.0/components/buttons/). Quay lại với Tailwindcss, nếu bạn truy cập vào docs của nó sẽ không có một mục nào là **Components** giống như Bootstrap vì ở đây thay vì tạo sẵn ra các components cho user thì Tailwindcss chỉ tập chung vào việc phát triển các helper class để giúp đỡ người dùng trong quá trình style cho trang web của mình. Đơn giản hơn bạn có thể hiểu như sau:

![](https://images.viblo.asia/aaaa0e9e-cb77-485e-b5e0-a614beeefa1e.png)

Nếu Bootstrap cung cấp cho bạn luôn 1 class là `.btn` với rất nhiều style khác nhau sẵn thì Tailwindcss chỉ cung cấp cho bạn các class tương ứng chỉ bằng với 1,2 dòng code css và bọc nó lại vào một class với tên tương tự là `.inline-block`, `.text-center`, `.text-blue-100` như hình minh họa ở trên. Đây giống như một bộ lego với nhiều mảnh ghép khác nhau và việc của bạn là kết hợp các mảnh ghép này để tạo ra bất cứ thứ gì bạn mong muốn.

![](https://images.viblo.asia/d23573f6-185e-4763-9284-c7d268619c09.jpg)

Chính vì thế Tailwindcss còn được biết đến với phong cách **Ultility first**.

### b. Try tailwindcss

Một điểm mà mình ưa thích ở Tailwindcss là nó có luôn cả document hướng dẫn setup cho một số framework backend hoặc front-end khác mà mình thường dùng:

![](https://images.viblo.asia/3ed32f8f-f4fc-4d5a-b7dd-58e3d591326e.png)

Nếu bạn đơn giản muốn trải nghiệm thử thì có thể dùng thử Tailwindcss online ngay tại link [đây](https://play.tailwindcss.com/) hoặc nếu muốn thử nghiệm nhiều thứ hơn thì bạn có thể clone [repo này](https://github.com/dqhuy78/try-tailwindcss) của mình về và sử dụng.

Để dùng Tailwindcss thì công việc của bạn vô cùng đơn giản, thay vì phải ngồi code một đống code để thu được giao diện như này:

![](https://images.viblo.asia/55d5832e-260a-4f3e-8207-7f38d048b983.png)


```index.html
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>

<style>
  .chat-notification {
    display: flex;
    max-width: 24rem;
    margin: 0 auto;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #fff;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  .chat-notification-logo-wrapper {
    flex-shrink: 0;
  }
  .chat-notification-logo {
    height: 3rem;
    width: 3rem;
  }
  .chat-notification-content {
    margin-left: 1.5rem;
    padding-top: 0.25rem;
  }
  .chat-notification-title {
    color: #1a202c;
    font-size: 1.25rem;
    line-height: 1.25;
  }
  .chat-notification-message {
    color: #718096;
    font-size: 1rem;
    line-height: 1.5;
  }
</style>
```

Thì việc của bạn cần làm là hình dung ra những style mà mình cần thêm vào đoạn code html sau đó vào trong docs của Tailwind để tìm xem style đó sẽ có class tên là gì và sau đó copy paste vào code của bạn và kết quả sẽ như sau:

```index.html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
```

Nếu mới lần đầu sử dụng, việc phải qua docs để copy & paste có thể làm bạn cảm thấy không thoải mái và bất tiện vì có thể bạn code tay sẽ nhanh hơn dùng Tailwind. Tuy nhiên nếu bạn cho nó thời gian bạn sẽ tự nhớ được các class hay dùng và sau đấy việc style cho web của bạn sẽ trở nên nhanh chóng và tiện lợi hơn rất nhiều so với tự code thuần. Bản thân mình khi mới tiếp cận cũng mất một chút thời gian cho việc nhớ được các class nhưng sau vài hôm dùng mình đã nhớ đủ để code được hầu hết các giao diện trong công việc và thêm nữa các class của nó cũng dễ nhớ do nó tương tự như nội dung css của nó luôn.

### c. State & Selector

Ngoài việc hỗ trợ chúng ta trong việc style các element trên trang web của chúng ta bằng các css tĩnh như mình mới nói ở trên thì Tailwind còn cung cấp cho chúng ta thêm phương pháp dễ dàng để style cả các trạng thái như hover, focus, ... hay cả các selector như `first-child`, `last-child` với cú pháp như sau:
```index.html
<button class="bg-red-500 hover:bg-red-700 ...">
  Hover me
</button>
```

Bạn để ý ở đây ngoài màu nền là `bg-red-500`, button của chúng ta có thêm một class là `hover:bg-red-700` có nghĩa là khi chúng ta hover chuột vào button thì nó sẽ đổi giữa hai màu đỏ nói trên:

![](https://images.viblo.asia/80939ef8-528c-42a4-8b74-ea09b076ed97.gif)

Tương tự bạn có thể thêm style cho trạng thái hover của bất cứ element nào khác mà bạn muốn như ví dụ như thẻ `<p>`:

```index.html
<p class="text-blue-700 text-2xl p-2 hover:bg-yellow-400">
    Welcome to Tailwinds CSC
</p>
```

![](https://images.viblo.asia/b45b7174-8b7c-459f-9f92-88cf9ca6f81a.gif)



Ngoài ra còn một số trạng thái khác như `focus`, `active`, `disabled`, `checked`, ... thì bạn có thể tham khảo tiếp ở [đây](https://tailwindcss.com/docs/hover-focus-and-other-states#focus). Không chỉ hỗ  trợ chúng ta trong việc thêm trạng thái cho các element mà Tailwind còn cung cấp cho chúng ta thêm một số loại selector phổ biến là `first-child`, `last-child`, `odd-child` và `even-child`. Tên của mỗi class đã nói lên sẵn công dụng mà chúng đem rồi nên ở đây mình sẽ không giải thích  thêm. Với cá nhân mình thì mình rất hay sử dụng `last-child` vì trong rất nhiều màn hình mình làm sẽ có các UI dạng danh sách mà ở đó mỗi phần tử sẽ có `margin-bottom` với nhau một khoảng nhất định. Tuy nhiên phần tử cuối cùng thông thường sẽ có `margin-bottom: 0` và với Tailwind ta sẽ viết như này:
```index.html
<template>
    <ul>
        <li v-for="item in list" :key+="item.id" class="pl-2 pr-1 py-2 mb-4 last:mb-0">
            {{ item.name }}
        </li>
    </ul>
</template>
```
Với đoạn code như trên thì toàn bộ các item trong danh sách của bạn sẽ có `margin-bottom` với nhau là 16px (sizing default của Tailwind) nhưng riêng phần tử cuối sẽ có `margin-bottom: 0` bằng class `last:mb-0`. Các class như `last`, `hover` ở đây được Tailwind gọi là các `variants`.

### d. Responsive

Đối với các trang web hiện tại thì việc responsive là viêc không thể thiếu được và với Tailwind, ta có thể làm được điều này một cách dễ dàng bằng cách sử dụng `variants` tương ứng với các breakpoint thông thường là:

![](https://images.viblo.asia/92d74d83-22e7-4ce1-ad3e-53393f77c0ab.png)

Về cách sử dụng thì giống như cách mà chúng ta thêm thêm state vào các element hoặc sử dụng các selector như ở mục trước. Để hiểu rõ hơn thì các bạn có thể nhìn ví dụ như sau:

```index.html
<div class="mt-10 mx-2 pb-4 rounded shadow md:flex md:pb-0">
    <img src="img/st.ojpeg" class="rounded-t w-full h-auto md:w-64"/>
    <p class="mt-4 px-4 text-purple-700 font-bold">Responsive</p>
</div>
```

Ban đầu giao diện của chúng ta sẽ có dạng như sau ở màn mobile:

![](https://images.viblo.asia/46f50df7-cb8e-4642-b5d6-ab50049e59fd.png)

Sua đó mình đã thêm một số class mới là `md:flex, md:pb-0, md:w-64` để thay đổi giao diện như trên về như thể này khi min-width là 768 (md):

![](https://images.viblo.asia/1114d043-7dd1-4d67-9936-69da9fe3c6b0.png)

Ở cỡ màn hình có chiều rộng tối thiêu là 768px mình đã làm cho thẻ `<p>` và thẻ `<img>` nằm cạnh nhau đồng thời giới hạn chiệu rộng tối đa cho ảnh với class là `w-64`. Đó là toàn bộ những gì bạn cần làm để có thể sử dụn tính năng responsive này. Ngoài ra, bạn cũng có thể tự định nghĩa các breakpoint khác theo ý muốn bằng cách sửa đổi file `tailwin.config.js`. Chi tiết bạn có thể xem tại [đây](https://tailwindcss.com/docs/responsive-design#customizing-breakpoints).

### e. Basic custom

Ngoài việc cung cấp sẵn cho chúng ta các helper class để sử dụng, Tailwind còn cho phép chúng ta chỉnh sửa hoặc thêm mới các class để phù hợp với Style Guide của chúng ta. Giả sử mình không muốn sử dụng các mã màu có sẵn của Tailwind như `text-blue-200`, ... thì mình có thể vào file `tailwind.config.js` và thêm màu của riêng mình như sau:

```tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#f20"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
```

Sau đó trong code của mình có thể dùng luôn tất cả các class có thể gắn màu như text, background, ... như sau:
```index.html
<div class="flex w-full h-screen items-center justify-center">
    <p class="text-primary text-2xl hover:text-white hover:bg-primary">
        Welcome to Tailwinds CSS
    </p>
</div>
```

Và đây là kết quả chúng ta thu được:

![](https://images.viblo.asia/66cf2829-99ee-4d46-9d07-04e471245909.gif)

Tương tự bạn có thể custom hoặc thêm mới vô vàn các class khác nhau như `spacing` dùng cho margin, padding, `min-width`, `max-width`, ... . Về chi tiết mình sẽ không nhắc đến ở đây mà để các bạn tự khám phá tại docs của Tailwind.

### f. Theme function

Thêm một điểm nữa khá hay khi dùng Tailwind là giả sử bạn custom bằng cách thêm 2 mã màu như sau vào file config của Tailwind:
```tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#f20",
        secondary: "#333"
      }
    },
  },
}
```
Sau đó bạn có một file css riêng import vào một số component class mà bạn viết sẵn như sau:
```index.html
<div class="flex w-full h-screen items-center justify-center">
        <p class="text-primary text-2xl hover:text-white hover:bg-primary p-2">
            Welcome to <span class="main-text">Tailwinds CSS</span>
        </p>
    </div>
```

```main.css
.main-text {
    color: #333;
}
```
Và đây là kết quả thu được:

![](https://images.viblo.asia/093f1b4d-df5e-4f6d-b41b-ec945b1ac5a2.png)

Tuy nhiên nếu ta viết màu trực tiếp như nói trên và thực tế ta sẽ phải tái sử dụng mã màu nó ở rất nhiều chỗ trong project của chúng ta thì việc viết trực tiếp như trên sẽ không hay lắm. Thay vào đó, trong file css chúng ta có thể viết như sau:
```main.css
.main-text {
    color: theme('colors.secondary');
}
```
Và ta sẽ thu được kết quả như mong muốn ban đầu. Ở đây Tailwind cung cấp cho chúng ta thêm một function đặc biệt là `theme()` cho phép chúng ta lấy các giá trị mà ta thêm trong file `tailwind.config.js` ra để sử dụng trong file js. Tham số truyền vào cho hàm `theme` này bạn có thể hiểu rằng nó giống như đường dẫn trong đến vị trí của màu đó trong file config vậy:
```tailwind.config.js
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#f20",
        secondary: "#333" // => theme('colors.secondary')
      }
    },
  },
}
```

### g. Production build

Cuối cùng, khi chúng ta đã hoàn thiện phần code UI của chúng ta và muốn build thành bản production thì Tailwind còn hỗ trợ chúng ta tối ưu lại phần css chúng ta đã sử dụng trong dự án. Giả sử ta không thêm gì trong file config và chạy lệnh:
```
yarn build
```
Thì ta sẽ thu được một folder `dist` và trong đó khi bạn mở file `index.css` lên sẽ thấy như sau:

![](https://images.viblo.asia/4005c3e6-b60a-469c-b5e9-d5e5bc3a4815.png)

Và log ở phần chạy command ta sẽ thấy được file size của chúng ta đang khá lớn, hơn 3Mb:

![](https://images.viblo.asia/3f3bf14c-8944-46af-b7c9-7a5c3a31636b.png)


Điều này không tốt chút nào vì nó sẽ làm web của bạn load chậm hơn do cần tải một file css lớn và đồng thời trên thực tế ta hầu như ít khi dùng hết toàn bộ class mà Tailwind cung cấp mà chỉ một phần mà thôi. Để làm điều này thì Tailwind cung cấp cho chúng ta phương pháp config đơn giản để loại bỏ những class mà chúng ta không dùng đến như sau:

```tailwind.config.js
module.exports = {
  purge: [
    "./index.html"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#f20",
        secondary: "#333"
      }
    },
  },
}
```
Ở trong mục `purge`, ta sẽ khai báo tên những class mà ta sử dụng Tailwind và dựa vào đây khi build lên thì các class mà chúng ta không dùng đến trong các file được khai báo ở đây sẽ bị loại bỏ khỏi production build. Chạy lại build một lần nữa và đây là kết quả ta thu được:

![](https://images.viblo.asia/519aa251-81cb-4155-b27f-11369f182f2f.png)

FIle của chúng ta lúc này chỉ còn có `4.01Kb` thay vì `3Mb` như ban đầu. Lưu ý ở phần `purge` này bạn hoàn toàn có thể khai báo theo dạng partern như sau:
```tailwind.config.js
purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
```

## 3. Kết bài
<hr>

Bài viết của mình đến đây là kết thúc, mong rằng nó sẽ giúp đỡ bạn phần nào nếu bạn quyết định thử sức với Tailwind. Nếu bạn có bất cứ thắc mắc gì hãy comment ngay ở phía dưới cho mình biết và cũng đừng quên để lại một upvote để ủng hộ mình nhé.