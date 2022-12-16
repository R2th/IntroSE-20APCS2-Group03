# Vuex là gì?

Vue hoạt động theo mô hình "Luồng dữ liệu một chiều" với các thành phần sau:

State: Trạng thái, là nơi khởi nguồn để thực hiện ứng dụng.

View: Khung nhìn, là các khai báo ánh xạ với trạng thái.

Action: Hành động, là những cách thức làm trạng thái thay đổi phản ứng lại các nhập liệu của người dùng từ View
![](https://images.viblo.asia/14074fe1-8b35-42bc-9e1f-edfe4908861e.png)

Tuy nhiên, mô hình này bị phá vỡ khi chúng ta có rất nhiều các component cùng chia sẻ một trạng thái:
Nhiều view cùng phụ thuộc vào một trạng thái nào đó.
Các hành động từ các view khác nhau cần thay đổi cùng dữ liệu trạng thái.
Vuex nhìn thấy tại sao không đưa các trạng thái được chia sẻ của các component ra và quản lý chúng trong một bộ máy toàn cục, và đó chính là lý do cho sự ra đời của Vuex. Trong đó, các component trở thành các view và các component có thể truy xuất trạng thái hoặc trigger các hành động. Với cách thức này, mã nguồn có cấu trúc và dễ dàng duy trì.
# Các khái niệm cơ bản của vuex
## State
Vuex sử dụng một cây trạng thái duy nhất, đối tượng này sẽ chứa tất các trạng thái của ứng dụng, như vậy bạn chỉ có duy nhất một kho lưu trữ cho mỗi ứng dụng, điều này làm cho việc xác định các trạng thái là dễ dàng và cũng đơn giản trong việc tạo ra các ảnh chụp trạng thái (snapshot) của ứng dụng hiện tại. Khái niệm cây trạng thái duy nhất không làm mất đi tính module hóa, trong các phần tiếp theo chúng ta sẽ tìm hiểu cách chia nhỏ các trạng thái và thay đổi chúng trong các module con.
Để sử dụng các trạng thái trong Vue component, chúng ta sẽ lấy các trạng thái và trả về trong thuộc tính computed của component:
```
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
Mỗi khi store.state.count thay đổi, thuộc tính computed sẽ được tính toán lại và một trigger được tạo ra cho các DOM liên quan. Trong ứng dụng thiết kế dạng module, cần import store ở những nơi component sử dụng trạng thái. Vuex cung cấp cơ chế giúp sử dụng store ở tất cả các component con từ component gốc với tùy chọn store:
```
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
Các component con có thể truy xuất store thông qua this.$store
```
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```
## Getter
Đôi khi chúng ta cần lấy các trạng thái dựa vào việc tính toán, lọc bỏ các trạng thái được cung cấp bởi kho lưu trữ, ví dụ:
```
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```
Nếu nhiều component cần làm điều này, chúng ta có thể định nghĩa getter trong store để thực hiện.
```
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
Khi đó chúng ta có thể truy xuất các trạng thái đã được lọc này bằng cách sử dụng cú pháp state.getter.doneTodos.
## Mutation

Trạng thái không thể thay đổi trực tiếp mà chỉ được thay đổi thông qua commit, Vuex mutation tương tự như các sự kiện, mỗi mutation có kiểu chuỗi và một handler. Handler function là nơi chúng ta thực hiện các thay đổi trạng thái và nó cần được truyền vào tham số đầu tiên là state.
```
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
Bạn không thể gọi trực tiếp một handler của mutation, cách thức gọi các handler này sẽ giống như việc đăng ký các sự kiện: “Khi mutation với dạng increment được trigger, gọi đến handler này”, cách thức này được thực bằng cách sử dụng store.commit
```
store.commit('increment')
```
Bạn có thể truyền thêm tham số cho các handler trong mutation:
```
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
```
## Action
Action cũng tương tự như mutation, tuy nhiên có một vài điểm khác biệt

Thay vì thay đổi trạng thái, action commit các thay đổi.
Action có thể chứa các hoạt động không đồng bộ.
Chúng ta cùng xem ví dụ một action đơn giản như sau:
```
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
Các handler của action nhận đầu vào là đối tượng context có các phương thức và thuộc tính giống với instance của store, do vậy chúng ta có thể gọi context.commit để commit một thay đổi hoặc truy xuất trạng thái và getter thông qua context.state và context.getter. Các action sẽ được trigger khi sử dụng phương thức store.dispatch
```
store.dispatch('increment')
```
Có vẻ như hơi rườm rà, nếu chúng ta muốn tăng trạng thái count , tại sao không gọi store.commit(‘increment’) trực tiếp? Chú ý rằng, mutation cần phải đồng bộ, nhưng với action thì không, chúng ta thực hiện các hoạt động không đồng bộ trong một action.
```
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```
## Module
Vuex sử dụng cây trạng thái duy nhất, tất cả các trạng thái của ứng dụng được đưa vào một đối tượng, như vậy khi ứng dụng phát triển lên, store có thể phình lên rất nhiều. Vuex cho phép chia nhỏ store thành các module nhỏ hơn, mỗi module cũng có state, mutation, action, getter và thậm chí còn cho phép các module lồng nhau.
```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> `moduleA`'s state
store.state.b // -> `moduleB`'s state
```
Chú ý, các mutation và getter, tham số đầu tiên sẽ là state cục bộ của module:
```
const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // `state` is the local module state
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```
state toàn cục sẽ được truyền vào tham số với tên là rootState
```
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```
# Lời kết
Hi vọng các bạn hiểu thêm về vuex qua bài viết

Tài liệu tham khảo
https://vuex.vuejs.org/