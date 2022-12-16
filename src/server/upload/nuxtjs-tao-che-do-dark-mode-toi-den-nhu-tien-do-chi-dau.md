# Lời mở đầu
Với tình trạng người người dùng Darkmode, nhà nhà dùng Darkmode như hiện nay thì chắc mọi người cũng không còn quá xa lạ với khái niệm này rồi nhỉ :grinning:

Chế độ nền tối (dark mode) giúp bạn thay đổi chủ đề (nền) hiển thị của ứng dụng/hệ điều hành sang màu màu tối (đen, xanh thẫm, xanh đen, xám…), thay cho màu trắng/sáng thường thấy. Chế độ này được đánh giá là đem lại trải nghiệm tốt hơn, mang lại lợi ích cho sức khỏe và độ bền thiết bị của người dùng. Nhiều nhà phát triển thậm chí còn khuyên người dùng chuyển sang sử dụng hoàn toàn chế độ nền tối nếu có thể, vì những ưu điểm tuyệt vời mà nó mang lại. Bản thân mình cũng luôn sử dụng Darkmode cho toàn bộ các ứng dụng trên máy tính cũng như điện thoại =))

Giờ thì hãy cùng mình làm thử một demo nho nhỏ về chế độ Darkmode với Nuxtjs nhé :muscle:

# Bắt tay vào làm thôi

NuxtJs đã có sẵn `@nuxtjs/color-mode` module là một cách hay để thêm chế độ tối vào trang web của chúng ta. Nó còn có thể tự động phát hiện chế độ màu hệ thống để bạn không phải thay đổi màu theo cách thủ công nữa.

Cài đặt module `@nuxtjs/color-mode` với dòng lệnh sau:

```
npm add -D @nuxtjs/color-mode
```

Sau đó, bạn cần thêm module vào phần buildModules của tệp nuxt.config.js của bạn.

```
export default {
  buildModules: ['@nuxtjs/color-mode']
}
```

Bây giờ chsung ta cần thêm một số style css vào các mode class của mình. Hãy thêm tệp `main.css` vào thư mục assets. Ở đây mình sẽ sử dụng các biến CSS để đặt màu gốc sẽ là chế độ sáng và sau đó đặt màu cho chế độ tối nữa:

``` bash:main.css
:root {
  --color: #243746;
  --color-primary: #158876;
  --color-secondary: #0e2233;
  --bg: #f3f5f4;
  --bg-secondary: #fff;
  --border-color: #ddd;
}

.dark-mode {
  --color: #ebf4f1;
  --color-primary: #41b38a;
  --color-secondary: #fdf9f3;
  --bg: #091a28;
  --bg-secondary: #071521;
  --border-color: #0d2538;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--bg);
  color: var(--color);
  transition: background-color 0.3s;
}
a {
  color: var(--color-primary);
}
```

Và để sử dụng được tệp CSS này trong ứng dụng của mình thì hãy nhớ là cần đăng ký tệp đó trong nuxt.config.js nhé :v: 

Giờ thì thử bật dev tools lên xem nào:

