Chào các bạn, lại là mình đây. Ở tut này chúng ta sẽ cùng tìm hiểu EventBus trong VueJS. Nó là cái gì, cách khởi tạo và sử dụng nó nhé ;) ;)

# Story
Chắc hẳn các bạn nếu đọc docs của Vue hoặc xem qua tut của mình thì đã biết về cách giao tiếp giữa 2 component dượng-con theo kiểu: truyền dữ liệu từ dượng vào con bằng `props`, con muốn thay đổi dữ liệu thì `$emit` 1 event lên để bảo dượng là dượng ơi dượng thay đổi dữ liệu đi :-D.

Trong quá trình phát triển đôi khi chúng ta sẽ gặp phải trường hợp ta muốn thay đổi giá trị của 1 biến nào đó ở cha gốc từ 1 component con ở mức rất sâu. Ví dụ: A là cha B, B là cha C, C là cha D. Và D muốn thay đổi 1 giá trị của biến ở A, khi đó việc `$emit` liên tục event từ D->C->B->A sẽ làm cho code bị dài dòng và lặp nhiều, khi thay đổi sẽ cần thay đổi ở nhiều nơi. Thật tuyệt vời vì Vue support `EventBus` giúp ta có thể `emit` event từ D lên thẳng A hoặc bất kì 1 component nào khác trong toàn ứng dụng Vue.

Cũng đã có nhiều tut hướng dẫn về cách tạo và sử dụng `EventBus` nhưng ở bài này mình sẽ hướng dẫn các bạn tạo `EventBus` theo dạng như kiểu 1 `plugin` (cũng là cách mình sử dụng ở các dự án thật). Vì sao thì bằng việc tách ra thành module riêng dạng plugin, nó không `modify` trực tiếp vào app của chúng ta, nên chúng ta có thể `cài-cắm` nó vào đơn giản, đồng thời bằng cách viết như thế này các bạn có thể đẩy lên registry kiểu `npm` hoặc `github` cho ae khác down về và dùng luôn.

# Coding
Ở đây mình dùng dùng Vue trong project Laravel nhé các bạn (đơn giản vì máy mình cài sẵn Laravel :)).

Trong thư mục `resources/js/components` các bạn tạo folder bus, chứa code cho bài này. Sau đó chúng ta sẽ cùng viết code cho `EventBus`, phần chính của bài này, bằng cách tạo file `index.js` với nội dung như sau:
```js
import Vue from 'vue'

class EventBus {
    constructor() {
        this.bus = new Vue()
    }

    /**
     * Listen for the given event.
     *
     * @param {string} event
     * @param {function} handler
     */
    on(event, handler) {
        this.bus.$on(event, handler)
    }

    /**
     * Listen for the given event once.
     *
     * @param {string} event
     * @param {function} handler
     */
    once(event, handler) {
        this.bus.$once(event, handler)
    }

    /**
     * Remove one or more event listeners.
     *
     * @param {string} event
     * @param {function} handler
     */
    off(event, handler) {
        this.bus.$off(event, handler)
    }

    /**
     * Emit the given event.
     *
     * @param {string|object} event
     * @param {...*} args
     */
    emit(event, ...args) {
        this.bus.$emit(event, ...args)
    }
}

export default {
    install(Vue) {
        const bus = new EventBus()

        Vue.prototype.$bus = bus
    },
}

```
Cùng vọc đoạn code trên xem có gì nhé :):
- Ở đây chúng ta có class tên `EventBus`. Class này chỉ có duy nhất thuộc tính `bus` được khởi tạo trong `constructor` với giá trị bằng việc tạo mới 1 object `Vue`. Những gì ta về cơ bản nhận được là một thành phần hoàn toàn tách rời khỏi DOM hoặc phần còn lại của ứng dụng `Vue`. Tất cả những gì tồn tại trên đó là các phương thức hay thuộc tính của nó, vì vậy, nó khá nhẹ  (nhẹ là sướng rồi) :-D)
- Class này có 4 phương thức. Các bạn có thể đọc phần comment của mình là có thể hiểu được từng phương thức làm gì nhé. 2 phương thức ta sẽ hay dùng nhất đó là `on` để lắng nghe liên tục 1 sự kiện nào đó, còn `emit` là để phát ra 1 event đi toàn bộ ứng dụng Vue.
- Tiếp theo, nhìn xuống phần dưới. Để dùng `EventBus` như 1 dạng `plugin`, ta `export` ra phương thức `install` với tham số là 1 `Vue instance`. Ở trong phương thức này, ta khởi tạo 1 đối tượng `EventBus`, sau đó ta thêm 1 thuộc tính `$bus` vào tất cả các component Vue bằng cách sử dụng:  `Vue.prototype.$bus = bus`, với cách làm như này, Ta sẽ có thể gọi `this.$bus.on` hay `this.$bus.emit` trong bất kì component nào ta muốn.

