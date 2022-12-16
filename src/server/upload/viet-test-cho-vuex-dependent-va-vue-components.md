# Lịch sử
Theo **Mirko Jotic** tác giả của 1 bài viết mình đã đọc có nói là:
Một khoảng thời gian trước (cụ thể là mấy tháng trước :D) ổng có làm việc với project và ông phải viết rất là nhiều code JavaScript trong project đó.
Ổng cứ tập trung code code code và code cho tới khi nhận ra **"Mình code thiếu Unit Test cho project"** chắc là vì điều này làm ông hơi buồn.

Rồi không biết bao lâu sau ông đã nhận ra là testing rất quan trọng và độ ưu tiên nó rất rất cao thế là ông bắt đầu đi tìm hiểu và học nó. Và ông đã tìm ra **Karma**, **Mocha**, **Chai** and **Sinon.JS** là những gói test cần thiết cung cấp những thứ mà chúng ta cần.

Tưởng như mọi chuyện suôn sẻ, ông đã gặp 1 số vấn đề cho tới khi ông test các Component và nó có tuơng tác với **APIs**, **Vuex** và **Sọckéts**. Vì lý do đó mà ông đã quyết định viết 1 ví dụ đơn giản để giải quyết vấn đề đó và mình cũng là 1 trong số người đọc đã đọc được bài viết của ông và mình đang kể lại cho các bạn những gì mình hiểu được trong bài viết đó.

# Bắt đầu
Trong bài viết này chúng ra sẽ sử dụng Vue-CLI dùng để tạo project và cấu hình môi trường.
Các bạn chạy lệnh sau
```
$ npm install -g vue-cli
$ vue init webpack my-project
$ cd my-project
$ npm install
```

Sau đó bạn có thể chạy lệnh dưới để kiểm tra xem project bạn vừa tạo có chạy OK hay không.
```
$ npm run dev
```

Bạn cũng thể lệnh dưới để chạy môi trường Test

```
$ npm test run
```


# Cài đặt Vuex
Rất đơn giản:

```
$ npm install --save vuex
```

Tác giả có nói là trước ông sử dụng `PhantomJS` cho Karma nhưng sau đó ông chuyển sang dùng `Promise polyfill` để Vuex hoạt động được

```
$ npm install --save-dev es6-promise
```

OK, như vậy là đã install hoàn tất Vuex vào project của bạn
Và chúng ta sẽ tạo cấu trúc cho thư mục `src/store` và các 1 số file với nội dung sau:
```
index.js
----------------------------------------

require('es6-promise').polyfill()
import Vue from 'vue/dist/vue.common.js'
import Vuex from 'vuex/dist/vuex.js'

Vue.use(Vuex)

import * as types from './mutation-types'
import * as actions from './actions'
import * as getters from './getters'

const state = {
  items: []
}

const mutations = {
  [types.setItems] (state, items) {
    state.items = items
  }
}

const options = {
  state,
  mutations,
  actions,
  getters
}

export default new Vuex.Store(options)
export { options }
```
```
mutation-types.js
----------------------------------------

export const setItems = 'SET_ITEMS'
```
```
actions.js
----------------------------------------

import * as types from './mutation-types'
import api from './api'

export const setItems = ({commit}) => {
  api.getItems()
    .then((items) => {
      commit(types.setItems, items)
    })
    .catch((err) => console.log(err))
}
```
```
getters.js
----------------------------------------

export const items = state => {
  return state.items
}
```
```
api.js ( api service )
----------------------------------------

export default {
  getItems: function () {
    return new Promise((resolve, reject) => {
      // imagine we're making an API request here
      const response = require('./items.json')
      resolve(response.body)
    })
  }
}
```
```
items.json ( our imaginary API )
----------------------------------------

{
  "body": [
    "coffee",
    "sugar",
    "water"
  ]
}
```

**Vuex** cũng có thể cài đặt chỉ trong 1 file duy nhất những nó sẽ rất chi là lộn xộn và trở nên khó khăn nếu bạn muốn custom nó. OK

https://vuex.vuejs.org/en/ đây là link **Documentation** về Vuex nếu bạn nào chưa biết về Vuex.

