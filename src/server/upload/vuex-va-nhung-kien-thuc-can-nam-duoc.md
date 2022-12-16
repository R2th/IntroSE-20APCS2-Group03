* Vuex là thư viện giúp quản lý trạng thái các component trong Vue.js, nó là nơi lưu trữ tập trung cho tất cả các component trong một ứng dụng.
* Nó là một công cụ vô cùng hữu ích để hướng tới xây dựng các ứng dụng SPA (single-page application).
* Và hôm nay mình sẽ giới thiệu đến các bạn những kiến thức cơ bản cần nắm được nếu các bạn muốn xây dựng 1 dự án với Vuex
# THÀNH PHẦN CỐT LÕI
- Vuex bao gồm 5 thành phần cốt lõi đó là : State, Getter, Mutations, Actions, Modules.

## State - trạng thái
- Vuex sử dụng 1 cây trạng thái duy nhất - nghĩa là đối tượng này chứa tất cả trạng thái cung cấp cho ứng dụng của bạn.

### Đưa Vuex State vào trong Vue Components
- Vậy làm thế nào để ta hiển thị trạng thái state trong các Vue Component? 
- Cách đơn giản nhất là lấy trạng thái state trong một hàm computed()
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
- Khi trạng thái store.state.count thay đổi, nó sẽ kích hoạt hàm trong computed tính toán lại và cập nhật giá trị các DOM liên quan.
- Tuy nhiên cách này khiến component phải dựa vào store sigleton toàn cầu. Khi sử dụng 1 hệ thống hướng module, nó yêu cầu phải import store trong mỗi component mà sử dụng trạng thái state, và cũng yêu cầu mocking khi test các component.
- VueX cung cấp 1 cở chế để inject store vào tất cả các compoent con từ component gốc với tùy chọn store
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
- Bằng cách thêm tùy chọn store vào instance gốc, store sẽ được inject vào tất cả các component con và sẽ cho phép truy cập theo cú pháp `this.$store` .  
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
### Hàm mapState
- Khi 1 component cần sử dụng nhiều thuộc tính trạng thái state hoặc getters, khai báo tất cả các thuộc tính computed có thể khiến lặp đi lặp lại và dài dòng. Để giải quyết vấn đề này, ta có thể sử dụng hàm trợ giúp` mapState` để tạo các hàm computed getter.
```
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
- Ta cũng có thể truyền 1 mảng chuỗi cho mapState khi tên của thuộc tính được ánh xạ giống như tên cây phụ của state.
```
computed: mapState([
  // map this.count to store.state.count
  'count'
])
```
### Các component vẫn có thể có các local state
- Sử dụng Vuex không có nghĩa là bạn nên đặt tất cả trạng thái vào Vuex. Mặc dù việc đưa thêm trạng thái vào Vuex làm cho các đột biến trạng thái của bạn rõ ràng hơn và có thể gỡ lỗi, đôi khi nó cũng có thể làm cho mã dài dòng và gián tiếp hơn. Nếu một phần của trạng thái hoàn toàn thuộc về một thành phần duy nhất, nó có thể tốt nếu để nó là trạng thái cục bộ. Bạn nên cân nhắc sự đánh đổi và đưa ra quyết định phù hợp với nhu cầu phát triển của ứng dụng.
## Getters - Bộ lọc trạng thái
- Đôi khi có thể cần tính toán trạng thái dẫn xuất dựa trên các trạng thái state store. Ví dụ lọc qua danh sách các items và đếm chúng: 
```
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```
- Nếu có nhiều hơn 1 component cần điều này, ta phải viết lặp lại function hoặc đưa nó vào 1 helper để chia sẻ và nhập nó ở nhiều nơi.
- Vuex cho phép ta định nghĩa các getters trong store. Bạn có thể tưởng tượng chúng như các thuộc tính computed cho store. Như các thuộc tính computed, 1 kết quả được lưu trữ dựa trên các phụ thuộc của nó và sẽ chỉ đánh gía lại khi 1 số các phụ thuộc đã thay đổi.
- Getter sẽ nhận state là đối số thứ nhất
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
### Truy cập theo kiểu thuộc tính
- Bạn có thể truyền đối số cho getters bằng cách trả về 1 hàm, Điều này đặc biệt hữu ích khi bạn muốn truy vấn 1 mảng trong store.
```
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```

```
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```
### Hàm mapGetters 
- Hàm mapGetters ánh xạ các getters đến các thuộc tính computed cục bộ
```

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
- Nếu bạn muốn map 1 getter với 1 cái tên khác, sử dụng 1 object:
```

...mapGetters({
  // map `this.doneCount` to `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```
##  Mutations - Thay đổi trạng thái
- Cách duy nhất để thay đổi trạng thái state trong store đó là commit 1 mutation. Vuex mutations giống với các sự kiện, mỗi mutation có 1 string type và 1 handler. Hàm handler là nơi ta thực hiện các thay đổi trạng thái thực tế và nó sẽ nhận state làm đối số đầu tiên.
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
- Bạn không thể gọi trực tiếp 1 mutation handler. Tưởng tượng nó giống như đăng ký sự kiện: "Khi 1 mutation với kiểu increment được trigger, gọi hàm handler này". Để gọi 1 hàm mutation handler, bạn cần dùng store.commit : 
```
store.commit('increment')
```
### Commit với payload
- Bạn có thể truyền thêm đối số cho store.commit như sau:
```
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
```
```
store.commit('increment', 10)
```
- Trong hầu hết các trường hợp, payload phải là 1 đối tượng để nó có thể chứa nhiều trường
```
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```
```
store.commit('increment', {
  amount: 10
})
```
### Commit theo kiểu object
- 1 cách khác để commit 1 mutation là sử dụng trực tiếp 1 object có 1 thuộc tính type:
```
store.commit({
  type: 'increment',
  amount: 10
})
```
- Khi sử dụng commit kiểu object, toàn bộ đối tượng sẽ được chuyển dưới dạng payload cho hàm hanlder mutation, do đó hàm handler vẫn giữ nguyên:
```
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```
### Mutation phải đồng bộ
- 1 quy tắc quan trọng cần nhớ là các hàm xử lý đột biến phải đồng bộ. Tại sao ư? Hãy xem ví dụ sau:
```
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```
### Commit mutations trong component
- Bạn có thể commit mutations trong các components với `this.$store.commit('xxx')` hoặc sử dụng mapMutations. Nó sẽ map các hàm mutation.
```
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // map `this.increment()` to `this.$store.commit('increment')`

      // `mapMutations` also supports payloads:
      'incrementBy' // map `this.incrementBy(amount)` to `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // map `this.add()` to `this.$store.commit('increment')`
    })
  }
}
```
## Actions 
- Actions giống với mutations. Điểm khác biệt là:
+ Thay vì thay đổi state, actions commit mutations.
+ Action có thể chữa các hoạt động bất đồng bộ
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
- Các hàm xử lý action nhận vào 1 đối tượng Context, nó có đầy đủ các methods, giá trị như là store instance. Bạn có thể gọi `context.commit` để commit 1 mutation, hoặc truy cập state và getters thông qua `context.state` và `context.getters`. Bạn có thể gọi các actions khác với với `context.dispatch`. 
- Trong thực tế, ta thường dùng cú pháp ES2015 để đơn giản hóa code đi 1 chút, đặc biệt là khi ta phải gọi commit nhiều lần:
```
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```
### Dispatching actions
- Actions được trigger với hàm: `store.dispatch('increment')`
 - Điều này ban đầu nhìn có thể bạn thấy hơi ngớ ngẩn, nếu ta muốn tăng biến count, tại sao ta không call store.commmit('increment') ? Hãy nhớ rằng mutations phải là đồng bộ còn actions thì không. Chúng ta có thể thực hiện bất đồng bộ bên trong 1 action
 ```
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```
- Action cũng hỗ trợ format payload và object-style dispatch tương tự như mutation.
```
// dispatch with a payload
store.dispatch('incrementAsync', {
  amount: 10
})

