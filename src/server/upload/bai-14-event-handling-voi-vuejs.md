Chào mừng các bạn quay trở lại với series học VueJS với Laravel của mình, ở bài trước mình đã hướng dẫn các bạn về cách [binding form input](https://viblo.asia/p/bai-13-form-input-binding-trong-vuejs-bWrZn1amKxw), bài này chúng ta sẽ cùng tìm hiểu cách xử lý các sự kiện khi người dùng tương tác như `click` hay bấm các phím trong VueJS nhé.

Để bắt các sự kiện này ta dùng `v-on` hoặc mình thường dùng kiểu `short-hand` là `@` (trong bài này mình dùng cách viết `shorthand` nhé). Ở bài này ta tạo ra một file mới `EventHandling.vue` sau đó khai báo component này trong `app.js` và `welcome.blade.php`. Nhớ chạy `php artisan serve` và `npm run watch` nhé mọi người.

Ở bài này nội dung khá là đơn giản và mình nghĩ nó cũng khá dễ hiểu cho các bạn, nên chúng ta sẽ chủ yếu làm qua các ví dụ để hiểu nhé.
# Click events
Xét ví dụ sau:
```html:html
<template>
    <div class="event-handling">
        <div>Current Number: {{ counter }}</div>
        <button @click="counter++">CLick</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                counter: 0
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Ở đây ta thiết lập sự kiện khi người dùng click vào button thì tăng giá trị của `counter` lên 1 bằng cách dùng `@click` như hình, và chúng ta in giá trị của `counter` ra ngoài màn hình. Các bạn có thể load lại trang và thử bằng cách click vào button để xem giá trị của `counter` thay đổi như thế nào nhé.

Bên cạnh đó một cách thường dùng là ta click để thực hiện gọi một phương thức nào đó, để làm như vậy ta xem ví dụ sau nhé:
```html:html
<template>
    <div class="event-handling">
        <div>Current Number: {{ counter }}</div>
        <button @click="increaseCounter">CLick</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                counter: 0
            }
        },
        methods: {
            increaseCounter() {
                this.counter += 10
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Ở trên mỗi khi người dùng click vào button thì phương thức `increaseCounter` được gọi và tăng giá trị của `counter` lên 10, load lại trang và thử lại nhé các bạn ;)

Nếu muốn truyền tham số vào phương thức lúc button được click ta làm như sau nhé:
```html:html
<template>
    <div class="event-handling">
        <div>Current Number: {{ counter }}</div>
        <button @click="increaseCounter(50)">CLick</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                counter: 0
            }
        },
        methods: {
            increaseCounter(number) {
                this.counter += number
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
### Các chỉ định đi cùng với `click`
Trong Vue thay vì phải gọi `event.preventDefault()` hay `event.stopPropagation()` thì ta có thể sử dụng chúng một cách khá đơn giản như những ví dụ sau.
### click.stop
```html:html
<template>
    <div class="event-handling">
        <div @click="alertHello">
            <button @click="alertWelcome">CLick</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            alertHello() {
                alert('Hello')
            },
            alertWelcome() {
                alert('Welcome')
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Ở ví dụ trên ta có `button` ở trong thẻ `div` sau đó ta đồng thời set `@click` cho cả `button` và thẻ `div` này. Khi đó mỗi lần click vào button thì đồng thời 2 sự kiện click sẽ được gọi (`@click` của button được gọi trước). Điều đó sẽ `alert` ra màn hình 2 lần. Để ngăn chặn điều này ta làm như sau. Sửa lại một chút ở `button`:
```javascript:html
<button @click.stop="alertWelcome">CLick</button>
```
Ta thêm chỉ định `stop` vào `@click` cũng giống như việc gọi `event.stopPropagation()`. Giờ đây khi click vào button thì chỉ duy nhất sự kiện click trong button đó được gọi mà thôi. Các bạn load lại trang và làm thử nhé
### click.prevent
Chúng ta cùng xem ví dụ sau:
```html:html
<template>
    <div class="event-handling">
        <form>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="scss" scoped>
</style>
```
Bình thường khi khai báo form như trên, mỗi khi click vào button submit thì trang sẽ bị load lại. Và để điều này không xảy ra thì ta sửa lại button như sau:
```html:html
<template>
    <div class="event-handling">
        <form @submit.prevent>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
    export default {
    }
</script>

<style lang="scss" scoped>
</style>
```
Thử load lại trang và các bạn có thể thấy khi click vào `Submit` giở đây trang đã không còn load lại nữa. 

Để thực hiện một hành động khi `submit` các bạn có thể làm như sau:
```php:html
<form @submit.prevent="sayWelcome">
    <button type="submit">Submit</button>
</form>
```
Hoặc thêm trực tiếp `prevent` vào button như sau:
```html:html
<template>
    <div class="event-handling">
        <form>
            <button type="submit" @click.prevent="sayWelcome">Submit</button>
        </form>
    </div>
</template>

<script>
    export default {
        methods: {
            sayWelcome() {
                alert(1)
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```

**Nếu muốn thực hiện stop và prevent đồng thời ta làm như sau:**
```javascript:html
<button type="submit" @click.stop.prevent="sayWelcome">Submit</button>
```
### click.once
Khi muốn chỉ thực hiện hành động một lần khi `click` ta làm như sau:
```go:html
<button type="submit" @click.once="sayWelcome">Submit</button>
```
### click.capture
Ở trên với ví dụ `button` trong thẻ `div` khi để bình thường không có `stop` thì hành động trong element `button` là con của `div` được gọi trước. Để thực hiện ngược lại, tức khi click vào button thì phương thức trong thẻ `div` được gọi trước sau đó đến con của nó là `button` thì ta làm như sau:
```html:html
<template>
    <div class="event-handling">
        <div @click.capture="alertHello">
            <button @click="alertWelcome">CLick</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            alertHello() {
                alert('Hello')
            },
            alertWelcome() {
                alert('Welcome')
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Các bạn có thể load lại trang và thử click vào button, sẽ thấy `alert` ra `Hello` trước sau đó mới đến `Welcome`.
### click.self
Một cách khác để ngăn chặn khi click vào `button` mà phương thức trong thẻ `div` cũng được gọi, thay vì sử dụng `click.stop` cho `button` đó là sử dụng `click.self` cho `div`, khi đó, khi click vào con của `div` thì hành động trong thẻ `div` sẽ không được gọi.
```html:html
<template>
    <div class="event-handling">
        <div @click.self="alertHello">
            <button @click="alertWelcome">CLick</button>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            alertHello() {
                alert('Hello')
            },
            alertWelcome() {
                alert('Welcome')
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Các bạn có thể tải lại trang và ta có thể kết quả giống như cách sử dụng `click.stop`
### click.passive
```go:html
<!-- 
hành vi mặc định của sự kiện scroll (cuộn trang) sẽ xảy ra 
ngay lập tức, thay vì đợi `onScroll` hoàn tất.
-->
<div v-on:scroll.passive="onScroll">...</div>
```
# Key events
Khi muốn lắng nghe sự kiện khi người dùng tương tác với các nút trên bàn phím. Ta có thể sử dụng một số cách như sau:
```html:html
<template>
    <div class="event-handling">
        <input @keyup.enter="alertHello">

        <input @keyup.13="alertHello">
    </div>
</template>

<script>
    export default {
        methods: {
            alertHello() {
                alert('Hello')
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Bên cạnh đó Vue cung cấp một số sự kiện mặc định cho một số nút như sau:
```css
.enter
.tab
.delete (hiệu lực với cả 2 nút  “Delete” và “Backspace”)
.esc
.space
.up
.down
.left
.right
```
Để tuỳ chỉnh ta xem ví sau và xem mình giải thích bên dưới nhé:

`app.js`
```swift:js
Vue.config.keyCodes.sayHello = 13
```
`EventHandling.vue`
```html:html
<template>
    <div class="event-handling">
        <input @keyup.sayHello="alertHello">
    </div>
</template>

<script>
    export default {
        methods: {
            alertHello() {
                alert('Hello')
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
```
Ở trên thay vì gọi `@keyup.enter` ta thiết lập trong `app.js` cách gọi khác là `@keyup.sayHello` với `keycode` là 13(chính là phím `enter`). Các bạn có thể lấy keycode của phím bất kì tại [đây](http://keycode.info/) 
### System modifiers
Vue hỗ trợ chúng ta một số sự kiện ấn tổ hợp phím như sau:
```css
.ctrl
.alt
.shift
.meta
```
**chú ý: `meta` là phím `command` trên Mac, là hím `cửa sổ` trên Win**
Ví dụ:
```html:html
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```
**chú ý**:

Ở ví dụ trên ta dùng `@keyup.alt.67` thay cho tổ hợp phím `Alt` và `C`, thì `clear` sẽ được gọi khi ta thả phím `C` ra trước, nếu ta thả phím `Alt` ra trước sự kiện sẽ không được gọi.
# exact
`exact` được sử dụng khi ta muốn thực hiện một hành động nào đó chỉ khi người dùng bấm chính xác các nút hay tổ hợp nút như ta thiết lập mà không có sự tác động đồng thời của các `system modifiers` như ta đã nói ở phần trên.
```markdown:html
<!-- hành động bên dưới được gọi ngay cả khi các nút khác được bấm đồng thời như Alt hay Shift -->
<button @click.ctrl="onClick">A</button>

<!-- chỉ thực hiện khi bấm chính xác tổ hợp click+ctrl -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- Chỉ thực hiện khi click -->
<button @click.exact="onClick">A</button>
```
# Mouse events
Vue cũng cấp cho chúng ta sự kiện khi click chuột như sau:
```html
.left <!-- khi chuột trái click -->
.right <!-- khi chuột phải click -->
.middle <!-- khi bấm con lăn chuột  -->
```
Phần này các bạn có thể tự làm ví dụ của riêng mình nhé, mình nghĩ sẽ không khó khăn lắm cho các bạn (nếu có gì các bạn comment bên dưới nhé).
# Kết luận
Qua bài này mong rằng các bạn có thể biết được về cách xử lsy các sự kiện khi người dùng tương tác với bàn phím hay chuột trong VueJS, từ đó áp chụng tuỳ chỉnh vào các mục đích cá nhân khác nhau.

Ở bài tiếp theo chúng ta sẽ cùng tìm hiểu về  `CSS scoped` trong VueJS nhé.

Cám ơn các bạn đã theo dõi series của mình, nếu có gì thắc mắc các bạn để lại dưới comment nhé ^^!