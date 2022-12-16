Alright''', ở phần này mình sẽ đưa các bạn đi từ template đến HTML DOM nhé!

Nếu như các bạn chưa xem phần trước thì có xem ngay [tại đây](https://viblo.asia/p/xay-dung-vue-cua-rieng-ban-chi-trong-300-dong-phan-2-GrLZD3XJKk0).

# Từ template đến DOM
Đoạn đường vận chuyển template đến với HTML DOM sẽ được chia thành 2 bước như sau.

## 1. Từ template đến render function

![](https://images.viblo.asia/201fdcdc-0f86-4f39-9370-2123983425c8.png)


Khi template đi đến Vue sẽ được qua một compiler (trình biên dịch) để biến đổi template của chúng ta thành Render function (RF).

RF có nhiệm vụ trả về một Virtual DOM Node và để hiểu hơn về RF mình sẽ có một ví dụ như sau:

```html
<h1>Hello World</h1>
```

Đoạn HTML bên trên sẽ được biên dịch (compile) thành một hàm render function như sau:

```javascript
function render() {
    with(this) {
        return _c('h1', [_v("Hello World")])
    }
}
```

Hàm **render** bên trên có nhiệm vụ trả về một Virtual DOM Node để biểu diễn cho đoạn HTML đã cho. Các bạn có thể tạm không quan tâm đến hàm **_v** có nhiệm vụ gì, chúng ta chỉ cần quan tâm đến hàm **_c**. Hàm này có chức năng biến các tham số truyền vào thành virtual DOM node.

## 2. Từ render function đến hiển thị lên trình duyệt

![](https://images.viblo.asia/5788be32-adc4-41a1-b7cd-a73c4f15fc2d.png)

Vậy **Virtual DOM Node** là gì?

Có thể giải thích dễ hiểu đó chính là một object lưu trữ thông tin, mô tả (description) và các thành phần con của một cái DOM thực thụ. Dùng để tạo ra HTML DOM thực thụ rồi đưa lên trình duyệt (browser) và hiển thị lên màn hình. Người đời thường gọi nó là **VNode**.

Từ **VNode** chúng ta có thể tạo ra một DOM thực rồi đẩy nó lên trình duyệt để hiển thị cho người dùng hoặc dùng để cập nhật lại một phần thay đổi trong DOM đã có.

## VNode thật ra có hình dạng như thế nào?

Phần này sẽ giúp các bạn có được hình dung chi tiết hơn về **VNode**.

Bên dưới là ảnh mô tả quy trình chuyển từ **template** sang **VNode**, tiếp đó đưa lên trình duyệt là một **HTML DOM Tree**.

![](https://images.viblo.asia/467c82c1-a68e-462c-97f4-15e7a230d6dc.png)

Thế **VNode** cập nhật thì sao nhỉ? Chúng ta sẽ so sánh để tìm xem **element** nào là khác biệt thì tiến hành cập nhật lại **DOM** tương ứng với phần tử đó.

![](https://images.viblo.asia/b5049c45-bd85-41f8-99a6-0a09d785e2ce.png)

# Vue compiler
Vì việc đi xây dựng lại compiler rất phức tạp cho nên ở bước này chúng ta sẽ sử dụng luôn compiler của **Vue**. Và compiler cũng không phải là một phần của runtime cho nên cũng không cần quá khắt khe.

Để sử dụng Vue compiler, chúng ta sẽ cài đặt [vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler) bằng câu lệnh sau:
```
yarn add vue-template-compiler
```

# VDom
Vue có một thư viện để làm việc với Vdom. Evan You (tác giả của Vue) đã fork lại [Snabbdom](https://github.com/snabbdom/snabbdom) và chỉnh sửa lại để tạo ra thư viện Vdom của mình. Tuy nhiên vì chúng ta chỉ đang đi xây dựng lại một Vue minimal cho nên cũng không cần quá quan trọng Evan You đã thay đổi gì. Trong bài hướng dẫn này mình sẽ vẫn sử dụng **snabbdom** và có những khác biệt gì thì mình sẽ đi khắc phục những chỗ khác biệt đó thay vì là sử dụng luôn thư viện **Vdom** của Vue.

Để sử dụng [Snabbdom](https://github.com/snabbdom/snabbdom), chúng ta sẽ cài đặt bằng câu lệnh sau:
```
yarn add snabbdom
```

# Xây dựng tính năng render cho Vue
Ở bước này mình sẽ hướng dẫn các bạn các thêm tính năng render template cho Vue instance mà chúng ta đã xây dựng ở phần trước.

Đầu tiên các bạn tạo cho mình file sau để lưu trữ các hàm để khởi tạo cho tính năng render của chúng ta.

Ở bước này các bạn sẽ hình dung như sau:
1. Đầu tiên mình sẽ xác định được đâu là element mà mình cần mount cái DOM vào.
2. Tiếp đến mình khởi tạo một cái render function dựa trên cái outerHTML của cái element mình mount vào.
3. Sau đó mình khởi tạo hàm update DOM. Bước này thì các bạn sẽ kiểm tra xem đã mount lần nào chưa? Nếu chưa mount thì sẽ tiến hành mount. Nếu đã mount rồi thì đây chính là update, thì chúng ta sẽ tạo ra VNode mới rồi vá (patch) vào cái DOM cũ.

Đầu tiên mình sẽ import toàn bộ những gì mình cần vào trước. Mình sẽ cần có **compiler**, **patch** của **snabbdom** sẽ giúp mình khởi tạo, cập nhật DOM. Và cuối cùng là **installRenderHelpers** dùng để xử lý các hàm lạ như **_v**, **_l**, mà mình có nói ở bên trên là các bạn chưa cần quan tâm. Sau khi xong render mình sẽ nói rõ về các hàm lạ này.

```javascript:vue/instance/render.js
import * as compiler from 'vue-template-compiler'

const snabbdom = require('snabbdom')

const patch = snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/props').default,
  require('snabbdom/modules/style').default,
  require('snabbdom/modules/eventlisteners').default,
])

const _createElement = require('snabbdom/h').default

import { installRenderHelpers } from './render-helpers'
```

Sau khi đã có import những gì mình cần thì bây giờ đến bước xây dựng một hàm khởi tạo render.

Đầu tiên như mình cũng đã giới thiệu ở bên trên về hàm **_c**, thì **snabbdom** cũng có hỗ trợ chúng ta hàm tương tự mà mình đã import là **_createElement**, được import từ **snabbdom/h**, và chữ **h** chính là viết tắt cho **hyperscript**.

Sau đó chúng ta tiến hành lưu lại selector của phần tử mà chúng ta sẽ mount vào. Tiếp đó lấy template bằng outerHTML của phần tử mà chúng ta cần mount. **Lưu ý:** Mình khởi tạo luôn **vm.$container** để sau này không cần phải **querySelector** mặc dù chỉ sử dụng cho lần đầu tiên.

Tiếp đến mình khởi tạo cho hàm **_render**, hàm này thì như mình đã nói là chúng ta sẽ tái sử dụng của **Vue.**

Và cuối cùng là hàm **_update**, ở hàm này mình sẽ giải thích một tí. Giả sử mình có HTML sau:
```html
<h1>{{ title }}</h1>
```
Đối với HTML ở trên thì chúng ta sẽ có hàm render tương ứng như sau:
```javascript
function render() {
    with(this) {
        return _c('h1', [_v(_s(title))])
    }
}
```

Chúng ta sẽ thấy là hàm này có sử dụng một biến là **title**, vậy biến này lấy đâu ra? Nó chính là **vm.title** hay còn là **vm.$data.title**. Vậy thì đơn giản chúng ta chỉ cần apply cho render function này con trỏ **this** đến biến môi trường **vm**.

Quay lại hàm **_update**, chúng ta sẽ thực hiện lần lượt các bước như sau:

1. Gọi Render function để tạo ra VNode.
2. Nếu **vm.$vnode** bằng **null** có nghĩa là chúng ta vẫn chưa mount thì sẽ tiến hành mount vào **vm.$container**.
3. Ngược lại thì chứng tỏ chúng ta đã mount rồi, lần này chỉ cần update lại.

**Lưu ý: Sau mỗi bước chúng ta đều phải cập nhật lại vm.$vnode để sử dụng cho việc so sánh cập nhật DOM lần sau!**

```javascript:vue/instance/render.js
export function initRender(vm) {
  vm.$vnode = null
  vm.$template = ''

  vm._c = _createElement

  if (vm.$options.el) {
    vm.$el = vm.$options.el
    vm.$container = document.querySelector(vm.$el)
    vm.$template = vm.$container.outerHTML
  }

  vm._render = compiler.compileToFunctions(vm.$template).render

  vm._update = () => {
    const newVNode = vm._render.apply(vm)
    if (vm.$vnode === null) {
      if (vm.$el) {
        patch(vm.$container, newVNode)
      }
      vm.$vnode = newVNode
    } else {
      patch(vm.$vnode, newVNode)
      vm.$vnode = newVNode
    }
  }
}

export function renderMixin(Vue) {
  installRenderHelpers(Vue.prototype)
}
```

Như mình đã nói ở trên và sự xuất hiện của các hàm lạ, cho nên chúng ta sẽ cần có hàm khởi tạo mixins cho việc render. Mình gọi là **renderMixin**, hàm này sẽ gọi để cài đặt các hàm lạ mà mình nhắc đến chính là **Render Helpers**.

Và ở Render Helpers này mình sẽ install nó vào trong Vue.prototype. Có rất nhiều hàm cần phải implement, nhưng ở đây mình sẽ chỉ implement một số hàm như **toString**, **toNumber**, **renderList** (để sử dụng cho **v-for**). Còn các hàm còn lại thì mình sẽ cho nó trả về lại những gì nó truyền vào. Nếu các bạn muốn tìm hiểu kỹ hơn thì có thể đọc file này của Vue. [[vuejs/vue/src/core/instance/render-helpers/index.js]](https://github.com/vuejs/vue/blob/52719ccab8/src/core/instance/render-helpers/index.js)

```javascript:vue/instance/render-helpers/index.js
export function installRenderHelpers(target) {
  target._o = target._n = toNumber // markOnce
  target._s = toString
  target._l = renderList
  target._t = emptyFunction // renderSlot
  target._q = emptyFunction // looseEqual
  target._i = emptyFunction // looseIndexOf
  target._m = emptyFunction // renderStatic
  target._f = emptyFunction // resolveFilter
  target._k = emptyFunction // checkKeyCodes
  target._b = emptyFunction // bindObjectProps
  target._v = emptyFunction
  target._e = emptyFunction
  target._u = emptyFunction // resolveScopedSlots
  target._g = emptyFunction // bindObjectListeners
  target._d = emptyFunction // bindDynamicKeys
  target._p = emptyFunction // prependModifier
}

export const emptyFunction = (x) => x

export const toNumber = (x) => Number(x)

export const toString = (x) => {
  if (typeof x === 'object') return 'object'
  if (typeof x === 'function') return 'function'
  return x + ''
}

export const renderList = (items, transform) => {
  if (Array.isArray(items)) {
    return items.map((item, i) => transform(item, i))
  } else if (typeof items === 'number') {
    return new Array(items).fill(1).map((_, i) => transform(i + 1, i))
  } else if (typeof items === 'object') {
    return Object.keys(items).map((key, i) => transform(items[key], key, i))
  }
}
```

Sau khi xong chúng ta sẽ có một chút chỉnh sửa ở các file sau. Dòng nào thêm vào thì mình sẽ có dấu cộng ở bên trái.

Gọi **renderMixin** để khởi tạo cho render.

```javascript:vue/instance/index.js
[ ]import { initMixin } from './init'
[+]import { renderMixin } from './render'
[ ]
[ ]export function Vue(options) {
[ ]  this._init(options)
[ ]}
[ ]
[ ]initMixin(Vue)
[+]renderMixin(Vue)
```

Gọi **initRender** để khởi tạo, chuẩn bị việc render cho Vue instance. Sau đó chúng ta sẽ gọi hàm **_update** kèm theo **vm** để thực hiện việc mount vào selector.

```javascript:vue/instance/init.js
[ ]import { initState } from './state'
[+]import { initRender } from './render'
[ ]
[ ]export function initMixin(Vue) {
[ ]  Vue.prototype._init = function (options) {
[ ]    const vm = this
[ ]    vm.$options = options
[ ]
[+]    initRender(vm)
[ ]    initState(vm)
[ ]
[+]    vm._update.apply(vm)
[ ]  }
[ ]}
```

# Kiểm thử
Trước khi kiểm thử chúng ta sẽ tạo ra một file để export Vue của chúng ta ra đã nhé.

```javascript:vue/index.js
import { Vue } from './instance/index'

window.Vue = Vue

export default Vue
```

Tiến hành build bằng câu lệnh sau:
```
browserify --s module vue/index.js -p esmify > dist/vue.min.js
```

Mình sẽ tạo thử một folder mới để test gồm vài dòng như sau.
```html:web/index.html
<div id="app">
  <h1>{{ title }}</h1>
</div>

<script src="../dist/vue.min.js"></script>
<script src="./index.js"></script>
```

```javascript:web/index.js
let vm = new Vue({
  el: '#app',
  data: {
    title: 'Hello World',
  },
})
```

Sau khi chạy trang web này các bạn sẽ thấy trang web hiện lên như sau:

![](https://images.viblo.asia/68e90118-9c5a-4423-8fdf-93ec1aa98afe.png)

Như vậy là chúng ta đã hoàn thành việc xây dựng hàm render và mount DOM HTML thành công.

Tuy nhiên chúng ta thử thêm một số dòng sau để cập nhật lại **title** xem như thế nào nhé!

```javascript:web/index.js
let vm = new Vue({
  el: '#app',
  data: {
    title: 'Hello World',
  },
})

setTimeout(() => {
  vm.title = 'Good morning!'
}, 2000)
```

Chờ 2 giây,... chờ 4 giây,... Sao lạ vậy ta? Sao trang web của chúng ta chưa cập nhật?

Đúng rồi, do chúng ta chưa gọi lại hàm **_update** khi **title** cập nhật chứ sao nữa! Ở file **vue/instance/init.js:13** chúng ta chỉ gọi hàm cập nhật một lần. Để khắc phục việc này chúng ta sẽ sử dụng **Reactivity System** mà đã được nhắc đến trong phần 1.

Tiến hành thêm class **Dep** mà ở phần 1 mình đã nhắc đến.
```javascript:vue/observer/dep.js
export class Dep {
  constructor() {
    this.subs = []
  }

  depend() {
    if (Dep.target && !this.subs.includes(Dep.target)) {
      this.subs.push(Dep.target)
    }
  }

  notify() {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; ++i) {
      subs[i].call()
    }
  }
}

Dep.target = null

export function useEffect(fn) {
  Dep.target = fn
  fn.call()
  Dep.target = null
}
```

Tiến hành sửa lại hàm **defineReactiveData** và **defineProxy** như sau:

Dấu **~** để mô tả các dòng có sự thay đổi.

```javascript:vue/observer/index.js
[+]import { Dep } from './dep'

[ ]export function defineReactiveData(vm) {
[ ]  Object.keys(vm.$data).forEach((key) => {
[+]    let dep = new Dep()
[~]    defineProxy(vm, key, dep)
[ ]  })
[ ]}

[~]export function defineProxy(vm, key, dep) {
[ ]  Object.defineProperty(vm, key, {
[ ]    get: function reactiveGetter() {
[+]      dep.depend()
[ ]      return vm.$data[key]
[ ]    },
[ ]    set: function reactiveSetter(_value) {
[ ]      vm.$data[key] = _value
[+]      dep.notify()
[ ]    },
[ ]  })
[ ]}
```

Sau khi đã xong, chúng ta tiến hành sửa lại **vue/instance/init.js**, chúng ta sẽ thêm và sử dụng **useEffect** cho việc gọi **_update** để nó có thể tự được gọi lại để cập nhật khi có state thay đổi.

Lúc này sẽ thay đổi như sau:
```javascript:vue/instance/init.js
[ ]import { initState } from './state'
[ ]import { initRender } from './render'
[+]import { useEffect } from '../observer/dep'

[ ]export function initMixin(Vue) {
[ ]  Vue.prototype._init = function (options) {
[ ]    const vm = this
[ ]    vm.$options = options
[ ]
[ ]    initRender(vm)
[ ]    initState(vm)
[ ]
[~]    useEffect(vm._update.bind(vm))
[ ]  }
[ ]}
```

Okay~ Tiến hành build lại thôi nào.

```
browserify --s module vue/index.js -p esmify > dist/vue.min.js
```

Sau đó thử reload lại **index.html** và xem sau 2 giây khi **title** được cập nhật thì trang web có được cập nhật lại hay không? Các bạn có thể xem ảnh GIF bên dưới.

![](https://media.giphy.com/media/VG27jyAfmE1BYWAKiX/giphy.gif)

# Lời kết
Sau phần này, chúng ta đã phần nào hoàn thiện được Vue của chính mình. Tuy nhiên như mình đã có nhắc đến đó là **Evan You** đã có thay đổi Snabbdom cho nên khi thao tác Vdom với Snabbdom vẫn chưa chính xác. Ví dụ như với các element có class hay id thì sau khi render sẽ bị mất. Ở phần sau chúng ta sẽ cùng nhau giải quyết vấn đề này. Ngoài ra, phần sau cũng sẽ nói về lifecycle hooks, methods và components trong Vue.

Cảm ơn các bạn đã đọc bài viết của mình. Mong là bài viết đã giúp các bạn hiểu thêm về Vue 2.

[Nhấn vào đây để xem tiếp phần 4](https://viblo.asia/p/xay-dung-vue-cua-rieng-ban-chi-trong-300-dong-phan-4-gGJ59NbDKX2)