Như vậy chúng ta đã cài đặt xong Vue store cơ bản và bây giờ phải `include` nó vào Vue App
```
src/main.js
----------------------------------------
...
import store from './store'
...

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
```

# Tạo Vue components
Tạo file `src/components/Items.vue` có nội dung là:
```
<template>
  <ul>
    <li v-for="(item, index) in items" :key="index" class="items">
      {{ item }}
    </li>
  </ul>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    mounted () {
      this.setItems()
    },
    methods: {
      ...mapActions(['setItems'])
    },
    computed: {
      ...mapGetters(['items'])
    }
  }
</script>
```

**MapActions** và **mapGetters** ở đây là cách tiện lợn để inject các `actions` và `getters` lại vào component thay vì phải sư dụng `this.$store.dispatch(‘setItems’)` hoặc `this.$store.state.items`.

# Viết Unit Tests cho Vue Component
Đầu tiên tạo 1 file file `test/unit/specs/Items.spec.js` với nội dung là:

```
require('es6-promise').polyfill()
import Vue from 'vue/dist/vue.common.js'
import Vuex from 'vuex/dist/vuex.js'
import store from '../../../src/store'
import Items from '../../../src/components/Items.vue'

describe('Items.vue', () => {
  it('test initial rendering with api', (done) => {
    const vm = new Vue({
      template: '<div><test></test></div>',
      store,
      components: {
        'test': Items
      }
    }).$mount()

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.querySelectorAll('.items').length).to.equal(3)
        done()
      })
      .catch(done)
  })
})
```

Test case này chúng ra `mounting` Vue instance với component `<test></test>`
Sau khi ứng dụng được gắn kết với `component`, và trong `mouting hook`, chúng ta gửi tác vụ Vuex và request API tiếp theo.

Chúng ta sử dụng `Vue.nextTick ()` vì DOM cập nhật bất đồng bộ và nếu chúng ta không sử dụng thì DOM không được cập nhật tại thời điểm đó.

Case test sẽ `pass` vì API chỉ đọc từ một tệp, nhưng khi chúng ta thêm một mảng `item` khác vào `src/store/items.json` thì nó sẽ thất bại.

So what we need to do is mock up the src/store/api.js service. For this we’re going to use inject-loader. So the first thing we need to do is install it:

Vì vậy, những gì chúng ta cần làm là giả lập `src/store/api.js`. Chúng ra sẽ sử dụng `inject-loader`.

```
$ npm install inject-loader@^2.0.0
```

Khi cài đặt xong chúng ra sẽ viết lại `test/unit/specs/Items.spec.js` như sau:

```
equire('es6-promise').polyfill()
import Vue from 'vue/dist/vue.common.js'
import Vuex from 'vuex/dist/vuex.js'
import Items from '../../../src/components/Items.vue'
import * as types from '../../../src/store/mutation-types'
import * as getters from '../../../src/store/getters'

describe('Items.vue', () => {
  it('test initial rendering with mock data', (done) => {
    const actionsInjector = require('inject-loader!../../../src/store/actions')
    const actions = actionsInjector({
      './api': {
        getItems () {
          return new Promise((resolve, reject) => {
            const arr = ['Cat', 'Dog', 'Fish', 'Snail']
            resolve(arr)
          })
        }
      }
    })

    const state = {
      items: []
    }

    const mutations = {
      [types.setItems] (state, items) {
        state.items = items
      }
    }

    const options = {
      state,
      mutations,
      actions,
      getters
    }

    const mockStore = new Vuex.Store(options)

    const vm = new Vue({
      template: '<div><test></test></div>',
      store: mockStore,
      components: {
        'test': Items
      }
    }).$mount()

    Vue.nextTick()
      .then(() => {
        expect(vm.$el.querySelectorAll('.items').length).to.equal(4)
        done()
      })
      .catch(done)
  })
})
```

Chúng ta đã thay thế object API bằng cách trả về dữ liệu nhất quán trong các case test.

Và bây giờ tất cả những gì chúng ta phải làm là chạy:

```
$ npm test run
```

Và tận huơng kết quả!!

# Tham khảo
https://alligator.io/vuejs/testing-vuex-vue/