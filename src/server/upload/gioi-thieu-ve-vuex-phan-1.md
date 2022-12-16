Tiếp tục với chuỗi ngày thử mày mò với Vuejs thì hôm nay mình sẽ giới thiệu đến Vuex. Nếu ai đã biết đến khái niệm store trong Redux - nơi lưu trữ global state của ứng dụng thì Vuex cũng có chức năng như vậy thôi :smile: . Trong bài này mình chỉ giới thiệu cơ bản về lý thuyết cũng như concept của Vuex. Mong rằng đến bài sau thì mình đã có thể thành thạo hơn để làm ví dụ nho nhỏ.
# Vuex là gì?
Nếu bạn đã có cơ hội làm việc với bất kỳ thư viện hay framework Javascript nào thì có thể rằng đã nghe đến khái niệm store. Store được coi rằng là chìa khóa để có thể tạo nên các ứng dụng, trang web trong framework Javascript. Store cung cấp cho bạn khả năng kiểm soát ứng dụng web ngày càng có xu hướng phình to, khổng lồ. Việc sử dụng store cho phép bạn tổ chức, quản lý state hiệu quả hơn.

State của website là thứ cần thiết để tăn tính tương tác với người dùng. Có thể bạn đã biết đến việc dùng props để gửi dữ liệu xuống component con hay sử dụng emit để gửi lại dữ liệu cho component cha. Những gì bạn đang làm chính là quản lý state. 

Việc theo dõi cũng như là quản lý state cho trang web là một điều rất quan trong. Và để hỗ trợ cho công việc như vậy thì chúng ta có Vuex.
# Tại sao lại nên sử dụng Vuex
Vue không giới hạn bạn sử dụng một store cụ thể nào. Hiện taị có rất nhiều store sẵn có cho phép chúng ta sử dụng để quản lý state. Có thể bạn biết đến Redux là một thư viện quản lý state phổ biến với những ứng dụng sử dụng React. Thế chả có nhẽ chúng ta lại đi sử dụng Redux với một ứng dụng Vue, không phải là không thể mà hãy xem Vuex có thể làm tốt hơn không đối với ứng dụng Vue.

Cả Redux và Vuex đều được xây dựng với cảm hứng từ mô hình Flux. Còn với Vuex thì nó còn được xây dựng để tận dụng các tính năng được Vue cung cấp. Việc tận dụng cũng như bám sát những tính năng mà Vue đã xây dựng chắc chắn sẽ tốt hơn là chúng ta cứ chăm chăm sử dụng Redux.

Điều khiến cho Vuex trở nên mạnh mẽ hơn chính là các component lấy state của chúng từ Vuex store và có thể phản ứng cũng như cập nhật một cách tức thời bất kỳ khi nào state trong store thay đổi.

# Khi nào thì nên sử dụng Vuex
Mặc dù Vuex giúp chúng ta thực hiện việc quản lý state, nhưng nó cũng đi kèm với sự đánh đổi cho hiệu suất ứng dụng. 

Nếu bạn chưa bao giờ xây dựng một ứng dụng SPA có quy mô lớn và nhảy vào ngay với Vuex thì bạn có thể cảm thấy dài dòng và nản chí. Với một ứng dụng quy mô nhỏ thì thật là không cần thiết để sử dụng Vuex. Nhưng nếu bạn đang xây dựng một SPA có quy mô từ trung bình hoặc lớn thì với những tình huống khiến bạn phải mất nhiều thời gian suy nghĩ hơn để xử lý state của ứng dụng thì có thể rằng điều bạn cần chính là Vuex. 

Vuex mạnh mẽ, hiệu quả cũng như quản lý rất nhiều thứ cho chúng ta nhưng đấy không thể là điều thôi thúc chúng ta luôn sử dụng nó trong mọi vấn đề. 