// dispatch with an object
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```
- Một ví dụ thực tế hơn về action trong thực tế: Ví dụ như kiểm tra giỏ hàng, bao gồm việc gọi API async và thực hiện nhiều mutations.
```
actions: {
  checkout ({ commit, state }, products) {
    // save the items currently in the cart
    const savedCartItems = [...state.cart.added]
    // send out checkout request, and optimistically
    // clear the cart
    commit(types.CHECKOUT_REQUEST)
    // the shop API accepts a success callback and a failure callback
    shop.buyProducts(
      products,
      // handle success
      () => commit(types.CHECKOUT_SUCCESS),
      // handle failure
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```
### Dispatching actions trong components
Bạn có thể dispatch actions trong component với cú pháp `this.$store.dispatch('xxx')` hoặc sử dụng hàm mapActions.
```
import { mapActions } from 'vuex'

export default {
  // ...
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
}
```
### Composing actions
- Actions thường là bất đồng bộ, nên làm sao ta biết khi nào 1 action hoàn thành? và quan trọng hơn, làm sao ta  compose nhiều actions cùng nhau để xử lý các bất đồng bộ phúc tạp hơn.
- Điều đầu tiên cần biết đó là store.dispatch có thể xử lý promise trả về bởi 1 hàm xử lý triggered action và nó cũng trả về promise.
```
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```
- Bây giờ bạn có thể làm như sau:
```
store.dispatch('actionA').then(() => {
  // ...
})
```
- Và cũng trong 1 action khác:
```
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```
- Cuối cùng, nếu ta sử dụng async/await, ta có thể compose các action như sau:
```
// assuming `getData()` and `getOtherData()` return Promises

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
## Moduls
- Vì sử dụng 1 cây trạng thái, tất cả các trạng thái của ứng dụng chưa bên trong 1 object lớn. Tuy nhiên khi ứng dụng của bạn phát triển về quy mô, store sẽ trở nên thực sự lớn.
- Để giải quyết vấn đề này, Vuex cho phép ta chia store theo các modules. Mỗi module có thể chứa những state, mutations, actions, getters của chính chúng và thậm chí là các modules lồng nhau.
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
### State cục bộ của module
- Bên trong  mutations và getters của 1 module, đối số đầu tiên nhận vào là state cục bộ của module
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
- Tương tự, bên trong actions của module, context.state sẽ hiển thị trạng thái cục bộ, và trạng thái gốc sẽ được hiển thị bằng cách context.rootState.
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
- Tương tự, bên trong actions của module, context.state sẽ hiển thị trạng thái cục bộ, và trạng thái gốc sẽ được hiển thị bằng cách context.rootState.
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
- Ngoài ra, bên trong module getters, state gốc sẽ được hiển thị như là đối số thứ 3
```
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```
### Namespacing
- Mặc định actions, mutations và getters bên trong các module vẫn được đăng ký dưới dạng toàn cục namespace, điều này cho phép nhiều modules phản uứng với cùng mutation/ action type.
- Nếu bạn muốn module của bạn khép kín hơn hoặc có thể tái sử dụng, bạn có thể đánh dấu nó với namespace: `namespaced: true`
- Khi module được đăng ký, tất cả getters, actions và mutations của nó sẽ tự động được namespace dựa trên đường dẫn module được đăng ký.
```
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // module assets
      state: { ... }, // module state is already nested and not affected by namespace option
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // nested modules
      modules: {
        // inherits the namespace from parent module
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // further nest the namespace
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```
- Bạn có thể sử dụng các module assets mà không cần viết tiền tố trong cùng 1 module. Việc di chuyển giữa các namespace hay không không ảnh hưởng tới code bên trong module.
### Truy cập các assets toàn cục với namespace module
- Nếu bạn muốn dùng các state và getter toàn cục, rootState và rootGetters được truyền dưới dạng đối số thứ 3 và thứ 4 cho hàm getter, và cũng được hiển thị dưới dạng đối tượng Context được truyền cho các hàm action.
 - Để dispatch actions hoặc commit mutations trong namespace toàn cục, truyền { root: true } như là đối số thứ 3 cho dispatch và commit
```
modules: {
  foo: {
    namespaced: true,

    getters: {
      // `getters` is localized to this module's getters
      // you can use rootGetters via 4th argument of getters
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // dispatch and commit are also localized for this module
      // they will accept `root` option for the root dispatch/commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```
### Đăng ký action toàn cục trong namespace modules
- Nếu bạn muốn đăng ký action toàn cục trong namespace modules, bạn có thể đánh dấu nó với root: true và đặt định nghĩa action cho hàm handle. VÍ dụ:
```
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}
```