![](https://images.viblo.asia/add6930a-dd6d-42be-8603-eae6d2d79047.gif)


Cơ bản Darkmode là như vậy thui :v Nhưng giờ chúng ta cần tạo một trình chuyển đổi chế độ màu để người dùng của chúng ta có thể nhanh chóng thay đổi từ màu này sang màu khác một cách chuyên nghiệp hơn.

Giờ thì tạo component ColorMode và chúng ta có thể thêm một danh sách các màu. Hiện tại, mình in ra lists các màu với v-for:

``` bash:components/ColorMode.vue
<template>
  <div>
    <ul>
      <li v-for="color of colors" :key="color">
        {{ color }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colors: ['system', 'light', 'dark']
    }
  }
}
</script>

```

Sau đó thì import component này vào page index và mình sửa lại nó một chút như sau:

``` bash:pages/index.vue
<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        darkmode-app
      </h1>
      <ColorMode />
    </div>
  </div>
</template>

<script>
import ColorMode from '~/components/ColorMode.vue';

export default {
  components: {
    ColorMode,
  }
}
</script>
```

Việc cần làm bây giờ là xử lý sự kiện để khi nhấp chuột thì giao diện sẽ thay đổi tương ứng với mode. Khi đã có module `@nuxtjs/color-mode` thì điều này trở nên rất đơn giản, việc cần làm chỉ là sử dụng helper `$colorMode` mà chúng ta có được với module color-mode. Khi người dùng nhấp vào `$colorMode.preference` sẽ được đặt thành màu đến từ data của chúng ta:

```
<template>
  <div>
    <ul>
      <li
        v-for="color of colors"
        :key="color"
        @click="$colorMode.preference = color"
      >
        {{ color }}
      </li>
    </ul>
  </div>
</template>
```

Kết quả thu được sẽ như sau:

![](https://images.viblo.asia/8bad2034-cbe5-4df7-bee2-ed38a63a59b7.gif)

Vậy là cũng hòm hòm rồi nhỉ, cơ mà nhìn hơi tù, làm cho nó xịn xò hơn với việc thay đổi những dòng text kia bằng icon thì ổn hơn. Mình sẽ sử dụng các biểu tượng như một component và để làm điều đó, chúng ta sẽ sử dụng module `@nuxtjs/svg` cho phép ta nhập tệp .svg theo nhiều cách tùy thuộc vào truy vấn tài nguyên mà ta cung cấp.

```
// install module
yarn add --dev @nuxtjs/svg

// Config to nuxt.config.js
buildModules: [
  '@nuxtjs/svg', 
  '@nuxtjs/color-mode'
]
```

Bây giờ chúng ta có thể nhập các biểu tượng svg này dưới dạng các thành phần bằng cách sử dụng truy vấn ?inline để chúng được imported dưới dạng svg inline.

```
<script>
import IconSystem from '~/assets/icons/system.svg?inline';
import IconLight from '~/assets/icons/light.svg?inline';
import IconDark from '~/assets/icons/dark.svg?inline';

export default {
  components: {
    IconSystem,
    IconLight,
    IconDark
  },
  ...
```

Bây giờ chúng ta có thể sử dụng một dynamic component để kiểm tra biểu tượng sẽ hiển thị tùy thuộc vào màu sắc trong data của chúng ta. Component này sẽ thay thế `{{ color }}`, đồng thời chúng ta cũng cần chuyển sự kiện nhấp chuột từ `<li>` sang component này:

```
<li v-for="color of colors" :key="color">
    <component
        :is="`icon-${color}`"
        @click="$colorMode.preference = color"
    />
</li>
```

Cuối cùng chỉ cần style lại cho icon 1 chút để trông chuyên nghiệp hơn. Chúng ta sẽ thấy rằng các svg của có class là feather, vì vậy chúng ta có thể sử dụng class này để tạo style cho nó:

``` bash:components/ColorMode.vue
<style>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul li {
  display: inline-block;
  padding: 5px;
}

.feather {
  position: relative;
  cursor: pointer;
  background-color: var(--bg-secondary);
  border: 0px solid var(--border-color);
  border-radius: 5px;
  transition: all 0.1s ease;
}
.feather:hover {
  top: -3px;
}
.feather.preferred {
  border-color: var(--color-primary);
  top: -3px;
}
.feather.selected {
  color: var(--color-primary);
}
</style>
```

# Cùng xem thành quả của chúng ta:

![](https://images.viblo.asia/49cc330e-de0b-48cc-bc05-43dbed576989.gif)

Với sự trợ giúp của `@nuxtjs/color-mode` module thì việc tạo ra ứng dụng có darkmode là cực kì đơn giản, thậm chí có thể là vô số các mode màu 7 sắc cầu vồng nữa cơ :D nhưng việc này là tùy ý định của mỗi người nên ở đây mình chỉ làm demo nho nhỏ darkmode này thôi :D

Cảm ơn mọi người đã theo dõi bài viết này, mình mong sẽ nhận được vote và nhận xét của mọi người để nâng cao khả năng của bản thân hơn, hãy follow để theo dõi các bài viết khác của mình nhé! (bow)