Xin chào các bạn, lại là mình đây. Nếu các bạn chưa xem phần trước thì mình khuyên các bạn nên xem sau đó mới đọc bài này. Các bạn có thể xem ngay [tại đây](https://viblo.asia/p/xay-dung-vue-cua-rieng-ban-chi-trong-300-dong-phan-1-WAyK82VElxX).

Ở phần trước chúng mình đã cùng tìm hiểu và cũng đã cài đặt được Reactivity System. Tuy nhiên ở phần này chúng ta chỉ đi vào việc khởi tạo, chuẩn bị thôi, phần sau thì chúng ta mới bắt đầu áp dụng vào nhé.

# Bước đầu xây dựng Vue của riêng mình
Ở phần này thì mình sẽ bắt tay vào bước đầu khai báo và chuẩn bị một số thứ cho Vue minimal của bản thân.

## Chuẩn bị môi trường development

Cài đặt **browserify**, **esmify**, **tinyify** để build bundle.
```
yarn add browserify esmify tinyify
```

Cài đặt **jest** để testing.
```
yarn global add jest
```

## Khởi tạo Vue

### Cấu trúc folder

```
vue-minimal
|--tests
|--|--data.spec.js
|--vue
|--|--instance
|--|--|--index.js
|--|--|--init.js
|--|--|--state.js
|--|--observer
|--|--|--index.js
|--|--index.js
```

Trong đó:
* Thư mục **vue/instance** sẽ lưu những thứ liên quan đến instance của Vue.
* Thư mục **vue/observer** sẽ lưu những gì liên quan đến quan sát sự thay đổi của state.

### Thực hiện
Ở phần này mình sẽ chỉ hướng dẫn các bạn bước đầu chuẩn bị cho một cái Vue instance và viết unit tests.

Mình sẽ tiến hành khai báo Vue instance, nhận vào options và tiến hành init cho options được nhận vào.

```javascript:vue/instance/index.js
import { initMixin } from './init'

export function Vue(options) {
  this._init(options)
}

initMixin(Vue)
```

Hàm **initMixin** sẽ tiến hành đi chuẩn bị các prototype cho Vue, ví dụ như **Vue.\_init** cũng là một prototype được chuẩn bị trong initMixin.

```javascript:vue/instance/init.js
import { initState } from './state'

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options

    initState(vm)
  }
}
```

Ở bên trong **Vue.\_init**, chúng ta sẽ tiến hành các bước như sau:
1. Lưu lại options để sử dụng sau này.
2. Tiến hành khởi tạo các state.

```javascript:vue/instance/state.js
import { defineReactiveData } from '../observer/index'

export function initState(vm) {
  const opts = vm.$options
  if (opts.data) {
    initData(vm)
  }
}

function initData(vm) {
  let data = vm.$options.data
  vm.$data = data

  defineReactiveData(vm)
}
```

Ở tại phần này, mình sẽ bắt gặp một hàm mà đã nhắc tới ở phần trước đó là **defineReactiveData**. Tuy nhiên **defineReactiveData** lần này sẽ không có **Dep** vì chúng ta chưa cần dùng đến, bây giờ mình chỉ cần đảm bảo được sự đồng bộ giữa **vm.foo** và **vm.$data.foo**.

Trong đó **vm** chính là instance mà khi mình **new Vue** và **vm.$data** chính ra data được lấy ra từ **options** mà mình lưu lại ở hàm **initData**.

Vì thế mà lúc này **defineReactiveData** của chúng ta sẽ chỉ trông như thế này.

```javascript:vue/observer/index.js
export function defineReactiveData(vm) {
  Object.keys(vm.$data).forEach((key) => {
    defineProxy(vm, key)
  })
}

export function defineProxy(vm, key) {
  Object.defineProperty(vm, key, {
    get: function reactiveGetter() {
      return vm.$data[key]
    },
    set: function reactiveSetter(_value) {
      vm.$data[key] = _value
    },
  })
}
```

Đến đây thì chúng ta được hoàn thành được bước đầu khởi tạo Vue instance.

### Build Vue ra bundle
Code xong thì mình phải build nó ra bundle để sử dụng được. Các bạn sẽ chạy lệnh sau đây để tiến hành build Vue của chúng ta ra bundle như một module để chúng ta có thể import và sử dụng.

```
browserify --s module vue/index.js -p esmify -p tinyify > dist/vue.js
```

## Viết unit tests cho Vue instance
Mình thường sử dụng **Jest** để viết unit tests, cho nên lần này mình cũng sẽ sử dụng **Jest**.

Mình sẽ chỉ kiểm tra 2 việc sau:
1. Giá trị của vm.foo phải giống với vm.$data.foo.
2. Khi vm.foo cập nhật thì vm.$data.foo cũng phải được cập nhật.

```javascript:tests/data.spec.js
const Vue = require('../dist/vue.min').default

test('vm.foo should be same with vm.$data.foo', () => {
  const vm = new Vue({
    data: {
      foo: 1012,
    },
  })
  expect(vm.foo).toBe(1012)
})

test('update vm.foo, vm.$data.foo should be update too', () => {
  const vm = new Vue({
    data: {
      foo: 1012,
    },
  })
  vm.foo = 1210
  expect(vm.$data.foo).toBe(1210)
})
```

Để chạy test mình sẽ dùng lệnh

```
jest
```

Sau khi chạy chúng ta sẽ thu được kết quả như hình bên dưới.
![](https://images.viblo.asia/346da4f6-f4ec-492c-af80-d7ff2364bb76.png)

Sau khi chạy unit tests, nếu bạn nhận được là **PASS** thì có nghĩa là bạn đã hoàn thành bước đầu khởi tạo cho mình một Vue instance.

# Lời kết
Trong phần 2 này mình đã hướng dẫn các bạn chuẩn bị cho Vue của riêng mình và viết unit tests để kiểm tra Vue instance có hoạt động đúng ý của mình hay không.

Ở phần sau, mình sẽ tiếp nói về VNode, từ VNode render ra DOM HTML như thế nào? Khi state cập nhật thì DOM cũng sẽ cập nhật như thế nào nhé!

Cảm ơn các bạn đã đọc phần 2 này. Mình mong là nó sẽ giúp cho bạn hiểu thêm về Vue.

[Nhấn vào đây để xem tiếp phần 3](https://viblo.asia/p/xay-dung-vue-cua-rieng-ban-chi-trong-300-dong-phan-3-aWj537vb56m)