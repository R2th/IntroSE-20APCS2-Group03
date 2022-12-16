Chào mừng các bạn quay trở lại với series học VueJS với Laravel của mình, ở bài trước mình đã hướng dẫn các bạn cách sử dụng [`$forceUpdate()`](https://viblo.asia/p/bai-11-cach-su-dung-forceupdate-trong-vuejs-Qbq5Q1v45D8) để re-render lại DOM khi cần thiết. Ở bài này chúng ta sẽ cùng tìm hiểu cách bind `style` và `class` cho các thẻ HTML trong VueJS thế nào nhé.

Trong quá trình phát triển đôi khi sẽ có lúc các bạn các bạn muốn thêm một `class` vào trong một thẻ HTML với một điều kiện nào đó xảy ra, hoặc cũng có thể là muốn dòng text hiển thị có màu tím mộng mơ nhưng chỉ khi cần thiết. Khi đó Vue có thể giúp bạn làm điều này rất dễ dàng.

Ở bài này tiếp nối các bài trước, chúng ta tạo một file component mới đặt tên là `BindingHTMl.vue`, sau đó khai báo chúng trong `app.js` rồi thêm vào file `welcome.blade.php`, sau đó chạy `php artisan serve` và `npm run watch` nhé.
# Class binding
Chúng ta bắt đầu bằng ví dụ sau nhé: 
```html
<template>
    <div class="binding-html">
        <div class="text-title" :class="{active: isActive}">
            This is text
        </div>
        <div>
            <button @click="isActive = true">Active text</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: false
            }
        }
    }
</script>

<style lang="scss" scoped>
.active {
    color: red;
}
</style>
```
Ở đây chúng ta khai báo biến `isActive` giá trị mặc định là `false`, một `button` khi click sẽ đổi `isActive` thành `true`. Ở phần HTML ta có đoạn text, ở đây khi ta muốn click vào button thì đoạn text sẽ có class là `active` khi đó text sẽ chuyển sang màu đỏ (phần css màu đỏ được khai báo bên dưới nhé). Ta sẽ `binding class` cho thẻ `div` chứa đoạn text bằng cách dùng `:class` là dạng shorthand, đầy đủ là `v-bind:class` nhé, mọi người có thể dùng một trong hai cách.

Sau đó các bạn thử load lại trang và xem kết quả nhé, thử F12 inspect HTML và các bạn sẽ thấy khi click thì thẻ `div` chứa text có class là `active` khi ta bấm vào button.

Khi cần bind nhiều class thì các bạn làm như sau nhé: 
```html
<template>
    <div class="binding-html">
        <div class="text-title" :class="{active: isActive, hide: isHide, bold: isBold}">
            This is text
        </div>
        <div>
            <button @click="isActive = true">Active text</button>
        </div>
        <div>
            <button @click="isHide = true">Hide text</button>
        </div>
        <div>
            <button @click="isBold = true">Bold text</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: false,
                isHide: false,
                isBold: false
            }
        }
    }
</script>

<style lang="scss" scoped>
.active {
    color: red;
}
.hide {
    display: none;
}
.bold {
    font-weight: bold;
}
</style>
```
Các bạn cũng có thể truyền một `array` khi bind class để thiết lập các class khởi tạo ban đầu cho HTML element:
```html
<template>
    <div class="binding-html">
        <div class="text-title" :class="[activeClass, boldClass]">
            This is text
        </div>
        <div>
            <button @click="isActive = true">Active text</button>
        </div>
        <div>
            <button @click="isHide = true">Hide text</button>
        </div>
        <div>
            <button @click="isBold = true">Bold text</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: false,
                isHide: false,
                isBold: false,
                activeClass: 'active',
                boldClass: 'bold'
            }
        }
    }
</script>

<style lang="scss" scoped>
.active {
    color: red;
}
.hide {
    display: none;
}
.bold {
    font-weight: bold;
}
</style>
```
Ở ví dụ trên ngay khi load lần đầu thì đoạn text đã có 2 class là `active` và `bold`.

Bên cạnh đó các bạn cũng có thể truyền một `object` vào `:class` như sau:
```html
<template>
    <div class="binding-html">
        <div class="text-title" :class="classObject">
            This is text
        </div>
        <div>
            <button @click="isActive = true">Active text</button>
        </div>
        <div>
            <button @click="isHide = true">Hide text</button>
        </div>
        <div>
            <button @click="isBold = true">Bold text</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: false,
                isHide: false,
                isBold: false,
                activeClass: 'active',
                boldClass: 'bold',
                classObject: {
                    active: true,
                    bold: true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.active {
    color: red;
}
.hide {
    display: none;
}
.bold {
    font-weight: bold;
}
</style>
```
Ở đây khi load lại trang vẫn cho kết quả như ví dụ trước đó.

**Các bạn chú ý khi bind class mà tên class các bạn có các kí tự đặc biệt thì khi khi sử dụng (cả trong `data` lẫn thẻ HTML) các bạn phải để chúng ở trong cặp ngoặc `' '` nhé.**

Bên cạnh đó các bạn cũng có thể `bind class` trực tiếp vào component kiểu như <my-component :class="{active: isActive}".
# Style binding
Cách bind style khá là giống với class binding.

Xem ví dụ sau:
```html
<div class="text-title" :class="classObject" :style="{backgroundColor: color}">
    This is text
</div>
```
```js
data() {
    return {
        color: 'blue'
    }
}
```
Ở đây khi load lại trang ta sẽ thấy kết quả mới nhé.

Các bạn chú ý rằng với những thuộc tính CSS có 2 từ trở lên thì kể từ từ thứ 2 các bạn phải viết hoa nhé. Nếu không muốn thì các bạn có thể viết kiểu nguyên thuỷ giống css thuần như sau:
```html
<div class="text-title" :class="classObject" :style="{'background-color': color}">
    This is text
</div>
```
Các bạn cũng có thể truyền vào `:style` với một `object` hay `array` giống như phần `class binding` nhé.

Chú ý nếu các bạn truyền vào theo kiểu đa thuộc tính như sau:
```html
<div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```
Thì khi render Vue sẽ tự động chọn thuộc tính phù hợp với trình duyệt nhé.

# Kết luận
Có một note nhỏ cho các bạn đó là trong bài mình chọn cách viết là để các thuộc tính `binding` trong cặp dấu ngoặc `{ }`, với cách này ta có thể bind một hoặc nhiều thuộc tính, các bạn có thể không dùng đến nó trong trường hợp chỉ bind một class hoặc style, nhưng mình khuyến khích để trong `{}` hơn.

Bài này khá đơn giản nhưng có công lực cực kì thâm hậu giúp các bạn có thể bind các thẻ HTML khi render tuỳ vào các điều kiện nhất định. Mong rằng các bạn có thể hiểu được sau đó tự mình `bind` theo các cách riêng của mỗi mục địch khác nhau.

Ở bài tiếp theo chúng ta sẽ cùng tìm hiểu về cách `binding model` nhé.

Cám ơn các bạn đã theo dõi, nếu có gì thắc mắc các bạn để lại dưới phần comment nhé ^^!