# Concepts
Ở phần này mình tập trung bám sát nội dung được đưa ra tại trang chủ của Vuex. Các ví dụ cũng như giải thích trong đấy cũng tương đối dễ hiểu nên mình sẽ dùng luôn chúng trong phần này.
![](https://images.viblo.asia/451c93b7-4e42-4e3a-9447-3bdcbc6b9f16.png)
## State
Vuex sử dụng `single state tree` nó là một object duy nhất bao gồm tất cả state ứng dụng. Điều này có nghĩ là thông thường bạn chỉ có 1 store cho mỗi ứng dụng. Sigle state tree giúp dễ dàng xác định vị trí state cụ thể và cho phép chúng ta snapshot cho state hiện tại để debug.

Có 2 cách để hiển thị state trong store trên component là:
```js
// Computed property

const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```
Hoặc sử dụng cơ chế `inject` store vào tất cả các component con sử dụng tùy chọn `store` trong root component.
```js
// Root component

const app = new Vue({
  el: '#app',
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})

// Count component
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```
Với một component sử dụng nhiều state được lấy thì store thì có vẻ hơi dư thừa khi sử dụng như sau:
```js
state: {
   name: 'Hieu',
   age: '24'
}
```
Chúng ta cần các computed property được khai báo riêng biệt như sau:
```js
computed: {
    name () {
        return this.$store.state.name
    },
    age () {
        return this.$store.state.age
    }
}
```
Để cho đơn giản thì chúng ta có thể dùng helper `mapState` để tạo ra các hàm `computed getter` như sau:
```js
// Sử dụng object có key
computed: mapState({
    customName: 'name',
    customAge: 'age'
  })
  
  // Sử dụng mảng
  computed: mapState([
  'name',
  'age'
])
```
## Getters
Tương tự như `computed property` thì `getters` chính là để tính toán các thuộc tính trong store. 

Ví dụ với getters dùng để lọc các state có giá trị `done` là  `true`:
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
Ngoài việc tham số thứ nhất truyền vào getters là state thì ta cũng có thể truyền vào 1 getters khác để làm tham số:
```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
```
Truyền đối số cho getters bằng cách trả về 1 hàm:
```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
...
store.getters.getTodoById(2)
```
Tương tự như state thì chúng ta cũng có `mapGetters`:
```js
computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
```
## Mutations
Để thay đổi state ta cần thực hiện mutations. Mỗi mutation có một chuỗi `type` và `handler`.

Gỉa sử mutations như sau:
```
mutations: {
    ADD_LINK: (state, link) => {
      state.links.push(link)
    }
  },
```
Để commit mutation trong component ta có thể dùng `this.$store.commit('ADD_LINK')` hoặc sử dụng `mapMutations`:
```js
methods: {
    ...mapMutations([
      'ADD_LINK'
    ])
  }
```
## Actions
Gọi trực tiếp mutations trong component là cho các sự kiện đồng bộ. Nếu thực hiện chức năng không đồng bộ thì bạn sử dụng actions.

Gỉa sử chúng ta có một action đơn giản như sau:
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
Phát action sử dụng `store.dispatch`:
```js
store.dispatch('increment')
```
Để phát đi một hành động từ component ta dùng `this.$store.dispatch('xxx')` hoặc dùng helper là `mapActions`.
```js
methods: {
    ...mapActions([
      'increment', // map `this.increment()` to `this.$store.dispatch('increment')`

      // `mapActions` also supports payloads:
      'incrementBy' // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // map `this.add()` to `this.$store.dispatch('increment')`
    })
  }
```
Sử dụng `async/await` để thực hiện các action không đồng bộ.
```js
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // wait for `actionA` to finish
    commit('gotOtherData', await getOtherData())
  }
}
```
# Tạm kết
Đến đây thì mình cũng muốn viết thêm về phần modules cũng trong concepts của Vuex và thêm một ví dụ nhỏ ứng dụng Vuex nhưng mà hình như có vẻ bài hơi dài nên mình tạm dừng ở đây. Ở bài sau mình sẽ viết nốt phần còn lại. Vì mình mới tìm hiểu về Vue cũng như Vuex nên có thể kiến thức còn chưa ổn và cách diễn đạt hơi khó hiểu, mong mọi người thông cảm (bow).