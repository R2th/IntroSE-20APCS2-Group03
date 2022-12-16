# Giới thiệu
Chào mọi người, như mọi người cũng đã biết thì hiển thị và trình chiếu hình ảnh là một phần không thể thiếu của các ứng dụng website, đặc biệt là các ứng dụng tin tức, blog, du lịch,... Với Html, Css, Js thì bạn có thể tạo các trình chiếu hình ảnh này một cách dễ dàng. Tuy nhiên như vậy thì sẽ tốn kha khá thời gian, vì vậy nhiều thư viện ra đời hỗ trợ cho các lập trình viên trong việc trình chiếu hình ảnh một cách đơn giản, nhanh chóng, dễ dàng hơn.

Bạn cũng có thể sử dụng các thư viện đó trong các ứng dụng `VueJs`. Tuy nhiên, `VueJs` cũng có một package hỗ trợ hiển thị và trình chiếu hình ảnh như vậy, đó là `v-viewer`. Trong bày viết này chúng ta cùng tìm hiểu về nó nhé.
# Cài đặt
### Npm
Bạn cần copy và paste lệnh sau vào terminal để cài đặt `v-viewer`:
```
npm install v-viewer
```
### CDN
Hoặc bạn có thể nhúng trực tiếp các link Cdn dưới đây vào ứng dụng:
```
<link href="//unpkg.com/viewerjs/dist/viewer.css" rel="stylesheet">
<script src="//unpkg.com/viewerjs/dist/viewer.js"></script>
<script src="//unpkg.com/v-viewer/dist/v-viewer.js"></script>
```
# Sử dụng
Để sử dụng `v-viewer`, bạn chỉ cần import và khai báo nó với `Vue`, sau đó bạn có thể sử dụng nó trực tiếp trong các phần tử html với thuộc tính `v-viewer` hoặc sử dụng thông qua component `<viewer>`:
```
<template>
  <div id="app">
    <!-- directive -->
    <div class="images" v-viewer>
      <img src="1.jpg">
      <img src="2.jpg">
      ...
    </div>
    <!-- component -->
    <viewer :images="images">
      <img v-for="src in images" :src="src" :key="src">
    </viewer>
  </div>
</template>
<script>
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'
  import Vue from 'vue'
  Vue.use(Viewer)
  export default {
    data() {
      images: ['1.jpg', '2.jpg']
    }
  }
</script>
```

Ngoài ra, `v-viewer` còn hỗ trợ UMD (sử dụng trực tiếp trong trình duyệt thông qua thẻ `<script>`)
```
<link href="//path/viewer.css" rel="stylesheet">
<script src="//path/vue.js"></script>
<script src="//path/viewer.js"></script>
<script src="//path/v-viewer.js"></script>
...
<script>
  Vue.use(VueViewer.default)
</script>
```
Như mình đã nói ở trên thì `v-viewer` có 2 cách sử dụng đó là sử dụng trực tiếp với các phần tử html (Directive) và sử dụng với các  component mà `v-viewer` cung cấp:
### Directive
Với cách sử dụng này chỉ cần bạn thêm thuộc tính directive `v-viewer` vào bất cứ phần tử html nào thì tất cả các phần tử `<img>` bên trong nó sẽ được xử lý trình chiếu bởi `Viewer`. Bạn còn có thể thêm các tùy chọn khởi tạo với thuộc tính `v-viewer` (vd: `v-viewer="{inline: true}"`) .

Ngoài ra bạn còn có thể lấy và sử dụng các phần tử `viewer` bằng cách sử dụng `query selector` và `el.$viewer`.
```
<template>
  <div id="app">
    <div class="images" v-viewer="{movable: false}">
      <img v-for="src in images" :src="src" :key="src">
    </div>
    <button type="button" @click="show">Show</button>
  </div>
</template>
<script>
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'
  import Vue from 'vue'
  Vue.use(Viewer)
  export default {
    data() {
      images: ['1.jpg', '2.jpg']
    },
    methods: {
      show () {
        const viewer = this.$el.querySelector('.images').$viewer
        viewer.show()
      }
    }
  }
</script>
```