Ổn rồi đó anh em. Giờ ta cùng import plugin này vào app Vue của chúng ta nhé. Ở file `app.js` ta thêm vào như sau: 
```js
import Bus from './components/bus'
Vue.use(Bus)
```
Chỉ đơn giản như vậy thôi, bây giờ `EventBus` đã có sẵn ở toàn bộ app của ta rồi đó ;).

Tiếp theo vẫn ở folder `bus` ta tạo các component lần lượt như sau:
`App.vue`
```html
<template>
    <div>
        <div>
            <Foo></Foo>
        </div>
        <hr>
        <div>
            <Bar></Bar>
        </div>
    </div>
</template>

<script>
    import Foo from './Foo.vue'
    import Bar from './Bar.vue'
    export default {   
        components: {
            Foo,
            Bar
        }
    }
</script>
```
`Foo.vue`
```html
<template>
    <div>
        <h1>Counter: {{ counter }}</h1>
        <button @click="increaseCounter">Increase</button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                counter: 0
            }
        },
        methods: {
            increaseCounter () {
                this.counter++
                this.$bus.emit('increaseCounter', this.counter)
            }
        }
    }
</script>
```
`Bar.vue`
```html
<template>
    <div>
        <h1>Counter from Foo: {{ counter }}</h1>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                counter: 0
            }
        },
        created () {
            this.$bus.on('increaseCounter', value => {
                this.counter = value
            })
        }
    }
</script>
```
Giải thích một chút nhé. Ở trên ta có component `App` ở đó ta có 2 component con là `Foo` và `Bar`. Ở Foo ta có biến `counter` và 1 `button` để tăng giá trị `counter` mỗi khi click. Đồng thời mỗi khi click ta sẽ phát đi 1 event cho toàn bộ app với tên là `increaseCounter` (đặt tên tuỳ ý nhé các bạn, mình có thói quen hay đặt trùng với tên hàm), cùng đi với event đó là giá trị của counter vừa được tăng lên.

Ở bên component `Bar` mình sẽ lắng nghe sự kiện ở trên, khi nào thấy có sự kiện thì cũng tăng giá trị của `counter` ở `Bar` bằng với giá trị của được gửi kèm trong sự kiện `increaseCounter`

Ok tiếp theo ta thêm component `App` vào file app.js nhé:
`app.js`
```js
...
Vue.component('app', require('./components/bus/App.vue').default);
...
```
Ở file `welcome.blade.php` ta sửa lại như sau nhé:
```html
//...Other codes
<body>
        <div id="app">
            <app></app>
        </div>
        <script src="/js/app.js"></script>
</body>
```

Cuối cùng ta chạy `npm run watch`  và `php artisan serve`( với các bạn dùng Laravel) để khởi động app nhé. Mở trình duyệt xem kết quả nhé. Mở cả `Vue devtool` để xem kĩ hơn nhé các bạn

![EventBus](https://images.viblo.asia/36a62a3b-158f-49b5-a6cf-43a02f518710.gif)

Ở đây mỗi khi click vào button ở `Foo` sẽ tương ứng phát đi 1 event, `Bar` lắng nghe và update giá trị của mình theo giá trị của `Foo` vừa thay đổi được gửi kèm sự kiện. Do đó ta không cần `emit` 1 event từ `Foo` lên `App` sau đó truyền 1 `props` từ `App` xuống `Bar` để có được sự thay đổi này nữa. 

NOTE: 
- Để gửi nhiều hơn 1 biến kèm sự kiện, các bạn đơn giản viết như sau: 
```js
//in Foo
this.$bus.emit('increaseCouter', count1, count2, count3)

//in Bar
this.$bus.on('increaseCouter', (count1, count2, count3) => {
    ....
})
```
- Vì sự kiện khi được `emit` sẽ được truyền đi toàn ứng dụng, nên nếu nhớ cẩn thận đặt tên của event sao cho không bị lặp nhé các bạn. 
# The end
Qua đây các bạn nào chưa hiểu về global event trong Vue có thể sử dụng `EventBus`, đồng thời biết cách để viết 1 `plugin` trong VueJS như thế nào nhé (ở các dự án thật mình hay viết kiểu này vì khá tiện và chỉnh sửa dễ dàng).

Nhìn chung `EventBus` có cách sử dụng khá giống với `this.$emit` để emit 1 event từ con lên cha như ta vẫn dùng, chỉ khác là giờ event sẽ được truyền đi toàn ứng dụng và bất cứ đâu cũng có thể lắng nghe.

Cám ơn các bạn đã theo dõi từng bài của mình. Hẹn gặp lại các bạn ở các bài sau. :). Nếu có gì thắc mắc các bạn để lại dưới comment cho mình được biết nhé ;)