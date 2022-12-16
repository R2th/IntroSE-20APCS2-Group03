Xin chào tất cả các bạn đã quay trở lại với series học VueJS với Laravel của mình, ở bài trước mình đã hướng dẫn các bạn về [Wacher trong VueJS](https://viblo.asia/p/bai-6-su-dung-watcher-trong-vuejs-YWOZr00P5Q0), ở trong bài này chúng ta sẽ cùng đến với Conditional rendering, đây là những thứ mà mình tin chắc các bạn sẽ dùng rất nhiều trong công việc.

Ở bài này cách sử dụng của các directive điều kiện này khá là giống với những gì các bạn đã từng được học trong các ngôn ngữ lập trình.

Ở bài này chúng ta tạo ra một file mới tên là `ConditionalRendering.vue` ở trong folder `components` nhé, sau đó chúng ta khai báo nó ở trong file `app.js` và nhớ thêm nó vào file `welcome.blade.php` nhé. Nội dung như bên dưới, các bạn chạy thử xem nhé: (nhớ luôn chạy `php artisan serve` và `npm run watch` nhé mọi người)
```html
<template>
    <div class="conditional-rendering">
        <div class="block-1">
            This is block 1
        </div>
        <div class="block-2">
            This is block 2
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>
</style>
```
# `v-if`
Ở ví dụ trên nếu như chúng ta muốn chỉ render ra từng block ở những điều kiện nhất định, khi đó chúng ta có thể sử dụng `v-if` để quản lý việc render. Cùng xem ví dụ sau:
```html
<template>
    <div class="conditional-rendering">
        <div class="block-1" v-if="isActive == false">
            This is block 1
        </div>
        <div class="block-2" v-if="isActive == true">
            This is block 2
        </div>
        <div>
            <button @click="toggleActive">Button</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        },
        methods: {
            toggleActive() {
                if(this.isActive == true) {
                    this.isActive = false
                }
                else {
                    this.isActive = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Ở đây block 1 chỉ được render khi `isActive` có giá trị `false` và ngược lại thì block 2 sẽ được render. Chúng ta tạo một `button` để toggle giá trị của `isActive` bằng cách mỗi lần click `button` thì sẽ gọi đến hàm `toggleActive`. Các bạn f5 lại trình duyệt và thử kết quả nhé. Các bạn bật cả Vue devtool nên để xem giá trị của isActive thay đổi như thế nào mỗi lần click nhé.
# `v-else`, `v-else-if`
Với ví dụ trên luồng xử lý của chúng ta có performance chưa tốt, vì mỗi lần component này render, đến block 1 nó sẽ kiểm tra giá trị `isActive`, sau đó đến block 2 nó lại kiểm tra giá trị `isActive` một lần nữa. Thay vì phải kiểm tra 2 lần như thế chúng ta có thể sử dụng `v-else` để Vue bỏ qua kiểm tra biểu thức còn lại nếu như một trong 2 biểu thức đã đúng, được mô tả như trong đoạn code sau:
```html
<template>
    <div class="conditional-rendering">
        <div class="block-1" v-if="isActive == false">
            This is block 1
        </div>
        <div class="block-2" v-else>
            This is block 2
        </div>
        <div>
            <button @click="isActive = !isActive">Button</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Ở đây mình sử lại code một chút cho gọn, không dùng đến methods để thay đổi giá trị của `isActive` nữa mà chúng ta sẽ để trực tiếp khi sự kiện `click` được gọi thì thay đổi giá trị của `isActive` trái ngược với giá trị hiện tại.

Các bạn load lại trình duyệt và thử xem kết quả nhé, ta nhận được điều tương tự.

Tiếp theo khi chúng ta có nhiều block muốn render theo từng điều kiện cụ thể thì đó là lúc chúng ta nghĩ đến `v-else-if`
```html
<template>
    <div class="conditional-rendering">
        <div class="block-1" v-if="currentBlock == 1">
            This is block 1
        </div>
        <div class="block-2" v-else-if="currentBlock == 2">
            This is block 2
        </div>
        <div class="block-3" v-else>
            This is block 3
        </div>
        <div>
            <button @click="showBlock(1)">Button 1</button>
        </div>
        <div>
            <button @click="showBlock(2)">Button 2</button>
        </div>
        <div>
            <button @click="showBlock(3)">Button 3</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentBlock: 1
            }
        },
        methods: {
            showBlock(number) {
                this.currentBlock = number
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Cách sử dụng khá đơn giản, các bạn có thể tự xem và giải thích, nếu không hiểu thì comment bên dưới nhé.
# `v-show`
Quay trở lại ví dụ ở phần `v-if`, để có thể hiện thị 1 trong 2 block tùy theo giá trị của `isActive`, chúng ta cũng có thể sử dụng cách khác đó là dùng `v-show`:
```html
<template>
    <div class="conditional-rendering">
        <div class="block-1" v-show="isActive == false">
            This is block 1
        </div>
        <div class="block-2" v-show="isActive == true">
            This is block 2
        </div>
        <div>
            <button @click="isActive = !isActive">Button</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Cùng load lại trình duyệt và các bạn sẽ thấy kết quả tương tự như dùng `v-if` mỗi khi click vào button. Đến đây các bạn sẽ tự hỏi: "giời ơi vậy thì cuối cùng v-if hay là v-show, tôi nên dùng cái nào?" :). Chúng ta cùng đào sâu hơn một chút về chúng nhé.

*Đối với v-if: sử dụng ví dụ phần `v-if`

Nếu chúng ta mở inspect HTML lên (f12 trên win, hoặc chuột phải và chọn `inspect`), mỗi lần click vào button thì thẻ `div` chứa block cũ sẽ được thay thế nội dung của block mới.

*Đối với v-show: sử dụng ví dụ ngay bên trên

Khi inspect các bạn có thể thấy ngay là Vue đã render sẵn ra luôn 2 element chính là 2 block của chúng ta, và tùy với giá trị của `isActive` mà block đó có `style` là `display: none` hay không.

Điều rút ra ở đây là:
* `v-if` không render ngay ra toàn bộ các element mà tùy vào giá trị kiểm tra, còn với `v-show` sẽ render ra ngay từ đầu và chỉ quyết định có `display` nó hay không
* Từ kết quả trên chúng ta thấy rằng: nếu nội dung trong block mà ít, và trong quá trình sử dụng mà user sẽ tác động đến block nhiều thì dùng `v-show` sẽ cho tốc độ tốt hơn, còn nếu nội dung trong block mà nhiều cùng với nhiều xử lý hoặc nội dung của block ít thay đổi trong suốt vòng đời của component thì khi đó không nên dùng `v-show` vì lúc đó trang của chúng ta sẽ nặng làm giảm performance và ta cần nghĩ đến dùng `v-if`
# Kết luận
Qua bài này mong rằng các bạn sẽ biết cách sử dụng `v-if`, `v-else`, `v-else-if` và `v-show` trong quá trình phát triển ứng dụng các bạn sẽ phải dùng đến nó rất nhiều. Đồng thời hiểu và sử dụng linh hoạt các `directives` này để có một ứng dụng tốt.

Ở bài tiếp theo chúng ta sẽ cùng tìm hiểu về `v-for` nhé.

Cám ơn các bạn đã theo dõi, nếu có gì thắc mắc các bạn để lại comment cho mình nhé ^^!