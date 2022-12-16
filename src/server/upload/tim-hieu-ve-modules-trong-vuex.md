&nbsp;&nbsp;&nbsp;&nbsp; Do việc sử dụng single state tree, tất cả trạng thái - state của ứng dụng của chúng ta được chứa trong một đối tượng - object rất lớn. Tuy nhiên, khi ứng dụng của chúng tôi phát triển về quy mô, kích thước của store có thể trở nên thực sự đồ sộ.

&nbsp;&nbsp;&nbsp;&nbsp; Để giúp cho điều đó, Vuex cho phép chúng ta chia store của mình thành các **mô-đun - module**. Mỗi module có thể chứa state, mutation,action, getters và thậm chí các module lồng nhau. Ví dụ:

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

# 1. Module Local State

&nbsp;&nbsp;&nbsp;&nbsp;Bên trong mutations và getters của 1 module, tham số đầu tiên nhận vào sẽ là local state

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

&nbsp;&nbsp;&nbsp;&nbsp; Tương tự như vậy, bên trong action của module, **context.state** sẽ expose ra local state và root state sẽ được expose như là **context.rootState**


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
<br>
Cũng như vậy, bên trong getters của module, root state sẽ được expose như là tham số thứ 3

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

# 2. Namespacing

&nbsp;&nbsp;&nbsp;&nbsp; Mặc định, các action mutation và getters bên trong các module đang được ký với **global namespace** - điều này cho phép nhiều module phản ứng lại cùng 1 type mutation hoặc action

&nbsp;&nbsp;&nbsp;&nbsp; Nếu ta muốn module của chúng ta là khép kín hoặc tái sử dụng được, ta có thể đánh dấu nó như namespace với **namespaced: true**. Khi module được đăng ký, tất cả các getters, action và mutation sẽ tự động được namespaced dựa trên đường dẫn đến module được đăng ký. Ví dụ:

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

&nbsp;&nbsp;&nbsp;&nbsp; Các getters và action được namepaced sẽ nhận **getters**, **dispatch** và **commit** ở local. Hay ta có thể sử dụng các tài nguyên trong module mà không cần phải viết prefix trong cùng 1 module. Việc toggling giữa các namespaced thì cũng không ảnh hưởng đến code bên trong module.

## 2.1 Accessing Global Assets in Namespaced Modules
&nbsp;&nbsp;&nbsp;&nbsp; Nếu ta muốn sử dụng state và getters ở global, **rootState** và **rootGetters** sẽ được truyền vào như là tham số thứ 3 hoặc thứ 4 tới function getters, nó cũng được expose như là các thuộc tính của object **context** được truyền vào function action

&nbsp;&nbsp;&nbsp;&nbsp; Để dispatch các action và commit các mutation trong global namespace, truyền **{ root: true }** như là tham số thứ 3 vào **dispatch** và **commit**

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

## 2.2 Register Global Action in Namespaced Modules

&nbsp;&nbsp;&nbsp;&nbsp; Nếu ta muốn đăng ký các global action trong module được namespaced, ta có thể đánh dấu nó với **root: true** và đặt định nghĩa action tới function **handler**. Ví dụ:

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

## 2.3 Binding Helpers with Namespace

&nbsp;&nbsp;&nbsp;&nbsp; Khi binding 1 module được namespaced tới các component với các helper như **mapState, mapGetters, mapActions và mapMutations** nó có thể hơi dài dòng

```
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
```

&nbsp;&nbsp;&nbsp;&nbsp; Trong những trường hợp như vậy, ta có thể pass namespace string của module như là tham số đầu tiên tới các helpers, do đó tất cả các binding được thực hiện sử dụng module đó như là context. Đoạn code ở trên sẽ được rút gọn lại thành:

