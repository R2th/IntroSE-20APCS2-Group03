## Vue Devtools
Vue Devtools là một extension Chrome để dubugg các ứng dụng Vue. Nó công cụ tuyệt vời giúp bạn theo dõi code, data. 
![](https://images.viblo.asia/400b32eb-f1a1-4b9d-a2fb-a7b4f5f5d371.png)
Với Devtools, bạn có thể nhìn thấy components, vuex, events,.... Bạn có thể xem và thay đổi dữ liệu trực tiếp.
Nếu đang code Vue mà chưa có dùng Devtools thì nên cài đặt nó nhé.
## Computed và methods, watched
Có bao giờ bạn thấy nhầm lẫn giữa computed và methods, computed và watched, không biết khi nào thì dùng computed, khi nào thì dùng methods hay khi nào dùng watched. Mới đầu mình cũng chẳng biết phân biệt được computed với method và watched như nào đâu. Sau một thời gian thì mình cũng vỡ ra được chút chút nên chia sẻ luôn cho m.n. 
* Computed thực chất là property, với computed bạn có thể xử lý dữ liệu trong data theo ý muốn. Nó chỉ xử lý được với dữ liệu đã khai báo trong data. Nó sẽ thay đổi giá trị khi giá trị trong data thay đổi. Và computed không nhận paramters. Computed được lưu cache, nó chỉ thực thi lại khi dữ liệu bên trong data thay đổi.
```
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage() {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})
```
* Methods là function của Vue instance. Nó chỉ thực thi khi bạn call, nó giống với function của javascript và nó nhận paramaters. Methods khác với computed một điểm nữa là nó không được lưu cache.
```
<p>Reversed message: "{{ reverseMessage('Hello') }}"</p>
// in component
methods: {
  reverseMessage(message) {
    return message.split('').reverse().join('')
  }
}
```
* Vue cũng cung cấp thêm một property nữa để quan sát và xử lý sự thay đổi của data đó là watch property. Như vậy ta thấy watched và computed tương tự đúng không, chúng cùng thực thi khi dữ liệu trong data thay đổi. Tuy nhiên vơi computed thì không yêu cầu cú pháp và còn với watched, nó yêu cầu: tên của watcher trùng với tên của data mà nó theo dõi.
```
<div id="demo">{{ fullName }}</div>
```
Với watched
```
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
```
Với computed
```
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```
## Vuex
Khi làm VueJs đừng bỏ qua Vuex, nó sẽ giúp quản lý các state trong ứng dụng hiệu quả.

Vuex là một mô hình để quản lý state và thư viện của ứng dụng Vue. Định nghĩa này khó hiểu đúng không m.n, nôm na theo mình hiểu thì Vuex nó sẽ lưu state và state này sẽ không thay đổi, nó sẽ được gọi ra ở các component trong ứng dụng, nó giống như một biến local đó. State chỉ có thể được thay đổi theo kiểu có thể dự đoán.
Vuex có 5 Core Concepts sau:
* State: Vuex sử dụng một cây trạng thái duy nhất. Đối tượng này chứa tất cả state level ứng dụng của bạn và phục vụ như là "single source of truth". Điều này cũng có nghĩa là bạn thường chỉ có một store cho mỗi ứng dụng.
* Getters: Đôi khi chúng ta cần dữ liệu state đã qua tính toán chứ không phải state ban đầu của store, getters sẽ giúp chúng ta điều này. Thành phần này đóng vai trò giống như computed trong component mà mình vừa nói ở trên.
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
* Mutations: Cách duy nhất để thực sự thay đổi state trong store Vuex là thực thi một mutation. Vuex mutation giống như event, nó sẽ bao gồm 1 string type và 1 handler. Vì nó để thay đổi state nên rõ ràng đầu vào của handler function chắc chắn có state rồi.
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
* Actions: actions tương tự như mutation, nhưng nó không thay đổi state trực tiếp, mà nó thay đổi state thông qua commit mutation. Nó còn có thể chứa các hành động bất đồng bộ (asynchronous), điều này thì mutation không cho phép.
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
* Modules: Khi mà ứng dụng có quá nhiều state, như vậy store sẽ phình to và sẽ rối, nên cần phân chia store lại cho phù hợp, và đây là việc của modules. Mỗi module có thể chứa state, mutations, actions, getters, thậm chí là lồng nhau:
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
## Tài liệu tham khảo
https://vuejs.org/v2/guide/computed.html

https://vuex.vuejs.org/
## Lời kết
Đây chỉ là những gì mình học và tìm hiểu được, có thể nó chưa hoàn toàn chính xác về ngôn ngữ (có thể có cả kiến thức ^.^) m.n đọc có thấy thì có thể comment, mình sẽ tham khảo và chỉnh sửa.