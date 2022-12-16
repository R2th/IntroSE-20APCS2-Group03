## 1. Mở đầu
<hr>

Xin chào tất cả các bạn, đã lâu lắm rồi mình mới có cảm hứng để viết thêm một bài mới trên Viblo và hôm nay mình sẽ mang đến cho các bạn bài viết tiếp theo trong serie liên quan đến VueJS, nếu bạn chưa biết đến serie này của mình thì có thể tham khảo tại [đây](https://viblo.asia/s/tim-hieu-ve-vuejs-DVK2jD2eKLj). Trong bài viết ngày hôm nay, mình sẽ chia sẻ đến các bạn một thư viện mới mà mình nghĩ trong tương lai có thể sẽ thay thế được cho Vuex với vai trò state management. Không để các bạn trờ lâu nữa, chúng ta cùng bắt đầu nào.

## 2. State management trong VueJS
<hr>

### a. Vị cứu tinh VueX

Như bạn đã biết mỗi ứng dụng VueJS đều được hình thành bởi rất nhiều các component khác nhau, các component này liên kết với nhau tạo thành từng page trong ứng dụng của bạn và nếu mô hình hóa nó lên thì bạn có thể hình dung nó sẽ có cấu trúc dạng cây như này:

![](https://images.viblo.asia/a8aaa56c-fad3-4420-9188-b73f5e2bc393.png)

Thông thường chúng ta sẽ có rất nhiều các dữ liệu/ state cần được chia sẻ/ dùng chung giữa các component với nhau đơn giản nhất bạn có thể hình dung ở đây đó là thông tin về người dùng đang đăng nhập trên trang của chúng ta. Thông tin này luôn luôn cần được lưu trữ trên ứng dụng của chúng ta và có thể được truy cập/ sử dụng bởi bất cứ component nào cần đến nó:

![](https://images.viblo.asia/b9f6a7b3-bfdd-40ba-b1ff-3bcd76721aa6.png)

Và tất nhiên nếu bạn là người quan tâm đến sức khỏe tinh thần của bản thân mình thì chắc chắn bạn sẽ không chọn cách tạo ra một khối state ở `<RootComponent />` sau đó đưa giữ liệu này đến các component cần thiết thông qua hàng loạt các component khác nhau. Cách làm này không những làm cho các bạn cảm thấy trầm cảm sau khi đọc lại mà nó còn làm đồng nghiệp của bạn trầm cảm theo. Chính vì thế giải pháp hợp lý ở đây đó là tống cái dữ liệu này vào Vuex store:

![](https://images.viblo.asia/94b23000-1b71-4d4e-8f2a-8e7cad83fcc9.png)

Bằng việc sử dụng Vuex bạn sẽ tạo ra một nơi để chứa các dữ liệu dùng chung này và các component khi cần đến dữ liệu đó có thể kết nối trực tiếp vào store để lấy thay vì cách làm như mình nói ở trên.

### b. Composition API và Vuex

Cho đến gần đây khi mà Vue 3 được release và nhóm tính năng Composition API chính thức được đưa vào sử dụng thì giường như việc sử dụng Vuex lại mang đến cho mình một vấn đề là, nếu bạn muốn dùng Vuex đi kèm với Composition API thì thay vì bạn chỉ kéo cái dữ liệu bạn mong muốn sử dụng vào trong component cần thiết thì bạn phải gọi cả cái store trong ứng dụng của bạn rồi mới truy cập đến từng modules mong muốn. Giả sử ta có 2 module lần lượt là `cart` và `products`:
```
/ store
---- / modules
-------- / cart.js
-------- / products.js
---- / index.js
```
 
Tiếp đến mình có một component là `<ShoppingCart />` cần truy cập đến dữ liệu có trong module `cart.js` thì nếu dùng composition API code nó sẽ như sau:
```js
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore();
    const checkoutStatus = computed(() => store.state.cart.checkoutStatus);

    return { checkoutStatus }
  }
}
</script>
```

Như bạn có thể thấy ở đây ta sẽ cần thêm cả store của Vuex vào với hàm `useStore()` sau đó để truy cập đến dữ liệu trong module `cart.js` thì ta sẽ phải viết là `store.state.cart.checkoutStatus`. Với mình cách viết này khá là dài dòng và nếu mình không nhầm thì nó cũng chả hỗ trợ bạn auto completion thì phải. Chi tiết ví dụ nói trên của mình các bạn có thể tham khảo thêm ở [đây](https://github.com/vuejs/vuex/tree/main/examples/composition/shopping-cart).


## 3. Sự xuất hiện của Pinia
<hr>

### a. Pinia là gì?

Tương tự với Vuex thì Pinia cũng là một thư viện phục vụ cho việc lưu trữ và chia sẻ state giữa các component ở các vị trí khác nhau trong ứng dụng của chúng ta một cách đơn giản nhất. Bạn có thể truy cập trang chủ của Pinia ở [đây](https://pinia.vuejs.org/).  Với các ưu điểm được giới thiệu ngay trên trang chủ của Pinia đó là:
- Dễ tiếp cận vì các store sẽ nhìn giống như việc bạn định nghĩa state trong component
- Hỗ trợ auto completion khi code
- Được hỗ trợ luôn cả bởi Vue Devtoool
- Siêu nhẹ, chỉ khoảng 1kb
- ...

### b. Pinia vs Vuex

Nếu các bạn còn nhớ trong Vuex ta sẽ có lần lượt các khái niệm là:
- State: dùng để định nghĩa dữ liệu bạn lưu trong module đó của store
- Getters: dùng để truy cập trực tiếp vào các dữ liệu khi nó bị nested hoặc biến đổi từ dữ liệu gốc
- Mutations: là cách duy nhất được dùng để thay đổi dữ liệu trong state
- Actions: hiểu nôm na là nó sẽ gọi đến muations để thay đổi state và có thể viết code async ở đây

Mô hình của Vuex sẽ như sau:

![vuex.png](https://images.viblo.asia/4935afc5-f363-4ac1-b89d-e4bdce43d037.png)

Còn với Pinia sẽ có một số điểm khác biệt mình thấy hay ngay lập tức đó là:
- Sẽ không còn có phần mutation nữa mà thay vào đó chỉ còn State, Getters và Actions. Với Pinia ta có thể thay đổi trực tiếp dữ liệu của State ngay tại component đó hoặc gọi thông qua Actions nếu việc  thay đổi đó có thể được tái sử dụng ở nhiều nơi.
- Hỗ trợ Typescript 
- Không còn việc sử dụng các string với `mapState`, `mapGetters` mà thay vào đó ta có thể import dữ liệu trực tiếp và tận hưởng sự hỗ trợ của auto completion
- Không còn phải khai báo chúng toàn bộ các module vào file `index.js` như với Vuex nữa
- Hỗ trợ Composition API
- ...

Ngoài ra bạn còn một số điều nữa khác nữa nhưng ở đây mình chỉ nói ra những điểm mình thấy ổn hơn so với Vuex

### c. Pinia in action

Với Pinia, để định nghĩa một store rất đơn giản, tất cả những gì bạn cần làm là như sau, tạo mọt file mới, ví dụ:
```stores/counter.ts
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
    state: () => ({
        counter: 0
    }),

    getters: {
        doubleCount: state => state.counter * 2
    },
    
    actions: {
        increment() {
            this.counter++
        },
    }
})
```

Và để sử dụng nó với Composition API thì ta chỉ cần làm như sau:
```js
// Counter.vue
<script>
import { useCounterStore } from '~/stores/counter'

export default {
  setup() {
    const counterStore = useCounterStore()
    
    console.log(counterStore.counter); // Truy cập state trong store
    console.log(counterStore.doubleCount); // Truy cập getter trong store
    counterStore.increment(); // Gọi đến action trong store
    counterStore.counter++ // Thay đổi trực tiếp dữ liệu trong store

    return { counterStore }
  },
}
</script>
```

Và một điều mình rất ưng ý đó là Auto completion:

![](https://images.viblo.asia/750537d9-b174-45c2-8385-e61a05145830.png)

Ta sẽ không còn cần phải nhơ trong store có gì nữa mà hoàn toàn có thể dùng auto completion được hỗ trợ sẵn. Đây có thể là một trong những điều mình thấy hứng thú nhất so với việc dùng Vuex như trước đây ngoài việc nó thực sự support và viết theo kiểu của Composition API. Tuy nhiên đây hoàn toàn là các trải nghiệm của cá nhân mình nhưng mình nghĩ các bạn nên dùng thử vì nếu các bạn quyết định sử dụng Compoisiton API thì đây chắc chắn là thứ bạn cần đến.

## 4. Kết bài
<hr>

Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã đón đọc. Nếu có chỗ nào bạn thắc mắc hay cần trao đổi thì có thể comment ngay phía bên dưới để mình biết. Cuối cùng các bạn đừng quên upvote để ủng hộ mình nhé.