# VueX là gì?
![](https://images.viblo.asia/a531b6ae-a791-4815-ad5f-d50aa0338765.jpeg)
   - VueX là "state management pattern + library for Vue.js applications". Nó là thư viện quản lý trạng thái trong các ứng dụng vuejs. Nó là nơi lưu trữ trữ tập trung cho tất cả các component trong một ứng dụng.
  
# Thành phần của VueX
   -  Vuex có 5 Core Concepts:
     
         + **State**: State là một object chứa toàn bộ state của ứng dụng
         + **Getters**: Là một tập các hàm dùng để filter state ra được output như mong muốn.
         + **Mutations**: Đây là nơi duy nhất cho phép thay đổi state. Một điều cần lưu ý là mutations là synchronous. Vì sao phải cần điều này? Nếu không có rule này thì trong trường hợp nhiều action cùng gọi 1 mutation làm sao ta kiểm soát được cái nào đã thay đổi state hay thứ tự thay đổi state như nào.
         + **Actions**: Actions có thể nói là nơi thể hiện bussiness logic. Nó là nơi gọi API, save vào database, thực hiện các commit (gọi mutation) để thay đổi state…
         + **Modules**: Được xem như là store thu nhỏ, nó cũng bao gồm: state, mutation và action. Khi store phình quá to thì có thể chia nhỏ ra thành các module để dễ quản lý hơn.
#  Những điều cần lưu ý với Vuex
 - Xác định cái nào là state sẽ lưu trữ trong store, cái nào chỉ là local state chỉ nằm trong component. Tất nhiên là có để đưa tất cả vào store, nhưng đến khi quy mô ứng dụng tăng lên kéo theo store cũng sẽ phình to ra => việc quản lý state sẽ trở nên khó khăn hơn nhiều nhiều.
# Sử dụng
  - Chúng ta nên chia ra thành các file actions, mutations, getters để có thể quản lý dễ hơn
  - Ở bài này mình sẽ dùng module để quản lý Vuex
 
```javascript
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

### Module Local State
```js
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

Để truy cập vào vuex(actions), ta sử dụng:
```js
this.$store.dispatch('module_name/actions_name')
        .then(res => {
            console.log(res)
        })
```

Từ actions truy cập đến mutations, ta sử dụng:
```js
 async edit (context, data) {
        await axios({
            method: 'patch', 
            url: 'reports/' + data.id,
            data: data.object
        });
        context.commit(methods_mutations, params)
    }
```
Từ components truy cập vào state:
```js
this.$store.state.state_name
```
Mong rằng qua bài viết này giúp các bạn hiểu thêm 1 chút về VueX.

<br>
Cám ơn các bạn đã đọc bài, chúc các bạn thành công!

Nguồn: [VueX](https://vuex.vuejs.org/guide/modules.html),  [tuduydongian](https://tuduydongian.com/2018/04/getting-started-with-vuex/)