Come on! Có thể đây chính là phần cuối cùng của series này cho nên bài viết hôm nay có thể sẽ dài. Tuy nhiên rất các ơn các bạn đã quan tâm, theo dõi series này của mình. Trong tương lai, nếu các bạn muốn mình tiếp tục series này với ReactJS hay Angular thì hãy upvote, share và comment cho mình biết nhé!

Nếu các bạn vẫn chưa xem phần trước thì có thể xem [ngay tại đây](https://viblo.asia/p/xay-dung-vue-cua-rieng-ban-chi-trong-300-dong-phan-3-aWj537vb56m).

# Vấn đề với Snabbdom

Phần trước mình có nhắc đến "không ổn" khi sử dụng **Snabbdom** đó chính là các props như **class**, **id**, **placeholder**,... sẽ bị thiếu khi render. Hôm nay chúng ta sẽ đi thay đổi data của **Snabbdom** sao cho phù hợp với render function. Các bạn có thể xem ảnh bên dưới để thấy mình có khởi tạo class="heading" cho h1 và id="app" tuy nhiên sau khi render lại biến mất.

![](https://images.viblo.asia/e2faa389-8cf0-4710-b0c4-770121046b3d.png)


## Sự khác nhau giữa Vue và Snabbdom
Mình sẽ lấy ví dụ trên HTML sau

```html
<div id="app">
  <h1
    class="heading"
    :class="{ active: true }"
    style="color: red;"
    :style="{ 'margin-left': '50px' }"
  >
    {{ title }}
  </h1>
</div>
```

Và đây là kết quả mà render function trả về với template bên trên.

```javascript
function render() {
    with(this) {
        return _c('div', {
            attrs: {
                "id": "app"
            }
        }, [_c('h1', {
            staticClass: "heading",
            class: {
                active: true
            },
            staticStyle: {
                "color": "red"
            },
            style: ({
               'margin-left': '50px'
            })
        }, [_v(_s(title))])])
    }
}
```

Chúng ta sẽ thấy rằng Vue cố tình chia **class** và **style** ra thành 2 loại là static và dynamic. Tuy nhiên **Snabbdom** không hỗ trợ **staticClass** và **staticStyle** cho nên ở đây chúng ta sẽ phải chuyển **staticClass** và **staticStyle** về cùng nhà với **class** và **style**.

Tuy nhiên nhiêu đó vấn chưa là tất cả, **Snabbdom** còn không chịu nhận **id** như một **attribute** mà chúng ta phải đưa nó về nhà **props**. Tóm lại để render function chạy đúng với **Snabbdom** thì hàm render function nó nên như sau.

```javascript
function render() {
    with(this) {
        return _c('div', {
            props: {
                "id": "app"
            }
        }, [_c('h1', {
            class: {
                active: true,
                heading: true
            },
            style: ({
                'color': 'red',
                'margin-left': '50px'
            })
        }, [_v(_s(title))])])
    }
}
```

## Giải quyết

Và để làm được như vậy, chúng ta sẽ đi tạo ra hàm **createElement**.

```javascript
const createElement = (sel, data, children) => {
  if (Array.isArray(data)) {
    return _createElement(sel, {}, data)
  } else if (typeof data === 'object') {
    transformVNodeData(data)
    if (Array.isArray(children)) {
      return _createElement(sel, data, children)
    } else {
      return _createElement(sel, data)
    }
  } else {
    return _createElement(sel)
  }
}
```

Vì không phải lúc nào hàm **createElement** cũng gọi kèm **data** hay **children** cho nên mình phải kiểm tra xem khi nào thực sự có **data** thì mình mới tiến hành thay đổi. Và ở bên trên mình có gọi hàm **transformVNodeData** để thay đổi **data** có sẵn lại cho phù hợp với **Snabbdom**.

Hàm đó mình chỉ viết đơn giản như sau:
```javascript
export function transformVNodeData(data) {
  if (!data.class) {
    data.class = {}
  }

  if (data.staticClass) {
    data.staticClass.split(' ').forEach((className) => {
      data.class[className] = true
    })
  }

  if (!data.style) {
    data.style = {}
  }

  if (data.staticStyle) {
    data.style = Object.assign(data.style, data.staticStyle)
  }

  if (!data.props) {
    data.props = {}
  }

  if (data.domProps) {
    data.props = Object.assign(data.props, data.domProps)
  }

  if (data.attrs) {
    const domAttrs = ['id', 'placeholder']
    for (let i = 0, l = domAttrs.length; i < l; ++i) {
      if (data.attrs.hasOwnProperty(domAttrs[i])) {
        data.props[domAttrs[i]] = data.attrs[domAttrs[i]]
      }
    }
  }
}
```

Đại khái ý tưởng thì khá ngắn nhưng có lẽ do mình code dài dòng ¯\\\_(ツ)\_/¯ 

Sau đó mình sửa lại **initRender** như sau.

```javascript:vue/instance/render.js
...
export function initRender(vm) {
  ...
  const createElement = (sel, data, children) => {
    ...
  }
  vm._c = createElement
  ...
}
...
```

Yay~! Mọi thứ chạy đúng như mong đợi. Bạn có thể xem ảnh bên dưới và thấy là sau khi render các phần tử của chúng ta vẫn có đầy đủ **class** và **id**.

![](https://images.viblo.asia/a257141e-ea8c-4631-b23f-0d9476630969.png)

# Lifecycle hooks 
Một trong những thứ không thể thiếu của Vue đó chính là **Lifecycle hooks**. Và bây giờ chúng ta sẽ đi cài đặt nó.

Mình sẽ tạo một file mới để đảm nhiệm việc gọi hook như sau. Chỉ đơn giản là chúng ta kiểm tra xem trong options có người dùng có sử dụng hook đó hay không? Nếu có thì mình sẽ gọi ra và cũng apply con trỏ this cho biến môi trường vm.

```javascript:vue/instance/hook.js
export function callHook(vm, hook) {
  if (
    Object.prototype.hasOwnProperty.call(vm.$options, hook) &&
    typeof vm.$options[hook] === 'function'
  ) {
    vm.$options[hook].apply(vm)
  }
}
```

Sau khi đã có **callHook** thì việc còn lại chính là đặt nó lần lượt theo đúng lifecycle của nó thôi. 

Nếu bạn không nhớ có thể xem lại ảnh bên dưới để nhớ lại Vue lifecycle hooks.

![](https://images.viblo.asia/c88f76da-bce6-4186-8958-370c154e1fae.png)

Tương tự với ảnh mình sẽ gọi hook lần lượt như sau

```javascript:vue/instance/init.js
...
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options

    initRender(vm)
    callHook(vm, 'beforeCreate')
    initState(vm)
    callHook(vm, 'created')

    useEffect(vm._update.bind(vm))
  }
}
```

```javascript:vue/instance/render.js
...
import { callHook } from './hook'

export function initRender(vm) {
...
  vm._update = () => {
    const newVNode = vm._render.call(vm, createElement)
    if (vm.$vnode === null) {
      callHook(vm, 'beforeMount')
      if (vm.$el) {
        patch(vm.$container, newVNode)
      }
      vm.$vnode = newVNode
      callHook(vm, 'mounted')
    } else {
      callHook(vm, 'beforeUpdate')
      patch(vm.$vnode, newVNode)
      vm.$vnode = newVNode
      callHook(vm, 'updated')
    }
  }
}
```

Sau khi đã thêm lifecycle hook rồi thì bây giờ mình sẽ thử sử dụng xem như thế nào.

![](https://images.viblo.asia/0b5f1c47-1941-4ecc-9917-11600abaabfa.png)

Mình đã thêm vào Vue instance để console.log khi các hook được gọi và trong ảnh là kết quả, đúng như mình đã mong đợi.

Vậy là chúng ta thêm lifecycle hooks thành công! Tiếp theo chúng ta sẽ bước đến một phần khó hơn, đó chính là **Component**.

# Component
Phần này thì mình tự nghĩ ra cho nên có thể vẫn có một số trường hợp nào đó chạy không đúng, tuy nhiên nếu bạn có cách nào hay hơn hãy bình luận để cho mình biết nhé!

Ý tưởng của mình đơn giản chỉ là:
1. Nhận vào option của từng component.
2. Lúc được gọi createElement, mình kiểm tra **sel** có phải là một component hay không? nếu phải thì mình sẽ tiến hành xử lý riêng. Nếu không phải mình sẽ gọi lại **_createElement** như bình thường.
3. Trong lần render đầu tiên, xem có bao nhiêu component lặp lại. Tạo Vue instance tương ứng với component option đó, đẩy giá trị tương ứng vào props và lưu lại.
4. Ngược lại ở lần render thứ 2, mình lấy ra component tương ứng và đẩy giá trị mới theo props của component.

Cách mình cài đặt ý tưởng này như sau, các bạn có thể tham khảo.

```javascript:vue/instance/render.js
...
import { useEffect } from '../observer/dep'

import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'
import intersection from 'lodash/intersection'

export function initRender(vm) {
...
  if (vm.$options.components) {
    vm.$components = vm.$options.components
  }

  if (vm.$options.props) {
    vm.$props = vm.$options.props
  }

  vm.$componentInstance = {}
  vm.$onRenderComponentCount = {}

  const createElement = (sel, data, children) => {
    if (vm.$components && Object.keys(vm.$components).includes(sel)) {
      if (vm.$vnode) {
        vm.$onRenderComponentCount[sel] = vm.$onRenderComponentCount[sel] + 1 || 0
        vm.$onRenderComponentCount[sel] %= vm.$componentInstance[sel].length

        let instance = vm.$componentInstance[sel][vm.$onRenderComponentCount[sel]]

        if (typeof data === 'object') {
          if (data.attrs) {
            const props = intersection(Object.keys(data.attrs), instance.$props)
            for (let i = 0, l = props.length; i < l; ++i) {
              instance[props[i]] = data.attrs[props[i]]
            }
          }
        }

        return instance.$vnode
      } else {
        if (!vm.$componentInstance[sel]) {
          vm.$componentInstance[sel] = []
        }

        let componentOptions = cloneDeep(vm.$components[sel])

        if (typeof data === 'object') {
          if (data.attrs) {
            const props = intersection(Object.keys(data.attrs), componentOptions.props)
            const dataProps = {}
            for (let i = 0, l = props.length; i < l; ++i) {
              dataProps[props[i]] = data.attrs[props[i]]
            }
            componentOptions.data = merge(componentOptions.data, dataProps)
          }
        }

        let instance = new Vue(componentOptions)
        vm.$componentInstance[sel].push(instance)
        return vm.$componentInstance[sel][vm.$componentInstance[sel].length - 1].$vnode
      }
    } else {
      if (Array.isArray(data)) {
        return _createElement(sel, {}, data)
      } else if (typeof data === 'object') {
        transformVNodeData(data)
        if (Array.isArray(children)) {
          return _createElement(sel, data, children)
        } else {
          return _createElement(sel, data)
        }
      } else {
        return _createElement(sel)
      }
    }
  }
  
  ...

  if (vm.$options.template) {
    vm.$template = vm.$options.template
  }
  
  ...
}
...
```

# Lời kết
Vậy là chúng ta đã đi cài đặt hoàn thiện một Vue cho chính bản thân mình. Mình dùng **cloc** để đếm số dòng cho cả Vue thì chỉ 256 dòng. (một con số khá cool đối với developers)

![](https://images.viblo.asia/49978507-f4a4-4e2c-9c5f-6464903778bd.png)

Mọi hướng dẫn bên trên chỉ là phần khung, nếu các bạn muốn phát triển thêm thì có thể phát triển thêm cho nó. Đối với mình việc xây dựng Vue minimal này chỉ là để tự kiểm tra bản thân mình và cũng là cách để mình đi sâu hơn vào Vue. Mình không dám chắc toàn bộ những gì mình hướng dẫn giống với Vue 100% nhưng mình tin là ít nhất cách hoạt động cũng giống với Vue khoảng 70%.

Mình có đăng tải phần code hoàn thiện lên trên Github, các bạn có thể tham khảo thử. [rknguyen/vue-minimal-from-scratch](https://github.com/rknguyen/vue-minimal-from-scratch).

Series này đến đây cũng đã kết thúc rồi. Mình rất mong qua 4 phần mà mình chia sẻ, đã giúp được các bạn phần nào hiểu thêm về Vue 2.

Cảm ơn các bạn đã theo dõi và ủng hộ mình suốt 4 phần.

# Bonus
Mình có thử cài đặt một trang Todo List sử dụng chính Vue mà mình tự code. Nó nằm ở thư mục **test/index.html** ở repo phía trên. Phần core CSS và HTML mình lấy trên **codepen**. Mình chỉ tiến hành sửa lại phần khai báo **Vue** thôi.

Các bạn có thể xem demo [tại đây](http://todo.clgt.io/).