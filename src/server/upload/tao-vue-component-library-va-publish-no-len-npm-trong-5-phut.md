# Mở đầu
Chào các bạn, từ trước đến giờ mỗi khi code chức năng gì đó chắc hẳn việc đầu tiên mình đều nghĩ đến có thư viện nào hỗ trợ việc đó không và lao ngay lên https://www.npmjs.com search thử. Việc sử dụng thư viện có sẵn giúp mình tiết kiệm được rất nhiều thời gian và công sức khi code. Vừa dùng thư viện mình vừa nghĩ cảm ơn công động đã tạo ra thư viện awesome này giúp mình khá nhiều trong công việc.

![](https://images.viblo.asia/189e21c8-432c-4777-8321-45f409855f3f.jpg)

Rồi mình cũng muốn viết ra 1 cái gì đó đơn giản để dùng được về sau. Và giới thiệu cho bạn bè cùng contribute hay đơn giản là cho bạn bè dùng thử và ném đá thư viện của mình cũng được. Cảm giác được thấy ai đó npm install thư viện của mình chắc phê phải biết.  Mơ mộng thế thôi chứ giờ mình mới tìm hiểu để viết 1 component library
# Tạo component library
Để tạo 1 component library mình dùng package `vue-sfc-rollup` . Package giúp  tạo ra Vue Single File Component (SFC) hoặc library of multiple SFCs 1 cách nhanh chóng

Chi tiết các bạn có thể xem qua tại đây https://github.com/team-innovation/vue-sfc-rollup

Đầu tiên install package về:
```shell
npm install -g vue-sfc-rollup
```

Tiếp theo chạy lệnh:
```shell
sfc-init
```
Để tạo ra 1 Single File Component (SFC). Đừng quên chọn các tùy chọn

```sql
Is this a single component or a library? Library
What is the npm name of your library? sprite-to-gif (Đây là tiên thư viện)
Will this library be written in JavaScript or TypeScript? JavaScript (Chọn dùng JavaScript hay TypeScript)
Enter a location to save the library files (Đường dẫn đến thư mục bạn muốn lưu)
```

Sau setup xong mình sẽ có file package.json như thế này

```json
{
  "name": "sprite-to-gif",
  "version": "1.0.0",
  "description": "",
  "main": "dist/sprite-to-gif.ssr.js",
  "browser": "dist/sprite-to-gif.esm.js",
  "module": "dist/sprite-to-gif.esm.js",
  "unpkg": "dist/sprite-to-gif.min.js",
  "files": [
    "dist/*",
    "src/**/*.vue"
  ],
  "scripts": {
    "serve": "vue-cli-service serve dev/serve.js",
    "build": "cross-env NODE_ENV=production rollup --config build/rollup.config.js",
    "build:ssr": "cross-env NODE_ENV=production rollup --config build/rollup.config.js --format cjs",
    "build:es": "cross-env NODE_ENV=production rollup --config build/rollup.config.js --format es",
    "build:unpkg": "cross-env NODE_ENV=production rollup --config build/rollup.config.js --format iife"
  },
  "dependencies": {},
  "devDependencies": {
    "@babel/core": "^7.9.0",
    "@babel/preset-env": "^7.9.5",
    "@rollup/plugin-alias": "^2.2.0",
    "@rollup/plugin-commonjs": "^11.1.0",
    "@rollup/plugin-replace": "^2.3.2",
    "@vue/cli-plugin-babel": "^4.3.1",
    "@vue/cli-service": "^4.3.1",
    "cross-env": "^7.0.2",
    "minimist": "^1.2.5",
    "rollup": "^2.7.3",
    "rollup-plugin-babel": "^4.4.0",
    "rollup-plugin-terser": "^5.3.0",
    "rollup-plugin-vue": "^5.1.6",
    "vue": "^2.6.11",
    "vue-template-compiler": "^2.6.11"
  },
  "peerDependencies": {
    "vue": "^2.6.11"
  },
  "engines": {
    "node": ">=10"
  },
```

Cd vào forder và chạy lệnh npm install để cài đặt các package cần thiết
```shell
cd path/to/my-component-or-lib

npm install
```
Tiếp theo chạy lệnh `npm run serve`. Và truy cập vào  http://localhost:8080/ để xem component của mình.

![](https://images.viblo.asia/85df85cd-6752-4c31-847b-d2051786d458.png)

Vậy là đã setup thành công. đây là component mẫu của package

Tiếp theo là nghĩ ý tưởng xem component của mình phục vụ cho mục đích gì và code nó thôi.Thì trước mình có viết 1 bài viblo về việc [biến ảnh sprites thành ảnh động với vue](https://viblo.asia/p/bien-anh-sprites-thanh-anh-dong-voi-vuejs-ByEZkGQWZQ0)  Các bạn có thể xem qua. Bài đó đã có code component rồi. nên mình chỉ đem bỏ vào file trong thư mục Src/lib-components là được. Và mình đặt tên component của mình là `sprite-to-gif` nhé

```javascript:Src/lib-components/sprite-to-gif.vue
<template>
  <div :style="style">
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    height: Number,
    width: Number,
    loop: Number,
    frame: Number,
    max: Number,
    column: Number,
    row: Number,
  },
  mounted() {
    this.play()
  },
  data(){
    return {
      style: {
        width: this.width + 'px',
        height: this.height + 'px',
        background: `url(${this.image})`,
        backgroundSize: `${this.width * this.column}px ${this.height * this.row}px`,
        backgroundPosition: '0px 0px'
      }
    }
  },

  methods: {
    play() {
      let i = 0
      let position = {
        x: 0,
        y: 0,
        loop: 0,
      }
      const playTimer = setInterval(() => {
        i++;
        if(i % this.column) {
          position.x -= this.width; 
        } else {
          position.y -= this.height; 
          position.x = 0;
        }
        if (i == this.max) {
          i = 0
          position.y = 0; 
          position.x = 0;
          position.loop++;
          if(position.loop >= this.loop) {
            clearInterval(playTimer)
          }
        }

        this.$set(this.style, 'backgroundPosition', `${position.x}px ${position.y}px`)
      }, 1000/this.frame);
    }
  }
}
</script>
```

Vậy là xong. Để test component của mình thì mình tìm đến file `sprite-to-gif/dev/serve.vue`

```html:sprite-to-gif/dev/serve.vue
<script>
import Vue from 'vue';
import { SpriteToGif } from '@/entry';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    SpriteToGif,
  }
});
</script>

<template>
  <div id="app">
    <sprite-to-gif 
      image="https://images.viblo.asia/a28b8126-1298-4ca7-a507-53865b32238d.png"
      :width="100"
      :height="100"
      :column="7"
      :row="4"
      :max="27"
      :frame="20"
      :loop="10"
    />
  </div>
</template>

```

Truy cập http://localhost:8080/ để xem thành quả

![](https://images.viblo.asia/69d02ea2-183a-4094-aed3-fd6eee778ac0.gif)

Vậy là từ ảnh này mình đã biến nó thành động như kia rồi ![](https://images.viblo.asia/a28b8126-1298-4ca7-a507-53865b32238d.png)

Giờ publish lên npm để mọi người trên toàn thế giới có thể dùng component của mình thôi :)

# Publish lên npm
Đầu tiên chạy lệnh build
```php
npm run build
```
Tiếp theo mình sẽ chạy lệnh để thêm tài khoản npm của mình vào. Các bạn có thể đăng ký tài khoản của mình ở https://www.npmjs.com/signup
```sql
npm adduser
```
Cuối cùng chạy lệnh để publish thư viện của mình
```php
npm publish
```

Vậy là component của mình đã được publish tại đây : https://www.npmjs.com/package/sprite-to-gif

Giờ chỉ cần 1 lệnh đơn giản là bạn có thể có component của mình rồi:
```sql
npm i sprite-to-gif
```

![](https://images.viblo.asia/444454dc-85ee-4e55-9f0a-4310d97e7f2d.gif)


 Mà chưa xong. Mình phải viết doc cho component nữa (Cái này để sau vậy) 

 Push thư viện mình vừa viết lên github: https://github.com/phamtuananh1996/sprite-to-gif


# Tổng kết

Vậy là mình đã viết và publish component thành công lên npm 1 cách nhanh chóng và đơn giản.
Hy vọng sau bài này nếu bạn có 1 chức năng gì đó hay. Đừng để nó dưới máy rồi lẵng quên nó mà hãy push nó lên npm để mọi người cùng sử dụng Và github để lưu trữ cũng như để mọi người cùng contribute

Hẹn các bạn vào các bài viết tiếp theo, nếu hay các upvote và comment gạch đá nhiệt tình nhé.

Đọc thêm nhiều bài viết của mình ở đây https://phamtuananh1996.github.io