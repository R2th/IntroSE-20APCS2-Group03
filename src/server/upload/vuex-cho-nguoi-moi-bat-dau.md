![](https://images.viblo.asia/b9db2a92-22e8-4875-907d-b97c161aee5a.png)
# Vuex là gì?
Theo như định nghĩa của trang chủ thì nguyên văn nó như thế này :
> **Vuex** is a **state management pattern + library** for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion. It also integrates with Vue's official devtools extension to provide advanced features such as zero-config time-travel debugging and state snapshot export / import
> 

Định nghĩ thì có vẻ khó hiểu như vậy nhưng ta có thể hiểu một cách nôm na  **Vuex** là một **pattern + library** của **Vuejs**, nó có chức năng như một cái kho chứa tập trung các **state** của các **component** trong ứng dụng. Khi chúng ta cần thay đổi gì chỉ cần tương tác trực tiếp với thằng **state** trên **store** của Vuex, mà không cần phải thông qua quan hệ giữa các component.

#### Để hiểu hơn là tại sao phải cần đến Vuex ta sẽ qua một ví dụ sau:
![](https://images.viblo.asia/eaf2b41b-50c6-4e76-b028-e26957dec79b.png)

![](https://images.viblo.asia/ec4b3940-85f9-4410-910f-6c4c64f8b6a9.png)

Chúng ta có 2 component là `Counter` chứa 2 chức năng là `increment` - `decrement` và  component `Result` có chức năng in ra kết quả

- Với trường hợp không sử dụng Vuex thì chúng ta sẽ cần truyền sự kiện `increment`  hoặc `decrement` từ `Counter` lên cho `App` và sau đó `App` sẽ cập nhật và truyền kết quả xuống cho thằng `Result`

![](https://images.viblo.asia/094e214d-34b6-4a1b-a9df-46ba5df96092.png)
  Đây là trường hợp mới chỉ có một cấp. Vậy nếu cây phân cấp components của ứng dụng là rất nhiều thì điều gì sẽ xảy ra. Trông nó sẽ như thế này :

![](https://images.viblo.asia/cefc095b-e362-483d-8958-53cc6d1924e3.png)

Sẽ rất là rối và khó quản lý thì ý tưởng của thằng này cũng tương tự như [Redux](https://redux.js.org/) nếu anh em nào đã từng học qua Redux. Thì Vuex cũng vậy, nó sẽ tạo ra một **strore** chung cho các **state** để dễ dàng quản lý và thao tác khi có thay đổi:

![](https://images.viblo.asia/96ee5d6a-c619-4396-9b2e-8c0d8fa4df90.png)

# Cài Đặt
#### CDN
Nếu bạn đang dùng **Vuejs** dạng CDN như **Jquery** :
#####  **https://unpkg.com/vuex**
nhớ tải cả Vuejs nhá
**[Vuejs](https://cdn.jsdelivr.net/npm/vue/dist/vue.js)**
```html
    <script src="/path/to/vue.js"></script>
    <script src="/path/to/vuex.js"></script>
```


#### NPM

```shell
    npm install vuex --save
```

#### Yarn
```shell
    yarn add vuex
```

Sau khi kiểm tra trong `package.json` đã cài đặt thành công **Vuex** ta tạo 1 folder `store` và tạo file `store.js` 

![](https://images.viblo.asia/d6dda1ec-6a62-4363-a87e-edd2357809ab.png)

```js
    import Vue from 'vue';
    import Vuex from 'vuex';

    Vue.use(Vuex);

    export const store = new Vuex.Store({
      state: {
        result: 0
      },
      mutations: {
      },
      getters: {
      },
      actions: {
      },
      modules: {
      }
    });
    
```

Vậy là đã có 1 cái store tập trung của Vuex rồi.

# Các thành phần và cách sử dụng của chúng
### 1. State

- Giống như ở mỗi component chúng ta thường có 1 đối tượng `data` chứa các biến của componet thì **state** ở đây cũng có thể hiểu chính là **data** của cả ứng dụng. Sử dụng một state duy nhất như thế này sẽ giúp ta đồng bộ được dữ liệu giữa các componet một cách nhanh chóng và chính xác.
     ```js
        state: {
          result: 0
        }
    ```

    Lấy ra giá trị của một biến trong **state**, thì cũng giống như cách lấy  ta giá trị của một attribute trong đối tượng vậy.
    ```js
        export default {
          computed: {
              result() {
                return this.$store.state.result;
              }
          }
        };
    ```
    Nếu trong state của chúng  ta có nhiều biến và ta chỉ muốn lấy ra một số các biến nhưng lại không muốn gọi từng thứ một như thế kia, thì đừng lo đã có cách đó là sử dụng một **helper** tên là  **mapState**.  Nó sẽ sử dụng toán thử  **Spread** (`...Array`) cú pháp này chỉ áp dụng được trong các phiên bản javascript ES6 trở lên thôi nhe.

     **state**
    ```js
         state: {
            result: 0,
            value: 'aaa'
         }
    ```
    ```js
        import { mapState } from "vuex";
        export default {
          computed: {
             localComputed () { /* ... */ },
             // mix this into the outer object with the object spread operator
             ...mapState(["result","value"]),
            c
          }
        };
    ```

    ```html
        <template>
          <div>
            <p>this is Result: {{result}}</p>
            <p>value: {{value}}</p>
          </div>
        </template>
    ```

    Vậy là giờ ta có các giá trị `result` và `value` đã có thể lấy ra sử dụng mà không cần phải lấy từng giá trị một nữa. Đừng quên import **mapState** không lại bảo sao không chạy.

    Sử dụng **mapState** thì có thể lấy ra giá trị nhưng không thể update được đâu, Docs thì không thấy nói update bằng cách này, nhưng mình thấy từ `map` mình cứ nghĩ là nó binding 2 chiều nên mình đã thử update state bằng cách này và không thấy được nên chắc nó chỉ để get state thôi. 


### 2. Getters
- Đôi khi chúng ta có một hàm cần tính toán dựa trên biến trong state mà cái hàm này lại xuất hiện ở nhiều component. Bây giờ chả nhẽ ở mỗi component ta lại lôi cái biến đó ra và tạo hàm tính toán lại ví dụ hàm lọc các công việc phải làm và đếm chúng:

    ```js
        computed: {
          doneTodosCount () {
            return this.$store.state.todos.filter(todo => todo.done).length
          }
        }
    ```

    Thì Vuex nó cho phép ta định nghĩa các hàm như thế này trong `getters` 
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

    Và lấy cũng đơn giản thôi :
    ```js
        store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
    ```

    Ta có thể sử dụng các hàm trong cùng`getters` với nhau:
    ```js
        getters: {
          doneTodos: state => {
              return state.todos.filter(todo => todo.done)
            },

          doneTodosCount: (state, getters) => {
            return getters.doneTodos.length
          }
        }
    ```
    ```js
        store.getters.doneTodosCount // -> 1
    ```

    Còn ở trong các component khác thì cũng đơn giản không kém 
    ```js
        computed: {
          doneTodosCount () {
            return this.$store.getters.doneTodosCount
          }
        }
    ```

    Đã có **mapSate** thì cũng có **mapGetters** và cách dùng cũng tương tự:
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
    Hoặc là lúc định nghĩ thì một tên nhưng lúc sử dụng ta muốn dùng tên khác cũng chẳng sao đổi được ý mà :
    ```js
        ...mapGetters({
          // map `this.doneCount` to `this.$store.getters.doneTodosCount`
          doneCount: 'doneTodosCount'
        })
    ```
    
### 3. Mutations
- Theo như Docs thì **mutations** là cách duy nhất mà ta có thể thay đổi thực sự **state** trong **store**. Và cách để kích hoạt một mutations đó là ta sẽ **commit** một chuỗi `String` chính là tên của hàm mà ta muốn gọi trong mutations, nó sẽ nhận state của store làm tham số đầu tiên:

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
    ```js
        store.commit('increment')
    ```

    Thấy nhà phát triển nói là cách **duy nhất** để thay đổi **thực sự** nhưng mình đã thử một cách và vẫn thấy nó thay đổi được đó là :

    ```js
        export default {
          name: "counter",
          methods: {
            increment() {
              this.$store.state.count++;
            }
          }
        }
    ```

    Mình vẫn thấy nó hoạt động nhưng không thấy Docs nói đến kiểu này hay là nó không chuẩn chỉ và có thể gây lỗi hay như thế nào. Nhưng hoi Docs đã viết cách này dùng để thay đổi, nên mình sẽ dùng cách này cho chắc không lại đến lúc có lỗi thì vỡ mồm.

- Ngoài **commit** mỗi tên của hàm thì bạn cũng có thể truyền thêm một tham số bổ sung, nếu như hàm của bạn có định nghĩa nhiều hơn 1 tham số đầu vào là state
    ```js
        // ...
        mutations: {
          increment (state, n) {
            state.count += n
          }
        }
    ```
    ```js
        store.commit('increment', 10)
    ```
    thường thì người ta sẽ gom các đối số thành một Object để có thể chứa được nhiều biến cần truyền vào hơn
    ```js
        // ...
        mutations: {
          increment (state, payload) {
            state.count += payload.amount
          }
        }
     ```
    ```js
        store.commit('increment', { amount: 10, total:50 })
    ```
    Còn một cách nữa đó là gom cả tên hàm cần gọi và biến cần truyền vào 1 Object với tên hàm để là `type` vậy là mutations sẽ hiểu và thực hiện mà không cần thay đổi số tham số của hàm
    ```js
        store.commit({
          type: 'increment',
          amount: 10
        })
    ```
    ```js
        mutations: {
          increment (state, payload) {
            state.count += payload.amount
          }
        }
    ```
    **Muntations** thì cũng tuân theo **Reactivity Rules** của **Vue**. Nên nếu sau khi state đã được khởi tạo ta muốn thêm một biến mới vào trong state, thì ta cần khai báo cho Vue biết rằng ta có một mới muốn thêm vào hoặc là thay thế toàn bộ
    ```js
        Vue.set(obj, 'newProp', 123)
        
        OR
        
        state.obj = { ...state.obj, newProp: 123 }
    ```
    
- Ta có thể dùng các mutations với dạng các hằng số. Điều này sẽ rất giúp ích cho việc đồng bộ tên hàm cũng như phù hợp cho các dự án lớn với nhiều bên tham gia
    ```js
        // mutation-types.js
        export const SOME_MUTATION = 'SOME_MUTATION'
    ```
    ```js
        // store.js
        import Vuex from 'vuex'
        import { SOME_MUTATION } from './mutation-types'

        const store = new Vuex.Store({
          state: { ... },
          mutations: {
            // we can use the ES2015 computed property name feature
            // to use a constant as the function name
            [SOME_MUTATION] (state) {
              // mutate state
            }
          }
        })
    ```
    nhưng nó chỉ là một tùy chọn thôi nha bạn không nhất thiết cứ phải sử dụng nó đâu

    => Một điều cần nhớ đó là thằng **mutations** này sẽ chạy **đồng bộ** nên bạn cần cẩn thận khi sử dụng nó, không lại dối tung lên khi kết hợp nó với các hàm bất đồng bộ và không hiểu sao nó lại không chạy.  

- Giống như 2 thằng trên thì mutations cũng có **helper** đó là **mapMutations**
    ```js
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
    
 ### 4. Actions

- **Actions** cũng giống như mutations nhưng nó khác ở hai điểm:
    + Actions không trực tiếp thay đổi state trong store mà nó sẽ thông qua mutations để thay đổi
    + Nó có thể chứa các hàm bất đồng bộ

    Ví dụ đơn giản
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
    Có thể sử dụng hàm argument destructuring để tạo
    ```js
        actions: {
          increment ({ commit }) {
            commit('increment')
          }
        }
    ```
 - Cách kích hoạt 1 actions khi ở component khác
    ```js
        store.dispatch('increment')
    ```
    chúng ta cũng có thể truyền thêm một tham số
    ```js
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
    
    Và lại thêm một cái **helper** nữa đó là **mapActions**
    ```js
        import { mapActions } from 'vuex'

        export default {
          // ...
          methods: {
            ...mapActions([
              'increment', // map `this.increment()` to `this.$store.dispatch('increment')`

              // mapActions` also supports payloads:
              'incrementBy' // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`
            ]),
            ...mapActions({
              add: 'increment' // map `this.add()` to `this.$store.dispatch('increment')`
            })
          }
        }
    ```
    
 ### 5. Modules
- Bây giờ mới có vài hàm thì nhét hết vào file `store.js` được chứ về sau mỗi biến trong state lại có hàng tá hàm thì rất rối. Thì **Vuex** đã hỗ trợ một tùy chỉnh đó là **modules**, ta có thể tách các hàm có chung mục đích ra một file như sau:
    ```js
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
    
 - Nếu bạn muốn nhóm các kiểu mutation/action có chung mục đích sử dụng lại với nhau ta có thể sử dụng đinh nghĩa  **Namespacing** với thuộc tính `namespaced: true`
    ```js
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
    
    Và khi binding với các **helpers** mà có sử dụng **namespace** trông nó sẽ như thế này :
    ```js
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
    Hoặc là đưa phần string namespace vào làm đối số đầu tiên
    ```js
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
    
    Còn nếu không muốn dùng lại những string namespace đó nhiều lần bạn có thể sử dụng `createNamespacedHelpers`. Nó sẽ trả về một đối tượng liên kết với các **helper** mà bạn muốn.
    ```js
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
    
    Ngoài ra bạn có thể đăng ký các module sau khi **store** đã được tạo với method `store.registerModule` 
    
    ```js
        // register a module `myModule`
        store.registerModule('myModule', {
          // ...
        })

        // register a nested module `nested/myModule`
        store.registerModule(['nested', 'myModule'], {
          // ...
        })
    ```
    
# Cấu trúc ứng dụng 
Theo hướng dẫn thì cấu trúc của ứng dụng Vuex nên như này
```
    ├── index.html
    ├── main.js
    ├── api
    │   └── ... # abstractions for making API requests
    ├── components
    │   ├── App.vue
    │   └── ...
    └── store
        ├── index.js          # where we assemble modules and export the store
        ├── actions.js        # root actions
        ├── mutations.js      # root mutations
        └── modules
            ├── cart.js       # cart module
            └── products.js   # products module
```

Để quản lý chặt chẽ hơn thì chúng ta nên kết hợp vừa tách thành các **modules** cho những đối tượng chứa nhiều hàm trong mutations, actions, getters và vừa tách ra các file actions, mutations dùng cho các đối tượng ít hàm hơn.

# Kết Luận
Bài viết hướng đến những người bắt đầu tiếp cận với Vuex nên độ sâu của nó cũng chưa nhiều. Rất mong mọi người nếu có ý kiến đóng góp có thể để ở phần bên dưới comment. Xin cảm ơn!

#### Nguồn :
https://vuex.vuejs.org/