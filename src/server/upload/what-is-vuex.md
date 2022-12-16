Vuex là thư viện giúp quản lý trạng thái các component trong Vue.js, nó là nơi lưu trữ tập trung cho tất cả các component trong một ứng dụng.

![](https://images.viblo.asia/81a28b15-d78e-41d6-8b04-4461034fd62f.png)


### Các thành phần  trong Vuex

### I.  State – trạng thái

Vuex sử dụng một cây trạng thái duy nhất, đối tượng này sẽ chứa tất các trạng thái của ứng dụng.
Để sử dụng các trạng thái trong Vue component, chúng ta sẽ lấy các trạng thái và trả về trong thuộc tính computed của component:

```js
// let's create a Counter component
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```
Vuex cung cấp cơ chế giúp sử dụng store ở tất cả các component con từ component cha với tùy chọn store:
```js
const app = new Vue({
  el: '#app',
  // provide the store using the "store" option.
  // this will inject the store instance to all child components.
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```
Các component con có thể truy xuất store thông qua `this.$store`

```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```
#### The mapState Helper
Khi 1 component  cần sử dụng nhiều thuộc tính state, getter. Việc khai báo tất cả các thuộc tính có thể  lặp đi lặp lại k cần thiết. Để giải quyết vấn đề này, chúng ta có thể sử dụng helper `mapState` để tạo ra các hàm getter được tính toán cho chúng ta

```js
// in full builds helpers are exposed as Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // arrow functions can make the code very succinct!
    count: state => state.count,

    // passing the string value 'count' is same as `state => state.count`
    countAlias: 'count',

    // to access local state with `this`, a normal function must be used
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

Ta cũng có thể truyền một mảng chuỗi cho  `mapState`
```js
computed: mapState([
  // map this.count to store.state.count
  'count'
])
```

### II. Getter – bộ lọc trạng thái

Đôi khi chúng ta cần lấy các trạng thái dựa vào việc tính toán, filter các trạng thái được cung cấp bởi kho lưu trữ.

```js
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```
Nếu có nhiều component, có thể định nghĩa getter trong store để thực hiện.
  ```js
  const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```
#### Property-Style Access
Bạn có  thể truy xuất các trạng thái đã được filter  bằng cách sử dụng cú pháp 

```js 
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }] 
```

Getters cũng sẽ nhận các getters khác làm đối số thứ 2:

```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}

store.getters.doneTodosCount // -> 1
```
Bây giờ  ta có thể dễ dàng sử dụng nó bên trong bất kỳ component nào:

```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```
#### Method-Style Access

Bạn cũng có thể truyền đối số tới getters bằng cách trả về một hàm. Điều này đặc biệt hữu ích khi bạn muốn truy vấn một mảng trong store.

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}

store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

#### The mapGetters Helper
`mapGetters ` Hiểu đơn giản là ánh xạ các thuộc tính  store getters:
```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```
Nếu bạn muốn ánh xạ một getter đến một tên khác, có thể sử dụng như sau,
```
...mapGetters({
  // map `this.doneCount` to `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```


###III. Mutations – thay đổi trạng thái
Trạng thái không thể thay đổi trực tiếp mà chỉ được thay đổi thông qua commit, Vuex mutation tương tự như các events, mỗi mutation có kiểu chuỗi và một handler. Handler function là nơi chúng ta thực hiện các thay đổi trạng thái và nó cần được truyền vào tham số đầu tiên là state.
```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // mutate state
      state.count++
    }
  }
})
```

Bạn không thể gọi trực tiếp một handler của mutation, mà cần phải được thực hiện bằng cách sử dụng `store.commit`

```js
store.commit('increment')
```
Có thể truyền thêm tham số cho các handler trong mutation:

```js
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}

store.commit('increment', 10)
```

### IV. Action – hành động

Action cũng gầm giống mutation, có một vài điểm khác biệt
- Thay vì thay đổi trạng thái, action commit các thay đổi.
- Action có thể chứa các hoạt động không đồng bộ.

VD:
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

Ta có thể gọi `context.commit `để commit một thay đổi hoặc truy xuất trạng thái và getter thông qua `context.state` và `context.getter`

 Các action sẽ được trigger khi sử dụng phương thức `store.dispatch`
 
 ```js
 store.dispatch('increment')
 ```
 
Nếu chúng ta muốn tăng trạng thái count , tại sao không gọi ` store.commit(‘increment’) ` trực tiếp? Lưu ý rằng, `mutation` cần phải đồng bộ, nhưng với `action` thì không, chúng ta thực hiện các hoạt động không đồng bộ trong một `action`.

```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

Link docs: https://vuex.vuejs.org/en/intro.html

Example: https://jsfiddle.net/tuanvh/nqbpxnco/1/