**Direcitve modifiers (static)**: `Viewer` sẽ được render mỗi một lần sau khi binded dữ liệu, Vì vậy nếu dữ liệu hình ảnh bên trong không thay đổi thì bạn nên sử dụng thêm Modifier `static` để tránh việc render lại `viewer` nhiều lần không cần thiết.
```
<div class="images" v-viewer.static="{inline: true}">
  <img v-for="src in images" :src="src" :key="src">
</div>
```
### Component
Với cách sử dụng này thì bạn cần import và đăng ký component của `v-viewer` với `Vue` để sử dụng.
Và bạn có thể sử dụng `Scope slot` để tùy chỉnh việc trình chiếu các hình ảnh của bạn.
Bạn có thể lấy và sử dụng các phần tử `viewer` bằng việc lắng nghe sự kiện `inited` hoặc sử dụng `this.refs.xxx.$viewer`:
```
<template>
  <div id="app">
    <viewer :options="options" :images="images"
            @inited="inited"
            class="viewer" ref="viewer"
    >
      <template slot-scope="scope">
        <img v-for="src in scope.images" :src="src" :key="src">
        {{scope.options}}
      </template>
    </viewer>
    <button type="button" @click="show">Show</button>
  </div>
</template>
<script>
  import 'viewerjs/dist/viewer.css'
  import Viewer from "v-viewer/src/component.vue"
  export default {
    components: {
      Viewer
    },
    data() {
      images: ['1.jpg', '2.jpg']
    },
    methods: {
      inited (viewer) {
        this.$viewer = viewer
      },
      show () {
        this.$viewer.show()
      }
    }
  }
</script>
```
# Options & Methods
`v-viewer` được xây dựng dựa trên [viewer.js](https://github.com/fengyuanchen/viewerjs) nên nó cũng có các option và methods tương tự.
### Options
Bạn có thể thiết lập các tùy chọn cho `viewer` thông qua thuộc tính `v-viewer="{inline: true}"` nếu bạn sử dụng trực tiếp trên các phần tử html, hoặc thông qua thuộc tính `:options="{inline: true}"` nếu bạn sử dụng với component. Một số tùy chọn mà `v-viewer` cung cấp:
* `inline` - Boolean: tùy chọn hiển thị chế độ trình chiếu - chế độ inline (giá trị mặc định là `false` - tức là chế độ modal, `viewer` chỉ hiển thị khi bạn click vào ảnh).
* `button` - Boolean: tùy chọn hiển thị button ở phía trên bên phải của `viewer` (giá trị mặc định là `true`).
* `navbar` - Boolean: tùy chọn hiển thị thanh hình ảnh nhỏ navbar ở phía dưới của `viewer` (giá trị mặc định là `true`). Các giá trị thiết lập của thuộc tính:

    * `0` hoặc `false`: ẩn thanh navbar.
    * `1` hoặc `true`: hiện thanh navbar.
    * `2`: chỉ hiển thị thanh navbar nếu màn hình lớn hơn 768px.  
    * `3`: chỉ hiển thị thanh navbar nếu màn hình lớn hơn 992px.
    * `4`: chỉ hiển thị thanh navbar nếu màn hình lớn hơn 1200px.
* `title` - Boolean, Number, Function, Array: tùy chọn hiển thị tiêu đề của hình ảnh (giá trị mặc định là `true` và nội dung của tiêu đề sẽ được lấy từ thuộc tính `alt` của `<img>`). Các giá trị thiết lập của thuộc tính:

    * `0` hoặc `false`: ẩn tiêu đề.
    * `1` hoặc `true` hoặc `Function` hoặc `Array`: hiển thị tiêu đề.
    * `2`: chỉ hiển thị tiêu đề nếu màn hình lớn hơn 768px.  
    * `3`: chỉ hiển thị tiêu đề nếu màn hình lớn hơn 992px.
    * `4`: chỉ hiển thị tiêu đề nếu màn hình lớn hơn 1200px.
    * `Function`: Tùy chỉnh nội dung của tiêu đề
    * `[Number, Function]`: tham số thứ nhất biểu thị khả năng hiển thị theo màn hình (1, 2, 3, 4), tham số thứ 2 là để tùy chỉnh nội dung của tiêu đề.
* `toolbar` - Boolean, Number, Object: tùy chọn hiển thị thanh công cụ của `viewer` (giá trị mặc định là `true`). Các giá trị thiết lập của thuộc tính:

    * `0` hoặc `false`: ẩn  thanh công cụ.
    * `1` hoặc `true`: hiển thị  thanh công cụ.
    * `2`: chỉ hiển thị  thanh công cụ nếu màn hình lớn hơn 768px.  
    * `3`: chỉ hiển thị  thanh công cụ nếu màn hình lớn hơn 992px.
    * `4`: chỉ hiển thị  thanh công cụ nếu màn hình lớn hơn 1200px.
    * `{ key: Boolean | Number }`: ẩn hoặc hiện các button trên thanh công cụ. Các key button là: `zoomIn`, `zoomOut`, `oneToOne`, `reset`, `prev`, `play`, `next`, `rotateLeft`, `rotateRight`, `flipHorizontal`, `flipVertical`.
    * `{ key: String }`: Tùy chỉnh kích thước của button (`small`, `medium` (mặc định) và `large`)
    * `{ key: Function }`: Tùy chỉnh sự kiện click button.
    * `{ key: { show: Boolean | Number, size: String, click: Function }`: Tùy chỉnh cả ẩn/hiện, kích thước, sự kiện của button.

* `tooltip` - Boolean: tùy chọn hiển thị tooltip giá trị kích thước (%) khi phóng to hay thu nhỏ (giá trị mặc định là `true`).
* `movable` - Boolean: tùy chọn cho phép di chuyển ảnh hay không (giá trị mặc định là `true`).
* `zoomable` - Boolean: tùy chọn cho phép phóng to/thu nhỏ ảnh hay không (giá trị mặc định là `true`).
* `rotatable` - Boolean: tùy chọn cho phép xoay ảnh hay không (giá trị mặc định là `true`).
* `scalable` - Boolean: tùy chọn cho phép scale ảnh hay không (giá trị mặc định là `true`).
* `transition` - Boolean: tùy chọn sử dụng CSS3 Transition cho các phần tử đặc biệt (giá trị mặc định là `true`).
* `fullscreen`- Boolean: tùy chọn cho phép chế độ fullscreen khi phát trình chiếu ảnh (giá trị mặc định là `true`).
* `keyboard`- Boolean: tùy chọn hỗ trợ các phím tắt (giá trị mặc định là `true`). Các phím hỗ trợ là :

    * `Esc`: Thoát chế độ toàn màn hình, đóng hoặc dừng chế độ trình chiếu.
    * `Space`: Ngừng chiếu ảnh.
    * `←`: Xem ảnh trước.
    * `→`: Xem ảnh sau.
    * `↑`: Phóng to ảnh.
    * `↓`: Thu nhỏ ảnh.
    * `Ctrl + 0`: Phóng to ảnh (100%) so với ban đầu.
    * `Ctrl + 1`: Thu nhỏ ảnh về kích thước hiện tại.
* .......
### Methods:
Ngoài ra, bạn còn có thể sử dụng các phương thức của `v-viewer` cung cấp thông qua các đối tượng `viewer`: 
* `view([index=0])`: Hiển thị hình ảnh ở vị trí tùy chọn (tham số mặc định là 0).
* `prev([loop=false])` và `next([loop=false])`: Xem ảnh trước và sau, tham số loop dùng để thiết lập có lặp lại khi đang ở các ảnh đầu, cuối hay không (ví dụ loop = true và bạn đang ở ảnh cuối cùng thì khi gọi next() thì ảnh tiếp theo sẽ là ảnh đầu tiên,..)
* `play([fullscreen=false])`: Chạy trình chiếu ảnh.
* `stop()`: Ngừng trình chiếu ảnh.
* `show([immediate=false])` và `hide([immediate=false])`: Hiển thị  và tắt `viewer` trình chiếu hình ảnh (Chỉ khả dụng với chế độ là modal).
* `full()`: Chuyển sang chế độ modal full màn hình (Chỉ khả dụng với chế độ là inline).
* `reset()`: Đặt lại hình ảnh về trạng thái ban đầu.
* `zoom(ratio[, hasTooltip=false])` và `zoomTo(ratio[, hasTooltip=false])`: Thu phóng hình ảnh theo 1 tỉ lệ tương đối và tuyệt đối. Nếu ratio > 0 là phóng to, còn ratio < 0 là thu nhỏ.
* `rotate(degree)` và `rotateTo(degree)`: Quay hình ảnh theo 1 tỉ lệ tương đối và tuyệt đối. Quay sang phải nếu degree > 0, ngược lại quay sang trái nếu degree < 0.
* `scale(scaleX[, scaleY])`, `scaleX(scaleX)`, `scaleY(scaleY)`: Scale hình ảnh theo chiều X, Y.
* `move(offsetX[, offsetY])`: Di chuyển hình ảnh.
* `destroy()`: Hủy `viewer` và xóa các thể hiện, đối tượng của `viewer` đó. 
* ...
# Demo
### Directive: 
(với chế độ modal)
{@embed: https://jsfiddle.net/08oj7ypm/}
### Component:
(với chế độ inline)
{@embed: https://jsfiddle.net/96bo752k/}
# Kết luận
Qua bài viết này mình đã giới thiệu cho các bạn về `v-viewer` - một package đơn giản, dễ sử dụng và tùy biến, dùng để hiển thị và trình chiếu hình ảnh trong các ứng dụng `VueJs`. 

Hi vọng bài viết này sẽ có ích cho các bạn :D
# Tham khảo
https://github.com/mirari/v-viewer