```
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

&nbsp;&nbsp;&nbsp;&nbsp; Hơn nữa, ta có thể tạo ra helper được namespaced bằng cách sử dụng **createNamespacedHelpers**. Nó sẽ trả về 1 đối tượng đang có component mới binding helpers mà bound với giá trị namespace đã được cho:

```
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // look up in `some/nested/module`
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // look up in `some/nested/module`
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```

## 2.4 Caveat for Plugin Developers

&nbsp;&nbsp;&nbsp;&nbsp; Ta có thể quan tâm đến các namespace không thể đoán trước được cho các module khi ta tạo ra 1 plugin mà cung cấp các module và cho phép các user thêm nó tới store của Vuex. Module của chúng ta sẽ được namespaced nếu plugin mà user thêm vào module dưới 1 module được namespaced. Để đáp ứng cho tình huống này, ta có thể cần nhận vào 1 namespaced value theo plugin option của mình:

```
// get namespace value via plugin option
// and returns Vuex plugin function
export function createPlugin (options = {}) {
  return function (store) {
    // add namespace to plugin module's types
    const namespace = options.namespace || ''
    store.dispatch(namespace + 'pluginAction')
  }
}
```

# 3. Dynamic Module Registration

&nbsp;&nbsp;&nbsp;&nbsp; Ta có thể đăng ký 1 module đằng sau 1 store đã được tạo ra với method *store.registerModule*:


```
// register a module `myModule`
store.registerModule('myModule', {
  // ...
})

// register a nested module `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```


&nbsp;&nbsp;&nbsp;&nbsp; Các state của module sẽ được expose như là **store.state.myModule** và **store.state.nested.myModule**

&nbsp;&nbsp;&nbsp;&nbsp; Việc đăng ký module động giúp các plugin Vue khác cũng có thể tận dụng Vuex để quản lý state bằng cách đính kèm một module vào store của ứng dụng. Ví dụ: thư viện **vuex-router-sync** tích hợp vue-router với vuex bằng cách quản lý trạng thái route của ứng dụng trong một module được gắn động.
<br>
<br>
&nbsp;&nbsp;&nbsp;&nbsp; Ta có thể xóa các module được đăng ký tự động với **store.unregisterModule(moduleName)**. Chú ý ta không thể xóa các module static (declared at store creation) với method này.

## 3.1 Preserving state
&nbsp;&nbsp;&nbsp;&nbsp; Có thể ta muốn duy trì trạng thái trước đó khi đăng ký một module mới, chẳng hạn duy trì trạng thái từ 1 ứng dụng Server Side Rendered. Ta có thể đạt được điều này với option **preserveState**: **store.registerModule('a', module, { preserveState: true })**


&nbsp;&nbsp;&nbsp;&nbsp; Khi ta set **preserveState: true**, module được đăng ký, actions, mutation và các getters sẽ được thêm vào store nhưng state thì không. Giả sử rằng trạng thái store đã chứa state cho module đó rồi và ta không muốn ghi đè nó.

# 4. Module Reuse

&nbsp;&nbsp;&nbsp;&nbsp; Thỉnh thoảng ta có thể muốn tạo ra rất nhiều các instances của 1 module, ví dụ:
<br>
- Tạo ra nhiêu store mà sử dụng cùng module (ví dụ. Để avoid stateful singletons in the SSR khi option **runInNewContext** là **false** hoặc '**once**');
- Đăng ký 1 module nhiều lần trong cùng 1 store

<br>
&nbsp;&nbsp;&nbsp;&nbsp; Nếu ta sử dụng 1 object thuần để khai báo state của module, sau đó state object sẽ được share bởi reference và gây ra cross store/module state pollution khi nó bị mutated

&nbsp;&nbsp;&nbsp;&nbsp; Điều này thực ra chính xác là vấn đề với **data** bên trong Vue component. Vì thế solution cũng tương tự - sử dụng 1 function để khai báo state của module

```
const MyReusableModule = {
  state () {
    return {
      foo: 'bar'
    }
  },
  // mutations, actions, getters...
}
```

<br>

- Tài liệu tham khảo: https://vuex.vuejs.org/guide/modules.html